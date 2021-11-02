<!-- 
	##	Author1         : 	Raksha
	## 	java   	        :   Pooja
	##	Date Creation 	: 	20-08-2018
	## 	Description		:	Adjustment Voucher Stone
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-sm-12  layout-main">
				<!-- DC Details  Header Started -->
				<div class="heading-block">
					<h1 id="searchHeaderId"><i class="fa fa-desktop"></i> &nbsp; Stone Difference Voucher - Search</h1>
					<h1 id="createHeaderId"><i class="fa fa-desktop"></i> &nbsp; Stone Difference Voucher - Create</h1>
					<h1 id="editHeaderId"><i class="fa fa-desktop"></i> &nbsp; Stone Difference Voucher - Edit</h1>
					
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm"  type="button" id="create"><i class="fa fa-plus"></i>&nbsp;Create </a>
						<a class="btn btn-primary btn-sm"  type="button" id="backToSearch"><i class="fa fa-chevron-left"></i>&nbsp;Back </a>
					</div>
				</div>
				
				<div id="sdvSearch">
				<form class="form-horizontal" id="adjustmentVoucherStoneS" action="javascript: void(0)">
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-sm-2">
							<label>SDV Type</label> 
								<select id="sdvTypeS" name="sdvTypeS" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
						  </div>
						  
						    <div class="col-sm-2">
							<label>From Date</label>
							<div class="input-group">
								<input type="text" readonly class="date-picker form-control dateBackground"	name="fromDate" id="fromDate" placeholder="DD/MM/YYYY">
								<label for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							</div></div>
						
						<div class="col-sm-2">
							<label>To Date</label>
							<div class="input-group">
								<input type="text" readonly class="date-picker form-control dateBackground" name="toDate" id="toDate" placeholder="DD/MM/YYYY"> <label
									for="toDate" class="input-group-addon cursor"><span	class="fa fa-calendar"></span></label>
							</div>
						</div>
						<div class="col-sm-2">
							<label>Segment</label> 
							<select id="segmentS" name="segmentS" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2">
							<label>Category</label> 
							<select id="catS" name="catS" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
					    <div class="col-sm-2" id="shapeSection">
							<span class="required">* </span> <label>Shape</label><select
								 id="stoneShape" name="stoneShape"
								class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						 <div class="col-sm-2" id="subCatSection">
							<span class="required">* </span> <label>Sub Category</label>
							<select id="subCat" name="subCat" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2" id="claritySection">
							<span class="required">* </span> <label>Clarity</label>
							<select  id="clarity" name="clarity" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2" id="actualColorSection">
							<span class="required">* </span> <label>Actual Color</label>
							 <select id="actualColor" name="actualColor" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2" id="colorSection">
							<span class="required">* </span> <label>Color</label> 
							<select  id="color" name="color"  class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2" id="cutGradeSection">
							<span class="required">* </span> <label>Cut Grade</label>
							<select  id="cutGrade" name="cutGrade"
								class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2" id="wtRangeSection">
							<span class="required">* </span> <label>Weight Rg</label>
							<select	 id="wtRange" name="wtRange"
								class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2" id="ctRangeSection">
							<span class="required">* </span> <label>Cost Range</label>
							<select	 id="ctRange" name="ctRange" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>Stone Code</label> 
							<select id="stoneCodeS" name="stoneCodeS" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>Type</label> 
							<select id="typeS" name="typeS" class="form-control">
								<option value="" selected label="--Select--" />
								<option value="PSR">PSR</option>
							</select>
						</div>
					
						<div class="col-sm-2">
							<label>Vendor Code</label> 
							<input type="text"	class="form-control" placeholder="Vendor Code" id="vendorCode"	name="vendorCode"> 
							<input id="vendorCode-value" type="hidden" name="code">
						</div> 	
						<div class="col-sm-2">
							<label>Stone Account Location</label>
							<select name="stoneAccountLocS"	id="stoneAccountLocS" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2">
							<label>Store/DC</label> 
							<select	id="storeDcS" name="storeDcS" class="form-control">
								<option value="" selected>--Select--</option>
								<option value="Store">Store</option>
								<option value="DC">DC</option>
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>Store/DC Name</label>
							<select name="storeDcNameCS" id="storeDcNameS" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
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
			</div>
			
			<div id="sdvCreate">
				<form class="form-horizontal" id="adjustmentVoucherStoneC" action="javascript:void(0);">
					<!-- Row 1 Started  -->
					<div class="row">						
						<div class="col-sm-2">
							<label>SDV Date</label> 
							<input type="text" class="form-control"	 id="adjDateC" name="adjDateC" disabled >
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp; <label>Store/DC</label> 
							<select	id="storeDcC" name="storeDcC" class="form-control">
								<option value="" selected>--Select--</option>
								<option value="Store">Store</option>
								<option value="DC">DC</option>
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp; <label>Store/DC Name</label>
							<select name="storeDcNameC" id="storeDcNameC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
						<span class="required">*</span>&nbsp; <label>SDV Type </label> 
							<select id="sdvTypeC"	name="sdvTypeC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp; <label>Segment</label> 
							<select id="segmentC" name="segmentC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp; <label>Category</label> 
							<select id="catC" name="catC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					    <div class="col-sm-2" id="subCatSectionC">
							<span class="required">* </span> <label>Sub Category</label>
							<select id="subCatC" name="subCatC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						 <div class="col-sm-2" id="shapeSectionC">
							<span class="required">* </span> <label>Shape</label>
							  <select  id="stoneShapeC" name="stoneShapeC" class="form-control">
								<option value="" selected label="--Select--" />
							  </select>
						</div>
						
					    <div class="col-sm-2" id="claritySectionC">
							<span class="required">* </span> <label>Clarity</label>
							<select	id="clarityC" name="clarityC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2" id="actualColorSectionC">
							<span class="required">* </span> <label>Actual Color</label> <select
								id="actualColorC" name="actualColorC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>

						<div class="col-sm-2" id="colorSectionC">
							<span class="required">* </span> <label>Color</label>
							 <select  id="colorC" name="colorC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2" id="cutGradeSectionC">
								<span class="required">* </span> <label>Cut Grade</label>
								 <select id="cutGradeC" name="cutGradeC" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
						</div>
						<div class="col-sm-2" id="wtRangeSectionC">
								<span class="required">* </span> <label>Weight Range</label>
								<select id="wtRangeC" name="wtRangeC"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
						</div>
						<div class="col-sm-2" id="ctRangeSectionC">
								<span class="required">* </span> <label>Cost Range</label><select
									 id="ctRangeC" name="ctRangeC"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Stone Code</label> 
							<select id="stoneCodeC" name="stoneCodeC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2">
							<span class="required" id="reqType">*</span><label>Type</label> 
							<select id="typeC" name="typeC" class="form-control">
								<option value="" selected label="--Select--" />
								<option value="P">PSR</option>								
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required" id="vcode">*</span>&nbsp;<label>Vendor Code</label> 
							<input type="text"	class="form-control" placeholder="Vendor Code" id="vendorCodeC"	name="vendorCodeC"> 
							<input id="vendorCodeC-value" type="hidden" name="code">
						</div> 	
					
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>SDV Credit/Debit Flag </label> 
							<select id="cdFlagC"name="cdFlagC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-sm-2">
							<label>Doc Type</label> 
							<select id="docTypeC" name="docTypeC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>Doc No</label> 
							<input type="text"	class="form-control" placeholder="Doc No." id="docNoC"	name="docNoC">
						</div>
						<div class="col-sm-2">
							<label>Doc Sl No</label> 
							<select id="docSlNoC" name="docSlNoC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Stone Account Location</label> 
							<select id="stoneAccLocC"	name="stoneAccLocC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Stone Wt</label> 
							<input type="text"	class="form-control" placeholder="Stone Wt." id="stoneWtC"	name="stoneWtC" onblur="this.value = validateNumber(this.value);">
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Stone Pcs</label> 
							<input type="text"	class="form-control" placeholder="Stone Pcs" id="stonePcsC"	name="stonePcsC">
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp; <label>UQC</label> 
							<select id="uomC" name="uomC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Voucher Value</label> 
							<input type="text"	class="form-control" placeholder="Voucher Value" id="voucherValC"name="voucherValC" onblur="this.value = validateNumbers(this.value);">
						</div>
						
						<div class="col-sm-2">
							<label>Packet Id</label> 
							<select id="pktIdC" name="pktIdC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>SDV Remarks</label> 
							<input type="text"	class="form-control" placeholder="Remarks" id="remarksC" name="remarksC">
						</div>
						<div class="col-md-4 form-field" id="subCatHideShow">
							<label>Sub Cat Desc</label>
							<textarea rows="2" cols="50" id="subCatDescpC" name="subCatDescpC" disabled placeholder="Sub Cat Description" class="form-control"></textarea>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
	
					<div class="row voffset2" align="center">
						<button type="submit" class="btn btn-primary btn-sm" id="saveAdjVoucher" name="saveAdjVoucher"><i class="fa fa-save"></i>&nbsp;Save</button>
					    <button id="clear" class="btn btn-warning btn-sm voffset" type="reset">
							<i class="fa fa-times fa-lg"></i>&nbsp; Clear
						</button>
					</div>
				</form>
			</div>
			
			<div id="sdvEdit">
				<form class="form-horizontal" id="adjustmentVoucherStoneC" action="javascript:void(0);">
					<!-- Row 1 Started  -->
					<div class="row">	
						<input type="hidden" class="form-control"	 id="isManualE" name="isManualE" disabled >
						<div class="col-sm-2">
							<label>SDV No</label> 
							<input type="text" class="form-control"	 id="adjVouchIdE" name="adjVouchIdE" disabled >
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp; <label>Store/DC</label> 
							<select	id="storeDcE" name="storeDcE" class="form-control" disabled>
								<option value="" selected>--Select--</option>
								<option value="Store">Store</option>
								<option value="DC">DC</option>
							</select>
						</div>
						
						<div class="col-sm-2">
							<input type="hidden" class="form-control"	 id="storeDcIdE" name="storeDcIdE" disabled >	
							<span class="required">*</span>&nbsp; <label>Store/DC Name</label>
							<select name="storeDcNameE" id="storeDcNameE" class="form-control" disabled>
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
						<span class="required">*</span>&nbsp; <label>SDV Type </label> 
							<select id="sdvTypeE"	name="sdvTypeE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<input type="hidden" class="form-control" id="segmIdE" name="segmIdE" disabled >	
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp; <label>Segment</label> 
							<select id="segmentE" name="segmentE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<input type="hidden" class="form-control" id="catIdE" name="catIdE" disabled >
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp; <label>Category</label> 
							<select id="catE" name="catE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>

						 <div class="col-sm-2" id="subCatSectionE">
							<span class="required">* </span> <label>Sub Category</label>
							<select id="subCatE" name="subCatE" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						 <div class="col-sm-2" id="shapeSectionE">
							<span class="required">* </span> <label>Shape</label><select
								 id="stoneShapeE" name="stoneShapeE"
								class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp; <label>Stone Code</label> 
							<select id="stoneCodeE" name="stoneCodeE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
					    <div class="col-sm-2" id="claritySectionE">
							<span class="required">* </span> <label>Clarity</label><select
								 id="clarityE" name="clarityE"
								class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-2" id="actualColorSectionE">
							<span class="required">* </span> <label>Actual Color</label> <select
								id="actualColorE" name="actualColorE" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>

						<div class="col-sm-2" id="colorSectionE">
							<span class="required">* </span> <label>Color</label> <select
								 id="colorE" name="colorE"
								class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2" id="cutGradeSectionE">
								<span class="required">* </span> <label>Cut Grade</label> <select
									 id="cutGradeE" name="cutGradeE"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
						</div>
						<div class="col-sm-2" id="wtRangeSectionE">
								<span class="required">* </span> <label>Weight Range</label><select
									 id="wtRangeE" name="wtRangeE"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
						</div>
						<div class="col-sm-2" id="ctRangeSectionE">
								<span class="required">* </span> <label>Cost Range</label>
								   <select  id="ctRangeE" name="ctRangeE" class="form-control">
									<option value="" selected label="--Select--" />
								  </select>
						</div>
						
						<div class="col-sm-2">
							<label>Type</label> 
							<select id="typeE" name="typeE" class="form-control">
								<option value="" selected label="--Select--" />
								<option value="P">PSR</option>								
							</select>
						</div>
						
						<input type="hidden" class="form-control" id="vendIdE" name="vendIdE" disabled >
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Vendor Code</label> 
							<select id="vendorCodeE"name="vendorCodeE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>

						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>SDV Credit/Debit Flag </label> 
							<select id="cdFlagE"name="cdFlagE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>Doc Type</label> 
							<select id="docTypeE" name="docTypeE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Doc No</label> 
							<input type="text"	class="form-control" placeholder="Doc No." id="docNoE"	name="docNoE">
						</div>
						<div class="col-sm-2">
							<label>Doc Sl No.</label> 
							<select id="docSlNoE" name="docSlNoE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
							
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Stone Account Location</label> 
							<select id="stoneAccLocE"	name="stoneAccLocE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Stone Wt</label> 
							<input type="text"	class="form-control" placeholder="Stone Wt." id="stoneWtE"	name="stoneWtE" onblur="this.value = validateNumber(this.value);">
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Stone Pcs</label> 
							<input type="text"	class="form-control" placeholder="Stone Pcs" id="stonePcsE"	name="stonePcsE">
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>UQC</label> 
							<select id="uomE" name="uomE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Voucher Value</label> 
							<input type="text"	class="form-control" placeholder="Voucher Value" id="voucherValE"	name="voucherValE" onblur="this.value = validateNumbers(this.value);">
						</div>
						<div class="col-sm-2">
							<label>Packet Id</label> 
							<select id="pktIdE" name="pktIdE" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>SDV Remarks</label> 
							<input type="text"	class="form-control" placeholder="Remarks" id="remarksE" name="remarksE">
						</div>
						<div class="col-md-4 form-field" id="subCatHideShowE">
							<label>Sub Cat Desc</label>
							<textarea rows="2" cols="50" id="subCatDescpE" name="subCatDescpE" disabled placeholder="Sub Cat Description" class="form-control"></textarea>
						</div>
						 
					</div>
					<div class="clearfix">&nbsp;</div>
					<div align="center">
						<button type="button" class="btn btn-primary btn-sm" id="editAdjvouchStone"	name="editAdjvouchStone"><i class="fa fa-save"></i>&nbsp;Save</button>
					</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
<div id="mySidenav" class="sidenav">
  	<div class="pull-right"><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></div>
	<jsp:include page="/WEB-INF/views/common/authorization.jsp" flush="true"></jsp:include>
</div>
<script src="resource/oe/assets/js/app/adjustmentVoucherForStones.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
	.form-control {
		height:28px;
	}
</style>