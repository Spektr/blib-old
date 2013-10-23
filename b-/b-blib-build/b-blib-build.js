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
            if(typeof(request)!='object'){return (iterations[request]=answer);}
			iterations[++currentIteration]={'request':request, 'answer':answer};
			iterations.splice(currentIteration+1, iterations.length-currentIteration);
        },
        getIteration = function(index){					//получение итерации
			if(typeof(index)=='undefined'){return iterations;}
			if(index in iterations){
                return iterations[index];
            }
			return false;
        },
		/** применение отложенных заданий*/
		deferredTask = {},
		applyDeferredTask = function(){
			var set=false;
			for(key in deferredTask){
				if(!blib(key).length){continue;}
				set=true;
				var tObj = deferredTask[key]['block'],
					tKey = key,
					tData = (tObj)?JSON.parse(JSON.stringify(deferredTask[key])):deferredTask[key], /* 0_0 риск удалить дом элемент*/
					temp;
					
				delete deferredTask[key];
				temp = (tObj)?applyConstructor(tData.block, tData):tData; 
				if(temp){blib(key).html("").append(temp);}
			}
			if(set){applyDeferredTask()};
			deferredTask={};
		},
		/** сборка серверного ответа */
		applyBuild = function(data, currentBlock){
			if(!data){return false;}
			
			
			//[первый в ответе, текущий блок, имя обьекта, ДОМ-результат, есть ли контейнер]
			var parent = (!currentBlock)?true:false,
				currentBlock = (data['block'])?data['block']:(currentBlock?currentBlock:"noname"),
				currentClass = (data['block'])?data['block']:((data['elem'])?(currentBlock+"__"+data['elem']):false),
				result = document.createElement(data['tag']||"div"),
				container = (data['container'])?(blib(data['container']).length>0):false;
			
			

			//если найден альтернативный застройщик юзаем его
			if(currentClass in constructors){
				data['block']=currentClass;
				if(data['container']){
					deferredTask[data['container']]=data;
					return (parent)?applyDeferredTask():false;
				};
				return applyConstructor(currentClass, data);
			}
			//чистим контейнер, т.к. если это не альтернативный обработчик, нужно почистить
			if(container){blib(data['container']).html("");}
				
			//оформляем классом
			if(currentClass){result.className = currentClass};
			//устанавливаем модификаторы
			if(currentClass && data['mods']){
				for(key in data['mods']){
					result.className +=' '+currentClass+"_"+key+((data['mods'][key])?"_"+data['mods'][key]:"");
				}
			}
			//задаем атрибуты
			if(data['attrs']){
				for(key in data['attrs']){
					var attr = data['attrs'][key], temp;
					
					switch(typeof(attr)){
						case "object":
							temp = JSON.stringify(attr);
						break;
						case "function":
							result[key]=attr;
							continue;
						break;
						default:
							temp = attr;
						break;
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
					for(key in data['content']){
						var temp = applyBuild(data['content'][key],currentBlock);
						if(!temp)continue;
						if(typeof(temp)=="object"){result.appendChild(temp);}else{result.innerHTML+=temp;}
					}
				break;
				case "string":
					result.innerHTML+=data['content'];
				break;
			}
			
			
			

			//если есть контейнер то добавляем в него
			if(container){
				blib(data['container']).html("").append(result);
				applyDeferredTask();
			}else if(data['container']){
				deferredTask[data['container']]=result;
				return false;
			}else{
				if(parent && !data['container']){applyDeferredTask();}
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
			get = "",
			ajaxType="POST";
			
		if(dataObject['get']){
			get ="?";
			for(key in dataObject['get']){
				get+=key+"="+dataObject['get'][key]+"&";
			}
			get = get.substr(0, get.length-1);
			delete dataObject['get'];
		}
		
		if(dataObject['data']){
			dataObject=dataObject['data'];
			ajaxType="DATA";
		}
		
		
		blib.ajax({
			url:"b-/b-blib-build/b-blib-build.php"+get,
			type:ajaxType,
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
	
	window.blib.build = build;
	
})(); 

