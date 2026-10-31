/**
 * CVPyrites: predict where the printed PDF breaks pages, so the editor's
 * "Page N" guides match the export.
 *
 * Runs on the hidden print-mode render and follows the same CSS the browser's
 * print engine uses: `break-before/after/inside: avoid` (see the page-break rules
 * in artboard.css), plus a repeated top/bottom page margin (`--rm-pad`, cloned on
 * every printed page — print.css). It's the browser's greedy algorithm in small:
 * fill a page, then break at the last allowed point that still fits.
 */

/** A point where a new page starts, identified so it can be found again in the
 *  editable canvas (which has extra edit-only chrome and different offsets). */
export interface PageBreakAnchor {
  section?: string
  item?: number
  bullet?: number
  /** px into the anchor element (only for a forced break inside a tall block) */
  offset: number
}

interface Candidate {
  /** bottom of the content left on the previous page */
  end: number
  /** top of the content that starts the next page */
  start: number
  el: Element
}

const isAvoid = (v: string) => v === 'avoid' || v === 'avoid-page'

function blockChildren(el: Element): Element[] {
  const out: Element[] = []
  for (const c of Array.from(el.children)) {
    const cs = getComputedStyle(c)
    if (cs.display === 'none' || cs.position === 'absolute' || cs.position === 'fixed') continue
    if (cs.display === 'contents') out.push(...blockChildren(c))
    else if (!cs.display.startsWith('inline')) out.push(c)
  }
  return out
}

/** Side-by-side children (a flex/grid row) can't be broken between vertically. */
function stacksVertically(el: Element): boolean {
  const cs = getComputedStyle(el)
  if (cs.display.includes('flex')) return cs.flexDirection.startsWith('column')
  return !cs.display.includes('grid')
}

function avoidBefore(el: Element): boolean {
  if (isAvoid(getComputedStyle(el).breakBefore)) return true
  const kids = stacksVertically(el) ? blockChildren(el) : []
  return kids.length > 0 && avoidBefore(kids[0])
}

function avoidAfter(el: Element): boolean {
  if (isAvoid(getComputedStyle(el).breakAfter)) return true
  const kids = stacksVertically(el) ? blockChildren(el) : []
  return kids.length > 0 && avoidAfter(kids[kids.length - 1])
}

function collect(el: Element, y0: number, out: Candidate[]): void {
  if (!stacksVertically(el)) return
  const kids = blockChildren(el)
  if (!kids.length) {
    // A plain paragraph may break between lines (keeping 2 lines on each side).
    const cs = getComputedStyle(el)
    const lh = parseFloat(cs.lineHeight)
    const r = el.getBoundingClientRect()
    const lines = lh > 0 ? Math.round(r.height / lh) : 0
    for (let n = 2; n <= lines - 2; n++) {
      const y = r.top - y0 + n * lh
      out.push({ end: y, start: y, el })
    }
    return
  }
  kids.forEach((k, i) => {
    if (i > 0 && !avoidAfter(kids[i - 1]) && !avoidBefore(k)) {
      out.push({ end: kids[i - 1].getBoundingClientRect().bottom - y0, start: k.getBoundingClientRect().top - y0, el: k })
    }
    if (!isAvoid(getComputedStyle(k).breakInside)) collect(k, y0, out)
  })
}

/** Identify the break at height `y` (relative to the page-1 top) by the nearest
 *  section / entry / bullet containing `el`, plus the offset into that element. */
function anchorFor(el: Element, y: number, rootTop: number): PageBreakAnchor {
  const section = el.closest('[data-section]')
  const item = section ? el.closest('.rm-item') : null
  const li = item ? el.closest('.rm-bullets > li') : null
  const ref = li ?? item ?? section
  return {
    section: section?.getAttribute('data-section') ?? undefined,
    item: section && item ? Array.from(section.querySelectorAll('.rm-item')).indexOf(item) : undefined,
    bullet: item && li ? Array.from(item.querySelectorAll(':scope > .rm-bullets > li')).indexOf(li) : undefined,
    offset: ref ? Math.max(0, y - (ref.getBoundingClientRect().top - rootTop)) : 0,
  }
}

/** Simulate one column's pages. Returns where each new page (2, 3, …) starts. */
function paginateColumn(col: Element, rootTop: number, pageH: number, pad: number): PageBreakAnchor[] {
  const cands: Candidate[] = []
  collect(col, rootTop, cands)
  cands.sort((a, b) => a.start - b.start)
  // Where the column's content really ends: in two-column layouts the shorter
  // column is stretched to the other's height, so its own box says nothing.
  const contentEnd = Math.max(0, ...blockChildren(col).map((k) => k.getBoundingClientRect().bottom - rootTop))
  const cap = pageH - 2 * pad
  const breaks: PageBreakAnchor[] = []
  let pageStart = pad // page 1's content starts after its top margin
  while (contentEnd > pageStart + cap + 0.5 && breaks.length < 50) {
    const limit = pageStart + cap
    let best: Candidate | null = null
    for (const c of cands) if (c.start > pageStart + 1 && c.end <= limit + 0.5) best = c
    if (best) {
      breaks.push(anchorFor(best.el, best.start, rootTop))
      pageStart = best.start
    } else {
      // Nothing allowed fits: the browser slices whatever crosses the page edge.
      const sections = Array.from(col.querySelectorAll('[data-section]'))
      const crossing = sections.filter((s) => s.getBoundingClientRect().top - rootTop <= limit).pop() ?? col
      breaks.push(anchorFor(crossing, limit, rootTop))
      pageStart = limit
    }
  }
  return breaks
}

/**
 * Page breaks of a print-mode render. `root` is the element whose top is the top
 * of page 1. With two columns, the longer one sets the pages.
 */
export function simulatePageBreaks(root: HTMLElement, pageH: number, pad: number): PageBreakAnchor[] {
  const rootTop = root.getBoundingClientRect().top
  const cols = Array.from(root.querySelectorAll('.rm-col-main, .rm-col-aside'))
  let best: PageBreakAnchor[] = []
  for (const col of cols) {
    const b = paginateColumn(col, rootTop, pageH, pad)
    if (b.length > best.length) best = b
  }
  return best
}

/** Vertical position (relative to `root`) of a page break in another render of
 *  the same resume — the editable canvas. */
export function locateAnchor(root: HTMLElement, a: PageBreakAnchor, scale = 1): number | null {
  const rootTop = root.getBoundingClientRect().top
  const section = a.section ? root.querySelector(`[data-section="${CSS.escape(a.section)}"]`) : null
  if (!section) return null
  let el: Element = section
  if (a.item != null && a.item >= 0) {
    const item = section.querySelectorAll('.rm-item')[a.item]
    if (item) {
      el = item
      if (a.bullet != null && a.bullet >= 0) el = item.querySelectorAll(':scope > .rm-bullets > li')[a.bullet] ?? item
    }
  }
  // `scale`: the canvas is CSS-transformed (zoom), so client rects are scaled.
  return (el.getBoundingClientRect().top - rootTop) / scale + a.offset
}
