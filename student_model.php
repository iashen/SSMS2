<?php

if (array_key_exists("save_student", $_POST)) {
    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $dbname = "code";

// Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO  `code`.`student` (
`SID` ,
`fname` ,
`city`
)
VALUES (
NULL ,  '" . $_POST['fname'] . "',  '" . $_POST['city'] . "'
);";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Added  Student"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Add your Data"));
    }
}
?>