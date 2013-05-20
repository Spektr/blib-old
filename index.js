window.blib =(function(){
	var self = this;
	var head = document.getElementsByTagName('head')[0];
	
	return function(){
		this.css = function(cssFile){
			//подрубаем цсс
		}
		
		
	}

})(); 





var link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = 'index.css';
link.media = 'all';
head.appendChild(link);

$(document).ready(function(){
	$('.b-blib__train').load("/b-/b-train/b-train.html");
});