<?php  
	function filterUserInput($string) {
		return htmlentities($string, ENT_QUOTES, 'UTF-8');
	}






	// function generateRandomString($length) {
	//     $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	//     $charactersLength = strlen($characters);
	//     $randomString = '';
	//     for ($i = 0; $i < $length; $i++) {
	//         $randomString .= $characters[rand(0, $charactersLength - 1)];
	//     }
	//     return $randomString;
	// }
	// function filterUserInput($userdata) {
	// 	$result = strip_tags($userdata);
	// 	return $result;
	// }
?>