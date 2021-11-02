<!-- 
	##	Author UI 		    : 	Pooja Sangve
	## 	Author JAVA 	    :   Manoranjan
	##	Date of Creation 	: 	06-10-2017
	## 	Description		    :	Fully/Partially Customer -Search ,Export and Print Functionality
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Fully/Partially Customer
						Order
					</h1>
					<div class="heading-block-action"></div>
				</div>
				<form class="form-horizontal" id="fpCustomerOrder"
					action="javascript: void(0);">
						<!-- Row 1 Started  -->
						<div class="row">

							<div class="col-sm-2" id="storeNamehide" >
								<label>Store Name</label>
								<div id="storeName"></div>
							</div>

							<div class="col-sm-2">
								<label>Article Segment</label>
								<div id="articleSegment"></div>
							</div>
							
							<div class="col-sm-2">
								<label>Order Kind</label>
								<div id="orderKind"></div>
							</div>
					 </div>
						
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"
								name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clear" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							&nbsp;
							<button name="export" id="export" type="button"
								class="btn btn-primary btn-sm voffset" >
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
							&nbsp;
							 <button name="printfpc" id="printfpc" type="button"class="btn btn-primary btn-sm voffset">								
							 <i class="fa fa-print fa-lg"></i>&nbsp; Print
							 </button>
						</div>
				</form>
				<div class="clearfix">&nbsp;</div>
				<div id='row'>
				 <div style="position: relative; z-index: 1">
    				<div id="jqxgrid"></div>
    				</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="designViewFPOrder" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        	<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title"><i class="fa fa-plus"></i> &nbsp;Design View</h3>				
			</div>
			<div class="modal-body" align="center" id="content">
				<div id="page-content"> </div>
		            <div class="text-center">
		            <ul id="pagination-demo" class="pagination-sm sync-pagination"></ul>
		            </div>
			</div>
			    
        </div>
    </div>
</div> 

<script src="resource/oe/assets/js/app/fpCustOrder.js"type="text/javascript"></script>