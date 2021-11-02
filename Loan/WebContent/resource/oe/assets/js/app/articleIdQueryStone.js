/*<!-- 

	##	Author1 (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Divya
	##	Date Creation 	: 	08-11-2017
	## 	Description		:	Article ID Query Loose Stones Report
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

var redirect = function(){
	window.location.href="javascript:showContentPage('articleIdQuery', 'bodySwitcher')";
	return window.location.href;
}

var onLoadFunction = function(){
$("#stoneSegS").empty().append('<option value="" selected>--Select--</option>');
	 var fieldFilters={
			 "fieldFilters": {
				   "type": "stoneSegmentList"
				  },
			 }
	postJSON("/OrderExecution/api/v1/articleIDQueryLSLovs",JSON.stringify(fieldFilters),function(data){
		console.log(data.payload.stoneSegments)
		 $.each(data.payload.stoneSegments,function(key,val){
			 console.log(val.name);
			 console.log(key);
    	      $("#stoneSegS").append('<option value="'+ val.id +'" ids="'+ val.name +'">'+ val.description +'</option>');
           })
	   })
	}
onLoadFunction();

$("#stoneSegS").on("change",function(){
	$("#catID").show();
	var stoneSegS = $('#stoneSegS').val();
	var fieldFilters={
			 "fieldFilters": {
				   "type": "stoneCategories",
				   "stoneSegId":stoneSegS
				  },
			 }
	postJSON("/OrderExecution/api/v1/articleIDQueryLSLovs",JSON.stringify(fieldFilters),function(data){
		console.log(data.payload.stonemainCats);
		var s = '<select id="stCatObj"  name="stCatObj" class="form-control" multiple="multiple">';
		$.each(data.payload.stonemainCats, function(key, val) {
		s += '<option value="' + val.id + '">' + val.description + '</option>';
		});
		
		s += '</select>';
		
		$("#stoneCatS").html(s);
		$('#stCatObj').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});		
	});
})

$("#artID").hide();
$("#clarityID").hide();
$("#colorID").hide();
$("#cutGradID").hide();
$("#actColorID").hide();
$("#catID").hide();
$("#subCatID").hide();
$("#wtRangeID").hide();
	
$("#stoneCatS").on("change",function(){
	$("#subCatID").show();
	$("#wtRangeID").show();
	
	var stoneSegS = $('#stoneSegS').val();
	var stoneCatS = $('#stCatObj').val();
	
	var fieldFiltersWt={
			 "fieldFilters": {
				   "type": "stoneWtCostRange",
				   "stoneSegId":stoneSegS,
				   "mainCatIds": stoneCatS.toString()
				  },
			 }
	postJSON("/OrderExecution/api/v1/articleIDQueryLSLovs",JSON.stringify(fieldFiltersWt),function(data){
		var ds = '<select id="stWtRangeObj"  name="stWtRangeObj" class="form-control" multiple="multiple">';
		$.each(data.payload.stoneWtCostRange, function(key, val) {
		ds += '<option value="' + val+ '">' + val + '</option>';
		});
		
		ds += '</select>';
		
		$("#stoneWtRangeS").html(ds);
		$('#stWtRangeObj').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});		
	});
	
	var stoneSegD = $("#stoneSegS option:selected").attr("ids");
	if(stoneSegD == "DI"){
		var fieldFilters={
				 "fieldFilters": {
					   "type": "shapeList",
					   "stoneSegId":stoneSegS,
					   "mainCatIds": stoneCatS.toString()
					  },
				 }
		
		
		postJSON("/OrderExecution/api/v1/articleIDQueryLSLovs",JSON.stringify(fieldFilters),function(data){
			var s = '<select id="stSubCatObj"  name="stSubCatObj" class="form-control" multiple="multiple">';
			$.each(data.payload.shapeList, function(key, val) {
			s += '<option value="' + val.id + '">' + val.description + '</option>';
			});
			
			s += '</select>';
			
			$("#stoneSubCatS").html(s);
			$('#stSubCatObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});		
		});
	}else{
			
			var stoneSegS = $('#stoneSegS').val();
			var stoneCatS = $('#stCatObj').val();
			
			var fieldFilters={
					 "fieldFilters": {
						   "type": "subCatList",
						   "stoneSegId":stoneSegS,
						   "mainCatIds": stoneCatS.toString()
						  },
					 }
			
			postJSON("/OrderExecution/api/v1/articleIDQueryLSLovs",JSON.stringify(fieldFilters),function(data){
				
				var s = '<select id="stSubCatObj"  name="stSubCatObj" class="form-control" multiple="multiple">';
				$.each(data.payload.subCats, function(key, val) {
				s += '<option value="' + val.id + '">' + val.description + '</option>';
				});
				
				s += '</select>';
				
				$("#stoneSubCatS").html(s);
				$('#stSubCatObj').multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				enableFiltering : true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});		
			});
	   }
})
$("#stoneSubCatS").on("change",function(){
	
	$("#artID").show();
	    var stoneSegS = $('#stoneSegS').val();
		var stoneCatS = $('#stCatObj').val();
		var stSubCat = $('#stSubCatObj').val();
		
	var stoneSegSD = $("#stoneSegS option:selected").attr("ids");
    if(stoneSegSD == "DI"){
     var fieldFilters={
			"fieldFilters": {
				 "type": "stoneCodes",
				   "stoneSegId":stoneSegS,
				   "mainCatIds": stoneCatS.toString(),
				   "shapeIds": stSubCat.toString(),
				  },
			 }
     postJSON("/OrderExecution/api/v1/articleIDQueryLSLovs",JSON.stringify(fieldFilters),function(data){
			
			var s = '<select id="stArtCodeObj"  name="stArtCodeObj" class="form-control" multiple="multiple">';
			$.each(data.payload.stoneCodeList, function(key, val) {
			s += '<option value="' + val + '">' + val + '</option>';
			});
			
			s += '</select>';
			
			$("#stoneArtCodeS").html(s);
			$('#stArtCodeObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : false,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});		
		});
     
    }else{
    	var fieldFilters={
    			"fieldFilters": {
    				   "type": "stoneCodes",
    				   "stoneSegId":stoneSegS,
    				   "mainCatIds": stoneCatS.toString(),
    				   "subCatIds":stSubCat.toString(),
    				  },
    			 }
         postJSON("/OrderExecution/api/v1/articleIDQueryLSLovs",JSON.stringify(fieldFilters),function(data){
    			
    			var s = '<select id="stArtCodeObj"  name="stArtCodeObj" class="form-control" multiple="multiple">';
    			$.each(data.payload.stoneCodeList, function(key, val) {
    				console.log(val);
    			s += '<option value="' + val + '">' + val + '</option>';
    			});
    			
    			s += '</select>';
    			
    			$("#stoneArtCodeS").html(s);
    			$('#stArtCodeObj').multiselect({
    			includeSelectAllOption : true,
    			maxHeight : 250,
    			enableFiltering : false,
    			numberDisplayed : 1,
    			buttonClass : 'col-md-12 form-control text-left'
    			});		
    		});
        }
})
$("#stoneArtCodeS").on("change",function(){
	    var stoneSegS = $('#stoneSegS').val();
		var stoneCatS = $('#stCatObj').val();
		var stSubCat = $('#stSubCatObj').val();
		
	var stoneSegSD = $("#stoneSegS option:selected").attr("ids");
    if(stoneSegSD == "DI"){
    	$("#clarityID").show();
    	$("#colorID").show();
    	$("#cutGradID").show();
    	$("#actColorID").show();
    	
     var fieldFilters={
			"fieldFilters": {
				   "type"       : "colorClarityCutgradeAColor",
				   "stoneSegId" :  stoneSegS,
				   "mainCatIds" :  stoneCatS.toString(),
				   "shapeIds"   :  stSubCat.toString(),
				  },
			 }
     postJSON("/OrderExecution/api/v1/articleIDQueryLSLovs",JSON.stringify(fieldFilters),function(data){
			
			var s = '<select id="stClarityObj"  name="stClarityObj" class="form-control" multiple="multiple">';
			$.each(data.payload.stnClarityList, function(key, val) {
			s += '<option value="' + val + '">' + val + '</option>';
			});
			
			s += '</select>';
			
			$("#stoneClarityS").html(s);
			$('#stClarityObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});		
			
			var st = '<select id="stColorObj"  name="stColorObj" class="form-control" multiple="multiple">';
			$.each(data.payload.stnColorList, function(key, val) {
			st += '<option value="' + val + '">' + val + '</option>';
			});
			st += '</select>';
			
			$("#stoneColorS").html(st);
			$('#stColorObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});		
			
			var sa = '<select id="stActColObj"  name="stActColObj" class="form-control" multiple="multiple">';
			$.each(data.payload.stnActualColorList, function(key, val) {
			sa += '<option value="' + val + '">' + val + '</option>';
			});
			
			sa += '</select>';
			
			$("#stoneActColorS").html(sa);
			$('#stActColObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});		
			
			var scut = '<select id="stCutGradeObj"  name="stCutGradeObj" class="form-control" multiple="multiple">';
			$.each(data.payload.stnCutgradeList, function(key, val) {
			scut += '<option value="' + val + '">' + val + '</option>';
			});
			
			scut += '</select>';
			
			$("#stoneCutGradeS").html(scut);
			$('#stCutGradeObj').multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});		
		});
     
    }else{
    	$("#clarityID").hide();
    	$("#colorID").hide();
    	$("#cutGradID").hide();
    	$("#actColorID").hide();
    }
});
//Field Filters
var artIdQueryStoneFieldFilters = function() {
	var stoneSegS = $('#stoneSegS').val();
	var stoneCatS = $('#stoneCatS').val();
	var stoneSubCatS = $('#stoneSubCatS').val();
	var stoneArtCodeS = $('#stoneArtCodeS').val();
	var stoneClarityS = $('#stoneClarityS').val();
	var stoneColorS = $('#stoneColorS').val();
	var stoneCutGradeS = $('#stoneCutGradeS').val();
	var stoneActColorS = $('#stoneActColorS').val();
	var stoneWtRangeS = $('#stoneWtRangeS').val();
	var stoneCostRangeS = $('#stoneCostRangeS').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};	
	
	if (stoneSegS != "" && stoneSegS != null) {
		fieldFilters.fieldFilters["segmentId"] = stoneSegS;
	}
	
	
	var stCatObj = $('#stCatObj').val();
	if (stCatObj == null || stCatObj == "") {
		var stoneCatS = "";
	} else {
		var stoneCatS = stCatObj.join(",");
	}
	if (stoneCatS != "" && stoneCatS != null) {
		fieldFilters.fieldFilters["mainCatIds"] = stoneCatS;
	}
	var stSubCatObj = $('#stSubCatObj').val();
	
	
	if (stSubCatObj == null || stSubCatObj == "") {
		var stoneSubCatS = "";
	} else {
		var stoneSubCatS = stSubCatObj.join(",");
	}
	var stoneSegSe = $('#stoneSegS option:selected').attr('ids');
	
	if(stoneSegSe == "DI"){
		if (stoneSubCatS != "" && stoneSubCatS != null) {
			fieldFilters.fieldFilters["shapeIds"] = stoneSubCatS;
		}
	}else{
		if (stoneSubCatS != "" && stoneSubCatS != null) {
			fieldFilters.fieldFilters["subCatIds"] = stoneSubCatS;
		}
	}
	
	var stArtCodeObj = $('#stArtCodeObj').val();
	if (stArtCodeObj == null || stArtCodeObj == "") {
		var stoneArtCodeS = "";
	} else {
		var stoneArtCodeS = stArtCodeObj.join(",");
	}
	if (stoneArtCodeS != "" && stoneArtCodeS != null) {
		fieldFilters.fieldFilters["stoneCodes"] = stoneArtCodeS;
	}
	
	var stClarityObj = $('#stClarityObj').val();
	if (stClarityObj == null || stClarityObj == "") {
		var stoneClarityS = "";
	} else {
		var stoneClarityS = stClarityObj.join(",");
	}
	if (stoneClarityS != "" && stoneClarityS != null) {
		fieldFilters.fieldFilters["clarityList"] = stoneClarityS;
	}
	
	var stColorObj = $('#stColorObj').val();
	if (stColorObj == null || stColorObj == "") {
		var stoneColorS = "";
	} else {
		var stoneColorS = stColorObj.join(",");
	}
	if (stoneColorS != "" && stoneColorS != null) {
		fieldFilters.fieldFilters["colorList"] = stoneColorS;
	}
	
	var stCutGradeObj = $('#stCutGradeObj').val();
	if (stCutGradeObj == null || stCutGradeObj == "") {
		var stoneCutGradeS = "";
	} else {
		var stoneCutGradeS = stCutGradeObj.join(",");
	}
	if (stoneCutGradeS != "" && stoneCutGradeS != null) {
		fieldFilters.fieldFilters["cutgradeList"] = stoneCutGradeS;
	}
	
	var stActColObj = $('#stActColObj').val();
	if (stActColObj == null || stActColObj == "") {
		var stoneActColorS = "";
	} else {
		var stoneActColorS = stActColObj.join(",");
	}
	if (stoneActColorS != "" && stoneActColorS != null) {
		fieldFilters.fieldFilters["actualColorList"] = stoneActColorS;
	}
	
	var stWtRangeObj = $('#stWtRangeObj').val();
	if (stWtRangeObj == null || stWtRangeObj == "") {
		var stoneWtRangeS = "";
	} else {
		var stoneWtRangeS = stWtRangeObj.join(",");
	}
	if (stoneWtRangeS != "" && stoneWtRangeS != null) {
		fieldFilters.fieldFilters["wtCostRangeList"] = stoneWtRangeS;
	}
	return fieldFilters;
}

//###################################### Search Grid  ###################################################

var  artIdQueryStoneGrid = function() {
	
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'stSeg','type' : 'string','map':'segmentdto>code'},
		{'name' : 'stSegName','type' : 'string','map':'segmentdto>description'},
		{'name' : 'stCatCode','type' : 'string','map':'catDTO>code'},
		{'name' : 'stCatName','type' : 'string','map':'catDTO>description'},
		{'name' : 'shapeCode','type' : 'string','map':'shapeCode'},
		{'name' : 'subCatDesc','type' : 'string','map':'shapeDescOrSubCatDesc'},
		{'name' : 'artCode','type' : 'string','map':'articleCode'},
		{'name' : 'hsnCode','type' : 'string','map':'hsnMasterDTO>hsnCode'}, 
        {'name' : 'clarity','type' : 'string','map':'clarity'},
		{'name' : 'color','type' : 'string','map':'color'},
		{'name' : 'cutgrade','type' : 'string','map':'cut'}, 
		{'name' : 'actualColor','type' : 'string','map':'actualColor'}, 
		{'name' : 'wtSlab','type' : 'string','map':'slab'}, 
		{'name' : 'uom','type' : 'float','map':'uqc'},
		{'name' : 'fromRange','type' : 'float','map':'fromWtCostrange'},
		{'name' : 'toRange','type' : 'string','map':'toWtCostrange'}, 
		{'name' : 'cpPerCat','type' : 'float','map':'costPriceInRs'}, 
		{'name' : 'exchangePer','type' : 'float','map':'exchangePercentage'}, 
		{'name' : 'dpPer','type' : 'float','map':'directPurchasePercentage'},
		{'name' : 'spTabRef','type' : 'float','map':'sp_tab_ref'}, 
		{'name' : 'spPerCat','type' : 'float','map':'sellingRate'}
		];

	var columns = [
		{'text' : 'St Seg Code','datafield' : 'stSeg','width' : '5%',cellsalign : 'center',	align : 'center',sortable : true,editable : false},
		{'text' : 'St Seg Name','datafield' : 'stSegName','width' : '5%',sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'St Cat Code','datafield' : 'stCatCode','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'St Cat Name','datafield' : 'stCatName','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Shape Code','datafield' : 'shapeCode','width' : '5%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Shape/Sub Cat Desc','datafield' : 'subCatDesc','width' : '10%',sortable : true,editable : false,cellsalign : 'left',align : 'center'},
		{'text' : 'Article Code','datafield' : 'artCode','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'HSN Code','datafield' : 'hsnCode','width' : '3%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Clarity','datafield' : 'clarity','width' : '3%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Color','datafield' : 'color','width' : '3%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Cut Grade','datafield' : 'cutgrade','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Actual Color','datafield' : 'actualColor','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},	
		{'text' : 'Wt Slab','datafield' : 'wtSlab','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'UQC','datafield' : 'uom','width' : '4%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},		
		{'text' : 'From Range','datafield' : 'fromRange','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
		{'text' : 'To Range','datafield' : 'toRange','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'CP. P. CT(In Rs)','datafield' : 'cpPerCat','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},	
		{'text' : 'Exchange %','datafield' : 'exchangePer','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'DP %','datafield' : 'dpPer','width' : '3%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},		
		{'text' : 'MUP % SP','datafield' : 'spTabRef','width' : '4%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		{'text' : 'SP P.Ct(In Rs)','datafield' : 'spPerCat','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		];

	showMyGrid(datafields, "/OrderExecution/api/v1/getArticleIDQueryLSList","articleLSList",columns,artIdQueryStoneFieldFilters(),updateRows, "");
	$("#jqxgrid").jqxGrid({	
        sortable: true,            
	   	altrows: true,
	  	columnsresize: true, 
		rowsheight : 28,
		rowdetails : true,
		showstatusbar: false,
		theme: 'energyblue',
		autoheight: false,
		height: '275px',
		virtualmode : true	
	});
}

$("#stoneSearch").on('click',function(){
	artIdQueryStoneGrid();
	$("#jqxgrid").show();
});

$("#clearStone").on('click', function() {
	$('#stSegObj').multiselect("clearSelection");
	$('#stCatObj').multiselect("clearSelection");
	$('#stSubCatObj').multiselect("clearSelection");
	$('#stArtCodeObj').multiselect("clearSelection");
	$('#stClarityObj').multiselect("clearSelection");
	$('#stColorObj').multiselect("clearSelection");
	$('#stCutGradeObj').multiselect("clearSelection");
	$('#stActColObj').multiselect("clearSelection");
	$('#stWtRangeObj').multiselect("clearSelection");
	$('#stCostRangeObj').multiselect("clearSelection");
	
	var validator = $("form").validate();
	validator.resetForm();

	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	redirect();
});

//###################### Export functionality #######################
$("#stoneExport").on("click",function() {
			var data;
		    var newData = [];
		    var fieldFilters = artIdQueryStoneFieldFilters();
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
					postJSON('/OrderExecution/api/v1/getArticleIDQueryLSListExport ',JSON.stringify(fieldFilters),function(response) {
						if(response != null){
						data = response.payload.articleLSList;
						for (i = 0; i < data.length; i++) {
						newData.push({
							'St Seg Code' : (data[i].segmentdto != null) ? data[i].segmentdto.code : "",
							'St Seg Name' : (data[i].segmentdto != null) ? data[i].segmentdto.description : "",
								
							'St Cat Code' : (data[i].catDTO != null) ? data[i].catDTO.code  : "",	
							'St Cat Name' : (data[i].catDTO != null) ? data[i].catDTO.description  : "",
							'Shape Code' : (data[i].shapeCode != null) ? data[i].shapeCode : "",
							'Shape/Sub Cat Desc' : (data[i].shapeDescOrSubCatDesc != null) ? data[i].shapeDescOrSubCatDesc : "",
							'Article Code' : (data[i].articleCode != null) ? data[i].articleCode : "",
							'HSN Code' : (data[i].hsnMasterDTO != null) ? data[i].hsnMasterDTO.hsnCode : "",
							'Clarity' : (data[i].clarity != null) ? data[i].clarity: "",		
							'Color' : (data[i].color != null) ? data[i].color : "",	
							'Cut Grade' : (data[i].cut != null) ? data[i].cut : "",
							'Actual Color' : (data[i].actualColor != null) ? data[i].actualColor : "",
							'Wt Slab' : (data[i].slab!= null) ? data[i].slab  : "",		
							'UQC' : (data[i].uqc != null) ? data[i].uqc  : "",
							'From Range' : (data[i].fromWtCostrange != null) ? data[i].fromWtCostrange : "",
							'To Range' : (data[i].toWtCostrange != null) ? data[i].toWtCostrange : "",
							'CP. P. CT(In Rs)' : (data[i].costPriceInRs != null) ? data[i].costPriceInRs : "",
							'Exchange %' : (data[i].exchangePercentage!= null) ? data[i].exchangePercentage  : "",		
							'DP %' : (data[i].directPurchasePercentage != null) ? data[i].directPurchasePercentage  : "",
							'MUP % SP' : (data[i].sp_tab_ref != null) ? data[i].sp_tab_ref  : "",
							'SP P.Ct(In Rs)' : (data[i].sellingRate != null) ? data[i].sellingRate : "",
		                   });		
						}
					var opts = [{sheetid:'Article_ID_Query_Loose_Stones',header:true}];
		            var res = alasql('SELECT * INTO XLSX("Article_ID_Query_Loose_Stones'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
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

