<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	
	<h4 class="modal-title">
		Edit Send Parcel <label>(Parcel ID : ${parcelId} )</label>
	</h4>
</div>
<!-- Modal Add Send Parcel Body -->
<div id="mySidenav" class="sidenav">
  	<div class="pull-right"><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></div>
	<jsp:include page="/WEB-INF/views/common/authorization.jsp" flush="true"></jsp:include>
</div>
<div class="modal-body">
	<div class="container sentParcel-Edit">

		<!-- Modal Window View MIV Details Form End -->
		<div class="clearfix">&nbsp;</div>
		<!-- Modal Window Edit Send Parcel Form End -->

		<h3 class="heading-block">
			<i class="fa fa-pencil-square-o"></i> &nbsp; Edit Sent Parcel Details
		</h3>
		<form action="./updateParcel" method="post" name="updateParcel"
			id="updateParcelData">
			<!-- First Row Started -->
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Parcel ID</label> <input type="text" disabled
						class="form-control" id="parcelID" name="parcelId"
						value="${parcel.parcelId}"/ >
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Vendor Code</label> <input type="text" disabled
						class="form-control" placeholder="${parcel.vendorName}"
						id="vendorCode">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Send Parcel Date</label> <input type="text" disabled
						class="form-control" value="${parcel.createdDate}"
						id="sentParcelDate" name="createdDate">
				</div>
			</div>
			<div class="heading-block">&nbsp;</div>
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Courier Name</label> <input type="text" disabled
						class="form-control" value="${parcel.courierName}"
						id="courierName" name="courierName">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Courier Doc. No.</label> <input type="text" disabled
						class="form-control" value="${parcel.courierDocNumber}"
						id="courierDocNo" name="courierDocNo">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>From Place</label> <input type="text" disabled
						class="form-control" value="${parcel.fromPlace}" id="fromPlace"
						name="fromPlace">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>To Place</label> <input type="text" disabled
						class="form-control" value="${parcel.toPlace}" id="toPlace"
						name="toPlace">
				</div>
			</div>

			<!-- Second Row Started -->
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>No. Of Parcel</label> <input type="text" disabled
						class="form-control" value="${parcel.noOfParcels}" id="noOfParcel"
						name="noOfParcel">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Gross Wt.</label> <input type="text" disabled
						class="form-control" value="${parcel.grossWeight}" id="grossWt"
						name="grossWt">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Parcel Charges</label> <input type="text" disabled
						class="form-control" value="${parcel.courierCharges}" id="charges"
						name="charges">
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Person Sent By </label> <input type="text" disabled
						class="form-control" value="${parcel.sentBy}" id="sentBy"
						name="sentBy">
				</div>
			</div>

			<!-- Third Row Started -->
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Insurance Charges (Rs.)</label> <input type="text" disabled
						class="form-control" value="${parcel.insuranceCharges}"
						id="insuranceCharges" name="insuranceCharges">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Insurance Value (Rs.)</label> <input type="text" disabled
						class="form-control" value="${parcel.insuranceValue}"
						id="insuranceVal" name="insuranceVal">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>VAT No.</label> <input type="text" disabled
						class="form-control" value="${parcel.vatNumber}" id="vatNo"
						name="vatNo">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>T20 /Way Bill Form Number</label> <input type="text"
						disabled class="form-control" value="${parcel.t20WayBill}"
						id="billFormNo" name="billFormNo">
				</div>
			</div>
			<c:if test="${(parcel.parcelStatus == 'Delivered') || (parcel.parcelStatus == 'Lost')}">
				<div class="row">
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
						<label>Delivered Date</label>
						<div class="input-group send-parcel">
							<input type="text" class="date-picker form-control"
								id="deliveryDate" name="deliveryDate"
								value="${parcel.deliverDate}" disabled="disabled">
							
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
						<label>Parcel Updated Status</label> <input type="text"
							id="updatedStatus" class="form-control" name="parcelStatus"
							value="${parcel.parcelStatus}" disabled="disabled">
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-field">
						<label>Remarks</label>
						<textarea class="form-control" row="1" col="30"
							placeholder="Remarks" id="remarks" disabled="disabled">${parcel.remarks}</textarea>
					</div>
				</div>
			</c:if>
			<div class="row">
				<h3 class="heading-block">
					<i class="fa fa-list"></i> &nbsp; GIV Details
				</h3>
				<!-- Modal Window View MIV Details Form End -->
				<table class="table table-hover scroll">
					<thead>
						<tr style="width: calc(100% - 2px);">
							<th>GIV No.</th>
							<th>GIV Date</th>
						</tr>
					</thead>

					<tbody>
						<c:forEach var="mivObj" items="${mivList}">
							<tr>
								<td>${mivObj.mivSrialNo}</td>
								<td>${mivObj.mivDate}</td>
							</tr>
						</c:forEach>

					</tbody>
				</table>

			</div>
			<!-- Fouth Row Started -->
			<div class="heading-block">&nbsp;</div>
			<!-- Fifth Row Started -->

			<c:if test="${parcel.parcelStatus == 'In-Transit'}">
				<div class="row">
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
						<span class="required" id="delDate">*</span><label>Delivered Date</label>
						<div class="input-group send-parcel">
							<input type="text" class="date-picker form-control"
								id="deliveryDate" name="deliveryDate" placeholder="DD/MM/YYYY" disabled>
							<label for="deliveryDate" class="input-group-addon cursor"><span
								class="fa fa-calendar"></span></label>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
						<label>Parcel Updated Status</label> <select id="updatedStatus"
							class="form-control">
							<c:forEach var="status" items="${parcelStatus}">
								<c:if test="${status == parcel.parcelStatus}">
									<option value=${status } selected="selected">${status}</option>
								</c:if>
								<c:if test="${status != parcel.parcelStatus}">
									<option value=${status }>${status}</option>
								</c:if>
							</c:forEach>
						</select>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-field">
						<span class="required" id="lpRem">*</span><label>Remarks</label>
						<textarea class="form-control" row="1" col="30"
							placeholder="Remarks" id="remarks" maxlength="200"></textarea>
					</div>
				</div>
			</c:if>



		</form>
		<!-- Modal Window Edit Send Parcel Form End -->
	</div>

</div>
<!-- Modal Edit Send Parcel Footer -->

<div class="modal-footer  text-center">
<c:choose>
	<c:when test="${parcel.parcelStatus == 'In-Transit'}">
		<button type="submit" class="btn btn-primary" id="edit" name="edit">
			<i class="fa fa-pencil fa-lg"></i> Save
		</button>


		<button type="submit" class="btn btn-warning" data-dismiss="modal">
			<i class="fa fa-times fa-lg"></i>&nbsp;Close
		</button>
	</c:when>
	<c:otherwise>
		<button type="submit" class="btn btn-warning" data-dismiss="modal">
			<i class="fa fa-times"></i>&nbsp;Cancel
		</button>
	</c:otherwise>
	</c:choose>
</div>

<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>	
<script type="text/javascript">
	$("#deliveryDate").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy"
	});
	$("#deliveryDate").mask('99/99/9999');

/* 	$('#updateParcelData').validate({
	    errorElement: 'label', 
	    errorClass: 'help-inline', 
	    focusInvalid: false, 
	    ignore: "",
	    
	    submitHandler: function (form) { 
	    	var authorization = {
	    			"code" : "LP",
	    			"description" : "Lost Parcel",
	    			"docType" : "PARCEL",
	    			"docNo" : $("#parcelId").val(),
	    			"transactionAmt" : null,
	    	}
	    	
	    	localStorage.setItem("authorization",JSON.stringify(authorization));
	    	
				openNav('LP');
			
	    }  
	}); */
	
	
$("#delDate").hide();
$("#lpRem").hide();
$("#updatedStatus").on('change',function(){
	var parcelStatus = $('#updatedStatus option:selected').html();

	if (parcelStatus == 'Delivered') {
		$("delDate").show();
		$("#lpRem").hide();
	}
	if (parcelStatus == 'Lost') {
		$("#lpRem").show();
		$("delDate").hide();
	}
})	

$("#edit").on('click',function() {
	var parcelStatus = $('#updatedStatus option:selected').html();

	if (parcelStatus == 'Delivered') {
		var deliveryDate = $("#deliveryDate").val();
		if (deliveryDate == "" || deliveryDate == null) {
			$.growl.error({
				message : "Delivery date is mandatory",
				duration : 10000
			});
		return false;
		}

	}
	if (parcelStatus == 'Lost') {
		var remarks = $("#remarks").val();
		if (remarks == "" || remarks == null) {
			$.growl.error({
				message : "Remarks is mandatory",
				duration : 10000
			});
			return false;
		}
		var authorization = {
    			"code" : "LP",
    			"description" : "Lost Parcel",
    			"docType" : "PARCEL",
    			"docNo" : $("#parcelId").val(),
    			"transactionAmt" : null,
    	}
    	
    	localStorage.setItem("authorization",JSON.stringify(authorization));
			openNav('LP');

	}
	else{
		saveAdj();
	}

});

	
	function saveAdj(){
		var authById = localStorage.getItem("authById");
		 var authByName = localStorage.getItem("authByName");
		  
		var parcel = {};
		parcel["parcelId"] = $('#parcelID').val();
		parcel["parcelStatus"] = $('#updatedStatus').val();
		parcel["remarks"] = $('#remarks').val();
		parcel["deliverDate"] = $('#deliveryDate').val() == "" ? null : $('#deliveryDate').val();
		parcel["authorizedBy"] = authByName
		  
		 postJSON("/OrderExecution/api/v1/updateParcel", JSON.stringify(parcel), function(data) {
		$("#edit").prop("disabled", true);
			if (1 == data.resCode) {
				$.growl.notice({
					message : "Successfully updated parcel: "
							+ data.payload.id,
					duration : 10000,
					title : 'Success'
				});
				 if($("#updatedStatus").val() == "Lost"){
					authorization('A',2,$('#parcelID').val());	
				}
				
			     $('#parcelData').modal('hide');
				$("#jqxgrid").jqxGrid("updatebounddata");  
				} else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
				}
			}); 
	}
	$("#updatedStatus").on("change",function(){
		if($(this).val()!="Delivered"){
			$("#deliveryDate").attr("disabled", true);
			$("#deliveryDate").datepicker('setDate', null);
		}else{
			$("#deliveryDate").attr("disabled", false);
		}
	});
</script>
