<?php
header('Content-type: application/json; charset: utf-8');
switch($_REQUEST['a']){

	case "main":
		echo '
			';
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
?>
