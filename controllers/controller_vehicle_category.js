function load_vehicle_categories() {
    $.post('models/model_vehicle_category.php', {get_vehicle_category_for_dropdown: 'data'}, function (data) {
        $("#vehi_cat").html(data);
    });
}

/*
 function save_vehicle_category() {
 var cat_name = $("#v_cat").val();
 console.log(cat_name);
 $.post('models/model_vehicle_category.php', {save_vehicle_category: 'data', cat_name: cat_name}, function (data) {
 if (data.msgType === 1) {
 swal("Added!", "Vehicle Category has been added successfully ", "success");
 load_vehicle_categories();
 $("#modalDefault").modal('toggle');
 $("#v_cat").val('');
 
 
 
 } else {
 swal("Something Went Wrong", "Your Data could not added", "warning");
 $("#v_cat").val('');
 }
 }, "json");
 } 
 */

/*
 function validate_vehicle_category(){
 var cat_name = $("#v_cat").val();
 
 $.post('models/model_vehicle_category.php', {validate_vehicle_category: 'data', cat_name: cat_name}, function (e) {
 
 $.each(e, function (index, data) {
 
 console.log(data.v_count);
 if(data.v_count === 1){
 return false;
 }else{
 return true;
 }
 
 });
 }, "json");
 } 
 */

function validate_vehicle_category(callback) {

    var text1 = $("#text1").val();

    $.post('models/model_vehicle_category.php', {validate_vehicle_category: 'data', text1: text1}, function (data) {
        var valid;

        $.each(data, function (index, data) {
            if (data.v_count === "1") {
                callback(false);
                valid = false;
            } else {
                callback(true);
                valid = true;
            }
        });
       console.log(valid);
    }, "json");
}

//student data save function
function save_category() {

    var text1 = $("#text1").val();
    validate_vehicle_category(save_data);

    function save_data(valid) {
        if (valid) {
            //to do save
            //alert("valid and save");

            $.post('models/model_vehicle_category.php', {save_vehicle_category: 'data', text1: text1}, function (data) {
               
                console.log(data);
                if (data.msgType === 1) {
                    swal("Added!", "Vehicle Category has been added successfully ", "success");
                    load_vehicle_categories();
                    $("#modalDefault").modal('toggle');
                    $("#text1").val('');

                }

                else {
                    //to do error
                    //alert("invalid and error");
                    swal("Something Went Wrong", "Your Data could not added", "warning");
                        $("#text1").val('');

                }
            }, "json");

        } else {
            swal("Category Name Already Exists" , "Please enter new category or select existing category " + text1, "warning");
        }
    }
}

