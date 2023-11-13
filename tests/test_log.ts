import { bad, dimStr, error, good, info, log, usNow, usPretty, usPretty2, warn } from "../src/log";

export function run_log_tests() {
    
    const startTime = usNow()
    
    info('Testing log.ts...')
    warn('This a sample warning...')
    error('This a sample error...')
    good('This a sample good...')
    bad('This a sample bad...')
    
    setTimeout(() => {
        const elapsed = dimStr(usPretty2(usNow() - startTime))
        log(`Time elapsed (default args test): ${elapsed}`)
        log(`Old function: ${usPretty(usNow() - startTime)}`)
    }, 50)
    
    setTimeout(() => {
        const elapsed = dimStr(usPretty2(usNow() - startTime, 0, 0))
        log(`Time elapsed (0 decimal test): ${elapsed}`)
        log(`Old function: ${usPretty(usNow() - startTime, 0, 0)}`)
    }, 60)
    
    setTimeout(() => {
        const elapsed = dimStr(usPretty2(usNow() - startTime, 2))
        log(`Time elapsed (2 decimal test): ${elapsed}`)
        log(`Old function: ${usPretty(usNow() - startTime, 2)}`)
    }, 70)
    
}
