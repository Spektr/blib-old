$(function(){
	
	blib.build("requestHistory", requestHistory);
	
	function requestHistory(message){
		var statusLink = $('<a />', {'href':"#",'class':"b-request-history__link", 'text':message});
		
		statusLink.on('click', function(){
			blib.build.clearHistory($(this).index()+1);
			$(this).nextAll('.b-request-history__link').remove();
		});
		
		$('.b-request-history').append(statusLink);
		
	}
});