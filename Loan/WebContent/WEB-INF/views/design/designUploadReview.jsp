<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<form:form method="POST" action="designSubmit" id="designReview">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">&times;</button>
		<!--  Title Goes Here -->
		<h4 class="modal-title">Design Review</h4>
	</div>
	<div class="clearfix">&nbsp;</div>
	<div class="modal-body">
		<div class="container-fluid">
			<table class="table table-responsive table-bordered table-hover">
				<thead>
					<tr>
						<th>#</th>
						<th>Design</th>
						<th><span class="required">*</span>Action</th>
						<th><span class="required">*</span>Design Complexity</th>
						<th>Remarks</th>
					</tr>
				</thead>
				<tbody id="reviewApproval">
					<c:forEach items="${design.designVariation}" var="variation"
						varStatus="loop">
						<tr>
							<td>${loop.index+1}</td>
							<td><c:choose>
									<c:when test="${not empty variation.fileName}">
										<a href="/uf/${variation.filePath}/${variation.fileName}"
											class="thumbnail" target="_blank"> <img
											src='/uf/${variation.filePath}/${variation.fileName}'
											width="40px" height="40px" />
										</a>
									</c:when>
									<c:otherwise></c:otherwise>
								</c:choose></td>
							<c:choose>
								<c:when
									test="${variation.designVariationStatus.status eq 'Ready'}">
									<td><select id="a${variation.id}" name="action" class="form-control">
											<option value="">-- Select --</option>
											<c:forEach items="${actions}" var="action">
												<c:if test="${action.id!='N'}">
													<option value="${action.id}">${action.name}</option>
												</c:if>	<!-- non rework is removed from list with condition -->
												<%-- <option value="${action.id}">${action.name}</option> --%>
											</c:forEach>
									</select></td>
									<!-- <td>&nbsp;</td> -->
									<td><select id="c${variation.id}" name="complexity" class="form-control">
											<option value="">-- Select --</option>
											<c:forEach items="${complexity}" var="complexity">
												<option value="${complexity.id}">${complexity.name}</option>
											</c:forEach>
									</select></td>
									<td><textarea rows="4" name="remarks"
										id="r${variation.id}" class="form-control" maxlength="280"></textarea></td>
								</c:when>
								<c:otherwise>
									<td><label for="${variation.designVariationStatus.status}">${variation.designVariationStatus.status}</label>

									</td>
									<td><label for="${variation.complexity.type}">${variation.complexity.type}</label>
									</td>
									<td><label for="${variation.remark}">${variation.remark}</label>
									</td>
								</c:otherwise>
							</c:choose>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
		<div class="modal-footer  text-center">
			<button type="button" class="btn btn-primary btn-sm" id="save" name="save">
				<i class="fa fa-floppy-o"></i> Save
			</button>

			<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"
				aria-hidden="true">
				<i class="fa fa-times"></i>Close
			</button>
		</div>
	</div>
	<div class="clearfix">&nbsp;</div>
</form:form>



<script type="text/javascript" src="resource/oe/assets/js/app/design.js"></script>
<script type="text/javascript">
	$(document)
			.ready(
					function() {
						
						

						var obj = new Array();
						<c:forEach items="${design.designVariation}" var="variation">
						obj.push("${variation.id}");
						</c:forEach>

					

						$("#save").on('click',function() {
											
											if (validateForm(obj)) {
												
												postJSON(
														"${pageContext.request.contextPath}/api/v1/designApprove",
														JSON
																.stringify(variationListValues(obj)),
														function(data) {
															
															$("#save").prop("disabled",	true);
															

															if (1 == data.resCode) {
																$("#jqxgrid").jqxGrid("updatebounddata");
																 $("#btnReviewDA").modal('hide');
																$.growl
																		.notice({
																			message : data.mesgStr, duration: 10000, title: 'Success'
																		});
															} else {
																$.growl
																		.error({
																			message : data.mesgStr, duration: 10000
																		});
															}

														});
											}
										});

						function validateForm(obj) {

							var actionValid = true;
							var designValid = true;
							var remarksValid = true;
							if (obj.length == 0) {
								$.growl.error({
									message : "No Record Found!", duration: 10000
								});
							} else {
								for (i = 0; i < obj.length; i++) {

									var action = $("#a" + obj[i]).val();
									var complexity = $("#c" + obj[i]).val();
									var remarks = $("#r" + obj[i]).val();

									if (action == '') {
										actionValid = false;
									}

									if ((action == 'R' || action == 'N') && remarks == '') {
										remarksValid = false;
									}

									if (complexity == '') {
										designValid = false;
									}
								}

								if (actionValid == false) {
									$.growl.error({
										message : "Action Field is mandatory!", duration: 10000
									});
								}
								if (designValid == false) {
									$.growl
											.error({
												message : "Design Complexity Field is mandatory!", duration: 10000
											});
								}
								if (remarksValid == false) {
									$.growl
											.error({
												message : "Remarks Field is mandatory for Action type Re-work or Not-Approve!", duration: 10000
											});
								}
								if (actionValid != false
										&& designValid != false
										&& remarksValid != false) {
									return true;
								}
							}

						}

					});

	function variationListValues(obj) {
		var designList = new Array();
		
		for (i = 0; i < obj.length; i++) {
			variations = {};
			variations["id"] = obj[i];
			variations["designStatus"] = $("#a" + obj[i]).val();
			variations["complexity"] = $("#c" + obj[i]).val();
			variations["remark"] = $("#r" + obj[i]).val();
			if (undefined != $("#a" + obj[i]).val()) {
				designList.push(variations);
			}
		}

		return designList;
	}
</script>
