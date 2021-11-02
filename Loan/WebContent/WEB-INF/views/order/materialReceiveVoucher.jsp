	<div class="main-container">
		<div class="container-fluid">
			<div class="row">
				<!-- Left Panel Started -->
				<div class="col-md-12 layout-main">
					<div class="heading-block">
						<h1><i class="fa fa-desktop"></i> Goods Receipt Voucher</h1>
						<div class="heading-block-action">
							<a class="btn btn-primary btn-sm voffset" type="button" id="backFromCreate" href="javascript:showContentPage('mrvListing','bodySwitcher')"><i class="fa fa-chevron-left"></i>&nbsp;Back</a>
						</div>
					</div>
				<fieldset id="mrvForm">
					<form class="form-horizontal">
						<div class="row">
							<div class="col-sm-2">
                                   <label>GRV No </label>
                                   <input type="text" class="form-control" id="mrvNo" disabled="disabled">
                               </div>
                               <div class="col-sm-2">
                                   <label>GRV Date</label>
                                   <input type="text" class="form-control" id="sysDate" disabled="disabled">
                               </div>
							<div class="col-sm-2">
                                   <label><span class="required">*</span>GRV Type </label>
                                  	<select id="mrvType" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
                               </div>
                               <div class="col-sm-2">
                                   <label><span class="required">*</span>Vendor</label>									
				           	 	<input id="vendorCode" class="form-control" type="text" placeholder="Vendor Name">
								<input id="vendorCode-value" type="hidden" name="code">							 									
                               </div>  
                                <div class="col-sm-2">
                                   <label><span class="required">*</span>Parcel Id </label>
                                  	<select id="parcelId" class="form-control">
										<option value="" selected label="--Select--" />
									</select>
                               </div>
						
							<div class="col-sm-2">
								<label><span class="required">*</span>CGST Amount</label> <input type="text" class="form-control"	placeholder="" id="cgstAmtC" name="cgstAmtC" onblur="this.value = validateNumber(this.value);">
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label><span class="required">*</span>SGST Amount</label> <input type="text" class="form-control"	placeholder="" id="sgstAmtC" name="sgstAmtC" onblur="this.value = validateNumber(this.value);">
							</div>
							<div class="col-sm-2">
								<label><span class="required">*</span>IGST Amount</label> <input type="text" class="form-control"	placeholder="" id="igstAmtC" name="igstAmtC" onblur="this.value = validateNumber(this.value);">
							</div>
							<div class="col-sm-2">
								<label><span class="required">*</span>CESS Amount</label> <input type="text" class="form-control"	placeholder="" id="cessAmtC" name="cessAmtC" onblur="this.value = validateNumber(this.value);">
							</div>
							<div class="col-sm-2">
								<label><span class="required">*</span> Reg/Unreg/Comp Vendors</label>
								 <select id="vendRegisteredC" name="vendRegisteredC" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div>
							<div class="col-sm-2" id="gstHide">
                                   <label><span class="required">*</span>GSTIN No</label><select id="gstinNO" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
                               </div>
                               <div class="col-sm-2" id="stateHide">
								<label><span class="required">*</span>Source State</label>
								 <select id="stateC" name="stateC" class="form-control">
									<option value="" label="--Select--" />
								</select>
							</div> 
							
                            <div class="col-sm-2" id="sourceStateHide">
                            	<input type="hidden" class="form-control"	placeholder="Source State" id="stateIdC" name="stateIdC" disabled>
								<label>Source State</label> <input type="text" class="form-control"	placeholder="Source State" id="sourceStateC" name="sourceStateC" disabled>
							</div>
							
							 <div class="col-sm-3">
								<label>Invoice Amt Before Tax Without Other Expenses</label> 
								<input type="text" class="form-control"	placeholder="" id="invAmtC" name="invAmtC" onblur="this.value = validateNumber(this.value);">
							</div>
							<div class="col-sm-1">
                                   <div class="clearfix">&nbsp;</div>
                                   <div class="pull-left"><button id="addMRV" class="btn btn-primary btn-sm" type="button"><i class="fa fa-plus-circle fa-lg"></i> Add Row</button></div> &nbsp;
                            </div>
						</div>
						
						<div class="clearfix">&nbsp;</div>
						<div  class="col-md-12 form-field" style="position: relative; z-index: 1;">
						<div id='jqxwindow'><div id="jqxgrid" style="font-size: 13px; font-family: Verdana; "></div></div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="heading-block" id = "stoneDeailsLable" style="display: none">
							<h5>
								<i class="fa fa-desktop" data-toggle="collapse" data-target="#stoneDeailsMRV"></i> Stone Details:
							</h5>
							<div class="clearfix">&nbsp;</div>
						</div>
						<div style="position: relative; z-index: 1" id="stoneDeailsMRV"  class="in">
							<div id="stonegrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
	
						
						<div class="clearfix">&nbsp;</div>
						<div class="heading-block" id = "accDeailsLable" style="display: none">
							<h5>
								<i class="fa fa-desktop" data-toggle="collapse" data-target="#accDeailsMRV"></i> Accessory Details:
							</h5>
							<div class="clearfix">&nbsp;</div>
							
						</div>
						<div style="position: relative; z-index: 1" id="accDeailsMRV"  class="in">
							<div id="accgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
						<div class="clearfix">&nbsp;</div>
					
					</form>
				</fieldset>

					
				<div class="row" id="createFooter" style="display:none;">
					<div class="container-fluid form-field" >
                        <div class="pull-right">
                        	<button id="saveMRV" class="btn btn-primary btn-sm" type="button"><i class="fa fa-floppy-o"></i> Save GRV</button>
                        	<button class="btn btn-primary btn-sm" type="button" disabled id="mrvReport" disabled><i class="fa fa-print fa-lg"></i> Print</button>
                        	<a class="btn btn-primary btn-sm voffset" type="button" href="javascript:showContentPage('mrvListing','bodySwitcher')"><i class="fa fa-chevron-left"></i>&nbsp;GRV Listing</a>
                        </div>
                    </div>
				</div>
				<div class="clearfix">&nbsp;</div>
				</div>
			</div>
		</div>
	</div>	
	


<script type="text/javascript">
	var materialType = {};
	var vendorList = {};
	var stoneType = {};
	var stoneLocation = {};
	var stoneCondition = {};
	var accCondition = {};
	var mode = null;
	var segment = {};
	var goldSkinPurity = {};
	var silverSkinPurity = {};
	var platinumSkinPurity = {};

	var rowId = 0;
	var psrList = [];
	var $mrvType = $('#mrvType');
	var $parcelId = $('#parcelId');
	var d = new Date();
	var strDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
	
	$(document).ready(function(){		  
		
		$('#saveMRV').attr('disabled', true);
		$("#stoneDeailsLable").hide();
		$("#accDeailsLable").hide();
		
	});
	
	$.getJSON('/OrderExecution/api/v1/mrvLOV?page=MRV', function(data) {
			$('#vendRegisteredC').empty().append('<option value="" selected>--Select--</option>');
				$.each(data.payload.VendorTaxTypes, function(key, val) {
				if(val.id != "C"){
					$('#vendRegisteredC').append('<option value="' + val.id + '">' + val.name + '</option>');
				}
			});
		
		//iterate over the data and append a select option
		$.each(data.payload.mrvTypes, function(key, val) {
			$mrvType.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		})
		
		var matTypeC = [];
		$('#sysDate').val(strDate);
		$.each(data.payload.mType,function(k,v){
			if(v.id != "V" ){
				matTypeC.push(v);
			}
		});
		
		materialType = matTypeC
		
		vendorList = data.payload.vCodeList;		
		mrvDto = data.payload.mrvDTO;
		
		stoneType = data.payload.stoneType[0];
		/* var removeType = "None"
		stoneType.splice($.inArray(removeType, stoneType), 1); */
		
		stoneCondition = data.payload.sCondition;
		accCondition = data.payload.aCondition;
		stoneLocation = data.payload.location;
		goldSkinPurity= data.payload.gold;
		silverSkinPurity= data.payload.silver;
		platinumSkinPurity= data.payload.platinum;
		
		segment = data.payload.sTypes;
		mode = data.payload.mode;
		
		if(null != mode && 'parcel' == mode){
			$parcelId.append('<option value="' + data.payload.parcelId + '" selected>' + data.payload.parcelId + '</option>');
			
			$("#vendorCode-value").val(data.payload.vId);
			
			$("#vendorCode").val(data.payload.vendorCode+' - '+data.payload.vendorName);
			
			$('#parcelId').attr('disabled', true);
			$('#vendorCode').attr('disabled', true);
			
		} 
		
		
		var data = [];
		$.each( vendorList, function( key, value ) {
				data.push({ value: value.id, label: value.name});
		});
		
		$(function() {
			/* $("#vendorCode").autocomplete({				
				source: data,
				focus: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select: function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#vendorCode-value").val(ui.item.value);
				}
			}); */
			$("#addMaterialVoucher").on("click", function(){
				var display = $("#vendorCode-value").val();
			});
			          
	    }); 
		
	});
	
	
	$("#addMRV").on("click", function() {
		var vendReg = $("#vendRegisteredC").val();
		var gstinNO = $("#gstinNO").val();
			if(vendReg == "" || vendReg == null){
				$.growl.error({
					message : "Please Enter the Mandatory Fields!!",
					duration : 1000,
					title :'Error'
				});
				return false;
			}
			if(vendReg == "R"){
				if(gstinNO == "" || gstinNO == null){
					$.growl.error({
						message : "Please Fill GSTIN No",
						duration : 1000,
						title :'Error'
					});
					return false;
				}
			}
			if(vendReg == "UR"){
				if($("#stateC").val() == "" || $("#stateC").val() == null){
					$.growl.error({
						message : "Please Fill Source State!!",
						duration : 1000,
						title :'Error'
					});
					return false;
				}
			}
			if($("#mrvType").val() != "S" && ($("#cgstAmtC").val() == "" || $("#sgstAmtC").val() == "" || $("#igstAmtC").val() == "" || $("#cessAmtC").val() == "")){
				 $.growl.error({
					message : "Please Fill Mandatory Fields !!!",
					duration : 1000,
					title : 'Error'
				 });
				 return false;
			 }
		var mrvdtos =  $("#jqxgrid").jqxGrid('getrows');
		console.log(mrvdtos);
		if(mrvHeaderValidation()){
			$("#createFooter").show();
			if(mrvdtos == undefined){
				postJSON('/OrderExecution/api/v1/isMRVParcelExist', JSON.stringify(addMRVDetails()), function(data) {
					if(1 == data.resCode){
						$('#vendorCode').attr('disabled', true);
						$('#mrvType').attr('disabled', true);
						$('#parcelId').attr('disabled', true);
						$('#vendRegisteredC').attr('disabled', true);
						$('#gstinNO').attr('disabled', true);
						
						$('#saveMRV').attr('disabled', false);
						
						if("S" || "DE" == $('#mrvType').val()){
							var vendorCode = $('#vendorCode-value').val(); 
							$.getJSON('/OrderExecution/api/v1/psrListForVendor?vendorId=' + vendorCode, function(data) {
								 psrList = data.payload.psrList;
								 
								 if(1 == data.resCode /* && psrList.length > 0 */){
									 mrvGrid();
									 $("#jqxgrid").show();
									 $("#stoneDeailsLable").show();
									 
									 mrvStoneGrid();
									 $("#stonegrid").show();
									
									 $("#accDeailsLable").show();
									 mrvAccGrid();
									 $("#accgrid").show();
									 
									 $("#jqxgrid").jqxGrid('addrow', null, generateMrvrow(rowId+1));
									 
								 }else {
									 $.growl.error({ message: "NO Data Found", duration: 10000});
								 }
							});
						}else{
							mrvGrid();
							$("#jqxgrid").show();
							$("#jqxgrid").jqxGrid('addrow', null, generateMrvrow(rowId+1));
							
						}
						
						
					}else{
						$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error'});
					}
				});
			}else{
				$("#jqxgrid").jqxGrid('addrow', null, generateMrvrow(rowId+1));
			}
			
			return true;
		}else{
			$.growl.error({ message: "Please fill Mandatory fields", duration: 10000, title: 'Error' });
			return false;
		}
	});
	
	function  mrvHeaderValidation (){
		
		if($('#vendorCode-value').val().length == 0){
			return false;
		}
		if($('#mrvType').val().length == 0){
			return false;
		}
		if($('#parcelId').val().length == 0){
			return false;
		}
		
		return true;
	}
	
	
	// Save MRV data 
	$("#saveMRV").on("click", function() {
		var data =  $("#jqxgrid").jqxGrid('getrows');
		var stoneData  =  $("#stonegrid").jqxGrid('getrows');		 
	
		
		if(mrvDetailsValidation()){
			
			postJSON('/OrderExecution/api/v1/mrvDetails', JSON.stringify(mrvDetails()), function(data) {
				
				if(1 == data.resCode){
					 
					$.growl.notice({ message: "Successfully created GRV No "+data.payload.mrvId, duration: 10000, title: 'Success' });
					
					$('#mrvNo').val(data.payload.mrvId);
					$('#mrvForm').attr('disabled', true);
					$('#saveMRV').attr('disabled', true);
					$('#addMRV').attr('disabled', true);
					$('#mrvReport').attr('disabled', false);
					//window.location.href="javascript:showContentPage('materialReceiveVoucher', 'bodySwitcher')";
					$("#saveMRV").prop('disabled' ,true);
					$("#mrvReport").removeAttr('disabled');
					$("#mrvNo").val(data.payload.mrvId);
					return true;
					
				}else{
					$("#mrvReport").prop('disabled', true);
					$("#saveMRV").prop('disabled' ,false);
					$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
					return false;
				}
				
			});
		}
		
	});
	
	
	
	
$("#mrvReport").on("click", function() {
	 fieldFilters = {
	            "fieldFilters" : {
	                "mrvNo" : $('#mrvNo').val(),
	                "mode" : "pdf",
	                "reportName" : "RPT_Goods_Receipt_Voucher_FSA"
	            }
	        };
	jasperReport('RPT_Goods_Receipt_Voucher_FSA.pdf', fieldFilters);
		
});

</script>
<script src="resource/oe/assets/js/app/mrv.js"></script>