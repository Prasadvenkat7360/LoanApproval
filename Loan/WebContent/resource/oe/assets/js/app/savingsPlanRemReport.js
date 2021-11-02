var onLoadLOV = function(){
	$.getJSON('/OrderExecution/api/v1/getFollowUpSavingsPlanOnDueDateReportLOV ',function(response) {
		if(response.resCode == "1"){
			var l = '<select id="schemeTypeSObj"  name="schemeTypeSObj" class="form-control" multiple="multiple">';
			$.each(response.payload.schemeNames, function(key, val) {
				l += '<option value="' + val + '">' + val + '</option>'; 
			});
				
			l += '</select>';
				
			$("#schemeTypeS").html(l);
				
			$("#schemeTypeSObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
			});
			
		}else{
			$.growl.error({
				message : response.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
}

onLoadLOV();

$("#custName").on('blur',function(){
	var val = $("#custName").val();
	if(val != ""){
		if (/^[a-zA-Z ]{2,30}$/.test(val)) {
			
		} else {
			$("#custName").val("");	
			$.growl.error({
				message : "Please Enter Valid Customer Name !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	}
	
});

$("#mobNumb").on('blur',function(){
	var val = $("#mobNumb").val();
	if(val != ""){
		if (/^\d{10}$/.test(val)) {
			
		} else {
			$("#mobNumb").val("");	
			$.growl.error({
				message : "Please Enter Valid Phone Number !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	}
	
});

//Field Filters
var searchFieldFilters = function() {
	
	var custName = $('#custName').val();
	var mobNumb = $('#mobNumb').val();
	var dueDateType = $("#dueDateType").val();

	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (custName != "" && custName != null) {
		fieldFilters.fieldFilters["customerFullName"] = custName;
	}
	
	if (mobNumb != "" && mobNumb != null) {
		fieldFilters.fieldFilters["customerContactNumber"] = mobNumb;
	}
	
	var schemeTypeObj = $('#schemeTypeSObj').val();
	if (schemeTypeObj == null || schemeTypeObj == "") {
		var schemeType = "";
	} else {
		var schemeType = schemeTypeObj.join(",");
	}
	if (schemeType != "" && schemeType != null) {
		fieldFilters.fieldFilters["schemeName"] = schemeType;
	}
	
	return fieldFilters;
}

var searchGrid = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'createdStoreName','type' : 'string','map':'storeName'},
			{'name' : 'createdDate','type' : 'string','map' : 'createdDate'},
			{'name' : 'schemeName','type' : 'string','map':'schemeName'}, 
			{'name' : 'spNumb','type' : 'int','map' : 'savingsPlanNumber'},
			{'name' : 'custName','type' : 'string','map' : 'customerName'},
			{'name' : 'phnNumb','type' : 'long','map' : 'mobileNo1'},
			{'name' : 'mobileNo2','type' : 'long'},
			{'name' : 'mobileNo3','type' : 'long'},

			{'name' : 'noOfInst','type' : 'int','map' : 'noOfInstallments'},
			{'name' : 'month','type' : 'string','map' : 'month'},
			{'name' : 'instNo','type' : 'int','map':'installmentNo'},
			{'name' : 'instAmt','type' : 'float','map':'installmentAmount'},
			{'name' : 'schmeDuration','type' : 'int','map':'schmeDuration'}, 
			{'name' : 'installmentDueDate','type' : 'string','map':'installmentDueDate'}, 

		]};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		theme: 'energyblue',
		editable : true,
		columnsheight : 85,
		autoheight : true,
		sortable:true,
		altRows : true,
		columnsresize : true,
		pageable : true,
		//showtoolbar : true,
		columns : [

			{'text' : '','datafield' : 'mobileNo2','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},
			{'text' : '','datafield' : 'mobileNo3','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},
			{'text' : 'Created Store Name','datafield' : 'createdStoreName','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Created Date','datafield' : 'createdDate','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 
			{'text' : 'Scheme Name','datafield' : 'schemeName','width' : '12%',cellsalign : 'left',align : 'center',sortable : false,editable : false},
			{'text' : 'Savings Plan Number','datafield' : 'spNumb','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Customer Name','datafield' : 'custName','width' : '12%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'Customer Phone Number','datafield' : 'phnNumb','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
					var mobileTwo =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'mobileNo2');
					var mobileThree =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'mobileNo3');

					var contactNo = value; 
					if(mobileTwo != undefined && mobileTwo != null){
						contactNo = contactNo + " " + mobileTwo + ",";
					}
					if(mobileThree != undefined && mobileThree != null){
						contactNo = contactNo + " " + mobileThree + ","; 
					}
					else{
						 contactNo = contactNo ; 
					}
					
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">'+ contactNo +'</div>';

	    		 }
			},
			{'text' : 'Scheme Duration','datafield' : 'schmeDuration','width' : '8%',cellsalign : 'center',align : 'center',sortable : false,editable : false},

			{'text' : 'No of Installment Pending','datafield' : 'noOfInst','width' : '10%',cellsalign : 'center',align : 'center',sortable :false,editable : false},
			{'text' : 'Due Date for Pending Installment','datafield' : 'installmentDueDate','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false}, 

			{'text' : 'Month','datafield' : 'month','width' : '8%',cellsalign : 'center',align : 'center',sortable :false,editable : false,
				cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='color:red; margin-top:6px;'>" +value+ "</div>";
		      	} 
			},
			{'text' : 'Installment No','datafield' : 'instNo','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,editable : false,
				cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='color:red; margin-top:6px;'>" +value+ "</div>";
		      	}
			},
			{'text' : 'Installment Amount','datafield' : 'instAmt','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat:'d2',
				cellsrenderer: function(row, column, value){
		      		return "<div align='center'style='color:red; margin-top:6px;'>" +parseFloat(value).toFixed(2)+ "</div>";
		      	} 	 
			},
		]
	});
}

$("#search").on('click',function(){
	if($('#schemeTypeSObj').val() == "" || $('#schemeTypeSObj').val() == null || $("#dueDateType").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 1000,
			title  : 'Error'
		});
		return false;
	}else{
		postJSON('/OrderExecution/api/v1/getFollowUpSavingsPlanOnDueDateReport?dueMode='+$("#dueDateType").val()+'&mode=Export',JSON.stringify(searchFieldFilters()),function(response) {
			if(response.resCode == 1){
				searchGrid(response.payload.list);
				$("#jqxgrid").show();
			}else{
				searchGrid();
				$("#jqxgrid").show();
				$.growl.error({
					message : response.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});


//Export function 	
$("#export").on("click",function() {
	var data;
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
			postJSON('/OrderExecution/api/v1/getFollowUpSavingsPlanOnDueDateReport?dueMode='+$("#dueDateType").val()+'&mode=Export',JSON.stringify(searchFieldFilters()),function(response) {
		   if(response != null){
         data = response.payload.list;
         for (i = 0; i < data.length; i++) {
      	 
			newData.push({
				'Created Store Name' : (data[i].storeName != null) ? data[i].storeName : "",
				'Created Date' : (data[i].createdDate!= null) ? data[i].createdDate  : "",
				'Scheme Name' : (data[i].schemeName != null) ? data[i].schemeName : "",
				'Saving Plan No' : (data[i].savingsPlanNumber != null) ? data[i].savingsPlanNumber : "",
				'Customer Name' : (data[i].customerName != null) ? data[i].customerName : "",
				'Customer Phone Number' : (data[i].mobileNo1 != null) ? data[i].mobileNo1	: "",
				'Scheme Duration' : (data[i].schmeDuration != null) ? data[i].schmeDuration : "",
				'No of Installment Pending' : (data[i].noOfInstallments != null) ? data[i].noOfInstallments : "",
				'Due Date for Pending Installment' : (data[i].installmentDueDate != null) ? data[i].installmentDueDate : "",
				'Month' : (data[i].month != null) ? data[i].month : "",
            	'Installment No' : (data[i].installmentNo != null) ? data[i].installmentNo : "",
            	'Installment Amount' : (data[i].installmentAmount != null) ? data[i].installmentAmount.toFixed(2) : "",
             });
					
         }
         var opts = [{sheetid:'Savings_Plan_Reminder_Report',header:true}];
         var res = alasql('SELECT * INTO XLSX("Savings_Plan_Reminder_Report_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newData]]);
      }
  });
	   }else{
			  $.growl.error({
				message : "No Data to Export.",
				duration : 10000
			});
				return false;	
			}
		}
});


$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('savingsPlanRemReport', 'bodySwitcher')"
});