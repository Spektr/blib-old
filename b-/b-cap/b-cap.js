window.onload=function(){
	var message = document.getElementById("b-cap__puh-message"),
		text = document.getElementById("b-cap__puh-text"),
		button = document.getElementById("b-cap__puh-button"),
		answer = false,
		i=-1,
		say =[
			/*00*/["Привет друг, могу чем помочь?",3,2],
			/*01*/["Я медвед. А ты медвед?",2,2],
			/*02*/["Тогда переходи по ссылкам ниже, удачи.",100,100],
			/*03*/["Искал сайт Vitologi?",4,2],
			/*04*/["А его еще нет. Думаешь зачем же тогда эта страничка?",5,2],
			/*05*/["Здесь мы разместили некоторые нужные нам сервисы. Хочешь знать какие?",6,2],
			/*06*/["<a href='http://sandbox.vitologi.com' target='_self'>sandbox.vitologi.com</a> например, это наша песочница <br /> в ней мы презентуем работы. Хочешь знать больше?",7,1],
			/*07*/["В таких случаях я обычно читаю <a href='http://wikipedia.org' target='_self'>энциклопедию</a> а ты?",1,2]
			
			
		];
	function puh(){
		i=(answer)?say[i][1]:(say[i]?say[i][2]:i+1);
		if(i>=say.lenght){return false;}	
		window.setTimeout(function(){
			text.innerHTML=say[i][0]; message.style.display="block";
			answer=false;
		},3000);
	}
	
	button.onclick=function(){answer=true;}
	message.onclick=function(){this.style.display="none"; puh();}
	puh();
}