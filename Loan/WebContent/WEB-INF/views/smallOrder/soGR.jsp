<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Nageshwar Rao
	##	Date Creation 	: 	15-12-2017
	## 	Description		:	Small Order Goods Receipt 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Small Order Goods Receipt 
					</h1>
				</div>
					<form class="form-horizontal" id="soGoodsReceiptForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-sm-2">
						<label>Vendor</label> <select id="vendorS" name="vendorS" class="form-control">
								<option value="" selected label="Select" /></select>
						</div>
						<div class="col-sm-2">
							<label>SOP No</label> <select id="sopNoS" name="sopNoS" class="form-control">
								<option value="" selected label="Select" /></select>
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
							
						</div>
				</form>
					<div class="clearfix">&nbsp;</div>
					<div class="heading-block-action" align="right" id="addHide">
					 <button class="btn btn-primary btn-sm voffset" data-toggle="modal" type="button"id="addLineItem">
							<i class="fa fa-plus"></i> &nbsp;Add Line Item
					</button>
					</div>	
					<div class="row">
						<div class="col-md-12 form-field" id="gridHide">
							<div id="jqxgrid"
								style="font-size: 13px; font-family: Verdana; position: relative;z-index: 1"></div>
						</div>
					</div>
						<div class="clearfix">&nbsp;</div>
               		<div class="modal-footer  text-center" id="footerHide">
						<button name="saveGr" id="saveGr" type="button"class="btn btn-primary btn-sm voffset">
							<i class="fa fa-save fa-lg" ></i>&nbsp; Save
						</button>
				   </div>
			</div>
		</div>
	</div>
</div>


<script src="resource/oe/assets/js/app/soGR.js" type="text/javascript"></script>

<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>