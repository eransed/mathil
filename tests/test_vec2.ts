import { Tester } from '../src/tester'
import { equal, newVec2 as newVec2, to_string } from '../src/vec2'

export function runVec2dTests(): void {
  const newVec2dTester = new Tester(equal, to_string, `Test output from <${newVec2.name}>`)
  newVec2dTester.test({ x: 1, y: 3 }, newVec2, 1, 3)
  newVec2dTester.test({ x: -1, y: 3 }, newVec2, -1, 3)
  newVec2dTester.test({ x: 1, y: -3 }, newVec2, 1, -3)
  newVec2dTester.test({ x: 1, y: -3 }, newVec2, 1, -3)
  newVec2dTester.test({ x: 0, y: 0 }, newVec2)
  newVec2dTester.test({ x: 0, y: 0 }, newVec2, 1)
  newVec2dTester.test({ x: 1, y: 45 }, newVec2, 1, 45)
  newVec2dTester.summary()
}

