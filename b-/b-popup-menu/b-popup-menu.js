blib.css('b-/b-popup-menu/b-popup-menu.css');

$(document).ready(function(){
    $('.b-popup-menu__opener').on('click',function(){
        $('.b-popup-menu__content').toggleClass("b-popup-menu__content_closed",1500);
    });
});