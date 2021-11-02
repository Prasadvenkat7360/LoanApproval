<!-- 
	##	Author UI       : 	Dipankar Naha
	##  JAVA            :   Divya Madhuri
	##	Date Creation 	: 	29-05-2019
	## 	Description		:	Scanning/Weight Check Create & Search Functionality
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1 id="dailyStockCheckSearch"><i class="fa fa-desktop"></i> &nbsp; Daily Stock Check</h1>
					<h1 id="dailyStockCheckCreate"><i class="fa fa-desktop" ></i> &nbsp; Daily Stock Check - Create </h1>
					<h1 id="dailyStockCheckView"><i class="fa fa-eye fa-sm"></i> Daily Stock Check - View</h1>
					
					<div class="heading-block-action">
						<button class="btn btn-primary voffset" type="button" id="create"><i class="fa fa-plus"></i>&nbsp;Create</button>
						<button class="btn btn-primary voffset" type="button" id="back"><i class="fa fa-arrow-circle-left"></i>&nbsp;Back</button>
					</div>
				</div>
				<form class="form-horizontal" id="dailyStockCheckForm" action="javascript: void(0)">
					<!-- Row 1 Started  -->
					<div class="row" id="searchDiv">
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>From Date</label>
							<div class="input-group"><input type="text" readonly class="date-picker form-control dateBackground" name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
								<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							</div>
						</div>
						<div class="col-sm-2">
							<span class="required">*</span>&nbsp;<label>To Date</label>
							<div class="input-group"><input type="text" readonly class="date-picker form-control dateBackground" name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
								<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							</div>
						</div>
						<div class="col-sm-8">
							<br />
							<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search"><i class="fa fa-search fa-lg"></i> Search</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset"><i class="fa fa-times fa-lg"></i>&nbsp; Clear</button>	
<!-- 							<button class="btn btn-primary btn-sm voffset" type="button" name="checkUpdate" id="checkUpdate"><i class="fa fa-search fa-lg"></i> Stock Check Update</button>							
 -->							
							<div id="stockCheckUpdate">
								<div class="panel panel-default" style="width: 610px;float: right; margin-top: -45px;">
									<div class="panel-heading">
									   <h4 class="panel-title"><a class="accordion-toggle" id="toggle5"><b>Stock Check Updates :</b></a></h4>				      
							    	</div>
										<div id="panel5"  class="panel-collapse collapse">
											<div class="panel-body">
												<h4 id="Dcm"><i class="fa fa-list fa-sm"></i><b>&nbsp;MRV Role</b></h4>
												<div id="jqxgridDcm" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
												
												<h4 id="Dcs"><i class="fa fa-list fa-sm"></i><b>&nbsp;Stone Grader Role</b></h4>
												<div id="jqxgridDcs" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
												
												<h4 id="DcfgAcc"><i class="fa fa-list fa-sm"></i><b>&nbsp;FG Stock/Accessory</b></h4>
												<div id="jqxgridDcOthFgAcc" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
												
												<h4 id="DcMetAcc"><i class="fa fa-list fa-sm"></i><b>&nbsp;Metal Location Stock Check</b></h4>
												<div id="jqxgridDcOthMetAcc" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
												
												<h4 id="DcMetLoc"><i class="fa fa-list fa-sm"></i><b>&nbsp;Metal location Code</b></h4>
												<div id="jqxgridOthMetLocCode" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
									      	</div>
								 	   	</div>
									</div>
							</div>
						</div>
					</div>						
				</form>
				
				<div class="clearfix">&nbsp;</div>
				<!-- JqGrid Started for search-->
					<div style="position: relative; z-index: 1">
						<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
					 
					 <div id="panelId1">
							 <div class="panel panel-default">
						    	<div class="panel-heading">
						     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle1">MRV Role</a></h4>				      
						    	</div>
								<div id="panel1"  class="panel-collapse collapse">
									<div class="panel-body">
							       		<div id="jqxgridM" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
							      	</div>
						 	   	</div>
						    </div>
					</div>
					
					<div id="panelId2">
							 <div class="panel panel-default">
						    	<div class="panel-heading">
						     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle2">Stone Grader Role</a></h4>				      
						    	</div>
								<div id="panel2"  class="panel-collapse collapse">
									<div class="panel-body">
							       		<div id="jqxgridS" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
							      	</div>
						 	   	</div>
						    </div>
					</div>
					
					<div id="panelId3">
							 <div class="panel panel-default">
						    	<div class="panel-heading">
						     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle3">Release</a></h4>				      
						    	</div>
								<div id="panel3"  class="panel-collapse collapse">
									<div class="panel-body">
							       		<div id="jqxgridR" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
							      	</div>
						 	   	</div>
						    </div>
					</div>
					
					<div id="panelId4">
							 <div class="panel panel-default">
						    	<div class="panel-heading">
						     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle4">FG Stock,Stock Acc,Metal Loc Scenario</a></h4>				      
						    	</div>
								<div id="panel4"  class="panel-collapse collapse">
									<div class="panel-body">
							       		<div id="jqxgridD" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
							      	</div>
						 	   	</div>
						    </div>
					</div>
					
						<!-- <h4 id="dcHRel" style="display: none;"><i class="fa fa-list fa-sm"></i><b>&nbsp; Release</b></h4>
						<div id="jqxgridR" style="font-size: 13px; font-family: Verdana; float: left;"></div>
						
						<h4 id="dcHDes" style="display: none;"><i class="fa fa-list fa-sm"></i><b>&nbsp;Designer</b></h4>
						<div id="jqxgridD" style="font-size: 13px; font-family: Verdana; float: left;"></div> -->
						
					</div>
				<!-- JqGrid Ended -->
				
				<div id="createDailyStockCheck">
					
            		<div style="position: relative; z-index: 1">
            			<div class="loader"></div>
						<div id="jqxgridParcel" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridFG" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridStone" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridAcc" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridGRAcc" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridGRST" style="font-size: 13px; font-family: Verdana; float: left; margin-top: -60px;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridSGLS" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridTRALS" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
					    <div id="jqxgridRelFG" style="font-size: 13px; font-family: Verdana; float: left; margin-top: -140px;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridRelLS" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridRelACC" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						
						<div id="jqxgridOtherStockFG" style="font-size: 13px; font-family: Verdana; float: left;  margin-top:5px;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridOtherStockAcc" style="font-size: 13px; font-family: Verdana; float: left;"></div>
						<div class="clearfix">&nbsp;</div>
						<div class="row" id="metSegLocSection">
						<div class="clearfix">&nbsp;</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Metal Location Code</label> 
								<div id="metalLocation"></div>
							</div>
							<div class="col-sm-6">
								<span class="required">*</span>&nbsp;<label>Metal Segment</label> 
								<div id="segment"></div>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="clearfix">&nbsp;</div>
						<h4 id="othMetStkAccC"><i class="fa fa-list fa-sm"></i><b>&nbsp; Function: Metal location stock check</b></h4>
						<div id="jqxgridOtherMetAcc" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						
					</div>					
					<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="button" name="save" id="save"><i class="fa fa-search fa-lg"></i> Save</button>
					</div>
				</div>
				<div id="viewDailyStockCheck">
					<form class="form-horizontal" action="javascript:void(0);">
					<div class="col-md-12 mobile-responsive">
					<div class="row" id="viewGrid" style="position: relative; z-index: 1">
            			<div class="loader"></div>
						<div id="jqxgridParcelV" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridMrvFGV" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridMrvLSV" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridMRVAccV" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridGRAccV" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridGRSTV" style="font-size: 13px; font-family: Verdana; float: left; margin-top: -40px;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridLSV" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
					    <div id="jqxgridTRALSV" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridRelFgV" style="font-size: 13px; font-family: Verdana; float: left; margin-top:-100px;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridRelLsV" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
				        <div id="jqxgridRelAccV" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridOthFgV" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
					    <div id="jqxgridOthAccV" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						<div id="jqxgridMetalAccV" style="font-size: 13px; font-family: Verdana; float: left;"></div><div class="clearfix">&nbsp;</div>
						
					</div>
					</div>
					<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm"  type="button"
							id="finalChk">
							<i class="fa fa-check-circle fa-lg"></i> &nbsp;Final Check
						</button>
						<button class="btn btn-primary" type="button" id="close"><i class="fa fa-times"></i>&nbsp;Close</button>
					</div>
					</form>
				</div>
				
				
			</div>
			
		</div>
	</div>
</div>
 <div class="modal fade" id="myModalConfirm" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"	style="padding-top: 2%;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                 <h3 class="modal-title" id="myModalLabel">Confirm !</h3>

            </div>
            <div class="modal-body">
                 <h4> Are You Sure to Complete Stock Check for the Current Record ?</h4>

            </div>
            <!--/modal-body-collapse -->
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="btnConfirmYes" href="#">Yes</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">No</button>
            </div>
        </div>
    </div>
</div>

<script src="resource/oe/assets/js/app/dailyStockCheckDc.js" type="text/javascript"></script>
<style>
.dateBackground{
background-color:white !important;
}
.designView{
 margin-top: -165px !important;
}
.mrvView{
 margin-top: -80px !important;
}
.dchView{
 margin-top: -50px !important;
}
.sgView{
 margin-top: -40px !important;
}
</style>