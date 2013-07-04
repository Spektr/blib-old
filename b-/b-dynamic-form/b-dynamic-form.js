$(function(){
	
	blib.build("form", createForm); //указываем процаку как обрабатывать такого рода запрос
	
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
	
	
	//радио
	funcs['option']=function(obj){
		var result = document.createElement("input");
		result = defaultAttr(result, obj);
		result.type="radio";
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
	
	
	//селект с опциями
	funcs['list']=function(obj){
		var result = document.createElement("select");
		result.multiple='multiple';
		result = defaultAttr(result, obj);

		for(i in obj['options']){
			var sellected = (obj['options'][i]['selected'] == "selected")?true:false;
			var opt = new Option(obj['options'][i]['label'], obj['options'][i]['value'], sellected, false);
			result.options.add(opt);
		}

		if('label' in obj){
			var label = document.createElement("label");
			label.appendChild(result);
			label.innerHTML+=obj.label;
			result = label;
		}
		
		return result;
	};
	
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
		if(data['place']){
			$(data['place']).html(form);
			return false;
		}else{
			return form;
		}
	}//createForm
	
});