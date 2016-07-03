<?php

include("../inc/dbc.php");
include("commen_functions.php");
$settings = new settings();


if (array_key_exists('loading_roles', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT
company.companyName,
roles.RoleName,
roles.roleID,
roles.deleted,
company.deleted
FROM
company
INNER JOIN roles ON company.companyID = roles.companyID WHERE company.deleted ='0' AND roles.deleted ='0'
ORDER BY company.companyName ASC");
}

if (array_key_exists("delete_role", $_POST)) {
    $sql = "UPDATE `roles` SET `deleted`='1' WHERE `roleID`=" . $_POST['role_id_for_delete'] . ";";
    echo $settings->prepareCommandQueryForAlertify($sql, "Successfully Deleted Dristribution", "Sorry could not be Delete data");
}

if (array_key_exists('save_role', $_POST)) {
    
    $sql = "INSERT INTO `roles` (`companyID`, `RoleName`) VALUES ('{$_POST['companyID']}', '{$_POST['roleName']}');";
    $data = mysql_query($sql);

    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add  Role"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

if (array_key_exists('get_role_data_to_up', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT
company.companyName,
company.companyID,
roles.RoleName,
roles.roleID,
company.deleted
FROM
company
INNER JOIN roles ON company.companyID = roles.companyID WHERE roleID ='{$_POST['roleID']}' AND company.deleted ='0';");
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
