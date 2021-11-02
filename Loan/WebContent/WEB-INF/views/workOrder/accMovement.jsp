<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12 layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Accessory Movement
					</h1>
					<div class="heading-block-action">
						<button class="btn btn-primary btn-sm" data-toggle="modal"	data-target="#createStoneAccMovement" type="button" id="createStoneAccMovementCreate"><i class="fa fa-plus"></i> &nbsp;Create</button>
					</div>
				</div>

				<form class="form-horizontal" action="javascript: void(0)" id="accSearchPageId">
						<div class="row">
								<div class="col-sm-2">
									<label>Movement Id</label> 
									<input type="text" class="form-control"	name="movementId" placeholder="Movement Id" id="movementId" />
								</div>
								<div class="col-sm-2">
									<label>From Date</label>
									<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="fromDate" id="fromDate" placeholder="DD/MM/YYYY">
									<label for="fromDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label></div>
							   	</div>
								<div class="col-sm-2">
									<label>To Date</label>
									<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" name="toDate" id="toDate" placeholder="DD/MM/YYYY">
									<label for="toDate" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label></div>
								</div>
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
								<div class="col-sm-2">
									<label>Sub Category</label>
									<select	id="subCategory" name="subCategory" class="form-control">
										<option value="" selected label="--Select--" />
									</select>
								</div>
							
							  <div class="col-sm-2">
									<span class="required">* </span><label>From Type</label>
									<select	id="fromTypeS" name="fromTypeS" class="form-control">
										<option value="" selected label="--Select--" />
									</select>
								</div>	
								<div class="col-sm-2">
									<label>From Doc No</label>
									<input type="text"	id="fromDocNoS" name="fromDocNoS" class="form-control">
								</div>		
								<div class="col-sm-2">
									<span class="required">* </span><label>To type</label>
									<select	id="toTypeS" name="toTypeS" class="form-control">
										<option value="" selected label="--Select--" />
									</select>
								</div>
								<div class="col-sm-2">
									<label>To Doc No</label>
									<input type="text" class="form-control" id="toDocNoS">
								</div>
						  </div>
						<div class="clearfix">&nbsp;</div>
						<div class="col-md-12 text-center">
								<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>
								&nbsp;
								<button id="clear" class="btn btn-warning btn-sm voffset"	type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button" name="export" id="export"><i class="fa fa-floppy-o fa-lg"></i> Export</button>							
						</div>
				</form>
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1"><div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div></div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>

<!-- Stone/Acc. Movement Create Modal Pop-up -->
<div class="modal fade" id="createStoneAccMovement" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:95%;">
		<div class="modal-content">			
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp; <label>Create Accessory Movement</label></h3>
			</div>
			<form class="form-horizontal" id="dcDetailsEdit" action="javascript: void(0)">
				<div class="col-sm-12">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">
						
						<div class="col-sm-3 form-field">
							<span class="required">* </span><label>From Type</label>
							<select	id="fromTypeC" name="fromTypeC" class="form-control"><option value="" selected label="--Select--" /></select>
						</div>
						
						<div class="col-sm-3 form-field">
							<span class="required">* </span><label>From Doc No</label>
							<select	id="fromDocNoC" name="fromDocNoC" class="form-control"><option value="" selected label="--Select--" /></select>
						</div>
						
						<div class="col-sm-3 form-field">
							<span class="required" id="refDocSlNoHide">* </span><label>From Doc Srl No.</label> 
							<select	id="refDocSlNoC" name="refDocSlNoC" class="form-control"><option value="" selected label="--Select--" /></select>
						</div>
						
						<div class="col-sm-3 form-field">
							<span class="required" id="fromDocAccSrlNoHide">* </span><label>From Doc Acc Srl No.</label> 
							<select	id="fromDocAccSrlNoC" name="fromDocAccSrlNoC" class="form-control"><option value="" selected label="--Select--" /></select>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-3 form-field">
							<span class="required">* </span><label>To Type</label>
							<select	id="toTypeC" name="toTypeC" class="form-control"><option value="" selected label="--Select--" /></select>
						</div>	
						
						<div class="col-sm-3 form-field">
							<span class="required">* </span><label>To Doc No</label>
							<select	id="toDocNoC" name="toDocNoC" class="form-control"><option value="" selected label="--Select--" /></select>
						</div>
					</div>
					<div class="row">
					    	<input type="hidden" class="form-control"	placeholder="Acc Code" id="accCodeC" name="accCodeC" disabled>
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
							<span class="required" id="toRefDocSlNoHide">* </span><label>To Doc Srl No.</label> 
							<select	id="toRefDocSlNoC" name="toRefDocSlNoC" class="form-control"><option value="" selected label="--Select--" /></select>
						</div>
						<div class="col-sm-3 form-field">
							<span class="required" id="toDocAccSrlNoHide">* </span><label>To Doc Acc Srl No.</label> 
							<select	id="toDocAccSrlNoC" name="toDocAccSrlNoC" class="form-control"><option value="" selected label="--Select--" /></select>
						</div>
					</div>
					<div class="row">
						
						<div class="col-sm-3 form-field">
							<input type="hidden" class="form-control"	name="segmentIdC"  id="segmentIdC" disabled />
							<input type="hidden" class="form-control"	name="segmentIdCode"  id="segmentIdCode" disabled />
								
								<label>Acc. Segment</label> 
							<input type="text" class="form-control"	name="segIdC"  id="segIdC" disabled />
						</div>	
						<div class="col-sm-3 form-field">
							<input type="hidden" class="form-control"	name="accCategoryIdC"  id="accCategoryIdC" disabled />
							<input type="hidden" class="form-control"	name="accCategoryCode"  id="accCategoryCode" disabled />
								
								<label>Acc Category</label>
							<input type="text" class="form-control"	name="accCategoryC"  id="accCategoryC" disabled />
						</div>
						<div class="col-sm-3 form-field">
							<input type="hidden" class="form-control"	name="accSubCatIdC"  id="accSubCatIdC" disabled />
							<input type="hidden" class="form-control"	name="accSubCatCode"  id="accSubCatCode" disabled />
							
							<label>Acc SubCategory</label>
								<input type="text" class="form-control"	name="accSubCatC"  id="accSubCatC" disabled />
						</div>
						<div class="col-sm-3 form-field">
							<label>Pcs</label> 
							<input type="text" class="form-control"	name="pcsC"  id="pcsC" disabled />
						</div>
					</div>
					<div class="row">
						<div class="col-sm-3 form-field">
							<label>Weight</label> 
							<input type="text" class="form-control"	name="WtC"  id="WtC" disabled />
						</div>
						<div class="col-sm-3 form-field">
							<label>Cost Price</label> 
							<input type="text" class="form-control"	name="cpC"  id="cpC" disabled />
						</div>	
						<div class="col-sm-3 form-field">
							<label>Selling Price</label>
							<input type="text"	id="spC" name="spC" class="form-control" disabled>
						</div>
						<div class="col-sm-3 form-field">
							<label>Remarks</label> 
							<textarea rows="1" cols="40" class="form-control"	name="remaksC" placeholder="Remarks" id="remaksC"></textarea>
						</div>
					</div>
					
					<div class="clearfix">&nbsp;</div>
					<div id='jqxwindow'><div id="jqxgridCreate" style="font-size: 13px; font-family: Verdana;"></div></div>
					<div class="clearfix">&nbsp;</div>
				</div>
			    <div class="clearfix">&nbsp;</div>
				<div class="modal-footer  text-center">	
					<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="button" name="saveC" id="saveC"><i class="fa fa-floppy-o"></i> Save</button>
						&nbsp;<button id="cancel" type="button" class="btn btn-warning btn-sm" data-dismiss="modal"><i class="fa fa-times"></i>&nbsp;Cancel</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/accMovement.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>
