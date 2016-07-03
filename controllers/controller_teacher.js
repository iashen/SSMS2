function teacher_data_table() {
   
    var tableData;
    $.post("models/model_teacher.php", {loading_teacher: 'table'}, function (e) {
        if (e === undefined || e.length === 0 || e === null) {
            tableData = '<tr class="error"><td colspan="4"> No Data Found in database </td></tr>';
            $('#teacher_data_table tbody').html('').append(tableData);
        } else {
            $.each(e, function (index, data) {
                tableData += '<tr>';
                tableData += '<td>' + data.name + '</td>';
                tableData += '<td>' + data.class + '</td>';
                tableData += '<td><button class="btn btn-sm btn-alt m-r-5 delete_com" value="' + data.TID + '">Delete</button> &nbsp; <button class="btn btn-sm btn-alt m-r-5 select_com" value="' + data.TID + '">EDIT</button> ';
                tableData += '</tr>';
            });
            //Load Json Data to Table
            $('#teacher_data_table tbody').html('').append(tableData);

            //Delete Data through Delete button
            $('.delete_com').click(function () {
                teacher_id_for_delete = $(this).val();
                confirm("Deletion of Company Data", "Are you sure want to delete This Teacher", "No", "Yes", function () {
                    $.post("models/model_teacher.php", {delete_teacher: 'delete', teacher_id_for_delete: teacher_id_for_delete}, function (delMsg) {
                        $.each(delMsg, function (index, valueDel) {
                            if (valueDel.msgType === 1) {
                                swal("Deleted!", "Teacher has been deleted successfully ", "success");
                            } else if (valueDel.msgType === 2) {
                                swal("Something Went Wrong", "Your Data could not Deleted", "warning");
                            }
                        });
                        teacher_data_table();
                    }, "json");
                });
            });
            $('.select_com').click(function () {
                $('#btnUpdate').show();
                $('#btnCancel').show();
                $('#btnSave').hide();
                $('#tid').val($(this).val());
                var teacherID = $('#tid').val();

                $.post("models/model_teacher.php", {get_teacher_data_to_up: 'upData', teacherID: teacherID}, function (up) {
                    $.each(up, function (index, data) {
                        $('#tname').val(data.name);
                        $('#tclass').val(data.class);
                    });
                }, "json");
            });
        }
    }, "json");
}
//clear student
function clear_teacher() {
    $('#btnCancel').hide();
    $('#btnUpdate').hide();
    $('#btnSave').show();
    $('#tname').val('');
    $('#tclass').val('');
    $('#tid').val('');
}
//student data save funtion
function teacher_data_save() {
    var tname = $('#tname').val();
    var tclass = $('#tclass').val();

    swal("Saving !", "Saving", "info");
    $.post('models/model_teacher.php', {save_teacher: 'data', tname: tname, tclass:tclass}, function (data) {
        if (data.msgType === 1) {
            swal("Added!", "Teacher has been added successfully ", "success");
            teacher_data_table();
            clear_teacher();

        } else {
            swal("Something Went Wrong", "Your Data could not added", "warning");
        }
    }, "json");


}

function update_teacher_data() {
    var tclass = $('#tclass').val();
    var tname = $('#tname').val();
    var tid = $('#tid').val();


    $.post('models/model_teacher.php', {update_teacher: 'data', tid: tid, tname: tname,tclass:tclass},
    function (data) {
        if (data.msgType === 1) {
            swal("Updated!", "Teacher has been Updated successfully ", "success");
            teacher_data_table();
            clear_teacher();
        } else {
            swal("Something Went Wrong", "Your Data could not updated", "warning");
        }

    }, "json");
}

