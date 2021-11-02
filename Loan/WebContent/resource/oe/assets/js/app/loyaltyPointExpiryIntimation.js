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

var intimationFieldFilters = function() {

	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var loyaltyCardNo = $('#loyaltyCardNo').val();
	var custName = $('#customerName').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (loyaltyCardNo != "" && loyaltyCardNo != null) {
		fieldFilters.fieldFilters["loyalCardNo"] = loyaltyCardNo;
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (custName != "" && custName != null) {
		fieldFilters.fieldFilters["customerName"] = custName;
	}
	
	return fieldFilters;
}

//Search Grid Started
function intimationSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'createdDate','type' : 'string','map' : 'createdDate'},
		{'name' : 'createdBy','type' : 'string','map' : 'createdBy'}, 
		{'name' : 'mode','type' : 'string','map' : 'mode'},
		{'name' : 'loyaltyCardNo','type' : 'string','map' : 'loyalCardNo'},
		{'name' : 'customerName','type' : 'string','map' : 'customerName'},
		{'name' : 'loyaltyPoint','type' : 'int','map' : 'loyalPoints'},
		{'name' : 'actionV','type' : 'int','map' : 'id'},
		{'name' : 'viewData','type' : 'int','map' : 'view'},

        ];

	var columns = [
		{'text' : 'Created Date ','datafield' : 'createdDate','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Created By','datafield' : 'createdBy','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Mode','datafield' : 'mode','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},

		{'text' : 'Loyalty Card No','datafield' : 'loyaltyCardNo','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Customer Name','datafield' : 'customerName','width' : '20%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Loyalty Point','datafield' : 'loyaltyPoint','width' : '20%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'View','datafield' : 'actionV','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemRenderer},
		{'text' : 'View','datafield' : 'viewData','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',hidden:true},

		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchIntimateReminder","list", columns,intimationFieldFilters(), updateRows, "");
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

$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		intimationSearchGrid();
		$("#jqxgrid").show();
	}
	
});

var intRemRenderer = function(row, column, value) {
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation"  type="button" id='
	+ row
	+ ' onclick="editIntRemDet('
	+ value
	+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-lg"></i></a>'
}

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('loyaltyPointExpiryIntimation', 'bodySwitcher')"
});

//validations started here
$("#lblAlphaOrder").hide();
$("#lblNumOrder").hide();

$("#customerName").on('blur',function(){
	var alphabeticalOrder = $('#customerName').val();
	var regpan = /^[a-zA-Z ]*$/;

	if(alphabeticalOrder != ""){
		if(regpan.test(alphabeticalOrder)){
			$("#lblAlphaOrder").hide();
			$("#search").prop('disabled',false);
			$("#customerName").removeClass("validateView");
		} else {
		   // invalid pan card number
			$("#lblAlphaOrder").show();
			$("#customerName").addClass("validateView");
			$("#search").prop('disabled',true);
		}
	}
	
});

$("#loyaltyCardNo").on('blur',function(){
	var alphabeticalOrder = $('#loyaltyCardNo').val();
	var regpan = /^[0-9 ]*$/;

	if(alphabeticalOrder != ""){
		if(regpan.test(alphabeticalOrder)){
			$("#lblNumOrder").hide();
			$("#search").prop('disabled',false);
			$("#loyaltyCardNo").removeClass("validateView");
		} else {
		   // invalid pan card number
			$("#lblNumOrder").show();
			$("#loyaltyCardNo").addClass("validateView");
			$("#search").prop('disabled',true);
		}
	}
	
});

var editIntRemDet = function(tempId){
	console.log(tempId);
	$('#popupheaderlabel').text('Loyalty Points Expiry Intimation - View');
    var gridData = $("#jqxgrid").jqxGrid('getrows');
    $.each(gridData,function(k,v){
    	console.log(v);
    	if(v.actionV == tempId){
    		$("#reminderContentLpC").val(v.viewData);
    	}
    });

}
