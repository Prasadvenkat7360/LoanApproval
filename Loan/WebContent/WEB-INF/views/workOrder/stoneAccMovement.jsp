<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Stone Movement
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" data-toggle="modal"	data-target="#createStoneAccMovement" type="button" id="createStoneAccMovementCreate"><i class="fa fa-plus"></i> &nbsp;Create</button>
					</div>
				</div>

				<form class="form-horizontal" action="javascript: void(0)">
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Movement Type</label>
								<select	id="movementType" name="movementType" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Movement Id</label> 
								<input type="text" class="form-control"	name="movementId" placeholder="Movement Id" id="movementId" />
							</div>

							<div class="col-sm-2">
								<label>From Date</label>
								<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="fromDate" id="fromDate" placeholder="DD/MM/YYYY">
								<label for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label></div>
						   	</div>
						   	
							<div class="col-sm-2">
								<label>To Date</label>
								<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="toDate" id="toDate" placeholder="DD/MM/YYYY">
								<label for="toDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label></div>
							</div>
							<div class="col-sm-2">
								<label>Segment</label>
								<select	id="segment" name="segment" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							
							<div class="col-sm-2">
								<label>Main Category</label>
								<select	id="mainCategory" name="mainCategory" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
					
							<div class="col-sm-2" id="subCategorySection">
								<label>Sub Category</label>
								<select	id="subCategory" name="subCategory" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2" id="shapeSection">
								<label>Shape</label>
								<select	id="shape" name="shape" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							
							<div class="col-sm-2" id="claritySection">
								<label>Clarity</label>
								<select	id="clarity" name="clarity" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							
							<div class="col-sm-2" id="colorSection">
								<label>Color</label>
								<select	id="color" name="color" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							
							<div class="col-sm-2" id="cutGradeSection">
								<label>Cut Grade</label>
								<select	id="cutGrade" name="cutGrade" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
								<div class="col-sm-2">
								<label>From Wt/Cost</label>
								<select	id="fromWtCost" name="fromWtCost" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							
							<div class="col-sm-2">
								<label>To Wt/Cost</label>
								<select	id="toWtCost" name="toWtCost" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
										
							
								<div class="col-sm-2">
								<label>From</label>
								<select	id="fromStockOrder" name="fromStockOrder" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>							
							
							<div class="col-sm-2">
								<label>To</label>
								<select	id="toStockOrder" name="toStockOrder" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							
							<div class="col-xs-12">
									<br/>
									<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>
									&nbsp;
									<button id="clear" class="btn btn-warning btn-sm voffset"	type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
									&nbsp;
									<button class="btn btn-primary btn-sm voffset" type="button" name="export"	id="export"><i class="fa fa-floppy-o fa-lg"></i> Export</button>							
							</div>
						</div>					
						
				</form>
				<div class="clearfix">&nbsp;</div>
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

<!-- Stone/Acc. Movement Create Modal Pop-up -->
<div class="modal fade" id="createStoneAccMovement" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg" style="width:95%;">
		<div class="modal-content">			
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label	id="popupheaderlabel"></label>
				</h3>
			</div>
			<form class="form-horizontal" id="dcDetailsEdit" action="javascript: void(0)">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					 <div class="row">
					    <div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Movement Type</label>
							<select	id="movementTypeC" name="movementTypeC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Segment</label>
							<select	id="segmentC" onchange="showSubCatDesc();" name="segmentC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Main Category</label>
							<select	id="mainCategoryC"  onchange="showSubCatDesc();" name="mainCategoryC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2" id="shapeSectionC">
							<span class="required">*</span>&nbsp;<label>Shape</label>
							<select	id="shapeC" onchange="showSubCatDesc();" name="shapeC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2" id="claritySectionC">
							<span class="required">*</span>&nbsp;<label>Clarity</label>
							<select	id="clarityC" onchange="showSubCatDesc();" name="clarityC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2" id="colorSectionC">
							<span class="required">*</span>&nbsp;<label>Color</label>
							<select	id="colorC" onchange="showSubCatDesc();" name="colorC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>	
					
						<div class="col-sm-2" id="actualColorSectionC">
							<span class="required">*</span>&nbsp;<label>Actual Color</label>
							<select	id="actualColorC" name="actualColorC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2" id="cutGradeSectionC">
							<span class="required">*</span>&nbsp;<label>Cut Grade</label>
							<select	id="cutGradeC" onchange="showSubCatDesc();" name="cutGradeC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2" id="subCategoryDescSectionC">
							<label>Stone Sub Category</label> 
							<input type="text" class="form-control"	name="stoneSubCategoryC" disabled placeholder="Stone Sub Category" id="stoneSubCategoryC" />
						</div>
						
						<div class="col-sm-2" id="subCategorySectionC">
							<span class="required">*</span>&nbsp;<label>Sub Category</label>
							<select	id="subCategoryC" name="subCategoryC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2" id="uomSectionC">
							<label>UOM</label> 
							<input type="hidden" class="form-control"	name="uomC" disabled placeholder="UOM" id="uomC" />
						</div>
						
						<div class="col-sm-2" id="stoneCodeSectionC">
							<label>Stone Code</label> 
							<input type="hidden" class="form-control"	name="stoneCodeC" disabled placeholder="Stone Code" id="stoneCodeC" />
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>From Wt/Cost</label>
							<select	id="fromWtCostC" name="fromWtCostC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>To Wt/Cost</label>
							<select	id="toWtCostC" name="toWtCostC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>From</label>
							<select	id="fromStockOrderC" name="fromStockOrderC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Pack/Stock/Order/Loc No</label>
							<select	id="psolNoC" name="psolNoC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>		
					
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Order Sl No</label>
							<select	id="orderSlNoC" name="orderSlNoC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>Stone Sl No</label> 
							<select	id="stoneSlNoC" name="stoneSlNoC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>To</label>
							<select	id="toStockOrderC" name="toStockOrderC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Pack/Stock/Order/Loc No</label>
							<select	id="psolNoToC" name="psolNoToC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Order Sl No</label>
							<select	id="orderSlNoToC" name="orderSlNoToC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>Stone Sl No</label> 
							<select	id="stoneSlNoToC" name="stoneSlNoToC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>						
						
					
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Pcs</label> 
							<input type="text" class="form-control"	name="pcsC" placeholder="Pcs" id="pcsC" />
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Weight</label> 
							<input type="text" class="form-control"	name="weightC" placeholder="Weight" id="weightC" onblur="this.value = validateNumber(this.value);" />
						</div>
						
						<div class="col-sm-2">
							<label>Remarks</label> 
							<textarea rows="1" cols="40" class="form-control"	name="remaksC" placeholder="Remarks" id="remaksC"></textarea>
						</div>
						<div>
							<input type="hidden" id="fromWtCostValC" name="fromWtCostValC" />
						</div>
						<div>
							<input type="hidden" id="toWtCostValC" name="toWtCostValC" />
						</div>
					</div>
					
					<div class="clearfix">&nbsp;</div>
					<div id='jqxwindow'><div id="jqxgridCreate" style="font-size: 13px; font-family: Verdana;"></div></div>
					<div class="clearfix">&nbsp;</div>
					<div class="clearfix">&nbsp;</div>
				</div>
			
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">	
				<div class="row voffset2" align="center">
					<button class="btn btn-primary btn-sm voffset" type="button" name="saveC" id="saveC"><i class="fa fa-floppy-o"></i> Save</button>
					&nbsp;
					<button id="cancelC"type="reset" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Cancel</button>
				</div>
			</div>
			</form>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/stoneAccMovement.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>