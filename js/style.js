$(document).ready(function() {
    $("#open").show();
    $("#close").hide();
    $("#open").click(function(){
        $("#navi").slideToggle();
        $("#open").hide();
        $("#close").show();
    });

    $("#close").click(function(){
        $("#navi").slideToggle();
        $("#open").show();
        $("#close").hide();
    });

    var topBtn = $('#pagetop');
    topBtn.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });

    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    $("a[href*=#]:not([href=#])").click(function(){
        var target = $($(this).attr("href")).offset().top;
        target -= 50;
        $("html, body").animate({scrollTop: target}, 500);
        return false;
    });

    $('#copy-url').click(function () {
        const url = $(this).data('url');
        navigator.clipboard.writeText(url);
        $('.success-msg').fadeIn("slow", function () {
            $(this).delay(2000).fadeOut("slow");
        });
    });

    });

    