<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script type="text/javascript">


</script>
<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Issue For Melting
				</h3>
			</div>
			<!-- Modal Create Stone Article Master Body -->
			<div class="modal-body">
				<div class="container sentParcel-Edit">							
					<form class="form-horizontal" id="createIssueForMelting">
					<div class="mobile-responsive">
						<div class="row">

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<span class="required">*</span>	<label>Vendor Type</label> <select id="vendorType"
									class="form-control">
									<option value="" selected label="--Select--" />
									<c:forEach var="designer" items="${designerTypes}">
									<option value="${designer.key}" >${designer.value}</option>
    
                                     </c:forEach>
									
								</select>
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<span class="required">*</span><label>Vendor</label> <input id="vendors" type="text" class="form-control"
						placeholder="Vendor"> <input id="vendor-parcel"
						type="hidden" name="code">
							</div>

							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<span class="required">*</span>	<label>Metal Type</label> <select id="segment"
									class="form-control">
									<option value="" selected label="--Select--" />
									<c:forEach var="segement" items="${segment}">	                        

									<option value=" ${segement.id}" >${segement.description}</option>
									</c:forEach>
								</select>
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<span class="required">*</span><label>From Location</label> <select id="fromLocation"
									class="form-control">
									
								</select>
							</div>
						</div>
						<div class="row">							
							
							
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<span class="required">*</span>	<label>To Location</label> <input type="text" 
									class="form-control" placeholder="To Location" name="toLocation"
									id="toLocation">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Ref. No.</label> <input type="number" 
									class="form-control" placeholder="Ref. No."
									id="refNo" min="0" max="9999" >
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Sl. No.</label><input type="number" 
									class="form-control" placeholder="Sl. No."
									id="slNo" min ="0" max="9999" >
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<span class="required">*</span><label>Gross Wt.</label> <input type="number" 
									class="form-control" placeholder="Gross Wt."
									id="grossWt" min="0.001" max="99999999.999" >
							</div>
						</div>
						
						<div class="row">
							
							
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<span class="required">*</span><label>Net. Wt.</label> <input type="number" 
									class="form-control" placeholder="Net. Wt."
									id="netWt" disabled="disabled" min="0.001" max="99999999.999">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<span class="required">*</span>	<label>Exp. Purity %</label> <input type="number" 
									class="form-control" placeholder="expPurity"
									id="expPurity" disabled="disabled" min="0.01" max="99.99">
							</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
							<span class="required">*</span>	<label>Exp. Pure Wt.</label><input type="number" 
									class="form-control" placeholder="Exp. Pure Wt."
									id="expPureWt" disabled="disabled" min="0.001" max="99999999.999">
							</div>
							
						</div>
						<div class="heading-block">&nbsp;</div>
						<div class="row">							
							
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 form-field">
								<label>Remarks</label>
								<textarea id="remarks" class="form-control" name="remarks" rows="1" cols="45"></textarea>
							</div>
						</div>					
					
					</div>
				</form>
				</div>
			</div>
			
			<!-- Modal Edit Stone Article Master Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset" type="button"
					name="save" id="save">
					<i class="fa fa-floppy-o"></i> Save
				</button>						

				&nbsp;
				<button type="submit" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>
			</div>
	
<script type="text/javascript">

var $fromLocation = $('#fromLocation');
var availabledata = [];

$("#vendorType").change(function() {
	
	var value = $("#vendorType option:selected").val();
	
	if(value == "Internal"){
		$('#toLocation').val('');
		$("#vendors").val('');
		$("#vendors").prop('disabled', true);
		$('#toLocation').val('MLT');
		$('#toLocation').prop('disabled', true);
	}
	else{		
		
		if (typeof availabledata === 'undefined' || availabledata.length == 0) {   
		
			
		getJSON(
				'/OrderExecution/api/v1/issueForMeltingLOV?page=vendorTypeLOV',
				function(data) {
					if(1 == data.resCode){
					
		
		vendorList = data.payload.vCodeList;	
		
			
    
			$.each(vendorList, function(key, value) {
				availabledata.push({
					value : value.id,
					label : value.name
				});
			});
					}
					
				});
		} 
		$('#toLocation').val('');
		$('#toLocation').prop('disabled', false);
		$("#vendors").prop('disabled', false);
			$("#vendors").autocomplete({
				source : availabledata,
				focus : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
				},
				select : function(event, ui) {
					event.preventDefault();
					$(this).val(ui.item.label);
					$("#vendor-parcel").val(ui.item.value);
				}

			});
					
		

}
});

</script>
	<script src="resource/oe/assets/js/app/melting.js"></script>