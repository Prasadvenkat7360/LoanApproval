<!-- 
	##	Author1         : 	Raksha
	## 	Author2 	    :   Dipankar Naha
	##	Date Creation 	: 	17-04-2017
	## 	Description		:	Adjustment Voucher
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-sm-12  layout-main">
			
				<!-- DC Details  Header Started -->
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp; Material Difference Voucher</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary" data-toggle="modal"
								data-target="#createAdjusVouchr" type="button" id="create">
								<i class="fa fa-plus"></i> &nbsp;Create
						</button>
 					</div>

				</div>
				<form class="form-horizontal" id="adjustmentVoucherS" action="javascript: void(0)">
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-sm-2">
							<label> MDV From Date</label>
							<div class="input-group">
								<input type="text" readonly class="date-picker form-control dateBackground"	name="fromDate" id="fromDate" placeholder="DD/MM/YYYY">
								<label for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							</div>
						</div>
						<div class="col-sm-2">
							<label> MDV To Date</label>
							<div class="input-group">
								<input type="text" readonly class="date-picker form-control dateBackground" name="toDate" id="toDate" placeholder="DD/MM/YYYY"> <label
									for="toDate" class="input-group-addon cursor"><span	class="fa fa-calendar"></span></label>
							</div>
						</div>
						
						<div class="col-sm-2">
							<label>MDV Voucher No.</label> 
							<input type="text"	class="form-control" placeholder="MDV Voucher No." id="adjVoucherNo" name="adjVoucherNo">
						</div>
						
						<div class="col-sm-2">
							<label>MDV Metal Type</label> 
							<select id="metalType"	name="metalType" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-sm-2">
							<label>MDV Type</label> 
							<select id="adjType" name="adjType" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>Store/DC</label> 
							<select id="storeOrDc" name="storeOrDc"	class="form-control">
								<option value="" selected>--Select--</option>
								<option value="store">Store</option>
								<option value="dc">DC</option>
							</select>
						</div>
					</div>
					<div class="row">
						
						<div class="col-sm-2">
							<label>Store/DC Name</label>
							<select name="storeDcNameS"	id="storeDcNameS" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2">
							<label>MDV Location Code</label> 
							<select id="locCode" name="locCode" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-sm-2">
							<label>Vendor Code</label> 
							<input type="text"	class="form-control" placeholder="Vendor Code" id="vendorCode"	name="vendorCode"> 
							<input id="vendorCode-value" type="hidden" name="code">
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>
						&nbsp;
						<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
						&nbsp;
						<button name="export" id="export" type="button"	class="btn btn-primary btn-sm voffset"><i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export</button>

					</div>
				</form>
				<!-- Dc Master Header Started -->
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for Dc Master create and search-->
				<div id='jqxwindow'><div id="jqxgrid" style="font-size: 13px; font-family: Verdana;"></div></div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>

<div id="mySidenav" class="sidenav">
  	<div class="pull-right"><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></div>
	<jsp:include page="/WEB-INF/views/common/authorization.jsp" flush="true"></jsp:include>
</div>

<div class="modal fade" id="createAdjusVouchr" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp; Adjustment Voucher Metal - Create</h3>
				
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createAvm" action="javascript:void(0);">
				<div class="col-sm-12">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">						
						<div class="col-md-3">
							<label>MDV Date</label> 
							<input type="text" class="form-control"	 id="adjDate" name="adjDate" disabled >
						</div>
						<div class="col-md-3">
							<span class="required">*</span>&nbsp; <label>MDV Metal Type</label> 
							<select id="metalTypeC"	name="metalTypeC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-md-3">
						<span class="required">*</span>&nbsp; <label>MDV Type </label> 
							<select id="adjusTypeC"	name="adjusTypeC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div id="vendorCodeC-lov-modal" class="col-md-3">
						<span class="required">*</span>&nbsp; 	<label>Vendor Code</label> 
							<select id="vendorCodeC" name="vendorCodeC"	class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col-md-3">
							<span class="required">*</span>&nbsp;<label>MDV Credit/Debit Flag </label> 
							<select id="cdFlag"	name="cdFlag" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-md-3">
							<span class="required">*</span>&nbsp; 	<label>MDV Skin Purity </label> 
							<select id="skinPurity"	name="skinPurity" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					
						<div class="col-md-3">
							<span class="required">*</span>&nbsp;<label>MDV Remarks</label> 
							<input type="text"	class="form-control" placeholder="Remarks" id="remarks"	name="remarks">
						</div>
						<div class="col-md-3">
							<span class="required">*</span>&nbsp; <label>RM/FG</label> 
							<select id="rmfg" name="rmfg" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col-md-3">
							<label>Gross Weight</label> 
							<input type="text"	class="form-control" placeholder="Gross Wt" id="grossWt" onblur="this.value = validateNumber(this.value);"	name="grossWt">
						</div>
						<div class="col-md-3">
							<label>Net Weight</label> 
							<input type="text" class="form-control" onblur="calculatePureWt();"	placeholder="Net Wt" id="netWt" name="netWt">
						</div>
						<div class="col-md-3">
							<label>Pure Weight</label>
							<input type="text" class="form-control" placeholder="Pure Wt" onblur="this.value = validateNumber(this.value);"	id="pureWt" name="pureWt">
						</div>
						<div class="col-md-3">
							<span class="required">*</span>&nbsp; <label>Store/DC</label> 
							<select	id="storeDc" name="storeDc" class="form-control">
								<option value="" selected>--Select--</option>
								<option value="store">Store</option>
								<option value="dc">DC</option>
							</select>
						</div>
					</div>
					
					<div class="row">
						<div class="col-md-3">
							<span class="required">*</span>&nbsp; <label>Store/DC Name</label>
							<select name="storeDcNameC" id="storeDcNameC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-md-3">
							<span class="required">*</span>&nbsp; <label>MDV Location</label> 
							<select id="locationC"	name="locationC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="editgridDcMaster">
						<div id="jqxgridp"	style="font-size: 13px; font-family: Verdana; position: relative;"></div>
					</div>
				</div>

				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create DC Master Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="saveAdjVoucher" name="saveAdjVoucher"><i class="fa fa-save"></i>&nbsp;Authorize & Save</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"	id="cancel"><i class="fa fa-times"></i>&nbsp;Cancel</button>

				</div>
			</form>
		</div>
	</div>
</div>

<!-- edit adj voucher details grid-->
<div class="modal fade" id="btnEditAdjVouch" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-pencil-square-o"></i> &nbsp; <label	id="popupheaderlabel"></label>
				
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="adjVoucherE"	action="javascript:void(0);">
				<div class="col-sm-12">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">

						<div class="col-sm-3">
							<label> MDV No</label> 
							<input type="text"	class="form-control" disabled placeholder="" id="adjustmentNo" name="adjustmentNo">
						</div>

						<div class="col-sm-3">
							<label> MDV Date</label>
							<div class="input-group">
								<input type="text" class="date-picker form-control" disabled name="adjDateE" id="adjDateE" placeholder="DD/MM/YYYY">
								<label for="adjDateE" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							</div>
						</div>

						<div class="col-sm-3">
							<label>MDV Metal Type</label> 
							<input id="metalTypeE"	name="metalTypeE" class="form-control" disabled>
						</div>
						
						<div class="col-sm-3">
							<label>MDV Type </label> 
							<input id="adjusTypeE"	name="adjusTypeE" class="form-control" disabled>							
						</div>
					</div>

			

					<div class="row">
						<div class="col-sm-3">
							<span class="required">*</span>&nbsp;<label>MDV Location</label> <select id="locationE"
								name="locationE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-sm-3">
							<span class="required">*</span>&nbsp;<label>MDV Credit/Debit Flag </label> <select id="cdFlagE"
								name="cdFlagE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-sm-3">
							<span class="required">*</span>&nbsp;<label>MDV Skin Purity </label> <select id="skinPurityE"
								name="skinPurityE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-sm-3">
							<span class="required">*</span>&nbsp;<label>MDV Remarks</label> <input type="text"
								class="form-control" placeholder="Remarks" id="remarksE"
								name="remarksE">
						</div>					
					</div>

					<div class="row">
						
						<div class="col-sm-3">
							<label>RM/FG</label> 
							<input type="text" class="form-control"	disabled id="rmfgE" name="rmfgE">
						</div>
						
						<div class="col-sm-3">
							<label>Gross Weight</label> 
							<input type="text"	class="form-control" placeholder="Gross Wt" id="grossWtE" onblur="this.value = validateNumber(this.value);"	name="grossWtE">
						</div>

						<div class="col-sm-3">
							<label>Net Weight</label> 
							<input type="text" class="form-control" onblur="calculatePureWtEdit();" placeholder="Net Wt" id="netWtE" name="netWtE">
						</div>
						<div class="col-sm-3">
							<label>Pure Weight</label> 
							<input type="text" class="form-control" placeholder="Pure Wt" id="pureWtE" onblur="this.value = validateNumber(this.value);" name="pureWtE">
						</div>

					</div>
					<!-- Row 4 Started  -->
					<div class="row">
						<div class="col-sm-3">
							<label>Store/DC</label> 
							<input id="storeDcE" name="storeDcE" class="form-control" disabled>
						</div>

						<div class="col-sm-3">
							<label>Store/DC Name</label>
							<input name="storeDcNameE"	id="storeDcNameE" class="form-control" disabled>
						</div>

						<div id="vendorCodeE-lov-modal" class="col-sm-3">
							<label>Vendor Code</label> 
							<input name="vendorCodeE"	id="vendorCodeE" class="form-control" disabled>
						</div>
					</div>


				</div>

				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create Metal Accounting Location Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editAdjvoucherE"	name="editAdjvoucherE"><i class="fa fa-save"></i>&nbsp;Save</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Close</button>

				</div>
			</form>
			
		</div>

	</div>
</div>

<script src="resource/oe/assets/js/app/adjustmentVoucher.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>