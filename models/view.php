<?php

include("../inc/dbc.php");
include("commen_functions.php");
$settings = new settings();

/////---------------------------medical delegate management system for GS---------------------------------////
//////////////////////////////////////////////////start of doctor page///////////////////////////////////////
if (array_key_exists('loading_doctor', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT
teritory.`Name` as teritory,
doctor.iddoctor,
doctor.`name` as name,
doctor.speciality,
doctor.DoB,
doctor.telephone
FROM
teritory
INNER JOIN doctor ON doctor.teritory_idteritory = teritory.idteritory");
}
//doctor view 
if (array_key_exists('loading_doctor_view', $_POST)) {
    $disID;
    session_start();
    $uid = $_SESSION['user_id'];

    $sql = "  SELECT
`user`.iduser,
delegate.distribution_id
FROM
`user`
INNER JOIN delegate ON delegate.user_iduser = `user`.iduser WHERE iduser='{$uid}'";
    $res = mysql_query($sql);
    while ($row = mysql_fetch_array($res)) {
        $disID = $row['distribution_id'];
    }
    $data = $settings->prepareSelectQueryForJSON("SELECT
teritory.`Name` as teritory,
doctor.iddoctor,
doctor.`name` as name,
doctor.speciality,
doctor.DoB,
doctor.telephone
FROM
teritory
INNER JOIN doctor ON doctor.teritory_idteritory = teritory.idteritory");
}

if (array_key_exists('searching_doctor', $_POST)) {
    $search = $_POST['docName'];

    $data = $settings->prepareSelectQueryForJSON("SELECT
teritory.`Name` as teritory,
doctor.iddoctor,
doctor.`name` as name,
doctor.speciality,
doctor.DoB,
doctor.telephone
FROM
teritory
INNER JOIN doctor ON doctor.teritory_idteritory = teritory.idteritory where name LIKE'*" . $search . "*'");
}

if (array_key_exists('save_doctor', $_POST)) {

    // $data = mysql_query("INSERT INTO `mydb`.`doctor` (`name`, `speciality`, `DoB`, `teritory_idteritory`) VALUES ('Shehan', 'vp', '2014-5-5', '1');");

    $sql = "INSERT INTO mydb.doctor (name, speciality, DoB, teritory_idteritory,telephone) VALUES ('{$_POST['docName']}', '{$_POST['spec']}', '{$_POST['dob']}', '{$_POST['teritoryID']}', '{$_POST['telephone']}');";

    $data = mysql_query($sql);

    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add  Doctor"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}


if (array_key_exists("delete_doctor", $_POST)) {
    echo $settings->prepareCommandQueryForAlertify("DELETE FROM doctor WHERE iddoctor = " . $_POST['doctor_id_for_delete'], "Successfully Deleted Doctor", "Sorry could not be Delete data");
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

if (array_key_exists('get_doctor_data_to_up', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT `iddoctor`, `name`, `speciality`, `DoB`, `teritory_idteritory`, `telephone` FROM doctor WHERE doctor.iddoctor = '{$_POST['docID']}';");
}

///////////end of doctr form///////////////////////
//////////////////delegate form///////////////////////
if (array_key_exists('loading_delegate', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT
distribution.distributionName,
delegate.iddelegate,
delegate.`name`,
delegate.email,
delegate.nic,
delegate.telephone,
delegate.mobile,
delegate.DoB,
delegate.distribution_id,
delegate.user_iduser,
`user`.username
FROM
distribution
INNER JOIN delegate ON delegate.distribution_id = distribution.distributionID
INNER JOIN `user` ON `user`.iduser = delegate.user_iduser
WHERE delegate.deleted=0");
}

if (array_key_exists('save_delegate', $_POST)) {

    $uid = $settings->getNextAutoIncrementID("user");
    $sql = "INSERT INTO `delegate` (`name`, `email`, `nic`, `telephone`, `mobile`, `DoB`, `distribution_id`, `deleted`, `user_iduser`) VALUES 
        ('{$_POST['delName']}', '{$_POST['delEmail']}', '{$_POST['nic']}', '{$_POST['deltelephone']}', '{$_POST['delMobile']}', '{$_POST['deldob']}', '{$_POST['distri']}', '0', '" . $uid . "');";
    $pass = sha1($_POST['nic']);
    $data = mysql_query($sql);
    $sql2 = "INSERT INTO `mydb`.`user` (`iduser`, `username`, `password`, `email`, `type`, `deleted`) VALUES ('" . $uid . "', '{$_POST['delUser']}', '{$pass}', '{$_POST['delEmail']}', '1', '0');";
    $data2 = mysql_query($sql2);
    if ($data && $data2) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add  Delegate"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

if (array_key_exists("delete_delegate", $_POST)) {
    $sql = "UPDATE `delegate` SET `deleted`='1' WHERE `iddelegate`=" . $_POST['delegate_id_for_delete'] . ";";
    echo $settings->prepareCommandQueryForAlertify($sql, "Successfully Deleted Delegate", "Sorry could not be Delete data");
}

if (array_key_exists('get_delegate_data_to_up', $_POST)) {
    $sql = "SELECT
`user`.username,
delegate.iddelegate,
delegate.`name`,
delegate.email,
delegate.nic,
delegate.telephone,
delegate.mobile,
delegate.DoB,
delegate.other,
delegate.distribution_id,
delegate.deleted,
delegate.user_iduser
FROM
delegate
INNER JOIN `user` ON delegate.user_iduser = `user`.iduser WHERE delegate.deleted ='0' AND delegate.iddelegate='{$_POST['delID']}';";
//echo $sql;
    $data = $settings->prepareSelectQueryForJSON($sql);
}

if (array_key_exists("update_delegate", $_POST)) {
    $query = "SELECT
delegate.user_iduser
FROM
delegate
WHERE
delegate.iddelegate='{$_POST['hide_id_up']}'";
    $res = mysql_query($query);
    $row = mysql_fetch_array($res);
    $uid = $row['user_iduser'];
//update_delegate: 'data',delName: delName, delUser: delUser, nic: nic, delEmail: delEmail, delMobile: delMobile, deltelephone: deltelephone, deldob: deldob, distri: distri, hide_id_up: hide_id

    $sql = "UPDATE `delegate` SET `iddelegate`='8', `name`='{$_POST['delName']}', `email`='{$_POST['delEmail']}', `nic`='{$_POST['nic']}', `telephone`='{$_POST['deltelephone']}', `mobile`='{$_POST['delMobile']}', `DoB`='{$_POST['deldob']}', `distribution_id`='{$_POST['distri']}' WHERE (`iddelegate`='{$_POST['hide_id_up']}');
";
//echo $sql;
    $update = mysql_query($sql);
    if ($update) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Updated  Delegate"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}

//////////////////product form///////////////////////
if (array_key_exists('loading_product', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT
distribution.distributionName,
product.idproduct,
product.brandName,
product.genericName,
product.wholesalePrice,
product.retailPrice,
product.packsize,
product.description,
product.distribution_id,
product.deleted
FROM
distribution
INNER JOIN product ON product.distribution_id = distribution.distributionID WHERE product.deleted ='0'
");
}

/////product for delegates view purpose only
if (array_key_exists('loading_product_delegate', $_POST)) {
    $disID;
    session_start();
    $uid = $_SESSION['user_id'];

    $sql = "  SELECT
`user`.iduser,
delegate.distribution_id
FROM
`user`
INNER JOIN delegate ON delegate.user_iduser = `user`.iduser WHERE iduser='{$uid}'";
    $res = mysql_query($sql);
    while ($row = mysql_fetch_array($res)) {
        $disID = $row['distribution_id'];
    }
    $sql2 = "SELECT
distribution.distributionName,
product.idproduct,
product.brandName,
product.genericName,
product.wholesalePrice,
product.retailPrice,
product.packsize,
product.description,
product.distribution_id,
product.deleted
FROM
distribution
INNER JOIN product ON product.distribution_id = distribution.distributionID  WHERE product.deleted ='0'AND product.distribution_id= '{$disID}'";

    $data = $settings->prepareSelectQueryForJSON($sql2);
}

if (array_key_exists('save_product', $_POST)) {

    $sql = "INSERT INTO `mydb`.`product` (`brandName`, `genericName`, `wholesalePrice`, `retailPrice`, `packsize`, `description`,`distribution_id`, `deleted`) VALUES ('{$_POST['brandName']}', '{$_POST['genName']}', '{$_POST['wholePrice']}', '{$_POST['retailPrice']}', '{$_POST['packsize']}', '{$_POST['description']}', '{$_POST['distribution']}', '0');";

    $data = mysql_query($sql);
    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add Product"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

if (array_key_exists("delete_product", $_POST)) {
    $sql = "UPDATE `product` SET `deleted`='1' WHERE `idproduct`=" . $_POST['product_id_for_delete'] . ";";
    echo $settings->prepareCommandQueryForAlertify($sql, "Successfully Deleted Product", "Sorry could not be Delete data");
}

if (array_key_exists('get_product_data_to_up', $_POST)) {
    $sql = "SELECT
product.idproduct,
product.brandName,
product.genericName,
product.wholesalePrice,
product.packsize,
product.description,
product.distribution_id,
product.retailPrice
FROM
product WHERE idproduct = '{$_POST['proID']}';";
//echo $sql;
    $data = $settings->prepareSelectQueryForJSON($sql);
}

if (array_key_exists("update_product", $_POST)) {

    $sql = "UPDATE `product` SET `brandName`='" . $_POST['brandName'] . "', `genericName`='" . $_POST['genName'] . "', `wholesalePrice`='" . $_POST['wholePrice'] . "', `packsize`='" . $_POST['packsize'] . "', `description`='" . $_POST['description'] . "', `retailPrice`='" . $_POST['retailPrice'] . "', `distribution_id`='" . $_POST['distribution'] . "' WHERE (`idproduct`='" . $_POST['hide_id_up'] . "');";

    $update = mysql_query($sql);
    if ($update) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Updated Product"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}
///////////////end of product form///////////////////////
//////////////////////manager form///////////////////////////
if (array_key_exists('loading_manager', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT `idmanager`, `name`, `telephone`, `mobile`, `DoB`, `other`, `deleted` FROM `manager` WHERE `deleted`=0");
}

if (array_key_exists('save_manager', $_POST)) {

    $sql = "INSERT INTO `manager`(`name`, `telephone`, `mobile`, `DoB`, `other`, `deleted`) VALUES ('{$_POST['ManName']}','{$_POST['ManTp']}','{$_POST['ManMob']}','{$_POST['dob']}','{$_POST['Manother']}','0');";
    $data = mysql_query($sql);
    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add  Manager"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

if (array_key_exists("delete_manager", $_POST)) {
    $sql = "UPDATE `manager` SET `deleted`='1' WHERE `idmanager`=" . $_POST['manager_id_for_delete'] . ";";
    echo $settings->prepareCommandQueryForAlertify($sql, "Successfully Deleted Manager", "Sorry could not be Delete data");
}

if (array_key_exists('get_manager_data_to_up', $_POST)) {
    $sql = "SELECT  `iddmanager` ,  `name` ,  `telephone` ,  `mobile` ,  `DoB` ,  `other` ,   `deleted` ,  `user_iduser` 
FROM  `manager` 
WHERE idmanager = '{$_POST['ManID']}';";
//echo $sql;
    $data = $settings->prepareSelectQueryForJSON($sql);
}

if (array_key_exists("update_manager", $_POST)) {

    $sql = "UPDATE `manager` SET `name`='" . $_POST['delName'] . "',`telephone`='" . $_POST['delTp'] . "',`mobile`='" . $_POST['delMob'] . "',`DoB`='" . $_POST['dob'] . "',`other`='" . $_POST['other'] . "' WHERE idmanager='" . $_POST['hide_id_up'] . "';";

    $update = mysql_query($sql);
    if ($update) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Updated Manager"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}


////////////////end of manger form//////////////////
//////////******************other utilities*************************/////////////////
if (array_key_exists("username", $_POST)) {
    $data = $settings->prepareSelectQuery("SELECT
`user`.username
FROM
`user` WHERE `user`.username ='{$_POST['username']}'");
    if (!empty($data)) {
        echo 'yes';
    } else {
        echo 'no';
    }
}


//load territory Name
if (array_key_exists("teritory_name", $_POST)) {
    $data = $settings->prepareSelectQuery("SELECT
teritory.idteritory,
teritory.`Name`
FROM
teritory ");
    if (!empty($data)) {
        foreach ($data AS $data) {
            echo '<option value="' . $data['idteritory'] . '">' . $data['Name'] . '</option>';
        }
    } else {
        echo '<option>Product Names Not Found</option>';
    }
}

if (array_key_exists("add_teritory", $_POST)) {
    //  INSERT INTO `teritory` (`distributionID`, `Name`) VALUES ('{$_POST['new_teritory']}', '{$_POST['new_teritory']}');

    $sql = " INSERT INTO `teritory` (`distributionID`, `Name`) VALUES ('{$_POST['distribution']}', '{$_POST['new_teritory']}');";

    $data = mysql_query($sql);
    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add  Manager"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

//////////******************other utilities*************************/////////////////
//////////////////////////////////////////////////start of distribution page///////////////////////////////////////
if (array_key_exists('loading_distribution', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT
distribution.distributionID,
distribution.distributionName,
distribution.telephone,
distribution.email
FROM
distribution WHERE deleted='0' AND distributionID !='0'
");
}

if (array_key_exists('save_distribution', $_POST)) {

    $sql = "INSERT INTO `distribution` (`distributionName`, `telephone`, `email`) VALUES ('{$_POST['disName']}', '{$_POST['distp']}', '{$_POST['disEmail']}');";

    $data = mysql_query($sql);

    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add Distribution"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

if (array_key_exists("delete_distribution", $_POST)) {
    $sql = "UPDATE `distribution` SET `deleted`='1' WHERE `distributionID`=" . $_POST['distribution_id_for_delete'] . ";";
    echo $settings->prepareCommandQueryForAlertify($sql, "Successfully Deleted Dristribution", "Sorry could not be Delete data");
}

if (array_key_exists('get_distribution_data_to_up', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT
distribution.distributionID,
distribution.distributionName,
distribution.telephone,
distribution.email,
distribution.deleted
FROM
distribution WHERE distribution.distributionID = '{$_POST['disID']}';");
}
if (array_key_exists("update_distribution", $_POST)) {

    $sql = "UPDATE `mydb`.`distribution` SET `distributionName`='{$_POST['disName']}', `telephone`='{$_POST['distp']}', `email`='{$_POST['disEmail']}' WHERE (`distributionID`='{$_POST['hide_id_up']}');";
    $update = mysql_query($sql);

    if ($update) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Updated Distribution"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}

if (array_key_exists("distribution_name", $_POST)) {
    $data = $settings->prepareSelectQuery("SELECT
distribution.distributionID,
distribution.distributionName
FROM
distribution WHERE deleted='0'");
    if (!empty($data)) {
        foreach ($data AS $data) {
            echo '<option value="' . $data['distributionID'] . '">' . $data['distributionName'] . '</option>';
        }
    } else {
        echo '<option>Distributions Names Not Found</option>';
    }
}

//
////////////////////////////////////////////////////start of territory page///////////////////////////////////////
if (array_key_exists('loading_territory', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT
teritory.idteritory,
teritory.`Name`,
distribution.distributionName
FROM
distribution
INNER JOIN teritory ON distribution.distributionID = teritory.distributionID
");
}
//
if (array_key_exists('save_territory', $_POST)) {
//INSERT INTO `mydb`.`teritory` (`idteritory`, `distributionID`, `Name`) VALUES ('0', '1', 'Please Select the Town');

    $sql = "INSERT INTO `teritory` (`distributionID`, `Name`) VALUES ('{$_POST['distri']}', '{$_POST['teriName']}');";

    $data = mysql_query($sql);

    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add Territory"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

if (array_key_exists("delete_territory", $_POST)) {
    $sql = "DELETE  FROM `teritory` WHERE `idteritory`=" . $_POST['territory_id_for_delete'] . ";";

    echo $settings->prepareCommandQueryForAlertify($sql, "Successfully Deleted Territory", "Sorry could not be Delete data");
}

if (array_key_exists('get_territoty_data_to_up', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT
teritory.idteritory,
teritory.distributionID,
teritory.`Name`
FROM
teritory WHERE teritory.idteritory = '{$_POST['terriID']}';");
}
if (array_key_exists("update_territory", $_POST)) {

    $sql = "UPDATE `teritory` SET  `distributionID`='{$_POST['distri']}', `Name`='{$_POST['teriName']}' WHERE (`idteritory`='{$_POST['hide_id_up']}');";

    $update = mysql_query($sql);

    if ($update) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Updated Territory"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}

///////////////////////////////////////
//*****************Charts***************//

if (array_key_exists('get_max', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT `sale` FROM `charts`");
}

///***********************quick tables**************************//

if (array_key_exists('save_quickvisit', $_POST)) {

    session_start();
    $uid = $_SESSION['user_id'];


    $sql = "INSERT INTO `mydb`.`daily_visited_territory` (`territory_id`, `visited_date`, `work_type`, `outside`, `user_id`) VALUES ( '{$_POST['territoryid']}', '{$_POST['date']}', '{$_POST['workType']}', '{$_POST['outside']}', '{$uid}');";

    $data = mysql_query($sql);

    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add Territory"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! The Town already Added"));
    }
}

if (array_key_exists('loading_doctor_quick', $_POST)) {
    $data = $settings->prepareSelectQueryForJSON("SELECT
doctor.`name`,
doctor.teritory_idteritory,
doctor.iddoctor
FROM
doctor WHERE teritory_idteritory ='{$_POST['territoryid']}'");
}

if (array_key_exists("save_doctor_quick_visited", $_POST)) {
    session_start();
    $uid = $_SESSION['user_id'];
    $sql = "INSERT INTO `daily_visited_doctors` (`date`, `visited_doc_id`, `user_id`) VALUES ('{$_POST['date2']}', '{$_POST['doctor_id_for_add']}', '{$uid}');";

    echo $settings->prepareCommandQueryForAlertify($sql, "Successfully Added Doctor", "Sorry Doctor Already Added");
}

if (array_key_exists('loading_doctor_visited', $_POST)) {
    session_start();
    $uid = $_SESSION['user_id'];
    $data = $settings->prepareSelectQueryForJSON("SELECT
doctor.`name`,
doctor.teritory_idteritory,
daily_visited_doctors.date,
daily_visited_doctors.visited_doc_id,
daily_visited_doctors.user_id
FROM
daily_visited_doctors
INNER JOIN doctor ON daily_visited_doctors.visited_doc_id = doctor.iddoctor WHERE date='{$_POST['date2']}' AND teritory_idteritory='{$_POST['territoryid']}' AND user_id ='{$uid}' ");
}

if (array_key_exists("delete_doctor_visited", $_POST)) {
    echo $settings->prepareCommandQueryForAlertify("DELETE FROM daily_visited_doctors WHERE visited_doc_id = " . $_POST['doctor_id_for_delete'], "Successfully Removed Doctor", "Sorry could not be Remove data");
}

if (array_key_exists("save_fuel", $_POST)) {
// date3: date3, official_mileage: official_mileage, private_mileage: private_mileage, fuel_amount: fuel_amount
    session_start();
    $uid = $_SESSION['user_id'];
    $sql = "INSERT INTO `fuel_expense` (`official_mileage`, `private_mileage`, `amount`, `date`, `delegate_id`) VALUES ('{$_POST['official_mileage']}', '{$_POST['private_mileage']}', '{$_POST['fuel_amount']}', '{$_POST['date3']}', '{$uid}');";
    $data = mysql_query($sql);
    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Added Fuel Report"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry You Already Added The Fuel Report Today"));
    }
}

if (array_key_exists("save_expense", $_POST)) {
// date: date, bata:bata, dsc1: dsc1, dsc2: dsc2, dsc3: dsc3,amount1:amount1,amount2:amount2,amount3:amount3
    session_start();
    $uid = $_SESSION['user_id'];

    $sql = "INSERT INTO `mydb`.`expense` (`batta`, `expense1`, `descriprion1`, `expense2`, `description2`, `expense3`, `description3`, `date`, `delegateId`) VALUES ('{$_POST['bata']}', '{$_POST['amount1']}', '{$_POST['dsc1']}', '{$_POST['amount2']}', '{$_POST['dsc2']}', '{$_POST['amount3']}', '{$_POST['dsc3']}', '{$_POST['date']}', '{$uid}');";
    $data = mysql_query($sql);
    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Added Expenses "));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry You Already Added The Expenses for Today"));
    }
}

if (array_key_exists("save_location", $_POST)) {
// save_location: 'data', lati: lati, longi: longi, address: address, today: today,time:time
    session_start();
    $uid = $_SESSION['user_id'];

    $sql = "INSERT INTO `mydb`.`location_update` (`user_id`, `latitute`, `longitude`, `address`, `date`, `time`) VALUES ('{$uid}', '{$_POST['lati']}', '{$_POST['longi']}', '{$_POST['address']}', '{$_POST['today']}', '{$_POST['time']}');";
    $data = mysql_query($sql);
    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Added Your Location"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Error Adding Your Location"));
    }
}

//// end of location update
//////////////////event form///////////////////////
if (array_key_exists('loading_events', $_POST)) {
    date_default_timezone_set("Asia/Colombo");
    $mydate = getdate();

    session_start();
    $uid = $_SESSION['user_id'];
    $data = $settings->prepareSelectQueryForJSON("
       SELECT
teritory.`Name`,
calendar.event_id,
calendar.user_id,
calendar.start_date,
calendar.end_date
FROM
calendar
INNER JOIN teritory ON calendar.territory_id = teritory.idteritory WHERE year(start_date)='{$mydate['year']}' AND month(start_date)='{$mydate['mon']}'  AND user_id='{$uid}'
");
}

if (array_key_exists('save_event', $_POST)) {
    session_start();
    $uid = $_SESSION['user_id'];
    $sql = "INSERT INTO `mydb`.`calendar` (`user_id`, `start_date`, `end_date`, `territory_id`) VALUES "
            . "('{$uid}', '{$_POST['start_date']}', '{$_POST['end_date']}', '{$_POST['teritoryID']}');";

    $data = mysql_query($sql);
    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add Event"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

if (array_key_exists("delete_event", $_POST)) {
    $sql = "DELETE from calendar WHERE `event_id`=" . $_POST['event_id_for_delete'] . ";";
    echo $settings->prepareCommandQueryForAlertify($sql, "Successfully Deleted Event", "Sorry could not be Delete data");
}

if (array_key_exists('get_event_data_to_up', $_POST)) {
    $sql = "SELECT
calendar.user_id,
calendar.start_date,
calendar.end_date,
calendar.event_id,
calendar.territory_id
FROM
calendar WHERE event_id='{$_POST['eventID']}'";
//echo $sql;
    $data = $settings->prepareSelectQueryForJSON($sql);
}


///////////////end of event form///////////////////////

if (array_key_exists("update_event", $_POST)) {

    $sql = "UPDATE `calendar` SET `start_date`='{$_POST['start_date']}', `end_date`='{$_POST['end_date']}', `territory_id`='{$_POST['teritoryID']}' WHERE (`event_id`='{$_POST['hide_id']}');";

    $update = mysql_query($sql);
    if ($update) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Updated Event"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}

/////confirm Password check
if (array_key_exists("check_password", $_POST)) {
    session_start();
    $uid = $_SESSION['user_id'];
    $sql = "SELECT
`user`.iduser,
`user`.username,
`user`.`password`,
`user`.email,
`user`.type,
`user`.deleted,
`user`.secured
FROM
`user` where `user`.iduser ='{$uid}'";
    $hashedPW;
    $rawPW = $_POST['password'];
    $sha1PW = sha1($rawPW);
    $update = mysql_query($sql);
    while ($row = mysql_fetch_array($update)) {
        $hashedPW = $row['password'];
    }

    if ($sha1PW == $hashedPW) {
        echo json_encode(array("matched" => 1));
    } else {
        echo json_encode(array("matched" => 0));
    }
}


//update password
if (array_key_exists("save_password", $_POST)) {
    session_start();
    $uid = $_SESSION['user_id'];
    $rawPW = $_POST['password'];
    $sha1PW = sha1($rawPW);
    $sql = "UPDATE `user` SET `password`='{$sha1PW}', `secured`='1' WHERE (`iduser`='{$uid}');";
    $_SESSION['secured'] = 1;
    $update = mysql_query($sql);
    if ($update) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Saved Your Password"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}
/// end of password change
//////////////////event target allocatin///////////////////////
if (array_key_exists('loading_targets', $_POST)) {
    date_default_timezone_set("Asia/Colombo");
    $nextMonth = date('Y-m', strtotime(date('Y-m') . " +1 month"));
    $thisMonth = date('Y-m', strtotime(date('Y-m')));
    
    $data = $settings->prepareSelectQueryForJSON("
       SELECT
product.brandName,
product_target.`month`,
product_target.`primary`,
product_target.redistribution,
product_target.target_id
FROM
product
INNER JOIN product_target ON product_target.pid = product.idproduct WHERE `month` ='{$thisMonth}' OR `month`='{$nextMonth}';");
}

if (array_key_exists('save_target', $_POST)) {  
     //month: month, productid: productid, primary: primary,redistribution:redistribution
    $sql = "INSERT INTO `mydb`.`product_target` ( `pid`, `month`, `primary`, `redistribution`) VALUES ('{$_POST['productid']}', '{$_POST['month']}', '{$_POST['primary']}', '{$_POST['redistribution']}');";

    $data = mysql_query($sql);
    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add Target"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

if (array_key_exists("delete_target", $_POST)) {
    $sql = "DELETE from product_target WHERE `target_id`=" . $_POST['target_id_for_delete'] . ";";
    echo $settings->prepareCommandQueryForAlertify($sql, "Successfully Deleted Target", "Sorry could not be Delete data");
}
//getting all the telephone numbers for sending sms
if (array_key_exists('get_delegate_numbers', $_POST)) {
    $sql = "SELECT
delegate.mobile
FROM
delegate WHERE delegate.distribution_id in (SELECT
 DISTINCT product.distribution_id
FROM
product_target
INNER JOIN product ON product_target.pid = product.idproduct WHERE pid='{$_POST['productid']}'";
//echo $sql;
    $data = $settings->prepareSelectQueryForJSON($sql);
}
//getting product Name
if (array_key_exists('get_product_name', $_POST)) {
    $sql = "SELECT
DISTINCT product.brandName
FROM
product_target
INNER JOIN product ON product_target.pid = product.idproduct WHERE pid='{$_POST['productid']}'";

    $data = $settings->prepareSelectQueryForJSON($sql);
}

//updating target infomation
if (array_key_exists("update_target", $_POST)) {
//primary: primary, redistribution: redistribution, month: month, hide_id: hide_id
    $sql = "UPDATE `product_target` SET  `month`='{$_POST['month']}', `primary`='{$_POST['primary']}', `redistribution`='{$_POST['redistribution']}' WHERE (`target_id`='{$_POST['hide_id']}');
";

    $update = mysql_query($sql);
    if ($update) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Updated Event"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}

//loading data for select on data table for editing
if (array_key_exists('get_target_data_to_up', $_POST)) {
    $sql = "SELECT DISTINCT
product_target.target_id,
product_target.pid,
product_target.`month`,
product_target.`primary`,
product_target.redistribution
FROM
product_target
WHERE target_id='{$_POST['targetID']}'";
//echo $sql;
    $data = $settings->prepareSelectQueryForJSON($sql);
}
///////////////end of target form///////////////////////


//////////////////event target achieved///////////////////////
if (array_key_exists('loading_targets_achieved', $_POST)) {
    date_default_timezone_set("Asia/Colombo");
    $nextMonth = date('Y-m', strtotime(date('Y-m') . " +1 month"));
    $thisMonth = date('Y-m', strtotime(date('Y-m')));
    
    $data = $settings->prepareSelectQueryForJSON("
       SELECT
achieved_target.target_id,
achieved_target.pid,
achieved_target.date,
achieved_target.`primary`,
achieved_target.redistribution,
product.brandName
FROM
achieved_target
INNER JOIN product ON achieved_target.pid = product.idproduct WHERE `date` like '{$thisMonth}%' ORDER BY date DESC,target_id DESC");
}

if (array_key_exists('save_target_achieved', $_POST)) {  
     //month: month, productid: productid, primary: primary,redistribution:redistribution
    $sql = "INSERT INTO `achieved_target` ( `pid`, `date`, `primary`, `redistribution`) VALUES ('{$_POST['productid']}', '{$_POST['date']}', '{$_POST['primary']}', '{$_POST['redistribution']}');";

    $data = mysql_query($sql);
    if ($data) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Add Target"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Save your Data"));
    }
}

if (array_key_exists("delete_target_achieved", $_POST)) {
    $sql = "DELETE from achieved_target WHERE `target_id`=" . $_POST['target_id_for_delete'] . ";";
    echo $settings->prepareCommandQueryForAlertify($sql, "Successfully Deleted Target", "Sorry could not be Delete data");
}

//updating target infomation
if (array_key_exists("update_target_achieved", $_POST)) {
//primary: primary, redistribution: redistribution, month: month, hide_id: hide_id
    $sql = "UPDATE `achieved_target` SET  `date`='{$_POST['date']}', `primary`='{$_POST['primary']}', `redistribution`='{$_POST['redistribution']}' WHERE (`target_id`='{$_POST['hide_id']}');
";

    $update = mysql_query($sql);
    if ($update) {
        echo json_encode(array("msgType" => 1, "msg" => "Successfully Updated Event"));
    } else {
        echo json_encode(array("msgType" => 2, "msg" => "Sorry ! Could not be Update your Data"));
    }
}

//loading data for select on data table for editing
if (array_key_exists('get_target_achieved_data_to_up', $_POST)) {
    $sql = "SELECT DISTINCT
achieved_target.target_id,
achieved_target.pid,
achieved_target.date,
achieved_target.`primary`,
achieved_target.redistribution
FROM
achieved_target
WHERE target_id='{$_POST['targetID']}'";
//echo $sql;
    $data = $settings->prepareSelectQueryForJSON($sql);
}
///////////////end of achived form///////////////////////
