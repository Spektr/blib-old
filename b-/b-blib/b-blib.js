window.blib =(function(){
	var self = this;
	var storageFlag = ('localStorage' in window && window['localStorage'] !== null)?true:false;
	var head = document.getElementsByTagName('head')[0];
	var css = {};
	var js = {};
	var version = (storageFlag)?localStorage.getItem('version'):1;		//(0_0 NaN .. 1)curent version, get from server (seconds to last modified .ini file)
	var forceLoad = "";//?new="+version;	//postfix for force send request to server -> then it will answer 304(if file dont change) or 200 -> we set this file current version 
	
	/*jQuery simulate $() and $.ajax*/
	var $ = function(){		
		var els = document.getElementsByTagName('*');
		var elsLen=els.length;
		
		var elements=new Array();
		for(var i=0;i<arguments.length;i++){
			var element=arguments[i];
			
			if(typeof element=='string' && element.substr(0,1)=="."){
				var pattern=new RegExp(element.substr(1));
				for(i=0;i<elsLen;i++){
					if(pattern.test(els[i].className)){
						elements.push(els[i]);
					}
				}
				
			}else if(typeof element=='string'){
				element=document.getElementById(element)
			};

			if(arguments.length==1)return (elements)?elements:element;
			elements.push(element);
		}
		return elements;
	};
	
	var ajax = function(dataObject) {
		var xhr;
		if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
		else if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e){}
			try {
				xhr = new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e){}
		}

		if (xhr) {
			xhr.onreadystatechange = function(){
				if (xhr.readyState === 4 && xhr.status === 200) {
					var rData = (dataObject['dataType']=="json")?JSON.parse(xhr.responseText):xhr.responseText;
					dataObject['success'](rData);
				}
			}
			
			if(dataObject['dataType']!="html"){
				xhr.open("POST", dataObject['url'], true);
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xhr.send(dataObject['data']);
			}else{
				xhr.open("GET", dataObject['url'], true);
				xhr.setRequestHeader("Content-Type", "text/html");
				xhr.send(dataObject['data']);
			}
	
		} else {
			alert("Браузер не поддерживает AJAX");
		}
	}
	$.ajax = ajax;
	/*jQuery simulate $() and $.ajax*/
	
	/*blib functions*/
	var getFiles = function(obj){
		var arr=[];
		for(key in obj){
			if(obj[key]['list']){
				arr = arr.concat(obj[key]['list']);
			}else{
				arr.push(key);
			}
		}
		return arr;
	}
	/*blib functions*/

	return {
		//include css file
		'css': function(cssFile, inCache){
			cssFile = cssFile.toString();
		
			if((cssFile in css) && (css[cssFile]['version']==version)){
				return this;
			}else{
				for(key in css){
					var innerFiles = (css[key]['list'])?css[key]['list']:[];
					for(var i=0, len=innerFiles.length;i<len;i++){
						if(innerFiles[i]==cssFile){return this.css(key, innerFiles);}
					}
				}
				
				forceLoad="?new="+version;
				delete css[cssFile];
				var addededStyle = document.getElementById(cssFile);
				if(addededStyle){						
					addededStyle.parentNode.removeChild(addededStyle);
				}
				
			}

			var link  = document.createElement('link');
			link.rel  = 'stylesheet';
			link.type = 'text/css';
			link.href = cssFile+forceLoad;
			link.media = 'all';
			link.id = cssFile;
			if(head.appendChild(link)){
				css[cssFile]={};
				css[cssFile]['version']=version;
				if(inCache && inCache.length){
					css[cssFile]['list']=inCache;
				}

				if(storageFlag){
					localStorage.setItem("css", JSON.stringify(css));
				}
			}
			return this;
		},
		
		//include js file
		'js': function(jsFile, inCache){
			jsFile = jsFile.toString();
			
			console.log("-----start----");
			console.log(jsFile);

			
			if(jsFile in js){
				
			//console.log(version);
			console.log("-----finish----");
				
				forceLoad=(js[jsFile]['version']==version)?"":"?new="+version;
				delete js[jsFile];
				var addededScript = document.getElementById(jsFile);
				if(addededScript){						
					addededScript.parentNode.removeChild(addededScript);
				}
			}else{
				for(key in js){
					var innerFiles = (js[key]['list'])?js[key]['list']:[];
					for(var i=0, len=innerFiles.length;i<len;i++){
						if(innerFiles[i]==jsFile){return this.js(key, innerFiles);}
					}
				}
			}

			var script  = document.createElement('script');
			script.id = jsFile;
			script.src = jsFile+forceLoad;
			script.type="text/javascript";
			if(head.appendChild(script)){
				js[jsFile]={};
				js[jsFile]['version']=version;
				if(inCache && inCache.length){
					js[jsFile]['list']=inCache;
				}

				if(storageFlag){
					localStorage.setItem("js", JSON.stringify(js));
				}
			}
			return this;
		},

        //include block (file - block's url [, target] - where it's plased)
		'include':function(file, target){
			var obj = this;
			this.css(file+'.css');

			if(target){
				var target = $(target);
				$.ajax({
					url:file+'.html',
                    dataType: "html",
					success: function(data){
						for(key in target){
							target[key].innerHTML=data;
						}
						obj.js(file+'.js');
					}
				});
			}else{
				obj.js(file+'.js');
			}
		},
		
		
		/*
		//method for load all stylesheet/script in one file
		//[param]{'script':(bool) - for glue javascripts, 'exception':(array) - blocks which will not be uploaded, 'order': (array of paths) - first turn load sctipts/if 'script' is false, then 'order' set chosen blocks }
		//
		*/
		'vanishLoad':function(dataObject){
			var obj = this;
			document.addEventListener("DOMContentLoaded", function(){
				//забиваем имеющиеся кеши
				if(storageFlag){

					var arr = JSON.parse(localStorage.getItem('css'));
					var allCss = (arr)?getFiles(arr):[];
					for(key in arr){
						obj.css(key, arr[key]['list']||[]);
					}

					var arr = JSON.parse(localStorage.getItem('js'));
					var allJs =  (arr)?getFiles(arr):[];
					for(key in arr){
						obj.js(key, arr[key]['list']||[]);
					}
				}
				

				var requestData = "data="+JSON.stringify((dataObject['script']?{'css':allCss, 'js':allJs}:{'css':allCss, 'js':"orderOnly"}));
				requestData += (dataObject['exception'])?"&exception="+JSON.stringify(dataObject['exception']):"&exception="+JSON.stringify([]);
				requestData += (dataObject['order'])?"&order="+JSON.stringify(dataObject['order']):"&order="+JSON.stringify(["b-/b-jquery/b-jquery.js", "b-/b-jquery-ui/b-jquery-ui.js"]);
				
				console.log(requestData);
				
				$.ajax({
					url:'b-/b-blib/b-blib.php',
					data:requestData,
					dataType: "json",
					success: function(data){
						console.log(data);
						if(!data['status']){return false;}
						version = data['version'];
						if(storageFlag){localStorage.setItem("version", JSON.stringify(version));}
						
						if(data['css']){obj.css(data['css']['name'], data['css']['list']);}
						if(data['js']){obj.js(data['js']['name'], data['js']['list']);}
					}
				});
				
			}, false );//DOMContentLoaded
		}//vanishLoad()
		
	};//return
})(); 