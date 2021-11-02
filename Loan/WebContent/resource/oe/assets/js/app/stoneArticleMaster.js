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

function stoneArticleMasterGrid() {

	var updateRows = function(rowid, newdata, commit) {
		
	}
	var datafields = [ {
		'name' : 'articleCode',
		'type' : 'string'

	}, {
		'name' : 'articleDesc',
		'type' : 'string'
	}, {
		'name' : 'clarity',
		'type' : 'string'
	}, {
		'name' : 'color',
		'type' : 'string'
	}, {
		'name' : 'cut',
		'type' : 'string'
	}, {
		'name' : 'actualColor',
		'type' : 'string'
	}, {
		'name' : 'fromWt',
		'type' : 'int'
	}, {
		'name' : 'toWt',
		'type' : 'int'
	}, {
		'name' : 'avgCost',
		'type' : 'long'
	}, {
		'name' : 'sellingRate',
		'type' : 'long'
	}, {
		'name' : 'regionId',
		'type' : 'int'
	}, {
		'name' : 'storeId',
		'type' : 'int'
	}, {
		'name' : 'purchaseRate',
		'type' : 'long'
	}, {
		'name' : 'exchangeRate',
		'type' : 'long'
	}, {
		'name' : 'activeFlag',
		'type' : 'string'
	}, {
		'name' : 'tbRef',
		'type' : 'string'
	}, {
		'name' : 'mup',
		'type' : 'string'
	}
	];

	var columns = [

	{
		'text' : 'Article Code',
		'datafield' : 'articleCode',
		editable : true
	},
	
	  { 'text' : 'Article Desc', 
		'datafield' : 'articleDesc', 
	    editable : true },
	 
	{
		'text' : 'Clarity',
		'datafield' : 'clarity',
		editable : true
	}, {
		'text' : 'Color',
		'datafield' : 'color',	
		editable : true
	}, {
		'text' : 'Cut',
		'datafield' : 'cut',	
		editable : true
	}, {
		'text' : 'Actual Color',
		'datafield' : 'actualColor',
		editable : true
	}, {
		'text' : 'From Wt.',
		'datafield' : 'fromWt',	
		editable : true
	}, {
		'text' : 'To Wt.',
		'datafield' : 'toWt',
		sortable : false,
		editable : true
	}, {
		'text' : 'Average Cost',
		'datafield' : 'avgCost',
		sortable : false,
		editable : true
	}, {
		'text' : 'Stone Selling Rate',
		'datafield' : 'sellingRate',
		sortable : false,
		editable : true
	}, {
		'text' : 'Region Id',
		'datafield' : 'regionId',
		sortable : false,
		editable : true
	}, {
		'text' : 'Store Id',
		'datafield' : 'storeId',
		sortable : false,
		editable : true
	}, {
		'text' : 'Purchase Rate',
		'datafield' : 'purchaseRate',
		sortable : false,
		editable : true
	}, {
		'text' : 'Exchange Rate',
		'datafield' : 'exchangeRate',
		sortable : false,
		editable : true
	}, {
		'text' : 'Active Flag',
		'datafield' : 'activeFlag',
		sortable : false,
		editable : true
	}, {
		'text' : 'TB Ref',
		'datafield' : 'tbRef',
		sortable : false,
		editable : true
	}, {
		'text' : 'Mup',
		'datafield' : 'mup',
		sortable : false,
		editable : true
	}
	
	];

	showMyGrid(datafields, "", "list", columns, updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});

}

$("#clearAll").on('click', function(){
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$('#designRA').trigger("reset");
	$('#designSearch').trigger("reset");
	$('#uploadDesign').trigger("reset");
	});
$('input:text:visible:first').focus();