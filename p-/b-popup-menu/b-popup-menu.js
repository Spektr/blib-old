$(document).ready(function(){
	blib.build({'a':"menu", 'title':"Менюшка"});	//ну и посылаем этот запрос
    $('.b-popup-menu__opener').on('click',function(){
        $('.b-popup-menu__content').toggleClass("b-popup-menu__content_closed",1500);
    });
});