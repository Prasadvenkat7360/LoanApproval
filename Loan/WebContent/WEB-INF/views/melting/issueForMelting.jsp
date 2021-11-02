<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : Krishna
	## 	Date Creation : 09/05/2016
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-sm-12  layout-main">
				<!-- Issue For Melting Heading Add Started -->
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i>&nbsp; Melting Lot</h1>	
					<div class="heading-block-action">
						<a id="create"  class="btn btn-primary btn-sm" data-toggle="modal"	data-target="#createIssueForMelting" type="button"	href="createIssueForMelting"><i class="fa fa-plus"></i>	&nbsp;Create </a>					
					</div>				
				</div>
				<!-- Issue For Melting Heading Add Ended -->
				<input type='text' size='1' style='position:relative;top:-500px;' value="" />
				<!-- Issue For Melting Search Started -->
				<form class="form-horizontal" id="issueForMelting" >
						<div class="row">

							<div class="col-sm-2">
								<label>Date From</label>
								<div class="input-group">
									<input type="text" readonly class="date-picker form-control dateBackground"	id="meltingFromDate" placeholder="DD/MM/YYYY"> 
									<label for="meltingFromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>Date To</label>
								<div class="input-group">
									<input type="text" readonly  class="date-picker form-control dateBackground" id="meltingToDate" placeholder="DD/MM/YYYY"> 
									<label for="meltingToDate" class="input-group-addon cursor"><span	class="fa fa-calendar"></span></label>
								</div>
							</div>							

							<div class="col-sm-2">
								<label>Melting Lot No.</label>								
								<input type="number" class="date-picker form-control"	id="meltingLotNo" placeholder="Melting Lot No">
							</div>
							<div class="col-sm-2">
								<label>Metal Type</label> 
								<select id="metalSegment"	class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							
							<div class="col-sm-2">
								<label>Status (Original GIV/TV)</label> 
								<select id="status"	class="form-control">
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

						</div>
				</form>
				<!-- Issue For Melting  Ended -->
				<div class="clearfix">&nbsp;</div>
				
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"	style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>

<!-- Create Issue For Melting Modal Modal Pop-up Started ##########################  -->

<div class="modal fade" id="createIssueForMelting" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<!-- Create Issue For Melting Modal Modal Pop-up Ended ##########################  -->
<script type="text/javascript">

var $metalSegment = $('#metalSegment');
var $status = $('#status');

	$("#Search").on('click', function() {
		issueForMeltingGrid();
		$("#jqxgrid").show();
		return false;
	});
	
	$.getJSON('/OrderExecution/api/v1/meltingLOV', function(data) {
	     $('#metalSegment').empty().append('<option value="" selected>-- Select Option --</option>');
		$.each(data.payload.segements, function(key, val) {			
			$("#metalSegment").append('<option value="' + val.id + '">' + val.description + '</option>');
			/* $metalSegment.append('<option value="' + val.id + '">' + val.description
					+ '</option>'); */
		});
		
		$.each(data.payload.status, function(key, val) {			
			$status.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});
		
		
	});
</script>
<script src="resource/oe/assets/js/app/melting.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
	
</style>