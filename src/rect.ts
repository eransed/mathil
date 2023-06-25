import { Vec2d, newVec2d } from "./vec2d";

export interface Rect {
  topLeft: Vec2d
  topRight: Vec2d
  bottomRight: Vec2d
  bottomLeft: Vec2d
}

export function boundingRect(v: Vec2d[]): Rect {
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

  return {
    topLeft: newVec2d(minx, miny),
    topRight: newVec2d(maxx, miny),
    bottomRight: newVec2d(maxx, maxy),
    bottomLeft: newVec2d(minx, maxy),
  }
}
