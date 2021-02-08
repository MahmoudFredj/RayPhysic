const canvas = document.querySelector('canvas')
const brush = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const fre = new Frequency(0.05, 100)

let amp = 300
let ang = 0
let angv = 1
let anga = 0.001
const tick = () => {
  fre.tick()

  fre.amplitude = Math.sin(ang) * amp
  amp *= 0.99
  ang += angv
  angv *= 0.9999
}

const draw = () => {
  //   brush.clearRect(0, 0, innerWidth, innerHeight)
  brush.fillStyle = 'rgb(0,0,0,0.5)'
  brush.fillRect(0, 0, innerWidth, innerHeight)
  fre.draw(brush)
}

const ignite = () => {
  tick()
  draw()
  requestAnimationFrame(ignite)
}

ignite()
