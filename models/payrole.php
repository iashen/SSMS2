<?php

include("../inc/dbc.php");
include("commen_functions.php");
$settings = new settings();


if (array_key_exists('loading_company', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT
company.companyID,
company.companyName,
company.deleted
FROM
company WHERE company.deleted='0'");
}

if (array_key_exists("delete_company", $_POST)) {
    $sql = "UPDATE `company` SET `deleted`='1' WHERE `companyID`=" . $_POST['company_id_for_delete'] . ";";
    echo $settings->prepareCommandQueryForAlertify($sql, "Successfully Deleted Dristribution", "Sorry could not be Delete data");
}

if (array_key_exists('save_company', $_POST)) {
    
    $sql = "INSERT INTO `company` (`companyName`) VALUES ('{$_POST['companyName']}');";
    $data = mysql_query($sql);

    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add  Company"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

if (array_key_exists('get_company_data_to_up', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT
company.companyID,
company.companyName,
company.deleted
FROM
company WHERE company.companyID = '{$_POST['companyID']}';");
}

if (array_key_exists("update_company", $_POST)) {

    $sql = "UPDATE `company` SET `companyName`='{$_POST['companyName']}'  WHERE (`companyID`='{$_POST['companyID']}');";
    $update = mysql_query($sql);

    if ($update) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Updated Company"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}
