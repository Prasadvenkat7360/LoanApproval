<!-- 
	##	Author UI : Raksha
	## 	Author JAVA : Venkat Prasad
	## 	Date Creation : 18/08/2017
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Scanned/Weight Check - Create
					</h1>
					<form class="form-horizontal" id="articleIdQueryReport" action="javascript: void(0)">
					<div class="pull-left">
						<label class="radio-inline"><input class="element" type="radio" name="scnWc" value="sc"> &nbsp; Scanning</label> 
						<label class="radio-inline"><input class="element" type="radio" name="scnWc" value="wc"> &nbsp; Weight Check</label> 
					</div>
					</form>
					<div class="clearfix">&nbsp;</div>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromCreate"
							href="javascript:showContentPage('scanningOrWeightCheck','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>
					
				</div>
				<!-- Heading Add Ended -->

				<!-- Search Started -->
				<form class="form-horizontal" id="createScanWtCheckC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div id="wcCreate">
					<div class="row">
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Created Date</label> 
								<input type="text" class="form-control"	placeholder="Created Date" id="createdDateC" name="createdDateC" disabled>
						</div>
						<div class="col-sm-2">
							<label>Login Zone</label><input type="text" class="form-control" placeholder="Login Zone" id="zoneIdC" name="zoneIdC" disabled>
						</div>
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="zoneIdW">
							<label>Login Zone Id</label><input type="text" class="form-control" placeholder="Login Zone" id="wcZoneC" name="wcZoneC" disabled>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Material Type</label>
								<select id="matTypeC" name="matTypeC" class="form-control">
									<option value="" selected label="Select" /></select>
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Article Segment</label> 
								<select id="segC" name="segC" class="form-control">
								<option value="" selected label="Select" />
							</select>	
						</div>
						<div class="col-sm-2" id="jewTypeC">
							<span class="required">*</span>&nbsp;<label>Jewel Type</label>
								 <select id="jTypeC" name="jTypeC" class="form-control">
									<option value="" selected label="Select" />
								</select>
						</div>
						<div class="col-sm-2" id="withTag">
							<label class="checkbox-inline"><input name="withTagC" type="checkbox" value="withTagC" id="tagWtId"/> &nbsp; With Tag</label> 
						</div>
						</div>
						
						<div class="row">
						<div class="row voffset2" align="center">
						    <button class="btn btn-primary btn-sm voffset" id="addW" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add
							</button>	
						</div>
						</div>
						<div class="clearfix">&nbsp;</div>
							<div class="col-md-12 row form-field">
								<div id="jqxgridW"
									style="font-size: 13px; font-family: Verdana; position: relative;"></div>
							</div>
						<div class="clearfix">&nbsp;</div>
						<div class="col-md-12 form-field">
							<div id="jqxgridWC"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
						<div class="modal-footer  text-center" id="footerHideWc">
							<a class="btn btn-primary btn-sm voffset" data-toggle="modal"
								data-target="#SaveConfirmationWc" type="button" id="saveWc"
								href="javascript: void(0)"><i class="fa fa-floppy-o fa-lg"></i>
								&nbsp;Save</a>
							<button id="clear" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
			 			 </div>
						</div>	
					<div id="scCreate">
					<div class="row">
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Created Date</label> 
								<input type="text" class="form-control"	placeholder="Created Date" id="scCreatedDateC" name="scCreatedDateC" disabled>
						</div>
						<div class="col-sm-2">
							<label>Login Zone</label><input type="text" class="form-control" placeholder="Login Zone" id="scZoneIdC" name="scZoneIdC" disabled>
						</div>
						<div class="col-sm-2" id="zoneIdS">
							<label>Login Zone Id</label><input type="text" class="form-control" placeholder="Login Zone" id="scZoneC" name="scZoneC" disabled>
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Material Type</label>
								<select id="scMatTypeC" name="scMatTypeC" class="form-control">
									<option value="" selected label="Select" /></select>
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Article Segment</label> 
								<select id="scSegC" name="scSegC" class="form-control">
								<option value="" selected label="Select" />
							</select>	
						</div>
						<div class="col-sm-2" id="jewTypeSc">
							<span class="required">*</span>&nbsp;<label>Jewel Type</label>
								 <select id="scJTypeC" name="scJTypeC" class="form-control">
									<option value="" selected label="Select" />
								</select>
						</div>
					</div>
					<div class="row">
						<div class="row voffset2" align="center">
						    <button class="btn btn-primary btn-sm voffet" id="addS" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add
							</button>	
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
						<div class="col-md-12 form-field">
							<div id="jqxgridS"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					<div class="clearfix">&nbsp;</div>
						<div class="col-md-12 form-field">
							<div id="jqxgridL"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					<div class="clearfix">&nbsp;</div>
						<div class="col-md-12 form-field">
							<div id="jqxgridA"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					<div class="modal-footer  text-center" id="footerHide">
						<a class="btn btn-primary btn-sm voffset" data-toggle="modal"
							data-target="#SaveConfirmation" type="button" id="save"
							href="javascript: void(0)"><i class="fa fa-floppy-o fa-lg"></i>
							&nbsp;Save</a>
						<button id="clearSc" class="btn btn-warning btn-sm voffset" type="reset">
							<i class="fa fa-times fa-lg"></i>&nbsp; Clear
						</button>
						  </div>
					</div>	
					
					
				</div>
			</form>
				<!--  Search Ended -->

				
              
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="SaveConfirmation" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                 <h3 class="modal-title" id="myModalLabel">Confirm!</h3>

            </div>
            <div class="modal-body">
                 <h4> Is Scanning Process Completed ?</h4>

            </div>
            <!--/modal-body-collapse -->
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btnSaveScanDet">Yes</button>
                <button type="button" class="btn btn-danger"  id ="btnDiscardSave">No</button>
            </div>
            <!--/modal-footer-collapse -->
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<div class="modal fade" id="SaveConfirmationWc" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                 <h3 class="modal-title" id="myModalLabel">Confirm!</h3>

            </div>
            <div class="modal-body">
                 <h4> Is Weight Check Process Completed ?</h4>

            </div>
            <!--/modal-body-collapse -->
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btnSaveWcDet">Yes</button>
                <button type="button" class="btn btn-danger"  id ="btnDiscardSaveWc">No</button>
            </div>
            <!--/modal-footer-collapse -->
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>







<script src="resource/oe/assets/js/app/scanningOrWeightCheck.js" type="text/javascript"></script>
