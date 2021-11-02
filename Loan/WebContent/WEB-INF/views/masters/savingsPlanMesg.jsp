<!-- 
	##	Author UI       : 	Raksha
	##  JAVA            :   Venkat Prasad
	##	Date Creation 	: 	13-01-2021 
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Header Started -->
				<div class="heading-block">
					<h1 id="home"><i class="fa fa-desktop"></i> &nbsp; Saving Plan Alert Message </h1>
				</div>
					<form class="form-horizontal" id="raiseTvForm">
							<!-- Row 1 Started  -->
							<div>
						<div class="row">
							<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Mode :</label>
									<select id="mode" name="mode" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
							<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Intimation/Reminder :</label>
									<select id="intOrRem" name="intOrRem" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						
						<div class="row">
							<div class="col-sm-2">
							 &nbsp;<span class="required">*</span>&nbsp;<label>Message :</label></div>
						</div>
						<div class="row" id="createContent">
								<textarea  rows="15" cols="70" id="mailContent" style="margin-left: 20px; border-radius: 8px;"></textarea>
							</div>
						<div class="clearfix">&nbsp;</div>
						
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button" name="save" id="save">
								<i class="fa fa-plus fa-lg"></i> Save
							</button>							
							<button id="clear" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
							</button>	
						</div>
						<div class="clearfix">&nbsp;</div>
						</div>
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