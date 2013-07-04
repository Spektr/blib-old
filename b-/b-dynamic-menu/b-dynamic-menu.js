$(function(){
	
	blib.build("menu", createMenu); //указываем процаку как обрабатывать такого рода запрос
    blib.build({'a':"menu", 'title':"Менюшка"});	//ну и посылаем этот запрос
		
	//функция создания меню из переданных данных
	function createMenu(data){
		if(!data){return false;}
		var result = $('<div />', {'class':"b-dynamic-menu"});	//контейнер меню
		var itemAction = function(){							//обработчик нажатия на кнопку
			//заглушка чтоб не сбивалась анимация
			if($('.b-dynamic-menu__cell:animated')[0]){
				return false;
			}
			
			//визуально оформляем
			if(data['animated']){
				$(this).toggleClass("b-dynamic-menu__cell_active", 1500);
				$('.b-dynamic-menu__cell').not(this).removeClass("b-dynamic-menu__cell_active",1500);
			}
			
			//пихаем в доп окно клона выбранного пункта меню
			$('.b-dynamic-menu__selected-cell').html("");
			if(!$(this).hasClass("b-dynamic-menu__cell_active")){
				$(this)
					.clone()
					.on('click',function(){
						$('.b-dynamic-menu__cell_active').click();
					})
					.appendTo('.b-dynamic-menu__selected-cell');
					
					//подрубаем блок
					var block = $(this).attr("data-action");
					var title = $(this).attr("alt");
					blib.build({'a':block, 'title':title});
					
					return false;
			}
		}
		
		//обрабатываем серверный ответ
		for(var i=0; i<data['items'].length; i++){
			var div = $('<div />', {'class':"b-dynamic-menu__cell", 'alt': data['items'][i]['title'], 'data-action':data['items'][i]['action']});
			div.on('click', itemAction);
			var span = $('<span />', {'class':"b-pic b-pic__amtel b-pic__amtel_"+data['items'][i]['action'].replace(/\_/g, '-')});
			div.append(span);
			result.append(div);
		}
		//каким классом оформлен
		if(data['class']){result.addClass(data['class']);};
		//куда будет загружен
		if(data['place']){
			$(data['place']).html(result);
			return false;
		}else{
			return result;
		}
		
	}//createMenu


});