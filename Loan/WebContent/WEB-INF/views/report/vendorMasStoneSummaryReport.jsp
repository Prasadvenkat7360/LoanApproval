<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat Prasad
	##	Date Creation 	: 	13-01-2021 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1 id="home"><i class="fa fa-desktop"></i> &nbsp; Vendor MAS Stone Summary </h1>
				</div>
					<form class="form-horizontal" id="raiseTvForm">
							<!-- Row 1 Started  -->
							<div>
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Vendor Code</label><input type="text" class="form-control"
									placeholder="Vendor Code" id="vendorCode" name="vendorCode"> <input
									id="vendorCode-value" type="hidden" >
							</div>
							
							<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Date</label>
										<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
							   <div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>To Date</label>
										<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Stone Segment</label>
									<select id="stoneSegmentS" name="stoneSegmentS" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Stone Category</label>
									<select id="stoneCatS" name="stoneCatS" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="searchSummary" id="searchSummary">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearSum" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>	
						<!-- 	<button class="btn btn-primary btn-sm voffset" type="button" disabled name="export" id="export">
								<i class="fa fa-search fa-lg"></i> Export
							</button>
							<button class="btn btn-primary btn-sm voffset" type="button" disabled name="print" id="print">
								<i class="fa fa-file fa-lg"></i> Print
							</button> -->						
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row">
								<!-- JqGrid Started for search-->
								<div class="col-sm-12">
									<div style="position: relative; z-index: 1">
										<div id="jqxgridS" style="font-size: 13px; font-family: Verdana; float: left;"></div>
									</div>
								</div>
						</div>
						</div>
				</form>
				
			</div>
		</div>
	</div>
</div>


<script src="resource/oe/assets/js/app/vendorMasStoneDetailReport.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
	.intHead{
	padding: 15px;
	text-align: center;
	}
	.textArea{
		display: block !important;
		border: none;
	}
	.currDate{
		display: block !important;
		border: none !important;
		margin-left: 40px !important;
    	margin-top: -24px !important;
	}
	.sub{
	border-left: none;
    border-top: none;
    border-right: none;
    border-bottom-color: black;	}
    
   .sub1{
	border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: none;
    	}
	
	.radio-inline{
    padding-top: 7px;
    margin-top: -10px !important;
    margin-bottom: 0;
    margin-left: 5px !important;}
    
    .intHead1{
    	float :left;
    }
    .validateView{
	border: 1px solid red !important;
	}
	.error
    {
        color: Red;
    }
    .text-center{
    	text-align: center !important;
    	font-size: x-large !important;
    	font-weight: 500 !important;
    	color: brown !important;
    }
    .subHeading{
    	text-align: center !important;
	    font-size: initial !important;
	    font-weight: 600 !important;
	    color: brown !important;
    }
   /*  .tabStyle{
    	border: 1px solid  #0065aa !important;
    } */
    .vendCol{
        color: brown !important;
    }
</style>