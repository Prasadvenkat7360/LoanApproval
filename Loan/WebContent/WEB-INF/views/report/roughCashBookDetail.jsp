<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat Prasad
	##	Date Creation 	: 	19-12-2019
	## 	Description		:	Statement of Account Report
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Rough Cash Book Report
					</h1>
				</div>
					<form class="form-horizontal" id="roughCashBookForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span><label>Type</label>
									<select id="typeS" name="typeS" class="form-control">
										<option value=""  selected label="Select"></option>
										<option value="RS">RCB- Summary</option>
										<option value="RD">RCB - Detail</option>
										<option value="SS">Summary Sales</option>
									</select>
								</div>
								<div class="col-sm-2" >
									<span class="required">*</span><label>Company Name</label>
									<input type="hidden" id="companyIdS" name="companyIdS" class="form-control" />
									<input type="text" id="companyS" name="companyS" class="form-control" disabled/>
								</div>
		                          <div class="col-sm-2">
									<span class="required">*</span><label>From Date</label><div class="input-group">
										<input type="text" class="date-picker form-control"
											 name="fromDate" id="fromDate" placeholder="DD/MM/YYYY">
												<label for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									    </div>
								 </div>
		                          <div class="col-sm-2">
									<span class="required">*</span><label>To Date</label><div class="input-group">
										<input type="text" class="date-picker form-control" name="toDate" id="toDate" placeholder="DD/MM/YYYY">
										<label for="toDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span><label>Store Name</label> <select id="storeNameS"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2" id="hideCashier">
									<span class="required">*</span><label>Cashier</label> <select id="cashierS"
										class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
						</div>
						
						<!-- Row 1 ended  -->
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							<button id="print" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
							</button>							
						</div>
						<div class="clearfix">&nbsp;</div>
						
						<div id="stockCheckUpdate">
								<div class="panel panel-default">
									<div class="panel-heading">
									   <h4 class="panel-title"><a class="accordion-toggle" id="toggle5"><b>Summary Sales :</b></a></h4>				      
							    	</div>
										<div id="panel5"  class="panel-collapse collapse">
											<div class="panel-body">
												<!-- <h4 id="Dcm"><i class="fa fa-list fa-sm"></i><b>&nbsp;Gold :</b></h4> -->
												<div id="jqxgridG" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
												
												<!-- <h4 id="Dcs"><i class="fa fa-list fa-sm"></i><b>&nbsp;Silver :</b></h4> -->
												<div id="jqxgridS" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
												
												<!-- <h4 id="DcfgAcc"><i class="fa fa-list fa-sm"></i><b>&nbsp;Platinum : </b></h4> -->
												<div id="jqxgridP" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
												
												<!-- <h4 id="DcMetAcc"><i class="fa fa-list fa-sm"></i><b>&nbsp; Diamond :</b></h4> -->
												<div id="jqxgridD" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
												
												<div id="jqxgridT" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
												
											<div class="row" id="totals">
												<div class="col-sm-3">
													<span style="margin-top: 5px; margin-left : 110px; color: #008800; font-weight:800; text-align: right;"><b> Grand Total :</b></span>
												</div>
												
												 <div class="col-sm-2" style="margin-right: 35px;">
													<input type="text" id="grsWtTotal" name="grsWtTotal" class="form-control" style="font-weight:700; color:black;" disabled/>
												 </div>
												 <div class="col-sm-2" style="margin-right: 35px;">
													<input type="text" id="netWtTotal" name="netWtTotal" style="font-weight:700; color:black;" class="form-control" disabled/>
												 </div>
												 <div class="col-sm-2" style="margin-right: 35px;">
													<input type="text" id="diaWtTotal" name="diaWtTotal" style="font-weight:700; color:black;" class="form-control" disabled/>
												 </div>
												 <div class="col-sm-2">
													<input type="text" id="amtTotal" name="amtTotal" style="font-weight:700; color:black;" class="form-control" disabled/>
												 </div>	
									      	</div>
								 	   	</div>
									</div>
							</div>
						</div>
						
						<div id="summarySection">
							<div class="panel panel-default">
									<div class="panel-heading">
									   <h4 class="panel-title"><a class="accordion-toggle" id="toggle6"><b>Summary :</b></a></h4>				      
							    	</div>
										<div id="panel6"  class="panel-collapse collapse">
											<div class="panel-body">
												<!-- <h4 id="Dcm"><i class="fa fa-list fa-sm"></i><b>&nbsp;Gold :</b></h4> -->
												<div id="jqxgridO" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
												<div id="jqxgridR" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   			<div id="jqxgridY" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   			<div id="jqxgridC" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   			
								 	   			<div class="row">
								 	   			<div class="col-md-5"></div>
								 	   				<div class="col-md-7">
								 	   					<div id="jqxgridW" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   				</div>
								 	   			</div>
								 	   			
								 	   			<div class="row">
								 	   			<div class="col-md-5"></div>
								 	   				<div class="col-md-7">
								 	   					<div id="jqxgridL" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   				</div>
								 	   			</div>
								 	   			<div class="row">
								 	   			<div class="col-md-5"></div>
								 	   				<div class="col-md-7">
								 	   					<div id="jqxgridV" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   				</div>
								 	   			</div>
								 	   	</div>
									</div>
							</div>
						</div>
						
						<div id="detailSection">
							<div class="panel panel-default">
									<div class="panel-heading">
									   <h4 class="panel-title"><a class="accordion-toggle" id="toggle7"><b>Rough Cash Book - Detail :</b></a></h4>				      
							    	</div>
										<div id="panel7"  class="panel-collapse collapse">
											<div class="panel-body">
												<!-- <h4 id="Dcm"><i class="fa fa-list fa-sm"></i><b>&nbsp;Gold :</b></h4> -->
												<div id="jqxgrid1" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
											
											<div class="panel panel-default">
												<div class="panel-heading">
												   <h4 class="panel-title"><a class="accordion-toggle" id="toggle1"><b> Receipts :</b></a></h4>				      
										    	</div>
												<div id="panel1"  class="panel-collapse collapse">
													<div class="panel-body">
													
													<div class="panel panel-default">
														<div class="panel-heading">
									 						  <h4 class="panel-title"><a class="accordion-toggle" id="toggleCsb"><b>Cash Sales Bill :</b></a></h4>				      
							    						</div>
														<div id="panelCsb"  class="panel-collapse collapse">
															<div class="panel-body">
																<div id="jqxgrid2" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   						</div>
								 	   					</div>
								 	   				</div>
								 	   				
								 	   				<div class="panel panel-default">
														<div class="panel-heading">
									 						  <h4 class="panel-title"><a class="accordion-toggle" id="toggleRvAdv"><b>Receipt Vouchers - Order Advance :</b></a></h4>				      
							    						</div>
														<div id="panelRvAdv"  class="panel-collapse collapse">
															<div class="panel-body">
																<div id="jqxgrid3" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   						</div>
								 	   					</div>
								 	   				</div>
								 	   				
								 	   				<div class="panel panel-default">
														<div class="panel-heading">
									 						  <h4 class="panel-title"><a class="accordion-toggle" id="toggleRvAB"><b>Receipt Vouchers - Approval Bill Deposit :</b></a></h4>				      
							    						</div>
														<div id="panelRvAB"  class="panel-collapse collapse">
															<div class="panel-body">
																<div id="jqxgrid4" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   						</div>
								 	   					</div>
								 	   				</div>
								 	   				
								 	   				<div class="panel panel-default">
														<div class="panel-heading">
									 						  <h4 class="panel-title"><a class="accordion-toggle" id="toggleRvSP"><b>Receipt Vouchers - Savings Plan :</b></a></h4>				      
							    						</div>
														<div id="panelRvSP"  class="panel-collapse collapse">
															<div class="panel-body">
																<div id="jqxgrid5" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   						</div>
								 	   					</div>
								 	   				</div>
								 	   				
								 	   				<div class="panel panel-default">
														<div class="panel-heading">
									 						  <h4 class="panel-title"><a class="accordion-toggle" id="toggleRvGV"><b>Receipt Vouchers - Pre-Paid Gift Vouchers :</b></a></h4>				      
							    						</div>
														<div id="panelRvGV"  class="panel-collapse collapse">
															<div class="panel-body">
																<div id="jqxgrid6" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   						</div>
								 	   					</div>
								 	   				</div>
								 	   				
								 	   				<div class="panel panel-default">
														<div class="panel-heading">
									 						  <h4 class="panel-title"><a class="accordion-toggle" id="toggleRvPR"><b>Receipt Vouchers - Purchase Return :</b></a></h4>				      
							    						</div>
														<div id="panelRvPR"  class="panel-collapse collapse">
															<div class="panel-body">
																<div id="jqxgrid7" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   						</div>
								 	   					</div>
								 	   				</div>
								 	   				
								 	   				<div class="panel panel-default">
														<div class="panel-heading">
									 						  <h4 class="panel-title"><a class="accordion-toggle" id="toggleRvCT"><b>Receipt Vouchers - Cashier to Cashier Transfer :</b></a></h4>				      
							    						</div>
														<div id="panelRvCT"  class="panel-collapse collapse">
															<div class="panel-body">
																<div id="jqxgrid13" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   						</div>
								 	   					</div>
								 	   				</div>
								 	   					
								 	   					<!-- <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; <b>Receipt Vouchers - Approval Bill Deposit</b></h5>
								 	   					<div id="jqxgrid4" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
													
														<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; <b>Receipt Vouchers - Savings Plan</b></h5>
								 	   					<div id="jqxgrid5" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
													
														<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; <b>Receipt Vouchers - Pre-Paid Gift Vouchers</b></h5>
								 	   					<div id="jqxgrid6" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
													
														<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; <b>Purchase Return</b></h5>
								 	   					<div id="jqxgrid7" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   					
								 	   					<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp; <b>Cashier to Cashier Transfer</b></h5>
								 	   					<div id="jqxgrid13" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div> -->
													</div>
												</div>
											</div>
											
											<div class="panel panel-default">
												<div class="panel-heading">
												   <h4 class="panel-title"><a class="accordion-toggle" id="toggle2"><b> Payments :</b></a></h4>				      
										    	</div>
												<div id="panel2"  class="panel-collapse collapse">
													<div class="panel-body">
														
													<div class="panel panel-default">
														<div class="panel-heading">
									 						  <h4 class="panel-title"><a class="accordion-toggle" id="togglePvPb"><b>Purchase Bill</b></a></h4>				      
							    						</div>
														<div id="panelPvPb"  class="panel-collapse collapse">
															<div class="panel-body">
																<div id="jqxgrid8" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   						</div>
								 	   					</div>
								 	   				</div>
								 	   				
								 	   				<div class="panel panel-default">
														<div class="panel-heading">
									 						  <h4 class="panel-title"><a class="accordion-toggle" id="togglePvAdv"><b>Payment Voucher - Order Advance Refund</b></a></h4>				      
							    						</div>
														<div id="panelPvAdv"  class="panel-collapse collapse">
															<div class="panel-body">
																<div id="jqxgrid9" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   						</div>
								 	   					</div>
								 	   				</div>
								 	   				
								 	   				<div class="panel panel-default">
														<div class="panel-heading">
									 						  <h4 class="panel-title"><a class="accordion-toggle" id="togglePvAb"><b>Payment Voucher - Approval Bill Deposit Refund</b></a></h4>				      
							    						</div>
														<div id="panelPvAb"  class="panel-collapse collapse">
															<div class="panel-body">
																<div id="jqxgrid10" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   						</div>
								 	   					</div>
								 	   				</div>
													
													<div class="panel panel-default">
														<div class="panel-heading">
									 						  <h4 class="panel-title"><a class="accordion-toggle" id="togglePvSr"><b>Sales Return - Cash Bill</b></a></h4>				      
							    						</div>
														<div id="panelPvSr"  class="panel-collapse collapse">
															<div class="panel-body">
																<div id="jqxgrid11" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   						</div>
								 	   					</div>
								 	   				</div>
								 	   					
								 	   				<div class="panel panel-default">
														<div class="panel-heading">
									 						  <h4 class="panel-title"><a class="accordion-toggle" id="togglePvCt"><b>Cashier Transfer Cash Deposit</b></a></h4>				      
							    						</div>
														<div id="panelPvCt"  class="panel-collapse collapse">
															<div class="panel-body">
																<div id="jqxgrid12" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
																
								 	   						</div>
								 	   					</div>
								 	   				</div>
														
													</div>
												</div>
											</div>
											
								 	   		<div class="row">
								 	   			<div class="col-md-5"></div>
								 	   				<div class="col-md-7">
								 	   					<div id="jqxgridA" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
								 	   				</div>
								 	   		</div>
								 	   	</div>
									</div>
							</div>
						</div>
						
				</form>
				
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for search-->
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>



<script src="resource/oe/assets/js/app/roughCashBookDetail.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>