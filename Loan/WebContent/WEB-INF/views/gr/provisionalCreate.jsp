<!-- 
	##	Author UI : Pooja Sangve(UI)
	## 	Author JAVA : Shreevardhan T L 
	## 	Date Creation : 05/09/2017
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Heading Add Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Provisional To Actual Create
					</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary voffset" type="button"
							id="backFromCreate"
							href="javascript:showContentPage('provToActual','bodySwitcher')">
							<i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>
				</div>
				
				<form class="form-horizontal" id="provToActualCreate">
					<div class="mobile-responsive">
						<div class="row">
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
									<label>Date From</label>
									<div class="input-group">
										<input type="text" readonly class="date-picker form-control dateBackground"
											id="orderFromDateC" placeholder="DD/MM/YYYY"> <label
											for="orderFromDateC" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									</div>
								</div>
								<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 form-field">
									<label>Date To</label>
									<div class="input-group">
										<input type="text" readonly class="date-picker form-control dateBackground"
											id="orderToDateC" placeholder="DD/MM/YYYY"> <label
											for="orderToDateC" class="input-group-addon cursor"><span
											class="fa fa-calendar"></span></label>
									 </div>
								</div>
						  </div>
						  <div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="SearchC" id="SearchC">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAllC" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
						</div>
					 </div>
				</form>
<!-- ###########################################################################################################################  -->

<div class="clearfix">&nbsp;</div>
	<form action="#" method="post" name="createProvisionalAc" id="createProvisionalAc">
			<div id="tabProAct" class="tabmelting">
				<div class="panel with-nav-tabs panel-primary">
					<div class="panel-heading">
						<ul class="nav nav-tabs">
							<li id="grPanelDetailsC" class="active"><a data-toggle="tab"href="#grDetailsC"><i class="fa fa-user fa-lg"></i>&nbsp;GR Details</a></li>
							<li id="tabPanelStoneC"><a data-toggle="tab"href="#tabStoneC"><i class="fa fa-filter fa-lg"></i>&nbsp;Stones</a></li>
							<li id="tabPanelAccessoriesC"><a data-toggle="tab"href="#tabAccessoriesC"><i class="fa fa-filter fa-lg"></i>&nbsp;Accessories</a></li>
						</ul>
					</div>
					<div class="panel-body panel-body-fixed-height">
						<div class="tab-content">
							<!--  Tab 1 Started  -->
							<div id="grDetailsC" class="tab-pane fade in active">
								<div class="heading-block">								
								<h4>GR Details</h4>								
								<div class="heading-block-action">						
									<button type="button" class="btn btn-primary pull-right" id="saveGRDetailsC"><i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save</button>&nbsp;
								</div>
							</div>
								<div class="row">
									<div style="position: relative; z-index: 1">
										<div id="jqxgrid" class="tabjqgrid"
											style="font-size: 13px; font-family: Verdana; float: left;"></div>
									</div>
								</div>
							</div>
							
							<!--  Tab 2 Started  -->
							<div id="tabStoneC" class="tab-pane fade in">
								<div class="heading-block">
									<h4>Stones</h4>
									<div class="heading-block-action">						
										<button  type="button" class="btn btn-primary pull-right" id="saveGRStC"><i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save</button>&nbsp;
									</div>
								</div>
								<div class="row">
									<div style="position: relative; z-index: 1">
										<div id="jqxgrid" class="tabjqgrid"
											style="font-size: 13px; font-family: Verdana; float: left;"></div>
									</div>
								</div>
							</div>
							
							<!--  Tab 3 Started  -->
							<div id="tabAccessoriesC" class="tab-pane fade in">
								<div class="heading-block">
									<h4>Accessories</h4>
									<div class="heading-block-action">						
										<button  type="button" class="btn btn-primary pull-right" id="saveGRAccC"><i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save</button>&nbsp;
									</div>
								</div>
								<div class="row">
									<div style="position: relative; z-index: 1">
										<div id="jqxgrid" class="tabjqgrid"	style="font-size: 13px; font-family: Verdana; float: left;"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
<div class="clearfix">&nbsp;</div>
</div>
</div>
</div>
</div>

<div class="modal fade" id="designViewGR" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        	<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Design View</h3>				
			</div>
			<div class="modal-body" align="center" id="content">
				<div id="page-content"> </div>
		            <div class="text-center">
		            <ul id="pagination-demo" class="pagination-sm sync-pagination"></ul>
		            </div>
			</div>
			    
        </div>
    </div>
</div> 

<script src="resource/oe/assets/js/app/grFGProvisional.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>