<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : Krishna
	## 	Date Creation : 26/04/2016
	## 	Description : Clicking on Add User can create Send Pacel 
	## 	By Entering / Selecting Vendor Code, Courier Details and MIV Details
	##	After Send Parcel creation created details will be shown on the grid as a list.
	## 	On click on MIV Details it will show MIV Details for that particular Parcel
	## 	On click on Edit they can Add/Update Remarks and Status.
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-sm-12  layout-main">
				<!-- Send Parcel Heading Add Started -->
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> Sent Parcel</h1>
					<div class="heading-block-action">
						
						<a class="btn btn-primary btn-sm pull-right" data-toggle="modal" data-target="#createParcel" type="button" href="parcel" ><i class="fa fa-plus"></i>&nbsp;Create </a>
					</div>					
				</div>
				<!-- Send Parcel Heading Add Ended -->
				
				<!-- Send Parcel Search Started -->
				<form class="form-horizontal" id="sentParcel">
						<div class="row">
							<div class="col-sm-2">
								<label>Date From</label>
								<div class="input-group">
									<input type="text"  readonly class="date-picker form-control dateBackground"	id="orderFromDate" placeholder="DD/MM/YYYY"> 
									<label for="orderFromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>Date To</label>
								<div class="input-group">
									<input type="text" readonly  class="date-picker form-control dateBackground"	id="orderToDate" placeholder="DD/MM/YYYY"> 
									<label for="orderToDate" class="input-group-addon cursor"><span	class="fa fa-calendar"></span></label>
								</div>
							</div>
							
							<div class="col-sm-2">
								<label>Parcel Status </label> 
								<select id="parcelStatus" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>							

							<div class="col-sm-2">
								<label>Parcel No </label> 
								<input type="number" class="form-control" placeholder="Parcel No" id="parcelNo" min = "1">
							</div>
							
							<div class="col-sm-2">
								<label>Vendor</label> 
								<!-- <input type="number" class="form-control" placeholder="Vendor Code" id="vendorCode"> -->
								<input id="vendorCode" class="form-control" type="text" placeholder="Vendor Name">
									<input id="vendorCode-value" type="hidden" name="code">	
							</div>
							<div class="col-sm-2">
                                <label>Sent By </label>
                              		<select id="acknowledgeBy" class="form-control">
										<option value="" selected label="--Select--" />
									</select>
                            </div>
						</div>	
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="Search" id="Search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>						
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="export" id="export">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
						</div>
				</form>
				<!-- Send Parcel Search Ended -->
				
				<div class="clearfix">&nbsp;</div>
				
				<!-- JqGrid Started -->
				<div style="position: relative; z-index: 1"><div id="jqxgrid"	style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
				<!-- JqGrid Ended -->
				
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="createParcel" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

		
<!-- MIV Details Modal Pop-up Started ########################## -->
 
<div class="modal fade" id="mivparcel" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<!-- Edit Send Parcel Modal Pop-up Started ##########################  -->

<div class="modal fade" id="parcelData" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>
<!-- Edit Send Parcel Modal Pop-up Ended ##########################  -->	

<script type="text/javascript">	

	$(document).on('click', '#orderFromDate', function () {
	    var me = $("#orderFromDate");
	    var selectedDate =  $("#orderFromDate").val();
	    me.datepicker({
	      showOn: 'focus',
	      changeMonth: true,
	      changeYear: true,
	      maxDate : 0,
	      dateFormat:"dd/mm/yy",
	        onSelect: function( selectedDate ) {
	            $( "#orderToDate" ).datepicker( "option", "minDate", selectedDate );
	        }
	    }).focus();
	    me.mask('99/99/9999');
	
	}).on('select', '#orderFromDate', function () {
	    var me = $("#orderFromDate");
	}).on("change", function (e) {
	
	});

	$(document).on('click', '#orderToDate', function () { 
	    var me = $("#orderToDate");
	    me.datepicker({
	      showOn: 'focus',
	      changeMonth: true,
	      changeYear: true,
	      dateFormat:"dd/mm/yy",
	      minDate:$("#orderFromDate").val(),
	      maxDate : 0
	    }).focus();
	    me.mask('99/99/9999');
	}).on('select', '#orderToDate', function () {
	    var me = $("#orderToDate");
	});
	var $parcelStatus = $('#parcelStatus');
	var $couriers = $('#couriers');
	var $acknowledgeBy = $('#acknowledgeBy');
	$("#createParcel").draggable({ handle: ".modal-header"});
	$("#parcelData").draggable({handle: ".modal-header"});
	$('#mivDetails').multiselect("clearSelection");	
	
	$("#Search").on('click', function(){
		sentParcelGrid();
		$("#jqxgrid").show();
		return false;
	});	
	
	
	$.getJSON('/OrderExecution/api/v1/parcelLOV?page=sentParcel', function(data) {
		$.each(data.payload.parcelStatus, function(key, val) {	
			$parcelStatus.append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		
		$.each(data.payload.acknowledgedBy, function(key, val) {
			$acknowledgeBy.append('<option value="' + val.hrmsId + '">'	+ val.name + '</option>');
		});
		
		$.each(data.payload.couriers, function(key, val) {				
			$couriers.append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		
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
	
	$("#sentParcel input[type=number]").keypress(function(event) {		
	  	if ( event.which == 45 || event.which == 189 || event.which > 96 && event.which < 123 || event.which > 64 && event.which < 91) {			
     		event.preventDefault();
   		}
	});
</script>				
<script src="resource/oe/assets/js/app/sentParcel.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>	