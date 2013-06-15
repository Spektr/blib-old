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
            blib.include(content.substr(0,content.length-5),'.b-memu__content');
            //$('.b-memu__content').load(content);

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

});blib.css('/b-/b-train/b-train.css');

$(document).ready(function(){
	/*наведение на иконки платежных систем*/
	$('.b-train__item').on('mouseover', function(){
		var alt = $(this).attr('alt');
		$('.b-train__help').text("Платежную систему "+alt);
	});
	$('.b-train__item').on('mouseout', function(){
		var alt = $(this).attr('alt');
		$('.b-train__help').text("Принимаем платежи через");
	});
	/*наведение на иконки платежных систем*/	
});
	function addBlock(target/*name of new block*/,
                        file/*where is it place*/,
                        title/*block's title*/,
                        note/*block's note*/,
                        techno/*array of technology*/){

    var block = $('<div />', {'class': target+" b-blib__block"});
    var title = $('<div />', {'class': "b-blib__block-title", 'text': title});

    var technology = [];
    for(var key in techno){
        technology.push($('<div />', {'class':"b-blib__block-technology b-blib__block-technology_"+techno[key]}));
    }

    var content = $('<div />', {'class': "b-blib__block-content"});
    var innerCode = $('<pre />', {'class': "b-blib__block-code"});
    content.load(file, function(){
        innerCode.text(content[0].innerHTML);
        title.on('click', function(){
            $(this).parent().find('.b-blib__block-code').toggle(400);
        });
        blib.include(file.substr(0,file.length-5));
    });
    var note = $('<div />', {'class': "b-blib__block-note", 'text': note});

    innerCode.hide();
    block.append(technology, title, content, note, innerCode);
    $('.b-blib').append(block);

};$(document).ready(function(){
    $('.b-popup-menu__opener').on('click',function(){
        $('.b-popup-menu__content').toggleClass("b-popup-menu__content_closed",1500);
    });
});