<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<!-- Header Started -->
<head>       
    <title>Home</title>

    
    <link rel="stylesheet" href="resource/oe/assets/css/font-awesome.min.css">
    <link rel="stylesheet" href="resource/oe/assets/css/bootstrap.min.css">    
    <link rel="stylesheet" href="resource/oe/assets/css/jquery-ui.css">
    <link rel="stylesheet" href="resource/oe/assets/css/custom.css">    
</head>


 <body class="loginPage grad">
        <div id="wrapper">
   		<div class="text-center" style="padding-top:5%;">            	
  			<div class="navbar-brandLogin logoLogin logo-titleLogin">KARAT &  CARAT</div>        
       </div>
       <div class="main-container">
            <div class="container">
            	
                <div class="row">
                    <div class="col-sm-4 login-box">
                        <div style="display:none;" class="alert alert-danger" id="loginAlert">
                            <strong>Please enter username and password.</strong>
                        </div>
                         <c:if test="${not empty error}">
                            <div id="InvalidloginAlert" class="alert alert-danger">
                                <strong>${error}</strong>
                            </div>
                         </c:if>
                        <div class="panel panel-default grad-login">
                            <div class="panel-intro text-center" style="padding-bottom:2px;">
                                <h3>Please sign in to get access. </h3>
                            </div>
                            <div class="panel-body">                                 
                                <form role="form" action="login" method="post" name="loginForm" onsubmit="return validateForm()">
                                    <div class="form-group">
                                        <label for="uname" class="control-label">HRMS ID:</label>
                                        <div class="input-icon"> <i class="fa fa-user"></i>
                                            <input name="uname" id="uname" type="text" placeholder="Username" class="form-control email" >
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="passwd" class="control-label">Password:</label>
                                        <div class="input-icon"> <i class="fa fa-lock"></i>
                                            <input type="password" class="form-control" placeholder="Password" name="passwd" id="passwd" >
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input type="submit" value="Login" class="btn btn-primary  btn-block"/>
                                    </div>
                                </form>
                            </div>

                            <div class="panel-footer">
                                <label class="checkbox pull-left">
                                    <input type="checkbox" value="1" name="remember" id="remember" disabled="true">
                                    <strike>Keep me logged in</strike> </label>
                                <p class="text-center pull-right"> <a href="javascript:void(0);"><strike> Lost your password?</strike> </a></p>
                                <div style=" clear:both"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
       
       </div>
		<script src="resource/oe/assets/js/scripts/jquery-2.2.0.min.js"></script>
	    <script src="resource/oe/assets/js/scripts/jquery-ui.min.js"></script>
	    <script src="resource/oe/assets/js/scripts/jquery.validate.min.js"></script>
	    <script src="resource/oe/assets/js/scripts/bootstrap.min.js"></script>
        <script type="text/javascript">
            $(document).ready(function () {
            	$("#uname").focus();
                window.validateForm = function () {
                    var isFormValid = true;
                    var uname = $('#uname').val();
                    var passwd = $('#passwd').val();
                    if (uname === '') {
                        $('#uname').removeClass("ng-valid ng-dirty");
                        $('#uname').addClass("ng-invalid ng-dirty");
                        $('#uname').focus();
                        isFormValid = false;
                    } else {
                        $('#uname').removeClass("ng-invalid ng-dirty");
                        $('#uname').addClass("ng-valid ng-dirty");
                    }
                    if (passwd === "") {
                        $('#passwd').removeClass("ng-valid ng-dirty");
                        $('#passwd').addClass("ng-invalid ng-dirty");
                        if (isFormValid)
                            $('#passwd').focus();
                        isFormValid = false;
                    } else {
                        $('#passwd').removeClass("ng-invalid ng-dirty");
                        $('#passwd').addClass("ng-valid ng-dirty");
                    }
                    if (isFormValid) {
                        $('#loginAlert').hide();
                        $('#InvalidloginAlert').hide();
                        return true;
                    } else {
                        $('#loginAlert').show();
                        $('#InvalidloginAlert').hide();
                        return false;
                    }
                };

                $("#uname").change(function () {
                    $('#uname').removeClass("ng-invalid ng-dirty");
                    $('#uname').addClass("ng-valid ng-dirty");
                });
            });
        </script>
    </body>
</html>