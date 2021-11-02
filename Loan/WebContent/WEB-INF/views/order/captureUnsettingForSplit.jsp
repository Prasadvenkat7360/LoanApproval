<!-- 
	##	Author UI 		: 	Mani prasad
	##  API Integration	:   Dipankar
	##  JAVA			: 	Venkat
	##	Date Creation 	: 	06-06-2017
	## 	Description		:	CAPTURE UNSETTING DETAILS
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<div id="unsettingSplitSection">			
					<div class="heading-block">
						<h1><i class="fa fa-desktop"></i> &nbsp; Create Special Item Process</h1>
					</div>
					<!--  Modal Window Content Started  -->
					<form class="form-horizontal" action="javascript:void(0);" id="cuUnseetingCreateForm">
							<div class="clearfix">&nbsp;</div>
							<!-- Row 1 Started  -->
							<div class="row">						
								<div class="col-sm-2">
									<span class="required">*</span><label>Ref. Doc. No.</label>
									<input type="text" placeholder="Ref. Doc. No." class="form-control" name="refDocNoC" id="refDocNoC">
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span><label>Ref. Doc. Type.</label>
									<input type="hidden" id="refDoctypeIdC" />
									<input type="text" placeholder="Ref. Doc. Type." class="form-control" name="refDoctypeC" id="refDoctypeC" disabled>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span><label>Unsetting Metal Type</label>
									<input type="text" placeholder="Unsetting Metal Type" class="form-control" name="unsettingMetalTypeC" id="unsettingMetalTypeC" disabled>
									<input type="hidden" placeholder="Unsetting Metal Type" class="form-control" name="unsettingMetalTypeIdC" id="unsettingMetalTypeIdC" disabled>
									
								</div>
									
								<div class="col-sm-2">
									<span class="required">*</span><label>Unsetting Type</label>
									<input type="text" placeholder="Unsetting Type" class="form-control" name="unsettingTypeC" id="unsettingTypeC" disabled>
									<input type="hidden" placeholder="Unsetting Type" class="form-control" name="unsettingTypeCodeC" id="unsettingTypeCodeC" disabled>
									
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span><label>Purity</label>
								    <input type="text" placeholder="purity" class="form-control" name="purityC" id="purityC" disabled>
								</div>
									
								<div class="col-sm-2">
									<span class="required">*</span><label>Unset Receipt 3<sup>rd</sup> Party Code</label>
									<select name="uVendor" class="form-control" id="uVendor"><option value="" selected label="--Select----" /></select>
								</div>
							</div>
							<!-- 2nd row -->
							<div class="row">						
								
								<div class="col-sm-2" id="reSlNoSection">
								    <span class="required">*</span><label>Ref. SRL. No.</label>
								  <input type="text" placeholder="Ref Srl No" class="form-control" name="refSrlDocNoC" id="refSrlDocNoC" disabled>
								</div>
							
								<div class="col-sm-2">
									<label>Unsetting Date</label>
									<input type="text" value="" class="form-control" disabled name="unsettCreatedDateC" id="unsettCreatedDateC" disabled>															
								</div>							
								
								<div class="col-sm-2">
									<label>Unsetting Created By</label>
									<input type="text"  class="form-control" disabled name="unsettCreatedbyC" id="unsettCreatedbyC" disabled>	
									<input type="hidden" class="form-control" disabled name="unsettCreatedIdC" id="unsettCreatedIdC" disabled>						
								</div>
								
								<div class="col-sm-2">
									<label>Status</label>
									<input type="text" disabled class="form-control" name="statusC" id="statusC">
								</div>
								<div class="col-sm-2">
									<label>Jewel Type</label>
									<input type="text" disabled class="form-control" name="jTypeC" id="jTypeC">
								</div>
								
								<div class="col-sm-2">
									<label>Gross Wt.</label>
									<input type="text" disabled class="form-control" name="grossWtC" id="grossWtC">
								</div>	
							</div>
							<div class="row">
								<div class="col-sm-2">
									<label>Net Wt.</label>
									<input type="text" disabled class="form-control" name="netWtC" id="netWtC">
								</div>
								<div class="col-sm-2">
									<label>Pcs</label>
									<input type="text" disabled class="form-control" name="piecesC" id="piecesC">
								</div>
								<div class="col-sm-2">
									<label>Item Vendor Code</label>
									<input type="text" disabled class="form-control" name="itemVendorCodeC" id="itemVendorCodeC">
									<input type="hidden" disabled class="form-control" name="delearConsign" id="delearConsign">
								</div>
								<div class="col-sm-2" style="margin-top:17px;">
									<button type="button" class="btn btn-primary btn-sm" id="addDet" name="addDet"><i class="fa fa-plus"></i>&nbsp;Add</button>
								</div>
								
							</div>
							</form>
								<div class="row" style="margin-left: 1px;">
									<button class="btn btn-primary btn-sm voffset" type="button" id="createGiv" onclick="javascript:showContentPage('unsettingMivForSplit', 'bodySwitcher')">
										<i class="fa fa-plus"></i>&nbsp; Create Unsetting  GIV
									</button>	
									&nbsp;
								
									<button class="btn btn-primary btn-sm voffset" type="button" id="createGrC" onclick="javascript:showContentPage('unsettingGrForSplit', 'bodySwitcher')">
										<i class="fa fa-plus"></i>&nbsp; Create Unsetting IGR
									</button>
									
									&nbsp;
									
									<button class="btn btn-primary btn-sm voffset" type="button" id="stoneMovementC">
										<i class="fa fa-plus"></i>&nbsp; Unsetting Stone Movement
									</button>
									
									&nbsp;
									
									<button class="btn btn-primary btn-sm voffset" type="button" id="accMovementC">
										<i class="fa fa-plus"></i>&nbsp; Unsetting Accessory Movement
									</button>
									
									&nbsp;
									
									<button class="btn btn-primary btn-sm voffset" type="button" id="splitReleaseC" name="splitReleaseC">
										<i class="fa fa-plus"></i>&nbsp; Release
									</button>
									
									&nbsp;
									
									<button class="btn btn-primary btn-sm voffset" type="button" id="splitGivC" name="splitGivC">
										<i class="fa fa-plus"></i>&nbsp; Create GIV
									</button>	
									
									&nbsp;
									<button class="btn btn-primary btn-sm voffset" type="button" id="sentParcelC" name="sentParcelC">
										<i class="fa fa-plus"></i>&nbsp; Create Sent Parcel
									</button>
									
									&nbsp;
									<button class="btn btn-primary btn-sm voffset" type="button" id="recvParcelC" name="recvParcelC">
										<i class="fa fa-plus"></i>&nbsp; Create Receive Parcel
									</button>
									
									&nbsp;
									<button class="btn btn-primary btn-sm voffset" type="button" id="splitGrvC" name="splitGrvC" >
										<i class="fa fa-plus"></i>&nbsp; Create MRV
									</button>
									&nbsp;
									
									<button class="btn btn-primary btn-sm voffset" type="button" id="splitIgrC" onclick="javascript:showContentPage('splitGRCreate', 'bodySwitcher')">
										<i class="fa fa-plus"></i>&nbsp; Create IGR
									</button>
									&nbsp;
									
									<button class="btn btn-primary btn-sm voffset" type="button" id="grMetalAccounting">
										<i class="fa fa-plus"></i>&nbsp; Metal Accounting
									</button>
									&nbsp;									
									
									<button class="btn btn-primary voffset" type="button" data-toggle="modal" data-target="#grCompleteMRVProcessModal" id="grCompleteMRVProcess" disabled>
										<i class="fa fa-floppy-o"></i> Complete GRV Process
									</button>
									
									<button class="btn btn-primary btn-sm voffset" type="button" id="splitQc" name="splitQc">
										<i class="fa fa-plus"></i>&nbsp; QC
									</button>
								</div>
							</div>
						
							<!--3nd row  -->
						
							<div class="clearfix">&nbsp;</div>
							<div class="clearfix">&nbsp;</div>
							
							<div class="row" id="creategrid">
								<div class="col-md-12 form-field">
									<div id="cuItemMasterGrid" style="font-size: 12px; font-family: Verdana; position: relative;"></div>
									<div id="stoneItemGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
									<div id="stoneOPItemGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
									<div id="accItemGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
								</div>					
							</div>
						
						<!-- Modal Create Metal Accounting Location Footer -->
						<div class="row text-center" id="footerSection">
							<button type="button" class="btn btn-primary btn-sm" id="saveSplitDetails" name="saveSplitDetails"><i class="fa fa-save"></i>&nbsp;Save</button>
								&nbsp;
						</div>
		
				</div>
				
				<div id="stoneMovementSplitSection" style="padding:10px;">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Create Stone Movement</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromMovement"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>	
				</div>
				<div class="row">
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Movement Type</label>
							 	<input type="text" class="form-control" placeholder="Movement Type"
								 id="movTypeC" name="movTypeC" disabled>
						 </div>
						 <div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>To</label>
							 	<input type="text" class="form-control" placeholder="To"
								 id="toTypeC" name="toTypeC" disabled>
						 </div>
						 
						 <div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Stock No</label>
							 	<input type="text" class="form-control" placeholder="Stock No"
								 id="stockNoC" name="stockNoC" disabled>
						 </div>
						 <div class="col-sm-2" id="ordNumb">
							<span class="required">*</span><label>Order No</label><div id="orderNoC"></div>
						</div>

				</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="button"
							name="searchSM" id="searchSM">
							<i class="fa fa-search fa-lg"></i> Search
						</button>
						<button id="clearSM" class="btn btn-warning btn-sm voffset" type="reset">
							<i class="fa fa-times fa-lg"></i>&nbsp; Clear
						</button>
					</div>
					
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
						<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>	
				<div class="row text-center" id="footerSection">
					<button type="button" class="btn btn-primary btn-sm" id="saveStoneMove" name="saveStoneMove"><i class="fa fa-save"></i>&nbsp;Save</button>
				</div>
			</div>
			
			<div id="accMovementSplitSection" style="padding:10px;">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Create Accessory Movement</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromMovement"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>	
				</div>
				<div class="row">
					<div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>From Type</label>
						 	<input type="text" class="form-control" placeholder="From Type"
							 id="fromTypeC" name="fromTypeC" disabled>
					 </div>
					 <div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>Stock Id</label>
						 	<input type="text" class="form-control" placeholder="Stock Id"
							 id="accStockIdC" name="accStockIdC" disabled>
					 </div>
				</div>
				<div class="clearfix">&nbsp;</div>
					<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="button"
							name="searchAM" id="searchAM">
							<i class="fa fa-search fa-lg"></i> Search
						</button>
						<button id="clearAcc" class="btn btn-warning btn-sm voffset" type="reset">
							<i class="fa fa-times fa-lg"></i>&nbsp; Clear
						</button>
					</div>
					
					<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
						<div id="jqxgridA" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>	
				<div class="row text-center" id="footerSection">
					<button type="button" class="btn btn-primary btn-sm" id="saveAccMove" name="saveAccMove" style="margin-top: 10px;"><i class="fa fa-save"></i>&nbsp;Save</button>
				</div>
			</div>
			<div id="releaseSection" style="padding:10px;">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Unsetting Split Release</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromMovement"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>	
				</div>
				<div class="row" style="margin: 5px;">
					<div class="col-md-2">
						<label>From Date</label>
							<div class="input-group">
							<input type="text" readonly class="date-picker form-control dateBackground"	name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
							<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
					</div>
					</div>
					<div class="col-sm-2">
						<label>To Date</label>
						<div class="input-group">
						<input type="text" readonly class="date-picker form-control dateBackground"	name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
						<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
						</div>
					</div>
					<div class="col-md-2">
						<label>Stock Id</label>
						 <input type="text" class="form-control" placeholder="Stock Id" id="relStockIdC" name="relStockIdC" >
					</div>
					
					<div class="col-md-2">
						<label>Status</label>
						<input type="text" class="form-control" placeholder="Status" id="relStatusC" name="relStatusC" disabled>
					</div>
				</div>
				<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="button"
							name="searchRel" id="searchRel">
							<i class="fa fa-search fa-lg"></i> Search
						</button>
						<button id="clearRel" class="btn btn-warning btn-sm voffset" type="button">
							<i class="fa fa-times fa-lg"></i>&nbsp; Clear
						</button>
				</div>
				<div class="clearfix">&nbsp;</div>
				<div class="row" style="margin: 5px;">
				<div style="position: relative; z-index: 1">
						<div id="jqxgridR" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>	</div>
				<div class="row text-center" id="footerSection">
					<button type="button" class="btn btn-primary btn-sm" id="saveSplitRel" name="saveSplitRel" style="margin-top: 10px;"><i class="fa fa-save"></i>&nbsp;Save</button>
				</div>
				
			</div>
			<div id="splitMivSection">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Goods Issue Voucher</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromMovement"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>	
				</div>
				<div class="row" style="padding:5px;">
					<div class="col-md-2">
						<label>GIV No</label>
						<input type="text" class="form-control" placeholder="GIV No" id="givNoC" name="givNoC" disabled>
					</div>
					<div class="col-md-2">
						<label>GIV Date</label>
						<input type="text" class="form-control" placeholder="GIV Date" id="givDateC" name="givDateC" disabled>
					</div>
					<div class="col-md-2">
						<label>GIV Type</label>
						<input type="text" class="form-control" placeholder="GIV Type" id="givTypeC" name="givTypeC" disabled>
					</div>
					<div class="col-md-2">
						<label>Stock No</label>
						<input type="text" class="form-control" placeholder="Stock No" id="givStockNoC" name="givStockNoC" disabled>
					</div>
					<div class="col-md-3">
						<label>Vendor</label>
						<input type="hidden" id="givVendorIdC" />
						<input type="text" class="form-control" placeholder="Vendor" id="givVendorC" name="givVendorC" disabled>
					</div>
				</div>
				
				<div class="row voffset2" align="center">
					<button class="btn btn-primary btn-sm voffset" type="button"
						name="addSplitGiv" id="addSplitGiv">
						<i class="fa fa-plus fa-lg"></i> Add Row
					</button>
					
				</div>
				
				<div class="clearfix">&nbsp;</div>
				<div class="row" style="margin: 5px;">
				<div id="jqxgridItemDet" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
				<div id="jqxgridStone" style="font-size: 13px; font-family: Verdana;  position: relative; z-index: 1;"></div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
				<div id="jqxgridAcc" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>	
				</div>
				<div class="row text-center" id="footerSectionGiv">
					<button type="button" class="btn btn-primary btn-sm" id="saveSplitGiv" name="saveSplitGiv" style="margin-top: 10px;"><i class="fa fa-save"></i>&nbsp;Save</button>
				</div>
			</div>
			<div id="splitSentParcel" style="padding:10px;">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Create Sent Parcel</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromMovement"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>	
				</div>
				<div class="row">
					<div class="col-md-3">
						<label>Vendor</label>
						<input type="hidden" id="sentParcelVendorIdC" />
						<input type="text" class="form-control" placeholder="Vendor" id="sentParcelVendorC" name="sentParcelVendorC" disabled>
					</div>
				</div>
				<div class="row">
					<div class="col-md-2">
						<label>Courier Name</label>
						<input type="text" class="form-control" placeholder="Courier Name" id="courierNameC" name="courierNameC" disabled>
					</div>
					<div class="col-md-2">
						<label>Courier Doc No</label>
						<input type="text" class="form-control" placeholder="Courier Doc No." id="courierDocNoC" name="courierDocNoC" disabled>
					</div>
					
					<div class="col-md-2">
						<label>From Place</label>
						<input type="text" class="form-control" placeholder="From Place" id="fromPlaceC" name="fromPlaceC" disabled>
					</div>
					<div class="col-md-2">
						<label>To Place</label>
						<input type="text" class="form-control" placeholder="To Place" id="toPlaceC" name="toPlaceC" disabled>
					</div>
			
					<div class="col-md-2">
						<label>No of Parcels</label>
						<input type="text" class="form-control" placeholder="No of Parcels" id="noOfParcelsC" name="noOfParcelsC" disabled>
					</div>
					<div class="col-md-2">
						<label>Gross Wt</label>
						<input type="text" class="form-control" placeholder="Gross Wt" id="spGrossWtC" name="spGrossWtC" disabled>
					</div>
					</div>
				<div class="row">
					<div class="col-md-2">
						<label>Parcel Charges</label>
						<input type="text" class="form-control" placeholder="Parcel Charges" id="parcelChargesC" name="parcelChargesC" disabled>
					</div>
					<div class="col-md-2">
						<label>GSTIN No</label>
						<input type="text" class="form-control" placeholder="GSTIN No" id="gstinNoC" name="gstinNoC" disabled>
					</div>
			
					<div class="col-md-2">
						<label>Insurance Charges</label>
						<input type="text" class="form-control" placeholder="Insurance Charges" id="insuranceChargesC" name="insuranceChargesC" disabled>
					</div>
					<div class="col-md-2">
						<label>Insurance Value(Rs.)</label>
						<input type="text" class="form-control" placeholder="Insurance Value(Rs.)" id="insuranceValC" name="insuranceValC" disabled>
					</div>
					<div class="col-md-2">
						<label>T20/Way Bill Form Number</label>
						<input type="text" class="form-control" placeholder="T20/Way Bill Form Number" id="wayBillFormNoC" name="wayBillFormNoC" disabled>
					</div>
					<div class="col-md-2">
						<label>Courier Date</label>
						<input type="text" class="form-control" placeholder="Courier Date" id="courierDateC" name="courierDateC" disabled>
					</div>
				</div>
				<div class="row">
				<h4 style="margin-left: 15px; margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; GIV Details</h4>
					<div class="col-md-2">
						<label>GIV No</label>
						<input type="text" class="form-control" placeholder="GIV No" id="givNumbC" name="givNumbC" disabled>
					</div>
				</div>
				<div class="row">
				<h4 style="margin-left: 15px; margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; Vendor Return Details</h4>
					<div class="col-md-2">
						<label>Vendor Return Numbers</label>
						<input type="text" class="form-control" placeholder="Vendor Return Numbers" id="vrNumbC" name="vrNumbC" disabled>
					</div>
				</div>
				<div class="row text-center">
					<button type="button" class="btn btn-primary btn-sm" id="saveSplitSP" name="saveSplitSP" style="margin-top: 10px;"><i class="fa fa-save"></i>&nbsp;Save</button>
				</div>
			</div>
			<div id="splitReceiveParcel" style="padding:10px;">
			<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Create Receive Parcel</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromMovement"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>	
				</div>
				<div class="row">
					<div class="col-md-3">
						<label>Vendor</label>
						<input type="hidden" id="rcvParcelVendorIdC" />
						<input type="text" class="form-control" placeholder="Vendor" id="rcvParcelVendorC" name="rcvParcelVendorC" disabled>
					</div>
					<div class="col-md-3">
						<label>Parcel Delivery Mode</label>
						<input type="text" class="form-control" placeholder="Parcel Delivery Mode" id="parcelDelModeC" name="parcelDelModeC" disabled>
					</div>
				</div>
				<div class="row">
					<div class="col-md-3">
						<label>Material Type</label>
						<input type="hidden" class="form-control" placeholder="Material Type" id="materialTypeRcvIdC" name="materialTypeRcvIdC" disabled>
						<input type="text" class="form-control" placeholder="Material Type" id="materialTypeRcvC" name="materialTypeRcvC" disabled>
					</div>
					<div class="col-md-3">
						<label>Insured Amount</label>
						<input type="text" class="form-control" placeholder="Insured Amount" id="insuredAmtC" name="insuredAmtC" disabled>
					</div>
					<div class="col-md-3">
						<label>No of Boxes</label>
						<input type="text" class="form-control" placeholder="No of Boxes" id="noOfBoxesC" name="noOfBoxesC" disabled>
					</div>
					<div class="col-md-3">
						<label>Courier Agency Name</label>
						<input type="text" class="form-control" placeholder="Courier Agency Name" id="courierAgencyNameC" name="courierAgencyNameC" disabled>
					</div>
					<div class="col-md-3">
						<label>Courier Receipt Number</label>
						<input type="text" class="form-control" placeholder="Courier Receipt Number" id="courierRecptNoC" name="courierRecptNoC" disabled>
					</div>
					<div class="col-md-3">
						<label>Courier Charges</label>
						<input type="text" class="form-control" placeholder="Courier Charges" id="courierChargesC" name="courierChargesC" disabled>
					</div>
				
					<div class="col-md-3">
						<label>Courier Charges Borne By</label>
						<input type="text" class="form-control" placeholder="Courier Charges Borne By" id="ccBorneByC" name="ccBorneByC" disabled>
					</div>
					<div class="col-md-3">
						<label>Parcel Gross Wt</label>
						<input type="text" class="form-control" placeholder="Parcel Gross Wt" id="parcelGrsWtC" name="parcelGrsWtC" disabled>
					</div>
					<div class="col-md-3">
						<label>Parcel Received By</label>
						<input type="text" class="form-control" placeholder="Parcel Received By" id="parcelRecvByC" name="parcelRecvByC" disabled>
					</div>
					<div class="col-md-3">
						<label>Parcel Sent Through</label>
						<input type="text" class="form-control" placeholder="Parcel Sent Through" id="parcelSentThroughC" name="parcelSentThroughC" disabled>
					</div>
				</div>
				<div class="row text-center">
					<button type="button" class="btn btn-primary btn-sm" id="saveSplitRP" name="saveSplitRP" style="margin-top: 10px;"><i class="fa fa-save"></i>&nbsp;Save</button>
				</div>
			</div>
			<div id="splitGrvSection">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Goods Receipt Voucher</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromMovement"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div></div>	
					<div class="row" style="padding:5px;">
					<div class="col-md-2">
						<label>GRV No</label>
						<input type="text" class="form-control" placeholder="GRV No" id="grvNoC" name="grvNoC" disabled>
					</div>
					<div class="col-md-2">
						<label>GRV Date</label>
						<input type="text" class="form-control" placeholder="GIV Date" id="grvDateC" name="grvDateC" disabled>
					</div>
					<div class="col-md-2">
						<label>GRV Type</label>
						<input type="text" class="form-control" placeholder="GRV Type" id="grvTypeC" name="grvTypeC" disabled>
					</div>
					<div class="col-md-2">
						<label>Vendor</label>
						<input type="hidden" id="grvVendorIdC" />
						<input type="text" class="form-control" placeholder="Vendor" id="grvVendorC" name="grvVendorC" disabled>
					</div>
					<div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>Parcel Id : </label>
						<select id="grvParcelIdC" class="form-control" >
							<option value="">--Select--</option>
						</select>
					</div>
					<div class="col-md-2">
						<label>CGST Amount</label>
						<input type="text" class="form-control" placeholder="CGST Amount" id="cgstAmtC" name="cgstAmtC" disabled>
					</div>
					<div class="col-md-2">
						<label>SGST Amount</label>
						<input type="text" class="form-control" placeholder="SGST Amount" id="sgstAmtC" name="sgstAmtC" disabled>
					</div>
					<div class="col-md-2">
						<label>IGST Amount</label>
						<input type="text" class="form-control" placeholder="IGST Amount" id="igstAmtC" name="igstAmtC" disabled>
					</div>
					<div class="col-md-2">
						<label>CESS Amount</label>
						<input type="text" class="form-control" placeholder="CESS Amount" id="cessAmtC" name="cessAmtC" disabled>
					</div>
					<div class="col-md-2">
						<label>Reg/Unreg/Comp Vendors</label>
						<input type="text" class="form-control" placeholder="Reg/Unreg/Comp Vendors" id="regUnregVendC" name="regUnregVendC" disabled>
					</div>
					<div class="col-md-2" id="vendRegGstin">
						<label>GSTIN Number</label>
						<input type="text" class="form-control" placeholder="GSTIN Number" id="vendGstinNumC" name="vendGstinNumC" disabled>
					</div>
					<div class="col-md-2" id="regState">
						<label>State</label>
						<input type="hidden" id="vendStateIdC" />
						<input type="text" class="form-control" placeholder="GSTIN Number" id="vendStateC" name="vendStateC" disabled>
					</div>
					<div class="col-sm-2" id="unRegState">
						<span class="">*</span>&nbsp;<label>State: </label>
						<select id="unRegVendStateIdC" class="form-control" >
							<option value="">--Select--</option>
						</select>
					</div>
					<div class="col-md-3">
						<label>Invoice Amt Before Tax Without Other Expenses</label>
						<input type="text" class="form-control" placeholder="Invoice Amt Before Tax Without Other Expenses" id="invAmtBefTaxC" name="invAmtBefTaxC"  disabled>
					</div>
					<div class="col-md-3">
					<button class="btn btn-primary btn-sm voffset" type="button"
						name="addSplitGrv" id="addSplitGrv" style="margin-top: 20px;">
						<i class="fa fa-plus fa-lg"></i> Add Row
					</button>
					</div>
				</div>
				<div class="row">
						<div class="clearfix">&nbsp;</div>
				<div class="row" style="margin: 5px; padding:20px;">
				<div id="jqxgridGrvDet" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
				<div id="jqxgridGrvStone" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
				<div id="jqxgridGrvAcc" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>	
				</div>
				<div class="row text-center" id="footerSectionGiv">
					<button type="button" class="btn btn-primary btn-sm" id="saveSplitGrv" name="saveSplitGrv" style="margin-top: 10px;"><i class="fa fa-save"></i>&nbsp;Save</button>
				</div>
				</div>
				
				
			</div>
			<div id="splitGRSection">
				<div id="splitGRCreateSection">
				<!-- <div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Create IGR</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromMovement"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>
				</div>	 -->
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">							
						<!-- <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
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
					<!-- <div class="row" id="splitGRGrid">
						<div class="col-md-12 form-field">
							<div id="grDetailsGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;  z-index: -1"></div>
							<div class="clearfix">&nbsp;</div>	
							<div id="stoneGrid" style="font-size: 12px; font-family: Verdana; position: relative; z-index: -1"></div>
							<div class="clearfix">&nbsp;</div>	
							<div id="accGridDet" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative; z-index: -1"></div>
						</div>					
					</div> -->
					<div class="clearfix">&nbsp;</div>	
					
					<div class="row text-center">
						<button type="button" class="btn btn-primary btn-sm" id="saveSplitGR" name="saveSplitGR">
							<i class="fa fa-floppy-o fa-lg"></i>&nbsp;Save
						</button>
					</div>
				</div>
			</div>	
		<div id="splitGrSearchSection" style="padding: 25px;">
			<form class="form-horizontal" id="grFgForm1">
				<div class="heading-block" style="margin-left: -18px;">
					<h1><i class="fa fa-desktop"></i> &nbsp;IGR Process</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromIGRSearch"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>
				</div>
				<div class="mobile-responsive">
				<div id="top" class="in">
			<div class="row" style="margin-left: -30px; margin-top:15px;">
				<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 form-field">&nbsp;
					<label>Vendor</label>
					<input type="text" disabled class="form-control input-sm" name="grVendorS" id="grVendorS">
				</div>
			
				<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
					<label>Status</label>
					<input type="text" disabled class="form-control input-sm" name="grStatusS" id="grStatusS">
				</div>
				
				<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
					<label>GRV No</label>
					<input type="text" disabled class="form-control input-sm" name="grGrvNoS" id="grGrvNoS">
				</div>
				
				<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
					<label>GRV Srl No</label>
					<input type="text" disabled class="form-control input-sm" name="grGrvSlNoS" id="grGrvSlNoS">
				</div>
				
				<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" style="margin-top: 18px;">&nbsp;
					<button type="button" class="btn btn-primary btn-sm" id="searchSplitGR" name="searchSplitGR" disabled>
							<i class="fa fa-search fa-lg"></i>&nbsp;Search
					</button>
				
					<button type="button" class="btn btn-primary btn-sm" id="clearSplitGR" name="clearSplitGR" disabled>
							<i class="fa fa-times fa-lg"></i>&nbsp;Clear
					</button>
				</div>
			</div>
			<div class="row">
			  <div id="middle" style="display: none;">
				<div class="heading-block" id="accDetails"><h5><i class="fa fa-desktop" data-toggle="collapse"></i> Header	Details:</h5></div>
					<table class="table table-bordered table-condensed"	style="width: 100%;" id="grHeader">
						<thead><tr></tr></thead>
						<tbody id="grBody"></tbody>
					</table>
					
			</div>
			<div id="grDetails" style="display: none;">
				<div class="heading-block" id="accDetails"><h5><i class="fa fa-desktop" data-toggle="collapse"></i> IGR	Details:</h5></div>

				<div style="position: relative; z-index: 1" id="grDetailsgr" class="in"><div id="grProcessGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
				
				<div class="modal fade" id="grComputetally"
					data-keyboard="false" data-backdrop="static" tabindex="-1"
					role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
					style="padding-top: 2%;">
					<div class="modal-dialog modal-lg">
						<div class="modal-content"></div>
					</div>
				</div>

				<div class="modal fade" id="grAnalysis" data-keyboard="false"
					data-backdrop="static" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel" aria-hidden="true"
					style="padding-top: 2%;">
					<div class="modal-dialog modal-lg">
						<div class="modal-content"></div>
					</div>
				</div>

				<div class="row voffset2" align="center">
					<button class="btn btn-primary voffset" type="button" data-toggle="modal" data-target="#grtallyModal" id="compute" disabled>
						<i class="fa fa-floppy-o"></i> IGR to Bill Tally
					</button>
					&nbsp;

					<button class="btn btn-primary voffset" type="button"
						id="grMetalAccount" disabled>
						<i class="fa fa-file fa-lg"></i> Metal Accounting
					</button>
					&nbsp;
					
					
				</div>
			</div>
			</div>
		
		</div>
	</div></form>
			</div>
		</div>
		
		<div id="splitQCSection" style="padding:10px;">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Split QC</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromqC"
							href="javascript:showContentPage('captureUnsettingForSplit','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>	
				</div>
			<div class="clearfix">&nbsp;</div>
				
			<div class="row">
			<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
				<label>Stock No</label>
				<input type="text"  class="form-control input-sm" name="qcStockNo" id="qcStockNo" disabled>
			</div>
			<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
				<label>Vendor</label>
				<input type="hidden" disabled class="form-control input-sm" name="vendorIdQcC" id="vendorIdQcC">
				<input type="text" disabled class="form-control input-sm" name="vendorQCC" id="vendorQCC">
			</div>
			<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
				<label>GR No</label>
				<input type="text" disabled class="form-control input-sm" name="qcGrNo" id="qcGrNo">
			</div>
			<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
				<label>Count</label>
				<input type="text"  disabled class="form-control input-sm" name="qcCount" id="qcCount">
			</div>
			<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" style="margin-top: 15px;">&nbsp;
			<label></label>
				<button class="btn btn-primary voffset" type="button" id="qcSearch" disabled>
					<i class="fa fa-search fa-lg"></i> Search
				</button>
			</div>
			</div>
				
			<div class="clearfix">&nbsp;</div>
			<div class="clearfix">&nbsp;</div>
				<div class="row" style="margin: 5px;">
				<div style="position: relative; z-index: 1">
						<div id="qcItemGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>	</div>
				
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>	
					<div id="parameterDetailsGridF" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				
				<div class="row text-center" id="footerSection">
					<button type="button" class="btn btn-primary btn-sm" id="saveSplitQc" name="saveSplitQc" style="margin-top: 10px;"><i class="fa fa-save"></i>&nbsp;Save</button>
				</div>
				
			</div>
		
		
		
	
		
	</div>
	



<div class="modal fade" id="grtallyModal" data-keyboard="false"	data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
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
			
			<div class="col-md-12 mobile-responsive">
				<div class="clearfix">&nbsp;</div>
				<form class="form-horizontal" id="" action="">
					<div class="container">						
				  		<div class="panel panel-default">
					    	<div class="panel-heading">
					     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle1">GRV Details</a></h4>				      
					    	</div>
							<div id="panel1"  class="panel-collapse collapse">
								<div class="panel-body"><div id="mainMrvDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div></div>
						   	</div>
					 	</div>
	
					 	<div class="panel panel-default" id="mivDetSection">
					    	<div class="panel-heading">
					      		<h4 class="panel-title"><a class="accordion-toggle" id="toggle2">Difference Between GRV and IGR-GIV Details</a></h4>				      
					    	</div>
							<div id="panel2"  class="panel-collapse collapse">
								<div class="panel-body"><div id="mivDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div></div>
						   	</div>
					  	</div>
					  	
					  	<div class="panel panel-default" id="mrvDetSection">
					    	<div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" id="toggle3">Difference Between GRV and IGR-GRV Details</a></h4></div>
							<div id="panel3"  class="panel-collapse collapse">
								<div class="panel-body"><div id="mrvDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div></div>
						   	</div>
					  	</div>
					  	
					  	<div class="panel panel-default" id="adjDetSection">
					    	<div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" id="toggle4">Adjustment Details</a></h4></div>
							<div id="panel4"  class="panel-collapse collapse">
								<div class="panel-body"><div id="adjDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div></div>
						   	</div>
					  	</div>
					  		
					  		 
				  		<div class="panel panel-default" id="fgDetSection">
					    	<div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" id="toggle5">FG Details</a></h4></div>
							<div id="panel5"  class="panel-collapse collapse">
								<div class="panel-body"><div id="fgDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div></div>
						   	</div>
					  	</div>			
					  	
					  	<div class="panel panel-default" id="stoneDetSection">
					    	<div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" id="toggle6">Stone Details</a></h4></div>
							<div id="panel6"  class="panel-collapse collapse">
								<div class="panel-body"><div id="stoneDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div></div>
						   	</div>
					  	</div>			  
					</div>
				</form>
			</div>

			<div class="clearfix">&nbsp;</div>

			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-warning" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Close</button>
				&nbsp;
				<button name="printGRBT" id="printGRBT" type="button" class="btn btn-primary voffset"><i class="fa fa-print fa-lg"></i>&nbsp; Print</button>
			</div>
		</div>
	</div>
	
</div>

<div class="modal fade" id="grCompleteMRVProcessModal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="reset" id="closeCompute" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; IGR Complete GRV Process
				</h3>
			</div>

			<div class="modal-body">
				<div class="mobile-responsive">
				 <div class="row">
				 	<input type="hidden" id="proceedMivNo" />
				 	<input type="hidden" id="proceedMivSlNo" />
				 </div>
					<div class="container row">
						<table class="table table-bordered table-condensed" style="width: 100%;" id="grHeader">
							<thead>
								<tr>
									<td>&nbsp;</td>
									<td>GRV</td>
									<td>IGR</td>
									<td>Difference (GRV - IGR)</td>	
								</tr>
							</thead>
							<tbody id="grBody">
								<tr>
									<td>Gross Wt</td>
									<td><input type="text" id="mrvGrsWt" name="mrvGrsWt" disabled class="form-control input-sm"></td>
									<td><input type="text" id="grGrsWt" name="grGrsWt" disabled class="form-control input-sm"></td>
									<td><input type="text" id="diffGrsWt" name="diffGrsWt" disabled class="form-control input-sm"></td>
								</tr>
								<tr>
									<td>Net Wt</td>
									<td><input type="text" id="mrvNetWt" name="mrvNetWt" disabled class="form-control input-sm"></td>
									<td><input type="text" id="grNetWt" name="grNetWt" disabled class="form-control input-sm"></td>
									<td><input type="text" id="diffNetWt" name="diffNetWt" disabled class="form-control input-sm"></td>	
								</tr>
								<tr>
									<td>Pure Wt</td>
									<td><input type="text" id="mrvPureWt" name="mrvPureWt" disabled class="form-control input-sm"></td>
									<td><input type="text" id="grPureWt" name="grPureWt" disabled class="form-control input-sm"></td>
									<td><input type="text" id="diffPureWt" name="diffPureWt" disabled class="form-control input-sm"></td>	
								</tr>
							</tbody>
						</table>
						<div id="remarks" name="remarks"></div>
					</div>				
				</div>
			</div>

			<div class="modal-footer text-center">
				<button class="btn btn-primary voffset" type="button" id="grProceed"><i class="fa fa-file fa-lg"></i> Proceed</button>
				&nbsp;
				<button type="button" class="btn btn-warning" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
			</div>
		</div>	
	</div>
</div>

<div class="modal fade" id="qcParameter" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; QC Parameter Details
				</h3>
			</div>
			<form class="form-horizontal" id="qcParameterDetailFormFg" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<table class="table table-bordered">
						<thead>
							<tr>
								<th>Sl No</th>
								<th>Code</th>
								<th>Description</th>
								<th>QC-Y/N</th>
								<th>Remarks</th>
							</tr>					
						</thead>
						<tbody id="qcParameterDetailSectionFg"></tbody>
					</table>
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset" type="button"	data-dismiss="modal" name="saveQcParamDetFg" id="addQcParamDetFg"><i class="fa fa-floppy-o fa-lg"></i> &nbsp;Update</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">	<i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
			</div>
		</div>
	</div>
</div>
<!-- Capture Un-setting details view  -->

<!-- Metal Color Type Create Window Started -->

<!-- Metal Color Type Create Window Ended -->
<script src="resource/oe/assets/js/app/captureUnsettingForSplit.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/captureUnsettingGr.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/captureUnsetting.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/stoneMovementForSplit.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/accMovementForSplit.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/splitRelease.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/splitMiv.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/splitSentRecvParcel.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/splitGRCreate.js" type="text/javascript"></script>

<script src="resource/oe/assets/js/app/splitQC.js" type="text/javascript"></script>



<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>