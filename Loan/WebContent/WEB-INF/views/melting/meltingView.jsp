<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : Krishna
	## 	Date Creation : 09/05/2016
 -->
<style>
.table {
	margin-bottom: 5px;
}

.fa-floppy-o {
	cursor: pointer;
}
</style>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<form id="meltingViewForm">
	<div class="main-container">
		<div class="container">

			<div class="row">
				<!-- Left Panel Started -->
				<div class="col-md-12  layout-main">
					<!-- Issue For Melting Heading Add Started -->
					<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i>&nbsp; Melting Lot Details
						</h1>
					</div>
					<!-- Issue For Melting Heading Add Ended -->
				</div>
			</div>
			<div class="melting-label">
				<div class="well">
					<div class="row">
						<div class="col-md-3">
							<label>Melting Lot No.:</label> ${meltingDTO.meltingLotId}
						</div>
						<div class="col-md-3">
							<label>Metal Segment:</label> ${meltingDTO.metalSegement}
						</div>
						<div class="col-md-3">
							<label>Lot Status:</label> <label id="mltStatus">
								${meltingDTO.status}</label>
						</div>
						<div class="col-md-3">
							<label>Initial Issue Weight:</label>
							<fmt:formatNumber pattern="0.000" value="${meltingDTO.netWt}" />
						</div>
					</div>
					<div class="row">
						<div class="col-md-3">
							<label>Skin Purity:</label>
							<fmt:formatNumber pattern="0.00" value="${meltingDTO.expPurity}" />

						</div>
						<div class="col-md-3">
							<label>Melting Purity:</label>
							<fmt:formatNumber pattern="0.00" value="${meltingDTO.expPurity}" />
						</div>
						<div class="col-md-3">
							<label>MLB Weight:</label> <label id="mlbWeight"><fmt:formatNumber
									pattern="0.000" value="${meltingDTO.mlbWgt}" /></label>
							<!-- <label id="mlbWeight1"></label> -->

						</div>
						<div class="col-md-3">
							<label>Standard MAP:</label> <label id="mapValue"><fmt:formatNumber
									pattern="0.00" value="${meltingDTO.mapValue}" /></label>
						</div>
					</div>
					<div class="row">
						<div class="col-md-3">
							<label>Assayer Purity:</label> <label id="assayerPurity">
								<fmt:formatNumber pattern="0.00"
									value="${meltingDTO.finalAssayerPurity}" />
							</label>
						</div>
						<div class="col-md-3">
							<label>Assayer Cerificate#:</label> <label id="assayerCert">${meltingDTO.finalAssayerCert}</label>
						</div>
						<div class="col-md-3">
							<label>Cumulative Refiner Issued Weight:</label> <label
								id="cumulativeWgt"> <fmt:formatNumber pattern="0.000"
									value="${meltingDTO.cumulativeRefinerWeight}" />
							</label>
						</div>
						<div class="col-md-3">
							<label>Issue to Melting Date:</label> ${meltingDTO.createdDate}
						</div>
					</div>

					<div class="row">
						<div class="col-md-4">
							<label>Cumulative Refiner Received Weight:</label> <label
								id="cumulativereceiveWgt"> <fmt:formatNumber
									pattern="0.000"
									value="${meltingDTO.cumulativeReceiveRefinerWeight}" />
							</label>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-12 melting-table">
				<div class="tabmelting row">
					<div class="panel with-nav-tabs panel-primary">
						<div class="panel-heading">
							<ul class="nav nav-tabs">
								<li class="active" id="melting"><a href="#tab1primary"
									data-toggle="tab"><i class="fa fa-gavel fa-lg"></i> Melting</a></li>
								<c:choose>
									<c:when test="${meltingDTO.status == 'Melting'}">
										<li id="assayer" class="disabledTab"><a
											href="#tab2primary" data-toggle="tab"><i
												class="fa fa-user fa-lg"></i> Assayer</a></li>
									</c:when>
									<c:otherwise>
										<li id="assayer"><a href="#tab2primary" data-toggle="tab"><i
												class="fa fa-user fa-lg"></i> Assayer</a></li>
									</c:otherwise>


								</c:choose>


								<c:choose>
									<c:when
										test="${meltingDTO.status != 'Refining' || meltingDTO.status != 'Refined' ||  meltingDTO.status != 'Assayed'}">
										<li id="refining" class="disabledTab"><a
											href="#tab3primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i> Refining</a></li>
									</c:when>
									<c:otherwise>
										<li id="refining"><a href="#tab3primary"
											data-toggle="tab"><i class="fa fa-filter fa-lg"></i>
												Refining</a></li>
									</c:otherwise>


								</c:choose>

							</ul>
						</div>
						<div class="panel-body panel-body-fixed-height">
							<div class="tab-content">
								<div class="tab-pane fade in active" id="tab1primary">
									<div class="heading-block">
										<h4>Issue to Melting</h4>
									</div>
									<div class="narrow text-center">
										<div class="resposive-table-data narrow text-center">
											<table class="table table-bordered table-hover">
												<thead>
													<tr>
														<th>Date</th>
														<th>GIV/TV No.</th>
														<th>Vendor Type</th>
														<th>Vendor Code</th>
														<th>From Location</th>
														<th>Ref No.</th>
														<th>Ref Sl.No.</th>
														<th>Iss.Gross Wt</th>
														<th>Iss.Net Wt</th>
														<th>Exp.Purity %</th>
														<th>Exp.Pure Wt.</th>
														<th>To Location</th>
														<th>Remarks</th>
														<th>Action</th>
													</tr>
												</thead>
												<tr id="0">
													<td>${meltingDTO.createdDate}</td>
													<td>${meltingDTO.mivOrTvNo}</td>
													<td>${meltingDTO.vendorType}</td>
													<td>${meltingDTO.vendorCode}</td>
													<td>${meltingDTO.segmentLocationCode}</td>
													<td>${meltingDTO.referenceNo}</td>
													<td>${meltingDTO.serialNo}</td>
													<td><fmt:formatNumber pattern="0.000"
															value="${meltingDTO.grossWt}" /></td>
													<td><fmt:formatNumber pattern="0.000"
															value="${meltingDTO.netWt}" /></td>

													<td><fmt:formatNumber pattern="0.00"
															value="${meltingDTO.expPurity}" /></td>

													<td><fmt:formatNumber pattern="0.000"
															value="${meltingDTO.expPureWt}" /></td>
													<td>${meltingDTO.toLocation}</td>
													<td>${meltingDTO.remarks}</td>
													<td align="center"><c:if
															test="${meltingDTO.vendorCode != null || meltingDTO.vendorCode != ''}">
															<i
																onclick="MeltingMivPrint('${meltingDTO.mivOrTvNo}','${meltingDTO.vendorType}')"
																style="cursor: pointer;"
																class="fa fa-trash-o fa-lg fa-print"></i>
														</c:if></td>
												</tr>
											</table>

										</div>
									</div>
									<div class="heading-block">
										<h4>Receipt From Melting</h4>
										<div class="table-heading-block-action">
											<c:if test="${meltingDTO.status == 'Melting'}">

												<button type="button" class="btn btn-primary btn-sm"
													id="saveMelting" name="save">
													<i class="fa fa-plus fa-lg"></i>&nbsp;Save
												</button>
											</c:if>
										</div>
									</div>
									<div class="narrow text-center">
										<div class="resposive-table-data">

											<table class="table table-bordered table-hover"
												id="dynamicTable1">
												<thead>
													<tr>
														<th>Date</th>
														<th>GRV/TV No.</th>
														<th>Vendor </br>Code
														</th>
														<th>From </br>Location
														</th>
														<th>Ref No.</th>
														<th>Ref Sl.No.</th>
														<th>Melting</br>Gross Wt
														</th>
														<th>Melting </br>Net Wt
														</th>
														<th><span class="required">*</span>Melted </br>Gross Wt</th>
														<th><span class="required">*</span>Melted </br>Net Wt
															(MLB)</th>
														<th>Expected </br>Purity %
														</th>
														<th>Expected </br>Pure Wt.
														</th>
														<th><span class="required">*</span>Spillage </br>Wt (SLL)</th>
														<th>Spillage </br>Pure Wt
														</th>
														<th><span class="required">*</span>Melting </br>Loss (MLL)</th>
														<th>Remarks</th>
														<th>Auth. by</th>
														<th>Action</th>
													</tr>
												</thead>

												<tr id="meltingrow1">
													<c:choose>
														<c:when test="${meltingDTO.status eq 'Melting'}">
															<td id="createdDate"></td>
															<td id="mrvOrTvView"></td>
															<td>${meltingDTO.vendorCode}</td>
															<td>${meltingDTO.toLocation}</td>
															<td>
															<div id="refNoTqm"></div>
															<input class="form-control input-sm"
																type="number" id="refNo" min="0" style="width: 80px;"
																onkeypress="decimalValue(event)" /></td>
															<td><input class="form-control input-sm"
																type="number" id="refSlNo" min="0" style="width: 80px;"
																onkeypress="decimalValue(event)" /></td>
															<td><fmt:formatNumber pattern="0.000"
																	value="${meltingDTO.grossWt}" /></td>
															<td><fmt:formatNumber pattern="0.000"
																	value="${meltingDTO.netWt}" /></td>
															<td><input
																class="form-control input-sm negitiveValidation"
																type="number" id="meltedgrossWt"
																onchange="calexpectedWgt(this.value, '${meltingDTO.expPurity}', '${meltingDTO.netWt}')"
																min="0.001" max="99999999.999" style="width: 80px;" /></td>
															<td><input class="form-control input-sm" type="text"
																id="meltednetWt" disabled="disabled" /></td>
															<td id="expectedPurity"><fmt:formatNumber
																	pattern="0.00" value="${meltingDTO.expPurity}" /></td>
															<td><input type="text" disabled="disabled"
																id="meltedPureWgt" min="0.001" max="99999999.999"></td>

															<td><input
																class="form-control input-sm negitiveValidation"
																type="number" id="spillageWt"
																onchange="calSpillagePureWgt(this.value, '${meltingDTO.expPurity}','${meltingDTO.netWt}')"
																min="0.001" max="99999999.999" style="width: 80px;" /></td>
															<td><input class="form-control input-sm" type="text"
																id="spillagepureWgt" disabled="disabled" min="0.001"
																max="99999999.999" style="width: 65px;" /></td>
															<td><input class="form-control input-sm" type="text"
																id="meltingLoss" disabled="disabled" min="0.001"
																max="99999999.999" /></td>
															<td><textarea class="form-control input-sm" row="1"
																	col="25" id="remarks"></textarea></td>
															<td>${meltingDTO.authBy}</td>
															<td align="center"><i style="cursor: pointer;"
																class="fa fa-print fa-lg"></i></td>
														</c:when>
														<c:otherwise>
															<c:if test="${meltedDto != null}">
																<td>${meltedDto.createdDate}</td>
																<td>${meltedDto.mrvOrTvViewId}</td>
																<td>${meltedDto.vendorCode}</td>
																<td>${meltedDto.toLocation}</td>
																<td>${meltedDto.referenceNo}</td>
																<td>${meltedDto.serialNo}</td>
																<td><fmt:formatNumber pattern="0.000"
																		value="${meltedDto.grossWt}" /></td>
																<td><fmt:formatNumber pattern="0.000"
																		value="${meltedDto.netWt}" /></td>
																<td><fmt:formatNumber pattern="0.000"
																		value="${meltedDto.mlbGrossWeight}" /></td>
																<td><fmt:formatNumber pattern="0.000"
																		value="${meltedDto.mlbNetWeight}" /></td>

																<td><fmt:formatNumber type="number"
																		maxFractionDigits="2" value="${meltedDto.expPurity}" /></td>

																<td><fmt:formatNumber type="number"
																		maxFractionDigits="2" value="${meltedDto.expPureWt}" /></td>
																<td><fmt:formatNumber pattern="0.000"
																		value="${meltedDto.spillageWt}" /></td>

																<td><fmt:formatNumber pattern="0.000"
																		value="${meltedDto.spillageWgtPurity}" /></td>
																<%-- <td>${meltingDTO.spillageWgtPurity}</td> --%>
																<td>${meltedDto.meltingLoss}</td>
																<td>${meltedDto.remarks}</td>
																<td>${meltedDto.authBy}</td>
																<c:if
																	test="${meltedDto.vendorCode != null || meltedDto.vendorCode != ''}">
																	<td align="center"
																		onClick="meltingMRVPrint('${meltedDto.mrvOrTvViewId}')"><i
																		style="cursor: pointer;" class="fa fa-print fa-lg"></i></td>
																</c:if>
															</c:if>
														</c:otherwise>
													</c:choose>
												</tr>
											</table>



											<table class="table table-bordered table-hover samplerow"
												style="display: none; height: 50px; overflow-y: auto;">
												<tbody>
													<tr>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td><input class="form-control input-sm" type="text"
															id="referenceNo" /></td>
														<td><input class="form-control input-sm" type="text"
															id="refSlNo" /></td>
														<td></td>
														<td></td>
														<td><input class="form-control input-sm" type="text"
															id="grossWt" /></td>
														<td><input class="form-control input-sm" type="text"
															id="netWt" /></td>
														<td><input class="form-control input-sm" type="text"
															id="expectedPurity" /></td>
														<td></td>
														<td><input class="form-control input-sm" type="text"
															id="spillageWt" /></td>
														<td></td>
														<td><input class="form-control input-sm" type="text"
															id="meltingLoss" /></td>
														<td><textarea class="form-control input-sm" row="1"
																col="25" id="remarks"></textarea></td>
														<td><input class="form-control input-sm" type="text"
															id="authBy" /></td>
														<td align="center"><i style="cursor: pointer;"
															class="fa fa-trash-o fa-lg remove"></i>&nbsp; <i
															style="cursor: pointer;" class="fa fa-print fa-lg"></i></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>

								</div>
								<div class="tab-pane fade" id="tab2primary">
									<div class="heading-block">
										<h4>Issue to Assayer</h4>
										<div class="table-heading-block-action">
											<c:if
												test="${(meltingDTO.status != 'Refining') && (meltingDTO.status != 'Assayed') && (meltingDTO.status != 'Refined') }">
												<button type="button" class="btn btn-primary btn-sm"
													id="generate" name="generate">
													<i class="fa fa-plus fa-lg"></i>&nbsp;Add
												</button>
											</c:if>
										</div>
									</div>
									<div class="narrow text-center">

										<div class="resposive-table-data narrow text-center">
											<table class="table table-bordered table-hover meting-table"
												id="dynamicTable2">
												<thead>
													<th>Date</th>
													<th>GIV</th>
													<th style="width: 20%"><span class="required">*</span>Vendor
														Code</th>
													<th>Location</th>
													<th>Ref No.</th>
													<th>Ref Sl.No.</th>
													<th><span class="required">*</span>Gross Wt</th>
													<th><span class="required">*</span>Net Wt</th>
													<th><span class="required">*</span>XRF Purity %</th>
													<th>Remarks</th>
													<th>Action</th>
												</thead>
												<tbody id="itatb">
													<c:choose>
														<c:when test="${meltingList == null || meltingList == ''}">

															<tr class="no-records-assayer">
																<td colspan="14">No Records Found</td>
															</tr>


														</c:when>
														<c:otherwise>
															<c:forEach var="melting" items="${meltingList}">
																<tr id="0">
																	<td>${melting.createdDate}</td>
																	<td>${melting.mivOrTvNo}</td>
																	<td>${melting.vendorCode}</td>
																	<td>${melting.toLocation}</td>
																	<td>${melting.referenceNo}</td>
																	<td>${melting.serialNo}</td>
																	<td><fmt:formatNumber pattern="0.000"
																			value="${melting.assayerGrossWgt}" /></td>
																	<td><fmt:formatNumber pattern="0.000"
																			value="${melting.assayerNetWgt}" /></td>

																	<td><fmt:formatNumber pattern="0.00"
																			value="${melting.xrfPurity}" /></td>
																	<td>${melting.remarks}</td>
																	<td><c:if
																			test="${melting.referenceMapId == null || melting.referenceMapId == ''}">
																			<button class="btn btn-primary voffset" type="button"
																				name="createReceipt"
																				id="createReceipt${melting.mivOrTvNo}"
																				onclick="createAssayerReceipt('${melting.mivOrTvNo}','${melting.vendorCode}', '${melting.vendorId}','${melting.assayerGrossWgt}','${melting.assayerNetWgt}');">
																				<i class="fa fa-plus fa-lg"></i> Receipt
																			</button>
																		</c:if> &nbsp;<i style="cursor: pointer;"
																		onclick="assayingMivPrint('${melting.mivOrTvNo}')"
																		class="fa fa-print fa-lg"></i></td>
																</tr>
															</c:forEach>
														</c:otherwise>
													</c:choose>
												</tbody>
											</table>
											<div id="1"></div>


										</div>
									</div>
									<c:if
										test="${meltingDTO.status != 'Refining' && (meltingDTO.status != 'Refined')  && meltingDTO.status != 'Assayed'}">
										<div class="text-center">
											<button type="button" class="btn btn-primary btn-sm"
												id="issueToAssayer" name="issueToAssayer"
												disabled="disabled">
												<i class="fa fa-floppy-o fa-lg"></i>&nbsp;Issue to Assayer
											</button>
										</div>
									</c:if>
									<div class="heading-block">
										<h4>Receipt From Assayer</h4>
									</div>
									<div class="narrow text-center">
										<div class="resposive-table-data">
											<table
												class="table table-bordered table-hover melting-table-list"
												id="dynamicTable3">
												<thead>
													<th>Date</th>
													<th><span class="required">*</span>Vendor Code</th>
													<th><span class="required">*</span>GRV No.</th>

													<th>Ref No.</th>
													<th>Ref Sl.No.</th>
													<th>Issued Gross Wt</th>
													<th>Issued Net Wt</th>
													<th><span class="required">*</span>Unassayed Wt (MLB)</th>
													<th><span class="required">*</span>Assayer Purity%</th>
													<th>Received Wt</th>
													<th>Assayer Loss (ASL)</th>
													<th><span class="required">*</span>Assayer Charges</th>
													<th><span class="required">*</span>Assayer Cert. No.</th>
													<th>Remarks</th>
													<th>Action</th>
												</thead>
												<tbody id="rfatb">

													<c:choose>
														<c:when test="${meltingRecepitList == null}">
															<tr class="no-records">

																<td colspan="14">No Records Found</td>
															</tr>
														</c:when>
														<c:otherwise>
															<c:forEach var="meltingObj" items="${meltingRecepitList}">
																<tr>
																	<td>${meltingObj.createdDate}</td>
																	<td>${meltingObj.vendorCode}</td>
																	<td>${meltingObj.mrvOrTvViewId}</td>

																	<td>${meltingObj.referenceNo}</td>
																	<td>${meltingObj.serialNo}</td>
																	<td><fmt:formatNumber type="number"
																			pattern="0.000" value="${meltingObj.assayerGrossWgt}" /></td>
																	<td><fmt:formatNumber type="number"
																			pattern="0.000" value="${meltingObj.assayerNetWgt}" /></td>
																	<td><fmt:formatNumber pattern="0.000"
																			value="${meltingObj.unAssayedWgt}" /></td>
																	<td><fmt:formatNumber type="number" pattern="0.00"
																			value="${meltingObj.assayerPurity}" /></td>
																	<td><fmt:formatNumber pattern="0.000"
																			value="${meltingObj.recievedWgt}" /></td>

																	<td><fmt:formatNumber pattern="0.000"
																			value="${meltingObj.assayerLoss}" /></td>
																	<td>${meltingObj.assayerCharges}</td>
																	<td>${meltingObj.assayerCert}</td>
																	<td>${meltingObj.remarks}</td>
																	<td><i style="cursor: pointer;"
																		onclick="assayerMRVPrint('${meltingObj.mrvOrTvViewId}')"
																		class="fa fa-print fa-lg"></i></td>
																</tr>
															</c:forEach>
														</c:otherwise>
													</c:choose>
												</tbody>
											</table>



										</div>
									</div>
									<div class="clearfix">&nbsp;</div>
									<c:if
										test="${meltingDTO.status != 'Refining' && (meltingDTO.status != 'Refined') && meltingDTO.status != 'Assayed'}">
										<div class="text-center">
											<button class="btn btn-primary"  data-toggle="modal" data-target="#saveRecAssayTqm"  type="button" id="receiveFromAssayTqm">
												<i class="fa fa-hand-lizard-o fa-lg"></i> &nbsp; Receive
												from Assayer
											</button>
											<button class="btn btn-primary" onclick='createRecipet();'
												type="button" id="receiveFromAssay">
												<i class="fa fa-hand-lizard-o fa-lg"></i> &nbsp; Receive
												from Assayer
											</button>
											&nbsp;
											<button class="btn btn-primary" type="button"
												onclick='proceedRefing(${meltingDTO.meltingLotId});'
												id="proceedToRefine">
												<i class="fa fa-arrow-right fa-lg"></i> &nbsp;Proceed to
												Refining
											</button>
										</div>
									</c:if>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab3primary">
									<div class="heading-block">
										<h4>Issue to Refiner</h4>
										<div class="table-heading-block-action">
											<%-- <c:if test="${meltingDTO.status != 'Refined' && (meltingDTO.mlbWgt != 0)}"> --%>
											<c:if test="${meltingDTO.status != 'Refined'}">
												<button type="button" class="btn btn-primary btn-sm"
													id="refinAdd" name="refinAdd">
													<i class="fa fa-plus fa-lg"></i>&nbsp;Add
												</button>
											</c:if>
										</div>
									</div>

									<div class="narrow text-center">

										<div class="resposive-table-data narrow text-center">
											<table class="table table-bordered table-hover meting-table"
												id="dynamicTable4">
												<thead>
													<th>Date</th>
													<th><span class="required">*</span>Vendor Code</th>
													<th>GIV No.</th>
													<th>Location</th>
													<th><span class="required">*</span>Assayer Cert. No.</th>
													<th><span class="required">*</span>Assayer Purity%</th>
													<th>Ref No.</th>
													<th>Ref Sl No.</th>
													<th><span class="required">*</span>Gross.Wt.</th>
													<th><span class="required">*</span>Net.Wt.</th>
													<th>Remarks</th>
													<th>Action</th>
												</thead>
												<tbody id="refineTb">

													<c:choose>
														<c:when
															test="${meltingRefinerList == null || meltingRefinerList == ''}">

															<tr class="no-records-assayer">
																<td colspan="14">No Records Found</td>
															</tr>


														</c:when>
														<c:otherwise>
															<c:forEach var="melting" items="${meltingRefinerList}">
																<tr id="0">
																	<td>${melting.createdDate}</td>
																	<td>${melting.vendorCode}</td>
																	<td>${melting.mivOrTvNo}</td>
																	<td>${melting.toLocation}</td>
																	<td>${melting.assayerCert}</td>
																	<td>${melting.assayerPurity}</td>
																	<td>${melting.referenceNo}</td>
																	<td>${melting.serialNo}</td>
																	<td>${melting.grossWt}</td>
																	<td>${melting.netWt}</td>

																	<td>${melting.remarks}</td>
																	<td><c:if
																			test="${melting.referenceMapId == null || melting.referenceMapId == ''}">
																			<button class="btn btn-primary voffset" type="button"
																				name="createReceipt"
																				id="createRefReceipt${melting.mivOrTvNo}"
																				onclick="createRefIssue('${melting.mivOrTvNo}','${melting.vendorCode}', '${melting.vendorId}','${melting.grossWt}','${melting.netWt}');">
																				<i class="fa fa-plus fa-lg"></i> Receipt
																			</button>
																		</c:if> <i style="cursor: pointer;"
																		onclick="refiningMivPrint('${melting.mivOrTvNo}')"
																		class="fa fa-print fa-lg"></i></td>
																</tr>
															</c:forEach>
														</c:otherwise>
													</c:choose>

												</tbody>


											</table>
											<div id="1"></div>


										</div>
									</div>


									<%-- <c:if test="${meltingDTO.status != 'Refined' && (meltingDTO.mlbWgt != 0)}"> --%>
									<c:if test="${meltingDTO.status != 'Refined'}">
										<div class="text-center">
											<button type="button" class="btn btn-primary btn-sm"
												id="issueToRefiner" name="issueToRefiner"
												disabled="disabled">
												<i class="fa fa-plus fa-lg"></i>&nbsp;Issue to Refiner
											</button>
										</div>

									</c:if>


									<h4 class="heading-block">Receipt from Refiner</h4>

									<div class="narrow text-center">
										<div class="resposive-table-data">
											<table
												class="table table-bordered table-hover melting-table-list"
												id="dynamicTable5">
												<thead>
													<th>Date</th>
													<th>Vendor Code</th>
													<th>GRV No.</th>
													<th>Ref No.</th>
													<th>Ref Sl.No.</th>
													<th>Issued Gross Wt</th>
													<th>Issued Net Wt</th>
													<th>Refiner Purity</th>
													<th>Received Wt.</th>
													<th>Refiner Loss</th>
													<th>Refining charges</th>
													<th>Remarks</th>
													<th>Action</th>
												</thead>
												<tbody id="refineRcTb">

													<c:choose>
														<c:when test="${refinedList == null}">
															<tr class="no-records">

																<td colspan="14">No Records Found</td>
															</tr>
														</c:when>
														<c:otherwise>
															<c:forEach var="refineObj" items="${refinedList}">
																<tr>
																	<td>${refineObj.createdDate}</td>
																	<td>${refineObj.vendorCode}</td>
																	<td>${refineObj.mrvOrTvViewId}</td>

																	<td>${refineObj.referenceNo}</td>
																	<td>${refineObj.serialNo}</td>
																	<td><fmt:formatNumber pattern="0.000"
																			value="${refineObj.grossWt}" /></td>
																	<td><fmt:formatNumber pattern="0.000"
																			value="${refineObj.netWt}" /></td>
																	<td>${refineObj.refinerPurity}</td>

																	<td><fmt:formatNumber pattern="0.000"
																			value="${refineObj.recievedWgt}" /></td>

																	<td><fmt:formatNumber pattern="0.000"
																			value="${refineObj.refinerLoss}" /></td>
																	<td class="two-digits">${refineObj.refineCharges}</td>
																	<td>${refineObj.remarks}</td>
																	<td><i style="cursor: pointer;"
																		onclick="refinerMRVPrint('${refineObj.mrvOrTvViewId}')"
																		class="fa fa-print fa-lg"></i></td>
																</tr>
															</c:forEach>
														</c:otherwise>
													</c:choose>
												</tbody>
											</table>

											<div class="clearfix">&nbsp;</div>
											<c:if test="${meltingDTO.status != 'Refined'}">
												<div class="text-center">
													<button class="btn btn-primary"
														onclick='createRefinerRecipet();' type="button"
														id="receiveFromRefiner">
														<i class="fa fa-hand-lizard-o fa-lg"></i> &nbsp; Receive
														from Refiner
													</button>

													<button class="btn btn-primary"
														onclick='completeRefining(${meltingDTO.meltingLotId});'
														type="button" id="completed">
														<i class="fa fa-hand-lizard-o fa-lg"></i> &nbsp; Complete
														Refining
													</button>

												</div>
											</c:if>
											<div class="clearfix">&nbsp;</div>

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
</form>

<div class="modal fade" id="saveRecAssayTqm" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">

	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Movement of purity testing Items
				</h3>
			</div>
			<form class="form-horizontal" id="stoneUsedWtForm"	action="javascript:void(0);">
				<div class="col-md-12">
					<label class="radio-inline"> <input name="movementLoc"	type="radio" value="JWR" /> &nbsp; Move to JWR Location	</label> 
					<label class="radio-inline"> <input name="movementLoc"	 type="radio" value="COA" /> &nbsp; Move to COA Location</label> 
				</div>					
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">				
				<button type="button" id="receiveFromAssayTqm" onclick='createRecipetTqm();' class="btn btn-primary"><i class="fa fa-floppy-o fa-lg"></i>&nbsp; Save</button>&nbsp;
				<button type="button" class="btn btn-warning" data-dismiss="modal">	<i class="fa fa-times fa-lg"></i>&nbsp; Close</button>
			</div>
		</div>
	</div>
</div>

<!-- Receipt from Refiner Modal  -->
<script src="resource/oe/assets/js/app/melting.js"></script>

<script type="text/javascript">
var netWt = '${meltingDTO.mlbWgt}';
var NVL = function(source, replaceMentValue){
	if(typeof source != "undefined" && source != null && source != ""){
		return source;
	}
	else return replaceMentValue;
}

var temperoryLocCode = '${meltingDTO.temperoryLocCode}';
var meltingLotId = '${meltingDTO.meltingLotId}';
var lotStatus = '${meltingDTO.status}';
if (temperoryLocCode == 'TQM' && lotStatus == "Assayed"){
		$("#receiveFromAssayTqm").prop('disabled', true);
}
var updateTqm = function(){
	
	if (temperoryLocCode == 'TQM'){
		$("#refNoTqm").html(meltingLotId); 
		$("#refNo").hide();
		$("#refNoTqm").show();
		$("#proceedToRefine").prop('disabled', true);
		$("#receiveFromAssay").hide();
		$("#receiveFromAssayTqm").show();
		
	}else{
		$("#refNo").show();
		$("#refNoTqm").hide();
		$("#proceedToRefine").prop('disabled', false);
		$("#receiveFromAssay").show();
		$("#receiveFromAssayTqm").hide();
	}
	

}
updateTqm();
$("#receiveFromAssay").prop("disabled", true);
	$(function() {
		
		if ('${meltingDTO.status}' == 'Assayer') {
			$(".panel-heading").find("li").removeClass("active");
			$(".tab-content").find("div").removeClass("in active");

			$("#assayer").addClass("active");
			$("#tab2primary").addClass("in active");

		} else if ('${meltingDTO.status}' == 'Refining' || '${meltingDTO.status}' == 'Refined'|| '${meltingDTO.status}' == 'Assayed') {
			$(".panel-heading").find("li").removeClass("active");
			$(".tab-content").find("div").removeClass("in active");
			$("#refining").addClass("active");
			$("#tab3primary").addClass("in active");
			
			
		} else {

		}

		$('a[title]').tooltip();
	});
	$("#assayer").on('click', function(){
		var lotStatus = '${meltingDTO.status}';
		if(lotStatus != "Melted" && lotStatus != "Melting"){
			$("#refining").removeClass('disabledTab active');
		}
		var status = $("#mltStatus").text();
		
		if(lotStatus.valueOf()  == new String("Refined").valueOf() || lotStatus.valueOf()  ==  new String("Refining").valueOf()|| lotStatus.valueOf()  ==  new String("Assayed").valueOf()
				|| status.valueOf()  ==  new String("Assayed").valueOf()||status.valueOf()  == new String("Refined").valueOf() || status.valueOf()  ==  new String("Refining").valueOf()){
		
			$("#refining").removeClass('disabledTab active');
		}else{
			
			$("#refining").addClass('disabledTab');
		}
	});
	$("#melting").on('click', function(){
		updateTqm();
		var lotStatus = $("#mltStatus").text().trim();
		
		if(lotStatus.valueOf() == new String("Assayed").valueOf() || lotStatus.valueOf() == new String("Refining").valueOf() ||  lotStatus.valueOf() == new String("Refined").valueOf()){
			$("#refining").removeClass('disabledTab active');
		}
		var lotStatus = ${meltingDTO.status};		
		$("#refining").removeClass('disabledTab active');
		$("#assayer").removeClass('disabledTab active');
	});
	
	$("#itaDate").datepicker({
		changeMonth : true,
		changeYear : true,
		maxDate : 0,
		dateFormat : "dd/mm/yy"
	});
	$("#itaDate").mask("99/99/9999");
	var meltedWt = 0;
	$("#saveMelting")
			.on(
					"click",
					function() {
						
						if (createRecipetForMeltingValidation()) {
							
							postJSON(
									'/OrderExecution/api/v1/meltingReceipt',
									JSON.stringify(createMeltingRecipet( 
											'${meltingDTO.meltingLotId}',
											'${meltingDTO.vendorId}',
											'${meltingDTO.segmentId}','${meltingDTO.vendorCode}')),
									function(data) {
										$("#meltingrow1").remove();
										
										if (1 == data.resCode) {											
											meltedWt = $("#meltedgrossWt").val();
											$("#mlbWeight" ).text(data.payload.meltingData.meltedBarNetWt);
											 $("#mltStatus" ).text(data.payload.meltingData.status);
											 var meltedObj= data.payload.meltingData;
											
											 var str ="<td>"+meltedObj.createdDate+"</td>"
												+ "<td>"+meltedObj.mrvOrTvViewId
												+ "</td>";
												
											 if(meltedObj.vendorCode == null ||meltedObj.vendorCode ==''){
												
													str = str+"<td></td>"+ "<td >"+meltedObj.toLocation+"</td>";
												}
												else{
													
													str = str+ "<td>"+meltedObj.vendorCode+"</td>"
													+ "<td >"+meltedObj.toLocation+"</td>";
												}
											 
											 
												if(meltedObj.referenceNo == null || meltedObj.referenceNo ==''){
													str = str+"<td></td>";
												}
												else{
													str = str+ "<td>"+meltedObj.referenceNo+"</td>";
												}
												if(meltedObj.serialNo == null || meltedObj.serialNo ==''){
													str = str+"<td></td>";
												}
												else{
													str = str+ "<td>"+meltedObj.serialNo+"</td>";
												}
												str = str+ "<td>"+meltedObj.grossWt+"</td>"
												+"<td>"+meltedObj.netWt+"</td>"
												+ "<td>"+meltedObj.meltedBarGrossWt+"</td>"
												+"<td>"+meltedObj.meltedBarNetWt+"</td>"
												+ "<td>"+meltedObj.expPurity+"</td>"
												+"<td>"+meltedObj.pureWgt+"</td>"
												+ "<td>"+meltedObj.spillageWt+"</td>"
												+ "<td>"+meltedObj.spillageWgtPurity+"</td>"
												+"<td>"+meltedObj.meltingLoss+"</td>"
												+ "<td>"+meltedObj.remarks+"</td>"
												/* +"<td>"+meltedObj.meltingLoss+"</td>" */
												+ "<td>"+meltedObj.authBy+"</td>"											
												
												+"<td><i class='fa fa-print fa-lg' style='cursor: pointer;' onClick='meltingMRVPrint(\""+meltedObj.mrvOrTvViewId+"\")'></i></td>";
												
												
											var meltedObj = data.payload.meltingData;
											 $("#dynamicTable1 tbody")
												.append("<tr>`" +str+ "</tr>"
												);														
											 $("#assayer").removeClass('disabledTab');	
											 $("#generate").prop("disabled",
														false);
														
											
											$("#saveMelting").remove();
										
											$.growl
													.notice({
														message : "Successfully created receipt for melting:"
																+ '${meltingDTO.meltingLotId}',
														duration : 10000,
														title : 'Success'
													});
											if(temperoryLocCode == "TQM"){
												$("#proceedToRefine").prop('disabled', true);
												$("#receiveFromAssay").hide();
												$("#receiveFromAssayTqm").show();
											}else{
												$("#proceedToRefine").prop('disabled', false);
												$("#receiveFromAssay").show();
												$("#receiveFromAssayTqm").hide();
											}
										}else if(data.resCode == 2){
											$.growl.error({
												message : data.mesgStr,
												duration : 10000,
												title : 'Error'
											});
											return false;
										}
										else{
											$("#saveMelting").prop('disabled', false);
										}
									});
						} else {
							$.growl
									.error({
										message : "Please fill all the mandatory fields",
										duration : 10000
									});
						}

					});
	var vendors = {};
	$.getJSON('/OrderExecution/api/v1/assayerLOV', function(data) {
		if (1 == data.resCode) {
			var status = '${meltingDTO.status}';
			if (status == 'Melting') {
				$("#generate").prop("disabled", true);
			}

			//var dataValArr = [];
			vendors = data.payload.vCodeList;
			var dataVal = data.payload.vCodeList;
			/*console.log(dataVal); */
			$.each(dataVal, function(key, val) {
				/* dataValArr.push({
					value : val.id,
					label : val.name
				}); */
				$vendor.append('<option value="' + val.id + '">' + val.name
						+ '</option>');
			});
		}

	});

	var $vendor = $('#vendor0');

	var checkGrWTRange = function(){
		var validate = false;
		var value = 0;
		
		
		var rowCount = $('#dynamicTable2 tr').length;
		for(var i=1; i<rowCount+1; i++){
			if(i>1){
				var vendor = $("#vendor"+i).val();
				var vendorPrev = $("#vendor"+(i-1)).val();
				
				if(vendor == vendorPrev){
					validate = false;
					$.growl.warning({ message:"Duplicate Vendor not allowed." , duration: 10000, title: 'Error' });
					return false;
				}
			}
			var value = value + parseFloat(NVL($("#grossWt"+i).val(), 0));
		}
		var mlbWeight = parseFloat($("#mlbWeight").text());
		if(value > mlbWeight){
			validate = false;
		}else{
			validate = true;
		}
		return validate;
	}
	
	
	
	
	
	
	$("#issueToAssayer")
			.on(
					"click",
					function() {
						if(!checkGrWTRange()){
							$.growl.warning({ message:"Gross wt can not be more than issued wt." , duration: 10000, title: 'Error' });
							return false;
						}
						var ids = [];
						var meltingId = ${meltingDTO.meltingLotId};
                       var vendorval  = [];
						var meltingObjs = [];

						var meltingObjs = new Array();
						
						var mlbWeight = parseFloat($("#mlbWeight").text());
                       var finalVal = mlbWeight;
                       if(id == 1){
                    	   $.growl
							.error({
								message : "No data found",
								duration : 10000
							});
                    	   return;
                       }
						for (i = 1; i < id; i++) {
						//	++previousIndex;
							if (typeof ($("#vendor" + i).val()) != 'undefined') {
								if($("#grossWt" + i).val()!=null && $("#grossWt" + i).val()!=''){
								var gWgt= parseFloat($("#grossWt" + i).val());								
								finalVal = finalVal-gWgt;								
								if(finalVal < 0){
									$.growl
									.error({
										message : "Weight Exceeded",
										duration : 10000
									});
									return;
								}
								}
								var meltingData = {
									"meltingLotId" : meltingId,
									"vendorId" : $("#vendor" + i).val(),
									"segmentLocationCode" : $("#location" + i)
											.val(),
									"referenceNo" : $("#refNo" + i).val(),
									"serialNo" : $("#serialNo" + i).val(),
									"grossWt" : $("#grossWt" + i).val(),
									"netWt" : $("#netWt" + i).val(),
									"xrfPurity" : $("#xrfPurity" + i).val(),
									"remarks" : $("#remarks" + i).val(),
									"toLocation" : $("#location" + i).val(),
                                   "mlbWgt" : finalVal
								};

								if (meltingData.vendorId == null
										|| meltingData.vendorId == ""
										|| meltingData.grossWt == ""
										|| meltingData.grossWt == null
										|| meltingData.netWt == ""
										|| meltingData.netWt == null) {

									$.growl
											.error({
												message : "please fill all mandatory fields",
												duration : 10000
											});
									return false;

								}

								meltingObjs.push(meltingData);
							} 
						}

						postJSON(
								'/OrderExecution/api/v1/issueForAssaying',
								JSON.stringify(meltingObjs),
								function(data) {
									if (1 == data.resCode) {
										
									var length = data.payload.meltingList.length;
									for (i = 1; i <=id; i++) { 
										$("#removeAssayer" + i).parents("tr").remove();
									}
									if(length > 0){
										$("#mlbWeight" ).text(data.payload.meltingList[length-1].meltedBarGrossWt);									
										
										
										$("#mltStatus" ).text(data.payload.meltingList[length-1].status);
										
										$.growl
										.notice({
											message : "Successfully created issue to Assayer :"+data.payload.meltingList[length-1].meltingLotId,
											duration : 10000,
											title : 'Success'
										});
									}
									
									for (i = 1; i <= length; i++) {
										var meltingObj = data.payload.meltingList[i - 1];	
										var str1= '<tr id=disableTrAssayer"'+i+'"><td>'+meltingObj.createdDate+'</td><td>'+meltingObj.mivOrTvNo+'</td>'+
										'<td>'+meltingObj.vendorCode+'</td><td>'+meltingObj.toLocation+'</td>';
										if(meltingObj.referenceNo !=null ){
											str1 = str1+'<td>'+meltingObj.referenceNo+'</td>';
										}
										else{
											str1 = str1+'<td></td>'
										}
										
										if(meltingObj.serialNo !=null ){
											str1 = str1+'<td>'+meltingObj.serialNo+'</td>';
										}
										else{
											str1 = str1+'<td></td>'
										}
										str1=str1+	'<td>'+meltingObj.grossWt+'</td><td>'+meltingObj.netWt+'</td>'+
										'<td>'+meltingObj.xrfPurity+'</td><td>'+meltingObj.remarks+'</td>'+
										'<td align="center"><button id="createReceipt'+meltingObj.mivOrTvNo+'" name="createReceipt" type="button" class="btn btn-primary voffset" onclick="createAssayerReceipt(\''
											+ meltingObj.mivOrTvNo
											+ '\',\''
											+ meltingObj.vendorCode
											+ '\',\''
											+ meltingObj.vendorId
											+ '\',\''
											+ meltingObj.grossWt
											+ '\',\''
											+ meltingObj.netWt
											+ '\');"><i class="fa fa-plus fa-lg" ></i> Receipt</button>&nbsp;<i class="fa fa-print fa-lg" onclick="assayingMivPrint(\''
											+ meltingObj.mivOrTvNo
											+ '\')"></i>'+
											
										'</tr>'
										$("#dynamicTable2 tbody")
										.append(str1);
											
									}
									id=1;
									}
									else if(2==data.resCode){
										$.growl.error({
											message : "Duplicate Vendor",
											duration : 10000
										});
									}else{
										$.growl.error({
											message : data.mesgStr,
											duration : 10000,
											title : 'Error'
 										});
									}
								});

						
					});

	var recipid = 0;

	var recPreviousIndex = 0;
	var recResIndex = 0;
	function createRecipet() {
		var meltingId = ${meltingDTO.meltingLotId};	
		
		if(recipid == 0){
		
			$.growl.error({
				message : "No Data Found ",
				duration : 10000
			});
			return false;
		}
		
		
		var meltingObjs = [];
         
	
		for (i = 1; i <= recipid; i++) {
			
			++recPreviousIndex;
			//var vendorCode = $('#dynamicTable3 tr').eq(i).find("#vendor").html();
			
          if(typeof ($("#unassayedwgt" + i).val()) != 'undefined'){
        	 
        	  var issueForMeltingObj = {
      				"meltingList":[]
      		}
			var meltingData = {
				"meltingLotId" : meltingId,
				"referenceNo" : $("#refernceNo" + i).val(),
				"serialNo" : $("#serialNo" + i).val(),
				"assayerGrossWgt" : $("#grossWt" + i).val(),
				"assayerNetWgt" : $("#netWt" + i).val(),
				"assayerPurity" : $("#purity" + i).val(),
				"recievedWgt" : $("#recievedWt" + i).val(),
				"unAssayedWgt" : $("#unassayedwgt" + i).val(),
				"assayerLoss" : $("#assayerLoss" + i).val(),
				"assayerCharges" : $("#assayerCharges" + i).val(),
				"assayerCert" : $("#assayercert" + i).val(),
				"vendorId" :  $("#dynamicTable3 #vendorcodeId"+i).text(),
		         "mivOrTvNo" : $("#dynamicTable3 #mivId"+i).text(),			
				"remarks" : $("#remarks" + i).val(),
				"meltedBarNetWt": $("#mlbWeight").text()

			};
			if (meltingData.vendorId == null
		
	|| meltingData.assayerPurity == ""
					|| meltingData.assayerPurity == null
					|| meltingData.assayerGrossWgt == "" || meltingData.assayerGrossWgt == null
					|| meltingData.assayerNetWgt == "" || meltingData.assayerNetWgt == null
					|| meltingData.recievedWgt == ""
					|| meltingData.recievedWgt == null
					|| meltingData.unAssayedWgt == ""
					|| meltingData.unAssayedWgt == null
					|| meltingData.assayerLoss == null
					|| meltingData.assayerLoss == ""
					|| meltingData.assayerCharges == null
					|| meltingData.assayerCharges == ""
					|| meltingData.assayerCharges == null
					|| meltingData.assayerCharges == ""
					|| meltingData.assayerCert == null
					|| meltingData.assayerCert == "") {

				$.growl.error({
					message : "please fill all mandatory fields",
					duration : 10000
				});
				return false;

			}
			issueForMeltingObj.meltingList.push(meltingData);
          }
		}
		var temp = recipid;
			postJSON(
					'/OrderExecution/api/v1/receiptForAssaying',
					JSON.stringify(issueForMeltingObj),
					function(data) {

						
						if (1 == data.resCode) {
							
							$("#receiveFromAssay").prop("disabled", true);
							for (i = 1; i <= temp; i++) {
								$("#disbleTr" + i).remove();
							}
							
							 	if(data.payload.meltingList.length > 0){									
								$("#mlbWeight").text(data.payload.meltingList[data.payload.meltingList.length - 1].mlbWgt);
								
								$.growl
								.notice({
									message : "Successfully created Assayer receipt:"+data.payload.meltingList[data.payload.meltingList.length - 1].meltingLotId,
									duration : 10000,
									title : 'Success'
								});
								} 
							
							for (i = 1; i <= data.payload.meltingList.length; i++) {
								
								var meltingObj = data.payload.meltingList[i - 1];
							
                      $("#createReceipt"+meltingObj.mivOrTvNo).hide();
								
								
								var str ="<tr><td>"
									+ meltingObj.createdDate
									+ "</td><td>"
									+ meltingObj.vendorCode
									+ "</td><td>"
									+ meltingObj.mrvOrTvViewId
									+ "</td>"	;
									if(meltingObj.referenceNo != null){
										str = str+"<td>"+ meltingObj.referenceNo+ "</td>";									
										}
									else{
										str = str+"<td></td>"
									}
									if(meltingObj.serialNo != null){
										str = str+"<td>"+ meltingObj.serialNo+ "</td>";									
										}
									else{
										str = str+"<td></td>"
									}
									str= str+"<td>"
									+ meltingObj.assayerGrossWgt
									+ "</td><td>"
									+ meltingObj.assayerNetWgt
									+ "</td><td>"														
									+ meltingObj.unAssayedWgt
									+ "</td><td>"
									+ meltingObj.assayerPurity
									+ "</td><td>"
									+ meltingObj.recievedWgt
									+ "</td><td>"
									+ meltingObj.assayerLoss
									+ "</td><td>"
									+ meltingObj.assayerCharges
									+ "</td><td>"
									+ meltingObj.assayerCert
									+ "</td>"
									+ "<td>"
									+ meltingObj.remarks
									+ "</td><td><i class='fa fa-print fa-lg' onclick='assayerMRVPrint(\""
									+ meltingObj.mrvOrTvViewId
									+ "\")'></i></td>"
									+ "</tr>"
									
								$("#dynamicTable3 tbody")
										.append(str);							
														
							}
							
							recipid = 0;
							
						}
						else if(2 == data.resCode){
							
							$.growl.error({
								message : "Duplicate Assayer Certificate",
								duration : 10000
							});
						}

					});
		
		
	}
	
	
	function createRecipetTqm() {
		var meltingId = ${meltingDTO.meltingLotId};	
		
		if(recipid == 0){
		
			$.growl.error({
				message : "No Data Found ",
				duration : 10000
			});
			return false;
		}
		
		
		var meltingObjs = {
				"meltingList" : []
		};
		 var movementLoc = $("input[name='movementLoc']:checked").val();
         (movementLoc == "" || movementLoc == null) ? meltingObjs['toTempLocation'] = null : meltingObjs['toTempLocation'] = movementLoc;
         
	
		for (i = 1; i <= recipid; i++) {
			
			++recPreviousIndex;
			//var vendorCode = $('#dynamicTable3 tr').eq(i).find("#vendor").html();
			
          if(typeof ($("#unassayedwgt" + i).val()) != 'undefined'){
        	 
        	
			var meltingData = {
				"meltingLotId" : meltingId,
				"referenceNo" : $("#refernceNo" + i).val(),
				"serialNo" : $("#serialNo" + i).val(),
				"assayerGrossWgt" : $("#grossWt" + i).val(),
				"assayerNetWgt" : $("#netWt" + i).val(),
				"assayerPurity" : $("#purity" + i).val(),
				"recievedWgt" : $("#recievedWt" + i).val(),
				"unAssayedWgt" : $("#unassayedwgt" + i).val(),
				"assayerLoss" : $("#assayerLoss" + i).val(),
				"assayerCharges" : $("#assayerCharges" + i).val(),
				"assayerCert" : $("#assayercert" + i).val(),
				"vendorId" :  $("#dynamicTable3 #vendorcodeId"+i).text(),
		         "mivOrTvNo" : $("#dynamicTable3 #mivId"+i).text(),			
				"remarks" : $("#remarks" + i).val(),
				"meltedBarNetWt": $("#mlbWeight").text()

			};
			if (meltingData.vendorId == null
		
	|| meltingData.assayerPurity == ""
					|| meltingData.assayerPurity == null
					|| meltingData.assayerGrossWgt == "" || meltingData.assayerGrossWgt == null
					|| meltingData.assayerNetWgt == "" || meltingData.assayerNetWgt == null
					|| meltingData.recievedWgt == ""
					|| meltingData.recievedWgt == null
					|| meltingData.unAssayedWgt == ""
					|| meltingData.unAssayedWgt == null
					|| meltingData.assayerLoss == null
					|| meltingData.assayerLoss == ""
					|| meltingData.assayerCharges == null
					|| meltingData.assayerCharges == ""
					|| meltingData.assayerCharges == null
					|| meltingData.assayerCharges == ""
					|| meltingData.assayerCert == null
					|| meltingData.assayerCert == "") {

				$.growl.error({
					message : "please fill all mandatory fields",
					duration : 10000
				});
				return false;

			}
			meltingObjs["meltingList"].push(meltingData);
          }
		}
		var temp = recipid;
			postJSON(
					'/OrderExecution/api/v1/receiptForAssaying',JSON.stringify(meltingObjs),function(data) {

						
						if (1 == data.resCode) {
							
							$("#receiveFromAssay").prop("disabled", true);
							for (i = 1; i <= temp; i++) {
								$("#disbleTr" + i).remove();
							}
							
							 	if(data.payload.meltingList.length > 0){									
								$("#mlbWeight").text(data.payload.meltingList[data.payload.meltingList.length - 1].mlbWgt);
								
								$.growl.notice({
									message : "Successfully created Assayer receipt:"+data.payload.meltingList[data.payload.meltingList.length - 1].meltingLotId,
									duration : 10000,
									title : 'Success'
								});
								} 
							
							for (i = 1; i <= data.payload.meltingList.length; i++) {
								
								var meltingObj = data.payload.meltingList[i - 1];
							
                      $("#createReceipt"+meltingObj.mivOrTvNo).hide();
								
								
								var str ="<tr><td>"
									+ meltingObj.createdDate
									+ "</td><td>"
									+ meltingObj.vendorCode
									+ "</td><td>"
									+ meltingObj.mrvOrTvViewId
									+ "</td>"	;
									if(meltingObj.referenceNo != null){
										str = str+"<td>"+ meltingObj.referenceNo+ "</td>";									
										}
									else{
										str = str+"<td></td>"
									}
									if(meltingObj.serialNo != null){
										str = str+"<td>"+ meltingObj.serialNo+ "</td>";									
										}
									else{
										str = str+"<td></td>"
									}
									str= str+"<td>"
									+ meltingObj.assayerGrossWgt
									+ "</td><td>"
									+ meltingObj.assayerNetWgt
									+ "</td><td>"														
									+ meltingObj.unAssayedWgt
									+ "</td><td>"
									+ meltingObj.assayerPurity
									+ "</td><td>"
									+ meltingObj.recievedWgt
									+ "</td><td>"
									+ meltingObj.assayerLoss
									+ "</td><td>"
									+ meltingObj.assayerCharges
									+ "</td><td>"
									+ meltingObj.assayerCert
									+ "</td>"
									+ "<td>"
									+ meltingObj.remarks
									+ "</td><td><i class='fa fa-print fa-lg' onclick='assayerMRVPrint(\""
									+ meltingObj.mrvOrTvViewId
									+ "\")'></i></td>"
									+ "</tr>"
									
								$("#dynamicTable3 tbody")
										.append(str);							
														
							}
							
							recipid = 0;
							$("#saveRecAssayTqm").modal('hide');
						}
						else if(2 == data.resCode){
							
							$.growl.error({
								message : "Duplicate Assayer Certificate",
								duration : 10000
							});
							return false;
						}else{
							$.growl.error({
								message : data.mesgStr,
								duration : 10000
							});
							return false;
						}

					});
		
		
	}
	var receiveWt;

	var id = 1;

	$("#generate")
			.click(
					function() {
						if(!checkGrWTRange()){
							$.growl.warning({ message:"Gross wt can not be more than issued wt." , duration: 10000, title: 'Error' });
							return false;
						}
						var xrfpurity = ${meltingDTO.expPurity}	;
						var idVal = id + 1;
						 
						$(".no-records-assayer").remove();

						var rowone = $('.samplerow2 tbody tr').clone(true);
						rowone.find("input:text").val("");
						rowone.find("option").val("");
						rowone.find("textarea").val("");
						rowone.attr('id', id);

						$("#dynamicTable2 tbody")
								.append(
										"<tr id='disableTrAssayer"+id+"'><td id='date"+id+"'></td><td id='mivNo"+id+"'></td><td style='width:20%'>"
												+ "<select id='vendor"+id+"' class='form-control' ><option value='' selected label='--Select--' /></select></td><td>"
												+ "<input class='form-control input-sm' type='text' value = 'MLB' disabled id='location"+id+"' /></td><td>"
												+ "<input class='form-control input-sm' type='number'  id='refNo"+id+"' onkeypress='decimalNumberValidation(event)' min='0'/></td><td>"
												+ "<input class='form-control input-sm' type='number' id='serialNo"+id+"' onkeypress='decimalNumberValidation(event)' min='0'/></td><td><input class='form-control input-sm' type='number' min='0.001' max='99999999.999'  id='grossWt"+id+"' onchange='setNetWgtValue(this.value,"+id+")' onkeypress='numberValidation(event)'/></td><td><input class='form-control input-sm' type='number' id='netWt"+id+"' disabled/></td><td><input class='form-control input-sm' type='number' id='xrfPurity"+id+"' value='"+xrfpurity.toFixed(2)+"' disabled/></td><td><input class='form-control input-sm' type='text' id='remarks"+id+"'/></td><td id='addButton"+id+"' align='center'><i style='cursor: pointer;'	id='removeAssayer"
												+ id
												+ "' onclick='removeRow("
												+ id
												+ ")' class='fa fa-trash-o fa-lg"
												+ id + "'></i>" + "</td></tr>");
						$("#issueToAssayer").prop("disabled", false);

						setVendorData();
						return false;

					});
	
	var assayerCerts = {};
	var refinVendors = {};
	refiningId= 0;
	var cert;
	var purityValue;
	
	$("#refinAdd")
	.click(
			function() {				
				var meltingId = ${meltingDTO.meltingLotId};	
				++refiningId;
			
				$(".no-records-refining").hide();	
				$("#issueToRefiner").prop("disabled", false);
				
				if(document.getElementById("refineTb").getElementsByTagName("tr").length == 0){
				
				$("#dynamicTable4 tbody")
						.append(
								"<tr id='disableTrRefining"+refiningId+"'><td id='date"+refiningId+"'></td><td style='width:20%'>"
								+ "<select id='refinvendor"+refiningId+"' class='form-control'><option value='' selected label='--Select--' /></select></td>"
								+"<td id='refinmivNo"+refiningId+"'></td><td>"
										+ "<input class='form-control input-sm' type='text' value = 'MLB' disabled id='refinlocation"+refiningId+"' /></td><td style='width:20%'>"
										+ "<select id='refinassayercert"+refiningId+"' class='form-control' onchange='getAssayerCert("+refiningId+");'><option value='' selected label='--Select--' /></select></td>"
										+ "<td><input class='form-control input-sm' type='text' disabled id='refinassayerPurity"+refiningId+"'/></td><td><input class='form-control input-sm' type='number' id='refinrefNo"+refiningId+"' onkeypress='decimalNumberValidation(event)' min='0'/></td><td>"
										+ "<input class='form-control input-sm' type='number' id='refinserialNo"+refiningId+"' onkeypress='decimalNumberValidation(event)' min='0'/></td><td><input class='form-control input-sm' type='number' min='0.001' max='99999999.999' id='refingrossWt"+refiningId+"' onchange='setRefinerNetWgtValue(this.value,"+refiningId+");' onkeypress='numberValidation(event);'/></td><td><input class='form-control input-sm' style = 'width : 75px;' type='text' id='refinnetWt"+refiningId+"' disabled/></td>"
										+"<td><input class='form-control input-sm' type='text' id='refinremarks"+refiningId+"'/></td><td id='addButton"+refiningId+"' align='center'><i style='cursor: pointer;'	id='removeRefining"
										+ refiningId
										+ "' onclick='removeRow("
										+ refiningId
										+ ")' class='fa fa-trash-o fa-lg"
										+ refiningId + "'></i>" + "</td></tr>");
				
				var $assayerCert = $('#refinassayercert'+refiningId);
				var $refinvendor = $('#refinvendor'+refiningId);
				
				if($.isEmptyObject(assayerCerts)&& $.isEmptyObject(refinVendors)){
				$.getJSON('/OrderExecution/api/v1/refiningLOV?id='+meltingId, function(data) {
				
					refinVendors = data.payload.vCodeList;
					assayerCerts=data.payload.asayerCert;
					
					$.each(data.payload.asayerCert, function(key, val) {
						$assayerCert.append('<option value="' + val.assayerCertificateNumber + '">' + val.assayerCertificateNumber
								+ '</option>'); 
						
						
					});
					
					$.each(data.payload.vCodeList, function(key, val) {
						$refinvendor.append('<option value="' + val.id + '">' + val.name
								+ '</option>'); 
					});
					$("#dynamicTable4 tbody")
				
				});
				}
				else{
					$.each(assayerCerts, function(key, val) {
						$assayerCert.append('<option value="' + val.assayerCertificateNumber + '">' + val.assayerCertificateNumber
								+ '</option>'); 
					
					});
					
					$.each(refinVendors, function(key, val) {
						$refinvendor.append('<option value="' + val.id + '">' + val.name
								+ '</option>'); 
						
						
					});
				}
				vendors = data.payload.vCodeList;
				}
				else{
					if(cert == null || cert =='' && purityValue == null || purityValue == ''){
						
					 cert = $('#dynamicTable4 tr').eq(1).find('td').eq(4).text();
					purityValue = $('#dynamicTable4 tr').eq(1).find('td').eq(5).text(); 
					}
					
					
					$("#dynamicTable4 tbody")
					.append(
							"<tr id='disableTrRefining"+refiningId+"'><td id='date"+refiningId+"'></td><td style='width:20%'>"
							+ "<select id='refinvendor"+refiningId+"' class='form-control'><option value='' selected label='--Select--' /></select></td>"
							+"<td id='refinmivNo"+refiningId+"'></td><td>"
									+ "<input class='form-control input-sm' type='text' value = 'MLB' disabled id='refinlocation"+refiningId+"' /></td><td style='width:15%'>"
									+  "<input class='form-control input-sm' type='text' value = "+cert+" disabled id='refinassayercert"+refiningId+"' /></td>"
									+ "<td><input class='form-control input-sm' type='text'    value="+purityValue+" id='refinassayerPurity"+refiningId+"' disabled/></td><td><input class='form-control input-sm' type='number' id='refinrefNo"+refiningId+"' onkeypress='decimalNumberValidation(event)'/></td><td>"
									+ "<input class='form-control input-sm' type='number' id='refinserialNo"+refiningId+"' onkeypress='decimalNumberValidation(event)'/></td><td><input class='form-control input-sm' type='number' id='refingrossWt"+refiningId+"' onchange='setRefinerNetWgtValue(this.value,"+refiningId+")' onkeypress='numberValidation(event)'/></td><td style='width:5%'><input class='form-control input-sm' type='text' id='refinnetWt"+refiningId+"' disabled/></td>"
									+"<td><input class='form-control input-sm' type='text' id='refinremarks"+refiningId+"'/></td><td id='addButton"+refiningId+"' align='center'><i style='cursor: pointer;'	id='removeRefining"
									+ refiningId
									+ "' onclick='removeRow("
									+ refiningId
									+ ")' class='fa fa-trash-o fa-lg"
									+ refiningId + "'></i>" + "</td></tr>");
					var $refinvendor = $('#refinvendor'+refiningId);
					if($.isEmptyObject(refinVendors)){
           $.getJSON('/OrderExecution/api/v1/refiningLOV?id='+meltingId, function(data) {
						
						refinVendors = data.payload.vCodeList;	
                        $.each(refinVendors, function(key, val) {
							
							$refinvendor.append('<option value="' + val.id + '">' + val.name
									+ '</option>'); 
							
							
						});
					
					});
					}
					else{
						$.each(refinVendors, function(key, val) {
							
							$refinvendor.append('<option value="' + val.id + '">' + val.name
									+ '</option>'); 
							
							
						});
						
					}
					
				}
				
				
				return false;

			});
	
	function getAssayerCert(id){
	
		//if(cert == null || cert =='' && purityValue == null || purityValue == ''){
			
		$.each(assayerCerts, function(key, val) {
			 if(val.assayerCertificateNumber == $('#refinassayercert'+id).val()){
				
				 $('#refinassayerPurity'+id).val(val.assayerPurity);
				 purityValue =val.assayerPurity;
				
			 } 
			
		});
		/* }
		else{
			 $('#refinassayerPurity'+id).val(purityValue);
		} */
		cert = $('#refinassayercert'+id).val();
		//purityValue =  $('#refinassayerPurity'+id).val();
				
			
			/* 	assayerCerts = data.payload.asayerCert;
			$.each(data.payload.asayerCert, function(key, val) {
				 $('#refinassayercert'+id).empty();		
				
					var $assayerCert = $('#refinassayercert'+id);
					//if(cert.indexOf(val.assayerCertificateNumber < 0)){
				$assayerCert.append('<option value="' + val.assayerCertificateNumber + '">' + val.assayerCertificateNumber
						+ '</option>'); 
				
				$('#refinassayerPurity'+id).val(val.assayerPurity);
				
					
			});
			
		}); */
	
	} 
	
	
	$("#issueToRefiner")
	.on(
			"click",
			function() {
				
				var ids = [];
				var meltingId = ${meltingDTO.meltingLotId};

				var meltingObjs = [];

				var meltingObjs = new Array();
				var mlbWeight = parseFloat($("#mlbWeight").text());
                var finalVal = mlbWeight;
               
				for (i = 1; i <= refiningId; i++) {
				//	++previousIndex;
				
					if($("#refingrossWt" + i).val()!=null && $("#refingrossWt" + i).val()!=''){
						var gWgt= parseFloat($("#refingrossWt" + i).val());
						finalVal = finalVal-gWgt;
						if(finalVal < 0){
							$.growl
							.error({
								message : "Weight Exceeded",
								duration : 10000
							});
							return;
						}
						}
				if(typeof ($("#refinvendor" + i).val()) != 'undefined'){

						var meltingData = {
							"meltingLotId" : meltingId,
							"vendorId" : $("#refinvendor" + i).val(),							
							"referenceNo" : $("#refinrefNo" + i).val(),
							"serialNo" : $("#refinserialNo" + i).val(),
							"grossWt" : $("#refingrossWt" + i).val(),
							"netWt" : $("#refinnetWt" + i).val(),							
							"remarks" : $("#refinremarks" + i).val(),
							"toLocation" : $("#refinlocation" + i).val(),
							"assayerCert" : $("#refinassayercert" + i).val(),
							"assayerPurity" : $("#refinassayerPurity" + i).val(),
							"mlbWgt" : finalVal
							
						};
						
						if(meltingData.grossWt == null || meltingData.grossWt == ''|| meltingData.netWt == null || meltingData.netWt == ''|| meltingData.vendorId == null || meltingData.vendorId == ''
							|| meltingData.assayerCert == null || meltingData.assayerCert == ''|| meltingData.assayerPurity == null || meltingData.assayerPurity == ''
								){
						$.growl.error({
							message : "Please fill all the mandatory fields",
							duration : 10000
						});
						return false;
					}
						

						meltingObjs.push(meltingData);
				}
					
				}

				postJSON(
						'/OrderExecution/api/v1/issueForRefining',
						JSON.stringify(meltingObjs),
						function(data) {
							
							
							if (1 == data.resCode) {
							
							
								for (i = 1; i <= refiningId; i++) {
									$("#disableTrRefining" + i).remove();
								}
								
                                if(data.payload.refinerist.length > 0){
                                	$("#mlbWeight").text(data.payload.refinerist[data.payload.refinerist.length-1].mlbWgt);
                                	if(data.payload.refinerist[data.payload.refinerist.length-1].mlbWgt ==0){
										
										$("#refinAdd").hide();
										$("#issueToRefiner").hide();
										
										
										
									}
                                	$("#cumulativeWgt").text(data.payload.refinerist[data.payload.refinerist.length-1].cumulativeRefinerWeight);
                                	$("#mltStatus" ).text(data.payload.refinerist[data.payload.refinerist.length-1].status);
                                	$.growl
    								.notice({
    									message : "Successfully created issue to refining:"+data.payload.refinerist[data.payload.refinerist.length - 1].meltingLotId,
    									duration : 10000,
    									title : 'Success'
    								});
                                }
                              
								for (i = 1; i <= data.payload.refinerist.length; i++) {
									var refiningObj = data.payload.refinerist[i - 1];
									
									var str ='<tr id="disableTrRefining"><td>'+refiningObj.createdDate+'</td><td>'+refiningObj.vendorCode+'</td>'+
									'<td>'+refiningObj.mivOrTvNo+'</td><td>'+refiningObj.toLocation+'</td>'+
									'<td>'+refiningObj.assayerCert+'</td><td>'+refiningObj.assayerPurity+'</td>';
									if(refiningObj.referenceNo != null){
										str = str+'<td>'+refiningObj.referenceNo+'</td>';
									}
									else{
										str = str+'<td></td>';
									}
									if(refiningObj.serialNo != null){
										str = str+'<td>'+refiningObj.serialNo+'</td>';
									}
									else{
										str = str+'<td></td>';
									}
									str = str+'<td>'+refiningObj.grossWt+'</td><td>'+refiningObj.netWt+'</td><td>'+refiningObj.remarks+'</td>'+
									'<td align="center"><button id="createRefReceipt'+refiningObj.mivOrTvNo+'" name="createRefinerIssue" type="button" class="btn btn-primary voffset" onclick="createRefIssue(\''
									+ refiningObj.mivOrTvNo
									+ '\',\''
									+ refiningObj.vendorCode
									+ '\',\''
									+ refiningObj.vendorId
									+ '\',\''
									+ refiningObj.grossWt
									+ '\',\''
									+ refiningObj.netWt
									+ '\');"><i class="fa fa-plus fa-lg" ></i> Receipt</button>&nbsp;<i style="cursor: pointer;" class="fa fa-print fa-lg" onclick="refiningMivPrint(\''
									+ refiningObj.mivOrTvNo
									+ '\')"></i>'
									+'</td></tr>';
									$("#dynamicTable4 tbody")
									.append(str);
								}					
									
								
								$("#assayerPurity").text($('#dynamicTable4 tr').eq(1).find('td').eq(5).text());
								$("#assayerCert").text($('#dynamicTable4 tr').eq(1).find('td').eq(4).text());
								
							
								refiningId=0;
							}
							else if(2==data.resCode){
								$.growl.error({
									message : "Duplicate Vendor",
									duration : 10000
								});
								return;
							}

							
							
						
							
						
							

						});

			});
	
	function createRefinerRecipet() {
	
		var meltingId = ${meltingDTO.meltingLotId};	
	/* 	if(refinerecipid == 1){
			$.growl.error({
				message : "No Data Found ",
				duration : 10000
			});
			return false;
		} */
     
		var meltingObjs = [];
		
		
		for (i = 1; i <= refinerecipid; i++) {
			if (typeof ($("#refinevendorcodeId" + i).val()) != 'undefined') {
          
			var meltingData = {
				"meltingLotId" : meltingId,
				"referenceNo" : $("#refinerefernceNo" + i).val(),
				"serialNo" : $("#refineserialNo" + i).val(),
				"grossWt" : $("#refinegrossWt" + i).val(),
				"netWt" : $("#refinenetWt" + i).val(),
				"refinerPurity" : $("#refinepurity" + i).val(),
				"recievedWgt" : $("#refinerecievedWt" + i).val(),
				"refinerLoss" : $("#refineLoss" + i).val(),
				"refineCharges" : $("#refinecharges" + i).val(),
				"remarks" : $("#refineremarks" + i).val(),
				"assayerCert" : $("#assayercert" + i).val(),
				"vendorId" :  $("#dynamicTable5 #refinevendorcodeId"+i).text(),
		         "mivOrTvNo" : $("#dynamicTable5 #refinemivId"+i).text()			
				

			};
			if(meltingData.grossWt == null || meltingData.grossWt == ''|| meltingData.netWt == null || meltingData.netWt == ''|| meltingData.refinerPurity == null || meltingData.refinerPurity == ''
					|| meltingData.recievedWgt == null || meltingData.recievedWgt == ''|| meltingData.refinerLoss == null || meltingData.refinerLoss == ''
						|| meltingData.refineCharges == null || meltingData.refineCharges == ''){
				$.growl.error({
					message : "Please fill all the mandatory fields",
					duration : 10000
				});
				return false;
			} 
			
			meltingObjs.push(meltingData);
			}
		}
		postJSON(
				'/OrderExecution/api/v1/receiptForRefiner',
				JSON.stringify(meltingObjs),
				function(data) {	
					if(1==data.resCode){
						$("#receiveFromRefiner").prop('disabled', true);
						
					for (i = 1; i <= refinerecipid; i++) {
						$("#disableTrRefining"+i).remove();
					}
					if(data.payload.refinerist.length > 0){
					$.growl
					.notice({
						message : "Successfully created refining receipt:"+data.payload.refinerist[data.payload.refinerist.length - 1].meltingLotId,
						duration : 10000,
						title : 'Success'
					});
					$("#mlbWeight").text(data.payload.refinerist[data.payload.refinerist.length-1].mlbWgt);	
					
					$("#cumulativereceiveWgt").text(data.payload.refinerist[data.payload.refinerist.length-1].cumulativeReceiveRefinerWeight);	
					
					}
					
					for (i = 0; i < data.payload.refinerist.length; i++) {
						var refinedObj = data.payload.refinerist[i];
						$("#createRefReceipt"+refinedObj.mivOrTvNo).hide();
						
						var str ="<tr id='disableTrRefining'>`<td>"+refinedObj.createdDate+"</td><td>"+refinedObj.vendorCode+"</td><td>"+refinedObj.mrvOrTvViewId+"</td>";
						if(refinedObj.referenceNo != null){
						str = str+"<td>"+refinedObj.referenceNo+"</td>";
						}
						else{
							str =  str+"<td></td>";
						}
						if(refinedObj.serialNo != null){
							str = str+"<td>"+refinedObj.serialNo+"</td>";
						}
						else{
							str =  str+"<td></td>";
						}
						str = str+"<td>"+refinedObj.grossWt+"</td><td>"
						+refinedObj.netWt+"</td><td>"+refinedObj.refinerPurity+"</td><td>"
						+refinedObj.recievedWgt+"</td>"
						+"<td>"+refinedObj.refinerLoss+"</td>";
						if(refinedObj.refineCharges == null || refinedObj.refineCharges==''){
							str = str+"<td></td>";
						}
						else{
							str = str+"<td>"+refinedObj.refineCharges+"</td>";
						}
						
						str = str+"<td>"+refinedObj.remarks
						+"</td><td align='center'><i style='cursor: pointer;'"+
						"class='fa fa-trash-o fa-lg fa-print' onclick='refinerMRVPrint(\""
											+ refinedObj.mrvOrTvViewId
											+ "\")'></i></td></tr>";
					$("#dynamicTable5 tbody")
					.append(str);							
							
							}
					}
					else{
						
						$.growl.error({
							message : "Duplicate Vendor",
							duration : 10000
						});
					}
 
				});
				
	
				}
	
	
	function calexpectedWgt(netWgt, purity, meltingNetwgt){
		
		if(netWgt == 0){
			$.growl.error({
				message : "Weight should not be zero",
				duration : 10000
			});
			$("#meltedPureWgt").val('');
			$("#meltednetWt").val('');
			$("#meltedgrossWt").val('');			
			return false;
		}
	$("#spillageWt").val('');
	$("#spillagepureWgt").val('');
	$("#meltingLoss").val('');
	
	var val1 = parseFloat(netWgt);
	var val2 = parseFloat(purity);
	var val3= parseFloat(meltingNetwgt);
	if(val1 > val3){
		$("#meltedgrossWt").val('');
		$("#meltedPureWgt").val('');
		$("#meltednetWt").val('');
		$.growl.error({
			message : "Weight excedded",
			duration : 10000
		}
		
		);	
		return false;
	}
	
	$("#meltednetWt").val($("#meltedgrossWt").val());
	var total = (val1*val2)/99.9;
	$("#meltedPureWgt").val(total.toFixed(3));
	}
	
	function calSpillagePureWgt(spillageWgt, purity, meltingNetwgt){
		$("#meltingLoss").val('');
		$("#spillagepureWgt").val('');
		var val1 = parseFloat(spillageWgt);
		var val2 = parseFloat(purity);
		var total = (val1*val2)/99.9;
		
		if(total >= 0){
			var spillageVal = total.toFixed(3);
		
			$("#spillagepureWgt").val(spillageVal);
		}
		
		
		
		var grossWgt = $("#meltedgrossWt").val();
		var spillageWt = $("#spillageWt").val();
		
		
		var val3 = parseFloat(grossWgt);		 
		var val4 = parseFloat(spillageWt);
		var totalWgt =val3+val4;
		var netWgt = parseFloat(meltingNetwgt);
		if(netWgt > totalWgt){
			var meltingLoss= netWgt-totalWgt;
			$("#meltingLoss").val(meltingLoss.toFixed(3));
		}
		else if(netWgt < totalWgt){
			$("#spillageWt").val(spillageWgt.substring(0, spillageWgt.length - 1));
			//calSpillagePureWgt($("#spillageWt").val(), purity, meltingNetwgt);
			$("#meltingLoss").val('');
			$("#spillagepureWgt").val('');
			$("#spillageWt").val('');
			$.growl.error({
				message : "Weight excedded",
				duration : 10000
			}
			
			);	
			
		}
		else{
			$("#meltingLoss").val(0);
		}
		
	}
	
	function MeltingMivPrint(mivno,vendorType)
	{   
		if(mivno!=null && vendorType!='Internal')
			{
		fieldFilters = {
	            "fieldFilters" : {
	                "mivNo" :mivno,
	                "mode" : "pdf",
	                "reportName" : "RPT_Delivery_Challan_Melting_GIV"
	            }
	        };
		jasperReport('RPT_Delivery_Challan_Melting_GIV.pdf', fieldFilters);
			}
	}	
	function meltingMRVPrint(mrvId)
	{ 
		
		var mrvHeaderid=mrvId.toString();
		
		if(!mrvHeaderid.includes(",") && mrvHeaderid!=null)
			{
	   fieldFilters = {
	           "fieldFilters" : {
	               "mrvNumber" :mrvHeaderid,
	               "mode" : "pdf",
	               "reportName" : "RPT_GRV_Melting"
	           }
	       };
		jasperReport('RPT_GRV_Melting.pdf', fieldFilters);
			}
		}
	
	function assayingMivPrint(assyMivNo)
	{
    
		fieldFilters = {
            "fieldFilters" : {
                "mivNo" :assyMivNo,
                "mode" : "pdf",
                "reportName" : "RPT_Delivery_Challan_Assayer"
            }
        };
	jasperReport('RPT_Delivery_Challan_Assayer.pdf', fieldFilters);
	}
	function assayerMRVPrint(mrvAssayerid)
	{
		if(mrvAssayerid!=null)
			{
		fieldFilters = {
	            "fieldFilters" : {
	            	 "mrvNumber" :mrvAssayerid,
	                 "mode" : "pdf",
	                 "reportName" : "RPT_GRV_Assayer"
	            }
	        };
		jasperReport('RPT_Assayer_MRV.pdf', fieldFilters);
			}
	}
	function refiningMivPrint(refMivNo)
	{
		fieldFilters = {
	            "fieldFilters" : {
	                "mivNo" :refMivNo,
	                "ChallanType":"GIVRefiner",
	                "mode" : "pdf",
	                "reportName" : "RPT_Delivery_Challan"
	            }
	        };
		jasperReport('RPT_ Refining_MIV.pdf', fieldFilters);
		
		
	}

	function refinerMRVPrint(mrvRefinerId)
	{
		if(mrvRefinerId!=null)
			{
		fieldFilters = {
	            "fieldFilters" : {
	            	 "mrvNumber" :mrvRefinerId,
	            	 "ChallanType":"Refiner",
	                 "mode" : "pdf",
	                 "reportName" : "RPT_GRV_Refiner"
	            }
	        };
		jasperReport('RPT_GRV_Refiner.pdf', fieldFilters);
		
			}
	}
	$(document).ready(function() {
		cert =null;
		purityValue = null;
	
	});
	
	
	 $("#receiveFromRefiner").prop('disabled', true);
	 $(document).on("change", ".negitiveValidation", function() {
			var val = $(this).val();
			 if($(this).val().indexOf('.')!=-1){         
			       if($(this).val().split(".")[1].length > 3){                
			           if( isNaN( parseFloat( this.value ) ) ) return;
			           this.value = parseFloat(this.value).toFixed(3);
			       }  
			    }            
			    return this; //for chaining
			if (parseInt(val) < 0 || isNaN(val)) {
				$.growl.error({
					message : "Invalid Number",
					duration : 3000
				});
				$(this).val("");
				$(this).focus();
			}
		});	
	 
	
	
</script>


