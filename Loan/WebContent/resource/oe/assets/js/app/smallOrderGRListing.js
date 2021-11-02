var loadPermission  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(typeof permission != "undefined"){
		$(".layout-main button").each(function() {
			var value = '#'+this.id;
			var value2 = '#'+this.id+'C';
			var value3 = '#'+this.id+'S';
			var val = $(value).text();
			val = val.trim();
			if( val.startsWith("search") || val.startsWith("Search")){
				if(permission.canSearch == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}  
			
			if(val.startsWith("Create") || val.startsWith("create")){
				if(permission.canAdd == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}
			
			if( val.startsWith("export") || val.startsWith("Export")){
				if(permission.canExport == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}
			
			if(val.startsWith("print") || val.startsWith("Print")){
				if(permission.canPrint == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}
			
			if(val.startsWith("delete") || val.startsWith("Delete")){
				if(permission.canDelete == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}
		});
	}
}

//loadPermission();

// date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	maxDate : 0,
	dateFormat: "dd/mm/yy",
});

//on load LOV Function
var onloadLov = function(){
	$.getJSON('/OrderExecution/api/v1/soGrListingLOVs?portal=OE', function(data) {
		$('#vendorS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.vendorList, function(key, val) {
				$('#vendorS').append('<option value="' + val.id + '">' + val.vendorName + '</option>');
		 });
			$('#sopS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.SOPNo, function(key, val) {
				$('#sopS').append('<option value="' + val + '">' + val + '</option>');
		 });
			
		$('#statusS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.status, function(key, val) {
				$('#statusS').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
	});
} 
onloadLov();

//field Filters
var soGRListingFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var sopS = $("#sopS").val();
	var vendorS = $("#vendorS").val();
    var status = $("#statusS").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (sopS != "" && sopS != null) {
		fieldFilters.fieldFilters["sopNo"] = sopS;
	}
	if (vendorS != "" && vendorS != null) {
		fieldFilters.fieldFilters["vendorId"] = vendorS;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["status"] = status;
	}
	
	return fieldFilters;
}


//Search grid started
function soGrListingGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [
		{'name' : 'grNo','type' : 'int','map' : 'smallOrderGRDTO>id'}, 
		{'name' : 'sopNo','type' : 'int','map' : 'soOrderId'},
		{'name' : 'slNo','type' : 'int','map' : 'soSrlNo'},
		{'name' : 'storeOrDc','type' : 'string','map'  : 'smallOrderGRDTO>grAtStoreOrDC'},
		{'name' : 'segment','type' : 'string','map':'segment>description'},
		{'name' : 'jewelType','type' : 'string','map' :'jewelType>description'},
		{'name' : 'vendor','type' : 'string','map' : 'smallOrderGRDTO>vendor>vendorName'}, 
		{'name' : 'pcs','type' : 'int','map' : 'pieces'},
		{'name' : 'grsWt','type' : 'float','map' :'grossWeight'},
		{'name' : 'netWt','type' : 'float','map'  : 'netWeight'},
		{'name' : 'stoneName','type' : 'string','map':'stoneName'},
		{'name' : 'stoneWt','type' : 'float','map' :'stoneWeight'},
		{'name' : 'uom','type' : 'string','map':'uomType'},
		{'name' : 'stoneCost','type' : 'float','map' :'stoneCost'},
		{'name' : 'stonePcs','type' : 'int','map':'pieces'},
		{'name' : 'totalCostCharges','type' : 'float','map':'totalCost'},
		{'name' : 'totalSellingCharges','type' : 'float','map':'totalSellingCharges'},
		{'name' : 'status','type' : 'string','map':'soStatus'},
		{'name' : 'raisedBy','type' : 'string','map':'attendedBy'}
		];
	var columns = [ {'text'  :'GR No','datafield': 'grNo','width' : '3%',cellsalign : 'center',align:'center',editable : false},
		{'text'  :'SOP No','datafield':  'sopNo','width' : '4%',cellsalign : 'center',align:'center',editable : false},
		{'text'  :'SOP Sl No','datafield':  'slNo','width' : '4%',sortable  :false,cellsalign : 'center',align:'center',editable : false},
		{'text'  :'Store/DC','datafield':  'storeOrDc','width' : '5%',sortable  :false,cellsalign : 'center',align:'center',editable : false},
		{'text'  :'Segment','datafield' : 'segment','width'  :'5%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
		{'text'  :'Jewel Type','datafield':  'jewelType','width' : '6%',sortable  :false,cellsalign : 'center',align:'center',editable : false,},
		{'text'  :'Vendor','datafield' : 'vendor','width'  :'8%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
		{'text'  :'Pcs','datafield':  'pcs','width' : '3%',sortable  :false,cellsalign : 'center',align:'center',editable : false},
		{'text'  :'Gross Wt.','datafield' : 'grsWt','width'  :'5%',sortable  :false,cellsalign : 'right',align:'center',editable:  false,cellsformat :'d3'},
		{'text'  :'Net Wt.','datafield':  'netWt','width' : '4%',sortable  :false,cellsalign : 'right',align:'center',editable : false,cellsformat :'d3'},
		{'text'  :'Stone Name','datafield':  'stoneName','width' : '6%',sortable  :false,cellsalign : 'center',align:'center',editable : false},
		{'text'  :'Stone Wt.','datafield' : 'stoneWt','width'  :'4%',sortable  :false,cellsalign : 'right',align:'center',editable:  false,cellsformat :'d3'},
		{'text'  :'UQC','datafield':  'uom','width' : '4%',sortable  :false,cellsalign : 'center',align:'center',editable : false},
		{'text'  :'Stone Cost','datafield':  'stoneCost','width' : '6%',sortable  :false,cellsalign : 'right',align:'center',editable : false,cellsformat :'d2'},
		{'text'  :'Stone Pcs','datafield':  'stonePcs','width' : '4%',sortable  :false,cellsalign : 'center',align:'center',editable : false},
		{'text'  :'Total Cost Charges','datafield':  'totalCostCharges','width' : '8%',sortable  :false,cellsalign : 'right',align:'center',editable : false,cellsformat :'d2'},
		{'text' : 'Total Selling Charges','datafield' :'totalSellingCharges','cellsalign' : 'right','align' : 'center',sortable : false,'width' : '7%',cellsformat :'d2',editable : false},
		{'text'  :'Line Item Status','datafield':  'status','width' : '6%',cellsalign : 'center',align:'center',editable : false,sortable  :false},
		{'text'  :'Raised By','datafield': 'raisedBy','width' : '8%',cellsalign : 'center',align:'center',editable : false,sortable  :false},
		];
		showMyGrid(datafields, "/OrderExecution/api/v1/searchSOGR?portal=OE", "list",columns, soGRListingFieldFilters(), updateRows, "");
		$("#jqxgrid").jqxGrid({	
			width : '100%',
	        sortable: true, 
	    	theme: 'energyblue',
	     	altrows: true,
	    	columnsresize: true, 
			rowsheight : 50,
			autorowheight :true,
	        autoheight :true,
	        columnsheight:50,
			rowdetails : true,
			virtualmode : true,
			pageable: true
		});
}

// search functionality
$("#search").on('click',function(){
	var fDate = $("#fromDateS").val();
	var tDate = $("#toDateS").val();
		if(fDate == "" || fDate == null || tDate == "" || tDate == null){
			$.growl.error({
				message : "Please Fill Mandatory Fields!!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}else{
			soGrListingGrid();
			$("#jqxgrid").show();
		}
});

$("#export").on("click",function() {
	var data;
    var newData = [];
	     var sysdate = moment().format('DDMMYYYYHHmmSS');
		 var rows = $("#jqxgrid").jqxGrid('getrows');
		 if(typeof rows == "undefined"){
			$.growl.error({
				message : "No Data to Export.",
				duration : 10000
			});
			return false;
			}else{			
				var rows = $("#jqxgrid").jqxGrid('getdatainformation');
				if(rows.rowscount != 0){
					postJSON('/OrderExecution/api/v1/searchSOGR?page=export&portal=OE',JSON.stringify(soGRListingFieldFilters()),function(response) {
			   if(response != null){
               data = response.payload.list;
               for (i = 0; i < data.length; i++) {
				newData.push({
					'GR No' : (data[i].smallOrderGRDTO != null) ? data[i].smallOrderGRDTO.id : "",
					'SOP No' : (data[i].soOrderId!= null) ? data[i].soOrderId  : "",	
					'SOP Sl No.' : (data[i].soSrlNo != null) ? data[i].soSrlNo : "",
					'Store/DC' : (data[i].smallOrderGRDTO != null) ? data[i].smallOrderGRDTO.grAtStoreOrDC : "",	
					'Segment' : (data[i].segment!= null) ? data[i].segment.description  : "",
					'Jewel Type' : (data[i].jewelType != null) ? data[i].jewelType.description : "",
					'Vendor' : (data[i].smallOrderGRDTO != null) ? data[i].smallOrderGRDTO.vendor.vendorName : "",
					'Pcs' : (data[i].pieces != null) ? data[i].pieces : "",
					'Gross Wt.' : (data[i].grossWeight!= null) ? data[i].grossWeight.toFixed(3) : "",	
					'Net Wt.' : (data[i].netWeight != null) ? data[i].netWeight.toFixed(3) : "",
					'Stone Name' : (data[i].stoneName != null) ? data[i].stoneName : "",	
					'Stone Wt.' : (data[i].stoneWeight!= null) ? data[i].stoneWeight.toFixed(3)  : "",
					'UQC' : (data[i].uomType != null) ? data[i].uomType : "",
					'Stone Cost' : (data[i].stoneCost != null) ? data[i].stoneCost.toFixed(2) : "",
					'Stone Pcs' : (data[i].pieces != null) ? data[i].pieces : "",
					'Total Cost Charges' : (data[i].totalCost!= null) ? data[i].totalCost.toFixed(2)  : "",	
					'Total Selling Charges' : (data[i].totalSellingCharges != null) ? data[i].totalSellingCharges.toFixed(2) : "",
					'Status' : (data[i].soStatus != null) ? data[i].soStatus : "",	
					'Raised By' : (data[i].attendedBy!= null) ? data[i].attendedBy  : "",
                   });
						
               }
               //JSONToCSVConvertor(newData, "Metal Rate Query" + "_" + sysdate, true);
               var opts = [{sheetid:'Small_Order_GR_Listing',header:true}];
               var res = alasql('SELECT * INTO XLSX("Small Order GR Listing'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
            }
        });
		   }else{
				  $.growl.error({
					message : "No Data to Export.",
					duration : 10000
				});
					return false;	
				}
			}
		});

$("#clearAll").on('click', function() {
	window.location.href="javascript:showContentPage('smallOrderGRListing','bodySwitcher')";
});