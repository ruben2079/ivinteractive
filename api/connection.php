<?php
 
 
function Connect()
{ 
 $dbhost = ""; //set local host for database here
 $dbuser = ""; //set database user
 $dbpass = ""; //set password
 $dbname = ""; //set database name
 
 // Create connection
 $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname) or die($conn->connect_error);
 
 return $conn;
}
 
?>