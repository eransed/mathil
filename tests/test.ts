import { info, dateTimeStamp, usNow, usPretty } from "../src/log";
import { runColorTests } from "./test_color";
import { run_log_tests } from "./test_log";
import { basic_matrixMul, basic_newMat } from "./test_matrix";
import { runDist2Tests, runVec2Tests, runVec3Tests } from "./test_vec2";
import { getVersion, getVersionInfo } from "../src/_package_info"

const test_start_time_us = usNow()

info(`Running tests, t=${dateTimeStamp()}`)
info(`Version: ${getVersion()}`)
run_log_tests()
runVec2Tests()
runVec3Tests()
runDist2Tests()
runColorTests()
basic_newMat()
basic_matrixMul()

process.on('exit', (code) => {
  info('\nBuild info:')
  const vi = getVersionInfo()
  const testTime = usPretty(usNow() - test_start_time_us)
  vi.extra_info = `Test time: ${testTime}`
  console.log(vi)
  console.log('\nProcess exit event with code: ', code);
})
