<!-- 
	##	Author UI : Ajay Prasad
	## 	Author JAVA :Ajay Prasad
	## 	Date Creation : 08/07/2016
 -->
<script type="text/javascript">
	var $vType = $('#vType');
	var $vendorCity = $('#vendorCity');
	var $vendorCountry = $('#vendorCountry');
	var $vendorBlocked = $('#vendorBlocked');
	var $internal = $('#Internal');
	$.getJSON('/OrderExecution/api/v1/vendorMasterLOV?page=search', function(data) {

		//iterate over the data and append a select option
		$.each(data.payload.vType, function(key, val) {
			$vType.append('<option value="' + val.id + '">'+ val.name + '</option>');
		});
		$.each(data.payload.vCity, function(key, val) {
			$vendorCity.append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		$.each(data.payload.vCountry, function(key, val) {
			$vendorCountry.append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		$.each(data.payload.vBlocked, function(key, val) {
			$vendorBlocked.append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		$.each(data.payload.vInternal, function(key, val) {
			$internal.append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	    vendorList = data.payload.vCodeList;
		var data = [];
		$.each( vendorList, function( key, value ) {			      
				data.push({ value: value.id, label: value.name});
		});
	
		$(function() {		
			$("#vendorCode").autocomplete({		
				source: data,
				focus: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);					
					$("#vendorCode-value").val(ui.item.value);					
				}
			});
		});	
	});
	
$("#create").on("click",function() {
	$('#createVendor').children().find('input,select').each(function() {
		if((this).id != "vendorCreated" && (this).id != "vendorUpdated" && (this).id != "vendorUpdatedBy" && (this).id != "vendorLastAgre" && (this).id != "vendorAgrreUploaded"  )
			{
			 if ((this).id == "vendorType"
					) {
				$(this).val('NONE');
			} else if ((this).id == "vendorBlock") {
				$(this).val('Yes');
			}else if ((this).id == "vendorAgreementUploaded") {
				$(this).val('No');
			}  else {
				$(this).val('');
			}
		}
	});
});
	
$("#exportt").on("click", function() {		
		var data;
	    var	newData = [];
		var vCode = $("#vendorCode").val()
		if(vCode != "" && vCode != null){
			var vendorCode = $("#vendorCode-value").val();
		}else{
			var vendorCode = "";
		}
		var vType = $("#vType").val();
		var vendorCity = $("#vendorCity").val();
		var vendorCountry = $("#vendorCountry").val();
		var vendorBlocked = $("#vendorBlocked").val();
		fieldFilters = {
				"fieldFilters" : {}
			};
		if(vendorCode != "" && vendorCode != null){			
			fieldFilters.fieldFilters["vendorCode"] = vendorCode;
		}
		if(vType != "" && vType != null){
			fieldFilters.fieldFilters["vType"] = vType;
		}
		 if(vendorCity != "" && vendorCity != null){
			fieldFilters.fieldFilters["vendorCity"] = vendorCity;
		}
		 if(vendorCountry != "" && vendorCountry != null){
			fieldFilters.fieldFilters["vendorCountry"] = vendorCountry;
		}
		if(vendorBlocked != "" && vendorBlocked != null){
			fieldFilters.fieldFilters["vendorBlocked"] = vendorBlocked;
		}
		var sysdate = moment().format('DDMMYYYYHHmmSS');
		var rows = $('#jqxgrid').jqxGrid('getrows');
		if (  rows == undefined || rows == 0 ) {
			$.growl
			.error({
				message : "No Data To Export",
				duration : 10000
			});
			return false;
		}
		postJSON('/OrderExecution/api/v1/exportVendorMasterList',JSON.stringify(fieldFilters), function(response) {
			if(null != response){
				data = response.payload.list;
				for(i=0; i<data.length; i++){		
						newData.push({
							'Id ' :data[i].id,
							'Vendor Code' : data[i].vendorCode,
							'Address' : data[i].address1,
							'Vendor Type' : data[i].vendorType,						
							'Vendor Blocked' : data[i].vendorBlocked,
							'Vendor City' : data[i].vendorCity,
							'Vendor Country' : data[i].vendorCountry,
							'Vendor Start Date' : data[i].vendorStartDate,						
							'Agreement Uploaded' : data[i].agreementUploaded							
						})							
				    }		
				//JSONToCSVConvertor(newData, "Vendor" + "_" + sysdate, true);
				  var opts = [{sheetid:'Vendor_Master',header:true}];
                  var res = alasql('SELECT * INTO XLSX("Vendor Master_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
		  }
	 });
});
</script>
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Send Parcel Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Vendor Master
					</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm" data-toggle="modal"
							data-target="#vendorMasterModal" type="button" id="create" href="vendor"><i
							class="fa fa-plus"></i> &nbsp;Create </a>
					</div>
				</div>
				<!-- Pending Melting Heading Add Ended -->

				<!-- Pending Melting Search Started -->
				<form class="form-horizontal vendorSearch" name="vendorSearch" id="vendorSearch">
					<div class="mobile-responsive">
						<div class="row">
							<div class="col-sm-2">
								<label>Vendor Code/Name</label> 
								<input type="text" class="form-control" placeholder="Vendor Code/Name"  id="vendorCode" name="vendorCode">
								<input id="vendorCode-value" type="hidden" name="code">
							</div>

							<div class="col-sm-2">
								<label>Vendor Type</label> <select name="vType" id="vType"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Vendor City</label> <select name="vendorCity"  id="vendorCity"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Vendor Country</label> <select name="vendorCountry"  id="vendorCountry"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
						
							<div class="col-sm-2">
								<label>Vendor Blocked?</label> <select name="vendorBlocked"  id="vendorBlocked"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Vendor Internal?</label> <select name="Internal"  id="Internal"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
						</div>
								
						<div class="clearfix">&nbsp;</div>

						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="Search" id="Search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="exportt" id="exportt">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>

						</div>
						
					</div>
				</form>
				<!-- Pending Melting Search Ended -->

				<div class="clearfix">&nbsp;</div>

				<!-- JqGrid Started -->
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->

				<div class="clearfix">&nbsp;</div>

			</div>
		</div>
	</div>
</div>

<!-- Create Vendor Master Modal Pop-up Started ##########################  -->
<div class="modal fade" id="vendorMasterModal" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	 <div class="modal-dialog modal-lg" style="width:90%; min-height: 600px; height: 550px;">
		<div class="modal-content"></div>
	</div>
</div>


<!-- Create Vendor Master Modal Pop-up Started ##########################  -->
<div class="modal fade" id="editMasterModal" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	 <div class="modal-dialog modal-lg" style="width:90%; min-height: 600px; height: 550px;" >
		<div class="modal-content">
		</div>
	</div> 
</div>
<!-- Create Vendor Details Master Modal Pop-up Ended ##########################  -->
<script type="text/javascript">
var vReturnTerm = [];
var tpSegment = [];
var tpCity = [];
$(document).ready(
		function() {

			$.getJSON('/OrderExecution/api/v1/vendorMasterLOV?page=update',
					function(data) {
				vReturnTerm.push({
					id : -1,
					name : 'Select'
				});
						$.each(data.payload.returnTerm, function(key, val) {
							vReturnTerm.push({
								id : val.id,
								name : val.name
							});
						});
						tpSegment.push({
							id : -1,
							name : 'Select'
						});
				
						$.each(data.payload.mTypes, function(key, val) {
							tpSegment.push({
								id : val.id,
								name : val.description
							});
						});
						tpCity.push({
							id : -1,
							name : 'Select'
						});
						$.each(data.payload.vCity, function(key, val) {
							tpCity.push({
								id : val.id,
								name : val.name
							});
						});

					});

		});

</script>
<script src="resource/oe/assets/js/app/vendorDetailsMaster.js"></script>
<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>
<script src="resource/oe/assets/js/app/taxComputation.js"></script>



