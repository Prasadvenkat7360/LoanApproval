<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :  Venkat 
	##	Date Creation 	: 	05-12-2019
	## 	Description		:   Loyalty Customer Search 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1 id="createHead">
						<i class="fa fa-users"></i> &nbsp; Customers  
					</h1>
					<h1 id="editHead">
						<i class="fa fa-users"></i> &nbsp; View Customers  
					</h1>
					<h1 id="issueHead">
						<i class="fa fa-credit-card"></i> &nbsp; Issue of Loyalty Card  
					</h1>
					<h1 id="wcHead">
						<i class="fa fa-share"></i> &nbsp; Send Welcome Letter
					</h1>
					<div class="heading-block-action" id="back">
						<a class="btn btn-primary btn-sm voffset" type="button"	id="backFromCreate"	href="javascript:showContentPage('loyaltyCustSearch','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
						<button class="btn btn-primary btn-sm voffset" type="button" id="enableDisable">
							<i class="fa fa-plus fa-lg"></i>&nbsp; Enable/Disable Edit Customer
						</button>
					</div>
				</div>
					<form class="form-horizontal" id="loyaltyCustomerForm" action="javascript: void(0)">
						<div class="row"  id="gridTabs">
							<div class="col-md-4" style="margin-left: 7px;">
							  <ul class="nav nav-tabs">
								<li id="home"><a data-toggle="tab" href="#tab0default" >
								  <i class="fa fa-search fa-lg">&nbsp;</i>Search Customer</a></li>
								  <li id="newCustomer"><a data-toggle="tab" href="#tab1default" >
								  <i class="fa fa-user fa-lg">&nbsp;</i>Add New Customer</a></li>
						     </ul></div>
						</div>
					<div class="adds-wrapper" id="createSection">
                        <div class="tab-content">
					<div id="tab0default" style="margin-top: 20px; margin-left:10px;">
					<div class="row" >
						<div class="col-sm-2">
							<label>Customer Id:</label> <input type="text" class="form-control" placeholder="Customer ID" id="customerIdS" name="customerIdS"> 
						</div>
						
						<div class="col-sm-2">
							<label>Customer Name:</label> <input type="text" class="form-control" placeholder="Customer Name" id="custNameS" name="custNameS"> 
						</div>
						
						<div class="col-sm-2">
							<label>Contact Number:</label> <input type="text" class="form-control" placeholder="Contact Number" id="contactNoS" name="contactNoS"> 
						</div>
							
						<div class="col-sm-2">
							<label>Loyalty Card:</label> <input type="text" class="form-control" placeholder="Loyalty Card" id="loyaltyIdS" name="loyaltyIdS"> 
						</div>
								
					</div>
						<!-- Row 1 ended  -->
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
						</div>
						
						<div class="clearfix">&nbsp;</div>
						<!-- JqGrid Started for search-->
						<div style="position: relative; z-index: 1;  padding :10px;">
							<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
						<!-- JqGrid Ended -->
						<div class="clearfix">&nbsp;</div>
					</div>
					<div id="tab1default" style="margin-top: 20px; margin-left:10px;">
						<h4>
							<i class="fa fa-plus"></i> &nbsp;Add New Customer 
						</h4>
						<div class="row">
							<div class="col-sm-4">
								<span class="required">*</span><label>Type : </label> <select id="typeC" class="form-control"
								style="margin-top: -23px; margin-left: 44px;">
									<option value="">--Select--</option>
								</select>
							<span id="typeField" class="error" style="margin-left: 40px;">Type is Required</span>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span><label>Customer Name : </label>
							</div>
							<div class="col-sm-1" style="margin-left: -105px;margin-top: -3px;">
								<select id="titleC" class="form-control">
									<option value="">--Select--</option>
								</select>
								<span id="titleField" class="error">Title is Required</span>
							</div>
							<div class="col-sm-3" style="margin-left: -30px; margin-top: -3px;">
								<input type="text" class="form-control" placeholder="First Name" id="fNameC" name="fNameC">
								<span id="fnameField" class="error">First Name is Required</span>
							</div>
							<div class="col-sm-3" style="margin-left: -30px; margin-top: -3px;">
								<input type="text" class="form-control" placeholder="Middle Name" id="mNameC" name="mNameC">
							</div>
							<div class="col-sm-3" style="margin-left: -30px; margin-top: -3px;">
								<input type="text" class="form-control" placeholder="Last Name" id="lNameC" name="lNameC">
								<span id="lNameField" class="error">Last Name is Required</span>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row">
							<div class="col-sm-4">
								<span class="required">*</span><label>Gender : </label>
								<select id="genderC" class="form-control">
									<option value="">--Select--</option>
								</select>
							<span id="genderField" class="error">Gender is Required</span>
							</div>
							<div class="col-sm-4">
								<span class="required">*</span><label>Address1 : </label>
								<input type="text" class="form-control" placeholder="Address1" id="address1C" name="address1C">
								<span id="addressrField" class="error">Address is Required</span>
								
							</div>
							<div class="col-sm-4">
								<label>Address2 : </label>
								<input type="text" class="form-control" placeholder="Address2" id="address2C" name="address2C">
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row">
							<div class="col-sm-4">
								<label>Address3 : </label>
								<input type="text" class="form-control" placeholder="Address3" id="address3C" name="address3C">
							</div>
							<div class="col-sm-4">
								<label>PAN Number : </label>
								<input type="text" class="form-control" placeholder="PAN Number " id="panNoC" name="panNoC">
								<span id="lblPANCard" class="error">Invalid PAN Number</span>
							</div>
							<div class="col-sm-4">
								<span class="required">*</span><label>Mobile1 : </label>
								<input type="text" class="form-control" placeholder="Mobile1" id="mobile1C" name="mobile1C">
								<span id="mobileField" class="error">Mobile Number is Required</span>
								<span id="lblMobile1" class="error">Invalid Mobile Number</span>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row">
							<div class="col-sm-4">
								<label>Mobile2 : </label>
								<input type="text" class="form-control" placeholder="Mobile2" id="mobile2C" name="mobile2C">
							</div>
							<div class="col-sm-4">
								<label>Land Line (<i class="fa fa-home"></i>): </label>
								<input type="text" class="form-control" placeholder="Land Line(Home)" id="landLineH" name="landLineH">
							</div>
							<div class="col-sm-4">
								<label>Land Line (<i class="fa fa-briefcase"></i>): </label>
								<input type="text" class="form-control" placeholder="Land Line(Office)" id="landLineO" name="landLineO">
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row">
							<div class="col-sm-4">
								<span class="required">*</span><label>Country : </label>
								<select id="countryC" class="form-control">
									<option value="">--Select--</option>
								</select>
								<span id="countryField" class="error">Country is Required</span>
								
							</div>
							<div class="col-sm-4">
								<span class="required">*</span><label>State : </label>
								<select id="stateC" class="form-control">
									<option value="">--Select--</option>
								</select>
								<span id="stateField" class="error">State is Required</span>
							</div>
							<div class="col-sm-4">
								<span class="required">*</span><label>City : </label>
								<select id="cityC" class="form-control">
									<option value="">--Select--</option>
								</select>
							<span id="cityField" class="error">City is Required</span>
								
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row">
							<div class="col-sm-4">
								<span class="required">*</span><label>Email : </label>
								<input type="text" class="form-control" placeholder="Email" id="emailC" name="emailC">
								<span id="emailField" class="error">Email is Required</span>
								<span id="lblEmail" class="error">Invalid Email Id</span>
								
							</div>
							<div class="col-sm-4">
								<span class="required">*</span><label>Pin Code : </label>
								<input type="text" class="form-control" placeholder="Pin Code" id="pinCodeC" name="pinCodeC">
								<span id="pinCodeField" class="error">Pin Code is Required</span>
								<span id="lblPinCode" class="error">Invalid Pin Code</span>
							</div>
							
							<div class="col-sm-4">
								<label>GSTIN No: </label>
								<input type="text" class="form-control" placeholder="GSTIN No" id="gstinNoC" name="gstinNoC">
								<span id="lblGstinNo" class="error">Invalid GSTIN No</span>
								
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row">	
							<div class="col-sm-4">
								<label>Aadhar Card No: </label>
								<input type="text" class="form-control" placeholder="Aadhar Card No" id="adharCardC" name="adharCardC">
								<span id="lblAdharNo" class="error">Invalid Aadhar No</span>
								
							</div>
						</div>
						<div class="row"  align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="addC" id="addC">
								<i class="fa fa-user fa-lg"></i> Add Customer
							</button>
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="additionalDetC" id="additionalDetC">
								<i class="fa fa-plus fa-lg"></i> Add Additional Customer/Loyalty Details
							</button>
						</div>
						<div class="clearfix"></div>
						<div class="row" style="margin-top:10px;">
						
						<div id="addtionalDetails">
						<div class="col-sm-10">
							<div class="panel panel-default">
								<div class="panel-heading">
								   <h4 class="panel-title"><a class="accordion-toggle" id="toggle"><b>Add Additional Customer/Loyalty Information :</b></a></h4>				      
						    	</div>
									<div id="panel1"  class="panel-collapse collapse">
										<div class="panel-body">
											<div class="row">
												<div class="col-sm-2">
												<label>Title: </label>	
													<select id="titleLC" class="form-control">
													<option value="">--Select--</option>
													</select>
												</div>
												
												<div class="col-sm-2">
													<label>Spouse Name: </label>
													<input type="text" class="form-control" placeholder="Spouse Name" id="spouseNameC" name="spouseNameC">
												</div>
												
												<div class="col-sm-2">
												<label>Gender: </label>
													<select id="genderLC" class="form-control">
													<option value="">--Select--</option>
													</select>
												</div>
												
												<div class="col-sm-2">
													<label>Spouse DOB</label>
													<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
													 name="spouseDobC" id="spouseDobC" placeholder="DD/MM/YYYY">
													<label for="spouseDobC" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       			</div>
							  					</div>
							  					 <div class="col-sm-3">
													<label>Spouse Mobile Number: </label>
													<input type="text" class="form-control" placeholder="Spouse Mobile Number" id="spouseMblNoC" name="spouseMblNoC">
												</div>
							  					 
												<div class="col-sm-2">
												<label></label>
													<button class="btn btn-primary" data-toggle="modal"
														data-target="#addChildren" type="button" id="noOfChildrens" style="margin-top:15px;">
														<i class="fa fa-plus"></i> &nbsp;Add Children
													</button>
												</div>
												
												<div class="col-sm-2">
												<label>Loyalty : </label>	
													<select id="loyaltyC" class="form-control">
													<option value="">--Select--</option>
													<option value="1">Yes</option>
													<option value="0">No</option>
													</select>
												</div>
												<div class="col-sm-2">
													<label>Spouse Email: </label>
													<input type="text" class="form-control" placeholder="Spouse Email" id="spouseEmailC" name="spouseEmailC">
												</div>
												
												
												<div class="col-sm-2">
												<span class="required" id="lTierC">*</span><label>Loyalty Tier: </label>
													<select id="loyaltyTierC" class="form-control">
													<option value="">--Select--</option>
													</select>
												</div>
												
												
												
												<div class="col-sm-3">
													<label>Loyalty Point Accural/Redemption: </label>
													<input type="text" class="form-control" placeholder="Loyalty Point Accural/Reedmption" id="lpReedmptionC" name="lpReedmptionC">
												</div>
												
												<div class="col-sm-2">
												<label>Intimation : </label>	
													<select id="intimationC" class="form-control">
													<option value="">--Select--</option>
													<option value="yes">Yes</option>
													<option value="no">No</option>
													</select>
												</div>
												
												<div class="col-sm-2">
													<label>Anniversary Date</label>
													<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
													 name="anniversaryDateC" id="anniversaryDateC" placeholder="DD/MM/YYYY">
													<label for="anniversaryDateC" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       			</div>
							  					</div>
							  					
							  					<div class="col-sm-2">
													<label>Customer DOB</label>
													<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
													 name="custDobC" id="custDobC" placeholder="DD/MM/YYYY">
													<label for="custDobC" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       			</div>
							  					</div>
							  					
							  					<div class="col-sm-2">
												<span class="required" id="intTypeC">*</span><label>Intimation Type : </label>	
													<select id="intimationTypeC" class="form-control">
													<option value="">--Select--</option>
													<option value="SMS">SMS</option>
													<option value="Mail">Mail</option>
													<option value="Courier">Courier</option>
													<option value="Postal">Postal</option>
													<option value="Phone">Phone</option>
													<option value="Whatsapp">Whatsapp</option>
													</select>
												</div>
											</div>
											<div class="clearfix">&nbsp;</div>
											<div class="row">
												<div class="col-md-12 form-field">
													<div id="jqxgridT"
														style="font-size: 13px; font-family: Verdana; position: relative;"></div>
												</div>
											</div>
											
								      	</div>
							 	   	</div>
								</div>
							</div>
						</div></div>
						
					</div><br/>
						
					</div>
					
					
					</div>
					
					<div id="editSection">
						<input type="hidden" id="loyaltyFlag" disabled/>
						<div class="row">						
							<div class="col-sm-2">
								<label>Customer Id</label> 
								<input type="text" class="form-control"	 id="custIdE" name="custIdE" disabled>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span><label>Type : </label> <select id="typeE" class="form-control" disabled>
									<option value="">--Select--</option>
								</select>
							</div>
						</div>
							
						<div class="row" style="margin-top:10px;">
							<div class="col-sm-2">
								<span class="required">*</span><label>Customer Name : </label>
							</div>
							<div class="col-sm-1" style="margin-left: -105px;margin-top: -3px;">
								<select id="titleE" class="form-control" disabled>
									<option value="">--Select--</option>
								</select>
							</div>
							<div class="col-sm-3" style="margin-left: -30px;margin-top: -3px;">
								<input type="text" class="form-control" placeholder="First Name" id="fNameE" name="fNameE" disabled>
							</div>
							<div class="col-sm-3" style="margin-left: -30px;margin-top: -3px;">
								<input type="text" class="form-control" placeholder="Middle Name" id="mNameE" name="mNameE" disabled>
							</div>
							<div class="col-sm-3" style="margin-left: -30px;margin-top: -3px;">
								<input type="text" class="form-control" placeholder="Last Name" id="lNameE" name="lNameE" disabled>
							</div>
						</div>
						<div class="row">
							 <div class="col-md-3">
								<span class="required">*</span><label>Gender : </label> <select id="genderE" class="form-control" disabled>
									<option value="">--Select--</option>
								</select>
							</div>
							<div class="col-sm-3">
								<span class="required">*</span><label>Address1 :</label> 
								<input type="text" class="form-control"	 id="address1E" name="address1E" disabled>
							</div>
							<div class="col-sm-3">
								<label>Address2 :</label> 
								<input type="text" class="form-control"	 id="address2E" name="address2E" disabled>
							</div>
							<div class="col-sm-3">
								<label>Address3 :</label> 
								<input type="text" class="form-control"	 id="address3E" name="address3E" disabled>
							</div>
						</div>
						<div class="row">	
							<div class="col-md-3">
								<label>PAN Number</label> 
								<input type="text" class="form-control"	 id="panNoE" name="panNoE" disabled>
							</div>
							<div class="col-md-3">
								<span class="required">*</span><label>Mobile 1:</label> 
								<input type="text" class="form-control"	 id="mobile1E" name="mobile1E" disabled>
								<span id="mobileFieldE" class="error">Mobile Number is Required</span>
								<span id="lblMobile1E" class="error">Invalid Mobile Number</span>
							</div>
							<div class="col-md-3">
								<label>Mobile 2:</label> 
								<input type="text" class="form-control"	 id="mobile2E" name="mobile2E" disabled>
							</div>
							
							<div class="col-md-3">
								<label>Land Line(<i class="fa fa-home"></i>):</label> 
								<input type="text" class="form-control"	 id="landLineHE" name="landLineHE" disabled>
							</div>
						</div>
						<div class="row">
							<div class="col-md-3">
								<label>Land Line(<i class="fa fa-briefcase"></i>):</label> 
								<input type="text" class="form-control"	 id="landLineOE" name="landLineOE" disabled>
							</div>
							<div class="col-md-3">
								<span class="required">*</span><label>Country : </label> <select id="countryE" class="form-control" disabled>
									<option value="">--Select--</option>
								</select>
							</div>
							<div class="col-md-3">
								<span class="required">*</span><label>State : </label> <select id="stateE" class="form-control" disabled>
									<option value="">--Select--</option>
								</select>
							</div>
							<div class="col-md-3">
								<span class="required">*</span><label>City : </label> <select id="cityE" class="form-control" disabled>
									<option value="">--Select--</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col-md-3">
								<span class="required">*</span><label>Email:</label> 
								<input type="text" class="form-control"	 id="emailE" name="emailE" disabled>
								<span id="emailFieldE" class="error">Email is Required</span>
								<span id="lblEmailE" class="error">Invalid Email Id</span>
							</div>
							
							<div class="col-md-3">
								<span class="required">*</span><label>Pin Code:</label> 
								<input type="text" class="form-control"	 id="pinCodeE" name="pinCodeE" disabled>
								<span id="pinCodeFieldE" class="error">Pin Code is Required</span>
								<span id="lblPinCodeE" class="error">Invalid Pin Code</span>
							</div>
							<div class="col-md-3">
								<label>GSTIN No:</label> 
								<input type="text" class="form-control"	 id="gstinE" name="gstinE" disabled>
								<span id="lblGstinNoE" class="error">Invalid GSTIN No</span>
								
							</div>
								<div class="col-md-3">
								<label>Aadhar Card No :</label> 
								<input type="text" class="form-control"	 id="adharNoE" name="adharNoE" disabled>
								<span id="lblAdharNoE" class="error">Invalid Aadhar No</span>
								
							</div>
						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="update" id="update" disabled>
								<i class="fa fa-user fa-lg"></i> Update Customer
							</button>							
							<button class="btn btn-primary btn-sm voffset" type="button" name="addDetE" id="addDetE" disabled>
								<i class="fa fa-plus fa-lg"></i> Add Additional Customer/Loyalty Information
							</button>							
						</div>
						
						<div class="row" style="margin-top:10px;">
						<div id="addtionalDetailsE">
						<div class="col-sm-10">
							<div class="panel panel-default">
								<div class="panel-heading">
								   <h4 class="panel-title"><a class="accordion-toggle" id="toggleE"><b>Add Additional Customer/Loyalty Information :</b></a></h4>				      
						    	</div>
									<div id="panelE"  class="panel-collapse collapse">
										<div class="panel-body">
											<div class="row">
												<div class="col-sm-2">
												<label>Title: </label>	
													<select id="titleLE" class="form-control" disabled>
													<option value="">--Select--</option>
													</select>
												</div>
												
												<div class="col-sm-2">
													<label>Spouse Name: </label>
													<input type="text" class="form-control" placeholder="Spouse Name" id="spouseNameE" name="spouseNameE" disabled>
												</div>
												
												<div class="col-sm-2">
												<label>Gender: </label>
													<select id="genderLE" class="form-control" disabled>
													<option value="">--Select--</option>
													</select>
												</div>
												
												<div class="col-sm-2">
													<label>Spouse DOB</label>
													<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control"
													 name="spouseDobE" id="spouseDobE" placeholder="DD/MM/YYYY">
													<label for="spouseDobC" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       			</div>
							  					</div>
							  					 <div class="col-sm-3">
													<label>Spouse Mobile Number: </label>
													<input type="text" class="form-control" placeholder="Spouse Mobile Number" id="spouseMblNoE" name="spouseMblNoE" disabled>
												</div>
							  					 
												<div class="col-sm-2">
												<label></label>
													<button class="btn btn-primary"  type="button" id="noOfChildrensE" style="margin-top:15px;" disabled>
														<i class="fa fa-plus"></i> &nbsp;Add Children
													</button>
												</div>
												
												<div class="col-sm-2">
												<label>Loyalty : </label>	
													<select id="loyaltyE" class="form-control" disabled>
													<option value="">--Select--</option>
													<option value="1">Yes</option>
													<option value="0">No</option>
													</select>
												</div>
												<div class="col-sm-2">
													<label>Spouse Email: </label>
													<input type="text" class="form-control" placeholder="Spouse Email" id="spouseEmailE" name="spouseEmailE" disabled>
												</div>
												
												
												<div class="col-sm-2">
												<span class="required" id="lTierE">*</span><label>Loyalty Tier: </label>
													<select id="loyaltyTierE" class="form-control" disabled>
													<option value="">--Select--</option>
													</select>
												</div>
												
												
												
												<div class="col-sm-3">
													<label>Loyalty Point Accural/Redemption: </label>
													<input type="text" class="form-control" placeholder="Loyalty Point Accural/Reedmption" disabled id="lpReedmptionE" name="lpReedmptionE">
												</div>
												
												<div class="col-sm-2">
												<label>Intimation : </label>	
													<select id="intimationE" class="form-control" disabled>
													<option value="">--Select--</option>
													<option value="yes">Yes</option>
													<option value="no">No</option>
													</select>
												</div>
												
												<div class="col-sm-2">
													<label>Anniversary Date</label>
													<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control"
													 name="anniversaryDateE" id="anniversaryDateE" placeholder="DD/MM/YYYY">
													<label for="anniversaryDateC" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       			</div>
							  					</div>
							  					
							  					<div class="col-sm-2">
													<label>Customer DOB</label>
													<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control"
													 name="custDobE" id="custDobE" placeholder="DD/MM/YYYY">
													<label for="custDobC" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       			</div>
							  					</div>
							  					
							  					<div class="col-sm-2">
												<span class="required" id="intTypeE">*</span><label>Intimation Type : </label>	
													<select id="intimationTypeE" class="form-control" disabled>
													<option value="">--Select--</option>
													<option value="SMS">SMS</option>
													<option value="Mail">Mail</option>
													<option value="Courier">Courier</option>
													<option value="Postal">Postal</option>
													<option value="Phone">Phone</option>
													<option value="Whatsapp">Whatsapp</option>
													</select>
												</div>
											</div>
											<div class="clearfix">&nbsp;</div>
											<div class="row">
												<div class="col-md-10 form-field">
													<div id="jqxgridE"
														style="font-size: 13px; font-family: Verdana; position: relative;"></div>
												</div>
											</div>
											
								      	</div>
							 	   	</div>
								</div>
							</div>
						</div></div>
					</div>
					<div id="issueLoyaltyCardSection">
					<div class="row">
						<div class="col-sm-2">
						<label>Customer Name : </label>
							<input type="hidden" class="form-control" placeholder="Customer Id" id="customerIdI" name="customerIdI" disabled>
							
							<input type="text" class="form-control" placeholder="Customer Name" id="customerNameI" name="customerNameI" disabled>
						</div>
						<div class="col-sm-2">
						<label>Loyalty Number : </label>
							<input type="text" class="form-control" placeholder="Loyalty Number" id="loyaltyNumI" name="loyaltyNumI" disabled>
						</div>
						<div class="col-sm-2">
						<label>Loyalty Created Date : </label>
							<input type="text" class="form-control" placeholder="Loyalty Created Date" id="loyaltyCreatedDateI" name="loyaltyCreatedDateI" disabled>
						</div>
						<div class="col-sm-2">
						<label>Loyalty Card Intimation : </label>
							<input type="text" class="form-control" placeholder="Loyalty Card Intimation" id="loyaltyCardIntimationI" name="loyaltyCardIntimationI" disabled>
						</div>
						<div class="col-sm-2">
						<label>Loyalty Tier Type : </label>
							<input type="text" class="form-control" placeholder="Loyalty Tier Type" id="loyaltyTierTypeI" name="loyaltyTierTypeI" disabled>
						</div>
						<div class="col-sm-2">
						<label>Loyalty Mode of Intimation : </label>
							<input type="text" class="form-control" placeholder="Loyalty Mode of Intimation" id="intimationModeI" name="intimationModeI" disabled>
						</div>
						<div class="col-sm-2">
						<label>Loyalty Card End Date : </label>
							<input type="text" class="form-control" placeholder="Loyalty Card End Date" id="loyaltyEndDateI" name="loyaltyEndDateI" disabled>
						</div>
					</div>
					<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="issueLoyaltyCard" id="issueLoyaltyCard">
								<i class="fa fa-credit-card"></i> Issue Loyalty Card
							</button>							
							<button class="btn btn-primary btn-sm voffset" type="button" name="clearCardDet" id="clearCardDet" >
								<i class="fa fa-times fa-lg"></i> Back
							</button>							
						</div>
					</div>
					
					<div id="generateLoyaltyWc">
					<div class="heading-block-action" id="back" style="margin-top: -50px;">
						<a class="btn btn-primary btn-sm voffset" type="button"	id="backFromCreate"	href="javascript:showContentPage('loyaltyCustSearch','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>
					<div class="row">
						<div class="col-sm-2">
							<span class="required">*&nbsp;</span><label>Mode : </label>
							<select id="modeC" name="modeC" class="form-control">
								<option value="" selected>--Select--</option>
								<option value="Mail">Mail</option>
								<option value="Postal">Postal</option>
							</select>
						</div>
						<input type="hidden" id="wcCustId" />
						<div class="col-sm-2" style="margin-top:15px;">
							<button class="btn btn-primary btn-sm voffset" type="button" name="sendWcletter" id="sendWcletter">
								<i class="fa fa-share"></i> Send
							</button>
						</div>
					</div>
					</div>
				</form>
			
				</div>
			</div>
		</div>
	</div>

<div class="modal fade" id="addChildren" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<!-- Modal Create Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp; Add Children Details</h3>
				
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createAvm" action="javascript:void(0);">
				<div class="col-sm-12">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">						
						<div class="col-md-3">
							<span class="required">*</span>&nbsp;<label>Child Name</label> 
							<input type="text" class="form-control"	 id="childNameC" name="childNameC">
						</div>
						<div class="col-sm-3">
							<span class="required">*</span><label>Child DOB</label>
								<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
									name="childDobC" id="childDobC" placeholder="DD/MM/YYYY">
									<label for="childDobC" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								</div>
						</div>
						
						<div class="col-md-3">
						<span class="required">*</span>&nbsp; <label>Gender</label> 
							<select id="childGenderC"	name="childGenderC" class="form-control">
								<option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-md-3">
							<label>Mobile Number</label> 
							<input type="text" class="form-control"	 id="childMobileNoC" name="childMobileNoC">
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
				</div>

				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create DC Master Footer -->
				<div class="modal-footer  text-center">
					<button type="button" class="btn btn-primary btn-sm" id="addChildRow" name="addChildRow"><i class="fa fa-plus"></i>&nbsp;Add Child Details</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"	id="Clear"><i class="fa fa-times"></i>&nbsp;Clear</button>

				</div>
			</form>
		</div>
	</div>
</div>



<script src="resource/oe/assets/js/app/loyaltyCustSearch.js" type="text/javascript"></script>

<style>
.dateBackground
{
	background-color:white !important;
}

.adds-wrapper{
	border: 1px solid #a4bed4;
	margin: 8px;
	margin-top: -1px;
	height :max-content !important;
}

.tab-content{
	box-sizing: border-box;
}
.validateView{
	border: 1px solid red !important;
}
.error
    {
        color: Red;
    }
</style>