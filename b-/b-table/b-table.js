$(document).ready(function(){
	
	/*ОБЪЕКТ ТАБЛИЦА*/
	/*
	// var obj = new bTable("имя блока в котором создается таблица", "имена классов которые оформляют ее"); - создание таблицы
	// obj.setHeader("массив(поле->перевод, поле->перевод, поле->перевод...)"); - установка шапки таблицы
	// obj.setContent("двумерный массив строк со значениями"); - наполнение контента таблицы
	*/
	window.bTable = (function(){
		var self = this;			//родительский обьект
		var table = {};				//блок таблицы
		var header = {};			//массив названий столбцов
		
		return function(block, typeOfTable){
			table = $('<table />', {class:"b-table "+typeOfTable});
			$(block).html(table);

			/*чтоб при прокрутке шапка не улетала*/
			$(block).scroll(hideHeader);
			function hideHeader(){
				var allTd = new Array();
				scrollPosition=$(this).scrollTop();
				
				if(scrollPosition){
					headerWidth=$('.b-table__header').width();
					allTd= $('.b-table__header').find('TD');
					
					$('.b-table__header').css({position: 'absolute', opacity: '0.7', width:headerWidth}); 
					$('.b-table__header').find('TD').css({width:(headerWidth/allTd.length)});
					$('.b-table__header').next().find('TD').css({width:(headerWidth/allTd.length)});
					
				}else{
					$('.b-table__header').css({position: '', opacity: '1'});
				}
			}
			/*чтоб при прокрутке шапка не улетала*/
			
			/*делаем шапочку таблицы*/
			this.setHeader = function(data){
				header = data;
				var th = $('<tr />', {class:"b-table__header"});
				var headerContent = new Array();
				
				for(column in header){
					var td = $('<td />', {text: header[column]});
					headerContent.push(td);
				}
				
				th.append(headerContent);
				table.append(th);
			}
			/*делаем шапочку таблицы*/
			
			/*заполняем контент таблицы*/
			this.setContent = function(data){
				var content = new Array();
				for(row in data){
					var tr = $('<tr />');
					var td = new Array();
					for(col in header){
						td.push($('<td />', {text: data[row][col]}));
					}
					tr.append(td);
					content.push(tr);
				}
				table.append(content);
			}
			/*заполняем контент таблицы*/
		}
	
	})();
	/*ОБЪЕКТ ТАБЛИЦА*/
	
	/*ЭТО ДЛЯ ПРИМЕРА СТРОЧКИ*/
	var obj = new bTable(".table-one", "b-table_classic"); // создание таблицы
	obj.setHeader({'field1':"поле1", 'field2':"поле2", 'field3':"поле3", 'field4':"поле4"}); // установка шапки таблицы
	obj.setContent([{'field1':"1-1", 'field2':"1-2", 'field3':"1-3", 'field4':"1-4"},
					{'field1':"2-1", 'field2':"2-2", 'field3':"2-3", 'field4':"2-4"},
					{'field1':"3-1", 'field2':"3-2", 'field3':"3-3", 'field4':"3-4"},
					{'field1':"3-1", 'field2':"3-2", 'field3':"3-3", 'field4':"3-4"},
					{'field1':"3-1", 'field2':"3-2", 'field3':"3-3", 'field4':"3-4"},
					{'field1':"3-1", 'field2':"3-2", 'field3':"3-3", 'field4':"3-4"},
					{'field1':"3-1", 'field2':"3-2", 'field3':"3-3", 'field4':"3-4"},
					{'field1':"4-1", 'field2':"4-2", 'field3':"4-3", 'field4':"4-4"}]); // наполнение контента таблицы
	/*ЭТО ДЛЯ ПРИМЕРА СТРОЧКИ*/
	
	
});