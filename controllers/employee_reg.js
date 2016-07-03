

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
    $("select").trigger("chosen:updated");
}
function validate_employee_data() {

}

function employee_data_save() {
    var job = $('#job').val();
    var empID = $('#employeeID').val();
    var fullname = $('#fullName').val();
    var start_date = $('#start_date').val();
    var welfare;
    var fullname = $('#fullName').val();
    var preferName = $('#preferName').val();
    var p_address = $('#p_address').val();
    var c_address = $('#c_address').val();
    var mobile = $('#mobile').val();
    var telephone = $('#telephone').val();
    var dob = $('#dob').val();
    var nationality = $('#nationality').val();
    var district = $('#district').val();
    var nic = $('#nic').val();
    var marital = $('#marital').val();
    var gender = $('#gender').val();
    var EPF = $('#EPF').val();
    var education = $('#education').val();
    var other = $('#other').val();


    if ($("#welfare").is(':checked')) {
        welfare = "1";
    } else {
        welfare = "0";
    }
    swal("Saving !", "Saving", "info");
    $.post('models/employee_reg.php', {save_employee: 'data', job: job, fullname: fullname, empID: empID, start_date: start_date, welfare: welfare,
        preferName: preferName, p_address: p_address, c_address: c_address, mobile: mobile, telephone: telephone, dob: dob, nationality: nationality, district: district,
        nic: nic, marital: marital, gender: gender, EPF: EPF, education: education, other: other
    }, function (data) {
        if (data.msgType === 1) {
            swal("Added!", "Employee has been added successfully ", "success");
            getEmployeeID();
            $("input").val("");
        } else {
            swal("Something Went Wrong", "Your Data could not added", "warning");
            getEmployeeID();
        }
    }, "json");


}

function getEmployeeID() {
    $.post('models/employee_reg.php', {getEmpID: 'data'}, function (data) {
        $('#employeeID').val(data.empID);
    }, "json");

}

function validate() {
    var valid = true;
    $(".must").each(function (index) {
        console.log(index + ": " + $(this).val());
        if ($(this).val() === '' || $(this).val() === null) {
            var a = $(this).attr("val");
            var val = ('#' + a).toString();
            $(val).addClass("has-error");
            valid = false;

        } else {
            var a = $(this).attr("val");
            var val = ('#' + a).toString();
            $(val).removeClass("has-error");
        }
    });
    return valid;

}

function loadEmployeeData(empIDUP) {
    var empID = empIDUP;
    //Auto Close Timer
    swal("Loading.. !", "Loading Employee Data ", "info");



    $.post("models/employee_reg.php", {empIDupdate: 'upData', empID: empID}, function (up) {
        $.each(up, function (index, data) {
            $('#job').val(data.roleID);
            $('#employeeID').val(data.empID);
            $('#emp').val(data.empID);
            $('#fullName').val(data.fullName);
            $('#start_date').val(data.doj);
            $('#preferName').val(data.preName);
            $('#p_address').val(data.permAddress);
            $('#c_address').val(data.contactAddress);
            $('#mobile').val(data.mobile);
            $('#telephone').val(data.telephone);
            $('#dob').val(data.dob);
            $('#nationality').val(data.nationality);
            $('#district').val(data.district);
            $('#nic').val(data.nic);
            $('#marital').val(data.married);
            $('#gender').val(data.gender);
            $('#EPF').val(data.epf);
            $('#education').val(data.educationQ);
            $('#other').val(data.otherQ);
            $('#assignRoleID').val(data.assignID);
            if (data.welfare === "1") {
                $('#welfare').prop('checked', true);
            } else {
                $('#welfare').prop('checked', false);
            }

            if (data.inactive === "0") {
                $('#active').prop('checked', true);
            } else {
                $('#active').prop('checked', false);
            }
            refreshChosen();
            swal({
                title: "Loaded",
                text: "Loading Employee Data Success",
                timer: 0,
                showConfirmButton: false
            });
        });
    }, "json");
}

function employee_data_update() {
    var job = $('#job').val();
    var empID = $('#employeeIDtoUp').val();
    var fullname = $('#fullName').val();
    var start_date = $('#start_date').val();
    var welfare;
    var fullname = $('#fullName').val();
    var preferName = $('#preferName').val();
    var p_address = $('#p_address').val();
    var c_address = $('#c_address').val();
    var mobile = $('#mobile').val();
    var telephone = $('#telephone').val();
    var dob = $('#dob').val();
    var nationality = $('#nationality').val();
    var district = $('#district').val();
    var nic = $('#nic').val();
    var marital = $('#marital').val();
    var gender = $('#gender').val();
    var EPF = $('#EPF').val();
    var education = $('#education').val();
    var other = $('#other').val();
    var active = $('#active').val();
    var roleID = $('#assignRoleID').val();


    if ($("#welfare").is(':checked')) {
        welfare = "1";
    } else {
        welfare = "0";
    }
    swal("Updating.. !", "Updating Employee Data", "info");
    $.post('models/employee_reg.php', {update_employee: 'data', job: job, fullname: fullname, empID: empID, start_date: start_date, welfare: welfare,
        preferName: preferName, p_address: p_address, c_address: c_address, mobile: mobile, telephone: telephone, dob: dob, nationality: nationality, district: district,
        nic: nic, marital: marital, gender: gender, EPF: EPF, education: education, other: other, active: active, roleID: roleID
    }, function (data) {
        if (data.msgType === 1) {
            swal("Updated..!", "Employee has been updated successfully ", "success");
            $("input").val("");
        } else {
            swal("Something Went Wrong", "Your Data could not updated", "warning");

        }
    }, "json");


}