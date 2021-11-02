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
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

//on load lov's
var onLoadLov = function(){
$.getJSON('/OrderExecution/api/v1/salesReturnLocationWiseOrStoreWiseLOV', function(data) {
		var materialTypes = data.payload.materialTypes;
		
		var mTypeArray = [];
		$.each(materialTypes,function(k,v){
			if(v != "Raw Material" && v != "Services" && v != "FAS Service" && v != "Others" ){
				mTypeArray.push(v);
			}
		});
		
		// Vendor Lov
		var v = '<select id="materialTypeSObj"  name="materialTypeSObj" class="form-control" multiple="multiple">';
		$.each(mTypeArray, function(key, val) {
			v += '<option value="' + val.id + '">' + val.name + '</option>'; 
		});
			
		v += '</select>';
		$("#materialTypeS").html(v);
		$("#materialTypeSObj").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	});
}
onLoadLov();

$("#storeDCS").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/salesReturnLocationWiseOrStoreWiseLOV?storeOrDcType='+$("#storeDCS").val(), function(data) {
		$('#storeDcNameS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.storeOrDcNames, function(key, val) {
			$('#storeDcNameS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	});
});

//Field Filters
var salesReturnFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var storeDCS = $('#storeDCS').val();
	var storeDcNameS = $('#storeDcNameS').val();
	var materialTypeS = $("#materialTypeS").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (storeDCS != "" && storeDCS != null) {
		fieldFilters.fieldFilters["storeOrDcType"] = storeDCS;
	}
	if (storeDcNameS != "" && storeDcNameS != null) {
		fieldFilters.fieldFilters["storeOrDcId"] = storeDcNameS;
	}
	var materialTypeSObj = $('#materialTypeSObj').val();
	if (materialTypeSObj == null || materialTypeSObj == "") {
		var matTypeS = "";
	} else {
		var matTypeS = materialTypeSObj.join(",");
	}
	if (matTypeS != "" && matTypeS != null) {
		fieldFilters.fieldFilters["materialTypeList"] = matTypeS;
	}
	return fieldFilters;
}


var dataArr = [];
$("#jqxgrid").bind('cellendedit', function (event,index) {
	var i =event.args.rowindex;
	    if (event.args.value) {
	      $("#jqxgrid").jqxGrid('selectrow', event.args.row);
	        dataArr.push(i);
	       $(".tabDisabledS").removeClass("tabDisabled2");
	   	    }
	    else {
	        $("#jqxgrid").jqxGrid('unselectrow', event.args.row);
	        var delArr = dataArr.splice(i,1);
	    }
	    if($("#jqxgrid").jqxGrid("getselectedrowindexes") <= 0)
		{
	    	$(".tabDisabledS").addClass("tabDisabled2");
		}
	    $.each(dataArr, function(key, val) {
	    		var data =$("#jqxgrid").jqxGrid('getrowdata',val);
	    });
	});

function selectedCheckBox(){
	var dataArr1 = [];
	var srData =  $("#jqxgrid").jqxGrid("getrows");
		$.each(srData, function(key, val) {
			if(val.flag == true){
			//dataArr1.push(val.srNumber);
			dataArr1.push({
				 "saleBillReturnNo" :val.srNumber,
				 "saleBillReturnSrlNo" : val.srSlNo
			 });
			}
		});
	return dataArr1;

	console.log(dataArr1);
	return dataArr1;
}


$("#gridTabs").hide();
function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};


$(".tabDisabledS").addClass("tabDisabled2");
$("#gridTabs").tabs({
	disabled:[]
});

function salesReturnSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'srDate','type' : 'date','map' : 'createdDate'},
		{'name' : 'srNumber','type' : 'long','map' : 'saleBillReturnNo'}, 
		{'name' : 'srSlNo','type' : 'long','map' : 'saleBillReturnSrlNo'},
		{'name' : 'sbNumber','type' : 'long','map' : 'saleBillNo'},
		{'name' : 'sbSlNo','type' : 'long','map' : 'saleBillSrlNo'},
		{'name' : 'segment','type' : 'string','map' : 'metalSegment'}, 
		{'name' : 'jewelType','type' : 'string','map' : 'jewelType'},
		{'name' : 'grossWt','type' : 'float','map' : 'grossWt'}, 
		{'name' : 'netWt','type' : 'float','map' : 'netWt'}, 
		{'name' : 'pcs','type' : 'int','map' : 'pcs'},
		{'name' : 'skinPurity','type' : 'float','map' : 'skinPurity'},
		{'name' : 'meltingPurity','type' : 'float','map' : 'meltingPurity'},
		{'name' : 'mcCharges','type' : 'float','map' : 'makingCharges'},
		{'name' : 'wastageWt','type' : 'float','map' : 'wastageWt'},
		{'name' : 'amount','type' : 'float','map' : 'netRoundOffValue'},
		

		{'name' : 'custId','type' : 'long','map' : 'customerId'},
		{'name' : 'custName','type' : 'string','map' : 'customerName'},
		{'name' : 'phoneNo','type' : 'string','map' : 'customerMobileNumber'},
		{'name' : 'flag','type' : 'string'},

        ];

	var columns = [
		{'text' : '','datafield' : '',cellsalign : 'center',columntype : 'checkbox',align : 'center','width' : '4%',sortable : false,editable:true,
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				console.log(newvalue);
				$('#jqxgrid').jqxGrid ('setcellvalue', row, 'flag',  newvalue);
			}
		},
		{'text' : 'flag','datafield' : 'flag','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},

		{'text' : 'Sales Return Date','datafield' : 'srDate','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Sales Return Number','datafield' : 'srNumber','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : true,groupable : true},
		{'text' : 'SR Sl No','datafield' : 'srSlNo','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : true,groupable : true},
		{'text' : 'Sale Bill No','datafield' : 'sbNumber','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Srl No','datafield' : 'sbSlNo','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Segment','datafield' : 'segment','width' : '6%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
		{'text' : 'Jewel Type','datafield' : 'jewelType','width' : '10%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
		{'text' : 'Gross Wt.','datafield' : 'grossWt','width' : '5%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Net Wt','datafield' : 'netWt','width' : '5%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Skin Purity','datafield' : 'skinPurity','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'Melting Purity','datafield' : 'meltingPurity','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'Making Charges','datafield' : 'mcCharges','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'} ,
		{'text' : 'Wastage Wt','datafield' : 'wastageWt','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Amount','datafield' : 'amount','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		
		{'text' : 'Cust Id','datafield' : 'custId','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'} ,
		{'text' : 'Customer Name','datafield' : 'custName','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Phone Number','datafield' : 'phoneNo','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		];
	showMyGrid(datafields, "/OrderExecution/api/v1/salesReturnLocationWiseOrStoreWiseDetails?portal=oe","list", columns,salesReturnFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
		columnsheight: 80,
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
	});
}

$("#search").on("click",function(){
   var fromDateS =	$("#fromDateS").val();
   var toDateS =	$("#toDateS").val();
   var materialTypeS =	$("#materialTypeSObj").val();
   if(fromDateS == null || fromDateS == "" || toDateS == null || toDateS == "" || materialTypeS == null || materialTypeS == ""){
		$.growl.error({
			message : "Please fill mandatory field.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		activaTab('tab0default');
		$("#gridTabs").show();
		salesReturnSearchGrid();
		$("#jqxgrid").show();
	}
});

$("#stoneDetails").click(function () {
	stoneGrid(data);
	$('#jqxgridStone').show();
	var valSlipNoArray;
	var valSlipNoArray = selectedCheckBox();
	console.log(valSlipNoArray);
	var params = 
	{"fieldFilters":
		{
		  "srList":valSlipNoArray
		}
	}
	postJSON('/OrderExecution/api/v1/salesReturnLocationWiseOrStoreWiseStoneDetails',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.stoneList;
			stoneGrid(data);
			$('#jqxgridStone').show();
		}else{
			stoneGrid();
			$('#jqxgridStone').show();
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});

var stoneGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'stoneSlNo','type' : 'long','map' : 'stoneSrlNo'}, 
			{'name' : 'stoneSeg','type' : 'string','map' : 'stoneSegment'},
			{'name' : 'stoneCat','type' : 'string','map' : 'stoneCat'},
			{'name' : 'stoneSubcat','type' : 'string','map' : 'stoneSubCat'},
			
			{'name' : 'cutGrade','type' : 'string','map' : 'cutGrade'}, 
			{'name' : 'clarity','type' : 'string','map' : 'clarity'},
			{'name' : 'color','type' : 'string','map' : 'color'}, 
			{'name' : 'wtCostRange','type' : 'string','map' : 'wtRange'}, 
			{'name' : 'uqc','type' : 'string','map' : 'stoneUom'},
			{'name' : 'stoneWt','type' : 'float','map' : 'stoneWt'},
			{'name' : 'stonePcs','type' : 'long','map' : 'stonePcs'},
			{'name' : 'stoneAmt','type' : 'float','map' : 'stoneValue'},
			{'name' : 'srNumb','type' : 'int','map' : 'saleBillReturnNo'}, 

		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStone").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
 	    statusbarheight: 30,
		columns : [
			{'text' : 'Sales Return No','datafield' : 'srNumb','width' : '8%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

			{'text' : 'Stone Srl No','datafield' : 'stoneSlNo','width' : '6%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
			{'text' : 'Stone Segment','datafield' : 'stoneSeg','width' : '10%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Stone Category','datafield' : 'stoneCat','width' : '10%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Sub Category Description','datafield' : 'stoneSubcat','width' : '15%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
		
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '7%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '7%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
			{'text' : 'Color','datafield' : 'color','width' : '7%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
			{'text' : 'Wt/Cost Range','datafield' : 'wtCostRange','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'UQC','datafield' : 'uqc','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Stone Wt','datafield' : 'stoneWt','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			{'text' : 'Stone Pcs','datafield' : 'stonePcs','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stone Amount','datafield' : 'stoneAmt','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		]
	});
}



$("#accDetails").click(function () {
	accGrid(data);
	$('#jqxgridAcc').show();
	var valSlipNoArray;
	var valSlipNoArray= selectedCheckBox();
	var params = 
	{"fieldFilters":
		{
			"srList":valSlipNoArray
		}
	}
	postJSON('/OrderExecution/api/v1/salesReturnLocationWiseOrStoreWiseAccDetails',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.accList;
			accGrid(data);
			$('#jqxgridAcc').show();
		}else{
			accGrid();
			$('#jqxgridAcc').show();
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});


var accGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 

			{'name' : 'accSlNo','type' : 'int','map' : 'accessorySrlNo'},
			{'name' : 'accMainCat','type' : 'string','map' : 'accessoryCat'},
			{'name' : 'accSubCat','type' : 'string','map' : 'accessorySubCat'}, 
			{'name' : 'accWt','type' : 'float','map' : 'accessoryWt'},
			{'name' : 'accPcs','type' : 'long','map' : 'accessoryPcs'},
			{'name' : 'accAmt','type' : 'float','map' : 'accessoryValue'},
			{'name' : 'accUqc','type' : 'string','map' : 'uom'}, 
			{'name' : 'srNumb','type' : 'int','map' : 'saleBillReturnNo'}, 
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
 	    statusbarheight: 30,
		columns : [
			{'text' : 'Sales Return No','datafield' : 'srNumb','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Sl No','datafield' : 'accSlNo','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Main Cat','datafield' : 'accMainCat','width' : '20%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Sub Cat Desc','datafield' : 'accSubCat','width' : '20%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Acc Wt','datafield' : 'accWt','width' : '15%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			{'text' : 'Acc Pcs','datafield' : 'accPcs','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'} ,
			{'text' : 'Acc Amount','datafield' : 'accAmt','width' : '15%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'UQC','datafield' : 'accUqc','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		]
	});
}

//Export Functionality
$("#export").on("click",function() {	
	var materialTypeS = $("#materialTypeS").val();
	
	var materialTypeSObj = $('#materialTypeSObj').val();
	if (materialTypeSObj == null || materialTypeSObj == "") {
		var matTypeS = "";
	} else {
		var matTypeS = materialTypeSObj.join(",");
	}
	
	 var rows = $("#jqxgrid").jqxGrid('getrows');
	 if(typeof rows == "undefined"){
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
		}
	 else{
		 $('#loading').show();
		fieldFilters = {
				"fieldFilters":{
					 "FromDate": $('#fromDateS').val(),
					 "ToDate": $('#toDateS').val(),
					 "storeOrDC": $('#storeDCS').val(),
					 "StoreDCId":$('#storeDcNameS').val(),
					 "MaterialType": matTypeS,
					"mode" : "excel",
					"reportName" : "RPT_Sales_Return_Location_Store_Wise_Report_Export"
					}
			}
		$.ajax({
			url : 'jasperReport',
			type : 'post',
			data : fieldFilters,
			contentType : "application/x-www-form-urlencoded",
			xhrFields : {
				responseType : "blob"
			},
			success : function(data) {
				console.log(data);
				$('#loading').hide();
				if (navigator.msSaveBlob) {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					navigator.msSaveBlob(file,'Sales_return_location_wise.xlsx');
				}else {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					var fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				}
			}
		});
	 }
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('salesReturnReport', 'bodySwitcher')"
});

