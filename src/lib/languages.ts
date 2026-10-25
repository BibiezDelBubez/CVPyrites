/**
 * CVPyrites — language skills in the format Italian recruiters expect (and ATS
 * read reliably): one plain-text line per language with the CEFR / QCER level,
 * an optional descriptor ("C1 – Avanzato") and an optional certification
 * ("IELTS Academic 7.5 (2023)"). Dots are only ever a decoration on top of it.
 *
 *   Italiano   Madrelingua
 *   Inglese    C1 – Avanzato · IELTS Academic 7.5 (2023)
 *
 * Backward compatible: a language without an explicit `level` keeps showing its
 * free-text `fluency` exactly as before; a CEFR code found inside it ("C1",
 * "Madrelingua", "Native"…) is still recognised for dots and ATS checks.
 */
import type { Cefr, Language, LanguageLevel } from '@/types/resume'
import type { CvLocale } from '@/types/metadata'

export const LANGUAGE_LEVELS: LanguageLevel[] = ['native', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1']

/** Official CEFR / QCER descriptors. */
const DESCRIPTORS: Record<CvLocale, Record<LanguageLevel, string>> = {
  it: { native: 'Madrelingua', C2: 'Padronanza', C1: 'Avanzato', B2: 'Intermedio superiore', B1: 'Intermedio', A2: 'Elementare', A1: 'Base' },
  en: { native: 'Native', C2: 'Proficient', C1: 'Advanced', B2: 'Upper intermediate', B1: 'Intermediate', A2: 'Elementary', A1: 'Beginner' },
}

const loc = (locale?: CvLocale): CvLocale => (locale === 'en' ? 'en' : 'it')

/** "C1 – Avanzato" (descriptor on) / "C1" (off) / "Madrelingua". */
export function levelText(level: LanguageLevel, locale?: CvLocale, descriptor = true): string {
  const d = DESCRIPTORS[loc(locale)][level]
  if (level === 'native') return d
  return descriptor ? `${level} – ${d}` : level
}

/** Find a CEFR level inside legacy free text ("C1", "Livello B2", "Madrelingua", "Native"…). */
export function parseLevel(text?: string): LanguageLevel | undefined {
  const t = (text || '').trim()
  if (!t) return undefined
  if (/madrelingua|lingua madre|native|mother[\s-]?tongue|bilingu/i.test(t)) return 'native'
  const m = t.match(/\b([ABC])\s?([12])\b/i)
  return m ? (`${m[1].toUpperCase()}${m[2]}` as LanguageLevel) : undefined
}

/** Explicit level, or one recognised in the legacy fluency text. */
export function effectiveLevel(l: Pick<Language, 'level' | 'fluency'>): LanguageLevel | undefined {
  return l.level ?? parseLevel(l.fluency)
}

/**
 * "Cambridge C1 Advanced (CAE) · Punteggio 203/210 · 2019" — labelled so the
 * score can't be mistaken for anything else. Empty when no certification name.
 * A bare CEFR code in the score field reads "Livello C2" instead of "Punteggio C2".
 */
export function certificationText(l: Pick<Language, 'certification'>, locale?: CvLocale): string {
  const c = l.certification
  if (!c || !c.name?.trim()) return ''
  const en = loc(locale) === 'en'
  const score = c.score?.trim()
  const scoreText = score ? (/^[ABC][12]$/i.test(score) ? `${en ? 'Level' : 'Livello'} ${score.toUpperCase()}` : `${en ? 'Score' : 'Punteggio'} ${score}`) : ''
  return [c.name.trim(), scoreText, c.year?.trim()].filter(Boolean).join(' · ')
}

/** The three Europass macro-skills (2020+ Europass CV grid). */
export const EUROPASS_SKILLS = ['understanding', 'speaking', 'writing'] as const
export type EuropassSkill = (typeof EUROPASS_SKILLS)[number]
export const CEFR_ONLY: Cefr[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const SKILL_LABELS: Record<CvLocale, Record<EuropassSkill, string>> = {
  it: { understanding: 'Comprensione', speaking: 'Parlato', writing: 'Scrittura' },
  en: { understanding: 'Understanding', speaking: 'Speaking', writing: 'Writing' },
}
export function europassSkillLabel(skill: EuropassSkill, locale?: CvLocale): string {
  return SKILL_LABELS[loc(locale)][skill]
}

/** "Comprensione C1 · Parlato B2 · Scrittura C1" — only the skills that are filled in. */
export function europassText(l: Pick<Language, 'europass'>, locale?: CvLocale): string {
  const e = l.europass
  if (!e) return ''
  return EUROPASS_SKILLS.filter((k) => e[k]).map((k) => `${europassSkillLabel(k, locale)} ${e[k]}`).join(' · ')
}

/** Level text alone ("C2 – Padronanza"), or the legacy free text when no explicit level. */
export function levelLine(l: Language, locale?: CvLocale, descriptor = true): string {
  return l.level ? levelText(l.level, locale, descriptor) : (l.fluency || '').trim()
}

/**
 * Single-line form for places without layout (JSON Resume `fluency`, ATS text):
 * "C2 – Padronanza — Cambridge C1 Advanced (CAE) · Punteggio 203/210 · 2019".
 * On the resume itself the certification sits on its own line (see Languages).
 */
export function languageLine(l: Language, locale?: CvLocale, descriptor = true): string {
  const level = levelLine(l, locale, descriptor)
  const detail = europassText(l, locale)
  const head = detail ? (level ? `${level} (${detail})` : detail) : level
  return [head, certificationText(l, locale)].filter(Boolean).join(' — ')
}

/** Dots derived from the level: A1 = 1 … C2 / native = 6 (out of LEVEL_DOTS_MAX). */
export const LEVEL_DOTS_MAX = 6
export function levelDots(level: LanguageLevel): number {
  return level === 'native' ? 6 : { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 }[level]
}

/** Section display options (stored per section under layout.sectionSettings). */
export interface LangDisplay {
  /** also draw dots (derived from the level) next to the text */
  meter: boolean
  /** "C1 – Avanzato" instead of just "C1" */
  descriptor: boolean
}
export function langDisplay(settings?: { langMeter?: boolean; langDescriptor?: boolean }): LangDisplay {
  return { meter: settings?.langMeter === true, descriptor: settings?.langDescriptor !== false }
}

/** Common certifications, offered as suggestions (free text is still allowed). */
export const CERTIFICATION_SUGGESTIONS = [
  'IELTS Academic',
  'IELTS General Training',
  'TOEFL iBT',
  'Cambridge B1 Preliminary (PET)',
  'Cambridge B2 First (FCE)',
  'Cambridge C1 Advanced (CAE)',
  'Cambridge C2 Proficiency (CPE)',
  'Trinity ISE',
  'Linguaskill',
  'TOEIC',
  'DELE',
  'SIELE',
  'DELF',
  'DALF',
  'Goethe-Zertifikat',
  'TestDaF',
  'telc',
  'CILS',
  'CELI',
  'PLIDA',
  'HSK',
  'JLPT',
]

export const LANGUAGE_SUGGESTIONS: Record<CvLocale, string[]> = {
  it: ['Italiano', 'Inglese', 'Francese', 'Spagnolo', 'Tedesco', 'Portoghese', 'Russo', 'Arabo', 'Cinese', 'Giapponese', 'Olandese', 'Rumeno', 'Polacco'],
  en: ['English', 'Italian', 'French', 'Spanish', 'German', 'Portuguese', 'Russian', 'Arabic', 'Chinese', 'Japanese', 'Dutch', 'Romanian', 'Polish'],
}
