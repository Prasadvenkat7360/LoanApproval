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
	window.location.href="javascript:showContentPage('scanningOrWeightCheck', 'bodySwitcher')";
	return window.location.href;
}

$("#fg").hide();
$("#wcCreate").hide();
$("#scCreate").show();
$("#footerHide").hide();
$("#footerHideWc").hide();
$('input:radio[name="scnWc"]').filter('[value="sc"]').attr('checked', true);
$('input[name=scnWc]:radio').on('click', function() {
	var selectedVal = $(this).val();

	if (selectedVal == "sc") {
		$("#footerHide").hide();
		$("#scCreate").show();
		$("#wcCreate").hide();
		$("#addS").prop('disabled',false);
		$("#footerHideWc").hide();
		/*$("#scMatTypeC").val("");
		$("#scSegC").val("");
		$("#scJTypeC").val("");
		
		$("#scMatTypeC").prop('disabled',false);
		$("#scSegC").prop('disabled',false);
		$("#scJTypeC").prop('disabled',false);*/
		
      
		$("#jqxgridW").hide();
		$("#jqxgridW").jqxGrid('clear');
		
		$("#jqxgridWC").hide();
		$("#jqxgridWC").jqxGrid('clear');
		
		
	}  else if (selectedVal == "wc") {
		$("#footerHide").hide();
		$("#scCreate").hide();
		$("#wcCreate").show();
		$("#addW").prop('disabled',false);
		
		/*$("#matTypeC").val("");
		$("#segC").val("");
		$("#jTypeC").val("");
		
		$("#matTypeC").prop('disabled',false);
		$("#segC").prop('disabled',false);
		$("#jTypeC").prop('disabled',false);*/
			
		$("#jqxgridS").hide();
		$("#jqxgridS").jqxGrid('clear');
		
		$("#jqxgridL").hide();
		$("#jqxgridL").jqxGrid('clear');
	}  
});

var d = new Date();
var cDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();	
 
$("#createdDateC").val(cDate);
$("#scCreatedDateC").val(cDate);

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
	maxDate : 0,
});

$("#zoneIdS").hide();
$("#zoneIdW").hide();

//on load lov's
var fgSeg = [];
var stoneSeg = [];
var accSeg = [];
var tagWT; 
var onLoadLov = function(){
$.getJSON('/OrderExecution/api/v1/weightCheckLOVs', function(data) {
	var zone = data.payload.currentZone.description;
	var zid = data.payload.currentZone.id;
	var matTypeWc = data.payload.mTypesWC;
	tagWT = parseFloat(data.payload.tagwt.description);
	$("#scZoneIdC").val(zone);
	$("#zoneIdC").val(zone);
	
	$("#scZoneC").val(zid);
	$("#wcZoneC").val(zid);
	
	$('#matTypeS').empty().append('<option value="" selected>--Select--</option>');
	$('#scMatTypeC').empty().append('<option value="" selected>--Select--</option>');
	$('#matTypeC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.materialTypes, function(key, val) {
		$('#matTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
		$('#scMatTypeC').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		
		$.each(matTypeWc, function(key, val) {
			$('#matTypeC').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	});
}
onLoadLov();

// on change of material type load segment
$("#matTypeS").on('change',function(){
	var matType = $("#matTypeS").val();
	$.getJSON('/OrderExecution/api/v1/weightCheckLOVs', function(data) {
		var fgSeg = data.payload.metalSegments;
		var stoneSeg = data.payload.stoneSegments;
		var accSeg = data.payload.accSegments;
		var segment ;
			if(matType == "FG"){
				segment = fgSeg;
				$("#fg").show();
			}
			if(matType == "LS"){
				segment = stoneSeg;
				$("#fg").hide();
			}
			if(matType == "A"){
				segment = accSeg;
				$("#fg").hide();
			}
		$('#segS').empty().append('<option value="" selected>--Select--</option>');
			$.each(segment, function(key, val) {
			$('#segS').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});	
});

//on change of material type load segment
$("#scMatTypeC").on('change',function(){
	var matType = $("#scMatTypeC").val();
	$.getJSON('/OrderExecution/api/v1/weightCheckLOVs', function(data) {
		var fgSeg = data.payload.metalSegments;
		var stoneSeg = data.payload.stoneSegments;
		var accSeg = data.payload.accSegments;
		var segment ;
		
		
			if(matType == "FG"){
				segment = fgSeg;
			}
			if(matType == "LS"){
				segment = stoneSeg;
			}
			if(matType == "A"){
				segment = accSeg;
			}
		$('#scSegC').empty().append('<option value="" selected>--Select--</option>');
			$.each(segment, function(key, val) {
			$('#scSegC').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});	
});

//on change of material type load segment
$("#matTypeC").on('change',function(){
	var matType = $("#matTypeC").val();
	$.getJSON('/OrderExecution/api/v1/weightCheckLOVs', function(data) {
		var fgSeg = data.payload.metalSegments;
		var stoneSeg = data.payload.stoneSegments;
		var accSeg = data.payload.accSegments;
		var segment ;
			if(matType == "FG"){
				segment = fgSeg;
			}
			if(matType == "LS"){
				segment = stoneSeg;
			}
			
		$('#segC').empty().append('<option value="" selected>--Select--</option>');
			$.each(segment, function(key, val) {
			$('#segC').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});	
});

// on change of segment load jeewel type
$("#segS").on('change',function(){
	var seg = $("#segS").val();
	$.getJSON('/OrderExecution/api/v1/weightCheckLOVs?segmentId=' + seg , function(data) {
		$('#jTypeS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.jewelTypes, function(key, val) {
			$('#jTypeS').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});
});

//on change of segment load jeewel type
$("#scSegC").on('change',function(){
	var seg = $("#scSegC").val();
	$.getJSON('/OrderExecution/api/v1/weightCheckLOVs?segmentId=' + seg , function(data) {
		$('#scJTypeC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.jewelTypes, function(key, val) {
			$('#scJTypeC').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});
});

//on change of segment load jeewel type
$("#segC").on('change',function(){
	var seg = $("#segC").val();
	$.getJSON('/OrderExecution/api/v1/weightCheckLOVs?segmentId=' + seg , function(data) {
		$('#jTypeC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.jewelTypes, function(key, val) {
			$('#jTypeC').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});
});

$("#matTypeS").on('change',function(){
	var matTypeS = $("#matTypeS").val();
	if(matTypeS == "LS" || matTypeS == "A" ){
		$("#jType").hide();
	}else{
		$("#jType").show();
	}
});

$("#matTypeC").on('change',function(){
	var matTypeC = $("#matTypeC").val();
	if(matTypeC == "LS"){
		$("#jewTypeC").hide();
	}else{
		$("#jewTypeC").show();
	}
});

$("#scMatTypeC").on('change',function(){
	$("#addS").prop('disabled', false);
	var scMatTypeC = $("#scMatTypeC").val();
	if(scMatTypeC == "LS" || scMatTypeC == "A" ){
		$("#jewTypeSc").hide();
	}else{
		$("#jewTypeSc").show();
	}
});

//field Filters
var scanOrWtCheckFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var matTypeS = $("#matTypeS").val();
	var jTypeS = $("#jTypeS").val();
	var segS = $("#segS").val();
	var stockCheckIdS = $("#stockCheckIdS").val();
	var type = $("#type").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (matTypeS != "" && matTypeS != null) {
		fieldFilters.fieldFilters["materialType"] = matTypeS;
	}
	if (jTypeS != "" && jTypeS != null) {
		fieldFilters.fieldFilters["jewelType"] = jTypeS;
	}
	if (segS != "" && segS != null) {
		fieldFilters.fieldFilters["segmentId"] = segS;
	}
	if (stockCheckIdS != "" && stockCheckIdS != null) {
		fieldFilters.fieldFilters["stockCheckId"] = stockCheckIdS;
	}
	if (type != "" && type != null) {
		fieldFilters.fieldFilters["type"] = type;
	}
	return fieldFilters;
}

//############# FG Create grid for Scanning #######################
var scanningCreateGridFg = function() {
	var rowId = 0;
	var generaterowS = function(i) {
	var row = {};
	row["segC"] = "";
	row["jTypeC"] =  "";
	row["stockNo"] =  "";
	row["subCatDesc"] =  "";
	row["pcs"] =  "";
	row["uqc"] =  "";
	rowId = rowId + 1;
	return row;
} 
	var source = {
		datafields : [ 
		{'name' :'segC','type' :'string'}, 
		{'name' :'jTypeC','type' :'string'},
		{'name' :'segId','type' :'int'},
		{'name' :'jwlId','type' :'int'},
		{'name' :'metalId','type' :'int'},
		{'name' :'metalDesc','type' :'string'},
		{'name' :'subCatId','type' :'int'},
		{'name' :'stockNo','type' :'int'},
		{'name' :'subCatDesc','type' :'string'},
		{'name' :'pcs','type' :'int'},
		{'name' :'uqc','type' :'string'},
		{'name' :'gWt','type' :'float'},
		{'name' :'nWt','type' :'float'}
		]};
	
		$("#jqxgridS").jqxGrid({
		width : '100%',
		editable : true,
		theme: 'energyblue',
		columnsheight : 50,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<div style="margin-bottom:10px;"  id="addrowbutton" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i></div>');
			container.append('<div style="margin-bottom: 10px;" id="deleterowbutton" class="btn btn-danger btn-sm pull-right"><i  class="fa fa-trash fa-md"></i></div>');
			
			$("#addrowbutton").jqxButton();
			$("#deleterowbutton").jqxButton();
			
			$("#addrowbutton").on('click',	function() {
				var rowscount = $("#jqxgridS").jqxGrid('getdatainformation').rowscount;
				if (rowscount == 0) {
					var rowId = 1;
				} 
				else {
					var rowId = rowscount + 1;
					var rows = $('#jqxgridS').jqxGrid('getrows');
					for (var i = 0; i < rowscount; i++) {
					if (rows[i].segC == ""
							|| rows[i].jTypeC == ""
							|| rows[i].segId == ""
							|| rows[i].jwlId == ""
							|| rows[i].subCatId == ""
							|| rows[i].matalId == ""
							|| rows[i].matalDesc == ""
							|| rows[i].stockNo == ""
							|| rows[i].subCatDesc == ""
							|| rows[i].pcs == ""
							| rows[i].uqc == ""
							|| rows[i].gWt == ""
							|| rows[i].nWt == "") {
						$.growl.error({
									message : "Grid fields are Mandatory",
									duration : 20000,
									title : 'Error'
								});
						return false;
					}
				}
			}
		var datarow = generaterowS(rowId);
		var commit = $("#jqxgridS").jqxGrid('addrow',null, datarow);
				//$("#jqxgridS").jqxGrid('addrow', null, generaterowS(rowId + 1));	
			});
			
			$("#deleterowbutton").on('click', function() {
				var selectedrowindex = $("#jqxgridS").jqxGrid('getselectedrowindex');
				var rowscount = $("#jqxgridS").jqxGrid('getdatainformation').rowscount;				
				
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var id = $("#jqxgridS").jqxGrid('getrowid', selectedrowindex);
					var commit = $("#jqxgridS").jqxGrid('deleterow', id);
				}
			});
		},
		columns : [
			{ text  :'state Detail Id','datafield': 'statusEditableFeild',cellsalign : 'center', hidden:true,
				 cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
							var rows = $("#jqxgridS").jqxGrid("getrows");
							$("#jqxgridS").jqxGrid('setcellvalue', row, 'statusEditableFeild',false);}
				},
			{'text'  :'Stock No','datafield':  'stockNo','width' : '5%',cellsalign : 'center',align:'center',editable : true,
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) { 
   		    		var stockNo =  $('#jqxgridS').jqxGrid('getcellvalue', row, 'stockNo');
   		    			if(newvalue == null || newvalue == "" ){
   		    				$.growl.error({
   		    					message : "Please Enter Stock No !!!",
   		    					duration  : 20000,
   		    					title: 'Error'
   		    				});
   		    				return "";
   		    			}
   		    	else{
   		    		var seg =  parseInt($('#scSegC').val());
   		    		var jewel = parseInt($("#scJTypeC").val());
   		    		var fieldFilters = {"fieldFilters":{"stockId":parseInt(newvalue),"jewelId":jewel,"segId":seg,}}      		   
	        		   postJSON('/OrderExecution/api/v1/getStockDetailsById', JSON.stringify(fieldFilters), function(data) {
	        			  
	        			   if (data.resCode == "1") {
	        				 var rows = $("#jqxgridS").jqxGrid('getrows');
	        					$("#jqxgridS").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
	        					
	        				 var result = data.payload.stockItem;
	        				   
	        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "segC",result.segment.description);
	        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "metalDesc",result.metalSegment.description);
	        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "segId",result.segment.id);
	        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "jTypeC",result.jewelTypeDTO.description);
	        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "jwlId",result.jewelTypeDTO.id);
	        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "metalId",result.metalSegment.id);
	        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "subCatDesc",result.subCategory.description);
	        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "subCatId",result.subCategory.id);
	        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "pcs",result.finishedPieces);
	        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "gWt",result.grossWeight);
	        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "nWt",result.finishedNetWeight);
	        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "uqc",result.uqc);
	        			   
	        			   $("#jqxgridS").jqxGrid('addrow', null, generaterowS(rowId + 1));
	        			   }
	        			   else{
	        				   $("#jqxgridS").jqxGrid('setcellvalue', row, 'statusEditableFeild',false);
	        				   
	        				   $("#jqxgridS").jqxGrid('setcellvalue', row, "segC","");
		        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "segId","");
		        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "jTypeC","");
		        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "jwlId","");
		        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "metalId","");
		        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "metalDesc","")
		        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "subCatDesc","");
		        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "subCatId","");
		        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "pcs","");
		        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "gWt","");
		        			   $("#jqxgridS").jqxGrid('setcellvalue', row, "nWt","");
	        				   $("#jqxgridS").jqxGrid('setcellvalue', row, "pcs","");
	        				   $("#jqxgridS").jqxGrid('setcellvalue', row, "uqc","");
	        				   $.growl.error({
	        						message : data.mesgStr,
	        						duration : 20000,
	        						title : 'Error'
	        					});
	        				   return false;
	        			   }
	        		   });	
					}
				}	
			},
			{'text'  :'Article Segment','datafield':  'segC','width' : '10%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Metal Segment','datafield':  'metalDesc','width' : '10%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'SID','datafield':  'segId',cellsalign : 'center',align:'center',editable : false,hidden : true},
			{'text'  :'MetalID','datafield':  'metalId',cellsalign : 'center',align:'center',editable : false,hidden : true},
			{'text'  :'Jewel Type','datafield' : 'jTypeC','width'  :'10%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
			{'text'  :'JID','datafield':  'jwlId',cellsalign : 'center',align:'center',editable : false,hidden : true},
			{'text'  :'Sub Cat Desc','datafield' : 'subCatDesc','width'  :'30%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
			{'text'  :'SUB ID','datafield':  'subCatId',cellsalign : 'center',align:'center',editable : false,hidden : true},
			{'text'  :'UQC','datafield' : 'uqc','width'  :'10%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
			{'text'  :'Pcs','datafield' : 'pcs','width'  :'10%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
			{'text'  :'Gross Wt','datafield':  'gWt','width' : '15%',cellsalign : 'right',align:'center',editable : false},
			{'text'  :'Net Wt','datafield':  'nWt','width' : '10%',cellsalign : 'right',align:'center',editable : false},
		]
	});
}

// ############## Stone Create Grid For Scanning #########################
var scanningStoneCreateGrid = function() {
	var rowId = 0;
	var generaterowL = function(i) {
	var row = {};
	row["catC"] = "";
	row["subCatC"] =  "";
	row["stockNoC"] =  "";
	row["stoneWt"] =  "";
	row["netWt"] =  "";
	row["stonePcs"] =  "";
	row["uqc"] =  "";
	row["segementDesc"] =  "";
	rowId = rowId + 1;
	return row;
} 
	var source = {
		datafields : [ 
		{'name' :'catC','type' :'string'}, 
		{'name' :'subCatC','type' :'string'},
		{'name' :'stockNoC','type' :'int'},
		{'name' :'stoneWt','type' :'int'},
		{'name' :'netWt','type' :'int'},
		{'name' :'stonePcs','type' :'int'},
		{'name' :'catId','type' :'int'},
		{'name' :'subCatId','type' :'int'},
		{'name' :'uqc','type' :'string'},
		{'name' :'segmentDesc','type' :'string'},
		]};
	
		$("#jqxgridL").jqxGrid({
		width : '100%',
		editable : true,
		columnsheight : 50,
		theme: 'energyblue',
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<div style="margin-bottom:10px;"  id="addrowbutton" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i></div>');
			container.append('<div style="margin-bottom: 10px;" id="deleterowbutton" class="btn btn-danger btn-sm pull-right"><i  class="fa fa-trash fa-md"></i></div>');
			
			$("#addrowbutton").jqxButton();
			$("#deleterowbutton").jqxButton();
			
			$("#addrowbutton").on('click',	function() {
				var rowscount = $("#jqxgridL").jqxGrid('getdatainformation').rowscount;
				if (rowscount == 0) {
					var rowId = 1;
				} 
				else {
					var rowId = rowscount + 1;
					var rows = $('#jqxgridL').jqxGrid('getrows');
					for (var i = 0; i < rowscount; i++) {
					if (rows[i].catC == ""
							|| rows[i].subCatC == ""
							|| rows[i].stockNoC == ""
							|| rows[i].stoneWt == ""
							|| rows[i].netWt == ""
							|| rows[i].stonePcs == ""
							|| rows[i].catId == ""
							|| rows[i].segmentDesc == ""
							|| rows[i].uqc == ""
							|| rows[i].subCatId == "") {
						$.growl.error({
									message : "Grid fields are Mandatory",
									duration : 20000,
									title : 'Error'
								});
						return false;
					}
				}
			}
		var datarow = generaterowL(rowId);
		var commit = $("#jqxgridL").jqxGrid('addrow',null, datarow);
				//$("#jqxgridL").jqxGrid('addrow', null, generaterowL(rowId + 1));	
			});
			
			$("#deleterowbutton").on('click', function() {
				var selectedrowindex = $("#jqxgridL").jqxGrid('getselectedrowindex');
				var rowscount = $("#jqxgridL").jqxGrid('getdatainformation').rowscount;				
				
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var id = $("#jqxgridL").jqxGrid('getrowid', selectedrowindex);
					var commit = $("#jqxgridL").jqxGrid('deleterow', id);
				}
			});
		},
		columns : [
			{ text  :'state Detail Id','datafield': 'statusEditableFeildL',cellsalign : 'center', hidden:true,
				 cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
							var rows = $("#jqxgridL").jqxGrid("getrows");
							$("#jqxgridL").jqxGrid('setcellvalue', row, 'statusEditableFeild',false);}
				},
			{'text'  :'Stock No','datafield':  'stockNoC','width' : '10%',cellsalign : 'center',align:'center',editable : true,
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) { 
   		    		var stockNo =  $('#jqxgridL').jqxGrid('getcellvalue', row, 'stockNoC');
   		    		if(newvalue == null || newvalue == "" ){
		    				$.growl.error({
		    					message : "Please Enter Stock No !!!",
		    					duration  : 20000,
		    					title: 'Error'
		    				});
		    				return "";
		    			}
   		    		else{
   		    		var seg =  parseInt($('#scSegC').val());
   		    		var fieldFilters = {"fieldFilters":{"stockId":parseInt(newvalue),"segId":seg,}}      		   
	        		   postJSON('/OrderExecution/api/v1/getLooseStoneStockDetailsById', JSON.stringify(fieldFilters), function(data) {
	        			   if (data.resCode == "1") {	
	        				   var rows = $("#jqxgridL").jqxGrid('getrows');
	        					$("#jqxgridL").jqxGrid('setcellvalue', row, 'statusEditableFeildL',true);
	        					
	        				  var result = data.payload.stockItem;
		        			  var category = result.category;
	        			   $("#jqxgridL").jqxGrid('setcellvalue', row, "catC",result.stoneCategory.name);
	        			   $("#jqxgridL").jqxGrid('setcellvalue', row, "catId",result.stoneCategory.id);
	        			   $("#jqxgridL").jqxGrid('setcellvalue', row, "stoneWt",result.weight);
	        			   $("#jqxgridL").jqxGrid('setcellvalue', row, "netWt",null);
	        			   $("#jqxgridL").jqxGrid('setcellvalue', row, "stonePcs",result.pieces);
	        			   $("#jqxgridL").jqxGrid('setcellvalue', row, "segmentDesc",result.stoneSegment.description);
        				   $("#jqxgridL").jqxGrid('setcellvalue', row, "uqc",result.uom.id);
	        			   if(category != null){
	        				   $("#jqxgridL").jqxGrid('setcellvalue', row, "subCatId",result.category.id);
	        				   $("#jqxgridL").jqxGrid('setcellvalue', row, "subCatC",result.category.name);
	        			   }else{
	        				   $("#jqxgridL").jqxGrid('setcellvalue', row, "subCatC",result.subCategoryDescription); 
	        			   }
	        			   $("#jqxgridL").jqxGrid('addrow', null, generaterowL(rowId + 1));
	        			   }else{
	        				   $("#jqxgridL").jqxGrid('setcellvalue', row, 'statusEditableFeildL',false);
	        				   
	        				   $("#jqxgridL").jqxGrid('setcellvalue', row, "catC","");
		        			   $("#jqxgridL").jqxGrid('setcellvalue', row, "catId","");
		        			   $("#jqxgridL").jqxGrid('setcellvalue', row, "stoneWt","");
		        			   $("#jqxgridL").jqxGrid('setcellvalue', row, "netWt","");
		        			   $("#jqxgridL").jqxGrid('setcellvalue', row, "stonePcs","");
		        			   $("#jqxgridL").jqxGrid('setcellvalue', row, "subCatId","");
	        				   $("#jqxgridL").jqxGrid('setcellvalue', row, "subCatC","");
	        				   $("#jqxgridL").jqxGrid('setcellvalue', row, "segmentDesc","");
	        				   $("#jqxgridL").jqxGrid('setcellvalue', row, "uqc","");
	        				   
	        				   $.growl.error({
	        						message : data.mesgStr,
	        						duration : 20000,
	        						title : 'Error'
	        					});
	        				   return false;
	        			   }
	        		   });	
					}
				}	
			},
			{'text'  :'Segment','datafield':  'segmentDesc','width' : '15%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Category','datafield':  'catC','width' : '15%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Sub Cat','datafield':  'subCatC','width' : '30%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Stone Pcs','datafield':  'stonePcs','width' : '10%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Stone Wt','datafield' : 'stoneWt','width'  :'10%',sortable  :false,cellsalign : 'right',align:'center',editable:  false},
			{'text'  :'UQC','datafield':  'uqc','width' : '10%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Net Wt','datafield' : 'netWt',sortable  :false,cellsalign : 'right',align:'center',editable:  false,hidden : true},
			{'text'  :'','datafield' : 'subCatId',sortable  :false,cellsalign : 'center',align:'center',editable:  false,hidden : true},
			{'text'  :'','datafield':  'catId',cellsalign : 'center',align:'center',editable : false,hidden : true},
		]
	});
}

$("#addS").on('click',function(){
	var scMatTypeC = $("#scMatTypeC").val();
	var scSegC = $("#scSegC").val();
	var jType = $("#scJTypeC").val();
		if(scMatTypeC == "" || scMatTypeC == null || scSegC == "" || scSegC == null){
			$.growl.error({
				message :"Please Fill Mandatory Fields",
				duration : 20000,
				title : 'Error'
			});
			return false;
		}
		else{
			$("#addS").prop('disabled', true);
			$("#scMatTypeC").prop('disabled', true);
			$("#scSegC").prop('disabled', true);
			$("#scJTypeC").prop('disabled', true);
			$("#footerHide").show();
			if(scMatTypeC == "FG"){
				if(scSegC != "" || scSegC != null ){
					if(jType == "" || jType == null){
						$("#addS").prop('disabled', false);
						$("#scMatTypeC").prop('disabled', false);
						$("#scSegC").prop('disabled', false);
						$("#scJTypeC").prop('disabled', false);
						$("#footerHide").hide();
						$.growl.error({
						 message : "Please Enter Jewel Type",
						 duration : 10000,
						 title : 'Error'
						});
						return false;
					}
				}
				$("#jqxgridL").hide();
				scanningCreateGridFg();
				$("#jqxgridS").show();
				$("#jqxgridA").hide();
			}else if(scMatTypeC == "LS"){
				$("#jqxgridS").hide();
				scanningStoneCreateGrid();
				$("#jqxgridL").show();
				$("#jqxgridA").hide();
			}else if(scMatTypeC == "A"){
				$("#jqxgridL").hide();
				scanningAccCreateGrid();
				$("#jqxgridS").hide();
				$("#jqxgridA").show();
			}		
		}
});


//############## Accessory Create Grid For Scanning #########################
var scanningAccCreateGrid = function() {
	var rowId = 0;
	var generaterowL = function(i) {
	var row = {};
	row["catA"] = "";
	row["subCatA"] =  "";
	row["stockNoA"] =  "";
	row["accWtA"] =  "";
	row["accNetWtA"] =  "";
	row["accPcsA"] =  "";
	row["segmentDesc"] =  "";
	rowId = rowId + 1;
	return row;
} 
	var source = {
		datafields : [ 
			{'name' :'catA','type' :'string'}, 
			{'name' :'subCatA','type' :'string'},
			{'name' :'segmentDesc','type' :'string'},
			{'name' :'stockNoA','type' :'int'},
			{'name' :'accWtA','type' :'int'},
			{'name' :'accNetWtA','type' :'int'},
			{'name' :'accPcsA','type' :'int'},
			{'name' :'catIdA','type' :'int'},
			{'name' :'subCatIdA','type' :'int'},
		]};
	
		$("#jqxgridA").jqxGrid({
		width : '100%',
		editable : true,
		columnsheight : 30,
		theme: 'energyblue',
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<div style="margin-bottom:10px;"  id="addrowbutton" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i></div>');
			container.append('<div style="margin-bottom: 10px;" id="deleterowbutton" class="btn btn-danger btn-sm pull-right"><i  class="fa fa-trash fa-md"></i></div>');
			
			$("#addrowbutton").jqxButton();
			$("#deleterowbutton").jqxButton();
			
			$("#addrowbutton").on('click',	function() {
				var rowscount = $("#jqxgridA").jqxGrid('getdatainformation').rowscount;
				if (rowscount == 0) {
					var rowId = 1;
				} 
				else {
					var rowId = rowscount + 1;
					var rows = $('#jqxgridA').jqxGrid('getrows');
					for (var i = 0; i < rowscount; i++) {
					if (rows[i].catA == ""|| rows[i].subCatA == ""|| rows[i].stockNoA == ""|| rows[i].accWtA == ""|| rows[i].accPcsA == ""|| rows[i].catIdA == ""
							|| rows[i].subCatIdA == "") {
						$.growl.error({
									message : "Grid fields are Mandatory",
									duration : 20000,
									title : 'Error'
								});
							return false;
						}
					}
				}
			    var datarow = generaterowL(rowId);
			    var commit = $("#jqxgridA").jqxGrid('addrow',null, datarow);
			});
			$("#deleterowbutton").on('click', function() {
				var selectedrowindex = $("#jqxgridA").jqxGrid('getselectedrowindex');
				var rowscount = $("#jqxgridA").jqxGrid('getdatainformation').rowscount;				
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var id = $("#jqxgridA").jqxGrid('getrowid', selectedrowindex);
					var commit = $("#jqxgridA").jqxGrid('deleterow', id);
				}
			});
		},
		columns : [
			{ text  :'','datafield': 'id',hidden:true},
			{ text  :'state Detail Id','datafield': 'statusEditableFeildA','width' : '5%',cellsalign : 'center', hidden:true,
				 cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
							var rows = $("#jqxgridA").jqxGrid("getrows");
							$("#jqxgridA").jqxGrid('setcellvalue', row, 'statusEditableFeild',false);}
				},
			{'text'  :'Stock No','datafield':  'stockNoA','width' : '10%',cellsalign : 'center',align:'center',editable : true,
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) { 
   		    		var stockNo =  $('#jqxgridA').jqxGrid('getcellvalue', row, 'stockNoA');
   		    		if(newvalue == null || newvalue == "" ){
		    				$.growl.error({
		    					message : "Please Enter Stock No !!!",
		    					duration  : 20000,
		    					title: 'Error'
		    				});
		    				return "";
		    			}
   		    		else{
   		    		var seg =  parseInt($('#scSegC').val());
   		    		var fieldFilters = {"fieldFilters":{"stockId":parseInt(newvalue),"segId":seg,}}      		   
	        		   postJSON('/OrderExecution/api/v1/getAccStockItemDetailsById', JSON.stringify(fieldFilters), function(data) {
	        			   if (data.resCode == "1") {	
	        				   var rows = $("#jqxgridA").jqxGrid('getrows');
	        				   $("#jqxgridA").jqxGrid('setcellvalue', row, 'statusEditableFeildA',true);
	        				   var result = data.payload.stockItem;
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "id",result.id);
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "catA",result.accCategory.Description);
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "segmentDesc",result.accSegmentDTO.description);
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "catIdA",result.accCategory.id);
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "accWtA",result.weight);
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "accNetWtA",null);
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "accPcsA",result.pieces);
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "uqc",result.uom);
	        				   $("#jqxgridA").jqxGrid('setcellvalue', row, "subCatIdA",result.subCategoryDTO.id);
	        				   $("#jqxgridA").jqxGrid('setcellvalue', row, "subCatA",result.subCategoryDTO.description);
		        			   $("#jqxgridA").jqxGrid('addrow', null, generaterowL(rowId + 1));
	        			   }else{
	        				   $("#jqxgridA").jqxGrid('setcellvalue', row, 'statusEditableFeildA',false);
	        				   $("#jqxgridA").jqxGrid('setcellvalue', row, "segmentDesc","");
	        				   $("#jqxgridA").jqxGrid('setcellvalue', row, "catA","");
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "catIdA","");
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "accWtA","");
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "accNetWtA","");
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "accPcsA","");
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "uqc","");
		        			   $("#jqxgridA").jqxGrid('setcellvalue', row, "subCatIdA","");
	        				   $("#jqxgridA").jqxGrid('setcellvalue', row, "subCatA","");
	        				   
	        				   $.growl.error({
	        						message : data.mesgStr,
	        						duration : 20000,
	        						title : 'Error'
	        					});
	        				   return false;
	        			   }
	        		   });	
					}
				}	
			},
			{'text'  :'Segment','datafield':  'segmentDesc','width' : '15%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'CategoryA','datafield':  'catA','width' : '15%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Sub Cat','datafield':  'subCatA','width' : '30%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Acc Pcs','datafield':  'accPcsA','width' : '10%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Acc Wt','datafield' : 'accWtA','width'  :'10%',sortable  :false,cellsalign : 'right',align:'center',editable:  false},
			{'text'  :'UQC','datafield':  'uqc','width' : '10%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Acc Net Wt','datafield' : 'accNetWtA',sortable  :false,cellsalign : 'right',align:'center',editable:  false,hidden : true},
			{'text'  :'','datafield' : 'subCatIdA',sortable  :false,cellsalign : 'center',align:'center',editable:  false,hidden : true},
			{'text'  :'','datafield':  'catIdA',cellsalign : 'center',align:'center',editable : false,hidden : true},
		]
	});
}


//######################## create FG Scanning #############################
function validateScanDetF() {
	var scanDetFg = [];
	var getScanDet = $('#jqxgridS').jqxGrid('getrows');	
	for (var i = 0; i < getScanDet.length; i++) {
			var scanDetailsC = {
					
					  "serialNo": i+1,
				      "stockNo": parseInt(getScanDet[i].stockNo),
				      "metalSegment": {
				        "id": parseInt(getScanDet[i].metalId)
				      },
				      "articleSegment": {
				        "id": parseInt(getScanDet[i].segId)
				      },
				      "jewelType": {
				        "id": parseInt(getScanDet[i].jwlId)
				      },
				      "subCategory": {
				        "id": parseInt(getScanDet[i].subCatId)
				      },
				      "category": {},
				      "systemPieces": parseInt(getScanDet[i].pcs),
				      "grossWt": parseFloat(getScanDet[i].gWt),
				      "netWt": parseFloat(getScanDet[i].nWt),
				    }
			    if(getScanDet[i].stockNo != ""){
			    	scanDetFg.push(scanDetailsC);
			    }
		    else{}	
		}
	return scanDetFg;
}	

$("#save").on('click',function(){
	var mType = $("#scMatTypeC").val(); 
	if(mType == "FG"){
	 var rows = $("#jqxgridS").jqxGrid('getrows');
	  if(rows.length == 0){
		  $.growl.error({
			 message : "Please Fill Grid Fields!!",
			 duration : 20000,
			 title : 'Error'
		  });
		  return false;
	  }
	  if(rows.length == 1){
			 for (var i = 0; i < rows.length; i++){
			 if(rows[i].stockNo == "" || rows[i].stockNo == null){
				 $.growl.error({
					 message : "Please Enter Grid Fields",
					 duration : 20000,
					 title : 'Error'
				  });
				  return false;
			 }
			 }
		 }
	 for (var i = 0; i < rows.length; i++){
	  if(rows[i].statusEditableFeild == false){
		  $.growl.error({
			 message : "Please Enter Valid Stock No",
			 duration : 20000,
			 title : 'Error'
		  });
		  return false;
	   }
   }
}
 if(mType == "LS"){
		 var rows = $("#jqxgridL").jqxGrid('getrows');
		 if(rows.length == 0){
			  $.growl.error({
				 message : "Please Fill Grid Fields!!",
				 duration : 20000,
				 title : 'Error'
			  });
			  return false;
		  }
		 if(rows.length == 1){
			 for (var i = 0; i < rows.length; i++){
			 if(rows[i].stockNoC == "" || rows[i].stockNoC == null){
				 $.growl.error({
					 message : "Please Enter Grid Fields",
					 duration : 20000,
					 title : 'Error'
				  });
				  return false;
			 }
			 }
		 }
		 for (var i = 0; i < rows.length; i++){
			  if(rows[i].statusEditableFeildL == false){
				  $.growl.error({
					 message : "Please Enter Valid Stock No",
					 duration : 20000,
					 title : 'Error'
				  });
				  return false;
			   }
		 }
	 }
});
// ################ Create stones Scanning ####################	
function validateScanDetL() {
	var scanDetLs = [];
	var getScanDetS = $('#jqxgridL').jqxGrid('getrows');	
	for (var i = 0; i < getScanDetS.length; i++) {
		var subCat = getScanDetS[i].subCatC;
		
		var scanDetailsL = {
				
				  "serialNo": i+1,
			      "stockNo": parseInt(getScanDetS[i].stockNoC),
			      "articleSegment": {
			        "id": parseInt($("#scSegC").val())
			      },
			      "subCategory": (subCat == "") ? null : {"id":parseInt(getScanDetS[i].subCatId)},
			      "category": {
			    	  "id" : parseInt(getScanDetS[i].catId)
			      },
			      "systemPieces": parseInt(getScanDetS[i].stonePcs),
			      "grossWt": (getScanDetS[i].stoneWt),
			      "netWt": null,
			    }	
				 if(getScanDetS[i].stockNoC != ""){
					 scanDetLs.push(scanDetailsL);
				 }
			    else{}	
			}
	return scanDetLs;
}	

function validateScanDetA() {
	var scanDetLs = [];
	var getScanDetA = $('#jqxgridA').jqxGrid('getrows');	
	for (var i = 0; i < getScanDetA.length; i++) {
		var subCat = getScanDetA[i].subCatA;
		
		var scanDetailsA = {
				
				  "serialNo": i+1,
			      "stockNo": parseInt(getScanDetA[i].stockNoA),
			      "articleSegment": {
			        "id": parseInt($("#scSegC").val())
			      },
			      "subCategory": (subCat == "") ? null : {"id":parseInt(getScanDetA[i].subCatIdA)},
			      "category": {
			    	  "id" : parseInt(getScanDetA[i].catIdA)
			      },
			      "systemPieces": parseInt(getScanDetA[i].accPcsA),
			      "grossWt": parseFloat(getScanDetA[i].accWtA),
			      "netWt" : null,
			    }	
				 if(getScanDetA[i].stockNoA != ""){
					 scanDetLs.push(scanDetailsA);
				 }
			    else{}	
			}
	return scanDetLs;
}	

//Create Started
$('#btnSaveScanDet').click(function() {
	  var validateScanDet;
	  if(($("#scMatTypeC").val() == "FG")){
		  validateScanDet = validateScanDetF();
	  }else if($("#scMatTypeC").val() == "LS"){
		  validateScanDet = validateScanDetL();
	  }else if($("#scMatTypeC").val() == "A"){
		  validateScanDet = validateScanDetA();
	  }
	 var data = {
			 "stockCheckType" : "S",
			 "storeOrDc" : "DC",
			 "materialType" : $("#scMatTypeC").val(),
			 "isCompleted" : true,
			 "zone" : {"id" : parseInt($("#scZoneC").val())},
			 "stockCheckDetails" : validateScanDet,
		 }  
	if (data) {
		postJSON('/OrderExecution/api/v1/createStockScanning',JSON.stringify(data),function(data) {
				if (data.resCode == "1") {
				
					$.growl.notice({
						message : data.mesgStr,
						duration : 20000,
						title : 'Success'
					});
					$('#SaveConfirmation').modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
					redirect();
					
				}else{
					$('#SaveConfirmation').modal('hide');
					$.growl.error({
						message : data.mesgStr,
						duration : 20000,
						title : 'Error'
					});
					return false;
				}
				
	       });
	  }
});


$('#btnDiscardSave').click(function() {
	  var validateScanDet;
	  if(($("#scMatTypeC").val() == "FG")){
		  validateScanDet = validateScanDetF();
	  }else if($("#scMatTypeC").val() == "LS"){
		  validateScanDet = validateScanDetL();
	  }else if($("#scMatTypeC").val() == "A"){
		  validateScanDet = validateScanDetA();
	  }
	 var data = {
			"stockCheckType" : "S",
			"materialType" : $("#scMatTypeC").val(),
			"isCompleted" : true,
			"zone" : {"id" : parseInt($("#scZoneC").val())},
			"stockCheckDetails" : validateScanDet,
			"storeOrDc" : "DC",
		 }  
	 
	if (data) {
		postJSON('/OrderExecution/api/v1/createStockScanning',JSON.stringify(data),function(data) {
				if (data.resCode == "1") {
					$('#SaveConfirmation').modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
					redirect();

					$.growl.notice({
						message : data.mesgStr,
						duration : 20000,
						title : 'Success'
					});
				}else{
					$('#SaveConfirmation').modal('hide');
					
					$.growl.error({
						message : data.mesgStr,
						duration : 20000,
						title : 'Error'
					});
					return false;
				}			
	       });
	  }
});

// ############# FG Create Grid For Weight Check #################
var wtCheckCreateGridFg = function() {
	var rowId = 0;
	var generaterow = function(i) {
	var row = {};
	row["segC"] = "";
	row["articleC"] = "";
	row["jTypeC"] =  "";
	row["stockNo"] =  "";
	row["subCatDesc"] =  "";
	row["pcs"] =  "";
	row["uqc"] =  "";
	row["grossWt"] =  "";
	row["nWt"] =  "";
	row["inputGrossWt"] =  "";
	rowId = rowId + 1;
	return row;
} 
	var source = {
		datafields : [ 
			{'name' :'segC','type' :'string'}, 
			{'name' :'articleC','type' :'string'}, 
			{'name' :'jTypeC','type' :'string'},
			{ 'name' :'stockNo','type' :'int'},
			{'name' :'subCatDesc','type' :'string'},
			{'name' :'pcs','type' :'int'},
			{'name' :'uqc','type' :'int'},
			{'name' :'grossWt','type' :'float'},
			{'name' :'nWt','type' :'float'},
			{'name' :'inputGrossWt','type' :'string'},
			{'name' :'diffWt','type' :'float'},
			{'name' :'segId','type' :'int'},
			{'name' :'jTypeId','type' :'int'},
			{'name' :'subCatId','type' :'int'},
		]};

		$("#jqxgridW").jqxGrid({
		width : '100%',
		editable : true,
		columnsheight : 50,
		theme: 'energyblue',
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<div style="margin-bottom:10px;"  id="addrowbuttonW" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i></div>');
			container.append('<div style="margin-bottom: 10px;" id="deleterowbuttonW" class="btn btn-danger btn-sm pull-right"><i  class="fa fa-trash fa-md"></i></div>');
			
			$("#addrowbuttonW").jqxButton();
			$("#deleterowbuttonW").jqxButton();
			
			$("#addrowbuttonW").on('click',	function() {
				var rowscount = $("#jqxgridW").jqxGrid('getdatainformation').rowscount;
				if (rowscount == 0) {
					var rowId = 1;
				} 
				else {
					var rowId = rowscount + 1;
					var rows = $('#jqxgridW').jqxGrid('getrows');
					for (var i = 0; i < rowscount; i++) {
					if (rows[i].segC == ""
							|| rows[i].jTypeC == ""
							|| rows[i].stockNo == ""
							|| rows[i].subCatDesc == ""
							|| rows[i].pcs == ""
							|| rows[i].uqc == ""
							|| rows[i].grossWt == ""
							|| rows[i].nWt == ""
							|| rows[i].articleC == ""
							||  rows[i].inputGrossWt == ""
							||  rows[i].diffWt == ""
							||  rows[i].segId == ""
							|| rows[i].jTypeId == ""
							|| rows[i].subCatId == "") {
						$.growl.error({
									message : "Grid fields are Mandatory",
									duration : 20000,
									title : 'Error'
								});
						return false;
					}
				}
			}
		var datarow = generaterow(rowId);
		var commit = $("#jqxgridW").jqxGrid('addrow',null, datarow);
			});
			
			$("#deleterowbuttonW").on('click', function() {
				var selectedrowindex = $("#jqxgridW").jqxGrid('getselectedrowindex');
				var rowscount = $("#jqxgridW").jqxGrid('getdatainformation').rowscount;				
				
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var id = $("#jqxgridW").jqxGrid('getrowid', selectedrowindex);
					var commit = $("#jqxgridW").jqxGrid('deleterow', id);
				}
			});
		},
		columns : [
			{ text  :'state Detail Id','datafield': 'statusEditableFeildL','width' : '5%',cellsalign : 'center', hidden:true,
				 cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
							var rows = $("#jqxgridW").jqxGrid("getrows");
							$("#jqxgridW").jqxGrid('setcellvalue', row, 'statusEditableFeildL',false);}
				},
			{'text'  :'Stock No','datafield':  'stockNo','width' : '10%',cellsalign : 'center',align:'center',editable : true,
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) { 
   		    		var stockNo =  $('#jqxgridW').jqxGrid('getcellvalue', row, 'stockNo');
   		    		if(newvalue == null || newvalue == "" ){
	    				$.growl.error({
	    					message : "Please Enter Stock No !!!",
	    					duration  : 20000,
	    					title: 'Error'
	    				});
	    				return "";
	    			}
   		    		else{
   		    		var seg =  parseInt($('#segC').val());
   		    		var jType = parseInt($("#jTypeC").val());
   		    		
   		    		var fieldFilters = {"fieldFilters":{"stockId":parseInt(newvalue),"segId":seg,"jewelId":jType}}      		   
	        		   postJSON('/OrderExecution/api/v1/getStockDetailsById', JSON.stringify(fieldFilters), function(data) {      			   
	        			   if (data.resCode == "1") {
	        				   var rows = $("#jqxgridW").jqxGrid('getrows');
	        					$("#jqxgridW").jqxGrid('setcellvalue', row, 'statusEditableFeildL',true);
	        				   
	        				   var result = data.payload.stockItem;
	        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "segC",result.metalSegment.description);
	        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "articleC",result.segment.description);
	        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "jTypeC",result.jewelTypeDTO.description);
	        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "subCatDesc",result.subCategory.description);
	        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "segId",result.metalSegment.id);
	        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "jTypeId",result.jewelTypeDTO.id);
	        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "subCatId",result.subCategory.id); 
	        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "grossWt",result.grossWeight);
	        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "pcs",result.finishedPieces);
	        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "uqc",result.uqc);
	        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "nWt",result.finishedNetWeight);
	        			  
	        			   
	        			   $("#jqxgridW").jqxGrid('addrow', null, generaterow(rowId + 1));
	        			   }else{  
	        				   
	        				   $("#jqxgridW").jqxGrid('setcellvalue', row, 'statusEditableFeildL',false);
	        				   
	        				   $("#jqxgridW").jqxGrid('setcellvalue', row, "segC","");
	        				   $("#jqxgridW").jqxGrid('setcellvalue', row, "articleC","");
		        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "jTypeC","");
		        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "subCatDesc","");
		        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "segId","");
		        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "jTypeId","");
		        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "subCatId",""); 
		        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "grossWt","");
		        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "pcs","");
		        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "uqc","");
		        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "nWt","");
		        			   $("#jqxgridW").jqxGrid('setcellvalue', row, "diffWt","");
		        			   
	        				   $.growl.error({
	        						message : data.mesgStr,
	        						duration : 20000
	        					});
	        			   }
	        		   });
					}
				}	
			},
			{'text'  :'Article Segment','datafield':  'articleC','width' : '10%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Metal Segment','datafield':  'segC','width' : '10%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Jewel Type','datafield' : 'jTypeC','width'  :'5%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
			{'text'  :'Sub Cat Desc','datafield' : 'subCatDesc','width'  :'25%',sortable  :false,cellsalign : 'center',align:'center',editable:false},
			{'text'  :'UQC','datafield' : 'uqc','width'  :'5%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
			{'text'  :'Pcs','datafield' : 'pcs','width'  :'5%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
			{'text'  :'Gross Wt','datafield' : 'grossWt','width'  :'10%',sortable  :false,cellsalign : 'right',align:'center',editable:  false},
			{'text'  :'Net Wt','datafield' : 'nWt','width'  :'10%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
			{'text'  :'Weighed Wt','datafield' : 'inputGrossWt','width'  :'10%',sortable  :false,cellsalign : 'right',align:'center',editable: true,
				cellbeginedit: checkForMetalType,
				cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
					debugger
					var newvalueDec = parseFloat(newvalue).toFixed(3);
					var tagFlag = $("#tagWtId").prop('checked');
					var gross = $("#jqxgridW").jqxGrid('getcellvalue', row,'grossWt');
					var diffwt = 0;
					var inputwt = 0;
					if(newvalue == null || newvalue == "" ){
						diffwt = null
						return false;
					}
					if(tagFlag){
						inputwt = parseFloat(newvalue) - tagWT
					}else{
						inputwt = parseFloat(newvalue);
					}
					
					diffwt = (inputwt - parseFloat(gross)).toFixed(3);
					$("#jqxgridW").jqxGrid('setcellvalue', row,'diffWt', diffwt);
					$("#jqxgridW").jqxGrid('setcellvalue', row,'inputGrossWt', newvalueDec);
				}
			},
			{'text'  :'Diff Wt','datafield' : 'diffWt','width'  :'10%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
			{'text'  :'','datafield':  'segId',cellsalign : 'center',align:'center',editable : false,hidden : true},
			{'text'  :'','datafield' : 'jTypeId',sortable  :false,cellsalign : 'center',align:'center',editable:  false,hidden : true},
			{'text'  :'','datafield' : 'subCatId',sortable  :false,cellsalign : 'center',align:'center',editable:false,hidden : true},
			
		]
	});
}

//############# Stone Create Grid For Weight Check #################
var wtCheckCreateGridStone = function() {
	var rowId = 0;
	var generaterowL = function(i) {
	var row = {};
	row["segmentDesc"] = "";
	row["catC"] = "";
	row["subCatC"] =  "";
	row["stockNoC"] =  "";
	row["stoneWt"] =  "";
	row["netWt"] =  "";
	row["stonePcs"] =  "";
	row["inputGwt"] =  "";
	row["diffGwt"] =  "";
	row["uqc"] =  "";
	rowId = rowId + 1;
	return row;
} 
	var source = {
		datafields : [ 
		{'name' :'catC','type' :'string'},
		{'name' :'segmentDesc','type' :'string'},
		{'name' :'subCatC','type' :'string'},
		{'name' :'stockNoC','type' :'int'},
		{'name' :'stoneWt','type' :'int'},
		{'name' :'netWt','type' :'int'},
		{'name' :'stonePcs','type' :'int'},
		{'name' :'inputGwt','type' :'float'},
		{'name' :'diffGwt','type' :'float'},
		{'name' :'uqc','type' :'string'},
		{'name' :'catId','type' :'int'},
		{'name' :'subCatId','type' :'int'},
		]};
	
		$("#jqxgridWC").jqxGrid({
		width : '100%',
		editable : true,
		columnsheight : 50,
		theme: 'energyblue',
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<div style="margin-bottom:10px;"  id="addrowbutton" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i></div>');
			container.append('<div style="margin-bottom: 10px;" id="deleterowbutton" class="btn btn-danger btn-sm pull-right"><i  class="fa fa-trash fa-md"></i></div>');
			
			$("#addrowbutton").jqxButton();
			$("#deleterowbutton").jqxButton();
			
			$("#addrowbutton").on('click',	function() {
				var rowscount = $("#jqxgridWC").jqxGrid('getdatainformation').rowscount;
				if (rowscount == 0) {
					var rowId = 1;
				} 
				else {
					var rowId = rowscount + 1;
					var rows = $('#jqxgridWC').jqxGrid('getrows');
					for (var i = 0; i < rowscount; i++) {
					if (rows[i].catC == ""
							|| rows[i].subCatC == ""
							|| rows[i].segmentDesc == ""
							|| rows[i].stockNoC == ""
							|| rows[i].stoneWt == ""
							|| rows[i].netWt == ""
							|| rows[i].stonePcs == ""
							|| rows[i].uqc == ""
							||  rows[i].inputGwt == ""
							||  rows[i].diffGwt == ""
							||  rows[i].catId == ""
							|| rows[i].subCatId == "") {
						$.growl.error({
									message : "Grid fields are Mandatory",
									duration : 20000,
									title : 'Error'
								});
						return false;
					}
				}
			}
		var datarow = generaterowL(rowId);
		var commit = $("#jqxgridWC").jqxGrid('addrow',null, datarow);	
			});
			
			$("#deleterowbutton").on('click', function() {
				var selectedrowindex = $("#jqxgridWC").jqxGrid('getselectedrowindex');
				var rowscount = $("#jqxgridWC").jqxGrid('getdatainformation').rowscount;				
				
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var id = $("#jqxgridWC").jqxGrid('getrowid', selectedrowindex);
					var commit = $("#jqxgridWC").jqxGrid('deleterow', id);
				}
			});
		},
		columns : [
			{ text  :'state Detail Id','datafield': 'statusEditableFeildW',cellsalign : 'center', hidden:true,
				 cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
							var rows = $("#jqxgridWC").jqxGrid("getrows");
							$("#jqxgridWC").jqxGrid('setcellvalue', row, 'statusEditableFeildW',false);}
				},
			{'text'  :'Stock No','datafield':  'stockNoC','width' : '10%',cellsalign : 'center',align:'center',editable : true,
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) { 
   		    		var stockNo =  $('#jqxgridWC').jqxGrid('getcellvalue', row, 'stockNoC');
   		    		if(newvalue == null || newvalue == "" ){
	    				$.growl.error({
	    					message : "Please Enter Stock No !!!",
	    					duration  : 20000,
	    					title: 'Error'
	    				});
	    				return "";
	    			}
   		    		
   		    		else{
   		    		var seg =  parseInt($('#segC').val());
   		    		
   		    		var fieldFilters = {"fieldFilters":{"stockId":parseInt(newvalue),"segId":seg,}}      		   
	        		   postJSON('/OrderExecution/api/v1/getLooseStoneStockDetailsById', JSON.stringify(fieldFilters), function(data) {
	        			   if (data.resCode == "1") {
	        				   var rows = $("#jqxgridWC").jqxGrid('getrows');
	        					$("#jqxgridWC").jqxGrid('setcellvalue', row, 'statusEditableFeildW',true);
	        				   
	        				   var result = data.payload.stockItem;
		        			   var category = result.category;
		        		   $("#jqxgridWC").jqxGrid('setcellvalue', row, "segmentDesc",result.stoneSegment.description);
	        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "catC",result.stoneCategory.name);
	        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "catId",result.stoneCategory.id);
	        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "stoneWt",result.weight);
	        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "netWt",null);
	        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "stonePcs",result.pieces);
	        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "uqc",result.uom.id);
		        			   if(category != null){
			        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "subCatC",result.category.name);
			        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "subCatId",result.category.id);
		        			   }else{
		        				   $("#jqxgridWC").jqxGrid('setcellvalue', row, "subCatC",result.subCategoryDescription);
		        			   }
	        			  
	        			  $("#jqxgridWC").jqxGrid('addrow', null, generaterowL(rowId + 1));
	        			   }else{
	        				   $("#jqxgridWC").jqxGrid('setcellvalue', row, 'statusEditableFeildW',false);
	        				   $("#jqxgridWC").jqxGrid('setcellvalue', row, "segmentDesc","");
	        				   $("#jqxgridWC").jqxGrid('setcellvalue', row, "catC","");
		        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "catId","");
		        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "stoneWt","");
		        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "netWt","");
		        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "stonePcs","");
		        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "uqc","");
		        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "subCatC","");
		        			   $("#jqxgridWC").jqxGrid('setcellvalue', row, "subCatId","");
		        			   
	        				   $.growl.error({
	        						message : data.mesgStr,
	        						duration : 20000,
	        						title : 'Error'
	        					});
	        			   }
	        		   });
					}
				}	
			},
			{'text'  :'Segment','datafield':  'segmentDesc','width' : '10%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Category','datafield':  'catC','width' : '10%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Sub Cat','datafield':  'subCatC','width' : '30%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'UQC','datafield':  'uqc','width' : '10%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Stone Pcs','datafield':  'stonePcs','width' : '10%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Stone Wt','datafield' : 'stoneWt','width'  :'10%',sortable  :false,cellsalign : 'right',align:'center',editable:  false},
			{'text'  :'Net Wt','datafield' : 'netWt',sortable  :false,cellsalign : 'right',align:'center',editable:  false,hidden:true},			
			{'text'  :'Weighed Wt','datafield' : 'inputGwt','width'  :'10%',sortable  :false,cellsalign : 'right',align:'center',editable: true,
				cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {					
					var tagFlag = $("#tagWtId").prop('checked');
					var gross = $("#jqxgridWC").jqxGrid('getcellvalue', row,'stoneWt');
					var diffwt = 0.000;
					var inputwt = 0.000;
					if(newvalue == null || newvalue == "" ){
						diffwt = null
						return false;
					}
					if(tagFlag){
						inputwt = parseFloat(newvalue) - tagWT
					}else{
						inputwt = parseFloat(newvalue);
					}
					
					diffwt = (inputwt - parseFloat(gross)).toFixed(3);
					$("#jqxgridWC").jqxGrid('setcellvalue', row,'diffGwt', diffwt);
				}
			},
			{'text'  :'Diff Wt','datafield' : 'diffGwt','width'  :'10%',sortable  :false,cellsalign : 'right',align:'center',editable: false},
			{'text'  :'','datafield' : 'subCatId',sortable  :false,cellsalign : 'center',align:'center',editable:  false,hidden : true},
			{'text'  :'','datafield':  'catId',cellsalign : 'center',align:'center',editable : false,hidden : true},
		]
	});
}

// create Weight Check Started
function validateWcDetF() {
	var wcDetFg = [];
	var getWcDet = $('#jqxgridW').jqxGrid('getrows');
	var tagFlag = $("#tagWtId").prop('checked');
	console.log(tagFlag)
	for (var i = 0; i < getWcDet.length; i++) {
		var wcDetailsC = {
					
				  "serialNo" : i+1,
			      "stockNo": parseInt(getWcDet[i].stockNo),
			      "metalSegment": {
			        "id": parseInt($("#segC").val())
			      },
			      "articleSegment": {
			        "id": parseInt(getWcDet[i].segId)
			      },
			      "jewelType": {
			        "id": parseInt(getWcDet[i].jTypeId)
			      },
			      "subCategory": {
			        "id": parseInt(getWcDet[i].subCatId)
			      },
			      "category": {},
			      "systemPieces": parseInt(getWcDet[i].pcs),
			      "grossWt": parseFloat(getWcDet[i].grossWt),
			      "netWt": parseFloat(getWcDet[i].nWt),
			      "weighedWt" : (tagFlag == true) ? (parseFloat(getWcDet[i].inputGrossWt) - tagWT) : parseFloat(getWcDet[i].inputGrossWt)
			    }	   
			    if(getWcDet[i].stockNo != ""){
			    	wcDetFg.push(wcDetailsC);
			    }else{}
		    
		}
	return wcDetFg;
}	

function validateWcDetS() {
	var WcDetLs = [];
	var getWcDetS = $('#jqxgridWC').jqxGrid('getrows');
	var tagFlag = $("#tagWtId").prop('checked');
	for (var i = 0; i < getWcDetS.length; i++) {
		var subCat = getWcDetS[i].subCatId;
		var wcDetailsL = {
				
				  "serialNo" : i+1,
			      "stockNo": parseInt(getWcDetS[i].stockNoC),
			      "articleSegment": {
			        "id": parseInt($("#segC").val())
			      },
			      "subCategory": (subCat == "") ? null : {"id":parseInt(getWcDetS[i].subCatId)}, 
			      "category": {
			    	  "id" : parseInt(getWcDetS[i].catId)
			      },
			      "systemPieces": parseInt(getWcDetS[i].stonePcs),
			      "grossWt": parseFloat(getWcDetS[i].stoneWt),
			      "netWt": null,
			      "weighedWt" : (tagFlag == true) ? (parseFloat(getWcDetS[i].inputGwt) - tagWT) : parseFloat(getWcDetS[i].inputGwt)
			    }	   
			if(getWcDetS[i].stockNoC){
				WcDetLs.push(wcDetailsL);
			} else{}
		
		}
	return WcDetLs;
}	


//Create Started
$('#btnSaveWcDet').click(function() {
	var data = {
			"stockCheckType" : "W",
			"materialType" : $("#matTypeC").val(),
			"isCompleted" : true,
			"zone" : {"id" : parseInt($("#wcZoneC").val())},
			"stockCheckDetails" : ($("#matTypeC").val() == "FG") ? validateWcDetF() : validateWcDetS(),	
			"storeOrDc" : "DC",
		 }  
	if (data) {
		postJSON('/OrderExecution/api/v1/createStockScanning',JSON.stringify(data),function(data) {
				if (data.resCode == "1") {
					$('#SaveConfirmationWc').modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
					redirect();
					
					$.growl.notice({
						message : data.mesgStr,
						duration : 20000,
						title : 'Success'
					});
				}else{
					$('#SaveConfirmationWc').modal('hide');
					$.growl.error({
						message : data.mesgStr,
						duration : 20000,
						title : 'Error'
					});
					return false;
				}			
	       });
	  }
});

$('#btnDiscardSaveWc').click(function() {
	var data =  {
			"stockCheckType" : "W",
			"materialType" : $("#matTypeC").val(),
			"isCompleted" : false,
			"zone" : {"id" : parseInt($("#wcZoneC").val())},
			"stockCheckDetails" : ($("#matTypeC").val() == "FG") ? validateWcDetF() : validateWcDetS(),
		    "storeOrDc" : "DC",
		 }  
	if (data) {
		postJSON('/OrderExecution/api/v1/createStockScanning',JSON.stringify(data),function(data) {
				if (data.resCode == "1") {
					$('#SaveConfirmationWc').modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
					redirect();
					
					$.growl.notice({
						message : data.mesgStr,
						duration : 20000,
						title : 'Success'
					});
				}else{
					$('#SaveConfirmationWc').modal('hide');
					$.growl.error({
						message : data.mesgStr,
						duration : 20000,
						title : 'Error'
					});
					return false;
				}			
	       });
	  }
});

$("#saveWc").on('click',function(){
	var mType = $("#matTypeC").val(); 
	if(mType == "FG"){
	 var rows = $("#jqxgridW").jqxGrid('getrows');
	 if(rows.length == 0){
		  $.growl.error({
			 message : "Please Fill Grid Fields!!",
			 duration : 20000,
			 title : 'Error'
		  });
		  return false;
	  }
	 if(rows.length == 1){
		 for (var i = 0; i < rows.length; i++){
		 if(rows[i].stockNo == "" || rows[i].stockNo == null){
			 $.growl.error({
				 message : "Please Enter Grid Fields",
				 duration : 20000,
				 title : 'Error'
			  });
			  return false;
		 }
		}
	 }
	 for (var i = 0; i < rows.length; i++){	
		
		  if(rows[i].statusEditableFeildL == false){
			  $.growl.error({
				 message : "Please Enter Valid Stock No",
				 duration : 20000,
				 title : 'Error'
			  });
			  return false;
		   }
	 }
	}
	if(mType == "LS"){
		 var rows = $("#jqxgridWC").jqxGrid('getrows');
		 if(rows.length == 0){
			  $.growl.error({
				 message : "Please Fill Grid Fields!!",
				 duration : 20000,
				 title : 'Error'
			  });
			  return false;
		  }
		 if(rows.length == 1){
			 for (var i = 0; i < rows.length; i++){
			 if(rows[i].stockNoC == "" || rows[i].stockNoC == null){
				 $.growl.error({
					 message : "Please Enter Grid Fields",
					 duration : 20000,
					 title : 'Error'
				  });
				  return false;
			 }
			 }
		 }
		
		 for (var i = 0; i < rows.length; i++){
		  if(rows[i].statusEditableFeildW == false){
			  $.growl.error({
				 message : "Please Enter Valid Stock No",
				 duration : 20000,
				 title : 'Error'
			  });
			  return false;
		   }
		  else{  
		  }	
		 }
	 }
});




$("#addW").on('click',function(){
	var materialType = $("#matTypeC").val();
	var segm = $("#segC").val();
	var jewType = $("#jTypeC").val();
		if(materialType == "" || materialType == null || segm == "" || segm == null){
			$.growl.error({
				message : "Please Fill Mandatory Fields",
				duration : 20000,
				title : 'Error'
			});
			return false;
		}
		else{
			$("#addW").prop('disabled', true);
			$("#footerHideWc").show();	
			$("#matTypeC").prop('disabled', true);
			$("#segC").prop('disabled', true);
			$("#jTypeC").prop('disabled', true);
			 if(materialType == "FG"){
				 if(segm != "" || segm != null ){
						if(jewType == "" || jewType == null){
							$("#addW").prop('disabled', false);
							$("#matTypeC").prop('disabled', false);
							$("#scSegC").prop('disabled', false);
							$("#segC").prop('disabled', false);
							$("#jTypeC").prop('disabled', false);
							$("#footerHideWc").hide();
							$.growl.error({
							 message : "Please Enter Jewel Type",
							 duration : 10000,
							 title : 'Error'
							});
							return false;
						}
					}
				wtCheckCreateGridFg();
				$("#jqxgridW").show();
			 }
			 if(materialType == "LS"){
				 wtCheckCreateGridStone();
				 $("#jqxgridWC").show();
			 }
		}
});


//###############  Search Grid ################## 
function scanOrWtCheckSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ 
		{'name' : 'createdDate','type' : 'date','map'  : 'createdDate'},
		{'name' : 'stCheckId','type' : 'int','map'  : 'stockCheckHeader>id'},
		{'name' : 'matType','type' : 'string','map'  : 'stockCheckHeader>materialType'},
		{'name' : 'metalType','type' : 'string','map'  : 'metalSegment>description'},
		
		{'name' : 'artSeg','type' : 'string','map'  : 'articleSegment>description'}, 
		{'name' : 'subCatDesc','type' : 'string','map'  : 'subCategory>description'},
		{'name' : 'stockNo','type' : 'int','map'  : 'stockNo'},
		{'name' : 'jwCode','type' : 'string','map'  : 'vendor>id'},
		{'name' : 'jewelType','type' : 'string','map'  : 'jewelType>description'},
		
		{'name' : 'grossWt','type' : 'float','map'  : 'grossWt'},
		{'name' : 'netWt','type' : 'float','map'  : 'netWt'},
		{'name' : 'uqc','type' : 'int','map'  : 'uqc'},
		{'name' : 'pcs','type' : 'int','map'  : 'systemPieces'},
		{'name' : 'currentZoneId','type' : 'int','map'  : 'zone>description'},
		
		{'name' : 'inputGwt','type' : 'float','map'  : 'weighedWt'},
		{'name' : 'diffrence','type' : 'float','map'  : 'difference'}
		];
	
	var columns = [ 
		{'text' : 'Created Date','datafield' : 'createdDate','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Stock Check Id','datafield' : 'stCheckId','width' : '3%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Material Type','datafield' : 'matType','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Metal Seg','datafield' : 'metalType','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},		
		{'text' : 'Article Seg','datafield' : 'artSeg','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Stock No','datafield' : 'stockNo','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'JW Code','datafield' : 'jwCode','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Jewel Type','datafield' : 'jewelType',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '9%'},
		{'text' : 'Sub Cat Desc','datafield' : 'subCatDesc','width' : '15%',sortable : false,editable : false,cellsalign : 'left',align : 'center'}, 
		{'text' : 'UQC','datafield' : 'uqc',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '3%'}, 
		{'text' : 'Pcs','datafield' : 'pcs',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '3%'}, 		
		{'text' : 'Gross/ Stone/ Acc Wt','datafield' : 'grossWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '6%',cellsformat : 'd3'},
		{'text' : 'Net Wt','datafield' : 'netWt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '6%',cellsformat : 'd3'}, 		
		{'text' : 'Weighed Gross/ Stone/ Acc Wt','datafield' : 'inputGwt',editable : false,cellsalign : 'right',align : 'center',sortable : false,'width' : '7%',cellsformat : 'd3'}, 
		{'text' : 'Difference Wt','datafield' : 'diffrence',editable : false,	cellsalign : 'right',	align : 'center',sortable : false,'width' : '6%',cellsformat : 'd3'},
		{'text' : 'Current Zone Id','datafield' : 'currentZoneId',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '8%'}
		];
		showMyGrid(datafields,"/OrderExecution/api/v1/searchWeightCheck", "list",columns,scanOrWtCheckFieldFilters(), updateRows, "");
		$("#jqxgrid").jqxGrid({
		 sortable: true,            
	     altrows: true,
		 columnsresize: true, 
		 rowsheight : 35,
		 theme: 'energyblue',
		 autorowheight :true,
	     autoheight :true,
	     columnsheight: 50,
		 rowdetails : true,
		 virtualmode : true,
		 pageable: true
	});
}

$("#fg").hide();

$("#search").on('click',function(){
	var fDate = $("#fromDateS").val();
	var tDate = $("#toDateS").val();
	var matType = $("#matTypeS").val();
	var type = $("#type").val();
	var seg = $("#segS").val();
	if(fDate == "" || fDate == null || tDate == "" || tDate == null || matType == "" || matType == null || type == null || type == "" || seg == "" || seg == null){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 20000,
			title : 'Error'
		});
		return false;
	}
		/*if(matType == "FG"){
			
			
			if(seg == "" || seg == null){
				$.growl.error({
					message : "Please Select Segment !!",
					duration : 20000,
					title : 'Error'
				});
				return false;
			}
		}*/ 
		//seg is manadatory for all mat type done changes as per req told by nagesh
	scanOrWtCheckSearchGrid();
	$("#jqxgrid").show();
});

//Export function for Adjustment Voucher
$("#export").on("click",function() {
	var data;
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	var rows = $('#jqxgrid').jqxGrid('getrows');
		if (rows == undefined || rows == 0 ) {
			$.growl.error({
				message : "No Data To Export",
				duration : 10000
			});
			return false;
		}else{
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		  if(rows.rowscount != 0){
			var newData = [];					
			  postJSON('/OrderExecution/api/v1/searchWeightCheck?page=export',JSON.stringify(scanOrWtCheckFieldFilters()),function(response) {
				data = response.payload.list;
					for (i = 0; i < data.length; i++) {
					 newData.push({	
						'Created Date' : (data[i].createdDate != null) ? data[i].createdDate : "",
						'Stock Check Id' : (data[i].stockCheckHeader != null) ? data[i].stockCheckHeader.id : "",
						'Material Type' : (data[i].stockCheckHeader != null) ? data[i].stockCheckHeader.materialType : "",
						'Metal Type' : (data[i].metalSegment != null) ? data[i].metalSegment.description : "",
						'Article Segment' : (data[i].articleSegment != null) ? data[i].articleSegment.description : "",						
						'Stock No' : (data[i].stockNo != null) ? data[i].stockNo : "",	
						'JwCode' : (data[i].vendor != null) ? data[i].vendor.id : "",
						'Jewel Type' : (data[i].jewelType != null) ? data[i].jewelType.description : "",
						'Subcat Desc' : (data[i].subCategory != null) ? data[i].subCategory.description : "",
						'UQC' : (data[i].uqc != null) ? data[i].uqc : "",		
						'Pieces' : (data[i].systemPieces != null) ? data[i].systemPieces : "",
						'Gross/ Stone/ Acc Wt.' : (data[i].grossWt != null) ? data[i].grossWt.toFixed(3) : "",
						'Net Wt' : (data[i].netWt != null) ? data[i].netWt.toFixed(3) : "",											
						'Weighed Gross/ Stone/ Acc Wt' : (data[i].weighedWt != null) ?data[i].weighedWt.toFixed(3) : "",
						'Difference Wt' : (data[i].difference != null) ?data[i].difference.toFixed(3) : "",
						'Current Zone' : (data[i].zone != null) ?data[i].zone.description	: "",
						});
					}
					 var opts = [{sheetid:'Scanning/Weight Check Report',header:true}];
                     var res = alasql('SELECT * INTO XLSX("Scanning WeightCheck Report_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
					});	
			}else{
			   $.growl.error({
					message : "No Data To Export",
					duration : 10000
				});
			   return false;	
			}
		}
});


//Clear grid and reset input and Drop down value
$("#clearAll").on('click', function() {
	redirect();
});

$("#clearSc").on('click', function() {
	window.location.href="javascript:showContentPage('scanningOrWtCheckCreate', 'bodySwitcher')";
});

$("#clear").on('click', function() {
	window.location.href="javascript:showContentPage('scanningOrWtCheckCreate', 'bodySwitcher')";
});

var checkForMetalType = function(row)
{
	$(document).keydown(function(event) {
	
		if(event.which == 113){
		test();
		$(document).on("socketMsg", socketHandler);
			function socketHandler(e) {
				if(e.message.ErrorCode == "0" ){
					$("#jqxgridW").jqxGrid('setcellvalue', row, "grossWt", e.message.Weight);
				}else{
					$.growl.error({
						message : e.message.ErrorMessage,
						duration : 10000,
						title : 'Error'
					});
				}
			}
		}
	});
}
