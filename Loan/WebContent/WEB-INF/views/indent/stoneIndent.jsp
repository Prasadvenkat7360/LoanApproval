<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i>&nbsp;Create Stone PO
					</h1>
				</div>
				<fieldset id="indentForm">
				<form class="form-horizontal">
					<div class="mobile-responsive">
						<div class="row">
						
							<div class="col-sm-2">
								<label>Stone PO No</label>
								 <input type="text" class="form-control" name="status" id="indentNo"  disabled="disabled"/> 
							</div>							
                           	
							<div class="col-sm-2">
                                 <label><span class="required">*</span> Stone Dealer Code</label>
                                 <select id="bDealerCode" class="form-control">
									<option value="" selected label="--Select--" />
								 </select>
									
                             </div>
							<div class="col-sm-2">
                                  <label><span class="required">*</span>Stone Segment</label>
                                 	<select id="metalSegment" class="form-control">
										<option value="" selected label="--Select--" />
									</select>
                             </div>
                             
                             <input type="hidden" id="hsnFlag" value="1" />                   
							
							
						</div>                         
						
				</div>
             <div class="col-xs-12 col-sm-4 col-md-4 col-lg-2 form-field">
                                    <div class="clearfix">&nbsp;</div>
                                    <div class="pull-left"><button id="addstoneIndent" data-toggle="modal" data-target="#stoneSearchPO"  class="btn btn-primary btn-sm" type="button"><i class="fa fa-plus-circle fa-lg"></i> Add Row</button></div> &nbsp;
                                </div>
			
			
			
							<div id="createStoneIndentGrid" style="font-size: 13px; font-family: Verdana; float: left; position: relative; z-index: 1;"></div>
					
				</form>
				</fieldset>
				<div class="clearfix">&nbsp;</div>				
				<div align="center">
				<button class="btn btn-primary voffset btn-sm" type="button" name="Print"
					id="print">
					<i class="fa fa-print"></i> Print
				</button>
				
				<a href="javascript:showContentPage('stonePendingIndents', 'bodySwitcher')" class="btn btn-primary btn-sm voffset" type="button" id="indentListing"> <i class="fa fa-list"></i>&nbsp;Stone PO listing</a>
				</div>
				<div class="mobile-responsive" >
				
						<div class="row">
							<div class="container form-field" >
                                    <div class="pull-right">
                                    	<button id="saveIndent" class="btn btn-primary btn-sm" type="button"><i class="fa fa-floppy-o"></i> Save PO</button>
                                    	
                                    </div>
                                </div>
						</div>
					</div>
						
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="stoneSearchPO" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
	<button type="reset" id="closeSearch" class="close"
		data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
		<i class="fa fa-pencil-square-o"></i> &nbsp; Stone Search
	</h3>
</div>
<!-- Modal Body -->
<div class="modal-body">
	<div class="container">
		<form class="form-horizontal" autocomplete="off" role="form" name="manageStoneForm" id="manageStoneForm" onsubmit="return false;">
			<input type="hidden" id="forSegment" value='<c:out value="${forSeg.id}" />' />
			<div class="modal-body">
				<div class="row">
					<div class="col-md-6">
						<input type="hidden" id="suppBy" />
						<div class="form-group">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Segment : </label>
							<div class="col-md-8">
								<select name="segment" id="segment"	class="form-control selecter" required>
									<option value="">-- Select Option --</option>								
								</select> <input type="hidden" id="segmentCode" />
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Main Cat : </label>
							<div class="col-md-8">
								<select id="mainCategory" name="mainCategory"
									class="form-control selecter" required>
									<option value="">-- Select Option --</option>
								</select> <input type="hidden" id="mainCatCode" />
							</div>
						</div>

						<div class="form-group" id="showShape" style="display: none">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Shape : </label>
							<div class="col-md-8">
								<select id="shape" name="shape" class="form-control selecter"
									required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>

						<div class="form-group" id="showSubCategory">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Sub Cat : </label>
							<div class="col-md-8">
								<select id="subCategory" name="subCategory"
									class="form-control selecter" required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label"> Code : </label>
							<div class="col-md-8">
								<input type="text" class="form-control" name="stoneCode"
									id="stoneCode" readonly required>
							</div>
						</div>

						<div class="form-group" id="showWeightRange">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Weight Range : </label>
							<div class="col-md-8">
								<select name="weightRange" id="weightRange"
									class="form-control selecter" required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>

						<div class="form-group" id="showClarity">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Clarity : </label>
							<div class="col-md-8">
								<select name="clarity" id="clarity"
									class="form-control selecter" required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>

						<div class="form-group" id="showActualColor">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Actual Color : </label>
							<div class="col-md-8">
								<select name="actualColor" id="actualColor"
									class="form-control selecter" required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group" id="showColor">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Color : </label>
							<div class="col-md-8">
								<select name="color" id="color" class="form-control selecter"
									required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>

						<div class="form-group" id="showCutGrade">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Cut Grade : </label>
							<div class="col-md-8">
								<select name="cutGrade" id="cutGrade"
									class="form-control selecter" required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label">UQC : </label>
							<div class="col-md-8">
								<input type="text" class="form-control" name="uom" id="uom"
									readonly>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label">SubCategory Desc: </label>
							<div class="col-md-8">
								<input type="text" class="form-control" name="subCategoryDesc" id="subCategoryDesc" readonly>
							</div>
						</div>
						<div class="form-group" id="hsnDiv">
							<label class="col-md-4 control-label">HSN Code: </label>
							<div class="col-md-8">
								<input type="text" class="form-control" disabled name="hsnCode" id="hsnCode" required>
								<input type="hidden" class="form-control" disabled name="hsnId" id="hsnId" required>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="submit" id="selectStone" class="btn btn-primary btn-sm"
					data-dismiss="modal">
					<i class="fa fa-check fa-lg"></i>&nbsp;Select
				</button>
				<button type="button" id="clear" class="btn btn-warning btn-sm">
					<i class="fa fa-times"></i>&nbsp;Clear
				</button>
			</div>
		</form>
	</div>
	<!-- Modal Window Form End -->
</div>
		
		</div>
	</div>
</div>
<script type="text/javascript">


$(document).ready(function(){	  

	
	getJSON('/OrderExecution/api/v1/stoneIndentLOV?page=bullion', function(data) {		
			 var $metalSegment = $('#metalSegment');	
				var $bDealerCode = $('#bDealerCode');
			if(data.resCode == 1){			
				
				
				$.each(data.payload.mTypes, function(key, val) {
					
					$metalSegment.append('<option value="' + val.id + '">' + val.description
							+ '</option>');
				})			
				
				
				$.each(data.payload.bDealers, function(key, val) {
					$bDealerCode.append('<option value="' + val.id + '">' + val.name
							+ '</option>');
				})
			
			}
			
		});
});
	
	var creationrowId = 0;
	$('#saveIndent').hide();
	$('#print').hide();
	$('#indentListing').hide();
	$('#addstoneIndent').hide();
	$("#metalSegment").prop("disabled", true);
	
	$( "#print" ).click(function() {
		var segment=$("#metalSegment :selected").text();
		  var StoneIndentNo=$( "#indentNo" ).val();
		  if(StoneIndentNo!=null && segment=="Diamond")
			  {
		  fieldFilters = {
		            "fieldFilters" : {
		                "stoneIndentNo" : StoneIndentNo,
		                "mode" : "pdf",
		                "reportName" : "RPT_Stone_Diamond_Indent"
		            }
		        };
			jasperReport('RPT_Stone_Diamond_Indent.pdf', fieldFilters); 
			  }
		  else if(StoneIndentNo!=null && segment=="Other Stones")
			  {
			  fieldFilters = {
			            "fieldFilters" : {
			                "stoneIndentNo" : StoneIndentNo,
			                "mode" : "pdf",
			                "reportName" : "RPT_Stone_Oth_Pre_Indent"
			            }
			        };
				jasperReport('RPT_Other_Stone_Purchase_Order.pdf', fieldFilters); 
			  }
		  else if(StoneIndentNo!=null && segment=="Precious Stones")
		  {
			  fieldFilters = {
			            "fieldFilters" : {
			                "stoneIndentNo" : StoneIndentNo,
			                "mode" : "pdf",
			                "reportName" : "RPT_Stone_Oth_Pre_Indent"
			            }
			        };
				jasperReport('RPT_Precious_Stone_Purchase_Order.pdf', fieldFilters); 
		  }
		});
		
</script>

<script src="resource/oe/assets/js/app/stoneIndent.js"></script>	