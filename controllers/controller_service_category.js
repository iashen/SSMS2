function load_service_categories() {

    $.post('models/model_service_category.php', {get_service_category_for_dropdown: 'data'}, function (data) {
        $("#serv_cat").html(data);
    });

}


function save_service_category() {
    var cat_name = $("#s_cat").val();
    console.log(cat_name);
    $.post('models/model_service_category.php', {save_service_category: 'data', cat_name: cat_name}, function (data) {
        if (data.msgType === 1) {
            swal("Added!", "Service Category has been added successfully ", "success");
            load_service_categories();
            $("#modalDefault").modal('toggle');
            $("#s_cat").val('');



        } else {
            swal("Something Went Wrong", "Your Data could not added", "warning");
            $("#s_cat").val('');
        }
    }, "json");
} 
