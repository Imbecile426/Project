$(document).ready(function() {
    const canvas = document.getElementById('earthCanvas'); // Get the canvas element
    const ctx = canvas.getContext('2d'); // Get the 2D context
    const radius = 100; // Globe radius in pixels
    let angle = 0; // Initial rotation angle
    const earthImage = new Image(); // Create a new image for Earth texture
    earthImage.src = 'img/earth.jpeg'; // Set the image source
    let spacetxt = $('#spacetxt');
    let downarrow = $('#arrow_down');

    downarrow.animate({
        opacity: 1,
    }, 1000);
    
    spacetxt.animate({
        top: '+=200px', // Move down by 200 pixels
        opacity: 1 // Fade in
    }, 1000);

    // Resize canvas to fit the window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Draw the rotating Earth
    function drawEarth() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.save(); // Save the current context
        ctx.translate(canvas.width / 2, canvas.height / 2); // Center the context
        ctx.rotate(angle); // Rotate the context
        ctx.beginPath(); // Start a new path
        ctx.arc(0, 0, radius, 0, Math.PI * 2); // Create a circular path
        ctx.clip(); // Clip to the circle
        ctx.drawImage(earthImage, -radius, -radius, radius * 2, radius * 2 * (earthImage.height / earthImage.width)); // Draw the Earth texture
        ctx.restore(); // Restore the context
    }

    // Animate the rotation
    function animate() {
        angle += 0.01; // Increment the angle
        drawEarth(); // Draw the Earth
        requestAnimationFrame(animate); // Call animate again
    }

    window.addEventListener('resize', resizeCanvas); // Resize canvas on window resize
    resizeCanvas(); // Initial canvas size
    earthImage.onload = animate; // Start animation when the image loads

    // Create stars that twinkle in the background
    function createStars() {
        const windowHeight = $(window).height();
        const windowWidth = $(window).width();
        for (let i = 0; i < 50; i++) {
            let star = $('<div class="star"></div>'); // Create star div
            const twinkleDuration = (1 + Math.random() * 2) + 's'; // Random twinkling duration
            star.css({
                top: Math.random() * windowHeight + 'px',
                left: Math.random() * windowWidth + 'px',
                animation: `twinkle ${twinkleDuration} infinite alternate` // Apply animation
            });
            $('#stars').append(star); // Add star to the container
        }
    }

    createStars(); // Generate stars initially

    // Scroll event to create a parallax effect on the stars
    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop(); // Get scroll position
        const windowHeight = $(window).height();
        $('.star').each(function() {
            var speed = 0.5 + Math.random() * 0.5; // Random speed
            var currentTop = parseFloat($(this).css('top'));
            var newTop = (currentTop + (scrollTop * speed)) % windowHeight; // Calculate new position
            if (newTop > windowHeight) {
                newTop = -10; // Reset position
                $(this).css('left', Math.random() * $(window).width() + 'px'); // Randomize horizontal position
            }
            $(this).css('top', newTop + 'px'); // Update position
        });
    });

    // Change title text on hover
    $("#titleContainer").hover(function(){
        $("#title").stop().fadeOut(300, function() {
            $(this).text("Garv&Ronit's space").fadeIn(300); // Change text
        });
    },
    function() {
        $("#title").stop().fadeOut(300, function() {
            $(this).text('GR SPACE').fadeIn(300); // Revert text
        });
    });
});

// Additional scroll event functionality
$(window).scroll(function () {
});
