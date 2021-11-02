<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   
	##	Date Creation 	: 	24-08-2020
	## 	Description		:	FG Stock Item search,export and print functionality 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp;  Stock Item Query - Based on Status  
					</h1>
				</div>
					<form class="form-horizontal" id="fgStockItemForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Store/DC</label>
									<select id="storeDcType" name="storeDcType" class="form-control">
											<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Store/DC Name</label><div id="storeDcName">
									</div>
								</div>
								<div class="col-sm-2" id="storeDc">
									<label>Status</label>
									<select id="status" name="status" class="form-control">
											<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Segment</label>
										<select id="segment" name="segment" class="form-control">
											<option value="" selected label="Select" />
										</select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Jewel Type</label><div id="jewelType">
									</div>
								</div>
								<div class="col-sm-2">
									<label>Main Category</label><div id="mainCat">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-2">
									<label>Sub Category</label><div id="subCat">
									</div>
								</div>
								
								<div class="col-sm-2">
									<label>Stock No</label><input type="text" class="form-control" placeholder="Stock No" id="stockNo" name="stockNo">
						    	</div>
								 <div class="col-sm-2">
									<label>Stone Combination</label><div id=stoneComb>
									</div>
								</div>
						       <div class="col-sm-2">
									<label>Vendor Code</label><div id=vendorCode>
									</div>
								</div>
								
								<div class="col-sm-2">
									<label>Size</label><div id=size>
									</div>
								</div>
								<div class="col-sm-2">
									<label>Length</label><div id=length>
									</div>
								</div>
								
							</div>
							<div class="row">
								<div class="col-sm-2">
									<label>Price Range</label><div id=priceRange>
									</div>
								</div>
								
								<div class="col-sm-2" id="notDiamd">
									<label>Metal Weight Range</label><div id=metalWtRange>
									</div>
								</div>
								
								<div class="col-sm-2" id="diamnd">
									<label>Diamond Weight Range</label><div id=diaWtRange>
									</div>
								</div>
								
							</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="button">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
						</div>
				</form>
				
				<div class="clearfix">&nbsp;</div>
				<div class="panel with-nav-tabs " id="gridTabs">
						<div class="panel">
		                    <div class="panel-heading">
			                      <ul class="nav nav-tabs">
									<li id="home"><a data-toggle="tab" href="#tab0default" >
									  <i class="fa fa-user fa-lg">&nbsp;</i>Item Details</a></li>
									  	<li class="tabDisabledS" id="attributeDetails" ><a data-toggle="tab" href="#tab1default">Attributes</a></li>
									 	<li class="tabDisabledS" id="stoneDetails" ><a data-toggle="tab" href="#tab2default">Stones Details</a></li>
									    <li class="tabDisabledS" id="certDetails" ><a data-toggle="tab" href="#tab3default">Certificate Details</a></li>
										<li class="tabDisabledS" id="accDetails"><a data-toggle="tab" href="#tab4default" >Accessory Details</a></li>
							    		<li class="tabDisabledS" id="historyDetails"><a data-toggle="tab" href="#tab5default" >Item History</a></li>
							     </ul>
						    </div>
						    <div class="panel-body" >
			                  <div class="tab-content">
			                      <div class="tab-pane fade ui-tabs-panel active in" id="tab0default">
					                <div style="text-align: center; marging: auto; position: relative; z-index: 1">
						                  <div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
					                </div>
			                 	   </div>
			                 	   <div class="tab-pane fade" id="tab1default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgridAttr" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
			                 	   <div class="tab-pane fade" id="tab2default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgridStone" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
				                   <div class="tab-pane fade" id="tab3default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgridCert" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
			                      <div class="tab-pane fade" id="tab4default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								           <div id="jqxgridAcc" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							           </div>
			                     </div>
			                     <div class="tab-pane fade" id="tab5default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								           <div id="jqxgridHist" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							           </div>
			                     </div>
			                 </div>
			            </div>
			       </div>
			    </div>
				
				<div class="clearfix">&nbsp;</div>
				
			</div>
		</div>
	</div>
</div>



<script src="resource/oe/assets/js/app/stockItemQueryBasedOnStatus.js" type="text/javascript"></script>
<style>
.classhidden
	{
	display:none;
	}
#navTabsCust {
    text-align:center !important;
    padding-left:17px;
	}
.tabDisabled1
	 {
    pointer-events:none;
	}
.tabDisabled2
	 {
    pointer-events:none;
	}
	
a:hover{
	color: black !important;
	}
.dateBackground
	{
	background-color:white !important;
	}
#wastageFullyPC {
	height: 28px;
}
</style>