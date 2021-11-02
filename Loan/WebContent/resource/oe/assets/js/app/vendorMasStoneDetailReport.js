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

var onLoadCustOrd = function() {
// GET JSON API CALL FOR LOV
	$.getJSON('/OrderExecution/api/v1/vendorMASStoneOnloadLov',function(response) {
		var vlist = response.payload.vCodeList;
		// smart Search for Order No
		var data = [];
		$.each(vlist, function(key, value) {
		data.push({
			value : value.id,
			label : value.name

			});
		});
		$(function() {
			$("#vendorCode").autocomplete({
				source : data,
				focus : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				 select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#vendorCode-value").val(ui.item.value);
					}
				});
			});
		
		$('#stoneSegmentS').empty().append('<option value="" selected>--Select--</option>');
			$.each(response.payload.stoneSeg, function(key, val) {
			$('#stoneSegmentS').append('<option value="' + val.id + '">' + val.description + '</option>');
		});

	});
	
	
}

onLoadCustOrd();

$("#stoneSegmentS").on('change',function(){
	if($("#stoneSegmentS").val() != ""){
		$.getJSON('/OrderExecution/api/v1/getStoneCategoryByStone?segmentId='+$("#stoneSegmentS").val(),function(response) {
			if(response.resCode == 1){
				$('#stoneCatS').empty().append('<option value="" selected>--Select--</option>');
					$.each(response.payload.stoneCats, function(key, val) {
					$('#stoneCatS').append('<option value="' + val.id + '">' + val.description + '</option>');
				});
			}
		});
	}
});

var searchFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var vTypeS = $('#vendorCode-value').val();
	var stoneSegmentS = $('#stoneSegmentS').val();
	var stoneCatS = $('#stoneCatS').val();

	
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
		fieldFilters.fieldFilters["vCodeList"] = vTypeS;
	}
	if (stoneSegmentS != "" && stoneSegmentS != null) {
		fieldFilters.fieldFilters["stoneSeg"] = stoneSegmentS;
	}
	if (stoneCatS != "" && stoneCatS != null) {
		fieldFilters.fieldFilters["catId"] = stoneCatS;
	}
	
	fieldFilters.fieldFilters["docType"] = "DIMASDetails";

	return fieldFilters;
}

$("#headersection").hide();
$("#searchSection").hide();

$("#search").on('click',function(){
	if($("#fromDateS").val() == "" || $("#toDateS").val() == "" || $("#vendorCode").val() == "" || $("#stoneSegmentS").val() == "" || $("#stoneCatS").val() == ""){
		$.growl.error({
			message : "Please Fill Mandatory Fields !!",
			duration : 1000,
			title : 'Error'
		});
		return false
	}else{
		
		postJSON('/OrderExecution/api/v1/vendorMASStonOnchangeValues', JSON.stringify(searchFieldFilters()), function(data){
			if(data.resCode == "1"){
				$("#headersection").show();
				$("#searchSection").show();
				var fromDateS = $('#fromDateS').val();
				var toDateS = $('#toDateS').val();
				var vCode = $("#vCodeS option:selected").text();
				var stoneSegmentS = $('#stoneSegmentS option:selected').text();

				$("#tab1Name").text(stoneSegmentS);
				
				var vendAdd =  data.payload.vendors.address1  + " , "  + data.payload.vendors.address3 + " , " +  data.payload.vendors.vendorCity + " - " + data.payload.vendors.pinCode + " , " + data.payload.vendors.vendorState + " , " + data.payload.vendors.vendorCountry ;
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
						+'<th style="border-color: #0065aa;" class="vendCol">'+ data.payload.vendors.vendorCode + '</th>'
						+'</tr>'
						+'<tr style="border-color: #0065aa;">'
						+'<th style="border-color: #0065aa;" class="vendCol">Vendor Name :</th>'
						+'<th style="border-color: #0065aa;" class="vendCol">'+  data.payload.vendors.vendorName + '</th>'
						+'</tr>'
						+'<tr style="border-color: #0065aa;">'
						+'<th style="border-color: #0065aa;" class="vendCol">Address :</th>'
						+'<th style="border-color: #0065aa;" class="vendCol"> '+ vendAdd +'</th>'
						+'</tr>'
				);

				/*var masList =[];
				
				data.payload.FG.location = "Pure Gold/ Finished  Good";
				masList.push(data.payload.FG);
				
				data.payload.RM.location = "Pure Gold/ Raw Material";
				masList.push(data.payload.RM);
				
				data.payload.StockSample.location = "Stock Sample";
				masList.push(data.payload.StockSample);

				data.payload.CustomerOrder.location = "Customer Order";
				masList.push(data.payload.CustomerOrder);
				
				data.payload.CustomerSample.location = "Customer Sample";
				masList.push(data.payload.CustomerSample);
				
				data.payload.StockRepair.location = "Stock Repair";
				masList.push(data.payload.StockRepair);
				
				data.payload.CustomerRepair.location = "Customer Repair";
				masList.push(data.payload.CustomerRepair);
				
				console.log(masList);*/
				$('#masHeading').empty();

				var appendText = $("#stoneSegmentS option:selected").text() +" " + 'Manufacturing Account Statement From '+ $("#fromDateS").val() + ' to ' + $("#toDateS").val();
				$("#masHeading").append(appendText);
				
				/*var cName = data.payload.company.compName;
				$("#cmpName").empty();
				$("#cmpName").append(cName);
				
				$("#cmpAdd").empty();
				$("#cmpAdd").append(cAddress);*/
				
				vendorMASStoneSearchGrid();
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
function vendorMASStoneSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'segment','type' : 'string','map' : 'vendorStoneBalance>segment>description'}, 
		{'name' : 'mainCat','type' : 'string','map' : 'vendorStoneBalance>category>description'}, 
		{'name' : 'stoneCode','type' : 'string','map' : 'stoneCode'}, 

		{'name' : 'opBal','type' : 'float','map' : 'psrStoneBulkOpenWt'},
		{'name' : 'issue','type' : 'float','map' : 'psrBulkIssueWt'},
		{'name' : 'receipt','type' : 'float','map' : 'psrBulkStoneReciptWt'},
		
		{'name' : 'cloBal','type' : 'float','map' : 'psrBulkStoneCloseWt'},
		{'name' : 'uqc','type' : 'string','map' : 'uqc'}, 

	];

	var columns = [
		{'text' : 'Segment','datafield' : 'segment','width' : '15%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Main Category','datafield' : 'mainCat','width' : '20%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "opening",
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				}
		},
		{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false},

		{'text' : 'Opening Balance','datafield' : 'opBal','width' : '15%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "opening",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['opBal'] == null) ? 0 : record['opBal'];
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
		{'text' : 'Issues','datafield' : 'issue','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "opening",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['issue'] == null) ? 0 : record['issue'];
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
		
		{'text' : 'Receipt','datafield' : 'receipt','width' : '10%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['receipt'] == null) ? 0 : record['receipt'];
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
		{'text' : 'Closing Balance','datafield' : 'cloBal','width' : '15%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',columngroup : "issue",
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['cloBal'] == null) ? 0 : record['cloBal'];
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
		{'text' : 'UQC','datafield' : 'uqc','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',columngroup : "issue"},
		
	];

	showMyGrid(datafields, "/OrderExecution/api/v1/vendorMASStonOnchangeValues", "list",columns, searchFieldFilters(), updateRows, "");
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
			/*columngroups : [ {
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
			}],*/
	});
}

// Issue Details
$("#issueFg").on('click',function(){
	$('#issHeading').empty();
	var appendText = $("#stoneSegmentS option:selected").text() +" " + ' Issue Details  From '+ $("#fromDateS").val() + ' to ' + $("#toDateS").val();
	$("#issHeading").append(appendText);
	
	if($("#stoneSegmentS option:selected").text() == "Diamond"){
		vendorMASDiamondIssueGrid();
		$("#jqxgrid1").show();
	}else{
		vendorMASStoneIssueGrid();
		$("#jqxgrid1").show();
	}
});

var issueDetFilters = function() {
	var issueFilters = searchFieldFilters();
	issueFilters.fieldFilters.docType = "VmasStoneIssDetails";
	return fieldFilters;
}

//Search grid started
//For OS and PS
function vendorMASStoneIssueGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'givDate','type' : 'string','map' : 'createdDate'}, 
		{'name' : 'givNo','type' : 'int','map' : 'givNo'}, 

		{'name' : 'givSlNo','type' : 'int','map' : 'givSrlNo'},
		{'name' : 'psrType','type' : 'string','map' : 'psrBulk'},
		{'name' : 'psrNo','type' : 'int','map' : 'psrNos'},
		
		{'name' : 'refDocNo','type' : 'int','map' : 'refNo'},
		{'name' : 'refDocSlNo','type' : 'int','map' : 'refSerialNo'},
		
		{'name' : 'segment','type' : 'string','map' : 'stoneSegment>name'}, 
		{'name' : 'mainCat','type' : 'string','map' : 'category>name'}, 
		{'name' : 'subCatShape','type' : 'string','map' : 'subCatShape'}, 
		{'name' : 'stoneCode','type' : 'string','map' : 'stoneCode'}, 
		{'name' : 'locationCode','type' : 'string','map' : 'stoneLocation'}, 
		{'name' : 'stoneWt','type' : 'float','map' : 'stoneWght'}, 
		{'name' : 'uqc','type' : 'string','map' : 'uqc'}, 
		{'name' : 'wtCostRange','type' : 'string','map' : 'wtCostRange'}, 
		{'name':'stoneSrlNo','type':'int'}

	];

	var columns = [
		{'text' : 'GIV Date','datafield' : 'givDate','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'GIV No','datafield' : 'givNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'GIV Sl No','datafield' : 'givSlNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		{'text' : 'PSR Type','datafield' : 'psrType','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'PSR No','datafield' : 'psrNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Ref Doc No','datafield' : 'refDocNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Ref Doc Sl No','datafield' : 'refDocSlNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Stone Sl No','datafield' : 'stoneSrlNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		{'text' : 'Stone Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Main Cat','datafield' : 'mainCat','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat/Shape','datafield' : 'subCatShape','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Weight/Cost Range','datafield' : 'wtCostRange','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		{'text' : 'Location Code','datafield' : 'locationCode','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				}
		},
		{'text' : 'Stone Wt','datafield' : 'stoneWt','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['stoneWt'] == null) ? 0 : record['stoneWt'];
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
		{'text' : 'UQC','datafield' : 'uqc','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		];

    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASStonOnchangeValues", "list", columns, issueDetFilters(), updateRows, "", "#jqxgrid1");
	$("#jqxgrid1").jqxGrid({	
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
		//virtualmode : true,
		showaggregates: true,
		showstatusbar: true,
			/*columngroups : [ {
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
			}],*/
	});
}

function vendorMASDiamondIssueGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'givDate','type' : 'string','map' : 'createdDate'}, 
		{'name' : 'givNo','type' : 'int','map' : 'givNo'}, 

		{'name' : 'givSlNo','type' : 'int','map' : 'givSrlNo'},
		{'name' : 'psrType','type' : 'string','map' : 'psrBulk'},
		{'name' : 'psrNo','type' : 'int','map' : 'psrNos'},
		
		{'name' : 'refDocNo','type' : 'int','map' : 'refNo'},
		{'name' : 'refDocSlNo','type' : 'int','map' : 'refSerialNo'},
		
		{'name' : 'stoneSlNo','type' : 'int','map' : 'stoneSrlNo'},
		{'name' : 'stoneCode','type' : 'string','map' : 'stoneCode'}, 

		{'name' : 'wtCostRange','type' : 'string','map' : 'wtCostRange'}, 
		{'name' : 'subCatShape','type' : 'string','map' : 'subCatShape'}, 
		{'name' : 'color','type' : 'string','map' : 'color'}, 
		{'name' : 'actColor','type' : 'string','map' : 'actColor'}, 
		
		{'name' : 'clarity','type' : 'string','map' : 'clarity'}, 
		{'name' : 'cutGrade','type' : 'string','map' : 'cutgrade'}, 
		{'name' : 'locationCode','type' : 'string','map' : 'stoneLocation'}, 
		
		{'name' : 'stoneWt','type' : 'float','map' : 'stoneWght'}, 
		{'name' : 'uqc','type' : 'string','map' : 'uqc'}, 
		
		{'name' : 'segment','type' : 'string','map' : 'stoneSegment>name'}, 
		{'name' : 'mainCat','type' : 'string','map' : 'category>name'},
	];

	var columns = [
		{'text' : 'GIV Date','datafield' : 'givDate','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'GIV No','datafield' : 'givNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'GIV Sl No','datafield' : 'givSlNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'PSR Type','datafield' : 'psrType','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'PSR No','datafield' : 'psrNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Ref Doc No','datafield' : 'refDocNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Ref Doc Sl No','datafield' : 'refDocSlNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Stone Sl No','datafield' : 'stoneSlNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Stone Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Main Cat','datafield' : 'mainCat','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},

		{'text' : 'Weight/Cost Range','datafield' : 'wtCostRange','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat/Shape','datafield' : 'subCatShape','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Color','datafield' : 'color','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Actual Color','datafield' : 'actColor','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},

		{'text' : 'Location Code','datafield' : 'locationCode','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				}
		},
		{'text' : 'Diamond Wt','datafield' : 'stoneWt','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['stoneWt'] == null) ? 0 : record['stoneWt'];
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
		{'text' : 'UQC','datafield' : 'uqc','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		];

    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASStonOnchangeValues", "list", columns, issueDetFilters(), updateRows, "", "#jqxgrid1");
	$("#jqxgrid1").jqxGrid({	
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
		//virtualmode : true,
		showaggregates: true,
		showstatusbar: true,
			/*columngroups : [ {
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
			}],*/
	});
}

// Receipt Details

$("#receiptRm").on('click',function(){
	$('#recHeading').empty();
	var appendText = $("#stoneSegmentS option:selected").text() +" " + ' Receipt Details  From '+ $("#fromDateS").val() + ' to ' + $("#toDateS").val();
	$("#recHeading").append(appendText);
	
	if($("#stoneSegmentS option:selected").text() == "Diamond"){
		vendorMASDiamondRecpGrid();
		$("#jqxgrid2").show();
	}else{
		vendorMASStoneRecpGrid();
		$("#jqxgrid2").show();
	}
});

var recpDetFilters = function() {
	var recpFilters = searchFieldFilters();
	recpFilters.fieldFilters.docType = "VmasStoneRecptDetails";
	return fieldFilters;
}

//Search grid started
//For OS and PS
function vendorMASStoneRecpGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'givDate','type' : 'string','map' : 'createdDate'}, 
		{'name' : 'givNo','type' : 'int','map' : 'grvNo'}, 

		{'name' : 'givSlNo','type' : 'int','map' : 'mrvSrialNo'},
		{'name' : 'psrType','type' : 'string','map' : 'psrType'},
		{'name' : 'psrNo','type' : 'int','map' : 'psrNo'},
		
		{'name' : 'refDocNo','type' : 'int','map' : 'refNo'},
		{'name' : 'refDocSlNo','type' : 'int','map' : 'refSerialNo'},
		
		{'name' : 'pbNo','type' : 'int','map' : 'partyBillNo'},
		{'name' : 'pbSlNo','type' : 'int','map' : ''},
		{'name' : 'pbDate','type' : 'string','map' : 'billDate'}, 

		{'name' : 'segment','type' : 'string','map' : 'vmasStoneDTO>segment'}, 
		{'name' : 'mainCat','type' : 'string','map' : 'vmasStoneDTO>categoryDesc'}, 
		{'name' : 'subCatShape','type' : 'string','map' : 'vmasStoneDTO>subCategory'}, 
		{'name' : 'stoneCode','type' : 'string','map' : 'vmasStoneDTO>stoneCode'}, 
		{'name' : 'locationCode','type' : 'string','map' : 'vmasStoneDTO>stoneLoc'}, 
		{'name' : 'stoneWt','type' : 'float','map' : 'vmasStoneDTO>weight'}, 
		{'name' : 'uqc','type' : 'string','map' : 'vmasStoneDTO>uom'}, 
		{'name' : 'wtCostRange','type' : 'string','map' : 'vmasStoneDTO>weigthCostRange'}, 
	];

	var columns = [
		{'text' : 'GRV Date','datafield' : 'givDate','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'GRV No','datafield' : 'givNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'GRV Sl No','datafield' : 'givSlNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'PSR Type','datafield' : 'psrType','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'PSR No','datafield' : 'psrNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		
		{'text' : 'Party Bill No','datafield' : 'pbNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		// removing the column as disscussion of Ali & Naveen (Using Sprint 23 file) Date 29/06/2021
		// {'text' : 'Party Bill Sl No','datafield' : 'pbSlNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Party Bill Date','datafield' : 'pbDate','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Ref Doc No','datafield' : 'refDocNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Ref Doc Sl No','datafield' : 'refDocSlNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Stone Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Main Cat','datafield' : 'mainCat','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat/Shape','datafield' : 'subCatShape','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Weight/Cost Range','datafield' : 'wtCostRange','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		{'text' : 'Location Code','datafield' : 'locationCode','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				}
		},
		{'text' : 'Stone Wt','datafield' : 'stoneWt','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['stoneWt'] == null) ? 0 : record['stoneWt'];
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
		{'text' : 'UQC','datafield' : 'uqc','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		];

    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASStonOnchangeValues", "list", columns, recpDetFilters(), updateRows, "", "#jqxgrid2");
	$("#jqxgrid2").jqxGrid({	
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
		//virtualmode : true,
		showaggregates: true,
		showstatusbar: true,
			/*columngroups : [ {
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
			}],*/
	});
}

function vendorMASDiamondRecpGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'givDate','type' : 'string','map' : 'createdDate'}, 
		{'name' : 'givNo','type' : 'int','map' : 'grvNo'}, 

		{'name' : 'givSlNo','type' : 'int','map' : 'mrvSrialNo'},
		{'name' : 'psrType','type' : 'string','map' : 'psrType'},
		{'name' : 'psrNo','type' : 'int','map' : 'psrNo'},
		
		{'name' : 'refDocNo','type' : 'int','map' : 'refNo'},
		 {'name' : 'refDocSlNo','type' : 'int','map' : 'refSerialNo'},
		
		{'name' : 'pbNo','type' : 'int','map' : 'partyBillNo'},
		{'name' : 'pbSlNo','type' : 'int','map' : ''},
		{'name' : 'pbDate','type' : 'string','map' : 'billDate'}, 

		{'name' : 'stoneSlNo','type' : 'int','map' : 'vmasStoneDTO>slNo'},
		{'name' : 'stoneCode','type' : 'string','map' : 'vmasStoneDTO>stoneCode'}, 

		{'name' : 'wtCostRange','type' : 'string','map' : 'vmasStoneDTO>weigthCostRange'}, 
		{'name' : 'subCatShape','type' : 'string','map' : 'vmasStoneDTO>subCategory'}, 
		{'name' : 'color','type' : 'string','map' : 'vmasStoneDTO>color>id'}, 
		{'name' : 'actColor','type' : 'string','map' : 'vmasStoneDTO>actualColor>id'}, 
		
		{'name' : 'clarity','type' : 'string','map' : 'vmasStoneDTO>clarity>id'}, 
		{'name' : 'cutGrade','type' : 'string','map' : 'vmasStoneDTO>cutGrade>id'}, 
		{'name' : 'locationCode','type' : 'string','map' : 'vmasStoneDTO>stoneLoc'}, 
		
		{'name' : 'stoneWt','type' : 'float','map' : 'vmasStoneDTO>weight'}, 
		{'name' : 'uqc','type' : 'string','map' : 'vmasStoneDTO>uom'}, 
		
		{'name' : 'segment','type' : 'string','map' : 'vmasStoneDTO>segment'}, 
		{'name' : 'mainCat','type' : 'string','map' : 'vmasStoneDTO>categoryDesc'},
	];

	var columns = [
		{'text' : 'GRV Date','datafield' : 'givDate','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'GRV No','datafield' : 'givNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'GRV Sl No','datafield' : 'givSlNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'PSR Type','datafield' : 'psrType','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'PSR No','datafield' : 'psrNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
	
		{'text' : 'Party Bill No','datafield' : 'pbNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
	//	{'text' : 'Party Bill Sl No','datafield' : 'pbSlNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Party Bill Date','datafield' : 'pbDate','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Ref Doc No','datafield' : 'refDocNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Ref Doc Sl No','datafield' : 'refDocSlNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Stone Sl No','datafield' : 'stoneSlNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Stone Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Main Cat','datafield' : 'mainCat','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},

		{'text' : 'Weight/Cost Range','datafield' : 'wtCostRange','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat/Shape','datafield' : 'subCatShape','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Color','datafield' : 'color','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Actual Color','datafield' : 'actColor','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},

		{'text' : 'Location Code','datafield' : 'locationCode','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				}
		},
		{'text' : 'Diamond Wt','datafield' : 'stoneWt','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['stoneWt'] == null) ? 0 : record['stoneWt'];
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
		{'text' : 'UQC','datafield' : 'uqc','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		];

    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASStonOnchangeValues", "list", columns, recpDetFilters(), updateRows, "", "#jqxgrid2");
	$("#jqxgrid2").jqxGrid({	
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
		//virtualmode : true,
		showaggregates: true,
		showstatusbar: true,
			/*columngroups : [ {
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
			}],*/
	});
}

//Goods Receipt Details
$("#indvGr").on('click',function(){
	if($("#stoneSegmentS option:selected").text() == "Diamond"){
		indvGoodsReceiptDIGrid();
		$("#jqxgrid3").show();
	}else{
		indvGoodsReceiptGrid();
		$("#jqxgrid3").show();
	}
	
});

var grDetFilters = function() {
	var grFilters = searchFieldFilters();
	grFilters.fieldFilters.docType = "IGRDetails";
	return fieldFilters;
}

function indvGoodsReceiptDIGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'grvDate','type' : 'string','map' : 'createdDate'}, 
		{'name' : 'grvNo','type' : 'int','map' : 'grvNo'}, 

		{'name' : 'grvSlNo','type' : 'int','map' : 'mrvSrialNo'},
		{'name' : 'igrNo','type' : 'int','map' : 'grNo'},
		{'name' : 'igrDate','type' : 'string','map' : 'grDate'}, 
		{'name' : 'segment','type' : 'string','map' : 'vmasStoneDTO>segment'}, 
		{'name' : 'mainCat','type' : 'string','map' : 'vmasStoneDTO>categoryDesc'},
		{'name' : 'stoneCode','type' : 'string','map' : 'vmasStoneDTO>stoneCode'}, 

		{'name' : 'wtCostRange','type' : 'string','map' : 'vmasStoneDTO>weigthCostRange'}, 
		{'name' : 'subCatShape','type' : 'string','map' : 'vmasStoneDTO>subCategory'}, 
		{'name' : 'color','type' : 'string','map' : 'vmasStoneDTO>color>id'}, 
		{'name' : 'actColor','type' : 'string','map' : 'vmasStoneDTO>actualColor>id'}, 
		
		{'name' : 'clarity','type' : 'string','map' : 'vmasStoneDTO>clarity>id'}, 
		{'name' : 'cutGrade','type' : 'string','map' : 'vmasStoneDTO>cutGrade>id'}, 
		{'name' : 'locationCode','type' : 'string','map' : 'vmasStoneDTO>stoneLoc'}, 
		
		{'name' : 'stoneWt','type' : 'float','map' : 'vmasStoneDTO>weight'}, 
		{'name' : 'uqc','type' : 'string','map' : 'vmasStoneDTO>uom'}, 
		
	
	
	];

	var columns = [
		{'text' : 'GRV Date','datafield' : 'grvDate','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'GRV No','datafield' : 'grvNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'GRV Sl No','datafield' : 'grvSlNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'IGR No','datafield' : 'igrNo','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'IGR Date','datafield' : 'igrDate','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false},

		{'text' : 'Stone Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Main Cat','datafield' : 'mainCat','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},

		{'text' : 'Weight/Cost Range','datafield' : 'wtCostRange','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat/Shape','datafield' : 'subCatShape','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Color','datafield' : 'color','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Actual Color','datafield' : 'actColor','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '5%',cellsalign : 'center',align : 'center',editable : false,sortable : false,
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				}
		},
		{'text' : 'Diamond Wt/Ret Wt/Un Ret Wt/Wst Wt','datafield' : 'stoneWt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['stoneWt'] == null) ? 0 : record['stoneWt'];
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
		{'text' : 'UQC','datafield' : 'uqc','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		];

    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASStonOnchangeValues", "list", columns, grDetFilters(), updateRows, "", "#jqxgrid3");
	$("#jqxgrid3").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 75,
		rowdetails : true,
		//virtualmode : true,
		showaggregates: true,
		showstatusbar: true,
	});
}

function indvGoodsReceiptGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'grvDate','type' : 'string','map' : 'createdDate'}, 
		{'name' : 'grvNo','type' : 'int','map' : 'grvNo'}, 

		{'name' : 'grvSlNo','type' : 'int','map' : 'mrvSrialNo'},
		{'name' : 'igrNo','type' : 'int','map' : 'grNo'},
		{'name' : 'igrDate','type' : 'string','map' : 'grDate'}, 
		
		{'name' : 'segment','type' : 'string','map' : 'vmasStoneDTO>segment'}, 
		{'name' : 'mainCat','type' : 'string','map' : 'vmasStoneDTO>categoryDesc'},
		{'name' : 'subCatShape','type' : 'string','map' : 'vmasStoneDTO>subCategory'}, 
		{'name' : 'stoneCode','type' : 'string','map' : 'vmasStoneDTO>stoneCode'}, 
		
		{'name' : 'stoneWt','type' : 'float','map' : 'vmasStoneDTO>weight'}, 
		{'name' : 'uqc','type' : 'string','map' : 'vmasStoneDTO>uom'}, 
	];

	var columns = [
		{'text' : 'GRV Date','datafield' : 'grvDate','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'GRV No','datafield' : 'grvNo','width' : '6%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'GRV Sl No','datafield' : 'grvSlNo','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'IGR No','datafield' : 'igrNo','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'IGR Date','datafield' : 'igrDate','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
	
		{'text' : 'Segment','datafield' : 'segment','width' : '11%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Main Cat','datafield' : 'mainCat','width' : '14%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat/Shape','datafield' : 'subCatShape','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		
		{'text' : 'Stone Wt/Ret Wt/Un Ret Wt/Wst Wt','datafield' : 'stoneWt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['stoneWt'] == null) ? 0 : record['stoneWt'];
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
		{'text' : 'UQC','datafield' : 'uqc','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		];

    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASStonOnchangeValues", "list", columns, grDetFilters(), updateRows, "", "#jqxgrid3");
	$("#jqxgrid3").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 75,
		rowdetails : true,
		//virtualmode : true,
		showaggregates: true,
		showstatusbar: true,
	});
}


// Stone Difference Voucher Details
$("#sdvDet").on('click',function(){
	vendorMASSdvGrid();
	$("#jqxgridS").show();
});

var sdvDetFilters = function() {
	var sdvFilters = searchFieldFilters();
	sdvFilters.fieldFilters.docType = "VmasStoneDiffDetails";
	return fieldFilters;
}

//Search grid started
function vendorMASSdvGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'adjDate','type' : 'string','map' : 'adjustmentDate'}, 
		{'name' : 'adjNo','type' : 'int','map' : 'id'}, 

		{'name' : 'adjType','type' : 'string','map' : 'adjustmentType>id'},
		{'name' : 'segment','type' : 'string','map' : 'stoneSegment>description'}, 
		{'name' : 'mainCat','type' : 'string','map' : 'category>description'}, 
		{'name' : 'stoneCode','type' : 'string','map' : ''}, 
		{'name' : 'subCatDesc','type' : 'string','map' : 'subCategoryDesc'}, 
		{'name' : 'type','type' : 'string'}, 
	//	{'name' : 'locationCode','type' : 'string','map' : ''}, 

		{'name' : 'creditDebit','type' : 'string','map' : 'debitOrCreditType>id'}, 
		{'name' : 'diaWt','type' : 'float','map' : 'stoneWeight'}, 
		{'name' : 'uqc','type' : 'string','map' : 'uqc>id'}, 
		{'name' : 'remarks','type' : 'string','map' : 'remarks'}, 

	];

	var columns = [
		{'text' : 'Date','datafield' : 'adjDate','width' : '8%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
		{'text' : 'Adjustment Voucher No','datafield' : 'adjNo','width' : '7%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Adjustment Type','datafield' : 'adjType','width' : '8%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Segment','datafield' : 'segment','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Main Category','datafield' : 'mainCat','width' : '12%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '6%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Cat Desc','datafield' : 'subCatDesc','width' : '18%',editable : false,sortable : false,cellsalign : 'left',align : 'center'},
		
		{'text' : 'Type','datafield' : 'type','width' : '4%',cellsalign : 'center',align : 'center',editable : false,sortable : false,
			cellsrenderer: function() {        		 
	      		return "<div align='center'style='margin-top:8px;'>PSR</div>";
				}
		},
		//{'text' : 'Location Code','datafield' : 'locationCode','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		
		{'text' : 'Credit/Debit','datafield' : 'creditDebit','width' : '7%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				}
		},
		{'text' : 'Stone Wt','datafield' : 'diaWt','width' : '6%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['diaWt'] == null) ? 0 : record['diaWt'];
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
		{'text' : 'UQC','datafield' : 'uqc','width' : '4%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Remarks','datafield' : 'remarks','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		];

    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASStonOnchangeValues", "list", columns, sdvDetFilters(), updateRows, "", "#jqxgridS");
	$("#jqxgridS").jqxGrid({	
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
		//virtualmode : true,
		showaggregates: true,
		showstatusbar: true,
			/*columngroups : [ {
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
			}],*/
	});
}

//Weight Range Details
$("#wgtRange").on('click',function(){
	weightRangeGrid();
	$("#jqxgrid5").show();
});

var wtRangeDetFilters = function() {
	var wtFilters = searchFieldFilters();
	wtFilters.fieldFilters.docType = "VmasWeghtRangeWiseDetails";
	return fieldFilters;
}

function weightRangeGrid() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'segment','type' : 'string','map' : 'vmasStoneDTO>segment'}, 
		{'name' : 'mainCat','type' : 'string','map' : 'vmasStoneDTO>categoryDesc'},
		{'name' : 'stoneCode','type' : 'string','map' : 'vmasStoneDTO>stoneCode'}, 
		{'name' : 'subCatShape','type' : 'string','map' : 'vmasStoneDTO>subCategory'}, 
		{'name' : 'wtCostRange','type' : 'string','map' : 'vmasStoneDTO>weigthCostRange'}, 
	
		{'name' : 'opBal','type' : 'float','map' : 'openWt'}, 
		{'name' : 'issue','type' : 'float','map' : 'issWt'}, 
		
		{'name' : 'receipt','type' : 'float','map' : 'recptWt'}, 
		{'name' : 'closBal','type' : 'float','map' : 'closeWt'}, 
		{'name' : 'uqc','type' : 'string','map' : 'vmasStoneDTO>uom'}, 
	];

	var columns = [
		{'text' : 'Stone Segment','datafield' : 'segment','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Main Cat','datafield' : 'mainCat','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Stone Code','datafield' : 'stoneCode','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		{'text' : 'Sub Cat/Shape','datafield' : 'subCatShape','width' : '25%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},

		{'text' : 'Weight/Cost Range','datafield' : 'wtCostRange','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: brown; text-align: center;"><b>Total : </b></span>';
				}
		},
		
		{'text' : 'Opening Balance','datafield' : 'opBal','width' : '8%',cellsalign : 'right',align : 'center',editable : false,sortable : false,cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['opBal'] == null) ? 0 : record['opBal'];
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
		{'text' : 'Issues','datafield' : 'issue','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['issue'] == null) ? 0 : record['issue'];
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
		{'text' : 'Receipts','datafield' : 'receipt','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['receipt'] == null) ? 0 : record['receipt'];
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
		{'text' : 'Closing Balance','datafield' : 'closBal','width' : '8%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['closBal'] == null) ? 0 : record['closBal'];
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
		{'text' : 'UQC','datafield' : 'uqc','width' : '5%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
		];

    showMyGridCustom(datafields,"/OrderExecution/api/v1/vendorMASStonOnchangeValues", "list", columns, wtRangeDetFilters(), updateRows, "", "#jqxgrid5");
	$("#jqxgrid5").jqxGrid({	
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
		//virtualmode : true,
		showaggregates: true,
		showstatusbar: true,
	});
}

$("#clear").on('click',function(){
	window.location.href="javascript:showContentPage('vendorMasStoneDetailReport', 'bodySwitcher')"
});

//Vendor MAS Stone Summary Section Started from here

$("#clearSum").on('click',function(){
	window.location.href="javascript:showContentPage('vendorMasStoneSummaryReport', 'bodySwitcher')"
});

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
		var fieldFilters = searchFieldFilters();
		fieldFilters.fieldFilters.docType = "VmasStoneSummary";
		
		postJSON('/OrderExecution/api/v1/vendorMASStonOnchangeValues',JSON.stringify(fieldFilters), function(data) {
			
		var summArr = data.payload.listing;
			 var list = [];
			  $.each(summArr.vDetailDTOs, function( key, value ) { 
				  console.log(value);
				  list.push({ 
					  "segment":(key == 0) ? summArr.segment.description : "", 
					  "category": (key == 0) ? summArr.category.description : "",
					  "docType" : value.docType,
					  "opBal" : value.psrStoneBulkOpenWt,
					  "closingBal" : value.psrBulkStoneCloseWt,
					  "issue" : value.psrBulkIssueWt,
					  "receipt" : value.psrBulkStoneReciptWt,
					  "uqc": value.uqc
				  });
				  
			  });
			 
			summarySearchGrid(list);
			$("#jqxgridS").show();
	});
  }
});

var summarySearchGrid = function(response) {
	console.log(response)
	var source = {
			datafields : [
				{'name' : 'segment','type' : 'string','map' : 'segment'},
				{'name' : 'category','type' : 'string','map' : 'category'},

				{'name' : 'docType','type' : 'string','map' : 'docType'},

	        	{'name' : 'opBal','type' : 'float','map' : 'opBal'}, 
	        	{'name' : 'receipt','type' : 'float','map' : 'receipt'}, 
	    		{'name' : 'issue','type' : 'float','map' : 'issue'},
	    		
	    		{'name' : 'cloBal','type' : 'float','map' : 'closingBal'},
	        	{'name' : 'uqc','type' : 'string','map' : 'uqc'},
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
		height: '250px',
		theme: 'energyblue',
		//pagesize : 20,
        columnsheight: 80,
        columnsresize: true,  
		rowsheight : 30,
		//autorowheight : true,
		//autoheight : false,
		//pageable: true,
		altRows : true,
		sortable:false,
		editable : true,
		columnsresize : true,
 	    statusbarheight: 20,
		showaggregates: true, 
		showstatusbar:true,	
		columns : [
			{'text' : 'Segment','datafield' : 'segment','width' : '20%',editable : false,cellsalign : 'center',align : 'center',sortable : false},
			{'text' : 'Category','datafield' : 'category','width' : '15%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
			{'text' : 'Doc Type','datafield' : 'docType','width' : '15%',editable : false,sortable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Opening Balance','datafield' : 'opBal','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',
				aggregatesrenderer: function() {        		 
	    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Total</b></span>';
				}
			},
			{'text' : 'Issue','datafield' : 'issue','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat:'d3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['issue'] == null) ? 0 : record['issue'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
			    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+ '<b>' + aggregates["Total"] + '</b>' +'</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Receipts','datafield' : 'receipt','width' : '10%',editable : false,cellsalign : 'center',align : 'center',sortable : false,cellsformat:'d3',
				aggregates: [{          
			  		  'Total': function(aggregatedValue, currentValue, column, record) {
							  var total = (record['receipt'] == null) ? 0 : record['receipt'];
			  			  return aggregatedValue + total;
			  		  }
			  	  }],
			  	  aggregatesrenderer: function(aggregates) {        		 
			        		if(typeof aggregates["Total"] == "undefined"){
			    				return '0.00';
			    		  	}else{
				    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">'+ '<b>' + aggregates["Total"] + '</b>' +'</span>';
			    		  	}
			  	  }
			},
			{'text' : 'Closing Balance','datafield' : 'cloBal','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false,cellsformat:'d3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '10%',cellsalign : 'center',align : 'center',editable : false,sortable : false},
		]
	});
}