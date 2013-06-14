<?php 
getCache(json_decode($_REQUEST['data']), json_decode($_REQUEST['exception']));

/*
//выплевываем кэш по запросу от клиента
//[param] $types - расширения файлов которые пользователь ожидает (css, js)
//[answer] пока нет
*/
function getCache($types, $exception){
	foreach($types as $key => $value){
		$value = ($value)?$value:array();
		sort($value);
		$name = md5(implode("",$value));
		$name .=".".$key;
		$path="b-/b-blib/__cache/$name";
		if(!file_exists("__cache/$name")){
			$code = "";
			$list =scan('../..','*.'.$key, $value, $code, $exception);
			setCache($code, $list, $value, '.'.$key);
		}else{
			$ini = @file_get_contents("__cache/b-cache.ini");
			$ini = (array)json_decode($ini);
			$list = $ini[$path];
		}

		$answer['status']=true;
		$answer[$key]['path']= $path;
		$answer[$key]['list']= $list;
	}
	
	echo json_encode($answer);
	exit;
}

/*
//сканирует все директории и склеивает весь код указанного типа файлов
//[param] $dir-директория , $mask-какие типы файлов склеивать, $exept - массив уже не нужных файлов, $code - куда поместить склееянный код
//[answer] массив имен склеянных файлов, пишет код в $code
*/
function scan($dir, $mask, $exept, &$code, $badBlocks){
	$d = array();
	$arr = opendir($dir);
	while($v = readdir($arr)){
		if($v == '.' or $v == '..' or $v == 'b-blib' or $v =='b-all-soft') continue;
		if(!is_dir($dir.'/'.$v) && fnmatch($mask, $v)){
			$temp = substr($dir.'/'.$v, 6);
			if(in_array($temp, $exept))continue;
			$d[] = $temp;		
			$code .= @file_get_contents($dir.'/'.$v);
		}elseif(is_dir($dir.'/'.$v) && !in_array($v, $badBlocks)){
			$d = array_merge($d, scan($dir.'/'.$v, $mask, $exept, $code, $badBlocks));
		}
	}
	return $d;
}

/*
//устанавливает кэш
//[param] $code - код кешируемого файла, $list - список склеенных файлов, $name - список отсутствующих файлов(так будет назван кэш), $extension - расширения файлов
//[answer] пока нет
*/
function setCache($code, $list, $name, $extension){
	sort($name);
	sort($list);
	
	$name = md5(implode("",$name));
	$name .=$extension;
	if(file_exists("__cache/$name"))return false;

	$fp = @fopen ("__cache/$name", "w");
	@fwrite ($fp, $code);
	@fclose ($fp);
	
	$ini = @file_get_contents("__cache/b-cache.ini");
	var_dump($ini);
	$ini = ($ini)?(array)json_decode($ini):array();
	var_dump($ini);
	$ini = array_merge($ini,array("b-/b-blib/__cache/".$name => $list));
	$ini = json_encode($ini);
	$fp = @fopen ("__cache/b-cache.ini", "w");
	@fwrite ($fp, $ini);
	@fclose ($fp);
}


?>