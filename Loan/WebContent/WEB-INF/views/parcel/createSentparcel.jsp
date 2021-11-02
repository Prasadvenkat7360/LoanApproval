<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->	
	<h3 class="modal-title">
		<i class="fa fa-plus fa-lg"></i> &nbsp;Create Sent Parcel
	</h3>
</div>
<!-- Modal Create Send Parcel Body -->
<div class="modal-body">
	<div class="container">
		<!-- Modal Window Create Send Parcel Form End -->
		<form action="#" method="post" id="SentParcel">
			<!-- First Row Started -->
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
				
			<span class="required">*</span>	<label for="tags">Vendor </label>
  <input id="vendors" class="form-control" type="text"  placeholder="Vendor Name">
  <input id="vendor-parcel" type="hidden" name="code">
				
					<!-- <label>Vendor Code</label>
					 <input type="text" class="form-control"
						placeholder="Vendor Code" id="vendor" name="vendorCode">
						<input id="vendorCode" class="form-control" type="text" placeholder="Vendor Name">
						<input id="vendorCode-value" type="hidden" name="code">	 -->
				</div>
			</div>
			<div class="heading-block">&nbsp;</div>
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span><label>Courier Name</label> <select id="couriers"
						class="form-control">
						<option value="" selected label="--Select--" />
					</select>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Courier Doc. No.</label> <input type="text"
						class="form-control" placeholder="Courier Doc. No."
						id="courierDocNo" name="courierDocNumber" maxlength="200">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>From Place</label> <input type="text" class="form-control alphaChar"
						placeholder="From Place" id="fromPlace" name="fromPlace" maxlength="200">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>To Place</label>
					
					<input type="text" class="form-control alphaChar" placeholder="To Place"
						id="toPlace" name="To Place" maxlength="200">
				</div>
			</div>

			<!-- Second Row Started -->
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span><label>No. Of Parcels</label> <input type="number"
						class="form-control" placeholder="No. Of Parcel" id="noOfParcel"
						name="pieces" min="1" max="10">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
				<span class="required">*</span>	<label>Gross Wt.</label> <input type="number" class="form-control"
						placeholder="Gross Wt." id="grossWt" name="grossWeight" min="0.001" max="99999999.999" step='0.001'>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Parcel Charges</label> <input type="number"
						class="form-control" placeholder="Parcel Charges" id="charges"
						name="courierCharges" min="0.01" max="9999999999.99" step='0.01'>
				</div>
				   
				  <!--  <input type="text" id="vatNo" /> 
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>GSTIN No.</label> <input type="text" class="form-control"
						placeholder="GSTIN No." id="vatNoC" name="vatNumber" maxlength="50">
				</div> -->
				
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>GSTIN No.</label> 
					<select id="vatNo" class="form-control">
						<option value="" selected label="--Select--" />
					</select>
				</div>	
				
			</div>

			<!-- Third Row Started -->
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Insurance Charges (Rs.)</label> <input type="number"
						class="form-control" placeholder="Insurance Charges"
						id="insuranceCharges" name="insuranceCharges" min="0.01" max="9999999999.99" step='0.01'>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Insurance Value (Rs.)</label> <input type="number"
						class="form-control" placeholder="Insurence Value"
						id="insuranceVal" name="insuranceValue" min="0.01" max="9999999999.99" step='0.01'>
				</div>
			
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>T20 /Way Bill Form Number</label> <input type="text"
						class="form-control" placeholder="T20 /Way Bill Form Number"
						id="billFormNo" name="t20WayBill" maxlength="200">
				</div>
				
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Courier Date</label> <div class="input-group send-parcel">
							<input type="text" class="date-picker form-control"
								id="courierDate" name="courierDate" placeholder="DD/MM/YYYY">
							<label for="courierDate" class="input-group-addon cursor"><span
								class="fa fa-calendar"></span></label>
						</div>
				</div>
			</div>
			<!-- Fouth Row Started -->

			<div class="row">		
				<div class="heading-block">
					<h4>
						<i class="fa fa-list"></i>&nbsp; GIV Details
					</h4>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-field">
					<div id="mivDetail"></div>
				</div>
			</div>
			<div class="row">		
				<div class="heading-block">
					<h4>
						<i class="fa fa-list"></i>&nbsp;Vendor Return Numbers
					</h4>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-field" id="vrDet">
					<div id="vendRetDetails"></div>
				</div>
			</div>
		</form>
		<!-- Modal Window Create Send Parcel Form End -->
	</div>
</div>

<!-- Modal Create Send Parcel Footer -->
<div class="modal-footer  text-center">
	<button type="button" class="btn btn-primary" id="save" name="save" >
		<i class="fa fa-plus"></i>&nbsp;Create
	</button>
	<button type="submit" class="btn btn-warning" data-dismiss="modal">
		<i class="fa fa-times"></i>&nbsp;Close
	</button>

</div>
<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>	
<script type="text/javascript">	
$("#courierDate").datepicker({
	changeMonth : true,
	changeYear : true,
	maxDate: 0,
	dateFormat : "dd/mm/yy"
});  
var $couriers = $('#couriers');

$("#save").on("click",	function() {
	if(sentParcelDetailsValidation()){
		$("#save").attr("disabled",true);
 		postJSON('/OrderExecution/api/v1/sentParcel', JSON.stringify(sentParcelDetails()), function(data) {					
 			
 			if(1 == data.resCode){
 				$("#save").attr("disabled",true);
				$.growl.notice({ message: "Successfully created parcel: " + data.payload.id, duration: 10000, title: 'Success' });
				$("#jqxgrid").jqxGrid("updatebounddata");
				$('#createParcel').modal('hide');
			}else{
				$("#save").attr("disabled",false);
				$.growl.error({ message: data.mesgStr, duration: 10000 });
			}
		}); 
		}else {
			$("#save").attr("disabled",false);
			$.growl.error({ message: "Please fill all the mandatory fields", duration: 10000 });
		}					
	}); 
			


	$.getJSON('/OrderExecution/api/v1/parcelLOV?page=createParcel', function(data) {
		vendorList = data.payload.vCodeList;

		$.each(data.payload.couriers, function(key, val) {
			$couriers.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});		
	
		

		$(function() {
			var availabledata = [];

			$.each(vendorList, function(key, value) {
				availabledata.push({
					value : value.id,
					label : value.name
				});
			});

			$("#vendors").autocomplete({
				source : availabledata,
				focus : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#vendor-parcel").val(ui.item.value);
				}

			});
		});

	});
	
	
	$( "#vendors" ).on( "autocompleteselect", function( event, ui ) {	     
	    value = ui.item.value;
	    $.getJSON('/OrderExecution/api/v1/parcelLOV?page=vendorMIV&id='+value, function(
				data) {
	    	
	    	  var v ='<select id="mivDetails" class="form-control" multiple="multiple">';
	  	 	$.each(data.payload.mivList, function(key, val) {	  	 		
	  	 	v +='<option value="'+val.mivSrialNo+'">'+val.mivSrialNo+'</option>';
	  	 	});
	  	 	
	  	 	v +='</select>';
	  	 	
  	 		$("#mivDetail").html(v);
	  		 $('#mivDetails').multiselect({ 
	  		    includeSelectAllOption: true,
	  		    enableFiltering:false,         
	  		    maxHeight:250,
	  		    numberDisplayed:1,
	  		    buttonClass: 'col-md-12 form-control text-left'
	  		}); 
	    });	 
	    $.getJSON('/OrderExecution/api/v1/getVRNosForSentParcel?vendorId='+value, function(data) {
	    	var vrNo = data.payload.vrNos;
			
			var s = '<select id="vendorRetObj"  name="vendorRetObj" class="form-control" multiple="multiple">';
				$.each(vrNo, function(key, val) {
				s += '<option value="' + val + '">' + val + '</option>'; });
				s += '</select>';
				$("#vendRetDetails").html(s);
				$('#vendorRetObj').multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
	  		}); 
	    $.getJSON('/OrderExecution/api/v1/fetchGSTINByVendor?vendorId='+value, function(data) {
	    		$("#vatNo").empty().append('<option value="" selected>--Select--</option>');
					$.each(data.payload.GstnNumber, function(key, val) {
				$("#vatNo").append('<option value="' + val.id + '">' + val.gstinNo + '</option>');
				});	
	  		});
	    });
	
	
	$("#SentParcel input[type=number]").keypress(function(event) {		
		
		  if ( event.which == 45 || event.which == 189 || event.which > 96 && event.which < 123 || event.which > 64 && event.which < 91) {			
		      event.preventDefault();
		   }
		});
	
	$("#noOfParcel").keypress(function(event) {		
	
		  if ( event.which == 46) {			
		      event.preventDefault();
		   }
		  
		});
	$("#noOfParcel").blur(function(event) {
		var noOfBoxes = $("#noOfParcel").val();
		if(noOfBoxes == 0){
			
					$.growl.error({
						message : "Invalid number input",
						duration : 10000
					});
					$("#noOfParcel").val('');
					return false;
		}
		
	});
	$("#grossWt").blur(function(event) {
		var parcelGrWt = $("#grossWt").val();
		if(parcelGrWt == 0){
			
					$.growl.error({
						message : "Invalid number input",
						duration : 10000
					});
					$("#grossWt").val('');
					return false;
		}
		else{
			
			$("#grossWt").val(parseFloat(parcelGrWt).toFixed(3));
		}
	});
	
	$("#charges").blur(function(event) {
		$("#charges").val(parseFloat($("#charges").val()).toFixed(2));
	
	});
	$("#insuranceVal").blur(function(event) {
		
		$("#insuranceVal").val(parseFloat($("#insuranceVal").val()).toFixed(2));
	
	});
	
$("#insuranceCharges").blur(function(event) {
		
		$("#insuranceCharges").val(parseFloat($("#insuranceCharges").val()).toFixed(2));
	
	});

$("#couriers").on('change',function(){
	var courierType = $("#couriers option:selected").text();
	if(courierType == "In Person"){
		$("#courierDocNo").prop('disabled',true);
		$("#fromPlace").prop('disabled',true);
		$("#toPlace").prop('disabled',true);
		$("#insuranceCharges").prop('disabled',true);
		$("#insuranceVal").prop('disabled',true);
		$("#courierDate").prop('disabled',true);
	}else{
		$("#courierDocNo").prop('disabled',false);
		$("#fromPlace").prop('disabled',false);
		$("#toPlace").prop('disabled',false);
		$("#insuranceCharges").prop('disabled',false);
		$("#insuranceVal").prop('disabled',false);
		$("#courierDate").prop('disabled',false);
	}
});
</script>