const gui = new dat.GUI();

// Canvas JS
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const wave = {
  y: canvas.height / 2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01
}

const strokeColor = {
  h: 200,
  s: 50,
  l: 50
}

const waveFolder = gui.addFolder('wave');

waveFolder.add(wave, 'y', 0, canvas.height);
waveFolder.add(wave, 'length', -0.01, 0.01);
waveFolder.add(wave, 'amplitude', -300, 300);
waveFolder.add(wave, 'frequency', -0.01, 1);
// waveFolder.open();

const strokeFolder = gui.addFolder('stroke');
strokeFolder.add(strokeColor, 'h', 0, 255);
strokeFolder.add(strokeColor, 'l', 0, 100);
strokeFolder.add(strokeColor, 's', 0, 100);
// strokeFolder.open();

let increment = wave.frequency;

function animate() {
  requestAnimationFrame(animate);

  ctx.fillStyle = 'rgba(255, 210, 255, 0.07)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(0, canvas.height/2);
  for (var i = 0; i < canvas.width; i++) {
    ctx.lineTo(i, wave.y/2 + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
  }
  ctx.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${strokeColor.l}%, ${strokeColor.s}%)`;
  ctx.stroke();
  increment += wave.frequency;
}

animate();