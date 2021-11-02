
var onLoadLovFunc = function(){
	$.getJSON('/OrderExecution/api/v1/IntimationReminderTemplateOnLoadLovs', function(data) {
		 $('#mode').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.IRModesAll, function(key, val) {
			$('#mode').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
			
		 $('#intOrRem').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.IRTypesAll, function(key, val) {
			$('#intOrRem').append('<option value="' + val.id + '">' + val.name + '</option>');
		 });
	});
}

onLoadLovFunc();

$("#save").on('click',function(){
	if($("#mode").val() == "" || $("#intOrRem").val() == "" || $("#mailContent").val() == "" ){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration :1000,
			title : 'Error'
		});
		return false;
	}else{
		var createParams = {
				"irModeType": $("#mode").val(),
				"irType":$("#intOrRem").val(),
				"temText":$("#mailContent").val()
		}
		postJSON('/OrderExecution/api/v1/savingsPlanCreateTemplate',JSON.stringify(createParams),function(data) {
			if(data.resCode == 1){
				$.growl.notice({
					message : data.mesgStr,
					duration : 1000,
					title : 'success'
				});
				$("#mode").val("");
				$("#intOrRem").val("");
				$("#mailContent").val("")
			}else{
				$.growl.error({
					message : data.mesgStr,
					duration : 1000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});


// SP Mesg to send or not started
$("#selectAll").prop('disabled',true);
$("#saveSection").hide();
$("#searchSM").on('click',function(){
	if($("#custId").val() == ""){
		$.growl.error({
			message : "Please Enter Customer Id !!",
			duration  : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$.getJSON('/OrderExecution/api/v1/CustomerSPReminderDetails?customer='+$("#custId").val(), function(data) {
			if(data.resCode == 1){
				var reminderList = data.payload.list;
				var reminderArr = [];
				$.each(reminderList,function(k,v){
					reminderArr.push({ spNo: v.id, custName: v.custDTO.name , buttonFlag:true,
						custId :v.custDTO.custId,reminderFlag:v.id, reminderNoFlag:v.id,selectionStatus:false,selectAllStatus:false});
					
				});
				spMesgGrid(reminderArr);
				$("#jqxgrid").show();
				$("#selectAll").prop('disabled',false);
				$("#saveSection").show();
			}else{
				$("#selectAll").prop('disabled',true);
				$.growl.error({
					message : data.mesgStr,
					duration  : 10000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});

var spMesgGrid = function(response) {
	/*var updateRows = function(rowid, newdata, commit) {
		updates[rowid] = {
			"rowId" : rowid,
			"selectionStatus" : undefined != newdata.selectionStatus ? newdata.selectionStatus
					: false
		};
		 commit(true);
	}*/
	var source = {
			datafields : [
				{'name' : 'custName','type' : 'string'},
				{'name' : 'custId','type' : 'string'},

				{'name' : 'spNo','type' : 'string'},
				{'name' : 'reminderFlag','type' : 'long'},
				{'name' : 'reminderNoFlag','type' : 'long'},
				{
					'name' : 'selectionStatus',
					'type' : 'bool',
				},
				{'name' : 'buttonFlag','type' : 'string'},
				{'name' : 'selectAllStatus','type' : 'string'},

			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
/*	var columnCheckBox = null;
	var updatingCheckState = false;*/
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		editable : true,
		pagesize : 20,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true,
		columns : [
			{'text' : 'Customer Name','datafield' : 'custName','width' : '40%',editable : false,cellsalign : 'center',align : 'center',sortable : false,groupable : false},
			{'text' : 'Savings Plan No','datafield' : 'spNo','width' : '40%',cellsalign : 'center',align : 'center',editable : false,sortable : false,groupable : false},
		//	{'text' : 'Select All','datafield' : 'reminderFlag','width' : '15%',editable : true,sortable : false,cellsalign : 'center',align : 'center',columntype: 'checkbox',groupable : false}, 
			{'text' : '','datafield' : 'custId','width' : '15%',editable : true,sortable : false,cellsalign : 'center',align : 'center',groupable : false,hidden:true}, 
			{'text' : '','datafield' : 'buttonFlag','width' : '15%',editable : true,sortable : false,cellsalign : 'center',align : 'center',groupable : false,hidden:true}, 
			{'text' : '','datafield' : 'selectAllStatus','width' : '15%',editable : true,sortable : false,cellsalign : 'center',align : 'center',groupable : false,hidden:true}, 

			{
				text : '',
				columntype : 'checkbox',
				width : '2%',
				menu: false,
				sortable: false,
				datafield: 'selectionStatus',
				cellsalign : 'center',
				align:'center',
				columntype: 'checkbox'
				/*filterable: false,
				renderer: function () {
					return '<div><div style="margin-left: 30px; margin-top: 35px;"></div><div></div></div>';
				},
				rendered: function (element) {
		              var checkbox = $(element).last();
		              $(checkbox).jqxCheckBox({
		                  width: 16,
		                  height: 16,
		                  animationShowDelay: 0,
		                  animationHideDelay: 0
		              });
		              columnCheckBox = $(checkbox);
		              $(checkbox).on('change', function (event) {
		                  var checked = event.args.checked;
		                  var pageinfo = $("#jqxgrid").jqxGrid('getpaginginformation');
		                  var pagenum = pageinfo.pagenum;
		                  var pagesize = pageinfo.pagesize;
		                  if (checked == null || updatingCheckState) return;
		                  $("#jqxgrid").jqxGrid('beginupdate');

		                  if (checked) {
		                      $("#jqxgrid").jqxGrid('selectallrows');
		                  }
		                  else if (checked == false) {
		                      $("#jqxgrid").jqxGrid('clearselection');
		                  }

		                  var startrow = pagenum * pagesize;
		                  for (var i = startrow; i < startrow + pagesize; i++) {
		                      var boundindex = $("#jqxgrid").jqxGrid('getrowboundindex', i);
		                     // $("#jqxgrid").jqxGrid('setcellvalue', boundindex, 'selectionStatus', event.args.checked);
		                      checkUncheckBox(boundindex, 1, checked);
		                  }

		                  $("#jqxgrid").jqxGrid('endupdate');
		                  for (var i = 0; i < disabled.length; i++) {
		                      var row = disabled[i];
		                      $("#jqxgrid").jqxGrid('setcellvalue', row, "selectionStatus", false);
		                      $('#jqxgrid').jqxGrid('unselectrow', row);
		                  }
		              });
		              return true;
		          },
				cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue) {						
					checkUncheckBox(row, 0, newvalue);						
				}*/

			},
			{'text' : 'Yes','datafield' : 'reminderFlag','width' : '9%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemRenderer},
			{'text' : 'No','datafield' : 'reminderNoFlag','width' : '9%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemRendererNo},

		/*	{'text' : 'No','datafield' : 'reminderNoFlag','width' : '9%',editable : true,sortable : false,cellsalign : 'center',align : 'center',cellsrenderer : intRemRendererNo, 
			}*/
		]
	});
}

var checkUncheckBox = function(row, flag, checked){
	if(checked == false){
		$("#jqxgrid").jqxGrid('setcellvalue', row, 'selectionStatus', false);
	}else{
		$("#jqxgrid").jqxGrid('setcellvalue', row, 'selectionStatus', true);
	}
}

var updatePageState = function (pagenum) {
    var datainfo = $("#jqxgrid").jqxGrid('getdatainformation');
    var pagenum = datainfo.paginginformation.pagenum;
    var pagesize = datainfo.paginginformation.pagesize;
    var startrow = pagenum * pagesize;
    // select the rows on the page.
    $("#jqxgrid").jqxGrid('beginupdate');
    var checkedItemsCount = 0;
    for (var i = startrow; i < startrow + pagesize; i++) {
        var boundindex = $("#jqxgrid").jqxGrid('getrowboundindex', i);
        var value = $("#jqxgrid").jqxGrid('getcellvalue', boundindex, 'selectionStatus');
        if (value) checkedItemsCount++;
        if (value) {
            $("#jqxgrid").jqxGrid('selectrow', boundindex);
        } else {
            $("#jqxgrid").jqxGrid('unselectrow', boundindex);
        }
    }

    $("#jqxgrid").jqxGrid('endupdate');
    if (checkedItemsCount == pagesize) {
        columnCheckBox.jqxCheckBox({
            checked: true
        });
    } else if (checkedItemsCount == 0) {
        columnCheckBox.jqxCheckBox({
            checked: false
        });
    } else {
        columnCheckBox.jqxCheckBox({
            checked: null
        });
    }
}

$("#jqxgrid").on('pagechanged', function (event) {
    updatePageState();
});

var intRemRenderer = function(row, column, value) {
    var flagE = $("#jqxgrid").jqxGrid('getrowdata', row);
    console.log(flagE);
    if(flagE.buttonFlag == "true"){
    	 return '<a class="btn btn-sm btn-primary" type="button" id='
  		+ row
  		+ ' onclick="updateIntRemDet('
  		+ value
  		+ ')" href="javascript:void(0);" style="margin-left: 50px; margin-top: 4px;" /><i class="fa fa-check fa-lg"></i></a>'
    }else{
    	 return '<a class="btn btn-sm btn-primary"  disabled type="button" id='
 		+ row
 		+ ' onclick="updateIntRemDet('
 		+ value
 		+ ')" href="javascript:void(0);" style="margin-left: 50px; margin-top: 4px;" /><i class="fa fa-check fa-lg"></i></a>'
    }
     
}

var intRemRendererNo = function(row, column, value) {
	 var flagE = $("#jqxgrid").jqxGrid('getrowdata', row);
	    console.log(flagE);
	    if(flagE.buttonFlag == "true"){
			 return '<a class="btn btn-sm btn-primary" type="button" id='
			+ row
			+ ' onclick="updateIntRemDetNo('
			+ value
			+ ')" href="javascript:void(0);" style="margin-left: 50px; margin-top: 4px;"/><i class="fa fa-times fa-lg"></i></a>'
	    }else{
	    	 return '<a class="btn btn-sm btn-primary" disabled type="button" id='
				+ row
				+ ' onclick="updateIntRemDetNo('
				+ value
				+ ')" href="javascript:void(0);" style="margin-left: 50px; margin-top: 4px;" /><i class="fa fa-times fa-lg"></i></a>'
	    }

}

var updateIntRemDet = function(id){
	var rowdata = $("#jqxgrid").jqxGrid('getrows');
	console.log(rowdata);
	var updateData;
	$.each(rowdata,function(k,v){
		if(id == v.spNo){
			if(v.selectionStatus == "undefined" || v.selectionStatus == undefined || v.selectionStatus == false){
				$.growl.error({
					message : "Please Select row to Send Reminder !!",
					duration : 1000,
					title :'Error'
				});
				return false;
			}else if(v.selectAllStatus == false){
				var reminderYes = []
				$.each(rowdata,function(k,v){
					if(v.selectionStatus == true){
						reminderYes.push(
								{
								  "id": v.spNo,
								   "reminderFlag": "Yes",
								   "custDTO": {
								          "custId": v.custId
								        }
								  }
						);
					}
				});
				updateSpReminder(reminderYes);
			}else{
				var dataArr = [];
				$.each(rowdata,function(k,v){
					if(v.selectionStatus == true){
						dataArr.push(
								{
								  "id": v.spNo,
								   "reminderFlag": "Yes",
								   "custDTO": {
								          "custId": v.custId
								        }
								  }
						);
					}
				});
				console.log(dataArr);
				updateSpReminder(dataArr);
			}
		}
	});
	
}

var updateIntRemDetNo = function(id){
	var rowdata = $("#jqxgrid").jqxGrid('getrows');
	console.log(rowdata);
	var updateData;
	$.each(rowdata,function(k,v){
		if(id == v.spNo){
			if(v.selectionStatus == "undefined" || v.selectionStatus == undefined || v.selectionStatus == false){
				$.growl.error({
					message : "Please Select row to Send Reminder !!",
					duration : 1000,
					title :'Error'
				});
				return false;
			}else if(v.selectAllStatus == false){
				/*updateData = v;
				if(updateData != undefined){
					var reminderNo = [{"id":updateData.spNo,"reminderFlag":"No","custDTO": {"custId": updateData.custId}}]
					updateSpReminder(reminderNo);
				}*/
				
				var reminderNo = [];
				$.each(rowdata,function(k,v){
					if(v.selectionStatus == true){
						reminderNo.push(
								{
								  "id": v.spNo,
								   "reminderFlag": "No",
								   "custDTO": {
								          "custId": v.custId
								        }
								  }
						);
					}
				});
				updateSpReminder(reminderNo);
			}else{
				var dataArr = [];
				$.each(rowdata,function(k,v){
					if(v.selectionStatus == true){
						dataArr.push(
								{
								  "id": v.spNo,
								   "reminderFlag": "No",
								   "custDTO": {
								          "custId": v.custId
								        }
								  }
						);
					}
				});
				console.log(dataArr);
				updateSpReminder(dataArr);
			}
		}
	});
}

var updateSpReminder = function(remData){
	postJSON('/OrderExecution/api/v1/updateSPCustomerReminder',JSON.stringify(remData),function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 1000,
				title : 'Success'
			});
			window.location.href="javascript:showContentPage('spMesgReminder', 'bodySwitcher')"

		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 1000,
				title : 'Error'
			});
			return false;
		}
	});
}

var count = 0;
$("#selectAll").on('click',function(){
	var rowdata = $("#jqxgrid").jqxGrid('getrows');
	if(count % 2 == 0){
		$.each(rowdata,function(k,v){
			v.selectionStatus = true;
			v.custId = v.custId;
			v.custName = v.custName;
			v.selectAllStatus = true;
			console.log(v);
			if(k == 0){
				v.buttonFlag = true;
			}else{
				v.buttonFlag = false;
			}
		});
		console.log(rowdata);
		spMesgGrid(rowdata);
	}else{
		$.each(rowdata,function(k,v){
			v.selectionStatus = false;
			v.selectAllStatus = false;
			v.buttonFlag = true;
			
		});
		console.log(rowdata);
		spMesgGrid(rowdata);
	}
	count = count + 1;
});

$("#clearSM").on('click',function(){
	window.location.href="javascript:showContentPage('spMesgReminder', 'bodySwitcher')"
});
