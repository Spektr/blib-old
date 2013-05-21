blib.css('/b-/b-train/b-train.css');

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
	