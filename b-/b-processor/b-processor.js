$(function(){
	
	window.bProcessor = (function(){
		
		var self = this;
		var constructors ={};
		
		this.setConstructor = function(key, func){
			constructors[key]=func;
		}
		
		this.applyConstructor = function(key, data){
			constructors[key](data);
		}
		
		return function(dataObject, callback){
				
				if((typeof callback === "function") && (typeof dataObject === "string")){
					self.setConstructor(dataObject, callback);
					return true;
				}
				
				var serializeData = (dataObject)?"?":"";
				for(key in dataObject){
					serializeData+=key+"="+dataObject[key]+"&";
				}
				serializeData = serializeData.substr(0, serializeData.length-1);
				
				$.ajax({
					url:"b-/b-processor/b-processor.php",
					data:serializeData,
					dataType: "json",
					success: function(data){
						if(!data['status']){return false;}
						for(key in data['structure']){
							applyConstructor(key, data['structure'][key]);
						}
					},
					error:function(data){console.log(data);}
				});
		}
	})();

});