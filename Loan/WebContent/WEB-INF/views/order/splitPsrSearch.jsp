<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> PSR Search
					</h1>
				</div>

				<form class="form-horizontal">
						<div class="row">
						   <div class="col-sm-2">
									<label>From Date</label>
										<div class="input-group"><input type="text" class="date-picker form-control dateBackground"
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-sm-2">
									<label>To Date</label>
										<div class="input-group"><input type="text"  class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
									<label>Status </label>
									<input type="text" class="form-control" name="status" placeholder="Status" id="status" disabled/>
								</div>
							</div>
						</form>	
				</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>
							&nbsp;<button id="removeAllPsrNos" class="btn btn-warning  btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>						
						</div>
				
				
				<div class="clearfix">&nbsp;</div>
					<div id='jqxwindow' style="margin:5px;"><div id="jqxgrid" style="font-size: 13px; font-family: Verdana;"></div></div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
<script src="resource/oe/assets/js/app/splitPsrSearch.js" type="text/javascript"></script>

<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>