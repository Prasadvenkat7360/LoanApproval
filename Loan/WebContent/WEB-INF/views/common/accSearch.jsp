<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<form class="form-horizontal" autocomplete="off" role="form" name="manageAccForm" id="manageAccForm" onsubmit="return false;">
<div class="modal-header">
	<button type="reset" id="closeSearch" class="close" data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
		<i class="fa fa-pencil-square-o"></i> &nbsp; Accessory Search
	</h3>
</div>
<!-- Modal Body -->
<div class="modal-body">
	<div class="container">
			<input type="hidden" id="forSegment" value='<c:out value="${forSeg.id}" />' />
			<div class="modal-body">
				<div class="row">
					<div id="accDet"></div>
				</div>
				<div class="col-md-12 mobile-responsive">					
					<div class="col-md-6">
						<div class="row">
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Acc. Supp. By</label>
								<select	id="accSupBy" name="accSupBy" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Segment </label>
								<input type="text"	id="accSegment" name="accSegment"	placeholder="Segment" disabled class="form-control" />
							</div>
							
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Acc. Main Cat </label>
								<select	id="accMainCat" name="accMainCat" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Acc. Sub Cat</label>
								<select	id="accSubCat" name="accSubCat" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="row">
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Cost Range</label>
								<select	id="accCostRange" name="accCostRange" class="form-control"><option value="" selected label="--Select--" /></select>
							</div>
							<div class="col-md-12 form-field">
								<label>Acc. Code</label> 
								<input type="text"	id="accArticleCode" name="accArticleCode"	placeholder="Acc Code" disabled class="form-control" />
								<input type="hidden" id="accArticleId" name="accArticleId"	placeholder="Stone Article Code" disabled class="form-control" />
							</div>

							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>UOM</label> 
								<input	type="text" id="uomAcc" name="uomAcc" placeholder="UOM" class="form-control" disabled />
							</div>
						</div>
					</div>					
				</div>
			</div>		
	</div>
	<!-- Modal Window Form End -->
</div>
<div class="modal-footer">
	<button type="submit" id="selectAcc" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-check fa-lg"></i>&nbsp;Select</button>
	<button type="button" id="clear" class="btn btn-warning"><i class="fa fa-times"></i>&nbsp;Clear</button>
</div>
</form>
<script type="text/javascript" src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app/accSearch.js'></script>


