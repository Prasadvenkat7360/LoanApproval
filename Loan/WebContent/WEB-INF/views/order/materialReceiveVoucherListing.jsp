<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">		

				<div id="mrvSearch">
					<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> Goods Receipt Voucher Listing</h1>
					<div class="heading-block-action">
						<button	onclick="javascript:showContentPage('materialReceiveVoucher', 'bodySwitcher')"	class="btn btn-primary btn-sm voffset" type="button" id="indentListing">
							<i class="fa fa-plus fa-lg"></i>&nbsp;Create GRV
						</button>
					</div>
					</div>
					<div id="fgGrSearch">
						<form class="form-horizontal" id="daimondCerficateEntrySearch">
								<!-- Row 1 Started  -->
								<div class="row">

							<div class="col-sm-2">
								<label>From Date </label>
								<div class="input-group">
									<input type="text" readonly class="date-picker form-control dateBackground" id="orderFromDate" placeholder="DD/MM/YYYY">
									<label	for="orderFromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>To Date </label>
								<div class="input-group">
									<input type="text" readonly  class="date-picker form-control dateBackground" id="orderToDate" placeholder="DD/MM/YYYY"> 
									<label	for="orderToDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>
							<div class="col-sm-2">
								<label>GRV Type </label> <select id="jwType"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2">
								<label>Vendor Name</label> <input type="text" id="vendorCode"
									class="form-control" placeholder="Vendor Name" /> <input
									id="vendorCode-value" type="hidden" name="code">
							</div>
							<div class="col-sm-2">
								<label>GRV No.</label> <input type="number" id="mrvNo"
									class="form-control" placeholder="GRV No." />
							</div>
							
							<div class="col-sm-2">
                                <label>GRV Done By </label>
                              		<select id="salesPerson" class="form-control">
										<option value="" selected label="--Select--" />
									</select>
                            </div>
                            </div>
								<div class="clearfix">&nbsp;</div>

								<div class="row voffset2" align="center">
									<button class="btn btn-primary btn-sm voffset" type="button" name="Search" id="Search">
										<i class="fa fa-search fa-lg"></i> Search
									</button>
								<button id="removeMatIssueDet" class="btn btn-warning btn-sm voffset" type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								</div>
						</form>
						<div class="clearfix">&nbsp;</div>
						<div id='jqxwindow'><div id="jqxgrid" style="font-size: 13px; font-family: Verdana;"></div>
						</div>
					</div>
				</div>
				<div id="mrvView">
					<div class="heading-block">
					<h1><i class="fa fa-eye fa-sm"></i> Goods Receipt Voucher - View</h1>
					<div class="heading-block-action">
						<button id="gobackL" class="btn btn-primary btn-sm voffset"	type="button" data-toggle="collapse" data-target=""><i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back</button>
						
					</div>
					</div>		
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="row" id="viewGrid">
						<div class="col-md-12 form-field" style="position: relative; z-index: 1;">
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;Finished Goods</h5>
							<div id="viewFgGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative; z-index: 1;"></div><br>
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;Raw Material</h5>
							<div id="viewRmGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div><br>	
						    <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;Stones</h5>
							<div id="viewStoneDetGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>					
							
						</div>					
					</div>
				</div>
			</form>
				</div>
				<div id="mrvEdit">
					<div class="heading-block">
						<h1><i class="fa fa-pencil-square-o"></i> Goods Receipt Voucher - Edit</h1>
						<div class="heading-block-action">
							<button id="gobackE" class="btn btn-primary btn-sm voffset" type="button" data-toggle="collapse" data-target=""><i class="fa fa-arrow-left fa-md"></i>&nbsp; Go Back</button>
						</div>
				</div>		
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" action="javascript:void(0);">
				<div class="col-md-12">
					<div class="clearfix">&nbsp;</div>
						<div class="row">&nbsp;
								<div class="col-sm-3">
									<label>Invoice Amt Before Tax Without Other Expenses</label> <input type="text" class="form-control"	placeholder="" id="invAmtE" name="invAmtE" onblur="this.value = validateNumber(this.value);">
								</div>
								<div class="col-sm-2">
									<label>CGST Amount</label> <input type="text" class="form-control"	placeholder="" id="cgstAmtE" name="cgstAmtE" onblur="this.value = validateNumber(this.value);">
								</div>
								<div class="col-sm-2">
									<label>SGST Amount</label> <input type="text" class="form-control"	placeholder="" id="sgstAmtE" name="sgstAmtE" onblur="this.value = validateNumber(this.value);">
								</div>
								<div class="col-sm-2">
									<label>IGST Amount</label> <input type="text" class="form-control"	placeholder="" id="igstAmtE" name="igstAmtE" onblur="this.value = validateNumber(this.value);">
								</div>
								<div class="col-sm-2">
									<label>CESS Amount</label> <input type="text" class="form-control"	placeholder="" id="cessAmtE" name="cessAmtE" onblur="this.value = validateNumber(this.value);">
								</div>
								<div class="col-sm-2">
									<label>GRV Type</label> <input type="hidden" class="form-control" disabled placeholder="" id="grvTypeE" name="grvTypeE">
								</div>
						</div>
						<div class="row">
						<div class="col-md-12 form-field" style="position: relative; z-index: 1;">
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;Finished Goods</h5>
							<div id="editFgGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative; z-index: 1;"></div><br>
							<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;Raw Material</h5>
							<div id="editRmGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div><br>	
						    <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;Services</h5>
							<div id="editServicesDetGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>						
						</div>					
				</div>
				<div class="modal-footer  text-center">			
				<button type="button" class="btn btn-primary btn-sm" id="updateMrvDet" data-dismiss="modal">
					<i class="fa fa-plus fa-lg"></i>&nbsp; Update
				</button>
			</div>
		</div>
	</form>
		</div>
	</div>
</div>
</div>
</div>
			

<!-- Stone Details Window Started -->

<div class="modal fade" id="addStoneDet" data-keyboard="false" data-backdrop="static" tabindex="-1"	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width: 90%;">
	<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-eye"></i> &nbsp; Stone Details View
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="addStoneDetails"	action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
						<div class="row">
							<div class="col-sm-2">
								<label>GRV Sl No</label> 
								<input type="text" disabled id="mrvSlNo" name="mrvSlNo" placeholder="GRV Sl No" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>PSR No</label> 
								<input type="text" disabled id="psrNo" name="psrNo" placeholder="PSR No" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Ref No</label> 
								<input type="text" disabled id="refNo" name="refNo" placeholder="Ref No" class="form-control" />
							</div>
							
							<div class="col-sm-2">
								<label>Ref Sl No</label> 
								<input type="text" disabled id="refSlNo" name="refSlNo" placeholder="Ref Sl No" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Party Bill No</label> 
								<input type="text" disabled id="pBillNo" name="pBillNo" placeholder="Party Bill No" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Party Bill Date</label> 
								<input type="text" disabled id="pBillDate" name="pBillDate" placeholder="Party Bill Date" class="form-control" />
							</div>
						</div>	

						<div class="row">
							<div class="col-sm-2">
								<label>Pcs</label> 
								<input type="text" disabled id="pcs" name="pcs" placeholder="Pcs" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Wastage Wt</label>
								<input type="text" disabled id="wstgWt"	name="wstgWt" placeholder="Wastage Wt" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Diamond Wt</label> 
								<input type="text" disabled id="diamondWt"	name="diamondWt" placeholder="Diamond Wt" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Metal Rate</label> 
								<input type="text" disabled id="metalRate"	name="metalRate" placeholder="Metal Rate" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Labour Charges</label> 
								<input type="text" disabled id="labrCharge"	name="labrCharge" placeholder="Labour Charges" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Remarks</label> 
								<input type="text" disabled id="remarks" name="remarks" placeholder="Remarks" class="form-control" />
							</div>
						</div>
						
						<div class="row">	
							<div class="col-sm-2">
								<label>GRV Ref Type</label> 
								<input type="text" disabled id="mrvRefType"	name="mrvRefType" placeholder="GRV Ref Type" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>GRV Ass Ref Purity</label> 
								<input type="text" disabled id="mrvRefPurity" name="mrvRefPurity" placeholder="GRV Ass Ref Purity" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>GRV Bill Amt</label> 
								<input type="text" disabled id="mrvBillAmt"	name="mrvBillAmt" placeholder="GRV Bill Amt" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>GRV PSR Bulk Flag</label> 
								<input type="text" disabled id="mrvPsrBulkFlag" name="mrvPsrBulkFlag" placeholder="GRV PSR Bulk Flag" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>GRV Con Period</label>
								<input type="text" disabled id="mrvConPeriod" name="mrvConPeriod" placeholder="GRV Con Period" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>GRV Cons Y/N</label> 
								<input type="text" disabled id="mrvConsYorN" name="mrvConsYorN" placeholder="GRV Cons Y/N" class="form-control" />
							</div>
						</div>

						<div class="row">
							<div class="col-sm-2">
								<label>Melting Purity</label> 
								<input type="text" disabled id="mPurity" name="mPurity" placeholder="Melting Purity" class="form-control" />
							</div>							
							<div class="col-sm-2">
								<label>Standard Rate</label> 
								<input type="text" disabled id="stdRate" name="stdRate" placeholder="Standard Rate" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Company Stone Pcs</label> 
								<input type="text" disabled id="compStonePcs" name="compStonePcs" placeholder="Company Stone Pcs" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Company Stone Wt</label> 
								<input type="text" disabled id="compStoneWt" name="compStoneWt" placeholder="Company Stone Wt" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Customer Stone Pcs</label> 
								<input type="text" disabled id="custStonePcs" name="custStonePcs" placeholder="Customer Stone Pcs" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Customer Stone Wt</label> 
								<input type="text" disabled id="custStoneWt" name="custStoneWt" placeholder="Customer Stone Wt" class="form-control" />
							</div>
						</div>
						
						<div class="row">
							<div class="col-sm-2">
								<label>Stone Location</label> 
								<input type="text" disabled id="stoneLoc" name="stoneLoc" placeholder="Stone Location" class="form-control" />
							</div>

							<div class="col-sm-2">
								<label>Stone Packet No</label> 
								<input type="text" disabled id="stonePctNo" name="stonePctNo" placeholder="Stone Packet No" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Stone Sl No</label> 
								<input type="text" disabled id="stoneSrlNo" name="stoneSrlNo" placeholder="Stone Sl No" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Stone Amount</label> 
								<input type="text" disabled id="stoneAmt" name="stoneAmt" placeholder="Stone Amount" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Stone Condition</label> 
								<input type="text" disabled id="stoneCondition"	name="stoneCondition" placeholder="Stone Condition" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Vendor Stone Pcs</label> 
								<input type="text" disabled id="vendStonePcs"	name="vendStonePcs" placeholder="Vendor Stone Pcs" class="form-control" />
							</div>
						</div>	

						<div class="row">
							<div class="col-sm-2">
								<label>Vendor Stone Wt</label> 
								<input type="text" disabled id="vendStoneWt" name="vendStoneWt" placeholder="Vendor Stone Wt" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Color</label> 
								<input type="text" disabled id="color"	name="color" placeholder="Color" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Clarity</label> 
								<input type="text" disabled id="clarity" name="clarity" placeholder="Clarity" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Cut Grade</label> 
								<input type="text" disabled id="cutGrade"	name="cutGrade" placeholder="Cut Grade" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Shape</label> 
								<input type="text" disabled id="shape" name="shape" placeholder="Shape" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Stone Category</label> 
								<input type="text" disabled id="stoneCat" name="stoneCat" placeholder="Stone Category" class="form-control" />
							</div>
							
						</div>

						<div class="row">							
							<div class="col-sm-2">
								<label>Weight Range</label> 
								<input type="text" disabled id="wtRange" name="wtRange" placeholder="Weight Range" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>MRV Status</label> 
								<input type="text" disabled id="mrvStatus"	name="mrvStatus" placeholder="MRV Status" class="form-control" />
							</div>
							<div class="col-sm-2">
								<label>Supplied By</label> 
								<input type="text" disabled id="suppBy" name="suppBy" placeholder="Supplied By" class="form-control" />
							</div>
							<div class="col-md-2" id="subCatHideShow">
								<label>Stone Sub Cat Desc</label>
								<textarea rows="2" cols="50" id="stoneSubCatDesc" name="stoneSubCatDesc" disabled placeholder="Sub Cat Description" class="form-control"></textarea>
							</div>
						</div>
				</div>

				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create Company Master  Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Close</button>
				</div>
			</form>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/mrv.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>