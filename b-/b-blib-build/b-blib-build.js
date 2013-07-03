(function(){
    var constructors ={};
	var iterations =[];
    var setConstructor = function(key, func){
        constructors[key]=func;
    }
    var applyConstructor = function(key, data){
        (key in constructors)?constructors[key](data):console.log(key+" is not defined");
    }
	var satIteration = function(request, answer){
		var index = iterations.length;
		iterations[index]=[];
		iterations[index]['request'] = request;
		iterations[index]['answer'] = answer;
	}
	var clearIteration = function(index){
		iterations = iterations.slice(0, index);
		
		var data = iterations[index-1]['answer'];
		if(!data['status']){return false;}
		for(key in data['structure']){
			applyConstructor(data['structure'][key]['type'], data['structure'][key]);
		}
		
	}
		
	window.blib.build = function(dataObject, callback){
		/*хрень для истории*/
		if(dataObject['title']){
			var historyName = dataObject['title'];
			delete dataObject['title'];
		}else{
			var historyName = "X";
		}
		/*хрень для истории*/
		
		if((typeof callback === "function") && (typeof dataObject === "string")){
			setConstructor(dataObject, callback);
			return true;
		}
		var serializeData = "";
		for(key in dataObject){
			serializeData+=key+"="+dataObject[key]+"&";
		}
		serializeData = serializeData.substr(0, serializeData.length-1);
		$.ajax({
			url:"b-/b-blib-build/b-blib-build.php",
			data:serializeData,
			dataType: "json",
			success: function(data){
				if(!data['status']){return false;}
				satIteration(dataObject, data);
				applyConstructor("requestHistory", historyName); /*хрень для истории*/
				for(key in data['structure']){
					applyConstructor(data['structure'][key]['type'], data['structure'][key]);
				}
			}
		});
	};
	
	window.blib.build.clearHistory = function(index){
		clearIteration(index);
	};
	
})(); 

//added dynamic blocks
blib.include("b-/b-dynamic-form/b-dynamic-form");
