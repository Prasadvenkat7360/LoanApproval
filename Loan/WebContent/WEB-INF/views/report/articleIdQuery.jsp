<!-- 
	##	Author1 (UI)    :   Raksha
	## 	Author2 (Java)	:   Pooja sangve
	##	Date Creation 	: 	08-11-2017
	## 	Description		:	Article ID Query Loose Stones Report
 -->

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Article ID Query for FG,Stone & Accessory
					</h1>
					<form class="form-horizontal" id="articleIdQueryReport" action="javascript: void(0)">
						<div class="pull-left">
						<label class="radio-inline"><input class="element" type="radio" name="artIdQuery" value="fg"> &nbsp; FG Article </label> 
						<label class="radio-inline"><input class="element" type="radio" name="artIdQuery"  value="stone"> &nbsp; Stone Article</label> 
						<label class="radio-inline"><input class="element" type="radio" name="artIdQuery" value="accessory"> &nbsp; Accessory Article</label> 
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>
				</div>
           		<form class="form-horizontal" id="articleIdQueryForm" >
					  <!-- FG Home Window Started -->
						<div id="artIdQueryFgS">
							<div class="row">
								<div class="col-sm-2">
									<label>Segment</label><div id="fgSegS"></div>
								</div>
								<div class="col-sm-2" id="fgJwlType">
									<label>Jewel Type</label><div id="fgJewelTypeS"></div>
								</div>
								<div class="col-sm-2" id="fgMainCat">
									<label>Main Category</label><div id="fgMainCatS"></div>
								</div>
								<div class="col-sm-2" id="fgSubCat">
									<label>Sub Category</label><div id="fgSubCatS"></div>
								</div>
							</div>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button" name="fgSearch" id="fgSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
								<button id="clearFg" class="btn btn-warning btn-sm voffset" type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>						
								<button class="btn btn-primary btn-sm voffset" type="button" name="fgExport" id="fgExport">
									<i class="fa fa-file-excel-o fa-lg"></i> Export
								</button>
							</div>
						</div>
						
					<!-- FG Home Window Ended -->
					
					<!-- Stone Home Window Started -->
						
						<div id="artIdQueryStoneS">	
						     <div class="row">		
								<div  class="col-sm-2">
									<label>Stone Segment</label>
									<select name="stoneSegS" id="stoneSegS" class="form-control" >
							           <option  value="">--Select--</option>
							        </select>
								</div>
								<div  class="col-sm-2" id="catID">
									<label>Stone Category</label><div id="stoneCatS"></div> 
								</div>
								<div  class="col-sm-2" id="subCatID">
									<label>Sub Category/Shape</label><div id="stoneSubCatS"></div> 
								</div>
								<div  class="col-sm-2" id="artID">
									<label>Article Code</label><div id="stoneArtCodeS"></div> 
								</div>
								<div  class="col-sm-2" id ="clarityID">
									<label>Clarity</label><div id="stoneClarityS"></div> 
								</div>
								<div  class="col-sm-2" id="colorID">
									<label>Color</label><div id="stoneColorS"></div> 
								</div>
						
								<div  class="col-sm-2" id="cutGradID">
									<label>Cut Grade</label><div id="stoneCutGradeS"></div> 
								</div>
								<div  class="col-sm-2" id="actColorID">
									<label>Actual Color</label><div id="stoneActColorS"></div> 
								</div>
								<div  class="col-sm-2" id="wtRangeID">
									<label>Wt/Cost Range</label><div id="stoneWtRangeS"></div> 
								</div>
							</div>
						       <div class="row voffset2" align="center">
									<button class="btn btn-primary btn-sm voffset" type="button" name="stoneSearch" id="stoneSearch">
										<i class="fa fa-search fa-lg"></i> Search
									</button>
									<button id="clearStone" class="btn btn-warning btn-sm voffset" type="reset">
										<i class="fa fa-times fa-lg"></i>&nbsp; Clear
									</button>
									<button class="btn btn-primary btn-sm voffset" type="button" name="stoneExport" id="stoneExport">
										<i class="fa fa-file-excel-o fa-lg"></i> Export
									</button>		
						      </div>
						</div>
						
					<!-- Stone Type Home Window Ended -->
						
					<!-- Accessory Home Window Started -->
					
						<div id="artIdQueryAccS">
							<div class="row">
								<div class="col-sm-2">
									<label>Accessory Segment</label>
									<select name="accSegS" id="accSegS" class="form-control" >
							           <option value="" selected label="Select" />
							        </select>
								</div>
								<div class="col-sm-2" id="mainCatSection">
									<label>Accessory Main Category</label><div id="accMainCatS"></div> 
								</div>
								<div class="col-sm-2" id="subCatSection">
									<label>Sub Category</label><div id="accSubCatS"></div> 
								</div>
								<div class="col-sm-2" id="articleCodeSection">
									<label>Article Code</label><div id="accArtCodeS"></div> 
								</div>
								<div class="col-sm-2">
									<label>From Cost</label><div id="accFromCostS"></div> 
								</div>
								<div class="col-sm-2">
									<label>To Cost</label><div id="accToCostS"></div> 
								</div>
							</div>	
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">	
								<button class="btn btn-primary btn-sm voffset" type="button" name="accSearch" id="accSearch">
									<i class="fa fa-search fa-lg"></i> Search
								</button>						
								<button id="clearAcc" class="btn btn-warning btn-sm voffset" type="reset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
								<button class="btn btn-primary btn-sm voffset" type="button" name="accExport" id="accExport">
									<i class="fa fa-file-excel-o fa-lg"></i> Export
								</button>			
							</div>
					</div>
				</form>				
			</div>
			<div class="clearfix">&nbsp;</div>
            <div class="col-md-12" style="position: relative; z-index: 1; width:100%;">
	       	 	<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
            </div>
              <div class="clearfix">&nbsp;</div>		            
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/articleIdQueryFG.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/articleIdQueryStone.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/articleIdQueryAcc.js" type="text/javascript"></script>