import { linearTransform } from "./number"
import { Vec2, floor } from "./vec2"

export function clearScreen(ctx: CanvasRenderingContext2D, color = "#000") {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export const getScreenRect = (ctx: CanvasRenderingContext2D): Vec2 => {
  return { x: ctx.canvas.width, y: ctx.canvas.height }
}

export function setCanvasSize(ctx: CanvasRenderingContext2D, screenScale = 1): void {
  const vw: number = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )
  const vh: number = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  )
  ctx.canvas.width = vw * screenScale
  ctx.canvas.height = vh * screenScale
}

export function getScreenCenterPosition(ctx: CanvasRenderingContext2D): Vec2 {
  return floor({ x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 })
}

export function getScreenCenterPositionFromClient() {
  return {
    x: document.documentElement.clientWidth,
    y: document.documentElement.clientHeight,
  }
}

export function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  return <CanvasRenderingContext2D>canvas.getContext("2d")
}

export function getMouse(canvas: HTMLCanvasElement, event: any, frame_size: Vec2) {
  const r = canvas.getBoundingClientRect()
  const x = event.clientX - r.left
  const y = event.clientY - r.top
  const mapx = Math.floor(linearTransform(x, 0, r.width, 0, frame_size.x))
  const mapy = Math.floor(linearTransform(y, 0, r.height, 0, frame_size.y))
  const position = { x: mapx, y: mapy }
  return position
}
