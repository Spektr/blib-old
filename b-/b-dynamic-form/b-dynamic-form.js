$(function(){
	
	blib.build("form", createForm); //указываем процаку как обрабатывать такого рода запрос
		
	//функция создания формы из переданных данных
	function createForm(data){
		if(!data){return false;}
		var result = [];
		console.log(data);
		//обрабатываем серверный ответ
		var form = $('<form />', {'class':"b-dynamic-form", 'name': data['name'], 'action':data['action'],'method':data['method']});
		
		
		/*
		for(var i=0; i<data['items'].length; i++){
			var div = $('<div />', {'class':"b-dynamic-menu__cell", 'alt': data['items'][i]['title'], 'data-action':data['items'][i]['action']});
			var span = $('<span />', {'class':"b-pic b-pic__amtel b-pic__amtel_"+data['items'][i]['action'].replace(/\_/g, '-')});
			div.append(span);
			result.push(div);
		}
		*/
		
		//куда будет загружен
		var place = data['place']||'.b-main-page__panel';
		$(place).append(form);
		//каким классом оформлен
		if(data['class']){$(form).addClass(data['class']);};

		
		
	}//createForm


});