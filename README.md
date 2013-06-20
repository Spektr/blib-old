<table border=0>
    <tr>
        <td>
            <a href="http://blib.xe0.ru" target="_blanck" style="text-decoration:none;">
               <img src="http://blib.xe0.ru/index_logo.png" />
            </a>
        </td>
        <td>
            <strong>
                Библиотека автономных и полуавтономных блоков, которые можно впилить в любой интерфейс.
            </strong>
        </td>
    </tr>
</table>
<hr />

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
		<td rowspan="2">blib.vanishLoad({'script':(bool), 'exception':(array), 'order': (array)})</td>
		<td>
			Метод для склейки и кеширования файлов (стилей и скриптов) решение о подгрузке принимается на основе данных localStotage
		</td>
    </tr>
    <tr>
       <td>
        {
		 script - грузить ли сразу все скрипты или только перечисленные в order,<br />
		 exception - блоки которые надо игнорировать при сборке кеша (не относящиеся к методологии написания сайта),<br />
		 order - порядок склейки блоков (напр. jQuery надо подрубать раньше jQuery-ui) если script=false, то это единственные блоки для кэширования
		}
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
