(function(){
	var constructors ={},								//массив конструкторов
		setConstructor = function(key, func){			//установка конструктора
			constructors[key]=func;
		},
		applyConstructor = function(key, data){			//применение конструктора
			if(key in constructors){
				return constructors[key](data);
			}else{
				console.log(key+" is not defined");
			}
		},
		firstContainer = false,
		curentBlock = "",
		deferredTask = {},
		applyDeferredTask = function(){
			var temp = [];
			for(key in deferredTask){temp.push(key);}
			if(!blib.apply(this,temp).length){return true;}
			for(key in deferredTask){
				if(!blib(key).length){continue;}
				blib(key).html("").append(deferredTask[key]);
				delete deferredTask[key];
			}
			applyDeferredTask();
		},		
		applyBuild = function(data, curentBlock){
			if(!data){return false;}	//выходим если данных нет
			
			//если найден альтернативный застройщик юзаем его
			if(data['block'] in constructors){
				var temp=applyConstructor(data['block'], data);
				if(temp && data['container']){
					deferredTask[data['container']]=temp;
					temp=false;
				};
				return temp;
			}
			
			var curentClass = (function(){if(data['block']){return data['block'];}else if(data['elem']){return (curentBlock+"__"+data['elem']);}else{return false;}})(),
				answer = [],
				result = document.createElement(data['tag']||"div");
				
			if(!firstContainer && data['container']){firstContainer=data['container'];}
			if(data['block']){curentBlock=data['block'];}	//забиваем текущий блок
			if(curentClass){result.className = curentClass};	//оформляем классом
			//устанавливаем модификаторы
			if(curentClass && data['mods']){
				for(key in data['mods']){
					result.className +=' '+curentClass+"_"+key+((data['mods'][key])?"_"+data['mods'][key]:"");
				}
			}
			//задаем атрибуты
			if(data['attrs']){
				for(key in data['attrs']){
					if(typeof(data['attrs'][key])=="string"){
						if(data['attrs'][key].indexOf("function")!=0){
							result[key] += " "+data['attrs'][key];
						}else{
							result[key] = eval('('+data['attrs'][key]+')');
						}
					}else{
						result[key] = JSON.stringify(data['attrs'][key]);
					}
				}
			}
			//проверяем есть ли вложенность и рекурсивно обрабатываем если есть
			switch(typeof(data['content'])){
				case "object":
					for(key in data['content']){answer.push(applyBuild(data['content'][key],curentBlock));}
				break;
				case "string":
					answer.push(data['content']);
				break;
			}
			
			//заполняем текущий элемент вложенными в него
			for(i in answer){if(typeof(answer[i])=="object"){result.appendChild(answer[i]);}else if(answer[i]){ result.innerHTML+=answer[i];}};
			
			
			//если есть контейнер то добавляем в него
			if(blib(data['container']).length){
				blib(data['container']).html("").append(result);
				if(data['container'] == firstContainer){
					applyDeferredTask();
				}
			}else if(data['container']){
				deferredTask[data['container']]=result;
				return false;
			}else{
				return result;
			}
			
		};

	//строим при ответе сервера
	window.blib.build = function(dataObject, callback){
		
		if((typeof callback === "function") && (typeof dataObject === "string")){
			setConstructor(dataObject, callback);
			return true;
		}
		
		var get = "";
		if(dataObject['get']){
			get ="?";
			for(key in dataObject['get']){
				get+=key+"="+dataObject['get'][key]+"&";
			}
			get = get.substr(0, get.length-1);
			delete dataObject['get'];
		}

		blib.ajax({
			url:"b-/b-blib-build/b-blib-build.php"+get,
			data:dataObject,
			dataType: "json",
			success: function(data){
				/*хрень для истории*/
				var historyData = {'request':dataObject, 'answer':data};
				applyConstructor("dynamicHistory", historyData);
				/*хрень для истории*/
				applyBuild(data);
			}
		});
	};
	
	//строим по входящим данным
	window.blib.build.handler = applyBuild;
	
})(); 