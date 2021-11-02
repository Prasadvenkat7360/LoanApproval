<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat Prasad
	##	Date Creation 	: 	02-03-2021 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1 id="home"><i class="fa fa-desktop"></i> &nbsp; Savings Plan Reminder(Y/N)</h1>
				</div>
					<form class="form-horizontal" id="raiseTvForm">
							<!-- Row 1 Started  -->
							<div>
						<div class="row">
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
							<span class="required">*&nbsp;</span><label>Customer Id</label>
							<input type="text"  class="form-control input-sm" name="custId" id="custId">
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
						<button class="btn btn-primary btn-sm voffset" type="button"
							name="searchSM" id="searchSM">
							<i class="fa fa-search fa-lg"></i> Search
						</button>
						<button id="clearSM" class="btn btn-warning btn-sm voffset" type="reset">
							<i class="fa fa-times fa-lg"></i>&nbsp; Clear
						</button>
						<button id="selectAll" class="btn btn-warning btn-sm voffset" type="button">
							<i class="fa fa-check  fa-lg"></i>&nbsp; Select All
						</button>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div style="position: relative; z-index: 1">
						<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
					</div>
						</div>
						<!-- <div class="row voffset2" align="center" id="saveSection">
						<button class="btn btn-primary btn-sm voffset" type="button"
							name="saveRem" id="saveRem">
							<i class="fa fa-plus fa-lg"></i> Save
						</button></div> -->
				</form>
				
			</div>
		</div>
	</div>
</div>


<script src="resource/oe/assets/js/app/savingsPlanMesg.js" type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
	.intHead{
	padding: 15px;
	text-align: center;
	}
	.textArea{
		display: block !important;
		border: none;
	}
	.currDate{
		display: block !important;
		border: none !important;
		margin-left: 40px !important;
    	margin-top: -24px !important;
	}
	.sub{
	border-left: none;
    border-top: none;
    border-right: none;
    border-bottom-color: black;	}
    
   .sub1{
	border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: none;
    	}
	
	.radio-inline{
    padding-top: 7px;
    margin-top: -10px !important;
    margin-bottom: 0;
    margin-left: 5px !important;}
    
    .intHead1{
    	float :left;
    }
    .validateView{
	border: 1px solid red !important;
	}
	.error
    {
        color: Red;
    }
    .text-center{
    	text-align: center !important;
    	font-size: x-large !important;
    	font-weight: 500 !important;
    	color: brown !important;
    }
    .subHeading{
    	text-align: center !important;
	    font-size: initial !important;
	    font-weight: 600 !important;
	    color: brown !important;
    }
   /*  .tabStyle{
    	border: 1px solid  #0065aa !important;
    } */
    .vendCol{
        color: brown !important;
    }
</style>