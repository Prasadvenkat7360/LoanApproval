<!-- 
	##	Author UI : Pooja Sangve
	## 	Author JAVA : Nageswara rao
	## 	Date Creation : 10/01/2018
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
	       <div class="col-md-12  layout-main">
			 <div class="heading-block">
				 <h1 id="hideSearchId">
					<i class="fa fa-desktop"></i> Vendor Return - Search
				  </h1>
				  <h1 id="hideCreateId">
					<i class="fa fa-desktop" ></i> Vendor Return - Create
				  </h1>
				      <div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromCreate"> <i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
						<button class="btn btn-primary btn-sm voffset" type="button"
							id="SearchPageCreateId"> <i class="fa fa-plus"></i>&nbsp;Create
						</button>
					</div>
			   </div>
			<div id="vendorSearchHide">
			  <form class="form-horizontal" id="vendorReturnForm" action="javascript: void(0)">
						<div class="row">
							<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>From Date</label>
										<div class="input-group"><input type="text"  readonly='true' class="date-picker form-control dateBackground"
											name="fromDateS" id="fromDateS" placeholder="DD/MM/YYYY">
										<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
								       </div>
							   </div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>To Date</label>
										<div class="input-group"><input type="text" readonly='true' class="date-picker form-control dateBackground"
											name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
										<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
										</div>
								</div>
								<div class="col-sm-2">
									<span class="required">*</span>&nbsp;<label>Material Type</label>
									<select id="materialTypeS" name="materialTypeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
									<label>Segment</label><select id="segmentS" name="segmentS" class="form-control">
										<option value="" selected label="Select" />
										</select>
								</div>
								<div class="col-sm-2" id="metalTypeSId">
									<label>Metal Type</label>
									<input type="text" class="form-control" placeholder="Ref No" id="metalTypeS" disabled name="metalTypeS">
									<!-- <select id="metalTypeS" name="metalTypeS" class="form-control">
										<option value="" selected label="Select" />
										</select> -->
								</div>
								<div class="col-sm-2">
									<label>Vendor Code</label><select id="vendorCodeS" name="vendorCodeS" class="form-control">
										<option value="" selected label="Select" />
										</select>
								</div>
								<div class="col-sm-2">
										<label>Ref Type</label> <select id="refTypeS" name="refTypeS" class="form-control">
											<option value="" selected label="Select" /></select>
								</div>
								<!-- <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="refNoSId">
									<label>Ref No</label>
											 <select id="refNoS" name="refNoS" class="form-control" >
											<option value="" selected label="Select"/>
									</select>
							    </div> -->
							    <div class="col-sm-2" id="refNoSearchId">
										<label>Ref No</label>
										<input type="text" class="form-control" placeholder="Ref No" id="refNoSearch"  onblur="this.value = validateNumberS(this.value);" name="refNoSearch">
							    </div>
								<div class="col-sm-2"id="refSlNoSHide">
									<label>Ref Srl No</label> <select id="refSlNoS"	class="form-control">
										<option value="" label="--Select--" />
									</select>
									<!-- <input type="text" class="form-control" placeholder="Ref Sl No" id="refSlNoS" name="refSlNoS"> -->
								</div>
								<div class="col-sm-2"id="vendorRetorn">
									<label>Vendor Return No</label> 
									<!-- <select id="vendorRetornId"class="form-control">
										<option value="" label="--Select--" />
									</select> -->
									<input type="text" class="form-control" placeholder="Ref Sl No" id="vendorRetornId" name="vendorRetornId">
								</div>
							   <div class="col-sm-2">
								       <label>Created By</label> <select id="createdByS" name="createdByS" class="form-control">
									<option value="" selected label="--Select--" /></select>
							   </div>
						</div>
						<div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset" type="submit"name="search" id="search">
								<i class="fa fa-search fa-lg"></i> Search
							</button>
							<button id="clearall" class="btn btn-warning btn-sm voffset" type="reset">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
							<!-- <button name="export" id="export" type="button"class="btn btn-primary btn-sm voffset" disabled>
								<i class="fa fa-file-excel-o fa-lg"></i>&nbsp; Export
							</button> -->
							<button name="print" id="print" type="button"class="btn btn-primary btn-sm voffset" >
								<i class="fa fa-print fa-lg"></i>&nbsp; Print
							</button>
						</div>
						<div class="clearfix">&nbsp;</div>
				</form>
				<div class="panel with-nav-tabs " id="gridTabs" style="border:1px solid" >
						<div class="panel">
		                    <div class="panel-heading">
			                      <ul class="nav nav-tabs">
									<li id="home"><a data-toggle="tab" href="#tab0default" >
									  <i class="fa fa-user fa-lg">&nbsp;</i>Vendor Details</a></li>
										<li class="tabDisabledS" id="stoneDetails" ><a data-toggle="tab" href="#tab1default">Stones</a></li>
										<li class="tabDisabledS" id="accDetails"><a data-toggle="tab" href="#tab2default" >Accessories</a></li>
										<li class="tabDisabledS" id="taxDetails"><a data-toggle="tab" href="#tab3default" >Tax Details</a></li>
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
			                     <div class="tab-pane fade" id="tab3default">
			                           <div style="text-align: center; marging: auto; position: relative; z-index: 1">
								           <div id="jqxgridTaxDetails" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							           </div>
			                     </div>
			                 </div>
			            </div>
			       </div>
			    </div>
			</div>
			<div id="vendorCreateHide">
			<form class="form-horizontal" id="vendorReturnCretForm" action="javascript: void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div id="vendorReturnCreateC">
					<div class="row">
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<label>Date</label>
						    <input type="text" class="form-control" placeholder=""id="dateC" name="dateC" disabled>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Material Type</label> 
							<select id="matTypeC" name="matTypeC" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>Segment</label>
							<select id="segmentC" name="segmentC" class="form-control">
							      <option value="" selected label="Select" />
							</select>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="categoryHide">
							<span class="required">*</span>&nbsp;<label>Category</label>
							 <select id="categoryId" name="categoryId" class="form-control">
								<option value="" selected label="--Select--" />
							</select>
						</div>
						<input id="metalTypeId" disabled class="form-control" type="hidden"/>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="metalTypeCHide">
							<label>Metal Type</label>
							<input type="text" id="metalTypeC" name="metalTypeC" disabled class="form-control">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required" id="mSeg">*</span>&nbsp;<label>Vendor Code</label> 
						    <select id="vendorCodeC" class="form-control">
							   <option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="mrvTypeCHideIdPacket">
							<span class="required">*</span>&nbsp;<label>GRV Type</label>
							<select id="mrvTypeIdPacket"  class="form-control">
							<option value="" label="--Select--" /></select>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
							<span class="required">*</span>&nbsp;<label>GSTIN No</label> 
						    <select id="gstinC" class="form-control">
							   <option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="refTypeCHide">
							<span class="required" id="fRefDocT">*</span>&nbsp;<label>Ref Type</label> 
							<select id="refTypeC" class="form-control" onchange="stoneModelPopUp()">
							<option value="" label="--Select--" /></select>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="refTypeNoID">
							<span class="required" id="">*</span>&nbsp;<label>Ref  No</label>
							<select id="refNoCrtD" class="form-control">
							<option value="" label="--Select--" /></select>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="refTypeNoIDHide">
							<span class="required" id="">*</span>&nbsp;<label>Ref  No</label>
							 <input	type="text" class="form-control" placeholder="Ref No" id="refNoC" onblur="this.value = validateNumberS(this.value);" name="refNoC">
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="refSrlNoCHide">
							<span class="required">*</span>&nbsp;<label>Ref Srl No</label> 
							    <select id="refSrlNoC" class="form-control">
							<option value="" label="--Select--" /></select>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="stoneAccSlNoHide">
							<span class="required">*</span>&nbsp;<label>Stone/Acc Sl No</label>
							 <select id="stoneAccSlNo"  class="form-control">
								<option value="" label="--Select--" />
							</select>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="metalLocCId">
							<span class="required">*</span>&nbsp;<label>Location Code</label>
							 <select id="metalLocC"  class="form-control">
								<option value=""></option>
							</select>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="packetIdHide">
							<label>Packet No</label>
						    <input type="text" class="form-control" id="packetId" name="packetId" disabled>
						</div>
						
						
						
						<input id="stonePcsHidden" disabled class="form-control" type="hidden"/>
						<input id="stoneWtCode" disabled class="form-control" type="hidden"/>
						<input id="stoneUom" disabled class="form-control" type="hidden"/>
					</div>
					<div class="row voffset2" align="center">
				        <button class="btn btn-primary btn-sm voffset" type="button" name="searchC" id="searchC">
							<i class="fa fa-search fa-lg"></i> Search
						</button>
						<button id="clearallC" class="btn btn-warning btn-sm voffset" type="reset">
							<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
						</button>
					</div>
					</div>
					</div>
					</form>
					<form class="form-horizontal" id="vendorReturnCretFormId">
					<div class="clearfix">&nbsp;</div>
					<div id="SearchVendorMAsterC">
						<div class="row">
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="mrvTypeCHideId">
								<span class="required">*</span>&nbsp;<label>GRV Type</label>
								<select id="mrvTypeId"  class="form-control">
								<option value="" label="--Select--" /></select>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="mrvTypeCHide">
								<label>GRV Type</label>
								 <input id="mrvTypeC" placeholder="GRV Type" class="form-control" type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="segmentVnRtnCHide">
								<label>Segment</label> <input id="segmentVnRtnC" disabled class="form-control" type="text"/>
								
								<input id="refTypeHideId" disabled class="form-control" type="hidden"/>
								<input id="refNoHideId" disabled class="form-control" type="hidden"/>
								<input id="refSrlHideId" disabled class="form-control" type="hidden"/>
								<input id="segCodeHidden" disabled class="form-control" type="hidden"/>
								<input id="segHiddenCode" disabled class="form-control" type="hidden"/>
								<input id="meltingPurityId" disabled class="form-control" type="hidden"/>
								<input id="taxStructureId" disabled class="form-control" type="hidden"/>
								<input id="jwlCodeHidden" disabled class="form-control" type="hidden"/>
								<input id="mrvNo" disabled class="form-control" type="hidden"/>
								<input id="mrvSlNo" disabled class="form-control" type="hidden"/>
								<input id="isIgst" disabled class="form-control" type="hidden"/>
								<!-- <input id="wastageDebitWt" disabled class="form-control" type="hidden"/> -->
								<input id="standardMetalRate" disabled class="form-control" type="hidden"/>
								<input id="standardMetalCost" disabled class="form-control" type="hidden"/>
								<input id="hsnCode" disabled class="form-control" type="hidden"/>
								<input id="cgstC" class="form-control" disabled type="hidden"/>
							    <input id="cgstAmtC" class="form-control" disabled type="hidden"/>
							    <input id="sgstC" class="form-control" disabled type="hidden"/>
				 			    <input id="sgstAmtC" class="form-control" disabled type="hidden"/>
							    <input id="igstC" class="form-control" disabled type="hidden"/>
							    <input id="igstAmtC" class="form-control" disabled type="hidden"/>
							    <input id="cessC" class="form-control" disabled type="hidden"/>
							    <input id="cessAmtC" class="form-control" disabled type="hidden"/>
							    <input id="refTypeForPb" class="form-control" disabled type="hidden"/>
							    <input id="refNoForPb" class="form-control" disabled type="hidden"/>
							    <input id="refSrlNoForPb" class="form-control" disabled type="hidden"/>
							</div>
							
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="jwlCodeHide">
							   <label>Jewel Code</label> <input id="jwlCode" disabled class="form-control" type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="artCodeHide">
							 <span class="required">*</span>&nbsp;<label>Article Code</label>
							 <div class="row">
							 <div class="col-md-3">
								<span class="input-group-btn">
									 <button class="btn btn-primary voffset" data-toggle="modal" data-target="#findArticle" type="button" id="finArtivle">
							            <i class="fa fa-search-plus fa-md"></i>
						              </button>
								</span>
							 </div>
								<div class="col-md-9">
								 <input id="artCode" disabled  class="form-control" type="text"/>
								</div>
								</div>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="pcsCHide">
								<label>Pcs</label> <input id="pcsC" disabled class="form-control" type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="grossWtCHide">
								<label>Gross Wt.</label> <input id="grossWtC" disabled class="form-control" type="text" />
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="netWtCHide">
								<label>Net Wt.</label> <input id="netWtC" disabled class="form-control" type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="purityCHide">
								<label>Purity</label> <input id="purityC" disabled class="form-control" type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="costCodeHide">
								<label>Cost Code</label> <input id="costCode" disabled class="form-control" type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="metalRateCHide">
								<label>Metal Rate</label> <input id="metalRateC"  class="form-control" type="text" onchange="this.value = validateNumber(this.value);" onkeypress="return validateFloatKeyPress(this,event);"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="metalCostCHide">
								<label>Metal Cost</label> <input id="metalCostC"  onchange="this.value = validateNumber(this.value);" onkeypress="return validateFloatKeyPress(this,event);"  class="form-control" type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="pbItemAmtHide">
								<label>PB Item Amount</label> <input id="pbItemAmt" onchange="this.value = validateNumber(this.value);" onkeypress="return validateFloatKeyPress(this,event);"  class="form-control" type="text"/>
							</div>
							 <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="vendorDebitAmtCHide">
								<label>Vendor Debit Amt</label> <input id="vendorDebitAmtC" onchange="this.value = validateNumber(this.value);" onkeypress="return validateFloatKeyPress(this,event);"  class="form-control"  type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="mcTotalCostCHide">
								<label>MC Total/Cost</label> <input id="mcTotalCostC"  onchange="this.value = validateNumber(this.value);" onkeypress="return validateFloatKeyPress(this,event);"  class="form-control" type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="mcFullyPartiallyCHide">
								<label>MC Full/Partial</label>
								<select id="mcFullyPartiallyC" class="form-control">
							    </select>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="mcCHide">
								<label>MC %</label> <input id="mcC" class="form-control" onchange="this.value = validateNumber(this.value);" onkeypress="return validateFloatKeyPress(this,event);"  type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="mcDebitedCHide">
								<label>MC Debited </label> <input id="mcDebitedC" disabled class="form-control" type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="wastageWtCHide">
								<label>Wastage Wt.</label> <input id="wastageWtC"  onchange="this.value = validateNumberFixedThree(this.value);"  onkeypress="return validateFloatKeyPressThreeDec(this,event);" class="form-control" type="text"/>
							</div>
					         <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="wastageAmtCHide">
								<label>Wastage Amt</label> <input id="wastageAmtC"  onchange="this.value = validateNumber(this.value);" onkeypress="return validateFloatKeyPress(this,event);" class="form-control" type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="wastageFullyPCHide">
								<label>Wastage Full/Partial</label>
								<select id="wastageFullyPC" class="form-control">
								</select>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="wastageCHide">
								<label>Wastage %</label> <input id="wastageC" class="form-control" type="text" onchange="this.value = validateNumber(this.value);" onkeypress="return validateFloatKeyPress(this,event);" />
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="wastageWtDebitedCHide">
								<label>Wastage Wt Debited</label> <input id="wastageDebitWt"  onchange="this.value = validateNumberFixedThree(this.value);" onchange="this.value = validateNumber(this.value);" onkeypress="return validateFloatKeyPressThreeDec(this,event);" class="form-control" disabled type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="wastageAmtDebitedCHide">
								<label>Wastage Amt Debited</label> <input id="wastageAmtDebitedC" onchange="this.value = validateNumber(this.value);" onkeypress="return validateFloatKeyPress(this,event);"  class="form-control" disabled type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="lineItemCostCHide">
								<label>Line Item Cost</label> <input id="lineItemCostC" onchange="this.value = validateNumber(this.value);" onkeypress="return validateFloatKeyPress(this,event);"  disabled class="form-control" type="text"/>
							</div>
							<div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field" id="vendorItemAmtCHide">
								<label>Vendor Item Amt</label> <input id="vendorItemAmtC" onchange="this.value = validateNumber(this.value);" onkeypress="return validateFloatKeyPress(this,event);"  class="form-control" disabled type="text"/>
							</div>
					  </div>
			       </div>
			     
				<div class="voffset2" align="left">
				  	<button type="button" class="btn btn-primary btn-sm voffset" id="addDetails" name="addDetails">
						<i class="fa fa-plus fa-lg"></i>&nbsp;Add Details
					</button>
		       </div> 
		   </form>
	   </div>
	</div>
</div>

<form action="#" method="post" name="createVendor" id="createVendor">
<div id="tabGrDet" class="tabmelting row">
	<div class="panel">
		<div class="panel-heading">
			<ul class="nav nav-tabs">
				<li id="grPanelDetails" class="active"><a data-toggle="tab"
					href="#grDetails"><i class="fa fa-user fa-lg"></i>&nbsp;Vendor Return Detail</a></li>
				<li id="tabPanelStone" class="tabDisabledA"><a data-toggle="tab"
					href="#tabStone"><i class="fa fa-filter fa-lg"></i>&nbsp;Stone</a></li>
				<li id="tabPanelAccessories" class="tabDisabledA"><a data-toggle="tab"
					href="#tabAccessories"><i class="fa fa-filter fa-lg"></i>&nbsp;Accessories</a></li>
				<li id="tabPanelTax" class="tabDisabledA"><a data-toggle="tab"
					href="#tabTax"><i class="fa fa-filter fa-lg"></i>&nbsp;Tax Details</a></li>
			</ul>
		</div>
		<div class="panel-body panel-body-fixed-height">
			<div class="tab-content">
				<div id="grDetails" class="tab-pane fade in active">
					<div class="row">
						<div style="position: relative; z-index: 1">	
							<div id="jqxgridV" style="font-size: 12px; font-family: Verdana; float: left;"></div>
						</div>
					</div>
				</div>
			<div id="tabStone">
				<div class="row">
					<div style="position: relative; z-index: 1">
						<div id="jqxgridS" class="tabjqgrid"
							style="font-size: 13px; font-family: Verdana; float: left;"></div>
					</div>
				</div>
			</div>
			<div id="tabAccessories" class="tab-pane fade in">
				<div class="row">
					<div style="position: relative; z-index: 1">
						<div id="jqxgridA" class="tabjqgrid"
							style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
					</div>
			<div id="tabTax" class="tab-pane fade in">
				<div class="row">
					<div style="position: relative; z-index: 1">
						<div id="jqxgridTax" class="tabjqgrid"
							style="font-size: 13px; font-family: Verdana; float: left;"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
<div class="row voffset2" align="center">
   <button type="button" class="btn btn-primary btn-sm voffset" id="saveVendorReturn" name="saveVendorReturn">
      <i class="fa fa-floppy-o"></i>&nbsp;Save
   </button>
</div>
</div>
</div>
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
			<form class="form-horizontal" id="articleModelPopUp" action="">
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
					</div>
					<br />
					<table class="table table-striped table-hover scrollSearch"	width="100%">
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
				<button class="btn btn-primary btn-sm voffset" type="button"data-dismiss="modal" name="selectArticle" id="selectArticle">
					<i class="fa fa-plus fa-lg"></i> &nbsp;Add
				</button>
				<button type="submit" class="btn btn-warning btn-sm voffset" data-dismiss="modal">
					<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
				</button>
			</div>
		</div>
	</div>
</div>
<!--###################################### MOdel POP UP For Loose Stone In Case Of Packet ############################################ -->

<div class="modal fade" id="addStoneDetails" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog"aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h3 class="modal-title">
					<i class="fa fa-plus"></i> &nbsp;Add Stone
				</h3>
			</div>
			<form class="form-horizontal" id="addStoneDetailsId"
				action="javascript:void(0);">
				<div class="col-md-12 mobile-responsive">
					<div class="clearfix">&nbsp;</div>
					<div class="col-md-6">
						<div class="row">
							<div class="col-md-12 form-field">
								<span class="required">*</span> <label>Segment:</label>
								<input id="stoneSegC" name="stoneSegC" disabled	class="form-control">
							</div>
							<div class="col-md-12 form-field">
								<span class="required">*</span> <label> Main Category:</label>
									<input id="stoneMainCatC" name="stoneMainCatC" disabled class="form-control">
							</div>
							<div class="col-md-12 form-field" id="stoneSubCatSection">
								<span class="required">*</span> <label>Sub Category:</label>
								<select id="stoneSubCatC" name="stoneSubCatC" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-md-12 form-field" id="stoneShapeSection">
								<span class="required">*</span> <label>Shape:</label>
									<select id="stoneShapeC" name="stoneShapeC" class="form-control">
										<option value="" selected label="--Select--" />
									</select>
							</div>
							<div class="col-md-12 form-field">
								<label>Stone Code:</label> <input type="text"
									id="stoneArticleCodeC" name="stoneArticleCodeC"
									placeholder="Stone Article Code" disabled class="form-control" />
							</div>
							<div class="col-md-12 form-field" id="wtRangeSection">
								<span class="required">* </span> <label>Weight Range:</label>
								<select  id="wtRangeC" name="wtRangeC" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-md-12 form-field" id="claritySection">
								<span class="required">* </span> <label>Clarity:</label>
									<select  id="clarityC" name="clarityC" class="form-control">
										<option value="" selected label="--Select--" />
									</select>
							</div>
							<div class="col-md-12 form-field" id="colorSection">
								<span class="required">*</span> <label>Color:</label>
								 <select id="colorC" name="colorC" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							
							<div class="col-md-12 form-field" id="cutGradeSection">
								<span class="required">*</span> <label>Cut Grade:</label>
								 <select id="cutGradeC" name="cutGradeC" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-md-12 form-field" id="actualColorSection">
								<span class="required">* </span> <label>Actual Color:</label> <select
									id="actualColorC" name="actualColorC" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
						</div>
					</div>

					<div class="col-md-6">
						<div class="row">
							<div class="col-md-12 form-field" id="uomSection">
								<span class="required">* </span> <label>UOM:</label> <input type="text" disabled id="uomC" 
									name="uomC" placeholder="UOM" class="form-control" />
							</div>
							<div class="col-md-12 form-field" id="actualColorSection">
								<span class="required">* </span> <label>Packet Id:</label> <select
									id="packetIdC" name="packetIdC" class="form-control">
									<option value="" selected label="--Select--" />
								</select>
							</div>
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Pcs:</label> <input type="text" id="stPcsC"
									name="stPcsC" 
									placeholder="Stone Pieces" class="form-control" />
							</div>
							<div class="col-md-12 form-field">
								<span class="required">* </span> <label>Weight:</label> <input type="text" id="stWtC"
									name="stWtC" placeholder="Stone Wt"
									class="form-control" />
							</div>
							<div class="col-md-12 form-field" id="subCatSection">
								<label>Sub Category Desc:</label> <input type="hidden"
									id="subCatDescriptionDesc" />
								<div id="subCatDescription"></div>
							</div>
						</div>
					</div>
				</div>

				<!--  Modal Window Content Ended -->
				<div class="clearfix">&nbsp;</div>
				<div class="modal-footer  text-center">
					<button class="btn btn-primary btn-sm voffset" type="submit"
						name="addStones" id="addStones">
						<i class="fa fa-plus fa-lg"></i> &nbsp;Add
					</button>
					<button type="submit" class="btn btn-warning btn-sm voffset" data-dismiss="modal">
						<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
					</button>
				</div>
			</form>
		</div>
	</div>
</div>


<script src="resource/oe/assets/js/app/vendorReturnCreate.js" type="text/javascript"></script>
<script src="resource/oe/assets/js/app/vendorReturn.js" type="text/javascript"></script>
<style>
.classhidden
	{
	display:none;
	}
.tabDisabled
	 {
    pointer-events:none;
	}
#navTabsCust {
    text-align:center !important;
    padding-left:17px;
	}
.tabDisabled1
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