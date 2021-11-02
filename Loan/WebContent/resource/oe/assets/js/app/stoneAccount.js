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

function stoneAccountGrid() {

	var updateRows = function(rowid, newdata, commit) {
		/*
		 * updates[newdata.id] = { };
		 */
	}
	
	var datafields = [ {
		'name' : 'accountDate',
		'type' : 'date'
	}, {
		'name' : 'storeOrDC',
		'type' : 'string'
	}, {
		'name' : 'storeOrDcId',
		'type' : 'long',
		'map' : 'storeOrDcName'
	}, {
		'name' : 'code',
		'type' : 'string'
	}, {
		'name' : 'stoneSegment',
		'map': 'stoneSegment>description',
		'type' : 'string'
	}, {
		'name' : 'stoneCategory',
		'map': 'stoneCategory>description',
		'type' : 'string'
	}, {
		'name' : 'stone',
		'map': 'stone>stoneCode',
		'type' : 'string'
	},  {
		'name' : 'receiptWeight',
		'type' : 'float'
	}, {
		'name' : 'issueWeight',
		'type' : 'float'
	}, {
		'name' : 'isProcessed',
		'type' : 'boolean'
	}];

	var columns = [{
			'text' : 'Account Date',
			'datafield' : 'accountDate',
			'width' : '120px',
			cellsalign: 'center',
			align:'center',
			cellsformat: 'dd/MM/yyyy',
			editable : false,
			sortable : false
		},
		{
			'text' : 'Store / DC',
			'datafield' : 'storeOrDC',
			'width' : '85px',
			cellsalign: 'center',
			align:'center',
			editable : false,
			sortable : false
		},
		{
			'text' : 'Store / DC Name',
			'datafield' : 'storeOrDcId',
			'width' : '120px',
			cellsalign: 'center',
			align:'center',
			editable : false,
			sortable : false
		},
		{
			'text' : 'Segment',
			'datafield' : 'stoneSegment',
			'width' : '145px',
			cellsalign: 'center',
			align:'center',
			editable : false,
			sortable : false
		},
		{
			'text' : 'Category',
			'datafield' : 'stoneCategory',
			'width' : '160px',
			cellsalign: 'center',
			align:'center',
			editable : false,
			sortable : false
		},
		{
			'text' : 'Location Code',
			'datafield' : 'code',
			'width' : '120px',
			cellsalign: 'center',
			align:'center',
			editable : false,
			sortable : false
		},
		{
			'text' : 'Stone',
			'datafield' : 'stone',
			'width' : '120px',
			cellsalign: 'center',
			align:'center',
			editable : false,
			sortable : false
		},
		{
			'text' : 'Receipt Weight',
			'datafield' : 'receiptWeight',
			'width' : '140px',
			editable : false,
			sortable : false,
			cellsformat: 'd3',
			align:'center',
			cellsalign: 'right', cellsformat: 'd3',
      	  aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['receiptWeight'] == null) ? 0 : parseFloat(NVL(record['receiptWeight'],0));
      			  return NVL(aggregatedValue,0) + NVL(total,0);
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {        		 
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + NVL(aggregates["Total"],0) + '</span>';
      	  } 
		},
		{
			'text' : 'Issue Weight',
			'datafield' : 'issueWeight',
			'width' : '140px',
			editable : false,
			sortable : false,
			align:'center',
			cellsformat: 'd3',
			cellsalign: 'right', cellsformat: 'd3',
      	  aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['issueWeight'] == null) ? 0 : parseFloat(NVL(record['issueWeight'],0));
      			  return NVL(aggregatedValue,0) + NVL(total,0);
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {        		 
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + NVL(aggregates["Total"],0) + '</span>';
      	  } 
		},
		{
			'text' : 'Processed?',
			'datafield' : 'isProcessed',
			'width' : '120px',
			cellsalign: 'center',
			align:'center',
			editable : false,
			sortable : false
			
		}];

	showMyGrid(datafields, "/OrderExecution/api/v1/stoneAccountList", "list",
			columns, stoneAccountFilterValues(), updateRows, "accountDate");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true,
    	showaggregates: true,
    	showstatusbar: true
	});

}

function stoneAccountFilterValues() {

	fieldFilters = {
		"fieldFilters" : {}
	};
	var fromDate = $('#orderFromDate').val();
	var toDate = $('#orderToDate').val();
	var storeOrDC = $('#storeOrDC').val();
	var segment = $('#stoneSegment').val();
	var storeOrDcId = $('#storeOrDcId').val();
	var code = $("#code").val();
	var isProcessed = $("#isProcessed").val();
	var category = $("#category").val();
	var stone = $("#stoneCode").val();
	
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (storeOrDC != "" && storeOrDC != null) {
		fieldFilters.fieldFilters["storeOrDC"] = storeOrDC;
	}
	if (storeOrDcId != "" && storeOrDcId != null) {
		fieldFilters.fieldFilters["storeOrDcId"] = storeOrDcId;
	}
	if (code != "" && code != null) {
		fieldFilters.fieldFilters["code"] = code.toUpperCase();
	}
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["stoneSegment.id"] = segment;
	}
	if (category != "" && category != null) {
		fieldFilters.fieldFilters["stoneCategory.id"] = category;
	}
	if (stone != "" && stone != null) {
		fieldFilters.fieldFilters["stone.stoneCode"] = stone.toUpperCase();
	}	
	if (isProcessed != "" && isProcessed != null) {
		fieldFilters.fieldFilters["isProcessed"] = isProcessed;
	}

	return fieldFilters;

}


var onloadApi = function(){
	$('#code').empty().append('<option value="" selected>--Select--</option>');
	$('#stoneCode').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/stoneAccountLocationWiseLOVs', function(data) {
		$.each(data.payload.locations, function(key, val) {
			$('#code').append('<option value="' + val.id + '">'+ val.id + '</option>');
		});
		
		$.each(data.payload.stoneCodes, function(key, val) {
			$('#stoneCode').append('<option value="' + val.id + '">'+ val.id + '</option>');
		});
	});
}
onloadApi();
$("#storeOrDC").on(
		"change",
		function() {

			$('#storeOrDcId').empty().append(
					'<option value="" selected>--Select--</option>');

			var id = $('#storeOrDC').val();
			if (id != "") {
				$.getJSON(
						'/OrderExecution/api/v1/metalAccountLOV?page=storeOrDc&sdc='
								+ id, function(data) {

							// iterate over the data and append a select option
							$.each(data.payload.allStores, function(key, val) {
								$('#storeOrDcId').append(
										'<option value="' + val.id + '">'
												+ val.name + '</option>');
							});
						});
			}
		});	
$("#stoneSegment").on(
		"change",
		function() {

			$('#category').empty().append(
					'<option value="" selected>--Select--</option>');

			var id = $('#stoneSegment').val();
			if (id != "") {
				var params = {
						"fieldFilters" : {
							"suppliedBy" : "CO",
							"sSegId" : id,
							"sSeg" : $('#stoneSegment option:selected').text()
						}
					};
				postJSON('api/v1/getStoneCategories', JSON
						.stringify(params), function(data) {

					if(1 == data.resCode){
						$.each (
								data.payload.mainCatList,
								function(key, val) {
									$('#category')
											.append('<option value="'
													+ val.id
													+ '">'
													+ val.description
													+ '</option>');
								});
					}
				});
			}
		});	

$("#Search").on('click', function() {
	stoneAccountGrid();
	$("#jqxgrid").show();
	return false;
});
$("#clearAll").on('click', function(){
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$('#stoneAccSearch').trigger("reset");
	
});

var NVL = function(source, replaceMentValue){
	if(typeof source != "undefined" && source != null && source != ""){
		return source;
	}
	else return replaceMentValue;
}
