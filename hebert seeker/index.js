// random

let percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0xff } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0x70 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
]

const getColorForPercentage = function (pct) {
  for (var i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break
    }
  }
  let lower = percentColors[i - 1]
  let upper = percentColors[i]
  let range = upper.pct - lower.pct
  let rangePct = (pct - lower.pct) / range
  let pctLower = 1 - rangePct
  let pctUpper = rangePct
  let color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
  }
  return 'rgb(' + [color.r, color.g, color.b].join(',') + ')'
}

// prefixes
const WIDTH = 512
const HEIGTH = 512

const order = 6
const N = Math.pow(2, order)
const total = Math.pow(N, 2)
let points = []
const getHilbert = (i) => {
  const h = [
    new Vector(0, 0),
    new Vector(0, 1),
    new Vector(1, 1),
    new Vector(1, 0),
  ]

  const vector = h[i & 3]

  for (let k = 1; k < order; k++) {
    i = i >>> 2
    let index = i & 3

    switch (index) {
      case 0:
        ;[vector.x, vector.y] = [vector.y, vector.x]
        break
      case 1:
        vector.y += Math.pow(2, k)
        break
      case 2:
        vector.x += Math.pow(2, k)
        vector.y += Math.pow(2, k)
        break
      case 3:
        ;[vector.x, vector.y] = [
          Math.pow(2, k) - 1 - vector.y,
          Math.pow(2, k) - 1 - vector.x,
        ]
        vector.x += Math.pow(2, k)
        break
    }
  }

  return vector
}

for (let i = 0; i < total; i++) {
  points[i] = getHilbert(i)
  const len = WIDTH / N
  points[i].mult(len)
  points[i].add(new Vector(len / 2, len / 2))
}
// begin
const canvas = document.querySelector('canvas')
const brush = canvas.getContext('2d')
// setting brush;
canvas.height = HEIGTH
canvas.width = WIDTH

let c = 1

const tick = () => {
  if (c < points.length) c += 1
  else c = 0
}
const draw = () => {
  brush.clearRect(0, 0, WIDTH, HEIGTH)

  brush.lineWidth = 2

  for (let i = 0; i < c - 1; i++) {
    brush.beginPath()
    brush.strokeStyle = getColorForPercentage(i / c)
    brush.shadowBlur = 8
    brush.shadowColor = getColorForPercentage(i / c)
    brush.lineTo(points[i].x, points[i].y)
    brush.lineTo(points[i + 1].x, points[i + 1].y)
    brush.stroke()
  }
}

const ignite = () => {
  tick()
  draw()
  requestAnimationFrame(ignite)
}

ignite()
