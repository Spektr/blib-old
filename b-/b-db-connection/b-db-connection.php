<?php

$CurLocation="test";		//0_0 смена локации

$w_server="localhost";
$w_user="billing";
$w_pw="billing";
switch($CurLocation){
	case "msk":
		$w_db="agent55";
		$ROUTER=3232261154;
		$DB_POSTFIX=55;
	break;
	
	case "barnaul":
		$w_db="agent44";
		$ROUTER=3232260861;
		$DB_POSTFIX=44;
	break;	

	case "test":
		$w_db="agent66";
		$ROUTER=3232261410;
		$DB_POSTFIX=66;
		$w_server="192.168.90.222";
	break;
	
	default:
		$w_db="";
		$w_pw="";
		$ROUTER=0;
		$DB_POSTFIX="";
	break;
}

/*create object for db connection*/
$mysqli = new mysqli($w_server, $w_user, $w_pw, $w_db);
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}else{
	$mysqli->query("set names 'utf8'");
}

?>
