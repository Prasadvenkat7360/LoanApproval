<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat
	##	Date Creation 	: 	24-08-2020
	## 	Description		:	Manual Batch Run
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp;Batch Process
					</h1>
				</div>
					<form class="form-horizontal" id="fgStockItemForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
							<div class="row">
								 <div class="col-sm-3">
									<span class="required" id="pMaincat">*</span>&nbsp;<label>Batch Process Function</label><div id="bpFunctionS"></div>
								</div>
							</div>
					
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="save" id="save">
								<i class="fa fa-floppy fa-lg"></i> Save
							</button>							
							<button id="clearAll" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
						</div>
				</form>
				
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>



<script src="resource/oe/assets/js/app/manualBatchRun.js" type="text/javascript"></script>
