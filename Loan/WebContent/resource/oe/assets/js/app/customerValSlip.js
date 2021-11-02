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

var matType = [];
var purposeType =[];
var onLoadLov = function(){
	$.getJSON('/OrderExecution/api/v1/customerValuationSlipLOV', function(data) {
		matType = data.payload.materialTypes;
		purposeType = data.payload.purposes;
		
		$("#valSlipNoS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.valuationSlipNos, function(key, val) {
			$("#valSlipNoS").append('<option value="' + val + '">' + val + '</option>');
		});	
			
		$("#storeCodeS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.storeNames, function(key, val) {
			$("#storeCodeS").append('<option value="' + val.id + '">' + val.name + '</option>');
		});
			
		$("#segmentS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.segments, function(key, val) {
			$("#segmentS").append('<option value="' + val.id + '">' + val.description + '</option>');
		});	
			
		$("#locationS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.locationCodes, function(key, val) {
			$("#locationS").append('<option value="' + val + '">' + val + '</option>');
		});	
			
		$("#matTypeS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.materialTypes, function(key, val) {
			$("#matTypeS").append('<option value="' + val + '">' + val + '</option>');
		});
			
		$("#purposeS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.purposes, function(key, val) {
			$("#purposeS").append('<option value="' + val + '">' + val + '</option>');
		});	
			
		$("#refDocS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.refDocNos, function(key, val) {
			$("#refDocS").append('<option value="' + val + '">' + val + '</option>');
		});	
			
		$("#refDocSlS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.refDocSrlNos, function(key, val) {
			$("#refDocSlS").append('<option value="' + val + '">' + val + '</option>');
		});
			
		$("#statusS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.status, function(key, val) {
			$("#statusS").append('<option value="' + val + '">' + val + '</option>');
		});	
		
	});
}
onLoadLov();

$("#gridTabs").hide();
function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};


$(".tabDisabledS").addClass("tabDisabled2");
$("#gridTabs").tabs({
	disabled:[]
});

	
//Field Filters
var custValSlipFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var valSlipNoS = $("#valSlipNoS").val();
	var storeCodeS = $('#storeCodeS').val();
	var segmentS = $('#segmentS').val();
	var locationS = $('#locationS').val();
	var matTypeS = $('#matTypeS').val();
	var purposeS = $('#purposeS').val();
	var refDocS = $('#refDocS').val();
	var refDocSlS =$("#refDocSlS").val();
	var statusS =$("#statusS").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if(fromDateS != "" && fromDateS != null){
		fieldFilters.fieldFilters["fromDate"] = fromDateS
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (valSlipNoS != "" && valSlipNoS != null) {
		fieldFilters.fieldFilters["valuationSlipNo"] = valSlipNoS;
	}
	if (storeCodeS != "" && storeCodeS != null) {
		fieldFilters.fieldFilters["storeCode"] = storeCodeS;
	}
	if (segmentS != "" && segmentS != null) {
		fieldFilters.fieldFilters["metalSegment"] = segmentS;
	}
	if (locationS != "" && locationS != null) {
		fieldFilters.fieldFilters["location"] = locationS;
	}
	if (matTypeS != "" && matTypeS != null) {
		fieldFilters.fieldFilters["materialType"] = matTypeS;
	}
	if (purposeS != "" && purposeS != null) {
		fieldFilters.fieldFilters["purpose"] = purposeS;
	}
	if (refDocS != "" && refDocS != null) {
		fieldFilters.fieldFilters["refDocNo"] = refDocS;
	}
	if (refDocSlS != "" && refDocSlS != null) {
		fieldFilters.fieldFilters["refDocSrlNo"] = refDocSlS;
	}
	if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["status"] = statusS;
	}
//	fieldFilters.fieldFilters["mode"] = "search";
	
	return fieldFilters;
}

function custValSlipSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ 
		{'name' : 'date','type' : 'date','map' : 'createdDate'},
		{'name' : 'valSlipNo','type' : 'int','map' : 'valuationSlipNo'}, 
		{'name' : 'slNo','type' : 'int','map' : 'srlNo'},
		{'name' : 'storeCode','type' : 'string','map' : 'storeName'},
		{'name' : 'matType','type' : 'string','map' : 'materialType'},
		{'name' : 'purpose','type' : 'string','map' : 'purpose'},
		{'name' : 'location','type' : 'string','map' : 'locationCode'},
		{'name' : 'segment','type' : 'string','map' : 'metalSegment'},
		{'name' : 'jewelType','type' : 'string','map':'jewelType'}, 

		{'name' : 'pcs','type' : 'int','map' : 'pcs'}, 
		{'name' : 'compNonComp','type' : 'string','map' : 'companyOrnot'},
		{'name' : 'refDoc','type' : 'long','map' : 'refDocNo'},
		{'name' : 'refDocSl','type' : 'int','map' : 'refDocSrlNo'},
		{'name' : 'preProWt','type' : 'float','map' : 'preProWt'},
		{'name' : 'postProGwt','type' : 'float','map' : 'postProGrWt'}, 
		{'name' : 'postProNwt','type' : 'float','map' : 'postProNetWt'}, 
		{'name' : 'expPurityPerc','type' : 'float','map' : 'expPurityPerc'},
		{'name' : 'expPureWt','type' : 'float','map' : 'expPureWt'},
        {'name' : 'addOrDeduct','type' : 'string','map' : 'addDeductFlag'},
        {'name' : 'addOrDeductPerc','type' : 'float','map' : 'addDeductPerc'},
        {'name' : 'addOrDeductWt','type' : 'float','map' : 'addDeductWt'},
        {'name' : 'estPureWt','type' : 'float','map' : 'addDeductPureWt'},
        {'name' : 'creditWt','type' : 'float','map' : 'creditWt'}, 
        {'name' : 'custPurcRate','type' : 'float','map' : 'customerPurchaseRate'},
        {'name' : 'valInRs','type' : 'float','map' : 'valueInRs'},
        
        {'name' : 'manualInputVal','type' : 'float','map' : 'valueManualInput'},
        {'name' : 'ec','type' : 'float','map' : 'ecRate'},
        {'name' : 'rc','type' : 'float','map':'rcRate'},
        {'name' : 'status','type' : 'string','map':'status'},
        {'name' : 'valuedBy','type' : 'string','map':'seName'},
        
        {'name' : 'seName','type' : 'string','map' : 'seName'},
        {'name' : 'toRefDocNo','type' : 'int','map' : 'toREfDocNo'},
        {'name' : 'toRefDocSlNo','type' : 'int','map':'toREfDocSrlNo'},
      
        ];

	var columns = [
		{'text' : '','datafield' : '',cellsalign : 'center',columntype : 'checkbox',align : 'center','width' : '4%',sortable : false},

		{'text' : 'Date','datafield' : 'date','width' : '5%',editable : false,cellsalign : 'center',align : 'center',sortable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Valuation Slip No','datafield' : 'valSlipNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : true},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Store Code','datafield' : 'storeCode','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Material Type','datafield' : 'matType','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			 cellsrenderer: function(row, column, value){
			 var mType;
			 if(value == "F"){
				 mType = "Finished Goods";
			 }
			 if(value == "R"){
				 mType = "Finished Goods";
			 }
			 if(value == "S"){
				 mType = "Stones";
			 }
			 if(value == "A"){
				 mType = "Accessory";
			 }
		      return "<div align='center'style='margin-top:8px;'>"+mType+"</div>";
		   }  
		},
		{'text' : 'Segment','datafield' : 'segment','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		{'text' : 'Purpose','datafield' : 'purpose','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			 cellsrenderer: function(row, column, value){
				 var purpose;
				 if(value == "D"){
					 purpose = "DPC";
				 }
				 if(value == "DS"){
					 purpose = "DPS";
				 }
				 if(value == "E"){
					 purpose = "Exchange";
				 }
				 if(value == "O"){
					 purpose = "For Order";
				 }
				 if(value == "EM"){
					 purpose = "Excess Metal Purchase";
				 }
				
			      return "<div align='center'style='margin-top:8px;'>"+purpose+"</div>";
			   }  
		},
		{'text' : 'Loc','datafield' : 'location','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		{'text' : 'Jewel Type','datafield' : 'jewelType','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Company/Non Company','datafield' : 'compNonComp','width' : '9%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			 cellsrenderer: function(row, column, value){
				 var cnType;
				 if(value == "NONE"){
					 cnType = "Non-Company";
				 }
				 else{
					 cnType = "Company";
				 }
				
			      return "<div align='center'style='margin-top:8px;'>"+cnType+"</div>";
			   }  
		},
		{'text' : 'Ref Doc No','datafield' : 'refDoc','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'} ,
		{'text' : 'Ref Doc Sl No','datafield' : 'refDocSl','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Pre Pro Wt','datafield' : 'preProWt','width' : '5%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Post Pro Gross Wt','datafield' : 'postProGwt','width' : '5%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Post Pro Net Wt','datafield' : 'postProNwt','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Expected Purity %','datafield' : 'expPurityPerc','width' : '5%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center'},
		{'text' : 'Expected Pure Wt','datafield' : 'expPureWt','width' : '4.5%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Add/Deduct','datafield' : 'addOrDeduct','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Add/Deduct %','datafield' : 'addOrDeductPerc','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'Add/Deduct Wt','datafield' : 'addOrDeductWt','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Est Pure Wt','datafield' : 'estPureWt','width' : '4%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Credit Wt','datafield' : 'creditWt','width' : '5%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Customer Purchase Rate','datafield' : 'custPurcRate','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'Value in Rs','datafield' : 'valInRs','width' : '5%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat : 'd2'},
		{'text' : 'Value Manual Input','datafield' : 'manualInputVal','width' : '6%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat : 'd2'},
		{'text' : 'EC','datafield' : 'ec','width' : '5%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat : 'd2'},
		{'text' : 'RC','datafield' : 'rc','width' : '5%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat : 'd2'},
		{'text' : 'Status','datafield' : 'status','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,
			 cellsrenderer: function(row, column, value){
				 var status;
				 if(value == "C"){
					 status = "Confirmed";
				 }
				 else{
					 status = "Cancelled";
				 }
				
			      return "<div align='center'style='margin-top:8px;'>"+status+"</div>";
			   }
		},
		{'text' : 'Valuated By','datafield' : 'valuedBy','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		
		{'text' : 'SE Name','datafield' : 'seName','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'To Ref Doc No','datafield' : 'toRefDocNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'To Ref Doc Sl No','datafield' : 'toRefDocSlNo','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/customerValuationSlipDetails?portal=oe","list", columns,custValSlipFieldFilters(), updateRows, "");
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


var dataArr = [];
$("#jqxgrid").bind('cellendedit', function (event,index) {
	var i =event.args.rowindex;
	    if (event.args.value) {
	      $("#jqxgrid").jqxGrid('selectrow', event.args.row);
	        dataArr.push(i);
	       $(".tabDisabledS").removeClass("tabDisabled2");
	   	    }
	    else {
	        $("#jqxgrid").jqxGrid('unselectrow', event.args.row);
	        var delArr = dataArr.splice(i,1);
	    }
	    if($("#jqxgrid").jqxGrid("getselectedrowindexes") <= 0)
		{
	    	$(".tabDisabledS").addClass("tabDisabled2");
		}
	    $.each(dataArr, function(key, val) {
	    		var data =$("#jqxgrid").jqxGrid('getrowdata',val);
	    });
	});

function selectedCheckBox(){
	var dataArr1 = [];
	var valSlipData =  $("#jqxgrid").jqxGrid("getselectedrowindexes");
		$.each(valSlipData, function(key, val) {
			dataArr1.push(val.valSlipNo);
		});
	return dataArr1;
}

$("#stoneDetails").click(function () {
	var valSlipNoArray
	var valSlipNoArray = selectedCheckBox();

	var valSlipNoArray = valSlipNoArray.join(",");
	var params = {"fieldFilters":{"valuationSlip":valSlipNoArray}}
	
	postJSON('/OrderExecution/api/v1/customerValuationSlipStoneDetails',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.list;
			stoneGrid(data);
			$('#jqxgridStone').show();
		}else{
			stoneGrid();
			$('#jqxgridStone').show();
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});

var stoneGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
		 	{'name' : 'stoneSrlNo','type' : 'int','map':'stoneSrlNo'},
	        {'name' : 'linkedSlNo','type' : 'int','map':'stoneLinkedToSrlNo'},
	        {'name' : 'stSeg','type' : 'string','map' : 'stoneSegment'},
	        {'name' : 'stMainCat','type' : 'string','map' : 'stoneMainCat'},
	        {'name' : 'stSubCat','type' : 'string','map' : 'stoneSubCat'},
	        {'name' : 'stArtCode','type' : 'string','map' : 'stoneCode'},
	        {'name' : 'stWtRange','type' : 'string','map' : 'wtRange'}, 
	        {'name' : 'stCalrity','type' : 'string','map' : 'clarity'},
	        {'name' : 'stActCol','type' : 'string','map' : 'actualColor'},
	        {'name' : 'stCol','type' : 'string','map' : 'stoneColor'},
	        {'name' : 'stCutGrade','type' : 'string','map' : 'cutGrade'},
	        {'name' : 'stPcs','type' : 'int','map':'stonePcs'},
	        {'name' : 'stWt','type' : 'float','map':'stoneWeight'},
	        {'name' : 'uqc','type' : 'string','map':'stoneUqm'},
	        {'name' : 'stRate','type' : 'float','map':'stoneRate'},
	        {'name' : 'stPrice','type' : 'float','map':'stonePrice'},
	        {'name':'valuationSlipNo','type':'long'}
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStone").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
 	    statusbarheight: 30,
		columns : [
			{'text' : 'Valuation Slip No','datafield' : 'valuationSlipNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'} ,
			{'text' : 'Stone Sl No','datafield' : 'stoneSrlNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'} ,
			{'text' : 'Linked to Sl No','datafield' : 'linkedSlNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stone Segment','datafield' : 'stSeg','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stone Main Cat','datafield' : 'stMainCat','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stone Sub Cat','datafield' : 'stSubCat','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stone Article Code','datafield' : 'stArtCode','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Wt Range','datafield' : 'stWtRange','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Clarity','datafield' : 'stCalrity','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Actual Color','datafield' : 'stActCol','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Color','datafield' : 'stCol','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Cut Grade','datafield' : 'stCutGrade','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stone Pcs','datafield' : 'stPcs','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stone Wt','datafield' : 'stWt','width' : '5%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat : 'd3'},
			{'text' : 'Stone UQC','datafield' : 'uqc','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false,
			},
			{'text' : 'Stone Rate','datafield' : 'stRate','width' : '7%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat : 'd2',
				/*cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
		 			var stPrice =  $('#jqxgridStone').jqxGrid('getcellvalue', row, 'stPrice');
		 			var stWt =  $('#jqxgridStone').jqxGrid('getcellvalue', row, 'stWt');
		 			console.log(stPrice);
		 			var rate = 0.00;
		 			if(stPrice != null && stWt != null){
		 				rate = stPrice/stWt;
		 			}
	    			return '<div style="text-align:center; margin: 0; padding-top:6px; height:40px;">' + rate.toFixed(2) + '</div>';
		 		}*/
			},
			{'text' : 'Stone Price','datafield' : 'stPrice','width' : '7%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat : 'd2'},
		]
	});
}



$("#accDetails").click(function () {
	var valSlipNoArray;
	var valSlipNoArray= selectedCheckBox();
	var valSlipNoArray = valSlipNoArray.join(",");
	var params = {"fieldFilters":{"valuationSlip":valSlipNoArray}}
	postJSON('/OrderExecution/api/v1/customerValuationSlipAccDetails',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.list;
			accGrid(data);
			$('#jqxgridAcc').show();
		}else{
			accGrid();
			$('#jqxgridAcc').show();
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});


var accGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
	        {'name' : 'accSrlNo','type' : 'int','map':'accSrlNo'},
	        {'name' : 'acclinkedSlNo','type' : 'int','map':'accLinkedToSrlNo'},
	        {'name' : 'accMainCat','type' : 'string','map' : 'accMaincat'},
	        {'name' : 'accSubCat','type' : 'string','map' : 'accSubCat'},
	        {'name' : 'accArtCode','type' : 'string','map' : 'accCode'},
	        {'name' : 'accPcs','type' : 'int','map':'accPcs'},
	        {'name' : 'accWt','type' : 'float','map':'accWt'},
	        {'name' : 'accUqc','type' : 'string','map':'accUqc'},
	        {'name' : 'accRate','type' : 'float','map':'accRate'},
	        {'name' : 'accPrice','type' : 'float','map':''},
	        {'name' : 'valuationSlipNo','type' : 'long','map':''},
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
 	    statusbarheight: 30,
		columns : [
			{'text' : 'Valuation Slip No','datafield' : 'valuationSlipNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'} ,
			{'text' : 'Acc Sl No','datafield' : 'accSrlNo','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			{'text' : 'Linked to Sl No','datafield' : 'acclinkedSlNo','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			{'text' : 'Acc Main Cat','datafield' : 'accMainCat','width' : '10%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Acc Sub Cat','datafield' : 'accSubCat','width' : '16%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
			{'text' : 'Acc Code','datafield' : 'accArtCode','width' : '12%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Pcs','datafield' : 'accPcs','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Acc Weight','datafield' : 'accWt','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
			{'text' : 'Acc UQC','datafield' : 'accUqc','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			{'text' : 'Acc Rate','datafield' : 'accRate','width' : '10%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat : 'd2'},
			{'text' : 'Acc Price','datafield' : 'accPrice','width' : '10%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat : 'd2',
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
		 			var accRate =  $('#jqxgridAcc').jqxGrid('getcellvalue', row, 'accRate');
		 			var accPcs =  $('#jqxgridAcc').jqxGrid('getcellvalue', row, 'accPcs');
		 			var price = 0.00;
		 			price = accRate * accPcs;
	    			return '<div style="text-align:center; margin: 0; padding-top:6px; height:40px;">' + price.toFixed(2) + '</div>';
		 		}
			}
		]
	});
}

$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == "" ){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	activaTab('tab0default');
	$("#gridTabs").show();
	custValSlipSearchGrid();
	$("#jqxgrid").show();
});

//Export Functionality
$("#export").on("click",function() {	
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var valSlipNoS = $("#valSlipNoS").val();
	var storeCodeS = $('#storeCodeS').val();
	var segmentS = $('#segmentS').val();
	var locationS = $('#locationS').val();
	var matTypeS = $('#matTypeS').val();
	var purposeS = $('#purposeS').val();
	var refDocS = $('#refDocS').val();
	var refDocSlS =$("#refDocSlS").val();
	var statusS =$("#statusS").val();
	
	 var rows = $("#jqxgrid").jqxGrid('getrows');
	 if(typeof rows == "undefined"){
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
		}
	 else{
		 $('#loading').show();
		fieldFilters = {
				"fieldFilters":{
					"FromDate":fromDateS,
					"ToDate":toDateS,
					"VslipNo":valSlipNoS,
					"storeId":storeCodeS,
					"SegmentId":segmentS,
					"locationCode":locationS,
					"MaterialType":matTypeS,
					"Purpose":purposeS,
					"RefDocNo":refDocS,
					"RefDocSrlNo":refDocSlS,
					"Status":statusS,
					"mode" : "excel",
					"reportName" : "RPT_Customer_Valuation_Slip_FG_Report_Export"
					}
			}
		$.ajax({
			url : 'jasperReport',
			type : 'post',
			data : fieldFilters,
			contentType : "application/x-www-form-urlencoded",
			xhrFields : {
				responseType : "blob"
			},
			success : function(data) {
				console.log(data);
				$('#loading').hide();
				if (navigator.msSaveBlob) {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					navigator.msSaveBlob(file,'Customer_ValuationSlip.xlsx');
				}else {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					var fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				}
			}
		});
	 }
});


$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('customerValSlip', 'bodySwitcher')"
});