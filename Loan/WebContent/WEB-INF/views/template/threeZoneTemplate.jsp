<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html id="mainBody" lang="en">
 		<head>
   		<meta charset="utf-8">
   		<meta http-equiv="X-UA-Compatible" content="IE=edge">
   		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
   		<meta name="description" content="">
   		<meta name="author" content="">
   		<meta http-equiv='cache-control' content='no-cache'>
   		<meta http-equiv='expires' content='0'>
   		<meta http-equiv='pragma' content='no-cache'>   		

		<link rel="stylesheet" href="resource/oe/assets/css/font-awesome.min.css?v=${pageContext.session.id}">
		<link rel="stylesheet" href="resource/oe/assets/css/jquery-ui.css?v=${pageContext.session.id}">
		<link rel="stylesheet" href="resource/oe/assets/css/bootstrap.min.css?v=${pageContext.session.id}">
		<link rel="stylesheet" href="resource/oe/assets/css/jquery.growl.css?v=${pageContext.session.id}">
		<link rel="stylesheet" href='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/jqwidgets/styles/jqx.base.css?v=${pageContext.session.id}' type="text/css" />
		<link rel="stylesheet" href='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/jqwidgets/styles/jqx.energyblue.css?v=${pageContext.session.id}' type="text/css" />
		<link rel="stylesheet" href='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/jqwidgets/styles/jqx.fresh.css?v=${pageContext.session.id}' type="text/css" />
		<link rel="stylesheet" href="resource/oe/assets/css/bootstrap-multiselect.css?v=${pageContext.session.id}">
		<link rel="stylesheet" href="resource/oe/assets/css/editor.css?v=${pageContext.session.id}">
		<link rel="stylesheet" href="resource/oe/assets/css/custom.css?v=${pageContext.session.id}">
		<link rel="stylesheet" href="resource/oe/assets/css/custom.css?v=${pageContext.session.id}">
		<link href="https://cdn.jsdelivr.net/bootstrap.timepicker/0.2.6/css/bootstrap-timepicker.min.css" rel="stylesheet" />
		
	</head>
	<body>
		<nav class="navbar navbar-site navbar-default navbar-fixed-top">
		<tiles:insertAttribute name="header" /> </nav>
	
		<div id="bodySwitcher" class="main-container">
			<tiles:insertAttribute name="body" />
		</div>
	
		<div id="footer" class="footer navbar-fixed-bottom ng-scope">
			<tiles:insertAttribute name="footer" />
		</div>
		
		   
    <!-- Notification View -->
<div class="modal fade" id="viewNotificationDetCom">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Edit Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-eye fa-sm"></i> &nbsp;Notification Modal Window
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" action="javascript:void(0);" id="NotificationFormView">
				<div class="col-md-12 mobile-responsive">	
				<div class="clearfix">&nbsp;</div>	
					<div class="row">
						<input type="hidden" class="form-control" id="notifIdE">
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>From Store/DC</label><input type="text" class="form-control" id="fromStoreDcTypeV" disabled>
							</div>
							
							<input type="hidden" class="form-control" id="fromStoreDcNameIdV">
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>From Store/DC Name</label> <input type="text" class="form-control" id="fromStoreDcNameV" disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>To Store/DC</label> <input type="text" class="form-control" id="toStoreDcV" disabled>
							</div>
							
							<input type="hidden" class="form-control" id="toStoreDcNameIdV">
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>To Store/DC Name</label> <input type="text" class="form-control" id="toStoreDcNameV" disabled>
							</div>				
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Raised By</label> <input type="text" class="form-control" id="raisedByV" disabled>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Raised To </label><input type="text" class="form-control" id="raiseToV" disabled>
						</div>
						
						<input type="hidden" class="form-control" id="roleIdE">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Raised To Role</label> <input type="text" class="form-control" id="roleV" disabled>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Title</label>
								<input type="text" class="form-control" id="titleV" disabled>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span><label>Message</label>
								<input type="text" class="form-control" id="messageV" disabled>
						</div>
						<div class="col-md-9 form-field">
							<span class="required">*</span><label>Remarks</label>
							<textarea rows="2" cols="50" id="remarksV" name="remarksV" placeholder="" class="form-control"></textarea>
						</div>
						 
					</div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>	
			<div class="modal-footer  text-center">			
				<button type="button" class="btn btn-primary btn-sm" id="updateNotification" data-dismiss="modal">
					<i class="fa fa-plus fa-lg"></i>&nbsp; Update
				</button>
				<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Close
				</button>
			</div>			
		</div>
	</div>
</div>

<!-- Alert view  -->
<div class="modal fade" id="viewAlertDet" >
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Edit Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-eye fa-sm"></i> &nbsp;Alert Modal Window
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" action="javascript:void(0);" id="rmFgViewForm">
				<div class="col-md-12 mobile-responsive">	
				<div class="clearfix">&nbsp;</div>	
					<div class="row">
						<input type="hidden" class="form-control" id="alertIdE" disabled>
						<input type="hidden" class="form-control" id="readOrUnreadE" disabled>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>From Store/DC</label> 
								   <input type="text" class="form-control" id="fromStoreOrDcTypeE" disabled>
							</div>
							
							<input type="hidden" class="form-control" id="fromStoreOrDcIdE" disabled>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>From Store/DC Name</label> 
								   <input type="text" class="form-control" id="fromStoreOrDcNameE" disabled>
							</div>
							
							<input type="hidden" class="form-control" id="toStoreOrDcIdE" disabled>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>To Store/DC</label> 
								<input type="text" class="form-control" id="toStoreOrDcE" disabled>
							</div>
							
							<input type="hidden" class="form-control" id="toStoreOrDcNameIdE" disabled>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>To Store/DC Name</label> 
									<input type="text" class="form-control" id="toStoreOrDcNameE" disabled>
							</div>				
					</div>
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Raised By</label> 
									<input type="text" class="form-control" id="raisedByE" disabled>
							</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Authorized By</label> 
								<input type="text" class="form-control" id="authorizedByE" disabled>
							</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Raised To </label>
								<input type="text" class="form-control" id="raisedToE" disabled>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Title</label>
							<input type="text" class="form-control" id="titleE" disabled>
						</div>
					</div>
					<div class="row">
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Message</label>
								<input type="text" class="form-control" id="messageE" disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span><label>Status</label> <select id="statusE" name="statusE" class="form-control">
									<option value="" selected label="Select" /></select>
							</div>
							<div class="col-md-9 form-field">
								<span class="required">*</span><label>Remarks</label>
								<textarea rows="3" cols="50" id="remarksE" name="remarksE" placeholder="" class="form-control"></textarea>
							</div>
					</div>
				</div>
			</form>
			<div class="modal-footer  text-center">			
				<button type="button" class="btn btn-primary btn-sm" id="updateAlert" data-dismiss="modal">
					<i class="fa fa-plus fa-lg"></i>&nbsp; Update
				</button>
				<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Close
				</button>
			</div>			
		</div>
	</div>
</div>

		<script type="text/javascript" src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/scripts/jquery-2.2.0.min.js?v=${pageContext.session.id}'></script>
		<script src="resource/oe/assets/js/scripts/jquery-ui.min.js?v=${pageContext.session.id}"></script>
		<script src="resource/oe/assets/js/scripts/bootstrap.min.js?v=${pageContext.session.id}"></script>
		<script src="resource/oe/assets/js/scripts/jquery.mask.min.js?v=${pageContext.session.id}"></script>
		<script src="resource/oe/assets/js/scripts/jquery.validate.min.js?v=${pageContext.session.id}"></script>
		<script src="resource/oe/assets/js/scripts/jquery.growl.js?v=${pageContext.session.id}"></script>
		<script src="resource/oe/assets/js/scripts/jquery.tmpl.min.js?v=${pageContext.session.id}"></script>
		<script src="resource/oe/assets/js/scripts/moment.js?v=${pageContext.session.id}"></script>
		<script src="resource/oe/assets/js/scripts/bootstrap-multiselect.js?v=${pageContext.session.id}"></script>
		<script src="resource/oe/assets/js/scripts/jquery.twbsPagination.js?v=${pageContext.session.id}"></script>	
		<script src="resource/oe/assets/js/scripts/editor.js?v=${pageContext.session.id}"></script>	
		<script type="text/javascript" src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/jqwidgets/jqx-all5.js?v=${pageContext.session.id}'></script>
		<script type="text/javascript" src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app/grid.js?v=${pageContext.session.id}'></script>
		<script type="text/javascript" src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app.js?v=${pageContext.session.id}'></script>
		<script type="text/javascript" src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/scripts/alasql.min.js?v=${pageContext.session.id}'></script>
		<script type="text/javascript"	src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/scripts/xlsx.core.min.js?v=${pageContext.session.id}'></script>
		<script type="text/javascript" src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/scripts/export-import.util.js?v=${pageContext.session.id}'></script>	
		<script src="resource/oe/assets/js/scripts/date.js?v=${pageContext.session.id}"></script>
		<script src="resource/oe/assets/js/scripts/validate-custom.js?v=${pageContext.session.id}"></script>	
		<script type="text/javascript" src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app/order.js?v=${pageContext.session.id}'></script>
		<script type="text/javascript"	src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app/indent.js?v=${pageContext.session.id}'></script>
		<script type="text/javascript"	src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/scripts/websocket.js?v=${pageContext.session.id}'></script>
		<script src="resource/oe/assets/js/app/commonAlertNotification.js?v=${pageContext.session.id}"></script>
		<script src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app/authorization.js?v=${pageContext.session.id}'></script>
		<div id="loading" class="loading" style="display: none;"><p><img src="resource/oe/assets/css/images/loading.gif" height="40" width="40" /></p></div>
		 <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.22/pdfmake.min.js"></script>
    	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
   		<script src="https://cdn.jsdelivr.net/bootstrap.timepicker/0.2.6/js/bootstrap-timepicker.min.js"></script>
	</body>
</html>