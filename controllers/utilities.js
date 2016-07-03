
//Confirm Dialog
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
    $('select').trigger("liszt:updated");
}

//this updates the notification counter
function refresh_notification() {

    var notification_elements = document.getElementsByClassName("notification_message");
    var count = notification_elements.length;
    $('#notification_counter').html(count.toString() + " Notifications");
}


//******************other utilities********************


//**************send sms via www.smsglobal.com**********************
//document by Isuranga Ashen 
// codeAcademy   code.edu.lk
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