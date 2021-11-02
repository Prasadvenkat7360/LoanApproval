<!-- 
    ##	Author UI           : 	Pooja Sangve
	##	Author UI           : 	mani prasad
	## 	Author JAVA 	    :   
	##	Date Creation 	    : 	27-04-2017
	## 	Description		    :	Location Transfer Voucher.
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop" ></i> &nbsp; Create LTV (Manual - Zone to
						Zone)
					</h1>
					<div class="heading-block-action">
						
					</div>
				</div>
				<form class="form-horizontal" id="zoneToZoneLtv">
						<!-- Row 1 Started  -->

						<div class="row">
						<div class="col-sm-2">
								<label>Date: </label>
								<input type="text" name="date" id="currentDate" class="form-control" disabled>
							</div>
							<div class="col-sm-2">
								<label>DC Name :</label> <input type="text" id="storeOrDc"
									name="storeOrDc" class="form-control" disabled>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label> From Zone </label> <select id="fzoneS" name="fzoneS"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label> To Zone </label> <select id="tzoneS" name="tzoneS"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
						
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label> Ref. Type. :</label> 
									<select id="refType" name="refType" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<!-- <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3 form-field">
								<label>Reason for Transit :</label>
								<textarea class="form-control" rows="1" id="rtransit"></textarea>
							</div> -->
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Material Type :</label> <select id="materialType"
									name="materialType" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Sent Through :</label> <input type="text"
									class="form-control" name="sentThrough" id="sentThrough">
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" id="addRow" >
							<i class="fa fa-plus"></i> &nbsp; Create
						</button>
						&nbsp;
							<button type="button" class="btn btn-primary btn-sm voffset" id="saveTransit"
								name="saveTransit">
								<i class="fa fa-floppy-o fa-lg"></i>&nbsp;Save
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>

						</div>
						<div class="clearfix">&nbsp;</div>
				</form>
				<div class="clearfix">&nbsp;</div>
				<div
					style="text-align: center; marging: auto; position: relative; z-index: 1"
					id='row'>
					<div id="jqxgrid"></div>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>
<script src="resource/oe/assets/js/app/zoneToZoneLtv.js"
	type="text/javascript"></script>