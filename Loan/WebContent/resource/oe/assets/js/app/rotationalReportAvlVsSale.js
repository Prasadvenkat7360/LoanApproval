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
	maxDate : 0
});

var onload = function(){
	$.getJSON('/OrderExecution/api/v1/rotationReportOnloadLovs?type=onloadLov', function(data) {
		$('#storeNameS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.storeCodes, function(key, val) {
			$('#storeNameS').append('<option value="' + val.id + '">' + val.name + '</option>');
	    });
	});
}

onload();

function rotationalRepSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'SegmentCode','type' : 'string','map' : 'segmentCode'},
		{'name' : 'ArticleSegment','type' : 'string','map':'articleSegment'},
		{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
		{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

		{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
		{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
		{'name' : 'avDiaWt','type' : 'float','map' : 'avJewelDiaWt'},
		{'name' : 'saleDiaWt','type' : 'float','map' : 'saleJewelDiaWt'},
		{'name' : 'rotation','type' : 'string','map' : 'weightRotation'},


		
	];

	var columns = [
		{'text' : 'Seg Code','datafield' : 'SegmentCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Article Segment','datafield' : 'ArticleSegment','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Av G. Wt.','datafield' : 'avGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			cellsrenderer: function(row, column, value){
				 var aGwt = 0.000;
				 if(value == ""){
					 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(aGwt).toFixed(3) +"</div>"; 
				 }else{
					 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
				 }
		      }
		},
		{'text' : 'Av N. Wt.','datafield' : 'avNwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			cellsrenderer: function(row, column, value){
				 var aNwt = 0.000;
				 if(value == ""){
					 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(aNwt).toFixed(3) +"</div>"; 
				 }else{
					 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
				 }
		      }
		},
		{'text' : 'Sale G. Wt.','datafield' : 'saleGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			cellsrenderer: function(row, column, value){
				 var sGwt = 0.000;
				 if(value == ""){
					 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(sGwt).toFixed(3) +"</div>"; 
				 }else{
					 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
				 }
		      }
		},
		{'text' : 'Sale N. Wt.','datafield' : 'saleNwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			cellsrenderer: function(row, column, value){
				 var sNwt = 0.000;
				 if(value == ""){
					 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(sNwt).toFixed(3) +"</div>"; 
				 }else{
					 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
				 }
		      }
		},
		
		{'text' : 'Av Jew. Dia Wt.(Cts)','datafield' : 'avDiaWt','width' : '15%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			cellsrenderer: function(row, column, value){
				 var avDiaWt = 0.000;
				 if(value == ""){
					 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(avDiaWt).toFixed(3) +"</div>"; 
				 }else{
					 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
				 }
		      }
		},
		{'text' : 'Sales Jew. Dia Wt.(Cts)','datafield' : 'saleDiaWt','width' : '15%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			cellsrenderer: function(row, column, value){
				 var saleDiaWt = 0.000;
				 if(value == ""){
					 return "<div align='center'style='margin-top:8px;'>"+ parseFloat(saleDiaWt).toFixed(3) +"</div>"; 
				 }else{
					 return "<div align='center'style='margin-top:8px;'>"+parseFloat(value).toFixed(3)+"</div>";
				 }
		      }
		},

		{'text' : 'Rotation','datafield' : 'rotation','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3',},

	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegmentWise", "list",columns,rotationalRepFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
	});
}

var rotationalRepFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	var store = $('#storeNameS').val();
	
	if (store != "" && store != null) {
		fieldFilters.fieldFilters["storeId"] = store;
	}

	return fieldFilters;
}

$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == "" 
		|| $('#storeNameS').val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		rotationalRepSearchGrid();
		$("#jqxgrid").show();
	}
});

//Export function for Raise Transfer Voucher
$("#export").on("click",function() {
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	var rows = $('#jqxgrid').jqxGrid('getrows');
	console.log(rows);
	if (rows == undefined || rows == 0 ) {
		$.growl.error({
			message : "No Data To Export",
			duration : 10000
		});
		return false;
	}else{
			if(rows.rowscount != 0){
				var newData = [];					
					for (i = 0; i < rows.length; i++) {
					newData.push({	
					'Segment Code' : (rows[i].SegmentCode != null) ? rows[i].SegmentCode : "",
					'Article Segment' : (rows[i].ArticleSegment != null) ? rows[i].ArticleSegment : "",
					'Av G. Wt' : (rows[i].avGwt != null) ? rows[i].avGwt.toFixed(3) : 0.000,
					'Av N. Wt' : (rows[i].avNwt != null) ? rows[i].avNwt.toFixed(3) : 0.000,
					'Sale G. Wt' : (rows[i].saleGwt != null) ? rows[i].saleGwt.toFixed(3) : 0.000,
					'Sale N. Wt' : (rows[i].saleNwt != null) ? rows[i].saleNwt.toFixed(3) : 0.000,
					'Av Jew. Dia Wt.(Cts)' : (rows[i].avDiaWt != null) ? rows[i].avDiaWt.toFixed(3) : 0.000,
					'Sales Jew. Dia Wt.(Cts)' : (rows[i].saleDiaWt != null) ? rows[i].saleDiaWt.toFixed(3): 0.000,
					'Rotation' : (rows[i].rotation != null) ? rows[i].rotation : "",
				});
			}
			//JSONToCSVConvertor(newData, "Raise Transfer Voucher" + "_" + sysdate, true);
			var opts = [{sheetid:'Rotational_Report',header:true}];
		    var res = alasql('SELECT * INTO XLSX("Rotational Report_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
		}
	}
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('rotationalReportAvlVsSale', 'bodySwitcher')"
});