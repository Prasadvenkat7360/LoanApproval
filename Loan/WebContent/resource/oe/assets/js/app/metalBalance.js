/*
## AUTHOR : Manaronjan 
## AUTHOR 2: mani prasad 
## DATE : 18-02-2017 
## DESC : METAL BALANCE REPORT HAVING SEARCH AND EXPORT FUNCTIONALITY
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

$("#storeDcAll").hide();
$("#regionLov").on('change',function(){
	var regionLovObj = $('#regionLovObj').val();
	console.log(regionLovObj.length);
    if(regionLovObj.length > 0){
    	$("#storeDcAll").show();
    }
});

$("#locationType").on('change',function(){
	$("#segmentLov").val("");
});

$("#selectStoreDC").on('change',function(){
	$("#segmentLov").val("");
});

$("#storeDiv").on('change',function(){
	$("#segmentLov").val("");
});

$("#dcDiv").on('change',function(){
	$("#segmentLov").val("");
});
//loadPermission();
$('#segmentLov').on('change', function(){
	var segmentLov = $("#segmentLov").val();
	var storeDcType = $("#selectStoreDC").val();
	var storeIds = $("#storeNameObj").val();
	var dcIds = $("#dcNameObj").val();
	var region = $("#regionLovObj").val();
	console.log(dcIds);
	console.log(storeIds);
	var storeLov = "";
	var dcLov = "";
	var matTypeLov = "";
	var materialType = $("#locationTypeObj").val();
	
	if(storeDcType == "store" && storeIds != "" && storeIds != null){
		storeLov = storeIds.join(","); 
	}
	if(storeDcType == "dc" ||storeDcType == "all"  && dcIds != " " && dcIds != null){
		dcLov = dcIds.join(",");
	}
	if(materialType != "" && materialType != null){
		matTypeLov = materialType.join(",");
	}
	if(materialType == null){
		$.growl.error({
			message : "Please Select All Mandatory to Get Locations !!!",
			duration : 10000,
			title :'Error'
		});
		return false;
	}
	var storeDCType;
	if(storeDcType != ""){
		if(storeDcType == "store"){
			storeDCType = "Store"
		}else if(storeDcType == "dc"){
			storeDCType = "DC"
		}else if(storeDcType == "all"){
			storeDCType = "all"
		}
	}
	var params = {
			"fieldFilters" : {
				"segmentId" : segmentLov,
				"storeOrDcType" : storeDCType,
				"storeOrDcIds" : (storeDcType == "store") ? storeLov : dcLov,
				"locationType" : matTypeLov
			}
	}
	
	if( $("#segmentLov").val() != ""){
		$('#location').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/stockOfMetalLocation',JSON.stringify(params),function(data) {
			if(data.resCode == "1"){
				$.each(data.payload.locationList, function(key, val) {
					$('#location').append('<option value="' + val.name + '">' + val.name + '</option>');
				});
			}else{
				$.growl.error({
					message : "Please Select All Mandatory Get Locations !!!",
					duration : 10000,
					title :'Error'
				});
				return false;
			}
		});
	}
	
});

$( document ).ready(function() {
	$("#storeNameObj").multiselect("disable");
	$("#dcNameObj").multiselect("disable");
});

var storeLength,dcLength;
$('#selectStoreDC').on('change', function(){
	var selectedVal = $(this).val();
	var regionLovObj = $('#regionLovObj').val();
	var regionLov = "";
	if(regionLovObj != null && regionLovObj != ""){
		regionLov = regionLovObj.join(",");
	}
	if(selectedVal == "store"){
		$("#storeNameObj").multiselect("enable");
		$("#dcNameObj").multiselect("disable");
		$('#dcNameObj').multiselect("clearSelection");
		if(regionLov != null && regionLov != ""){
			$.getJSON('/OrderExecution/api/v1/getStoreByRegions?type='+ selectedVal + '&ids=' + regionLov, function(data) {
				var storeLov = data.payload.allStores;
				storeLength = storeLov.length;
				var s = '<select id="storeNameObj" class="form-control" multiple="multiple">';   
				$.each(storeLov, function(key, val) {
					s +='<option value="' + val.id + '">' + val.name + '</option>';
				});
				s +='</select>'; 
				$("#storeName").html(s);
				$('#storeNameObj').multiselect({ 
		            includeSelectAllOption: true,
		            enableFiltering:false,         
		            maxHeight:250,
		            numberDisplayed:1,
		            buttonClass: 'col-md-12 form-control text-left'
		      	});
			});
		}else{
			$.growl
			.error({
				message : "Please Select Region",
				duration : 10000
			});
		}
		$("#storeDiv").show();
		$("#dcDiv").hide();
	}else if(selectedVal == "dc"){
		$("#storeNameObj").multiselect("disable");
		$('#storeNameObj').multiselect("clearSelection");
		$("#dcNameObj").multiselect("enable");
		var storeDcType ;
		if(selectedVal == "all"){
			storeDcType = "dc";
		}else{
			storeDcType = "dc";
		}
		if(regionLov != null && regionLov != ""){
			$.getJSON('/OrderExecution/api/v1/getStoreByRegions?type='+ storeDcType + '&ids=' + regionLov, function(data) {
				var dcLov = data.payload.allDc;
				dcLength = dcLov.length;
				var d = '<select id="dcNameObj" class="form-control" multiple="multiple">';   
				$.each(dcLov, function(key, val) {
					d +='<option value="' + val.id + '">' + val.name + '</option>';
				});
				d +='</select>'; 
				$("#dcName").html(d);
				$('#dcNameObj').multiselect({ 
		            includeSelectAllOption: true,
		            enableFiltering:false,         
		            maxHeight:250,
		            numberDisplayed:1,
		            buttonClass: 'col-md-12 form-control text-left'
		      	});
			});
		}else{
			$.growl
			.error({
				message : "Please Select Region",
				duration : 10000
			});
		}	
		$("#storeDiv").hide();
		$("#dcDiv").show();
	}else{
		$("#storeNameObj").multiselect("disable");
		$("#dcNameObj").multiselect("disable");
		$('#storeNameObj').multiselect("clearSelection");
		$('#dcNameObj').multiselect("clearSelection");
		$("#storeDiv").hide();
		$("#dcDiv").hide();
	}
});

//On Load API for LOV
var onLoadMetalBalance = function() {

	// GET JSON API CALL

	$.getJSON('/OrderExecution/api/v1/stockOfMetalLOV', function(data) {
		var companyLov = data.payload.clist;
		var bussinessLov = data.payload.blist;
		var regionLov = data.payload.rList;
		var segmentLov = data.payload.sTypes;
		var storeLov = data.payload.allStores;
		var dcLov = data.payload.allDc;
		var locationType = data.payload.RawOrFG;

			// company region
	
		var r = '<select id="regionLovObj" class="form-control" multiple="multiple">';   
		$.each(regionLov, function(key, val) {
			r +='<option value="' + val.id + '">' + val.name + '</option>';
		});
		r +='</select>'; 
		$("#regionLov").html(r);
		$('#regionLovObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left',
            onChange:function(option, checked){
            	$('#selectStoreDC').val();
        		$('#storeNameObj').multiselect("clearSelection");
        		$('#dcNameObj').multiselect("clearSelection");
        		$("#storeDiv").hide();
        		$("#dcDiv").hide();
            },
            onSelectAll : function(checked){
            	$('#selectStoreDC').val();
        		$('#storeNameObj').multiselect("clearSelection");
        		$('#dcNameObj').multiselect("clearSelection");
        		$("#storeDiv").hide();
        		$("#dcDiv").hide();
            }
      	});
		
		$("#storeDiv").hide();
		$("#dcDiv").hide();
		// company Segment
		$.each(segmentLov, function(key, val) {
			$('#segmentLov').append(
					'<option  value="' + val.id + '">' + val.description
							+ '</option>');
		});
		
		// Location Type
		var l = '<select id="locationTypeObj" name="locationTypeObj" class="form-control" multiple="multiple">';   
		$.each(locationType, function(key, val) {
			if(val.id != 'T'){
				l +='<option value="' + val.id + '">' + val.name + '</option>';
			}
		});
		l +='</select>'; 
		$("#locationType").html(l);
		$('#locationTypeObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});

	});

}

onLoadMetalBalance();

// Metal Balance Field Filter
var metalBalanceFieldFilters = function(locationType) {
	var segmentLov = $('#segmentLov').val();
	var storeNameObj = $('#storeNameObj').val();
	var location = $('#location').val();
	if(storeNameObj == null || storeNameObj == ""){
		var storeName = "";
	}else{
		var storeName = storeNameObj.join(",");
	}
	
	var dcNameObj = $('#dcNameObj').val();
	if(dcNameObj == null || dcNameObj == ""){
		var dcName = "";
	}else{
		var dcName = dcNameObj.join(",");
	}
	
	var metalBalanceFrom = $('#metalBalanceFrom').val();
	var metalBalanceto = $('#metalBalanceto').val();
	
	var storeordcCode = $('#selectStoreDC').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if(storeordcCode == "store"){
		fieldFilters.fieldFilters["storeOrDCType"] = "Store";
		
		//fieldFilters.fieldFilters["storeOrDCIds"] = storeName;
		if(storeLength == storeNameObj.length){
			fieldFilters.fieldFilters["storeOrDCIds"] = "All";
		}else{
			fieldFilters.fieldFilters["storeOrDCIds"] = storeName;
		}
		//fieldFilters.fieldFilters["storeOrDCIds"] = storeName;
	}else if(storeordcCode == "dc"){
		fieldFilters.fieldFilters["storeOrDCType"] = "DC";
	//	fieldFilters.fieldFilters["storeOrDCIds"] = dcName;
		
		if(dcLength == dcNameObj.length){
			fieldFilters.fieldFilters["storeOrDCIds"] = "All";
		}else{
			fieldFilters.fieldFilters["storeOrDCIds"] = dcName;
		}
	}else if(storeordcCode == "all"){
		fieldFilters.fieldFilters["storeOrDCType"] = "All";
	}

	if (segmentLov != "" && segmentLov != null) {
		fieldFilters.fieldFilters["segmentId"] = segmentLov;
	}
	if (location != "" && location != null) {
		fieldFilters.fieldFilters["location"] = location;
	}
	if (metalBalanceFrom != "" && metalBalanceFrom != null) {
		fieldFilters.fieldFilters["fromDate"] = metalBalanceFrom;
	}

	if (metalBalanceto != "" && metalBalanceto != null) {
		fieldFilters.fieldFilters["toDate"] = metalBalanceto;
	}

	if (locationType != "" && locationType != null) {
		fieldFilters.fieldFilters["materialType"] = "'"+locationType+"'";
	}
	return fieldFilters;
}

function metalBalanceGrid(locationType) {
	var updateRows = function(rowid, newdata, commit) {
		commit;
	}
	var datafields = [ 
		{ 'name' : 'storeDCType', 'type' : 'string', 'map'  : 'storeOrDC',},
		{ 'name' : 'segment', 'type' : 'string', 'map'  : 'segmentDesc'},
		{ 'name' : 'materialType', 'type' : 'string', 'map'  : 'materialType'},
		{ 'name' : 'locationCode', 'type' : 'string'}, 
		{ 'name' : 'locationName', 'type' : 'string'}, 
		{ 'name' : 'openGross', 'type' : 'decimal', 'map'  : 'openingGwt'},
		{ 'name' : 'openNet', 'type' : 'decimal', 'map'  : 'openingNwt'},
		{ 'name' : 'openPure', 'type' : 'decimal', 'map'  : 'openingPwt'}, 
		{ 'name' : 'recptGross', 'type' : 'decimal', 'map'  : 'recptGwt'}, 
		{ 'name' : 'recptNet', 'type' : 'decimal', 'map'  : 'recptNwt'},
		{ 'name' : 'recptPure', 'type' : 'decimal', 'map'  : 'recptPwt'},
		{ 'name' : 'issueGross', 'type' : 'decimal', 'map'  : 'issGwt'}, 
		{ 'name' : 'issueNet', 'type' : 'decimal', 'map'  : 'issNwt'}, 
		{ 'name' : 'issuePure', 'type' : 'decimal', 'map'  : 'issPwt'}, 
		{ 'name' : 'closeGross', 'type' : 'decimal', 'map'  : 'cloGwt'}, 
		{ 'name' : 'closeNet', 'type' : 'decimal', 'map'  : 'cloNwt'}, 
		{ 'name' : 'closePure', 'type' : 'decimal', 'map'  : 'cloPwt'}, 
		{ 'name' : 'compCloseGross', 'type' : 'decimal', 'map'  : 'compClosedGwt'},
		{ 'name' : 'compCloseNet', 'type' : 'decimal', 'map'  : 'compClosedNwt'}, 
		{ 'name' : 'compClosePure', 'type' : 'decimal', 'map'  : 'compClosedPwt'}
	];
		
	var columns = [
		{ 'text' : 'Store/DC/All', 'datafield' : 'storeDCType', 'width' : '5%', 'height' : '4%', editable : false, cellsalign: 'center', align: 'center', sortable : true},
		{ 'text' : 'Segment', 'datafield' : 'segment', 'width' : '5%', 'height' : '4%', editable : false, cellsalign: 'center', align: 'center', sortable : false},
		{ 'text' : 'Material Type', 'datafield' : 'materialType', 'width' : '4%', 'height' : '4%', editable : false, cellsalign: 'center', align: 'center', sortable : false},
		{ 'text' : 'Location Code', 'datafield' : 'locationCode', 'width' : '4%', 'height' : '4%', editable : false, cellsalign: 'center', align: 'center', sortable : false},
		{ 'text' : 'Location Name', 'datafield' : 'locationName', 'width' : '7%', 'height' : '4%', editable : false, cellsalign: 'center', align: 'center', sortable : false},
		{ 'text' : 'Gross Wt.', 'datafield' : 'openGross', 'width' : '9%', 'height' : '4%', editable : false, cellsalign: 'right', align: 'center', cellsformat : 'd3', sortable : false, columngroup : "ad",
			aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['openGross'] == null) ? 0 : parseFloat(record['openGross'] == '' ? 0 : record['openGross']);
        			  return aggregatedValue + (total == 'NaN' ? 0 : total);
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {     
        		  aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
        		  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' +  aggregates["Total"] + '</span>';
        	  } 
		},
		{ 'text' : 'Net Wt.', 'datafield' : 'openNet', 'width' : '9%', 'height' : '4%', cellsformat : 'd3', cellsalign: 'right', align: 'center', editable : false, columngroup : "ad",
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['openNet'] == null) ? 0 : parseFloat(record['openNet'] == '' ? 0 : record['openNet']);
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {     
      		  aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      		  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  } 
		}, 
		{ 'text' : 'Pure Wt.', 'datafield' : 'openPure', 'width' : '9%', 'height' : '4%', cellsformat : 'd3', editable : false, cellsalign: 'right', align: 'center', columngroup : "ad",
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['openPure'] == null) ? 0 : parseFloat(record['openPure'] == '' ? 0 : record['openPure']);
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {        		 
      		  aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      		  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  }
		},
		{ 'text' : 'Gross Wt.', 'datafield' : 'recptGross', 'width' : '9%', 'height' : '4%', cellsformat : 'd3', editable : false, sortable : false, cellsalign: 'right', align: 'center', columngroup : "cbt",
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['recptGross'] == null) ? 0 : parseFloat(parseFloat(record['recptGross'] == '' ? 0 : record['recptGross']));
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {  
      		aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      		return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  } 
		},
		{ 'text' : 'Net Wt.', 'datafield' : 'recptNet', 'width' : '9%', 'height' : '4%', cellsformat : 'd3', editable : false, cellsalign: 'right', align: 'center', sortable : false, columngroup : "cbt",
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['recptNet'] == null) ? 0 : parseFloat(parseFloat(record['recptNet'] == '' ? 0 : record['recptNet']));
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {   
      		aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  } 
		},
		{ 'text' : 'Pure Wt.', 'datafield' : 'recptPure', 'width' : '9%', 'height' : '4%', cellsformat : 'd3', editable : false, cellsalign: 'right', align: 'center', sortable : false, columngroup : "cbt",
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['recptPure'] == null) ? 0 : parseFloat(parseFloat(record['recptPure'] == '' ? 0 : record['recptPure']));
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {     
      		aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  } 
		},
		{ 'text' : 'Gross Wt.', 'datafield' : 'issueGross', 'width' : '9%', 'height' : '4%', cellsformat : 'd3', cellsalign: 'right', align: 'center', editable : false, columngroup : "cbl",
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['issueGross'] == null) ? 0 : parseFloat(parseFloat(record['issueGross'] == '' ? 0 : record['issueGross']));
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {
      		aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  } 
		},
		{ 'text' : 'Net Wt.','datafield' : 'issueNet','width' : '9%', 'height' : '4%', cellsformat : 'd3', cellsalign: 'right', align: 'center', editable : false, columngroup : "cbl",
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['issueNet'] == null) ? 0 : parseFloat(parseFloat(record['issueNet'] == '' ? 0 : record['issueNet']));
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {      
      		aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  } 
		}, 
		{ 'text' : 'Pure Wt.', 'datafield' : 'issuePure', 'width' : '9%', 'height' : '4%', cellsalign: 'right', align: 'center', cellsformat : 'd3', editable : false, columngroup : "cbl", 
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['issuePure'] == null) ? 0 : parseFloat(parseFloat(record['issuePure'] == '' ? 0 : record['issuePure']));
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {     
      		aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  } 
		},
		{ 'text' : 'Gross Wt.', 'datafield' : 'closeGross', 'width' : '9%', 'height' : '4%', cellsalign: 'right', align: 'center', cellsformat : 'd3', editable : false, columngroup : "diff", 
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['closeGross'] == null) ? 0 : parseFloat(parseFloat(record['closeGross'] == '' ? 0 : record['closeGross']));
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {   
      		aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  } 
		}, 
		{ 'text' : 'Net Wt.', 'datafield' : 'closeNet', 'width' : '9%', 'height' : '4%', cellsformat : 'd3', cellsalign: 'right', align: 'center', editable : false, columngroup : "diff", 
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['closeNet'] == null) ? 0 : parseFloat(parseFloat(record['closeNet'] == '' ? 0 : record['closeNet']));
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {     
      		aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  } 
		},
		{ 'text' : 'Pure Wt.', 'datafield' : 'closePure', 'width' : '9%', 'height' : '5%', cellsalign: 'right', align: 'center', cellsformat : 'd3', editable : false, columngroup : "diff", 
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['closePure'] == null) ? 0 : parseFloat(parseFloat(record['closePure'] == '' ? 0 : record['closePure']));
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {      
      		aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  } 
		},
		{ 'text' : 'Gross Wt.', 'datafield' : 'compCloseGross', 'width' : '9%', 'height' : '4%', cellsalign: 'right', align: 'center', cellsformat : 'd3', editable : false, columngroup : "compClsBl", 
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['compCloseGross'] == null) ? 0 : parseFloat(parseFloat(record['compCloseGross'] == '' ? 0 : record['compCloseGross']));
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {   
      		aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  } 
		},
		{ 'text' : 'Net Wt.', 'datafield' : 'compCloseNet', 'width' : '9%', 'height' : '4%', cellsformat : 'd3', cellsalign: 'right', align: 'center', editable : false, columngroup : "compClsBl", 
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['compCloseNet'] == null) ? 0 : parseFloat(parseFloat(record['compCloseNet'] == '' ? 0 : record['compCloseNet']));
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {      
      		aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  } 
		},
		{ 'text' : 'Pure Wt.', 'datafield' : 'compClosePure', 'width' : '9%', 'height' : '4%', cellsalign: 'right', align: 'center', cellsformat : 'd3', editable : false, columngroup : "compClsBl", 
			aggregates: [{          
      		  'Total': function(aggregatedValue, currentValue, column, record) {
  				  var total = (record['compClosePure'] == null) ? 0 : parseFloat(parseFloat(record['compClosePure'] == '' ? 0 : record['compClosePure']));
      			  return aggregatedValue + total;
      		  }
      	  }],
      	  aggregatesrenderer: function(aggregates) {   
      		aggregates["Total"] = (aggregates.Total == null ? 0 : aggregates["Total"]);
      			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
      	  } 
		}
	];
	
	var columngroups = [ 
		{ text : 'Opening Balance', name : 'ad', width:'20%', height:'8%', align : 'center'}, 
		{ text : 'Receipt Balance', name : 'cbt', width:'20%', height:'8%', align : 'center'},
		{ text : 'Issue Balance', name : 'cbl', width:'20%', height:'8%', align : 'center'},
		{ text : 'Closing Balance', name : 'diff', width:'20%', height:'8%', align : 'center'},
		{ text : 'Computed Closing Balance', name : 'compClsBl', width:'20%', height:'8%', align : 'center'}
	];
	
	sourceRM = {
		datafields : datafields,
		data : metalBalanceFieldFilters('R'),
		url : '/OrderExecution/api/v1/stockOfMetalList',
		datatype : 'json',
		type : 'post',
		root : "list",
		contentType : 'application/json',
		beforeprocessing : beforeprocessingRM,
		pagesize : 20,
		sort : sort,
		sortColumn : 'storeDCType',
		sortdirection : 'asc',
		updaterow : updateRows
	};
	sourceFG = {
		datafields : datafields,
		data : metalBalanceFieldFilters('F'),
		url : '/OrderExecution/api/v1/stockOfMetalList',
		datatype : 'json',
		type : 'post',
		root : "list",
		contentType : 'application/json',
		beforeprocessing : beforeprocessingFG,
		pagesize : 20,
		sort : sort,
		sortColumn : 'storeDCType',
		sortdirection : 'asc',
		updaterow : updateRows
	};
	

	var dataAdapterRM = new $.jqx.dataAdapter(sourceRM, {
		formatData : requestData
	});
	var dataAdapterFG = new $.jqx.dataAdapter(sourceFG, {
		formatData : requestData
	});
	
	function beforeprocessingRM(data) {
		if (undefined == data.payload.list){
			data.payload.list = [];
		}
		sourceRM.totalrecords = data.payload.size ? data.payload.size : 0;
	}

	function beforeprocessingFG(data) {
		if (undefined == data.payload.list) {
			data.payload.list = [];
		}
		sourceFG.totalrecords = data.payload.size ? data.payload.size : 0;
	}
	
	if(locationType == 'R'){
		$("#rmGrid").jqxGrid({source : dataAdapterRM, width : '100%', columnsresize : true, selectionmode : 'singlecell', columns : columns, sortable : 'true',
			pageable : 'true', virtualmode : 'true', pagermode : 'simple', rendergridrows : rendergridrows, showsortmenuitems : false, autoheight : true, altrows : true,
			showaggregates: true, showstatusbar: true, statusbarheight: 30, columnsheight : 25,theme: 'energyblue', columngroups : columngroups});
	}else if(locationType == 'F'){
		$("#fgGrid").jqxGrid({source : dataAdapterFG, width : '100%', columnsresize : true, selectionmode : 'singlecell', columns : columns, sortable : 'true',
			pageable : 'true', virtualmode : 'true', pagermode : 'simple', rendergridrows : rendergridrows, showsortmenuitems : false, autoheight : true, altrows : true,
			showaggregates: true, showstatusbar: true, statusbarheight: 30, columnsheight : 25,theme: 'energyblue', columngroups : columngroups});
	}else{
		$("#rmGrid").jqxGrid({source : dataAdapterRM, width : '100%', columnsresize : true, selectionmode : 'singlecell', columns : columns, sortable : 'true',
			pageable : 'true', virtualmode : 'true', pagermode : 'simple', rendergridrows : rendergridrows, showsortmenuitems : false, autoheight : true, altrows : true,
			showaggregates: true, showstatusbar: true, statusbarheight: 30, columnsheight : 25,theme: 'energyblue', columngroups : columngroups});
		$("#fgGrid").jqxGrid({source : dataAdapterFG, width : '100%', columnsresize : true, selectionmode : 'singlecell', columns : columns, sortable : 'true',
			pageable : 'true', virtualmode : 'true', pagermode : 'simple', rendergridrows : rendergridrows, showsortmenuitems : false, autoheight : true, altrows : true,
			showaggregates: true, showstatusbar: true, statusbarheight: 30, columnsheight : 25,theme: 'energyblue', columngroups : columngroups});
	}
	
}



// date-picker
$("#metalBalanceFrom").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate: 0,
	onSelect : function(dateStr) {
		var min = $(this).datepicker('getDate'); // Get selected date
		$("#metalBalanceto").datepicker('option', 'minDate', min || '0'); // Set other min, default to today
	}
});
var today = new Date();
$("#metalBalanceto").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate: 0
});


// Export Data for metal balance
$('#export').on('click',function() {
	var locationTypeObj = $('#locationTypeObj').val();
	if(locationTypeObj == null || locationTypeObj == ""){
		var locationType = "";
	}else{
		var locationType = locationTypeObj.join("','");
	}
	var fieldFilters = metalBalanceFieldFilters(locationType);
	var newData = [];
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	var rowsRM, rowsFG;
	if(locationType == 'R'){
		rowsRM = $('#rmGrid').jqxGrid('getdatainformation');
	}else if(locationType == 'F'){
		rowsFG = $('#fgGrid').jqxGrid('getdatainformation');
	}else{
		rowsRM = $('#rmGrid').jqxGrid('getdatainformation');
		rowsFG = $('#fgGrid').jqxGrid('getdatainformation');
	}
	if ((rowsFG == undefined || rowsFG == 0) && (rowsRM == undefined || rowsRM == 0)) {
		$.growl.error({
			message : "No Data To Export",
			duration : 8000
		});
		return false;
	}else{
		var newData = [];
		postJSON('/OrderExecution/api/v1/stockOfMetalExportList', JSON.stringify(fieldFilters), function(response) {	
			if(response!=null){
				data = response.payload.list;
				for(i=0; i<data.length; i++){
					newData.push({
						'Store/DC/All' : (data[i].storeOrDC != null) ? data[i].storeOrDC	: "",
						'Segment' : (data[i].segmentDesc != null) ? data[i].segmentDesc	: "",
						'Material Type' : (data[i].materialType != null) ? data[i].materialType	: "",
						'Location Code' : (data[i].locationCode != null) ? data[i].locationCode	: "",
						'Location Name' : (data[i].locationName != null) ? data[i].locationName	: "",
						'Open Gross Wt' : (data[i].openingGwt != null) ? data[i].openingGwt : "0.000",
						'Open Net Wt' : (data[i].openingNwt != null) ? data[i].openingNwt	: "0.000",
						'Open Pure Wt' : (data[i].openingPwt != null) ? data[i].openingPwt : "0.000",
						'Receipt Gross Wt' : (data[i].recptGwt != null) ? data[i].recptGwt 	: "0.000",
						'Receipt Net Wt' : (data[i].recptNwt != null) ? data[i].recptNwt : "0.000",
						'Receipt Pure Wt' : (data[i].recptPwt != null) ? data[i].recptPwt : "0.000",
						'Issue Gross Wt' : (data[i].issGwt != null) ? data[i].issGwt : "0.000",
						'Issue Net Wt' : (data[i].issNwt != null) ? data[i].issNwt : "0.000",
						'Issue Pure Wt' : (data[i].issPwt != null) ? data[i].issPwt : "0.000",
						'Close Gross Wt' : (data[i].cloGwt != null) ? data[i].cloGwt : "0.000",
						'Close Net Wt' : (data[i].cloNwt != null) ? data[i].cloNwt : "0.000",
						'Close Pure Wt' : (data[i].cloPwt != null) ? data[i].cloPwt : "0.000",
						'Computed Close Gross Wt' : (data[i].compClosedGwt != null) ? data[i].compClosedGwt : "0.000",
						'Computed Close Net Wt' : (data[i].compClosedNwt != null) ? data[i].compClosedNwt : "0.000",
						'Computed Close Pure Wt' : (data[i].compClosedPwt != null) ? data[i].compClosedPwt : "0.000",
					   });	
		        }
				var opts = [{sheetid:'Metal_Balance',header:true}];
		        var res = alasql('SELECT * INTO XLSX("Metal_Balance'+sysdate+'.xlsx_",?) FROM ?',  [opts,[newData]]);
			}
		 });
	}
});

// Clear All
$('#clearAll').on('click', function() {
	$('#regionLovObj').multiselect("clearSelection");
	$('#storeNameObj').multiselect("clearSelection");
	$('#dcNameObj').multiselect("clearSelection");
	$('#locationTypeObj').multiselect("clearSelection");
	
	var validator = $( "form" ).validate();
	validator.resetForm();
	
	$("#SearchHeader").hide();
	$("#fgGrid").jqxGrid('clear');
	$("#fgGrid").hide();
	$("#rmGrid").jqxGrid('clear');
	$("#rmGrid").hide();
	$("#rmToggle").hide();
	$("#fgToggle").hide();
});
$('#SearchHeader').hide();
$("#search").on('click', function(){
		var fromDate = $('#metalBalanceFrom').val();
		var toDate = $('#metalBalanceto').val();
    	var segmentLov = $('#segmentLov').val();
    	var storeNameObj = $('#storeNameObj').val();
    	var dcNameObj = $('#dcNameObj').val();
    	var storeordcCode = $('#selectStoreDC').val();
    	var location = $('#location').val();
    	var materialType = $("#locationTypeObj").val();
    	var locationTypeObj = $("#locationTypeObj").val();
    	
    	if(fromDate == "" || toDate == ""|| fromDate == null || toDate == null || segmentLov == " "  || storeordcCode == "" || materialType == null || materialType == " "){
    		$.growl.error({
				message : "Please Select Mandatory Fields !!!",
				duration : 10000
			});
			return false;
    	}
    	if(storeNameObj == null || storeNameObj == ""){var storeName = "";}else{var storeName = storeNameObj.join(",");}
    	if(dcNameObj == null || dcNameObj == ""){var dcName = "";}else{var dcName = dcNameObj.join(",");}
    	if(storeordcCode == "store" && (storeName == null || storeName == '')){
			$.growl.error({
				message : "Store is Mandatory !",
				duration : 10000
			});
			return;
    	}else if(storeordcCode == "dc" && (dcName == null || dcName == '')){
			$.growl.error({
				message : "DC is Mandatory !",
				duration : 10000
			});
			return;
    	}/*else if(location == null || location == ''){ // As per harish sir req removed validation on 27th May 2019
			$.growl.error({
				message : "Location is Mandatory !",
				duration : 10000
			});
			return;
    	}*/else{
    		
    	}
    	
    	if(locationTypeObj == null || locationTypeObj == ""){
    		var locationType = "";
    	}else{
    		var locationType = locationTypeObj.join(",");
    	}
    	
    	metalBalanceGrid(locationType);
    	$('#SearchHeader').show();
    	
    	if(locationType == 'R'){
    		$("#rmGrid").jqxGrid('clear');
    		$("#rmGrid").hide();
    		$("#rmToggle").show();
    		$("#rmGrid").show();
    		$("#fgToggle").hide();
    	}else if(locationType == 'F'){
    		$("#fgGrid").jqxGrid('clear');
    		$("#rmGrid").hide();
    		$("#fgToggle").show();
    		$("#fgGrid").show();
    		$("#rmToggle").hide();
    	}else{
    		$("#fgGrid").jqxGrid('clear');
    		$("#rmGrid").jqxGrid('clear');
    		$("#rmToggle").show();
    		$("#rmGrid").show();
    		$("#fgToggle").show();
    		$("#fgGrid").show();
    	}
    	
    
    	$('#SearchHeader').hide();
   
});

$("#rmToggle").hide();
$("#fgToggle").hide();
$("#toggle1").on('click', function(){
	$("#panel1").slideToggle(150);
});
$("#toggle2").on('click', function(){
	$("#panel2").slideToggle(150);
});