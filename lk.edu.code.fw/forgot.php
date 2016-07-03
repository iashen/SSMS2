<?php
include 'dbc.php';
require_once("../system_settings_class.php");
 $settings = new settings; 






/******************* ACTIVATION BY FORM**************************/
if (isset($_POST['doReset']) && $_POST['doReset']=='Reset')
{
$err = array();
$msg = array();

foreach($_POST as $key => $value) {
	$data[$key] = filter($value);
}
if(!isEmail($data['user_email'])) {
$err[] = "ERROR - Please enter a valid email"; 
}

$user_email = $data['user_email'];

//check if activ code and user is valid as precaution
$rs_check = mysql_query("select id from users where user_email='$user_email'") or die (mysql_error()); 
$num = mysql_num_rows($rs_check);
  // Match row found with more than 1 results  - the user is authenticated. 
    if ( $num <= 0 ) { 
	$err[] = "Error - Sorry no such account exists or registered.";
	//header("Location: forgot.php?msg=$msg");
	//exit();
	}


if(empty($err)) {

$new_pwd = GenPwd();
$pwd_reset = PwdHash($new_pwd);
//$sha1_new = sha1($new);	
//set update sha1 of new password + salt
$rs_activ = mysql_query("update users set pwd='$pwd_reset' WHERE 
						 user_email='$user_email'") or die(mysql_error());
						 
$host  = $_SERVER['HTTP_HOST'];
$host_upper = strtoupper($host);						 
						 
//send email

$message = 
"Here are your new password details ...\n
User Email: $user_email \n
Passwd: $new_pwd \n

Thank You

Administrator
$host_upper
______________________________________________________
THIS IS AN AUTOMATED RESPONSE. 
***DO NOT RESPOND TO THIS EMAIL****
";

	mail($user_email, "Reset Password", $message,
    "From: \"Member Registration\" <auto-reply@$host>\r\n" .
     "X-Mailer: PHP/" . phpversion());						 
						 
$msg[] = "Your account password has been reset and a new password has been sent to your email address.";						 
						 
//$msg = urlencode();
//header("Location: forgot.php?msg=$msg");						 
//exit();
 }
}
?>
                        
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"[]>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US" xml:lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Administrator Login</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <!----------------------------------------css form style---------------------------------------------------->
    <link rel="stylesheet" href="../cssFormStyles/demo.css" type="text/css" media="all" />  
    <!----------------------------------------End css form style------------------------------------------------>
    <link rel="stylesheet" href="../style.css" type="text/css" media="screen" />
     
    <script type="text/javascript" src="../script.js"></script>
    <!----------------------------------------admin Login------------------------------------------------------->
   
<link href="styles.css" rel="stylesheet" type="text/css">
<!----------------------------end of Admin Login-------------------------------------------->
<!-----------------------------msg display script----------------------------------------->
   <link rel="stylesheet" type="text/css" href="../msg_script/jquery.msgbox.css" />
  <script type="text/javascript" src="../msg_script/jquery.msgbox.min.js"></script>
</head>
<body>
<div id="art-page-background-middle-texture">
<div id="art-page-background-glare-wrapper">
    <div id="art-page-background-glare"></div>
</div>
<div id="art-main">
    <div class="cleared reset-box"></div>
<div class="art-bar art-nav">
<div class="art-nav-outer">
<div class="art-nav-wrapper">
<div class="art-nav-inner">
	
		
</div>
</div>
</div>
</div>
<div class="cleared reset-box"></div>
<div class="art-header">
        <div class="art-header-position">
            <div class="art-header-wrapper">
                <div class="cleared reset-box"></div>
                <div class="art-header-inner">
                <div class="art-textblock"> </div>
                <div class="art-headerobject"></div>
                <div class="art-logo">
                                 <? $systemDetails = $settings->get_system_details();
				foreach($systemDetails as $systeminfo){ ?>
              <h1 class="art-logo-name"><a href="../index.html"><? echo $systeminfo['company_name']?></a></h1>
              <? } ?>
                                                 <h2 class="art-logo-text">E - Commerce Administration</h2>
                                </div>
                </div>
            </div>
        </div>
        
    </div>
    <div class="cleared reset-box"></div>
    <div class="art-box art-sheet">
      <div class="art-box-body art-sheet-body">
            <div class="art-layout-wrapper">
                <div class="art-content-layout">
                    <div class="art-content-layout-row">
                        <div class="art-layout-cell art-sidebar1">

                          <div class="cleared"></div>
                        </div>
                        <div class="art-layout-cell art-content">
<div class="art-box art-post">
    <div class="art-box-body art-post-body">
<div class="art-post-inner art-article">
                                
                      <div class="art-postcontent">
    
                                                
<div style="margin-left:+50px;alignment-adjust:central;margin-bottom:25px;margin-top:15px;padding:30px;width:500px;height:auto;-webkit-border-radius: 8px;-moz-border-radius: 8px;border-radius: 8px;border:1px solid #FFFFFF;background:rgba(0,0,0,0.5);-webkit-box-shadow: #3D5673 2px 2px 2px;-moz-box-shadow: #3D5673 2px 2px 2px; box-shadow: #3D5673 2px 2px 2px;">
<h2 class="titlehdr" align="center">Forgot Password</h3>

   
        <?php
	  /******************** ERROR MESSAGES*************************************************
	  This code is to show error messages 
	  **************************************************************************/
	if(!empty($err))  {
	   echo "<div class=\"msg\">";
	  foreach ($err as $e) {
	    echo "* $e <br>";
	    }
	  echo "</div>";	
	   }
	   if(!empty($msg))  {
	    echo "<div class=\"msg\">" . $msg[0] . "</div>";

	   }
	  /******************************* END ********************************/	  
	  ?>
      
	 
      <form action="forgot.php" method="post" name="actForm" id="actForm" >
        <table width="100%" border="0" cellpadding="4" cellspacing="4" >
          <tr> 
            <td><p style="font-family:Arial, Helvetica, sans-serif">If you have forgot the account password, you can <strong style="color:#F60">reset password</strong> 
        and a new password will be sent to your email address.</p><br/><br/></td>
          </tr>
          <tr>          
            
      <td style="text-align:center"><input name="user_email" type="email" class="required email" id="txtboxn" ><label>&nbsp;&nbsp;<strong>Please Enter Your Account Email Address</strong></label><br/></td>
           
          </tr>
          <tr> 
            <td style="text-align:center"> 
               
                  <input class="button" name="doReset" type="submit" id="doLogin3" value="Reset">
              
              </td>
          </tr>
        </table>
      
      </form>
</div>
                </div>
                </div>
                </div>
                <div class="cleared"></div>
                </div>

		<div class="cleared"></div>
    </div>
</div>

                          <div class="cleared">
                          
                          
                          
                          </div>
                          
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
           
   
    		
        </div>
        
        
        
        
        
        
    </div>
             <div class="art-footer">
        <div class="art-footer-body">
            <div class="art-footer-center">
                <div class="art-footer-wrapper">
                    <div class="art-footer-text">
                        <a href="#" class="art-rss-tag-icon" title="RSS"></a>
                        <p><a href="../../index.php">FRONT END</a>

 				<?  $systemDetails_footer = $settings->get_system_details();
						foreach($systemDetails_footer as $systeminfo_footer){ ?>
                <p><? echo $systeminfo_footer['copyright'] ?></p>
                        <div class="cleared"></div>
                       <p class="art-page-footer"><a href="#" target="_blank"><? echo $systeminfo_footer['company_name']  ?></a> - online store (<? echo $systeminfo_footer['phone_number']  ?>)</p>
    <? } ?>
                    </div>
                </div>
            </div>
            <div class="cleared"></div>
        </div>
    </div>
    <div class="cleared"></div>
</div>

</body>
</html>
