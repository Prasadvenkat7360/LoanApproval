// date picker functions
$("#fromdateLS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#todateLS").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#todateLS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate : 0,
	minDate : 0
});

$("#fromdateC").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	//maxDate : 0,
	minDate : 0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateC").datepicker('option', 'minDate', min || '0');
    }
});

var updates = new Object();
$("#todateC").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	//maxDate : 0,
	minDate : 0
});

$('#timepicker1').timepicker({
    showInputs: true,
    stepping : true,
    defaultTime : false
  });
 
 $('#timepicker2').timepicker({
    showInputs: true,
    stepping : true,
    defaultTime : false
});
 
 $("#timepicker1").on('focus',function(){
	 addIcons();
 });
 
 $("#timepicker2").on('focus',function(){
	 addIcons();
 });

 var addIcons = function(){
	 $("table tr:first td:first a:first i:first").addClass('fa fa-chevron-circle-up').css('color', '#0065A0');
	 $("table tr:first td:nth-child(3) a:first i:first").addClass('fa fa-chevron-circle-up').css('color', '#0065A0');
	 $("table tr:first td:nth-child(5) a:first i:first").addClass('fa fa-chevron-circle-up').css('color', '#0065A0');
	 
	 $("table tr:nth-child(3) td:first a:first i:first").addClass('fa fa-chevron-circle-down').css('color', '#0065A0');
	 $("table tr:nth-child(3) td:nth-child(3) a:first i:first").addClass('fa fa-chevron-circle-down').css('color', '#0065A0');
	 $("table tr:nth-child(3) td:nth-child(5) a:first i:first").addClass('fa fa-chevron-circle-down').css('color', '#0065A0');
 }
 
 $("#dayC").hide();

 $("#benefitTypeC").on('change',function(){
	 var benefitTypeC = $("#benefitTypeC").val();
	 var bType = benefitTypeC.charAt(0);
	 
	 if(bType == "H"){
		 $("#dayC").show();
		 $("#timepicker1").prop('disabled',false);
		 $("#timepicker2").prop('disabled',false);
		 $("#pointTypeC").prop('disabled',true);
		 
		 $("#fromValueC").prop('disabled',true);
		 $("#toValueC").prop('disabled',true);
		 $("#valueDiffC").prop('disabled',true);
		 
		 $("#dayH").show();
		 $("#fTimeH").show();
		 $("#tTimeH").show();
		 
		 $("#fValH").hide();
		 $("#tValH").hide();
		 $("#diffValH").hide();
		 $("#pointTypeH").hide();
		 
	 }else{
		 $("#fromValueC").prop('disabled',false);
		 $("#toValueC").prop('disabled',false);
		 $("#pointTypeC").prop('disabled',false);
		 
		 $("#dayC").hide();
		 $("#timepicker1").prop('disabled',true);
		 $("#timepicker2").prop('disabled',true);
		 $("#valueDiffC").prop('disabled',false);
		 
		 $("#dayH").hide();
		 $("#fTimeH").hide();
		 $("#tTimeH").hide();
		 
		 $("#fValH").show();
		 $("#tValH").show();
		 $("#diffValH").show();
		 $("#pointTypeH").show();
	 }
	 $.getJSON('/OrderExecution/api/v1/createLoyaltyPointsLOV?benefitType='+bType, function(data) {
		 if(bType == "H"){
			var daysList = data.payload.Days;
			$('#pointTypeC').append('<option selected value="' + data.payload.PointTypes + '">' + data.payload.PointTypes + '</option>');
			
			var d = '<select id="daysCObj"  name="daysCObj" class="form-control" multiple="multiple">';
			$.each(daysList, function(key, val) {
				d += '<option value="' + val + '">' + val + '</option>';
			});
			
			d += '</select>';
			
			$("#daysC").html(d);
			
			$("#daysCObj").multiselect({
			includeSelectAllOption : true,
			maxHeight : 250,
			enableFiltering : true,
			numberDisplayed : 1,
			buttonClass : 'col-md-12 form-control text-left'
		});
	}else{
		 $('#pointTypeC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.PointTypes, function(key, val) {
			$('#pointTypeC').append('<option value="' + val + '">' + val + '</option>');
		});
	 }
		
	 });
 });
 
 $('#addLp').on('click', function(){
 	var rows = $("#jqxgridC").jqxGrid('getrows');
 	
 	var benefitTypeC = $("#benefitTypeC").val();
 	var tierNamelPC = $("#tierNamelPC").val();
 	var fromdateC = $("#fromdateC").val();
 	var todateC = $("#todateC").val();
 	var fromTime = $("#timepicker1").val();
 	var toTime = $("#timepicker2").val();
 	
 	var fromValueC = $("#fromValueC").val();
 	var toValueC = $("#toValueC").val();
 	var valueDiffC = $("#valueDiffC").val();
 	var pointTypeC = $("#pointTypeC").val();
 	
 	$("#addLp").prop('disabled',false);
 
 	if(benefitTypeC == null || benefitTypeC == ""){
 		$.growl.error({
 			message : "please Select Benefit Type !!",
 			duration : 10000,
 			title : 'Error'
 		});
 		return false;
 	}
 	if(fromdateC == null || fromdateC == "" || todateC == null || todateC == ""){
 		$.growl.error({
 			message : "please Select From and To Date !!",
 			duration : 10000,
 			title : 'Error'
 		});
 		return false;
 	}
 	if(benefitTypeC !=""){
 		if(benefitTypeC == "HAPPY HOURS"){
 			if(fromTime == "" || toTime == ""){
 				$.growl.error({
 					message : "Please Fill Mandatory Fields !!!",
 					duration : 10000,
 					title : 'Error'
 				});
 				return false;
 			}else{
 				addDetailsFunc();
 			}
 		}else{
 			if(fromValueC == "" || toValueC == "" || valueDiffC == "" || pointTypeC == ""){
 				$.growl.error({
 					message : "Please Fill Mandatory Fields !!!",
 					duration : 10000,
 					title : 'Error'
 				});
 				return false;
 			}else{
 				addDetailsFunc();
 			}
 		}
 	}
 });

 var addDetailsFunc = function(){
 	 $("#addLp").prop('disabled',true);
	 $("#createLp").show();
	 $("#benefitTypeC").prop('disabled',true);
	 $("#tierNamelPC").prop('disabled',true);
	 
   	 $('#fromdateC').attr("disabled",true);
 	 $('#todateC').attr("disabled",true);
	 $('#fromdateC').removeClass('dateBackground');
	 $('#todateC').removeClass('dateBackground');
	 $("#daysCObj").multiselect("disable");
	 $("#valueDiffC").prop('disabled',true);
	
	 $("#pointTypeC").prop('disabled',true);
	 $("#timepicker1").prop('disabled',true);
	 $("#timepicker2").prop('disabled',true);
	 $("#fromValueC").prop('disabled',true);
	 $("#toValueC").prop('disabled',true);
	 
	 var daysCObj = $("#daysCObj").val();
		if(daysCObj == null || daysCObj == ""){
			var days = "";
		} else{
			var days = daysCObj.join(",");
		}
	 
	var params = { "fieldFilters": {
		    "benefitType": $("#benefitTypeC").val(),
		    "fromDate":$('#fromdateC').val(),
		    "toDate":$('#todateC').val(),
		    "tierNo": $("#tierNamelPC option:selected").attr('idE'),
		    "fromTime":$("#timepicker1").val(),
		    "toTime":$("#timepicker2").val(),
		    "days":(daysCObj != null)? days : "",
		    "pointType":$("#pointTypeC").val(),
		    "fromValue":$("#fromValueC").val(),
			"toValue":$("#toValueC").val(),
			"valueDifference":$("#valueDiffC").val(),
		  }
	}
	
	 var benefitTypeC = $("#benefitTypeC").val();
	 var bType = benefitTypeC.charAt(0);
	 
	if(bType == "H"){
		delete params.fieldFilters.fromValue;
		delete params.fieldFilters.toValue;
		delete params.fieldFilters.valueDifference;
	}else{
		delete params.fieldFilters.fromTime;
		delete params.fieldFilters.toTime;
		delete params.fieldFilters.days;
	}

	 postJSON('/OrderExecution/api/v1/addLoyaltyPoints',JSON.stringify(params),function(response) {
		if(response.resCode == 1){
			var count = 1;
			var result = response.payload.LoyaltyPointtDetails;
			
			$.each(result,function(k,v){
				v.sln = count;
				count++ ;
			});
			loyaltyPointCreateGrid(result);
		}else{
			$.growl.error({
				message : response.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
 }
//################# create grid for segment ##################
 
 var loyaltyPointMasterSearch = function(data){
		var source = {
	        localdata: data,
	        datatype: "json",
			datafields : [ 

				{'name' : 'slNo','type' : 'long','map' : ''},
				{'name' : 'id','type' : 'long','map' : 'id'},
				{'name' : 'benefitType','type' : 'string','map' : 'BenefitType'}, 
				{'name' : 'tierName','type' : 'string','map' : 'tierName'},
				{'name' : 'createdDate','type' : 'date','map' : 'CreatedDate'},
				{'name' : 'days','type' : 'long','map' : 'Day'},
				{'name' : 'fromTime','type' : 'date','map':'fromTime'}, 
				{'name' : 'toTime','type' : 'date','map':'toTime'}, 
				{'name' : 'fromVal','type' : 'string','map' : 'fromValue'}, 
				{'name' : 'toVal','type' : 'long','map' : 'toValue'},
				{'name' : 'percPoint','type' : 'string','map' : 'percPoint'}, 
				{'name' : 'flatPoint','type' : 'long','map' : 'flatPoint'},
				{'name' : 'editFlag','type' : 'string'},
				{'name' : 'status','type' : 'string'},
				{'name' : 'pointType','type' : 'string'},
				{'name' : 'detailId','type' : 'long'},
				{'name' : 'daysFlag','type' : 'string'},
				{'name' : 'fromDate','type' : 'string'},
				{'name' : 'toDate','type' : 'string'},

			]};
		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#jqxgridLP").jqxGrid({
			source : dataAdapter,
			width : '100%',
			theme: 'energyblue',
		    editable: true,
			columnsheight : 85,
			autoheight : true,
			sortable:true,
			altRows : true,
			columnsresize : true,
	 	    statusbarheight: 30,
	 	    pageable:true,
			columns : [
				{'text' : 'Sl No','datafield' : 'slNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',hidden:true},
				{'text' : 'Id','datafield' : 'id','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',editable:false,cellsrenderer : editViewLp},
				{'text' : 'Benefit Type','datafield' : 'benefitType','width' : '13%',editable : false,sortable : false,cellsalign : 'center',align : 'center',editable:false,cellsrenderer : editViewLp},
				{'text' : 'Tier Name','datafield' : 'tierName','width' : '12%',sortable : false,cellsalign : 'center',align : 'center',   editable: false,cellsrenderer : editViewLp},
				{'text' : 'Created Date','datafield' : 'createdDate','width' : '9%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'dd/MM/yyyy'},
				{'text' : 'Days','datafield' : 'days','width' : '9%',sortable : false,cellsalign : 'left',align : 'center',
					cellbeginedit : function(row){
						var editFlag = jQuery('#jqxgridLP').jqxGrid ('getcellvalue', row, 'editFlag');
						var benefitType = jQuery('#jqxgridLP').jqxGrid ('getcellvalue', row, 'benefitType');
						$('#jqxgridLP').jqxGrid ('setcellvalue', row, 'daysFlag',true);
						
						if(editFlag == true && benefitType == "HAPPY HOURS"){
							this.columntype = 'dropdownlist';
							return true;
						}else{
							return false;
						}
					},
					createeditor : function(row, value, editor) {
						$.getJSON('/OrderExecution/api/v1/createLoyaltyPointsLOV?benefitType=H', function(data) {
							var dayslist = data.payload.Days;
							var daysArr = [];
							 $.each(dayslist,function(k,v){
								 daysArr.push({
									 "id" : v,
									 "name" : v
								 });
							 });
							editor.jqxDropDownList({ source: daysArr , displayMember: 'name', valueMember: 'id'});
						});
					},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						$('#jqxgridLP').jqxGrid ('setcellvalue', row, 'daysFlag',true);
					},
					cellsrenderer : editViewLp
				},
				{'text' : 'From Time','datafield' : 'fromTime','width' : '7%',sortable : false,cellsalign : 'center',align : 'center',cellsformat: 'HH:mm tt',editable : true,columntype: 'datetimeinput',
					createeditor : function(rowIndex,cellValue, editor) {
						editor.jqxDateTimeInput({
			        	formatString: 'T',
			        	//culture: 'en-IN',
			            showTimeButton: true,
			            showCalendarButton: false
						}).on('close',function(event){ 
							event.preventDefault();
						});
					},
					cellbeginedit : function(row){
						var editFlag = jQuery('#jqxgridLP').jqxGrid ('getcellvalue', row, 'editFlag');
						var benefitType = jQuery('#jqxgridLP').jqxGrid ('getcellvalue', row, 'benefitType');
						
						if(editFlag == true && benefitType == "HAPPY HOURS"){
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						console.log(newvalue.toLocaleString("en-IN").split(','));
						var fTime = newvalue.toLocaleString("en-IN").split(',')
						$('#jqxgridLP').jqxGrid ('setcellvalue', row, 'fromTime', fTime[1]);
					},
					//cellsrenderer : editViewLp
				},
				{'text' : 'To Time','datafield' : 'toTime','width' : '7%',sortable : false,cellsalign : 'center',align : 'center',cellsformat: 'HH:mm tt',editable : true,columntype: 'datetimeinput',
					createeditor : function(rowIndex,cellValue, editor) {
						editor.jqxDateTimeInput({
			        	formatString: 'T',
			        	//culture: 'en-US',
			            showTimeButton: true,
			            showCalendarButton: false
						}).on('close',function(event){ 
							event.preventDefault();
						});
					},
					cellbeginedit : function(row){
						var editFlag = jQuery('#jqxgridLP').jqxGrid ('getcellvalue', row, 'editFlag');
						var benefitType = jQuery('#jqxgridLP').jqxGrid ('getcellvalue', row, 'benefitType');

						if(editFlag == true && benefitType == "HAPPY HOURS"){
							return true;
						}else{
							return false;
						}
					},
					//cellsrenderer : editViewLp
				},
				{'text' : 'From Value','datafield' : 'fromVal','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',editable:false,cellsrenderer : editViewLp},
				{'text' : 'To Value','datafield' : 'toVal','width' : '8%',sortable : false,cellsalign : 'center',align : 'center',editable:false,cellsrenderer : editViewLp},
				{'text' : '% Point','datafield' : 'percPoint','width' : '8%',sortable : false,cellsalign : 'center',align : 'center',
					cellbeginedit : function(row){
						var editFlag = jQuery('#jqxgridLP').jqxGrid ('getcellvalue', row, 'editFlag');
						var pointType = jQuery('#jqxgridLP').jqxGrid ('getcellvalue', row, 'pointType');

						if(editFlag == true && pointType == "PERCENTAGE"){
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						if(newvalue < 0 || newvalue > 100 || newvalue == 0){
							$.growl.error({
								message : "Please enter Valid % Point !!!",
								duration : 10000,
								title : 'Error'
							});
							return "";
						}
					},
				cellsrenderer : editViewLp
				},
				{'text' : 'Flat Point','datafield' : 'flatPoint','width' : '8%',sortable : false,cellsalign : 'center',align : 'center',
					cellbeginedit : function(row){
						var editFlag = jQuery('#jqxgridLP').jqxGrid ('getcellvalue', row, 'editFlag');
						var pointType = jQuery('#jqxgridLP').jqxGrid ('getcellvalue', row, 'pointType');

						if(editFlag == true && pointType == "FLAT"){
							return true;
						}else{
							return false;
						}
					},
					validation : function(cell, value) {
						var data = /^[0-9]*$/.test(value);
						if(data == false)
							{
							return {
								result : false,
								message : "Enter Valid Flat Point !!"
								};
							}
						return true;
						},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						if(newvalue < 0 || newvalue == 0){
							$.growl.error({
								message : "Please enter Valid Flat Point !!!",
								duration : 10000,
								title : 'Error'
							});
							return "";
						}
					},
				cellsrenderer : editViewLp
				},
				{
					text : '',
					datafield : 'actionId',
					cellsrenderer : editLoyaltyPoint,
					editable : false,
					cellsalign : 'center',
					align : 'center',
					filterable: false,
					sortable : false,
					'width' : '3%'
				},
				{
					text : '',
					datafield : 'actionIdD',
					cellsrenderer : deleteLoyaltyPoint,
					editable : false,
					cellsalign : 'center',
					align : 'center',
					filterable: false,
					sortable : false,
					'width' : '3%'
				},
				{'text' : 'flag','datafield' : 'editFlag','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},
				{'text' : 'flag','datafield' : 'status','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},

				{'text' : 'flag','datafield' : 'pointType','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},
				{'text' : 'flag','datafield' : 'detailId','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},
				
				{'text' : '','datafield' : 'daysFlag','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},
				{'text' : '','datafield' : 'fromDate','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true,cellsformat : 'dd/MM/yyyy'},
				{'text' : '','datafield' : 'toDate','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true,cellsformat : 'dd/MM/yyyy'},

			]
		});
	}
 
 var editLoyaltyPoint = function (row, columnfield, value, defaulthtml, columnproperties) {
	    var flagE = $("#jqxgridLP").jqxGrid('getrowdata', row);
	    var updateFlag = flagE.editFlag;
	    if(flagE.status == 1){
	    	return '<button class="btn btn-sm btn-primary"  type="button" id='
	    	+ row
	    	+ ' onclick="editloyaltyPointMaster('
	    	+ value
	    	+ ')" ><span class="fa fa-pencil fa-lg"></span> </button>';
	    }else{
			return '<button class="btn btn-sm btn-primary"  type="button" disabled><span class="fa fa-pencil fa-lg"></span> </button>';
	    }
}

 
 var cellEditFuncLp = function(row, column, value){
	var editFlag = jQuery('#jqxgridLP').jqxGrid ('getcellvalue', row, 'editFlag');
	var pointType = jQuery('#jqxgridLP').jqxGrid ('getcellvalue', row, 'pointType');
	
	if(editFlag == true && pointType == "FLAT"){
		return true;
	}else{
		return false;
	}
}
 
 var editViewLp = function(row, column, value){
	var gridData = $("#jqxgridLP").jqxGrid('getrows');
	
	var validArr = [];
	$.each(gridData,function(k,v){
		if(v.editFlag == true){
			validArr.push(v);
		}
	});
	var editFlag = jQuery('#jqxgridLP').jqxGrid ('getcellvalue', row, 'editFlag');
	 if(editFlag == true && validArr.length > 1){
		return '<div style="text-align:center; background: #FBB450; color: #FFF;  ;margin: 0;padding-top:10px; height:30px;">'+value+'</div>';
	 }
	else{
		return '<div style="text-align:center; margin-top: -4px; padding-top:10px; height:40px;">'+value+'</div>';
	}
}
 
 var deleteLoyaltyPoint = function (row, columnfield, value, defaulthtml, columnproperties) {
    var flagE = $("#jqxgridLP").jqxGrid('getrowdata', row);
    var updateFlag = flagE.editFlag;
    if(flagE.status == 1){
    	return '<button class="btn btn-sm btn-primary"  data-toggle="modal"  data-target="#createAdjusVouchr" type="button" id='
    	+ row
    	+ '><span class="fa fa-trash fa-lg"></span> </button>';
    }else{
		return '<button class="btn btn-sm btn-primary"  type="button" disabled><span class="fa fa-trash fa-lg"></span> </button>';
    }
}
 
 $("#updateLpE").hide();
 $("#updateLpE").prop('disabled',true);
 var editloyaltyPointMaster = function(id){
	var rowKey = null;
	var selectedrowindex = $("#jqxgridLP").jqxGrid('getselectedrowindex');
	rowKey = selectedrowindex;
	var gridData = $("#jqxgridLP").jqxGrid('getrows');
	
	$('#jqxgridLP').jqxGrid ('setcellvalue', rowKey, 'editFlag', true);
	$("#updateLpE").prop('disabled',false);
	var validArr = [];
	$.each(gridData,function(k,v){
		if(v.editFlag == true){
			validArr.push(v);
		}
	});
	
	if(validArr.length > 1){
		$("#updateLpE").prop('disabled',true);
		$.growl.error({
			message : "Please Edit only one record at a time !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$("#updateLpE").prop('disabled',false);
	}
	
	$("#updateLpE").show();
}
 
 // Loyalty Points Update Function
 $("#updateLpE").on('click',function(){
	var gridData = $("#jqxgridLP").jqxGrid('getrows');
	 var editedData;
	 
	 $.each(gridData,function(k,v){
		 if(v.editFlag == true){
			 editedData = v;
		 }
	 });
	 
	
	 	var time1 = null;
		var time2 = null;
		var fTime ,toTime;
		if(editedData.benefitType == "HAPPY HOURS"){
			time1 = editedData.fromTime.toLocaleString("en-IN").split(','); 
		    time2 = editedData.toTime.toLocaleString("en-IN").split(','); 
		    
		    var timeE1 = time1[1].split(":");
			var ampm1 = timeE1[2];
			var val1 = ampm1.substr(3, 2);
			 fTime = timeE1[0] + ":" + timeE1[1] +" " + val1.toUpperCase();
			
			var timeE2 = time2[1].split(":");
			var ampm2 = timeE2[2];
			var val2 = ampm2.substr(3, 2);
			 toTime = timeE2[0] + ":" + timeE2[1] +" " + val2.toUpperCase();
			
		}else{
			time1 = null;
			time2 = null;
		}
     
		var date1 = new Date(editedData.fromDate);
		var dd = date1.getDate();
		var mm = date1.getMonth() + 1;
		var yy = date1.getFullYear();
		
		var fromDate = dd + "/" + mm + "/" + yy;
		
		var date2 = new Date(editedData.toDate);
		var dd1 = date2.getDate();
		var mm1 = date2.getMonth() + 1;
		var yy1 = date2.getFullYear();
		
		var toDate = dd1 + "/" + mm1 + "/" + yy1;
		
		
		
	 var editedDet = { "fieldFilters": {
           "mode":"edit",
           "tierName":editedData.tierName,
           "benefitType":editedData.benefitType,
           "detailId":editedData.detailId,
           "day":editedData.days,
           "fromTime":(editedData.benefitType == "HAPPY HOURS") ? fTime.trim() : null,
    	   "toTime": (editedData.benefitType == "HAPPY HOURS") ? toTime.trim() : null,
           "flatPoint":editedData.flatPoint,
           "percPoint":editedData.percPoint,
           "daysFlag":editedData.daysFlag,
           "fromDate":(editedData.daysFlag == true  && editedData.benefitType == "HAPPY HOURS") ? fromDate : null,
           "toDate":(editedData.daysFlag == true  && editedData.benefitType == "HAPPY HOURS") ? toDate : null,
         },
       }
	 postJSON('/OrderExecution/api/v1/editLoyaltyPoints',JSON.stringify(editedDet),function(data) {
			if(data.resCode == 1){
				$.growl.notice({
					message : "Loyalty Point " + data.payload.newLoyalPointId + " Updated Successfully !! ",
					duration : 10000,
					title  : 'success'
				});
				searchLp();
				$("#updateLpE").prop('disabled',true);
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 1000,
					title  : 'Error'
				});
				return false;
			}
		});
 });
 
 $("#btnDelteYesLines").on('click',function(){
	 var selectedrowindex = $("#jqxgridLP").jqxGrid('getselectedrowindex');
	 var gridData = $("#jqxgridLP").jqxGrid('getrows');
   
	 var deleteData ;
	 for (var i = 0; i < gridData.length; i++) {
		 deleteData = gridData[selectedrowindex];
	 }
		
	var time1 = null;
	var time2 = null;
	
	if(deleteData.benefitType == "HAPPY HOURS"){
		time1 = deleteData.fromTime.toLocaleString("en-IN").split(','); 
	    time2 = deleteData.toTime.toLocaleString("en-IN").split(','); 
	}else{
		time1 = null;
		time2 = null;
	}
		 
	 var DeleteDet = { "fieldFilters": {
	       "mode":"Delete",
	       "benefitType":deleteData.benefitType,
	       "detailId":deleteData.detailId,
	       "day":deleteData.days,
	       "fromTime":(deleteData.benefitType == "HAPPY HOURS") ? time1[1] : null,
	       "toTime": (deleteData.benefitType == "HAPPY HOURS") ? time2[1] : null,
	       "flatPoint":deleteData.flatPoint,
	       "percPoint":deleteData.percPoint
	     },
	   }
	 
	 postJSON('/OrderExecution/api/v1/editLoyaltyPoints',JSON.stringify(DeleteDet),function(data) {
			if(data.resCode == 1){
				$.growl.notice({
					message : "Loyalty Point " + data.payload.oldLoyalPointId +" Deleted Successfully !! ",
					duration : 10000,
					title  : 'success'
				});
				searchLp();
				$("#updateLpE").prop('disabled',true);
				$("#createAdjusVouchr").modal('hide');
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 1000,
					title  : 'Error'
				});
				return false;
			}
			
		});
 });
 
 //################################# create Grids ######################################
 var loyaltyPointCreateGrid = function(data){
		var source = {
	        localdata: data,
	        datatype: "json",
			datafields : [ 
					{'name' :'slNo','type' :'long','map':'sln'},
				 	{'name' :'benefitType','type' :'string','map':'BenefitType'},
				 	{'name' :'tierName','type' :'string','map':'tierName'},
				 	{'name'  :'fromDate','type' : 'string','map':'fromDate'},
				 	{'name' : 'toDate','type'  :'string','map':'toDate'},
				 	{'name'  :'days','type'  :'string','map':'Day'},
				 	{'name' : 'fromTime','type' : 'string','map':'fromTime'},
				 	{'name' : 'toTime','type' : 'string','map':'toTime'},
				 	{'name' : 'fromVal','type' : 'string','map':'fromValue'},
				 	{'name' : 'toVal','type' : 'string','map':'toValue'},
				 	{'name' : 'percPoint','type' : 'string','map':'percPoint'},
					{'name' : 'flatPoint','type' : 'string','map':'flatPoint'},
					
			]};
		var dataAdapter = new $.jqx.dataAdapter(source);
		$("#jqxgridC").jqxGrid({
			source : dataAdapter,
			width : '100%',
			theme: 'energyblue',
			//editmode: 'programmatic',
		    editable: true,
			columnsheight : 85,
			autoheight : true,
			sortable:true,
			altRows : true,
			columnsresize : true,
	 	    statusbarheight: 30,
			columns : [
				{'text'  :'Sl No','datafield':  'slNo','width' : '3%',cellsalign : 'center',align:'center',editable : false},
				{'text'  :'Benefit Type','datafield':  'benefitType','width' : '12%',cellsalign : 'center',align:'center',editable : false}, 
				{'text'  :'Tier Name','datafield' : 'tierName','width'  :'13%',sortable  :false,cellsalign : 'center',align:'center',editable:  false}, 
				{'text' : 'From Date','datafield' : 'fromDate','width' : '8%',cellsalign  :'center',align:'center',sortable : false,editable : false},
				{'text'  :'To Date','datafield' : 'toDate','width' : '8%',cellsalign  :'center',align:'center',sortable : false,editable  :false},
				{'text' : 'Days','datafield' : 'days','width'  :'10%',cellsalign  :'center',align:'center',sortable : false,editable  :false},
				{'text' : 'From Time','datafield' : 'fromTime','width':  '7%',cellsalign : 'center',align:'center',sortable: false,editable : false},
			 	{'text' : 'To Time','datafield' : 'toTime','width':  '7%',cellsalign : 'center',align:'center',sortable: false,editable : false},
			 	{'text' : 'From Value','datafield' : 'fromVal','width':  '8%',cellsalign : 'center',align:'center',sortable: false,editable : false},
			 	{'text' : 'To Value','datafield' : 'toVal','width':  '8%',cellsalign : 'center',align:'center',sortable: false,editable : false},
			 	{'text' : '% Point','datafield' : 'percPoint','width':  '8%',cellsalign : 'center',align:'center',sortable: false,editable : true,
			 		cellbeginedit : function(row){
						var pointType = $("#pointTypeC").val();
						if(pointType == "PERCENTAGE"){
							return true;
						}else{
							return false;
						}
					},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						if(newvalue < 0 || newvalue > 100 || newvalue == 0){
							$.growl.error({
								message : "Please enter Valid % Point !!!",
								duration : 10000,
								title : 'Error'
							});
							return "";
						}
					},
			 	}, 
			 	{'text' : 'Flat Point','datafield' : 'flatPoint','width':  '8%',cellsalign : 'center',align:'center',sortable: false,editable : true,
			 		cellbeginedit : function(row){
						var pointType = $("#pointTypeC").val();
						if(pointType == "FLAT"){
							return true;
						}else{
							return false;
						}
			 		},
			 		validation : function(cell, value) {
						var data = /^[0-9]*$/.test(value);
						if(data == false)
							{
							return {
								result : false,
								message : "Enter Valid Flat Point !!"
								};
							}
						return true;
						},
					cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
						if(newvalue < 0 || newvalue == 0){
							$.growl.error({
								message : "Please enter Valid Flat Point !!!",
								duration : 10000,
								title : 'Error'
							});
							return "";
						}
					},
			 	},
			]
		});
	}
 
//Field Filters
 var loyaltyPointsFieldFilters = function() {
 	var fromdateLS = $('#fromdateLS').val();
 	var todateLS = $('#todateLS').val();
 	var statusS = $('#statuslPS').val();
 	var benefitTypeS = $('#benefitTypeS').val();
 	var tierNamelPS = $('#tierNamelPS').val();
 	console.log(typeof statusS);
 	console.log(statusS);
 	fieldFilters = {
 		"fieldFilters" : {}
 	};
 	if (fromdateLS != "" && fromdateLS != null) {
 		fieldFilters.fieldFilters["fromDate"] = fromdateLS;
 	}
 	if (todateLS != "" && todateLS != null) {
 		fieldFilters.fieldFilters["toDate"] = todateLS;
 	}
	if (benefitTypeS != "" && benefitTypeS != null) {
 		fieldFilters.fieldFilters["benefitType"] = benefitTypeS.charAt(0);
 	}
	if (tierNamelPS != "" && tierNamelPS != null) {
 		fieldFilters.fieldFilters["tierId"] = tierNamelPS;
 	}
 	if (statusS != "" && statusS != null) {
 		if(statusS == "1"){
 			fieldFilters.fieldFilters["status"] = 1;
 		}
 		if(statusS == 0){
 			fieldFilters.fieldFilters["status"] = 0 ;
 		}
 	}
 	fieldFilters.fieldFilters["mode"] = "export";
 	return fieldFilters;
 }

 
$("#searchLp").on('click',function(){
	 if($("#fromdateLS").val() == "" || $("#todateLS").val() == ""){
		 $.growl.error({
			message:"Please fill Mandatory Fields !!!",
			duration : 1000,
			title : 'error'
		 });
		 return false;
	 }else{
		 searchLp(); 
	 }
 });
 
 
 var searchLp = function(){
	 postJSON('/OrderExecution/api/v1/searchLoyaltyPoints',JSON.stringify(loyaltyPointsFieldFilters()),function(response) {
			if(response.resCode == 1){
				var data = response.payload.list;
				data.sort(function(a, b){
					{return a.id - b.id};
				});
				
				$.each(data,function(k,v){
					v.editFlag = false;
				});
				loyaltyPointMasterSearch(data);
				$('#jqxgridLP').show();
				 $("#updateLpE").show();
			}else{
				loyaltyPointMasterSearch();
				$('#jqxgridLP').show();
				$.growl.error({
					message : response.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		});
 }
 
 $("#clearLpC").on('click',function(){
	 clearLp();
 });
 
 $("#createLp").on('click',function(){
	 var masterGrid1  =  $('#jqxgridC').jqxGrid('getrows');
	 var masterGrid2  =  $('#jqxgridP').jqxGrid('getrows');
	 var LoyaltyPointtDetails = [];
	 var date1 = new Date();
  	 var dd1 = date1.getDate();
	 var mm1 = date1.getMonth() + 1;
	 var yy1 = date1.getFullYear();
	 var cDate = dd1 + "/" + mm1 + "/" + yy1;
	 
	 var createFlag = false;
	 
	 $.each(masterGrid1,function(k,v){
		 var createDet = {
		 	"id": null,
	        "detailId": null,
	        "BenefitType": v.benefitType,
	        "CreatedDate": cDate,
	        "Day": v.days,
	        "fromTime":  v.fromTime,
	        "toTime": v.toTime,
	        "fromValue": v.fromVal,
	        "toValue": v.toVal,
	        "upToValue": $("#toValueC").val(),
	        "percPoint": v.percPoint,
	        "flatPoint": v.flatPoint,
	        "tierName": v.tierName,
	        "fromDate": v.fromDate,
	        "toDate": v.toDate,
	        "diffrence": $("#valueDiffC").val(),
	        "pointType": $("#pointTypeC").val()
		}
		 
		 if($("#pointTypeC").val() == "PERCENTAGE"){
			 if(v.percPoint == 0 || v.percPoint == "" || v.percPoint == null){
				 createFlag = false;
				 $.growl.error({
					message : "Please Enter % Point for Sl No " + v.slNo +" !!!",
					duration : 10000,
					title : 'Error'
				 });
				 return false;
			 }else{
				 createFlag = true;
			 }
		 }
		 if($("#pointTypeC").val() == "FLAT"){
			 if(v.flatPoint == 0 || v.flatPoint == "" || v.flatPoint == null){
				 createFlag = false;
				 $.growl.error({
					message : "Please Enter Flat Point for Sl No " + v.slNo +" !!!",
					duration : 10000,
					title : 'Error'
				 });
				 return false;
			 }else{
				 createFlag = true;
			 }
		 }
		 LoyaltyPointtDetails.push(createDet);
	 });
	 
	 if( createFlag == true){
	 postJSON('/OrderExecution/api/v1/createLoyaltyPoints',JSON.stringify(LoyaltyPointtDetails),function(response) {
		if(response.resCode == 1){
			$.growl.notice({
				message : "Loyalty Point with id " + response.payload.LoyaltyPointtId +" Created Successfully !!" ,
				duration : 10000,
				title : 'Success'
			});
			clearLp();
		} else{
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
 
 $("#backFromLpc").on('click',function(){
	 $("#searchLpSection").hide();
	 $("#createLpSection").hide();
	 $("#loyaltyPoint").show();
	 $("#typeLp").show();
	 $("#typeLp").val("");
	 $("#createHeadLp").empty();
	 $("#createHeadLp").append("Loyalty Point Master");
 });
 
 var clearLp = function(){
	 $("#addLp").prop('disabled',false);
	 $("#createLp").hide();
	 $("#benefitTypeC").prop('disabled',false);
	 $("#tierNamelPC").prop('disabled',false);
	 $("#fromdateC").prop('disabled',false);
	 $("#todateC").prop('disabled',false);
	 $("#valueDiffC").prop('disabled',false);
	 $("#daysC").prop('disabled',false);
		
	 $("#pointTypeC").prop('disabled',false);
	 $("#timepicker1").prop('disabled',false);
	 $("#timepicker2").prop('disabled',false);
	 $("#fromValueC").prop('disabled',false);
	 $("#toValueC").prop('disabled',false);
	 
	 $('#fromdateC').addClass('dateBackground');
	 $('#todateC').addClass('dateBackground');
	 $("#daysCObj").multiselect("enable");
	 $("#pointTypeC").val("");
	 $('#orderTypeObj').multiselect("clearSelection");
	 
	 $("#jqxgridC").jqxGrid('clear');
	 $("#jqxgridP").jqxGrid('clear');
	 
	 $("#loyaltyPointSearch").trigger('reset');
 }
 
 $("#clearAllCTA").on('click',function(){
	 $('#jqxgridLP').hide();
	 $("#updateLpE").hide();
 });