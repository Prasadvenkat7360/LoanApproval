<!-- 
	##	Author1 (UI)    :   Dipankar
	## 	Author2 (UI)	:   Pooja sangve
	## 	Author3 (JAVA)	:   Divya
	##	Date Creation 	: 	28-12-2017
	## 	Description		:	Movement of Stones Report
 -->
 
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> Movement of Stone From & To Order </h1>					
				</div>
						<div class="row">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<select	id="movementType" name="movementType" class="form-control">
									<option value="stone" selected >Stone</option>
								</select>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div id="stoneID">
						<form class="form-horizontal" action="javascript: void(0)">
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*&nbsp;</span><label>From Date</label>
								<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="fromDate" id="fromDate" placeholder="DD/MM/YYYY">
								<label for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label></div>
						   	</div>
						   	
							<div class="col-sm-2">
								<span class="required">*&nbsp;</span><label>To Date</label>
								<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="toDate" id="toDate" placeholder="DD/MM/YYYY">
								<label for="toDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label></div>
							</div>
							
							<div class="col-sm-2">
								<label>Movement Id</label><input type="text" class="form-control"
									placeholder="Movement Id" id="movementId" name="movementId"> <input
									id="movementId-value" type="hidden">
							</div>							
							
							<div class="col-sm-2">
								<label>DC Name</label>
								<select	id="dcName" name="dcName" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							
							<div class="col-sm-2">
								<label>From Location</label>
								<div id="fromLocation"></div>
							</div>
							<div class="col-sm-2">
								<label>To Location</label>
								<div id="toLocation"></div>
							</div>
							
						</div>
						<div class="row">
							<div class="col-sm-2">
								<label>From Packet</label>
								<div id="fromPacket"></div>
							</div>
							
							<div class="col-sm-2" id="claritySection">
								<label>To Packet</label>
								<div id="toPacket"></div>
							</div>
						
							<div class="col-sm-2">
								<label>From Order</label><input type="text" class="form-control"
									placeholder="From Order" id="fromOrder" name="fromOrder"> <input
									id="fromOrder-value" type="hidden">
							</div>
							
							<div class="col-sm-2">
								<label>To Order</label><input type="text" class="form-control"
									placeholder="To Order" id="toOrder" name="toOrder"> <input
									id="toOrder-value" type="hidden">
							</div>	
							
							<div class="col-sm-2">
								<label>From Stock</label>
								<div id="fromStock"></div>
							</div>
							
							<div class="col-sm-2">
								<label>To Stock</label>
								<div id="toStock"></div>
							</div>
						</div>
						<div class="row">			
							
								<div class="col-sm-2">
								<label>Segment</label>
								<select	id="segment" name="segment" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>							
							
							<div class="col-sm-2">
								<label>Main Category</label>
								<select	id="mainCategory" name="mainCategory" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							
							<div class="col-sm-2" id="subCathide">
								<label>Sub Category</label>
								<select	id="subCategory" name="subCategory" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
						</div>
						<div class="row text-center">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-field">
									<br/>
									<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>
									&nbsp;
									<button id="clear" class="btn btn-warning btn-sm voffset"	type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
									&nbsp;
									<button class="btn btn-primary btn-sm voffset" type="button" name="export"	id="export"><i class="fa fa-floppy-o fa-lg"></i> Export</button>
									&nbsp;
							</div>
						</div>
				 </form>
				 <div class="clearfix">&nbsp;</div>
				 <div style="position: relative; z-index: 1"><div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
				 <div class="clearfix">&nbsp;</div>
			</div>
				<div id="accID">
				<form class="form-horizontal" action="javascript: void(0)">
				<div class="row text-center">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 form-field">
								<br/>
								<button class="btn btn-primary btn-sm voffset" type="button" name="searchAcc" id="searchAcc"><i class="fa fa-search fa-lg"></i> Search</button>
								&nbsp;
								<button id="clearAcc" class="btn btn-warning btn-sm voffset"	type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
								&nbsp;
								<button class="btn btn-primary  btn-sm voffset" type="button" name="exportAcc"	id="exportAcc"><i class="fa fa-floppy-o fa-lg"></i> Export</button>
								&nbsp;
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
</div>

<script src="resource/oe/assets/js/app/movementStnAccFromToOrder.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>
