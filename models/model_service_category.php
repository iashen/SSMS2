<?php

include('../lk.edu.code.fw/dbc.php');
include("base_model.php");

$settings = new settings();

if (array_key_exists("get_service_category_for_dropdown", $_POST)) {
    $data = $settings->prepareSelectQuery("SELECT
service_category.SCID,
service_category.service_category_name
FROM
service_category WHERE service_category.deleted = 0
", $conn);
    if (!empty($data)) {
        foreach ($data AS $data) {
            echo '<option value="' . $data['SCID'] . '">' . $data['service_category_name'] . '</option>';
        }
    } else {
        echo '<option>No Categories Found</option>';
    }
}


if (array_key_exists('save_service_category', $_POST)) {
    $sql = "INSERT INTO `service_category` (`service_category_name`) VALUES('" . $_POST['cat_name'] . "')";
    $data = $conn->query($sql);

    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add  Service Category"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry! Could not be Save your Data"));
    }
}

?>
