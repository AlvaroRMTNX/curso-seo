<?php
  $jsonData = array("success" => false);

  if (empty($_POST["name"]) || empty($_POST["email"]) || empty($_POST["phone"]) || empty($_POST["comentarios"]))
  {
    $jsonData['mensaje'] = "Faltan campos";
  }
  else
  {
    $nombre = $_POST["name"];
    $correo = $_POST["email"];
    $telefono = $_POST["phone"];
    $mensaje = $_POST["comentarios"];

    $EmailTo = "info@cemim.com.mx";
    $Subject = "Solicitud de Información";

    // prepare email body text
    $Body = "";
    $Body .= "Nombre: ";
    $Body .= $nombre . "<br>";
    $Body .= "Correo: ";
    $Body .= $correo . "<br>";
    $Body .= "Telefono: ";
    $Body .= $telefono;
    $Body .= "<br>";
    $Body .= "Mensaje: ";
    $Body .= $mensaje . "<br>";

    $cabeceras = "MIME-Version: 1.0\r\n";
    $cabeceras .= "Content-type: text/html; charset=UTF-8\r\n";
    $cabeceras .= "From: " . $correo . "\r\n";

    // send email
    $success = mail($EmailTo, $Subject, $Body, $cabeceras);
    // redirect to success page
    if ($success && !isset($jsonData['mensaje']))
    {
      $jsonData['success'] = true;
      $jsonData['mensaje'] = "Datos enviados<br>Pronto nos pondremos en contacto contigo.";
    }
    else
    {
      if(!isset($jsonData['mensaje']))
      {
        $jsonData['mensaje'] = "Error al enviar el mensaje.";
      }
    }
  }

  echo json_encode($jsonData, JSON_FORCE_OBJECT);
?>