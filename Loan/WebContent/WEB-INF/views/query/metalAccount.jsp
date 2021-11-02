<script type="text/javascript"
		src='resource/oe/assets/js/app/metalAccount.js'></script>


<div class="main-container">
	<div class="container">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Metal Account Heading  Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Metal Account 
					</h1>
				</div>
				<!-- Metal Account Heading  Ended -->

				<!-- Metal Account Search Started -->
				<form class="form-horizontal" id="metalAccSearch">
					<div class="mobile-responsive">
						<div class="row">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Date From</label>
								<div class="input-group">
									<input type="text" class="date-picker form-control"
										id="orderFromDate" placeholder="DD/MM/YYYY"> <label
										for="orderFromDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Date To</label>
								<div class="input-group">
									<input type="text" class="date-picker form-control"
										id="orderToDate" placeholder="DD/MM/YYYY"> <label
										for="orderToDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Metal Segment</label> <select id="metalSegment"
									class="form-control">
									<option value="" label="--Select--"/>
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Location Type</label> <select id="storeOrDC"
									class="form-control">
									<option value="" label="--Select--"/>
									<option value="Store">Store</option>
									<option value="DC">DC</option>
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Store / DC </label> <select id="storeOrDcId"
									class="form-control">
									<option value="" label="--Select--"/>
								</select>
							</div>	
						</div>
						<div class="row">						
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Location Code </label>  
								<input type="text" class="form-control" name="code" id="code" style="text-transform:uppercase"/> 
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Processed? </label> <select id="isProcessed"
									class="form-control">
									<option value="true">True</option>
									<option value="false" selected>False</option>
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<div class="clearfix">&nbsp;</div>
								<button class="btn btn-primary voffset" type="button"
									name="Search" id="Search">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAll" class="btn btn-warning voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
					</div>
				</form>
				<!-- Metal Account Search Ended -->
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

<script type="text/javascript">
	$.getJSON('/OrderExecution/api/v1/metalAccountLOV', function(data) {
	
		//iterate over the data and append a select option
		$.each(data.payload.sTypes, function(key, val) {
			$('#metalSegment').append('<option value="' + val.id + '">' + val.description
					+ '</option>');
		});
	});
	
	$("#storeOrDC").on(
			"change",
			function() {

				$('#storeOrDcId')
				.empty()
				.append(
						'<option value="" selected>--Select--</option>');
				
				var id = $('#storeOrDC').val();
				if(id != "") {
					$.getJSON('/OrderExecution/api/v1/metalAccountLOV?page=storeOrDc&sdc=' + id, function(data) {
						
						//iterate over the data and append a select option
						$.each(data.payload.allStores, function(key, val) {
							$('#storeOrDcId').append('<option value="' + val.id + '">' + val.name
									+ '</option>');
						});
					});
				}
			});	

	$("#Search").on('click', function() {
		metalAccountGrid();
		$("#jqxgrid").show();
		return false;
	});
	$("#clearAll").on('click', function(){
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
		$('#metalAccSearch').trigger("reset");
		
 	});

</script>
<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>	
