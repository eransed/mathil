import { Tester } from '../src/tester'
import { equal, newVec2d, to_string } from '../src/vec2d'

export function runVec2dTests(): void {
  const newVec2dTester = new Tester(equal, to_string, 'Test output from newVec2d')
  newVec2dTester.test({ x: 1, y: 3 }, newVec2d, 1, 3)
  newVec2dTester.test({ x: -1, y: 3 }, newVec2d, -1, 3)
  newVec2dTester.test({ x: 1, y: -3 }, newVec2d, 1, -3)
  newVec2dTester.test({ x: 1, y: -3 }, newVec2d, 1, -3)
  newVec2dTester.test({ x: 0, y: 0 }, newVec2d)
  newVec2dTester.test({ x: 0, y: 0 }, newVec2d, 1)
  newVec2dTester.summary()
}
