window.blib =(function(){
	var self = this;
	var head = document.getElementsByTagName('head')[0];
	
	return {
		//include css file
		'css': function(cssFile){
			var link  = document.createElement('link');
			link.rel  = 'stylesheet';
			link.type = 'text/css';
			link.href = cssFile.toString();
			link.media = 'all';
			head.appendChild(link);
		},
		'addBlock':function(target, file,  title){
			
			var blockName = $('<div />', {class: "b-blib__block-title", text: title});
			var block = $('<div />', {class: target+" b-blib__block"});
			block.load(file);
			
			$('.b-blib').append(blockName);
			$('.b-blib').append(block);
		},
		
	};

})(); 

blib.css("index.css");
$(document).ready(function(){
	
});