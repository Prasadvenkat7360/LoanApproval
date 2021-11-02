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

$(function() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; // January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	var today = dd + '/' + mm + '/' + yyyy;
	/* From Date to datepicker with masking of date */
	$(document).on(
			'click',
			'#orderFromDate',
			function() {
				var me = $("#orderFromDate");
				var selectedDate = $("#orderFromDate").val();
				me.datepicker(
						{
							showOn : 'focus',
							changeMonth : true,
							changeYear : true,
							 maxDate: 0,
							dateFormat : "dd/mm/yy",
							onSelect : function(selectedDate) {
								$("#orderToDate").datepicker("option",
										"minDate", selectedDate);
							}
						}).focus();
				me.mask('99/99/9999');

			}).on('select', '#orderFromDate', function() {
		var me = $("#orderFromDate");
	}).on("change", function(e) {

	});

	$(document).on('click', '#orderToDate', function() {
		var me = $("#orderToDate");
		me.datepicker({
			showOn : 'focus',
			changeMonth : true,
			changeYear : true,
			dateFormat : "dd/mm/yy",
			minDate : $("#orderFromDate").val()
		}).focus();
		me.mask('99/99/9999');
	}).on('select', '#orderToDate', function() {
		var me = $("#orderToDate");
	});

	
	/* Clear Form Filter and Re-set to default search and clear Grid data */
	$("#removeAll").on('click', function() {		
	
		//$designers.empty().append('<option value="" selected>Select</option>');
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	});

	$("#clearAll").on('click', function() {
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();			
		$("input[type=text], textarea").val("");
		$("input[type=hidden], textarea").val("");
		
		
	});

});

function issueForMeltingGrid() {

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
		'text' : 'Date',
		'datafield' : 'articleCode',
		editable : true,
		cellsalign : 'center',
		align : 'center',
	},
	
	  { 'text' : 'GRV/TV No.', 
		'datafield' : 'articleDesc', 
	    editable : true,
	    cellsalign : 'center',
		align : 'center',},
	 
	{
		'text' : 'Melting Lot No.',
		'datafield' : 'clarity',
		editable : true,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'color',	
		editable : true,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Segment',
		'datafield' : 'cut',	
		editable : true,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Location',
		'datafield' : 'actualColor',
		editable : true,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'From Wt.',
		'datafield' : 'fromWt',	
		editable : true,
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Ref No.',
		'datafield' : 'toWt',
		sortable : false,
		editable : true,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Sl.No.',
		'datafield' : 'avgCost',
		sortable : false,
		editable : true,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Melted Bar Gross Wt',
		'datafield' : 'sellingRate',
		sortable : false,
		editable : true,
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Melted Bar Net Wt',
		'datafield' : 'regionId',
		sortable : false,
		editable : true,
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Exp Purity %',
		'datafield' : 'storeId',
		sortable : false,
		editable : true,
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Exp Pure Wt.',
		'datafield' : 'purchaseRate',
		sortable : false,
		editable : true,
		cellsalign : 'right',
		align : 'center',
	}, {
		'text' : 'Status',
		'datafield' : 'exchangeRate',
		sortable : false,
		editable : true,
		cellsalign : 'center',
		align : 'center',
	}, {
		'text' : 'Action',
		'datafield' : 'activeFlag',
		sortable : false,
		editable : true,
		cellsalign : 'center',
		align : 'center',
	}
	
	];

	showMyGrid(datafields, "", "list", columns, updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,  
        theme: 'energyblue',
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

$("#receiptFromRefiner").draggable({
    handle: ".modal-header"
});

var id = 0;
$("#generate").click(function() {
  id++;           
  var row = $('.samplerow tbody tr').clone(true);
  row.find("input:text").val("");
  row.find("option").val("");
  row.find("textarea").val("");
  row.attr('id',id); 
  row.appendTo('#dynamicTable1');        
  return false;
});        
  
$('.remove').on("click", function() {
	$(this).parents("tr").remove();
});
$('input:text:visible:first').focus();