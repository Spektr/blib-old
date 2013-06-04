blib.css('b-/b-menu/b-menu.css');

$(document).ready(function(){

    $('.b-menu__cell').on('click', function(){

        //заглушка чтоб не сбивалась анимация
        if($('.b-menu__cell:animated')[0]){
            return false;
        }

        //пихаем в доп окно клона выбранного пункта меню
        $('.b-memu__selected-cell').html("");
        if(!$(this).hasClass("b-menu__cell_active")){
            $(this)
                .clone()
                .on('click',function(){
                    $('.b-menu__cell_active').click();
                })
                .appendTo('.b-memu__selected-cell');

        }

        //визуально оформляем
        $(this).toggleClass("b-menu__cell_active", 1500);
        $('.b-menu__cell').not(this).removeClass("b-menu__cell_active",1500);

        //прикручиваем основную функцию загрузки аяксом контента
        if($('.b-memu__content')[0]){
            var content = $(this).attr("data-src") || "/b-/b-error/b-error.html";
            $('.b-memu__content').load(content);
        }


    });





    /*выведение текста по буковкам
    var pointName ={
        timer:null,

        show:function(evt){
            var sourceText = evt.target.alt;
            var delay = 50;
            var num = 0;
            var timer = null;
            subShowPointName();

            function subShowPointName(){
                $('.b-footer__side_center').append(sourceText.substr(num, 1));
                if((num++)<sourceText.length){
                    pointName.timer = setTimeout(subShowPointName, delay);
                };
            }
        },

        clear:function(){
            clearTimeout(pointName.timer);
            $('.b-footer__side_center').text("");
        }
    }
    */

});