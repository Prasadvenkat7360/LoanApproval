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
$("#gridTabs").hide();
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

//on load lov's
var onLoadLov = function(){
	var params = {
			  "fieldFilters": {
				  'type':'onloadLov'
			  }
			}
	postJSON('/OrderExecution/api/v1/getGRVToIGRDetailQueryLOVs',JSON.stringify(params),function(response) {
		if(response.resCode == "1"){
			$("#vendorCodeS").empty().append('<option value="" selected>--Select--</option>');
			$.each(response.payload.vCodeList, function(key, val) {
			$("#vendorCodeS").append('<option value="' + val.id + '">' + val.name + '</option>');
		});	
			
		$("#grvTypeS").empty().append('<option value="" selected>--Select--</option>');
			$.each(response.payload.mrvTypes, function(key, val) {
			$("#grvTypeS").append('<option value="' + val.id + '">' + val.name + '</option>');
		});	
	  }
	});
}
onLoadLov();

/*$("#vendorCodeS").on('change',function(){
	getGRVNum();
});*/

$("#grvTypeS").on('change',function(){
	getGRVNum();
});

var getGRVNum = function(){
	var vId = $("#vendorCodeS").val();
	var gType = $("#grvTypeS").val();
	
	if(vId == "" || gType == ""){
		$.growl.error({
			message : "Please Select Vendor Code & GRV Type to get GRV No's  !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		var params = {
				  "fieldFilters": {
					  'type':'onloadLov',
					  'vId' : vId,
					  'vType' :gType
				  }
				}
		postJSON('/OrderExecution/api/v1/getGRVToIGRDetailQueryLOVs',JSON.stringify(params),function(data) {
			if(data.resCode == "1"){
				var mrvNo = data.payload.MrvNoList;
			
				var data = [];
			
				$.each(mrvNo, function(key, value) {
					data.push({ value : value.mrvvNo });
				});
				
				$("#grvNo").autocomplete({
					source : data,
					focus : function(event, ui) {
						event.preventDefault();
						$(this).val(ui.item.value);
					},
					select : function(event, ui) {
						event.preventDefault();
						$(this).val(ui.item.value);
						$("#grvNo-value").val(ui.item);
					}
				});
			}
		});
	}
}

$("#grvNo").on('change',function(){
	if($("#grvNo").val() != ""){
		var params = {
				  "fieldFilters": {
					  'type':'onloadLov',
					  'GrvNo' : $("#grvNo").val()
				  }
				}
		postJSON('/OrderExecution/api/v1/getGRVToIGRDetailQueryLOVs',JSON.stringify(params),function(data) {
				if(data.resCode == "1"){
					var mrvSerialNos = data.payload.mrvSerialNos;
				
					var data = [];
				
					$.each(mrvSerialNos, function(key, value) {
						data.push({ value : value.mrvSrialNo });
					});
					
					$("#grvSlNo").autocomplete({
						source : data,
						focus : function(event, ui) {
							event.preventDefault();
							$(this).val(ui.item.value);
						},
						select : function(event, ui) {
							event.preventDefault();
							$(this).val(ui.item.value);
							$("#grvSlNo-value").val(ui.item);
						}
					});
			}
		});
	}
});

$("#grvSlNo").on('change',function(){
	if($("#grvNo").val() != "" || $("#grvNo").val() != null && $("#grvSlNo").val() != "" || $("#grvSlNo").val() != null){
		var params = {
				  "fieldFilters": {
					  'type':'onloadLov',
					  'GrvNo' : $("#grvNo").val(),
					  'mrvSerialNos' : $("#grvSlNo").val()
				  }
				}
		postJSON('/OrderExecution/api/v1/getGRVToIGRDetailQueryLOVs',JSON.stringify(params),function(data) {
				if(data.resCode == "1"){
					var IgrNolist = data.payload.IgrNolist;
				
					var data = [];
				
					$.each(IgrNolist, function(key, value) {
						data.push({ value : value.id });
					});
					
					$("#igrNo").autocomplete({
						source : data,
						focus : function(event, ui) {
							event.preventDefault();
							$(this).val(ui.item.value);
						},
						select : function(event, ui) {
							event.preventDefault();
							$(this).val(ui.item.value);
							$("#igrNo-value").val(ui.item);
						}
				});
			}
		});
	}
});

//Bill Discount Field Filters
var grvToIgrFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var vendorCodeS = $('#vendorCodeS').val();
	var grvTypeS = $('#grvTypeS').val();
	var grvNo = $('#grvNo').val();
	var grvSlNo = $('#grvSlNo').val();
	var igrNo = $('#igrNo').val();
	
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
		fieldFilters.fieldFilters["vendorId"] = vendorCodeS;
	}
	if (grvTypeS != "" && grvTypeS != null) {
		fieldFilters.fieldFilters["vType"] = grvTypeS;
	}
	if (grvNo != "" && grvNo != null) {
		fieldFilters.fieldFilters["grvNo"] = grvNo;
	}
	if (grvSlNo != "" && grvSlNo != null) {
		fieldFilters.fieldFilters["grvSrlNo"] = grvSlNo;
	}
	if (igrNo != "" && igrNo != null) {
		fieldFilters.fieldFilters["igrNo"] = igrNo;
	}
	fieldFilters.fieldFilters["type"] = "search";
	return fieldFilters;
}

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
    $('.nav-tabs a[href="#' + tab + '"]').click();
};


$(".tabDisabledS").addClass("tabDisabled2");
$("#gridTabs").tabs({
	disabled:[]
});

$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == "" || $("#vendorCodeS").val() == "" || $("#grvTypeS").val() == "" ){
		$.growl.error({
			message : "Please Fill Mandatrory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	activaTab('tab0default');
	$("#gridTabs").show();
	mrvDetailsSearch();
	$("#jqxgrid").show();
});

function mrvDetailsSearch() {
	var updateRows = function(rowid, newdata, commit) {
		  commit(true);
	}
	var datafields = [
		{'name' : 'grvDate','type' : 'string','map':'mrvDate'},
		{'name' : 'grvNo','type' : 'string','map':'mrvNo'},
		{'name' : 'mrvSrialNo','type' : 'string','map':'mrvSrialNo'},
		{'name' : 'grvType','type' : 'string','map' : 'mrvType'},
		{'name' : 'parcelId','type' : 'int','map':'parcelId'}, 
		{'name' : 'vCode','type' : 'string','map' : 'vendorCode'},
		{'name' : 'segment','type' : 'string','map' : 'segmentDTO>description'},
		{'name' : 'mType','type' : 'string','map' : 'materialType'},
		{'name' : 'metalAccLoc','type' : 'string','map' : 'metalAccLocation'},
		{'name' : 'partyBillNo','type' : 'int','map' : 'partyBillNo'},
		{'name' : 'sPurity','type' : 'float','map' : 'skinPurity'},
		{'name' : 'pcs','type' : 'int','map' : 'pcs'},
		{'name' : 'gwt','type' : 'float','map' : 'grossWeight'},
		{'name' : 'nwt','type' : 'float','map' : 'netWeight'},
		{'name' : 'mRate','type' : 'float','map' : 'metalRate'}, 
		{'name' : 'diaWt','type' : 'float','map' : 'diamondWeight'},
		{'name' : 'labourCharges','type' : 'float','map' : 'labourCharges'},
		{'name' : 'valInRs','type' : 'float','map' : 'valueInRs'},
		{'name' : 'grvSlNo','type' : 'int','map' : 'mrvSrialNo'},
		{'name' : 'partyBillDate','type' : 'string','map' : 'billDate'},
		{'name' : 'flag','type' : 'string'},
	 ];

	var columns = [ 
		{'text' : '','datafield' : '',cellsalign : 'center',columntype : 'checkbox',align : 'center','width' : '4%',sortable : false,
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				console.log(newvalue);
				$('#jqxgrid').jqxGrid ('setcellvalue', row, 'flag',  newvalue);
				}
		},
		{'text' : 'flag','datafield' : 'flag','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
		{'text' : 'GRV Date','datafield' : 'grvDate','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'GRV No','datafield' : 'grvNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
		{'text' : 'GRV Sl No','datafield' : 'grvSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 

		{'text' : 'GRV Type','datafield' : 'grvType','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Parcel Id','datafield' : 'parcelId','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Vendor Code','datafield' : 'vCode','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		{'text' : 'Segment','datafield' : 'segment','width' : '6%',cellsalign : 'center',align : 'center','cellsformat' : 'd2',sortable :false,editable : false},
		{'text' : 'Material Type','datafield' : 'mType','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
		{'text' : 'Metal Acc Location','datafield' : 'metalAccLoc','width' : '5%',cellsalign : 'left',align : 'center',sortable : false,editable : false},
		{'text' : 'Party Bill No','datafield' : 'partyBillNo','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		{'text' : 'Party Bill Date','datafield' : 'partyBillDate','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 

		{'text' : 'Skin Purity','datafield' : 'sPurity','width' : '6%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable :false,editable : false,
			aggregatesrenderer: function() {        		 
  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Total : </b></span>';
			}
		},
		{'text' : 'Pcs','datafield' : 'pcs','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false,
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['pcs'] == null) ? 0 : record['pcs'];
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
		{'text' : 'Gross Wt.','datafield' : 'gwt','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable :false,editable : false,
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['gwt'] == null) ? 0 : record['gwt'];
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
		{'text' : 'Net Wt.','datafield' : 'nwt','width' : '7%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false,
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['nwt'] == null) ? 0 : record['nwt'];
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
		{'text' : 'Metal Rate','datafield' : 'mRate','width' : '7%',cellsalign : 'right',align : 'center',sortable : false,cellsformat : 'd2',editable : false},

		{'text' : 'Diamond Wt.','datafield' : 'diaWt','width' : '7%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false,
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['diaWt'] == null) ? 0 : record['diaWt'];
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
		{'text' : 'Labour Charges','datafield' : 'labourCharges','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable : false,editable : false,
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['labourCharges'] == null) ? 0 : record['labourCharges'];
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
		{'text' : 'Value in RS.','datafield' : 'valInRs','width' : '7%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable : false,editable : false,
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['valInRs'] == null) ? 0 : record['valInRs'];
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
		{'text' : 'GRV Sl No','datafield' : 'mrvSrialNo','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden : true}, 

		];
	showMyGrid(datafields,"/OrderExecution/api/v1/getGRVToIGRDetailQueryLOVs", "list",columns, grvToIgrFieldFilters(), updateRows);
	var columnCheckBox = null;
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		showstatusbar: true,
 	    statusbarheight: 30,
 	    showaggregates: true,
	});
}

var dataArr = [];
$("#jqxgrid").bind('cellendedit', function (event,index) {
	var i =event.args.rowindex;
	    if (event.args.value) {
	      $("#jqxgrid").jqxGrid('selectrow', event.args.row);
	        dataArr.push(i);
	       $(".tabDisabledS").removeClass("tabDisabled2");
	   	    }
	    else {
	        $("#jqxgrid").jqxGrid('unselectrow', event.args.row);
	        var delArr = dataArr.splice(i,1);
	    }
	    if($("#jqxgrid").jqxGrid("getselectedrowindexes") <= 0)
		{
	    	$(".tabDisabledS").addClass("tabDisabled2");
		}
	    $.each(dataArr, function(key, val) {
	    		var data =$("#jqxgrid").jqxGrid('getrowdata',val);
	    });
	});

function selectedCheckBox(){
	var dataArr1 = [];
	var grvData = $("#jqxgrid").jqxGrid('getrows');
	console.log(grvData);
	$.each(grvData,function(k,v){
		if(v.flag == true){
			dataArr1.push({
				 "mrvNo" : v.grvNo,
				 "SerialNo" : v.mrvSrialNo
			 });
		}
	});
	console.log(dataArr1);
	return dataArr1;
}

$("#igrDetails").click(function () {
	var grvNoArray;
	var grvNoArray= selectedCheckBox();
	var params = 
	{"fieldFilters":
		{
		    "type":"IGRDetails",
			"MrvNoList":grvNoArray
		}
	}
	console.log(params);
	postJSON('/OrderExecution/api/v1/getGRVToIGRDetailQueryLOVs',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.IGRDetails;
			igrDetailsGrid(data);
			$('#jqxgridIgr').show();
		}else{
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});

var igrDetailsGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'grvNo','type' : 'int','map':'mrvNo'},
			{'name' : 'grvsrlNo','type' : 'int','map' : 'mrvSrlNo'},
			{'name' : 'igrNo','type' : 'int','map':'id'}, 
			{'name' : 'igrSlNo','type' : 'int','map' : 'srl'},
			{'name' : 'psrNo','type' : 'int','map' : 'psr'},
			{'name' : 'jCode','type' : 'string','map' : 'jwTypeDesc'},
			{'name' : 'aCode','type' : 'string','map' : 'articleCode'},
			{'name' : 'aDesc','type' : 'string','map' : 'articleDesc'},
			{'name' : 'pcs','type' : 'int','map' : 'pcs'},
			{'name' : 'gwt','type' : 'float','map' : 'grossWt'}, 
			{'name' : 'nwt','type' : 'float','map' : 'netWt'},
			{'name' : 'costCode','type' : 'string','map' : 'costCode'}, 
			{'name' : 'hmCharges','type' : 'float','map' : 'hallMarkCharges'},
			{'name' : 'costWastageWt','type' : 'float','map' : 'costWastageWT'},
			
			{'name' : 'costMC','type' : 'float','map' : 'costMC'},
			{'name' : 'sellingWastageWt','type' : 'float','map' : 'sellWastageWt'},
			{'name' : 'sellingMC','type' : 'float','map' : 'sellMC'}, 
			{'name' : 'photoNo','type' : 'string','map' : 'photo'},
			{'name' : 'provisional','type' : 'string','map' : 'provisional'}, 
			{'name' : 'qcStatus','type' : 'string','map' : 'qcStatus'},

		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridIgr").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		showstatusbar: true,
 	    statusbarheight: 30,
 	    showaggregates: true,
		columns : [
			{'text' : 'GRV No','datafield' : 'grvNo','width' : '4%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'GRV Sl No','datafield' : 'grvsrlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'IGR No','datafield' : 'igrNo','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'IGR Sl No ','datafield' : 'igrSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'PSR No','datafield' : 'psrNo','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false,
				cellsrenderer: function(row, column, value){
					
					var PsrNo;
					if(value == null || value == "null" || value == "" ){
						PsrNo = "None";
					}else{
						PsrNo = value;
					}
		      		return "<div align='center'style='margin-top:8px;'>"+PsrNo+"</div>";
		      	} 
			},
			{'text' : 'Jewel Code','datafield' : 'jCode','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Article Code','datafield' : 'aCode','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Article Desc','datafield' : 'aDesc','width' : '10%',cellsalign : 'left',align : 'center',sortable : false,editable : false,
				aggregatesrenderer: function() {        		 
		  			  return '<span style="margin-top: 8px; color: #008800; text-align:right;"><b>Total : </b></span>';
					}
			},
			{'text' : 'Pcs','datafield' : 'pcs','width' : '4%',cellsalign : 'center',align : 'center',sortable :false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['pcs'] == null) ? 0 : record['pcs'];
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
			{'text' : 'Gross Wt.','datafield' : 'gwt','width' : '6%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable :false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['gwt'] == null) ? 0 : record['gwt'];
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
			{'text' : 'Net Wt.','datafield' : 'nwt','width' : '6%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['nwt'] == null) ? 0 : record['nwt'];
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
			{'text' : 'Cost Code','datafield' : 'costCode','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Hall Mark Charges','datafield' : 'hmCharges','width' : '8%',cellsalign : 'right',align : 'center','cellsformat' : 'd2',sortable :false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['hmCharges'] == null) ? 0 : record['hmCharges'];
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
			{'text' : 'Cost Wastage Wt.','datafield' : 'costWastageWt','width' : '8%',cellsalign : 'right',align : 'center',cellsformat : 'd3',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['costWastageWt'] == null) ? 0 : record['costWastageWt'];
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
			{'text' : 'Cost MC/Total Cost','datafield' : 'costMC','width' : '8%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['costMC'] == null) ? 0 : record['costMC'];
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

			{'text' : 'Selling Wastage Wt.','datafield' : 'sellingWastageWt','width' : '8%',cellsalign : 'right',align : 'center','cellsformat' : 'd3',sortable :false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['sellingWastageWt'] == null) ? 0 : record['sellingWastageWt'];
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
			{'text' : 'Selling MC/Total Cost','datafield' : 'sellingMC','width' : '8%',cellsalign : 'right',align : 'center',cellsformat : 'd2',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['sellingMC'] == null) ? 0 : record['sellingMC'];
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
			{'text' : 'Photo No','datafield' : 'photoNo','width' : '5%',cellsalign : 'center',align : 'center','cellsformat' : 'd3',sortable :false,editable : false},
			{'text' : 'Provisional','datafield' : 'provisional','width' : '5%',cellsalign : 'center',align : 'center',cellsformat : 'd3',sortable : false,editable : false},
			{'text' : 'QC Status','datafield' : 'qcStatus','width' : '6%',cellsalign : 'center',align : 'center',cellsformat : 'd3',sortable : false,editable : false},
		]
	});
}

$("#attributeDetails").click(function () {
	var grvNoArray;
	var grvNoArray= selectedCheckBox();
	var params = 
	{"fieldFilters":
		{
		    "type":"mAttributes",
			"MrvNoList":grvNoArray
		}
	}
	postJSON('/OrderExecution/api/v1/getGRVToIGRDetailQueryLOVs',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.mAttributes;
			attributeDetailsGrid(data);
			$('#jqxgridAttr').show();
		}else{
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});

var attributeDetailsGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'grvNo','type' : 'int','map':'mrvNo'},
			{'name' : 'grvSlNo','type' : 'int','map' : 'mrvSrlNo'},
			{'name' : 'igrSlNo','type' : 'int','map':'id'}, 
			{'name' : 'slNo','type' : 'int','map' : 'srl'},
			{'name' : 'length','type' : 'string','map' : 'attrLength'},
			{'name' : 'size','type' : 'string','map' : 'size'},,
			{'name' : 'vendArticle','type' : 'string','map' : 'vendorArticle'},
			
			{'name' : 'stoneComb','type' : 'string','map':'stoneCombinaitonDesc'},
			{'name' : 'metalColor','type' : 'string','map' : 'metalColor'},
			{'name' : 'polishType','type' : 'string','map':'polishType'}, 
			{'name' : 'settingType','type' : 'string','map' : 'settingType'},
			{'name' : 'collectionName','type' : 'string','map' : 'collectionName'},
			
			{'name' : 'hookType','type' : 'string','map':'hookType'},
			{'name' : 'screwType','type' : 'string','map' : 'screwType'},
			{'name' : 'loopType','type' : 'string','map':'loopType'}, 
			{'name' : 'diameter','type' : 'float','map' : 'diameter'},
			{'name' : 'height','type' : 'float','map' : 'height'},
			
			{'name' : 'width','type' : 'int','map':'width'},
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAttr").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		columns : [
			{'text' : 'GRV No','datafield' : 'grvNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'GRV Sl No','datafield' : 'grvSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'IGR No','datafield' : 'igrSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'IGR Sl No','datafield' : 'slNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Length','datafield' : 'length','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Size','datafield' : 'size','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Vendor Article','datafield' : 'vendArticle','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,'cellsformat' : 'd3'},
			
			{'text' : 'Stone Combination','datafield' : 'stoneComb','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Metal Color','datafield' : 'metalColor','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Polish Type','datafield' : 'polishType','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Setting Type','datafield' : 'settingType','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Collection Name','datafield' : 'collectionName','width' : '8%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			
			{'text' : 'Hook Type','datafield' : 'hookType','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Screw Type','datafield' : 'screwType','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Loop Type','datafield' : 'loopType','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Diameter','datafield' : 'diameter','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Height','datafield' : 'height','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			
			{'text' : 'Width','datafield' : 'width','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			
		]
	});
}

$("#stoneDetails").click(function () {
	var grvNoArray;
	var grvNoArray= selectedCheckBox();
	var params = 
	{"fieldFilters":
		{
		    "type":"stoneDetails",
			"MrvNoList":grvNoArray
		}
	}
	postJSON('/OrderExecution/api/v1/getGRVToIGRDetailQueryLOVs',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.stoneDetails;
			stoneGrid(data);
			$('#jqxgridStone').show();
		}else{
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});

var stoneGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'grvNo','type' : 'int','map':'mrvNo'},
			{'name' : 'grvSlNo','type' : 'int','map' : 'mrvSrlNo'},
			{'name' : 'igrSlNo','type' : 'int','map':'grSlNo'}, 
			{'name' : 'stoneSlNo','type' : 'int','map' : 'stoneSlNo'},
			{'name' : 'suppBy','type' : 'string','map' : 'suppliedBy'},
			{'name' : 'stoneCode','type' : 'string','map' : 'stoneCode'},
			{'name' : 'subCat','type' : 'string','map' : 'subCategoryDesc'},
			
			{'name' : 'issuePcs','type' : 'int','map':'issuedPcs'},
			{'name' : 'issueWt','type' : 'float','map' : 'issuedWt'},
			{'name' : 'usedPcs','type' : 'int','map':'usedPcs'}, 
			{'name' : 'usedWt','type' : 'float','map' : 'usedWt'},
			{'name' : 'bulkPcs','type' : 'int','map' : 'bulkPcs'},
			
			{'name' : 'bulkWt','type' : 'float','map':'bulkWt'},
			{'name' : 'retPcs','type' : 'int','map' : 'returnedPcs'},
			{'name' : 'retWt','type' : 'float','map':'returnedWt'}, 
			{'name' : 'brkRecPcs','type' : 'int','map' : 'breakageReceivedPcs'},
			{'name' : 'brkRecWt','type' : 'float','map' : 'breakageReceived'},
			
			{'name' : 'brkUnrecPcs','type' : 'int','map':'breakageNotReceivedPcs'},
			{'name' : 'brkUnrecWt','type' : 'float','map' : 'breakageNotReceived'},
			{'name' : 'uqc','type' : 'string','map':'uom'}, 
			{'name' : 'stoneCostRate','type' : 'float','map' : 'systemCostRate'},
			{'name' : 'stoneCostRateEdited','type' : 'float','map' : 'stoneCostRate'},
			
			{'name' : 'stoneCost','type' : 'float','map':'stoneCost'},
			{'name' : 'stoneHcEdited','type' : 'float','map' : 'stoneHC'},
			{'name' : 'stoneHc','type' : 'float','map':'stoneHC'}, 
			{'name' : 'provisional','type' : 'string','map' : 'provisional'},
			{'name' : 'certReq','type' : 'string','map' : 'isCertficateRequired'},
			
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStone").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		showstatusbar: true,
 	    statusbarheight: 30,
 	    showaggregates: true,
		columns : [
			{'text' : 'GRV No','datafield' : 'grvNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'GRV Sl No','datafield' : 'grvSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'IGR Sl No','datafield' : 'igrSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Stone Sl No','datafield' : 'stoneSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Supplied By','datafield' : 'suppBy','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'SubCat Desc/Shape','datafield' : 'subCat','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				aggregatesrenderer: function() {        		 
		  			  return '<span style="margin-top: 8px; color: #008800; text-align:right;"><b>Total : </b></span>';
					}
			},
			
			{'text' : 'Issued Pcs','datafield' : 'issuePcs','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['issuePcs'] == null) ? 0 : record['issuePcs'];
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
			{'text' : 'Issued Wt','datafield' : 'issueWt','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['issueWt'] == null) ? 0 : record['issueWt'];
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
			{'text' : 'Used Pcs','datafield' : 'usedPcs','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['usedPcs'] == null) ? 0 : record['usedPcs'];
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
			{'text' : 'Used Wt','datafield' : 'usedWt','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['usedWt'] == null) ? 0 : record['usedWt'];
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
			{'text' : 'Bulk Pcs','datafield' : 'bulkPcs','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false,hidden:true,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['bulkPcs'] == null) ? 0 : record['bulkPcs'];
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
			
			{'text' : 'Bulk Wt','datafield' : 'bulkWt','width' : '5%',hidden:true,cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['bulkWt'] == null) ? 0 : record['bulkWt'];
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
			{'text' : 'Returned Pcs','datafield' : 'retPcs','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['retPcs'] == null) ? 0 : record['retPcs'];
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
			{'text' : 'Returned Wt','datafield' : 'retWt','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['retWt'] == null) ? 0 : record['retWt'];
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
			{'text' : 'Breakage Received Pcs','datafield' : 'brkRecPcs','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['brkRecPcs'] == null) ? 0 : record['brkRecPcs'];
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
			{'text' : 'Breakage Received Wt','datafield' : 'brkRecWt','width' : '8%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat : 'd3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['brkRecWt'] == null) ? 0 : record['brkRecWt'];
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
			
			{'text' : 'Breakage UnReceived Pcs','datafield' : 'brkUnrecPcs','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['brkUnrecPcs'] == null) ? 0 : record['brkUnrecPcs'];
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
			{'text' : 'Breakage UnReceived Wt','datafield' : 'brkUnrecWt','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['brkUnrecWt'] == null) ? 0 : record['brkUnrecWt'];
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
			{'text' : 'UQC','datafield' : 'uqc','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Stone Cost Rate','datafield' : 'stoneCostRate','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['stoneCostRate'] == null) ? 0 : record['stoneCostRate'];
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
			{'text' : 'Stone Cost Rate Edited','datafield' : 'stoneCostRateEdited','width' : '6%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['stoneCostRateEdited'] == null) ? 0 : record['stoneCostRateEdited'];
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
			
			{'text' : 'Stone Cost','datafield' : 'stoneCost','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['stoneCost'] == null) ? 0 : record['stoneCost'];
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
			{'text' : 'Stone HC Edited','datafield' : 'stoneHcEdited','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['stoneHcEdited'] == null) ? 0 : record['stoneHcEdited'];
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
			{'text' : 'Stone HC','datafield' : 'stoneHc','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['stoneHc'] == null) ? 0 : record['stoneHc'];
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
			{'text' : 'Provisional','datafield' : 'provisional','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Cert Req','datafield' : 'certReq','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
		]
	});
}


$("#accDetails").click(function () {
	var grvNoArray;
	var grvNoArray= selectedCheckBox();
	var params = 
	{"fieldFilters":
		{
		    "type":"IGRAccDetails",
			"MrvNoList":grvNoArray
		}
	}
	postJSON('/OrderExecution/api/v1/getGRVToIGRDetailQueryLOVs',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var data = response.payload.IGRAccDetails;
			accGrid(data);
			$('#jqxgridAcc').show();
		}else{
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
});


var accGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'grvNo','type' : 'int','map':'mrvNo'},
			{'name' : 'grvSlNo','type' : 'int','map' : 'mrvSrlNo'},
			{'name' : 'igrSlNo','type' : 'int','map':'grSlNo'}, 
			{'name' : 'accSlNo','type' : 'int','map' : 'accSrNo'},
			{'name' : 'suppBy','type' : 'string','map' : 'suppliedBy'},
			{'name' : 'accCode','type' : 'string','map' : 'accCode'},
			{'name' : 'subCat','type' : 'string','map' : 'subCategory'},
			
			{'name' : 'issuePcs','type' : 'int','map':'issuedPcs'},
			{'name' : 'issueWt','type' : 'float','map' : 'issuedWt'},
			{'name' : 'usedPcs','type' : 'int','map':'usedPcs'}, 
			{'name' : 'usedWt','type' : 'float','map' : 'usedWt'},
			
			{'name' : 'retPcs','type' : 'int','map' : 'returnedPcs'},
			{'name' : 'retWt','type' : 'float','map':'returnedWt'}, 
			{'name' : 'brkRecPcs','type' : 'int','map' : 'breakageReceivedPcs'},
			{'name' : 'brkRecWt','type' : 'float','map' : 'breakageReceived'},
			
			{'name' : 'brkUnrecPcs','type' : 'int','map':'breakageNotReceivedPcs'},
			{'name' : 'brkUnrecWt','type' : 'float','map' : 'breakageNotReceived'},
			{'name' : 'uqc','type' : 'string','map':'uom'}, 
			{'name' : 'accCostRate','type' : 'float','map' : 'accRate'},
			{'name' : 'accCostRateEdited','type' : 'float','map' : 'accCostRateEdited'},
			
			{'name' : 'accCost','type' : 'float','map':'accCost'},
			{'name' : 'accHcEdited','type' : 'float','map' : 'accHC'},
			{'name' : 'accHc','type' : 'float','map':'accHC'}, 
			{'name' : 'provisional','type' : 'string','map' : 'provisional'},
			
		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		showstatusbar: true,
 	    statusbarheight: 30,
 	    showaggregates: true,
		columns : [
			{'text' : 'GRV No','datafield' : 'grvNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'GRV Sl No','datafield' : 'grvSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'IGR Sl No','datafield' : 'igrSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Acc Sl No','datafield' : 'accSlNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Supplied By','datafield' : 'suppBy','width' : '6%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Acc Code','datafield' : 'accCode','width' : '5%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Sub Category/Shape','datafield' : 'subCat','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				aggregatesrenderer: function() {        		 
		  			  return '<span style="margin-top: 8px; color: #008800; text-align:right;"><b>Total : </b></span>';
					}
			},
			{'text' : 'Issued Pcs','datafield' : 'issuePcs','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['issuePcs'] == null) ? 0 : record['issuePcs'];
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
			{'text' : 'Issued Wt','datafield' : 'issueWt','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['issueWt'] == null) ? 0 : record['issueWt'];
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
			{'text' : 'Used Pcs','datafield' : 'usedPcs','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['usedPcs'] == null) ? 0 : record['usedPcs'];
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
			{'text' : 'Used Wt','datafield' : 'usedWt','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['usedWt'] == null) ? 0 : record['usedWt'];
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
			
			{'text' : 'Returned Pcs','datafield' : 'retPcs','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['retPcs'] == null) ? 0 : record['retPcs'];
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
			{'text' : 'Returned Wt','datafield' : 'retWt','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['retWt'] == null) ? 0 : record['retWt'];
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
			{'text' : 'Breakage Received Pcs','datafield' : 'brkRecPcs','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['brkRecPcs'] == null) ? 0 : record['brkRecPcs'];
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
			{'text' : 'Breakage Received Wt','datafield' : 'brkRecWt','width' : '8%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat : 'd3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['brkRecWt'] == null) ? 0 : record['brkRecWt'];
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
			
			{'text' : 'Breakage UnReceived Pcs','datafield' : 'brkUnrecPcs','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['brkUnrecPcs'] == null) ? 0 : record['brkUnrecPcs'];
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
			{'text' : 'Breakage UnReceived Wt','datafield' : 'brkUnrecWt','width' : '8%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['brkUnrecWt'] == null) ? 0 : record['brkUnrecWt'];
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
			
			{'text' : 'UQC','datafield' : 'uqc','width' : '4%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Acc Cost Rate','datafield' : 'accCostRate','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['accCostRate'] == null) ? 0 : record['accCostRate'];
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
			{'text' : 'Acc Cost Rate Edited','datafield' : 'accCostRateEdited','width' : '6%',cellsalign : 'right',align : 'center',sortable :false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['accCostRateEdited'] == null) ? 0 : record['accCostRateEdited'];
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
			
			{'text' : 'Acc Cost','datafield' : 'accCost','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['accCost'] == null) ? 0 : record['accCost'];
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
			{'text' : 'Acc HC Edited','datafield' : 'accHcEdited','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['accHcEdited'] == null) ? 0 : record['accHcEdited'];
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
			{'text' : 'Acc HC','datafield' : 'accHc','width' : '5%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['accHc'] == null) ? 0 : record['accHc'];
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
			{'text' : 'Provisional','datafield' : 'provisional','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		]
	});
}
$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('grvToIgrDetailedQuery', 'bodySwitcher')"
});

$("#export").on('click',function(){
	 var rows = $("#jqxgrid").jqxGrid('getrows');
	 if(typeof rows == "undefined"){
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
		}
	 else{
	var filterValues = grvToIgrFieldFilters();
	console.log(filterValues);
	
	 $('#loading').show();
		fieldFilters = {
				"fieldFilters":{
					"FromDate":filterValues.fieldFilters.fromDate,
					"ToDate":filterValues.fieldFilters.toDate,
					"grNo":filterValues.fieldFilters.igrNo,
					"mrvNumber":filterValues.fieldFilters.grvNo,
					"mrvSrlNo":filterValues.fieldFilters.grvSrlNo,
					"MrvType":filterValues.fieldFilters.vType,
					"vendorId":filterValues.fieldFilters.vendorId,
					"mode" : "excel",
					"reportName" : "RPT_Grv_To_Igr_Query_Report_Export"
					}
			}
		$.ajax({
			url : 'jasperReport',
			type : 'post',
			data : fieldFilters,
			contentType : "application/x-www-form-urlencoded",
			xhrFields : {
				responseType : "blob"
			},
			success : function(data) {
				console.log(data);
				$('#loading').hide();
				if (navigator.msSaveBlob) {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					navigator.msSaveBlob(file,'Solitaire_Set_in_Jewellery.xlsx');
				}else {
					var file = new Blob([ data ], {
						type : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					});
					var fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				}
			}
		});
	 }
});