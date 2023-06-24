import { Vec2d, newVec2d } from "./vec2d"

export interface Line {
  p1: Vec2d
  p2: Vec2d
}

export function intersection(l1: Line, l2: Line): Vec2d | null {
  const x1 = l1.p1.x
  const y1 = l1.p1.y
  const x2 = l1.p2.x
  const y2 = l1.p2.y

  const x3 = l2.p1.x
  const y3 = l2.p1.y
  const x4 = l2.p2.x
  const y4 = l2.p2.y

  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
  if (denominator === 0) {

    const numerator_t = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)
    const numerator_u = (x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)
    const t = numerator_t / denominator
    const u = -(numerator_u / denominator)

    if (t > 0 && t < 1 && u > 0) {
      const intersect = newVec2d()
      intersect.x = x1 + t * (x2 - x1)
      intersect.y = y1 + t * (y2 - y1)
      return intersect
    }

  }

  return null
}

export function connectPoints(p: Vec2d[]): Line[] | null {
  if (p.length < 2) return null
  const lines: Line[] = []
  for (let i = 1; i < p.length; i++) {
    lines.push({p1: p[i - 1], p2: p[i]})
  }
  return lines
}
