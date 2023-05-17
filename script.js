window.addEventListener('DOMContentLoaded', (event) => {
    var spinner = document.getElementById('spinner');
    var blades = document.getElementsByClassName('blade');
    var angle = 0;
    var speed = 0;
    var momentum = 0.98; // Adjust this value to control the slowdown rate
  
    function spin() {
      angle += speed;
      spinner.style.transform = 'rotate(' + angle + 'deg)';
  
      // Apply momentum to slow down the spinner
      speed *= momentum;
  
      // Stop spinning when the speed is very low
      if (Math.abs(speed) < 0.1) {
        setSpeed(0);
      } else {
        requestAnimationFrame(spin);
      }
    }
  
    function setSpeed(newSpeed) {
      speed = newSpeed;
    }
  
    // Increase speed on mouse down
    document.addEventListener('mousedown', function () {
      setSpeed(10);
      spin(); // Start spinning immediately
    });
  
    // Decrease speed on mouse up
    document.addEventListener('mouseup', function () {
      setSpeed(speed * momentum); // Apply momentum to the speed
    });
  
    // Stop spinning when mouse leaves the spinner
    spinner.addEventListener('mouseleave', function () {
      setSpeed(speed * momentum); // Apply momentum to the speed
    });
  
    // Start spinning on page load
    spin();
  });
  