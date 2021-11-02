<!-- 
	##	Author UI 		    : 	Raksha
	## 	Author JAVA 	    :   Ravi teja
	##	Date of Creation 	: 	22-11-2019
	## 	Description		    :	Consignment Goods Status Based Report(FG,LS,Accessory)
 -->
 
<div class="main-container">
	<div class="container">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<div id="looseStoneStockReport">
				  <div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Consignment Goods Status Based Report(FG,Loose Stone,Accessories)
					</h1>
					</div>
				<form class="form-horizontal" id="consignmentSearch">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>FG
									/Stone/Accessory</label> <select id="consignmentGoods" class="form-control">
									 <option value="" selected>--Select--</option>
									<option value="fg">FG</option>
									<option value="stone">Stone</option>
									<option value="acc">Accessory</option>
								</select>
							</div>
						</div>
						<div class="row">
						<div id="consignmentFG">
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Status</label><div id="statusFG"></div>
							</div>
							
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>From Date</label>
								<div class="input-group"><input type="text" class="date-picker form-control dateBackground"
								 name="fromDateFG" id="fromDateFG" placeholder="DD/MM/YYYY">
								<label for="fromDateFG" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
						       </div>
					 		 </div>
					 		 
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>To Date</label>
								<div class="input-group"><input type="text" class="date-picker form-control dateBackground"
								name="toDateFG" id="toDateFG" placeholder="DD/MM/YYYY">
								<label for="toDateFG" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
							</div>
							
							<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Store/DC</label> <select id="storeOrDcFG" name="storeOrDcFG"
								class="form-control">
								<option value="" selected>--Select--</option>
							</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Store/DC Name</label><div id="storeDcNameFG"></div>
							</div>
							<div class="col-sm-2">
								<label>Zone</label><div id="zoneFg"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>Vendor Code</label> <div id="vendorFG"></div>
							</div>
							<div class="col-sm-2">
								<label>GRV Number</label> <div id="grvNoFG"></div>
							</div>
							<div class="col-sm-2">
							<label>Article Segment</label> <div id="artSegFG"></div>
							</div>
							<div class="col-sm-2">
								<label>Jewel Code</label><div id="jewelCodeFG"></div>
							</div>
							<div class="col-sm-2">
								<label>Main Category</label><div id="mainCatFG"></div>
							</div>
							<div class="col-sm-2">
								<label>Sub Category</label><div id="subCatFG"></div>
							</div>
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>Article Code</label><div id="artCodeFG"></div>
							</div>
							
							<div class="col-sm-2">
								<label>From Wt Range</label><div id="fWtRangeFG"></div>
							</div>
							
							<div class="col-sm-2">
								<label>To Wt Range</label><div id="tWtRangeFG"></div>
							</div>
							
						</div>
					</div>
					<div id="consignmentLS">
					 <div class="row">
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Status</label><div id="statusLS">
						</div>
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>From Date</label>
							<div class="input-group"><input type="text" class="date-picker form-control dateBackground"
							 name="fromDateLS" id="fromDateLS" placeholder="DD/MM/YYYY">
							<label for="fromDateLS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
					       </div>
				 		 </div>
				 		 
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>To Date</label>
							<div class="input-group"><input type="text" class="date-picker form-control dateBackground"
							name="toDateLS" id="toDateLS" placeholder="DD/MM/YYYY">
							<label for="toDateLS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							</div>
						</div>
						
						<div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>Store/DC</label> <select id="storeOrDcLS" name="storeOrDcLS"
							class="form-control">
							<option value="" selected>--Select--</option>
						</select>
						</div>
						
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Store/DC Name</label><div id="storeDcNameLS">
						</div>
						</div>
						
						<div class="col-sm-2">
						<label>Zone</label> <div id="zoneLS"></div>
						</div>
					</div>
						<div class="row">
						<div class="col-sm-2">
							<label>Vendor Code</label> <div id="vendorLS"></div>
						</div>
						
						<div class="col-sm-2">
							<label>GRV Number</label> <div id="grvNoLS"></div>
						</div>
						
						<div class="col-sm-2">
						<label>Stone Segment</label> <div id="stoneSegLS"></div>
						</div>
						
						<div class="col-sm-2">
						<label>Main Category</label> <div id="mainCatLS"></div>
						</div>
						
						<div class="col-sm-2">
						<label>From To Weight Range</label> <div id="fromToWtRangeLS"></div>
						</div>
						
						<div class="col-sm-2">
							<label>Clarity</label><div id="clarityLS">
						</div>
						</div>
						
					</div>
				<div class="clearfix"></div>
					<div class="row" style="margin-top: 10px;">
						<div class="clearfix"></div>					
						<div class="col-sm-2">
							<label>Color</label><div id="colorLS">
						</div>
						</div>
						<div class="col-sm-2">
							<label>Actual Color</label><div id="actualColorLS">
						</div>
						</div>
						<div class="col-sm-2">
							<label>Cut Grade</label><div id="cutgradeLS">
						</div>
						</div>
						<div class="col-sm-2">
							<label>Stock/Packet</label><div id="stockOrPacketIdLS">
						</div>
						</div>
						</div>
				</div>
				  <div id="consignmentAcc">
				  <div class="row">
					<div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>Status</label><div id="statusA"></div>
					</div>
							
					<div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>From Date</label>
						<div class="input-group"><input type="text" class="date-picker form-control dateBackground"
						 name="fromDateA" id="fromDateA" placeholder="DD/MM/YYYY">
						<label for="fromDateA" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
				       </div>
			 		 </div>
				 		 
					<div class="col-sm-2">
						<span class="required">*</span>&nbsp;<label>To Date</label>
						<div class="input-group"><input type="text" class="date-picker form-control dateBackground"
						name="toDateA" id="toDateA" placeholder="DD/MM/YYYY">
						<label for="toDateA" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
						</div>
					</div>
						
					<div class="col-sm-2">
					<span class="required">*</span>&nbsp;<label>Store/DC</label> <select id="storeOrDcA" name="storeOrDcA"
						class="form-control">
						<option value="" selected>--Select--</option>
					</select>
					</div>
						
					<div class="col-sm-2" id="storeDc">
						<span class="required">*</span>&nbsp;<label>Store/DC Name</label><div id="storeDcNameA">
					</div>
					</div>
					
					<div class="col-sm-2">
					<label>Zone</label> <div id="zoneA"></div>
					</div>
				</div>
				
				<div class="row">
					<div class="col-sm-2">
						<label>Vendor Code</label> <div id="vendorA"></div>
					</div>
					
					<div class="col-sm-2">
						<label>GR Number</label> <div id="grvNoA"></div>
					</div>
					
					<div class="col-sm-2">
					<label>Accessory Segment</label> <div id="accSegA"></div>
					</div>
					
					<div class="col-sm-2">
					<label>Main Category</label> <div id="mainCatA"></div>
					</div>
					
					<div class="col-sm-2">
					<label>Sub Category</label> <div id="subCatA"></div>
					</div>
					</div>	
				 </div>
		</div>
							
			<div class="clearfix">&nbsp;</div>
			<div class="row voffset2" align="center">
				<button class="btn btn-primary btn-sm voffset" type="button"
					name="search" id="search">
					<i class="fa fa-search fa-lg"></i> Search
				</button>
				&nbsp;
				<button id="clearAll" class="btn btn-warning btn-sm voffset"
					type="reset">
					<i class="fa fa-times fa-lg"></i>&nbsp; Clear
				</button>
				&nbsp;
				<button class="btn btn-primary btn-sm voffset" type="button"
					name="export" id="export">
					<i class="fa fa-file-excel-o fa-lg"></i> Export
				</button>
			</div>
			<div class="clearfix">&nbsp;</div>
	    	<div class="clearfix">&nbsp;</div>
				</form>
			</div>
		</div>
			 <div class="col-md-12" style="position: relative; z-index: 1; width:100%;">
	       	 	<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
            </div>
	</div>
</div>
</div>

<script src="resource/oe/assets/js/app/consignmentGoodsFG.js"></script>
<script src="resource/oe/assets/js/app/consignmentGoodsLS.js"></script>
<script src="resource/oe/assets/js/app/consignmentGoodsACC.js"></script>

