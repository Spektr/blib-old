$(document).ready(function(){
	blib.build("table", createTable); //указываем процаку как обрабатывать такого рода запрос
		
	//функция создания меню из переданных данных
	function createTable(data){
		if(!data){return false;}
		
		var result = $('<table />', {'class':"b-dynamic-table"}),
			customization = data['customization'],
			content = data['content'],
			actions = data['actions'];
		
		if(data['name']){result.attr('name', data['name']);}

		var tContent = [];
		for(var i=0, len=content.length; i<len;i++){
			var tr = content[i],
				tRow=[];
			for(td in tr){
				tRow.push($('<td />',{'text':tr[td], 'width':((!i)?customization[td]:"")}));
			}
			tRow.push((!i)?$('<td />',{'text':"Операции"}):$('<td />',{'html':createActionsBar(tr)}));
			tContent.push($('<tr />').append(tRow));
		}
		result.append(tContent);
		
		
		//каким классом оформлен
		if(data['class']){result.addClass(data['class']);};
		//куда будет загружен
		if(data['conteiner']){
			$(data['conteiner']).html(result);
			return false;
		}else{
			return result;
		}
		
		function createActionsBar(tr){
			var button = {},
				buttonClass = '',
				buttons =[],
				attributes={};
			for(key in actions){
				for(var i=0, len =actions[key]['attributes'].length; i<len;i++ ){
					attributes[actions[key]['attributes'][i]]=tr[actions[key]['attributes'][i]];	//0_0 xD
				}
				attributes['a']=actions[key]['name'];				//что за функцию вызывать на сервере
				attributes['title']=actions[key]['description'];	//для истории
				buttonClass ="b-pic b-pic__amtel b-pic__amtel_"+attributes['a']+" b-dynamic-table_button";
				button = $('<a />', {
					'class':buttonClass,
					'alt':actions[key]['description'],
					'data-attributes':JSON.stringify(attributes)
				}).on('click', function(){
					blib.build(JSON.parse($(this).attr('data-attributes')));
				});
				
				buttons.push(button);
			}
			return buttons;			
		}
	}
	
		/*
			"actions":[{
				"name":"edit_user",
				"description":"Редактировать пользователя",
				"attributes":[
					"id"
				]				
			}]
		*/

});