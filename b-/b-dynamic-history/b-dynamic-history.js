$(function(){

	blib.build.ready(dynamicHistory);		//передаем обработчик, вызываемый после перестройки каждого запроса
	
	//собственно сам обработчик getCurrentIteration
	function dynamicHistory(data){
		
		var currIteration = blib.build.getCurrentIteration(),
			iteration = blib.build.getIteration(currIteration);

		if(iteration['request']['title']){var message =iteration['request']['title']}else{return false;}
		var statusLink = $('<a />', {'href':"#",'class':"b-dynamic-history__link", 'text':message});
		
		statusLink.on('click', function(){
			$(this).nextAll('.b-dynamic-history__link').remove();
			$(this).remove();
			blib.build.setCurrentIteration(currIteration-1);
			window.blib.build(iteration['request']);			
		});
		
		$('.b-dynamic-history').append(statusLink);
		var div = $('.b-dynamic-history')[0];				//блок где строиться история	
		div.scrollLeft = div.scrollWidth - div.offsetWidth;
	}

});