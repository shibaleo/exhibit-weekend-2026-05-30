// Extract Saitama outline from japan.geojson and emit src/saitama.ts.
// Source: https://github.com/dataofjapan/land
//   curl -sL https://raw.githubusercontent.com/dataofjapan/land/master/japan.geojson -o .tmp/japan.geojson
//   node scripts/extract-saitama.cjs
const fs = require('fs')
const path = require('path')

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '.tmp', 'japan.geojson'), 'utf8'),
)
const f = data.features.find((x) => x.properties.nam_ja === '埼玉県')
if (!f) throw new Error('Saitama not found')

// Collect all polygon rings (handle MultiPolygon vs Polygon)
const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates]
// Pick the largest ring (main outline; drop small islands if any)
let mainRing = null
let mainArea = 0
for (const poly of polys) {
  const ring = poly[0] // outer ring
  // shoelace
  let a = 0
  for (let i = 0; i < ring.length - 1; i++) {
    a += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]
  }
  a = Math.abs(a) / 2
  if (a > mainArea) {
    mainArea = a
    mainRing = ring
  }
}

// Compute bbox
let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity
for (const [lon, lat] of mainRing) {
  if (lon < minLon) minLon = lon
  if (lon > maxLon) maxLon = lon
  if (lat < minLat) minLat = lat
  if (lat > maxLat) maxLat = lat
}

// Project to viewBox 0 0 800 400 with margin
const VB_W = 800
const VB_H = 400
const MARGIN = 10
const lonRange = maxLon - minLon
const latRange = maxLat - minLat
// Adjust for latitude (rough): scale lon by cos(midLat)
const midLat = (minLat + maxLat) / 2
const cos = Math.cos((midLat * Math.PI) / 180)
const lonRangeAdj = lonRange * cos
const sx = (VB_W - 2 * MARGIN) / lonRangeAdj
const sy = (VB_H - 2 * MARGIN) / latRange
const s = Math.min(sx, sy)
const projWidth = lonRangeAdj * s
const projHeight = latRange * s
const offX = (VB_W - projWidth) / 2
const offY = (VB_H - projHeight) / 2

function project(lon, lat) {
  const x = offX + (lon - minLon) * cos * s
  const y = offY + (maxLat - lat) * s
  return [x, y]
}

// Simplify with Douglas-Peucker (tolerance in viewBox units)
function perpDist(p, a, b) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  if (dx === 0 && dy === 0) return Math.hypot(p[0] - a[0], p[1] - a[1])
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)
  const tt = Math.max(0, Math.min(1, t))
  const px = a[0] + tt * dx
  const py = a[1] + tt * dy
  return Math.hypot(p[0] - px, p[1] - py)
}
function dp(points, eps) {
  if (points.length < 3) return points
  let maxD = 0
  let idx = 0
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpDist(points[i], points[0], points[points.length - 1])
    if (d > maxD) { maxD = d; idx = i }
  }
  if (maxD > eps) {
    const left = dp(points.slice(0, idx + 1), eps)
    const right = dp(points.slice(idx), eps)
    return left.slice(0, -1).concat(right)
  }
  return [points[0], points[points.length - 1]]
}

const projected = mainRing.map(([lon, lat]) => project(lon, lat))
const simplified = dp(projected, 0.4)

// Build SVG path
const cmds = simplified.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`)
cmds.push('Z')
const pathD = cmds.join(' ')

// Stop coordinates (real lat/lon → projected)
const stops = [
  { id: 'kawagoe', label: '川越', lon: 139.4856, lat: 35.9251 },
  { id: 'nagatoro', label: '長瀞', lon: 139.1078, lat: 36.0892 },
  { id: 'chichibu', label: '秩父', lon: 139.0856, lat: 35.9912 },
]
const stopsProjected = stops.map((s) => {
  const [x, y] = project(s.lon, s.lat)
  return { ...s, x: +x.toFixed(2), y: +y.toFixed(2) }
})

// Yokohama (entry/exit anchor — outside SE)
const [yokoX, yokoY] = project(139.638, 35.4437)

const out = `// Auto-generated from dataofjapan/land japan.geojson (filtered to 埼玉県).
// viewBox: 0 0 ${VB_W} ${VB_H}. Equirectangular projection scaled with cos(midLat).
// Regenerate via .tmp/extract.cjs
export const VIEWBOX = { w: ${VB_W}, h: ${VB_H} } as const

export const saitamaPath =
  '${pathD}'

export type StopMarker = { id: string; label: string; x: number; y: number }

export const stopMarkers: StopMarker[] = ${JSON.stringify(stopsProjected, null, 2)}

// Yokohama anchor (outside the prefecture, used as the line entry/exit point)
export const yokohamaAnchor = { x: ${yokoX.toFixed(2)}, y: ${yokoY.toFixed(2)} }
`

fs.writeFileSync(path.join(__dirname, '..', 'src', 'saitama.ts'), out)

console.log('Wrote src/saitama.ts')
console.log('Path points:', simplified.length, 'of', projected.length)
console.log('Stops:', stopsProjected)
console.log('Yokohama anchor:', { x: +yokoX.toFixed(2), y: +yokoY.toFixed(2) })
