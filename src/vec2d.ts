
import { error } from "./log"
import { round2dec, rndf, degToRad, radToDeg, limit } from "./number"

export interface Vec2d {
  x: number
  y: number
}

export function to_string(v: Vec2d, dec = 0): string {
  return "(" + round2dec(v.x, dec) + ", " + round2dec(v.y, dec) + ")"
}

export function newVec2d(_x = 0, _y = 0): Vec2d {
  return { x: _x, y: _y }
}

export function vec2dArray(count: number, max = 600, min = 0, randomGenerator = rndf): Vec2d[] {
  const s: Vec2d[] = []
  for (let i = 0; i < count; i++) {
    s.push(newVec2d(randomGenerator(min, max), randomGenerator(min, max)))
  }
  return s
}

export function filterOutClose(v: Vec2d[], minDist: number): Vec2d[] {
  for (let i = 0; i < v.length; i++) {
    for (let j = 0; j < v.length; j++) {
      if (i === j) continue
      const v0 = v[i]
      const v1 = v[j]
      if (dist(v0, v1) < minDist) {
        v.splice(i, 1)
      }
    }
  }
  return v
}

export function center(v: Vec2d[]): Vec2d {
  let sumx = 0, sumy = 0
  for (let i = 0; i < v.length; i++) {
    sumx+=v[i].x
    sumy+=v[i].y
  }
  return newVec2d(sumx/v.length, sumy/v.length)
}

export function group(v: Vec2d[], radius: number): Vec2d[] {
  error('group not implemented')
  throw new Error('group not implemented')
  for (let i = 0; i < v.length; i++) {
    
  }
  return v
}

export function pointInPolygon(p: Vec2d, pg: Vec2d[]): boolean {
  error('pointInPolygon not implemented')
  throw new Error('pointInPolygon not implemented')
  return false
}

export function convexHull(v: Vec2d[]): Vec2d[] {
  error('convexHull not implemented')
  throw new Error('convexHull not implemented')
  return v
}

export function equal(v0: Vec2d, v1: Vec2d): boolean {
  if (v0.x === v1.x && v0.y === v1.y) {
    return true
  }
  return false
}

export function maxElem(v: Vec2d): number {
  return Math.max(v.x, v.y)
}

export function minElem(v: Vec2d): number {
  return Math.min(v.x, v.y)
}

export function copy(from: Vec2d): Vec2d {
  return { x: from.x, y: from.y }
}

export function add(to: Vec2d, from: Vec2d): Vec2d {
  const tmp: Vec2d = copy(to)
  tmp.x += from.x
  tmp.y += from.y
  return tmp
}

export function sub(to: Vec2d, from: Vec2d): Vec2d {
  const tmp: Vec2d = copy(to)
  tmp.x -= from.x
  tmp.y -= from.y
  return tmp
}

export function scalarMultiply(v: Vec2d, s: number): Vec2d {
  const tmp: Vec2d = copy(v)
  tmp.x *= s
  tmp.y *= s
  return tmp
}

export function smul(v: Vec2d, s: number): Vec2d {
  const tmp: Vec2d = copy(v)
  tmp.x *= s
  tmp.y *= s
  return tmp
}

export function sdiv(v: Vec2d, s: number): Vec2d {
  if (s === 0) {
    error("Division by 0")
    return { x: 0, y: 0 }
  }
  const tmp: Vec2d = copy(v)
  tmp.x /= s
  tmp.y /= s
  return tmp
}

export function round(v: Vec2d, decimals: number): Vec2d {
  const tmp = copy(v)
  tmp.x = round2dec(tmp.x, decimals)
  tmp.y = round2dec(tmp.y, decimals)
  return tmp
}

export function floor(v: Vec2d): Vec2d {
  return { x: Math.floor(v.x), y: Math.floor(v.y) }
}

export function magnitude(v: Vec2d): number {
  return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2))
}

export function mag(v: Vec2d): number {
  return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2))
}

export function norm(v: Vec2d): Vec2d {
  return sdiv(v, mag(v))
}

export function dist(v0: Vec2d, v1: Vec2d): number {
  return Math.sqrt(Math.pow(v1.x - v0.x, 2) + Math.pow(v1.y - v1.y, 2))
}

export function direction(angleDegree: number): Vec2d {
  return {
    x: Math.cos(degToRad(angleDegree)),
    y: Math.sin(degToRad(angleDegree)),
  }
}

export function angle(v: Vec2d): number {
  return radToDeg(Math.atan2(v.y, v.x))
}

export function rndfVec2d(min: number, max: number): Vec2d {
  return { x: rndf(min, max), y: rndf(min, max) }
}

export function limitv(v: Vec2d, max: Vec2d): Vec2d {
  return { x: limit(v.x, max.x), y: limit(v.y, max.y) }
}

export function wrap(vector: Vec2d, screen: Vec2d) {
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

function mirrorWrap(vector: Vec2d, screen: Vec2d) {
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

export function withinBounds(v: Vec2d, maxBound: Vec2d, minBound: Vec2d = { x: 0, y: 0 }) {
  if (v.x > minBound.x) return false
  if (v.x < maxBound.x) return false
  if (v.y > minBound.y) return false
  if (v.y < maxBound.y) return false
  return true
}
