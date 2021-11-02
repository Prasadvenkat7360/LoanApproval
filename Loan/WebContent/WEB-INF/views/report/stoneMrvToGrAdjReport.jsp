<!-- 
	##	Author UI 		    : 	Pooja Sangve
	## 	Author JAVA 	    :   Nageswara rao
	##	Date of Creation 	: 	03-10-2017
	## 	Description		    :	(Stone)MRV To GR,MIV & ADJ Report
 -->
 
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; (Stone) GRV To IGR,GIV & MDV Report 
					</h1>
				</div>

				<form class="form-horizontal" id="mrvToGRSearch">					
					<!-- Row 1 Started  -->
					<div class="row">
                           <div class="col-sm-2 form-field">
							<span class="required">*</span>&nbsp;<label>From Date</label>
								<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
									<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							    </div>
						 </div>
                           <div class="col-sm-2 form-field">
							<span class="required">*</span>&nbsp;<label>To Date</label>
								<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
									<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
						</div>
						<div class="col-sm-2 form-field">
							<label>Vendor Code</label> <select id="vendorCodeS"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>

						<div class="col-sm-2 form-field">
							<label>GRV No.</label> <input type="text" class="form-control"
								placeholder="GRV No." id="mrvNoS">
								<input id="mrvNoS-value" type="hidden" name="code">
						</div>
						
						<div class="col-sm-2 form-field">
							<label>Article Segment</label> <select id="articleSegmentS" name="articleSegmentS"
								class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>

					<div class="row voffset2" align="center">
						<button class="btn btn-sm  btn-primary voffset" type="button"
							name="search" id="search">
							<i class="fa fa-search fa-lg"></i> Search
						</button>
						&nbsp;
						<button id="clearAll" class="btn btn-sm btn-warning voffset"
							type="reset">
							<i class="fa fa-times fa-lg"></i>&nbsp; Clear
						</button>
						&nbsp;
						<button class="btn btn-sm btn-primary voffset" type="button"
							name="export" id="export">
							<i class="fa fa-file-excel-o fa-lg"></i> Export
						</button>
						&nbsp;
						 <button name="printsmrvgr" id="printsmrvgr" type="button"class="btn btn-sm btn-primary voffset">								
						 <i class="fa fa-print fa-lg"></i>&nbsp; Print
						 </button>
					</div>				
				</form>

				<div class="clearfix">&nbsp;</div>

				<div style="text-align: center; marging: auto; position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->

				<div class="clearfix">&nbsp;</div>

			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="viewStoneMrvSearchGridModal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg" style="width:95%;">
		<div class="modal-content">			
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h4 class="modal-title">
					<i class="fa fa fa-eye"></i> &nbsp; <label	id="popupheaderlabel"></label>
				</h4>
			</div>
			<form class="form-horizontal" id="dcDetailsEdit" action="javascript: void(0)">
				<div class="col-md-12">
					<div class="clearfix">&nbsp;</div>
					 <div class="row">
					    <div class="col-md-12">
							<div style="position: relative; z-index: 1"><div id="grListGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
							<div class="clearfix">&nbsp;</div>
							<div style="position: relative; z-index: 1"><div id="mivListGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
							<div class="clearfix">&nbsp;</div>
							<div style="position: relative; z-index: 1"><div id="adjListGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
						</div>
					</div>			
				</div>
			
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">				
				<button type="button" class="btn btn-warning" data-dismiss="modal" id="cancel">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>

			</div>
			</form>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/stoneMrvToGrAdjReport.js"></script>

<style>
.dateBackground
	{
	background-color:white !important;
	}
</style>
