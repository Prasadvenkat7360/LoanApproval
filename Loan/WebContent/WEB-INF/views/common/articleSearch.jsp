
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="modal-header">
	<button id="closeSearch" class="close" data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
		<i class="fa fa-pencil-square-o"></i> &nbsp; Article Search
	</h3>
</div>
<form id="articleSearchForm">
<!-- Modal Body -->
<div class="modal-body">
	<div class="container">
		<!-- Modal Window Create Send Parcel Form End -->
		<form action="#" method="post" id="article">
			<input type="hidden" id="vId" value='<c:out value="${vId}" />'/>
			<input type="hidden" id="storeId" value='<c:out value="${storeId}" />'/>
			<input type="hidden" id="metalTypeId" value='<c:out value="${metalId}" />'/>
			<input type="hidden" id="isPair" />
			<!-- First Row Started -->
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Segment</label> <select id="segment" class="form-control">
						<option value="" selected label="Select" />
						<c:forEach var="segment" items="${sTypes}">
							<option value="${segment.id}">${segment.description}</option>
						</c:forEach>
					</select>
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Jewel Type </label> <select id="jewelType"
						class="form-control">
						<option value="" selected label="Select" />
					</select>
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Main Category</label> <select id="category"
						class="form-control">
						<option value="" selected label="Select" />
					</select>
					<input type="text" disabled class="form-control" id="categoryEdit" />
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Sub Category</label> <select id="subCategory"
						class="form-control">
						<option value="" selected label="Select" />
					</select>
					<input type="text" disabled  class="form-control" id="subCategoryEdit" />
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Article Code</label> <input type="text" class="form-control"
						placeholder="Article Code" id="articleCode" readonly>
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Article Description</label> <input type="text"
						class="form-control" placeholder="Article Description"
						id="articleDesc" readonly>
				</div>
				
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>HSN Code</label> <input type="text"
						class="form-control" placeholder="Article Description"
						id="hsnMasterCode" readonly>
						 <input type="hidden" class="form-control" id="hsnMasterId">
						 <input type="hidden" class="form-control" id="taxStructureId" >
				</div>
				
				
			</div>			
		</form>
	</div>

	<!-- Modal Window Form End -->
</div>

</form>
<!-- Modal  Footer -->
<div class="modal-footer  text-center">
	<button type="submit" class="btn btn-primary" id="articleSelect" data-dismiss="modal">
		<i class="fa fa-check fa-lg"></i>&nbsp;Select
	</button>
	<button type="button" id="clear" class="btn btn-warning" data-dismiss="modal">
		<i class="fa fa-times"></i>&nbsp;Close
	</button>
</div>

<script type="text/javascript"	src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app/articleSearch.js'></script>
