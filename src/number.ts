
export function rndf(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function rndi(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function limit(n: number, max: number): number {
  return n >= Math.abs(max) ? max : n
}

export function round2dec(num: number, dec = 2): number {
  const exp = Math.pow(10, dec)
  return Math.round((num + Number.EPSILON) * exp) / exp
}

export function degToRad(deg: number): number {
  return deg * (Math.PI / 180.0)
}

export function radToDeg(rad: number): number {
  return rad * (180.0 / Math.PI)
}

export function linearTransform(v: number, v_lower: number, v_upper: number, t_lower: number, t_upper: number) {
  return (v - v_lower) * ((t_upper - t_lower) / (v_upper - v_lower)) + t_lower
}

export function lintra(v: number, v_min: number, v_max: number, t_min = 0.0, t_max = 1.0): number {
  const out = (v - v_min) * ((t_max - t_min) / (v_max - v_min)) + t_min
  if (t_min <= t_max) {
    if (out >= t_max) return t_max
    if (out <= t_min) return t_min
  } else {
    if (out <= t_max) return t_max    
    if (out >= t_min) return t_min
  }
  return out
}

export function siPretty(value: number, baseUnit="", decimals=0): string {
  const prefixes = 'YZEPTGMK'
  let p = 0
  for (let e = 24; e >= 3; e-=3) {
    const lim = Math.pow(10, e)
    const prefix = prefixes.charAt(p)
    if (value >= lim) {
      return `${round2dec(value / lim, decimals)} ${prefix}${baseUnit}`
    }
    p++
  }
  return `${round2dec(value, decimals)} ${baseUnit}`
}
