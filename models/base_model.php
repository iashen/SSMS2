<?php

date_default_timezone_set("Asia/Colombo");

class settings {

    function prepareSelectQueryForJSON($query, $conn) {
        $data = array();
        $result = $conn->query($query);
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
        echo json_encode($data);
    }

    function getNextAutoIncrementID($table) {
        $result = mysql_query("SHOW TABLE STATUS LIKE '" . $table . "'");
        $row = mysql_fetch_array($result);
        return $nextId = $row['Auto_increment'];
    }

    function getFirstKey($arr) {
        reset($arr);
        return key($arr);
    }

    function prepareAjaxSelectBox($array, $value_name, $data_name, $selectedValue = false, $error_msg = ' -- No Data Found -- ') {
        if (!empty($array)) {
            foreach ($array as $data) {
                if (isset($selectedValue) && $data[$value_name] == $selectedValue) {
                    echo '<option value="' . $data[$value_name] . '" selected>' . $data[$data_name] . '</option>';
                } else {
                    echo '<option value="' . $data[$value_name] . '">' . $data[$data_name] . '</option>';
                }
            }
        } else {
            echo '<option value="0">' . $error_msg . '</option>';
        }
    }

    function autoRedict($redirectPath, $time) {
        echo '<script type="text/javascript">
		window.setTimeout(function() {
		window.location.href = "' . $redirectPath . '";
		},' . $time . ')
             </script>';
    }

    function prepareSelectQuery($query, $conn) {

        $sql = "SELECT id, firstname, lastname FROM MyGuests";
        $result = $conn->query($sql);
        $data = array();
        $result = $conn->query($query);
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
        return $data;
    }

    function prepareCommandQuery($query, $successMsg, $errorMsg) {
        $save = mysql_query($query);
        if (isset($save) && $save) {
            echo '<div class="alert alert-success">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>Success!</strong> ' . $successMsg . ' </div>';
        } else {
            echo '<div class="alert alert-danger">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>Error!</strong> ' . $errorMsg . ' </div>';
        }
    }

    function prepareCommandQueryForAlertify($query, $successMsg, $errorMsg, $conn) {
        $save = $conn->query($query);
        if (isset($save) && $save) {
            echo json_encode(array(array("msgType" => 1, "msg" => $successMsg)));
        } else {
            echo json_encode(array(array("msgType" => 2, "msg" => $errorMsg)));
        }
    }

    function prepareQueryCount($tableName) {
        $count = 0;
        $query = "SELECT COUNT(*) as count FROM " . $tableName;
        $countData = $this->getSelectQuaryForAllData($query);
        return $countData[0]['count'];
    }

    function prepareQueryCountByCondition($tableName, $colName, $colValue) {
        $count = 0;
        $query = "SELECT COUNT(*) as count FROM " . $tableName . " WHERE " . $colName . " = '" . $colValue . "'";
        return $countData[0]['count'];
    }

    function getallitemtypefor_combo() {
        $data = array();
        $result = mysql_query("SELECT
pr_emp_item_types.id,
pr_emp_item_types.name
FROM
pr_emp_item_types");
        while ($row = mysql_fetch_assoc($result)) {
            $data[] = $row;
        }
        return $data;
    }

    function getDenomination($netSalary) {

        $count = array('5000' => 0, '2000' => 0, '1000' => 0, '500' => 0, '100' => 0, '50' => 0, '20' => 0, '10' => 0, '5' => 0, '2' => 0, '1' => 0, '0.5' => 0);
        $salary = round($netSalary);

        $temp = 0;
        $temp = $salary % 5000;
        $count['5000'] = ($salary - $temp) / 5000;


        $temp = ($salary - 5000 * $count['5000']) % 2000;
        $count['2000'] = ($salary - 5000 * $count['5000'] - $temp) / 2000;

        $temp = ($salary - 5000 * $count['5000'] - 2000 * $count['2000']) % 1000;
        $count['1000'] = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - $temp) / 1000;

        $temp = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000']) % 500;
        $count['500'] = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - $temp) / 500;

        $temp = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500']) % 100;
        $count['100'] = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500'] - $temp) / 100;

        $temp = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500'] - 100 * $count['100']) % 50;
        $count['50'] = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500'] - 100 * $count['100'] - $temp) / 50;

        $temp = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500'] - 100 * $count['100'] - 50 * $count['50']) % 20;
        $count['20'] = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500'] - 100 * $count['100'] - 50 * $count['50'] - $temp) / 20;

        $temp = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500'] - 100 * $count['100'] - 50 * $count['50'] - 20 * $count['20']) % 10;
        $count['10'] = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500'] - 100 * $count['100'] - 50 * $count['50'] - 20 * $count['20'] - $temp) / 10;

        $temp = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500'] - 100 * $count['100'] - 50 * $count['50'] - 20 * $count['20'] - 10 * $count['10']) % 5;
        $count['5'] = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500'] - 100 * $count['100'] - 50 * $count['50'] - 20 * $count['20'] - 10 * $count['10'] - $temp) / 5;

        $temp = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500'] - 100 * $count['100'] - 50 * $count['50'] - 20 * $count['20'] - 10 * $count['10'] - 5 * $count['5']) % 2;
        $count['2'] = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500'] - 100 * $count['100'] - 50 * $count['50'] - 20 * $count['20'] - 10 * $count['10'] - 5 * $count['5'] - $temp) / 2;

        $temp = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500'] - 100 * $count['100'] - 50 * $count['50'] - 20 * $count['20'] - 10 * $count['10'] - 5 * $count['5'] - 2 * $count['2']) % 1;
        $count['1'] = ($salary - 5000 * $count['5000'] - 2000 * $count['2000'] - 1000 * $count['1000'] - 500 * $count['500'] - 100 * $count['100'] - 50 * $count['50'] - 20 * $count['20'] - 10 * $count['10'] - 5 * $count['5'] - 2 * $count['2'] - $temp) / 1;

        if (($netSalary - round($netSalary, 1)) > 0.5) {

            $count['0.5'] = 1;
        } else {
            $count['0.5'] = 0;
        }
        return $count;
    }

}
