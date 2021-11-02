<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : 
	## 	Date Creation : 21/07/2016
 -->

<div class="main-container">
	<div class="container metalRate">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Send Parcel Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i>&nbsp; Child Master
					</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary voffset" data-toggle="modal"
							data-target="#createChildMaster" type="button"
							href="javascript:void(0);"><i class="fa fa-plus"></i>
							&nbsp;Create </a>
					</div>
				</div>
				<!-- Pending Melting Heading Add Ended -->

				<!-- Pending Melting Search Started -->
				<form class="form-horizontal" id="pendingMelting">
					<div class="mobile-responsive">
						<div class="row">
							<div id="store-lov"
								class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Category</label> <select id="categorySearch" class="form-control">
									<option value="" selected>--Select Option--</option>
									<option value="fgSegments">FG Segments</option>
									<option value="jewelTypes">Jewel Types</option>
									<option value="mainCat">Main Categories</option>
									<option value="subCat">Sub Categories</option>
									<option value="stoneAccSegments">Stone/Acc. Segment</option>
									<option value="stoneAccCat">Stone/Acc. Category</option>
									<option value="stoneAccSubCat">Stone/Acc. Sub Category</option>
								</select>
							</div>
						
							<div id="store-lov"
								class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Code</label> <input type="text" name="codeSearch" id="codeSearch"
									class="form-control" />
							</div>
						
							<div id="store-lov"
								class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Name</label> <input type="text" name="nameSearch" id="nameSearch"  data-validation="number" data-validation-allowing="range[1;100]"
									class="form-control" />
							</div>						
							
						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary voffset" type="button"
								name="Search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							
						</div>
						<div class="clearfix">&nbsp;</div>
						<div id="listChildMaster" class="container row" align="center">
							<div class="resposive-table-data narrow text-center">

								<table class="table table-bordered table-hover">
									<thead>

										<tr>
											<th>Category</th>
											<th>Code</th>
											<th>Name</th>
											<th>GL Code</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td id="catVal"></td>
											<td id="codeVal"></td>
											<td id="nameVal"></td>
											<td></td>
											<td><i id="editChildMaster"  data-toggle="modal"
							data-target="#createChildMaster" style="cursor:pointer;" class="fa fa-pencil fa-lg"></i></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<!-- Pending Melting Search Ended -->

					</div>
				</form>
			</div>
		</div>
	</div>
</div>


<!-- Create Issue For Melting Modal Modal Pop-up Started ##########################  -->
<div class="modal fade" id="createChildMaster" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; Create 
					Child Master
				</h3>
			</div>
			<!-- Modal Create Child Master Body -->
			<div class="modal-body">
				<div class="container sentParcel-Edit">
					<form class="form-horizontal" id="designRA">
						<div class="mobile-responsive">
							<div class="row">
							<div id="store-lov"
								class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Category</label> <select id="category" class="form-control">
									<option value="" selected>--Select Option--</option>
									<option value="fgSegments">FG Segments</option>
									<option value="jewelTypes">Jewel Types</option>
									<option value="mainCat">Main Categories</option>
									<option value="subCat">Sub Categories</option>
									<option value="stoneAccSegments">Stone/Acc. Segment</option>
									<option value="stoneAccCat">Stone/Acc. Category</option>
									<option value="stoneAccSubCat">Stone/Acc. Sub Category</option>
								</select>
							</div>
						
							<div id="store-lov"
								class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Code</label> <input type="text" name="code" id="code"
									class="form-control" />
							</div>
						
							<div id="store-lov"
								class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>Name</label> <input type="text" name="name" id="name"
									class="form-control" />
							</div>
						
							<div id="glCode-Lov"
								class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<label>GL Code</label> <input type="text" name="glCode" id="glCode"
									class="form-control" />
							</div>
						</div>
						</div>
					</form>
				</div>
			<!-- Modal Edit Child Master Footer -->
			</div>
			<div class="modal-footer  text-center">
			
			   <button class="btn btn-primary voffset" type="button" name="save"
					id="addChildMaster">
					<i class="fa fa-plus fa-lg"></i> Add
				</button>
		
				&nbsp;
				<button type="button" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>
			</div>
		</div>
	</div>
	</div>
	<!-- Create Issue For Melting Modal Modal Pop-up Ended ##########################  -->
<script src="resource/oe/assets/js/app/childMaster.js"></script>