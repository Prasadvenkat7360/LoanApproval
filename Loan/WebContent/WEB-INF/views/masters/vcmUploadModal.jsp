<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<form:form method="POST" action="vcmUploadFile"
	enctype="multipart/form-data" id="vcmUploadForm" onload="clear()">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">&times;</button>
		<!--  Title Goes Here -->
		<h4 class="modal-title">
			<i class="fa fa-upload fa-lg"></i> &nbsp; Vendor Cost Maintenance -
			Upload
		</h4>
	</div>
	<div class="clearfix">&nbsp;</div>
	<div class="modal-body">
		<div class="container">
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th width="60%">Selected File to upload</th>
						<th width="20%">File Size</th>
						<th width="20%"></th>
					</tr>

					<tr>
						<td width="60%">
							<div id="fileName"></div>
						</td>
						<td width="20%">
							<div id="fileSize"></div>
						</td>
						<td width="20%">
							<div align="center" style="position: relative">
								<div class="btn-sm btn-primary" style="max-width: 80px;">
									<i class="fa fa-plus-circle fa-lg"></i> Browse <input
										id='vcmBrowseFile' class="fileUpload" type="file"
										name="vcmBrowseFile" onchange="showFileName()"
										onclick="clear()" />
								</div>
							</div>
						</td>
					</tr>
				</thead>
			</table>
		</div>

		<div class="modal-footer  text-center">
			<button type="button" class="btn btn-primary" id="vcmUploadSave"
				name="vcmUploadSave" disabled>
				<i class="fa fa-floppy-o"></i> Save
			</button>
			<button type="button" class="btn btn-warning" data-dismiss="modal"
				aria-hidden="true">
				<i class="fa fa-times"></i>Close
			</button>
		</div>
	</div>
	<div class="clearfix">&nbsp;</div>
</form:form>

<script src="resource/oe/assets/js/app/vcmUploadModal.js"></script>
