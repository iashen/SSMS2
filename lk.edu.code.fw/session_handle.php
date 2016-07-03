<?php

//this allows only delegates 
function allow_delegate_only() {
    if (!isset($_SESSION['type'])) {
        echo '<script type="text/javascript">                                        
                                        window.location.href = "index.php";
                                        </script>';
    } else if ($_SESSION['type'] == '2') {
        echo '<script type="text/javascript"> 
            alert("Resctricted Access, You will be redirected to Dashboard");
                                        window.location.href = "dashboard.php";
                                        </script>';
    }
}

//this allows only managers 
function allow_manager_only() {
    if (!isset($_SESSION['type'])) {
        echo '<script type="text/javascript">
            
                                        window.location.href = "index.php";
                                        </script>';
    } else if ($_SESSION['type'] == '1') {
        echo '<script type="text/javascript">  
        alert("Resctricted Access, You will be redirected to Dashboard");
                                        window.location.href = "dashboard.php";
                                        </script>';
    }
}

//this allow both delegates and managers 
function allow_any() {
    if (!isset($_SESSION['type'])) {
        echo '<script type="text/javascript">                                        
                                        window.location.href = "index.php";
                                        </script>';
    } 
    
    

   
    
    
    
}
