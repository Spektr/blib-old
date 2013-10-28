$(function(){
    function addBlock(target/*name of new block*/,
                            file/*where is it place*/,
                            title/*block's title*/,
                            note/*block's note*/,
                            techno/*array of technology*/){

        var block = $('<div />', {'class': target+" b-blib__block"});
        var title = $('<div />', {'class': "b-blib__block-title", 'text': title});

        var technology = [];
        for(var key in techno){
            technology.push($('<div />', {'class':"b-blib__block-technology b-blib__block-technology_"+techno[key]}));
        }

        var content = $('<div />', {'class': "b-blib__block-content"});
        var innerCode = $('<pre />', {'class': "b-blib__block-code"});
        content.load(file, function(){
            innerCode.text(content[0].innerHTML);
            title.on('click', function(){
                $(this).parent().find('.b-blib__block-code').toggle(400);
            });
            blib.include(file.substr(0,file.length-5));
        });
        var note = $('<div />', {'class': "b-blib__block-note", 'text': note});

        innerCode.hide();
        block.append(technology, title, content, note, innerCode);
        $('.b-blib').append(block);

    };
	
	$('.b-blib').html('<div  class="b-blib__header">Библиотека функциональных блоков и элементов интерфейса</div>');
    addBlock("b-blib__train", "b-/b-train/b-train.html", "Подложка для иконок", "Фон в виде рисунка в основе лежит блок с дублирующимся бекграундом и псевдоклассами before и after для прорисовки боков",["jquery", "css3"]);
    addBlock("b-blib__popup-menu", "p-/b-popup-menu/b-popup-menu.html", "Комбинация блоков всплывающего окна и меню", "Создание анимации используя плавную замену классов",["jq-ui", "jquery", "css3"]);
	addBlock("b-blib__table", "b-/b-table/b-table.html", "Блок динамической генерации таблицы", "Описание",["jquery"]);
	addBlock("b-blib__pic", "b-/b-pic/b-pic.html", "Картинки", "Описание",["css3"]);
	addBlock("b-blib__cap", "b-/b-cap/b-cap.html", "Болталка", "Описание",["css3"]);
	

});