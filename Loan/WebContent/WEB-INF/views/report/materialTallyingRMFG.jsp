<!-- 
	Author(UI):Pooja Sangve
	Author(Java): Shreevardhan
	Date Of Creation: 27/07/2017
-->

<div class="main-container">
	<div class="container-fluid">
	  	<div class="row">
	  	  	<div class="col-lg-12  layout-main">
	  			<div class="heading-block">
	  				<h1>
	  					<i class="fa fa-desktop"></i> &nbsp; Material Tallying RM 
	  				</h1>  					   
					<label class="radio-inline">
						<input type="radio" name="tallyRmFg" value="metalTally"> &nbsp; Metal
					</label>
					<!--<label class="radio-inline">
  							<input type="radio" disabled name="tallyRmFg" value="looseStones"> &nbsp; Loose Stone
  					</label>-->  				
	  		    </div>
  		   		<div id="metalTallyS">
  		   			<div class="heading-block">
  		   				<h4>
  		   					<i class="fa fa-desktop"></i> &nbsp; Metal
  		   				</h4>	  		   			
  		   				<div class="heading-block-action">
  		   					<button class="btn btn-sm btn-primary" data-toggle="modal"	data-target="#createMetalRmFg" type="button" id="createMetalTally">
								<i class="fa fa-plus"></i> &nbsp;Create
							</button>
  		   				</div>
  		   			</div>
  		   			<form class="form-horizental" id="searchForm">	  		   				
  		   				<div class="row">
		   					 <div class="col-sm-2 form-field">
		   					 	 <label>Date From</label>
		   					 	 <div class="input-group">
								 	<input type="text" readonly = 'true'  class="date-picker form-control dateBackground" id="dateFormS" placeholder="DD/MM/YYYY">
								 	<label for="dateFormS" class="input-group-addon cursor">
								   		<span class="fa fa-calendar"></span>
								 	</label>
					       	 	</div>
	   					 	 </div>					  
		   				   	 <div class="col-sm-2 form-field">
		   					 	 	<label>Date To</label>
		   					 		<div class="input-group">
										<input type="text" readonly = 'true'  class="date-picker form-control dateBackground"	id="dateToS" placeholder="DD/MM/YYYY"> 
										<label for="dateToS" class="input-group-addon cursor">
								   			<span class="fa fa-calendar"></span>
										</label>
						     		</div>
	   					 	</div>
	   					 	<div class="col-sm-2 form-field" >
	   					 	   	<span class="required">*</span> <label>Segment</label>
	   					 		<select id="segmentS" onchange="locationchange()" name="segmentS" class="form-control">
	   					 			<option value="">--Select--</option>
	   					 		</select>
	   					 	</div>
	   					 	<div class="col-sm-2 form-field">
	   					 	    <span class="required">*</span>  <label>Material Type</label>
	   					 		<select id="rmFgS" name="rmFgS" onchange="locationchange()"  class="form-control">
	   					 			<option value="">--Select--</option>
	   					 		</select>
  		   				    </div>	
  		   				    <div class="col-sm-2 form-field">
		   					 	<label>Location</label>
		   					 	<select id="locationS" name="locationS" class="form-control">
	   					 			<option value="">--Select--</option>
	   					 		</select>  		   					 			
  		   					</div>  		   					 	
  		   				</div>	  		   					   				
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-sm btn-primary voffset" type="button"name="searchMetalS" id="searchMetalS">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAllMetalS" class="btn btn-sm btn-warning voffset"	type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-sm btn-primary voffset" type="button"name="exportMetalS" id="exportMetalS">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
						    </button>
						    &nbsp;
						    <button name="printMetalS" id="printMetalS" type="button"class="btn btn-sm btn-primary voffset">								
						   		 <i class="fa fa-print fa-lg"></i>&nbsp; Print
						    </button>
						</div>  		   				
 		   			</form>
  		   		</div>
  		   		<div id="looseStonesTallyS">
  		   			<div class="heading-block">
	  		   			<h4>
	  		   				<i class="fa fa-desktop"></i>&nbsp;Loose Stones
	  		   			</h4>
  		   				<div class="heading-block-action">
  		   					<button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#createLooseStones"type="button" id="createLooseStoneTally">
  		   						<i class="fa fa-plus"></i>&nbsp;Create
  		   					</button>
  		   				</div>
  		   			</div>
  		   			<form class="form-horizental" id="searchForm">	  		   				
  		   				<div class="row">
		   					<div class="col-sm-2 form-field">
		   					 	<label>Date From</label>
		   					 	<div class="input-group">
									<input type="text" readonly = 'true'  class="date-picker form-control dateBackground" id="dateFormL" placeholder="DD/MM/YYYY">
								 	<label for="dateFormL" class="input-group-addon cursor">
								   		<span class="fa fa-calendar"></span>
								 	</label>
					        	</div>
	   					 	</div>					  
		   				   	<div class="col-sm-2 form-field">
		   					 	 	<label>Date To</label>
		   					 		<div class="input-group">
										<input type="text" readonly = 'true'  class="date-picker form-control dateBackground"	id="dateToL" placeholder="DD/MM/YYYY"> 
										<label for="dateToL" class="input-group-addon cursor">
								   			<span class="fa fa-calendar"></span>
										</label>
						    		</div>
		   					</div>
	   					 	<div class="col-sm-2 form-field">
	   					 	    	<span class="required">*</span>  <label>Segment</label>
	   					 			<select id="segmentL" name="segmentL" class="form-control">
	   					 				<option value="">--Select--</option>
	   					 			</select>
	   					 	</div>
	   					 	<div class="col-sm-2 form-field">
   					 	     		<span class="required">*</span> <label>Material Type</label>
   					 				<select id="rmFgL" name="rmFgL" class="form-control">
   					 					<option value="">--Select--</option>
   					 				</select>
  		   				 	</div>	
  		   				 	<div class="col-sm-2 form-field">
 		   					 		<label>Location</label>
 		   					 		<select id="locationL" name="locationL" class="form-control">
 		   					 			<option value="">--Select--</option>
 		   					 		</select>  		   					 			
 		   					</div>	  		   					 	
 		   				</div>	  		   				
	  		   			<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"name="searchStoneS" id="searchStoneS">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clearAllStoneS" class="btn btn-sm btn-warning voffset"	type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button class="btn btn-sm btn-primary voffset" type="button"name="exportStoneS" id="exportStoneS">
								<i class="fa fa-file-excel-o fa-lg"></i> Export
						    </button>
						    &nbsp;
						    <button name="printStoneS" id="printStoneS" type="button"class="btn btn-sm btn-primary voffset">								
						   		 <i class="fa fa-print fa-lg"></i>&nbsp; Print
						    </button>
						</div>  		   				 
 		   			</form>
  		   	    </div>	
  		   	    <div class="clearfix">&nbsp;</div>
  		   	    <div  id='jqxwindow' style="position: relative; z-index: 1">
				 	<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
			    </div>  	
			    <div class="clearfix">&nbsp;</div>
			    <div class="clearfix">&nbsp;</div>	   	    
  		     </div>	  	
  	     </div>	
	     </div>
     </div>
   
<!-- ################################## CREATE Metal Tally ######################################## -->

<div class="modal fade" id="createMetalRmFg" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h2 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Metal Tally
				</h2>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="metalTallyDetC" action="javascript:void(0);">			
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">	   					
	   					<div class="col-sm-2 form-field">
							<label>Date</label> 
							<input type="text" class="form-control" id="dateFormC" name="dateFormC" disabled >
						</div>
				 	    <div class="col-sm-2 form-field">
					 	   	<span class="required">*</span>&nbsp; <label>Segment</label>
					 		<select id="segmentC" name="segmentC"  class="form-control">
					 			<option value="">--Select--</option>
					 		</select>
					 	</div>
 					 	<div class="col-sm-2 form-field">
 					 	    <span class="required">*</span>&nbsp; <label>RM/FG</label>
 					 		<select id="rmFgC" name="rmFgC" onchange="onLoadLocationForCreate()" class="form-control">
 					 			<option value="">--Select--</option>
 					 		</select>
	   				    </div>	
  		   				<div class="col-sm-2 form-field">
   					 		<label>Tallied By</label>
   					 		<input type="text" id="tallyByC" name="tallyByC" disabled class="form-control">	  		   					 			
  		   				</div>	
  		   				<div class="col-sm-2 form-field">
	  					 	<label>Tallied On</label>	  		   					 	
	 					 	<input type="text" id="tallyDateC" name="tallyDateC" disabled class="form-control">
	  					</div>
	  					<div class="col-sm-2 form-field">
						 	<label>DC Name</label>
						 	<input type="text" id="dcNameC" name="dcNameC"  disabled class="form-control">	  		   					 			
	   				    </div>	</div>
	   				    <div class="row">
	   				    <div class="col-sm-2 form-field" id="locHideC">
	  						<span class="required">*</span>&nbsp;<label id ="locLabelId">Location Code</label>	  		   					 		 
	 					 	<div id="locationC"></div> 		   					 			
	  					</div>	
			  		</div>
 		   		    
					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action">
							<button class="btn btn-sm  btn-primary" id="addRowC" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div id="jqxgrideMetalC"
								style="font-size: 13px; font-family: Verdana; position: relative;">
					</div>									
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Employee Master  Footer -->
			<div class="modal-footer  text-center">          
				<button class="btn btn-sm btn-primary" type="button"
					name="saveMetalTallyC" id="saveMetalTallyC">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				<button type="submit" class="btn btn-sm btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>            
			</div>
		</div>
	</div>
</div>
   
<!-- ################################## CREATE LOOSE STONE TALLY ################################################# -->

<div class="modal fade" id="createLooseStones" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-lg">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h2 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Create Loose Stone -Tally
				</h2>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="looseStoneDetC"
				action="javascript:void(0);">			
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">
		   					<div class="col-sm-2 form-field">
		   					 		<span class="required">*</span>&nbsp;<label>Date From</label>
		   					 		<div class="input-group">
								 		<input type="text" readonly = 'true'  class="date-picker form-control dateBackground" id="dateFormStnC" onchange="onLoadLocationForCreate()" placeholder="DD/MM/YYYY">
								 		<label for="dateFormStnC" class="input-group-addon cursor">
								   			<span class="fa fa-calendar"></span>
								 		</label>
					        		</div>
		   					</div>
   					 	    <div class="col-sm-2 form-field">
		   					 	    <span class="required">*</span>&nbsp; <label>Segment</label>
		   					 		<select id="segmentStnC" name="segmentStnC" onchange="onLoadLocationForCreate()" class="form-control">
		   					 			<option value="">--Select--</option>
		   					 		</select>
	   					 	</div>
   					 	    <div class="col-sm-2 form-field">
   					 	    	<span class="required">*</span>&nbsp; <label>RM/FG</label>
   					 			<select id="rmFgStnC" name="rmFgStnC" onchange="onLoadLocationForCreate()" class="form-control">
   					 				<option value="">--Select--</option>
   					 			</select>
		   				    </div>	
	  		   				<div class="col-sm-2 form-field">
 		   						<label>Tallied By</label>
 		   					 	<input type="text" id="tallyByStnC" name="tallyByStnC" disabled class="form-control">	  		   					 			
	  		   				</div>	
	  		   				<div class="col-sm-2 form-field">
		   					 	<label>Tallied On</label>	  		   					 	
	   					 		<input type="text" id="tallyDateStnC" name="tallyDateStnC" disabled class="form-control">
		   					</div>
		   					<div class="col-sm-2 form-field">
   					 			<label>DC Name</label>
   					 			<input type="text" id="dcNameStnC" name="dcNameStnC"  disabled class="form-control">	  		   					 			
 		   				    </div>	
 		   				    <div class="col-sm-2 form-field" id="locHideStoneC">
		   						<label>Location Code</label>	  		   					 		 
	   					 		<div id="locationStnC"></div> 		   					 			
		   					</div>	
	  		   		</div>			  		   		 
					<div class="clearfix">&nbsp;</div>
					<div class="heading-block">
						<div class="heading-block-action">
							<button class="btn btn-sm btn-primary" id="addRowStoneC" type="button">
								<i class="fa fa-plus"></i>&nbsp;Add
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div id="jqxgrideLStoneC" style="font-size: 13px; font-family: Verdana; position: relative;"></div>							
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Employee Master  Footer -->
			<div class="modal-footer  text-center">          
				<button class="btn btn-sm btn-primary" type="button"
					name="saveStoneTallyC" id="saveStoneTallyC">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Save
				</button>
				<button type="submit" class="btn btn-sm btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>            
			</div>
		</div>
	</div>
</div>
   
<script src="resource/oe/assets/js/app/materialTallyingRMFG.js"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
	#createMetalRmFg .modal-content,#createLooseStones .modal-content{
		padding: 0 15px;
	}
	#createMetalRmFg select,#createLooseStones select{
		height: 28px;
	}
</style>