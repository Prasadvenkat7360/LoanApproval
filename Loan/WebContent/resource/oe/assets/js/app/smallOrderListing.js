
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
	$.getJSON('/OrderExecution/api/v1/getSmallOrderListingLOV', function(data) {
		$('#statusS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.status, function(key, val) {
				$('#statusS').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
			$('#raisedByS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.salesExecutive, function(key, val) {
				$('#raisedByS').append('<option value="' + val.hrmsId + '">' + val.name + '</option>');
		 });
	});
} 
onloadLov();

//field Filters
var soListingFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var sopNoS = $("#sopNoS").val();
	var statusS = $("#statusS").val();
	var raisedByS = $("#raisedByS").val();
  
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (sopNoS != "" && sopNoS != null) {
		fieldFilters.fieldFilters["id"] = sopNoS;
	}
	if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["status"] = statusS;
	}
	if (raisedByS != "" && raisedByS != null) {
		fieldFilters.fieldFilters["salesExecutive"] = raisedByS;
	}
	return fieldFilters;
}


//Search grid started
function soListingGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [
		{'name' : 'sopNo','type' : 'int','map' : 'soId'},
		{'name' : 'sopDate','type' : 'string','map' : 'orderDate'},
		{'name' : 'customerName','type' : 'string','map'  : 'customer>middleName'},
		{'name' : 'contactNo','type' : 'string','map':'customer>mobileOne'},
		{'name' : 'intimation','type' : 'string','map' :'intimationMode'},
		{'name' : 'advancePaid','type' : 'float','map' : 'advancePaid'}, 
		{'name' : 'raisedBy','type' : 'string','map':'raisedBy'},
		{'name' : 'status','type' : 'string','map':'status'},
		{'name' : 'printId','type' : 'string','map':'soId'},
		];
	var columns = [ 
		{'text'  :'SOP No','datafield':'sopNo','width' : '10%',cellsalign : 'center',align:'center',editable : false,sortable :true},
		{'text'  :'SOP Date','datafield':'sopDate','width' : '10%',cellsalign : 'center',align:'center',editable : false,cellsformat :'dd/mm/yyyy',sortable :false},
		{'text'  :'Customer Name','datafield':  'customerName','width' : '10%',cellsalign : 'center',align:'center',editable : false,sortable :false},
		{'text'  :'Contact No','datafield' : 'contactNo','width'  :'12%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
		{'text'  :'Intimation','datafield':  'intimation','width' : '15%',cellsalign : 'center',align:'center',editable : false,sortable :false},
		{'text'  :'Advance Paid','datafield' : 'advancePaid','width'  :'10%',sortable  :false,cellsalign : 'right',align:'center',editable:false,cellsformat :'d2'},
		{'text'  :'Raised By','datafield': 'raisedBy','width' : '15%',cellsalign : 'center',align:'center',editable : false,sortable :false},
		{'text'  :'Status','datafield':  'status','width' : '15%',cellsalign : 'center',align:'center',editable : false,sortable :false},
		{ 'text' : '',datafield : 'printId',cellsrenderer : printSOPListing,editable : false,cellsalign : 'center',align : 'center','width' : '3%'}
		];
		showMyGrid(datafields, "/OrderExecution/api/v1/smallOrderListing", "smallOrderListing",columns, soListingFieldFilters(), updateRows, "");
		$("#jqxgrid").jqxGrid({	
			width : '100%',
	        sortable: true,            
		   	altrows: true,
		  	columnsresize: true, 
			rowsheight : 35,
			theme: 'energyblue',
			rowdetails : true,
			virtualmode : true,	
			pageable: true
		});
}

//print
var printSOPListing = function(row, column, value) {
	return  '<a class="btn btn-sm btn-primary" id='
	+ row
	+ ' onclick="printSOPListingDet('
	+ value
	+ ')" href="javascript:void(0);"/><i class="fa fa-print fa-sm"></i></a>'
}
var printSOPListingDet = function(sopId){
	console.log(sopId);
	fieldFilters = {
	        "fieldFilters" : {
	            "SmallOrderNo" :sopId,
	            "mode" : "pdf",
	            "reportName" : "RPT_SRWork_Order"
	        }
	    };
	jasperReport('RPT_Small_Order_Listing.pdf', fieldFilters);
}
// search functionality
$("#search").on('click',function(){
	soListingGrid();
	$("#jqxgrid").show();
});

$("#clearAll").on('click', function() {
	window.location.href="javascript:showContentPage('smallOrderListing','bodySwitcher')";
});

//###################### Export functionality #######################

$("#export").on("click",function() {
		var data;
	    var newData = [];
	    var fieldFilters = soListingFieldFilters();
	    
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
			   postJSON('/OrderExecution/api/v1/smallOrderListingExport',JSON.stringify(fieldFilters),function(response) {
			   if(response != null){
				var   lineItem = response.payload.smallOrderListing;
				for (i = 0; i < lineItem.length; i++) {
				newData.push({
					"Store Code":lineItem[i].storeName == null ? "":lineItem[i].storeName,
					"SOP No":lineItem[i].smallOrderId == null ? "":lineItem[i].smallOrderId,
					"Sl No":lineItem[i].serialNumber == null ? "":lineItem[i].serialNumber,
					"Segment":lineItem[i].segmentDesc == null ? "":lineItem[i].segmentDesc,
					"Jewel Type":lineItem[i].jewelTypeDesc == null? "":lineItem[i].jewelTypeDesc,
					"Repair Description":lineItem[i].description == null ? "":lineItem[i].description,
					"J/W code":lineItem[i].vendorName == null ? "":lineItem[i].vendorName,
					"G. Wt/Stone Wt":lineItem[i].grossWeight == null ? "":lineItem[i].grossWeight,
					"Net Wt":lineItem[i].netWeight == null ? "":lineItem[i].netWeight,
					"Stone Wt":lineItem[i].stoneWt == null ? "":lineItem[i].stoneWt,
					"UQC":lineItem[i].uqc == null ? "":lineItem[i].uqc,
					"Repair Selling Charges":lineItem[i].totalSellingCharges == null ? "":lineItem[i].totalSellingCharges,
					"Advance":lineItem[i].advancePaid == null ? "":lineItem[i].advancePaid,
					"SOP Date":lineItem[i].sopCreatedDate == null ? "":lineItem[i].sopCreatedDate,
					"SOP Due Date":lineItem[i].sopDueDate == null ? "":lineItem[i].sopDueDate,
					"SOP Gr Date":lineItem[i].soGrDate == null ? "":lineItem[i].soGrDate,
					"Status":lineItem[i].status == null ? "":lineItem[i].status,				
					"Customer Name":lineItem[i].customer==null?"":lineItem[i].customer.firstName,
					"Phone No":lineItem[i].customer==null?"":lineItem[i].customer.mobileOne,					
					"Raised By":lineItem[i].raisedBy == null ? "":lineItem[i].raisedBy		
                	});
			   }
               var opts = [{sheetid:'Small_Order_Listing_Report',header:true}];
               var res = alasql('SELECT * INTO XLSX("Small_Order_Listing_Report'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
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
