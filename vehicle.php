<!DOCTYPE html>
<!--[if IE 9 ]><html class="ie9"><![endif]-->
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="format-detection" content="telephone=no">
    <meta charset="UTF-8">

    <meta name="description" content="Violate Responsive Admin Template">
    <meta name="keywords" content="Super Admin, Admin, Template, Bootstrap">

    <title>Super Admin Responsive Template</title>

    <!-- CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/animate.min.css" rel="stylesheet">
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link href="css/form.css" rel="stylesheet">
    <link href="css/calendar.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/icons.css" rel="stylesheet">
    <link href="css/generics.css" rel="stylesheet"> 
    <link href="vendors/toastr/toastr.min.css" rel="stylesheet">
    <link href="vendors/sweetalerts/sweetalert.css" rel="stylesheet">

</head>
<body id="skin-blur-color3">
    <!--including header-->
    <?php
    include './common/header.php';
    ?>
    <div class="clearfix"></div>

    <section id="main" class="p-relative" role="main">

        <!-- Sidebar -->
        <?php
        include './common/sidebar.php';
        ?>
        <!-- Content -->
        <section id="content" class="container">

            <!-- Messages Drawer -->
            <?php
            include './common/messages.php';
            ?>
            <!-- Notification Drawer -->
            <?php
            include './common/notifications.php';
            ?>
            <!-- Breadcrumb -->
            <ol class="breadcrumb hidden-xs">
                <li><a href="#">Home</a></li>
                <li><a href="#">Library</a></li>
                <li class="active">Data</li>
            </ol>

            <h4 class="page-title">Vehicle</h4>

            <!-- Basic -->
            <!--Multi Column-->
            <div class="block-area" id="multi-column">
                <h3 class="block-title">Vehicle Registration Form</h3>
                <form class="row form-columned" role="form">

                    <div class="col-md-4">
                        <label>Vehicle Registration Number</label>
                        <input type="text" class="form-control input-sm m-b-10" placeholder="input vehicle registration ID">
                    </div>

                    <div class="col-md-4">
                        <label>Make</label>
                        <input type="text" class="form-control input-sm m-b-10" placeholder="input vehicle make">
                    </div>


                    <div class="clearfix"></div>

                    <div class="col-md-4 m-b-10">
                        <label>Type</label>
                        <select class="form-control input-sm m-b-10" id="vehi_cat">
                            <!--
                            <option>Car</option>
                            <option>SUV</option>
                            <option>MPV</option>
                            <option>Heavy</option>
                            -->
                        </select>
                    </div>

                    <!-- Modal Default -->

                    <a data-toggle="modal" href="#modalDefault" class="btn btn-sm">Vehicle Registration</a>

                    <div class="modal fade" id="modalDefault" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title">Catagory Name</h4>
                                </div>
                                <div class="modal-body">
                                    <div>
                                        <label>Category Name</label>
                                        <input type="text" class="form-control input-sm m-b-10" placeholder="Enter Catogory" id="text1">
                                    </div>
                                </div>

                                <!--
                                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales orci ante, sed ornare eros vestibulum ut. Ut accumsan vitae eros sit amet tristique. Nullam scelerisque nunc enim, non dignissim nibh faucibus ullamcorper. Fusce pulvinar libero vel ligula iaculis ullamcorper. Integer dapibus, mi ac tempor varius, purus nibh mattis erat, vitae porta nunc nisi non tellus. Vivamus mollis ante non massa egestas fringilla. Vestibulum egestas consectetur nunc at ultricies. Morbi quis consectetur nunc.</p>
                                -->
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-sm" id="save_cat">Save changes</button>
                                    <button type="button" class="btn btn-sm" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="clearfix"></div>

                    <div class="col-md-4">
                        <label>Model</label>
                        <input type="tel" class="form-control input-sm m-b-10" placeholder="input vehicle model">
                    </div>

                    <div class="col-md-4">
                        <label>Date Registered</label>
                        <input type="text" class="form-control input-sm m-b-10" placeholder="input registered date">
                    </div>




                    <div class="col-md-10">
                        <button type="submit" class="btn btn-lg btn-alt m-r-5">Save Vehicle Info</button>
                    </div>
                </form>
            </div>


            <!--
                        <hr class="whiter m-t-20" />
            
                        <div class="container block-area">                
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="panel panel-primary">                              
                                        <input type="text" class="main-search" id="dev-table-filter" data-action="filter" data-filters="#student_data_table" placeholder="Search Delegates" />
            
                                        <div class="table-responsive overflow">
                                            <hr class="whiter m-t-20" />
                                            <div style="height:300px;display:inherit">
                                                <table class="table table-hover" id="student_data_table">
                                                    <thead>
                                                        <tr>
                                                            <th>First Name</th>
                                                            <th>City</th>                                                      
                                                            <th>Edit | Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>							
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>			
                                </div>
                            </div>
            -->


        </section>
    </section>

    <!-- Javascript Libraries -->
    <!-- jQuery -->
    <script src="js/jquery.min.js"></script> <!-- jQuery Library -->

    <!-- Bootstrap -->
    <script src="js/bootstrap.min.js"></script>

    <!--  Form Related -->
    <script src="js/select.min.js"></script> <!-- Custom Select -->
    <script src="js/icheck.js"></script> <!-- Custom Checkbox + Radio -->
    <script src="js/fileupload.min.js"></script> <!-- File Upload -->
    <script src="js/autosize.min.js"></script> <!-- Textare autosize -->

    <!-- UX -->
    <script src="js/scroll.min.js"></script> <!-- Custom Scrollbar -->

    <!-- Other -->
    <script src="js/calendar.min.js"></script> <!-- Calendar -->
    <script src="js/feeds.min.js"></script> <!-- News Feeds -->
    <script src="vendors/toastr/toastr.min.js"></script> <!-- Toastr -->
    <script src="vendors/sweetalerts/sweetalert.min.js"></script> <!-- Sweet alerts -->
    <script src="vendors/datatable/data_table.js"></script> <!-- data Table -->

    <!-- Framwork Controllers-->
    <script src="controllers/utilities.js"></script><!-- Framework Utilities -->
    <script src="controllers/controller_student.js"></script><!-- student controller -->
    <script src="controllers/controller_vehicle_category.js"></script><!-- vehicle_category controller -->


    <!-- All JS functions -->
    <script src="js/functions.js"></script>

    <script>

        load_vehicle_categories();

        $("#save_cat").click(function () {

            save_category();

            //validate_vehicle_category();

        });


        /*  
         $("#save_cat").click(function () {
         
         validate_vehicle_category();
         
         });
         */


        /*
         $("#btnSave").click(function(){
         
         var category = $('#cname').val();
         
         
         $.post('model_product_category.php', {get_product_category_for_dropdown: 'data', cname: cname},function(response){
         if(response.msgType === 1){
         alert(response.msg);
         }else{
         alert(response.msg);
         }
         });
         */
        /*
         student_data_table();
         
         $("#btnCancel").click(function () {
         clear_student();
         });
         
         $("#btnSave").click(function () {
         student_data_save();
         });
         
         $("#btnUpdate").click(function () {
         update_student_data();
         });
         
         $(document).keypress(function (e) {
         if (e.which === 13) {
         student_data_save();
         
         }
         });
         
         */

    </script>

</body>
</html>

