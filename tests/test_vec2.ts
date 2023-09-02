import { Tester } from '../src/tester'
import { equal2, newVec2, to_string2 } from '../src/vec2'
import { equal3, newVec3, to_string3 } from '../src/vec3' 

export function runVec2Tests(): void {
  const newVec2Tester = new Tester(equal2, to_string2, `Test output from <${newVec2.name}>`)
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
  const newVec3Tester = new Tester(equal3, to_string3, `Test output from <${newVec3.name}>`)
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

