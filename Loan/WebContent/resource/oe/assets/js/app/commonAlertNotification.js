var notPopUp = function(value){
	console.log(value);
	$.getJSON('/OrderExecution/api/v1/getNotificationById?id='+value, function(data) {
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
	
	 $('#viewNotificationDetCom').modal({
		 show: 'true',
		 backdrop: 'static'
	 }); 
}

var alertPopUp = function(value){
	$.getJSON('/OrderExecution/api/v1/getAlertById?id='+value, function(data) {
		var result = data.payload.alert;
		 $("#alertIdE").val(result.id);
		 
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
	
	$('#viewAlertDet').modal('show',{ backdrop: 'static'}); 
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

var onLoad = function(flag){
	var paramN={};
	if(flag != 1){
		$("#notificationList").empty();
	}
/*	postJSON('api/v1/searchNotification?page=search&portal=oe',JSON.stringify(paramN),function(resp){
		if(resp.resCode =="1"){
			if(flag != 1){
			$.each(resp.payload.list,function(key,value){
				var li =$("<li onclick='notPopUp("+value.id+")'   style='padding:10px 0 0 5px;border-bottom:1px solid #eee'><p style='margin:0;font-size:10px'>"+
						"<i class='fa fa-envelope navbar-notification-icon' style='padding:0 6px 0 0'></i>"+value.createdDate+"</p>"+
						"<p style='color:#d55d5d;margin:0;font-size:12px'>"+value.title+"</p></li>");
				$("#notificationList").append(li);
			});
			}
		}
	})*/
	var paramA={"fieldFilters" : {"status" : "Open"}};
	if(flag != 1){
		$("#alertList").empty();
	}
/*	postJSON('api/v1/searchAlert?page=search&portal=oe&type=popup',JSON.stringify(paramA),function(resp){
		if(resp.resCode == "1"){
			if(flag != 1){
				$.each(resp.payload.list,function(key,value){
					console.log(value);
					var li =$("<li onclick='alertPopUp("+value.id+")' class='bg-success' style='padding:10px 0 0 5px;border-bottom:1px solid #eee'><p style='margin:0;font-size:10px'>"+
							"<i class='fa fa-bell-o' style='padding:0 6px 0 0'></i>"+value.createdDate+"</p>"+
							"<p style='color:#d55d5d;margin:0;font-size:12px'>"+value.title+"</p></li>");
					$("#alertList").append(li);
				});
			}
			$("#alertListLength").html(resp.payload.size)
		}
	})*/
}

onLoad();


var loadPermission  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
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



$('a#pagerlink').click(function() { 
    var functId = $(this).attr('funcId');
    var menuId = $(this).attr('menuId'); 
    var params = {"fieldFilters":{"funcId":functId,"menuId":menuId}} ;
    postJSON('/OrderExecution/api/v1/getPermission', JSON.stringify(params), function(data) {
    	console.log(data.payload);
    	var permiss = data.payload.permission;
    	localStorage.setItem("permission",JSON.stringify(permiss));
    	loadPermissionCommon();
        	
    });
}); 	

var trimmer = function(){
	$('input[type=text]').each(function(){
		var value = $(this).val($.trim($(this).val()));
		return value;
	});
}

var loadPermissionCommon  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(typeof permission != "undefined"){
		$(".layout-main button").each(function() {
			var value = '#'+this.id;
			console.log(value);
		//	var value2 = '#'+this.id+'C';
		//	var value3 = '#'+this.id+'S';
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

var getSelectionStart = function(o) {
	if (o.createTextRange) {
		var r = document.selection.createRange().duplicate()
		r.moveEnd('character', o.value.length)
		if (r.text == '') return o.value.length
		return o.value.lastIndexOf(r.text)
	} else return o.selectionStart
}

var validateFloatKeyPress = function(el, evt){
	 var charCode = (evt.which) ? evt.which : event.keyCode;
	    var number = el.value.split('.');
	    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
	        return false;
	    }
	    //just one dot
	    if(number.length>1 && charCode == 46){
	         return false;
	    }
	    //get the carat position
	    var caratPos = getSelectionStart(el);
	    var dotPos = el.value.indexOf(".");
	    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 1)){
	        return false;
	    }
	    return true;
 }

function validateFloatKeyPressThreeDec(el, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    var number = el.value.split('.');
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //just one dot
    if(number.length>1 && charCode == 46){
         return false;
    }
    //get the carat position
    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");
    
    
    if( caratPos > dotPos && dotPos>-1 && (number[1].length > 2)){
        return false;
    }
    return true;
}

$(document).ready(function(){
	$('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
		event.preventDefault(); 
		event.stopPropagation(); 
		$(this).parent().siblings().removeClass('open');
		$(this).parent().toggleClass('open');
	});
});

/*$(document).ready(
 function() {
 setInterval(function() {
	 onLoad(1);
 }, 5000);  //Delay here = 5 seconds 
});*/