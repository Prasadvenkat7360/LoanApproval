<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> Goods Issue Voucher</h1>
					<div class="heading-block-action">
					<a class="btn btn-primary btn-sm voffset" type="button" id="backFromCreate" href="javascript:showContentPage('materialIssueVoucherListing','bodySwitcher')">
						<i class="fa fa-chevron-left"></i>&nbsp;Back
					</a>
				</div>
				</div>

				<form class="form-horizontal">
					<div class="row">
						<div class="col-sm-2">
                            <label>GIV No </label>
                            <input type="text" class="form-control" id="mivNo" disabled="disabled">
                        </div>

                        <div class="col-sm-2">
                            <label>GIV Date</label>
                            <input type="text" class="form-control" id="sysDate" disabled="disabled">
                        </div>
                        
                        <div class="col-sm-2">
                            <label>GIV Type </label>
                           	<select id="mivType" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
                        </div>                              

                        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 form-field">
                            <label>Vendor</label>									
        	 				<input id="vendorCode" class="form-control" type="text" placeholder="Vendor Name">
							<input id="vendorCode-value" type="hidden" name="code">							 									
                        </div>
                       
                        <div class="col-sm-2">
                        	<div class="pull-right">
                        		<br /><div class="pull-left"><button id="addMIV" class="btn btn-primary btn-sm" type="button"><i class="fa fa-plus-circle fa-lg"></i> Add Row</button></div> &nbsp;
                       		</div>
                        </div>
					</div>
				</form>					

				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid" style="font-size: 13px; font-family: Verdana;"></div>
				</div>

				<div class="clearfix">&nbsp;</div>
				<div class="heading-block" id = "stoneDeailsLable" style="display: none">
					<h5>
						<i class="fa fa-desktop" data-toggle="collapse" data-target="#stoneDeailsMIV"></i> Stone Details:
					</h5>
				</div>
				<div style="position: relative; z-index: 1" id="stoneDeailsMIV"  class="in">
					<div id="stonegrid" style="font-size: 13px; font-family: Verdana;"></div>
				</div>

				
				<div class="clearfix">&nbsp;</div>
				<div class="heading-block" id = "accDeailsLable" style="display: none">
					<h5>
						<i class="fa fa-desktop" data-toggle="collapse" data-target="#accDeailsMIV"></i> Accessory Details:
					</h5>
				</div>
				<div style="position: relative; z-index: 1" id="accDeailsMIV"  class="in">
					<div id="accgrid" style="font-size: 13px; font-family: Verdana;"></div>
				</div>
				<div class="clearfix">&nbsp;</div>
				
				<div class="row">
					<div class="container-fluid form-field" >
                         <div class="text-center">
                         	<button id="saveMIV" class="btn btn-primary btn-sm" type="button"><i class="fa fa-floppy-o"></i> Save GIV</button>
                         	<button class="btn btn-primary btn-sm" type="button" disabled id="mivReport" disabled><i class="fa fa-print fa-lg"></i> Print</button>
                         	<button id="clear" class="btn btn-warning btn-sm" type="button"><i class="fa fa-floppy-o"></i> Clear</button>
                         </div>
                     </div>
				</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>	

<script type="text/javascript">
var redirect = function() {
	window.location.href = "javascript:showContentPage('materialIssueVoucherListing', 'bodySwitcher')";
	return window.location.href;
}
	var rowId = 0;
	var psrList = [];
	var segmentTypeF = [];
	var segmentTypeR = [];
	var segmentTypeS = [];
	var segmentTypeA = [];
	
	var goldSkinPurity = {};
	var silverSkinPurity = {};
	var platinumSkinPurity = {};
	var stoneLocation = {};
	var stoneConditionType = {};
	var stoneType = [];
	var fgPsrType = [];
	var vend1 = [];
	var vend2 = [];
	var vend3 = [];
	var $mivType = $('#mivType');
	var d = new Date();
	var strDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();	
	
	$.getJSON('/OrderExecution/api/v1/mivLOV?page=MIV', function(data) {
		//iterate over the data and append a select option
		$.each(data.payload.mivTypes, function(key, val) {
			$mivType.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		})
		
		$('#sysDate').val(strDate);
		
		materialType = data.payload.mType;
		 vend1 = data.payload.vCodeList.NONE;
		 vend2 =  data.payload.vCodeList.DESIGNER;
		 vend3 = data.payload.vCodeList.HALLMARK;
		mivDto = data.payload.mivDTO;
		stoneType = data.payload.stoneType;
		fgPsrType = data.payload.fgPsrType;
		
		segmentTypeF = data.payload.SEGMENTS_FG;
		segmentTypeR = data.payload.SEGMENTS_RM;
		segmentTypeA = data.payload.SEGMENTS_A;
		segmentTypeS = data.payload.SEGMENTS_S;
	
		
		goldSkinPurity= data.payload.gold;
		silverSkinPurity= data.payload.silver;
		platinumSkinPurity= data.payload.platinum;
		
		stoneLocation = data.payload.location;
		stoneConditionType = data.payload.sCondition;
		
		
		$("#stoneDeailsLable").hide();
		$("#accDeailsLable").hide();
	});
	
	
	
	// Save MIV data 
	$("#saveMIV").on("click", function() {
		var mivRows = $("#jqxgrid").jqxGrid('getrows');
		for(var i = 0 ; i<mivRows.length; i++){
			if(mivRows[i].stoneAccFlag == true){
				$.growl.error({ message: "Loose Stone and Accessories should contain Stone/Acc", duration: 10000, title: 'Error' });			
				return false
			}
		}
		if(mivDetailsValidation()){	
				postJSON('/OrderExecution/api/v1/mivDetails?page=MIV', JSON
						.stringify(mivDetails()), function(data) {
					if(1 == data.resCode){					 
						$.growl.notice({ message: "Successfully created GIV No "+data.payload.mivId, duration: 10000, title: 'Success' });			
						
						$("#saveMIV").prop('disabled' ,true);
						$("#mivReport").removeAttr('disabled');
						$("#mivNo").val(data.payload.mivId);
						//redirect();
						
					}else{
						$("#mivReport").prop('disabled', true);
						$("#saveMIV").prop('disabled' ,false);
						$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
						return false;
					}
					
				});
	      }
	});
	
	var mivAddDetails = true;
	$("#addMIV").on("click", function() {
			
		var vendorCode = $('#vendorCode-value').val();
		var mivType = $('#mivType').val();
		var rowscount = $("#jqxgrid").jqxGrid('getrows');
		console.log(rowscount);
		if("" != vendorCode && "" != mivType){
			
			if(mivAddDetails){
				mivAddDetails = false;
				 $.getJSON('/OrderExecution/api/v1/psrForVendor?vendorId=' + vendorCode, function(data) {
					 psrMap = data.payload.psrList;

						 
						 $('#vendorCode').attr('disabled', true);
					 	 $('#mivType').attr('disabled', true);
					 	 
					 	
					 	mivGrid();
						$("#jqxgrid").show();
						
						$("#stoneDeailsLable").show();
						mivStoneGrid();
						$("#stonegrid").show();
						
						$("#accDeailsLable").show();
						mivAccGrid();
						$("#accgrid").show(); 
					 	 
					 	 
						 if(typeof rowscount == "undefined"){
							 	$("#jqxgrid").jqxGrid('addrow', null, generaterow(1));
							 }else{
								 var rcount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
								 $("#jqxgrid").jqxGrid('addrow', null, generaterow(rcount+1));
							 }
				
				 }); 
			 }else{
				 if(typeof rowscount == "undefined"){
				 	$("#jqxgrid").jqxGrid('addrow', null, generaterow(1));
				 }else{
					 var rcount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
					 $("#jqxgrid").jqxGrid('addrow', null, generaterow(rcount+1));
				 }
				 
			 } 
			
		}else{
			$.growl.error({ message: "GIV Type and Vendor Code is Mandatory", duration: 10000});
		}	
		
		return false;
	});
	
	var generaterow = function (i) {
        var row = {};       
		
        row["mivSrialNo"] = i;
        row["materialTypes"] ="";
    	row["materialType"] ="";
        row["vendorCode"] = $('#vendorCode-value').val();
        row["mivType"] = $('#mivType').val();
        row["stoneType"] = null;
        row["stoneTypes"] = null;
        row["psrNo"] = null;
        row["metalAccLocation"] = null;
        row["refType"] = ($('#mivType').val() == "H") ? "GRV" : null;
        row["refNo"] = null;
        row["refSerialNo"] = null;
        row["partyBillNo"] = null;
        row["partyBillDate"] = null;
        row["skinPurity"] = null;
        row["skinPuritys"] = null;
        row["pcs"] = null;
        row["grossWeight"] = null;
        row["netWeight"] = null;
        row["remarks"] = null;
        row["selectionStatus"] = true;
        rowId = rowId+1;
        return row;
    }

	
$("#mivReport").on("click", function() {
	 fieldFilters = {
	            "fieldFilters" : {
	                "manualMivNo" : $('#mivNo').val(),
	                "mode" : "pdf",
	                "reportName" : "RPT_GIV_DeliveryChallan"
	            }
	        };
	jasperReport('RPT_GIV_DeliveryChallan.pdf', fieldFilters);
		
});	
</script>
<script src="resource/oe/assets/js/app/miv.js"></script>