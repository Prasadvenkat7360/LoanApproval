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

$.date = function(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    console.log(month);
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;

    return date;
};

$.dateTo = function(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    console.log(month);
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;

    return date;
};


$("#store-lov").hide();
$("#region-lov").hide();
$("#saveMetalRate").hide();

var expensesFlag = [{
	"id" : true,
	"name": "Yes"
},{
	"id" : false,
	"name": "No"
}];

var bullionComissionFlag =  [{
	"id" : true,
	"name": "Yes"
},{
	"id" : false,
	"name": "No"
}];

var vatFlag =  [{
	"id" : true,
	"name": "Yes"
},{
	"id" : false,
	"name": "No"
}];
var manufactureLossFlag =  [{
	"id" : true,
	"name": "Yes"
},{
	"id" : false,
	"name": "No"
}];



$('#bullionComissionFlag').empty().append('<option value="" selected>--Select--</option>');
$('#expensesFlag').empty().append('<option value="" selected>--Select--</option>');
$('#vatFlag').empty().append('<option value="" selected>--Select--</option>');
$('#manufactureLossFlag').empty().append('<option value="" selected>--Select--</option>');

$.each(expensesFlag, function(key, val) {
$('#expensesFlag').append(
		'<option  value="' + val.id + '">' + val.name
				+ '</option>');
});

$.each(bullionComissionFlag, function(key, val) {
$('#bullionComissionFlag').append(
		'<option  value="' + val.id + '">' + val.name
				+ '</option>');
});

$.each(vatFlag, function(key, val) {
$('#vatFlag').append(
		'<option  value="' + val.id + '">' + val.name
				+ '</option>');
});

$.each(manufactureLossFlag, function(key, val) {
$('#manufactureLossFlag').append(
		'<option  value="' + val.id + '">' + val.name
				+ '</option>');
});

$('#metalSegment').on('change', function(){
	var metalSegment = $('#metalSegment option:selected').text();
	
	if(metalSegment == "Platinum"){
		$('#manuLossFlag').show();
		$('#manufactureLossLov').show();
	}else{
		$('#manuLossFlag').hide();
		$('#manufactureLoss').val('');
		$('#manufactureLossLov').hide();
		calculatePurchasePrice();
	}
});

var d = new Date();
var cDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();



$("#metalRateImpact").on("change", function() {
	var value = $('#metalRateImpact option:selected').val();
	if (value == "Region") {
		$("#region-lov").show();
		$("#store-lov").hide();
	} else if (value == "Store") {
		$("#store-lov").show();
		$("#region-lov").show();
		fillLov($('#region').val(), $('#store'), 'STORE_LOV', 'name');
	} else {
		$("#store-lov").hide();
		$("#region-lov").hide();
	}
});

$("#region").on("change", function() {
	if ($('#store').is(":visible")) {
		fillLov($('#region').val(), $('#store'), 'STORE_LOV', 'name');
	}
});

$("#store-lov-modal").hide();
$("#region-lov-modal").hide();

$("#metalRateImpactModal").on(
		"change",
		function() {
			$("#editgridmetalrate").hide();
			$("#saveMetalRate").hide(); 
			$("#savePurity").show();
			var value = $('#metalRateImpactModal option:selected').val();
			if (value == "Region") {
				$("#region-lov-modal").show();
				$("#store-lov-modal").hide();
			} else if (value == "Store") {
				$("#store-lov-modal").show();
				$("#region-lov-modal").show();
				fillLov($('#region_modal').val(), $('#store_modal'),
						'STORE_LOV', 'name');
			} else {
				$("#store-lov-modal").hide();
				$("#region-lov-modal").hide();
			}
		});

$("#region_modal").on(
		"change",
		function() {
			if ($('#store_modal').is(":visible")) {
				fillLov($('#region_modal').val(), $('#store_modal'),
						'STORE_LOV', 'name');
			}
		});

$("#metalSegment").on(
		"change",
		function() {
			fillLov($('#metalSegment').val(), $('#purity'), 'METAL_PURITY_LOV',
					'skinPurity');
		});


$("#savePurity").on("click",function() {
	trimmer();
			if (validateADDModalBox()) {
				postJSON('/OrderExecution/api/v1/addMetalRate', JSON
						.stringify(createMetalRateDto()), function(data) {
					$('#jqxgridp').jqxGrid('clear');
					
					console.log(data);
					addMetalRateGrid(data);
					$("#jqxgridp").jqxGrid("updatebounddata");
					$("#editgridmetalrate").show();
					//$("#savePurity").hide();
					$("#saveMetalRate").show();
					
				});
			} else {
				$.growl.error({
					message : "Please fill all the mandatory fields",
					duration : 10000
				});
			}

		});

$("#saveMetalRate")
		.on(
				'click',
				function() {
					trimmer();
					var metalRateDtolist = createMetalRateDtoFromGrid();
					if (metalRateDtolist) {
						postJSON(
								'/OrderExecution/api/v1/saveMetalRate',
								JSON.stringify(metalRateDtolist),
								function(data) {

									if (data.resCode == 1) {
										$('#jqxgridp').jqxGrid('clear');
										$('#metalRateModal').modal('hide');
										$.growl
												.notice({
													message : data.mesgStr,
													duration : 10000,
													title : 'Success'
												});

									} else if(data.resCode == 3){
										$.growl.error({
													message :  data.mesgStr,
													duration : 10000,
													title : 'Error'
												});

									}
									return false;
								});
						
					} else {
						$.growl
								.error({
									message : "Please fill all the Added value column.Value must be greater than 0",
									duration : 10000
								});
					}
				});

$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$('#pendingMelting').trigger("reset");
	$("#saveMetalRate").hide();

});

$("#addmetalrate").on('click', function() {
	$("#editgridmetalrate").hide();
	$("#saveMetalRate").hide(); 
	
});



function fillLov(id, $lov, crt, displayKey) {
	//filling data in store
	if (id != "") {
		$.getJSON('/OrderExecution/api/v1/MetalRateLOV?criteria=' + crt
				+ '&id=' + id, function(data) {
			$lov.empty()
					.append('<option value="" selected>--Select--</option>');
			//iterate over the data and append a select option
			$.each(data.payload[crt], function(key, val) {
				console.log(key);
				$lov.append('<option value="' + val.id + '">' + val[displayKey]
						+ '</option>');
			});
			
		});
	} else {
		$lov.empty().append('<option value="" selected>--Select--</option>');
	}
}


var datafields = [ {
	'name' : 'regionName',
	'type' : 'string'
},{
	'name' : 'storeName',
	'type' : 'string'
},{
	'name' : 'metalSegment',
	'type' : 'string'
},{
	'name' : 'skinPurity',
	'type' : 'double'
},{
	'name' : 'meltingPurity',
	'type' : 'double'
},{
	'name' : 'startDate',
	'type' : 'date'
},{
	'name' : 'endDate',
	'type' : 'date'
},{
	'name' : 'basicPurchaseRate',
	'type' : 'double'
}, {
	'name' : 'bullionCommission',
	'type' : 'double'
},{
	'name' : 'addExpenses',
	'type' : 'double'
},{
	'name' : 'vat',
	'type' : 'double'
},{
	'name' : 'manufacturingLoss',
	'type' : 'double'
},{
	'name' : 'purchaseRate',
	'type' : 'double'
},{
	'name' : 'addedValue',
	'type' : 'double'
},{
	'name' : 'sellingRate',
	'type' : 'double'
},{
	'name' : 'regionid',
	'type' : 'long'
},{
	'name' : 'storeid',
	'type' : 'long'
},{
	'name' : 'metalSegmentid',
	'type' : 'long'
},{
	'name' : 'metalpurityid',
	'type' : 'long'
},{
	'name' : 'Cust.Purch Rate/Gm',
	'type' : 'long'
},{
	'name' : 'custPurchaseRate',
	'type' : 'double'
} ];

var columns = [ {
	'text' : 'Region',
	'datafield' : 'regionName',
	cellsalign: 'center',
	align:'center', 
	'width' : '8%',
	sortable : false,
	editable : false
}, {
	'text' : 'Store',
	'datafield' : 'storeName',
	cellsalign: 'center',
	align:'center', 
	'width' : '9%',
	sortable : false,
	editable : false
}, {
	'text' : 'Metal Segment',
	'datafield' : 'metalSegment',
	cellsalign: 'center',
	align:'center', 
	'width' : '8%',
	sortable : false,
	editable : false
},{
	'text' : 'Skin Purity',
	'datafield' : 'skinPurity',
	'width' : '6%',
	sortable : false,
	cellsalign: 'right',
	align:'center', 
	editable : false,
	cellsformat: 'd2'
}, {
	'text' : 'Melting Purity',
	'datafield' : 'meltingPurity',
	'width' : '8%',
	sortable : false,
	cellsalign: 'right',
	align:'center', 
	editable : false,
	cellsformat: 'd2'
}, {
	'text' : 'From Date',
	'datafield' : 'startDate',
	'width' : '8%',
	sortable : false,
	cellsformat: 'dd/MM/yyyy',
	cellsalign: 'right',
	align:'center', 
	editable : false,
}, {
	'text' : 'To Date',
	'datafield' : 'endDate',
	'width' : '8%',
	sortable : false,
	cellsformat: 'dd/MM/yyyy',
	cellsalign: 'right',
	align:'center', 
	editable : false
}, {
	'text' : 'Basic Purchase Price/Gm',
	'datafield' : 'basicPurchaseRate',
	'width' : '6%',
	cellsalign: 'right',
	align:'center', 
	sortable : false,
	editable : false,
	cellsformat: 'd2'
}, {
	'text' : 'Bullion Dealer Commission %',
	'datafield' : 'bullionCommission',
	'width' : '7%',
	sortable : false,
	cellsalign: 'right',
	align:'center', 
	editable : false,
	cellsformat: 'd2'
}, {
	'text' : 'Add Expenses %',
	'datafield' : 'addExpenses',
	'width' : '6%',
	sortable : false,
	cellsalign: 'right',
	align:'center', 
	editable : false,
	cellsformat: 'd2'
}, {
	'text' : 'Add Tax %',
	'datafield' : 'vat',
	'width' : '7%',
	sortable : false,
	cellsalign: 'right',
	align:'center', 
	editable : false,
	cellsformat: 'd2'
}, {
	'text' : ' Manufactured Loss',
	'datafield' : 'manufacturingLoss',
	'width' : '7%',
	sortable : false,
	cellsalign: 'right',
	align:'center', 
	editable : false,
	cellsformat: 'd2'
}, {
	'text' : 'Purch Price/Gm',
	'datafield' : 'purchaseRate',
	'width' : '7%',
	sortable : false,
	cellsalign: 'right',
	align:'center', 
	editable : false,
	cellsformat: 'd2'
}, {
	'text' : 'Added value %',
	'datafield' : 'addedValue',
	'width' : '7%',
	sortable : false,
	cellsalign: 'right',
	align:'center', 
	editable : false,
	cellsformat: 'd2'
}, {
	'text' : 'Selling Rate/gm',
	'datafield' : 'sellingRate',
	'width' : '7%',
	sortable : false,
	editable : false,
	cellsalign: 'right',
	align:'center', 
	cellsformat: 'd2'
},

{
	'text' : 'regionid',
	'datafield' : 'regionid',
	hidden : true,
	'width' : '5%',
},

{
	'text' : 'storeid',
	'datafield' : 'storeid',
	hidden : true,
	'width' : '5%',
},

{
	'text' : 'metalSegmentid',
	'datafield' : 'metalSegmentid',
	hidden : true,
	'width' : '5%',
},

{
	'text' : 'metalpurityid',
	'datafield' : 'metalpurityid',
	hidden : true,
	'width' : '5%',
}, {
	'text' : 'Cust Pur Rate Per Gm',
	'datafield' : 'custPurchaseRate',
	'width' : '7%',
	sortable : false,
	cellsformat : 'd2',
	cellsalign: 'right',
	align:'center', 
	editable : false
},];

var addrow = function(rowid, rowdata, position, commit) {
	commit(true);
}

/* Grid Section Started */
function metalRateGrid() {
	columns[11]['editable'] = false;
	showMyGrid(datafields, "/OrderExecution/api/v1/SearchMetalRate ", "list",
			columns, metalRateFilterValues(), "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
     	columnsheight: 80,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
	
}


/* Add Metal Section Started */
function addMetalRateGrid(data) {
	var updateRows = function(rowid, newdata, commit) {
		if (newdata['addedValue'] && !isNaN(newdata['addedValue'])) {
			var sellingR = calculateSellingRate(newdata['purchaseRate'],
					newdata['addedValue'])
			sellingR = parseFloat(sellingR);
			$("#jqxgridp").jqxGrid('setcellvalue', rowid, 'sellingRate', sellingR);

		} else {
			$("#jqxgridp").jqxGrid('setcellvalue', rowid, 'addedValue', 0.00);
			$("#jqxgridp").jqxGrid('setcellvalue', rowid, 'sellingRate', 0.00);
		}
		commit(true);
	}	
	var popcolumns = [ 
	{
		'text' : 'Skin Purity',
		'datafield' : 'skinPurity',
		cellsalign: 'right',
		align:'center', 
		'width' : '15%',
		cellsformat : 'd2',
		editable : false
	},  {
		'text' : 'Basic Purc Price/Gm',
		'datafield' : 'basicPurchaseRate',
		cellsalign: 'right',
		align:'center', 
		'width' : '15%',
		'height' : '20px',
		cellsformat : 'd2',
		sortable : false,
		editable : false
	}, {
		'text' : 'Purch Price/Gm',
		'datafield' : 'purchaseRate',
		'width' : '15%',
		cellsalign: 'right',
		align:'center', 
		'height' : '20px',
		cellsformat : 'd2',
		sortable : false,
		editable : false
	}, {
		'text' : 'Added value %',
		'datafield' : 'addedValue',
		'width' : '15%',
		'height' : '20px',
		cellsalign: 'right',
		align:'center', 
		cellsformat : 'd2',
		sortable : false,
		editable : true
	}, {
		'text' : 'Selling Rate/gm',
		'datafield' : 'sellingRate',
		'width' : '20%',
		cellsalign: 'right',
		align:'center', 
		'height' : '20px',
		cellsformat : 'd2',
		sortable : false,
		editable : false
		
	}, {
		'text' : 'Cust Pur Rate Per Gm',
		'datafield' : 'custPurchaseRate',
		'width' : '20%',
		cellsalign: 'right',
		align:'center', 
		'height' : '20px',
		cellsformat : 'd2',
		sortable : false,
		editable : false
		
	},

	{
		'text' : 'Manufacturing Loss',
		'datafield' : 'manufacturingLoss',
		hidden : true
	},

	{
		'text' : 'VAT',
		'datafield' : 'vat',
		hidden : true
	},

	{
		'text' : 'Add Expenses',
		'datafield' : 'addExpenses',
		hidden : true
	},

	{
		'text' : 'Bullion Comm',
		'datafield' : 'bullionCommission',
		hidden : true
	},

	{
		'text' : 'Melting Purity',
		'datafield' : 'meltingPurity',
		hidden : true
	},

	{
		'text' : 'Metal Seg',
		'datafield' : 'metalSegment',
		hidden : true
	},

	{
		'text' : 'Region Name',
		'datafield' : 'regionName',
		hidden : true
	},

	{
		'text' : 'Store Name',
		'datafield' : 'storeName',
		hidden : true
	},

	{
		'text' : 'Region Id',
		'datafield' : 'regionid',
		hidden : true
	},

	{
		'text' : 'Store Id',
		'datafield' : 'storeid',
		hidden : true
	},

	{
		'text' : 'Metal Seg Id',
		'datafield' : 'metalSegmentid',
		hidden : true
	},

	{
		'text' : 'Metal Purity Id',
		'datafield' : 'metalpurityid',
		hidden : true
	} ];

	var addrow = function(rowid, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, popcolumns, updateRows, data, addrow, "#jqxgridp")
}

$('input:text:visible:first').focus();

function metalRateFilterValues() {
	fieldFilters = {
		"fieldFilters" : {}
	};
	var region = $("#region").val();
	var store = $("#store").val();
	var metalSegmentId = $("#metalSegmentId").val();
	var metalRateDateFrom = $("#metalRateDateFrom").val();
	var metalRateDateTo = $("#metalRateDateTo").val();
	fieldFilters = {
			"fieldFilters" : {}
		};
	
	
	if(region != "" && region != null){			
		fieldFilters.fieldFilters["region"] = region;
	}
	if(store != "" && store != null){
		fieldFilters.fieldFilters["store"] = store;
	}
	
	if(metalRateDateFrom != "" && metalRateDateFrom != null){
		fieldFilters.fieldFilters["fromDate"] = metalRateDateFrom;
	}
	
	if(metalRateDateTo != "" && metalRateDateTo != null){
		fieldFilters.fieldFilters["toDate"] = metalRateDateTo;
	}
	
	if(metalSegmentId != "" && metalSegmentId != null){
		fieldFilters.fieldFilters["metalSegmentId"] = metalSegmentId;
	}
	return fieldFilters;
}

function validateNumber(val) {
	console.log(val);
	var regex = /^\d{0,2}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}

function validateNumeric(val) {
	if (val && !isNaN(val)) {
		return parseFloat(val) < 0? '': parseFloat(val).toFixed(2);
	}
	return '';
}


function calculatePurchasePrice() {
	var basicPurchasePrice = $('#basicPurchase').val();
	var bullionDealerComm = $('#bullionDealer').val();
	var exp = $('#expPerc').val();
	var tax = $('#taxPerc').val();
	var manufacturingLoss = $('#manufactureLoss').val();
	
	
	var flag = basicPurchasePrice != '';
	flag = flag && bullionDealerComm != '';
	flag = flag && exp != '';
	flag = flag && tax != '';
//	flag = flag && manufacturingLoss != '';
	if (!flag) {
		$('#purchPrice').val('');
		return;
	}

	basicPurchasePrice = parseFloat($('#basicPurchase').val());
	bullionDealerComm = parseFloat($('#bullionDealer').val());
	exp = parseFloat($('#expPerc').val());
	tax = parseFloat($('#taxPerc').val());
	if(manufacturingLoss == "" || manufacturingLoss == "undefined"){
		manufacturingLoss = 0.00;
	}else{
		manufacturingLoss = parseFloat($('#manufactureLoss').val());
	}
	
	
	// calculation purchase price.
	var purchasePrice = parseFloat(basicPurchasePrice
			+ (basicPurchasePrice * ((bullionDealerComm + exp + tax + manufacturingLoss) / 100)));
	console.log("purchasePrice" + purchasePrice);
	// rounding to two decimal
	purchasePrice = round(purchasePrice, 2);
	$('#purchPrice').val(purchasePrice);
}

function calculateSellingRate(purchasePrice, addedValue) {
	purchasePrice = parseFloat(purchasePrice);
	addedValue = parseFloat(addedValue);
	// calculation purchase price.
	var sellingRate = parseFloat(purchasePrice
			+ (purchasePrice * (addedValue / 100)));
	console.log(sellingRate);
	// rounding to two decimal
	sellingRate = round(sellingRate, 2);
	console.log('Selling rate ' + sellingRate);
	return sellingRate;
}

function validateADDModalBox() {
	var basicPurchasePrice = $('#basicPurchase').val();
	var bullionDealerComm = $('#bullionDealer').val();
	var exp = $('#expPerc').val();
	var tax = $('#taxPerc').val();
	var manufacturingLoss = $('#manufactureLoss').val();
	var purchPrice = $('#purchPrice').val();
	var purity = $('#purity').val();
	var metalSegment = $('#metalSegment').val();
	var metalRateImpactModal = $('#metalRateImpactModal').val();
	var region_modal = $('#region_modal').val();
	var expensesFlag = $('#expensesFlag').val();
	var bullionComissionFlag = $('#bullionComissionFlag').val();
	var vatFlag = $('#vatFlag').val();
	var manufactureLossFlag = $('#manufactureLossFlag').val();
	
	var flag = basicPurchasePrice != '' && parseFloat(basicPurchasePrice)> 0;
	flag = flag && bullionDealerComm != '';
	flag = flag && exp != '';
	if($('#metalSegment').val() == "3"){
		flag = flag && manufacturingLoss != '';
	}
	flag = flag && purchPrice != '';
	flag = flag && purity != '';
	flag = flag && metalSegment != '';
	flag = flag && metalRateImpactModal != '';
	flag = flag && expensesFlag != '';
	flag = flag && bullionComissionFlag != '';
	flag = flag && vatFlag != '';
	if(metalSegment == "3"){		
		flag = flag && manufactureLossFlag != '';
	}
	flag = flag && region_modal != '';
	if (flag) {
		if (metalRateImpactModal == 'Store') {
			flag = flag && $('#store_modal').val() != '';
		}
	}

	return flag;

}




function round(value, decimals) {
	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function createMetalRateDto() {
	
	var metalRateDto = {
		"basicPurchaseRate" : $("#basicPurchase").val(),
		"bullionCommission" : $("#bullionDealer").val(),
		"addExpenses" : $("#expPerc").val(),
		"vat" : $("#taxPerc").val(),
		"purchaseRate" : $("#purchPrice").val(),
		"skinPurity" : $("#purity option:selected").text(),
		"metalpurityid" : $("#purity").val(),
		"metalSegment" : $("#metalSegment option:selected").text(),
		"metalSegmentid" : $("#metalSegment").val(),
		"regionName" : $("#region_modal option:selected").text(),
		"regionid" : $("#region_modal").val(),
		"storeName" :  $('#store-lov-modal').is(":visible")? $("#store_modal option:selected").text():'',
		"storeid" :  $('#store-lov-modal').is(":visible")? $("#store_modal").val():'',
		"manufacturingLoss" : ($('#metalSegment option:selected').text() == "Platinum") ? $("#manufactureLoss").val() : "",
		"bullionComissionFlag" : $("#bullionComissionFlag").val(),
		"expensesFlag" : $("#expensesFlag").val(),
		"vatFlag" : $("#vatFlag").val(),
		"manufactureLossFlag" : ($('#metalSegment option:selected').text() == "Platinum") ? $("#manufactureLossFlag").val() : false
	}
	return metalRateDto;
}

function createMetalRateDtoFromGrid() {
	var metalRateDtolist = [];
	var rows = $('#jqxgridp').jqxGrid('getrows');
	debugger;
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		 if(row.addedValue == "")
		 {  
			continue; 
		 }
		if (parseFloat(row.addedValue) <= 0) {
			return null
		}
		var manufactureLossFlag = $('#manufactureLossFlag').val();
		/*if($('#metalSegment option:selected').text() == "Platinum" && manufactureLossFlag == "true" ){
			var manufacturingLoss = row.manufacturingLoss;
		}else{
			var manufacturingLoss = "";
		}
		*/
		
		if($('#metalSegment option:selected').text() == "Platinum")
			metalRateDtolist.push({
				"basicPurchaseRate" : row.basicPurchaseRate,
				"bullionCommission" : row.bullionCommission,
				"addExpenses" : row.addExpenses,
				"vat" : row.vat,
				"purchaseRate" : row.purchaseRate,
				"skinPurity" : row.skinPurity,
				"metalpurityid" : row.metalpurityid,
				"metalSegment" : row.metalSegment,
				"metalSegmentid" : row.metalSegmentid,
				"regionName" : row.regionName,
				"regionid" : row.regionid,
				"storeName" : row.storeName,
				"custPurchaseRate" : row.custPurchaseRate,
				"storeid" : row.storeid,
				"manufacturingLoss" :  row.manufacturingLoss,
				"addedValue" : row.addedValue,
				"sellingRate" : row.sellingRate,
				"expensesFlag" : $('#expensesFlag').val(),
				"bullionComissionFlag" : $('#bullionComissionFlag').val(),
				"vatFlag" : $('#vatFlag').val(),
				"manufactureLossFlag" : $('#manufactureLossFlag').val(),
				"startDate" : $("#startDateC").val(),
				"endDate" : $("#endDateC").val()
			})
		else
			metalRateDtolist.push({
				"basicPurchaseRate" : row.basicPurchaseRate,
				"bullionCommission" : row.bullionCommission,
				"addExpenses" : row.addExpenses,
				"vat" : row.vat,
				"purchaseRate" : row.purchaseRate,
				"skinPurity" : row.skinPurity,
				"metalpurityid" : row.metalpurityid,
				"metalSegment" : row.metalSegment,
				"metalSegmentid" : row.metalSegmentid,
				"regionName" : row.regionName,
				"regionid" : row.regionid,
				"storeName" : row.storeName,
				"custPurchaseRate" : row.custPurchaseRate,
				"storeid" : row.storeid,
				"manufacturingLoss" :  row.manufacturingLoss,
				"addedValue" : row.addedValue,
				"sellingRate" : row.sellingRate,
				"expensesFlag" : $('#expensesFlag').val(),
				"bullionComissionFlag" : $('#bullionComissionFlag').val(),
				"vatFlag" : $('#vatFlag').val(),
				"startDate" : $("#startDateC").val(),
				"endDate" : $("#endDateC").val()
			})

	}
	return metalRateDtolist;
}

$(function() {
	$("#metalRateDateFrom").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		maxDate :0,
		onSelect : function(dateStr) {
			var min = $(this).datepicker('getDate'); // Get selected date
			$("#metalRateDateTo").datepicker('option', 'minDate', min || '0'); // Set other min, default to today
			
		}
	});
	$("#metalRateDateTo").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		maxDate :0
	});
});	

//Export Recort as per search criteria
$("#export").on("click", function() {		
	
	var data;
	var newData = [];
	var region = $("#region").val();
	var store = $("#store").val();
	var metalSegmentId = $("#metalSegmentId").val();
	var metalRateDateFrom = $("#metalRateDateFrom").val();
	var metalRateDateTo = $("#metalRateDateTo").val();
	fieldFilters = {
			"fieldFilters" : {}
		};
	
	
	if(region != "" && region != null){			
		fieldFilters.fieldFilters["region"] = region;
	}
	if(store != "" && store != null){
		fieldFilters.fieldFilters["store"] = store;
	}
	
	if(metalRateDateFrom != "" && metalRateDateFrom != null){
		fieldFilters.fieldFilters["fromDate"] = metalRateDateFrom;
	}
	
	if(metalRateDateTo != "" && metalRateDateTo != null){
		fieldFilters.fieldFilters["toDate"] = metalRateDateTo;
	}
	
	if(metalSegmentId != "" && metalSegmentId != null){
		fieldFilters.fieldFilters["metalSegmentId"] = metalSegmentId;
	}

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
	    postJSON('/OrderExecution/api/v1/exportMetalRate',JSON.stringify(fieldFilters),function(response) {
	    if(response != null){
	 	data = response.payload.list;
	    for (i = 0; i < data.length; i++) {
		newData.push({
			        'Store Id' :  (data[i].storeid  != null) ? data[i].storeid  : "",
			        'Store Name' :  (data[i].storeName  != null) ? data[i].storeName  : "",
			        'Region Id' :  (data[i].regionid  != null) ? data[i].regionid  : "",		
					'Region Name' :  (data[i].regionName  != null) ? data[i].regionName  : "",
					'Metal Segment Id' : (data[i].metalSegmentid != null) ? data[i].metalSegmentid : "",
					'Metal Segment Name' : (data[i].metalSegment != null) ? data[i].metalSegment : "",
					'Metal Purity Id' : (data[i].metalpurityid != null) ? data[i].metalpurityid : "",	
					'Skin Purity':   (data[i].skinPurity != null) ? data[i].skinPurity : "",
					'Melting Purity': (data[i].meltingPurity != null) ? data[i].meltingPurity : "",	
					'From Date': data[i].startDate,	
					'To Date': data[i].endDate,	
					'Basic Purchase Rate':   (data[i].basicPurchaseRate != null) ? data[i].basicPurchaseRate : "",
					'Bullion Commission':  (data[i].bullionCommission != null) ? data[i].bullionCommission : "",	
					'Add Expenses':  (data[i].addExpenses != null) ? data[i].addExpenses : "",
					'Manufacturing Loss':  (data[i].manufacturingLoss != null) ? data[i].manufacturingLoss : "",
					'Vat %':   (data[i].vat != null) ? data[i].vat : "",
					'Purchase Rate':   (data[i].purchaseRate != null) ? data[i].purchaseRate: "",		
					'Added Value':   (data[i].addedValue != null) ? data[i].addedValue : "",		
					'Selling Rate' : (data[i].sellingRate != null) ? data[i].sellingRate : "",			
					'Cust Purchase Rate': (data[i].custPurchaseRate != null) ? data[i].custPurchaseRate : "",
		    });				
	    }
	   //JSONToCSVConvertor(newData,	"Metal Rate" + "_" + sysdate, true);	
	    var opts = [{sheetid:'Metal_Rate',header:true}];
        var res = alasql('SELECT * INTO XLSX("Metal Rate_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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



$('.modal').on('hidden.bs.modal', function(){
    $(this).find('form')[0].reset();
    $("#jqxgridp").jqxGrid('clear');
    $('#jqxgridp').hide();
});
$('#metalRateCreate').on('click', function(){
	$.getJSON('/OrderExecution/api/v1/currentDateTime',function(data) {
			$('#startDateC').val(data.date);
	});
	$("input[type=text], input[type=number], input[type=radio], textarea, select").val("");
	$('#jqxgridp').show();
});

/*$("#endDateC").datepicker(
	{ 
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		minDate :0,
		onSelect : function(dateStr) {
		var d = new Date(); // for now
			datetext = dateStr + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
				$('#endDateC').val(datetext);
			  }
	 });*/

$("#endDateC").datepicker(
		{ 
			changeMonth : true,
			changeYear : true,
			dateFormat : "dd/mm/yy",
			minDate :0,
			onSelect : function(dateStr) {
				var end = moment().endOf('day');
				var d = end._d;
				var dateStr = dateStr + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
					$('#endDateC').val(dateStr);
			}
		 });

$("#endDateC").on('blur',function(){
	var stDate = $("#startDateC").val();
	var eDate = $("#endDateC").val();
	 if(stDate == "" || stDate == null){
		 $.growl.error({
			 message  : "Please Select Start Date !!",
			 duration :  10000,
			 title : 'Error'
		 });
		 return false;	 
	 }	 
});



//field filters 
var metalRateFieldFilters = function() {
	var metalRateC = {
		"fieldFilters" : {
			"metalPurityId" :  $("#purity").val(),
			"storeId" :   $("#store_modal").val()
			}
	}
	return metalRateC;
 }

$("#purity").on('change',function(){
	var metalRateImpactModal = $("#metalRateImpactModal").val();
	var storeId = $("#store_modal").val();
	var purityId = $("#purity").val();
	console.log(storeId);
	console.log(purityId);
	 if(metalRateImpactModal == "Store"){
		 var metalRateDetC = metalRateFieldFilters();
		 if (metalRateDetC) {
			 postJSON('/OrderExecution/api/v1/getEndDateForStore',JSON.stringify(metalRateDetC),function(data) {
				 if(data.resCode == "1"){
					 var result = data.payload.endDateEnableFlag;
					 var eDate = data.payload.endDate;
					 	if(result == "Yes"){
					 		$("#endDateC").val(eDate);
					 		$("#endDateC").prop('disabled', false);
					 	}
					 	else{
					 		$("#endDateC").val(eDate);
					 		$("#endDateC").prop('disabled', false);
					 	}
				 }
		   });
       }
	 }
	 else{
		 
	 }
	 
});

//####################################### Validation is Started #############################################
