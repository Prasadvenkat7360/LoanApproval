<!-- 
	##	Author1         : 	Pooja Sangve(UI)
	## 	Author2 	    :   Dipankar
	##  Author [SERVER] :   Nageshwar Rao
	##  DOCUMENT		: 	Raghuveer
	##	Date Creation 	: 	07-04-2017
	## 	Description		:	Stock And Consignment Order 
 -->
<div class="main-container">
	<div class="container">

		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div id="searchScOrderSection">
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Stock/Consignment Order Form

					</h1>
					<div class="heading-block-action">
						<!-- <a class="btn btn-primary" data-toggle="modal"
							data-target="#createStockOrder" type="button" id="create"
							href="javascript: void(0)"><i class="fa fa-plus"></i>
							&nbsp;Create </a> -->

					</div>
				</div>

				<form class="form-horizontal collapse in" id="CustOrderDue"
					action="javascript: void(0);">
					<div class="mobile-responsive">
						<!-- Row 1 Started  -->

						<div class="row">
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label> Order Date From</label>
								<div class="input-group">
									<input type="text" readonly = 'true'
										class="date-picker form-control dateBackground"
										id="orderFromDate" placeholder="DD/MM/YYYY"> <label
										for="orderFromDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label> Order Date To</label>
								<div class="input-group">
									<input type="text" readonly = 'true'
										class="date-picker form-control dateBackground"
										id="orderToDate" placeholder="DD/MM/YYYY"> <label
										for="orderToDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div>

							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Segment</label> <select id="segment" name="segment"
									class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>

							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Jewel Type</label> <select id="jewelType"
									name="jewelType" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Category Id</label><select id="categoryID"
									name="categoryID" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Sub Category Id</label> <select id="subCategoryId"
									name="subCategoryId" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<span class="required">*</span><label>Order Type</label> <select
									id="orderTypeS" class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Order No.</label> <input type="text"
									class="form-control" placeholder="Order No." id="orderNoS"
									name="orderNoS">
							</div>
							<!-- <div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label> Order Date</label>
								<div class="input-group">
									<input type="text" readonly = 'true'
										class="date-picker form-control dateBackground"
										id="orderDate" placeholder="DD/MM/YYYY"> <label
										for="orderDate" class="input-group-addon cursor"><span
										class="fa fa-calendar"></span></label>
								</div>
							</div> -->
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Entered By</label> <select id="enteredBy" name="enteredBy"
									class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
							<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field">
								<label>Status</label> <select id="status" name="status"
									class="form-control">
									<option value="" selected>--Select--</option>
								</select>
							</div>
						</div>
						
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">

							<button id="create" class="btn btn-primary voffset" type="button"								>
								<i class="fa fa-plus fa-lg"></i>&nbsp; Create
							</button>

							<button class="btn btn-primary voffset" type="submit"
								name="searchS" id="searchS">
								<i class="fa fa-search fa-lg"></i> Search
							</button>

							<button id="clear" class="btn btn-warning voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
						</div>
					</div>
				</form>
				</div>
				
				<div id="headerScOrder" class="heading-block">
						<h1 id="cretaeHeader"><i class="fa fa-desktop"></i> &nbsp; Stock / Consignment Order - Create</h1>
						<h1 id="editHeader"><i class="fa fa-desktop"></i> &nbsp; Stock / Consignment Order - Edit</h1>
						<h1 id="cancelHeader"><i class="fa fa-desktop"></i> &nbsp; Stock / Consignment Order - Cancel</h1>
						<div class="heading-block-action">
							<a class="btn btn-primary" href="javascript:showContentPage('scOrders','bodySwitcher');" id="goback" type="button" ><i class="fa fa-arrow-left"></i>&nbsp;Go Back </a>	
						</div>	
				</div>
				<div class="row">
					<div class="col-lg-2 col-md-6 col-sm-6 col-xs-12 form-field" id="orderTypeHide">
						<span class="required">*</span><label>Order Type</label> <select
							id="orderTypeC" class="form-control">
							<option value="">--Select--</option>
						</select>
					</div>
				</div>
				<br/>
				<!-- Stock And Consignment Order Header Started -->
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid"
						style="font-size: 13px; font-family: Verdana; z-index: 1; float: left;"></div>
				</div>
				
				<div id="jqxgridAcc"
					style="font-size: 13px; margin-top: 3px; font-family: Verdana; z-index: 1; position: relative; width: 100%;">
				</div>
				<!-- <div id="vendorCode" style="font-size: 13px; font-family: Verdana;  z-index:1; position: relative; color:#FF0000; width:100%;"></div> -->

				<div id="metalPropDetSection"
					style="font-size: 13px; margin-top: 3px; font-family: Verdana; z-index: 1; position: relative; width: 100%;">
				</div>
				<div id="attributeDetSection"
					style="font-size: 13px; margin-top: 3px; font-family: Verdana; z-index: 1; position: relative; width: 100%;">
				</div>
				<!-- <div id="attributeDetSection">
				<table width="100%" class='table table-bordered'><thead><tr><th width="10%">Linked Sr. No.</th><th width="85%">Attibutes</th><th width="5%"></th></tr></thead><tbody id='detailsAttr'></tbody></tr></table>
				</div> -->

				<div id="designDetGrid"
					style="font-size: 13px; margin-top: 3px; font-family: Verdana; z-index: 1; position: relative; width: 100%;">
				</div>
				<div id="stoneMasterGrid"
					style="font-size: 13px; margin-top: 3px; font-family: Verdana; z-index: 1; position: relative; width: 100%;">
				</div>
				<div id="accMasterGrid"
					style="font-size: 13px; margin-top: 3px; font-family: Verdana; z-index: 1; position: relative; width: 100%;">
				</div>
				<div class="text-center">
					<button id="saveSCOrder" class="btn btn-primary voffset"
						type="button">
						<i class="fa fa-floppy-o fa-lg"></i>&nbsp; Save
					</button>
				</div>
				<div class="text-center">
					<button id="saveSCOrderEdit" class="btn btn-primary voffset"
						type="button">
						<i class="fa fa-floppy-o fa-lg"></i>&nbsp; Save
					</button>
				</div>
				<div id="stockOrderCancellationSection">
					<form class="form-horizontal" id="stockOrderCancelForm"action="javascript: void(0);">
						<div class="mobile-responsive">
							<div class="row">							
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
									<label>Order No :</label>
									<input type="text" disabled class="form-control input-sm" name="orderNo" id="orderNo">
								</div>	
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
									<label>Date :</label>
									<input type="text" disabled class="form-control input-sm" name="date" id="date">
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
									<label>Advance Paid:</label>
									<input type="text" disabled class="form-control input-sm"  name="advancePaid" id="advancePaid">
								</div>	
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
									<label>Status :</label>
									<input type="text" disabled class="form-control input-sm" name="cancelStatus" id="cancelStatus">
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
									<label>Advance : </label>
									<input type="text" disabled class="form-control input-sm"  name="advance" id="advance">
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
									<label>Unrealized Cheque/DD Amt :</label>
									<input type="text" disabled class="form-control input-sm"  name="unrealizedAmt" id="unrealizedAmt">
								</div>
							</div>
							<div class="row">
								
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
									<label>Cancelled On: </label>
									<input type="text" disabled class="form-control input-sm"  name="cancelledOn" id="cancelledOn">
								</div>
								<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">&nbsp;
									<label>Cancelled By : </label>
									<input type="text" disabled class="form-control input-sm"  name="cancelledBy" id="cancelledBy">
								</div>
							</div>
							
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<div class="clearfix">&nbsp;</div>
							<label class="radio-inline">
							<input class="element" type="radio" name="orderItem"  value="orderItem">&nbsp; <b style="font-size:180%;">Order</b></label> 
							<label class="radio-inline"> 
							<input class="element" type="radio" name="orderItem" value="lineItem" checked>&nbsp; <b style="font-size:180%;">Line Item</b>
						</label>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row">
							&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-list"></i>&nbsp;<u style="font-size :14px;">Stock Order Details :</u>
						</div><br>
						<div style="position: relative; z-index: 1">
							<div id="jqxgridD" style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="modal-footer  text-center">
							<a class="btn btn-primary" data-toggle="modal"
							data-target="#cancelStockOrder" type="button" id="stockOrderCancel"
							href="javascript: void(0)"><i class="fa fa-times fa-lg"></i>
							&nbsp; Cancel Order </a>
							<a class="btn btn-primary" href="javascript:showContentPage('scOrders', 'bodySwitcher');" id="goback" type="button" ><i class="fa fa-list fa-md"></i>&nbsp;Stock Order List</a>	
						</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<!--##################################  Find Vendor Code #################################################  -->

<div class="modal fade" id="findVendor" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-sm">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Find Vendor Code
				</h3>
			</div>
			<form class="form-horizontal" id="vendorCodeSearch"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<br />
					<div class="row">
						<div class="col-md-12 form-field">
							<div class="input-group">
								<input type="text" class="form-control" id="searchVCode" onkeyup="findVendor()"
									placeholder="Vendor Code"> <span
									class="input-group-btn">
									<button class="btn btn-primary" type="button"
										onclick="findVendor()">
										<i class="fa fa-search-plus fa-md"></i>&nbsp;
									</button>
								</span>
							</div>
							<!-- <button style="margin-left: 10px;" type="button"
								class="btn btn-warning pull-right " data-dismiss="modal">
								<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
							</button>
							&nbsp;
							<button class="btn btn-primary pull-right" type="button"
								name="selectVendor1" id="selectVendor1">
								<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Select
							</button> -->
                             <br />
							<table class="table table-striped table-hover scrollSearch" width="100%">
								<thead class="cf">
									<tr class="thead-row">
										<th>Code</th>
									</tr>
								</thead>
								<tbody id="vendorList"></tbody>
							</table>
						</div>
					</div>

				</div>
			</form>
			<div class="modal-footer  text-right">
				<button class="btn btn-primary voffset" type="button"
					name="selectVendor" id="selectVendor">
					<i class="fa fa-floppy-o fa-lg"></i> &nbsp;Select
				</button>
				&nbsp;
				<button type="button" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
		</div>
	</div>
</div>

<!--##################################  Find Article Code #################################################  -->

<div class="modal fade" id="findArticle" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-md">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Find Article Code
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="" action="">
				<div class="col-md-12 mobile-responsive">
					<br />
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-xs-12  form-field">
							<label>Main Cat. </label> <select id="mainCat"
								class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-xs-12 form-field">
							<label>Sub Cat. </label> <select id="subCat" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-xs-12 form-field">
							<input type="hidden" id="pairValues">
						</div>
					</div>
					<!-- <div class="text-center">

						<button class="btn btn-primary" type="button" data-dismiss="modal"
							name="selectArticle1" id="selectArticle1">
							<i class="fa fa-plus fa-lg"></i> &nbsp;Add
						</button>
						&nbsp;
						<button type="submit" style="margin-left: 10px;"
							class="btn btn-warning" data-dismiss="modal">
							<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
						</button>
					</div> -->
					<br />
					<table class="table table-striped table-hover scrollSearch" width="100%">
						<thead>
							<tr class="thead-row">
								<th>Code</th>
							</tr>
						</thead>
						<tbody id="articleList"></tbody>
					</table>
				</div>
			</form>
			<!--  Modal Window Content Ended -->
			<div class="clearfix">&nbsp;</div>
			<!-- Modal Create Company Master  Footer -->
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset" type="button"
					data-dismiss="modal" name="selectArticle" id="selectArticle">
					<i class="fa fa-plus fa-lg"></i> &nbsp;Add
				</button>
				<button type="submit" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>
			</div>
		</div>
	</div>
</div>

<!--##################################  Attribute Details #################################################  -->

<div class="modal fade" id="addAttDetails" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Attribute Details
				</h3>
			</div>
			<form class="form-horizontal" id="attrDetailsForm" action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div id="attributeDetailVal"></div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset" type="button"
					 name="saveAttribute" id="saveAttribute">
					<i class="fa fa-plus fa-lg"></i> &nbsp;Add
				</button>
				<button class="btn btn-primary voffset" type="button"
					data-dismiss="modal" name="updateAttr" id="updateAttr">
					<i class="fa fa-plus fa-lg"></i> &nbsp;Update
				</button>
				<button type="submit" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>
			</div>
		</div>
	</div>
</div>

<!--################################## Design Form #################################################  -->

<div class="modal fade" id="DesignDetSC" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Design Form Details
				</h3>
			</div>
			<form class="form-horizontal" id="designDetailsForm"
				action="javascript:void();">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>

					<div class="col-md-6">
						<div class="row">
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Design Due Date</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="designDueDate" placeholder="DD/MM/YYYY"
										name="designDueDate" data-validation-format="dd/mm/yyyy">
									<label for="designDueDate" class="input-group-addon cursor">
										<span class="fa fa-calendar"></span>
									</label>
								</div>
							</div>

							<div class="col-md-12 form-field">
								<label class="radio-inline"><input type="radio"
									class="element" id="designTomade" value="0" name="designTomade">
									&nbsp; To Be Made </label> <label class="radio-inline"><input
									type="radio" class="element" id="designToUpload" value="1"
									name="designTomade"> &nbsp; To Upload</label> <label
									class="radio-inline"><input type="radio"
									class="element" id="frmDesigLib" value="2" name="designTomade">
									&nbsp; From Library</label>
							</div>

							<!-- 	<div class="col-md-12 form-field">
								<div class="col-md-6"><label>To Select From Design Library </label></div><div class="col-md-6"> <input type="checkbox" class="pull-right"  id="frmDesigLib" value=""></div>
							</div> -->
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Designs Status</label> <input
									type="text" id="designStatus" name="designStatus"
									placeholder="Design Status" class="form-control" disabled /> <input
									type="hidden" id="designStatusId" name="designStatusId"
									placeholder="Design Id" class="form-control" />

							</div>

							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Design Status
									Date</label>
								<div class="input-group">
									<input type="text" readonly = 'true' class="date-picker form-control dateBackground"
										id="designStatusDate" placeholder="DD/MM/YYYY" disabled
										name="designStatusDate" data-validation-format="dd/mm/yyyy">
									<label for="designStatusDate" class="input-group-addon cursor">
										<span class="fa fa-calendar"></span>
									</label>
								</div>
							</div>

							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Design By </label> <select
									id="designBy" name="designBy" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Designer Name </label> <select
									id="designerName" name="designerName" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>


						</div>
					</div>

					<div class="col-md-6">
						<div class="row">
							<div class="col-md-12 form-field">
								<label>Design Upload</label><br>
								<form:form method="POST" action="#" enctype="multipart/form-data" id="uploadForm">
									<div class="btn btn-primary btn-sm col-sm-2" style="padding: 5px 5px 5px 5px">
										<i class="fa fa-plus-circle fa-lg"></i> Browse 
										<input id='uploadImg' class="fileUpload btn btn-primary input-sm" type="file" name="uploadImg"/>
									</div>
								 </form:form>
							</div>

							<div class="col-md-12 form-field">
								<label>Design Instruction</label>
								<textarea rows="2" cols="50" id="designInstr" name="designInstr"
									placeholder="Design Instruction" class="form-control"></textarea>
							</div>


							<div class="col-md-12 form-field">
								<label>Employee to Approve Design :</label><br /> <label
									class="radio-inline"><input type="radio"
									class="element" id="designToApprov" value="true"
									name="designToApprov"> &nbsp; Yes </label> <label
									class="radio-inline"><input type="radio"
									class="element" id="designToApprov" value="false"
									name="designToApprov"> &nbsp; No </label>
							</div>

							<div class="col-md-12 form-field" id="designIdShowHide">
								<span class="required">* </span> <label>Designs Id</label> <input
									type="text" id="designId" name="designId"
									placeholder="Designs Id" class="form-control" />

							</div>

							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>No of Design
									Required</label> <input type="text" id="noOfDesignReq"
									name="noOfDesignReq" placeholder="No of Design Required"
									class="form-control" />
							</div>

							<div class="col-md-12 form-field">
								<label>Stock / Catalogue Page Reference No</label>
								<textarea rows="2" cols="50" id="scCatalogueNo"
									name="scCatalogueNo"
									placeholder="Stock / Catalogue Page Reference No"
									class="form-control"></textarea>
							</div>
						</div>
					</div>
				</div>

				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create Company Master  Footer -->
				<div class="modal-footer  text-center">
					<button class="btn btn-primary voffset" type="submit"
						name="saveDesignForm" id="saveDesignForm">
						<i class="fa fa-plus fa-lg"></i> &nbsp;Add
					</button>
					<button class="btn btn-primary voffset" type="button"
						name="updteDesign" id="updteDesign">
						<i class="fa fa-plus fa-lg"></i> &nbsp;Update
					</button>
					<button type="submit" class="btn btn-warning" data-dismiss="modal">
						<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

<!--################################## Stone Details Form #################################################  -->

<div class="modal fade" id="addStoneDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">

	<div class="modal-dialog modal-md">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Add Stone
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="addStoneDetails"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>

					<div class="col-md-6">
						<div class="row">
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Stone Supp By</label><select
									id="stoneSuppBy" name="stoneSuppBy" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Stone Segment </label><select
									onchange="showSubCatDesc();" id="stoneSeg" name="stoneSeg"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Stone Main
									Category </label><select onchange="showSubCatDesc();" id="stoneMainCat"
									name="stoneMainCat" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-md-12 form-field" id="stoneSubCatSection">
								<span class="required">* </span> <label>Stone Sub
									Category </label><select id="stoneSubCat" name="stoneSubCat"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-md-12 form-field" id="stoneShapeSection">
								<span class="required">* </span> <label>Shape</label><select
									onchange="showSubCatDesc();" id="stoneShape" name="stoneShape"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<input type="hidden" id="stoneIdVal" />
							<div class="col-md-12 form-field">
								<label>Stone Article Code</label> <input type="text"
									id="stoneArticleCode" name="stoneArticleCode"
									placeholder="Stone Article Code" disabled class="form-control" />
								<input type="hidden" id="stoneArticleId" name="stoneArticleId"
									class="form-control" />
							</div>
							<div class="col-md-12 form-field" id="wtRangeSection">
								<span class="required">* </span> <label>Weight Rg</label><select
									onchange="weightRgChange();" id="wtRange" name="wtRange"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-md-12 form-field" id="claritySection">
								<span class="required">* </span> <label>Clarity</label><select
									onchange="showSubCatDesc();" id="clarity" name="clarity"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-md-12 form-field" id="actualColorSection">
								<span class="required">* </span> <label>Actual Color</label> <select
									id="actualColor" name="actualColor" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-md-12 form-field" id="colorSection">
								<span class="required">* </span> <label>Color</label> <select
									onchange="showSubCatDesc();" id="color" name="color"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

						</div>
					</div>

					<div class="col-md-6">
						<div class="row">

							<div class="col-md-12 form-field" id="cutGradeSection">
								<span class="required">* </span> <label>Cut Grade</label> <select
									onchange="showSubCatDesc();" id="cutGrade" name="cutGrade"
									class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-md-12 form-field" id="uomSection">
								<label>UOM</label> <input type="text" disabled id="uom" 
									name="uom" placeholder="UOM" class="form-control" />
							</div>

							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Stone Rate</label> <select
									id="stoneRate" name="stoneRate" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-md-12 form-field" id="dplStonePcsSection">
								<label>Comp Pcs</label> <input type="text" id="dplStonePcs"
									name="dplStonePcs" 
									placeholder="DPL Stone Pieces" class="form-control number_only" />
							</div>

							<div class="col-md-12 form-field" id="dplStoneWtSection">
								<span class="required" id="hideShowCompWt">* </span> <label>Comp Wt</label> <input type="text" id="dplStoneWt"
									name="dplStoneWt" placeholder="DPL Stone Wt" onblur="this.value = validateNumber1(this.value);"
									class="form-control" />
							</div>

							<div class="col-md-12 form-field" id="jwStonePcsSection">
								<label>JW Pcs</label> <input type="text" id="jwStonePcs"
									name="jwStonePcs" 
									placeholder="JW Stone Pieces" class="form-control number_only" />
							</div>

							<div class="col-md-12 form-field" id="jwStoneWtSection">
								<label>JW Wt</label> <input type="text" id="jwStoneWt"
									name="jwStoneWt" placeholder="JW Stone Weight" onblur="this.value = validateNumber1(this.value);"
									class="form-control" />
							</div>

							<div class="col-md-12 form-field" id="stonePriceSection">
								<label>Comp Price</label> <input type="text" id="stonePrice"
									name="stonePrice" placeholder="Stone Price" disabled onblur="this.value = validateNumber(this.value);"
									class="form-control" />
							</div>

							<div class="col-md-12 form-field" id="jwPriceSection">
								<label>JW Price</label> <input type="text" id="jwPrice"
									name="jwPrice" placeholder="Stone Price" disabled onblur="this.value = validateNumber(this.value);"
									class="form-control" />
							</div>

							<div class="col-md-12 form-field" id="stoneCondSection">
								<label>Stone Condition</label> <input type="text"
									id="stoneCondition" name="stoneCondition"
									placeholder="Stone Condition" class="form-control" />
							</div>


							<div class="col-md-12 form-field" id="subCatSection">
								<label>Sub Category Desc</label> <input type="hidden"
									id="subCatDescriptionDesc" />
								<div id="subCatDescription"></div>
							</div>

						</div>
					</div>
				</div>

				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create Company Master  Footer -->
				<div class="modal-footer  text-center">
					<button class="btn btn-primary voffset" type="submit"
						name="saveStoneForm" id="saveStoneForm">
						<i class="fa fa-plus fa-lg"></i> &nbsp;Add
					</button>
					<button class="btn btn-primary voffset" type="button"
						name="updateS" id="updateS">
						<i class="fa fa-plus fa-lg"></i> &nbsp;updateStone
					</button>
					<button type="submit" class="btn btn-warning" data-dismiss="modal">
						<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
					</button>
				</div>
			</form>
		</div>
	</div>
</div>


<!--################################## Accessory Details Form #################################################  -->

<div class="modal fade" id="addAccDet" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">

	<div class="modal-dialog modal-md">

		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Add Accessory
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="addAccDetails"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>

					<div class="col-md-4">
						<div class="row">
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Acc. Supp By</label><select
									id="accSupBy" name="accSupBy" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>

							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Acc. Main Cat </label><select
									id="accMainCat" name="accMainCat" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Acc. Sub Cat</label><select
									id="accSubCat" name="accSubCat" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-md-12 form-field">
								<label>Acc. Article Code</label> <input type="text"
									id="accArticleCode" name="accArticleCode"
									placeholder="Stone Article Code" disabled class="form-control" />
								<input type="hidden" id="accArticleId" name="accArticleId"
									placeholder="Stone Article Code" disabled class="form-control" />
							</div>

							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>UOM</label> <input
									type="text" id="uomAcc" name="uomAcc" placeholder="UOM"
									value="Pcs" class="form-control" disabled />
							</div>
						</div>
					</div>

					<div class="col-md-4">
						<div class="row">
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Acc. Rate</label><select
									id="accRate" name="accRate" class="form-control">
									<option value="" selected label="--Select--" />
								</select> <input type="hidden" id="rateList" />
							</div>

							<div class="col-md-12 form-field" id="jwAccPcsSection">
								<label>JW Acc. Pieces</label> <input type="text" id="jwAccPcs"
									name="jwAccPcs" onblur="jwRateCal();"
									placeholder="JW Acc. Pieces" class="form-control number_only" />
							</div>

							<div class="col-md-12 form-field" id="jwAccWtSection">
								<span class="required">* </span> <label>JW Acc. Weight</label> <input
									type="text" id="jwAccWt" name="jwAccWt" onblur="jwRateCal();"
									placeholder="JW Acc. Weight" class="form-control" />
							</div>

							<div class="col-md-12 form-field" id="jwAccPriceSection">
								<span class="required">* </span> <label>JW Acc. Price</label> <input
									type="text" id="jwAccPrice" name="jwAccPrice" disabled
									placeholder="JW Acc. Price" class="form-control" />
							</div>
						</div>
					</div>

					<div class="col-md-4">
						<div class="row">
							<div class="col-md-12 form-field" id="compAccPcsSection">
								<span class="required">* </span><label>Company Acc. Pieces</label> <input type="text"
									id="compAccPcs" name="compAccPcs" onblur="compRateCal();"
									placeholder="Company Acc. Pieces" class="form-control number_only" />
							</div>

							<div class="col-md-12 form-field" id="compAccWtSection">
								<label>Company Acc. Weight</label> <input type="text"
									id="compAccWt" name="compAccWt" onblur="this.value = validateNumber1(this.value);"
									placeholder="Company Acc. Weight" disabled class="form-control" />
							</div>


							<div class="col-md-12 form-field" id="compAccPriceSection">
								<label>Company Acc. Price</label> <input type="text"
									id="compAccPrice" name="compAccPrice" disabled onblur="this.value = validateNumber(this.value);"
									placeholder="Comp Acc Price" disabled class="form-control" />
							</div>

							<div class="col-md-12 form-field" id="accConditionSection">
								<label>Acc. Condition</label> <input type="text"
									id="accCondition" name="accCondition"
									placeholder="Acc. Condition" class="form-control" />
							</div>
						</div>
					</div>
				</div>
				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<!-- Modal Create Company Master  Footer -->
				<div class="modal-footer  text-center">
					<button class="btn btn-primary voffset" type="submit"
						name="saveAccDet" id="saveAccDet">
						<i class="fa fa-plus fa-lg"></i> &nbsp;Add
					</button>
					<button class="btn btn-primary voffset" type="button"
						name="updateAcc" id="updateAcc">
						<i class="fa fa-plus fa-lg"></i> &nbsp;Update
					</button>
					<button type="submit" class="btn btn-warning" data-dismiss="modal">
						<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

<!--##################################  Attribute Details #################################################  -->

<div class="modal fade" id="sspSrpModal" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">

	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Metal Properties
				</h3>
			</div>
			<form class="form-horizontal" id="attrDetailsForm"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div id="sspSrpDetailVal"></div>
				</div>
			</form>
			<div class="clearfix">&nbsp;</div>
			<div class="modal-footer  text-center">
				<button class="btn btn-primary voffset" type="button"
					data-dismiss="modal" name="saveMPDet" id="saveMPDet">
					<i class="fa fa-plus fa-lg"></i> &nbsp;Add
				</button>
				<button type="button" class="btn btn-warning" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>

			</div>
		</div>
	</div>
</div>

<!--##################################  Cancellation Details #################################################  -->
<div class="modal fade" id="cancelStockOrder" data-keyboard="false"
	data-backdrop="static" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true"
	style="padding-top: 2%;">
	<div class="modal-dialog modal-lg" style=" width: 450px; height:600px !important;">
		<div class="modal-content">
			<!-- Modal Create Dc Master Location Header -->
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp; Reason For Cancellation
				</h3>
			</div>
			<!--  Modal Window Content Started  -->
			<form class="form-horizontal" id="reasonForm"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<!-- Row 1 Started  -->
					<div class="row">						
						<div class="col-md-11 form-field">&nbsp;
						 <span class="required">*</span><label>Reason : </label>
							&nbsp;&nbsp;&nbsp;&nbsp;<textarea  rows="4" cols="50" id="reason" name="reason"  placeholder="" style="background-color: #fefdfd; align:right;" class="form-control"></textarea>
						</div>
					</div>
				</div>
				<div class="clearfix">&nbsp;</div>
				<div class="modal-footer  text-center">
					<button type="button" class="btn btn-primary" id="cancelSO"
						name="cancelSO">
						<i class="fa fa-plus"></i>&nbsp; Ok
					</button>
					<button type="button" class="btn btn-warning" data-dismiss="modal"
						id="cancel">
						<i class="fa fa-times"></i>&nbsp;Cancel
					</button>

				</div>
			</form>
		</div>
	</div>
</div>

<script src="resource/oe/assets/js/app/scOrder.js"type="text/javascript"></script>
<script src="resource/oe/assets/js/app/scOrderForSRP.js"type="text/javascript"></script>
<script src="resource/oe/assets/js/app/scOrderCancellation.js"type="text/javascript"></script>
<style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>