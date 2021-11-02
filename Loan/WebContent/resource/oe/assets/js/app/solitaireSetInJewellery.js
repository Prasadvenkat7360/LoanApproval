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


var storeList = [];
var dcList = [];

// on Load Lov's
var onLoadFunction = function() {
$.getJSON('/OrderExecution/api/v1/solitaireSetInJewelLOV',function(data) {
		var artSeg = data.payload.articleMasters;
		stockNo = data.payload.stockItems;
		 storeList = data.payload.store;
		 dcList = data.payload.dcList;
		 
		// lov for Status
		$('#statusS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.status, function(key, val) {
			$('#statusS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		
		//Store/Dc
			var s = '<select id="storeDcObj"  name="storeDcObj" class="form-control" multiple="multiple">';
			$("#storeDcNameS").html(s);
			$('#storeDcObj').multiselect({
				includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
			    buttonClass : 'col-md-12 form-control text-left'
			});
			
		// article Segment Lov
		var a = '<select id="artSegObj"  name="artSegObj" class="form-control" multiple="multiple">';
			$.each(artSeg, function(key, val) {
			a += '<option value="' + val.id + '">' + val.description + '</option>'; });
			a += '</select>';
			$("#artSegmentS").html(a);
			$('#artSegObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			//enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
		
		// stone segment = Diamond
		$("#stoneSegS").val(data.payload.segmentdto.description);
		$("#stoneSegId").val(data.payload.segmentdto.id);
		
		// lov for category
		$('#stoneCatS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.stCategory, function(key, val) {
			$('#stoneCatS').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
		 
	    // smart search for stock no
		var data = [];
		$.each(stockNo, function(key, value) {
		data.push({
			value : value.id,
			});
		});
		$(function() {
			$("#stockNoS").autocomplete({
				source : data,
				focus : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
				},
				 select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
					$("#stockNoS-value").val(ui.item.value);
					}
				});
			});
		});
}
onLoadFunction();

$("#storeOrDc").on("change",function() {
	var id = $("#storeOrDc").val();
	if(id != null || id != ""){
		var storeDcList = [];
		
		if(id == "Store"){
			storeDcList = storeList;
		}else{
			storeDcList = dcList;
		}
		var s = '<select id="storeDcObj"  name="storeDcObj" class="form-control" multiple="multiple">';
		$.each(storeDcList, function(key, val) {
		s += '<option value="' + val.id + '">' + val.name + '</option>'; });
		s += '</select>';
		$("#storeDcNameS").html(s);
		$('#storeDcObj').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	}
});
 

// on Change of Article Segment Load Jewel Code
$("#jCode").hide();
$("#artSegmentS").on("change",function() {
	$("#jCode").show();
	var segmentObj = $("#artSegObj").val();
	
	if(segmentObj != null){
		segmentObj = segmentObj.join(',');
		segmentObj = segmentObj.toString();
	}
	var params = {
		"segments" : segmentObj
	};
	
	if(params.segments == null){
		var jt = '<select id="jewelCodeObj"  name="jewelCodeObj" class="form-control" multiple="multiple">';
		$("#jewelCodeS").html(jt);
		$('#jewelCodeObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
		    buttonClass : 'col-md-12 form-control text-left'
		});
	}
	else{
		postJSON('/OrderExecution/api/v1/getJewelTypesForSegs', JSON.stringify(params), function(data) {
			var j = '<select id="jewelCodeObj"  name="jewelCodeObj" class="form-control" multiple="multiple">';
			$.each(data.payload.jewelTypes, function(key, val) {
			j += '<option value="' + val.id + '">' + val.name + '</option>'; });
			j += '</select>';
			$("#jewelCodeS").html(j);
			$('#jewelCodeObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
	});
   }
});	


// on Change of Stone Category Load Shape,Clarity,Color,Actual Color,Cut Grade
$("#shape").hide();
$("#clarity").hide();
$("#color").hide();
$("#actCol").hide();
$("#cutGrade").hide();
$("#fromRange").hide();
$("#toRange").hide();

$("#stoneCatS").on("change",function() {
	$("#shape").show();
	$("#clarity").show();
	$("#color").show();
	$("#actCol").show();
	$("#cutGrade").show();
	$("#fromRange").show();
	$("#toRange").show();
	
	var id = $("#stoneCatS").val();
	$.getJSON('/OrderExecution/api/v1/getLOVByCategory?categoryId=' + id,function(data) {
		var shape = data.payload.shape;
		var clarity = data.payload.clarity;
		var color = data.payload.color;
		var actualCol = data.payload.actualColor;
		var cutGrade = data.payload.cutGrade;	
		if (id != "") {
			
			// shape LOV
			var s = '<select id="shapeObj"  name="shapeObj" class="form-control" multiple="multiple">';
			$.each(data.payload.shape, function(key, val) {
			s += '<option value="' + val.id + '">' + val.description + '</option>'; });
			s += '</select>';
			$("#shapeS").html(s);
			$('#shapeObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
	 
			// Clarity LOV
			var c = '<select id="clarityObj"  name="clarityObj" class="form-control" multiple="multiple">';
			$.each(data.payload.clarity, function(key, val) {
			c += '<option value="' + val.id + '">' + val.id + '</option>'; });
			c += '</select>';
			$("#clarityS").html(c);
			$('#clarityObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			// Color LOV
			var l = '<select id="colorObj"  name="colorObj" class="form-control" multiple="multiple">';
			$.each(data.payload.color, function(key, val) {
			l += '<option value="' + val.id + '">' + val.id + '</option>'; });
			l += '</select>';
			$("#colorS").html(l);
			$('#colorObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			// Actual Color LOV
			var a = '<select id="actColObj"  name="actColObj" class="form-control" multiple="multiple">';
			$.each(data.payload.actualColor, function(key, val) {
			a += '<option value="' + val.id + '">' + val.id + '</option>'; });
			a += '</select>';
			$("#actColS").html(a);
			$('#actColObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
			// Cut Grade LOV
			var g = '<select id="cutGradeObj"  name="cutGradeObj" class="form-control" multiple="multiple">';
			$.each(data.payload.cutGrade, function(key, val) {
			g += '<option value="' + val.id + '">' + val.id + '</option>'; });
			g += '</select>';
			$("#cutGradeS").html(g);
			$('#cutGradeObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});	
			
			// From Caret Range LOV
			var f = '<select id="fCaratRangeObj"  name="fCaratRangeObj" class="form-control" multiple="multiple">';
			$.each(data.payload.weightSlab, function(key, val) {
			f += '<option value="' + val.id + '">' + val.id + '</option>'; });
			f += '</select>';
			$("#fromCaratRangeS").html(f);
			$('#fCaratRangeObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});	
			
			// To Carat Range LOV
			var t = '<select id="tCaratRangeObj"  name="tCaratRangeObj" class="form-control" multiple="multiple">';
			$.each(data.payload.weightSlab, function(key, val) {
			t += '<option value="' + val.name + '">' + val.name + '</option>'; });
			t += '</select>';
			$("#toCaratRangeS").html(t);
			$('#tCaratRangeObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});	
		}
	});
});

$("#td").hide();
$("#fd").hide();
$("#statusS").on('change',function(){
	if($("#statusS").val() == "B" || $("#statusS").val() == "TOP"){
		$("#td").show();
		$("#fd").show();
	}else{
		$("#td").hide();
		$("#fd").hide();
	}
});
//Field Filters
var solitaireSetJewelFieldFilters = function() {
	var statusS = $('#statusS').val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var storeOrDc = $('#storeOrDc').val();
	var stockNoS = $('#stockNoS').val();
	var stoneSegS = $('#stoneSegS').val();
	var stoneCatS = $('#stoneCatS').val();
	var storeDcNameS = $('#storeDcNameS').val();
	var artSegmentS = $('#artSegmentS').val();
	var jewelCodeS = $('#jewelCodeS').val();
	var shapeS = $('#shapeS').val();
	var fromCaratRangeS = $('#fromCaratRangeS').val();
	var toCaratRangeS = $('#toCaratRangeS').val();
	var clarityS = $('#clarityS').val();
	var colorS = $('#colorS').val();
	var actColS = $('#actColS').val();
	var cutGradeS = $('#cutGradeS').val();


	fieldFilters = {
		"fieldFilters" : {}
	};
	if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["status"] = statusS;
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromdate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["endDate"] = toDateS;
	}	
	if (storeOrDc != "" && storeOrDc != null) {
		fieldFilters.fieldFilters["storeOrDc"] = storeOrDc;
	}
	var storeDcObj = $('#storeDcObj').val();
	if (storeDcObj == null || storeDcObj == "") {
		var storeDcNameS = "";
	} else {
		var storeDcNameS = storeDcObj.join(",");
	}
	if (storeDcNameS != "" && storeDcNameS != null) {
		fieldFilters.fieldFilters["storeOrDcId"] = storeDcNameS;
	}
	var artSegObj = $('#artSegObj').val();
	if (artSegObj == null || artSegObj == "") {
		var artSegmentS = "";
	} else {
		var artSegmentS = artSegObj.join(",");
	}
	if (artSegmentS != "" && artSegmentS != null) {
		fieldFilters.fieldFilters["metalSegment"] = artSegmentS;
	}
	var jewelCodeObj = $('#jewelCodeObj').val();
	if (jewelCodeObj == null || jewelCodeObj == "") {
		var jewelCodeS = "";
	} else {
		var jewelCodeS = jewelCodeObj.join(",");
	}
	if (jewelCodeS != "" && jewelCodeS != null) {
		fieldFilters.fieldFilters["jeweltype"] = jewelCodeS;
	}
	if (stockNoS != "" && stockNoS != null) {
		fieldFilters.fieldFilters["id"] = stockNoS;
	}
	/*if (stoneSegS != "" && stoneSegS != null) {
		fieldFilters.fieldFilters[""] = stoneSegS;
	}*/
	if (stoneCatS != "" && stoneCatS != null) {
		fieldFilters.fieldFilters["catId"] = stoneCatS;
	}
	var shapeObj = $('#shapeObj').val();
	if (shapeObj == null || shapeObj == "") {
		var shapeS = "";
	} else {
		var shapeS = shapeObj.join(",");
	}
	if (shapeS != "" && shapeS != null) {
		fieldFilters.fieldFilters["shape"] = shapeS;
	}
	var fCaratRangeObj = $('#fCaratRangeObj').val();
	if (fCaratRangeObj == null || fCaratRangeObj == "") {
		var fromCaratRangeS = "";
	} else {
		var fromCaratRangeS = fCaratRangeObj.join(",");
	}
	if (fromCaratRangeS != "" && fromCaratRangeS != null) {
		fieldFilters.fieldFilters["fromweight"] = fromCaratRangeS;
	}
	var tCaratRangeObj = $('#tCaratRangeObj').val();
	if (tCaratRangeObj == null || tCaratRangeObj == "") {
		var toCaratRangeS = "";
	} else {
		var toCaratRangeS = tCaratRangeObj.join(",");
	}
	if (toCaratRangeS != "" && toCaratRangeS != null) {
		fieldFilters.fieldFilters["toWeight"] = toCaratRangeS;
	}
	var clarityObj = $('#clarityObj').val();
	if (clarityObj == null || clarityObj == "") {
		var clarityS = "";
	} else {
		var clarityS = clarityObj.join(",");
	}
	if (clarityS != "" && clarityS != null) {
		fieldFilters.fieldFilters["clarity"] = clarityS;
	}
	var colorObj = $('#colorObj').val();
	if (colorObj == null || colorObj == "") {
		var colorS = "";
	} else {
		var colorS = colorObj.join(",");
	}
	if (colorS != "" && colorS != null) {
		fieldFilters.fieldFilters["color"] = colorS;
	}
	var actColObj = $('#actColObj').val();
	if (actColObj == null || actColObj == "") {
		var actColS = "";
	} else {
		var actColS = actColObj.join(",");
	}
	if (actColS != "" && actColS != null) {
		fieldFilters.fieldFilters["actcolor"] = actColS;
	}
	var cutGradeObj = $('#cutGradeObj').val();
	if (cutGradeObj == null || cutGradeObj == "") {
		var cutGradeS = "";
	} else {
		var cutGradeS = cutGradeObj.join(",");
	}
	if (cutGradeS != "" && cutGradeS != null) {
		fieldFilters.fieldFilters["cutgrade"] = cutGradeS;
	}
	fieldFilters.fieldFilters["portal"] = "OE";
	return fieldFilters;
}


//Search grid 
function solitaireSetJewelleryGrid() {

	var updateRows = function(rowid, newdata, commit) {

	}
	var datafields =  [
		{'name' : 'storeDc','type' : 'string','map' : 'storeOrDC'},
		{'name' : 'stockNo','type' : 'int','map' : 'id'},
		{'name' : 'artSeg','type' : 'string','map' : 'segId>description'}, 
		{'name' : 'jewelCode','type' : 'string','map' : 'jewelType>description'},
		{'name' : 'mainCat','type' : 'string','map' : ''},
		{'name' : 'subCat','type' : 'string','map' : ''},
		{'name' : 'vCode','type' : 'string','map' : 'vendor>name'},
		{'name' : 'pcs','type' : 'int','map' : 'finishedPieces'},
		{'name' : 'gWt','type' : 'float','map' : 'grossWeight'},
		{'name' : 'nWt','type' : 'float','map' : 'finishedNetWeight'},
		{'name' : 'stComb','type' : 'string','map' : 'StoneComb'},
		{'name' : 'artPhotoNo','type' : 'int','map' : 'photo'},
		{'name' : 'labName','type' : 'string','map' : 'labName'},
		{'name' : 'certNo','type' : 'string','map' : 'labCertificateNos'},
		{'name' : 'totalSellingPrice','type' : 'float','map' : 'inActivePrice'},
		{'name' : 'status','type' : 'string','map' : 'status'},
		{'name' : 'grDate','type' : 'string','map' : 'grDate'},		
		{'name' : 'stones','type' : 'array'}
		];
	var columns = [ 
		{'text' : 'Store/DC','datafield' : 'storeDc','width' : '12%',editable : false,cellsalign : 'center',align : 'center',sortable : true},
		{'text' : 'Stock No','datafield' : 'stockNo','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : true},
		{'text' : 'Article Segment','datafield' : 'artSeg','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Jewel Code','datafield' : 'jewelCode','width' : '5%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Main Cat','datafield' : 'mainCat','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',hidden  :true}, 
		{'text' : 'Sub Cat','datafield' : 'subCat','width' : '10%',editable : false,sortable : false,cellsalign : 'left',align : 'center',hidden :true},
		{'text' : 'Vendor Code','datafield' : 'vCode','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Gross Wt','datafield' : 'gWt','width' : '6%',editable : false,sortable : false,cellsformat : 'd3',cellsalign : 'right',align : 'center'},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '5%',editable : false,sortable : false,cellsformat : 'd3',cellsalign : 'right',align : 'center'}, 
		{'text' : 'Stone Comb','datafield' : 'stComb','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Article Photo No/View','datafield' : 'artPhotoNo','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : viewFgStockItem},
		{'text' : 'Lab Name','datafield' : 'labName','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Cert No','datafield' : 'certNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'Total Line Item Selling Price','datafield' : 'totalSellingPrice','width' : '8%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center'},
		{'text' : 'Status','datafield' : 'status','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
		{'text' : 'GR Date','datafield' : 'grDate','width' : '8%',editable : false,sortable : false,cellsformat : 'dd/MM/yyyy',cellsalign : 'center',align : 'center'}
		];
		showMyGrid(datafields, "/OrderExecution/api/v1/solitaireJewelSearch", "list",columns, solitaireSetJewelFieldFilters(), updateRows, "");
		$("#jqxgrid").jqxGrid({
			width : '100%',
			theme: 'energyblue',
	        sortable: true,            
	     	altrows: true,
	    	columnsresize: true,
		});
	
	var initrowdetails = function(index, parentElement, gridElement, record) {
		var id = record.uid.toString();
		var grid = $($(parentElement).children()[0]);
		var data = record.stones;
		var inlineSource = {
			datafields : [
				{'name' : 'stSlNo','type' : 'int','map' : 'stockSerialNo'},
				{'name' : 'stSeg','type' : 'string','map' : 'segment'},
				{'name' : 'stCat','type' : 'string','map' : 'category'},
				{'name' : 'stSubCat','type' : 'string','map' : 'subCategoryDesc'},
				{'name' : 'stArtCode','type' : 'string','map' : 'stoneCode'},
				{'name' : 'stCaratRange','type' : 'string','map' : 'weightRange>id'},
				{'name' : 'clarity','type' : 'string','map' : 'clarity>id'},
				{'name' : 'color','type' : 'string','map' : 'color>id'},
				{'name' : 'actCol','type' : 'string','map' : 'actualColor>id'},
				{'name' : 'cutGrade','type' : 'string','map' : 'cutGrade>id'},
				{'name' : 'stOwner','type' : 'string','map' : 'suppliedBy>name'},
				{'name' : 'stPcsUsed','type' : 'int','map' : ''	},
				{'name' : 'stWtUsed','type' : 'float','map' : ''},
				{'name' : 'uqc','type' : 'string','map' : 'uom'},
				{'name' : 'stRate','type' : 'long','map' : 'rate'},
				{'name' : 'stWeight','type' : 'double','map' : 'weight'},
				{'name' : 'totalSellVal','type' : 'long','map' : 'sellingPrice'}
				],
			id : 'id',
			localdata : data,
			datatype : 'json'
		};
		if (data.length != 0) {
			grid.jqxGrid({
				source : inlineSource,
				width : "95%",
				autoheight: false, 
				theme: 'energyblue',
				height: '100px',
				enabletooltips : true,
				columnsresize : true,
				columns : [  
					{'text' : 'Sl No','datafield' : 'stSlNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Seg','datafield' : 'stSeg','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Category','datafield' : 'stCat','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
					{'text' : 'Sub Cat','datafield' : 'stSubCat','width' : '10%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
					{'text' : 'Article Code','datafield' : 'stArtCode','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Carat Range','datafield' : 'stCaratRange','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Color','datafield' : 'color','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Actual Color','datafield' : 'actCol','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Cut','datafield' : 'cutGrade','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Weight','datafield' : 'stWeight','width' : '4%',editable : false,sortable : false,cellsformat : 'd3',cellsalign : 'center',align : 'center'},
					{'text' : 'Owner','datafield' : 'stOwner','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
					{'text' :  'Pcs Used','datafield' : 'stPcsUsed','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',hidden : true},
					{'text' : 'Wt Used','datafield' : 'stWtUsed','width' : '6%',editable : false,sortable : false,cellsformat : 'd3',cellsalign : 'right',align : 'center',hidden : true},
					{'text' : 'UQC','datafield' : 'uqc','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
					{'text' : 'Rate','datafield' : 'stRate','width' : '6%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center'}, 
					{'text' : 'Total Stone Selling Value','datafield' : 'totalSellVal','width' : '16%',editable : false,sortable : false,cellsformat : 'd2',cellsalign : 'right',align : 'center'}
					],
				showaggregates : false,
				showstatusbar : false,
			 });
		 }
	  }
		$("#jqxgrid").jqxGrid(
		 {		
			rowdetails : true,
			width : '100%',
	        sortable: true,         
	        virtualmode: true,
	     	altrows: true,
	    	theme: 'energyblue',
	    	columnsresize: true, 
			rowsheight : 35,
			initrowdetails : initrowdetails,
			rowdetailstemplate : {
			rowdetails : "<div id='grid' style='margin: 10px;' 'margin-bottom : 10px;' 'margin-top:10px;'></div>",
			rowdetailsheight : 220,
			rowdetailshidden : true
		 },
	});
}

var viewFgStockItem = function(row, column, value) {
	var photoNo = $("#jqxgrid").jqxGrid('getcellvalue', row, 'photoNo');
	
		return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnView"  type="button" id='
		+ row
		+ ' onclick="soliItemView('
		+ row
		+ ')" href="javascript:void(0);"/><i class="fa fa-eye fa-sm"></i></a>';
	
}


$("#search").on('click',function(){
	var fDate = $("#fromDateS").val();
	var tDate = $("#toDateS").val();
	var status = $("#statusS").val();
	  if(status == "B" || status == "TOP"){
		if(fDate == "" || fDate == null || tDate == "" || tDate == null){
			$.growl.error({
				message : "Please Select Mandatory Fields",
				duration : 1000,
				title : 'Error'
			});
			return false;		
		}
	  }  
	solitaireSetJewelleryGrid();
	$("#jqxgrid").show();
});

//Export Functionality
$("#export").on("click",function() {	
	var statusS = $('#statusS').val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var storeOrDc = $('#storeOrDc').val();
	var stockNoS = $('#stockNoS').val();
	var stoneSegS = $('#stoneSegS').val();
	var stoneCatS = $('#stoneCatS').val();
	var storeDcNameS = $('#storeDcNameS').val();
	var artSegmentS = $('#artSegmentS').val();
	var jewelCodeS = $('#jewelCodeS').val();
	var shapeS = $('#shapeS').val();
	var fromCaratRangeS = $('#fromCaratRangeS').val();
	var toCaratRangeS = $('#toCaratRangeS').val();
	var clarityS = $('#clarityS').val();
	var colorS = $('#colorS').val();
	var actColS = $('#actColS').val();
	var cutGradeS = $('#cutGradeS').val();


	fieldFilters = {
		"fieldFilters" : {}
	};
	if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["status"] = statusS;
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromdate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["endDate"] = toDateS;
	}	
	if (storeOrDc != "" && storeOrDc != null) {
		fieldFilters.fieldFilters["storeOrDc"] = storeOrDc;
	}
	var storeDcObj = $('#storeDcObj').val();
	if (storeDcObj == null || storeDcObj == "") {
		var storeDcNameS = "";
	} else {
		var storeDcNameS = storeDcObj.join(",");
	}
	if (storeDcNameS != "" && storeDcNameS != null) {
		fieldFilters.fieldFilters["storeOrDcId"] = storeDcNameS;
	}
	var artSegObj = $('#artSegObj').val();
	if (artSegObj == null || artSegObj == "") {
		var artSegmentS = "";
	} else {
		var artSegmentS = artSegObj.join(",");
	}
	if (artSegmentS != "" && artSegmentS != null) {
		fieldFilters.fieldFilters["metalSegment"] = artSegmentS;
	}
	var jewelCodeObj = $('#jewelCodeObj').val();
	if (jewelCodeObj == null || jewelCodeObj == "") {
		var jewelCodeS = "";
	} else {
		var jewelCodeS = jewelCodeObj.join(",");
	}
	if (jewelCodeS != "" && jewelCodeS != null) {
		fieldFilters.fieldFilters["jeweltype"] = jewelCodeS;
	}
	if (stockNoS != "" && stockNoS != null) {
		fieldFilters.fieldFilters["id"] = stockNoS;
	}
	
	if (stoneCatS != "" && stoneCatS != null) {
		fieldFilters.fieldFilters["catId"] = stoneCatS;
	}
	var shapeObj = $('#shapeObj').val();
	if (shapeObj == null || shapeObj == "") {
		var shapeS = "";
	} else {
		var shapeS = shapeObj.join(",");
	}
	if (shapeS != "" && shapeS != null) {
		fieldFilters.fieldFilters["shape"] = shapeS;
	}
	var fCaratRangeObj = $('#fCaratRangeObj').val();
	if (fCaratRangeObj == null || fCaratRangeObj == "") {
		var fromCaratRangeS = "";
	} else {
		var fromCaratRangeS = fCaratRangeObj.join(",");
	}
	if (fromCaratRangeS != "" && fromCaratRangeS != null) {
		fieldFilters.fieldFilters["fromweight"] = fromCaratRangeS;
	}
	var tCaratRangeObj = $('#tCaratRangeObj').val();
	if (tCaratRangeObj == null || tCaratRangeObj == "") {
		var toCaratRangeS = "";
	} else {
		var toCaratRangeS = tCaratRangeObj.join(",");
	}
	if (toCaratRangeS != "" && toCaratRangeS != null) {
		fieldFilters.fieldFilters["toWeight"] = toCaratRangeS;
	}
	var clarityObj = $('#clarityObj').val();
	if (clarityObj == null || clarityObj == "") {
		var clarityS = "";
	} else {
		var clarityS = clarityObj.join(",");
	}
	if (clarityS != "" && clarityS != null) {
		fieldFilters.fieldFilters["clarity"] = clarityS;
	}
	var colorObj = $('#colorObj').val();
	if (colorObj == null || colorObj == "") {
		var colorS = "";
	} else {
		var colorS = colorObj.join(",");
	}
	if (colorS != "" && colorS != null) {
		fieldFilters.fieldFilters["color"] = colorS;
	}
	var actColObj = $('#actColObj').val();
	if (actColObj == null || actColObj == "") {
		var actColS = "";
	} else {
		var actColS = actColObj.join(",");
	}
	if (actColS != "" && actColS != null) {
		fieldFilters.fieldFilters["actcolor"] = actColS;
	}
	var cutGradeObj = $('#cutGradeObj').val();
	if (cutGradeObj == null || cutGradeObj == "") {
		var cutGradeS = "";
	} else {
		var cutGradeS = cutGradeObj.join(",");
	}
	if (cutGradeS != "" && cutGradeS != null) {
		fieldFilters.fieldFilters["cutgrade"] = cutGradeS;
	}
	
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
					"Portal":"OE",
					"Status":statusS,
					"FromDate":fromDateS,
					"ToDate":toDateS,
					"storeOrDC":storeOrDc,
					"StoreDCId":storeDcNameS,
					"AsegmentId":artSegmentS,
					"SegmentId":$("#stoneSegId").val(),
					"JtypeId":jewelCodeS,
					"stockNo":stockNoS,
					"categoryId":stoneCatS,
					"shape":shapeS,
					"FromRange":fromCaratRangeS,
					"ToRange":toCaratRangeS,
					"Clarity":clarityS,
					"Color":colorS,
					"ActualColor":actColS,
					"CutGrade":cutGradeS,
					"mode" : "excel",
					"reportName" : "RPT_Solitaire_Set_Jewellery_Report_Export"
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
					navigator.msSaveBlob(file,'Solitaire_Set_in_Jewellery.xlsx');
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

//Clear grid and reset input and Drop down value
$('#clearAll').on('click', function() {
	window.location.href="javascript:showContentPage('solitaireSetInJewellery', 'bodySwitcher')"
});