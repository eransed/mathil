
import { error } from "./log"
import { round2dec, rndf, degToRad, radToDeg, limit } from "./number"

export interface Vec2 {
  x: number
  y: number
}

export function to_string2(v: Vec2, dec = 0): string {
  return "(" + round2dec(v.x, dec) + ", " + round2dec(v.y, dec) + ")"
}

export function newVec2(_x = 0, _y = 0): Vec2 {
  return { x: _x, y: _y }
}

export function vec2Array(count: number, max = 600, min = 0, randomGenerator = rndf): Vec2[] {
  const s: Vec2[] = []
  for (let i = 0; i < count; i++) {
    s.push(newVec2(randomGenerator(min, max), randomGenerator(min, max)))
  }
  return s
}

export function filterOutClose(v: Vec2[], minDist: number): Vec2[] {
  for (let i = 0; i < v.length; i++) {
    for (let j = 0; j < v.length; j++) {
      if (i === j) continue
      const v0 = v[i]
      const v1 = v[j]
      if (dist2(v0, v1) < minDist) {
        v.splice(i, 1)
      }
    }
  }
  return v
}

/**
 * Calculate the geometric center of a given array of points
 * @param v array of points
 * @returns the geometric center point
 */
export function center2(v: Vec2[]): Vec2 {
  let sumx = 0, sumy = 0
  for (let i = 0; i < v.length; i++) {
    sumx+=v[i].x
    sumy+=v[i].y
  }
  return newVec2(sumx/v.length, sumy/v.length)
}

export function group(v: Vec2[], radius: number): Vec2[] {
  error('group not implemented')
  throw new Error('group not implemented')
  for (let i = 0; i < v.length; i++) {
    
  }
  return v
}

export function pointInPolygon(p: Vec2, pg: Vec2[]): boolean {
  error('pointInPolygon not implemented')
  throw new Error('pointInPolygon not implemented')
  return false
}

export function boundingBox(v: Vec2[]): Vec2[] {
  let minx = Infinity
  let miny = Infinity
  let maxx = -Infinity
  let maxy = -Infinity

  for (let i = 0; i < v.length; i++) {
    const t = v[i]
    if (t.x < minx) minx = t.x
    if (t.x > maxx) maxx = t.x
    if (t.y < miny) miny = t.y
    if (t.y > maxy) maxy = t.y
  }

  const tl = newVec2(minx, miny)
  const lr = newVec2(maxx, maxy)
  const tr = newVec2(maxx, miny)
  const ll = newVec2(minx, maxy)

  return [tl, tr, lr, ll]

}

export function convexHull(v: Vec2[]): Vec2[] {
  error('convexHull not implemented')
  throw new Error('convexHull not implemented')
  return v
}

export function equal2(v0: Vec2, v1: Vec2): boolean {
  if (v0.x === v1.x && v0.y === v1.y) {
    return true
  }
  return false
}

export function maxElem2(v: Vec2): number {
  return Math.max(v.x, v.y)
}

export function minElem2(v: Vec2): number {
  return Math.min(v.x, v.y)
}

export function copy2(from: Vec2): Vec2 {
  return { x: from.x, y: from.y }
}

export function add2(to: Vec2, from: Vec2): Vec2 {
  const tmp: Vec2 = copy2(to)
  tmp.x += from.x
  tmp.y += from.y
  return tmp
}

export function sub2(to: Vec2, from: Vec2): Vec2 {
  const tmp: Vec2 = copy2(to)
  tmp.x -= from.x
  tmp.y -= from.y
  return tmp
}

export function scalarMultiply2(v: Vec2, s: number): Vec2 {
  const tmp: Vec2 = copy2(v)
  tmp.x *= s
  tmp.y *= s
  return tmp
}

export function smul2(v: Vec2, s: number): Vec2 {
  const tmp: Vec2 = copy2(v)
  tmp.x *= s
  tmp.y *= s
  return tmp
}

export function sdiv2(v: Vec2, s: number): Vec2 {
  if (s === 0) {
    error("Division by 0")
    return { x: 0, y: 0 }
  }
  const tmp: Vec2 = copy2(v)
  tmp.x /= s
  tmp.y /= s
  return tmp
}

export function round2(v: Vec2, decimals: number): Vec2 {
  const tmp = copy2(v)
  tmp.x = round2dec(tmp.x, decimals)
  tmp.y = round2dec(tmp.y, decimals)
  return tmp
}

export function floor2(v: Vec2): Vec2 {
  return { x: Math.floor(v.x), y: Math.floor(v.y) }
}

export function magnitude2(v: Vec2): number {
  return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2))
}

export function mag2(v: Vec2): number {
  return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2))
}

export function norm(v: Vec2): Vec2 {
  return sdiv2(v, mag2(v))
}

export function dist2(v0: Vec2, v1={x: 0.0, y: 0.0}): number {
  return Math.sqrt(Math.pow(v1.x - v0.x, 2) + Math.pow(v1.y - v0.y, 2))
}

export function direction2(angleDegree: number): Vec2 {
  return {
    x: Math.cos(degToRad(angleDegree)),
    y: Math.sin(degToRad(angleDegree)),
  }
}

export function angle2(v: Vec2): number {
  return radToDeg(Math.atan2(v.y, v.x))
}

export function dotProduct(a: Vec2, b: Vec2): number {
  return (a.x*b.x) + (a.y*b.y)
}

export function angle2_v3(a: Vec2, b: Vec2): number {
  return Math.acos((dotProduct(norm(a), norm(b)) / mag2(a) * mag2(b)))
}

export function angle2_v2(a: Vec2, b: Vec2): number {
  const ang = Math.atan2(b.y, b.x) - Math.atan2(a.y, a.x)
  return ang
}

export function rndfVec2(min: number, max: number): Vec2 {
  return { x: rndf(min, max), y: rndf(min, max) }
}

export function limitVec2(v: Vec2, max: Vec2): Vec2 {
  return { x: limit(v.x, max.x), y: limit(v.y, max.y) }
}

export function wrap(vector: Vec2, screen: Vec2) {
  if (vector.x < 0) {
    vector.x = screen.x
  }
  if (vector.x > screen.x) {
    vector.x = 0
  }
  if (vector.y < 0) {
    vector.y = screen.y
  }
  if (vector.y > screen.y) {
    vector.y = 0
  }
}

function mirrorWrap2(vector: Vec2, screen: Vec2) {
  if (vector.x < 0) {
    vector.x = screen.x
    vector.y = screen.y - vector.y
  }
  if (vector.x > screen.x) {
    vector.x = 0
    vector.y = screen.y - vector.y
  }
  if (vector.y < 0) {
    vector.y = screen.y
    vector.x = screen.x - vector.x
  }
  if (vector.y > screen.y) {
    vector.y = 0
    vector.x = screen.x - vector.x
  }
}

export function withinBounds2(v: Vec2, maxBound: Vec2, minBound: Vec2 = { x: 0, y: 0 }) {
  if (v.x > minBound.x) return false
  if (v.x < maxBound.x) return false
  if (v.y > minBound.y) return false
  if (v.y < maxBound.y) return false
  return true
}

export function offBound2_mm(v: Vec2, bound_min: Vec2, bound_max: Vec2) {
  if (v.x > bound_max.x) return true
  if (v.x < bound_min.x) return true
  if (v.y > bound_max.y) return true
  if (v.y < bound_min.y) return true
  return false
}

export function wrap2_mm(v: Vec2, min: Vec2, max: Vec2, change=true): Vec2 {
  const tmp = copy2(v)
  if (tmp.x > max.x) tmp.x = min.x
  if (tmp.x < min.x) tmp.x = max.x
  if (tmp.y > max.y) tmp.y = min.y
  if (tmp.y < min.y) tmp.y = max.y
  if (change === true) {
    v = tmp
    return v
  } else {
    return tmp
  }
}
