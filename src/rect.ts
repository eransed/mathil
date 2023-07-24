import { Vec2, newVec2 } from "./vec2";

export interface Rect {
  topLeft: Vec2
  topRight: Vec2
  bottomRight: Vec2
  bottomLeft: Vec2
}

export function boundingRect(v: Vec2[]): Rect {
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
    topLeft: newVec2(minx, miny),
    topRight: newVec2(maxx, miny),
    bottomRight: newVec2(maxx, maxy),
    bottomLeft: newVec2(minx, maxy),
  }
}
