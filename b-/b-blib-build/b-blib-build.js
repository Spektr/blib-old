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
		curentBlock = "",
		applyBuild = function(data){
			if(!data){return false;}	//выходим если данных нет
			if(data['block'] in constructors){return applyConstructor(data['block'], data);}	//если найден альтернативный застройщик юзаем его
			var curentClass = (function(){if(data['block']){return data['block'];}else if(data['elem']){return (curentBlock+"__"+data['elem']);}else{return false;}})(),
				answer = [],
				result = document.createElement(data['tag']||"div");
			if(data['block']){curentBlock=data['block'];}	//забиваем текущий блок
			if(curentClass){result.className = curentClass};	//оформляем классом
			
			//устанавливаем модификаторы
			if(curentClass && data['mods']){
				for(key in mods){
					result.className +=" "+curentClass+"_"+key+((data['mods'][key])?"_"+data['mods'][key]:"");
				}
			}
			
			//задаем атрибуты
			if(data['attrs']){
				for(key in data['attrs']){
					result[key] = (typeof(data['attrs'][key])=="string")?data['attrs'][key]:(JSON.strnigify(data['attrs'][key]));
				}
			}
			
			//проверяем есть ли вложенность и рекурсивно обрабатываем если есть
			switch(typeof(data['content'])){
				case "object":
					for(key in data['content']){answer.push(applyBuild(data['content'][key]));}
				break;
				default:
					answer.push(data['content']);
				break;
			}
			
			//заполняем текущий элемент вложенными в него
			for(i in answer){if(answer[i]["innerHTML"]){result.appendChild(answer[i]);}else{ result.innerHTML+=answer[i];}};
			
			
			//если есть контейнер то добавляем в него
			if(data['container']){
				blib(data['container']).html("").append(result);
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
		var serializeData = "";
		for(key in dataObject){
			serializeData+=key+"="+dataObject[key]+"&";
		}
		serializeData = serializeData.substr(0, serializeData.length-1);
		blib.ajax({
			url:"b-/b-blib-build/b-blib-build.php",
			data:serializeData,
			dataType: "json",
			success: function(data){
				console.log(data);
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

//added dynamic blocks
blib.include("b-/b-dynamic-form/b-dynamic-form");
blib.include("b-/b-dynamic-table/b-dynamic-table");
blib.include("b-/b-dynamic-menu/b-dynamic-menu");
blib.include("b-/b-dynamic-history/b-dynamic-history");
blib.include("b-/b-dynamic-files/b-dynamic-files");
blib.include("b-/b-dynamic-skeleton/b-dynamic-skeleton");
