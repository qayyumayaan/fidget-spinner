import { adjustVolume, playAudioClip } from './audio.js';

window.addEventListener('DOMContentLoaded', (event) => {
  var spinner = document.getElementById('fidget-spinner');

  if (spinner) {
    var blades = document.getElementsByClassName('blade');
    var angle = 0;
    var speed = 20;
    var maxSpeed = 10;
    var momentum = 0.9999;

    function spin() {
      angle += speed;
      spinner.style.transform = 'rotate(' + angle + 'deg)';

      // Apply momentum to slow down the spinner
      speed *= momentum;

      // Stop spinning when the speed is very low
      if (Math.abs(speed) < 0.05) {
        setSpeed(0);
      } else {
        requestAnimationFrame(spin);
      }

      // Adjust audio volume based on speed
      adjustVolume(speed);
    }

    function setSpeed(newSpeed) {
      speed = newSpeed;
    }

    // Increase speed on mouse down
    document.addEventListener('mousedown', function () {
      setSpeed(maxSpeed);
      spin(); // Start spinning immediately
      playAudioClip(); // Start playing the audio
    });

    // Decrease speed on mouse up
    document.addEventListener('mouseup', function () {
      setSpeed(speed * momentum); // Apply momentum to the speed
    });

    // Stop spinning when mouse leaves the spinner
    spinner.addEventListener('mouseleave', function () {
      setSpeed(speed * momentum); // Apply momentum to the speed
    });

    // Update momentum when the slider value changes
    var momentumSlider = document.getElementById('momentum-slider');
    momentumSlider.addEventListener('input', function () {
      momentum = parseFloat(momentumSlider.value);
    });

    // Update initial speed when the slider value changes
    var speedSlider = document.getElementById('speed-slider');
    speedSlider.addEventListener('input', function () {
      maxSpeed = parseFloat(speedSlider.value);
    });

    // Start spinning on page load
    spin();
  } else {
    console.log('Spinner element not found.');
  }
});
