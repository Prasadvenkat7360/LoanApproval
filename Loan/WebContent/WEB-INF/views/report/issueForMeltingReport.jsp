<!-- 
	##	Author UI : Mayadhar 
	## 	Author JAVA : Mayadhar
	## 	Date Creation : 12/04/2017
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Issue For Melting Heading Add Started -->
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i>&nbsp; Melting Assaying & Refining Report</h1>	
				</div>
				<!-- Issue For Melting Heading Add Ended -->

				<!-- Issue For Melting Search Started -->
				<form class="form-horizontal" id="issueForMelting" action="javascript: void(0);" >
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Date From</label>
								<div class="input-group">
									<input type="text"  class="date-picker form-control dateBackground" name="meltingFromDate"	id="meltingFromDate" placeholder="DD/MM/YYYY"> 
									<label for="meltingFromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Date To</label>
								<div class="input-group">
									<input type="text"  class="date-picker form-control dateBackground" name="meltingToDate"	id="meltingToDate" placeholder="DD/MM/YYYY"> 
									<label for="meltingToDate" class="input-group-addon cursor"><span	class="fa fa-calendar"></span></label>
								</div>
							</div>							

							<div class="col-sm-2">
								<label>Melting Lot No.</label>
								<input type="number" class="date-picker form-control"	id="meltingLotNo" placeholder="Melting Lot No">
							</div>
							<div class="col-sm-2">
								<label>Segment Type</label> <select id="metalSegment"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
						
							<div class="col-sm-2">
								<label>Refiner Code</label> <select id="refinerCode"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>DC Name</label>
								<input type="text" class="date-picker form-control"	id="dcName" placeholder="Search DC Name">
								<input id="dcName-value" type="hidden" name="dcName">
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>

						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit" name="Search" id="Search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" name="export" id="export">
								<i class="fa fa-file-excel-o"></i> Export
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" name="printMAR" id="printMAR">
								<i class="fa fa-file fa-lg"></i> Print
							</button>
						</div>
				</form>
				<!-- Issue For Melting  Ended -->
				<div class="clearfix">&nbsp;</div>
				
				<!-- JqGrid Started -->
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"	style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->
				
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/melting.js"></script>