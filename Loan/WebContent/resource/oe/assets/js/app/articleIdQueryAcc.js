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

var onLoadFunction = function() {
	var params ={"fieldFilters":{}};
	
	postJSON('/OrderExecution/api/v1/articleIDQueryAccLOVs', JSON.stringify(params), function(data) {
				
			
			$("#accSegS").empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.accSegments, function(key, val) {
				$("#accSegS").append('<option  value="' + val.id + '">' + val.description + '</option>');
			});
			
			
			var fc = '<select id="accFromCostObj"  name="accFromCostObj" class="form-control" multiple="multiple">';
			$.each(data.payload.fromCost, function(key, val) {
			fc += '<option value="' + val + '">' + val + '</option>';
			});
			
			fc += '</select>';
			
			$("#accFromCostS").html(fc);
			$('#accFromCostObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});		
			
			
			var tc = '<select id="accToCostObj"  name="accToCostObj" class="form-control" multiple="multiple">';
			$.each(data.payload.toCost, function(key, val) {
				tc += '<option value="' + val + '">' + val + '</option>';
			});
			
			tc += '</select>';
			
			$("#accToCostS").html(tc);
			$('#accToCostObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});		
	 });	
}
onLoadFunction();

$("#mainCatSection").hide();
$("#subCatSection").hide();
$("#articleCodeSection").hide();

$("#accSegS").on('change',function(){
	$("#mainCatSection").show();
	
	var accSeg = $("#accSegS").val();
	
	var params ={"fieldFilters":
		{
		 "type": "mainCats",
		 "accSegId":  accSeg
		}
	}
	
	postJSON('/OrderExecution/api/v1/articleIDQueryAccLOVs', JSON.stringify(params), function(data) {
		var j = '<select id="accMainCatObj"  name="accMainCatObj" class="form-control" multiple="multiple">';
		$.each(data.payload.mainCats, function(key, val) {
		j += '<option value="' + val.id + '">' + val.description + '</option>';
		});
		
		j += '</select>';
		
		$("#accMainCatS").html(j);
		$('#accMainCatObj').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});				
	 });	
});



$("#accMainCatS").on('change',function(){
	$("#subCatSection").show();
	
	var accMainCatObj = $("#accMainCatObj").val();
	accMainCatObj = accMainCatObj.join(',');
	
	var params ={"fieldFilters":
		{
		 "type": "subCats",
		 "mainCatIds":  accMainCatObj.toString()
		}
	}
	
	postJSON('/OrderExecution/api/v1/articleIDQueryAccLOVs', JSON.stringify(params), function(data) {
		var ja = '<select id="accSubCatObj"  name="accSubCatObj" class="form-control" multiple="multiple">';
		$.each(data.payload.subCats, function(key, val) {
		ja += '<option value="' + val.id + '">' + val.description + '</option>';
		});
		
		ja += '</select>';
		
		$("#accSubCatS").html(ja);
		$('#accSubCatObj').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});				
	 });	
});


$("#accSubCatS").on('change',function(){
	$("#articleCodeSection").show();
	
	var accSeg = $("#accSegS").val();
	
	var accSubCatS = $("#accSubCatObj").val();
	accSubCatS = accSubCatS.join(',');
	
	var params ={"fieldFilters":
		{
		 	"type": "accCodes",
	 		"accSegId":  accSeg,
	 		"subCatIds":accSubCatS.toString(),
		}
	}
	
	postJSON('/OrderExecution/api/v1/articleIDQueryAccLOVs', JSON.stringify(params), function(data) {
		var ja = '<select id="accArtCodeObj"  name="accArtCodeObj" class="form-control" multiple="multiple">';
		$.each(data.payload.accCodes, function(key, val) {
			ja += '<option value="' + val.id + '">' + val.id + '</option>';
		});
		
		ja += '</select>';
		
		$("#accArtCodeS").html(ja);
		$('#accArtCodeObj').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});				
	 });	
});
//Field Filters
var artIdQueryAccFieldFilters = function() {
	var accSegS = $('#accSegS').val();
	fieldFilters = {
		"fieldFilters" : {}
	};	

	if (accSegS != "" && accSegS != null) {
		fieldFilters.fieldFilters["segId"] = accSegS;
	}
	
	var accMainCatObj = $('#accMainCatObj').val();
	if (accMainCatObj == null || accMainCatObj == "") {
		var accMainCatS = "";
	} else {
		var accMainCatS = accMainCatObj.join(",");
	}
	if (accMainCatS != "" && accMainCatS != null) {
		fieldFilters.fieldFilters["catId"] = accMainCatS;
	}
	
	var accSubCatObj = $('#accSubCatObj').val();
	if (accSubCatObj == null || accSubCatObj == "") {
		var accSubCatS = "";
	} else {
		var accSubCatS = accSubCatObj.join(",");
	}
	if (accSubCatS != "" && accSubCatS != null) {
		fieldFilters.fieldFilters["subCatId"] = accSubCatS;
	}
	
	var accArtCodeObj = $('#accArtCodeObj').val();
	if (accArtCodeObj == null || accArtCodeObj == "") {
		var accArtCodeS = "";
	} else {
		var accArtCodeS = accArtCodeObj.join(",");
	}
	if (accArtCodeS != "" && accArtCodeS != null) {
		fieldFilters.fieldFilters["code"] = accArtCodeS;
	}
	
	var accFromCostObj = $('#accFromCostObj').val();
	if (accFromCostObj == null || accFromCostObj == "") {
		var accFromCostS = "";
	} else {
		var accFromCostS = accFromCostObj.join(",");
	}
	if (accFromCostS != "" && accFromCostS != null) {
		fieldFilters.fieldFilters["fromCost"] = accFromCostS;
	}
	
	var accToCostObj = $('#accToCostObj').val();
	if (accToCostObj == null || accToCostObj == "") {
		var accToCostS = "";
	} else {
		var accToCostS = accToCostObj.join(",");
	}
	
	if (accToCostS != "" && accToCostS != null) {
		fieldFilters.fieldFilters["toCost"] = accToCostS;
	}
	return fieldFilters;
}

// ##################### Search Grid Started #################################
var artIdQueryAccGrid = function(data) {
	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [ 
		{'name' : 'seg','type' : 'string','map':'accessoryMaster>segmentDTO>description'},
		{'name' : 'mainCatCode','type' : 'string','map':'accessoryMaster>category>code'},
		{'name' : 'mainCatName','type' : 'string','map':'accessoryMaster>category>description'},
		{'name' : 'subCatCode','type' : 'string','map':'accessoryMaster>subCategory>code'},
		{'name' : 'subCatDesc','type' : 'string','map':'accessoryMaster>subCategory>description'},
		{'name' : 'artCode','type' : 'string','map':'accessoryMaster>code'},
		{'name' : 'hsnCode','type' : 'string','map':'accessoryMaster>hsnMaster>hsnCode'}, 
        {'name' : 'fromCost','type' : 'float','map':'fromCost'},
		{'name' : 'toCost','type' : 'float','map':'toCost'},
		{'name' : 'spTabRef','type' : 'string','map':'sellingPriceReference'}, 
		{'name' : 'mupPer','type' : 'float','map':'mup'}, 
		{'name' : 'sellingPrice','type' : 'float','map':'sellingRate'}];
	
	var columns = [
		{'text' : 'Segment','datafield' : 'seg','width' : '8%',cellsalign : 'center',	align : 'center',sortable : true,editable : false},
		{'text' : 'Main Cat Code','datafield' : 'mainCatCode','width' : '8%',sortable : true,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Main Cat Name','datafield' : 'mainCatName','width' : '10%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat Code','datafield' : 'subCatCode','width' : '8%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat Desc','datafield' : 'subCatDesc','width' : '9%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},
		{'text' : 'Article Code','datafield' : 'artCode','width' : '10%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'HSN Code','datafield' : 'hsnCode','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'From Cost','datafield' : 'fromCost','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'To Cost','datafield' : 'toCost','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd2'},
		{'text' : 'SP Table Ref','datafield' : 'spTabRef','width' : '8%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'MUP %','datafield' : 'mupPer','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},	
		{'text' : 'Selling Price (P.Pc)','datafield' : 'sellingPrice','width' : '13%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		];
	
		showMyGrid(datafields,"/OrderExecution/api/v1/searchArticleIDQueryAcc?page=search", "list", columns, artIdQueryAccFieldFilters(), updateRows, "");
		
		$("#jqxgrid").jqxGrid({
			width : '100%',
	        sortable: true,            
	     	altrows: true,
	    	columnsresize: true, 
			rowsheight : 28,
			theme: 'energyblue',
			rowdetails : true,
			showstatusbar: false,
			autoheight: false,
			height: '275px',
			virtualmode : true,
		});
	
}

$("#accSearch").on('click',function(){
	var accFieldFilterVals = artIdQueryAccFieldFilters();
	artIdQueryAccGrid();
	$("#jqxgrid").show();
});


$("#clearAcc").on('click', function() {
	$('#accSegObj').multiselect("clearSelection");
	$('#accMainCatObj').multiselect("clearSelection");
	$('#accSubCatObj').multiselect("clearSelection");
	$('#accArtCodeObj').multiselect("clearSelection");
	$('#accFromCostObj').multiselect("clearSelection");
	$('#accToCostObj').multiselect("clearSelection");
	
	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});


$("#accExport").on("click",function() {
		var newData = [];	
		var fieldFilter = artIdQueryAccFieldFilters();
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		var sysdate = moment().format('DDMMYYYYHHmmSS');
		if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/searchArticleIDQueryAcc?page=export ',JSON.stringify(fieldFilter),function(response) {
				if(response != null){
				var data = response.payload.list;
				for (i = 0; i < data.length; i++) {
				newData.push({
					'Segment Name' : (data[i].accessoryMaster.segmentDTO != null) ? data[i].accessoryMaster.segmentDTO.description : "",
					'Main Category Code' : (data[i].accessoryMaster.category != null) ? data[i].accessoryMaster.category.code : "",
					'Main Category Name' : (data[i].accessoryMaster.category != null) ? data[i].accessoryMaster.category.description : "",
					'Sub Cat Code' : (data[i].accessoryMaster.subCategory != null) ? data[i].accessoryMaster.subCategory.code : "",
					'Sub Cat Description' : (data[i].accessoryMaster.subCategory != null) ? data[i].accessoryMaster.subCategory.description : "",		
					'Article Code' : (data[i].accessoryMaster.code != null) ? data[i].accessoryMaster.code : "",	
					'HSN Code' : (data[i].accessoryMaster.hsnMaster != null) ? data[i].accessoryMaster.hsnMaster.hsnCode : "",
					'From Cost' : (data[i].fromCost != null) ? data[i].fromCost : "",
					'To Cost' : (data[i].toCost != null) ? data[i].toCost : "",
					'SP Table Ref' : (data[i].sellingPriceReference!= null) ? data[i].sellingPriceReference  : "",		
					'MUP %' : (data[i].mup != null) ? data[i].mup  : "",
					'Selling Price (P.Pc)' : (data[i].sellingRate != null) ? data[i].sellingRate : ""
                   });		
				}
				var opts = [{sheetid:'Article_ID_Query_Acc',header:true}];
	            var res = alasql('SELECT * INTO XLSX("Article_ID_Query_Acc'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
		}
		});
   }else{
		  $.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;	
	}

});
