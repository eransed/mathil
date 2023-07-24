import { linearTransform, round2dec, siPretty } from "./number"
import { Vec2 } from "./vec2"

const defaultSize = 700
export const GRAPHS: DataStats[] = []

export interface DataStats {
  data: number[]
  maxSize: number
  accumulated: number
  baseUnit: string
  accUnit: string
  label: string
  prettyPrint: (v: number, s?: string, d?: number) => string
  stdDev: number
  variance: number
  max: number
  min: number
  range: number
  mean: number
  median: number
  sum: number
  sqSum: number
  completePopulation: boolean
  debug: boolean
  calculationTimeUs: number
}

export function newDataStats(): DataStats {
  const nds: DataStats = {
    data: [],
    maxSize: defaultSize,
    accumulated: 0,
    baseUnit: "",
    accUnit: "",
    label: "",
    prettyPrint: siPretty,
    stdDev: 0,
    variance: 0,
    range: 0,
    mean: 0,
    median: 0,
    sum: 0,
    sqSum: 0,
    completePopulation: false,
    debug: false,
    max: 0,
    min: 0,
    calculationTimeUs: 0
  }
  GRAPHS.push(nds)
  return nds
}

export function updateStats(ds: DataStats): void {
  const st = performance.now()
  if (ds.data.length === 0) return
  if (ds.data.length < 2 && ds.data.length > 0) return
  let sum = 0
  let max = 0
  let min = Infinity
  const distList: number[] = []
  ds.data.forEach(v => {
    distList.push(v)
    sum+=v
    if (v < min) min = v
    if (v > max) max = v
  })
  const mean = sum/ds.data.length
  let sq_sum = 0
  ds.data.forEach(v => {
    sq_sum+=Math.pow(v-mean, 2)
  })

  distList.sort((a, b) => a-b)
  let median: number
  if (distList.length % 2 !== 0) {
    const a = distList[Math.floor(distList.length/2)]
    const b = distList[Math.ceil(distList.length/2)]
    median = round2dec((a + b) / 2, 2)
  } else {
    median = distList[distList.length/2]
  }

  const len = (ds.completePopulation ? ds.data.length : ds.data.length - 1)
  const variance = sq_sum/len
  const sd = Math.sqrt(variance)
  // const sd = Math.sqrt(sq_sum)
  if (ds.debug) {
    console.log ('LEN ', ds.data.length)
    console.log ('SUM ', sum)
    console.log ('MEAN ', mean)
    console.log ('SQSUM ', sq_sum)
    console.log ('VARIANCE ', variance)
    console.log ('STD.DEV ', sd)
  }
  ds.mean = mean
  ds.median = median
  ds.sum = sum
  ds.sqSum = sq_sum
  ds.stdDev = sd
  ds.variance = variance
  ds.max = max
  ds.min = min
  ds.range = max - min
  ds.calculationTimeUs = performance.now() - st
}

export function addDataPoint(dataStats: DataStats, dp: number): void {
  dataStats.accumulated += dp
  dataStats.data.push(dp)
  if (dataStats.data.length > dataStats.maxSize) {
    dataStats.data.shift()
  }
  updateStats(dataStats)
}

export function getLatestValue(ds: DataStats, defaultValueIfNaN = 0): number {
  const val = ds.data[ds.data.length - 1]
  if (isNaN(val)) return defaultValueIfNaN
  return val
}

export function getAverage(ds: DataStats): number {
  return ds.data.reduce((prev, cur) => prev + cur, 0) / ds.data.length
}

export function getMin(ds: DataStats): number {
  return ds.data.reduce((a, b) => Math.min(a, b), Infinity)
}

export function getMax(ds: DataStats): number {
  return ds.data.reduce((a, b) => Math.max(a, b), -Infinity)
}

export function renderGraph(ds: DataStats, topLeft: Vec2, size: Vec2, ctx: CanvasRenderingContext2D): void {
  ctx.save()
  ctx.translate(topLeft.x, topLeft.y)
  const thinLine = 3
  const edgePad = 10
  const minRenderDist = 30
  const value = getLatestValue(ds)
  const min = getMin(ds)
  const max = getMax(ds)
  const a = getAverage(ds)
  const spread = ds.prettyPrint(max - min, ds.baseUnit)
  ctx.fillStyle = "#000"
  ctx.lineWidth = thinLine
  ctx.strokeStyle = "#777"
  // setScaledFont(ctx)
  ctx.strokeRect(0, 0, size.x, size.y)
  const leftPad = -280

  const yval = linearTransform(value, min - edgePad, max + edgePad, size.y - edgePad, edgePad)
  ctx.fillText(`${ds.prettyPrint(value, ds.baseUnit)}`, size.x + 40, 10 + yval)
  ctx.fillRect(size.x, yval, 30, thinLine)

  ctx.fillStyle = "#88e"
  const yaver = linearTransform(a, min - edgePad, max + edgePad, size.y - edgePad, edgePad)
  ctx.fillText(`a: ${ds.prettyPrint(a, ds.baseUnit)}`, leftPad, 10 + yaver)
  ctx.fillRect(-30, yaver, 30, thinLine)

  const ymax = linearTransform(max, min - edgePad, max + edgePad, size.y - edgePad, edgePad)
  if (ymax + minRenderDist < yaver) {
    ctx.fillStyle = "#e00"
    ctx.fillText(`h: ${ds.prettyPrint(max, ds.baseUnit)}`, leftPad, 10 + ymax)
    ctx.fillRect(-30, ymax, 30, thinLine)
  }

  const ymin = linearTransform(min, min - edgePad, max + edgePad, size.y - edgePad, edgePad)
  if (ymin - minRenderDist > yaver) {
    ctx.fillStyle = "#0e0"
    ctx.fillText(`l: ${ds.prettyPrint(min, ds.baseUnit)}`, leftPad, 10 + ymin)
    ctx.fillRect(-30, ymin, 30, thinLine)
  }

  const points: Vec2[] = []

  ds.data.forEach((n, i) => {
    const xmap = linearTransform(i, 0, ds.maxSize, edgePad, size.x - edgePad)
    const ymap = linearTransform(n, min - edgePad, max + edgePad, size.y - edgePad, edgePad)
    points.push({ x: xmap, y: ymap })
  })

  ctx.fillStyle = "#000"
  ctx.strokeStyle = "#000"

  if (points.length > 1) {
    ctx.lineWidth = thinLine
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.stroke()
  } else {
    points.forEach((v) => {
      ctx.fillRect(v.x, v.y, edgePad, thinLine)
    })
  }
  ctx.fillStyle = "#0e0"
  const places = ds.data.length === ds.maxSize ? ` ~${spread}` : ` ${ds.data.length}/${ds.maxSize}`
  ctx.fillText(`${ds.label}${places}`, 0, -Math.floor(edgePad * 1.5))
  ctx.restore()
}
