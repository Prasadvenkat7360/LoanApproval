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
	maxDate : 0,
	dateFormat: "dd/mm/yy",
});

var d = new Date();
var cDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();	

//Onload LOV Function
var onloadLov = function(){
	$.getJSON('/OrderExecution/api/v1/getSegmentTypesLOV?portal=OE', function(data) {
		$('#segS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.sTypes, function(key, val) {
				$('#segS').append('<option value="' + val.id + '">' + val.description + '</option>');
		 });
	});
	$.getJSON('/OrderExecution/api/v1/getVendorCode?portal=OE', function(data) {
		$('#vendorS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.vendorList, function(key, val) {
				$('#vendorS').append('<option value="' + val.id + '">' + val.vendorCode + '</option>');
		 });
	});
} 
onloadLov();

//field Filters
var soReleaseFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var sopNoS = $("#sopNoS").val();
	var vendorS = $("#vendorS").val();
	var segS = $("#segS").val();
    
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["SOPFromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["SOPToDate"] = toDateS;
	}
	if (sopNoS != "" && sopNoS != null) {
		fieldFilters.fieldFilters["id"] = sopNoS;
	}
	if (vendorS != "" && vendorS != null) {
		fieldFilters.fieldFilters["vendor"] = vendorS;
	}
	if (segS != "" && segS != null) {
		fieldFilters.fieldFilters["segment"] = segS;
	}
	return fieldFilters;
}


$("#save").hide();
//################################# Grid Started ########################################
var soReleaseGrid = function(res) {
	var source = {
		datafields : [ 
			{'name' : 'storeCode','type' : 'string','map' : 'storeId'}, 
			{'name' : 'sopNo','type' : 'int','map' : 'smallOrderId'},
			{'name' : 'sopId','type' : 'int','map' : 'soiId'},
			{'name' : 'sopSlNo','type' : 'int','map' :  'serialNumber'},
			{'name' : 'raisedBy','type' : 'string','map'  : 'raisedBy'},
			{'name' : 'segment','type' : 'string','map':'segment>description'},
			{'name' : 'jewelType','type' : 'string','map' :'jewelType>description'},
			{'name' : 'repairDesc','type' : 'string','map' : 'description'}, 
			{'name' : 'pcs','type' : 'int','map' : 'pieces'},
			{'name' : 'grsWt','type' : 'float','map' : 'grossWeight'},
			{'name' : 'netWt','type' : 'float','map' : 'netWeight'},
			{'name' : 'sopDate','type' : 'date','map' : 'sopCreatedDate'},
			{'name' : 'dueDate','type' : 'date','map' :'sopDueDate'},
			{'name' : 'vendDueDate','type' : 'date','map':'vendorDueDate'},
			{'name' : 'assignVendor','type' : 'long','map' :'vendor>vendorCode'},
			{'name' : 'assignVend','type' : 'long','map' :'vendor>id'},
			{'name' : 'checkBox','type' : 'bool'}],
		localdata : res,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		height : 200,
		theme: 'energyblue',
		columnsheight : 50,
		pageable : true,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp;Small Order Release Items');			
		},
		columns : [ 
			{'text'  :'Store Code','datafield': 'storeCode','width' : '6%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'SOP No','datafield':  'sopNo','width' : '4%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'SOP Id','datafield':  'sopId','width' : '4%',cellsalign : 'center',align:'center',editable : false,hidden : true},
			{'text'  :'SOP Sl No','datafield':  'sopSlNo','width' : '4%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Raised By','datafield':  'raisedBy','width' : '9%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Segment','datafield' : 'segment','width'  :'6%',sortable  :false,cellsalign : 'center',align:'center',editable:  false},
			{'text'  :'Jewel Type','datafield':  'jewelType','width' : '8%',cellsalign : 'center',align:'center',editable : false,},
			{'text'  :'Repair Desc','datafield' : 'repairDesc','width'  :'10%',sortable  :false,cellsalign : 'center',align:'center',editable:true},
			{'text'  :'Pcs','datafield':  'pcs','width' : '3%',cellsalign : 'center',align:'center',editable : false},
			{'text'  :'Gross Wt.','datafield' : 'grsWt','width'  :'6%',sortable  :false,cellsalign : 'right',align:'center',editable:  false,cellsformat :'d3'},
			{'text'  :'Net Wt','datafield':  'netWt','width' : '5%',cellsalign : 'right',align:'center',editable : false,cellsformat :'d3'},
			{'text'  :'SOP Date','datafield':  'sopDate','width' : '8%',cellsalign : 'center',align:'center',editable : false,cellsformat : 'dd/MM/yyyy',},
			{'text'  :'Due Date','datafield' : 'dueDate','width'  :'8%',sortable  :false,cellsalign : 'center',align:'center',editable:  false,cellsformat : 'dd/MM/yyyy',},
			{'text'  :'Vendor Due Date','datafield':  'vendDueDate','width' : '8%',cellsalign : 'center',align:'center',editable: true,columntype: 'datetimeinput',cellsformat : 'dd/MM/yyyy',
				cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
					var date1 = new Date(newvalue);
					var dd = date1.getDate();
					var mm = date1.getMonth() + 1;
					var yy = date1.getFullYear();
					var vendorDate = dd + "/" + mm + "/" + yy;
					if(vendorDate < cDate ){
				 		$.growl.error({
				 			message : "Vendor Due Date should not be Less than Current Date!!!!",
				 			duration : 10000,
				 			title : 'Error'
				 		});
				 		return "";
				 	}
				},
			},
			{'text'  :'Assign Vendor','datafield':  'assignVend','width' : '8%',cellsalign : 'center',align:'center',editable : true,columntype :'dropdownlist',displayfield : 'assignVendor',
				createeditor : function(row, value, editor) {
					editor.on('click', function(event){						
							$.getJSON('/OrderExecution/api/v1/getVendorCode?portal=OE', function(data) {
								var resp = data.payload.vendorList ;
								var vendArry = [];
								$.each(resp, function(k, v){
									vendArry.push({
										"id" : v.id,
										"name" : v.vendorCode
									})
								});
								editor.jqxDropDownList({ source: vendArry , displayMember: 'name', valueMember: 'id'});
							});
						
					});
				}
			},
			{'text' : 'Release Y/N','datafield' :'checkBox','cellsalign' : 'center','align' : 'center',sortable : false,editable : true,'width' : '7%',columntype : 'checkbox',
				cellbeginedit : function (row, datafield, columntype) {
					var rows = $("#jqxgrid").jqxGrid('getrows');
					for(var i=0; i<rows.length; i++){
						if(row == rows[i].boundindex){
					var selectionStatus =  $('#jqxgrid').jqxGrid('getcellvalue', row, 'selectionStatus');
					
					if(datafield == "selectionStatus" &&  selectionStatus == false){		
						return true;
					}else{
				    	return true;
				    }
				}}
				},
			}
		]
	});
}

//################### search functionality ######################################
$("#soReleaseForm").validate(
  {
 	errorElement : 'label',
 	errorClass : 'help-inline',
 	focusInvalid : false,
 	ignore : "",
 	rules: {"sopNoS": {digits: true}},
    messages: {"sopNoS":{digits : "Please Enter Only Numbers!"}},
    errorPlacement : function(error, element) {
       	if(element.context.name == ""){
			error.insertAfter(element.parent());
		}else{
			error.insertAfter(element);
		}
	},
    submitHandler : function(form) {	
    	$("#save").show();
    	var fieldFilters = soReleaseFieldFilters();
    	 postJSON('/OrderExecution/api/v1/smallOrderRelease?portal=OE',JSON.stringify(fieldFilters),function(data) {
    		 var res = data.payload.SOPList;
    		 	soReleaseGrid(res);
    	    	$("#jqxgrid").show();
    	 });
    	
    }
});

//############################ Create Small Order GR #################################
var saveSODet = function(data) {
	var rows = $('#jqxgrid').jqxGrid('getrows');
	if(data.length == 0){
		$.growl.error({
			message : "Please select atleast one row.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		/*for (var i = 0; i < data.length; i++) {		
			if(data[i].vendor.id == "" || data[i].vendor.id == null){
				$.growl.error({
					message : "Please Select the Vendor",
					duration : 10000
				});
				return false;			
		    }  
			
		}*/
		return true;
	  }
}

$("#save").on("click",function(){
	var soRelArray = [];
	var rows = $('#jqxgrid').jqxGrid('getrows');
	
	if(typeof rows != "undefined"){	
		for (var i = 0; i < rows.length; i++) { 
		var selectionStatus =  $('#jqxgrid').jqxGrid('getcellvalue', i, 'checkBox');
		var  vDate =  rows[i].vendDueDate;
		
		var date1 = new Date(vDate);
		var dd = date1.getDate();
		var mm = date1.getMonth() + 1;
		var yy = date1.getFullYear();
		var venDate = dd + "/" + mm + "/" + yy;
		if(selectionStatus == true){
			var soRelDetails =
				  {
					 "soiId": rows[i].sopId,
					 "description": rows[i].repairDesc,
					 "vendor": {
					      "id": rows[i].assignVend,
					      "vendorCode": rows[i].assignVendor,
					    },
					    "vendorDueDate": venDate,
					    "isReleased": 1
				  }
					soRelArray.push(soRelDetails);
					checkVal = true;
		        }
		      }
	        }	 
if (saveSODet(soRelArray)) {
	var smallOrderDet ={
			"orderItems" : soRelArray
	}
	postJSON('/OrderExecution/api/v1/updateSOPReleaseById?portal=OE',JSON.stringify(smallOrderDet),function(data) {
		if (data.resCode == "1") {										
		$.growl.notice({
			message : data.mesgStr,
			duration : 10000,
			title : 'Success'
		});
		window.location.href="javascript:showContentPage('soRelease','bodySwitcher')";
		} else {
			$.growl.error({
				message : data.mesgStr,
				duration : 10000
			});
		  }
	   });
	}
})

$("#clearAll").on('click', function() {
	window.location.href="javascript:showContentPage('soRelease','bodySwitcher')";
});