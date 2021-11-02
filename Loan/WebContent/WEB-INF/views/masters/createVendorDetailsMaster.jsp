<!-- 
	##	Author UI : Ajay Prasad
	## 	Author JAVA : Ajay Prasad
	## 	Date Creation : 27/05/2016
	##  Modified By : Raksha
	##  Modified Date : 06/09/2017
 -->
<!-- Create Vendor Details Master Modal Pop-up Started ##########################  -->
<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
		<i class="fa fa-plus"></i> &nbsp; Create Vendor
		Master
	</h3>
</div>
<!-- Modal Create Vendor Details Master Body Started -->
<div class="modal-body">
	<div class="col-md-12 melting-table">
		<form action="#" method="post" name="createVendor" id="createVendor">
			<div class="tabmelting row">
				<div class="panel with-nav-tabs panel-primary">
					<div class="panel-heading">
						<ul class="nav nav-tabs">
							<li id="vendorProfile" class="active"><a data-toggle="tab"
								href="#createtabprimary"><i class="fa fa-user fa-lg"></i>&nbsp;
									Vendor Profile</a></li>
							<li id="updationDetails"><a data-toggle="tab"
								href="#tab6primary"><i class="fa fa-filter fa-lg"></i>&nbsp;Updation
									Details</a></li>
							<li id="taxDetailsC"><a data-toggle="tab"
								href="#taxDetails"><i class="fa fa-filter fa-lg"></i>&nbsp;Tax
									Details</a></li>
						</ul>
					</div>
					<div class="panel-body panel-body-fixed-height">
						<div class="tab-content">
							<!--  Tab 1 Started  -->
							<div id="createtabprimary" class="tab-pane fade in active">
								<div class="heading-block">
									<h4>Vendor Profile</h4>
								</div>
								<div class="row">
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Code</label> <input  type="text"
											class="form-control" placeholder="Vendor Code" id="vCode"
											name="vCode">
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Name</label> <input type="text"
											class="form-control" placeholder="Vendor Name"
											id="vendorName" name="vendorName">
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Type</label> <select  id="vendorType" name="vendorType"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Address 1.</label> <input type="text"
											class="form-control" placeholder="Address 1." id="address1"
											name="address1">
									</div>
									
								</div>
								<div class="row">
									
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Address 2.</label> <input type="text"
											class="form-control" placeholder="Address 2." id="address2"
											name="address2" data-validation="required">
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Address 3.</label> <input type="text"
											class="form-control" placeholder="Address 3." id="address3"
											name="address3" >
									</div>
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Country</label> <select  id="vCountry"
											class="form-control" name="vCountry">
											<option value="" selected label="Select" />
										</select>
									</div>
									
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor State</label> <select  id="vState"
											class="form-control" name="vState">
											<option value="" selected label="Select" />
										</select>
									</div>
								</div>
								
								<div class="row">
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor City</label> <select  id="vCity" name="vCity"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor City PIN Code</label> <input  type="text"
											 class="form-control"
											placeholder="Vendor City PIN Code" id="vendorPin"
											name="vendorPin">
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Contact person-1</label> <input type="text"
											class="form-control" placeholder="Vendor Contact person-1"  
											id="vendorContact1" name="vendorContact1">
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Contact person-1 Mobile</label> <input
											type="text" class="form-control"  data-validation="custom"
											placeholder="Vendor Contact person-1 Mobile"
											id="vendorContact1Mob" name="vendorContact1Mob">
									</div>
								</div>
								<div class="row">
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Contact person-2</label> <input type="text"  
											class="form-control" placeholder="Vendor Contact person-2"
											id="vendorContact2" name="vendorContact2">
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Contact person-2 Mobile</label> <input
											type="text" class="form-control"
											placeholder="Vendor Contact person-1"  id="vendorContact2Mob"
											name="vendorContact2Mob">
									</div>

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Telephone Number - Land Line</label> <input
											type="text" class="form-control"
											placeholder="Vendor Telephone Number - Land Line"
											id="vendorContactLanline" name="vendorContactLanline">
									</div>
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Email id-1</label> <input  type="email"
											class="form-control" placeholder="Vendor Email id-1"
											id="vendorEmail1" name="vendorEmail1">
									</div>
								</div>
								<div class="row">								

									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Email id-2</label> <input  type="email"
											class="form-control" placeholder="Vendor Email id-2"
											id="vendorEmail2" name="vendorEmail2">
									</div>
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Email id-3</label> <input  type="email"
											class="form-control" placeholder="Vendor Email id-3"
											id="vendorEmail3" name="vendorEmail3">
									</div>
								
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Block Y/N</label> <select id="vendorBlock"
											disabled class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
									<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">*</span><label>Vendor Internal Y/N</label>
										  <select id="isInternalC"  class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
								</div>
							</div>
							
							<div id="tab6primary" class="tab-pane fade">
								<div class="heading-block">
									<h4>Updation Details</h4>
								</div>
								<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Created on</label> <input type="text"
										class="form-control" value="" id="vendorCreated" disabled
										name="vendorCreated" >
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span><label>Vendor Start Date</label>

									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											id="vendorStartDate" placeholder=" DD/MM/YYYY" name="vendorStartDate"> <label
											for="vendorStartDate" class="input-group-addon cursor"><span
											class="fa fa-calendar" ></span></label>
									</div>
								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Updated on</label> <input type="text"
										class="form-control" value="" id="vendorUpdated" disabled
										name="vendorUpdated">
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Updated by</label> <input type="text"
										class="form-control" value="" id="vendorUpdatedBy" disabled
										name="vendorUpdatedBy">
								</div>
								</div>
								<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span><label>Vendor Agreement Uploaded Y/N</label><select
										id="vendorAgreementUploaded" class="form-control" name="vendorAgreementUploaded" >
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Last Agreement Uploaded on</label> <input
										type="text" class="form-control" value="" id="vendorLastAgre"
										disabled name="vendorLastAgre">
								</div>

								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Last Agreement Uploaded by</label> <input
										type="text" class="form-control" value=""
										id="vendorAgrreUploaded" disabled name="vendorAgrreUploaded">
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="uploadImage">
									<label>Upload Agreement</label> 
										<div class="btn btn-primary btn-sm col-sm-6" style="padding:5px">
											<i class="fa fa-plus-circle fa-lg"></i> Browse 
											<input id='uploadImgC1' style="width:100px;" class="fileUpload btn btn-primary input-sm" type="file" name="uploadImgC1"/>
										</div>
			                            <input type="hidden" id = "vendorId" name = "vendorId"/>
				                  </div>
				                  </div>
				                  <div class="row">
					                   <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="viewHrefId">
				                               <label  style="display: block;max-width: 100%;margin-bottom: 8px;font-weight: 700;">View Agreement</label> 
											   <a target="_blank" id="viewHrefId2" type="button" style="margin:0px;padding: 7px 14px;background-color:#149078;color:white;">
											   <i class="fa fa-eye fa-sm"></i> View</a>
										</div>
				                  </div>
							</div>
							<!--  Tax Details Started  -->
							<div id="taxDetails" class="tab-pane fade">
								<div class="heading-block">
									<h4>Tax Details</h4>
								</div>
								<div class="row">
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Is Vendor Registered</label>
									 <select id="isVendRegisteredC" name="isVendRegisteredC" class="form-control">
										<option value="" label="--Select--" />
										<option value="Yes">Yes</option>
										<option value="No">No</option></select>
								</div>	
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>PAN Number</label> <input type="text"
										class="form-control" value="" id="panNumberC" 
										name="panNumberC" >
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Is FAS Tax</label>
									 <select id="isFASTaxC" name="isFASTaxC" class="form-control">
										<option value="" label="--Select--" />
										<option value="Yes">Yes</option>
										<option value="No">No</option></select>
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<br />
									<label style="color:#FF0000; font-size: 8pt; font-weight: bold;">For FAS use only.</label>
								</div>	
								</div>
								<div class="row">
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>TAN Number</label> <input type="text"
										class="form-control" value="" id="tanNumberC" 
										name="tanNumberC" >
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<label>TAN Date</label><div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="tanDateC" id="tanDateC" placeholder="DD/MM/YYYY">
											<label for="tanDateC" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div> 
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>GSTIN No</label> <input type="text"
										class="form-control" value="" id="gstnNoC" 
										name="gstnNoC" >
								</div>
								<input type="hidden" class="form-control" value="" id="sourceStateIdC" name="sourceStateIdC" >
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Source State</label> 
									<input type="text" class="form-control" value="" id="sourceStateC" name="sourceStateC" disabled >
								</div>
								</div>
								<div class="clearfix">&nbsp;</div>

					         <div class="row">
							<div class="row voffset2" align="center">
									<button class="btn btn-primary btn-sm voffset" type="button" name="addToGrid" id="addToGrid">
										<i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Add to Grid
									</button>
									<button id="clear" class="btn btn-warning btn-sm voffset" type="button">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
									</button>
							</div>		
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridT"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
							</div>
						</div>
					</div>
				</div>
				</div>
		</form>
	</div>
</div>
<div class="clearfix">&nbsp;</div>
<!-- Modal Create Vendor Details Master Body Ended -->
<div class="modal-footer  text-center">
	<button class="btn btn-primary btn-sm voffset" type="button" name="save"
		id="save">
		<i class="fa fa-plus"></i> Create
	</button>

	&nbsp;
	<button type="text" class="btn btn-warning btn-sm" data-dismiss="modal">
		<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
	</button>
</div>

<!-- Create Vendor Details Master Modal Pop-up Ended ##########################  -->

<!-- Edit FG Article Master Modal Pop-up Started ##########################  -->
<script src="resource/oe/assets/js/app/vendorDetailsMaster.js"></script>
<script type="text/javascript">
	taxComputationGrid();
/* $.validate({
	  showErrorDialogs : false, // only used by toggleDisabled module
	    onError : function() { },
	    onSuccess: function($form) {
	        if( !$.formUtils.haltValidation ) {
	          
	            $form.find('input[type="submit"]').unbind('click');
	        }
	        return false;
	    }
	});  */


	var $vendorType = $('#vendorType');
	var $vCity = $('#vCity');
	var $vendorBlock = $('#vendorBlock');
	var $Internal = $('#isInternalC');
	var $vendorAgreementUploaded = $('#vendorAgreementUploaded');
	var lastUploadedOn ;
	var lastUpdatedBy;
	$.getJSON('/OrderExecution/api/v1/vendorMasterLOV?page=create', function(data) {
		lastUploadedOn = data.payload.agreementUploadedDate;
		
		lastUpdatedBy = data.payload.agreementUploadedBy;
		//iterate over the data and append a select option
		$.each(data.payload.vType, function(key, val) {
			$vendorType.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});
		
		$.each(data.payload.vBlocked, function(key, val) {
			$vendorBlock.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});
		$.each(data.payload.vInternal, function(key, val) {
			$Internal.append('<option value="' + val.id + '">' + val.name
					+ '</option>');
		});
		$.each(data.payload.vAgreementUploaded, function(key, val) {
			$vendorAgreementUploaded.append('<option value="' + val.id + '">'
					+ val.name + '</option>');
		});
		$vendorType[0].selectedIndex = 1;
		$vendorBlock[0].selectedIndex = 1;
		$Internal[0].selectedIndex = 1;
		$vendorAgreementUploaded[0].selectedIndex = 1;
		$("#vendorCreated").val(data.payload.createdDate);
		$("#vendorUpdated").val(data.payload.lastChangedDate);
		$("#vendorUpdatedBy").val(data.payload.lastChangedBy);
		$("#vendorLastAgre").val(" ");
		$("#vendorAgrreUploaded").val(" ");
	});
	
$("#uploadImage").hide();
$("#viewHrefId").hide()
$("#vendorAgreementUploaded").on('change',function(){
	if($("#vendorAgreementUploaded").val() == 'Yes'){
		$("#uploadImage").show();
		$("#viewHrefId").show();
		$("#vendorLastAgre").val(lastUploadedOn);
		$("#vendorAgrreUploaded").val(lastUpdatedBy);
	}else{
		$("#vendorLastAgre").val("");
		$("#vendorAgrreUploaded").val("");
		$("#uploadImage").hide();
		$("#viewHrefId").hide()
	}
});

$.getJSON('/OrderExecution/api/v1/getAddressLOV?type=country', function(data) {
	$('#vCountry').empty().append('<option value="" selected>--Select--</option>');
	$.each(data.payload.dto, function(key, val) {
		$('#vCountry').append('<option value="' + val.id + '">' + val.description + '</option>');
	});
});
	
$("#vCountry").on("change",function() {
	$.getJSON('/OrderExecution/api/v1/getAddressLOV?type=state'+'&id='+$("#vCountry").val(), function(data) {
		$('#vState').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.dto, function(key, val) {
			$('#vState').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});
});

$("#vState").on("change",function() {
	$.getJSON('/OrderExecution/api/v1/getAddressLOV?type=city'+'&id='+$("#vState").val(), function(data) {
		$('#vCity').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.dto, function(key, val) {
			$('#vCity').append('<option value="' + val.id + '">' + val.description + '</option>');
		});
	});
});

function processFileUpload(formId)
  {
	  $.ajax({
            url : "/OrderExecution/vendorAgreementUpload",
        data : new FormData(document.getElementById(formId)),
        type : "post",
        enctype: 'multipart/form-data',
        processData: false, 
        contentType:false,
        success : function(result) {
			$.growl.notice({ message: "Successfully Uploaded Image For vendor Agreement", duration: 8000, title: 'Success'});	
        },
        error : function(result){
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Saving vendor Agreement Image !' });
        }
      });
  }


$("#save").on("click",function() {
	var createVendorMasterDet =  prepareVendorMasterPostData();
		if (createVendorMasterValidation()) {
			if(createFlagC == true){
				postJSON('/OrderExecution/api/v1/vendorMaster/create',JSON.stringify(createVendorMasterDet),function(data) {
					if (1 == data.resCode) {
						var  lab1 =  $('#vendorId').val(data.payload.id);
						processFileUpload("createVendor");
						$('#vendorMasterModal').modal('hide');
						vendorDetailsMaster();
						$("#jqxgrid").jqxGrid("updatebounddata");
							$.growl.notice({
								message : "Successfully created Vendor with code: "+ data.payload.code,
								duration : 10000,
								title : 'Success'
							});
					}else{
						 $.growl.error({
							message : data.mesgStr,
							duration : 10000
						});
					 }
				 });
			}
	 } 
});

$("#uploadImgC1").change(function(){
    if (this.files && this.files[0]) {
        $("#viewHrefId2").attr('href',URL.createObjectURL(this.files[0]));
    }
});
$("#viewHrefId2").on("click",function(){
	var uploadImgC1 =  $("#uploadImgC1").val();
	if(uploadImgC1 == "" || uploadImgC1 == null){
		$.growl.error({ message:"Please  Upload the file to view the vendor Agreement!!", duration: 10000 });
	}
});
</script>

<script src="resource/oe/assets/js/app/taxComputation.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>