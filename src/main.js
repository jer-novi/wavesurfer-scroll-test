import WaveSurfer from 'wavesurfer.js';

// Create wavesurfer instance
const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'rgb(200, 0, 200)',
  progressColor: 'rgb(100, 0, 100)',
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Demo audio
  minPxPerSec: 100,
  dragToSeek: true,
});

// Zoom slider
wavesurfer.once('decode', () => {
  const slider = document.querySelector('input[type="range"]');

  slider.addEventListener('input', (e) => {
    const minPxPerSec = e.target.valueAsNumber;
    wavesurfer.zoom(minPxPerSec);
  });

  // Checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.onchange = (e) => {
      console.log(`${input.value}:`, e.target.checked);
      wavesurfer.setOptions({
        [input.value]: e.target.checked,
      });
    };
  });

  // Buttons
  document.querySelector('#play').onclick = () => wavesurfer.playPause();
  document.querySelector('#forward').onclick = () => wavesurfer.skip(5);
  document.querySelector('#backward').onclick = () => wavesurfer.skip(-5);
});
