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

$("#editContent").hide();
$("#updateIntimation").hide();
$("#fnameField").hide();

var modeList = [
		 // {"id": "SMS","name": "SMS"},
	      {"id": "Mail","name": "Mail"},
	     // {"id": "Whatsapp","name": "Whatsapp"}
	      ];

var onLoadFunction = function(){
	var today = new Date();
	console.log(today);
	var dd1 = today.getDate();
	var mm1 = today.getMonth() + 1;
	var yy1 = today.getFullYear();
	var todayC = dd1 + "/" + mm1 + "/" + yy1;
	
	$("#currDate").val(todayC);
	
	$('#popupheaderlabel').text('Create Promotion Event');
	
	 $('#intRemModeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(modeList, function(key, val) {
		$('#intRemModeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	 });
	
	$.getJSON('/OrderExecution/api/v1/createPromotionEventsTempletLOV', function(data) {
		if(data.resCode == 1){
			$('#promoTypeS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.promoTypes,	function(k, v) {
				$('#promoTypeS').append('<option value="' + v.id + '">' + v.name + '</option>');
			});
		}
	});	
}

onLoadFunction();

$("#clear").on('click',function(){
	$("#mailContent").val("");
});

$("#intRemModeS").on('change',function(){
	if($("#intRemModeS").val() != "Mail"){
		$("#createMail").prop('disabled',true);	
	}else{
		$("#createMail").prop('disabled',false);	
	}
});

$("#createMail").on('click',function(){
	$("#mailContent").val("");
	if($('#promoTypeS').val() == "" || $('#intRemModeS').val() == ""){
		$.growl.error({
			message : "Please Select Promo Type and Mode !!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		var promoName = $('#promoTypeS option:selected').text()
		//$("#orderNo").val(promoName);
		
		var params = {
				"irModeType":  $("#promoTypeS").val(),
				"irRefDocType": $("#intRemModeS").val() 
			}
		postJSON('/OrderExecution/api/v1/promotionEventsCreateTemplate?mode=create',JSON.stringify(params),function(data) {
			if(data.resCode == "1"){
				$("#mailContent").val(data.payload.template.text);
			}
		});
	}
});

var searchFieldFilters = function() {
	var promoTypeS = $("#promoTypeS").val();
	var intRemModeS = $('#intRemModeS').val();
	var statusS = $('#statusS').val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	
	var status;
	if(statusS == "True"){
		status = 1;
	}else{
		status = 0;
	}

	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if(promoTypeS != "" && promoTypeS != null){
		fieldFilters.fieldFilters["promoMode"] = promoTypeS
	}
	if (intRemModeS != "" && intRemModeS != null) {
		fieldFilters.fieldFilters["promoType"] = intRemModeS;
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["isActive"] = status;
	}
	
	return fieldFilters;
}

//Search Grid Started
function intimationSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'id','type' : 'string','map' : 'id'},
		{'name' : 'createdDate','type' : 'string','map' : 'createdDate'}, 
		{'name' : 'promoType','type' : 'string','map' : 'promotionType'},
		{'name' : 'mode','type' : 'string','map' : 'mode'},
		{'name' : 'actionV','type' : 'int','map' : 'id'},
		{'name' : 'actionE','type' : 'int','map' : 'id'},
		{'name' : 'ActiveInActive','type' : 'string','map' : 'isActive'}, 
		{'name' : 'text','type' : 'string','map' : 'text'}, 

        ];

	var columns = [
		{'text' : 'Id','datafield' : 'id','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Created Date','datafield' : 'createdDate','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Promotion Type','datafield' : 'promoType','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},

		{'text' : 'Mode','datafield' : 'mode','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'text','datafield' : 'text','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true,hidden:true},

		{'text' : 'Active/In-Active','datafield' : 'ActiveInActive','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			cellsrenderer: function(row, column, value){
				if(value == true){
					return "<div align='center'style='margin-top:8px;'>Active</div>";
				}else{
					return "<div align='center'style='margin-top:8px;'>In-Active</div>";
				}
	      		
	      	} 
		},
		{'text' : 'View','datafield' : 'actionV','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemViewRenderer},
		{'text' : 'Edit','datafield' : 'actionE','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemEditRenderer},

		];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchPromotionEventsTemplet","list", columns,searchFieldFilters(), updateRows, "");
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

var intRemViewRenderer = function(row, column, value) {
   
		return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation"  type="button" id='
		+ row
		+ ' onclick="viewIntRemDet('
		+ value
		+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-lg"></i></a>'
     
}

var intRemEditRenderer = function(row, column, value) {
    var flag = $("#jqxgrid").jqxGrid('getrowdata', row);
    console.log(flag);
    
    if(flag.ActiveInActive == true){
    	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation"  type="button" id='
    	+ row
    	+ ' onclick="editIntRemDet('
    	+ value
    	+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-lg"></i></a>'
    }else{
    	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createIntimation" disabled type="button" id='
    	+ row
    	+ ' onclick="editIntRemDet('
    	+ value
    	+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-lg"></i></a>'
    }
	
 
}

$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}else{
		intimationSearchGrid();
		$("#jqxgrid").show();
	}
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('promoEventTemplate', 'bodySwitcher')"
});

var editIntRemDet = function(id){
	$("#editContent").show();
	$("#createContent").hide();
	$("#updateIntimation").show();
	$("#saveIntimation").hide();
	$("#clear").show();
	
	$('#popupheaderlabel').text('Edit Promotion Event');
	
	 var gridData = $("#jqxgrid").jqxGrid('getrows');
	    $.each(gridData,function(k,v){
	    	console.log(v);
	    	if(v.actionE == id){
	    		$("#mailContentE").val(v.text);
	    		$("#promoIdE").val(id);
	    	}
	    });
}

var viewIntRemDet = function(id){
	$("#editContent").show();
	$("#createContent").hide();
	$("#updateIntimation").hide();
	$("#saveIntimation").hide();
	$("#clear").hide();
	
	$('#popupheaderlabel').text('View Promotion Event');
	
	 var gridData = $("#jqxgrid").jqxGrid('getrows');
	    $.each(gridData,function(k,v){
	    	console.log(v);
	    	if(v.actionV == id){
	    		$("#mailContentE").val(v.text);
	    	}
	    });
}

$("#saveIntimation").on('click',function(){
	if($("#mailContent").val() == ""){
		$.growl.error({
			message : "Please Enter Content !!! ",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		var params = {
				"irModeType":$("#intRemModeS").val()  ,
				"irRefDocType": $("#promoTypeS").val(),
				"temText": $("#mailContent").val()
			}
		postJSON('/OrderExecution/api/v1/promotionEventsCreateTemplate?mode=save',JSON.stringify(params),function(data) {
			if(data.resCode == 1){
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				 $("#createIntimation").modal('hide');
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		});

	}	
});

// Update
$("#updateIntimation").on('click',function(){
	if($("#mailContentE").val() == ""){
		$.growl.error({
			message: "Please Enter Content !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		var editParams = {"id":$("#promoIdE").val(),"temText":$("#mailContentE").val()}
		
		postJSON('/OrderExecution/api/v1/updatePromotionEventsCreateTemplate',JSON.stringify(editParams),function(data) {
			if(data.resCode == 1){
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				 $("#createIntimation").modal('hide');
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});

