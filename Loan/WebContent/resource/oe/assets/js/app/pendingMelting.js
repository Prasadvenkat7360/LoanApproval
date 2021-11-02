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

	/*
	 * On blur check dateFormat Right or Wrong. If Wrong it will take current
	 * date else selected date.
	 */
	$("#orderFromDate").on("blur", function() {
		var selectedDate = $("#orderFromDate").val();
		$("#orderToDate").val();
		var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
		var dateFinal = selectedDate.match(rxDatePattern);
		if (dateFinal != null) {
			$("#orderFromDate").val(selectedDate);
		} else {
			$("#orderFromDate").val(today);
		}
	});

	$("#orderToDate").on("blur", function() {
		var selectedDate = $("#orderToDate").val();
		$("#orderToDate").val();
		var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
		var dateFinal = selectedDate.match(rxDatePattern);
		if (dateFinal != null) {
			$("#orderToDate").val(selectedDate);
		} else {
			$("#orderToDate").val(today);
		}
	});
	

	$("#clearAll").on('click', function() {
		$("#tabGrDet").hide();
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
		$('#pendingMelting').trigger("reset");
	});

});
function pendingMeltingGrid() {

	var updateRows = function(rowid, newdata, commit) {
		/*
		 * updates[newdata.id] = { };
		 */
	}
	var datafields = [ {
		'name' : 'createdDate',
		'type' : 'string'

	}, {
		'name' : 'mrvTVNo',
		'type' : 'long'
	}, {
		'name' : 'meltingLotNo',
		'type' : 'long'
	}, {
		'name' : 'vendorCode',
		'type' : 'long'
	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		'name' : 'location',
		'type' : 'string'
	}, {
		'name' : 'refNo',
		'type' : 'int'
	}, {
		'name' : 'slNo',
		'type' : 'long'
	}, {
		'name' : 'grossWt',
		'type' : 'long'
	}, {
		'name' : 'netWt',
		'type' : 'long'
	}, {
		'name' : 'expPurityPer',
		'type' : 'string'
	}, {
		'name' : 'expPureWt',
		'type' : 'long'
	}, {
		'name' : 'status',
		'type' : 'string'
	}, {
		'name' : 'meltingActionId',
		'type' : 'long',
		'map' : 'meltingId'
	} ];

	var columns = [

	{
		'text' : 'Date',
		'datafield' : 'createdDate',
		'width' : '85px',
		editable : false
	},

	{
		'text' : 'GRV/TV No.',
		'datafield' : 'mrvTVNo',
		'width' : '150px',
		editable : false
	},

	{
		'text' : 'Melting Lot No.',
		'datafield' : 'meltingLotNo',
		'width' : '110px',
		editable : false
	}, {
		'text' : 'Vendor Code',
		'datafield' : 'vendorCode',
		'width' : '100px',
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'segment',
		'width' : '80px',
		editable : false
	}, {
		'text' : 'Location',
		'datafield' : 'location',
		'width' : '80px',
		editable : false
	}, {
		'text' : 'Ref No.',
		'datafield' : 'refNo',
		'width' : '80px',
		editable : false
	}, {
		'text' : 'Sl.No.',
		'datafield' : 'slNo',
		'width' : '55px',
		sortable : false,
		editable : false
	}, {
		'text' : 'Melted Bar Gross Wt.',
		'datafield' : 'grossWt',
		'width' : '160px',
		sortable : false,
		cellsalign : 'right',
		align : 'center',
		editable : false
	}, {
		'text' : 'Melted Bar Net Wt',
		'datafield' : 'netWt',
		'width' : '150px',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Exp Purity %',
		'datafield' : 'expPurityPer',
		'width' : '165px',
		cellsalign : 'right',
		align : 'center',
		sortable : false,
		editable : false
	}, {
		'text' : 'Exp Pure Wt.',
		'datafield' : 'expPureWt',
		'width' : '125px',
		sortable : false,
		cellsalign : 'right',
		align : 'center',
		editable : false
	}, {
		'text' : 'Status',
		'datafield' : 'status',
		'width' : '60px',
		sortable : false,
		editable : false
	}, {
		'text' : 'Action',
		'datafield' : 'meltingActionId',
		editable : false,
		sortable : false,
		'width' : '60px'
	}

	];

	showMyGrid(datafields, "", "list",
			columns, "", updateRows, "createdDate");
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
$('input:text:visible:first').focus();