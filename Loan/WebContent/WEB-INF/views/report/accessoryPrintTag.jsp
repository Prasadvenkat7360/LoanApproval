<!-- 	
	## 	Author1 	    :   Rashmi
	##	Date Creation 	: 	08-05-2018
	## 	Description		:	Creation of Print Tags-Accessory
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!--Header-->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Print Tag-Accessory 
					</h1>					
				</div>
				<form class="form-horizontal" id="accessorySearch" action="javascript: void(0);">
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
								<label>Store/Dc</label>
						   		<select  name="storeOrDc" id ="storeOrDc" class="form-control">
                            		<option value="">--Select--</option>
                            		<option value="Store">Store</option>                            		                        
                            		<option value="DC">DC</option>
                            	</select>
							</div>
							<div class="col-sm-2">
								<label>Store/Dc Name</label>
						   		<select  name="storeOrDcId" id ="storeOrDcId" class="form-control">
                            		<option value="">--Select--</option>
                            	</select>
							</div>
							<div class="col-sm-2" id="tozoneObj" >
							    <label id ="zoneName">Zone</label>
							    <div  id="zone"></div>
						    </div>														
						 	<div class="col-sm-2">
							    <label> Status </label>
							    <select name="status"  id="status" class="form-control" >
							    	<option value="">--Select--</option>
							    </select>					    
						    </div>
						    <div class="col-sm-2">
							    <label>Vendor Code</label>
							    <select name="vendorCode" id="vendorCode" class="form-control" >
							    	<option value="">--Select--</option>
							    </select>
						    </div>
						    <div class="col-sm-2">
						    	<label>Stock No</label>
								<input type="text" name="stockNo" id="stockNo" class="form-control"/>
							</div>
						</div>						
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
						     <button class="btn btn-primary btn-sm voffset" type="submit" name="search" id="search">								
							 	<i class="fa fa-search fa-lg"></i> Search
							 </button>
								&nbsp;
							 <button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">								
							 	<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							 </button>
								&nbsp;
							 <button name="accprintTag" id="accprintTag" type="button" class="btn btn-primary btn-sm voffset">								
							 	<i class="fa fa-print fa-lg"></i>&nbsp; Print
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
<script type="text/javascript" src="resource/oe/assets/js/app/accessoryPrintTag.js"></script>