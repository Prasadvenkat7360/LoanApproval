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
		$("#fromStoreOrDcTypeC").empty().append('<option value="" selected>--Select--</option>');
		$("#toStoreOrDcC").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.storeOrDcType, function(key, val) {
			$("#storeOrDcTypeS").append('<option value="' + val.id + '">' + val.name + '</option>');
			$("#fromStoreOrDcTypeC").append('<option value="' + val.id + '">' + val.name + '</option>');
			$("#toStoreOrDcC").append('<option value="' + val.id + '">' + val.name + '</option>');
		});	
			
		$("#roleS").empty().append('<option value="" selected>--Select--</option>');
		$("#roleC").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.role, function(key, val) {
			$("#roleS").append('<option value="' + val.id + '">' + val.name + '</option>');
			$("#roleC").append('<option value="' + val.id + '">' + val.name + '</option>');
		});
			
		$("#readOrUnreadS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.readTypes, function(key, val) {
			$("#readOrUnreadS").append('<option value="' + val.id + '">' + val.name + '</option>');
		});	
			
		$("#raisedByS").empty().append('<option value="" selected>--Select--</option>');
		$("#raisedByC").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.raisedBy, function(key, val) {
			$("#raisedByS").append('<option value="' + val.description + '">' + val.name + '</option>');
			$("#raisedByC").append('<option value="' + val.description + '">' + val.name + '</option>');
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


$("#fromStoreOrDcTypeC").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/getStoreOrDcList?storeOrDc='+$("#fromStoreOrDcTypeC").val(), function(data) {
		$("#fromStoreOrDcNameC").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.list, function(key, val) {
			 $("#fromStoreOrDcNameC").append('<option value="' + val.id + '">' + val.name + '</option>');
		});	
	});
});

$("#toStoreOrDcC").on('change',function(){
	$.getJSON('/OrderExecution/api/v1/getStoreOrDcList?storeOrDc='+$("#toStoreOrDcC").val(), function(data) {
		$("#toStoreOrDcNameC").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.list, function(key, val) {
			 $("#toStoreOrDcNameC").append('<option value="' + val.id + '">' + val.name + '</option>');
		});	
	});
});

// Create Notification
$("#notificationCreate").on('click',function(){
		if($("#fromStoreOrDcTypeC").val() == " " || $("#fromStoreOrDcTypeC").val() == null 
			|| $("#fromStoreOrDcNameC").val() == "" || $("#fromStoreOrDcNameC").val() == null
			|| $("#toStoreOrDcC").val()  == " "|| $("#toStoreOrDcC").val() == null
			|| $("#toStoreOrDcNameC").val() == null || $("#toStoreOrDcNameC").val()  == " " 
			|| $("#raisedByC").val() == null || $("#raisedByC").val()  == " "
			|| $("#roleC").val() == null || $("#roleC").val()  == " "  
			|| $("#titleC").val() == null || $("#titleC").val()  == " " 
			|| $("#messageC").val() == null || $("#messageC").val()  == " " ){
				$.growl.error({
					message : "Please Fill Mandatory Fields !!!",
					duration : 1000,
					title : 'Error'
				});
				return false;
		}
		var createObj = {
				"fromStoreOrDC" : $("#fromStoreOrDcTypeC").val(),
				"fromStoreOrDcId" : parseInt($("#fromStoreOrDcNameC").val()) ,
				"toStoreOrDC"  : $("#toStoreOrDcC").val(),
				"toStoreOrDcId" : parseInt($("#toStoreOrDcNameC").val()) ,
				"title" : $("#titleC").val(),
				"message" :$("#messageC").val() ,
				"remarks" : $("#remarksC").val(),
				"role" : {
					"id" : $("#roleC").val(),
				},
				 "alertType":"System",
			}
			postJSON('/OrderExecution/api/v1/createNotification',JSON.stringify(createObj),function(data) {
				if(data.resCode == "1"){
					$.growl.notice({
						message : data.mesgStr,
						duration :  1000,
						title : 'Success'
					});
					notificationSearchGrid();
				}else{
					$.growl.error({
						message : data.mesgStr,
						duration :  1000,
						title : 'Error'
					});
					return false;
				}
			});
});



//Field Filters
var notificationFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $('#toDateS').val();
	var storeOrDcTypeS = $('#storeOrDcTypeS').val();
	var storeOrDcNameS = $('#storeOrDcNameS').val();
	var readOrUnreadS = $("#readOrUnreadS").val();
	var raisedByS = $('#raisedByS').val();
	var roleS = $('#roleS').val();
	var raisedToS = $("#raisedToS").val();
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
	if(readOrUnreadS != "" && readOrUnreadS !=null){
		fieldFilters.fieldFilters["readFlag"] = readOrUnreadS;
	}
	if(raisedByS != "" && raisedByS !=null){
		fieldFilters.fieldFilters["raisedBy"] = raisedByS;
	}
	if(roleS != "" && roleS !=null){
		fieldFilters.fieldFilters["role"] = roleS;
	}
	if(raisedToS != "" && raisedToS !=null){
		fieldFilters.fieldFilters[""] = raisedToS;
	}
	return fieldFilters;
}


// Search Grid Started
function notificationSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	var datafields = [ 
		{'name' : 'slNo','type' : 'int','map' : 'id'},
		{'name' : 'fromStoreDc','type' : 'string','map' : 'fromStoreOrDC'}, 
		{'name' : 'fromStoreDcName','type' : 'string','map' : 'fromStoreOrDcName'},
		{'name' : 'title','type' : 'string','map' : 'title'},
		{'name' : 'toStoreDc','type' : 'string','map' : 'toStoreOrDC'}, 
		{'name' : 'toStoreDcName','type' : 'string','map' : 'toStoreOrDcName'},
		{'name' : 'raisedBy','type' : 'string','map' : 'createBy'}, 
		{'name' : 'raisedTo','type' : 'string','map' : 'sendTo'},
		{'name' : 'actionId','type' : 'int','map' : 'id'},
        ];

	var columns = [
		{'text' : 'Sl No.','datafield' : 'slNo','width' : '5%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'From Store/DC','datafield' : 'fromStoreDc','width' : '12%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'From Store/DC Name','datafield' : 'fromStoreDcName','width' : '13%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Title','datafield' : 'title','width' : '14%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'To Store/DC','datafield' : 'toStoreDc','width' : '12%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'To Store/DC Name','datafield' : 'toStoreDcName','width' : '13%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Raised By','datafield' : 'raisedBy','width' : '14%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Raised To','datafield' : 'raisedTo','width' : '14%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : '','datafield' : 'actionId',editable : false,cellsalign : 'center',align : 'center',cellsrenderer : viewNotification,sortable : false,'width' : '3%'}
		];
		showMyGrid(datafields, "/OrderExecution/api/v1/searchNotification?page=search&portal=oe","list", columns,notificationFieldFilters(), updateRows, "");
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

var viewNotification = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#viewNotificationDet"  type="button" id='
			+ row
			+ ' onclick="viewNotificationDetails('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-sm"></i></a>'
	}
}

var viewNotificationDetails = function(id){
	$.getJSON('/OrderExecution/api/v1/getNotificationById?id='+id, function(data) {
		var result = data.payload.notification;
		$("#notifIdE").val(result.id);
		 
		 $("#fromStoreDcTypeV").val(result.fromStoreOrDC);
		 
		 $("#fromStoreDcNameIdV").val(result.fromStoreOrDcId);
		 $("#fromStoreDcNameV").val(result.fromStoreOrDcName);
		 
		 $("#toStoreDcV").val(result.toStoreOrDC);
		 
		 $("#toStoreDcNameIdV").val(result.toStoreOrDcId);
		 $("#toStoreDcNameV").val(result.toStoreOrDcName);
		 
		 $("#raisedByV").val(result.createBy);
		 $("#raiseToV").val(result.sendTo);
		 $("#roleV").val(result.role.name);
		 $("#roleIdE").val(result.role.id);
		 $("#titleV").val(result.title);
		 
		 $("#messageV").val(result.message);
		 $("#remarksV").val(result.remarks);
	});
}

$("#updateNotification").on('click',function(){
	if($("#messageV").val() == "" || $("#messageV").val == null || $("#remarksV").val == "" || $("#remarksV").val == null ){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 1000,
			title :'Error'
		});
		return false;
	}else{
		var updateObj = {
				  "id": $("#notifIdE").val(),
				  /*"fromStoreOrDC": $("#fromStoreDcTypeV").val(),
				  "fromStoreOrDcId": $("#fromStoreDcNameIdV").val(),
				  "toStoreOrDC": $("#toStoreDcV").val(),
				  "toStoreOrDcId": $("#toStoreDcNameIdV").val(),
				  "title": $("#titleV").val(),*/
				  "message": $("#messageV").val(),
				  "remarks": $("#remarksV").val(),
				  "alertType":"System",
				  /*"role":{
				    "id": $("#roleIdE").val()
				  }*/
			}
		if(updateObj){
			postJSON('/OrderExecution/api/v1/updateNotification',JSON.stringify(updateObj),function(data) {
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
			postJSON('/OrderExecution/api/v1/searchNotification?page=export',JSON.stringify(notificationFieldFilters()),function(response) {
				if(response != null){
					data = response.payload.list;
					for (i = 0; i < data.length; i++) {
						newData.push({
							'Sl No' : (data[i].id != null) ? data[i].id : "",
							'From Store/DC' : (data[i].fromStoreOrDC!= null) ? data[i].fromStoreOrDC : "",	
							'From Store/DC Name' : (data[i].fromStoreOrDcName != null) ? data[i].fromStoreOrDcName : "",
							'Title' : (data[i].title != null) ? data[i].title : "",	
							'To Store/DC' : (data[i].toStoreOrDC != null) ? data[i].toStoreOrDC : "",
							'To Store/DC Name' : (data[i].toStoreOrDcName != null) ? data[i].toStoreOrDcName : "",
							'Raised By' : (data[i].createBy != null) ? data[i].createBy : "",
							'Raised To' : (data[i].sendTo != null) ? data[i].sendTo : "",
				           });
					}
               var opts = [{sheetid:'Notification',header:true}];
               var res = alasql('SELECT * INTO XLSX("Notification_'+sysdate+'.xlsx",?) FROM ?', [opts,[newData]]);
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
	notificationSearchGrid();
	$("#jqxgrid").show();
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('notificationSearch', 'bodySwitcher')"
});

$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});
