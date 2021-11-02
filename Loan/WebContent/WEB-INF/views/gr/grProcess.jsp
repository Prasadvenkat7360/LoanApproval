<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<div class="main-container">
	<div class="container">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1 id ="grHeDrId"><i class="fa fa-desktop"></i> &nbsp; IGR Process </h1>
					<h1 id ="grHeDrId1"><i class="fa fa-desktop"></i> &nbsp; Create IGR </h1>
				</div>
				
				<div id="createGrFgForm1">
					<form class="form-horizontal" id="grFgForm1">
						<div class="mobile-responsive">
							<div id="top" class="in">
								<div class="row">
									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<span class="required">*</span><label>Vendor</label> 
										<input id="vendorCode" class="form-control" type="text" placeholder="Vendor Name" autofocus> 
										<input id="vendorCode-value" type="hidden" name="code">
									</div>
									
									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
										<span class="required">*</span><label>Status :</label> 
										<select	id="ocStatus" class="form-control">
											<option value="o">Open</option>
											<option value="c">Close</option>
										</select>
									</div>
									
									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
										<span class="required">*</span><label>GRV No.</label> 
										<select	id="mrvId" class="form-control" disabled></select>
									</div>
									
									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
										<span class="required">*</span><label>GRV Srl No.</label>
										<input type="number" class="form-control" placeholder="GRV Srl No" name="mrvSrlNo" id="mrvSrlNo" disabled>
									</div>
									
									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<div class="clearfix">&nbsp;</div>
										<button class="btn btn-primary voffset" type="button" name="Search" id="searchGRFG"><i class="fa fa-search fa-lg"></i> Search</button>
										&nbsp;
										<button id="clearGR" class="btn btn-warning voffset" type="button"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
									</div>
								</div>
							</div>

							<div id="middle" style="display: none;">
								<div class="heading-block" id="accDetails"><h5><i class="fa fa-desktop" data-toggle="collapse"></i> Header	Details:</h5></div>
								<table class="table table-bordered table-condensed"	style="width: 100%;" id="grHeader">
									<thead><tr></tr></thead>
									<tbody id="grBody"></tbody>
								</table>
								
								<div class="row " align="center">
									<button class="btn btn-primary voffset" type="button" id="saveGrCount" ><i class="fa fa-floppy-o"></i> Save/Edit IGR Count</button>
									&nbsp;
									<button class="btn btn-primary voffset" type="button" id="grCreate">  Create IGR</button>
								</div>
							</div>
							
							<div id="grDetails" style="display: none;">
								<div class="heading-block" id="accDetails"><h5><i class="fa fa-desktop" data-toggle="collapse"></i> IGR	Details:</h5></div>

								<div style="position: relative; z-index: 1" id="grDetailsgr" class="in"><div id="grProcessGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
								
								<div class="modal fade" id="grComputetally"
									data-keyboard="false" data-backdrop="static" tabindex="-1"
									role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
									style="padding-top: 2%;">
									<div class="modal-dialog modal-lg">
										<div class="modal-content"></div>
									</div>
								</div>

								<div class="modal fade" id="grAnalysis" data-keyboard="false"
									data-backdrop="static" tabindex="-1" role="dialog"
									aria-labelledby="myModalLabel" aria-hidden="true"
									style="padding-top: 2%;">
									<div class="modal-dialog modal-lg">
										<div class="modal-content"></div>
									</div>
								</div>

								<div class="row voffset2" align="center">
									<button class="btn btn-primary voffset" type="button" data-toggle="modal" data-target="#grtallyModal" id="compute" disabled>
										<i class="fa fa-floppy-o"></i> IGR to Bill Tally
									</button>
									&nbsp;

									<button class="btn btn-primary voffset" type="button"
										id="grMetalAccount" disabled>
										<i class="fa fa-file fa-lg"></i> Metal Accounting
									</button>
									&nbsp;
									
									<button class="btn btn-primary voffset" type="button" data-toggle="modal" data-target="#grCompleteMRVProcessModal" id="grCompleteMRVProcess" disabled>
										<i class="fa fa-floppy-o"></i> Complete GRV Process
									</button>
								</div>

							</div>
						</div>
					</form>
				</div>
				
		        <div id="createGrFgForm">
					<div class="row">
					<!-- 	<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<label>GR No.</label>
							<input type="text" class="form-control input-sm" placeholder="GR No" name="grNo" id="grNo" disabled>
						</div> -->

						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<span class="required">*</span><label>Vendor</label> 
							<input id="vendorCodeC" class="form-control input-sm" type="text" disabled>
							<input id="vendorCode-valueC" type="hidden" name="code">	
							<input type="hidden" class="form-control"	name="skinPurityRate" id="skinPurityRate" disabled>	
							
							<input type="hidden" class="form-control"	name="skinPurity" id="skinPurity" disabled>
							<input type="hidden" class="form-control"	name="metalSegment" id="metalSegment" disabled>
							<input type="hidden" class="form-control"	name="meltingPurity" id="meltingPurity" disabled>
							<input type="hidden" name="metalSegmentId" id="metalSegmentId">
						</div>
						
						
						
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<span class="required">*</span><label>GRV No.</label> 					
							<input type="number" class="form-control input-sm" name="mrvIdC" id="mrvIdC"  disabled>
							<input type="hidden" class="form-control input-sm" name="skinPurityC" id="skinPurityC"  disabled>
							
							<input type="hidden" class="form-control" name="mrvSrlNoC" id="mrvSrlNoC"  disabled>
							<input type="hidden" class="form-control"	name="vendorBillNO" id="vendorBillNO" disabled>						
						</div>
						
						
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<span class="required">*</span> <label>99.9 Pure Rate</label> 
							<input type="text" class="form-control input-sm"	name="pureRate" id="pureRate" disabled> 
							<input type="hidden" class="form-control input-sm"	name="pureRateFlag" id="pureRateFlag">
							
						</div>							
						
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<label>Consignment period </label> 
							<input type="text" class="form-control input-sm"	name="grcPeriod" id="grcPeriod" disabled>
							<input type="hidden" class="form-control"	name="jwTypee" id="jwTypee">
						</div>
						
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
							<label class="col-md-12">Metal Rate Attachment</label> 
						<form:form method="POST" action="grHeaderImageSubmit" enctype="multipart/form-data" id="uploadForm">
								<div class="col-md-8">
								 <div class="input-group">
									<span class="input-group-btn">
										<span class="btn btn-primary btn-file">Browse<input type="file" name="uploadGrImg" id="uploadGrImg"></span></span>
						            	<input type="text" class="form-control" readonly>
						            	
					            </div>
					            
					            </div>
					            <div class="col-md-3"><img class="hide" alt="GR Image" id="img-upload" style="width:50%; height: 50%; max-width:300px"></div><div class="col-md-1"><i id="uploadZoom" data-toggle="modal" data-target="#img-uploadanchor" class="fa fa-search plus"></i></div>
						         <input type="hidden"  id = "mrvIdx" name = "mrvIdx"/>
	                            <input type="hidden"  id = "mrvSrl" name = "mrvSrl"/>
	                            <input type="hidden"  id = "vendorId" name = "vendorId"/>
	                            <input type="hidden" id = "grHeaderId" name = "grHeaderId"/>
								<!-- <span class="btnForFile">Browse</span>
	                            -->
                           </form:form>
                           </div>
					</div>
					<%-- <div class="row">
						<div class="col-md-12 form-field">
							<form id="testValueForm" action="javascript:void(0)">
							<table>
								<tr>
									<th class="text-left" style="font-size: 11px;">(1)Is_Pair </th>
									<th class="text-left" style="font-size: 11px;">(2)Metal value</th>
									<th class="text-left" style="font-size: 11px;">(3)Wastage Charge Type</th>
									<th class="text-left" style="font-size: 11px;">(4)Wastage Charge</th>
									<th class="text-left" style="font-size: 11px;">(5)MC Charge Type </th>
									<th class="text-left" style="font-size: 11px;">(6)Making Charge</th>
									<th class="text-left" style="font-size: 11px;">(7)Total Line Cost</th>
								</tr>
								<tr>
									<td style="padding-right: 10px;"><input type="text" id="v_is_pair" name="v_is_pair"  disabled class="form-control input-sm"/> </td>
									<td style="padding-right: 10px;"><input type="text" id="v_metal_value" name="v_metal_value" disabled  class="form-control input-sm" /></td>
									<td style="padding-right: 10px;"><input type="text" id="v_wastage_charge_type" name="v_wastage_charge_type" disabled  class="form-control input-sm" /></td>
									<td style="padding-right: 10px;"><input type="text" id="vv_cost_wastage_wt" name="vv_cost_wastage_wt" disabled class="form-control input-sm" /></td>
									<td style="padding-right: 10px;"><input type="text" id="v_mc_charge_type" name="v_mc_charge_type" disabled  class="form-control input-sm" /></td>
									<td style="padding-right: 10px;"><input type="text" id="vv_cost_mc" name="vv_cost_mc" disabled  class="form-control input-sm" /></td>
									<td style="padding-right: 10px;"><input type="text" id="pureMetalRateId" name="pureMetalRateId" disabled  class="form-control input-sm" /></td>
								</tr>
								<tr>
									<th class="text-left" style="font-size: 11px;">(8)Metal Rate For Purity</th>
									<th class="text-left" style="font-size: 11px;">(9)Incremental Value</th>
									<th class="text-left" style="font-size: 11px;">(10)PrevMUP(From-To-MUP%)</th>
									<th class="text-left" style="font-size: 11px;">(11)CurrMUP(From-To-MUP%)</th>
									<th class="text-left" style="font-size: 11px;">(12)Value_1</th>
									<th class="text-left" style="font-size: 11px;">(13)Value_2</th>
									<th class="text-left" style="font-size: 11px;">(14)Value_3 (val_1 + val_2)</th>
								</tr>
								<tr>
									<td style="padding-right: 10px;"><input type="text" id="v_metal_rate_for_purity" name="v_metal_rate_for_purity"  class="form-control input-sm" disabled ></td>
									<td style="padding-right: 10px;"><input type="text" id="v_incremental_val" name="v_incremental_val" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="mup_previous_record" name="mup_previous_record" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="mup_current_record" name="mup_current_record" disabled  class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="value_1" name="value_1" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="value_2" name="value_2" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="value_3" name="value_3" disabled class="form-control input-sm" ></td>
								</tr>
								<tr>
									<th class="text-left" style="font-size: 11px;">(15)Apportion Value_1 </th>
									<th class="text-left" style="font-size: 11px;">(16)Apportion Value_1</th>
									<th class="text-left" style="font-size: 11px;">(17)AppVal1_Markup(PrevMUP)</th>
									<th class="text-left" style="font-size: 11px;">(18)AppVal2_Markup(CurrMUP)</th>
									<th class="text-left" style="font-size: 11px;">(19)Total Markup Value</th>
									<th class="text-left" style="font-size: 11px;">(20)TotalCostPrice(Markup)</th>
									<th class="text-left" style="font-size: 11px;">(21)SellingMetalRateForPurity</th>
								</tr>
								<tr>
									<td style="padding-right: 10px;"><input type="text" id="app_value_1" name="app_value_1" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="app_value_2" name="app_value_2" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="app_value_markup_1" name="app_value_markup_1" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="app_value_markup_2" name="app_value_markup_2" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="total_markup_val" name="total_markup_val" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="value_4" name="value_4" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="v_sell_metal_rate_for_purity" name="v_sell_metal_rate_for_purity" disabled class="form-control input-sm" ></td>	
								</tr>
								<tr>
									<th class="text-left" style="font-size: 11px;">(22)MetalValueForSelling</th>
									<th class="text-left" style="font-size: 11px;">(23)Diff Cost & Selling Metal</th>
									<th class="text-left" style="font-size: 11px;">(24)MC Apportion</th>
									<th class="text-left" style="font-size: 11px;">(25)Wastage Apportion</th>
									<th class="text-left" style="font-size: 11px;">(26)Wastage Value</th>
									<th class="text-left" style="font-size: 11px;">(27)Selling Price</th>
								</tr>
								<tr>
									<td style="padding-right: 10px;"><input type="text" id="value_5" name="value_5" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="value_6" name="value_6" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="v_mc_apportion_percent" name="v_mc_apportion_percent" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="v_wastage_apportion_percent" name="v_wastage_apportion_percent" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="sellingWastage" name="sellingWastage" disabled class="form-control input-sm" ></td>
									<td style="padding-right: 10px;"><input type="text" id="v_selling_price" name="v_selling_price" disabled class="form-control input-sm" ></td>
								</tr>
							</table>
							</form>
						</div>
					</div> --%>
					     
			        <div  id="grDetailsId" style="position: relative; z-index: 1; display: none">
						<div id="grDetailsGrid"></div>
						<br/>
					    <div id="stoneDetailsGrid"></div>
						<br/>
					    <div id="accDetailsGrid"></div>
				   	</div>
					<!-- <div class="heading-block" id="grDetailsId" style="display: none">
						<h5>
							<b><i class="fa fa-desktop" data-toggle="collapse" data-target="#grDetailsgr"></i> GR Details:</b>
						</h5>
						<div class="pull-right margin-top-25">
						    <div class="col-md-3"><input type="text" class="form-control input-sm" style="width:50px; height: 22px; text-align:center; margin-top: 5px;" name="copyGrDetInput" id="copyGrDetInput"></div>							    
						    <div class="col-md-3"><button id="copyGrDetRow" disabled style=" margin-top: 5px;" class="btn btn-primary btn-sm" type="button"><i class="fa fa-files-o fa-lg"></i></button></div>							    
						    <div class="col-md-3"> <button id="addRowGr" style="margin-top:5px;" class="btn btn-primary btn-sm" type="button"><i class="fa fa-plus-circle fa-lg"></i></button></div>							    
						    <div class="col-md-3"><button disabled id="uploadExl" style="margin-top:5px;" class="btn btn-primary btn-sm" type="button"><i class="fa fa-upload fa-lg"></i></button></div>
						</div>
					</div> -->
						
					<!-- <div style="position: relative; z-index: 1" id="grDetailsgr"  class="in">
						<div id="grDetailGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
					</div> -->
					
					
					<!-- <div class="clearfix">&nbsp;</div>
					<div class="heading-block" id="stoneDetails">
						<h5><i class="fa fa-desktop" data-toggle="collapse" data-target="#stoneDetailsgr"></i> Stone Details:</h5>
                          	<div class="pull-right">                            		
                           		<button id="addStone" class="btn btn-primary btn-sm pull-right margin-top-25" type="button"><i class="fa fa-plus-circle fa-lg"></i></button>
						</div>
					</div>
						
					<div style="position: relative; z-index: 1" id="stoneDetailsgr"  class="in">
						<div id="grStoneDetailGrid" style="font-size: 12px; font-family: Verdana; float: left;"></div>						
						<input id="grDetailsSrl" type="hidden" name="grDetailsSrl">	
					</div>
						
					<div class="clearfix">&nbsp;</div>
						
					<div class="heading-block" id="accDetails">
						<h5>
							<i class="fa fa-desktop" data-toggle="collapse" data-target="#accDetailsgr"></i> Accessory Details:
						</h5>
						<div class="pull-right">                            		
                            		<button id="addAccessory" class="btn btn-primary btn-sm pull-right margin-top-25" type="button"><i class="fa fa-plus-circle fa-lg"></i></button>
							</div>							
					</div>
						
					<div style="position: relative; z-index: 1" id="accDetailsgr"  class="in">
						<div id="grAccDetailGrid" style="font-size: 12px; font-family: Verdana; float: left;"></div>
						<input id="grDetailsSrl" type="hidden" name="grDetailsSrl">
					</div>		 -->			
					
					<div class="row voffset2" align="center">
						<button class="btn btn-primary voffset" type="button" name="saveGRFGNew"  id="saveGRFGNew"><i class="fa fa-floppy-o"></i> Save	</button>
						&nbsp;
						<button id="clearGRS" class="btn btn-warning voffset" type="button"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>							
						&nbsp; 
						<a href="javascript:showContentPage('grProcess', 'bodySwitcher')" class="btn btn-primary voffset" type="button" id="grListing"><i class="fa fa-list"></i>&nbsp;IGR Process</a>
					</div>
				</div>
			</div>
		</div>
	</div>	
</div>


<div class="modal fade" id="grCompleteMRVProcessModal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="reset" id="closeCompute" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; IGR Complete GRV Process
				</h3>
			</div>

			<div class="modal-body">
				<div class="mobile-responsive">
					<div class="container row">
						<table class="table table-bordered table-condensed" style="width: 100%;" id="grHeader">
							<thead>
								<tr>
									<td>&nbsp;</td>
									<td>GRV</td>
									<td>IGR</td>
									<td>Difference (GRV - IGR)</td>	
								</tr>
							</thead>
							<tbody id="grBody">
								<tr>
									<td>Gross Wt</td>
									<td><input type="text" id="mrvGrsWt" name="mrvGrsWt" disabled class="form-control input-sm"></td>
									<td><input type="text" id="grGrsWt" name="grGrsWt" disabled class="form-control input-sm"></td>
									<td><input type="text" id="diffGrsWt" name="diffGrsWt" disabled class="form-control input-sm"></td>
								</tr>
								<tr>
									<td>Net Wt</td>
									<td><input type="text" id="mrvNetWt" name="mrvNetWt" disabled class="form-control input-sm"></td>
									<td><input type="text" id="grNetWt" name="grNetWt" disabled class="form-control input-sm"></td>
									<td><input type="text" id="diffNetWt" name="diffNetWt" disabled class="form-control input-sm"></td>	
								</tr>
								<tr>
									<td>Pure Wt</td>
									<td><input type="text" id="mrvPureWt" name="mrvPureWt" disabled class="form-control input-sm"></td>
									<td><input type="text" id="grPureWt" name="grPureWt" disabled class="form-control input-sm"></td>
									<td><input type="text" id="diffPureWt" name="diffPureWt" disabled class="form-control input-sm"></td>	
								</tr>
							</tbody>
						</table>
						<div id="remarks" name="remarks"></div>
					</div>				
				</div>
			</div>

			<div class="modal-footer text-center">
				<button class="btn btn-primary voffset" type="button" id="grProceed"><i class="fa fa-file fa-lg"></i> Proceed</button>
				&nbsp;
				<button type="button" class="btn btn-warning" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
			</div>
		</div>	
	</div>
</div>

<div class="modal fade" id="grtallyModal" data-keyboard="false"	data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width: 90%;">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-list"></i> &nbsp; IGR to Bill Tally
				</h3>
				<div class="clearfix"></div>
			</div>
			
			<div class="col-md-12 mobile-responsive">
				<div class="clearfix">&nbsp;</div>
				<form class="form-horizontal" id="" action="">
					<div class="container">						
				  		<div class="panel panel-default">
					    	<div class="panel-heading">
					     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle1">GRV Details</a></h4>				      
					    	</div>
							<div id="panel1"  class="panel-collapse collapse">
								<div class="panel-body"><div id="mainMrvDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div></div>
						   	</div>
					 	</div>
	
					 	<div class="panel panel-default" id="mivDetSection">
					    	<div class="panel-heading">
					      		<h4 class="panel-title"><a class="accordion-toggle" id="toggle2">Difference Between GRV and IGR-GIV Details</a></h4>				      
					    	</div>
							<div id="panel2"  class="panel-collapse collapse">
								<div class="panel-body"><div id="mivDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div></div>
						   	</div>
					  	</div>
					  	
					  	<div class="panel panel-default" id="mrvDetSection">
					    	<div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" id="toggle3">Difference Between GRV and IGR-GRV Details</a></h4></div>
							<div id="panel3"  class="panel-collapse collapse">
								<div class="panel-body"><div id="mrvDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div></div>
						   	</div>
					  	</div>
					  	
					  	<div class="panel panel-default" id="adjDetSection">
					    	<div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" id="toggle4">Adjustment Details</a></h4></div>
							<div id="panel4"  class="panel-collapse collapse">
								<div class="panel-body"><div id="adjDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div></div>
						   	</div>
					  	</div>
					  		
					  		 
				  		<div class="panel panel-default" id="fgDetSection">
					    	<div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" id="toggle5">FG Details</a></h4></div>
							<div id="panel5"  class="panel-collapse collapse">
								<div class="panel-body"><div id="fgDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div></div>
						   	</div>
					  	</div>			
					  	
					  	<div class="panel panel-default" id="stoneDetSection">
					    	<div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" id="toggle6">Stone Details</a></h4></div>
							<div id="panel6"  class="panel-collapse collapse">
								<div class="panel-body"><div id="stoneDetails" style="font-size: 13px; font-family: Verdana; position: relative;"></div></div>
						   	</div>
					  	</div>			  
					</div>
				</form>
			</div>

			<div class="clearfix">&nbsp;</div>

			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-warning" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Close</button>
				&nbsp;
				<button name="printGRBT" id="printGRBT" type="button" class="btn btn-primary voffset"><i class="fa fa-print fa-lg"></i>&nbsp; Print</button>
			</div>
		</div>
	</div>
	
</div>

<div id='Menu' style="display: none">
	<ul>
		<li>Delete Row</li>
	</ul>
</div>

<!-- This is for the article code pop up -->
<div class="modal fade" id="articleSearch" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<div class="modal fade" id="stoneSearch" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<div class="modal fade" id="accSearch" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<div class="modal fade" id="attributeSearch" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<div class="modal fade" id="certDetails" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
	<button type="reset" id="closeSearch" class="close"	data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
		<i class="fa fa-pencil-square-o"></i> &nbsp; Cert Reqd for Used Stones : 
	</h3>
	<div class="pull-right" style="margin-top: -30px; margin-right: 30px;">
		<select name="suppBy" id="suppBy" class="form-control selecter">
			<option value="Yes">Yes</option>
			<option value="No">No</option>
		</select>
	</div>
</div>
<!-- Modal Body -->
<div class="modal-body">
	<div class="container">
		<form class="form-horizontal" autocomplete="off" role="form" name="certDetailsForm" id="certDetailsForm" onsubmit="return false;">
			<div class="modal-body">
				
				<div class="row">
					<div class="col-md-12">
						<table id="myTableId" class="table table-bordered table-hover">
							<thead>
								<tr>
									<th>Stone Srl. No.</th>
									<th>Certificate Lab Number</th>
									<th>Stone Wt.</th>
									<th width="5%">Is Used</th>
									<th width="5%">Is Return</th>
								</tr>
							</thead>
							
							<tbody id="certDetailsSec"></tbody>
						</table>
						
					</div>
				</div>
			</div>
			<div class="modal-footer text-center">
				<button type="submit" id="selectStone" class="btn btn-primary"
					data-dismiss="modal">
					<i class="fa fa-check fa-lg"></i>&nbsp;Select
				</button>
				<button type="button" id="clear" class="btn btn-warning"  data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</form>
	</div>
	<!-- Modal Window Form End -->
</div>
		</div>
	</div>
</div>

<div class="modal fade" id="confirm" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 10%;">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
			<div class="modal-body text-left"> Selected Cost Type data not available for this Vendor/Article.<br> Click "<b>OK</b>" to delete the record <b>OR</b> click "<b>Cancel</b>" to select other valid Cost Type.</div>
		  	<div class="modal-footer">
		    	<button type="button" data-dismiss="modal" class="btn btn-primary" id="okProceed">Yes</button>
		    	<button type="button" data-dismiss="modal" class="btn" id="cancel">No</button>
		  	</div>
        </div>
    </div>
</div>

<div class="modal fade" id="designViewGR" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        	<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Design View</h3>				
			</div>
			<div class="modal-body" align="center" id="content">
				<div id="page-content"> </div>
		            <div class="text-center">
		            <ul id="pagination-demo" class="pagination-sm sync-pagination"></ul>
		            </div>
			</div>
			    
        </div>
    </div>
</div> 

<!--################################## Accessory Details Form #################################################  -->

<div class="modal fade" id="addAccDet" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Add Accessory</h3>
			</div>

			<form class="form-horizontal" id="addAccDetails" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="col-md-4">
						<div class="row">
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Acc. Supp By</label>
								<select id="accSupBy" name="accSupBy" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>

							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Acc. Main Cat </label>
								<select	id="accMainCat" name="accMainCat" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Acc. Sub Cat</label>
								<select	id="accSubCat" name="accSubCat" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							
							<div class="col-md-12 form-field">
								<label>Acc. Article Code</label>
								<input type="text" id="accArticleCode" name="accArticleCode" placeholder="Stone Article Code" disabled class="form-control" />
								<input type="hidden" id="accArticleId" name="accArticleId" placeholder="Stone Article Code" disabled class="form-control" />
							</div>

							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>UOM</label>
								<input type="text" id="uomAcc" name="uomAcc" placeholder="UOM" value="Pcs" class="form-control" disabled />
							</div>
						</div>
					</div>

					<div class="col-md-4">
						<div class="row">
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Acc. Rate</label>
								<select id="accRate" name="accRate" class="form-control"><option value="" selected label="--Select--" /></select> 
								<input type="hidden" id="rateList" />
							</div>

							<div class="col-md-12 form-field" id="jwAccPcsSection">
								<label>JW Acc. Pieces</label>
								<input type="text" id="jwAccPcs" name="jwAccPcs" onblur="jwRateCal();" placeholder="JW Acc. Pieces" class="form-control" />
							</div>

							<div class="col-md-12 form-field" id="jwAccWtSection">
								<span class="required">* </span> <label>JW Acc. Weight</label> 
								<input type="text" id="jwAccWt" name="jwAccWt" placeholder="JW Acc. Weight" class="form-control" />
							</div>

							<div class="col-md-12 form-field" id="jwAccPriceSection">
								<span class="required">* </span> <label>JW Acc. Price</label> 
								<input type="text" id="jwAccPrice" name="jwAccPrice" disabled placeholder="JW Acc. Price" class="form-control" />
							</div>
						</div>
					</div>

					<div class="col-md-4">
						<div class="row">
							<div class="col-md-12 form-field" id="compAccPcsSection">
								<label>Company Acc. Pieces</label> 
								<input type="text" id="compAccPcs" name="compAccPcs" onblur="compRateCal();" placeholder="Company Acc. Pieces" class="form-control" />
							</div>

							<div class="col-md-12 form-field" id="compAccWtSection">
								<label>Company Acc. Weight</label> 
								<input type="text" id="compAccWt" name="compAccWt" placeholder="Company Acc. Weight" disabled class="form-control" />
							</div>

							<div class="col-md-12 form-field" id="compAccPriceSection">
								<label>Company Acc. Price</label> 
								<input type="text" id="compAccPrice" name="compAccPrice" disabled placeholder="Comp Acc Price" disabled class="form-control" />
							</div>

							<div class="col-md-12 form-field" id="accConditionSection">
								<label>Acc. Condition</label> 
								<input type="text" id="accCondition" name="accCondition" placeholder="Acc. Condition" class="form-control" />
							</div>
						</div>
					</div>
				</div>

				<div class="clearfix">&nbsp;</div>

				<div class="modal-footer  text-center">
					<button class="btn btn-primary voffset" type="submit" name="saveAccDet" id="saveAccDet"><i class="fa fa-plus fa-lg"></i> &nbsp;Add</button>
					<button type="submit" class="btn btn-warning" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
				</div>
			</form>
		</div>
	</div>
</div>


<div class="modal fade" id="btnViewGr" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content"></div>
    </div>
</div> 

<!--##################################  View Earlier Used Wt Modal Stone #################################################  -->

<div class="modal fade" id="viewEarlierUsedWt" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">

	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Stone View Earlier Used Weight
				</h3>
			</div>
			<form class="form-horizontal" id="stoneUsedWtForm"	action="javascript:void(0);">
				<div class="row">
					<div class="col-md-6">
						<div class="col-md-12 form-field">
							<label>Order No : </label>
							<input type="text" id="orderNo" name="orderNo" placeholder="Order No." class="form-control" disabled />
						</div>
						
						<div class="col-md-12 form-field">
							<label>Stone Sr No</label>
							<input type="text" id="stoneSlNo" name="stoneSlNo" placeholder="Stone Sr No" class="form-control" disabled />
						</div>
						
						<div class="col-md-12 form-field">
							<label>Earlier Used Pcs</label>
							<input type="text" id="earlierUsedPcs" name="earlierUsedPcs" placeholder="Earlier Used Pcs" class="form-control" disabled />
						</div>
						
						<div class="col-md-12 form-field">
							<label>Earlier Bulk Pcs</label>
							<input type="text" id="stoneBulkPcs" name="stoneBulkPcs" placeholder="Earlier Used Pcs" class="form-control" disabled />
						</div>
						
						<div class="col-md-12 form-field">
							<label>Selling Price</label>
							<input type="text" id="sellingPrice" name="sellingPrice" placeholder="Selling Price" class="form-control" disabled />
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12 form-field">
							<label>Sr No.</label>
							<input type="text" id="serialNo" name="serialNo" placeholder="Sr No" class="form-control" disabled />
						</div>
						
						<div class="col-md-12 form-field">
							<label>Earlier Used Wt</label>
							<input type="text" id="earlierUsedWt" name="earlierUsedWt" placeholder="Earlier Used Wt" class="form-control" disabled />
						</div>
						
						<div class="col-md-12 form-field">
							<label>Earlier Bulk Wt</label>
							<input type="text" id="stoneBulkWt" name="stoneBulkWt" placeholder="Earlier Used Wt" class="form-control" disabled />
						</div>
						
						<div class="col-md-12 form-field">
							<label>Cost Price</label>
							<input type="text" id="costPrice" name="costPrice" placeholder="Cost Price" class="form-control" disabled />
						</div>
					</div>
					
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">				
				<button type="button" class="btn btn-warning" data-dismiss="modal">	<i class="fa fa-times fa-lg"></i>&nbsp; Close</button>
			</div>
		</div>
	</div>
</div>

<!--##################################  View Earlier Used Wt Modal Acc #################################################  -->

<div class="modal fade" id="viewEarlierUsedWtAcc" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">

	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Acc View Earlier Used Weight
				</h3>
			</div>
			<form class="form-horizontal" id="accUsedWtForm"	action="javascript:void(0);">
				<div class="row">
					<div class="col-md-6">
						<div class="col-md-12 form-field">
							<label>Order No : </label>
							<input type="text" id="orderNoAcc" name="orderNoAcc" placeholder="Order No." class="form-control" disabled />
						</div>
						
						<div class="col-md-12 form-field">
							<label>Stone Sr No</label>
							<input type="text" id="stoneSlNoAcc" name="stoneSlNoAcc" placeholder="Stone Sr No" class="form-control" disabled />
						</div>
						
						<div class="col-md-12 form-field">
							<label>Earlier Used Pcs</label>
							<input type="text" id="earlierUsedPcsAcc" name="earlierUsedPcsAcc" placeholder="Earlier Used Pcs" class="form-control" disabled />
						</div>
						
						<div class="col-md-12 form-field">
							<label>Selling Price</label>
							<input type="text" id="sellingPriceAcc" name="sellingPriceAcc" placeholder="Selling Price" class="form-control" disabled />
						</div>
					</div>
					<div class="col-md-6">
						<div class="col-md-12 form-field">
							<label>Sr No.</label>
							<input type="text" id="serialNoAcc" name="serialNoAcc" placeholder="Sr No" class="form-control" disabled />
						</div>
						
						<div class="col-md-12 form-field">
							<label>Earlier Used Wt</label>
							<input type="text" id="earlierUsedWtAcc" name="earlierUsedWtAcc" placeholder="Earlier Used Wt" class="form-control" disabled />
						</div>
						
						<div class="col-md-12 form-field">
							<label>Cost Price</label>
							<input type="text" id="costPriceAcc" name="costPriceAcc" placeholder="Cost Price" class="form-control" disabled />
						</div>
					</div>
					
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">				
				<button type="button" class="btn btn-warning" data-dismiss="modal">	<i class="fa fa-times fa-lg"></i>&nbsp; Close</button>
			</div>
		</div>
	</div>
</div>
<!-- <script>
$(".btnForFile").bind("click",function(){
	$("#uploadGrImg").click();
});
</script> -->
<div class="modal" id="img-uploadanchor" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">
  
  <div class="sectionImg">			
		<img class="modal-content" id="img01">					
	</div>
	<!--  Modal Window Content Ended -->
	<div class="clearfix">&nbsp;</div>
	<!-- Modal Create Company Master  Footer -->
	<div class="row  text-center">				
		<button type="button" class="btn btn-warning" data-dismiss="modal">	<i class="fa fa-times fa-lg"></i>&nbsp; Close</button>
	</div>
</div>
<style>
.btn-file {
    position: relative;
    overflow: hidden;
}
.btn-file input[type=file] {
    position: absolute;
    top: 3%;
    right: 5%;
    min-height: 60px;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
}

/* IMAGE ZOOM CSS */
/* 
#myImg {
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

#myImg:hover {opacity: 0.7;}

/* The Modal (background) */


@-webkit-keyframes zoom {
  from {-webkit-transform:scale(0)} 
  to {-webkit-transform:scale(1)}
}

@keyframes zoom {
  from {transform:scale(0)} 
  to {transform:scale(1)}
}
.sectionImg{
	background: transparent;
	background-image: transparent;
	text-align: center;
    margin-top: 5%;
}
/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px){
  .modal-content {
    width: 100%;
  }
} */
</style>

<script type="text/javascript" src='resource/oe/assets/js/app/grProcessOnLoad.js'></script>
<script type="text/javascript" src='resource/oe/assets/js/app/grfgcreate.js'></script>
<script type="text/javascript" src='resource/oe/assets/js/app/grProcess.js'></script>
<script type="text/javascript" src="resource/oe/assets/js/app/grTally.js"></script>
<script>
// Get the modal
var modal = document.getElementById('img-uploadanchor');
var img = document.getElementById('img-upload');
var uploadZoom = document.getElementById('uploadZoom');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var captionText = document.getElementById("close");
uploadZoom.onclick = function(){
  modal.style.display = "block";
  modalImg.src = img.src;
}
</script>