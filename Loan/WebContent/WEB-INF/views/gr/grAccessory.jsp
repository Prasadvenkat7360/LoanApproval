<!-- 
	##	Author1         : 	Dipankar Naha 
	## 	Author2 	    :   pooja Sangve
	##	Date Creation 	: 	27-10-2017
	## 	Description		:	UI Creation of Accessory GR
 -->
<div class="main-container">
	<div class="container">
		<div class="row">
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1 id ="createGrAcc"><i class="fa fa-desktop"></i> &nbsp; Create Accessory IGR </h1>
					<h1 id ="editGrAcc"><i class="fa fa-desktop"></i> &nbsp; Edit Accessory IGR </h1>
					<div class="heading-block-action">								
						<div id="stoneSection" class="pull-right"><a class="btn btn-primary btn-sm" href="javascript:showContentPage('grStoneAcc', 'bodySwitcher')"><i class="fa fa-arrow-circle-left  fa-lg" aria-hidden="true"></i> &nbsp;Go Back</a></div>
						<div id="accSection" class="pull-right"><a class="btn btn-primary btn-sm" href="javascript:showContentPage('grAccessory', 'bodySwitcher')"><i class="fa fa-arrow-circle-left  fa-lg" aria-hidden="true"></i> &nbsp;Go Back</a></div>
					</div>	
				</div>
				
				<div id="createGRSection">					
					<!-- CREATE GR STONE/ACC STARTED -->
					<div class="row">
														
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Vendor</label>
								<input type="text"  disabled class="form-control" placeholder="Vendor" id="vendorC">
								<input type="hidden"  disabled class="form-control" placeholder="Vendor" id="vendorCodeC">		
								<input type="hidden"  disabled class="form-control" placeholder="Vendor" id="noOfParcels">							
							</div>		
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Parcel</label>
								<input type="text"  disabled class="form-control" placeholder="Parcel" id="parcelId">									
							</div>		
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Parcel Wt.</label>
								<input type="text"  disabled class="form-control" placeholder="Acc Wt" id="accWt">									
							</div>	
							<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>&nbsp;</label>
								<div>
									<button id="createGR" class="btn btn-primary" type="button"><i class="fa fa-plus fa-lg"></i>&nbsp; Create</button>					
								</div>
							</div>			
						</div>		
				   </div>
				<div id="grGridSection">					
					
					<div class="row">
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>IGR NO</label>
							<input type="text" disabled class="form-control input-sm" placeholder="GR NO" id="grId">	
							<input id="selectedRange" type="hidden" />		
							<input id="isValidWtRange" type="hidden" />		
							<input id="isValidCostRange" type="hidden" />							
						</div>		
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>IGR Date</label>
							<input type="text" disabled class="form-control input-sm" placeholder="GR Date" id="grCreatedDt">							
						</div>	
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Vendor</label>
							<input type="text" disabled class="form-control input-sm" placeholder="Vendor" id="vendorCreategr">									
						</div>		
						<input type="hidden"  disabled class="form-control" placeholder="Vendor" id="grCreatedDtS">	
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Vendor Invoice No.</label>
							<input type="text"  class="form-control input-sm" placeholder="Vendor Invoice No." id="vendorInvNo">									
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Invoice Date</label>
								<div class="input-group"><input type="text"  class="date-picker form-control dateBackground"
									name="invoiceDate" id="invoiceDate" placeholder="DD/MM/YYYY">
								<label for="invoiceDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
						       </div>
						</div>	
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Parcel</label>
							<input type="text" disabled class="form-control input-sm" placeholder="Parcel" id="parcelIdC">									
						</div>	
						<input type="hidden" disabled class="form-control input-sm" id="segmentID">									
						</div>
						<div class="row">
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Parcel Wt. </label>
							<input type="text" disabled class="form-control input-sm" placeholder="Parcel Wt." id="parcelWtC">									
						</div>	
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label> Acc Pcs </label>
							<input type="text"  class="form-control input-sm" placeholder="Acc Pcs" id="accPcs">									
						</div>	
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Invoice Value </label>
							<input type="text"  class="form-control input-sm" placeholder="Invoice Value" id="invoiceVal">									
						</div>						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Job Worker Type </label>
							<select name="jobWorkerTypeC" id="jobWorkerTypeC" class="form-control" >
							</select>								
						</div>		
						<input type="hidden" id="statusGrID" name="statusGrID">
						<!-- 
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Stone Pcs.</label>
							<input type="text" disabled class="form-control input-sm" placeholder="Stone Pcs." id="stonePcs">									
						</div>	 -->
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Consignment Period </label>
							<input type="text"  class="form-control input-sm" placeholder="Consignment Period" id="consignmentPeriod">									
						</div>	
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field" id="isRegisterIdN">
							<span class="required">*</span>
							<label>Is-Register</label>
							<select name="isRegisterId" id="isRegisterId" class="form-control" >
							<option  value="">--Select--</option>
							<option value=true>Register</option>
							<option value=false>UnRegister</option>
							</select>	
						</div>	
						</div>
						<div class="row">
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field" id="gstN">
								<span class="required">*</span>
								<label>GSTN No.</label>
								<select name="gstIn" id="gstIn" class="form-control" >
								<option  value="">--Select--</option>
								</select>	
							</div>	
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field" id="statee">
								<span class="required">*</span><label>Source Of State</label>
									<input type="text" disabled class="form-control input-sm" placeholder="Source Of State" id="statusGr">								
							</div>	
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field" id="stateeOption">
								<span class="required">*</span>
								<label>Source Of State</label>
								<select name="statusGrIDSelct" id="statusGrIDSelct" class="form-control" >
								<option  value="">--Select--</option>
								</select>
							</div>	
					</div>	
					
						<div class="clearfix">&nbsp;</div>
					    <div class="heading-block">	
						<div class="heading-block-action">
							<button class="btn btn-primary" id="addRowSam" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div style="position: relative; z-index: 1"><div id="grStoneAccCreateGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
					
					<div class="clearfix">&nbsp;</div>
					<div class="row voffset2" align="center">
						<button class="btn btn-primary voffset" type="button" name="Save" id="saveGRFG"><i class="fa fa-floppy-o"></i> Save</button>
						<button class="btn btn-primary voffset" type="button" name="Save" id="saveGRFGEdit"><i class="fa fa-floppy-o"></i> Save</button>
						&nbsp;<button id="clearGR" class="btn btn-warning voffset" type="button"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>						
						&nbsp; <a href="javascript:showContentPage('grStoneAcc', 'bodySwitcher')" class="btn btn-primary voffset" type="button" id="grListing"><i class="fa fa-list"></i>&nbsp;GR Process</a>
					</div>
				</div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
				<div id="grTallySection">
					<div class="heading-block">
						<h5><i class="fa fa-list"></i> &nbsp; IGR Details</h5>					
					</div>
					<div style="position: relative; z-index: 1"><div id="grDetailsList" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
					<div class="clearfix">&nbsp;</div>
					<div class="text-center">
						<button class="btn btn-primary voffset" type="button" data-toggle="modal" data-target="#grBillToTally" id="grTally">
							<i class="fa fa-floppy-o"></i> IGR to Bill Tally
						</button>
					
						<button class="btn btn-primary voffset" type="button"  id="completeMrvProcess">
							<i class="fa fa-floppy-o"></i> Complete IGR & Generate STK No
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- GR Tally Modal Pop-up window  -->

<div class="modal fade" id="grBillToTally" data-keyboard="false"	data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">

	<div class="modal-dialog modal-lg" style="width: 90%;">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-list"></i> &nbsp; IGR to Bill Tally
				</h3>
				<div class="clearfix"></div>
			</div>
			
			<!--  Modal Window Content Started  -->
			<div class="col-md-12 mobile-responsive">
				<div class="clearfix">&nbsp;</div>
				<form class="form-horizontal" id="" action="">
					<div class="container">
						
				  		<div class="panel panel-default">
					    	<div class="panel-heading">
					     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle1">Invoice Details</a></h4>				      
					    	</div>
							<div id="panel1"  class="panel-collapse collapse">
								<div class="panel-body">
						       		<div id="parcelDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						      	</div>
						   	</div>
					 	</div>
	
					 	<div class="panel panel-default">
					    	<div class="panel-heading">
					      		<h4 class="panel-title"><a class="accordion-toggle" id="toggle2">Return Detail</a></h4>				      
					    	</div>
							<div id="panel2"  class="panel-collapse collapse">
								<div class="panel-body">
						       		 <div id="returnDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						      	</div>
						   	</div>
					  	</div>
					  
					  	<div class="panel panel-default">
					    	<div class="panel-heading">
					     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle3">Accessory Detail</a></h4>				      
					    	</div>
							<div id="panel3"  class="panel-collapse collapse">
								<div class="panel-body">
						       		<div id="accDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						      	</div>
						   	</div>
					  	</div>
					</div>
				</form>
			</div>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Department Master  Footer -->
			<div class="modal-footer  text-center">
				<!-- <button class="btn btn-primary voffset" type="button" name="saveMrvDet" id="saveMrvDet">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button> -->
				&nbsp;
				<button type="button" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Close
				</button>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="resource/oe/assets/js/app/grAccessory.js"></script>