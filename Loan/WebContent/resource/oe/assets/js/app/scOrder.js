/*  ##	Author1         : 	Dipankar(UI)
 * ##	Author2         : 	Pooja Sangve(UI)
	##  Author [SERVER] :   Nageshwar Rao(JAVA)
	##	Date Creation 	: 	22-03-2017
	## 	Description		:	Stock And Consignment Order (create For NO)
*/

/* #################################################################################### * */

var loadPermission  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	$(".layout-main button").each(function() {
		var value = '#'+this.id;
		var value2 = '#'+this.id+'C';
		var value3 = '#'+this.id+'S';
		var val = $(value).text();
		val = val.trim();
		if( val == "search" || val == "Search"){
			if(permission.canSearch == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}  
		
		if(val=="Create" || val=="create"){
			if(permission.canAdd == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if( val == "export" || val == "Export"){
			if(permission.canExport == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val == "print" || val == "Print"){
			if(permission.canPrint == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val == "delete" || val == "Delete"){
			if(permission.canDelete == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
	});
}

//loadPermission();

$("#orderFromDateC").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0,
	onSelect : function(dateStr) {
		var min = $(this).datepicker('getDate'); // Get selected date
		$("#orderToDateC").datepicker('option', 'minDate', min || '0');
	}
});

var today = new Date();
$("#orderToDateC").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0
});

$("#desgnStatusDate").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
// maxDate : 0,
});

$("#DsignDueDate").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	minDate : 0,
});

// date-picker
$("#orderFromDate").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0,
	onSelect : function(dateStr) {
		var min = $(this).datepicker('getDate'); // Get selected date
		$("#orderToDate").datepicker('option', 'minDate', min || '0');
	}
});

var updates = new Object();
$("#orderDate").datepicker({
	changeMonth: true,
	changeYear: true,
	maxDate : 0,
	dateFormat: "dd/mm/yy",
});

var today = new Date();
$("#orderToDate").datepicker({
	changeMonth : true,
	changeYear : true,
	dateFormat : "dd/mm/yy",
	maxDate : 0
});

var fullDate = new Date();
var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate
		.getMonth() + 1) :  (fullDate.getMonth() + 1);
var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/"
		+ fullDate.getFullYear();

//################################### hide And Show #####################

var deletionFunc = function(){
	var accrows = $("#jqxgridAcc").jqxGrid('getrows');	
	var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');			
	var rowscount = $("#jqxgridAcc").jqxGrid('getdatainformation').rowscount;			
	var rowsStone = $("#stoneMasterGrid").jqxGrid('getrows');				
	var rowsAcc = $("#accMasterGrid").jqxGrid('getrows');						
	var rowsDesign = $("#designDetGrid").jqxGrid('getrows');				
	var rowsAttr = $("#attributeDetSection").jqxGrid('getrows');						
	var metalDet = $("#metalPropDetSection").jqxGrid('getrows');
	
     if (typeof metalDet != "undefined") {
	     for (var a = 0; a < metalDet.length; a++) {
	     var idAcc = accrows[selectedrowindex].serialNo;
	     	if (metalDet[a].artLinkSlNo == idAcc) {
			     var idVal = $("#metalPropDetSection").jqxGrid('getrowid',a);
			     var commit = $("#metalPropDetSection").jqxGrid('deleterow',idVal);	
				}
			}
		}					
		if (typeof rowsAttr != "undefined") {									
			for (var r = 0; r < rowsAttr.length; r++) {
			var idAcc = accrows[selectedrowindex].serialNo;
			  if (rowsAttr[r].artLinkSlNo == idAcc) {
					var idVal = $("#attributeDetSection").jqxGrid('getrowid',r);											
					var commit = $("#attributeDetSection").jqxGrid('deleterow',idVal);	
		    	}
		    }	
		}
		if (typeof rowsDesign != "undefined") {
			for (var i = 0; i < rowsDesign.length; i++) {
			var idAcc = accrows[selectedrowindex].serialNo;
				if (rowsDesign[i].artLinkSlNo == idAcc) {
					var idVal = $("#designDetGrid").jqxGrid('getrowid',i);
					var commit = $("#designDetGrid").jqxGrid('deleterow',idVal);	
				}
			}
		}
		if (typeof rowsStone != "undefined") {
			for (var k = 0; k < rowsStone.length; k++) {
				var idAcc = accrows[selectedrowindex].serialNo;
				if (rowsStone[k].artLinkSlNo == idAcc) {
					var idVal = $("#stoneMasterGrid").jqxGrid('getrowid',k);		
					var commit = $("#stoneMasterGrid").jqxGrid('deleterow',idVal);
					k = k - 1;
				}
			}
		}
		if (typeof rowsAcc != "undefined") {
			for (var m = 0; m < rowsAcc.length; m++) {
				var idAcc = accrows[selectedrowindex].serialNo;
				if (rowsAcc[m].artLinkSlNo == idAcc) {	
					var idVal = $("#accMasterGrid").jqxGrid('getrowid',m);
					var commit = $("#accMasterGrid").jqxGrid('deleterow',idVal);
					m = m - 1;
				 }
			 }
		  }		
		 if (typeof accrows != "undefined") {
			   for (var p = 0; p < accrows.length; p++) {
  		        if(accrows[p].orderKind == "SSP"){
	  		    var idAccp = accrows[p].linkedToSrNoN;
	  		    var idAccp1 = accrows[p].serialNo;
				if (accrows[selectedrowindex].serialNo == idAccp) {	
					if (typeof rowsAttr != "undefined") {									
						for (var r = 0; r < rowsAttr.length; r++) {
						   if (rowsAttr[r].artLinkSlNo == idAccp1) {
						 		var idVal = $("#attributeDetSection").jqxGrid('getrowid',r);											
								var commit = $("#attributeDetSection").jqxGrid('deleterow',idVal);	
					    	}
						}
					}
					if (typeof metalDet != "undefined") {
				        for (var a = 0; a < metalDet.length; a++) {
					     	if (metalDet[a].artLinkSlNo == idAccp1) {
							     var idVal = $("#metalPropDetSection").jqxGrid('getrowid',a);
							     var commit = $("#metalPropDetSection").jqxGrid('deleterow',idVal);	
								}
						   }
					 }	
					
					if (typeof rowsDesign != "undefined") {
						for (var i = 0; i < rowsDesign.length; i++) {
							if (rowsDesign[i].artLinkSlNo == idAccp1) {
								var idVal = $("#designDetGrid").jqxGrid('getrowid',i);
								var commit = $("#designDetGrid").jqxGrid('deleterow',idVal);	
							}
						}
					}
				   if (typeof rowsStone != "undefined") {
						for (var k = 0; k < rowsStone.length; k++) {
							if (rowsStone[k].artLinkSlNo == idAccp1) {
								var idVal = $("#stoneMasterGrid").jqxGrid('getrowid',k);		
								var commit = $("#stoneMasterGrid").jqxGrid('deleterow',idVal);
								k = k - 1;
							}
						}
					} 
				   if (typeof rowsAcc != "undefined") {
						for (var m = 0; m < rowsAcc.length; m++) {
							if (rowsAcc[m].artLinkSlNo == idAccp1) {	
								var idVal = $("#accMasterGrid").jqxGrid('getrowid',m);
								var commit = $("#accMasterGrid").jqxGrid('deleterow',idVal);
								m = m - 1;
							 }
						 }
					  }		
                  }
		       }
			}
		 }
		 if (typeof accrows != "undefined") {
			for (var p = 0; p < accrows.length; p++) {
	    		   if(accrows[p].orderKind == "SSP"){
	    			    var idAccp = accrows[p].linkedToSrNoN;
	    			    var idAccp1 = accrows[p].serialNo;
						if (accrows[selectedrowindex].serialNo == idAccp) {	
							 var id = $("#jqxgridAcc").jqxGrid('getrowid',p);
							 var commit = $("#jqxgridAcc").jqxGrid('deleterow',id);
						}
	    		   }
	    	   }
		   }
	       if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
	            var id = $("#jqxgridAcc").jqxGrid('getrowid',selectedrowindex);
				var commit = $("#jqxgridAcc").jqxGrid('deleterow',id);
	        }
	     /*
	      * this is commented for time being ,need clarification that why we are writing this code
	      * for (var j = 0; j < rowscount; j++) {
			$("#jqxgridAcc").jqxGrid("setcellvalue", j,"serialNo", j + 1);
			$("#stoneMasterGrid").jqxGrid("setcellvalue",j,"artLinkSlNo",j + 1);
			$("#accMasterGrid").jqxGrid("setcellvalue",j,"artLinkSlNo",j + 1);
			$("#designDetGrid").jqxGrid("setcellvalue",j,"artLinkSlNo",j + 1);
			$("#attributeDetSection").jqxGrid("setcellvalue",j,"artLinkSlNo",j + 1);
			$("#metalPropDetSection").jqxGrid("setcellvalue",j,"artLinkSlNo",j + 1);
      }*/
}

$("#jqxgridAcc").jqxGrid('clear');
$("#jqxgridAcc").hide();
$("#goback").hide();
$("#headerScOrder").hide();
$("#searchScOrderSection").show();
$("#saveSCOrder").hide();
$("#saveSCOrderEdit").hide();
$("#orderTypeHide").hide();

var redirect = function() {
	window.location.href = "javascript:showContentPage('scOrders', 'bodySwitcher')";
	return window.location.href;
}

var showHideField = function(){
	var stoneSeg = $("#stoneSeg option:selected").attr('code');
	var stoneMainCat = $("#stoneMainCat option:selected").attr('code');
	var stoneSuppBy  = $("#stoneSuppBy").val();
	if(stoneSuppBy == "V"){
		$("#jwStonePcsSection").show();
		$("#jwStoneWtSection").show();
		$("#jwPriceSection").show();
		
		$("#dplStonePcsSection").hide();
		$("#dplStoneWtSection").hide();
		$("#stonePriceSection").hide();
	}else if(stoneSuppBy == "CO"){
		$("#jwStonePcsSection").hide();
		$("#jwStoneWtSection").hide();
		$("#jwPriceSection").hide();
		
		$("#dplStonePcsSection").show();
		$("#dplStoneWtSection").show();
		$("#stonePriceSection").show();
	}else{
		$("#jwStonePcsSection").show();
		$("#jwStoneWtSection").show();
		$("#jwPriceSection").show();
		$("#dplStonePcsSection").show();
		$("#dplStoneWtSection").show();
		$("#stonePriceSection").show();
	}
	
	if(stoneSeg == "DI"){
		$("#actualColorSection").hide();
		$("#stoneSubCatSection").hide();
		$("#stoneShapeSection").show();
		$("#wtRangeSection").show();
		$("#claritySection").show();
		$("#colorSection").show();
		$("#cutGradeSection").show();
		
		if(stoneMainCat == "CM" || stoneMainCat == "CP" || stoneMainCat == "CS"){
			$("#actualColorSection").show();
		}
	}else{
		$("#actualColorSection").hide();
		$("#stoneSubCatSection").show();
		$("#stoneShapeSection").hide();
		$("#wtRangeSection").hide();
		$("#claritySection").hide();
		$("#colorSection").hide();
		$("#cutGradeSection").hide();
	}
}

//var flagStoneValid = false;
var validateStoneModel = function(){
		 if($('#stoneSuppBy').val()=="CO"){
			 if($("#dplStonePcs").val() == ""){
				 $.growl.error({
					 message : "Please Enter Pcs !!!",
					 duration : 10000,
					 title : 'Error'
				 });
				 return false;
			 }else if($("#dplStonePcs").val() == 0){
				 $.growl.error({
					 message : "Pcs Should not be 0!!!",
					 duration : 10000,
					 title : 'Error'
				 });
				 return false;
			 }else if($("#dplStoneWt").val() == ""){
				 $.growl.error({
					 message : "Please Enter Weight !!!",
					 duration : 10000,
					 title : 'Error'
				 });
				 return false;
			 }else if($("#dplStoneWt").val() == 0){
				 $.growl.error({
					 message : "Weight Should not be 0!!!",
					 duration : 10000,
					 title : 'Error'
				 });
				 return false;
			 }else{
				 return true;
			 }
	   }else if($('#stoneSuppBy').val()=="V"){
		
		 if($("#jwStonePcs").val() == ""){
			 $.growl.error({
				 message : "Please Enter Pcs !!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
	    }else if($("#jwStonePcs").val() == 0){
			 $.growl.error({
				 message : "Pcs Should not be 0!!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
		 }else if($("#jwStoneWt").val() == ""){
			 $.growl.error({
				 message : "Please Enter Weight !!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
		 }else if($("#jwStoneWt").val() == 0){
			 $.growl.error({
				 message : "Weight Should not be 0!!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
		 }else{
		    return true;
	   }
	 }else if($('#stoneSuppBy').val()=="COV"){
		 if(($("#jwStonePcs").val() == "") || ($("#dplStonePcs").val() == "")){
			 $.growl.error({
				 message : "Please Enter Pcs !!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
	    }else if(($("#jwStonePcs").val() == 0) || ($("#dplStonePcs").val() == 0)){
	    	$.growl.error({
				 message : "Pcs Should not be 0!!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
	    }else if($("#jwStoneWt").val() == "" || $("#dplStoneWt").val() == ""){
			 $.growl.error({
				 message : "Please Enter Weights !!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
		 }else if( $("#dplStoneWt").val() == 0 || $("#jwStoneWt").val() == 0){
			 $.growl.error({
				 message : "Weight Should not be 0!!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
		 }else{
			 return true;
		 }
	 }
	return true;
 }

var validateAccModel = function(){
	if($("#accSupBy").val()=="CO"){
		if($("#compAccPcs").val() == ""){
			$.growl.error({
				message : "Please Enter Acc Pieces !!!",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}else if($("#compAccPcs").val() == 0){
			 $.growl.error({
				 message : "Pieces Should not be 0!!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
		}else{
			return true;
		}
	}else if($("#accSupBy").val()=="V"){
		if($("#jwAccPcs").val() == ""){
			$.growl.error({
				message : "Please Enter Acc Pieces !!!",
				duration : 10000,
				title : 'Error'
			});
		  return false;
		}else if($("#jwAccPcs").val() == 0){
			 $.growl.error({
				 message : "Pieces Should not be 0!!!",
				 duration : 10000,
				 title : 'Error'
			 });
			 return false;
		}else{
			return true;
		}
	}else if($("#accSupBy").val()=="COV"){
		if($("#jwAccPcs").val() == "" || $("#compAccPcs").val() == ""){
			$.growl.error({
				message : "Please Enter Acc Pieces !!!",
				duration : 10000,
				title : 'Error'
			});
		  return false;
	 }else if($("#jwAccPcs").val() == 0 || $("#compAccPcs").val() == 0){
		 $.growl.error({
			 message : "Pieces Should not be 0!!!",
			 duration : 10000,
			 title : 'Error'
		 });
		 return false;
	}else{
		return true;
	}
  }
	return true;
}
$("#orderTypeC").prop("disabled",false);
//################################ Grid For Create and Edit Started #############################

var selectedRowDataArr = [];
var segmentArr = [];
var metalArr = [];
var segId = null;

var createStockConsignmentGrid = function(segId,data) {
	var addAttrDet = function(row, column, value) {
		var rows = $("#jqxgridAcc").jqxGrid('getrows');
			if(segId == 1){
				if(rows[row].orderItemStatus == 'G' || rows[row].orderItemStatus === ""){
						if (rows[row].orderKind == 'SSP' ) {
							return "";
						}else{
						 return '<button class="btn btn-sm btn-primary" onclick="addAttrDet();" data-toggle="modal" id="attrDisabled" data-target="#addAttDetails" style="display: block; margin-left:auto; margin-right:auto;  margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>  </button>';
						}
					}else{
						return '<button class="btn btn-sm btn-primary" disabled onclick="addAttrDet();" data-toggle="modal" id="attrDisabled" data-target="#addAttDetails" style="display: block; margin-left:auto; margin-right:auto;  margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>  </button>';
					}
			}else{
				if(segId == null){
					if (rows[row].orderKind == 'SSP') {
						return "";
					} else {
						return '<button class="btn btn-sm btn-primary" onclick="addAttrDet();" data-toggle="modal" id="attrDisabled" data-target="#addAttDetails" style="display: block; margin-left:auto; margin-right:auto;  margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>  </button>';
					}
				}
			}
	     }

	var addDesignDet = function(row, column, value) {
		var rows = $("#jqxgridAcc").jqxGrid('getrows');
		if(segId == 1){
			if(rows[row].orderItemStatus == 'G' || rows[row].orderItemStatus === ""){
					if(rows[row].orderKind == 'SSP' ) {
						return "";
					}else{
					 return '<button class="btn btn-sm btn-primary" onclick="addDesign();" data-toggle="modal" id="designDisabled" data-target="#DesignDetSC" style="display: block; margin-left:auto; margin-right:auto;  margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>  </button>';
					}
				}else{
					if(rows[row].orderKind == 'SSP' ){
						return "";
					}else{
					    return '<button class="btn btn-sm btn-primary" disabled onclick="addDesign();" data-toggle="modal" id="attrDisabled" data-target="#DesignDetSC" style="display: block; margin-left:auto; margin-right:auto;  margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>  </button>';
					}
				}
		}else{
			if(segId == null){
				if (rows[row].orderKind == 'SSP') {
					return "";
				} else {
					return '<button class="btn btn-sm btn-primary" onclick="addDesign();" data-toggle="modal" id="designDisabled" data-target="#DesignDetSC" style="display: block; margin-left:auto; margin-right:auto;  margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>  </button>';
				}
			}
		}
	}

	var finvendor = function(row, column, value) {
		var rows = $("#jqxgridAcc").jqxGrid('getrows');
		if(segId == 1){
			return "";
		}else{
			if(segId == null){
					if (rows[row].orderKind == 'SSP'){
						return "";
					} else {
						return '<a id="fndVendorLink" data-toggle="modal" data-target="#findVendor" style="display: block; text-align:center; margin-top: 5px;"  /><i class="fa fa-search-plus fa-lg"></i>  </a>';
				}
			}
		}
	}
	
	var finarticle = function(row, column, value) {
		var rows = $("#jqxgridAcc").jqxGrid('getrows');
		
		if(segId == 1){
				return "";
			}else{
				if(segId == null){
					if (rows[row].orderKind == 'SSP'){
						return "";
					} else {
						return '<a class="" onclick="findArticle();" style="display: block; text-align:center; margin-top: 5px;"  /><i class="fa fa-search-plus fa-lg"></i>   </a>';
					}
			    }
			}
		}

	var addStoneDet = function(row, column, value) {
			var rows = $("#jqxgridAcc").jqxGrid('getrows');
			if(segId == 1){
				if(rows[row].orderItemStatus == 'G' || rows[row].orderItemStatus === ""){
						if(rows[row].orderKind == 'SSP' ) {
							return "";
						}else{
							return '<button class="btn btn-sm btn-primary" onclick="addStoneDet();" data-toggle="modal" data-target="#addStoneDet" style="display: block; margin-left:auto; margin-right:auto; margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>  </button>';
				        }
					}else{
						if(rows[row].orderKind == 'SSP' ){
							return "";
						}else{
							return '<button class="btn btn-sm btn-primary" disabled onclick="addStoneDet();" data-toggle="modal" data-target="#addStoneDet" style="display: block; margin-left:auto; margin-right:auto; margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>  </button>';
				        }
					}
			}else{
				if(segId == null){
					if (rows[row].orderKind == 'SSP') {
						return "";
					} else {
						return '<button class="btn btn-sm btn-primary" onclick="addStoneDet();" data-toggle="modal" data-target="#addStoneDet" style="display: block; margin-left:auto; margin-right:auto; margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>  </button>';
			        }
				}
			}
	  }
	var addAccDet = function(row, column, value){
		var rows = $("#jqxgridAcc").jqxGrid('getrows');
			if(segId == 1){
				if(rows[row].orderItemStatus == 'G' || rows[row].orderItemStatus === ""){
						if(rows[row].orderKind == 'SSP' ) {
							return "";
						}else{
							return '<button class="btn btn-sm btn-primary" onclick="addAccDet();" data-toggle="modal" data-target="#addAccDet" style="display: block; margin-left:auto; margin-right:auto; margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>   </button>';
						}
					}else{
						if(rows[row].orderKind == 'SSP' ){
							return "";
						}else{
							return '<button class="btn btn-sm btn-primary" disabled onclick="addAccDet();" data-toggle="modal" data-target="#addAccDet" style="display: block; margin-left:auto; margin-right:auto; margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>   </button>';
						}
					}
			}else{
				if(segId == null){
					if (rows[row].orderKind == 'SSP') {
						return "";
					} else{
						return '<button class="btn btn-sm btn-primary" onclick="addAccDet();" data-toggle="modal" data-target="#addAccDet" style="display: block; margin-left:auto; margin-right:auto; margin-top:5px;  padding-left: 10px;  padding-right: 10px; text-align:center; align:center;" 	type="button" /><i class="fa fa-plus fa-sm"></i>   </button>';
					}
				}
		   }
	  }
	
	var generaterow = function(i) {
		var row = {};
		row["orderDateFrom"] = "";
		row["orderDateTo"] = "";
		row["segment"] = "";
		row["jewelType"] = "";
		row["catId"] = "";
		row["subCatId"] = "";
		row["subCatName"] = "";
		row["subCatCode"] = "";
		row["mainCategoryId"] = "";
		row["mainCategoryName"] = "";
		row["mainCategoryCode"] = "";
		row["orderNo"] = "";
		row["vendorId"] = "";
		row["vendorName"] = "";
		row["orderTypeVal"] = $("#orderTypeC").val();
		row["orderType"] = $("#orderTypeC").val();
		row["orderDate"] = "";
		row["enteredBy"] = "";
		row["storeId"] = "";
		row["stockId"] = "";
		row["orderKind"] = "";
		row["serialNo"] = i;
		row["segType"] = "";
		row["metalType"] = "";
		row["orderItemStatus"] = "";
		row["labelName"] = "";
		row["vendorCode"] = "";
		row["articleCode"] = "";
		row["articleDesc"] = "";
		row["dueDate"] = "";
		row["metalCol"] = "";
		row["smPurity"] = "";
		row["smPurityId"] = "";
		row["smPurityDesc"] = "";
		row["metalWtType"] = "";
		row["linkedToSrNo"] = "";
		row["expWt"] = "";
		row["vendorInst"] = "";
		return row;
	}

	var segmentArr = [];
	var jtypeArr = [];
	var storesArr = [];
	var oKindArr = [];

	$.getJSON('/OrderExecution/api/v1/getOrderHeaderFieldValuesForSC',function(data) {
				var stores = data.payload.stores;
				var oKind = data.payload.oKind;
				$.each(stores,function(k,v){
					storesArr.push({"id" : v.id,"description" : v.name});
				})
				$.each(oKind,function(k,v){
					oKindArr.push({"id" : v.id,"description" : v.name,"name" : v.id})
				})
			});
	$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?page=search&criteria=sTypes&id=-1',function(data) {
		var res = data.payload.sTypes;
		$.each(res,function(k,v){
			segmentArr.push({"id" : v.id,"description" : v.description})
		})
	});

	var dropDownListSource = {
		datatype : 'json',datafields : [{name : 'id',type : 'int'}, {name : 'description',type : 'string'}],
		localdata : segmentArr
	};

	var dropDownListSourceStores = {
		datatype : 'json',datafields : [{name : 'id',type : 'int'}, {name : 'description',type : 'string'}],
		localdata : storesArr
	};

	var dropDownListSourceOkind = {
		datatype : 'json',datafields : [{name : 'id',type : 'int'}, {name : 'description',type : 'string'}],
		localdata : oKindArr
	};

	var dropdownListAdapter = new $.jqx.dataAdapter(dropDownListSource, {
		autoBind : true,
		async : false
	});
	var dropdownListAdapterStores = new $.jqx.dataAdapter(
			dropDownListSourceStores, {
				autoBind : true,
				async : false
			});
	var dropdownListAdapterOkind = new $.jqx.dataAdapter(
			dropDownListSourceOkind, {
				autoBind : true,
				async : false
			});
	
	if(segId != null){
		
	var source = {
			
	        localdata: data,
	        datatype: "json",
			datafields : [ 
				{name : 'stockNumber',type : 'int','map':'stockNumber'}, 
				{name : 'stockId',type : 'int','map':'id'}, 
				{name : 'serialNo',type : 'int','map':'serialNumber'}, 
				{name : 'orderDateFrom',type : 'date','map':'orderItemStatusDate'},
				{name : 'vendorInst',type: 'string','map':'jobWorkerInstruction'},
				{name : 'mainCategoryId',type : 'int','map':''}, 
				{name : 'mainCategoryName',type : 'string','map':''},
				{name : 'mainCategoryCode',	type : 'string','map':''},
				{name : 'linkedToSrNo',type : 'int','map':'linkedTosln>id'},
				{name : 'linkedToSrNoN',type : 'int','map':'linkedTosln>id'},
				{name : 'subCatId',type : 'int','map':''}, 
				{name : 'subCatName',type : 'string','map':''},
				{name : 'subCatCode',type : 'string','map':''},
				{name : 'articleIdMaster',type : 'string','map':'articleMaster>id'},
				{name : 'articleNameMaster',type : 'string','map':'articleMaster>name'},
				{name : 'articleDescMaster',type : 'string','map':'articleMaster>description'},
				{name : 'articleDesc',type : 'string', 'map':'articleMaster>description'},
				{name : 'orderDateTo',type : 'date','map':'orderDate'},
				{name : 'segment',type : 'string','map':'segId>id'},
				{name : 'segmentN',type : 'string','map':'segId>description'},
				{name : 'metalTypeVal',type : 'string','map':'metalId>description'},
				{name : 'vendorId',type : 'int','map':'vendor>id'},
				{name : 'vendorName',type : 'string','map':'vendor>id'},
				{name : 'articleCodeName',type : 'string','map':'articleMaster>name'},
				{name : 'vendorCodeName',type : 'string','map':'vendor>name'},
				{name : 'jewelTypeN',type : 'string','map':'jewelType>description'},
				{name : 'jewelType',type : 'string','map':'jewelType>id'},
				{name : 'catId',type : 'string','map':''},
				{name : 'subCatId',type : 'string','map':'subCategory>id'},
				{name : 'orderNo',type : 'string','map':'id'},
				{name : 'orderTypeVal',type : 'int','map':'orderItemStatusType'},
				{name : 'orderType',type : 'string','map':'orderType'},
				{name : 'orderItemStatus',type : 'string','map':'orderItemStatus'},
				{name : 'orderDate',type : 'date','map':'orderItemStatusDate'},
				{name : 'enteredBy',type : 'string','map':''},
				{name : 'currentOperation',type : 'string'},
				{name : 'storeId',type : 'string','map':'storeOrDc>id'},
				{name : 'storeIdN',type : 'string','map':'storeOrDc>name'},
				{name : 'orderKind',type : 'string','map':'oKind>id'},
				{name : 'orderKindN',type : 'string','map':'oKind>name'},
				{name : 'metalType',type : 'string','map':'metalId>id'},
				{name : 'metalTypeN',type : 'string','map':'metalId>description'},
				{name : 'labelName',type : 'string','map':'expectedPieces'},
				{name : 'vendorCode',type : 'string','map':'vendor>id'},
				{name : 'articleCode',type : 'string','map':'articleMaster>name'},
				{name : 'articleDesc',type : 'string','map':'articleMaster>description'},
				{name : 'dueDate',type : 'date','map':'orderItemDueDate'},
				{name : 'metalCol',type : 'string','map':'metalColor>id'},
				{name : 'metalColN',type : 'string','map':'metalColor>name'},
				{name : 'smPurityId',type : 'float','map':'orderItemSkinPurity>skinPurity'},
				{name : 'smPurityN',type : 'float','map':'orderItemSkinPurity>skinPurity'},
				{name : 'smPurity',type : 'float','map':'orderItemSkinPurity>skinPurity'},
				{name : 'metalWtType',type : 'string','map':'metalWeightType>id'},
				{name : 'metalWtTypeN',type : 'string','map':'metalWeightType>name'},
				{name : 'expWt',type : 'string','map':'expectedGrossWeight'},
				{name : 'expWtFrom',type : 'string','map':'expectedFromWeight'},
				{name : 'expWt',type : 'string','map':'expectedFromWeight'}, 
				{name : 'meltingPurity',type : 'string','map':'orderItemMeltingPurity'}, 
				{name : 'expWtTo',type : 'string','map':'expectedToWeight'},
				{name : 'vendorType',type : 'string'},
				{name : 'mapDealerRate',type : 'float'},
			]
		};
		var dataAdapter = new $.jqx.dataAdapter(source);
	}else{
	var source = {
		datafields : [
		{name : 'stockNumber',type : 'int'}, 
		{name : 'stockId',type : 'int'}, 
		{name : 'serialNo',type : 'int'}, 
		{name : 'orderDateFrom',type : 'date'},
		{name : 'vendorInst',type: 'string'},
		{name : 'mainCategoryId',type : 'int'}, 
		{name : 'mainCategoryName',type : 'string'},
		{name : 'mainCategoryCode',	type : 'string'},
		{name : 'linkedToSrNo',type : 'int'},
		{name : 'subCatId',type : 'int'}, 
		{name : 'subCatName',type : 'string'},
		{name : 'subCatCode',type : 'string'},
		{name : 'articleIdMaster',type : 'string'},
		{name : 'articleNameMaster',type : 'string'},
		{name : 'articleDescMaster',type : 'string'},
		{name : 'orderDateTo',type : 'date'},
		{name : 'segment',type : 'string'},
		{name : 'metalTypeVal',type : 'string'},
		{name : 'vendorId',type : 'int'},
		{name : 'orderItemStatus',type : 'string'},
		{name : 'vendorName',type : 'string'},
		{name : 'articleCodeName',type : 'string'},
		{name : 'vendorCodeName',type : 'string'},
		{name : 'jewelType',type : 'string'},
		{name : 'catId',type : 'string'},
		{name : 'subCatId',type : 'string'},
		{name : 'orderNo',type : 'string'},
		{name : 'orderTypeVal',type : 'int'},
		{name : 'orderType',type : 'string'},
		{name : 'orderDate',type : 'date'},
		{name : 'enteredBy',type : 'string'},
		{name : 'storeId',type : 'string'},
		{name : 'orderKind',type : 'string'},
		{name : 'metalType',type : 'string'},
		{name : 'metalTypeN',type : 'string'},
		{name : 'labelName',type : 'string'},
		{name : 'vendorCode',type : 'string'},
		{name : 'articleCode',type : 'string'},
		{name : 'articleDesc',type : 'string'},
		{name : 'dueDate',type : 'string'},
		{name : 'metalCol',type : 'string'},
		{name : 'smPurity',type : 'string'},
		{name : 'smPurityN',type : 'string'},
		{name : 'metalWtType',type : 'string'},
		{name : 'currentOperation',type : 'string'},
		{name : 'expWt',type : 'string'},
		{name : 'expWtFrom',type : 'string'},
		{name : 'vendorType',type : 'string'},
		{name : 'mapDealerRate',type : 'float'},
		{name : 'expWtTo',type : 'string'},
		{name : 'pairV',type : 'int'},
		{name : 'segmentN',	value : 'segment',
			values : {source : dropdownListAdapter.records,value : 'id',name : 'description'}
		}, {name : 'storeIdN',value : 'storeId',
			values : {source : dropdownListAdapterStores.records,value : 'id',name : 'description'}
		}, {name : 'orderKindN',value : 'orderKind',
			values : {source : dropdownListAdapterOkind.records,value : 'id',name : 'description'}
		} ],
		addrow : function(rowid, rowdata, position, commit) {
			commit(true);
		},
		deleterow : function(rowid, commit) {
			commit(true);
		},
		updaterow : function(rowid, newdata, commit) {
			commit(true);
		}
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	}
	var metalArr = [];

$("#jqxgridAcc").jqxGrid({
	        source : dataAdapter,
			width : '100%',
			editable : true,
			height : 200,
			columnsheight : 60,
			autorowheight : true,
			autoheight : true,
			altRows : true,
			columnsresize : true,
			showtoolbar : true,
			rendertoolbar : function(toolbar) {
				var me = this;
				var container = $("<div style='margin: 5px; margin-bottom:15px;'></div>");
				toolbar.append(container);
				container.append('<div class="col-md-4 row"><div style="margin-bottom:10px;"  id="addrowbutton" class="btn btn-primary btn-sm pull-left"><i class="fa fa-plus fa-md"></i></div></div>');
				container.append('<div class="col-md-4"><div style="margin-bottom:10px; color:#00800; font-size:15px;"  id="orderTypeLabel" class="text-center"></div></div>');
				container.append('<div class="col-md-4 pull-right"><div style="margin-bottom:10px;" id="deleterowbutton" class="btn btn-danger btn-sm pull-right"><i class="fa fa-trash fa-md"></i></div></div>');
				$("#addrowbutton").jqxButton();
				$("#deleterowbutton").jqxButton();

				var rows = $('#jqxgridAcc').jqxGrid('getrows');
				if(segId == 1){
					$.each(rows,function(k,v){
							$("#addrowbutton").attr('disabled',true);
					}) 
				}else if(segId == null){
					  $("#addrowbutton").prop("disabled",false);
				}
					
				$("#addrowbutton").on('click',function() {
					$("#orderTypeC").prop("disabled",true);
					if($("#orderTypeC").val() == "ST"){
						var orderTypeLabel = "Stock Order";
						$("#orderTypeLabel").html(orderTypeLabel);
					}else{
						var orderTypeLabel = "Consignment Order";
						$("#orderTypeLabel").html(orderTypeLabel);
					}
					
					var orderTypeC = $("#orderTypeC").val();
					if(segId == null){
					if (orderTypeC == "" || orderTypeC == null) {
						$.growl.error({
							message : "Please select order type.",
							duration : 10000
						});
						return false;
					}
					}
					var rowscount = $("#jqxgridAcc").jqxGrid('getdatainformation').rowscount;
						if (rowscount == 0) {
							   var rowId = 1;
						}else{
							var rowId = rowscount + 1;
							var rows = $('#jqxgridAcc').jqxGrid('getrows');
									
					     for (var i = 0; i < rowscount; i++) {
						 if (rows[i].orderKind == "SSP"){
							  if(rows[i].linkedToSrNo == ""){
									  $.growl.error({
											message : "Please  select the linked Serial No !!",
											duration : 10000,
											title : 'Error'
										});
									  return false;
								    }
						    if (rows[i].segment == ""|| rows[i].segmentN == ""	|| rows[i].expWt == ""	|| rows[i].metalWtTypeN == ""
									|| rows[i].meltingPurity == ""|| rows[i].metalColN == ""
									|| rows[i].vendorCode == ""|| rows[i].labelName == ""|| rows[i].orderKind == ""
									|| rows[i].jewelType == "") {
									$.growl.error({
										message : "Please fill mandatory fields.",
										duration : 10000,
										title : 'Error'
									});
									return false;
								}
						 }else if(rows[i].orderKind == "SRP" || rows[i].orderKind == "NO"){
							    if (rows[i].segment == ""|| rows[i].segmentN == ""	|| rows[i].expWt == ""	|| rows[i].metalWtTypeN == ""
									|| rows[i].meltingPurity == ""|| rows[i].metalColN == ""
									|| rows[i].vendorCode == ""|| rows[i].labelName == ""|| rows[i].orderKind == ""||
									rows[i].storeId == ""|| rows[i].jewelType == "") {
											$.growl.error({
												message : "Please fill mandatory fields.",
												duration : 10000,
												title : 'Error'
											});
											return false;
										}
								  }
						      }
						 }		
							var datarow = generaterow(rowId);
							var commit = $("#jqxgridAcc").jqxGrid('addrow',null, datarow);
						});				

			     	// delete row.
					$("#deleterowbutton").on('click',function() {
						var accrows = $("#jqxgridAcc").jqxGrid('getrows');	
						var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');			
							if(segId == null){
								deletionFunc();
							   }else{
					        	 if(accrows[selectedrowindex].stockId == null || accrows[selectedrowindex].stockId === ""){
					        		 deletionFunc();
					        	     }else{ }
					             }
						   });
					    },
						columns : [
								{text : '',datafield : 'pairV',editable : false,hidden : true},
								{text : 'vendor Type',datafield : 'vendorType',hidden:true},
								{text : 'map Dealer Rate',datafield : 'mapDealerRate',hidden:true},
								{text : 'Stock ID',datafield : 'stockId',hidden:true},
								{text : 'order Item Status',datafield : 'orderItemStatus',hidden:true},
								{text : 'Stock ID',datafield : 'stockNumber',hidden:true},
								{text : 'Gross Wt',datafield : 'preRepairGrossWeight',hidden:true},
								{text : 'Net Wt',datafield : 'preRepairNetWeight',hidden:true},
							    {text : '',datafield : 'articleIdMaster',hidden:true},
							    {text : '',datafield : 'articleNameMaster',hidden:true},
							    {text : '',datafield : 'articleDescMaster',hidden:true},
							    {datafield : 'currentOperation',hidden:true},
								{text : 'Sl No.',datafield : 'serialNo',width : '2%',cellsalign : 'center',align : 'center',editable : false},
								{
									text : 'Order Kind',datafield : 'orderKind',width : '5%',cellsalign : 'center',displayfield : 'orderKindN',align : 'center',editable : true,columntype : 'dropdownlist',
									createeditor : function(row, cellvalue,editor) {
										var arr = [];
										var Arr = [];
										var orderType = $("#orderTypeC").val();
										$.each(dropdownListAdapterOkind.loadedData,function(k,v){
									         if(orderType == "CO"){
												 if((v.id != "SSP" && v.id !="SRP")){
													 arr.push(v);
												 }
											 }else{
												 arr.push(v);
											 }
										})
											if(orderType == "CO"){
											 $.each(arr,function(K,V){
												 if(V.id != "SSP" && V.id !="SRP" ){
													 Arr.push(V);
												 }
											  });
											}else{
												 $.each(arr,function(K,V){
												    Arr.push(V);
												 });
											}
										editor.jqxDropDownList({source : Arr,displayMember : 'description',	valueMember : 'id'});
									},
									cellbeginedit : function(row) {
										var rows = $('#jqxgridAcc').jqxGrid('getrows');
										if (rows[row].orderKind == "NO"|| rows[row].orderKind == "SRP"|| rows[row].orderKind == "SSP") {
											return false;
										}
									},
									cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
										$("#sspSrpDetailVal").append();
										var fieldSRP = '';
										var fieldSSP = '';

										if (row == 0 && (newvalue.value == "SSP")) {
											$.growl.error({
													message : "Please select order kind NO/SRP as first line item.",
													duration : 10000,
													title : 'Error'
											});
											return false;
										}

										if (newvalue.value == 'SRP') {
											$('#sspSrpModal').modal('show');
											var rows = $("#jqxgridAcc").jqxGrid('getrows');
											fieldSRP = '<div class="col-md-6">'
												+ '<div class="col-xs-12 form-field">'
												+ '<span class="required">*</span><label>Stock No</label> <input type="text" class="form-control" id="stockNoId" onchange="addMetalPropts();" name="stockNoIdS"  placeholder="Enter Stock No" >'
												+ '</div>'
												+ '<div class="col-xs-12 form-field">'
												+ '<span class="required">*</span><label>Metal Color</label><select id="preRpmetalColor" name="preRpmetalColor" class="form-control"><option value="" selected label="--Select--" /></select>'
												+ '</div>'
												+ '<div class="col-xs-12 form-field">'
												+ '<span class="required">*</span><label>skin purity</label><select id="preRepairSP" onchange="addMeltiP();" name="preRepairSP" class="form-control"><option value="" selected label="--Select--" /></select>'
												+ '</div>'
												
												+ '</div>'
												+ '<div class="col-md-6">'
												+ '<div class="col-xs-12 form-field">'
												+ '<span class="required">*</span><label>Melting purity</label><input type="text" disabled class="form-control" id="preRepairMP" name="preRepairMP" disabled placeholder="Pre-repair gross Wt">'
												+ '</div>'
												+ '<div class="col-xs-12 form-field">'
												+ '<span class="required">*</span><label>Pre-repair gross Wt</label> <input type="text"  disabled class="form-control" onblur="threeDec(this.value, 3, this.id)" id="preRepairGrWt" name="preRepairGrWt"  placeholder="Pre-repair gross Wt">'
												+ '</div>'
												+ '<div class="col-xs-12 form-field">'
												+ '<span class="required">*</span><label>Pre-repair net Wt</label> <input type="text" disabled class="form-control" onblur="threeDec(this.value, 3, this.id)" id="preRepairNetWt" name="preRepairNetWt"  placeholder="Pre-repair gross Wt">'
												+ '</div>'
												+ '</div>';
												+ '</div>';
											$("#sspSrpDetailVal").html(fieldSRP);
											$("#jqxgridAcc").jqxGrid('setcellvalue', row,'orderKind', 'editable',newvalue.value);
										}

										if (row > 0 && newvalue.value == 'SSP') {
                                              
											$('#sspSrpModal').modal('show');
											fieldSSP =  '<div class="col-md-6">'
												+ '<div class="col-xs-12 form-field">'
												+ '<span class="required">*</span><label>Stock No</label> <input type="text" class="form-control" id="stockNoId" onchange="addMetalPropts();" name="stockNoIdS"  placeholder="Enter Stock No" >'
												+ '</div>'
												+ '<div class="col-xs-12 form-field">'
												+ '<span class="required">*</span><label>Metal Color</label><select id="preRpmetalColor" name="preRpmetalColor" class="form-control"><option value="" selected label="--Select--" /></select>'
												+ '</div>'
												+ '<div class="col-xs-12 form-field">'
												+ '<span class="required">*</span><label>skin purity</label><select id="preRepairSP" onchange="addMeltiP();" name="preRepairSP" class="form-control"><option value="" selected label="--Select--" /></select>'
												+ '</div>'
												
												+ '</div>'
												+ '<div class="col-md-6">'
												+ '<div class="col-xs-12 form-field">'
												+ '<span class="required">*</span><label>Melting purity</label><input type="text" disabled class="form-control" id="preRepairMP" name="preRepairMP" disabled placeholder="Pre-repair gross Wt">'
												+ '</div>'
												+ '<div class="col-xs-12 form-field">'
												+ '<span class="required">*</span><label>Finished gross Wt</label> <input type="text" disabled  class="form-control" onblur="threeDec(this.value, 3, this.id)" id="preRepairGrWt1" name="preRepairGrWt"  placeholder="Pre-repair gross Wt">'
												+ '</div>'
												+ '<div class="col-xs-12 form-field">'
												+ '<span class="required">*</span><label>Finished net Wt</label> <input type="text" disabled class="form-control" onblur="threeDec(this.value, 3, this.id)" id="preRepairNetWt1" name="preRepairNetWt"  placeholder="Pre-repair gross Wt">'
												+ '</div>'
												+ '</div>';

											$("#sspSrpDetailVal").html(fieldSSP);
											$("#jqxgridAcc").jqxGrid('setcellvalue', row,'orderKind', 'editable',newvalue.value);
										}
									}
								},{text : 'Seg',datafield : 'segment',width : '5%',cellsalign : 'center',align : 'center',displayfield : 'segmentN',editable : true,columntype : 'dropdownlist',
									createeditor : function(row, cellvalue,editor) {
										editor.jqxDropDownList({source : dropdownListAdapter,displayMember : 'description',valueMember : 'id'
										});
									},
									cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
										var rows = $('#jqxgridAcc').jqxGrid('getrows');
										var segment = rows[0].segmentN;
										if(rows.length > 1){
											if(segment == "Silver"){
												if(newvalue.label != "Silver"){
													$("#jqxgridAcc").jqxGrid('setcellvalue', row,'segmentN',null);
													$("#jqxgridAcc").jqxGrid('setcellvalue', row,'metalTypeN', null);
													$.growl.error({
														message : "Combination of this Segment is  not allowed",
														duration : 10000,
														title : 'Error'
													});
													return false;
												}else{
													$.getJSON('/OrderExecution/api/v1/getMetalTypeBySegment?segmentId='+newvalue.value,function(data) {
														$("#jqxgridAcc").jqxGrid('setcellvalue', row,'metalType', data.payload.metalType.id);
														$("#jqxgridAcc").jqxGrid('setcellvalue', row,'metalTypeN', data.payload.metalType.description);
													});
												}
											}else if(segment == "Diamond" || segment == "Gold" || segment == "Platinum"){
												if(newvalue.label == "Silver"){
													$("#jqxgridAcc").jqxGrid('setcellvalue', row,'segmentN',null);
													$("#jqxgridAcc").jqxGrid('setcellvalue', row,'metalTypeN', null);
													$.growl.error({
														message : "Combination of this Segment is  not allowed",
														duration : 10000,
														title : 'Error'
													});
													return false;
												}else{
													$.getJSON('/OrderExecution/api/v1/getMetalTypeBySegment?segmentId='+newvalue.value,function(data) {
														$("#jqxgridAcc").jqxGrid('setcellvalue', row,'metalType', data.payload.metalType.id);
														$("#jqxgridAcc").jqxGrid('setcellvalue', row,'metalTypeN', data.payload.metalType.description);
													});
												}
											}
										}else{
											$.getJSON('/OrderExecution/api/v1/getMetalTypeBySegment?segmentId='+newvalue.value,function(data) {
												$("#jqxgridAcc").jqxGrid('setcellvalue', row,'metalType', data.payload.metalType.id);
												$("#jqxgridAcc").jqxGrid('setcellvalue', row,'metalTypeN', data.payload.metalType.description);
											});
										}
									},
									cellbeginedit : function(row) {
										 var rows = $('#jqxgridAcc').jqxGrid('getrows');
										 var orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderKind');
										 var orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderItemStatus');
										 if(segId == null){
											if (orderKind == "SRP"|| orderKind == "SSP") {
												return false;
											}else{
												return true;
											}
										 }else{
											 if(orderItemStatus == "G" || orderItemStatus === ""){
												 if (orderKind == "SRP"|| orderKind == "SSP"){
													 return false;
												 }else{
													 return true;
												 }
											 }else{
												 return false;
											 }
										 }
									 }
								},{
									text : 'Metal Type',
									datafield : 'metalType',
									width : '5%',
									cellsalign : 'center',
									align : 'center',
									editable : false,
									hidden: true
								},{
									text : 'Metal Type',
									datafield : 'metalTypeN',
									width : '5%',
									cellsalign : 'center',
									align : 'center',
									editable : false
									
								},{
									text : 'Jewel Type',
									datafield : 'jewelType',
									width : '6%',
									cellsalign : 'center',
									displayfield : 'jewelTypeN',
									align : 'center',
									editable : true,
									columnType : 'dropdownlist',
									createeditor : function(row, cellvalue,editor) {
										editor.on('click',function(event) {
									      var rows = $("#jqxgridAcc").jqxGrid('getrows');
											$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?criteria=jewelType&id='+ rows[row].segment,function(data) {
												var res = data.payload.jewelType;
												editor.jqxDropDownList({
														source : res,
														displayMember : 'description',
														valueMember : 'id'
													});
											   });
										});
								   },
								   cellbeginedit : function(row) {
										 var rows = $('#jqxgridAcc').jqxGrid('getrows');
										 var orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderKind');
										 var orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderItemStatus');
										 if(segId == null){
											if (orderKind == "SRP"|| orderKind == "SSP") {
												return false;
											}else{
												return true;
											}
										 }else{
												 return false;
										 }
									},
									cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
										$("#jqxgridAcc").jqxGrid('setcellvalue', row,'labelName',null);
									}
								},{
									text : 'Store Id',
									datafield : 'storeId',
									width : '6%',
									cellsalign : 'center',
									displayfield : 'storeIdN',
									align : 'center',
									editable : true,
									columntype : 'dropdownlist',
									createeditor : function(row, cellvalue,editor) {
										editor.jqxDropDownList({source : dropdownListAdapterStores,displayMember : 'description',valueMember : 'id'});
									},
									 cellbeginedit : function(row) {
										 var rows = $('#jqxgridAcc').jqxGrid('getrows');
										 var orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderKind');
										 var orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderItemStatus');
										 if(segId == null){
												if (orderKind == "SRP"||orderKind == "NO") {
													return true;
												}else{
													return false;
												}
										}else{
											if(orderItemStatus == "G" || orderItemStatus === ""){
												 if (orderKind == "SSP" || orderKind == "NO" ){
													 return false;
												 }else{
													 return true;
											     }
											}else{
												return false;
											}
										}
									},
								},{
									text : 'Linked Sr No',
									datafield : 'linkedToSrNo',
									displayfield : 'linkedToSrNoN',
									width : '3.1%',
									cellsalign : 'center',
									align : 'center',
									editable : true,
									columntype : 'dropdownlist',
									createeditor : function(row, cellvalue,editor) {
										//editor.on('click',function(event) {
										var metalArrDropDown = [];
										var mArrDropDown = [];
										var rows = $("#jqxgridAcc").jqxGrid('getrows');
										
										for (var i = 0; i < rows.length; i++) {
										if (rows[i].orderKind == "NO"|| rows[i].orderKind == "SRP") {
										if (mArrDropDown.indexOf(rows[i].serialNo) === -1) {
										var metalbj = {
											"id" : rows[i].orderKind,
											"name" : rows[i].serialNo
										}
										mArrDropDown.push(rows[i].serialNo) 
										metalArrDropDown.push(metalbj);
											}
										}
									};
									editor.jqxDropDownList({source : metalArrDropDown,displayMember : 'name',valueMember : 'id'});
									   //});
									},
									cellbeginedit : function(row) {
										var rows = $('#jqxgridAcc').jqxGrid('getrows');
										if (rows[row].orderKind == "NO"|| rows[row].orderKind == "SRP") {
											return false;
										}
									},
									cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
										var rows = $("#jqxgridAcc").jqxGrid('getrows');
										var selectedrowindexMaster = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
										for (var i = 0; i < rows.length; i++) {
											if (rows[i].serialNo == newvalue.label) {
												$("#jqxgridAcc").jqxGrid('setcellvalue', row,'dueDate',rows[i].dueDate);
												$("#jqxgridAcc").jqxGrid('setcellvalue', row,'vendorCode',rows[i].vendorCode);
												$("#jqxgridAcc").jqxGrid('setcellvalue', row,'vendorCodeName',rows[i].vendorCodeName);
												$("#jqxgridAcc").jqxGrid('setcellvalue', row,'metalWtTypeN',rows[i].metalWtTypeN);
												$("#jqxgridAcc").jqxGrid('setcellvalue', row,'storeIdN',rows[i].storeIdN);
												$("#jqxgridAcc").jqxGrid('setcellvalue', row,'storeId',rows[i].storeId);
												}
											}
									   }
								},{
									text : 'Pcs/Pairs',
									datafield : 'labelName',
									width : '5%',
									cellsalign : 'center',
									align : 'center',
									editable : true,
									 cellbeginedit : function(row) {
										 var rows = $('#jqxgridAcc').jqxGrid('getrows');
										 var orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderKind');
										 var orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderItemStatus');
										 if(segId == null){
											if (orderKind == "SRP"|| orderKind == "SSP") {
												return false;
											}else{
												return true;
											}
										 }else{
												 return false;
										 }
									},
									cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
										$("#jqxgridAcc").jqxGrid('setcellvalue',row,'metalCol',null);
										$("#jqxgridAcc").jqxGrid('setcellvalue',row,'metalColN',null);
										$("#jqxgridAcc").jqxGrid('setcellvalue',row,'articleCodeName',null);
										$("#jqxgridAcc").jqxGrid('setcellvalue',row,'articleDesc',null);
										$("#jqxgridAcc").jqxGrid('setcellvalue',row,'articleCode',null);
									}
								},{
									text : '',
									datafield : 'vendorCode',
									width : '2%',
									cellsalign : 'center',
									editable : false,
									columngroup : 'vendorsgr',
									cellsrenderer : finvendor,
								},{
									text : 'Code',
									datafield : 'vendorCodeName',
									width : '3%',
									cellsalign : 'center',
									columngroup : 'vendorsgr',
									editable : false,
								},{
									text : '',
									datafield : 'articleCode',
									width : '2%',
									cellsalign : 'center',
									align : 'center',
									editable : false,
									columngroup : 'articlegr',
									cellsrenderer : finarticle,
								},{
									text : 'Code',
									datafield : 'articleCodeName',
									width : '5%',
									cellsalign : 'center',
									align : 'center',
									columngroup : 'articlegr',
									editable : false,
								},{
									text : 'Article Desc',
									datafield : 'articleDesc',
									width : '5%',
									cellsalign : 'center',
									align : 'center',
									editable : false,
								},{
									text : 'Due Date',
									datafield : 'dueDate',
									width : '4%',
									cellsalign : 'center',
									align : 'center',
									editable : true,
									columntype : 'datetimeinput',
									cellsformat : 'dd/MM/yyyy',
									createeditor : function(rowIndex,cellValue, editor) {
										var d = new Date();
										d.setDate(d.getDate() - 1);
										editor.jqxDateTimeInput('setMinDate', d.toLocaleString());
									},
									cellbeginedit : function(row){
									var rows = $('#jqxgridAcc').jqxGrid('getrows');
									var orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderKind');
									var orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderItemStatus');
										if(segId == 1){
											if(orderItemStatus == "G" || orderItemStatus === ""){
											  if (orderKind == "SSP" || orderKind == "SRP"){
												return false;
											  }else{
												  return true;
											  }
											}else{
												return false;
											}
										}else{
											return true;
										}
									},
									cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
										/*console.log(newvalue);
										if(newvalue == null){
											$.growl.error({
												message : "Due Date Cannot be Empty !!!",
												duration : 5000,
												title : 'Error'
											});
											return "";
										}*/
										var today = new Date();
										var dd = today.getDate();
										var mm = today.getMonth() + 1; //January is 0!

										var yyyy = today.getFullYear();
										if (dd < 10) {
										  dd = '0' + dd;
										} 
										if (mm < 10) {
										  mm = '0' + mm;
										} 
										var today = dd + '/' + mm + '/' + yyyy;
										
										var date = new Date(newvalue);
										var dd1 = date.getDate();
										var mm1 = date.getMonth() + 1; //January is 0!

										var yyyy1 = date.getFullYear();
										var newDt = dd1 + '/' + mm1 + '/' + yyyy1;
										
										if(newvalue != null && newDt < today ){
											$.growl.error({
												message : "Due Date Should be Greater than or Equal to " + today + " !!!",
												duration : 5000,
												title : 'Error'
											});
											return "";
										}
									}

								},{
									text : 'Metal Colour',
									datafield : 'metalCol',
									width : '7%',
									displayfield : 'metalColN',
									cellsalign : 'center',
									align : 'center',
									editable : true,
									columntype : 'dropdownlist',
									createeditor : function(row, cellvalue,editor) {
										editor.on('click',function(event) {
										var rows = $("#jqxgridAcc").jqxGrid('getrows');
										if(rows[row].segment == "" || rows[row].metalType == "" || rows[row].storeId == "" || rows[row].articleCode == ""){
											$.growl.error({
												message : "Please fill all mandatory fields.",
												duration : 10000,
												title : 'Error'
											});
											return false;
										}else{
											var fieldFilter = {
												"fieldFilters" : {
													"segId" : rows[row].segment,
													"metalId" : rows[row].metalType,
													"storeId" : rows[row].storeId
												}
											};
											
		                                       postJSON('/OrderExecution/api/v1/getMetalJewelTypesWithMetalPropertiesOE',JSON.stringify(fieldFilter),function(data) {
		                                	         if(data.resCode == 1){
		                                	        	 var res = [];
		                                	        	 res = data.payload.mProp.segMetalColors;
													     editor.jqxDropDownList({source : res,displayMember : 'name',valueMember : 'id'});
		                                	         }
												});
									         }
										  });
							           },
									cellbeginedit : function(row) {
										 var rows = $('#jqxgridAcc').jqxGrid('getrows');
										 var orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderKind');
										 var orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderItemStatus');
									     if(segId == 1){
									    	 if(orderItemStatus == "G" || orderItemStatus === ""){
												if (orderKind == "SRP"|| orderKind == "SSP"){
													return false;
												}else{
													return true;
												}
											}else{
												return false;
											}
									    }else{
									    	if (orderKind == "SRP"|| orderKind == "SSP") {
												return false;
											}else{
												return true;
											}
									    }
									},
									cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
										 var pairV =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'pairV');
										 var labelName =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'labelName');
										 var jwlType =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'jewelTypeN');
									 	 if(pairV == 1){
									 		if(labelName % 2 != 0){
									 			$.growl.error({
									 				message : "Please Enter Valid Pcs for " +jwlType+ " !!! ",
									 				duration : 10000,
									 				title : 'Error'
									 			});
									 			$("#jqxgridAcc").jqxGrid('setcellvalue',row,'labelName',"");
									 			return false;
									 		}
									 	}
									}
								},{
									text : 'Skin Purity',
									datafield : 'smPurity',
									displayfield : 'smPurityN',
									width : '4%',
									cellsalign : 'center',
									align : 'center',
									cellsformat : 'd2',
									editable : true,
									columntype : 'dropdownlist',
									createeditor : function(row, cellvalue,editor) {
										editor.on('click',function(event) {
										var rows = $("#jqxgridAcc").jqxGrid('getrows');
											var fieldFilter = {
												"fieldFilters" : {
													"segId" : rows[row].segment,
													"metalId" : rows[row].metalType  ,
													"storeId" : rows[row].storeId ,
													"vId": rows[row].vendorCode, 
													"articleId" : rows[row].articleIdMaster
												}
											};
											postJSON('/OrderExecution/api/v1/getMetalJewelTypesWithMetalPropertiesOE',JSON.stringify(fieldFilter),
												function(data) {
												if(data.resCode == 1){
													 var res = [];
	                                	        	 res = data.payload.mProp.skinP;
													editor.jqxDropDownList({
															source : res,
															displayMember : 'skinPurity',
															valueMember : 'id'
														});
													 }
												});
										});
									},
									cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
										var rows = $("#jqxgridAcc").jqxGrid('getrows');
										var fieldFilter = {
											"fieldFilters" : {
												"segId" : rows[row].segment,
												"metalId" : rows[row].metalType,
												"storeId" :  rows[row].storeId,
											}
										};
										postJSON('/OrderExecution/api/v1/getMetalJewelTypesWithMetalProperties',JSON.stringify(fieldFilter),function(data) {
										if(data.resCode == 1){
											var res = data.payload.mProp.skinP;
											$.each(res,function(k,v) {
												if (v.id == newvalue.value) {
													$("#jqxgridAcc").jqxGrid('setcellvalue',row,'meltingPurity',v.meltingPurity);
													$("#jqxgridAcc").jqxGrid('setcellvalue',row,'smPurityDesc',v.description);
														$("#jqxgridAcc").jqxGrid('setcellvalue',row,'smPurityId',v.id);
													}
												});
										    }
										});
									},
									cellbeginedit : function(row) {
										 var rows = $('#jqxgridAcc').jqxGrid('getrows');
										 var orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderKind');
										 var orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderItemStatus');
									     if(segId == 1){
									    	 if(orderItemStatus == "G" || orderItemStatus === ""){
													if (orderKind == "SRP"|| orderKind == "SSP"){
														return false;
													}else{
														return true;
													}
												}else{
													return false;
												}
										    }else{
										    	if (orderKind == "SRP"|| orderKind == "SSP") {
													return false;
												}else{
													return true;
												}
										    }
									  },
								},{
									text : 'Melting Purity',
									datafield : 'meltingPurity',
									width : '4%',
									cellsalign : 'center',
									align : 'center',
									cellsformat : 'd2',
									editable : false
								},{
									text : '',
									hidden : true,
									datafield : 'smPurityId',
									width : '4%',
									cellsalign : 'center',
									align : 'center',
									cellsformat : 'd2',
									editable : false
								},{
									text : '',
									hidden : true,
									datafield : 'smPurityDesc',
									width : '4%',
									cellsalign : 'center',
									align : 'center',
									cellsformat : 'd2',
									editable : false
								},
								{
									text : 'Metal Wt Type',
									datafield : 'metalWtType',
									width : '4%',
									displayfield : 'metalWtTypeN',
									cellsalign : 'center',
									align : 'center',
									editable : true,
									columntype : 'dropdownlist',
									createeditor : function(row, cellvalue,editor) {
										editor.on('click',function(event) {
										var rows = $("#jqxgridAcc").jqxGrid('getrows');
										var fieldFilter = {
											"fieldFilters" : {
												"segId" : rows[row].segment,
												"metalId" : rows[row].metalType,
												"storeId" :  rows[row].storeId,
											}
										};
									postJSON('/OrderExecution/api/v1/getMetalJewelTypesWithMetalPropertiesOE',JSON.stringify(fieldFilter),function(data) {
										if(data.resCode == 1){
											var res = [];
                           	        	    res = data.payload.mProp.mvType;
													editor.jqxDropDownList({
														source : res,
														displayMember : 'name',
														valueMember : 'id'
													});
											    }
										   });
									  });
									},
									cellvaluechanging : function(row,datafield, columntype, oldvalue,newvalue, event) {
										if (newvalue.label == "Absolute") {
											$("#jqxgridAcc").jqxGrid('setcellvalue', row,'expWtTo', "");
										}
									},
									cellbeginedit : function(row) {
										 var rows = $('#jqxgridAcc').jqxGrid('getrows');
										 var orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderKind');
										 var orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderItemStatus');
									     if(segId == 1){
									    	if(orderItemStatus == "G" || orderItemStatus === ""){
												if (orderKind == "SSP" || orderKind == "SRP"){
													return false;
												}else{
													return true;
												}
											}else{
												return false;
											}
									    }else{
									    	if (orderKind == "SSP") {
												return false;
											}else{
												return true;
											}
									    }
									},
								},{
									text : 'From',
									datafield : 'expWt',
									width : '4%',
									cellsalign : 'center',
									align : 'center',
									columngroup : 'expFromTo',
									editable : true,
									cellsformat : 'd2',
									columntype : 'numberinput',
									cellvaluechanging : function(row, datafield, columntype, oldvalue,newvalue, event) {
										var metalWtTypeN = $("#jqxgridAcc").jqxGrid('getcellvalue',row,'metalWtTypeN');
										var expWt = $("#jqxgridAcc").jqxGrid('getcellvalue',row,'expWt');
										
										if(metalWtTypeN == "Absolute"){
											if(newvalue <= 0){
												$.growl.error({
													message : "Absolute value should be greater than zero.",
													duration : 10000,
													title : 'Error'
												});
												$("#jqxgridAcc").jqxGrid('setcellvalue',row,'expWt', null);
											}
											$("#jqxgridAcc").jqxGrid('setcellvalue',row,'expWtTo', newvalue);
										}else{
											if(newvalue <= 0){
												$.growl.error({
													message : "Range value should be greater than zero.",
													duration : 10000,
													title : 'Error'
												});
												$("#jqxgridAcc").jqxGrid('setcellvalue',row,'expWt', null);
											}
											
											if(expWt >= newvalue){
												$.growl.error({
													message : "To wt should be greater than from wt.",
													duration : 10000,
													title : 'Error'
												});
												$("#jqxgridAcc").jqxGrid('setcellvalue',row,'expWtTo', null);
											}
										}
									},cellbeginedit : function(row) {
										 var rows = $('#jqxgridAcc').jqxGrid('getrows');
										 var orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderKind');
										 var orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderItemStatus');
									     if(segId == 1){
									    	 if(orderItemStatus == "G" || orderItemStatus === ""){
												if (orderKind == "NO"){//||orderKind == "SRP"){
													return true;
												}else{
													return false;
												}
											}else{
												return false;
											}
									    }else{
									    	if (orderKind == "SSP") {
												return false;
											}else{
												return true;
											}
									    }
									},
								},{
									text : 'To',
									datafield : 'expWtTo',
									width : '4%',
									cellsalign : 'center',
									align : 'center',
									columngroup : 'expFromTo',
									cellsformat : 'd2',
									columntype : 'numberinput',
									cellbeginedit : function(row) {
										var rows = $("#jqxgridAcc").jqxGrid('getrows');
									    var orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderKind');
										var orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderItemStatus');
									     if(segId == null){
									    	 if (orderKind == "NO"||orderKind == "SRP"){
												if (rows[row].metalWtTypeN == "Range") {
													return true;
												} else {
													return false;
												}
									    	 }
									     }else{
									    	 if(orderItemStatus == "G" || orderItemStatus === ""){
													if (orderKind == "NO"||orderKind == "SRP"){
														if (rows[row].metalWtTypeN == "Range") {
														    return true;
														}else{
															return false;
														}
													}else{
														return false;
													}
												}else{
													return false;
												}
									     }
									     if(orderKind == "SSP"){
									    	 return false;
									     }
									},
									cellvaluechanging : function(row, datafield, columntype, oldvalue,newvalue, event) {
										var metalWtTypeN = $("#jqxgridAcc").jqxGrid('getcellvalue',row,'metalWtTypeN');
										var expWt = $("#jqxgridAcc").jqxGrid('getcellvalue',row,'expWt');
										if(metalWtTypeN == "Range"){
											if(newvalue <= 0 ){
												$.growl.error({
													message : "Range value should be greater than zero.",
													duration : 10000,
													title : 'Error'
												});
												$("#jqxgridAcc").jqxGrid('setcellvalue',row,'expWtTo', null);
											}
											if(expWt >= newvalue){
												$.growl.error({
													message : "To wt should be greater than from wt.",
													duration : 10000,
													title : 'Error'
												});
												$("#jqxgridAcc").jqxGrid('setcellvalue',row,'expWtTo', null);
											}
										}
									}
								}, {
									text : 'Vendor Instruction',
									datafield : 'vendorInst',
									width : '4%',
									cellsalign : 'center',
									align : 'center',
									editable : true,
									cellbeginedit : function(row) {
										 var rows = $('#jqxgridAcc').jqxGrid('getrows');
										 var orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue", row,'orderItemStatus');
									    	 if(orderItemStatus == "G" || orderItemStatus === ""){
												return true;
											}else{
												return false;
											}
									 },
								}, {
									text : 'Attr Det',
									datafield : 'attrDet',
									width : '2.7%',
									cellsalign : 'center',
									align : 'center',
									editable : false,
									cellsrenderer : addAttrDet
								}, {
									text : 'Design Det',
									datafield : 'designDet',
									width : '2.7%',
									cellsalign : 'center',
									align : 'center',
									editable : false,
									cellsrenderer : addDesignDet
								}, {
									text : 'Stone Det',
									datafield : 'stoneDet',
									width : '2.7%',
									cellsalign : 'center',
									align : 'center',
									editable : false,
									cellsrenderer : addStoneDet
								}, {
									text : 'Acc Det',
									datafield : 'accDet',
									width : '2.7%',
									cellsalign : 'center',
									align : 'center',
									editable : false,
									cellsrenderer : addAccDet
								}
						],
						columngroups : [ {
							text : 'Exp Wt per pair/pcs',
							align : 'center',
							name : 'expFromTo',
							cellsformat : 'd3'
						}, {
							text : 'Vendors',
							align : 'center',
							name : 'vendorsgr'
						}, {
							text : 'Articles',
							align : 'center',
							name : 'articlegr'
						} ]
					});
}


function threeDec(value, dec, idName, e) {
	var newVal = parseInt(value).toFixed(dec);
	$("#" + idName).val(newVal);
}
function addMeltiP() {
	$("#preRepairMP").val($("#preRepairSP option:selected").attr('code'));
}

$("#saveMPDet").on('click',function() {
					var mpArray = [];
					var rowsMaster = $("#jqxgridAcc").jqxGrid('getrows');
					var selectedrowindexMaster = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
					var stockNoId = $("#stockNoId").val();
					var preRepairGrWt = $("#preRepairGrWt").val();
					var preRepairNetWt = $("#preRepairNetWt").val();
					
					var preRepairGrWt1 = $("#preRepairGrWt1").val();
					var preRepairNetWt1 = $("#preRepairNetWt1").val();
					
					var metalWtType = $("#metalWtType").val();
					var preRpmetalColor = $("#preRpmetalColor option:selected").text();
					var preRepairSP = $("#preRepairSP").val();
					var preRepairMP = $("#preRepairMP").val();
					var description = $("#preRepairSP option:selected").attr('description');
					var idVal = $("#preRepairSP option:selected").attr('idVal');
					
					if (stockNoId == "" || preRepairGrWt == "" || preRepairNetWt == "" || $("#preRpmetalColor").val() == ""|| preRepairSP == ""|| preRepairMP == "" ) {  //||metalWtType == ""
						$.growl.error({
							message : "Please fill all mandatory fields.",
							duration : 10000,
							title : 'Error'
						});
						return false;
					}
					
					var skinP = '';
                    if(typeof rowsMaster != "undefined"){
	                    $.each(rowsMaster,function(k,v){
	                    	var fieldFilter = {
									"fieldFilters" : {
										"segId" : rowsMaster[k].segment,
										"metalId" : rowsMaster[k].metalType,
										"storeId" :  rowsMaster[k].storeId,
									}
								};
							postJSON('/OrderExecution/api/v1/getMetalJewelTypesWithMetalPropertiesOE',JSON.stringify(fieldFilter),function(data) {
							 if(data.resCode == 1){
								$.each(data.payload.mProp.skinP,function(k,v) {
									skinP += '<option code="'+ v.meltingPurity + '" code="'+ v.meltingPurity + '" description="' + v.description 
									+ '"  idVal="'+ v.id + '"  value="'	+ v.skinPurity + '">' + v.skinPurity + '</option>'});
										$("#preRepairSP").append(skinP);
							          }
								 });
	                         })
                          }
						if(rowsMaster[selectedrowindexMaster].orderKind == "SRP"){
							var metalPropValues = "<b>Pre Repair Gr Wt :</b> "
									+ preRepairGrWt
									+ ", <b>Pre Repair Net Wt :</b> "
									+ preRepairNetWt 
									+ ", <b>Pre Repair Skin Purity  :</b> "
									+ preRepairSP
									+ ", <b>Pre Repair Melting Purity :</b> "
									+ preRepairMP;
							
							}else if(rowsMaster[selectedrowindexMaster].orderKind == "SSP"){
								var metalPropValues = "<b>Finished Gr Wt :</b> "
									+ preRepairGrWt1
									+ ", <b>Finished Net Wt :</b> "
									+ preRepairNetWt1 
									+ ", <b>Pre Repair Skin Purity  :</b> "
									+ preRepairSP
									+ ", <b>Pre Repair Melting Purity :</b> "
									+ preRepairMP;
							}
						

					$("#jqxgridAcc").jqxGrid('setcellvalue',selectedrowindexMaster, 'smPurityN', preRepairSP);
					$("#jqxgridAcc").jqxGrid('setcellvalue',selectedrowindexMaster, 'meltingPurity',preRepairMP);

					$("#jqxgridAcc").jqxGrid('setcellvalue',selectedrowindexMaster, 'smPurityId', idVal);
					$("#jqxgridAcc").jqxGrid('setcellvalue', selectedrowindexMaster,'smPurityDesc', description);

					var mpValue = $("#metalPropDetSection").jqxGrid('getrows');

					if (typeof mpValue == "undefined") {
						var metalPropArr = {
							
							"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
							"metalPropValues" : metalPropValues,
							"preRepairGrWt" : (rowsMaster[selectedrowindexMaster].orderKind == "SSP")?
									       ((typeof preRepairGrWt1 == "undefined") ? "" : preRepairGrWt1):
									        (typeof preRepairGrWt == "undefined") ? "" : preRepairGrWt,
							"preRepairNetWt" :(rowsMaster[selectedrowindexMaster].orderKind == "SSP")?
									     ((typeof preRepairNetWt1 == "undefined") ? "" : preRepairNetWt1):
										 (typeof preRepairNetWt == "undefined") ? "" : preRepairNetWt,
							"preRepairPcs" : (typeof preRepairPcs == "undefined") ? "" : preRepairPcs,
							"preRepairSP" : (typeof preRepairSP == "undefined") ? "" : preRepairSP,
							"preRepairMP" : (typeof preRepairMP == "undefined") ? "" : preRepairMP,
							"refStockNo" : (typeof refStockNo == "undefined") ? ""   : refStockNo,
							"sampDesc" : (typeof sampDesc == "undefined") ? ""       : sampDesc,
							"sampPur" : (typeof sampPur == "undefined") ? ""         : sampPur
						};
					} else {
						var metalPropArr = {
							"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
							"metalPropValues" : metalPropValues,
							"preRepairGrWt" : (rowsMaster[selectedrowindexMaster].orderKind == "SSP")?
								       ((typeof preRepairGrWt1 == "undefined") ? "" : preRepairGrWt1):
								        (typeof preRepairGrWt == "undefined") ? "" : preRepairGrWt,
						    "preRepairNetWt" :(rowsMaster[selectedrowindexMaster].orderKind == "SSP")?
								     ((typeof preRepairNetWt1 == "undefined") ? "" : preRepairNetWt1):
									 (typeof preRepairNetWt == "undefined") ? "" : preRepairNetWt,
							"preRepairPcs" : (typeof preRepairPcs == "undefined") ? "" : preRepairPcs,
							"preRepairSP" : (typeof preRepairSP == "undefined") ? ""  : preRepairSP,
							"preRepairMP" : (typeof preRepairMP == "undefined") ? ""  : preRepairMP,
							"refStockNo" : (typeof refStockNo == "undefined") ? ""  : refStockNo,
							"sampDesc" : (typeof sampDesc == "undefined") ? "" : sampDesc,
							"sampPur" : (typeof sampPur == "undefined") ? ""  : sampPur
						};
						for (i = 0; i < mpValue.length; i++) {
							mpArray.push(mpValue[i]);
						}
					}
					mpArray.push(metalPropArr);

					if (mpArray.length > 0) {
						metalPropGrid(mpArray,mType=1);
					}
					$.getJSON('/OrderExecution/api/v1/getStockItemById?id='+stockNoId,function(data) {
					if(data.resCode == 1){
					globalVarible = data.payload.stockItem;
					var k = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
					
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'dueDate', (globalVarible.orderItemDueDate == null)? "": globalVarible.orderItemDueDate);
					//$("#jqxgridAcc").jqxGrid('setcellvalue', k,'stockId', (globalVarible.stockNumber == null)? "": globalVarible.stockNumber);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'smPurityDesc', (globalVarible.orderItemSkinPurity == null)? "": globalVarible.orderItemSkinPurity.description);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'smPurityId',  (globalVarible.orderItemSkinPurity == null)? "": globalVarible.orderItemSkinPurity.id);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'smPurityN', (globalVarible.orderItemSkinPurity == null)? "":  globalVarible.orderItemSkinPurity.skinPurity);
				    $("#jqxgridAcc").jqxGrid('setcellvalue', k,'smPurity', (globalVarible.orderItemSkinPurity == null)? "" : globalVarible.orderItemSkinPurity.skinPurity);
				    
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'storeId',  (globalVarible.storeOrDc == null)? null: globalVarible.storeOrDc);
					
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'smPurityN', (globalVarible.orderItemSkinPurity == null)? "":  globalVarible.orderItemSkinPurity.skinPurity);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'metalWtTypeN', (globalVarible.metalWeightType == null)? "":  globalVarible.metalWeightType.name);
			    	$("#jqxgridAcc").jqxGrid('setcellvalue', k,'metalWtType',  (globalVarible.metalWeightType == null)? "": metalWeightType.id);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'metalCol',  (globalVarible.metalColor == null)? "": globalVarible.metalColor.id);	
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'metalColN', (globalVarible.metalColor == null)? "": globalVarible.metalColor.name);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'segment',  (globalVarible.segId == null)? "": globalVarible.segId.id);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'segmentN', (globalVarible.segId == null)? "": globalVarible.segId.description);	
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'metalType',   (globalVarible.metalId == null)? "": globalVarible.metalId.id);	
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'jewelType',  (globalVarible.jewelType == null)? "": globalVarible.jewelType.id);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'metalTypeN',  (globalVarible.metalId == null)? "": globalVarible.metalId.description);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'jewelTypeN',  (globalVarible.jewelType == null)? "": globalVarible.jewelType.description);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'articleCodeName',  (globalVarible.articleMaster == null)? "": globalVarible.articleMaster.name);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'vendorCode',  (globalVarible.vendor == null)? "": globalVarible.vendor.id);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'vendorCodeName',  (globalVarible.vendor == null)? "": globalVarible.vendor.name);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'articleCode',  (globalVarible.articleMaster == null)? "": globalVarible.articleMaster.name);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'labelName',  (globalVarible.expectedPieces == null)? "": globalVarible.expectedPieces);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'articleDesc',  (globalVarible.articleMaster == null)? "": globalVarible.articleMaster.description);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'expWt', (globalVarible.expectedFromWeight == null)? "": globalVarible.expectedFromWeight);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'expWtTo', (globalVarible.expectedToWeight == null)? "": globalVarible.expectedToWeight);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'vendorInst', (globalVarible.jobWorkerInstruction == null)? "": globalVarible.jobWorkerInstruction);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'articleIdMaster', (globalVarible.articleMaster == null)? "": globalVarible.articleMaster.id);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'articleDescMaster', (globalVarible.articleMaster == null)? "": globalVarible.articleMaster.description);

					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'articleNameMaster',  (globalVarible.articleMaster == null)? "": globalVarible.articleMaster.name);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'vendorType', (globalVarible.vendorType == null)? "": globalVarible.vendorType);
					$("#jqxgridAcc").jqxGrid('setcellvalue', k,'mapDealerRate', (globalVarible.mapDealerRate == null)? "": globalVarible.mapDealerRate);
   
					var arr1 = [];
						var mAttributes = globalVarible.attributes;
						if (typeof mAttributes != "undefined") {
							var lengthAttr = mAttributes.length;
							var newVal = "";
							$.each(mAttributes, function(key, value) {
									var label = key.split('|');
										newVal += '<div class="col-md-6"><span class="required">*</span>&nbsp;<label>' + label[1]
												+ '</label>';
										newVal += '<input type="hidden" value="' + label[1] + '"><select id="' + label[0] + '" class="form-control">';
										      arr1.push(label[0]);
									  if(typeof value != undefined){
										if(value != null && value != ""){
											if((value.id != null || value.id != "")||(value.name != null || value.name != "")){
											newVal += '<option selected id="' + label[0] + '" name="' + value.name + '" value="' + value.id + '">' + value.name + '</option>';
											}
										}  
									  }
									  newVal += '</select></div>';
								 });
							$("#attributeDetailVal").append(newVal);
						  }
						
						    var attrValue;
							$.each(arr1,function(k,v){
								 attrValue = $("#"+v).val();
							});
							
							var attributeArray = [];
							var linkedAttrArr = [];
							var obj = {};
							var rowsMaster = $("#jqxgridAcc").jqxGrid('getrows');
							var selectedrowindexMaster = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
						    $.each($('#attrDetailsForm select option:selected'),function(key, value) {
										var labelObj = $(value).attr("id");
										var attrName = $(value).text();
										var attrValue = value.value;
										var label = value;
										var showtext = "<b> " + labelObj + " </b> : " + attrName + " ";
										linkedAttrArr.push(showtext);

										var newArr = {
												"id" : (labelObj == "length" || labelObj == "size" || labelObj == "height" || labelObj == "diameter" ||labelObj == "width") ? attrName : attrValue,
												"name" : attrName
											}
										obj[labelObj] = newArr;
							});
						    
						    var rows = $("#attributeDetSection").jqxGrid('getrows');
							if (typeof rows != "undefined") {
								if (rows.length > 0) {
									for (var i = 0; i < rows.length; i++) {
										if (rows[i].artLinkSlNo == rowsMaster[selectedrowindexMaster].serialNo) {
											return false;
										}
									}
								}
							}
							 if (typeof rows != "undefined") {
									for (i = 0; i < rows.length; i++) {
										attributeArray.push(rows[i]);
									}
							    }
							 
							if (typeof rows == "undefined") {
								var rowAttribute = {
									"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
									"attributes" : linkedAttrArr.toString(),
									"attrdetval" : obj
								};
							} else {
								var rowAttribute = {
									"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
									"attributes" : linkedAttrArr.toString(),
									"attrdetval" : obj
								};
							}
							attributeArray.push(rowAttribute);
							attributeMasterGrid(attributeArray,attrId=1);
							$("#attributeDetSection").show();

				//########################################## loading the Stones ####################################
								var StoneDet = [];
								var stoneArray = [];
				                var StonesDet = data.payload.stockItem.stones;
								var rowsMaster = $("#jqxgridAcc").jqxGrid('getrows');
								var selectedrowindexMaster = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
								var rows = $("#stoneMasterGrid").jqxGrid('getrows');
								if(typeof rows != "undefined"){
									for (i = 0; i < rows.length; i++) {
						    			stoneArray.push(rows[i]);
						    	    }
						        }
								if(StonesDet.length != 0){
					                $.each(StonesDet,function(k,v){
					                	if (typeof rows == "undefined") {
					    					var rowStone = {
					    						"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
					    						"id" : (v.id==null)? "" :v.id,
					    						"slNo" : (v.serialNumber==null)? "" : v.serialNumber,
					    						"stoneSupBy" : (v.suppliedBy==null)? "" : v.suppliedBy.id,
					    						"suppliedByNameCode" : (v.suppliedBy==null)? "" : v.suppliedBy.name,
					    						"suppliedByName" : (v.suppliedBy==null)? "" : v.suppliedBy.name,
					    						"stoneSeg" : (v.stoneSegment==null)? "" :  v.stoneSegment,
					    						"stoneSegName" : (v.stoneSegment==null)? "" :  v.stoneSegment,
					    						"stoneSegCode" : (v.stoneSegment==null)? "" : v.stoneSegment,
					    						"sSeg" : (v.stoneSegment==null)? "" :  v.stoneSegment,
					    						"stoneMainCatCode" :(v.stoneCategory==null)? "" : v.stoneCategory,
					    						"stoneMainCatName" :(v.stoneCategory==null)? "" : v.stoneCategory,
					    						
					    						"stoneSubCat" : (v.subCategory==null)? null :v.subCategory.id,
					    						"stoneSubCatName" : (v.subCategory==null)? null :v.subCategory.description,
					    						"stoneSubCatCode" : (v.subCategory==null)? null :v.subCategory.name,
					    						"stoneArtCodeId" : (v.code==null)? "" :v.code.id,
					    						"stoneArtCode" : (v.code==null)? "" :v.code.name,
					    						"clarity" : (v.clarity==null)? "" :v.clarity.id,
					    						"actualColor" :(v.actualColor==null)? "" : v.actualColor.id,
					    						"color" : (v.color==null)? "" : v.color.id,
					    						"cutGrade" : (v.cutGrade==null)? "" : v.cutGrade.id,
					    						"uom" : (v.uom==null)? "" : v.uom,
					    						"stoneRate" : (v.rate==null)? "" : v.rate,
					    						"jwStonePcs" : (v.vendorPieces==null)? "" : v.vendorPieces,
					    						"jwStoneWt" : (v.vendorWeight==null)? "" : v.vendorWeight,
					    						"jwPrice" : (v.vendorPrice==null)? "" : v.vendorPrice,
					    						"compStonePcs" :(v.compPieces==null)? "" : v.compPieces,
					    						"compStoneWt" :(v.compWeight==null)? "" : v.compWeight,
					    						"stonePrice" :(v.compPrice == null)? "" : v.compPrice,
					    						"stonCond" : (v.condition==null)? "" : v.condition,
					    						"subCatDesc" : (v.subCategoryDesc==null)? "" : v.subCategoryDesc,
					    						"wtRange" : (v.weightRange==null)? "" : v.weightRange.id,
					    						"fromWeightCost" : (v.fromWeightCost==null)? "" : v.fromWeightCost,
					    						"toWeightCost" : (v.toWeightCost==null)? "" : v.toWeightCost,
					    						"stoneWeightsUsed" : (v.stoneWeightsUsed==null)? "" : v.stoneWeightsUsed,
					    						"compWeight" : (v.compWeight==null)? "" : v.compWeight,
					    						"compPieces" : (v.compPieces==null)? "" : v.compPieces,
					    						"costPrice": (v.costPrice == null)?null:v.costPrice,
					    						//"currentOperation" : "modify"
					    					};
					    				} else {
					    					//var rowscount = $("#stoneMasterGrid").jqxGrid("getdatainformation").rowscount;
					    					var rowStone = {
					    							"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
						    						"id" : (v.id==null)? "" :v.id,
						    						"slNo" : (v.serialNumber==null)? "" : v.serialNumber,
						    						"stoneSupBy" : (v.suppliedBy==null)? "" : v.suppliedBy.id,
						    						"suppliedByNameCode" : (v.suppliedBy==null)? "" : v.suppliedBy.name,
						    						"suppliedByName" : (v.suppliedBy==null)? "" : v.suppliedBy.name,
						    						"stoneSeg" : (v.stoneSegment==null)? "" :  v.stoneSegment,
						    						"stoneSegName" : (v.stoneSegment==null)? "" :  v.stoneSegment,
						    						"stoneSegCode" : (v.stoneSegment==null)? "" : v.stoneSegment,
						    						"sSeg" : (v.stoneSegment==null)? "" :  v.stoneSegment,
						    						"stoneMainCatCode" :(v.stoneCategory==null)? "" : v.stoneCategory,
						    						"stoneMainCatName" :(v.stoneCategory==null)? "" : v.stoneCategory,
						    						
						    						"stoneSubCat" : (v.subCategory==null)? "" :v.subCategory.id,
						    						"stoneSubCatName" : (v.subCategory==null)? "" :v.subCategory.description,
						    						"stoneArtCodeId" : (v.code==null)? "" :v.code.id,
						    						"stoneArtCode" : (v.code==null)? "" :v.code.name,
						    						"clarity" : (v.clarity==null)? "" :v.clarity.id,
						    						"actualColor" :(v.actualColor==null)? "" : v.actualColor.id,
						    						"color" : (v.color==null)? "" : v.color.id,
						    						"cutGrade" : (v.cutGrade==null)? "" : v.cutGrade.id,
						    						"uom" : (v.uom==null)? "" : v.uom,
						    						"stoneRate" : (v.rate==null)? "" : v.rate,
						    						"jwStonePcs" : (v.vendorPieces==null)? "" : v.vendorPieces,
						    						"jwStoneWt" : (v.vendorWeight==null)? "" : v.vendorWeight,
						    						"jwPrice" : (v.vendorPrice==null)? "" : v.vendorPrice,
						    					    "compStonePcs" :(v.compPieces==null)? "" : v.compPieces,
										    		"compStoneWt" :(v.compWeight==null)? "" : v.compWeight,
						    						"stonePrice" :(v.compPrice == null)? "" : v.compPrice,
						    						"stonCond" : (v.condition==null)? "" : v.condition,
						    						"subCatDesc" : (v.subCategoryDesc==null)? "" : v.subCategoryDesc,
						    						"wtRange" : (v.weightRange==null)? "" : v.weightRange.id,
						    						"fromWeightCost" : (v.fromWeightCost==null)? "" : v.fromWeightCost,
						    			    		"toWeightCost" : (v.toWeightCost==null)? "" : v.toWeightCost,
						    			    		"stoneWeightsUsed" : (v.stoneWeightsUsed==null)? "" : v.stoneWeightsUsed,
						    			    		"compWeight" : (v.compWeight==null)? "" : v.compWeight,
						    			    		"compPieces" : (v.compPieces==null)? "" : v.compPieces,
						    			    		"costPrice": (v.costPrice == null)?null:v.costPrice,
						    					    //"currentOperation" : "modify"
					    						};
					    			    	}
					    				stoneArray.push(rowStone);
					    				stoneMasterGrid(stoneArray,stoneId=1);
					                })
					    			$("#stoneMasterGrid").show();
								}
								
				    			
				// ######################### Loading Accessory Details #############################
				                var accArray = [];
				                var accDet = [];
				                accDet = data.payload.stockItem.accessories;
								var rowsMaster = $("#jqxgridAcc").jqxGrid('getrows');
								var selectedrowindexMaster = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
								var rows = $("#accMasterGrid").jqxGrid('getrows');
								if(typeof rows != "undefined"){
									for (i = 0; i < rows.length; i++) {
										accArray.push(rows[i]);
						    	    }
						        }
								
								if(accDet.length != 0){
									$.each(accDet,function(k,v){
										if (typeof rows == "undefined") {
											var rowAcc = {
												"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
												"id" :  (v.id==null)? "" :  v.id,
												"slNo" : (v.serialNumber==null)? "" :   v.serialNumber,
												"accSupBy" :  (v.suppliedBy==null)? "" :  v.suppliedBy.id,
												"accSupByName": (v.suppliedBy==null)? "" :  v.suppliedBy.name,
												"accMainCatName": (v.category==null)? "" :  v.category,
												"accMainCatCode": (v.category==null)? "" :  v.category,
												"accMainCat" : (v.category==null)? "" :   v.category,
												"accSubCat" :  (v.subCategory==null)? "" :  v.subCategory.id,
												"accSubCatName": (v.subCategory==null)? "" :  v.subCategory.description,
												"accArtCode" :  (v.code==null)? "" :  v.code.name,
												"accArticleId" :  (v.code==null)? "" :  v.code.id,
												"uom" :  (v.uom==null)? "" :  v.uom.id,
												"rateList" : (v.rate==null)? "" :   v.rate,
												"accRate" :  (v.rate==null)? "" :  v.rate,
												"jwAccPcs" : (v.vendorPieces==null)? "" :  v.vendorPieces,
												"jwAccWt" :  (v.vendorWeight==null)? "" :  v.vendorWeight,
												"jwAccPrice" :  (v.vendorPrice==null)? "" :  v.vendorPrice,
												"compAccPcs" :  (v.compPieces==null)? "" :  v.compPieces,
												"compAccWt" :  (v.compWeight==null)? "" :  v.compWeight,
												"compAccPrice" : (v.compPrice==null)? "" :   v.compPrice,
												"accCondition" : (v.condition==null)? "" :   v.condition,
												"weightsUsed" :   (v.weightsUsed==null)? "" :   v.weightsUsed,
												"compWeight"  : (v.compWeight==null)? "" :   v.compWeight,
											    "compWeight" : (v.compWeight==null)? "" : v.compWeight,
									    	    "compPieces" : (v.compPieces==null)? "" : v.compPieces,
									    	    "costPrice": (v.costPrice == null)?null:v.costPrice,
												//"currentOperation" : "modify"
											};
										} else {
											var rowscount = $("#accMasterGrid").jqxGrid("getdatainformation").rowscount;
											var rowAcc = {
													"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
													"id" :  (v.id==null)? "" :  v.id,
													"slNo" : (v.serialNumber==null)? "" :   v.serialNumber,
													"accSupBy" :  (v.suppliedBy==null)? "" :  v.suppliedBy.id,
													"accSupByName": (v.suppliedBy==null)? "" :  v.suppliedBy.name,
													"accMainCatName": (v.category==null)? "" :  v.category,
													"accMainCatCode": (v.category==null)? "" :  v.category,
													"accMainCat" : (v.category==null)? "" :   v.category,
													"accSubCat" :  (v.subCategory==null)? "" :  v.subCategory.id,
													"accSubCatName": (v.subCategory==null)? "" :  v.subCategory.description,
													"accArtCode" :  (v.code==null)? "" :  v.code.name,
													"accArticleId" :  (v.code==null)? "" :  v.code.id,
													"uom" :  (v.uom==null)? "" :  v.uom.id,
													"rateList" : (v.rate==null)? "" :   v.rate,
													"accRate" :  (v.rate==null)? "" :  v.rate,
													"jwAccPcs" : (v.vendorPieces==null)? "" :  v.vendorPieces,
													"jwAccWt" :  (v.vendorWeight==null)? "" :  v.vendorWeight,
													"jwAccPrice" :  (v.vendorPrice==null)? "" :  v.vendorPrice,
													"compAccPcs" :  (v.compPieces==null)? "" :  v.compPieces,
													"compAccWt" :  (v.compWeight==null)? "" :  v.compWeight,
													"compAccPrice" : (v.compPrice==null)? "" :   v.compPrice,
													"accCondition" : (v.condition==null)? "" :   v.condition,
													"weightsUsed" :   (v.weightsUsed==null)? "" :   v.weightsUsed,
													"compWeight"  : (v.compWeight==null)? "" :   v.compWeight,
													"compPieces"  : (v.compPieces==null)? "" :   v.compPieces,
													"costPrice": (v.costPrice == null)?null:v.costPrice,
													//"currentOperation" : "modify"
											};
												
										}
									accArray.push(rowAcc);
								 })
							 accMasterGrid(accArray,accryId=1);
							 $("#accMasterGrid").show();
						  }
										 
						 if(globalVarible.subCategory != null){
								$("#jqxgridAcc").jqxGrid('setcellvalue', k,'subCatId', globalVarible.subCategory.id);
								$("#jqxgridAcc").jqxGrid('setcellvalue', k,'subCatCode', globalVarible.subCategory.name);
								$("#jqxgridAcc").jqxGrid('setcellvalue', k,'subCatName', globalVarible.subCategory.name);
							}else{
								$("#jqxgridAcc").jqxGrid('setcellvalue', k,'subCatId',"");
					 	}
						if(globalVarible.stockNumber != null){
						    $("#jqxgridAcc").jqxGrid('setcellvalue', k,'stockNumber', globalVarible.stockNumber);
						}else{
							$("#jqxgridAcc").jqxGrid('setcellvalue', k,'stockNumber', "");
						}
					}else if(data.resCode == 2){
							$.growl.error({
							message : data.mesgStr,
							duration : 10000,
							title : 'Error'
			    });
		   }
	 });
})
				
// Metal Properties Grid
var metalPropGrid = function(data,mType){
   
	var source = {
		datafields : [
			{name : 'artLinkSlNo',type : 'int'},
		    {name : 'metalPropValues',type : 'array'},
		    {name : 'preRepairGrWt',type : 'float'}, 
		    {name : 'preRepairNetWt',type : 'float'},
		    {name : 'preRepairPcs',type : 'int'},
		    {name : 'preRepairSP',type : 'int'}, 
		    {name : 'preRepairMP',type : 'int'},
		    {
			name : 'refStockNo',
			type : 'int'
		}, {
			name : 'sampDesc',
			type : 'int'
		}, {
			name : 'sampPur',
			type : 'int'
		} ],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#metalPropDetSection").jqxGrid(
					{
						source : dataAdapter,
						width : '100%',
						editable : false,
						height : 200,
						autorowheight : true,
						autoheight : true,
						altRows : true,
						columnsresize : false,
						showtoolbar : true,
						rendertoolbar : function(toolbar) {
							var me = this;
							
							var container = $("<div class='col-md-12' style='margin-top: 5px;'></div>");
							toolbar.append(container);
							container.append('<div class="col-md-4 pull-left"><i class="fa fa-list fa-md"></i>&nbsp; Metal Properties</div><div class="pull-right">(select row to delete)&nbsp;<div  id="deletemetalrowbutton" class="btn btn-danger btn-sm"><i class="fa fa-trash fa-md"></i></div></div>');
							$("#deletemetalrowbutton").jqxButton();						

							$("#deletemetalrowbutton").on('click',function() {
							var rows = $("#jqxgridAcc").jqxGrid('getrows');
							var rowIndex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
							var selectedrowindex = $("#metalPropDetSection").jqxGrid('getselectedrowindex');
							var rowscount = $("#metalPropDetSection").jqxGrid('getdatainformation').rowscount;
							for (var i = 0; i < rowscount; i++) {
							$("#accMasterGrid").jqxGrid("setcellvalue",i,"artLinkSlNo",i + 1);
							}
							if (selectedrowindex >= 0&& selectedrowindex < rowscount) {
								if(rows[rowIndex].orderKind == 'SRP' || rows[rowIndex].orderKind == 'SSP') { //rows[row].orderKind == 'SSP' ||
									
								}else{
							       var id = $("#metalPropDetSection").jqxGrid('getrowid',selectedrowindex);
							       var commit = $("#metalPropDetSection").jqxGrid('deleterow',id);
								}
							}
							});
						},
						columns : [ {
							text : 'Article Link Sl No',
							datafield : 'artLinkSlNo',
							width : '10%',
							cellsalign : 'center',
							align : 'center'
						}, {
							text : 'Metal Details',
							datafield : 'metalPropValues',
							width : '90%',
							cellsalign : 'left',
							editable : false
						}]
				 });
            }

var deletedrowData;
var  getStoneRows = [];
// Stone Master Grid
var stoneMasterGrid = function(data,stoneId) {

	if( stoneId == 1){
	var source = {
		localdata : data,
		datafields : [ 
		{
			name : 'id',
			type : 'int'
		},{
			name : 'deleteStRow',
			type : 'string'
		},{
			name : 'artLinkSlNo',
			type : 'int'
		}, {
			name : 'slNo',
			type : 'int'
		},{
			name : 'compReqdWt',
			type : 'float'
		}, {
			name : 'stoneSupBy',
			type : 'string'
		}, {
			name : 'suppliedByCode',
			type : 'string'
		}, {
			name : 'suppliedByName',
			type : 'string'
		}, {
			name : 'stoneSeg',
			type : 'string'
		}, {
			name : 'stoneSegName',
			type : 'string'
		}, {
			name : 'stoneSegCode',
			type : 'string'
		}, {
			name : 'stoneMainCat',
			type : 'string'
		}, {
			name : 'sSeg',
			type : 'string'
		}, {
			name : 'stoneMainCatCode',
			type : 'string'
		}, {
			name : 'stoneMainCatName',
			type : 'string'
		}, {
			name : 'stoneSubCat',
			type : 'string'
		}, {
			name : 'stoneSubCatName',
			type : 'string'
		},{
			name : 'stoneSubCatCode',
			type : 'string'
		}, {
			name : 'stoneArtCodeId',
			type : 'int'
		}, {
			name : 'stoneArtCode',
			type : 'string'
		}, {
			name : 'wtRange',
			type : 'long'
		}, {
			name : 'clarity',
			type : 'long'
		}, {
			name : 'actualColor',
			type : 'string'
		}, {
			name : 'color',
			type : 'int'
		}, {
			name : 'stoneShape',
			type : 'string'
		}, {
			name : 'stoneShapeCode',
			type : 'string'
		}, {
			name : 'stoneShapeName',
			type : 'string'
		}, {
			name : 'cutGrade',
			type : 'string'
		}, {
			name : 'uom',
			type : 'string'
		}, {
			name : 'stoneRate',
			type : 'string'
		}, {
			name : 'jwStonePcs',
			type : 'float'
		}, {
			name : 'jwStoneWt',
			type : 'float'
		}, {
			name : 'compStonePcs',
			type : 'string'
		}, {
			name : 'compStoneWt',
			type : 'float',
		}, {
			name : 'stonePrice',
			type : 'float'
		}, {
			name : 'jwPrice',
			type : 'float'
		}, {
			name : 'stonCond',
			type : 'string'
		}, {
			name : 'subCatDesc',
			type : 'string'
		}, {
			name : 'actionId',
			type : 'int'
		},{
			name : 'fromWeightCost',
			type : 'float'
		},{
			name : 'toWeightCost',
			type : 'float'
		},{
			name : 'compWeight',
			type : 'float'
		},{
			name : 'stoneWeightsUsed',
			type : 'float'
		},{
			name : 'currentOperation',
			type : 'string'
		},{
			name : 'compReqdWt',
			type : 'float',
		},{
			name : 'costPrice',
			type : 'float',
		},{
			name:'newStoneFlag',
			type:'boolean',
			map : 'newStoneFlag'
		}],
		
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	}else{
		
	var source = {
	 localdata: data,
     datatype: "json",
		datafields : [ 
			{
				name : 'id',
				type : 'int',
				map :'id'
			},{
				name : 'deleteStRow',
				type : 'string',
			},{
				name : 'artLinkSlNo',
				type : 'int',
				map :'orderItemSlNo'
			}, {
				name : 'slNo',
				type : 'int',
				map :'serialNumber'
			}, {
				name : 'stoneSupBy',
				type : 'string',
				map :'suppliedBy>name'
			}, {
				name : 'suppliedByCode',
				type : 'string',
				map :'suppliedBy>id'
			}, {
				name : 'suppliedByName',
				type : 'string',
				map :'suppliedBy>name'
			}, {
				name : 'stoneSeg',
				type : 'string',
				map :'stoneSegment'
			}, {
				name : 'stoneSegName',
				type : 'string',
				map :'stoneSegment'
			}, {
				name : 'stoneSegCode',
				type : 'string',
				map :''
			}, {
				name : 'stoneMainCat',
				type : 'string',
				map :'stoneCategory'
			}, {
				name : 'sSeg',
				type : 'string',
				map :''
			}, {
				name : 'stoneMainCatCode',
				type : 'string',
				map :'stoneCategory'
			}, {
				name : 'stoneMainCatName',
				type : 'string',
				map :'stoneCategory'
			}, {
				name : 'stoneSubCat',
				type : 'string',
				map :'subCategory'
			}, {
				name : 'stoneSubCatName',
				type : 'string',
				map :'subCategory'
			}, {
				name : 'stoneSubCatCode',
				type : 'string',
				map  : 'subCategory'
			},{
				name : 'stoneArtCodeId',
				type : 'int',
				map :'code>id'
			}, {
				name : 'stoneArtCode',
				type : 'string',
				map :'code>name'
			}, {
				name : 'wtRange',
				type : 'long',
				map :'weightRange>name'
			}, {
				name : 'clarity',
				type : 'long',
				map :'clarity>name'
			}, {
				name : 'actualColor',
				type : 'string',
				map  : 'actualColor>name'
			}, {
				name : 'color',
				type : 'int',
				map :'color>name'
			}, {
				name : 'stoneShape',
				type : 'string',
				map :''
			}, {
				name : 'stoneShapeCode',
				type : 'string',
				map :''
			}, {
				name : 'stoneShapeName',
				type : 'string',
				map :''
			}, {
				name : 'cutGrade',
				type : 'string',
				map :'cutGrade>name'
			}, {
				name : 'uom',
				type : 'string',
				map :'uom'
			}, {
				name : 'stoneRate',
				type : 'string',
				map :'rate'
			}, {
				name : 'jwStonePcs',
				type : 'float',
				map :'vendorReqPieces'
			}, {
				name : 'jwStoneWt',
				type : 'float',
				map :'vendorReqWeight'
			}, {
				name : 'compStonePcs',
				type : 'string',
				map :'compReqPcs'
			}, {
				name : 'compStoneWt',
				type : 'float',
				map :'compReqdWt'
			}, {
				name : 'stonePrice',
				type : 'float',
				map :'compPrice'
			}, {
				name : 'jwPrice',
				type : 'float',
				map :'vendorPrice'
			}, {
				name : 'stonCond',
				type : 'string',
				map :'condition'
			}, {
				name : 'subCatDesc',
				type : 'string',
				map :'subCategoryDesc'
			},{
				name : 'stoneWeightsUsed',
				type : 'float',
				map :'stoneWeightsUsed'
			},{
				name : 'compReqdWt',
				type : 'float',
				map :'compReqdWt'
			},{
				name : 'actionId',
				type : 'int',
				map :'id'
			},{
				name : 'fromWeightCost',
				type : 'float'
			},{
				name : 'toWeightCost',
				type : 'float'
			},{
				name : 'compWeight',
				type : 'float',
				map  : ''
			},{
				name : 'currentOperation',
				type : 'string'
			},{
				name : 'stoneIdEdit',
				type : 'int'
			},{
				name : 'costPrice',
				type : 'float',
			},{
				name : 'newStoneFlag',
				type : 'boolean',
				map : 'newStoneFlag'
			}]
	   }
	var dataAdapter = new $.jqx.dataAdapter(source);
	}
	
	$("#stoneMasterGrid").jqxGrid(
					{
						source : dataAdapter,
						width : '100%',
						editable : true,
						height : 200,
						columnsheight : 100,
						autorowheight : true,
						autoheight : true,
						altRows : true,
						columnsresize : true,
						showtoolbar : true,
						rendertoolbar : function(toolbar) {
							var me = this;
							
							var container = $("<div class='col-md-12' style='margin-top: 5px;'></div>");
							toolbar.append(container);
							container.append('<div class="col-md-4 pull-left"><i class="fa fa-list fa-md"></i>&nbsp; Stone Details</div><div class="pull-right">(select row to delete)&nbsp;<div  id="deletestonerowbutton" class="btn btn-danger btn-sm"><i class="fa fa-trash fa-md"></i></div></div>');
							$("#deletestonerowbutton").jqxButton();
							$("#deletestonerowbutton").on('click',function() {
							 var selectedrowindex = $("#stoneMasterGrid").jqxGrid('getselectedrowindex');
							 var rowscount = $("#stoneMasterGrid").jqxGrid('getdatainformation').rowscount;
							 var getRowId =  $("#stoneMasterGrid").jqxGrid('getcellvalue',selectedrowindex,"id");
							 var stoneRows = $("#stoneMasterGrid").jqxGrid('getrows');
							 var artLinkSlNo =  $("#stoneMasterGrid").jqxGrid('getcellvalue',selectedrowindex,"artLinkSlNo");
							 var mainGridOneRow = $("#jqxgridAcc").jqxGrid('getrowdata',artLinkSlNo-1);
							 var orderKind = mainGridOneRow.orderKind ;
							 var orderItemStatus =  mainGridOneRow.orderItemStatus;
							 var stoneWeightsUsed =  $("#stoneMasterGrid").jqxGrid("getcellvalue",selectedrowindex,'stoneWeightsUsed');
							 var compGivenWt =  $("#stoneMasterGrid").jqxGrid("getcellvalue",selectedrowindex,'compWeight');
							 var id = $("#stoneMasterGrid").jqxGrid('getrowid',selectedrowindex);
							 if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
							 if(stoneId == null){
								 if(orderKind == 'SRP' || orderKind == 'NO'){
									 if(orderItemStatus == "G"){
										 if(stoneWeightsUsed != null && stoneWeightsUsed >0){
											 $.growl.error({
													message : "This Line item can not be Deleted !!",
													duration : 10000
												});
												return false;
										 }
										 else if(compGivenWt != null && compGivenWt >0){
											 $.growl.error({
													message : "This Line item can not be Deleted !!",
													duration : 10000
												});
												return false;
										 }
                                         else if((compGivenWt == null || compGivenWt == 0) && getRowId == null || getRowId == "undefined"){
                                        	 var commit = $("#stoneMasterGrid").jqxGrid('deleterow',id);
										   }
										 else if((compGivenWt == null || compGivenWt == 0)&&(getRowId != null || getRowId != "undefined")){
											 $("#stoneMasterGrid").jqxGrid("setcellvalue",id,'currentOperation',"delete")
											 var stoneNewArray  = $("#stoneMasterGrid").jqxGrid('getrowdata',id);
											 getStoneRows.push(stoneNewArray);
											 var commit = $("#stoneMasterGrid").jqxGrid('deleterow',id);
										 }
									 }else{}
								 }
							 }else{
								   if(orderKind == 'SRP'){ 
										 for(i=0; i<stoneRows.length; i++){
											 if(getRowId == null || getRowId == "undefined"){
												 var commit = $("#stoneMasterGrid").jqxGrid('deleterow',id);
											 }
										  }
									   }else if(orderKind == 'SSP'){
										   $.growl.error({
												message : "SSP Related line item Can not be Deleted!!!",
												duration : 10000
											});
											return false;
									   }
									    else{ var commit = $("#stoneMasterGrid").jqxGrid('deleterow',id)}
									}
							 }
							 var rowVar = 0;
								 $.each($("#stoneMasterGrid").jqxGrid('getrows'),function(k,v){
									 if(artLinkSlNo == v.artLinkSlNo){
										 rowVar++;
										 $("#stoneMasterGrid").jqxGrid('setcellvalue',k,"slNo",rowVar);
									 }
								 })
						    });
						},
						columns : [ 
						{datafield :'stoneWeightsUsed',hidden:true},
						{datafield :'compWeight',hidden:true},
						{datafield :'fromWeightCost',hidden:true},
						{datafield :'toWeightCost',hidden:true},
						{datafield :'currentOperation',hidden:true},
						{datafield :'compGivenWt',hidden:true},
						{
							text : 'Article Link Sl No',
							datafield : 'artLinkSlNo',
							width : '3%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						}, {
							text : 'Sl No',
							datafield : 'slNo',
							width : '2%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						}, {
							text : 'Stone Supp By',
							datafield : 'suppliedByName',
							width : '6%',
							cellsalign : 'center',
							editable : false
						}, {
							text : 'Stone Seg',
							datafield : 'stoneSegName',
							width : '4%',
							cellsalign : 'center',
							editable : false
						}, {
							text : 'Stone Main Cat',
							datafield : 'stoneMainCatName',
							width : '4%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						}, {
							text : 'Stone Sub Cat',
							datafield : 'stoneSubCatName',
							width : '5%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							hidden : true
						}, {
							text : 'Stone Article Code',
							datafield : 'stoneArtCode',
							width : '7%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						}, {
							text : 'Wt./Cost Range',
							datafield : 'wtRange',
							width : '4%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						}, {
							text : 'Clarity',
							datafield : 'clarity',
							width : '4%',
							cellsalign : 'center',
							align : 'center',
							cellsformat : 'd2',
							editable : false
						}, {
							text : 'Actual Color',
							datafield : 'actualColor',
							width : '4%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						}, {
							text : 'Shape',
							datafield : 'stoneShapeName',
							width : '4%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							hidden:true
						}, {
							text : 'Color',
							datafield : 'color',
							width : '5%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						}, {
							text : 'Cut Grade',
							datafield : 'cutGrade',
							width : '5%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						},{
							text : 'Sub Cat Desc',
							datafield : 'subCatDesc',
							width : '6%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						},{
							text : 'JW Stone Pcs',
							datafield : 'jwStonePcs',
							width : '5%',
							cellsalign : 'center',
							align : 'center',
							editable : true,
							cellbeginedit: function(row, datafield, columntype) {
								var orderKind;
								var orderItemStatus;
							    var rows = $('#stoneMasterGrid').jqxGrid('getrows');
							    var rowsMain = $('#jqxgridAcc').jqxGrid('getrows');
							    var suppliedByCode =  $("#stoneMasterGrid").jqxGrid("getcellvalue",row,'suppliedByCode');
								$.each(rowsMain,function(k,v){
								  orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", k,'orderKind');
								  orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue",k,'orderItemStatus');
								});
								var id = $('#stoneMasterGrid').jqxGrid('getcellvalue',row,'id');
											if(stoneId == null){
											   if ((orderKind == "NO" || orderKind == "SRP" ) && suppliedByCode == "V") {
													 if(orderItemStatus == "G"){
														if((rows[row].stoneWeightsUsed) != null && (rows[row].stoneWeightsUsed > 0)&&(id != undefined || id !=null)){	
															return false;
													  	}else if((rows[row].compGivenWt != null && rows[row].compGivenWt > 0)&&(id != undefined || id !=null)){
													  		$("#stoneMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
															return true;
														}else if(((rows[row].compGivenWt == 0 || rows[row].compGivenWt == null)&&(id != undefined || id !=null) )){
															$("#stoneMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
															return true;
														}else if(((rows[row].compGivenWt == 0 || rows[row].compGivenWt == null)&&(id =="undefined" || id ==null) )){
															return true;
														}
													 }else{
														 return false;
													 }
											 }else{
												return false;
											 }
										}else{
											return false;
									}
								},
								cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
								 var stoneRate =  $("#stoneMasterGrid").jqxGrid("getcellvalue",row,'stoneRate');
								 if(newvalue != "" || jwStoneWt != ""){
									 var jwPrice1 = newvalue * stoneRate;
									 $("#stoneMasterGrid").jqxGrid('setcellvalue', row,'jwPrice',jwPrice1);
								 }
							}
						}, {
							text : 'JW Stone Wt',
							datafield : 'jwStoneWt',
							width : '5%',
							cellsalign : 'center',
							align : 'center',
							cellsformat : 'd3',
							editable : true,
							cellbeginedit: function(row, datafield, columntype) {
							var orderKind;
							var orderItemStatus;
						    var rows = $('#stoneMasterGrid').jqxGrid('getrows');
						    var rowsMain = $('#jqxgridAcc').jqxGrid('getrows');
						    var suppliedByCode =  $("#stoneMasterGrid").jqxGrid("getcellvalue",row,'suppliedByCode');
						    $.each(rowsMain,function(k,v){
							  orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", k,'orderKind');
							  orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue",k,'orderItemStatus');
							});
							var id = $('#stoneMasterGrid').jqxGrid('getcellvalue',row,'id');
										if(stoneId == null){
										   if ((orderKind == "NO" || orderKind == "SRP") && suppliedByCode == "V") {
												 if(orderItemStatus == "G"){
													if((rows[row].stoneWeightsUsed) != null && (rows[row].stoneWeightsUsed > 0)&&(id != undefined || id !=null)){	
														return false;
												  	}else if((rows[row].compGivenWt != null && rows[row].compGivenWt > 0)&&(id != undefined || id !=null)){
												  		$("#stoneMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
														return true;
													}else if(((rows[row].compGivenWt == 0 || rows[row].compGivenWt == null)&&(id != undefined || id !=null) )){
														$("#stoneMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
														return true;
													}else if(((rows[row].compGivenWt == 0 || rows[row].compGivenWt == null)&&(id =="undefined" || id ==null) )){
														return true;
													}
												 }else{
													 return false;
												 }
										 }else{
											return false;
										 }
									}else{
								   return false;
								}
							},
							cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
								 var stoneRate =  $("#stoneMasterGrid").jqxGrid("getcellvalue",row,'stoneRate');
								 if(jwStonePcs != "" || newvalue != null){
									 var jwPrice1 = newvalue * jwStonePcs;
									 $("#stoneMasterGrid").jqxGrid('setcellvalue', row,'jwPrice',jwPrice1);
								 }
							}
						}, {
							text : 'Comp Stone Pcs',
							datafield : 'compStonePcs',
							width : '5%',
							cellsalign : 'center',
							align : 'center',
							editable : true,
							cellbeginedit:function(row, datafield, columntype) {
								var orderKind;
								var orderItemStatus;
							    var rows = $('#stoneMasterGrid').jqxGrid('getrows');
							    var rowsMain = $('#jqxgridAcc').jqxGrid('getrows');
							    var suppliedByCode =  $("#stoneMasterGrid").jqxGrid("getcellvalue",row,'suppliedByCode');
							    $.each(rowsMain,function(k,v){
								   orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", k,'orderKind');
								   orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue",k,'orderItemStatus');
							    });
								 var id = $('#stoneMasterGrid').jqxGrid('getcellvalue',row,'id');
										if(stoneId == null){
										   if ((orderKind == "NO" || orderKind == "SRP") && suppliedByCode == "CO") {
												 if(orderItemStatus == "G"){
													if((rows[row].stoneWeightsUsed) != null && (rows[row].stoneWeightsUsed > 0)&&(id != undefined || id !=null)){	
														return false;
												  	}else if((rows[row].compGivenWt != null && rows[row].compGivenWt > 0)&&(id != undefined || id !=null)){		
												  		$("#stoneMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
														return true;
													}else if(((rows[row].compGivenWt == 0 || rows[row].compGivenWt == null)&&(id != undefined || id !=null) )){
														$("#stoneMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
														return true;
													}else if(((rows[row].compGivenWt == 0 || rows[row].compGivenWt == null)&&(id =="undefined" || id ==null) )){
														return true;
													}
												 }else{
													 return false;
												 }
										 }else{
											return false;
										 }
									}else{
										return false;
								}
							},
							cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
								 var stoneRate =  $("#stoneMasterGrid").jqxGrid("getcellvalue",row,'stoneRate');
								 if(newvalue != "" || compStoneWt != ""){
									 var Price = newvalue * stoneRate;
									 $("#stoneMasterGrid").jqxGrid('setcellvalue', row,'stonePrice',Price);
								 }
							}
						}, {
							text : 'Comp Stone Wt',
							datafield : 'compStoneWt',
							width : '6%',
							cellsalign : 'center',
							align : 'center',
							cellsformat : 'd3',
							editable : true,
							cellbeginedit:function(row, datafield, columntype) {
								var orderKind;
								var orderItemStatus;
							    var rows = $('#stoneMasterGrid').jqxGrid('getrows');
							    var rowsMain = $('#jqxgridAcc').jqxGrid('getrows');
								 $.each(rowsMain,function(k,v){
									 orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", k,'orderKind');
									  orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue",k,'orderItemStatus');
								 });
								 var suppliedByCode =  $("#stoneMasterGrid").jqxGrid("getcellvalue",row,'suppliedByCode');
								 var id = $('#stoneMasterGrid').jqxGrid('getcellvalue',row,'id');
										if(stoneId == null){
										   if ((orderKind == "NO" || orderKind == "SRP") && suppliedByCode == "CO" ) {
												 if(orderItemStatus == "G"){
													if((rows[row].stoneWeightsUsed) != null && (rows[row].stoneWeightsUsed > 0)&&(id != undefined || id !=null)){	
														return false;
												  	}else if((rows[row].compGivenWt != null && rows[row].compGivenWt > 0)&&(id != undefined || id !=null)){		
												  		$("#stoneMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
														return true;
													}else if(((rows[row].compGivenWt == 0 || rows[row].compGivenWt == null)&&(id != undefined || id !=null) )){
														$("#stoneMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
														return true;
													}else if(((rows[row].compGivenWt == 0 || rows[row].compGivenWt == null)&&(id =="undefined" || id ==null) )){
														return true;
													}
												 }else{
													 return false;
												 }
										 }else{
											return false;
										 }
									}else{
										return false;
									}
							},
							cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
								 var stoneRate =  $("#stoneMasterGrid").jqxGrid("getcellvalue",row,'stoneRate');
								 if(newvalue != "" || stoneRate != ""){
									 var Price = newvalue * stoneRate;
									 $("#stoneMasterGrid").jqxGrid('setcellvalue', row,'stonePrice',Price);
								 }
							}
						},{
							text : 'UQC',
							datafield : 'uom',
							width : '4%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						}, {
							text : 'Stone Rate',
							datafield : 'stoneRate',
							width : '4%',
							cellsalign : 'center',
							align : 'center',
							cellsformat : 'd2',
							editable : false
						},{
							text : 'Stone Price',
							datafield : 'stonePrice',
							width : '6%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							cellsformat : 'd2',
						}, {
							text : 'JW Price',
							datafield : 'jwPrice',
							width : '6%',
							cellsalign : 'center',
							align : 'center',
							cellsformat : 'd2',
							editable : false
						},{
							datafield : 'stoneIdEdit',
							width : '5%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
					        cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue,value){
							var orderKind;
							var orderItemStatus;
						    var rows = $('#stoneMasterGrid').jqxGrid('getrows');
						    var rowsMain = $('#jqxgridAcc').jqxGrid('getrows');
							 $.each(rowsMain,function(k,v){
								 orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", k,'orderKind');
								  orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue",k,'orderItemStatus');
							 });
							 var id = $('#stoneMasterGrid').jqxGrid('getcellvalue',row,'id');	
						    if(stoneId == null){
						    	if (orderKind == "NO" || orderKind == "SRP" ){
									if(rows[row].id == null || rows[row].id === undefined){
										return '<button class="btn btn-sm btn-primary" type="button"  data-toggle="modal" data-target="#addStoneDet" id='
										+ row
										+ ' onclick="editStoneDetE('
										+ row
										+ ')" /><i class="fa fa-pencil fa-1"></i></button>'
									}else{
										
									}
						    	}
							}else{	
								if (orderKind == "NO" || orderKind == "SRP" ) {
									if(rows[row].id == null || rows[row].id === undefined){
										return '<button class="btn btn-sm btn-primary" type="button"  data-toggle="modal" data-target="#addStoneDet" id='
										+ row
										+ ' onclick="editStoneDetE('
										+ row
										+ ')" /><i class="fa fa-pencil fa-1"></i></button>'
									}else{
										
									}
								}
						   }
			        }
		      }]
	  });
 }
var accAccRows = [];
// Accessory Master Grid
var accMasterGrid = function(data,accryId) {
	if(accryId == 1){
	var source = {
		datafields : [ {
			name : 'artLinkSlNo',
			type : 'int'
		},{
			name : 'id',
			type : 'int'
		},{
			name : 'slNo',
			type : 'int'
		}, {
			name : 'accSupBy',
			type : 'string'
		}, {
			name : 'accSupByName',
			type : 'string'
		}, {
			name : 'accMainCat',
			type : 'string'
		}, {
			name : 'accMainCatCode',
			type : 'string'
		}, {
			name : 'accMainCatName',
			type : 'string'
		}, {
			name : 'accSubCat',
			type : 'string'
		}, {
			name : 'accSubCatCode',
			type : 'string'
		}, {
			name : 'accSubCatName',
			type : 'string'
		},{
			name : 'accArtCode',
			type : 'string'
		}, {
			name : 'accArticleId',
			type : 'int'
		}, {
			name : 'rateList',
			type : 'array'
		}, {
			name : 'uom',
			type : 'string'
		}, {
			name : 'accRate',
			type : 'long'
		}, {
			name : 'jwAccPcs',
			type : 'string'
		}, {
			name : 'jwAccWt',
			type : 'float'
		}, {
			name : 'jwAccPrice',
			type : 'string'
		},{
			name : 'compAccPcs',
			type : 'string'
		},{
			name : 'compAccWt',
			type : 'float'
		},{
			name : 'compAccPrice',
			type : 'float'
		},{
			name : 'currentOperation',
			type : 'string'
		},{
			name : 'accCondition',
			type : 'string'
		},{
			name : 'actionId',
			type : 'int'
		},{
			name : 'compWeight',
			type : 'float'
		},{
			name : 'companyReqWt',
			type : 'float'
		},{
			name : 'weightsUsed',
			type : 'float',
		},{
			name : 'accIdEdit',
			type : 'int',
		},{
			name : 'costPrice',
			type : 'float',
		},{
			name : 'newAccFlag',
			type : 'boolean',
			map: 'newAccFlag'
		}],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	}	
	}else{
		var source = {
				datafields : [ {
					name : 'artLinkSlNo',
					type : 'int',
					map  : 'orderItemSlNo'
				},{
					name : 'id',
					type : 'int',
					map  : 'id'
				},{
					name : 'slNo',
					type : 'int',
					map  : 'serialNumber'
				}, {
					name : 'accSupBy',
					type : 'string',
					map  : 'suppliedBy>id'
				}, {
					name : 'accSupByName',
					type : 'string',
					map  : 'suppliedBy>name'
				}, {
					name : 'accMainCat',
					type : 'string',
					map  : ''
				}, {
					name : 'accMainCatCode',
					type : 'string',
					map  : ''
				}, {
					name : 'accMainCatName',
					type : 'string',
					map  : 'category'
				}, {
					name : 'accSubCat',
					type : 'string',
					map  : 'subCategory>id'
				}, {
					name : 'accSubCatCode',
					type : 'string',
					map  : 'subCategory>name'
				}, {
					name : 'accSubCatName',
					type : 'string',
					map  : 'subCategory>description'
				}, {
					name : 'accArtCode',
					type : 'string',
					map  : 'code>name'
				}, {
					name : 'accArticleId',
					type : 'int',
					map  : 'code>id'
				}, {
					name : 'rateList',
					type : 'array',
					map  : ''
				}, {
					name : 'uom',
					type : 'string',
					map  : 'uom>name'
				}, {
					name : 'accRate',
					type : 'long',
					map  : 'rate'
				}, {
					name : 'jwAccPcs',
					type : 'string',
					map  : 'vendorReqPieces'
				}, {
					name : 'jwAccWt',
					type : 'float',
					map  : 'vendorReqWeight'
				}, {
					name : 'jwAccPrice',
					type : 'string',
					map  : 'vendorPrice'
				}, {
					name : 'compAccPcs',
					type : 'string',
					map  : 'companyReqPcs'
				}, {
					name : 'compAccWt',
					type : 'float',
					map  : 'companyReqWt'
				}, {
					name : 'compAccPrice',
					type : 'float',
					map  : 'compPrice'
				}, {
					name : 'accCondition',
					type : 'string',
					map  : 'condition'
				},{
					name : 'currentOperation',
					type : 'string'
				},{
					name : 'compWeight',
					type : 'float'
				},{
					name : 'companyReqWt',
					type : 'float'
				},{
					name : 'weightsUsed',
					type : 'float',
				},{
					name : 'actionId',
					type : 'int',
					map  : 'id'
				},{
					name : 'accIdEdit',
					type : 'int',
				},{
					name : 'costPrice',
					type : 'float',
				},{
					name : 'newAccFlag',
					type : 'boolean',
					map: 'newAccFlag'
				} ],
				localdata : data,
				deleterow : function(rowid, commit) {
					commit(true);
				},
	        }
	};

var dataAdapter = new $.jqx.dataAdapter(source);
$("#accMasterGrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		height : 200,
		columnsheight : 70,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div class='col-md-12' style='margin-top: 5px;'></div>");
			toolbar.append(container);
			container.append('<div class="col-md-4 pull-left"><i class="fa fa-list fa-md"></i>&nbsp; Accessory Details</div><div class="pull-right">(select row to delete)&nbsp;<div  id="deleteaccrowbutton" class="btn btn-danger btn-sm"><i class="fa fa-trash fa-md"></i></div></div>');
			$("#deleteaccrowbutton").jqxButton();
			$("#deleteaccrowbutton").on('click',function() {
			 var selectedrowindex = $("#accMasterGrid").jqxGrid('getselectedrowindex');
			 var accRows = $("#accMasterGrid").jqxGrid('getrows');
			 var rows = $("#jqxgridAcc").jqxGrid('getrows');
			 var getRowId =  $("#accMasterGrid").jqxGrid('getcellvalue',selectedrowindex,"id");
			 var rowIndex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
			 var rowscount = $("#accMasterGrid").jqxGrid('getdatainformation').rowscount;
			 
			 if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
				     var rows = $('#jqxgridAcc').jqxGrid('getrows');
					 var artLinkSlNo =  $("#accMasterGrid").jqxGrid('getcellvalue',selectedrowindex,"artLinkSlNo");
					 var mainGridOneRow = $("#jqxgridAcc").jqxGrid('getrowdata',artLinkSlNo-1);
					 var orderKind = mainGridOneRow.orderKind ;
					 var orderItemStatus =  mainGridOneRow.orderItemStatus;
					 var weightsUsed =  $("#accMasterGrid").jqxGrid("getcellvalue",selectedrowindex,'weightsUsed');
					 var compWeight =  $("#accMasterGrid").jqxGrid("getcellvalue",selectedrowindex,'compWeight');
					 var id = $("#accMasterGrid").jqxGrid('getrowid',selectedrowindex);
					 
						 if(accryId == null){
							 if(orderKind == 'SRP' || orderKind == 'NO'){ 
									 if(orderItemStatus == "G"){
									 if(weightsUsed != null && weightsUsed >0){}
									 else if(compWeight != null && compWeight >0){}
                                     else if((compWeight == null || compWeight == 0) && (getRowId == null || getRowId === undefined)){
                                    	 var commit = $("#accMasterGrid").jqxGrid('deleterow',id);
									   }
									 else if((compWeight == null || compWeight == 0) && (getRowId != null || getRowId != undefined)){
										 $("#accMasterGrid").jqxGrid("setcellvalue",id,'currentOperation',"delete")
										 var AccNewArray  = $("#accMasterGrid").jqxGrid('getrowdata',id);
										 accAccRows.push(AccNewArray);
										 var commit = $("#accMasterGrid").jqxGrid('deleterow',id);
									 }
								 }else{}
							 }
						 }else{
							   if(orderKind == 'SRP'){ 
								 for(i=0; i<accRows.length; i++){
									 if(getRowId == null || getRowId == "undefined" || getRowId == ""){
										 var commit = $("#accMasterGrid").jqxGrid('deleterow',id);
									 }
								  }
							   }else if(orderKind == 'SSP'){}
							    else{ var commit = $("#accMasterGrid").jqxGrid('deleterow',id)}
						 }
				    }
				 var rowVar = 0;
				 $.each($("#accMasterGrid").jqxGrid('getrows'),function(k,v){
					 if(artLinkSlNo == v.artLinkSlNo){
						 rowVar++;
						 $("#accMasterGrid").jqxGrid('setcellvalue',k,"slNo",rowVar);
					 }
				 })
			});
		},
		columns : [ 
		{datafield : 'weightsUsed',hidden : 'true'},
		{datafield : 'compWeight',hidden : 'true'},
		{
			text : 'Article Link Sl No',
			datafield : 'artLinkSlNo',
			width : '6%',
			cellsalign : 'center',
			align : 'center',
			editable : false
		}, {
			text : 'Sl No',
			datafield : 'slNo',
			width : '4%',
			cellsalign : 'center',
			align : 'center',
			editable : false
		}, {
			text : 'Supp By',
			datafield : 'accSupByName',
			width : '6%',
			cellsalign : 'center',
			editable : false
		}, {
			text : '',
			datafield : 'currentOperation',
			hidden : true
		}, {
			text : 'Main Cat',
			datafield : 'accMainCatName',
			width : '8%',
			cellsalign : 'center',
			align : 'center',
			editable : false
		}, {
			text : 'Sub Cat',
			datafield : 'accSubCatName',
			width : '6%',
			cellsalign : 'center',
			align : 'center',
			editable : false
		}, {
			text : 'Article Code',
			datafield : 'accArtCode',
			width : '7%',
			cellsalign : 'center',
			align : 'center',
			editable : false
		}, {
			text : 'UOM',
			datafield : 'uom',
			width : '6%',
			cellsalign : 'center',
			align : 'center',
			editable : false
		}, {
			text : 'Rate',
			datafield : 'accRate',
			width : '6%',
			cellsalign : 'center',
			align : 'center',
			cellsformat : 'd2',
			editable : false
		}, {
			text : 'JW Acc Pcs',
			datafield : 'jwAccPcs',
			width : '6%',
			cellsalign : 'center',
			align : 'center',
			editable : true,
			 cellbeginedit:function(row, datafield, columntype) {
					var orderKind;
					var orderItemStatus;
				    var rows = $('#accMasterGrid').jqxGrid('getrows');
				    var rowsMain = $('#jqxgridAcc').jqxGrid('getrows');
					 $.each(rowsMain,function(k,v){
						 orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", k,'orderKind');
						  orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue",k,'orderItemStatus');
					 });
					 var accSupBy =  $("#accMasterGrid").jqxGrid("getcellvalue",row,'accSupBy');  
					 var id = $('#accMasterGrid').jqxGrid('getcellvalue',row,'id');	
						if(accryId == null){
						   if ((orderKind == "NO" || orderKind == "SRP") && accSupBy == "V") {
								 if(orderItemStatus == "G"){
										if((rows[row].weightsUsed) != null && (rows[row].weightsUsed > 0)&&(id != null || id != undefined)){	
											return false;
										}else if((rows[row].compWeight != null && rows[row].compWeight > 0)&&(id != null || id != undefined)){		
									  		$("#accMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
											return true;
										}else if((rows[row].compWeight == 0 || rows[row].compWeight == null)&&(id == null || id === undefined)){
											return true;
										}else if((rows[row].compWeight == 0 || rows[row].compWeight == null)&&(id != null || id != undefined)){
											$("#accMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
											return true;
										}
								 }else{
									 return false;
								 }
						 }else{
							return false;
						 }
					}else{
						return false;
					}
			   },
			   cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					 var accRate =  $("#accMasterGrid").jqxGrid("getcellvalue",row,'accRate');
					 if((newvalue != "" || accRate != "")){
						 var Price = newvalue * accRate;
						 $("#accMasterGrid").jqxGrid('setcellvalue', row,'jwAccPrice',Price);
					 }
				}
		}, {
			text : 'JW Acc Wt',
			datafield : 'jwAccWt',
			width : '8%',
			cellsalign : 'center',
			align : 'center',
			cellsformat : 'd3',
			editable : true,
			 cellbeginedit:function(row, datafield, columntype) {
					var orderKind;
					var orderItemStatus;
				    var rows = $('#accMasterGrid').jqxGrid('getrows');
				    var rowsMain = $('#jqxgridAcc').jqxGrid('getrows');
					 $.each(rowsMain,function(k,v){
						 orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", k,'orderKind');
						  orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue",k,'orderItemStatus');
					 });
					 var accSupBy =  $("#accMasterGrid").jqxGrid("getcellvalue",row,'accSupBy');  
					 var id = $('#accMasterGrid').jqxGrid('getcellvalue',row,'id');	
						if(accryId == null){
						   if ((orderKind == "NO" || orderKind == "SRP") && accSupBy == "V") {
								 if(orderItemStatus == "G"){
										if((rows[row].weightsUsed) != null && (rows[row].weightsUsed > 0)&&(id != null || id != undefined)){	
											return false;
										}else if((rows[row].compWeight != null && rows[row].compWeight > 0)&&(id != null || id != undefined)){		
									  		$("#accMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
											return true;
										}else if((rows[row].compWeight == 0 || rows[row].compWeight == null)&&(id == null || id === undefined)){
											return true;
										}else if((rows[row].compWeight == 0 || rows[row].compWeight == null)&&(id != null || id != undefined)){
											$("#accMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
											return true;
										}
								 }else{
									 return false;
								 }
						 }else{
							return false;
						 }
					}else{
						return false;
					}
			   },
			   cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
					 var accRate =  $("#accMasterGrid").jqxGrid("getcellvalue",row,'accRate');
					 var uom =  $("#accMasterGrid").jqxGrid("getcellvalue",row,'uom');
					 if((newvalue != "" || accRate != "")&&(uom != "Pcs")){
						 var Price = newvalue * accRate;
						 $("#accMasterGrid").jqxGrid('setcellvalue', row,'jwAccPrice',Price);
					 }
				}
		}, {
			text : 'JW Acc Price',
			datafield : 'jwAccPrice',
			width : '8%',
			cellsalign : 'center',
			align : 'center',
			cellsformat : 'd2',
			editable : false,
		}, {
			text : 'Comp Acc Pcs',
			datafield : 'compAccPcs',
			width : '8%',
			cellsalign : 'center',
			align : 'center',
			editable : true,
			cellbeginedit:function(row, datafield, columntype) {
				var orderKind;
				var orderItemStatus;
			    var rows = $('#accMasterGrid').jqxGrid('getrows');
			    var rowsMain = $('#jqxgridAcc').jqxGrid('getrows');
				 $.each(rowsMain,function(k,v){
					 orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", k,'orderKind');
					  orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue",k,'orderItemStatus');
				 });
				var accSupBy =  $("#accMasterGrid").jqxGrid("getcellvalue",row,'accSupBy');
				var id = $('#accMasterGrid').jqxGrid('getcellvalue',row,'id');	
						if(accryId == null){
						   if ((orderKind == "NO" || orderKind == "SRP") && accSupBy == "CO") {
								 if(orderItemStatus == "G"){
										if((rows[row].weightsUsed) != null && (rows[row].weightsUsed > 0)&&(id != null || id != undefined)){	
											return false;
										}else if((rows[row].compWeight != null && rows[row].compWeight > 0)&&(id != null || id != undefined)){		
									  		$("#accMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
											return true;
										}else if((rows[row].compWeight == 0 || rows[row].compWeight == null)&&(id == null || id === undefined)){
											return true;
										}else if((rows[row].compWeight == 0 || rows[row].compWeight == null)&&(id != null || id != undefined)){
											$("#accMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
											return true;
										}
								 }else{
									 return false;
								 }
						 }else{
							return false;
						 }
					}else{
						return false;
				}
			},
			cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
				 var accRate =  $("#accMasterGrid").jqxGrid("getcellvalue",row,'accRate');
				 if(newvalue != "" || accRate != ""){
					 var Price = newvalue * accRate;
					 $("#accMasterGrid").jqxGrid('setcellvalue', row,'compAccPrice',Price);
				 }
			}
		}, {
			text : 'Comp Acc Wt',
			datafield : 'compAccWt',
			width : '8%',
			cellsalign : 'center',
			align : 'center',
			cellsformat : 'd3',
			editable : true,
	        cellbeginedit:function(row, datafield, columntype) {
				var orderKind;
				var orderItemStatus;
			    var rows = $('#accMasterGrid').jqxGrid('getrows');
			    var rowsMain = $('#jqxgridAcc').jqxGrid('getrows');
				 $.each(rowsMain,function(k,v){
					 orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", k,'orderKind');
					  orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue",k,'orderItemStatus');
				 });
				var accSupBy =  $("#accMasterGrid").jqxGrid("getcellvalue",row,'accSupBy');
				var id = $('#accMasterGrid').jqxGrid('getcellvalue',row,'id');	
						if(accryId == null){
						   if ((orderKind == "NO" || orderKind == "SRP") && accSupBy == "CO") {
								 if(orderItemStatus == "G"){
										if((rows[row].weightsUsed) != null && (rows[row].weightsUsed > 0)&&(id != null || id != undefined)){	
											return false;
										}else if((rows[row].compWeight != null && rows[row].compWeight > 0)&&(id != null || id != undefined)){		
									  		$("#accMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
											return true;
										}else if((rows[row].compWeight == 0 || rows[row].compWeight == null)&&(id == null || id === undefined)){
											return true;
										}else if((rows[row].compWeight == 0 || rows[row].compWeight == null)&&(id != null || id != undefined)){
											$("#accMasterGrid").jqxGrid("setcellvalue",rows[row],'currentOperation',"modify");
											return true;
										}
								 }else{
									 return false;
								 }
						 }else{
							return false;
						 }
					}else{
						return false;
				}
			},
			cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
				 var accRate =  $("#accMasterGrid").jqxGrid("getcellvalue",row,'accRate');
				 var uom =  $("#accMasterGrid").jqxGrid("getcellvalue",row,'uom');
				 if((newvalue != "" || accRate != "")&&(uom != "Pcs")){
					 var Price = newvalue * accRate;
					 $("#accMasterGrid").jqxGrid('setcellvalue', row,'compAccPrice',Price);
				 }
			}
		}, {
			text : 'Comp Acc Price',
			datafield : 'compAccPrice',
			width : '8%',
			cellsalign : 'center',
			align : 'center',
			cellsformat : 'd2',
			editable : false
		},{
			datafield : 'accIdEdit',
			width : '5%',
			cellsalign : 'center',
			align : 'center',
			editable : false,
	        cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue,value){
				var orderKind;
				var orderItemStatus;
			    var rows = $('#accMasterGrid').jqxGrid('getrows');
			    var rowsMain = $('#jqxgridAcc').jqxGrid('getrows');
				 $.each(rowsMain,function(k,v){
					 orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", k,'orderKind');
					  orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue",k,'orderItemStatus');
				 });
				 var id = $('#accMasterGrid').jqxGrid('getcellvalue',row,'id');	
			    if(accryId == null){
			    	if (orderKind == "NO" || orderKind == "SRP" ) {
						if(rows[row].id == null || rows[row].id === undefined){
							return '<button class="btn btn-sm btn-primary" type="button"  data-toggle="modal" data-target="#addAccDet" id='
							+ row
							+ ' onclick="editAccDetE('
							+ row
							+ ')" /><i class="fa fa-pencil fa-1"></i></button>'
						}else{
						
						}
			    	}
			    }else{	
					if (orderKind == "NO" || orderKind == "SRP" ) {
						if(rows[row].id == null || rows[row].id === undefined){
							return '<button class="btn btn-sm btn-primary" type="button"  data-toggle="modal" data-target="#addAccDet" id='
							+ row
							+ ' onclick="editAccDetE('
							+ row
							+ ')" /><i class="fa fa-pencil fa-1"></i></button>'
						}else{ }
					}else{
						return "";
					}
			    }
		    }
        }]
   });
}

// Design Details Grid
var designMasterGrid = function(data,DesignId) {
	if(DesignId == 1){
	var source = {
		datafields : [ {
			name : 'artLinkSlNo',
			type : 'int'
		}, {
			name : 'isEmpApprovalReqd',
			type : 'string'
		}, {
			name : 'isCustApprovalReqd',
			type : 'int'
		}, {
			name : 'designStatus',
			type : 'string'
		}, {
			name : 'designStatusId',
			type : 'string'
		}, {
			name : 'designerType',
			type : 'string'
		}, {
			name : 'designerTypeId',
			type : 'string'
		}, {
			name : 'designerName',
			type : 'long'
		}, {
			name : 'designerNameId',
			type : 'int'
		}, {
			name : 'dueDate',
			type :'date',
			format: 'dd/MM/yyyy'
		}, {
			name : 'numberOfVariations',
			type : 'int'
		}, {
			name : 'catalogueRefNumber',
			type : 'string'
		}, {
			name : 'designInstruction',
			type : 'string'
		} ,{
			name : 'id',
			type : 'int'
		}],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
}else{
	var source = {
			datafields : [ {
				name : 'artLinkSlNo',
				type : 'int',
				map  : 'linkedSlNo'
			}, {
				name : 'isEmpApprovalReqd',
				type : 'string',
				map  : 'isEmpApprovalReqd'
			}, {
				name : 'isCustApprovalReqd',
				type : 'int',
				map  : 'isCustApprovalReqd'
			}, {
				name : 'designStatus',
				type : 'string',
				map  : 'designStatus>name'
			}, {
				name : 'designStatusId',
				type : 'string',
				map  : 'designStatus>id'
			}, {
				name : 'designerType',
				type : 'string',
				map  : 'designerType>name'
			}, {
				name : 'designerTypeId',
				type : 'string',
				map  : 'designerType>id'
			}, {
				name : 'designerName',
				type : 'long',
				map  : 'designerName>name'
			}, {
				name : 'designerNameId',
				type : 'int',
				map  : 'designerName>id'
			}, {
				name : 'dueDate',
				type : 'date',
				map  : 'dueDate',
				format: 'dd/MM/yyyy'
			}, {
				name : 'numberOfVariations',
				type : 'int',
				map  : 'numberOfVariations'
			}, {
				name : 'catalogueRefNumber',
				type : 'string',
				map  : 'catalogueRefNumber'
			}, {
				name : 'designInstruction',
				type : 'string',
				map  : 'designInstruction'
			},{
				name : 'designMadeby',
				type : 'string',
				map  : 'designStatus>name'
			},{
				name : 'id',
				type : 'int'
			},{
				name : 'orderItemId',
				type : 'int'
			}],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
			}
        };
	var dataAdapter = new $.jqx.dataAdapter(source);
}
	
$("#designDetGrid").jqxGrid({
						source : dataAdapter,
						width : '100%',
						editable : false,
						height : 200,
						columnsheight : 50,
						autorowheight : true,
						autoheight : true,
						altRows : true,
						columnsresize : true,
						showtoolbar : true,
						rendertoolbar : function(toolbar) {
							var me = this;
							var container = $("<div class='col-md-12' style='margin-top: 12px;'></div>");
							toolbar.append(container);
							container.append('<div class="col-md-4 pull-left"><i class="fa fa-list fa-md"></i>&nbsp; Design Details</div><div class="pull-right</div>');
							
							/*if(DesignId == null){
								container.append('<div class="col-md-4 pull-left"><i class="fa fa-list fa-md"></i>&nbsp; Design Details</div><div class="pull-right">(select row to delete)&nbsp;<div  disabled id="deletedesignrowbutton" class="btn btn-primary btn-sm"><i class="fa fa-trash fa-md"></i></div></div>');
							}else{
							    container.append('<div class="col-md-4 pull-left"><i class="fa fa-list fa-md"></i>&nbsp; Design Details</div><div class="pull-right">(select row to delete)&nbsp;<div  id="deletedesignrowbutton" class="btn btn-danger btn-sm"><i class="fa fa-trash fa-md"></i></div></div>');
							}
							
							$("#deletedesignrowbutton").jqxButton();
							$("#deletedesignrowbutton").on('click',function() {
								 var rows = $('#jqxgridAcc').jqxGrid('getrows');
								 var selectedrowindex = $("#designDetGrid").jqxGrid('getselectedrowindex');
								 var artLinkSlNo =  $("#designDetGrid").jqxGrid('getcellvalue',selectedrowindex,"artLinkSlNo");
								 var mainGridOneRow = $("#jqxgridAcc").jqxGrid('getrowdata',artLinkSlNo-1);
								 var orderKind = mainGridOneRow.orderKind;
								 var orderItemStatus =  mainGridOneRow.orderItemStatus;
								 var rowscount = $("#designDetGrid").jqxGrid('getdatainformation').rowscount;
								 for (var i = 0; i < rowscount; i++) {
								 $("#accMasterGrid").jqxGrid("setcellvalue",i,"artLinkSlNo",i + 1);
								 }
								 if(DesignId == null){
									return false;
								 }else{
									 if(orderKind == "NO" || orderKind == "SRP"){
									 if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
											var id = $("#designDetGrid").jqxGrid('getrowid',selectedrowindex);
											var commit = $("#designDetGrid").jqxGrid('deleterow',id);
										 }
								    }
								}
						   });*/
						},
						columns : [ 
						{datafield:"designMadeby", hidden:true},
						{datafield:"designStatusId",hidden:true},
						{
							text : 'Article Link Sl No',
							datafield : 'artLinkSlNo',
							width : '10%',
							cellsalign : 'center',
							align : 'center',
						}, {
							text : 'Is Emp Approval Req.',
							datafield : 'isEmpApprovalReqd',
							width : '15%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						},{
							text : 'Design Status',
							datafield : 'designStatus',
							width : '10%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						},{
							text : 'Design Type',
							datafield : 'designerType',
							width : '10%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						},{
							text : 'Designer Name',
							datafield : 'designerName',
							width : '10%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						},{
							text : 'Due Date',
							datafield : 'dueDate',
							width : '10%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							//columntype : 'datetimeinput',
							cellsformat : 'dd/MM/yyyy',
							/*createeditor : function(rowIndex,cellValue, editor) {
								var d = new Date();
								d.setDate(d.getDate() - 1);
								editor.jqxDateTimeInput('setMinDate', d.toLocaleString());
							},*/
						},{
							text : 'No of Variation',
							datafield : 'numberOfVariations',
							width : '10%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						},{
							text : 'Catalogue Ref. No',
							datafield : 'catalogueRefNumber',
							width : '10%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						},{
							text : 'Design Instru.',
							datafield : 'designInstruction',
							width : '12%',
							cellsalign : 'center',
							align : 'center',
							editable : false
						},{
							text : '',
							datafield : 'id',
							width : '3%',
							cellsalign : 'center',
							align : 'center',
							editable : true,
							cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue,value) {
								var rows = $("#jqxgridAcc").jqxGrid("getrows");
								var getDesignRows = $("#designDetGrid").jqxGrid("getrows");
								 $.each(rows,function(k,v){
									 orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", k,'orderKind');
									  orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue",k,'orderItemStatus');
								 });
							    if(DesignId == null){
										 if(getDesignRows[row].id == null || getDesignRows[row].id === undefined){
											 return '<button class="btn btn-sm btn-primary" type="button"   data-toggle="modal" data-target="#DesignDetSC" id='
												+ row
												+ ' onclick="editDesignDet('
												+ row
												+ ')" /><i class="fa fa-pencil fa-1"></i></button>'
										 }else{
										if(getDesignRows[row].designStatusId == "G"){	 
											 if(orderItemStatus == "G" || orderItemStatus == ""){
												return '<button class="btn btn-sm btn-primary" type="button"   data-toggle="modal" data-target="#DesignDetSC" id='
												+ row
												+ ' onclick="editDesignDet('
												+ row
												+ ')" /><i class="fa fa-pencil fa-1"></i></button>'
											 }else{
												return '<button class="btn btn-sm btn-primary" disabled type="button"   data-toggle="modal" data-target="#DesignDetSC" id='
												+ row
												+ ' onclick="editDesignDet('
												+ row
												+ ')" /><i class="fa fa-pencil fa-1"></i></button>'
											 }
										 }
									 }
								}else{	
									return '<button class="btn btn-sm btn-primary" type="button" data-toggle="modal" data-target="#DesignDetSC" id='
									+ row
									+ ' onclick="editDesignDet('
									+ row
									+ ')" /><i class="fa fa-pencil fa-1"></i></button>'
								}
							}
					   }]
				});
           }


// Find Vendor code
var findVendor = function() {
	$("#vendorList").empty();
	var rows = $("#jqxgridAcc").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	var segId = rows[selectedrowindex].segment;
	var jewelType = rows[selectedrowindex].jewelType;

	if (segId == null || segId == "") {
		$.growl.error({
			message : "Please select segment.",
			duration : 10000
		});
		return false;
	}
	if (jewelType == null || jewelType == "") {
		$.growl.error({
			message : "Please select jewel type.",
			duration : 10000
		});
		return false;
	}

	var searchVCode = $("#searchVCode").val();
	var fieldFilter = {
		"fieldFilters" : {
			"segId" : segId,
			"mJewelId" : jewelType,
			"vType" : "NONE",
			"vSearchCode" : searchVCode
		}
	};

	postJSON('/OrderExecution/api/v1/getMetalJewelTypeVendorCode',JSON.stringify(fieldFilter),function(data) {
				var vcode = data.payload.vCodeList;
				var i = 0;
				var tableData = "";
				if(data.resCode == 1){
				$.each(vcode,function(k, v) {
									tableData += '<tr>';
									tableData += '<td><div class="radio-inline"><input type="radio" name="vendorCode"  id="vendorCode" code="'
											+ v.name
											+ '" value="'
											+ v.id
											+ '" > <label>'
											+ v.name
											+ '</label></div></td>';
									tableData += '</tr>';
									i++;
								});
				$("#vendorList").append(tableData);
				}else if(data.resCode == 1){
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
					return false;
				}else{
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
					return false;
				 }
			});
       }


var demoData ;
var pairVal;
// On change Sub Category getting article Code
$("#subCat").on('change',function() {
			$("#articleList").empty();
			var rows = $("#jqxgridAcc").jqxGrid('getrows');
			var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
			var segId = rows[selectedrowindex].segment;
			var jewelType = rows[selectedrowindex].jewelType;
			var subCat = $("#subCat").val();
			var vendorCode = rows[selectedrowindex].vendorCode;

			var fieldFilters = {
				"fieldFilters" : {
					"segId" : segId,
					"mJewelId" : jewelType,
					"sCatId" : subCat,
					"vId" : vendorCode
				}
			};

			postJSON('/OrderExecution/api/v1/getArticleCode', JSON.stringify(fieldFilters), function(data) {
				var vArticleCodeList = data.payload.vArticleCodeList;
				demoData = data.payload.vArticleCodeList;
				$.each(demoData,function(k,v){
					$("#pairValues").val(v.value);
				});
				var i = 0;
				var tableData = "";
				$.each(vArticleCodeList, function(k, v) {
					tableData += '<tr>';
					tableData += '<td><div class="radio-inline"><input type="radio" desc="'
							+ v.description
							+ '"  name="articleList"  id="articleList" code="'
							+ v.name + '" value="' + v.id + '" > <label>'
							+ v.name + '</label></div></td>';
					tableData += '</tr>';
					i++;
				});
				$("#articleList").append(tableData);
			});
		});

// Find Article Code in Modal
var findArticle = function() {
	
	$("#articleList").empty();
	$('#mainCat').empty().append('<option value="" selected>--Select--</option>');
	$('#subCat').empty().append('<option value="" selected>--Select--</option>');
	var rows = $("#jqxgridAcc").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	var segId = rows[selectedrowindex].segment;
	var jewelType = rows[selectedrowindex].jewelType;
	var vendorCode = rows[selectedrowindex].vendorCode;
	
	var orderKind = rows[selectedrowindex].orderKind;
	
	var pcs = $("#jqxgridAcc").jqxGrid('getcellvalue',selectedrowindex,'labelName');
	if(pcs == "" || pcs == null){
		$('#findArticle').modal('hide');
		$.growl.error({
			message : "Please Enter Pcs !!! ",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$('#findArticle').modal('show');
	}
	if(orderKind == "NO"){
		$("#jqxgridAcc").jqxGrid('setcellvalue',selectedrowindex,'metalCol',null);
		$("#jqxgridAcc").jqxGrid('setcellvalue',selectedrowindex,'metalColN',null);
	}
	
	if (segId == null || segId == "") {
		$.growl.error({
			message : "Please select segment.",
			duration : 10000
		});
		return false;
	}
	
	if (jewelType == null || jewelType == "") {
		$.growl.error({
			message : "Please select jewel type.",
			duration : 10000
		});
		return false;
	}

	if (vendorCode == null || vendorCode == "") {
		$.growl.error({
			message : "Please select vendor code.",
			duration : 10000
		});
		return false;
	} 
	var fieldFilter = {
		"fieldFilters" : {
			"segId" : segId,
			"mJewelId" : jewelType,
			"vId" : vendorCode
		}
	};
   postJSON('/OrderExecution/api/v1/getMetalJewelTypeCategoryAndSubCategory',JSON.stringify(fieldFilter), function(data) {
			var mainCatList = data.payload.mainCatList;
			var subCatList = data.payload.subCatList;

			$.each(mainCatList, function(k, v) {
				$('#mainCat').append('<option code="' + v.name + '" value="' + v.id+ '">' + v.description + '</option>');
			});
			$.each(subCatList, function(k, v) {
				$('#subCat').append('<option  code="' + v.name + '" value="' + v.id+ '">' + v.description + '</option>');
	   });
   });
}

var arr = [];
var addAttrDet = function() {
	
	$("#updateAttr").hide();
	$("#saveAttribute").show();
	
	var rows = $("#jqxgridAcc").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	var segId = rows[selectedrowindex].segment;
	var jewelType = rows[selectedrowindex].jewelType;

	if(segId == "" || jewelType == ""){
		$.growl.error({
			message : "Please Segment Type  and Jewel Type.",
			duration : 10000
		});
		return false;
	}else{
	var fieldFilter = {
		"fieldFilters" : {
			"metalId" : segId,
			"mJewelId" : jewelType
		}
	};
	postJSON('/OrderExecution/api/v1/getMetalJewelTypeAttributesForST', JSON.stringify(fieldFilter), function(data) {
		 arr = [];
		var mAttributes = data.payload.mAttributes;
			if (typeof mAttributes != "undefined") {
				var lengthAttr = mAttributes.length;
				var newVal = "";
				$.each(mAttributes, function(key, value) {
					var label = key.split('|');
					newVal += '<div class="col-md-6"><span class="required">*</span>&nbsp;<label>' + label[1]
							+ '</label>';
					newVal += '<input type="hidden" value="' + label[1]
							+ '"><select id="' + label[0]
							+ '" class="form-control">';
					arr.push(label[0]);
					newVal += '<option value="" selected>--Select--</option>';
					$.each(value, function(k, v) {
						newVal += '<option id="' + label[0] + '" name="' + v.name
								+ '" value="' + v.id + '">' + v.name + '</option>';
					});
					newVal += '</select></div>';
				});
				$("#attributeDetailVal").append(newVal);
			}
		});
	}
}
var attrArr = [];

var tableValue;
$("#attributeDetSection").hide();
// Validation Attribute Modal Form

$('#saveAttribute').on('click',function() {
	    attrFlag = true;
		$.each(arr,function(k,v){
			if($("#"+v).val() == "" || $("#"+v).val() == null){
				attrFlag = false;
				$.growl.error({
					message :"Please fill all the manadatory field!!" ,
					duration : 10000
				});
				 $('#addAttDetails').modal('show');
			     return false;
			}
		});
		if(attrFlag == true){
		var attributeArray = [];
		var linkedAttrArr = [];
		var obj = {};
		var rowsMaster = $("#jqxgridAcc").jqxGrid('getrows');
		var selectedrowindexMaster = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	    $.each($('#attrDetailsForm select option:selected'),function(key, value) {
		$.each($('#attrDetailsForm input'), function(k,v) {
				if (key == k) {
					var labelObj = $(value).attr("id").toString();
					var attrName = $(value).text();
					var attrValue = (value.value).toString();
					var label = v.value;
					var showtext = "<b> " + label + " </b> : " + attrName + " ";
					linkedAttrArr.push(showtext);
                    
					var newArr = {
						"id" : (labelObj == "length" || labelObj == "size" || labelObj == "height" || labelObj == "diameter" ||labelObj == "width") ? attrName : attrValue,
						"name" : attrName
					}
					obj[labelObj] = newArr;
				}
			});
		});
		         
		var rows = $("#attributeDetSection").jqxGrid('getrows');
		if (typeof rows != "undefined") {
			if (rows.length > 0) {
				for (var i = 0; i < rows.length; i++) {
					if (rows[i].artLinkSlNo == rowsMaster[selectedrowindexMaster].serialNo) {
						$.growl.error({
									message : "Please add only one attribute for one line item.",
									duration : 10000
								});
						//$("#addAttDetails").modal('hide');
						return false;
					}
				}
			}
		}

		if (typeof rows == "undefined") {
			var rowAttribute = {
				"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
				"attributes" : linkedAttrArr.toString(),
				"attrdetval" : obj
			};
		} else {
			var rowAttribute = {
				"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
				"attributes" : linkedAttrArr.toString(),
				"attrdetval" : obj
			};
			for (i = 0; i < rows.length; i++) {
				attributeArray.push(rows[i]);
			}
		}

		attributeArray.push(rowAttribute);
		attributeMasterGrid(attributeArray,attrId=1);
		$('#addAttDetails').modal('hide');
		$("#attributeDetSection").show();
	}
});

var attributeMasterGrid = function(data,attrId) {
	if(attrId == 1){
	var source = {
		datafields : [ {
			name : 'artLinkSlNo',
			type : 'int'
		}, {
			name : 'attributes',
			type : 'string'
		}, {
			name : 'attrdetval',
			type : 'array'
		} ],
		localdata : data,
		deleterow : function(rowid, commit) {
			commit(true);
		},
	};
	}else{
		var source = {
			datafields : [ {
				name : 'artLinkSlNo',
				type : 'int'
			}, {
				name : 'attributes',
				type : 'string',
			},{
				name : 'attrdetval',
				type : 'array',
			}],
			localdata : data,
			deleterow : function(rowid, commit) {
				commit(true);
			},
		};
	}

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#attributeDetSection").jqxGrid(
					{
						source : dataAdapter,
						width : '100%',
						editable : false,
						height : 200,
						autorowheight : true,
						autoheight : true,
						altRows : true,
						columnsresize : false,
						showtoolbar : true,
						rendertoolbar : function(toolbar) {
							var me = this;
							var container = $("<div class='col-md-12' style='margin-top: 5px;'></div>");
							toolbar.append(container);
							container.append('<div class="col-md-4 pull-left"><i class="fa fa-list fa-md"></i>&nbsp; Attributes Details</div><div class="pull-right">(select row to delete)&nbsp;<div  id="deleteattrrowbutton" class="btn btn-danger btn-sm"><i class="fa fa-trash fa-md"></i></div></div>');
							$("#deleteattrrowbutton").jqxButton();

							$("#deleteattrrowbutton").on('click',function() {
							var rows = $("#jqxgridAcc").jqxGrid('getrows');
							var rowIndex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
							var selectedrowindex = $("#attributeDetSection").jqxGrid('getselectedrowindex');
							var rowscount = $("#attributeDetSection").jqxGrid('getdatainformation').rowscount;
							for (var i = 0; i < rowscount; i++) {
							$("#accMasterGrid").jqxGrid("setcellvalue",i,"artLinkSlNo",i + 1);
							}
							if(attrId == 1){
							if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
							var id = $("#attributeDetSection").jqxGrid('getrowid',selectedrowindex);
									if(rows[rowIndex].orderKind == 'SRP'|| rows[rowIndex].orderKind == 'SSP') { //rows[row].orderKind == 'SSP' ||
										
									}else{
										var commit = $("#attributeDetSection").jqxGrid('deleterow',id);
									}
							     }
							  }
						  });
						},
						columns : [ {
							text : 'Article Link Sl No',
							datafield : 'artLinkSlNo',
							width : '10%',
							cellsalign : 'center',
							align : 'center'
						}, {
							text : 'Attributes',
							datafield : 'attributes',
							width : '87%',
							cellsalign : 'left',
							editable : false
						},{
							text : '',
							datafield : 'id',
							width : '3%',
							cellsrenderer : function(row, datafield, columntype,oldvalue, newvalue,value) {
							var rows = $("#jqxgridAcc").jqxGrid("getrows");
							var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
							var getAttrRows = $("#attributeDetSection").jqxGrid("getrows");
							 $.each(rows,function(k,v){
								 orderKind =  $("#jqxgridAcc").jqxGrid("getcellvalue", k,'orderKind');
								  orderItemStatus =  $("#jqxgridAcc").jqxGrid("getcellvalue",k,'orderItemStatus');
							 });
							    if(attrId == null){
									 if(orderItemStatus == "G" || orderItemStatus == ""){
											return '<button class="btn btn-sm btn-primary" type="button"   data-toggle="modal" data-target="#addAttDetails" id='
											+ row
											+ ' onclick="addAttrDetS('
											+ row
											+ ')" /><i class="fa fa-pencil fa-1"></i></button>'
										 }else{
											return '<button class="btn btn-sm btn-primary" disabled type="button"   data-toggle="modal" data-target="#addAttDetails" id='
											+ row
											+ ' onclick="addAttrDetS('
											+ row
											+ ')" /><i class="fa fa-pencil fa-1"></i></button>'
										 }
								}else{	
									//if(orderKind == "NO"){
										return '<button class="btn btn-sm btn-primary" type="button"   data-toggle="modal" data-target="#addAttDetails" id='
										+ row
										+ ' onclick="addAttrDetS('
										+ row
										+ ')" /><i class="fa fa-pencil fa-1"></i></button>'
									//}
								}
							}
						}
				  ]
		});
}
// Validation Stone Modal Form
$('#addStoneDetails').validate({
					errorElement : 'label',
					errorClass : 'help-inline',
					focusInvalid : false,
					ignore : "",
					rules : {
						"stoneSuppBy" : {
							required : true
						},
						"stoneSeg" : {
							required : true
						},
						"stoneMainCat" : {
							required : true
						},
						"stoneRate" : {
							required : true
						}
					},
					submitHandler : function(form) {
						var stoneArray = [];
						var rowsMaster = $("#jqxgridAcc").jqxGrid('getrows');
						var selectedrowindexMaster = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
						var rows = $("#stoneMasterGrid").jqxGrid('getrows');
						var flagStoneValid = validateStoneModel();
						if(flagStoneValid == true){
							if (typeof rows == "undefined") {
								var rowStone = {
								    "deleteStRow":null,
									"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
									"slNo" : 1,
									"stoneSupBy" : $("#stoneSuppBy").val(),
									"suppliedByCode":$("#stoneSuppBy").val(),
									"suppliedByNameCode" : $("#stoneSuppBy option:selected").attr('code'),
									"suppliedByName" : $("#stoneSuppBy option:selected").text(),
									"stoneSeg" : $("#stoneSeg").val(),
									"stoneSegName" : $("#stoneSeg option:selected").text(),
									"stoneSegCode" : $("#stoneSeg option:selected").attr('code'),
									"sSeg" : $("#stoneSeg option:selected").attr('code'),
									"stoneMainCat" : $("#stoneMainCat").val(),
									"stoneMainCatCode" : $("#stoneMainCat option:selected").attr('code'),
									"stoneMainCatName" : $("#stoneMainCat option:selected").text(),
									"stoneSubCat" : ($("#stoneSubCat").val() != "" || $("#stoneSubCat").val() != null) ? $("#stoneSubCat").val() : "",
									"stoneSubCatName" : ($("#stoneSubCat").val() != "" || $("#stoneSubCat").val() != null) ? $("#stoneSubCat option:selected").text(): "",
									"stoneSubCatCode" : ($("#stoneSubCat").val() != "" || $("#stoneSubCat").val() != null) ? $("#stoneSubCat option:selected").attr('code'): "",		
									"stoneArtCodeId" : $("#stoneArticleId").val(),
									"stoneArtCode" : $("#stoneArticleCode").val(),
									"stoneShape" : $("#stoneMainCat").val(),
									"stoneShapeCode" : $("#stoneShape option:selected").attr('code'),
									"stoneShapeName" : $("#stoneShape option:selected").text(),
									"clarity" : $("#clarity").val(),
									"actualColor" : $("#actualColor").val(),
									"color" : $("#color").val(),
									"cutGrade" : $("#cutGrade").val(),
									"uom" : $("#uom").val(),
									"newStoneFlag" : true,
									"stoneRate" : $("#stoneRate").val(),
									"jwStonePcs" : $("#jwStonePcs").val(),
									"jwStoneWt" : $("#jwStoneWt").val(),
									"jwPrice" : $("#jwPrice").val(),
									"compStonePcs" : $("#dplStonePcs").val(),
									"compStoneWt" : $("#dplStoneWt").val(),
									"stonePrice" : $("#stonePrice").val(),
									"stonCond" : $("#stoneCondition").val(),
									"subCatDesc" : $("#subCatDescriptionDesc").val(),
									"wtRange" : $("#wtRange").val(),
									"stoneWeightsUsed" : 0,
									"compWeight" : $("#dplStoneWt").val(),
				    			    "compPieces" :  $("#dplStonePcs").val(),
									"currentOperation" : "add"
								};
							} else {
								
								var rows = $("#stoneMasterGrid").jqxGrid('getrows');
								var artLinkSlNoForVali ;
								var rowscount = 0;
								$.each(rows,function(k,v){
									artLinkSlNoForVali = $("#stoneMasterGrid").jqxGrid("getcellvalue",k,"artLinkSlNo");
									if(artLinkSlNoForVali == rowsMaster[selectedrowindexMaster].serialNo){
									   rowscount++;
									}
								})
								 //$("#stoneMasterGrid").jqxGrid("getdatainformation").rowscount;
	
								var rowStone = {
									"deleteStRow":null,
									"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
									"slNo" : rowscount + 1,
									"stoneSupBy" : $("#stoneSuppBy").val(),
									"suppliedByCode":$("#stoneSuppBy").val(),
									"suppliedByNameCode" : $("#stoneSuppBy option:selected").attr('code'),
									"suppliedByName" : $("#stoneSuppBy option:selected").text(),
									"stoneSeg" : $("#stoneSeg").val(),
									"stoneSegName" : $("#stoneSeg option:selected").text(),
									"stoneSegCode" : $("#stoneSeg option:selected").attr('code'),
									"sSeg" : $("#stoneSeg option:selected").attr('code'),
									"stoneMainCat" : $("#stoneMainCat").val(),
									"stoneMainCatCode" : $("#stoneMainCat option:selected").attr('code'),
									"stoneMainCatName" : $("#stoneMainCat option:selected").text(),
									"stoneSubCat" : ($("#stoneSeg option:selected").text() == "Diamond" || $("#stoneSeg option:selected").text() == "Diamond") ? "": $("#stoneSubCat").val(),
									"stoneSubCatName" : ($("#stoneSeg option:selected").text() == "Diamond" || $("#stoneSeg option:selected").text() == "Diamond") ? "" : $("#stoneSubCat option:selected").text(),
									"stoneSubCatCode" : ($("#stoneSeg option:selected").text() == "Diamond" || $("#stoneSeg option:selected").text() == "Diamond") ? "" : $("#stoneSubCat option:selected").attr("code"),
									"stoneArtCodeId" : $("#stoneArticleId").val(),
									"stoneArtCode" : $("#stoneArticleCode").val(),
									"stoneShape" : $("#stoneMainCat").val(),
									"stoneShapeCode" : $("#stoneShape option:selected").attr('code'),
									"stoneShapeName" : $("#stoneShape option:selected").text(),
									"clarity" : $("#clarity").val(),
									"actualColor" : $("#actualColor").val(),
									"color" : $("#color").val(),
									"cutGrade" : $("#cutGrade").val(),
									"uom" : $("#uom").val(),
									"newStoneFlag" : true,
									"stoneRate" : $("#stoneRate").val(),
									"jwStonePcs" : $("#jwStonePcs").val(),
									"jwStoneWt" : $("#jwStoneWt").val(),
									"jwPrice" : $("#jwPrice").val(),
									"compStonePcs" : $("#dplStonePcs").val(),
									"compStoneWt" : $("#dplStoneWt").val(),
									"stonePrice" : $("#stonePrice").val(),
									"stonCond" : $("#stoneCondition").val(),
									"subCatDesc" : $("#subCatDescriptionDesc").val(),
									"wtRange" : $("#wtRange").val(),
									"stoneWeightsUsed" : 0,
				    			    "compWeight" : $("#dplStoneWt").val(),
				    			    "compPieces" :  $("#dplStonePcs").val(),
									"currentOperation" : "add"
								};
	
								for (i = 0; i < rows.length; i++) {
									stoneArray.push(rows[i]);
								}
							}
							console.log(stoneArray);
							stoneArray.push(rowStone);
							stoneMasterGrid(stoneArray,stoneId=1);
							$("#stoneMasterGrid").show();
	
							$("#addStoneDet").modal('hide');
							$("#CustOrderDue").hide();
							$("#goback").show();
							return false;
						}
			     }
		  });

// Validation Accessory Modal Form
$('#addAccDetails').validate(
				{
					errorElement : 'label',
					errorClass : 'help-inline',
					focusInvalid : false,
					ignore : "",
					rules : {
						"accSupBy" : {
							required : true
						},
						"accMainCat" : {
							required : true
						},
						"accSubCat" : {
							required : true
						},
						"accArticleCode" : {
							required : true
						},
						"uom" : {
							required : true
						},
						"accRate" : {
							required : true
						}
					},
					submitHandler : function(form) {
						var accArray = [];
						var rowsMaster = $("#jqxgridAcc").jqxGrid('getrows');
						var selectedrowindexMaster = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
                        var flagAccValidate = validateAccModel();
                        if(flagAccValidate == true){
						var rows = $("#accMasterGrid").jqxGrid('getrows');
						if (typeof rows == "undefined") {
							var rowAcc = {
								"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
								"slNo" : 1,
								"accSupBy" : $("#accSupBy").val(),
								"accSupByName" : $("#accSupBy option:selected").text(),
								"accMainCat" : $("#accMainCat").val(),
								"accMainCatCode" : $("#accMainCat option:selected").attr("code"),
								"accMainCatName" : $("#accMainCat option:selected").text(),
								"accSubCat" : $("#accSubCat").val(),
								"accSubCatCode" : $("#accSubCat option:selected").attr("code"),
								"accSubCatName" : $("#accSubCat option:selected").text(),
								"accArtCode" : $("#accArticleCode").val(),
								"accArticleId" : $("#accArticleId").val(),
								"uom" : $("#uomAcc").val(),
								"newAccFlag" : true,
								"rateList" : $("#rateList").val(),
								"accRate" : $("#accRate").val(),
								"jwAccPcs" : $("#jwAccPcs").val(),
								"jwAccWt" : $("#jwAccWt").val(),
								"jwAccPrice" : $("#jwAccPrice").val(),
								"compAccPcs" : $("#compAccPcs").val(),
								"compAccWt" : $("#compAccWt").val(),
								"compAccPrice" : $("#compAccPrice").val(),
								"accCondition" : $("#accCondition").val(),
								"weightsUsed" :  0,
								"compWeight" : $("#compAccWt").val(),
			    			    "compPieces" :  $("#compAccPcs").val(),
								"currentOperation" : "add"
							};
						} else {
							var rowscount = $("#accMasterGrid").jqxGrid("getdatainformation").rowscount;

							var rowAcc = {
								"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
								"slNo" : rowscount + 1,
								"accSupBy" : $("#accSupBy").val(),
								"accSupByName" : $("#accSupBy option:selected").text(),
								"accMainCat" : $("#accMainCat").val(),
								"accMainCatCode" : $("#accMainCat option:selected").attr("code"),
								"accMainCatName" : $("#accMainCat option:selected").text(),
								"accSubCat" : $("#accSubCat").val(),
								"accSubCatCode" : $("#accSubCat option:selected").attr("code"),
								"accSubCatName" : $("#accSubCat option:selected").text(),
								"accArtCode" : $("#accArticleCode").val(),
								"accArticleId" : $("#accArticleId").val(),
								"uom" : $("#uomAcc").val(),
								"newAccFlag" : true,
								"rateList" : $("#rateList").val(),
								"accRate" : $("#accRate").val(),
								"jwAccPcs" : $("#jwAccPcs").val(),
								"jwAccWt" : $("#jwAccWt").val(),
								"jwAccPrice" : $("#jwAccPrice").val(),
								"compAccPcs" : $("#compAccPcs").val(),
								"compAccWt" : $("#compAccWt").val(),
								"compAccPrice" : $("#compAccPrice").val(),
								"accCondition" : $("#accCondition").val(),
								"weightsUsed" :  0,
								"compWeight" : $("#compAccWt").val(),
			    			    "compPieces" :  $("#compAccPcs").val(),
								"currentOperation" : "add"
							};
							for (i = 0; i < rows.length; i++) {
								accArray.push(rows[i]);
							}
						}

						accArray.push(rowAcc);
						accMasterGrid(accArray,accryId=1);
						$("#accMasterGrid").show();
						$("#addAccDet").modal('hide');
						$("#CustOrderDue").hide();
						$("#goback").show();
						$("#accMasterGrid").show();
						$("#addAccDet").modal('hide');
						return false;
					}
			 }
		});

// Validation Accessory Modal Form
$('#designDetailsForm').validate(
		{
					errorElement : 'label',
					errorClass : 'help-inline',
					focusInvalid : false,
					ignore : "",
					rules : {
						"designDueDate" : {
							required : true
						},
						"designStatus" : {
							required : true
						},
						"designStatusDate" : {
							required : true
						},
						"designBy" : {
							required : true
						},
						"designerName" : {
							required : true
						},
						"noOfDesignReq" : {
							digits : true,
							required : true
						},
					},
					submitHandler : function(form) {
						var designArray = [];
						var approveDesign;

						var rowsMaster = $("#jqxgridAcc").jqxGrid('getrows');
						var selectedrowindexMaster = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
						var designTomade = $('input[name=designToApprov]:checked').val();
						if (designTomade == "0") {
							approveDesign = false;
						} else {
							approveDesign = true;
						}
						var rows = $("#designDetGrid").jqxGrid('getrows');
						
						//if(rowsMaster[selectedrowindexMaster].stockId === null || rowsMaster[selectedrowindexMaster].stockId == ""){
						if (typeof rows != "undefined") {
							if (rows.length > 0) {
								for (var i = 0; i < rows.length; i++) {
									if (rows[i].artLinkSlNo == rowsMaster[selectedrowindexMaster].serialNo) {
										$.growl.error({
													message : "Please add only one design for one line item.",
													duration : 10000
												});
										//$("#DesignDetSC").modal('hide');
										return false;
									}
								}
							}
						}
						if (typeof rows == "undefined") {
							var rowDesign = {
								"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
								"isEmpApprovalReqd" : (approveDesign == true) ? "True" : "False",
								"isCustApprovalReqd" : 0,
								"designStatus" : $("#designStatus").val(),
								"designStatusId" : $("#designStatusId").val(),
								"designerType" : $("#designBy option:selected").text(),
								"designerTypeId" : $("#designBy option:selected").attr('code'),
								"designerName" : $("#designerName option:selected").text(),
								"designerNameId" : $("#designerName").val(),
								"dueDate" : $("#designDueDate").val(),
								"numberOfVariations" : $("#noOfDesignReq").val(),
								"catalogueRefNumber" : $("#scCatalogueNo").val(),
								"designInstruction" : $("#designInstr").val()
							};
						} else {
							var rowDesign = {
								"artLinkSlNo" : rowsMaster[selectedrowindexMaster].serialNo,
								"isEmpApprovalReqd" : (approveDesign == true) ? "True" : "False",
								"isCustApprovalReqd" : 0,
								"designStatus" : $("#designStatus").val(),
								"designStatusId" : $("#designStatusId").val(),
								"designerType" : $("#designBy option:selected").text(),
								"designerTypeId" : $("#designBy option:selected").attr('code'),
								"designerName" : $("#designerName option:selected").text(),
								"designerNameId" : $("#designerName").val(),
								"dueDate" :  $("#designDueDate").val(),
								"numberOfVariations" : $("#noOfDesignReq").val(),
								"catalogueRefNumber" : $("#scCatalogueNo").val(),
								"designInstruction" : $("#designInstr").val()
							};
							for (i = 0; i < rows.length; i++) {
								designArray.push(rows[i]);
							}
						}
						designArray.push(rowDesign);
						designMasterGrid(designArray,DesignId=1);
						$("#designDetGrid").show();
						$("#DesignDetSC").modal('hide');
						return false;
					}
				});

$("#stoneRate").on('change', function() {
	$("#dplStonePcs").val();
	$("#dplStoneWt").val();
	$("#jwStonePcs").val();
	$("#jwStoneWt").val();
	$("#stonePrice").val();
	$("#jwPrice").val();
});

// Add Stone Details using API
var addStoneDet = function() {
	var rows = $("#jqxgridAcc").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	$("#stoneShapeSection").hide();
	$("#wtRangeSection").hide();
	$("#claritySection").hide();
	$("#actualColorSection").hide();
	$("#colorSection").hide();
	$("#cutGradeSection").hide();
	$("#uomSection").show();
	$("#jwStonePcsSection").hide();
	$("#jwStoneWtSection").hide();
	$("#dplStonePcsSection").hide();
	$("#dplStoneWtSection").hide();
	$("#stonePriceSection").hide();
	$("#stoneCondSection").hide();
	$("#subCatSection").hide();
	$("#stoneDescSection").hide();
	$("#jwPriceSection").hide();
	$("#subCatSection").hide();
	$("#stoneDescSection").hide();

	$("#saveStoneForm").show();
	$("#updateS").hide();
	
	$('#stoneSuppBy').empty().append('<option value="" selected>--Select--</option>');
	$('#stoneSeg').empty().append('<option value="" selected>--Select--</option>');
	$('#stoneMainCat').empty().append('<option value="" selected>--Select--</option>');
	$('#stoneRate').empty().append('<option value="" selected>--Select--</option>');
	$('#stoneShape').empty().append('<option value="" selected>--Select--</option>');
	$('#wtRange').empty().append('<option value="" selected>--Select--</option>');
	$('#clarity').empty().append('<option value="" selected>--Select--</option>');
	$('#color').empty().append('<option value="" selected>--Select--</option>');
	$('#cutGrade').empty().append('<option value="" selected>--Select--</option>');
	$('#stoneSubCat').empty().append('<option value="" selected>--Select--</option>');
	$('#actualColor').empty().append('<option value="" selected>--Select--</option>');
	var stoneSupBy;
	var rows = $("#jqxgridAcc").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	var orderTypeE = rows[selectedrowindex].orderType;
	var data = $('#jqxgridAcc').jqxGrid('getrowdata',selectedrowindex);
	
	$.getJSON('/OrderExecution/api/v1/getStoneHeadersForSC', function(data) {
		var stoneSupByList = data.payload.suppliedBy;
		$.each(stoneSupByList,function(k, v) {
			if(orderTypeE == "ST"){
				if (v.id != "CU") {
					$('#stoneSuppBy').append('<option value="' + v.id + '">' + v.name + '</option>');
				}
			}else{
				if (v.id == "V") {
					$('#stoneSuppBy').append('<option selected value="' + v.id + '">' + v.name + '</option>');
					stoneSupBy = v.id;
				}
			}
		});
	});
	if(orderTypeE != "ST"){
		var fieldFilters = {
				"fieldFilters" : {
					"suppliedBy" : "V",
					"mCode" : data.segmentN
				}
			};
		$('#stoneSeg').empty().append('<option value="" selected>--Select--</option>');
		postJSON('/OrderExecution/api/v1/getStoneSegments', JSON.stringify(fieldFilters), function(data) {
			var stoneSegList = data.payload.stoneSeg;
			$.each(stoneSegList, function(k, v) {
				$('#stoneSeg').append('<option code="' + v.code + '" value="'+ v.id + '">' + v.description + '</option>');
			});
		});
	}
}

	
$("#stoneSuppBy").on('change',function() {

					if ($(this).val() == "COV") {
						$("#jwStonePcsSection").show();
						$("#jwStoneWtSection").show();
						$("#jwPriceSection").show();
						$("#dplStonePcsSection").show();
						$("#dplStoneWtSection").show();
						$("#stonePriceSection").show();
						$("#stoneSubCatSection").hide();
						$("#stoneDescSection").hide();
					}

					if ($("#stoneSuppBy").val() == "CO") {
						$("#jwStonePcsSection").hide();
						$("#jwStoneWtSection").hide();
						$("#jwPriceSection").hide();
						$("#dplStonePcsSection").show();
						$("#dplStoneWtSection").show();
						$("#stonePriceSection").show();
						$("#stoneSubCatSection").hide();
						$("#stoneDescSection").hide();
					}

					if ($("#stoneSuppBy").val() == "V") {
						$("#jwStonePcsSection").show();
						$("#jwStoneWtSection").show();
						$("#jwPriceSection").show();
						$("#dplStonePcsSection").hide();
						$("#dplStoneWtSection").hide();
						$("#stonePriceSection").hide();
						$("#stoneSubCatSection").hide();
						$("#stoneDescSection").hide();
					}

					var stoneSupBy = $(this).val();
					var rows = $("#jqxgridAcc").jqxGrid('getrows');
					var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
					var segment = rows[selectedrowindex].segment;
					var data = $('#jqxgridAcc').jqxGrid('getrowdata',selectedrowindex);

					var fieldFilters = {
						"fieldFilters" : {
							"suppliedBy" : stoneSupBy,
							"mCode" : data.segmentN
						}
					};

					$('#stoneSeg').empty().append('<option value="" selected>--Select--</option>');
					postJSON('/OrderExecution/api/v1/getStoneSegments', JSON.stringify(fieldFilters), function(data) {
						var stoneSegList = data.payload.stoneSeg;
						$.each(stoneSegList, function(k, v) {
							$('#stoneSeg').append('<option code="' + v.code + '" value="'+ v.id + '">' + v.description + '</option>');
						});
					});
				});

var showSubCatDesc = function() {		
	var stoneSeg = $("#stoneSeg option:selected").attr("code");
	if(stoneSeg == "DI"){
		$("#stoneSubCat").empty().append(null);
	}else{
		$("#stoneShape").empty().append(null);
	}
	var subCatDesc = "";
	if ($("#stoneSeg").val() != "") {
		subCatDesc += $("#stoneSeg option:selected").text() + " ";
	}
	if ($("#stoneMainCat").val() != "") {
		subCatDesc += $("#stoneMainCat option:selected").text() + " ";
	}

	if ($("#stoneShape").val() != "") {
		subCatDesc += $("#stoneShape option:selected").text() + " ";
	}

	if ($("#clarity").val() != "") {
		subCatDesc += $("#clarity option:selected").text() + " ";
	}

	if ($("#color").val() != "") {
		subCatDesc += $("#color option:selected").text() + " ";
	}

	if ($("#cutGrade").val() != "") {
		subCatDesc += $("#cutGrade option:selected").text() + " ";
	}

	if ($("#wtRange").val() != "") {
		subCatDesc += $("#wtRange option:selected").text() + " ";
	}
	
	$("#subCatDescriptionDesc").val(subCatDesc);
	$("#subCatDescription").html(subCatDesc);
}

var weightRgChange = function(){
	$("#actualColor").val("");
	$("#clarity").val("");
	$("#color").val("");
	$("#cutGrade").val("");
	$("#stoneRate").empty().append('<option value="" selected>--Select--</option>');
	
	$("#dplStonePcs").val("");
	$("#dplStoneWt").val("");
	$("#jwStonePcs").val("");
	$("#jwStoneWt").val("");
	$("#jwPrice").val("");
	$("#stonePrice").val("");	
	showSubCatDesc();
}

$("#stoneSeg").on('change',function() {

	                showHideField();
	                weightRgChange();
					var stoneSeg = $(this).val();
					var stoneSuppBy = $("#stoneSuppBy").val();
					var stoneSegName = $("#stoneSeg option:selected").attr('code');
					var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
					var rows = $("#jqxgridAcc").jqxGrid('getrows');
					var vendorCode = rows[selectedrowindex].vendorCode;
					
					var fieldFilters = {
						"fieldFilters" : {
							"suppliedBy" : stoneSuppBy,
							"sSegId" : stoneSeg,
							"sSeg" : stoneSegName,
							"vId" : vendorCode
						}
					};

					$('#stoneMainCat').empty().append('<option value="" selected>--Select--</option>');
					postJSON('/OrderExecution/api/v1/getStoneCategories', JSON.stringify(fieldFilters), function(data) {
						var mainCatListList = data.payload.mainCatList;
						$.each(mainCatListList, function(k, v) {
							$('#stoneMainCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
						});
					});
				});

$("#mainCat").on('change',function() {
			var mainCate = $(this).val();
			weightRgChange();
			var rows = $("#jqxgridAcc").jqxGrid('getrows');
			var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
			var segId = rows[selectedrowindex].segment;
			var jewelType = rows[selectedrowindex].jewelType;
			var vendorCode = rows[selectedrowindex].vendorCode;

			var fieldFilters = {
				"fieldFilters" : {
					"segId" : segId,
					"mJewelId" : jewelType,
					"catId" : mainCate,
					"vId" : vendorCode
				}
			};
			$('#subCat').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getCategorySubCategory', JSON.stringify(fieldFilters), function(data) {
				var subCatList = data.payload.subCatList;

				$.each(subCatList, function(k, v) {
					$('#subCat').append('<option value="' + v.id + '">' + v.description + '</option>');
				});
			});
		});

$("#stoneMainCat").on('change',function() {
	        showHideField();
	        weightRgChange();
			var stoneMainCat = $("#stoneMainCat").val();
			var stoneSuppBy = $("#stoneSuppBy").val();
			var stoneSeg = $("#stoneSeg").val();
			var stoneSegName = $("#stoneSeg option:selected").attr('code');
			var rows = $("#jqxgridAcc").jqxGrid('getrows');
			var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
			var vendorCode = rows[selectedrowindex].vendorCode;

			if ($("#stoneSeg option:selected").attr('code') == "DI") {

				var fieldFilters = {
					"fieldFilters" : {
						"suppliedBy" : stoneSuppBy,
						"sSegId" : stoneSeg,
						"sSeg" : stoneSegName,
						"catId" : stoneMainCat,
						"vId" : vendorCode
					}
				};

				$('#wtRange').empty().append('<option value="" selected>--Select--</option>');
				$('#stoneShape').empty().append('<option value="" selected>--Select--</option>');
				
				postJSON('/OrderExecution/api/v1/getShapes', JSON.stringify(fieldFilters), function(data) {
					var subCatList = data.payload.subCatList;
					$.each(subCatList, function(k, v) {
						$('#stoneShape').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
					});
				});
			} else {
				var fieldFilters = {
					"fieldFilters" : {
						"suppliedBy" : stoneSuppBy,
						"sSegId" : stoneSeg,
						"sSeg" : stoneSegName,
						"catId" : stoneMainCat,
						"vId" : vendorCode
					}
				};

				$('#stoneSubCat').empty().append('<option value="" selected>--Select--</option>');
				postJSON('/OrderExecution/api/v1/getStoneSubCategories', JSON.stringify(fieldFilters), function(data) {
					var subCatList = data.payload.subCatList;
					$.each(subCatList, function(k, v) {
						$('#stoneSubCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
					});
				});
			}
		});

$("#hideShowCompWt").hide();
$("#stoneShape").on('change',function() {

			if ($("#stoneShape").val() != "") {
				$("#subCatSection").show();
				$("#stoneDescSection").show();
				$("#uomSection").show();
			}
			weightRgChange();
			var stoneSegName = $("#stoneSeg option:selected").attr('code');
			var stoneSuppBy = $("#stoneSuppBy").val();
			var stoneShape = $("#stoneShape option:selected").attr('code');
			var stoneMainCat = $("#stoneMainCat option:selected").attr('code');
			
			
			var rows = $("#jqxgridAcc").jqxGrid('getrows');
			var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
			var vendorCode = rows[selectedrowindex].vendorCode;

			var fieldFilters = {
				"fieldFilters" : {
					"sSeg" : stoneSegName,
					"catCode" : stoneMainCat,
					"suppliedBy" : stoneSuppBy,
					"shapeCode" : stoneShape,
					"vId" : vendorCode
				}
			};
			$('#wtRange').empty().append('<option value="" selected>--Select--</option>');
			$('#clarity').empty().append('<option value="" selected>--Select--</option>');
			$('#color').empty().append('<option value="" selected>--Select--</option>');
			$('#cutGrade').empty().append('<option value="" selected>--Select--</option>');
			$('#actualColor').empty().append('<option value="" selected>--Select--</option>');
			$('#stoneArticleCode').val("");
			$('#stoneArticleId').val("");
			postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(fieldFilters), function(data) {
				var weightSlabList = data.payload.weightSlab;
				var clarityList = data.payload.clarity;
				var colorList = data.payload.color;
				var cutGradeList = data.payload.cutGrade;
				var actualColor = data.payload.actualColor;

				$.each(weightSlabList, function(k, v) {
					$('#wtRange').append('<option code="' + v.id + '" value="' + v.id + '">'+ v.id + '</option>');
				});

				$.each(clarityList, function(key, val) {
					$('#clarity').append('<option code="' + val.id + '" value="' + val.id+ '">' + val.id + '</option>');
				});

				$.each(colorList, function(ke, va) {
					$('#color').append('<option code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
				});

				$.each(cutGradeList, function(ke, va) {
					$('#cutGrade').append('<option code="' + va.id + '" value="' + va.id+ '">' + va.id + '</option>');
				});

				$.each(actualColor, function(ke, va) {
					$('#actualColor').append('<option code="' + va.id + '" value="' + va.id + '">' + va.id + '</option>');
				});
				
				$('#uom').val(data.payload.uom);
				if($('#uom').val() == "Cts" || $('#uom').val() == "Gms"){
					$("#hideShowCompWt").show();
				}
				$('#stoneIdVal').val(data.payload.stoneDetails.id);
				$('#stoneArticleCode').val(data.payload.stoneDetails.name);
				$('#stoneArticleId').val(data.payload.stoneDetails.id);
			});
		});

$('#wtRange').on("change",function(){
	$('#clarity').val("");
	$('#color').val("");
	$('#cutGrade').val("");
	$('#actualColor').val("");
})

$("#actualColor,#clarity,#color").on("change",function(){
	$('#cutGrade').val("");
	$('#stoneRate').empty().append('<option value="" selected>--Select--</option>');
})

$("#cutGrade").on('change',function() {
			var stoneSuppBy = $("#stoneSuppBy").val();
			var clarity = $("#clarity").val();
			var color = $("#color").val();
			var cutGrade = $("#cutGrade").val();
			var stoneSuppBy = $("#stoneSuppBy").val();
			var wtRange = $("#wtRange").val();
			var uom = $("#uom").val();
			var stoneMainCat = $("#stoneMainCat").val();
			var stoneId = $("#stoneIdVal").val();
			var stoneId = $("#stoneIdVal").val();
			var stoneMainCatagory = $("#stoneMainCat option:selected").attr("code");
			
			if($("#stoneSeg option:selected").attr('code') == "DI"){
				if(stoneMainCatagory == "CM" || stoneMainCatagory == "CS" || stoneMainCatagory == "CP"){
					var fieldFilters = {
						"fieldFilters" : {
							"suppliedBy" : stoneSuppBy,
							"stoneId" : stoneId,
							"clarity" : clarity,
							"color" : color,
							"cutGrade" : cutGrade,
							"weightSlab" : wtRange,
							"uom" : uom,
							"actualColor": $("#actualColor").val()
						}
					};
				}else{
					var fieldFilters = {
							"fieldFilters" : {
								"suppliedBy" : stoneSuppBy,
								"stoneId" : stoneId,
								"clarity" : clarity,
								"color" : color,
								"cutGrade" : cutGrade,
								"weightSlab" : wtRange,
								"uom" : uom
							}
						};
				}
			}
			$('#stoneRate').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getStoneCodeRate', JSON.stringify(fieldFilters), function(data) {
				if (data.resCode == 1) {
					var stoneDetails = data.payload;
					$.each(stoneDetails.rateList,function(k, v) {
						$('#stoneRate').append('<option value="' + v + '">' + v + '</option>');
				   });
				}
			});
		});

$("#stoneSubCat").on('change',function() {
			var stoneSegName = $("#stoneSeg option:selected").attr('code');
			var stoneSuppBy = $("#stoneSuppBy").val();
			var subCatCode = $("#stoneSubCat option:selected").attr('code');
			var stoneMainCat = $("#stoneMainCat option:selected").attr('code');
			var rows = $("#jqxgridAcc").jqxGrid('getrows');
			var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
			var vendorCode = rows[selectedrowindex].vendorCode;
			weightRgChange();
			var fieldFilters = {
				"fieldFilters" : {
					"sSeg" : stoneSegName,
					"catCode" : stoneMainCat,
					"suppliedBy" : stoneSuppBy,
					"subCatCode" : subCatCode,
					"vId" : vendorCode
				}
			};

			$('#stoneRate').empty().append('<option value="" selected>--Select--</option>');

			postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(fieldFilters), function(data) {
				var stoneDetails = data.payload.stoneDetails;
				$('#stoneArticleCode').val(stoneDetails.name);
				$('#stoneArticleId').val(stoneDetails.id);
				$("#uom").val(stoneDetails.value);
				$.each(stoneDetails.rateList, function(k, v) {
					$('#stoneRate').append('<option value="' + v + '">' + v + '</option>');
				});
			});
		});

// Add Design Details
var addDesign = function() {
	
	$("#saveDesignForm").show();
	$("#updteDesign").hide();
	$("#designDueDate").prop("disabled",false);
	
	$('input:radio[name="designToApprov"]').filter('[value="true"]').attr('checked', true);
	var date = new Date();
	var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	var selectedrowindexMaster = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	$("#designStatusDate").val(currentDate);
	
	var rows = $("#jqxgridAcc").jqxGrid('getrows');
	$.each(rows,function(k,v){
	$("#designDueDate").datepicker({
		changeMonth : true,
		changeYear : true,
		minDate : today,
		dateFormat : "dd/mm/yy",
		maxDate : rows[k].dueDate,
		onSelect : function(dateStr) {
			var min = $(this).datepicker('getDate'); 
			$("#designStatusDate").datepicker('option', 'maxDate', min || '0'); 
		}
	});
	var segId = $("#jqxgridAcc").jqxGrid('getcellvalue',k,'segment');
	var metalId = $("#jqxgridAcc").jqxGrid('getcellvalue',k,'metalType');	
	
	$("#designIdShowHide").hide();
	$('input:radio[name=designTomade]').filter('[value="0"]').attr('checked',true);

		var fieldFilters = {
			"fieldFilters" : {
				"segId" : segId,
				"metalId" : metalId
			}
		};
	
		
		postJSON('/OrderExecution/api/v1/getDesignDetails', JSON.stringify(fieldFilters), function(data) {
			var accSubCatsList = data.payload.dDetails.dStatus;
			var designByList = data.payload.dDetails.designBy;
			$("#designStatus").val(accSubCatsList.name);
			$("#designStatusId").val(accSubCatsList.id);
			$('#designBy').empty().append('<option value="" selected>--Select--</option>');
			$.each(designByList, function(k, v) {
				if (v.name == "In-house") {
					$('#designBy').append('<option selected code="' + v.id + '" value="' + v.name+ '">' + v.name + '</option>');
				} else {
					$('#designBy').append('<option code="' + v.id + '" value="' + v.name + '">'+ v.name + '</option>');
				}
			});
		});
		var fieldFilters = {
			"fieldFilters" : {
				"designBy" : "In-house"
			}
		};
		postJSON('/OrderExecution/api/v1/getDesigners', JSON.stringify(fieldFilters), function(data) {
			$('#designerName').empty().append('<option value="" selected>--Select--</option>');
			var designersList = data.payload.designers;
			$.each(designersList,function(k, v) {
				if (v.id == 0) {
			        $('#designerName').append('<option selected value="' + v.id + '">' + v.name + '</option>');
				} else {
					$('#designerName').append('<option value="' + v.id + '">' + v.name + '</option>');
				}
			});
		});
	});
}

// On click of radio button it will load related data
$('input[name=designTomade]:radio').on('click',function() {
			var selectedVal = $(this).val();
			var rows = $("#jqxgridAcc").jqxGrid('getrows');
			$.each(rows,function(k,v){
				var segId = $("#jqxgridAcc").jqxGrid('getcellvalue',k,'segment');
				var metalId = $("#jqxgridAcc").jqxGrid('getcellvalue',k,'metalType');	
				
			var fieldFilters = {
				"fieldFilters" : {
					"segId" : segId,
					"metalId" : metalId
				}
			};
			$('#designBy').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getDesignDetails', JSON.stringify(fieldFilters), function(data) {
				var dStatusList = data.payload.dDetails.dStatus;
				var rStatusList = data.payload.dDetails.rStatus;
				var designByList = data.payload.dDetails.designBy;
				$.each(designByList,function(k, v) {
					if (v.name == "In-house") {
						$('#designBy').append('<option selected code="' + v.id + '" value="' + v.name + '">' + v.name + '</option>');
					} else {
						$('#designBy').append('<option code="' + v.id + '" value="' + v.name + '">' + v.name + '</option>');
					}
				});

				if (selectedVal == 0) {
					$("#designStatus").val(dStatusList.name);
					$("#designStatusId").val(dStatusList.id);
					$("#designIdShowHide").hide();
				}
				if (selectedVal == 1) {
					$("#designStatus").val(rStatusList.name);
					$("#designStatusId").val(rStatusList.id);
					$("#designIdShowHide").hide();
				}
				if (selectedVal == 2) {
					$("#designStatus").val(rStatusList.name);
					$("#designStatusId").val(rStatusList.id);
					$("#designIdShowHide").show();
				}
			});
	  });
});

// Design By Change Designer Name will Load
$("#designBy").on('change',function() {
			var designBy = $(this).val();
			var fieldFilters = {
				"fieldFilters" : {
					"designBy" : designBy
				}
			};
			$('#designerName').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getDesigners', JSON.stringify(fieldFilters), function(data) {
				var designersList = data.payload.designers;
				$.each(designersList, function(k, v) {
					if (v.id == 0) {
						$('#designerName').append('<option selected value="' + v.id + '">'+ v.name + '</option>');
					} else {
						$('#designerName').append('<option value="' + v.id + '">' + v.name + '</option>');
					}
				});
			});
		});

// Add Accessory Details using API
var addAccDet = function() {
	$("#jwAccPcsSection").hide();
	$("#jwAccWtSection").hide();
	$("#jwAccPriceSection").hide();
	$("#compAccWt").prop('disabled', false);
	$("#accConditionSection").hide();
	$("#compAccPcsSection").hide();
	$("#compAccWtSection").hide();
	$("#compAccPriceSection").hide();
	$("#saveAccDet").show();
	$("#updateAcc").hide();
	$('#accSupBy').empty().append('<option value="" selected>--Select--</option>');
	$('#accMainCat').empty().append('<option value="" selected>--Select--</option>');
	$('#accSubCat').empty().append('<option value="" selected>--Select--</option>');
	$('#accRate').empty().append('<option value="" selected>--Select--</option>');
	var accSupBy;
	var rows = $("#jqxgridAcc").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	var orderTypeE = rows[selectedrowindex].orderType;
	var vendorCode = rows[selectedrowindex].vendorCode;
	
	$.getJSON('/OrderExecution/api/v1/getAccessoryHeaders ', function(data) {
		var accSupByList = data.payload.suppliedBy;
		$.each(accSupByList,function(k, v) {
			if(orderTypeE == "ST"){
				if (v.id != "CU") {
					$('#accSupBy').append('<option value="' + v.id + '">' + v.name + '</option>');
				}
			}else{
				if (v.id == "V") {
					$('#accSupBy').append('<option selected value="' + v.id + '">' + v.name + '</option>');
					accSupBy = v.id;
				}
			}
		});
	});
	
	if(orderTypeE != "ST"){
		var fieldFilters = {
				"fieldFilters" : {
					"suppliedBy" : "V",
					"vId":vendorCode
				}
			};
			$('#accMainCat').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getAccessoryCategories', JSON.stringify(fieldFilters), function(data) {
				var accCatsList = data.payload.accCats;
				$.each(accCatsList, function(k, v) {
					$('#accMainCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
				});
			});
			$("#jwAccPcsSection").show();
			$("#jwAccWtSection").show();
			$("#jwAccPriceSection").show();
	}
}

function compRateCal() {
	var comPcs = $("#compAccPcs").val();
	var compRate = $("#accRate").val();
	var price = compRate * comPcs;
	$("#compAccPrice").val(price);
}

function jwRateCal() {
	var jwPcs = $("#jwAccPcs").val();
	var jwRate = $("#accRate").val();
	var price = jwRate * jwPcs;
	$("#jwAccPrice").val(price);
}

$("#compAccWt").prop('disabled', false);
$("#accSupBy").on('change',function() {
	
			var accSupBy = $(this).val();
			if (accSupBy == "CO") {
				$("#jwAccPcsSection").hide();
				$("#jwAccWtSection").hide();
				$("#jwAccPriceSection").hide();
				$("#compAccWt").prop('disabled', false);
				$("#accConditionSection").hide();

				$("#compAccPcsSection").show();
				$("#compAccWtSection").show();
				$("#compAccPriceSection").show();
			}

			else if (accSupBy == "V") {
				$("#jwAccPcsSection").show();
				$("#jwAccWtSection").show();
				$("#jwAccPriceSection").show();
				$("#compAccWtSection").hide();
				$("#accConditionSection").hide();

				$("#compAccPcsSection").hide();
				$("#compAccWtSection").hide();
				$("#compAccPriceSection").hide();
			} else {
				$("#jwAccPcsSection").show();
				$("#jwAccWtSection").show();
				$("#jwAccPriceSection").show();
				$("#compAccWt").prop('disabled', false);
				$("#accConditionSection").hide();

				$("#compAccPcsSection").show();
				$("#compAccWtSection").show();
				$("#compAccPriceSection").show();
			}
			var rows = $("#jqxgridAcc").jqxGrid('getrows');
			var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	        var vendorCode = rows[selectedrowindex].vendorCode;
			var fieldFilters = {
				"fieldFilters" : {
					"suppliedBy" : accSupBy,
					"vId":vendorCode
				}
			};
			$('#accMainCat').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getAccessoryCategories', JSON.stringify(fieldFilters), function(data) {
				var accCatsList = data.payload.accCats;
				$.each(accCatsList, function(k, v) {
					$('#accMainCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
				});
			});
		});

$("#accMainCat").on('change',function() {
			var accMainCat = $(this).val();
			var accSupBy = $("#accSupBy").val();
			var rows = $("#jqxgridAcc").jqxGrid('getrows');
			var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	        var vendorCode = rows[selectedrowindex].vendorCode;
			
			var fieldFilters = {
				"fieldFilters" : {
					"suppliedBy" : accSupBy,
					"accMCatId" : accMainCat,
					"vId":vendorCode
				}
			};
			$('#accSubCat').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getAccCatSubCategories', JSON.stringify(fieldFilters), function(data) {
				var accSubCatsList = data.payload.accSubCats;
				$.each(accSubCatsList, function(k, v) {
					$('#accSubCat').append('<option code="' + v.name + '" value="' + v.id + '">' + v.description + '</option>');
				});
			});
		});

$("#accSubCat").on('change',function() {
			var accSubCat = $("#accSubCat option:selected").attr('code');
			var accMainCat = $("#accMainCat option:selected").attr('code');
			var accSupBy = $("#accSupBy").val();
			
			var rows = $("#jqxgridAcc").jqxGrid('getrows');
			var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	        var vendorCode = rows[selectedrowindex].vendorCode;

			var fieldFilters = {
				"fieldFilters" : {
					"mCode" : "AC",
					"catCode" : accMainCat,
					"subCatCode" : accSubCat,
					"suppliedBy" : accSupBy,
					"vId":vendorCode
				}
			};

			$('#accArticleCode').empty().append('<option value="" selected>--Select--</option>');
			$('#accRate').empty().append('<option value="" selected>--Select--</option>');
			postJSON('/OrderExecution/api/v1/getAccCode', JSON.stringify(fieldFilters), function(data) {
				var accCodeList = data.payload.accCode;
				$('#accArticleCode').val(accCodeList.name);
				$('#accArticleId').val(accCodeList.id);
				$('#rateList').val(JSON.stringify(accCodeList.rateList));
				$.each(accCodeList.rateList, function(k, v) {
					$('#accRate').append('<option value="' + v + '">' + v + '</option>');
				});
			});
		});

$("#selectVendor").on('click',function() {
			var selectedVendor = $('input[name=vendorCode]:checked').val();
			var selectedVendorName = $('input[name=vendorCode]:checked').parent().find('label').text();
			var rows = $("#jqxgridAcc").jqxGrid('getrows');
			var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
			rows[selectedrowindex]["vendorCode"] = selectedVendor;
			
			$("#jqxgridAcc").jqxGrid('setcellvalue', selectedrowindex,'vendorCodeName', selectedVendorName);
			$("#vendorCodeInner").append(
					"<tr><td>" + rows[selectedrowindex].serialNo
							+ "</td><td><input type='hidden' value='"
							+ selectedVendor + "' id='vendorCodeVal' />"
							+ selectedVendorName + "</td></tr>");

			$('#findVendor').modal('hide');
		});

$("#selectVendor1").on('click',function() {
	var selectedVendor = $('input[name=vendorCode]:checked').val();
	// var selectedVendorName =
	// $('input[name=vendorCode]:checked').text();
	var selectedVendorName = $('input[name=vendorCode]:checked').parent().find('label').text();
	var rows = $("#jqxgridAcc").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	rows[selectedrowindex]["vendorCode"] = selectedVendor;

	$("#jqxgridAcc").jqxGrid('setcellvalue', selectedrowindex,'vendorCodeName', selectedVendorName);
	$("#vendorCodeInner").append(
			"<tr><td>" + rows[selectedrowindex].serialNo
					+ "</td><td><input type='hidden' value='"
					+ selectedVendor + "' id='vendorCodeVal' />"
					+ selectedVendorName + "</td></tr>");

	$('#findVendor').modal('hide');
});
$("#rightFixedSlide").click(function() {
	$("#vendorCode").toggle("slide", {
		direction : "right"
	}, 0);
});

$("#selectArticle").on('click',function() {
	
	if($("#subCat").val() == ""){
		$.growl.error({
			message : "Please select the Subcategory!!",
			duration : 10000
		});
     return false;
    }
		
	var subCatId = $('#subCat option:selected').val();
	var subCatName = $('#subCat option:selected').text();
	var subCatCode = $('#subCat option:selected').attr('code');
	var mainCategoryId = $('#mainCat option:selected').val();
	var mainCategoryName = $('#mainCat option:selected').text();
	var mainCategoryCode = $('#mainCat option:selected').attr('code');
	var articleIdMaster = $('input[name=articleList]:checked').val();
	var articleNameMaster = $('input[name=articleList]:checked').parent().find('label').text();
	var selectedArticleDesc = $('input[name=articleList]:checked').attr('desc');
	var selectedVendorName = $('input[name=vendorCode]:checked').parent().find('label').text();
	var rows = $("#jqxgridAcc").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
	
	rows[selectedrowindex]["pairV"] = $("#pairValues").val();
	rows[selectedrowindex]["mainCategoryId"] = mainCategoryId;
	rows[selectedrowindex]["mainCategoryCode"] = mainCategoryCode;
	rows[selectedrowindex]["mainCategoryName"] = mainCategoryName;

	rows[selectedrowindex]["subCatName"] = subCatName;
	rows[selectedrowindex]["subCatCode"] = subCatCode;
	rows[selectedrowindex]["subCatId"] = subCatId;

	rows[selectedrowindex]["articleIdMaster"] = articleIdMaster;
	rows[selectedrowindex]["articleNameMaster"] = articleNameMaster;
	rows[selectedrowindex]["articleDescMaster"] = subCatName;
	
	
	 var pairV =  $("#jqxgridAcc").jqxGrid("getcellvalue", selectedrowindex,'pairV');
	 var labelName =  $("#jqxgridAcc").jqxGrid("getcellvalue", selectedrowindex,'labelName');
	 var jwlType =  $("#jqxgridAcc").jqxGrid("getcellvalue", selectedrowindex,'jewelTypeN');
	 if(pairV == 1){
		if(labelName % 2 != 0){
			$.growl.error({
				message : "Please Enter Valid Pcs for " +jwlType+ " !!! ",
				duration : 10000,
				title : 'Error'
			});
			$("#jqxgridAcc").jqxGrid('setcellvalue',selectedrowindex,'labelName',"");
			return false;
		}else{
			$("#articleCodeInner").append(
					"<tr><td>" + rows[selectedrowindex].serialNo
							+ "</td><td><input type='hidden' value='"
							+ articleIdMaster + "' id='vendorCodeVal' />"
							+ articleNameMaster + "</td></tr>");
			$("#jqxgridAcc").jqxGrid('setcellvalue', selectedrowindex,'articleCodeName', articleNameMaster);
			$("#jqxgridAcc").jqxGrid('setcellvalue', selectedrowindex,'articleDesc', selectedArticleDesc);
			$('#findVendor').modal('hide');
	   }
	}else{
		$("#articleCodeInner").append(
				"<tr><td>" + rows[selectedrowindex].serialNo
						+ "</td><td><input type='hidden' value='"
						+ articleIdMaster + "' id='vendorCodeVal' />"
						+ articleNameMaster + "</td></tr>");
		$("#jqxgridAcc").jqxGrid('setcellvalue', selectedrowindex,'articleCodeName', articleNameMaster);
		$("#jqxgridAcc").jqxGrid('setcellvalue', selectedrowindex,'articleDesc', selectedArticleDesc);
		$('#findVendor').modal('hide');
	}
});
$("#selectArticle1").on('click',function() {
	var subCatId = $('#subCat option:selected').val();
	var subCatName = $('#subCat option:selected').text();
	var subCatCode = $('#subCat option:selected').attr('code');

	var mainCategoryId = $('#mainCat option:selected').val();
	var mainCategoryName = $('#mainCat option:selected').text();
	var mainCategoryCode = $('#mainCat option:selected').attr('code');

	var articleIdMaster = $('input[name=articleList]:checked').val();
	var articleNameMaster = $('input[name=articleList]:checked').parent().find('label').text();
	var selectedArticleDesc = $('input[name=articleList]:checked').attr('desc');
	var selectedVendorName = $('input[name=vendorCode]:checked').parent().find('label').text();
	var rows = $("#jqxgridAcc").jqxGrid('getrows');
	var selectedrowindex = $("#jqxgridAcc").jqxGrid('getselectedrowindex');

	rows[selectedrowindex]["mainCategoryId"] = mainCategoryId;
	rows[selectedrowindex]["mainCategoryCode"] = mainCategoryCode;
	rows[selectedrowindex]["mainCategoryName"] = mainCategoryName;

	rows[selectedrowindex]["subCatName"] = subCatName;
	rows[selectedrowindex]["subCatCode"] = subCatCode;
	rows[selectedrowindex]["subCatId"] = subCatId;

	rows[selectedrowindex]["articleIdMaster"] = articleIdMaster;
	rows[selectedrowindex]["articleNameMaster"] = articleNameMaster;
	rows[selectedrowindex]["articleDescMaster"] = subCatName;

	$("#articleCodeInner").append(
			"<tr><td>" + rows[selectedrowindex].serialNo
					+ "</td><td><input type='hidden' value='"
					+ articleIdMaster + "' id='vendorCodeVal' />"
					+ articleNameMaster + "</td></tr>");
	$("#jqxgridAcc").jqxGrid('setcellvalue', selectedrowindex,'articleCodeName', articleNameMaster);
	$("#jqxgridAcc").jqxGrid('setcellvalue', selectedrowindex,'articleDesc', selectedArticleDesc);
	$('#findVendor').modal('hide');
});

// ######################################### Create API call For Stock And Consignment #################################################

// Add row in grid lines
$("#addRowA").on("click", function() {
	$("#jqxgridAcc").jqxGrid('addrow', null, generaterowAcc(rowId + 1));
});

$('#searchS').on("click", function() {
	var orderTypeS = $("#orderTypeS").val();
	if (orderTypeS == "" || orderTypeS == null) {
		$.growl.error({
			message : "Please select order type.",
			duration : 10000
		});
		return false;
	}
	scOrderSearchGrid();
	$('#jqxgrid').show();
	$("#jqxgridAcc").jqxGrid('clear');
	$("#jqxgridAcc").hide();
});

$('#create').on("click", function() {
	$("#goback").show();
	$("#orderTypeHide").show();
	$("#CustOrderDue").show();
	$("#headerScOrder").show();
	$("#searchScOrderSection").hide();
	$("#saveSCOrder").show();
	$("#saveSCOrderEdit").hide();
	createStockConsignmentGrid(segId = null);
	$("#orderTypeHide").show();
	$('#jqxgridAcc').show();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	$("#editHeader").hide();
	$("#cretaeHeader").show();
	$("#cancelHeader").hide();
});

$("#clear").on('click', function() {
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgridAcc").jqxGrid('clear');
	redirect();
	$("#jqxgrid").hide();
	$('#jqxgridAcc').hide();
	$("#saveSCOrder").hide();
});

$("#goback").on('click', function() {
	$("#goback").hide();
	$("#orderTypeHide").hide();
	$("#orderTypeC").prop("disabled",false);
});

$('#orderTypeE').empty().append('<option value="" selected>--Select--</option>');
$('#orderTypeC').empty().append('<option value="" selected>--Select--</option>');
$('#orderTypeS').empty().append('<option value="" selected>--Select--</option>');

$.getJSON('/OrderExecution/api/v1/getOrderHeaderFieldValuesForSC ', function(data) {

	$.each(data.payload.orderTypeSC, function(key, val) {
		if (key == 0) {
			$('#orderTypeS').append('<option selected value="' + val.id + '">' + val.name + '</option>');
			$('#orderTypeC').append('<option  selected value="' + val.id + '">' + val.name + '</option>');
		} else {
			$('#orderTypeS').append('<option  value="' + val.id + '">' + val.name + '</option>');
			$('#orderTypeC').append('<option  value="' + val.id + '">' + val.name + '</option>');
		}
	});
	$.each(data.payload.orderTypeSC, function(key, val) {
		$('#orderTypeE').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
	
	$('#enteredBy').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.empList, function(key, val) {
		$('#enteredBy').append('<option value="' + val.description + '">' + val.name + '</option>');
	});
	
	$('#status').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.orderStatusList, function(key, val) {
		$('#status').append('<option value="' + val.id + '">' + val.name + '</option>');
	});
});

$('#segment').empty().append('<option value="" selected>--Select--</option>');
$('#segmentC').empty().append('<option value="" selected>--Select--</option>');
$('#segmentE').empty().append('<option value="" selected>--Select--</option>');
$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?page=search&criteria=sTypes&id=-1',function(data) {
	$.each(data.payload.sTypes, function(key, val) {
		$('#segment').append('<option value="' + val.id + '">'  + val.description + '</option>');
		$('#segmentC').append('<option value="' + val.id + '">' + val.description + '</option>');
		$('#segmentE').append('<option value="' + val.id + '">' + val.description + '</option>');
	 });
});

$("#segment").on('change',function() {
		var segId = $("#segment").val();
		$('#jewelType').empty().append('<option value="" selected>--Select--</option>');
		$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?criteria=jewelType&id='+segId, function(data) {
		$.each(data.payload.jewelType,function(key, val) {
		$('#jewelType').append('<option value="'+ val.id + '">' + val.description + '</option>');
		      });
		});
	});

$("#segmentC").on('change',function() {
	var segmentC = $("#segmentC").val();
		$('#jewelTypeC').empty().append('<option value="" selected>--Select--</option>');
		$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?criteria=jewelType&id='+segmentC,function(data) {
		$.each(data.payload.jewelType,function(key, val) {
		$('#jewelTypeC').append('<option value="'+ val.id + '">' + val.description + '</option>');
		segmentArr.push({"id" : val.id,"description" : val.description})
		 });
    });
});
$("#segmentE").on('change',function() {
	var segmentE = $("#segmentE").val();
	$('#jewelTypeE').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?criteria=jewelType&id='+segmentE,function(data) {
	$.each(data.payload.jewelType,function(key, val) {
	$('#jewelTypeE').append('<option value="'+ val.id + '">' + val.description + '</option>');
		});
	});
});

$("#categoryIDC").on('change',function() {
	var jewelTypeC = $("#jewelTypeC").val();
	var categoryIDC = $("#categoryIDC").val();
	
    $('#subCategoryIdC').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/articleMasterLOVs?criteria=sCategory&&categoryId='+categoryIDC+'&&jewelTypeId='+jewelTypeC,function(data) {
	$.each(data.payload.subCatList,function(key, val) {
	$('#subCategoryIdC').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});
});

$("#jewelTypeC").on('change',function() {
	var segmentC = $("#segmentC").val();
	var jewelTypeC = $("#jewelTypeC").val();
	$('#categoryIDC').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/articleMasterLOVs?criteria=mCategory&&segmentId='+segmentC+'&&jewelTypeId='+jewelTypeC,function(data) {
	$.each(data.payload.mainCatList,function(key, val) {
	$('#categoryIDC').append('<option value="'+ val.id + '">' + val.description + '</option>');
		 });
	});
});

$("#jewelType").on('change',function() {
	var segment = $("#segment").val();
	var jewelType = $("#jewelType").val();
	$('#categoryID').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/articleMasterLOVs?criteria=mCategory&&segmentId='+segment+'&&jewelTypeId='+jewelType,function(data) {
	$.each(data.payload.mainCatList,function(key, val) {
	$('#categoryID').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});
});

$("#categoryID").on('change',function() {
	var categoryID = $("#categoryID").val();
	var jewelType = $("#jewelType").val();
	$('#subCategoryId').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/articleMasterLOVs?criteria=sCategory&&categoryId='+categoryID+'&&jewelTypeId='+jewelType,function(data) {
	$.each(data.payload.subCatList,function(key, val) {
	$('#subCategoryId').append('<option value="'+ val.id + '">' + val.description + '</option>');
		});
	});
});

$("#jewelTypeE").on('change',function() {
	var segmentE = $("#segmentE").val();
	var jewelTypeE = $("#jewelTypeE").val();
	$('#categoryIDE').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/articleMasterLOVs?criteria=mCategory&&segmentId='+segmentE+'&&jewelTypeId='+jewelTypeE,function(data) {
	$.each(data.payload.mainCatList,function(key, val) {
	$('#categoryIDE').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});
});

$("#categoryIDE").on('change',function() {
	var categoryIDE = $("#categoryIDE").val();
	var jewelTypeE = $("#jewelTypeE").val();
	$('#subCategoryIdE').empty().append('<option value="" selected>--Select--</option>');
	$.getJSON('/OrderExecution/api/v1/articleMasterLOVs?criteria=sCategory&&categoryId='+categoryIDE+'&&jewelTypeId='+jewelTypeE,function(data) {
	$.each(data.payload.subCatList,function(key, val) {
	$('#subCategoryIdE').append('<option value="' + val.id + '">' + val.description + '</option>');
		 });
	});
});

// ###################################### search of Stock and Consignment Order
// ################################################

function scOrderSearchGrid() {

	var updateRows = function(rowid, newdata, commit) {
		commit;
	}

	var datafields = [ {
		'name' : 'orderNo',
		'type' : 'int'
	}, {
		'name' : 'orderItems',
		'type' : 'array'
	},{
		'name' : 'orderStatus',
		'type' : 'string'
	}, {
		'name' : 'orderDate',
		'type' : 'date'
	}, {
		'name' : 'id',
		'type' : 'int',
		'map'  : 'orderNo'
	}];
	var columns = [ {
		'text' : 'Order No',
		'datafield' : 'orderNo',
		'width' : '40%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
	},{
		'datafield' : 'orderStatus',
		hidden : true
	}, {
		'text' : 'Order Date',
		'datafield' : 'orderDate',
		'width' : '50%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		'cellsformat' : 'dd/MM/yyyy'

	},{
		'text' : '',
		'datafield' : 'id',
		'width' : '10%',
		cellsalign : 'center',
		align : 'center',
		editable : false,
		cellsrenderer : editOrderDets,
	}];

	showMyGrid(datafields, "/OrderExecution/api/v1/ordersListSC", "list",
			columns, stockOrderFieldFilters(), updateRows, "");

	var initlevel2 = function(index, parentElement, gridElement, record) {
		var id = record.uid.toString();
		var grid = $($(parentElement).children()[0]);
		var data = record.orderItems;

		if (data == null) {
			data = [];
		} else {
			grid.before('<br/><h4><u>Order Details</u></h4>');
		}
		var inlineSource = {

			datafields : [ {
				name : 'orderKind',
				type : 'string',
				'map' : 'oKind>name'
			}, {
				name : 'serialNumber',
				type : 'int'
			}, {
				'name' : 'segmentType',
				'map' : 'segId>description',
				'type' : 'string'
			}, {
				'name' : 'metalType',
				'map' : 'metalId>description',
				'type' : 'string'
			}, {
				'name' : 'jewelType',
				'type' : 'string',
				'map' : 'jewelType>description'
			}, {
				'name' : 'dueDateType',
				'map' : 'dueDateType>name',
				'type' : 'date'
			}, {
				'name' : 'vendorCode',
				'map' : 'vendor>name',
				'type' : 'string'
			}, {
				'name' : 'articleCode',
				'map' : 'articleMaster>name',
				'type' : 'string'
			}, {
				'name' : 'articleDes',
				'map' : 'articleMaster>description',
				'type' : 'string'
			}, {
				'name' : 'orderItemStatusType',
				'type' : 'string'
			}, {
				'name' : 'metalColor',
				'map' : 'metalColor>name',
				'type' : 'string'
			}, {
				'name' : 'sPurity',
				'map' : 'orderItemSkinPurity>skinPurity',
				'type' : 'long'
			}, {
				'name' : 'design',
				'type' : 'string',
			}, {
				'name' : 'stones',
				'type' : 'array'
			}, {
				'name' : 'accessories',
				'type' : 'array'
			}, {
				'name' : 'metalWt',
				'map' : 'metalWeightType>name',
				'type' : 'long'
			}, {
				'name' : 'expectedFromWeight',
				'type' : 'long'
			}, {
				'name' : 'expectedToWeight',
				'type' : 'long'
			}, {
				'name' : 'jobWorkerInstruction',
				'type' : 'string'
			}, {
				'name' : 'id',
				'type' : 'int'
			} ],

			id : 'id',
			localdata : data,
			datatype : 'json'
		};

		if (data.length != 0) {
			grid.jqxGrid({
						source : inlineSource,
						width : "99%",
						height : 250,
						enabletooltips : true,
						columnsresize : true,
						rowdetails : true,
						editable : true,
						rowsheight : 35,
						columnsheight : 85,
						rowdetailstemplate : {
							rowdetails : "<div id='grid1' style='margin-bottom: 40px; margin-top: 10px;'></div><div id='grid2' style='margin-bottom:70px; margin-top: 10px;'></div><div id='grid3' style='margin-bottom:70px; margin-top: 10px;'></div>",
							rowdetailsheight : 800,
							rowdetailshidden : true
						},
						initrowdetails : initrowdetails3,
						columns : [ {
							text : 'Order Kind',
							datafield : 'orderKind',
							width : '8%',
							cellsalign : 'left',
							align : 'center'
						}, {
							text : 'Sl No',
							datafield : 'serialNumber',
							width : '4%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							sortable : true
						}, {
							'text' : 'Seg Type',
							'datafield' : 'segmentType',
							'width' : '6%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							sortable : true

						}, {
							'text' : 'Metal Type',
							'datafield' : 'metalType',
							'width' : '6%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							sortable : true
						}, {
							'text' : 'Jewel Type',
							'datafield' : 'jewelType',
							'width' : '8%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							sortable : true

						}, {
							'text' : 'Vendor Code',
							'datafield' : 'vendorCode',
							'width' : '6%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							sortable : true
						}, {
							'text' : 'Article Code',
							'datafield' : 'articleCode',
							'width' : '6%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							sortable : true
						}, {
							'text' : 'Article Desc',
							'datafield' : 'articleDes',
							'width' : '6%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							sortable : true
						}, {
							'text' : 'Status',
							'datafield' : 'orderItemStatusType',
							'width' : '6%',
							cellsalign : 'left',
							align : 'center',
							editable : false,
							sortable : true

						}, {
							'text' : 'Metal colour',
							'datafield' : 'metalColor',
							'width' : '8%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							sortable : true

						}, {
							'text' : 'Skin/Melting purity',
							'datafield' : 'sPurity',
							'width' : '6%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							sortable : true,
							cellsformat : 'd2'
						}, {
							'text' : 'Metal Wt Type',
							'datafield' : 'metalWt',
							'width' : '6%',
							cellsalign : 'center',
							align : 'center',
							editable : false,
							sortable : true
						}, {
							'text' : 'From',
							'datafield' : 'expectedFromWeight',
							'width' : '6%',
							cellsalign : 'center',
							align : 'center',
							cellsformat : 'd2',
							columntype: 'numberinput',
							sortable : true,
							cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
								var selectedrowindex = grid.jqxGrid('getselectedrowindex');
								var rowDetails = grid.jqxGrid('getrowdata', selectedrowindex);
								checkCondtion(rowDetails , newvalue , selectedrowindex , 1);
								if(rowDetails.metalWt == "Absolute"){
									grid.jqxGrid('setcellvalue', row,'expectedToWeight',newvalue);
								}
							}
						}, {
							'text' : 'To',
							'datafield' : 'expectedToWeight',
							'width' : '6%',
							cellsalign : 'center',
							align : 'center',
							sortable : true,
							cellsformat : 'd2',
							columntype: 'numberinput',
							cellvaluechanging : function(row, datafield, columntype, oldvalue, newvalue, event) {
								
								var selectedrowindex = grid.jqxGrid('getselectedrowindex');
								var rowDetails =  grid.jqxGrid('getrowdata', selectedrowindex);
								checkCondtion(rowDetails , newvalue , selectedrowindex , 2)
							
							},
							cellbeginedit : function(row) {
								var rows = grid.jqxGrid('getrows');
								if (rows[row].metalWt == "Absolute") {		
									return false;
								}else{
									return true;
								}
							}
						}, {
							'text' : 'Vendor Instruction',
							'datafield' : 'jobWorkerInstruction',
							'width' : '6%',
							cellsalign : 'left',
							align : 'center',
							editable : false,
							sortable : true
						} ],
						showaggregates : true,
						showstatusbar : false,
					});
		}

	}

	var initrowdetails3 = function(index, parentElement, gridElement, record) {
		var dataDesign = [];
		var id = record.uid.toString();
		var grid1 = $($(parentElement).children()[0]);
		var gridAcc = $($(parentElement).children()[1]);
		var gridDesign = $($(parentElement).children()[2]);
		var datastones = record.stones;
		if (datastones == null) {
			datastones = [];
		} else {
			grid1.before('<br/><h5><u>Stone Details</u></h5>');
		}
		var dataAcc = record.accessories;
		if (dataAcc == null) {
			dataAcc = [];
		} else {
			gridAcc.before('<h5>Accessory Details</u></h5>');
		}
		
		dataDesign.push(record.design);
		if (dataDesign == null) {
			dataDesign = [];
		} else {
			gridDesign.before('<h5><u>Design Details</u></h5>');
		}
		
		var inlineSource3 = {
			datafields : [ {
				'name' : 'id',
				'type' : 'string',
				'map' : 'orderItemSlNo'
			}, {
				'name' : 'serialNumber',
				'type' : 'string'
			}, {
				'name' : 'stoneSuppBy',
				'map' : 'suppliedBy>name',
				'type' : 'string'
			}, {
				'name' : 'stoneSegment',
				'type' : 'id'
			}, {
				'name' : 'stoneMainCat',
				'type' : 'string'
			}, {
				'name' : 'subCategoryDesc',
				'type' : 'string'
			}, {
				'name' : 'stoneArticleCode',
				'map' : 'code>name',
				'type' : 'string'
			}, {
				'name' : 'wtRange',
				'map' : 'weightRange>name',
				'type' : 'float'
			}, {
				'name' : 'clarity',
				'map' : 'clarity>name',
				'type' : 'string'
			}, {
				'name' : 'actaulcolor',
				'map' : 'actualColor>name',
				'type' : 'string'
			}, {
				'name' : 'color',
				'map' : 'color>name',
				'type' : 'string'
			}, {
				'name' : 'cutGrade',
				'map' : 'cutGrade>name',
				'type' : 'string'
			}, {
				'name' : 'uom',
				'type' : 'long'
			}, {
				'name' : 'custPieces',
				'type' : 'long'
			}, {
				'name' : 'vendorPieces',
				'type' : 'long',
				'map' : 'vendorReqPieces'
			}, {
				'name' : 'vendorWeight',
				'type' : 'float',
				'map' : 'vendorReqWeight'
			}, {
				'name' : 'vendorStonePrice',
				'type' : 'float',
				'map' : 'vendorPrice'
			},{
				'name' : 'compPieces',
				'type' : 'long',
				'map' : 'compReqPcs'
			}, {
				'name' : 'compWeight',
				'type' : 'float',
				'map' : 'compReqdWt'
			}, {
				'name' : 'compPrice',
				'type' : 'string'
			}, {
				'name' : 'condition',
				'type' : 'string',
				'map' : 'condition>name'
			}, {
				'name' : 'actionId',
				'type' : 'string'
			} ],
			id : 'id',
			localdata : datastones,
			datatype : 'json'
		};

		var inlineSource4 = {
			datafields : [ {
				'name' : 'serialNumber',
				'type' : 'int'
			}, {
				'name' : 'slNo',
				'type' : 'serialNumber',
				'map' : 'orderItemSlNo'
			}, {
				'name' : 'accSuppBy',
				'map' : 'suppliedBy>name',
				'type' : 'string'
			}, {
				'name' : 'accMainCat',
				'type' : 'string'
			}, {
				'name' : 'accSubCate',
				'map' : 'subCategory>description',
				'type' : 'string'
			}, {
				'name' : 'accArticleCode',
				'map' : 'code>name',
				'type' : 'string'
			}, {
				'name' : 'uom',
				'map' : 'uom>name',
				'type' : 'string'
			}, {
				'name' : 'rate',
				'type' : 'float'
			}, {
				'name' : 'vendorPieces',
				'type' : 'int',
				'map' : 'vendorReqPieces'
			}, {
				'name' : 'vendorWeight',
				'type' : 'float',
				'map' : 'vendorReqWeight'
			}, {
				'name' : 'vendorPrice',
				'type' : 'float',
				'map' : 'vendorPrice'
			}, {
				'name' : 'compPieces',
				'type' : 'long',
				'map' : 'companyReqPcs'
			}, {
				'name' : 'compWeight',
				'type' : 'float',
				'map' : 'companyReqWt'
			}, {
				'name' : 'compPrice',
				'type' : 'long'
			}, {
				'name' : 'condition',
				'type' : 'string'
			} ],
			id : 'id',
			localdata : dataAcc,
			datatype : 'json'
		}
		
		var inlineSource5 = {
				datafields : [ {
					'name' : 'id',
					'type' : 'int'
				},{
					'name' : 'dueDate',
					'type' : 'string'
				},{
					'name' : 'statusDate',
					'type' : 'string'
				},{
					'name' : 'numberOfVariations',
					'type' : 'int'
				},{
					'name' : 'catalogueRefNumber',
					'type' : 'int'
				},{
					'name' : 'custApprovalDueDate',
					'type' : 'string'
				},{
					'name' : 'linkedSlNo',
					'type' : 'int',
				},{
					'name' : 'orderItemId',
					'type' : 'int'
				},{
					'name' : 'designStatus',
					'type' : 'string',
					'map'  : 'designStatus>name'
				},{
					'name' : 'designerType',
					'type' : 'String',
					'map'  : 'designerType>name'
				},{
					'name' : 'intimationMode',
					'type' : 'int',
					'map'  : 'intimationMode>name'
				},{
					'name' : 'designerName',
					'type' : 'String',
					'map'  : 'designerName>name'
				},{
					'name' : 'designVariations',
					'type' : 'array'
				}],
				id : 'id',
				localdata : dataDesign,
				datatype : 'json'
		}
		if(dataDesign != null && typeof dataDesign != "undefined"){
			gridDesign.jqxGrid({
				source : inlineSource5,
				width : "95%",
				height : 250,
				rowsheight : 35,
				columnsheight : 85,
				enabletooltips : true,
				columnsresize : true,
				columns : [ {
					'text' : 'Id',
					'datafield' : 'id',
					'width' : '6%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
				}, {
					'text' : 'Due date',
					'datafield' : 'dueDate',
					'width' : '6%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
				}, {
					'text' : 'Design Status',
					'datafield' : 'designStatus',
					'width' : '8%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
				},{
					'text' : 'Status Date',
					'datafield' : 'statusDate',
					'width' : '8%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
				},{
					'text' : 'Designer Type',
					'datafield' : 'designerType',
					'width' : '10%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
				},{
					'text' : 'Number Of Variations',
					'datafield' : 'numberOfVariations',
					'width' : '10%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
				},{
					'text' : 'Intimation Mode',
					'datafield' : 'intimationMode',
					'width' : '10%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
				},{
					'text' : 'Cust Approval Due Date',
					'datafield' : 'custApprovalDueDate',
					'width' : '10%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
				},{
					'text' : 'linked Sl No',
					'datafield' : 'linkedSlNo',
					'width' : '10%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
				},{
					'text' : 'OrderItem Id',
					'datafield' : 'orderItemId',
					'width' : '10%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
				},{
					'text' : 'Designer Name',
					'datafield' : 'designerName',
					'width' : '10%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
				}]
			});
		}
		
		if (datastones.length != 0) {
			grid1.jqxGrid({
				source : inlineSource3,
				width : "95%",
				height : 250,
				rowsheight : 35,
				columnsheight : 85,
				enabletooltips : true,
				columnsresize : true,
				columns : [ {
					'text' : 'Article Link Sl No',
					'datafield' : 'id',
					'width' : '6%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true
				}, {
					'text' : 'Stone Sl No',
					'datafield' : 'serialNumber',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true
				}, {
					'text' : 'Stone Supp By ',
					'datafield' : 'stoneSuppBy',
					'width' : '8%',
					cellsalign : 'left',
					align : 'center',
					editable : false,
					sortable : true

				}, {
					'text' : 'Stone Seg',
					'datafield' : 'stoneSegment',
					'width' : '7%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true
				},{
					'text' : 'Stone Sub Cat/Shape',
					'datafield' : 'subCategoryDesc',
					'width' : '8%',
					cellsalign : 'left',
					align : 'center',
					editable : false,
					sortable : true
				}, {
					'text' : 'Stone Article Code',
					'datafield' : 'stoneArticleCode',
					'width' : '9%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true

				}, {
					'text' : 'Wt Range',
					'datafield' : 'wtRange',
					'width' : '7%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true
				}, {
					'text' : 'Clarity',
					'datafield' : 'clarity',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true
				}, {
					'text' : 'Actual Color',
					'datafield' : 'actaulcolor',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true
				}, {
					'text' : 'Color',
					'datafield' : 'color',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true
				}, {
					'text' : 'Cut Grade',
					'datafield' : 'cutGrade',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true

				}, {
					'text' : 'UOM',
					'datafield' : 'uom',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true

				}, {
					'text' : 'JW Stone Pcs',
					'datafield' : 'vendorPieces',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true
				},{
					'text' : 'JW Stone Wt',
					'datafield' : 'vendorWeight',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					cellsformat : 'd3',
					editable : false,
					sortable : true
				},{
					'text' : 'JW Stone Price',
					'datafield' : 'vendorStonePrice',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					cellsformat : 'd3',
					editable : false,
					sortable : true
				}, {
					'text' : 'Comp Stone Pcs',
					'datafield' : 'compPieces',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true

				}, {
					'text' : 'Comp Stone Wt.',
					'datafield' : 'compWeight',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					cellsformat : 'd3',
					sortable : true

				}, {
					'text' : 'Comp Stone Price',
					'datafield' : 'compPrice',
					'width' : '5%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
					cellsformat : 'd2'

				}, {
					'text' : 'Stone Condition',
					'datafield' : 'condition',
					'width' : '5%',
					cellsalign : 'left',
					align : 'center',
					editable : false,
					sortable : true
				} ],
				showaggregates : true,
				showstatusbar : false,
			});
		}

		if (dataAcc.length != 0) {
			gridAcc.jqxGrid({
				source : inlineSource4,
				width : "95%",
				height : 175,
				rowsheight : 35,
				columnsheight : 85,
				enabletooltips : true,
				columnsresize : true,
				columns : [ {
					'text' : 'Article Link Sl No',
					'datafield' : 'slNo',
					'width' : '9%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true
				}, {
					'text' : 'Sl No',
					'datafield' : 'serialNumber',
					'width' : '4%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true
				}, {
					'text' : 'Acc. Supp.By ',
					'datafield' : 'accSuppBy',
					'width' : '9%',
					cellsalign : 'left',
					align : 'center',
					editable : false,
					sortable : true

				},{
					'text' : 'Acc. Sub Cat/Shape',
					'datafield' : 'accSubCate',
					'width' : '9%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true
				}, {
					'text' : 'Acc Article Code',
					'datafield' : 'accArticleCode',
					'width' : '10%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true

				}, {
					'text' : 'UOM',
					'datafield' : 'uom',
					'width' : '7%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true

				}, {
					'text' : 'Acc Rate',
					'datafield' : 'rate',
					'width' : '8%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
					cellsformat : 'd2'
				}, {
					'text' : 'JW Acc. Pcs',
					'datafield' : 'vendorPieces',
					'width' : '7%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true
				}, {
					'text' : 'JW Acc. Wt.',
					'datafield' : 'vendorWeight',
					'width' : '7%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
					cellsformat : 'd3'
				}, {
					'text' : 'JW Acc. Price.',
					'datafield' : 'vendorPrice',
					'width' : '7%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
					cellsformat : 'd2'
				}, {
					'text' : 'Comp Acc. Pcs',
					'datafield' : 'compPieces',
					'width' : '7%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true

				}, {
					'text' : 'Comp Acc. Wt.',
					'datafield' : 'compWeight',
					'width' : '7%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
					cellsformat : 'd3'

				}, {
					'text' : ' Comp Acc. Price',
					'datafield' : 'compPrice',
					'width' : '9%',
					cellsalign : 'center',
					align : 'center',
					editable : false,
					sortable : true,
					cellsformat : 'd2'

				}],
				showaggregates : true,
				showstatusbar : false
			});
		}
	}

	$("#jqxgrid").jqxGrid({
		initrowdetails : initlevel2,
		rowdetails : true,
		width : '100%',
		sortable : true,
		columnsresize : true,
		showstatusbar : false,
		rowdetailstemplate : {
			rowdetails : "<div id='grid' style='margin-bottom : 20px; '></div>",
			rowdetailsheight : 350,
			rowdetailshidden : true
		}
	});
};
var stockOrderFieldFilters = function() {
	var orderFromDate = $('#orderFromDate').val();
	var orderToDate = $('#orderToDate').val();
	var jewelType = $('#jewelType').val();
	var catId = $('#categoryID').val();
	var subCatId = $('#subCategoryId').val();

	var segment = $('#segment').val();
	var orderTypeS = $('#orderTypeS').val();
	var orderNoS = $('#orderNoS').val();
	var orderDate = $('#orderDate').val();
	var enteredBy = $('#enteredBy').val();
	var status = $('#status').val();

	fieldFilters = {
		"fieldFilters" : {}
	};
	if (orderTypeS != "" && orderTypeS != null) {
		fieldFilters.fieldFilters["oType"] = orderTypeS;
	}
	if (orderToDate != "" && orderToDate != null) {
		fieldFilters.fieldFilters["orderToDate"] = orderToDate;
	}
	if (orderFromDate != "" && orderFromDate != null) {
		fieldFilters.fieldFilters["orderFromDate"] = orderFromDate;
	}
	if (jewelType != "" && jewelType != null) {
		fieldFilters.fieldFilters["jType"] = jewelType;
	}
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["sType"] = segment;
	}
	if (catId != "" && catId != null) {
		fieldFilters.fieldFilters["catId"] = catId;
	}
	if (subCatId != "" && subCatId != null) {
		fieldFilters.fieldFilters["subCatId"] = subCatId;
	}
	if (orderNoS != "" && orderNoS != null) {
		fieldFilters.fieldFilters["orderNo"] = orderNoS;
	}
	if (orderDate != "" && orderDate != null) {
		fieldFilters.fieldFilters[""] = orderDate;
	}

	if (enteredBy != "" && enteredBy != null) {
		fieldFilters.fieldFilters["createdBy"] = enteredBy;
	}
	if (status != "" && status != null) {
		fieldFilters.fieldFilters["oStatus"] = status;
	}
	return fieldFilters;
}

var stoneArry = [];

// Save Stock and Consignment Order
$("#saveSCOrder").on('click',function(e) {
	$("#loading").hide();
					var orderItemArray = [];
					var rows = $("#jqxgridAcc").jqxGrid('getrows');
					var sysdate = moment().format('DD-MM-YYYY HH:mm:SS A');
					// Attribute Object Creation
					var masterRows = $("#jqxgridAcc").jqxGrid('getrows');
					var selectedrowindexMaster = $("#jqxgridAcc").jqxGrid('getselectedrowindex');
					var getAttrRows = $("#attributeDetSection").jqxGrid('getrows');
					var getDesignRows = $("#designDetGrid").jqxGrid('getrows');
					var getStoneRows = $("#stoneMasterGrid").jqxGrid('getrows');
					var accAccRows = $("#accMasterGrid").jqxGrid('getrows');

					var metalPropDetSection = $("#metalPropDetSection").jqxGrid('getrows');
					if(typeof rows == "undefined" || rows.length == 0){
						$.growl.error({
							message : "Please add line items.",
							duration : 10000
						});
						return false;
					}
					if (typeof getAttrRows != "undefined") {
					   if (getAttrRows.length > 0) {
							if (getAttrRows.length != masterRows.length) {
								$.growl.error({
											message : "Please add Atleast one attribute for one line item.",
											duration : 10000
										});
								   return false;
							   }
					    }
					}
					if(typeof getAttrRows == "undefined" || getAttrRows.length == 0){
						$.growl.error({
							message : "Attribute details are mandatory.",
							duration : 10000
						});
						return false;
					}
					for (var m = 0; m < masterRows.length; m++) {
						var orderItems = {
							"attributes" : {},
							"design" : {},
							"stones" : [],
							"accessories" : [],
						}
						if(masterRows[m].orderKind == ""){
							 $.growl.error({
									message : "Please select the Order Kind !!",
									duration : 10000,
									title : 'Error'
								});
							  return false;
						}
						 if (masterRows[m].orderKind == "SSP"){
							 if(masterRows[m].linkedToSrNo == ""){
									  $.growl.error({
											message : "Please select the linked Serial No !!",
											duration : 10000,
											title : 'Error'
										});
									  return false;
								    }
						    if (masterRows[m].segment == ""|| masterRows[m].segmentN == ""	|| masterRows[m].expWt == ""	|| masterRows[m].metalWtTypeN == ""
									|| masterRows[m].meltingPurity == ""|| masterRows[m].metalColN == ""
									|| masterRows[m].vendorCode == "" || masterRows[m].vendorCode == null || masterRows[m].labelName == "" || masterRows[m].labelName == null || masterRows[m].orderKind == ""
										|| masterRows[m].articleDesc == "" ||masterRows[m].articleDesc == null || masterRows[m].jewelType == ""
											) {
									$.growl.error({
										message : "Please fill mandatory fields.",
										duration : 10000,
										title : 'Error'
									});
									return false;
								}
						 }else if(masterRows[m].orderKind == "SRP" || masterRows[m].orderKind == "NO"){
							    if (masterRows[m].segment == ""|| masterRows[m].segmentN == ""	|| masterRows[m].expWt == ""|| masterRows[m].metalWtTypeN == ""
									|| masterRows[m].meltingPurity == ""|| masterRows[m].metalColN == "" || masterRows[m].vendorCode == null
									|| masterRows[m].articleDesc == "" ||masterRows[m].articleDesc == null || masterRows[m].vendorCode == "" 
									|| masterRows[m].labelName == "" || masterRows[m].labelName == null || masterRows[m].orderKind == ""
									|| masterRows[m].storeId == ""|| masterRows[m].jewelType == "") {
											$.growl.error({
												message : "Please fill mandatory fields.",
												duration : 10000,
												title : 'Error'
											});
											return false;
										}
								  }
					
						if(masterRows[m].orderKind =='NO' || masterRows[m].orderKind == "SRP" || masterRows[m].orderKind == "SSP"){
							if(masterRows[m].dueDate == null || masterRows[m].dueDate == ""){
								$.growl.error({
									message : "Due Date is mandatory",
									duration : 10000
								});
								return false;
							}
						}
						
						if(masterRows[m].orderKind =='NO'){
							if(masterRows[m].metalCol == "" || masterRows[m].metalCol == null){
								$.growl.error({
									message : "Metal Color is mandatory",
									duration : 10000
								});
								return false;
							}
						}
						
						if(masterRows[m].orderKind == 'SRP' || masterRows[m].orderKind == 'NO'){
							if(masterRows[m].metalWtTypeN == "Range"){
								if(masterRows[m].expWtTo <= 0 || masterRows[m].expWt <= 0){
									$.growl.error({
										message : "Range value should be greater than zero.",
										duration : 10000,
										title : 'Error'
									});
									return false;
								}else if(masterRows[m].expWtTo <= masterRows[m].expWt){
										
									$.growl.error({
										message : "To wt should be greater than from wt.",
										duration : 10000,
										title : 'Error'
									});
									return false;
								}
							}else{
								if( masterRows[m].expWt <= 0){
									$.growl.error({
										message : "Absolute value should be greater than zero.",
										duration : 10000,
										title : 'Error'
									});
									return false;
								}
							}
						}
						//$("#saveSCOrder").prop('disabled', true);
						//$("#saveSCOrder").prop('disabled', true);
						if (typeof getStoneRows != "undefined") {
							var stoneObjVal = {};
							$.each(getStoneRows, function(k, v) {
								if (masterRows[m].serialNo == v.artLinkSlNo) {
									var stoneObj = {
									    "id":v.id,
										"serialNumber":v.slNo,
										"condition" : v.stonCond,
										"suppliedBy" : {
											"id" : v.stoneSupBy,
											"name" : v.suppliedByName,
											"description" : null,
											"rateList" : null,
											"value" : null
										},
										"rate" : v.stoneRate,
										"compPieces" : v.compStonePcs,
										"compWeight" : v.compStoneWt,
										"compPrice" : v.stonePrice,
										"custPieces" : null,
										"custWeight" : null,
										"custPrice" : null,
										"vendorPieces" : v.jwStonePcs,
										"vendorWeight" : v.jwStoneWt,
										"vendorPrice" : v.jwPrice,
										"subCategoryDesc" : v.subCatDesc,
										"costPrice" : v.costPrice,
										"newStoneFlag" :(typeof v.newStoneFlag == "undefined" || v.newStoneFlag == "" || v.newStoneFlag == null) ? null : v.newStoneFlag,
										"code" : {
											"id" : v.stoneArtCodeId,
											"name" : v.stoneArtCode,
											"description" : null,
											"rateList" : null,
											"value" : null
										},
										"subCategory" : {
											"id" : v.stoneSubCat,
											"name" : v.stoneSubCatCode,
											"description" : v.stoneSubCatName,
											"rateList" : null,
											"value" : null
									     },
										"shape" : {
											"id" : v.stoneShape,
											"name" : v.stoneShapeCode,
											"description" : v.stoneShapeName,
											"rateList" : null,
											"value" : null
										},
										"clarity" : {
											"id" : v.clarity,
											"name" : null,
											"description" : null,
											"rateList" : null,
											"value" : null
										},
										"color" : {
											"id" : v.color,
											"name" : null,
											"description" : null,
											"rateList" : null,
											"value" : null
										},
										"cutGrade" : {
											"id" : v.cutGrade,
											"name" : null,
											"description" : null,
											"rateList" : null,
											"value" : null
										},
										"uom" : v.uom,
										"actualColor" : {
											"id" : v.actualColor,
											"name" : null,
											"description" : null,
											"rateList" : null,
											"value" : null
										},
										"weightRange" : {
											"id" : v.wtRange,
											"name" : null,
											"description" : null,
											"rateList" : null,
											"value" : null
										},
										"fromWeightCost":v.fromWeightCost,
										"toWeightCost":v.toWeightCost,
										
								          "stoneSegment": v.stoneSeg,
								          "stoneCategory": v.stoneMainCatName,
									}
									orderItems['stones'].push(stoneObj);
								}
							})
						} else {
							orderItems['stones'] = null;
						}
						if (typeof accAccRows != "undefined") {
							$.each(accAccRows, function(k, v) {
								if (masterRows[m].serialNo == v.artLinkSlNo) {
									var accRow = {
										"id":v.id,
										"condition" : v.accCondition,
										"rate" : v.accRate,
										"compPieces" : v.compAccPcs,
										"compWeight" : v.compAccWt,
										"compPrice" : v.compAccPrice,
										"custPieces" : null,
										"custWeight" : null,
										"custPrice" : null,
										"vendorPieces" : v.jwAccPcs,
										"vendorWeight" : v.jwAccWt,
										"vendorPrice" : v.jwAccPrice,
										"costPrice" :v.costPrice,
										"newAccFlag" :(typeof v.newAccFlag == "undefined" || v.newAccFlag == "" || v.newAccFlag == null) ? null : v.newAccFlag,
										"uom" : {
											"id" : v.uom,
											"name" : v.uom,
											"description" : null,
											"rateList" : null,
											"value" : null
										},
										"suppliedBy" : {
											"id" : v.accSupBy,
											"name" : v.accSupByName,
											"description" : null,
											"rateList" : null,
											"value" : null
										},
										 "mainCategory": {
									            "name": v.accMainCatName,
									          },
										"subCategory" : {
											"id" : v.accSubCat,
											"name" : v.accSubCatCode,
											//"description" : v.accSubCatName,
											"rateList" : null,
											"value" : null
										},
										"code" : {
											"id" : v.accArticleId,
											"name" : v.accArtCode,
											"description" : null,
											"rateList" : [v.rateList],
											"value" : null
										}
									}
									orderItems['accessories'].push(accRow);
								}
							})
						} else {
							orderItems['accessories'] = null;
						}
						
						if (typeof getDesignRows != "undefined") {
							for (var j = 0; j < getDesignRows.length; j++) {
								if (masterRows[m].serialNo == getDesignRows[j].artLinkSlNo) {
									var designItem = {
										"isEmpApprovalReqd" : getDesignRows[j].isEmpApprovalReqd,
										"isCustApprovalReqd" : getDesignRows[j].isCustApprovalReqd,
										"designStatus" : {
											"id" : getDesignRows[j].designStatusId,
											"name" : getDesignRows[j].designStatus,
											"description" : null,
											"rateList" : null,
											"value" : null
										},
										"designerType" : {
											"id" : getDesignRows[j].designerTypeId,
											"name" : getDesignRows[j].designerType
										},
										"designerName" : {
											"id" : getDesignRows[j].designerNameId,
											"name" : getDesignRows[j].designerName
										},
										"dueDate" : getDesignRows[j].dueDate,
										"numberOfVariations" : getDesignRows[j].numberOfVariations,
										"catalogueRefNumber" : getDesignRows[j].catalogueRefNumber,
										"designInstruction" : getDesignRows[j].designInstruction
									};
									orderItems['design'] = designItem;
								}
							}
						} else {
							orderItems['design'] = null;
						}
						
						orderItems["serialNumber"] = masterRows[m].serialNo;
						if ($.isEmptyObject(orderItems.design) == true || orderItems.design == null) {
							orderItems["isDesignReqd"] = 0;
						} else {
							orderItems["isDesignReqd"] = 1;
						}

						if ($.isEmptyObject(orderItems.stones) == true
								|| orderItems.stones == null) {
							orderItems["isStoneReqd"] = 0;
						} else {
							orderItems["isStoneReqd"] = 1;
						}

						if ($.isEmptyObject(orderItems.accessories) == true
								|| orderItems.accessories == null) {
							orderItems["isAccessoryReqd"] = 0;
						} else {
							orderItems["isAccessoryReqd"] = 1;
						}

						orderItems["linkedTosln"] = {
							"id" : masterRows[m].linkedToSrNoN,
							"name" : masterRows[m].linkedToSrNo
						};
						
						orderItems["stockNumber"] = masterRows[m].stockNumber;
						if (typeof metalPropDetSection != "undefined") {
							$.each(metalPropDetSection,function(k, v) {
							if (masterRows[m].serialNo == v.artLinkSlNo) {
								orderItems["preRepairMeltingPurity"] = v.preRepairMP;
								if(masterRows[m].orderKind == 'SRP') {
									orderItems["preRepairGrossWeight"] = v.preRepairGrWt;
									orderItems["preRepairNetWeight"] = v.preRepairNetWt;
								}else if(masterRows[m].orderKind == 'SSP') {
									orderItems["finishedGrossWeight"] = v.preRepairGrWt;
									orderItems["finishedNetWeight"] = v.preRepairNetWt;
								}
							} else {
								orderItems["preRepairMeltingPurity"] = null;
							}
					   });
						
				  $.each(metalPropDetSection,function(k, v) {
							if (masterRows[m].serialNo == v.artLinkSlNo) {
								if(masterRows[m].orderKind == 'SSP') {
									orderItems["orderItemDescription"] = v.sampDesc;
									orderItems["jobWorkerInstruction"] = v.sampPur;
								}
							} else {
								orderItems["orderItemDescription"] = null;
								orderItems["jobWorkerInstruction"] = null;
							}
						});
					}
					orderItems["oKind"] = {
						"id" : masterRows[m].orderKind,
						"name" : masterRows[m].orderKindN,
						"description" : null,
						"rateList" : null,
						"value" : null
					};
					
					orderItems["salesExecutive"] = {
							"id" : 19,
							"name" : "Murthy DCPL"
						};
					
					if (typeof getAttrRows != "undefined") {
						for (var i = 0; i < getAttrRows.length; i++) {
							if (masterRows[m].serialNo == getAttrRows[i].artLinkSlNo) {
								if(getAttrRows[i].attrdetval != null || getAttrRows[i].attrdetval != undefined){
								  orderItems['attributes'] = getAttrRows[i].attrdetval;
								}else{
								  orderItems['attributes'] = null;
								}
							} else {}
						}
					}
					
					if(masterRows[m].orderKind == 'NO' || masterRows[m].orderKind == 'SRP') {
						orderItems["orderItemDescription"] = null;
						orderItems["jobWorkerInstruction"] = masterRows[m].vendorInst;
					}
					orderItems["expectedPieces"] = masterRows[m].labelName;
					orderItems["isAdditionalWorkReqdType"] = 0;
					orderItems["dueDateType"] = {
						"id" : "General",
						"name" : "General"
					};
					orderItems["segId"] = {
						"id" : masterRows[m].segment,
						"description" : masterRows[m].segmentN
					};
					orderItems["metalId"] = {
						"id" : masterRows[m].metalType
					};
					orderItems["orderItemMeltingPurity"] = masterRows[m].meltingPurity;

					orderItems["metalColor"] = {
						"id" : masterRows[m].metalCol,
						"name" : masterRows[m].metalColN
					};
					orderItems["articleMaster"] = {
						"id" : masterRows[m].articleIdMaster,
						"name" : masterRows[m].articleNameMaster,
						"description" : masterRows[m].articleDesc,
						"rateList" : null,
						"value" : "0"
					};
					orderItems["vendor"] = {
						"id" : masterRows[m].vendorCode,
						"name" : null,
						"description" : null,
						"rateList" : null,
						"value" : null
					};
					orderItems["jewelType"] = {
						"id" : masterRows[m].jewelType,
						"description" : masterRows[m].jewelTypeN
					};
					orderItems["subCategory"] = {
						"id" : masterRows[m].subCatId,
						"name" : masterRows[m].subCatCode,
						"description" : masterRows[m].subCatName,
						"rateList" : null,
						"value" : null
					};
					
					orderItems["orderItemDueDate"] = masterRows[m].dueDate;
					orderItems["metalWeightType"] = {
						"id" : masterRows[m].metalWtTypeN,
						"name" : masterRows[m].metalWtTypeN
					};
					orderItems["store"] = {
							"storeId" : masterRows[m].storeId
					};
					
					orderItems["expectedToWeight"] = masterRows[m].expWtTo;
					orderItems["expectedFromWeight"] = masterRows[m].expWt;
					
					if(masterRows[m].orderKind == 'SRP' || masterRows[m].orderKind == 'SSP'){
						orderItems["vendorType"] = masterRows[m].vendorType;
						orderItems["mapDealerRate"] = masterRows[m].mapDealerRate;
					}
					
					orderItems["orderItemSkinPurity"] = {
						"id" : masterRows[m].smPurityId,
						"skinPurity" : masterRows[m].smPurityN,
						"meltingPurity" : masterRows[m].meltingPurity,
						"description" : masterRows[m].smPurityDesc
					};
						orderItemArray.push(orderItems);
					}

					var scOrderArr = {
						"isAdvancedPayment" : 0,
						"intimationReqd" : {
							"id" : "No"
						},
						
						"printNameInBill" : {
							"id" : "No"
						},
						"deliveryAddress" : {
							"id" : "No"
						},
						"intimationMode" : {
							"id" : "Postal"
						},
						"orderStatus" : "Generated",
						"orderType" : ($("#orderTypeC").val() == "ST") ? "StockOrder" : "ConsignmentOrder",
						"orderDate" : sysdate,
						"orderSource" : "Store",
						"orderItems" : orderItemArray,
						"orderCreditAccountList" : []
					}
					$("#saveSCOrder").attr("disabled","disabled");
					var $link = $(e.target);
					e.preventDefault();
					
					console.log(JSON.stringify(scOrderArr));
					if(!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 500) {
						  
					postJSON('/OrderExecution/api/v1/createDesignOrder', JSON.stringify(scOrderArr), function(data) {
						if (data.resCode == 1) {
							$("#saveSCOrder").attr("disabled","disabled");
							
							$.growl.notice({
								message : data.mesgStr,
								duration : 10000,
								title : 'Success'
							});
							$(this).find('form').trigger('reset');
							$("#vendorList").empty();
							scOrderSearchGrid();
							redirect();
							return true;
						} else {
							$("#saveSCOrder").removeAttr("disabled");
							$.growl.error({
								message : data.mesgStr,
								duration : 10000
							});
							return false;
						}
						
					});
					  }
					  $link.data('lockedAt', +new Date());
					 // $("#saveSCOrder").prop('disabled', false);
					  $("#saveSCOrder").removeAttr('disabled');
					  $("#loading").hide();
				});

//####################### validation ###################
$("#saveDesignForm").on('click',function(){
	var noOfDesignReq = $("#noOfDesignReq").val();
		if(noOfDesignReq == 0){
			$.growl.error({
				message : "No of Design Required Cannot be Zero",
				duration : 1000,
				title : 'Error'
			});
			return false;
		}			
});

function checkCondtion(row , newvalue , indexValue , type){
	var data = /^\d+(\.\d{1,3})?$/.test(newvalue);
	if(type === 1){
		var fromWt = newvalue;
		var toWt = row.expectedToWeight;
		}else{
		var fromWt = row.expectedFromWeight;
		var toWt = newvalue;
	}
	if(row.metalWt ==  "Absolute"){
		if(parseFloat(fromWt)<= parseFloat(toWt) && parseFloat(fromWt) >= "0.001"  &&  parseFloat(toWt) >= "0.001"){
				var fieldFilter = {
						"id" : row.id,
						"expectedFromWeight" : fromWt,
						"expectedToWeight" : fromWt,
				};
				postJSON('/OrderExecution/api/v1/editStockConsignmnetOrder',JSON.stringify(fieldFilter), function(data) {
					if(data.resCode == 1){
						$.growl.notice({
							message : data.mesgStr,
							duration : 10000,
							title : 'Success'
						});
					}else{
						$.growl.error({
							message : data.mesgStr,
							duration : 10000,
							title : 'Error'
						});
					}
				});
			}else{
				$.growl.error({
					message : "please enter To Wt. less than From value  and not less than 0.001 ",
					duration : 1000,
					title : 'Error'
				});
			return false;
			}
		}else{
			if(parseFloat(fromWt)<= parseFloat(toWt) && parseFloat(fromWt) >= "0.001"  &&  parseFloat(toWt) >= "0.001"){
					var fieldFilter = {
							"id" : row.id,
							"expectedFromWeight" : fromWt,
							"expectedToWeight" : toWt,
					};
					postJSON('/OrderExecution/api/v1/editStockConsignmnetOrder',JSON.stringify(fieldFilter), function(data) {
						if(data.resCode == 1){
							$.growl.notice({
								message : data.mesgStr,
								duration : 10000,
								title : 'Success'
							});
							if(row.metalWt == "Range"){
								$('#jqxgrid').jqxGrid('setcellvalue', indexValue,'expectedToWeight', null);
							}
						}else{
							$.growl.error({
								message : data.mesgStr,
								duration : 10000,
								title : 'Error'
							});
						}
					});
				}
			else
				{
				$.growl.error({
					message : "please enter To Wt. less than From value  and not less than 0.001 ",
					duration : 1000,
					title : 'Error'
				});
				return false;
				}
		}
}
 $("#stoneRate").on('change',function(){
	 var uom = $("#uom").val();
	 if( uom == "Cts" || uom == "Gms"){
		 $("#jwStoneWt").val("");
		 $("#dplStoneWt").val("");
		 
	}
	if(uom == "Pcs"){
		 $("#jwStonePcs").val("");
		 $("#dplStonePcs").val("");
	}
 });
 
 //###################################### supplied by company ##############################
 $("#dplStoneWt").on('change',function(){
	var uom = $("#uom").val();
	var stRate = $("#stoneRate").val();
	var stWt = $("#dplStoneWt").val();
	var cPrice;
	if(uom == "Cts" || uom == "Gms"){
		cPrice = parseFloat(stWt) * parseFloat(stRate); 
		var cp = cPrice.toFixed(2);
		$("#stonePrice").val(cp);
	}
});
 
 $("#dplStonePcs").on('change',function(){
	var cPrice;
	var pcs= $("#dplStonePcs").val();
	var stRate= $("#stoneRate").val();
	var uom = $("#uomC").val();
	if(uom == "Pcs"){
		cPrice = pcs * parseFloat(stRate);
		var cp =  cPrice.toFixed(2);
		$("#stonePrice").val(cp);
	}
});
 
// #################################### supplied by Vendor #############################
$("#jwStoneWt").on('change',function(){
	var uom = $("#uom").val();
	var stRate = $("#stoneRate").val();
	var stWt = $("#jwStoneWt").val();
	var cPrice;
	if(uom == "Cts" || uom == "Gms"){
		cPrice = parseFloat(stWt) * parseFloat(stRate); 
		var cp = cPrice.toFixed(2);
		$("#jwPrice").val(cp);
	}
});

$("#jwStonePcs").on('change',function(){
	var cPrice;
	var pcs= $("#jwStonePcs").val();
	var stRate= $("#stoneRate").val();
	var uom = $("#uom").val();
	if(uom == "Pcs"){
		cPrice = pcs * parseFloat(stRate);
		var cp =  cPrice.toFixed(2);
		$("#jwPrice").val(cp);
	}
});


$('.number_only').bind('keyup', function(){
    this.value = this.value.replace(/[^0-9]/g, '');
});

function validateNumber1(val) {
	var regex = /^\d{0,9}(\.\d{0,3})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(3);
	}
	return '';
}; 

function validateNumber(val) {
	var regex = /^\d{0,9}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}; 

//On Modal Close Reset Form and Make vendor list empty
$('.modal').on('hidden.bs.modal', function() {
	$("#attrDetailsForm").trigger("reset");
	$("#designDetailsForm").trigger("reset");
	$("#addStoneDetails").trigger("reset");
	$("#addAccDetails").trigger("reset");
	$("#CustOrderDue").trigger("reset");
	$("#vendorList").empty();
	$("#articleList").empty();
	$("#attributeDetailVal").empty();
});