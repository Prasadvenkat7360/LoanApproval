/*<!-- 
	##	Author1 (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Nageswara Rao
	##	Date Creation 	: 	04-10-2017
	## 	Description		:	(FG)MRV To GR,MIV & ADJ Report
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
	maxDate: 0, 
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
	maxDate: 0
});

var redirect = function() {
	window.location.href="javascript:showContentPage('fgMrvToGrAdjReport', 'bodySwitcher')";
	return window.location.href;
}
//###################################### On Load Lov'S  ###################################################


var onLoadFunction = function(){
	$('#mrvTypeS').empty().append('<option value="" selected>--Select--</option>');
	$('#articleSegmentS').empty().append('<option value="" selected>--Select--</option>');
	$('#vendorCodeS').empty().append('<option value="" selected>--Select--</option>');
	$('#mrvNoS').empty().append('<option value="" selected>--Select--</option>');
	
		 $.getJSON("/OrderExecution/api/v1/fgMrvToGrMivAdjReportLOVs",function(data){
		/* $.each(data.payload.mrvTypes,function(key,val){
		    	$("#mrvTypeS").append('<option value="'+val.id+'">'+val.name+'</option>');
		    })*/
		    
		    
		    var V = '<select id="mrvTypeSObj"  name="mrvTypeSObj" class="form-control" multiple="multiple">';   
			$.each(data.payload.mrvTypes, function(key, val) {
				V +='<option value="' + val.id + '">' + val.name + '</option>';
			});
			V +='</select>'; 
			$("#mrvTypeS").html(V);
			$('#mrvTypeSObj').multiselect({ 
	            includeSelectAllOption: true,
	            enableFiltering:false,         
	            maxHeight:250,
	            numberDisplayed:1,
	            buttonClass: 'col-md-12 form-control text-left'
	      	});
		    
		    
		    $.each(data.payload.metalSegments,function(key,val){
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
					maxshowitems: 5,
					
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

var fgMrvToGrReportFilters = function(){
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var vendorCodeS = $("#vendorCodeS").val();
	var mrvTypeSObj = $("#mrvTypeSObj").val();
	var mrvNoSValue = $("#mrvNoS").val();
	var articleSegmentS = $("#articleSegmentS").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (mrvTypeSObj == null || mrvTypeSObj == ""){
		var mrvTypeS = "";
	}else{
		var mrvTypeS = mrvTypeSObj.join(",");
	}
	
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorCodeS;
	}
	
	if (mrvTypeS != "" && mrvTypeS != null) {
		fieldFilters.fieldFilters["mrvType"] = mrvTypeS;
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
var viewfgMrvSearchGridModal = function(row, column, value) {
	return '<button style="margin-top:8px;" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#viewfgMrvSearchGridModal"  type="button"  onclick="viewfgMrvSearchGridLoad('+ row	+ ')"/><i class="fa fa-eye fa-sm"></i></button>';
}

var  fgMrvSearchGrid = function() {
	
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'mrvDate','type' : 'string','map' : 'createdDate'},
		{'name' : 'mrvNo','type' : 'int'},
		{'name' : 'mrvSlNo','type' : 'int', 'map' : 'mrvSrialNo'}, 
		{'name' : 'mrvType','type' : 'string', map :'mrvType'},
		{'name' : 'vendorCode','type' : 'string'},
		{'name' : 'partyBillNo','type' : 'string'}, 
		{'name' : 'partyBillDate','type' : 'date', map :'billDate'},
		{'name' : 'artSeg','type' : 'float', map : 'segmentDTO>description'},
		{'name' : 'pcs','type' : 'int'}, 
		{'name' : 'grossWeight','type' : 'number'}, 
		{'name' : 'netWeight','type' : 'number'}, 
		{'name' : 'wastageWeight','type' : 'float'}, 
		{'name' : 'skinPurity','type' : 'float'}, 
		{'name' : 'grPcs','type' : 'int'}, 
		{'name' : 'grGwt','type' : 'float'}, 
		{'name' : 'grNwt','type' : 'float'}, 
		{'name' : 'grCostWastage','type' : 'float'}, 
		{'name' : 'adjGwt','type' : 'float'}, 
		{'name' : 'adjNwt','type' : 'float'}, 
		{'name' : 'actionId','type' : 'int'}, 
		{'name' : 'mivPcs','type' : 'int', 'map' : 'givPcs'}, 
		{'name' : 'mivGwt','type' : 'float', 'map' : 'givGwt'}, 
		{'name' : 'mivNwt','type' : 'float', 'map' : 'givNwt'}, 
		{'name' : 'mivCostWastage','type' : 'float', 'map' : 'givCostWastWt'}
		];

	var columns = [
		{'text' : 'GRV Date', 'datafield' : 'mrvDate','width' : '5%',cellsalign : 'center',align : 'center',sortable : true, cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'},
		{'text' : 'GRV No', 'datafield' : 'mrvNo','width' : '4%',cellsalign : 'center',align : 'center',sortable : true, groupable: true},
		{'text' : 'GRV Sl No.', 'datafield' : 'mrvSlNo','width' : '4%',cellsalign : 'center',align : 'center',sortable : true, groupable: true},
		{'text' : 'GRV Type', 'datafield' : 'mrvType','width' : '4%',cellsalign : 'center',align : 'center',sortable : false, groupable: false},
		{'text' : 'Vendor Code', 'datafield' : 'vendorCode','width' : '4%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Bill No.', 'datafield' : 'partyBillNo','width' : '4%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Bill Date', 'datafield' : 'partyBillDate','width' : '4%',cellsalign : 'center',align : 'center',sortable : false, cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'},
		{'text' : 'Art Seg','datafield' : 'artSeg','width' : '4%',cellsalign : 'center',	align : 'center',sortable : false},
		{'text' : 'Pcs', 'datafield' : 'pcs','width' : '4%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Gr Wt.', 'datafield' : 'grossWeight','width' : '4%',cellsalign : 'right',align : 'center',cellsformat : 'd3', sortable : false},
		{'text' : 'Net Wt', 'datafield' : 'netWeight','width' : '4%',cellsalign : 'right',align : 'center',cellsformat : 'd3' ,sortable : false},
		{'text' : 'Wast Wt', 'datafield' : 'wastageWeight','width' : '4%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false},
		{'text' : 'Purity', 'datafield' : 'skinPurity','width' : '4%',cellsalign : 'right',align : 'center',cellsformat : 'd2' ,sortable : false},	
		{'text' : 'IGR Pcs', 'datafield' : 'grPcs','width' : '4%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'IGR Gwt.', 'datafield' : 'grGwt','width' : '4%',cellsalign : 'right',align : 'center',cellsformat : 'd3', sortable : false},
		{'text' : 'IGR Nwt.', 'datafield' : 'grNwt','width' : '4%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false},
		{'text' : 'IGR Cost Wast Wt', 'datafield' : 'grCostWastage','width' : '6%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false},
		{'text' : 'GIV Pcs', 'datafield' : 'mivPcs','width' : '4%',cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'GIV Gwt', 'datafield' : 'mivGwt','width' : '4%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false},
		{'text' : 'GIV Nwt', 'datafield' : 'mivNwt','width' : '4%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false},
		{'text' : 'GIV Cost Wast Wt', 'datafield' : 'mivCostWastage','width' : '6%',cellsalign : 'right',cellsformat : 'd3',align : 'center',sortable : false},
		{'text' : 'MDV Gwt', 'datafield' : 'adjGwt','width' : '4%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false},
		{'text' : 'MDV Nwt', 'datafield' : 'adjNwt','width' : '4%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false},
		{'text' : '', 'datafield' : 'actionId','width' : '3%',cellsalign : 'center',align : 'center',sortable : false,cellsrenderer : viewfgMrvSearchGridModal}		
	];

	showMyGrid(datafields,"/OrderExecution/api/v1/searchFgMrvToGrMivAdjReport", "list", columns, fgMrvToGrReportFilters(), updateRows, "");
		
	var objArray = [];
	var getSumRows = function(data){
		var grossWeight = 0.00;
		var netWeight  = 0.00;
		var pcs = 0;
		for(var i=0; i< data.length; i++){
			if(data[i].grossWeight != null){
				grossWeight = grossWeight + parseFloat(data[i].grossWeight);
			}
			
			if(data[i].netWeight != null){
				netWeight = netWeight + parseFloat(data[i].netWeight);
			}
			
			if(data[i].pcs != null){
				pcs = pcs + data[i].pcs;
			}
		}
		objArray['grossWeight'] = grossWeight.toFixed(3);
		objArray['netWeight'] = netWeight.toFixed(3);
		objArray['pcs'] = pcs;
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Gross Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['grossWeight'] + '</span> <b>Net Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['netWeight']  + '</span><b> Pcs </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['pcs']  + '</span></span></div>';
	};
	
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		theme: 'energyblue',
		virtualmode : true,
		editable:false,
		groupsrenderer: groupsrenderer
	});
}

var viewfgMrvSearchGridLoad = function(row){
	var rows = $("#jqxgrid").jqxGrid('getrows');
	
	var fieldFilters = {"fieldFilters":{"mrvNo":rows[row].mrvNo,"mrvSrialNo":rows[row].mrvSlNo}};
	var mrvNo = "MRV No : " + rows[row].mrvNo + " -  MRV SL No : " + rows[row].mrvSlNo; 
	$("#popupheaderlabel").html(mrvNo);
	postJSON('/OrderExecution/api/v1/getGrMivAdjDetailsByMrv', JSON.stringify(fieldFilters), function(data) {
		if(data.resCode == 1){
			var adjVouDetails = data.payload.adjVouDetails;
			var grDetails = data.payload.grDetails;
			var mivDetails = data.payload.mivDetails;

			if(adjVouDetails.length != 0){
				$("#adjListGrid").jqxGrid('clear');
				adjListGrid(adjVouDetails);
				$("#adjListGrid").show();
			}else{
				adjVouDetails = [];
				$("#adjListGrid").jqxGrid('clear');
				adjListGrid(adjVouDetails);
				$("#adjListGrid").show();
			}
			
			if(grDetails.length != 0){
				$("#grListGrid").jqxGrid('clear');
				grListGrid(grDetails);
				$("#grListGrid").show();
			}else{
				grDetails = [];
				$("#grListGrid").jqxGrid('clear');
				grListGrid(grDetails);
				$("#grListGrid").show();
			}
			
			if(mivDetails.length != 0){
				$("#mivListGrid").jqxGrid('clear');
				mivListGrid(mivDetails);
				$("#mivListGrid").show();
			}/*else{
				mivDetails = [];
				$("#mivListGrid").jqxGrid('clear');
				mivListGrid(mivDetails);
				$("#mivListGrid").show();
			}*/
		}
	});
}

var  grListGrid = function(data) {
	
	var source = {
			datafields : [ 
			{name : 'grDate', type : 'date'}, 
			{name : 'grNo',	type : 'int'}, 
			{name : 'grPcs', type : 'int'}, 
			{name : 'grGwt',	type : 'float'}, 
			{name : 'grNwt', type : 'float'}, 
			{name : 'grCostWastage', type : 'float'}],
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
			autorowheight : true,
			autoheight : true,
			rowdetails : true,
			theme: 'energyblue',
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
				{text : 'IGR Date',datafield : 'grDate',	width : '20%',cellsalign : 'center',align : 'center', cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput'}, 
				{text : 'IGR No',datafield : 'grNo',width : '15%',cellsalign : 'center',align : 'center',editable : false}, 
				{text : 'Pcs',datafield : 'grPcs',width : '15%',	cellsalign : 'center',align : 'center',	editable : false,
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
				{text : 'Gross Wt',datafield : 'grGwt',	width : '15%',cellsalign : 'right',align : 'center',cellsformat : 'd3',editable : false,
					aggregates: [{          
		        		  'Total': function(aggregatedValue, currentValue, column, record) {
		    				  var total = (record['grGwt'] == null) ? 0 : record['grGwt'];
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
				{text : 'Net Wt',	datafield : 'grNwt',width : '15%',cellsalign : 'right',align : 'center',cellsformat : 'd3',	editable : false,
					aggregates: [{          
		        		  'Total': function(aggregatedValue, currentValue, column, record) {
		    				  var total = (record['grNwt'] == null) ? 0 : record['grNwt'];
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
				{text : 'Cost Wastage Wt',datafield : 'grCostWastage',	width : '20%',cellsalign : 'right',cellsformat : 'd3',align : 'center',editable : false,
					aggregates: [{          
		        		  'Total': function(aggregatedValue, currentValue, column, record) {
		    				  var total = (record['grCostWastage'] == null) ? 0 : record['grCostWastage'];
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
				}
			]
	});
}

var  adjListGrid = function(data) {
	
	var source = {
			datafields : [ 
			{name : 'adjNo',	type : 'int'}, 
			{name : 'adjType', type : 'string'}, 
			{name : 'adjLocCode',	type : 'string'}, 
			{name : 'adjDebitOrCredit', type : 'string'}, 
			{name : 'adjGwt', type : 'float'},
			{name : 'adjNwt', type : 'float'}],
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
			theme: 'energyblue',
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
				{text : 'MDV No',datafield : 'adjNo',width : '15%',cellsalign : 'center',align : 'center',editable : false}, 
				{text : 'MDV Type',datafield : 'adjType',width : '15%',	cellsalign : 'center',align : 'center',	editable : false}, 
				{text : 'MDV Location Code',datafield : 'adjLocCode',	width : '20%',cellsalign : 'center',align : 'center',editable : false}, 
				{text : 'MDV Debit/Credit',	datafield : 'adjDebitOrCredit',width : '20%',cellsalign : 'center',align : 'center',	editable : false}, 
				{text : 'Gross Wt',datafield : 'adjGwt',	width : '15%',cellsalign : 'right',cellsformat : 'd3',align : 'center',editable : false,
					aggregates: [{          
		        		  'Total': function(aggregatedValue, currentValue, column, record) {
		    				  var total = (record['adjGwt'] == null) ? 0 : record['adjGwt'];
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
				{text : 'Net Wt',datafield : 'adjNwt',	width : '15%',cellsalign : 'right',cellsformat : 'd3',align : 'center',editable : false,
					aggregates: [{          
		        		  'Total': function(aggregatedValue, currentValue, column, record) {
		    				  var total = (record['adjNwt'] == null) ? 0 : record['adjNwt'];
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
				}

			]
	});
}

$("#searchS").on("click",function(){
	var fromDateS=$("#fromDateS").val();
	var toDateS=$("#toDateS").val();
	
	if((fromDateS == ""  || fromDateS == null) || (toDateS == "" || toDateS == null)){
		$.growl.error({
				message : "Please fill all  mandatory field!!",
			duration : 10000
		});
		return false;
	}
	
	fgMrvSearchGrid();
	$("#jqxgrid").show();
})

$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$('#mrvTypeSObj').multiselect("clearSelection");
	$("#jqxgrid").hide();
	redirect();
});

//Print Functionality to be done by Venkat
//#######################################
$("#printfgmrvgr").on('click', function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var vendorCodeS = $("#vendorCodeS").val();
	var mrvTypeS = $("#mrvTypeS").val();
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
	
	if (mrvTypeS != "" && mrvTypeS != null) {
		fieldFilters.fieldFilters["mrvType"] = mrvTypeS;
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
			"MrvType":mrvTypeS,
			"mrvNumber":mrvNoSValue,
			"SegmentId":articleSegmentS,
			"mode" : "pdf",
			"reportName" : "RPT_MRV_To_GR_For_Vendor"
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
				navigator.msSaveBlob(file, 'RPT_MRV_To_GR_For_Vendor.pdf');
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
	var mrvTypeSObj = $("#mrvTypeSObj").val();
	var mrvNoSValue = $("#mrvNoS").val();
	var articleSegmentS = $("#articleSegmentS").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (mrvTypeSObj == null || mrvTypeSObj == ""){
		var mrvTypeS = "";
	}else{
		var mrvTypeS = mrvTypeSObj.join(",");
	}
	
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vendorCode"] = vendorCodeS;
	}
	
	if (mrvTypeS != "" && mrvTypeS != null) {
		fieldFilters.fieldFilters["mrvType"] = mrvTypeS;
	}
	
	if (mrvNoSValue != "" && mrvNoSValue != null) {
		fieldFilters.fieldFilters["mrvNo"] = mrvNoSValue;
	}
	
	if (articleSegmentS != "" && articleSegmentS != null) {
		fieldFilters.fieldFilters["segId"] = articleSegmentS;
	}

	var newData = [];
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
			postJSON('/OrderExecution/api/v1/exportFgMrvToGrMivAdjReport',JSON.stringify(fieldFilters),function(response) {
				if (response != null) {
					var data = response.payload.list;
		             for (i = 0; i < data.length; i++) {
						newData.push({
			                'GRV Date' : (data[i].createdDate != null) ? data[i].createdDate : "",
							'GRV No' : (data[i].mrvNo != null) ? data[i].mrvNo: "",
							'GRV Sl No' : (data[i].mrvSrialNo != null) ? data[i].mrvSrialNo : "",		
							'GRV Type' : (data[i].mrvType != null) ? data[i].mrvType: "",
							'Vendor Code' : (data[i].vendorCode != null) ? data[i].vendorCode : "",
							
							'Ven Bill No' : (data[i].partyBillNo != null) ? data[i].partyBillNo : "",		
							'Ven Bill Date' : (data[i].billDate != null) ? data[i].billDate : "",	
							'Article Segment' : (data[i].segmentDTO != null) ? data[i].segmentDTO.description : "",
							'Pcs' : (data[i].pcs != null) ? data[i].pcs : "",
							
							'Gr Wt.' : (data[i].grossWeight != null) ? data[i].grossWeight : "",
							'Nt Wt' : (data[i].netWeight != null) ? data[i].netWeight : "",
							
							'Wastage Wt' : (data[i].wastageWeight != null) ? data[i].wastageWeight : "",
							'Purity' : (data[i].skinPurity != null) ? data[i].skinPurity : "",
							'GR Date' : (data[i].grDate != null) ? data[i].grDate : "",
						    "GR No" : (data[i].grNo != null) ? data[i].grNo : "", 	
						    "GR Pcs" :(data[i].grPcs != null) ? data[i].grPcs : "",
							"Gr. Wt." :(data[i].grGwt != null) ?data[i].grGwt : "",
					   		"Nt Wt." : (data[i].grNwt != null) ? data[i].grNwt : "",
					   		"Cost Wastage Wt." :(data[i].grCostWastage != null) ? data[i].grCostWastage : "",
							'GIV Date' : (data[i].givDate != null ? data[i].givDate : ""),
							'GIV No' : (data[i].givNo != null) ? data[i].givNo : "",
							'GIV Pcs' :(data[i].givPcs != null) ? data[i].givPcs : "",
									
							'GIV GWt.' : (data[i].givGwt != null) ? data[i].givGwt : "",
							'GIV Nt Wt.' : (data[i].givNwt != null) ? data[i].givNwt : "",
							'GIV Cost Wastage Wt.' : (data[i].givCostWastWt != null) ? data[i].givCostWastWt : "",
						    "ADJ No" : (data[i].adjNo != null) ? data[i].adjNo : "", 	
						    "ADJ Type" :(data[i].adjType != null) ? data[i].adjType : "",
							"ADJ Loc Code" :(data[i].adjLocCode != null) ?data[i].adjLocCode : "",
					   		"ADJ Dr or Cr Flag" : (data[i].adjDebitOrCredit != null) ? data[i].adjDebitOrCredit : "",
					   		"MDV Gr Wt." :(data[i].adjGwt != null) ? data[i].adjGwt : "",
					   		"MDV Nt Wt." :(data[i].adjNwt != null) ? data[i].adjNwt : "",		
		              });
		          }
		       //JSONToCSVConvertor(newData, "Bill Discount Report" + "_" + sysdate, true);
		             var opts = [{sheetid:'MRV_To_GR_For_Vendor',header:true}];
		             var res = alasql('SELECT * INTO XLSX("MRV_To_GR_For_Vendor_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
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





$('#viewfgMrvSearchGridModal').on('hidden.bs.modal', function() {	
	$(this).find('form').trigger('reset');
	$(this).removeData();
	$('.modal-backdrop').remove();
});
