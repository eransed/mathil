import { linearTransform, round2dec, siPretty } from "./number"
import { Vec2 } from "./vec2"

const defaultSize = 500
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

export interface DataStatsGraphStyle {
  highLabel: string
  averageLabel: string
  lowLabel: string
  highColor: string
  averageColor: string
  lowColor: string
  rectOutlineVisible: boolean
  rectOutlineColor: string
  baseColor: string
  leftPad: number
  thinLine: number
  edgePad: number
  minRenderDist: number
  backgroundColor: string
  offset: number
  textOffset: number
  valueOffset: number
}

export function renderGraph(ds: DataStats, topLeft: Vec2, size: Vec2, ctx: CanvasRenderingContext2D, style: DataStatsGraphStyle | null = null): void {

  if (!style) {

    // default style
    const s0: DataStatsGraphStyle = {
      highColor: '#000',
      highLabel: 'hi',
      averageLabel: 'av',
      lowLabel: 'lo',
      averageColor: '#000',
      lowColor: '#000',
      rectOutlineVisible: false,
      rectOutlineColor: '#000',
      baseColor: '#000',
      leftPad: -300,
      thinLine: 3,
      edgePad: 10,
      backgroundColor: '#fff',
      offset: 30,
      minRenderDist: 30,
      textOffset: 10,
      valueOffset: 40
    }

    // some colors
    const s1: DataStatsGraphStyle = {
      highColor: "#e00",
      highLabel: 'hi',
      averageLabel: 'av',
      lowLabel: 'lo',
      averageColor: "#88e",
      lowColor: "#0e0",
      rectOutlineVisible: false,
      rectOutlineColor: '#000',
      baseColor: '#000',
      leftPad: -300,
      thinLine: 3,
      edgePad: 10,
      backgroundColor: '#fff',
      offset: 30,
      minRenderDist: 30,
      textOffset: 10,
      valueOffset: 40
    }

    style = s0
  }

  ctx.save()
  ctx.translate(topLeft.x, topLeft.y)
  const thinLine = style.thinLine
  const edgePad = style.edgePad
  const minRenderDist = style.minRenderDist
  const offset = style.offset
  const textOffset = style.textOffset
  const leftPad = style.leftPad
  const value = getLatestValue(ds)
  const min = getMin(ds)
  const max = getMax(ds)
  const a = getAverage(ds)
  const spread = ds.prettyPrint(max - min, ds.baseUnit)
  ctx.fillStyle = style.baseColor
  ctx.lineWidth = thinLine
  ctx.strokeStyle = style.rectOutlineColor
  // setScaledFont(ctx)

  if (style.rectOutlineVisible) {
    ctx.strokeRect(0, 0, size.x, size.y)
  }
  

  const yval = linearTransform(value, min - edgePad, max + edgePad, size.y - edgePad, edgePad)
  const yaver = linearTransform(a, min - edgePad, max + edgePad, size.y - edgePad, edgePad)
  const ymin = linearTransform(min, min - edgePad, max + edgePad, size.y - edgePad, edgePad)
  const ymax = linearTransform(max, min - edgePad, max + edgePad, size.y - edgePad, edgePad)

  // value
  ctx.fillText(`${ds.prettyPrint(value, ds.baseUnit)}`, size.x + style.valueOffset, textOffset + yaver)
  ctx.fillRect(size.x, yval, offset, thinLine)

  // average
  ctx.fillStyle = style.averageColor
  ctx.fillText(`${style.averageLabel}: ${ds.prettyPrint(a, ds.baseUnit)}`, leftPad, textOffset + yaver)
  ctx.fillRect(-offset, yaver, offset, thinLine)

  // max
  ctx.fillStyle = style.highColor
  ctx.fillRect(-offset, ymax, offset, thinLine)
  if (ymax + minRenderDist < yaver) {
    ctx.fillText(`${style.highLabel}: ${ds.prettyPrint(max, ds.baseUnit)}`, leftPad, textOffset + ymax)
  }

  // min
  ctx.fillStyle = style.lowColor
  ctx.fillRect(-offset, ymin, offset, thinLine)
  if (ymin - minRenderDist > yaver) {
    ctx.fillText(`${style.lowLabel}: ${ds.prettyPrint(min, ds.baseUnit)}`, leftPad, textOffset + ymin)
  }

  const points: Vec2[] = []

  ds.data.forEach((n, i) => {
    const xmap = linearTransform(i, 0, ds.maxSize, edgePad, size.x - edgePad)
    const ymap = linearTransform(n, min - edgePad, max + edgePad, size.y - edgePad, edgePad)
    points.push({ x: xmap, y: ymap })
  })

  ctx.fillStyle = style.baseColor
  ctx.strokeStyle = style.baseColor

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
  ctx.fillStyle = style.baseColor
  const places = ds.data.length === ds.maxSize ? ` ~${spread}` : ` ${ds.data.length}/${ds.maxSize}`
  ctx.fillText(`${ds.label}${places}`, 0, -Math.floor(edgePad * 1.5))
  ctx.restore()
}
