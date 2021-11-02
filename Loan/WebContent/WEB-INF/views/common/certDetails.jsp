<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal-header">
	<button type="reset" id="closeSearch" class="close"	data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
		<i class="fa fa-pencil-square-o"></i> &nbsp; Cert Reqd for Used Stones : 
	</h3>
	<div class="pull-right" style="margin-top: -30px; margin-right: 30px;">
		<select name="suppByCert" id="suppBy" class="form-control selecter">
			<option value="Yes">Yes</option>
			<option value="No">No</option>
		</select>
	</div>
</div>
<!-- Modal Body -->
<div class="modal-body">
	<div class="container">
		<form class="form-horizontal" autocomplete="off" role="form" name="certDetailsForm" id="certDetailsForm" onsubmit="return false;">
			<div class="modal-body">
				
				<div class="row">
					<div class="col-md-12">
						<table class="table table-bordered table-hover">
							<thead>
								<tr>
									<th>Sl. No.</th>
									<th>Certificate Number</th>
									<th>Stone Wt.</th>
									<th width="5%">Used/Return</th>
								</tr>
							</thead>
							
							<tbody>
								<tr>
									<td></td>
									<td></td>
									<td></td>
									<td class="text-center" width="5%"><input type="checkbox" name="usedReturn" /></td>
								</tr>
							</tbody>
						</table>
						<c:forEach var="listValue" items="${certificates}">
					        <li>${listValue}</li>
					      </c:forEach> 
					</div>
				</div>
			</div>
			<div class="modal-footer text-center">
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

<script type="text/javascript" src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app/certDetails.js'></script>