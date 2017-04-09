
<?php

	define("CONTACT_FORM", 'medvezjut83@gmail.com');



	$post = (!empty($_POST)) ? true : false;

	if($post){

		$name = stripslashes($_POST['name']);
		$phone = stripslashes($_POST['phone']);
		$email = stripslashes($_POST['email']);
		$subject = 'Заявка';
		$error = '';	
		$message = '
			<html>
					<head>
							<title>Заявка</title>
					</head>
					<body>
							<p>Имя: '.$name.'</p>
							<p>Контакт : '.$email.'</p>
							<p>Сообщение : '.$phone.'</p>	
					</body>
			</html>';



		if(!$error){
			$mail = mail(CONTACT_FORM, $subject, $message,
			     "From: ".$name." <"."no-reply@technoschet.ru".">\r\n"
			    ."Reply-To: "."no-reply@technoschet.ru"."\r\n"
			    ."Content-type: text/html; charset=utf-8 \r\n"
			    ."X-Mailer: PHP/" . phpversion());

			if($mail){
				$msg = 1;
				echo $msg;
			}
		}else{
			$msg = 0;
			echo $msg;
		}

	}
?>
