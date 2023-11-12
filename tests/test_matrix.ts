import { error, good } from "../src/log"
import { matMul, newMat } from "../src/matrix"


export function basic_newMat() {

  const rows = 8
  const cols = 5
  const initVal = .31

  const m0 = newMat(rows, cols, initVal)
  console.log(m0)

  if (m0.length !== rows) {
    error(`matrix row length not ${rows}`)
    return false
  }

  for (let r = 0; r < rows; r++) {
    if (m0[r].length !== cols) {
      error(`matrix column length not ${cols}`)
      return false
    }

    for (let c = 0; c < cols; c++) {

      if (m0[r][c] !== initVal) {
        error(`matrix[${r}][${c}] not equal to ${initVal}`)
        return false
      }

    }

  }

  good("newMat test passed")
  return true
}

export function basic_matrixMul() {
  const a = newMat(5, 4, 3)
  const b = newMat(4, 6, 2)
  console.log(a)
  console.log()
  console.log()
  console.log(b)
  const c = matMul(a, b)
  console.log(a, b, c)
}
