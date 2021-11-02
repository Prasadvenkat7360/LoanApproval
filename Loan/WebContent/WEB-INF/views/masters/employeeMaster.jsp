<!-- 
	##	Author UI :POOJA SANGVE
	## 	Author JAVA : 
	## 	Date Creation : 28/03/2017
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Employee Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Maintain Employee Master
					</h1>

					<div class="clearfix">&nbsp;</div>
					<label class="radio-inline"> <input name="employeeDet"
						type="radio" value="1" /> &nbsp; Designation
					</label> <label class="radio-inline"> <input name="employeeDet"
						 type="radio" value="2" /> &nbsp; Role
					</label> <label class="radio-inline"> <input name="employeeDet"
						type="radio" value="3" /> &nbsp; Employee Details
					</label>
				</div>

				<div id="designationDet">
					<div class="heading-block">
						<h4>
							<i class="fa fa-desktop"></i> &nbsp; Designation Details
						</h4>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createDesign" type="button" id="createDsigntion">
								<i class="fa fa-plus"></i> &nbsp;Create
							</button>
						</div>
					</div>

					<!-- Designation Details Search -->
					<form class="form-horizontal" id="designationSearch">
						<div class="mobile-responsive">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<label>Designation Code</label> <input type="text"
										class="form-control" placeholder="Designation Code"
										id="dCodeS" name="dCodeS">
										<input id="dCodeS-value" type="hidden" name="code">
								</div>
								<div class="col-sm-2">
									<label>Designation Name</label> <input type="text"
										class="form-control" placeholder="Designation Name"
										id="dNameS" name="dNameS">
										<input id="dNameS-value" type="hidden" name="code">
								</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchD" id="searchD">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllD" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>

				<!-- Role Details searching started -->
				<div id="roleDet">
					<div class="heading-block">
						<h4>
							<i class="fa fa-desktop"></i> &nbsp; Role Details
						</h4>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createRoleDet" type="button" id="createRoleC">
								<i class="fa fa-plus"></i> &nbsp;Create
							</button>
						</div>
					</div>
					<!-- Parameter Details Search -->
					<form class="form-horizontal" id="RoleDetS">
						<div class="mobile-responsive">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<label>Role Code</label> <input type="text"
										class="form-control" placeholder="Role Code" id="rCodeS"
										name="rCodeS">
								</div>
								<div class="col-sm-2">
									<label>Role Name</label> <input type="text"
										class="form-control" placeholder="Role Name" id="rNameS"
										name="rNameS">
								</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchRole" id="searchRole">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllRole" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>

				<!--  Employee Master Search is Started  -->

				<div id="employeeDet">
					<div class="heading-block">
						<h4>
							<i class="fa fa-desktop"></i> &nbsp; Employee Details
						</h4>
						<div class="heading-block-action">
							<a class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createEmployeeDet" type="button"
								id="createEmployee" href="javascript: void(0)"><i
								class="fa fa-plus"></i> &nbsp;Create</a>
						</div>
					</div>
					<!-- Parameter Details Search -->
					<form class="form-horizontal" id="cretaeEmployeeDetS">
						<div class="mobile-responsive">
							<!-- Row 1 Started  -->
							<div class="row">
								<div class="col-sm-2">
									<label> Name </label> <input type="text" class="form-control"
										placeholder="Name" id="nameS" name="nameS">
										<input id="nameS-value" type="hidden" name="code">
								</div>
								<div class="col-sm-2">
									<label>Role</label> <select id="roleS" class="form-control"
										name="roleS">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<label> Designation </label> <select id="DesignationS"
										class="form-control" name="DesignationS">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<label>Department</label> <select id="deptS"
										class="form-control" name="deptS">
										<option value="" selected label="Select" />
									</select>
								</div>
							
								<div class="col-sm-2">
									<label>Stores / DC </label> <select id="StoreDcCS"
										class="form-control">
										<option value="" selected>--Select--</option>
										<option value="store">Store</option>
										<option value="DC">DC</option>
									</select>
								</div>
								<div class="col-sm-2">
									<label> Stores / DC Name</label> <select id="empStoreDcS"
										class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
								<div class="col-sm-2">
									<label>Emp Active/Inactive</label> <select id="activeInactiveS"
										class="form-control">
										<option value="" selected>--Select--</option>
										<option value="1">Active</option>
										<option value="0">InActive</option>
									</select>
								</div>
							</div>

							<div class="clearfix">&nbsp;</div>

							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="searchEmployeS" id="searchEmployeS">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;
								<button id="clearAllEmployee" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								&nbsp;
								<button class="btn btn-primary btn-sm voffset" type="button"
								name="export" id="export">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="updateTPeriod" id="updateTPeriod">
								<i class="fa fa-plus"></i> Update Emp Training Period
							</button>
							</div>
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>
				<!-- JqGrid Started for Zone details create and search-->
				<div style="position: relative; z-index: 1">

					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->
			</div>

		</div>
	</div>
</div>
<!-- Creation of Designation is Started -->

<!-- CREATE DESIGNATION DETAILS ######################################## -->
<div class="modal fade" id="createDesign" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h2 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Designation
				</h2>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="designationDetC"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input id="designtnC" type="hidden" />
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Company Name</label>
							<input type="text" disabled class="form-control"
								placeholder="Company Name" id="companyNameC" name="companyNameC">
						</div>
					</div>


					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<h4>Designation Details</h4>
						<div class="heading-block-action">
							<button class="btn btn-primary" id="addRowD" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgrideD"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>

						</div>
					</div>
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Employee Master  Footer -->
			<div class="modal-footer  text-center">          
				<button class="btn btn-primary btn-sm" type="submit"
					name="saveDesignationDet" id="saveDesignationDet">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>
            
			</div>
		</div>
	</div>
</div>

<!-- CREATE ROLE DETAILS ######################################## -->
<div class="modal fade" id="createRoleDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">

	<div class="modal-dialog modal-lg" style="width:90%">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h2 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Role
				</h2>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="roleDetC" action="javascript:void()">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input id="roleC" type="hidden" />
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Company Name</label>
							<input type="text" disabled class="form-control" placeholder="Company Name" id="rcompanyNameC"	name="rcompanyNameC">
						</div>
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Role Code</label>
							<input type="text"  class="form-control"  id="roleCode" name="roleCode"/>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Role Name</label>
							<input type="text"  class="form-control" id="roleName" name="roleName"/>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
						   <span class="required">*</span>&nbsp;<label>Module Name</label>
							<select id="meduleNameC" name="meduleNameC" class="form-control"><option value="">--select--</option></select>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="menuSection">
						  <span class="required">*</span>&nbsp;<label>Menu Name</label>
						   <div id="menuNameC"></div>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="menuSection">
							
						</div>
					</div>
					<div class="row">
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<input type="checkbox" id="isStoreHead"><label>Store Head</label>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<input type="checkbox" id="isCashier"><label>Cashier</label>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<input type="checkbox" id='isSalesExecutive'><label>Sales Executive</label>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<input type="checkbox" id="isSupervisor"><label>Supervisor</label>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div style="position: relative; z-index: 1; display: none" id="jqxgridRole"></div>
				
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center" id="bottomSection">
				<button class="btn btn-primary" type="button"	name="saveRoleDet" id=saveRoleDet><i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save</button>
				<button type="button" id="cancelRole" class="btn btn-warning" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>

			</div>
		</div>
	</div>
</div>
<!-- ################ EDIT ROLE DETAILS ####################### -->

<div class="modal fade" id="editRoleDet" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true">

	<div class="modal-dialog modal-lg" style="width:95%;">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h2 class="modal-title">
					<i class="fa fa-edit"></i> &nbsp;Edit Role
				</h2>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="editroleDetC" action="javascript:void()">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					
					<div class="row">
						<input id="roleE" type="hidden" />
						<input id="roleIdE" type="hidden" />
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Company Name</label>
							<input type="text" disabled class="form-control" placeholder="Company Name" id="rcompanyNameE"	name="rcompanyNameE">
						</div>
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Role Code</label>
							<input type="text"  disabled class="form-control"  id="roleCodeE" name="roleCodeE"/>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Role Name</label>
							<input type="text"  disabled class="form-control" id="roleNameE" name="roleNameE"/>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
						   <span class="required">*</span>&nbsp;<label>Module Name</label>
						   <input type="text"  disabled class="form-control" id="meduleNameE" name="meduleNameE"/>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="menuSectionE">
						  <span class="required">*</span>&nbsp;<label>Menu Name</label>
						   <div id="menuNameE"></div>
						</div>
					</div>			
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<input type="checkbox" id="isStoreHeadE"><label>Store Head</label>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<input type="checkbox" id="isCashierE"><label>Cashier</label>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<input type="checkbox" id='isSalesExecutiveE'><label>Sales Executive</label>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<input type="checkbox" id="isSupervisorE"><label>Supervisor</label>
						</div>
					</div>
					<div class="heading-block">
						<h3><i class="fa fa-desktop"></i> Assign role function</h3>
						<div class="heading-block-action">
							<button id="addRoleE" class="btn btn-primary" type="button" data-toggle="collapse"><i class="fa fa-plus"></i>&nbsp; Add</button>
							<div class="clearfix">&nbsp;</div>
						</div>
					</div>
					<div style="position: relative; z-index: 1; display: none" id="jqxgridRoleE"></div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button class="btn btn-primary" type="button" name="EditsaveRoleDet" id="EditsaveRoleDet"><i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save</button>				
				<button type="submit" class="btn btn-warning" data-dismiss="modal"><i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>
			</div>
		</div>
	</div>
</div>

<!-- CREATE EMPLOYEE DETAILS ######################################## -->
<div class="modal fade" id="createEmployeeDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h2 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Employee Master
				</h2>
			</div>
			<!-- Modal Create Child Master Body -->
			<div class="modal-body">
				<div class="container sentParcel-Edit">
					<form class="form-horizontal" id="empDetCreateC"
						action="javascript:void(0);">
						<div class="mobile-responsive">
							<div class="row">
								<input id="empC" type="hidden" />

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp; <label>Emp Name</label> <input
										type="text" name="empName" placeholder="Emp Name" id="empName"
										class="form-control" />
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Date of
										Joining</label>
									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground" id="empDateJoin"
											name="empDateJoin" placeholder="DD/MM/YYYY"> <label 
											for="empDateJoin" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Date of Leaving</label>
									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											id="empDateLeave" placeholder="DD/MM/YYYY"> <label
											for="empDateLeave" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp; <label>Emp
										Department</label> <select id="empDept" name="empDept" class="form-control">
										<option value="" selected>--Select--</option>
										<option value="store">Store</option>
									</select>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp; <label>Emp Part
										Time</label> <select id="empPartTime" name="empPartTime" class="form-control">
										<option value="" selected>--Select--</option>
										<option value="Yes">P</option>
										<option value="No">F</option>
									</select>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp; <label>Address 1</label>
									<input type="text" name="address1" placeholder="Address 1"
										id="address1" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Address 2</label> <input
										type="text" name="address2" placeholder="Address 2"
										id="address2" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Address 3</label> <input type="text" name="address3"
										placeholder="Address 3" id="address3" class="form-control" />
								</div>
							</div>
							<div class="row">

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Region</label>
									<select id="empRegion" name="empRegion" class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Stores / DC
									</label> <select id="StoreDcC" name="StoreDcC" class="form-control">
										<option value="" selected>--Select--</option>
										<option value="Store">Store</option>
										<option value="DC">DC</option>
									</select>
								</div>
								
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Role</label> <select
										id="empRole" name="empRole" class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Stock Check Role</label> <select
										id="stkChkRole" name="stkChkRole" class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
								
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp; <label>Emp
										Designation</label><select id="empDesignation" name="empDesignation" class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Grade</label> <select id="empGrade"
										class="form-control">
										<option value="" selected>--Select--</option>
										<!-- <option value="A">A</option>
										<option value="B">B</option> -->
									</select>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Adhoc Amount</label> <input type="text"
										placeholder="Emp Adhoc Amount" name="empAdHocAmnt"
										onblur="this.value = validateNumber1(this.value);" id="empAdHocAmnt" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>No. of times PSQ not Given</label> <input
										placeholder="No. of times PSQ not Given" type="text" disabled
										name="psqGivenNo" id="psqGivenNo" class="form-control" />
								</div>
								
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Salary</label> <input type="text" name="empSalary"
										onblur="this.value = validateNumber1(this.value);"
										placeholder="Emp Salary" id="empSalary" class="form-control" />
								</div>

								<!-- <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<span class="required">*</span>&nbsp;	<label>Emp Updated on</label> <input type="text" disabled
										placeholder="Emp Updated on" name="empUpdatedOn"
										id="empUpdatedOn" class="form-control" />
								</div> -->
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Training Period</label> <input type="text"
										placeholder="Emp Training Period" name="empTrainingPeriod"
										id="empTrainingPeriod" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Training Period Amount </label> <input type="text"
										placeholder="Emp Training Period Amt" name="empTrainingPrdAmt"
										onblur="this.value = validateNumber1(this.value);"
										id="empTrainingPrdAmt" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp HRMS Id</label>
									<input type="text" placeholder="Emp HRMS Id" name="empHRMSId"
										id="empHRMSId" value="" class="form-control" />
								</div>
								
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Created on</label> <input type="text" disabled
										placeholder="Emp Created on" name="empCreatedOn"
										id="empCreatedOn" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp; <label>Emp
										Password</label> <input type="password" value="" name="empPass"
										placeholder="Emp Password" id="empPass" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Blocked (Y/N)</label> <input type="text"
										id="empBlocked" disabled class="form-control" value="No" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Mobile No</label> <input type="text" name="empPhnNo"
										placeholder="Emp Mobile No" id="empPhnNo" class="form-control" />
								</div>
								
								
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp	Active/Inactive</label> <input type="text" id="actInActC" disabled
										class="form-control" value="Active" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Stores
										/ DC Id</label> <select id="empStoreDc" name="empStoreDc"
										class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Emp Zone
										Id</label> <select id="empZoneId" class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Company
										Id</label> <input type="text" placeholder="Emp Company Id"
										name="empComId" id="empComId" disabled value=""
										class="form-control" />
								</div>
								

							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Company Mail Id</label> <input type="text"
										placeholder="Emp Company Mail Id" name="empCustMId"
										id="empCustMId" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp
										Personal Mail Id</label> <input type="text"
										placeholder="Emp Personal Mail Id" name="empPersonalMailId"
										id="empPersonalMailId" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Discount %</label> <input type="text"
										placeholder="Discount %" name="dscctPercentage"
										id="dscctPercentage" class="form-control"
										onblur="this.value = discountPerctageDec(this.value);" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Flat Amount Discount</label> <input type="text"
										placeholder="Flat Amount Discount" name="flatAmtDiss"
										onblur="this.value = discountPerctageDec(this.value);"
										id="flatAmtDiss" class="form-control" />
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span><label>Weighing Scale Flag</label>
									 <select id="wsFlagC" name="wsFlagC" class="form-control">
										<option value="" label="--Select--" />	
										<option value="True">Yes</option>
										<option value="False">No</option>
										</select>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span><label>Stock Check Flag</label>
									 <select id="scFlagC" name="scFlagC" class="form-control">
										<option value="" label="--Select--" />	
										<option value="true">Yes</option>
										<option value="false">No</option>
										</select>
								</div>
							</div>
						</div>

						<div class="clearfix">&nbsp;</div>
						<div class="modal-footer  text-center">
							<button class="btn btn-primary btn-sm" type="submit"
								name="saveC" id="saveC">
								<i class="fa fa-plus fa-lg"></i> Create
							</button>
							<button type="button" class="btn btn-warning btn-sm" id="cancelEmp"
								data-dismiss="modal">
								<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- EDIT DESIGNATION DETAILS ######################################## -->
<div class="modal fade" id="editDestionDetails" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h2 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Edit Designation
					Details
				</h2>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<input id="DesigntnE" type="hidden" />
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Company Name</label> <input type="text" disabled
								class="form-control" placeholder="Company Name" id="companyNmeE"
								name="companyNmeE">
						</div>
					</div>


					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<h4>Designation details</h4>
						<div class="heading-block-action"></div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridDE"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Department Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary btn-sm" type="submit"
					name="saveDesgntnDetE" id="saveDesgntnDetE">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
		</div>
	</div>
</div>

<!-- EDIT EMPLOYEE DETAILS ######################################## -->
<div class="modal fade" id="editEmpDetE" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;
				</button>
				<!--  Title Goes Here -->
				<h2 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="employeeEditableLabel"></label>
				</h2>
			</div>
			<!-- Modal Create employee Master edit Body -->
			<div class="modal-body">
				<div class="container sentParcel-Edit">
					<form class="form-horizontal" id="empDetEditE" action="javascript:void(0);">
						<div class="mobile-responsive">
							<div class="row">
							<input id="empE" type="hidden" />
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Id</label> <input type="text" disabled name="empIdE"
										placeholder="Emp Id." id="empIdE" class="form-control" />
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<span class="required">*</span>&nbsp;	<label>Emp Name</label> <input type="text" name="empNameE"
										placeholder="Emp Name" id="empNameE" class="form-control" />
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Date of Joining</label>
									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											id="empDateJoinE" placeholder="DD/MM/YYYY"> <label
											for="empDateJoinE" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Date of Leaving</label>
									<div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
											id="empDateLeaveE" placeholder="DD/MM/YYYY"> <label
											for="empDateLeaveE" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
								</div>
							
							</div>
							<div class="row">
										<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<span class="required">*</span>&nbsp;	
								<label>Emp Department</label> <select id="empDeptE" name="empDeptE"
										class="form-control">
										<option value="" selected>--Select--</option>
										</select>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<span class="required">*</span>&nbsp;	<label>Emp. Part Time</label> <select id="empPartTimeE" name="empPartTimeE"
										class="form-control">
										<option value="" selected>--Select--</option>
										<option value="Yes">P</option>
										<option value="No">F</option>
									</select>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<span class="required">*</span>&nbsp;	<label>Address 1</label> <input type="text" name="address1E"
										placeholder="Address 1" id="address1E" class="form-control" />
								</div>
									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Address 2</label> <input type="text" name="address2E"
										placeholder="Address 2" id="address2E" class="form-control" />
								</div>                               
							</div>
							<div class="row">		
								 <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Address 3</label> <input type="text" name="address3E"
										placeholder="Address 3" id="address3E" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Region</label> <select id="empRegionE" name="empRegionE"
										class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>

							
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Stores / DC </label> <select id="StoreDcE" name="StoreDcE"
										class="form-control">
										<option value="" selected>--Select--</option>
										<option value="Store">Store</option>
									<option value="DC">DC</option>
									</select>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Role</label> <select id="empRoleE" name="empRoleE"
										class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
							</div>
							<div class="row">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Stock Check Role</label> <select
										id="stkChkRoleE" name="stkChkRoleE" class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>	
							  <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<span class="required">*</span>&nbsp;	<label>Emp Designation</label><select id="empDesignationE"  name="empDesignationE"
										class="form-control">
										<option value="" selected>--Select--</option></select> 
								</div>							
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Grade</label> <select id="empGradeE"  name="empGradeE"
										class="form-control">
										<option value="" selected>--Select--</option>										
									</select>
								</div>

								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Adhoc Amount</label> <input type="text"
										placeholder="Emp Adhoc Amount" name="empAdHocAmntE"
										onblur="this.value = validateNumber1(this.value);" id="empAdHocAmntE" class="form-control" />
								</div>
								<!-- <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp PSQ Eligibility</label>  <input type="text" id="empPSQEligibilityE" disabled 
									class="form-control" value="Yes"/>
								</div>	 -->	
							
														
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>No. of times PSQ not Given</label> <input
										placeholder="No. of times PSQ not Given" type="text" disabled
										name="psqGivenNoE" id="psqGivenNoE" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Salary</label> <input type="text" name="empSalaryE"
										onblur="this.value = validateNumber1(this.value);" placeholder="Emp Salary" id="empSalaryE" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<span class="required">*</span>&nbsp;	<label>Emp Updated on</label> <input type="text" disabled
										placeholder="Emp Updated on" name="empUpdatedOnE"
										id="empUpdatedOnE" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Training Period</label> <input type="text"
										placeholder="Emp Training Period" name="empTrainingPeriodE"
										id="empTrainingPeriodE" class="form-control" />
								</div>
								
							</div>
							<div class="row">						
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Training Period Amount </label> <input type="text"
										placeholder="Emp Training Period Amt"
										onblur="this.value = validateNumber1(this.value);" name="empTrainingPrdAmtE" id="empTrainingPrdAmtE"
										class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp HRMS Id</label> <input type="text" 
										placeholder="Emp HRMS Id" name="empHRMSIdE" id="empHRMSIdE"
										class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Created on</label> <input type="text" disabled
										placeholder="Emp Created on" name="empCreatedOnE"
										id="empCreatedOnE" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<span class="required">*</span>&nbsp;	<label>Emp Password</label> <input type="password" name="empPassE"
										placeholder="Emp Password" id="empPassE" class="form-control" />
								</div>			
							</div>
							<div class="row">	
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Blocked (Y/N)</label> <!-- <input type="text" id="empBlockedE" name="empBlockedE"  
									class="form-control"/> -->
								 <select id="empBlockedE" name="empBlockedE"
										class="form-control">
										<option value="" selected>--Select--</option>
										<option value="Yes" selected>Yes</option>
										<option value="No" selected>No</option>
									</select>
								</div>
                                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Mobile No</label> <input type="text" name="empPhnNoE"
										placeholder="Emp Mobile No" id="empPhnNoE" class="form-control" />
								</div>								
									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Active/Inactive</label> <select id="actInActE" name="actInActE"
										class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Stores / DC Id</label> <select id="empStoreDcE" name="empStoreDcE"
										class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
								
							</div>
							<div class="row">							
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Zone Id</label> <select id="empZoneIdE"
										class="form-control">
										<option value="" selected>--Select--</option>
									</select>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Company Id</label> <input type="text"
										placeholder="Emp Company Id" name="empComIdE" id="empComIdE" disabled value=""
										class="form-control" />
										
										 <input type="hidden"
										placeholder="Emp Company Id" name="empCompIdValEdit" id="empCompIdValEdit"
										class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Emp Company Mail Id</label> <input type="text"
										placeholder="Emp Company Mail Id" name="empCustMIdE"
										id="empCustMIdE" class="form-control" />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span>&nbsp;<label>Emp Personal Mail Id</label> <input type="text"
										placeholder="Emp Personal Mail Id" name="empPersonalMailIdE"
										id="empPersonalMailIdE" class="form-control" />
								</div>
												
							</div>	
							<div class="row">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Discount %</label> <input type="text"
									onblur="this.value = discountPerctageDec(this.value);" placeholder="Discount %" name="dscctPercentageE" id="dscctPercentageE"
										class="form-control" />
								</div>	
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Flat Amount Discount</label> <input type="text" id="flatAmtDissE" class="form-control"
										placeholder="Flat Amount Discount" name="flatAmtDissE"
										onblur="this.value = discountPerctageDec(this.value);"  />
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span><label>Weighing Scale Flag</label> 
									<select id="wsFlagE" name="wsFlagE" class="form-control">
										<option value="" selected>--Select--</option>
										<option value="Yes" selected>Yes</option>
										<option value="No" selected>No</option>
										</select>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<span class="required">*</span><label>Stock Check Flag</label>
									 <select id="scFlagE" name="scFlagE" class="form-control">
										<option value="" label="--Select--" />	
										<option value="Yes">Yes</option>
										<option value="No">No</option>
										</select>
								</div>
							</div>
							</div>
						<div class="clearfix">&nbsp;</div>
					<div class="modal-footer  text-center">
						<button class="btn btn-primary btn-sm" type="submit" name="saveE"
							id="saveE">
							<i class="fa fa-floppy-o fa-lg"></i> Save
						</button>
						<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
							<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
					</button>
				</div>
			<!--  Modal Window Content Started  -->			
			</form>
			</div>
		</div>
	</div>
 </div>
</div>

<script src="resource/oe/assets/js/app/employeeMaster.js"></script>
<script src="resource/oe/assets/js/app/roleEmployeeMaster.js"></script>
<script src="resource/oe/assets/js/app/designationMaster.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>