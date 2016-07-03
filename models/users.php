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

////////////////////////




if (array_key_exists('login', $_POST)) {

    $status;

    $userName = $_POST['username'];
    $pass = $_POST['password'];
    $pass_with_sha = sha1($pass);
    $result = mysql_query("SELECT
`user`.iduser,
`user`.username,
`user`.name,
`user`.`password`,
`user`.permission,
`user`.email,
`user`.deleted
FROM
`user` WHERE `user`.username = '{$_POST['username']}'") or die(mysql_error());
    $num = mysql_num_rows($result);
    if ($num > 0) {
        while ($row = mysql_fetch_assoc($result)) {
            $userID = $row['iduser'];
            $userName = $row['username'];
            $password = $row['password'];
            $deleted = $row['deleted'];
            $permisson = $row['permission'];
            $name = $row['name'];
            $email = $row['email'];
        }
//check against password
        if ($pass_with_sha === $password) {
// this sets variables in the session 
            session_start();
            $_SESSION['user_id'] = $userID;
            $_SESSION['username'] = $userName;
            $_SESSION['name'] = $name;
            $_SESSION['deleted'] = $deleted;
            $_SESSION['permission'] = $permisson;
            $_SESSION['HTTP_USER_AGENT'] = md5($_SERVER['HTTP_USER_AGENT']);


////update the timestamp and key for cookie
//            if (isset($_POST['remember'])) {
//                setcookie("user_id", $_SESSION['user_id'], time() + 60 * 60 * 24 * COOKIE_TIME_OUT, "/");
//                setcookie("user_key", sha1($ckey), time() + 60 * 60 * 24 * COOKIE_TIME_OUT, "/");
//                setcookie("usr_email", $_SESSION['usr_email'], time() + 60 * 60 * 24 * COOKIE_TIME_OUT, "/");
//            }
            echo json_encode(array("msgType" => 1, "msg" => "Login Success"));
        } else {
            echo json_encode(array("msgType" => 2, "msg" => "Invalid Login"));
        }
    } else {
        echo json_encode(array("msgType" => 3, "msg" => "No Such User"));
    }
}
?>