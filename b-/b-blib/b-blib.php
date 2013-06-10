<?php 

$code = "";
$list =scan('..\..','*.css',$code);
setCache($code, $list, '.css');

getCache(json_decode($_REQUEST['data']));






/*
//выплевываем кэш по запросу от клиента
//[param] $types - расширения файлов которые пользователь ожидает (css, js)
//[answer] пока нет
*/
function getCache($types){
	
	//$ini = @file_get_contents("__cache/b-cache.ini");
	//$ini = json_decode($ini);
	
	var_dump($types);
	$d = array();
	$arr = opendir("__cache");
	while($v = readdir($arr)){
		if($v == '.' or $v == '..') continue;
		foreach($types as $key =>$value){
			if(fnmatch("*.".$key, $v)){
				$answer['status']=true;
				$answer[$key]= $v;
			}
		}
	}
	
	echo json_encode($answer);
	exit;
}

/*
//сканирует все директории и склеивает весь код указанного типа файлов
//[param] $dir-директория , $mask-какие файлы склеивать, $code - куда поместить склееянный код
//[answer] массив имен склеянных файлов
*/
function scan($dir, $mask, &$code){
	$d = array();
	$arr = opendir($dir);
	while($v = readdir($arr)){
		if($v == '.' or $v == '..' or $v == 'b-blib') continue;
		if(!is_dir($dir.DIRECTORY_SEPARATOR.$v) && fnmatch($mask, $v)){
			$d[] = substr($dir.DIRECTORY_SEPARATOR.$v, 6);
			$code .= @file_get_contents($dir.DIRECTORY_SEPARATOR.$v);
		}elseif(is_dir($dir.DIRECTORY_SEPARATOR.$v)){
			$d = array_merge($d, scan($dir.DIRECTORY_SEPARATOR.$v, $mask, $code));
		}
	}
	return $d;
}

/*
//устанавливает кэш
//[param] $code - код кешируемого файла, $list - список склеенных файлов, $extension - расширения файлов
//[answer] пока нет
*/
function setCache($code, $list, $extension){
	sort($list);
	$name = md5(implode("",$list));
	$name .=$extension;
	if(file_exists("__cache/$name"))return false;

	$fp = @fopen ("__cache/$name", "w");
	@fwrite ($fp, $code);
	@fclose ($fp);
	
	$ini = @file_get_contents("__cache/b-cache.ini");
	$ini = json_decode($ini);
	$ini[] =array($name => $list);
	$ini = json_encode($ini);
	$fp = @fopen ("__cache/b-cache.ini", "w");
	@fwrite ($fp, $ini);
	@fclose ($fp);
}


?>