<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat Prasad
	##	Date Creation 	: 	18-08-2017 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1 id="home"><i class="fa fa-desktop"></i> &nbsp; Attendance For PSQ</h1>
					<h1 id="createH"><i class="fa fa-plus"></i> &nbsp; Create Attendance For PSQ</h1>
					
					<div class="heading-block-action" id="actionS">
						<button class="btn btn-primary btn-sm voffset" type="button" id="attdCreate"><i class="fa fa-plus fa-lg"></i>&nbsp;Create Attendance for PSQ</button>
					</div>
					
					<div class="heading-block-action" id="actionC">
						<button class="btn btn-primary btn-sm voffset" type="button" id="back"><i class="fa fa-chevron-left"></i>&nbsp;Back</button>
					</div>
				</div>
					<form class="form-horizontal" id="raiseTvForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div id="searchSection">
							<div class="row">
								<div class="col-sm-2">
									<label>Company</label>
									<select id="companyS" name="companyS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<label>Region</label> 
									<select id="regionS" name="regionS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<label>DC</label> 
									<select id="dcS" name="dcS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<label>Store</label> 
									<select id="storeS" name="storeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<label>Role</label> 
									<select id="roleS" name="roleS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
									<div class="col-sm-2">
									<label>Years</label> 
									<select id="yearS" name="yearS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div> 
								<div class="col-sm-2">
									<label>Month</label> 
									<select id="monthS" name="monthS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<label>Name</label> 
									<select id="nameS" name="nameS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
						</div>
						
						<!-- Row 2 Ended  -->
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>							
						</div>
						<div class="clearfix">&nbsp;</div>
						<!-- JqGrid Started for search-->
						<div style="position: relative; z-index: 1">
							<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
						<!-- JqGrid Ended -->
						<div class="clearfix">&nbsp;</div>	
					</div>
					<div id="createSection">
						<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Company</label>
									<select id="companyC" name="companyC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Region</label> 
									<select id="regionC" name="regionC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>DC</label> 
									<select id="dcC" name="dcC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Store</label> 
									<select id="storeC" name="storeC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Role</label> 
									<select id="roleC" name="roleC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Years</label> 
									<select id="yearC" name="yearC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div> 
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Month</label> 
									<select id="monthC" name="monthC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Name</label> 
									<select id="nameC" name="nameC" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<input type="hidden" id="maxDaysC" />
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>No of Days Present</label>
									<input type="text"  class="form-control input-sm" placeholder="No of Days Present" name="noOfDaysPresentC" id="noOfDaysPresentC" onblur="this.value = validateNumber(this.value);">
								</div>
								
								<div class="col-sm-2">
									<label>No of Days Absent</label>
									<input type="text"  class="form-control input-sm" placeholder="No of Days Absent" name="noOfDaysAbsentC" id="noOfDaysAbsentC" disabled>
								</div>
								
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="save" id="save"><i class="fa fa-save fa-lg"></i>&nbsp; Create</button>							
							<button id="clearCreate" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>							
							<button class="btn btn-primary btn-sm voffset" type="button" id="downloadTemplate"><i class="fa fa-download fa-lg"></i>&nbsp;Download Template</button>
							
								<div  class="fileUploadP btn btn-primary btn-sm voffset">
							        <span  class="fa fa-search"></span> Browse 
							        <input  id="uploadAttd" type="file" onchange="captureFileSelectEvent(event)"/>
							    </div>
							     <button  class="btn btn-primary voffset" onclick="HandleUploadExcelFile()">Upload Attendance</button>
							     &nbsp;
							
						</div>
						<div class="clearfix">&nbsp;</div>
					</div>
				</form>
				
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="createAdjusVouchr" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog">
		 <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                 <h3 class="modal-title" id="myModalLabel">Warning!</h3>

            </div>
            <div class="modal-body">
                 <h4> Are you sure you want to DELETE?</h4>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger btn-sm" id="btnDelteYesLines" href="#">Yes</button>
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">No</button>
            </div>
        </div>
	</div>
</div>


<script src="resource/oe/assets/js/app/attendanceForPsq.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>