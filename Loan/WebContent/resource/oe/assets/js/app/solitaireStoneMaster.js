//date picker functions
$("#fromDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#toDateS").datepicker('option', 'minDate', min || '0');
    }
});

$("#toDateS").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
});


var onLoadFunction = function(region,seg,hsnCode){
$("#samRegionS").empty().append('<option value="" selected>--Select--</option>');
$("#samRegionC").empty().append('<option value="" selected>--Select--</option>');

$("#stoneSegS").empty().append('<option value="" selected>--Select--</option>');
$("#samStoneSegC").empty().append('<option value="" selected>--Select--</option>');

$("#samUomC").empty().append('<option value="" selected>--Select--</option>');
$("#samBusinessS").empty().append('<option value="" selected>--Select--</option>');

$("#mainCatS").empty().append('<option value="" selected>--Select--</option>');
$("#subCatS").empty().append('<option value="" selected>--Select--</option>');


$.getJSON("/OrderExecution/api/v1/stoneMasterLov",function(data){
	var segmentArr = [];
	var uqcArr = data.payload.unitofMesurements;
    $.each(data.payload.stoneSeg,function(k,v){
    	if(v.name == "DI"){
    		segmentArr.push(v);
    	}
    });
	
  /*  $.each(data.payload.unitofMesurements,function(k,v){
    	if(v.name == "Cts"){
    		uqcArr.push(v);
    	}
    });*/
    
	$.each(data.payload.REGION_LOV,function(key,val){
		$("#samRegionS").append('<option value="'+val.id+'">'+val.name+'</option>');
	    $("#samRegionC").append('<option value="'+val.id+'">'+val.name+'</option>');
	})
	$.each(segmentArr,function(key,val){
		$("#samStoneSegC").append('<option value="'+val.description+'" idE="'+val.id+'" idEName="'+val.name+'">'+val.description+'</option>');
	    $("#stoneSegS").append('<option value="'+val.description+'" ids="'+val.id+'" idName="'+val.name+'">'+val.description+'</option>');
	})
	$.each(uqcArr,function(key,val){
		 $("#samUomC").append('<option value="'+val.id+'">'+val.name+'</option>');
	})
    $.each(data.payload.business,function(key,val){
    	$("#samBusinessS").append('<option value="'+val.id+'">'+val.name+'</option>');
    })
    
    $.each(data.payload.REGION_LOV, function(key, val) {
		if (region == val.id) {
			$('#samRegionE').append('<option selected value="' + val.id + '">' + val.name + '</option>');
		} else {
			$('#samRegionE').append('<option value="'+val.id+'">'+val.name+'</option>');
		}
	});
	
	$.each(data.payload.stoneSeg, function(key, val) {
		if (seg == val.id) {
			$('#samStoneSegE').append('<option selected value="' + val.id + '">' + val.description + '</option>');
		} else {
			$('#samStoneSegE').append('<option value="' + val.id + '">' + val.description + '</option>');
		}
	});
})
}

  onLoadFunction();
 
  $('#stoneArticleCreate').on('click', function(){		

		$("#samRegionC").prop("disabled",false);
		$("#samStoneSegC").prop("disabled",false);
		$("#samStoneCatC").prop("disabled",false);
		$("#subCatC").prop("disabled",false);
		$("#packetStockC").prop("disabled",false);
		//$("#reorderC").prop("disabled",true);
		//$("#custFlagC").prop("disabled",true);	
		$("#rateC").prop("disabled",false);
	//	$("#handlingChargesC").prop("disabled",true);
		//$("#samUomC").prop("disabled",true);
		
		
		$("#jqxgridS").jqxGrid('clear');
		$("#jqxgridS").hide();
		$("#addRowSam").hide();
		$("#saveStoneArticle").hide();
		
		$('form').trigger("reset");
		$("#jqxgrid").jqxGrid('clear');
		
		$("#samUomC").val("Cts");
		//$("#packetStockC").val("Stock");
		//$("#reorderC").val("false");
		//("#custFlagC").val("false");
	});
  
 $("#stoneSegS").on("change",function(){
	var id	= $("#stoneSegS option:selected").attr('ids');
	getStoneMainCat(id);
});
 
 $("#samStoneSegC").on('change',function(){
	var id	= $("#samStoneSegC option:selected").attr('idE');
	getStoneMainCat(id);
	getHsnCode(id);
});

 $("#custFlagC").on('change',function(){
	 if($("#custFlagC").val() == "false"){
		 $("#handlingChargesC").prop('disabled',true);
	 }else{
		 $("#handlingChargesC").prop('disabled',false);

	 }
 });
 
var getHsnCode = function(segId){
	
	if(typeof segId != "undefined"){
		$.getJSON("/OrderExecution/api/v1/hsnLov?segmentId="+segId,function(data){
			var hsnCodeArr = [];
			hsnCodeArr = data.payload.hsnLov;
			$("#hsnCodeC").empty().append('<option value="" selected>--Select--</option>');
			$.each(hsnCodeArr,function(key,val){
				 $("#hsnCodeC").append('<option value="'+val.id+'">'+val.name + ' ' +  '-' + ' '+ val.description + '</option>');
			})
		})
	}
	
}
var getStoneMainCat = function(segId){
	$("#mainCatS").empty().append('<option value="" selected>--Select--</option>');
	$("#samStoneCatC").empty().append('<option value="" selected>--Select--</option>');
	var solitaireCat = [];
	
	if(typeof segId != "undefined"){
		$.getJSON("/OrderExecution/api/v1/getStoneCategoryByStone?segmentId="+segId,function(data){
			$.each(data.payload.stoneCats,function(k,v){
				if(v.name == "CS" || v.name == "SO"){
					solitaireCat.push(v);
				}
			});
			$.each(solitaireCat,function(key,val){
				$("#mainCatS").append('<option value="'+val.id+'" idMnS="'+val.name+'">'+val.description+'</option>');
				$("#samStoneCatC").append('<option value="'+val.id+'" idMnC="'+val.name+'">'+val.description+'</option>');

			})
		})
	  }
}

$("#mainCatS").on("change",function(){
	var id	= $("#mainCatS").val();
	var segmentDmd=$("#stoneSegS").val();
	getSubCategory(id,segmentDmd);
	
	var stoneSegment = $("#stoneSegS").val();	

	var mainSegment = $("#mainCatS option:selected").attr("idMnS");
	 var segmentId = $("#stoneSegS option:selected").attr("ids");
		if( stoneSegment == "Diamond"){
			if(mainSegment == "CS"){
				$('#fromCostS').prop("disabled",false);
				$('#toCostS').prop("disabled",false);
				
			}else{
				$('#fromCostS').prop("disabled",true);
				$('#toCostS').prop("disabled",true);
			}
			
			var id = $("#mainCatS").val();
			if(id!=""){
				$("#toCosWt").show();
				$("#fromWt").show();
				$("#fromWtId").show();
				$("#toWtId").show();
				$.getJSON("/OrderExecution/api/v1/getWeightRangeByCategory?categoryId="+id,function(data){
					$.each (data.payload.weightRange, function(key, val) {					
						$('#fromWt').append('<option value="' + val.id + '">' + val.id + '</option>');
					});
					$.each (data.payload.weightRange, function(key, val) {
						$('#toCosWt').append('<option value="' + val.name + '">' + val.name + '</option>');
					});
				})
				if(mainSegment =="CS"){
					$("#toCosWt").show();
					$("#fromWt").show();
					$("#fromWtId").show();
					$("#toWtId").show();
				$.getJSON("/OrderExecution/api/v1/costWeightRange?segmentId="+segmentId,function(data){
					$.each (data.payload.FROM_COST_RANGE, function(key, val) {					
					$('#fromCostS').append('<option value="' + val.id + '">' + val.id + '</option>');
				});				
					$.each (data.payload.FROM_COST_RANGE, function(key, val) {
					$('#toCostS').append('<option value="' + val.name + '">' + val.name + '</option>');
				});
			 })
		}
	  }
	} 
});

$("#samStoneCatC").on("change",function(){
	var id	= $("#samStoneCatC").val();
	var segmentDmd=$("#samStoneSegC").val();
	
	if($("#samStoneCatC option:selected").attr("idMnC") == "CS"){
		$("#rateC").prop("disabled",true);
		$("#rateC").val("");
		//$("#packetStockC").val("");
		$("#packetStockC").prop("disabled",false);

	}else{
		$("#rateC").prop("disabled",false);
		$("#packetStockC").val("Stock");
		$("#packetStockC").prop("disabled",true);

	}
	
	getSubCategory(id,segmentDmd);
});

var getSubCategory = function(catId,segm){
	if(catId !=""){
		$("#subCatS").empty().append('<option value="" selected>--Select--</option>');
		$("#subCatC").empty().append('<option value="" selected>--Select--</option>');

		$.getJSON("/OrderExecution/api/v1/getLOVByCategory?categoryId="+catId,function(data){
			if( segm != "Diamond"){
			$.each(data.payload.subcat,function(key,val){
				$("#subCatS").append('<option value="'+val.name+'" idSubS="'+val.id+'">'+val.description+'</option>');
				$("#subCatC").append('<option value="'+val.name+'" idsub="'+val.id+'">'+val.description+'</option>');

			})
		  }else{
			  $.each(data.payload.shape,function(key,val){
				$("#subCatS").append('<option value="'+val.name+'" idSubS="'+val.id+'">'+val.description+'</option>');
				$("#subCatC").append('<option value="'+val.name+'" idsub="'+val.id+'">'+val.description+'</option>');
			})
		  }
	   })
	}
}

$("#subCatS").on("change",function(){
	var stoneSeg = $("#stoneSegS").val();
	$("#stoneCodeS").val( $("#stoneSegS option:selected").attr('idname')+ "" + $("#mainCatS option:selected").attr('idmns') + "" + $("#subCatS").val());
});

$("#subCatC").on("change",function(){
	var stoneSeg = $("#stoneSegS").val();
	$("#articleCodeC").val( $("#samStoneSegC option:selected").attr('idEName')+ "" + $("#samStoneCatC option:selected").attr('idMnC') + "" + $("#subCatC").val());
});

var disabledArray = [];
$("#addRowSam").on("click",function(){
	if(overlap == true){
		 $.growl.error({
				message :"Please delete last row!!" ,
				duration : 10000,
				title : 'Error'
			});
		 return false;
	}
	var rows = $("#jqxgridS").jqxGrid('getrows');
	if(typeof rows != "undefined"){
		if(rowIdStone > 0){
			
			for(var i=0;i<=rows.length;i++){			
				if(rowIdStone == i){
					$("#jqxgridS").jqxGrid("setcellvalue",i,"disableFlagId",false);
					disabledArray.push(rowIdStone);
				}else{
					$("#jqxgridS").jqxGrid("setcellvalue",i,"disableFlagId",true);
				}
			}
			$("#jqxgridS").jqxGrid('addrow',null,generaterowS(rowIdStone));
		}
	}
});

$('#ContinueCreate').on('click', function(){
	var samStoneSegC = $("#samStoneSegC option:selected").attr("ide");
	var samStoneSegVal = $("#samStoneSegC option:selected").val();
	var samRegionC = $("#samRegionC").val();
	var subCatC = $("#subCatC").val();
	var samStoneCatC = $("#samStoneCatC").val();
	var samUomC = $("#samUomC").val();
	var packetStockC = $("#packetStockC").val();
	var reorderC = $("#reorderC").val();
	var custFlagC = $("#custFlagC").val();
	var artcleCretae = $("#artcleCretae").val();
	var rateC = $("#rateC").val();
	
	var mainSegmentSerch = $("#samStoneCatC option:selected").text();
	if(mainSegmentSerch == "Solitaire"){
		 var rateE = $("#rateC").val();
		 if(rateE == "" || rateE == null){
			 $.growl.error({
					message :"Please fill $-Rate field !!" ,
					duration : 10000,
					title : 'Error'
				});
			     return false;
		 }
	 }
	console.log(samStoneSegVal);
	if(samRegionC == null || samRegionC == "" || samStoneSegC == null || samStoneSegC == "" || samStoneCatC == null || samStoneCatC == "" || 
	subCatC == null || subCatC == "" )
	{		  
		$.growl.error({	message :"Please fill all mandatory fields !!" ,duration : 10000,title : 'Error'});
		return false;		
	}else{
		$("#samRegionC").prop("disabled",true);
		$("#samStoneSegC").prop("disabled",true);
		$("#samStoneCatC").prop("disabled",true);
		$("#subCatC").prop("disabled",true);
		$("#samUomC").prop("disabled",true);
		$("#packetStockC").prop("disabled",true);
		$("#reorderC").prop("disabled",true);
		$("#custFlagC").prop("disabled",true);
		$("#rateC").prop("disabled",true);
		
		$("#jqxgridS").jqxGrid('clear');
		var custFlagC = $("#custFlagC").val();
		if(custFlagC == 'false'){
		StoneArticleModalGrid();
		$("#jqxgridS").show();
		 $("#addRowSam").show();
		}else{
		$("#jqxgridS").hide();
		 $("#addRowSam").hide();
		}
		var datarow = generaterowS(0);
	    $("#jqxgridS").jqxGrid('addrow',null,datarow);
	   
	    $("#saveStoneArticle").show();
	}
});

var rowIdStone = 0;
var generaterowS = function (i) {
	var row = {};  
    row["artCode"] = $("#articleCodeC").val();
 	row["artDes"] =  ($("#samStoneSegC").val() == "Diamond") ? $("#samStoneSegC").val()+ " " + $("#samStoneCatC option:selected").text() + " " + $("#subCatC option:selected").text() : $("#samStoneSegC").val()+ " " + $("#samStoneCatC option:selected").text()+ " " + $("#subCatC option:selected").text();
 	row["samUomC"] =  "Cts"	  	
 	row["rapRateCode"] =  "";
 	row["rapRate"] =   "";
 	row["disPerc"] =  "";
	row["prmPerc"] =   "";
 	row["custFlagC"] =   "";
 	row["cp"] =   "";
 	row["rateC"] =  $('#rateC').val();	  	
 	row["clarityC"] =  "";
 	row["colorC"] =   "";
	row["cutC"] =   "";
 	row["actualColorC"] =   "";	  	
 	row["wtRangeC"] =  "";
 	row["fromCostC"] =   "";
 	row["toCostC"] =  "";
	row["cpRate"] =   "";
 	row["tabRefN"] =   "";
 	row['disableFlagId'] = false;
 	row["mupPerc"] =   "";
	row["exchangePerc"] =   "";
 	row["dpPerc"] =  "";
 	row["sp"] =   "";
	row["regionIdC"] =   $("#samRegionC option:selected").text();
 	row["startDate"] =   "";
 	row["endDate"] =   "";	
 	rowIdStone = rowIdStone + 1;
     return row;
 }

var StoneArticleModalGrid = function() {

	var updateRows = function(rowid, newdata, commit) {
	}
	
	var datafields = [
		{ name: 'artCode', type: 'string', },
        { name: 'artDes', type: 'string' },
        { name: 'samUomC', type: 'string' },
        { name: 'rapRateCode', type: 'float' },
        { name: 'rapRate', type: 'float' },
        { name: 'disPerc', type: 'float' },
        { name: 'prmPerc', type: 'string' },
        { name: 'cp', type: 'string'},
        { name: 'rateC', type: 'float' }, 	            
        {name: 'clarityC' , type: 'string'},
        { name: 'colorC', type: 'string' },
        { name: 'cutC', type: 'string' },
        { name: 'actualColorC', type: 'string' },
        { name: 'wtRangeC', type: 'string' },
        { name: 'fromCostC', type: 'float' },
        { name: 'toCostC', type: 'flaot' },
        { name: 'cpRate', type: 'float' },
        { name: 'tabRefN', type: 'float' },
        { name: 'mupPerc', type: 'float' },
        { name: 'exchangePerc', type: 'float' },
        { name: 'dpPerc', type: 'float' },
        { name: 'sp', type: 'float' },
        { name: 'regionIdC', type: 'string' },
        { name: 'startDate', type: 'date' },
        { name: 'endDate', type: 'date' },
        { name: 'disableFlagId', type:'bool'}
		];
	
	var columns = [ 
		
	 	{ text: 'Article Code', datafield: 'artCode',width: '6%', cellsalign : 'center', align:'center',editable: false},
	 	{ text: '', datafield: 'disableFlagId',hidden:true},
       	{ text: 'Article Des', datafield: 'artDes',width: '15%', cellsalign : 'center', align:'center',editable: false },
       	
       	{ text: '', datafield: 'fromWtCostRangeS',width: '15%', cellsalign : 'center', align:'center',editable: false,hidden:true},
       	
       	{ text: '', datafield: 'tocostRangeS',width: '15%', cellsalign : 'center', align:'center',editable: false,hidden:true},
       	
        { text: 'Clarity', datafield: 'clarityC',width: '6%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'clarityN',
       		createeditor: function (row, cellvalue, editor) { 
					var rows = $("#jqxgridS").jqxGrid('getrows');
					var segType = $("#samStoneSegC").val(); 
					 var id = $("#samStoneCatC").val(); 
					var arryData = [];
					if(segType == "Diamond"){
				               if(id != ""){
							       $.getJSON("/OrderExecution/api/v1/getLOVByCategory?categoryId="+id,function(data){
	    	          				var res = data.payload.clarity;
	    	          				
	    	          		  		editor.jqxDropDownList({ source: res, displayMember: 'id', valueMember: 'id'});
	      		  		     });        	          			
				         }
					 }
      	     },
      	   cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
				var rows = $("#jqxgridS").jqxGrid('getrows');
				var wtRange = newvalue.value;
				var articleDesc = ($("#samStoneSegC").val() == "Diamond") ? $("#samStoneSegC").val()+ " " + $("#samStoneCatC option:selected").text() + " " + $("#subCatC option:selected").text() : $("#subCatC option:selected").text();
				$("#jqxgridS").jqxGrid('setcellvalue', row, 'artDes', articleDesc + " " + wtRange);
      	   }, 
      	   cellbeginedit:function(row,columntype,displayfield) {
          		 var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
          		 var segType = $("#samStoneSegC").val();  // this will give you the Segment Description
					 if(segType == "Diamond"){
						 var wtRangeC =  $("#jqxgridS").jqxGrid("getcellvalue" , row, 'wtRangeC');
						 if(wtRangeC == undefined || wtRangeC == null || wtRangeC =="" ){
							 return true;
						 }
     					return false;
 				 }else{			  
     					return false;	
     			}
      	  }
        },{ text: 'Color', datafield: 'colorC',width: '6%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'colorN',
        	createeditor: function (row, cellvalue, editor) { 
					var rows = $("#jqxgridS").jqxGrid('getrows');
				
					var segType = $("#samStoneSegC").val(); 
					 var id = $("#samStoneCatC").val(); 
						if(segType == "Diamond"){
				               if(id != ""){
							       $.getJSON("/OrderExecution/api/v1/getLOVByCategory?categoryId="+id,function(data){
	    	          				var res = data.payload.color;
	    	          				
	    	          		  		editor.jqxDropDownList({ source: res, displayMember: 'id', valueMember: 'id'});
	      		  		     });        	          			
				         }
					 }
      	     },cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
				var rows = $("#jqxgridS").jqxGrid('getrows');
				var clarity = $('#jqxgridS').jqxGrid('getcellvalue', row, 'clarityC');
				var wtRange = newvalue.value;
				var articleDesc = ($("#samStoneSegC").val() == "Diamond") ? $("#samStoneSegC").val()+ " " + $("#samStoneCatC option:selected").text() + " " + $("#subCatC option:selected").text() : $("#subCatC option:selected").text();
				$("#jqxgridS").jqxGrid('setcellvalue', row, 'artDes', articleDesc + " " + clarity + " " + wtRange);
      	   },
      	   cellbeginedit:function(row,columntype,displayfield) {
          		 var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
          		 var segType = $("#samStoneSegC").val();  // this will give you the Segment Description
					 if(segType == "Diamond"){
						 var wtRangeC =  $("#jqxgridS").jqxGrid("getcellvalue" , row, 'wtRangeC');
						 if(wtRangeC == undefined || wtRangeC == null || wtRangeC =="" ){
							 return true;
						 }
     					return false;
 				 }else{			  
     					return false;	
     			}
      	  }
      	     
       },{ text: 'Cut', datafield: 'cutC',width: '6%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'cutN',
    	   createeditor: function (row, cellvalue, editor) { 
					var rows = $("#jqxgridS").jqxGrid('getrows');
					var segType = $("#samStoneSegC").val(); 
				
				    var id = $("#samStoneCatC").val(); 
					if(segType == "Diamond"){
		               if(id != ""){
					       $.getJSON("/OrderExecution/api/v1/getLOVByCategory?categoryId="+id,function(data){
    	          				var res = data.payload.cutGrade;
    	          				
    	          		  		editor.jqxDropDownList({ source: res, displayMember: 'id', valueMember: 'id'});
  		  		     });        	          			
		         }
			 }
     	     },cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
				var rows = $("#jqxgridS").jqxGrid('getrows');
				var clarity = $('#jqxgridS').jqxGrid('getcellvalue', row, 'clarityC');
				var colorC = $('#jqxgridS').jqxGrid('getcellvalue', row, 'colorC');
				var wtRange = newvalue.value;
				var articleDesc = ($("#samStoneSegC").val() == "Diamond") ? $("#samStoneSegC").val()+ " " + $("#samStoneCatC option:selected").text() + " " + $("#subCatC option:selected").text() : $("#subCatC option:selected").text();
				$("#jqxgridS").jqxGrid('setcellvalue', row, 'artDes', articleDesc + " " + clarity + " " + colorC + " " + wtRange);
      	   },
      	   
      	 cellbeginedit:function(row,columntype,displayfield) {
      		 var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
      		 var segType = $("#samStoneSegC").val();  // this will give you the Segment Description
				 if(segType == "Diamond"){
					 var wtRangeC =  $("#jqxgridS").jqxGrid("getcellvalue" , row, 'wtRangeC');
					 if(wtRangeC == undefined || wtRangeC == null || wtRangeC =="" ){
						 return true;
					 }
 					return false;
				 }else{			  
 					return false;	
 			}
  	  }
       },{ text: 'Actual Color', datafield: 'actualColorC',width: '6%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'actualColorN',
    	   createeditor: function (row, cellvalue, editor) { 
  					var rows = $("#jqxgridS").jqxGrid('getrows');
   					var segType = $("#samStoneSegC").val(); 
   				
					    var id = $("#samStoneCatC").val(); 
						if(segType == "Diamond"){
			               if(id != ""){
						       $.getJSON("/OrderExecution/api/v1/getLOVByCategory?categoryId="+id,function(data){
	    	          				var res = data.payload.actualColor;
	    	          				
	    	          		  		editor.jqxDropDownList({ source: res, displayMember: 'id', valueMember: 'id'});
      		  		     });        	          			
			         }
				 }
        	     },
        	     cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
						var rows = $("#jqxgridS").jqxGrid('getrows');
						var cut = $('#jqxgridS').jqxGrid('getcellvalue', row, 'cutC');
						var clarity = $('#jqxgridS').jqxGrid('getcellvalue', row, 'clarityC');
					var colorC = $('#jqxgridS').jqxGrid('getcellvalue', row, 'colorC');
					var wtRange = newvalue.value;
					var articleDesc = ($("#samStoneSegC").val() == "Diamond") ? $("#samStoneSegC").val()+ " " + $("#samStoneCatC option:selected").text() + " " + $("#subCatC option:selected").text() : $("#subCatC option:selected").text();
					$("#jqxgridS").jqxGrid('setcellvalue', row, 'artDes', articleDesc + " " + clarity + " " + colorC + " " + cut + " " + wtRange);
           	   },
           	cellbeginedit:function(row,columntype,displayfield) {
         		 var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
         		 var segType = $("#samStoneSegC").val();  // this will give you the Segment Description
					 if(segType == "Diamond" && mainSegment == "CS"){
						 var wtRangeC =  $("#jqxgridS").jqxGrid("getcellvalue" , row, 'wtRangeC');
						 if(wtRangeC == undefined || wtRangeC == null || wtRangeC =="" ){
							 return true;
						 }
     					return false;
 				 }else{			  
     					return false;	
     			}
     	  }
       },{ text: 'Wt Range', datafield: 'wtRangeC',width: '6%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'wtRangeN',
    	   createeditor: function (row, cellvalue, editor) { 
  					var rows = $("#jqxgridS").jqxGrid('getrows');
  					var arryData = [];
  					var mainSegment = $("#samStoneSegC option:selected").attr("idMnC");
  					var segType = $("#samStoneSegC").val();	
  				    var id = $("#samStoneCatC").val();  
  					if(segType == "Diamond"){
        				 if(mainSegment == "SO"){
        					 var id = $("#samStoneCatC").val(); 
     				               if(id != ""){
     							       $.getJSON("/OrderExecution/api/v1/getLOVByCategory?categoryId="+id,function(data){
     		    	          				var res = data.payload.weightSlab;
     		    	          		  		editor.jqxDropDownList({ source: res, displayMember: 'description', valueMember: 'description'});
     	      		  		        });        	          			
     				           }
        			  }else {
 					     if(id!=""){
  								$.getJSON("/OrderExecution/api/v1/getWeightRangeByCategory?categoryId="+id,function(data){
									var res = data.payload.weightRange;
    	          		  		editor.jqxDropDownList({ source: data.payload.weightRange , displayMember: 'description', valueMember: 'description'});
  						 })
					     }
 			     }
  		      }
       },
       cellbeginedit:function(row,columntype,displayfield) {
    		 var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
    		 var segType = $("#samStoneSegC").val();  // this will give you the Segment Description
    		 var disableFlagId =  $("#jqxgridS").jqxGrid("getcellvalue" , row, 'disableFlagId');
			 if(segType == "Diamond"){
				if(disableFlagId == true){
					return false;
			     }
				 return true;
			 }else{			  
					return false;	
			}
	  },
       cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
			var rows = $("#jqxgridS").jqxGrid('getrows');
			var clarity = $('#jqxgridS').jqxGrid('getcellvalue', row, 'clarityC');
			var colorC = $('#jqxgridS').jqxGrid('getcellvalue', row, 'colorC');
			var cut = $('#jqxgridS').jqxGrid('getcellvalue', row, 'cutC');
			var actualColorC = $('#jqxgridS').jqxGrid('getcellvalue', row, 'actualColorC');
			var fromWt = $('#jqxgridS').jqxGrid('getcellvalue', row, 'fromCostN');
			var ToWt = $('#jqxgridS').jqxGrid('getcellvalue', row, 'toCostN');
			var segm = $("#samStoneSegC").val();
			var samStoneCatC = $("#samStoneCatC option:selected").text();
			
			var wtRange = newvalue.value;
			if(segm == "Diamond"){
				if(samStoneCatC == "CD Solitaire" ){
					checkWeightRangeForColorDiamond(overlap, cut, clarity, colorC, actualColorC,fromWt,ToWt,wtRange, msg, rows );
				}else{
					 checkWeightRange(overlap, cut, clarity, colorC, actualColorC, wtRange, msg, rows);
				}
			}
			var articleDesc = (segm == "Diamond") ? segm + " " + $("#samStoneCatC option:selected").text() + " " + $("#subCatC option:selected").text() : $("#subCatC option:selected").text();
			$("#jqxgridS").jqxGrid('setcellvalue', row, 'artDes', articleDesc + " " + clarity + " " + colorC + " " + cut + " " + actualColorC + " " + wtRange);
 	   }
       },{ text: 'UQC', datafield: 'samUomC',width: '5%',  cellsalign : 'center', align:'center',editable: false},
       { text: 'DIS %', datafield: 'disPerc', width: '5%',  cellsalign : 'right', align:'center',editable: true,
    	   cellsformat : 'd2',
			   columntype : 'numberinput',
       	   createeditor : function(row, cellvalue, editor) {
				editor.jqxNumberInput({
					spinButtons : false,
					decimalDigits : 2
				});
			},
    	   cellbeginedit:function(row,columntype,displayfield) {
    		    
    		   var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
       		   var segType = $("#samStoneSegC").val();  // this will give you the Segment Description
				    if(mainSegment == "SO"){ 
					 var disPer = $('#jqxgridS').jqxGrid('getcellvalue', row, 'disPerc');
	           		 var prePer = $('#jqxgridS').jqxGrid('getcellvalue', row, 'prmPerc');
	           		 
	   		           	if(prePer == ""){
	     					return true;
	 				   }else{			  
	     					return false;	
	     			    }
				      }else{	
				    	   
     					return false;	
     			  }
    	     }
  	   },
      
       { text: 'Prm %', datafield: 'prmPerc', width: '5%',  cellsalign : 'right', align:'center',
  		  editable: true,
  		  cellsformat : 'd2',
		  columntype : 'numberinput',
    	  createeditor : function(row, cellvalue, editor) {
				editor.jqxNumberInput({
					spinButtons : false,
					decimalDigits : 2
				});
			},
      		cellbeginedit:function(row,columntype,displayfield) {
      			
      			
      			 var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
         		 var segType = $("#samStoneSegC").val();  // this will give you the Segment Description
					 if(mainSegment == "SO"){
						 var disPer = $('#jqxgridS').jqxGrid('getcellvalue', row, 'disPerc');
		           		 var prePer = $('#jqxgridS').jqxGrid('getcellvalue', row, 'prmPerc');
		           		
		 					 if(disPer == ""){
		        					return true;
		    				 }else{			  
		        					return false;	
		        			      }
				 }else{			  
     					return false;	
     			      }
      		}
    },         

       { text: 'RAP Rate Code', datafield: 'rapRateCode', width: '5%',  cellsalign : 'center', align:'center',editable: true,
    	cellsformat : 'd2',
		columntype : 'numberinput',
    	 createeditor : function(row, cellvalue, editor) {
				editor.jqxNumberInput({
					spinButtons : false,
					decimalDigits : 2
				});
			},
    	cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
         		 var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
         		 var segType = $("#samStoneSegC").val(); 
         		 var rows = $("#jqxgridS").jqxGrid('getrows');
				 var disPer = $('#jqxgridS').jqxGrid('getcellvalue', row, 'disPerc');
	         	 var prePer = $('#jqxgridS').jqxGrid('getcellvalue', row, 'prmPerc');
					if(mainSegment == "SO"){ 
						
						         
					         	 var rapRate = $('#rateC').val();
								if(rows[row].prmPerc){
			         						var fieldFilterS = {
			         								  "fieldFilters": {
			         									 "dolarprice": parseFloat(rapRate),
			         									"rapcode":(newvalue),
			         									"disOrPrm":"PRM",
			         									"disOrPrmPercent":(prePer==null)?0:prePer
			         									}
			         								} 
								}else{
									var fieldFilterS = {
	         								  "fieldFilters": {
	         									 "dolarprice": parseFloat(rapRate),
	         									"rapcode":(newvalue),
	         									"disOrPrm":"DIS",
	         									"disOrPrmPercent":(disPer== null)?0:disPer
	         									}
	         								} 
								}
				  			    postJSON('/OrderExecution/api/v1/calculateSolitarePrice', JSON.stringify(fieldFilterS), function(data) {         					          				
				  			    	var res1 = data.payload;  
				  			        $("#jqxgridS").jqxGrid("setcellvalue" , row, 'cpRate', res1.SellingPrice);
				  			    	$("#jqxgridS").jqxGrid("setcellvalue" , row, 'cp', res1.cpPct);
				  			    }); 
					}	
					
					var rapRate$ = newvalue *100;
					$("#jqxgridS").jqxGrid("setcellvalue" , row, 'rapRate', rapRate$); 
		        },
		       
		        cellbeginedit:function(row,columntype,displayfield) {
             		 var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
             		 var segType = $("#samStoneSegC").val();  // this will give you the Segment Description
 					 if(mainSegment == "SO"){
        					return true;
    				 }else{			  
        					return false;	
        			}
         	  }
       },
       { text: 'RAP Rate in $', datafield: 'rapRate', width: '5%',  cellsalign : 'right', align:'center',editable: false,cellsformat : 'd2'},
       { text: 'CP P.CT Rate in $', datafield: 'cp', width: '5%',  cellsalign : 'right', align:'center',editable: false,cellsformat : 'd2'},
       { text: '$-Rate', datafield: 'rateC',width: '5%', cellsalign : 'right', align:'center',editable: false,cellsformat : 'd2'
    	   
       },
       { text: 'From Cost', datafield: 'fromCostC',width: '5%', cellsalign : 'right', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'fromCostN',
    	   createeditor: function (row, cellvalue, editor) { 
 					var rows = $("#jqxgridS").jqxGrid('getrows');         					
 					var segType = $("#samStoneSegC").val();  // this will give you the Segment Description
 					var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
 					editor.on('click',function(event) {
 					if (segType == "Diamond"){
 						if(mainSegment == "CS"){
 							var id = $("#samStoneSegC option:selected").attr("idE");
 								$.getJSON("/OrderExecution/api/v1/costWeightRange?segmentId=" + id, function(data) {
		    	          				var res = data.payload.FROM_COST_RANGE;
		    	          		  		editor.jqxDropDownList({ source: res , displayMember: 'id', valueMember: 'description'});
 	      		  		        });
 						}
 					 }
 					});
       	     },
			 
       	  cellbeginedit:function(row,columntype,displayfield) {
       		var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
       		var segType = $("#samStoneSegC").val();  // this will give you the Segment Description
       		
			if(segType == "Diamond"){
				 if(mainSegment == "CS")
				 { 
				    var disableFlagId =  $("#jqxgridS").jqxGrid("getcellvalue" , row, 'disableFlagId');
		       		if(disableFlagId == true){
						return false;
					}else{
						return true;
					}
					return true;
				}else
				{			  
					return false;	
				}
			  }
			},
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				 var rows = $("#jqxgridS").jqxGrid('getrows');
				 var segType = $("#samStoneSegC").val();
				 var toWtS =  $("#jqxgridS").jqxGrid("getcellvalue" , row, 'toCostN');
				 var msg = null;
				 if(segType == "Diamond"){
					    var clarity = $('#jqxgridS').jqxGrid('getcellvalue', row, 'clarityC');
						var colorC = $('#jqxgridS').jqxGrid('getcellvalue', row, 'colorC');
						var cut = $('#jqxgridS').jqxGrid('getcellvalue', row, 'cutC');
						var actualColorC = $('#jqxgridS').jqxGrid('getcellvalue', row, 'actualColorC');
						var fromWt = $('#jqxgridS').jqxGrid('getcellvalue', row, 'fromCostN');
						var wtRange = $('#jqxgridS').jqxGrid('getcellvalue', row, 'wtRangeN');
						var ToWt = $('#jqxgridS').jqxGrid('getcellvalue', row, 'toCostN');
						var samStoneCatC = $("#samStoneCatC option:selected").text();
						
					if(samStoneCatC == "CD Solitaire" ){
						checkWeightRangeForColorDiamond(overlap, cut, clarity, colorC, actualColorC,newvalue.label,ToWt,wtRange, msg, rows );
					}
				}
			},
        },{ text: 'To Cost', datafield: 'toCostC',width: '5%', cellsalign : 'right', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'toCostN',
        	createeditor: function (row, cellvalue, editor) { 
					var rows = $("#jqxgridS").jqxGrid('getrows');
					var segType = $("#samStoneSegC").val(); 
					var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
					 
					 if (segType == "Diamond"){
      						if( mainSegment == "CS"){
     							var id = $("#samStoneSegC option:selected").attr("idE");
     							if(id!=""){
     								$.getJSON("/OrderExecution/api/v1/costWeightRange?segmentId=" + id, function(data) {
			    	          				var res = data.payload.FROM_COST_RANGE;
			    	          		  		editor.jqxDropDownList({ source: res , displayMember: 'name', valueMember: 'name'});
     	      		  		        });
     						    }
     						}
     					 }
           	     },
          	    cellbeginedit:function(row,columntype,displayfield) {
          		 var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
          		 var segType = $("#samStoneSegC").val();  // this will give you the Segment Description
					 if(segType == "Diamond"){
							 if(mainSegment == "CS")
							 { 
								 var disableFlagId =  $("#jqxgridS").jqxGrid("getcellvalue" , row, 'disableFlagId');
						       		if(disableFlagId == true){
										return false;
									}else{
										return true;
									}
									return true;
							 }else
							 {			  
									return false;	
							}
			        }
         },
         cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {		
        	 var rows = $("#jqxgridS").jqxGrid('getrows');
				 var segType = $("#samStoneSegC").val(); 
				 var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
				 var fromWtS =  $("#jqxgridS").jqxGrid("getcellvalue" , row, 'fromCostN');
				  if( parseFloat(fromWtS) > parseFloat(newvalue.value)){
						 $.growl.error({
							message :"From Cost Range Should be Less then To Cost Range!!" ,
							duration : 10000,
							title : 'Error'
						});
					     return "";
				  }
					 if (segType == "Diamond"){
						 if(mainSegment == "CS"){
  		  		    	 $("#jqxgridS").jqxGrid("setcellvalue" , row, 'cpRate', newvalue);      					
						 }
					 }
					 if(segType == "Diamond"){
						    var clarity = $('#jqxgridS').jqxGrid('getcellvalue', row, 'clarityC');
							var colorC = $('#jqxgridS').jqxGrid('getcellvalue', row, 'colorC');
							var cut = $('#jqxgridS').jqxGrid('getcellvalue', row, 'cutC');
							var actualColorC = $('#jqxgridS').jqxGrid('getcellvalue', row, 'actualColorC');
							var fromWt = $('#jqxgridS').jqxGrid('getcellvalue', row, 'fromCostN');
							var wtRange = $('#jqxgridS').jqxGrid('getcellvalue', row, 'wtRangeN');
							var ToWt = $('#jqxgridS').jqxGrid('getcellvalue', row, 'toCostN');
							var samStoneCatC = $("#samStoneCatC option:selected").text();
							
						if(samStoneCatC == "CD Solitaire" ){
							checkWeightRangeForColorDiamond(overlap, cut, clarity, colorC, actualColorC,fromWt,newvalue.value,wtRange, msg, rows );
						}
					}
				 $("#jqxgridS").jqxGrid("setcellvalue" , row, 'cpRate', newvalue.value);	  
   		   }
        }, { text: 'CP (p.ct./p.gm./p.pc.) in Rs.', datafield: 'cpRate', width: '5%',  cellsalign : 'right', align:'center',editable: true,cellsformat : 'd2',
			columntype : 'numberinput',
        	createeditor : function(row, cellvalue, editor) {
				editor.jqxNumberInput({
					spinButtons : false,
					decimalDigits : 2
				});
			},
        	
         cellbeginedit:function(row,columntype,displayfield) {
 		 var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
 		 var segType = $("#samStoneSegC option:selected").text(); 
		     if (mainSegment == "SO"){ 
		         	  return false;
		     }else if(mainSegment == "CS" ){			  
	    			  return true;	
	    	 }else{
	    		 return true;
	    	 }
        },
        },{ text: 'Tab Ref', datafield: 'tabRefC',width: '5%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'tabRefN',cellsformat:'d2',
        	createeditor: function (row, cellvalue, editor) { 
 					var rows = $("#jqxgridS").jqxGrid('getrows');         					
 					var segType = $("#samStoneSegC").val();  // this will give you the Segment Description
 					
 					for(var i=0; i<rows.length; i++){
 						if(row == rows[i].boundindex){         							
 							var id = $("#samStoneSegC option:selected").attr("idE");
 							if(id!=""){
 								$.getJSON("/OrderExecution/api/v1/getStoneMupBysegment?segmentId=" + id, function(data) {
		    	          				var res = data.payload.tableRef;
		    	          		  		editor.jqxDropDownList({ source: res , displayMember: 'id', valueMember: 'name'});
 	      		  		        });
 							  }
 						   }
 					    }
       	     },
       	  cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {		
       		 var rows = $("#jqxgridS").jqxGrid('getrows');
       		$("#jqxgridS").jqxGrid("setcellvalue" , row, 'mupPerc', newvalue);  
       	   }
        },{ text: 'MUP %', datafield: 'mupPerc', width: '5%',  cellsalign : 'right', align:'center',editable: true,
        	/*
        	 cellbeginedit:function(row,columntype,displayfield) {
         		 var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
         		 var segType = $("#samStoneSegC option:selected").text(); 
        	     if(segType== "Diamond"|| segType== "Precious Stones" || segType == "Other Stones")
        					 { 
        						 var rows = $("#jqxgridS").jqxGrid('getrows');
        						 var mupPer = $('#jqxgridS').jqxGrid('getcellvalue', row, 'mupPerc');
        			         	 var cpRate = $('#jqxgridS').jqxGrid('getcellvalue', row, 'cpRate');
        	         						var fieldFilterS = {
        	         								  "fieldFilters": {
        	         									    "cp": parseFloat(cpRate),
        	         									   "mup":mupPer
        	         									}
        	         								}    
        		  			    postJSON('/OrderExecution/api/v1/calculateSellingPrice', JSON.stringify(fieldFilterS), function(data) {         					          				
        		  			    	var res1 = data.payload;  
        		  		  					$("#jqxgridS").jqxGrid('setcellvalue', row, 'sp', res1.SellingPrice);
        		  			    }); 
        	         	     return false;
        	          }else{	
            					return true;	
            			}
                },*/
        },{ text: 'SP (p.ct./p.gm.p.pc) in Rs', datafield: 'sp',width: '5%', cellsalign : 'right', align:'center',editable: true,cellsformat : 'd2',
        	columntype : 'numberinput',
       	    createeditor : function(row, cellvalue, editor) {
				editor.jqxNumberInput({
					spinButtons : false,
					decimalDigits : 2
				});
			},
        },{ text: 'Exchange %', datafield: 'exchangePerc', width: '5%',  cellsalign : 'right', align:'center',editable: true,
        	cellsformat : 'd2',
			columntype : 'numberinput',
        	createeditor : function(row, cellvalue, editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						decimalDigits : 2
					});
				},
        },{ text: 'DP %', datafield: 'dpPerc', width: '5%',  cellsalign : 'right', align:'center',editable: true,
        	cellsformat : 'd2',
			columntype : 'numberinput',
        	createeditor : function(row, cellvalue, editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						decimalDigits : 2
					});
				},
        },{ text: 'Region Id', datafield: 'regionIdC',width: '5%', cellsalign : 'center', align:'center',editable: false
        },{ text: 'Start Date',
        	datafield: 'startDate',
        	width: '5%', 
        	cellsalign : 'center', 
        	align:'center',
        	editable: true,
        	columntype: 'datetimeinput',
        	cellsformat : 'dd/MM/yyyy',
        },
        { text: 'End Date',
        	datafield: 'endDate',
        	width: '5%', 
        	cellsalign : 'center', 
        	align:'center',
        	editable: true,
        	columntype : 'datetimeinput',
			cellsformat : 'dd/MM/yyyy',
			sortable : false,
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue, event) {
				var date = new Date();
				var startDate = $("#jqxgridS").jqxGrid('getcellvalue', row, 'startDate');
				if (newvalue >= startDate) {
						return newvalue;
					} else {
						$.growl.error({
							message : "End date should not be less than start date.",
							duration : 3000,
							title : 'Error'
						});
						return "";
					}
			  },
            },
			{text : 'Action',datafield : 'Delete','width' : '5%',cellsalign : 'center',align:'center',columntype : 'button',
				cellsrenderer : function() {
				return "Delete";
			},
			buttonclick : function(row) {
				overlap = false;
				id = $("#jqxgridS").jqxGrid('getrowid', row);
				$("#jqxgridS").jqxGrid('deleterow', id);		
			}		
	}];
	
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	 addGrid(datafields,columns,updateRows, "",addrow,'#jqxgridS');
}

var overlap = false;
var msg = null
var checkWeightRangeForColorDiamond = function(overlap, cutGrade, clarity, color, actualColor,fromWt,ToWt, weightRange,msg, array){
	if (weightRange != null && weightRange !=undefined) {
		var fromCost = fromWt == undefined ? null : fromWt;
		var toCost = ToWt == undefined ? null : ToWt;
		if (null != fromWt && null != ToWt && 1 < array.length) {
			overlap = overlapFunctionTwoVariablesCD(fromCost, toCost,weightRange,cutGrade, clarity,color, actualColor,array.length - 1, array);
		} else {
			overlap = overlapFunctionOneVariablesCD(null != fromWt ? fromWt : ToWt,weightRange,cutGrade, clarity,color, actualColor,array.length - 1, array);
		}
	 }
	 if(overlap){
		return false;
	 }
}


var globalFlag = true;
var overlapFunctionOneVariablesCD = function(x,wt,cutGrade, clarity,color, actualColor,n, a){
	var i;
	overlap = false;
	for (i = 0; i < n; i++) {
		if (null != a[i].fromCostC && null != a[i].toCostC && undefined != a[i].fromCostC  && undefined != a[i].fromCostC){
			if (x >= parseFloat(a[i].fromCostC) && x <= parseFloat(a[i].toCostC) && wt == a[i].wtRangeN &&
					cutGrade == a[i].cutC && clarity == a[i].clarityC && color == a[i].colorC && actualColor == a[i].actualColorC) {
					overlap = true;
					$.growl.error({
						message : "Overlapping Exists",
						duration : 10000,
						title : 'Error'
					});
					break;
			   }
		  } else {
			break;
		}
	}
	return overlap;
}

var checkWeightRange = function(overlap, cutGrade, clarity, color, actualColor, weightRange, msg, array){
	if (weightRange != null && weightRange !=undefined) {
		overlap = overlapWeightRange(cutGrade, clarity, color, actualColor, weightRange, array.length, array);
	}
	if (overlap) {
		return false;
	}
	
}

var overlapWeightRange = function(cutGrade, clarity, color, actualColor, weightRange, n, a) {
	var i;
	overlap = false;
	for (i = 0; i < n; i++) {
			if (cutGrade == a[i].cutC && clarity == a[i].clarityC && color == a[i].colorC && actualColor == a[i].actualColorC
					 && weightRange == a[i].wtRangeC) {
				overlap = true;
				$.growl.error({
					message : "Weight Range is overlapping",
					duration : 10000,
					title : 'Error'
				});
				break;
			}
	}
	return overlap;
}
  
var saveArticleMasterRecords = function() {
	
	var stoneArtMaster = [];
	var rows = $('#jqxgridS').jqxGrid('getrows');
	var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
	var segType = $("#samStoneSegC").val(); 
	
	if (typeof rows != "undefined") {
    for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
	
        	if(rows.length > 1){
        	    var filterednames = rows.filter(function(obj) {
        	    	
        	    if(segType== "Diamond"){
	        	    	if(mainSegment == "CS"){
				        	    return (obj.actualColorC === row.actualColorC ) && (obj.clarityC  == row.clarityC) && (obj.colorC  == row.colorC)
				        	    && (obj.cutC  == row.cutC) && (obj.fromCostC === row.fromCostC ) && (obj.wtRangeC === row.wtRangeC ) 
				        	    && (obj.toCostC === row.toCostC );
	        	    	}else{
	        	    		 return (obj.actualColorC === row.actualColorC ) && (obj.clarityC  == row.clarityC) && (obj.colorC  == row.colorC)
	        	    		  && (obj.cutC  == row.cutC) && (obj.wtRangeC === row.wtRangeC ) ;
	        	    	 }
        	    }
        	});
        	if(filterednames.length >  1){
        		$.growl.error({
					message : "Duplicate records are Exists",
					duration : 10000,
					title : 'Error'
				});
        		return false;
	         }	      
	       }
        	
        	if(mainSegment == "CS"){
        		if((row.fromCostN) == "" || (row.fromCostN) == null ||  (row.toCostC) == "" ||  (row.toCostC) == null){
    				 $.growl.error({
    					message :"From Cost and To Cost Range should not be Empty!!" ,
    					duration : 10000,
    					title : 'Error'
    				});
    				return false;
    			 }
        	}
        	
           if(parseFloat(row.fromCostN) > parseFloat(row.toCostC)){
				 $.growl.error({
					message :"From Cost Range Should be Less then To Cost Range!!" ,
					duration : 10000,
					title : 'Error'
				});
				return false;
			 }
         if((row.cpRate) == null || (row.cpRate) == ""){
				 $.growl.error({
					message :"Please enter CP!!" ,
					duration : 10000,
					title : 'Error'
				});
				return false;
			 }
    	 if((row.sp) == null || (row.sp) == ""){
          		 $.growl.error({
   					message :"Please enter SP!!" ,
   					duration : 10000,
   					title : 'Error'
   				});
   				return false;
          	}
		var exchangePerc = (row.exchangePerc);
		var dpPerc = (row.dpPerc);
		if(row.tabRefN == "" || row.tabRefN == null){
			 $.growl.error({
					message :"Please fill Table Ref field !!" ,
					duration : 10000,
					title : 'Error'
				});
			     return false;
	    }
		
		/*if(exchangePerc === ""){
			$.growl.error({
				message :"Please fill Exchange % field !!" ,
				duration : 10000,
				title : 'Error'
			});
		     return false;
		}
		
		if((dpPerc === "")){
			$.growl.error({
				message :"Please fill DP % field !!" ,
				duration : 10000,
				title : 'Error'
			});
		     return false;
		}*/
		if( row.startDate == "" || row.startDate == null){
				 $.growl.error({
						message :"Please fill Start Date field !!" ,
						duration : 10000,
						title : 'Error'
					});
				     return false;
		}
		if(row.endDate == "" || row.endDate == null){
				 $.growl.error({
						message :"Please fill End Date field !!" ,
						duration : 10000,
						title : 'Error'
					});
				     return false;
		}
		
		var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
			 if(mainSegment == "SO"){
				 if(row.rapRateCode == "" || row.rapRateCode == null){
					 $.growl.error({
							message :"Please fill RapRate Code field !!" ,
							duration : 10000,
							title : 'Error'
						});
					     return false;
			       } 
			    }
	}
	}
	if (typeof rows != "undefined") {
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		var segType = $("#samStoneSegC").val();
		var mainSegment = $("#samStoneCatC option:selected").attr("idMnC");
		var custFlagC = $("#custFlagC").val();
		if(custFlagC == 'false'){
		if(mainSegment == "CS"){
		stoneArtMaster.push({
			  "cut": row.cutN,
		      "color": row.colorN,
		      "clarity": row.clarityC,
		      "psOrOs":($("#samStoneSegC option:selected").text() == "Precious Stones") ? "os" : "ps",
		      "colorDiamond":((mainSegment == "CS")) ? "cd" : "ps",
		      "actualColor": row.actualColorC,
		      "articleDescription": row.artDes,
		      "slab": row.wtRangeC,
		      "isActive": false,
		      "sellingRate":  row.sp,
		      "directPurchasePercentage": row.dpPerc,
		      "exchangePercentage": row.exchangePerc,
		      "rapRate": row.rapRateCode,
		      "rapRateInDollar":row.rapRate,
		      "dis":row.disPerc,
		      "prm": row.prmPerc,
		      "pCtRateInDollars": parseInt(row.cp), 
		      "rateInDollar": row.rateC,
		      "costPriceInRs": row.cpRate,
		      "sp_tab_ref": row.tabRefN,
		      "mup_perc": row.mupPerc,
		      "colordiamondCostSlab":row.fromCostN +"-"+ row.toCostN,
		      "startDate" : row.startDate,
		      "enddate" : row.endDate
		});
	}else{
		stoneArtMaster.push({
			  "cut": row.cutN,
		      "color": row.colorN,
		      "clarity": row.clarityC,
		      "psOrOs":($("#samStoneSegC option:selected").text() == "Precious Stones") ? "os" : "ps",
		      "colorDiamond":((mainSegment == "CS")) ? "cd" : "ps",
		      "actualColor": row.actualColorC,
		      "articleDescription": row.artDes,
		      "slab": row.wtRangeC,
		      "isActive": false,
		      "sellingRate":  row.sp,
		      "directPurchasePercentage": row.dpPerc,
		      "exchangePercentage": row.exchangePerc,
		      "rapRate": row.rapRateCode,
		      "rapRateInDollar":row.rapRate,
		      "dis":row.disPerc,
		      "prm": row.prmPerc,
		      "pCtRateInDollars": parseInt(row.cp), 
		      "rateInDollar": row.rateC,
		      "costPriceInRs": row.cpRate,
		      "sp_tab_ref": row.tabRefN,
		      "mup_perc": row.mupPerc,
		      "startDate" : row.startDate,
		      "enddate" : row.endDate
		});
	}
	}else{
		stoneArtMaster.push({})
		}
	  }
	}
    var segment = $("#samStoneSegC").val();
    if(segment == "Diamond"){
	var stoneArtDetails = {
			  "isActive": true,
			  "isCustomerStone":($("#custFlagC option:selected").val() == "true") ? true : false,
			  "stoneCode": $("#articleCodeC").val(),
			  "uom": $("#samUomC").val(),
			  "custHandlingCharges": $("#handlingChargesC").val(),
			  "segment": {
			    "id": $("#samStoneSegC option:selected").attr('ide'),
			  },
			  "business": {
				  "id": "1"
			  },
			  "category": {
			    "id": $("#samStoneCatC").val()
			  },
			  "hMasterDTO": {
				    "id": $("#hsnCodeC").val()
			   },
			  "shape": {
				    "shapeId": $("#subCatC option:selected").attr('idsub')
				  },
			  "packetStock":($("#packetStockC").val() == "" || $("#packetStockC").val() == null) ? null : $("#packetStockC").val(),
			  "isReOrder": ($("#reorderC option:selected").val() == "true")  ? true : false,
			  "region": {
			    "id": $("#samRegionC").val()
			  },
			  
			  "stoneDetail":stoneArtMaster
	}
	return stoneArtDetails;
   }
}

$("#saveSolitaireStone").on("click",function(){
	trimmer();
	if(overlap == true){
		 $.growl.error({
				message :"Please delete last row!!" ,
				duration : 10000,
				title : 'Error'
			});
		 return false;
	}
	var stoneDetails = saveArticleMasterRecords();
	console.log(stoneDetails);
	if (stoneDetails) {
		postJSON('/OrderExecution/api/v1/createSolitaireStoneMaster',JSON.stringify(stoneDetails),function(data) {
			if (data.resCode == "1") {										
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});		
				$('#createStoneArticleMaster').modal('hide');
				$('form').trigger("reset");
				  $("#jqxgrid").jqxGrid('clear');
				  $("#jqxgrid").hide();
			} else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
				});										
			}
	 });
}	
});

//############################## Search Solitaire Stone Master ################################
//###################################################### Stone Article Master Field Filters #####################################

var stoneArticleMasterFieldFilters = function() {
    var fromDateS = $("#fromDateS").val();
    var toDateS = $('#toDateS').val();
	var samRegionS = $('#samRegionS').val();
	var stoneIDS = $('#stoneIDS').val();
	var stoneSegS = $('#stoneSegS option:selected').attr("ids");
	var mainCatS = $('#mainCatS ').val();	
	var subCatS = $('#subCatS option:selected').attr("idSubS");
	var statusS = $('#statusS').val();
	
	var fromCostS = $('#fromCostS ').val();	
	var toCostS = $('#toCostS').val();	
	
	var packetStkS = $('#packetStkS').val();	
		
	var fromWt = $('#fromWt ').val();	
	var toCosWt = $('#toCosWt').val();	
		
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (packetStkS != "" && packetStkS != null) {
		fieldFilters.fieldFilters["packetOrStock"] = packetStkS;
	}
	if (samRegionS != "" && samRegionS != null) {
		fieldFilters.fieldFilters["region"] = parseInt(samRegionS);
	}
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = (fromDateS);
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = (toDateS);
	}
	if (stoneSegS != "" && stoneSegS != null) {
		fieldFilters.fieldFilters["segment"] = parseInt(stoneSegS);
	}
	if (mainCatS != "" && mainCatS != null) {
		fieldFilters.fieldFilters["stonecategory"] = parseInt(mainCatS);
	}
	var stoneSegSearch = $("#stoneSegS").val();
	
	if(stoneSegSearch == "Diamond"){
		
		if (subCatS != "" && subCatS != null) {
			fieldFilters.fieldFilters["shape"] = parseInt(subCatS);
		}
		
	}else{
		
		if (subCatS != "" && subCatS != null) {
			fieldFilters.fieldFilters["subcategory"] = parseInt(subCatS);
		}
	}
	
	if (stoneIDS != "" && stoneIDS != null) {
		fieldFilters.fieldFilters["stone"] = parseInt(stoneIDS);
	}
	if (fromCostS != "" && fromCostS != null) {
		fieldFilters.fieldFilters["frmcost"] = (fromCostS);
	}
	if (toCostS != "" && toCostS != null) {
		fieldFilters.fieldFilters["todmndcost"] = (toCostS);
	}
	if (fromWt != "" && fromWt != null) {
		fieldFilters.fieldFilters["fromwtCostRange"] = fromWt;
	}
	if (toCosWt != "" && toCosWt != null) {
		fieldFilters.fieldFilters["toCost"] = toCosWt;
	}
	/*if (statusS != "" && statusS != null) {
		fieldFilters.fieldFilters["status"] = statusS == "True" ? true : false;
	}*/
	return fieldFilters;
}

//Stone Article Master Search grid

function stoneArticleMasterSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'id','type' : 'int','map':'stonId'},
		{'name' : 'region','type' : 'String','map': 'region>name'},
		{'name' : 'shape','type' : 'String','map': 'shape>description'},
		{'name' : 'stoneSeg','type' : 'string','map': 'segment>description'}, 
		{'name' : 'stoneSegId','type' : 'string','map': 'segment>stoneSegmentId'}, 
		{'name' : 'mainCat','type' : 'string','map': 'category>description'},
		{'name' : 'subCat','type' : 'string','map': 'subCategory>description'}, 
		{'name' : 'stoneCode','type' : 'string'}, 
		{'name' : 'isActive','type' : 'string'},
		{'name' : 'stonId','type' : 'int'}
		];

	var columns = [
		//{'text' : '','datafield' : 'stonId',hidden : true},
		{'text' : 'Region','datafield' : 'region','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Stone Segment','datafield' : 'stoneSeg','width' : '20%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Main Category','datafield' : 'mainCat','width' : '16%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Sub Category','datafield' : 'subCat','width' : '16%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Shape','datafield' : 'shape','width' : '14%',sortable : true,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Stone Code',	'datafield' : 'stoneCode','width' : '15%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
		{'text' : 'Status','datafield' : 'isActive',sortable : false,editable : false,cellsalign : 'center',
			
			align : 'center',sortable : false,'width' : '10%',
			cellsrenderer : function (row, columnfield, value) {
				 var rows = $("#jqxgrid").jqxGrid('getrows');
			 for(var i=0; i<rows.length; i++){
		         if(row == rows[i].boundindex){
				if(rows[i].isActive  == true){
					return '<div style="margin-top:7%; margin-left:30%;">'
					+ "Active" + '</div>';
				}else{
					return '<div style="margin-top:7%; margin-left:30%;">'
					+ "In-Active" + '</div>';
				}		
			}}}, 
		},
		
		{'text' : '','datafield' : 'stonId',editable : false,cellsalign : 'center',	cellsrenderer : stoneArtMasterEdit,	align : 'center',sortable : false,'width' : '3%'}
		];

	showMyGrid(datafields, "/OrderExecution/api/v1/searchSolitaireStoneMaster", "list",columns, stoneArticleMasterFieldFilters(), updateRows, "");
	$("#jqxgrid").jqxGrid({	
		width : '100%',
        sortable: true,            
	   	altrows: true,
	  	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		rowdetails : true,
		virtualmode : true	
	});
}

$("#searchStoneArt").on('click', function() {
	var statusE = $("#statusS").val();
	var samStoneSegC = $("#stoneSegS option:selected").attr("ids");
	var samRegionC = $("#samRegionS").val();

	var samStoneCatC = $("#mainCatS").val();
	var statusS = $("#statusS").val();
	
	if(samRegionC == null || samRegionC == "" || statusS == null|| statusS == "" || samStoneSegC == null || samStoneSegC == "" || samStoneCatC == null || samStoneCatC == "" )
	  {
			$.growl.error({
				message :"Please fill all mandatory fields !!" ,
				duration : 10000,
				title : 'Error'
			});
		     return false;
	}
	stoneArticleMasterSearchGrid();
	$("#jqxgrid").show();
});

var stoneArtMasterEdit = function(row, column, value) {
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(permission.canEdit == false){
		return '<button style="margin-left:2px; margin-top:3px; margin-right:1px" class="btn btn-sm btn-primary" type="button" disabled/><i class="fa fa-pencil fa-sm"></i></button>';	
	}else{
	return '<a class="btn btn-sm btn-primary" data-toggle="modal" data-target="#btnEditSam"  type="button" id='
			+ row
			+ ' onclick="editStoneArtMasterE('
			+ value
			+ ')" href="javascript:void(0);"/><i class="fa fa-pencil fa-sm"></i></a>'
	}
}

var editStoneArtMasterE = function(id){
	
	  var mainSegment = $("#samStoneSegE option:selected").text();
	  var statusE = $("#statusS").val();
	  
	  if(statusE == "false"){
		  $("#addRowSamE").prop("disabled",true);
		  $("#editStoneArtMaster").prop("disabled",true);
	  }else{
		  $("#addRowSamE").prop("disabled",false);
		  $("#editStoneArtMaster").prop("disabled",false);
	  }
	 	 $('#popupheaderlabel').text('Edit Stone Article Master Details');
			  var rows = $("#jqxgrid").jqxGrid('getrows');
			  
			  for(var i=0; i<rows.length; i++){ 	
				  var row = rows[i];
			 	 var fieldFilterS = {
			 			"fieldFilters":{
			 			"stonId":id,
			 			"isAcitve":(statusE),
			 			"type":"split"
			 			}
			 	    }
			  }
			  
	 	postJSON('/OrderExecution/api/v1/getSolitaireStoneDetailToEdit', JSON.stringify(fieldFilterS), function(data) { 	
	 		
	        var selectedRowData = data.payload.StoneMaster;	
	        onLoadFunctionHsnEdit(selectedRowData.hMasterDTO);
	        onLoadFunction(selectedRowData.region.id, selectedRowData.segment.stoneSegmentId,selectedRowData.uom);
          var rate = selectedRowData.category.code;
			
			if(rate =="SO"){
				$("#rateS").prop("disabled",false);
			}else{
				$("#rateS").prop("disabled",true);
			}
			
			$("#rateS").val(selectedRowData.dolarRate);
			$("#stoneHeaderId").val(selectedRowData.stonId);
	        $("#articleCodeE").val(selectedRowData.stoneCode);
			$("#samUomE").val(selectedRowData.uom);
			$("#handlingChargesE").val(selectedRowData.custHandlingCharges);
			
			var newArray = [];
			$.each(data.payload.stonedetails, function(k, v){
				var obj ={'slNo' : k, 'stoneDetailId' : v.stoneDetailId,'articleCode' : v.articleCode,'articleDescription' : v.articleDescription,
						'uqc' : v.uqc, 'region' : v.region,
						'rapRateCode' : v.rapRate, 'rapRate':v.rapRateInDollar , 'disPerc' : v.dis,'prmPerc' : v.prm,'rateC' : v.rateInDollar,'clarity' : v.clarity,'color' : v.color,
						'cut' : v.cut,'actualColor' : v.actualColor,'slab' : v.slab,'cp' : v.pCtRateInDollars,'fromColorDiamondCost' : v.fromColorDiamondCost,'toColorDiamondCost' : v.toColorDiamondCost,
						'cpRate' : v.costPriceInRs,
						'dataDTO' :( v.dataDTO != null) ? v.dataDTO.name: "",
						'mupPerc' : v.mup_perc,'exchangePerc' : v.exchangePercentage,'dpPerc' : v.directPurchasePercentage,'sp' : v.sellingRate,
						'sp_tab_ref' : v.sp_tab_ref,'startDate' : v.startDate,'enddate' : v.enddate,'statusEditableFeild' : v.statusEditableFeild,'disableFlagIdE' : false,'editFlagE' : false}
				
				newArray.push(obj);
			});
			
			if(selectedRowData.isCustomerStone == true){
				$("#jqxgrid").hide();
				$("#gridSectionEdit").hide();
				$("#addRowSamE").hide();
			}else{				
				stoneArticleModalGridEditFunc(newArray);
				$("#jqxgrid").show();
				$("#gridSectionEdit").show();
				$("#addRowSamE").show();
			}
          $("#packetStockE").val(selectedRowData.packetStock);
          //$("#hsnCodeE").append('<option value='+ selectedRowData.hMasterDTO.hsnCode+' selected>'+ selectedRowData.hMasterDTO.hsnCode+'</option>');
			$("#stoneHeaderId").val(selectedRowData.stonId)
			$("#custFlagS").val((selectedRowData.isCustomerStone == true)?'Yes':'No');
			if(selectedRowData.isCustomerStone == false){
				$("#handlingChargesE").prop('disabled',true);
			}else{
				$("#handlingChargesE").prop('disabled',false);
			}
			$("#reorderS").val((selectedRowData.isReOrder == true)?'Yes':'No');
			
			$("#samStoneCatE").append('<option value='+ selectedRowData.category.id+' selected>'+ selectedRowData.category.description+'</option>');
			  if(selectedRowData.subCategory == null){
				  $("#subCatE").append('<option value='+ selectedRowData.shape.shapeId+' selected>'+ selectedRowData.shape.description+'</option>');
				}else{				
					$("#subCatE").append('<option value='+ selectedRowData.subCategory.subcategoryId+' selected>'+ selectedRowData.subCategory.description+'</option>');
			  }
	      });
   }

var deleteStoneArtEditDet = function(row){			
    overlapE = false;
	id = $("#jqxgridStnArtleEdit").jqxGrid('getrowid', row);
	$("#jqxgridStnArtleEdit").jqxGrid('deleterow', id);		
}

var tableRefArray = [];
var toCostOSPS = [];
var stoneArticleModalGridEditFunc = function(data){


var updateRows = function(rowid, newdata, commit) {
}

var datafields = [
			{'name':'slNo','type':'int'},
			{'name':'stoneDetailId','type':'int'},
	       {'name':'articleCode','type':'string'},
	       {'name':'articleDescription','type':'string'},
	       {'name':'uqc','type':'string'},
	       {'name':'region','type':'int'},
           { 'name': 'rapRateCode', 'type': 'float'},
           { 'name': 'rapRate', 'type': 'float' },
           { 'name': 'disPerc', 'type': 'float' },
           { 'name': 'prmPerc', 'type': 'float' },
           { 'name': 'rateC','type': 'float' }, 	            
           {'name': 'clarity' , 'type': 'string'},
           { 'name': 'color', 'type': 'string' },
           { 'name': 'cut', 'type': 'string' },
           { 'name': 'actualColor', 'type': 'string'},
           { 'name': 'slab', 'type': 'string'},
           { 'name': 'cp', 'type': 'float'},
           { 'name': 'fromColorDiamondCost', 'type': 'string'},
           { 'name': 'toColorDiamondCost', 'type': 'string'},
           { 'name': 'cpRate', 'type': 'float'},
           { 'name': 'dataDTO', 'type': 'string'},
           { 'name': 'mupPerc', 'type': 'float' },
           { 'name': 'exchangePerc', 'type': 'float'},
           { 'name': 'dpPerc', 'type': 'float'},
           { 'name': 'sp', 'type': 'float'},
           { 'name': 'sp_tab_ref', 'type': 'string' },
           { 'name': 'startDate', 'type': 'date' },
           { 'name': 'enddate', 'type': 'date' },
           { 'name': 'statusEditableFeild', 'type': 'bool' },
           { 'name':'disableFlagIdE', 'type':'bool'},
           { 'name':'editFlagE', 'type':'bool'}
           
	];

var columns = [ 
	{ text  :'','datafield': 'slNo', hidden:true,'width' : '8%'},
		{ text  :'','datafield': 'disableFlagIdE', hidden:true,'width' : '8%'},
	    { text  :'','datafield': 'editFlagE', hidden:true,'width' : '8%'},
		{ text  :'Packet/Stock Id','datafield': 'stoneDetailId','width' : '8%',cellsalign : 'center', hidden:false,editable: false,cellsalign : 'center', align:'center'},
		{ text  :'stone Detail Id','datafield': 'statusEditableFeild','width' : '5%',cellsalign : 'center', hidden:true,
			
			 cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
					var rows = $("#jqxgridStnArtleEdit").jqxGrid("getrows");
					$("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',false);
           	   }
		},
		
		{ text: 'Article Code', datafield: 'articleCode',width: '6%', cellsalign : 'center', align:'center',editable: false},
       	{ text: 'Article Des', datafield: 'articleDescription',width: '15%', cellsalign : 'center', align:'center',editable: false },
        { text: 'Clarity', datafield: 'clarity',width: '6%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'clarity',
       		cellbeginedit: function (row) {
				 var stoneCostRangeMupId =  $("#jqxgridStnArtleEdit").jqxGrid("getCellvalue", row , 'stoneDetailId');
				 if(typeof stoneCostRangeMupId == "undefined" || stoneCostRangeMupId == null){
					
					     var mainSegment = $("#samStoneSegE option:selected").text();
                 		  
     					 if(mainSegment == "Diamond"){
	         					return true;
        				 }else{			  
	         					return false;	
	         			     }
				}else{
						return false;
					}
			 },
			 createeditor : function(row, cellvalue,editor) {
				 var mainSegment = $("#samStoneSegE option:selected").text();
					 var id = $("#samStoneCatE").val(); 
					 if(mainSegment == "Diamond"){
		               if(id != ""){
					       $.getJSON("/OrderExecution/api/v1/getLOVByCategory?categoryId="+id,function(data){
    	          				var res = data.payload.clarity;
    	          				
    	          		  		editor.jqxDropDownList({ source: res, displayMember: 'id', valueMember: 'id'});
  		  		     });        	          			
		         }
			   }
			 },
			 cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var rows = $("#jqxgridStnArtleEdit").jqxGrid('getrows');
					var wtRange = newvalue;
					 var articleDesc = ($("#samStoneSegE option:selected").text() == "Diamond") ? $("#samStoneSegE option:selected").text()+ " " + $("#samStoneCatE option:selected").text()+ " " + $("#subCatE option:selected").text() : $("#subCatE option:selected").text();
					  			
				$("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'articleDescription', articleDesc + " " + wtRange);
				$("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
       	   }           	  
			 
        },{ text: 'Color', datafield: 'color',width: '6%', cellsalign : 'center', align:'center',editable: true,  columntype : 'dropdownlist',displayfield : 'color',
        	cellbeginedit: function (row) {
				 var stoneCostRangeMupId =  $("#jqxgridStnArtleEdit").jqxGrid("getCellvalue", row , 'stoneDetailId');
				 if(typeof stoneCostRangeMupId == "undefined" || stoneCostRangeMupId == null){
					
					     var mainSegment = $("#samStoneSegE option:selected").text();
                		  
    					 if(mainSegment == "Diamond"){
	         					return true;
       				 }else{			  
	         					return false;	
	         			     }
				}else{
						return false;
					}
			 },
			 createeditor : function(row, cellvalue,editor) {
				 var mainSegment = $("#samStoneSegE option:selected").text();
					 var id = $("#samStoneCatE").val(); 
					 if(mainSegment == "Diamond"){
		               if(id != ""){
					       $.getJSON("/OrderExecution/api/v1/getLOVByCategory?categoryId="+id,function(data){
    	          				var res = data.payload.color;
    	          				
    	          		  		editor.jqxDropDownList({ source: res, displayMember: 'id', valueMember: 'id'});
  		  		     });        	          			
		         }
			   }
			 },
			 cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var rows = $("#jqxgridStnArtleEdit").jqxGrid('getrows');
					var clarity = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'clarity');
					var wtRange = newvalue;
					 var articleDesc = ($("#samStoneSegE option:selected").text() == "Diamond") ? $("#samStoneSegE option:selected").text()+ " " + $("#samStoneCatE option:selected").text()+ " " + $("#subCatE option:selected").text() : $("#subCatE option:selected").text();
					  			
					 $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'articleDescription', articleDesc + " " + clarity + " " + wtRange);
					 $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
       	   }
       	   
       },{ text: 'Cut', datafield: 'cut',width: '6%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist', displayfield : 'cut',
    	   cellbeginedit: function (row) {
				 var stoneCostRangeMupId =  $("#jqxgridStnArtleEdit").jqxGrid("getCellvalue", row , 'stoneDetailId');
				 if(typeof stoneCostRangeMupId == "undefined" || stoneCostRangeMupId == null){
					
					     var mainSegment = $("#samStoneSegE option:selected").text();
               		  
       					 if(mainSegment == "Diamond")
       					 {
 	         					return true;
          				 }else{			  
 	         					return false;	
 	         			 }
				}else{
						return false;
					 }
			 },
			 createeditor : function(row, cellvalue,editor) {
				 var mainSegment = $("#samStoneSegE option:selected").text();
					 var id = $("#samStoneCatE").val(); 
					 if(mainSegment == "Diamond"){
		               if(id != ""){
					       $.getJSON("/OrderExecution/api/v1/getLOVByCategory?categoryId="+id,function(data){
    	          				var res = data.payload.cutGrade;
    	          				
    	          		  		editor.jqxDropDownList({ source: res, displayMember: 'id', valueMember: 'id'});
  		  		     });        	          			
		         }
			   }
			 },
			 cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var rows = $("#jqxgridStnArtleEdit").jqxGrid('getrows');
					var clarity = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'clarity');
					var color = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'color');
					var wtRange = newvalue;
					 var articleDesc = ($("#samStoneSegE option:selected").text() == "Diamond") ? $("#samStoneSegE option:selected").text()+ " " + $("#samStoneCatE option:selected").text()+ " " + $("#subCatE option:selected").text() : $("#subCatE option:selected").text();
					  			
					 $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'articleDescription', articleDesc + " " + clarity + " " + color + " " + wtRange);
					 $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
    	   }
    	   
       },{ text: 'Actual Color', datafield: 'actualColor',width: '6%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'actualColor',
    	   cellbeginedit: function (row) {
				 var stoneCostRangeMupId =  $("#jqxgridStnArtleEdit").jqxGrid("getCellvalue", row , 'stoneDetailId');
				 if(typeof stoneCostRangeMupId == "undefined" || stoneCostRangeMupId == null){
					
					     var mainSegment = $("#samStoneSegE option:selected").text();
               		  
   					 if(mainSegment == "Diamond"){
	         					return true;
      				 }else{			  
	         					return false;	
	         			     }
				}else{
						return false;
					}
			 },
			 createeditor : function(row, cellvalue,editor) {
				 var mainSegment = $("#samStoneSegE option:selected").text();
					 var id = $("#samStoneCatE").val(); 
					 if(mainSegment == "Diamond"){
		               if(id != ""){
					       $.getJSON("/OrderExecution/api/v1/getLOVByCategory?categoryId="+id,function(data){
    	          				var res = data.payload.actualColor;
    	          		  		editor.jqxDropDownList({ source: res, displayMember: 'id', valueMember: 'id'});
  		  		        });        	          			
		             }
			     }
			 },
			 cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					var rows = $("#jqxgridStnArtleEdit").jqxGrid('getrows');
					var clarity = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'clarity');
					var color = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'color');
					var cut = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'cut');
					var wtRange = newvalue;
					
					 var articleDesc = ($("#samStoneSegE option:selected").text() == "Diamond") ? $("#samStoneSegE option:selected").text()+ " " + $("#samStoneCatE option:selected").text()+ " " + $("#subCatE option:selected").text() : $("#subCatE option:selected").text();
					 $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'articleDescription', articleDesc + " " + clarity + " " + color+ " " + cut + " " + wtRange);
					 $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
 	   },
       },{ text: 'Wt Range', datafield: 'slab',width: '6%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'slab',
    	   cellbeginedit: function (row) {
				 var stoneCostRangeMupId =  $("#jqxgridStnArtleEdit").jqxGrid("getCellvalue", row , 'stoneDetailId');
				 if(typeof stoneCostRangeMupId == "undefined" || stoneCostRangeMupId == null){
					
					     var mainSegment = $("#samStoneSegE option:selected").text();
               		  
   					 if(mainSegment == "Diamond"){
	         					return true;
      				 }else{			  
	         					return false;	
	         			     }
				}else{
						return false;
					}
			 },
			 createeditor : function(row, cellvalue,editor) {
				 var mainSegment = $("#samStoneSegE option:selected").text();
					 var id = $("#samStoneCatE").val(); 
					 if(mainSegment == "Diamond"){
		               if(id != ""){
					       $.getJSON("/OrderExecution/api/v1/getLOVByCategory?categoryId="+id,function(data){
    	          				var res = data.payload.weightSlab;
    	          				
    	          		  		editor.jqxDropDownList({ source: res, displayMember: 'description', valueMember: 'description'});
  		  		     });        	          			
		         }
			   }else {
				     if(catSeg!=""){
							$.getJSON("/OrderExecution/api/v1/getWeightRangeByCategory?categoryId="+catSeg,function(data){
							var res = data.payload.weightRange;
	          		  		editor.jqxDropDownList({ source: data.payload.weightRange , displayMember: 'description', valueMember: 'description'});
					 })
			     }
		     }
	   },
	    cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
	    	var rows = $("#jqxgridStnArtleEdit").jqxGrid('getrows');
 			var clarity = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'clarity');
 			var color = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'color');
 			var cut = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'cut');
 			var actualColor = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'actualColor');
 			var segm = $("#samStoneSegE option:selected").text();
		    var wtRange = newvalue;
			var articleDesc = ($("#samStoneSegE option:selected").text() == "Diamond") ? $("#samStoneSegE option:selected").text()+ " " + $("#samStoneCatE option:selected").text()+ " " + $("#subCatE option:selected").text() : $("#subCatE option:selected").text();
				 $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'articleDescription', articleDesc + " " + clarity + " " + color+ " " + cut+ " " + actualColor + " " + wtRange);
				 $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
	     		    var toWtE =  $("#jqxgridStnArtleEdit").jqxGrid("getcellvalue" , row, 'toColorDiamondCost');
	     		    var fromWtS =  $("#jqxgridStnArtleEdit").jqxGrid("getcellvalue" , row, 'fromColorDiamondCost');
	     			var mainSegment = $("#samStoneCatE option:selected").text();
	     			 if(segm == "Diamond"){
	     			 if(mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers" ){
				          checkWeightRangeForColorDiamondEdit(overlapE, cut, clarity, color, actualColor,fromWtS,toWtE, wtRange, msg, rows,row);
			          }else{
			        	  checkWeightRangeEdit(overlap, cut, clarity, color, actualColor, wtRange, msg, rows, row); 
			          }
				 }
            }
       },{ text: 'UQC', datafield: 'uqc',width: '5%',  cellsalign : 'center', align:'center',editable: false,
    	   cellbeginedit: function (row) {
				 var rows = $('#jqxgridStnArtleEdit').jqxGrid('getrows');
				 var stoneCostRangeMupId =  $("#jqxgridStnArtleEdit").jqxGrid("getCellvalue", row , 'stoneDetailId');
			 if(typeof stoneCostRangeMupId == "undefined" || stoneCostRangeMupId == null){
						return true;
					}else{
						return false;
					}
			 },
       },
       { text: 'DIS %', datafield: 'disPerc', width: '6%',  cellsalign : 'right', align:'center',
    	   editable: false,
    	   cellsformat : 'd2',
		   columntype : 'numberinput',
       	   createeditor : function(row, cellvalue, editor) {
				editor.jqxNumberInput({
					spinButtons : false,
					decimalDigits : 2
				});
			},
    	   cellbeginedit:function(row,columntype,displayfield) {
   		    
    		   var mainSegment = $("#samStoneCatE option:selected").text();
         		 var segType = $("#samStoneSegC").val(); 
					 if(mainSegment == "Solitaire"){
					 var disPer = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'disPerc');
	           		 var prePer = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'prmPerc');
	           		 
	   		           	if(prePer == "" || prePer==null){
	     					return true;
	 				   }else{			  
	     					return true;	
	     			    }
	   		           	
				       }else{	
				    	   
     					return false;	
     			  }
    	     }
  	   },
    	   
       { text: 'Prm %', datafield: 'prmPerc', width: '5%',  cellsalign : 'right', align:'center',editable: true,cellsformat : 'd2',
			columntype : 'numberinput',
       	 createeditor : function(row, cellvalue, editor) {
				editor.jqxNumberInput({
					spinButtons : false,
					decimalDigits : 2
				});
			},
  		 cellbeginedit:function(row,columntype,displayfield) {
    		    
  		   var mainSegment = $("#samStoneCatE option:selected").text();
       		 var segType = $("#samStoneSegC").val(); 
				 if(mainSegment == "Solitaire"){
					 var disPer = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'disPerc');
	           		 var prePer = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'prmPerc');
	   		           
	           		 if(disPer == "" || disPer == null){
	     					return true;
	 				   }else{			  
	     					return false;	
	     			    }
			       }else{	
   					return false;	
   			  }
  	     },
		 cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
        	   $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
           }
       },

       { text: 'RAP Rate Code', datafield: 'rapRateCode', width: '6%',  cellsalign : 'center', align:'center',editable: true,
    	   cellsformat : 'd2',
		  
    	   cellbeginedit:function(row,columntype,displayfield) {
       		 var mainSegment = $("#samStoneCatE option:selected").text();
       		 var segType = $("#samStoneSegC").val();  // this will give you the Segment Description
				 if(mainSegment == "Solitaire"){
  					return true;
				 }else{			  
  					return false;	
  			}
   	     }, 
			 cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
				 var mainSegment = $("#samStoneCatE option:selected").text();
         		 var segType = $("#samStoneSegE").val();
			  
         		$("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
         		
					 var rows = $("#jqxgridStnArtleEdit").jqxGrid('getrows');
				 var disPer = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'disPerc');
				 var rateC = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'rateC');
	         	 var prePer = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'prmPerc');
	         	
					if(mainSegment == "Solitaire"){ 
						         
					         	 var rapRate = $('#rateS').val();
								if(rows[row].prmPerc){
			         						var fieldFilterS = {
			         								  "fieldFilters": {
			         									 "dolarprice": parseFloat(rateC),
			         									"rapcode":(newvalue),
			         									"disOrPrm":"PRM",
			         									"disOrPrmPercent":(prePer==null)?0:prePer
			         									}
			         								} 
								}else{
									var fieldFilterS = {
	         								  "fieldFilters": {
	         									 "dolarprice": parseFloat(rateC),
	         									"rapcode":(newvalue),
	         									"disOrPrm":"DIS",
	         									"disOrPrmPercent": (disPer==null)?0:disPer
	         									}
	         								} 
								}
				  			    postJSON('/OrderExecution/api/v1/calculateSolitarePrice', JSON.stringify(fieldFilterS), function(data) {         					          				
				  			    	var res1 = data.payload;  
				  			        $("#jqxgridStnArtleEdit").jqxGrid("setcellvalue" , row, 'cpRate', res1.SellingPrice);  
				  			        $("#jqxgridStnArtleEdit").jqxGrid("setcellvalue" , row, 'cp', data.payload.cpPct);
				  			    }); 
					}	
					
					var rapRate$ = newvalue *100;
					$("#jqxgridStnArtleEdit").jqxGrid("setcellvalue" , row, 'rapRate', rapRate$); 
		        },
       },
       { text: 'RAP Rate in $', datafield: 'rapRate', width: '6%',  cellsalign : 'right', align:'center',
    	   editable: false,columntype : 'numberinput',cellsformat : 'd2',
    	 
    	   cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
        	   $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
    	   },
       },
       { text: 'CP P.CT Rate in $', datafield: 'cp', width: '5%',  cellsalign : 'right', align:'center',editable: false,cellsformat : 'd2',
    	   cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
        	   $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
           }
       },
       { text: '$-Rate', datafield: 'rateC',width: '5%', cellsalign : 'right', align:'center',editable: true,
    	   cellsformat : 'd2',
    	   cellbeginedit: function (row) {
    		   var mainSegment = $("#samStoneCatE option:selected").text();
    		   if(mainSegment == "Solitaire"){
    			   return true; 
    		   }else{
    			   return false;
    		   }
    	   },
    	   cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
        	   $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
        	   
        	   var mainSegment = $("#samStoneCatE option:selected").text();
         		 var segType = $("#samStoneSegE").val();
			  
         		
				 var rows = $("#jqxgridStnArtleEdit").jqxGrid('getrows');
				 var disPer = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'disPerc');
	         	 var prePer = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'prmPerc');
	         	 var rapRateCode = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'rapRateCode');
	         	 
				if(mainSegment == "Solitaire"){ 
					
					        var rapRate = $('#rateS').val();
							if(rows[row].prmPerc){
		         						var fieldFilterS = {
		         								  "fieldFilters": {
		         									 "dolarprice": parseFloat(newvalue),
		         									"rapcode":parseFloat(rapRateCode),
		         									"disOrPrm":"PRM",
		         									"disOrPrmPercent":(prePer==null)?0:prePer
		         									}
		         								} 
							}else{
								var fieldFilterS = {
	         								  "fieldFilters": {
	         									 "dolarprice": parseFloat(newvalue),
	         									"rapcode":parseFloat(rapRateCode),
	         									"disOrPrm":"DIS",
	         									"disOrPrmPercent": (disPer==null)?0:disPer
	         									}
	         								} 
							}
			  			    postJSON('/OrderExecution/api/v1/calculateSolitarePrice', JSON.stringify(fieldFilterS), function(data) {         					          				
			  			    	var res1 = data.payload;  
			  			        $("#jqxgridStnArtleEdit").jqxGrid("setcellvalue" , row, 'cpRate', res1.SellingPrice); 
			  			        $("#jqxgridStnArtleEdit").jqxGrid("setcellvalue" , row, 'cp', data.payload.cpPct);
			  			}); 
                   }
            },
       },
       { text: 'From Cost', datafield: 'fromColorDiamondCost',width: '5%', cellsalign : 'right', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'fromColorDiamondCost',
			
    	   createeditor : function(row, cellvalue,editor) {
				 var id = $("#samStoneSegE").val();
					if(id!=""){
						$.getJSON("/OrderExecution/api/v1/costWeightRange?segmentId=" + id, function(data) {
	          				var res = data.payload.FROM_COST_RANGE;
	          				toCostOSPS = data.payload.FROM_COST_RANGE;
	          			         editor.jqxDropDownList({ source: res , displayMember: 'id', valueMember: 'id'});
		  		        });
					  }
			     },
			   
		     cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
		    	   var rows = $('#jqxgridStnArtleEdit').jqxGrid('getrows');
	        	   $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
	        	   
	        	   $.each(toCostOSPS,function(k,v){
	        		   if(v.id == newvalue){
	 		        	 $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'toColorDiamondCost',v.name);
	        		   }
	        	   })

	        	   var segType = $("#samStoneSegE option:selected").text();
	        	   var toWtE =  $("#jqxgridStnArtleEdit").jqxGrid("getcellvalue" , row, 'toColorDiamondCost');
	        	   var msg = null;
					 if(segType == "Precious Stones" || segType == "Other Stones"){
						 checkCostRangeE(overlapE, newvalue, toWtE, msgE, rows,row);
					 }else{
			     			var clarity = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'clarity');
			     			var color = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'color');
			     			var cut = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'cut');
			     			var actualColor = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'actualColor');
			     			var wtRange = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'slab');
			     			var mainSegment = $("#samStoneCatE option:selected").text();
			     			 if(segType == "Diamond"){
			     				if(mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers" ){
						       checkWeightRangeForColorDiamondEdit(overlapE, cut, clarity, color, actualColor,newvalue,toWtE, wtRange, msgE, rows,row);
					           }
			     		  }
					 }
	           }, 
	           
	           cellbeginedit: function (row) {
					 var mainSegment = $("#samStoneCatE option:selected").text();					 
	         		 var segType = $("#samStoneSegE option:selected").text();
				     var editFlagF=$("#jqxgridStnArtleEdit").jqxGrid('getcellvalue', row, 'editFlagE');
	 				 var disableFlagIdE = $("#jqxgridStnArtleEdit").jqxGrid("getcellvalue",row,"disableFlagIdE");
				     
				     if(mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers" || 
					    		segType== "Precious Stones" || segType == "Other Stones")
						 { 					
					    	 if(editFlagF == true){
					    		 
				 				    if(disableFlagIdE == true){
										return false;
									}
				 				   return true;
					 		 } 
							}else{
								return false;
						  }
				 },
		     
        },{ text: 'To Cost', datafield: 'toColorDiamondCost',width: '5%', cellsalign : 'right', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'toColorDiamondCost',
        	
        	cellbeginedit: function (row) {
        		
					 var mainSegment = $("#samStoneCatE option:selected").text();					 
	         		 var segType = $("#samStoneSegE option:selected").text();
	         		 
	         		 var editFlagF=$("#jqxgridStnArtleEdit").jqxGrid('getcellvalue', row, 'editFlagE');
				     var disableFlagIdE = $("#jqxgridStnArtleEdit").jqxGrid("getcellvalue",row,"disableFlagIdE");
				     
				     //  ||segType== "Precious Stones" || segType == "Other Stones"
				   // as per the  discussion with murty sir on 27/09/19 this column will be enabled for only for COLOR DIAMONDS
				    if(mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers" )
					  { 					
				    	 if(editFlagF == true){
		 				    if(disableFlagIdE == true){
								return false;
							}
		 				   return true;
			 		 } 
					}else{
						return false;
					  }
               },
				 
      		 createeditor : function(row, cellvalue,editor) {
      			var editFlagE = $("#jqxgridStnArtleEdit").jqxGrid("getcellvalue",row,"editFlagE");
				 var id = $("#samStoneSegE").val();
					if(id!=""){
						$.getJSON("/OrderExecution/api/v1/costWeightRange?segmentId=" + id, function(data) {
          				var res = data.payload.FROM_COST_RANGE;
          		  		editor.jqxDropDownList({ source: res , displayMember: 'name', valueMember: 'name'});
		  		        });
		     }
	    },
	    cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {	
	    	 var rows = $("#jqxgridStnArtleEdit").jqxGrid('getrows');
			 var mainSegment = $("#samStoneCatE option:selected").text();
     		 var segType = $("#samStoneSegE option:selected").text();
     		 
     		$("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
     		  
		    if(mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers"){
    			  	
		    	$("#jqxgridStnArtleEdit").jqxGrid("setcellvalue" , row, 'cpRate', newvalue);  	    			  	
 			 }
		    if (segType == "Precious Stones" || segType == "Other Stones" ){					 
				 $("#jqxgridStnArtleEdit").jqxGrid("setcellvalue" , row, 'cpRate', newvalue);
			 }
		    
			  var fromWtS =  $("#jqxgridStnArtleEdit").jqxGrid("getcellvalue" , row, 'fromColorDiamondCost');
				  if(parseFloat(fromWtS) > parseFloat(newvalue)){
					 $.growl.error({
						message :"From Cost Range Should be Less then To Cost Range!!" ,
						duration : 10000,
						title : 'Error'
					});
				     return false;
				  }
				  
				  var msg = null;
					 if(segType == "Precious Stones" || segType == "Other Stones"){
						 checkCostRangeE(overlapE, fromWtS, newvalue, msgE, rows, row);
					 }else{
			     			var clarity = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'clarity');
			     			var color = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'color');
			     			var cut = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'cut');
			     			var actualColor = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'actualColor');
			     			var wtRange = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'slab');
			     			var mainSegment = $("#samStoneCatE option:selected").text();
			     			 if(segType == "Diamond"){
			     				if(mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers" ){
						           checkWeightRangeForColorDiamondEdit(overlapE, cut, clarity, color, actualColor,fromWtS,newvalue, wtRange, msgE, rows,row);
					          }
			     	     } 
			       }
		    }
	   },{ text: 'CP (p.ct./p.gm./p.pc.) in Rs.', datafield: 'cpRate', width: '5%',  cellsalign : 'right', align:'center',editable: true, cellsformat : 'd2',
			columntype : 'numberinput',
        	 cellbeginedit: function (row) {
				 var stoneCostRangeMupId =  $("#jqxgridStnArtleEdit").jqxGrid("getcellvalue", row , 'stoneDetailId');
				 var fromColorDiamondCost =  $("#jqxgridStnArtleEdit").jqxGrid("getcellvalue", row , 'fromColorDiamondCost');
				 var toColorDiamondCost =  $("#jqxgridStnArtleEdit").jqxGrid("getcellvalue", row , 'toColorDiamondCost');
				 var mainSegment = $("#samStoneCatE option:selected").text();
	         	 var segType = $("#samStoneSegE option:selected").text();
	         	 // || segType== "Precious Stones" || segType == "Other Stones"
	         	 // as per the  discussion with murty sir on 27/09/19 this column will be disabled only when Main Cat is SOLITAIRE
				 if (mainSegment == "Solitaire"){ 
			         	  return false;
			     }else if((fromColorDiamondCost != null && toColorDiamondCost != null ) && (mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers"))
				       return true
	             else{
		    		  return true;
		    	 }
			 },
		   cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {
			   var toColorDiamondCost =  $("#jqxgridStnArtleEdit").jqxGrid("getcellvalue", row , 'toColorDiamondCost');
			   var fromColorDiamondCost =  $("#jqxgridStnArtleEdit").jqxGrid("getcellvalue", row , 'fromColorDiamondCost');
			  
			   if(parseFloat(newvalue) > parseFloat(toColorDiamondCost) || parseFloat(newvalue) < parseFloat(fromColorDiamondCost)){
				   $.growl.error({
					   message : "CP (p.ct./p.gm./p.pc.) in Rs. should be between " + fromColorDiamondCost + " and " + toColorDiamondCost,
					   duration : 10000,
					   title : 'Error'
				   });
				   return oldvalue;
			   }
		   }
        },{ text: 'Tab Ref', datafield: 'dataDTO',width: '5%', cellsalign : 'center', align:'center',editable: true,columntype : 'dropdownlist',displayfield : 'sp_tab_ref',cellsformat:'d2',
		   createeditor: function (row, cellvalue, editor) { 
				editor.on('click', function(event){
					var rows = $("#jqxgridStnArtleEdit").jqxGrid('getrows');         					
					
					for(var i=0; i<rows.length; i++){
						if(row == rows[i].boundindex){         							
							 var id = $("#samStoneSegE").val();
							if(id!=""){
								$.getJSON("/OrderExecution/api/v1/getStoneMupBysegment?segmentId=" + id, function(data) {
		    	          				var res = data.payload.tableRef;
		    	          				tableRefArray = res;
		    	          		  		editor.jqxDropDownList({ source: res , displayMember: 'id', valueMember: 'name'});
	      		  		        });
							  }
						   }
					    }
      		     });          		  
      	     },
      	   cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue) {		
      		   var rows = $("#jqxgridStnArtleEdit").jqxGrid('getrows');
        		$("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
        		$.each(tableRefArray,function(k,v){
        			if(newvalue.label == v.id){
        				$("#jqxgridStnArtleEdit").jqxGrid("setcellvalue" , row, 'mupPerc', v.name); 
        			}
        		});
      	   }
        },{ text: 'MUP %', datafield: 'mupPerc', width: '5%',  cellsalign : 'right', align:'center',editable: false,columntype : 'numberinput',cellsformat : 'd2',
        	
        	cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
	        	   $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
	           },
	           cellbeginedit: function (row) {
					 var rows = $('#jqxgridStnArtleEdit').jqxGrid('getrows');
					 var stoneCostRangeMupId =  $("#jqxgridStnArtleEdit").jqxGrid("getCellvalue", row , 'stoneDetailId');
						 var mainSegment = $("#samStoneCatE option:selected").text();
						 
		         		 var segType = $("#samStoneSegE option:selected").text();
		         		if(segType== "Diamond"|| segType== "Precious Stones" || segType == "Other Stones"){ 
								 var rows = $("#jqxgridStnArtleEdit").jqxGrid('getrows');
								 var mupPer = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'mupPerc');
					         	 var cpRate = $('#jqxgridStnArtleEdit').jqxGrid('getcellvalue', row, 'cpRate');
         						 var fieldFilterS = {
         						     "fieldFilters": {
         									    "cp": parseFloat(cpRate),
         									     "mup":mupPer
         									}
         								}    
						  			    postJSON('/OrderExecution/api/v1/calculateSellingPrice', JSON.stringify(fieldFilterS), function(data) {         					          				
						  			    	var res1 = data.payload;  
						  		  					$("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'sp', res1.SellingPrice);
						  			    }); 
					         	        return false;
					             }else{			  
				    			 		return true;	
				    	    }
				     },
             
        },{ text: 'SP (p.ct./p.gm.p.pc) in Rs', datafield: 'sp',width: '5%', cellsalign : 'right', align:'center',editable: false,cellsformat : 'd2',
			columntype : 'numberinput',
       	    createeditor : function(row, cellvalue, editor) {
				editor.jqxNumberInput({
					spinButtons : false,
					decimalDigits : 2
				});
			},
        	 cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
	        	   $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
	           }
        
        },{ text: 'Exchange %', datafield: 'exchangePerc', width: '5%',  cellsalign : 'right', align:'center',editable: true,
        	cellsformat : 'd2',
			columntype : 'numberinput',
        	 /*createeditor : function(row, cellvalue, editor) {
					editor.jqxNumberInput({
						spinButtons : false,
						decimalDigits : 2
					});
				},*/
			 cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
	        	   $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
	           }
			 
        },{ text: 'DP %', datafield: 'dpPerc', width: '5%',  cellsalign : 'right', align:'center',editable: false,  cellsformat : 'd2',
			   columntype : 'numberinput',
			 cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
	        	   $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
	           },
	         
              /* createeditor : function(row, cellvalue, editor) {
 					editor.jqxNumberInput({
 						spinButtons : false,
 						decimalDigits : 2
 					});
 				},*/
        },{ text: 'Region Id', datafield: 'region',width: '5%', cellsalign : 'center', align:'center',editable: false
        },{ text: 'Start Date',
        	datafield: 'startDate',
        	width: '7%', 
        	cellsalign : 'center', 
        	align:'center',
        	editable: true,
        	columntype: 'datetimeinput',
        	cellsformat : 'dd/MM/yyyy',
        	 cellbeginedit: function (row) {
				 var rows = $('#jqxgridStnArtleEdit').jqxGrid('getrows');
				 var stoneCostRangeMupId =  $("#jqxgridStnArtleEdit").jqxGrid("getCellvalue", row , 'stoneDetailId');
				 if(typeof stoneCostRangeMupId == "undefined" || stoneCostRangeMupId == null){
						return true;
					}else{
						return false;
					}
			 },
			 cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
	        	   $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
	           }
        },{ text: 'End Date',
        	datafield: 'enddate',
        	width: '7%', 
        	cellsalign : 'center', 
        	align:'center',
        	editable: true,
        	columntype: 'datetimeinput',
        	cellsformat : 'dd/MM/yyyy',
        	 cellbeginedit: function (row) {
				 var rows = $('#jqxgridStnArtleEdit').jqxGrid('getrows');
				 var stoneCostRangeMupId =  $("#jqxgridStnArtleEdit").jqxGrid("getCellvalue", row , 'stoneDetailId');
				 if(typeof stoneCostRangeMupId == "undefined" || stoneCostRangeMupId == null){
						return true;
					}else{
						return false;
					}
			 },
	          cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue, event) {
	           $("#jqxgridStnArtleEdit").jqxGrid('setcellvalue', row, 'statusEditableFeild',true);
					var date = new Date();
					var startDate = $("#jqxgridStnArtleEdit").jqxGrid('getcellvalue', row, 'startDate');
					if (newvalue >= startDate) {
						return newvalue;
					} else {
						$.growl.error({
							message : "End date should not be less than start date.",
							duration : 3000,
							title : 'Error'
						});
						return "";
					}
				}
        },{
			text : '',
			datafield : 'Delete',
			'width' : '4%',
			cellsalign : 'center',
			align:'center',
			formatoptions: {editbutton:false,delbutton:false},
			editable: false,
			cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue) {
				var rows = $("#jqxgridStnArtleEdit").jqxGrid("getrows");
				if(typeof rows != "undefined"){
					var id = rows[row].stoneDetailId;
					 if(typeof id == "undefined" || id == null){
							return  "<button onclick='deleteStoneArtEditDet("+row+")'  type='button' class='btn btn-primary btn-sm'><i class='fa fa-trash-o fa-md'></i></button>";
					}else{	
						return  "";
					}
				}
			}
			
		}];
addGrid(datafields, columns, updateRows, data, "", '#jqxgridStnArtleEdit');
$("#jqxgridStnArtleEdit").jqxGrid({
	height: 159,
    autoheight: true,
    columnsheight : 52,
    columnsresize : true,
    rowsheight: 21,
    pageable: true,
    theme: 'energyblue',

});
}

var msgE = null;
var checkWeightRangeForColorDiamondEdit = function(overlapE, cut, clarity, color, actualColor,fromWtS,toWtE, wtRange,msgE, array,curRow){
	if (wtRange != null && wtRange !=undefined) {
		var fromCost = fromWtS == undefined ? null : fromWtS;
		var toCost = toWtE == undefined ? null : toWtE;
		if (null != fromWtS && null != toWtE && 1 < array.length) {
			overlapE = overlapFunctionTwoVariablesCDEdit(fromWtS, toWtE, wtRange, cut, clarity, color, actualColor, array.length,array,curRow);
		} else {
			overlapE = overlapFunctionOneVariablesCDEdit(null != fromWtS ? fromWtS : toWtE, wtRange, cut, clarity,color, actualColor, array.length,array,curRow);
		}
	 }
	 if(overlapE){
		return false;
	 }
}

var overlapFunctionTwoVariablesCDEdit = function(x1, x2,wt,cutGrade, clarity,color, actualColor, n, a, curRow) {
	var i;
	overlapE = false;
	for (i = 0; i < n; i++) {
		if (i != curRow && null != a[i].fromColorDiamondCost && null != a[i].toColorDiamondCost && 
				undefined != a[i].fromColorDiamondCost  && undefined != a[i].fromColorDiamondCost && 
				"" != a[i].fromColorDiamondCost  && "" != a[i].fromColorDiamondCost) {
			
			if ((!(x2 < parseFloat(a[i].fromColorDiamondCost) || x1 > parseFloat(a[i].toColorDiamondCost))) &&
					cutGrade == a[i].cut && clarity == a[i].clarity && color == a[i].color && actualColor == a[i].actualColor
					 && wt == a[i].slab) {
				overlapE = true;	
				$.growl.error({
					message : "Overlapping Exists",
					duration : 10000,
					title : 'Error'
				});
				break;
			}
		}
	}
	return overlapE;
}
var overlapE = false;
var generaterowEditStone = function(i) {
var row = {};

row["slNo"]= i;
row["stoneDetailId"]= null;
row["articleCode"] = $("#articleCodeE").val();
	row["articleDescription"] = ($("#samStoneSegE option:selected").text() == "Diamond") ? $("#samStoneSegE option:selected").text()+ " " + $("#samStoneCatE option:selected").text() 
			+ " " + $("#subCatE option:selected").text() :  $("#samStoneSegE option:selected").text()+ " " + $("#samStoneCatE option:selected").text()+ " " +$("#subCatE option:selected").text();
row["uqc"] =  $("#samUomE").val();	  	
	row["rapRateCode"] =  "";
	row["rapRate"] =   "";
	row["disPerc"] =  "";
row["prmPerc"] =   "";
	row["custFlagC"] =   "";
	row["cp"] =   "";
	row["rateC"] =  $("#rateS").val();	  	
	row["clarity"] =  "";
	row["color"] =   "";
row["cut"] =   "";
	row["actualColor"] =   "";	  	
	row["slab"] =  "";
	row["fromColorDiamondCost"] =   "";
	row["toColorDiamondCost"] =  "";
row["cpRate"] =   "";
	row["sp_tab_ref"] =   "";
	row["mupPerc"] =   "";
row["exchangePerc"] =   "";
	row["dpPerc"] =  "";
	row["editFlagE"] =   true;
row["disableFlagIdE"] =  false;
	row["statusEditableFeildID"] =   true;
row["sp"] =   "";
row["region"] =  $("#samRegionE option:selected").text();
	row["startDate"] =   "";
	row["enddate"] =   "";
return row;
}

var disabledArrayE = [];

$("#addRowSamE").on('click',function(){
if(globalFlag == false){
	$.growl.error({
		message : "Weight Range is overlapping",
		duration : 10000,
		title : 'Error'
	});
	return false;
}
var mainSegment = $("#samStoneCatE option:selected").text();
 var segType = $("#samStoneSegC").val(); 
	 if(mainSegment == "Solitaire"){
		 var rateE = $("#rateS").val();
		 if(rateE == "" || rateE == null){
			 $.growl.error({
					message :"Please fill $-Rate field !!" ,
					duration : 10000,
					title : 'Error'
				});
			     return false;
		 }
	 }
	 if(overlapE == true){
		 $.growl.error({
				message :"Overlapping Exits-Please Enter Different Ranges or Delete the Row newly added Row!!" ,
				duration : 10000,
				title : 'Error'
			});
		 return false;
	}
	 var rows = $("#jqxgridStnArtleEdit").jqxGrid('getrows');
		if(typeof rows != "undefined"){
		for(var i=0;i<rows.length;i++){
			
			if(typeof rows[i] != "undefined"){
				if(rows[i].editFlagE == true){
					$("#jqxgridStnArtleEdit").jqxGrid("setcellvalue",i,'disableFlagIdE',true);
				}
			}
		}
		$("#jqxgridStnArtleEdit").jqxGrid('addrow', null, generaterowEditStone(rows.length) ,"last");
	 }
	
});

var onLoadFunctionHsnEdit = function(hsnId){
	$("#hsnCodeE").empty().append('<option value="" selected>--Select--</option>');
	var rows = $("#jqxgrid").jqxGrid('getrows');
	var stoneSegS = $("#samStoneSegE").val();
	$.each(rows,function(v,k){
	  stoneSegS =  $("#jqxgrid").jqxGrid("getCellvalue", k ,'stoneSegId');
	});
	
	$.getJSON("/OrderExecution/api/v1/hsnLov?segmentId="+$("#samStoneSegE").val(),function(data){
			$.each(data.payload.hsnLov,function(key,val){
				var hsnCodes = val.name + ' ' + '-' + ' '+ val.description
				 if (hsnId.hsnCode == val.name) {
					  $("#hsnCodeE").append('<option selected value="'+val.id+'">'+ hsnCodes + '</option>');
				}else{
					$("#hsnCodeE").append('<option  value="'+val.id+'">'+ hsnCodes+'</option>');
		        } 
		   })
     })
}

$("#editStoneArtMaster").on("click",function(){
	trimmer();
	if(globalFlag == false){
		$.growl.error({
			message : "Weight Range is overlapping",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	  var stoneArtMasterDetails = editRecordsStoneArtDet();
		if (stoneArtMasterDetails) {
			postJSON('/OrderExecution/api/v1/updateSolitaireStoneMaster',JSON.stringify(stoneArtMasterDetails),function(data) {
				
			  if (data.resCode == "1") {	
				  $("#editStoneArtMaster").prop("disabled",true);
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'Success'
				});
				$('#btnEditSam').modal('hide');
				$("#jqxgridStnArtleEdit").jqxGrid('clear');
				stoneArticleMasterFieldFilters();
			} else {
				 $("#editStoneArtMaster").prop("disabled",false);
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			  }
		   });
		}
  })
	   
var editRecordsStoneArtDet = function() {
	
	var stoneArtMasterEditArr = [];
	var chekUniqArrActualColor = [];
	var hsnCodeE = $("#hsnCodeE").val();
	
	if (hsnCodeE == "" || hsnCodeE == null){
		$.growl.error({
			message : "Please Fill Manadatory Feild!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	
	// Validation 
	if(overlapE == true){
		 $.growl.error({
				message :"Overlapping Exits-Please Enter Different Ranges!!" ,
				duration : 10000,
				title : 'Error'
			});
		 return false;
	}
	
	var custFlagS = $("#custFlagS").val();
	if(custFlagS == "No"){
	var rows = $('#jqxgridStnArtleEdit').jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		
	        	if(rows.length > 1){
	        	    var filterednames = rows.filter(function(obj) {
	        	    	 var mainSegment = $("#samStoneCatE option:selected").text();
	             		 var segType = $("#samStoneSegE option:selected").text();
	        		     
	        	    if(segType== "Diamond"){
		        	    	if(mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers"){
					        	    return (obj.actualColor === row.actualColor ) && (obj.clarity  == row.clarity) && (obj.cut  == row.cut)
							        	    && (obj.color  == row.color) && (obj.fromColorDiamondCost === row.fromColorDiamondCost ) && (obj.slab === row.slab ) 
							        	    && (obj.toColorDiamondCost === row.toColorDiamondCost );
		        	    	}else{
		        	    		 return (obj.actualColor === row.actualColor ) && (obj.clarity  == row.clarity) && (obj.cut  == row.cut)
		        	    		        && (obj.color  == row.color) && (obj.slab === row.slab ) ;
		        	    	 }
	        	    }else{
	        	    	  return (obj.fromColorDiamondCost === row.fromColorDiamondCost ) && (obj.toColorDiamondCost === row.toColorDiamondCost );
	        	    }
	        	});
	        	if(filterednames.length >  1){
	        		$.growl.error({
						message : "Duplicate records are Exists",
						duration : 10000,
						title : 'Error'
					});
	        		return false;
	        	}	      
	          }
        	  var mainSegment = $("#samStoneCatE option:selected").text();
     		  var segType = $("#samStoneSegE option:selected").text();
     		  if(mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers" || segType== "Precious Stones" || segType == "Other Stones"){ 
			  if((row.fromColorDiamondCost == "" || row.fromColorDiamondCost == null) || (row.toColorDiamondCost == "" || row.toColorDiamondCost == null)){
					 $.growl.error({
							message :"Please Select the From Cost and To Cost Feilds !!" ,
							duration : 10000,
							title : 'Error'
						});
					     return false;
				    } 
				 }
        	 if(parseFloat(row.fromColorDiamondCost) > parseFloat(row.toColorDiamondCost)){
				 $.growl.error({
					message :"From Cost Range Should be Less then To Cost Range!!" ,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
        	if((row.cpRate) == null || (row.cpRate) == ""){
				 $.growl.error({
					message :"Please enter CP!!" ,
					duration : 10000,
					title : 'Error'
				});
				return false;
			 }
        	if((row.sp) == null ||  (row.sp) == ""){
        		 $.growl.error({
 					message :"Please enter SP!!" ,
 					duration : 10000,
 					title : 'Error'
 				});
 				return false;
        	}
     		var stoneCostRangeMupId =  $("#jqxgridStnArtleEdit").jqxGrid("getCellvalue", row , 'stoneDetailId');
     		
			if(row.dataDTO == "" || row.dataDTO == null){
			  $.growl.error({
					message :"Please fill Table Ref field !!" ,
					duration : 10000,
					title : 'Error'
				});
			     return false;
		     } 
			 if(row.exchangePerc == null || row.dpPerc == null){
				 $.growl.error({
						message :"Please fill Exchange %  and DP % Fields!!" ,
						duration : 10000,
						title : 'Error'
					});
				     return false; 
			 }
     		 
			/*if(row.exchangePerc == 0 || row.exchangePerc >=0){ }
			else{
				 if(row.exchangePerc < 0 || row.exchangePerc == null || row.exchangePerc ==""){			
					 $.growl.error({
						message :"Please fill Exchange % field !!" ,
						duration : 10000,
						title : 'Error'
					});
				     return false;
				}
		   }*/
	       /*if(row.dpPerc == 0 || row.dpPerc >=0){
				
		   }else{
	          if(row.dpPerc < 0 || row.dpPerc == null || row.dpPerc ==""){	
				 $.growl.error({
						message :"Please fill DP % field !!" ,
						duration : 10000,
						title : 'Error'
					});
				 return false;
			}
		 } */
	       
		var mainSegment = $("#samStoneCatE option:selected").text();
	}
	for (var i = 0; i < rows.length; i++) {
			var row = rows[i];	
		
			var stoneCostRangeMupId =  $("#jqxgridStnArtleEdit").jqxGrid("getCellvalue", row , 'stoneDetailId');
			var statusEditableFeildID =  $("#jqxgridStnArtleEdit").jqxGrid("getCellvalue", row , 'statusEditableFeild');
			
			
  if(statusEditableFeildID == true){
	     if( stoneCostRangeMupId == "" || stoneCostRangeMupId == null){
				
				 var mainSegment = $("#samStoneCatE option:selected").text();	
				 var segType = $("#samStoneSegE option:selected").text();
				
				 if(mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers" ||  
			    		segType== "Precious Stones" || segType == "Other Stones"){
					 stoneArtMasterEditArr.push({
								"stoneDetailId": null,
								"cut": row.cut,
								"code":row.articleCode,
								"psOrOs":($("#samStoneSegE option:selected").text() == "Precious Stone") ? "os" : "ps",
							    "colorDiamond":((mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers")) ? "cd" : "ps",
							    "articleDescription":row.articleDescription,
							    "clarity": row.clarity,
							    "color": row.color,
							    "actualColor": row.actualColor,
							    "slab": row.slab,
							    "isActive": false,
							    "sellingRate": row.sp,
							    "directPurchasePercentage": row.dpPerc,
							    "exchangePercentage": row.exchangePerc,
							    "rapRate": row.rapRateCode,
							    "rapRateInDollar": row.rapRate,
							    "dis": (row.disPerc == null) ? 0 : row.disPerc,
							    "prm": (row.prmPerc == null) ? 0 : row.prmPerc,
							    "pCtRateInDollars": row.cp,
							    "rateInDollar": row.rateC,
							    "costPriceInRs": row.cpRate,
							    "sp_tab_ref": (row.sp_tab_ref),
							    "mup_perc": row.mupPerc,
							    "fromColorDiamondCost": row.fromColorDiamondCost,
							    "toColorDiamondCost": row.toColorDiamondCost,
							    "colordiamondCostSlab": row.fromColorDiamondCost +"-"+ row.toColorDiamondCost,
							    "startDate": row.startDate,
							    "enddate": row.enddate
					    });
				    }else{
				    	stoneArtMasterEditArr.push({
								"stoneDetailId": null,
								"cut": row.cut,
								"code":row.articleCode,
								"psOrOs":($("#samStoneSegE option:selected").text() == "Precious Stone") ? "os" : "ps",
								"colorDiamond":((mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers")) ? "cd" : "ps",
								"articleDescription":row.articleDescription,
							    "clarity": row.clarity,
							    "color": row.color,
							    "actualColor": row.actualColor,
							    "slab": row.slab,
							    "isActive": false,
							    "sellingRate": row.sp,
							    "directPurchasePercentage": row.dpPerc,
							    "exchangePercentage": row.exchangePerc,
							    "rapRate": row.rapRateCode,
							    "rapRateInDollar": row.rapRate,
							    "dis": row.disPerc,
							    "prm": row.prmPerc,
							    "pCtRateInDollars": row.cp,
							    "rateInDollar": row.rateC,
							    "costPriceInRs": row.cpRate,
							    "sp_tab_ref": row.sp_tab_ref,
							    "mup_perc": row.mupPerc,
							    "colordiamondCostSlab": "",
							    "startDate": row.startDate,
							    "enddate": row.enddate
					    });
				    }
		     }else{
					 var mainSegment = $("#samStoneCatE option:selected").text();	
					 var segType = $("#samStoneSegE option:selected").text();
					 if(mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers" ||segType== "Precious Stones" || segType == "Other Stones"){
						 stoneArtMasterEditArr.push({						
								    "stoneDetailId": row.stoneDetailId,
								    "cut": row.cut,
								    "clarity": row.clarity,
								    "psOrOs":($("#samStoneSegC option:selected").text() == "Precious Stones") ? "os" : "ps",
								    "colorDiamond":((mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers")) ? "cd" : "ps",
								    "color": row.color,
								    "articleDescription":row.articleDescription,
								    "actualColor": row.actualColor,
								    "slab": row.slab,
								    "isActive": false,
								    "sellingRate": row.sp,
								    "directPurchasePercentage": row.dpPerc,
								    "exchangePercentage": row.exchangePerc,
								    "rapRate": row.rapRateCode,
								    "rapRateInDollar": row.rapRate,
								    "dis": row.disPerc,
								    "prm": row.prmPerc,
								    "pCtRateInDollars": row.cp,
								    "rateInDollar": row.rateC,
								    "costPriceInRs": row.cpRate,
								    "sp_tab_ref": row.sp_tab_ref,
								    "mup_perc": row.mupPerc,
								    "fromColorDiamondCost": row.fromColorDiamondCost,
								    "toColorDiamondCost": row.toColorDiamondCost,
								  
								    "colordiamondCostSlab": row.fromColorDiamondCost +"-"+ row.toColorDiamondCost,
								    "startDate": row.startDate,
								    "enddate": row.enddate
						   });
					}else{
						stoneArtMasterEditArr.push({							
								    "stoneDetailId": row.stoneDetailId,
								    "cut": row.cut,
								    "clarity": row.clarity,
								    "psOrOs":($("#samStoneSegC option:selected").text() == "Precious Stones") ? "os" : "ps",
								    "colorDiamond":((mainSegment == "CD Solitaire" || mainSegment  == "CD Melees" || mainSegment == "CD Pointers")) ? "cd" : "ps",
								    "color": row.color,
								    "articleDescription":row.articleDescription,
								    "actualColor": row.actualColor,
								    "slab": row.slab,
								    "isActive": false,
								    "sellingRate": row.sp,
								    "directPurchasePercentage": row.dpPerc,
								    "exchangePercentage": row.exchangePerc,
								    "rapRate": row.rapRateCode,
								    "rapRateInDollar": row.rapRate,
								    "dis": row.disPerc,
								    "prm": row.prmPerc,
								    "pCtRateInDollars": row.cp,
								    "rateInDollar": row.rateC,
								    "costPriceInRs": row.cpRate,
								    "sp_tab_ref": row.sp_tab_ref,
								    "mup_perc": row.mupPerc,
								    "colordiamondCostSlab": "",
								    "startDate": row.startDate,
								    "enddate": row.enddate
						       });
						   }
					  }
			    } 
	      }
	}else{
		stoneArtMasterEditArr = [];
	}
	 	var stoneArtDetails = {
	 			   "id": $("#stoneHeaderId").val(),
	 			   "custHandlingCharges": $("#handlingChargesE").val(),
	 			   "hMasterDTO": {
	 			    "id": $("#hsnCodeE").val(),
	 			   },
				  "stoneDetail":stoneArtMasterEditArr
		   }
		return stoneArtDetails;
     }

$("#clearAll").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	window.location.href="javascript:showContentPage('solitaireStoneMaster', 'bodySwitcher')"
});

