
export class EveryInterval {
  private currentTick = 0
  private maxTicks = 1

  constructor(maxTicks: number) {
    this.maxTicks = maxTicks
  }

  tick(callback: () => void, _maxTicks: number | null = null) {
    this.currentTick++
    if (_maxTicks !== null) {
      this.maxTicks = _maxTicks
    }
    if (this.currentTick >= this.maxTicks) {
      callback()
      this.currentTick = 0
    }
  }
}

export class Pair<T> {
  one: T
  two: T
  constructor(one: T, two: T) {
    this.one = one
    this.two = two
  }
}
