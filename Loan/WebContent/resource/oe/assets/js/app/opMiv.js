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

$('#fgDet').show();
$('#stoneDet').hide();
$('input:radio[name=printTag]').filter('[value="1"]').attr('checked', true);
$('input[name=printTag]:radio').on('click', function() {
	var selectedVal = $(this).val();
	if (selectedVal == 1) {
		$('#fgDet').show();
		$('#stoneDet').hide();
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	} else if (selectedVal == 2) {
		$('#fgDet').hide();
		$('#stoneDet').show();		
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	}
});
// lovs for fg
$('#mivNo').empty().append('<option value="" selected>-- Select Option --</option>');	
$("#mivNo").on("change",function(){
	var orderNumber=$("#mivNo").val();
	if(orderNumber !=""){
	getJSON('/OrderExecution/api/v1/printTagMIVSlNoLOV?mivNo='+orderNumber+'&Mtype='+'F', function(data) {
		$('#mivSlNo').empty().append('<option value="" selected>-- Select Option --</option>');
		$.each (data.payload.orderSlNos , function(key, val) {
					$('#mivSlNo').append('<option value="' + val.id + '">' + val.id + '</option>');
		});			
	  });
	}else{	
		$('#mivSlNo').val('');			
	      return true;
		}
});
$('#orderNo').empty().append('<option value="" selected>-- Select Option --</option>');
$("#orderNo").on("change",function(){	
	var mivNumber=$("#orderNo").val();	
	if(mivNumber !=""){
	getJSON('/OrderExecution/api/v1/printTagOrderSlNoLOV?orderNo='+mivNumber+'&Mtype='+'F', function(data) {
		$('#orderSlNo').empty().append('<option value="" selected>-- Select Option --</option>');
		$.each (data.payload.orderSlNos , function(key, val) {
					$('#orderSlNo').append('<option value="' + val.id + '">' + val.id + '</option>');
		});			
	  });
	return false;
	}else{	
		$('#orderSlNo').val('');			
      return true;
	}
});

// lovs for stone and accessory 
$('#orderNoS').empty().append('<option value="" selected>-- Select Option --</option>');	
$("#orderNoS").on("change",function(){	
	var orderNumber=$("#orderNoS").val();	
	if(orderNumber !=""){
	getJSON('/OrderExecution/api/v1/printTagOrderSlNoLOV?orderNo='+orderNumber+'&Mtype='+'LA', function(data) {
		$('#orderSlNoS').empty().append('<option value="" selected>-- Select Option --</option>');
		$.each (data.payload.orderSlNos , function(key, val) {
					$('#orderSlNoS').append('<option value="' + val.id + '">' + val.id + '</option>');
		});			
	});
  }else{	
		$('#orderSlNoS').val('');			
	      return true;
		}
});
$('#mivNoS').empty().append('<option value="" selected>-- Select Option --</option>');
$("#mivNoS").on("change",function(){	
	var mivNumber=$("#mivNoS").val();	
	if(mivNumber !=""){
	getJSON('/OrderExecution/api/v1/printTagMIVSlNoLOV?mivNo='+mivNumber+'&Mtype='+'LA', function(data) {
		$('#mivSlNoS').empty().append('<option value="" selected>-- Select Option --</option>');
		$.each (data.payload.orderSlNos , function(key, val) {
					$('#mivSlNoS').append('<option value="' + val.id + '">' + val.id + '</option>');
		});			
	});
  }else{	
		$('#mivSlNoS').val('');			
	      return true;
		}
});

//validation for  mandatory fields Finished Goods

$("#print").on("click",function(){	
var psrNo = $("#psrNo").val();
var orderNo = $("#orderNo").val();
var mivNo = $("#mivNo").val();

if (psrNo != "" || orderNo != ""|| mivNo != "" ) {	
	
}
else
	{
	$.growl.error({
		message :"Please fill atleast one Field",
		duration : 10000,

	});
		return false;
	}

});
//validation for  mandatory fields in Stones and Accessory 

$("#printS").on("click",function(){	
	var psrNo = $("#psrNoS").val();
	var orderNo = $("#orderNoS").val();
	var mivNo = $("#mivNoS").val();

	if (psrNo != "" || orderNo != ""|| mivNo != "" ) {	
		
	}
	else
		{
		$.growl.error({
			message :"Please fill atleast one Field",
			duration : 10000,

		});
			return false;
		}

	});
$("#clearAll").on("click",function(){
	window.location.href = "javascript:showContentPage('opMiv', 'bodySwitcher')";
});
$("#clearAllS").on("click",function(){
	window.location.href = "javascript:showContentPage('opMiv', 'bodySwitcher')";
})

/////////////////////////////////////////Print Functionality Integration Done By Venkat//////////////////////

$("#opmivfgprint").on('click', function() {
	var psrNo = $("#psrNo").val();
	var orderNo = $("#orderNo").val();
	var mivNo = $("#mivNo").val();
	var mivSrlNo = $("#mivSlNo").val();
	var oItemSrlNo = $("#orderSlNo").val();
	var fieldFilters = {
			"fieldFilters" : {							
			}
		};

		if (psrNo != "" && psrNo != null) {
			fieldFilters.fieldFilters["grPsrNo"] =psrNo;
		}
		if (orderNo != "" && orderNo != null) {
			fieldFilters.fieldFilters["orderId"] =orderNo;
		}
		if (mivNo != "" && mivNo != null) {
			fieldFilters.fieldFilters["mivNo"] =mivNo;
		}
		if (mivSrlNo != "" && mivSrlNo != null) {
			fieldFilters.fieldFilters["mivSrlNo"] =mivSrlNo;
		}
		if (oItemSrlNo != "" && oItemSrlNo != null) {
			fieldFilters.fieldFilters["oItemSrlNo"] =oItemSrlNo;
		}
	fieldFilters = {
		"fieldFilters" : {
			"grPsrNo":psrNo,
			"orderId" : orderNo,
			"oItemSrlNo" : oItemSrlNo,
			 "mivNo":mivNo,
			 "mivSrlNo":mivSrlNo,
			"mode" : "pdf",
			"reportName" : "RPT_Print_Tag_MIV"
		}
	}
	$.ajax({
		url : 'jasperReport',
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
				navigator.msSaveBlob(file, 'RPT_Print_Tag_MIV.pdf');
			} else {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
			}
		}
	});

});




$("#opmivlsaprint").on('click', function() {
	var psrNo = $("#psrNoS").val();
	var orderNo = $("#orderNoS").val();
	var mivNo = $("#mivNoS").val();
	var mivSrlNo = $("#mivSlNoS").val();
	var oItemSrlNo = $("#orderSlNoS").val();
	var fieldFilters = {
			"fieldFilters" : {							
			}
		};

		if (psrNo != "" && psrNo != null) {
			fieldFilters.fieldFilters["grPsrNo"] =psrNo;
		}
		if (orderNo != "" && orderNo != null) {
			fieldFilters.fieldFilters["orderId"] =orderNo;
		}
		if (mivNo != "" && mivNo != null) {
			fieldFilters.fieldFilters["mivNo"] =mivNo;
		}
		if (mivSrlNo != "" && mivSrlNo != null) {
			fieldFilters.fieldFilters["mivSrlNo"] =mivSrlNo;
		}
		if (oItemSrlNo != "" && oItemSrlNo != null) {
			fieldFilters.fieldFilters["oItemSrlNo"] =oItemSrlNo;
		}
	fieldFilters = {
		"fieldFilters" : {
			"grPsrNo":psrNo,
			"orderId" : orderNo,
			"oItemSrlNo" : oItemSrlNo,
			 "mivNo":mivNo,
			 "mivSrlNo":mivSrlNo,
			"mode" : "pdf",
			"reportName" : "RPT_Print_Tag_Miv_LA"
		}
	}
	$.ajax({
		url : 'jasperReport',
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
				navigator.msSaveBlob(file, 'RPT_Print_Tag_Miv_LA.pdf');
			} else {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
			}
		}
	});

});