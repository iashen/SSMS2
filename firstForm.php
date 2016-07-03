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
    </head>
    <body id="skin-blur-violate">
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
                
                <h4 class="page-title">FORM COMPONENTS</h4>
                                
                <!-- Input Masking -->
                <div class="block-area" id="input-masking">
                    
                    <h3 class="block-title">Input Masking</h3>
                    
                    <br/>
                    
                    <p>Start typing on feilds below, It will automatically mask the inputs</p>
                    
                    <div class="row">
                        <div class="col-md-3 m-b-15">
                            <label>NIC</label>
                            <input type="text" class="input-sm form-control mask-nic" placeholder="...">
                        </div>
                        
                        <div class="col-md-3 m-b-15">
                            <label>Time</label>
                            <input type="text" class="input-sm form-control mask-time" placeholder="...">
                        </div>
                        
                        <div class="col-md-3 m-b-15">
                            <label>Date Time</label>
                            <input type="text" class="input-sm form-control mask-date_time" placeholder="...">
                        </div>
                        
                        <div class="col-md-3 m-b-15">
                            <label>CEP</label>
                            <input type="text" class="input-sm form-control mask-cep" placeholder="...">
                        </div>
                        
                        <div class="col-md-3 m-b-15">
                            <label>Phone Number</label>
                            <input type="text" class="input-sm form-control mask-phone" placeholder="...">
                        </div>
                        
                        <div class="col-md-3 m-b-15">
                            <label>Phone with Odd</label>
                            <input type="text" class="input-sm form-control mask-phone_with_ddd" placeholder="...">
                        </div>
                        
                        <div class="col-md-3 m-b-15">
                            <label>US Phone Number</label>
                            <input type="text" class="input-sm form-control mask-phone_us" placeholder="...">
                        </div>
                        
                        <div class="col-md-3 m-b-15">
                            <label>Mixed</label>
                            <input type="text" class="input-sm form-control mask-mixed" placeholder="...">
                        </div>
                        
                        <div class="col-md-3 m-b-15">
                            <label>CPF</label>
                            <input type="text" class="input-sm form-control mask-cpf" placeholder="...">
                        </div>
                        
                        <div class="col-md-3 m-b-15">
                            <label>Money</label>
                            <input type="text" class="input-sm form-control mask-money" placeholder="...">
                        </div>
                        
                        <div class="col-md-3 m-b-15">
                            <label>Money 2</label>
                            <input type="text" class="input-sm form-control mask-money2" placeholder="...">
                        </div>
                        
                        <div class="col-md-3 m-b-15">
                            <label>IP Address</label>
                            <input type="text" class="input-sm form-control mask-ip_address" placeholder="...">
                        </div>
                        
                        <div class="col-md-3 m-b-15">
                            <label>Percentage</label>
                            <input type="text" class="input-sm form-control mask-percent" placeholder="...">
                        </div>
                        
                        <div class="col-md-3 m-b-15">
                            <label>Credit Card</label>
                            <input type="text" class="input-sm form-control mask-credit_card" placeholder="...">
                        </div>
                        
                    </div>
                </div>
               
            </section>
        </section>
        
        <!-- Javascript Libraries -->
        <!-- jQuery -->
        <script src="js/jquery.min.js"></script> <!-- jQuery Library -->
        <script src="js/jquery-ui.min.js"></script> <!-- jQuery UI -->
        
        <!-- Bootstrap -->
        <script src="js/bootstrap.min.js"></script>
        
        <!--  Form Related -->
        <script src="js/validation/validate.min.js"></script> <!-- jQuery Form Validation Library -->
        <script src="js/validation/validationEngine.min.js"></script> <!-- jQuery Form Validation Library - requirred with above js -->
        <script src="js/select.min.js"></script> <!-- Custom Select -->
        <script src="js/chosen.min.js"></script> <!-- Custom Multi Select -->
        <script src="js/datetimepicker.min.js"></script> <!-- Date & Time Picker -->
        <script src="js/colorpicker.min.js"></script> <!-- Color Picker -->
        <script src="js/icheck.js"></script> <!-- Custom Checkbox + Radio -->
        <script src="js/autosize.min.js"></script> <!-- Textare autosize -->
        <script src="js/toggler.min.js"></script> <!-- Toggler -->
        <script src="js/input-mask.min.js"></script> <!-- Input Mask -->
        <script src="js/spinner.min.js"></script> <!-- Spinner -->
        <script src="js/slider.min.js"></script> <!-- Input Slider -->
        <script src="js/fileupload.min.js"></script> <!-- File Upload -->
        
        <!-- Text Editor -->
        <script src="js/editor.min.js"></script> <!-- WYSIWYG Editor -->
        <script src="js/markdown.min.js"></script> <!-- Markdown Editor -->
        
        <!-- UX -->
        <script src="js/scroll.min.js"></script> <!-- Custom Scrollbar -->
        
        <!-- Other -->
        <script src="js/calendar.min.js"></script> <!-- Calendar -->
        <script src="js/feeds.min.js"></script> <!-- News Feeds -->
        
        
        <!-- All JS functions -->
        <script src="js/functions.js"></script>
        
        <script type="text/javascript">
            $(document).ready(function(){
                /* Tag Select */
                (function(){
                    /* Limited */
                    $(".tag-select-limited").chosen({
                        max_selected_options: 5
                    });
                    
                    /* Overflow */
                    $('.overflow').niceScroll();
                })();
                
                /* Input Masking - you can include your own way */
                (function(){
                    $('.mask-date').mask('00/00/0000');
                    $('.mask-time').mask('00:00:00');
                    $('.mask-date_time').mask('00/00/0000 00:00:00');
                    $('.mask-cep').mask('00000-000');
                    $('.mask-phone').mask('000-0000000');
                    $('.mask-phone_with_ddd').mask('(00) 0000-0000');
                    $('.mask-phone_us').mask('(000) 000-0000');
                    $('.mask-mixed').mask('AAA 000-S0S');
                    $('.mask-cpf').mask('000.000.000-00', {reverse: true});
                    $('.mask-money').mask('000,000,000,000,000.00', {reverse: true});
                    $('.mask-money2').mask("#.##0,00", {reverse: true, maxlength: false});
                    $('.mask-ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}});
                    $('.mask-ip_address').mask('099.099.099.099');
                    $('.mask-percent').mask('##0,00%', {reverse: true});
                    $('.mask-credit_card').mask('0000 0000 0000 0000');
                    $('.mask-nic').mask('000000000V');
                })();
                
                /* Spinners */
                (function(){
                    //Basic
                    $('.spinner-1').spinedit();
                    
                    //Set Value
                    $('.spinner-2').spinedit('setValue', 100);
                    
                    //Set Minimum                    
                    $('.spinner-3').spinedit('setMinimum', -10);
                    
                    //Set Maximum                    
                    $('.spinner-4').spinedit('setMaxmum', 100);
                    
                    //Set Step
                    $('.spinner-5').spinedit('setStep', 10);
                    
                    //Set Number Of Decimals
                    $('.spinner-6').spinedit('setNumberOfDecimals', 2);
                })();
            });
        </script>

    </body>
</html>

