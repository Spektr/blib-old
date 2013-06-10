window.blib =(function(){
	var self = this;
	var head = document.getElementsByTagName('head')[0];
	var version = "";
    var css = new Array();
	var js = new Array();
	
	return {
		//include css file
		'css': function(cssFile){
            cssFile = cssFile.toString();
            for(key in css){
                if(cssFile==css[key]){return true;}
            }
			var link  = document.createElement('link');
			link.rel  = 'stylesheet';
			link.type = 'text/css';
			link.href = cssFile;
			link.media = 'all';
			if(head.appendChild(link)){css.push(cssFile);};
			return true;
		},
		
		//include js file
		'js': function(jsFile){
			jsFile = jsFile.toString();
			for(key in js){
				if(jsFile==js[key]){return true;}
			}
			var script  = document.createElement('script');
			script.src = jsFile;
			script.type="text/javascript";
			if(head.appendChild(script)){js.push(jsFile);};
			return true;
		},

        //include block (file - block's url [, target] - where it's plased) //0_0 create native realisation(whithout jquery) + test + cache
		'include':function(file, target){
			var obj = this;
			this.css(file+'.css');
			if(!window.jQuery){	this.js('/b-/b-jquery/b-jquery.js');}
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
		
		'vanishLoad':function(){
			var obj = this;
			window.onload = function(){
				var requestData ={'css':css, 'js':js};
				$.ajax({
					url:'/b-/b-blib/b-blib.php',
					data:"data="+JSON.stringify(requestData),
					dataType: "html",
					success: function(data){
						console.log(data);
						if(!data['status']){return false;}
						obj.css('/b-/b-blib/__cache/'+data['css']);
						obj.js('/b-/b-blib/__cache/'+data['js']);
					}
				});
			}
		}
		
	};
})(); 