/** AUTHOR UI : DIPNKAR
 *  AUTHOR JAVA : NAGESH
 *  DESC : Design Approval
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

//loadPermission();

var redirect = function() {
	window.location.href = "javascript:showContentPage('designApproval', 'bodySwitcher')";
	return window.location.href;
}

var searchDesignA = function() {
	var orderNo = $("#orderNo").val();
	var orderSlNo = $("#orderSlNo").val();
	
	var fieldFilters = {
			"fieldFilters" : {}
	};
	
	if(orderNo != null && orderNo != ""){
		fieldFilters.fieldFilters["orderNo"] = orderNo;
	}
	
	if(orderSlNo != null && orderSlNo != ""){
		fieldFilters.fieldFilters["orderSl"] = orderSlNo;
	}
	
	return fieldFilters;
}


$("#searchDA").on('click', function(){
	searchDesignApprovalGrid();
	$("#jqxgrid").show();
});

var viewDesignOrderApproVal = function(row, column, value) {
		return '<button  id='+ row + ' onclick="approveDA('+ value +')" style="margin-left:1px; margin-top:6px;" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#approveDesignApproval"  type="button" /><i class="fa fa-check fa-lg"></i></button>';
}

//Search Design Order Grid
function searchDesignApprovalGrid() {
	var updateRows = function(rowid, newdata, commit) {		
	}
	var datafields = [ 
		{name : 'storeCode',	type : 'string', map:'dcCode'},
		{name : 'orderNo', type : 'string'},
		{name : 'orderSl', type : 'int'},
		{name : 'orderType', type : 'string'},
		{name : 'orderKind', type : 'string'},
		{name : 'segment', type : 'string'},
		{name : 'jewelType', type : 'string'},
		{name : 'noOfDesigns', type : 'int'},
		{name : 'orderDate', type : 'date'},
		{name : 'designDueDate', type : 'date'},
		{name : 'designStatus', type : 'string'},
		{name : 'orderCreatedBy', type : 'string'},
		{name : 'designBy', type : 'string'},
		{name : 'designerName', type : 'string'},
		{name : 'remarks', type : 'string'},
		{name: 'actionId', type: 'int', map: 'id'}
	];
	var columns = [
		{text : 'DC', datafield : 'storeCode', width : '6%', cellsalign : 'center', align : 'center',editable : false,sortable:false},
		{text : 'Order No', datafield : 'orderNo', width : '5%', cellsalign : 'center', align : 'center',editable : false,sortable:true},
		{text : 'Order Srl No', datafield : 'orderSl', width : '8%', cellsalign : 'center', align : 'center',editable : false,sortable:true},			
		{text : 'Order Type', datafield : 'orderType', width : '6%', cellsalign : 'center', align : 'center',editable : false,sortable:true},
		{text : 'Order Kind', datafield : 'orderKind', width : '6%', cellsalign : 'center', align : 'center',editable : false,sortable:true},
		{text : 'Segment', datafield : 'segment', width : '5%', cellsalign : 'center', align : 'center',editable : false,sortable:true},
		{text : 'Jewel Type', datafield : 'jewelType', width : '5%', cellsalign : 'center', align : 'center', editable : false,sortable:false},
		{text : 'No of Designs', datafield : 'noOfDesigns', width : '5%', cellsalign : 'center', align : 'center', editable : false,sortable:true},
		{text : 'Order Date', datafield : 'orderDate', width : '7%', cellsalign : 'center', align : 'center', editable : false,cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput',sortable:false},
		{text : 'Design Due Date', datafield : 'designDueDate', width : '7%', cellsalign : 'center', align : 'center', editable : false,cellsformat : 'dd/MM/yyyy', columntype : 'datetimeinput',sortable:true},
		{text : 'Design Status', datafield : 'designStatus', width  : '5%', cellsalign : 'center', align : 'center', editable : false,sortable:false},
		{text : 'Order Raised By', datafield : 'orderCreatedBy', width : '6%', cellsalign : 'center', align : 'center', editable : false,sortable:false},
		{text : 'Design By', datafield : 'designBy', width : '7%', cellsalign : 'center', align : 'center', editable : false,sortable:false},
		{text : 'Designer', datafield : 'designerName', width : '12%', cellsalign : 'center', align : 'center', editable : false,sortable:false},
		{text : 'Remarks', datafield : 'remarks', width : '7%', cellsalign : 'left', align : 'center', editable : false,sortable:false},
		{text : '', datafield : 'actionId', width : '3%', cellsalign : 'center', align : 'center', editable : false, cellsrenderer : viewDesignOrderApproVal}
	];
	showMyGrid(datafields,"/OrderExecution/api/v1/designApprovalList", "list",columns, searchDesignA(), updateRows,"orderNo");
	$("#jqxgrid").jqxGrid({
		width : '100%',
        sortable: true,            
     	altrows: true,
     	theme: 'energyblue',
     	autorowheight :true,
        autoheight :true,
        columnsheight: 55,
        columnsresize: true,  
		rowsheight : 35,
		rowdetails : true,
		virtualmode : true,
	});

}

var approveDA = function(id){
	var fieldFilters = {"fieldFilters":{"designId":id}};
	$('#designAction').empty().append('<option value="" selected>--Select--</option>');
	postJSON('/OrderExecution/api/v1/ipDesignReviewList', JSON.stringify(fieldFilters), function(data) {
		$("#designAFeedback").val("");
		var actionsList = data.payload.actions;
		var designVariationList = data.payload.designVariationList;
		$("#designId").val();
		var variationRow = "";
		$.each(designVariationList, function(k, v) {
			variationRow += "<tr>";
			variationRow += "<td>"+ (k+1)+"</td><td class='text-center'><input type='checkbox' value='"+v.id+"' name='designVariationStatus'></td><td class='text-center'><a href='"+v.thumbnailUrl+"' class='thumbnail' target='_blank'><img height='30' src='"+v.thumbnailUrl+"'></a></td><td>"+v.fileName+"</td>";
			variationRow += "</tr>";
			
		});
		$("#designVariationDet").html(variationRow);
		$.each(actionsList, function(k, v) {
			if(k==0){	
				$('#designAction').append('<option selected  value="' + v.id + '">' + v.name + '</option>');		
			}else{
				$('#designAction').append('<option  value="' + v.id + '">' + v.name + '</option>');		
			}
		});
		
		$("#designDetailsEditForm").modal('hide');
	});
}


// Confirm Approval of Design
$("#confirmApproveDesign").on('click', function(){
	var designAction = ($("#designAction").val() == "R") ? "RW" : $("#designAction").val();
	var designAFeedback = $("#designAFeedback").val();
	 	var desAppValues = [];
	     $.each($("input[name='designVariationStatus']:checked"), function(){            
	    	 var desAppObj = {
	    			 "id" : $(this).val(),
	    			 "seFeedback": designAFeedback,
	    			 "designVariationStatus":designAction
	    	 }
	    	 desAppValues.push(desAppObj)
	     });
	  
		if(designAction == ""){
			$.growl.error({
				message : "Please select action.",
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
		
	if(typeof desAppValues == "undefined" || desAppValues.length == 0){
		$.growl.error({
			message : "Please select design to be approved.",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
	
	postJSON('/OrderExecution/api/v1/ipDesignVariationDecision',JSON.stringify(desAppValues), function(data) {
		if(data.resCode == 1){
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			$('#approveDesignApproval').modal('hide');
			searchDesignApprovalGrid();
		}
	});
});

// Clear all
$("#clear").on('click', function(){
	redirect();
});