<!-- 
	##	Author UI           : 	Dipankar
	## 	Author JAVA 	    :   Venkat
	##	Date Creation 	    : 	18-05-2018
	## 	Description		    :	Design Order
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
					<div class="heading-block">
						<h1>
							<i class="fa fa-desktop"></i> &nbsp;FAS Details
						</h1>
						<div class="heading-block-action"></div>
					</div>					
					
					<div class="clearfix"></div>
					<div class="col-md-12">
					<div class="col-md-4 form-field pull-left"></div>
						<div class="col-sm-2 form-field pull-left">
								<span class="required">*</span><label>Ref. Doc. Type</label>
								<select id="refDocType" class="form-control"><option value="" selected label="Select" /></select>
						</div>		
						
						<div class="col-sm-2 pull-left" style="margin-top:-8px;">
							<button style="margin-top:25px;" id="postFasDetails" class="btn btn-sm btn-primary" type="button"><i class="fa fa-share-square-o fa-lg"></i>&nbsp; Post</button>
						</div>
					</div>
					 <div class="col-md-12" style="position: relative; z-index: 1; width:100%;">
	       	 			<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
            		</div>
			</div>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/fas.js" type="text/javascript"></script>