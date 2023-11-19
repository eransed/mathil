import { Tester, equalNum, toStr } from "../src/tester"
import { dist3, newVec3 } from "../src/vec3"


export function runDist3Tests(): void {
  const newDist3Tester = new Tester(equalNum, toStr, `Test output from <${dist3.name}>`)
  newDist3Tester.test(0, dist3, newVec3(), newVec3())
  newDist3Tester.test(1, dist3, newVec3(1), newVec3())
  newDist3Tester.test(1, dist3, newVec3(), newVec3(1))
  newDist3Tester.test(1, dist3, newVec3(), newVec3(-1, 0))
  newDist3Tester.test(Math.sqrt(2), dist3, newVec3(), newVec3(1, 1))
  newDist3Tester.test(Math.sqrt(2), dist3, newVec3(), newVec3(-1, 1))
  newDist3Tester.test(Math.sqrt(2), dist3, newVec3(42, 42), newVec3(41, 41))
  newDist3Tester.test(Math.sqrt(2), dist3, newVec3(), newVec3(-1, -1))
  newDist3Tester.test(Math.sqrt(3), dist3, newVec3(), newVec3(1, 1, 1))
  newDist3Tester.test(Math.sqrt(3), dist3, newVec3(), newVec3(-1, 1, 1))
  newDist3Tester.test(Math.sqrt(3), dist3, newVec3(), newVec3(1, -1, 1))
  newDist3Tester.test(Math.sqrt(3), dist3, newVec3(), newVec3(1, 1, -1))
  newDist3Tester.test(Math.sqrt(3), dist3, newVec3(), newVec3(-1, -1, -1))
  newDist3Tester.test(Math.sqrt(3), dist3, newVec3(1, 1, 1), newVec3(2, 2, 2))
  newDist3Tester.test(Math.sqrt(3), dist3, newVec3(45, 45, 45), newVec3(46, 46, 46))
  newDist3Tester.test(2.23606797749979, dist3, newVec3(1, 1, 1), newVec3(1, 2, 3))
  newDist3Tester.test(2, dist3, newVec3(1, 1, 1), newVec3(1, 3, 1))
  newDist3Tester.test(12, dist3, newVec3(0, 0, 0), newVec3(0, 0, 12))
  newDist3Tester.test(7, dist3, newVec3(7, 0, 0), newVec3(0, 0, 0))
  newDist3Tester.test(4567, dist3, newVec3(0, 0, 0), newVec3(0, 4567, 0))
  newDist3Tester.test(4567, dist3, newVec3(0, 0, 0), newVec3(0, -4567, 0))
  newDist3Tester.test(6.660330322138685, dist3, newVec3(0, 0, 0), newVec3(1.2, 3.4, 5.6))
  newDist3Tester.test(8.660254037844387, dist3, newVec3(), newVec3(5, 5, 5))
  newDist3Tester.summary()
}

