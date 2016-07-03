<?php

include("../inc/dbc.php");
include("commen_functions.php");
$settings = new settings();

if (array_key_exists('getEmpID', $_POST)) {

    $empid = $settings->getNextAutoIncrementID("emloyee");


    echo json_encode(array("empID" => $empid));
}



if (array_key_exists('save_employee', $_POST)) {


    $sql = "INSERT INTO `emloyee` 
        (`fullName`, `preName`, `permAddress`, `contactAddress`, `gender`, `nationality`, `married`, `mobile`, `telephone`, `district`, `nic`, `epf`, `educationQ`, `otherQ`, `doj`, `dob`, `welfare`) VALUES 
        ( '{$_POST['fullname']}', '{$_POST['preferName']}', '{$_POST['p_address']}', '{$_POST['c_address']}', '{$_POST['gender']}', '{$_POST['nationality']}', '{$_POST['marital']}', '{$_POST['mobile']}', '{$_POST['telephone']}', '{$_POST['district']}', '{$_POST['nic']}', '{$_POST['EPF']}', '{$_POST['education']}','{$_POST['other']}', '{$_POST['start_date']}', '{$_POST['dob']}', '{$_POST['welfare']}');";
    $sql2 = "INSERT INTO `assignedcompany` (`employeID`, `roleID`, `startDate`) VALUES ('{$_POST['empID']}', '{$_POST['job']}', '{$_POST['start_date']}');";
    $data2 = mysql_query($sql2);
    $data = mysql_query($sql);


    if ($data2 && $data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add  Employee"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}




if (array_key_exists("update_doctor", $_POST)) {

    $sql = "UPDATE `doctor` SET `name`='" . $_POST['docName'] . "', `speciality`='" . $_POST['spec'] . "', `DoB`='" . $_POST['dob'] . "', `teritory_idteritory`='" . $_POST['teritoryID'] . "', `telephone`='" . $_POST['telephone'] . "' WHERE `iddoctor`='" . $_POST['hide_id_up'] . "';";
    $update = mysql_query($sql);

    if ($update) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Updated  Doctor"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}

if (array_key_exists('empIDupdate', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT
emloyee.empID,
emloyee.fullName,
emloyee.preName,
emloyee.permAddress,
emloyee.contactAddress,
emloyee.gender,
emloyee.nationality,
emloyee.married,
emloyee.mobile,
emloyee.telephone,
emloyee.district,
emloyee.nic,
emloyee.epf,
emloyee.educationQ,
emloyee.otherQ,
emloyee.doj,
emloyee.dob,
emloyee.welfare,
emloyee.inactive,
assignedcompany.roleID,
assignedcompany.assignID,
assignedcompany.startDate
FROM
emloyee
INNER JOIN assignedcompany ON emloyee.empID = assignedcompany.employeID WHERE emloyee.empID ='{$_POST['empID']}' ORDER BY startDate ASC LIMIT 1
;");
}

if (array_key_exists('update_employee', $_POST)) {

    $sql = "UPDATE `emloyee` SET `fullName`='{$_POST['fullname']}', `preName`='{$_POST['preferName']}', `permAddress`='{$_POST['p_address']}', `contactAddress`='{$_POST['c_address']}', `gender`='{$_POST['gender']}', `nationality`='{$_POST['nationality']}', `married`='{$_POST['marital']}', `mobile`='{$_POST['mobile']}', `telephone`='{$_POST['telephone']}', `district`='{$_POST['district']}', `nic`='{$_POST['nic']}', `epf`='{$_POST['EPF']}', `educationQ`='{$_POST['education']}', `otherQ`='{$_POST['other']}', `doj`='{$_POST['start_date']}', `dob`='{$_POST['dob']}', `welfare`='{$_POST['welfare']}', `inactive`='{$_POST['active']}' WHERE (`empID`='{$_POST['empID']}');";
    $sql2 = "UPDATE `assignedcompany` SET `roleID`='{$_POST['job']}', `startDate`='{$_POST['start_date']}' WHERE (`assignID`='{$_POST['roleID']}');";

    $data2 = mysql_query($sql2);
    $data = mysql_query($sql);


    if ($data2 && $data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Updated  Employee"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}

