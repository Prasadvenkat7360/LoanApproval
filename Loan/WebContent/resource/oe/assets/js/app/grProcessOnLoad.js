var completeMRVProcess = function(grArray = null){
	if(grArray == null){
		var rows = $("#grProcessGrid").jqxGrid('getrows');
	}else{
		rows = grArray;
	}
	var checkArray = [];
	var checkArray2 = [];
	var rowLength = 0;
	var grProSrlCount = $("#grProSrlCount").val();
	if(typeof rows != "undefined"){
		var rowLength = rows.length;
		for(var i=0; i<rows.length; i++){
			if(rows[i].isMetalAccountCompleted == false){
				checkArray.push(rows[i].srl);
			}
			
			if(rows[i].isCompleted == false){
				checkArray2.push(rows[i].srl);
			}
		}
	}
	
	if(checkArray2.length == 0 && checkArray.length == 0){
		$("#grCompleteMRVProcess").attr('disabled', true);
		$("#grMetalAccount").attr('disabled', true);
	}else if(checkArray.length == 0 && (grProSrlCount == rowLength) && checkArray2.length > 0){
		$("#grCompleteMRVProcess").attr('disabled', false);
		$("#grMetalAccount").attr('disabled', true);
	}else{
		$("#grCompleteMRVProcess").attr('disabled', true);
		$("#grMetalAccount").attr('disabled', true);
	}
}

var suppliedByList = [];
	var jwType = null;
	var flagList = [];
	var vendorCost = {};
	var mrvNo = null;
	var mrvSrl = null;
	var reqForGRFG = null;
	var $mrvId = $('#mrvId');
		
	$.getJSON('/OrderExecution/api/v1/GRFGLOV?page=GRProcess', function(data) {
		
		vendorList = data.payload.vCodeList;
		
		var data = [];
		$.each( vendorList, function( key, value ) {
				data.push({ value: value.id, label: value.name});
		});
		
		$("#vendorCode").autocomplete({				
			source: data,
			focus: function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
			},
			select: function(event, ui) {
				event.preventDefault();
				$(this).val(ui.item.label);
				$("#vendorCode-value").val(ui.item.value);
				
				fieldFilters = {
		            "fieldFilters" : {
		                "vendorCode" : ui.item.value,
		                "status" : $("#ocStatus").val()
		            }
			     };
				
				 postJSON('/OrderExecution/api/v1/openMRVSrl', JSON
						.stringify(fieldFilters), function(data) {
					 if(1 == data.resCode){
						 $mrvId.empty().append('<option value="" selected>--Select--</option>');
						 $.each(data.payload.openMRVSrl, function(key, val) {
							$mrvId.append('<option value="' + val.id + '">' + val.name + '</option>');
						 });
						 
						 if("" != data.mesgStr){
							 $.growl.error({ message: data.mesgStr, duration: 10000});
						 }
							  
						 $('#vendorCode').attr('disabled', true);
						 $('#mrvId').attr('disabled', false);
					 }else{
						 $('#mrvId').attr('disabled', true);
						 $mrvId.empty();
						 $.growl.error({ message: data.mesgStr, duration: 10000});
					 }
					
				});
			}
		});
	});
	
	
	$("#ocStatus").on("change", function(){
		var vid = $("#vendorCode-value").val();
		if(null == vid || "" == vid){
			$.growl.error({ message: "Please Select Vendor.", duration: 8000});
			return false;
		}
		fieldFilters = {
            "fieldFilters" : {
                "vendorCode" : vid,
                "status" : $("#ocStatus").val()
            }
	     };
		
		 postJSON('/OrderExecution/api/v1/openMRVSrl', JSON
				.stringify(fieldFilters), function(data) {
			 if(1 == data.resCode){
				 $mrvId.empty().append('<option value="" selected>--Select--</option>');
				 $.each(data.payload.openMRVSrl, function(key, val) {
					$mrvId.append('<option value="' + val.id + '">' + val.name + '</option>');
				 });
				 
				 if("" != data.mesgStr){
					 $.growl.error({ message: data.mesgStr, duration: 10000});
				 }
					  
				 $('#vendorCode').attr('disabled', true);
				 $('#mrvId').attr('disabled', false);
			 }else{
				 $('#mrvId').attr('disabled', true);
				 $mrvId.empty();
				 $.growl.error({ message: data.mesgStr, duration: 10000});
			 }
			
		});
		$('#middle').hide();
		$('#grDetails').hide();
		$("#grCreate").prop('disabled', true);
		$("#saveGrCount").prop('disabled', true);
		$("#grProcessGrid").jqxGrid('clear');
		$("#mrvId").val('');
		$("#mrvSrlNo").val('');
		mrvSrl = '';
		
	});
	
	$("#mrvId").on("change", function() {
		var mrvId = $("#mrvId").val().split('-');
		
		mrvNo = mrvId[0];
		mrvSrl =  mrvId[1];
		
		$("#mrvSrlNo").val(mrvSrl);
		
		fieldFilters = {
            "fieldFilters" : {
                "mrvNo" : mrvNo,
                "mrvSrl" : mrvSrl
            }
        };
		
		
	});
	
	$("#clearGR").on('click', function (e) {
		showContentPage('grProcess', 'bodySwitcher');		
	});
	
	$("#clearGRS").on('click', function (e) {
		showContentPage('grProcess', 'bodySwitcher');		
	});
	
	
	$("#grProSrlCount").prop('disabled',false);
	$('#saveGrCount').prop('disabled',false);
	$("#searchGRFG").on("click", function() {
		var status = $("#ocStatus").val();
		
		if(null ==mrvSrl || '' == mrvSrl){
			$.growl.error({ message: "Please enter mandatory fields.", duration: 10000});
			return false;
		}
		
		reqForGRFG = null;
		
		reqForGRFG = "grFG?vCode="+$("#vendorCode-value").val()+"&vName="+$("#vendorCode").val()+"&mrvId="+mrvNo+"&mrvSrl="+mrvSrl;
		fieldFilters = {
            "fieldFilters" : {
                "mrvNo" : mrvNo,
                "mrvSrl" : mrvSrl,
                "status" : 	status
            }
        };
		
		postJSON('/OrderExecution/api/v1/grDetailsByMRVSrl', JSON.stringify(fieldFilters), function(data) {
			 if(1 == data.resCode){
				 
				 $('#middle').show();
				 var grFGDetails = data.payload.grDetails;
				 var grsrlcount = null;
				 if(null != data.payload.mrvDetails.grSrlNoCount){
					 if(data.payload.mrvDetails.grSrlNoCount > 0){
						 $("#saveGrCount").attr('disabled', false);
						 $("#grCreate").addClass('disabled');				    		
					 }
					 
					 var rows = $("#grProcessGrid").jqxGrid('getrows');
					
					 if(typeof rows != "undefined" ){
						 if(rows.length == $("#grProSrlCount").val()){
							 $("#grCreate").addClass('disabled');
							 $("#saveGrCount").attr('disabled', true);
						 }else{
							 $("#grCreate").removeClass('disabled');
							 $("#saveGrCount").prop('disabled', false);
						 }
					 }
					
					 grsrlcount = "<td width='15%'><input type='text' class='form-control' id='grProSrlCount' value='"+ data.payload.mrvDetails.grSrlNoCount +"' onchange ='grPSrlCount();' > </td>";
					 
					 if(null == grFGDetails || grFGDetails.length < data.payload.mrvDetails.grSrlNoCount){
						 $("#grCreate").attr('disabled', false);
					 }
					 
				 }else{
					 grsrlcount = "<td width='15%'><input type='text' class='form-control' id='grProSrlCount'  onchange ='grPSrlCount();' > </td>";
				 }
				 
				 $('#grBody').empty();
				 
				 $('#grBody').append("<tr><td style ='background-color: #F5F5F5;'><label>Vendor</label></td>"+
				 "<td>"+$('#vendorCode').val()+"</td>"+
				 "<td style ='background-color: #F5F5F5;'><label>GRV No.</label></td>"+
				 "<td>&nbsp;"+mrvNo+"<input type='hidden' id='grMrvNo' value='"+mrvNo+"'> </td>"+
					
				 "<td style ='background-color: #F5F5F5;'><label>GRV Srl No.</label></td>"+
				 "<td>&nbsp;"+mrvSrl+"<input type='hidden' id='grMrvSlNo' value='"+mrvSrl+"'></td>"+
	
				 "<td style ='background-color: #F5F5F5;'><label>Vendor Bill No.</label></td>"+
				 "<td>&nbsp;"+data.payload.mrvDetails.billNumber+" </td>"+
				 
				 "<td style ='background-color: #F5F5F5;'><label>Metal Segment</label></td>"+
				 "<td>&nbsp;"+data.payload.mrvDetails.metalType.description+" </td>" +
			
	 			 "<td style ='background-color: #F5F5F5;'><label>Skin Purity</label></td>"+
				 "<td>&nbsp;"+data.payload.mrvDetails.skinPurity+" </td></tr>"+
			
				 "<tr>" +		 
				 
				 "<td style ='background-color: #F5F5F5;'><label>IGR Srl No Count</label></td>"+ grsrlcount+
				 "<td style ='background-color: #F5F5F5;'><label>Skin Purity Rate</label></td>"+
				 "<td>&nbsp;"+data.payload.skinPurityRate+" </td>"+
					
				 "<td style ='background-color: #F5F5F5;'><label>Melting Purity</label></td>"+
				 "<td>&nbsp;"+data.payload.mrvDetails.meltingPurity+" </td>"+
				 
				 "<td style ='background-color: #F5F5F5;'><label>GRV Gross Wt</label></td>"+
				 "<td>&nbsp;"+data.payload.mrvDetails.grossWeight+" </td>"+
					
				 "<td style ='background-color: #F5F5F5;'><label>GRV Net Wt</label></td>"+
				 "<td>&nbsp;"+data.payload.mrvDetails.netWeight+" </td>"+
					
				 "<td style ='background-color: #F5F5F5;'><label>GRV Pure Wt</label></td>"+
				 "<td>&nbsp;"+data.payload.mrvDetails.pureWeight+" </td></tr>");
				 
				 	$("#vendorCode-valueC").val($("#vendorCode-value").val());
					$("#vendorCodeC").val($("#vendorCode").val());	
					var mrvId = $("#mrvId").val().split('-');
					
					$("#mrvIdC").val(mrvId[0]);
					
					$("#skinPurityRate").val(data.payload.skinPurityRate);
					$("#skinPurity").val(data.payload.mrvDetails.skinPurity);
					$("#metalSegment").val(data.payload.mrvDetails.metalType.description);
					$("#meltingPurity").val(data.payload.mrvDetails.meltingPurity);	
					$("#metalSegmentId").val(data.payload.mrvDetails.metalType.id);	
					$("#vendorBillNO").val(data.payload.mrvDetails.billNumber);
					
				var checkedValue = [];
				 if(null != grFGDetails && grFGDetails.length > 0){
					 
					 grFgDetailsGrid();	
					 
					 $.each(grFGDetails, function( key, value ) {						
						 $("#grProcessGrid").jqxGrid('addrow', null, addGRDetails(value));
					});
				 
				 
					 $('#grDetails').show();
					 $('#grDetailsId').show();
					 completeMRVProcess();
					 
					 $("#compute").attr('disabled', false);					 
					
				 }
				 var datainformations = $("#grProcessGrid").jqxGrid('getdatainformation');
			  	if(typeof datainformations != "undefined"){
				 var rowscounts = datainformations.rowscount;
			  		var grProSrlCount = $("#grProSrlCount").val();
				   if(parseInt(rowscounts) == parseInt(grProSrlCount)){
					 $("#grCreate").addClass('disabled');
					 $("#saveGrCount").attr('disabled', true);
				   }
			  	}
			 }else{
				 
				 $("#grCompleteMRVProcess").prop('disabled',true);
				 $.growl.error({ message: data.mesgStr, duration: 10000});
			 }
			 var mrvStaus = data.payload.mrvDetails.mrvStatus;
			 if(mrvStaus == "GR"){
				 $("#grProSrlCount").prop('disabled',true);
				 $("#saveGrCount").prop('disabled', true);
			 }else{
				 $("#grProSrlCount").prop('disabled',false);
				 $("#saveGrCount").prop('disabled', false);
			 }
			 $("#grCreate").addClass('disabled');
		});
		completeMRVProcess();
		
	});
	
	
	
	$("#saveGrCount").on("click", function() {
		
		fieldFilters = {
	           "fieldFilters" : {
	               "grSrlNoCount" : $("#grProSrlCount").val(),
	               "mrvId" : mrvNo,
	               "srlNo" :mrvSrl
	           }
	     };
		if(0 == $("#grProSrlCount").val() || '0' === $("#grProSrlCount").val()){
			$.growl.error({ message: "Count Value Should Greater Than Zero", duration: 10000});
			return false;
		}
				
		postJSON('/OrderExecution/api/v1/grSrlNoCount', JSON.stringify(fieldFilters), function(data) {
			 if(1 == data.resCode){
				 var rows = $("#grProcessGrid").jqxGrid('getrows');
				 var datainformations = $("#grProcessGrid").jqxGrid('getdatainformation');
				 var checkedValueArr = [];
				 var checkedValueArr2 = [];
			 	  	if(typeof datainformations != "undefined"){
			 	  		var rowscounts = datainformations.rowscount;
			 	  		var grProSrlCount = $("#grProSrlCount").val();
				  		
			 	  		if(rowscounts == grProSrlCount){
					  		 $("#grCreate").prop('disabled', true);
					  		 $("#saveGrCount").prop('disabled', false);
					  	}else if(grProSrlCount > rowscounts ){
					  		$("#grCreate").prop('disabled', false);
					  		$("#grCreate").removeClass('disabled');
					  		$("#saveGrCount").prop('disabled', true);					  		
					  	}
			 	  	}else{
				  		$("#grCreate").prop('disabled', false);
				  		$("#grCreate").removeClass('disabled');
				  		$("#saveGrCount").prop('disabled', true);
				  	}
				 $.growl.notice({ message: "Successfully updated IGR Srl No Count.", duration: 10000, title: 'Success' });	
				 $("#compute").removeAttr('disabled');
				 $("#compute").prop('disabled', false);
			 }else{
				 $.growl.error({ message: data.mesgStr, duration: 10000});
				 $("#grCreate").addClass('disabled');
			  		$("#saveGrCount").prop('disabled', true);
			 }
			 completeMRVProcess();
		});
	})
	
	
	$("#grMetalAccount").on("click", function() {
		
		postJSON('/OrderExecution/api/v1/grMetalAccount', metalAccounting(), function(data) {
			 if(1 == data.resCode){				 
				 $.growl.notice({ message: "IGR metal accounting Done.", duration: 10000, title: 'Success' });	

				 completeMRVProcess(data.payload.grDetails);
				 window.location.href = "javascript:showContentPage('grProcess', 'bodySwitcher')";
			 }else{
				 $.growl.error({ message: data.mesgStr, duration: 10000});
			 }
			 
			 var grFGDetails = data.payload.grDetails;			 
			 if(null != grFGDetails && grFGDetails.length > 0){				 
				 grFgDetailsGrid();				 
				 $.each(grFGDetails, function( key, value ) {
					 $("#grProcessGrid").jqxGrid('addrow', null, addGRDetails(value));
				 });				 
				 $('#grDetails').show();				 
			 }
			 
		});
		
	})


	var grPSrlCount = function() {		
		$("#grCreate").addClass('disabled');
		var grProSrlCount = $("#grProSrlCount").val();
		 var datainformations = $("#grProcessGrid").jqxGrid('getdatainformation');	  	
		 validateCount(grProSrlCount);
	  	if(typeof datainformations == "undefined"){
	  		$("#saveGrCount").prop('disabled', false);
	  		$("#grCreate").prop('disabled', true);	
	  		$("#compute").attr('disabled', false);
	  	}else{
	  		 var rowscounts = datainformations.rowscount;	  		 
	 	  	var grProSrlCount = $("#grProSrlCount").val();
		  	if((parseInt(grProSrlCount) > 0) && (parseInt(rowscounts) == parseInt(grProSrlCount))){
		  		$("#saveGrCount").prop('disabled', false);
		  		$("#grCreate").prop('disabled', true);  		
		  		$("#compute").attr('disabled', false);
	    	}else if((parseInt(grProSrlCount) > 0) && (parseInt(rowscounts) < parseInt(grProSrlCount))){   
	    		$("#saveGrCount").prop('disabled', false);
	    		$("#grCreate").prop('disabled', true);    		
	    		$("#compute").attr('disabled', true);
	    	}else{
	    		$("#grCreate").prop('disabled', true);
	    		$("#saveGrCount").prop('disabled', true);    		
	    		$("#compute").attr('disabled', false);
	    	}
		  	
	  	}
	  	
	  	
	}
	
	
	function validateCount(val){
		var regex = /^\d{0,6}(\.\d{0,3})?$/;
		if (val && !isNaN(val) && regex.test(val)) {
			return $("#grProSrlCount").val(val);
		}else{
			return $("#grProSrlCount").val('');
		}
		
	}
	
	$("#mrvId").on("change", function() {

		$('#middle').hide();
		$('#grDetails').hide();
		$("#grCreate").prop('disabled', true);
		$("#saveGrCount").prop('disabled', true);

	});
	
	
	$("#toggle1").on('click', function(){
		$("#panel1").toggle();
	});


	$("#toggle2").on('click', function(){
		$("#panel2").toggle();
	});


	$("#toggle3").on('click', function(){
		$("#panel3").toggle();
	});

	$("#toggle4").on('click', function(){
		$("#panel4").toggle();
	});
	
	$("#toggle5").on('click', function(){
		$("#panel5").toggle();
	});

	$("#toggle6").on('click', function(){
		$("#panel6").toggle();
	});

	//################################################### Create GR-Fg Page ##################################
	/*##	Author1         : 	Pooja Sangve
	##	Date Creation 	: 	12-12-2017
	## 	Description		:	UI Creation of GR-FG*/
	
	

	
	var psrList = [];
	var suppliedByList = [];
	var jwType = null;
	var costToBeBorneBy = [];
	var flagList = [];
	var vendorCost = {};
	var halmarkCharges = new Object();
	var toleranceLimits = new Object();
	var showGRDetail = true;
	var grHeaderId = null;
	
	var $mrvId = $('#mrvId');
	
	$("#createGrFgForm").hide();
	$("#grHeDrId").show();
	$("#grHeDrId1").hide();
	$("#createGrFgForm1").show();
	
/*$("#grCreate").on("click",function(){
		
	$("#createGrFgForm1").hide();
	$("#createGrFgForm").show();
	$("#grHeDrId").hide();
	$("#grHeDrId1").show();
	
	grAccessoryGrid();
	grStoneGrid();
	
	var vid = $("#vendorCode-value").val();
	var vName = $("#vendorCode").val()
	
	fieldFiltersCreate = {
			
        	"vCode":vid,
            "mrvId" :mrvNo,
            "mrvSrl" : mrvSrl,
            "vName":vName,
    };
	
	postJSON('/OrderExecution/api/v1/grFG',JSON.stringify(fieldFiltersCreate),function(data) {
		var vendorId = data.payload.vendorId;
		var mrvId = data.payload.mrvId;
		var vendorName = data.payload.vendorName;
		var mrvSrl = data.payload.mrvSrl;
		
		$("#vendorCodeC").val(vendorName);
		$("#vendorCode-valueC").val(vendorId);
		$("#mrvIdC").val(mrvId);
		$("#mrvId").val(mrvId);
		$("#mrvSrlNoC").val(mrvSrl);
		
	});
			
		fieldFilters = {
            "fieldFilters" : {
                "mrvId" :mrvNo,
                "mrvSrl" : mrvSrl
            }
        };
		
		postJSON('/OrderExecution/api/v1/mrvDetailsByMRVSrl', JSON
				.stringify(fieldFilters), function(data) {
			 if(1 == data.resCode){
				 vendorCost = data.payload.vendorCost;
				 costToBeBorneBy = data.payload.costToBeBorneBy;
				 suppliedByList = data.payload.suppliedBy;
				 flagList = data.payload.flagList;
				 halmarkCharges = data.payload.halmarkCharges;
				 jwType = data.payload.jwType;
				 
				if(jwType == "C"){
					$("#grcPeriod").prop('disabled', false);			 
				}else{
					$("#grcPeriod").prop('disabled', true);
				}
				 
				 
				 $("#pureRate").val(data.payload.pureRate);
				 $("#vendorBillNO").val(data.payload.mrvDetails.billNumber);
				 var skinPur = $("#skinPurity").val(data.payload.mrvDetails.skinPurity);
				 $("#meltingPurity").val(data.payload.mrvDetails.meltingPurity);
				 if(null !=  data.payload.mrvDetails.metalType){
					 $("#metalSegment").val(data.payload.mrvDetails.segment.description);
					 $("#metalSegmentId").val(data.payload.mrvDetails.segment.id);
				 }
				 
				 jwType = data.payload.jwType;
				 $('#jwTypee').val(data.payload.jwType);
				 
				 if("C" == data.payload.jwType || "D" == data.payload.jwType){
					 $("#pureRate").attr('disabled', false);
					 
				 }else{
					 $("#pureRate").val(data.payload.pureRate);
				 }
				 
				 if("C" == data.payload.jwType){
					 $("#grcPeriod").attr('disabled', false);
					 
				 }
				 if(data.payload.pureRateFlag == true){
					 $("#pureRate").attr('disabled', true);
				 }
				 
				 
				 $("#skinPurityRate").val(data.payload.skinPurityRate);
				 $('#mrvId').attr('disabled', true);
				 	var venId = $("#vendorCode-value").val();
				 	var sPurity = $('#skinPurity').val();
				 	var mTypeId = $('#metalSegmentId').val();
					 $.getJSON('/OrderExecution/api/v1/getOpenPSRForVendor?vendorCode='+venId+'&skinPurity='+sPurity+'&segmentId='+ mTypeId,function(data) {
					 if(1 == data.resCode){
						 if(showGRDetail)
						 {
							 psrList = data.payload.psrList;
							 
							 grFgGrid();
							 for(var i=0; i<5; i++){								 
								 $("#grDetailsGrid").jqxGrid('addrow', null, addGRFGrow(i+1));
							 }
							 $("#grDetailsId").show();
							 $("#grDetailsGrid").jqxGrid('hidecolumn', 'actcostWastageWt');
							 $("#grDetailsGrid").jqxGrid('hidecolumn', 'actcostMC');
							 $("#grDetailsGrid").jqxGrid('hidecolumn', 'actsellWastageWt');
							 $("#grDetailsGrid").jqxGrid('hidecolumn', 'actsellMC');
							 $("#grDetailsGrid").jqxGrid('hidecolumn', 'addedValue');
							 $("#grDetailsGrid").jqxGrid('hidecolumn', 'isValid');
						
							 showGRDetail = true;
						 }
					 }
				 });
				 
			 }else{
				 $.growl.error({ message: data.mesgStr, duration: 10000});
			 }
			
		});
});		*/ 
	
			 
			function prepareLoad(event){
		      files=event.target.files;
		    }
			 
		  function processFileUpload()
		  {
			  $.ajax({
		            url : "/OrderExecution/grHeaderImageSubmit",
		            data : new FormData(document.getElementById("uploadForm")),
		            type : "post",
		            enctype: 'multipart/form-data',
		            processData: false, 
		            contentType:false,
		            success : function(result) {
		            	$('#loading').hide();
		            	$('.modal-content').html(result); 
		            	$("#grDetailsGrid").jqxGrid("updatebounddata");
		            	
		            	$('#createGrFgForm').attr('disabled', 'disabled');
						$("#grListing").attr('disabled', false);
		            }/*,
		            error : function(result){
						$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Saving GR Image !' });
		            	$('#loading').hide();
		                
		            }*/
		        });
		  }
	
	
   /* $("#clearGRS").on('click', function(){
    	$("#vendorCode").attr('disabled', false);
 		$("#grDetailsGrid").jqxGrid('clear');
 		$("#stoneDetailsGrid").jqxGrid('clear');
 		$("#accDetailsGrid").jqxGrid('clear');
 		
 		grDetailsList();
 		accGRGrid();
 		stoneGRGrid();

	
		 showGRDetail = true;
 	});*/
	
	
	$("#addRowGr").on("click", function() {
		var masterRows = $("#grDetailsGrid").jqxGrid('getrows');
		if(typeof masterRows == "undefined"){
			var rowId = 1;
		}else{
			var rowscount = $("#grDetailsGrid").jqxGrid('getdatainformation').rowscount;
			var rowId = rowscount + 1;
		}
		if(isValidAllgrFGDetails()){
			 $("#grDetailsGrid").jqxGrid('addrow', null, addGRFGrow(rowId));
		}
	});
	
	$("#grcPeriod").on('change',function(){
		if (this.value.match(/[^0-9]/g)) {
			  $.growl.error({ message: "Consignment Period Should be in Numbers", duration: 10000, title: 'Error' });
			  this.value = this.value.replace(/[^0-9]/g, '');
			}
	});
	
	$("#okProceed").on('click', function (e) {		 
		var cell = $("#grDetailsGrid").jqxGrid('getselectedcell');
		var rowid = $("#grDetailsGrid").jqxGrid('getrowid', cell.rowindex);		
		$("#grDetailsGrid").jqxGrid("deleterow", rowid);
		$("#grDetailsGrid").jqxGrid('addrow', null, addGRFGrow());		
	});
	
	
	$("#cancel").on('click', function (e) {
		var cell = $("#grDetailsGrid").jqxGrid('getselectedcell');
		var rowid = $("#grDetailsGrid").jqxGrid('getrowid', cell.rowindex);		
		var row = $("#grDetailsGrid").jqxGrid('getrowdatabyid', rowid);		
		var addedValue = $('#grDetailsGrid').jqxGrid('getcellvalue', rowid, 'addedValue');
		
		row['sellWastageWt'] = 0;
		row['sellMC'] = addedValue;
		
		row['costCode'] = "TC";
		row['costCodes'] = "Total Cost";
		
		$('#grDetailsGrid').jqxGrid('updaterow', rowid, row);
	});
	
    var clonerow = function(copyData, i){
    	 var row = {};
    	    row["psr"] = copyData.psr;
    	    row["psrNos"] = copyData.psrNos;
    	    row["srl"] = i+1;
    	    row["articleCode"] = copyData.articleCode;
    	    row["jwType"] = copyData.jwType;
    	    row["jwlType"] = copyData.jwlType;
    	    row["articleDesc"] = copyData.articleDesc;
    	    row["hsnMasterCode"] = copyData.hsnMasterCode;
    	    row["hsnMasterId"] = copyData.hsnMasterId;
    	    row["taxStructureId"] = copyData.taxStructureId;
    	    row["pcs"] = copyData.pcs;
    	    row["grossWt"] = copyData.grossWt;
    	    row["netWt"] = copyData.netWt;
    	    row["costCode"] = copyData.costCode;
    	    row["costCodes"] = copyData.costCodes;
    	    row["costWastageWT"] = copyData.costWastageWT;
    	    row["costMC"] = copyData.costMC;
    	    row["actcostWastageWt"] = copyData.actcostWastageWt;
    	    row["actcostMC"] = copyData.actcostMC;
    	    row["totalCost"] = copyData.totalCost;
    	    row["sellWastageWt"] = copyData.sellWastageWt;
    	    row["sellMC"] = copyData.sellMC;
    	    row["actsellWastageWt"] = copyData.actsellWastageWt;
    	    row["actsellMC"] = copyData.actsellMC;
    	    row["setSellingPrice"] = copyData.setSellingPrice;
    	    row["attributes"] = copyData.attributes;
    	    row["photo"] = copyData.photo;
    	    row["viewDesign"] = copyData.viewDesign;
    	    row["provisional"] = copyData.provisional;
    	    row["hallMarkCharges"] = copyData.hallMarkCharges;
    	    row["isValid"] = copyData.isValid;
    	    row["addedValue"] = copyData.addedValue;
    	    row["stoneList"] = copyData.stoneList;
    	    row["accessoryList"] = copyData.accessoryList;
    	    row["attrLength"] = copyData.attrLength;
    	    row["size"] = copyData.size;
    	    row["height"] = copyData.height;
    	    row["diameter"] = copyData.diameter;
    	    row["width"] = copyData.width;
    	    row["combination"] = copyData.combination;
    	    row["metalColor"] = copyData.metalColor;
    	    row["hookType"] = copyData.hookType;
    	    row["screwType"] = copyData.screwType;
    	    row["loopType"] = copyData.loopType;
    	    row["polishType"] = copyData.polishType;
    	    row["settingType"] = copyData.settingType;
    	    row["collectionName"] = copyData.collectionName;
    	    row["vendorArticle"] = copyData.vendorArticle;
    	    row["selectionStatus"] = true;
    	    row["selectionStatusCopy"] = null;    	    
    		row['isPair'] = copyData.isPair;
    		row['segmentId'] = copyData.segmentId;
    		row['segmentCode'] = copyData.segmentCode;
    		row['mainCategory'] = copyData.mainCategory;
    		row['subCategory'] = copyData.subCategory;
    		row['metalTypeId'] = copyData.metalTypeId;
    		row['storeId'] = copyData.storeId;
    		$('#grDetailsGrid').jqxGrid('updaterow', i, row);
    	    return row;
    }
    
/*	$("#copyGrDetRow").on('click', function(){
		var copyGrDetInput = $("#copyGrDetInput").val();
		if(typeof copyGrDetInput == "undefined" || copyGrDetInput == null || copyGrDetInput == ""){
			$.growl.error({ message: "Please select no. of line to copy.", duration: 10000, title: 'Error' });
			return false;
		}
		
		 if(copyGrDetInput > 250){
			$.growl.error({ message: "Max limit is 250 to copy lines.", duration: 10000, title: 'Error' });
			return false;
		}
		
		var rows = $("#grDetailsGrid").jqxGrid('getrows');
		var copyData = [];
		var deleteArr = [];
		var rowLength = rows.length;
		
		if(typeof rows != "undefined"){
			for(var i=0; i<rowLength; i++){
				
				if(rows[i].psr == null){
					var idVal = $("#grDetailsGrid").jqxGrid('getrowid',	i);					
					deleteArr.push(idVal)
				}else{				
					if(rows[i].selectionStatusCopy == true){
						copyData.push(rows[i]);
					}
				} 
			}
			
			
		}

		var totLenth = parseInt(copyGrDetInput);
		
		if(copyData.length == 1){			 	
			if(copyData[0].psr != "N"){
				$.growl.error({ message: "Copy is allowed only for NONE PSR.", duration: 10000, title: 'Error' });
				return false;
			}
			if(copyData[0].grossWt == copyData[0].netWt){
	 			$("#grDetailsGrid").jqxGrid('deleterow', deleteArr);
			}else{
 				$.growl.error({ message: "Gross wt. & net wt. should be same for copy lines.", duration: 10000, title: 'Error' });
				return false;
 			}
			
			var totalRows = $("#grDetailsGrid").jqxGrid('getrows');
			var rowL = totalRows.length;
			var totLenthVal = rowL + totLenth;
			for(var i=rowL; i<totLenthVal; i++){
				var checkGRDetails = checkGRDetailsValid(i);
				if(checkGRDetails == true){
					$("#grDetailsGrid").jqxGrid('addrow', null, clonerow(copyData[0], i));		 		
					$('#loading').show();	 	
				}
		 	}
			
		}else{
			$.growl.error({ message: "Please select only one checkbox to copy rows.", duration: 10000, title: 'Error' });
			return false;	
		}
		
		
		var totalRowsVal = $("#grDetailsGrid").jqxGrid('getrows');
		var rowLengthVal = totalRows.length; 
	
		if(totLenth < 5){
			if(rowLengthVal < 5)
			{				
				for(var i=rowLengthVal; i<5; i++){	
					$("#grDetailsGrid").jqxGrid('addrow', null, addGRFGrow(i+1));
				}
			}
		}
		$('#loading').hide();
		
	});*/
	
	
// ################## Complete MRV Process By Raksha #################
$("#grCompleteMRVProcess").on('click',function(e){
	var mrvSlNo = $("#mrvSrlNo").val();
	var mrvId = $("#grMrvNo").val();
	var $link = $(e.target);
	  e.preventDefault();
	  if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 500) {
		$.getJSON('/OrderExecution/api/v1/grAnalyze?mrvId='+mrvId+'&mrvSrlNo='+mrvSlNo,function(data){
			var result = data.payload.compute;
			
			$("#mrvGrsWt").val(result.mrvGrossWt);
			$("#mrvNetWt").val(result.mrvNetWt);
			$("#mrvPureWt").val(result.mrvPurWt);
			
			$("#grGrsWt").val(result.grGrossWt);
			$("#grNetWt").val(result.grNetWt);
			$("#grPureWt").val(result.grPurWt);
			
			$("#diffGrsWt").val(result.diffGrossWt);
			$("#diffNetWt").val(result.diffNetWt);
			$("#diffPureWt").val(result.diffPurWt);
			
			$("#remarks").html(result.remark);
			
		});
	  }
	  $link.data('lockedAt', +new Date());
});


$("#grProceed").on("click",function() {
	var mrvId = $("#mrvId").val().split('-');
	mrvNo = mrvId[0];
	mrvSrl =  mrvId[1];
	
	$("#mrvSrlNo").val(mrvSrl);
	
	var grCompDTO = {
			"mrvId" : mrvNo,
			"mrvSlNo" :mrvSrl,
		};

		postJSON('/OrderExecution/api/v1/grCompleteMRVProcess', JSON.stringify(grCompDTO), function(data) {
				if (1 == data.resCode) {
					$.growl.notice({message : "IGR GRV process completed.",duration : 10000,title : 'Success'});
					$('#grAnalysis').modal('hide');
					parent.jQuery("#grCompleteMRVProcess").attr('disabled',true);
					parent.jQuery("#saveGrCount").attr('disabled',true);
					parent.jQuery("#grCompleteMRVProcess").attr('disabled',true);
					parent.jQuery("#grProSrlCount").attr('disabled',true);
					
					$("#grCompleteMRVProcessModal").modal('hide');
				} else {
						$.growl.error({
							message : data.mesgStr,
							duration : 10000
			});
		}
	});
})