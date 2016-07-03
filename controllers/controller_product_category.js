function load_product_categories() {

    $.post('models/model_product_category.php', {get_product_category_for_dropdown: 'data'}, function (data) {
        $("#pro_cat").html(data);
    });


}


function save_product_category() {
    var cat_name = $("#p_cat").val();
    console.log(cat_name);
    $.post('models/model_product_category.php', {save_product_category: 'data', cat_name: cat_name}, function (data) {
        if (data.msgType === 1) {
            swal("Added!", "Product Category has been added successfully ", "success");
            load_product_categories();
            $("#modalDefault").modal('toggle');
            $("#p_cat").val('');



        } else {
            swal("Something Went Wrong", "Your Data could not added", "warning");
            $("#p_cat").val('');
        }
    }, "json");
} 