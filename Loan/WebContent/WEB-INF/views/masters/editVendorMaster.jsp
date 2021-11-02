<!-- 
##	Author UI : Ajay Prasad
## 	Author JAVA : Ajay Prasad
## 	Date Creation : 27/05/2016
##  Modified By : Raksha
##  Modified Date : 06/09/2017
-->
<!-- Create Vendor Details Master Modal Pop-up Started ##########################  --><%@ taglib
	uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;
	</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
		<i class="fa fa-pencil-square-o"></i> &nbsp; Update Vendor Details
		Master

	</h3>
</div>
<!-- Modal Edit Vendor Details Master Body Started -->
<div class="modal-body">
	<div class="container sentParcel-Edit">
		<form action="#" method="post" name="updateVendor" id="updateVendor">
			<div class="tabmelting row">
				<div class="panel with-nav-tabs panel-primary">
					<div class="panel-heading">
						<ul class="nav nav-tabs">
							<li id="vendorProfile" class="active"><a data-toggle="tab"
								href="#edittabprimary"> <i class="fa fa-user fa-lg"></i>&nbsp;
									Vendor Profile

							</a></li>
							<li id="metalDetails"><a data-toggle="tab"
								href="#tab2primary"> <i class="fa fa-gavel fa-lg"></i>&nbsp;
									Metal Details

							</a></li>
							<li id="bankDetails"><a data-toggle="tab"
								href="#tab3primary"> <i class="fa fa-filter fa-lg"></i>&nbsp;
									Bank Details

							</a></li>
							<!-- <li id="taxDetails"><a data-toggle="tab" href="#tab4primary">
									<i class="fa fa-filter fa-lg"></i>&nbsp; Tax Details

							</a></li> -->
							<li id="otherCharges"><a data-toggle="tab"
								href="#tab5primary"> <i class="fa fa-filter fa-lg"></i>&nbsp;Other
									Charges

							</a></li>
							<li id="updationDetails"><a data-toggle="tab"
								href="#updatedetailstabprimary"> <i
									class="fa fa-filter fa-lg"></i>&nbsp;Updation Details

							</a></li>
							<li id="vendorReturn"><a data-toggle="tab"
								href="#tab7primary"> <i class="fa fa-filter fa-lg"></i>&nbsp;Vendor
									Return Terms

							</a></li>
							<li id="thirdPartyVendor"><a data-toggle="tab"
								href="#tab8primary"> <i class="fa fa-filter fa-lg"></i>&nbsp;Third
									Party Vendor

							</a></li>
							<li id="handleCharges"><a data-toggle="tab"
								href="#tab9primary"> <i class="fa fa-filter fa-lg"></i>&nbsp;Handling
									Charges

							</a></li>
							<li id="taxDetailsEdit"><a data-toggle="tab"
								href="#tab10primary"> <i class="fa fa-filter fa-lg"></i>&nbsp;Tax
									Details
							</a></li>
						</ul>
					</div>
					<div class="panel-body panel-body-fixed-height">
						<div class="tab-content">
							<!--  Tab 1 Started  -->
							<div id="edittabprimary" class="tab-pane fade in active">
								<div class="heading-block">
									<h4>Vendor Profile</h4>
								</div>
								<div class="row">
									<input type="hidden" id="vendorId" value="${vendor.id}">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">* </span> <label>Vendor Code </label> <input
											type="text" class="form-control" placeholder="Vendor Code"
											id="editVCode" name="editVCode" name="editVCode"
											value="${vendor.vendorCode}">
									</div>
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">* </span> <label>Vendor Name </label> <input
											type="text" class="form-control" placeholder="Vendor Name"
											id="editVName"  name="editVName"
											value="${vendor.vendorName}">
									</div>
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">* </span> <label>Vendor Type </label> <select 
											id="editVType" class="form-control" name="editVType">
											<c:forEach var="eVType" items="${vType}">
												<c:if test="${eVType.name == vendor.vendorType}">
													<option value="${eVType.id}" selected="selected">
														${eVType.name}</option>
												</c:if>
												<c:if test="${eVType.name != vendor.vendorType}">
													<option value="${eVType.id}">${eVType.name}</option>
												</c:if>
											</c:forEach>
										</select>
									</div>
								</div>
								<div class="row">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">* </span> <label>Address 1. </label> <input
											type="text" class="form-control" placeholder="Address 1."
											id="editAddress1" name="editAddress1"
											value="${vendor.address1}" >
									</div>
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Address 2. </label> <input type="text"
											class="form-control" placeholder="Address 2."
											id="editAddress2" name="editAddress2"
											value="${vendor.address2}">
									</div>
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Address 3. </label> <input type="text"
											class="form-control" placeholder="Address 3."
											id="editAddress3" name="editAddress3"
											value="${vendor.address3}">
									</div>
								</div>
								<div class="row">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">* </span> <label>Vendor Country
										</label> <select id="editVCountry" class="form-control" name="editVCountry">
											<c:forEach var="eVCountry" items="${vCountry}">
												<c:if test="${eVCountry.name == vendor.vendorCountry}">
													<option value="${eVCountry.id}" selected="selected">
														${eVCountry.name}</option>
												</c:if>
												<c:if test="${eVCountry.name != vendor.vendorState}">
													<option value="${eVCountry.id}">${eVCountry.name}
													</option>
												</c:if>
											</c:forEach>
										</select>
									</div>
									
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">* </span> <label>Vendor State </label>
										<select id="editVState" class="form-control" name="editVState">
											<c:forEach var="eVState" items="${vState}">
												<c:if test="${eVState.name == vendor.vendorState}">
													<option value="${eVState.id}" selected="selected">
														${eVState.code} - ${eVState.name}</option>
												</c:if>
												<c:if test="${eVState.name != vendor.vendorState}">
													<option value="${eVState.id}">${eVState.code} - ${eVState.name}</option>
												</c:if>
											</c:forEach>
										</select>
									</div>
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">* </span> <label>Vendor City </label> <select 
											id="editVCity" class="form-control">
											<c:forEach var="eVCity" items="${vCity}">
												<c:if test="${eVCity.name == vendor.vendorCity}">
													<option value="${eVCity.id}" selected="selected">
														${eVCity.name}</option>
												</c:if>
												<%-- <c:if test="${eVCity.name != vendor.vendorCity}">
													<option value="${eVCity.id}">${eVCity.name}</option>
												</c:if> --%>
											</c:forEach>
										</select>
									</div>
								</div>
								<div class="row">
								
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">* </span> <label>Vendor City
											PIN Code </label> <input type="text" pattern="\d*" maxlength="6"
											class="form-control" placeholder="Vendor City PIN Code"
											id="editVPin" name="editVPin" value="${vendor.pinCode}" >
									</div>
									
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">* </span> <label>Vendor Contact
											person-1 </label> <input type="text" class="form-control"
											placeholder="Vendor Contact person-1" id="editVContact1"
											name="editVContact1" value="${vendor.contact1}">
									</div>
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">* </span> <label>Vendor Contact
											person-1 Mobile </label> <input type="text" class="form-control"
											placeholder="Vendor Contact person-1 Mobile"
											id="editVContact1Mob" name="editVContact1Mob"
											value="${vendor.mobileNum1}">
									</div>
								</div>
								<div class="row">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Contact person-2 </label> <input type="text"
											class="form-control" placeholder="Vendor Contact person-2"
											id="editVContact2" name="editVContact2"
											value="${vendor.contact2}">
									</div>
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Contact person-2 Mobile </label> <input
											type="text" class="form-control"
											placeholder="Vendor Contact person-1" id="editVContact2Mob"
											name="editVContact2Mob" value="${vendor.mobileNum2}">
									</div>
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Telephone Number - Land Line </label> <input
											type="text" class="form-control"
											placeholder="Vendor Telephone Number - Land Line"
											id="editVContactLanline" name="editVContactLanline"
											value="${vendor.landLineNum}">
									</div>
								</div>
								<div class="row">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">* </span> <label>Vendor Email
											id-1 </label> <input type="text" class="form-control"
											placeholder="Vendor Email id-1" id="editVEmail1"
											name="editVEmail1" value="${vendor.email1}">
									</div>
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Email id-2 </label> <input type="text"
											class="form-control" placeholder="Vendor Email id-2"
											id="editVEmail2" name="editVEmail2" value="${vendor.email2}">
									</div>
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<label>Vendor Email id-3 </label> <input type="text"
											class="form-control" placeholder="Vendor Email id-3"
											id="editVEmail3" name="editVEmail3" value="${vendor.email3}">
									</div>
								</div>
								<div class="row">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">* </span> <label>Vendor Block
											Y/N </label> <select id="editVBlock" class="form-control">
											<c:forEach var="eVBlocked" items="${vBlocked}">
											c:out value="${vendor.vendorBlocked}"/>
												<c:if test="${eVBlocked.name == vendor.vendorBlocked}">
													<option value="${eVBlocked.id}" selected="selected">
														${eVBlocked.name}</option>
												</c:if>
												<c:if test="${eVBlocked.name != vendor.vendorBlocked}">
													<option value="${eVBlocked.id}">${eVBlocked.name}
													</option>
												</c:if>
											</c:forEach>
										</select>
									</div>
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
										<span class="required">* </span> <label>Vendor Internal
											Y/N </label> <select id="editVInternal" class="form-control">
											<c:forEach var="eVInternal" items="${vInternal}">
											<%-- <c:out value="${vInternal}"/>
											<c:out value="${vendor.internal}"/> --%>
												<c:if test="${eVInternal.name == vendor.internal}">
													<option value="${eVInternal.id}" selected="selected">
														${eVInternal.name}</option>
											 </c:if>
												<c:if test="${eVInternal.name != vendor.internal}">
													<option value="${eVInternal.id}">${eVInternal.name}
													</option>
												</c:if> 
											</c:forEach>
										</select>
									</div>
								</div>
							</div>
							<!--  Tab 2 Started  -->
							<div id="tab2primary" class="tab-pane fade">
								<div class="heading-block">
									<h4>Metal Details</h4>
								</div>
								<div class="row">
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Purity Testing Quantity Gold </label> <input
										type="number" class="form-control"
										placeholder="Vendor Purity Testing Quantity Gold"
										id="purityGold" name="purityGold" 
										value="${vendor.purityTestGoldQty}">
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Purity Testing Quantity Platinum </label> <input
										type="number" class="form-control"
										placeholder="Vendor Purity Testing Quantity Platinum"
										id="purityPlatinum" name="purityPlatinum"
										value="${vendor.purityTestPlatinumQty}">
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Purity Testing Quantity Silver </label> <input
										type="number" class="form-control"
										placeholder="Vendor Purity Testing Quantity Silver"
										id="puritySilver" name="puritySilver"
										value="${vendor.purityTestSilverQty}">
								</div>
								</div>
								<div class="row">
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Alloy % age </label> <input type="text"
										class="form-control" placeholder="Vendor Alloy % age"
										id="alloyAge" name="alloyAge"
										value="${vendor.alloyPercentage}"  onblur="this.value = validateNumberPercentage(this.value);">
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Credit Metal Limit Gold </label> <input
										type="text" class="form-control"
										placeholder="Vendor Credit Metal Limit Gold"
										id="creditMetalLimitGold" name="creditMetalLimitGold"
										value="${vendor.creditLimitGoldQty}" >
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Credit Metal Limit Platinum </label> <input
										type="text" class="form-control"
										placeholder="Vendor Credit Metal Limit Platinum"
										id="creditMetalLimitPlatinum" name="creditMetalLimitPlatinum"
										value="${vendor.creditLimitPlatinumQty}" >
								</div>
								</div>
								<div class="row">
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Credit Metal Limit Silver </label> <input
										type="text" class="form-control"
										placeholder="Vendor Credit Metal Limit Silver"
										id="creditMetalLimitSilver" name="creditMetalLimitSilver"
										value="${vendor.creditLimitSilverQty}" >
								</div>
								</div>
							</div>
							<!--  Tab 3 Started  -->
							<div id="tab3primary" class="tab-pane fade">
								<div class="heading-block">
									<h4>Bank Details</h4>
								</div>
								<div class="row">
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Bank Account No. </label> <input type="text"
										class="form-control" placeholder="Vendor Bank Account No."
										id="bankAcc" name="bankAcc"   value="${vendor.accountNumber}">
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Bank Code </label> <input type="text"
										class="form-control" placeholder="Vendor Bank Code"
										id="bankCode" name="bankCode"  value="${vendor.bankCode}">
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Bank Name </label> <input type="text"
										class="form-control" placeholder="Vendor Bank Name"
										id="bankName" name="bankName"  value="${vendor.bankName}">
								</div>
								</div>
								<div class="row">
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Bank Branch IFSC Code </label> <input type="text"
										class="form-control"
										placeholder="Vendor Bank Branch IFSC Code" id="bankIFSC"
										name="bankIFSC"  value="${vendor.ifsc}">
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Branch </label> <input type="text"
										class="form-control" placeholder="Vendor Branch" id="branch"
										name="branch" value="${vendor.bankBranch}">
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Currency Code </label> <input type="text"
										class="form-control" placeholder="Vendor Currency Code"
										id="currency" name="currency" value="${vendor.currencyCode}">
								</div>
								</div>
							</div>
							<!--  Tab 4 Started  -->
							<div id="tab4primary" class="tab-pane fade">
								<div class="heading-block">
									<h4>Tax Details</h4>
								</div>
								<div class="row">
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>PAN Number </label> <input type="text"
										class="form-control" placeholder="PAN Number" id="panNumber"
										name="panNumber"  value="${vendor.pan}" />
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor CST No. </label> <input type="text"
										class="form-control" placeholder="Vendor CST No." id="CST"
										name="CST" value="${vendor.cstNumber}"   value="${vendor.pan}" />
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor VAT No. </label> <input type="text"
										class="form-control" placeholder="Vendor VAT No." id="VAT"
										name="VAT" value="${vendor.vatNumber}"   />
								</div>
								</div>
								<div class="row">
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Service Tax No. </label> <input type="text"
										class="form-control" placeholder="Service Tax No."
										id="serviceTax" name="serviceTax"
										value="${vendor.serviceTaxNumber}"  value="${vendor.pan}" />
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Central Excise No. </label> <input type="text"
										class="form-control" placeholder="Central Excise No."
										id="centralExc" name="centralExc"
										value="${vendor.centralExciseNumber}"   value="${vendor.pan}" />
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor CST Tax % age </label> <input type="text"
										class="form-control" placeholder="Vendor CST Tax % age"
										id="CSTTaxPer" name="CSTTaxPer" value="${vendor.cst}"
										onblur="this.value = validateNumberPercentage(this.value);" />
								</div>
								</div>
								<div class="row">
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor VAT / GST Tax % age </label> <input type="text"
										class="form-control" placeholder="Vendor VAT / GST Tax % age"
										id="vendorVATPer" name="VATPer" value="${vendor.vat}" onblur="this.value = validateNumberPercentage(this.value);"   
										 />
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Central Excise % age </label> <input type="text"
										class="form-control" placeholder="Central Excise % age"
										id="centralExcPer" name="centralExcPer"
										value="${vendor.excise}"   onblur="this.value = validateNumberPercentage(this.value);"
										 />
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Surcharge % age </label> <input type="text"
										class="form-control" placeholder="Surcharge % age"
										id="surChargePer" name="surChargePer"
										value="${vendor.surcharge}"  onblur="this.value = validateNumberPercentage(this.value);"/>
								</div>
								</div>
								<div class="row">
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor GST Tax. </label> <input type="number"
										class="form-control" placeholder="Vendor GST Tax." id="GSTTax"
										name="GSTTax" value="${vendor.gstTax}" onblur="this.value = validateNumber(this.value);" />
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Service Tax </label> <input type="number"
										class="form-control" placeholder="Vendor Service Tax"
										id="ServTax" name="ServTax" value="${vendor.serviceTax}"
										 onblur="this.value = validateNumber(this.value);"/>
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Cess </label> <input type="text"
										class="form-control" placeholder="Vendor Cess" id="cess"
										name="cess" value="${vendor.cess}"  />
								</div>
								</div>
								<div class="row">
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor TAN Date </label>
									<div class="input-group">
										<input type="text" class="date-picker form-control"
											id="vendorTANDate" placeholder="DD/MM/YYYY" 
											value="${vendor.tanDate}"  data-validation-format="dd/mm/yyyy"> <label
											for="vendorTANDate" class="input-group-addon cursor">
											<span class="fa fa-calendar"></span>
										</label>
									</div>
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor TAN No.</label> <input type="text"
										class="form-control" placeholder="Vendor TAN No." id="TANNo"
										name="TANNo" value="${vendor.tanNumber}" >
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor TCS No. </label> <input type="text"
										class="form-control" placeholder="Vendor TCS No." id="TCSNo"
										name="TCSNo" value="${vendor.tcsNumber}" />
								</div>
								</div>
							</div>
							<!--  Tab 5 Started  -->
							<div id="tab5primary" class="tab-pane fade">
								<div class="heading-block">
									<h4>Other Charges</h4>
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Courier Charges </label> <input type="text"
										class="form-control" placeholder="Vendor Courirer Charges"
										id="courierCharge" name="courierCharge"
										value="${vendor.courierCharges}" onkeypress='return validateQty(event);'>
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Insurance Charges </label> <input type="text"
										class="form-control" placeholder="Vendor Insurance Charges"
										id="insuranceCharge" name="insuranceCharge"
										value="${vendor.insuranceCharges}" onkeypress='return validateQty(event);' >
								</div>
								<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Packing Charges </label> <input type="text"
										class="form-control" placeholder="Vendor Packing Charges"
										id="packingCharge" name="packingCharge"
										value="${vendor.packingCharges}" onkeypress='return validateQty(event);'>
								</div>
							</div>
							<!--  Tab 6 Started  -->
							<div id="updatedetailstabprimary" class="tab-pane fade">
								<div class="heading-block">
									<h4>Updation Details</h4>
								</div>
								<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Created on </label> <input type="text"
										class="form-control" id="editVCreated" disabled
										name="editVCreated" value="${vendor.createdDate}">
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">* </span> <label>Vendor Start
										Date </label>
									<div class="input-group">
										<input type="text" class="date-picker form-control"
											id="editVStartDate" placeholder="DD/MM/YYYY" disabled
											value="${vendor.vendorStartDate}"> <label
											for="editVStartDate" class="input-group-addon cursor">
											<span class="fa fa-calendar"></span>
										</label>
									</div>
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Updated on </label> <input type="text"
										class="form-control" id="editVUpdated" disabled
										name="editVUpdated" value="${vendor.updatedDate}">
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor Updated by </label> <input type="text"
										class="form-control" id="editVUpdatedBy" disabled
										name="editVUpdatedBy" value="${vendor.updatedBy}">
								</div>
							</div>
							<div class="row">
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">* </span> <label>Vendor
										Agreement uploaded Y/N </label> <select id="editVAgreementUploaded"
										class="form-control">
										<c:forEach var="eVAgreementUploaded"
											items="${vAgreementUploaded}">
											<c:if
												test="${eVAgreementUploaded.name == vendor.agreementUploaded}">
												<option value="${eVAgreementUploaded.id}"
													selected="selected">${eVAgreementUploaded.name}</option>
											</c:if>
											<c:if
												test="${eVAgreementUploaded.name != vendor.agreementUploaded}">
												<option value="${eVAgreementUploaded.id}">${eVAgreementUploaded.name}
												</option>
											</c:if>
										</c:forEach>
									</select>
									
									<!-- <button class="btn btn-primary voffset"  type="button"
									name="upload" id="upload" disabled>
									<i class="fa fa-upload fa-lg"></i> Upload
									</button> -->
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor last agreement uploaded on </label> <input
										type="text" class="form-control" id="editVLastAgre" disabled
										name="editVLastAgre" value="${vendor.agreementUploadedDate}">
								</div>
								<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Vendor last agreement uploaded by </label> <input
										type="text" class="form-control" id="editVAgrreUploaded"
										disabled name="editVAgrreUploaded"
										value="${vendor.agreementUploadedBy}">
								</div>
								 <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="uploadImage1">
									<label>Upload Agreement</label> 
										<div class="btn btn-primary btn-sm col-sm-6" style="padding:5px">
											<i class="fa fa-plus-circle fa-lg"></i> Browse 
											<input id='uploadImgC2' style="width:100px;" class="fileUpload btn btn-primary input-sm" type="file" name="uploadImgC2"/>
										</div>
			                            <input type="hidden" id = "vendorId1" name = "vendorId1"/>
				                  </div>
				              </div>
			                  <div class="row">
				                   <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="viewHref">
			                               <label  style="display: block;max-width: 100%;margin-bottom: 8px;font-weight: 700;">View Agreement</label> 
										   <a target="_blank" id="viewHrefId1" type="button"  href = "/uf/${vendor.agreementUploadPath}" style="margin:0px;padding: 7px 14px;background-color:#149078;color:white;">
										   <i class="fa fa-eye fa-sm"></i> View</a>
									</div>
			                  </div>
							</div>
							<!--  Tab 7 Started  -->
							<div id="tab7primary" class="tab-pane fade">
								<div class="heading-block">
									<h4>Vendor Return Terms</h4>
									<div class="table-heading-block-action">
										<button type="button" class="btn btn-primary btn-sm"
											id="addVendorReturn" name="generate">
											<i class="fa fa-plus fa-lg"></i>&nbsp;Add

										</button>
									</div>
								</div>
								<div class="clearfix">&nbsp;</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-12 form-field">
									<div class="voffset3" style="position: relative;">
										<div class="table-responsive">
											<!-- JqGrid Started -->
											<div style="position: relative; z-index: 1">
												<div id="jqxgridvrt"
													style="font-size: 13px; font-family: Verdana; float: left;"></div>
											</div>
											<!-- JqGrid Ended -->
										</div>
									</div>
								</div>
							</div>
							<!--  Tab 8 Started  -->
							<div id="tab8primary" class="tab-pane fade">
								<div class="heading-block">
									<h4>Third Party Vendor</h4>
									<div class="table-heading-block-action">
										<button type="button" class="btn btn-primary btn-sm"
											id="addThirdPartyVendor" name="generate">
											<i class="fa fa-plus fa-lg"></i>&nbsp;Add

										</button>
									</div>
								</div>
								<div class="clearfix">&nbsp;</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-12 form-field">
									<div class="voffset3" style="position: relative;">
										<div class="table-responsive">
											<!-- JqGrid Started -->
											<div style="position: relative; z-index: 1">
												<div id="jqxgridtpv"
													style="font-size: 13px; font-family: Verdana; float: left;"></div>
											</div>
											<!-- JqGrid Ended -->
										</div>
									</div>
								</div>
							</div>
							<!--  Tab 9 Started  -->
							<div id="tab9primary" class="tab-pane fade">
								<div class="heading-block">
									<h4>Handling Charges</h4>
									<div class="table-heading-block-action">
										<button type="button" class="btn btn-primary btn-sm"
											id="addVendorHandlingCharges" name="generate">
											<i class="fa fa-plus fa-lg"></i>&nbsp;Add

										</button>
									</div>
								</div>
								<div class="clearfix">&nbsp;</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-12 form-field">
									<div class="voffset3" style="position: relative;">
										<div class="table-responsive">
											<!-- JqGrid Started -->
											<div style="position: relative; z-index: 1">
												<div id="jqxgridvhc"
													style="font-size: 13px; font-family: Verdana; float: left;"></div>
											</div>
											<!-- JqGrid Ended -->
										</div>
									</div>
								</div>
							</div>
							<div id="tab10primary" class="tab-pane fade">
								<div class="heading-block">
									<h4>Tax Details</h4>
								</div>
								<div class="row">
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Is Vendor Registered</label>
									<select id="isVendRegisteredE" class="form-control">
											<c:forEach var="vRegister" items="${vRegister}" >
											<c:if
												test="${vRegister.name == vendor.isregister}">
												<option value="${vRegister.id}"
													selected="selected">${vRegister.name}</option>
											</c:if>
											<c:if
												test="${vRegister.name != vendor.isregister}">
												<option value="${vRegister.id}">${vRegister.name}
												</option>
											</c:if>
										</c:forEach>
										
										</select>
									</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>PAN Number</label> <input type="text"
										class="form-control" value="${vendor.pan}" id="panNumberE" 
										name="panNumberE" >
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>TAN Number</label> <input type="text"
										class="form-control" value="${vendor.tanNumber}" id="tanNumberE" 
										name="tanNumberE" >
								</div>
								 <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<label>TAN Date </label><div class="input-group">
										<input type="text" readonly = 'true' class="date-picker form-control dateBackground" id="tanDateE" placeholder="DD/MM/YYYY" 
											value="${vendor.tanDate}"  data-validation-format="dd/mm/yyyy"> <label
											for="tanDateE" class="input-group-addon cursor">
											<span class="fa fa-calendar"></span>
										</label>
									</div>
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Is FAS Tax</label>
									<select id="isFASTaxE" class="form-control">
											<c:forEach var="vFasTax" items="${vFasTax}" >
											<c:if
												test="${vFasTax.name == vendor.fasTax}">
												<option value="${vFasTax.id}"
													selected="selected">${vFasTax.name}</option>
											</c:if>
											<c:if
												test="${vFasTax.name != vendor.fasTax}">
												<option value="${vFasTax.id}">${vFasTax.name}
												</option>
											</c:if>
										</c:forEach>
										
										</select>
									</div>
									<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<br />
									<label style="color:#FF0000; font-size: 8pt; font-weight: bold;">For FAS use only.</label>
								</div>	
								</div>
								<div class="clearfix">&nbsp;</div>
							<div class="row">
								<div class="row voffset2" align="center">
									<button class="btn btn-primary voffset" type="button" name="addToGridE" id="addToGridE" disabled>
										<i class="fa fa-plus" aria-hidden="true" ></i>&nbsp;Add to Grid
									</button>
								</div>		
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-12 form-field">
									<div class="voffset3" style="position: relative;">
										<div class="table-responsive">
											<!-- JqGrid Started -->
											<div style="position: relative; z-index: 1">
												<div id="jqxgridC"
													style="font-size: 13px; font-family: Verdana; float: left;"></div>
											</div>
											<!-- JqGrid Ended -->
										</div>
									</div>
								</div>
								
								<!-- <div class="row">
								
							  
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>GSTIN No</label> <input type="text"
										class="form-control" value="" id="gstnNoE" 
										name="gstnNoE" >
								</div>
								
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Source State</label> 
										<select id="sourceStateE" name="sourceStateE" class="form-control">
									<option value="" selected label="Select" /></select>
								</div>
								
								</div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
<div class="clearfix">&nbsp;</div>
<!-- Modal Create Vendor Details Master Body Ended -->
<div class="modal-footer  text-center">
	<button class="btn btn-primary voffset" type="button" name="update"
		id="update">
		<i class="fa fa-floppy-o fa-lg"></i> Save

	</button>
	&nbsp;

	<button type="button" class="btn btn-warning" data-dismiss="modal">
		<i class="fa fa-times fa-lg"></i>&nbsp; Cancel

	</button>
</div>
<!-- Create Vendor Details Master Modal Pop-up Ended ##########################  -->
<!-- Edit FG Article Master Modal Pop-up Started ##########################  -->
<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>
<script type="text/javascript">
$('#editVName').on("change",function() {
	if (this.value.match(/[^a-zA-Z\s]/g)) {
		   this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
	}
});
$('#bankName').on("change",function() {
	if (this.value.match(/[^a-zA-Z\s]/g)) {
		   this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
	}
});
$('#bankAcc').on("change",function() {
	
		if (this.value.match(/[^a-z0-9{0,20}]/g)) {
			   this.value = this.value.replace(/[^a-z0-9{0,20}]/g, '');
		}
});
$('#bankCode').on("change",function() {
	
	if (this.value.match(/[^a-zA-Z0-9{0,20}]/g)) {
		   this.value = this.value.replace(/[^a-zA-Z0-9{0,20}]/g, '');
	}
});

$('#currency').on("change",function() {
	
	if (this.value.match(/[^a-zA-Z0-9{0,20}]/g)) {
		   this.value = this.value.replace(/[^a-zA-Z0-9{0,20}]/g, '');
	}
});
$('#branch').on("change",function() {
	
	if (this.value.match(/[^a-zA-Z0-9\s]/g)) {
		   this.value = this.value.replace(/[^a-zA-Z0-9\s]/g, '');
	}
});
$('#bankIFSC').on("change",function() {
	
	if (this.value.match(/[^a-zA-Z0-9\s]/g)) {
		   this.value = this.value.replace(/[^a-zA-Z0-9\s]/g, '');
	}
});
	//$("#jqxgridvrt").jqxGrid('addrow', null, "${vendor.vendorReturnTerms}");
	//vendor return term grid
	addVendorReturnTerm();
	//third party vendor
	addThirdPartyVendor();
	//vendor handling charges
	addVendorHandlingCharges();
	var $vCity = $('#editVCity');

/* 	$("#editVCity").on("change",function() {
			var vendorCityId = $('#editVCity').val();
			var $vendorState1 = $('#editVState');
			if (vendorCityId != "") {
				$.getJSON('/OrderExecution/api/v1/vendorMasterLOV?page=create&cityId='+ vendorCityId+ '&stateId=',function(data) {
					$("#editVState").empty().append('<option value="" selected>Select</option>');
					//iterate over the data and append a select option
					$.each(data.payload.vState,	function(key,val) {
					$("#editVState").append('<option value="' + val.id + '">'+ val.code + "-" + val.name+ '</option>');
				});
			});
	} else {
		$("#editVState").empty().append('<option value="" selected>Select</option>');
	}
}); */

/*   $("#editVState").on("change",function() {
		var vendorCityId = $('#editVCity').val();
		var vendorStateId = $('#editVState').val();
		var $vCountry = $('#editVCountry');
		if (vendorStateId != "") {
			$.getJSON('/OrderExecution/api/v1/vendorMasterLOV?page=create&cityId='+ vendorCityId+ '&stateId='+ vendorStateId,function(data) {
				$vCountry.empty().append('<option value="" selected>Select</option>');
				//iterate over the data and append a select option
				$.each(data.payload.vCountry,function(key,val) {
				$vCountry.append('<option value="' + val.id + '">'+ val.name+ '</option>');
				});
			});
		} else {
			$vCountry.empty().append('<option value="" selected>Select</option>');
		}
	}); */
  
  $("#editVCountry").on("change",function() {
		$.getJSON('/OrderExecution/api/v1/getAddressLOV?type=state'+'&id='+$("#editVCountry").val(), function(data) {
			$('#editVState').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.dto, function(key, val) {
				$('#editVState').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
		});
	});

	$("#editVState").on("change",function() {
		$.getJSON('/OrderExecution/api/v1/getAddressLOV?type=city'+'&id='+$("#editVState").val(), function(data) {
			$('#editVCity').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.dto, function(key, val) {
				$('#editVCity').append('<option value="' + val.id + '">' + val.description + '</option>');
			});
		});
	});
	
  // ############# File Upload ################
  
  function processFileUpload1(formId)
  {
  	  $.ajax({ url : "/OrderExecution/vendorAgreementUpload",
        data : new FormData(document.getElementById(formId)),
        type : "post",
        enctype: 'multipart/form-data',
        processData: false, 
        contentType:false,
        success : function(result) {
  			$.growl.notice({ message: "Successfully Uploaded Image For vendor Agreement", duration: 8000, title: 'Success'});	
        },
        error : function(result){
  			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Saving vendor Agreement Image !' });
        }
      });
  }
  
 // ################## Update Functionality ############
 
$("#update").on("click",function() {
	var value = $('#bankAcc').val()
	var isFASTaxE = $('#isFASTaxE').val();
	var data = /^[a-z0-9]{0,20}$/.test(value);
	
	if(isFASTaxE == "" || isFASTaxE == null)
	{
		$.growl.error({
			message : "Please select Is FAS Tax!.",
			duration : 8000,
			title : 'Error'
		});
		return false;
	}
	
	if(data == false)
		{
		$.growl.error({
			message : "Please Fill the Valid Account Number!.",
			duration : 8000,
			title : 'Error'
		});
		return false;
	}
	var rows = $('#jqxgridvrt').jqxGrid('getrows');
	 for (var i = 0; i < rows.length; i++) { 
		 var row = rows[i];
		 if(row.makingCharge == "" ||row.makingCharge == null){
			 $.growl.error({
				 message : "Please Enter Making Charge %",
				 duration : 10000,
				 title : 'Error'
			 })
			 return false;
		 	}
		 if(row.wastage == "" ||row.wastage == null ){
			 $.growl.error({
				 message : "Please Enter Wastage %",
				 duration : 10000,
				 title : 'Error'
			 })
			 return false;
		}
	 if(row.returnType == -1){
			 $.growl.error({
				 message : "Please Select Return Type",
				 duration : 10000,
				 title : 'Error'
			 })
			 return false;
		}
    }
	var vendMastEditDetS = prepareVendorMasterPostDataForEdit();
	var taxDetEdited = [];
	console.log(vendMastEditDetS);
	console.log(taxTabFlag);
	if(taxTabFlag == false){
		  $.getJSON('/OrderExecution/api/v1/getVendorGst?vId=' +$("#vendorId").val(), function(data) {
			   taxResponse = data.payload.VendorGst;
			   
			   $.each(taxResponse,function(k,v){
				   vendMastEditDetS.vendorTaxDetailDTOs.push(
							{
								"id" : v.id,
								"gstinNo" : v.gstinNo,
								"state" :  {
									"id" :  v.state.id,
								}		
							})
					});
			   
			   console.log(taxDetEdited);
				//taxComputationEditGrid(data.payload.VendorGst);	
			});
		  //vendMastEditDetS.vendorTaxDetailDTOs = taxDetEdited;
	}else{}
	setTimeout(function(){  

	  if(editFlagV == true){
		  console.log(vendMastEditDetS);
			 postJSON('/OrderExecution/api/v1/vendorMasterLOV/update',JSON.stringify(vendMastEditDetS),function(data) {
				if (data.resCode == "1") {	
					var  lab1 =  $('#vendorId1').val(data.payload.id);
					processFileUpload1("updateVendor");
					$.growl.notice({
						message : "Successfully Updated Vendor with code: "+ data.payload.code,
						duration : 10000,
						title : 'Success'
					});
					$('#editMasterModal').modal('hide');
					vendorDetailsMaster();
					$("#jqxgrid").jqxGrid("updatebounddata");
				}
				else{
					$.growl.error({
						message : data.mesgStr,
						duration : 10000,
						title : 'Error'
					});
				}
		 });  
	  }
	}, 1000);			 
});
	
$("#isVendRegE").on('change',function(){
    var isVendRegisteredE = $("#isVendRegE").val();
	if(isVendRegisteredE == "False"){
	   $("#addToGridE").prop('disabled', true);
	}
	else{
		$("#addToGridE").prop('disabled', false);
	}
});	

$("#uploadImgC2").change(function(){
	  if (this.files && this.files[0]) {
	      $("#viewHrefId1").attr('href',URL.createObjectURL(this.files[0]));
	  }
});

$("#viewHrefId1").on("click",function(){
	var editVAgreementUploaded =  $("#editVAgreementUploaded").val();
	if(editVAgreementUploaded == "No"){
		$.growl.error({ message:"Please  Upload the file to view the vendor Agreement!!", duration: 10000 });
	}
});

if($("#editVAgreementUploaded").val() == 'Yes'){
	$("#uploadImage1").show();
	$("#viewHref").show();
}else{
	$("#uploadImage1").hide();
	$("#viewHref").hide()
}

$("#editVAgreementUploaded").on("change",function(){
	if($("#editVAgreementUploaded").val() == 'Yes'){
		$("#uploadImage1").show();
		$("#viewHref").show();
	}else{
		$("#uploadImage1").hide();
		$("#viewHref").hide()
	}
});
 </script>

<script src="resource/oe/assets/js/app/taxComputation.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/vendorDetailsMaster.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>
