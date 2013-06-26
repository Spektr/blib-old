$(document).ready(function(){
	blib.include("b-/b-menu/b-menu");
	
    $('.b-popup-menu__opener').on('click',function(){
        $('.b-popup-menu__content').toggleClass("b-popup-menu__content_closed",1500);
    });
});