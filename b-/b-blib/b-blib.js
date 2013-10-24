window.blib =(function(){
	var storageFlag = ('localStorage' in window && window['localStorage'] !== null)?true:false,
		version     = (storageFlag && localStorage.getItem('version'))?localStorage.getItem('version'):1,
		head        = document.getElementsByTagName('head')[0],
		js          = {},
		css         = {},
		handlerNames = {'onclick':true, 'onmouseover':true, 'onmouseout':true, 'onfocus':true, 'onblur':true, 'onkeyup':true, 'onkeydown':true},
		
		/** clone DOM element */
		clone = function(obj){
			var temp = obj.cloneNode(false);
			for(key in handlerNames){
				if(key in obj){temp[key]=obj[key];};
			}
			
			if(obj.hasChildNodes()){
				var len=obj.childNodes.length;
				for(var i=0;i<len;i++){
					temp.appendChild(clone(obj.childNodes[i]));
				}
			}
			return temp;
		},
		
		/** DOM ready method */
		ready=function(handler){
			var called = false;

			function onReady(){
				if(called){return false;}
				called = true;
				handler();
			}
			
			if(document.readyState=="complete"){return handler()}; //can use rotate window.onload for crosbrowser
			
			if( document.addEventListener ){
				document.addEventListener( "DOMContentLoaded", function(){onReady();}, false );
			}else if( document.attachEvent ){
				if( document.documentElement.doScroll && window == window.top ){
					function tryScroll(){
						if(called){return false;}
						if(!document.body){return false;}
						try{
							document.documentElement.doScroll("left");
							onReady();
						} catch(e) {
							setTimeout(tryScroll, 0);
						}
					}
					tryScroll();
				}
		
				document.attachEvent("onreadystatechange", function(){		
					if(document.readyState === "complete"){
						onReady();
					}
				})
			}
			if (window.addEventListener){
				window.addEventListener('load', onReady, false);
			}else if (window.attachEvent){
				window.attachEvent('onload', onReady);
			}else{
				window.onload=onReady;
			}
		},
		
		/** get element by selector */
		getElement = function(selector){	
			var els = document.getElementsByTagName('*'),
				elsLen=els.length,
				elements=[];
			
			for(var len=selector.length, i=0; i<len; i++){
				if(typeof(selector[i])!='string'){continue;}
				var element=selector[i],
					point = element.substr(0,1),
					pattern = element.substr(1);
			
				if(point=="."){
					for(var j=0;j<elsLen;j++){
						var temp = els[j].className.split(' ');
						for(var tmpLen=temp.length, k=0; k<tmpLen; k++){
							if(temp[k] == pattern){elements.push(els[j]);	break;}
						}
					}
				}else if(point=="#"){
					var temp = document.getElementById(pattern);
					if(temp){elements.push(temp);}
				}else{
					var temp = document.getElementsByTagName(element);
					for(var tagLen=temp.length,j=0; j<tagLen; j++){
						elements.push(temp[j]);
					}
				};
			}
			
			return elements;
		},
		
		/** ajax */
		ajaxDefault={
			'dataType':"text",
			'success':function(){},
			'data':null,
			'type':"POST",
			'url':"/",
			'headers':["X-Requested-With","XMLHttpRequest"]
			
		},
		ajax = function(dataObject) {
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
			if (!xhr) {return alert("Браузер не поддерживает AJAX");}
			
			for(key in ajaxDefault){
				if(!(key in dataObject)){
					dataObject[key]=ajaxDefault[key];
				}
			}

			xhr.onreadystatechange = function(){
				if (xhr.readyState === 4 && xhr.status === 200) {
					var rData = (dataObject['dataType']=="json")?JSON.parse(xhr.responseText):xhr.responseText;
					dataObject['success'](rData);
				}
			}
			
			if(typeof(dataObject['data'])=="object" && dataObject['type']!="DATA"){
				var temp = "";
				for(key in dataObject['data']){
					temp+=key+"="+dataObject['data'][key]+"&";
				}
				dataObject['data'] = temp.substr(0, temp.length-1);
			}
			
			switch(dataObject['type']){
				case "GET":
					dataObject['headers']=["Content-Type", "text/html"];
					dataObject['url']=(dataObject['url'].indexOf("?")!=-1?"&":"?")+dataObject['data'];
					dataObject['data']=null;
				break;
				
				case "POST":
					dataObject['headers']=["Content-Type", "application/x-www-form-urlencoded"];
				break;
				
				case "DATA":
					dataObject['headers']=["Content-Type", "application/json"];
					dataObject['data']=JSON.stringify(dataObject['data']);
					dataObject['type']="POST";
				break;
				
			}

			xhr.open(dataObject['type'], dataObject['url'], true);
			xhr.setRequestHeader(dataObject['headers'][0],dataObject['headers'][1]);
			xhr.send(dataObject['data']);
			
		},
		$ = function(){
			if(!arguments.length){return false;}
			if(typeof(arguments[0]) === "function"){return ready(arguments[0]);}
			
			var result = getElement(arguments);
	
			result.each=function(handler){
				for(var len = this.length, i=0; i<len; i++){
					handler.apply(this[i]);
				}
				return this;
			};
			result.html = function(obj){
				if(typeof(obj)=="undefined")return this[0].innerHTML;
				for(var len = this.length, i=0; i<len; i++){
					this[i].innerHTML = obj;
				}
				return this;
			};			
			result.append = function(obj){
				if(typeof(obj)!="object"){return this;}
				var len = this.length;
	
				if(len==1){
					this[0].appendChild(obj);
					return this;
				}
				
				for(var i=0; i<len; i++){
					var temp =clone(obj);
					this[i].appendChild(temp);
				}
				return this;
			};
		
			return result;
		};
	$['ajax']=ajax;
	/*jQuery simulate $() and $.ajax*/

	/**
	* work with storage(localStorage + object + html) set files
	* [param]{'operation':, 'type':, 'fileName':, 'fileCache':, 'file':}
	*/
	var storageHandler = function(data){
		var operation = data['operation'],
			type = data['type'],
			fileName = data['fileName'],
			fileCache = data['fileCache']||[],
			file = data['file'],
			obj = eval(type),
			html = document.getElementById(fileName);
		
		if(operation=='clear'){
			if(html){html.parentNode.removeChild(html);}
			delete obj[fileName];			
		}else if(operation=='set'){
			if(!head.appendChild(file)){return alert("непрошло"+fileName);}
			obj[fileName]={'version':version, 'list':fileCache};
		}else if(operation=='getAllFiles'){
			var arr=[];
			for(key in obj){
				if(obj[key]['list']){
					arr = arr.concat(obj[key]['list']);
				}else{
					arr.push(key);
				}
			}
			arr.sort();
			var i = arr.length;
			while (i--) {
				if (arr[i] == arr[i-1]){
					arr.splice(i, 1);
				}
			}
			return arr;
		}
		
		if(storageFlag){localStorage.setItem(type, JSON.stringify(obj));}
	},
	
	
	/**
	* include css file
	* @param {string} cssFile	name of css file
	* @param {string}[] inCache	files which contain in it
	* @return {object}			this
	*/
	cssFunction = function(cssFile, inCache){
		cssFile = cssFile.toString();
	
		if((cssFile in css) && (css[cssFile]['version']==version)){ return this; }
	
		for(key in css){
			var innerFiles = (css[key]['list'])?css[key]['list']:[];
			for(var len=innerFiles.length, i=0;i<len;i++){
				if(innerFiles[i]==cssFile){return cssFunction(key, innerFiles);}
			}
		}
		
		storageHandler({'operation':'clear', 'type':'css', 'fileName':cssFile});
		var cssLink  = document.createElement('link');
		cssLink.rel  = 'stylesheet';
		cssLink.type = 'text/css';
		cssLink.href = cssFile+"?new="+version;
		cssLink.media = 'all';
		cssLink.id = cssFile;
		storageHandler({'operation':'set', 'type':'css', 'fileName':cssFile, 'fileCache':inCache, 'file':cssLink});
		
		return this;
	},
	
	/**
	* include js file
	* @param {string} jsFile	name of js file
	* @param {string}[] inCache	files which contain in it
	* @return {object}			this
	*/
	jsFunction = function(jsFile, inCache){
		jsFile = jsFile.toString();

		if(!(jsFile in js)){
			for(key in js){
				var innerFiles = (js[key]['list'])?js[key]['list']:[];
				for(var i=0, len=innerFiles.length;i<len;i++){
					if(innerFiles[i]==jsFile){return jsFunction(key, innerFiles);}
				}
			}
		}
		
		storageHandler({'operation':'clear', 'type':'js', 'fileName':jsFile});
		var scriptLink  = document.createElement('script');
		scriptLink.id = jsFile;
		scriptLink.src = jsFile+"?new="+version;
		scriptLink.type="text/javascript";
		storageHandler({'operation':'set', 'type':'js', 'fileName':jsFile, 'fileCache':inCache, 'file':scriptLink});
		return this;
	},
	
	/**
	* include block (html+css+js in set container || css+js)
	* @param {string} file		path of block without extension
	* @param {string} target	selector where will be load block
	*/
	includeFunction = function(file, target){
		cssFunction(file+'.css');

		if(target){
			var target = $(target);
			$.ajax({
				url:file+'.html?new='+version,
				dataType: "html",
				success: function(data){
					for(key in target){
						target[key].innerHTML=data;
					}
					jsFunction(file+'.js');
				}
			});
		}else{
			jsFunction(file+'.js');
		}
	},
	
	/**
	* method for get version of site and load all stylesheet/script in one file
	* @param {object} dataObject	object of setting
	* {bool} script					for glue javascripts
	* {srting}[]exception			blocks which will not be uploaded
	* {srting}[]order				first turn load sctipts/if 'script' is false, then 'order' set chosen blocks
	*/
	loadFunction = function(dataObject){
		if(!dataObject['order'].length || dataObject['script']){
			/** first include all cache */
			var arr = (storageFlag && localStorage.getItem('css'))?JSON.parse(localStorage.getItem('css')):{};
			for(key in arr){
				cssFunction(key, arr[key]['list']||[]);
			}
			var arr = (storageFlag && localStorage.getItem('js'))?JSON.parse(localStorage.getItem('js')):{};
			for(key in arr){
				jsFunction(key, arr[key]['list']||[]);
			}
		}
		
		/** get files which we have */
		var allCss = storageHandler({'operation':'getAllFiles', 'type':'css'}),
			allJs = storageHandler({'operation':'getAllFiles', 'type':'js'}),
			requestData = {
				'version':version,
				'data':{
					'css':allCss,
					'js':(dataObject['script']?allJs:"orderOnly")
				},
				'exception':(dataObject['exception'] || []),
				'order':(dataObject['order'] ||["b-/b-blib-build/b-blib-build.js", "b-/b-jquery/b-jquery.js", "b-/b-jquery-ui/b-jquery-ui.js"])
			};	

		ready(function(){
			$.ajax({
				url:'b-/b-blib/b-blib.php',
				data:requestData,
				type:"DATA",
				dataType: "json",
				success: function(data){
					if(!data['status']){return false;}
					version = data['version'];
					if(storageFlag){localStorage.setItem("version", JSON.stringify(version));}
					if(data['css']){cssFunction(data['css']['name'], data['css']['list']);}
					if(data['js']){jsFunction(data['js']['name'], data['js']['list']);}
				}
			});
		});//ready
	};
	/** blib functions */
	
	$['css']=cssFunction;
	$['js']=jsFunction;
	$['include']=includeFunction;
	$['vanishLoad']=loadFunction;
	$['clone']=clone;
	$['ready']=ready;
	
	/** public object */
	return $;

})(); 