/*
	## 	Author1 (UI)	:   Pooja Sangve
	## 	Author2 (JAVA)	:   Divya
	##	Date Creation 	: 	19-06-2018
	## 	Description		:	Movement of Accessory-->(Integration)
*/

// ############### Page Redirection ##############

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

var redirect = function() {
	window.location.href = "javascript:showContentPage('accMovement', 'bodySwitcher')";
	return window.location.href;
}
// ############### date picker ################## 

$("#fromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDate").datepicker('option', 'minDate', min || '0');
    }
});

$("#toDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0
});

//###################### search page fields ####################

$('#segment').empty().append('<option value="" selected>--Select--</option>');
var fieldFilters1 ={"fieldFilters": {"type": "accSegmentsForSearchLOV"}}
postJSON('/OrderExecution/api/v1/onloadMovementOfAccessories',JSON.stringify(fieldFilters1),function(data) {
	 if(data.resCode == 1){
		 $.each(data.payload.stoneOrAccSegList, function(key, val) {
		 	$('#segment').append('<option value="' + val.id + '" code ="'+ val.code +'">' + val.description + '</option>');
		 });
	 }
});

// lovs for Form type in Search page 
var fieldFilters2 ={"fieldFilters": {"type": "fromTypes"}}
postJSON('/OrderExecution/api/v1/onloadMovementOfAccessories',JSON.stringify(fieldFilters2),function(data) {
	    $('#fromTypeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.fromTypes, function(key, val) {
	 		$('#fromTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	  });
});

var getAPIResponseForSearchPage = function(fieldFiltersforSearch,flagSearch){
	postJSON('/OrderExecution/api/v1/onloadMovementOfAccessories',JSON.stringify(fieldFiltersforSearch),function(data) {
		 if(data.resCode == 1){
			 if(flagSearch ==1){
				 $.each(data.payload.accCatList, function(key, val) {
					 $('#mainCategory').append('<option value="' + val.id + '" code ="'+ val.code +'">' + val.description + '</option>');
				 });
			 }
			 if(flagSearch ==2){
				 $.each(data.payload.stoneOrAccSubCatList, function(key, val) {
					 $('#subCategory').append('<option value="' + val.id + '" code ="'+ val.code +'">' + val.description + '</option>');
				 });
			 }
			 if(flagSearch ==3){
			    $('#toTypeS').empty().append('<option value="" selected>--Select--</option>');
				var arrayToType = [];
			    arrayToType.push(data.payload.fromTypes);
				   $.each(arrayToType, function(key, val) {
			 		  $('#toTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
		           });
			 }
		 }else if(data.resCode == 2){
			 $.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
				return false;
		 }else{
			 $.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
				return false;
		  }
     });
}

$("#segment").on("change",function(){
	$('#mainCategory').empty().append('<option value="" selected>--Select--</option>');
	if($('#segment').val() != "" || $('#segment').val() != null){
		var fieldFiltersforSearch ={"fieldFilters": {"type": "accCatsForSearchLOV","accSegmentList":$('#segment').val()}}
		getAPIResponseForSearchPage(fieldFiltersforSearch,flagSearch=1);
	}
});

$("#mainCategory").on("change",function(){
	$('#subCategory').empty().append('<option value="" selected>--Select--</option>');
	if($('#mainCategory').val() != "" || $('#mainCategory').val() != null){
		var fieldFiltersforSearch ={"fieldFilters": {"type": "accSubCatsForSearchLOV","accCatList":$('#mainCategory').val()}}
		getAPIResponseForSearchPage(fieldFiltersforSearch,flagSearch=2);
	}
});

$("#fromTypeS").on("change",function(){
	$('#toTypeS').empty().append('<option value="" selected>--Select--</option>');
	if($('#fromTypeS').val() != "" || $('#fromTypeS').val() != null){
		var fieldFiltersforSearch ={"fieldFilters": {"type": "toTypes", "fromType":$('#fromTypeS option:selected').text()}}
		getAPIResponseForSearchPage(fieldFiltersforSearch,flagSearch=3);
	}
})
//################### Search Accessory Movement Grid #####################

var accMovFieldFilters = function(){
	
	var movementId = $("#movementId").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	var segment = $("#segment").val();
	var mainCategory = $("#mainCategory").val();
	var subCategory = $("#subCategory").val();
	var fromTypeS = $("#fromTypeS").val();
	var toTypeS = $("#toTypeS").val();
	var fromDocNoS = $("#fromDocNoS").val();
	var toDocNoS = $("#toDocNoS").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	fieldFilters.fieldFilters["movType"]="Accessory";
	
	if (movementId != "" && movementId != null) {
		fieldFilters.fieldFilters["movId"] = movementId;
	}
	
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}	

	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["segId"] = segment;
	}
	
	if (mainCategory != "" && mainCategory != null) {
		fieldFilters.fieldFilters["catId"] = mainCategory;
	}
	
	if (subCategory != "" && subCategory != null) {
		fieldFilters.fieldFilters["subCatId"] = subCategory;
	}
	
	if (fromTypeS != "" && fromTypeS != null) {
		fieldFilters.fieldFilters["from"] = fromTypeS;
	}
	
	if (toTypeS != "" && toTypeS != null) {
		fieldFilters.fieldFilters["to"] = toTypeS;
	}
	
	if (fromDocNoS != "" && fromDocNoS != null) {
		fieldFilters.fieldFilters["fromDocNo"] = fromDocNoS;
	}
	
	if (toDocNoS != "" && toDocNoS != null) {
		fieldFilters.fieldFilters["toDocNo"] = toDocNoS;
	}
	
	console.log(fieldFilters);
	return fieldFilters;

}
$("#search").on('click', function(){
	var fromTypeS = $("#fromTypeS").val();
	var toTypeS = $("#toTypeS").val();
	if(toTypeS == "" || fromTypeS == null || toTypeS == null || fromTypeS == ""){
		$.growl.error({
			message : "Please fill manadatory Fields!!.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	AccMovementCreateGridSearch();
	$("#jqxgrid").show();
});

var  AccMovementCreateGridSearch = function() {
	
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		    {name : 'movId',	type : 'int'},
			{name : 'date',	type : 'date'},
		    {name : 'fromType',	type : 'int','map':'fromType'},
			{name : 'FromDocNo',	type : 'int','map':'fromPktOrStkOrLocOrOrdNo'},
			{name : 'FromDocSrlNo',	type : 'int','map':'fromOrderSrlNo'},
			{name : 'FromAccSrlNo',	type : 'int','map':'fromOrderStoneSrlNo'},
			{name : 'segment',	type : 'string','map':'segmentDTO>description'},
			{name : 'accCat',	type : 'string','map':'mainCat>description'},
			{name : 'accSubCat',	type : 'string','map':'subcat>description'},
			{name : 'pcs',	type : 'int'},
			{name : 'wt',	type : 'float'},
			{name : 'costPrice',	type : 'float', 'map' : 'accCostPrice'},
			{name : 'sellingPrice',	type : 'float', 'map' : 'accSellingPrice'},
			{name : 'toType',	type : 'string'},
			{name : 'toDocNo',	type : 'int','map':'toPktOrStkOrLocOrOrdNo'},
			{name : 'toDocSrlNo',	type : 'int','map':'toOrderSrlNo'},
			{name : 'toAccSrlNo',	type : 'int','map':'toOrderStoneSrlNo'}
		];

	var columns = [
		{text : 'Movement Id', datafield : 'movId', width : '5%', cellsalign : 'center', align : 'center',editable : false,sortable:true},
		{text : 'Date', datafield : 'date', width : '7%', cellsalign : 'center', align : 'center',editable : false, cellsformat : 'dd/MM/yyyy',sortable:false},
		{text : 'From Type', datafield : 'fromType', width : '6%', cellsalign : 'center', align : 'center',editable : false,sortable:false},
		{text : 'From Doc No', datafield : 'FromDocNo', width : '7%', cellsalign : 'center', align : 'center',editable : false,sortable:false},
		{text : 'From Doc Srl No', datafield : 'FromDocSrlNo', width : '7%', cellsalign : 'center', align : 'center',editable : false,sortable:false},			
		{text : 'From Acc Srl No', datafield : 'FromAccSrlNo', width : '7%', cellsalign : 'center', align : 'center',editable : false,sortable:false},
		{text : 'Segment', datafield : 'segment', width : '5%', cellsalign : 'center', align : 'center',editable : false,sortable:false},
		{text : 'Acc Cat', datafield : 'accCat', width : '5%', cellsalign : 'center', align : 'center',editable : false,sortable:false},
		{text : 'Acc Sub Cat', datafield : 'accSubCat', width : '8%', cellsalign : 'center', align : 'center',editable : false,sortable:false},
		{text : 'Pcs', datafield : 'pcs', width : '4%', cellsalign : 'center', align : 'center',editable : false,sortable:false},
		{text : 'Wt', datafield : 'wt', width : '4%', cellsalign : 'right', align : 'center',columntype : 'numberinput',cellsformat: 'd3',editable : false,sortable:false},
		{text : 'Cost Price', datafield : 'costPrice', width : '6%', cellsalign : 'right', align : 'center',columntype : 'numberinput',cellsformat: 'd2',editable : false,sortable:false},
		{text : 'Selling Price', datafield : 'sellingPrice', width : '7%', cellsalign : 'right', align : 'center',columntype : 'numberinput',cellsformat: 'd2',editable : false,sortable:false},
		{text : 'To Type', datafield : 'toType', width : '5%', cellsalign : 'center', align : 'center',editable : false,sortable:false},
		{text : 'To Doc No', datafield : 'toDocNo', width : '6%', cellsalign : 'center', align : 'center',editable : false,sortable:false},
		{text : 'To Doc Srl No', datafield : 'toDocSrlNo', width : '5%', cellsalign : 'center', align : 'center',editable : false,sortable:false},
		{text : 'To Acc Srl No', datafield : 'toAccSrlNo', width : '6%', cellsalign : 'center', align : 'center',editable : false,sortable:false},	
	];

	showMyGrid(datafields,"/OrderExecution/api/v1/searchStnAccMovementList", "list", columns, accMovFieldFilters(), updateRows, "");
	
	$("#jqxgrid").jqxGrid({	
		width : '100%',
		editable : true,
		columnsheight : 50,
		autorowheight : true,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		showtoolbar : false,
	});
}

//################### create page lovs ####################
$("#refDocSlNoHide").hide();
$("#fromDocAccSrlNoHide").hide();
$("#toDocAccSrlNoHide").hide();
$("#toRefDocSlNoHide").hide();

$("#movementType").val("Accessory");
$("#createStoneAccMovementCreate").on("click",function(){
	 $('#pcsC').val("");
	 $('#WtC').val("");
	 $('#cpC').val("");
	 $('#spC').val("");
	 $('#segmentIdC').val("");
	 $('#accCategoryC').val("");
	 $('#accSubCatC').val("");
	 $('#jqxgridCreate').jqxGrid('clear');
	 stoneAccMovementCreateGrid();
	 $("#jqxgridCreate").show();
	var fieldFilters ={"fieldFilters": {"type": "fromTypes"}}
	postJSON('/OrderExecution/api/v1/onloadMovementOfAccessories',JSON.stringify(fieldFilters),function(data) {
		    $('#fromTypeC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.fromTypes, function(key, val) {
		 		$('#fromTypeC').append('<option value="' + val.id + '">' + val.name + '</option>');
		  });
	 });
});

$("#fromTypeC").on("change",function(){
	
	 $('#fromDocAccSrlNoC').empty().append('<option value="" selected>--Select--</option>');
	 $('#refDocSlNoC').empty().append('<option value="" selected>--Select--</option>');
	 $('#fromDocNoC').empty().append('<option value="" selected>--Select--</option>');
	 $('#toDocNoC').empty().append('<option value="" selected>--Select--</option>');
	 $('#toDocAccSrlNoC').empty().append('<option value="" selected>--Select--</option>');
	 $('#toRefDocSlNoC').empty().append('<option value="" selected>--Select--</option>');
	 $('#toTypeC').empty().append('<option value="" selected>--Select--</option>');
	 
	 var fieldFilters1 ={"fieldFilters": {"type": "fromDocNos", "fromType":$('#fromTypeC option:selected').text()}}
     getResponseLovTo(fieldFilters1,flag=1);
	    if($('#fromTypeC option:selected').text() != "--Select--"){
			var fieldFilters ={"fieldFilters": {"type": "toTypes", "fromType":$('#fromTypeC option:selected').text()}}
			getResponseLovTo(fieldFilters,flag=2);
	    }
    if($('#fromTypeC').val() == "STK"){
    	$("#refDocSlNoHide").hide();
    	$("#fromDocAccSrlNoHide").hide();
    	$("#refDocSlNoC").prop("disabled",true);
    	$("#fromDocAccSrlNoC").prop("disabled",true);
    }else{
    	$("#refDocSlNoHide").show();
    	$("#fromDocAccSrlNoHide").show();
    	$("#refDocSlNoC").prop("disabled",false);
    	$("#fromDocAccSrlNoC").prop("disabled",false);
    }
});

$("#fromDocNoC").on("change",function(){
	
	 $('#fromDocAccSrlNoC').empty().append('<option value="" selected>--Select--</option>');
	 $('#refDocSlNoC').empty().append('<option value="" selected>--Select--</option>');
	 if($('#fromTypeC').val() != "STK"){
		if($('#fromDocNoC option:selected').text() != "--Select--"){
			var fieldFilters ={"fieldFilters": {"type": "fromDocSrlNos", "fromType":$('#fromTypeC option:selected').text(),"fromDocNo":$('#fromDocNoC').val()}}
			getResponseLovTo(fieldFilters,flag=3);
		}
	 }
});

$("#refDocSlNoC").on("change",function(){
	 if($('#fromTypeC').val() != "STK"){
		if($('#refDocSlNoC option:selected').text() != "--Select--"){
			var fieldFilters ={"fieldFilters": {"type": "fromDocAccSrlNos", "fromType":$('#fromTypeC option:selected').text(),"fromDocNo":$('#fromDocNoC').val(),"fromDocSrlNo":$('#refDocSlNoC').val()}}
			getResponseLovTo(fieldFilters,flag=4);
		}
	 }
});

$("#toTypeC").on("change",function(){
	 $('#pcsC').val("");
	 $('#WtC').val("");
	 $('#cpC').val("");
	 $('#spC').val("");
	 $('#segmentIdC').val("");
	 $('#accCategoryC').val("");
	 $('#accSubCatC').val("");
	 $('#toDocAccSrlNoC').empty().append('<option value="" selected>--Select--</option>');
	 $('#toRefDocSlNoC').empty().append('<option value="" selected>--Select--</option>');
	 $('#toDocNoC').empty().append('<option value="" selected>--Select--</option>');
	 
		if($('#fromDocNoC').val() !=""){
			if($('#fromTypeC').val() != "STK"){
				if($("#refDocSlNoC").val() == "" || $("#fromDocAccSrlNoC").val()==""){
					$.growl.error({
						message : "Please select Serial no Field!!",
						duration : 10000
					});
					return false;
				}
		     }
			 if($("#toTypeC option:selected").text() != "--Select--"){
				var fieldFilters ={"fieldFilters": {"type": "toDocNos", "fromType":$('#fromTypeC option:selected').text(),"fromDocNo":$('#fromDocNoC').val(),
				"fromDocSrlNo":$('#refDocSlNoC').val(),"fromDocAccSrlNo":$('#fromDocAccSrlNoC').val(),"toType":$("#toTypeC option:selected").text(),
				}}
				getResponseLovTo(fieldFilters,flag=5);
			 }
			 
		}else{
			$.growl.error({
				message : "From Doc No Should not be Empty !!",
				duration : 10000
			});
			return false;
		 }
		 if($('#toTypeC').val() == "STK"){
			    $("#toDocAccSrlNoHide").hide();
	    	    $("#toRefDocSlNoHide").hide();
		    	$("#toDocAccSrlNoC").prop("disabled",true);
		    	$("#toRefDocSlNoC").prop("disabled",true);
	      }else{
	    	    $("#toDocAccSrlNoHide").show();
	    	    $("#toRefDocSlNoHide").show();
		    	$("#toDocAccSrlNoC").prop("disabled",false);
		    	$("#toRefDocSlNoC").prop("disabled",false);
	     }
});

$("#toDocNoC").on("change",function(){
	if($('#toTypeC').val() != "STK"){
		if($('#toDocNoC option:selected').text() != "--Select--"){
			 var fieldFilters ={"fieldFilters": {"type": "toDocSrlNos", "toType":$('#toTypeC option:selected').text(),
				 "toDocNo":$('#toDocNoC').val(),"toType":$("#toTypeC option:selected").text(), "fromType":$('#fromTypeC option:selected').text(),
				 "fromDocNo":$('#fromDocNoC').val()}}
			     getResponseLovTo(fieldFilters,flag=6);
		 }
	}
});

$("#toRefDocSlNoC").on("change",function(){
	if($('#toTypeC').val() != "STK"){
		if($('#toRefDocSlNoC option:selected').text() != "--Select--"){
			 var fieldFilters ={"fieldFilters": {"type": "toDocAccSrlNos", "toType":$('#toTypeC option:selected').text(),
				 								"toDocNo":$('#toDocNoC').val(),"toDocSrlNo":$("#toRefDocSlNoC option:selected").text(),
				 								"fromType":$('#fromTypeC option:selected').text(),"fromDocNo":$('#fromDocNoC').val()
				 								}
								}
			 getResponseLovTo(fieldFilters,flag=7);
		 }
	}
});

var getResponseLovTo = function(fieldFilters,flag){
	
	 if($('#fromTypeC option:selected').text() != "--Select--"){
		postJSON('/OrderExecution/api/v1/onloadMovementOfAccessories',JSON.stringify(fieldFilters),function(data) {
			if(data.resCode == 1){
				if(flag == 1){
					$('#fromDocNoC').empty().append('<option value="" selected>--Select--</option>');
					if(data.resCode == 1){
						$.each(data.payload.fromDocNos, function(key, val) {
					 		$('#fromDocNoC').append('<option value="' + val + '">' + val + '</option>');
					    });
					}
				}
				if(flag == 2){
					$('#toTypeC').empty().append('<option value="" selected>--Select--</option>');
					var arrayToType = [];
				    arrayToType.push(data.payload.fromTypes)
				    $.each(arrayToType, function(key, val) {
			 		  $('#toTypeC').append('<option value="' + val.id + '">' + val.name + '</option>');
		           });
				}
				if(flag == 3){
					$('#refDocSlNoC').empty().append('<option value="" selected>--Select--</option>');
						$.each(data.payload.fromDocSrlNos, function(key, val) {
					 		$('#refDocSlNoC').append('<option value="' + val + '">' + val + '</option>');
					    });
			    }
				if(flag == 4){
					 $('#fromDocAccSrlNoC').empty().append('<option value="" selected>--Select--</option>');
					 $.each(data.payload.fromDocAccSrlNos, function(key, val) {
					 		$('#fromDocAccSrlNoC').append('<option value="' + val + '">' + val + '</option>');
				    });
				 }
				if(flag == 5){
					$('#toDocNoC').empty().append('<option value="" selected>--Select--</option>');
			         $.each(data.payload.toDocNos, function(key, val) {
				 		 $('#toDocNoC').append('<option value="' + val + '">' + val + '</option>');
				     });
			         	 $("#segmentIdC").val(data.payload.AccSegment.id);
			         	 $("#segmentIdCode").val(data.payload.AccSegment.code);
			         	 $("#segIdC").val(data.payload.AccSegment.description);
			         	 
			         	 $("#accCategoryIdC").val(data.payload.accCat.id);
			         	 $("#accCategoryCode").val(data.payload.accCat.code);
			         	 $("#accCategoryC").val(data.payload.accCat.description);
			         	 
			         	 $("#accSubCatIdC").val(data.payload.accSubCat.id);
			         	 $("#accSubCatCode").val(data.payload.accSubCat.code);
			         	 $("#accSubCatC").val(data.payload.accSubCat.description);
			         	 
						 $('#pcsC').val(data.payload.accPcs);
						 $('#WtC').val(data.payload.accWt);
						 $('#cpC').val(data.payload.accCostPrice);
						 $('#spC').val(data.payload.accSellingPrice);
						 $("#accCodeC").val(data.payload.accCode);
				}
			   if(flag == 6){
					 $('#toRefDocSlNoC').empty().append('<option value="" selected>--Select--</option>');
						// Removing Duplicate From Array
						var toDocSrlNo = [];
						$.each(data.payload.toDocSrlNos, function(i, el){
						    if($.inArray(el, toDocSrlNo) === -1) toDocSrlNo.push(el);
						});
						
					 $.each(toDocSrlNo, function(key, val) {
					 	$('#toRefDocSlNoC').append('<option value="' + val + '">' + val + '</option>');
				    });
			   }
			   if(flag == 7){
					 $('#toDocAccSrlNoC').empty().append('<option value="" selected>--Select--</option>');
					 $.each(data.payload.toDocAccSrlNos, function(key, val) {
					 		$('#toDocAccSrlNoC').append('<option value="' + val + '">' + val + '</option>');
				    });
				}
			}else if(data.resCode == 2){
				if(flag == 5){
					 $('#segmentIdC').append('<option value="' + data.payload.AccSegment.id + '" code="'+data.payload.AccSegment.code+'">' + data.payload.AccSegment.description + '</option>');
					 $('#accCategoryC').append('<option value="' + data.payload.accCat.id + '" code="'+data.payload.accCat.code+'">' + data.payload.accCat.description + '</option>');
					 $('#accSubCatC').append('<option value="' + data.payload.accSubCat.id + '" code="'+data.payload.accSubCat.code+'">' + data.payload.accSubCat.description + '</option>');
					 $('#pcsC').val(data.payload.accPcs);
					 $('#WtC').val(data.payload.accWt);
					 $('#cpC').val(data.payload.accCostPrice);
					 $('#spC').val(data.payload.accSellingPrice);
				}
				if(flag == 1 || flag == 2 || flag == 5 || flag == 6 || flag == 7){
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
					return false;
				}
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
				return false;
			}
		});
	}
}

$("#cancel").on('click', function(){
	$("#jqxgridCreate").jqxGrid('clear');
	var rows = $("#jqxgridCreate").jqxGrid('getrows');
	if(typeof rows != "undefined" && rows.length > 0){
		var rowscount = $("#jqxgridCreate").jqxGrid('getdatainformation').rowscount;
		for(var k=0;k<rowscount;k++){			  
            var id = $("#jqxgridCreate").jqxGrid('getrowid', k);
             $("#jqxgridCreate").jqxGrid('deleterow', id);
         }
	}
});

var rowAccId = 0;
var generaterowS = function (i) {
	var row = {};  
    row["fromType"] = ($("#fromTypeC option:selected").text() == "--Select--")?"":$("#fromTypeC option:selected").text();
 	row["FromDocNo"] =  $("#fromDocNoC").val();	  	
 	row["FromDocSrlNo"] =  $("#refDocSlNoC").val();
 	row["FromAccSrlNo"] =  $("#fromDocAccSrlNoC").val();
 	
 	row["segment"] =  $("#segIdC").val();
 	row["segmentId"] =  $("#segmentIdC").val();
 	row["segmentCode"] =  $("#segmentIdCode").val();
 	
	row["accCat"] =   $("#accCategoryC").val();
	row["accCatId"] =   $("#accCategoryIdC").val();
	row["accCatCode"] =   $("#accCategoryCode").val();
	
 	row["accSubCat"] =   $("#accSubCatC").val();
 	row["accSubCatId"] =   $("#accSubCatIdC").val();
 	row["accSubCatCode"] =   $("#accSubCatCode").val();
 	
 	row["pcs"] =   $("#pcsC").val();
 	row["wt"] =  $('#WtC').val();	  	
 	row["costPrice"] =  $("#cpC").val();
 	row["sellingPrice"] =   $("#spC").val();
	row["toType"] =   ($("#toTypeC option:selected").text() == "--Select--")?"":$("#toTypeC option:selected").text();
 	row["toDocNo"] =   $("#toDocNoC").val();	  	
 	row["toDocSrlNo"] =  $("#toRefDocSlNoC").val();
 	row["toAccSrlNo"] =   $("#toDocAccSrlNoC").val();
 	row["remarks"] =   $("#remaksC").val();
 	row["accCode"] =   $("#accCodeC").val();
	rowAccId = rowAccId + 1;
    return row;
 }

var stoneAccMovementCreateGrid = function() {
	
	var source = {
		datafields : [ 
			    {name : 'fromType',	type : 'string'},
				{name : 'FromDocNo',	type : 'int'},
				{name : 'FromDocSrlNo',	type : 'int'},
				{name : 'FromAccSrlNo',	type : 'int'},
				{name : 'segment',	type : 'string'},
				{name : 'segmentId',	type : 'string'},
				{name : 'segmentCode',	type : 'string'},
				{name : 'accCat',	type : 'string'},
				{name : 'accCatId',	type : 'string'},
				{name : 'accCatCode',	type : 'string'},
				{name : 'accSubCat',	type : 'string'},
				{name : 'accSubCatId',	type : 'string'},
				{name : 'accSubCatCode',	type : 'string'},
				{name : 'pcs',	type : 'int'},
				{name : 'wt',	type : 'float'},
				{name : 'costPrice',	type : 'float'},
				{name : 'sellingPrice',	type : 'float'},
				{name : 'toType',	type : 'string'},
				{name : 'toDocNo',	type : 'int'},
				{name : 'toDocSrlNo',	type : 'int'},
				{name : 'toAccSrlNo',	type : 'int'},
				{name : 'remarks',	type : 'string'},
				{name : 'accCode',	type : 'string'}
		]
	};

	$("#jqxgridCreate").jqxGrid({
		width : '100%',
		editable : true,
		columnsheight : 60,
		autorowheight : true,
		autoheight : true,
		theme: 'energyblue',
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div class='colo-md-12'></div>");
			toolbar.append(container);
			container.append('<div class="col-md-6"><div id="addrowbutton" style="margin-top:5px;" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i> </div>&nbsp;</div>');
			container.append('<div class="col-md-6"><div id="deleterowbutton" style="margin-top:5px;" class="btn btn-danger btn-sm pull-right"><i  class="fa fa-trash fa-md"></i></div></div>');
			$("#addrowbutton").jqxButton();
			$("#deleterowbutton").jqxButton();
			$("#addrowbutton").on('click',	function() {
				if($("#fromTypeC").val() == "" || $("#fromDocNoC").val() == "" ||$("#toTypeC").val() == "" ||$("#toDocNoC").val() == ""){
					$.growl.error({
						message : "Please fill the mandatory Fields!!",
						duration : 10000
					});
					return false;
				}
				if($('#fromTypeC').val() != "STK"){
					if($("#refDocSlNoC").val() == "" || $("#fromDocAccSrlNoC").val() == ""){
						$.growl.error({
							message : "Please fill the mandatory Fields!!",
							duration : 10000
						});
						return false;
					} 
				}
				if($('#toTypeC').val() != "STK"){
					if($("#toRefDocSlNoC").val() == "" || $("#toDocAccSrlNoC").val() == ""){
						$.growl.error({
							message : "Please fill the mandatory Fields!!",
							duration : 10000
						});
						return false;
					} 
				}
				var flagDupl = true;
				var rows = $("#jqxgridCreate").jqxGrid('getrows');
				if(rows.length > 0){
					$.each(rows,function(k,v){
						if(v.fromType === $("#fromTypeC option:selected").text() && v.FromDocNo === $("#fromDocNoC").val()&& v.FromDocSrlNo === $("#refDocSlNoC").val() &&
						v.FromAccSrlNo === $("#fromDocAccSrlNoC").val() && v.toType === $("#toTypeC option:selected").text() && v.toDocNo ===  $("#toDocNoC").val() &&
						v.toDocSrlNo === $("#toRefDocSlNoC").val() && v.toAccSrlNo === $("#toDocAccSrlNoC").val()){
							$.growl.error({
								message : "Duplicate Record is not allowed to Add!!",
								duration : 10000
							});
							flagDupl = false;
						}
					});
				}
				if(flagDupl == true){
					$("#jqxgridCreate").jqxGrid('addrow',null,generaterowS(rowAccId));
					$("#dcDetailsEdit").trigger('reset');
				}
			});
			$("#deleterowbutton").on('click', function() {
				var designMasterGrid = $("#jqxgridCreate").jqxGrid('getrows');
				var selectedrowindex = $("#jqxgridCreate").jqxGrid('getselectedrowindex');
				var rowscount = $("#jqxgridCreate").jqxGrid('getdatainformation').rowscount;				
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var id = $("#jqxgridCreate").jqxGrid('getrowid', selectedrowindex);
					var commit = $("#jqxgridCreate").jqxGrid('deleterow', id);
				}
				for (var j = 0; j < rowscount; j++) {
					$("#jqxgridCreate").jqxGrid("setcellvalue", j, "slNo", j + 1);
				}
			});
		},
		
		columns : [			
			{text : 'From Type', datafield : 'fromType', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'From Doc No', datafield : 'FromDocNo', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'From Doc Srl No', datafield : 'FromDocSrlNo', width : '8%', cellsalign : 'center', align : 'center',editable : false},			
			{text : 'From Acc Srl No', datafield : 'FromAccSrlNo', width : '8%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Segment', datafield : 'segment', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Acc Cat', datafield : 'accCat', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Acc Sub Cat', datafield : 'accSubCat', width : '8%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Acc Code', datafield : 'accCode', width : '6%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Pcs', datafield : 'pcs', width : '4%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Wt', datafield : 'wt', width : '4%', cellsalign : 'right', align : 'center',cellsformat: 'd3',editable : false},
			{text : 'Cost Price', datafield : 'costPrice', width : '6%', cellsalign : 'right', align : 'center',cellsformat: 'd2',editable : false},
			{text : 'Selling Price', datafield : 'sellingPrice', width : '6%', cellsalign : 'right', align : 'center',cellsformat: 'd2',editable : false},
			{text : 'To Type', datafield : 'toType', width : '5%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'To Doc No', datafield : 'toDocNo', width : '6%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'To Doc Srl No', datafield : 'toDocSrlNo', width : '8%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'To Acc Srl No', datafield : 'toAccSrlNo', width : '8%', cellsalign : 'center', align : 'center',editable : false},
			{text : 'Remarks', datafield : 'remarks', width : '9%', cellsalign : 'left', align : 'center',editable : false},
		]
	});
}


var saveMovementOfAcc = function(){
	var rows = $('#jqxgridCreate').jqxGrid('getrows');
	var arrAcc = [];
	$.each(rows,function(k,v){
		console.log(v);
		arrAcc.push({
		"movementType": "Accessory",
		"fromType" : v.fromType==""? null : v.fromType,
		"fromDocNo": v.FromDocNo==""?null : parseInt(v.FromDocNo),
		"fromDocSrlNo": v.FromDocSrlNo == "" ? null:parseInt(v.FromDocSrlNo),
		"fromDocAccSrlNo": v.FromAccSrlNo == "" ? null :parseInt(v.FromAccSrlNo),
		"segmentDTO": {
		  "id": parseInt(v.segmentId),
		  "description": v.segment,
		  "code": v.segmentCode,
		},
		"mainCat": {
		  "id": parseInt(v.accCatId),
		  "name": v.accCatCode,
		  "description": v.accCat,
		},
		"subcat": {
		  "id": parseInt(v.accSubCatId),
		  "name": v.accSubCatCode,
		  "description": v.accSubCat,
		},
		"pcs": parseInt(v.pcs),
		"wt":parseFloat(v.wt),
		"accCostPrice": v.costPrice==""?null:v.costPrice,
		"accSellingPrice": v.sellingPrice==""?null:v.sellingPrice,
		"accCode"	: v.accCode,	
		"toType": (v.toType),
		"toDocNo": v.toDocNo==""?null:parseInt(v.toDocNo),
		"toDocSrlNo": v.toDocSrlNo==""?null:parseInt(v.toDocSrlNo),
		"toDocAccSrlNo":v.toAccSrlNo==""?null:parseInt(v.toAccSrlNo),
		"remarks":v.remarks==""?null:v.remarks		
		});
	})
	return arrAcc;
}

$("#saveC").on('click', function(){
	var rows = $('#jqxgridCreate').jqxGrid('getrows');
	console.log(rows);
	var rowscount = $("#jqxgridCreate").jqxGrid('getdatainformation').rowscount;
	if(rowscount == 0){
		$.growl.error({
			message : "Please add line items.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	var fieldFilters = saveMovementOfAcc();
	if (fieldFilters) {
		console.log(JSON.stringify(fieldFilters));
		postJSON('/OrderExecution/api/v1/createAccMovement',JSON.stringify(fieldFilters),function(data) {
			if (data.resCode == 1) {			
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});				
				$('#createStoneAccMovement').modal('hide');
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			 }
	    });
	}
});

//Export Record as per search criteria
$("#export").on("click",function() {
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
      postJSON('/OrderExecution/api/v1/exportStnAccMovementList',JSON.stringify(accMovFieldFilters()),function(response) {
     if(response != null){
         data = response.payload.list;
	     for (i = 0; i < data.length; i++) {
	     newData.push({
				    	 'Movement Id' : (data[i].movId != null) ? data[i].movId : "",           
				    	 'Date' : (data[i].date != null) ? data[i].date : "",
				         'From Type' : (data[i].fromType != null) ? data[i].fromType : "",			 
	    	             'From Doc No' : (data[i].fromPktOrStkOrLocOrOrdNo != null) ? data[i].fromPktOrStkOrLocOrOrdNo : "",
	    	             'From Doc Srl No' : (data[i].fromOrderSrlNo != null) ? data[i].fromOrderSrlNo : "",
					     'From Acc Srl No' : (data[i].fromOrderStoneSrlNo != null) ? data[i].fromOrderStoneSrlNo : "",
						 'Segment' : (data[i].segmentDTO!= null) ? data[i].segmentDTO.description : "",
						 'Acc Cat' : (data[i].mainCat != null) ? data[i].mainCat.description : "",
						 'Acc Sub Cat' : (data[i].subcat != null) ? data[i].subcat.description : "",
						 'Pcs' : (data[i].pcs != null) ? data[i].pcs : "",
						 'Wt' : (data[i].wt != null) ? data[i].wt : "",
						 'Cost Price' : (data[i].accCostPrice != null) ? data[i].accCostPrice: "",
						 'Selling Price' : (data[i].accSellingPrice != null) ? data[i].accSellingPrice: "",
						 'To Type' : (data[i].toType != null) ? data[i].toType : "",
						 'To Doc No' : (data[i].toPktOrStkOrLocOrOrdNo != null) ? data[i].toPktOrStkOrLocOrOrdNo : "",
						 'To Doc Srl No' : (data[i].toOrderSrlNo != null) ? data[i].toOrderSrlNo : "",
						 'To Acc Srl No' : (data[i].toOrderStoneSrlNo != null) ? data[i].toOrderStoneSrlNo : "",
	      });
	}
	//JSONToCSVConvertor(newData,	" Movement of Stones " + "_" + sysdate, true);	
	var opts = [{sheetid:'Movement_of_Accessory',header:true}];
    var res = alasql('SELECT * INTO XLSX(" Movement of Accessory_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

$("#clear").on('click', function(){
	$("#jqxgrid").hide();
	$("#jqxgrid").jqxGrid('clear');
	redirect();
});

$('#createStoneAccMovement').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});