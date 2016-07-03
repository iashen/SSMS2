

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
    confirmModal.find('#okButton').click(function(event) {
        callback1();
        confirmModal.modal('hide');
    });
    confirmModal.find('#cancelbtn').click(function(event) {
        callback2();
        confirmModal.modal('hide');
    });
    confirmModal.modal('show');
}

function refreshChosen() {
    $('select').trigger("liszt:updated");
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
    $.post(senddata, {}, function(data) {
        return data;
    }, "json");
}


function get_teritories() {
    $.post('view.php', {teritory_name: 'data'},
    function(data) {
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


/////---------------------------medical delegate management system for GS---------------------------------////
//////////////////////doctor form///////////////////////////////

//load doctor table 
function doctor_data_table() {
    var tableData;
    $.post("view.php", {loading_doctor: 'table'}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#doctor_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.name + '</td>';
                tableData += '<td>' + data.speciality + '</td>';
                tableData += '<td>' + data.telephone + '</td>';
                tableData += '<td>' + data.teritory + '</td>';
                tableData += '<td>' + data.DoB + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 delete_admin_data" value="' + data.iddoctor + '"><i class="fa fa-trash-o fa-lg"></i>&nbsp;Delete</button><button class="btn btn-sm btn-alt m-r-5 selproductData" value="' + data.iddoctor + '"><i class="fa fa-plus-square fa-lg"></i>&nbsp;Select</button></td>';
                tableData += '</tr>';
            });
            //Load Json Data to Table
            $('#doctor_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_admin_data').click(function() {
                doctor_id_for_delete = $(this).val();
                confirm("Deletion of Doctor Data", "Are you sure want to delete This Doctor", "No", "Yes", function() {
                    $.post("view.php", {delete_doctor: 'delete', doctor_id_for_delete: doctor_id_for_delete}, function(delMsg) {
                        $.each(delMsg, function(index, valueDel) {
                            if (valueDel.msgType === 1) {
                                alertify.success(valueDel.msg, 3000);
                            } else if (valueDel.msgType === 2) {
                                alertify.error(valueDel.msg, 3000);
                            }
                        });
                        doctor_data_table();
                    }, "json");
                });
            });
            $('.selproductData').click(function() {
                $('#update_btn').slideDown();
                $('#save_btn').slideUp();
                $docID = $(this).val();
                console.log($docID);
                $.post("view.php", {get_doctor_data_to_up: 'upData', docID: $docID}, function(up) {
                    $.each(up, function(index, data) {
                        $('#docName').val(data.name);
                        $('#spec').val(data.speciality);
                        $('#dob').val(data.DoB);
                        $('#teritoryID').val(data.teritory_idteritory);
                        $('#hidden_val').val(data.iddoctor);
                        $('#telephone').val(data.telephone);
                        $('#spec').trigger("chosen:updated");

                    });
                }, "json");
            });
        }
    }, "json");
}

//doctor data for view purpose
function doctor_view_data_table() {
    var tableData;
    $.post("view.php", {loading_doctor_view: 'table'}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#doctor_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
                tableData += '<tr>';
                tableData += '<td> Dr. ' + data.name + '</td>';
                tableData += '<td>' + data.speciality + '</td>';
                tableData += '<td>' + data.telephone + '</td>';
                tableData += '<td>' + data.teritory + '</td>';
                tableData += '<td>' + data.DoB + '</td>';
                tableData += '</tr>';
            });
            //Load Json Data to Table
            $('#doctor_data_table tbody').html('').append(tableData);

        }
    }, "json");
}
//doctor data save funtion

function doctor_view_data_save() {
    var docName = $('#docName').val();
    var spec = $('#spec').val();
    var dob = $('#dob').val();
    var teritoryID = $('#teritoryID').val();
    var telephone = $('#telephone').val();

    $.post('view.php', {save_doctor: 'data', docName: docName, spec: spec, dob: dob, teritoryID: teritoryID, telephone: telephone}, function(data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        doctor_data_table();
        clear_doctor();
    }, "json");
}

//doctor table update
function update_doctor_data() {
    var docName = $('#docName').val();
    var spec = $('#spec').val();
    var dob = $('#dob').val();
    var teritoryID = $('#teritoryID').val();
    var telephone = $('#telephone').val();
    var hide_id = $('#hidden_val').val();

    $.post('view.php', {update_doctor: 'data', docName: docName, spec: spec, dob: dob, teritoryID: teritoryID, telephone: telephone, hide_id_up: hide_id},
    function(data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        doctor_data_table();
        clear_doctor();
    }, "json");
}



function clear_doctor() {
    $('#update_btn').slideUp();
    $('#save_btn').slideDown();
    $('#docName').val('');
    $('#spec').val('0');
    $('#dob').val('');
    $('#telephone').val('');
    $('#teritoryID').val('0');
    refreshChosen();


}
///////////////////////////////////////end of doctor form/////////////////////////

///////////////////////////////delegate form////////////////////////////////////////

//delegate data table load/////////
function delegate_data_table() {
    var tableData;
    $.post("view.php", {loading_delegate: 'table'}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#delegate_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.name + '</td>';
                tableData += '<td>' + data.username + '</td>';
                tableData += '<td>' + data.nic + '</td>';
                tableData += '<td>' + data.email + '</td>';
                tableData += '<td>' + data.telephone + '</td>';
                tableData += '<td>' + data.mobile + '</td>';
                tableData += '<td>' + data.DoB + '</td>';
                tableData += '<td>' + data.distributionName + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 delete_admin_data" value="' + data.iddelegate + '"><i class="fa fa-trash-o fa-lg"></i>&nbsp;Delete</button><button class="btn btn-sm btn-alt m-r-5 selproductData" value="' + data.iddelegate + '"><i class="fa fa-plus-square fa-lg"></i>&nbsp;Select</button></td>';
                tableData += '</tr>';
                console.log(data.iddelegate);
            });
            //Load Json Data to Table
            $('#delegate_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_admin_data').click(function() {
                delegate_id_for_delete = $(this).val();
                confirm("Deletion of Delegate Data", "Are you sure want to delete This Delegate", "No", "Yes", function() {
                    $.post("view.php", {delete_delegate: 'delete', delegate_id_for_delete: delegate_id_for_delete}, function(delMsg) {
                        $.each(delMsg, function(index, valueDel) {
                            if (valueDel.msgType === 1) {
                                alertify.success(valueDel.msg, 3000);
                            } else if (valueDel.msgType === 2) {
                                alertify.error(valueDel.msg, 3000);
                            }
                        });
                        delegate_data_table();
                    }, "json");
                });
            });
            $('.selproductData').click(function() {
                $('#update_btn').slideDown();
                $('#save_btn').slideUp();
                $delID = $(this).val();
                console.log($delID);
                $.post("view.php", {get_delegate_data_to_up: 'upData', delID: $delID}, function(up) {
                    $.each(up, function(index, data) {
                        $('#delName').val(data.name);
                        $('#delUser').val(data.username);
                        $('#nic').val(data.nic);
                        $('#delEmail').val(data.email);
                        $('#delMobile').val(data.mobile);
                        $('#deltelephone').val(data.telephone);
                        $('#deldob').val(data.DoB);
                        $('#distri').val(data.distribution_id);
                        $('#hidden_val').val(data.iddelegate);
                        $(".select").trigger("chosen:updated");
                        scrollTo(0, 0);
                    });
                }, "json");
            });
        }
    }, "json");
}

//delegate data save funtion
function delegate_data_save() {
    /*
     *  $('#delName').val(data.name);
     $('#delUser').val(data.username);
     $('#nic').val(data.nic);
     $('#delEmail').val(data.email);
     $('#delMobile').val(data.mobile);
     $('#deldob').val(data.DoB);
     $('#distri').val(data.distribution_id);
     $('#hidden_val').val(data.iddelegate);
     * 
     */

    var delName = $('#delName').val();
    var delUser = $('#delUser').val();
    var nic = $('#nic').val();
    var delEmail = $('#delEmail').val();
    var delMobile = $('#delMobile').val();
    var deltelephone = $('#deltelephone').val();
    var deldob = $('#deldob').val();
    var distri = $('#distri').val();
    $.post('view.php', {save_delegate: 'data', delName: delName, delUser: delUser, nic: nic, delEmail: delEmail, delMobile: delMobile, deltelephone: deltelephone, deldob: deldob, distri: distri}, function(data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        delegate_data_table();
        clear_delegate();
    }, "json");
}

//update delegate
function update_delegate_data() {
    var delName = $('#delName').val();
    var delUser = $('#delUser').val();
    var nic = $('#nic').val();
    var delEmail = $('#delEmail').val();
    var delMobile = $('#delMobile').val();
    var deltelephone = $('#deltelephone').val();
    var deldob = $('#deldob').val();
    var distri = $('#distri').val();
    var hide_id = $('#hidden_val').val();
    $.post('view.php', {update_delegate: 'data', delName: delName, delUser: delUser, nic: nic, delEmail: delEmail, delMobile: delMobile, deltelephone: deltelephone, deldob: deldob, distri: distri, hide_id_up: hide_id},
    function(data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        delegate_data_table();
        clear_delegate();
    }, "json");
}


//clear delegate//
function clear_delegate() {
    $('#update_btn').slideUp();
    $('#save_btn').slideDown();
    $('#delName').val('');
    $('#delUser').val('');
    $('#nic').val('');
    $('#delEmail').val('');
    $('#delMobile').val('');
    $('#deltelephone').val('');
    $('#deldob').val('');
    $('#distri').val('0');
    $('#hidden_val').val('');
    refreshChosen();
}
//////////////////////////////end of delegate form////////////////////////////////

//////////////start product form///////////////////////////
//product data table load/////////
function product_data_table() {
    var tableData;
    $.post("view.php", {loading_product: 'table'}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#product_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.brandName + '</td>';
                tableData += '<td>' + data.genericName + '</td>';
                tableData += '<td class="text-right">' + "Rs.   " + data.wholesalePrice + '</td>';
                tableData += '<td class="text-right">' + "Rs.   " + data.retailPrice + '</td>';
                tableData += '<td>' + data.packsize + '</td>';
                tableData += '<td>' + data.distributionName + '</td>';
                tableData += '<td>' + data.description + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 delete_admin_data" value="' + data.idproduct + '"><i class="fa fa-trash-o fa-lg"></i>&nbsp;Delete</button><button class="btn btn-sm btn-alt m-r-5 selproductData" value="' + data.idproduct + '"><i class="fa fa-plus-square fa-lg"></i>&nbsp;Select</button></td>';
                tableData += '</tr>';



            });
            //Load Json Data to Table
            $('#product_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_admin_data').click(function() {
                product_id_for_delete = $(this).val();
                confirm("Deletion of Product Data", "Are you sure want to delete This Product", "No", "Yes", function() {
                    $.post("view.php", {delete_product: 'delete', product_id_for_delete: product_id_for_delete}, function(delMsg) {
                        $.each(delMsg, function(index, valueDel) {
                            if (valueDel.msgType === 1) {
                                alertify.success(valueDel.msg, 3000);
                            } else if (valueDel.msgType === 2) {
                                alertify.error(valueDel.msg, 3000);
                            }
                        });
                        product_data_table();
                    }, "json");
                });
            });
            $('.selproductData').click(function() {
                $('#update_btn').slideDown();
                $('#save_btn').slideUp();
                $proID = $(this).val();

                $.post("view.php", {get_product_data_to_up: 'upData', proID: $proID}, function(up) {
                    $.each(up, function(index, data) {

                        $('#brandName').val(data.brandName);
                        $('#genName').val(data.genericName);
                        $('#wholePrice').val(data.wholesalePrice);
                        $('#retailPrice').val(data.retailPrice);
                        $('#packsize').val(data.packsize);
                        $('#description').val(data.description);
                        $('#hidden_val').val(data.idproduct);
                        $('#distri').val(data.distribution_id);
                        scrollTo(0, 0);
                        //  refreshChosen();
                    });
                }, "json");
            });
        }
    }, "json");
}
////product data table for view purpose
function product_view_table() {
    var tableData;
    $.post("view.php", {loading_product: 'table'}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#product_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.brandName + '</td>';
                tableData += '<td>' + data.genericName + '</td>';
                tableData += '<td class="text-right">' + "Rs.   " + data.wholesalePrice + '</td>';
                tableData += '<td class="text-right">' + "Rs.   " + data.retailPrice + '</td>';
                tableData += '<td>' + data.packsize + '</td>';
                tableData += '<td>' + data.distributionName + '</td>';
                tableData += '<td>' + data.description + '</td>';
                tableData += '</tr>';



            });
            //Load Json Data to Table
            $('#product_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_admin_data').click(function() {
                product_id_for_delete = $(this).val();
                confirm("Deletion of Product Data", "Are you sure want to delete This Product", "No", "Yes", function() {
                    $.post("view.php", {delete_product: 'delete', product_id_for_delete: product_id_for_delete}, function(delMsg) {
                        $.each(delMsg, function(index, valueDel) {
                            if (valueDel.msgType === 1) {
                                alertify.success(valueDel.msg, 3000);
                            } else if (valueDel.msgType === 2) {
                                alertify.error(valueDel.msg, 3000);
                            }
                        });
                        product_data_table();
                    }, "json");
                });
            });
            $('.selproductData').click(function() {
                $('#update_btn').slideDown();
                $('#save_btn').slideUp();
                $proID = $(this).val();

                $.post("view.php", {get_product_data_to_up: 'upData', proID: $proID}, function(up) {
                    $.each(up, function(index, data) {

                        $('#brandName').val(data.brandName);
                        $('#genName').val(data.genericName);
                        $('#wholePrice').val(data.wholesalePrice);
                        $('#retailPrice').val(data.retailPrice);
                        $('#packsize').val(data.packsize);
                        $('#description').val(data.description);
                        $('#hidden_val').val(data.idproduct);
                        $('#distri').val(data.distribution_id);
                        scrollTo(0, 0);
                        //  refreshChosen();
                    });
                }, "json");
            });
        }
    }, "json");
}
///save product data
function save_product_data() {

    var brandName = $('#brandName').val();
    var genName = $('#genName').val();
    var wholePrice = $('#wholePrice').val();
    var retailPrice = $('#retailPrice').val();
    var packsize = $('#packsize').val();
    var description = $('#description').val();
    var distribution = $('#distri').val();
    $.post('view.php', {save_product: 'data', brandName: brandName, genName: genName, wholePrice: wholePrice, retailPrice: retailPrice, packsize: packsize, description: description, distribution: distribution}, function(data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        product_data_table();
        clear_product();
    }, "json");
}

/////product data table for delegates
function product_delegate_data_table() {
    var tableData;
    $.post("view.php", {loading_product_delegate: 'table'}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#product_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.brandName + '</td>';
                tableData += '<td>' + data.genericName + '</td>';
                tableData += '<td class="text-right">' + "Rs.   " + data.wholesalePrice + '</td>';
                tableData += '<td class="text-right">' + "Rs.   " + data.retailPrice + '</td>';
                tableData += '<td>' + data.packsize + '</td>';
                tableData += '<td>' + data.description + '</td>';
                tableData += '</tr>';



            });
            //Load Json Data to Table
            $('#product_data_table tbody').html('').append(tableData);


        }
    }, "json");
}





//product data save funtion
function product_delegate_data_save() {
    var brandName = $('#brandName').val();
    var genName = $('#genName').val();
    var wholePrice = $('#wholePrice').val();
    var retailPrice = $('#retailPrice').val();
    var packsize = $('#packsize').val();
    var description = $('#description').val();
    var distribution = $('#distri').val();
    $.post('view.php', {save_product: 'data', brandName: brandName, genName: genName, wholePrice: wholePrice, retailPrice: retailPrice, packsize: packsize, description: description, distribution: distribution}, function(data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        product_data_table();
        clear_product();
    }, "json");
}

//update product
function update_product_data() {
    var brandName = $('#brandName').val();
    var genName = $('#genName').val();
    var wholePrice = $('#wholePrice').val();
    var retailPrice = $('#retailPrice').val();
    var packsize = $('#packsize').val();
    var description = $('#description').val();
    var hide_id = $('#hidden_val').val();
    var distribution = $('#distri').val();
    $.post('view.php', {update_product: 'data', brandName: brandName, genName: genName, wholePrice: wholePrice, retailPrice: retailPrice, hide_id_up: hide_id, packsize: packsize, description: description, distribution: distribution},
    function(data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        product_data_table();
        clear_product();
    }, "json");
}


//clear product//
function clear_product() {
    $('#brandName').val('');
    $('#genName').val('');
    $('#wholePrice').val('');
    $('#retailPrice').val('');
    $('#packsize').val('');
    $('#description').val('');
    $('#hidden_val').val('');
    $('#update_btn').slideUp();
    $('#save_btn').slideDown();
    // refreshChosen();
}

//////////////end of product form/////////////////////////

///////////////////////////////manager form////////////////////////////////////////

//manager data table load/////////
function manager_data_table() {
    var tableData;
    $.post("view.php", {loading_manager: 'table'}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#manager_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.name + '</td>';
                tableData += '<td>' + data.mobile + '</td>';
                tableData += '<td>' + data.telephone + '</td>';
                tableData += '<td>' + data.DoB + '</td>';
                tableData += '<td>' + data.other + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 delete_admin_data" value="' + data.idmanager + '"><i class="fa fa-trash-o fa-lg"></i>&nbsp;Delete</button><button class="btn btn-sm btn-alt m-r-5 selproductData" value="' + data.idmanager + '"><i class="fa fa-plus-square fa-lg"></i>&nbsp;Select</button></td>';
                tableData += '</tr>';

            });
            //Load Json Data to Table
            $('#manager_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_admin_data').click(function() {
                manager_id_for_delete = $(this).val();
                confirm("Deletion of Delegate Data", "Are you sure want to delete This Manager", "No", "Yes", function() {
                    $.post("view.php", {delete_manager: 'delete', manager_id_for_delete: manager_id_for_delete}, function(delMsg) {
                        $.each(delMsg, function(index, valueDel) {
                            if (valueDel.msgType === 1) {
                                alertify.success(valueDel.msg, 3000);
                            } else if (valueDel.msgType === 2) {
                                alertify.error(valueDel.msg, 3000);
                            }
                        });
                        manager_data_table();
                    }, "json");
                });
            });
            $('.selproductData').click(function() {
                $('#update_btn').slideDown();
                $('#save_btn').slideUp();
                $ManID = $(this).val();
                console.log($ManID);
                $.post("view.php", {get_manager_data_to_up: 'upData', ManID: $ManID}, function(up) {
                    $.each(up, function(index, data) {
                        $('#ManName').val(data.name);
                        $('#ManTP').val(data.telephone);
                        $('#ManMob').val(data.mobile);
                        $('#dob').val(data.DoB);
                        $('#Manother').val(data.other);
                        $('#hidden_val').val(data.idmanager);

                        refreshChosen();
                    });
                }, "json");
            });
        }
    }, "json");
}

//delegate data save funtion
function manager_data_save() {
    var ManName = $('#ManName').val();
    var ManTp = $('#ManTP').val();
    var ManMob = $('#ManMob').val();
    var Manother = $('#Manother').val();
    var dob = $('#dob').val();
    $.post('view.php', {save_manager: 'data', ManName: ManName, ManTp: ManTp, ManMob: ManMob, Manother: Manother, dob: dob}, function(data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        manager_data_table();
        clear_delegate();
    }, "json");
}

//update delegate
function update_manage_data() {
    var ManName = $('#ManName').val();
    var ManTp = $('#ManTP').val();
    var ManMob = $('#ManMob').val();
    var Manother = $('#Manother').val();
    var dob = $('#dob').val();

    var hide_id = $('#hidden_val').val();
    $.post('view.php', {update_delegate: 'data', delName: delName, delTp: delTp, delMob: delMob, dob: dob, teritoryID: teritoryID, other: other, hide_id_up: hide_id},
    function(data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        delegate_data_table();
        clear_delegate();
    }, "json");
}


//clear delegate//

//////////////////////////////end of delegate form////////////////////////////////


////////////////////////territory page////////////////////
function add_teritories() {

    var new_teritory = $('#new_teritory').val();
    var distribution = $('#distributionID').val();

    $.post('view.php', {add_teritory: 'data', new_teritory: new_teritory, distribution: distribution}, function(data) {
        if (data.msgType === 1) {
            alertify.success(data.msg, 2000);
        } else {
            alertify.error(data.msg, 2000);
        }
        get_teritories();
    }, "json");
}

/////////////////////////////////distribution page/////////////////////////////
//load distribution table 
function distribution_data_table() {
    var tableData;
    $.post("view.php", {loading_distribution: 'table'}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#distribution_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.distributionName + '</td>';
                tableData += '<td>' + data.telephone + '</td>';
                tableData += '<td>' + data.email + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt  delete_admin_data_dis" value="' + data.distributionID + '"><i class="fa fa-trash-o fa-lg"></i>&nbsp;Delete</button><button class="btn btn-sm btn-alt  selproductData_dis" value="' + data.distributionID + '"><i class="fa fa-plus-square fa-lg"></i>&nbsp;Select</button></td>';
                tableData += '</tr>';
            });
            //Load Json Data to Table
            $('#distribution_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_admin_data_dis').click(function() {
                distribution_id_for_delete = $(this).val();
                confirm("Deletion of Distribution Data", "Are you sure want to delete This Distribution", "No", "Yes", function() {
                    $.post("view.php", {delete_distribution: 'delete', distribution_id_for_delete: distribution_id_for_delete}, function(delMsg) {
                        $.each(delMsg, function(index, valueDel) {
                            if (valueDel.msgType === 1) {
                                alertify.success(valueDel.msg, 3000);
                            } else if (valueDel.msgType === 2) {
                                alertify.error(valueDel.msg, 3000);
                            }
                        });
                        distribution_data_table();
                    }, "json");
                });
            });
            $('.selproductData_dis').click(function() {
                $('#update_btn_dis').slideDown();
                $('#save_btn_dis').slideUp();
                $disID = $(this).val();

                $.post("view.php", {get_distribution_data_to_up: 'upData', disID: $disID}, function(up) {
                    $.each(up, function(index, data) {
                        $('#disName').val(data.distributionName);
                        $('#disTelephone').val(data.telephone);
                        $('#disEmail').val(data.email);
                        $('#hidden_val_dis').val(data.distributionID);

                    });
                }, "json");
            });
        }
    }, "json");
}
//clear distribution
function clear_distribution() {
    $('#disName').val('');
    $('#disTelephone').val('');
    $('#disEmail').val('');
    $('#hidden_val_dis').val('');
    $('#update_btn_dis').slideUp();
    $('#save_btn_dis').slideDown();
    // refreshChosen();
}
//doctor data save funtion

function distribution_data_save() {
    var disName = $('#disName').val();
    var distp = $('#disTelephone').val();
    var disEmail = $('#disEmail').val();

    $.post('view.php', {save_distribution: 'data', disName: disName, distp: distp, disEmail: disEmail}, function(data) {
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
    function(data) {
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
    function(data) {
        $("#distri").html(data);
        refreshChosen();
    });
}


//load territory table 
function territory_data_table() {
    var tableData;
    $.post("view.php", {loading_territory: 'table'}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#territory_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.Name + '</td>';
                tableData += '<td>' + data.distributionName + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 delete_admin_data_teri" value="' + data.idteritory + '"><i class="fa fa-trash-o fa-lg"></i>&nbsp;</button><button class="btn btn-sm btn-alt m-r-5 selproductData_teri" value="' + data.idteritory + '"><i class="fa fa-plus-square fa-lg"></i>&nbsp;</button></td>';
                tableData += '</tr>';
            });
            //Load Json Data to Table
            $('#territory_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_admin_data_teri').click(function() {
                territory_id_for_delete = $(this).val();
                confirm("Deletion of Territory Data", "Are you sure want to delete This Territory", "No", "Yes", function() {
                    $.post("view.php", {delete_territory: 'delete', territory_id_for_delete: territory_id_for_delete}, function(delMsg) {
                        $.each(delMsg, function(index, valueDel) {
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
            $('.selproductData_teri').click(function() {
                $('#update_btn_teri').slideDown();
                $('#save_btn_teri').slideUp();
                $terriID = $(this).val();

                $.post("view.php", {get_territoty_data_to_up: 'upData', terriID: $terriID}, function(up) {
                    $.each(up, function(index, data) {
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
    $.post('view.php', {save_territory: 'data', teriName: teriName, distri: distri}, function(data) {
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
    function(data) {
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
    $.post("view.php", {loading_doctor_quick: 'table', territoryid: territoryid}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#doctor_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.name + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 selproductData" value="' + data.iddoctor + '"><i class="fa fa-plus-square fa-lg"></i>&nbsp; Visited</button></td>';
                tableData += '</tr>';
            });
            //Load Json Data to Table
            $('#doctor_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.selproductData').click(function() {
                var doctor_id_for_add = $(this).val();
                var date2 = $('#date2').val();

                $.post("view.php", {save_doctor_quick_visited: 'data', doctor_id_for_add: doctor_id_for_add, date2: date2}, function(delMsg) {
                    $.each(delMsg, function(index, valueDel) {
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
    $.post("view.php", {loading_doctor_visited: 'table', territoryid: territoryid, date2: date2}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#visited_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.name + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 deldoc" value="' + data.visited_doc_id + '"><i class="fa fa-minus-square fa-lg"></i>&nbsp; Remove</button></td>';
                tableData += '</tr>';
            });
            //Load Json Data to Table
            $('#visited_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.deldoc').click(function() {
                doctor_id_for_delete = $(this).val();
                confirm("Deletion of Doctor Data", "Are you sure want to delete This Doctor", "No", "Yes", function() {
                    $.post("view.php", {delete_doctor_visited: 'delete', doctor_id_for_delete: doctor_id_for_delete}, function(delMsg) {
                        $.each(delMsg, function(index, valueDel) {
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

    $.post('view.php', {save_quickvisit: 'data', date: date, territoryid: territoryid, workType: workType, outside: outside}, function(data) {
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

    $.post('view.php', {save_fuel: 'data', date3: date3, official_mileage: official_mileage, private_mileage: private_mileage, fuel_amount: fuel_amount}, function(data) {
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
    $.post('view.php', {save_expense: 'data', date: date, bata: bata, dsc1: dsc1, dsc2: dsc2, dsc3: dsc3, amount1: amount1, amount2: amount2, amount3: amount3}, function(data) {
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
    $.post("view.php", {loading_events: 'table'}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#event_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
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
            $('.delete_admin_data').click(function() {
                event_id_for_delete = $(this).val();
                confirm("Deletion of Event Data", "Are you sure want to delete This Event", "No", "Yes", function() {
                    $.post("view.php", {delete_event: 'delete', event_id_for_delete: event_id_for_delete}, function(delMsg) {
                        $.each(delMsg, function(index, valueDel) {
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
            $('.selproductData').click(function() {
                $('#update_btn').slideDown();
                $('#save_btn').slideUp();
                $eventID = $(this).val();

                $.post("view.php", {get_event_data_to_up: 'upData', eventID: $eventID}, function(up) {
                    $.each(up, function(index, data) {

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
    $.post('view.php', {save_event: 'data', teritoryID: teritoryID, start_date: start_date, end_date: end_date}, function(data) {
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
    function(data) {
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
$('#save_changes').click(function() {
    $('.formError').fadeOut();
    confirm_password();
    required_password_fields();
    var password = $('#current_password').val();

    if (valid_password) {
        $.post('view.php', {check_password: 'data', password: password},
        function(data) {
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
$('#confirm_password').keyup(function() {
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
    function(data) {
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
    $.post("view.php", {loading_targets: 'table'}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#event_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
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
            $('.delete_admin_data').click(function() {
                target_id_for_delete = $(this).val();
                confirm("Deletion of Target Data", "Are you sure want to delete This Target", "No", "Yes", function() {
                    $.post("view.php", {delete_target: 'delete', target_id_for_delete: target_id_for_delete}, function(delMsg) {
                        $.each(delMsg, function(index, valueDel) {
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
            $('.selproductData').click(function() {
                $('#update_btn').slideDown();
                $('#save_btn').slideUp();
                $targetID = $(this).val();

                $.post("view.php", {get_target_data_to_up: 'upData', targetID: $targetID}, function(up) {
                    $.each(up, function(index, data) {

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

    $.post('view.php', {save_target: 'data', month: month, productid: productid, primary: primary, redistribution: redistribution}, function(data) {
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
        $.post("view.php", {get_product_name: 'upData', productid: productid}, function(up) {
            $.each(up, function(index, data) {
                product_name = data.brandName;

            });
        }, "json");
        //sending sms for delegates
        confirm("Confirm Sending SMS", "Are you sure want to notify via SMS", "No", "Yes", function() {
            $.post("view.php", {get_delegate_numbers: 'upData', productid: productid}, function(up) {
                $.each(up, function(index, data) {
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
    function(data) {
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
        $.post("view.php", {get_product_name: 'upData', productid: productid}, function(up) {
            $.each(up, function(index, data) {
                product_name = data.brandName;

            });
        }, "json");
        //sending sms for delegates
        confirm("Confirm Sending SMS", "Are you sure want to notify via SMS", "No", "Yes", function() {
            $.post("view.php", {get_delegate_numbers: 'upData', productid: productid}, function(up) {
                $.each(up, function(index, data) {
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
    $.post("view.php", {loading_targets_achieved: 'table'}, function(e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#event_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function(index, data) {
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
            $('.delete_admin_data').click(function() {
                target_id_for_delete = $(this).val();
                confirm("Deletion of Target Data", "Are you sure want to delete This Target", "No", "Yes", function() {
                    $.post("view.php", {delete_target_achieved: 'delete', target_id_for_delete: target_id_for_delete}, function(delMsg) {
                        $.each(delMsg, function(index, valueDel) {
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
            $('.selproductData').click(function() {
                $('#update_btn').slideDown();
                $('#save_btn').slideUp();
                $targetID = $(this).val();

                $.post("view.php", {get_target_achieved_data_to_up: 'upData', targetID: $targetID}, function(up) {
                    $.each(up, function(index, data) {

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
    

    

    $.post('view.php', {save_target_achieved: 'data', date: date, productid: productid, primary: primary, redistribution: redistribution}, function(data) {
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
    function(data) {
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
