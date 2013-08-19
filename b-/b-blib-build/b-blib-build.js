(function(){
	var /** применение особых обработчиков для ответа */
		constructors ={},								//массив конструкторов
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
		/** хранение истории запросов */
		currentIteration = -1;
		iterations =[],                                 //массив запросов и ответов
		getCurrentIteration =function(){
            return currentIteration;
        },
		setCurrentIteration =function(num){
            currentIteration = num;
        },
        setIteration = function(request, answer){		//установка итерации (запроса+ответа)
            iterations[++currentIteration]={'request':request, 'answer':answer};
			iterations.splice(currentIteration+1, iterations.length-currentIteration);
        },
        getIteration = function(index){					//получение итерации
            if(index in iterations){
                return iterations[index];
            }
			return false;
        },
		/** применение отложенных заданий*/
		deferredTask = {},
		applyDeferredTask = function(){
			var i=0, temp;
			for(key in deferredTask){
				if(!blib(key).length){continue;}
				i++;
				temp = (deferredTask[key].block)?applyConstructor(deferredTask[key].block, deferredTask[key]):deferredTask[key];
				if(temp){blib(key).html("").append(temp);}
				delete deferredTask[key];
			}
			if(i>0)applyDeferredTask();			
		},
		/** сборка серверного ответа */
		firstContainer = false,
		currentBlock = "",
		applyBuild = function(data, currentBlock){
			if(!data){return false;}	//выходим если данных нет
			
			//если найден альтернативный застройщик юзаем его 0_0
			if(data['block'] in constructors){
				if(data['container'] && firstContainer){
					deferredTask[data['container']]=data;
					return false;
				};
				return applyConstructor(data['block'], data);
			}
			
			var currentClass = (function(){if(data['block']){return data['block'];}else if(data['elem']){return (currentBlock+"__"+data['elem']);}else{return false;}})(),
				answer = [],
				result = document.createElement(data['tag']||"div");
				
			if(!firstContainer && data['container']){firstContainer=data['container'];}
			if(data['block']){currentBlock=data['block'];}	//забиваем текущий блок
			if(currentClass){result.className = currentClass};	//оформляем классом
			//устанавливаем модификаторы
			if(currentClass && data['mods']){
				for(key in data['mods']){
					result.className +=' '+currentClass+"_"+key+((data['mods'][key])?"_"+data['mods'][key]:"");
				}
			}
			//задаем атрибуты
			if(data['attrs']){
				for(key in data['attrs']){
					var attr = data['attrs'][key],
						type = typeof(attr),
						temp;
					
					if(type=="object"){
						temp = JSON.stringify(attr);
					}else if(type!="string"){
						continue;
					}else if(attr.substr(0, 8)=="function"){
						result[key] = eval('('+attr+')');
						continue;
					}else{
						temp = attr;
					}
					
					if(key=="className"){
						result[key] += " "+temp;
					}else if(result.setAttribute){
						result.setAttribute(key, temp);
					}else{
						result[key] = temp;
					}

				}
			}
			//проверяем есть ли вложенность и рекурсивно обрабатываем если есть
			switch(typeof(data['content'])){
				case "object":
					for(key in data['content']){answer.push(applyBuild(data['content'][key],currentBlock));}
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
					firstContainer = false;
				}
			}else if(data['container']){
				deferredTask[data['container']]=result;
				return false;
			}else{
				return result;
			}
			
		},
		/** колбаки после получения ответа и перестройки дерева */
		readyFunctions = [];
		ready = function(obj){
			if(typeof(obj)=="function"){readyFunctions.push(obj);return true;}
			
			for(var len = readyFunctions.length, i=0; i<len; i++){
				readyFunctions[i](obj);
			}
			
		};

	//строим при ответе сервера или задаем обработчик
	var build = function(dataObject, callback){
		
		if((typeof callback === "function") && (typeof dataObject === "string")){
			setConstructor(dataObject, callback);
			return true;
		}
		
		var startDataObject=JSON.parse(JSON.stringify(dataObject)),
			get = "";
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
                setIteration(startDataObject, data);
				applyBuild(data);
				ready(data);
			}
		});
	};
	
	//строим по входящим данным
	build.handler = applyBuild;
	//постобработка
	build['ready'] = ready;
	build['getCurrentIteration'] = getCurrentIteration;
	build['setCurrentIteration'] = setCurrentIteration;
	build['setIteration'] = setIteration;
	build['getIteration'] = getIteration;
	build['applyConstructor'] = applyConstructor;
	
	window.blib.build = build;
	
})();