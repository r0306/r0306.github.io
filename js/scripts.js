/*jslint browser: true*/
/*global $, jQuery, alert*/

var top_save;

$(document).ready(function () {
    "use strict";
    $(window).scroll(function () {
        if ($(this).scrollTop() > $('.navbar').offset().top && $('.navbar').hasClass("sticky") === false) {
            top_save = $('.navbar').offset().top;
            $('.navbar').addClass("sticky");
            setTimeout(function () {
                $('.navbar').addClass("animate");
                $('.top-container').addClass("slide");
            }, 50);
        } else if ($(this).scrollTop() < top_save && $('.navbar').hasClass("sticky") === true) {
            $('.navbar').removeClass("sticky");
            setTimeout(function () {
                $('.navbar').removeClass("animate");
                $('.top-container').removeClass("slide");
            }, 50);
        }
    });
    $('.top-button').click(function () {
        $('body,html').animate({
            scrollTop : 0
        }, 500);
    });
	$('.navbar').find('ul a').on('click', function (event) {
        event.preventDefault();
        var target = $(this.hash);
        $('body,html').animate({
            'scrollTop': target.offset().top - $('.navbar').height() / 2 + 1
        }, 400);
    });
    $('.navbar').on('dragstart', function (event) { event.preventDefault(); });
    document.getElementById('hi').ondragstart = function () { return false; };
    $('.hidden-link').click(function (e) {
        e.stopPropagation();
        $(this).find('a')[0].click();
    });
    $('.name-field').focus(function () {
        $('.name-div').find("i").css('color', '#000000');
        $('.name-div').find('.vertical-line').css('background', '#000000');
        $('.name-div').css('border', '3px solid #66CCFF');
    });
    $('.name-field').blur(function () {
        $('.name-div').find("i").css('color', '#888888');
        $('.name-div').find('.vertical-line').css('background', '#454545');
        $('.name-div').css('border', '3px solid #454545');
    });
    $('.email-field').focus(function () {
        $('.email-div').find("i").css('color', '#000000');
        $('.email-div').find('.vertical-line').css('background', '#000000');
        $('.email-div').css('border', '3px solid #66CCFF');
    });
    $('.email-field').blur(function () {
        $('.email-div').find("i").css('color', '#888888');
        $('.email-div').find('.vertical-line').css('background', '#454545');
        $('.email-div').css('border', '3px solid #454545');
    });
});

