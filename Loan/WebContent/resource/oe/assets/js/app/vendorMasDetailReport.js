$("#export").prop('disabled',true);
$("#print").prop('disabled',true);

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

var onloadFunction = function(){
	var params = {"fieldFilters":{"docType": "vType"}}
	postJSON('/OrderExecution/api/v1/vendorMASOnload',JSON.stringify(params),function(data) {
		var vTypeList = data.payload.vType;
		
		$('#vTypeS').empty().append('<option value="" selected>--Select--</option>');
		$.each(vTypeList,function(k, v) {
			$('#vTypeS').append('<option value="' + v.id + '">' + v.name + '</option>');

		});
	});
	
	var mParam = {"fieldFilters":{"docType": "segements"}}
	postJSON('/OrderExecution/api/v1/vendorMASOnload',JSON.stringify(mParam),function(data) {
		
		$('#msegS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.segements,function(k, v) {
			$('#msegS').append('<option value="' + v.id + '">' + v.description + '</option>');
		});
	});
}

onloadFunction();

$('#vTypeS').on('change',function(){
	var vcParam = {"fieldFilters":{"docType": "vType","vType":$('#vTypeS').val()}}
		postJSON('/OrderExecution/api/v1/vendorMASOnload',JSON.stringify(vcParam),function(data) {
			$('#vCodeS').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.vCodeList,function(k, v) {
				$('#vCodeS').append('<option value="' + v.id + '">' + v.name + '</option>');
			});
		});
	
	var jwParam = {"fieldFilters":{"docType": "JwTypes","vType":$('#vTypeS').val()}}
	postJSON('/OrderExecution/api/v1/vendorMASOnload',JSON.stringify(jwParam),function(data) {
		$('#jwType').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.JwTypes,function(k, v) {
			$('#jwType').append('<option value="' + v.id + '">' + v.name + '</option>');
		});
	});
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('vendorMasDetailReport', 'bodySwitcher')"
});

$("#headersection").hide();
$("#searchSection").hide();
var searchFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var vTypeS = $('#vTypeS').val();
	var vCodeS = $('#vCodeS').val();
	var msegS = $('#msegS').val();
	var jwType = $("#jwType").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (vTypeS != "" && vTypeS != null) {
		fieldFilters.fieldFilters["vType"] = vTypeS;
	}
	if (vCodeS != "" && vCodeS != null) {
		fieldFilters.fieldFilters["vCodeList"] = vCodeS;
	}
	if (msegS != "" && msegS != null) {
		fieldFilters.fieldFilters["segId"] = msegS;
	}
	if (jwType != "" && jwType != null) {
		fieldFilters.fieldFilters["JwTypes"] = jwType;
	}
	fieldFilters.fieldFilters["docType"] = "maDetails";

	return fieldFilters;
}

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
   // $('.nav-tabs a[href="#' + tab + '"]').click();
};

$('#mas').trigger('click');

$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == "" || $("#vTypeS").val() == "" || $("#vCodeS").val() == "" 
		|| $("#msegS").val() == "" || $("#jwType").val() == "" ){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 1000,
			title : 'Error'
		});
		return false
	}else{
		
		postJSON('/OrderExecution/api/v1/vendorMASOnchangeValues', JSON.stringify(searchFieldFilters()), function(data){
			if(data.resCode == "1"){
				$("#headersection").show();
				$("#searchSection").show();
				var fromDateS = $('#fromDateS').val();
				var toDateS = $('#toDateS').val();
				var vCode = $("#vCodeS option:selected").text();
				
				activaTab('tab1default');
				
				
				var vendAdd =  data.payload.vendors.address1  + " , " + data.payload.vendors.vendorCity + " - " + data.payload.vendors.pinCode + " , " + data.payload.vendors.vendorState + " , " + data.payload.vendors.vendorCountry ;
				var venCode = vCode.split("-");
				var cAddress =  data.payload.company.address1 + " " + data.payload.company.address2  + ", " + data.payload.company.cityName + " - " + data.payload.company.zipCode + " , " + data.payload.company.stateName + " , " + data.payload.company.countryname;
				console.log(cAddress)
				$('#compTableId tbody').empty();
				$('#compTableId tbody').append('<tr>'
						+'<td style="border-color: #0065aa;" class="text-center">'+data.payload.company.compName + '</td>'
						+'</tr>'
						+'<tr style="border-color: #0065aa;">'
						+'<td style="border-color: #0065aa;" class="text-center">'+ cAddress + '</td>'
						+'</tr>'
				);
				
				$('#myTableId tbody').empty();
				$('#myTableId tbody').append('<tr>'
						 +'<th style="border-color: #0065aa;" class="vendCol" >Vendor Code :</th>'
						+'<th style="border-color: #0065aa;" class="vendCol">'+ venCode[0] + '</th>'
						+'</tr>'
						+'<tr style="border-color: #0065aa;">'
						+'<th style="border-color: #0065aa;" class="vendCol">Vendor Name :</th>'
						+'<th style="border-color: #0065aa;" class="vendCol">'+  venCode[1] + '</th>'
						+'</tr>'
						+'<tr style="border-color: #0065aa;">'
						+'<th style="border-color: #0065aa;" class="vendCol">Address :</th>'
						+'<th style="border-color: #0065aa;" class="vendCol"> '+ vendAdd +'</th>'
						+'</tr>'
				);

				
				$('#masHeading').empty();

				var appendText = 'Manufacturing Account Statement From '+ $("#fromDateS").val() + ' to ' + $("#toDateS").val();
				$("#masHeading").append(appendText);
				
				vendorMASSearchGrid();
				$("#jqxgrid").show();
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

//Search grid started
function vendorMASSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'location','type' : 'string','map' : 'locationName'}, 
		
		{'name' : 'gWtO','type' : 'float','map' : 'openingGwt'},
		{'name' : 'nWtO','type' : 'float','map' : 'openingNwt'},
		{'name' : 'pWtO','type' : 'float','map' : 'openingPwt'},
		
		{'name' : 'gWtI','type' : 'float','map' : 'issGwt'},
		{'name' : 'nWtI','type' : 'float','map' : 'issNwt'},
		{'name' : 'pWtI','type' : 'float','map' : 'issPwt'},
		
		{'name' : 'gWtR','type' : 'float','map' : 'recptGwt'},
		{'name' : 'nWtR','type' : 'float','map' : 'recptNwt'},
		{'name' : 'pWtR','type' : 'float','map' : 'recptPwt'},
		
		{'name' : 'gWtC','type' : 'float','map' : 'compClosedGwt'},
		{'name' : 'nWtC','type' : 'float','map' : 'compClosedNwt'},
		{'name' : 'pWtC','type' : 'float','map' : 'compClosedPwt'},
		
		{'name' : 'gWtM','type' : 'float','map' : 'cloGwt'},
		{'name' : 'nWtM','type' : 'float','map' : 'cloNwt'},
		{'name' : 'pWtM','type' : 'float','map' : 'cloPwt'},
	];

	var columns = [
		{'text' : 'location','datafield' : 'location','width' : '10%',editable : false,cellsalign : 'left',align : 'center',sortable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				}
		},
		
		{'text' : 'Gross Wt.','datafield' : 'gWtO','width' : '6%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "opening",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['gWtO'] == null) ? 0 : record['gWtO'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Net Wt.','datafield' : 'nWtO','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "opening",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['nWtO'] == null) ? 0 : record['nWtO'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Pure Wt','datafield' : 'pWtO','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "opening",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['pWtO'] == null) ? 0 : record['pWtO'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Gross Wt.','datafield' : 'gWtI','width' : '6%',cellsalign : 'center',align : 'right',editable : false,sortable : false,cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['gWtI'] == null) ? 0 : record['gWtI'];
		  			  return aggregatedValue +total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Net Wt.','datafield' : 'nWtI','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['nWtI'] == null) ? 0 : record['nWtI'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Pure Wt','datafield' : 'pWtI','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['pWtI'] == null) ? 0 : record['pWtI'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Gross Wt.','datafield' : 'gWtR','width' : '6%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "receipt",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['gWtR'] == null) ? 0 : record['gWtR'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Net Wt.','datafield' : 'nWtR','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['nWtR'] == null) ? 0 : record['nWtR'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Pure Wt','datafield' : 'pWtR','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['pWtR'] == null) ? 0 : record['pWtR'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Gross Wt.','datafield' : 'gWtC','width' : '6%',cellsalign : 'center',align : 'right',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['gWtC'] == null) ? 0 : record['gWtC'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Net Wt.','datafield' : 'nWtC','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['nWtC'] == null) ? 0 : record['nWtC'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Pure Wt','datafield' : 'pWtC','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['pWtC'] == null) ? 0 : record['pWtC'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Gross Wt.','datafield' : 'gWtM','width' : '6%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "mcb",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['gWtM'] == null) ? 0 : record['gWtM'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Net Wt.','datafield' : 'nWtM','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "mcb",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['nWtM'] == null) ? 0 : record['nWtM'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Pure Wt','datafield' : 'pWtM','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "mcb",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['pWtM'] == null) ? 0 : record['pWtM'];
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		}
	];

	showMyGrid(datafields, "/OrderExecution/api/v1/vendorMASOnchangeValues", "list",columns, searchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 70,
		rowdetails : true,
		virtualmode : true,
		 showaggregates: true,
			showstatusbar: true,
			columngroups : [ {
				text : 'Opening Balance',
				name : 'opening',
				align : 'center'
			},{
				text : 'Issues',
				name : 'issue',
				align : 'center'
			},{
				text : 'Receipt',
				name : 'receipt',
				align : 'center'
			} ,{
				text : 'Closing Balance as Per Transaction',
				name : 'closing',
				align : 'center'
			},{
				text : 'Master Closing Balance',
				name : 'mcb',
				align : 'center'
			}],
	});
}

var issueDetFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var vTypeS = $('#vTypeS').val();
	var vCodeS = $('#vCodeS').val();
	var msegS = $('#msegS').val();
	var jwType = $("#jwType").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (vTypeS != "" && vTypeS != null) {
		fieldFilters.fieldFilters["vType"] = vTypeS;
	}
	if (vCodeS != "" && vCodeS != null) {
		fieldFilters.fieldFilters["vCodeList"] = vCodeS;
	}
	if (msegS != "" && msegS != null) {
		fieldFilters.fieldFilters["segId"] = msegS;
	}
	if (jwType != "" && jwType != null) {
		fieldFilters.fieldFilters["JwTypes"] = jwType;
	}
	fieldFilters.fieldFilters["docType"] = "IssueFG";

	return fieldFilters;
}

var issueDetFgRegFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var vTypeS = $('#vTypeS').val();
	var vCodeS = $('#vCodeS').val();
	var msegS = $('#msegS').val();
	var jwType = $("#jwType").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (vTypeS != "" && vTypeS != null) {
		fieldFilters.fieldFilters["vType"] = vTypeS;
	}
	if (vCodeS != "" && vCodeS != null) {
		fieldFilters.fieldFilters["vCodeList"] = vCodeS;
	}
	if (msegS != "" && msegS != null) {
		fieldFilters.fieldFilters["segId"] = msegS;
	}
	if (jwType != "" && jwType != null) {
		fieldFilters.fieldFilters["JwTypes"] = jwType;
	}
	fieldFilters.fieldFilters["docType"] = "IssueFGRegular";

	return fieldFilters;
}

var issueDetFgFsmFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var vTypeS = $('#vTypeS').val();
	var vCodeS = $('#vCodeS').val();
	var msegS = $('#msegS').val();
	var jwType = $("#jwType").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (vTypeS != "" && vTypeS != null) {
		fieldFilters.fieldFilters["vType"] = vTypeS;
	}
	if (vCodeS != "" && vCodeS != null) {
		fieldFilters.fieldFilters["vCodeList"] = vCodeS;
	}
	if (msegS != "" && msegS != null) {
		fieldFilters.fieldFilters["segId"] = msegS;
	}
	if (jwType != "" && jwType != null) {
		fieldFilters.fieldFilters["JwTypes"] = jwType;
	}
	fieldFilters.fieldFilters["docType"] = "IssueFGSystem";

	return fieldFilters;
}

var receiptRmFilters = function() {
	var rcptRmFilters = issueDetFgFsmFilters();
	fieldFilters.fieldFilters.docType = "ReceiptRM";
	return fieldFilters;
}

var receiptRmRegFilters = function() {
	var rcptRmRegFilters = issueDetFgFsmFilters();
	rcptRmRegFilters.fieldFilters.docType = "ReceiptRMRegular";
	return fieldFilters;
}

var receiptRmSysFilters = function() {
	var rcptRmRegFilters = issueDetFgFsmFilters();
	rcptRmRegFilters.fieldFilters.docType = "ReceiptRMSystem";
	return fieldFilters;
}

$("#issueFg").on('click',function(){
	issueDetGrid();
	$("#jqxgrid1").show();
});

$("#issueRm").on('click',function(){
	issueDetRmGrid();
	$("#jqxgrid2").show();
});

$("#issueFr").on('click',function(){
	issueDetFgRegGrid();
	$("#jqxgrid3").show();
});

$("#issueFsm").on('click',function(){
	issueDetFgFsmGrid();
	$("#jqxgrid4").show();
});

var issueDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
    		
    		{'name' : 'mivNo','type' : 'long','map' : 'mivHeader>id'},
    		{'name' : 'slNo','type' : 'int','map' : 'mivSrialNo'},
    		{'name' : 'vendBillNo','type' : 'float','map' : 'partyBillNo'},
    		
    		{'name' : 'location','type' : 'string','map' : 'metalAccLocation'},
    		
    		{'name' : 'gWt','type' : 'string','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'string','map' : 'netWeight'},
    		
    		{'name' : 'refType','type' : 'string','map' : 'refType'},
    		{'name' : 'refNo','type' : 'string','map' : 'refNo'},
    		{'name' : 'refSlNo','type' : 'string','map' : 'refSerialNo'},

    		{'name' : 'wastagePercCredit','type' : 'float','map' : 'wastperc'},
    		
    		{'name' : 'wastageCreditWt','type' : 'float','map' : 'wastWt'},
    		{'name' : 'purity','type' : 'float','map' : 'skinPuritys'},
    		{'name' : 'pWt','type' : 'string','map' : 'pureWt'},
    		
    		{'name' : 'labourPercCredit','type' : 'float','map' : 'labourPerc'},
    		{'name' : 'labourInRs','type' : 'float','map' : 'labourVal'}, 
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    		aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				},
    	
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'><b>Total</b></div>";
				}
			}
    	},
		{'text' : 'MIV No','datafield' : 'mivNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
    			var mSlNo;
    			console.log(value);
    			if(value != "" || value != 0){
    				mSlNo = value;
    				return "<div align='center'style='margin-top:8px;'>" + mSlNo + "</div>";
    			}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
    			}
			}
		},
		{'text' : 'Vendor Bill No','datafield' : 'vendBillNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Location','datafield' : 'location','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'right',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['gWt'] != null && record['purity'] != "" ) ?  record['gWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'right',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['nWt'] != null && record['purity'] != "" ) ?  record['nWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : 'Ref Type','datafield' : 'refType','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Ref No','datafield' : 'refNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Ref Sl No','datafield' : 'refSlNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : '% of Wastage Credit','datafield' : 'wastagePercCredit','width' : '12%',cellsalign : 'center',align : 'right',editable : false,sortable : false,cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Wastage Credit Wt.','datafield' : 'wastageCreditWt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
    			var purity;
    			if(value != 0){
    				purity = value;
    				return "<div align='right'style='margin-top:8px;'>" + parseFloat(purity).toFixed(2) + "</div>";

    			}else{
    				purity = "";
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";

    			}
			} 
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pWt','width' : '12%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['pWt'] != null && record['purity'] != "" ) ?  record['pWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		cellsrenderer: function(row, column, value){
			var purity;
			var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

			if(purity != ""){
				return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
			}else{
				return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
			}
		} 
		},
		{'text' : '% of Labour Credit','datafield' : 'labourPercCredit','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Labour in Rs.','datafield' : 'labourInRs','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid1').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, issueDetFilters(), updateRows, "", "#jqxgrid1");
    $("#jqxgrid1").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}

var issueDetRmFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var vTypeS = $('#vTypeS').val();
	var vCodeS = $('#vCodeS').val();
	var msegS = $('#msegS').val();
	var jwType = $("#jwType").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (vTypeS != "" && vTypeS != null) {
		fieldFilters.fieldFilters["vType"] = vTypeS;
	}
	if (vCodeS != "" && vCodeS != null) {
		fieldFilters.fieldFilters["vCodeList"] = vCodeS;
	}
	if (msegS != "" && msegS != null) {
		fieldFilters.fieldFilters["segId"] = msegS;
	}
	if (jwType != "" && jwType != null) {
		fieldFilters.fieldFilters["JwTypes"] = jwType;
	}
	fieldFilters.fieldFilters["docType"] = "IssueRM";

	return fieldFilters;
}

var issueDetRmGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
    		
    		{'name' : 'mivNo','type' : 'long','map' : 'mivHeader>id'},
    		{'name' : 'slNo','type' : 'int','map' : 'mivSrialNo'},
    		{'name' : 'vendBillNo','type' : 'float','map' : 'partyBillNo'},
    		{'name' : 'vendBillDate','type' : 'string','map' : 'partyBillDat'},

    		{'name' : 'location','type' : 'string','map' : 'metalAccLocation'},
    		
    		{'name' : 'gWt','type' : 'string','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'string','map' : 'netWeight'},
    		{'name' : 'wastagePercCredit','type' : 'float','map' : 'wastperc'},
    		
    		{'name' : 'wastageCreditWt','type' : 'float','map' : 'wastWt'},
    		{'name' : 'purity','type' : 'float','map' : 'skinPuritys'},
    		{'name' : 'pWt','type' : 'string','map' : 'pureWt'},
    		
    		{'name' : 'labourPercCredit','type' : 'float','map' : 'labourPerc'},
    		{'name' : 'labourInRs','type' : 'float','map' : 'labourVal'}, 
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    		aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				},
    	
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid2').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'><b>Total</b></div>";
				}
			}
    	},
		{'text' : 'MIV No','datafield' : 'mivNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid2').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
    			var mSlNo;
    			console.log(value);
    			if(value != "" || value != 0){
    				mSlNo = value;
    				return "<div align='center'style='margin-top:8px;'>" + mSlNo + "</div>";
    			}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
    			}
			}
		},
		{'text' : 'Vendor Bill No','datafield' : 'vendBillNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid2').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Vendor Bill Date','datafield' : 'vendBillDate','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid2').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Location','datafield' : 'location','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid2').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'right',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['gWt'] != null && record['purity'] != "" ) ?  record['gWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid2').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'right',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['nWt'] != null && record['purity'] != "" ) ?  record['nWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid2').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : '% of Wastage Credit','datafield' : 'wastagePercCredit','width' : '12%',cellsalign : 'center',align : 'right',editable : false,sortable : false,cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid2').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Wastage Credit Wt.','datafield' : 'wastageCreditWt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid2').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
    			var purity;
    			if(value != 0){
    				purity = value;
    				return "<div align='right'style='margin-top:8px;'>" + parseFloat(purity).toFixed(2) + "</div>";

    			}else{
    				purity = "";
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";

    			}
			} 
		},
		{'text' : 'Pure Wt(Net Wt + Wastage)','datafield' : 'pWt','width' : '12%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['pWt'] != null && record['purity'] != "" ) ?  record['pWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;right; margin-left: 100px;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		cellsrenderer: function(row, column, value){
			var purity;
			var purity =  $('#jqxgrid2').jqxGrid('getcellvalue', row, 'purity');

			if(purity != ""){
				return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
			}else{
				return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: '>" + "<b>" + value + "</b" +"</div>";
			}
		} 
		},
		{'text' : '% of Labour Credit','datafield' : 'labourPercCredit','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid2').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Labour in Rs.','datafield' : 'labourInRs','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid2').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, issueDetRmFilters(), updateRows, "", "#jqxgrid2");
    $("#jqxgrid2").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}

var issueDetFgRegGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
    		
    		{'name' : 'mivNo','type' : 'long','map' : 'mivHeader>id'},
    		{'name' : 'slNo','type' : 'int','map' : 'mivSrialNo'},
    		{'name' : 'vendBillNo','type' : 'float','map' : 'partyBillNo'},
    		
    		{'name' : 'location','type' : 'string','map' : 'metalAccLocation'},
    		
    		{'name' : 'gWt','type' : 'string','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'string','map' : 'netWeight'},
    		
    		{'name' : 'refType','type' : 'string','map' : 'refType'},
    		{'name' : 'refNo','type' : 'string','map' : 'refNo'},
    		{'name' : 'refSlNo','type' : 'string','map' : 'refSerialNo'},
    		
    		{'name' : 'wastagePercCredit','type' : 'float','map' : 'wastperc'},
    		
    		{'name' : 'wastageCreditWt','type' : 'float','map' : 'wastWt'},
    		{'name' : 'purity','type' : 'float','map' : 'skinPuritys'},
    		{'name' : 'pWt','type' : 'string','map' : 'pureWt'},
    		
    		{'name' : 'labourPercCredit','type' : 'float','map' : 'labourPerc'},
    		{'name' : 'labourInRs','type' : 'float','map' : 'labourVal'}, 
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    		aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				},
    	
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'><b>Total</b></div>";
				}
			}
    	},
		{'text' : 'MIV No','datafield' : 'mivNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
    			var mSlNo;
    			console.log(value);
    			if(value != "" || value != 0){
    				mSlNo = value;
    				return "<div align='center'style='margin-top:8px;'>" + mSlNo + "</div>";
    			}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
    			}
			}
		},
		{'text' : 'Vendor Bill No','datafield' : 'vendBillNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Location','datafield' : 'location','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'right',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['gWt'] != null && record['purity'] != "" ) ?  record['gWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'right',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['nWt'] != null && record['purity'] != "" ) ?  record['nWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : 'Ref Type','datafield' : 'refType','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Ref No','datafield' : 'refNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Ref Sl No','datafield' : 'refSlNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : '% of Wastage Credit','datafield' : 'wastagePercCredit','width' : '12%',cellsalign : 'center',align : 'right',editable : false,sortable : false,cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Wastage Credit Wt.','datafield' : 'wastageCreditWt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
    			var purity;
    			if(value != 0){
    				purity = value;
    				return "<div align='right'style='margin-top:8px;'>" + parseFloat(purity).toFixed(2) + "</div>";

    			}else{
    				purity = "";
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";

    			}
			} 
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pWt','width' : '12%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['pWt'] != null && record['purity'] != "" ) ?  record['pWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right; margin-left: 100px;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		cellsrenderer: function(row, column, value){
			var purity;
			var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

			if(purity != ""){
				return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
			}else{
				return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
			}
		} 
		},
		{'text' : '% of Labour Credit','datafield' : 'labourPercCredit','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Labour in Rs.','datafield' : 'labourInRs','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid3').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, issueDetFgRegFilters(), updateRows, "", "#jqxgrid3");
    $("#jqxgrid3").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}

var issueDetFgFsmGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
    		
    		{'name' : 'mivNo','type' : 'long','map' : 'mivHeader>id'},
    		{'name' : 'slNo','type' : 'int','map' : 'mivSrialNo'},
    		{'name' : 'vendBillNo','type' : 'float','map' : 'partyBillNo'},
    		
    		{'name' : 'location','type' : 'string','map' : 'metalAccLocation'},
    		
    		{'name' : 'gWt','type' : 'string','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'string','map' : 'netWeight'},
    		
    		{'name' : 'refType','type' : 'string','map' : ''},
    		{'name' : 'refNo','type' : 'string','map' : ''},
    		{'name' : 'refSlNo','type' : 'string','map' : 'refSerialNo'},
    		
    		{'name' : 'wastagePercCredit','type' : 'float','map' : 'wastperc'},
    		
    		{'name' : 'wastageCreditWt','type' : 'float','map' : 'wastWt'},
    		{'name' : 'purity','type' : 'float','map' : 'skinPuritys'},
    		{'name' : 'pWt','type' : 'string','map' : 'pureWt'},
    		
    		{'name' : 'labourPercCredit','type' : 'float','map' : 'labourPerc'},
    		{'name' : 'labourInRs','type' : 'float','map' : 'labourVal'}, 
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    		aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				},
    	
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'><b>Total</b></div>";
				}
			}
    	},
		{'text' : 'MIV No','datafield' : 'mivNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
    			var mSlNo;
    			console.log(value);
    			if(value != "" || value != 0){
    				mSlNo = value;
    				return "<div align='center'style='margin-top:8px;'>" + mSlNo + "</div>";
    			}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
    			}
			}
		},
		{'text' : 'Vendor Bill No','datafield' : 'vendBillNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Location','datafield' : 'location','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'right',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['gWt'] != null && record['purity'] != "" ) ?  record['gWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'right',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['nWt'] != null && record['purity'] != "" ) ?  record['nWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : 'Ref Type','datafield' : 'refType','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Ref No','datafield' : 'refNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Ref Sl No','datafield' : 'refSlNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : '% of Wastage Credit','datafield' : 'wastagePercCredit','width' : '12%',cellsalign : 'center',align : 'right',editable : false,sortable : false,cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Wastage Credit Wt.','datafield' : 'wastageCreditWt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
    			var purity;
    			if(value != 0){
    				purity = value;
    				return "<div align='right'style='margin-top:8px;'>" + parseFloat(purity).toFixed(2) + "</div>";

    			}else{
    				purity = "";
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";

    			}
			} 
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pWt','width' : '12%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['pWt'] != null && record['purity'] != "" ) ?  record['pWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right; margin-left: 100px;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		cellsrenderer: function(row, column, value){
			var purity;
			var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

			if(purity != ""){
				return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
			}else{
				return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
			}
		} 
		},
		{'text' : '% of Labour Credit','datafield' : 'labourPercCredit','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Labour in Rs.','datafield' : 'labourInRs','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid4').jqxGrid('getcellvalue', row, 'purity');

				if(purity != ""){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, issueDetFgFsmFilters(), updateRows, "", "#jqxgrid4");
    $("#jqxgrid4").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}

$("#receiptRm").on('click',function(){
	receiptRMDetGrid();
	$("#jqxgrid5").show();
});

$("#receiptRmReg").on('click',function(){
	receiptRMRegDetGrid();
	$("#jqxgridRR").show();
});

$("#receiptRmSys").on('click',function(){
	receiptRMSysDetGrid();
	$("#jqxgridRS").show();
});

// Receipt Details Grids
var receiptRMDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
        	{'name' : 'vbdate','type' : 'string','map' : 'billDate'}, 

    		{'name' : 'mrvNo','type' : 'long','map' : 'mrvNo'},
    		{'name' : 'slNo','type' : 'int','map' : 'mrvSrialNo'},
    		{'name' : 'vendBillNo','type' : 'int','map' : 'partyBillNo'},
    		
    		{'name' : 'location','type' : 'string','map' : 'metalAccLocation'},
    		
    		{'name' : 'gWt','type' : 'string','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'string','map' : 'netWeight'},
    		
    		{'name' : 'wastageWt','type' : 'string','map' : 'wastageWeight'},
    		{'name' : 'purity','type' : 'float','map' : 'skinPurity'},
    		{'name' : 'pWt','type' : 'string','map' : 'pureWt'},
    		
    		{'name' : 'valueInRs','type' : 'float','map' : 'valueInRs'}, 
    		
    		{'name' : 'refType','type' : 'string','map' : 'refType'},
    		{'name' : 'refNo','type' : 'int','map' : 'refNo'},
    		{'name' : 'refslNo','type' : 'int','map' : 'refSerialNo'},
    		{'name' : 'creditOrDebit','type' : 'string','map' : 'debitOrCredit'},
    		{'name' : 'creditDebitAmt','type' : 'float','map' : 'debitOrCreditAmt'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    		aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				},
				cellsrenderer: function(row, column, value){
					var purity;
					var purity =  $('#jqxgrid5').jqxGrid('getcellvalue', row, 'slNo');

					if(purity != 0){
						return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
					}else{
						return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
					}
				}
    		
    	},
		{'text' : 'MRV No','datafield' : 'mrvNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid5').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
    			var mSlNo;
    			console.log(value);
    			if(value != "" || value != 0){
    				mSlNo = value;
    				return "<div align='center'style='margin-top:8px;'>" + mSlNo + "</div>";
    			}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
    			}
			}
		},
		{'text' : 'Vendor Bill No','datafield' : 'vendBillNo','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid5').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Vendor Bill Date','datafield' : 'vbdate','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
			
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid5').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'><b>G Total</b></div>";
				}
			}
    	},
		{'text' : 'Location','datafield' : 'location','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid5').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['gWt'] != null && record['slNo'] != 0 ) ?  record['gWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid5').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['nWt'] != null && record['slNo'] != 0  ) ?  record['nWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid5').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		
		{'text' : 'Wastage Wt.','datafield' : 'wastageWt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['wastageWt'] != null && record['slNo'] != 0 ) ?  record['wastageWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid5').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
    			var purity;
    			if(value != 0){
    				purity = value;
    				return "<div align='right'style='margin-top:8px;'>" + parseFloat(purity).toFixed(2) + "</div>";

    			}else{
    				purity = "";
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";

    			}
			} 
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pWt','width' : '12%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['pWt'] != null && record['slNo'] != 0 ) ?  record['pWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right; margin-left: 100px;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		cellsrenderer: function(row, column, value){
			var purity;
			var purity =  $('#jqxgrid5').jqxGrid('getcellvalue', row, 'slNo');

			if(purity != 0){
				return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
			}else{
				return "<div align='right'style='padding :18px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
			}
		} 
		},
		{'text' : 'Value in Rs.','datafield' : 'valueInRs','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['valueInRs'] != null && record['slNo'] != 0 ) ?  record['valueInRs'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid5').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Ref Type','datafield' : 'refType','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
		},
		{'text' : 'Ref No','datafield' : 'refNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Ref Sl No','datafield' : 'refslNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Credit/Debit','datafield' : 'creditOrDebit','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Credit/Debit Amt','datafield' : 'creditDebitAmt','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, receiptRmFilters(), updateRows, "", "#jqxgrid5");
    $("#jqxgrid5").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}


var receiptRMRegDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
        	{'name' : 'vbdate','type' : 'string','map' : 'billDate'}, 

    		{'name' : 'mrvNo','type' : 'long','map' : 'mrvNo'},
    		{'name' : 'slNo','type' : 'int','map' : 'mrvSrialNo'},
    		{'name' : 'vendBillNo','type' : 'float','map' : 'partyBillNo'},
    		
    		{'name' : 'location','type' : 'string','map' : 'metalAccLocation'},
    		
    		{'name' : 'gWt','type' : 'string','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'string','map' : 'netWeight'},
    		
    		{'name' : 'wastageWt','type' : 'string','map' : 'wastageWeight'},
    		{'name' : 'purity','type' : 'float','map' : 'skinPurity'},
    		{'name' : 'pWt','type' : 'string','map' : 'pureWt'},
    		
    		{'name' : 'valueInRs','type' : 'float','map' : 'valueInRs'}, 
    		
    		{'name' : 'refType','type' : 'string','map' : 'refType'},
    		{'name' : 'refNo','type' : 'int','map' : 'refNo'},
    		{'name' : 'refslNo','type' : 'int','map' : 'refSerialNo'},
    		{'name' : 'creditOrDebit','type' : 'string','map' : 'debitOrCredit'},
    		{'name' : 'creditDebitAmt','type' : 'float','map' : 'debitOrCreditAmt'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    		aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				},
				cellsrenderer: function(row, column, value){
					var purity;
					var purity =  $('#jqxgridRR').jqxGrid('getcellvalue', row, 'slNo');

					if(purity != 0){
						return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
					}else{
						return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
					}
				}
    		
    	},
		{'text' : 'MRV No','datafield' : 'mrvNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRR').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
    			var mSlNo;
    			console.log(value);
    			if(value != "" || value != 0){
    				mSlNo = value;
    				return "<div align='center'style='margin-top:8px;'>" + mSlNo + "</div>";
    			}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
    			}
			}
		},
		{'text' : 'Vendor Bill No','datafield' : 'vendBillNo','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRR').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Vendor Bill Date','datafield' : 'vbdate','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
			
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRR').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'><b>G Total</b></div>";
				}
			}
    	},
		{'text' : 'Location','datafield' : 'location','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRR').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['gWt'] != null && record['slNo'] != 0 ) ?  record['gWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRR').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['nWt'] != null && record['slNo'] != 0  ) ?  record['nWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRR').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		
		{'text' : 'Wastage Wt.','datafield' : 'wastageWt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['wastageWt'] != null && record['slNo'] != 0 ) ?  record['wastageWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRR').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
    			var purity;
    			if(value != 0){
    				purity = value;
    				return "<div align='right'style='margin-top:8px;'>" + parseFloat(purity).toFixed(2) + "</div>";

    			}else{
    				purity = "";
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";

    			}
			} 
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pWt','width' : '12%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['pWt'] != null && record['slNo'] != 0 ) ?  record['pWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right; margin-left: 100px;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		cellsrenderer: function(row, column, value){
			var purity;
			var purity =  $('#jqxgridRR').jqxGrid('getcellvalue', row, 'slNo');

			if(purity != 0){
				return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
			}else{
				return "<div align='right'style='padding :18px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
			}
		} 
		},
		{'text' : 'Value in Rs.','datafield' : 'valueInRs','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['valueInRs'] != null && record['slNo'] != 0 ) ?  record['valueInRs'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRR').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Ref Type','datafield' : 'refType','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
		},
		{'text' : 'Ref No','datafield' : 'refNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Ref Sl No','datafield' : 'refslNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Credit/Debit','datafield' : 'creditOrDebit','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Credit/Debit Amt','datafield' : 'creditDebitAmt','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, receiptRmRegFilters(), updateRows, "", "#jqxgridRR");
    $("#jqxgridRR").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}

var receiptRMSysDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
        	{'name' : 'vbdate','type' : 'string','map' : 'billDate'}, 

    		{'name' : 'mrvNo','type' : 'long','map' : 'mrvNo'},
    		{'name' : 'slNo','type' : 'int','map' : 'mrvSrialNo'},
    		{'name' : 'vendBillNo','type' : 'float','map' : 'partyBillNo'},
    		
    		{'name' : 'location','type' : 'string','map' : 'metalAccLocation'},
    		
    		{'name' : 'gWt','type' : 'string','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'string','map' : 'netWeight'},
    		
    		{'name' : 'wastageWt','type' : 'string','map' : 'wastageWeight'},
    		{'name' : 'purity','type' : 'float','map' : 'skinPurity'},
    		{'name' : 'pWt','type' : 'string','map' : 'pureWt'},
    		
    		{'name' : 'valueInRs','type' : 'float','map' : 'valueInRs'}, 
    		{'name' : 'refType','type' : 'string','map' : 'refType'},
    		{'name' : 'refNo','type' : 'int','map' : 'refNo'},
    		{'name' : 'refslNo','type' : 'int','map' : 'refSerialNo'},
    		{'name' : 'creditOrDebit','type' : 'string','map' : 'debitOrCredit'},
    		{'name' : 'creditDebitAmt','type' : 'float','map' : 'debitOrCreditAmt'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    		aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				},
				cellsrenderer: function(row, column, value){
					var purity;
					var purity =  $('#jqxgridRS').jqxGrid('getcellvalue', row, 'slNo');

					if(purity != 0){
						return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
					}else{
						return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
					}
				}
    		
    	},
		{'text' : 'MRV No','datafield' : 'mrvNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRS').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
    			var mSlNo;
    			console.log(value);
    			if(value != "" || value != 0){
    				mSlNo = value;
    				return "<div align='center'style='margin-top:8px;'>" + mSlNo + "</div>";
    			}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
    			}
			}
		},
		{'text' : 'Vendor Bill No','datafield' : 'vendBillNo','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRS').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Vendor Bill Date','datafield' : 'vbdate','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
			
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRS').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'><b>G Total</b></div>";
				}
			}
    	},
		{'text' : 'Location','datafield' : 'location','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRS').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['gWt'] != null && record['slNo'] != 0 ) ?  record['gWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRS').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['nWt'] != null && record['slNo'] != 0  ) ?  record['nWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRS').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		
		{'text' : 'Wastage Wt.','datafield' : 'wastageWt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['wastageWt'] != null && record['slNo'] != 0 ) ?  record['wastageWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRS').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
    			var purity;
    			if(value != 0){
    				purity = value;
    				return "<div align='right'style='margin-top:8px;'>" + parseFloat(purity).toFixed(2) + "</div>";

    			}else{
    				purity = "";
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";

    			}
			} 
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pWt','width' : '12%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['pWt'] != null && record['slNo'] != 0 ) ?  record['pWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right; margin-left: 100px;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		cellsrenderer: function(row, column, value){
			var purity;
			var purity =  $('#jqxgridRS').jqxGrid('getcellvalue', row, 'slNo');

			if(purity != 0){
				return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
			}else{
				return "<div align='right'style='padding :18px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
			}
		} 
		},
		{'text' : 'Value in Rs.','datafield' : 'valueInRs','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['valueInRs'] != null && record['slNo'] != 0 ) ?  record['valueInRs'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgridRS').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Ref Type','datafield' : 'refType','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
		},
		{'text' : 'Ref No','datafield' : 'refNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Ref Sl No','datafield' : 'refslNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Credit/Debit','datafield' : 'creditOrDebit','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Credit/Debit Amt','datafield' : 'creditDebitAmt','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, receiptRmSysFilters(), updateRows, "", "#jqxgridRS");
    $("#jqxgridRS").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}
var receiptFgFilters = function(){
	var rcptFgFilters = issueDetFgFsmFilters();
	rcptFgFilters.fieldFilters.docType = "ReceiptFG";
	return fieldFilters;
}

var receiptFgRegFilters = function(){
	var rcptFrFilters = issueDetFgFsmFilters();
	rcptFrFilters.fieldFilters.docType = "ReceiptFGRegular";
	return fieldFilters;
}

var receiptFsmFilters = function(){
	var rcptFsmFilters = issueDetFgFsmFilters();
	rcptFsmFilters.fieldFilters.docType = "ReceiptFGSystem";
	return fieldFilters;
}

$("#receiptFg").on('click',function(){
	receiptFgDetGrid();
	$("#jqxgrid6").show();
});

$("#receiptFr").on('click',function(){
	receiptFgRegDetGrid();
	$("#jqxgrid7").show();
});

$("#receiptFsm").on('click',function(){
	receiptFsmDetGrid();
	$("#jqxgrid8").show();
});

var receiptFgDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
        	{'name' : 'vbdate','type' : 'string','map' : 'billDate'}, 

    		{'name' : 'mrvNo','type' : 'long','map' : 'mrvNo'},
    		{'name' : 'slNo','type' : 'int','map' : 'mrvSrialNo'},
    		{'name' : 'vendBillNo','type' : 'float','map' : 'partyBillNo'},
    		
    		{'name' : 'location','type' : 'string','map' : 'metalAccLocation'},
    		
    		{'name' : 'gWt','type' : 'string','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'string','map' : 'netWeight'},
    		
    		{'name' : 'wastageWt','type' : 'string','map' : 'wastageWeight'},
    		{'name' : 'purity','type' : 'float','map' : 'skinPurity'},
    		{'name' : 'pWt','type' : 'string','map' : 'pureWt'},
    		
    		{'name' : 'valueInRs','type' : 'float','map' : 'labourCharges'}, 
    		
    		{'name' : 'refType','type' : 'string','map' : 'refType'},
    		{'name' : 'refNo','type' : 'int','map' : 'refNo'},
    		{'name' : 'refslNo','type' : 'int','map' : 'refSerialNo'},
    		{'name' : 'creditOrDebit','type' : 'string','map' : 'debitOrCredit'},
    		{'name' : 'creditDebitAmt','type' : 'float','map' : 'debitOrCreditAmt'},

        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    		aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				},
				cellsrenderer: function(row, column, value){
					var purity;
					var purity =  $('#jqxgrid6').jqxGrid('getcellvalue', row, 'slNo');

					if(purity != 0){
						return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
					}else{
						return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
					}
				}
    		
    	},
		{'text' : 'MRV No','datafield' : 'mrvNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid6').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
    			var mSlNo;
    			console.log(value);
    			if(value != "" || value != 0){
    				mSlNo = value;
    				return "<div align='center'style='margin-top:8px;'>" + mSlNo + "</div>";
    			}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
    			}
			}
		},
		{'text' : 'Vendor Bill No','datafield' : 'vendBillNo','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid6').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Vendor Bill Date','datafield' : 'vbdate','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
			
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid6').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'><b>G Total</b></div>";
				}
			}
    	},
		{'text' : 'Location','datafield' : 'location','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid6').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['gWt'] != null && record['slNo'] != 0 ) ?  record['gWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid6').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['nWt'] != null && record['slNo'] != 0  ) ?  record['nWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid6').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		
		{'text' : 'Wastage Wt.','datafield' : 'wastageWt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['wastageWt'] != null && record['slNo'] != 0 ) ?  record['wastageWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid6').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
    			var purity;
    			if(value != 0){
    				purity = value;
    				return "<div align='right'style='margin-top:8px;'>" + parseFloat(purity).toFixed(2) + "</div>";

    			}else{
    				purity = "";
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";

    			}
			} 
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pWt','width' : '12%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['pWt'] != null && record['slNo'] != 0 ) ?  record['pWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right; margin-left: 85px;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		cellsrenderer: function(row, column, value){
			var purity;
			var purity =  $('#jqxgrid6').jqxGrid('getcellvalue', row, 'slNo');

			if(purity != 0){
				return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
			}else{
				return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
			}
		} 
		},
		{'text' : 'Value in Rs.','datafield' : 'valueInRs','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['valueInRs'] != null && record['slNo'] != 0 ) ?  record['valueInRs'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid6').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Ref Type','datafield' : 'refType','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
		},
		{'text' : 'Ref No','datafield' : 'refNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Ref Sl No','datafield' : 'refslNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Credit/Debit','datafield' : 'creditOrDebit','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Credit/Debit Amt','datafield' : 'creditDebitAmt','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, receiptFgFilters(), updateRows, "", "#jqxgrid6");
    $("#jqxgrid6").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}

var receiptFgRegDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
        	{'name' : 'vbdate','type' : 'string','map' : 'billDate'}, 

    		{'name' : 'mrvNo','type' : 'long','map' : 'mrvNo'},
    		{'name' : 'slNo','type' : 'int','map' : 'mrvSrialNo'},
    		{'name' : 'vendBillNo','type' : 'float','map' : 'billDate'},
    		
    		{'name' : 'location','type' : 'string','map' : 'metalAccLocation'},
    		
    		{'name' : 'gWt','type' : 'string','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'string','map' : 'netWeight'},
    		
    		{'name' : 'wastageWt','type' : 'string','map' : 'wastageWeight'},
    		{'name' : 'purity','type' : 'float','map' : 'skinPurity'},
    		{'name' : 'pWt','type' : 'string','map' : 'pureWt'},
    		
    		{'name' : 'valueInRs','type' : 'float','map' : 'labourCharges'}, 
    		
    		{'name' : 'refType','type' : 'string','map' : 'refType'},
    		{'name' : 'refNo','type' : 'int','map' : 'refNo'},
    		{'name' : 'refslNo','type' : 'int','map' : 'refSerialNo'},
    		{'name' : 'creditOrDebit','type' : 'string','map' : 'debitOrCredit'},
    		{'name' : 'creditDebitAmt','type' : 'float','map' : 'debitOrCreditAmt'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    		aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				},
				cellsrenderer: function(row, column, value){
					var purity;
					var purity =  $('#jqxgrid7').jqxGrid('getcellvalue', row, 'slNo');

					if(purity != 0){
						return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
					}else{
						return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
					}
				}
    		
    	},
		{'text' : 'MRV No','datafield' : 'mrvNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid7').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
    			var mSlNo;
    			console.log(value);
    			if(value != "" || value != 0){
    				mSlNo = value;
    				return "<div align='center'style='margin-top:8px;'>" + mSlNo + "</div>";
    			}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
    			}
			}
		},
		{'text' : 'Vendor Bill No','datafield' : 'vendBillNo','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid7').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Vendor Bill Date','datafield' : 'vbdate','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
			
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid7').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'><b>G Total</b></div>";
				}
			}
    	},
		{'text' : 'Location','datafield' : 'location','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid7').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['gWt'] != null && record['slNo'] != 0 ) ?  record['gWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid7').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['nWt'] != null && record['slNo'] != 0  ) ?  record['nWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid7').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		
		{'text' : 'Wastage Wt.','datafield' : 'wastageWt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['wastageWt'] != null && record['slNo'] != 0 ) ?  record['wastageWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid7').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
    			var purity;
    			if(value != 0){
    				purity = value;
    				return "<div align='right'style='margin-top:8px;'>" + parseFloat(purity).toFixed(2) + "</div>";

    			}else{
    				purity = "";
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";

    			}
			} 
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pWt','width' : '12%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['pWt'] != null && record['slNo'] != 0 ) ?  record['pWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right; margin-left: 85px;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		cellsrenderer: function(row, column, value){
			var purity;
			var purity =  $('#jqxgrid7').jqxGrid('getcellvalue', row, 'slNo');

			if(purity != 0){
				return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
			}else{
				return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
			}
		} 
		},
		{'text' : 'Value in Rs.','datafield' : 'valueInRs','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['valueInRs'] != null && record['slNo'] != 0 ) ?  record['valueInRs'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid7').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Ref Type','datafield' : 'refType','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
		},
		{'text' : 'Ref No','datafield' : 'refNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Ref Sl No','datafield' : 'refslNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Credit/Debit','datafield' : 'creditOrDebit','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Credit/Debit Amt','datafield' : 'creditDebitAmt','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, receiptFgRegFilters(), updateRows, "", "#jqxgrid7");
    $("#jqxgrid7").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}


var receiptFsmDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
        	{'name' : 'vbdate','type' : 'string','map' : 'billDate'}, 

    		{'name' : 'mrvNo','type' : 'long','map' : 'mrvNo'},
    		{'name' : 'slNo','type' : 'int','map' : 'mrvSrialNo'},
    		{'name' : 'vendBillNo','type' : 'float','map' : 'partyBillNo'},
    		
    		{'name' : 'location','type' : 'string','map' : 'metalAccLocation'},
    		
    		{'name' : 'gWt','type' : 'string','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'string','map' : 'netWeight'},
    		
    		{'name' : 'wastageWt','type' : 'string','map' : 'wastageWeight'},
    		{'name' : 'purity','type' : 'float','map' : 'skinPurity'},
    		{'name' : 'pWt','type' : 'string','map' : 'pureWt'},
    		
    		{'name' : 'valueInRs','type' : 'float','map' : 'labourCharges'}, 
    		
    		{'name' : 'refType','type' : 'string','map' : 'refType'},
    		{'name' : 'refNo','type' : 'int','map' : 'refNo'},
    		{'name' : 'refslNo','type' : 'int','map' : 'refSerialNo'},
    		{'name' : 'creditOrDebit','type' : 'string','map' : 'debitOrCredit'},
    		{'name' : 'creditDebitAmt','type' : 'float','map' : 'debitOrCreditAmt'},
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    		aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				},
				cellsrenderer: function(row, column, value){
					var purity;
					var purity =  $('#jqxgrid8').jqxGrid('getcellvalue', row, 'slNo');

					if(purity != 0){
						return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
					}else{
						return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
					}
				}
    		
    	},
		{'text' : 'MRV No','datafield' : 'mrvNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
    		cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid8').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
    			var mSlNo;
    			console.log(value);
    			if(value != "" || value != 0){
    				mSlNo = value;
    				return "<div align='center'style='margin-top:8px;'>" + mSlNo + "</div>";
    			}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
    			}
			}
		},
		{'text' : 'Vendor Bill No','datafield' : 'vendBillNo','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid8').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Vendor Bill Date','datafield' : 'vbdate','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
			
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid8').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'><b>G Total</b></div>";
				}
			}
    	},
		{'text' : 'Location','datafield' : 'location','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid8').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['gWt'] != null && record['slNo'] != 0 ) ?  record['gWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid8').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['nWt'] != null && record['slNo'] != 0  ) ?  record['nWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		  	cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid8').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
				}
			}
		},
		
		{'text' : 'Wastage Wt.','datafield' : 'wastageWt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['wastageWt'] != null && record['slNo'] != 0 ) ?  record['wastageWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid8').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
			cellsrenderer: function(row, column, value){
    			var purity;
    			if(value != 0){
    				purity = value;
    				return "<div align='right'style='margin-top:8px;'>" + parseFloat(purity).toFixed(2) + "</div>";

    			}else{
    				purity = "";
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";

    			}
			} 
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pWt','width' : '12%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
					  var total = (record['pWt'] != null && record['slNo'] != 0 ) ?  record['pWt'] : 0;
		  			  return aggregatedValue +  parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right; margin-left: 85px;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		cellsrenderer: function(row, column, value){
			var purity;
			var purity =  $('#jqxgrid8').jqxGrid('getcellvalue', row, 'slNo');

			if(purity != 0){
				return "<div align='right'style='margin-top:8px;'>" + value + "</div>";
			}else{
				return "<div align='right'style='padding :10px; color:white ; background:#008800;text-align: right;'>" + "<b>" + value + "</b" +"</div>";
			}
		} 
		},
		{'text' : 'Value in Rs.','datafield' : 'valueInRs','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['valueInRs'] != null && record['slNo'] != 0 ) ?  record['valueInRs'] : 0;
						  console.log(total);
		  			  return aggregatedValue + parseFloat(total);
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
			cellsrenderer: function(row, column, value){
				var purity;
				var purity =  $('#jqxgrid8').jqxGrid('getcellvalue', row, 'slNo');

				if(purity != 0){
					return "<div align='right'style='margin-top:8px;'>" + parseFloat(value).toFixed(2) + "</div>";
				}else{
					return "<div align='right'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'Ref Type','datafield' : 'refType','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
		},
		{'text' : 'Ref No','datafield' : 'refNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Ref Sl No','datafield' : 'refslNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Credit/Debit','datafield' : 'creditOrDebit','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Credit/Debit Amt','datafield' : 'creditDebitAmt','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, receiptFsmFilters(), updateRows, "", "#jqxgrid8");
    $("#jqxgrid8").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}

var vendorReturnFilters = function(){
	var vrFilters = issueDetFgFsmFilters();
	vrFilters.fieldFilters.docType = "vendorReturn";
	return fieldFilters;
}

$("#vendRet").on('click',function(){
	vendRetDetGrid();
	$("#jqxgrid9").show();
});

var vendRetDetGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
        	{'name' : 'mivNo','type' : 'string','map' : 'mivHeader>id'}, 
    		{'name' : 'slNo','type' : 'int','map' : 'mivSrialNo'},

    		{'name' : 'vendBillNo','type' : 'float','map' : 'partyBillNo'},
        	{'name' : 'vbdate','type' : 'string','map' : 'partyBillDat'}, 
        	
    		{'name' : 'refType','type' : 'string','map' : 'refType'},
    		{'name' : 'refNo','type' : 'long','map' : 'refNo'},
    		{'name' : 'refSlNo','type' : 'long','map' : 'refSerialNo'},

    		{'name' : 'location','type' : 'string','map' : 'metalAccLocation'},
    		
    		{'name' : 'gWt','type' : 'float','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'float','map' : 'netWeight'},
    		
    		{'name' : 'wastagePerc','type' : 'string','map' : 'wastperc'},

    		{'name' : 'wastageWt','type' : 'string','map' : 'wastWt'},
    		{'name' : 'purity','type' : 'float','map' : 'skinPuritys'},
    		{'name' : 'pWt','type' : 'float','map' : 'pureWt'},
    		
    		{'name' : 'labourPerc','type' : 'float','map' : 'labourPerc'}, 
    		{'name' : 'labourVal','type' : 'float','map' : 'labourVal'}, 
    		{'name' : 'liCost','type' : 'float','map' : 'lineItemCost'}, 

        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    	},
		{'text' : 'MIV No','datafield' : 'mivNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Vendor Bill No','datafield' : 'vendBillNo','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Vendor Bill Date','datafield' : 'vbdate','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    	},
		{'text' : 'Ref Type','datafield' : 'refType','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
		},
		{'text' : 'Ref No','datafield' : 'refNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Ref Sl No','datafield' : 'refSlNo','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Location','datafield' : 'location','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "issue",
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				},
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['gWt'] != null  ) ?  record['gWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['nWt'] != null  ) ?  record['nWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : '% of Wastage Credit','datafield' : 'wastagePerc','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
		},
		{'text' : 'Wastage Cr. Wt.','datafield' : 'wastageWt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pWt','width' : '12%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['pWt'] != null  ) ?  record['pWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : '% of Labour Credit','datafield' : 'labourPerc','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "receipt",
		},
		{'text' : 'Labour in Rs.','datafield' : 'labourVal','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
		},
		{'text' : 'Line Item Cost','datafield' : 'liCost','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "closing",
		}
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, vendorReturnFilters(), updateRows, "", "#jqxgrid9");
    $("#jqxgrid9").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}

//Repair Grids Started
var repairIssFilters = function(){
	var riFilters = issueDetFgFsmFilters();
	riFilters.fieldFilters.docType = "RepairIssue";
	return fieldFilters;
}

$("#repairIssue").on('click',function(){
	repairIssueGrid();
	$("#jqxgrid10").show();
});

var repairIssueGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
        	{'name' : 'docNo','type' : 'string','map' : 'refNo'}, 
    		{'name' : 'slNo','type' : 'int','map' : 'refSerialNo'},

        	
    		{'name' : 'docType','type' : 'string','map' : 'refType'},

    		{'name' : 'grossWeight','type' : 'float','map' : 'grossWeight'},
    		{'name' : 'netWeight','type' : 'float','map' : 'netWeight'},
    		
    		{'name' : 'purity','type' : 'float','map' : 'skinPuritys'},
    		{'name' : 'pureWt','type' : 'float','map' : 'pureWt'},
    		
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    	},
		{'text' : 'Doc No','datafield' : 'docNo','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Doc Type','datafield' : 'docType','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Gross Wt.','datafield' : 'grossWeight','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total =  record['grossWeight'] ;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : 'Net Wt','datafield' : 'netWeight','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total =  record['netWeight'] 
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pureWt','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total =  record['pureWt'] 
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, repairIssFilters(), updateRows, "", "#jqxgrid10");
    $("#jqxgrid10").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}

var repairRecptFilters = function(){
	var riFilters = issueDetFgFsmFilters();
	riFilters.fieldFilters.docType = "repairReceipt";
	return fieldFilters;
}

$("#repairReceipt").on('click',function(){
	repairReceiptGrid();
	$("#jqxgrid11").show();
});

var repairReceiptGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'billDate'}, 
        	{'name' : 'docNo','type' : 'string','map' : 'mrvNo'}, 
    		{'name' : 'slNo','type' : 'int','map' : 'mrvSrialNo'},
    		{'name' : 'billNo','type' : 'int','map' : 'partyBillNo'},

        	
    		{'name' : 'docType','type' : 'string','map' : 'refType'},

    		{'name' : 'gWt','type' : 'float','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'float','map' : 'netWeight'},
    		
    		{'name' : 'purity','type' : 'float','map' : 'skinPurity'},
    		{'name' : 'pWt','type' : 'float','map' : 'pureWt'},
    		
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    	},
		{'text' : 'Doc No','datafield' : 'docNo','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Bill No','datafield' : 'billNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Doc Type','datafield' : 'docType','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['gWt'] != null ) ?  record['gWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['nWt'] != null ) ?  record['nWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pWt','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['pWt'] != null ) ?  record['pWt'] : 0;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, repairRecptFilters(), updateRows, "", "#jqxgrid11");
    $("#jqxgrid11").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}

// GR Details Grid
var grFilters = function(){
	var riFilters = issueDetFgFsmFilters();
	riFilters.fieldFilters.docType = "IGRDetails";
	return fieldFilters;
}

$("#grDet").on('click',function(){
	grDetailsGrid();
	$("#jqxgrid12").show();
});

var grDetailsGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
        	{'name' : 'mrvNo','type' : 'string','map' : 'mrvNo'}, 
    		{'name' : 'slNo','type' : 'int','map' : 'mrvSrialNo'},
    		{'name' : 'grNo','type' : 'int','map' : 'grNo'},

    		{'name' : 'gWt','type' : 'float','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'float','map' : 'netWeight'},
    		{'name' : 'wWt','type' : 'string','map' : 'wastageWeight'},
    		{'name' : 'pWt','type' : 'float','map' : 'pureWt'},

    		{'name' : 'labour','type' : 'float','map' : 'labourCharges'},
    		
    		{'name' : 'stCost','type' : 'float','map' : 'stoneCost'},
    		{'name' : 'accCost','type' : 'float','map' : 'accCost'},
    		{'name' : 'liCost','type' : 'float','map' : 'lineItemCost'},
    		{'name' : 'excess','type' : 'float','map' : 'excessWt'},


        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    		cellsrenderer: function(row, column, value){
				var date;
				var date =  $('#jqxgrid12').jqxGrid('getcellvalue', row, 'date');
				console.log(date);
				if(date != "Total"){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'>"+ '<b>' + value + '</b>'+ "</div>";
				}
			}
    	},
		{'text' : 'MRV No','datafield' : 'mrvNo','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,
    		cellsrenderer: function(row, column, value){
				var date;
				var date =  $('#jqxgrid12').jqxGrid('getcellvalue', row, 'date');
				console.log(date);
				if(date != "Total"){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'MRV Sl No','datafield' : 'slNo','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			cellsrenderer: function(row, column, value){
				var date;
				var date =  $('#jqxgrid12').jqxGrid('getcellvalue', row, 'date');
				console.log(date);
				if(date != "Total"){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			}
		},
		{'text' : 'GR No','datafield' : 'grNo','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,
			cellsrenderer: function(row, column, value){
				var date;
				var date =  $('#jqxgrid12').jqxGrid('getcellvalue', row, 'date');
				console.log(date);
				if(date != "Total"){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'></div>";
				}
			},
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				},
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',
			cellsrenderer: function(row, column, value){
				var date;
				var date =  $('#jqxgrid12').jqxGrid('getcellvalue', row, 'date');
				console.log(date);
				if(date != "Total"){
					return "<div align='center'style='margin-top:8px;'>" + parseFloat(value).toFixed(3)  + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'>"+ '<b>' + parseFloat(value).toFixed(3)  + '</b>'+ "</div>";
				}
			},
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['date'] !="Total") ? record['gWt'] : 0.00 ;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',
			cellsrenderer: function(row, column, value){
				var date;
				var date =  $('#jqxgrid12').jqxGrid('getcellvalue', row, 'date');
				console.log(date);
				if(date != "Total"){
					return "<div align='center'style='margin-top:8px;'>" + parseFloat(value).toFixed(3)  + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'>"+ '<b>' + parseFloat(value).toFixed(3) + '</b>'+ "</div>";
				}
			},
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['date'] !="Total") ? record['nWt'] : 0.00 ;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},	
		{'text' : 'Wastage Wt','datafield' : 'wWt','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',
			cellsrenderer: function(row, column, value){
				var date;
				var date =  $('#jqxgrid12').jqxGrid('getcellvalue', row, 'date');
				console.log(date);
				if(date != "Total"){
					return "<div align='center'style='margin-top:8px;'>" + value + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'>"+ '<b>' + value + '</b>'+ "</div>";
				}
			}
		},
		{'text' : 'Pure Wt(Net Wt + Wastage)','datafield' : 'pWt','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',
			cellsrenderer: function(row, column, value){
				var date;
				var date =  $('#jqxgrid12').jqxGrid('getcellvalue', row, 'date');
				console.log(date);
				if(date != "Total"){
					return "<div align='center'style='margin-top:8px;'>" + parseFloat(value).toFixed(3)  + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'>"+ '<b>' + parseFloat(value).toFixed(3)  + '</b>'+ "</div>";
				}
			},
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = (record['date'] !="Total") ? record['pWt'] : 0.00 ;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : 'Labour Cost','datafield' : 'labour','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',
			cellsrenderer: function(row, column, value){
				var date;
				var date =  $('#jqxgrid12').jqxGrid('getcellvalue', row, 'date');
				console.log(date);
				if(date != "Total"){
					return "<div align='center'style='margin-top:8px;'>" + parseFloat(value).toFixed(2)  + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'>"+ '<b>' + parseFloat(value).toFixed(2)  + '</b>'+ "</div>";
				}
			}
		},
		{'text' : 'Stone Cost','datafield' : 'stCost','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',
			cellsrenderer: function(row, column, value){
				var date;
				var date =  $('#jqxgrid12').jqxGrid('getcellvalue', row, 'date');
				console.log(date);
				if(date != "Total"){
					return "<div align='center'style='margin-top:8px;'>" + parseFloat(value).toFixed(2)  + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'>"+ '<b>' + value  + '</b>'+ "</div>";
				}
			}
		},
		{'text' : 'Accessory Cost ','datafield' : 'accCost','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',
			cellsrenderer: function(row, column, value){
				var date;
				var date =  $('#jqxgrid12').jqxGrid('getcellvalue', row, 'date');
				console.log(date);
				if(date != "Total"){
					return "<div align='center'style='margin-top:8px;'>" + parseFloat(value).toFixed(2)  + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'>"+ '<b>' + value  + '</b>'+ "</div>";
				}
			}
		},
		{'text' : 'Line Item Cost','datafield' : 'liCost','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',
			cellsrenderer: function(row, column, value){
				var date;
				var date =  $('#jqxgrid12').jqxGrid('getcellvalue', row, 'date');
				console.log(date);
				if(date != "Total"){
					return "<div align='center'style='margin-top:8px;'>" + parseFloat(value).toFixed(2)  + "</div>";
				}else{
					return "<div align='center'style='padding :18px; color:white ; background:#008800;'>"+ '<b>' + value  + '</b>'+ "</div>";
				}
			}
		},
		{'text' : 'Excess','datafield' : 'excess','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',
			cellsrenderer: function(row, column, value){
				var date;
				var date =  $('#jqxgrid12').jqxGrid('getcellvalue', row, 'date');
				console.log(date);
				var newValue;
				if(value == null || value ==  ""){
					newValue = 0.000;
				}else{
					newValue = value;
				}
				if(date != "Total"){
					return "<div align='center'style='margin-top:8px;'>" + newValue.toFixed(3)  + "</div>";
				}else{
					return "<div align='center'style='padding :10px; color:white ; background:#008800;'>"+ '<b>' + newValue.toFixed(3)  + '</b>'+ "</div>";
				}
			}
		
		}
		
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, grFilters(), updateRows, "", "#jqxgrid12");
    $("#jqxgrid12").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
		
    });
}

//Sample Grids Started
var sampleIssueFilters = function(){
	var riFilters = issueDetFgFsmFilters();
	riFilters.fieldFilters.docType = "SampleIssue";
	return fieldFilters;
}

$("#sampleIssue").on('click',function(){
	sampleIssueGrid();
	$("#jqxgrid13").show();
});

var sampleIssueGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
        	{'name' : 'docNo','type' : 'string','map' : 'refNo'}, 
    		{'name' : 'slNo','type' : 'int','map' : 'refSerialNo'},

        	
    		{'name' : 'docType','type' : 'string','map' : 'refType'},

    		{'name' : 'gWt','type' : 'float','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'float','map' : 'netWeight'},
    		
    		{'name' : 'purity','type' : 'float','map' : 'skinPuritys'},
    		{'name' : 'pWt','type' : 'float','map' : 'pureWt'},
    		
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    	},
		{'text' : 'Doc No','datafield' : 'docNo','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Doc Type','datafield' : 'docType','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = record['gWt'] ;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = record['nWt'] ;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pWt','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = record['pWt'] ;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, sampleIssueFilters(), updateRows, "", "#jqxgrid13");
    $("#jqxgrid13").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}

var sampleReceiptFilters = function(){
	var riFilters = issueDetFgFsmFilters();
	riFilters.fieldFilters.docType = "SampleReceipt";
	return fieldFilters;
}

$("#sampleReceipt").on('click',function(){
	sampleReceiptGrid();
	$("#jqxgrid14").show();
});

var sampleReceiptGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'createdDate'}, 
        	{'name' : 'docNo','type' : 'string','map' : 'mrvNo'}, 
    		{'name' : 'slNo','type' : 'int','map' : 'mrvSrialNo'},
    		{'name' : 'billNo','type' : 'int','map' : 'partyBillNo'},

        	
    		{'name' : 'docType','type' : 'string','map' : 'refType'},

    		{'name' : 'gWt','type' : 'float','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'float','map' : 'netWeight'},
    		
    		{'name' : 'purity','type' : 'float','map' : 'skinPurity'},
    		{'name' : 'pWt','type' : 'float','map' : 'pureWt'},
    		
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    	},
		{'text' : 'Doc No','datafield' : 'docNo','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,columngroup : "opening",
		},
		{'text' : 'Sl No','datafield' : 'slNo','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Bill No','datafield' : 'billNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Doc Type','datafield' : 'docType','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',columngroup : "opening",
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = record['gWt'] ;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = record['nWt'] ;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Purity','datafield' : 'purity','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',columngroup : "receipt",
		},
		{'text' : 'Pure Wt(N Wt + Wastage)','datafield' : 'pWt','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "closing",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = record['pWt'] ;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  }
		},
		
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, sampleReceiptFilters(), updateRows, "", "#jqxgrid14");
    $("#jqxgrid14").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}

//Adjustment Voucher Grid
var adjVoucherFilters = function(){
	var riFilters = issueDetFgFsmFilters();
	riFilters.fieldFilters.docType = "AdjVoucher";
	return fieldFilters;
}

$("#adjVouch").on('click',function(){
	adjVoucherGrid();
	$("#jqxgrid15").show();
});

var adjVoucherGrid = function(){
	
	var updateRows = function(rowid, newdata, commit) {	
	}
	
   var  datafields =
        [
        	{'name' : 'date','type' : 'string','map' : 'adjustmentDate'}, 
        	{'name' : 'adjNo','type' : 'string','map' : 'adjId'}, 
    		{'name' : 'location','type' : 'string','map' : 'locCode>id'},

        	
    		{'name' : 'creditOrDebit','type' : 'string','map' : 'debitOrCreditType>id'},

    		{'name' : 'gWt','type' : 'float','map' : 'grossWeight'},
    		{'name' : 'nWt','type' : 'float','map' : 'netWeight'},
    		
    		{'name' : 'remarks','type' : 'string','map' : 'remarks'},
    		{'name' : 'pWt','type' : 'float','map' : 'pureWeight'},
    		
        ];
   
    var columns = [
    	{'text' : 'Date','datafield' : 'date','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,
    	},
		{'text' : 'Adjustment No','datafield' : 'adjNo','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,
		},
		{'text' : 'Location','datafield' : 'location','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
		},
		{'text' : 'Credit/Debit','datafield' : 'creditOrDebit','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				},
		},
		{'text' : 'Gross Wt.','datafield' : 'gWt','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total =  record['gWt'] ;
						  console.log(total);
		  			  return aggregatedValue + total ;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : 'Net Wt','datafield' : 'nWt','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total =  record['nWt'] ;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : 'Pure Wt','datafield' : 'pWt','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
		  			  console.log(record);
					  var total = record['pWt'] ;
						  console.log(total);
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
			    			  return '<span style="margin-top: 5px; color: brown; text-align: right;">'+"<b>" + aggregates["Total"] + "</b>" + '</span>';
		    		  	}
		  	  },
		},
		{'text' : 'Remarks','datafield' : 'remarks','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d2',
		},
      ];
   
    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASOnchangeValues", "list", columns, adjVoucherFilters(), updateRows, "", "#jqxgrid15");
    $("#jqxgrid15").jqxGrid({    	
    	width : '100%',
		height: '320px',
		theme: 'energyblue',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		theme: 'energyblue',
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
 	    statusbarheight: 20,
 	    showaggregates: true,
		showstatusbar: true,
    });
}

/////// Vendor MAS Summary Started
var summaryFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var vTypeS = $('#vTypeS').val();
	var vCodeS = $('#vCodeS').val();
	var msegS = $('#msegS').val();
	var jwType = $("#jwType").val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (vTypeS != "" && vTypeS != null) {
		fieldFilters.fieldFilters["vType"] = vTypeS;
	}
	if (vCodeS != "" && vCodeS != null) {
		fieldFilters.fieldFilters["vCodeList"] = vCodeS;
	}
	if (msegS != "" && msegS != null) {
		fieldFilters.fieldFilters["segId"] = msegS;
	}
	if (jwType != "" && jwType != null) {
		fieldFilters.fieldFilters["JwTypes"] = jwType;
	}

	return fieldFilters;
}




$("#searchSummary").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == "" || $("#vTypeS").val() == "" || $("#vCodeS").val() == "" 
		|| $("#msegS").val() == "" || $("#jwType").val() == "" ){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 1000,
			title : 'Error'
		});
		return false
	}else{
		postJSON('/OrderExecution/api/v1/vendorMASSummary',JSON.stringify(summaryFieldFilters()), function(data) {
			var summArr = [];
			
			var obj13 = data.payload.OPENING_BALANCE_RM;
			obj13.doctype = "OPENING_BALANCE_RM";
			obj13.opBal = data.payload.OPENING_BALANCE_RM.openPwtRM;
			summArr.push(obj13);
			
			var obj12 = data.payload.OPENING_BALANCE_FG;
			obj12.doctype = "OPENING_BALANCE_FG";
			obj12.opBal = data.payload.OPENING_BALANCE_FG.openPwtFG;
			summArr.push(obj12);
			
			var obj14 = {};
			obj14.doctype = "CLOSING_BAL_AS_PER_TRA_RM";
			obj14.cloBal = data.payload.CLOSING_BAL_AS_PER_TRA_RM;
			summArr.push(obj14);
			
			var obj15 = {};
			obj15.doctype = "CLOSING_BAL_AS_PER_TRA_FG";
			obj15.cloBal = data.payload.CLOSING_BAL_AS_PER_TRA_FG;
			summArr.push(obj15);
			
			var obj17 = data.payload.MASTER_CLOSING_BALANCE_RM;
			obj17.doctype = "MASTER_CLOSING_BALANCE_RM";
			obj17.closBalMaster = data.payload.MASTER_CLOSING_BALANCE_RM.clsPwtMstRM;
			summArr.push(obj17);
			
			var obj16 = data.payload.MASTER_CLOSING_BALANCE_FG;
			obj16.doctype = "MASTER_CLOSING_BALANCE_FG";
			obj16.closBalMaster = data.payload.MASTER_CLOSING_BALANCE_FG.clsPwtMstFG;
			summArr.push(obj16);
			
			var obj1 = data.payload.MIV_RAW_MATERIAL_REGULAR;
			obj1.doctype = "MIV_RAW_MATERIAL_REGULAR";
			summArr.push(obj1);
			
			var obj3 = data.payload.MIV_FINISHED_GOOD_REGULAR;
			obj3.doctype = "MIV_FINISHED_GOOD_REGULAR";
			summArr.push(obj3);
			
			var obj17 = data.payload.MIV_RAW_MATERIAL_SYSTEM;
			obj17.doctype = "MIV_RAW_MATERIAL_SYSTEM";
			summArr.push(obj17);
			
			var obj4 = data.payload.MIV_FINISHED_GOOD_SYSTEM;
			obj4.doctype = "MIV_FINISHED_GOOD_SYSTEM"
			summArr.push(obj4);
			
			var obj2 = data.payload.VENDOR_RETURN;
			obj2.doctype = "MIV_VENDOR_RETURN";
			summArr.push(obj2);
			
			var obj5 = data.payload.MRV_RAW_MATERIAL_REGULAR;
			obj5.doctype = "MRV_RAW_MATERIAL_REGULAR";
			summArr.push(obj5);
			
			var obj7 = data.payload.MRV_FINISHED_GOODS_REGULAR;
			obj7.doctype = "MRV_FINISHED_GOODS_REGULAR";
			summArr.push(obj7);
			
			var obj6 = data.payload.MRV_RAW_MATERIAL_SYSTEM;
			obj6.doctype = "MRV_RAW_MATERIAL_SYSTEM";
			summArr.push(obj6);
			
			var obj8 = data.payload.MRV_FINISHED_GOODS_SYSTEM;
			obj8.doctype = "MRV_FINISHED_GOODS_SYSTEM";
			summArr.push(obj8);
			
			var obj9 = data.payload.GR;
			obj9.doctype = "GR";
			summArr.push(obj9);
			
			var obj10 = data.payload.ADJUSTMENT_DEBIT_RECEIPT;
			obj10.doctype = "ADJUSTMENT_VOUCHER_DEBIT_RECEIPT";
			summArr.push(obj10);
			
			var obj18 = data.payload.ADJUSTMENT_CREDIT_ISSUE;
			obj18.doctype = "ADJUSTMENT_VOUCHER_CREDIT_ISSUE";
			summArr.push(obj18);
			
			/*var obj11 = data.payload.ADJUSTMENT_VOUCHER;
			obj11.doctype = "ADJUSTMENT_CREDIT_ISSUE";
			summArr.push(obj11);*/

			summarySearchGrid(summArr);
			$("#jqxgridS").show();
	});
  }
});

var summarySearchGrid = function(response) {
	console.log(response)
	var source = {
			datafields : [
				{'name' : 'docType','type' : 'string','map' : 'doctype'},

	        	{'name' : 'opBal','type' : 'float','map' : ''}, 
	        	{'name' : 'receipt','type' : 'float','map' : 'recptPwt'}, 
	    		{'name' : 'issue','type' : 'float','map' : 'issPwt'},
	    		
	    		{'name' : 'cloBal','type' : 'float','map' : ''},
	        	{'name' : 'closBalMaster','type' : 'float','map' : ''},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridS").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '600px',
		theme: 'energyblue',
		pagesize : 20,
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		editable : true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		columns : [
			{'text' : 'Doc Type','datafield' : 'docType','width' : '20%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
			{'text' : 'Opening Balance','datafield' : 'opBal','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3'},
			{'text' : 'Receipt','datafield' : 'receipt','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3'},
			{'text' : 'Issue','datafield' : 'issue','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3'},
			{'text' : 'Closing Balance as per Transaction','datafield' : 'cloBal','width' : '15%',editable : false,cellsalign : 'center',align : 'center',sortable : false,cellsformat:'d3'},
			{'text' : 'Closing Balance as per Master','datafield' : 'closBalMaster','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3'},
		]
	});
}

$("#clearSum").on('click',function(){
	window.location.href="javascript:showContentPage('vendorMasSummary', 'bodySwitcher')"
});

$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('vendorMasDetailReport', 'bodySwitcher')"
});