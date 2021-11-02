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

function fgArticleMasterGrid() {

	var updateRows = function(rowid, newdata, commit) {

	}
	var datafields = [ {
		'name' : 'id',
		'type' : 'long'
	}, {
		'name' : 'segment',
		'type' : 'string'
	}, {
		'name' : 'jewelType',
		'type' : 'string'
	}, {
		'name' : 'subCategory',
		'type' : 'string'
	}, {
		'name' : 'articleCode',
		'type' : 'string'
	}, {
		'name' : 'articleDesc',
		'type' : 'string'
	}, {
		'name' : 'articleType',
		'type' : 'string'
	}, {
		'name' : 'isPair',
		'type' : 'string'
	}, {
		'name' : 'mupType',
		'type' : 'string'
	}, {
		'name' : 'isActive',
		'type' : 'string'
	}, {
		'name' : 'fromWeight',
		'type' : 'double'
	}, {
		'name' : 'toWeight',
		'type' : 'double'
	} ];

	var columns = [ {
		'text' : 'Segment',
		'datafield' : 'segment',
		cellsalign : 'center',
		align:'center',
		'width' : '5%',
		editable : false,
		sortable : true
	}, {
		'text' : 'JewelType',
		'datafield' : 'jewelType',
		cellsalign : 'center',
		align:'center',
		'width' : '6%',
		editable : false,
		sortable : true
	}, {
		'text' : 'Sub Cat',
		'datafield' : 'subCategory',
		cellsalign : 'left',
		align:'center',
	   'width' : '20%',
		editable : false,
		sortable : true
	}, {
		'text' : 'Article Code',
		'datafield' : 'articleCode',
		cellsalign : 'center',
		align:'center',
		'width' : '8%',
		editable : false,
		sortable : true
	}, {
		'text' : 'Article Desc',
		'datafield' : 'articleDesc',
		cellsalign : 'left',
		align:'center',
		'width' : '20%',
		editable : false,
		sortable : false
	}, {
		'text' : 'Article Flag',
		'datafield' : 'articleType',
		cellsalign : 'center',
		align:'center',
		'width' : '9.5%',
		editable : false,
		sortable : false
	}, {
		'text' : 'Order Unit',
		'datafield' : 'isPair',
		cellsalign : 'center',
		align:'center',
		'width' : '4%',
		editable : false,
		sortable : false
	}, {
		'text' : 'MUP Cat',
		'datafield' : 'mupType',
		cellsalign : 'left',
		align:'center',
		'width' : '12.5%',
		editable : false,
		sortable : false
	}, {
		'text' : 'Active Y/N',
		'datafield' : 'isActive',
		cellsalign : 'center',
		align:'center',
		'width' : '4%',
		editable : false,
		sortable : false
	}, {
		'text' : 'Min. Wt.',
		'datafield' : 'fromWeight',
		cellsalign : 'right',
		align:'center',
		cellsformat :'d3',
		'width' : '4%',
		editable : false,
		sortable : false
	}, {
		'text' : 'Max. Wt.',
		'datafield' : 'toWeight',
		cellsalign : 'right',
		align:'center',
		cellsformat : 'd3',
		'width' : '4%',
		editable : false,
		sortable : false
	}, {
		'text' : '',
		'datafield' : 'id',
		cellsrenderer : articleEditlinkrenderer,
		editable : false,
		filterable : false,
		sortable : false,
		'width' : '3%'
	} ];

	showMyGrid(datafields, "/OrderExecution/api/v1/articleMasterList", "list",
			columns, articleFilterValues(), updateRows, "articleCode");
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

var articleEditlinkrenderer = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<button class="btn btn-sm btn-primary" type="button" data-toggle="modal" data-target="#fgArticleMasterModalEdit" id='
	+ row
	+ ' onclick="editDet('
	+ value
	+ ')" /><i class="fa fa-pencil fa-1"></i></button>'
	}
}
var articleFlag = [
	{
     'id':'F',
	 'name': "Finished Goods"
	},{
	 'id':'R',
	 'name': "Raw Material"
    }
]
var onloadEdit = function(artType,ispair,MupTyp,hsnCd,segId,jwlId,mupTypeId,hsnMasterId){
	
	 $('#orderUnit2').empty().append('<option value="" selected>--Select--</option>');
	 $('#articleFlag2').empty().append('<option value="" selected>--Select--</option>');
	 $('#hsnCode1').empty().append('<option value="" selected>--Select--</option>');
	 $('#mupCategory1').empty().append('<option value="" selected>--Select--</option>');
	
	var segmentId1 = -1;
	$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?page=create&criteria=sTypes&id='+ segmentId1, function(data) {
		var res = data.payload.orderUnit;
		var res1 = data.payload.articleFlag;
		var res2 = data.payload.mupCategory;
		$.each(res1,function(k,v){
			if(v.name == artType){
				$('#articleFlag2').append('<option selected value="' + v.id + '">' + v.name + '</option>');
			}else{
				$('#articleFlag2').append('<option value="' + v.id + '">' + v.name + '</option>');
			}
		});
		
		$.each(res,function(k,v){
			if(v.name == ispair){
				$('#orderUnit2').append('<option selected value="' + v.id + '">' + v.name + '</option>');
			}else{
				$('#orderUnit2').append('<option value="' + v.id + '">' + v.name + '</option>');
			}
		});
		
		$.each(res2,function(k,v){
			if(v.id == mupTypeId){
				$('#mupCategory1').append('<option selected value="' + v.id + '">' + v.description + '</option>');
			}else{
				$('#mupCategory1').append('<option value="' + v.id + '">' + v.description + '</option>');
			}
		});
	});
	
	$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?criteria=hsnCodeList&id='+segId, function(data) {
			$.each(data.payload.hsnCodeList, function(key, val) {
				var response = val.code+"-"+val.description;
				if(val.id == hsnMasterId){
					$('#hsnCode1').append('<option selected value="' + val.id + '">' + response + '</option>');
				}else{
					$('#hsnCode1').append('<option  value="' + val.id + '">' + response + '</option>');
				}
		 });
	});
}

var editDet = function(id){
	$.getJSON('/OrderExecution/api/v1/getArticleById?id='+id,function(data){
		var res = data.payload.dto;
		$("#sTypes2").val(res.segment);
		$("#jewelType2").val(res.jewelType);
		$("#mainCatList2").val(res.mainCategory);
		$("#sCategory2").val(res.subCategory);
		$("#articleCode2").val(res.articleCode);
		$("#articleIdHide").val(res.id);
		$("#articleDesc2").val(res.articleDesc);
		$("#sTypesHide").val(res.segmentId);
		$("#sTypesHide").val(res.mupTypeId);
		$("#sTypesHide").val(res.hsnMasterId);
		$("#minWt").val(res.fromWeight);
		$("#maxWt").val(res.toWeight);
		$("#shelfLife1").val(res.shelfLife);
		$("#actualShelfLife1").val(res.actualShelfLife);
		$("#activeYN2").val(res.isActive);
		$("#hsnCode1").val(res.hsnMasterCode);
		onloadEdit(res.articleType,res.isPair,res.mupType,res.hsnMasterCode,res.segmentId,res.jewelTypeId,res.mupTypeId,res.hsnMasterId)
	});
}

function articleFilterValues() {

	fieldFilters = {
		"fieldFilters" : {}
	};
	var sTypes = $('#sTypes').val();
	var jewelType = $('#jewelType').val();
	var mainCatList = $('#mainCatList').val();
	var sCategory = $('#sCategory').val();
	var articleCode = $("#articleCode").val();
	var articleFlag = $('#articleFlag').val();
	if (sTypes != "" && sTypes != null) {
		fieldFilters.fieldFilters["sTypes"] = sTypes;
	}
	if (jewelType != "" && jewelType != null) {
		fieldFilters.fieldFilters["jewelType"] = jewelType;
	}
	if (mainCatList != "" && mainCatList != null) {
		fieldFilters.fieldFilters["subCategory.category.id"] = mainCatList;
	}
	if (sCategory != "" && sCategory != null) {
		fieldFilters.fieldFilters["sCategory"] = sCategory;
	}
	if (articleCode != "" && articleCode != null) {
		fieldFilters.fieldFilters["articleCode"] = articleCode;
	}
	if (articleFlag != "" && articleFlag != null) {
		fieldFilters.fieldFilters["articleFlag"] = articleFlag;
	}
	return fieldFilters;
}
function createArticleMasterDetails() {
	var articleDetail = {
		"segment" : $("#sTypes1").val(),
		"jewelType" : $("#jewelType1").val(),
		"subCategory" : $("#sCategory1").val(),
		"articleCode" : $("#articleCode1").val(),
		"articleType" : $("#articleFlag1").val(),
		"isPair" : $("#orderUnit").val(),
		"mupType" : $("#mupCategory").val(),
		"isActive" : $("#activeYN").val(),
		"fromWeight" : $("#minWt").val(),
		"toWeight" : $("#maxWt").val(),
		"actualShelfLife" : $("#actualShelfLife").val(),
		"shelfLife" : $("#shelfLife").val(),
		"hsnMasterId" : parseInt($("#hsnCodeC").val())

	}
	return articleDetail;
}
function updateArticleMasterDetails() {
	var articleDetail = {
		"articleType" : $("#articleFlag2").val(),
		"isPair" : $("#orderUnit2").val(),
		"isActive" : $("#activeYN2").val(),
		"mupType" : $("#mupCategory1").val(),
		"fromWeight" : $("#minWt").val(),
		"toWeight" : $("#maxWt").val(),
		"actualShelfLife" : $("#actualShelfLife1").val(),
		"shelfLife" : $("#shelfLife1").val(),
		"id" : $("#articleIdHide").val(),
		"hsnMasterId" : $("#hsnCode1").val()
	}
	return articleDetail;
}
function createArticleMasterDetailsValidation() {

	var sTypes = $('#sTypes1').val();
	var jewelType = $('#jewelType1').val();
	var sCategory = $('#sCategory1').val();
	var articleCode = $("#articleCode1").val();
	var articleFlag = $('#articleFlag1').val();
	var orderUnit = $("#orderUnit").val();
	var mupCategory = $("#mupCategory").val();
	var isActive = $("#activeYN").val();
	var minWt = $("#minWt").val();
	var maxWt = $("#maxWt").val();

	var validation = true;
	if (sTypes == "" || jewelType == "" || sCategory == "" || articleCode == ""
			|| articleFlag == "" || orderUnit == "" || mupCategory == ""
			|| isActive == "" || minWt == "" || maxWt == "") {

		validation = false;

	}
	return validation;
}
function maxWtValidation() {

	var minWt = $("#minWt").val();
	var maxWt = $("#maxWt").val();

	var validation = true;
	if (maxWt < minWt) {

		validation = false;

	}
	return validation;
}

$('input:text:visible:first').focus()


$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$('#fgArticleSearch').trigger("reset");

});

$("#minWt").keypress(function(event) {		
		
	  if ( event.which == 45) {			
	      event.preventDefault();
	   }
	});

$("#maxWt").keypress(function(event) {		
		
	  if ( event.which == 45) {			
	      event.preventDefault();
	   }
	});

$("#shelfLife1").keypress(function(event) {		
		
	  if ( event.which == 45) {			
	      event.preventDefault();
	   }
	});

$("#actualShelfLife1").keypress(function(event) {		
		
	  if ( event.which == 45) {			
	      event.preventDefault();
	   }
	});
	
$("#save").on("click",function() {
	trimmer();
	if(parseFloat($("#maxWt").val()) < parseFloat($("#minWt").val())){
		$.growl.error({
			message  : "Max weight Should be greater than or equal to Min weight !!!",
			duration : 1000,
			title : 'Error'
		})
		 return false;	
	}
	
	var hsn = $("#hsnCode1").val();
	var sTypes2 = $("#sTypes2").val();
	var activeYN2 = $("#activeYN2").val();
	var mupCategory1 = $("#mupCategory1").val();
	var orderUnit2 = $("#orderUnit2").val();
	var articleFlag2 = $("#articleFlag2").val();
	
	if((hsn == "" || hsn == null)||(sTypes2 == "" || sTypes2 == null)||(activeYN2 == "" || activeYN2 == null)||
		(mupCategory1 == "" || mupCategory1 == null)||(orderUnit2 == "" || orderUnit2 == null)||(articleFlag2 == " " || articleFlag2 == null)){
				$.growl.error({
					message  : "Please Fill All Manadatory Feilds !!!",
					duration : 1000,
					title : 'Error'
				})
		     return false;	
	   }
		postJSON('/OrderExecution/api/v1/fgArtiicleMasterLOV/update', JSON.stringify(updateArticleMasterDetails()), function(data) {					
			if(1 == data.resCode){
				$('#fgArticleMasterModalEdit').modal('hide');
				$("#jqxgrid").jqxGrid("updatebounddata");
				$.growl.notice({ message: "Successfully updated Article with code: " + data.payload.code, duration: 10000, title: 'Success' });
			}
			else {
				$.growl.error({ message: data.mesgStr, duration: 10000 });
			}
	});
}); 


//Download Template Files


$("#exportFGA").on("click",function() {
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	var newData = [];
	 var fieldFilters = articleFilterValues();	   
	    fieldFilters.sortingFields = {
	    		 "segment": true, 
	    		 "jewelType":true
	    }
	postJSON('/OrderExecution/api/v1/DownloadArticleData',JSON.stringify(fieldFilters),function(response) {
		if(response != null && response.resCode == "1"){
			data = response.payload.list;
			for (i = 0; i < data.length; i++) {
				newData.push({
					
					'ArticleId': data[i].id,
					'Segment' : data[i].segmentId,
					'SegmentDesc':data[i].segment,
					'JewelType' : data[i].jewelTypeId,
					'JewelTypeDesc':data[i].jewelType,
					'Category ' : data[i].mainCategoryId,
					'CategoryDesc' : data[i].mainCategory,
					'SubCategory' : data[i].subCategoryId,
					'SubCategoryDesc':data[i].subCategory,
					'ArticleCode ' : data[i].articleCode,
					'ArticleDesc' : data[i].articleDesc,
					'ArticleFlag' : data[i].articleType,
					'OrderUnit ' : data[i].isPair,
					'MupCategory' : data[i].mupTypeId,
					'MupCategoryDesc' : data[i].mupType,
					'ActiveFlag' : data[i].isActive,
					'MinWt ' : data[i].fromWeight,
					'MaxWt ' : data[i].toWeight,
					'ShelfLife':data[i].shelfLife,
					'ActualShelfLife':data[i].actualShelfLife,
					'HsnCode':data[i].hsnMasterId,
					'HsnCodeDesc':data[i].hsnMasterCode
				});
				}
				//JSONToCSVConvertor(newData,	"Credit TO Account" + "_" + sysdate, true);
				var opts = [{sheetid:'uploadFGArticleColumns',header:true}];
                var res = alasql('SELECT * INTO XLSX("uploadFGArticleColumns_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
                
		}
	});
});

//end of download template files

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
} 

//upload Functionality Implementation
function HandleUploadExcelFile()
{
	// Check if file select event is captured
	if (fileEvent == null || (fileEvent != null && $.type(fileEvent) != "object"))
	{
		alert("Please select the data Excel file to load!");
		return;
	}

	var event = fileEvent;
    try {
	    alasql('SELECT * FROM FILE(?,{headers:true})', [event], function(data){
	        // Process data here if any conversion or validation is required!
			if (data != null)
			{
				var cols = getColumnHeaders(data);
				if (cols != null && cols.length > 0) {
									
				}
				else {
					alert("No data found in the uploaded file...");
				}
				var arrFg = [];
				
				for(var i=0;i<data.length;i++){
					if(isEmpty(data[i])) {
					   
					} else {
						arrFg.push(data[i]);
					}
				}
				var pdetails = JSON.stringify(arrFg);	
				// Calling API to upload Parameter Details.
				console.log(pdetails);
				
				postJSON('/OrderExecution/api/v1/uploadFGArticle', pdetails, function(response) {
					if (response.resCode == 1) {
						$.growl.notice({
							message : response.mesgStr,
							duration : 10000,
							title : 'Success'
						});
						return false;
					}else {
						$.growl.error({
							message : response.mesgStr,
							duration : 10000
						});
						return false;
					}
					
				});
				
			}
			else {
				alert("Invalid data in the uploaded file...");
			}

	    });	    	
    }
	catch(err) {
		//console.log('Upload Error: ', err);
		alert('Upload Error: ', err);
	};

	//change the 'testUpload' to the input id in your page
	document.getElementById("fgArticleUpload").value = "";
	fileEvent = null;
 }

 function captureFileSelectEvent(event)
 {
 	fileEvent = event;
 }
 
//*************Export************//
 $("#export").on("click",function() {
		var data;
	    var newData = [];
	    var fieldFilters = articleFilterValues();	   
	    fieldFilters.sortingFields = {
	    		 "segment": true, 
	    		 "jewelType":true
	    }
		var sysdate = moment().format('DDMMYYYYHHmmSS');
		postJSON('/OrderExecution/api/v1/ExportArticleMasterList',JSON.stringify(fieldFilters),function(response) {
		
			if(response != null && response.resCode == "1"){
				data = response.payload.list;
				for (i = 0; i < data.length; i++) {
					newData.push({
						'Segment' : data[i].segment,
						'JewelType' : data[i].jewelType,
						'Category ' : data[i].mainCategory,
						'SubCategory' : data[i].subCategory,
						'ArticleCode ' : data[i].articleCode,
						'ArticleDesc' : data[i].articleDesc,
						'ArticleFlag' : data[i].articleType,
						'OrderUnit ' : data[i].OrderUnit,
						'MupCategory' : data[i].mupType,
						'ActiveFlag' : data[i].isActive,
						'MinWt ' : data[i].fromWeight,
						'MaxWt ' : data[i].toWeight,
						'ShelfLife':data[i].ShelfLife,
						'ActualShelfLife':data[i].actualShelfLife,
						'HsnCode':data[i].hsnMasterCode
					});
				}
				var opts = [{sheetid:'Article_Master_FG_List',header:true}];
				var res = alasql('SELECT * INTO XLSX("Article_Master_FG_List_'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
			}else{
				 $.growl.error({
						    message : "No Data to Export.",
							duration : 10000
						});
						return false;
			}
});

	
});
