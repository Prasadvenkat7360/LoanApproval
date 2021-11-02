<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA :
	## 	Date Creation : 03/06/2016
 -->

<div class="main-container">
	<div class="container metalRate">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Send Parcel Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i>&nbsp; Metal Belongs
					</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary voffset" data-toggle="modal"
							data-target="#metalRateModal" type="button"
							href="javascript:void(0);"><i class="fa fa-plus"></i>
							&nbsp;Add </a>
					</div>
				</div>
				<!-- Pending Melting Heading Add Ended -->

				<!-- Pending Melting Search Started -->
				<form class="form-horizontal" id="pendingMelting">
					<div class="mobile-responsive">
						<div class="row">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
								<!-- label class="radio-inline"><input type="radio" name="Region" id="Region">Region</label>
							<label class="radio-inline"><input type="radio" name="Store" id="Store">Store</label-->
								<label>Metal Belogs to</label> <select
									id="metalBelongsTo" class="form-control">
									<option value="" selected>--Select--</option>
									<option value="company" id="company">Company</option>
									<option value="nonCompany" id="nonCompany">Non Company</option>
								</select>
							</div>


						</div>
						
					</div>
				</form>
				<!-- Pending Melting Search Ended -->

				<div class="clearfix">&nbsp;</div>

				<!-- JqGrid Started -->
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<!-- JqGrid Ended -->

				<div class="clearfix">&nbsp;</div>

			</div>
		</div>
	</div>
</div>
	<script src="resource/oe/assets/js/app/metalBelongs.js"></script>
	