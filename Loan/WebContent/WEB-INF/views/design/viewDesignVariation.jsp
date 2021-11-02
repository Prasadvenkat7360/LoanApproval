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
						<th>Action</th>
						<th>Design Complexity</th>
						<th>Design Head Remarks</th>
						<th>SE/IM Approval Status</th>
						<th>SE/Inventory Person Remarks</th>
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
						
									<td><label for="${variation.designVariationStatus.status}">${variation.designVariationStatus.status}</label>

									</td>
									<td><label for="${variation.complexity.type}">${variation.complexity.type}</label>
									</td>
									<td><label for="${variation.remark}">${variation.remark}</label>
									</td>
									<td><label for="${variation.seStatus}">${variation.seStatus}</label>
									</td>
									<td><label for="${variation.seFeedback}">${variation.seFeedback}</label>
									</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
		<div class="modal-footer  text-center">
			<button type="submit" class="btn btn-warning" data-dismiss="modal"
				aria-hidden="true">
				<i class="fa fa-times"></i>Close
			</button>
		</div>
	</div>
	<div class="clearfix">&nbsp;</div>
</form:form>

<script type="text/javascript" src="resource/oe/assets/js/app/design.js"></script>


