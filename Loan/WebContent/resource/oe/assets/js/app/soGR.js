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

//Onload LOV Functions
var slNo = [];
var onloadLov = function(){
	$.getJSON('/OrderExecution/api/v1/getSmallOrderGRLOV?portal=OE', function(data) {
		$('#vendorS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.vendorList, function(key, val) {
				//$('#vendorS').append('<option value="' + val.id + '">'+ val.vendorCode + '-' + val.vendorName + '</option>');
				$('#vendorS').append('<option value="' + val.id + '" idE = '+ val.vendorCode +'>'  + val.vendorName + '</option>');
		 });
		$('#sopNoS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.SOPNo, function(key, val) {
				$('#sopNoS').append('<option value="' + val + '">' + val + '</option>');
		 });
	});
} 
onloadLov();

$("#vendorS").on('change',function(){
	var id = $("#vendorS").val();
	 if(id != ""){
	$.getJSON('/OrderExecution/api/v1/getSOPNo?portal='+"OE"+'&vendorId='+id ,function(data) {
		$('#sopNoS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.SOPNo, function(key, val) {
				$('#sopNoS').append('<option value="' + val + '">' + val + '</option>');
		 });
	});	
  }
});

var vendor ;
var vendorCodes;

$("#sopNoS").on('change',function(){
	var sId = $("#sopNoS").val()
	var id = $("#vendorS").val();	
	if(sId != "" && id != ""){
	$.getJSON('/OrderExecution/api/v1/getSrlNoDetailsFromSmallOrderId?sopId='+sId+'&vendorId='+id,function(data){
		 if(data.resCode == 1){
			 slNo = data.payload.sopOrderItemDetails;
		 }
	 });		
	}
});

$("#sopNoS").on('change',function(){
	var sopNo = $("#sopNoS").val();
	$.getJSON('/OrderExecution/api/v1/getSrlNoDetailsFromSmallOrderId?sopId='+sopNo,function(data){
		 if(data.resCode == 1){
			 vendor =  data.payload.vendorList;
		 }
	});
});


var soGrGrid = function() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ 
		{'name' : 'sopNo','type' : 'int','map' : 'soOrderId'},
		{'name' : 'soiId','type' : 'int','map' : 'soiId'},
		{'name' : 'slNo','type' : 'int','map' :  'soSrlNo'},
		{'name' : 'storeId','type' : 'string','map'  : 'id'},
		{'name' : 'segment','type' : 'string'},
		{'name' : 'storeName','type' : 'string'},
		{'name' : 'jewelType','type' : 'string'},
		{'name' : 'repairDesc','type' : 'string','map' : ''}, 
		{'name' : 'pcs','type' : 'int','map' : 'pieces'},
		{'name' : 'grsWt','type' : 'float','map' :  'grossWeight'},
		{'name' : 'netWt','type' : 'float','map'  : 'netWeight'},
		{'name' : 'stoneName','type' : 'string','map':'stoneName'},
		{'name' : 'stoneWt','type' : 'float','map' :'stoneWeight'},
		{'name' : 'uom','type' : 'string','map':'uomType'},
		{'name' : 'stoneCost','type' : 'float','map' :'stoneCost'},
		{'name' : 'totalCostCharges','type' : 'float','map':'totalCost'},
		{'name' : 'totalSellingCharges','type' : 'float','map':'totalSellingCharges'},
		{'name' : 'sid','type' : 'int'},
		{'name' : 'jid','type' : 'int'},
		{'name' : 'jwId','type' : 'int'}];
		$("#jqxgrid").jqxGrid({
			width : '100%',
			editable : true,
			columnsheight : 50,
			autorowheight :true,
			autoheight : true,
			pageable : 'true',
			theme: 'energyblue',
			pagesize : 20,
			altRows : true,
			columnsresize : true,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom:15px;'></div>");
			toolbar.append(container);
			container.append('<div class="col-md-4 row"><i class="fa fa-list fa-md"></i> Small Order GR Items</div>');
			container.append('<div class="col-md-4"><div style="margin-bottom:10px; color:#00800; font-size:15px;"  id="orderTypeLabel" class="text-center"></div></div>');
			container.append('<div class="col-md-4 pull-right"><div style="margin-bottom:10px;" id="deleterowbutton" class="btn btn-danger btn-sm pull-right"><i class="fa fa-trash fa-md"></i></div></div>');
			$("#deleterowbutton").jqxButton();
			
			$("#deleterowbutton").on('click', function() {
				var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
				var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;				
				/*if(selectedrowindex == -1){
					$.growl.error({
						message : "Please Select Row to be Deleted !!",
						duration : 1000,
						title : 'Error'
					});
					return false;
				}*/
				if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
					var id = $("#jqxgrid").jqxGrid('getrowid', selectedrowindex);
					var commit = $("#jqxgrid").jqxGrid('deleterow', id);
				}
			});
		},
		columns : [
			{'text'  :'SOP No','datafield':  'sopNo','width' : '4%',cellsalign : 'center',align:'center',editable : true,
				createeditor : function(row, value, editor) {
					var vend = $("#vendorS").val();
					editor.on('click', function(event){		
						if(vend != "" ){
							$.getJSON('/OrderExecution/api/v1/getSOPNo?portal='+"OE"+'&vendorId='+vend ,function(data)  {
								var resp = data.payload.SOPNo ;
								var sopNoArry = [];
								$.each(resp, function(k, v){
									sopNoArry.push({
										"id" : v,
										"name" : v
									})
								});
								editor.jqxDropDownList({ source: sopNoArry , displayMember: 'name', valueMember: 'id'});
							});
					     }
						else{
							$.getJSON('/OrderExecution/api/v1/getSmallOrderGRLOV?portal=OE',function(data)  {
								var resp = data.payload.SOPNo ;
								var sopNoArry = [];
								$.each(resp, function(k, v){
									sopNoArry.push({
										"id" : v,
										"name" : v
									})
								});
								editor.jqxDropDownList({ source: sopNoArry , displayMember: 'name', valueMember: 'id'});
							});
						}
					});
				},
				cellbeginedit : function(row){
					var sopNo = $("#sopNoS").val();
					if(sopNo == "" || sopNo == null){
						this.columntype = 'dropdownlist';
						return true;
					}else{
						return false;
					}
				},	
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					 $("#jqxgrid").jqxGrid('setcellvalue', row, "slNo",null);
					 $("#jqxgrid").jqxGrid('setcellvalue', row, "storeOrDc",null);
					 $("#jqxgrid").jqxGrid('setcellvalue', row, "segment",null );
					 $("#jqxgrid").jqxGrid('setcellvalue', row, "jewelType",null);
					 $("#jqxgrid").jqxGrid('setcellvalue', row, "repairDesc",null);
					 $("#jqxgrid").jqxGrid('setcellvalue', row, "sid",null);
					 $("#jqxgrid").jqxGrid('setcellvalue', row, "jid",null);
					 
					 $("#jqxgrid").jqxGrid('setcellvalue', row, "pcs",null);
					 $("#jqxgrid").jqxGrid('setcellvalue', row, "grsWt",null);
					 $("#jqxgrid").jqxGrid('setcellvalue', row, "netWt",null);
					$.getJSON('/OrderExecution/api/v1/getSrlNoDetailsFromSmallOrderId?sopId='+newvalue,function(data){
							 if(data.resCode == 1){
								 slNo = data.payload.sopOrderItemDetails;
								 vendorCodes =  data.payload.vendorList;
							 }
						});
					}
			},
			{'text'  :'JW Code','datafield':  'jwCode','width' : '4%',cellsalign : 'center',align:'center',editable : true,columntype :'dropdownlist',displayfield : 'jwCodes',
				createeditor : function(row, value, editor) {
					editor.on('click', function(event){	
								var jwCode;
								var jwCodeArray = [];
									if($("#vendorS").val() == ""){
										jwCode = vendor
									}else{
										jwCode = vendorCodes
									}
								$.each(jwCode, function(k,v){
									jwCodeArray.push({
										"id" : v.id,
										"name" : v.vendorCode
									})
								});
								editor.jqxDropDownList({ source: jwCodeArray , displayMember: 'name', valueMember: 'id'});
					});
				},
				cellbeginedit : function(row){
					var vendorS = $("#vendorS").val();
					if(vendorS == "" || vendorS == null){
						this.columntype = 'dropdownlist';
						return true;
					}else{
						return false;
					}
				},
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
   		    		var sopNo =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'sopNo');
					$.getJSON('/OrderExecution/api/v1/getSrlNoDetailsFromSmallOrderId?sopId='+sopNo+'&vendorId='+newvalue.value,function(data){
							 if(data.resCode == 1){
								 slNo = data.payload.sopOrderItemDetails;
							 }
						});
				}
			},
			{'text'  :'Sl No','datafield':  'slNo','width' : '4%',cellsalign : 'center',align:'center',editable : true,columntype :'dropdownlist',
				createeditor : function(row, value, editor) {
					editor.on('click', function(event){
						var slnArry = [];
						var slnArray = [];
						if($("#vendorS").val() == ""){
							slnArry = slNo 
						}else{
							slnArry = slNo;
						}
						
						$.each(slnArry,function(key, val) {
							slnArray.push({
								"id" :val.serialNumber,
								"name" : val.serialNumber
							})
						});
						editor.jqxDropDownList({ source: slnArray , displayMember: 'name', valueMember: 'id'});
					});
				},
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					var rows = $("#jqxgrid").jqxGrid('getrows');
					var sopNumb =   $('#jqxgrid').jqxGrid('getcellvalue', row, 'sopNo');
					for (var i = 0; i < rows.length; i++) {
						console.log(rows);
						if(rows[i].slNo == newvalue && rows[i].sopNo == sopNumb){
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "storeOrDc", null);
   							 $("#jqxgrid").jqxGrid('setcellvalue', row, "segment",null);
   							 $("#jqxgrid").jqxGrid('setcellvalue', row, "sid",null);
   							 $("#jqxgrid").jqxGrid('setcellvalue', row, "jewelType",null);
   							 $("#jqxgrid").jqxGrid('setcellvalue', row, "jid",null);
							 $("#jqxgrid").jqxGrid('setcellvalue', row, "repairDesc",null);
       						 $("#jqxgrid").jqxGrid('setcellvalue', row, "pcs", null);
       						 $("#jqxgrid").jqxGrid('setcellvalue', row, "grsWt",null);
       						 $("#jqxgrid").jqxGrid('setcellvalue', row, "netWt",null);
       						 $("#jqxgrid").jqxGrid('setcellvalue', row, "soiId",null);
							$.growl.error({
								message  : "Sl No Already Exists !!!",
								duration : 10000,
								title : 'Error'
							});
							return "";
						}
					}
					var sopNo = $('#jqxgrid').jqxGrid('getcellvalue', row, 'sopNo');
						if(slNo.length >= 1){
                        	var filterednames = slNo.filter(function(obj) {
                        	   return (obj.serialNumber == newvalue && obj.smallOrderId == sopNo) ;
                        		});
                        	if(filterednames.length <=  1)
                        	{
                        		$.each(filterednames,function(key, val) {
           						 $("#jqxgrid").jqxGrid('setcellvalue', row, "storeOrDc", val.storeId);
           						 $("#jqxgrid").jqxGrid('setcellvalue', row, "storeName", val.storeName);
           						 if(val.segment != null){
           							 $("#jqxgrid").jqxGrid('setcellvalue', row, "segment", val.segment.description);
           							 $("#jqxgrid").jqxGrid('setcellvalue', row, "sid", val.segment.id);
                						
           						 }
           						 if(val.jewelType != null){
           							 $("#jqxgrid").jqxGrid('setcellvalue', row, "jewelType", val.jewelType.description);
           							 $("#jqxgrid").jqxGrid('setcellvalue', row, "jid", val.jewelType.id);
           						 }
           						 $("#jqxgrid").jqxGrid('setcellvalue', row, "repairDesc", val.description);
           					
           						 
           						 
           						 $("#jqxgrid").jqxGrid('setcellvalue', row, "pcs", val.pieces);
           						 $("#jqxgrid").jqxGrid('setcellvalue', row, "grsWt", val.grossWeight);
           						 $("#jqxgrid").jqxGrid('setcellvalue', row, "netWt", val.netWeight);
           						 $("#jqxgrid").jqxGrid('setcellvalue', row, "soiId", val.soiId);
           					});
                        }	
                    	else{
                    		
                    	}
                     }
				}
			},
			{'text'  :'Store/DC','datafield':  'storeOrDc','width' : '8%',cellsalign : 'center',align:'center',editable : false,hidden:true},
			{'text'  :'Store/DC Name','datafield':  'storeName','width' : '8%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Seg','datafield' : 'segment','width'  :'6%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
			{'text'  :'Jewel Type','datafield':  'jewelType','width' : '10%',cellsalign : 'center',align:'center',editable : false,},
			{'text'  :'Repair Desc','datafield' : 'repairDesc','width'  :'11%',sortable  :false,cellsalign : 'left',align:'center',editable:  false},
			{'text'  :'Pcs','datafield':  'pcs','width' : '3%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Gross Wt.','datafield' : 'grsWt','width'  :'5%',sortable  :false,cellsalign : 'right',align:'center',editable:  true,cellsformat :'d3',
				columntype : 'numberinput',
	        	createeditor : function(row, cellvalue, editor) {
						editor.jqxNumberInput({
							spinButtons : false,
							decimalDigits : 3
						});
					},
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue == "" || newvalue == null){
				 		$.growl.error({
				 			message : "Gross Wt is Mandatory",
				 			duration : 10000,
				 			title : 'Error'
				 		});
				 		return "";
				 	}
					var netWt = $('#jqxgrid').jqxGrid('getcellvalue', row, 'netWt');
					 if(parseFloat(newvalue) < parseFloat(netWt)){
						$("#jqxgrid").jqxGrid('setcellvalue', row, "grsWt",null);
						$.growl.error({
							message : "Gross Wt Should not be Less Than Net Wt !!!",
							duration : 10000,
							title : 'Error'
						}); 
						return "";
					 }
				},
			},
			{'text'  :'Net Wt.','datafield':  'netWt','width' : '5%',cellsalign : 'right',align:'center',editable : true,cellsformat :'d3',
				columntype : 'numberinput',
	        	createeditor : function(row, cellvalue, editor) {
						editor.jqxNumberInput({
							spinButtons : false,
							decimalDigits : 3
						});
					},
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue == "" || newvalue == null){
				 		$.growl.error({
				 			message : "Net Wt is Mandatory",
				 			duration : 10000,
				 			title : 'Error'
				 		});
				 		return "";
				 	}
					
					var grossWt = $('#jqxgrid').jqxGrid('getcellvalue', row, 'grsWt');
						if(parseFloat(newvalue) > parseFloat(grossWt)){
							$("#jqxgrid").jqxGrid('setcellvalue', row, "netWt",null);
							$.growl.error({
								message : "Net Wt Should Not be greater Than Gross Wt !!!",
								duration : 10000,
								title : 'Error'
							});
							return "";
						}
					var grossWt = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'grsWt');
						if(!(parseFloat(grossWt) - parseFloat(newvalue) > 0 )){
							$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneName",null);
							$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneWt",null);
							$("#jqxgrid").jqxGrid('setcellvalue', row, "stoneCost",null);
							
						}
				},
			},
			{'text'  :'Stone Name','datafield':  'stoneName','width' : '9%',cellsalign : 'center',align:'center',editable : true,
				validation : function(cell, value) {
					var data = /^[a-zA-Z\s]+$/.test(value);
					if(data == false)
						{
						return {
							result : false,
							message : "Only character with space is allowed!"
						};
						}
					return true;
					},
					cellbeginedit : function(row){
						var grossWt = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'grsWt');
						var netWt =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'netWt');  
						if(parseFloat(grossWt) -parseFloat(netWt) > 0 ){
							return true;
						}else{
							return false;
						}
					}
			},
			{'text'  :'Stone Wt.','datafield' : 'stoneWt','width'  :'6%',sortable  :false,cellsalign : 'right',align:'center',editable:  true,cellsformat :'d3',
				columntype : 'numberinput',
	        	createeditor : function(row, cellvalue, editor) {
						editor.jqxNumberInput({
							spinButtons : false,
							decimalDigits : 3
						});
					},
					cellbeginedit : function(row){
						var grossWt = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'grsWt');
						var netWt =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'netWt');  
						if(parseFloat(grossWt) -parseFloat(netWt) > 0 ){
							return true;
						}else{
							return false;
						}
					}
			},
			{'text'  :'UQC','datafield':  'uom','width' : '4%',cellsalign : 'center',align:'center',editable : true,columntype :'dropdownlist',
				createeditor : function(row, value, editor) {
					editor.on('click', function(event){						
						$.getJSON('/OrderExecution/api/v1/getSmallOrderGRLOV?portal=OE',function(data)  {
								var uom = data.payload.uom ;
								var uomArry = [];
								$.each(uom, function(k,v){
									uomArry.push({
										"id" : k,
										"name" : k
									})
								});
								editor.jqxDropDownList({ source: uomArry , displayMember: 'name', valueMember: 'id'});
							});
					});
				},
			},
			{'text'  :'Stone Cost','datafield':  'stoneCost','width' : '6%',cellsalign : 'right',align:'center',editable : true,cellsformat :'d2',
				columntype : 'numberinput',
	        	createeditor : function(row, cellvalue, editor) {
						editor.jqxNumberInput({
							spinButtons : false,
							decimalDigits : 2
						});
					},
			
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					var totalCostCharges = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'totalCostCharges');
					 	if(newvalue == "" || newvalue == null){
					 		$.growl.error({
					 			message : "Stone Cost is Mandatory",
					 			duration : 10000,
					 			title : 'Error'
					 		});
					 		return "";
					 	}
				},
				cellbeginedit : function(row){
					var grossWt = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'grsWt');
					var netWt =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'netWt');  
					if(parseFloat(grossWt) -parseFloat(netWt) > 0 ){
						return true;
					}else{
						return false;
					}
				}
			},
			{'text'  :'Total Cost Charges','datafield':  'totalCostCharges','width' : '8%',cellsalign : 'right',align:'center',editable : true,cellsformat :'d2',
				columntype : 'numberinput',
	        	createeditor : function(row, cellvalue, editor) {
						editor.jqxNumberInput({
							spinButtons : false,
							decimalDigits : 2
						});
					},
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					var stoneCost = $('#jqxgrid').jqxGrid('getcellvalue', row, 'stoneCost');
					var totalSellingCharges = $('#jqxgrid').jqxGrid('getcellvalue', row, 'totalSellingCharges');
					console.log(totalSellingCharges);
					if(newvalue == "" || newvalue == null){
				 		$.growl.error({
				 			message : "Total Cost Charges is Mandatory",
				 			duration : 10000,
				 			title : 'Error'
				 		});
				 		return "";
				 	}
						if(parseFloat(newvalue) < parseFloat(stoneCost)){
							$.growl.error({ 
								message : "Total Cost Charges should not be less Than Stone Cost !!!",
								duration : 10000,
								title : 'Error'
							});
							return "";
						}
				},
			},
			{'text' : 'Total Selling Charges','datafield' :'totalSellingCharges','cellsalign' : 'right','align' : 'center',sortable : true,'width' : '7%',cellsformat :'d2',
				columntype : 'numberinput',
	        	createeditor : function(row, cellvalue, editor) {
						editor.jqxNumberInput({
							spinButtons : false,
							decimalDigits : 2
						});
					},
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					if(newvalue == "" || newvalue == null){
				 		$.growl.error({
				 			message : "Total Selling Charges is Mandatory",
				 			duration : 10000,
				 			title : 'Error'
				 		});
				 		return "";
				 	}
					
					var totalCostCharges = $('#jqxgrid').jqxGrid('getcellvalue', row, 'totalCostCharges');
						if(parseFloat(newvalue) < parseFloat(totalCostCharges)){
							$.growl.error({
								message : "Total Selling Charges should not be less Than total Cost Charges !!!",
								duration : 10000,
								title : 'Error'
							});
							return "";
						}
						
				},
			},
			{'text'  :'SID','datafield':  'sid','width' : '8%',cellsalign : 'center',align:'center',editable : false,hidden : true},
			{'text'  :'JID','datafield':  'jid','width' : '8%',cellsalign : 'center',align:'center',editable : false,hidden : true},
			{'text'  :'So Id','datafield':  'soiId','width' : '8%',cellsalign : 'center',align:'center',editable : false,hidden : true},
			{'text'  :'JW ID','datafield':  'jwId','width' : '8%',cellsalign : 'center',align:'center',editable : false,hidden : true},
			
		]
	});
}

$("#footerHide").hide();
$("#addHide").hide();

var rowId = 0;
var generaterow = function(i) {
	var row = {};	
	row["sopNo"] = $("#sopNoS").val();
	row["jwCodes"] = $("#vendorS option:selected").attr('idE'),
	row["jwId"] = $("#vendorS").val(),
	row["slNo"] = ""
	row["storeOrDc"] = ""	
	row["segment"] = ""	
	row["jewelType"] = ""	
	row["repairDesc"] = ""
	row["pcs"] = ""
	row["grsWt"] = ""	
	row["netWt"] =	""
	row["stoneName"] = "" 	
	row["stoneWt"] = ""	
	row["uom"] = ""
	row["stoneCost"] = "" 
	row["totalCostCharges"] = ""	
	row["totalSellingCharges"] = ""
	rowId = rowId + 1;
	return row;
}

$('#search').on('click', function(){
	var vendCode = $("#vendorS").val();
	var sopNo = $("#sopNoS").val();
	
	if(vendCode == "" && sopNo == ""){
		$.growl.error({
			message : "Please Select atleast one Field",
			durtion : 1000,
			title : 'Error'
		});
		return false;
	}else{
		soGrGrid();
		$("#jqxgrid").show();
		$("#addHide").show();
		$("#footerHide").show();
	}
	
	var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
	if (rowscount == 0) {
		var rowId = 1;
	} 
	else {
		var rowId = rowscount + 1;
		var rows = $('#jqxgrid').jqxGrid('getrows');
		for (var i = 0; i < rowscount; i++) {
			 var row = rows[i];
			var sopNo = row.sopNo;
			var slNo = row.slNo;
			var tCp = row.totalCostCharges;
			var tSp = row.totalSellingCharges;
		if (sopNo == "" ||  sopNo == null) {
			$.growl.error({
				message : "Please Enter SOP No !!",
				duration : 20000,
				title : 'Error'
			});
			return false;
		}
		if (slNo == "" ||  slNo == null) {
			$.growl.error({
				message : "Please Enter Sl No !!",
				duration : 20000,
				title : 'Error'
			});
			return false;
		}
		if (tCp == "" || tCp == null ) {
			$.growl.error({
				message : "Please Enter Total Cost Charges !!",
				duration : 20000,
				title : 'Error'
			});
			return false;
		}
		if (tSp == "" || tSp == null ) {
			$.growl.error({
				message : "Please Enter Total Selling Charges !!",
				duration : 20000,
				title : 'Error'
			});
			return false;
		}
	}
 }
	$("#jqxgrid").jqxGrid('addrow', null, generaterow(rowId + 1));
	
});

var validateSoGr = function() {
	var soGrLines = [];
	var rows = $('#jqxgrid').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		soGrLines.push({
		"serialNumber" : row.slNo,
		"pieces" : row.pcs,
		"grossWeight" : row.grsWt,
		"netWeight" : row.netWt,
		"stoneName" :row.stoneName,
		"stoneWeight" : row.stoneWt,
		"uomType" : row.uom,
		"stoneCost" :row.stoneCost,
		"totalCost" :row.totalCostCharges,
		"totalSellingCharges": row.totalSellingCharges,
		"vendor" : {
			"id" : ($("#vendorS").val() == "") ? row.jwCode : parseInt(row.jwId)
		},
		 "smallOrderItemDTO": {
		        "soiId": row.soiId
		    }
	 });
   }
  return soGrLines;
}

var storeId ;
$("#saveGr").on('click',function(){
	var gridDet = validateSoGr();
	var row = $('#jqxgrid').jqxGrid('getrows');
	 for (var i = 0; i < row.length; i++) { 
		 console.log(row);
	  storeId =  row[i].storeOrDc;
	  vendorId = ($("#vendorS").val() == "") ? row[i].jwCode : parseInt(row[i].jwId)
	 }
	var soGrDetails =
	  {
		 "grStoreOrDcId": storeId,
		 "grAtStoreOrDC": "DC",
		 "vendor" : null,
		 "smallOrderGRDetailList":gridDet,
	  }
		var rows = soGrDetails.smallOrderGRDetailList;
		 for (var i = 0; i < rows.length; i++){
			 var row = rows[i];
			 var uom = row.uomType;
			 var grossWeight = row.grossWeight;
			 var netWeight = row.netWeight;
			 var slNo = row.serialNumber;
			 var stoneCost = row.stoneCost;
			 var stoneWeight = row.stoneWeight;
			 var totalCc = row.totalCost;
			 var stName = row.stoneName;
			 var totalSc = row.totalSellingCharges;
			 if(slNo == "" || slNo == null){
				 $.growl.error({
					 message : "Please Select Sl No !!!",
					 duration : 10000,
					 title : 'Error'
				 });
				 return false;
			 }
			 if((parseFloat(grossWeight) - parseFloat(netWeight))> 0){
					if(stName == "" || stName == null){
						$.growl.error({
							 message : "Stone Name is Mandatory",
							 duration : 10000,
							 title : 'Error'
						  });
						return false;
					}
					else if(stoneWeight == "" || stoneWeight == null){
						$.growl.error({
							 message : "Stone Wt is Mandatory",
							 duration : 10000,
							 title : 'Error'
						  });
					  return false;
					}
					if(stoneCost == "" || stoneCost == null ){
						 $.growl.error({
							 message : "Stone Cost is Mandatory",
							 duration : 10000,
							 title : 'Error'
						  });
					  return false;
					}
					 if(uom == "" || uom == null){
						 $.growl.error({
							 message : "Please Select UOM !!!",
							 duration : 10000,
							 title : 'Error'
						 });
						 return false;
					 }
			}
			
			 if(totalCc == "" || totalCc == null){
				 $.growl.error({
					 message : "Please Enter Total Cost Charges !!!",
					 duration : 10000,
					 title : 'Error'
				 });
				 return false;
			 }
			 if(totalSc == "" || totalSc == null){
				 $.growl.error({
					 message : "Please Enter Total Selling Charges !!!",
					 duration : 10000,
					 title : 'Error'
				 });
				 return false;
			 }
			 if(stoneCost > totalCc){
				 $.growl.error({
					 message : "Stone Cost Should not be Greater Than Total Cost Charges",
					 duration : 20000,
					 title : 'Error'
				  });
			  return false;
			 }
			  
			 if(parseFloat(totalCc) > parseFloat(totalSc)){
				 $.growl.error({
					 message : "Total Cost Charges Should not be More Than Total Selling Charges !!!",
					 duration : 10000,
					 title : 'Error'
				 });
				 return false;
			 }
		}
	postJSON('/OrderExecution/api/v1/smallOrderGRSaveFromOE',JSON.stringify(soGrDetails),function(data) {
		if (data.resCode == "1") {		
		$.growl.notice({
			message : data.mesgStr,
			duration : 10000,
			title : 'Success'
		});
		window.location.href="javascript:showContentPage('soGR','bodySwitcher')";
		} else {
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
		  }
	  });
});

$("#addLineItem").on('click',function(){
	var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
	if (rowscount == 0) {
		var rowId = 1;
	} 
	else {
		var rowId = rowscount + 1;
		var rows = $('#jqxgrid').jqxGrid('getrows');
		
		for (var i = 0; i < rowscount; i++) {
			 var row = rows[i];
			var sopNo = row.sopNo;
			var slNo = row.slNo;
			var tCp = row.totalCostCharges;
			var tSp = row.totalSellingCharges;
		if (sopNo == "" ||  sopNo == null) {
			$.growl.error({
				message : "Please Enter SOP No !!",
				duration : 20000,
				title : 'Error'
			});
			return false;
		}
		if (slNo == "" ||  slNo == null) {
			$.growl.error({
				message : "Please Enter Sl No !!",
				duration : 20000,
				title : 'Error'
			});
			return false;
		}
		if (tCp == "" || tCp == null ) {
			$.growl.error({
				message : "Please Enter Total Cost Charges !!",
				duration : 20000,
				title : 'Error'
			});
			return false;
		}
		if (tSp == "" || tSp == null ) {
			$.growl.error({
				message : "Please Enter Total Selling Charges !!",
				duration : 20000,
				title : 'Error'
			});
			return false;
		}
		
	}
 }
	$("#jqxgrid").jqxGrid('addrow', null, generaterow(rowId + 1));
});

$("#clearAll").on('click', function() {
	window.location.href="javascript:showContentPage('soGR','bodySwitcher')";
});

$.validator.addMethod(
        "regx",
        function(value, element, regexp) {
            if (regexp.constructor != RegExp)
                regexp = new RegExp(regexp);
            else if (regexp.global)
                regexp.lastIndex = 0;
            return this.optional(element) || regexp.test(value);
        },
        ""
);