import { round2dec } from "./number"

const RES = 0
const BLK = 30
const RED = 31
const GRN = 32
const YEL = 33
const BLU = 34
const MAG = 35
const CYN = 36
const WHT = 37

function bg(fg: number) {
  return fg + 10
}

function ansi(color: number) {
  return `\x1b[1;${color}m`
}

function color2(str: string, style1: number, style2: number) {
  return `${ansi(style1)}${ansi(style2)}${str}${ansi(RES)}`
}

function getFileName(s: string): string {
  if (s.includes('\\')) {
    const arr = s.split('\\')
    return arr[arr.length - 1]
  } else if (s.includes('/')) {
    const arr = s.split('/')
    return arr[arr.length - 1]
  }
  return s
}

function fnNameLine(): string {
  try {
    const stack = new Error().stack
    if (stack) {
      const frame = stack.split('\n')[3]
      const functionName = frame.split(' ')[5]
      if (functionName.includes('<anonymous>') || frame.includes('(') === false) {
        const a = getFileName(frame).split(':')
        return a.slice(0, -2).join('')
      }
      return `${functionName}`
    }

  } catch(e) {
    return '<!>'
  }
  return '<?>'
}

function getTimeStats(): string {
  const sinceStartUs = usNow() - startTimeUs
  const sinceLastUs = usNow() - sinceLastLogUs
  sinceLastLogUs = usNow()
  return `${usPretty(sinceStartUs)}/${usPretty(sinceLastUs)}`
}

export function dateTimeFormat(d: Date): string {
  const ms = ('' + d.getMilliseconds()).padStart(3, '0')
  return `${d.toLocaleString('sv-SE')}.${ms}`
}

export function dateTimeStamp(): string {
  const d = new Date()
  return dateTimeFormat(d)
}

export function usNow() {
  return performance.now() * 1000
}

// export function usPretty(us: number): string {
//   const D = 24 * 60 * 60 * 1e6
//   const H = 60 * 60 * 1e6
//   const M = 60 * 1e6
//   const S = 1e6
//   const MS = 1e3
//   const mu = '\u03BC'
//   if (us >= D) return `${round2dec(us / D, 2)}d`
//   if (us >= H) return `${round2dec(us / H, 1)}h`
//   if (us >= M) return `${round2dec(us / M, 1)}m`
//   if (us >= S) return `${round2dec(us / S, 1)}s`
//   if (us >= MS) return `${round2dec(us / MS, 1)}ms`
//   return `${round2dec(us, 0)}${mu}s`
// }

export function usPretty(us: number, dec = 1, decDay = 2): string {
  const D = 24 * 60 * 60 * 1e6
  const H = 60 * 60 * 1e6
  const M = 60 * 1e6
  const S = 1e6
  const MS = 1e3
  const mu = '\u03BC'
  if (us >= D) return `${round2dec(us / D, decDay)}d`
  if (us >= H) return `${round2dec(us / H, dec)}h`
  if (us >= M) return `${round2dec(us / M, dec)}m`
  if (us >= S) return `${round2dec(us / S, dec)}s`
  if (us >= MS) return `${round2dec(us / MS, dec)}ms`
  return `${round2dec(us, 0)}${mu}s`
}

export interface Dimension<T> {
  value: T
  unit: string
}

export function dimStr<T>(dim: Dimension<T>): string {
  return `${dim.value}${dim.unit}`
}

export function usPretty2(us: number, dec=1, decDay=2): Dimension<string> {
  const D = 24 * 60 * 60 * 1e6
  const H = 60 * 60 * 1e6
  const M = 60 * 1e6
  const S = 1e6
  const MS = 1e3
  const mu = '\u03BC'
  if (us >= D) return {value: `${(us / D).toFixed(decDay)}`, unit: 'd'}
  if (us >= H) return {value: `${(us / H).toFixed(dec)}`, unit: 'h'}
  if (us >= M) return {value: `${(us / M).toFixed(dec)}`, unit: 'm'}
  if (us >= S) return {value: `${(us / S).toFixed(dec)}`, unit: 's'}
  if (us >= MS) return {value: `${(us / MS).toFixed(dec)}`, unit: 'ms'}
  return {value: `${(us).toFixed(0)}`, unit: `${mu}s`}
}

export function log(str: string): void {
  const s = getTimeStats()
  console.log(`${dateTimeStamp()} (${s}) <${fnNameLine()}> ${str}`)
}

export function info(str: string): void {
  const s = getTimeStats()
  console.log(color2(`i ${dateTimeStamp()} (${s}) <${fnNameLine()}>`, MAG, MAG) + ` ${str}`)
}

export function warn(str: string): void {
  const s = getTimeStats()
  console.log(color2(`w ${dateTimeStamp()} (${s}) <${fnNameLine()}>`, YEL, YEL) + ` ${str}`)
}

export function error(str: string): void {
  const s = getTimeStats()
  console.log(color2(`e ${dateTimeStamp()} (${s}) <${fnNameLine()}>`, WHT, bg(RED)) + ` ${str}`)
}

export function good(str: string): void {
  const s = getTimeStats()
  console.log(color2(`${dateTimeStamp()} (${s}) <${fnNameLine()}>`, WHT, bg(GRN)) + ` ${str}`)
}

export function bad(str: string): void {
  const s = getTimeStats()
  console.log(color2(`${dateTimeStamp()} (${s}) <${fnNameLine()}>`, WHT, bg(RED)) + ` ${str}`)
}

const startTimeUs = usNow()
let sinceLastLogUs = usNow()
