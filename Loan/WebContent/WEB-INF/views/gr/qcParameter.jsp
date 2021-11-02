
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Modal Edit Receive Parcel Heading -->
<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
	<i class="fa fa-pencil-square-o"></i>&nbsp;
		QC For Finished Goods 
	</h3>
</div>
<!-- Modal Edit Receive Parcel Body -->
<div class="modal-body" style="max-height: 50vh; overflow: auto;">
	<div class="container">
		<!-- Modal Window Edit Receive Parcel Form End -->
		<form class="form-horizontal"  autocomplete="off" role="form"
		 action="" method="post" id="qcParameter">
			<div class="row">
				<table id ="table1" class="table table-bordered table-hover">
					<thead>
						<tr>
							<th>Sl No.</th>
							<th>Parameter</th>
							<th>QC -Y/N</th>
							<th>Remarks</th>
						</tr>
					</thead>
					<tbody>
					<c:forEach var="segment" items="${qcfgSegmentList}" varStatus="status">
						<tr>
							<td>${status.count}</td>
							<td class="text-wrap"> <input type="hidden" name="description" value="${segment.description}">${segment.description}</td>
							<td id="second_td">
								<select name="${segment.description}" id="row_${status.count}" onChange="QcParameter(${status.count})" class="isActive">
									<option  value="Yes" selected>Yes</option>
									<option  value="No">No</option>
								</select>
								<input class="segmentCode" type="hidden" name="code" value="${segment.code}">
							</td>
							<td id="first_td"><input type="text" class="remarksDesc" name="remarks" id="row1_${status.count}" disabled /></td>
						</tr>
						</c:forEach>
					</tbody>
				</table>
			</div>

		</form>
		<!-- Modal Window Edit Receive Parcel Form End -->

	</div>
</div>

				<div class="row modal-footer  text-center" align="center">
					<button class="btn btn-primary voffset" type="button" 
						id="updateParam">
						<i class="fa fa-floppy-o"></i> Ok
					</button>
				</div>