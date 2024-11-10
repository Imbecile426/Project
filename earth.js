$(document).ready(function() {
    // Hover to show dim background
    $('.earth-section').hover(
        function() {
            $('#overlay').css('opacity', '1'); // Show dim background
        },
        function() {
            $('#overlay').css('opacity', '0'); // Hide dim background
        }
    );
});
