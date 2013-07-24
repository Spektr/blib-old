$(function(){
	blib.build("fileList", createFileList); //указываем процаку как обрабатывать такого рода запрос

	//функция создания меню из переданных данных
	function createFileList(data){

		if(!data){return false;}
		var result = $('<div />', {'class':"b-dynamic-files"});	//контейнер меню
		var itemAction = function(){							//обработчик нажатия на кнопку
			return false;
		}
		
		//обрабатываем серверный ответ
		for(var i=0; i<data['files'].length; i++){
			var a = $('<a />', {'class':"b-dynamic-files__item", 'href':"b-/b-dynamic-files/__files/"+data['files'][i]['url']});
			var descr = $('<span />', {'class':"b-dynamic-files__item-description", 'text':data['files'][i]['description']});
			var img = $('<span />', {'class':"b-dynamic-files__image b-dynamic-files__image_csv"});
			var name = $('<span />', {'class':"b-dynamic-files__item-name", 'text':data['files'][i]['name']});
			a.append(descr, img, name);
			result.append(a);
		}
		
		//каким классом оформлен
		if(data['class']){result.addClass(data['class']);};
		//куда будет загружен
		if(data['container']){
			$(data['container']).html(result);
			return false;
		}else{
			return result;
		}
		
	}//createFileList


});