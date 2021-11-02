<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Work Order Listing
					</h1>
				</div>

				<form class="form-horizontal" id="psrSearch">
						<div class="row">

							<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>From Date </label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control"
										id="orderFromDate" placeholder="DD/MM/YYYY" style="background-color:white;"> <label
										for="orderFromDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>To Date </label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control"
										id="orderToDate" placeholder="DD/MM/YYYY" style="background-color:white;"> <label
										for="orderToDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-sm-2">
								<label>Vendor Name</label> <input type="text" id="vendorCode"
									class="form-control" placeholder="Vendor Name" /> <input
									id="vendorCode-value" type="hidden" name="code">
							</div>
							<div class="col-sm-2">
								<label>Work Order No.</label> <input type="text" id="workOrderNumber"
									class="form-control" placeholder="Work Order No." />
									<input id="workOrderNumber-value" type="hidden" name="wnumber">
							</div>

						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="Search" id="Search"><i class="fa fa-search fa-lg"></i> Search</button>
							<button id="removeMatIssueDet" class="btn btn-warning btn-sm voffset"	type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
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

<script type="text/javascript">
$(document).on('click', '#orderFromDate', function () {
    var me = $("#orderFromDate");
    var selectedDate =  $("#orderFromDate").val();
    me.datepicker({
      showOn: 'focus',
      changeMonth: true,
      changeYear: true,
      maxDate : 0,
      dateFormat:"dd/mm/yy",
        onSelect: function( selectedDate ) {
            $( "#orderToDate" ).datepicker( "option", "minDate", selectedDate );
        }
    }).focus();
    me.mask('99/99/9999');

}).on('select', '#orderFromDate', function () {
    var me = $("#orderFromDate");
}).on("change", function (e) {

});

$(document).on('click', '#orderToDate', function () { 
    var me = $("#orderToDate");
    me.datepicker({
      showOn: 'focus',
      changeMonth: true,
      changeYear: true,
      dateFormat:"dd/mm/yy",
      minDate:$("#orderFromDate").val(),
      maxDate : 0
    }).focus();
    me.mask('99/99/9999');
}).on('select', '#orderToDate', function () {
    var me = $("#orderToDate");
});

	var $jwType = $('#jwType');
	$.getJSON('/OrderExecution/api/v1/wOrderLOV?page=woList', function(data) {
		
		vendorList = data.payload.vType;
		  
		  var data = [];
		  $.each( vendorList, function( key, value ) {         
		    data.push({ value: value.id, label: value.name});
		  });
		 
		  $(function() {  
		   $("#vendorCode").autocomplete({  
		    
		    source: data,
		    focus: function(event, ui) {
		     
		     event.preventDefault();
		     $(this).val(ui.item.label);
		     
		    },
		    select: function(event, ui) {     
		     event.preventDefault();
		     $(this).val(ui.item.label);     
		     $("#vendorCode-value").val(ui.item.value);     
		    }
		    
		   });
	   
	  });

}); 
	
	$.getJSON('/OrderExecution/api/v1/wOrderLOV?page=workOrder', function(data) {
		WkorderNo = data.payload.workOrderNos;
		var data = [];
		$.each(WkorderNo, function(key, value) {
			data.push({
				value : value.name,
			 label : value.name
			});
		});
		$(function() {
			$("#workOrderNumber").autocomplete({

				source : data,
				focus : function(event, ui) {

					event.preventDefault();
					$(this).val(ui.item.value);
				},
				select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.value);
					$("#workOrderNumber-value").val(ui.item.value);
				}
			});
		});
	});

$("#Search").on("click", function() {
	 var fromDate = $("#orderFromDate").val();
     var toDate = $("#orderToDate").val();
   
     if(fromDate == "" || fromDate == null || toDate == "" || toDate == null ){
  	   $.growl.error({
  		   message : "Please Select From and To Date !!",
  		   duration : 10000,
  		   title : 'Error'
  	   });
  	   return false;
     }
	workOrderListingGrid();
	$("#jqxgrid").show();
	return false;
});	

$("#removeMatIssueDet").on('click', function(){
	window.location.href = "javascript:showContentPage('workOrderListing', 'bodySwitcher')";
});

</script>