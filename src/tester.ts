import { usNow, usPretty, bad, good, log } from "./log"
import { round2dec } from "./number"

export class Tester<T, U extends (...p: any) => T> {
  private eq: (a: T, b: T) => boolean
  private to_str: (t: T) => string
  private passed: number = 0
  private failed: number = 0
  private startTime: number

  constructor(_eq: (a: T, b: T) => boolean, _to_str: (t: T) => string, testName = '_default_') {
    this.eq = _eq
    // this.to_str = _to_str
    this.to_str = (o: any) => { return JSON.stringify(o) }
    console.log()
    log(`Testing: ${testName} ${this.eq.name}`)
    this.startTime = usNow()
  }

  test(expect: T, func: U, ...params: any[]): void {
    const start = usNow()
    const got: T = func(...params)
    const runTime = usPretty(usNow() - start)
    const testResult = this.eq(got, expect)
    const paraStr: string[] = []
    params.forEach((p: any) => {
      // console.log(p)
      // console.log(this.to_str(p))
      paraStr.push(this.to_str(p))
    })

    if (testResult === true) {
      this.passed++
      good(`Passed: ${func.name}(${paraStr}) => ${this.to_str(got)}  T=${runTime}`)
    } else {
      this.failed++
      bad(`FAILED: ${func.name}(${paraStr}) => ${this.to_str(got)}, expected => ${this.to_str(expect)}   T=${runTime}`)
    }
  }

  summary(): void {
    const total: number = this.passed + this.failed
    const runTime = usPretty(usNow() - this.startTime)
    let percent = 0
    if (total > 0) percent = round2dec(this.passed / total * 100, 1)
    log(`${percent}%, ${this.passed}/${total} test(s) passed   T=${runTime}\n`)
  }
}

export function equalNum(a: number, b: number): boolean {
  return a === b
}

export function toStr(o: any): string {
  return JSON.stringify(o)
}
