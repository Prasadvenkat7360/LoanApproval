<!-- 
	##	Author1         : 	Dipankar
	## 	Author2 	    :   B.maniprasad
	##	Date Creation 	: 	10-04-2017
	## 	Description		:	Search and export functionality for Open?close Orders.
-->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> &nbsp;Open/Close Order</h1>					
					<form class="form-horizontal" id="openCloseOrder" action="javascript: void(0)">
						<div class="pull-left">
							<label class="radio-inline"><input class="element" type="radio" name="openClose" value="customerOrder"> &nbsp; Customer Order</label> 
							<label class="radio-inline">  <input class="element" type="radio" name="openClose" value="stockOrder"> &nbsp; Stock Order</label> 
							<label class="radio-inline">  <input class="element" type="radio" name="openClose" value="consignmentOrder"> &nbsp; Consignment Order</label> 
						</div>					
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>
				
				<form class="form-horizontal" id="customerOrderSearch" action="javascript: void(0);">
					<div class="mobile-responsive">
					 <div id="messageBox" align="center"></div>
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<label>Order Number</label>
								<input type="text" class="form-control"	placeholder="Order Number" id="orderNumber" name="orderNumber">
							</div>
							
							<div class="col-sm-2">
								<label>Store Name</label> 
								<select id="customerStoreNameS" name="customerStoreNameS" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							
							<div class="col-sm-2">
								<label>DC Name</label> 
								<select id="customerDcNameS" name="customerDcNameS"	class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							
							<div class="col-sm-2">
								<label>Vendor Code</label>
								<input type="text" class="form-control" placeholder="Vendor Code" id="vendorCodeS" name="vendorCodeS">
								<input id="vendorCodeS-value" type="hidden" name="code">
							</div>
							
							<div class="col-sm-2">
								<label>PSR Number</label> 
								<input	type="text" class="form-control" placeholder="PSR Number" id="customerPsrNumber" name="customerPsrNumber">									
							</div> 
							
							<div class="col-sm-2">
								<label>Order Header Status</label>
								<select id="orderHeaderStatus" name="orderHeaderStatus" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
						</div>
						<div class="row">						
							
							<div class="col-sm-2">
								<label>Line Item Status</label>
								<select id="customerLineItemStatusS" name="customerLineItemStatusS"	class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							
							<div class="col-sm-2">
							<label>Order Raised By</label> 
									<select id="customerOrderRaisedS" name="customerOrderRaisedS"	class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>						
							
							<div class="col-sm-2">
								<label>Customer ID</label>
								 <input type="text" class="form-control" placeholder="Customer ID"	id="customerID" name="customerID">									
							</div> 
							
							<div class="col-sm-2">
								<label>Customer Name</label>
								 <input	type="text" class="form-control" placeholder="Customer Name" id="customerName" name="customerName">									
							</div>
							
							<div class="col-sm-2">
								<label>Telephone Number</label>
								<input	type="text" class="form-control" placeholder="Telephone Number"	id="telephoneNumber" name="telephoneNumber">									
							</div>
							
							<div class="col-sm-2">
								<label>Email ID</label> 
							 	<input type="text" class="form-control" placeholder="Email ID"	id="emailId" name="emailId">									
							</div>
							
						</div>
					
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"	name="customerSearch" id="customerSearch"><i class="fa fa-search fa-lg"></i> Search</button>
							<button id="clearCustomer" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>							
						</div>
						<div class="clearfix">&nbsp;</div>
					</div>
				</form>
				   
			 	<div class="panel with-nav-tabs " id="gridTabs">             
					<div class="panel-heading">
						<ul class="nav nav-tabs" id="navTabsCust">
							<li id="home" class="ui-state-default ui-corner-top active ui-tabs-active ui-state-active"><a data-toggle="tab" href="#tab0default" >&nbsp;<i class="fa fa-user fa-lg">&nbsp</i> Home</a></li>
							<li class="tabDisabled" id="orderDetails" ><a data-toggle="tab" href="#tab1default" >Order Det.</a></li>
							<li class="tabDisabled" id="attribureDetails"><a data-toggle="tab" href="#tab2default" >Attr. Det.</a></li>
							<li class="tabDisabled" id="StoneDetails"><a data-toggle="tab" href="#tab3default" >Stone Det.</a></li>
							<li class="tabDisabled" id="accessoryDetails"><a data-toggle="tab" href="#tab4default" >Acc. Det.</a></li>
							<li class="tabDisabled" id="designDetails"><a data-toggle="tab" href="#tab5default" >Design Det.</a></li>
							<li class="tabDisabled" id="CreditDetails"><a data-toggle="tab" href="#tab6default" >Cr. To Account Det.</a></li>
							<li class="tabDisabled" id="ReceiptDetails"><a data-toggle="tab" href="#tab7default" >Receipt Det.</a></li>
							<li class="tabDisabled" id="CertificationDetails"><a data-toggle="tab" href="#tab8default" >Cert. Det.</a></li>
							<li class="tabDisabled" id="itemHistory"><a data-toggle="tab" href="#tab9default" >Item Hist</a></li>					
						</ul>
					</div>
				 	<div class="panel-body" >
                    	<div class="tab-content">
                        	<div class="tab-pane fade ui-tabs-panel active in" id="tab0default">                        
                    			<div class="clearfix">&nbsp;</div>
								<div style="position: relative; z-index: 1"><div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
							</div>
                        	
                        	<div class="tab-pane fade" id="tab1default">
                      			<div style="position: relative; z-index: 1"><div id="jqxgride1"	style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
	                        </div>
                        	
                        	<div class="tab-pane fade" id="tab2default">
                      			<div style="position: relative; z-index: 1"><div id="jqxgride2"	style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
	                        </div>
                        	
                        	<div class="tab-pane fade" id="tab3default">
                        		<div style="position: relative; z-index: 1"><div id="jqxgride3"	style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
	                        </div>
    	
    	                    <div class="tab-pane fade" id="tab4default">
        			           	<div style="position: relative; z-index: 1"><div id="jqxgride4"	style="font-size: 13px; font-family: Verdana; float: left;"></div></div> 
	                        </div>
    
                        	<div class="tab-pane fade" id="tab5default">
                        		<div style="position: relative; z-index: 1"><div id="jqxgride5"	style="font-size: 13px; font-family: Verdana; float: left;"></div></div> 
	                        </div>
                        
                        	<div class="tab-pane fade" id="tab6default">
                         		<div class="panel with-nav-tabs" >
	             					<div class="panel-heading">
										<ul class="nav nav-tabs">
											<li id="credit" class="active"><a data-toggle="tab" href="#tab0CreditRecpt" >&nbsp;<i class="fa fa-user fa-lg"></i>&nbsp;Credit To Account Receipt Details</a></li>
											<li class="tabDisabled" id="creditToAccount" ><a data-toggle="tab" href="#tab1CreditIssue" >Credit To Account Issue Details</a></li>
										</ul>							
									</div>
									
						 			<div class="panel-body" >
                    					<div class="tab-content">
							 				<div class="tab-pane fade in active"  style="padding-top:20px !important" id="tab0CreditRecpt">
												<div style="position: relative; z-index: 1"><div id="jqxgride7"	style="font-size: 13px; font-family: Verdana; float: left;"></div></div> 
											</div>
											
											<div class="tab-pane fade" id="tab1CreditIssue" style="padding-top:20px !important">			
												<div style="position: relative; z-index: 1"><div id="jqxgride6" style="font-size: 13px; font-family: Verdana; float: left;"></div></div> 
											</div>
										</div>
									</div>
								</div>
							</div>
                        	
                        	<div class="tab-pane fade" id="tab7default">
                        		<div style="position: relative; z-index: 1"><div id="jqxgridReceipt" style="font-size: 13px; font-family: Verdana; float: left;"></div></div> 
	                        </div>
    
    	                    <div class="tab-pane fade" id="tab8default">
								<div style="position: relative; z-index: 1"><div id="jqxgridCert" style="font-size: 13px; font-family: Verdana; float: left;"></div></div> 
							</div>
        	                <div class="tab-pane fade" id="tab9default">
      	                		<div style="position: relative; z-index: 1"><div id="jqxgridItemHistory" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>        	                
        	                </div>
                 		</div>
            		</div>
				</div>
				
				<!-- ############ this  Search form Stock Order ############## -->
				<form class="form-horizontal" id="stockOrderSearch"	action="javascript: void(0);">
					<div id="messageBoxStock" align="center"></div>
					<div class="row">
						<div class="col-sm-2">
							<label>Order Number</label>
							<input type="text" class="form-control"	placeholder="Order Number" id="stockOrderNumberS" name="stockOrderNumberS">
						</div>
						
						<div class="col-sm-2">
							<label>Store Name</label> 
							<select id="stockStoreNameS" name="stockStoreNameS"	class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>DC Name</label> 
							<select id="stockDcNameS" name="stockDcNameS" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>Vendor Code</label> 
							<input type="text" class="form-control" placeholder="Vendor Code"	id="stockVendorCodeS" name="stockVendorCodeS">
							<input id="stockVendorCodeS-value" type="hidden" name="code">
						</div>
						
						<div class="col-sm-2">
							<label>PSR Number</label> 
							<input	type="text" class="form-control" placeholder="PSR Number" id="stockPsrNumberS" name="stockPsrNumberS">									
						</div> 
						
						<div class="col-sm-2">
							<label>Order Header Status</label>
							<select id="stockOrderHeaderStatus" name="stockOrderHeaderStatus"	class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-2">
							<label>Line Item Status</label>
							<select id="stockLineItemStatusS" name="stockLineItemStatusS"	class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
						<div class="col-sm-2">
							<label>Order Raised By</label> 
							<select id="stockOrderRaisedS" name="stockOrderRaisedS"	class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						
					</div>
				
					<div class="clearfix">&nbsp;</div>
					
					<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="submit" name="stockSearch" id="stockSearch"><i class="fa fa-search fa-lg"></i> Search</button>
						<button id="clearStock" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
					</div>
					<div class="clearfix">&nbsp;</div>
				</form>
				
				<div class="panel with-nav-tabs " id="gridTabStock">             
					<div class="panel-heading">
				 		<ul class="nav nav-tabs" id="navTabStock">
							<li id="stockHome" class="active"><a data-toggle="tab" href="#tab0Stock" >&nbsp;<i class="fa fa-user fa-lg"></i>&nbsp;Home</a></li>
							<li class="stockTabDisabled" id="stockOrderDetails" ><a data-toggle="tab" href="#tab1Stock" >Order Details</a></li>									
							<li class="stockTabDisabled" id="stockAttribureDetails"><a data-toggle="tab" href="#tab2Stock" >&nbsp;Attr. Details</a></li>
							<li class="stockTabDisabled" id="stockStoneDetails"><a data-toggle="tab" href="#tab3Stock" >&nbsp;Stone Details</a></li>
							<li class="stockTabDisabled" id="stockAccessoryDetails"><a data-toggle="tab" href="#tab4Stock" >&nbsp;Accessory Details</a></li>
							<li class="stockTabDisabled" id="stockDesignDetails"><a data-toggle="tab" href="#tab5Stock" >&nbsp;Design Details</a></li>
							<li class="stockTabDisabled" id="stockCertificationDetails"><a data-toggle="tab" href="#tab6Stock" >&nbsp;Certification Details</a></li>
							<li class="stockTabDisabled" id="stockitemHistory"><a data-toggle="tab" href="#tab7Stock" >&nbsp;Item History</a></li>
						</ul>
					</div>
					 <div class="panel-body" >
                    <div class="tab-content">
                       <div class="tab-pane fade in active" id="tab0Stock">
                        
                    <div class="clearfix">&nbsp;</div>
				<!-- 	JqGrid Started for OpenClose  search  -->
					<div style="position: relative; z-index: 1">
						<div id="jqxgridStock"
							style="font-size: 13px; font-family: Verdana; float: left;"></div>
					</div>
                   </div>
                     <div class="tab-pane fade" id="tab1Stock">
                    	  <div style="position: relative; z-index: 1">
							<div id="stockOrderGride"
								style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
					 </div>
					  <div class="tab-pane fade" id="tab2Stock">
                    	  <div style="position: relative; z-index: 1">
							<div id="stockAttrDetails"
								style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
					 </div>
					  <div class="tab-pane fade" id="tab3Stock">
                    	  <div style="position: relative; z-index: 1">
							<div id="stockStoneDetGrid"
								style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
					 </div>
					 <div class="tab-pane fade" id="tab4Stock">
                    	  <div style="position: relative; z-index: 1">
							<div id="stockAccDetGrid"
								style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
					 </div>
					 
					 <div class="tab-pane fade" id="tab5Stock">
                    	  <div style="position: relative; z-index: 1">
							<div id="stockDesignGrid"
								style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
					 </div>
					  <div class="tab-pane fade" id="tab6Stock">
					  	<div style="position: relative; z-index: 1"><div id="jqxgridCertStock" style="font-size: 13px; font-family: Verdana; float: left;"></div></div> 
					  </div>
                        
                      <div class="tab-pane fade" id="tab7Stock">
                      	<div style="position: relative; z-index: 1">
							<div id="jqxgridStockItemHistory"
								style="font-size: 13px; font-family: Verdana; float: left;">
							</div>
						</div>
                      </div>
                 
                    </div>
                </div>
					</div>
				<div class="modal fade" id="customerOrder" data-keyboard="false"
			data-backdrop="static" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true" >

			<div class="modal-dialog modal-lg" style="width:80%; min-height: 650px; height: 550px;">

				<div class="modal-content">
					<!-- Modal Create Metal Accounting Location Header -->
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<!--  Title Goes Here -->
						<h2 class="modal-title" >
							<i class="fa fa-binoculars"></i> &nbsp; Customer/Stock Order Details
						</h2>

					</div>
					<!--  Modal Window Content Started  -->
					<form class="form-horizontal" id="customerOrderDetails" action="javascript:void(0);">
						<div class="col-md-12 mobile-responsive">
							<div class="clearfix">&nbsp;</div>
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<label>Order No</label> <input type="text" class="form-control"  id="customerOrderNo"  disabled name="customerOrderNo">
								</div>

								<div class="col-sm-2">
									<label>Occasion</label> <input type="text" class="form-control" id="customerOrderOccasion"  disabled name="customerOrderOccasion">
								</div>
								
								<div class="col-sm-2">
									<label>Print Name in Bill</label> <input type="text" class="form-control" id="customerOrderPrintName"  disabled name="customerOrderPrintName">
								</div>
									
								<div class="col-sm-2">
									<label>Item No.</label> 
									<input type="text" class="form-control" id="customerItemNo"  disabled name="customerItemNo">
								</div>
							
								<div class="col-sm-2">
									<label>Occasion Date</label> <input type="text" class="form-control"  id="customerOccastiondate"  disabled name="customerOccastiondate">
								</div>
								
								<div class="col-sm-2">
									<label>Cust ID</label> <input type="text" class="form-control" id="customerOrderCustId"  disabled name="customerOrderCustId">
								</div>
							</div>
							<div class="row">
							
								<div class="col-sm-2">
									<label>Occasion Remark</label> <input type="text" class="form-control"  id="customerOccasionRemark"  disabled name="customerOccasionRemark">
								</div>
								 
								<div class="col-sm-2">
									<label>Date</label> <input type="text" class="form-control"  id="customerDate"  disabled name="customerDate">
								</div>
								
								<div class="col-sm-2">
									<label>PAN</label> <input type="text" class="form-control"  id="customerOrderPanNo"  disabled 	name="customerOrderPanNo">
								</div>
								
								<div class="col-sm-2">
									<label>Intimation</label> <input type="text" class="form-control"  id="customerIntimation"  disabled name="customerIntimation">
								</div>
								
								<div class="col-sm-2">
									<label>Order Status</label> <input type="text" class="form-control"  id="customerOrderStaus"  disabled name="customerOrderStaus">
								</div>
							
								<div class="col-sm-2">
										<label>Name</label> <input type="text" class="form-control" id="customerNameView"  disabled name="customerNameView">
								</div>
							</div>
							
							<div class="row">
								
								<div class="col-sm-2">
									<label>Intimation Mode</label> <input type="text" class="form-control"  id="customerIntimationMode"  disabled name="customerIntimationMode">
								</div>
								
								<div class="col-sm-2">
									<label>Advance Unrealised</label> <input type="text" class="form-control" id="customerOrderUnrealised"  disabled name="customerOrderUnrealised">
								</div>
								
								<div class="col-sm-2">
									<label>Advance</label> <input type="text" class="form-control" id="customerAdvance"  disabled name="customerAdvance">
								</div>
									
								<div class="col-sm-2">
									<label>Phone Number</label> <input  class="form-control" id="customerMobileNumber"  disabled name="customerMobileNumber">
								</div>
							
								<div class="col-sm-2">
									<label>Delivery Address</label> <textarea  class="form-control" id="custmerDeliveryAddr"  disabled 	name="custmerDeliveryAddr"></textarea>
								</div>
							
								<div class="col-sm-2">
									<label>Address</label> <textarea  class="form-control" id="customerAddress"  disabled name="customerAddress"></textarea>
								</div>
							</div>
							
							<div class="row">	
								<div class="col-sm-2">
									<label>Order Cancellation Reason</label> <textarea  class="form-control" id="customerOrderCancellationR"  disabled name="customerOrderCancellationR"></textarea>
								</div>
							</div>	
									
							
								
						</div>
					
					<!--  Modal Window view the details -->

					
					<div class="clearfix">&nbsp;</div>
					<div class="modal-footer  text-center" >						
						<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Close</button>
					</div>
					</form>
				</div>
			</div>
		</div>
		
		<!-- Design view page  -->
		<div class="modal fade" id="designView" data-keyboard="false"	data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" >

			<div class="modal-dialog modal-lg" style="width:80%; min-height: 650px; height: 550px;">

				<div class="modal-content">
					<!-- Modal Create Design view in the design details-->
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<!--  Title Goes Here -->
						<h2 class="modal-title" >
							<i class="fa fa-binoculars"></i> &nbsp; Design view 
						</h2>

					</div>
					<!--  Modal Window Content Started  -->
					<form class="form-horizontal" id="CustomerDesignViewDetails" action="javascript:void(0);">
						<div class="col-md-12 mobile-responsive">
							<div class="clearfix">&nbsp;</div>
							<div class="row text-center">
							<div id="page-content"> </div>
				            <div class="text-center">
				            <ul id="pagination-demo" class="pagination-sm sync-pagination"></ul>
				            </div>
							</div>
					</div>
					<!--  Modal Window view the details -->

					
					<div class="clearfix">&nbsp;</div>
					<div class="modal-footer  text-center" >						
						<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Close</button>
					</div>
					</form>
				</div>
			</div>
		</div>
		
<!--Add Customer Remarks Window Started -->
<div class="modal fade" id="customerRemarks" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%; width:90%">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Customer Remarks</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="custRemForm"	action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-md-9 form-field">
							<table class="table table-bordered table-hover" style="border: none;">
							<thead>
								<tr>
									
								</tr>
							</thead>
							<tbody id="designVariationDet">
							
							</tbody>
						</table>	
						</div>
					</div>
					<div class="row">
						<div class="col-md-9 form-field">
							<label>Remarks</label>
							<textarea rows="2" cols="50" id="custRem" name="custRem"  placeholder="Remarks" class="form-control"></textarea>
						</div>
					</div>

					<!-- Row 2 Started  -->
					
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="saveCustRem" name="saveCustRem"><i class="fa fa-save"></i>&nbsp;Save</button>
					<button type="button" class="btn btn-warning" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Close</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Add Customer Remarks Window Started  -->

<!--Add JW Remarks Window Started -->
<div class="modal fade" id="jwRemarks" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Job Worker Remarks</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="jwRemForm"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-md-9 form-field">
							<table class="table table-bordered table-hover" style="border: none;">
							<thead>
								<tr>
									
								</tr>
							</thead>
							<tbody id="designVariationDetJw">
							
							</tbody>
						</table>	
						</div>
					</div>
					<div class="row">
						<div class="col-md-9 form-field">
							<label>Remarks</label>
							<textarea rows="2" cols="50" id="jwRem" name="jwRem"  placeholder="Remarks" class="form-control"></textarea>
						</div>
					</div>

					<!-- Row 2 Started  -->
					
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="saveJwtRem" name="saveJwtRem"><i class="fa fa-save"></i>&nbsp;Save</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">	<i class="fa fa-times"></i>&nbsp;Close</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Add JW Remarks Window Started  -->
<!--Add JW Remarks Window Started -->
<div class="modal fade" id="consJwRemarks" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%; width:90%">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;JW Remarks</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="consJwRemForm" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-md-9 form-field">
							<table class="table table-bordered table-hover" style="border: none;">
							<thead>
								<tr>
									
								</tr>
							</thead>
							<tbody id="designVariationDetConsJw">
							
							</tbody>
						</table>	
						</div>
					</div>
					<div class="row">
						<div class="col-md-9 form-field">
							<label>Remarks</label>
							<textarea rows="2" cols="50" id="consJwRem" name="consJwRem"  placeholder="Remarks" class="form-control"></textarea>
						</div>
					</div>

					<!-- Row 2 Started  -->
					
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="saveConsJwRem" name="saveConsJwRem"><i class="fa fa-save"></i>&nbsp;Save</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Close</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Add Customer Remarks Window Started  -->
<!--Add JW Remarks Window Started -->
<div class="modal fade" id="stockOrderJwRemarks" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%; width:90%">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;JW Remarks</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stockOrderJwRemForm"	action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-md-9 form-field">
							<table class="table table-bordered table-hover" style="border: none;">
							<thead>
								<tr>
									
								</tr>
							</thead>
							<tbody id="designVariationDetStockJw">
							
							</tbody>
						</table>	
						</div>
					</div>
					<div class="row">
						<div class="col-md-9 form-field">
							<label>Remarks</label>
							<textarea rows="2" cols="50" id="stOrdJwRem" name="stOrdJwRem"  placeholder="Remarks" class="form-control"></textarea>
						</div>
					</div>

					<!-- Row 2 Started  -->
					
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="saveStockJwRem" name="saveStockJwRem">	<i class="fa fa-save"></i>&nbsp;Save</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Close</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Add Customer Remarks Window Started  -->
				
<!-- this of Consignment Order -->
<form class="form-horizontal" id="consignmentOrderSearch" action="javascript: void(0);">
			<div class="mobile-responsive">
			 <div id="messageBoxConsignment" align="center"></div>
				<!-- Row 1 Started  -->
				<div class="row">

					<div class="col-sm-2">
						<label>Order Number</label>
						<input type="text" class="form-control"	placeholder="Order Number" id="consignmentOrderNumberS" name="consignmentOrderNumberS">
					</div>
					
					<div class="col-sm-2">
						<label>Store Name</label> 
						<select id="consignmentStoreNameS" name="consignmentStoreNameS"	class="form-control">
							<option value="" selected label="Select" />
						</select>
					</div>
				
					<div class="col-sm-2">
						<label>DC Name</label> 
						<select id="consignmentDcNameS" name="consignmentDcNameS"	class="form-control">
							<option value="" selected label="Select" />
						</select>
					</div>
					
					<div class="col-sm-2">
						<label>Vendor Code</label>				
						<input type="text" class="form-control" placeholder="Vendor Code"	id="consignmentVendorCodeS" name="consignmentVendorCodeS">
						<input id="consignmentVendorCodeS-value" type="hidden" name="code">
					</div>
				
					<div class="col-sm-2">
						<label>PSR Number</label> 
						<input	type="text" class="form-control" placeholder="PSR Number" id="consignmentPsrNumberS" name="consignmentPsrNumberS">							
					</div> 
					
					<div class="col-sm-2">
						<label>Order Header Status</label>
						<select id="consignmentOrderHeaderStatus" name="consignmentOrderHeaderStatus" class="form-control">
							<option value="" selected label="Select" />
						</select>
					</div>
				</div>
				<div class="row">
					
					<div class="col-sm-2">
						<label>Line Item Status</label>
						<select id="consignmentLineItemStatusS" name="consignmentLineItemStatusS" class="form-control">
							<option value="" selected label="Select" />
						</select>
					</div>
					
					<div class="col-sm-2">
						<label>Order Raised By</label> 
						<select id="consignmentOrderRaisedS" name="consignmentOrderRaisedS"	class="form-control">
							<option value="" selected label="Select" />
						</select>
					</div>
					
				</div>
			
				<div class="clearfix">&nbsp;</div>
				<div class="row voffset2" align="center">
					<button class="btn btn-primary btn-sm voffset" type="submit" name="consignmentSearch" id="consignmentSearch"><i class="fa fa-search fa-lg"></i> Search</button>
					<button id="clear" class="btn btn-warning voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>					
				</div>
				 <div class="clearfix">&nbsp;</div>
			</div>
		</form>
		
		<div class="panel with-nav-tabs " id="gridTabconsignment">
           
		<div class="panel-heading">
				 <ul class="nav nav-tabs" id="navTabsConsng">
					<li id="consignmentHome" class="active"><a data-toggle="tab" href="#tab0consignment" >&nbsp;<i class="fa fa-user fa-lg"></i>&nbsp;Home</a></li>
					<li class="consignmentTabDisabled" id="consignmentOrderDetails" ><a data-toggle="tab" href="#tab1consignment" >Order Detl.</a></li>							
					<li class="consignmentTabDisabled" id="consignmentAttribureDetails"><a data-toggle="tab" href="#tab2consignment" >&nbsp;Attr. Detl.</a></li>
					<li class="consignmentTabDisabled" id="consignmentStoneDetails"><a data-toggle="tab" href="#tab3consignment" >&nbsp;Stone Detl.</a></li>
					<li class="consignmentTabDisabled" id="consignmentAccessoryDetails"><a data-toggle="tab" href="#tab4consignment" >&nbsp;Acc. Detl.</a></li>
					<li class="consignmentTabDisabled" id="consignmentDesignDetails"><a data-toggle="tab" href="#tab5consignment" >&nbsp;Design Detl.</a></li>
					<li class="consignmentTabDisabled" id="consignmentCertificationDetails"><a data-toggle="tab" href="#tab8consignment" >&nbsp;Certification Detl.</a></li>
				<li class="consignmentTabDisabled" id="consignmentItemHistory"><a data-toggle="tab" href="#tab9consignment" >&nbsp;Item History</a></li>
				</ul>
			</div>
		 	<div class="panel-body" >
            	<div class="tab-content">
                	<div class="tab-pane fade in active" id="tab0consignment">                      
                  		<div class="clearfix">&nbsp;</div>
						<div style="position: relative; z-index: 1"><div id="consignmentJqxgride" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
                 	</div>
                   	
                   	<div class="tab-pane fade" id="tab1consignment">
                  		<div style="position: relative; z-index: 1"><div id="consignmentOrderGride" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
					</div>
			 
			 	 	<div class="tab-pane fade" id="tab2consignment">
                  		<div style="position: relative; z-index: 1"><div id="consignmentAttrDetails" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
				 	</div>
			  
			  		<div class="tab-pane fade" id="tab3consignment">
                  		<div style="position: relative; z-index: 1"><div id="consignmentStoneDetGrid"	style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
					</div>
			 
			 		<div class="tab-pane fade" id="tab4consignment">
                 		<div style="position: relative; z-index: 1"><div id="consignmentAccDetGrid"	style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
			 		</div>
			 
			 		<div class="tab-pane fade" id="tab5consignment">
                  	  <div style="position: relative; z-index: 1">
						<div id="consignmentDesignGrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
					  </div>
				 	</div>
				 	
				 	<div class="tab-pane fade" id="tab8consignment">
                  	  <div style="position: relative; z-index: 1">
						<div style="position: relative; z-index: 1"><div id="jqxgridCertConsignment" style="font-size: 13px; font-family: Verdana; float: left;"></div></div> 
					  </div>
				 	</div>
				 	
				 	<div class="tab-pane fade" id="tab9consignment">
                  	  <div style="position: relative; z-index: 1">
						<div id="jqxgridConsignmentItemHistory"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
					  </div>
				 	</div>
                  
                 </div>
               </div>
		</div>
			
		</div>
	</div>
</div>
</div>

<div class="modal fade" id="certViewDet" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        	<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;View Certificate - Customer</h3>				
			</div>
			<div class="modal-body" align="center" id="content">
			<div class="clearfix"></div>
				<div id="page-content"> </div>
		            <div class="text-center">
		            <ul id="pagination-demo" class="pagination-sm sync-pagination"></ul>
		            </div>
			</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">				
				<button type="button" class="btn btn-warning" data-dismiss="modal">	<i class="fa fa-times fa-lg"></i>&nbsp; Close</button>
			</div>    
        </div>
    </div>
</div> 

<div class="modal fade" id="certViewDetStock" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        	<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;View Certificate - Stock</h3>				
			</div>
			<div class="modal-body" align="center" id="content">
			<div class="clearfix"></div>
				<div id="page-contentStock"> </div>
		            <div class="text-center">
		            <ul id="pagination-demoStock" class="pagination-sm sync-pagination"></ul>
		            </div>
			</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">				
				<button type="button" class="btn btn-warning" data-dismiss="modal">	<i class="fa fa-times fa-lg"></i>&nbsp; Close</button>
			</div>    
        </div>
    </div>
</div> 

<div class="modal fade" id="certViewDetConsignment" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        	<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;View Certificate - Consignment</h3>				
			</div>
			
			<div class="modal-body" align="center" id="content">
			<div class="clearfix"></div>
				<div id="page-contentConsignment"> </div>
		            <div class="text-center">
		            <ul id="pagination-demoConsignment" class="pagination-sm sync-pagination"></ul>
		            </div>
			</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">				
				<button type="button" class="btn btn-warning" data-dismiss="modal">	<i class="fa fa-times fa-lg"></i>&nbsp; Close</button>
			</div>    
        </div>
    </div>
</div> 

<script src="resource/oe/assets/js/app/openCloseOrder.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/openCloseStockOrder.js"	type="text/javascript"></script>
<script src="resource/oe/assets/js/app/openCloseConsignment.js"	type="text/javascript"></script>
<style>
	.ui-widget-header
	{
	   	background:none !important; 	   
	}
	#navTabsCust {
    	text-align:center !important;
    	padding-left:17px;
	}
	#navTabStock
	{
		text-align:center !important;
		padding-left:35px;
	}
	#navTabsConsng
	{
		text-align:center !important;
		padding-left:100px;
	}
	
	.tabDisabled1
 	{
   	 	pointer-events:none;
	}
	
	a:hover{
		color: black !important;
	}
	#viewDetails img {
    	display: block;
    	margin: auto;
   	 	width: 40%;
	}	
</style>