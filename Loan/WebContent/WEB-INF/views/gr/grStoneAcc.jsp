<!-- 
	##	Author1         : 	Dipankar Naha
	## 	Author2 	    :  
	##	Date Creation 	: 	10-11-2017
	## 	Description		:	UI Creation of GR Stone/Accessory
 -->
<div class="main-container">
	<div class="container">
		<div class="row">
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; IGR Stone/Accessory	</h1>
					<div class="heading-block-action">		
						
						<div class="pull-right"><button type="button" class="btn btn-primary" id="goBackS"><i class="fa fa-arrow-circle-left  fa-lg"  aria-hidden="true"></i>&nbsp; Go Back</button></div>
						<!-- <div class="pull-right"><button type="button" class="btn btn-primary" id="goBackC"><i class="fa fa-arrow-circle-left fa-lg"  aria-hidden="true"></i>&nbsp; Go Back</button></div> -->
					</div>	
				</div>
				<div class="mobile-responsive" id="stoneAccSearchSection">
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Stone/Accessory IGR</label>
							<select name="stoneAccGr" id="stoneAccGr" class="form-control" >
								<option value="" selected>--Select--</option>
								<option value="S">Stone IGR</option>
								<option value="A">Accessory IGR</option>
							</select>	
															
						</div>
						
						<div class="col-lg-9 col-md-6 col-sm-6 col-xs-12">								
							
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Status</label>
								<select name="status" id="status" class="form-control" >
									<option selected value="O">Open</option>
									<option value="C">Close</option>
								</select>								
							</div>		
							
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Vendor</label>
								<div id="vendor"><input id="vendorCode" class="form-control" placeholder="Vendor" type="text" /></div>	
								<input id="vendorCode-value" type="hidden" />							
							</div>	
							
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="mrvNoSection">
								<span class="required">*</span>
								<label>GRV No.</label>
								<select name="mrvNo" id="mrvNo" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>								
							</div>		
							
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"  id="mrvSlNoSection">
								<span class="required">*</span>
								<label>GRV Srl. No.</label>
								<input id="mrvSlNo" class="form-control" placeholder="GRV Sl No" type="text" disabled />							
							</div>		
							
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"  id="parcelSection">
								<span class="required">*</span>
								<label>Parcel No.</label>
								<select name="parcelIds" id="parcelIds" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>								
							</div>						
						</div>
						
						
					</div>						
					<div class="row voffset2" align="center">
						<button class="btn btn-primary voffset" type="button" name="searchS" id="searchS"><i class="fa fa-search fa-lg"></i> Search</button>&nbsp;
						<button id="clearS" class="btn btn-warning voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>					
					</div>					
				</div>
				
				<div id="createGRSection">
					<div class="heading-block">
						<h5>
							<i class="fa fa-plus"></i> &nbsp; Create Stone IGR 
						</h5>					
					</div>
					
					<!-- CREATE GR STONE/ACC STARTED -->
					<div class="row">
														
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Vendor</label>
								<input type="text"  disabled class="form-control" placeholder="Vendor" id="vendorC">							
							</div>		
							
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>GRV No.</label>
								<input type="text"  disabled class="form-control" placeholder="GRV No." id="mrvNoC">									
							</div>		
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>GRV Srl. No.</label>
								<input type="text"  disabled class="form-control" placeholder="GRV Sl. No." id="mrvSlNoC">									
							</div>	
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Vendor Invoice No.</label>
								<input type="text"  disabled class="form-control" placeholder="Vendor Invoice No." id="vendorInvNo">									
							</div>		
							
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Segment</label>
								<input type="text"  disabled class="form-control" placeholder="Segment" id="segmentC">									
								<input type="hidden" id="segmentId"><input type="hidden" id="segmentCode">									
							</div>	
							
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label> GRV Stone Wt. </label>
								<input type="text"  disabled class="form-control" placeholder="Stone Weight" id="stoneWtC">									
							</div>							
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>IGR Srl. No. Count</label>
								<input type="text"  class="form-control" placeholder="IGR Sr. No. Count" id="grSlNoCountC" onchange="grPSrlCount()">									
								<input type="hidden"  class="form-control" id="mrvType">									
							</div>		
							
							<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>&nbsp;</label>
								<div>
									<button class="btn btn-primary" type="button" name="saveGR" id="saveGR"><i class="fa fa-search fa-lg"></i> Save/Edit</button>&nbsp;
									<button id="createGR" class="btn btn-primary" type="button" disabled><i class="fa fa-plus fa-lg"></i>&nbsp; Create</button>					
								</div>
							</div>			
						</div>		
						
						
				</div>
				<div id="grGridSection">					
					<div class="row">
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>IGR NO</label>
							<input type="text" disabled class="form-control input-sm" placeholder="IGR NO" id="grId">	
							<input id="selectedRange" type="hidden" />		
							<input id="isValidWtRange" type="hidden" />		
							<input id="isValidCostRange" type="hidden" />							
						</div>		
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>IGR Date</label>
							<input type="text" disabled class="form-control input-sm" placeholder="IGR Date" id="grCreatedDt">							
						</div>	
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Vendor</label>
							<input type="text" disabled class="form-control input-sm" placeholder="Vendor" id="vendorC">									
						</div>		
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Vendor Invoice No.</label>
							<input type="text" disabled class="form-control input-sm" placeholder="Vendor Invoice No." id="vendorInvNo">									
						</div>	
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>GRV No.</label>
							<input type="text" disabled class="form-control input-sm" placeholder="GRV No." id="mrvNoC">									
						</div>		
						
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>GRV SL No. </label>
							<input type="text" disabled class="form-control input-sm" placeholder="GRV SL No." id="mrvSlNoC">									
						</div>	
						
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label> Segment </label>
							<input type="text" disabled class="form-control input-sm" placeholder="Segment" id="segmentC">									
						</div>							
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Stone Weight </label>
							<input type="text" disabled class="form-control input-sm" placeholder="Stone Weight" id="stoneWtC">									
						</div>		
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Stone Pcs.</label>
							<input type="text" disabled class="form-control input-sm" placeholder="Stone Pcs." id="stonePcs">									
						</div>	
						
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>
							<label>Consignment Period </label>
							<input type="text" disabled class="form-control input-sm" placeholder="Consignment Period" id="consignmentPeriod">									
						</div>	
								
					</div>	
					<div style="position: relative; z-index: 1"><div id="grStoneAccCreateGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
					
					<div class="row voffset2" align="center">
						<button class="btn btn-primary voffset" type="button" name="Save" id="saveGRFG"><i class="fa fa-floppy-o"></i> Save</button>
						&nbsp;<button id="clearGR" class="btn btn-warning voffset" type="button"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>						
						&nbsp; <a href="javascript:showContentPage('grStoneAcc', 'bodySwitcher')" class="btn btn-primary voffset" type="button" id="grListing"><i class="fa fa-list"></i>&nbsp;IGR Process</a>
					</div>
				</div>
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
						
						<button class="btn btn-primary voffset" type="button" data-toggle="modal" data-target="#stoneAccounting" id="stoneAcc" disabled>
							<i class="fa fa-floppy-o"></i> Stone Accounting
						</button>
						
						<button class="btn btn-primary voffset" type="button"  id="completeMrvProcess" disabled>
							<i class="fa fa-floppy-o"></i> Complete GRV Process
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
					     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle1">GRV Details</a></h4>				      
					    	</div>
							<div id="panel1"  class="panel-collapse collapse">
								<div class="panel-body">
						       		<div id="mrvDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						      	</div>
						   	</div>
					 	</div>
	
					 	<div class="panel panel-default">
					    	<div class="panel-heading">
					      		<h4 class="panel-title"><a class="accordion-toggle" id="toggle2">GIV Detail</a></h4>				      
					    	</div>
							<div id="panel2"  class="panel-collapse collapse">
								<div class="panel-body">
						       		 <div id="mivDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						      	</div>
						   	</div>
					  	</div>
					  
					  	<div class="panel panel-default">
					    	<div class="panel-heading">
					     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle3">Adjustment Detail</a></h4>				      
					    	</div>
							<div id="panel3"  class="panel-collapse collapse">
								<div class="panel-body">
						       		<div id="adjDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						      	</div>
						   	</div>
					  	</div>
					  		
					  		
				  		<div class="panel panel-default">
					    	<div class="panel-heading">
					     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle4">Stone Detail</a></h4>				      
					    	</div>
							<div id="panel4"  class="panel-collapse collapse">
								<div class="panel-body">
						       		 <div id="stoneDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
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

<!--  Add Diamond Certificate Details -->
<div class="modal fade" id="certDet" data-keyboard="false"	data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">

	<div class="modal-dialog modal-lg" style="width: 90%;">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Diamond Certificate Input Details
				</h3>
				<div class="clearfix"></div>
			</div>
			
			<!--  Modal Window Content Started  -->
			<div class="col-md-12 mobile-responsive">
				<div class="clearfix">&nbsp;</div>
				<form class="form-horizontal" id="" action="">
					<div class="container">
						<div class="row">
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Stone Article code </label>
								<input type="text" class="form-control input-sm" placeholder="Stone Article code" id="stoneArticleCodeCERT" name="stoneArticleCodeCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>IGR. No.</label>
								<input type="text" class="form-control input-sm" placeholder="GR No." disabled id="grNoCERT" name="grNoCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>IGR Sl. No.</label>
								<input type="text" class="form-control input-sm" placeholder="Gr Sl. No." disabled id="grSlNoCERT" name="grSlNoCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Stock No.</label>
								<input type="text" class="form-control input-sm" placeholder="Stock No." disabled id="stockNoCERT" name="stockNoCERT">									
							</div>	
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Vendor Code</label>
								<input type="text" class="form-control input-sm" placeholder="Vendor Code" id="vendorCodeCERT" name="vendorCodeCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Diamond Shape</label>
								<select name="diamondShapeCERT" id="diamondShapeCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>									
							</div>
						</div>
						<div class="row">	
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Carat Weight</label>
								<input type="text" class="form-control input-sm" placeholder="Carat Weight" id="caratWtCERT" name="caratWtCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Clarity</label>
								<select name="clarityCERT" id="clarityCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Color</label>
								<select name="colorCERT" id="colorCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Cut</label>
								<select name="cutCERT" id="cutCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Actual Color</label>
								<input type="text" class="form-control input-sm" placeholder="Actual Color" id="actualColorCERT" name="actualColorCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Intensity Color</label>
								<select name="intensityColorCert" id="intensityColorCert" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
						</div>
						<div class="row">	
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Lab Name</label>
								<select name="labNameCERT" id="labNameCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Certificate 1</label>
								<input type="text" id="certoneCERT" class="form-control input-sm" placeholder="Certificate 1" name="certoneCERT">
								
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Upload Certificate</label>
								<span class="btn btn-primary btn-lg btn-file">
								    Browse <input type="file" id="certUplaodOneCERT" name="certUplaodOneCERT">
								</span>	
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Lab Name</label>
								<select name="labNameTwoCERT" id="labNameTwoCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Certificate 2</label>
								<input type="text" class="form-control input-sm" placeholder="Certificate 2" id="certTwoCERT" name="certTwoCERT">									
							</div>
							
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Upload Certificate</label>
								<!-- <input type="file" class="form-control input-sm" placeholder="Certificate 1" id="certoneCERT" name="certoneCERT">	 -->
								<span class="btn btn-primary btn-lg btn-file">
								    Browse <input type="file" id="certUploadTwoCERT" name="certUploadTwoCERT">
								</span>								
							</div>
						</div>
						<div class="row">
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Measurements</label>
								<input type="text" class="form-control input-sm" placeholder="Measurements" id="measurementCERT" name="measurementCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Diamond Length</label>
								<input type="text" class="form-control input-sm" placeholder="Diamond Length" id="diamondLengthCERT" name="diamondLengthCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Diamond Width</label>
								<input type="text" class="form-control input-sm" placeholder="Diamond Width" id="diamondWidthCERT" name="diamondWidthCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Diamond Len./Wid. Rat.</label>
								<input type="text" class="form-control input-sm" placeholder="Diamond Len./Width Ratio" id="diamondLWRatioCERT" name="diamondLWRatioCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Table Size</label>
								<input type="text" class="form-control input-sm" placeholder="Table Size" id="tableSizeCERT" name="tableSizeCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Crown Angle</label>
								<input type="text" class="form-control input-sm" placeholder="Crown Angle" id="crownAngleCERT" name="crownAngleCERT">									
							</div>
						</div>
						<div class="row">	
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Crown Height</label>
								<input type="text" class="form-control input-sm" placeholder="Crown Height" id="crownHeightCERT" name="crownHeightCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Total Depth</label>
								<input type="text" class="form-control input-sm" placeholder="Total Depth" id="totalDepthCERT" name="totalDepthCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Pavilion Angle</label>
								<input type="text" class="form-control input-sm" placeholder="Pavilion Angle" id="pavilionAngleCERT" name="pavilionAngleCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Pavilion Depth</label>
								<input type="text" class="form-control input-sm" placeholder="Pavilion Depth" id="paviionDepthCERT" name="paviionDepthCERT">									
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Star Facet Length</label>
								<input type="text" class="form-control input-sm" placeholder="Star Facet Length" id="starFacetLengthCERT" name="starFacetLengthCERT">									
							</div>							
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Lower Girdle</label>
								<input type="text" class="form-control input-sm" placeholder="Lower Girdle" id="lowerGirdleCERT" name="lowerGirdleCERT">									
							</div>
							
						</div>
						<div class="row">	
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Girdle Thickness</label>
								<select name="girdleThickCERT" id="girdleThickCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Culet Size</label>
								<select name="culetSizeCERT" id="culetSizeCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Fluorescence</label>
								<select name="fluorescenceCERT" id="fluorescenceCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Polish </label>
								<select name="polishCERT" id="polishCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Symmetry</label>
								<select name="symmetryCERT" id="symmetryCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Brilliance</label>
								<select name="brillianceCERT" id="brillianceCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
						</div>
						<div class="row">	
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Fire</label>
								<select name="fireCERT" id="fireCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Scintillation</label>
								<select name="scintillationCERT" id="scintillationCERT" class="form-control" >
									<option value="" selected>--Select--</option>
								</select>		
							</div>
							
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Input</label>
								<input type="text" class="form-control input-sm" placeholder="Input" id="inputCERT" name="inputCERT">									
							</div>
							
							<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>
								<label>Remarks</label>
								<textarea cols="45" rows="2" class="form-control input-sm" id="remarksCERT" name="remarksCERT"></textarea>
							</div>
						</div>
					</div>
				</form>
			</div>
			
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

<style>
.btn-file {
    position: relative;
    overflow: hidden;
}
.btn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;
}
</style>
<script type="text/javascript" src="resource/oe/assets/js/app/grStoneAcc.js"></script>