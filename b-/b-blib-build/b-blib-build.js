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
		applyBuild = function(data){					//построение дом дерева из ответа
			if(!data){return false;}
			var container = (data['container'])?blib(data['container']):blib('body');
			var answer =[];
			for(key in data['structure']){
				answer.push(applyConstructor(data['structure'][key]['type'], data['structure'][key]));
			}
			var result = [];
			console.log(answer);
			for(i in answer){if(answer[i]){result[i]=answer[i];}};
			if(result.length>0){
				container.html("");
				
			};
			for(i in result){container.append(result[i][0]);}
			
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
