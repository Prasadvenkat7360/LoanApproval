<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> PSR Number Listing
					</h1>
				</div>

				<form class="form-horizontal">
						<div class="row">
						    <div class="col-sm-2">
								<label>From Date </label>
								<div class="input-group">
									<input type="text"  readonly = 'true'  class="date-picker form-control dateBackground"
										id="orderFromDate" placeholder="DD/MM/YYYY"> <label
										for="orderFromDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
							   </div>
							</div>

							<div class="col-sm-2">
								<label>To Date </label>
								<div class="input-group">
									<input type="text"  readonly = 'true'  class="date-picker form-control dateBackground"
										id="orderToDate" placeholder="DD/MM/YYYY"> <label
										for="orderToDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
							</div>
							</div>
							<div class="col-sm-2">
								<label>Store Code </label>
								<input type="number" class="form-control" name="storeCode" placeholder="Store Code" id="storeCodes" />
							</div>
							
							<div class="col-sm-2">
								<label>Order No.</label>
                                <input type="number" class="form-control" name="orderNo" placeholder="Order No." id="orderNo" /> 
							</div>
							
									    
                           	<div class="col-sm-2">
                               <label>Order Type</label>
                                <div id="orderTypeCon"></div>                                                          
                           	</div>	
                           	
                           	<div class="col-sm-2">
                                 <label>Vendor</label>                                
                                 <div id="vendorsCon"></div>      
                             </div>	</div>
                             <div class="row">				
							<div class="col-sm-2">
								<label>Segment </label> 
								<div id="segmentsCon"></div>
							</div>

							<div class="col-sm-2">
								<label>Order Kind </label> 
								<div id="orderKindsCon"></div>
							</div>
							<div class="col-sm-2">
							<label>PSR No.</label> <input type="number" id="psrNumber" class="form-control" placeholder="PSR No." />									
						</div>
						</div>
						
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="Search" id="Search"><i class="fa fa-search fa-lg"></i> Search</button>
							&nbsp;<button id="removeAllPsrNos" class="btn btn-warning  btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>						
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
	$.getJSON('/OrderExecution/api/v1/wOrderLOV?page=psr', function(data) {

		//iterate over the data and append a select option
		
		var v = '<select id="vendorsObj" class="form-control" multiple="multiple">';   
		$.each(data.payload.vType, function(key, val) {
			v +='<option value="' + val.id + '">' + val.name + '</option>';
		});
		v +='</select>'; 
		$("#vendorsCon").html(v);
		$('#vendorsObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});
		
		
		var seg = '<select id="segmentsObj" class="form-control" multiple="multiple">';   
		$.each(data.payload.sTypes, function(key, val) {
			seg +='<option value="' + val.id + '">' + val.description + '</option>';
		});
		seg +='</select>'; 
		$("#segmentsCon").html(seg);
		$('#segmentsObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});
		
		var okind = '<select id="orderKindsObj" class="form-control" multiple="multiple">';   
		$.each(data.payload.oKind, function(key, val) {
			okind +='<option value="' + val.id + '">' + val.name + '</option>';
		});
		okind +='</select>'; 
		$("#orderKindsCon").html(okind);
		$('#orderKindsObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,         
            maxHeight:250,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'
      	});
				
		
		var ot = '<select id="orderTypesObj" class="form-control" multiple="multiple">';   
		$.each(data.payload.orderTypes, function(key, val) {
			ot +='<option value="' + val.id + '">' + val.name + '</option>';
		});
		ot +='</select>'; 
		$("#orderTypeCon").html(ot);
		$('#orderTypesObj').multiselect({ 
            includeSelectAllOption: true,
            enableFiltering:false,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'            
      	});
		
		vendors = data.payload.vType;
		
	});
	
	$("#Search").on("click", function() {	
		psrNumberListingGrid();
		$("#jqxgrid").show();		
		return false;
	});	

$("#removeAllPsrNos").on('click', function(){
	$('#vendorsObj').multiselect("clearSelection");
	$('#segmentsObj').multiselect("clearSelection");
	$('#orderKindsObj').multiselect("clearSelection");
	$('#orderTypesObj').multiselect("clearSelection");
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	updates = new Object();
});
</script>

<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>