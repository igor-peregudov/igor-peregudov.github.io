<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['name'])) {$name = $_GET['name'];}
    if (!empty($_GET['tel'])) {$phone = $_GET['tel'];} else {return false;}
    if (isset($_GET['formData'])) {$formData = $_GET['formData'];}
//    var_dump($_GET);
 
    $to = "dsemikozov@yandex.ru";
    $sendfrom   = "4ROOM - сайт"; /*Укажите адрес, с которого будет приходить письмо, можно не настоящий, нужно для формирования заголовка письма*/
    $headers  = "From: " . strip_tags($sendfrom) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($sendfrom) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";
    $subject = "Заказ с сайта 4room.by";
    $message = "$formData
                <b>Имя:</b> $name <br>
                <b>Телефон:</b> $phone";


    $send = mail ($to, $subject, $message, $headers);
    if ($send == 'true')
    {
    echo '<center>
 
Спасибо за отправку вашего сообщения!
 
</center>';
    }
    else
    {
    echo '<center>
 
<b>Ошибка. Сообщение не отправлено!</b>
 
</center>';
    }
} else {
//    http_response_code(403);
    echo "Попробуйте еще раз";
}?>