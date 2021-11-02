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

$("#Continue").prop("disabled" ,true);

var nearestCal = function(number, nearestVal){
	var numberVal = Math.ceil(number / nearestVal) * nearestVal;
	 if(numberVal == number){
	   var newVal = numberVal+nearestVal;
	 }else{
	 var newVal = numberVal;
	 }
 return newVal;
}
$('input[name=mup]:radio').on('click', function() {
	var selectedVal = $(this).val();
	if(selectedVal == "category"){
		$("#mupCategory").show();
		$("#mupType").hide();
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
		
	}else if(selectedVal == "type"){
		$("#mupCategory").hide();
		$("#mupType").show();		
		onSelectLoad();
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
});
//enable the Continue button 
$('#mupSelection').click(function() {
	   if($('.element').is(':checked')) 
	   {
		   $("#Continue").prop("disabled" ,false); 
		   
	   }
	});
$("#mupType").hide();
$("#mupCategory").hide()

//create mup Category
$("#create").on("click",function(){
	
	$("#continueCreateField").hide();
	$("#createFooter").hide();
$.getJSON('/OrderExecution/api/v1/getMupSkinPurityLov?metalId='+0, function(data) {
		
		$('#skinPurity').empty().append(
				'<option value="" selected>--Select--</option>');
			$.each(data.payload.METAL_SEGMENT_LOV, function(key, val) {
				$('#skinPurity').append(
						'<option value="' + val.skinPurity + '"  ids="'+ val.id +'">' + val.skinPurity
								+ '</option>');
			});
		});
});
//In Edit the countinue button functionality
$("#ContinueEdit").on("click",function(){
	$("#continueEditField").show();
	$("#editFooter").show();
});

//edit button on gird
var editFg = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<button class="btn btn-sm btn-primary" data-toggle="modal"   data-target="#editMupCategory" type="button" id='
			+ row
			+ ' onclick="editMupCategoery('
			+ value
			+ ')" ><i class="fa fa-pencil fa-sm"></i></button>'
	}
}
//edit Mup Category 
var changedVal;
var editMupCategoery =function(id)
{	
	$("#continueEditField").hide();
	$("#editFooter").hide();
	$('#regionEdit').empty().append(
	'<option value="" selected>--Select--</option>');
	$('#metalSegmentEdit').empty().append(
	'<option value="" selected>--Select--</option>');
	$('#skinPurityEdit').empty().append(
	'<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/getMcConfigbyId?mcId='+ id, function(data) {
	
	var mup_Types = data.payload.mup_types;
	changedVal = data.payload.mup_types;
	$("#mupCategoryIdMupType").val(mup_Types.mupType.id);
	$("#mupCategoryidEdit").val(mup_Types.mcConfigId);
	$("#mupCategoryCodeEdit").val(mup_Types.mupType.code);
	$("#mupCategoryDesEdit").val(mup_Types.mupType.description);
	$("#baseMetalRateEdit").val(mup_Types.baseMetalRate);
	$("#metalRateEdit").val(mup_Types.metalrateMarkup);
	$("#sellingRateEdit").val(mup_Types.metalRateForPurity);
	$("#mcApprotionEdit").val(mup_Types.mcApportionPercentage);
	$("#wasteageAppEdit").val(mup_Types.wastageApportionPercentage);

	$('#regionEdit').append(
			'<option selected value="' +mup_Types.region.id + '">'
					+ mup_Types.region.name  + '</option>');	
	$('#metalSegmentEdit').append(
			'<option selected value="' +mup_Types.metalSegment.id + '">'
					+ mup_Types.metalSegment.description + '</option>');	
	$('#skinPurityEdit').append(
			'<option selected value="' +mup_Types.skinPurity + '" ids="' +mup_Types.metalpurityId + '">'
					+ mup_Types.skinPurity + '</option>');	
	metalCostPurityCalculationE();
	});
	
}

var mupCatEditChangeVals = function(){
	var newBmrVal = $("#baseMetalRateEdit").val();
	var newMcPerc = $("#mcApprotionEdit").val();
	var newWcPerc = $("#wasteageAppEdit").val();
	if(parseFloat(newBmrVal) != parseFloat(changedVal.baseMetalRate) || 
	   parseFloat(newMcPerc) != parseFloat(changedVal.mcApportionPercentage) || 
	   parseFloat(newWcPerc) != parseFloat(changedVal.wastageApportionPercentage)){
		$.growl.error({
			message : "Please Save Changed Data !!!",
			duration : 10000,
			title  : 'Error'
		});
		return false;
	}
	else{
		$("#editMupCategory").modal('hide');
	}
}

var updateEdit =function(){
	var update =
	{
			  "id": $("#mupCategoryidEdit").val(),
			  "baseMetalRate": $("#baseMetalRateEdit").val(),
			  "skinPurity": $("#skinPurityEdit").val(),
			  "metalRateForPurity": 2850,
			  "wastageApportionPercentage": $("#wasteageAppEdit").val(),
			  "mcApportionPercentage": $("#mcApprotionEdit").val(),
			  "region": {
			    "id":$("#regionEdit").val() 
			    },
			  "metalSegment": {
			    "id": $("#metalSegmentEdit").val()
			   },
			  "mupType": {
				"id":$("#mupCategoryIdMupType").val(),
			    "code": $("#mupCategoryCodeEdit").val(),
			    "description": $("#mupCategoryDesEdit").val()
			  }
		}
	return update;
   }

$('#skinPurity').empty().append(
'<option value="" selected>--Select--</option>');
//on change the metal Name
$("#metalSegment").on("change",function(){
    var id = $("#metalSegment").val();    
    	if (id != "") {
	$.getJSON('/OrderExecution/api/v1/getMupSkinPurityLov?metalId='+id, function(data) {		
		$('#skinPurity').empty().append(
				'<option value="" selected>--Select--</option>');
			$.each(data.payload.METAL_SEGMENT_LOV, function(key, val) {
				$('#skinPurity').append(
						'<option value="' + val.skinPurity + '"  ids="'+ val.id +'">' + val.skinPurity
								+ '</option>');
			  });
		    });
    	  }
       });

//
$("#segmentS").on("change",function(){
    var id = $("#segmentS").val();
    $('#mupCategoryS').empty().append(
    '<option value="" selected>--Select--</option>');
	$('#skinPurityS').empty().append(
	'<option value="" selected>--Select--</option>');
    	if (id != "") {
	$.getJSON('/OrderExecution/api/v1/getMupSkinPurityLov?metalId='+id, function(data) {
		console.log(data);
		$('#skinPurityS').empty().append(
				'<option value="" selected>--Select--</option>');
			$.each(data.payload.METAL_SEGMENT_LOV, function(key, val) {
				$('#skinPurityS').append(
						'<option value="' + val.skinPurity + '">' + val.skinPurity
								+ '</option>');
			});			
		});
	
	$.getJSON('/OrderExecution/api/v1/getMupcategoryLOV?segment='+id, function(data) {
		$.each(data.payload.muptype, function(key, val) {
			
			$('#mupCategoryS').append(
					'<option value="' + val.id + '">' +val.code +"-"+ val.description
							+ '</option>');
		       });
	       });	
    	}
   });



//calculation for Selling Rate for Purity 
var calculateSellingePrice = function()
{
var baseMetalRate = parseFloat($("#baseMetalRate").val());
var skinPurity =  parseFloat($("#skinPurity").val());
var metalMarkUpval = $("#metalRate").val();
var cal = (baseMetalRate *skinPurity)/99.9;
var  roundCal =cal.toFixed(2);

	if(cal != "" && cal != "NaN")
		{
		$("#metalCostForPurity").val(roundCal);
		var sellingPriceAdd  = parseFloat(roundCal)+parseFloat(roundCal);
		if(sellingPriceAdd !="" && sellingPriceAdd != "NaN")
			{
			var sellingPrice = sellingPriceAdd*metalMarkUpval;
			var finalSellingPrice =sellingPrice.toFixed(2);
			$("#sellingRate").val(finalSellingPrice);
			}
		
		}
	return finalSellingPrice;
}


//creating object for saving 
var createSave =function(){
	//calculateSellingePrice();
	var mupCate ={
		"code":$("#mupCategoryC").val(),
		"description":$("#mupCategoryDes").val(),
		"metalpurityId":$('#skinPurity').find('option:selected').attr('ids'),
		"mcConfigs":[{
			"baseMetalRate":$("#baseMetalRate").val(),
			"skinPurity":$("#skinPurity").val(),
			"metalRateForPurity":$("#sellingRate").val(),
			"wastageApportionPercentage":$("#wasteageApp").val(),
			"mcApportionPercentage":$("#mcApprotion").val(),
		"region": {
	        "id": $("#regionCreate").val(),
	      },
	      "metalSegment": {
	          "id": $("#metalSegment").val(),
	        }
		}],
		
	}	
	return mupCate;
}

function validateNumber(val) {
	var regex = /^\d{0,6}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}

var metalCostPurityCalculation = function(){
	var baseMetalRate = $("#baseMetalRate").val();
	var skinPurity = $("#skinPurity").val();
	var metalRate = $("#metalRate").val();
	
	if(baseMetalRate == "" || skinPurity == ""){
		
		$("#metalCostForPurity").val('');
		return false;
	}
	else{
	var metalCostPurity = (baseMetalRate * skinPurity)/99.9;
	if(metalCostPurity == "" || metalCostPurity == null || typeof metalCostPurity == "undefined"){
		$("#metalCostForPurity").val('');
	}else{
		$("#metalCostForPurity").val(metalCostPurity.toFixed(2));
		}
 SellingRateforPUrityCal();
 loadMetalrate();
	}
};

var calculationFilter = function()
{
	var basemetalRate = $("#baseMetalRate").val();
	var skinPurityMupTableC = $("#skinPurity").val();
	var metalpurityid =  $("#skinPurity option:selected").attr('ids');
	fieldFilters = {
			"fieldFilters" : {}
		};
	
	if (basemetalRate != "" && basemetalRate != null) {
		fieldFilters.fieldFilters["basemetalRate"] = basemetalRate;
	}
	if (skinPurityMupTableC != "" && skinPurityMupTableC != null) {
		fieldFilters.fieldFilters["skinPurity"] = skinPurityMupTableC;
	}
	if (metalpurityid != "" && metalpurityid != null) {
		fieldFilters.fieldFilters["metalPurityId"] = metalpurityid;
	}

	return fieldFilters;
}
//filter for mark up 
var loadMetalrate = function(){
	var skinPurityIds = $("#skinPurity option:selected").attr('ids');
	
	var fieldFilter = {
			  "fieldFilters": {		   
				    "metalPurityId": skinPurityIds	    
				  }
			}
			
	postJSON('/OrderExecution/api/v1/getMetalrate', JSON.stringify(fieldFilter),function(data) {
	if(data.resCode == 1){
		$("#metalRate").val(data.payload.mRates);
	}else if(data.resCode == 2){
		$("#metalRate").val('');
		$.growl.error({
			message : data.mesgStr,
			duration : 10000
		});
		return false;			
   }else{
	   /*$.growl.error({
			message : data.mesgStr,
			duration : 10000
		});
		return false;*/	
		}	
	});
}
var SellingRateforPUrityCal= function()
{
	postJSON('/OrderExecution/api/v1/calculateMeatlrate',JSON.stringify(calculationFilter()),function(data){
		console.log(data.payload.metal_price);
		if(data.resCode == 1){
			$("#sellingRate").val(data.payload.metal_price);
			$("#saveMup").prop("disabled",false);
		}else if(data.resCode == 1){ 
			$("#saveMup").prop("disabled",true);
			$("#sellingRate").val('');
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
	})
}

var mcApportionCalculate = function(){
	var mcApprotion = $("#mcApprotion").val();
	var wasteageApp = $("#wasteageApp").val();
	
	if(mcApprotion != "" && wasteageApp  != "" )
		{
	var totalValue = parseFloat(mcApprotion) + parseFloat(wasteageApp);
	console.log(totalValue);
	if(totalValue != "100.00"){
		$.growl.error({
			message : "MC apportion and wastage apportion should sum up to 100%!!",
			duration : 10000
		});
		return false;
	}
		}
}
 
var metalCostPurityCalculationE = function(){
	var baseMetalRate = $("#baseMetalRateEdit").val();
	var skinPurity = $("#skinPurityEdit").val();
	var metalRate = $("#metalRateEdit").val();
	
	if(baseMetalRate == ""){
		
		$("#metalCostForPurityEdit").val('');
		return false;
	}
		
	var metalCostPurity = (baseMetalRate * skinPurity)/99.9;
	if(metalCostPurity == "" || metalCostPurity == null || typeof metalCostPurity == "undefined"){
		$("#metalCostForPurityEdit").val('');
	}else{
		$("#metalCostForPurityEdit").val(metalCostPurity.toFixed(2));
	}
	
	mupCategorySellingrate();	
};

var calculationSellingFilter = function()
{
	var basemetalRate = $("#baseMetalRateEdit").val();
	var skinPurityMupTableC = $("#skinPurityEdit").val();
	var metalpurityid =  $("#skinPurityEdit option:selected").attr('ids');
	fieldFilters = {
			"fieldFilters" : {}
		};	
	if (basemetalRate != "" && basemetalRate != null) {
		fieldFilters.fieldFilters["basemetalRate"] = basemetalRate;
	}
	if (skinPurityMupTableC != "" && skinPurityMupTableC != null) {
		fieldFilters.fieldFilters["skinPurity"] = skinPurityMupTableC;
	}
	if (metalpurityid != "" && metalpurityid != null) {
		fieldFilters.fieldFilters["metalPurityId"] = metalpurityid;
	}

	return fieldFilters;
}
 var mupCategorySellingrate = function()
 {
	
	 postJSON('/OrderExecution/api/v1/calculateMeatlrate',JSON.stringify(calculationSellingFilter()),function(data){
			$("#sellingRateEdit").val(data.payload.metal_price);
		})
 }
var mcApportionCalculateE = function(){
	var mcApprotion = $("#mcApprotionEdit").val();
	var wasteageApp = $("#wasteageAppEdit").val();

	var totalValue = parseFloat(mcApprotion) + parseFloat(wasteageApp);
	if(totalValue != "100.00"){
		$.growl.error({
			message : "MC Apportion and wastage Apportion should sum up to 100%!!",
			duration : 10000
		});
		return false;
	}
}
onLoadLov();
 function onLoadLov(){
//create the mupLov for region
$.getJSON('/OrderExecution/api/v1/getMupLOV', function(data) {
	
	$('#regionCreate').empty().append(
			'<option value="" selected>--Select--</option>');
	
	$('#metalSegment').empty().append(
	'<option value="" selected>--Select--</option>');
	$.each(data.payload.rList, function(key, val) {
		$('#regionCreate').append(
				'<option value="' + val.id + '">' + val.name
						+ '</option>');
	});
	$('#regionSearch').empty().append(
	'<option value="" selected>--Select--</option>');
	$.each(data.payload.rList, function(key, val) {
		$('#regionSearch').append(
				'<option value="' + val.id + '">' + val.name
						+ '</option>');
	});
	$.each(data.payload.METAL_SEGMENT_LOV, function(key, val) {
		$('#metalSegment').append(
				'<option value="' + val.id + '">' + val.description
						+ '</option>');
	});	
	$('#segmentS').empty().append(
	'<option value="" none selected>--Select--</option>');
	$.each(data.payload.METAL_SEGMENT_LOV, function(key, val) {
		$('#segmentS').append(
				'<option value="' + val.id + '">' + val.description
						+ '</option>');
	});
	$('#mupCategoryS').empty().append(
	'<option value="" selected>--Select--</option>');
 });
}

$("#ContinueCreate").on("click",function(){
	var mupCategoryC = $("#mupCategoryC").val();
	var mupCategoryDes = $("#mupCategoryDes").val();
	if(mupCategoryC == "" || mupCategoryDes == ""){
		$.growl.error({
			message : "Please fill the mandatory fields!!",
			duration : 10000
		});
		return false;
	}
	$("#continueCreateField").show();
	$("#createFooter").show();
	});
$("#continueCreateField").hide();
$('#jqxgrid').show();

var metalMAPPriceFieldFilter = function() {
	var regionSearch = $("#regionSearch").val();
	var segmentS = $("#segmentS").val();
	var skinPurityS = $("#skinPurityS").val();
	var mupCategoryS = $("#mupCategoryS").val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (regionSearch != "" && regionSearch != null) {
		fieldFilters.fieldFilters["region"] = regionSearch;
	}
	if (segmentS != "" && segmentS != null) {
		fieldFilters.fieldFilters["segment"] = segmentS;
	}
	if (skinPurityS != "" && skinPurityS != null) {
		fieldFilters.fieldFilters["skinpiurity"] = skinPurityS;
	}
	if (mupCategoryS != "" && mupCategoryS != null) {
		fieldFilters.fieldFilters["metalpiurity"] = mupCategoryS;
	}

	return fieldFilters;
}

//Search grid for Metal MAP Price
function mupCategorygird() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [{
		'name' : 'regionId',
		'type' : 'string',
		'map'  : 'region>name'
	},{
		'name' : 'Segment',
		'type' : 'string',
		'map'  : 'metalSegment>description'
	},{
		'name' : 'skinPurity',
		'type' : 'string',
		'map'  : 'skinPurity'
	},{
		'name' : 'mupType',
		'type' : 'string',
		'map'  : 'mupType>description'
	},{
		'name' : 'actionid',
		'type' : 'id',
		'map'  : 'mcConfigId'
	}];
	var columns = [ {
		'text' : 'Region',
		'datafield' : 'regionId',
		cellsalign : 'center',
		align:'center',
		'width' : '12%',
		sortable : true,
		editable : false
	}, {
		'text' : 'Segment',
		'datafield' : 'Segment', 
		'width' : '11.5%',
		cellsalign : 'center',
		align:'center',
		sortable : true,
		editable : false
	},{
		'text' : '  Skin Purity',
		'datafield' : 'skinPurity',
		'width' : '15%',
		cellsalign : 'right',
		align:'center',
		cellsformat : 'd2',
		sortable : true,
		editable : false
	},{
		'text' : ' Mup Category',
		'datafield' : 'mupType',
		'width' : '58.5%',
		cellsalign : 'left',
		align:'center',
		sortable : true,
		editable : false
	},{
		'text' : '',
		'datafield' : 'actionid',
		align:'center',
		cellsrenderer : editFg,
		'width' : '3%',
		filterable: false,
		cellsalign : 'center',	
		sortable : false,
		editable : false,
	}];
	showMyGrid(datafields, "/OrderExecution/api/v1/mupCateGoryList?page=search", "list",columns,metalMAPPriceFieldFilter() ,updateRows);
	$("#jqxgrid").jqxGrid({	   
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}

//Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
$.getJSON('/OrderExecution/api/v1/getMupSkinPurityLov?metalId='+0, function(data) {
				$('#skinPurityS').empty().append(
				'<option value="" selected>--Select--</option>');
			$.each(data.payload.METAL_SEGMENT_LOV, function(key, val) {
				$('#skinPurityS').append(
						'<option value="' + val.skinPurity + '"  ids="'+ val.id +'">' + val.skinPurity
								+ '</option>');
			});
		});

	 $("form").each(function(){
		 $(this).validate();
	      $(this).validate().resetForm();
    });
});

$("#ClearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	 $("form").each(function(){
		 $(this).validate();
	      $(this).validate().resetForm();
    });
});

//Search Validation
$('#mupForm').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	 "segmentS":{required: true }
    },
    submitHandler: function (form) { 
    	mupCategorygird();
    	$('#jqxgrid').show();
        return false;
    }
});

//create validations
$('#mupCategoryCreation').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	 "mupCategoryC": {
    		 	required: true, 
    		 	regx: /^[A-Z]+$/, 
    		 	maxlength : 4
    	 },
    	 "mupCategoryDes":{required: true, regx: /^[a-zA-Z\s]+$/ },
    	 "regionCreate":{required: true },
    	 "metalSegment":{required: true },
    	 "baseMetalRate":{required: true },
    	 "skinPurity":{required: true },
    	 "metalCostForPurity":{required: true },
    	 "metalRate":{required: true },
    	 "sellingRate":{required: true },
    	 "mcApprotion":{required: true },
    	 "wasteageApp":{required: true }
       },
       messages: {
      	 "mupCategoryC":{
      		 regx : "Only capital letters allowed!",
      		 maxlength : "Character should be maximum of 4 digit!"
      	 },
      	 "mupCategoryDes":{
      		 regx : "Only character with space!"
      	 }
      },
       submitHandler: function (form) { 
    	   trimmer();
    	   var createMupCat =  mcApportionCalculate();
    	   if (createMupCat == false)
    		   {
    		   return false;
    		   }
    	   
    	   var dataMupCate = createSave();
    	postJSON('/OrderExecution/api/v1/createMupCategory',JSON.stringify(dataMupCate),function(data) {
    		onLoadLov();
    	if ( data.resCode == 1) { 
			$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
			mupCategorygird();
			 $('#createMupCategory').modal('hide');
    	  }
    	
    		if (data.resCode == -1) { 
			       $.growl.error({
						message : data.mesgStr,
						duration : 10000,
					});
			       $('#createMupCategory').modal('hide');
    		}
    		else if(data.resCode == 2)
			{
    			console.log()
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
				});
				$('#createMupCategory').modal('hide');
			}
    		else if(data.resCode == 3){
	    			$.growl.error({
	    				message : data.mesgStr,
	    				duration : 10000,
	    				
	    			});
	    			$('#mupCategoryCreation')[0].reset();
    			}    	
    	   });
        return false;
     }      
});

//edit validatations
$('#mupCategoryEdit').validate({
    errorElement: 'label', 
    errorClass: 'help-inline', 
    focusInvalid: false, 
    ignore: "",
    rules: {
    	 "mupCategoryDesEdit":{required: true },
    	 "regionEdit":{required: true },
    	 "baseMetalRateEdit":{required: true },
    	 "metalCostForPurityEdit":{required: true },
    	 "metalRateEdit":{required: true },
    	 "sellingRateEdit":{required: true },
    	 "mcApprotionEdit":{required: true },
    	 "wasteageAppEdit":{required: true }
    },
    submitHandler: function (form) {
    	trimmer();
    	var  editMupCate = mcApportionCalculateE();
    	 if(editMupCate == false)
    		 {
    		 return false;
    		 }
    	
    	updateEdit();
    	var editlist = updateEdit()
    	postJSON('/OrderExecution/api/v1/upDateMupCategory', JSON
    			.stringify(editlist), function(data) {
    				if (data.resCode == "1") {										
    					$.growl
    							.notice({
    								message : data.mesgStr,
    								duration : 10000,
    								title : 'Success'
    							});
    					} 
    				else {
    					$.growl
    							.error({
    								message : data.mesgStr,
    								duration : 10000
    							}); 

    				}
    				$('#editMupCategory').modal('hide');
    	    });
           return false;
         }
});
$("#export").on('click', function(){
	var newData = [];
	 var sysdate = moment().format('DDMMYYYYHHmmSS');
	var rows = $('#jqxgrid').jqxGrid('getrows');
	if (  rows == undefined || rows == 0 ) {
		$.growl
		.error({
			message : "No Data To Export",
			duration : 10000
		});
		return false;
	}else{
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		if(rows.rowscount != 0){
	postJSON('/OrderExecution/api/v1/mupCateGoryList?page=export',JSON.stringify(metalMAPPriceFieldFilter()),function(data){
		var mupCateList = data.payload.list;
		if(data!=null){
		for (i = 0; i < mupCateList.length; i++) {				
			newData.push({
				'MUP Category Code' : mupCateList[i].mupType.code,
				'MUP Category Description' : mupCateList[i].mupType.description,
				'Region' : mupCateList[i].region.name,
				'Metal Segment Name' : mupCateList[i].metalSegment.description,
				'Base Metal Rate' : mupCateList[i].baseMetalRate,
				'Skin Purity' : mupCateList[i].skinPurity,
				'Metal Cost Rate For Purity' : mupCateList[i].metalRateForPurity,
			    'Metal Rate Mark UP' : mupCateList[i].metalrateMarkup,
			    'Selling Rate For Purity' : mupCateList[i].metalSaleingPrice,
				'Mc Apporotion %' : mupCateList[i].mcApportionPercentage,
				'Wasteage Apportion %' : mupCateList[i].wastageApportionPercentage,
			  })
		    }
		  var opts = [{sheetid:'Mup_Category',header:true}];
          var res = alasql('SELECT * INTO XLSX("Mup Category'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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
//######################## regex validations ############################ 
$.validator.addMethod(
        "regx",
        function(value, element, regexp) {
            if (regexp.constructor != RegExp)
                regexp = new RegExp(regexp);
            else if (regexp.global)
                regexp.lastIndex = 0;
            return this.optional(element) || regexp.test(value);
        },
        ""
    );
$('.modal').on('hidden.bs.modal', function () {
	 $("form").each(function(){
		 $(this).validate();
	      $(this).validate().resetForm();
	 });
	
});