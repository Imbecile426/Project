
$(document).ready(function() {
    const radius = 100; // Globe radius in pixels
    let angle = 0; // Initial rotation angle
    let spacetxt = $('#spacetxt');
    let downarrow = $('#arrow_down');
    let lastScrollTop = 0;
    let isExpanded = true;
    let planet = 'Home';

    /* Storing user's device details in a variable*/
    let details = navigator.userAgent; 
  
    /* Creating a regular expression  
    containing some mobile devices keywords  
    to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i; 

    /* Using test() method to search regexp in details 
it returns boolean value*/
    let isMobileDevice = regexp.test(details); 
  
    if (isMobileDevice) { 
        console.log("You are using a Mobile Device"); 
    } else { 
        $('.phonewarning').hide();
    }
    var popup = document.getElementById("popup");
    var close = document.getElementsByClassName("close")[0];
    if (!getCookie('welcomePopupSeen')) {
    // Show the popup
    popup.style.display = "block";
    console.log('cookie found');
    }
    else{
        initialAnimations();
        console.log('nope');
    }
    // Close the popup when the user clicks on <span> (x)
    close.onclick = function() {
        $('#popup').animate({
            opacity:0,
        },1000,function () {
            popup.style.display = "none";
        });
        initialAnimations();
        document.cookie = "welcomePopupSeen=true; max-age=" + 60 * 60;
    };


    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = this.hash;
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);  // 1000ms = 1 second for smooth scrolling
    });    

    // Initial animations for `spacetxt` and `downarrow`
    function initialAnimations() {
        var moveSpace = $(window).width() <= 768 ? 140 : 200; // 150px for phone, 200px for laptop
        console.log(moveSpace);
        spacetxt.animate({ top: `+=${moveSpace}px`, opacity: 1 }, 1000, function() {
            downarrow.animate({ opacity: 1 }, 1000);
        });
    }

    // Create twinkling stars in the background
    function createStars() {
        const windowHeight = $(window).height();
        const windowWidth = $(window).width();
        for (let i = 0; i < 50; i++) {
            const twinkleDuration = (1 + Math.random() * 2) + 's'; // Random twinkling duration
            let star = $('<div class="star"></div>').css({
                top: Math.random() * windowHeight + 'px',
                left: Math.random() * windowWidth + 'px',
                animation: `twinkle ${twinkleDuration} infinite alternate` // Apply animation
            });
            $('#stars').append(star); // Add star to the container
            $('#stars').append(star); // Add star to the container
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
            $("#center").stop(true, true).animate({ height: '178px' });
            $('#topbuttons').css({ transform: 'scale(1)' });
            $('#context').stop(true, true).animate({ left: '0px' }).css({ transform: 'scale(1)' });
        } else if (scrollTop >= 100 && isExpanded) {
            isExpanded = false;
            $("#center").stop(true, true).animate({ height: '100px' });
            $('#topbuttons').css({ transform: 'scale(0.7)' });
            $('#context').stop(true, true).animate({ left: '-40px' }).css({ transform: 'translateY(-25px) scale(0.7)' });
        }
    }

    // Planet animation based on scroll position
    function handlePlanetAnimation(scrollTop) {
        if (scrollTop >= 400 && scrollTop < 1400 && planet !== 'Sun') {
            transitionToPlanet('Sun');
        } else if (scrollTop >= 1400 && scrollTop < 2400 && planet !== 'Earth') {
            transitionToPlanet('Earth');
        } else if (scrollTop >= 2400 && planet !== 'Moon') {
            transitionToPlanet('Moon');
        } else if (scrollTop < 400 && planet !== 'Home') {
            transitionToPlanet('Home');
        }
    }

    // Transition between planets
    function transitionToPlanet(newPlanet) {
        if (planet !== newPlanet) {
            planet = newPlanet;
            const allContent = ['#suncontent', '#earthcontent', '#mooncontent'];
            const allPlanets = ['#Sun', '#Earth', '#Moon'];

            // Hide all content and planets
            allContent.forEach(content => $(content).stop(true, true).animate({ opacity: 0 }));
            allPlanets.forEach(planet => $(planet).stop(true, true).animate({ opacity: 0 }));

            // Show new planet and content
            switch (planet) {
                case 'Sun':
                    $('#Sun').stop(true, true).animate({ opacity: 1 });
                    $('#suncontent').stop(true, true).animate({ opacity: 1 }, 1000, function() {
                        $('#suncontent').stop(true, true).animate({ marginTop: '100px' });
                    });
                    break;
                case 'Earth':
                    $('#Earth').stop(true, true).animate({ opacity: 1 });
                    $('#earthcontent').stop(true, true).animate({ opacity: 1 }, 1000, function() {
                        $('#earthcontent').stop(true, true).animate({ marginTop: '100px' });
                    });
                    break;
                case 'Moon':
                    $('#Moon').stop(true, true).animate({ opacity: 1 });
                    $('#mooncontent').stop(true, true).animate({ opacity: 1 }, 1000, function() {
                        $('#mooncontent').stop(true, true).animate({ marginTop: '100px' });
                    });
                    break;
                case 'Home':
                    // Home doesn't have any planet content
                    break;
            }
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

            // Handle expansion and planet animation based on scroll
            handleExpansion(scrollTop);
            handlePlanetAnimation(scrollTop);
        }
    });

    // Hover effect to change title text
    function titleHoverEffect() {
        $("#titleContainer").hover(function() {
            $("#title").stop().fadeOut(300, function() {
                $(this).text("Made by Ronit & Garv").fadeIn(300); // Change text
            });
        }, function() {
            $("#title").stop().fadeOut(300, function() {
                $(this).text('Lunar Arc').fadeIn(300); // Revert text
            });
        });
    }

    // Initialize everything
    
    createStars();
    titleHoverEffect();
});
function showhelp(){
    $('#help').show();
    /* Storing user's device details in a variable*/
    let details = navigator.userAgent; 

    /* Creating a regular expression  
    containing some mobile devices keywords  
    to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i; 

    /* Using test() method to search regexp in details 
    it returns boolean value*/
    let isMobileDevice = regexp.test(details); 

    if (isMobileDevice) { 
        console.log("You are using a Mobile Device"); 
    } else { 
        $('.phonewarning').hide();
    }
    var popupe = document.getElementById("help");
    var closee = document.getElementsByClassName("closee")[0];

    // Show the popup
    popupe.style.display = "block";

    // Close the popup when the user clicks on <span> (x)
    closee.onclick = function() {
        popupe.style.display = "none";
    
    };
    }
// Function to check if a specific cookie exists
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
}
