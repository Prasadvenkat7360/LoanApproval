/*
* #Author UI : POOJA S
* Author SEVER : NAGESH C
* REPORT-SCanned weight Check Report.*  */

// date picker functions

function onloadList(){
	var typeSW = $("#swCheck").val();
	$("#stockChkId").empty().append("<option value=''>--Select--</option>");
	$.getJSON('/OrderExecution/api/v1/getStockCheckIds?type='+typeSW,function(data) {
		if(data.resCode == "1"){	
			console.log(data.payload.ids);
			var option="";
			$.each(data.payload.ids,function(key,value){
				var temp = "<option value='"+value.id+"'>"+value.id+"</option>";
				option+=temp;
			})
			$("#stockChkId").append(option);
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 4000
			});
		}
	})
}

onloadList();

$("#swCheck").on("change",function(){
	onloadList();
})

$("#stockChkId").on("change",function(){
	var fieldFilters = {
			"fieldFilters":{
				"type":$("#swCheck").val(),
				"id":$("#stockChkId").val()
				}			
	}
	postJSON('/OrderExecution/api/v1/getStockCheckDetailsById', JSON.stringify(fieldFilters), function(data) {
		if(data.resCode == "1"){	
			var dto = data.payload.dto;
			$('#zoneId').append('<option value="' + dto.zone.id + '" selected>' + dto.zone.description + '</option>');
			$('#segmentId').append('<option value="' + dto.segment.id + '" selected>' + dto.segment.description + '</option>');
			if(dto.jewelType != null){
				$('#jwlTypeId').append('<option value="' + dto.jewelType.id + '" selected>' + dto.jewelType.description + '</option>');
			}
			$('#materialType').val(dto.materialType)
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 4000
			});
		}
	});
});

function scanningWCFieldFilters(){
	var fieldFilters  = {
			"fieldFilters":{
			  "materialType": $("#materialType").val(),
			  "type" : $("#swCheck").val(),
			  "reportType" : $("#reportId").val(),
			  "segmentId": $("#segmentId").val(),
			  "jewelType": $("#jwlTypeId").val()==""?null:$("#jwlTypeId").val(),
			  "zoneId": $("#zoneId").val(),
			  "stockCheckId": $("#stockChkId").val()
			}			
	}
	return fieldFilters
}


$("#search").on("click",function(){
	var updateRows = function(rowid, newdata, commit) {
	}
	
	var	datafields= [ 
			
			{'name' :'stkSrlNo','type' :'int','map':'serialNo'},
			{'name' :'isScanned','type' :'string','map':'isScanned'},
			{'name' :'mType','type' :'string','map':'materialType'},
			{'name' :'jType','type' :'string','map':'jewelType>description'},
			{'name' :'segment','type' :'string','map':'articleSegment>description'},
			{'name' :'stkNo','type' :'int','map':'stockNo'},
			{'name' :'zoneDesc','type' :'string','map':'zone>description'},
			{'name' :'subCatDesc','type' :'string','map':'description'},
			{'name' :'pcs','type' :'int','map':'systemPieces'},
			{'name' :'uqc','type' :'string','map':'uqc'},
			{'name' :'gWt','type' :'float','map':'grossWt'},
			{'name' :'nWt','type' :'float','map':'netWt'},
			{'name' :'inputGWt','type' :'float','map':'weighedWt'},
			{'name' :'diff','type' :'float','map':'difference'},
			{'name' :'status','type' :'string','map':'status'},
			{'name' :'jwCode','type' :'string','map':'vendor>id'},
			{'name' :'skinPurity','type':'float','map':'skinPurity'},
			{'name' :'docType','type':'string','map':'docType'},
			{'name' :'docNo','type':'int','map':'docNo'},
			{'name' :'docSrlNo','type':'int','map':'docSrlNo'}
		];
	
	var columns =[
		{'text'  :'Zone','datafield':  'zoneDesc','width' : '5%',cellsalign : 'center',align:'center',sortable : false},
		{'text'  :'Srl No','datafield':  'stkSrlNo','width' : '5%',cellsalign : 'center',align:'center',sortable : false},
		{'text'  :'IsScanned/IsWeighed','datafield':  'isScanned','width' : '5%',cellsalign : 'center',align:'center',sortable : false},
		{'text'  :'stock No','datafield':  'stkNo','width' : '5%',cellsalign : 'center',align:'center',sortable : false},
		{'text'  :'Material Type','datafield':  'mType','width' : '6%',cellsalign : 'center',align:'center',sortable : false},
		{'text'  :'Segment','datafield':  'segment','width' : '5%',cellsalign : 'center',align:'center',sortable : false},
		{'text'  :'JwCode','datafield':  'jwCode','width' : '5%',cellsalign : 'center',align:'center',editable : false},
		{'text'  :'Jwl Type','datafield':  'jType','width' : '6%',cellsalign : 'center',align:'center',sortable : false},
		{'text'  :'SubCat Desc','datafield':  'suCatDesc','width' : '5%',cellsalign : 'center',align:'center',sortable : false},
		{'text'  :'Skin Purity','datafield':  'skinPurity','width' : '5%',cellsalign : 'center',align:'center',editable : false,cellsformat : 'd2'},
		{'text'  :'UQC','datafield':  'uqc','width' : '5%',cellsalign : 'center',align:'center',sortable : false},
		{'text'  :'Pcs','datafield':  'pcs','width' : '5%',cellsalign : 'center',align:'center',sortable : false},
		{'text'  :'Gross/ Stone/ Acc Wt','datafield':  'gWt','width' : '6%',cellsalign : 'center',align:'center',sortable : false,cellsformat : 'd3'},
		{'text'  :'Net Wt','datafield':  'nWt','width' : '6%',cellsalign : 'center',align:'center',sortable : false,cellsformat : 'd3'},
		{'text'  :'Weighed Gross/ Stone/ Acc Wt','datafield':  'inputGWt','width' : '6%',cellsalign : 'center',align:'center',sortable : false,cellsformat : 'd3'},
		{'text'  :'Diff Wt','datafield':  'diff','width' : '6%',cellsalign : 'center',align:'center',sortable : false,cellsformat : 'd3'},
		{'text'  :'Status','datafield':  'status','width' : '5%',cellsalign : 'center',align:'center',editable : false},		
		{'text'  :'DocType','datafield':  'docType','width' : '5%',cellsalign : 'center',align:'center',editable : false},
		{'text'  :'DocNo','datafield':  'docNo','width' : '5%',cellsalign : 'center',align:'center',editable : false},
		{'text'  :'DocSrlNo','datafield':  'docSrlNo','width' : '5%',cellsalign : 'center',align:'center',editable : false}
	]
		
	showMyGrid(datafields,"/OrderExecution/api/v1/searchWeightCheckReport", "dtos", columns, scanningWCFieldFilters(),updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
		editable : false,
		theme: 'energyblue',
		columnsheight : 50,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		virtualmode : true,
		pageable: true,
		
	});	

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
		var params = scanningWCFieldFilters();
		params.fieldFilters.page = "export";
		  if(rows.rowscount != 0){
			var newData = [];					
			  postJSON('/OrderExecution/api/v1/searchWeightCheckReport',JSON.stringify(params),function(response) {
				data = response.payload.dtos;
					for (i = 0; i < data.length; i++) {
					 newData.push({							 
						'Current Zone' : (data[i].zone != null) ?data[i].zone.description	: "",
						'Created Date' : (data[i].createdDate != null) ? data[i].createdDate : "",
						'Stock Check Id' : (data[i].stockCheckHeader != null) ? data[i].stockCheckHeader.id : "",
						'IsScanned' : (data[i].isScanned != null) ? data[i].isScanned : "",		
						'Stock No' : (data[i].stockNo != null) ? data[i].stockNo : "",	
						'Material Type' : (data[i].stockCheckHeader != null) ? data[i].stockCheckHeader.materialType : "",
						'Metal Type' : (data[i].metalSegment != null) ? data[i].metalSegment.description : "",
						'Article Segment' : (data[i].articleSegment != null) ? data[i].articleSegment.description : "",
						'JwCode' : (data[i].vendor != null) ? data[i].vendor.id : "",
						'Jewel Type' : (data[i].jewelType != null) ? data[i].jewelType.description : "",
						'Subcat Desc' : (data[i].description != null) ? data[i].description : "",
						"SkinPurity" : (data[i].skinPurity == null) ? "" : data[i].skinPurity.toFixed(2),
						'UQC' : (data[i].uqc != null) ? data[i].uqc : "",
						'Pieces' : (data[i].systemPieces != null) ? data[i].systemPieces : "",
						'Gross/ Stone/ Acc Wt.' : (data[i].grossWt != null) ? data[i].grossWt.toFixed(3) : "",
						'Net Wt' : (data[i].netWt != null) ? data[i].netWt.toFixed(3) : "",											
						'Weighed Gross/ Stone/ Acc Wt' : (data[i].weighedWt != null) ?data[i].weighedWt.toFixed(3) : "",
						'Difference Wt' : (data[i].difference != null) ?data[i].difference.toFixed(3) : "",
						"status" : (data[i].status == null) ? "" : data[i].status,
						"docType" : (data[i].docType == null) ? "" : data[i].docType,
						"docNo" : (data[i].docNo == null) ? "" : data[i].docNo,
						"docSrlNo" : (data[i].docSrlNo == null) ? "" : data[i].docSrlNo										
						});
					}
					 var opts = [{sheetid:'Scanning_Weight_Check_Report',header:true}];
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
