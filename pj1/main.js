const start = (playAudio) => {
  // 获取音频
  const input = document.querySelector('input')
  input.addEventListener('change', () => {
    const blob = URL.createObjectURL(input.files[0])
    console.log(blob)
    playAudio(blob)
  })
}

const playAudio = (url) => {
  const audio = new Audio()
  audio.src = url
  audio.controls = true
  audio.loop = true
  audio.autoplay = true

  document.getElementById('audio_box').appendChild(audio)

  const context = new AudioContext()
  const analyser = context.createAnalyser()
  source = context.createMediaElementSource(audio)
  source.connect(analyser)
  source.connect(context.destination)

  // 转换到频域
  analyser.fftSize = 1024
  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  analyser.getByteTimeDomainData(dataArray)

  // 画图
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  
  const draw = () => {
    const WIDTH = 600
    const HEIGHT = 400
    drawVisual = requestAnimationFrame(draw)
    analyser.getByteFrequencyData(dataArray)
    ctx.fillStyle = 'rgb(0, 0, 0)'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    const barWidth = (WIDTH / bufferLength) * 2.5
    let barHeight
    let x = 0
    for (let i = 0; i < bufferLength; i++) {
      barHeight = (HEIGHT / 256) * dataArray[i]
      ctx.fillStyle = 'rgb(' + (dataArray[i]+100) + ',30,150)'
      ctx.fillRect(x, HEIGHT-barHeight/2, barWidth, barHeight)
      x += barWidth + 1
    }
  }
  draw()
}

start(playAudio)