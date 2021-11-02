/*<!-- 
	##	Author1 (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Nageswara Rao
	##	Date Creation 	: 	04-10-2017
	## 	Description		:	(Stone) MRV To GR,MIV & ADJ Report
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

//###################################### On Load Lov'S  ###################################################

var onLoadFunction = function(){
	$('#articleSegmentS').empty().append('<option value="" selected>--Select--</option>');
	$('#vendorCodeS').empty().append('<option value="" selected>--Select--</option>');
	$('#mrvNoS').empty().append('<option value="" selected>--Select--</option>');
	
		 $.getJSON("/OrderExecution/api/v1/stoneMrvToGrMivAdjReportLOVs",function(data){
		
		    $.each(data.payload.stoneSegments,function(key,val){
		    	$("#articleSegmentS").append('<option value="'+val.id+'">'+val.description+'</option>');
		    })
		    
		    $.each(data.payload.vendors,function(key,val){
		    	$("#vendorCodeS").append('<option value="'+val.id+'">'+val.name+'</option>');
		    })
		   
		    var mrvNoSList = (data.payload.mrvNos);
		    var data = [];
			$.each(mrvNoSList, function(key, value) {
				data.push({
					value : value.id,
					label : value.id
				});
			});

			$(function() {
				$("#mrvNoS").autocomplete({
					source : data,
					focus : function(event, ui) {
						event.preventDefault();
						$(this).val(ui.item.label);
					},
					select : function(event, ui) {
						event.preventDefault();
						$(this).val(ui.item.label);
						$("#mrvNoS-value").val(ui.item.value);
					}
				});
			});
	   })
	}
	onLoadFunction();
	
//################################# Field Filters ####################################
	
	var stoneMrvToGrReportFilters = function(){
		var fromDateS = $("#fromDateS").val();
		var toDateS = $("#toDateS").val();
		var vendorCodeS = $("#vendorCodeS").val();
		var mrvNoSValue = $("#mrvNoS-value").val();
		var articleSegmentS = $("#articleSegmentS").val();
	    
		fieldFilters = {
			"fieldFilters" : {}
		};

		if (fromDateS != "" && fromDateS != null) {
			fieldFilters.fieldFilters["fromDate"] = fromDateS;
		}
		
		if (toDateS != "" && toDateS != null) {
			fieldFilters.fieldFilters["toDate"] = toDateS;
		}
		
		if (vendorCodeS != "" && vendorCodeS != null) {
			fieldFilters.fieldFilters["vendorCode"] = vendorCodeS;
		}
		if (mrvNoSValue != "" && mrvNoSValue != null) {
			fieldFilters.fieldFilters["mrvNo"] = mrvNoSValue;
		}
		
		if (articleSegmentS != "" && articleSegmentS != null) {
			fieldFilters.fieldFilters["segId"] = articleSegmentS;
		}
		return fieldFilters;
	}

//###################################### Search Grid  ###################################################
	var viewStoneMrvSearchGridModal = function(row, column, value) {
		return '<button style="margin-top:8px;" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#viewStoneMrvSearchGridModal"  type="button"  onclick="viewStoneMrvSearchGridLoad('+ row	+ ')"/><i class="fa fa-eye fa-sm"></i></button>';
	}

var  stoneMrvToGrGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'mrvDate','type' : 'string','map':'createdDate'},
		{'name' : 'mrvNo','type' : 'int','map':'stoneReceiptDTO>id'},
		{'name' : 'mrvSlNo','type' : 'int','map':'serialNumber'}, 
		{'name' : 'mrvType','type' : 'string','map':'stoneReceiptDTO>mrvType'},
		{'name' : 'vendorCode','type' : 'string','map':'stoneReceiptDTO>vendor>name'},
		{'name' : 'venBillNo','type' : 'int','map':'stoneReceiptDTO>billNo'}, 
		{'name' : 'venBillDate','type' : 'string','map':'stoneReceiptDTO>billDt'},
		{'name' : 'pcS','type' : 'int','map':''},
		{'name' : 'articleSeg','type' : 'float','map':'segment>id'},
		{'name' : 'stoneWeight','type' : 'float','map':'stoneWeight'},
		{'name' : 'uqc','type' : 'string','map':'indentStoneDetailDTO>uqc'},
		{'name' : 'grPcs','type' : 'int','map':'grPcs'},
		{'name' : 'grStoneWeight','type' : 'float','map':'grStoneWt'},
		{'name' : 'mivPcs','type' : 'int','map':'mivPcs'},
		{'name' : 'mivStoneWeight','type' : 'float','map':'mivStoneWt'},
		{'name' : 'adjStoneWeight','type' : 'float','map':'adjStoneWt'}
		];

	var columns = [
		{'text' : 'GRV Date','datafield' : 'mrvDate','width' : '7%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'GRV No.','datafield' : 'mrvNo','width' : '7%',sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'GRV Sl No.','datafield' : 'mrvSlNo','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'GRV Type','datafield' : 'mrvType','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Ven Bill No.','datafield' : 'venBillNo','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Ven Bill Date','datafield' : 'venBillDate','width' : '7%',cellsalign : 'center',	align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : 'Segment.','datafield' : 'articleSeg','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Stone Wt','datafield' : 'stoneWeight','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'UQC','datafield' : 'uqc','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'GR Pcs','datafield' : 'grPcs','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'GR Stone Wt','datafield' : 'grStoneWeight','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'MIV Stone Wt','datafield' : 'mivStoneWeight','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Adj Stone Wt','datafield' : 'adjStoneWeight','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : '', 'datafield' : 'actionId','width' : '3%',cellsalign : 'center',align : 'center',sortable : false, cellsrenderer : viewStoneMrvSearchGridModal}
	];

	showMyGrid(datafields,"/OrderExecution/api/v1/searchStoneMrvToGrReport", "list", columns, stoneMrvToGrReportFilters(), updateRows, "");
		
	var objArray = [];
	var getSumRows = function(data){
		var stoneWeight = 0.00;
		var pcS = 0;
		for(var i=0; i< data.length; i++){
			if(data[i].stoneWeight != null){
				stoneWeight = stoneWeight + parseFloat(data[i].stoneWeight);
			}
			
			if(data[i].pcS != null){
				pcS = pcS + data[i].pcS;
			}
		}
		objArray['stoneWeight'] = stoneWeight.toFixed(3);
		objArray['pcS'] = pcS;
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Stone Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['stoneWeight']  + '</span><b> Pcs </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['pcS']  + '</span></span></div>';
	};
	
	$("#jqxgrid").jqxGrid({	
		width : '100%',
		height: '355px',
        columnsheight: 65,
        columnsresize: true,  
		rowsheight : 20,
		theme: 'energyblue',
		autorowheight : true,
		autoheight : false,
		groupable: true,
		rowdetails : true,
		editable: false,
		groupsrenderer: groupsrenderer,
	});}


$("#search").on("click",function(){
	var fromDateS=$("#fromDateS").val();
	var toDateS=$("#toDateS").val();
	
	if((fromDateS == ""  || fromDateS == null) || (toDateS == "" || toDateS == null)){
		$.growl.error({
				message : "Please fill all  mandatory field!!",
			duration : 10000
		});
		return false;
	}

	stoneMrvToGrGrid();
	$("#jqxgrid").show();
})


var viewStoneMrvSearchGridLoad = function(row){
	var rows = $("#jqxgrid").jqxGrid('getrows');
	var fieldFilters = {"fieldFilters":{"mrvNo":rows[row].mrvNo,"mrvSrlNo":rows[row].mrvSlNo}};
	var mrvNo = "MRV No : " + rows[row].mrvNo + " -  MRV SL No : " + rows[row].mrvSlNo; 
	$("#popupheaderlabel").html(mrvNo);
	postJSON('/OrderExecution/api/v1/getStoneMrvToGRReportByMrv', JSON.stringify(fieldFilters), function(data) {
		if(data.resCode == 1){
			var adjVouDetails = data.payload.adjVouDetails;
			var grDetails = data.payload.grDetails;
			var mivDetails = data.payload.mivDetails;

			$("#adjListGrid").jqxGrid('clear');
			adjListGrid(adjVouDetails);
			$("#adjListGrid").show();
		
			$("#grListGrid").jqxGrid('clear');
			grListGrid(grDetails);
			$("#grListGrid").show();

			$("#mivListGrid").jqxGrid('clear');
			mivListGrid();
			$("#mivListGrid").show();
		}
	});
}


var  grListGrid = function(data) {
	
	var source = {
			datafields : [ 
			{name : 'grDate', type : 'date'}, 
			{name : 'grNo',	type : 'long'}, 
			{name : 'grPcs', type : 'int'}, 
			{name : 'grSegment',	type : 'string'}, 
			{name : 'grStoneWt', type : 'float'}, 
			{name : 'grUqc', type : 'string'}],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
			},

		};

		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#grListGrid").jqxGrid({
			source : dataAdapter,
			width : '100%',
	        columnsheight: 30,
	        columnsresize: true,  
			rowsheight : 20,
			theme: 'energyblue',
			autorowheight : true,
			autoheight : true,
			rowdetails : true,
			showaggregates: true, 
			showstatusbar: true,
	 	    statusbarheight: 20,
			editable: false,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);
				container.append('<i class="fa fa-list fa-md"></i>&nbsp; GR Details');
				
			},
			columns : [ 
				{text : 'GR Date',datafield : 'grDate',	width : '10%',cellsalign : 'center',align : 'center', cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'}, 
				{text : 'GR No',datafield : 'grNo',width : '18%',cellsalign : 'center',align : 'center',editable : false}, 
				{text : 'GR Segment',datafield : 'grSegment',width : '18%',cellsalign : 'center',align : 'center',editable : false}, 

				{text : 'GR Pcs',datafield : 'grPcs',width : '18%',	cellsalign : 'center',align : 'center',	editable : false,
					aggregates: [{          
		        		  'Total': function(aggregatedValue, currentValue, column, record) {
		    				  var total = (record['grPcs'] == null) ? 0 : record['grPcs'];
		        			  return aggregatedValue + total;
		        		  }
		        	  }],
		        	  aggregatesrenderer: function(aggregates) {        		 
			          		if(typeof aggregates["Total"] == "undefined"){
			      				return '0';
			      		  	}else{
			      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
			      		  	}
		        	  }  
				},
				{text : 'GR Stone Wt',datafield : 'grStoneWt',width : '18%',cellsalign : 'right',align : 'center',cellsformat : 'd3',editable : false,
					aggregates: [{          
		        		  'Total': function(aggregatedValue, currentValue, column, record) {
		    				  var total = (record['grStoneWt'] == null) ? 0 : record['grStoneWt'];
		        			  return aggregatedValue + total;
		        		  }
		        	  }],
		        	  aggregatesrenderer: function(aggregates) {        		 
			          		if(typeof aggregates["Total"] == "undefined"){
			      				return '0.00';
			      		  	}else{
			      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
			      		  	}
		        	  } 
				},
				{text : 'GR UQC',datafield : 'grUqc',width : '18%',cellsalign : 'center',align : 'center',editable : false}, 

			]
	});
}

var  mivListGrid = function(data) {
	var source = {
			datafields : [ 
			{name : 'mivDate', type : 'date'}, 
			{name : 'mivNo',	type : 'long'}, 
			{name : 'mivPcs', type : 'int'}, 
			{name : 'mivSegment',	type : 'string'}, 
			{name : 'mivStoneWt', type : 'float'}, 
			{name : 'mivUqc', type : 'string'}],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
			},

		};

		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#mivListGrid").jqxGrid({
			source : dataAdapter,
			width : '100%',
	        columnsheight: 30,
	        columnsresize: true,  
			rowsheight : 20,
			autorowheight : true,
			autoheight : true,
			rowdetails : true,
			showaggregates: true, 
			showstatusbar: true,
	 	    statusbarheight: 20,
			editable: false,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);
				container.append('<i class="fa fa-list fa-md"></i>&nbsp; MIV Details');
				
			},
			columns : [ 
				{text : 'GIV Date',datafield : 'mivDate',	width : '10%',cellsalign : 'center',align : 'center', cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'}, 
				{text : 'GIV No',datafield : 'mivNo',width : '18%',cellsalign : 'center',align : 'center',editable : false}, 
				{text : 'GIV Segment',datafield : 'mivSegment',width : '18%',cellsalign : 'center',align : 'center',editable : false}, 

				{text : 'GIV Pcs',datafield : 'mivPcs',width : '18%',	cellsalign : 'center',align : 'center',	editable : false,
					aggregates: [{          
		        		  'Total': function(aggregatedValue, currentValue, column, record) {
		    				  var total = (record['grPcs'] == null) ? 0 : record['grPcs'];
		        			  return aggregatedValue + total;
		        		  }
		        	  }],
		        	  aggregatesrenderer: function(aggregates) {        		 
			          		if(typeof aggregates["Total"] == "undefined"){
			      				return '0';
			      		  	}else{
			      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
			      		  	}
		        	  }  
				},
				{text : 'GIV Stone Wt',datafield : 'mivStoneWt',width : '18%',cellsalign : 'right',align : 'center',cellsformat : 'd3',editable : false,
					aggregates: [{          
		        		  'Total': function(aggregatedValue, currentValue, column, record) {
		    				  var total = (record['mivStoneWt'] == null) ? 0 : record['mivStoneWt'];
		        			  return aggregatedValue + total;
		        		  }
		        	  }],
		        	  aggregatesrenderer: function(aggregates) {        		 
			          		if(typeof aggregates["Total"] == "undefined"){
			      				return '0.00';
			      		  	}else{
			      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
			      		  	}
		        	  } 
				},
				{text : 'GIV UQC',datafield : 'mivUqc',width : '18%',cellsalign : 'center',align : 'center',editable : false}, 
			]
	});
}

var  adjListGrid = function(data) {
	
	var source = {
			datafields : [ 
			{name : 'adjNo',	type : 'int'}, 
			{name : 'adjSegment', type : 'string'},
			{name : 'adjType', type : 'string'}, 
			{name : 'adjLocation',	type : 'string'}, 
			{name : 'adjDebitOrCredit', type : 'string'}, 
			{name : 'adjStoneWt', type : 'float'}, 
			{name : 'adjUqc', type : 'string'}],
			
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
			},

		};

		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#adjListGrid").jqxGrid({
			source : dataAdapter,
			width : '100%',
	        columnsheight: 30,
	        columnsresize: true,  
			rowsheight : 20,
			autorowheight : true,
			autoheight : true,
			rowdetails : true,
			editable: false, 
			showstatusbar: true,
	 	    statusbarheight: 20,
			showaggregates: true,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
				toolbar.append(container);
				container.append('<i class="fa fa-list fa-md"></i>&nbsp; Adjustment Details');
				
			},
			columns : [ 
				{text : 'Adj No',datafield : 'adjNo',width : '10%',cellsalign : 'center',align : 'center',editable : false}, 
				{text : 'Adj Segment',datafield : 'adjSegment',width : '14%',cellsalign : 'center',align : 'center',	editable : false}, 
				{text : 'Adj Type',datafield : 'adjType',width : '15%',	cellsalign : 'center',align : 'center',	editable : false}, 
				{text : 'Adj Location Code',datafield : 'adjLocation',width : '18%',cellsalign : 'center',align : 'center',editable : false}, 
				{text : 'Adj Debit/Credit Flag',	datafield : 'adjDebitOrCredit',width : '18%',cellsalign : 'center',align : 'center',	editable : false}, 
				{text : 'Adj Stone Wt',datafield : 'adjStoneWt',width : '15%',cellsalign : 'right',cellsformat : 'd3',align : 'center',editable : false,
					aggregates: [{          
		        		  'Total': function(aggregatedValue, currentValue, column, record) {
		    				  var total = (record['adjStoneWt'] == null) ? 0 : record['adjStoneWt'];
		        			  return aggregatedValue + total;
		        		  }
		        	  }],
		        	  aggregatesrenderer: function(aggregates) {        		 
			          		if(typeof aggregates["Total"] == "undefined"){
			      				return '0.00';
			      		  	}else{
			      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
			      		  	}
		        	  }
				},
				{text : 'Adj UQC',datafield : 'adjUqc',width : '10%',cellsalign : 'center',align : 'center',	editable : false}, 
			]
	});
}
$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

//Print Functionality to be done by Venkat
//#######################################
$("#printsmrvgr").on('click', function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var vendorCodeS = $("#vendorCodeS").val();
	var mrvNoSValue = $("#mrvNoS-value").val();
	var articleSegmentS = $("#articleSegmentS").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorCodeS;
	}
	if (mrvNoSValue != "" && mrvNoSValue != null) {
		fieldFilters.fieldFilters["mrvNo"] = mrvNoSValue;
	}
	
	if (articleSegmentS != "" && articleSegmentS != null) {
		fieldFilters.fieldFilters["segId"] = articleSegmentS;
	}

	fieldFilters = {
		"fieldFilters" : {
			"FromDate" : fromDateS,
			"ToDate" : toDateS,
			"vendorId":vendorCodeS,
			"mrvNumber":mrvNoSValue,
			"SegmentId":articleSegmentS,
			"mode" : "pdf",
			"reportName" : "RPT_MRV_To_GR_Loose_Stones"
		}
	}
	$.ajax({
		url : 'jasperReport',
		type : 'post',
		data : fieldFilters,
		contentType : "application/x-www-form-urlencoded",
		xhrFields : {
			responseType : "arraybuffer"
		},
		success : function(data) {
			console.log(data);
			if (navigator.msSaveBlob) {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				navigator.msSaveBlob(file, 'RPT_MRV_To_GR_Loose_Stones.pdf');
			} else {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
			}
		}
	});

});

$("#export").on("click",function(){
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var vendorCodeS = $("#vendorCodeS").val();
	var mrvNoSValue = $("#mrvNoS-value").val();
	var articleSegmentS = $("#articleSegmentS").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorCodeS;
	}
	if (mrvNoSValue != "" && mrvNoSValue != null) {
		fieldFilters.fieldFilters["mrvNo"] = mrvNoSValue;
	}
	
	if (articleSegmentS != "" && articleSegmentS != null) {
		fieldFilters.fieldFilters["segId"] = articleSegmentS;
	}

	var newData = [];
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
			postJSON('/OrderExecution/api/v1/exportStoneMrvToGrReport',JSON.stringify(fieldFilters),function(response) {
				if (response != null) {
					data = response.payload.list;
					exportStoneMrvToGrAdjSideBySide(data);
				}
			});
		}
		 else{
			$.growl.error({
				message : "No Data to Export.",
				duration : 10000
			});
			return false;	
		}
	 }
});



function exportStoneMrvToGrAdjSideBySide(data)
{
	var sql0 = 'SEARCH / AS @umrv \
		RETURN ( \
		@umrv->createdDate AS [MRV Date], \
		@umrv->stoneReceiptDTO->id AS [MRV No.], \
		@umrv->serialNumber AS [Mrv Sl. No.], \
		@umrv->stoneReceiptDTO->mrvType AS [Mrv Type], \
		@umrv->stoneReceiptDTO->vendor->id  AS [Vendor Code], \
		@umrv->stoneReceiptDTO->billNo AS [Vendor Bill No.], \
		@umrv->stoneReceiptDTO->billDt AS [Ven Bill Date], \
		@umrv->segment->id AS [Seg.], \
		@umrv->indentStoneDetailDTO->uqc AS [UQC] \
			) \
		FROM $0';

	  // Query to get first child records (stones)	
	var sql1 = 'SEARCH / AS @umrv\
		grDetails / AS @ug \
			RETURN ( \
		@umrv->stoneReceiptDTO->id AS [MRV No.], \
		@umrv->serialNumber AS [Mrv Sl. No.], \
		@ug->grDate AS [GR Date], \
		@ug->grNo AS [GR Number], \
		@ug->grSegment AS [Seg.], \
		@ug->grPcs AS [Pcs.], \
		@ug->grStoneWt AS [Stone Wt.], \
		@ug->grUqc AS [GR. UQC] \
				) \
			FROM $0';
	
	
	var sql2 = 'SEARCH / AS @umrv\
		adjDetails / AS @uad \
			RETURN ( \
		@umrv->stoneReceiptDTO->id AS [MRV No.], \
		@umrv->serialNumber AS [Mrv Sl. No.], \
		@uad->adjNo AS [ADJ No.], \
		@uad->adjSegment AS [Adj Seg.] ,\
		@uad->adjType AS [Adj. type], \
		@uad->adjLocation AS [Adj Loc Code], \
		@uad->adjDebitOrCredit AS [Adj. Dr. Cr Flag], \
		@uad->adjStoneWt AS [Stone Weight], \
		@uad->adjUqc AS [Adj. UQC] \
		) \
			FROM $0';
	
  							
	

	var sql3 = 'SEARCH / AS @umrv\
		mivDetails / AS @umiv \
			RETURN ( \
		@umrv->stoneReceiptDTO->id AS [MRV No.], \
		@umrv->serialNumber AS [Mrv Sl. No.], \
		@umiv->mivDate AS [MIV Date], \
		@umiv->mivNo AS [MIV No.], \
		@umiv->mivSegment AS [Seg.], \
		@umiv->mivStoneWt AS [Stone Weight], \
		@umiv->mivUqc AS [MIV UQC] \
		) \
			FROM $0';
						
  
	var sql4 = "SELECT * FROM ? AS mrv " 
			+" LEFT OUTER JOIN ? AS grh ON grh.[MRV No.] = mrv.[MRV No.] AND grh.[Mrv Sl. No.] = mrv.[Mrv Sl. No.] "
			+" LEFT OUTER JOIN ? AS adj ON adj.[MRV No.] = mrv.[MRV No.]  AND adj.[Mrv Sl. No.] = mrv.[Mrv Sl. No.] "
			+ " LEFT OUTER JOIN ? AS miv ON miv.[MRV No.] = mrv.[MRV No.] AND miv.[Mrv Sl. No.] = mrv.[Mrv Sl. No.]";

 var res = null;
    
    var mystyle = {
      cellStyles: true,
      headers:true, 
      column: {style:{Font:{Bold:30}}},
      rows: {1:{style:{Font:{Color:"#FF0077"}}}},
      cells: {1:{1:{
        style: {Font:{Color:"#00FFFF"}}
      }}}
    };
    
    try
    {
    	var i = 0;
    	for(i=0; i<data.length; i++){
    		if(null == data[i].grDetails){
    			data[i].grDetails = []
    		}
    		if(null == data[i].mivDetails){
    			data[i].mivDetails = []
    		}
    		if(null == data[i].adjDetails){
    			data[i].adjDetails = []
    		}
    	}
    	
    	// Following code generates export data as Master-Child side-by-side
    	res0 = alasql(sql0,[data]);
    	res1 = alasql(sql1,[data]);
    	res2 = alasql(sql2,[data]);
    	res3 = alasql(sql3,[data]);
    	res = alasql(sql4,[res0, res1, res2, res3]);
    	adjustObjectKeys(res); 
    	removeNullData(res);
    	res = alasql("SELECT * INTO XLSX('MRV_To_GR_Loose_Stones.xlsx',?) FROM ?",[mystyle, res]);
    }
    catch (err)
    {
    	alert(err.message);
    }
}

$('#viewStoneMrvSearchGridModal').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();

});

