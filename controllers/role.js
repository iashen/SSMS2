

function confirm(heading, question, cancelButtonTxt, okButtonTxt, callback1, callback2) {

    var confirmModal = $('<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">' + heading + '</h4>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p>' + question + '</p>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default" data-dismiss="modal" id="cancelbtn">' + cancelButtonTxt + '</button>' +
            '<button type="button" class="btn btn-primary" id="okButton">' + okButtonTxt + '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');
    confirmModal.find('#okButton').click(function (event) {
        callback1();
        confirmModal.modal('hide');
    });
    confirmModal.find('#cancelbtn').click(function (event) {
        callback2();
        confirmModal.modal('hide');
    });
    confirmModal.modal('show');
}

function refreshChosen() {
   $('select').trigger("chosen:updated");
}

//this updates the notification counter
function refresh_notification() {

    var notification_elements = document.getElementsByClassName("notification_message");
    var count = notification_elements.length;
    $('#notification_counter').html(count.toString() + " Notifications");
}

//////////////
//////////////
//////////////////
//******************other utilities********************
///////////////
//////////

//**************send sms via www.smsglobal.com**********************
//document by Isuranga Ashen 
// MDO Plus.com
//snumber - receipient's number
//message - the character limit is 120 ASCII text
function sendSMS(snumber, message) {
    var sub_number = snumber.substring(1, 10);
    var sendingNumber = "94" + sub_number;

    //--- API KEYS--
    var username = "2w7snjen";
    var password = "AJG9TNgv";
    //--replace the <spaces> by %20
    var msg = message.replace(/\s/g, "%20");
    var senddata = "http://www.smsglobal.com/http-api.php?action=sendsms&user=" + username + "&password=" + password + "&from=MDO-Plus&to=" + sendingNumber + "&text=" + msg;
    console.log(senddata);
    $.post(senddata, {}, function (data) {
        return data;
    }, "json");
}


function get_teritories() {
    $.post('view.php', {teritory_name: 'data'},
    function (data) {
        $("#teritoryID").html(data);
        refreshChosen();
    });
}
function get_today() {
    var fullDate = new Date();
    var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
    var currentDate = fullDate.getFullYear() + "/" + twoDigitMonth + "/" + fullDate.getDate();
    return currentDate;
}

function get_time() {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    return time;
}
// email validation
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test($email)) {
        return false;
    } else {
        return true;
    }
}



function role_data_table() {
    clear_company();
    var tableData;
    $.post("models/role.php", {loading_roles: 'table'}, function (e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#role_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function (index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.companyName + '</td>';
                tableData += '<td>' + data.RoleName + '</td>';
                tableData += '<td><button class="btn btn-danger delete_admin_data_com" value="' + data.roleID + '"><i class="md md-delete"></i></button> &nbsp; <button class="btn btn-success selproductData_com" value="' + data.roleID + '"><i class="md md-create"></i></button> ';
                tableData += '</tr>';
            });
            //Load Json Data to Table
            $('#role_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_admin_data_com').click(function () {
                role_id_for_delete = $(this).val();
                confirm("Deletion of Company Data", "Are you sure want to delete This Role", "No", "Yes", function () {
                    $.post("models/role.php", {delete_role: 'delete', role_id_for_delete: role_id_for_delete}, function (delMsg) {
                        $.each(delMsg, function (index, valueDel) {
                            if (valueDel.msgType === 1) {
                                swal("Deleted!", "Role has been deleted successfully ", "success");
                            } else if (valueDel.msgType === 2) {
                                swal("Something Went Wrong", "Your Data could not Deleted", "warning");
                            }
                        });
                        role_data_table();
                    }, "json");
                });
            });
            $('.selproductData_com').click(function () {
                $('#update_btn_com').show();
                $('#cancel_btn_com').show();
                $('#save_btn_com').hide();
                 roleID =($(this).val());
              

                $.post("models/role.php", {get_role_data_to_up: 'upData', roleID: roleID}, function (up) {
                    $.each(up, function (index, data) {
                        $('#companyID').val(data.companyID);                        
                        $('#roleName').val(data.RoleName);
                        $('#roleID').val(data.roleID);  
                        refreshChosen();
                    });
                }, "json");
            });
        }
    }, "json");
}
//clear company
function clear_company() {
    $('#update_btn_com').hide();
    $('#cancel_btn_com').hide();
    $('#save_btn_com').show();
    $('#companyName').val('');
    $('#companyID').val('');
    refreshChosen();
}
//role data save funtion
function role_data_save() {
    var roleName = $('#roleName').val();
    var companyID = $('#companyID').val();

    swal("Saving !", "Saving", "info");
    $.post('models/role.php', {save_role: 'data', roleName: roleName,companyID:companyID}, function (data) {
        if (data.msgType === 1) {
            swal("Added!", "Role has been added successfully ", "success");
            role_data_table();
            $("input").val("");
            refreshChosen();
        } else {
            swal("Something Went Wrong", "Your Data could not added", "warning");
        }
    }, "json");


}

function update_company_data() {
    var companyName = $('#companyName').val();
    var companyID = $('#companyID').val();


    $.post('models/role.php', {update_company: 'data', companyName: companyName, companyID: companyID},
    function (data) {
        if (data.msgType === 1) {
            swal("Updated!", "Company has been Updated successfully ", "success");
            company_data_table();
            $("input").val("");
        } else {
            swal("Something Went Wrong", "Your Data could not updated", "warning");
        }

    }, "json");
}























function distribution_data_save() {
    var disName = $('#disName').val();
    var distp = $('#disTelephone').val();
    var disEmail = $('#disEmail').val();

    $.post('view.php', {save_distribution: 'data', disName: disName, distp: distp, disEmail: disEmail}, function (data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        distribution_data_table();
        get_distribution();
        clear_distribution();
    }, "json");
}

//distribution table update
function update_distribution_data() {
    var disName = $('#disName').val();
    var distp = $('#disTelephone').val();
    var disEmail = $('#disEmail').val();
    var hide_id = $('#hidden_val_dis').val();

    $.post('view.php', {update_distribution: 'data', disName: disName, distp: distp, disEmail: disEmail, hide_id_up: hide_id},
    function (data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        distribution_data_table();
        get_distribution();
        clear_distribution();
    }, "json");
}

function get_distribution() {
    $.post('view.php', {distribution_name: 'data'},
    function (data) {
        $("#distri").html(data);
        refreshChosen();
    });
}


//load territory table 
function territory_data_table() {
    var tableData;
    $.post("view.php", {loading_territory: 'table'}, function (e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#territory_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function (index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.Name + '</td>';
                tableData += '<td>' + data.distributionName + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 delete_admin_data_teri" value="' + data.idteritory + '"><i class="fa fa-trash-o fa-lg"></i>&nbsp;</button><button class="btn btn-sm btn-alt m-r-5 selproductData_teri" value="' + data.idteritory + '"><i class="fa fa-plus-square fa-lg"></i>&nbsp;</button></td>';
                tableData += '</tr>';
            });
            //Load Json Data to Table
            $('#territory_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_admin_data_teri').click(function () {
                territory_id_for_delete = $(this).val();
                confirm("Deletion of Territory Data", "Are you sure want to delete This Territory", "No", "Yes", function () {
                    $.post("view.php", {delete_territory: 'delete', territory_id_for_delete: territory_id_for_delete}, function (delMsg) {
                        $.each(delMsg, function (index, valueDel) {
                            if (valueDel.msgType === 1) {
                                alertify.success(valueDel.msg, 3000);
                            } else if (valueDel.msgType === 2) {
                                alertify.error(valueDel.msg, 3000);
                            }
                        });
                        territory_data_table();
                    }, "json");
                });
            });
            $('.selproductData_teri').click(function () {
                $('#update_btn_teri').slideDown();
                $('#save_btn_teri').slideUp();
                $terriID = $(this).val();

                $.post("view.php", {get_territoty_data_to_up: 'upData', terriID: $terriID}, function (up) {
                    $.each(up, function (index, data) {
                        $('#distri').val(data.distributionID);
                        $('#teriName').val(data.Name);
                        $('#hidden_val_teri').val(data.idteritory);
                    });
                }, "json");
            });
        }
    }, "json");
}
//clear territory
function clear_territory() {
    $('#teriName').val('');
    $('#distri').val('');
    $('#hidden_val_teri').val('');
    $('#update_btn_teri').slideUp();
    $('#save_btn_teri').slideDown();
    // refreshChosen();
}
//territory data save funtion

function territory_data_save() {
    var teriName = $('#teriName').val();
    var distri = $('#distri').val();
    $.post('view.php', {save_territory: 'data', teriName: teriName, distri: distri}, function (data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        territory_data_table();
        clear_territory();
    }, "json");
}

//territory table update
function update_territory_data() {
    var teriName = $('#teriName').val();
    var distri = $('#distri').val();
    var hide_id = $('#hidden_val_teri').val();

    $.post('view.php', {update_territory: 'data', teriName: teriName, distri: distri, hide_id_up: hide_id},
    function (data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        territory_data_table();
        clear_territory();
    }, "json");
}
//
//function get_distribution() {
//    $.post('view.php', {distribution_name: 'data'},
//    function(data) {
//        $("#distri").html(data);
//        refreshChosen();
//    });
//}

///////////function for quick php /////////////////

function doctor_data_table_for_quick() {
    var tableData;
    var territoryid = $('#teritoryID').val();
    $.post("view.php", {loading_doctor_quick: 'table', territoryid: territoryid}, function (e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#doctor_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function (index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.name + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 selproductData" value="' + data.iddoctor + '"><i class="fa fa-plus-square fa-lg"></i>&nbsp; Visited</button></td>';
                tableData += '</tr>';
            });
            //Load Json Data to Table
            $('#doctor_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.selproductData').click(function () {
                var doctor_id_for_add = $(this).val();
                var date2 = $('#date2').val();

                $.post("view.php", {save_doctor_quick_visited: 'data', doctor_id_for_add: doctor_id_for_add, date2: date2}, function (delMsg) {
                    $.each(delMsg, function (index, valueDel) {
                        if (valueDel.msgType === 1) {
                            alertify.success(valueDel.msg, 3000);
                        } else if (valueDel.msgType === 2) {
                            alertify.error(valueDel.msg, 3000);
                        }
                    });
                }, "json");
                doctor_data_table_visited_quick();
                doctor_data_table_visited_quick();
            });

        }
    }, "json");
}


function doctor_data_table_visited_quick() {
    var tableData;
    var territoryid = $('#teritoryID').val();
    var date2 = $('#date2').val();
    $.post("view.php", {loading_doctor_visited: 'table', territoryid: territoryid, date2: date2}, function (e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#visited_table tbody').html('').append(tableData);
        } else {
            $.each(e, function (index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.name + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 deldoc" value="' + data.visited_doc_id + '"><i class="fa fa-minus-square fa-lg"></i>&nbsp; Remove</button></td>';
                tableData += '</tr>';
            });
            //Load Json Data to Table
            $('#visited_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.deldoc').click(function () {
                doctor_id_for_delete = $(this).val();
                confirm("Deletion of Doctor Data", "Are you sure want to delete This Doctor", "No", "Yes", function () {
                    $.post("view.php", {delete_doctor_visited: 'delete', doctor_id_for_delete: doctor_id_for_delete}, function (delMsg) {
                        $.each(delMsg, function (index, valueDel) {
                            if (valueDel.msgType === 1) {
                                alertify.success(valueDel.msg, 2000);
                            } else {
                                alertify.error(valueDel.msg, 2000);
                            }
                        });
                        doctor_data_table_visited_quick();
                    }, "json");
                });

            });
        }
    }, "json");
}

function save_daily_visits() {
    var date = $('#date').val();
    var territoryid = $('#teritoryID').val();
    var workType = $('#workType').val();
    var outside;
    if ($('#outside').is(':checked')) {
        outside = true;
    } else {
        outside = false;
    }

    $.post('view.php', {save_quickvisit: 'data', date: date, territoryid: territoryid, workType: workType, outside: outside}, function (data) {
        if (data.msgType === 1) {
            doctor_data_table_visited_quick();
            //update the visited table if adding success
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
    }, "json");

}

function save_daily_fuel() {
    var official_mileage = $('#mil-offi').val();
    var private_mileage = $('#mil-pri').val();
    var fuel_amount = $('#fuel_amount').val();
    var date3 = $('#date3').val();

    $.post('view.php', {save_fuel: 'data', date3: date3, official_mileage: official_mileage, private_mileage: private_mileage, fuel_amount: fuel_amount}, function (data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
    }, "json");

}

function save_expenses() {
    var bata = $('#bata').val();
    var dsc1 = $('#dsc1').val();
    var dsc2 = $('#dsc2').val();
    var dsc3 = $('#dsc3').val();
    var amount1 = $('#amount1').val();
    var amount2 = $('#amount2').val();
    var amount3 = $('#amount3').val();
    var date = $('#date4').val();
    $.post('view.php', {save_expense: 'data', date: date, bata: bata, dsc1: dsc1, dsc2: dsc2, dsc3: dsc3, amount1: amount1, amount2: amount2, amount3: amount3}, function (data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
    }, "json");
}



///event.php managing events for the calendar
function event_data_table() {
    var tableData;
    $.post("view.php", {loading_events: 'table'}, function (e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#event_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function (index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.Name + '</td>';
                tableData += '<td>' + data.start_date + '</td>';
                tableData += '<td>' + data.end_date + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 delete_admin_data" value="' + data.event_id + '"><i class="fa fa-trash-o fa-lg"></i>&nbsp;Delete</button><button class="btn btn-sm btn-alt m-r-5 selproductData" value="' + data.event_id + '"><i class="fa fa-plus-square fa-lg"></i>&nbsp;Select</button></td>';
                tableData += '</tr>';



            });
            //Load Json Data to Table
            $('#event_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_admin_data').click(function () {
                event_id_for_delete = $(this).val();
                confirm("Deletion of Event Data", "Are you sure want to delete This Event", "No", "Yes", function () {
                    $.post("view.php", {delete_event: 'delete', event_id_for_delete: event_id_for_delete}, function (delMsg) {
                        $.each(delMsg, function (index, valueDel) {
                            if (valueDel.msgType === 1) {
                                alertify.success(valueDel.msg, 3000);
                            } else if (valueDel.msgType === 2) {
                                alertify.error(valueDel.msg, 3000);
                            }
                        });
                        event_data_table();
                    }, "json");
                });
            });
            $('.selproductData').click(function () {
                $('#update_btn').slideDown();
                $('#save_btn').slideUp();
                $eventID = $(this).val();

                $.post("view.php", {get_event_data_to_up: 'upData', eventID: $eventID}, function (up) {
                    $.each(up, function (index, data) {

                        $('#teritoryID').val(data.territory_id);
                        $('#start_date').val(data.start_date);
                        $('#end_date').val(data.end_date);

                        $('#hidden_val').val(data.event_id);


                        $('#teritoryID').trigger("chosen:updated");
                    });
                }, "json");
            });
        }
    }, "json");
}

//event data save funtion
function event_data_save() {
    var teritoryID = $('#teritoryID').val();
    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();
    $.post('view.php', {save_event: 'data', teritoryID: teritoryID, start_date: start_date, end_date: end_date}, function (data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        event_data_table();
        clear_event();
    }, "json");
}

//update event
function update_event_data() {
    var teritoryID = $('#teritoryID').val();
    var start_date = $('#start_date').val();
    var end_date = $('#end_date').val();
    var hide_id = $('#hidden_val').val();

    $.post('view.php', {update_event: 'data', teritoryID: teritoryID, start_date: start_date, end_date: end_date, hide_id: hide_id},
    function (data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        event_data_table();
        clear_event();
    }, "json");
}


//clear event//
function clear_event() {
    $('#title').val('');
    $('#start_date').val('');
    $('#end_date').val('');
    $('#hidden_val').val('');
    $('#update_btn').slideUp();
    $('#save_btn').slideDown();
    // refreshChosen();
}

//password change modal trigger on notification drawer
var valid_password = true;
function confirm_password() {
    if ($('#new_password').val() === $('#confirm_password').val()) {
        $('#val_confirm_password').fadeOut();
        valid_password = true;
    } else {
        $('#val_confirm_password').fadeIn();
        valid_password = false;
    }

}

function required_password_fields() {
    if ($('#current_password').val() === '') {
        $('#val_current_password').fadeIn();
        valid_password = false;
    }
    if ($('#new_password').val() === '') {
        $('#val_new_password').fadeIn();
        valid_password = false;
    }
    if ($('#confirm_password').val() === '') {
        $('#val_confirm_password').fadeIn();
        valid_password = false;
    }
}
$('#save_changes').click(function () {
    $('.formError').fadeOut();
    confirm_password();
    required_password_fields();
    var password = $('#current_password').val();

    if (valid_password) {
        $.post('view.php', {check_password: 'data', password: password},
        function (data) {
            if (data.matched === 1) {
                save_new_password();
            } else {
                $('#val_current_password').fadeIn();
            }
        }, "json");


    }
    //    $('#modal_close').click();

});

//matching the 2 passwords on key press
$('#confirm_password').keyup(function () {
    confirm_password();
});

//clear all the fields in the modal form
function clear_user_data() {
    $('#current_password').val('');
    $('#new_password').val('');
    $('#confirm_password').val('');
    $('#modal_close').click();
}
function save_new_password() {
    var password = $('#new_password').val();
    $.post('view.php', {save_password: 'data', password: password},
    function (data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
            clear_user_data();
        } else {
            alertify.error(data.msg, 2000);
        }
        event_data_table();
        clear_event();
    }, "json");
}

//target allocation page

function target_data_table() {
    var tableData;
    $.post("view.php", {loading_targets: 'table'}, function (e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#event_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function (index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.brandName + '</td>';
                tableData += '<td>' + data.primary + '</td>';
                tableData += '<td>' + data.redistribution + '</td>';
                tableData += '<td>' + data.month + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 delete_admin_data" value="' + data.target_id + '"><i class="fa fa-trash-o fa-lg"></i>&nbsp;Delete</button><button class="btn btn-sm btn-alt m-r-5 selproductData" value="' + data.target_id + '"><i class="fa fa-plus-square fa-lg"></i>&nbsp;Select</button></td>';
                tableData += '</tr>';



            });
            //Load Json Data to Table
            $('#event_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_admin_data').click(function () {
                target_id_for_delete = $(this).val();
                confirm("Deletion of Target Data", "Are you sure want to delete This Target", "No", "Yes", function () {
                    $.post("view.php", {delete_target: 'delete', target_id_for_delete: target_id_for_delete}, function (delMsg) {
                        $.each(delMsg, function (index, valueDel) {
                            if (valueDel.msgType === 1) {
                                alertify.success(valueDel.msg, 3000);
                            } else if (valueDel.msgType === 2) {
                                alertify.error(valueDel.msg, 3000);
                            }
                        });
                        target_data_table();
                    }, "json");
                });
            });
            $('.selproductData').click(function () {
                $('#update_btn').slideDown();
                $('#save_btn').slideUp();
                $targetID = $(this).val();

                $.post("view.php", {get_target_data_to_up: 'upData', targetID: $targetID}, function (up) {
                    $.each(up, function (index, data) {

                        $('#product_id').val(data.pid);
                        $('#primary').val(data.primary);
                        $('#redistribution').val(data.redistribution);
                        $('#month').val(data.month);
                        $('#hidden_val').val(data.target_id);
                        $('#product_id').trigger("chosen:updated");
                    });
                }, "json");
            });
        }
    }, "json");
}

//target data save funtion
function target_data_save() {
    var month = $('#month').val();
    var productid = $('#product_id').val();
    var primary = $('#primary').val();
    var redistribution = $('#redistribution').val();
    var sms;
    var product_name;

    if ($('#sms').is(':checked')) {
        sms = true;
    } else {
        sms = false;
    }

    $.post('view.php', {save_target: 'data', month: month, productid: productid, primary: primary, redistribution: redistribution}, function (data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        target_data_table();
        clear_target();
    }, "json");
//getting product name
    if (sms) {
        $.post("view.php", {get_product_name: 'upData', productid: productid}, function (up) {
            $.each(up, function (index, data) {
                product_name = data.brandName;

            });
        }, "json");
        //sending sms for delegates
        confirm("Confirm Sending SMS", "Are you sure want to notify via SMS", "No", "Yes", function () {
            $.post("view.php", {get_delegate_numbers: 'upData', productid: productid}, function (up) {
                $.each(up, function (index, data) {
                    var mobile = data.mobile;
                    var mobileNum = mobile.replace('-', "");
                    var message = "Dear Delegate, The Targets of " + product_name + " for " + month + " has been changed. Primary : " + primary + ", Redistribution :  " + redistribution + ". Thank You";
                    sendSMS(mobileNum, message);
                    alertify.success("SMS Notification has sent to Delegates Successfully");
                });
            }, "json");
        });


    }

}

//update event
function update_target_data() {
    var month = $('#month').val();
    var productid = $('#product_id').val();
    var primary = $('#primary').val();
    var redistribution = $('#redistribution').val();
    var hide_id = $('#hidden_val').val();
    var sms;
    var product_name;

    if ($('#sms').is(':checked')) {
        sms = true;
    } else {
        sms = false;
    }


    $.post('view.php', {update_target: 'data', primary: primary, redistribution: redistribution, month: month, hide_id: hide_id},
    function (data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        target_data_table();
        clear_target();
    }, "json");

    //getting product name
    if (sms) {
        $.post("view.php", {get_product_name: 'upData', productid: productid}, function (up) {
            $.each(up, function (index, data) {
                product_name = data.brandName;

            });
        }, "json");
        //sending sms for delegates
        confirm("Confirm Sending SMS", "Are you sure want to notify via SMS", "No", "Yes", function () {
            $.post("view.php", {get_delegate_numbers: 'upData', productid: productid}, function (up) {
                $.each(up, function (index, data) {
                    var mobile = data.mobile;
                    var mobileNum = mobile.replace('-', "");
                    var message = "Dear Delegate, The Targets of " + product_name + " for " + month + " has been changed. Primary : " + primary + ", Redistribution :  " + redistribution + ". Thank You";
                    sendSMS(mobileNum, message);
                    alertify.success("SMS Notification has sent to Delegates Successfully");
                });
            }, "json");
        });
    }
}


//clear event//
function clear_target() {
    $('#primary').val('');
    $('#redistribution').val('');

    // refreshChosen();
}


//////////////target achived page

function achived_target_data_table() {
    var tableData;
    $.post("view.php", {loading_targets_achieved: 'table'}, function (e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#event_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function (index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.brandName + '</td>';
                tableData += '<td>' + data.primary + '</td>';
                tableData += '<td>' + data.redistribution + '</td>';
                tableData += '<td>' + data.date + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 delete_admin_data" value="' + data.target_id + '"><i class="fa fa-trash-o fa-lg"></i>&nbsp;Delete</button><button class="btn btn-sm btn-alt m-r-5 selproductData" value="' + data.target_id + '"><i class="fa fa-plus-square fa-lg"></i>&nbsp;Select</button></td>';
                tableData += '</tr>';



            });
            //Load Json Data to Table
            $('#event_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_admin_data').click(function () {
                target_id_for_delete = $(this).val();
                confirm("Deletion of Target Data", "Are you sure want to delete This Target", "No", "Yes", function () {
                    $.post("view.php", {delete_target_achieved: 'delete', target_id_for_delete: target_id_for_delete}, function (delMsg) {
                        $.each(delMsg, function (index, valueDel) {
                            if (valueDel.msgType === 1) {
                                alertify.success(valueDel.msg, 3000);
                            } else if (valueDel.msgType === 2) {
                                alertify.error(valueDel.msg, 3000);
                            }
                        });
                        achived_target_data_table();
                    }, "json");
                });
            });
            $('.selproductData').click(function () {
                $('#update_btn').slideDown();
                $('#save_btn').slideUp();
                $targetID = $(this).val();

                $.post("view.php", {get_target_achieved_data_to_up: 'upData', targetID: $targetID}, function (up) {
                    $.each(up, function (index, data) {

                        $('#product_id').val(data.pid);
                        $('#primary').val(data.primary);
                        $('#redistribution').val(data.redistribution);
                        $('#date').val(data.date);
                        $('#hidden_val').val(data.target_id);
                        $('#product_id').trigger("chosen:updated");
                    });
                }, "json");
            });
        }
    }, "json");
}

//target data save funtion
function achieved_target_data_save() {
    var date = $('#date').val();
    var productid = $('#product_id').val();
    var primary = $('#primary').val();
    var redistribution = $('#redistribution').val();




    $.post('view.php', {save_target_achieved: 'data', date: date, productid: productid, primary: primary, redistribution: redistribution}, function (data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        achived_target_data_table();
        achieved_clear_target();
    }, "json");


}

//update target
function achieved_update_target_data() {
    var date = $('#date').val();
    var productid = $('#product_id').val();
    var primary = $('#primary').val();
    var redistribution = $('#redistribution').val();
    var hide_id = $('#hidden_val').val();



    $.post('view.php', {update_target_achieved: 'data', primary: primary, redistribution: redistribution, date: date, hide_id: hide_id},
    function (data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        achived_target_data_table();
        achieved_clear_target();
    }, "json");


}


//clear event//
function achieved_clear_target() {
    $('#primary').val('');
    $('#redistribution').val('');
    // refreshChosen();
}
