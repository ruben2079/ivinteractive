<?php

//required file for connectivity with your database
require 'connection.php';


$conn = Connect();
/*
$name = $conn->real_escape_string($_POST['fname']);
$email = $conn->real_escape_string($_POST['email']);
$phone = $conn->real_escape_string($_POST['phone']);
$inquiry = $conn->real_escape_string($_POST['inquiry']);
$textareaMessage = $conn->real_escape_string($_POST['message']);
*/
// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json);

$name = $conn->real_escape_string($data->fname);
$email = $conn->real_escape_string($data->email);
$phone = $conn->real_escape_string($data->phone);
$inquiry = $conn->real_escape_string($data->inquiry);
$textareaMessage = $conn->real_escape_string($data->message);

//Check for duplicated emails
$checkDuplicateEmail = "SELECT * FROM testform WHERE email = '". $email ."'";

$query = "INSERT into testform (fname, email, phone, inquiry, message) VALUES('" . $fname . "','" . $email . "','" . $phone . "','" . $inquiry . "','" . $textareaMessage . "')";

if($name != "" && $email != "" && $phone != "" && filter_var($email, FILTER_VALIDATE_EMAIL) != false){
	
	$emailResult = $conn->query($checkDuplicateEmail);
	
	if ($emailResult->num_rows > 0) {
		header('Content-Type: application/json');
		$message = (object) ['message' => 'This email address is already in our records.'];
		print json_encode($message);
	} else {
      	$success = $conn->query($query);
		header('Content-Type: application/json');
		$message = (object) ['message' => 'Thank you. Your information has been saved.'];
		print json_encode($message);
	}
	
} else {
	header('Content-Type: application/json');
	$message = (object) ['message' => 'Please fill out the form with the correct information.'];
	print json_encode($message);
}

$conn->close(); 
?>