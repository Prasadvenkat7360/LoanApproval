<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i>&nbsp; Bullion GRV Return
					</h1>
					<div class="heading-block-action"><a href="javascript:showContentPage('pendingIndents', 'bodySwitcher')" class="btn btn-primary btn-sm voffset" type="button" id="goBack"><i class="fa fa-arrow-left"></i>&nbsp;Go Back</a></div>
				</div>
			<fieldset id="bmrvForm">
				<form class="form-horizontal">
					<div class="mobile-responsive" style="padding:10px;">
						<div class="row">
							<div class="col-sm-2">
								<label><span class="required">*</span>BGRV No.</label>
								 <input type="text" class="form-control" name="bmrvNo" id="bmrvNo"/> 
							</div>
							<div class="col-sm-2">
								 <label>PO No.</label>
								 <input type="text" class="form-control" name="indentNo" id="indentNo"  disabled="disabled"/> 
								 <input id="bReceipt" type="hidden" name="bReceipt">	
							</div>
							<div class="col-sm-2">
								 <label>Metal Type</label>
								 <input type="text" class="form-control" name="metalType" id="metalType"  disabled="disabled"/> 
							</div>
							<div class="col-sm-2">
								 <label>Location</label>
								 <input type="text" class="form-control" name="location" id="location"  disabled="disabled"/> 
							</div>
							<div class="col-sm-2">
								<label>Ref. Type</label>
								 <input type="text" class="form-control" name="refType" id="refType"  disabled="disabled"/> 
							</div>
							<div class="col-sm-2">
								 <label>Ref. No.</label>
								 <input type="text" class="form-control" name="refNo" id="refNo"  disabled="disabled"/> 
							</div>
					</div>
					<div class="row">
							<div class="col-sm-2">
								 <label>Skin Purity</label>
								 <input type="number" class="form-control" name="skinPurity" id="skinPurity" disabled="disabled"/> 
							</div>
							
							<div class="col-sm-2">
								<label>Weight</label>
								 <input type="text" class="form-control" name="gWt" id="gWt" disabled="disabled"/> 
							</div>
						
							<div class="col-sm-2">
								<label>CGST%</label> <input type="text" id="cgstPer" placeholder="CGST%" class="form-control" disabled="disabled" />
							</div>
							
							<div class="col-sm-2">
								<label>CGST Amount</label> <input type="text" id="cgstAmount" placeholder="CGST Amount" class="form-control"  disabled="disabled"/>
							</div>
							
							<div class="col-sm-2">
								<label>SGST%</label> <input type="text" id="sgstPer" placeholder="SGST%"	class="form-control" disabled="disabled" />
							</div>
							
							<div class="col-sm-2">
								<label>SGST Amount</label> <input type="text" id="sgstAmount" placeholder="SGST Amount" class="form-control"  disabled="disabled" />
							</div>
					</div>
					<div class="row">
							<div class="col-sm-2">
								<label>IGST%</label> <input type="text" id="igstPer" placeholder="IGST%" class="form-control" disabled="disabled" />
							</div>
							
							<div class="col-sm-2">
								<label>IGST Amount</label> <input type="text" id="igstAmount" placeholder="IGST Amount" class="form-control" disabled="disabled" />
							</div>
							
							<div class="col-sm-2">
								<label>CESS%</label> <input type="text" id="cessPer" placeholder="CESS%" class="form-control" disabled="disabled" />
							</div>
							
							<div class="col-sm-2">
								<label>CESS Amount</label> <input type="text" id="cessAmount" placeholder="CESS Amount" class="form-control" disabled="disabled" />
							</div>
							
							<div class="col-sm-2">
								<label>Invoice Amount</label> <input type="text" id="invAmount" placeholder="Invoice Amount" class="form-control" disabled="disabled" />
							</div>
							
							<div class="col-sm-2">
								 <label><span class="required">*</span>Reason</label>
								 <textarea rows="1" id="reason"  class="form-control" name="reason"  style="resize: none;" maxlength="490" cols="10"></textarea>
							</div>
					</div>	
					
					
					<div id="indentDistribution">
						<div class="clearfix">&nbsp;</div>
						<div class="heading-block" id = "stoneDeailsLable">
							<h5>
								<i class="fa fa-desktop"></i> Bullion GRV Distribution Detail:
							</h5>
						</div>
						<table class="table table-bordered" style="width: 100%" id ="bidistribution">
							<thead>
								<tr>
									<td style ="background-color: #F5F5F5;">
										<label>BGRV No.</label>
									</td>
									<td  style ="background-color: #F5F5F5;">
										<label>BGRV Date </label>
									</td>
									<td  style ="background-color: #F5F5F5;">
										<label>PO No. </label>
									</td>
									<td  style ="background-color: #F5F5F5;">
										<label>Bullion Dealer Code  </label>
									</td>
									<td  style ="background-color: #F5F5F5;">
										<label>Metal Type</label>
									</td>
									<td  style ="background-color: #F5F5F5;">
										<label>Party Bill No </label>
									</td>
									<td  style ="background-color: #F5F5F5;">
										<label>Party Bill Date  </label>
									</td>
									<td  style ="background-color: #F5F5F5;">
										<label>Purity </label>
									</td>
									<td  style ="background-color: #F5F5F5;">
										<label>Party Bill Wt. </label>
									</td>
									<td  style ="background-color: #F5F5F5;">
										<label>UOM </label>
									</td>
									<td  style ="background-color: #F5F5F5;">
										<label>Metal Rate  </label>
									</td>
									<td  style ="background-color: #F5F5F5;">
										<label>Metal Value  </label>
									</td>
								</tr>
							</thead>
							<tbody id="bullionMRVBody">
							
							</tbody>
							
						</table>
					</div>	
					
					<div id="indentMIVDistribution">
						<div class="clearfix">&nbsp;</div>
						<div class="heading-block" id = "stoneDeailsLable">
							<h5>
								<i class="fa fa-desktop"></i> Bullion MIV Distribution Detail:
							</h5>
						</div>
						<table class="table table-bordered" style="width: 45%" id ="bidistribution">
							<thead>
								<tr>
									<td  width="33%" style ="background-color: #F5F5F5;">
										<label>Bullion MIV No.</label>
									</td>
									<td  width="33%" style ="background-color: #F5F5F5;">
										<label>PO Weight In Gms </label>
									</td>
									<td  width="34%" style ="background-color: #F5F5F5;">
										<label>JW Code</label>
									</td>
								</tr>
							</thead>
							<tbody id="bullionMIVBody">
							
							</tbody>
							
						</table>
					</div>	
					 
					</div>
							
				</form>
				</fieldset>
				<div class="modal-footer  text-center">
					<button id="returnBMRV" class="btn btn-primary btn-sm" type="button" disabled><i class="fa fa-floppy-o"></i>&nbsp;Return</button>					
					<button type="button" class="btn btn-warning btn-sm" id="clear"><i class="fa fa-times"></i>&nbsp;Clear	</button>					
										
				</div>
				
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1"><div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
				<div class="clearfix">&nbsp;</div>			
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="confirm" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 10%;">
    <div class="modal-dialog modal-sm">
        <div class="modal-content" id="staticContent">
			<div class="modal-body text-center">
		    Are you sure you want to return it back.
		  </div>
		  <div class="modal-footer">
		    <button type="button" data-dismiss="modal" class="btn btn-primary" id="okProceed">Ok</button>
		    <button type="button" data-dismiss="modal" class="btn" id="cancel">Cancel</button>
		  </div>
        </div>
    </div>
</div>

<script type="text/javascript">
	
	
	$('#bmrvPrint').hide();
	var bmrv = {};
	var indent = {};
	$('#indentDistribution').hide();
	$('#indentMIVDistribution').hide();
	
	$("#bmrvNo").on("change", function() {
		
		if( $('#bmrvNo').val().length > 0){
		
			$.getJSON('/OrderExecution/api/v1/bMRVDetailsById?bmrvId='+$('#bmrvNo').val(), function(data) {
				
			 	 if(1 == data.resCode){
					
			 		bmrv = data.payload.mrvDetails;
			 		
			 		indent = data.payload.bReceipt;
			 		
			 		$('#indentNo').val(indent.indent.id);
			 		$('#metalType').val(bmrv.metalType.description);
			 		$('#location').val(bmrv.locationCode);
			 		$('#refType').val(bmrv.referenceType);
			 		$('#refNo').val(bmrv.refNo);
			 		$('#skinPurity').val(bmrv.skinPurity);
	
			 		$('#gWt').val(bmrv.grossWeight);
			 		$('#nWt').val(bmrv.netWeight);
			 		$('#bReceipt').val(indent.id);
			 		
			 		$('#cgstPer').val(indent.cgstPerc);
			 		$('#cgstAmount').val(indent.cgstAmnt);
			 		$('#sgstPer').val(indent.sgstPerc);
			 		$('#sgstAmount').val(indent.sgstAmnt);
			 		$('#igstPer').val(indent.igstPerc);
			 		$('#igstAmount').val(indent.igstAmnt);
			 		$('#cessPer').val(indent.cessPerc);
			 		$('#cessAmount').val(indent.cessAmnt);
			 		$('#invAmount').val(indent.invoiceAmnt);
			 		
			 		
			 		$("#bullionMRVBody").empty();
					$("#bullionMIVBody").empty();
					
			 		$('#bullionMRVBody').append('<tr> <td>' + $('#bmrvNo').val() + '</td><td>'+bmrv.creationDate+'</td><td>'+indent.indent.id+'</td><td>' +indent.indent.bullionDealer.vendorCode+" - "+
			 				indent.indent.bullionDealer.vendorName+'</td><td>'+bmrv.segment.description+'</td><td>'+bmrv.billNumber+'</td><td>'+bmrv.partyBillDate+'</td><td>'+
			 				bmrv.skinPurity+'</td><td>'+bmrv.grossWeight+'</td><td>'+indent.uom+'</td><td>'+indent.metalRate+'</td><td>'+indent.metalValue+'</td></tr>');
			 		$('#indentDistribution').show();
			 		if(data.payload.mivDetails.length>0){
						$('#indentMIVDistribution').show();
						$.each(data.payload.mivDetails, function(key, val) {
							$('#bullionMIVBody').append('<tr> <td>' + val.mivHeader.id + '</td><td>'+val.grossWeight+'</td><td>'+val.mivHeader.vendor.vendorCode+" - "+val.mivHeader.vendor.vendorName+'</td></tr>');
						
						})
					}
			 		$('#bmrvNo').attr('disabled', true);
			 		$('#returnBMRV').attr('disabled', false);
					return true;
					
				}else{
					$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
					return false;
				} 
			});
		}
	});
	
		
	$("#clear").on("click", function() {
		$('#bmrvNo').attr('disabled', false);
		$('#returnBMRV').attr('disabled', true);
		$('#bmrvNo').val(null);
		$('#indentNo').val(null);
 		$('#metalType').val(null);
 		$('#location').val(null);
 		$('#refType').val(null);
 		$('#refNo').val(null);
 		$('#skinPurity').val(null);
 		$('#bReceipt').val(null);
 		

 		$('#gWt').val(null);
 		$('#nWt').val(null);
		
 		$('#indentDistribution').hide();
 		$('#indentMIVDistribution').hide();
		
		
	});
	
	$('#returnBMRV').on('click', function(e){
	 
	    e.preventDefault();
	    if(validateBMRVReturn()){
	    	$('#confirm').modal({ backdrop: 'static', keyboard: false })
	       $("#okProceed").on('click', function (e) {
	        	postJSON('/OrderExecution/api/v1/returnBMRV', JSON
	    				.stringify(bullionMRVDetails()), function(data) {
	    				if(1 == data.resCode){
	    					if(data.mesgStr.length > 0) {
	    						$.growl.warning({ message: data.mesgStr, duration: 10000, title: 'warning' });
	    					}
	    					$.growl.notice({ message: "Successfully created Bullion MRV Return: " + data.payload.returnBMRVId, duration: 10000, title: 'Success' });
	    					
	    					$('#bmrvForm').attr('disabled', 'disabled');
	    					$('#bMRVNo').val(data.payload.bRId);
	    					
	    					$('#returnBMRV').hide();
	    					$('#clear').hide();
	    					$('#bmrvPrint').show();
	    					
	    					return true;
	    					
	    				}else{
	    					$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
	    					return false;
	    				}
	    				
	    			});
	        });
	    }else{
		   // $.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
		   $.growl.error({ message: "Please enter reason for return", duration: 10000});
			return false;
	    }
	});
	       
/* 	$("#returnBMRV").on("click", function() {
		if(validateBMRVReturn()){
			
		if(confirm("Are you sure you want return it back.") == true){	
			postJSON('/OrderExecution/api/v1/returnBMRV', JSON
				.stringify(bullionMRVDetails()), function(data) {
				
				if(1 == data.resCode){
					if(data.mesgStr.length > 0) {
						$.growl.warning({ message: data.mesgStr, duration: 10000, title: 'warning' });
					}
					$.growl.notice({ message: "Successfully created Bullion MRV Return: " + data.payload.returnBMRVId, duration: 10000, title: 'Success' });
					
					$('#bmrvForm').attr('disabled', 'disabled');
					$('#bMRVNo').val(data.payload.bRId);
					
					$('#returnBMRV').hide();
					$('#clear').hide();
					$('#bmrvPrint').show();
					
					return true;
					
				}else{
					$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
					return false;
				}
				
			});
		 }	
		}else{
			$.growl.error({ message: "Please enter reason for return", duration: 10000});
		}
	}); */

function confirmation() {
    var x;
    if (confirm("Are you sure you want to return it back.") == true) {
        x = "You pressed OK!";
    } else {
        x = "You pressed Cancel!";
    }
}
function validateBMRVReturn(){
	if($('#reason').val().length == 0 || $('#bmrvNo').val().length == 0){
		return false;
	}
	
	return true;
}
	
function bullionMRVDetails() {
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	fieldFilters.fieldFilters["bmrv"] = $('#bmrvNo').val();
	fieldFilters.fieldFilters["bReceipt"] = $('#bReceipt').val();
	fieldFilters.fieldFilters["reason"] = $('#reason').val();

	return fieldFilters;
}

$('#bmrvPrint').on('click', function(){
	 fieldFilters = {
	            "fieldFilters" : {
	                "BmrvNo" : $('#bmrvNo').val(),
	                "mode" : "pdf",
	                "reportName" : "RPT_Bullion_MIV_Return"
	            }
	        };
	jasperReport('RPT_Bullion_MIV_Return.pdf', fieldFilters); 
		
		
});	

var fieldFilterValue = function(){
	
	fieldFilters = {"fieldFilters" : {}};

	var bmrvNo = $('#bmrvNo').val();
	var indentNo = $('#indentNo').val();
	var partyBillDate = $('#partyBillDate').val();
	var partyBillNo = $('#partyBillNo').val();
	var indentPONo = $('#indentPONo').val();
	var metalSegment = $('#metalSegment').val();
	var status = $('#status').val();
	var bullionDealer = $('#bullionDealer').val();
	var poReceiptNo = $('#poReceiptNo').val();
	

	if (bmrvNo != "" && bmrvNo != null) {	fieldFilters.fieldFilters["bmrvNo"] = bmrvNo;}
	if (indentNo != "" && indentNo != null) {	fieldFilters.fieldFilters["indentNo"] = indentNo;}
	
	return fieldFilters;
}

$("#search").on('click', function(){
	
	bullionMRVReturnSearchGrid();
	$("#jqxgrid").show();
});
	
</script>

<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>