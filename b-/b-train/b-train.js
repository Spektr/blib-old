var head  = document.getElementsByTagName('head')[0];
var link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = '/b-/b-train/b-train.css';
link.media = 'all';
head.appendChild(link);

$(document).ready(function(){
	/*наведение на иконки платежных систем*/
	$('.b-train__item').on('mouseover', function(){
		var alt = $(this).attr('alt');
		$('.b-train__help').text("Платежную систему "+alt);
	});
	$('.b-train__item').on('mouseout', function(){
		var alt = $(this).attr('alt');
		$('.b-train__help').text("Принимаем платежи через");
	});
	/*наведение на иконки платежных систем*/	
});
	