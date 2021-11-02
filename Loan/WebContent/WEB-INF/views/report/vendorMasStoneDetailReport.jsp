<!-- 
	##	Author1         : 	Raksha
	##  Author [SERVER] :   Venkat Prasad
	##  DOCUMENT		: 	Jitendra
	##	Date Creation 	: 	12-03-2021
	## 	Description		:	Search and export functionality .
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Vendor MAS Stone Detail

					</h1>
					<div class="heading-block-action"></div>
				</div>
				<form class="form-horizontal" id="CustOrderDue"
					action="javascript: void(0);">
						<!-- Row 1 Started  -->
						<div class="row">
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Vendor Code</label><input type="text" class="form-control"
									placeholder="Vendor Code" id="vendorCode" name="vendorCode"> <input
									id="vendorCode-value" type="hidden" >
							</div>
							
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
								
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Stone Segment</label>
									<select id="stoneSegmentS" name="stoneSegmentS" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
							<div class="col-sm-2">
								<span class="required">*</span>&nbsp;<label>Stone Category</label>
									<select id="stoneCatS" name="stoneCatS" class="form-control">
										<option value="" selected label="Select" />
									</select>
							</div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="button"
								name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							&nbsp;
							<button id="clear" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button> 
							&nbsp;
							<!-- <button name="export" id="export" type="button" 
								class="btn btn-primary btn-sm voffset" disabled>
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button>
							&nbsp;
							<button name="print" id="printCF" type="button"
								class="btn btn-primary btn-sm voffset" disabled>
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
							</button> -->
						</div>
						<div class="clearfix">&nbsp;</div>
						
						<div id="headersection" class="row">
			
						<div class="col-sm-12">
								<!-- <table class="table" style="border-color: #0065aa;">
									<tr style="border-color: #0065aa;">
										<td style="border-color: #0065aa;" class="text-center" id="cmpName"></td>
									</tr>
									<tr style="border-color: #0065aa;">
										<td style="border-color: #0065aa;" class="subHeading" id="cmpAdd"></td>
									</tr>
								</table> -->
								<table class="table table-bordered table-hover tabStyle" style="border-color: #0065aa; border-top: none;" id="compTableId">
									<tbody id="compDetails"></tbody>
								</table>
								<table class="table table-bordered table-hover tabStyle" style="margin-top: -22px; border-color: #0065aa; border-top: none;" id="myTableId">
									<tbody id="certDetailsSec"></tbody>
								</table>
						</div>
			
					</div>
					
					<div class="col-md-12 melting-table" style="margin-top: -21px;" id="searchSection">
				<div class="tabmelting row">
					<div class="panel with-nav-tabs panel-primary">
						<div class="panel-heading">
							<ul class="nav nav-tabs">
								<li class="active" id="mas"><a href="#tab1primary"
									data-toggle="tab"><i class="fa fa-user fa-lg"></i> MAS</a></li>
									
										<!-- <li id="tab6Id"><a
											href="#tab6primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i><p id="tab6Name" style="margin-left: 22px; margin-top: -16px;"></p></a></li> -->
												
										<li id="issueFg"><a
											href="#tab2primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i> Issue Details</a></li>
								
										<li id="receiptRm"><a
											href="#tab3primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i> Receipt Details </a></li>
												
										<li id="indvGr"><a
											href="#tab4primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i> Individual Goods Receipt</a></li>
												
										<li id="sdvDet"><a
											href="#tab5primary" data-toggle="tab" ><i
												class="fa fa-filter fa-lg"></i> Stone Difference Voucher</a></li>
												
										 <li id="wgtRange"><a
											href="#tab6primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i> Weight Range </a></li>
												
										<!--<li id="receiptRmReg"><a
											href="#tabRmRegPrimary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i>  Receipt Raw Material Regular </a></li>
										
										<li id="receiptRmSys"><a
											href="#tabRmSysPrimary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i>  Receipt Raw Material System </a></li>
												
										<li id="receiptFg"><a
											href="#tab7primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i>  Receipt Finished Goods </a></li>
										
										<li id="receiptFr"><a
											href="#tab8primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i> Receipt finished Regular </a></li>
												
										<li id="receiptFsm"><a
											href="#tab9primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i> Receipt Finished System </a></li>
												
										<li id="vendRet"><a
											href="#tab10primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i> Vendor Return </a></li>
												
										<li id="repairIssue"><a
											href="#tab11primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i> Repair Issue </a></li>
												
										<li id="repairReceipt"><a
											href="#tab12primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i> Repair Receipt</a></li>
												
										<li id="sampleIssue"><a
											href="#tab13primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i> Sample Issue </a></li>
												
										<li id="sampleReceipt"><a
											href="#tab14primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i>  Sample Receipt </a></li>
										
										<li id="grDet"><a
											href="#tab15primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i> GR Details </a></li>
												
										<li id="adjVouch"><a
											href="#tab16primary" data-toggle="tab"><i
												class="fa fa-filter fa-lg"></i> Adjustment Voucher </a></li> -->
							</ul>
						</div>
						<div class="panel-body panel-body-fixed-height">
							<div class="tab-content">
								<div class="tab-pane fade in active" id="tab1primary">
									<div class="clearfix">&nbsp;</div>
						
						<div class="row">
							<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="masHeading"></u></h5>
							
						<!-- JqGrid Started for search-->
						<div class="col-sm-12">
							<div style="position: relative; z-index: 1">
								<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div></div>
						<!-- JqGrid Ended -->
						<div class="clearfix">&nbsp;</div>
								</div>
								 <div class="tab-pane fade" id="tab2primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading"></u></h5>
							
											<!-- JqGrid Started for search
 -->											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid1" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab3primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="recHeading"></u></h5>
							<!-- 
											JqGrid Started for search -->
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid2" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab4primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Individual Goods Receipt</u></h5>
							
									<!-- 		JqGrid Started for search -->
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid3" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab5primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Stone Difference Voucher </u></h5>
							
											<!-- JqGrid Started for search -->
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgridS" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								 <div class="tab-pane fade" id="tab6primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Article Code Weight Range Wise Opening,Issues,Receipts and Closing Balance</u></h5>
							
											<!-- JqGrid Started for search -->
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid5" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<!--<div class="tab-pane fade" id="tabRmRegPrimary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Receipt Raw Material Regular</u></h5>
							
											JqGrid Started for search
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgridRR" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tabRmSysPrimary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Receipt Raw Material </u></h5>
							
											JqGrid Started for search
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgridRS" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab7primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Receipt Finished Goods </u></h5>
							
											JqGrid Started for search
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid6" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab8primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Receipt Finished Goods </u></h5>
							
											JqGrid Started for search
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid7" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab9primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Receipt Finished Goods </u></h5>
							
											JqGrid Started for search
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid8" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab10primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Vendor Return</u></h5>
							
											JqGrid Started for search
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid9" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab11primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Repair Issue </u></h5>
							
											JqGrid Started for search
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid10" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab12primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Repair Receipt </u></h5>
							
											JqGrid Started for search
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid11" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab15primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">GR Details </u></h5>
							
											JqGrid Started for search
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid12" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab13primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Sample Issue Details </u></h5>
							
											JqGrid Started for search
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid13" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab14primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Sample Receipt Details </u></h5>
							
											JqGrid Started for search
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid14" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div>
								<div class="tab-pane fade" id="tab16primary">
									<div class="row">
										<h5 style="margin-left: 18px;font-weight: 600; color: #0065aa;"><i class="fa fa-list"></i>&nbsp;&nbsp;<u id="issHeading">Adjustment Voucher Details </u></h5>
							
											JqGrid Started for search
											<div class="col-sm-12">
												<div style="position: relative; z-index: 1">
													<div id="jqxgrid15" style="font-size: 13px; font-family: Verdana; float: left;"></div>
												</div>
											</div>
									</div>
									<div class="clearfix">&nbsp;</div>
								</div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
				</form>
				<!-- store Master Header Started -->
				<div class="clearfix">&nbsp;</div>

				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>

			</div>
		</div>
	</div>
</div>

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


<script src="resource/oe/assets/js/app/vendorMasStoneDetailReport.js" type="text/javascript"></script>