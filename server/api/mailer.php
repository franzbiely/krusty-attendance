<?php 
require 'PHPMailerAutoload.php';
require 'credential.php';
class Mailer {
    function sendData($name, $dateTime, $qr){
        $mail = new PHPMailer;
        $mail->SMTPDebug = 4;                               // Enable verbose debug output
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = EMAIL;                 // SMTP username
        $mail->Password = PASS;                           // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;                                    // TCP port to connect to

        $mail->setFrom(EMAIL, 'Mailer');
        $mail->addAddress(EMAIL, 'Joe User');     // Add a recipient
        $mail->addReplyTo(EMAIL);

        //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
        $mail->isHTML(true);                                  // Set email format to HTML

        $mail->Subject = 'Here is the subject';
        $mail->Body    = '<div style="border-radius: 5px; padding: 5px;"><p><span><b>Name:</b> '.$name.'</span></p><br /><p><span><b>Date Time:</b> '.$dateTime.'</span></p><br /><p><span><b>QR Value:</b> '.$qr.'</span></p><br /></div>';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        if(!$mail->send()) {
            return false;
        } else {
            return true;
        }
    }
}
?>