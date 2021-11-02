/*<!-- 
	##	Author1 (UI)    :   Pooja
	## 	Author2 (Java)	:   Manoranjan
	##	Date Creation 	: 	08-08-2017
	## 	Description		:	Category Create,search,Edit Update Functionalities
 -->
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

$("#stoneArtMaster").show();
$("#stoneMupTable").hide();
$('input:radio[name=stoneArtMup]').filter('[value="stoneArtMup"]').attr('checked', true);
$('input[name=stoneArtMup]:radio').on('click', function() {
	var selectedVal = $(this).val();

	if (selectedVal == "stoneArtMup") {
		$("#stoneArtMaster").show();
		$("#stoneMupTable").hide();

		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');

	} else if (selectedVal == "stoneMup") {
		$("#stoneMupTable").show();
		$("#stoneArtMaster").hide();

		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
});

var stoneMupEdit = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditStoneMup"  type="button" id='
			+ row
			+ ' onclick="editStoneMup('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></a>'
	}
}

//######################## LOV's ##########################
$('#regionS').empty().append('<option value="" selected>--Select--</option>');
$('#regionS').empty().append('<option value="" selected>--Select--</option>');
$('#segmentE').empty().append('<option value="" selected>--Select--</option>');
$('#businessE').empty().append('<option value="" selected>--Select--</option>');

$('#segmentC').empty().append('<option value="" selected>--Select--</option>');
$('#segmentS').empty().append('<option value="" selected>--Select--</option>');
$('#regionC').empty().append('<option value="" selected>--Select--</option>');
$('#businessC').empty().append('<option value="" selected>--Select--</option>');
$('#businessS').empty().append('<option value="" selected>--Select--</option>');
$.getJSON('/OrderExecution/api/v1/stoneMUPLOV', function(data) {	
		$.each(data.payload.stoneSeg, function(key, val) {
		$('#segmentC').append('<option value="' + val.id + '">' + val.description + '</option>');
		$('#segmentS').append('<option value="' + val.id + '">' + val.description + '</option>');
		$('#segmentE').append('<option value="' + val.description + '" idS="'+val.id+'">' + val.description + '</option>');
	});
		$.each(data.payload.business, function(key, val) {
			$('#businessC').append('<option value="' + val.id + '">' + val.name + '</option>');
			$('#businessS').append('<option value="' + val.id + '">' + val.name + '</option>');
			$('#businessE').append('<option value="' + val.name + '"idB="'+val.id+'">' + val.name + '</option>');
	});
		$.each(data.payload.REGION_LOV, function(key, val) {
			$('#regionS').append('<option value="' + val.id + '">' + val.name + '</option>');
			$('#regionC').append('<option value="' + val.id + '">' + val.name + '</option>');
			$('#regionE').append('<option value="' + val.name + '" idR="'+val.id+'">' + val.name + '</option>');
	});
});
/*var DiamondMupFor = [{"id" : 7,	"name" : "Diamond"},{"id" : 9,"name" : "Color Diamond"}];

var otherStone=[{"id" : 6,"name" : "Other Stones"}];
var preStone = [{"id" : 5,"name" :"Precious Stones"}]

// While Searching MUP
$("#segmentS").on("change",function(){
	var segment =$("#segmentS").val();
	if(segment == "DI"){
		$('#mupForS').empty().append('<option value="" selected>--Select--</option>');
		$.each(DiamondMupFor, function(key, val) {
			$('#mupForS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	} else if(segment == "PS"){
		$('#mupForC').empty().append('<option value="" selected>--Select--</option>');
		$.each(preStone, function(key, val) {
			$('#mupForS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	}else if(segment == "OS"){
		$('#mupForS').empty().append('<option value="" selected>--Select--</option>');
		$.each(otherStone, function(key, val) {
			$('#mupForS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	}
})

// While Creating the MUP 
$("#segmentC").on("change",function(){
	var segment =$("#segmentC").val();
	if(segment == "DI"){
		$('#mupForC').empty().append('<option value="" selected>--Select--</option>');
		$.each(DiamondMupFor, function(key, val) {
			$('#mupForC').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	} else if(segment == "PS"){
		$('#mupForC').empty().append('<option value="" selected>--Select--</option>');
		$.each(preStone, function(key, val) {
			$('#mupForC').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	}else if(segment == "OS"){
		$('#mupForC').empty().append('<option value="" selected>--Select--</option>');
		$.each(otherStone, function(key, val) {
			$('#mupForC').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	}	
});
*/

var stoneMupFieldFilters = function() {
	var businessS = $('#businessS').val();
	var regionS = $("#regionS").val();
	var segmentS = $("#segmentS").val();
	
	
	fieldFilters = {
			"fieldFilters" : {}
		};

	if (businessS != "" && businessS != null) {
		fieldFilters.fieldFilters["business"] = businessS;
	}

	if (regionS != "" && regionS != null) {
		fieldFilters.fieldFilters["region"] = regionS;
	}
	
	if (segmentS != "" && segmentS != null) {
		fieldFilters.fieldFilters["segment"] = segmentS;
	}
	
	return fieldFilters;
}

function stoneMupSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [
				//{'name' : 'business','type' : 'string','map'  : 'business>name'},
				//{'name' : 'region','type' : 'string','map'  : 'region>name'	},
				{'name' : 'segment','type' : 'string','map'  : 'segMent>description'},
				{'name' : 'referenceCode','type' : 'string'},
				{'name' : 'mup','type' : 'float'},
				{'name' : 'stoneCostRangeMupId','type' : 'int'}
		];
	var columns = [ 
				//{'text' : 'Business','datafield' : 'business','width' : '20%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
				//{'text' : 'Region','datafield' : 'region','width' : '25%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
				{'text' : 'Segment','datafield' : 'segment','width' : '41%',cellsalign : 'center',align : 'center',	sortable : false,editable : false},
				{'text' : 'Table Reference ','datafield' : 'referenceCode','width' : '26%',	cellsalign : 'center',align : 'center',sortable : false,editable : false},
				{'text' : 'MUP % ','datafield' : 'mup','width' : '30%',	cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2',	},
				{text : '',	datafield : 'stoneCostRangeMupId',editable : false,	cellsalign : 'center',align : 'center',cellsrenderer : stoneMupEdit,filterable: false,sortable : false,'width' : '3%'}
		   ];
	
	showMyGrid(datafields,"/OrderExecution/api/v1/searchMup","list",columns,stoneMupFieldFilters(), updateRows, "");
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
$("#searchStMup").on('click', function() {
	var businessC=$("#businessS").val();
	var regionC=$("#regionS").val();
	var segmentC=$("#segmentS").val();
	//if(businessC == "" ||regionC	== "" || businessC == null || regionC	== null 
			if(segmentC == ""  || segmentC == null){
		$.growl.error({
				message : "Please fill all  mandatory field!!",
				duration : 10000
			});
		return null;
	}
	stoneMupSearchGrid();
	$("#jqxgrid").show();
	
});
$("#Clear").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});
$("#stoneMupTabCreate").on("click",function(){
	$("#jqxgridM").hide();
	$("#addRowM").hide();
	$("#saveStoneMup").hide()
})
$('#ContinueCreateS').on("click",function(){
	$("#jqxgridM").jqxGrid('clear');
	$("#jqxgridM").hide();
	stoneMupModalGrid();	
	$("#jqxgridM").show()
	$("#addRowM").show()
	$("#saveStoneMup").show()
	$("#jqxgridM").jqxGrid('addrow',null,generaterow(rowId+1))
})

var stoneMupModalGrid = function() {

	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [
			{'name' :'tabRef','type' :'string'}, 
		   	{'name' :'mupPerc',	'type' :'float'}	
		];
	
	var columns = [ 
		
			{'text'  :'Table Ref No','datafield': 'tabRef','width' : '45%',cellsalign : 'center',align:'center',editable : true}, 
			{'text'  :'MUP %','datafield' : 'mupPerc','width'  :'45%',sortable  :false,	cellsalign : 'right',	align:'center',editable:true, cellsformat : 'd2',},
			{text : 'Action',datafield : 'Delete','width' : '10%',cellsalign : 'center',align:'center',columntype : 'button',
				cellsrenderer : function() {
				return "Delete";
			},
			buttonclick : function(row) {
				id = $("#jqxgridM").jqxGrid('getrowid', row);
				$("#jqxgridM").jqxGrid('deleterow', id);		
			}		
	}];
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgridM');
	
}
var rowId = 0;
var generaterow = function(i) {
	var row = {};
	row["tabRef"] = "";
	row["mupPerc"] = "";
	rowId = rowId + 1;
	return row;
}

$("#addRowM").on("click",function(){
	var businessC=$("#businessC").val();
	var regionC=$("#regionC").val();
	var segmentC=$("#segmentC").val();
	//if(businessC == "" ||regionC	== "" || businessC == null || regionC	== null 
			if(segmentC == ""  || segmentC == null){
		$.growl.error({
				message : "Please fill all  mandatory field!!",
				duration : 10000
			});
		return null;
	}
	$("#jqxgridM").jqxGrid('addrow',null,generaterow(rowId+2));
})


var validateStoneMup = function() {
	var subCatLines = [];
	
	 var chekUniqArr = [];
	 var chekUniqArr2 = [];
	 var rows = $('#jqxgridM').jqxGrid('getrows');
	 
	 for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			
			if (chekUniqArr.indexOf(row.tabRef) === -1) {
				chekUniqArr.push(rows[i].tabRef);
				 subCatLines.push({	
					    "referenceCode": row.tabRef,
					    "mup": row.mupPerc,
					    "segMent": {
						      "id": $("#segmentC").val()
						    },
					    /*  "region": {
					      "id": $("#regionC").val()
					    },
					    
					   "business": {
					      "businessId": $("#businessC").val()
					    }*/
				 });
			}else{
				chekUniqArr2.push(rows[i].tabRef);
			}
			
			  
		    if(row.mupPerc <= 0 ){
		    	$.growl.error({
					message : "MUP % should be greater than 0",
					duration : 10000,
					title : 'Error'
				});
				return false;
		    }
		if(row.tabRef == "" || row.mupPerc	== "" || row.tabRef == null || row.mupPerc	== null){
			$.growl.error({
					message : "Please fill all Grid fields!!",
					duration : 10000
				});
			return null;
		}else{
			var dCode = row.tabRef;
			if(row.tabRef.length > 5){
				$.growl.error({
					message : "Table Ref No should be maximum of 5 characters!",
					duration : 10000
				});
		    	return false;
			}
			var characterReg = /^[0-9A-Z',-]+$/;
		    if(!characterReg.test(row.tabRef)) {
		    	$.growl.error({
					message : "Error:Code should be in capital latters!",
					duration : 10000
				});
		    	return false;
		    }
		}
	 }
	 
	 if(chekUniqArr2.length != 0){
		 $.growl.error({
				message : "Please enter unique table reference number.",
				duration : 10000
			});
			return false;
	 }
	return subCatLines;
 }

// Creating the SUB-CATEGORY
$("#saveStoneMup").on('click',function() {	 
	trimmer();
	 var rows = $('#jqxgridM').jqxGrid('getrows');
     var mupLines = [];		
	 var mupLines = validateStoneMup();
	 if(mupLines){
		 postJSON('/OrderExecution/api/v1/createStoneMUP',JSON.stringify(mupLines), function(data) {
				if (data.resCode == "1") {
				  $.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				 $("#createStoneMup").modal('hide');
				 stoneMupSearchGrid();
				} else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
				 });
			  }
		 });
	 }
});

// ########################################### Edit Functionality ################################################

var deleteStoneEditDet = function(rowId){		
	var id = $("#jqxgridMupE").jqxGrid('getrowid', rowId);
	$("#jqxgridMupE").jqxGrid('deleterow', id);
	var selectedrowindex = $("#jqxgridMupE").jqxGrid('getselectedrowindex');
 	var rowscount = $("#jqxgridMupE").jqxGrid('getdatainformation').rowscount;
 	var data = $('#jqxgridMupE').jqxGrid('getrowdata', rowId);
	for(var i=0; i<rowscount; i++){
		$("jqxgridMupE").jqxGrid("setcellvalue", i, "id", i+1);
	}
	return false;
}
var stoneMupModalGridEdit = function(data) {

	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [
		    {'name':'stoneCostRangeMupId','type':'int'},
			{'name' :'referenceCode','type' :'string'}, 
		   	{'name' :'mup',	'type' :'float'}	
		];
	
	var columns = [ 
			{'text'  :'stoneCostRangeMupId','datafield': 'stoneCostRangeMupId','width' : '5%',cellsalign : 'center', hidden:true},
			{'text'  :'Table Ref No','datafield': 'referenceCode','width' : '48%',cellsalign : 'center',
				align:'center',
				editable : true,
				/*cellbeginedit: function (row) {
					var stoneCostRangeMupId =  $("#jqxgridMupE").jqxGrid("getCellvalue", row , 'stoneCostRangeMupId');
							if(stoneCostRangeMupId == null){
								return true;
							}else{
								return false;
							}
				}*/
			}, 
			{'text'  :'MUP %','datafield' : 'mup','width'  :'48%', sortable  :false,	cellsalign : 'right',	align:'center', cellsformat : 'd2',
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					 	if(newvalue < 0){
					 		$.growl.error({
					 			message : "MUP % Should be Greater Than 0",
					 			duration : 10000,
					 			title : 'Error'
					 		});
					 		return "";
					 	}
				}
			},
			{
				text : '',
				datafield : 'Delete',
				'width' : '4%',
				cellsalign : 'center',
				align:'center',
				editable: false,
				cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
					var stoneCostRangeMupId =  $("#jqxgridMupE").jqxGrid("getCellvalue", row , 'stoneCostRangeMupId');
					
					if(stoneCostRangeMupId == null){
						return  "<button onclick='deleteStoneEditDet("+row+")'  type='button' class='btn btn-danger btn-sm'><i class='fa fa-trash-o fa-md'></i></button>";
							//return  "<i onclick='deleteStoneEditDet("+row+")'  class='fa fa-trash-o fa-md'></i>";
					}else{					
						return  "";
					}
				
				}
			}];
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, data, addrow, '#jqxgridMupE');
	$("#jqxgridMupE").jqxGrid({
		columnsheight : 35,
		autoheight : true,
		theme: 'energyblue',
		columnsresize : true
	});
}

var editStoneMup = function(id) {	
	$('#popupheaderlabelStoneMup').text('Edit Stone MUP details');
	//var mupArr = [];
	$.getJSON('/OrderExecution/api/v1/getStoneMupbyId?id='+ id,function(data) {			
		var selectedRowData = data.payload.stoneMup;	
		
		//$("#regionE").val(selectedRowData.region.name);
		$("#segmentE").val(selectedRowData.segMent.description);	
		//$("#businessE").val(selectedRowData.business.name);
		
	//	mupArr.push(mupObj);
		stoneMupModalGridEdit( [{
			"stoneCostRangeMupId" : selectedRowData.stoneCostRangeMupId,
			"referenceCode" : selectedRowData.referenceCode,
			"mup" : selectedRowData.mup
		}]);
	});
	
};

var rowIdEdit = 1;
var generaterowEdit = function(i) {
	var row = {};
	row["stoneCostRangeMupId"]= null;
	row["referenceCode"] = "";
	row["mup"] = "";
	rowId = rowId + 1;
	return row;
}

$("#addRowMupEdit").on('click',function(){
    var rowscount = $("#jqxgridMupE").jqxGrid('getdatainformation').rowscount;
	$("#jqxgridMupE").jqxGrid('addrow', null, generaterowEdit(rowscount + 1));	
});


// ################################################# Update Functionality of Stone MUP ################################
var editRecordsStoneMupDet = function() {
	
	var mupArr = [];
	var chekUniqArr = [];
	var chekUniqArr2 = [];
	var rows = $('#jqxgridMupE').jqxGrid('getrows');
	 
	for (var i = 0; i < rows.length; i++) {
			var row = rows[i];			
			if (chekUniqArr.indexOf(row.referenceCode) === -1) {
				chekUniqArr.push(rows[i].referenceCode);
				 if( typeof row.stoneCostRangeMupId == "undefined"){
						
						var stoneDetails = {
								"stoneCostRangeMupId" : null,
								"referenceCode": row.referenceCode,
							    "mup":  row.mup,
							 //   "region": { "id": $("#regionE option:selected").attr('idR')},
							    "segMent": { "id": $("#segmentE option:selected").attr('idS')},
							  //  "business": { "businessId": $("#businessE option:selected").attr('idB') }
					    }
						mupArr.push(stoneDetails);
					}  
					else{
							var stoneDetails = {							
									"stoneCostRangeMupId" : row.stoneCostRangeMupId,
								    "referenceCode": row.referenceCode,
								    "mup":  row.mup,
								   // "region": {"id": $("#regionE option:selected").attr('idR')},
								    "segMent": {"id": $("#segmentE option:selected").attr('idS')},
								 //   "business": {"businessId": $("#businessE option:selected").attr('idB')}
						}
						mupArr.push(stoneDetails);
					  }
			}else{
				chekUniqArr2.push(rows[i].referenceCode);
			}
			
		if(row.referenceCode == "" || row.mup	== "" || row.referenceCode == null || row.mup	== null){
			$.growl.error({
					message : "Please fill all Grid fields!!",
					duration : 10000
				});
			return null;
		}else{
			var dCode = row.referenceCode;
			if(row.referenceCode.length > 5){
				$.growl.error({
					message : "Table Ref No should be maximum of 5 characters!",
					duration : 10000
				});
		    	return false;
			}
			var characterReg = /^[0-9A-Z',-]+$/;
		    if(!characterReg.test(row.referenceCode)) {
		    	$.growl.error({
					message : "Error:Code should be in capital latters!",
					duration : 10000
				});
		    	return false;
		    }
		}
		
	 }
	 
	 if(chekUniqArr2.length != 0){
		 $.growl.error({
				message : "Please enter unique table reference number.",
				duration : 10000
			});
			return false;
	 }else{
		
	 }
    
	return mupArr;
 }
//Update and save STONE MUP  details

$("#saveStoneMupE").on('click',function() {
	trimmer();
	var stoneMUPDetails = editRecordsStoneMupDet();
	console.log(stoneMUPDetails);
	for(var i = 0; i< stoneMUPDetails.length; i++){
		 var rowE = stoneMUPDetails[i];
		  if(rowE.mup < 0){
			  $.growl.error({
				  message : "MUP % Should be Greater Than 0",
				  duration : 1000,
				  title : 'Error'
			  });
			  return false;
		  }
	}
	if (stoneMUPDetails) {
		postJSON('/OrderExecution/api/v1/updateStoneMup',JSON.stringify(stoneMUPDetails),function(data) {
		  if (data.resCode == "1") {										
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			$('#btnEditStoneMup').modal('hide');
			$("#jqxgridMupE").jqxGrid('clear');
			stoneMupSearchGrid();
		} else {
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
		  }
	   });
	}
});

//#################################################### Export Recort as per search criteria for Stone MUP ########################################

$("#exportStMup").on("click", function() {		
	var data;
	var newData = [];
	var businessS = $('#businessS').val();
	var regionS = $("#regionS").val();
	var segmentS = $("#segmentS").val();
	
	
	fieldFilters = {
			"fieldFilters" : {}
		};

	if (businessS != "" && businessS != null) {
		fieldFilters.fieldFilters["business"] = businessS;
	}

	if (regionS != "" && regionS != null) {
		fieldFilters.fieldFilters["region"] = regionS;
	}
	
	if (segmentS != "" && segmentS != null) {
		fieldFilters.fieldFilters["segment"] = segmentS;
	}
	
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
	   	postJSON('/OrderExecution/api/v1/exportStoneMup',JSON.stringify(fieldFilters), function(response) {
		if(response != null){
		data = response.payload.list;	
		for(i=0; i<data.length; i++){	
		
			newData.push({	
						'Id' : data[i].stoneCostRangeMupId,
						'Reference Code' : data[i].referenceCode,
						'MUP%' : data[i].mup,
						/*'Region' : (data[i].region != null) ? data[i].region.name: "",
						'Segment' : (data[i].segMent != null) ? data[i].segMent.description: "",*/
			       });
			   }											
				//JSONToCSVConvertor(newData,	"Stone MUP Export" + "_" + sysdate, true);	
				  var opts = [{sheetid:'Stone_MUP_Export',header:true}];
		          var res = alasql('SELECT * INTO XLSX("Stone MUP Export_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

$('#createStoneArticleMaster').on('hidden.bs.modal', function() {	
	$("#stoneArtMasterCreateC").trigger("reset");	
	$("#stoneMupTabCreateC").trigger("reset");	
});

$('#btnEditStoneMup').on('hidden.bs.modal', function() {	
	$("#stoneArticleMasterDetE").trigger("reset");	
});