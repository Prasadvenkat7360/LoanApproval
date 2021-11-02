<!-- 
	##	Author UI : Ajay Prasad hsnCode1
	## 	Author JAVA : Ajay Prasad
	## 	Date Creation : 27/05/2016
 -->

<!-- Create FG Article Master Modal Pop-up Started ##########################  -->
<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
		<i class="fa fa-plus"></i> &nbsp; Create Article
	</h3>
</div>
<!-- Modal Create FG Article Master Body -->
<div class="modal-body">
	<div class="container sentParcel-Edit">
		<form action="#" method="post" name="createArticle" id="createArticle">
			<!-- First Row Started -->
			<div class="row">

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Segment</label> <select
						id="sTypes1" class="form-control">
						<option value="" selected label="Select" />
					</select>
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Jewel Type </label> <select
						id="jewelType1" class="form-control">
						<option value="" selected label="Select" />
					</select>
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Main Category</label> <select
						id="mainCatList1" class="form-control">
						<option value="" selected label="Select" />
					</select>
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span><label>Sub Category</label> <select
						id="sCategory1" class="form-control">
						<option value="" selected label="Select" />
					</select>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Article Code</label> <input type="text" disabled
						class="form-control" placeholder="Article Code" id="articleCode1">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Article Description</label> <input type="text" disabled
						class="form-control" placeholder="Article Description"
						id="articleDesc1">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Article Flag</label> <select
						id="articleFlag1" class="form-control">
						<option value="" selected label="Select" />
					</select>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Order Unit</label> <select
						id="orderUnit" class="form-control">
						<option value="" selected label="Select" />
					</select>
				</div>

			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>MUP Category</label> <select
						id="mupCategory" class="form-control">
						<option value="" selected label="Select" />
					</select>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Min. Wt.</label> <input type="number" class="form-control"
						placeholder="Min Weight" id="minWt" name="minWt" min="0.001"
						max="99999999.999" />
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Max. Wt.</label> <input type="number" class="form-control"
						placeholder="Max Weight" value="" id="maxWt" name="maxWt"
						min="0.001" max="99999999.999">
				</div>
			</div>

			<div class="row">

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Active Y/N</label> 
					<select
						id="activeYN" class="form-control" disabled >
						<option value="" selected label="Select" />
					</select>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Shelf Life</label> <input type="number" class="form-control"
						placeholder="Shelf Life" id="shelfLife" name="shelfLife" min="0.01" max="99999999.99">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Actual Shelf Life</label> <input type="number"
						class="form-control" placeholder="Actual Shelf Life"
						id="actualShelfLife" name="actualShelfLife" min="0.01" max="99999999.99">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span><label>HSN Code</label> <select id="hsnCodeC"  name = "hsnCodeC"class="form-control">
						<option value="" selected label="Select" /></select>
				</div>
			</div>

		</form>
		<!-- Modal Window Edit FG Article Master Form End -->
	</div>

</div>
<!-- Modal Edit FG Article Master Footer -->
<div class="modal-footer  text-center">
	<button class="btn btn-primary btn-sm voffset " type="button" name="save"
		id="save">
		<i class="fa fa-plus"></i> &nbsp;Create
	</button>
	&nbsp;
	<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
		<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
	</button>
</div>
<!-- Create FG Article Master Modal Pop-up Ended ##########################  -->

<!-- Edit FG Article Master Modal Pop-up Started ##########################  -->
<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>	
<script type="text/javascript">
var $sTypes1 = $('#sTypes1');
var $mainCatList1 = $('#mainCatList1');
var $orderUnit = $('#orderUnit');
var $activeYN = $('#activeYN');
var $articleFlag1 = $('#articleFlag1');
var $mupCategory = $('#mupCategory');
var segmentId1 = -1;
	var loadOnloadApi = function(){
  	$sTypes1.empty().append('<option value="" selected>--Select--</option>');
  	$orderUnit.empty().append('<option value="" selected>--Select--</option>');
  	$activeYN.empty().append('<option value="" selected>--Select--</option>');
  	$articleFlag1.empty().append('<option value="" selected>--Select--</option>');
  	
	$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?page=create&criteria=sTypes&id='
					+ segmentId1, function(data) {

				//iterate over the data and append a select option
				$.each(data.payload.sTypes, function(key, val) {
					$sTypes1.append('<option value="' + val.id + '">'
							+ val.description + '</option>');
				});
				$.each(data.payload.orderUnit, function(key, val) {
					$orderUnit.append('<option value="' + val.id + '">'
							+ val.name + '</option>');
				});
				$.each(data.payload.activeYN, function(key, val) {
					$activeYN.append('<option value="' + val.id + '">'
							+ val.name + '</option>');
				});
				$.each(data.payload.articleFlag, function(key, val) {
					$articleFlag1.append('<option value="' + val.id + '">'
							+ val.name + '</option>');
				});
				$articleFlag1[0].selectedIndex = 1;
				$activeYN[0].selectedIndex = 2;
				$orderUnit[0].selectedIndex = 1;
			});
	}
	
	loadOnloadApi();
	
	$("#articleMasterCreate").on('click', function(){
		loadOnloadApi();	
	});
	
	$("#sTypes1").on("change",function() {
		
		var segmentId1 = $('#sTypes1').val();
		var $jewelType1 = $('#jewelType1');
		
		$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?criteria=hsnCodeList&id='+ segmentId1, function(data) {
			  $('#hsnCodeC').empty().append('<option value="" selected>--Select--</option>');
				$.each(data.payload.hsnCodeList, function(key, val) {
					var response = val.code+"-"+val.description;
				$('#hsnCodeC').append('<option value="' + val.id + '">' + response + '</option>');
			});
		});
		$.getJSON('/OrderExecution/api/v1/getMupcategoryLOV?segment='+ segmentId1, function(data) {
			$("#mupCategory").empty().append('<option value="" selected>Select</option>');
			$.each(data.payload.muptype, function(key, val) {
				$("#mupCategory").append('<option value="' + val.id + '">'+ val.description + '</option>');
			});
		});
		if (segmentId1 != "") {
			$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?criteria=jewelType&id='+segmentId1,function(data) {
					$jewelType1.empty().append('<option value="" selected>Select</option>');
					$.each(data.payload.jewelType,function(key,val) {
						$jewelType1.append('<option value="' + val.id + '">'+ val.description + '</option>');
					});
				});
		} else {
			$jewelType1.empty().append('<option value="" selected>Select</option>');
		}
	});
	
	$("#jewelType1").on("change",function() {
			var segmentId = $('#sTypes1').val();
			var jewelType = $('#jewelType1').val();
			if (segmentId != "") {
				$.getJSON('/OrderExecution/api/v1/fgArticleMasterLOV?criteria=mCategory&id='+ segmentId + '&jwTypeId='+ jewelType,function(data) {
						$mainCatList1.empty().append('<option value="" selected>Select</option>');
							//iterate over the data and append a select option
							$.each(data.payload.mainCatList,function(key,val) {
								$mainCatList1.append('<option value="' + val.id + '">'+ val.description	+ '</option>');
					     	});
					   });
			} else {
				$mainCatList1.empty().append('<option value="" selected>Select</option>');
			}
			$('#sCategory1').empty().append('<option value="" selected>Select</option>');
	});

	$("#mainCatList1")
			.on(
					"change",
					function() {
						var mainCatList1 = $('#mainCatList1').val();
						var $sCategory1 = $('#sCategory1');
						var jewelType1 = $('#jewelType1').val();
						if (mainCatList1 != "") {
							$
									.getJSON(
											'/OrderExecution/api/v1/fgArticleMasterLOV?criteria=sCategory&id='
													+ mainCatList1
													+ '&jwTypeId=' + jewelType1,
											function(data) {
												$sCategory1
														.empty()
														.append(
																'<option value="" selected>Select</option>');
												//iterate over the data and append a select option
												$
														.each(
																data.payload.sCategory,
																function(key,
																		val) {
																	$sCategory1
																			.append('<option value="' + val.id + '">'
																					+ val.description
																					+ '</option>');
																});

											});
						} else {
							$sCategory1
									.empty()
									.append(
											'<option value="" selected>Select</option>');
						}
					});

	$("#sCategory1")
			.on(
					"change",
					function() {
						var segmentId1 = $('#sTypes1').val();
						var jewelType1 = $('#jewelType1').val();
						var mainCatList1 = $('#mainCatList1').val();
						var sCategory1 = $('#sCategory1').val();

						if (sCategory1 != "" && jewelType1 != ""
								&& segmentId1 != "") {
							$
									.getJSON(
											'/OrderExecution/api/v1/fgArticleMasterLOV/create?id='
													+ segmentId1 + '&jw='
													+ jewelType1 + '&cat='
													+ mainCatList1 + '&sub='
													+ sCategory1,
											function(data) {
												if (1 == data.resCode) {
													$("#articleCode1")
															.val(
																	data.payload.articleCode.articleCode);
													$("#articleDesc1")
															.val(
																	data.payload.articleCode.articleDesc);
												} else {
													$.growl.error({
														message : data.mesgStr,
														duration : 10000
													});
												}
											});
						}
					});
	$("#minWt").keypress(function(event) {

		if (event.which == 45) {
			event.preventDefault();
		}
	});

	$("#maxWt").keypress(function(event) {

		if (event.which == 45) {
			event.preventDefault();
		}
	});
	
	 $("#shelfLife").keypress(function(event) {		
			
		  if ( event.which == 45) {			
		      event.preventDefault();
		   }
		});

	$("#actualShelfLife").keypress(function(event) {		
			
		  if ( event.which == 45) {			
		      event.preventDefault();
		   }
		});

$("#save").on("click",function() {
	if($("#hsnCodeC").val() == "" || $("#hsnCodeC").val() == null){
		$.growl.error({
			message : "Please Select HSN Code !!!",
			duration : 1000,
			title : 'Error'
		});
		return false;
	}
	if(parseFloat($("#maxWt").val()) <  parseFloat($("#minWt").val())){
		$.growl.error({
			message : "Max weight Should be greater than or equal to Min weight !!!",
			duration : 1000,
			title : 'Error'
		})
		return false;
	}
		if (createArticleMasterDetailsValidation()) {
			postJSON('/OrderExecution/api/v1/fgArtiicleMasterLOV/create',JSON.stringify(createArticleMasterDetails()),function(data) {
			 if (1 == data.resCode) {
				$('#fgArticleMasterModal').modal('hide');
					fgArticleMasterGrid();
					$("#jqxgrid").jqxGrid("updatebounddata");
						$.growl.notice({
							message : "Successfully created Article with code: "+ data.payload.code,
							duration : 10000,
							title : 'Success'
						});
				} else {
					$.growl.error({
						message : data.mesgStr,
						duration : 10000
					});
				}
			});
	 } else {
			$.growl.error({
						message : "Please fill all the mandatory fields",
						duration : 10000
					});
				}
		});
</script>

