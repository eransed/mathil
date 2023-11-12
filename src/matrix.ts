import { error } from "./log"
import { Vec2 } from "./vec2"
import { Vec3 } from "./vec3"

export function newMat(rows: number, columns: number, initValue = 0): number[][] {
  if (rows < 1 || columns < 1) {
    throw new Error("Can not create empty matrix")
  }

  // const m = [
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [6, 7, 8]
  // ]

  // const t = [
  //   [1, 1],
  //   [1, 1]
  // ]

  const mat: number[][] = []
  const col: number[] = []

  for (let c = 0; c < columns; c++) {
    col.push(initValue)
  }

  for (let r = 0; r < rows; r++) {
    mat.push(col)
  }

  return mat
}

export function matMulDefined(a: number[][], b: number[][]): boolean {
  if (a[0].length !== b.length) {
    const msg = `Columns of a=${a[0].length} is not equal to rows of ${b.length}`
    error(msg)
    return false
  }
  return true
}

export function matMul(a: number[][], b: number[][]): number[][] {

  if (matMulDefined(a, b) === false) {
    throw new Error('Matrix multiplication not defined')
  }

  const a_row = a.length
  const b_row = b.length
  const b_col = b[0].length
  const prod = newMat(a_row, b_col, 0)
  for (let i = 0; i < a_row; i++) {
    for (let j = 0; j < b_col; j++) {
      let v = 0
      for (let k = 0; k < b_row; k++) {
        v += a[i][k] * b[k][j]
      }
      prod[i][j] = v
    }
  }
  return prod
}

export function vec3toMat(v: Vec3): number[][] {
  return [
    [v.x],
    [v.y],
    [v.z]
  ]
}

export function vec2toMat(v: Vec2): number[][] {
  return [
    [v.x],
    [v.y]
  ]
}

export function matToVec3(m: number[][]): Vec3 {
  if (m.length !== 3) {
    console.log(m)
    throw new Error("Can't convert matrix to Vec3")
  }
  return {
    x: m[0][0],
    y: m[1][0],
    z: m[2][0]
  }
}

export function matToVec2(m: number[][]): Vec2 {
  if (m.length !== 2) {
    console.log(m)
    throw new Error("Can't convert matrix to Vec2")
  }
  return {
    x: m[0][0],
    y: m[1][0]
  }
}
