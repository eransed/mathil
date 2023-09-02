import { info, dateTimeStamp } from "../src/log";
import { runVec2Tests, runVec3Tests } from "./test_vec2";
info(`Running tests, t=${dateTimeStamp()}`)
runVec2Tests()
runVec3Tests()
