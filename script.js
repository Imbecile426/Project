$(document).ready(function() {
    // Function to create stars within the viewport
    function createStars() {
        const windowHeight = $(window).height();
        const windowWidth = $(window).width();

        for (let i = 0; i < 50; i++) {
            let star = $('<div class="star"></div>');
            const twinkleDuration = (1 + Math.random() * 2) + 's'; // Random duration 1s or 3s
            star.css({
                top: Math.random() * windowHeight + 'px',
                left: Math.random() * windowWidth + 'px',
                animation: `twinkle ${twinkleDuration} infinite alternate`
            });
            $('#stars').append(star);
        }
    }

    // Create stars initially
    createStars();

    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop();
        const windowHeight = $(window).height();

        $('.star').each(function() {
            var speed = 0.5 + Math.random() * 0.5;
            var currentTop = parseFloat($(this).css('top'));
            var newTop = (currentTop + (scrollTop * speed)) % windowHeight;

            // Keep the stars within the viewport
            if (newTop > windowHeight) {
                newTop = -10; // Reset to above the viewport
                $(this).css('left', Math.random() * $(window).width() + 'px'); // Randomize horizontal position
            }
            $(this).css('top', newTop + 'px');
        });
    });

    $("#titleContainer").hover(function(){
        // Mouse enters the container
        $("#title").stop().fadeOut(300, function() {
            $(this).text("Garv&Ronit's space").fadeIn(300);
        });
    },
    function() {
        // Mouse leaves the container
        $("#title").stop().fadeOut(300, function() {
            $(this).text('GR Space').fadeIn(300);
        });
    });
});

$(window).scroll(function () {
    var scrollPosition = $(this).scrollTop();
    var center = $("#center");

    if (scrollPosition > 1) {
        center.slideUp(1000);
    } else {
        center.slideDown(1000);
    }

});