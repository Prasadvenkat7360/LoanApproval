<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat
	##	Date Creation 	: 	10-08-2020
	## 	Description		:	Phone Book Intimation Reminder Batch 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Phone List Print For Intimation 
					</h1>
				</div>
					<form class="form-horizontal" id="custIntRemForm" action="javascript: void(0)">
							<!-- Row 1 Started  -->
						<div class="clearfix">&nbsp;</div>
						<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Date</label>
										<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
							   <div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>To Date</label>
										<div class="input-group"><input type="text"  readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="calculate" id="calculate">
								<i class="fa fa-list fa-lg"></i> Calculate
							</button>
							<button class="btn btn-primary btn-sm voffset" type="button" name="printList" id="printList">
								<i class="fa fa-print fa-lg"></i> Phone List Print
							</button>							
						</div>
						
				</form>
			</div>
		</div>
	</div>
</div>



<script src="resource/oe/assets/js/app/phoneBookIntRem.js" type="text/javascript"></script>
<style>
	
	.dateBackground
	{
	background-color:white !important;
	}
	</style>