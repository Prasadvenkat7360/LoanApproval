<!--    
    ##	Author (UI)     :   Raksha
    ##	Author1 (UI)    :   Dipankar Naha
	## 	Author2 (Java)	:   Divya M
	##	Date Creation 	: 	29-05-2018
	## 	Description		:	Promotions Create,Search,Export and Edit Functionality
 -->
 
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
					 <div class="heading-block">
						 <h1 id="hideSearchId">
							<i class="fa fa-desktop"></i> &nbsp; Promotions - Search
						  </h1>
						   <h1 id="hideCreateId">
							<i class="fa fa-desktop"></i> &nbsp; Promotions - Create
						  </h1>
				      	<div class="heading-block-action">
							<button class="btn btn-primary btn-sm voffset" type="button"
								id="createPromo"> <i class="fa fa-plus"></i>&nbsp;Create 
							</button>
							<a class="btn btn-primary btn-sm voffset" type="button"
								id="backFromCreate"> <i class="fa fa-chevron-left"></i>&nbsp;Back 
							</a>
							
						</div>
			        </div>
			 		<div id="searchPromotions">
						<form class="form-horizontal" id="promoSearchForm">
							<div class="row">
								<div class="col-sm-2">
									<label>Promotion Type</label> 
									<select id="promoTypeS" class="form-control" required>
									    <option value="">--Select--</option>
									</select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span><label>Status</label> 
									<select id="statusS" class="form-control" required>
									    <option value="">--Select--</option>
									</select>
								</div>
								
								<div class="col-sm-2" id="promoName">
									<label>Promotion Name</label><input type="text" class="form-control" placeholder="Promotion Name" id="promoNameS">
								</div>
						    	<div class="col-sm-2">
									<label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground" 
										name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-sm-2">
									<label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2" id="region">
									<label>Region</label><div id="regionS"></div>
								</div>
								</div>
							<div class="row">
								<div class="col-sm-2" id="store">
									<label>Store</label><div id="storeS"></div>
								</div>
								<div class="col-sm-2" id="zone">
									<label>Zone</label><div id="zoneS"></div>
								</div>
								<div class="col-sm-2" id="mSegment">
									<label>Metal Segment</label><div id="mSegmentS"></div>
								</div>
								<div class="col-sm-2" id="aSegment">
									<label>Article Segment</label><div id="aSegmentS"></div>
								</div>
								<div class="col-sm-2" id="sSegment">
									<label>Stone/Acc Segment</label><div id="saSegmentS"></div>
								</div>
								<div class="col-sm-2" id="catSHide">
									<label>Category</label><div id="catS"></div>
								</div>
								<div class="col-sm-2" id="subCat">
									<label>Sub Category</label><div id="subCatS"></div>
								</div>
						
								<div class="col-sm-2" id="jewelType">
									<label>Jewel Type</label><div id="jewelTypeS"></div>
								</div>
							
							</div>
							</form>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								<button name="export" id="export" type="button"  class="btn btn-primary btn-sm voffset">
									<i class="fa fa-file-excel-o fa-lg" ></i>&nbsp; Export
								</button>
								<button class="btn btn-primary btn-sm voffset" type="button" value="button" style="color:white" name="editPromo" id="editPromo">
									<i class="fa fa-pencil fa-lg"></i> Enable/Disable Edit
								</button>
							</div>
							<div class="clearfix">&nbsp;</div>
								<div style="position: relative; z-index: 1">
											<div id="stonePOMRVGrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
								</div>
							<div class="clearfix">&nbsp;</div>
							
							<div class="row voffset2" align="center" id="editSection">
							<button class="btn btn-primary btn-sm voffset" type="button" name="saveEdit"  id="saveEdit"><i class="fa fa-floppy-o fa-lg"></i> Save Edit</button>							
						</div>
				  </div>
		   
		   	 		 <div id="createPromotions">
						<form class="form-horizontal" id="promoCreateForm">
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span><label>Promotion Type</label> 
									<select id="promoTypeC" class="form-control" required>
									    <option value="">--Select--</option>
										
									</select>
								</div>
								<div class="col-sm-2" id="promoNameHide">
									<span class="required">*</span><label>Promotion Name</label><input type="text" class="form-control" placeholder="Promotion Name" id="promoNameC">
								</div>
								<div class="col-sm-2" id="regionHide">
									<span id="reg" class="required">*</span><label>Region</label><div id="regionC"></div>
								</div>
								<div class="col-sm-2" id="storeHide">
									<span id="str" class="required">*</span><label>Store</label><div id="storeC"></div>
								</div>
								<div class="col-sm-2" id="zoneHide">
									<span id="zon" class="required">*</span><label>Zone</label><div id="zoneC"></div>
								</div>
								<div class="col-sm-2" id="mSegmentMrHide">
									<span  id="mSegMr" class="required">*</span><label>Metal Segment</label> 
									<select id="mSegmentMrC" name="mSegmentMrC" class="form-control" required>
									    <option value="">--Select--</option>
									</select>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-2" id="mSegmentHide">
									<span id="mSeg" class="required">*</span><label>Metal Segment</label><div id="mSegmentC"></div>
								</div>
								
								<div class="col-sm-2" id="sPurity">
									<span class="required">*</span><label>Skin Purity</label> 
									<select id="sPurityC" class="form-control" required>
									    <option value="">--Select--</option>
										
									</select>
								</div>
							
								<div class="col-sm-2" id="aSegmentHide">
									<span id="aSeg" class="required">*</span><label>Article Segment</label><div id="aSegmentC"></div>
								</div>
								
								<div class="col-sm-2" id="aSegmentHideC">
									<span  id="aSegC" class="required">*</span><label>Article Segment</label> 
									<select id="aSegmC" name="aSegmC" class="form-control" required>
									    <option value="">--Select--</option>
									</select>
								</div>
								
								<div class="col-sm-2" id="jewelTypeHide">
									<span id="jew" class="required">*</span><label>Jewel Type</label><div id="jewelTypeC"></div>
								</div>
								<div class="col-sm-2" id="sSegmentHide">
									<span id="saSegm" class="required">*</span><label>Stone/Acc Segment</label><div id="saSegmentC"></div>
								</div>
								<div class="col-sm-2" id="catHide">
									<span id="cat" class="required">*</span><label>Category</label><div id="catC"></div>
								</div>
								<div class="col-sm-2" id="subCatHide">
									<span id="sCat" class="required">*</span><label>Sub Category</label><div id="subCatC"></div>
								</div>
								<div class="col-sm-2" id="isOrderHide">
									<span id="isOrd" class="required">*</span><label>Is Order</label> 
										<select id="isOrderC" class="form-control">
										<option value="">--Select--</option>
										<option value="1">Yes</option>
										<option value="0">No</option>
										</select>
								</div>
								<div class="col-sm-2" id="uqcHide">
									<span id="uqc" class="required">*</span><label>UQC</label> 
										<select id="uqcC" class="form-control">
										    <option value="">--Select--</option>
										    <option Value="Gms">Gms</option>
										    <option Value="Cts">Cts</option>
										    <option Value="Pcs">Pcs</option>
										</select>
								</div>
							</div>
							</form>
							<div class="clearfix">&nbsp;</div>
								<div>
									<div class="col-sm-2"></div>
										<div style="position: relative; z-index: 1">
											<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
										</div>
								</div>
								<div class="clearfix">&nbsp;</div>
								<div class="row voffset2" align="center">
									<button class="btn btn-primary btn-sm voffset" type="button" name="continue" id="continue">
										<i class="fa fa-chevron-right"></i> Continue
									</button>
								<button id="clear" class="btn btn-warning btn-sm voffset" type="button">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								</div>
								<div class="clearfix">&nbsp;</div>
								<div style="position: relative; z-index: 1">
											<div id="jqxgridC" style="font-size: 13px; font-family: Verdana; float: left;"></div>
										</div>
							<div class="clearfix">&nbsp;</div>
			                <div class="modal-footer  text-center" id="footerHide">
							<button type="button" class="btn btn-primary btn-sm" id="savePromotion"
								name="savePromotion">
								<i class="fa fa-floppy-o fa-lg"></i>&nbsp;Save
							</button>
						  </div>
							<div class="clearfix">&nbsp;</div>
				  </div>
		   </div>
	     </div>
	 </div>
 </div>
 
 <div class="modal fade" id="myModalDel" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                 <h3 class="modal-title" id="myModalLabel">Confirm !</h3>

            </div>
            <div class="modal-body">
                 <h4> Are you sure you want to DELETE?</h4>

            </div>
            <!--/modal-body-collapse -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" id="btnDelteYes" href="#">Yes</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
            </div>
        </div>
    </div>
</div>
 
 <script src="resource/oe/assets/js/app/promotions.js"></script>
 
 <style>
	.dateBackground
	{
	background-color:white !important;
	}
	
</style>
 