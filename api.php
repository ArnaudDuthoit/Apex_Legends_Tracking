<?php

require 'config.php';

$player = $_GET['player'];
$plateforme = $_GET['plateforme'];

// initialisation de la session
$ch = curl_init();

// configuration des options
curl_setopt($ch, CURLOPT_HTTPHEADER, array('TRN-Api-Key:' .$API_KEY));
curl_setopt($ch, CURLOPT_URL, "https://public-api.tracker.gg/apex/v1/standard/profile/$plateforme/$player");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

// exécution de la session
$rep = curl_exec($ch);
echo $rep;
//var_dump($rep);

// fermeture des ressources
curl_close($ch);








