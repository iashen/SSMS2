<?php

include("../inc/dbc.php");
include("commen_functions.php");
$settings = new settings();


if (array_key_exists('search_main', $_POST)) {

    $data = $settings->prepareSelectQueryForJSON("SELECT
emloyee.empID,
emloyee.fullName,
emloyee.preName,
emloyee.nic
FROM
emloyee WHERE emloyee.fullName like '%".$_POST['keyword']."%' OR emloyee.preName like '%".$_POST['keyword']."%' OR emloyee.nic like '%".$_POST['keyword']."%'");
}
