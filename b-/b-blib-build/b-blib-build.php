<?php header('Content-type: application/json; charset: utf8');

switch($_REQUEST['a']){

	case "menu":
		$answer = array(
			"status"=>true,
			"message"=>"Ок",
			'container'=>".b-popup-menu__content",
			"structure"=>array(
				array(
					'type'=>"menu",
					'class'=>"b-menu_amtel b-dynamic-menu_transparent_off",
					'container'=>".b-popup-menu__content",
					'items'=>array(
						array(
							"title"=>"клиенты",
							"description"=>"",
							"action"=>"client"
						),
						array(
							"title"=>"агенты",
							"description"=>"",
							"action"=>"agent"
						),
						array(
							"title"=>"спутники",
							"description"=>"",
							"action"=>"satellist"
						),
						array(
							"title"=>"станции",
							"description"=>"",
							"action"=>"station"
						),
						array(
							"title"=>"1С",
							"description"=>"",
							"action"=>"one_s"
						),
						array(
							"title"=>"статистика",
							"description"=>"",
							"action"=>"statistic"
						),
						array(
							"title"=>"плат.карты",
							"description"=>"",
							"action"=>"cardgen"
						),
						array(
							"title"=>"тарифы",
							"description"=>"",
							"action"=>"tarifs"
						)
					)//items
				)//menu
			)//structure
		);
	break;
	
	case "auth":
		echo '{
			"status":true,
			"message":"Ok",
			"structure":[
				{
				  "type":"form",
				  "class":"b-autorisation",
				  "container":".b-main-page__auth",
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
		  }';
		
	break;
	
	case "client":
		echo '{
			"status":true,
			"message":"Ok",
			"container":".b-main-page__panel",
			"structure":[
				{
				"type":"form",
				"class":"b-dynamic-form_default",
				"container":"",
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
			"status":true,
			"message":"Ok",
			"container":".b-main-page__panel",
			"structure":[
				{
				"type":"form",
				"class":"b-dynamic-form_default",
				"container":"",
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
			"status":true,
			"message":"Ok",
			"container":".b-main-page__panel",
			"structure":[{
				"type":"fileList",
				"files":[{
					"url":"0623010dc2922cdc1a5e0b081f65ed3eaa4f15684c00630803cde1500fa0c8f6.csv",
					"name":"Детальная статистика по трафику c 2013-07-03 23:55:00 по 2013-07-04 00:59:59",
					"description":"Этот файл сожержит информацию по детальной статистике, необходимой для изучения активности абонентского устройства файл сожержит информацию по детальной статистике, необходимой для изучения активности абонентского устройства файл сожержит информацию по детальной статистике, необходимой для изучения активности абонентского устройства файл"
					},{
					"url":"04c7cfc3d559bcd7df6d796643c4423d405b863baf39d160001edc6cc167c12e.csv",
					"name":"Детальная статистика по трафику c 2013-07-01 23:55:00 по 2013-07-02 00:59:59",
					"description":"Этот файл сожержит информацию по детальной статистике, необходимой для изучения активности абонентского устройства"
					}
				]}
			]
		}';		
	break;
	
	case "satellist":
		echo '{
			"status":true,
			"message":"Ok",
			"container":".b-main-page__panel",
			"structure":[{
				"type":"table",
				"class":"b-dynamic-table_default",
				"name":"clients",
				"content":[{
					"id":"ID",
					"login":"Логин",
					"password":"Пароль"
					},{
					"id":"Значение 11",
					"login":"Значение 12",
					"password":"Значение 13"
					},{
					"id":"Значение 21",
					"login":"Значение 22",
					"password":"Значение 23"
				}],
				"customization":{
					"id":"40",
					"password":500
				},
				"actions":[{
					"name":"client",
					"description":"Редактировать пользователя",
					"attributes":[
						"id"
					]},{
					"name":"agent",
					"description":"На клиентов",
					"attributes":[
						"id"
					]},{
					"name":"del_user",
					"description":"На агентов",
					"attributes":[
						"id"
					]}
				]
			}]
		}';		
	break;

	
	default:
		
	break;

}

if($answer){echo json_encode($answer);}
?>