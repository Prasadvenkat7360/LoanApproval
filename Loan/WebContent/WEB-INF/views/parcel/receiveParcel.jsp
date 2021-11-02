<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : Krishna
	## 	Date Creation : 27/04/2016
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-sm-12  layout-main">
				<!-- Receive Parcel Heading Add Started -->
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> Receive Parcel</h1>
					<div class="heading-block-action">						
						<a class="btn btn-primary btn-sm pull-right" data-toggle="modal" data-target="#createReciveParcel" type="button" href="createReciveParcel"><i class="fa fa-plus"></i>&nbsp;Create </a>
					</div>
				</div>
				<!-- Receive Parcel Heading Create Ended -->

				<!-- Sent Parcel Search Started -->
				<form class="form-horizontal" id="recieveParcel">
						<div class="row">
							<div class="col-sm-2">
								<label>Date From</label>
								<div class="input-group">
									<input type="text" readonly class="date-picker form-control dateBackground"	id="orderFromDate" placeholder="DD/MM/YYYY"> 
									<label	for="orderFromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>Date To</label>
								<div class="input-group">
									<input type="text" readonly class="date-picker form-control dateBackground"	id="orderToDate" placeholder="DD/MM/YYYY"> 
									<label	for="orderToDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>Material Type </label> 
								<select id="materialType" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Parcel ID</label> 
								<input type="number" class="form-control" placeholder="Parcel No" id="parcelNo" min= "1">
							</div>

							<div class="col-sm-2">
								<label>Vendor</label>
								<input id="vendorCode" class="form-control" type="text" placeholder="Vendor Name">
								<input id="vendorCode-value" type="hidden" name="code">	
							</div>
							
							<div class="col-sm-2">
								<label>Status</label>
								<select id="parcelStatus" class="form-control" >
									<option value="" selected label="--Select--" />
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
                              	<label>Acknowledged By </label>
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
							<button class="btn btn-primary btn-sm voffset" type="button" name="exportRp" id="exportRp">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
						</div>
				</form>
				<!-- Receive Parcel Search Ended -->

				<div class="clearfix">&nbsp;</div>

				<!-- JqGrid Started -->
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->

				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>
<!-- Create Receive Parcel Modal Pop-up Started ##########################  -->

<div class="modal fade" id="createReciveParcel" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<!-- Add Receive Parcel Modal Pop-up Ended ##########################  -->

<!-- Edit Receive Parcel Modal Pop-up Started ##########################  -->


<div class="modal fade" id="receiveParcelData" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<!-- Edit Receive Parcel Modal Pop-up Ended ##########################  -->
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
var $materialTYpe = $('#materialType');
var $parcelStatus = $('#parcelStatus');
var $acknowledgeBy = $('#acknowledgeBy');
	$("#Search").on('click', function() {
		/* if($("#acknowledgeBy").val() == ""){
			$.growl.error({
				message : "Please Fill Mandatory Fields !!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		} */
		receiveParcelGrid();
		$("#jqxgrid").show();
		return false;
	});
	
	$materialTYpe.empty().append('<option value="" selected>Select</option>');
	$acknowledgeBy.empty().append('<option value="" selected>Select</option>');
	$parcelStatus.empty().append('<option value="" selected>Select</option>');
	$.getJSON('/OrderExecution/api/v1/receiveparcelLOV?page=reciveParcel', function(data) {
		$.each(data.payload.mType, function(key, val) {
			$materialTYpe.append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		
		$.each(data.payload.acknowledgedBy, function(key, val) {
			$acknowledgeBy.append('<option value="' + val.hrmsId + '">'	+ val.name + '</option>');
		});
		
		$.each(data.payload.parcelStatus, function(key, val) {
			$parcelStatus.append('<option value="' + val.id + '">' + val.name + '</option>');
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
	
	$("#recieveParcel input[type=number]").keypress(function(event) {		
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