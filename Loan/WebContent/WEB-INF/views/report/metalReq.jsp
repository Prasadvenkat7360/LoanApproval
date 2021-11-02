<!-- 
	##	Author1         : 	Raksha
	## 	Author2 	    :   Dipankar Naha
	## 	Author3 	    :   Pooja Sangve
	##	Date Creation 	: 	08-04-2017
	## 	Description		:	Search and export functionality for Metal Requirements.
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- DC Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Metal Requirement Report
					</h1>
				</div>

				<form class="form-horizontal" id="metalReqs" action="javascript: void(0)">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label> Metal
									Segment</label>
								<div id="mSegment" data-validation="required"></div>
							</div>

						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
								name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button name="export" id="export" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
							&nbsp;
							<button name="printMR" id="printMR" type="button"
								class="btn btn-primary btn-sm voffset">
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
							</button>
						</div>
				</form>
				
				<div id="metalSegSection">
				<div id="exTab1" class="row container">	
					<ul  class="nav nav-pills"  id="consignmentOrderDetails">
						<li id="goldTab" class="active" ><a	data-toggle="tab" href="#tab1consignment">GOLD</a></li>
						<li id="platinumTab"><a data-toggle="tab" href="#tab2consignment">&nbsp;PLATINUM</a></li>
						<li id="silverTab"><a data-toggle="tab" href="#tab4consignment">&nbsp;SILVER</a></li>
					</ul>
				</div>
				<div class="row panel-body">
						<div class="tab-content clearfix">
						
							<div class="tab-pane fade in active" id="tab1consignment">
								<div style="position: relative; z-index: 1">
									<div id="segmentGoldGride"
										style="font-size: 13px; font-family: Verdana; float: left;"></div>
								</div>
							</div>
							<div class="tab-pane fade" id="tab2consignment">
								<div style="position: relative; z-index: 1">
									<div id="segmentPlatinumGride"
										style="font-size: 13px; font-family: Verdana; float: left;"></div>
								</div>
							</div>
							<div class="tab-pane fade" id="tab4consignment">
								<div style="position: relative; z-index: 1">
									<div id="segmentSilverDetGrid"
										style="font-size: 13px; font-family: Verdana; float: left;"></div>
								</div>
							</div>
						
							<!-- JqGrid Ended -->
							<div class="clearfix">&nbsp;</div>
						</div>
					</div>
				</div>
				</div>
			</div>
		</div>
	</div>


<script src="resource/oe/assets/js/app/metalReq.js"	type="text/javascript"></script>
