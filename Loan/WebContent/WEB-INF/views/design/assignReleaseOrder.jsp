
<script type="text/javascript">
	

	$.getJSON('/OrderExecution/api/v1/wOrderLOV?page=AROrder', function(data) {

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
            includeSelectAllOption: false,
            enableFiltering:false,
            numberDisplayed:1,
            buttonClass: 'col-md-12 form-control text-left'            
      	});
		
		vendors = data.payload.vType;
		
	});

	
</script>

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Assign Vendors & Release Orders
					</h1>
				</div>

				<form class="form-horizontal">
						<div class="row">
							<div class="col-sm-2">
								<label>Store Code </label>
								<input type="text" class="form-control" name="storeCode" placeholder="Store Code" id="storeCodes" />
							</div>
							
							<div class="col-sm-2">
								<label>Order No.</label>
                                <input type="text" class="form-control" name="orderNo" placeholder="Order No." id="orderNo" min="1" maxlength="10"/> 
							</div>
							
							<div class="col-sm-2">
                              <span class="required">*</span>&nbsp; <label>Order Type</label>
                                <div id="orderTypeCon"></div>                                                          
                           	</div>
                           	
                           	<div class="col-sm-2">
                                 <label>Vendor</label>                                
                                 <div id="vendorsCon"></div>      
                             </div>

						</div>


						<div class="row">
							
							
							<div class="col-sm-2">
								<label>Segment </label> 
								<div id="segmentsCon"></div>
							</div>

							<div class="col-sm-2">
								<label>Order Kind </label> 
								<div id="orderKindsCon"></div>
							</div>
						</div>

						<div class="clearfix">&nbsp;</div>

						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="Search" id="Search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							<button id="removeAllRelease" class="btn btn-warning voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
							<button class="btn btn-primary btn-sm voffset" type="button" name="Save"
								id="Save">
								<i class="fa fa-floppy-o"></i> Save
							</button>
						</div>
				</form>
				
			
					
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>	
<script type="text/javascript" src="resource/oe/assets/js/app/design.js"></script>
<script>
$("#removeAllRelease").on('click', function(){
	$('#vendorsObj').multiselect("clearSelection");
	$('#segmentsObj').multiselect("clearSelection");
	$('#orderKindsObj').multiselect("clearSelection");
	$('#orderTypesObj').multiselect("clearSelection");
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
	updates = new Object();
});
</script>