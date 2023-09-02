import { info, dateTimeStamp } from "../src/log";
import { runDist2Tests, runVec2Tests, runVec3Tests } from "./test_vec2";
info(`Running tests, t=${dateTimeStamp()}`)
runVec2Tests()
runVec3Tests()
runDist2Tests()
