import { lintra, round2dec } from "./number"

export function gyrMap(v: number, midYellow = .3): string {
  const v_min = 0.0
  const v_max = 1.0
  const b = '00'
  if (v > midYellow) {
    const r = 'ff'
    const gv = round2dec(lintra(v, midYellow, v_max, 255, 0), 0)
    const g = gv.toString(16).padStart(2, '0')
    return `#${r}${g}${b}`
  } else {
    const r = round2dec(lintra(v, v_min, midYellow, 0, 255), 0).toString(16).padStart(2, '0')
    const g = 'ff'
    return `#${r}${g}${b}`
  }
}
