<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat
	##	Date Creation 	: 	05-05-2021
	## 	Description		:	Rotation Report Export
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp;  Rotation Report Export
					</h1>
				</div>
					<form class="form-horizontal" id="fgStockItemForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span><label>From Date</label>
										<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-sm-2">
									<span class="required">*</span><label>To Date</label>
										<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
					      		<label>Rotation Type</label>
					      		 <select id="repTypeS" name="repTypeS" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
								</div>
								<div class="col-sm-2">
					      		 <label>Rotation Report Type</label>
					      		 <select id="rotRepTypeS" name="rotRepTypeS" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
								</div>
								 <div class="col-sm-2">
						      		 <label>Segment</label>
						      		 <select id="artSegmentS" name="artSegmentS" class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
								
						    	</div>
							
							
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button name="search" id="search" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-search fa-lg"></i>&nbsp; Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
							
							<div class="clearfix">&nbsp;</div>
							<!-- JqGrid Started for search-->
								<div style="position: relative; z-index: 1">
									<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
								</div>
							<div class="clearfix">&nbsp;</div>
						
						</div>
				</form>
				</div>
				
					
			</div>
		</div>
	</div>
<div class="modal fade" id="createIntimation" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<!--  Modal Window Content Started  -->
				<form method="POST" enctype="multipart/form-data" id="diamondCertUpload">
				<h3 class="modal-title intHead"><label id="popupheaderlabel"></label>Rotational Report Export</h3>
				
				<div class="col-sm-12" id="forCustomerOrder">
					<div>						
						<div class="col-sm-12">
							<div class="clearfix">&nbsp;</div>
							
							<div class="row" id="editContent">
								<div id="page-content" style="margin-left: 20px;"> </div>
							</div>
							
							
							
							<div class="clearfix">&nbsp;</div>
							
						</div>
					</div>
				</div>
				
				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create DC Master Footer -->
				<div class="modal-footer  text-center">
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"	id="cancel"><i class="fa fa-times"></i>&nbsp;Cancel</button>
				</div>
			</form>
		</div>
	</div>
</div>



<script src="resource/oe/assets/js/app/rotationalReportExport.js" type="text/javascript"></script>
<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	
	.toolbarView{
	    visibility: visible !important;
  	    height: 31px !important;
    	width: 1315px !important;
    	top: 0px !important;
    	background-color: #a4bed4 !important;
	}
	
	.contentView{
		top: 33px !important;
		 width: 1315px; 
		 height: 116px; 
		 margin-top:0px !important;
	}
	</style>