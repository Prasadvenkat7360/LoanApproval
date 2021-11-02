<!--    
    ##	Author (UI)     :   Dipankar Naha
    ##	Author1 (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Divya M
	##	Date Creation 	: 	19-02-2018
	## 	Description		:	Assemble/Disassemble of Items.
 -->
 
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
					 <div class="heading-block">
						 <h1 id="hideSearchId">
							<i class="fa fa-desktop"></i> &nbsp; Assemble/Disassemble of Items -Search
						  </h1>
						  <h1 id="hideCreateId">
							<i class="fa fa-desktop"></i> &nbsp; Assemble/Disassemble of Items -Create
						  </h1>
						  <h1 id="hideAssembleCreateId">
							<i class="fa fa-desktop"></i> &nbsp; Assemble of Items -Create
						  </h1>
						  <h1 id="hideAssembleViewId">
							<i class="fa fa-desktop"></i> &nbsp; Assemble/Disassemble of Items - View
						  </h1>
						      <div class="heading-block-action">
								<a class="btn btn-primary voffset" type="button"
									id="backFromCreate"> <i class="fa fa-chevron-left"></i>&nbsp;Back
								</a>
								<a class="btn btn-primary voffset" type="button"
									id="backFromAssemCreate"> <i class="fa fa-chevron-left"></i>&nbsp;Back
								</a>
								<button class="btn btn-primary" type="button" id="SearchPageCreateId">
									<i class="fa fa-plus"></i> &nbsp;Create Disassemble
								</button>
								<button class="btn btn-primary" type="button" id="createAss">
									<i class="fa fa-plus"></i> &nbsp;Create Assemble
								</button>
							</div>
			        </div>
			 		<div id="searchDisassemble">
						<form class="form-horizontal" id="disassembleSearchFunc">
							<div class="row">
								<div class="col-sm-2">
									<span class="required">*</span><label>Assem./Disassem. of Items </label> 
									<select id="assmbleDisamble" class="form-control" required>
									    <option value="">--Select--</option>
										<option value="assemble">Assemble</option>
										<option value="disassemble">Disassemble</option>
									</select>
								</div>
								<div class="col-sm-2">
								    <span class="required">*</span><label>From Date</label>
									<div class="input-group"><input type="text" readonly='true' placeholder="DD/MM/YYYY"  class="date-picker form-control dateBackground" name="fromDateS" id="fromDateS" >
									<label for="fromDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
							       </div>
						        </div>
						    	<div class="col-sm-2">
								    <span class="required">*</span><label>To Date</label>
									<div class="input-group"><input type="text" readonly='true' class="date-picker form-control dateBackground"
										name="toDateS" id="toDateS" placeholder="DD/MM/YYYY">
									<label for="toDateS" class="input-group-addon cursor"><span class="fa fa-calendar"></span></label>
									</div>
							    </div>
								<div class="col-sm-2">
									<label>Segment</label> <select
										id="segmentS" name="segmentS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								<div class="col-sm-2">
								   <label>Jewel Type</label> <select
										id="jwltypeS" name="jwltypeS" class="form-control">
										<option value="" selected label="Select" />
									</select>
								</div>
								
								<div class="col-sm-2" id="hideStockNo">
									<label>Stock No.</label>
									<input type="text" id="stockNoS" class="form-control">
								</div>
								<div class="col-sm-2" id="hideAssembleIdS">
									<label>Assemble Id</label>
								 	<input type="text" id="assembleIdS" class="form-control">
								</div>
							</div>
							
							</form>
							<div class="clearfix">&nbsp;</div>
							<div class="row voffset2" align="center">
								<button class="btn btn-primary btn-sm voffset" type="button" name="search" id="search">
									<i class="fa fa-search fa-lg"></i> Search
								</button>&nbsp;
								<button id="clearAll" class="btn btn-warning btn-sm voffset" type="button">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
							</div>
						<div class="clearfix">&nbsp;</div>
						<div style="text-align: center; marging: auto; position: relative; z-index: 1"></div>
					      <div id="panelId">
						   <div class="panel panel-default">
						    	<div class="panel-heading">
						     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle1">Original Details</a></h4>				      
						    	</div>
								<div id="panel1"  class="panel-collapse collapse">
									<div class="panel-body">
							       		<div id="jqxgridItemDet" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
							       		<div class="clearfix">&nbsp;</div>
							       		<div id="jqxgridStone" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
							       		<div class="clearfix">&nbsp;</div>
							       		<div id="jqxgridAcc" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
							      	</div>
						 	   	</div>
						    </div>
					    	<div class="panel panel-default">
						    	<div class="panel-heading">
						     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle2">Disassemble To Sale Details</a></h4>				      
						    	</div>
								<div id="panel2"  class="panel-collapse collapse">
									<div class="panel-body">
							       		<div id="jqxgridItemDetToSale" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
							       		<div class="clearfix">&nbsp;</div>
							       		<div id="jqxgridStoneToSale" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
							       		<div class="clearfix">&nbsp;</div>
							       		<div id="jqxgridAccToSale" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
							      	</div>
							   	</div>
						   </div>
						   <div class="panel panel-default">
						    	<div class="panel-heading">
						     		<h4 class="panel-title"><a class="accordion-toggle" id="toggle3">Disassemble To DC Details</a></h4>				      
						    	</div>
								<div id="panel3"  class="panel-collapse collapse">
									<div class="panel-body">
							       		<div id="jqxgridItemDetToDc" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
							       		<div class="clearfix">&nbsp;</div>
							       		<div id="jqxgridStoneToDc" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
							       		<div class="clearfix">&nbsp;</div>
							       		<div id="jqxgridAccToDc" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
							      </div>
							  </div>
						  </div>
				      </div>
				      <div id="assemblePanelId">
						   <div class="panel panel-default">
						    	<div class="panel-heading">
						     		<h4 class="panel-title"><a class="accordion-toggle" id="toggleA">Assemble Details</a></h4>				      
						    	</div>
								<div id="assemblePanel1"  class="panel-collapse collapse">
									<div class="panel-body">
										<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u> Assemble Details</u></h5>
							       		<div id="jqxgridAssembleItemDet" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
							       		<div class="clearfix">&nbsp;</div>
							       		<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u> Stone Details</u></h5>
							       		<div id="jqxgridAssembleStone" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							       		<div class="clearfix">&nbsp;</div>
							       		<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u> Accessory Details</u></h5>
							       		<div id="jqxgridAssembleAcc" style="font-size: 13px; font-family: Verdana; float: left;"></div>
							      	</div>
						 	   	</div>
						    </div>
				    </div>
				  </div>
				  <div id="disassembleCreateId">
				   <form class="form-horizontal" id="disassembleCreateFunc">
					  <div class="row">
			               <div class="col-sm-2">
							    <span class="required">*</span>
							     <label>Stock No.</label> <input type="text" id="stockNoC" placeholder="Stock No." class="form-control">
						   </div>
						   <div class="col-lg-2 col-md-2 col-sm-6 col-xs-12 form-field">
					            <label>&nbsp;</label><br>
								<button class="btn btn-primary btn-sm voffset" type="button" name="searchC" id="searchC">
									<i class="fa fa-search fa-lg"></i> Search
								</button>&nbsp;
								<button id="clearAllc" class="btn btn-warning btn-sm voffset" type="button">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
								</button>
						  </div>
						  <div class="clearfix">&nbsp;</div>
						<div style="text-align: center; marging: auto; position: relative; z-index: 1"></div>
					      <div id="panelIdC">
							   <div class="panel panel-default">
							    	<div class="panel-heading">
							     		<h4 class="panel-title"><a class="accordion-toggle" id="toggleC">Original Details</a></h4>				      
							    	</div>
									<div id="panelC"  class="panel-collapse collapse">
										<div class="panel-body">
								       		<div id="jqxgridItemDetC" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		<div id="jqxgridStoneC" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		<div id="jqxgridAccC" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
								      	</div>
							 	   	</div>
							    </div>
							    <div class="panel panel-default">
							    	<div class="panel-heading">
							     		<h4 class="panel-title"><a class="accordion-toggle" id="toggleCToSale">Disassemble To Sale Details </a></h4>				      
							    	</div>
									<div id="panelCToSale"  class="panel-collapse collapse">
										<div class="panel-body">
								       		<div id="jqxgridItemDetCToSale" style="font-size: 13px; font-family: Verdana; position: relative;  z-index: 1;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		<div id="jqxgridStoneCToSale" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		<div id="jqxgridAccCToSale" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
								      	</div>
							 	   	</div>
							    </div>
						   </div>
						   <div id="validateHide">
							  <div class="row voffset2" align="center">
									<button class="btn btn-primary voffset" type="button" name="validateId" id="validateId">
										<i class="fa fa-plus fa-lg"></i> Validate
									</button>&nbsp;
									<button id="clearCreate" class="btn btn-warning voffset" type="button">
										<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
									</button>
							 </div>
						 </div>
						 <div class="clearfix">&nbsp;</div>
						 <div id="panelIdValidate">
							   <div class="panel panel-default">
							    	<div class="panel-heading">
							     		<h4 class="panel-title"><a class="accordion-toggle" id="toggleToDc">Disassemble To DC Details </a></h4>				      
							    	</div>
									<div id="panelCToDc"  class="panel-collapse collapse">
										<div class="panel-body">
								       		<div id="jqxgridItemDetCToDc" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		<div id="jqxgridStoneCToDc" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		<div id="jqxgridAccCToDc" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
								      	</div>
							 	   	</div>
							    </div>
							    <div class="modal-footer  text-center">
							    <div class="clearfix">&nbsp;</div>
							    <button class="btn btn-primary voffset" type="button" name="save" id="save">
										<i class="fa fa-floppy-o"></i>&nbsp;Save
								</button>
						    </div>
					    </div>
				    </div>
				 </form>
			  </div>
			   <div id="assembleViewSection">
			   		<form class="form-horizontal"  id="disassembleViewForm">
			   		  <div class="clearfix">&nbsp;</div>
			   		<div id="assemblePanelViewId">
			   		  
						   <div class="panel panel-default">
						    	<div class="panel-heading">
						     		<h4 class="panel-title"><a class="accordion-toggle" id="toggleV">Assemble Details</a></h4>				      
						    	</div>
								<div id="assembleViewPanel"  class="panel-collapse collapse">
									<div class="panel-body">
								<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Assemble Details</u></h5>
								<div id="viewItemDetGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
								<div class="clearfix">&nbsp;</div>	
							    <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Stone Details</u></h5>
								<div id="viewStoneDetGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
								<div class="clearfix">&nbsp;</div>						
								<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Accessory Details</u></h5>
								<div id="viewAccDetGrid" style="font-size: 12px; margin-top:5px; font-family: Verdana; position: relative;"></div>
							      	</div>
						 	   	</div>
						    </div>
				    </div>
			   			
			</form>
			  	</div>
			  <div id="assembleCreateSection">
			  		<div class="col-sm-2" id="createBy">
						<label>Create Assemble By:</label>
						 <select id="assembleCreateBy" name="assembleCreateBy" class="form-control">
						 	<option value="">--Select--</option>
							<option value="disassembleId">Disassemble Id</option>
							<option value="purchaseBillSplit">Purchase Bill Split</option>
							<option value="salesReturn">Sales Return No</option>
						</select>
					</div>
					<div class="row">
						<div class="col-sm-2" id="hideDisAssembleIdC">
							<span class="required">*</span>&nbsp;<label>Disassemble Id</label>
								<input type="text" id="disAssembleIdC" class="form-control" required>
						</div>
						<div class="col-sm-2" id="hidePBNoC">
							<label>Purchase Bill No</label>
								<input type="text" id="purchaseBillNoC" class="form-control">
						</div>
						<div class="col-sm-2" id="hideSalesRetNoC">
							<label>Sales Return No</label>
								<input type="text" id="salesReturnNoC" class="form-control">
						</div>
						<div class="col-sm-2" id="hideSelectSrlNo">
							<label>Serial no:</label>
							<select id="srlNo" class="form-control"><option value=''>--Select--</option></select>
						</div>
						<div class="col-sm-2" id="hideAssSearch">
							<label>&nbsp;</label><br>
							<button class="btn btn-primary btn-sm voffset" type="button" name="addAssembleItems" id="addAssembleItems">
									<i class="fa fa-search fa-lg"></i> Search
							</button>
							<button id="clearAllS" type="button" class="btn btn-warning btn-sm voffset">
									<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>							
						</div>
					</div>
						<div class="clearfix">&nbsp;</div>
					<div class="row" id="createGrids">
						 <div class="panel panel-default">
							    	<div class="panel-heading">
							     		<h4 class="panel-title"><a class="accordion-toggle" id="toggleCToSaleS">Original Details</a></h4>				      
							    	</div>
									<div id="panelCToSaleS"  class="panel-collapse collapse">
										<div class="panel-body">
											<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u> Assemble Details</u></h5>
								       		<div id="jqxgridAssembleHeader" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		 <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Stone Details</u></h5>
								       		<div id="jqxgridStoneDetails" style="font-size: 13px; font-family: Verdana; float: left;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Accessory Details</u></h5>
								       		<div id="jqxgridAccDetails" style="font-size: 13px; font-family: Verdana; float: left;"></div>
								      	</div>
							 	   	</div>
						</div>
							<div class="clearfix">&nbsp;</div>
						 <div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset"  type="button" name="validateAssembleItems" id="validateAssembleItems">
								<i class="fa fa-check fa-lg"></i> Validate
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="validateGrids">
						 <div class="panel panel-default">
							    	<div class="panel-heading">
							     		<h4 class="panel-title"><a class="accordion-toggle" id="toggleCToSaleV">Validate Details</a></h4>				      
							    	</div>
									<div id="panelCToSaleV"  class="panel-collapse collapse">
										<div class="panel-body">
											<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u> Assemble Details</u></h5>
								       		<div id="jqxgridAssembleHeaderV" style="font-size: 13px; font-family: Verdana; position: relative; z-index: 1;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		 <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Stone Details</u></h5>
								       		<div id="jqxgridStoneDetailsV" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Accessory Details</u></h5>
								       		<div id="jqxgridAccDetailsV" style="font-size: 13px; font-family: Verdana; float: left; z-index: 1;"></div>
								      	</div>
							 	   	</div>
						</div>
						 <div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset"  type="button" name="saveAssembleItems" id="saveAssembleItems">
								<i class="fa fa-floppy-o"></i> Save
							</button>
							<button class="btn btn-warning btn-sm voffset"  type="button" name="cancelAssembleItems" id="cancelAssembleItems">
								<i class="fa fa-times fa-lg"></i> Cancel
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="pbCreateGrids">
						 <div class="panel panel-default">
							    	<div class="panel-heading">
							     		<h4 class="panel-title"><a class="accordion-toggle" id="pbOrgDetails">Original Details</a></h4>				      
							    	</div>
									<div id="pbOrgDetailsC"  class="panel-collapse collapse">
										<div class="panel-body">
											<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u> Assemble Details</u></h5>
								       		<div id="jqxgridPBAssembleHeader" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		 <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Stone Details</u></h5>
								       		<div id="jqxgridPBStoneDetails" style="font-size: 13px; font-family: Verdana; float: left;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Accessory Details</u></h5>
								       		<div id="jqxgridPBAccDetails" style="font-size: 13px; font-family: Verdana; float: left;"></div>
								      	</div>
							 	   	</div>
						</div>
							<div class="clearfix">&nbsp;</div>
						 <div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset"  type="button" name="validatePBAssembleItems" id="validatePBAssembleItems">
								<i class="fa fa-check fa-lg"></i> Validate
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="pbValidateGrids">
						 <div class="panel panel-default">
							    	<div class="panel-heading">
							     		<h4 class="panel-title"><a class="accordion-toggle" id="pbValidDetails">Validate Details</a></h4>				      
							    	</div>
									<div id="pbValDetailsC"  class="panel-collapse collapse">
										<div class="panel-body">
											<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u> Assemble Details</u></h5>
								       		<div id="jqxgridAssembleHeaderPbV" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		 <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Stone Details</u></h5>
								       		<div id="jqxgridStoneDetailsPbV" style="font-size: 13px; font-family: Verdana; float: left;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Accessory Details</u></h5>
								       		<div id="jqxgridAccDetailsPbV" style="font-size: 13px; font-family: Verdana; float: left;"></div>
								      	</div>
							 	   	</div>
						</div>
						 <div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset"  type="button" name="saveAssemblePbItems" id="saveAssemblePbItems">
								<i class="fa fa-floppy-o"></i> Save
							</button>
							<button class="btn btn-warning btn-sm voffset"  type="button" name="cancelAssemblePbItems" id="cancelAssemblePbItems">
								<i class="fa fa-times fa-lg"></i> Cancel
							</button>
						</div>
					</div>
					
					
					<div class="row" id="sbCreateGrids">
						 <div class="panel panel-default">
							    	<div class="panel-heading">
							     		<h4 class="panel-title"><a class="accordion-toggle" id="sbOrgDetails">Original Details</a></h4>				      
							    	</div>
									<div id="sbOrgDetailsC"  class="panel-collapse collapse">
										<div class="panel-body">
											<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u> Assemble Details</u></h5>
								       		<div id="jqxgridSBAssembleHeader" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		 <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Stone Details</u></h5>
								       		<div id="jqxgridSBStoneDetails" style="font-size: 13px; font-family: Verdana; float: left;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Accessory Details</u></h5>
								       		<div id="jqxgridSBAccDetails" style="font-size: 13px; font-family: Verdana; float: left;"></div>
								      	</div>
							 	   	</div>
						</div>
							<div class="clearfix">&nbsp;</div>
						 <div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset"  type="button" name="validateSBAssembleItems" id="validateSBAssembleItems">
								<i class="fa fa-check fa-lg"></i> Validate
							</button>
						</div>
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row" id="sbValidateGrids">
						 <div class="panel panel-default">
							    	<div class="panel-heading">
							     		<h4 class="panel-title"><a class="accordion-toggle" id="sbValidDetails">Validate Details</a></h4>				      
							    	</div>
									<div id="sbValDetailsC"  class="panel-collapse collapse">
										<div class="panel-body">
											<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u> Assemble Details</u></h5>
								       		<div id="jqxgridAssembleHeaderSbV" style="font-size: 13px; font-family: Verdana; position: relative;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		 <h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Stone Details</u></h5>
								       		<div id="jqxgridStoneDetailsSbV" style="font-size: 13px; font-family: Verdana; float: left;"></div>
								       		<div class="clearfix">&nbsp;</div>
								       		<h5 style="margin-top: 10px;"><i class="fa fa-list"></i>&nbsp;<u>Accessory Details</u></h5>
								       		<div id="jqxgridAccDetailsSbV" style="font-size: 13px; font-family: Verdana; float: left;"></div>
								      	</div>
							 	   	</div>
						</div>
						 <div class="row voffset2" align="center">
							<button class="btn btn-primary btn-sm voffset"  type="button" name="saveAssembleSbItems" id="saveAssembleSbItems">
								<i class="fa fa-floppy-o"></i> Save
							</button>
							<button class="btn btn-warning btn-sm voffset"  type="button" name="cancelAssembleSbItems" id="cancelAssembleSbItems">
								<i class="fa fa-times fa-lg"></i> Cancel
							</button>
						</div>
					</div>
			  </div>
		   </div>
	     </div>
	 </div>
 </div>
 
 
 <script src="resource/oe/assets/js/app/assembleDisassemble.js"></script>
 <script src="resource/oe/assets/js/app/disassembleCreate.js"></script>
 <script src="resource/oe/assets/js/app/assembleCreate.js"></script>
 <script src="resource/oe/assets/js/app/assembleCreateBySaleBillNo.js"></script>
 <style>
	.dateBackground
	{
	background-color:white !important;
	}
</style>