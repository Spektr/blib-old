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
	
	/*подменяем скрол*/   /*0_0 на будущее полоска прокрутки для истории <div class="b-request-history__slider"></div> -> во враппер
	var slider = $('.b-request-history__slider')[0];	//ползунок
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