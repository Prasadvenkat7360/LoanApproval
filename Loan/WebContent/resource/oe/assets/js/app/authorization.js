$.fn.modal.Constructor.prototype.enforceFocus = function () {};
$("#remarkAuth").prop('disabled', true);
var storeDcType;
var storeDcId;

var onloadEmployee = function(authType){
	console.log(authType);
	$("#remarkAuth").prop('disabled', true);
	$('#authName').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON("/OrderExecution/api/v1/getAuthEmployeeList?authType=" + authType + "&storeOrDc=DC",function(data) {
		if(data.resCode == "1"){
			$.each(data.payload.employees, function(key, val) {
				//$('#authName').append('<option value="' + val.id + '">' + val.description + '</option>');
				$('#authName').append('<option value="' + val.id + '" idE = '+ val.name +'>' + val.description + '</option>');
			});
		}else{
			$.growl.error({
				message : data.mesgStr,
				title : 'Error',
				duration : 10000
			});
			return false;
		}
		
	});
	
	$.getJSON("/OrderExecution/api/v1/authorizationRoleLOVs",function(data) {
		storeDcType = data.payload.dc.name;
		storeDcId = data.payload.dcId;
	});
}


var openNav = function(authType) {
	$("#authName").val("");
	$("#password").val("");
	$("#remarkAuth").val("");
	$("#remarkAuth").prop("disabled",false);
	$("#authBtn").prop('disabled',true);
	$("#rejectBtn").prop('disabled',true);

	onloadEmployee(authType);
	document.getElementById("mySidenav").style.width = "30%";
}

var closeNav = function() {
  document.getElementById("mySidenav").style.width = "0";
}

$("#authBtn").prop('disabled',true);
var validateEmployee = function(){
	var authName = $("#authName").val();
	var password = $("#password").val();
	var authById = $("#authName option:selected").attr('idE')
	var authBy = $("#authName option:selected").text()
	

	localStorage.setItem("authById",authById);
	localStorage.setItem("authByName",authBy);
	
	var params = {"fieldFilters":{}};
	params.fieldFilters['id'] = parseInt(authName);
	params.fieldFilters['password'] = password;
	postJSON('/OrderExecution/api/v1/validateEmployee', JSON.stringify(params), function(data) {
		if(data.resCode == 1 && typeof data != "undefined"){
			$("#remarkAuth").prop('disabled', false);
			$("#authBtn").prop('disabled',false);
			$("#rejectBtn").prop('disabled',false);
		}else{
			$("#remarkAuth").prop('disabled', true);
			$("#authBtn").prop('disabled',true);
			$("#rejectBtn").prop('disabled',true);
			$.growl.error({message : data.mesgStr,duration : 10000, title: 'Error' });
			return false;
		}
	});
}

var getAuthIds = function(isAuthorized){
	var authorization = localStorage.getItem("authorization");
	authorization = $.parseJSON(authorization);
	
	var remarkAuth = $("#remarkAuth").val();
	var authName = $("#authName").val();
	var params = {};
	
	params['code'] = authorization.code;
	params['description'] = authorization.description;
	params['docType'] = authorization.docType;
	params['docNo'] = null;
	params['transactionAmt'] = null;
	params['remarks'] = remarkAuth;
	params['storeOrDCType'] = storeDcType;
	params['storeOrDCId'] = storeDcId;
	params['authorizedBy'] = authName;
	params['isAuthorized'] = isAuthorized;
	console.log(params);
	var aArr = [];
	postJSON('/OrderExecution/api/v1/createAuthorization', JSON.stringify(params), function(data) {
		if(data.resCode == "1"){
			$.growl.notice({message : data.mesgStr,duration : 10000, title: 'Success'});
			checkAuth(isAuthorized, data.id);
		}
		
	});

}

var authorization = function(isAuthorized, flag, adjId){
	setTimeout(function(){}, 5000);
	//$("#authBtn").prop('disabled',true);
	
	var authorization = localStorage.getItem("authorization");
	authorization = $.parseJSON(authorization);
	
	var remarkAuth = $("#remarkAuth").val();
	var authName = $("#authName").val();
	var params = {};
	
	params['code'] = authorization.code;
	params['description'] = authorization.description;
	params['docType'] = authorization.docType;
	params['docNo'] = adjId;
	params['transactionAmt'] = authorization.transactionAmt;
	params['remarks'] = remarkAuth;
	params['storeOrDCType'] = storeDcType;
	params['storeOrDCId'] = storeDcId;
	params['authorizedBy'] = authName;
	params['isAuthorized'] = isAuthorized;
	if(remarkAuth == "" || remarkAuth == null){
		$.growl.error({message : "Please enter remarks.",duration : 10000,});
		return false;
	}
	else{
		$("#authBtn").prop('disabled',false);

		console.log(adjId);
		if(isAuthorized == "A" && flag == 1 && authorization.code != "ILA"){
		saveAdj(isAuthorized);	
			return;
		}if(isAuthorized == "A" && flag == 2){
		postJSON('/OrderExecution/api/v1/createAuthorization', JSON.stringify(params), function(data) {
			if(data.resCode == 1 && typeof data != "undefined"){
				$.growl.notice({message : data.mesgStr,duration : 10000, title: 'Success'});
				$("form").trigger('reset');
				closeNav();
			}
		});
	}else{
		$("#authBtn").prop('disabled',false);
		
		postJSON('/OrderExecution/api/v1/createAuthorization', JSON.stringify(params), function(data) {
			if(data.resCode == 1 && typeof data != "undefined"){
				if(isAuthorized == "A"){
					$("#addrowbutton").prop('disabled',false);
					$("#saveC").prop('disabled',false);
					
					$.growl.notice({message : data.mesgStr,duration : 10000, title: 'Success' });
					if(params.docType == "RTV" && params.code == "ILA"){
						checkAuth();
					}
				}else{
					if(authorization.docType == "LSM"){
						$("form").trigger('reset');
						
						$("#addrowbutton").prop('disabled',false);
						$("#saveC").prop('disabled',false);
					}
					$.growl.notice({message : data.mesgStr,duration : 10000, title: 'Success'});
				}
				$("#authorizationForm").trigger('reset');
				closeNav();
			}else{
				if(authorization.docType == "LSM"){
					$("#addrowbutton").prop('disabled',true);
				}
			}
		});
	}
	}
	
}
