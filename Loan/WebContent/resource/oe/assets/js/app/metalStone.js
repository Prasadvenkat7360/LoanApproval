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

$("#StoneBalancefrom").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate: 0,
	onSelect : function(dateStr) {
		var min = $(this).datepicker('getDate'); // Get selected date
		$("#stoneBalanceto").datepicker('option', 'minDate', min || '0'); // Set other min, default to today
	}
});
var today = new Date();
$("#stoneBalanceto").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate: 0
});


$( document ).ready(function() {
	$("#storeNameObj").multiselect("disable");
	$("#dcNameObj").multiselect("disable");
});
$('#selectStoreDC').on('change', function(){
	var selectedVal = $(this).val();
	var regionLovObj = $('#regionLovObj').val();
	var regionLov = "";
	if(regionLovObj != null && regionLovObj != ""){
		regionLov = regionLovObj.join(",");
	}
	if(selectedVal == "store"){
		$("#storeNameObj").multiselect("enable");
		$("#dcNameObj").multiselect("disable");
		$('#dcNameObj').multiselect("clearSelection");
		if(regionLov != null && regionLov != ""){
			$.getJSON('/OrderExecution/api/v1/getStoreByRegions?type='+ selectedVal + '&ids=' + regionLov, function(data) {
				var storeLov = data.payload.allStores;
				var s = '<select id="storeNameObj" class="form-control" multiple="multiple">';   
				$.each(storeLov, function(key, val) {
					s +='<option value="' + val.id + '">' + val.name + '</option>';
				});
				s +='</select>'; 
				$("#storeName").html(s);
				$('#storeNameObj').multiselect({ 
		            includeSelectAllOption: true,
		            enableFiltering:false,         
		            maxHeight:250,
		            numberDisplayed:1,
		            buttonClass: 'col-md-12 form-control text-left'
		      	});
			});
		}else{
			$.growl
			.error({
				message : "Please Select Region",
				duration : 10000
			});
		}
		$("#storeDiv").show();
		$("#dcDiv").hide();
	}else if(selectedVal == "dc"){
		$("#storeNameObj").multiselect("disable");
		$('#storeNameObj').multiselect("clearSelection");
		$("#dcNameObj").multiselect("enable");
		if(regionLov != null && regionLov != ""){
			$.getJSON('/OrderExecution/api/v1/getStoreByRegions?type='+ selectedVal + '&ids=' + regionLov, function(data) {
				var dcLov = data.payload.allDc;
				var d = '<select id="dcNameObj" class="form-control" multiple="multiple">';   
				$.each(dcLov, function(key, val) {
					d +='<option value="' + val.id + '">' + val.name + '</option>';
				});
				d +='</select>'; 
				$("#dcName").html(d);
				$('#dcNameObj').multiselect({ 
		            includeSelectAllOption: true,
		            enableFiltering:false,         
		            maxHeight:250,
		            numberDisplayed:1,
		            buttonClass: 'col-md-12 form-control text-left'
		      	});
			});
		}else{
			$.growl
			.error({
				message : "Please Select Region",
				duration : 10000
			});
		}	
		$("#storeDiv").hide();
		$("#dcDiv").show();
	}else{
		$("#storeNameObj").multiselect("disable");
		$("#dcNameObj").multiselect("disable");
		$('#storeNameObj').multiselect("clearSelection");
		$('#dcNameObj').multiselect("clearSelection");
		$("#storeDiv").hide();
		$("#dcDiv").hide();
	}
});

//On Load API for LOV
var onLoadStoneBalance = function() {
	// GET JSON API CALL
	$.getJSON('/OrderExecution/api/v1/stockOfDiamondLOV', function(data) {
		var regionLov = data.payload.rList;
		var segmentLov = data.payload.sTypes;
		var storeLov = data.payload.allStores;
		var dcLov = data.payload.allDc;
		var locationType = data.payload.RawOrFG;

			// company region
	
		var r = '<select id="regionLovObj" class="form-control" multiple="multiple">';   
		$.each(regionLov, function(key, val) {
			r +='<option value="' + val.id + '">' + val.name + '</option>';
		});
		r +='</select>'; 
		$("#regionLov").html(r);
		$('#regionLovObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left',
            onChange:function(option, checked){
            	$('#selectStoreDC').val('all');
        		$('#storeNameObj').multiselect("clearSelection");
        		$('#dcNameObj').multiselect("clearSelection");
        		$("#storeDiv").hide();
        		$("#dcDiv").hide();
            },
            onSelectAll : function(checked){
            	$('#selectStoreDC').val('all');
        		$('#storeNameObj').multiselect("clearSelection");
        		$('#dcNameObj').multiselect("clearSelection");
        		$("#storeDiv").hide();
        		$("#dcDiv").hide();
            }
      	});
		
		$("#storeDiv").hide();
		$("#dcDiv").hide();
		// company Segment
		$('#segmentLov').empty().append('<option value="" selected>--Select--</option>');
		$.each(segmentLov, function(key, val) {
			$('#segmentLov').append('<option  value="' + val.id + '">' + val.description + '</option>');
		});
		
		
		var cat = '<select id="categoryNameObj" class="form-control" multiple="multiple"></select>';
		$("#categoryName").html(cat);
		$('#categoryNameObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
		    buttonClass : 'col-md-12 form-control text-left'
		});
		
		// Location Type
		var l = '<select id="locationTypeObj" name="locationTypeObj" class="form-control" multiple="multiple">';   
		$.each(locationType, function(key, val) {
			if(val.id != 'T'){
				l +='<option value="' + val.id + '">' + val.name + '</option>';
			}
		});
		l +='</select>'; 
		$("#locationType").html(l);
		$('#locationTypeObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});

	});

}

onLoadStoneBalance();
var params = {
	"fieldFilters" : {
		"suppliedBy" : "CO",
		"mCode" : ""
	}
};


$("#segmentLov").on("change",function() {
	 var id = $('#segmentLov').val();
	 if (id != "") {
		var params = {
			"fieldFilters" : {
			 "suppliedBy" : "CO",
			 "sSegId" : id,
			 "sSeg" : $('#segmentLov option:selected').text()
			}
		};
		postJSON('api/v1/getStoneCategories',JSON.stringify(params),function(data) {
			if (1 == data.resCode) {
			var cat = '<select id="categoryNameObj" class="form-control" multiple="multiple">';
				$.each(data.payload.mainCatList,function(key, val) {
				 cat += '<option value="'+ val.id + '">' + val.description + '</option>';});
					cat += '</select>';
					$("#categoryName").html(cat);
					$('#categoryNameObj').multiselect({
						includeSelectAllOption : true,
						enableFiltering : false,
						maxHeight : 250,
						numberDisplayed : 1,
					    buttonClass : 'col-md-12 form-control text-left'
					});
				 }
		});
	  }else {
		var cat = '<select id="categoryNameObj" class="form-control" multiple="multiple"></select>';
		$("#categoryName").html(cat);
		$('#categoryNameObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	  }
});

$("#Search").on('click', function(){
	
	var categoryNameObj = $("#categoryNameObj").val();
	var storeNameObj  = $("#storeNameObj").val();
	var dcNameObj  = $("#dcNameObj").val();
	var storeordcCode = $("#selectStoreDC").val();
	if($("#StoneBalancefrom").val() == "" || $("#StoneBalancefrom").val() == null  || $("#stoneBalanceto").val() == "" || $("#stoneBalanceto").val() == null 
			|| $("#segmentLov").val() == "" || $("#segmentLov").val() == null || categoryNameObj == "" || categoryNameObj == null){
		$.growl.error({
			message :"Please Select Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	if(storeNameObj == null || storeNameObj == ""){var storeName = "";}else{var storeName = storeNameObj.join(",");}
	if(dcNameObj == null || dcNameObj == ""){var dcName = "";}else{var dcName = dcNameObj.join(",");}
	if(storeordcCode == "store" && (storeName == null || storeName == '')){
		$.growl.error({
			message : "Store is Mandatory !",
			duration : 10000
		});
		return;
	}else if(storeordcCode == "dc" && (dcName == null || dcName == '')){
		$.growl.error({
			message : "DC is Mandatory !",
			duration : 10000
		});
		return;
	}
	else{
		stonebalanceGrid();
		$("#jqxgrid").show();
	}

});


// Stone Balance Field Filter
var StoneBalanceFieldFilters = function() {
	var categoryNameObj = $('#categoryNameObj').val();
	if (categoryNameObj == null || categoryNameObj == "") {
		var categoryName = "";
	} else {
		var categoryName = categoryNameObj.join(",");
	}

	var storeNameObj = $('#storeNameObj').val();
	if (storeNameObj == null || storeNameObj == "") {
		var storeName = "";
	} else {
		var storeName = storeNameObj.join(",");
	}

	var dcNameObj = $('#dcNameObj').val();
	if (dcNameObj == null || dcNameObj == "") {
		var dcName = "";
	} else {
		var dcName = dcNameObj.join(",");
	}
	var segmentLov = $('#segmentLov').val();

	var StoneBalancefrom = $('#StoneBalancefrom').val();
	var stoneBalanceto = $('#stoneBalanceto').val();
	var storeordcCode = $('#selectStoreDC').val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (storeordcCode == "store") {
		fieldFilters.fieldFilters["storeordcCode"] = "Store";
		fieldFilters.fieldFilters["storedcidlist"] = storeName;
	} else if (storeordcCode == "dc") {
		fieldFilters.fieldFilters["storeordcCode"] = "DC";
		fieldFilters.fieldFilters["storedcidlist"] = dcName;
	}else{
		fieldFilters.fieldFilters["storeordcCode"] = "All";
	}
	if (categoryName != "" && categoryName != null) {
		fieldFilters.fieldFilters["categoryCode"] = categoryName;
	}
	if (segmentLov != "" && segmentLov != null) {
		fieldFilters.fieldFilters["segmentCode"] = segmentLov;
	}

	if (StoneBalancefrom != "" && StoneBalancefrom != null) {
		fieldFilters.fieldFilters["accountFromCode"] = StoneBalancefrom;
	}
	if (stoneBalanceto != "" && stoneBalanceto != null) {
		fieldFilters.fieldFilters["accountToCode"] = stoneBalanceto;
	}

	return fieldFilters;
}

// Grid for Stone details
function stonebalanceGrid() {
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	var datafields = [ 
		{ 'name' : 'storeDCType', 'type' : 'string', 'map'  : 'storeOrDC'},
		{ 'name' : 'segment', 'type' : 'string', 'map'  : 'segmentDesc' },
		{ 'name' : 'category', 'type' : 'string', 'map'  : 'categoryDesc'},
		{ 'name' : 'locationCode', 'type' : 'string', 'map'  : 'locationCode'},
		{ 'name' : 'locationName', 'type' : 'string', 'map'  : 'locName'},
		{ 'name' : 'recptWt', 'type' : 'decimal', 'map'  : 'recptWeight'},
		{ 'name' : 'issueWt', 'type' : 'decimal', 'map'  : 'issueWght'},
		{ 'name' : 'openBal', 'type' : 'decimal', 'map'  : 'openWeight'},
		{ 'name' : 'closeBal', 'type' : 'decimal', 'map'  : 'closingWght'},
		{ 'name' : 'compCloseBal', 'type' : 'decimal', 'map'  : 'compClosingWght'} 
	];
	var columns = [ 
		{'text' : 'Store/DC/All', 'datafield' : 'storeDCType', 'width' : '5%', editable : false, cellsalign: 'center', align: 'center', sortable : true},
		{'text' : 'Segment', 'datafield' : 'segment', 'width' : '7%', cellsalign : 'center', sortable : false, editable : false, align:'center'},
		{'text' : 'Category','datafield' : 'category','width' : '8%',sortable : false,editable : false,cellsalign : 'center',align:'center'},
		{'text' : 'Location Code','datafield' : 'locationCode','width' : '9%',sortable : false,cellsalign : 'center',editable : false,align:'center'},
		{'text' : 'Location Name','datafield' : 'locationName','width' : '15%',sortable : false,cellsalign : 'center',editable : false,align:'center'},
		{'text' : 'Opening Weight','datafield' : 'openBal','width' : '11%',cellsalign : 'right',cellsformat : 'd3',sortable : false,editable : false,align:'center'},
		{'text' : 'Receipt Weight','datafield' : 'recptWt','width' : '11%',cellsformat : 'd3',sortable : false,editable : false,cellsalign : 'right',align:'center'},
		{'text' : 'Issue Weight','datafield' : 'issueWt',cellsformat : 'd3','width' : '11%',sortable : false,editable : false,cellsalign : 'right',align:'center'},
		{'text' : 'Closing Weight','datafield' : 'closeBal','width' : '11%',sortable : false,editable : false,cellsalign : 'center',align:'right',cellsformat : 'd3'},
		{'text' : 'Comp. Closing Weight','datafield' : 'compCloseBal','width' : '12%',sortable : false,editable : false,cellsformat : 'd3',cellsalign : 'right',align:'center'} 
	];
	source = {
		datafields : datafields,
		data : StoneBalanceFieldFilters(),
		url : '/OrderExecution/api/v1/stockOfStoneBalancePremisesSearchList',
		datatype : 'json',
		type : 'post',
		root : "list",
		contentType : 'application/json',
		beforeprocessing : beforeprocessing,
		pagesize : 20,
		sort : sort,
		sortColumn : 'storeDCType',
		sortdirection : 'asc',
		updaterow : updateRows
	};
	var dataAdapter = new $.jqx.dataAdapter(source, {
		formatData : requestData
	});
	function beforeprocessing(data) {
		if (undefined == data.payload.list){
			data.payload.list = [];
		}
		source.totalrecords = data.payload.size ? data.payload.size : 0;
	}
	$("#jqxgrid").jqxGrid({source : dataAdapter, width : '100%', columnsresize : true, selectionmode : 'singlecell', columns : columns, sortable : 'true',
		pageable : 'true', virtualmode : 'true', pagermode : 'simple', rendergridrows : rendergridrows, showsortmenuitems : false, autoheight : true, altrows : true,
		showaggregates: true, showstatusbar: true, statusbarheight: 20,theme: 'energyblue', columnsheight : 35});
}


//date-picker 


//Clear All
$('#clearAll').on('click', function() {
	$('#storeNameObj').multiselect("clearSelection");
	$('#dcNameObj').multiselect("clearSelection");
	
	var validator = $( "form" ).validate();
	validator.resetForm();
	
	var cat = '<select id="categoryNameObj" class="form-control" multiple="multiple"></select>';
	$("#categoryName").html(cat);
	$('#categoryNameObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
	
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});


$('#export').on('click',function() {
	var fieldFilters = StoneBalanceFieldFilters();
	var rowDet = $("#jqxgrid").jqxGrid('getdatainformation');
	if(typeof rowDet == "undefined"){
		 $.growl.error({
			message : "No Data to export!!",
			duration : 10000
			});
			return false;
	}
	
	var newData = [];
	var sysdate = moment().format('DDMMYYYYHHmmSS');

		postJSON('/OrderExecution/api/v1/stockOfStoneBalancePremisesExportList',JSON.stringify(fieldFilters),function(response) {
		if(response!=null){
			data = response.payload.list;
			if (response.resCode == 1) {
				
				for (i = 0; i < data.length; i++) {
				var segment = data[i].segmentDesc;
				var category = data[i].categoryDesc;
				var locationCode = data[i].locationCode;
				var openBal = data[i].openWeight;
				var closeBal = data[i].closingWght;
				var recptWt = data[i].recptWeight;
				var issueWt = data[i].issueWght;
				var storeOrDC = data[i].storeOrDC;
				var locName = data[i].locName;
				var compCloseWt = data[i].compClosingWght;
				newData.push({
				    'Store/DC/ALL':storeOrDC,
					'Segment' : segment,
					'Category' : category,
					'Location Code' : locationCode,
					'Location Name' :locName,
					'Opening Weight' : openBal,
					'Receipt Weight' : recptWt,
					'Issue Weight':issueWt,
					'Closing Weight' : closeBal,
					'Comp. Closing Weight' : compCloseWt
				});
		        }									
			  var opts = [{sheetid:'Stone_Balance',header:true}];
	          var res = alasql('SELECT * INTO XLSX("Stone_Balance'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
         }else{
        	 $.growl.error({
					message : "No Data Found!!",
					duration : 10000
					});
					return false;
			}
         }
	});
});