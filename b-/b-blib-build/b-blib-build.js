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
		console.log(iterations);
	}
	var clearIteration = function(index){
		iterations = iterations.slice(0, index);
		console.log(iterations);
		
		var data = iterations[index-1]['answer'];
		if(!data['status']){return false;}
		for(key in data['structure']){
			applyConstructor(key, data['structure'][key]);
		}
		
	}
		
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
		$.ajax({
			url:"b-/b-blib-build/b-blib-build.php",
			data:serializeData,
			dataType: "json",
			success: function(data){
				if(!data['status']){return false;}
				satIteration(dataObject, data);
				applyConstructor("requestHistory", data['message']);
				for(key in data['structure']){
					applyConstructor(key, data['structure'][key]);
				}
			}
		});
	};
	
	window.blib.build.clearHistory = function(index){
		clearIteration(index);
	};
	
})(); 

