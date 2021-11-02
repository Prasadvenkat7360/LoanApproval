
<!-- 
    ##	Author UI           : 	Dipankar 
	##	Author UI           : 	Pooja Sangve
	## 	Author JAVA 	    :   Manoranjan
	##	Date Creation 	    : 	04-04-2017
	## 	Description		    :	Stone Requirement Master.
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Stone Requirement Report
					</h1>
					<div class="heading-block-action"></div>
				</div>
				<form class="form-horizontal" id="stoneReqS" action="javascript: void(0);">					
					<!-- Row 1 Started  -->					
					<div class="row">					
						<div class="col-sm-2 form-field">
						<label>Order Type</label>
							<div id="orderTypeS" ></div>
						</div>							
						<div class="col-sm-2 form-field">
							<label>DC Name</label>
							<div id="dcNameS" ></div>
						</div>
						<div class="col-sm-2 form-field">
							<label>Store Name</label>
							<div id="storeNameS"></div>
						</div>
						<div class="col-sm-2 form-field">
							<label>Vendor Code</label>
							<div id="vendorCodeS" ></div>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row voffset2" align="center">
						<button class="btn btn-sm btn-primary voffset" type="submit"
							name="search" id="search">
							<i class="fa fa-search fa-lg"></i> Search
						</button>
						&nbsp;
						<button id="clear" class="btn btn-sm btn-warning voffset" type="reset">
							<i class="fa fa-times fa-lg"></i>&nbsp; Clear
						</button>
						&nbsp;
						<button name="export" id="export" type="button" 
							class="btn bth-sm btn-primary voffset" >
							<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
						</button>
						&nbsp;
						<button name="print" id="printSR" type="button" 
							class="btn btn-sm btn-primary voffset" >
							<i class="fa fa-print fa-lg"></i>&nbsp; Print
						</button>
					</div>					
				</form>	
					<div class="clearfix">&nbsp;</div>			
						<div class="clearfix">&nbsp;</div>
				    <div style="text-align: center; marging: auto; position: relative; z-index: 1" id='row'>
    				<div id="jqxgrid"></div>
		       </div>
			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/stoneReqMaster.js" type="text/javascript"></script>