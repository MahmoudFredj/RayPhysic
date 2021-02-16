const canvas = document.querySelector('canvas')
const brush = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const fre = new Frequency(0.01, 100)

let amp = 300
let ang = 0
let angv = 1
let anga = 0.001

let mouse = {
  x: 0,
  y: 0,
  pressed: false,
}

let flick = false
const tick = () => {
  fre.tick()

  fre.amplitude = Math.sin(ang) * amp
  amp *= 0.94
  ang += angv
  angv *= 0.999
  if (mouse.pressed) {
    fre.amplitude = mouse.y - innerHeight / 2
    flick = true
  } else if (!mouse.pressed && flick) {
    amp = mouse.y - innerHeight / 2
    angv = 1
    flick = false
  }
}

brush.lineWidth = 10
brush.shadowColor = 'rgba(255, 56, 56,1)'
brush.shadowBlur = 10

const draw = () => {
  //   brush.clearRect(0, 0, innerWidth, innerHeight)
  brush.fillStyle = 'rgba(30, 39, 46,1)'
  brush.fillRect(0, 0, innerWidth, innerHeight)
  fre.draw(brush)
}

const ignite = () => {
  tick()
  draw()
  requestAnimationFrame(ignite)
}

ignite()

document.addEventListener('mousemove', ({ clientX, clientY }) => {
  mouse.x = clientX
  mouse.y = clientY
})

document.addEventListener('mousedown', () => {
  mouse.pressed = true
})

document.addEventListener('mouseup', () => {
  mouse.pressed = false
})
