<!-- 
	##	Author UI : Raksha
	##	Author UI : Dipankar Naha
	## 	Author JAVA : Nageshwar Rao
	## 	Date Creation : 29/08/2017
 -->

<div class="main-container">
	<div class="container-fluid metalRate">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-sm-12  layout-main">
				<!-- Send Parcel Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i>&nbsp; Create Transit From DC
					</h1>
					<div class="heading-block-action"></div>
				</div>
				<form class="form-horizontal" id="transitFromStore">
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Date</label>
								<input type="text" class="form-control" placeholder="Date" id="date" name="date" disabled>
						    </div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>From DC</label>
								<input type="text" class="form-control" placeholder="From Dc" id="fromDc" name="fromDc" disabled>
								<input type="hidden" class="form-control" placeholder="From Dc" id="fromDcId" name="fromDcId">
						    </div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>To Store/DC</label> 
									<select id="storeOrDc" name="storeOrDc" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>To Store/DC Name</label> 
								<select id="storeDcName" name="storeDcName" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Zone</label>
									<input type="text" class="form-control" placeholder="From Zone" id="fromZone" name="fromZone" disabled>
									<input type="hidden" class="form-control" placeholder="From Zone" id="fromZoneId" name="fromZoneId" >
						    </div>
						    <div class="col-sm-2">
								<label>To Zone Type</label>
								<select id="toZoneType" name="toZoneType" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
						</div>
						<div class="row">							
							<div class="col-sm-2">
								<label>To Zone</label> 
								<select id="toZone" name="toZone"
									class="form-control"><option value=""label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Sent Through</label> 
								<input type="text"	class="form-control" placeholder="Sent Through"	id="sentThrough" name="sentThrough">
							</div>
						</div>
						
				</form>
				<div class="clearfix">&nbsp;</div>

				<!-- JqGrid Started -->
				<div style="position: relative; z-index: 1"><div id="transitMasterGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
				<!-- JqGrid Ended -->

				<div class="clearfix">&nbsp;</div>
				<div class="row voffset2" align="center" >
					<button type="button" class="btn btn-primary btn-sm" id="saveTransit" name="saveTransit"><i class="fa fa-floppy-o fa-lg"></i>&nbsp;Save</button>
					&nbsp;
					<button id="clearAll" class="btn btn-warning btn-sm voffset" type="button"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
				</div>

			</div>
		</div>
	</div>

</div>
<!-- Create Issue For Melting Modal Modal Pop-up Ended ##########################  -->
<script src="resource/oe/assets/js/app/transitFromDC.js"></script>