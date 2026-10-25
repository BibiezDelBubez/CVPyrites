/**
 * CVPyrites: click-to-edit language level + certification on the resume canvas
 * (edit mode only). Mirrors <CanvasDate>: shows the formatted line, opens a small
 * popover with the CEFR / QCER level picker and the optional certification.
 */
import { useState } from 'react'
import { createPortal } from 'react-dom'
import type { ResumeContent } from '@/types/document'
import type { Cefr, LanguageLevel } from '@/types/resume'
import type { CvLocale } from '@/types/metadata'
import { CEFR_ONLY, CERTIFICATION_SUGGESTIONS, EUROPASS_SKILLS, LANGUAGE_LEVELS, europassSkillLabel, levelText, type EuropassSkill } from '@/lib/languages'
import type { EditFn } from './Editable'

const T = {
  it: { pick: 'Livello…', level: 'Livello (QCER)', none: '— nessun livello —', cert: 'Certificazione (facoltativa)', certName: 'Es. IELTS Academic', score: 'Punteggio / livello', year: 'Anno', done: 'Fatto', legacy: 'Testo attuale', detail: 'Dettaglio Europass (facoltativo)' },
  en: { pick: 'Level…', level: 'Level (CEFR)', none: '— no level —', cert: 'Certification (optional)', certName: 'e.g. IELTS Academic', score: 'Score / level', year: 'Year', done: 'Done', legacy: 'Current text', detail: 'Europass detail (optional)' },
}

export function CanvasLangLevel({
  edit,
  index,
  label,
  level,
  fluency,
  certification,
  europass,
  locale,
  className,
}: {
  edit: EditFn
  /** extra class for the trigger (e.g. the certification line) */
  className?: string
  index: number
  /** the formatted line currently shown (empty → hint) */
  label: string
  level?: LanguageLevel
  fluency?: string
  certification?: { name?: string; score?: string; year?: string }
  europass?: Partial<Record<EuropassSkill, Cefr>>
  locale?: CvLocale
}) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const t = T[locale === 'en' ? 'en' : 'it']
  const cert = certification ?? {}
  const listId = `rm-cert-suggestions-${index}`

  const openAt = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
    // open upwards when there isn't room below (popover is up to ~400px tall)
    const H = 400
    const top = r.bottom + 6 + H > window.innerHeight ? Math.max(8, r.top - H - 6) : r.bottom + 6
    setPos({ top, left: Math.max(8, Math.min(r.left, window.innerWidth - 296)) })
    setOpen(true)
  }

  const setLevel = (v: string) =>
    edit((c: ResumeContent) => {
      const l = c.languages[index]
      if (!l) return
      if (v) {
        l.level = v as LanguageLevel
        l.fluency = '' // the composed line replaces any old free-text level
      } else {
        l.level = undefined
      }
    })
  const setCert = (field: 'name' | 'score' | 'year', v: string) =>
    edit((c: ResumeContent) => {
      const l = c.languages[index]
      if (!l) return
      const next = { name: '', score: '', year: '', ...(l.certification ?? {}), [field]: v }
      l.certification = next.name || next.score || next.year ? next : undefined
    })

  const setSkill = (skill: EuropassSkill, v: string) =>
    edit((c: ResumeContent) => {
      const l = c.languages[index]
      if (!l) return
      const next = { ...(l.europass ?? {}), [skill]: (v || undefined) as Cefr | undefined }
      l.europass = EUROPASS_SKILLS.some((k) => next[k]) ? next : undefined
    })

  return (
    <>
      <button type="button" className={`rm-date-edit rm-lang-edit no-print${className ? ' ' + className : ''}`} contentEditable={false} onMouseDown={(e) => e.preventDefault()} onClick={openAt} title={t.level}>
        {label || <span className="rm-lang-hint">{t.pick}</span>}
      </button>
      {open &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setOpen(false)} />
            <div className="fixed z-[61] w-72 rounded-xl border border-border bg-surface p-3 text-foreground shadow-float" style={{ top: pos.top, left: pos.left }}>
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{t.level}</div>
              <select className="h-8 w-full rounded-md border border-input bg-surface px-1.5 text-sm" value={level ?? ''} onChange={(e) => setLevel(e.target.value)}>
                <option value="">{t.none}</option>
                {LANGUAGE_LEVELS.map((lv) => (
                  <option key={lv} value={lv}>{levelText(lv, locale, true)}</option>
                ))}
              </select>
              {!level && fluency ? (
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {t.legacy}: “{fluency}”
                </p>
              ) : null}
              <div className="mb-1 mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{t.cert}</div>
              <input className="h-8 w-full rounded-md border border-input bg-surface px-2 text-sm" list={listId} placeholder={t.certName} value={cert.name ?? ''} onChange={(e) => setCert('name', e.target.value)} />
              <datalist id={listId}>
                {CERTIFICATION_SUGGESTIONS.map((s) => <option key={s} value={s} />)}
              </datalist>
              <div className="mt-1.5 flex gap-1.5">
                <input className="h-8 min-w-0 flex-[2] rounded-md border border-input bg-surface px-2 text-sm" placeholder={t.score} value={cert.score ?? ''} onChange={(e) => setCert('score', e.target.value)} />
                <input className="h-8 min-w-0 flex-1 rounded-md border border-input bg-surface px-2 text-sm" placeholder={t.year} inputMode="numeric" value={cert.year ?? ''} onChange={(e) => setCert('year', e.target.value)} />
              </div>
              <details className="mt-3" open={!!europass}>
                <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{t.detail}</summary>
                <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                  {EUROPASS_SKILLS.map((k) => (
                    <label key={k} className="text-[11px] text-muted-foreground">
                      {europassSkillLabel(k, locale)}
                      <select className="mt-0.5 h-8 w-full rounded-md border border-input bg-surface px-1 text-sm text-foreground" value={europass?.[k] ?? ''} onChange={(e) => setSkill(k, e.target.value)}>
                        <option value="">—</option>
                        {CEFR_ONLY.map((lv) => <option key={lv} value={lv}>{lv}</option>)}
                      </select>
                    </label>
                  ))}
                </div>
              </details>
              <div className="mt-3 flex justify-end">
                <button className="btn-primary btn-sm" onClick={() => setOpen(false)}>
                  {t.done}
                </button>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  )
}
