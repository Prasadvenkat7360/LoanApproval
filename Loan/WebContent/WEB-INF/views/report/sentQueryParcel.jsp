<!-- 
	##	Author UI 		: 	Raksha
	## API Integration	:  	Dipankar Naha
	##	Date Creation 	: 	03-04-2017
	## 	Description		:	SENT QUERY PARCEL REPORT HAVING SEARCH AND EXPORT FUNCTIONALITY
 -->
<script src="resource/oe/assets/js/app/sentQueryParcel.js"></script>

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!--  Metal Balance Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop fa-lg"></i> &nbsp; Sent Parcel Report
					</h1>
				</div>

				<form class="form-horizontal" id="sentQryParcel" action="javascript: void(0);">					
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-sm-2 form-field">
							<label>Vendor Code/Name</label> <input type="text"
								class="form-control" placeholder="Vendor Code/Name"
								id="vendorCode" name="vendorCode"> <input
								id="vendorCode-value" type="hidden" name="code">
						</div>

						<div class="col-sm-2 form-field">
							<label>DC Code/Name</label> <input type="text"
								class="form-control" placeholder="DC Code/Name" id="dcCode"
								name="dcCode"> <input id="dcCode-value" type="hidden"
								name="code">
						</div>

						<div class="col-sm-2 form-field">
							<span class="required">*</span>&nbsp;<label> Date Range
								From</label>
							<div class="input-group">
								<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									name="fromDate" id="fromDate" placeholder="DD/MM/YYYY">
								<label for="fromDate" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>

						<div class="col-sm-2 form-field">
							<span class="required">*</span>&nbsp;<label> Date Range
								To</label>
							<div class="input-group">
								<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
									name="toDate" id="toDate" placeholder="DD/MM/YYYY"> <label
									for="toDate" class="input-group-addon cursor"><span
									class="fa fa-calendar"></span></label>
							</div>
						</div>
						<div class="col-sm-2 form-field">
							<label>Send Parcel System No</label> <select name="parcelSysNo" id="parcelSysNo" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>

						<div class="col-sm-2 form-field">
							<label>GIV No</label><input type="text" class="form-control"
								placeholder="GIV No" id="mivNo" name="mivNo">
						</div>
					</div>
					<div class="row">

						<div class="col-sm-2 form-field">
							<label>Courier Name</label><select name="courierName"
								id="courierName" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>

						<div class="col-sm-2 form-field">
							<label>Courier Doc. No</label><input type="text"
								class="form-control" placeholder="Courier Doc No"
								id="courierDNo" name="courierDNo">
						</div>
						<div class="col-sm-2 form-field">
							<label>Status</label> <select id="status" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						
					</div>

					<div class="clearfix">&nbsp;</div>

					<div class="row voffset2" align="center">
						<button class="btn btn-sm btn-primary voffset" type="submit"
							name="search" id="search">
							<i class="fa fa-search fa-lg"></i> Search
						</button>
						&nbsp;
						<button id="clearAll" class="btn btn-sm btn-warning voffset"
							type="reset">
							<i class="fa fa-times fa-lg"></i>&nbsp; Clear
						</button>
						&nbsp;
						<button class="btn btn-sm btn-primary voffset" type="button"
							name="export" id="export" >
							<i class="fa fa-file-excel-o fa-lg"></i> Export
						</button>
					</div>					
				</form>
				<!-- Metal Balance Search Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started -->
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->

				<div class="clearfix">&nbsp;</div>

			</div>
		</div>
	</div>
</div>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>	