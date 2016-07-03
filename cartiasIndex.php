<!DOCTYPE html>
<html>
    <head>
        <title>Janasetha Caritas Kurunegal - World Food Day 2015</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Bootstrap -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/neat-red.css" media="screen" id="neat-stylesheet">

        <link rel="stylesheet" href="http://blueimp.github.io/Gallery/css/blueimp-gallery.min.css">
        <link rel="stylesheet" href="libs/Bootstrap-Image-Gallery-3.1.1/css/bootstrap-image-gallery.min.css">

        <!-- Use google font -->
        <link href="http://fonts.googleapis.com/css?family=Lato:100,300,400,700,300italic,400italic,700italic|Lustria" rel="stylesheet" type="text/css" />

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="js/html5shiv.js"></script>
          <script src="js/respond.min.js"></script>
        <![endif]-->
    </head>
    <body class="background-clouds">
        <div id="nav-wrapper" class="background-white color-black">
            <?php
            $active = 3;
            include './inc/menu.php';
            ?>
        </div>

        <!-- Breadcrumbs - START -->
        <div class="breadcrumbs-container">
            <div class="container">
                <ol class="breadcrumb">
                    <li><a href="index.php">Home</a></li>
                    <li><a href="index.php">News</a></li>

                </ol>
            </div>
        </div>
        <!-- Breadcrumbs - END -->

        <!-- Component: entry/entry.html - START -->
        <section class="">
            <div class="container">

                <div class="row">
                    <div class="col-md-12">
                        <div class="blog-entry">
                            <div class="blog-entry-content no-border">

                                <h1><span>World Food Day - 2015
                                    </span></h1>
                                <div class="content">


                                    <div class="col-md-6"> 
                                        <br>
                                        <iframe width="560" height="315" src="https://www.youtube.com/embed/G7Hw36YO0lM" frameborder="0" allowfullscreen></iframe>

                                    </div>

                                    <div class="col-md-6"> 
                                        
                                        <p align="justify">
                                            “Janasetha” – Caritas , Kurunegala hosted the “World Food Day “ Commemoration program organized in collaboration with the Agriculture Department (NWP) and the Caritas National Centre (SEDEC) under the theme “ United Against Hunger”. The celebrations were held on the 16th and 17th of October 2015 by the side vicinity of the ‘Saragama’ lake at Thittawella, Kurunegala. The Guests of Honour at the Opening ceremony were – His Lordship Most. Rev. Dr Vianney Fernando – Catholic Bishop of Kandy and Mr. Vijitha Bandaranayake –Secretary of the Provincial Ministry of Agriculture NWP. A large number of distinguished guests and Officials of the Provincial Ministry too participated in the occasion. The Bishop of Kandy in his message emphasized the obligatory role to be played by the Government in association with the public sector organizations to eradicate poverty through the promotion of Organic Food Cultivation towards attaining sustainable agriculture. The Key Note address was delivered by Prof. Piyal Marasinghe - Adviser to the -Provincial Ministry of Health and Indigenous Medicine, Uva Province. Rev. Bro. Anton Charles Thomas conducted a fruitful musical meditation on the different aspects of our traditional agricultural heritage studded with our cultural and religious values. This ceremony was followed by the opening of the Stalls at the Exhibition Grounds that displayed a variety of Organic Agricultural products and produce of the farmer communities. Caritas Anuradhapura and Caritas Batticaloa were also allotted stalls to display their organic produce and food items innate to their districts. A great demand was created for varieties of traditional Rice and Organic Food. A mouth-watering spread of traditional delicacies, fresh fruit beverages and nutritious soups & gruels attracted the vast crowds of visitors who braved the evening showers to visit the colourfully lit-up exhibition grounds. This event was one of the first of its’ kind to be held in Kurunegala and was organized by “Janasetha” Caritas Kurunegala in association with the National Caritas Centre and the North Western Province Ministry of Agriculture.</p>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>      </div>
        </section>
        <!-- Component: entry/entry.html - END -->

        <!-- Component: commons/this-is-us.html - START -->

        <!-- Component: commons/this-is-us.html - END -->


        <?php
        include './inc/footer.php';
        ?>

        <!-- The Bootstrap Image Gallery lightbox, should be a child element of the document body -->

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>

        <!-- Include slider -->
        <script src="js/jquery.event.move.js"></script>
        <script src="js/jquery.mixitup.min.js"></script>
        <script src="js/responsive-slider.js"></script>
        <script src="js/responsive-calendar.js"></script>
        <script src="http://blueimp.github.io/Gallery/js/jquery.blueimp-gallery.min.js"></script>
        <script src="libs/Bootstrap-Image-Gallery-3.1.1/js/bootstrap-image-gallery.min.js"></script>
        <script src="js/reduce-menu.js"></script>
        <script src="js/match-height.js"></script>

        <script type="text/javascript">
            $(document).ready(function () {
                $('.responsive-calendar').responsiveCalendar({
                    time: '2013-05',
                    events: {
                        "2013-05-30": {"badgeClass": "background-nephritis", "url": "http://w3widgets.com/responsive-slider"},
                        "2013-05-26": {"badgeClass": "background-nephritis", "url": "http://w3widgets.com"},
                        "2013-05-03": {"badgeClass": "background-pomegranate"},
                        "2013-05-12": {}}
                });
            });

            $(window).load(function () {
                matchHeight($('.info-thumbnail .caption .description'), 3);
            });
        </script>
    </body>
</html>