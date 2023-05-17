var spinner = document.getElementById('spinner');
var blades = document.getElementsByClassName('blade');
var angle = 0;
var speed = 0;

function spin() {
    angle += speed;
    spinner.style.transform = 'rotate(' + angle + 'deg)';
    requestAnimationFrame(spin);
}

function setSpeed(newSpeed) {
    speed = newSpeed;
}

// Increase speed on mouse down
document.addEventListener('mousedown', function() {
    setSpeed(10);
});

// Decrease speed on mouse up
document.addEventListener('mouseup', function() {
    setSpeed(0);
});

// Stop spinning when mouse leaves the spinner
spinner.addEventListener('mouseleave', function() {
    setSpeed(0);
});

// Start spinning on page load
spin();
