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

            title.on('click', function(){
                $(this).parent().find('.b-blib__block-code').toggle(400);
            });

            var content = $('<div />', {'class': "b-blib__block-content"});
            var innerCode = $('<textarea />', {'class': "b-blib__block-code"});
            content.load(file, function(){innerCode.text(content[0].innerHTML);});
            var note = $('<div />', {'class': "b-blib__block-note", 'text': note});

            innerCode.hide();
            block.append(title, content, note, innerCode);
            $('.b-blib').append(block);

            var lol = document.getElementsByTagName('textarea');
            console.log(content[0].outerHTML);
            document.write("++"+content[0].outerHTML);
		}
		
	};

})(); 

blib.css("index.css");
$(document).ready(function(){
	
});