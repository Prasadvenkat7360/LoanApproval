<!-- 
	##	Author UI : Dipankar Naha
	##  Author UI : Raksha 
	## 	Author JAVA : Nageshwar rao
	## 	Date Creation : 04/06/2018
 -->

<div class="main-container">
	<div class="container">
		<div class="row">
			<div class="col-md-12  layout-main">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> Company Material Return
					</h1>
				</div>
				<div id="materialReturn">
						<div class="row">
							<div class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								 <select id="createOrSearch" name="createOrSearch" class="form-control">
									<option value="" selected>--Select--</option>
									<option value="create">Create Company Return</option>
									<option value="search">Search Company Return</option>
								</select>
							</div>
							<!-- ########### Starting of the Search  Section -->
								<div id="searchSection" class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
									<form class="form-horizontal" id="materialRetSearchForm" action="javascript: void(0)">
										<div>
											<label class="radio-inline"> <input class="element" type="radio" name="matRetS"  value="customerS">&nbsp; Stock Order </label>
											<!-- <label class="radio-inline"><input class="element" type="radio" name="matRetS" value="consignmentS">&nbsp; Consignment Order </label> -->
										</div>
									</form>
								</div>
							<!-- ########### Ending of the Search  Section -->
							
							<!-- ########### Starting of the Create  Section -->
							<div id="createSection" class="col-lg-3 col-md-6 col-sm-6 col-xs-12 form-field">
								<form class="form-horizontal" id="materialRetCreateForm" action="javascript: void(0)">
									<div class="pull-left">
										<label class="radio-inline"><input class="element" type="radio" name="matRetC" value="customerC">&nbsp; Stock Order </label>
							<!-- 			<label class="radio-inline"> <input class="element" type="radio" name="matRetC" value="consignmentC">&nbsp; Consignment Order </label> -->
									</div>
								</form>
                			</div>
                			<!-- ########### Ending of the Create  Section -->
						</div>
					</div>
					
			<!-- ########### Starting of the Customer Order Search  Section -->
				<div id="customerSearchSection">
					<form class="form-horizontal" id="customerSearchForm"
						action="javascript: void(0)">
						<div class="clearfix">&nbsp;</div>
						<div class="row">
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateCuS" id="fromDateCuS" placeholder="DD/MM/YYYY">
										<label for="fromDateCuS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateCuS" id="toDateCuS" placeholder="DD/MM/YYYY">
										<label for="toDateCuS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<label>Order No</label> <input id="orderNoCuS" name="orderNoCuS" class="form-control">
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<label>Order Sl No</label> <select id="orderSlNoCuS" name="orderSlNoCuS"
									 class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary voffset" type="button" name="searchST" id="searchST">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearST" class="btn btn-warning voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>	</div>
							</form>
							<div class="clearfix">&nbsp;</div>
					<div class="panel with-nav-tabs " id="gridTabs">
						<div class="panel">
		                    <div class="panel-heading">
			                      <ul class="nav nav-tabs">
									<li id="home"><a data-toggle="tab" href="#tab0default" >
									  <i class="fa fa-user fa-lg">&nbsp;</i>FG Details</a></li>
										<li class="tabDisabledS" id="stoneDetails" ><a data-toggle="tab" href="#tab1default">Stones</a></li>
										<li class="tabDisabledS" id="accDetails"><a data-toggle="tab" href="#tab2default" >Accessories</a></li>
							     </ul>
						    </div>
						    <div class="panel-body" >
			                  <div class="tab-content">
			                      <div class="tab-pane fade ui-tabs-panel active in" id="tab0default">
					                <div style="text-align: center; marging: auto; position: relative; z-index: 1">
						                  <div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
					                </div>
			                 	   </div>
				                   <div class="tab-pane fade" id="tab1default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgridStone" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
			                      <div class="tab-pane fade" id="tab2default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								           <div id="jqxgridAcc" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							           </div>
			                     </div>
			                 </div>
			            </div>
			       </div>
			    </div>
					
				</div>
			<!-- ########### Ending of the Customer Order Section -->
			
			<!-- ########### Starting of the Consignment Order Search  Section -->
				<div class="clearfix">&nbsp;</div>
				<div id="consignmentSearchSection">
					<form class="form-horizontal" id="consignmentSearchForm"
						action="javascript: void(0)">
						<div class="row">
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>From Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										 name="fromDateCoS" id="fromDateCoS" placeholder="DD/MM/YYYY">
										<label for="fromDateCoS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>To Date</label>
										<div class="input-group"><input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										name="toDateCoS" id="toDateCoS" placeholder="DD/MM/YYYY">
										<label for="toDateCoS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<label>Order No</label> <input id="orderNoCoS" name="orderNoCoS" class="form-control">
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<label>Order Sl No</label> <select id="orderSlNoCoS" name="orderSlNoCoS"
									 class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
						</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary voffset" type="button" name="searchCO" id="searchCO">
								<i class="fa fa-search fa-lg"></i> Search
							</button>							
							<button id="clearCO" class="btn btn-warning voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>	</div>
					</form>
					<div class="clearfix">&nbsp;</div>
					<div class="panel with-nav-tabs " id="gridTabsCo">
						<div class="panel">
		                    <div class="panel-heading">
			                      <ul class="nav nav-tabs">
									<li id="homeC"><a data-toggle="tab" href="#tabFgdefaultCO" >
									  <i class="fa fa-user fa-lg">&nbsp;</i>FG Details</a></li>
										<li class="tabDisabledC" id="stoneDetailsC" ><a data-toggle="tab" href="#tabStonedefaultCO">Stones</a></li>
										<li class="tabDisabledC" id="accDetailsC"><a data-toggle="tab" href="#tabAccdefaultCO" >Accessories</a></li>
							     </ul>
						    </div>
						    <div class="panel-body" >
			                  <div class="tab-content">
			                      <div class="tab-pane fade ui-tabs-panel active in" id="tabFgdefaultCO">
					                <div style="text-align: center; marging: auto; position: relative; z-index: 1">
						                  <div id="jqxgridF" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
					                </div>
			                 	   </div>
				                   <div class="tab-pane fade" id="tabStonedefaultCO">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgridS" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
			                      <div class="tab-pane fade" id="tabAccdefaultCO">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								           <div id="jqxgridA" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							           </div>
			                     </div>
			                 </div>
			            </div>
			       </div>
			    </div>
				</div>
			<!-- ########### Ending of the Design Order Search  Section -->
			
				<!-- ########### Starting of the Customer Order Create Section -->
				<div id="customerOrderCreateSection">
					<form class="form-horizontal" id="customerCreateForm"
						action="javascript: void(0)">
						<div class="row">
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Order No</label> <input id="orderNoCuC" name="orderNoCuC" class="form-control">
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Order Sl No</label> <select id="orderSlNoCuC" name="orderSlNoCuC"
									 class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<br>
								<button class="btn btn-primary voffset" type="button" name="searchCu" id="searchCu">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
						</div>
					</form>
						<div class="clearfix">&nbsp;</div>
					<div class="panel with-nav-tabs " id="gridTabsST">
						<div class="panel">
		                    <div class="panel-heading">
			                      <ul class="nav nav-tabs">
									<li id="homeT"><a data-toggle="tab" href="#tabFgdefaultST" >
									  <i class="fa fa-user fa-lg">&nbsp;</i>FG Details</a></li>
										<li class="tabDisabledT" id="stoneDetailsT" ><a data-toggle="tab" href="#tabStonedefaultST">Stones</a></li>
										<li class="tabDisabledT" id="accDetailsT"><a data-toggle="tab" href="#tabAccdefaultST" >Accessories</a></li>
							     </ul>
						    </div>
						    <div class="panel-body" >
			                  <div class="tab-content">
			                      <div class="tab-pane fade ui-tabs-panel active in" id="tabFgdefaultST">
					                <div style="text-align: center; marging: auto; position: relative; z-index: 1">
						                  <div id="jqxgrid4" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
					                </div>
			                 	   </div>
				                   <div class="tab-pane fade" id="tabStonedefaultST">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgrid5" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
			                      <div class="tab-pane fade" id="tabAccdefaultST">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								           <div id="jqxgrid6" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							           </div>
			                     </div>
			                 </div>
			            </div>
			       </div>
			        
				</div>
				 <div class="row"  align="center" id="retId">			
					<button class="btn btn-primary voffset" type="button" name="returnST" id="returnST">
							<i class="fa fa-mail-reply"></i> Return
					</button>
				</div>
				</div>	
			<!-- ########### Ending of the Design Order Search  Section -->
			<!-- ########### Starting of the Customer Order Create Section -->
				<div id="consignmentOrderCreateSection">
					<form class="form-horizontal" id="consignmentCreateForm"
						action="javascript: void(0)">
						<div class="row">
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Order No</label> <input id="orderNoCoC" name="orderNoCoC" class="form-control">
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
									<span class="required">*</span>&nbsp;<label>Order Sl No</label> <select id="orderSlNoCoC" name="orderSlNoCoC"
									 class="form-control">
										<option value="" selected label="Select" /></select>
								</div>
								<br>
								<button class="btn btn-primary voffset" type="button" name="searchCo" id="searchCo">
									<i class="fa fa-search fa-lg"></i> Search
								</button>
						</div>
					</form>
					<div class="clearfix">&nbsp;</div>
								<div class="panel with-nav-tabs " id="gridTabsCO">
						<div class="panel">
		                    <div class="panel-heading">
			                      <ul class="nav nav-tabs">
									<li id="homeCO"><a data-toggle="tab" href="#tabFgdefaultC" >
									  <i class="fa fa-user fa-lg">&nbsp;</i>FG Details</a></li>
										<li class="tabDisabledCO" id="stoneDetailsCO" ><a data-toggle="tab" href="#tabStonedefaultC">Stones</a></li>
										<li class="tabDisabledCO" id="accDetailsCO"><a data-toggle="tab" href="#tabAccdefaultC" >Accessories</a></li>
							     </ul>
						    </div>
						    <div class="panel-body" >
			                  <div class="tab-content">
			                      <div class="tab-pane fade ui-tabs-panel active in" id="tabFgdefaultC">
					                <div style="text-align: center; marging: auto; position: relative; z-index: 1">
						                  <div id="jqxgrid7" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
					                </div>
			                 	   </div>
				                   <div class="tab-pane fade" id="tabStonedefaultC">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								              <div id="jqxgrid8" style="font-size: 13px; font-family: Verdana; float: left;"> </div>
							           </div>
				                   </div>
			                      <div class="tab-pane fade" id="tabAccdefaultC">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								           <div id="jqxgrid9" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							           </div>
			                     </div>
			                 </div>
			            </div>
			       </div>
			        
				</div>
				 <div class="row"  align="center" id="coRetId">			
					<button class="btn btn-primary voffset" type="button" name="returnCO" id="returnCO">
							<i class="fa fa-mail-reply"></i> Return
					</button>
				</div>
				</div>
			<!-- ########### Ending of the Design Order Search  Section -->
		</div>
		</div>
		</div>
		</div>
<script src="resource/oe/assets/js/app/materialReturn.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/materialReturnCreate.js" type="text/javascript"></script>
<style>
.classhidden
	{
	display:none;
	}
#navTabsCust {
    text-align:center !important;
    padding-left:17px;
	}
.tabDisabled1
	 {
    pointer-events:none;
	}
.tabDisabled2
	 {
    pointer-events:none;
	}
	
a:hover{
	color: black !important;
	}
.dateBackground
	{
	background-color:white !important;
	}
#wastageFullyPC {
	height: 28px;
}
</style>