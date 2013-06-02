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
                            note/*block's note*/,
                            techno/*array of technology*/){

            var block = $('<div />', {'class': target+" b-blib__block"});
			var title = $('<div />', {'class': "b-blib__block-title", 'text': title});

            var technology = new Array();
            for(key in techno){
                technology.push($('<div />', {'class':"b-blib__block-technology b-blib__block-technology_"+techno[key]}));
            }

            var content = $('<div />', {'class': "b-blib__block-content"});
            var innerCode = $('<pre />', {'class': "b-blib__block-code"});
            content.load(file, function(){
                innerCode.text(content[0].innerHTML);
                title.on('click', function(){
                    $(this).parent().find('.b-blib__block-code').toggle(400);
                });
            });
            var note = $('<div />', {'class': "b-blib__block-note", 'text': note});

            innerCode.hide();
            block.append(technology, title, content, note, innerCode);
            $('.b-blib').append(block);
		}
		
	};

})(); 

blib.css("index.css");
$(document).ready(function(){
	
});