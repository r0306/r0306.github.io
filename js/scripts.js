/*jslint browser: true*/
/*global $, jQuery, alert*/

var top_save;
var lastSection;

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
        $('.section').each(function () {
            var windowScroll = $(window).scrollTop(), navHeight = $('.navbar').height();
            if (windowScroll + navHeight >= $(this).offset().top && windowScroll + navHeight <= $(this).offset().top + $(this).height()) {
                if (lastSection !== undefined) {
                    lastSection.removeClass("highlight");
                    lastSection = undefined;
                }
                if (lastSection === undefined) {
                    $('.navbar #section-' + $(this).attr('id')).addClass("highlight");
                    lastSection = $('.navbar a #section-' + $(this).attr('id'));
                }
            }
            if (!$('.navbar').hasClass("sticky")) {
                lastSection.removeClass("highlight");
                lastSection = undefined;
            }
        });
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
        $('.name-tag').css('color', '#000000');
        $('#name-error').css('display', 'none');
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
        $('.email-tag').css('color', '#000000');
        $('#email-error').css('display', 'none');
    });
    $('.email-field').blur(function () {
        $('.email-div').find("i").css('color', '#888888');
        $('.email-div').find('.vertical-line').css('background', '#454545');
        $('.email-div').css('border', '3px solid #454545');
    });
    $('.message-field').focus(function () {
        $('.message-field').css('border', '3px solid #66CCFF');
        $('.message-tag').css('color', '#000000');
        $('#message-error').css('display', 'none');
    });
    $('.message-field').blur(function () {
        $('.message-field').css('border', '3px solid #454545');
    });
    $('.send').click(function () {
        var name = $.trim($('.name-field').val()), email = $.trim($('.email-field').val()), message = $.trim($('.message-field').val()), pattern = /^([a-z\d!#$%&'*+\-\/=?\^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?\^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if (name.length <= 0) {
            $('.name-div').css('border', '3px solid #FF0000');
            $('.name-tag').css('color', '#FF0000');
            $('#name-error').css('display', 'inline-block');
            return;
        }
        if (email.length <= 0 || !email.match(pattern)) {
            $('.email-div').css('border', '3px solid #FF0000');
            $('.email-tag').css('color', '#FF0000');
            $('#email-error').css('display', 'inline-block');
            return;
        }
        if (message.length <= 2) {
            $('.message-field').css('border', '3px solid #FF0000');
            $('.message-tag').css('color', '#FF0000');
            $('#message-error').css('display', 'inline-block');
            return;
        }
        $.ajax({
            type: 'POST',
            url: 'http://robertluwebsite.000webhostapp.com/email.php',
            data: { name: $('.name-field').val(),
                    email: $('.email-field').val(),
                    message: $('.message-field').val() }
        });
        $('.contact-form').css('display', 'none');
        $('.contact-submission').css('display', 'inline');
        return false;
    });
});