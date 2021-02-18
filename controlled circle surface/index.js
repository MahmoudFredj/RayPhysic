const canvas = document.querySelector('canvas')
const brush = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

let path = []
let spacing = 0.005
let radius = 100
let pos = new Vector(innerWidth / 2, innerHeight / 2)
let start = 0
let speed = 0.01
const tick = () => {
  path = []
  for (let i = 0; i < Math.PI * 2; i += spacing) {
    path.push(
      new Vector(Math.sin(i) * radius + pos.x, Math.cos(i) * radius + pos.y),
    )
  }
  let ang = start
  for (let i = 0; i < path.length; i++) {
    path[i].add(new Vector(Math.sin(ang) * 100, Math.cos(ang) * 100))
    ang += 15
  }

  start += speed
  if (start > 1000) start = 0
}

const draw = () => {
  brush.clearRect(0, 0, innerWidth, innerHeight)
  brush.strokeStyle = 'rgb(255,255,255,0.15)'
  brush.fillStyle = 'white'
  brush.beginPath()
  for (let i = 0; i < path.length; i++) {
    brush.lineTo(path[i].x, path[i].y)
  }
  brush.lineTo(path[0].x, path[0].y)
  brush.stroke()
}

const ignite = () => {
  tick()
  draw()
  requestAnimationFrame(ignite)
}

ignite()

document.addEventListener('mousemove', ({ clientX }) => {
  speed = clientX / (innerWidth * 50)
})
