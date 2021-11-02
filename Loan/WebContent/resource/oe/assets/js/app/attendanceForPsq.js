$("#createH").hide();
$("#createSection").hide();
$("#actionC").hide();

$("#attdCreate").on('click',function(){
	$("#createSection").show();
	$("#searchSection").hide();
	
	$("#createH").show();
	$("#home").hide();
	
	$("#actionC").show();
	$("#actionS").hide();
	
	$("#companyC").val("");
	$("#roleC").val("");
	$("#dcC").val("");
	$("#storeC").val("");
	$("#yearC").val("");
	$("#monthC").val("");
	$("#regionC").val("");
	$("#nameC").val("");
	$("#noOfDaysPresentC").val("");
	$("#noOfDaysAbsentC").val("");
	$("#save").prop('disabled',false);
});

$("#clearCreate").on('click',function(){
	$("#save").prop('disabled',false);
});

function validateNumber(val) {
	var regex = /^\d{0,9}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}

$("#back").on('click',function(){
	$("#createSection").hide();
	$("#searchSection").show();
	
	$("#createH").hide();
	$("#home").show();
	
	$("#actionC").hide();
	$("#actionS").show();
});

var onLoadFunction = function(){
	// Company
	$('#companyS').empty().append('<option value="" selected>--Select--</option>');
	$('#companyC').empty().append('<option value="" selected>--Select--</option>');

	$.getJSON('/OrderExecution/api/v1/AttendancePSQOnLoadLovs?criteria=company', function(data) {
		if(data.resCode == 1){
			$.each(data.payload.company, function(key, val) {
				$('#companyS').append('<option value="' + val.id + '">' + val.code + "-" + val.name  + '</option>');
				$('#companyC').append('<option value="' + val.id + '">' + val.code + "-" + val.name  +  '</option>');
			});
		}
	});
	
	// Years
	$('#yearS').empty().append('<option value="" selected>--Select--</option>');
	$('#yearC').empty().append('<option value="" selected>--Select--</option>');
	
	$.getJSON('/OrderExecution/api/v1/AttendancePSQOnLoadLovs?criteria=allYears', function(data) {
		if(data.resCode == 1){
			$.each(data.payload.allYears, function(key, val) {
				$('#yearS').append('<option value="' + val.id + '">'  + val.id  + '</option>');
				$('#yearC').append('<option value="' + val.id + '">' + val.id  +  '</option>');
			});
		}
	});
}

onLoadFunction();

$("#companyS").on('change',function(){
	loadRegionRoles($("#companyS").val());
});

$("#companyC").on('change',function(){
	loadRegionRoles($("#companyC").val());
});

var loadRegionRoles = function(compId){
	// Regions
	
	$('#regionS').empty().append('<option value="" selected>--Select--</option>');
	$('#regionC').empty().append('<option value="" selected>--Select--</option>');

	$.getJSON('/OrderExecution/api/v1/AttendancePSQOnLoadLovs?criteria=rList&&companyId='+compId, function(data) {
		if(data.resCode == 1){
			$.each(data.payload.rList, function(key, val) {
				$('#regionS').append('<option value="' + val.id + '">' + val.name  + '</option>');
				$('#regionC').append('<option value="' + val.id + '">' + val.name  +  '</option>');
			});
		}
	});
	
	// Role Names
	$('#roleS').empty().append('<option value="" selected>--Select--</option>');
	$('#roleC').empty().append('<option value="" selected>--Select--</option>');
	
	$.getJSON('/OrderExecution/api/v1/AttendancePSQOnLoadLovs?criteria=roleList&&companyId='+compId, function(data) {
		if(data.resCode == 1){
			$.each(data.payload.roleList, function(key, val) {
				$('#roleS').append('<option value="' + val.id + '">' + val.name  + '</option>');
				$('#roleC').append('<option value="' + val.id + '">' + val.name  +  '</option>');
			});
		}
	});
}

$("#regionS").on('change',function(){
	loadStoreDcNames($("#companyS").val() ,$("#regionS").val());
});

$("#regionC").on('change',function(){
	loadStoreDcNames($("#companyC").val() , $("#regionC").val());
});

var loadStoreDcNames = function(compId,regId){
	
	// DC Names
	$('#dcS').empty().append('<option value="" selected>--Select--</option>');
	$('#dcC').empty().append('<option value="" selected>--Select--</option>');

	$.getJSON('/OrderExecution/api/v1/AttendancePSQOnLoadLovs?criteria=allDc&&companyId='+compId+'&&RegionId='+regId, function(data) {
		if(data.resCode == 1){
			$.each(data.payload.allDc, function(key, val) {
				$('#dcS').append('<option value="' + val.id + '">' + val.name  + '</option>');
				$('#dcC').append('<option value="' + val.id + '">' + val.name  +  '</option>');
			});
		}
	});
	
	
	// Store Names
	$('#storeS').empty().append('<option value="" selected>--Select--</option>');
	$('#storeC').empty().append('<option value="" selected>--Select--</option>');
	
	$.getJSON('/OrderExecution/api/v1/AttendancePSQOnLoadLovs?criteria=allStores&&companyId='+compId+'&&RegionId='+regId, function(data) {
		if(data.resCode == 1){
			$.each(data.payload.allStores, function(key, val) {
				$('#storeS').append('<option value="' + val.id + '">' + val.name  + '</option>');
				$('#storeC').append('<option value="' + val.id + '">' + val.name  +  '</option>');
			});
		}
	});
}

$("#yearS").on('change',function(){
	getMonths($("#yearS").val());
});

$("#yearC").on('change',function(){
	getMonths($("#yearC").val());
});

var getMonths = function(year){
	// Months
	$('#monthS').empty().append('<option value="" selected>--Select--</option>');
	$('#monthC').empty().append('<option value="" selected>--Select--</option>');
	
	$.getJSON('/OrderExecution/api/v1/AttendancePSQOnLoadLovs?criteria=yearMonths&&year='+year, function(data) {
	 if(data.resCode == 1){	
		$.each(data.payload.yearMonths, function(key, val) {
			$('#monthS').append('<option value="' + val.id + '">' + val.name  + '</option>');
			$('#monthC').append('<option value="' + val.id + '">' + val.name  +  '</option>');
		});
	  }
	});
}

$("#monthS").on('change',function(){
	var month = $("#monthS").val();
	getEmployees('search');
});

$("#monthC").on('change',function(){
	var month = $("#monthC").val();
	
	getEmployees('create');
	
});


var getEmployees = function(type){
	var cId,role,dc,store,year,month;
	
	if(type == 'search'){
	 cId = $("#companyS").val();
	 role = $("#roleS").val();
	 dc = $("#dcS").val();
	 store = $("#storeS").val();
	 year = $("#yearS").val();
	 month = $("#monthS").val();
	}
	else if(type == 'create'){
	 cId = $("#companyC").val();
	 role = $("#roleC").val();
	 dc = $("#dcC").val();
	 store = $("#storeC").val();
	 year = $("#yearC").val();
	 month = $("#monthC").val();
	}
	
	$('#nameS').empty().append('<option value="" selected>--Select--</option>');
	$('#nameC').empty().append('<option value="" selected>--Select--</option>');
	
	$.getJSON('/OrderExecution/api/v1/AttendancePSQOnLoadLovs?criteria=employee'+'&&month='+month+'&&year='+year+'&&companyId='+cId+'&&roleId='+role+'&&storeId='+store+'&&dcId='+dc, function(data) {
		if(data.resCode == 1){
			$.each(data.payload.employee, function(key, val) {
				$('#nameS').append('<option value="' + val.hrmsId + '" idE = '+ val.saleNonSaleFlag +'>' + val.name + '</option>');
				$('#nameC').append('<option value="' + val.hrmsId + '" idE = '+ val.saleNonSaleFlag +'>' + val.name + '</option>');
			});
		}
	});
}

$("#nameC").on('change',function(){
	var month = $("#monthC").val();
	var year = $("#yearC").val();
	var hrmsId = $("#nameC").val();
	
	$.getJSON('/OrderExecution/api/v1/AttendancePSQOnLoadLovs?criteria=noOfDaysPresentAB&&month='+month+'&&year='+year+'&&hrmsId='+hrmsId, function(data) {
		if(data.resCode == 1){
			$("#maxDaysC").val(data.payload.noOfDaysPresentAB.noOfDaysPesent);
		}
	});
});

$("#noOfDaysPresentC").on('blur',function(){
	var maxDays = $("#maxDaysC").val();
	var noOfDaysPresent = $("#noOfDaysPresentC").val();
	 console.log(maxDays);
	
	if(noOfDaysPresent <= 0){
		$("#noOfDaysPresentC").val("");
		$.growl.error({
			message : "Please Enter Valid No of Days Present !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	else if(maxDays != ""  && parseFloat(noOfDaysPresent) > parseFloat(maxDays)
			){
		$("#noOfDaysPresentC").val("");
		$.growl.error({
			message : "No of Days Present Cannot be More Than "+maxDays + " !!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		if(maxDays != ""){
			var noOfDaysAbsent = maxDays - noOfDaysPresent;
			$("#noOfDaysAbsentC").val(noOfDaysAbsent);
		}else{
			$("#noOfDaysAbsentC").val(0);
			$("#noOfDaysPresentC").val(0);
		}
	}
	
});

$("#save").on('click',function(){
	var cId = $("#companyC").val();
	var role = $("#roleC").val();
	var dc = $("#dcC").val();
	var store = $("#storeC").val();
	var year = $("#yearC").val();
	var month = $("#monthC").val();
	
	var region = $("#regionC").val();
	var empName = $("#nameC").val();
	var noOfDaysPresent = $("#noOfDaysPresentC").val();
	var noOfDaysAbsent = $("#noOfDaysAbsentC").val();
	
	if(cId == "" || role == "" || dc == "" || store == "" || year == "" || month == ""|| 
			region == "" || empName == "" || noOfDaysPresent == "" ){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else if(noOfDaysPresent == 0){
		$.growl.error({
			message : "Number of Days Present Cannot be 0 !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	else{
		var createData = [{
			"employee": {
		      "hrms_id": $("#nameC").val(),
		      "saleNonSaleFlag": $("#nameC option:selected").attr('idE'),
			 },
		      "role": { "id":$("#roleC").val()},
		      "company": {"id": $("#companyC").val()},
		      "region": {"id": $("#regionC").val()},
		      "dc": {"id": $("#dcC").val()},
		      "store": {"storeId": $("#storeC").val()},
		      "month": $("#monthC").val(),
		      "year": $("#yearC").val(),
			  "createOrUploadType":"PSQCreate",
		      "noOfDaysPesent": $("#noOfDaysPresentC").val(),
		      "noOfDaysAbscent":  $("#noOfDaysAbsentC").val()
			}];
		}
	if(createData){
		postJSON('/OrderExecution/api/v1/createOrUploadAttendancePSQ',JSON.stringify(createData),function(data) {
			if(data.resCode == 1) {			
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});				
				$("#save").prop('disabled',true);
				
				$("#companyC").val("");
				$("#roleC").val("");
				$("#dcC").val("");
				$("#storeC").val("");
				$("#yearC").val("");
				$("#monthC").val("");
				$("#regionC").val("");
				$("#nameC").val("");
				$("#noOfDaysPresentC").val("");
				$("#noOfDaysAbsentC").val("");
			} else {
				$("#save").prop('disabled',false);
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
					$("#saveSplitGrv").prop('disabled',false);
				 }
		    });
	}
});

// search functionality
var attendanceForPsqFieldFilters = function() {
	var companyS = $("#companyS").val();
	var regionS = $("#regionS").val();
	var dcS = $("#dcS").val();
	var storeS = $("#storeS").val();
	var roleS = $("#roleS").val();
	var yearS = $("#yearS").val();
	var monthS = $("#monthS").val();
	var nameS = $("#nameS").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (companyS != "" && companyS != null) {
		fieldFilters.fieldFilters["company"] = companyS;
	}
	if (regionS != "" && regionS != null) {
		fieldFilters.fieldFilters["region"] = regionS;
	}
	if (dcS != "" && dcS != null) {
		fieldFilters.fieldFilters["dc"] = dcS;
	}
	if (storeS != "" && storeS != null) {
		fieldFilters.fieldFilters["store"] = storeS;
	}
	if (roleS != "" && roleS != null) {
		fieldFilters.fieldFilters["role"] = roleS;
	}
	if (yearS != "" && yearS != null) {
		fieldFilters.fieldFilters["PSQYear"] = yearS;
	}
	if (monthS != "" && monthS != null) {
		fieldFilters.fieldFilters["PSQMonth"] = monthS;
	}
	if (nameS != "" && nameS != null) {
		fieldFilters.fieldFilters["EmpId"] = nameS;
	}
	fieldFilters.fieldFilters["PSQType"] = "AttendancePSQ";
	return fieldFilters;
}

//###############  Search Grid ################## 
function attendanceSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ 
		{'name' : 'slNo','type' : 'long','map'  : 'id'},
		{'name' : 'name','type' : 'string','map'  : 'employee>name'},
		{'name' : 'role','type' : 'long','map'  : 'role>name'},
		{'name' : 'company','type' : 'long','map'  : 'company>compName'}, 
		{'name' : 'region','type' : 'int','map'  : 'region>name'},
		{'name' : 'dc','type' : 'long','map'  : 'dc>dcname'}, 
		{'name' : 'store','type' : 'long','map'  : 'store>name'},
		{'name' : 'monthYear','type' : 'long','map'  : 'month'},
		{'name' : 'year','type' : 'long','map'  : 'year'},

		{'name' : 'noOfDaysPesent','type' : 'long','map'  : 'noOfDaysPesent'}, 
		{'name' : 'noOfDaysAbscent','type' : 'long','map'  : 'noOfDaysAbscent'},
		{'name': 'actionIdD','type':'long','map':'id'}
		
		];
	var columns = [
		
		{'text' : 'Attendance Id','datafield' : 'slNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
		{'text' : 'Name','datafield' : 'name','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Role','datafield' : 'role','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{'text' : 'Company','datafield' : 'company','width' : '12%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Region','datafield' : 'region','width' : '10%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'DC','datafield' : 'dc',editable : false,cellsalign : 'center',align : 'center',sortable : true,'width' : '12%'},
		{'text' : 'Store','datafield' : 'store',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '10%'},
		{'text' : 'Month/Year','datafield' : 'year',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '8%',
			  cellsrenderer: function(row, column, value){
				 var month =  $("#jqxgrid").jqxGrid("getcellvalue",row,"monthYear");
				 var year =  $("#jqxgrid").jqxGrid("getcellvalue",row,"year");

		      	 return "<div align='center'style='margin-top:8px;'>"+ month + "/" + year +"</div>";
		      	} 
		},

		{'text' : 'Month/Year','datafield' : 'monthYear',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '10%',hidden:true},
		{'text' : 'No of Days Present','datafield' : 'noOfDaysPesent',editable : false,cellsalign : 'center',align : 'center',sortable : false,'width' : '10%'},
		{'text' : 'No of Days Absent','datafield' : 'noOfDaysAbscent','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
		{
			text : '',
			datafield : 'actionIdD',
			cellsrenderer : deleteAttendance,
			editable : false,
			cellsalign : 'center',
			align : 'center',
			filterable: false,
			sortable : false,
			'width' : '3%'
		}
		];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchPSQ", "list",columns, attendanceForPsqFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
	});
}

$("#search").on('click',function(){
	attendanceSearchGrid();
	$("#jqxgrid").show();
});

var deleteAttendance = function (row, columnfield, value, defaulthtml, columnproperties) {
	return '<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#maintainDcDetailsE"  type="button" id='
	+ row
	+ ' onclick="deleteAttendanceFunc('
	+ value
	+ ')"/><i class="fa fa-trash fa-sm"></i></button>'
}

var deleteAttendanceFunc = function(id){
	$.getJSON('/OrderExecution/api/v1/deleteAttendancePSQ?psqId='+id, function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			attendanceSearchGrid();
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
}

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('attendanceForPsq', 'bodySwitcher')"
});


//######################################## Upload Function ###########################################
//Download function for Customer Order Due
$("#downloadTemplate").on("click",function() {
	var data;
	var newData = [];
     var sysdate = moment().format('DDMMYYYYHHmmSS');
     
    	 newData.push({
    		 	'Srl_No' : "",
				'HRMS_ID' : "",
				'HRMS_ID_Name' : "",
                'Days_Present' : "",
                'Days_Absent' : "",
				'Month' : "",
                'Year' : ""
               });
           var opts = [{sheetid:'Purity_Testing',header:true}];
           var res = alasql('SELECT * INTO XLSX("DownloadAttendancePSQ.xlsx",?) FROM ?',  [opts,[newData]]);
});


function captureFileSelectEvent(event)
{
	fileEvent = event;
}

function HandleUploadExcelFile()
{
	// Check if file select event is captured
	if (fileEvent == null || (fileEvent != null && $.type(fileEvent) != "object"))
	{
		alert("Please select the data Excel file to load!");
		return;
	}

	var event = fileEvent;
    try {
	    alasql('SELECT * FROM FILE(?,{headers:true})', [event], function(data){
	        // Process data here if any conversion or validation is required!
			if (data != null)
			{
				var cols = getColumnHeaders(data);
				if (cols != null && cols.length > 0) {
				}
				else {
					alert("No data found in the uploaded file...");
				}
				
				var uploadData = [];
				var uploadObj = {};
				$.each(data,function(k,v){
					uploadObj = {
						"employee": {
					      "hrms_id": v.HRMS_ID.toString(),
						},
					    "month": v.Month.toString(),
					    "year": v.Year.toString(),
						"createOrUploadType":"PSQUpload",
					    "noOfDaysPesent": v.Days_Present,
					    "noOfDaysAbscent": v.Days_Absent
					}
					uploadData.push(uploadObj);
				});
				
				// Calling API to upload Attendance Details.
				 postJSON('/OrderExecution/api/v1/createOrUploadAttendancePSQ', JSON.stringify(uploadData), function(response) {
					if (response.resCode == 1) {
						$.growl.notice({
							message : response.mesgStr,
							duration : 10000,
							title : 'Success'
						});
						return false;
					}else {
						$.growl.error({
							message : response.mesgStr,
							duration : 10000
						});
						return false;
					}
					
				});
				
			}
			else {
				alert("Invalid data in the uploaded file...");
			}

	    });	    	
    }
	catch(err) {
		alert('Upload Error: ', err);
	};

	//change the 'testUpload' to the input id in your page
	document.getElementById("uploadAttd").value = "";
	fileEvent = null;
 }
