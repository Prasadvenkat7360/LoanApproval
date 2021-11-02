<!-- 
	##	Author UI : Dipankar Naha
	## 	Author JAVA : Krishna
	## 	Date Creation : 09/05/2016
	
	##  Author : Modified By(Pooja Sangve)
	## Modified Date : 03/08/2017
	
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Stone Article Master Heading Add Started -->
				<div class="clearfix">&nbsp;</div>
				<div class="heading-block">
						<div class="pull-left">
							<label class="radio-inline"><input class="element"
								type="radio" name="stoneArtMup" value="stoneArtMup">
								&nbsp; Stone Article Master </label> <label class="radio-inline"> <input
								class="element" type="radio" name="stoneArtMup" value="stoneMup">
								&nbsp;Stone MUP Table
							</label>
						</div>
					<div class="clearfix">&nbsp;</div>
				</div>
				<!-- Stone Article Master Heading Add Ended -->

				<!-- Stone Article Master Search Started -->
				<div id="stoneArtMaster">
				<div class="heading-block">
						<h1><i class="fa fa-desktop"></i> &nbsp;Stone Article Master</h1>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createStoneArticleMaster" type="button"
								id="stoneArticleCreate" ><i
								class="fa fa-plus"></i> &nbsp;Create </button>
						</div>
					</div>
				<form class="form-horizontal" id="samForm" action="javascript:void(0);">
					<div class="mobile-responsive">
						<div class="row">
						        
								<div class="col-sm-2">
									<label>From Date</label><div class="input-group">
										<input type="text" class="date-picker form-control" name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
											<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label></div>
							   </div> 
								<div class="col-sm-2">
									<label>To Date</label><div class="input-group">
										<input type="text" class="date-picker form-control"name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
											<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label></div>
								</div>
								<div class="col-sm-2">
									<label>Business</label><select id="samBusinessS" name="samBusinessS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Region</label><select id="samRegionS" name="samRegionS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Stone Segment</label>
										 <select id="stoneSegS" name="stoneSegS" class="form-control">
											<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Main Category</label> 
										<select id="mainCatS" name="mainCatS" class="form-control">
											<option value="" selected label="Select" /></select>
								</div>
						</div>
						<div class="row">
						       <div class="col-sm-2">
									<label>Shape/Sub Category</label> <select id="subCatS" name="subCatS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								 <div class="col-sm-2">
								  <label>Stone Article Code</label><input type="text" class="form-control" placeholder="Stone Code" id="stoneCodeS" name="stoneCodeS" disabled>
						         </div>
						         <div class="col-sm-2">
									<label>Stock/Packet</label> <select id="packetStkS" name="packetStkS" class="form-control">
										<option value="" selected value="--select--">--Select--</option>
										<option value="Stock">Stock</option>
										<option value="Packet">Packet</option>
									</select>
								</div>
								<div class="col-sm-2">
									<label>From Cost</label> <select id="fromCostS" name="fromCostS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2">
									<label>To Cost</label> <select id="toCostS" name="toCostS" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2" id="fromWtId">
									<label>From Weight</label> <select id="fromWt" name="fromWt" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2" id="toWtId">
									<label>To Weight</label> <select id="toCosWt" name="toCosWt" class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span><label>Status</label> <select id="statusS" name="statusS" class="form-control">
										<option value="" label="--Select--" />	
										<option value="true">Active</option>
										<option value="false">In-Active</option>
										</select>
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
						           <input type="hidden" id="stoneIDS" name="stoneIDS" class="form-control">
						        </div>
							</div>
							
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="searchStoneArt" id="searchStoneArt">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAll" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
							&nbsp;
                           <button class="btn btn-primary btn-sm voffset" type="button"
									name="downloadSctemplate" id="downloadSTData">
									<i class="fa fa-file-excel-o fa-lg"></i> Download Data
								</button>
							
									<div  class="fileUploadP btn btn-primary btn-sm voffset">
							        <span  class="glyphicon glyphicon-upload"></span> Upload file
							        <input  id="stoneDetailUpload" type="file" onchange="captureFileSelectEvent(event)"/>
							    </div>
							     <button  class="btn btn-primary voffset" onclick="HandleUploadExcelFile()">Upload Excel Data</button>
							     &nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="exportStoneArt" id="exportStoneArt">
								<i class="fa fa-file-excel-o fa-lg"></i> Export To Audit
							</button>
	    						<!-- <div  class="fileUploadP btn btn-primary voffset">
							        <span class="glyphicon glyphicon-upload"></span> Upload file
							        <input  type="file" id="uploadFile" />
							    </div> -->
							    
								<p id="fileUploadError" class="text-danger hide"></p>
								
								<div class="list-group" id="files"></div>
						</div>					
					</div>
				</form>
				</div>
				<!-- Stone Article Master Search Ended -->
                <div id="stoneMupTable">
                <div class="heading-block">
						<h1><i class="fa fa-desktop"></i> &nbsp;Stone MUP Table</h1>
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" data-toggle="modal"
								data-target="#createStoneMup" type="button"
								id="stoneMupTabCreate" ><i
								class="fa fa-plus"></i> &nbsp;Create </button>
						</div>
					</div>
				<form class="form-horizontal" id="stoneMupForm">
					<div class="mobile-responsive">
						<div class="row">
						<!-- <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Business</label> <select name="businessS"
									id="businessS" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Region</label> <select name="regionS"
									id="regionS" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div> -->

							<div class="col-sm-2">
								<span class="required">*</span> <label>Segment</label> <select name="segmentS"
									id="segmentS" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<!-- <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>MUP For</label> <select name="mupForS"
									id="mupForS" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div> -->

						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="searchStMup" id="searchStMup">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="Clear" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="exportStMup" id="exportStMup">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
							</button>
							&nbsp;
						</div>
					</div>
				</form>
				</div>
				<div class="clearfix">&nbsp;</div>
					<div class="clearfix">&nbsp;</div>
						<div style="position: relative; z-index: 1">
					<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				   </div>
				<!-- JqGrid Ended -->
				<div class="clearfix">&nbsp;</div>

			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="createStoneArticleMaster" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg" style="width:90%;">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Stone Article Master - Create 
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stoneArtMasterCreateC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Region</label> <select name="samRegionC"
									id="samRegionC" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Stone Segment</label> <select name="samStoneSegC"
									id="samStoneSegC" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>HSN Code</label> <select name="hsnCodeC"
									id="hsnCodeC" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Stone Category</label> <select name="samStoneCatC"
									id="samStoneCatC" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>

							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Shape/Sub-Category</label> <select name="subCatC"
									id="subCatC" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>UQC</label> <select name="samUomC"
									id="samUomC" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
						
					       
						</div>
					  <div class="row">
					  
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Article Code</label>
									<input type="text" class="form-control" disabled placeholder="Article Code" id="articleCodeC" name="articleCodeC" >
						    </div>
						    
						    <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
								 <label>Packet/Stock</label> 
									<select name="packetStockC" id="packetStockC" class="form-control">
										<option value="" label="--Select--" />	
										<option value="Packet">Packet</option>
										<option value="Stock">Stock</option>
										</select>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
								 <label>Re-Order</label> 
									<select name="reorderC" id="reorderC" class="form-control">
										<option value="" label="--Select--" />	
										<option value="true">Yes</option>
										<option value="false">No</option>
										</select>
							</div>
							 <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Customer Flag</label> 
									<select name="custFlagC" id="custFlagC" class="form-control">
										<option value="" label="--Select--" />	
										<option value="true">Yes</option>
										<option value="false">No</option>
										</select>
							    </div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>$-Rate</label>
								 		<input type="number" class="form-control"  onblur="this.value = validateNumberPercentage(this.value);" placeholder="Rate" id="rateC" name="rateC" >
							   </div>
							   <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<label>Cust. Handling Charges</label>
								 	<input type="text" class="form-control" id="handlingChargesC" name="handlingChargesC" onblur="this.value = validateNumber(this.value);">
							   </div>
							   <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
						          <input type="hidden" id="artcleCretae" name="artcleCretae" class="form-control">
						        </div>
						</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="row voffset2" align="center">
								<button class="btn btn-primary voffset" type="button"
									name="ContinueCreate" id="ContinueCreate">
									<i class="fa fa-chevron-right" aria-hidden="true"></i>
									&nbsp;Continue
								</button>
								</div>
					     </div>
					<div class="heading-block">	
						<div class="heading-block-action">
							<button class="btn btn-primary" id="addRowSam" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>					
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
								<div style="position: relative; z-index: 1">
									<div id="jqxgridS" class="tabjqgrid"	style="font-size: 13px; font-family: Verdana; float: left;"></div>
							 </div>
				       </div>
					</div>
				</div>
			</form>
				<div class="clearfix">&nbsp;</div>
			    <div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm"
					id="saveStoneArticle" name="saveStoneArticle">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="createStoneMup" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<!-- Modal Create sales  Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Stone MUP Table - Create 
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stoneMupTabCreateC" action="">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">
						<!-- <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Business</label> <select name="businessC"
									id="businessC" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Region</label> <select name="regionC"
									id="regionC" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div> -->

							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Segment</label> <select name="segmentC"
									id="segmentC" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
                         <!-- 
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>MUP For</label> <select name="mupForC"
									id="mupForC" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
                        -->
						</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="row voffset2" align="center">
									<button class="btn btn-primary voffset" type="button"
										name="Continue" id="ContinueCreateS">
										<i class="fa fa-chevron-right" aria-hidden="true"></i>
										&nbsp;Continue
									</button>
								</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">	
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowM" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridM"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
				       </div>
					</div>
				</div>
			</form>
				<div class="clearfix">&nbsp;</div>
			    <div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm"
					id="saveStoneMup" name="saveStoneMup">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Edit/View Modal window -->

<div class="modal fade" id="btnEditSam" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg" style="width: 95%;">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;
				</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabel"></label>
				</h3>
			</div>

			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stoneArticleMasterDetE" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Region</label> <select name="samRegionE" disabled
									id="samRegionE" class="form-control">
									
								</select>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Stone Segment</label> <select name="samStoneSegE" disabled
									id="samStoneSegE" class="form-control">
								</select>
							</div>
							
                            <div class="col-lg-3 col-md-2 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>HSN Code</label> <select name="hsnCodeE"
									 id="hsnCodeE" class="form-control">
									<option value="" selected label="Select" />
								</select>
								<input type="hidden" class="form-control" id="stoneHeaderId" name="stoneHeaderId" disabled>
							</div>
							
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Stone Category</label> <select name="samStoneCatE" disabled
									id="samStoneCatE" class="form-control">
								</select>
							</div>
							
							</div>
					  <div class="row">
					  
					      <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
					 			<span class="required">*</span> <label>Shape/Sub-Category</label> <select name="subCatE" disabled
									id="subCatE" class="form-control">
								</select>
							</div>
							
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>UQC</label> <input name="samUomE" disabled
									id="samUomE" class="form-control">
							</div>
						
					       <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>Article Code</label>
									<input type="text" class="form-control" placeholder="Article Code" id="articleCodeE" name="articleCodeE" disabled>
						    </div>
						    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<!-- <span class="required">*</span> --> 
								<label>Packet/Stock</label> 
									<input name="packetStockE" id="packetStockE" class="form-control" disabled>
							</div>
							
						</div>
					  <div class="row">
					        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Re-Order</label> 
									<input name="reorderS" id="reorderS" class="form-control" disabled>
							</div>
							 <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Customer Flag</label> 
									<input name="custFlagS" id="custFlagS" class="form-control"disabled>
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span>&nbsp;<label>$-Rate</label>
							 		<input type="number" class="form-control" onblur="this.value = validateNumberPercentage(this.value);" placeholder="Rate"  id="rateS" name="rateS">
						   </div>
						    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<label>Cust. Handling Charges</label>
								 		<input type="text" class="form-control" id="handlingChargesE" name="handlingChargesE" onblur="this.value = validateNumber(this.value);">
							   </div>
					 </div>
					<div class="clearfix">&nbsp;</div>
					<!-- <div class="row">
						<div class="row voffset2" align="center">
									<button class="btn btn-primary voffset" type="button"
										name="ContinueCreateE" id="ContinueCreateE">
										<i class="fa fa-chevron-right" aria-hidden="true"></i>
										&nbsp;Continue
									</button>
								</div>
					  </div> -->
					<div class="heading-block" id="addRowIdE">	
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowSamE" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="gridSectionEdit">
						<div class="col-md-12 form-field">
							<div style="color:#ff0000; font-size:12px;">Please click on MUP% to get Selling Price Rate.</div>
							<div id="jqxgridStnArtleEdit"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
				       </div>
					</div>
				</div>
			</form>
			<!--  Modal Window Content Ended -->

			<!-- Modal Create Metal Accounting Location Footer -->
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm" id="editStoneArtMaster"
					name="editStoneArtMaster">
					<i class="fa fa-save"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Close
				</button>

			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="btnEditStoneMup" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;
				</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelStoneMup"></label>
				</h3>
			</div>

			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="stoneMupEditDet" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<!-- <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Business</label>
								<select name="businessE" disabled id="businessE" class="form-control">
								<option value="">--Select--</option>
								</select>
								<input type="text" name="businessE" disabled id="businessE" class="form-control">
							</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Region</label>
								<select name="regionE" disabled id="regionE" class="form-control">
								<option value="">--Select--</option>
								</select>
								<input type="text" name="regionE" disabled id="regionE" class="form-control">
							</div> -->

							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>Segment</label>
								<select name="segmentE" disabled id="segmentE" class="form-control">
								<option value="">--Select--</option>
								</select>
								<!-- <input type="text" name="segmentE" disabled id="segmentE" class="form-control"> -->
							</div>
                         <!-- 
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span> <label>MUP For</label> <select name="mupForE"
									id="mupForE" class="form-control">
									<option value="" selected label="Select" />
								</select>
							</div>
                        -->
						</div>
						<!-- <div class="row">
							<div class="row voffset2" align="center">
								<button class="btn btn-primary voffset" type="button"
									name="Continue" id="ContinueCreateE">
									<i class="fa fa-chevron-right" aria-hidden="true"></i>
									&nbsp;Continue
								</button>
							</div>
						   </div> -->
							<div class="clearfix">&nbsp;</div>
							<div class="heading-block">	
								<div class="heading-block-action">
									<button class="btn btn-primary btn-sm" id="addRowMupEdit" type="button">
										<i class="fa fa-plus"></i>&nbsp;Add Row
									</button>
								</div>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row">
								<div class="col-md-12 form-field">
									<div id="jqxgridMupE"
										style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						        </div>
						     </div>
				        </div>
			       </form>
					<div class="modal-footer  text-center">
						<button type="button" class="btn btn-primary btn-sm" id="saveStoneMupE"
							name="saveStoneMupE">
							<i class="fa fa-save"></i>&nbsp;Save
						</button>
						<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
							<i class="fa fa-times"></i>&nbsp;Close
						</button>
					</div>
		        </div>
	       </div>
       </div>
<script
	src="resource/oe/assets/js/app/stoneArticleMasterSearchPopulate.js"></script>
<script src="resource/oe/assets/js/app/stoneArticleMasterListing.js"></script>
<script src="resource/oe/assets/js/app/stoneMupTable.js" type="text/javascript"></script>