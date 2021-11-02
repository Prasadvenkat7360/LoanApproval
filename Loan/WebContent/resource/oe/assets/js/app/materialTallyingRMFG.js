/*
Author(UI) : pooja Sangve
Date of Creation : 27/07/2017 
*/

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

$("#looseStonesTallyS").hide();
$("#metalTallyS").show();
$('input:radio[name=tallyRmFg]').filter('[value="metalTally"]').attr('checked', true);
$('input[name=tallyRmFg]:radio').on('click', function() {
	var selectedVal = $(this).val();
	if(selectedVal=="metalTally"){
		$("#looseStonesTallyS").hide();
		$("#metalTallyS").show();
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	}else{
		$("#looseStonesTallyS").show();
		$("#metalTallyS").hide();
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	}
});

//DATE PICKER FOR METAL TALLY
/*$("#dateFormC").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate  : 0
});*/

var d = new Date();
var cDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();	
 
$("#dateFormS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#dateToS").datepicker('option', 'minDate', min || '0');
    }
});

$("#dateToS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
});



//############################################### LOV for RM/FG , SEGMENT type AND Location type ##########################################

$('#rmFgS').empty().append('<option value="" selected>--Select--</option>');
$('#rmFgC').empty().append('<option value="" selected>--Select--</option>');

$('#segmentS').empty().append('<option value="" selected>--Select--</option>');
$('#segmentC').empty().append('<option value="" selected>--Select--</option>');


var tallyDataBy;
var dcNameForCreation;
var tallyDateCreate;
var rlist = [];
$.getJSON('/OrderExecution/api/v1/metalReconciliationLOVs',function(data) {
	 rlist.push(data.payload.LocationTypes[0]);
	$.each(rlist, function(key, val) {
		$('#rmFgS').append('<option value="' + val.id + '">' + val.name + '</option>');
		$('#rmFgC').append('<option value="' + val.id + '">' + val.name + '</option>');
	});

	var slist = data.payload.segments;
	$.each(slist, function(key, val) {
		$('#segmentS').append('<option value="' + val.id + '">' + val.name + '</option>');
		$('#segmentC').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	 tallyDataBy = data.payload.createdBy;
	 dcNameForCreation = data.payload.serverDate;
	 tallyDateCreate = data.payload.dc.name;
});


var locationchange = function(){
	$('#locationS').empty().append('<option value="" selected>--Select--</option>');
	var fieldFilters = {		
		fieldFilters: {
		  "metalSegId":$("#segmentS").val(),
		  "materialType":$("#rmFgS").val()
		}
	}
if(fieldFilters.metalSegId != "" && fieldFilters.materialType  != "" ){
	 postJSON('/OrderExecution/api/v1/getLocForSearch ',JSON.stringify(fieldFilters),function(data) {
		$.each(data.payload.locations, function(key, val) {
			$('#locationS').append('<option value="' + val.name + '" idSearch="'+val.id+'">' + val.name + '</option>');
		});
	 });
 }
}

$("#locHideC").hide();
$("#locLabelId").hide();
var onLoadLocationForCreate = function() {
	$("#locHideC").hide();
   $('#locationC').empty().append('<option value="" selected> </option>');
	var acountDate= $("#dateFormC").val();
	//var mtalSegment =$("#segmentC").val();
	var type= $("#rmFgC").val()
	if(acountDate == "" || acountDate == null ){
		$.growl.error({
				message : "Please fill Date feild!!",
				duration : 10000
			});
		return null;
	}
	
var fieldFilters={
	"fieldFilters": {
	   "accountDate": $("#dateFormC").val(),
	    "metalSegment": $("#segmentC").val(),
	    "locationType": $("#rmFgC").val()
	  }
	}
	
	if($("#rmFgC").val() != "" && $("#segmentC").val() != ""){
		postJSON('/OrderExecution/api/v1/getLocsForCreate',JSON.stringify(fieldFilters),function(data) {
			if (data.resCode == "2"){
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
				$("#locHideC").hide();
				$("#locLabelId").hide();
			   }else{
				   $('#locationC').empty().append('<option value="" selected> </option>');
					var slist = data.payload.metAccLocs;
					var c = '<select id="locationObj" name="locationObj" class="form-control" multiple="multiple">';
						$.each(slist, function(key, val) {
						c += '<option value="' + val.id + '" >' + val.name +'</option>'; });
						c += '</select>';
						$("#locationC").html(c);
						$('#locationObj').multiselect({
						includeSelectAllOption : true,
						maxHeight : 250,
						enableFiltering : true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						});
						$("#locHideC").show();
						$("#locLabelId").show();
			        }
				});
	}
//(fieldFilters.accountDate != "" && fieldFilters.metalSegment  != "" && fieldFilters.locationType  != ""){
	
	 //}
  }


//####################################################### Field Filters for Metal Tallying #################################################

var MetalFieldFilters = function() {
	var dateFormS = $('#dateFormS').val();
	var dateToS = $("#dateToS").val();
	var segmentS = $('#segmentS').val();
	var rmFgS = $("#rmFgS").val();
	var locationS = $('#locationS').val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};

		if (dateFormS != "" && dateFormS != null) {
		fieldFilters.fieldFilters["fromDate"] = dateFormS;
		}
		if (dateToS != "" && dateToS != null) {
		fieldFilters.fieldFilters["toDate"] = dateToS;
		}
		if (segmentS != "" && segmentS != null) {
		fieldFilters.fieldFilters["metalSegId"] = segmentS;
		}
		if (rmFgS != "" && rmFgS != null) {
		fieldFilters.fieldFilters["materialType"] = rmFgS;
		}
		if (locationS != "" && locationS != null) {
		fieldFilters.fieldFilters["locCode"] = locationS;
		}
			
		return fieldFilters;
	}


//############################################ Search Grid for Metal Tally #############################################
var searchMetalTallyGrid = function() {
	var updateRows = function(row, newdata, commit) {
	}

	var datafields = [ 
		 { name: 'accuntDate', type: 'string', map:'accountDate' },
         { name: 'locCode', type: 'string',map:'location>id' },
         { name: 'locationName', type: 'string',map:'location>name'},
         { name: 'inputWeight', type: 'float' },
         { name: 'systemWeight', type: 'float' },
         { name: 'DiffInWts', type: 'float' },
         { name: 'tally', type: 'string',map:'createdBy>name' },
         { name: 'remarks', type: 'string'},
         { name: 'rmFg', type: 'string',map:'locationType>name' }];

	var columns = [ {'text' : 'Date','datafield' : 'accuntDate','width' : '13%',cellsalign : 'center',align : 'center',editable : false,sortable: true,cellsformat : 'dd/MM/yyyy',}, 
		{'text' : 'Location Code','datafield' : 'locCode','width' : '13%',cellsalign : 'center',align : 'center',editable : false,sortable: true, },
		{'text' : 'Location Name','datafield' : 'locationName',	'width' : '13%',cellsalign : 'center',align : 'center',editable : false}, 
		{'text' : 'Physical Weight','datafield' : 'inputWeight','width' : '13%',cellsalign : 'right',cellsformat:'d3',sortable: false, align : 'center',editable : false},
		{'text' : 'Location Weight','datafield' : 'systemWeight','width' : '13%',cellsalign : 'right',cellsformat:'d3',sortable: false, align : 'center',editable : false},
		{'text' : 'Diff.Wt','datafield' : 'DiffInWts','width' : '13%',cellsalign : 'right',cellsformat:'d3',sortable: false, align : 'center',editable : false},
		{'text' : 'Tallied By','datafield' : 'tally','width' : '13%',cellsalign : 'center',	align : 'center',sortable: false, editable : false},
		{'text' : 'RM/FG','datafield' : 'rmFg','width' : '13%',	cellsalign : 'center',align : 'center',sortable: false, editable : false},
		{'text' : 'Remarks','datafield' : 'remarks','width' : '9%',cellsalign : 'left',align : 'center',	sortable: false, editable : false}
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/metalReconcileSearch", "MetRecList",columns,MetalFieldFilters(), updateRows, "");

	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true , 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true
	});
}

$("#segmentC").on('change',function(){
	$('#rmFgC').empty().append('<option value="" selected>--Select--</option>');
	 $('#locationC').empty().append('<option value="" selected> </option>');
	$.each(rlist, function(key, val) {
		$('#rmFgC').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	
	var locCode = '<select id="locationObj" class="form-control" multiple="multiple"></select>';
	$("#locationC").html(locCode);
	$('#locationObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
});

//####################################################### Metal TAllying Add Grid ######################################
var addMetalTallyGrid = function(data) {
	var source = {
		datafields : [ 			 
			{name : 'id', type : 'int'},
			{name : 'locationCode', type : 'string'}, 
			{name : 'locationId', type : 'string'}, 
			{name : 'physicalWt', type : 'float'},
			{name : 'systemWt', type : 'float'},
			{name : 'diffWt', type : 'float'},
			{name : 'acctDate', type : 'string'},
			{name : 'locType', type : 'string'},
			{name : 'locTypeId', type : 'string'},
			{name : 'segId', type : 'string'},
			{name : 'segCode', type : 'string'},
			{name : 'remarks', type : 'string'},
		],
			
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},

	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrideMetalC").jqxGrid({
		source : dataAdapter,			
		width : '100%',
		editable : true,
		height : 200,
		theme: 'energyblue',
		columnsheight : 30,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {	},
		columns : [ 
			{ text : 'Location Code', datafield : 'locationCode', width : '20%', cellsalign : 'center', align : 'center', editable : false, sortable : false,cellsformat : 'dd/MM/yyyy'},
			{ text : 'Input Physical Wt',
				datafield : 'physicalWt',
				width : '20%',
				cellsalign : 'right',
				align : 'center',
				cellsformat : 'd3',
				columntype: 'float',
				editable : true,
				sortable : false,
				 cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
	          		 var rows = $("#jqxgrideMetalC").jqxGrid('getrows');
							var	DifferenceWt = newvalue - rows[row].systemWt
							 $("#jqxgrideMetalC").jqxGrid("setcellvalue" , row, 'diffWt', DifferenceWt);
				      }
			},
			{ text : 'System Wt', datafield : 'systemWt', width : '20%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Difference Wt', datafield : 'diffWt', width : '20%', cellsalign : 'right', align : 'center', editable : false, sortable : false,cellsformat : 'd3'},
			{ text : 'Remarks', datafield : 'remarks', width : '20%', cellsalign : 'left', align : 'center', editable : true, sortable : false},
			{ text : 'locType', datafield : 'locType',hidden : true},
			{ text : 'locType', datafield : 'locTypeId',hidden : true},
			{ text : 'locType', datafield : 'locationId',hidden : true},
			{ text : 'Seg Id', datafield : 'segId',hidden : true},
			{ text : 'Seg Id', datafield : 'segCode',hidden : true},
		]
	});
}

$("#addRowC").on("click",function(){
	var rows = $('#jqxgrideMetalC').jqxGrid('getrows');
	var chekUniqArr = [];
	
	var dateFormC=$("#dateFormC").val();
	var segmentC=$("#segmentC").val();
	var rmFgC = $("#rmFgC").val();
	
	if(dateFormC == "" ||segmentC	== "" || dateFormC == null || segmentC	== null 
			|| rmFgC == ""  || rmFgC == null){
		$.growl.error({
				message : "Please fill all  mandatory fields!!",
				duration : 10000
			});
		return null;
	}
	
      for (var i = 0; i < rows.length; i++) {
		
		var row = rows[i];
		if(chekUniqArr.indexOf(row.locationCode) == -1){
			chekUniqArr.push(row.locationCode);
		}else{
			$.growl.error({
				message : "Please enter unique Location Code.",
				duration : 10000
			});
			return false;
		}
      }
    var locationObj = $('#locationObj').val();
    if (locationObj == null || locationObj == "") {
  		var locationC = "";
  	} else {
  		var locationC = locationObj.join(",");
  	}
	if(locationObj == "" || locationObj == null){
		$.growl.error({
			message : "Please  Select Location Code.",
			duration : 10000
		});
		return false;
	}
	
	var metalLoc=$("#locationObj").val();
	fieldFilters={"fieldFilters": {"metAccLocDetId":metalLoc.toString()}}
	 postJSON('/OrderExecution/api/v1/getDataForMetRecCreate',JSON.stringify(fieldFilters), function(data) {
		 var fetchedrows = $("#jqxgrideMetalC").jqxGrid('getrows');
		 var response = data.payload.MetalRecDet;
		 if(fetchedrows.length > 0){
			 $.each(response,function(key,val){
				 var flag = false;
				 $.each(fetchedrows,function(k,v){
					 if(v.locationCode == val.location.name){
						 flag = true;
					 }
				 });
					 if(flag == false){
					  var obj ={ 
							 "id":val.id,
							 "systemWt":val.systemWeight,
							 "acctDate":val.accountDate,
							 "metalSeg" : val.metalSegment,					 
							 "locationId" :val.location.id,
							 "locationCode" :val.location.name,
							 "locType" : val.locationType.name,
							 "locTypeId" : val.locationType.id,
							 "segId" :val.metalSegment.id,
							 "segCode" :val.metalSegment.code,
					    }
					  fetchedrows.push(obj);
				 }
			 });
			 addMetalTallyGrid(fetchedrows);
		 }else{
			 $.each(response,function(key,val){
				 var obj ={ 
						 "id":val.id,
						 "systemWt":val.systemWeight,
						 "acctDate":val.accountDate,
						 "metalSeg" : val.metalSegment,					 
						 "locationId" :val.location.id,
						 "locationCode" :val.location.name,
						 "locType" : val.locationType.name,
						 "locTypeId" : val.locationType.id,
						 "segId" :val.metalSegment.id,
						 "segCode" :val.metalSegment.code,
				   }
				 fetchedrows.push(obj);
			 });
			 addMetalTallyGrid(fetchedrows);
		 }
	 });
});

var validateCreateMetalTallying = function() {
	var metalLines = [];
	var rows = $('#jqxgrideMetalC').jqxGrid('getrows');

	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		if(row.locationCode == "" || row.locationCode == null || row.physicalWt	== null 
				||  row.diffWt	== null){
			$.growl.error({
					message : "Please fill Grid fields!!",
					duration : 10000
				});
			return null;
		}
		if(row.diffWt > 0){
			console.log(row);
			if(row.remarks == "" || row.remarks == null){
				$.growl.error({
					message : "Please Enter Remarks !!",
					duration : 10000
				});
				return null;
			}
		}
   
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		metalLines.push({			
				    "inputWeight": row.physicalWt,
				    "systemWeight": row.systemWt,
				    "accountDate": row.acctDate,
				    "remarks": row.remarks,
				    "metalSegment": {
				      "id": row.segId
				    },
				    "locationType": {
				      "id": row.locTypeId
				    },
				    "location": {
				      "name": row.locationCode
				    }
		     });
         }
	return metalLines;
 }
}
$("#saveMetalTallyC").on('click',function() {	 
	 var rows = $('#jqxgrideMetalC').jqxGrid('getrows');
	
		var MatLines = [];		
		var MatLines = validateCreateMetalTallying();
		if (MatLines) {		
	  postJSON('/OrderExecution/api/v1/createMetalReconciliation',JSON.stringify(MatLines), function(data) {
			if (data.resCode == "1") {
			  $.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			 $("#createMetalRmFg").modal('hide');
			 searchMetalTallyGrid();
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			 }
	   });
	}
});

$("#createMetalTally").on('click', function() {
	$("#jqxgrideMetalC").jqxGrid('clear');
	$('#locationObj').multiselect("clearSelection");
	$("#jqxgrideMetalC").hide();
	$("#tallyByC").val(tallyDataBy);
	$("#tallyDateC").val(dcNameForCreation);
	 $("#dateFormC").val(cDate);
	$("#dcNameC").val(tallyDateCreate);
	addMetalTallyGrid();
	$("#jqxgrideMetalC").show();
});
$("#searchMetalS").on('click', function() {
	var segment = $("#segmentS").val();
	var rmFgS = $("#rmFgS").val();
	if(segment==""||segment==null||rmFgS==""||rmFgS==null){
		$.growl.error({
			message : "Please fill  mandatory fields!!",
			duration : 10000
		});
	return false;
	}
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	searchMetalTallyGrid();
	$("#jqxgrid").show();
});
$("#clearAllMetalS").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//######################################## Export Recort as per search criteria For Metal Tallying  #############################

$("#exportMetalS").on("click", function() {		
	
	    var data;
	    var newData = [];
		var fieldFilters = MetalFieldFilters();
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
	   	postJSON('/OrderExecution/api/v1/metalReconcileExport',JSON.stringify(fieldFilters), function(response) {
		if(response != null){
		data = response.payload.MetRecList;	
		for(i=0; i<data.length; i++){	
		
		newData.push({	
						'Date' : data[i].accountDate,
						'Location Code' : (data[i].location != null) ? data[i].location.id: "",
						'Location Name' : (data[i].location != null) ? data[i].location.name: "",
						'Physical Weight' : (data[i].inputWeight != null) ? data[i].inputWeight	: "",						
						'Location Weight' : (data[i].systemWeight != null) ? data[i].systemWeight	: "",
					    'Diff Weight' : (data[i].DiffInWts != null) ? data[i].DiffInWts	: "",
						'metalSegment' : (data[i].metalSegment != null) ? data[i].metalSegment.description	: "",	
						'Tallied By' : (data[i].createdBy != null) ? data[i].createdBy.name	: "",
						'RM/FG' : (data[i].locationType != null) ? data[i].locationType.name	: "",
						'Remarks' : (data[i].remarks != null) ? data[i].remarks	: ""
		       });
		}
		var opts = [{sheetid:'Metal_Tallying',header:true}];
	    var res = alasql('SELECT * INTO XLSX("Metal_Tallying'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
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

$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

//Print Functionality to be done by Venkat
//#######################################
$("#printMetalS").on('click', function() {
	var dateFormS = $('#dateFormS').val();
	var dateToS = $("#dateToS").val();
	var segmentS = $('#segmentS').val();
	var rmFgS = $("#rmFgS").val();
	var locationS = $('#locationS').val();
	
	fieldFilters = {
			"fieldFilters" : {}
		};

		if (dateFormS != "" && dateFormS != null) {
		fieldFilters.fieldFilters["fromDate"] = dateFormS;
		}
		if (dateToS != "" && dateToS != null) {
		fieldFilters.fieldFilters["toDate"] = dateToS;
		}
		if (segmentS != "" && segmentS != null) {
		fieldFilters.fieldFilters["metalSegId"] = segmentS;
		}
		if (rmFgS != "" && rmFgS != null) {
		fieldFilters.fieldFilters["materialType"] = rmFgS;
		}
		if (locationS != "" && locationS != null) {
		fieldFilters.fieldFilters["locCode"] = locationS;
		}
		
	fieldFilters = {
		"fieldFilters" : {
			"FromDate" :dateFormS ,
			"ToDate":dateToS,
			"SegmentId":segmentS,
			"MaterialType":rmFgS,
			"locationCode":locationS,
			"mode" : "pdf",
			"reportName" : "RPT_RM_FG_Material_Tally"
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
			if (navigator.msSaveBlob) {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				navigator.msSaveBlob(file, 'RPT_RM_FG_Material_Tally.pdf');
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

$('#createMetalRmFg,#createLooseStones').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});

