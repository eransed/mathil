import { linearTransform, round2dec, siPretty } from './number'
import { type Vec2, newVec2 } from './vec2'

const defaultSize = 500
// export const GRAPHS: DataStats[] = []

export interface DataStats {
    data: number[]
    maxSize: number
    accumulated: number
    baseUnit: string
    accUnit: string
    label: string
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
    prettyPrint: (v: number, s?: string, d?: number) => string
    decimals: number
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
        calculationTimeUs: 0,
        decimals: 1
    }
    // GRAPHS.push(nds)
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
        sum += v
        if (v < min) min = v
        if (v > max) max = v
    })
    const mean = sum / ds.data.length
    let sq_sum = 0
    ds.data.forEach(v => {
        sq_sum += Math.pow(v - mean, 2)
    })

    distList.sort((a, b) => a - b)
    let median: number
    if (distList.length % 2 !== 0) {
        const a = distList[Math.floor(distList.length / 2)]
        const b = distList[Math.ceil(distList.length / 2)]
        median = round2dec((a + b) / 2, 2)
    } else {
        median = distList[distList.length / 2]
    }

    const len = (ds.completePopulation ? ds.data.length : ds.data.length - 1)
    const variance = sq_sum / len
    const sd = Math.sqrt(variance)
    // const sd = Math.sqrt(sq_sum)
    if (ds.debug) {
        console.log('LEN ', ds.data.length)
        console.log('SUM ', sum)
        console.log('MEAN ', mean)
        console.log('SQSUM ', sq_sum)
        console.log('VARIANCE ', variance)
        console.log('STD.DEV ', sd)
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
    rectOutLineWidth: number
    baseColor: string
    leftPad: number
    thinLine: number
    edgePad: number
    minRenderDist: number
    backgroundColor: string
    offset: number
    textOffset: number
    valueOffset: number
    textSize: number
    boldText: boolean
    showText: boolean
    fullWidthHelperLines: boolean
    labelWithStdDev: boolean
    size: Vec2
    topLeft: Vec2
    helperLineSize: number
    trendLineSize: number
    trendLineColor: string
    trendLineVisible: boolean
    scale: number
    graphPad: number
}

export function newDataStatsGraphStyle(_size: Vec2): DataStatsGraphStyle {
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
        valueOffset: 40,
        textSize: 12,
        boldText: false,
        showText: true,
        fullWidthHelperLines: false,
        labelWithStdDev: true,
        size: _size,
        topLeft: newVec2(0, 0),
        helperLineSize: 1,
        trendLineSize: 1,
        trendLineColor: "#000",
        trendLineVisible: false,
        scale: 1,
        graphPad: 0,
        rectOutLineWidth: 1
    }
    return s0
}

export function colorStyle(_size: Vec2): DataStatsGraphStyle {
    const s0: DataStatsGraphStyle = {
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
        valueOffset: 40,
        textSize: 16,
        boldText: false,
        showText: true,
        fullWidthHelperLines: false,
        labelWithStdDev: true,
        size: _size,
        topLeft: newVec2(0, 0),
        helperLineSize: 1,
        trendLineSize: 1,
        trendLineColor: "#000",
        trendLineVisible: false,
        scale: 1,
        graphPad: 0,
        rectOutLineWidth: 1
    }
    return s0
}

export function baseStyleText(_size: Vec2): DataStatsGraphStyle {
    const s = colorStyle(_size)
    s.leftPad = 140
    s.offset = 0
    s.thinLine = 4
    s.edgePad = 20
    s.textOffset = 3
    s.valueOffset = 10
    s.minRenderDist = 25
    s.rectOutlineVisible = false
    s.fullWidthHelperLines = true
    s.textSize = 16
    s.boldText = true
    s.showText = true
    s.graphPad = 5
    s.rectOutLineWidth = 2
    // s.baseColor = rgbaColor(50, 50, 250, 0.8)
    s.baseColor = rgbaColor(0, 0, 0, 1)
    s.lowColor = rgbaColor(0, 150, 0, 0.8)
    s.helperLineSize = 3
    return s
}

export function setFontSize(ctx: CanvasRenderingContext2D, size: number, bold = false): void {
    if (bold) {
        ctx.font = `bold ${size}px courier`
    } else {
        ctx.font = `${size}px courier`
    }
}

export function rgbColor(r=0, g=0, b=0): string {
    return `rgb(${r}, ${g}, ${b})`
}

export function rgbaColor(r=0, g=0, b=0, a=1): string {
    return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function renderGraph(ds: DataStats, style: DataStatsGraphStyle, ctx: CanvasRenderingContext2D): void {

    const labelY = -Math.floor(style.edgePad * 1.5)
    const topLeft = newVec2(style.topLeft.x + style.offset + style.leftPad * 1.1, style.topLeft.y + style.edgePad * 2 + -labelY)
    const size = newVec2(style.size.x - style.valueOffset - style.edgePad * 2 - style.leftPad * 1.7 - style.offset, style.size.y - style.edgePad * 3 - -labelY)

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
    const spread = ds.prettyPrint(max - min, ds.baseUnit, ds.decimals)
    const sd = ds.prettyPrint(ds.stdDev, ds.baseUnit, ds.decimals)

    const yval = linearTransform(value, min - style.graphPad, max + style.graphPad, size.y - style.graphPad, style.graphPad)
    const yaver = linearTransform(a, min - style.graphPad, max + style.graphPad, size.y - style.graphPad, style.graphPad)
    const ymin = linearTransform(min, min - style.graphPad, max + style.graphPad, size.y - style.graphPad, style.graphPad)
    const ymax = linearTransform(max, min - style.graphPad, max + style.graphPad, size.y - style.graphPad, style.graphPad)

    ctx.save()
    ctx.translate(topLeft.x, topLeft.y)
    ctx.fillStyle = style.baseColor
    
    if (style.showText) {
        setFontSize(ctx, style.textSize, style.boldText)
    }
    
    ctx.strokeStyle = style.rectOutlineColor
    if (style.rectOutlineVisible) {
        ctx.lineWidth = style.rectOutLineWidth
        ctx.strokeRect(0, 0, size.x, size.y)
    }

    ctx.lineWidth = thinLine

    // value
    if (style.showText) {
        ctx.fillText(`${ds.prettyPrint(value, ds.baseUnit, ds.decimals)}`, size.x + style.valueOffset, textOffset + yaver)
    }
    ctx.fillRect(size.x, yval, offset, thinLine)

    // average
    ctx.fillStyle = style.averageColor
    if (style.fullWidthHelperLines) {
        ctx.fillRect(-offset, yaver, size.x + offset, style.helperLineSize)
    } else {
        ctx.fillRect(-offset, yaver, offset, style.helperLineSize)
    }
    if (style.showText) {
        ctx.fillText(`${style.averageLabel}: ${ds.prettyPrint(a, ds.baseUnit, ds.decimals)}`, -leftPad, textOffset + yaver)
    }

    // max
    ctx.fillStyle = style.highColor
    if (style.fullWidthHelperLines) {
        ctx.fillRect(-offset, ymax, size.x + offset, style.helperLineSize)
    } else {
        ctx.fillRect(-offset, ymax, offset, style.helperLineSize)
    }

    if (style.showText) {
        if (ymax + minRenderDist < yaver) {
            ctx.fillText(`${style.highLabel}: ${ds.prettyPrint(max, ds.baseUnit, ds.decimals)}`, -leftPad, textOffset + ymax)
        }
    }

    // min
    ctx.fillStyle = style.lowColor
    if (style.fullWidthHelperLines) {
        ctx.fillRect(-offset, ymin, size.x + offset, style.helperLineSize)
    } else {
        ctx.fillRect(-offset, ymin, offset, style.helperLineSize)
    }

    if (style.showText) {
        if (ymin - minRenderDist > yaver) {
            ctx.fillText(`${style.lowLabel}: ${ds.prettyPrint(min, ds.baseUnit, ds.decimals)}`, -leftPad, textOffset + ymin)
        }
    }

    const points: Vec2[] = []

    ds.data.forEach((n, i) => {
        const xmap = linearTransform(i, 0, ds.maxSize, style.graphPad, size.x - style.graphPad)
        const ymap = linearTransform(n, min - style.graphPad, max + style.graphPad, size.y - style.graphPad, style.graphPad)
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

    if (style.showText) {
        setFontSize(ctx, style.textSize * 1.2, style.boldText)
        ctx.fillStyle = style.baseColor
        let places
        if (style.labelWithStdDev) {
            places = `Std.D. ${sd}/${ds.data.length}, h-l ${spread}`
        } else {
            places = ds.data.length === ds.maxSize ? `~${spread}` : `${ds.data.length}/${ds.maxSize}`
        }
        ctx.fillText(`[${ds.label}] ${places}`, 0, labelY)
    }

    ctx.restore()
}
