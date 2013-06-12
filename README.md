<center>
    <a href="http://blib.xe0.ru" target="_blanck" style="text-decoration:none; float:left;">
        <img src="http://blib.xe0.ru/index_logo.png">
    </a>
    <br />
    <strong>
        Библиотека автономных и полуавтономных блоков, которые можно впилить в любой интерфейс.
    </strong>
</center>
<div style="width:100%; border:1px solid black;"></div>
<ul>
    <li>Есть как визуальные блоки для оформления чего-либо (например блок автогенерации таблицы из json-ответа сервера),</li>
    <li>так и блоки логики (b-blib - блок для подключения блоков)</li>
</ul>

<table>
    <tr>
        <th colspan="2">Функционал b-blib</th>
    </tr>
    <tr>
        <th>метод</th>
        <th>описание</th>
    </tr>
    <tr>
        <td rowspan="2">blib.include(file [,target])</td>
        <td>основной метод подключения блока (css - сразу, шаблон - если есть, js - после загрузки дом дерева )</td>
    </tr>
    <tr>
        <td>
            file - путь до блока,<br />
            target - селектор контейнера, куда будет загружен блок
        </td>
    </tr>
    <tr>
        <td rowspan="2">blib.css(cssFile [,inCache])</td>
        <td>подрубить таблицу стилей к шапке</td>
    </tr>
    <tr>
        <td>
            cssFile - путь до css файла,<br />
            inCache - массив имен стилевых таблиц содержащихся в подключенном css(в случае если подключается кэш а не стили для отдельного блока)
        </td>
    </tr>
    <tr>
        <td rowspan="2">blib.js(jsFile [,inCache])</td>
        <td>подрубить файлы скриптов к шапке</td>
    </tr>
    <tr>
        <td>
            jsFile - путь до js файла,<br />
            inCache - массив имен скриптов содержащихся в подключенном js(в случае если подключается кэш а не скрипты для отдельного блока)
        </td>
    </tr>
    <tr><th colspan="2">дополнительные методы</th></tr>
    <tr></tr>
    <tr>
       <td rowspan="2">blib.vanishLoad()</td>
       <td>(в разработке) подгрузка оптимизированного кода</td>
    </tr>
    <tr>
       <td>
           [особенности]
       </td>
    </tr>
    <tr>
        <td rowspan="2">blib.checkCache()</td>
        <td>(в разработке) проверка кэша</td>
    </tr>
    <tr>
        <td>
            [особенности]
        </td>
    </tr>
</table>
