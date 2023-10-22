import { Vec2, add2, angle2, direction2, newVec2, smul2 } from "./vec2";

export function lineTo(ctx: CanvasRenderingContext2D, v: Vec2) {
  ctx.lineTo(v.x, v.y)
}

export function moveTo(ctx: CanvasRenderingContext2D, v: Vec2) {
  ctx.moveTo(v.x, v.y)
}

export function translate(ctx: CanvasRenderingContext2D, v: Vec2) {
  ctx.translate(v.x, v.y)
}

/**
 * Draw a vector from origin to v
 */
export function renderVector(
  ctx: CanvasRenderingContext2D,
  v: Vec2,
  origin: Vec2 = { x: 0, y: 0 },
  scale = 1,
  color = "#000",
  originOffset: Vec2 = { x: 0, y: 0 },
  renderVectorComponents = true,
  lineWidth = 3,
  arrowAng = 155,
  arrowScale = 10,
  xColor = "#f00",
  yColor = "#0f0"
) {
  ctx.save();

  translate(ctx, add2(smul2(origin, scale), smul2(originOffset, scale)))

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  ctx.moveTo(0, 0);

  // Do not draw all the way to v end, this will give a better looking arrow tip
  lineTo(ctx, smul2(v, 0.995 * scale))

  // Draw arrow head
  const scaledV = smul2(v, scale)
  const angV = angle2(v)
  const arrowNewScale = scale * arrowScale

  moveTo(ctx, scaledV)

  lineTo(ctx, add2(
    scaledV,
    smul2(direction2(angV + arrowAng), arrowNewScale)
  ))

  moveTo(ctx, scaledV)

  lineTo(ctx, add2(
    scaledV,
    smul2(direction2(angV - arrowAng), arrowNewScale)
  ))

  // Finish path
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  if (renderVectorComponents) {
    renderVector(ctx, newVec2(v.x, 0), origin, scale, xColor, originOffset, false);
    renderVector(ctx, newVec2(0, v.y), origin, scale, yColor, originOffset, false);
  }
}
