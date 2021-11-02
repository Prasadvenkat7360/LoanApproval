<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Design Assign / Re-assign
					</h1>
				</div>

				<form class="form-horizontal">
						<div class="row">
							<div class="col-sm-2">
								<label>Date From</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control"
										id="orderFromDate" placeholder="DD/MM/YYYY" style="background-color:white;"> <label
										for="orderFromDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>								
							</div>
							
							<div class="col-sm-2">
                               <label>Date To</label>                                
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control"
										id="orderToDate" placeholder="DD/MM/YYYY" style="background-color:white;"> <label
										for="orderToDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>                         
                           	</div>

							<div class="col-sm-2">
								<label>Store Code </label> <select id="storeCodes"
									class="form-control">
									<option value="" selected label="All" />
								</select>
							</div>							

							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Order Type </label><div id="orderTypeS">
								</div>
							</div>
						
							<div class="col-sm-2">
								<label>Order No. </label> <input type="number" name="orderNo"
									id="orderNo" class="form-control" placeholder="Order No." min="1" maxlength="10"/>
							</div>
							
							<div class="col-sm-2">
								<label>Segment </label> <select id="segments"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							
            				<div class="clearfix"></div>
							<div class="col-sm-2">
								<label>Design By </label> 
								<select id="designBy" onchange="enableDesigner()" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-sm-2">
								<label>Designer </label>
								<select id="designers" disabled	class="form-control">
									<option value=""  selected label="--Select--" />
								</select>
							</div>
						</div>						

						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="SearchAD" id="SearchAD">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							<button id="removeAll" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
							<button class="btn btn-primary btn-sm voffset" type="button" name="Save" id="Save">
								<i class="fa fa-floppy-o"></i> Assign Designers
							</button>
						</div>
				</form>
				<div class="clearfix">&nbsp;</div>				
				<div style="position: relative; z-index: 1"><div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
				<div class="clearfix">&nbsp;</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" src="resource/oe/assets/js/app/design.js"></script>
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
	var $segments = $('#segments');
	var $orderTypes = $('#orderTypes');
	var $designBy = $('#designBy');
	var $designers = $('#designers');


	$.getJSON('/OrderExecution/api/v1/designLOV?page=ARDesigner', function(data) {

		//iterate over the data and append a select option
		$.each(data.payload.storeCodes, function(key, val) {
			$storeCodes.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});

		$.each(data.payload.sTypes, function(key, val) {
			$segments.append('<option value="' + val.id + '">'
					+ val.description + '</option>');
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
		
		$designBy.empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.designBy, function(key, val) {
			$designBy.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});

		internalDesigners = data.payload.Internal;
		externalDesigners = data.payload.External;
		designType = data.payload.designBy;
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
	$("#SearchAD").on("click", function() {
	 	var orderTypeObj = $("#orderTypesObj").val();
	 	if(orderTypeObj =="" || orderTypeObj == null){
		 	$.growl.error({ message : "Please Select Order Type!!!", duration : 500, title : 'Error' });
		 	return false;
	 	}
	 	var orderTypeVal = orderTypeObj.toString();
 		if(orderTypeVal == "CU,ST" || orderTypeVal == "CU,CO" || orderTypeVal == "DO,ST" || orderTypeVal == "DO,CO" || orderTypeVal == "CU,DO,ST" ||
	 		orderTypeVal == "CU,DO,CO"|| orderTypeVal == "CU,ST,CO" || orderTypeVal == "DO,ST,CO" || orderTypeVal == "CU,DO,ST,CO"){
	 		$.growl.error({message : "Order type can not be combination of " +  orderTypeVal,duration : 500,title : 'Error'});
	 		$("#orderTypesObj").multiselect('deselect', orderTypeObj);
			$("#orderTypesObj").multiSelect("clearSelection");
			return false;		 		
	 	}else{
			assignDesignerGrid();
			$("#jqxgrid").show();
	 	}
	}); 

	$("#Save").on(
			"click",
			function() {
				if(!(jQuery.isEmptyObject(updates))) {
					postJSON('/OrderExecution/api/v1/updateDesignerName', JSON
							.stringify(updates), function(data) {
						if(data.resCode=="1"){
							$("#jqxgrid").jqxGrid("updatebounddata");
							updates = new Object();
							$.growl.notice({ message: data.mesgStr, duration: 10000, title: 'Success' });
						}else{
							$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
						}
						
					});

					return false;
				} else {
					$.growl.error({ message: "Please choose atleast one item to Assign Vendor", duration: 10000 });
				}
			});
	
	// clear functionality
	$("#removeAll").on('click',function(){
		$('#orderTypesObj').multiselect("clearSelection");
		
		var validator = $("form").validate();
		validator.resetForm();

		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();
	});
	
</script>

