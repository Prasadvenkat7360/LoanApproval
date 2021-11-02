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

$("#jqxgrid").hide();
	$("#sMapFromDate").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		maxDate: 0,
		onSelect : function(dateStr) {
			var min = $(this).datepicker('getDate'); // Get selected date
			$("#sMapToDate").datepicker('option', 'minDate', min || '0'); // Set other min, default to today
		}
	});

	$("#sMapToDate").datepicker({
		changeMonth : true,
		changeYear : true,
		dateFormat : "dd/mm/yy",
		maxDate: 0,
	});

	$("#stoneMapPrice").validate(
			 {
			 	errorElement : 'label',
			 	errorClass : 'help-inline',
			 	focusInvalid : false,
			 	ignore : "",
			 	rules: {
		            "segmentName": { required: true },
		            "category": { required: true},
		        },
			    submitHandler : function(form) {	
			    	stoneMAPpriceGrid();
			    	$("#jqxgrid").show();
			    }
		 });
	
	
$.getJSON('api/v1/stoneStandardRateOnloadLOV', function(data) {
		$('#segmentName').empty().append(
		'<option value="" selected>--Select--</option>');
		$.each(data.payload.sSeglist, function(key, val) {
			$('#segmentName').append(
					'<option  value="' + val.segmentId + '">' + val.description
							+ '</option>');
			});
	});

	var categoryDet = function() {
	var categoryDetS = {
		"fieldFilters" : {
			"suppliedBy" : "CO",
			"sSegId" : $("#segmentName").val(),
			"sSeg" :  $("#segmentName option:selected").text()		
		}
	}
	return categoryDetS;
 }

$('#segmentName').on('change',function() {
	$('#category').empty().append('<option value="" selected>--Select--</option>');
	var catDetails = categoryDet();
     console.log(catDetails);
	if (catDetails) {
		postJSON('/OrderExecution/api/v1/getStoneCategories', JSON.stringify(catDetails), function(data) {
			console.log(catDetails);
			$.each(data.payload.mainCatList, function(key, val) {
				$('#category').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
		});
	}
});


function stoneMAPpriceFilterValues() {

	fieldFilters = {
		"fieldFilters" : {}
	};
	var fromDate = $("#sMapFromDate").val();
	var toDate = $("#sMapToDate").val();
	var segmentName = $("#segmentName").val();
	var category = $("#category").val();
	
	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}
	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	if (segmentName != "" && segmentName != null) {
		fieldFilters.fieldFilters["segmentId"] = segmentName;
	}
	if (category != "" && category != null) {
		fieldFilters.fieldFilters["categoryId"] = category;
	}
	return fieldFilters;
}

function stoneMAPpriceGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [
		{ 'name' : 'createdDate','type' : 'string'},
		{'name' : 'createdBy','type' : 'string'},
		{'name' : 'frmRange','type' : 'string'},
		{'name' : 'toRange','type' : 'string'},
		{'name' : 'docType','type' : 'string'},
		{'name' : 'refDocNo','type' : 'decimal'}, 
		{'name' : 'refDocSrlNo','type' : 'decimal'}, 
		{'name' : 'transValue','type' : 'decimal'}, 
		{'name' : 'transWt','type' : 'decimal'},
		{'name' : 'cumValue','type' : 'decimal'}, 
		{'name' : 'cumWght','type' : 'decimal'}, 
		{'name' : 'stndRate','type' : 'decimal'}, 
		{'name' : 'processed','type' : 'decimal'}, 
		{'name' : 'stoneDesc','type' : 'string'},
		{'name' : 'categoryDes','type' : 'string'},
		{'name' : 'stdRateId','type' : 'long'},
		{'name' : 'id','type' : 'Long'}];

	var columns = [
	   {'text' : 'Std Rate Id','datafield' : 'id','width' : '6%',editable : false,cellsalign: 'center',align: 'center',sortable : true},
	   {'text' : 'Stone Seg.','datafield' : 'stoneDesc','width' : '8%',editable : false,cellsalign: 'center',align: 'center',sortable : true},
	   {'text' : 'Cat. Description','datafield' : 'categoryDes','width' : '8%',editable : false,cellsalign: 'left',align: 'center',sortable : false},
	   {'text' : ' From Range','datafield' : 'frmRange','width' : '5%',editable : false,cellsalign: 'right',align: 'center',cellsformat : 'd3',sortable : false},
	   {'text' : 'To Range','datafield' : 'toRange','width' : '6%',cellsalign: 'right',align: 'center',cellsformat : 'd3',editable : false, sortable: true},
	   {'text' : 'Created Date','datafield' : 'createdDate','width' : '7%',cellsalign: 'center',align: 'center',cellsformat : 'd3',editable : false,sortable : false},
       {'text' : 'Created By','datafield' : 'createdBy','width' : '7%',editable : false,cellsformat : 'd3',cellsalign: 'center',	align: 'center',sortable : false},
	   {'text' : 'Doc. Type','datafield' : 'docType','width' : '6%',editable : false,sortable : false,cellsformat : 'd3',cellsalign: 'center',align: 'center'},
	   {'text' : 'Ref Doc. No','datafield' : 'refDocNo','width' : '5%',editable : false,	cellsalign: 'center',align: 'center',sortable : false},
	   {'text' : 'Ref Doc Sl.No','datafield' : 'refDocSrlNo','width' : '5%',editable : false,cellsalign: 'center',align: 'center',sortable : false},
	   {'text' : 'Transaction Weight','datafield' : 'transWt','width' : '6%',cellsformat : 'd3',cellsalign: 'right',align: 'center',editable : false},
	   {'text' : 'Transaction Value','datafield' : 'transValue','width' : '6.5%',cellsformat : 'd2',cellsalign: 'right',align: 'center',editable : false},
	   {'text' : 'Cumulative Weight','datafield' : 'cumWght','width' : '6%',cellsalign: 'right',	align: 'center',cellsformat : 'd3',editable : false},
	   {'text' : 'Cumulative value','datafield' : 'cumValue','width' : '6.5%',cellsalign: 'right',align: 'center',cellsformat : 'd2',editable : false},
	   {'text' : 'Standard Rate','datafield' : 'stndRate',cellsformat : 'd2',cellsalign: 'right',align: 'center','width' : '6%',editable : false},
	   {'text' : 'Process','datafield' : 'processed','width' : '6%',cellsalign: 'center',align: 'center',cellsformat : 'd3',editable : false},
	];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchStoneStandardRateList", "list",
			columns ,stoneMAPpriceFilterValues() , updateRows , '');

	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
	});
}

$("#export").on('click',function(){
	
	var  stoneMAPpriceFilterVal = stoneMAPpriceFilterValues()
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	var rows = $('#jqxgrid').jqxGrid('getrows');
	if (  rows == undefined || rows == 0 ) {
		$.growl
		.error({
			message : "No Data To Export",
			duration : 10000
		});
		return false;
	}else{
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		if(rows.rowscount != 0){
	    var newData = [];
	    postJSON('/OrderExecution/api/v1/exportStoneStandardRateList', JSON.stringify(stoneMAPpriceFilterVal), function(response) {	
		if(response!=null){
		var data = response.payload.list;	
		for(i=0; i<data.length; i++){
			newData.push({
		        'Created Date' : (data[i].createdDate != null) ? data[i].createdDate : "",
				'Created By' : (data[i].createdBy != null) ? data[i].createdBy : "", 
				'From Range' : (data[i].frmRange != null) ? data[i].frmRange: "",
				'To Range' : (data[i].toRange != null) ? data[i].toRange : "",
				'Doc. Type' : (data[i].docType != null) ? data[i].docType : "",
				' Ref. Doc. No' : (data[i].refDocNo != null) ? data[i].refDocNo : "",
				'Ref. Doc. Srl. No' : (data[i].refDocSrlNo != null) ? data[i].refDocSrlNo : "",
				'Trans. Value' : (data[i].transValue != null) ? data[i].transValue : "",
				'Trans Wt.' : (data[i].transWt != null) ? data[i].transWt : "",
				'Cum. Value' : (data[i].cumValue != null) ? data[i].cumValue : "",
				'Cum. Wght' : (data[i].cumWght != null) ? data[i].cumWght : "",
				'Stnd. Rate' : (data[i].stndRate != null) ? data[i].stndRate : "",
				'Processed' : (data[i].processed != null) ? data[i].processed : "",
				'Stone Desc.' : (data[i].stoneDesc != null) ? data[i].stoneDesc : "",
				'Category Code' : (data[i].categoryCode != null) ? data[i].categoryCode : "",
				'Category Des' : (data[i].categoryDes != null) ? data[i].categoryDes : "",
			   });	
	        }
		  var opts = [{sheetid:'Stone_MAP_price',header:true}];
	      var res = alasql('SELECT * INTO XLSX("Stone_MAP_price'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
		}
	 });
   }else{
	   $.growl
		.error({
			message : "No Data To Export",
			duration : 10000
		});
	   return false;	
	   }
   }
});

$("#removeMatIssueDet").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();	
});