<?php 
	if (isset($_POST['submit'])) {
		$name = $_POST['name'];
		$brand = $_POST['brand'];
		$emailaddress = $_POST['emailaddress'];
		$services = $_POST['services'];
		$mssg = $_POST['message'];
		$budget = $_POST['budget'];

		$to = 'adisa.ahmed881@gmail.com';
		$subject = 'OnTheGo Brief Form';
		$message = "Name: ".$name."\n"."Company Name: ".$brand."\n"."Email Address: ".$emailaddress."\n"."Service: ".$services."\n"."Wrote the following: ".$mssg."\n"."Budget: ".$budget;
		$headers = "From: ".$emailaddress;

		if (mail($to, $subject, $message, $headers)) {
			echo "<h1>Sent Successfully! Thank you"." ".$name.", We will contact you shortly! </h1>";
		}else {
			echo "Something went wrong";
		}
	}
?>