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
		satIteration(historyData['request'],historyData['answer']);
		var message = (historyData['request']['title'])?historyData['request']['title']:"X";
		var statusLink = $('<a />', {'href':"#",'class':"b-dynamic-history__link", 'text':message});
		
		statusLink.on('click', function(){
			clearIteration($(this).index()+1);
			$(this).nextAll('.b-dynamic-history__link').remove();
		});
		
		$('.b-dynamic-history').append(statusLink);
		var div = $('.b-dynamic-history')[0];				//блок где строиться история	
		div.scrollLeft = div.scrollWidth - div.offsetWidth;
	}
	
	/*подменяем скрол*/   /*0_0 на будущее полоска прокрутки для истории <div class="b-dynamic-history__slider"></div> -> во враппер
	var slider = $('.b-dynamic-history__slider')[0];	//ползунок
	slider.onmousedown = function(){
		var mX, startX = (function () {
			var left=0, elem = div;
			while(elem) {
				left += parseFloat(elem.offsetLeft);
				elem = elem.offsetParent;     
			}
			return Math.round(left);
		})();
		
		document.body.onmousemove = function(){
			mX = window.event.x;
			var pos = mX-startX-10;
			if(pos<0){
				pos=0;
			}else if(pos>div.offsetWidth){
				pos=div.offsetWidth-20;
			}
			pos+="px";
			
			slider.style.left = pos;
			console.log(slider.style.left);
			console.log(startX);
			console.log(mX);
		}
	}

	document.body.onmouseup = function(){
		document.body.onmousemove = null;
	}
	/*подменяем скрол*/
});