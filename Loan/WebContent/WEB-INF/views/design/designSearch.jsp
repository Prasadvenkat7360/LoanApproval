<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Design Search
					</h1>
				</div>
				<input type='text' size='1' style='position:relative;top:-500px;' value="" />
				<form class="form-horizontal" id="designSearch">
						<div class="row">
							<div class="col-sm-2">
								<label>From Date </label>
								<div class="input-group">
									<input type="text" readonly class="date-picker form-control dateBackground"
										id="orderFromDate" placeholder="DD/MM/YYYY"> <label
										for="orderFromDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>To Date </label>
								<div class="input-group">
									<input type="text" readonly class="date-picker form-control dateBackground"
										id="orderToDate" placeholder="DD/MM/YYYY"> <label
										for="orderToDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Order Type </label><div id="orderTypeS">
								</div>
							</div>

							<div class="col-sm-2">
								<label>Order No </label> <input type="number" name="orderNo"
									id="orderNo" class="form-control" placeholder="Order No" />
							</div>
						
							<div class="col-sm-2">
								<label>Design By </label> <select id="designBy" onchange="enableDesigner()"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Designer </label> <select id="designers" disabled
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="clearfix"></div>
							<div class="col-sm-2">
								<label>Store Code </label> <select id="storeCodes"
									class="form-control">
									<option value="" selected label="All" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Design Status </label> <select id="designStatus"
									class="form-control">
									<option value="" selected label=All />
								</select>
							</div>
						</div>
						
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="SearchDesign" id="SearchDesign">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							<button id="removeAll" class="btn btn-warning  btn-sm voffset"	type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							<button class="btn btn-primary  btn-sm voffset" type="button" name="PrintOrder" id="PrintOrder">
								<i class="fa fa-print fa-lg"></i> Print Work Order
							</button>
							<button class="btn btn-primary  btn-sm voffset" type="button" name="export" id="export">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
							<button class="btn btn-primary  btn-sm voffset" type="button" name="email" id="email">
								<i class="fa fa-envelope"></i> Email
							</button>
						</div>
				</form>

				<div class="clearfix">&nbsp;</div>
				<div id='jqxwindow'><div id="jqxgrid" style="font-size: 13px; font-family: Verdana;"></div></div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>
<div class="clearfix">&nbsp;</div>
<div class="modal fade" id="btnViewDV" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

        </div>
    </div>
</div> 

<script src="resource/oe/assets/js/app/design.js"></script>
<script type="text/javascript">
$("#orderFromDate").datepicker({
	changeMonth: true,
	changeYear: true,
	editable : true,
	dateFormat: "dd/mm/yy",
	maxDate :0,
	onSelect: function (dateStr) {
        var min = $(this).datepicker('getDate'); 
        $("#orderToDateS").datepicker('option', 'minDate', min || '0');
    }
});

$("#orderToDate").datepicker({
	changeMonth: true,
	changeYear: true,
	dateFormat: "dd/mm/yy",
	maxDate :0,
});

function enableDesigner(){	
	 var selectVal = $( "#designBy option:selected" ).val().length;
	
	 if(parseInt(selectVal) == 0){
		 $("#designers").attr('disabled', 'disabled');
	 }else{

		 $("#designers").removeAttr("disabled");
	 }
}
	var $storeCodes = $('#storeCodes');
	var $orderTypes = $('#orderTypes');
	var $designBy = $('#designBy');
	var $designers = $('#designers');
	var $designStatus = $('#designStatus');

	$.getJSON('/OrderExecution/api/v1/designLOV?page=DesignSearch', function(
			data) {

		//iterate over the data and append a select option
		$.each(data.payload.storeCodes, function(key, val) {
			$storeCodes.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});

		/* $.each(data.payload.orderTypes, function(key, val) {
			$orderTypes.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		}); */
		
		var o = '<select id="orderTypesObj"  name="orderTypesObj" class="form-control" multiple="multiple">';
		$.each(data.payload.orderTypes, function(key, val) {
		o += '<option value="' + val.id + '">' + val.name + '</option>'; 
		});
		
		o += '</select>';
		
		$("#orderTypeS").html(o);
		
		$('#orderTypesObj').multiselect({
		includeSelectAllOption : false,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});

	    var dStatus= [];
	    $.each(data.payload.dStatus,function(k,v){
	    	if(v.id != "Ca"){
	    		dStatus.push(v);
	    	}
	    })

		$.each(dStatus, function(key, val) {
			$designStatus.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});

		$designBy.empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.designBy, function(key, val) {
			$designBy.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});

		internalDesigners = data.payload.Internal;
		externalDesigners = data.payload.External;

	});

	$("#designBy").on(
			"change",
			function() {
				var designBy = $('#designBy').val();
				if (designBy == "External") {
					$designers.empty().append(
							'<option value="" selected>--Select--</option>');
					$.each(externalDesigners, function(index, val) {
						$designers.append('<option value="' + val.id + '">'
								+ val.name + '</option>');
					});
				} else if (designBy == "Internal") {
					$designers.empty().append(
							'<option value="" selected>--Select--</option>');
					$.each(internalDesigners, function(index, val) {
						$designers.append('<option value="' + val.id + '">'
								+ val.name + '</option>');
					});
				} else {
					$designers.empty().append(
							'<option value="" selected>--Select--</option>');
				}

			});
	
	// search functionality
	$("#SearchDesign").on("click", function() {
		 var orderTypeObj = $("#orderTypesObj").val();
		 if(orderTypeObj =="" || orderTypeObj == null){
			 $.growl.error({
				 message : "Please Select Order Type !!!",
				 duration : 500,
				 title : 'Error'
			 });
			 return false;
		 }
		 var orderTypeVal = orderTypeObj.toString();
		 	if(orderTypeVal == "CU,ST" || orderTypeVal == "CU,CO" || orderTypeVal == "DO,ST" || orderTypeVal == "DO,CO" || orderTypeVal == "CU,DO,ST" ||
		 		orderTypeVal == "CU,DO,CO"|| orderTypeVal == "CU,ST,CO" || orderTypeVal == "DO,ST,CO" || orderTypeVal == "CU,DO,ST,CO"){
		 		designSearchGrid();
				$("#jqxgrid").hide();
		 		$.growl.error({
		 			message : "Order type can not be combination of " +  orderTypeVal,
		 			duration : 500,
		 			title : 'Error'
		 		});
		 		$("#orderTypesObj").multiselect('deselect', orderTypeObj);
				$("#orderTypesObj").multiSelect("clearSelection");

				return false;
		 		
		 	}
		 	designSearchGrid();
			$("#jqxgrid").show();
			
			return false;
		}); 
	
	// clear functionality
	$("#removeAll").on('click',function(){
		$('#orderTypesObj').multiselect("clearSelection");
		
		var validator = $("form").validate();
		validator.resetForm();

		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	});
	
$("#PrintOrder").on('click', function(){
	if($('#orderNo').val()!=null)
		{
		var dchecklist='';
		var designlist='';
		var designRows = $("#jqxgrid").jqxGrid('getrows');
		for(var i = 0; i< designRows.length; i++){
			   var data = designRows[i];
			   if(data.selectionStatus){
				   if(i!=0){
					   dchecklist += ",";
					  } 
				   dchecklist +=data.id;
				  
				
			   }
			   else 
				   {
				   if(i!=0){
					   designlist += ",";
					  }
				   designlist +=data.id;
				   }
		   }
 	if(dchecklist=='')
			
			{ 
    fieldFilters = {
            "fieldFilters" : {
                "orderNo" : $('#orderNo').val(),
                "designId":designlist,
                "orderFromDate" : $('#orderFromDate').val(),
                "orderToDate" : $('#orderToDate').val(),
                "orderTypes" : $('#orderTypes').val(),
                "designBy" : $('#designBy').val(),
                "designers" : $('#designers').val(),
                "storeCodes" : $('#storeCodes').val(),
                "designStatus" : $('#designStatus').val(),
                "mode" : "pdf",
                "reportName" : "WorkOrder"
            }
        };

$.ajax({
    url: '${pageContext.request.contextPath}/jasperReport',
    type: 'post',
    data: fieldFilters,
    contentType: "application/x-www-form-urlencoded",
    xhrFields: { responseType: "arraybuffer" },
    success: function (data) {
        console.log(data);
        if (navigator.msSaveBlob){
            var file = new Blob([data], {type: 'application/pdf'});  
            navigator.msSaveBlob(file, 'Work_Order.pdf');
    }
      else {   
        var file = new Blob([data], {type: 'application/pdf'});           
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
        }
     } 
});
			 } 
		
		 else
			{ 
			if(dchecklist!='')
				{
			 fieldFilters = {
			            "fieldFilters" : {
			                "orderNo" : $('#orderNo').val(),
			                "designId":dchecklist,
			                "orderFromDate" : $('#orderFromDate').val(),
			                "orderToDate" : $('#orderToDate').val(),
			                "orderTypes" : $('#orderTypes').val(),
			                "designBy" : $('#designBy').val(),
			                "designers" : $('#designers').val(),
			                "storeCodes" : $('#storeCodes').val(),
			                "designStatus" : $('#designStatus').val(),
			                "mode" : "pdf",
			                "reportName" : "WorkOrder"
			            }
			        };

			$.ajax({
			    url: '${pageContext.request.contextPath}/jasperReport',
			    type: 'post',
			    data: fieldFilters,
			    contentType: "application/x-www-form-urlencoded",
			    xhrFields: { responseType: "arraybuffer" },
			    success: function (data) {
			        console.log(data);
			        if (navigator.msSaveBlob){
			            var file = new Blob([data], {type: 'application/pdf'});  
			            navigator.msSaveBlob(file, 'Work_Order.pdf');
			    }
			      else {   
			        var file = new Blob([data], {type: 'application/pdf'});           
			            var fileURL = URL.createObjectURL(file);
			            window.open(fileURL);
			        }
			    }
			});
			
				}
			
			 } 
		}
});
</script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>