function student_data_table(search_key, noOfRecords) {   
    var tableData="";
    var postData = {loading_student: 'table',search_key:search_key, noOfRecords:noOfRecords};
    
    $.post("models/model_student.php", postData, function (e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#student_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function (index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.fname + '</td>';
                tableData += '<td>' + data.city + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 delete_com" value="' + data.SID + '">Delete</button> &nbsp; <button class="btn btn-sm btn-alt m-r-5 select_com" value="' + data.SID + '">EDIT</button> ';
                tableData += '</tr>';
            });
            //Load Json Data to Table
            $('#student_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_com').click(function () {
                student_id_for_delete = $(this).val();
                confirm("Deletion of Company Data", "Are you sure want to delete This Student", "No", "Yes", function () {
                    $.post("models/model_student.php", {delete_student: 'delete', student_id_for_delete: student_id_for_delete}, function (delMsg) {
                        $.each(delMsg, function (index, valueDel) {
                            if (valueDel.msgType === 1) {
                                swal("Deleted!", "Student has been deleted successfully ", "success");
                            } else if (valueDel.msgType === 2) {
                                swal("Something Went Wrong", "Your Data could not Deleted", "warning");
                            }
                        });
                        student_data_table(search_key, noOfRecords);
                    }, "json");
                });
            });
            $('.select_com').click(function () {
                $('#btnUpdate').show();
                $('#btnCancel').show();
                $('#btnSave').hide();
                $('#sid').val($(this).val());
                var studentID = $('#sid').val();

                $.post("models/model_student.php", {get_student_data_to_up: 'upData', studentID: studentID}, function (up) {
                    $.each(up, function (index, data) {
                        $('#fname').val(data.fname);
                        $('#city').val(data.city);
                    });
                }, "json");
            });
        }
    }, "json");
}
//clear student
function clear_student() {
    $('#btnCancel').hide();
    $('#btnUpdate').hide();
    $('#btnSave').show();
    $('#fname').val('');
    $('#city').val('');
    $('#sid').val('');
}
//student data save funtion
function student_data_save() {
    var fname = $('#fname').val();
    var city = $('#city').val();

    swal("Saving !", "Saving", "info");
    $.post('models/model_student.php', {save_student: 'data', fname: fname,city:city}, function (data) {
        if (data.msgType === 1) {
            swal("Added!", "Student has been added successfully ", "success");
            student_data_table();
            clear_student();

        } else {
            swal("Something Went Wrong", "Your Data could not added", "warning");
        }
    }, "json");


}

function update_student_data() {
    var city = $('#city').val();
    var fname = $('#fname').val();
    var sid = $('#sid').val();


    $.post('models/model_student.php', {update_student: 'data', sid: sid, fname: fname,city:city},
    function (data) {
        if (data.msgType === 1) {
            swal("Updated!", "Student has been Updated successfully ", "success");
            student_data_table();
            clear_student();
        } else {
            swal("Something Went Wrong", "Your Data could not updated", "warning");
        }

    }, "json");
}

