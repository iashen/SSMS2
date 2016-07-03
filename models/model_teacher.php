<?php

include("../lk.edu.code.fw/dbc.php");
include("base_model.php");
$settings = new settings();


if (array_key_exists('loading_teacher', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT `TID`, `name`, `class` FROM `teacher`",$conn);
}

if (array_key_exists("delete_teacher", $_POST)) {
    $sql = "Delete from teacher WHERE `tid`=" . $_POST['teacher_id_for_delete'] . ";";
    echo $settings->prepareCommandQueryForAlertify($sql, "Successfully Deleted Teacher", "Sorry could not be Delete data",$conn);
}

if (array_key_exists('save_teacher', $_POST)) {
    
    $sql = "INSERT INTO  `code`.`teacher` (
`TID` ,
`name` ,
`class`
)
VALUES (
NULL ,  '" . $_POST['tname'] . "',  '" . $_POST['tclass'] . "'
);";
    $data = $conn->query($sql);

    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add  Teacher"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

if (array_key_exists('get_teacher_data_to_up', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT `TID`, `name`, `class` FROM `teacher` WHERE teacher.TID = '{$_POST['teacherID']}';",$conn);
}

if (array_key_exists("update_teacher", $_POST)) {

    $sql = "UPDATE `teacher` SET `name`='{$_POST['tname']}',`class`='{$_POST['tclass']}' WHERE (`TID`='{$_POST['tid']}');";
    $update = $conn->query($sql);

    if ($update) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Updated Teacher"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}
