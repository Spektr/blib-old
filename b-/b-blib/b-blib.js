window.blib =(function(){
	var self = this;
	var head = document.getElementsByTagName('head')[0];
	var cssCache = new Array();
	var jsCache = new Array();
    var css = new Array();
	var js = new Array();
	
	return {
		//include css file
		'css': function(cssFile, inCache){
		
            cssFile = cssFile.toString();
            for(key in css){
                if(cssFile==css[key]){return true;}
            }
			var link  = document.createElement('link');
			link.rel  = 'stylesheet';
			link.type = 'text/css';
			link.href = cssFile;
			link.media = 'all';
			if(head.appendChild(link)){
				if(inCache){
					cssCache.push(cssFile);
					css=css.concat(inCache);
				}else{
					css.push(cssFile);
				}
				
				if('localStorage' in window && window['localStorage'] !== null){
					localStorage.setItem("cssCache", JSON.stringify(cssCache));
					localStorage.setItem("css", JSON.stringify(css));
				}
			}
			return true;
		},
		
		//include js file
		'js': function(jsFile, inCache){
			jsFile = jsFile.toString();
			for(key in js){
				if(jsFile==js[key]){return true;}
			}
			var script  = document.createElement('script');
			script.src = jsFile;
			script.type="text/javascript";
			if(head.appendChild(script)){
				if(inCache){
					jsCache.push(jsFile);
					js=js.concat(inCache);
				}else{
					js.push(jsFile);
				}
							
				if('localStorage' in window && window['localStorage'] !== null){
					localStorage.setItem("jsCache", JSON.stringify(jsCache));
					localStorage.setItem("js", JSON.stringify(js));
				}
			}
			return true;
		},

        //include block (file - block's url [, target] - where it's plased) //0_0 create native realisation(whithout jquery) + test + cache
		'include':function(file, target){
			var obj = this;
			this.css(file+'.css');
			if(!window.jQuery){	this.js('b-/b-jquery/b-jquery.js');}
			if(target){
				var target = $(target);
				target.load(file+'.html', function(){ obj.js(file+'.js');});
			}else{
				document.addEventListener("DOMContentLoaded", function(){ obj.js(file+'.js');}, false );
			}
		},
		
		'checkCache':function(){
			var variable = true;
		},
		
		//0_0 create native realisation(whithout jquery)
		'vanishLoad':function(){
			if(!window.jQuery){	this.js('b-/b-jquery/b-jquery.js');}
			var obj = this;
			
			//забиваем имеющиеся кеши
			if('localStorage' in window && window['localStorage'] !== null){

				var arr = JSON.parse(localStorage.getItem('cssCache'));
				for(key in arr){
					obj.css(arr[key], []);
				}
				css = JSON.parse(localStorage.getItem('css'))||[];

				var arr = JSON.parse(localStorage.getItem('jsCache'));
				//console.log(arr);
				for(key in arr){
					obj.js(arr[key], []);
				}
				js = JSON.parse(localStorage.getItem('js'))||[];

			}
			
			window.onload = function(){
				var requestData ={'css':css, 'js':js};
				console.log(requestData);

				$.ajax({
					url:'/b-/b-blib/b-blib.php',
					data:"data="+JSON.stringify(requestData),
					dataType: "json",
					success: function(data){
						if(!data['status']){return false;}
						console.log(data);
						obj.css(data['css']['path'], data['css']['list']);
						obj.js(data['js']['path'], data['js']['list']);
					}
				});
			}
		}
		
	};
})(); 