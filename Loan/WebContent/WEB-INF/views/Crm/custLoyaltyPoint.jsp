<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat
	##	Date Creation 	: 	22-03-2021 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1 id="home"><i class="fa fa-desktop"></i> &nbsp;Customer Loyalty Point</h1>
				</div>
					<form class="form-horizontal" id="raiseTvForm">
							<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
									<span class="required">* &nbsp;</span><label>From Month/Year</label>
										<input id="Fmonth" type="month" name="month" class="fmonyear">
								</div>
								<div class="col-sm-2">
									<span class="required">* &nbsp;</span><label>To Month/Year</label>
										<input id="Tmonth" type="month" name="month" class="fmonyear">
								</div>
								<div class="col-sm-2">
									<label>Loyalty Card No</label><input type="text" id="cardNoC" name="cardNoC" class="form-control" placeholder="Card No"/>
								</div>
								<div class="col-sm-2 form-field">
								<label>Customer Name</label> <input type="text"
									class="form-control" placeholder="Customer Name"
									id="custName" name="custName"> <input
									id="custName-value" type="hidden" name="code">
								</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>	
							&nbsp;						
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button" name="export" id="export">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>	
						</div>
						<div class="clearfix">&nbsp;</div>
						
						<div class="row">
						
						<!-- JqGrid Started for search-->
						<div class="col-sm-1"></div>
						<div class="col-sm-10">
							<div style="position: relative; z-index: 1">
								<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div></div>
						<div class="col-sm-1"></div>
						<!-- JqGrid Ended -->
						<div class="clearfix">&nbsp;</div>	
				</form>
				
			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/custLoyaltyPoint.js" type="text/javascript"></script>
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
    .fmonyear{
    width: 200px !important;
    height: 24px !important;
    margin-left: 12px !important;
    }
</style>