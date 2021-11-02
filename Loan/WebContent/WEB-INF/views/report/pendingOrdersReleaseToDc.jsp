<!-- 
	##	Author1         : 	 POOJA SANGVE
	## 	Author2 	    :  
	##	Date Creation 	: 	20-06-2017
	## 	Description		:	UI Creation of Pending Orders
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; List of Pending Orders for Confirmation for Release to DC
					</h1>					
				</div>
				<form class="form-horizontal" id="OrderItemSearch" action="javascript: void(0);">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
							<span class="required">*</span>
							<label>Store Name</label>
							<select name="storeName" id="storeName" class="form-control" >
							<option value="">--Select--</option>
							</select>								
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
							<button class="btn btn-primary btn-sm voffset" type="button"name="exportSA" id="exportSA">
							<i class="fa fa-file-excel-o fa-lg"></i> Export
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
<script type="text/javascript" src="resource/oe/assets/js/app/pendingOrdersReleaseToDc.js"></script>