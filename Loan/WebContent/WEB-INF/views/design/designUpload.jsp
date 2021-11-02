<div class="main-container">

	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Design Upload
					</h1>
				</div>
				<input type='text' size='1' style='position:relative;top:-500px;' value="" />
				<form class="form-horizontal" id="uploadDesign">
						<div class="row">
							<div class="col-sm-2">
								<label>From Date </label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="orderFromDate" placeholder="DD/MM/YYYY"> <label
										for="orderFromDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
								<label>To Date </label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="orderToDate" placeholder="DD/MM/YYYY"> <label
										for="orderToDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Order Type </label><div id="orderTypeS">
								</div>
							</div>
							<div class="col-sm-2">
								<label>Order No </label> <input type="number" name="orderNo"
									id="orderNo" class="form-control" placeholder="Order No" />
							</div>
						
							<div class="col-sm-2">
								<label>Design By </label> <select id="designBy" onchange="enableDesigner()"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Designer </label> <select id="designers" disabled
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
						</div>
						
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="Search" id="Search"><i class="fa fa-search fa-lg"></i> Search</button>
							<button id="clearAll" class="btn btn-warning btn-sm voffset"	type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
						</div>
				</form>

				<div class="clearfix">&nbsp;</div>
				<div id='jqxwindow'><div id="jqxgrid" style="font-size: 13px; font-family: Verdana;"></div></div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>
<div class="clearfix">&nbsp;</div>


<!-- Modal Window Started -->
<!-- Modal -->

<div class="modal fade" id="btnUploadDA" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<!-- Modal Window Started Ended -->
<script type="text/javascript" src="resource/oe/assets/js/app/design.js"></script>
<script>
$("#orderFromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate :0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#orderToDateS").datepicker('option', 'minDate', min || '0');
    }
});

$("#orderToDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate :0,
});

function enableDesigner(){	
	 var selectVal = $( "#designBy option:selected" ).val().length;
	
	 if(parseInt(selectVal) == 0){
		 $("#designers").attr('disabled', 'disabled');
	 }else{

		 $("#designers").removeAttr("disabled");
	 }
}
</script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>