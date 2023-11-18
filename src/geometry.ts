
/**
 * Calculate the chord length from angle theta_rad and a radius
 * @param {number} theta_rad 
 * @param {number} radius
 * @returns the chord length
 */
export function chord(theta_rad: number, radius = 1): number {
  return 2 * Math.sin(theta_rad / 2) * radius
}

