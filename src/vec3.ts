import { info } from "./log"
import { radToDeg, rndf, round2dec } from "./number"

export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface Pose {
  x: number
  y: number
  z: number
  Rx: number
  Ry: number
  Rz: number
}

export function newPose(x = 0.0, y = 0.0, z = 0.0, Rx = 0.0, Ry = 0.0, Rz = 0.0): Pose {
  return {
    x: x,
    y: y,
    z: z,
    Rx: Rx,
    Ry: Ry,
    Rz: Rz
  }
}

export function newVec3(x = 0.0, y = 0.0, z = 0.0): Vec3 {
  return {x: x, y: y, z: z}
}

export function sub(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z
  }
}

export function add(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z
  }
}

export function rndfVec3(max: number, min = 0): Vec3 {
  return newVec3(rndf(min, max), rndf(min, max), rndf(min, max))
}

export function dist(v0: Vec3, v1 = {x: 0.0, y: 0.0, z: 0.0}): number {
  return Math.sqrt(Math.pow(v1.x - v0.x, 2) + Math.pow(v1.y - v0.y, 2) + Math.pow(v1.z - v0.z, 2))
}

export function norm(a: Vec3): Vec3 {
  return {
    x: a.x/dist(a),
    y: a.y/dist(a),
    z: a.z/dist(a)
  }
}

export function dot(a: Vec3, b: Vec3): number {
  const d = (a.x * b.x) + (a.y * b.y) + (a.z * b.z)
  return d
}

export function angle(a: Vec3, b: Vec3): number {
  return Math.acos(dot(a, b) / ((dist(a) * dist(b))))
}

export function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: (a.y * b.z) - (a.z * b.y),
    y: (a.z * b.x) - (a.x * b.z),
    z: (a.x * b.y) - (a.y * b.x)
  }
}

export function axisRotation(a: Vec3, b: Vec3): Vec3 {
  // return {
  //   x: -(Math.atan2(b.y, b.z) - Math.atan2(a.y, a.z)),
  //   y: -(Math.atan2(b.z, b.x) - Math.atan2(a.z, a.x)),
  //   z: Math.atan2(b.y, b.x) - Math.atan2(a.y, a.x)
  // }

  // return {
  //   x: -(angle(a, {x: 1, y: 0, z: 0}) - angle(b, {x: 1, y: 0, z: 0})),
  //   y: -(angle(a, {x: 0, y: 1, z: 0}) - angle(b, {x: 0, y: 1, z: 0})),
  //   z: angle(a, {x: 0, y: 0, z: 1}) - angle(b, {x: 0, y: 0, z: 1})
  // }

  const i = newVec3(1, 0, 0)
  const j = newVec3(0, 1, 0)
  const k = newVec3(0, 0, 1)

  const adi = dot(a, i)
  const adj = dot(a, j)
  const adk = dot(a, k)

  const bdi = dot(b, i)
  const bdj = dot(b, j)
  const bdk = dot(b, k)

  const rx_zero = (adj === 0 && adk === 0) || (bdj === 0 && bdk === 0)
  const ry_zero = (adk === 0 && adi === 0) || (bdk === 0 && bdi === 0)
  const rz_zero = (adj === 0 && adi === 0) || (bdj === 0 && bdi === 0)
  
  const rx = (rx_zero ? 0 : Math.atan2(bdj, bdk) - Math.atan2(adj, adk))
  const ry = (ry_zero ? 0 : Math.atan2(bdk, bdi) - Math.atan2(adk, adi))
  const rz = (rz_zero ? 0 : Math.atan2(bdj, bdi) - Math.atan2(adj, adi))

  return {
    x: rx,
    y: ry,
    z: rz
  }

  // return {
  //   x: Math.acos(bdx) - Math.acos(adx),
  //   y: Math.acos(bdy) - Math.acos(ady),
  //   z: Math.acos(bdz) - Math.acos(adz)
  // }

  // const maga = dist(a)
  // const magb = dist(b)
  // return {
  //   x: Math.acos(b.x/magb) - Math.acos(a.x/maga),
  //   y: Math.acos(b.y/magb) - Math.acos(a.y/maga),
  //   z: Math.acos(b.z/magb) - Math.acos(a.z/maga)
  // }

}

export function rot_mat_x(theta: number): number[][] {
  const mat = [
    [1, 0,                0              ],
    [0, Math.cos(theta), -Math.sin(theta)],
    [0, Math.sin(theta),  Math.cos(theta)]
  ]
  return mat
}

export function rot_mat_y(theta: number): number[][] {
  const mat = [
    [Math.cos(theta),  0, Math.sin(theta)],
    [0,                1,               0],
    [-Math.sin(theta), 0, Math.cos(theta)]
  ]
  return mat
}

export function rot_mat_z(theta: number): number[][] {
  const mat = [
    [Math.cos(theta), -Math.sin(theta), 0],
    [Math.sin(theta),  Math.cos(theta), 0],
    [0,                0,               1]
  ]
  return mat
}

export function multiply(v: Vec3, m: number[][]): Vec3 {
  const row1 = newVec3(m[0][0], m[0][1], m[0][2])
  const row2 = newVec3(m[1][0], m[1][1], m[1][2])
  const row3 = newVec3(m[2][0], m[2][1], m[2][2])
  return {
    x: dot(v, row1),
    y: dot(v, row2),
    z: dot(v, row3)
  }
}

export function scale(s: number, v: Vec3): Vec3 {
  return {
    x: s*v.x,
    y: s*v.y,
    z: s*v.z
  }
}

export function average(v: Vec3[]): Vec3 {
  let sumx = 0
  let sumy = 0
  let sumz = 0

  v.forEach(p => {
    sumx+=p.x
    sumy+=p.y
    sumz+=p.z
  })

  sumx/=v.length
  sumy/=v.length
  sumz/=v.length

  return {
    x: sumx,
    y: sumy,
    z: sumz
  }

}

export function rotate(point: Vec3, rotation: Vec3, origin = {x: 0, y: 0, z: 0}): Vec3 {
  const translated = sub(point, origin)
  let rotated = translated
  rotated = multiply(rotated, rot_mat_x(rotation.x))
  rotated = multiply(rotated, rot_mat_y(rotation.y))
  rotated = multiply(rotated, rot_mat_z(rotation.z))
  const rotatedPoint = add(rotated, origin)
  return rotatedPoint
}

export function radToDeg3(r: Vec3): Vec3 {
  return {
    x: radToDeg(r.x),
    y: radToDeg(r.y),
    z: radToDeg(r.z)
  }
}

export function pretty(v: Vec3, d=2): void {
  const a = radToDeg3(v)
  info(`${round2dec(a.x, d)}, ${round2dec(a.y, d)}, ${round2dec(a.z, 2)}`)
}

// export function vec3ToMesh(v: Vec3, color: string): THREE.Mesh[] {
//   const scale = 100
//   const m = new THREE.Mesh(new THREE.ConeGeometry(0.5*scale, 1*scale, 32), new THREE.MeshBasicMaterial({color: color, transparent:true, opacity: 0.7}))
//   m.position.x = v.x
//   m.position.y = v.y
//   m.position.z = v.z


//   const m1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05*scale, 0.05*scale, 3*scale), new THREE.MeshBasicMaterial({color: color, transparent:true, opacity: 0.7}))
//   m1.position.x = v.x
//   m1.position.y = v.y
//   m1.position.z = v.z
//   translateAlongRotationDirection(m1, 10)
//   return [m, m1]
//   // return [m]
// }

// export function translateAlongRotationDirection(m: THREE.Mesh, trans=1): void {
//   const dir = toDirectionVector(m.rotation, newVec3(1, 1, 1))
//   const dirt = threeVec3(dir)
//   // dirt.multiplyScalar(trans)
//   m.position.add(dirt)
//   pretty(dir)
// }

// export function toDirectionVector(e: THREE.Euler, t: Vec3): Vec3 {
//   const x = rot_mat_x(e.x)
//   const y = rot_mat_y(e.y)
//   const z = rot_mat_z(e.z)
//   const vx = multiply(t, x)
//   const vy = multiply(t, y)
//   const vz = multiply(t, z)
//   return newVec3(vx.x, vy.y*170, vz.z)
// }

// export interface Arrow {
//   cone: THREE.ConeGeometry
//   cylinder: THREE.CylinderGeometry
//   rot: THREE.Euler
//   center: THREE.Vector3
//   material: THREE.Material
// }

// export function createArrow(scale=1, color='#fff'): Arrow {
//   return {
//     cone: new THREE.ConeGeometry(0.5*scale, 1*scale, 32),
//     cylinder: new THREE.CylinderGeometry(0.05*scale, 0.05*scale, 3*scale),
//     rot: new THREE.Euler(),
//     center: new THREE.Vector3(),
//     material: new THREE.MeshBasicMaterial({color: color, transparent:true, opacity: 0.6})
//   }
// }

// export function arrowToGroup(a: Arrow): THREE.Group {
//   const cone = new THREE.Mesh(a.cone, a.material)
//   const cyl = new THREE.Mesh(a.cylinder, a.material)
//   const arrowGroup = new THREE.Group()
//   arrowGroup.add(cone, cyl)
//   arrowGroup.position.copy(a.center)
//   arrowGroup.rotation.copy(a.rot)
//   return arrowGroup
// }

// export function updateMeshPosition(m: THREE.Mesh, v: Vec3): void {
//   m.position.x = v.x
//   m.position.y = v.y
//   m.position.z = v.z
// }


// export function meshToVec3(m: THREE.Mesh): Vec3 {
//   return {
//     x: m.position.x,
//     y: m.position.y,
//     z: m.position.z
//   }
// }

// export function threeVec3(v: Vec3): THREE.Vector3 {
//   return new THREE.Vector3(v.x, v.y, v.z)
// }

// export function vec3FromThree(t: THREE.Vector3): Vec3 {
//   return {
//     x: t.x,
//     y: t.y,
//     z: t.z
//   }
// }