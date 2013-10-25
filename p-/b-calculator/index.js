$(function(){
	var settings={
		'0':{
			'url':"/default.jpg",	//адрес до картинки
			'base':0,				//базовая стоимость типа окна (например деревяшка начинается от 3000 рублей)
			'width':0,				//коэффициент для корректировки ширины (например за каждый 1см ширины +20 рублей к стоимости)
			'height':0,				//тоже для высоты
			'prop':[]				//массив тех настроек которые надо учитывать для выбранного окна (например поле крепления доступны только платиковым окнам)
		},
		'1':{
			'url':"/images/sampledata/icetheme/categories/categories2.png",
			'base':1000,
			'width':1,
			'height':1,
			'prop':['fixator', 'coeff']
		},
		'2':{
			'url':"/images/sampledata/fruitshop/apple.jpg",
			'base':1000,
			'width':1,
			'height':1,
			'prop':['fixator']
		}
	}
	
	$('.b-calculator__input-height, .b-calculator__input-width, .b-calculator__input-param').change(function(){
		var params = $('.b-calculator').serializeArray(),
			selected = $('.b-calculator__item_selected').attr("alt"),
			getSettings = (selected in settings)?settings[selected]:settings['0'],
			result=getSettings['base'];
		
		for(var len = params.length, i=0; i<len; i++){
			var propName = params[i]['name'],
				propValue = params[i]['value'];
			if(propName=="width"){result += propValue*getSettings['width']; continue;}
			if(propName=="height"){result += propValue*getSettings['height']; continue;}
			result = eval(result+propValue);
		}
		$('.b-calculator__footer').text("Итого: "+result+" рублей. (Внимание, высчитана ориентировочная стоимость, для получения более точной цены свяжитесь с нашим специалистом");
	});
	
	$('.b-calculator__item').on('click', function(){
		$('.b-calculator__item_selected').removeClass("b-calculator__item_selected");
		$('.b-calculator__input-param_on').removeClass("b-calculator__input-param_on");
		$('.b-calculator')[0].reset();
		$('.b-calculator__footer').text("Выберите тип и параметры заказа");
		
		var selected = $(this).addClass("b-calculator__item_selected").attr("alt"),
			getSettings = (settings[selected])?settings[selected]:settings['0']
			showProp = getSettings['prop'],
			url = getSettings['url'];
		
		$('.b-calculator__view').html('<img src="'+url+'" />');
		
		$('.b-calculator__input-param').each(function(){
			var name = $(this).attr('name');					  
			for(key in showProp){
				if(showProp[key] == name){$(this).addClass("b-calculator__input-param_on");}
			}
		});
	});
	
	$('.b-calculator__item')[0].click();
	
});