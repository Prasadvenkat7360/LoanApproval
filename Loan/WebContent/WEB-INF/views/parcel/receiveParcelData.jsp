<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Modal Edit Receive Parcel Heading -->
<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h4 class="modal-title">
		Edit Receive Parcel Details <label>(Parcel ID : ${parcelId} )</label>
	</h4>
</div>

<div id="mySidenav" class="sidenav">
  	<div class="pull-right"><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></div>
	<jsp:include page="/WEB-INF/views/common/authorization.jsp" flush="true"></jsp:include>
</div>
<!-- Modal Edit Receive Parcel Body -->
<div class="modal-body">
	<div class="container-fluid">
		<!-- Modal Window Edit Receive Parcel Form End -->
		<form action="./updateParcelAcknowledge" method="post"	id="recieveParcelData">
			<!-- First Row Started -->
			<div class="row">
				<div class="col-sm-2">
					<label>Parcel ID</label> 
					<input type="text" disabled class="form-control" id="parcelID" name="parcelId"	value="${parcel.parcelId}">
				</div>
				<div class="col-sm-2">
					<label>Vendor Code</label> 
					<input type="text" class="form-control"	placeholder="${parcel.vendorCode}" id="vendorCode"	disabled="disabled">
				</div>
			</div>
			<div class="heading-block">&nbsp;</div>
			<div class="row">
				<div class="col-sm-3">
					<label>DC </label> 
					<input type="text" class="form-control" placeholder="${parcel.dcName}" id="dcRp" disabled="disabled">


				</div>

				<div class="col-sm-3">
					<label>Material Type</label> 
					<input type="text"	class="form-control" placeholder="${parcel.materialTYpe}" id="materialTYpe" disabled="disabled">
				</div>
				<div class="col-sm-3">
					<label>Insured Amount</label> 
					<input disabled type="text"	class="form-control" placeholder="${parcel.insuranceValue}"	id="insuredAmnt">
				</div>
				<div class="col-sm-3">
					<label>No of Boxes</label> <input disabled type="text"	class="form-control" placeholder="${parcel.noOfParcels}" id="noOfBoxes">
				</div>
			</div>

			<!-- Second Row Started -->
			<div class="row">
				<div class="col-sm-3">
					<label>Courier Agency Name</label> 
					<input disabled type="text"	class="form-control" placeholder="${parcel.coureirAgencyName}"	id="courierAgencyName">
				</div>
				<div class="col-sm-3">
					<label>Courier Receipt Number</label> 
					<input disabled type="text" class="form-control" placeholder="${parcel.courierDocNumber}" id="courierRecNo">
				</div>

				<div class="col-sm-3">
					<label>Courier Charges </label> 
					<input disabled type="text"	class="form-control" placeholder="${parcel.courierCharges}"	id="courierCharges">
				</div>

				<div class="col-sm-3">
					<label>Courier Charges Borne By</label> 
					<input disabled type="text"	class="form-control" placeholder="${parcel.courierChargesBy}" id="courierBorneBy">
				</div>
			</div>

			<!-- Third Row Started -->
			<div class="row">
				<div class="col-sm-3">
					<label>Parcel Delivery Mode</label> 
					<input disabled type="text" class="form-control" placeholder="${parcel.parcelDelvMode}"	id="parcelDelMode">
				</div>

				<div class="col-sm-3">
					<label>Parcel Gross Weight</label> 
					<input disabled type="text"	class="form-control" placeholder="${parcel.grossWeight}" id="parcelGrWt">
				</div>
				<div class="col-sm-3">
					<label>Parcel Received By</label> 
					<input disabled type="text"	class="form-control" placeholder="${parcel.parcelRecivBy}"	id="parcelRecBy">
				</div>
				<div class="col-sm-3">
					<label>Parcel Sent Through</label> 
					<input type="text" class="form-control" placeholder="${parcel.sendThruPersonName}"	id="parcelSentThru" disabled>
				</div>
			</div>
			<!-- Fouth Row Started -->
			<div class="heading-block">&nbsp;</div>
			<c:if	test="${parcel.parcelStatus =='Open' && userId == parcel.assignToId && parcel.acknowledgedFlag == true}">
				<div class="row">
					<div class="col-sm-3">
						<label>Remarks</label> 
						<input type="text" class="form-control"	value="${parcel.remarks}" id="remarks" maxlength="200">
					</div>
					<div class="col-sm-3">
						<label>Parcel Assigned to</label>
						<c:choose>									
                  			<c:when test="${parcel.parcelDelvMode != 'By Person' || parcel.parcelDelvMode == 'By Person'}">
								<select id="parcelAssignTo" class="form-control">
								<option value="">--Select--</option>
								<c:forEach var="employee" items="${employees}">
								<%-- <c:choose>
									<c:when test="${employee.hrmsId == parcel.assignToId}">
										<option value="${employee.hrmsId}" selected="selected">${employee.name}</option>
									</c:when>
									<c:otherwise> --%><!-- code to be deleted: all the employee to be shown-->
									<option value="${employee.hrmsId}">${employee.name}</option>
									<%-- </c:otherwise>
								</c:choose> --%>
								</c:forEach>
								</select>
							</c:when>						
						 	<c:otherwise>
						  		<input type="text" class="form-control" placeholder="${parcel.asignTo}"	id="parcelAssignTo" name="parcelAssignTo" readonly>
						 	</c:otherwise>
						 </c:choose>
					</div>
					<div class="col-sm-3">
						<label>Parcel Status</label> <select id="parcelStatus"
							class="form-control" name="parcelStatus">
							<c:forEach var="status" items="${parcelStatus}">
								<c:if test="${status == parcel.parcelStatus}">
									<option value='${status }' selected="selected">${status}</option>
								</c:if>
								<c:if test="${status != parcel.parcelStatus}">
									<option value='${status}'>${status}</option>
								</c:if>
							</c:forEach>
						</select>

					</div>
					<div class="col-sm-3">
						<label>Parcel Close Remarks</label> 
						<input type="text"	class="form-control" placeholder="Parcel Close Remarks"	id="parcelRemarks" maxlength="200">
					</div>
				</div>
			</c:if>


			<c:if
				test="${parcel.parcelStatus !='Open' || userId != parcel.assignToId || userId == parcel.assignToId && parcel.acknowledgedFlag == false}">

				<div class="row">
					<div class="col-sm-3">
						<span class="required" id="lostRemk">*</span><label>Remarks</label> <input type="text" class="form-control"
							placeholder="${parcel.remarks}" id="remarks" name="remarks" disabled="disabled">
					</div>
					<div class="col-sm-3">
						<label>Parcel Assigned to</label> 	<select id="parcelAssignTo" class="form-control"  disabled="disabled">
							<option value="">--Select--</option>
							<c:forEach var="employee" items="${employees}">
								<%-- <c:if test="${employee.hrmsId == parcel.assignToId}">
									<option value="${employee.hrmsId}" selected="selected">
										${employee.name}</option>
								</c:if>
								<c:if test="${employee.hrmsId != parcel.assignToId}">
									<option value="${employee.hrmsId}">${employee.name}</option>
								</c:if> --%><!-- code to be deleted: all the employee to be shown-->
								<option value="${employee.hrmsId}">${employee.name}</option>
							</c:forEach>
						</select>
					</div>
					<div class="col-sm-3">
						<label>Parcel Status</label>
						<select id="parcelStatus" name="parcelStatus"
							class="form-control" disabled>
						 <c:forEach var="status" items="${parcelStatus}">	
								<c:if test="${status == parcel.parcelStatus}">
									<option value='${status }' selected="selected">${status}</option>
								</c:if>
								<c:if test="${status != parcel.parcelStatus}">
									<option value='${parcel.parcelStatus}' >${parcel.parcelStatus}</option>
								</c:if>
							</c:forEach>
                     </select>
					</div>
					<div class="col-sm-3">
						<span id="clsRem" class="required">*</span><label>Parcel Close Remarks</label> <input type="text"
							class="form-control" placeholder="${parcel.remarks}"
							id="parcelRemarks" disabled="disabled" >
					</div>
				</div>
			</c:if>


		</form>
		<!-- Modal Window Edit Receive Parcel Form End -->

	</div>
</div>


<div class="modal-footer  text-center">
	<c:if
		test="${parcel.parcelStatus =='Open' && userId == parcel.assignToId && parcel.acknowledgedFlag == true}">
		<button type="submit" class="btn btn-primary  btn-sm" id="edit" name="edit">
			<i class="fa fa-pencil fa-lg"></i>&nbsp;Save
		</button>
		<button type="submit" class="btn btn-warning  btn-sm" data-dismiss="modal">
			<i class="fa fa-times fa-lg"></i>&nbsp;Close
		</button>
     <button type="submit"  id="mrvMade" name="mrvMade" class="btn btn-primary  btn-sm">
			<i class="fa fa-pencil fa-lg"></i>&nbsp;GRV Made
		</button>
	</c:if>

	<c:if
		test="${parcel.parcelStatus =='Open' && userId == parcel.assignToId && parcel.acknowledgedFlag == false}">
     <div id = "acknowledgeDiv">
		<button type="submit" class="btn btn-primary  btn-sm" id="acknowledge"
			name="acknowledge">
			<i class="icon-ok-sign fa-lg"></i>Acknowledge
		</button>
		<button type="submit" class="btn btn-warning  btn-sm" data-dismiss="modal">
			<i class="fa fa-times fa-lg"></i>&nbsp;Close
		</button>
		
		</div>
		
		<div id = "editDiv" style="display: none;">
			<button type="button" class="btn btn-primary  btn-sm" id="edit" name="edit">
			<i class="fa fa-pencil fa-lg"></i>&nbsp;Save
		</button>
		<button type="submit" class="btn btn-warning  btn-sm" data-dismiss="modal">
			<i class="fa fa-times fa-lg"></i>&nbsp;Close
		</button>
		 <button type="submit"  id="mrvMade" name="mrvMade" class="btn btn-primary  btn-sm">
			<i class="fa fa-pencil fa-lg"></i>&nbsp;GRV Made
		</button>
		</div>
	</c:if>

	<c:if test="${parcel.parcelStatus !='Open' ||  userId != parcel.assignToId}">
		<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal">
			<i class="fa fa-times"></i>&nbsp;Cancel
		</button>
	</c:if>
</div>
<script type="text/javascript">

$("#mrvMade").on(
		'click',
		function() {
			var assignTo = '${parcel.asignTo}';
			var parcelAssignTo = $('select[name=parcelAssignTo]').val();
			var parcelStatus = $('select[name=parcelStatus]').val();
			
	if(parcelAssignTo != null && parcelAssignTo != "" && assignTo.valueOf() != parcelAssignTo.trim().valueOf()) {
				
				$.growl.error({
					message : "Assigned",
					duration : 10000
				});
				return false;
			}
	else if (parcelStatus != 'Open') {		
			
			$.growl.error({
				message : "Status should be open",
				duration : 10000
			});
			return false;
		}
			showContentPage('materialReceiveVoucher?parcelId=${parcel.parcelId}&vendorCode=${parcel.vendorCode}&vendorId=${parcel.vendorId}&vendorName=${parcel.vendorName}&mode=parcel', 'bodySwitcher')
			$("#jqxgrid").modal('hide');
			$('.modal-backdrop').hide();
			$("body").removeClass('modal-open');
		});
		
	$("#edit").on('click',function() {
		var parcelStatus = $('select[name=parcelStatus]').val();
		

		if (parcelStatus == 'Close') {		
			var parcelAssignTo = $('#parcelAssignTo option:selected').html();
			var parcelRemarks = $("#parcelRemarks").val();
			var assignTo = '${parcel.asignTo}';
			/* if(parcelAssignTo != null && parcelAssignTo != "" && assignTo.valueOf() != parcelAssignTo.trim().valueOf()) {
				$.growl.error({
					message : "Status should be open",
					duration : 10000
				});
				return false;
			} */
			 if (parcelRemarks == "" || parcelRemarks == null) {
				$.growl.error({
					message : "Closed remarks are mandatory",
					duration : 10000
				});
				return false;
			 }
				
		}
	
		//if (parcelUpdateDataValidation('${parcel.asignTo}')) {	
			if(parcelStatus == "Lost"){
				var assignTo = '${parcel.asignTo}';
				var lostRem = $("#remarks").val();
				console.log(lostRem);
				var parcelAssignTo = $('#parcelAssignTo option:selected').html();
				/* if(parcelAssignTo != null && parcelAssignTo != "" && assignTo.valueOf() != parcelAssignTo.trim().valueOf()) {
					$.growl.error({
						message : "Status should be open",
						duration : 10000
					});
					return false;
				} */
				
				if(lostRem == ""){
					$.growl.error({
						message : "Please Enter Remarks !!!",
						duration :10000,
						title : 'Error'
					});
					return false;
				} else{
					var authorization = {
			    			"code" : "LP",
			    			"description" : "Lost Parcel",
			    			"docType" : "PARCEL",
			    			"docNo" : '${parcel.parcelId}',
			    		}
		    		localStorage.setItem("authorization",JSON.stringify(authorization));
					openNav('LP');
				}
					
			}else{
				saveAdj();
			}
		//}
	});
	

	function saveAdj(){
		var authById = localStorage.getItem("authById");
		 var authByName = localStorage.getItem("authByName");
		  
		var  parcel = {};
			parcel["parcelId"] = $('#parcelID').val();
			parcel["parcelStatus"] = $('select[name=parcelStatus]').val();
			parcel["remarks"] = $('#remarks').val();
			parcel["closedRemarks"] = $('#parcelRemarks').val();
			parcel["assignToId"] = $('#parcelAssignTo').val();
		    parcel["authorizedBy"] = authByName
		  
 		   postJSON("/OrderExecution/api/v1/updateParcel", JSON.stringify(parcel), function(data) {
			$("#edit").prop("disabled", true);
			if (1 == data.resCode) {
				$('#receiveParcelData').modal('hide');
				$("#jqxgrid").jqxGrid("updatebounddata");
				$("#btnReviewDA").modal('hide');
				$.growl.notice({
					message : "Successfully updated parcel: "
							+ data.payload.id,
					duration : 10000,
					title : 'Success'
				});
				if($("#parcelStatus").val() == "Lost"){
					authorization('A',2,$('#parcelID').val());	
				}
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			}
		});  
	}

/* 	function sentParcelData() {
		parcel = {};
		parcel["parcelId"] = $('#parcelID').val();
		parcel["parcelStatus"] = $('select[name=parcelStatus]').val();
		parcel["remarks"] = $('#remarks').val();
		parcel["closedRemarks"] = $('#parcelRemarks').val();
		parcel["assignToId"] = $('#parcelAssignTo').val();
		
		return parcel;
	} */

	function acknowledgedFlag(obj) {
		parcel = {};
		parcel["parcelId"] = $('#parcelID').val();

	}

	$("#acknowledge").on(
			'click',
			function() {

				
				postJSON(
						"/OrderExecution/api/v1/updateParcelAcknowledge?parcelId="
								+ $('#parcelID').val(), JSON.stringify(),
						function(data) {
							$("#acknowledge").prop("disabled", true);
							

							if (1 == data.resCode) {
								
								$("#acknowledgeDiv").hide();
								$("#editDiv").show();
								$("#parcelStatus").prop("disabled", false);
								$("#parcelAssignTo").prop("disabled", false);
								$("#parcelRemarks").prop('disabled', false);
								$("#remarks").prop('disabled', false);
								
								$.growl.notice({
									message : "Successfully updated parcel: "
											+ data.payload.id,
									duration : 10000,
									title : 'Success'
								});
							} else {
								$.growl.error({
									message : data.mesgStr,
									duration : 10000
								});
							}

						});

			});
	
	$('#parcelAssignTo').change(function() { 
		var parcelStatus = $('select[name=parcelStatus]').val();
		var userId = '${parcel.assignToId}';
		var parcelAssignTo = $('#parcelAssignTo :selected').val();
		var ackflag= ${parcel.acknowledgedFlag};
		if(parcelStatus=='Open'){
			$("#edit").prop("disabled", false);
			$("#mrvMade").prop("disabled", false);
		}else if(parcelStatus!='Open'){
			$("#edit").prop("disabled", true);
			$("#mrvMade").prop("disabled", true);
		}
		
		
	});
	
	$("#parcelStatus").on('change',function(){
		var parcelStatus = $('select[name=parcelStatus]').val();
		if(parcelStatus == "Lost"){
			$("#clsRem").hide();
			$("#lostRemk").show();
		}
		if(parcelStatus == "Close"){
			$("#lostRemk").hide();
			$("#clsRem").show();
		}
	});
	
	$(document).on('change','#parcelStatus',function(){
		var parcelStatus = $('select[name=parcelStatus]').val();
		var userId = '${parcel.assignToId}';
		var parcelAssignTo = $('#parcelAssignTo :selected').val();
		var ackflag= ${parcel.acknowledgedFlag};
		/* if(parcelStatus=='Open'){
			$("#edit").prop("disabled", false);
			$("#mrvMade").prop("disabled", false);
		}else if(parcelStatus!='Open'){
			$("#edit").prop("disabled", true);
			$("#mrvMade").prop("disabled", true);
		} */
	});
</script>