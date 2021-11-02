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


$("#intRemRefTypeS").on('change',function(){
	intimationRestrict();
});

$("#intRemTypeS").on('change',function(){
	intimationRestrict();
});

var intimationRestrict = function(){
	var intType = $("#intRemTypeS").val();
	var refDoc = $("#intRemRefTypeS").val();
	if(intType != "" && refDoc != ""){
		if(intType == "I" && refDoc == "AB" ){
			$("#search").prop('disabled',true);
			$.growl.error({
				message : "No Intimations Found for Approval Bill",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}else{
			$("#search").prop('disabled',false);
		}
	}else{
		$("#search").prop('disabled',false);
	}
}

var irDocType = [];
var onLoadLovFunc = function(){
$.getJSON('/OrderExecution/api/v1/IntimationReminderTemplateOnLoadLovs', function(data) {
	console.log(data.payload.customer_list)
	 $('#intRemModeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.IRModesAll, function(key, val) {
		$('#intRemModeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	 });
		
	 $('#intRemTypeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.IRTypesAll, function(key, val) {
		$('#intRemTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	 });
		
	 $('#intRemRefTypeS').empty().append('<option value="" selected>--Select--</option>');
	 	irDocType = data.payload.IRRefDocTypesAll;
	 $.each(irDocType, function(key, val) {
		$('#intRemRefTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	 });
		
	 $('#intRemRefTypeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.IRRefDocTypesAll, function(key, val) {
		$('#intRemRefTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	 });
		
		var customerList = data.payload.customer_list;
		console.log(customerList);
		
			var data = [];
		$.each(customerList, function(key, value) {
			data.push({
				value : value.id,
				label : value.name
			});
		});

		$(function() {
			$("#custName").autocomplete({

				source : data,
				focus : function(event, ui) {

					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#custName-value").val(ui.item.value);
				}
			});
		});
  });
}

onLoadLovFunc();

$("#intRemTypeS").on('change',function(){
    var intRemType = $("#intRemTypeS").val()	
    if(intRemType == "I"){
    	irDocType = irDocType[0];
    }else{
    	irDocType = irDocType;
    }
});
var intRemRepFieldFilters = function() {
	var intRemModeS = $("#intRemModeS").val();
	var intRemTypeS = $('#intRemTypeS').val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var custId = $('#custName-value').val();
	var orderNo = $('#orderNo').val();
	var intRemRefTypeS = $('#intRemRefTypeS').val();

	fieldFilters = {
		"fieldFilters" : {}
	};
	
	console.log(length);
	
	if(intRemModeS != "" && intRemModeS != null){
		fieldFilters.fieldFilters["irMode"] = intRemModeS
	}
	if (intRemTypeS != "" && intRemTypeS != null) {
		fieldFilters.fieldFilters["intreminderType"] = intRemTypeS;
	}
	if (intRemRefTypeS != "" && intRemRefTypeS != null) {
		fieldFilters.fieldFilters["intRemRefDocType"] = intRemRefTypeS;
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (custId != "" && custId != null) {
		fieldFilters.fieldFilters["customerId"] = parseInt(custId);
	}
	if (orderNo != "" && orderNo != null) {
		fieldFilters.fieldFilters["orderNo"] = parseInt(orderNo);
	}

	return fieldFilters;
}


//Search Grid Started
function intimationRemSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'intRemType','type' : 'string','map' : 'irType'},
		{'name' : 'intMode','type' : 'string','map' : 'irModeType'}, 
		{'name' : 'orderNo','type' : 'string','map' : 'refNo'}, 
		{'name' : 'fromDate','type' : 'string'},
		{'name' : 'toDate','type' : 'string'},	
		{'name' : 'custName','type' : 'string','map' : 'custName'},

		{'name' : 'custPhoneNo','type' : 'string','map' : 'custPhoneNumber'},
		{'name' : 'amtDue','type' : 'float','map' : 'amountDue'},
		{'name' : 'intCount','type' : 'int','map' : 'intimationCount'},
		{'name' : 'remCount','type' : 'int','map' : 'reminderCount'},

		{'name' : 'smsOrWatsAppText','type' : 'string','map' : ''}, 
		{'name' : 'actionId','type' : 'int','map' : 'id'}, 

        ];

	var columns = [
		{'text' : 'Intimation Type','datafield' : 'intRemType','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Intimation Mode','datafield' : 'intMode','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Order No','datafield' : 'orderNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},

		{'text' : 'From Date','datafield' : 'fromDate','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'To Date','datafield' : 'toDate','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Customer Name','datafield' : 'custName','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Customer Phone No','datafield' : 'custPhoneNo','width' : '10%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
		{'text' : 'Amount Due','datafield' : 'amtDue','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Intimation Count','datafield' : 'intCount','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Reminder Count','datafield' : 'remCount','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 

		{'text' : 'SMS/Watsapp Text','datafield' : 'smsOrWatsAppText','width' : '10%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
		{
				text : 'Action',
				datafield : 'actionId',
				cellsrenderer : irPrintRenderer,
				editable : false,
				cellsalign : 'center',
				align : 'center',
				sortable : false,
				'width' : '3%'
			}

		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchIntimationReminder","list", columns,intRemRepFieldFilters(), updateRows, "");
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

function approvalBillRemSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'storeName','type' : 'string','map' : 'store>name'}, 
		{'name' : 'customerName','type' : 'string','map' : 'custName'},
		{'name' : 'abNo','type' : 'string','map' : 'refNo'}, 

		{'name' : 'srlNo','type' : 'string','map' : 'refSrlNo'}, 
		{'name' : 'intMode','type' : 'string','map' : 'irModeType'}, 
		{'name' : 'sendDate','type' : 'string','map' : 'createdDate'}, 


		{'name' : 'actionId','type' : 'string','map' : 'id'}, 
		{'name' : 'temText','type' : 'string'},
		{'name' : 'remCount','type' : 'int','map' : 'reminderCount'},

        ];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '15%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Customer Name','datafield' : 'customerName','width' : '20%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		
		{'text' : 'Approval Bill No','datafield' : 'abNo','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Approval Bill Srl No','datafield' : 'srlNo','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Mode','datafield' : 'intMode','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Reminder Count','datafield' : 'remCount','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 

		{'text' : 'Send Date','datafield' : 'sendDate','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Send Date','datafield' : 'temText','width' : '15%',hidden:true,cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},

		{
			text : 'Action',
			datafield : 'actionId',
			cellsrenderer : irViewRenderer,
			editable : false,
			cellsalign : 'center',
			align : 'center',
			sortable : false,
			'width' : '5%'
		}

		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchIntimationReminder","list", columns,intRemRepFieldFilters(), updateRows, "");
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

var irViewRenderer = function(row, column, value) {
	return '<a class="btn btn-sm btn-primary"  type="button"  data-toggle="modal" data-target="#apBillRem"   onclick=intRemViewcall('+ value +') href="#?id=' 
	+ value + '"/><i class="fa fa-eye fa-lg"></i></a>'
}

var irPrintRenderer = function(row, column, value) {
    var row = $("#jqxgrid").jqxGrid('getrowdata', row);
    console.log(row)
    var intType = $("#intRemTypeS").val();
    if(row.intMode != "Phone"){
    	return '<a class="btn btn-sm btn-primary"  type="button" onclick=intRemPrintcall('+ value +',"'+ intType +'") href="#?id=' 
		+ value + '"/><i class="fa fa-eye fa-lg"></i></a>'
    }else{
    	return '<a class="btn btn-sm btn-primary"  type="button" disabled href="#?id=' 
		+ value + '"/><i class="fa fa-eye fa-lg"></i></a>'
    }
}

function intRemViewcall(content)
{
	console.log(content);
	 var rows = $("#jqxgrid").jqxGrid('getrows');
	 
	 $.each(rows,function(k,v){
		 if(v.actionId == content){
			$("#reminderContent").val(v.temText);
		 }else{
			$("#reminderContent").val();
		 }
	 });
}

function intRemPrintcall(intId,irType)
{
	var fieldFilters = {
            "fieldFilters" : {
                "Id" : intId
            }
        }
	
	$.ajax({
		url : 'api/v1/IntimationReminderView ',
		type : 'post',
		data : fieldFilters,
		contentType : "application/x-www-form-urlencoded",
		xhrFields : {
			responseType : "arraybuffer"
		},
		success : function(data) {
			console.log(data);
			if (navigator.msSaveBlob) {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				navigator.msSaveBlob(file, 'RPT_Intimation_Reminder.pdf');
			} else {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
			}
		}
	});
}


$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == "" || $("#intRemRefTypeS").val() == "" || $("#intRemModeS").val() == "" || $("#intRemTypeS").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 10000,
			title: 'Error'
 		});
		return false;
	}else{
		if($("#intRemRefTypeS").val() == "AB"){
			approvalBillRemSearchGrid();
			$("#jqxgrid").show();
		}else{
			intimationRemSearchGrid();
			$("#jqxgrid").show();
		}
	}
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('intimationReminderReport', 'bodySwitcher')"
});