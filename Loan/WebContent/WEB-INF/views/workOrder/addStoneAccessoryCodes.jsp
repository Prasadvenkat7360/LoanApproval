 <!--  ##	Author1         : 	Pooja Sangve(UI)
	   ##	Date Creation 	: 	2-05-2018
	   ## 	Description		:	Addition Of Stones and Accessory Codes(Saving)
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Addition Of Stone Codes/ Accessory
					</h1>
				</div>
				<form class="form-horizontal" id="addStonesAcc">
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span> &nbsp; <label>Stone/Acc</label>
								 <select id="stoneAccId" class="form-control">
									<option value="S" selected>Stones</option>
									<option value="A">Accessory</option>
								</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span> &nbsp; <label>Order No</label> <select
									id="orderNo" name="orderNo" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span> &nbsp; <label>Order Srl No</label>
								 <select id="OrderSrlNo" name="OrderSrlNo" class="form-control">
									<option value="" selected label="Select" />
								</select>
								<input type="hidden" id="vendorId" class="form-control">
								<input type="hidden" id="segmentId" class="form-control">
								<input type="hidden" id="storeId" class="form-control">
							</div>
						</div>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="add" type="button">	<i class="fa fa-plus"></i>&nbsp;Add</button>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div id='jqxwindow'><div id="jqxgridStone" style="font-size: 13px; font-family: Verdana;"></div></div>
					    <div id='jqxwindow'><div id="jqxgridAcc" style="font-size: 13px; font-family: Verdana;"></div></div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="save" id="save"><i class="fa fa-save  fa-lg"></i> Save</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="button"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
						</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!--  ######################## Stone Model PopUp ########################## -->

<div class="modal fade" id="addStone" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Add Stone
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="addStoneDetails" action="javascript:void(0);">
				<div class="clearfix">&nbsp;</div>
					<div class="col-sm-12">
						<div class="col-sm-4">
							<span class="required">* </span> <label>Stone Supp By</label>
							<select	id="stoneSuppBy" name="stoneSuppBy" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>

						<div class="col-sm-4">
							<span class="required">* </span> <label>Stone Segment </label>
							<select	onchange="showSubCatDesc();" id="stoneSeg" name="stoneSeg"	class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-4">
							<span class="required">* </span> <label>Stone Main Category </label>
							<select onchange="showSubCatDesc();" id="stoneMainCat" name="stoneMainCat" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-4" id="stoneSubCatSection">
							<span class="required">* </span> <label>Stone Sub Category </label>
								<select id="stoneSubCat" name="stoneSubCat"	class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-4" id="stoneShapeSection">
							<span class="required">* </span> <label>Shape</label>
							<select	onchange="showSubCatDesc();" id="stoneShape" name="stoneShape" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						
						<div class="col-sm-4">
							<input type="hidden" id="stoneIdVal" />
							<label>Stone Article Code</label> 
							<input type="text" id="stoneArticleCode" name="stoneArticleCode" placeholder="Stone Article Code" disabled class="form-control" />
							<input type="hidden" id="stoneArticleId" name="stoneArticleId" class="form-control" />

						</div>

						<div class="col-sm-4" id="wtRangeSection">
							<span class="required">* </span> <label>Weight Rg</label>
							<select	onchange="showSubCatDesc();" id="wtRange" name="wtRange" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>

						<div class="col-sm-4" id="claritySection">
							<span class="required">* </span> <label>Clarity</label>
							<select onchange="showSubCatDesc();" id="clarity" name="clarity" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-4" id="actualColorSection">
							<span class="required">* </span> <label>Actual Color</label> 
							<select	id="actualColor" name="actualColor" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>

						<div class="col-sm-4" id="colorSection">
							<span class="required">* </span> <label>Color</label>
							<select onchange="showSubCatDesc();" id="color" name="color" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>

						<div class="col-sm-4" id="cutGradeSection">
							<span class="required">* </span> <label>Cut Grade</label> 
							<select onchange="showSubCatDesc();" id="cutGrade" name="cutGrade" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-4" id="uomSection">
							<label>UOM</label> 
							<input type="text" disabled id="uom" name="uom" placeholder="UOM" class="form-control" />
						</div>

						<div class="col-sm-4">
							<span class="required">* </span> 
							<label>Stone Rate</label> 
							<select id="stoneRate" name="stoneRate" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-4" id="dplStonePcsSection">
							<label>Comp Pcs</label> 
							<input type="text" id="dplStonePcs" name="dplStonePcs" placeholder="DPL Stone Pieces" class="form-control" />
						</div>

						<div class="col-sm-4" id="dplStoneWtSection">
							<label>Comp Wt</label> 
							<input type="text" id="dplStoneWt" name="dplStoneWt" placeholder="DPL Stone Wt" class="form-control" />
						</div>

						<div class="col-sm-4" id="jwStonePcsSection">
							<label>JW Pcs</label> 
							<input type="text" id="jwStonePcs" name="jwStonePcs" placeholder="JW Stone Pieces" class="form-control" />
						</div>

						<div class="col-sm-4" id="jwStoneWtSection">
							<label>JW Wt</label> 
							<input type="text" id="jwStoneWt" name="jwStoneWt" placeholder="JW Stone Weight" class="form-control" />
						</div>

						<div class="col-sm-4" id="stonePriceSection">
							<label>Comp Price</label> 
							<input type="text" id="stonePrice"	name="stonePrice" placeholder="Stone Price" disabled class="form-control" />
						</div>

						<div class="col-sm-4" id="jwPriceSection">
							<label>JW Price</label> 
							<input type="text" id="jwPrice" name="jwPrice" placeholder="Stone Price" disabled	class="form-control" />
						</div>

						<div class="col-sm-4" id="stoneCondSection">
							<label>Stone Condition</label> 
							<input type="text"	id="stoneCondition" name="stoneCondition"	placeholder="Stone Condition" class="form-control" />
						</div>


						<div class="col-sm-4" id="subCatSection">
							<label>Sub Category Desc</label> 
							<input type="hidden" id="subCatDescriptionDesc" />
							<div id="subCatDescription"></div>
						</div>

				</div>

				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create Company Master  Footer -->
				<div class="modal-footer  text-center">
					<button class="btn btn-primary btn-sm voffset" type="submit" name="saveStoneForm" id="saveStoneForm"><i class="fa fa-plus fa-lg"></i> &nbsp;Add</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
				</div>
			</form>
		</div>
	</div>
</div>

<!--################################## Accessory Details Form #################################################  -->

<div class="modal fade" id="addAcc" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Add Accessory
				</h3>
			</div>
			<form class="form-horizontal" id="addAccDetails" action="javascript:void(0);">
				<div class="col-sm-12 mobile-responsive">
						<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-sm-4">
							<span class="required">* </span> <label>Acc. Supp By</label>
							<select	id="accSupBy" name="accSupBy" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-4">
							<span class="required">* </span> <label>Acc. Main Cat </label>
							<select	id="accMainCat" name="accMainCat" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-4">
							<span class="required">* </span> <label>Acc. Sub Cat</label>
							<select	id="accSubCat" name="accSubCat" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-sm-4">
							<label>Acc. Article Code</label> 
							<input type="text" id="accArticleCode" name="accArticleCode" placeholder="Stone Article Code" disabled class="form-control" />
							<input type="hidden" id="accArticleId" name="accArticleId"	placeholder="Stone Article Code" disabled class="form-control" />
						</div>
						<div class="col-sm-4">
							<span class="required">* </span> <label>UOM</label> 
							<input type="text" id="uomAcc" name="uomAcc" placeholder="UOM"	value="Pcs" class="form-control" disabled />
						</div>
				
						<div class="col-sm-4">
							<span class="required">* </span> <label>Acc. Rate</label>
							<select	id="accRate" name="accRate" class="form-control">
								<option value="" selected label="--Select--" />
							</select> <input type="hidden" id="rateList" />
						</div>
						<div class="col-sm-4" id="jwAccPcsSection">
							<label>JW Acc. Pieces</label> 
							<input type="text" id="jwAccPcs" name="jwAccPcs" onblur="jwRateCal();"	placeholder="JW Acc. Pieces" class="form-control" />
						</div>
						<div class="col-sm-4" id="jwAccWtSection">
							<span class="required">* </span> <label>JW Acc. Weight</label> 
							<input type="text" id="jwAccWt" name="jwAccWt" onblur="jwRateCal();" placeholder="JW Acc. Weight" class="form-control" />
						</div>
						<div class="col-sm-4" id="jwAccPriceSection">
							<span class="required">* </span> <label>JW Acc. Price</label> 
							<input	type="text" id="jwAccPrice" name="jwAccPrice" disabled	placeholder="JW Acc. Price" class="form-control" />
						</div>
			
						<div class="col-sm-4" id="compAccPcsSection">
							<label>Company Acc. Pieces</label> <input type="text" id="compAccPcs" name="compAccPcs" onblur="compRateCal();"	placeholder="Company Acc. Pieces" class="form-control" />
						</div>
						<div class="col-sm-4" id="compAccWtSection">
							<label>Company Acc. Weight</label> <input type="text" id="compAccWt" name="compAccWt"	placeholder="Company Acc. Weight" disabled class="form-control" />
						</div>
						<div class="col-sm-4" id="compAccPriceSection">
							<label>Company Acc. Price</label> <input type="text" id="compAccPrice" name="compAccPrice" disabled	placeholder="Comp Acc Price" disabled class="form-control" />
						</div>
						<div class="col-sm-4" id="accConditionSection">
							<label>Acc. Condition</label> <input type="text" id="accCondition" name="accCondition"	placeholder="Acc. Condition" class="form-control" />
						</div>
					</div>
				</div>
				<div class="clearfix">&nbsp;</div>
				<div class="modal-footer  text-center">
					<button class="btn btn-primary btn-sm voffset" type="submit" name="saveAccDet" id="saveAccDet"><i class="fa fa-plus fa-lg"></i> &nbsp;Add</button>
					<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
				</div>
			</form>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/addStoneAccessoryCodes.js"></script>