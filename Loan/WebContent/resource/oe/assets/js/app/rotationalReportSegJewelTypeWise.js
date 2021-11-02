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

$("#jwlS").hide();
$("#catS").hide();
var onload = function(){
$.getJSON('/OrderExecution/api/v1/rotationReportOnloadLovs?type=onloadLov', function(data) {
	$('#storeNameS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.storeCodes, function(key, val) {
			$('#storeNameS').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		
	$('#artSegmentS').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.mTypes, function(key, val) {
			$('#artSegmentS').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	
		var a = '<select id="vendCodeObjS"  name="vendCodeObjS" class="form-control" multiple="multiple">';
		$.each(data.payload.vCodeList, function(key, val) {
		a += '<option value="' + val.id + '">' + val.name + '</option>'; });
		a += '</select>';
		$("#vendCodeS").html(a);
		$('#vendCodeObjS').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var jewel1 = '<select id="jewelTypeObjS" class="form-control" multiple="multiple"></select>';
		$("#jewelTypeS").html(jewel1);
		$('#jewelTypeObjS').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
		    buttonClass : 'col-md-12 form-control text-left'
		});
		
		var mainCat = '<select id="mainCatObjS" class="form-control" multiple="multiple"></select>';
		$("#mainCatS").html(mainCat);
		$('#mainCatObjS').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
		    buttonClass : 'col-md-12 form-control text-left'
		});
		
		var wtRange = '<select id="wtRangeObjS" class="form-control" multiple="multiple"></select>';
		$("#wtRangeS").html(wtRange);
		$('#wtRangeObjS').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
		    buttonClass : 'col-md-12 form-control text-left'
		});
		
		var wtRangeDia = '<select id="wtRangeDiaObjS" class="form-control" multiple="multiple"></select>';
		$("#wtRangeDiaS").html(wtRangeDia);
		$('#wtRangeDiaObjS').multiselect({
			includeSelectAllOption : true,
			enableFiltering : false,
			maxHeight : 250,
			numberDisplayed : 1,
		    buttonClass : 'col-md-12 form-control text-left'
		});
	
	});

$.getJSON('/OrderExecution/api/v1/rotationReportOnloadLovs?type=ReportTypes', function(data) {
	$('#repTypeS').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.ReportTypes, function(key, val) {
		$('#repTypeS').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
});

}

onload();

$("#repTypeS").on('change',function(){
	 $('#mainCatObjS').multiselect("clearSelection");
	 $('#jewelTypeObjS').multiselect("clearSelection");
	 $('#wtRangeObjS').multiselect("clearSelection");
	 $('#wtRangeDiaObjS').multiselect("clearSelection");

	$("#wtRangeObjS").multiselect("enable");
	$("#jewelTypeObjS").multiselect("enable");
	$("#mainCatObjS").multiselect("enable");
	$("#wtRangeDiaObjS").multiselect("disable");


	var repTypeVal = $("#repTypeS").val();
	if(repTypeVal == "JTMWR"){
		$("#mainCatObjS").multiselect("disable");
		$("#jewelTypeObjS").multiselect("enable");
		
		if($("#artSegmentS option:selected").text() != "" && $("#artSegmentS option:selected").text() == "Platinum" || $("#artSegmentS option:selected").text() == "Diamond" ){
			$("#wtRangeObjS").multiselect("disable");
			$("#wtRangeDiaObjS").multiselect("enable");
		}else{
			$("#wtRangeObjS").multiselect("enable");
			$("#wtRangeDiaObjS").multiselect("disable");
		}
		

		$("#jwlS").show();
		$("#catS").hide();
	}
	if(repTypeVal == "MC"){
		$("#mainCatObjS").multiselect("enable");
		$("#jewelTypeObjS").multiselect("disable");
		$("#wtRangeObjS").multiselect("disable");
		$("#wtRangeDiaObjS").multiselect("disable");
 
		$("#jwlS").hide();
		$("#catS").hide();
	}
	if(repTypeVal == "MWR"){
		$("#wtRangeObjS").multiselect("enable");
		$("#mainCatObjS").multiselect("disable");
		$("#jewelTypeObjS").multiselect("disable");
		$("#wtRangeDiaObjS").multiselect("disable");
 
		$("#jwlS").hide();
		$("#catS").hide();
	}
	if(repTypeVal == "JT"){
		$("#jewelTypeObjS").multiselect("enable");
		$("#mainCatObjS").multiselect("disable");
		$("#wtRangeObjS").multiselect("disable");
		$("#wtRangeDiaObjS").multiselect("disable");

		$("#jwlS").hide();
		$("#catS").hide();
	}
	if(repTypeVal == "MCMWR"){
		$("#mainCatObjS").multiselect("enable");
		$("#wtRangeObjS").multiselect("enable");
		$("#jewelTypeObjS").multiselect("disable");
		$("#wtRangeDiaObjS").multiselect("disable");

		$("#jwlS").hide();
		$("#catS").show();
	}
});


$("#artSegmentS").on('change',function(){
	$("#repTypeS").val("");
	//if($("#artSegmentS option:selected").text() == "Gold" || $("#artSegmentS option:selected").text() == "Silver"){
		
	$.getJSON('/OrderExecution/api/v1/rotationReportOnloadLovs?type=jewelType&segmentId='+$("#artSegmentS").val(), function(data) {
		mainCatArr = data.payload.mainCatList;
		var j = '<select id="jewelTypeObjS"  name="jewelTypeObjS" class="form-control" multiple="multiple">';
		$.each(data.payload.mjTypes, function(key, val) {
		j += '<option value="' + val.id + '">' + val.description + '</option>'; });
		j += '</select>';
		$("#jewelTypeS").html(j);
		$('#jewelTypeObjS').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
		var m = '<select id="mainCatObjS"  name="mainCatObjS" class="form-control" multiple="multiple">';
		$.each(data.payload.mainCatList, function(key, val) {
		m += '<option value="' + val.id + '">' + val.description + '</option>'; });
		m += '</select>';
		$("#mainCatS").html(m);
		$('#mainCatObjS').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	});
	
		$.getJSON('/OrderExecution/api/v1/rotationReportOnloadLovs?type=weightRange&segmentId='+$("#artSegmentS").val(), function(data) {
			
		var w = '<select id="wtRangeObjS"  name="wtRangeObjS" class="form-control" multiple="multiple">';
		$.each(data.payload.weightRange, function(key, val) {
		w += '<option value="' + val.fromToRange + '">' + val.fromToRange + '</option>'; });
		w += '</select>';
		$("#wtRangeS").html(w);
		$('#wtRangeObjS').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
		
	});
 // }
});

$("#jewelTypeS").on("change",function() {
	var jewelTypeObjS = $("#jewelTypeObjS").val();
	$("#wtRangeDiaObjS").multiselect("disable");

	if(jewelTypeObjS != null){
		jewelTypeObjS = jewelTypeObjS.join(',');
		jewelTypeObjS = jewelTypeObjS.toString();
	
		if( ($("#artSegmentS option:selected").text() != "" && $("#artSegmentS option:selected").text() == "Diamond" || $("#artSegmentS option:selected").text() == "Platinum") && $("#repTypeS").val() == "JTMWR"){
		$("#wtRangeDiaObjS").multiselect("enable");

			var params = {"fieldFilters":{"reportType":$("#repTypeS").val(),"segmentId":$("#artSegmentS").val(),"jtypeIds":jewelTypeObjS}}
		  postJSON('/OrderExecution/api/v1/searchRotationReportSegMetalJtypeOnLoadLovs',JSON.stringify(params),function(response) {
			if(response.resCode == "1"){
			 var w = '<select id="wtRangeDiaObjS"  name="wtRangeDiaObjS" class="form-control" multiple="multiple">';
				$.each(response.payload.list, function(key, val) {
				w += '<option value="' + val.fromToRange + '">' + val.jewelType + "-" + " " +val.fromToRange + '</option>'; });
				w += '</select>';
				$("#wtRangeDiaS").html(w);
				$('#wtRangeDiaObjS').multiselect({
				includeSelectAllOption : true,
				maxHeight : 250,
				//enableFiltering : true,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
				});
			}
		  });
		}
	}
});

var mainCatFFArry = [];
var mainCatArr = [];
$("#mainCatS").on('change',function(){
	var mainCatObjS = $("#mainCatObjS").val();
	mainCatObjS = mainCatObjS.join(',');
	
	var mainCatArry = mainCatObjS.split(',');
	
	console.log(mainCatArry);
	
	var mainCatDesc = [];
	$.each(mainCatArr,function(k,v){
		$.each(mainCatArry,function(key,val){
			if(v.id == val){
				mainCatDesc.push(v.code);
			}
		});
	});
	console.log(mainCatDesc);

	mainCatFFArry = mainCatDesc; 
	if($("#artSegmentS option:selected").text() == "Platinum"){
		if($("#repTypeS").val() == "MC"){
			$("#wtRangeObjS").multiselect("disable");
			$("#wtRangeDiaObjS").multiselect("disable");
		}else if($("#repTypeS").val() == "MCMWR"){
			$("#wtRangeObjS").multiselect("enable");
			$("#wtRangeDiaObjS").multiselect("disable");
		}
		
		if(mainCatDesc.length > 1 && mainCatDesc.includes("PP")){
			$("#wtRangeObjS").multiselect("enable");
			$("#wtRangeDiaObjS").multiselect("disable");
			$("#mainCatObjS").multiselect("clearSelection");
			
			$.growl.error({
				message : " Plain Platinum Cannot be Combined with other main categories !!",
				duration : 1000,
				title : 'Error'
			});
		}
		
	}else if($("#artSegmentS option:selected").text() == "Gold" || $("#artSegmentS option:selected").text() == "Silver"){
		if($("#repTypeS").val() == "MC"){
			$("#wtRangeObjS").multiselect("disable");
			$("#wtRangeDiaObjS").multiselect("disable");
		}
		
		else if($("#repTypeS").val() == "MCMWR"){
			$("#wtRangeObjS").multiselect("enable");
			$("#wtRangeDiaObjS").multiselect("disable");
		}else{
			$("#wtRangeObjS").multiselect("disable");
			$("#wtRangeDiaObjS").multiselect("disable");
		}
		
	}else{
		if($("#repTypeS").val() == "MCMWR"){
			$("#wtRangeObjS").multiselect("enable");
			$("#wtRangeDiaObjS").multiselect("disable");
		}else if($("#repTypeS").val() == "MC"){
			$("#wtRangeObjS").multiselect("disable");
			$("#wtRangeDiaObjS").multiselect("disable");
		}
		else{
			$("#wtRangeObjS").multiselect("disable");
			$("#wtRangeDiaObjS").multiselect("enable");
		}
		
		//loadDiaWtRange();
	}
});

var loadDiaWtRange = function(){
	var jewelTypeObjS = $("#jewelTypeObjS").val();
	jewelTypeObjS = jewelTypeObjS.join(',');
	
	var params = {"fieldFilters":{"reportType":"JTMWR","segmentId":$("#artSegmentS").val(),"jtypeIds":jewelTypeObjS}}
	  postJSON('/OrderExecution/api/v1/searchRotationReportSegMetalJtypeOnLoadLovs',JSON.stringify(params),function(response) {
		  if(response.resCode == 1){
			  if($("#artSegmentS option:selected").text() == "Diamond"){
				  var d = '<select id="diaWtRangeObjS"  name="diaWtRangeObjS" class="form-control" multiple="multiple">';
					$.each(response.payload.list, function(key, val) {
					d += '<option value="' + val.fromToRange + '">' +  val.jewelType + "-" + " " +  val.fromToRange + '</option>'; });
					d += '</select>';
					$("#diaWtRangeS").html(d);
					$('#diaWtRangeObjS').multiselect({
					includeSelectAllOption : true,
					maxHeight : 250,
					//enableFiltering : true,
					numberDisplayed : 1,
					buttonClass : 'col-md-12 form-control text-left'
					});  
			  }else{
				  if($('#mainCatObjS').val() != null && $('#mainCatObjS').val() != ""){
					  var d = '<select id="diaWtRangeObjS"  name="diaWtRangeObjS" class="form-control" multiple="multiple">';
						$.each(response.payload.list, function(key, val) {
						d += '<option value="' + val.fromToRange + '">' + val.jewelType + "-" + " " + val.fromToRange + '</option>'; });
						d += '</select>';
						$("#diaWtRangeS").html(d);
						$('#diaWtRangeObjS').multiselect({
						includeSelectAllOption : true,
						maxHeight : 250,
						//enableFiltering : true,
						numberDisplayed : 1,
						buttonClass : 'col-md-12 form-control text-left'
						}); 
				  }
			  }
		  }
	  });
}
//#####################################  Report Type - Jewel Type ##########################################

// Article Segment -  Gold & Silver
// Without Vendor
function jewelTypeSearchGridGoldOrSilver() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name' : 'jewelType','type' : 'string','map' : 'jewelType'},
		{'name' : 'avPcsPair','type' : 'int','map':'availPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
		{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

		{'name' : 'salePcsPair','type' : 'int','map' : 'salePcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
		{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Article Segment','datafield' : 'articleSegment','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Jewel Type','datafield' : 'jewelType','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregatesrenderer: function() {        		 
  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Grand Total</b></span>';
			}
		},
		{'text' : 'Ava Pcs/Pairs','datafield' : 'avPcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avPcsPair'] == null) ? 0 : record['avPcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Ava Gr. Wt.','datafield' : 'avGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avGwt'] == null) ? 0 : record['avGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Ava Nt. Wt.','datafield' : 'avNwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avNwt'] == null) ? 0 : record['avNwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Pcs/Pairs','datafield' : 'salePcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcsPair'] == null) ? 0 : record['salePcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Sale Gr. Wt.','datafield' : 'saleGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGwt'] == null) ? 0 : record['saleGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Nt. Wt.','datafield' : 'saleNwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleNwt'] == null) ? 0 : record['saleNwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Rotation','datafield' : 'rotation','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['rotation'] == null) ? 0 : record['rotation'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		}


	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		showaggregates: true,
		showstatusbar: true
	});
}


// // With Vendor
function jewelTypeSearchGridGoldOrSilverV() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : ''},
		{'name' : 'articleSegment','type' : 'string','map':''},
		{'name' : 'jewelType','type' : 'string','map' : ''},
		{'name' : 'vendorCode','type' : 'string','map' : 'vendor>name'},
		{'name' : 'avPcsPair','type' : 'long','map':'availPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
		{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

		{'name' : 'salePcsPair','type' : 'long','map' : 'salePcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
		{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

		{'text' : 'Article Segment','datafield' : 'articleSegment','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Jewel Type','datafield' : 'jewelType','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Grand Total</b></span>';
				}
		},
		{'text' : 'Ava Pcs/Pairs','datafield' : 'avPcsPair','width' : '8%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avPcsPair'] == null) ? 0 : record['avPcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Ava Gr. Wt.','datafield' : 'avGwt','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avGwt'] == null) ? 0 : record['avGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Ava Nt. Wt.','datafield' : 'avNwt','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avNwt'] == null) ? 0 : record['avNwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Pcs/Pairs','datafield' : 'salePcsPair','width' : '8%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcsPair'] == null) ? 0 : record['salePcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Sale Gr. Wt.','datafield' : 'saleGwt','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGwt'] == null) ? 0 : record['saleGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Nt. Wt.','datafield' : 'saleNwt','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleNwt'] == null) ? 0 : record['saleNwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Rotation','datafield' : 'rotation','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['rotation'] == null) ? 0 : record['rotation'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		showaggregates: true,
		showstatusbar: true,
	});
}


// Article Segment - Platinum & Diamond
//Without Vendor
function jewelTypeSearchGridDiaOrPlt() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name' : 'jewelType','type' : 'string','map' : 'jewelType'},
		{'name' : 'avPcsPair','type' : 'long','map':'avJewelDiaPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

		{'name' : 'salePcsPair','type' : 'long','map' : 'saleJewelDiaPcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
	];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Article Segment','datafield' : 'articleSegment','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Jewel Type','datafield' : 'jewelType','width' : '15%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregatesrenderer: function() {        		 
  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Grand Total</b></span>';
			}
		},
		{'text' : 'Ava Jewel Pcs/Pairs','datafield' : 'avPcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avPcsPair'] == null) ? 0 : record['avPcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Ava. Diamond Wt.(Cts).','datafield' : 'avGwt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avGwt'] == null) ? 0 : record['avGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Jewel Pcs/Pairs','datafield' : 'salePcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcsPair'] == null) ? 0 : record['salePcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Sale Diamond Wt.(Cts).','datafield' : 'saleGwt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGwt'] == null) ? 0 : record['saleGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Rotation','datafield' : 'rotation','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['rotation'] == null) ? 0 : record['rotation'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		}


	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		showaggregates: true,
		showstatusbar: true
	});
}


// With Vendor
function jewelTypeSearchGridDiaOrPltV() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : ''},
		{'name' : 'articleSegment','type' : 'string','map':''},
		{'name' : 'jewelType','type' : 'string','map' : ''},
		{'name' : 'vendorCode','type' : 'string','map' : 'vendor>name'},
		{'name' : 'avPcsPair','type' : 'long','map':'avJewelDiaPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

		{'name' : 'salePcsPair','type' : 'long','map' : 'saleJewelDiaPcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

		{'text' : 'Article Segment','datafield' : 'articleSegment','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Jewel Type','datafield' : 'jewelType','width' : '15%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregatesrenderer: function() {        		 
	  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Grand Total</b></span>';
				}
		},
		{'text' : 'Ava Jewel Pcs/Pairs','datafield' : 'avPcsPair','width' : '8%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avPcsPair'] == null) ? 0 : record['avPcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Ava Diamond Wt.(Cts)','datafield' : 'avGwt','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avGwt'] == null) ? 0 : record['avGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Sale Jewel Pcs/Pairs','datafield' : 'salePcsPair','width' : '8%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcsPair'] == null) ? 0 : record['salePcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Sale Diamond Wt.(Cts)','datafield' : 'saleGwt','width' : '8%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGwt'] == null) ? 0 : record['saleGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Rotation','datafield' : 'rotation','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['rotation'] == null) ? 0 : record['rotation'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		showaggregates: true,
		showstatusbar: true,
	});
}

// ######################################### Report Type - Metal Weight Range ################################
// Metal Weight Range Grid Started 

//Metal Weight Range For GOLD/SILVER without vendor
function metalWtRangeSearchGridGoldOrSilver() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name' : 'fromWt','type' : 'float','map' : 'fromWghtRange'},
		{'name' : 'toWt','type' : 'float','map' : 'toWghtRange'},

		{'name' : 'avPcsPair','type' : 'long','map':'availPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
		{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

		{'name' : 'salePcsPair','type' : 'long','map' : 'salePcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
		{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Article Segment','datafield' : 'articleSegment','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'From Wt','datafield' : 'fromWt','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',cellsformat : 'd3',},

		{'text' : 'To Wt','datafield' : 'toWt','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregatesrenderer: function() {        		 
  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Grand Total</b></span>';
			}
		},
		{'text' : 'Ava Pcs/Pairs','datafield' : 'avPcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avPcsPair'] == null) ? 0 : record['avPcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Ava Gr. Wt.','datafield' : 'avGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avGwt'] == null) ? 0 : record['avGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Ava Nt. Wt.','datafield' : 'avNwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avNwt'] == null) ? 0 : record['avNwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Pcs/Pairs','datafield' : 'salePcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcsPair'] == null) ? 0 : record['salePcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Sale Gr. Wt.','datafield' : 'saleGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGwt'] == null) ? 0 : record['saleGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Nt. Wt.','datafield' : 'saleNwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleNwt'] == null) ? 0 : record['saleNwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Rotation on Gr Wt.','datafield' : 'rotation','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['rotation'] == null) ? 0 : record['rotation'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		}
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		showaggregates: true,
		showstatusbar: true
	});
}

// Metal Weight Range For GOLD/SILVER with vendor
function metalWtRangeSearchGridGoldOrSilverV() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'vendorCode','type' : 'string','map' : 'vendor>name'},

		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name' : 'fromWt','type' : 'float','map' : 'fromWghtRange'},
		{'name' : 'toWt','type' : 'float','map' : 'toWghtRange'},

		{'name' : 'avPcsPair','type' : 'long','map':'availPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
		{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

		{'name' : 'salePcsPair','type' : 'long','map' : 'salePcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
		{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

		{'text' : 'Article Segment','datafield' : 'articleSegment','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'From Wt','datafield' : 'fromWt','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',cellsformat : 'd3',},

		{'text' : 'To Wt','datafield' : 'toWt','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregatesrenderer: function() {        		 
  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Grand Total</b></span>';
			}
		},
		{'text' : 'Ava Pcs/Pairs','datafield' : 'avPcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avPcsPair'] == null) ? 0 : record['avPcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Ava Gr. Wt.','datafield' : 'avGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avGwt'] == null) ? 0 : record['avGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Ava Nt. Wt.','datafield' : 'avNwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avNwt'] == null) ? 0 : record['avNwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Pcs/Pairs','datafield' : 'salePcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcsPair'] == null) ? 0 : record['salePcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Sale Gr. Wt.','datafield' : 'saleGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGwt'] == null) ? 0 : record['saleGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Nt. Wt.','datafield' : 'saleNwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleNwt'] == null) ? 0 : record['saleNwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Rotation on Gr Wt.','datafield' : 'rotation','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['rotation'] == null) ? 0 : record['rotation'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		}
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		showaggregates: true,
		showstatusbar: true
	});
}

// Diamond & Platinum 
// Without Vendor
function metalWtRangeSearchGridDiaOrPlt() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name' : 'fromWt','type' : 'float','map' : 'fromWghtRange'},
		{'name' : 'toWt','type' : 'float','map' : 'toWghtRange'},

		{'name' : 'avPcsPair','type' : 'long','map':'avJewelDiaPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

		{'name' : 'salePcsPair','type' : 'long','map' : 'saleJewelDiaPcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Article Segment','datafield' : 'articleSegment','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'From Wt','datafield' : 'fromWt','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',cellsformat : 'd3',},

		{'text' : 'To Wt','datafield' : 'toWt','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregatesrenderer: function() {        		 
  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Grand Total</b></span>';
			}
		},
		{'text' : 'Ava Jewel Pcs/Pairs','datafield' : 'avPcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avPcsPair'] == null) ? 0 : record['avPcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Ava Diamond Wt.(Cts)','datafield' : 'avGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avGwt'] == null) ? 0 : record['avGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Jewel Pcs/Pairs','datafield' : 'salePcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcsPair'] == null) ? 0 : record['salePcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Sale Diamond Wt.(Cts)','datafield' : 'saleGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGwt'] == null) ? 0 : record['saleGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Rotation on Gr Wt.','datafield' : 'rotation','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['rotation'] == null) ? 0 : record['rotation'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		}
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		showaggregates: true,
		showstatusbar: true
	});
}

// Metal Weight Range For GOLD/SILVER with vendor
function metalWtRangeSearchGridDiaOrPltV() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'vendorCode','type' : 'string','map' : 'vendor>name'},

		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name' : 'fromWt','type' : 'float','map' : 'fromWghtRange'},
		{'name' : 'toWt','type' : 'float','map' : 'toWghtRange'},

		{'name' : 'avPcsPair','type' : 'long','map':'avJewelDiaPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

		{'name' : 'salePcsPair','type' : 'long','map' : 'saleJewelDiaPcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

		{'text' : 'Article Segment','datafield' : 'articleSegment','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'From Wt','datafield' : 'fromWt','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',cellsformat : 'd3',},

		{'text' : 'To Wt','datafield' : 'toWt','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregatesrenderer: function() {        		 
  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Grand Total</b></span>';
			}
		},
		{'text' : 'Ava Jewel Pcs/Pairs','datafield' : 'avPcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avPcsPair'] == null) ? 0 : record['avPcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Ava Diamond Wt.(Cts)','datafield' : 'avGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avGwt'] == null) ? 0 : record['avGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Jewel Pcs/Pairs','datafield' : 'salePcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcsPair'] == null) ? 0 : record['salePcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Sale Diamond Wt.(Cts)','datafield' : 'saleGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGwt'] == null) ? 0 : record['saleGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Rotation on Gr Wt.','datafield' : 'rotation','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['rotation'] == null) ? 0 : record['rotation'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		}
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		showaggregates: true,
		showstatusbar: true
	});
}


//Jewel Type & Metal Weight Range Grids Started
// Gold & Silver ,Search Grid without vendor

var jewelMetalWtRangeGoldSilver11 =function(response) {
	var source = {
		datafields : [
			{'name' : 'storeName','type' : 'string','map' : 'storeName'},
			{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
			{'name' : 'mainCat','type' : 'float','map' : 'mainCategory'},

			{'name' : 'avPcsPair','type' : 'long','map':'availPcs'}, 
			{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
			{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

			{'name' : 'salePcsPair','type' : 'long','map' : 'salePcs'},
			{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
			{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
			{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	var objArray = [];
	var getSumRows = function(data){
		var avlNetWt  = 0;
		var saleNetWt  = 0;
		var rotn = 0;
		
		for(var i=0; i< data.length; i++){
			if(data[i].avNwt != null){
				avlNetWt = avlNetWt + parseFloat(data[i].avNwt);
			}
			
			if(data[i].saleNwt != null){
				saleNetWt = saleNetWt + parseFloat(data[i].saleNwt);
			}
			
			if(data[i].rotation != null){
				rotn = rotn + parseFloat(data[i].rotation);
			}
		
			
		}
		objArray['avlNetWeight'] = avlNetWt.toFixed(3);
		objArray['saleNetWeight'] = saleNetWt.toFixed(3);
		objArray['rotation'] = rotn.toFixed(3);
			
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Available Net Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['avlNetWeight'] + '</span> <b>Sale Net Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['saleNetWeight']  + '</span><b> Rotation </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['rotation']  + '</span>';
	};
	
	
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 65,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
		showtoolbar : true,
		groupable: true,
 	    statusbarheight: 20,
		groupsrenderer: groupsrenderer,
		showaggregates: true,  
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Report Type :'+$("#repTypeS option:selected").text());			
		},
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
		columns : [ 
			{text : 'Store Name',datafield : 'storeName',width : '10%',cellsalign : 'center',align : 'center',editable : false},	
			{text : 'Segment',datafield : 'articleSegment',	width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
			{text : 'Jewel Type',datafield : 'jewelType',width : '15%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
			{text : 'Weight Range',datafield : 'weightRange',width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false,sortable:false,
				cellsrenderer: function(row, column, value){
					var fromWt = $("#jqxgrid").jqxGrid('getcellvalue', row, 'weightRangeF');
					var toWt = $("#jqxgrid").jqxGrid('getcellvalue', row, 'weightRangeT');
					var wtRange = parseFloat(fromWt).toFixed(3) + "-" + parseFloat(toWt).toFixed(3);
					
					return "<div align='center'style='margin-top:19px;'>"+ wtRange +"</div>";
				}
			},
			{text : 'Available Gross Wt',datafield : 'avGwt',width : '11%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,columngroup : "totalWeight"},
			{text : 'Available Net Wt',datafield : 'avNwt',width : '11%',cellsalign : 'center',align : 'center',editable : false,sortable:false,columngroup : "totalWeight"} ,
			{text : 'Sales Gross Wt',datafield : 'saleGwt',	width : '11%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight"}, 
			{text : 'Sales Net Wt',	datafield : 'saleNwt',width : '11%',cellsalign : 'center',align : 'center',	editable : false,columngroup : "totalWeight"}, 
			{text : 'Rotation',datafield : 'rotation',	width : '11%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight"},
			
			{text : '',datafield : 'weightRangeF',	width : '11%',cellsalign : 'center',align : 'center',editable : false,hidden:true}, 
			{text : '',	datafield : 'weightRangeT',width : '11%',cellsalign : 'center',align : 'center',	editable : false,hidden:true}, 
		]
	});
}

// search grid with vendor
var jewelMetalWtRangeGoldSilverV11 =function(response) {
	var source = {
		datafields : [
			{'name' : 'storeName','type' : 'string','map' : 'storeName'},
			{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
			{'name':'vendorCode','type':'string','map':'vendor>name'},
			{'name' : 'jewelType','type' : 'float','map' : ''},
			{'name' : 'weightRange','type' : 'float','map' : ''},

			{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
			{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

			{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
			{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
			{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	var objArray = [];
	var getSumRows = function(data){
		var avlNetWt  = 0;
		var saleNetWt  = 0;
		var rotn = 0;
		
		for(var i=0; i< data.length; i++){
			if(data[i].avNwt != null){
				avlNetWt = avlNetWt + parseFloat(data[i].avNwt);
			}
			
			if(data[i].saleNwt != null){
				saleNetWt = saleNetWt + parseFloat(data[i].saleNwt);
			}
			
			if(data[i].rotation != null){
				rotn = rotn + parseFloat(data[i].rotation);
			}
		
			
		}
		objArray['avlNetWeight'] = avlNetWt.toFixed(3);
		objArray['saleNetWeight'] = saleNetWt.toFixed(3);
		objArray['rotation'] = rotn.toFixed(3);
			
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Available Net Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['avlNetWeight'] + '</span> <b>Sale Net Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['saleNetWeight']  + '</span><b> Rotation </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['rotation']  + '</span>';
	};
	
	
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 65,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
		showtoolbar : true,
		groupable: true,
 	    statusbarheight: 20,
		groupsrenderer: groupsrenderer,
		showaggregates: true,  
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Report Type :'+$("#repTypeS option:selected").text());			
		},
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
		columns : [ 
			{text : 'Store Name',datafield : 'storeName',width : '10%',cellsalign : 'center',align : 'center',editable : false},	
			{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

			{text : 'Segment',datafield : 'articleSegment',	width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
			{text : 'Jewel Type',datafield : 'jewelType',width : '10%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
			{text : 'Weight Range',datafield : 'weightRange',width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false,sortable:false}, 
			{text : 'Available Gross Wt',datafield : 'avGwt',width : '10%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,columngroup : "totalWeight"},
			{text : 'Available Net Wt',datafield : 'avNwt',width : '10%',cellsalign : 'center',align : 'center',editable : false,sortable:false,columngroup : "totalWeight"} ,
			{text : 'Sales Gross Wt',datafield : 'saleGwt',	width : '10%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight"}, 
			{text : 'Sales Net Wt',	datafield : 'saleNwt',width : '10%',cellsalign : 'center',align : 'center',	editable : false,columngroup : "totalWeight"}, 
			{text : 'Rotation',datafield : 'rotation',	width : '10%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight"},
			
		]
	});
}

// For Diamond & Platinum
var jewelMetalWtRangeDiaOrPlt11 = function(response) {
	var source = {
		datafields : [
			{'name' : 'storeName','type' : 'string','map' : 'storeName'},
			{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
			{'name' : 'jewelType','type' : 'float','map' : ''},
			{'name' : 'weightRange','type' : 'float','map' : ''},

			{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

			{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
			{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	var objArray = [];
	var getSumRows = function(data){
		var avlNetWt  = 0;
		var saleNetWt  = 0;
		var rotn = 0;
		
		for(var i=0; i< data.length; i++){
			if(data[i].avGwt != null){
				avlNetWt = avlNetWt + parseFloat(data[i].avGwt);
			}
			
			if(data[i].saleGwt != null){
				saleNetWt = saleNetWt + parseFloat(data[i].saleGwt);
			}
			
			if(data[i].rotation != null){
				rotn = rotn + parseFloat(data[i].rotation);
			}
		
			
		}
		objArray['avlNetWeight'] = avlNetWt.toFixed(3);
		objArray['saleNetWeight'] = saleNetWt.toFixed(3);
		objArray['rotation'] = rotn.toFixed(3);
			
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Available Gross Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['avlNetWeight'] + '</span> <b>Sale Gross Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['saleNetWeight']  + '</span><b> Rotation </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['rotation']  + '</span>';
	};
	
	
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 65,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
		showtoolbar : true,
		groupable: true,
 	    statusbarheight: 20,
		groupsrenderer: groupsrenderer,
		showaggregates: true,  
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Report Type :'+$("#repTypeS option:selected").text());			
		},
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
		columns : [ 
			{text : 'Store Name',datafield : 'storeName',width : '15%',cellsalign : 'center',align : 'center',editable : false},	
			{text : 'Segment',datafield : 'articleSegment',	width : '15%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
			{text : 'Jewel Type',datafield : 'jewelType',width : '15%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
			{text : 'Weight Range',datafield : 'weightRange',width : '15%',cellsalign : 'center',align : 'center',editable : false, groupable: false,sortable:false}, 
			{text : 'Available Wt',datafield : 'avGwt',width : '13%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,columngroup : "totalWeight",cellsformat : 'd3'},
			{text : 'Sales Wt',datafield : 'saleGwt',	width : '13%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight",cellsformat : 'd3'}, 
			{text : 'Rotation',datafield : 'rotation',	width : '14%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight",cellsformat : 'd3'},
			
		]
	});
}

// search grid with vendor
var jewelMetalWtRangeDiaOrPltV11 =function(response) {
	var source = {
		datafields : [
			{'name' : 'storeName','type' : 'string','map' : 'storeName'},
			{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
			{'name':'vendorCode','type':'string','map':'vendor>name'},
			{'name' : 'jewelType','type' : 'float','map' : ''},
			{'name' : 'weightRange','type' : 'float','map' : ''},

			{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

			{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
			{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	var objArray = [];
	var getSumRows = function(data){
		var avlNetWt  = 0;
		var saleNetWt  = 0;
		var rotn = 0;
		
		for(var i=0; i< data.length; i++){
			if(data[i].avGwt != null){
				avlNetWt = avlNetWt + parseFloat(data[i].avGwt);
			}
			
			if(data[i].saleGwt != null){
				saleNetWt = saleNetWt + parseFloat(data[i].saleGwt);
			}
			
			if(data[i].rotation != null){
				rotn = rotn + parseFloat(data[i].rotation);
			}
		
			
		}
		objArray['avlNetWeight'] = avlNetWt.toFixed(3);
		objArray['saleNetWeight'] = saleNetWt.toFixed(3);
		objArray['rotation'] = rotn.toFixed(3);
			
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Available Net Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['avlNetWeight'] + '</span> <b>Sale Net Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['saleNetWeight']  + '</span><b> Rotation </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['rotation']  + '</span>';
	};
	
	
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 65,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
		showtoolbar : true,
		groupable: true,
 	    statusbarheight: 20,
		groupsrenderer: groupsrenderer,
		showaggregates: true,  
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Report Type :'+$("#repTypeS option:selected").text());			
		},
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
		columns : [ 
			{text : 'Store Name',datafield : 'storeName',width : '13%',cellsalign : 'center',align : 'center',editable : false},	
			{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '13%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

			{text : 'Segment',datafield : 'articleSegment',	width : '11%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
			{text : 'Jewel Type',datafield : 'jewelType',width : '15%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
			{text : 'Weight Range',datafield : 'weightRange',width : '12%',cellsalign : 'center',align : 'center',editable : false, groupable: false,sortable:false}, 
			{text : 'Available  Wt',datafield : 'avGwt',width : '12%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,columngroup : "totalWeight",cellsformat : 'd3'},
			{text : 'Sales  Wt',datafield : 'saleGwt',	width : '12%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight",cellsformat : 'd3'}, 
			{text : 'Rotation',datafield : 'rotation',	width : '12%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight",cellsformat : 'd3'},
		]
	});
}


// Main Category Grid Started

//Main Category For GOLD/SILVER without vendor
function mainCatSearchGridGoldOrSilver() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name' : 'mainCat','type' : 'float','map' : 'mainCategory'},

		{'name' : 'avPcsPair','type' : 'long','map':'availPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
		{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

		{'name' : 'salePcsPair','type' : 'long','map' : 'salePcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
		{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Article Segment','datafield' : 'articleSegment','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

		{'text' : 'Main Category','datafield' : 'mainCat','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregatesrenderer: function() {        		 
  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Grand Total</b></span>';
			}
		},
		{'text' : 'Ava Pcs/Pairs','datafield' : 'avPcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avPcsPair'] == null) ? 0 : record['avPcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Ava Gr. Wt.','datafield' : 'avGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avGwt'] == null) ? 0 : record['avGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Ava Nt. Wt.','datafield' : 'avNwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avNwt'] == null) ? 0 : record['avNwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Pcs/Pairs','datafield' : 'salePcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcsPair'] == null) ? 0 : record['salePcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Sale Gr. Wt.','datafield' : 'saleGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGwt'] == null) ? 0 : record['saleGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Nt. Wt.','datafield' : 'saleNwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleNwt'] == null) ? 0 : record['saleNwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Rotation','datafield' : 'rotation','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['rotation'] == null) ? 0 : record['rotation'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		}
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		showaggregates: true,
		showstatusbar: true
	});
}

// Main Category For GOLD/SILVER with vendor
function mainCatSearchGridGoldOrSilverV() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'vendorCode','type' : 'string','map' : 'vendor>name'},

		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name' : 'mainCat','type' : 'float','map' : 'mainCategory'},

		{'name' : 'avPcsPair','type' : 'long','map':'availPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
		{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

		{'name' : 'salePcsPair','type' : 'long','map' : 'salePcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
		{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

		{'text' : 'Segment','datafield' : 'articleSegment','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

		{'text' : 'Main Category','datafield' : 'mainCat','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregatesrenderer: function() {        		 
  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Grand Total</b></span>';
			}
		},
		{'text' : 'Ava Pcs/Pairs','datafield' : 'avPcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avPcsPair'] == null) ? 0 : record['avPcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Ava Gr. Wt.','datafield' : 'avGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avGwt'] == null) ? 0 : record['avGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Ava Nt. Wt.','datafield' : 'avNwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avNwt'] == null) ? 0 : record['avNwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Pcs/Pairs','datafield' : 'salePcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcsPair'] == null) ? 0 : record['salePcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Sale Gr. Wt.','datafield' : 'saleGwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGwt'] == null) ? 0 : record['saleGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		{'text' : 'Sale Nt. Wt.','datafield' : 'saleNwt','width' : '10%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleNwt'] == null) ? 0 : record['saleNwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Rotation','datafield' : 'rotation','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['rotation'] == null) ? 0 : record['rotation'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		}
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		showaggregates: true,
		showstatusbar: true
	});
}

// Diamond & Platinum
// without vendor
function mainCatSearchGridDiaOrPlt() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name' : 'mainCat','type' : 'float','map' : 'mainCategory'},

		{'name' : 'avPcsPair','type' : 'long','map':'avJewelDiaPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

		{'name' : 'salePcsPair','type' : 'long','map' : 'saleJewelDiaPcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Article Segment','datafield' : 'articleSegment','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

		{'text' : 'Main Category','datafield' : 'mainCat','width' : '16%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregatesrenderer: function() {        		 
  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Grand Total</b></span>';
			}
		},
		{'text' : 'Ava Jewel Pcs/Pairs','datafield' : 'avPcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avPcsPair'] == null) ? 0 : record['avPcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Ava Diamond Wt.(Cts)','datafield' : 'avGwt','width' : '13%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avGwt'] == null) ? 0 : record['avGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Sale Jewel Pcs/Pairs','datafield' : 'salePcsPair','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcsPair'] == null) ? 0 : record['salePcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Sale Diamond Wt.(Cts)','datafield' : 'saleGwt','width' : '13%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGwt'] == null) ? 0 : record['saleGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Rotation','datafield' : 'rotation','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['rotation'] == null) ? 0 : record['rotation'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		}
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		showaggregates: true,
		showstatusbar: true
	});
}


// with vendor
function mainCatSearchGridDiaOrPltV() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'vendorCode','type' : 'string','map' : 'vendor>name'},

		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name' : 'mainCat','type' : 'float','map' : 'mainCategory'},

		{'name' : 'avPcsPair','type' : 'long','map':'avJewelDiaPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

		{'name' : 'salePcsPair','type' : 'long','map' : 'saleJewelDiaPcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{'text' : 'Store Name','datafield' : 'storeName','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

		{'text' : 'Segment','datafield' : 'articleSegment','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

		{'text' : 'Main Category','datafield' : 'mainCat','width' : '12%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregatesrenderer: function() {        		 
  			  return '<span style="margin-top: 5px; color: #008800; text-align: center;"><b>Grand Total</b></span>';
			}
		},
		{'text' : 'Ava Jewel Pcs/Pairs','datafield' : 'avPcsPair','width' : '11%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avPcsPair'] == null) ? 0 : record['avPcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Ava Diamond Wt.(Cts)','datafield' : 'avGwt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['avGwt'] == null) ? 0 : record['avGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Sale Jewel Pcs/Pairs','datafield' : 'salePcsPair','width' : '11%',editable : false,sortable : true,cellsalign : 'center',align : 'center',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['salePcsPair'] == null) ? 0 : record['salePcsPair'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},

		{'text' : 'Sale Diamond Wt.(Cts)','datafield' : 'saleGwt','width' : '12%',editable : false,sortable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['saleGwt'] == null) ? 0 : record['saleGwt'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		},
		
		{'text' : 'Rotation','datafield' : 'rotation','width' : '10%',editable : false,sortable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3',
			aggregates: [{          
		  		  'Total': function(aggregatedValue, currentValue, column, record) {
						  var total = (record['rotation'] == null) ? 0 : record['rotation'];
		  			  return aggregatedValue + total;
		  		  }
		  	  }],
		  	  aggregatesrenderer: function(aggregates) {        		 
		        		if(typeof aggregates["Total"] == "undefined"){
		    				return '0.00';
		    		  	}else{
		    			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
		    		  	}
		  	  }
		}
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		showaggregates: true,
		showstatusbar: true
	});
}

// Main Category Metal Weight Range Grids
// Gold & silver
// search grid with vendor
var mainCatMetalWtRangeGoldSilver11 =function(response) {
	var source = {
		datafields : [
			{'name' : 'storeName','type' : 'string','map' : 'storeName'},
			{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
			{'name' : 'mainCat','type' : 'float','map' : 'mainCategory'},
			{'name' : 'fromWt','type' : 'float','map' : 'fromWghtRange'},
			{'name' : 'toWt','type' : 'float','map' : 'toWghtRange'},

			{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
			{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

			{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
			{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
			{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	var objArray = [];
	var getSumRows = function(data){
		var avlNetWt  = 0;
		var saleNetWt  = 0;
		var rotn = 0;
		
		for(var i=0; i< data.length; i++){
			if(data[i].avNwt != null){
				avlNetWt = avlNetWt + parseFloat(data[i].avNwt);
			}
			
			if(data[i].saleNwt != null){
				saleNetWt = saleNetWt + parseFloat(data[i].saleNwt);
			}
			
			if(data[i].rotation != null){
				rotn = rotn + parseFloat(data[i].rotation);
			}
		
			
		}
		objArray['avlNetWeight'] = avlNetWt.toFixed(3);
		objArray['saleNetWeight'] = saleNetWt.toFixed(3);
		objArray['rotation'] = rotn.toFixed(3);
			
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Available Net Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['avlNetWeight'] + '</span> <b>Sale Net Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['saleNetWeight']  + '</span><b> Rotation </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['rotation']  + '</span>';
	};
	
	
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 65,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
		showtoolbar : true,
		groupable: true,
 	    statusbarheight: 20,
		groupsrenderer: groupsrenderer,
		showaggregates: true,  
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Report Type :'+$("#repTypeS option:selected").text());			
		},
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
		columns : [ 
			{text : 'Store Name',datafield : 'storeName',width : '11%',cellsalign : 'center',align : 'center',editable : false},	
			{text : 'Segment',datafield : 'articleSegment',	width : '11%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
			{text : 'Main Category',datafield : 'mainCat',width : '15%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
			{text : 'From Wt',datafield : 'fromWt',width : '8%',cellsalign : 'center',align : 'center',editable : false, groupable: false,sortable:false,cellsformat : 'd3',}, 
			{text : 'To Wt',datafield : 'toWt',width : '7%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 

			{text : 'Available Gross Wt',datafield : 'avGwt',width : '11%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,cellsformat : 'd3',columngroup : "totalWeight"},
			{text : 'Available Net Wt',datafield : 'avNwt',width : '11%',cellsalign : 'center',align : 'center',editable : false,sortable:false,cellsformat : 'd3',columngroup : "totalWeight"} ,
			{text : 'Sales Gross Wt',datafield : 'saleGwt',	width : '10%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
			{text : 'Sales Net Wt',	datafield : 'saleNwt',width : '10%',cellsalign : 'center',align : 'center',	editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
			{text : 'Rotation',datafield : 'rotation',	width : '6%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"},
			
		]
	});
}

// search grid with vendor
var mainCatMetalWtRangeGoldSilverV11 =function(response) {
	var source = {
		datafields : [
			{'name' : 'storeName','type' : 'string','map' : 'storeName'},
			{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
			{'name':'vendorCode','type':'string','map':'vendor>name'},
			{'name' : 'mainCat','type' : 'float','map' : 'mainCategory'},
			{'name' : 'fromWt','type' : 'float','map' : 'fromWghtRange'},
			{'name' : 'toWt','type' : 'float','map' : 'toWghtRange'},


			{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
			{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

			{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
			{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
			{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	var objArray = [];
	var getSumRows = function(data){
		var avlNetWt  = 0;
		var saleNetWt  = 0;
		var rotn = 0;
		
		for(var i=0; i< data.length; i++){
			if(data[i].avNwt != null){
				avlNetWt = avlNetWt + parseFloat(data[i].avNwt);
			}
			
			if(data[i].saleNwt != null){
				saleNetWt = saleNetWt + parseFloat(data[i].saleNwt);
			}
			
			if(data[i].rotation != null){
				rotn = rotn + parseFloat(data[i].rotation);
			}
		
			
		}
		objArray['avlNetWeight'] = avlNetWt.toFixed(3);
		objArray['saleNetWeight'] = saleNetWt.toFixed(3);
		objArray['rotation'] = rotn.toFixed(3);
			
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Available Net Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['avlNetWeight'] + '</span> <b>Sale Net Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['saleNetWeight']  + '</span><b> Rotation </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['rotation']  + '</span>';
	};
	
	
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 65,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
		showtoolbar : true,
		groupable: true,
 	    statusbarheight: 20,
		groupsrenderer: groupsrenderer,
		showaggregates: true,  
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Report Type : '+$("#repTypeS option:selected").text());			
		},
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
		columns : [ 
			{text : 'Store Name',datafield : 'storeName',width : '10%',cellsalign : 'center',align : 'center',editable : false},	
			{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

			{text : 'Segment',datafield : 'articleSegment',	width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
			{text : 'Main Category',datafield : 'mainCat',width : '10%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
			{text : 'From Wt',datafield : 'fromWt',width : '8%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 
			{text : 'To Wt',datafield : 'toWt',width : '7%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 

			{text : 'Available Gross Wt',datafield : 'avGwt',width : '10%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,cellsformat : 'd3',columngroup : "totalWeight"},
			{text : 'Available Net Wt',datafield : 'avNwt',width : '10%',cellsalign : 'center',align : 'center',editable : false,sortable:false,cellsformat : 'd3',columngroup : "totalWeight"} ,
			{text : 'Sales Gross Wt',datafield : 'saleGwt',	width : '10%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
			{text : 'Sales Net Wt',	datafield : 'saleNwt',width : '10%',cellsalign : 'center',align : 'center',	editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
			{text : 'Rotation',datafield : 'rotation',	width : '5%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"},
			
		]
	});
}

// Diamond & Platinum
var mainCatMetalWtRangeDiaOrPlt11 =function(response) {
	var source = {
		datafields : [
			{'name' : 'storeName','type' : 'string','map' : 'storeName'},
			{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
			{'name' : 'mainCat','type' : 'float','map' : 'mainCategory'},
			{'name' : 'fromWt','type' : 'float','map' : 'fromWghtRange'},
			{'name' : 'toWt','type' : 'float','map' : 'toWghtRange'},

			{'name' : 'avlPcsPairs','type' : 'long','map':'avJewelDiaPcs'}, 
			{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

			{'name' : 'salePcsPairs','type' : 'long','map' : 'saleJewelDiaPcs'},
			{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
			{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	var objArray = [];
	var getSumRows = function(data){
		var avlNetWt  = 0;
		var saleNetWt  = 0;
		var rotn = 0;
		
		for(var i=0; i< data.length; i++){
			if(data[i].avGwt != null){
				avlNetWt = avlNetWt + parseFloat(data[i].avGwt);
			}
			
			if(data[i].saleGwt != null){
				saleNetWt = saleNetWt + parseFloat(data[i].saleGwt);
			}
			
			if(data[i].rotation != null){
				rotn = rotn + parseFloat(data[i].rotation);
			}
		
			
		}
		objArray['avlNetWeight'] = avlNetWt.toFixed(3);
		objArray['saleNetWeight'] = saleNetWt.toFixed(3);
		objArray['rotation'] = rotn.toFixed(3);
			
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Available Gross Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['avlNetWeight'] + '</span> <b>Sale Gross Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['saleNetWeight']  + '</span><b> Rotation </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['rotation']  + '</span>';
	};
	
	
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 65,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
		showtoolbar : true,
		groupable: true,
 	    statusbarheight: 20,
		groupsrenderer: groupsrenderer,
		showaggregates: true,  
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Report Type : '+$("#repTypeS option:selected").text());			
		},
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
		columns : [ 
			{text : 'Store Name',datafield : 'storeName',width : '11%',cellsalign : 'center',align : 'center',editable : false},	
			{text : 'Segment',datafield : 'articleSegment',	width : '11%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
			{text : 'Main Category',datafield : 'mainCat',width : '15%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
			{text : 'From Wt',datafield : 'fromWt',width : '8%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 
			{text : 'To Wt',datafield : 'toWt',width : '7%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 

			{text : 'Av Pcs/Pairs',datafield : 'avlPcsPairs',width : '11%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,cellsformat : 'd3',columngroup : "totalWeight"},
			{text : 'Av G. Wt.',datafield : 'avGwt',width : '11%',cellsalign : 'center',align : 'center',editable : false,sortable:false,cellsformat : 'd3',columngroup : "totalWeight"} ,
			{text : 'Sales Pcs/Pairs',datafield : 'salePcsPairs',width : '10%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
			{text : 'Sales G. Wt.',	datafield : 'saleGwt',width : '10%',cellsalign : 'center',align : 'center',	editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
			{text : 'Rotation',datafield : 'rotation',	width : '6%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"},
			
		]
	});
}

// search grid with vendor
var mainCatMetalWtRangeDiaOrPltV11 =function(response) {
	var source = {
		datafields : [
			{'name' : 'storeName','type' : 'string','map' : 'storeName'},
			{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
			{'name':'vendorCode','type':'string','map':'vendor>name'},
			{'name' : 'mainCat','type' : 'float','map' : 'mainCategory'},
			{'name' : 'fromWt','type' : 'float','map' : 'fromWghtRange'},
			{'name' : 'toWt','type' : 'float','map' : 'toWghtRange'},

			{'name' : 'avlPcsPairs','type' : 'long','map':'avJewelDiaPcs'}, 
			{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

			{'name' : 'salePcsPairs','type' : 'long','map' : 'saleJewelDiaPcs'},
			{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
			{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	var objArray = [];
	var getSumRows = function(data){
		var avlNetWt  = 0;
		var saleNetWt  = 0;
		var rotn = 0;
		
		for(var i=0; i< data.length; i++){
			if(data[i].avGwt != null){
				avlNetWt = avlNetWt + parseFloat(data[i].avGwt);
			}
			
			if(data[i].saleGwt != null){
				saleNetWt = saleNetWt + parseFloat(data[i].saleGwt);
			}
			
			if(data[i].rotation != null){
				rotn = rotn + parseFloat(data[i].rotation);
			}
		
			
		}
		objArray['avlNetWeight'] = avlNetWt.toFixed(3);
		objArray['saleNetWeight'] = saleNetWt.toFixed(3);
		objArray['rotation'] = rotn.toFixed(3);
			
		objArray['count'] = data.length;
		return objArray;
	}
	
	var groupsrenderer = function (text, group, expanded, data) {
	    var aggregate = getSumRows(data.subItems);
	    return '<div style="position: absolute;">(<span style="color:#910707;">'+ aggregate['count'] +'</span>) <span>' + text + ', </span>' + '<span>' + "<b>Available Gross Wt</b> : <span style='color:#008800; font-weight:bold;'>" + '  ' + aggregate['avlNetWeight'] + '</span> <b>Sale Gross Wt </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['saleNetWeight']  + '</span><b> Rotation </b>: <span style="color:#008800; font-weight:bold;">' + aggregate['rotation']  + '</span>';
	};
	
	
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		height: '330px',
		theme: 'energyblue',
        columnsheight: 65,
        columnsresize: true,  
		rowsheight : 30,
		autorowheight : true,
		autoheight : false,
		pageable: true,
		altRows : true,
		sortable:true,
		columnsresize : true,
		showtoolbar : true,
		groupable: true,
 	    statusbarheight: 20,
		groupsrenderer: groupsrenderer,
		showaggregates: true,  
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Report Type : '+$("#repTypeS option:selected").text());			
		},
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
		columns : [ 
			{text : 'Store Name',datafield : 'storeName',width : '10%',cellsalign : 'center',align : 'center',editable : false},	
			{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

			{text : 'Segment',datafield : 'articleSegment',	width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
			{text : 'Main Category',datafield : 'mainCat',width : '10%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
			{text : 'From Wt',datafield : 'fromWt',width : '8%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 
			{text : 'To Wt',datafield : 'toWt',width : '7%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 
			
			{text : 'Av Pcs/Pairs',datafield : 'avlPcsPairs',width : '10%',cellsalign : 'center',align : 'center',editable : false,sortable:false,cellsformat : 'd3',columngroup : "totalWeight"} ,
			{text : 'Av G. Wt.',datafield : 'avGwt',width : '10%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,cellsformat : 'd3',columngroup : "totalWeight"},
			{text : 'Sales Pcs/Pairs',datafield : 'salePcsPairs',	width : '10%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
			{text : 'Sales G. Wt.',	datafield : 'saleGwt',width : '10%',cellsalign : 'center',align : 'center',	editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
			{text : 'Rotation',datafield : 'rotation',	width : '5%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"},
			
		]
	});
}

var segJewTypeWiseSearchFieldFilters = function() {
	var fromDateS = $('#fromDateS').val();
	var toDateS = $('#toDateS').val();
	var storeNameS = $('#storeNameS').val();
	var artSegmentS = $('#artSegmentS').val();
	var mainCatS = $('#mainCatS').val();
	var jewelTypeS =$("#jewelTypeS").val();
	var wtRangeS =$("#wtRangeS").val();
	var vendCodeS =$("#vendCodeS").val();
	var reportType = $("#repTypeS").val();
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (storeNameS != "" && storeNameS != null) {
		fieldFilters.fieldFilters["storeId"] = parseInt(storeNameS);
	}
	if (artSegmentS != "" && artSegmentS != null) {
		fieldFilters.fieldFilters["segmentId"] = artSegmentS;
	}
	
	if(reportType != "" && reportType != null){
		fieldFilters.fieldFilters["reportType"] = reportType;
	}
	var jewelTypeObjS = $('#jewelTypeObjS').val();
	if (jewelTypeObjS == null || jewelTypeObjS == "") {
		var jType = "";
	} else {
		var jType = jewelTypeObjS.join(",");
	}
	if (jType != "" && jType != null) {
		fieldFilters.fieldFilters["JtypeIds"] = jType;
	}
	
	var vendCodeObjS = $('#vendCodeObjS').val();
	if (vendCodeObjS == null || vendCodeObjS == "") {
		var vcode = "";
	} else {
		var vcode = vendCodeObjS.join(",");
	}
	if (vcode != "" && vcode != null) {
		fieldFilters.fieldFilters["vendorIds"] = vcode;
	}
	
	var mainCatObj = $('#mainCatObjS').val();
	if (mainCatObj == null || mainCatObj == "") {
		var mainCatS = "";
	} else {
		var mainCatS = mainCatObj.join(",");
	}
	if (mainCatS != "" && mainCatS != null) {
		fieldFilters.fieldFilters["mcategoryIds"] = mainCatS;
	}
	
	var  wtRangeObj = $("#wtRangeObjS").val();
	if( wtRangeObj == "" || wtRangeObj == null){
		var wtRangeS = "";
	}else{
		var wtRangeS = wtRangeObj.join(",");
	}
	
	
	var  wtRangeDiaObj = $("#wtRangeDiaObjS").val();
	if( wtRangeDiaObj == "" || wtRangeDiaObj == null){
		var wtRangeDS = "";
	}else{
		var wtRangeDS = wtRangeDiaObj.join(",");
	}
	
	if($("#artSegmentS option:selected").text() == "Gold" || $("#artSegmentS option:selected").text() == "Silver" ){
		if(wtRangeS != "" && wtRangeS != null){
			fieldFilters.fieldFilters["weightCostRange"] = wtRangeS;
		}
	}else{
		if($("#artSegmentS option:selected").text() == "Diamond"){
			if(reportType != "JTMWR"){
				if(wtRangeS != "" && wtRangeS != null){
					fieldFilters.fieldFilters["weightCostRange"] = wtRangeS;
				}
			}else{
				if(wtRangeDS != "" && wtRangeDS != null){
					fieldFilters.fieldFilters["weightCostRange"] = wtRangeDS;
				}
			}
			
		}else{
			if($("#artSegmentS option:selected").text() == "Platinum"){
				if(reportType == "JTMWR"){
					if(mainCatFFArry.length > 1 && mainCatFFArry.includes("PP")){
						if(wtRangeS != "" && wtRangeS != null){
							fieldFilters.fieldFilters["weightCostRange"] = wtRangeS;
						}
					}else{
						if(wtRangeDS != "" && wtRangeDS != null){
							fieldFilters.fieldFilters["weightCostRange"] = wtRangeDS;
						}
					}
				}else{
					if(wtRangeS != "" && wtRangeS != null){
						fieldFilters.fieldFilters["weightCostRange"] = wtRangeS;
					}
				}
			}
		}
	}

	return fieldFilters;
}

$("#search").on('click',function(){
	var vendor = $("#vendCodeObjS").val();
	var segment= $("#artSegmentS option:selected").text();
	var reportType = $("#repTypeS").val();
	if(reportType == "JT" ){
		if(segment == "Gold" || segment == "Silver"){
			if(vendor == null || vendor == ""){
				jewelTypeSearchGridGoldOrSilver();
				$("#jqxgrid").show();
			//	return;
			}
			else{
				jewelTypeSearchGridGoldOrSilverV();
				$("#jqxgrid").show();
			}
		}else{
			if(vendor == null || vendor == ""){
				jewelTypeSearchGridDiaOrPlt();
				$("#jqxgrid").show();
			//	return;
			}
			else{
				jewelTypeSearchGridDiaOrPltV();
				$("#jqxgrid").show();
			}
		}
		
	}
	if(reportType == "MWR"){
		if(segment == "Gold" || segment == "Silver"){
			if(vendor == null || vendor == ""){
				metalWtRangeSearchGridGoldOrSilver();
				$("#jqxgrid").show();
			//	return;
			}
			else{
				metalWtRangeSearchGridGoldOrSilverV();
				$("#jqxgrid").show();
			}
		}else{
			if(vendor == null || vendor == ""){
				metalWtRangeSearchGridDiaOrPlt();
				$("#jqxgrid").show();
			}else{
				metalWtRangeSearchGridDiaOrPltV();
				$("#jqxgrid").show();
			}
		}
		
	}
	if(reportType == "MC" ){
	if(segment == "Gold" || segment == "Silver"){
		if(vendor == null || vendor == ""){
			mainCatSearchGridGoldOrSilver()
			$("#jqxgrid").show();
		//	return;
		}
		else{
			mainCatSearchGridGoldOrSilverV()
			$("#jqxgrid").show();
		}
	}else{
			if(vendor == null || vendor == ""){
				mainCatSearchGridDiaOrPlt();
				$("#jqxgrid").show();
			}else{
				mainCatSearchGridDiaOrPltV();
				$("#jqxgrid").show();
			}	
		}
	}
	if(reportType == "JTMWR" ){
	  var jType = $("#jewelTypeObjS").val();
      if(jType == null || jType == ""){
    	  $.growl.error({
    		  message : "Please Select Jewel Type !!!",
    		  duration : 10000,
    		  title : 'Error'
    	  });
    	  return false;
      }else{
    	  //postJSON('/OrderExecution/api/v1/searchRotationReportSegMetalJtype',JSON.stringify(segJewTypeWiseSearchFieldFilters()),function(data) {
  			//var response = data.payload.list;
  			if(segment == "Gold" || segment == "Silver"){
  				if(vendor == null || vendor == ""){
  	  				jewelMetalWtRangeGoldSilver()
  	  				$("#jqxgrid").show();
  	  			//	return;
  	  			}
  	  			else{
  	  				jewelMetalWtRangeGoldSilverV();
  	  				$("#jqxgrid").show();
  	  			}
  			}else{
  				if(vendor == null || vendor == ""){
  	  				jewelMetalWtRangeDiaOrPlt();
  	  				$("#jqxgrid").show();
  	  			//	return;
  	  			}
  	  			else{
  	  				jewelMetalWtRangeDiaOrPltV();
  	  				$("#jqxgrid").show();
  	  			}
  			}
  			
  		//});  
      }
	}
	if(reportType == "MCMWR"){
		var mCat = $("#mainCatObjS").val();
		if(mCat == null || mCat == ""){
			 $.growl.error({
	    		  message : "Please Select Main Category !!!",
	    		  duration : 10000,
	    		  title : 'Error'
	    	  });
	    	  return false;
		}else{
		//	postJSON('/OrderExecution/api/v1/searchRotationReportSegMetalJtype',JSON.stringify(segJewTypeWiseSearchFieldFilters()),function(data) {
			//	var response = data.payload.list;
				if(segment == "Gold" || segment == "Silver"){
					if(vendor == null || vendor == ""){
						mainCatMetalWtRangeGoldSilver()
						$("#jqxgrid").show();
					//	return;
					}
					else{
						mainCatMetalWtRangeGoldSilverV()
						$("#jqxgrid").show();
					}
				}else{
					if(vendor == null || vendor == ""){
						mainCatMetalWtRangeDiaOrPlt(); 
						$("#jqxgrid").show();
					}else{
						mainCatMetalWtRangeDiaOrPltV(); 
						$("#jqxgrid").show();
					}
				}
			//});
		}
	}
});

// Jewel Type ,Metal Weight Range
function jewelMetalWtRangeGoldSilver() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name' : 'jewelType','type' : 'float','map' : 'jewelType'},
		
		{'name' : 'weightRangeF','type' : 'float','map':'fromWghtRange'}, 
		{'name' : 'weightRangeT','type' : 'float','map':'toWghtRange'},

		{'name' : 'avPcsPair','type' : 'long','map':'availPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
		{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

		{'name' : 'salePcsPair','type' : 'long','map' : 'salePcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
		{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{text : 'Store Name',datafield : 'storeName',width : '10%',cellsalign : 'center',align : 'center',editable : false},	
		{text : 'Segment',datafield : 'articleSegment',	width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
		{text : 'Jewel Type',datafield : 'jewelType',width : '15%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
		{text : 'Weight Range',datafield : 'weightRange',width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false,sortable:false,
			cellsrenderer: function(row, column, value){
				var fromWt = $("#jqxgrid").jqxGrid('getcellvalue', row, 'weightRangeF');
				var toWt = $("#jqxgrid").jqxGrid('getcellvalue', row, 'weightRangeT');
				var wtRange = parseFloat(fromWt).toFixed(3) + "-" + parseFloat(toWt).toFixed(3);
				
				return "<div align='center'style='margin-top:19px;'>"+ wtRange +"</div>";
			}
		},
		{text : 'Available Gross Wt',datafield : 'avGwt',width : '11%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,cellsformat:'d3',columngroup : "totalWeight"},
		{text : 'Available Net Wt',datafield : 'avNwt',width : '11%',cellsalign : 'center',align : 'center',editable : false,sortable:false,columngroup : "totalWeight",cellsformat:'d3',} ,
		{text : 'Sales Gross Wt',datafield : 'saleGwt',	width : '11%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight",cellsformat:'d3',}, 
		{text : 'Sales Net Wt',	datafield : 'saleNwt',width : '11%',cellsalign : 'center',align : 'center',	editable : false,columngroup : "totalWeight",cellsformat:'d3',}, 
		{text : 'Rotation',datafield : 'rotation',	width : '11%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight",cellsformat:'d3',},
		
		{text : '',datafield : 'weightRangeF',	width : '11%',cellsalign : 'center',align : 'center',editable : false,hidden:true}, 
		{text : '',	datafield : 'weightRangeT',width : '11%',cellsalign : 'center',align : 'center',	editable : false,hidden:true}, 
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		//showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
	});
}

function jewelMetalWtRangeGoldSilverV() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name':'vendorCode','type':'string','map':'vendor>name'},
		{'name' : 'jewelType','type' : 'float','map' : ''},
		{'name' : 'weightRangef','type' : 'float','map' : 'fromWghtRange'},
		{'name' : 'weightRanget','type' : 'float','map' : 'toWghtRange'},

		{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
		{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

		{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
		{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{text : 'Store Name',datafield : 'storeName',width : '10%',cellsalign : 'center',align : 'center',editable : false},	
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

		{text : 'Segment',datafield : 'articleSegment',	width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
		{text : 'Jewel Type',datafield : 'jewelType',width : '10%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
		{text : 'Weight Range',datafield : 'weightRange',width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false,sortable:false,
			cellsrenderer: function(row, column, value){
				var fromWt = $("#jqxgrid").jqxGrid('getcellvalue', row, 'weightRangef');
				var toWt = $("#jqxgrid").jqxGrid('getcellvalue', row, 'weightRanget');
				var wtRange = parseFloat(fromWt).toFixed(3) + "-" + parseFloat(toWt).toFixed(3);
				
				return "<div align='center'style='margin-top:19px;'>"+ wtRange +"</div>";
			}
		},
		{text : 'Available Gross Wt',datafield : 'avGwt',width : '10%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,columngroup : "totalWeight",cellsformat:'d3',},
		{text : 'Available Net Wt',datafield : 'avNwt',width : '10%',cellsalign : 'center',align : 'center',editable : false,sortable:false,columngroup : "totalWeight",cellsformat:'d3',} ,
		{text : 'Sales Gross Wt',datafield : 'saleGwt',	width : '10%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight",cellsformat:'d3',}, 
		{text : 'Sales Net Wt',	datafield : 'saleNwt',width : '10%',cellsalign : 'center',align : 'center',	editable : false,columngroup : "totalWeight",cellsformat:'d3',}, 
		{text : 'Rotation',datafield : 'rotation',	width : '10%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight",cellsformat:'d3',},
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		//showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
	});
}

function jewelMetalWtRangeDiaOrPlt() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name':'vendorCode','type':'string','map':'vendor>name'},
		{'name' : 'jewelType','type' : 'float','map' : ''},
		{'name' : 'weightRangef','type' : 'float','map' : 'fromWghtRange'},
		{'name' : 'weightRanget','type' : 'float','map' : 'toWghtRange'},

		{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

		{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{text : 'Store Name',datafield : 'storeName',width : '15%',cellsalign : 'center',align : 'center',editable : false},	
		{text : 'Segment',datafield : 'articleSegment',	width : '15%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
		{text : 'Jewel Type',datafield : 'jewelType',width : '15%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
		{text : 'Weight Range',datafield : 'weightRange',width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false,sortable:false,
			cellsrenderer: function(row, column, value){
				var fromWt = $("#jqxgrid").jqxGrid('getcellvalue', row, 'weightRangef');
				var toWt = $("#jqxgrid").jqxGrid('getcellvalue', row, 'weightRanget');
				var wtRange = parseFloat(fromWt).toFixed(3) + "-" + parseFloat(toWt).toFixed(3);
				
				return "<div align='center'style='margin-top:19px;'>"+ wtRange +"</div>";
			}
		},
		{text : 'Available Wt',datafield : 'avGwt',width : '13%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,columngroup : "totalWeight",cellsformat : 'd3'},
		{text : 'Sales Wt',datafield : 'saleGwt',	width : '13%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight",cellsformat : 'd3'}, 
		{text : 'Rotation',datafield : 'rotation',	width : '14%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight",cellsformat : 'd3'},
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		//showaggregates: true,
		//showstatusbar: true,
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
	});
}


function jewelMetalWtRangeDiaOrPltV() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name':'vendorCode','type':'string','map':'vendor>name'},
		{'name' : 'jewelType','type' : 'float','map' : ''},
		{'name' : 'weightRangef','type' : 'float','map' : 'fromWghtRange'},
		{'name' : 'weightRanget','type' : 'float','map' : 'toWghtRange'},

		{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

		{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{text : 'Store Name',datafield : 'storeName',width : '15%',cellsalign : 'center',align : 'center',editable : false},	
		{text : 'Vendor Code',datafield : 'vendorCode',	width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 

		{text : 'Segment',datafield : 'articleSegment',	width : '15%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
		{text : 'Jewel Type',datafield : 'jewelType',width : '15%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
		{text : 'Weight Range',datafield : 'weightRange',width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false,sortable:false,
			cellsrenderer: function(row, column, value){
				var fromWt = $("#jqxgrid").jqxGrid('getcellvalue', row, 'weightRangef');
				var toWt = $("#jqxgrid").jqxGrid('getcellvalue', row, 'weightRanget');
				var wtRange = parseFloat(fromWt).toFixed(3) + "-" + parseFloat(toWt).toFixed(3);
				
				return "<div align='center'style='margin-top:19px;'>"+ wtRange +"</div>";
			}
		},
		{text : 'Available Wt',datafield : 'avGwt',width : '13%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,columngroup : "totalWeight",cellsformat : 'd3'},
		{text : 'Sales Wt',datafield : 'saleGwt',	width : '13%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight",cellsformat : 'd3'}, 
		{text : 'Rotation',datafield : 'rotation',	width : '14%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight",cellsformat : 'd3'},
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		//showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
	});
}

// Main Category & Metal Weight Range
//GOLD &SILVER
function mainCatMetalWtRangeGoldSilver() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name':'vendorCode','type':'string','map':'vendor>name'},
		{'name' : 'mainCat','type' : 'string','map' : 'mainCategory'},
		{'name' : 'fromWt','type' : 'float','map' : 'fromWghtRange'},
		{'name' : 'toWt','type' : 'float','map' : 'toWghtRange'},

		{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
		{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 
		{'name' : 'saleNwt','type' : 'float','map':'salesNwt'}, 

		{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
		
	];

	var columns = [
		{text : 'Store Name',datafield : 'storeName',width : '10%',cellsalign : 'center',align : 'center',editable : false},	

		{text : 'Segment',datafield : 'articleSegment',	width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
		{text : 'Main Category',datafield : 'mainCat',width : '15%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
		{text : 'From Wt',datafield : 'fromWt',width : '8%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 
		{text : 'To Wt',datafield : 'toWt',width : '7%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 

		{text : 'Available Gross Wt',datafield : 'avGwt',width : '11%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,cellsformat : 'd3',columngroup : "totalWeight"},
		{text : 'Available Net Wt',datafield : 'avNwt',width : '11%',cellsalign : 'center',align : 'center',editable : false,sortable:false,cellsformat : 'd3',columngroup : "totalWeight"} ,
		{text : 'Sales Gross Wt',datafield : 'saleGwt',	width : '10%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
		{text : 'Sales Net Wt',	datafield : 'saleNwt',width : '10%',cellsalign : 'center',align : 'center',	editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
		{text : 'Rotation',datafield : 'rotation',	width : '8%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"},
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		//showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
	});
}

function mainCatMetalWtRangeGoldSilverV() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name':'vendorCode','type':'string','map':'vendor>name'},
		{'name' : 'mainCat','type' : 'string','map' : 'mainCategory'},
		{'name' : 'fromWt','type' : 'float','map' : 'fromWghtRange'},
		{'name' : 'toWt','type' : 'float','map' : 'toWghtRange'},


		{'name' : 'avGwt','type' : 'float','map':'availGwt'}, 
		{'name' : 'avNwt','type' : 'float','map':'availNwt'}, 

		{'name' : 'saleGwt','type' : 'float','map' : 'salesGwt'},
		{'name' : 'saleNwt','type' : 'float','map' : 'salesNwt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
	];

	var columns = [
		{text : 'Store Name',datafield : 'storeName',width : '10%',cellsalign : 'center',align : 'center',editable : false},	
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

		{text : 'Segment',datafield : 'articleSegment',	width : '10%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
		{text : 'Main Category',datafield : 'mainCat',width : '10%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
		{text : 'From Wt',datafield : 'fromWt',width : '8%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 
		{text : 'To Wt',datafield : 'toWt',width : '7%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 

		{text : 'Available Gross Wt',datafield : 'avGwt',width : '10%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,cellsformat : 'd3',columngroup : "totalWeight"},
		{text : 'Available Net Wt',datafield : 'avNwt',width : '10%',cellsalign : 'center',align : 'center',editable : false,sortable:false,cellsformat : 'd3',columngroup : "totalWeight"} ,
		{text : 'Sales Gross Wt',datafield : 'saleGwt',	width : '10%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
		{text : 'Sales Net Wt',	datafield : 'saleNwt',width : '10%',cellsalign : 'center',align : 'center',	editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
		{text : 'Rotation',datafield : 'rotation',	width : '5%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"},
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		//showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
	});
}

//diamond & platinum
function mainCatMetalWtRangeDiaOrPlt() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name' : 'mainCat','type' : 'float','map' : 'mainCategory'},
		{'name' : 'fromWt','type' : 'float','map' : 'fromWghtRange'},
		{'name' : 'toWt','type' : 'float','map' : 'toWghtRange'},

		{'name' : 'avlPcsPairs','type' : 'long','map':'avJewelDiaPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

		{'name' : 'salePcsPairs','type' : 'long','map' : 'saleJewelDiaPcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
	];

	var columns = [
		{text : 'Store Name',datafield : 'storeName',width : '11%',cellsalign : 'center',align : 'center',editable : false},	
		{text : 'Segment',datafield : 'articleSegment',	width : '11%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
		{text : 'Main Category',datafield : 'mainCat',width : '15%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
		{text : 'From Wt',datafield : 'fromWt',width : '8%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 
		{text : 'To Wt',datafield : 'toWt',width : '7%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 

		{text : 'Av Pcs/Pairs',datafield : 'avlPcsPairs',width : '11%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,columngroup : "totalWeight"},
		{text : 'Av G. Wt.',datafield : 'avGwt',width : '11%',cellsalign : 'center',align : 'center',editable : false,sortable:false,cellsformat : 'd3',columngroup : "totalWeight"} ,
		{text : 'Sales Pcs/Pairs',datafield : 'salePcsPairs',width : '10%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight"}, 
		{text : 'Sales G. Wt.',	datafield : 'saleGwt',width : '10%',cellsalign : 'center',align : 'center',	editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
		{text : 'Rotation',datafield : 'rotation',	width : '6%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"},
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		//showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
	});
}

function mainCatMetalWtRangeDiaOrPltV() {

	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'storeName','type' : 'string','map' : 'storeName'},
		{'name' : 'articleSegment','type' : 'string','map':'articleSegment'},
		{'name':'vendorCode','type':'string','map':'vendor>name'},

		{'name' : 'mainCat','type' : 'float','map' : 'mainCategory'},
		{'name' : 'fromWt','type' : 'float','map' : 'fromWghtRange'},
		{'name' : 'toWt','type' : 'float','map' : 'toWghtRange'},

		{'name' : 'avlPcsPairs','type' : 'long','map':'avJewelDiaPcs'}, 
		{'name' : 'avGwt','type' : 'float','map':'avJewelDiaWt'}, 

		{'name' : 'salePcsPairs','type' : 'long','map' : 'saleJewelDiaPcs'},
		{'name' : 'saleGwt','type' : 'float','map' : 'saleJewelDiaWt'},
		{'name' : 'rotation','type' : 'float','map' : 'weightRotation'},
	];

	var columns = [
		{text : 'Store Name',datafield : 'storeName',width : '11%',cellsalign : 'center',align : 'center',editable : false},	
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '10%',editable : false,sortable : true,cellsalign : 'center',align : 'center'},

		{text : 'Segment',datafield : 'articleSegment',	width : '11%',cellsalign : 'center',align : 'center',editable : false, groupable: false}, 
		{text : 'Main Category',datafield : 'mainCat',width : '15%',cellsalign : 'center',align : 'center',editable : false,sortable:true, groupable: true},
		{text : 'From Wt',datafield : 'fromWt',width : '8%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 
		{text : 'To Wt',datafield : 'toWt',width : '7%',cellsalign : 'center',align : 'center',editable : false, groupable: false,cellsformat : 'd3',sortable:false}, 

		{text : 'Av Pcs/Pairs',datafield : 'avlPcsPairs',width : '11%',	cellsalign : 'center',align : 'center',	editable : false, groupable: false,columngroup : "totalWeight"},
		{text : 'Av G. Wt.',datafield : 'avGwt',width : '11%',cellsalign : 'center',align : 'center',editable : false,sortable:false,cellsformat : 'd3',columngroup : "totalWeight"} ,
		{text : 'Sales Pcs/Pairs',datafield : 'salePcsPairs',width : '10%',cellsalign : 'center',align : 'center',editable : false,columngroup : "totalWeight"}, 
		{text : 'Sales G. Wt.',	datafield : 'saleGwt',width : '10%',cellsalign : 'center',align : 'center',	editable : false,cellsformat : 'd3',columngroup : "totalWeight"}, 
		{text : 'Rotation',datafield : 'rotation',	width : '6%',cellsalign : 'center',align : 'center',editable : false,cellsformat : 'd3',columngroup : "totalWeight"},
	];
	showMyGrid(datafields, "/OrderExecution/api/v1/searchRotationReportSegMetalJtype", "list",columns,segJewTypeWiseSearchFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
     	altrows: true,
    	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		autorowheight :true,
        autoheight :true,
        columnsheight: 40,
		rowdetails : true,
		virtualmode : true,
		//showaggregates: true,
		showstatusbar: true,
		columngroups : [ {
			text : 'Total Weight',
			name : 'totalWeight',
			align : 'center'
		}],
	});
}


$("#clearAll").on('click',function(){
	window.location.href="javascript:showContentPage('rotationalReportSegJewelWise', 'bodySwitcher')"
});

$("#export").on('click',function(){
	var fieldFilters = segJewTypeWiseSearchFieldFilters();
     var sysdate = moment().format('DDMMYYYYHHmmSS');
	 var rows = $("#jqxgrid").jqxGrid('getrows');
	 var newData = [];
	 if(typeof rows == "undefined"){
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
		}else{	
			$.growl.notice({
				message : "Export In Progress,Please Check in Rotation Report Export ",
				duration : 10000,
				title : 'Error'
			});
			var rows = $("#jqxgrid").jqxGrid('getdatainformation');
			if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/exportRotationReportSegMetalJtype',JSON.stringify(fieldFilters),function(response) {
				if(response.resCode == 1){

				}else{
					
				}
			});
			}
		}
});