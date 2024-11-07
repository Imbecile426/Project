$(document).ready(function() {
    const radius = 100; // Globe radius in pixels
    let angle = 0; // Initial rotation angle
    let spacetxt = $('#spacetxt');
    let downarrow = $('#arrow_down');

    downarrow.animate({
        opacity: 1,
    }, 1000);
    
    spacetxt.animate({
        top: '+=200px', // Move down by 200 pixels
        opacity: 1 // Fade in
    }, 1000);

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
