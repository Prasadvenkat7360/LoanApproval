<!-- 
	##	Author1         : 	
	## 	Author2 	    :   POOJA SANGVE
	##	Date Creation 	: 	30-05-2017
	## 	Description		:	Creation of Print Tags-Customer Order
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Print Tag-Customer Order 
					</h1>					
				</div>
				<form class="form-horizontal" id="customerOderSearch" action="javascript: void(0);">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
							<label>GR No.</label>
							<input type="text" name="grNumber" id="grNumber" class="form-control"/>									
							</div>
							<div class="col-sm-2">
						    <label>GR Sl. No.</label>
							<input type="text" name="grSlNumber" id="grSlNumber" class="form-control"/>
							</div>
							<div class="col-sm-2">
							<label>Order No.</label>
							<input type="text" name="orderNumber" id="orderNumber" class="form-control"/>
							</div>
							<div class="col-sm-2">
							<label>Order Sl. No.</label>
							<input type="text" name="orderSlNumber" id="orderSlNumber" class="form-control"/>
							</div>							
						
						    <div class="col-sm-2" >
						    <label>Store Code</label>
						   <select  name="storeCode" id ="storeCode" class="form-control">
                            <option value="">--Select--</option>
                            </select>
						    </div>
						    <div class="col-sm-2" id="tozoneObj" >
						    <label id ="zoneName">Zone</label>
						    <div  id="zone"></div>
						    </div>					
						    <div class="col-sm-2">
						    <label> Article Segment </label>
						    <select name="articleSeg"  id="articleSeg" class="form-control" >
						    <option value="">--Select--</option>
						    </select>					    
						    </div>
						    <div class="col-sm-2" id="ToJewelCd" >
						    <label id="jwlCodebj">Jewel Code</label>						    
						    <div id="jewelCode" ></div>						   
						    </div>
						
						    <div class="col-sm-2">
						    <label>Vendor Code</label>
						    <select name="vendorCode" id="vendorCode" class="form-control" >
						    <option value="">--Select--</option>
						    </select>
						    </div>						   
						    <div class="col-sm-2">
						    <label>Status</label>
						    <div  id="status" ></div>
						    </div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
						     <button class="btn btn-primary btn-sm voffset" type="submit"name="search" id="search">								
							 <i class="fa fa-search fa-lg"></i> Search
							 </button>
						&nbsp;
							 <button id="clearAll" class="btn btn-warning btn-sm voffset"type="reset">								
							 <i class="fa fa-times fa-lg"></i>&nbsp; Clear
							 </button>
						&nbsp;
							 <button name="printTagOrderItem" id="printTagOrderItem" type="button"class="btn btn-primary btn-sm voffset">								
							 <i class="fa fa-print fa-lg"></i>&nbsp; Print
							 </button>
						</div>
				</form>
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
				<div id="jqxgrid"style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="resource/oe/assets/js/app/customerOrders.js"></script>