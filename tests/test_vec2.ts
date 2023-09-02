import { Tester, equalNum, toStr } from '../src/tester'
import { dist2, equal2, newVec2, to_string2 } from '../src/vec2'
import { equal3, newVec3, to_string3 } from '../src/vec3' 

export function runVec2Tests(): void {
  const newVec2Tester = new Tester(equal2, toStr, `Test output from <${newVec2.name}>`)
  newVec2Tester.test({ x: 1, y: 3 }, newVec2, 1, 3)
  newVec2Tester.test({ x: -1, y: 3 }, newVec2, -1, 3)
  newVec2Tester.test({ x: 1, y: -3 }, newVec2, 1, -3)
  newVec2Tester.test({ x: 1, y: -3 }, newVec2, 1, -3)
  newVec2Tester.test({ x: 0, y: 0 }, newVec2)
  newVec2Tester.test({ x: 0, y: 0 }, newVec2, 0)
  newVec2Tester.test({ x: 1, y: 45 }, newVec2, 1, 45)
  newVec2Tester.summary()
}

export function runVec3Tests(): void {
  const newVec3Tester = new Tester(equal3, toStr, `Test output from <${newVec3.name}>`)
  newVec3Tester.test({ x: 1, y: 3, z: 0 }, newVec3, 1, 3)
  newVec3Tester.test({ x: -1, y: 3, z: 0}, newVec3, -1, 3)
  newVec3Tester.test({ x: 1, y: -3, z: 0 }, newVec3, 1, -3)
  newVec3Tester.test({ x: 1, y: -3, z: 0 }, newVec3, 1, -3)
  newVec3Tester.test({ x: 0, y: 0, z: 0}, newVec3)
  newVec3Tester.test({ x: 0, y: 0, z: 0 }, newVec3, 0)
  newVec3Tester.test({ x: 1, y: 45, z: 0 }, newVec3, 1, 45)
  newVec3Tester.test({ x: 1, y: 45, z: 99 }, newVec3, 1, 45, 99)
  newVec3Tester.test({ x: 1, y: 45, z: -23499 }, newVec3, 1, 45, -23499)
  newVec3Tester.test({ x: -0.234, y: 123456789, z: -23499 }, newVec3, -0.234, 123456789, -23499)
  newVec3Tester.summary()
}

export function runDist2Tests(): void {
  const newDist2Tester = new Tester(equalNum, toStr, `Test output from <${dist2.name}>`)
  newDist2Tester.test(0, dist2, newVec2(), newVec2())
  newDist2Tester.test(1, dist2, newVec2(1), newVec2())
  newDist2Tester.test(1, dist2, newVec2(), newVec2(1))
  newDist2Tester.test(1, dist2, newVec2(), newVec2(-1, 0))
  newDist2Tester.test(Math.sqrt(2), dist2, newVec2(), newVec2(-1, 1))
  newDist2Tester.summary()
}

export function runDist3Tests(): void {
  const newDist3Tester = new Tester(equalNum, toStr, `Test output from <${dist2.name}>`)
  newDist3Tester.test(0, dist2, newVec2(), newVec2())
  newDist3Tester.test(1, dist2, newVec2(1), newVec2())
  newDist3Tester.test(1, dist2, newVec2(), newVec2(1))
  newDist3Tester.test(1, dist2, newVec2(), newVec2(-1, 0))
  newDist3Tester.test(Math.sqrt(2), dist2, newVec2(), newVec2(-1, 1))
  newDist3Tester.summary()
}

