<!-- 
	##	Author UI           : 	Dipankar
	## 	Author JAVA 	    :   Nagesh
	##	Date Creation 	    : 	03-08-2017
	## 	Description		    :	Design Order
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<div id="searchScOrderSection">
					<!-- Store Details  Header Started -->
					<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i> &nbsp;Design Order
						</h1>
						<div class="heading-block-action"></div>
					</div>
					<form class="form-horizontal" id="designOrder"	action="javascript: void(0);">
							<div class="row">
								<div class="col-sm-2">
									<label>Design Order From Date</label>
									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"	id="designOrderFromDate" placeholder="DD/MM/YYYY">
										<label for="designOrderFromDate" class="input-group-addon cursor"><span	class="fa fa-calendar"></span></label>
									</div>
								</div>
	
								<div class="col-sm-2">
									<label>Design Order To Date</label>
									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"	id="designOrderToDate" placeholder="DD/MM/YYYY"> 
										<label for="designOrderToDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
								</div>
								<div class="col-sm-2">
									<label>Segment</label>
									<select id="segmentDO" class="form-control"><option value="" selected label="Select" /></select>
								</div>	
								<div class="col-sm-2">
									<label>Jewel Type</label>
									<select id="jewelTypeDO" class="form-control"><option value="" selected label="Select" /></select>
								</div>								
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button" name="createDO" id="createDO"><i class="fa fa-plus fa-lg"></i> Create</button>&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button" name="searchDO" id="searchDO"><i class="fa fa-search fa-lg"></i> Search</button>&nbsp;							
								<button id="clear" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
							</div>
					</form>
				</div>
				<div id="headerScOrder" class="heading-block">
						<h1><i class="fa fa-desktop"></i> &nbsp; Design Order - Create</h1>
						<div class="heading-block-action">
							<a class="btn btn-primary btn-sm voffset" href="javascript:showContentPage('designOrder', 'bodySwitcher');" id="goback" type="button" ><i class="fa fa-arrow-left"></i>&nbsp;Go Back </a>	
						</div>	
				</div>
				<div id="designOrderGrid" style="font-size: 13px; font-family: Verdana; z-index: 1; margin-top:5px; position: relative; width: 100%;"></div>
				<div id="designDetGrid"	style="font-size: 13px; font-family: Verdana; z-index: 1; margin-top:5px; position: relative; width: 100%;"></div>				
				<div id="designSearchGrid"	style="font-size: 13px; font-family: Verdana; z-index: 1; margin-top:5px; position: relative; width: 100%;"></div>
				
				<div id="saveDOSection" class="text-center">
					<button id="saveDesignOrder" class="btn btn-primary btn-sm voffset" type="button">
						<i class="fa fa-floppy-o fa-lg"></i>&nbsp; Save
					</button>
				</div>
			<div id="designOrderCancelSection">
				<div  class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Design Order - Cancel</h1>
						<div class="heading-block-action">
							<a class="btn btn-primary btn-sm voffset" type="button" id="backFromCancel" href="javascript:showContentPage('designOrder','bodySwitcher')">
								<i class="fa fa-chevron-left"></i>&nbsp;Back
							</a>
						</div>
				</div>
					<div class="row">							
						<div class="clearfix">&nbsp;</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
								<label>Order No :</label>
								<input type="text" disabled class="form-control input-sm" name="orderNo" id="orderNo">
							</div>	
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
								<label>Date :</label>
								<input type="text" disabled class="form-control input-sm"  name="date" id="date">
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
								<label>Advance Paid:</label>
								<input type="text" disabled class="form-control input-sm" name="advancePaid" id="advancePaid">
							</div>	
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
								<label>Status :</label>
								<input type="text" disabled class="form-control input-sm"  name="status" id="status">
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
								<label>Advance : </label>
								<input type="text" disabled class="form-control input-sm" name="advance" id="advance">
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
								<label>Unrealized Cheque/DD Amt :</label>
								<input type="text" disabled class="form-control input-sm"  name="unrealizedAmt" id="unrealizedAmt">
							</div>
				   </div>
					<div class="row">
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Cancelled On: </label>
							<input type="text" disabled class="form-control input-sm"  name="cancelledOn" id="cancelledOn">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<label>Cancelled By : </label>
							<input type="text" disabled class="form-control input-sm"  name="cancelledBy" id="cancelledBy">
						</div>
					</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<div class="clearfix">&nbsp;</div>
							<label class="radio-inline">
							<input class="element" type="radio" name="orderItem"  value="orderItem"><b style="font-size:180%;">Order</b></label> 
							<label class="radio-inline"> 
							<input class="element" type="radio" name="orderItem" value="lineItem"><b style="font-size:180%;">Line Item</b>
						</label>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row">
							&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-list"></i>&nbsp;<u style="font-size :14px;">Design Order Details :</u>
						</div><br>
						<div style="position: relative; z-index: 1">
							<div id="jqxgridD" style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="modal-footer  text-center">
							<a class="btn btn-primary btn-sm voffset" data-toggle="modal"
							data-target="#cancelDesignOrderCC" type="button" id="designOrderCancel"
							href="javascript: void(0)"><i class="fa fa-times fa-lg"></i>
							&nbsp; Cancel Order </a>
							<a class="btn btn-primary voffset" type="button" id="backFromCancel" href="javascript:showContentPage('designOrder','bodySwitcher')">
								<i class="fa fa-list fa-md"></i>&nbsp;Design Order List
							</a>
						</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!--################################## Design Form #################################################  -->

<div class="modal fade" id="DesignDetSC" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Design Form Details</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="designDetailsForm" action="javascript:void();">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="col-md-6">
						<div class="row">
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Design Due Date</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground" id="designDueDate" placeholder="DD/MM/YYYY"	name="designDueDate" data-validation-format="dd/mm/yyyy">
									<label for="designDueDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>					
						 
							<div class="col-md-12 form-field">
								<span class="required">* </span> 
								<label>Designs Status</label> <input type="text" id="designStatus" disabled name="designStatus"	placeholder="Design Status" class="form-control" disabled />
								<input type="hidden" id="designStatusId" name="designStatusId"	placeholder="Design Id" class="form-control" />
							</div>

							
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Design By </label> 
								<select	id="designBy" name="designBy" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>

							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Designer Name </label> 
								<select	id="designerName" name="designerName" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
						</div>
					</div>

					<div class="col-md-6">
						<div class="row">
							
							<div class="col-md-12 form-field">
								<span class="required">* </span><label>Design Instruction</label>
								<textarea rows="2" cols="50" id="designInstr" name="designInstr" placeholder="Design Instruction" class="form-control"></textarea>
							</div>	
												
							<div class="col-md-12 form-field" id="designIdShowHide">
								<span class="required">* </span> <label>Designs Id</label> 
								<input	type="text" id="designId" name="designId" placeholder="Designs Id" class="form-control" />

							</div>

							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>No of Design Required</label> 
								<input type="text" id="noOfDesignReq" name="noOfDesignReq" placeholder="No of Design Required"	class="form-control" />
							</div>

							<div class="col-md-12 form-field">
								<label>Stock / Catalogue Page Reference No</label>
								<textarea rows="2" cols="50" id="scCatalogueNo"	name="scCatalogueNo" placeholder="Stock / Catalogue Page Reference No"	class="form-control"></textarea>
							</div>
						</div>
					</div>
				</div>

				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create Company Master  Footer -->
				<div class="modal-footer  text-center">
					<button class="btn btn-primary btn-sm voffset" type="submit"	name="saveDesignForm" id="saveDesignForm"><i class="fa fa-plus fa-lg"></i> &nbsp;Add</button>
					<button type="submit" class="btn btn-warning btn-sm voffset" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
				</div>
			</form>
		</div>
	</div>
</div>

<div class="modal fade" id="DesignDetEdit" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Design Form Details - Edit</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="designDetailsEditForm" action="javascript:void();">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="row">	
						<div class="col-md-3 form-field">
							<span class="required">* </span> <label>Design Order No.</label> 
							<input type="text" id="designOrderNo" name="designOrderNo" placeholder="Design Order No." disabled class="form-control" />
							<input type="hidden" id="designOrderId" name="designOrderId" placeholder="Design Order Id" disabled class="form-control" />
						</div>
						<div class="col-md-3 form-field">
								<span class="required">* </span> <label>Design Due Date</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground" id="designDueDateEdit" placeholder="DD/MM/YYYY"	name="designDueDateEdit" data-validation-format="dd/mm/yyyy">
									<label for="designDueDateEdit" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>
						
							<div class="col-md-3 form-field">
								<span class="required">* </span> 
								<label>Designs Status</label> <input type="text" id="designStatusEdit" disabled name="designStatusEdit"	placeholder="Design Status" class="form-control" disabled />
								<input type="hidden" id="designStatusIdEdit" name="designStatusIdEdit"	placeholder="Design Id" class="form-control" />
							</div>

							
							<div class="col-md-3 form-field">
								<span class="required">* </span> <label>Design By </label> 
								<select	id="designByEdit" name="designByEdit" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
						</div>
						<div class="row">
							<div class="col-md-3 form-field">
								<span class="required">* </span> <label>Designer Name </label> 
								<select	id="designerNameEdit" name="designerNameEdit" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>					
						
						
						<div class="col-md-3 form-field">
							<span class="required">* </span> <label>Exp. Gross Wt.</label> 
							<input type="text" id="expGrWtEdit" name="expGrWtEdit" placeholder="Exp. Gross Wt."	class="form-control" />
						</div>
						
						<div class="col-md-3 form-field">
							<span class="required">* </span> <label>Exp. Net Wt.</label> 
							<input type="text" id="expNetWtEdit" name="expNetWtEdit" placeholder="Exp. Net Wt."	class="form-control" />
						</div>
						
						<div class="col-md-3 form-field">
							<span class="required">* </span> <label>No of Design Required</label> 
							<input type="text" id="noOfDesignReqEdit" name="noOfDesignReqEdit" placeholder="No of Design Required"	class="form-control" />
						</div>						
					</div>
					
					<div class="row">
						<div class="col-md-3 form-field">
							<label>Stock / Catalogue Page Ref, No</label>
							<input  id="scCatalogueNoEdit"	name="scCatalogueNoEdit" placeholder="Stock / Catalogue Page Reference No"	class="form-control">
						</div>
						<div class="col-md-9 form-field">
						<span class="required">* </span>	<label>Design Instruction</label>
							<textarea rows="2" cols="50" id="designInstrEdit" name="designInstrEdit" placeholder="Design Instruction" class="form-control"></textarea>
						</div>	
										
					</div>
				</div>
				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create Company Master  Footer -->
				<div class="modal-footer  text-center">
					<button class="btn btn-primary btn-sm voffset" type="submit" name="updateDesignDetails" id="updateDesignDetails"><i class="fa fa-floppy-o fa-lg"></i> &nbsp;Update</button>
					<button type="submit" class="btn btn-warning btn-sm voffset" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
				</div>
			</form>
		</div>
	</div>
</div>

<div class="modal fade" id="cancelDesignOrderCC" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg" style=" width: 450px; height:600px !important;">
		<div class="modal-content">
			<!-- Modal Create Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Reason For Cancellation
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="reasonForm"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">						
						<div class="col-md-11 form-field">&nbsp;
						 <span class="required">*</span><label>Reason : </label>
							&nbsp;&nbsp;&nbsp;&nbsp;<textarea  rows="4" cols="50" id="reason" name="reason"  placeholder="" style="background-color: #fefdfd; align:right;" class="form-control"></textarea>
						</div>
					</div>
				</div>
				<div class="clearfix">&nbsp;</div>
				<div class="modal-footer  text-center">
					<button type="button" class="btn btn-primary btn-sm voffset" id="cancelDes"
						name="cancelDes">
						<i class="fa fa-plus"></i>&nbsp; Ok
					</button>
					<button type="button" class="btn btn-warning btn-sm voffset" data-dismiss="modal"
						id="cancel">
						<i class="fa fa-times"></i>&nbsp;Cancel
					</button>

				</div>
			</form>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/designOrder.js" type="text/javascript"></script>



<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>