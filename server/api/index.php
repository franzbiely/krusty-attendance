<?php
include("mailer.php");
$mailer = new Mailer();
$messageCode=[];
$json = json_decode(file_get_contents('php://input'), true);
$status = $mailer->sendData($json['Name'],$json['DateTime'],$json['QR_Code']);
if($status){
    $messageCode="Email sent!";
}else{
    $messageCode="Email sending error!";
}
echo json_encode($messageCode);
?>