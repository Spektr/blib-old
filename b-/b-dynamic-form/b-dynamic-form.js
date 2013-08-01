$(function(){
	
	blib.build("form", createForm); //указываем процаку как обрабатывать такого рода запрос
	
	/*определяем базовый конструктор полей формы*/			//0_0 сломать этот подход при первой же возможности
	var defaultAttr = (function(){
		var attrArray = {'class':true, 'name':true, 'action':true};
		return function(obj,attr){
			for(i in attr){
				if(i in attrArray){
					if(i == "action"){
						obj['data-action']=attr[i];
					}else{
						obj[i]=attr[i];
					}
				};
			}
			return obj;
		}
	})();
	//задаем обработчики значений
	var funcs = {};	

	//текстовое поле
	funcs['text']=function(obj){
		var result = document.createElement("input");
		result = defaultAttr(result, obj);
		result.type="text";
		if('value' in obj){result.defaultValue=obj.value;}
		
		var onse = false;
		result.onfocus = function(){if(!onse){this['value'] =""; onse=true;}}
		
		if('label' in obj){
			var label = document.createElement("label");
			label.innerHTML=obj.label;
			label.appendChild(result);
			result = label;
		}
		
		return result;
	}
	
	//автозаполняемое текстовое поле
	funcs['autotext']=function(obj){
		var result = document.createElement("input"),
			popup = document.createElement("div"),
			onse = false,
			keyupTimer;
		popup.className = "b-dynamic-form__popup";


			
		result = defaultAttr(result, obj);
		result.type="text";
		if('value' in obj){result.defaultValue=obj.value;}

		result.onfocus = function(){if(!onse){this['value'] =""; onse=true;}}
		result.onblur = function(){window.setTimeout(closePopup,500);}
		result.onkeyup = function(){
			var self = this;
			window.clearTimeout(keyupTimer);
			keyupTimer = window.setTimeout(function(){
				$.ajax({
					url:"b-/b-blib-build/b-blib-build.php",
					data:{'a':obj['actions'], 'needle':self.value},
					dataType: "json",
					success: function(data){
						console.log(data);
						popup.innerHTML = "";
						for(key in data['content']){
							var popupItem = document.createElement("div");
							popupItem.className = "b-dynamic-form__popup-item";
							popupItem.innerText = data['content'][key];
							popupItem.onclick = function(){
								result.value=this.innerText;
								console.log(result);
								closePopup();
							}
							popup.appendChild(popupItem);
						}
						console.log(popup.style);
						console.log(result.style);
					}
				});				
			}, obj['delay']);
		}
		
	
		var label = document.createElement("label");
		label.innerHTML=(obj.label)?obj.label+"<br />":"";
		label.appendChild(result);
		label.appendChild(popup);
		label.style.position="relative";
		return label;
		
		function closePopup(){
			popup.innerHTML="";
		}
	}
	
	//пароль
	funcs['password']=function(obj){
		var result = document.createElement("input");
		result = defaultAttr(result, obj);
		result.type="text";
		if('value' in obj){result.defaultValue=obj.value;}
		
		result.onfocus = function(){this['value'] =""; this['type'] = "password";}
		
		if('label' in obj){
			var label = document.createElement("label");
			label.innerHTML=obj.label;
			label.appendChild(result);
			result = label;
		}
		
		return result;			
	}
	
	//чекбокс
	funcs['check']=function(obj){
		var result = document.createElement("input");
		result = defaultAttr(result, obj);
		result.type="checkbox";
		if(('value' in obj) && obj['value']=="checked"){result.checked=true;}
		
		if('label' in obj){
			var label = document.createElement("label");
			label.innerHTML=obj.label;
			label.appendChild(result);
			result = label;
			if(('value' in obj) && obj['value']=="checked"){result.children[0].checked=true;}
		}
		
		return result;
	}
	
	
	//радио
	funcs['option']=function(obj){
		var result = document.createElement("input");
		result = defaultAttr(result, obj);
		result.type="radio";
		if(('value' in obj) && obj['value']=="checked"){result.checked=true;}
		
		if('label' in obj){
			var label = document.createElement("label");
			label.innerHTML=obj.label;
			label.appendChild(result);
			result = label;
			if(('value' in obj) && obj['value']=="checked"){result.children[0].checked=true;}
		}
		
		return result;
	}
	
	
	//селект списком
	funcs['list']=function(obj){
		var result = document.createElement("select");
		result.multiple='multiple';
		result = defaultAttr(result, obj);

		for(i in obj['options']){
			var opt = new Option(obj['options'][i]['label'], obj['options'][i]['value'], false, false);
			opt.defaultSelected = (obj['options'][i]['selected'] == "selected")?"selected":false;
			opt.disabled = (obj['options'][i]['disabled'] == "disabled")?true:false;
			result.options.add(opt);
		}

		if('label' in obj){
			var label = document.createElement("label");
			label.innerHTML=obj.label;
			label.appendChild(result);
			result = label;
		}
		
		return result;
	};
	
	//селект одной строкой
	funcs['combo']=function(obj){
		var result = document.createElement("select");
		result = defaultAttr(result, obj);

		for(i in obj['options']){
			var opt = new Option(obj['options'][i]['label'], obj['options'][i]['value'], false, false);
			opt.defaultSelected = (obj['options'][i]['selected'] == "selected")?"selected":false;
			opt.disabled = (obj['options'][i]['disabled'] == "disabled")?true:false;
			
			result.options.add(opt);
		}

		if('label' in obj){
			var label = document.createElement("label");
			label.innerHTML=obj.label;
			label.appendChild(result);
			result = label;
		}
		
		return result;
	};
	
	//кнопка отправки
	funcs['submit']=function(obj){
		var result = document.createElement("input");
		result = defaultAttr(result, obj);
		result.type="submit";
		if('value' in obj){result.defaultValue=obj.value;}
		
		if('label' in obj){
			var label = document.createElement("label");
			label.innerHTML=obj.label;
			label.appendChild(result);
			result = label;
		}
		
		return result;
	}
	
	//кнопка отправки
	funcs['button']=function(obj){
		var result = document.createElement("input");
		result = defaultAttr(result, obj);
		result.type="button";
		if('value' in obj){result.defaultValue=obj.value;}
		
		result.onclick = function(){ blib.build({'a':this['data-action']});};
		
		if('label' in obj){
			var label = document.createElement("label");
			label.innerHTML=obj.label;
			label.appendChild(result);
			result = label;
		}
		
		return result;
	}
	
	//комментарий
	funcs['memo']=function(obj){
		var result = document.createElement("textarea");
		result = defaultAttr(result, obj);
		if('value' in obj){result.value=obj.value;}
		
		if('label' in obj){
			var label = document.createElement("label");
			label.innerHTML=obj.label;
			label.appendChild(result);
			result = label;
		}
		
		return result;
	}
	
	//и обьявляем конструктор
	var handle = function(obj){
		return (typeof funcs[obj['type']] === 'function')?funcs[obj['type']](obj):false;
	}
	/*определяем базовый конструктор полей формы*/
	
	
	
	//функция создания формы из переданных данных
	function createForm(data){
		if(!data){return false;}
		var result = [];

		//обрабатываем серверный ответ
		var form = $('<form />', {'class':"b-dynamic-form", 'name': data['name'], 'action':data['action'],'method':data['method']});

		for(var arr = data['content'], len = arr.length, i=0; i<len; i++){
			var elem = handle(arr[i]);
			result.push(elem);
		}
		form.append(result);
	
		//каким классом оформлен
		if(data['class']){form.addClass(data['class']);};
		//куда будет загружен
		if($(data['container'])[0]){
			$(data['container']).html(form);
			return false;
		}else{
			return form[0];
		}
	}//createForm
	
});