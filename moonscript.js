
$(document).ready(function() {
    const radius = 100; // Globe radius in pixels
    let angle = 0; // Initial rotation angle
    let spacetxt = $('#spacetxt');
    let downarrow = $('#arrow_down');
    let lastScrollTop = 0;
    let isExpanded = true;
    let planet = 'Home';

    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = this.hash;
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);  // 1000ms = 1 second for smooth scrolling
    });    
    // Create twinkling stars in the background
    function createStars() {
        const windowHeight = $(window).height();
        const windowWidth = $(window).width();
        for (let i = 0; i < 500; i++) {
            const twinkleDuration = (1 + Math.random() * 2) + 's'; // Random twinkling duration
            let star = $('<div class="star"></div>').css({
                top: Math.random() * windowHeight + 'px',
                left: Math.random() * windowWidth + 'px',
                animation: `twinkle ${twinkleDuration} infinite alternate` // Apply animation
            });
            $('#Stars1').append(star); // Add star to the container
        }
    }

    // Parallax effect on stars
    function parallaxStars(scrollTop) {
        const windowHeight = $(window).height();
        $('.star').each(function() {
            const speed = 0.5 + Math.random() * 0.5;
            const currentTop = parseFloat($(this).css('top'));
            const newTop = (currentTop + (scrollTop * speed)) % windowHeight;
            if (newTop > windowHeight) {
                $(this).css({ top: '-10px', left: Math.random() * $(window).width() + 'px' });
            } else {
                $(this).css('top', newTop + 'px');
            }
        });
    }

    // Handle expansion and contraction of elements based on scroll
    function handleExpansion(scrollTop) {
        if (scrollTop < 100 && !isExpanded) {
            isExpanded = true;
            $("#center").stop(true, true).animate({ height: '150px' });
            $('#topbuttons').css({ transform: 'scale(1)' });
            $('#context').stop(true, true).animate({ left: '0px' }).css({ transform: 'scale(1)' });
        } else if (scrollTop >= 100 && isExpanded) {
            isExpanded = false;
            $("#center").stop(true, true).animate({ height: '100px' });
            $('#topbuttons').css({ transform: 'scale(0.7)' });
            $('#context').stop(true, true).animate({ left: '-40px' }).css({ transform: 'translateY(-25px) scale(0.7)' });
        }
    }

    // Scroll event handler
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();

        // Throttle scrolling to every 50 pixels
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
            lastScrollTop = scrollTop;

            // Parallax effect for stars
            parallaxStars(scrollTop);
            handleExpansion(scrollTop)
        }
    });

    createStars();
});
