<?php
///*
error_reporting(E_ALL);
ini_set('display_errors',1);
//*/

if(strpos($_GET['a'],"_")) list($_GET['a'],$_GET['view'])=explode("_",$_GET['a'],2);
if($_GET['a']=='list'||$_GET['a']=='get'||$_GET['a']=='add'||$_GET['a']=='edit'||$_GET['a']=='delete'){
//header('Content-Type: application/json; charset=utf-8');
header('Content-Type: text/html; charset=utf-8');
require_once('meta.php');
require_once('config.php');
$mysqli=new mysqli($db_conf['host'],$db_conf['user'],$db_conf['password'],$db_conf['database']);
if($mysqli->connect_errno) die("Connect Error #".$mysqli->connect_errno.". ".$mysqli->connect_error);
$mysqli->query("SET NAMES utf8");
$a=$mysqli->real_escape_string($_GET['a']);
$view=$mysqli->real_escape_string($_GET['view']);

$meta=new Meta($mysqli,$view);
$params=array();
//$_POST['users_id']=$_GET['users_id'];
foreach($_POST as $key=>$value){
	$params[$mysqli->real_escape_string($key)]=$mysqli->real_escape_string($value);
}
$answer=$meta->build($a,$params);
echo json_encode($answer,256);
/****************************************************************************************************************/
}
else{

header('Content-type: application/json; charset: utf8');
switch($_REQUEST['a']){

	case "main":
		echo '
{
  "block":"b-main-page",
  "container":"body",
  "content":[
    {
      "elem":"header",
      "mods":{
        "style":"amtel"
      },
      "content":[
        {
          "block":"b-popup-menu",
          "mods":{
            "style":"amtel"
          },
          "content":[
            {
              "elem":"content"
            },
            {
              "elem":"opener",
              "content":"меню",
              "attrs":{
                "data-test":{
                  "a":1,
                  "b":2
                },
                "onclick":"function(){$(\'.b-popup-menu__content\').toggleClass(\"b-popup-menu__content_closed\",1500);}"
              }
            }
          ]
        },
        {
          "block":"b-grid",
          "content":[
            {
              "elem":"cell",
              "mods":{
                "right":false
              },
              "attrs":{
                "className":"b-main-page__auth"
              },
              "content":[
                {
                  "block":"form",
                  "class":"b-autorisation",
                  "name":"clients",
                  "action":"?",
                  "method":"POST",
                  "content":[
                    {
                      "type":"text",
                      "name":"login",
                      "value":"Введите логин"
                    },
                    {
                      "type":"password",
                      "name":"password",
                      "value":"Введите пароль"
                    },
                    {
                      "type":"submit",
                      "value":"Войти"
                    },
                    {
                      "type":"button",
                      "value":"Напомнить пароль",
                      "action":"forget pass"
                    }
                  ]
                }
              ]
            },
            {
              "elem":"cell",
              "mods":{
                "left":false
              },
              "attrs":{
                "className":"b-dynamic-menu__selected-cell b-main-page__logo"
              },
              "content":[
                {
                  "attrs":{
                    "className":"b-main-page__bg-logo"
                  }
                }
              ]
            },
            {
              "elem":"cell",
              "attrs":{
                "className":"b-dynamic-history__wrapper"
              },
              "content":[
                {
                  "block":"b-dynamic-history"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "elem":"panel",
      "content":"здесь контент"
    },
    {
      "block":"menu",
      "class":"b-menu_amtel b-dynamic-menu_transparent_off",
      "container":".b-popup-menu__content",
      "items":[
        {
          "title":"клиенты",
          "description":"",
          "action":"client"
        },
        {
          "title":"агенты",
          "description":"",
          "action":"agent"
        },
        {
          "title":"спутники",
          "description":"",
          "action":"satellist"
        },
        {
          "title":"станции",
          "description":"",
          "action":"station"
        },
        {
          "title":"1С",
          "description":"",
          "action":"one_s"
        },
        {
          "title":"статистика",
          "description":"",
          "action":"statistic"
        },
        {
          "title":"плат.карты",
          "description":"",
          "action":"cardgen"
        },
        {
          "title":"тарифы",
          "description":"",
          "action":"tarifs"
        }
      ]
    }
  ]
}';
		break;
	case "auth":
		echo '';
		break;
	case "client":
		echo '{
			"container":".b-main-page__panel",
			"content":[
				{
				"block":"form",
				"class":"b-dynamic-form_default",
				"name":"clients",
				"action":"?",
				"method":"POST",
				"content":[
					{
						"type":"text",
						"name":"login",
						"label":"Логин",
						"value":"Вася"
					},
					{
						"type":"autotext",
						"name":"login2",
						"label":"Логингин",
						"value":"Васяся",
						"delay":500,
						"numVariants":5,
						"actions":"get_autotext"
						
					},
					{
						"type":"password",
						"name":"password",
						"label":"Пароль",
						"value":"123"
					},
					{
						"type":"check",
						"name":"remember_me",
						"label":"Запомнить меня",
						"value":"checked"
					},
					{
						"type":"option",
						"name":"permissions",
						"label":"Как пользователь",
						"value":"checked"
					},
					{
						"type":"option",
						"name":"permissions",
						"label":"Как администратор",
						"value":""
					},
					{
						"type":"list",
						"name":"modules",
						"label":"Доступные модули",
						"options":[
							{
								"label":"Клиенты",
								"value":"clients",
								"selected":"selected"
							},
							{
								"label":"Группы",
								"value":"groups",
								"selected":"selected"
							},
							{
								"label":"Тарифы",
								"value":"tariffs"
							},
							{
								"label":"Отчёты",
								"value":"reports",
								"disabled":"disabled"
							},
							{
								"label":"Настройки",
								"value":"settings",
								"selected":"selected"
							}
						]
					},
					{
						"type":"combo",
						"name":"server",
						"label":"Сервер для входа",
						"options":[
							{
								"label":"Москва",
								"value":"192.168.1.1"
							},
							{
								"label":"Барнаул",
								"value":"192.168.1.2"
							},
							{
								"label":"Петропавловск-Камчатский",
								"value":"192.168.1.3",
								"disabled":"disabled"
							},
							{
								"label":"Тест",
								"value":"192.168.1.4",
								"selected":"selected"
							}
						]
					},
					{
						"type":"memo",
						"name":"comment",
						"label":"Ваш комментарий",
						"value":"Многострочный текст,\n отображаемый в поле для ввода\n"
					},
					{
						"type":"submit",
						"value":"Войти"
					}
				]
				}
			]
		}';
	break;
	
	case "station":
	
		echo '{
		  "block":"table",
		  "class":"b-dynamic-table_default",
		  "container":".b-main-page__panel",
		  "name":"clients",
		  "content":[
			{
			  "id":"ID",
			  "login":"Логин",
			  "password":"Пароль"
			},
			{
			  "id":"Значение 11",
			  "login":"Значение 12",
			  "password":"Значение 13"
			},
			{
			  "id":"Значение 21",
			  "login":"Значение 22",
			  "password":"Значение 23"
			}
		  ],
		  "customization":{
			"id":40,
			"password":100
		  },
		  "actions":[
		  	{
			  "name":"add_user",
			  "description":"Добавить пользователя",
			  "attributes":[
				"id"
			  ]
			},
			{
			  "name":"station",
			  "description":"Редактировать пользователя",
			  "attributes":[
				"id"
			  ]
			},
			{
			  "name":"del_user",
			  "description":"Удалить пользователя",
			  "attributes":[
				"id"
			  ]
			}
		  ]
		}';
	break;
	
	case "get_autotext":
		echo '{
			"status":true,
			"message":"Ok",
			"container":"",
			"content":["Вася", "Фигася", "Тупася"]
		}';
	break;
	
	case "agent":
		echo '{
				"block":"fileList",
				"container":".b-main-page__panel",
				"files":[{
					"url":"0623010dc2922cdc1a5e0b081f65ed3eaa4f15684c00630803cde1500fa0c8f6.csv",
					"name":"Детальная статистика по трафику c 2013-07-03 23:55:00 по 2013-07-04 00:59:59",
					"description":"Этот файл сожержит информацию по детальной статистике, необходимой для изучения активности абонентского устройства файл сожержит информацию по детальной статистике, необходимой для изучения активности абонентского устройства файл сожержит информацию по детальной статистике, необходимой для изучения активности абонентского устройства файл"
					},{
					"url":"04c7cfc3d559bcd7df6d796643c4423d405b863baf39d160001edc6cc167c12e.csv",
					"name":"Детальная статистика по трафику c 2013-07-01 23:55:00 по 2013-07-02 00:59:59",
					"description":"Этот файл сожержит информацию по детальной статистике, необходимой для изучения активности абонентского устройства"
					}
				]
			}';		
	break;
	
	default:
		
	break;

}

if(isset($answer)){echo json_encode($answer);}
}
?>
