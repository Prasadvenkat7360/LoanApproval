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

$("#metalBelongsTo").on('change', function() {		
	var value = $('#metalBelongsTo option:selected').val();	
	if(value == "company" || value == "nonCompany"){
		metalBelongsGrid();
		$("#jqxgrid").show();
		return false;
	}else{
		$("#jqxgrid").hide();
	}
});
/* Grid Section Started */
function metalBelongsGrid() {

	var updateRows = function(rowid, newdata, commit) {
		/*
		 * updates[newdata.id] = { };
		 */
	}
	var datafields = [ {
		'name' : 'belongsTo',
		'type' : 'long'

	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		'name' : 'fromDate',
		'type' : 'datetime'
	}, {
		'name' : 'toDate',
		'type' : 'datetime'
	}, {
		'name' : 'exAddDed',
		'type' : 'string'
	}, {
		'name' : 'exAddPer',
		'type' : 'long'
	}, {
		'name' : 'exDedPer',
		'type' : 'int'
	}, {
		'name' : 'dpAddDed',
		'type' : 'long'
	}, {
		'name' : 'dirDddPer',
		'type' : 'long'
	}, {
		'name' : 'dirDedPer',
		'type' : 'long'
	} ];

	var columns = [

	{
		'text' : 'Belogs to',
		'datafield' : 'belongsTo',
		editable : false
	},

	{
		'text' : 'Segment',
		'datafield' : 'segment',
		editable : false
	},

	{
		'text' : 'From',
		'datafield' : 'fromDate',
		editable : false
	}, {
		'text' : 'To',
		'datafield' : 'toDate',
		editable : false
	}, {
		'text' : 'Ex Add/Ded',
		'datafield' : 'exAddDed',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2'
	}, {
		'text' : 'Add%',
		'datafield' : 'exAddPer',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2'
	}, {
		'text' : 'Ded%',
		'datafield' : 'exDedPer',
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2'
	}, {
		'text' : 'DP Add/Ded',
		'datafield' : 'dpAddDed',
		sortable : false,
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2'
	}, {
		'text' : 'Add%',
		'datafield' : 'dirDddPer',
		sortable : false,
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2'
	}, {
		'text' : 'Ded%',
		'datafield' : 'dirDedPer',
		sortable : false,
		editable : false,
		cellsalign : 'right',
		align : 'center',
		cellsformat : 'd2'
	}
	];

	showMyGrid(datafields, "", "list",
			columns, "", updateRows, "createdDate");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});

}