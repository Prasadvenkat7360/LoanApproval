$("#loyaltyPoint").hide();
$("#createSection").hide();
$("#searchSection").hide();
$("#searchLpSection").hide();
$("#createLpSection").hide();
$("#updateLp").hide();
$("#createLp").hide();
$("#goBack").hide();

$('input:radio[name="loyaltyMaster"]').filter('[value="1"]').attr('checked',true);

$('input[name=loyaltyMaster]:radio').click(function() {
	var selectedVal = $(this).val();
	if (selectedVal == 1) {
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();

		$("#loyaltyTier").show();
		$("#loyaltyPoint").hide();

	} else if (selectedVal == 2) {
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();

		$("#loyaltyTier").hide();
		$("#loyaltyPoint").show();
	}
});

$("#type").on('change',function(){
	if($("#type").val() == "search"){
		$("#searchSection").show();
		$("#createSection").hide();
		$("#goBack").show();
	}else{
		$("#type").hide();	
		$("#createHead").append( "- Create");
		$("#searchSection").hide();
		$("#createSection").show();
		$("#loyaltyTierCreate").trigger('reset');
		$("#goBack").hide();
	}
});

$("#goBackLS").hide();
$("#typeLp").on('change',function(){
	if($("#typeLp").val() == "search"){
		$("#searchLpSection").show();
		$("#createLpSection").hide();
		$("#goBackLS").show();
	}else{
		$("#typeLp").hide();
		$("#createHeadLp").append( "- Create");
		$("#searchLpSection").hide();
		$("#createLpSection").show();
		$("#goBackLS").hide();
		loyaltyPointCreateGrid();
	 	$("#jqxgridC").show();

	}
	
});
$("#backLtC").on('click',function(){
	/*$("#type").val("");
	$("#createSection").hide();
	$("#searchSection").hide();
	$("#type").show();
	$("#createHead").empty();
	$("#createHead").append("Loyalty Tiers");*/
	
	goBack();
});

var goBack = function(){
	$("#type").val("");
	$("#createSection").hide();
	$("#searchSection").hide();
	$("#type").show();
	$("#createHead").empty();
	$("#createHead").append("Loyalty Tiers");
}

$("#upDownLptsC").on('change',function(){
	if (this.value.match(/[^0-9]/g)) {
		$("#upDownLptsC").val("");
		$.growl.error({
			message : "Please Enter Valid Value !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
});

$("#noOfMonthsC").on('change',function(){
	if (this.value.match(/[^0-9]/g)) {
		$("#noOfMonthsC").val("");
		$.growl.error({
			message : "Please Enter Valid Value !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
});
var onLoad =  function(){
	$.getJSON('/OrderExecution/api/v1/searchLoyaltyTierLOV', function(data) {
		
		// search
		$('#tierIdS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.TierNos, function(key, val) {
				$('#tierIdS').append('<option value="' + val + '">' + val + '</option>');
			});
			
		$('#tierNameS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.TierNames, function(key, val) {
				$('#tierNameS').append('<option value="' + val + '">' + val + '</option>');
			});
	});
	
	// create
	$.getJSON('/OrderExecution/api/v1/LoyaltyTierLOV', function(data) {
	$('#tierIdC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.allowedTiers, function(key, val) {
			$('#tierIdC').append('<option value="' + val + '">' + val + '</option>');
		});
		
	$('#priorityC').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.allowedPriorities, function(key, val) {
			$('#priorityC').append('<option value="' + val + '">' + val + '</option>');
		});
	});
	
	// Loyalty Point Master Onload LOV
	$.getJSON('/OrderExecution/api/v1/createLoyaltyPointsLOV', function(data) {
		$('#benefitTypeS').empty().append('<option value="" selected>--Select--</option>');
		$('#benefitTypeC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.BenefitTypes, function(key, val) {
				$('#benefitTypeC').append('<option value="' + val + '">' + val + '</option>');
				$('#benefitTypeS').append('<option value="' + val + '">' + val + '</option>');

			});
			
		$('#tierNamelPS').empty().append('<option value="" selected>--Select--</option>');
		$('#tierNamelPC').empty().append('<option value="" selected>--Select--</option>');

			$.each(data.payload.TierNames, function(key, val) {
				$('#tierNamelPS').append('<option value="' + val.id	 + '">' + val.name + '</option>');
				$('#tierNamelPC').append('<option value="' + val.id + '" idE = '+ val.tierNo +'>' + val.name + '</option>');

			});
		});
	
	var day = '<select id="daysCObj" class="form-control" multiple="multiple"></select>';
	$("#daysC").html(day);
	$('#daysCObj').multiselect({
		includeSelectAllOption : true,
		enableFiltering : false,
		maxHeight : 250,
		numberDisplayed : 1,
	    buttonClass : 'col-md-12 form-control text-left'
	});
}

onLoad();

$("#saveLp").on('click',function(){
	if($("#tierNameC").val() == "" || $("#tierIdC").val() == "" || $("#priorityC").val() == "" || 
			$("#upDownLptsC").val() == "" || $("#noOfMonthsC").val() == "" || $("#descriptionC").val() == ""){
		$.growl.error({
			message : "Please Select Mandatory Fields !!!",
			duration : 1000,
			title  : 'Error'
		});
		return false;
	}else{
		var createParams  = {"fieldFilters": {
			    "tierName" : $("#tierNameC").val(),
			    "tierNo" : $("#tierIdC").val(),
			    "priority":$("#priorityC").val(),
			    "upOrDownLoyaltyPoints":$("#upDownLptsC").val(),
			    "noOfMonths":$("#noOfMonthsC").val(),
			    "description":$("#descriptionC").val(),
			    "isActive":true
			  }}
		postJSON('/OrderExecution/api/v1/createLoyaltyTier',JSON.stringify(createParams),function(data) {
			if(data.resCode == 1){
				$.growl.notice({
					message : "Loyalty Tier "+data.payload.tairNo+" Created Successfully !! ",
					duration : 10000,
					title  : 'success'
				});
				$("#loyaltyTierCreate").trigger('reset');
				goBack();
				onLoad();
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 1000,
					title  : 'Error'
				});
				return false;
			}
		});
			console.log(createParams);
	}
	
});


//Field Filters
var loyaltyTierFieldFilters = function() {
	var tierIdS = $('#tierIdS').val();
	var tierNameS = $('#tierNameS').val();
	var statusS = $('#statusS').val();
	console.log(typeof statusS);
	console.log(statusS);
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (tierIdS != "" && tierIdS != null) {
		fieldFilters.fieldFilters["tierNo"] = tierIdS;
	}
	if (tierNameS != "" && tierNameS != null) {
		fieldFilters.fieldFilters["name"] = tierNameS;
	}
	if (statusS != "" && statusS != null) {
		if(statusS == "1"){
			fieldFilters.fieldFilters["isActive"] = true;
		}
		if(statusS == 0){
			fieldFilters.fieldFilters["isActive"] = false;
		}
	}
	
	return fieldFilters;
}

function loyaltyMasterSearch() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'slNo','type' : 'long','map' : 'id'},
		{'name' : 'tierNo','type' : 'long','map' : 'tierNo'},
		{'name' : 'createdDate','type' : 'string','map' : ''}, 
		{'name' : 'tierName','type' : 'string','map' : 'name'},
		{'name' : 'priority','type' : 'long','map' : 'priority'},
		{'name' : 'upOrDown','type' : 'long','map' : 'upOrDownLoyaltyPoints'},
		{'name' : 'noOfMonths','type' : 'long','map' : 'noOfMonths'}, 
		{'name' : 'description','type' : 'string','map' : 'description'}, 
		{'name' : 'status','type' : 'string','map' : 'isActive'}, 
		{'name' : 'actionId','type' : 'long','map' : 'id'},
		{'name' : 'edit','type' : 'string'},
	];

	var columns = [
		{'text' : 'Sl No','datafield' : 'slNo','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',hidden : true},
		{'text' : 'Tier Id','datafield' : 'tierNo','width' : '8%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Created Date','datafield' : 'createdDate','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Tier Name','datafield' : 'tierName','width' : '15%',sortable : false,cellsalign : 'center',align : 'center',   editable: true,
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
				 $("#jqxgrid").jqxGrid('setcellvalue', row, "tierName", newvalue);
			},
			cellbeginedit :cellEditFunc,
			cellsrenderer : editView

		},
		{'text' : 'Priority','datafield' : 'priority','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Upgrade/Downgrade of Loyalty Points','datafield' : 'upOrDown','width' : '16%',sortable : false,cellsalign : 'center',align : 'center',
			validation : function(cell, value) {
				var data = /^[0-9]*$/.test(value);
				if(data == false)
					{
					return {
						result : false,
						message : "Enter Valid Upgrade/Downgrade of Loyalty Points !!"
						};
					}
				return true;
				},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
				 $("#jqxgrid").jqxGrid('setcellvalue', row, "upOrDown", newvalue);
			},
			cellbeginedit :cellEditFunc,
			cellsrenderer : editView
		},
		{'text' : 'No of Months for Upgrade/Downgrade of Loyalty Tier','datafield' : 'noOfMonths','width' : '16%',sortable : false,cellsalign : 'center',align : 'center',
			validation : function(cell, value) {
				var data = /^[0-9]*$/.test(value);
				if(data == false)
					{
					return {
						result : false,
						message : "Enter Valid Upgrade/Downgrade of Loyalty Points !!"
						};
					}
				return true;
				},
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
				 $("#jqxgrid").jqxGrid('setcellvalue', row, "noOfMonths", newvalue);
			},
			cellbeginedit :cellEditFunc,
			cellsrenderer : editView
		},
		{'text' : 'Description','datafield' : 'description','width' : '18%',sortable : false,cellsalign : 'center',align : 'center',
			cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue, event) {
				 $("#jqxgrid").jqxGrid('setcellvalue', row, "description", newvalue);
			},
			cellbeginedit :cellEditFunc,
			cellsrenderer :editView
		},
		{'text' : 'Status','datafield' : 'status','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
    			if(value == false){
    				return '<div style="text-align:center; margin: 0;padding-top:10px; height:30px;">In-Active</div>';
    			}else{
    				return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">Active</div>';
    			}
    		 }
		},
		{
			text : '',
			datafield : 'actionId',
			cellsrenderer : editLoyaltyTier,
			editable : false,
			cellsalign : 'center',
			align : 'center',
			filterable: false,
			sortable : false,
			'width' : '5%'
		},
		{'text' : 'flag','datafield' : 'edit','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},
		
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchLoyaltyTier", "list",columns, loyaltyTierFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 50,
		rowdetails : true,
		virtualmode : true,
	});
}

var cellEditFunc = function(row, column, value){
	var editFlag = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'edit');
	console.log(editFlag);
	if(editFlag == true){
		return true;
	}else{
		return false;
	}
}

$("#search").on('click',function(){
	searchFunction();
});

var searchFunction = function(){
	loyaltyMasterSearch();
	$('#jqxgrid').show();
}

var editLoyaltyTier = function (row, columnfield, value, defaulthtml, columnproperties) {
    var flagE = $("#jqxgrid").jqxGrid('getrowdata', row);
    console.log(flagE);
    var updateFlag = flagE.edit;
    
    if(updateFlag == true || flagE.status == true){
    	return '<button class="btn btn-sm btn-primary"  type="button" id='
    	+ row
    	+ ' onclick="editloyaltyTierMaster('
    	+ value
    	+ ')" ><span class="fa fa-pencil fa-lg"></span> </button>';
    }else{
		return '<button class="btn btn-sm btn-primary"  type="button" disabled><span class="fa fa-pencil fa-lg"></span> </button>';
    }
}


var editloyaltyTierMaster = function(id){
	var rowKey = null;
	var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
	rowKey = selectedrowindex;
	var gridData = $("#jqxgrid").jqxGrid('getrows');
	
	var validArr = [];
	$.each(gridData,function(k,v){
		if(v.slNo == id){
			$('#jqxgrid').jqxGrid ('setcellvalue', v.boundindex, 'edit', true);
		}
		if(v.edit == true){
			validArr.push(v);
		}
	});
	
	if(validArr.length > 1){
		$("#updateLp").prop('disabled',true);
		$.growl.error({
			message : "Please Edit only one record at a time !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$("#updateLp").prop('disabled',false);
	}
	
	$("#updateLp").show();
}

var editView = function(row, column, value){
	var gridData = $("#jqxgrid").jqxGrid('getrows');
	
	var validArr = [];
	$.each(gridData,function(k,v){
		if(v.edit == true){
			validArr.push(v);
		}
	});
	var editFlag = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'edit');
	 if(editFlag == true && validArr.length > 1){
		return '<div style="text-align:center; background: #FBB450; color: #FFF;  ;margin: 0;padding-top:10px; height:30px;">'+value+'</div>';
	 }
	else{
		return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">'+value+'</div>';
	}
}

$("#updateLp").on('click',function(){
	var gridData = $("#jqxgrid").jqxGrid('getrows');
	var selectedRowData ;
	
	var validArr = [];
	$.each(gridData,function(k,v){
		if(v.edit == true){
			validArr.push(v);
		}
	});
	if(validArr.length > 1){
		$("#updateLp").prop('disabled',true);
		$.growl.error({
			message : "Please Edit only one record at a time !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$.each(validArr,function(key,val){
			selectedRowData = val;
		});
		
	if(selectedRowData.tierName == "" || selectedRowData.upOrDown == "" ||  selectedRowData.noOfMonths == "" 
		|| selectedRowData.description == ""){
		$.growl.error({
			message : "Please Fill all the Grid fields for the Selected row !!!",
			duration : 10000,
			title  :'Error'
		});
		return false
	}else{
		var editedData = {
				"fieldFilters": {
			    "id":selectedRowData.slNo,
			    "tierNo":selectedRowData.tierNo,
			    "tierName":selectedRowData.tierName,
			    "priority":selectedRowData.priority,
			    "upOrDownLoyaltyPoints":selectedRowData.upOrDown,
			    "noOfMonths":selectedRowData.noOfMonths,
			    "description":selectedRowData.description,
			    "isActive":true
			  }
			};
			
			console.log(editedData);
			postJSON('/OrderExecution/api/v1/editLoyaltyTier',JSON.stringify(editedData),function(data) {
				if(data.resCode == 1){
					$.growl.notice({
						message : "Loyalty Tier "+editedData.fieldFilters.tierNo+" Updated Successfully !! ",
						duration : 10000,
						title  : 'success'
					});
					searchFunction();
					$("#updateLp").prop('disabled',true);
				}else{
					$.growl.error({
						message : data.mesgStr,
						duration : 1000,
						title  : 'Error'
					});
					return false;
				}
			});
		}
	}
	
});

$("#clearAll").on('click',function(){
	$("#loyaltyTierSearchForm").trigger('reset');
	$('#jqxgrid').hide();
	$("#updateLp").hide();
});

$("#goBack").on('click',function(){
	window.location.href="javascript:showContentPage('loyaltyMaster', 'bodySwitcher')"
});


$("#goBackLS").on('click',function(){
	$("#searchLpSection").hide();
	$("#createLpSection").hide();
	$("#typeLp").show();
	$("#typeLp").val("");
	$("#goBackLS").hide();
});
