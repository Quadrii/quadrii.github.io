<?php

	$username = 'greymatt_admin';
	$dsn = 'mysql:host=localhost:3306; dbname=greymatt_franchise';
	$password = 'RWhC+a,dZ3c0';

	// $username = 'root';
	// $dsn = 'mysql:host=localhost; dbname=accounts_register';
	// $password = '';
	
	try {
		$connection = new PDO($dsn, $username, $password);

		$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}catch(PDOException $ex) {
		echo "Connection Failed".$ex->getMessage();
	}
?>