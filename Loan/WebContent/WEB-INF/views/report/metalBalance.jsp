<!-- 
	##	Author UI 		: 	Mani prasad
	## API Integration	:  	Dipankar Naha
	##	Date Creation 	: 	02-03-2017
	## 	Description		:	METAL BALNACE REPORT HAVING SEARCH AND EXPORT FUNCTIONALITY
 -->
<script src="resource/oe/assets/js/app/metalBalance.js"></script>

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!--  Metal Balance Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Stock of Metal in Premises (RM & FG)
					</h1>
				</div>
				<form class="form-horizontal" id="MetalBalance">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Account From
									Date</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="metalBalanceFrom" id="metalBalanceFrom"
										placeholder="Account from Date"> <label
										for="metalBalanceFrom" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Account To
									Date</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="metalBalanceto" id="metalBalanceto"
										placeholder="Account to Date"> <label
										for="metalBalanceto" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Region</label>
								<div id="regionLov"></div>
							</div>
							<div class="col-sm-2" id="storeDcAll">
								<span class="required">*</span>&nbsp;<label>Store/DC/All</label> <select id="selectStoreDC"
									name="selectStoreDC" class="form-control">
									<option value="" label="--Select--" />
									<option value="all">All</option>
									<option value="store">Store</option>
									<option value="dc">DC</option>
								</select>
							</div>
							
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Material
									Type</label>
								<div id="locationType" data-validation="required"></div>
							</div>
							<div class="col-sm-2" id="storeDiv">
								<span class="required">*</span>&nbsp;<label>Store Name</label>
								<div id="storeName"></div>
							</div>
							<div class="col-sm-2" id="dcDiv">
								<span class="required">*</span>&nbsp;<label>DC Name</label>
								<div id="dcName"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Segment</label> <select
									id="segmentLov" name="segmentLov" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Location</label> <select
									id="location" name="location" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
						</div>

						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="export" id="export">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
						</div>
				</form>

				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started -->
				<div class="panel panel-default" id = "rmToggle">
			    	<div class="panel-heading">
			     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle1">Raw Material - Stock Of Metal</a></h4>				      
			    	</div>
					<div id="panel1"  class="panel-collapse collapse">
						<div class="panel-body"><div style="text-align: center; marging: auto; position: relative; z-index: 1" id='row'></div>
					<div id="rmGrid"></div></div>
				   	</div>
			 	</div>
				<div class="panel panel-default" id = "fgToggle">
			    	<div class="panel-heading">
			     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle2">Finished Goods - Stock Of Metal</a></h4>				      
			    	</div>
					<div id="panel2"  class="panel-collapse collapse">
						<div class="panel-body"><div style="text-align: center; marging: auto; position: relative; z-index: 1" id='row'></div>
					<div id="fgGrid"></div></div>
				   	</div>
			 	</div>
			</div>
		</div>
	</div>
</div>

<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>