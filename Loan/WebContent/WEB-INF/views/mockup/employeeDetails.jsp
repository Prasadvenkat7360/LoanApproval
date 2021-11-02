<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA :
	## 	Date Creation : 09/06/2016
 -->


<div class="main-container">
	<div class="container">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Employee Details Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i>&nbsp; Employee Details
					</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary voffset" id="empDetCreate"
							href="javascript:void(0);"><i class="fa fa-plus"></i>
							&nbsp;Create </a>
					</div>
				</div>
				<!-- Employee Details Heading Add Ended -->
				<div class="panel-group" id="accordion">
					<div id="panel-first" class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a class="accordion-toggle" data-toggle="collapse" id="employeeDet"
									data-parent="#accordion" href="#panel1"><i class="fa fa-info"></i>&nbsp;Employee Details</a>
							</h4>
						</div>
						<div id="panel1" class="panel-collapse collapse">
							<div class="panel-body">
								<div class="row">
									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<label>Employee ID</label> <input type="text"
											class="form-control" placeholder="Employee ID" id="empId">
									</div>

									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<label>HRMS ID</label> <input type="text" class="form-control"
											placeholder="HRMS ID" id="hrmsId">
									</div>

									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<label> Name</label> <input type="text" class="form-control"
											placeholder="Name" id="empName">
									</div>

									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<label>Region</label> <input type="text" class="form-control"
											placeholder="Region" id="empRegion">
									</div>
								</div>

								<div class="row">
									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<label>Designation</label> <input type="text"
											class="form-control" placeholder="Designation"
											id="empDesignation">
									</div>

									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<label>Date of Birth</label>
										<div class="input-group">
											<input type="text" class="date-picker form-control"
												id="empDob" placeholder="DD/MM/YYYY"> <label
												for="empDob" class="input-group-addon cursor"><span
												class="fa fa-calendar"></span></label>
										</div>
									</div>

									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<label>Date of Joining</label>
										<div class="input-group">
											<input type="text" class="date-picker form-control"
												id="empDoj" placeholder="DD/MM/YYYY"> <label
												for="empDoj" class="input-group-addon cursor"><span
												class="fa fa-calendar"></span></label>
										</div>
									</div>

									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<label>Date of Leaving</label>
										<div class="input-group">
											<input type="text" class="date-picker form-control"
												id="empDol" placeholder="DD/MM/YYYY"> <label
												for="empDol" class="input-group-addon cursor"><span
												class="fa fa-calendar"></span></label>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<label>Grade</label> <input type="text" class="form-control"
											placeholder="Grade" id="empGrade">
									</div>

									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<label>Department</label> <input type="text"
											class="form-control" placeholder="Department" id="empDept">
									</div>

									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<label>Employment Type</label> <input type="text"
											class="form-control" placeholder="Employment Type"
											id="empType">
									</div>

									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<label>Mobile No</label> <input type="text"
											class="form-control" placeholder="Mobile No" id="empMob">
									</div>
								</div>

								<div class="row">
									<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
										<label>Email ID</label> <input type="text"
											class="form-control" placeholder="Email ID" id="empEmail">
									</div>
								</div>
								<div class="text-center">
									<button class="btn btn-primary" id="next-step"><i class="fa fa-arrow-right fa-lg"></i>&nbsp;Next</button>
								</div>
							</div>
						</div>
					</div>
					<div id="panel-second" class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a class="accordion-toggle" data-toggle="collapse"
									data-parent="#accordion" href="#panel2"><i class="fa fa-info fa-lg"></i>&nbsp;Personal Details</a>
							</h4>
						</div>
						<div id="panel2" class="panel-collapse collapse">
							<div class="panel-body">
							<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Address 1</label> <input type="text" class="form-control"
										placeholder="Address 1" id="empAdd1">
								</div>
								
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Address 2</label> <input type="text" class="form-control"
										placeholder="Address 2" id="empAdd2">
								</div>
								
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Address 3</label> <input type="text" class="form-control"
										placeholder="Address 3" id="empAdd3">
								</div>
								
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Adhoc Amount</label> <input type="text" class="form-control"
										placeholder="Adhoc Amount" id="empAdhoAmnt">
								</div>
								</div>
								
								<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>PSQ Eligibility</label> <input type="text" class="form-control"
										placeholder="PSQ Eligibility" id="empPSQ">
								</div>
								
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>No of Times PSQ given</label> <input type="text" class="form-control"
										placeholder="No of Times PSQ given" id="empGivenPSQ">
								</div>
								
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Salary /PM</label> <input type="text" class="form-control"
										placeholder="Salary /PM" id="empSalary">
								</div>
								
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Training Period</label> <input type="text" class="form-control"
										placeholder="Training Period" id="empTrainingPeriod">
								</div>
								</div>
								
								<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Store ID</label> <input type="text" class="form-control"
										placeholder="Store ID" id="empStoreId">
								</div>									
								
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Company ID</label> <input type="text" class="form-control"
										placeholder="Company ID" id="empCompId">
								</div>
								
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Blocked</label> <input type="text" class="form-control"
										placeholder="Blocked" id="empBlocked">
								</div>
								
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
									<label>Status</label> <input type="text" class="form-control"
										placeholder="Status" id="empStatus">
								</div>
								</div>
								<div class="text-center">
										<button align="center" class="btn btn-primary" id="save-step"><i class="fa fa-floppy-o fa-lg"></i>&nbsp;Save</button>
								</div>
							</div>
						</div>
					</div>
					<div id="panel-third" class="panel panel-default">
						<div class="panel-heading">
							<h4 class="panel-title">
								<a class="accordion-toggle" data-toggle="collapse"
									data-parent="#accordion" href="#panel3"><i class="fa fa-list fa-lg"></i>&nbsp;Employee List</a>
							</h4>
						</div>
						<div id="panel3" class="panel-collapse collapse">
							<div class="panel-body">							
								<div id="pendingOrdersResults" class="narrow text-center">
									<div class="resposive-table-data narrow text-center">
										<table class="table table-bordered table-hover">
											<thead>
												<tr>
													<th>Emp ID</th>
													<th>HRMS ID</th>
													<th>Emp Name</th>
													<th>DOB</th>
													<th>DOJ</th>
													<th>Department</th>
													<th>Designation</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td></td>
													<td>
														<i class="fa fa-list fa-lg"></i>&nbsp;
														<i class="fa fa-pencil fa-lg"></i>
													</td>
												</tr>
											</tbody>
										</table>



									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/employeeDetails.js"></script>