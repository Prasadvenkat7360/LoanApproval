<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="authorizationBlock">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Authorization Required
					</h1>
				</div>
				<form action="javascript:void(0)" id="authorizationForm">
					<div class="col-md-12">		        				
			       		<div class="form-group">
							<label class="control-label"><span class="required">*</span>&nbsp;Authorization Name</label>
							<select	class="form-control" id="authName">
								<option value="">-- Select Option --</option>
								<option></option>
							</select>	
						</div>
						<div class="form-group">
							<label><span class="required">*</span>&nbsp;Password</label>
							<input type="password" id="password" class="form-control" onchange="validateEmployee()" />
						</div>
						<div class="form-group">
							<label><span class="required">*</span>&nbsp;Remark</label>
							<textarea class="form-control" id="remarkAuth"></textarea>
						</div>
						<div class="form-group authorizationBlockBtn">
							<button type="button" class="btn btn-primary" onclick="authorization('A', 1, null)" id="authBtn">Authorize</button>	
							<button type="button" class="btn btn-primary" onclick="authorization('R', 1, null)" id="rejectBtn">Reject</button>		
						</div>										
		    		</div>
	    		</form>
				
   			
   			
			</div>
			
				
		</div>
		
		<div class="row">
			<div class="col-md-12 authorizationBlockBtn text-center">
				<h1 class="authorizationBlockOr">OR</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12 authorizationBlockBtn text-center">
 				<button class="btn btn-primary" disabled>Send Authorization Notification</button>
			</div>
		</div>
	</div>
</div>