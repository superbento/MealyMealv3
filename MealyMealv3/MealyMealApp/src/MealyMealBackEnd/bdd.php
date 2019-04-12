<?php


    

 $co ="";
    
    try
{
       //$co = new PDO('mysql:host=localhost;dbname=skopun_', 'Noah_hazoume', 'Bordeaux25' );

    $co = new PDO('mysql:host=localhost; dbname=projet_efrei_bi', 'root', '');


}

catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}




/*
$mail = $_POST['Email'];
$fname = $_POST['Prenom'];
$lname = $_POST['Nom'];
$mail2 = $_POST['Email2'];
$mdp = $_POST['Password'];
$sex= '';
$filepath= "";


$rqent = "SELECT * FROM app_user WHERE email = '$mail' ";
$rq = $co->query($rqent);






if ($rq->rowCount() == 0){


   $rqt = "INSERT INTO `app_user` (first_name, last_name, email, email_bis, password_ ) VALUES ('$fname', '$lname', '$mail', '$mail2', '$mdp') ";

   $co->query($rqt);

   echo "CESURE"."valide : ".$rqt." CESURE";

     } else {

       echo "nonvalide"."CESURE";

     }*/


?>