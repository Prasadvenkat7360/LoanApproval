<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Divya
	##	Date Creation 	: 	10-04-2020 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div id="captureUnsettingMIV">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Create IGR</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromCreateGr"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>	
				</div>
					<form class="form-horizontal" id="splitGRCreateForm" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">							
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Vendor</label>
							<input type="hidden" disabled class="form-control input-sm" name="vendorIdGRC" id="vendorIdGRC">
							
							<input type="text" disabled class="form-control input-sm" name="vendorGRC" id="vendorGRC">
						</div>							
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>GRV No</label>
							<input type="text" disabled class="form-control input-sm" name="grvNumb" id="grvNumb">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Stock No</label>
							<input type="text" disabled class="form-control input-sm" name="stockNumb" id="stockNumb">
						</div>	
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Gross Weight</label>
							<input type="text" disabled class="form-control input-sm" name="grossWght" id="grossWght">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Net Weight</label>
							<input type="text" disabled class="form-control input-sm" name="netWght" id="netWght">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Count</label>
							<input type="text" disabled class="form-control input-sm" name="count" id="count">
						</div>
						<!-- <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 form-field" style="margin-top: 15px;">&nbsp;
								<button type="button" class="btn btn-primary btn-sm"
									id="saveSplitGR" name="saveSplitGR">
									<i class="fa fa-floppy-o fa-lg"></i>&nbsp;Save
								</button>
								<button type="button" id="clearMiv" class="btn btn-warning btn-sm">
									<i class="fa fa-times"></i>&nbsp;Clear
								</button>
						</div> -->
						<!-- <div style="display:none;" class="col-lg-4 col-md-4 col-sm-6 col-xs-12 form-field" style="margin-top: 15px;">&nbsp;
								<button type="button" class="btn btn-primary btn-sm"
									id="addGR" name="addGR">
									<i class="fa fa-floppy-o fa-lg"></i>&nbsp;Add
								</button>
								<button type="button" id="clearMiv" class="btn btn-warning btn-sm">
									<i class="fa fa-times"></i>&nbsp;Clear
								</button>
						</div> -->
						</div>
						
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="splitGRGrid">
						<div class="col-md-12 form-field">
							<div id="itemDetailsGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
							<div class="clearfix">&nbsp;</div>
							
							<div id="stoneGrid" style="font-size: 12px; font-family: Verdana; position: relative;"></div>
							
							<div class="clearfix">&nbsp;</div>
							<div id="accGridDet" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
						</div>					
					</div>
					<div class="clearfix">&nbsp;</div>	
					<div class="row text-center">
						<button type="button" class="btn btn-primary btn-sm" id="saveSplitGR" name="saveSplitGR">
							<i class="fa fa-floppy-o fa-lg"></i>&nbsp;Save
						</button>
					</div>
				</div>
			</form>
				<div class="clearfix">&nbsp;</div>
			   
				</div>
				   	
		</div>
	</div>
	</div>
</div>

<div class="modal fade" id="attributeSearch" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-pencil-square-o"></i> &nbsp; <label	id="popupheaderlabel">Attributes</label></h3>
			</div>
			<form class="form-horizontal" id="attributeC"	action="javascript:void(0);">
				<div class="col-sm-12">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-sm-3">
							<label>Length</label> 
							<input type="text"	disabled class="form-control" disabled placeholder="" id="lengthA" name="lengthA">
						</div>

						<div class="col-sm-3">
							<label>Size</label>
							<input type="text"	disabled class="form-control" disabled placeholder="" id="sizeA" name="sizeA">
						</div>
						
						<div class="col-sm-3">
							<label>Vendor Article</label>
							<input type="text" disabled	class="form-control" disabled placeholder="" id="vendArtA" name="vendArtA">
						</div>
						
						<div class="col-sm-3">
							<label>Stone Combination</label>
							<input type="text" disabled	class="form-control" disabled placeholder="" id="stoneCombinationA" name="stoneCombinationA">
						</div>
					</div>
					<div class="row">
						<div class="col-sm-3">
							<label>Metal Color</label>
							<input type="text"	disabled class="form-control" disabled placeholder="" id="metalColorA" name="metalColorA">
						</div>
						
						<div class="col-sm-3">
							<label>Polish Type</label>
							<input type="text" disabled	class="form-control" disabled placeholder="" id="polishTypeA" name="polishTypeA">
						</div>
						
						<div class="col-sm-3">
							<label>Setting Type</label>
							<input type="text"	disabled class="form-control" disabled placeholder="" id="settingTypeA" name="settingTypeA">
						</div>
						
						<div class="col-sm-3">
							<label>Collection Name</label>
							<input type="text"	disabled class="form-control" disabled placeholder="" id="collectionNameA" name="collectionNameA">
						</div>
					</div>
					<div class="row">
						<div class="col-sm-6">
							<label>Reason for Delay</label>
							<input type="text" disabled	class="form-control" disabled placeholder="" id="reasonForDelayA" name="reasonForDelayA">
						</div>
					</div>
				</div>

				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create Metal Accounting Location Footer -->
				<div class="modal-footer  text-center">
					<button type="button" disabled class="btn btn-primary btn-sm" id="updateAttr"name="updateAttr"><i class="fa fa-check fa-lg"></i>&nbsp;Update</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Cancel</button>

				</div>
			</form>
		</div>
	</div>
</div>


                              
<script src="resource/oe/assets/js/app/splitGRCreate.js" type="text/javascript"></script>
<!-- <script src="resource/oe/assets/js/app/grTally.js" type="text/javascript"></script>
 --><style>
.dateBackground
	{
	background-color:white !important;
	}
</style>