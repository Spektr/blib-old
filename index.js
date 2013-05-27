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

        //create block
		'addBlock':function(target/*name of new block*/,
                            file/*where is it place*/,
                            title/*block's title*/,
                            note/*block's note*/){

            var block = $('<div />', {'class': target+" b-blib__block"});
			var title = $('<div />', {'class': "b-blib__block-title", 'text': title});
            var content = $('<div />', {'class': "b-blib__block-content"});
            content.load(file);
            var note = $('<div />', {'class': "b-blib__block-note", 'text': note});
            var innerCode = $('<textarea />', {'class': "b-blib__block-code", 'text':content.get(0)});

            block.append(title, content, note, innerCode);
            $('.b-blib').append(block);
		}
		
	};

})(); 

blib.css("index.css");
$(document).ready(function(){
	
});