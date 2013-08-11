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