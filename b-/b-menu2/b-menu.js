$(document).ready(function(){
	
	blib.build("menu", createMenu); //указываем процаку как обрабатывать такого рода запрос
    blib.build({'a':"menu"});	//ну и посылаем этот запрос
	
	//функция создания меню из переданных данных
	function createMenu(data){

		if(!data){return false;}
		var result = [];
		
		for(i in data){
			var div = $('<div />', {'class':"b-menu__cell", 'alt': data[i]['description'], 'data-action':data[i]['action']});
			var span = $('<span />', {'class':"b-pic b-pic__amtel b-pic__amtel_"+data[i]['action']});
			div.append(span);
			result.push(div);
		}
		$('.b-menu').html(result);
		
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
					
					 //подрубаем блок
					if($('.b-memu__content')[0]){
						var block = $(this).attr("data-action");
                        blib.build({'a':block});
					}
					return false;
			}
		});
	}//createMenu


});