import { useRef, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function Labeled({ label, hint, children, className }: { label?: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {label && <label className="label">{label}</label>}
      {children}
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = 'text',
}: {
  label?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  hint?: string
  type?: string
}) {
  return (
    <Labeled label={label} hint={hint}>
      <input className="input" type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </Labeled>
  )
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <Labeled label={label}>
      <textarea className="textarea" rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </Labeled>
  )
}

/** Month-ish date. Accepts "YYYY-MM"/"YYYY"/free text; empty end = Present. */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const NOW_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 75 }, (_, i) => NOW_YEAR + 2 - i)

function parseYM(v: string): { y: string; m: string } {
  const match = (v || '').trim().match(/^(\d{4})(?:-(\d{1,2}))?/)
  if (!match) return { y: '', m: '' }
  return { y: match[1], m: match[2] ? String(parseInt(match[2], 10)) : '' }
}
const isPresent = (v: string) => /^present$/i.test((v || '').trim())

/** Month + year picker. Stores "YYYY-MM" (or "YYYY"); end dates can be "Present". */
export function DateField({
  label,
  value,
  onChange,
  allowPresent,
}: {
  label?: string
  value: string
  onChange: (v: string) => void
  allowPresent?: boolean
}) {
  const [pickMode, setPickMode] = useState(false)
  const present = !!allowPresent && !pickMode && (!value.trim() || isPresent(value))
  const { y, m } = parseYM(value)

  const setYM = (year: string, month: string) => {
    setPickMode(true)
    if (!year) return onChange('')
    onChange(month ? `${year}-${month.padStart(2, '0')}` : year)
  }

  return (
    <Labeled label={label}>
      <div className="flex flex-wrap items-center gap-1.5">
        <select
          className="input h-9 flex-1 px-2 disabled:opacity-50"
          value={present ? '' : m}
          disabled={present}
          onChange={(e) => setYM(y, e.target.value)}
          aria-label={`${label ?? 'Date'} month`}
        >
          <option value="">Month</option>
          {MONTHS.map((name, i) => (
            <option key={name} value={String(i + 1)}>
              {name}
            </option>
          ))}
        </select>
        <select
          className="input h-9 flex-1 px-2 disabled:opacity-50"
          value={present ? '' : y}
          disabled={present}
          onChange={(e) => setYM(e.target.value, m)}
          aria-label={`${label ?? 'Date'} year`}
        >
          <option value="">Year</option>
          {YEARS.map((yy) => (
            <option key={yy} value={String(yy)}>
              {yy}
            </option>
          ))}
        </select>
        {allowPresent && (
          <label className="flex shrink-0 cursor-pointer items-center gap-1 rounded-md px-1.5 text-xs text-muted-foreground">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 accent-primary"
              checked={present}
              onChange={(e) => {
                if (e.target.checked) {
                  setPickMode(false)
                  onChange('') // empty end date renders as "Present" and stays JSON-Resume clean
                } else {
                  setPickMode(true)
                  onChange('')
                }
              }}
            />
            Present
          </label>
        )}
      </div>
    </Labeled>
  )
}

/** Chip / tag input bound to a string[].
 * Chips can be dragged to reorder and clicked to edit in place. */
export function TagInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label?: string
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  const [draft, setDraft] = useState('')
  const [editing, setEditing] = useState<number | null>(null)
  const split = (raw: string) =>
    raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  const commit = (raw: string) => {
    const parts = split(raw)
    if (!parts.length) return
    const next = [...value]
    for (const p of parts) if (!next.includes(p)) next.push(p)
    onChange(next)
    setDraft('')
  }
  /** Replace the chip at `i` with the edited text (empty removes it, commas split it). */
  const commitEdit = (i: number, raw: string) => {
    setEditing(null)
    const parts = split(raw)
    if (parts.length === 1 && parts[0] === value[i]) return
    const rest = value.filter((_, j) => j !== i)
    const fresh = parts.filter((p) => !rest.includes(p))
    onChange([...value.slice(0, i), ...fresh, ...value.slice(i + 1)])
  }
  // Ids follow the chip's text (not its position) so they stay stable while reordering.
  const ids = value.map((t, i) => `${t}\u0000${value.slice(0, i).filter((x) => x === t).length}`)
  // Mouse/touch drag only: dnd-kit's keyboard dragging jumps unpredictably across wrapped
  // rows of chips, so the keyboard uses Alt+←/→ instead (see SortableTag).
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))
  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return
    onChange(arrayMove(value, from, to))
  }
  // The pointer-up that ends a drag also fires a click: ignore it so dropping doesn't open the editor.
  const lastDragEnd = useRef(0)
  const startEdit = (i: number) => {
    if (Date.now() - lastDragEnd.current < 300) return
    setEditing(i)
  }
  const onDragEnd = (e: DragEndEvent) => {
    lastDragEnd.current = Date.now()
    const { active, over } = e
    if (!over || active.id === over.id) return
    const from = ids.indexOf(String(active.id))
    const to = ids.indexOf(String(over.id))
    if (from < 0 || to < 0) return
    onChange(arrayMove(value, from, to))
  }
  return (
    <Labeled label={label} hint={value.length > 1 ? 'Trascina un elemento per riordinarlo, cliccalo per modificarlo' : undefined}>
      <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-input bg-surface p-1.5 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          onDragCancel={() => (lastDragEnd.current = Date.now())}
        >
          <SortableContext items={ids} strategy={rectSortingStrategy}>
            {value.map((t, i) => (
              <SortableTag
                key={ids[i]}
                id={ids[i]}
                text={t}
                editing={editing === i}
                onStartEdit={() => startEdit(i)}
                onCommit={(raw) => commitEdit(i, raw)}
                onCancel={() => setEditing(null)}
                onRemove={() => onChange(value.filter((_, j) => j !== i))}
                onMove={(delta) => move(i, i + delta)}
              />
            ))}
          </SortableContext>
        </DndContext>
        <input
          className="min-w-[80px] flex-1 bg-transparent px-1 py-0.5 text-sm outline-none placeholder:text-muted-foreground/70"
          value={draft}
          placeholder={value.length ? '' : (placeholder ?? 'Type and press Enter')}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault()
              commit(draft)
            } else if (e.key === 'Backspace' && !draft && value.length) {
              onChange(value.slice(0, -1))
            }
          }}
          onBlur={() => draft && commit(draft)}
        />
      </div>
    </Labeled>
  )
}

function SortableTag({
  id,
  text,
  editing,
  onStartEdit,
  onCommit,
  onCancel,
  onRemove,
  onMove,
}: {
  id: string
  text: string
  editing: boolean
  onStartEdit: () => void
  onCommit: (raw: string) => void
  onCancel: () => void
  onRemove: () => void
  onMove: (delta: -1 | 1) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled: editing })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
    position: 'relative' as const,
  }
  if (editing) {
    return (
      <span ref={setNodeRef} style={style} className="chip max-w-full bg-primary/10 p-0 text-primary ring-2 ring-ring/60">
        <input
          autoFocus
          defaultValue={text}
          size={Math.max(4, text.length)}
          className="max-w-full bg-transparent px-2.5 py-0.5 text-xs font-medium outline-none"
          onFocus={(e) => e.currentTarget.select()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onCommit(e.currentTarget.value)
            } else if (e.key === 'Escape') {
              e.preventDefault()
              onCancel()
            }
          }}
          onBlur={(e) => onCommit(e.currentTarget.value)}
        />
      </span>
    )
  }
  return (
    <span
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      title="Trascina per riordinare (o Alt+←/→) · clicca per modificare"
      className={cn(
        'chip cursor-grab touch-none select-none gap-1 bg-primary/10 text-primary outline-none hover:bg-primary/15 focus-visible:ring-2 focus-visible:ring-ring/60',
        isDragging && 'cursor-grabbing opacity-80 shadow-md'
      )}
      onClick={onStartEdit}
      onKeyDown={(e) => {
        if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowUp')) {
          e.preventDefault()
          onMove(-1)
        } else if (e.altKey && (e.key === 'ArrowRight' || e.key === 'ArrowDown')) {
          e.preventDefault()
          onMove(1)
        } else if (e.key === 'F2' || e.key === 'Enter') {
          e.preventDefault()
          onStartEdit()
        } else if (e.key === 'Delete') {
          e.preventDefault()
          onRemove()
        }
      }}
    >
      {text}
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        aria-label={`Remove ${text}`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  )
}

export function RatingField({
  label,
  value = 0,
  onChange,
  max = 5,
}: {
  label?: string
  value?: number
  onChange: (v: number) => void
  max?: number
}) {
  return (
    <Labeled label={label}>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < value
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(i + 1 === value ? 0 : i + 1)}
              className={cn('h-4 w-4 rounded-full border transition-colors', filled ? 'border-primary bg-primary' : 'border-input bg-transparent hover:border-primary')}
              aria-label={`Set rating ${i + 1}`}
            />
          )
        })}
        {value ? <span className="ml-1 text-xs text-muted-foreground">{value}/{max}</span> : null}
      </div>
    </Labeled>
  )
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>
}
