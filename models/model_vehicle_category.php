<?php

include('../lk.edu.code.fw/dbc.php');
include("base_model.php");

$settings = new settings();

if (array_key_exists("get_vehicle_category_for_dropdown", $_POST)) {
    $data = $settings->prepareSelectQuery("SELECT
vehicle_category.VCID,
vehicle_category.vehicle_category_name
FROM
vehicle_category WHERE vehicle_category.deleted = 0
", $conn);
    if (!empty($data)) {
        foreach ($data AS $data) {
            echo '<option value="' . $data['VCID'] . '">' . $data['vehicle_category_name'] . '</option>';
        }
    } else {
        echo '<option>No Categories Found</option>';
    }
}


if (array_key_exists('save_vehicle_category', $_POST)) {
    $sql = "INSERT INTO `vehicle_category` (`vehicle_category_name`) VALUES('" . $_POST['text1'] . "')";
    $data = $conn->query($sql);

    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add  Vehicle Category"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

if (array_key_exists('validate_vehicle_category', $_POST)) {
    $sql = "SELECT
            count(vehicle_category.VCID) as v_count
            FROM
            vehicle_category WHERE vehicle_category.vehicle_category_name = '{$_POST['text1']}'";
   
    $data = $settings->prepareSelectQueryForJSON($sql, $conn);
    
    echo $data;
/*
    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add  Vehicle Category"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }  */
}

?>

