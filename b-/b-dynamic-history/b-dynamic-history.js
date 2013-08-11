$(function(){

	blib.build("dynamicHistory", dynamicHistory);		//передаем обработчик ответа сервера для создания 
	
	var iterations =[];									//массив серверных ответов
	var satIteration = function(request, answer){		//запись ответа
		var index = iterations.length;
		iterations[index]=[];
		iterations[index]['request'] = request;
		iterations[index]['answer'] = answer;
	}
	var clearIteration = function(index){				//очищение ответа
		iterations = iterations.slice(0, index);
		var data = iterations[index-1]['answer'];
		blib.build.handler(data);
	}
	
	//собственно сам обработчик
	function dynamicHistory(historyData){
		if(historyData['request']['title']){var message = historyData['request']['title']}else{return false;}
		satIteration(historyData['request'],historyData['answer']);
		var statusLink = $('<a />', {'href':"#",'class':"b-dynamic-history__link", 'text':message});
		
		statusLink.on('click', function(){
			clearIteration($(this).index()+1);
			$(this).nextAll('.b-dynamic-history__link').remove();
		});
		
		$('.b-dynamic-history').append(statusLink);
		var div = $('.b-dynamic-history')[0];				//блок где строиться история	
		div.scrollLeft = div.scrollWidth - div.offsetWidth;
	}

});