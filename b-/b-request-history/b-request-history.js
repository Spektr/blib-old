$(function(){
	
	var div = $('.b-request-history')[0];				//блок где строиться история
	blib.build("requestHistory", requestHistory);		//передаем обработчик ответа сервера для создания 
	
	//собственно сам обработчик
	function requestHistory(message){
		var statusLink = $('<a />', {'href':"#",'class':"b-request-history__link", 'text':message});
		
		statusLink.on('click', function(){
			blib.build.clearHistory($(this).index()+1);
			$(this).nextAll('.b-request-history__link').remove();
		});
		
		$('.b-request-history').append(statusLink);
		div.scrollLeft = div.scrollWidth - div.offsetWidth;
	}

});