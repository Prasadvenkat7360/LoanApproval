<!-- 
	##	Author UI : MD IMRAN ALI
	## 	Author JAVA : MD IMRAN ALI
	## 	Date Creation : 16/08/2016
 -->
 
 <script type="text/javascript">
    
    $("#create_Show_Shape").hide();
	$("#create_showClarity").hide();
	$("#create_showActualColor").hide();
	$("#create_showColor").hide();
	$("#create_showCutGrade").hide();
	$("#create_VendorStoneSave").hide();

$(document).ready(function(){	
	$("#createVendorStoneGrid").hide();
	getJSON('/OrderExecution/api/v1/vendorStoneMasterLOV?page=create', function(data) {		
				
			if(data.resCode == 1){			
			
				 var $create_stoneSegment = $('#create_stoneSegment');
				 
				$.each(data.payload.mTypes, function(key, val) {
					$create_stoneSegment.append('<option value="' + val.id + '">' + val.description
							+ '</option>');
				})
				
				vendorList = data.payload.vCodeList;
				var data = [];
				$.each( vendorList, function( key, value ) {			      
						data.push({ value: value.id, label: value.name});
				});
				$(function() {		
					$("#create_vendorCode").autocomplete({		
						
						source: data,
						focus: function(event, ui) {
							
							event.preventDefault();
							$(this).val(ui.item.label);
							
						},
						select: function(event, ui) {					
							event.preventDefault();
							$(this).val(ui.item.label);					
							$("#create_vendorCode-value").val(ui.item.value);					
						}
					});
				});	
			}
			
		});
});
	
			
</script>
 

<!-- Create Stone Vendor  Master Modal Pop-up Started ##########################  -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Create Vendor Stone
				</h3>
			</div>
			<!-- Modal Create Stone Article Master Body -->
			<div class="modal-body">
				<div class="container sentParcel-Edit">
					<form 
						name="createStoneVendorMaster" id="createStoneVendorMasterForm">
						<!-- First Row Started -->
						<div class="row">
						
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Vendor</label> <input type="text"
									class="form-control" placeholder="Vendor Code/Name"
									id="create_vendorCode" name="vendorCode">
									<input id="create_vendorCode-value" type="hidden" name="code">
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Stone Segment</label> <select id="create_stoneSegment"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Stone Category</label> <select id="create_stoneCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field"  id="create_Show_Shape">
								<label>Shape</label> <select id="create_Shape"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field" id="create_Show_SubCategory">
								<label>Sub Category</label> <select id="create_subCategory"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>Code </label> <input type="text"
									class="form-control" placeholder="Code"
									id="create_stoneCode" disabled>
							</div>
						</div>
						<!-- Third Row Started -->
						<div class="row">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field" id="create_showClarity">
								<label>Clarity</label> <select id="create_clarity" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field" id="create_showColor">
								<label>Color</label> <select id="create_color" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field" id="create_showCutGrade">
								<label>Cut Grade</label> <select id="create_cutGrade"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field" id="create_showActualColor">
								<label>Actual Color</label> <select id="create_actualColor"
									class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
								<label>UOM</label> <input type="text" class="form-control"
									placeholder="UOM" id="create_UOM" disabled>
							</div>
						</div>
						<!-- Fourth Row Started -->
						<div class="clearfix">&nbsp;</div>
							<div class="row" id="createVendorStoneGrid">
							
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-12 form-field">
							<div id="jqxgridp" 
								style="font-size: 13px; font-family: Verdana; float: left;"></div>
							
							</div>
							
							</div>
							
					</form>

				</div>

			</div>
			<!-- Modal Edit Stone Article Master Footer -->
			<div class="modal-footer  text-center">
			   <button class="btn btn-primary btn-sm voffset" type="button" name="Save"
					id="create_VendorStoneSave">
					<i class="fa fa-plus"></i> &nbsp;Save
				</button>
				&nbsp;
				<button class="btn btn-primary btn-sm voffset" type="button" name="Search"
					id="create_VendorStone">
					<i class="fa fa-search fa-lg"></i> &nbsp;Search
				</button>
				&nbsp;
				<button  type="button" class="btn btn-warning btn-sm" id="create_clearAll">
					<i class="fa fa-times fa-lg"></i>&nbsp; Clear
				</button>
				&nbsp;
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>
			</div>
		
<!-- Create Stone Vendor Master Modal Pop-up Ended ##########################  -->

<script src="resource/oe/assets/js/app/CreateStoneSearch.js"></script>
<script src="resource/oe/assets/js/app/CreateVendorStone.js"></script>
<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>