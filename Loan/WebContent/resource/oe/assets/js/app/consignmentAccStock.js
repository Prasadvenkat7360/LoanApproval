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
$("#accFromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#accToDateS").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#accToDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
});


//on Load Lov's
var onLoadFunction = function() {
$.getJSON('',function(data) {
		var vCode = data.payload.vCodes;
		mrvNo = data.payload.mrvNo;
		
		// Vendor Code Lov
		var v = '<select id="vCodeObj"  name="vCodeObj" class="form-control" multiple="multiple">';
			$.each(vCode, function(key, val) {
			v += '<option value="' + val.id + '">' + val.description + '</option>'; 
			});
			
			v += '</select>';
			
			$("#vendCodeS").html(v);
			
			$('#vCodeObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		
		
		// lov for Status
		$('#accStatus').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.status, function(key, val) {
			$('#accStatus').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
		 
	    // smart search for GR No
		var data = [];
		$.each(mrvNo, function(key, value) {
		data.push({
			value : value.id,
			});
		});
		$(function() {
			$("#mrvNoS").autocomplete({
				source : data,
				focus : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
				},
				 select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
					$("#mrvNoS-value").val(ui.item.value);
					}
				});
			});
		});
}
onLoadFunction();

//############################### Search Grid Started ##############################
var consignmentAccStockGrid = function(data) {
	
	var source = {
		datafields : [ 
			{'name' : 'storeName','type' : 'string','map':''},
			{'name' : 'grNo','type' : 'string','map':''},
			{'name' : 'grDate','type' : 'int','map':''}, 
			{'name' : 'vendorCode','type' : 'string','map':''},
			{'name' : 'vBillNo','type' : 'int','map':''},
			{'name' : 'zone','type' : 'string','map':''},
			{'name' : 'accSeg','type' : 'string','map':''}, 

	        {'name' : 'accCat','type' : 'string','map':''},
			{'name' : 'accSubCat','type' : 'string','map':''},
			{'name' : 'articleCode','type' : 'string','map':''}, 
			{'name' : 'stockNo','type' : 'int','map':''}, 
			
			{'name' : 'pcs','type' : 'int','map':''}, 
			{'name' : 'accWt','type' : 'float','map':''},
			{'name' : 'uqc','type' : 'string','map':''}, 
			{'name' : 'accCostRate','type' : 'string','map':''}, 
			{'name' : 'accCost','type' : 'string','map':''}, 
			
			{'name' : 'statusDate','type' : 'date','map':''}, 
			{'name' : 'itemStatus','type' : 'string','map':''},
			{'name' : 'refDocNo','type' : 'int','map':''}, 
			{'name' : 'noOfdaysatCompany','type' : 'int','map':''}, 
			],
		localdata : data
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : false,
		columnsheight : 70,
		autorowheight : true,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		showstatusbar : true,
		showaggregates : true,
		columnsresize : true,
		columns : [ 
			{'text' : 'Store Name','datafield' : 'storeName','width' : '5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'GR No','datafield' : 'grNo','width' : '3.5%',sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'GR Date','datafield' : 'grDate','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy'},
			{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},

			{'text' : 'Vendor Bill No.','datafield' : 'vBillNo','width' : '4.5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Zone','datafield' : 'zone','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Seg','datafield' : 'accSeg','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Acc Cat','datafield' : 'accCat','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			
			{'text' : 'Acc Sub Category','datafield' : 'accSubCat','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Article Code.','datafield' : 'articleCode','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stock No','datafield' : 'stockNo','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Wt','datafield' : 'accWt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Acc Cost Rate','datafield' : 'accCostRate','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			
			{'text' : 'Acc Cost','datafield' : 'accCost','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
			{'text' : 'Status Date','datafield' : 'statusDate','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
			{'text' : 'Item Status','datafield' : 'itemStatus','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Ref Doc No','datafield' : 'refDocNo','width' : '4.5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'No of Days @ Company','datafield' : 'noOfdaysatCompany','width' : '8.5%',cellsalign : 'center',	align : 'center',sortable : false,editable : false}]
	});	
}

$("#searchAcc").on('click',function(){
	var fDate = $("#accFromDateS").val();
	var tDate = $("#accToDateS").val();
		if(fDate == "" || fDate == null || tDate == "" || tDate == null){
			$.growl.error({
				message : "Please Fill Mandatory Fields!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}else{
			consignmentAccStockGrid();
			$("#jqxgridAcc").show();
		}
});
