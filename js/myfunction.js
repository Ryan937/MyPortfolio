$(document).ready(function() {
	var isMobile = false;
    var currentState;

    if (window.innerWidth < 900) {
        $.fn.portraitmode();
    } else {
        currentState = 0;
    }

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        // Take the user to a different screen here.
        $.fn.portraitmode();
        isMobile = true;
    }

    if (!isMobile) {
        $('#mobilenav').css({'display':'none'});
        $('#windownav').css({'display':'block'});
        // Play/pause video when a video is clicked
        $('.video').on('click', function(e){
            e.preventDefault();
            var playButton = $(this).next();
            this.paused?playButton.css({'display':'none'}):playButton.css({'display':'block'});
            this.paused?this.play():this.pause();
        });
        /*$('.video').hover(
            function() {
                $(this).next().next().animate({opacity: 1}, 1000);
            }, function() {
                $(this).next().next().animate({opacity: 0}, 1000);
            }
        ); */ 
        $('.playbutton').on('click', function(e){
            e.preventDefault();
            var video = $(this).prev();
            video.get(0).paused?$(this).css({'display':'none'}):$(this).css({'display':'block'});
            video.get(0).paused?video.get(0).play():video.get(0).pause();

        });
    } else {
        $('#mobilenav').css({'display':'block'});
        $('#windownav').css({'display':'none'});
        // Play/pause video when a video is clicked
        $('.video').on('touchstart', function(e){
            e.preventDefault();
            this.paused?this.play():this.pause();
        });
    }

    $.fn.reorder = function() {
        for (var i = 1; i < $('.col-xl-5').length; i+=2) {
            $('.col-xl-5').eq(i).insertAfter($('.col-xl-7').eq(i));
        }
    };
    $.fn.restoreOrder = function() {
        for (var i = 1; i < $('.col-xl-5').length; i+=2) {
            $('.col-xl-5').eq(i).insertBefore($('.col-xl-7').eq(i));
        }
    };

    if (!isMobile) {
    $(window).resize(function() {
        if (window.innerWidth < 1200 && currentState == 0) {
            $.fn.portraitmode();
        } else if (window.innerWidth >= 1200 && currentState == 1) {
            $.fn.landscapemode();
        } 
        $('#image').css({left: -(1520 - window.innerWidth) / 2});
        $('.contacts').css({left: 650 - (1520 - window.innerWidth) / 2});
        });        
    }

    $.fn.portraitmode = function() {
        /*$('#a-mission').text('M');
        $('#a-project').text('P');
        $('#a-skill').text('S');
        $('#a-interest').text('I');
        $('#a-contact').text('C');
        $('#project-container .grid-sizer').css("width", "98%");
        $('#project-container .grid-item').css("width", "98%");
        $('.grid-item-text').css("font-size", "3vw");*/
        $.fn.reorder();
        //$.fn.myfunction();
        currentState = 1;
    };
    $.fn.landscapemode = function() {
        /*$('#a-mission').text('mission');
        $('#a-project').text('project');
        $('#a-skill').text('skill');
        $('#a-interest').text('interest');
        $('#a-contact').text('contact');
        $('#project-container .grid-sizer').css("width", "48.5%");
        $('#project-container .grid-item').css("width", "48.5%");
        $('.grid-item-text').css("font-size", "1.5vw");*/
        $.fn.restoreOrder();
        //$.fn.myfunction();
        currentState = 0;
    };
})