import { info, dateTimeStamp } from "../src/log";
import { runColorTests } from "./test_color";
import { run_log_tests } from "./test_log";
import { basic_matrixMul, basic_newMat } from "./test_matrix";
import { runDist2Tests, runVec2Tests, runVec3Tests } from "./test_vec2";
info(`Running tests, t=${dateTimeStamp()}`)
runVec2Tests()
runVec3Tests()
runDist2Tests()
run_log_tests()
runColorTests()
basic_newMat()
basic_matrixMul()
