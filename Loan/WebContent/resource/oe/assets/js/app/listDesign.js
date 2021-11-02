/**
 * ## AUTHOR : Manaronjan ## AUTHOR 2: DIPANKAR NAHA ## DATE : 18-02-2017 ## MODIFIED
 * DATE : 13-02-2017 ## DESCRIPTION : SCRIPT TO CREATE STORE MASTER
 */
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


$('#lineItemShowHide').hide();
var showHide= function(key){
	$('#lineItemShowHide').toggle();
	console.log(orderItems);
}
$.date = function(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;

    return date;
};

// ################################# LIST DESIGN GRID STARTED ##############################################
var listDesignGrid = function(){
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ {
		
	
		'name' : 'orderSource',
		'type' : 'string',
		'map' : 'SourceDcOrStore'
	}, {
		'name' : 'orderType',
		'type' : 'string',
		'map' : 'orderTypevalue'
	}, {
		'name' : 'orderNo',
		'type' : 'string',
		'map' : 'orderItem>order>id'
	}, {
		'name' : 'dueDate',
		'type' : 'date'
	}, {
		'name' : 'orderStatusDate',
		'type' : 'date',
		'map' : 'orderItem>order>orderStatusDate'
	}, {
		'name' : 'orderItems',
		'type' : 'array'
	}, {
		'name' : 'serialNumber',
		'type' : 'int',
		'map' : 'orderItem>serialNumber'
	}, {
		'name' : 'metalSegment',
		'type' : 'string',
		'map' : 'orderItem>segment>description'
	}, {
		'name' : 'jewelType',
		'type' : 'long',
		'map' : 'orderItem>jewelType>description'
	}, {
		'name' : 'articleDescription',
		'type' : 'string',
		'map' : 'orderItem>articleDescription'
	}, {
		'name' : 'numOfVariations',
		'type' : 'string'
	}, {
		'name' : 'designerName',
		'type' : 'string',
		'map' : 'designerName'
	}, {
		'name' : 'designReleaseDate',
		'type' : 'date',
		'map' : 'releaseDate'
	}, {
		'name' : 'orderDueDate',
		'type' : 'date',
		'map' : 'orderItem>order>dueDate'		
	}, {
		'name' : 'designStatusValue',
		'type' : 'string'
	}, {
		'name' : 'isDesignReqd',
		'type' : 'boolean',
		'map': 'orderItem>isDesignReqd'
	}, {
		'name' : 'storeName',
		'type' : 'string',
		'map' : 'orderItem>order>store>name'
	}, {
		'name' : 'dcName',
		'type' : 'string',
		'map' : 'orderItem>order>dc>name'
	}, {
		'name' : 'created',
		'type' : 'string'
	}];

	var columns = [ {
		'text' : 'Source',
		'datafield' : 'orderSource',
		'width' : '4%',
		cellsalign: 'center',
		align:'center', 
		editable : false,
		sortable : false
	}, {
		'text' : 'Order Type',
		'datafield' : 'orderType',
		'width' : '6%',
		cellsalign: 'center',
		align:'center', 
		editable : false,
		sortable : false
	},{
		'text' : 'Order No.',
		'datafield' : 'orderNo',
		'width' : '5%',
		cellsalign: 'center',
		align:'center', 
		editable : false,
		sortable : true
	},{
		text : 'Order Sl No',
		datafield : 'serialNumber',
		cellsalign: 'center',
		editable : false,
		align:'center', 
		width : "4%"
	}, {
		'text' : 'Design Due Dt.',
		'datafield' : 'dueDate',
		'width' : '6%',
		editable : false,
		cellsalign: 'center',
		align:'center', 
		sortable : false,
		cellsformat : 'dd/MM/yyyy'
	}, {
		text : 'Seg',
		datafield : 'metalSegment',
		cellsalign: 'center',
		editable : false,
		align:'center', 
		width : "5%"
	}, {
		text : 'Order Jewel Type Name',
		datafield : 'jewelType',
		cellsalign: 'center',
		editable : false,
		align:'center', 
		width : "7%"
	}, {
		text : 'Article Description',
		datafield : 'articleDescription',
		cellsalign: 'left',
		editable : false,
		align:'center', 
		width : "10%"
	}, {
		text : 'No. of Variation',
		datafield : 'numOfVariations',
		cellsalign: 'center',
		editable : false,
		align:'center', 
		width : "5%"
	}, {
		text : 'Order Due Dt.',
		datafield : 'orderDueDate',
		cellsformat : 'dd/MM/yyyy',
		cellsalign: 'center',
		editable : false,
		align:'center', 
		width : "6%"
	}, {
		text : 'Designer Name',
		datafield : 'designerName',
		width : "5%",
		editable : false,
		cellsalign: 'center',
		align:'center'
	}, {
		'text' : 'Design Release Dt.',
		'datafield' : 'designReleaseDate',
		'width' : '5%',
		cellsalign: 'center',
		align:'center', 
		cellsformat : 'dd/MM/yyyy',
		editable : false,
		sortable : false
	}, {
		text : 'Design Status',
		datafield : 'designStatusValue',
		cellsalign: 'center',
		editable : false,
		align:'center', 
		width : "5.5%"
	}, {
		text : 'Cust Approve Req',
		datafield : 'isDesignReqd',
		editable : false,
		cellsalign: 'center',
		align:'center', 
		width : "6%"
	}, {
		text : 'Store Name',
		datafield : 'storeName',
		cellsalign: 'center',
		align:'center', 
		editable : false,
		width : "6%"
	}, {
		text : 'DC Name',
		datafield : 'dcName',
		cellsalign: 'center',
		align:'center',
		editable : false,
		width : "8.5%"
	}, {
		text : 'Order Created By',
		datafield : 'created',
		cellsalign: 'center',
		align:'center', 
		editable : false,
		width : "6%"
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchPendingDesignWithDesigner?page=search",
			"list", columns, listDesignFilterValues(), updateRows, "ordercode");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	autorowheight :true,
        autoheight :true,
    	theme: 'energyblue',
        columnsheight: 80,
        columnsresize: true,
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}
// List Design Grid Field Filter
function listDesignFilterValues() {
 
	fieldFilters = {
		"fieldFilters" : {}
	};
	var fromDate = $('#listDesignFromDate').val();
	var toDate = $('#listDesignToDate').val();
	var orderTypeS = $('#orderTypeS').val();
	var storeNameS = $('#storeNameS').val();
	var dcNameS = $('#dcNameS').val();
	var designStatus = $("#desStatus").val();
	
	var desStatusObj = $('#desStatusObj').val();

	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	
	if(desStatusObj != null){
		if((desStatusObj.includes("G"))){
			delete fieldFilters.fieldFilters.fromDate;
			delete fieldFilters.fieldFilters.toDate;
		}
	}
	
	var orderTypeObj = $('#orderTypeObj').val();
	if (orderTypeObj == null || orderTypeObj == "") {
		var orderTypeS = "";
	} else {
		var orderTypeS = orderTypeObj.join(",");
	}
	var storeNameObj = $('#storeNameObj').val();
	if (storeNameObj == null || storeNameObj == "") {
		var storeNameS = "";
	} else {
		var storeNameS = storeNameObj.join(",");
	}
	var dcNameObj = $('#dcNameObj').val();
	if (dcNameObj == null || dcNameObj == "") {
		var dcNameS = "";
	} else {
		var dcNameS = dcNameObj.join(",");
	}
	if (desStatusObj == null || desStatusObj == "") {
		var desStatus = "";
	} else {
		var desStatus = desStatusObj.join(",");
	}
	if (desStatus != "" && desStatus != null) {
		fieldFilters.fieldFilters["designstatus"] = desStatus;
	}
	if (orderTypeS != "" && orderTypeS != null) {
		fieldFilters.fieldFilters["orderType"] = orderTypeS;
	}
	if (dcNameS != "" && dcNameS != null) {
		fieldFilters.fieldFilters["dc"] = dcNameS;
	}
	if (storeNameS != "" && storeNameS != null) {
		fieldFilters.fieldFilters["store"] = storeNameS;
	}
	
	return fieldFilters;
	
}

// Validation for search
function validateReqd() {
	var fromDate = $('#orderFromDate').val();
	var toDate = $('#orderToDate').val();
	var storeOrDC = $('#storeOrDC').val();
	var storeOrDcId = $('#storeOrDcId').val();
	if (fromDate == "" || fromDate == null) {
		return false;
	}
	if (toDate == "" || toDate == null) {
		return false;
	}
	if (storeOrDC == "" || storeOrDC == null) {
		return false;
	}
	if (storeOrDcId == "" || storeOrDcId == null) {
		return false;
	}
	return true;
}
//################################# LIST DESIGN GRID ENDED ##############################################

// On Load LOV API
$.getJSON('/OrderExecution/api/v1/onloadPendingDesigners', function(data) {

	//iterate over the data and append a select option orderType storeName dcName designStatus |\ vendorsCon
	var dcList = data.payload.dcList;
	var orderTypes = data.payload.orderTypes;
	//var dStatus = data.payload.dStatus;
	var dStatus = [];
	var sList = data.payload.sList;
	
	              // DC Name
						var d = '<select id="dcNameObj" name="dcNameObj" class="form-control" multiple="multiple">';
						$.each(dcList, function(key, val) {
							d += '<option value="' + val.id + '">' + val.name + '</option>';
						});
						d += '</select>';
						$("#dcNameS").html(d);
						$('#dcNameObj').multiselect({
							includeSelectAllOption : true,
							enableFiltering : false,
							maxHeight : 250,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
						});
						
						// Order Type
						var o = '<select id="orderTypeObj" name="orderTypeObj" class="form-control" multiple="multiple">';
						$.each(orderTypes, function(key, val) {
							o += '<option value="' + val.id + '">' + val.name + '</option>';
						});
						o += '</select>';
						$("#orderTypeS").html(o);
						$('#orderTypeObj').multiselect({
							includeSelectAllOption : true,
							enableFiltering : false,
							maxHeight : 250,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
						})
						

						// Stores Names Lov
						var s = '<select id="storeNameObj"  name="storeNameObj" class="form-control" multiple="multiple">';
							$.each(sList, function(key, val) {
							s += '<option value="' + val.id + '">' + val.name + '</option>'; });
							s += '</select>';
							$("#storeNameS").html(s);
							$('#storeNameObj').multiselect({
							includeSelectAllOption : true,
							maxHeight : 250,
							enableFiltering : false,
							numberDisplayed : 1,
							buttonClass : 'col-md-12 form-control text-left'
							});
							
							// Design Status Lov
							$.each(data.payload.dStatus,function(k,v){
								if(v.id != "Ca"){
									dStatus.push(v);
								}
							});
							var t = '<select id="desStatusObj"  name="desStatusObj" class="form-control" multiple="multiple">';
								$.each(dStatus, function(key, val) {
								t += '<option value="' + val.id + '">' + val.name + '</option>'; });
								t += '</select>';
								$("#desStatus").html(t);
								$('#desStatusObj').multiselect({
								includeSelectAllOption : true,
								maxHeight : 250,
								enableFiltering : false,
								numberDisplayed : 1,
								buttonClass : 'col-md-12 form-control text-left'
								});
});
	
	
// Date Picker Date from
$("#listDesignFromDate").datepicker({
	 changeMonth: true,
     changeYear: true,
     dateFormat:"dd/mm/yy",
     maxDate: 0,
 	onSelect : function(dateStr) {
 		var min = $(this).datepicker('getDate'); // Get selected date
 		$("#listDesignToDate").datepicker('option', 'minDate', min || '0'); // Set other min, default to today
 	}
});
//Date Picker Date TO
$("#listDesignToDate").datepicker({
	 changeMonth: true,
     changeYear: true,
     dateFormat:"dd/mm/yy",
     maxDate: 0
});
// On click on search button it will load grid
$("#search").on('click', function() {
	$form = $('#listDesignSearch');
    $form.validate({
        errorElement: 'label', 
        errorClass: 'help-inline', 
        focusInvalid: false, 
        ignore: "",
        rules: {
        	/*"listDesignFromDate": {
                required: true,  dateITA : true
            },
            "listDesignToDate": {
                required: true,  dateITA : true
            },*/
            "orderTypeS": {
                required: true
            }
        },errorPlacement: function(error, element) {
        	if(element.context.name == "listDesignFromDate" || element.context.name == "listDesignToDate"){
        		error.insertAfter(element.parent());
        	}else{
        		error.insertAfter(element);
        	}
        }
    });
    if ($form.valid()) {
    	listDesignGrid();
    	$("#jqxgrid").show();
    } else {
    	 return false;
    }
    return false;
 });

// Clear grid and reset input and Drop down value
$('#clear').on('click', function() {
	/*$('#orderTypeObj').multiselect("clearSelection");
	$('#dcNameObj').multiselect("clearSelection");
	$('#desStatusObj').multiselect("clearSelection");
	$('#storeNameObj').multiselect("clearSelection");
	
	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();*/
	window.location.href = "javascript:showContentPage('listDesign', 'bodySwitcher')";
});

// Export LIst Design
$('#export').on('click', function(){
    var fieldFilters = listDesignFilterValues();
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	var rows = $('#jqxgrid').jqxGrid('getrows');
	console.log(rows);
	if (  rows == undefined || rows == 0 ) {
		$.growl
		.error({
			message : "No Data To Export",
			duration : 10000
		});
		return false;
	}else{
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		if(rows.rowscount != 0){
	var newData = [];
	postJSON('/OrderExecution/api/v1/searchPendingDesignWithDesigner?page=export', JSON
			.stringify(fieldFilters), function(response) {	
		console.log(response.resCode);
		if(response!=null){
		data = response.payload.list;	
		for(i=0; i<data.length; i++){
			newData.push({
				'Source' : data[i].SourceDcOrStore,
				'Order Type' : data[i].orderTypevalue,
				'Order Number' : data[i].orderItem.order.id,
				'Order Serial No' : data[i].orderItem.serialNumber,
				'Design Due Date' : $.date(data[i].dueDate),				
				'Segment Name':  data[i].orderItem.segment.description,
				'Order Jewel Type Name':  data[i].orderItem.jewelType.description,
				'Article Desc': (data[i].orderItem.articleDescription != null) ? data[i].orderItem.articleDescription : "",
				'No of Variation':  data[i].numOfVariations,
				'Order Due Date':  $.date(data[i].orderItem.order.dueDate),
				'Designer Name':  (data[i].designerName != null) ? data[i].designerName : "",
				'Design Release Date':  $.date(data[i].statusDate),
				'Design Status':  data[i].designStatusValue,
				'Cust Approv Req':  data[i].orderItem.isDesignReqd,
				'Store Name':  (data[i].orderItem.order.store != null) ? data[i].orderItem.order.store.name:"",
				'DC Name':  (data[i].orderItem.order.dc != null) ? data[i].orderItem.order.dc.name : "",
				'Order Created By':  data[i].created
			   });	
	        }
		  var opts = [{sheetid:'List_Design',header:true}];
          var res = alasql('SELECT * INTO XLSX("List_Design'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
		}
	 });
   }else{
	   $.growl
		.error({
			message : "No Data To Export",
			duration : 10000
		});
	   return false;	
	   }
   }
 });