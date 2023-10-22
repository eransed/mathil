import { Vec2, add2, angle2, direction2, mul2, newVec2, smul2 } from "./vec2";

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
  scale: Vec2 = { x: 1, y: 1 },
  color = "#000",
  flipX = true,
  originOffset: Vec2 = { x: 0, y: 0 },
  renderVectorComponents = true,
  lineWidth = 3,
  arrowAng = 155,
  arrowScale = 10,
  xColor = "#f00",
  yColor = "#0f0"
) {
  ctx.save();

  translate(ctx, add2(mul2(origin, scale), mul2(originOffset, scale)))

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  ctx.moveTo(0, 0);

  if (flipX === true) {
    v.x = -v.x
  }

  // Do not draw all the way to v end, this will give a better looking arrow tip
  lineTo(ctx, mul2(v, smul2(scale, 0.995)))

  // Draw arrow head
  const scaledV = mul2(v, scale)
  const angV = angle2(v)
  const arrowNewScale = smul2(scale, arrowScale)

  moveTo(ctx, scaledV)

  lineTo(ctx, add2(
    scaledV,
    mul2(direction2(angV + arrowAng), arrowNewScale)
  ))

  moveTo(ctx, scaledV)

  lineTo(ctx, add2(
    scaledV,
    mul2(direction2(angV - arrowAng), arrowNewScale)
  ))

  // Finish path
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  if (renderVectorComponents) {
    renderVector(ctx, newVec2(v.x, 0), origin, scale, xColor, flipX, originOffset, false);
    renderVector(ctx, newVec2(0, v.y), origin, scale, yColor, flipX, originOffset, false);
  }
}
