rows<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i>&nbsp; Create Stone PO GRV
					</h1>
				</div>
				<fieldset id="bmrvForm">
					<form class="form-horizontal" id="stoneIndentMRV">
						<div class="mobile-responsive" style="padding: 10px;">
							<div class="row">
									<div class="col-sm-2">
										<label>GRV No.</label> <input type="number"
											class="form-control" name="stoneMRV" id="stoneMrv"
											disabled="disabled" />
									</div>
									<div class="col-sm-2">
										<label>GRV Date</label> <input type="text"
											class="form-control" name="stoneMRVDate" id="stoneMrvDate"
											disabled="disabled" />
									</div>
									<div class="col-sm-2">
										<label><span class="required">*</span>GRV Type</label> 
											<select id="mrvTypee" class="form-control">
												<option value="" selected label="--Select--" />
												<option value="D">Dealer</option>										
												<option value="C">Consignment</option>										
											</select>
									</div>
									<div class="col-sm-2">
										<label>Stone Segment</label> <input type="text" class="form-control"
											name="segment" id="segment" disabled="disabled"
											value="${indentData.segment.description}" />
									</div>
									<div class="col-sm-2">
										<label>Vendor Code</label> 
											<input type="text"
											class="form-control" name="vendorCode" id="vendorCode"
											disabled="disabled" value="${indentData.vendor.vendorCode}" />
											<input type="hidden"
											class="form-control" name="vendorId" id="vendorId"
											disabled="disabled" value="${indentData.vendor.id}" />
									</div>
									<div class="col-sm-2">
										<label>Vendor Name</label> <input type="text"
											class="form-control" name="vendorName" id="vendorName"
											disabled="disabled" value="${indentData.vendor.vendorName}" />
											
											<input type="hidden"
											class="form-control" name="isRegister" id="isRegister"
											disabled="disabled" value="${indentData.vendor.isRegister}" />
									</div>
								</div>
								<div class="row">
									<div class="col-sm-2">
										<label>Stone PO No</label> <input type="text"
											class="form-control" name="indentNo" id="indentNo"
											disabled="disabled" value="${indentData.id}" />
									</div>
									<div class="col-sm-2">
										<label>Stone PO Date</label> <input type="text"
											class="form-control" name="indentDate" id="indentDate"
											value="<fmt:formatDate pattern='dd-MM-yyyy'
                         								value='${indentData.createdDate}' />"
											disabled="disabled" />
									</div>
									<div class="col-sm-2">
										<label><span class="required">*</span>Vendor Invoice No.</label> <input
											type="text" class="form-control" name="partyBillNo"
											id="partyBillNo" maxlength="40" />
									</div>
									<div class="col-sm-2">
										<label><span class="required">*</span>Vendor Invoice Date</label>
										<div class="input-group">
											<input type="text" class="date-picker form-control"
												id="billDate" placeholder="DD/MM/YYYY"> <label
												for="billDate" class="input-group-addon cursor">
												<span class="fa fa-calendar"></span>
											</label>
										</div>
									</div>
									<div class="col-sm-2">
										<label><span class="required">*</span>Parcel ID</label> 
										<select id="parcelId" class="form-control">
										<option value="" selected label="--Select--" />
											<c:forEach var="parcel" items="${parcelList}">
												<option value="${parcel.parcelId}">${parcel.parcelId}</option>										
											</c:forEach>
										</select>
									</div>
									<div class="col-sm-2" id="gstihide">
										<label><span class="required">*</span>GSTIN No</label> 
										<select id="gstinNo" class="form-control">
											<option value="" selected label="--Select--" />
										</select>
									</div>
									<div class="col-sm-2" id="StateSrchide">
										<label><span class="required">*</span>Source State</label> 
										<select id="srcStateGst" class="form-control">
											<option value="" selected label="--Select--" />
										</select>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-2">
										<label>Commission</label> <input 
											type="text" class="form-control" name="commission" onblur="calInvValue();"	id="commission" />
									</div>
									<div class="col-sm-2">
										<label>Courier Charges</label>
										<input type="text" class="form-control" id="courierCharges" onblur="calInvValue();"  />
									</div>
									<div class="col-sm-2">
										<label>Insurance</label> 
										<input type="text" class="date-picker form-control" id="insurance" onblur="calInvValue();">
									</div>

									<div class="col-sm-2">
										<label> Other/Certificate Charges</label> 
										<input type="text"  onblur="calInvValue();" class="form-control" name="others" id="others" />
									</div>
									<div class="col-sm-2">
										<label>Invoice Value</label> 
										<input type="text" class="form-control" name="invoice" id="invoice"  disabled="disabled" />
									</div>
									<div class="col-sm-2" id="stateHide">
										<label>Source State</label> 
										<input type="text" class="form-control" name="srcState" id="srcState"  disabled="disabled" />
										<input type="hidden" class="form-control" name="srcStateId" id="srcStateId"  disabled="disabled" />
									</div>
								</div>
							<div id="indentDistribution">
								<div class="clearfix">&nbsp;</div>
								<div class="heading-block" id="stoneDeailsLable">
									<h5>
										<i class="fa fa-desktop"></i> Material Receipt Voucher(Diamond/Stone):
									</h5>
								</div>
								<!-- JqGrid Started -->
								<div style="position: relative; z-index: 1">
									<div id="jqxgrid"
										style="font-size: 13px; font-family: Verdana; float: left;"></div>
								</div>
								<!-- JqGrid Ended -->
							</div>
						</div>
					</form>
				</fieldset>
				<div class="modal-footer  text-center">
					<button id="saveMRV" class="btn btn-primary btn-sm" type="button">
						<i class="fa fa-floppy-o"></i>&nbsp;Create
					</button>
					<a
						href="javascript:showContentPage('stonePendingIndents', 'bodySwitcher')"
						class="btn btn-primary voffset btn-sm" type="button" id="indentListing">
						<i class="fa fa-list"></i>&nbsp;Stone PO listing
					</a>
					<button id="stonemrvPrint" type=button class="btn btn-primary btn-sm">
						<i class="fa fa-print"></i> &nbsp;Print
					</button>

				</div>

			</div>
		</div>
	</div>
</div>

<script type="text/javascript">

$('#stonemrvPrint').hide();
$('#indentListing').hide();
$("#billDate").datepicker({
	changeMonth : true,	
	changeYear : true,		 
 	maxDate: 'today',
	dateFormat : "dd/mm/yy"
});		

var materialReceiptGrid = function(apiStoneMRV){
	var updateRows = function(rowid, newdata, commit) {
		
	}
	
	var datafields = [
		{'name' : 'mrvslno','type' : 'string', 'map' : 'serialNumber'}, 
		{'name' : 'stoneIndentId','type' : 'string'} ,
		{'name' : 'stoneIndentDetailId','type' : 'string'},
		{'name' : 'serialNumber','type' : 'string'}, 
		{'name' : 'location','type' : 'string'}, 
		{'name' : 'mainCategory','type' : 'string'}, 
		{'name' : 'subCategory','type' : 'string'}, 
		{'name' : 'wgtRange','type' : 'string'}, 
		{'name' : 'pices','type' : 'float'}, 
		{'name' : 'stoneWgt','type' : 'float'}, 
		{'name' : 'uom','type' : 'string'}, 
		{'name' : 'stoneRate','type' : 'float'}, 
		{'name' : 'stoneValue','type' : 'float'} ,
		{'name' : 'sgstPrc','type' : 'float'},
		{'name' : 'sgstTax','type' : 'float'}, 
		{'name' : 'igstPrc','type' : 'float'}, 
		{'name' : 'igstTax','type' : 'float'}, 
		{'name' : 'cgstPrc','type' : 'float'}, 
		{'name' : 'cgstTax','type' : 'float'}, 
		{'name' : 'cessPrc','type' : 'float'}, 
		{'name' : 'cessTax','type' : 'float'}, 
		/* {'name' : 'hsnId','type' : 'long'},  */
		{'name' : 'hsnMasterDTO','type' : 'object'}, 
		/* {'name' : 'taxDTO','type' : 'object'},  */
		{'name' : 'rateConf','type' : 'string'}, 
		{'name' : 'total','type' : 'float','map' : 'total'} 
	];
			
	
		var source =
	    {
        	datatype: "json",
        	datafields: datafields,
        	localdata : apiStoneMRV,                       
           
        };
		
	//var fieldFilters = {"fieldFilters" : {}};
	//showMyGrid(datafields, apiStoneMRV , '', columns, fieldFilters , updateRows, "id");
	 var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid").jqxGrid({
		width : '100%',
	    sortable: true,            
	 	altrows: true,
	 	autorowheight :true,
	    autoheight :true,
        source: dataAdapter,
	    height : 200,
		columnsheight : 60,
	    columnsresize: true,  
   		editable : true,
		rowdetails : true,
		showstatusbar: true,
      	statusbarheight: 30,
      	showaggregates: true,
	    ready: function(){
	    	var aggregates = $("#jqxgrid").jqxGrid('getcolumnaggregateddata', 'total', ['sum', 'avg']);
	   		$("#invoice").val(aggregates['sum']); 
	   	},
	   	columns :[
			{
		   		'text' : 'GRV Sl No',
		   		'datafield' : 'mrvslno',
		   		'width' : '60px',
		   		sortable : false,
		   		editable : false
		   	},{
		   		'text' : 'PO No.',
		   		'datafield' : 'stoneIndentId',
		   		'width' : '60px',
		   		sortable : false,
		   		editable : false
		   	},{
		   		'text' : 'PO Sl No.',
		   		'datafield' : 'serialNumber',
		   		'width' : '80px',
		   		sortable : false,
		   		editable : false
		   	},{
		   		'text' : 'Location',
		   		'datafield' : 'location',
		   		'width' : '80px',
		   		sortable : false,
		   		editable : false
		   	},{
		   		'text' : 'Main Category',
		   		'datafield' : 'mainCategory',
		   		'width' : '100px',
		   		sortable : false,
		   		editable : false
		   	},
		   	{
		   		'text' : 'Sub Category',
		   		'datafield' : 'subCategory',
		   		'width' : '100px',
		   		sortable : false,
		   		editable : false
		   	},{
		   		'text' : 'Wt. Range',
		   		'datafield' : 'wgtRange',
		   		'width' : '100px',
		   		sortable : false,
		   		editable : false
		   	}, {
		   		'text' : 'No. Of pcs.',
		   		'datafield' : 'pices',
		   		'width' : '60px',
				columntype : 'numberinput',
		   		sortable : false,
		   	    cellsalign : 'center',
		   	    align:'center',
		   		editable : true,
		   		aggregates: [{          
		    		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record["pices"] == null) ? 0 :(record["pices"]);		        				 
		    			  return aggregatedValue + total;
		    		  }
		    	  }],
		    	  aggregatesrenderer: function(aggregates) {        		 
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    	  } ,
			    validation: function (cell, value) {
					if (value < 0) {
			             return { result: false, message: "Invalid Number" };
			         }
			         return true;
			     },
			    cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						var uom = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'uom');
						var stoneRate = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'stoneRate');
						var total = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'total');
						stoneRate.value = NVL(stoneRate.value,0);
						total.value = NVL(total.value,0);
						oldvalue = NVL(oldvalue,0);
						
						var sgstPrc = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'sgstPrc');
						var cgstPrc = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'cgstPrc');
						var igstPrc = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'igstPrc');
						var cessPrc = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'cessPrc');
						sgstPrc.value = NVL(sgstPrc.value,0);
						cgstPrc.value = NVL(cgstPrc.value,0);
						igstPrc.value = NVL(igstPrc.value,0);
						cessPrc.value = NVL(cessPrc.value,0);
						
						if(uom.value != null && uom.value != ''){
							
						if('Pcs' == uom.value.valueOf()){
							$("#jqxgrid").jqxGrid('setcellvalue',row,"stoneValue",(stoneRate.value * newvalue).toFixed(2));
							if(!isNaN(newvalue) && newvalue != '' && parseFloat(newvalue) > 0){	
								if(stoneRate.value > 0){
									
										if(total.value > stoneRate.value*oldvalue){
											
											var remainTotal = total.value-(stoneRate.value*oldvalue);
										$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneValue" , (stoneRate.value*newvalue).toFixed(2));
										$("#jqxgrid").jqxGrid('setcellvalue', row, "sgstTax" , ((stoneRate.value*newvalue)*(sgstPrc.value/100)).toFixed(2));
										$("#jqxgrid").jqxGrid('setcellvalue', row, "cgstTax" , ((stoneRate.value*newvalue)*(cgstPrc.value/100)).toFixed(2));
										$("#jqxgrid").jqxGrid('setcellvalue', row, "igstTax" , ((stoneRate.value*newvalue)*(igstPrc.value/100)).toFixed(2));
										$("#jqxgrid").jqxGrid('setcellvalue', row, "cessTax" , ((stoneRate.value*newvalue)*(cessPrc.value/100)).toFixed(2));
										
										var sgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'sgstTax');
										var cgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cgstTax');
										var igsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'igstTax');
										var cessTaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cessTax');
										
										sgsttaxvalue = NVL(sgsttaxvalue,0);
										cgsttaxvalue =  NVL(cgsttaxvalue,0);
										igsttaxvalue = NVL(igsttaxvalue,0);
										cessTaxvalue = NVL(cessTaxvalue,0);
										
										$("#jqxgrid").jqxGrid('setcellvalue', row, "total" , ((stoneRate.value*newvalue) + sgsttaxvalue + cgsttaxvalue + igsttaxvalue + cessTaxvalue));
										
									}
										else{
											$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneValue" , (stoneRate.value*newvalue).toFixed(2));
											$("#jqxgrid").jqxGrid('setcellvalue', row, "sgstTax" , ((stoneRate.value*newvalue)*(sgstPrc.value/100)).toFixed(2));
											$("#jqxgrid").jqxGrid('setcellvalue', row, "cgstTax" , ((stoneRate.value*newvalue)*(cgstPrc.value/100)).toFixed(2));
											$("#jqxgrid").jqxGrid('setcellvalue', row, "igstTax" , ((stoneRate.value*newvalue)*(igstPrc.value/100)).toFixed(2));
											$("#jqxgrid").jqxGrid('setcellvalue', row, "cessTax" , ((stoneRate.value*newvalue)*(cessPrc.value/100)).toFixed(2));
											//$("#jqxgrid").jqxGrid('setcellvalue', row, "total" , (remainTotal+(stoneRate.value*newvalue)).toFixed(2));
											
											var sgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'sgstTax');
											var cgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cgstTax');
											var igsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'igstTax');
											var cessTaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cessTax');
											
											sgsttaxvalue = NVL(sgsttaxvalue,0);
											cgsttaxvalue =  NVL(cgsttaxvalue,0);
											igsttaxvalue = NVL(igsttaxvalue,0);
											cessTaxvalue = NVL(cessTaxvalue,0);
											
											$("#jqxgrid").jqxGrid('setcellvalue', row, "total" , ((stoneRate.value*newvalue) + sgsttaxvalue + cgsttaxvalue + igsttaxvalue + cessTaxvalue));
											
											
										}
								}
								}
			                    else{
			                    	$.growl.error({ message: "Invalid Number", duration: 10000, title: 'Error' });
						    		return "";	
										}
							}
						}
						else{
							var stoneWgt = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'stoneWgt');
							if(stoneWgt != null && stoneWgt != '' && typeof stoneWgt != "undefined"){
								$("#jqxgrid")
								.jqxGrid('setcellvalue',row,"stoneValue",(stoneRate.value * stoneWgt.value).toFixed(2));
							}
							
						}
			     }
		   		
		   	}, {
		   		'text' : 'Weight',
		   		'datafield' : 'stoneWgt',
		   		'width' : '80px',
		   		sortable : false,
		   		cellsalign : 'right',
		   	    align:'center',
		   		editable : true,
		   		aggregates: [{          
		    		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record["stoneWgt"] == null) ? 0 :(record["stoneWgt"]);		        				 
		    			  return aggregatedValue + total;
		    		  }
		    	  }],
		    	  aggregatesrenderer: function(aggregates) {        		 
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    	  } ,
		   		columntype : 'numberinput',
		   		cellsformat : 'd3',
		   		initeditor: function (row, cellvalue, editor) {
		            editor.jqxNumberInput({ decimalDigits: 3, min: 0.000 });
		        },
		   		validation: function (cell, value) {
					if (value < 0) {
			             return { result: false, message: "Invalid Number" };
			         }
			         return true;
			     },
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					var uom = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'uom');
					var stoneRate = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'stoneRate');
					var total = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'total');
					stoneRate.value = NVL(stoneRate.value,0);
					total.value = NVL(total.value,0);
					oldvalue = NVL(oldvalue,0);
					
					var sgstPrc = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'sgstPrc');
					var cgstPrc = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'cgstPrc');
					var igstPrc = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'igstPrc');
					var cessPrc = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'cessPrc');
					sgstPrc.value = NVL(sgstPrc.value,0);
					cgstPrc.value = NVL(cgstPrc.value,0);
					igstPrc.value = NVL(igstPrc.value,0);
					cessPrc.value = NVL(cessPrc.value,0);
					
					if(uom.value != null && uom.value != ''){
						
						if('Pcs' != uom.value.valueOf()){
							$("#jqxgrid").jqxGrid('setcellvalue',row,"stoneValue",(stoneRate.value * newvalue).toFixed(2));
							if(!isNaN(newvalue) && newvalue != '' && parseFloat(newvalue) > 0){	
								if(stoneRate.value > 0){
									
										if(total.value > stoneRate.value*oldvalue){
											var remainTotal = total.value-(stoneRate.value*oldvalue);
										$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneValue" , (stoneRate.value*newvalue).toFixed(2));
										$("#jqxgrid").jqxGrid('setcellvalue', row, "sgstTax" , ((stoneRate.value*newvalue)*(sgstPrc.value/100)).toFixed(2));
										$("#jqxgrid").jqxGrid('setcellvalue', row, "cgstTax" , ((stoneRate.value*newvalue)*(cgstPrc.value/100)).toFixed(2));
										$("#jqxgrid").jqxGrid('setcellvalue', row, "igstTax" , ((stoneRate.value*newvalue)*(igstPrc.value/100)).toFixed(2));
										$("#jqxgrid").jqxGrid('setcellvalue', row, "cessTax" , ((stoneRate.value*newvalue)*(cessPrc.value/100)).toFixed(2));
										
										
										//$("#jqxgrid").jqxGrid('setcellvalue', row, "total" , (remainTotal+(stoneRate.value*newvalue)).toFixed(2));
										var sgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'sgstTax');
										var cgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cgstTax');
										var igsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'igstTax');
										var cessTaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cessTax');
										sgsttaxvalue = NVL(sgsttaxvalue,0);
										cgsttaxvalue =  NVL(cgsttaxvalue,0);
										igsttaxvalue = NVL(igsttaxvalue,0);
										cessTaxvalue = NVL(cessTaxvalue,0);
										
										
										$("#jqxgrid").jqxGrid('setcellvalue', row, "total" , ((stoneRate.value*newvalue) + sgsttaxvalue + cgsttaxvalue + igsttaxvalue + cessTaxvalue));
										
									}
										else{
											$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneValue" , (stoneRate.value*newvalue).toFixed(2));
											$("#jqxgrid").jqxGrid('setcellvalue', row, "sgstTax" , ((stoneRate.value*newvalue)*(sgstPrc.value/100)).toFixed(2));
											$("#jqxgrid").jqxGrid('setcellvalue', row, "cgstTax" , ((stoneRate.value*newvalue)*(cgstPrc.value/100)).toFixed(2));
											$("#jqxgrid").jqxGrid('setcellvalue', row, "igstTax" , ((stoneRate.value*newvalue)*(igstPrc.value/100)).toFixed(2));
											$("#jqxgrid").jqxGrid('setcellvalue', row, "cessTax" , ((stoneRate.value*newvalue)*(cessPrc.value/100)).toFixed(2));
											//$("#jqxgrid").jqxGrid('setcellvalue', row, "total" , (remainTotal+(stoneRate.value*newvalue)).toFixed(2));
											
											var sgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'sgstTax');
											var cgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cgstTax');
											var igsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'igstTax');
											var cessTaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cessTax');
											sgsttaxvalue = NVL(sgsttaxvalue,0);
											cgsttaxvalue =  NVL(cgsttaxvalue,0);
											igsttaxvalue = NVL(igsttaxvalue,0);
											cessTaxvalue = NVL(cessTaxvalue,0);
											
											$("#jqxgrid").jqxGrid('setcellvalue', row, "total" , ((stoneRate.value*newvalue) + sgsttaxvalue + cgsttaxvalue + igsttaxvalue + cessTaxvalue));
										}
								}
								}
			                    else{
			                    	$.growl.error({ message: "Invalid Number", duration: 10000, title: 'Error' });
						    		return "";	
										}
							}
						}
						else{
							var stoneWgt = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'stoneWgt');
							if(stoneWgt != null && stoneWgt != '' && typeof stoneWgt != "undefined"){
								$("#jqxgrid").jqxGrid('setcellvalue',row,"stoneValue",(stoneRate.value * stoneWgt.value).toFixed(2));
							}
							
						}
					calInvValue();
				}
		   	}, {
		   		'text' : 'UQC',
		   		'datafield' : 'uom',
		   		'width' : '60px',
		   		sortable : false,
		   		editable : false
		   	}, {
		   		'text' : 'Rate Rs.',
		   		'datafield': 'stoneRate',
		   		'width' : '100px',		           		
		   		sortable : false,
		   		cellsalign : 'right',
		   		editable : true,
		   		columntype : 'numberinput',
		   		cellsformat : 'd2',
		   		cellbeginedit: function(row, datafield, columntype, oldvalue, newvalue, event){
		   			var rateConf = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'rateConf');	
		   			//if(new String("No").valueOf() == rateConf.value.valueOf()){
	   				if(rateConf.value == "No"){
		   				return true;
		   			}
		   			else{
		   				return false;
		   			}
		   		},
		   		validation: function (cell, value) {
					if (value < 0) {
			             return { result: false, message: "Invalid Number" };
			         }
			         return true;
			     },
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					var stoneWgt = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'stoneWgt');
					var rateConf = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'rateConf');
					var total = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'total');	
					var uom = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'uom');
					var pcs = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'pices');
					
					
					stoneWgt.value = NVL(stoneWgt.value,0);
					rateConf.value = NVL(rateConf.value,0);
					total.value = NVL(total.value,0)
					oldvalue = NVL(oldvalue,0);
					
					var sgstPrc = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'sgstPrc');
					var cgstPrc = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'cgstPrc');
					var igstPrc = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'igstPrc');
					var cessPrc = jQuery('#jqxgrid').jqxGrid ('getCell', row, 'cessPrc');
					sgstPrc.value = NVL(sgstPrc.value,0);
					cgstPrc.value = NVL(cgstPrc.value,0);
					igstPrc.value = NVL(igstPrc.value,0);
					cessPrc.value = NVL(cessPrc.value,0);
					
					var invoice = $('#invoice').val();
		   			if(isNaN(invoice) || 'NaN' == invoice){
		   				invoice = 0;
		   			}
		   			
		   			if(uom == "Cts"){
		   				if(stoneWgt.value > 0){
							if(total.value > stoneWgt.value*oldvalue){
								var remainTotal = total.value -(stoneWgt.value*oldvalue);
								invoice = invoice + (remainTotal+(stoneWgt.value*newvalue)).toFixed(2);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneValue" , (stoneWgt.value*newvalue).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "sgstTax" , ((stoneWgt.value*newvalue)*(sgstPrc.value/100)).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "cgstTax" , ((stoneWgt.value*newvalue)*(cgstPrc.value/100)).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "igstTax" , ((stoneWgt.value*newvalue)*(igstPrc.value/100)).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "cessTax" , ((stoneWgt.value*newvalue)*(cessPrc.value/100)).toFixed(2));
								
								var sgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'sgstTax');
								var cgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cgstTax');
								var igsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'igstTax');
								var cessTaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cessTax');
								sgsttaxvalue = NVL(sgsttaxvalue,0);
								cgsttaxvalue =  NVL(cgsttaxvalue,0);
								igsttaxvalue = NVL(igsttaxvalue,0);
								cessTaxvalue = NVL(cessTaxvalue,0);
								
								$("#jqxgrid").jqxGrid('setcellvalue', row, "total" , ((stoneWgt.value*newvalue) + sgsttaxvalue + cgsttaxvalue + igsttaxvalue + cessTaxvalue));
							}
							else{
								invoice = invoice + (stoneWgt.value*newvalue).toFixed(2);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneValue" , (stoneWgt.value*newvalue).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "sgstTax" , ((stoneWgt.value*newvalue)*(sgstPrc.value/100)).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "cgstTax" , ((stoneWgt.value*newvalue)*(cgstPrc.value/100)).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "igstTax" , ((stoneWgt.value*newvalue)*(igstPrc.value/100)).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "cessTax" , ((stoneWgt.value*newvalue)*(cessPrc.value/100)).toFixed(2));
								
								var sgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'sgstTax');
								var cgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cgstTax');
								var igsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'igstTax');
								var cessTaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cessTax');
								sgsttaxvalue = NVL(sgsttaxvalue,0);
								cgsttaxvalue =  NVL(cgsttaxvalue,0);
								igsttaxvalue = NVL(igsttaxvalue,0);
								cessTaxvalue = NVL(cessTaxvalue,0);
								
								$("#jqxgrid").jqxGrid('setcellvalue', row, "total" , ((stoneWgt.value*newvalue) + sgsttaxvalue + cgsttaxvalue + igsttaxvalue + cessTaxvalue));
							}
						}
		   			}
		   			
		   			if(uom == "Pcs"){
		   				if(pcs > 0){
							if(total.value > pcs*oldvalue){
								var remainTotal = total.value -(pcs*oldvalue);
								invoice = invoice + (remainTotal+(pcs*newvalue)).toFixed(2);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneValue" , (pcs*newvalue).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "sgstTax" , ((pcs*newvalue)*(sgstPrc.value/100)).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "cgstTax" , ((pcs*newvalue)*(cgstPrc.value/100)).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "igstTax" , ((pcs*newvalue)*(igstPrc.value/100)).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "cessTax" , ((pcs*newvalue)*(cessPrc.value/100)).toFixed(2));
								
								var sgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'sgstTax');
								var cgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cgstTax');
								var igsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'igstTax');
								var cessTaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cessTax');
								sgsttaxvalue = NVL(sgsttaxvalue,0);
								cgsttaxvalue =  NVL(cgsttaxvalue,0);
								igsttaxvalue = NVL(igsttaxvalue,0);
								cessTaxvalue = NVL(cessTaxvalue,0);
								
								$("#jqxgrid").jqxGrid('setcellvalue', row, "total" , ((pcs*newvalue) + sgsttaxvalue + cgsttaxvalue + igsttaxvalue + cessTaxvalue));
							}
							else{
								invoice = invoice + (pcs*newvalue).toFixed(2);
								$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneValue" , (pcs*newvalue).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "sgstTax" , ((pcs*newvalue)*(sgstPrc.value/100)).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "cgstTax" , ((pcs*newvalue)*(cgstPrc.value/100)).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "igstTax" , ((pcs*newvalue)*(igstPrc.value/100)).toFixed(2));
								$("#jqxgrid").jqxGrid('setcellvalue', row, "cessTax" , ((pcs*newvalue)*(cessPrc.value/100)).toFixed(2));
								
								var sgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'sgstTax');
								var cgsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cgstTax');
								var igsttaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'igstTax');
								var cessTaxvalue = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'cessTax');
								sgsttaxvalue = NVL(sgsttaxvalue,0);
								cgsttaxvalue =  NVL(cgsttaxvalue,0);
								igsttaxvalue = NVL(igsttaxvalue,0);
								cessTaxvalue = NVL(cessTaxvalue,0);
								
								$("#jqxgrid").jqxGrid('setcellvalue', row, "total" , ((pcs*newvalue) + sgsttaxvalue + cgsttaxvalue + igsttaxvalue + cessTaxvalue));
							}
						}
		   			}
		   				
					
					
					calInvValue();
					
			
				}
		   	}, {
		   		'text' : 'Taxable Amount',
		   		'datafield' : 'stoneValue',
		   		'width' : '100px',
		   		sortable : false,
		   		cellsalign : 'right',
		   		cellsformat: 'd2',
		   	    align:'center',
		   		editable : false,
		   		aggregates: [{          
		    		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record["stoneValue"] == null) ? 0 :(record["stoneValue"]);		        				 
		    			  return aggregatedValue + total;
		    		  }
		    	  }],
		    	  aggregatesrenderer: function(aggregates) {        		 
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    	  } ,
		   	}, {
		   		'text' : 'SGST(%)',
		   		'datafield' : 'sgstPrc',
		   		'width' : '70px',
		   		cellsformat : 'd3',
		   		columntype : 'numberinput',
		   		sortable : false,
		   		editable : false,
		   		columngroup : 'sgst',
		  		cellsalign : 'center',
		  		align:'center'/* ,
		   		cellsrenderer: function (row, datafield, columntype, oldvalue, newvalue, event) {
					return "0.00";
		     	} */
		   	}, {
		   		'text' : 'SGST Amt',
		   		'datafield' : 'sgstTax',
		   		'width' : '80px',
		   		cellsformat : 'd2',
				columntype : 'numberinput',
		   		sortable : false,
		   		editable : false,
		   		columngroup : 'sgst',
		  		cellsalign : 'right',
		  		align:'center'/* ,
		   		cellsrenderer: function (row, datafield, columntype, oldvalue, newvalue, event) {
					return "0.00";
		     	} */
		   	}, {
		   		'text' : 'CGST(%)',
		   		'datafield' : 'cgstPrc',
		   		'width' : '70px',
		   		cellsformat : 'd3',
		   		columntype : 'numberinput',
		   		sortable : false,
		   		editable : false,
		   		columngroup : 'cgst',
		  		cellsalign : 'center',
		  		align:'center'/* ,
		   		cellsrenderer: function (row, datafield, columntype, oldvalue, newvalue, event) {
					return "0.00";
		     	} */
		   	}
			, {
		   		'text' : 'CGST Amt',
		   		'datafield' : 'cgstTax',
		   		'width' : '80px',
		   		cellsformat : 'd2',
				columntype : 'numberinput',
		   		sortable : false,
		   		editable : false,
		   		columngroup : 'cgst',
		  		cellsalign : 'right',
		  		align:'center'/* ,
		   		cellsrenderer: function (row, datafield, columntype, oldvalue, newvalue, event) {
					return "0.00";
		     	} */
		   	}, {
		   		'text' : 'IGST(%)',
		   		'datafield' : 'igstPrc',
		   		'width' : '70px',
		   		cellsformat : 'd3',
		   		columntype : 'numberinput',
		   		sortable : false,
		   		editable : false,
		   		columngroup : 'igst',
		  		cellsalign : 'center',
		  		align:'center'/* ,
		   		cellsrenderer: function (row, datafield, columntype, oldvalue, newvalue, event) {
					return "0.00";
		     	} */
		   	}, {
		   		'text' : 'IGST Amt',
		   		'datafield' : 'igstTax',
		   		'width' : '80px',
		   		cellsformat : 'd2',
				columntype : 'numberinput',
		   		sortable : false,
		   		editable : false,
		   		columngroup : 'igst',
		  		cellsalign : 'right',
		  		align:'center'/* ,
		   		cellsrenderer: function (row, datafield, columntype, oldvalue, newvalue, event) {
					return "0.00";
		     	} */
		   	 },{
				'text' : 'CESS(%)',
		  		'datafield' : 'cessPrc',
		  		'width' : '70px',
		  		cellsformat : 'd3',
		  		columntype : 'numberinput',
		  		sortable : false,
		  		editable : false,
		  		columngroup : 'cess',
		  		cellsalign : 'center',
		  		align:'center'/* ,
		  		cellsrenderer: function (row, datafield, columntype, oldvalue, newvalue, event) {
				
		  			//return "0.00";
		     	} */
		  	}, {
		  		'text' : 'CESS Amt',
		  		'datafield' : 'cessTax',
		  		'width' : '80px',
		  		cellsformat : 'd2',
				columntype : 'numberinput',
		  		sortable : false,
		  		editable : false,
		  		columngroup : 'cess',
		  		cellsalign : 'right',
		  		align:'center'/* ,
		  		cellsrenderer: function (row, datafield, columntype, oldvalue, newvalue, event) {
					return "0.00";
		     	} */
		  	 }, {
		  		'text' : 'HSN_MASTER',
		  		'datafield' : 'hsnMasterDTO',
		  		'width' : '80px' ,
		  		hidden: true 
		  	 },/* {
		  		'text' : 'TAX_MASTER',
		  		'datafield' : 'taxDTO',
		  		'width' : '80px' ,
		  		hidden: true 
		  	 },{
		  		'text' : 'HSN_ID',
		  		'datafield' : 'hsnId',
		  		'width' : '80px' ,
		  		hidden: true 
		  	 }, */ {
		   		'text' : 'RateConf',
		   		'datafield' : 'rateConf',
		   		'width' : '80px',
		   		'hidden' : true
		   	}, {
		   		'text' : 'Total Amt Incl Tax',
		   		'datafield' : 'total',
		   		'width' : '100px',
		   		sortable : false,
		   		cellsalign : 'right',
		   	    align:'center',
		    	cellsformat: 'd2',
		   		editable : false,   		
		   		aggregates: [{          
		    		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record["total"] == null) ? 0 :(record["total"]);		        				 
		    			  return aggregatedValue + total;
		    		  }
		    	  }],
		    	  aggregatesrenderer: function(aggregates) {        		 
		    		  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    	  } ,
		    	  cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
		    		  var aggregates = $("#jqxgrid").jqxGrid('getcolumnaggregateddata', 'total', ['sum', 'avg']);
		    		  $("#invoice").val(parseFloat(aggregates['sum']).toFixed(2)); 
		    	  }
		   	}],
		
		columngroups : [ 
			{text : 'IGST',align : 'center',name : 'igst'}, 
			{text : 'CGST',align : 'center',name : 'cgst'}, 
			{text : 'SGST',align : 'center',name : 'sgst'}, 
			{text : 'CESS',align : 'center',name : 'cess'} 
		]
	});

}
var flagRes;
var gstinListArr = [];
var LoggedInStateObj = null;
var materialReceiptGridArr = [];
var onLoadAPI = function(){
	var vendorId = $("#vendorId").val();
	var fieldFilters = {"fieldFilters" : {}};
	postJSON('/OrderExecution/api/v1/stoneIndentById', JSON.stringify(fieldFilters), function(data) {
		materialReceiptGrid(data.payload.list);
	});
	$("#jqxgrid").show();
	
	$.getJSON('/OrderExecution/api/v1/vendorGSTINDetails?vendorId=' + vendorId, function(data) {
		var gstinList = data.payload.GstinList;
		$('#gstinNo').empty().append('<option value="" selected>--Select--</option>');
		for(var i=0; i<gstinList.length; i++){
			gstinListArr.push(gstinList[i]);
			$('#gstinNo').append('<option value="' + gstinList[i].id + '">' + gstinList[i].gstinNo	+ '</option>');
		}
		LoggedInStateObj = data.payload.LoggedInState;
		  flagRes = ($("#isRegister").val());
		  
		if(flagRes == "false"){
			$.getJSON('/OrderExecution/api/v1/stateLOV', function(data) {
				var taxStructureMaasterLOV = data.payload.taxStructureMaasterLOV;
				taxStructureMaasterLOV.sort(function(a, b){
					return a.name-b.name;
				});
				$.each(taxStructureMaasterLOV, function(k, v){
					$('#srcStateGst').append('<option  value="' + v.id + '">' + v.description	+ '</option>');
					});
			})
			$("#gstinNo").hide();
			$("#srcState").hide();
			$("#stateHide").hide();
			$("#gstihide").hide();
			$("#StateSrchide").show();	
	}else{
		$("#StateSrchide").hide();
		$("#gstinNo").show();
		$("#srcState").show();
		$("#stateHide").show();
		$("#gstihide").show();
	}
});
};		

onLoadAPI();
var mrvDetails = [];

var selectedGstList = [];
var calculateGSTTax = function(){
	var value = $('#gstinNo').val();
		loggedInStateId = LoggedInStateObj.id;
	
	$.each(gstinListArr, function(k, v){
		if(v.id == value){
			selectedGstList.push(v);
			$('#srcState').val(v.state.name);
			$('#srcStateId').val(v.state.id);
		}
	});
	
	
	var griddata = $("#jqxgrid").jqxGrid('getdatainformation');
	// fieldFilter request for GST calculation to server.
	var fieldFilters = {  "fieldFilters": {}};
	
	fieldFilters.fieldFilters['poId'] = parseInt($("#indentNo").val());
	fieldFilters.fieldFilters['sourceOfStateId'] = (flagRes == "true")?(parseInt($("#srcStateId").val())):($('#srcStateGst').val());
	fieldFilters.fieldFilters['loggedInStateId'] = loggedInStateId;
	fieldFilters.fieldFilters['isRegistered'] = flagRes;
	
	for (var i = 0; i < griddata.rowscount; i++){
		var invAmt = $("#jqxgrid").jqxGrid("getcellvalue", i, 'stoneValue');
		var poSlNo = $("#jqxgrid").jqxGrid("getcellvalue", i, 'serialNumber');
		var stoneRate = $("#jqxgrid").jqxGrid("getcellvalue", i, 'stoneRate');
		var stoneWgt = $("#jqxgrid").jqxGrid("getcellvalue", i, 'stoneWgt');
		
		var mrvDetailsObj = {
		        "poSlNo": poSlNo.toString(),
		        "invAmt": invAmt.toString(),
		        "weight" : stoneWgt.toString(),
		        "rateRs" : stoneRate.toString()		        
		      }
		
		mrvDetails.push(mrvDetailsObj);
		
	}
	fieldFilters.fieldFilters['mrvDetails'] = mrvDetails;
	$("#invoice").val('');
	postJSON('/OrderExecution/api/v1/getTaxByGSTINO', JSON.stringify(fieldFilters), function(data) {
		console.log(data);
		debugger;
		if(data.resCode == 1){
			materialReceiptGrid(data.payload.list);
			var totalAmt = 0.00;
			$.each(data.payload.list, function(k, v){
				var total = parseFloat(v.total);
				totalAmt = totalAmt + total;
			});
			$("#invoice").val(totalAmt.toFixed(2));
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
			$("#invoice").val('');
			$("#srcState").val('');
			$('#gstinNo').prop('selectedIndex',0);
			
		}		
	});
	
	
}

$('#gstinNo').on("change", function(){
	calculateGSTTax();
});
$('#srcStateGst').on("change", function(){
	calculateGSTTax();
});


$("#saveMRV").on("click", function() {		
	var indentId = '${indentData.id}';
	var mrvTyp = $("#mrvTypee").val();
	var partyBillNo = $("#partyBillNo").val();
	var billDate = $("#billDate").val();
	var comission = $("#commission").val();
	var insuranceval = $("#insurance").val();
	var others= $("#others").val();		
	var parcelId = $("#parcelId").val();
	var gstin = $("#gstinNo option:selected").text();
	var gstinID = $("#gstinNo").val();
	var state = $("#srcStateId").val();
	var srcStateGstId = $("#srcStateGst").val();
	
	var courierCharges = $("#courierCharges").val();
	var rows = $("#jqxgrid").jqxGrid('getdisplayrows');			
		
	if(flagRes == "true"){
		if(gstinID == null || gstinID == ''){
			$.growl.error({
				message : "Please fill GSTIN!!",
				duration : 10000
			});
			return false;
		}
	}else if(flagRes == "false"){
		if(srcStateGstId == null || srcStateGstId == ''){
			$.growl.error({
				message : "Please fill Source of State!!",
				duration : 10000
			});
			return false;
		}
	}
	if(partyBillNo == null || partyBillNo == '' || parcelId==null || parcelId =='' || mrvTyp == null || mrvTyp == ''
		|| billDate == null || billDate == ''){		
		$.growl.error({
			message : "Please fill all the mandatory fields",
			duration : 10000
		});
		return false;
	}
	
	var totalval = 0;
	var stoneIndents = [];
	for(i =0; i< rows.length; i++){
		var row = rows[i];
		totalval = totalval+parseFloat(row.total)
		var hsn = {"id" : row.hsnMasterDTO.id};
		var stoneIndent = {
			"stoneIndentId" : indentId,
			"stoneIndentDetailId" : row.stoneIndentDetailId,
			"mainCategory" : row.mainCategory,
			"subCategory" : row.subCategory,				
			"pices" : row.pices,
			"stoneWgt" :row.stoneWgt,
			"uom" : row.uom,
			"stoneRate" :row.stoneRate,
			"stoneValue" : row.stoneValue,
			"total" : row.total,
			"hsnMasterDTO" : hsn,
			"mrvType" : mrvTyp,
			"totalValue" : totalval,
			"location" : row.location,
			"billNumber" : partyBillNo,
			"billDate" : billDate,
			"commission" : comission,
			"insurance" : insuranceval ,
			"otherCharges" : others ,
			"courierCharges" : courierCharges,
			"parcelId" :parcelId,
			"serialNumber" : row.serialNumber,
			"sgstPrc" : row.sgstPrc,
			"sgstTax" : row.sgstTax,
			"cgstPrc" : row.cgstPrc,
			"cgstTax" : row.cgstTax,
			"igstPrc" : row.igstPrc,
			"igstTax" : row.igstTax,
			"cessPrc" : row.cessPrc,
			"cessTax" : row.cessTax,
			"gstin" : (flagRes == "true")?(gstin) : "",
			"state" : (flagRes == "true")? (state) : (srcStateGstId)
		};	
		
		/*if(stoneIndent.stoneRate == null || stoneIndent.stoneRate == '' ||stoneIndent.centralExcise == null || stoneIndent.centralExcise == ''||stoneIndent.vat == null || stoneIndent.vat=='' 
				|| stoneIndent.cst== null || stoneIndent.cst==''){			
			$.growl.error({
				message : "Please fill all the mandatory fields",
				duration : 10000
			});
			return false;
		} */
		stoneIndents.push(stoneIndent);
	}		
		
		
		
	postJSON('/OrderExecution/api/v1/stoneReceipt', JSON.stringify(stoneIndents), function(data) {
		$("#jqxgrid").jqxGrid('editable', false);
		if(data.resCode == 1){
			$("#stoneMrv").val(data.payload.stoneIndent.stoneReceiptNo);
			$("#stoneMrvDate").val(data.payload.stoneIndent.stoneReceiptDt);
			$("#saveMRV").hide();
						
			$('#stonemrvPrint').show();
			$('#indentListing').show();
						
			$("#stoneIndentMRV :input").prop("disabled", true);
			$.growl.notice({
				message : "Successfully created Stone PO GRV: " + data.payload.stoneIndent.stoneReceiptNo,
				duration : 10000,
				title : 'Success'
			});
		}
		else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000, 
				title: 'Error'
			}); 
		}
	});
});
		
$("#stoneIndentMRV input[type=number]").keypress(function(event) {	
	if ( event.which == 45 || event.which == 189 || (event.which > 96 && event.which < 123) || (event.which > 64 && event.which < 91)) {			
	    event.preventDefault();
	}
});
			
$("#parcelId").keypress(function(event) {	
	if ( event.which == 46) {			
	    event.preventDefault();
	}
});
   
$( "#stonemrvPrint" ).click(function() {
	var StoneMrvNo = $("#stoneMrv").val();
  	fieldFilters = {
	    "fieldFilters" : {
	        "mrvNo" : StoneMrvNo,
	        "mode" : "pdf",
	        "reportName" : "RPT_Stone_GRV_Indent"
	    }
 	};
	jasperReport('RPT_Stone_GRV_Indent.pdf', fieldFilters); 
});

var calInvValue = function(){
	var commission = $("#commission").val();
	var courierCharges = $("#courierCharges").val();
	var insurance = $("#insurance").val();
	var others = $("#others").val();
	
	if(commission == "" || commission == null){
		commission = 0;
	}
	
	if(courierCharges == "" || courierCharges == null){
		courierCharges = 0;
	}
	
	if(insurance == "" || insurance == null){
		insurance = 0;
	}
	
	if(others == "" || others == null){
		others = 0;
	}
	
	var rows = $("#jqxgrid").jqxGrid('getdisplayrows');	
	var totValue = 0;
	if(typeof rows != "undefined"){
		for(var i=0; i<rows.length; i++){
			totValue += rows[i].total;
		}
	}
	var totValueInv = (parseFloat(totValue) + parseFloat(commission) + parseFloat(courierCharges) + parseFloat(insurance) + parseFloat(others));
	totValueInv = parseFloat(totValueInv).toFixed(2);
	$("#invoice").val(totValueInv); 
}

var NVL = function(source, replaceMentValue){
	if(typeof source != "undefined" && source != null && source != ""){
		return source;
	}
	else return replaceMentValue;
}

</script>
<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>