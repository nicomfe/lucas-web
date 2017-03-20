<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'phpmailer/PHPMailerAutoload.php';

if (isset($_POST['inputName']) && isset($_POST['inputEmail']) && isset($_POST['inputMessage'])) {

    //check if any of the inputs are empty
    if (empty($_POST['inputName']) || empty($_POST['inputEmail']) || empty($_POST['inputMessage'])) {
        $data = array('success' => false, 'messageSpanish' => 'Por favor completa el formulario.', 'messageEnglish' => 'Please fill in the form.');
        echo json_encode($data);
        exit;
    }

    //create an instance of PHPMailer
    $mail = new PHPMailer();

    $mail->From = $_POST['inputEmail'];
    $mail->FromName = $_POST['inputName'];
    $mail->AddAddress('nicofetter@gmail.com'); //recipient
    $mail->Subject = $_POST['emailTitle'] . " " . $_POST['inputName'];
    $mail->Body = "Name: " . $_POST['inputName'] . "\r\n\r\nMessage: " . stripslashes($_POST['inputMessage']) . "\r\n\r\nPhone: " . stripslashes($_POST['inputPhone']);

    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'messageSpanish' => 'Ocurrio un error (Por favor contactanos en info@dlmlandscaping.co.nz). Error: ' . $mail->ErrorInfo , 'messageEnglish'=> 'Unexpected error (Please send us an email to info@rugbyexchangenz.com). Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'messageSpanish' => 'Gracias por tu mensaje!.', 'messageEnglish' => 'Thanks for your message! We will contact you shortly.');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'messageSpanish' => 'Por favor completa el formulario.', 'messageEnglish' => 'Please fill in the form');
    echo json_encode($data);

}
