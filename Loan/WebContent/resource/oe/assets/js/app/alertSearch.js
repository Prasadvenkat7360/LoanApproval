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
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
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
});  


//on load lov's
var onLoadLov = function(){
$.getJSON('/OrderExecution/api/v1/notificationLOVs', function(data) {
		$("#storeOrDcTypeS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.storeOrDcType, function(key, val) {
			$("#storeOrDcTypeS").append('<option value="' + val.id + '">' + val.name + '</option>');
		});	
			
		$("#roleS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.role, function(key, val) {
			$("#roleS").append('<option value="' + val.id + '">' + val.name + '</option>');
		});
			
		$("#readOrUnreadS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.readTypes, function(key, val) {
			$("#readOrUnreadS").append('<option value="' + val.id + '">' + val.name + '</option>');
		});
			
		$("#statusS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.status, function(key, val) {
			$("#statusS").append('<option value="' + val.id + '">' + val.name + '</option>');
		});	
			
		$("#raisedByS").empty().append('<option value="" selected>--Select--</option>');
		$("#raisedByE").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.raisedBy, function(key, val) {
			$("#raisedByS").append('<option value="' + val.description + '">' + val.name + '</option>');
			$("#raisedByE").append('<option value="' + val.description + '">' + val.name + '</option>');
		});	
	});
}
onLoadLov();

$("#storeOrDcTypeS").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/getStoreOrDcList?storeOrDc='+$("#storeOrDcTypeS").val(), function(data) {
		$("#storeOrDcNameS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.list, function(key, val) {
			 $("#storeOrDcNameS").append('<option value="' + val.id + '">' + val.name + '</option>');
		});	
	});
});

//Field Filters
var alertSearchFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $('#toDateS').val();
	var storeOrDcTypeS = $('#storeOrDcTypeS').val();
	var storeOrDcNameS = $('#storeOrDcNameS').val();
	var roleS = $('#roleS').val();
	var statusS = $('#statusS').val();
	var readOrUnreadS = $("#readOrUnreadS").val();
	var raisedByS = $('#raisedByS').val();
	var authorizedBy = $("#authorizedBy").val();
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if(fromDateS != "" && fromDateS != null){
		fieldFilters.fieldFilters["fromDate"] = fromDateS
	}
		
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (storeOrDcTypeS != "" && storeOrDcTypeS != null) {
		fieldFilters.fieldFilters["storeOrDcType"] = storeOrDcTypeS;
	}
	if(storeOrDcNameS != "" && storeOrDcNameS !=null){
		fieldFilters.fieldFilters["storeOrDcId"] = storeOrDcNameS;
	}
	if(roleS != "" && roleS !=null){
		fieldFilters.fieldFilters["role"] = roleS;
	}
	if(statusS != "" && statusS !=null){
		fieldFilters.fieldFilters["status"] = statusS;
	}
	if(readOrUnreadS != "" && readOrUnreadS !=null){
		fieldFilters.fieldFilters["readFlag"] = readOrUnreadS;
	}
	if(raisedByS != "" && raisedByS !=null){
		fieldFilters.fieldFilters["raisedBy"] = raisedByS;
	}
	if(authorizedBy != "" && authorizedBy !=null){
		fieldFilters.fieldFilters[""] = authorizedBy;
	}
	return fieldFilters;
}


// Search Grid Started
function alertSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	var datafields = [ 
		{'name' : 'slNo','type' : 'int','map' : 'id'},
		{'name' : 'fromStoreDc','type' : 'string','map' : 'fromStoreOrDC'}, 
		{'name' : 'fromStoreDcName','type' : 'string','map' : 'fromStoreOrDcName'},
		{'name' : 'title','type' : 'string','map' : 'title'},
		{'name' : 'status','type' : 'string','map' : 'status'},
		{'name' : 'toStoreDc','type' : 'string','map' : 'toStoreOrDC'}, 
		{'name' : 'toStoreDcName','type' : 'string','map' : 'toStoreOrDcName'},
		{'name' : 'raisedBy','type' : 'string','map' : 'createBy'}, 
		{'name' : 'authorizedBy','type' : 'string','map' : ''},
		{'name' : 'actionId','type' : 'int','map' : 'id'},
        ];

	var columns = [
		{'text' : 'Sl No.','datafield' : 'slNo','width' : '5%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'From Store/DC','datafield' : 'fromStoreDc','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'From Store/DC Name','datafield' : 'fromStoreDcName','width' : '13%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Title','datafield' : 'title','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Status','datafield' : 'status','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'To Store/DC','datafield' : 'toStoreDc','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'To Store/DC Name','datafield' : 'toStoreDcName','width' : '13%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Raised By','datafield' : 'raisedBy','width' : '13%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Authorized By','datafield' : 'authorizedBy','width' : '13%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : '','datafield' : 'actionId',editable : false,cellsalign : 'center',align : 'center',cellsrenderer : viewAlert,sortable : false,'width' : '3%'}
		];
		showMyGrid(datafields, "/OrderExecution/api/v1/searchAlert?page=search&portal=oe&type=search","list", columns,alertSearchFieldFilters(), updateRows, "");
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

var viewAlert = function(row, column, value) {
	/*var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	console.log(permission);
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{*/
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#viewAlertDet"  type="button" id='
			+ row
			+ ' onclick="viewAlertDetails('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></a>'
	//}
}

var viewAlertDetails = function(id){
	$.getJSON('/OrderExecution/api/v1/getAlertById?id='+id, function(data) {
		var result = data.payload.alert;
		 $("#alertIdE").val(result.id);
		 if(result.status == "Close"){
			 $("#updateAlert").prop('disabled' ,true);
			 $("#statusE").prop('disabled' ,true);
		 }else{
			 $("#updateAlert").prop('disabled' ,false);
			 $("#statusE").prop('disabled' ,false);
		 }
		 $("#fromStoreOrDcTypeE").val(result.fromStoreOrDC);
		 
		 $("#fromStoreOrDcIdE").val(result.fromStoreOrDcId);
		 $("#fromStoreOrDcNameE").val(result.fromStoreOrDcName);
		 
		 $("#toStoreOrDcE").val(result.toStoreOrDC);
		 $("#toStoreOrDcIdE").val(result.toStoreOrDcId);
		 
		 $.getJSON('/OrderExecution/api/v1/notificationLOVs', function(data) {
			$("#statusE").empty().append('<option value="" selected>--Select--</option>');
		    $.each(data.payload.status,function(key,val){
					 if (result.status == val.name) {
						  $("#statusE").append('<option selected value="'+val.id+'">'+ val.name + '</option>');
					}else{
						$("#statusE").append('<option value="'+val.id+'">'+ val.name +'</option>');
			        } 
			   })
		 });
		 
		 $("#readOrUnreadE").val(result.isRead);
		 $("#toStoreOrDcNameE").val(result.toStoreOrDcName);
		 $("#toStoreOrDcNameIdE").val(result.toStoreOrDcId);
		 $("#titleE").val(result.title);
		 $("#messageE").val(result.message);
		 $("#remarksE").val(result.remarks);
		 $("#raisedToE").val(result.role);
		 $("#raisedByE").val(result.createBy);
		 $("#authorizedByE").val(result.createBy);
	});
}

$("#updateAlert").on('click',function(){
	if($("#statusE").val() == "" || $("#statusE").val == null || $("#remarksE").val == "" || $("#remarksE").val == null ){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 1000,
			title :'Error'
		});
		return false;
	}else{
		var updateObj = {
				"id" : $("#alertIdE").val(),
				/*"fromStoreOrDC" : $("#fromStoreOrDcTypeE").val(),
				"fromStoreOrDcId" : $("#fromStoreOrDcIdE").val(),
				"toStoreOrDC" : $("#toStoreOrDcE").val(),
				"toStoreOrDcId" : $("#toStoreOrDcNameIdE").val(),
				"title" : $("#titleE").val(),
				"message" : $("#messageE").val(),*/
				"remarks" : $("#remarksE").val(),
				//"isRead"  : $("#readOrUnreadE").val(),
				"status" : $("#statusE").val()
		}
		if(updateObj){
			postJSON('/OrderExecution/api/v1/updateAlert',JSON.stringify(updateObj),function(data) {
				if(data.resCode == "1"){
					$.growl.notice({
						message : data.mesgStr,
						duration :  1000,
						title : 'Success'
					});
					alertSearchGrid();
				}else{
					$.growl.error({
						message : data.mesgStr,
						duration :  1000,
						title : 'Error'
					});
					return false;
				}
			});
		}
	}
});

	


//Export Functionality
$("#export").on("click",function() {
	 var sysdate = moment().format('DDMMYYYYHHmmSS');
	 var data;
	 var newData = [];
   
 var sysdate = moment().format('DDMMYYYYHHmmSS');
 var rows = $("#jqxgrid").jqxGrid('getrows');
 if(typeof rows == "undefined"){
	$.growl.error({
		message : "No Data to Export.",
		duration : 10000
	});
	return false;
	}else{			
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/searchAlert?page=export&portal=oe&type=search',JSON.stringify(alertSearchFieldFilters()),function(response) {
				if(response != null){
					data = response.payload.list;
					for (i = 0; i < data.length; i++) {
						newData.push({
							'Sl No' : (data[i].id != null) ? data[i].id : "",
							'From Store/DC' : (data[i].fromStoreOrDC!= null) ? data[i].fromStoreOrDC  : "",	
							'From Store/DC Name' : (data[i].fromStoreOrDcName != null) ? data[i].fromStoreOrDcName : "",
							'Title' : (data[i].title != null) ? data[i].title : "",	
							'Status' :  (data[i].status !=null) ? data[i].status : "",
							'To Store/DC' : (data[i].toStoreOrDC != null) ? data[i].toStoreOrDC : "",
							'To Store/DC Name' : (data[i].toStoreOrDcName != null) ? data[i].toStoreOrDcName : "",
							'Raised By' : (data[i].createBy != null) ? data[i].createBy : "",
							'Authorized By' : (data[i].actionEmpId != null) ? data[i].actionEmpId : "",
				           });
					}
               var opts = [{sheetid:'Alert',header:true}];
               var res = alasql('SELECT * INTO XLSX("Alert_'+sysdate+'.xlsx",?) FROM ?', [opts,[newData]]);
            }
        });
		   }else{
				  $.growl.error({
					message : "No Data to Export.",
					duration : 10000
				});
					return false;	
				}
			}
		});

$("#search").on('click',function(){
	alertSearchGrid();
	$("#jqxgrid").show();
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('alertSearch', 'bodySwitcher')"
});

$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});
