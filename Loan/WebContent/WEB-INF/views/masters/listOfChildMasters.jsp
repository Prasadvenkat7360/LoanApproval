<!-- 
	##	Author1         :   Raksha
	## 	Author2 	    :   Dipankar Naha
	##	Date Creation 	: 	29-05-2017
	## 	Description		:	List Of Child Masters Create,Edit and Search Functionalities
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Metal Accounting Location Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; List Of Child Masters
					</h1>

					<div class="clearfix">&nbsp;</div>
					    <label class="radio-inline"><input name="listOfChild" type="radio" value="seg" /> &nbsp; Segments</label> 
						<label class="radio-inline"><input name="listOfChild" type="radio" value="jewelType" /> &nbsp; Jewel Type</label>
						<label class="radio-inline"><input name="listOfChild" type="radio" value="category" /> &nbsp; Category</label>
						<label class="radio-inline"><input name="listOfChild" type="radio" value="subCat" /> &nbsp; Sub Category</label>
				</div>
           <form class="form-horizontal" id="listOfChildMastersS" >
					<div class="mobile-responsive">
						<div id="segDetS">
							<div class="col-sm-2">
								<label>Segment ID</label>
								<div id="segId"></div>
							</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
						    <button class="btn btn-primary btn-sm voffset" data-toggle="modal" data-target="#createSegment" type="button" id="listOfChildMasters">
							<i class="fa fa-plus"></i> &nbsp;Create
						    </button>
						    &nbsp;
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="segmentSearch" id="segmentSearch">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
								&nbsp;					
							<button id="clearSegment" class="btn btn-warning btn-sm voffset"
								type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>	
								
						</div>
						</div>
						
						
						<!-- Segment Home Window Ended -->
						
						<!-- Jewel Home Window Started -->
						
						<div id="jewelDetS">
						
								<!-- <div  class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label> Segment ID</label>
									<input type="text" class="form-control"
										placeholder="Segment Id" id="segIdJ" name="segIdJ">
								</div> -->						
								<div  class="col-sm-2">
									<span class="required">*</span>&nbsp;<label> Jewel Type ID</label>
	 		   					 		<div id="jTypeId"></div> 
	 		   					 			
									<!-- <input type="text" class="form-control"
										placeholder="Jewel Type Id" id="jTypeId" name="jTypeId">
										<input id="jTypeId-value" type="hidden"> -->
								</div>
						          <div class="clearfix">&nbsp;</div>
						       <div class="row voffset2" align="center">
								     <button class="btn btn-primary btn-sm voffset " data-toggle="modal" data-target="#createJewelType" type="button" id="listOfChildMastersJewel">
									<i class="fa fa-plus"></i> &nbsp;Create
								    </button>
								    &nbsp;	
									<button class="btn btn-primary btn-sm voffset" type="button"
										name="jewelSearch" id="jewelSearch">
										<i class="fa fa-search fa-lg"></i> Search
									</button>
									&nbsp;							
									<button id="clearJewel" class="btn btn-warning btn-sm voffset"
										type="reset">
										<i class="fa fa-times fa-lg"></i>&nbsp; Clear
									</button>		
						      </div>
						</div>
						<!-- Jewel Type Home Window Ended -->
						
						<!-- Category Home Window Started -->
						<div id="catDetS">
						<div  class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>Type</label>
								<select	id="catType" name="catType" class="form-control">
								<option value="" label="--Select--" />	
								<option value="S">S</option>
								<option value="M">M</option>
								<option value="AC">AC</option>
							</select>
						</div>
						<div class="col-sm-2" id="showHideStone">
							<label>Stone Segment</label> <select
								id="stoneSegIdS" class="form-control">
								<option value="" label="--Select--" />	
							</select>
						</div>
						<div class="col-sm-2" id="showHideAcc">
							<label>Accessory Segment</label> <select
								id="accSegIdS" class="form-control">
								<option value="" label="--Select--" />	
							</select>
						</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row voffset2" align="center">
							     <button class="btn btn-primary btn-sm voffset" data-toggle="modal" data-target="#createCategory" type="button" id="createCat">
								<i class="fa fa-plus"></i> &nbsp;Create
							    </button>
							    &nbsp;	
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="categorySearch" id="categorySearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;							
								<button id="clearCat" class="btn btn-warning btn-sm  voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>		
						</div>
					</div>
					<!-- Sub-Category Home Window Started -->
						<div id="subCatDetS">
							<div  class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Type</label>
								<select  id="subCatType" name="subCatType" class="form-control" >
								<option value="" label="--Select--" />	
								<option value="S">S</option>
								<option value="M">M</option>
								<option value="AC">AC</option>
								</select>
							</div>
							<div class="col-sm-2">
								<label>Sub-Category Description</label> <select
									id="subCatDescS" class="form-control">
									<option value="" label="--Select--" />	
								</select>
							</div>
							<!-- <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Jewel Type</label> <select
									id="sJTypeS" class="form-control">
									<option value="" label="--Select--" />	
								</select>
							</div> -->
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							     <button class="btn btn-primary btn-sm voffset" data-toggle="modal" data-target="#createSubCategory" type="button" id="createSubCat">
								<i class="fa fa-plus"></i> &nbsp;Create
							    </button>
							    &nbsp;	
								<button class="btn btn-primary btn-sm voffset" type="button"
									name="subCatSearch" id="subCatSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								&nbsp;							
								<button id="clearSubCat" class="btn btn-warning btn-sm voffset"
									type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>		
						    </div>
						</div>
					</div>
				</form>				
			</div>
			<div class="clearfix">&nbsp;</div>
            <div style="position: relative; z-index: 1; width:100%;">
	        <div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
              </div>
              <div class="clearfix">&nbsp;</div>		            
		</div>
	</div>
</div>

	<!-- Segment Create Window Started -->
<div class="modal fade" id="createSegment" data-keyboard="false"
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
					<i class="fa fa-plus"></i> &nbsp; Segment Create 
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createSegC">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Type</label> <select
								id="sType" name="sType" class="form-control">
								<option value="" label="--Select--" />
								<option value="M">M</option>
								<option value="A">A</option>
								<option value="S">S</option>
							</select>
						</div>	
						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment Code</label>
							<input type="text" class="form-control"
								placeholder="Segment Code" id="sCode" name="sCode">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment Name</label>
							<input type="text" class="form-control"
								placeholder="Segment Name" id="sName" name="sName">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Base Metal</label> <select
								id="baseMetal" name="baseMetal" class="form-control">
								<option value="" label="--Select--" />
								<option value="YES">Yes</option>
								<option value="NO">No</option>
							</select>
						</div>		
					</div>
					<div class="row">	
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Shape Flag</label> <select
								id="shapeFlag" name="shapeFlag" class="form-control">
								<option value="" label="--Select--" />
								<option value="YES">Yes</option>
								<option value="NO">No</option>
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Quality Check</label> <select
								id="qc" name="qc" class="form-control">
								<option value="" label="--Select--" />
								<option value="YES">Yes</option>
								<option value="NO">No</option>
							</select>
						</div>			
					<div class="clearfix">&nbsp;</div>	
				</div>
					<div class="clearfix">&nbsp;</div>
					
					<div class="heading-block">
						
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowD" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
					
						<div class="col-md-12 form-field">
						
							<div style="position: relative; z-index: 1">	
							<div id="jqxgridS"	style="font-size: 12px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
					</div>
				</div>
			</form>
				<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm"
					id="saveSegment" name="saveSegment">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Jewel Type Create Window Started -->
<div class="modal fade" id="createJewelType" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">
	<div class="modal-dialog modal-lg" style="width:95%" >
		<div class="modal-content">
			<!-- Modal Create Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Jewel Type - Create
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createJewelTypeC" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">							
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Jewel Type Code</label>
							<input type="text" class="form-control"
								placeholder="Jewel Type Code" id="jTypeCode" name="jTypeCode">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Jewel Type Description</label>
							<input type="text" class="form-control"
								placeholder="Jewel Type Description" id="jTypeDesc" name="jTypeDesc">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Hook Type Master</label>
							<select	class="form-control"  id="hookType" name="hookType">
								<option value="" label="--Select--" />
								<option value="True">Yes</option>
								<option value="False">No</option>
								</select>							
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Loop Type Master</label>
							<select	class="form-control"  id="loopType" name="loopType">
								<option value="" label="--Select--" />
								<option value="True">Yes</option>
								<option value="False">No</option>
								</select>								
						</div>	
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Metal Purity Master</label>
							<select	class="form-control"  id="metalPurity" name="metalPurity">
								<option value="" label="--Select--" />
								<option value="True">Yes</option>
								<option value="False">No</option>
								</select>								
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Metal Color Type Master</label>
							<select	class="form-control"  id="metalType" name="metalType">
								<option value="" label="--Select--" />
								<option value="True">Yes</option>
								<option value="False">No</option>
								</select>							
						</div>
					</div>
					<!-- Row 2 Started  -->
					<div class="row">
						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Screw Type Master</label>
							<select	class="form-control" id="screwType" name="screwType">
								<option value="" label="--Select--" />
								<option value="True">Yes</option>
								<option value="False">No</option>
							</select>
						</div>	
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Setting Type Master</label>
							<select	class="form-control" id="settingType" name="settingType">
								<option value="" label="--Select--" />
								<option value="True">Yes</option>
								<option value="False">No</option>
								</select>							
						</div>	
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Polish Type Master</label>
							<select	class="form-control" id="polishPurity" name="polishPurity">
								<option value="" label="--Select--" />
							    <option value="True">Yes</option>
								<option value="False">No</option>
								</select>							
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Length</label>
							<select	class="form-control" id="length" name="length">
								<option value="" label="--Select--" />
								<option value="True">Yes</option>
								<option value="False">No</option>
								</select>							
						</div>	
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
						<span class="required">*</span>&nbsp;<label>Length List</label>
							<input type="text" class="form-control"
								placeholder="Length List" id="lengthList" name="lengthList">
						</div>	
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Job Worker Size</label>
							<select	class="form-control" id="jwSize" name="jwSize">
								<option value="" label="--Select--" />
								<option value="True">Yes</option>
								<option value="False">No</option>
								</select>
						</div>
				</div>
			
				<div class="row">						
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Size List</label>
							<input type="text" class="form-control"
								placeholder="Size List" id="sizeList" name="sizeList">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Height</label>
							<select	class="form-control" id="height" name="height">
								<option value="" label="--Select--" />
								<option value="True">Yes</option>
								<option value="False">No</option>
								</select>							
						</div>	
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
						<span class="required">*</span>&nbsp;<label>Height List</label>
							<input type="text" class="form-control"
								placeholder="Height List" id="heightList" name="heightList">
						</div>	
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Diameter</label>
							<select	class="form-control" id="diameter" name="diameter">
								<option value="" label="--Select--" />
								<option value="True">Yes</option>
								<option value="False">No</option>
								</select>							
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Diameter List</label>
							<input type="text" class="form-control"
								placeholder="Diameter List" id="diameterList" name="diameterList">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Width</label>
							<select	class="form-control" id="width" name="width">
								<option value="" label="--Select--" />
								<option value="True">Yes</option>
								<option value="False">No</option>
								</select>								
						</div>	
				</div>
				<div class="row">							
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
						<span class="required">*</span>&nbsp;<label>Width List</label>
							<input type="text" class="form-control"
								placeholder="Width List" id="widthList" name="widthList">
						</div>	
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
						<span class="required">*</span>&nbsp;<label>Segment ID</label>
								<div id="jewelTypSegC"></div>
					    </div>
				</div>
						
				<div class="clearfix">&nbsp;</div>
			 	<div class="row">
				 	<div class="col-md-12 form-field">
				 		<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowJewel" type="submit" name="addRowJewel">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
						<div id="jqxgridJewel"style="font-size: 13px; font-family: Verdana; position: relative;"></div>
					</div>
				</div>
             	</div>
				<!--Jewel Type Create Footer -->
				
				<div class="modal-footer  text-center">				
					<button type="button" class="btn btn-primary btn-sm" id="createJType"name="createJType"><i class="fa fa-plus"></i>&nbsp;Create	</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"	id="cancel"><i class="fa fa-times"></i>&nbsp;Cancel	</button>
				</div>
			</form>
		</div>
	</div>
</div>

<!-- Segment Create Window Started -->
<div class="modal fade" id="createCategory" data-keyboard="false"
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
					<i class="fa fa-plus"></i> &nbsp; Category Create 
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createCatC" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Type</label>
								<select	 id="typeC" name="typeC" class="form-control">
								<option value="" label="--Select--" />	
								<option value="S">S</option>
								<option value="M">M</option>
								<option value="AC">AC</option>
							</select>
						</div>	
						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Category Code</label>
							<input type="text" class="form-control"
								placeholder="Category Code" id="catCodeC" name="catCodeC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"  >
							<span class="required">*</span>&nbsp;<label>Category Description</label>
							<input type="text" class="form-control"
								placeholder="Category Description" id="catDecsC" name="catDecsC">
						</div>						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="stoneSegIdLabel">
							<span class="required" id="senemntReg">*</span>&nbsp;<label>Stone Segment</label> <select
								id="stoneSegIdC" class="form-control">
								<option value="" label="--Select--" />	
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"  id="accSegIdLabel">
							<span class="required" id="accRegId">*</span>&nbsp;<label>Accessory Segment</label> <select
								id="accSegIdC" class="form-control">
								<option value="" label="--Select--" />	
							</select>
						</div>
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"  id="showHideJtype">
								<label>Jewel Type</label><div id="catJewelTypeC"></div>
							</div>
						</div>
						<div class="row">
						<!-- <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="segmDecsCLabel">
							<label>Segment Description</label>
							<input type="text" class="form-control"
								placeholder="Segment Description" id="segmDecsC" name="segmDecsC">
						</div>	 -->
						
						<!-- <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="accDecsCLabel">
							<label>Accessory Description</label>
							<input type="text" class="form-control"
								placeholder="Accessory Description" id="accDecsC" name="accDecsC">
						</div> -->
				</div>
					<div class="clearfix">&nbsp;</div>
					<div class="clearfix">&nbsp;</div>
					
					<div class="heading-block">
						
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowCategory" name="addRowCategory" type="submit">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridCat"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>

						</div>
					</div>
				</div>
			</form>
				<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm"
					id="saveCatagory" name="saveCatagory">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>


<!-- Segment Create Window Started -->
<div class="modal fade" id="createSubCategory" data-keyboard="false"
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
					<i class="fa fa-plus"></i> &nbsp;Sub-Category Create 
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="createSubCatC"action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>					
					<div class="row">						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Type</label>
								<select id="sTypeC" name="sTypeC" class="form-control" >
								<option value="" label="--Select--" />	
								<option value="S">S</option>
								<option value="M">M</option>
								<option value="AC">AC</option>
								</select>
						</div>
						<!-- <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Sub-Category ID</label> <select
								id="sCatIdC" class="form-control">
								<option value="" label="--Select--" />
								
							</select>
						</div> -->
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Sub-Category Code</label>
							<input type="text" class="form-control"
								placeholder="Sub-Category Code" id="sCatCodeC" name="sCatCodeC">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
					         <label>Sub-Category Description</label>
							<input type="text" class="form-control"
								placeholder="Sub-Category Description" id="sCatDecsC" name="sCatDecsC">
						</div>	
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
						<span class="required">*</span>&nbsp;<label>Category ID</label> <select
								name="categoryIdC" id="categoryIdC" class="form-control">
								<option value="" label="--Select--" />
								
							</select>
						</div>
					</div>
						<div class="row">						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="jewHide">
						<span class="required" id="jwlTypeShw">*</span>&nbsp;<label>Jewel Type</label> <select
							name="jTypeC"	id="jTypeC" class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
					<div class="clearfix">&nbsp;</div>
				</div>
					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action">
							<button class="btn btn-primary btn-sm" id="addRowS" type="submit">
								<i class="fa fa-plus"></i>&nbsp;Add Row
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row">
						<div class="col-md-12 form-field">
							<div id="jqxgridB"
								style="font-size: 13px; font-family: Verdana; position: relative;"></div>
						</div>
					</div>
				</div>
			</form>
				<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button type="button" class="btn btn-primary btn-sm"
					id="saveSubCatagory" name="saveSubCatagory">
					<i class="fa fa-floppy-o"></i>&nbsp;Save
				</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times"></i>&nbsp;Cancel
				</button>
			</div>
		</div>
	</div>
</div>




<!-- Segment Edit Window Started -->
<div class="modal fade" id="btnEditSegment" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelSeg"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="segmentE" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Segment ID</label> <input type="text"
								class="form-control" disabled id="segIdE"
								name="segIdE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Type</label> <input type="text"
								class="form-control" disabled id="typeE"
								name="typeE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Segment Code</label> <input type="text"
								class="form-control" disabled id="segCodeE"
								name="segCodeE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Segment Name</label> <input type="text"
								class="form-control"  id="segNameE"
								name="segNameE">
						</div>
					</div>
					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Shape Flag</label> <select
								id="shapeFlagE" name="shapeFlagE" class="form-control">
								<option value="" label="--Select--" />
								<option value="YES">Yes</option>
								<option value="NO">No</option>
							</select>
						</div>
	                     <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Quality Check</label> <select
								id="qcE" class="form-control">
								<option value="" label="--Select--" />
								<option value="YES">Yes</option>
								<option value="NO">No</option>
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Base Metal</label> <select
								id="baseMetalE" class="form-control">
								<option value="" label="--Select--" />
								<option value="YES">Yes</option>
								<option value="NO">No</option>
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created By</label> <input
								type="text" class="form-control" placeholder="Created By"
								disabled id="segCreatedByE" name="segCreatedByE">
						</div>
						</div>
						<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created On</label> <input
								type="text" class="form-control" placeholder="Created On" 
								disabled id="segCreatedOnE" name="segCreatedOnE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Updated By</label> <input
								type="text" class="form-control" 
								disabled id="segUpdatedByE" name="segUpdatedByE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Updated On</label> <input
								type="text" class="form-control" 
								disabled id="segUpdatedOnE" name="segUpdatedOnE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				 <div class="clearfix">&nbsp;</div>
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editSegmentE"
						name="editSegmentE">
						<i class="fa fa-save"></i>&nbsp;Save
					</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
						<i class="fa fa-times"></i>&nbsp;Close
					</button>

				</div>
			</form>
		</div>
	</div>
</div>

<!-- Jewel Type Edit Window Started -->
<div class="modal fade" id="btnEditJewelType" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg" style="width:90%">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelJewel"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="JewelTypeE"  action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Jewel Type ID</label> <input type="text"
								class="form-control" disabled id="jTypeIdE"
								name="jTypeIdE">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Jewel Type Code</label> <input type="text"
								class="form-control" disabled id="jTypeCodeE"
								name="jTypeCodeE">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Jewel Type Description</label> <input type="text"
								class="form-control"  id="jTypeDescE"
								name="jTypeDescE">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Hook Type Master</label> <select
								class="form-control"  id="hookTypeE"
								name="hookTypeE">
								<option value="" label="--Select--" />
								</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Loop Type Master</label> <select
								class="form-control"  id="loopTypeE" name="loopTypeE">
								<option value="" label="--Select--" />
								</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Metal Purity Master</label> <select
								class="form-control"  id="mPurityE"	name="mPurityE">
								<option value="" label="--Select--" />
								</select>
						</div>
					</div>
					<!-- Row 2 Started  -->
					<div class="row">
	                    <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Metal Color Type Master</label> <select
								class="form-control"  id="metalTypeE"
								name="metalTypeE">
								<option value="" label="--Select--" />
								</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Screw Type Master</label>
							 <select class="form-control" id="screwTypeE" name="screwTypeE">
							 	<option value="" label="--Select--" /></select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Setting Type</label> <select
								class="form-control"  id="settingTypeE" name="settingTypeE">
								<option value="" label="--Select--" /></select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Polish Type Master</label> <select
								class="form-control"  id="polishTypeE" name="polishTypeE">
								<option value="" label="--Select--" />
								</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Length</label> <select
								class="form-control"  id="lengthE" name="lengthE">
								<option value="" label="--Select--" />
								</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Length List</label> <input type="text"
								class="form-control"  id="lengthListE" name="lengthListE">
						</div>
					</div>
					
					<div class="row">
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Job Worker Size</label> <select
								class="form-control"  id="jwSizeE" name="jwSizeE">
								<option value="" label="--Select--" />
								</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Size List</label> <input type="text"
								class="form-control"  id="sizeListE" name="sizeListE">
						</div>
	                    <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Height</label> <select
								class="form-control"  id="heightE" name="heightE">
								<option value="" label="--Select--" />
								</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Height List</label> <input type="text"
								class="form-control"  id="heightListE" name="heightListE">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Diameter</label> <select
								class="form-control"  id="diameterE" name="diameterE">
								<option value="" label="--Select--" />
								<option value="true">Yes</option>
								<option value="false">No</option>
								</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Diameter List</label> <input type="text"
								class="form-control"  id="diameterListE" name="diameterListE">
						</div>
					</div>
				  <div class="row">
						 <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Width</label> <select
								class="form-control"  id="widthE" name="widthE">
								<option value="" label="--Select--" />
								</select>
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Width List</label> <input type="text"
								class="form-control"  id="widthListE" name="widthListE">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created By</label> <input
								type="text" class="form-control" placeholder="Created By"
								disabled id="jewelCreatedByE" name="jewelCreatedByE">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Created On</label> <input
								type="text" class="form-control" placeholder="Created On" 
								disabled id="jewelCreatedOnE" name="jewelCreatedOnE">
						</div>
						<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="jewelTypeChangedByE" name="jewelTypeChangedByE">
						</div>

					    <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="jewelTypeChangedOnE" name="jewelTypeChangedOnE">
						</div>
					</div>
					<div class="row" align="left">
					 <div class="clearfix" >&nbsp;</div>&nbsp;&nbsp;
					 <div id="metalSegSection"></div>
					  
		  	    </div>
				</div>
				<!--  Modal Window Content Ended  -->
			 <div class="clearfix">&nbsp;</div>
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editJewelTypeE"
						name="editJewelTypeE">
						<i class="fa fa-save"></i>&nbsp;Save
					</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
						<i class="fa fa-times"></i>&nbsp;Close
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

<!-- Category Edit Window Started -->
<div class="modal fade" id="btnEditCategory" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelCat"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="categoryE"   action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Type</label>
								<select	 id="cTypeE" name="cTypeE" disabled class="form-control">
								<option value="" label="--Select--" />	
								<option value="S">S</option>
								<option value="M">M</option>
								<option value="AC">AC</option>
								</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Category Id</label> <input type="text"
								class="form-control" disabled id="catIdE"
								name="catIdE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Category Code</label> <input type="text"
								class="form-control" disabled id="catCodeE"
								name="catCodeE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;
							<label>Category Description</label> 
							<input type="text" class="form-control"  id="catDescE" name="catDescE">
						</div>
					</div>
					<!-- Row 2 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"   id="stnSegIdE">
							<label>Stone Segment ID</label> <select
								id="stoneSegIdE" class="form-control">
								<option value="" label="--Select--" />								
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="segmDecsELabel" >
							<label>Segment Description</label>
							<input type="text" class="form-control"
								placeholder="Segment Description" disabled id="segmDecsE" name="segmDecsE">
						</div>	
	                     <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"  id="AccSegIdE">
							<label>Accessory Segment ID</label><select
								id="accSegIdE" class="form-control">
								<option value="" label="--Select--" />
							</select>
						 </div>						
						 <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field" id="accDecsELabel">
							<label>Accessory Description</label>
							<input type="text" disabled  class="form-control"
								placeholder="Accessory Description" id="accDecsE" name="accDecsE">
						 </div>	
						 <!-- <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>HSN</label> 
							<select	id="hsnMasterE" name="hsnMasterE" class="form-control">
								<option value="" label="--Select--" />	
							</select>
						</div> -->
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field"  id="showHideJtypeE">
								<label>Jewel Type</label><div id="catJewelTypeE"></div>
							</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				 <div class="clearfix">&nbsp;</div>
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editCategoryE"
						name="editCategoryE">
						<i class="fa fa-save"></i>&nbsp;Save
					</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
						<i class="fa fa-times"></i>&nbsp;Close
					</button>

				</div>
			</form>
		</div>
	</div>
</div>


<!-- Sub-Category Edit Window Started -->
<div class="modal fade" id="btnEditSubCategory" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-pencil-square-o"></i> &nbsp; <label
						id="popupheaderlabelSubCat"></label>
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="subCatE"  action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Type</label> 
								<select   id="scTypeE" name="scTypeE" disabled class="form-control" >
								<option value="" label="--Select--" />	
								<option value="S">S</option>
								<option value="M">M</option>
								<option value="AC">AC</option>
								</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Sub-Category Id</label> <input type="text"
								class="form-control" disabled id="sCIdE"
								name="sCIdE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Sub-Category Code</label> <input type="text"
								class="form-control" disabled id="sCatCodeE"
								name="sCatCodeE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Sub-Category Description</label> <input type="text"
								class="form-control"  id="sCatDescE"
								name="sCatDescE">
						</div>
					</div>
					<!-- Row 2 Started  -->
					<div class="row">
						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Category ID</label> <select
								id="categoryIdE" class="form-control">
								<option value="" label="--Select--" />								
							</select>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Category Description</label>
							 <input	type="text" class="form-control" disabled id="catDespE" name="catDespE">
						</div>
	                     <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Jewel Type</label>
							<select id="jewelTypeE" class="form-control">
								<option value="" label="--Select--" />	
							</select>
						</div>						
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Jewel Type Description</label>
							 <input type="text" class="form-control" disabled id="jwlTypeDespE" name="jwlTypeDespE">
						</div>
						
					</div>
					<div class="row">
					    <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created By</label> <input type="text" class="form-control"
								disabled id="subCatCreatedByE" name="subCatCreatedByE">
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Created On</label> <input type="text" class="form-control"
								id="subCatCreatedOnE" name="subCatCreatedOnE" disabled>
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed By</label> <input type="text"
								class="form-control" placeholder="Changed By" disabled
								id="subCatChangedByE" name="subCatChangedByE">
						</div>

						<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
							<label>Last Changed On</label> <input type="text"
								class="form-control" placeholder="Changed On" disabled
								id="subCatChangedOnE" name="subCatChangedOnE">
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended  -->
				<!-- Segment Edit Footer -->
				<div class="clearfix">&nbsp;</div>
				<div class="modal-footer  text-center">
					<button type="submit" class="btn btn-primary btn-sm" id="editSubCatE"
						name="editSubCatE">
						<i class="fa fa-save"></i>&nbsp;Save
					</button>
					<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal">
						<i class="fa fa-times"></i>&nbsp;Close
					</button>

				</div>
			</form>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/listOfChildMasters.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/childMasterJewelType.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/childMasterCategory.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/childMasterSubCat.js" type="text/javascript"></script>