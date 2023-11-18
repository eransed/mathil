
import { chord } from '../src/geometry'
import { bad, good } from '../src/log'
import { round2dec } from '../src/number'

export function run_geo_tests() {
  const d = 10
  const a = Math.PI / 2
  const r = 1
  const c = round2dec(chord(a, r), d)
  const p = round2dec(Math.hypot(r, r), d)
  const msg = 'chord test PI/2'
  if (p === c) {
    good(`${msg} passed:`)
  } else {
    bad(`${msg} failed:`)
  }
  console.log({
    a,
    r,
    c,
    p
  })
  console.log()
}
