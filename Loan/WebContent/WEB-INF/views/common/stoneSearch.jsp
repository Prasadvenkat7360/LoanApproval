<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal-header">
	<button type="reset" id="closeSearch" class="close"
		data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
		<i class="fa fa-pencil-square-o"></i> &nbsp; Stone Search
	</h3>
</div>
<!-- Modal Body -->
<div class="modal-body">
	<div class="container">
		<form class="form-horizontal" autocomplete="off" role="form" name="manageStoneForm" id="manageStoneForm" onsubmit="return false;">
			<input type="hidden" id="forSegment" value='<c:out value="${forSeg.id}" />' />
			<div class="modal-body">
				<div class="row">
					<div id="stoneDet"></div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Supplied By : </label>
							<div class="col-md-8">
								<select name="suppBy" id="suppBy" class="form-control selecter"
									required>
									<option value="">-- Select Option --</option>
									<c:forEach var="supBy" items="${suppliedBy}">
										<option value="${supBy.id}">${supBy.name}</option>
									</c:forEach>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Segment : </label>
							<div class="col-md-8">
								<select name="segment" id="segmentName"	class="form-control selecter" required>
									<option value="">-- Select Option --</option>
									<c:if test="${not empty forSeg}">
										<option value="${forSeg.id}">${forSeg.description}</option>
									</c:if>
								</select> 
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Main Cat : </label>
							<div class="col-md-8">
								<select id="mainCategory" name="mainCategory"
									class="form-control selecter" required>
									<option value="">-- Select Option --</option>
								</select> <input type="hidden" id="mainCatCode" />
							</div>
						</div>

						<div class="form-group" id="showShape" style="display: none">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Shape : </label>
							<div class="col-md-8">
								<select id="shape" name="shape" class="form-control selecter"
									required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>

						<div class="form-group" id="showSubCategory">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Sub Cat : </label>
							<div class="col-md-8">
								<select id="subCategoryName" name="subCategory"
									class="form-control selecter" required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label"> Code : </label>
							<div class="col-md-8">
								<input type="text" class="form-control" name="stoneCode"
									id="stoneCode" readonly required>
							</div>
						</div>

						<div class="form-group" id="showWeightRange">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Weight Range : </label>
							<div class="col-md-8">
								<select name="weightRange" id="weightRange"
									class="form-control selecter" required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>

						<div class="form-group" id="showClarity">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Clarity : </label>
							<div class="col-md-8">
								<select name="clarity" id="clarity"
									class="form-control selecter" required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>

						<div class="form-group" id="showActualColor">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Actual Color : </label>
							<div class="col-md-8">
								<select name="actualColor" id="actualColor"
									class="form-control selecter" required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group" id="showColor">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Color : </label>
							<div class="col-md-8">
								<select name="color" id="color" class="form-control selecter"
									required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>

						<div class="form-group" id="showCutGrade">
							<label class="col-md-4 control-label"><span
								class="required">*</span> Cut Grade : </label>
							<div class="col-md-8">
								<select name="cutGrade" id="cutGrade"
									class="form-control selecter" required>
									<option value="">-- Select Option --</option>
								</select>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label">UQC : </label>
							<div class="col-md-8">
								<input type="text" class="form-control" name="uom" id="uom"
									readonly>
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label">SubCategory Desc: </label>
							<div class="col-md-8">
								<input type="text" class="form-control" name="subCategoryDesc" id="subCategoryDesc" readonly>
							</div>
						</div>
						<div class="form-group" id="hsnDiv">
							<label class="col-md-4 control-label"><span class="required">*</span>HSN Code: </label>
							<div class="col-md-8">
								<input type="text" class="form-control" disabled name="hsnCode" id="hsnCode" required>
								<input type="hidden" class="form-control" disabled name="hsnId" id="hsnId" required>
							</div>
						</div>
						<div class="form-group" id="showCostRange">
							<label class="col-md-4 control-label"><span	class="required">*</span> Cost Range : </label>
							<div class="col-md-8">
								<select name="costRange" id="costRange" class="form-control selecter"><option value="">-- Select Option --</option></select>
							</div>
						</div>
						
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="submit" id="selectStone" class="btn btn-primary"
					data-dismiss="modal">
					<i class="fa fa-check fa-lg"></i>&nbsp;Select
				</button>
				<button type="button" id="clear" class="btn btn-warning">
					<i class="fa fa-times"></i>&nbsp;Clear
				</button>
			</div>
		</form>
	</div>
	<!-- Modal Window Form End -->
</div>

<script type="text/javascript" src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app/stoneSearch.js'></script>


