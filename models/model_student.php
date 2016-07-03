<?php

include("../lk.edu.code.fw/dbc.php");
include("base_model.php");
$settings = new settings();

error_reporting(0);
if (array_key_exists('loading_student', $_POST)) {

    if(isset($_POST['search_key'])){
        $searchKey="%".$_POST['search_key']."%";
    }else{
        $searchKey="%";
    }

    if(isset($_POST['noOfRecords'])  ){
        $noOfRecords=$_POST['noOfRecords'];       
    }else{
        $noOfRecords="50";
    }

    $sql = "SELECT `SID`, `fname`, `city` FROM `student` WHERE `fname` like '{$searchKey}' OR `city` like '{$searchKey}' ORDER BY `fname` ASC limit ".$noOfRecords;

    $data = $settings->prepareSelectQueryForJSON($sql,$conn);

}

if (array_key_exists("delete_student", $_POST)) {
    $sql = "Delete from student WHERE `sid`=" . $_POST['student_id_for_delete'] . ";";
    echo $settings->prepareCommandQueryForAlertify($sql, "Successfully Deleted Student", "Sorry could not be Delete data",$conn);
}

if (array_key_exists('save_student', $_POST)) {
    
    $sql = "INSERT INTO  `code`.`student` (
`SID` ,
`fname` ,
`city`
)
VALUES (
NULL ,  '" . $_POST['fname'] . "',  '" . $_POST['city'] . "'
);";
    $data = $conn->query($sql);

    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add  Student"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

if (array_key_exists('get_student_data_to_up', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT `SID`, `fname`, `city` FROM `student` WHERE student.SID = '{$_POST['studentID']}';",$conn);
}

if (array_key_exists("update_student", $_POST)) {

    $sql = "UPDATE `student` SET `fname`='{$_POST['fname']}',`city`='{$_POST['city']}' WHERE (`SID`='{$_POST['sid']}');";
    $update = $conn->query($sql);

    if ($update) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Updated Student"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}
