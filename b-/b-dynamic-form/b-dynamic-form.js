$(function(){
		
	//функция создания формы из переданных данных
	var createForm = (function(){
		
		/*определяем базовый конструктор полей формы*/			//0_0 сломать этот подход при первой же возможности
		var defaultAttr = (function(){
			var attrArray = {'class':true, 'name':true};
			return function(obj,attr){
				for(i in attr){
					if(i in attrArray){obj[i]=attr[i]};
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
			
			if('label' in obj){
				var label = document.createElement("label");
				label.appendChild(result);
				label.innerHTML+=obj.label;
				result = label;
			}
			
			return result;
		}
		
		//пароль
		funcs['password']=function(obj){
			var result = document.createElement("input");
			result = defaultAttr(result, obj);
			result.type="password";
			if('value' in obj){result.defaultValue=obj.value;}
			
			if('label' in obj){
				var label = document.createElement("label");
				label.appendChild(result);
				label.innerHTML+=obj.label;
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
				label.appendChild(result);
				label.innerHTML+=obj.label;
				result = label;
				if(('value' in obj) && obj['value']=="checked"){result.children[0].checked=true;}
			}
			
			return result;
		}
		
		
		
		
		//и обьявляем конструктор
		var handle = function(obj){
			return (typeof funcs[obj['type']] === 'function')?funcs[obj['type']](obj):false;
		}
		/*определяем базовый конструктор полей формы*/
		
		return function (data){
			if(!data){return false;}
			var result = [];

			//обрабатываем серверный ответ
			var form = $('<form />', {'class':"b-dynamic-form", 'name': data['name'], 'action':data['action'],'method':data['method']});

			for(var arr = data['content'], len = arr.length, i=0; i<len; i++){
				var elem = handle(arr[i]);
				result.push(elem);
			}
			form.append(result);
			
			//куда будет загружен
			var place = data['place']||'.b-main-page__panel';
			$(place).append(form);
			//каким классом оформлен
			if(data['class']){$(form).addClass(data['class']);};
		
			
			
		}//createForm
	})();
	
		
	blib.build("form", createForm); //указываем процаку как обрабатывать такого рода запрос

});