$.fn.bgImage = function() {
    var $element = $(this)

    $element.each(function() {
        var $img = $(this).find('img.bg-img'),
            $src = $img.attr('src')

        $img.hide();

        if (!$img.length || $src == "" || $src == undefined) {
            $(this).css({
                'background-image': 'url("../images/hero/hero_main.jpg")'
            });
        } else
            $(this).css({
                'background-image': 'url("' + $src + '")'
            });
    });
};

$.fn.changeElementOnScroll = function () {

    var docElem = document.documentElement,
        elem = $(this),
        didScroll = false,
        changeElementOn = 100,
        changeClassName = 'change';


    $(function() {
        window.addEventListener( 'scroll', function() {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 0 );
            }
        }, false );

    });

    $(function() {
        window.addEventListener( 'load', function() {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 0 );
            }
        }, false );

    });

    function scrollPage() {
        var sy = scrollY();
        if ( sy >= changeElementOn ) {
            elem.addClass(changeClassName);
        }
        else {
            elem.removeClass(changeClassName);
        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

};

$(function dropDown() {
    var $trigger = $('.drop-trigger');
    var $drop = $('.drop-container');
    var $close = $drop.find('.close');


    $trigger.click(function() {
        if($(this).next($drop).hasClass("active")){
            $(this).next($drop).removeClass("active");
            $(this).toggleClass("active");
        }
        else
            $drop.not($(this).closest($drop)).removeClass("active"),
                $trigger.not($(this)).removeClass("active"),
                $(this).next($drop).toggleClass("active"),
                $(this).toggleClass("active");
        return false
    });

    $(document).bind('click', function(e) {
        if($(e.target).closest($drop).length === 0) {
            $('.drop-container.active').removeClass("active"),
                $('.drop-trigger.active').removeClass("active");
        }
    });

    $close.click(function() {
        $(this).parent().removeClass('active').removeAttr('style');
        return false
    });
});

function fullHeight() {
    var el = $('[data-height]');
    var value = el.attr('data-height');
    var whg = $(window).height() / 100;
    el.css("min-height", whg * value + "px")

}

function updateNav() {
    var currentSection = $('.section.current');
    var data = currentSection.attr('data-scroll-target');
    $('.main-menu li').removeClass('active');
    $('.main-menu    li[data-scroll-trigger= ' + data + ']').addClass('active');
}

function urlTrigger(){
    var speed = 600;
    if(location.hash !==''){
        var $headerHeight = $('.main-header').height();
        var $data = window.location.hash.substr(1);
        var $goTo = $(document).find('[data-scroll-target= ' + $data + ']');

        $('html, body').stop().animate({
            scrollTop: $goTo.offset().top - $headerHeight +'px'
        }, speed);
        $('[data-scroll-trigger]').removeClass('active');
        $(this).addClass('active');

        e.preventDefault();
        location.hash = $data;
    }
}

function scrollTrigger() {
    var speed = 600;
    var $scrollTrigger = $('[data-scroll-trigger]');

    $scrollTrigger.click(function(e) {
        var $headerHeight = $('.main-header').height();
        var $data = $(this).attr("data-scroll-trigger");
        var $goTo = $(document).find('[data-scroll-target= ' + $data + ']');

        $('html, body').stop().animate({
            scrollTop: $goTo.offset().top - $headerHeight + 2 +'px'
        }, speed);
        $('[data-scroll-trigger]').removeClass('active');
        $(this).addClass('active');
        if(location.hash!== $data){
            location.hash = $data;
        }
        e.preventDefault();
    });

//    $(window).on('hashchange', function(){
//        var $data = window.location.hash.substr(1);
//        $('[data-scroll-trigger="'+$data+'"]').trigger('click');
//
//    });
}

function identifySections() {
    var $headerHeight = $('.main-header').height();
    var $sections = $('.section');

    $sections.viewportChecker({
        classToAdd: 'current',
        offset: -$headerHeight,
        repeat: true,
        callbackFunction: function(elem, action) {
            updateNav();
        }
    });

    $sections.viewportChecker({
        classToAdd: 'anim',
        offset: 100,
        repeat: true
    });

    $sections.viewportChecker({
        classToAdd: 'svg-anim',
        offset: 200,
        repeat: false
    });


    function stickHeader() {
        var $el = $('.stick-menu');
        $el.each(function() {
            var top = $(this).offset().top,
                self = $(this);

            $(window).scroll(function() {
                if ($(this).scrollTop() >= top) {
                    self.addClass("active");
                } else {
                    self.removeClass("active");
                }
            });
        });
    }
    stickHeader();
}

function clickResponse() {
    $('.click-response').bind("click", function(e) {
        $(this).prepend('<response></response>');
        var respElement = $(this).find('response');
        respElement.offset({
            left: (e.clientX),
            top: (e.clientY)
        });
        setTimeout(function() {
            respElement.remove();
        }, 800);
    });
}

function activeMenuItem() {
    $('.main-nav a').filter(function() {
        var href = this.href;
        if(window.location.href.indexOf(href) > -1) {
            $(this).addClass('active');
        }
    })
}

//[[READY]]/////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    fullHeight();
    activeMenuItem();
    fullHeight();
    $('.bg').bgImage();
    scrollTrigger();
    identifySections();
    clickResponse();
    updateNav();
    $('.main-header').changeElementOnScroll();
});

//[[RESIZE]]/////////////////////////////////////////////////////////////////////////////////////////
$(window).resize(function() {
    fullHeight();
    updateNav();
});


//[[RESIZE]]/////////////////////////////////////////////////////////////////////////////////////////
$(window).load(function() {
    urlTrigger();
});





















