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

$("#artIdQueryFgS").show();
$("#artIdQueryStoneS").hide();
$("#artIdQueryAccS").hide();
$('input:radio[name="artIdQuery"]').filter('[value="fg"]').attr('checked', true);
$('input[name=artIdQuery]:radio').on('click', function() {
	var selectedVal = $(this).val();

	if (selectedVal == "fg") {
		$("#artIdQueryFgS").show();
		$("#artIdQueryStoneS").hide();
        $("#artIdQueryAccS").hide();
      
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');		
	}  else if (selectedVal == "stone") {
		$("#artIdQueryFgS").hide();
		$("#artIdQueryStoneS").show();
		$("#artIdQueryAccS").hide();
		
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');	
	}  else if (selectedVal == "accessory") {
		$("#artIdQueryFgS").hide();
		$("#artIdQueryStoneS").hide();
		$("#artIdQueryAccS").show();
		
		$("#jqxgrid").hide();
		$("#jqxgrid").jqxGrid('clear');
	}
});

$("#fgJwlType").hide();
$("#fgMainCat").hide();
$("#fgSubCat").hide();

// on load Lov's
var onLoadFunction = function() {
	var params ={"fieldFilters":
		{
		 "type": "metalSegmentList",
		}
	}
	postJSON('/OrderExecution/api/v1/articleIDQueryFGLovs', JSON.stringify(params), function(data) {
		//  Segment Lov
		var s = '<select id="segObj"  name="segObj" class="form-control" multiple="multiple">';
			$.each(data.payload.metalSegments, function(key, val) {
			s += '<option value="' + val.id + '">' + val.description + '</option>';
			});
			
			s += '</select>';
			
			$("#fgSegS").html(s);
			$('#segObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});			
	 });	
}
onLoadFunction();

//on change of Segment load Jewel Type
$("#fgSegS").on('change',function(){
	$("#fgJwlType").show();
	
	var segObj = $("#segObj").val();
	segObj = segObj.join(',');
	
	var params ={"fieldFilters":
		{
		 "type": "jewelTypeList",
		 "segIds":  segObj.toString()
		}
	}
	
	postJSON('/OrderExecution/api/v1/articleIDQueryFGLovs', JSON.stringify(params), function(data) {
		var j = '<select id="jtypeObj"  name="jtypeObj" class="form-control" multiple="multiple">';
		$.each(data.payload.JewelTypesList, function(key, val) {
		j += '<option value="' + val.id + '">' + val.description + '</option>';
		});
		
		j += '</select>';
		
		$("#fgJewelTypeS").html(j);
		$('#jtypeObj').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});				
	 });	
});

//on change of Jewel Type load Main Category
$("#fgJewelTypeS").on('change',function(){
	$("#fgMainCat").show();
	
	var segObj = $("#segObj").val();
	segObj = segObj.join(',');
	
	var jtypeObj = $("#jtypeObj").val();
	jtypeObj = jtypeObj.join(',');
	
	var params ={"fieldFilters":
		{
		 "type": "mainCatList",
		 "segIds":  segObj.toString(),
		 "jewelIds":  jtypeObj.toString()
		}
	}
	
	postJSON('/OrderExecution/api/v1/articleIDQueryFGLovs', JSON.stringify(params), function(data) {
		var m = '<select id="mainCatObj"  name="mainCatObj" class="form-control" multiple="multiple">';
		$.each(data.payload.mainCatList, function(key, val) {
		m += '<option value="' + val.id + '">' + val.description + '</option>'; 
		});
		
		m += '</select>';
		
		$("#fgMainCatS").html(m);
		$('#mainCatObj').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});				
	 });	
});

//on change of Main Category load Sub Category
$("#fgMainCatS").on('change',function(){
	$("#fgSubCat").show();
	
	var segObj = $("#segObj").val();
	segObj = segObj.join(',');
	
	var jtypeObj = $("#jtypeObj").val();
	jtypeObj = jtypeObj.join(',');
	
	var mainCatObj = $("#mainCatObj").val();
	mainCatObj = mainCatObj.join(',');
	
	var params ={"fieldFilters":
		{
		 "type": "subCatList",
		 "segIds":  segObj.toString(),
		 "jewelIds":  jtypeObj.toString(),
		 "mainCatIds":  mainCatObj.toString()
		}
	}
	
	postJSON('/OrderExecution/api/v1/articleIDQueryFGLovs', JSON.stringify(params), function(data) {
		var c = '<select id="subCatObj"  name="subCatObj" class="form-control" multiple="multiple">';
		$.each(data.payload.subCatList, function(key, val) {
		c += '<option value="' + val.id + '">' + val.description + '</option>'; 
		});
		
		c += '</select>';
		
		$("#fgSubCatS").html(c);
		$('#subCatObj').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});				
	 });	
});


//Field Filters
var artIdQueryFgFieldFilters = function() {
	var fgSegS = $('#FgSegS').val();
	var fgJewelTypeS = $('#fgJewelTypeS').val();
	var fgMainCatS = $('#fgMainCatS').val();
	var fgSubCatS = $('#fgSubCatS').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};	
	var segObj = $('#segObj').val();
	if (segObj == null || segObj == "") {
		var fgSegS = "";
	} else {
		var fgSegS = segObj.join(",");
	}
	if (fgSegS != "" && fgSegS != null) {
		fieldFilters.fieldFilters["segIds"] = fgSegS;
	}
	
	var jtypeObj = $('#jtypeObj').val();
	if (jtypeObj == null || jtypeObj == "") {
		var fgJewelTypeS = "";
	} else {
		var fgJewelTypeS = jtypeObj.join(",");
	}
	if (fgJewelTypeS != "" && fgJewelTypeS != null) {
		fieldFilters.fieldFilters["jewelIds"] = fgJewelTypeS;
	}
	
	var mainCatObj = $('#mainCatObj').val();
	if (mainCatObj == null || mainCatObj == "") {
		var fgMainCatS = "";
	} else {
		var fgMainCatS = mainCatObj.join(",");
	}
	if (fgMainCatS != "" && fgMainCatS != null) {
		fieldFilters.fieldFilters["mainCatIds"] = fgMainCatS;
	}
	
	var subCatObj = $('#subCatObj').val();
	if (subCatObj == null || subCatObj == "") {
		var fgSubCatS = "";
	} else {
		var fgSubCatS = subCatObj.join(",");
	}
	if (fgSubCatS != "" && fgSubCatS != null) {
		fieldFilters.fieldFilters["subCatIds"] = fgSubCatS;
	}
	
	return fieldFilters;
}


//###################################### Search Grid Started ###################################################

function artIdQueryFgGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ 
		{'name' : 'segCode','type' : 'string','map':'segdto>code'},
		{'name' : 'segName','type' : 'string','map':'segdto>description'},
		{'name' : 'jewelType','type' : 'string','map':'jeweldto>code'},
		{'name' : 'jewelTypeName','type' : 'string','map':'jeweldto>description'},
		{'name' : 'mainCatCode','type' : 'string','map':'catdto>code'},
		{'name' : 'mainCatName','type' : 'string','map':'catdto>description'},
		{'name' : 'subCatCode','type' : 'string','map':'subcatdto>code'},
		{'name' : 'subCatDesc','type' : 'string','map':'subcatdto>description'}, 
        {'name' : 'finalArtCode','type' : 'string','map':'articleCode'},
		{'name' : 'hsnCode','type' : 'string','map':'hsnCode'},
		{'name' : 'artFlag','type' : 'string','map':'articleFlag'}, 
		{'name' : 'orderUnit','type' : 'string','map':'orderUnit'}, 
		{'name' : 'mupFlag','type' : 'string','map':'mupDes'}, 
		{'name' : 'minWt','type' : 'float','map':'fromWeight'},
		{'name' : 'maxWt','type' : 'float','map':'toWeight'}];
	
	var columns = [
		{'text' : 'Seg Code','datafield' : 'segCode','width' : '6%',cellsalign : 'center',	align : 'center',sortable : true,editable : false},
		{'text' : 'Seg Name','datafield' : 'segName','width' : '5%',sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Jewel Type','datafield' : 'jewelType','width' : '6%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Jewel Type Name','datafield' : 'jewelTypeName','width' : '10l%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Main Cat Code','datafield' : 'mainCatCode','width' : '6%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Main Cat Name','datafield' : 'mainCatName','width' : '10%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},
		{'text' : 'Sub Cat Code','datafield' : 'subCatCode','width' : '6%',cellsalign : 'center',	align : 'center',sortable : true,editable : false},
		{'text' : 'Sub Cat Desc','datafield' : 'subCatDesc','width' : '12%',cellsalign : 'left',align : 'center',sortable : true,	editable : false},
		{'text' : 'Final Article Code','datafield' : 'finalArtCode','width' : '8%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'HSN Code','datafield' : 'hsnCode','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Article Flag','datafield' : 'artFlag','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Order Unit','datafield' : 'orderUnit','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},	
		{'text' : 'MUP Flag','datafield' : 'mupFlag','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Min Wt','datafield' : 'minWt','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},		
		{'text' : 'Max Wt','datafield' : 'maxWt','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3'}];
	
		showMyGrid(datafields,"/OrderExecution/api/v1/getArticleIDQueryFGList", "articleFGList",columns, artIdQueryFgFieldFilters(), updateRows, "");
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

//######################################### Search Functionality ###############################
$("#fgSearch").on('click',function(){
	artIdQueryFgGrid();
	$("#jqxgrid").show();
});

//###################### Export functionality #######################
$("#fgExport").on("click",function() {
			var data;
		    var newData = [];
		    var fieldFilters = artIdQueryFgFieldFilters();
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
					postJSON('/OrderExecution/api/v1/getArticleIDQueryFGListExport ',JSON.stringify(fieldFilters),function(response) {
						if(response != null){
						data = response.payload.articleFGList;
						for (i = 0; i < data.length; i++) {
						newData.push({
							'Segment Code' : (data[i].segdto != null) ? data[i].segdto.code : "",
							'Segment Name' : (data[i].segdto != null) ? data[i].segdto.description : "",
							'Jewel Type' : (data[i].jeweldto != null) ? data[i].jeweldto.code  : "",		
							'Jewel Type Name' : (data[i].jeweldto != null) ? data[i].jeweldto.description  : "",
							'Main Category Code' : (data[i].catdto != null) ? data[i].catdto.code : "",
							'Main Category Name' : (data[i].catdto != null) ? data[i].catdto.description : "",
							'Sub Cat Code' : (data[i].subcatdto != null) ? data[i].subcatdto.code : "",
							'Sub Cat Description' : (data[i].subcatdto != null) ? data[i].subcatdto.description : "",		
							'Final Article Code' : (data[i].articleCode != null) ? data[i].articleCode : "",	
							'HSN Code' : (data[i].hsnCode != null) ? data[i].hsnCode : "",
							'Article Flag' : (data[i].articleFlag != null) ? data[i].articleFlag : "",
							'Order Unit' : (data[i].orderUnit!= null) ? data[i].orderUnit  : "",		
							'MUP Flag' : (data[i].mupDes != null) ? data[i].mupDes  : "",
							'Min Wt' : (data[i].fromWeight != null) ? data[i].fromWeight : "",
							'Max Wt' : (data[i].toWeight != null) ? data[i].toWeight : "",	
		                   });		
						}
					var opts = [{sheetid:'Article_ID_Query_FG',header:true}];
		            var res = alasql('SELECT * INTO XLSX("Article_ID_Query_FG'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
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


$("#clearFg").on('click', function() {
	$('#segObj').multiselect("clearSelection");
	$('#jtypeObj').multiselect("clearSelection");
	$('#mainCatObj').multiselect("clearSelection");
	$('#subCatObj').multiselect("clearSelection");
	$('#artCodeObj').multiselect("clearSelection");
	
	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});
