/*
	##	Author UI       : 	Dipankar Naha
	##	Date Creation 	: 	18-06-2019
	## 	Description		:	Diamond Solitaire Query Print, Export and Search
*/

// date picker functions
$("#fromDate").datepicker({
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
$("#toDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
});

var onLoadLovs = function(){
	var storeDcArr = [
		{"id" : "Store", "name" : "Store"},
		{"id" : "DC", "name" : "DC"}
	];
	
	var fgLooseStoneArr = [
		{"id" : "fg", "name" : "FG"},
		{"id" : "looseStone", "name" : "Loose Stone"}
	];
	
	
	$('#dcStore').empty().append('<option value="" selected>--Select--</option>');
	$.each(storeDcArr, function(k,v){
		$('#dcStore').append('<option value="' + v.id + '">' + v.name + '</option>');
	});
	
	$('#fgLooseSolitaire').empty().append('<option value="" selected>--Select--</option>');
	$.each(fgLooseStoneArr, function(k,v){
		$('#fgLooseSolitaire').append('<option value="' + v.id + '">' + v.name + '</option>');
	});
	
	$('#clarity').empty().append('<option value="" selected>--Select--</option>');
	$('#color').empty().append('<option value="" selected>--Select--</option>');
	$('#cut').empty().append('<option value="" selected>--Select--</option>');
	$('#labCode').empty().append('<option value="" selected>--Select--</option>');
	$('#shape').empty().append('<option value="" selected>--Select--</option>');
	$('#refType').empty().append('<option value="" selected>--Select--</option>');
	$('#weightRange').empty().append('<option value="" selected>--Select--</option>');
	$('#fromPrice').empty().append('<option value="" selected>--Select--</option>');
	$('#toPrice').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/openDimondSOlitireCertficateLOV', function(data) {
		var priceRange1 = data.payload.fromPriceRanges;
		var uniq1 = {};
		var newArray1 = priceRange1.filter(obj => !uniq1[obj] && (uniq1[obj] = true));
		
		var priceRange2 = data.payload.toPriceRanges;
		var uniq2 = {};
		var newArray2 = priceRange2.filter(obj => !uniq2[obj] && (uniq2[obj] = true));
			
		$.each(data.payload.allColors, function(k,v){
			$('#color').append('<option value="' + v + '">' + v + '</option>');
		});
		
		$.each(data.payload.allShapes, function(k,v){
			$('#shape').append('<option value="' + v.description + '">' + v.description + '</option>');
		});
		
		$.each(data.payload.allClarity, function(k,v){
			$('#clarity').append('<option value="' + v + '">' + v + '</option>');
		});
		
		$.each(data.payload.allCutGrade, function(k,v){
			$('#cut').append('<option value="' + v + '">' + v + '</option>');
		});
		
		$.each(data.payload.allLabCodes, function(k,v){
			$('#labCode').append('<option value="' + v + '">' + v + '</option>');
		});
		
		$.each(data.payload.refType, function(k,v){
			$('#refType').append('<option value="' + v + '">' + v + '</option>');
		});
		
		newArray1.sort(function(a, b){
			{return a - b};
		});
		
		$.each(newArray1, function(k,v){
			$('#fromPrice').append('<option value="' + v + '">' + v + '</option>');
		});
		
		newArray2.sort(function(a, b){
			{return a - b};
		});
		
		$.each(newArray2, function(k,v){
			$('#toPrice').append('<option value="' + v + '">' + v + '</option>');
		});
		
		/*var k = '<select id="toPriceRangesObj"  name="toPriceRangesObj" class="form-control" multiple="multiple">';
		$.each(data.payload.toPriceRanges, function(key, val) {
			k += '<option value="' + val + '">' + val + '</option>';
		});
		k += '</select>';
		$("#toPriceRanges").html(k);
		$('#toPriceRangesObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
		
		var j = '<select id="fromPriceObj"  name="fromPriceObj" class="form-control" multiple="multiple">';
		$.each(data.payload.fromPriceRanges, function(key, val) {
			j += '<option value="' + val + '">' + val + '</option>';
		});
		j += '</select>';
		$("#fromPrice").html(j);
		$('#fromPriceObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});*/
		
		// Weight Range started
		var v = '<select id="weightRangeObj"  name="weightRangeObj" class="form-control" multiple="multiple">';
		$.each(data.payload.weightRanges, function(key, val) {
			v += '<option value="' + val + '">' + val + '</option>';
		});
		v += '</select>';
		$("#weightRange").html(v);
		$('#weightRangeObj').multiselect({
			includeSelectAllOption : true,
			enableFiltering : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	
		
	});
}

onLoadLovs();

$("#dcStore").on('change',function(){
	var value = $(this).val();
	$('#dcStoreName').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/getStoreOrDcs?type='+value,function(data) {
		if(data.resCode == "1"){
			var allStoreDC = data.payload.allStoreOrDc;
			$.each(allStoreDC, function(k,v){
				$('#dcStoreName').append('<option value="' + v.id + '">' + v.name + '</option>');
			});		
		}else{
			$.growl.error({	message : data.mesgStr,duration : 10000,title : 'Error'	});
			return false;
		}
	});
});

$("#toPrice").on('change',function(){
	var fromPrice = $("#fromPrice").val();
	var toPrice = $("#toPrice").val();
	if(fromPrice != "" && toPrice != ""){
		if(parseFloat(fromPrice) > parseFloat(toPrice)){
			 $("#toPrice").val("");
			$.growl.error({
				message : "To Price Should be Greater Than From Price " + fromPrice + " !!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	}
});



$(".modal").on("hidden.bs.modal", function(){
	$('#page-content').removeData();
    $('.pagination').twbsPagination('destroy');
	$('.modal-backdrop').remove();
});

var viewDiamondSolitaireDetails = function(row){
	var viewDesign = $('#jqxgrid').jqxGrid('getcellvalue', row, 'view');
	var viewDesignList = [];
	 viewDesignList = viewDesign.list;
	$('#pagination-demo').twbsPagination({
	    totalPages: viewDesign.size,
	    visiblePages: "5",
	    onPageClick: function (event, page) {
	    		$.each(viewDesignList, function(k, v){
	    			if((page-1) == k){
	    				console.log(v);
	    				var img =  "<a href='/uf/"+v.id+"' target='_blank'><img src='/uf/"+v.id+"' height='60%' width ='60%' /></a>";
	    				$('#page-content').html(img);
	    			}
	    		});
	    }
	});
}

//View daily stock check details for a particular row
var viewDiamondSolitaire = function(row, column, value){
	var viewDesign = $('#jqxgrid').jqxGrid('getcellvalue', row, 'view');
	if(typeof viewDesign != "undefined" && viewDesign.list.length > 0){
		return '<div class="text-center"><button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#viewDiamondSolitaireForm" type="button" onclick="viewDiamondSolitaireDetails('+ row +');"/><span class="fa fa-eye"></span> </button></div>';
	}else{
		return '<div class="text-center"><button class="btn btn-sm btn-primary" disabled  type="button" /><span class="fa fa-eye"></span> </button></div>';
	}
}

var datafields =
	[
		{ name: 'date',	type: 'date'},
	    { name: 'refType',	type: 'string'},
	    { name: 'id',  type: 'int'},
	    { name: 'segment', type: 'string'},
        { name: 'mainCat', type: 'string'},
        { name: 'actualColor', type: 'string'},
        { name: 'shape', type: 'string'},
        { name: 'pcs', type: 'int'},
        { name: 'weight', type: 'float'},
        { name: 'uqc', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'clarity', type: 'string'},
        { name: 'cut', type: 'string'},
        { name: 'polish', type: 'string'},
        { name: 'symmetry', type: 'string'},
        { name: 'fluorescence', type: 'string'},
        { name: 'depthPrc', type: 'float'},
        { name: 'tablePrc', type: 'float'},
        { name: 'Measurements', type: 'string'},
        { name: 'labCode', type: 'string'},
        { name: 'labCrtNo', type: 'int'},
        { name: 'companyCrtNo', type: 'int'},
        { name: 'viewEditCertDet', type: 'string'},
        { name: 'vendorCode', type: 'string'},
        { name: 'prerCostPrice', type: 'float'},
        { name: 'totalPrice', type: 'float'},
        { name: 'itemStatus', type: 'string'},
        { name: 'viewHistory', type: 'string'},
        { name: 'view', type: 'array'},
        { name: 'actionId', type: 'int'}
    ];

var columns =
	[
	    { text: 'Date', datafield: 'date', width: "5%", cellsalign : 'left', align:'center',sortable : false, hidden : false, editable: false, sorting: false, cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'},
        { text: 'FG/Loose Solitaire', datafield: 'refType', width: "6%", cellsalign : 'left', align:'center', sortable : false, hidden : false, editable: false, sorting: false},
        { text: 'Stock No', datafield: 'id', width: "3%", cellsalign : 'right',sortable : false,  align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Segment', datafield: 'segment', width: "5%", cellsalign : 'left',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Main Category', datafield: 'mainCat', width: "5%", cellsalign : 'left',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Actual Color', datafield: 'actualColor', width: "4%", cellsalign : 'left',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Shape', datafield: 'shape', width: "5%", cellsalign : 'left',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Pcs', datafield: 'pcs', width: "3%", cellsalign : 'center',sortable : false, align:'right', hidden : false, editable: false, sorting: false},
        { text: 'Wt', datafield: 'weight', width: "3%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat:'d3'},
        { text: 'UQC', datafield: 'uqc', width: "3%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Color', datafield: 'color', width: "4%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Clarity', datafield: 'clarity', width: "4%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Cut', datafield: 'cut', width: "3%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Polish', datafield: 'polish', width: "3%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Symmetry', datafield: 'symmetry', width: "3%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Fluorescence', datafield: 'fluorescence', width: "3%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Depth %', datafield: 'depthPrc', width: "3%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat:'d2'},
        { text: 'Table %', datafield: 'tablePrc', width: "3%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat:'d2'},
        { text: 'Measurements', datafield: 'Measurements', width: "3%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'LAB Code', datafield: 'labCode', width: "3%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Lab Cert No', datafield: 'labCrtNo', width: "3%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Company Cert No', datafield: 'companyCrtNo', width: "3%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'View & Print Co Cert Details', datafield: 'actionId', width: "3%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false, cellsrenderer : viewDiamondSolitaire},
        { text: 'Stone Vendor Code', datafield: 'vendorCode', width: "5%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'Per Ct Price', datafield: 'prerCostPrice', width: "8%", cellsalign : 'right',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat:'d2'},
        { text: 'Total Price', datafield: 'totalPrice', width: "8%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false,cellsformat:'d2',
        	cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
	 			var prerCostPrice =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'prerCostPrice');
	 			var weight =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'weight');
	 			var totalPrice = 0.00;
	 			totalPrice = prerCostPrice * weight;
    			return '<div style="text-align:center; margin: 0; padding-top:15px; height:40px;">' + totalPrice.toFixed(2) + '</div>';
	 		}
        
        },
        { text: 'Item Status', datafield: 'itemStatus', width: "6%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
        { text: 'View History', datafield: 'viewHistory', width: "6%", cellsalign : 'center',sortable : false, align:'center', hidden : false, editable: false, sorting: false},
    ];

//Search Functionality
var diamoSearchGrid = function(gridName, datafields,columns) {
	var updateRows = function(rowid, newdata, commit) {	commit(); };
	
	showMyGrid(datafields,"/OrderExecution/api/v1/openDimondSOlitireCertficateDetails", "list", columns, diamondCertFieldFilter(), updateRows, "");
	
	$(gridName).jqxGrid({	
		width : '100%',
        columnsheight: 85,
        columnsresize: true,  
		rowsheight : 20,
		theme: 'energyblue',
		autorowheight : true,
		groupable: true,
		rowdetails : true,
		editable: false
	});
	
}


var diamondCertFieldFilter = function() {
	var fromDate = $('#fromDate').val();
	var toDate = $('#toDate').val();
	var dcStore = $('#dcStore').val();
	var dcStoreName = $('#dcStoreName').val();
	var fgLooseSolitaire = $('#fgLooseSolitaire').val();
	var compCertNo = $('#compCertNo').val();
	var labCode = $('#labCode').val();
	var labCertNo = $('#labCertNo').val();
	var refType = $('#refType').val();
	var refNo = $('#refNo').val();
	var stockNo = $('#stockNo').val();
	var shape = $('#shape').val();
	var color = $('#color').val();
	var clarity = $('#clarity').val();
	var cut = $('#cut').val();
	var refType = $('#refType').val();
	var weightRangeObj = $('#weightRangeObj').val();
	var fromPrice = $('#fromPrice').val();
	var toPrice = $('#toPrice').val();
	

	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (weightRangeObj == null || weightRangeObj == "") {
		var weightRange = "";
	} else {
		var weightRange = weightRangeObj.join(",");
	}

	if (fromDate != "" && fromDate != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDate;
	}

	if (toDate != "" && toDate != null) {
		fieldFilters.fieldFilters["toDate"] = toDate;
	}
	
	if (dcStore != "" && dcStore != null) {
		fieldFilters.fieldFilters["storeOrDc"] = dcStore;
	}
	
	if (dcStoreName != "" && dcStoreName != null) {
		fieldFilters.fieldFilters["storeOrDcId"] = dcStoreName;
	}
	
	if (fgLooseSolitaire != "" && fgLooseSolitaire != null) {
		fieldFilters.fieldFilters["refType"] = fgLooseSolitaire;
	}
	
	if (compCertNo != "" && compCertNo != null) {
		fieldFilters.fieldFilters["compCrtNo"] = compCertNo;
	}
	
	if (labCode != "" && labCode != null) {
		fieldFilters.fieldFilters["labCode"] = labCode;
	}
	
	if (labCertNo != "" && labCertNo != null) {
		fieldFilters.fieldFilters["crtNo"] = labCertNo;
	}
	
	if (refType != "" && refType != null) {
		fieldFilters.fieldFilters[""] = refType;
	}
	
	if (refNo != "" && refNo != null) {
		fieldFilters.fieldFilters["refDocNo"] = refNo;
	}
	
	
	if (shape != "" && shape != null) {
		fieldFilters.fieldFilters["shape"] = shape;
	}
	
	if (color != "" && color != null) {
		fieldFilters.fieldFilters["color"] = color;
	}
	
	if (clarity != "" && clarity != null) {
		fieldFilters.fieldFilters["clarity"] = clarity;
	}
	
	if (cut != "" && cut != null) {
		fieldFilters.fieldFilters["cutGrade"] = cut;
	}
	
	if (weightRange != "" && weightRange != null) {
		fieldFilters.fieldFilters["weightRange"] = weightRange;
	}
	
	if (fromPrice != "" && fromPrice != null) {
		fieldFilters.fieldFilters["fromPrice"] = fromPrice;
	}	
	
	if (toPrice != "" && toPrice != null) {
		fieldFilters.fieldFilters["toPrice"] = toPrice;
	}	
	fieldFilters.fieldFilters["mode"] = "search";
	return fieldFilters;
}

var checkValidate = function(){
	
	$form = $('#diamondSolitaireyQueryForm');
	$form.validate({
        errorElement: 'label', 
        errorClass: 'help-inline', 
        focusInvalid: false, 
        ignore: "",
        rules: {
        	"fgLooseSolitaire": { required: true},
        },
    	messages : {
    		'fgLooseSolitaire' : {required : "Please select FG Loose Solitaire!"},
    	},errorPlacement: function(error, element) {
        	if(element.context.name == "fgLooseSolitaire"){
        		error.insertAfter(element);
        	}else{
        		error.insertAfter(element);
        	}
        }
    });
    
    if ($form.valid()) {
    	var gridDiamondQuery = "#jqxgrid";	    	
		diamoSearchGrid(gridDiamondQuery,datafields,columns); 
		$("#jqxgrid").show();
    } else {
    	 return false;
    }
    
    return false;
   
}

//On click on search loading grid after checking validation of mandatory fields.
$("#search").on('click', function(){
	checkValidate();	
});

var clearAll = function(){	
	window.location.href = "javascript:showContentPage('diamondSolitaireQuery', 'bodySwitcher')";
}

//Clear grid and reset input and Drop down value
$('#clear').on('click', function() {
	clearAll();
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
			var fieldFilters = diamondCertFieldFilter();
			fieldFilters.fieldFilters.mode = "export";
			  postJSON('/OrderExecution/api/v1/openDimondSOlitireCertficateExport',JSON.stringify(fieldFilters),function(response) {
				data = response.payload.list;
					for (i = 0; i < data.length; i++) {
						var date1 ;
						 if(data[i].date != null || data[i].date != ""){
			              		var date = new Date(data[i].date);
			                 		var dd1 = date.getDate();
			                 		var mm1 = date.getMonth() + 1;
			                 		var yy1 = date.getFullYear();
			                 		var date1 = dd1 + "/" + mm1 + "/" + yy1;
			              	   }
					 newData.push({	
						'Date' :date1,
						'FG/Loose Solitaire' : (data[i].refType != null) ? data[i].refType : "",
						'Stock No' : (data[i].id != null) ? data[i].id : "",
						'Segment' : (data[i].segment != null) ? data[i].segment : "",
						'Main Category' : (data[i].mainCat != null) ? data[i].mainCat : "",						
						'Actual Color' : (data[i].actualColor != null) ? data[i].actualColor : "",	
						'Shape' : (data[i].shape != null) ? data[i].shape : "",
						'Pcs' : (data[i].pcs != null) ? data[i].pcs : "",
						'Weight' : (data[i].weight != null) ? data[i].weight.toFixed(3) : "",
						'UQC' : (data[i].uqc != null) ? data[i].uqc : "",		
						'Color' : (data[i].color != null) ? data[i].color : "",
						'Clarity' : (data[i].clarity != null) ? data[i].clarity : "",
						'Cut' : (data[i].cut != null) ? data[i].cut : "",											
						'Polish' : (data[i].polish != null) ?data[i].polish : "",
						'Symmetry' : (data[i].symmetry != null) ?data[i].symmetry : "",
						'Fluorescence' : (data[i].fluorescence != null) ?data[i].fluorescence : "",
						'Depth %' : (data[i].depthPrc != null) ?data[i].depthPrc.toFixed(2)  : "",
						'Table %' : (data[i].tablePrc != null) ?data[i].tablePrc.toFixed(2) : "",
						'Measurements' : (data[i].Measurements != null) ?data[i].Measurements : "",
						'LAB Code' : (data[i].labCode != null) ?data[i].labCode : "",
						'Lab Cert No' : (data[i].labCrtNo != null) ?data[i].labCrtNo : "",
						'Company Cert No' : (data[i].companyCrtNo != null) ?data[i].companyCrtNo : "",
						'View & Edit/Print Co Cert Details' : (data[i].viewEditCertDet != null) ?data[i].viewEditCertDet : "",
						'Stone Vendor Code' : (data[i].vendorCode != null) ?data[i].vendorCode : "",
						'Per Ct Price' : (data[i].prerCostPrice != null) ?data[i].prerCostPrice.toFixed(2) : "",
						'Total Price' : (data[i].totalPrice != null) ?(data[i].prerCostPrice * data[i].weight).toFixed(2) : "",
						'Item Status' : (data[i].itemStatus != null) ?data[i].itemStatus : "",
						'View History' : (data[i].viewHistory != null) ?data[i].viewHistory : "",
								
						});
					}
					 var opts = [{sheetid:'Diamond_Solitaire_Query_Report',header:true}];
                     var res = alasql('SELECT * INTO XLSX("Diamond_Solitaire_Query_Report_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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
$('#print').on('click', function() {
	alert('Not yet implemented');
	//checkValidate();
});