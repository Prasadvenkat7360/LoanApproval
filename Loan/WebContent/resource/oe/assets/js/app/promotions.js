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
					$(value).prop('disabled', true);
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
});

$("#promoName").hide();
$("#region").hide();
$("#store").hide();
$("#zone").hide();
$("#sSegment").hide();
$("#catSHide").hide();
$("#subCat").hide();
$("#jewelType").hide();
$("#aSegment").hide();
$("#mSegment").hide();

$("#promoTypeS").on('change',function(){
	var pTypeS = $("#promoTypeS").val();
	var promotype = $("#promoTypeS option:selected").text();
	$('#catObjS').multiselect("clearSelection");
	if(pTypeS == "A"){
		$("#promoName").show();
		$("#region").show();
		$("#store").show();
		$("#zone").show();
		$("#sSegment").show();
		$("#catSHide").show();
		$("#subCat").show();
		$("#jewelType").hide();
		$("#aSegment").hide();
		$("#mSegment").hide();
		loadStoneAccSeg('S');
	}
	else if(pTypeS == "FS"){
		$("#promoName").show();
		$("#region").show();
		$("#store").show();
		$("#zone").show();
		$("#sSegment").show();
		$("#catSHide").show();
		$("#subCat").hide();
		$("#jewelType").show();
		$("#aSegment").hide();
		$("#mSegment").hide();
		loadJtypesForFs();
		loadStoneAccSeg('S');
		
	}
	else if(pTypeS == "LS"){
		$("#promoName").show();
		$("#region").show();
		$("#store").show();
		$("#zone").show();
		$("#sSegment").show();
		$("#catSHide").show();
		$("#subCat").hide();
		$("#jewelType").hide();
		$("#aSegment").hide();
		$("#mSegment").hide();
		loadStoneAccSeg('S');
	}
	else if(pTypeS == "MCWS" || pTypeS == "MC" || pTypeS == "WS"){
		$("#promoName").show();
		$("#region").show();
		$("#store").show();
		$("#zone").show();
		$("#sSegment").hide();
		$("#catSHide").hide();
		$("#subCat").hide();
		$("#jewelType").show();
		$("#aSegment").show();
		$("#mSegment").show();
	}
	else if(pTypeS == "MR"){
		$("#promoName").show();
		$("#region").show();
		$("#store").show();
		$("#zone").hide();
		$("#sSegment").hide();
		$("#catSHide").hide();
		$("#subCat").hide();
		$("#jewelType").hide();
		$("#aSegment").hide();
		$("#mSegment").show();
	}
	else if(pTypeS == "ZJT"){
		$("#promoName").show();
		$("#region").show();
		$("#store").show();
		$("#zone").show();
		$("#sSegment").hide();
		$("#catSHide").hide();
		$("#subCat").hide();
		$("#jewelType").show();
		$("#aSegment").show();
		$("#mSegment").hide();
	}
});

$("#createPromotions").hide();
$("#backFromCreate").hide();
$("#footerHide").hide();
$("#hideCreateId").hide();
$("#promoNameHide").hide();
$("#mSegmentMrHide").hide();


$("#regionHide").hide();
$("#storeHide").hide();
$("#zoneHide").hide();
$("#mSegmentHide").hide();
$("#aSegmentHide").hide();
$("#jewelTypeHide").hide();
$("#sSegmentHide").hide();
$("#catHide").hide();
$("#subCatHide").hide();
$("#isOrderHide").hide();
$("#uqcHide").hide();
$("#zoneHide").hide();
$("#aSegmentHideC").hide();

$("#reg").hide();
$("#str").hide();
$("#zon").hide();
$("#isOrd").hide();
$("#mSeg").hide();
$("#aSeg").hide();
$("#jew").hide();
$("#cat").hide();
$("#saSegm").hide();
$("#uqc").hide();
$("#sCat").hide();
$("#aSegC").hide();
$("#sPurity").hide();
$("#editSection").hide();


$("#editPromo").prop('disabled',true);

var redirect = function(){
	$("#promoTypeC").prop('disabled',false);
	$("#searchPromotions").hide();
	$("#createPromotions").show();
	$("#createPromo").hide();
	$("#backFromCreate").show();
	$("#hideCreateId").show();
	$("#hideSearchId").hide();
	$("#mSegmentMrHide").hide();
	promotionModalGrid();	
	$("#jqxgrid").show();
	$("#jqxgrid").jqxGrid('addrow', null, generaterow(rowId + 1));
	
	$("#promoNameC").val("");
	$("#promoNameHide").hide();
	$("#regionHide").hide();
	$("#storeHide").hide();
	$("#zoneHide").hide();
	$("#mSegmentHide").hide();
	$("#aSegmentHide").hide();
	$("#jewelTypeHide").hide();
	$("#sSegmentHide").hide();
	$("#catHide").hide();
	$("#subCatHide").hide();
	$("#isOrderHide").hide();
	$("#uqcHide").hide();
	$("#promoTypeC").val("");
	$("#jqxgridC").hide();
	$("#jqxgridC").jqxGrid('clear');
	$("#footerHide").hide();
	$("#editSection").hide();
	$("#aSegmentHideC").hide();
	$("#sPurity").hide();
	
	$("#continue").prop('disabled',false);
	 $("#promoTypeC").prop('disabled',false);
	 $("#promoNameC").prop('disabled',false);
	 $("#regObjC").multiselect("enable");
	 $("#storeObjC").multiselect("enable");
	 $("#mSegmentMrC").prop('disabled',false);
	 $("#mSegmentMrC").prop('disabled',false);
	 $("#sPurityC").prop('disabled',false);
	 $("#zoneObjC").multiselect("enable");
	 $("#saSegmObjC").multiselect("enable");
	 $("#catObjC").multiselect("enable");
	 $("#subCatObjC").multiselect("enable");
	 $("#jewelObjC").multiselect("enable");
	 $("#isOrderC").prop('disabled',false);
	 $("#aSegmC").prop('disabled',false);
	 $("#aSegmC").val("");
	 $("#sPurityC").val("");
	 $("#mSegmentMrC").val("");
}
$("#createPromo").on('click',function(){
	redirect();
});

$("#backFromCreate").on('click',function(){
	window.location.href="javascript:showContentPage('promotions', 'bodySwitcher')"
});

var rowId = 0;
var generaterow = function(i) {
	var row = {};
	row["disAmt"] = "",
	row["disPerc"] =  "",
	row["startDate"] = "",
	row["endDate"] = ""
	rowId = rowId + 1;
	return row;
}


var promotionModalGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ 
		{'name' :'disAmt','type' :'float'},
		{'name' :'disPerc','type' :'float'},
		{'name'  :'startDate','type' : 'date'},
		{'name' : 'endDate','type'  :'date'}
	];
	var columns = [
		{'text'  :'Discount Amount','datafield':  'disAmt','width' : '25%',cellsalign : 'right',align:'center',editable : true,cellsformat : 'd2',columntype : 'numberinput',
    	createeditor : function(row, cellvalue, editor) {
				editor.jqxNumberInput({
					spinButtons : false,
					decimalDigits : 2
				});
			},
			cellbeginedit : function(row){
				var pType = $("#promoTypeC").val();
				var disAmt =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'disAmt');
				if(pType == "MR" && disAmtFlag == true){
					return true;
				}else{
					return false;
				}
			},
			cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
				if(newvalue <= 0.00 ){
					$.growl.error({
						message : "Please enter Valid Discount Amount !!!",
						duration :10000,
						title : 'Error'
					});
					return "";
				}
			}
	}, 
	{'text'  :'Discount %','datafield' : 'disPerc','width'  :'25%',sortable  :false,cellsalign : 'right',align:'center',editable:  true,cellsformat : 'd2',
		cellbeginedit : function(row){
				var pType = $("#promoTypeC").val();
				var disPerc =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'disPerc');
				if(pType != "MR" && disPerFlag == true ){
					return true;
				}else{
					return false;
				}
			},
		cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
				if(newvalue <= 0 || newvalue > 100.00){
					$.growl.error({
						message : "Please enter Valid Discount % !!!",
						duration :10000,
						title : 'Error'
					});
					return "";
				}
			}
	}, 
	{'text'  :'Start Date','datafield' : 'startDate','width' : '25%',cellsalign  :'center',align:'center',columntype: 'datetimeinput',cellsformat: 'dd/MM/yyyy',sortable : false,editable  :true,
		createeditor : function(rowIndex,cellValue, editor) {
			
			var d = new Date();
			d.setDate(d.getDate() - 1);
			editor.jqxDateTimeInput('setMinDate', d.toLocaleString());
		},
		cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
			 $("#jqxgrid").jqxGrid('setcellvalue', row, "endDate", "");
		},
		cellbeginedit : function(row){
			if(sdFlag == false){
				return false;
			}else{
				return true;
			}
		},
	},
	{'text' : 'End Date','datafield' : 'endDate','width'  :'25%',cellsalign  :'center',align:'center',columntype: 'datetimeinput',cellsformat: 'dd/MM/yyyy',sortable : false,editable  :true,
		createeditor : function(rowIndex,cellValue, editor) {
			var d = new Date();
			d.setDate(d.getDate() - 1);
			editor.jqxDateTimeInput('setMinDate', d.toLocaleString());
		},
		cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
			var dateOnly = new Date(jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'startDate'));
			if (newvalue >= dateOnly) {
				return newvalue;
			}else{
				$.growl.error({
					message : "End Date Should not be Less Than Start Date !!!",
					duration : 3000,
					title : 'Error'
				});
				return "";
			}
		},
		cellbeginedit : function(row){
			if(edFlag == false){
				return false;
			}else{
				return true;
			}
		},
	}
	];
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, "", addrow, '#jqxgrid');
	$("#jqxgrid").jqxGrid({
		width : '100%',
		height : '400px',
		theme: 'energyblue',
		editable : true,
		columnsresize : true,
		autoheight : true,
		altrows : true,
	});
}

$("#promoTypeC").on('change',function(){
	$('#regObjC').multiselect("clearSelection");
	$('#storeObjC').multiselect("clearSelection");
	$('#zoneObjC').multiselect("clearSelection");
	$('#artSegObjC').multiselect("clearSelection");
	$('#jewelObjC').multiselect("clearSelection");
	$('#saSegmObjC').multiselect("clearSelection");
	$('#catObjC').multiselect("clearSelection");
	$('#subCatObjC').multiselect("clearSelection");
	$('#metalSegObjC').multiselect("clearSelection");
	
	$("#promoNameHide").hide();
	$("#regionHide").hide();
	$("#zoneHide").hide();
	$("#mSegmentHide").hide();
	$("#aSegmentHide").hide();
	$("#jewelTypeHide").hide();
	$("#sSegmentHide").hide();
	$("#catHide").hide();
	$("#subCatHide").hide();
	$("#isOrderHide").hide();
	$("#uqcHide").hide();
	$("#sPurity").hide();
	
	if($("#promoTypeC").val() == "ZJT"){
		$("#promoNameHide").show();
		$("#regionHide").show();
		$("#isOrderHide").show();
		$("#aSegmentHide").hide();
		$("#aSegmentHideC").show();
		$("#storeHide").show();
		$("#zoneHide").show();
		$("#jewelTypeHide").show();
		
		$("#mSegmentHide").hide();
		$("#sSegmentHide").hide();
		$("#catHide").hide();
		$("#subCatHide").hide();
		$("#uqcHide").hide();
		$("#mSegmentMrHide").hide();
		$("#sPurity").hide();
		
		$("#reg").show();
		$("#str").show();
		$("#zon").show();
		$("#isOrd").show();
		
		$("#mSeg").hide();
		$("#mSegMr").hide();
		$("#aSeg").hide();
		$("#jew").hide();
		$("#cat").hide();
		$("#saSegm").hide();
		$("#uqc").hide();
		$("#sCat").hide();
		$("#uqcC").val('');
		$("#uqcC").prop('disabled',false);
		$("#isOrderC").val('');
		$("#isOrderC").prop('disabled',false);
		$("#aSegC").show();
		$("#jew").show();
	}else if($("#promoTypeC").val() == "MR"){
		$("#promoNameHide").show();
		$("#regionHide").show();
		$("#mSegmentMrHide").show();
		$("#mSegmentHide").hide();
		$("#aSegmentHideC").hide();
		$("#storeHide").show();
		$("#sPurity").show();
		
		$("#aSegmentHide").hide();
		$("#jewelTypeHide").hide();
		$("#sSegmentHide").hide();
		$("#catHide").hide();
		$("#subCatHide").hide();
		$("#isOrderHide").show();
		$("#uqcHide").hide();
		$("#zoneHide").hide();
		
		$("#reg").show();
		$("#str").show();
		$("#mSeg").hide();
		$("#mSegMr").show();
		
		$("#zon").hide();
		$("#isOrd").show();
		$("#aSeg").hide();
		$("#jew").hide();
		$("#cat").hide();
		$("#saSegm").hide();
		$("#uqc").show();
		$("#sCat").hide();
		$("#uqcC").val('');
		$("#isOrderC").val(0);
		$("#isOrderC").prop('disabled',true);
		$("#uqcC").prop('disabled',false);
	}else if($("#promoTypeC").val() == "FS"){
		$("#promoNameHide").show();
		$("#regionHide").show();
		$("#jewelTypeHide").show();
		$("#sSegmentHide").show();
		$("#catHide").hide();
		$("#isOrderHide").show();
		$("#mSegmentMrHide").hide();
		$("#catHide").show();
		
		
		$("#reg").show();
		$("#str").show();
		$("#zon").show();
		$("#jew").show();
		$("#isOrd").show();
		$("#cat").show();
		$("#saSegm").show();
		$("#uqc").hide();
		$("#sCat").hide();
		
		$("#subCatHide").hide();
		$("#mSegMr").hide();
		$("#mSegmentHide").hide();
		$("#aSegmentHide").hide();
		$("#aSegmentHideC").hide();
		$("#uqc").hide();
		$("#uqcC").val('');
		$("#sPurity").hide();
		$("#uqcC").prop('disabled',false);
		$("#isOrderC").val('');
		$("#isOrderC").prop('disabled',false);
		$("#storeHide").show();
		$("#zoneHide").show();
		loadJtypesForFs();
		loadStoneAccSeg('C');
	}else if($("#promoTypeC").val() == "A"){
		$("#promoNameHide").show();
		$("#regionHide").show();
		$("#sSegmentHide").show();
		$("#isOrderHide").show();
		$("#uqcHide").show();
		$("#mSegmentMrHide").hide();
		$("#storeHide").show();
		$("#zoneHide").show();
		$("#catHide").show();
		$("#subCatHide").show();
		$("#aSegmentHideC").hide();
		$("#sPurity").hide();
		
		$("#reg").show();
		$("#str").show();
		$("#zon").show();
		$("#isOrd").show();
		$("#cat").show();
		$("#uqc").show();
		$("#mSegMr").hide();
		$("#saSegm").show();
		$("#sCat").show();
		
		$("#mSeg").hide();
		$("#aSeg").hide();
		$("#jew").hide();
		$("#mSegmentHide").hide();
		$("#aSegmentHide").hide();
		$("#jewelTypeHide").hide();
		$("#uqcC").val('Pcs');
		$("#uqcC").prop('disabled',true);
		$("#isOrderC").val(0);
		$("#isOrderC").prop('disabled',true);
		loadStoneAccSeg('C');
	}else if($("#promoTypeC").val() == "LS"){
		$("#promoNameHide").show();
		$("#regionHide").show();
		$("#sSegmentHide").show();
		$("#catHide").hide();
		$("#isOrderHide").show();
		$("#uqcHide").show();
		$("#mSegmentMrHide").hide();
		$("#aSegmentHideC").hide();
		$("#mSegMr").hide();
		$("#storeHide").show();
		$("#zoneHide").show();
		$("#catHide").show();
		$("#sPurity").hide();
		
		$("#reg").show();
		$("#str").show();
		$("#zon").show();
		$("#isOrd").show();
		$("#cat").show();
		$("#saSegm").show();
		$("#uqc").show();
		$("#mSeg").show();
		$("#aSeg").show();
		
		$("#jew").hide();
		$("#sCat").hide();
		
		$("#mSegmentHide").hide();
		$("#aSegmentHide").hide();
		$("#jewelTypeHide").hide();
		$("#subCatHide").hide();
		$("#isOrderC").val(0);
		$("#isOrderC").prop('disabled',true);
		loadStoneAccSeg('C');
	}else if($("#promoTypeC").val() == "MC" || $("#promoTypeC").val() == "MCWS" || $("#promoTypeC").val() == "WS"){
		$("#promoNameHide").show();
		$("#regionHide").show();
		$("#mSegmentHide").hide();
		$("#aSegmentHide").hide();
		$("#aSegmentHideC").show();
		$("#storeHide").show();
		$("#zoneHide").show();
		$("#jewelTypeHide").hide();
		$("#isOrderHide").show();
		$("#mSegmentMrHide").show();
		$("#mSegMr").hide();
		$("#jewelTypeHide").show();
		
		$("#reg").show();
		$("#str").show();
		$("#zon").show();
		$("#isOrd").show();
		$("#jew").show();
		$("#mSeg").show();
		$("#aSeg").show();
		$("#mSegMr").show();
		$("#aSegC").show();
		
		$("#sSegmentHide").hide();
		$("#catHide").hide();
		$("#uqcHide").hide();
		$("#subCatHide").hide();
		$("#sPurity").hide();
		
		$("#saSegm").hide();
		$("#sCat").hide();
		$("#cat").hide();
		$("#uqc").hide();
		$("#uqcC").val('');
		$("#uqcC").prop('disabled',false);
		$("#isOrderC").val('');
		$("#isOrderC").prop('disabled',false);
	}
});

var jewelFs;
var loadJtypesForFs = function(){
	postJSON('/OrderExecution/api/v1/onloadPromotionsCreate', JSON.stringify({"fieldFilters": {"type": "allJeweltypes"}}), function(data) {
		var allJewelTypeList = data.payload.allJewelTypeList;
		jewelFs = data.payload.allJewelTypeList;
			var j = '<select id="jewelObjC"  name="jewelObjC" class="form-control" multiple="multiple">';
				$.each(allJewelTypeList, function(key, val) {
				j += '<option value="' + val.id + '">'+ val.code +"-" + val.description + '</option>'; });
				j += '</select>';
				$("#jewelTypeC").html(j);
				$('#jewelObjC').multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				//enableFiltering : true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
				
			var jt = '<select id="jewelObjS"  name="jewelObjS" class="form-control" multiple="multiple">';
				$.each(allJewelTypeList, function(key, val) {
				jt += '<option value="' + val.id + '">'+ val.code +"-" + val.description + '</option>'; });
				jt += '</select>';
				$("#jewelTypeS").html(jt);
				$('#jewelObjS').multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				//enableFiltering : true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
		});
}

//GR Main Grid.
var promotionCreateGrid = function(data){		
		var source = {
			datafields : [ 
				{'name' :'slNo','type' :'int','map':'id'},
				{'name' :'promoType','type' :'string'},
				{'name'  :'promoName','type' : 'string'},
				{'name' : 'region','type'  :'string','map':'promoRegion>name'},
				{'name' : 'store','type'  :'string','map':'promoStore>name'}, 
				{'name' : 'zone','type'  :'string','map':'promoZone>description'},
				{'name' : 'metalSeg','type'  :'string','map':'promoMetalSegment>description'},
				{'name' : 'artSeg','type'  :'string','map':'promoArticleSegment>description'},
				{'name' : 'jewType','type'  :'string','map':'promoJewelType>description'},
				{'name' : 'stoneAccSeg','type'  :'string','map':'promoStoneOrAccSegment>description'},
				{'name' : 'cat','type'  :'string','map':'promoCategory>description'},
				{'name' : 'subCat','type'  :'string','map':'promoSubCategory>description'},
				{'name' : 'uqc','type'  :'string','map':'uom'},
				{'name' : 'isOrder','type'  :'string','map':'isOrderValue'},
				{'name' : 'discAmt','type'  :'float','map':'promoFlatPercentValue'},
				{'name' : 'discPerc','type'  :'float','map':'promoFaltPercent'},
				{'name' : 'startDt','type'  :'date','map':'promoStartDate'},
				{'name' : 'endDt','type'  :'date','map':'promoEndDate'},
				
				{'name' : 'regionId','type'  :'int','map':'promoRegion>id'},
				{'name' : 'storeId','type'  :'int','map':'promoStore>storeId'},
				{'name' : 'zoneId','type'  :'int','map':'promoZone>id'},
				{'name' : 'metSegId','type'  :'int','map':'promoMetalSegment>id'},
				{'name' : 'artSegId','type'  :'int','map':'promoArticleSegment>id'},
				{'name' : 'stAccSegId','type'  :'int','map':'promoStoneOrAccSegment>id'},
				{'name' : 'jewelId','type'  :'int','map':'promoJewelType>id'},
				{'name' : 'catId','type'  :'int','map':'promoCategory>id'},
				{'name' : 'subCatId','type'  :'int','map':'promoSubCategory>id'},
				
				{'name' : 'metSegCode','type'  :'string','map':'promoMetalSegment>code'},
				{'name' : 'artSegCode','type'  :'string','map':'promoArticleSegment>code'},
				{'name' : 'stAccSegCode','type'  :'string','map':'promoStoneOrAccSegment>code'},
				{'name' : 'jewelCode','type'  :'string','map':'promoJewelType>code'},
				{'name' : 'catCode','type'  :'string','map':'promoCategory>code'},
				{'name' : 'subCatCode','type'  :'string','map':'promoSubCategory>code'},
			],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
			},
		};		
		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#jqxgridC").jqxGrid({
			source : dataAdapter,
			width : '100%',
			editable : true,
			columnsheight : 50,
			theme: 'energyblue',
			columnsresize: true, 
			autoheight: true,
			altRows : true,
			height: '500px',
			pageable : 'true',
			pagesize : 20,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);
				
				container.append('<div class="col-md-4 row"></div>');
				container.append('<div class="col-md-4"><div style="margin-bottom:10px; color:#00800; font-size:15px;"  id="orderTypeLabel" class="text-center">Create Promotion Details</div></div>');	
				container.append('<div class="col-md-2 pull-right"><div style="margin-bottom:10px;" id="deletePromodetailsGrid" class="btn btn-danger btn-sm pull-right"><i class="fa fa-trash fa-md"></i></div></div>');
				
				$("#deletePromodetailsGrid").jqxButton();
				$("#deletePromodetailsGrid").on('click', function() {
					var masterRows = $("#jqxgridC").jqxGrid('getrows');
					var selectedrowindex = $("#jqxgridC").jqxGrid('getselectedrowindex');
					$("#jqxgridC").jqxGrid('deleterow',selectedrowindex);
				});
			},
			columns : [ 
				{'text'  :'Sl No','datafield':  'slNo','width' : '3%',cellsalign : 'center',align:'center',editable : false},
				{'text'  :'Promotion Type','datafield' : 'promoType','width'  :'8%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
				{'text'  :'Promotion Name','datafield' : 'promoName','width' : '8%',cellsalign  :'center',align:'center',sortable : false,editable  :false}, 
				{'text' : 'Region','datafield' : 'region','width'  :'5%',cellsalign  :'center',align:'center',sortable : false,editable  :false},
				{'text'  :'Store','datafield' : 'store','width' : '8%',cellsalign  :'center',align:'center',sortable : false,editable  :false},
				{'text'  :'Zone','datafield' : 'zone','width' : '8%',cellsalign  :'center',align:'center',sortable : false,editable  :false},
				{'text'  :'Metal Segment','datafield' : 'metalSeg','width' : '6%',cellsalign  :'center',align:'center',sortable : false,editable  :false},
				{'text'  :'Article Segment','datafield' : 'artSeg','width' : '6%',cellsalign  :'center',align:'center',sortable : false,editable  :false},
				{'text'  :'Jewel Type','datafield' : 'jewType','width' : '10%',cellsalign  :'center',align:'center',sortable : false,editable  :false},
				{'text'  :'Stone/Acc Segment','datafield' : 'stoneAccSeg','width' : '6%',cellsalign  :'center',align:'center',sortable : false,editable  :false}, 
				{'text'  :'Category','datafield' : 'cat','width' : '8%',cellsalign  :'center',align:'center',sortable : false,editable  :false},
				{'text'  :'Sub Category','datafield' : 'subCat','width' : '10%',cellsalign  :'center',align:'center',sortable : false,editable  :false},
				{'text'  :'UQC','datafield' : 'uqc','width' : '4%',cellsalign  :'center',align:'center',sortable : false,editable  :false},
				{'text'  :'Is Order','datafield' : 'isOrder','width' : '5%',cellsalign  :'center',align:'center',sortable : false,editable  :false},
				{'text'  :'Discount Amt','datafield' : 'discAmt','width' : '6%',cellsalign  :'right',align:'center',cellsformat : 'd2',sortable : false,editable  :true,
					createeditor : function(row, cellvalue, editor) {
						editor.jqxNumberInput({
							spinButtons : false,
							decimalDigits : 2
						});
					},
					cellbeginedit : function(row){
						var pType = jQuery('#jqxgridC').jqxGrid ('getcellvalue', row, 'promoType');
						if(pType == "MetalRate"){
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
						if(newvalue <= 0.00 ){
							$.growl.error({
								message : "Please enter Valid Discount Amount !!!",
								duration :10000,
								title : 'Error'
							});
							return "";
						}
					}
				},
				{'text'  :'Discount %','datafield' : 'discPerc','width' : '6%',cellsformat : 'd2',cellsalign  :'right',align:'center',sortable : false,editable  :true,
					createeditor : function(row, cellvalue, editor) {
						editor.jqxNumberInput({
							spinButtons : false,
							decimalDigits : 2
						});
					},
					cellbeginedit : function(row){
						var pType = jQuery('#jqxgridC').jqxGrid ('getcellvalue', row, 'promoType');
						if(pType == "MetalRate"){
							return false;
						}else{
							return true;
						}
					},
					cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
						if(newvalue <= 0.00 || newvalue > 100.00){
							$.growl.error({
								message : "Please enter Valid Discount % !!!",
								duration :10000,
								title : 'Error'
							});
							return "";
						}
					}
				},
				{'text'  :'Start Date','datafield' : 'startDt','width' : '8%',columntype: 'datetimeinput',cellsalign  :'center',align:'center',cellsformat: 'dd/MM/yyyy',sortable : false,editable  :true,
					createeditor : function(rowIndex,cellValue, editor) {
						var d = new Date();
						d.setDate(d.getDate() - 1);
						editor.jqxDateTimeInput('setMinDate', d.toLocaleString());
					},
					cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
						
						var endDt = jQuery('#jqxgridC').jqxGrid ('getcellvalue', row, 'endDt');
						var date1 = new Date(newvalue);
						var date2 = new Date(endDt);
						
						var dd = date1.getDate();
						var mm = date1.getMonth() + 1;
						var yy = date1.getFullYear();
						var strDate = dd + "/" + mm + "/" + yy;
						
						var dd1 = date2.getDate();
						var mm1 = date2.getMonth() + 1;
						var yy1 = date2.getFullYear();
						var endDte = dd1 + "/" + mm1 + "/" + yy1;
						if(endDt != null){
							if (process(strDate) > process(endDte) ) {
								$.growl.warning({
									message : "End Date Should be Greater than/ Equal To " + strDate + " !!",
									duration : 10000,
									title : 'Warning'
								})
								$("#jqxgridC").jqxGrid('setcellvalue', row, "endDt", "");
								return ;
							}else{}
						}
					},
				},
				{'text'  :'End Date','datafield' : 'endDt','width' : '8%',columntype: 'datetimeinput',cellsalign  :'center',align:'center',cellsformat: 'dd/MM/yyyy',sortable : false,editable  :true,
					createeditor : function(rowIndex,cellValue, editor) {
						var d = new Date();
						d.setDate(d.getDate() - 1);
						editor.jqxDateTimeInput('setMinDate', d.toLocaleString());
					},
					cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
						var strDate = jQuery('#jqxgridC').jqxGrid ('getcellvalue', row, 'startDt');
						if (newvalue >= strDate) {
							return newvalue;
						}else{
							$.growl.error({
								message : "End Date Should not be Less Than Start Date !!!",
								duration : 3000,
								title : 'Error'
							});
							return "";
						}
					},
				},
				
				{'text'  :'','datafield' : 'regionId',hidden : true},
				{'text'  :'','datafield' : 'storeId',hidden : true},
				{'text'  :'','datafield' : 'zoneId',hidden : true},
				{'text'  :'','datafield' : 'metSegId',hidden : true},
				{'text'  :'','datafield' : 'artSegId',hidden : true},
				{'text'  :'','datafield' : 'stAccSegId',hidden : true},
				{'text'  :'','datafield' : 'jewelId',hidden : true},
				{'text'  :'','datafield' : 'catId',hidden : true},
				{'text'  :'','datafield' : 'subCatId',hidden : true},
				
				{'text'  :'','datafield' : 'metSegCode',hidden : true},
				{'text'  :'','datafield' : 'artSegCode',hidden : true},
				{'text'  :'','datafield' : 'stAccSegCode',hidden : true},
				{'text'  :'','datafield' : 'jewelCode',hidden : true},
				{'text'  :'','datafield' : 'catCode',hidden : true},
				{'text'  :'','datafield' : 'subCatCode',hidden : true},
				
			]
		});	
}

var statusArr = [
	{
		"id" : "1",
		"name" : "Active"
	},
	{
		"id" : "0",
		"name" : "In-Active"
	}
]
postJSON('/OrderExecution/api/v1/onloadPromotionsCreate', JSON.stringify({"fieldFilters": {"type": "promotionTypes"}}), function(data) {
	var promotionTypes = data.payload.promotionTypes;
	promotionTypes.sort(function(a, b){
			return a.name > b.name;
		});
	$('#promoTypeC').empty().append('<option value="" selected>--Select--</option>');
		$.each(promotionTypes, function(key, val) {
		$('#promoTypeC').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
		
	$('#promoTypeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(promotionTypes, function(key, val) {
		$('#promoTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
		
	$('#statusS').empty().append('<option value="" selected>--Select--</option>');
		$.each(statusArr, function(key, val) {
		$('#statusS').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
});

var stoneOrAccSegList;
var regionP,artSegP,mSegP;
var onLoadFunction = function() {
	// Region Lov 
	postJSON('/OrderExecution/api/v1/onloadPromotionsCreate', JSON.stringify({"fieldFilters": {"type": "regions"}}), function(data) {
				var rList = data.payload.allRegions;
				regionP = data.payload.allRegions;
						
					var g = '<select id="regObjC"  name="regObjC" class="form-control" multiple="multiple">';
						$.each(rList, function(key, val) {
						g += '<option value="' + val.id + '">' + val.name + '</option>'; });
						g += '</select>';
						$("#regionC").html(g);
						$('#regObjC').multiselect({
						includeSelectAllOption : true,
						maxHeight : 250,
						//enableFiltering : true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						});
						
						// Region LOV
					var r = '<select id="regObjS"  name="regObjS" class="form-control" multiple="multiple">';
						$.each(rList, function(key, val) {
						r += '<option value="' + val.id + '">' + val.name + '</option>'; });
						r += '</select>';
						$("#regionS").html(r);
						$('#regObjS').multiselect({
						includeSelectAllOption : true,
						maxHeight : 250,
						//enableFiltering : true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						});
					
				});
	
	// Metal Segment Lov 
	postJSON('/OrderExecution/api/v1/onloadPromotionsCreate', JSON.stringify({"fieldFilters": {"type": "metalSegments"}}), function(data) {
		var mSegList = data.payload.metalSegments;
		 mSegP = data.payload.metalSegments;
		
				$('#mSegmentMrC').empty().append('<option value="" selected>--Select--</option>');
				$.each(mSegList, function(key, val) {
					$('#mSegmentMrC').append('<option value="' + val.id + '" idE = '+ val.code +'>' + val.description + '</option>');
				});
				
				// Metal Segment LOV search
				var m = '<select id="metalSegObjS"  name="metalSegObjS" class="form-control" multiple="multiple">';
				$.each(mSegList, function(key, val) {
				m += '<option value="' + val.id + '">'+ val.code +"-" + val.description + '</option>'; });
				m += '</select>';
				$("#mSegmentS").html(m);
				$('#metalSegObjS').multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				//enableFiltering : true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
		});
	
	// Article Segment Lov 
	postJSON('/OrderExecution/api/v1/onloadPromotionsCreate', JSON.stringify({"fieldFilters": {"type": "articleSegments"}}), function(data) {
		var aSegList = data.payload.metalSegments;
		artSegP =  data.payload.metalSegments; 
		
			$('#aSegmC').empty().append('<option value="" selected>--Select--</option>');
			$.each(aSegList, function(key, val) {
				$('#aSegmC').append('<option value="' + val.id + '" idP = '+ val.code +'>' + val.description + '</option>');
			});
			
			
			// Article Segment LOV search
				var a = '<select id="artSegObjS"  name="artSegObjS" class="form-control" multiple="multiple">';
				$.each(aSegList, function(key, val) {
				a += '<option value="' + val.id + '">'+ val.code +"-" + val.description + '</option>'; });
				a += '</select>';
				$("#aSegmentS").html(a);
				$('#artSegObjS').multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				//enableFiltering : true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
	});
	
	var store1 = '<select id="storeObjC" class="form-control" multiple="multiple"></select>';
	$("#storeC").html(store1);
	$('#storeObjC').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
		
	var zone1 = '<select id="zoneObjC" class="form-control" multiple="multiple"></select>';
	$("#zoneC").html(zone1);
	$('#zoneObjC').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
		
	var jewel1 = '<select id="jewelObjC" class="form-control" multiple="multiple"></select>';
	$("#jewelTypeC").html(jewel1);
	$('#jewelObjC').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});

	var cat1 = '<select id="catObjC" class="form-control" multiple="multiple"></select>';
	$("#catC").html(cat1);
	$('#catObjC').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
		
	var subCat1 = '<select id="subCatObjC" class="form-control" multiple="multiple"></select>';
	$("#subCatC").html(subCat1);
	$('#subCatObjC').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
}
onLoadFunction();

var stoneOrAccSegListP;

var loadStoneAccSeg = function(type){
	var params
	if(type == 'S'){
		 params = {
			"fieldFilters":
			{ "type": "stoneOrAccSegment",
			  "promoType": $("#promoTypeS option:selected").text()
			}
		}
	}
	
	if(type == 'C'){
		params = {
				"fieldFilters":
				{ "type": "stoneOrAccSegment",
				  "promoType": $("#promoTypeC option:selected").text() 
				}
			}
	}
	
	// Stone/Acc Segment LOV
	postJSON('/OrderExecution/api/v1/onloadPromotionsCreate', JSON.stringify(params), function(data) {
		 var stoneOrAccSegList = data.payload.stoneOrAccSegList;
			var se = '<select id="saSegmObjS"  name="saSegmObjS" class="form-control" multiple="multiple">';
				$.each(stoneOrAccSegList, function(key, val) {
				se += '<option value="' + val.id + '">'+ val.code +"-" + val.description + '</option>'; });
				se += '</select>';
				$("#saSegmentS").html(se);
				$('#saSegmObjS').multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				//enableFiltering : true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			
			 stoneOrAccSegListP = data.payload.stoneOrAccSegList;
				var sa = '<select id="saSegmObjC"  name="saSegmObjC" class="form-control" multiple="multiple">';
					$.each(stoneOrAccSegList, function(key, val) {
					sa += '<option value="' + val.id + '">'+ val.code +"-" + val.description + '</option>'; });
					sa += '</select>';
					$("#saSegmentC").html(sa);
					$('#saSegmObjC').multiselect({
					includeSelectAllOption : true,
					maxHeight : 250,
					//enableFiltering : true,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
					});
		});
}

$("#mSegmentMrC").on('change',function(){
	var params = {
			"fieldFilters" : {
			"type": "skinPurities",
			"segId" : $("#mSegmentMrC").val()
			}
		};
	postJSON('/OrderExecution/api/v1/onloadPromotionsCreate', JSON.stringify(params), function(data) {
			$('#sPurityC').empty().append('<option value="" selected>--Select--</option>');
				$.each(data.payload.MetalPurityList, function(key, val) {
				$('#sPurityC').append('<option value="' + val.id + '">' + val.skinPurity + '</option>');
			});
		});
});

$("#regionC").on('change',function(){
	loadStoreNames('C');
});

$("#regionS").on('change',function(){
	loadStoreNames('S');
});

var storeP;
var loadStoreNames = function(page){
	var regC;
	if(page == 'C'){
		regC = $('#regObjC').val();
	}else{
		regC = $('#regObjS').val();
	}
	
	if(regC != null){
		regC = regC.join(',');
	}
	
	var params = {
			"fieldFilters" : {
			"type": "stores",
			"regionList" : regC.toString()
			}
		};
	
		
	if(page == 'C'){$("#storeHide").show();}else{$("#storeHide").hide();}
		postJSON('/OrderExecution/api/v1/onloadPromotionsCreate', JSON.stringify(params), function(data) {
			var storeDc = data.payload.storeWithRegions;
			storeP = data.payload.storeWithRegions;
					
					var t = '<select id="storeObjC"  name="storeObjC" class="form-control" multiple="multiple">';
					$.each(storeDc, function(key, val) {
						t += '<option value="' + val.id + '">' + val.name + '</option>';
					});
					
					t += '</select>';
					
					$("#storeC").html(t);
					
					$("#storeObjC").multiselect({
					includeSelectAllOption : true,
					maxHeight : 250,
					enableFiltering : true,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
				});
				
		 if(page == 'S'){$("#store").show();}else{$("#store").hide();}
				var s = '<select id="storeObjS"  name="storeObjS" class="form-control" multiple="multiple">';
				$.each(storeDc, function(key, val) {
					s += '<option value="' + val.id + '">' + val.name + '</option>';
				});
				
				s += '</select>';
				
				$("#storeS").html(s);
				
				$("#storeObjS").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				enableFiltering : true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'	
				});
			});
     }


$("#storeC").on('change',function(){
	loadZones('C');
});

$("#storeS").on('change',function(){
	loadZones('S');
});

var zoneP;
var loadZones = function(page){
	if(page == 'C' && $("#promoTypeC").val() != "MR") {$("#zoneHide").show();}else{$("#zoneHide").hide();}
	if(page == 'S' && $("#promoTypeS").val() != "MR") {$("#zone").show();}else{$("#zone").hide();}
	var storesC = $('#storeObjC').val();
	
	if(page == 'C'){
		storesC = $('#storeObjC').val();
	}else{
		storesC = $('#storeObjS').val();
	}
	if(storesC != null){
		storesC = storesC.join(',');
	}
	
	var params = {
			"fieldFilters" : {
				"type": "zones",
				"storeList" : storesC.toString()
			}
		};
				
		postJSON('/OrderExecution/api/v1/onloadPromotionsCreate', JSON.stringify(params), function(data) {
			var zone = data.payload.zonesWithStores;
			zoneP = data.payload.zonesWithStores;
					
			var t = '<select id="zoneObjC"  name="zoneObjC" class="form-control" multiple="multiple">';
			$.each(zone, function(key, val) {
				t += '<option value="' + val.id + '">' + val.description + '</option>';
			});
			
			t += '</select>';
			
			$("#zoneC").html(t);
			
			$("#zoneObjC").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
			
			var z1 = '<select id="zoneObjS"  name="zoneObjS" class="form-control" multiple="multiple">';
			$.each(zone, function(key, val) {
				z1 += '<option value="' + val.id + '">' + val.description + '</option>';
			});
			
			z1 += '</select>';
			
			$("#zoneS").html(z1);
			
			$("#zoneObjS").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	});
}


// Load Jewel Types on Change of Article Segment

$("#aSegmC").on('change',function(){
	loadJewelTypes('C');
});

$("#aSegmentS").on('change',function(){
	loadJewelTypes('S');
});


$("#jewelTypeHide").hide();
var jewelTypeP;
var loadJewelTypes = function(page){
	if(page == 'C'){$("#jewelTypeHide").show();}else{$("#jewelTypeHide").hide();}
	var params = {};
	
		if(page == 'C'){
			if($("#promoTypeC").val() == "MC" || $("#promoTypeC").val() == "MCWS" || $("#promoTypeC").val() == "WS" || $("#promoTypeC").val() == "ZJT"){
				params = {
					"fieldFilters" : {
						"type": "jewelType",
						"articleSegIdList" : $("#aSegmC").val()
					}
				}
			}
		}
	
		if(page == 'S'){
			var articleSegsS = $("#artSegObjS").val();
			 if(articleSegsS != null){
				 articleSegsS = articleSegsS.join(','); 
			 }
			 if($("#promoTypeS").val() == "MC" || $("#promoTypeS").val() == "MCWS" || $("#promoTypeS").val() == "WS" || $("#promoTypeS").val() == "ZJT"){
				 params = {
						"fieldFilters" : {
							"type": "jewelType",
							"articleSegIdList" : articleSegsS
						}
					}
				}
		}
	
	postJSON('/OrderExecution/api/v1/onloadPromotionsCreate', JSON.stringify(params), function(data) {
		var jewelTypes = data.payload.jewelTypes;
		jewelTypeP = data.payload.jewelTypes;
		
		var resultJewel = [];
		$.each(jewelTypes, function (i, e) {
		    var matchingItems = $.grep(resultJewel, function (item) {
		       return item.id === e.id && item.label === e.label;
		    });
		    if (matchingItems.length === 0){
		    	resultJewel.push(e);
		    }
		});
		
		var jt = '<select id="jewelObjC"  name="jewelObjC" class="form-control" multiple="multiple">';
		$.each(resultJewel, function(key, val) {
			jt += '<option value="' + val.name  + '">' + val.name + "-" + val.description +'</option>';
		});
		
		jt += '</select>';
		
		$("#jewelTypeC").html(jt);
		
		$("#jewelObjC").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var jtC = '<select id="jewelObjS"  name="jewelObjS" class="form-control" multiple="multiple">';
		$.each(resultJewel, function(key, val) {
			jtC += '<option value="' + val.name  + '">' + val.name + "-" + val.description +'</option>';
		});
		
		jtC += '</select>';
		
		$("#jewelTypeS").html(jtC);
		
		$("#jewelObjS").multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	});
}

$("#saSegmentC").on('change',function(){
	loadCategory('C');
	var saSegmC = $("#saSegmObjC").val();
	var codeArr = [];
	
	if($("#promoTypeC").val() == "LS"){
		$.each(saSegmC,function(k,v){
			$.each(stoneOrAccSegListP,function(key,val){
				if(v == val.id){
					codeDet = {
						"code" : val.code,
					}
				}
			});
			codeArr.push(codeDet);
		});
		$.each(codeArr,function(k,v){
			if((v.code == "DI" && (v.code != "CD" || v.code != "OS"))  || (v.code == "PS" && (v.code != "CD" || v.code != "OS")) ){
				$("#uqcC").val("Cts");
				$("#uqcC").prop('disabled',true);
			}else{
				$("#uqcC").val("");
				$("#uqcC").prop('disabled',false);
			}
		});
	}
});

$("#saSegmentS").on('change',function(){
	loadCategory('S');
});


$("#catHide").hide();
var catP;
var loadCategory = function(page){
	var params = {};
	if(page == 'C'){
		var saSegmC = $("#saSegmObjC").val();
		 if(saSegmC != null){
			 saSegmC = saSegmC.join(','); 
		 }
		 
		 if(page == 'C'){$("#catHide").show();}else{$("#catHide").hide();}
		  params = {
				"fieldFilters" : {
					 "type": "stoneOrAccCat",
					 "promoType": ($("#promoTypeC").val() == "LS" || $("#promoTypeC").val() == "FS") ? $("#promoTypeC option:selected").text() : $("#promoTypeC option:selected").text(),
					 "segId" : saSegmC.toString()
				}
			}
	}
	
	if(page == 'S'){
		var saSegmS = $("#saSegmObjS").val();
		 if(saSegmS != null){
			 saSegmS = saSegmS.join(','); 
		 }
		 
		  params = {
				"fieldFilters" : {
					 "type": "stoneOrAccCat",
					 "promoType": ($("#promoTypeS").val() == "LS" || $("#promoTypeS").val() == "FS") ? $("#promoTypeS option:selected").text() : $("#promoTypeS option:selected").text(),
					 "segId" : saSegmS.toString()
				}
			}
	}

	 postJSON('/OrderExecution/api/v1/onloadPromotionsCreate', JSON.stringify(params), function(data) {
	 	var category = data.payload.stoneOrAccCatList;
	 	catP = data.payload.stoneOrAccCatList;
			
		// Category Lov create
			var c = '<select id="catObjC"  name="catObjC" class="form-control" multiple="multiple">';
			$.each(category, function(key, val) {
				c += '<option value="' + val.id + '">' + val.code + "-" + val.description + '</option>';
			});
			
			c += '</select>';
			
			$("#catC").html(c);
			
			$("#catObjC").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
			
			// Category Lov search
			var ct = '<select id="catObjS"  name="catObjS" class="form-control" multiple="multiple">';
			$.each(category, function(key, val) {
				ct += '<option value="' + val.id + '">' + val.code + "-" + val.description + '</option>';
			});
			
			ct += '</select>';
			
			$("#catS").html(ct);
			
			$("#catObjS").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	 });		
 }

$("#subCatHide").hide();
$("#catC").on('change',function(){
	loadSubCategory('C');
});

$("#catS").on('change',function(){
	loadSubCategory('S');
});

var subCatP;
var loadSubCategory = function(page){
	 var params = {};
	 if(page == 'C' && $("#promoTypeC").val() == "A"){$("#subCatHide").show();}else{$("#subCatHide").hide();}
	 
	 if(page == 'C'){
		 var categoryC = $("#catObjC").val();
		 if(categoryC != null){
			 categoryC = categoryC.join(','); 
		 }
		 params = {
			"fieldFilters" : {
				"type": "stoneOrAccSubCat",
				"promoType": ($("#promoTypeC").val() == "LS") ? $("#promoTypeC option:selected").text() : $("#promoTypeC option:selected").text(),
				"catId" : categoryC.toString()
			}
		}
	 }
	 
	 if(page == 'S'){
		 var categoryS = $("#catObjS").val();
		 if(categoryS != null){
			 categoryS = categoryS.join(','); 
		 }
		 params = {
			"fieldFilters" : {
				 "type": "stoneOrAccSubCat",
				 "promoType": ($("#promoTypeS").val() == "LS") ? $("#promoTypeS option:selected").text() : $("#promoTypeS option:selected").text(),
				"catId" : categoryS.toString()
			}
		}
	 }
	
	 postJSON('/OrderExecution/api/v1/onloadPromotionsCreate', JSON.stringify(params), function(data) {
			var subCategory = data.payload.stoneOrAccSubCatList;
			subCatP = data.payload.stoneOrAccSubCatList;
			
			// subCategory Lov Create
				var b = '<select id="subCatObjC"  name="subCatObjC" class="form-control" multiple="multiple">';
				$.each(subCategory, function(key, val) {
					b += '<option value="' + val.id + '">' + val.code + "-" + val.description + '</option>';
				});
				
				b += '</select>';
				
				$("#subCatC").html(b);
				
				$("#subCatObjC").multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				enableFiltering : true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
			});
				
			// subCategory Lov Search
			var bt = '<select id="subCatObjS"  name="subCatObjS" class="form-control" multiple="multiple">';
			$.each(subCategory, function(key, val) {
				bt += '<option value="' + val.id + '">' + val.code + "-" + val.description + '</option>';
			});
			
			bt += '</select>';
			
			$("#subCatS").html(bt);
			
			$("#subCatObjS").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	 });		
}

var validation;
var disAmtFlag = true;
var disPerFlag = true;
var sdFlag = true;
var edFlag = true;
$("#continue").on('click',function(){
	$("#jqxgridC").jqxGrid('clear');
	var region = $("#regObjC").val();
	var store = $("#storeObjC").val();
	var zone =  $("#zoneObjC").val();
	var articleSeg = $("#artSegObjC").val();
	var jType = $("#jewelObjC").val();
	var isOrder = $("#isOrderC").val();
	var metalSeg = $("#metalSegObjC").val(); 
	var saSegment = $("#saSegObjC").val();
	var category = $("#catObjC").val();
	var subCategory = $("#subCatObjC").val();
	var uqc = $("#uqcC").val();
	
	
	if($("#promoTypeC").val() == "" || $("#promoTypeC").val() == null || $("#promoTypeC").val() == ""){
		$.growl.error({
			"message" : "Please Select Promotion Type !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	else{
		validatePromo();
		 if(validation == true){
			 $("#continue").prop('disabled',true);
			 $("#promoTypeC").prop('disabled',true);
			 $("#promoNameC").prop('disabled',true);
			 $("#regObjC").multiselect("disable");
			 $("#storeObjC").multiselect("disable");
			 $("#mSegmentMrC").prop('disabled',true);
			 $("#mSegmentMrC").prop('disabled',true);
			 $("#sPurityC").prop('disabled',true);
			 $("#zoneObjC").multiselect("disable");
			 $("#saSegmObjC").multiselect("disable");
			 $("#catObjC").multiselect("disable");
			 $("#subCatObjC").multiselect("disable");
			 $("#jewelObjC").multiselect("disable");
			 $("#isOrderC").prop('disabled',true);
			 $("#aSegmC").prop('disabled',true);
			 
			  disAmtFlag = false;
			  disPerFlag = false;
			  sdFlag = false;
			  edFlag = false;
			 
			var promoData = getPromoCombinations();
				if(promoData){
					postJSON('/OrderExecution/api/v1/getAllCombinationsOfPromotions',JSON.stringify(promoData),function(response){
					if(response.resCode == 1){
						var result = response.payload.allCombinations;
						
						promotionCreateGrid(result);
						$("#jqxgridC").show();
						$("#footerHide").show();
					}else{
						$("#jqxgridC").jqxGrid('clear');
						$("#footerHide").hide();
						$.growl.error({
							message : response.mesgStr,
							duration : 10000,
							title : 'Error'
						});
						return false;
					 }
					});
				}
			}
		}
});

var validatePromo = function(){
	var promotionType = $("#promoTypeC").val();
	var promotionName = $("#promoNameC").val();
	var region = $("#regObjC").val();
	var store = $("#storeObjC").val();
	var zone = $("#zoneObjC").val();
	var metalSeg = $("#metalSegObjC").val();
	var metalSegmnt = $("#mSegmentMrC").val();
	var artSegm = $("#aSegmC").val();
	var stAccSeg = $("#saSegmObjC").val();
	var jewType = $("#jewelObjC").val();
	var category = $("#catObjC").val();
	var subCat = $("#subCatObjC").val();
	var isOrder = $("#isOrderC").val();
	var uqc = $("#uqcC").val();
	var skinPurity = $("#sPurityC").val();
	
	if(promotionType == "MR"){
		if(promotionName == "" || region == "" || store == "" || metalSegmnt == "" || skinPurity == ""){
			$.growl.error({
				message : "Please Fill Mandatory Fields !!!",
				duration : 10000,
				title : 'Error'
			});
			validation = false;
		}else{
			validation = true;
		}
	}
	
	if(promotionType == "ZJT"){
		if(promotionName == "" || region == "" || store == "" || zone == "" || jewType == "" || artSegm == ""){
			$.growl.error({
				message : "Please Fill Mandatory Fields !!!",
				duration : 10000,
				title : 'Error'
			});
			validation = false;
		}else{
			validation = true;
		}
	}
	
	if(promotionType == "MC" || promotionType == "WS" || promotionType == "MCWS"){
		if(promotionName == "" || region == "" || store == "" || zone == "" || metalSegmnt == "" || artSegm == "" || jewType == ""
			|| isOrder == ""){
			$.growl.error({
				message : "Please Fill Mandatory Fields !!!",
				duration : 10000,
				title : 'Error'
			});
			validation = false;
		}else{
			validation = true;
		}
	}
	
	if(promotionType == "A"){
		if(promotionName == "" || region == "" || store == "" || zone == "" || stAccSeg == "" || category == "" || subCat == ""
			|| isOrder == ""){
			$.growl.error({
				message : "Please Fill Mandatory Fields !!!",
				duration : 10000,
				title : 'Error'
			});
			validation = false;
		}else{
			validation = true;
		}
	}
	
	if(promotionType == "LS"){
		if(promotionName == "" || region == "" || store == "" || zone == "" || stAccSeg == "" || category == "" || uqc == "" || isOrder == ""){
			$.growl.error({
				message : "Please Fill Mandatory Fields !!!",
				duration : 10000,
				title : 'Error'
			});
			validation = false;
		}else{
			validation = true;
		}
	}
	
	if(promotionType == "FS"){
		if(promotionName == "" || region == "" || store == "" || zone == "" || stAccSeg == "" ||  jewType == "" || category == ""
			|| isOrder == ""){
			$.growl.error({
				message : "Please Fill Mandatory Fields !!!",
				duration : 10000,
				title : 'Error'
			});
			validation = false;
		}else{
			validation = true;
		}
	}
}

var getArtSegment = function(){
	var artSeg = $("#aSegmC").val();
	var artSegDesc = $("#aSegmC option:selected").text();
	var asCode = $("#aSegmC option:selected").attr('idP');
	
	var resultSeg = [];
	var artSegDet = {
			"id" : artSeg,
			"code" : asCode,
			"description" : artSegDesc
		}
	resultSeg.push(artSegDet);
	
	return resultSeg;
}

var getPromoCombinations =  function(){
	var headerGridData = $("#jqxgrid").jqxGrid('getrows');
	var region = $("#regObjC").val();
	var store = $("#storeObjC").val();
	var zone = $("#zoneObjC").val();
	var artSeg = $("#artSegObjC").val();
	var jewelType =  $("#jewelObjC").val();
	var catC =  $("#catObjC").val();
	var stAccSegm =  $("#saSegmObjC").val();
	var sDate,startDate,eDate,endDate;
	var discAmt ,discPerc;
	
	var regArr = [];
	var regDet;
	var storeArry = [];
	var storeDet;
	var zoneArr = [];
	var zoneDet;
	
	var stAccArr = [];
	var stAccDet ;
	var catArr = [];
	var catDet;
	
	$.each(region,function(k,v){
		$.each(regionP,function(key,val){
			if(v == val.id){
				 regDet = {
					"id" : val.id,
					"name" : val.name
				}
			}
		});
		regArr.push(regDet);
	});
	
	$.each(store,function(k,v){
		$.each(storeP,function(key,val){
			if(v == val.id){
				storeDet = {
					"id" : val.id,
					"name" : val.name
				}
			}
		});
		storeArry.push(storeDet);
	});
	
	$.each(zone,function(k,v){
		$.each(zoneP,function(key,val){
			if(v == val.id){
				zoneDet = {
					"id" : val.id,
					"name" : val.name,
					"description" : val.description
				}
			}
		});
		zoneArr.push(zoneDet);
	});
	
	for(var i=0;i<headerGridData.length;i++){
		
			if(headerGridData[i].startDate != "" || headerGridData[i].endDate != "" ){
				sDate = headerGridData[i].startDate;
				startDate = sDate.getDate() + "/" + (sDate.getMonth() + 1) + "/" + sDate.getFullYear();
				
				eDate = headerGridData[i].endDate;
				endDate = eDate.getDate() + "/" + (eDate.getMonth() + 1) + "/" +eDate.getFullYear();
			}
			
			discPerc = parseFloat(headerGridData[i].disPerc);
			discAmt = parseFloat(headerGridData[i].disAmt);
	 }
	 
		var promoCombnData = {
			  "promoType": $("#promoTypeC option:selected").text(),
			  "promoName": $("#promoNameC").val(),
			  "isOrder": ($("#isOrderC").val() == 1) ? true : false,
			  "uom": $("#uqcC").val(),
			  "promoStartDate": startDate,
			  "promoEndDate": endDate,
			  "promoFaltPercent": discPerc,
			  "promoFlatPercentValue": discAmt,
			  "regionIdList" : regArr,
			  "storeIdList" : storeArry ,
			  "zoneIdList" : ($("#promoTypeC").val() != "MR") ? zoneArr : null,
			  "jewelTypeIdList" : ($("#promoTypeC").val() != "MR") ? getJewelType() : null ,
			  "articlesegIdList" : ($("#promoTypeC").val() == "ZJT" || $("#promoTypeC").val() == "MC" || $("#promoTypeC").val() == "WS" || $("#promoTypeC").val() == "MCWS")  ? getArtSegment() : null,
			  "stoneOrAccSegIdList" : ($("#promoTypeC").val() == "FS" || $("#promoTypeC").val() == "A" || $("#promoTypeC").val() == "LS") ?  getStAccSeg() : null,
			  "catIdList" : ($("#promoTypeC").val() == "A"  || $("#promoTypeC").val() == "FS" || $("#promoTypeC").val() == "LS" ) ?  getCategory() : null,
			  "subCatIdList" : ($("#promoTypeC").val() == "A") ? getSubCategory() : null ,
			  "metalsegIdList": ($("#promoTypeC").val() == "MR" || $("#promoTypeC").val() == "MC" || $("#promoTypeC").val() == "WS" || $("#promoTypeC").val() == "MCWS") ? [{"id": parseInt($("#mSegmentMrC").val()),"code": $("#mSegmentMrC option:selected").attr('idE'),"description": $("#mSegmentMrC option:selected").text()}] : null
			}
		return promoCombnData;
	}


var getJewelType = function(){
	var artSegArr = [];
	var artSegDet;
	var jewelType =  $("#jewelObjC").val();
	if($("#promoTypeC").val() == "MR" || $("#promoTypeC").val() == "ZJT" || $("#promoTypeC").val() == "MC" || $("#promoTypeC").val() == "WS" ||  $("#promoTypeC").val() == "MCWS"){
		$.each(jewelType,function(k,v){
			$.each(jewelTypeP,function(key,val){
				if(v == val.name){
					artSegDet = {
						"id" : val.id,
						"name" : val.name,
						"description" : val.description,
						"segVal" : val.value
					}
				}
			});
			artSegArr.push(artSegDet);
		});
	
	}
	
	if($("#promoTypeC").val() == "FS"){
		$.each(jewelType,function(k,v){
			$.each(jewelFs,function(key,val){
				if(v == val.id){
					artSegDet = {
						"id" : val.id,
						"name" : val.name,
						"description" : val.description,
					}
				}
			});
			artSegArr.push(artSegDet);
		});
	}
 return artSegArr;
} 


var getStAccSeg = function(){
	var stAccSegm = $("#saSegmObjC").val();
	var stAccSegmDet;
	var stAccSegmArry = [];
	var stAccArr = [];
	var stAccDet;
	
	if($("#promoTypeC").val() == "A"){
		$.each(stAccSegm,function(k,v){
			$.each(stoneOrAccSegListP,function(key,val){
				if(v == val.id){
					stAccSegmDet = {
						"id" : val.id,
						"code" : val.code,
						"description" : val.description,
					}
				}
			});
			stAccSegmArry.push(stAccSegmDet);
		});
	}

	if($("#promoTypeC").val() == "LS" || $("#promoTypeC").val() == "FS"){
		var catArr = getCategory();
		$.each(catArr,function(k,v){
			$.each(stoneOrAccSegListP,function(key,val){
				if(v.stSeg == val.id){
					stAccDet = {
						"id" : val.id,
						"name" : val.code,
						"description" : val.description,
					}
				}
			});
			stAccArr.push(stAccDet);
		});

		// removing duplicate Stone segments
		var stAccSegmArry = [];
		$.each(stAccArr, function (i, e) {
		    var matchingItems = $.grep(stAccSegmArry, function (item) {
		       return item.name === e.name && item.label === e.label;
		    });
		    if (matchingItems.length === 0){
		    	stAccSegmArry.push(e);
		    }
		});
	}
	return stAccSegmArry;
}

var getCategory = function(){
	var scArr = getSubCategory();
	var catC = $("#catObjC").val();
	var catDet ;
	var catDetArr = [];
	
	if($("#promoTypeC").val() == "LS" || $("#promoTypeC").val() == "FS" ){
		$.each(catC,function(k,v){
			$.each(catP,function(key,val){
				if(v == val.id){
					catDet = {
						"id" : val.id,
						"name" : val.name,
						"description" : val.description,
						"stSeg" : val.stoneOrAcId
					}
				}
			});
			catDetArr.push(catDet);
		});
	}
	
	if($("#promoTypeC").val() == "A"){
		$.each(scArr,function(k,v){
			$.each(catP,function(key,val){
				if(v.stoneOrAcId == val.id){
					catDet = {
						"id": val.id,
						"description": val.description,
						"code": val.code,
						"stSeg": val.stoneOrAcId
					}
				}
			});
			catDetArr.push(catDet);
		});
	}
	return catDetArr;
}

var getSubCategory = function(){
	var subCat = $("#subCatObjC").val();
	var subCatDet;
	var subCatArr = [];
	
	$.each(subCat,function(k,v){
		$.each(subCatP,function(key,val){
			if(v == val.id){
				subCatDet = {
				"id": val.id,
				"description": val.description,
				"code": val.code,
				"stoneOrAcId": val.category.id
				}
			}
		});
		subCatArr.push(subCatDet);
	});
	return subCatArr;
}

var promotionCreateDet = function(){
	var promoDet = $('#jqxgridC').jqxGrid('getrows');
	var promoDetArr = [];
	var strtDate,endDate;
	$.each(promoDet,function(key,val){
		
		if(val.startDt != "" || val.endDt != "" ){
			var sDate = val.startDt;
			var eDate = val.endDt;
			var date1 = new Date(sDate);
			var dd1 = date1.getDate();
			var mm1 = date1.getMonth() + 1;
			var yy1 = date1.getFullYear();
			 strtDate = dd1 + "/" + mm1 + "/" + yy1;
			
			var date2 = new Date(eDate);
			var dd2 = date2.getDate();
			var mm2 = date2.getMonth() + 1;
			var yy2 = date2.getFullYear();
			
			endDate = dd2 + "/" + mm2 + "/" + yy2;
		}
		var promoCreateData = {
		        "id": null,
		        "promoType": val.promoType,
		        "promoName": val.promoName,
		        "promoRegion": {
		          "id": val.regionId,
		          "name": val.region
		        },
		        "promoStore": {
		          "id": val.storeId,
		          "name": val.store
		        },
		        "promoStartDate": strtDate,
		        "promoEndDate":  endDate,
		        "promoZone": {
		          "id": val.zoneId,
		          "zone_id": null,
		          "code": null,
		          "description": val.zone
		        },
		        "promoMetalSegment": {
		        	"id": val.metSegId,
		        	"segmentId": val.metSegId,
		        	"description": val.metalSeg,
		        	"code": val.metSegCode
		        },
		        "promoArticleSegment": {
		          "id": val.artSegId,
		          "segmentId":val.artSegId,
		          "description": val.artSeg,
		          "code": val.artSegCode
		        },
		        "promoJewelType": {
		        	"id": val.jewelId,
		        	"code": val.jewelCode,
		        	"description": val.jewType
		        },
		        "promoStoneOrAccSegment":{
		        	"id": val.stAccSegId,
			        "code": val.stAccSegCode,
			        "description": val.stoneAccSeg
		        },
		        "promoCategory": {
		        	"id": val.catId,
			        "code": val.catCode,
			        "description": val.cat
		        },
		        "promoSubCategory": {
		        	"id": val.subCatId,
			        "code":  val.subCatCode,
			        "description": val.subCat
		        },
		        "uom": val.uqc,
		        "promoFaltPercent": val.discPerc,
		        "promoFlatPercentValue": val.discAmt,
		        "isOrderValue": val.isOrder,
		        "metalPurityDTO" : ($("#promoTypeC").val() == "MR")  ? {"id" : $("#sPurityC").val(),"skinPurity" : $("#sPurityC option:selected").text()}: null
		       
		}
		promoDetArr.push(promoCreateData);
	});
	return promoDetArr;
};

var status = true;
$("#savePromotion").on('click',function(){
	var promoDetC = $('#jqxgridC').jqxGrid('getrows');
	var sDt,eDt,discAmt,prmType,discPerc;
	for (var i = 0; i < promoDetC.length; i++) {
		 var row = promoDetC[i];
		 sDt = row.startDt;
		 eDt = row.endDt;
		 discPerc = row.discPerc;
	
		 discAmt = row.discAmt;
		 prmType = row.promoType;
	}

	if(prmType == "MetalRate"){
		if(discAmt == "" || discAmt == null){
			$.growl.error({
				message : "Discount Amount is Mandatory !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	}
	if(sDt == "" || sDt == null || eDt == "" || eDt == null){
		$.growl.error({
			message : "Please Fill Date Fields !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	
	if(prmType != "MetalRate"){
		if(discPerc == "" || discPerc == null){
			$.growl.error({
				message : "Discount % is Mandatory !!!",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	}
	
		var createDet = promotionCreateDet();
		if(createDet){
			postJSON('/OrderExecution/api/v1/createPromotions',JSON.stringify(createDet),function(data) {
				if(data.resCode == 1){
					$.growl.notice({
						message : data.mesgStr,
						duration : 10000,
						title : 'Success'
					});
					redirect();
				}else{
					$.growl.error({
						message : data.mesgStr,
						duration : 10000,
						title : 'Error'
					});
					return false;
				}
			});
		}

});


//######################################### Promotion Search Started ###################################

var searchOnLoadFunction = function(){
	postJSON('/OrderExecution/api/v1/onloadPromotionsCreate', JSON.stringify({"fieldFilters": {"type": "lovsForSearch"}}), function(data) {
		var mSegList = data.payload.AllMetalOrArticleSegments;
		var stoneOrAccSegList = data.payload.AllStoneOrAccSegments;
		var category = data.payload.AllCategories;
		var subCat = data.payload.AllSubCategories;
		var jewelList = data.payload.AllewelTypes;
		var promoTyp = data.payload.promotionTypes;
		
			
		// Store Lov
			var store1 = '<select id="storeObjS" class="form-control" multiple="multiple"></select>';
			$("#storeS").html(store1);
			$('#storeObjS').multiselect({
				includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
			    buttonClass : 'col-md-12 form-control text-left'
			});
			
			
			var zone1 = '<select id="zoneObjS" class="form-control" multiple="multiple"></select>';
			$("#zoneS").html(zone1);
			$('#zoneObjS').multiselect({
				includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
			    buttonClass : 'col-md-12 form-control text-left'
			});
			
			var jewel = '<select id="jewelObjS" class="form-control" multiple="multiple"></select>';
			$("#jewelTypeS").html(jewel);
			$('#jewelObjS').multiselect({
				includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
			    buttonClass : 'col-md-12 form-control text-left'
			});
			
	// Category LOV
			var cat1 = '<select id="catObjS" class="form-control" multiple="multiple"></select>';
			$("#catS").html(cat1);
			$('#catObjS').multiselect({
				includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
			    buttonClass : 'col-md-12 form-control text-left'
			});
			
			
	 // Sub Category LOV
			var su = '<select id="subCatObjS" class="form-control" multiple="multiple"></select>';
			$("#subCatS").html(su);
			$('#subCatObjS').multiselect({
				includeSelectAllOption : true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
			    buttonClass : 'col-md-12 form-control text-left'
			});
	});
}

searchOnLoadFunction();

// Search Field Filters
var promoSearchFieldFilters = function(){
	var promoTypeS = $("#promoTypeS").val();
	var status = $('#statusS').val();
	var promoNameS = $('#promoNameS').val();
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var regObjS = $('#regObjS').val();
	var storeObjS = $('#storeObjS').val();
	var zoneObjS = $('#zoneObjS').val();
	var metalSegObjS = $('#metalSegObjS').val();
	var artSegObjS =$("#artSegObjS").val();
	var saSegmObjS =$("#saSegmObjS").val();
	var catObjS =$("#catObjS").val();
	var jewelObjS =$("#jewelObjS").val();
	var subCatObjS =$("#subCatObjS").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if(promoTypeS != "" && promoTypeS != null){
		fieldFilters.fieldFilters["promoType"] = promoTypeS
	}
	if (promoNameS != "" && promoNameS != null) {
		fieldFilters.fieldFilters["promoNameList"] = promoNameS;
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["statusList"] = status;
	}
	
	if (regObjS == null || regObjS == "") {
		var regS = "";
	} else {
		var regS = regObjS.join(",");
	}
	if (regS != "" && regS != null) {
		fieldFilters.fieldFilters["regionList"] = regS;
	}
	
	if (storeObjS == null || storeObjS == "") {
		var storeS = "";
	} else {
		var storeS = storeObjS.join(",");
	}
	if (storeS != "" && storeS != null) {
		fieldFilters.fieldFilters["storeList"] = storeS;
	}
	
	if (zoneObjS == null || zoneObjS == "") {
		var zoneS = "";
	} else {
		var zoneS = zoneObjS.join(",");
	}
	if (zoneS != "" && zoneS != null) {
		fieldFilters.fieldFilters["zoneList"] = zoneS;
	}
	
	if(metalSegObjS == "" || metalSegObjS == null){
		var metSegS = "";
	}else{
		var metSegS = metalSegObjS.join(",");
	}
	if(metSegS != "" && metSegS != null){
		fieldFilters.fieldFilters["metalSegList"] = metSegS; 
	}
	
	if( artSegObjS == "" || artSegObjS == null){
		var artSegS = "";
	}else{
		var artSegS = artSegObjS.join(",");
	}
	if(artSegS != "" && artSegS != null){
		fieldFilters.fieldFilters["articleSegList"] = artSegS;
	}
	
	if( saSegmObjS == "" ||  saSegmObjS == null){
	 var saSegS	=  "";
	}else{
		var saSegS = saSegmObjS.join(",");
	}
	if( saSegS != "" &&  saSegS != null){
		fieldFilters.fieldFilters["stonOrAccSegList"] = saSegS;
	}
	
	if( catObjS == "" || catObjS == null ){
		var catS = "";
	}else{
		var catS = catObjS.join(",");
	}
	if(catS !="" && catS != null){
		fieldFilters.fieldFilters["catList"] = catS;
	}
	
	if( jewelObjS == "" || jewelObjS == null ){
		var jwlTypeS = "";
	}else{
		var jwlTypeS = jewelObjS.join(",");
	}
	if(jwlTypeS !="" && jwlTypeS != null){
		fieldFilters.fieldFilters["jewelList"] = jwlTypeS;
	}
	
	if( subCatObjS == "" || subCatObjS == null ){
		var subCatgS = "";
	}else{
		var subCatgS = subCatObjS.join(",");
	}
	if(subCatgS !="" && subCatgS != null){
		fieldFilters.fieldFilters["subCatList"] = subCatgS;
	}
	
//	fieldFilters.fieldFilters["portal"] = "OE";
	return fieldFilters;
}


var promoDelete = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	var val = "";
	/*if(permission.canDelete == false){
		return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#myModalDel" disabled  type="button" ><i class="fa fa-pencil fa-sm"></i></a>';
		
	}else{*/

		var status = $('#stonePOMRVGrid').jqxGrid('getcellvalue', row, 'isActive');
		var stDate = $('#stonePOMRVGrid').jqxGrid('getcellvalue', row, 'startDateE');
		//var d = new Date();
		//var sDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
		/*var deleteFlag = false;
		if(stDate >convert(d)){
			deleteFlag = true;
		}else{
			deleteFlag = false;
		}*/
		 			
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!

		var yyyy = today.getFullYear();
		if (dd < 10) {
		  dd = '0' + dd;
		} 
		if (mm < 10) {
		  mm = '0' + mm;
		} 
		var today = dd + '/' + mm + '/' + yyyy;

		var vDate = stDate.split('/');

		
		if((new Date(vDate[2],vDate[1],vDate[0]) != new Date(yyyy,mm,dd)) && (new Date(vDate[2],vDate[1],vDate[0]) <= new Date(yyyy,mm,dd))) {
			deleteFlag = false;
		}else{
			deleteFlag = true;
		}
		
		if(status == true && deleteFlag == true){
		var editVal =  '<button class="btn btn-sm btn-danger" data-toggle="modal" data-target="#myModalDel" type="button"  id='+ row + ' onclick="deletePromo('+ value+ ')" ><i class="fa fa-trash fa-1"></i> </button>';
		}else{
			var editVal = '<button  class="btn btn-sm btn-primary" type="button" disabled><i class="fa fa-trash fa-1"></i></button>';
		}
		return editVal;
	//}
}

var process = function (date){
	var parts = date.split("/");
	return new Date(parts[2], parts[1] - 1, parts[0]);
}



var deletePromo = function(id){
	$('#btnDelteYes').click(function () {
		$.getJSON('/OrderExecution/api/v1/deletePromotions?id='+id, function(data) {
			if (data.resCode == "1") {							
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#myModalDel').modal('hide');	
				promotionSearchGrid();
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
			}
		});
	});
}



$("#search").on('click',function(){
	var status = $("#statusS").val();
	if(status == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		if(status == 0){
			$("#editPromo").prop('disabled',true);
		}else{
			$("#editPromo").prop('disabled',false);
		}
		var permission = localStorage.getItem("permission");
		permission = $.parseJSON(permission);
		//if(permission.canEdit == true){
			
			$("#editSection").show();
		/*}else{
			$("#editPromo").prop('disabled',true);
			$("#editSection").hide();
		}*/
		
			 disPercFlag = false ;
			 sDateFlag = false;
			 eDate = false;
			 disAmtFlag = false;
			 
			promotionSearchGrid();
			$("#stonePOMRVGrid").show();
			//$("#search").prop('disabled',true);
	}
	
});

var startDateV,endDateV;
var stDtEditFlag = false;
var endDtEditFlag = false;
var promotionSearchGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
            {'name' : 'slNo','type' : 'int','map' : 'id'},
			{'name' : 'promoType','type' : 'string','map' : 'promoType'}, 
			{'name' : 'promoName','type' : 'string','map' : 'promoName'},
			{'name' : 'region','type' : 'string','map' : 'promoRegion>name'},
			{'name' : 'store','type' : 'string','map' : 'promoStore>name'},
			{'name' : 'zone','type' : 'string','map' : 'promoZone>description'}, 
			{'name' : 'metalSeg','type' : 'string','map' : 'promoMetalSegment>description'},
			{'name' : 'artSeg','type' : 'string','map' : 'promoArticleSegment>description'}, 
			{'name' : 'jewType','type' : 'string','map' : 'promoJewelType>description'}, 
			{'name' : 'saSeg','type' : 'string','map' : 'promoStoneOrAccSegment>description'},
			{'name' : 'cat','type' : 'string','map' : 'promoCategory>description'},
			{'name' : 'subCat','type' : 'string','map' : 'promoSubCategory>description'},
			{'name' : 'uqc','type' : 'string','map' : 'uom'},
			{'name' : 'disAmt','type' : 'float','map' : 'promoFlatPercentValue'}, 
			{'name' : 'disPerc','type' : 'float','map' : 'promoFaltPercent'}, 
			{'name' : 'orderType','type' : 'string','map' : 'isOrderValue'},
			{'name' : 'startDate','type' : 'string','map' : 'promoStartDate'},
			{'name' : 'endDate','type' : 'string','map' : 'promoEndDate'},
			{'name' : 'createdBy','type' : 'string','map' : 'createdBy'}, 
			{'name' : 'isActive','type' : 'string','map' : 'isActive'},
			{'name' : 'selectionStatus','type' : 'bool'},
			
			{'name' : 'regionId','type' : 'int','map' : 'promoRegion>id'},
			{'name' : 'storeId','type' : 'int','map' : 'promoStore>id'},
			{'name' : 'zoneId','type' : 'int','map' : 'promoZone>id'},
			{'name' : 'zoneCode','type' : 'int','map' : 'promoZone>code'},
			
			{'name' : 'metalSegId','type' : 'int','map' : 'promoMetalSegment>id'},
			{'name' : 'metalSegCode','type' : 'int','map' : 'promoMetalSegment>code'},
			{'name' : 'artSegId','type' : 'int','map' : 'promoArticleSegment>id'},
			{'name' : 'artSegCode','type' : 'int','map' : 'promoArticleSegment>code'},
			{'name' : 'saSegId','type' : 'int','map' : 'promoStoneOrAccSegment>id'},
			{'name' : 'saSegCode','type' : 'int','map' : 'promoStoneOrAccSegment>code'},
			{'name' : 'jewelId','type' : 'int','map' : 'promoJewelType>id'},
			{'name' : 'jewelCode','type' : 'int','map' : 'promoJewelType>code'},
			{'name' : 'catId','type' : 'int','map' : 'promoCategory>id'},
			{'name' : 'catCode','type' : 'int','map' : 'promoCategory>code'},
			{'name' : 'subCatId','type' : 'int','map' : 'promoSubCategory>id'},
			{'name' : 'subCatCode','type' : 'int','map' : 'promoSubCategory>code'},
			{'name' : 'purityId','type' : 'float','map' : 'metalPurityDTO>id'},
			{'name' : 'purity','type' : 'float','map' : 'metalPurityDTO>skinPurity'},
			
			{'name' : 'isOrder','type' : 'string'},
			{'name' : 'isOrderValue','type' : 'string'},
			{'name' : 'promotionId','type' : 'int'},
			{'name' : 'promoId','type' : 'int','map':'promotionId'},
			{'name' : 'startDateE','type' : 'string','map' : 'promoStartDate'},
			{'name' : 'endDateE','type' : 'date','map' : 'promoEndDate'},
			{'name' : 'stDtEditFlag','type' : 'bool'},
			{'name' : 'endDtEditFlag','type' : 'bool'},
        ];
   
    var columns = [
    		{ text  :'status','datafield': 'statusEditableFeild','width' : '5%',cellsalign : 'center', hidden:true,
				 cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
							var rows = $("#stonePOMRVGrid").jqxGrid("getrows");
							$("#stonePOMRVGrid").jqxGrid('setcellvalue', row, 'statusEditableFeild',false);
							$("#stonePOMRVGrid").jqxGrid('setcellvalue', row, 'stDtEditFlag',false);
							$("#stonePOMRVGrid").jqxGrid('setcellvalue', row, 'endDtEditFlag',false);
				 }
			},
			{ text  :'sdt','datafield': 'stDtEditFlag','width' : '5%',cellsalign : 'center', hidden:true,},
			{ text  :'edt','datafield': 'endDtEditFlag','width' : '5%',cellsalign : 'center', hidden:true,},
			{'text' : 'Sl No.','datafield' : 'slNo','width' : '3%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
			{'text' : 'Promo Id','datafield' : 'promoId','width' : '3%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
			{'text' : 'Promo Type','datafield' : 'promoType','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			{'text' : 'Promo Name','datafield' : 'promoName','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Region','datafield' : 'region','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'}, 
			{'text' : 'Store','datafield' : 'store','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Zone','datafield' : 'zone','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Metal Seg','datafield' : 'metalSeg','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Article Seg','datafield' : 'artSeg','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Jewel Type','datafield' : 'jewType','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Stone/Acc Seg','datafield' : 'saSeg','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Cat','datafield' : 'cat','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Sub Cat','datafield' : 'subCat','width' : '8%',editable : false,sortable : false,cellsalign : 'left',align : 'center'} ,
			{'text' : 'Skin Purity','datafield' : 'purity','width' : '5%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'} ,
			{'text' : 'UQC','datafield' : 'uqc','width' : '3%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Discount Amt','datafield' : 'disAmt','width' : '5%',editable : true,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				cellbeginedit : function(row){
					  var active =  $('#stonePOMRVGrid').jqxGrid('getcellvalue', row, 'isActive');
					  var promoType =  $('#stonePOMRVGrid').jqxGrid('getcellvalue', row, 'promoType');
						if(disAmtFlag == true  && active ==  true && promoType == "MetalRate"){
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
						$("#stonePOMRVGrid").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
							if(newvalue <= 0){
								$.growl.error({
									message : "Please enter Valid Discount Amount !!!",
									duration :10000,
									title : 'Error'
								});
								return "";
							}
					}
			},
			{'text' : 'Discount %','datafield' : 'disPerc','width' : '5%',editable : true,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2',
				cellbeginedit : function(row){
					  var active =  $('#stonePOMRVGrid').jqxGrid('getcellvalue', row, 'isActive'); 
					  var promoType =  $('#stonePOMRVGrid').jqxGrid('getcellvalue', row, 'promoType');
					  
						if(disPercFlag == true && active == true && promoType != "MetalRate"){
							return true;
						}else{
							return false;
						}
					},
				cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue){
						$("#stonePOMRVGrid").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
							if(newvalue <= 0 || newvalue > 100.00){
								$.growl.error({
									message : "Please enter Valid Discount % !!!",
									duration :10000,
									title : 'Error'
								});
								return "";
							}
					}else{
						$("#stonePOMRVGrid").jqxGrid('setcellvalue', row, 'statusEditableFeild',false);
					}
				}
			},
			{'text' : 'Order Type','datafield' : 'orderType','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Start DateE','datafield' : 'startDateE','width' : '3%',editable : false,cellsalign : 'center',align : 'center',sortable : false,cellsformat : 'dd/MM/yyyy',hidden:true},
			{'text' : 'Start Date','datafield' : 'startDate','width' : '6%',editable : true,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy',columntype: 'datetimeinput',
				createeditor : function(rowIndex,cellValue, editor) {
					var d = new Date();
					d.setDate(d.getDate() - 1);
					var dt = d.toLocaleString();
					
					// var date= startDateV;
					 var d=new Date();
					 var dd=d.getDate();
					 var mm=d.getMonth()+1;
					 var yy=d.getFullYear();
					 var newdate1=yy+"/"+mm+"/"+dd;
					 
					editor.jqxDateTimeInput('setMinDate',newdate1);
				},
				cellbeginedit : function(row){
					  var sflag = false;
					  var active =  $('#stonePOMRVGrid').jqxGrid('getcellvalue', row, 'isActive');
					  var startDate =  $('#stonePOMRVGrid').jqxGrid('getcellvalue', row, 'startDate');
					  startDateV =  $('#stonePOMRVGrid').jqxGrid('getcellvalue', row, 'startDateE');
					  
						var today = new Date();
						var dd = today.getDate();
						var mm = today.getMonth() + 1; //January is 0!

						var yyyy = today.getFullYear();
						if (dd < 10) {
						  dd = '0' + dd;
						} 
						if (mm < 10) {
						  mm = '0' + mm;
						} 
						var today = dd + '/' + mm + '/' + yyyy;

						var vDate = startDateV.split('/');

						
						if((new Date(vDate[2],vDate[1],vDate[0]) != new Date(yyyy,mm,dd)) && (new Date(vDate[2],vDate[1],vDate[0]) <= new Date(yyyy,mm,dd))) {
							sflag = false;
						}else{
							sflag = true;
						}
					  
					  	/*var d = new Date();
						var sDate = convert(d); 
							
						if(startDateV > sDate){
							sflag = true;
						}else{
							sflag = false;
						}*/
						
						if(sDateFlag == true && sflag == true){
							return true;
						}else{
							return false;
						}
					},
				cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue){
						$("#stonePOMRVGrid").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
						$("#stonePOMRVGrid").jqxGrid('setcellvalue', row, 'stDtEditFlag',true);
						
						  var endDate =  $('#stonePOMRVGrid').jqxGrid('getcellvalue', row, 'endDateE');
						
							  
						 if(newvalue !="" || newvalue != "undefined" || newvalue != null && stDtEditFlag == true ){
							var startDt = newvalue.getDate() + "/" + (newvalue.getMonth() + 1) + "/" + newvalue.getFullYear();
						  }
						 
						
						  if(newvalue > endDate){
							  $.growl.error({
								  message : "Please Enter End Date greater than " + startDt,
								  duration : 10000,
								  title : 'Error'
							  });
							  return ;
						  }
					}else{
						$("#stonePOMRVGrid").jqxGrid('setcellvalue', row, 'statusEditableFeild',false);
					}
				}
			},
			{'text' : 'Start DateE','datafield' : 'endDateE','width' : '3%',editable : false,cellsalign : 'center',align : 'center',sortable : false,cellsformat : 'dd/MM/yyyy',hidden:true},
			{'text' : 'End Date','datafield' : 'endDate','width' : '6%',editable : true,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy',columntype: 'datetimeinput',
				cellbeginedit : function(row){
					  var active =  $('#stonePOMRVGrid').jqxGrid('getcellvalue', row, 'isActive'); 
					  startDateV =  $('#stonePOMRVGrid').jqxGrid('getcellvalue', row, 'startDateE');
						if(eDate == true){
							return true;
						}else{
							return false;
						}
					},
				createeditor : function(rowIndex,cellValue, editor) {
					
					var d = new Date();
					d.setDate(d.getDate() - 1);
					
					 var date= startDateV;
					 var d=new Date(date.split("/").reverse().join("-"));
					 var dd=d.getDate();
					 var mm=d.getMonth()+1;
					 var yy=d.getFullYear();
					 var newdate2=yy+"/"+mm+"/"+dd;
					 
					 editor.jqxDateTimeInput('setMinDate', newdate2);
				},
				cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var dateOnly = new Date($("#stonePOMRVGrid").jqxGrid('getcellvalue', row,'startDate'));
					var dateOnly1 = ($("#stonePOMRVGrid").jqxGrid('getcellvalue', row,'startDate'));
					var date = new Date(newvalue).toDateString("dd-MM-yyyy");
					
					var dd = newvalue.getDate();
					var mm = newvalue.getMonth() + 1; //January is 0!

					var yyyy = newvalue.getFullYear();
					if (dd < 10) {
					  dd = '0' + dd;
					} 
					if (mm < 10) {
					  mm = '0' + mm;
					} 
					var today = dd + '/' + mm + '/' + yyyy;
					
					if(newvalue){
						$("#stonePOMRVGrid").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
						$("#stonePOMRVGrid").jqxGrid('setcellvalue', row, 'endDtEditFlag',true);
						/*	var startDate = jQuery('#stonePOMRVGrid').jqxGrid ('getcellvalue', row, 'startDate');
						
						var dd = newvalue.getDate();
						var mm = newvalue.getMonth() + 1; //January is 0!

						var yyyy = newvalue.getFullYear();
						if (dd < 10) {
						  dd = '0' + dd;
						} 
						if (mm < 10) {
						  mm = '0' + mm;
						} 
						var today = dd + '/' + mm + '/' + yyyy;

						var vDate = startDate.split('/');

						
						if((new Date(vDate[2],vDate[1],vDate[0]) != new Date(yyyy,mm,dd)) && (new Date(vDate[2],vDate[1],vDate[0]) <= new Date(yyyy,mm,dd))) {
							return newvalue;
						}else{
							$.growl.error({
								message : "End Date Should not be Less Than Start Date !!!",
								duration : 3000,
								title : 'Error'
							});
							return "";
						}*/
						if (newvalue >= dateOnly) {
							return newvalue;
						}else if(today >= dateOnly1){
							return newvalue;
						}else if(Date.parse(today) >= Date.parse(dateOnly1)){
							return newvalue;
						}else{
							$.growl.error({
								message : "End Date Should not be Less Than Start Date !!!",
								duration : 3000,
								title : 'Error'
							});
							return "";
						}
					}else{
						$("#stonePOMRVGrid").jqxGrid('setcellvalue', row, 'statusEditableFeild',false);
					}
				}
			},
			{'text' : 'Created By','datafield' : 'createdBy','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Active','datafield' : 'isActive','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{
				text : '',
				columntype : 'checkbox',
				width : '2%',
				menu: false,
				sortable: false,
				datafield: 'selectionStatus',
				cellsalign : 'center',
				align:'center',
				hidden : true,
				editable : false,
				filterable: false,
			},
			{	text : '',
				datafield : 'promotionId',
				'width' : '2.5%',
				cellsalign:'center',
				align:'center',
				editable: false,
				cellsrenderer : promoDelete,
			 }
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/searchPromotions?portal=OE", "list", columns, promoSearchFieldFilters(), updateRows, "", "#stonePOMRVGrid");
    $("#stonePOMRVGrid").jqxGrid({    	
    	width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
         showstatusbar: true,
 	    statusbarheight: 20,
 	    showaggregates: true,

    });
}

var disPercFlag;
var sDateFlag;
var eDate;
var disAmtFlag;
var clicked = true;
$("#saveEdit").prop('disabled',true);
$("#editPromo").on('click',function(){
	$("#saveEdit").prop('disabled',false);
	if(disPercFlag == true || sDateFlag == true || eDate == true || disAmtFlag == true){
		disPercFlag = false ;
		sDateFlag = false;
		eDate = false;
		disAmtFlag = false;
	}else{
		disPercFlag = true;
		sDateFlag = true;
		eDate = true;
		disAmtFlag = true;
	}
	
	if(clicked){
        $(this).css('background-color', '#f0ad4e');
      
        clicked  = false;
    } else {
        $(this).css('background-color', '#9999ff');
        $(this).css('border-color', '#9999ff');
        clicked  = true;
    }  	
});

$("#saveEdit").on('click',function(){
	var rows = $('#stonePOMRVGrid').jqxGrid('getrows');
	var sDte,eDte,discAmte,prmType;
	for (var i = 0; i < rows.length; i++) {
		 var row = rows[i];
		 sDte = row.startDate;
		 eDte = row.endDate;
	
		 discAmte = row.disAmt;
		 prmType = row.promoType;
		 
		 if(sDte == "" || sDte == null || eDte == "" || eDte == null ){
				$.growl.error({
					message : 'Please Fill Date Fields !!!',
					duration  : 1000,
					title : 'Error'
				});
				return false;
			}
			if(prmType == "Metal Rate"){
				if(discAmte == "" || discAmte == null){
					$.growl.error({
						message : "Please enter Discount Amt !!!",
						duration : 10000,
						title : 'Error'
						});
					return false;
				}
			}
	}
	
	var editData = []; 
	editData = getEditDetails();
	if(validFlag == true){
		postJSON('/OrderExecution/api/v1/editPromotions',JSON.stringify(editData),function(data) {
			if(data.resCode == "1"){
				$.growl.notice({
					message : "Promotions Updated Successfully !!!",
					duration : 1000,
					title : 'Success'
				});
				editData = [];
				window.location.href="javascript:showContentPage('promotions', 'bodySwitcher')"
			}
			else{
				$.growl.error({
					message : data.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				editData = [];
			}
		});
	}
});

var convert = function(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;

    return date;
};

var validFlag = true;
var getEditDetails = function(){
	var rows = $('#stonePOMRVGrid').jqxGrid('getrows');
	var promoEditArr = [];
	$.each(rows,function(k,v){
		var statusEditableFeildID =  $("#stonePOMRVGrid").jqxGrid("getCellvalue", k , 'statusEditableFeild');
		var stDtEditFlagE =  $("#stonePOMRVGrid").jqxGrid("getCellvalue", k , 'stDtEditFlag');
		var endDtEditFlagE =  $("#stonePOMRVGrid").jqxGrid("getCellvalue", k , 'endDtEditFlag');
		var sDateE = v.startDate;
		var eDateE = v.endDate;
				
		var sdt ,edt;
		
		if(statusEditableFeildID == true && stDtEditFlagE){
			 sdt = convert(sDateE);
		}else{
			sdt = v.startDate;
		}
		
		if(statusEditableFeildID == true && endDtEditFlagE){
			 edt = convert(eDateE);
		}else{
			edt = v.endDate;
		}
		if(process(sdt) > process(edt)){
			validFlag = false;
			$.growl.error({
				message : "End Date Should not be less than " + sdt + " for the Sl No " +v.slNo,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
		else{
			validFlag = true;
			var promoEditObj = {
				    "promoType": v.promoType,
				    "promoName": v.promoName,
				    "isActive": v.isActive,
				    "createdBy":v.createdBy,
				    "id": null,
				    "promotionId": v.promotionId,
				    "promoRegion": {
				      "id": v.regionId,
				      "name": v.region
				    },
				    "promoStore": {
				      "id": v.storeId,
				      "storeId":  v.storeId,
				      "name": v.store
				    },
				    "promoStartDate": sdt,
				    "promoEndDate": edt,
				    "isOrder": v.isOrder,
				    "promoZone": {
				    	"id":v.zoneId,
				    	"code" :v.zoneCode,
				    	"description":v.zone
				    },
				    "promoMetalSegment": {
				      "id": v.metalSegId,
				      "segmentId": v.metalSegId,
				      "description": v.metalSeg,
				      "code": v.metalSegCode
				    },
				    "promoArticleSegment": {
				    	"id": v.artSegId,
					    "description": v.artSeg,
					    "code": v.artSegCode
				    },
				    "promoJewelType": {
				    	"id": v.jewelId,
					    "description": v.jewType,
					    "code": v.jewelCode
				    },
				    "promoStoneOrAccSegment": {
				    	"id": v.saSegId,
					    "description": v.saSeg,
					    "code": v.saSegCode
				    },
				    "promoCategory": {
				    	"id": v.catId,
					    "description": v.cat,
					    "code": v.catCode
				    },
				    "promoSubCategory": {
				    	"id": v.subCatId,
					    "description": v.subCat,
					    "code": v.subCatCode
				    },
				    "metalPurityDTO ":(v.promoType == "MetalRate") ? {"id": v.purityId,"skinPurity":v.purity}:null,
				    "uom": v.uqc,
				    "promoFaltPercent": v.disPerc,
				    "promoFlatPercentValue": v.disAmt,
				    "isOrderValue": v.isOrderValue
			  	}
				if(statusEditableFeildID == true && statusEditableFeildID != "undefined"){
					promoEditArr.push(promoEditObj);
				}
			}
		});
 return promoEditArr;
}

//Export function 
$("#export").on("click",function() {
		var data;
		var sysdate = moment().format('DDMMYYYYHHmmSS');
		var rows = $('#stonePOMRVGrid').jqxGrid('getrows');
			if (rows == undefined || rows == 0 ) {
				$.growl.error({
					message : "No Data To Export",
					duration : 10000
				});
				return false;
			}else{
				var rows = $("#stonePOMRVGrid").jqxGrid('getdatainformation');
					if(rows.rowscount != 0){
						var newData = [];					
					postJSON('/OrderExecution/api/v1/exportPromotions?portal=oe',JSON.stringify(promoSearchFieldFilters()),function(response) {
						data = response.payload.list;
							for (i = 0; i < data.length; i++) {
								newData.push({	
									'Sl No' : (data[i].id != null) ? data[i].id : "",
									'Created Date' : (data[i].createdDate != null) ? data[i].createdDate : "",
								    'Promotion Id' : (data[i].promotionId != null) ? data[i].promotionId :"",			
									'Promo Type' : (data[i].promoType != null) ? data[i].promoType : "",
									'Promo Name' : (data[i].promoName != null) ? data[i].promoName : "",
									'Region' : (data[i].promoRegion != null) ? data[i].promoRegion.name : "",
									'Store' : (data[i].promoStore != null) ? data[i].promoStore.name : "",
									'Zone' : (data[i].promoZone != null) ? data[i].promoZone.description : "",
									'Metal Segment' : (data[i].promoMetalSegment != null) ? data[i].promoMetalSegment.description : "",
									'Article Segment' : (data[i].promoArticleSegment != null) ? data[i].promoArticleSegment.description : "",
									'Jewel Type' : (data[i].promoJewelType != null) ? data[i].promoJewelType.description : "",
									'Stone/Acc Segment' : (data[i].promoStoneOrAccSegment != null) ? data[i].promoStoneOrAccSegment.description : "",
									'Cat' : (data[i].promoCategory != null) ?data[i].promoCategory.description	: "",
									'SubCat' : (data[i].promoSubCategory != null) ?data[i].promoSubCategory.description : "",
									'Skin Purity' : (data[i].metalPurityDTO.skinPurity != null) ? data[i].metalPurityDTO.skinPurity : "",
									'UQC' : (data[i].uom != null) ?data[i].uom : "",
									'Discount Amt' : (data[i].promoFlatPercentValue != null) ? (data[i].promoFlatPercentValue).toFixed(2) : "",
									'Discount %' : (data[i].promoFaltPercent != null) ? (data[i].promoFaltPercent).toFixed(2) : "",
									'Order Type' : (data[i].isOrderValue != null) ? data[i].isOrderValue : "",
									'Start Date' : (data[i].promoStartDate != null) ? data[i].promoStartDate : "",
									'End Date' : (data[i].promoEndDate != null) ? data[i].promoEndDate : "",
									'Created By' : (data[i].createdBy != null) ? data[i].createdBy : "",
									'Active' : (data[i].isActive != null) ? data[i].isActive : ""
								});
							}
							//JSONToCSVConvertor(newData, "Adjustment Voucher" + "_" + sysdate, true);
							 var opts = [{sheetid:'Promotions',header:true}];
		                     var res = alasql('SELECT * INTO XLSX("Promotions_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('promotions', 'bodySwitcher')"
});

$("#clear").on('click',function(){
	window.location.href="javascript:showContentPage('promotions', 'bodySwitcher')"
});
