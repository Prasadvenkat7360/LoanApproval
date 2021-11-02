
<script type="text/javascript">
	var params = {
		"fieldFilters" : {
			"suppliedBy" : "CO",
			"mCode" : ""
		}
	};
	postJSON('api/v1/getStoneSegments', JSON
			.stringify(params), function(data) {
		
		if(1 == data.resCode){
			$.each (
					data.payload.stoneSeg,
					function(key, val) {
						$('#stoneSegment')
						.append('<option value="'
								+ val.id
								+ '">'
								+ val.description
								+ '</option>');	
					});
		}
	});


</script>
<div class="main-container">
	<div class="container">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Metal Account Heading  Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop" data-toggle="collapse" data-target="#stoneAccSearch"></i> Stone Account 
					</h1>
				</div>
				<!-- Stone Account Heading  Ended -->

				<!-- Stone Account Search Started -->
				<form class="form-horizontal" id="stoneAccSearch">
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
								<label>Segment</label> <select id="stoneSegment"
									class="form-control">
									<option value="" label="--Select--"/>
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Category</label> <select id="category"
									class="form-control">
									<option value="" label="--Select--"/>
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Store/DC Type</label> <select id="storeOrDC"
									class="form-control">
									<option value="" label="--Select--"/>
									<option value="Store">Store</option>
									<option value="DC">DC</option>
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Store / DC </label> <select id="storeOrDcId"
									class="form-control">
									<option value="" label="--Select--"/>
								</select>
							</div>
						</div>
						<div class="row">							
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Location Code </label>  
								 <select id="code"
									class="form-control">
									<option value="" label="--Select--"/>
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Stone Code </label>  
								 <select id="stoneCode"
									class="form-control">
									<option value="" label="--Select--"/>
								</select>
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
				<!-- Stone Account Search Ended -->
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


<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>	
<script src="resource/oe/assets/js/app/stoneAccount.js"></script>	