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

var onload = function(){
$.getJSON('/OrderExecution/api/v1/exportrotationReportOnloadLovs?type=onloadLov', function(data) {
		$('#artSegmentS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.mTypes, function(key, val) {
			$('#artSegmentS').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
		
		$('#repTypeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.onloadLov, function(key, val) {
			$('#repTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
	});
}

onload();

$("#repTypeS").on('change',function(){
	if($("#repTypeS").val() != ""){
		$.getJSON('/OrderExecution/api/v1/exportrotationReportOnloadLovs?type='+$("#repTypeS").val(), function(data) {
			$('#rotRepTypeS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.list, function(key, val) {
				$('#rotRepTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
			});
		});
	}
});



var exportFieldFilters = function() {
	var fromDateS = $("#fromDateS").val();
	var toDateS = $("#toDateS").val();
	var repTypeS = $("#repTypeS").val();
	var rotRepTypeS = $("#rotRepTypeS").val();
	var artSegmentS = $("#artSegmentS").val();

	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	
	if (repTypeS != "" && repTypeS != null) {
		fieldFilters.fieldFilters["type"] = repTypeS;
	}
	if (rotRepTypeS != "" && rotRepTypeS != null) {
		fieldFilters.fieldFilters["reportType"] = rotRepTypeS;
	}
	if (artSegmentS != "" && artSegmentS != null) {
		fieldFilters.fieldFilters["articleSeg"] = artSegmentS;
	}
	
	return fieldFilters;
}

//###############  Search Grid ################## 
function exportSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [ 
		{'name' : 'date','type' : 'string','map'  : 'createdDate'},
		{'name' : 'repType','type' : 'string','map'  : 'rotationType'},
		{'name' : 'rotRepType','type' : 'string','map'  : 'rotationRepType'},
		{'name' : 'segment','type' : 'string','map'  : 'segment'},
		{'name' : 'action','type' : 'string','map'  : 'id'},
		
		{'name' : 'filePath','type' : 'string','map'  : 'filePath'},
		{'name' : 'fileName','type' : 'string','map'  : 'fileName'},
		{'name' : 'repId','type' : 'string','map'  : 'id'},

		];
	var columns = [
		{'text' : 'Id','datafield' : 'repId','width' : '5%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 

		{'text' : 'Created Date','datafield' : 'date','width' : '20%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy',
		},
		{'text' : 'Rotation Type','datafield' : 'repType','width' : '25%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
		{'text' : 'Rotation Report Type','datafield' : 'rotRepType','width' : '25%',cellsalign : 'center',align : 'center',sortable : true,editable : false},
		{'text' : 'Segment','datafield' : 'segment','width' : '20%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsformat : 'dd/MM/yyyy'},
		{'text' : '','datafield' : 'action','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,cellsrenderer : exportRenderer},
		{'text' : '','datafield' : 'filePath','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
		{'text' : '','datafield' : 'fileName','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},

		];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchRotationReportExport", "list",columns, exportFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
    	theme: 'energyblue',
    	columnsresize: true, 
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
		showstatusbar: false,
 	    statusbarheight: 30,
 	    showaggregates: false,
	});
}

var exportRenderer = function(row, column, value) {
    	return '<a class="btn btn-sm btn-primary" type="button" id='
    	+ row
    	+ ' onclick="exportDetReport('
    	+ value
    	+ ')" href="javascript:void(0);"/><i class="fa fa-file-excel-o fa-lg"></i></a>'
}

/*var exportDetReport = function(val){
	console.log(val);
	var rows = $("#jqxgrid").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');	
	
	console.log(selectedrowindex);
	console.log(rows);
	  
	  window.open(
			  '#/uf/'+val,
			  '_blank' // <- This is what makes it open in a new window.
			);
}*/

function exportDetReport(id) {
	var rows = $("#jqxgrid").jqxGrid('getrows');

	var fileName;
	var filePath;
	$.each(rows,function(k,v){
		console.log(v)
		if(v.action == id){
			fileName = v.fileName;
			filePath = v.filePath
		}
	});
    //Set the File URL.
    var url = "uf/" + filePath + "/" + fileName;
    //Create XMLHTTP Request.
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "blob";
    req.onload = function () {
        //Convert the Byte Data to BLOB object.
        var blob = new Blob([req.response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        //Check the Browser type and download the File.
        var isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob, fileName);
        } else {
            var a = document.createElement("a");
            a.setAttribute("download", fileName);
            window.location.href  = window.location.origin +"/"+ url;
            document.body.appendChild(a);
            document.body.removeChild(a);
        }
    };
    req.send();
};

$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 1000,
			title  : 'Error'
		});
		return false;
	}
	exportSearchGrid();
	$("#jqxgrid").show();
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('rotationalReportExport', 'bodySwitcher')"
});