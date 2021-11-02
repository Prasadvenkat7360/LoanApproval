<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : Krishna
	## 	Date Creation : 09/05/2016
 -->
<script type="text/javascript">
	$("#Search").on('click', function() {
		issueForMeltingGrid();
		$("#jqxgrid").show();
		return false;
	});
</script>

<div class="main-container">
	<div class="container">
		
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Issue For Melting Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i>&nbsp; Melting Lot Details
					</h1>
				</div>
				<!-- Issue For Melting Heading Add Ended -->
			</div>
		</div>
		
		<div class="col-md-9">
		<div class="tabmelting row">
			<div class="panel with-nav-tabs panel-primary">
                <div class="panel-heading">
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#tab1primary" data-toggle="tab"><i class="fa fa-gavel fa-lg"></i> Melting</a></li>
                        <li><a href="#tab2primary" data-toggle="tab"><i class="fa fa-user fa-lg"></i> Assayer</a></li>
                        <li><a href="#tab3primary" data-toggle="tab"><i class="fa fa-filter fa-lg"></i>  Refining</a></li>                            
                    </ul>
                </div>
                <div class="panel-body panel-body-fixed-height">
                    <div class="tab-content">
                        <div class="tab-pane fade in active" id="tab1primary">
								<div class="heading-block">
									<h4>Issue to Melting</h4>									
								</div>
								<div class="narrow text-center">
									<div class="resposive-table-data narrow text-center">
									<table class="table table-bordered table-hover">
										<thead>
											<th>Date</th>
											<th>GIV/TV No.</th>
											<th>Vendor Type</th>
											<th>Vendor Code</th>
											<th>From Location</th>
											<th>Ref No.</th>
											<th>Ref Sl.No.</th>
											<th>Iss.Gross Wt</th>
											<th>Iss.Net Wt</th>
											<th>Exp.Purity %</th>
											<th>Exp.Pure Wt.</th>
											<th>To Location</th>
											<th>Remarks</th>
											<th>Action</th>
										</thead>
										<tr id="0">
											<td></td>
											<td></td>
											<td>Internal/External</td>
											<td>amb</td>
											<td>OJA</td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td align="center"><i style="cursor: pointer;"
												class="fa fa-trash-o fa-lg fa-print"></i></td>
										</tr>
									</table>

								</div>
								</div>
								<div class="heading-block">
									<h4>Receive From Melting</h4>
									<div class="table-heading-block-action">
										<button type="button" class="btn btn-primary btn-sm"
											id="generate" name="generate">
											<i class="fa fa-plus fa-lg"></i>&nbsp;Add
										</button>
									</div>
								</div>
								<div class="narrow text-center">
									<div class="resposive-table-data">
								<table class="table table-bordered table-hover"
									id="dynamicTable1">
									<thead>
										<th>Date</th>
										<th>GRV/TV No.</th>
										<th>Vendor Code</th>
										<th>From Location</th>
										<th>Ref No.</th>
										<th>Ref Sl.No.</th>
										<th>Melting Gross Wt</th>
										<th>Melting Net Wt</th>
										<th>Melted Gross Wt</th>
										<th>Melted Net Wt (MLB)</th>
										<th>Exp.Purity %</th>
										<th>Exp.Pure Wt.</th>
										<th>Spillage Wt (SLL)</th>
										<th>Spillage Pure Wt</th>
										<th>Melting Loss (MLL)</th>
										<th>Remarks</th>
										<th>Auth. by</th>
										<th>Action</th>
									</thead>
									<tr id="0">
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td><input class="form-control input-sm" type="text" id="refNo" /></td>
										<td><input class="form-control input-sm" type="text" id="refSlNo" /></td>
										<td></td>
										<td></td>
										<td><input class="form-control input-sm" type="text" id="grossWt" /></td>
										<td><input class="form-control input-sm" type="text" id="netWt" /></td>
										<td><input class="form-control input-sm" type="text" id="expectedPurity" /></td>
										<td></td>
										<td><input class="form-control input-sm" type="text" id="spillageWt" /></td>
										<td></td>
										<td><input class="form-control input-sm" type="text" id="meltingLoss" /></td>
										<td><textarea class="form-control input-sm" row="1"	col="25" id="remarks"></textarea></td>
										<td><input class="form-control input-sm" type="text" id="authBy" /></td>
										<td align="center">
											<i style="cursor: pointer;"	class="fa fa-trash-o fa-lg remove"></i>&nbsp;
											<i style="cursor: pointer;"	class="fa fa-print fa-lg"></i>
										</td>
									</tr>
								</table>



								<table class="table table-bordered table-hover samplerow"
									style="display: none; height: 50px; overflow-y: auto;">
									<tbody>
										<tr>
											<td></td>
											<td></td>
											<td></td>
											<td></td>
											<td><input class="form-control input-sm" type="text" id="refNo" /></td>
											<td><input class="form-control input-sm" type="text" id="refSlNo" /></td>
											<td></td>
											<td></td>
											<td><input class="form-control input-sm" type="text" id="grossWt" /></td>
											<td><input class="form-control input-sm" type="text" id="netWt" /></td>
											<td><input class="form-control input-sm" type="text" id="expectedPurity" /></td>
											<td></td>
											<td><input class="form-control input-sm" type="text" id="spillageWt" /></td>
											<td></td>
											<td><input class="form-control input-sm" type="text" id="meltingLoss" /></td>
											<td><textarea class="form-control input-sm" row="1"	col="25" id="remarks"></textarea></td>
											<td><input class="form-control input-sm" type="text" id="authBy" /></td>
											<td align="center">
												<i style="cursor: pointer;"	class="fa fa-trash-o fa-lg remove"></i>&nbsp;
												<i style="cursor: pointer;"	class="fa fa-print fa-lg"></i>
											</td>
										</tr>
									</tbody>
								</table>
								</div>
								</div>
								<div class="clearfix">&nbsp;</div>
						</div>
                        <div class="tab-pane fade" id="tab2primary">
							<h4 class="heading-block">Issue to Assayer</h4>
								<p class="narrow text-center">Content..</p>
								<h4 class="heading-block">Receipt from Assayer</h4>
								<p class="narrow text-center">Content..</p>
						</div>
                        <div class="tab-pane fade" id="tab3primary">
							<h4 class="heading-block">Issue to Refiner</h4>
								<p class="narrow text-center">Content..</p>
								<h4 class="heading-block">Receipt from Refiner</h4>
								<p class="narrow text-center">Content..</p>
						</div>
                    </div>
                </div>
            </div>
		</div>
		</div>
		<div class="col-md-3">
			<div style="margin-left:5px;" class="row well">	
				<table class="table-hover" style="width:100%;">
					<tbody>
						<tr>
							<td width="60%"><label>Melting Lot No.</label></td>
							<td width="5%">:</td>
							<td width="35%">123</td>
						</tr>
						
						<tr>
							<td><label>Metal Segment</label></td>
							<td>:</td>
							<td>Gold</td>
						</tr>
						
						<tr>
							<td><label>Lot Status</label></td>
							<td>:</td>
							<td>Status</td>
						</tr>
						<tr>
							<td><label>Initial Issue Weight</label></td>
							<td>:</td>
							<td>12.000 </td>
						</tr>
						
						<tr>
							<td><label>Skin Purity</label></td>
							<td>:</td>
							<td></td>
						</tr>
						<tr>
							<td><label>Melting Purity</label></td>
							<td>:</td>
							<td></td>
						</tr>
						<tr>
							<td><label>MLB Weight</label></td>
							<td>:</td>
							<td>22.000 </td>
						</tr>
						<tr>
							<td><label>Standard MAP</label></td>
							<td>:</td>
							<td></td>
						</tr>
						<tr>
							<td><label>Assayer Purity</label></td>
							<td>:</td>
							<td></td>
						</tr>
						<tr>
							<td><label>Assayer Cerificate#</label></td>
							<td>:</td>
							<td></td>
						</tr>
						<tr>
							<td><label>Cumulative Refiner Weight </label></td>
							<td>:</td>
							<td>25.000</td>
						</tr>
						<tr>
							<td><label>Issue to Melting Date</label></td>
							<td>:</td>
							<td>12/05/2016 </td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<!-- Receipt from Refiner Modal  -->
<script src="resource/oe/assets/js/app/issueForMelting.js"></script>
<script type="text/javascript">
$(function(){
	$('a[title]').tooltip();
	});

$("#itaDate").datepicker({
	changeMonth : true,
	changeYear : true,
	maxDate: 0,
	dateFormat : "dd/mm/yy"
});  
$("#itaDate").mask("99/99/9999");
</script>
