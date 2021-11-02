<!-- 
	##	Author1 (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Manoranjan Mishra
	##	Date Creation 	: 	18-09-2017
	## 	Description		:	Diamond Certificate Entry and search Functionality
	## Modification     :   UI Design-(05-01-2018) ### POOJA SANGVE
 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-12  layout-main">
				<div class="clearfix">&nbsp;</div>
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Diamond Certificate Entry
					</h1>
					<div class="heading-block-action">
						<a class="btn btn-primary btn-sm voffset" type="button"
							id="backFromCreate"> <i class="fa fa-chevron-left"></i>&nbsp;Back
						</a>
					</div>
				</div>
				<div id="hideDaimondCertSearch">
					<div id="fgGrSearch">
						<form class="form-horizontal" id="daimondCerficateEntrySearch">
								<!-- Row 1 Started  -->
								<div class="row">
									<div class="col-sm-2">
										<span class="required">*</span> &nbsp; <label>FG
											GR/Stone GR</label> <select id="fgGRORStoneGR" class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>

									<div class="col-sm-2">
										<span class="required">*</span> &nbsp; <label>GR No</label> <select
											id="grNoS" name="grNoS" class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
									<div class="col-sm-2">
										<span class="required">*</span> &nbsp; <label>GR Srl
											No</label> <input type="text" disabled id="grSlrNo" class="form-control">
									</div>
								</div>
								<div class="clearfix">&nbsp;</div>

								<div class="row voffset2" align="center">
									<button class="btn btn-primary btn-sm voffset" type="button"
										name="search" id="search">
										<i class="fa fa-search fa-lg"></i> Search
									</button>
									&nbsp;
									<button id="clearAll" class="btn btn-warning btn-sm voffset"
										type="button">
										<i class="fa fa-times fa-lg"></i>&nbsp; Clear
									</button>
								</div>
						</form>
						<div class="clearfix">&nbsp;</div>
						<div
							style="text-align: center; marging: auto; position: relative; z-index: 1">
							<div id="jqxgrid"
								style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
					</div>
				</div>
				<div id="hideCreateDiamondCert">
						<form method="POST" enctype="multipart/form-data" id="diamondCertUpload">
								<div class="form-horizontal" id="daimondCertCreate">
									<div class="col-md-12">
										<div class="heading-block">
											<h4>Diamond Certificate Details</h4>
											<div class="heading-block-action"></div>
										</div>
										<div class="row">
											<div class="col-sm-2">
												<label>Company Certificate No</label> <input type="text" disabled
													name="CompCertNoC" id="CompCertNoC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>FG/Loose Stones</label> <input type="text"
													name="fgLooseStonesC" id="fgLooseStonesC" disabled
													class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Stock No</label> <input type="text" name="stockNoC" disabled
													id="stockNoC" class="form-control">
											</div>
											<div class="col-sm-2">
												<span class="required">*</span> <label>Lab Code 1</label> <select
													id="labCode1C" class="form-control">
													<option value="" selected label="Select" />
												</select>
											</div>
											
											<div class="col-sm-2">
												<span class="required">*</span> <label>Lab
													Certificate No</label> <input type="text" name="labCertNoC"
													id="labCertNoC" class="form-control">
											</div>
										<div class="col-sm-2">
											<span class="required">*</span><label>Upload Certificate 1</label> 
												<div class="btn btn-primary btn-sm col-sm-6" style="padding: 5px">
													<i class="fa fa-plus-circle fa-lg"></i> Browse 
													<input id='uploadImgC1'  style="width:100px;"  class="fileUpload btn btn-primary input-sm" type="file" name="uploadImgC1"/>
											 	</div>
						                        <input type="hidden" id = "lab1Id" name = "lab1Id"/>
				                            </div>
										</div>				
										<div class="row">
											<div class="col-sm-2">
											   <label style="display: block;max-width: 100%;margin-bottom: 8px;font-weight: 700;">View Certificate 1</label>
											   <a target="_blank" id="viewHrefId1" type="button" style="margin:0px; padding: 7px 14px;background-color:#149078;color:white;">
											   <i class="fa fa-eye fa-sm"></i> View</a>
											 </div>
											<div class="col-sm-2">
												<label>Lab Code 2</label> <select id="labCode2C"
													class="form-control">
													<option value="" selected label="Select" />
												</select>
											</div>
											<div class="col-sm-2">
												<label>Lab Certificate No. </label> <input type="text"
													name="labCertNo2C" id="labCertNo2C" class="form-control">
											</div>
											
											<div class="col-sm-2">
												<label>Upload Certificate 2</label> 
													<div class="btn btn-primary btn-sm col-sm-6" style="padding:5px">
														<i class="fa fa-plus-circle fa-lg"></i> Browse 
														<input id='uploadImgC2' style="width:100px;" class="fileUpload btn btn-primary input-sm" type="file" name="uploadImgC2"/>
													</div>
						                            <input type="hidden" id = "lab2Id" name = "lab2Id"/>
				                            </div>
				                            <div class="col-sm-2">
				                               <label  style="display: block;max-width: 100%;margin-bottom: 8px;font-weight: 700;">View Certificate 2</label> 
											   <a target="_blank" id="viewHrefId2" type="button" style="margin:0px;padding: 7px 14px;background-color:#149078;color:white;">
											   <i class="fa fa-eye fa-sm"></i> View</a>
											 </div>
											<div class="col-sm-2">
												<label>Remarks</label> <input type="text" name="remarksC"
													id="remarksC" class="form-control">
											</div>
										</div>

										<div class="row">
										<div class="col-sm-2">
												<span class="required">*</span><label>Shape and	Cutting Style</label>
												<input type="text" name="shapeC" disabled id="shapeC" class="form-control">
											</div>
											<div class="col-sm-2">
												<span class="required">*</span><label>Carat Weight</label> <input
													type="text" name="caratWtC" disabled id="caratWtC" class="form-control">
											</div>
											<div class="col-sm-2">
												<span class="required">*</span> <label>Color Grade</label> 
												<input type="text" name="colorGradC" disabled id="colorGradC" class="form-control">
											</div>
											<div class="col-sm-2">
											   <span class="required">*</span> <label>Clarity Grade</label>
											   <input type="text" name="clarityGradC" disabled id="clarityGradC" class="form-control">
											</div>
											<div class="col-sm-2">
												<span class="required">*</span> <label>Cut Grade</label> 
												<input type="text" name="cutGradC" disabled id="cutGradC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Actual Color </label> <select id="actualColorC"
													class="form-control">
													<option value="" selected label="Select" />
												</select>
											</div>
										</div>

										<div class="row">
										    <div class="col-sm-2">
												<label>Color Origin</label> <input type="text"
													name="colorOriginC" id="colorOriginC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Color Distribution</label> <input type="text"
													name="colorDisC" id="colorDisC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Grade Intensity</label> <select id="gradIntensC"
													class="form-control">
													<option value="" selected label="Select" />
												</select>
											</div>
											<div class="col-sm-2">
												<span class="required">*</span> <label>Clarity
													Remarks </label> <input type="text" name="clarityRemarksC"
													id="clarityRemarksC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Inscription(s)</label>
												<input type="text" name="inscriptionC" id="inscriptionC"
													class="form-control">
											</div>
										</div>

										<div class="heading-block">
											<h4>Color</h4>
											<div class="heading-block-action"></div>
										</div>
										<div class="row">
											<div class="col-sm-2">
												<span class="required">*</span><label> UV Fluorescence</label> <select id="flourC"
													class="form-control">
													<option value="" selected label="Select" />
												</select>
											</div>
										</div>
										<div class="heading-block">
											<h4>Measurement (mm)</h4>
											<div class="heading-block-action"></div>
										</div>
										<div class="row">
											<div class="col-sm-2">
												<span class="required">*</span><label>Measurement(mm)</label> <input type="text" name="measurmentC" id="measurmentC"
													class="form-control">
											</div>
											<div class="col-sm-2">
												<span class="required">*</span><label>Diameter Min/Length</label>
												<input type="text" name="diaMinC" id="diaMinC"
													class="form-control">
											</div>
											<div class="col-sm-2">
												<span class="required">*</span><label>Diameter Max/Width/ mm</label>
												<input type="text" name="diaMaxC" id="diaMaxC"
													class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Diameter Average/ mm</label> <input type="text" name="diaAvgC" id="diaAvgC"
													class="form-control">
											</div>
											<div class="col-sm-2">
												<span class="required">*</span> <label>Depth/ mm</label> <input type="text" name="depthC"
													id="depthC" class="form-control">
											</div>
										</div>

										<!-- <div class="heading-block">
											<h4>Measurement (mm)</h4>
											<div class="heading-block-action"></div>
										</div> -->
											
										<div class="heading-block">
											<h4>Cut</h4>
											<div class="heading-block-action"></div>
										</div>
										<div class="row">
											<div class="col-sm-2">
												<label>Brilliance</label> <select id="brilienceC"
													class="form-control">
													<option value="" selected label="Select" />
												</select>
											</div>
											<div class="col-sm-2">
												<label>Scintilation</label> <select id="scitnC"
													class="form-control">
													<option value="" selected label="Select" />
												</select>
											</div>
											<div class="col-sm-2">
												<label>Fire</label> <select id="fireC" class="form-control">
													<option value="" selected label="Select" />
												</select>
											</div>
										</div>

										<div class="heading-block">
											<h4>Cut Grade (Appearance)</h4>
											<div class="heading-block-action"></div>
										</div>
										<div class="row">
											<div class="col-sm-2">
												<label>Table/ mm</label> <input type="text" name="tablemmC"
													id="tablemmC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Table in %</label> <input type="text" name="tablePercC"
													id="tablePercC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Star Facet in %</label> <input type="text"
													name="starFacetC" id="starFacetC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Crown Angle in degree</label> <input type="text"
													name="crownAngelC" id="crownAngelC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Crown Height in %</label> <input type="text"
													name="crownHeightC" id="crownHeightC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Girdle Thickness</label> <select
													id="gridleThicknessC" class="form-control">
													<option value="" selected label="Select" />
												</select>
											</div>
										</div>

										<div class="row">
											<div class="col-sm-2">
												<label>Pavilion Depth in %</label> <input type="text"
													name="pavilionC" id="pavilionC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Pavilion Angle in degree</label> <input type="text"
													name="pavilionAngC" id="pavilionAngC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Lower Girdle in %</label> <input type="text"
													name="lowerGridleC" id="lowerGridleC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Culet Size</label> <select id="cultSizeC"
													class="form-control">
													<option value="" selected label="Select" />
												</select>
											</div>
											<div class="col-sm-2">
												<span class="required">*</span><label>Polish</label> <select
													id="polishC" class="form-control">
													<option value="" selected label="Select" />
												</select>
											</div>
											<div class="col-sm-2">
												<span class="required">*</span><label>Symmetry</label> <select
													id="symmetryC" class="form-control">
													<option value="" selected label="Select" />
												</select>
											</div>
										</div>
										<div class="row">
											<!-- <div class="col-sm-2"
												style="margin-top: 2%;">
												<button type="button" class="btn btn-primary voffset"
													id="viewImageC" name="viewImageC">
													<i class="fa fa-eye"></i>&nbsp; &nbsp; View Image &nbsp;
												</button>
											</div> -->
											<div class="col-sm-2">
												<label>Status</label> <input type="text" name="statusC"
													disabled id="statusC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Ref Doc Type</label> <input type="text"
													name="refDoctC" disabled id="refDoctC" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Ref Doc Date</label> <input type="text"
													name="refDate" disabled id="refDate" class="form-control">
											</div>
										</div>
									</div>
								</div>
								</form>
								<div class="clearfix">&nbsp;</div>
								<div class="modal-footer  text-center">
									<button type="button" class="btn btn-primary btn-sm"
										id="saveDaimondEntryCreated" name="saveDaimondEntryCreated">
										<i class="fa fa-save"></i>&nbsp;Save
									</button>
									<button id="clearAllC" class="btn btn-warning btn-sm voffset"
										type="button">
										<i class="fa fa-times fa-lg"></i>&nbsp; Clear
									</button>
								</div>

					<!-- <div class="modal fade" id="createDaimondCertBtn"
						data-keyboard="false" data-backdrop="static" tabindex="-1"
						role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
						<div class="modal-dialog modal-lg" style="width: 90%;">
							<div class="modal-content">

								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal">&times;</button>
									 Title Goes Here
									<h3 class="modal-title">
										<i class="fa fa-plus"></i> &nbsp; Create Diamond Certificate
										Entry
									</h3>
								</div>
								 Modal Window Content Started For FG 
							
							</div>
						</div>
					</div> -->
				</div>
<!--############################################################ Stone GR IS Started #################################################################  -->
				<div id="stoneGRSearch">
					<div id="hideLooseStoneDaimondSearch">
						<form class="form-horizontal"
							id="daimondCerficateEntryStoneSearch">
								<!-- Row 1 Started  -->
								<div class="row">
									<div class="col-sm-2">
										<span class="required">*</span> &nbsp; <label>FG
											GR/Stone GR</label> <select id="fgGRORStoneGRStone"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
									<div class="col-sm-2">
										<span class="required">*</span> &nbsp; <label>GR No</label> <select
											id="grNoLoStone" name="grNoLoStone" class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
									<div class="col-sm-2">
										<span class="required">*</span> &nbsp; <label>GR Srl
											No</label> <input type="text" disabled id="grSlrNoLs" class="form-control">
									</div>
								</div>
								<div class="clearfix">&nbsp;</div>
								<div class="row voffset2" align="center">
									<button class="btn btn-primary btn-sm voffset" type="button"
										name="searchLS" id="searchLS">
										<i class="fa fa-search fa-lg"></i> Search
									</button>
									&nbsp;
									<button id="clearAllLS" class="btn btn-warning btn-sm voffset"
										type="button">
										<i class="fa fa-times fa-lg"></i>&nbsp; Clear
									</button>
								</div>
						</form>
						<div class="clearfix">&nbsp;</div>
						<div style="text-align: center; marging: auto; position: relative; z-index: 1">
							<div id="jqxgridLSStones" style="font-size: 13px; font-family: Verdana; float: left;"></div>
						</div>
						<div class="clearfix">&nbsp;</div>
					</div>
					

			<div id="hideLooseStoneCreateDiamondCert">
				<form method="POST" class="form-horizontal"  enctype="multipart/form-data" id="daimondCertCreateLS">
							<div class="col-md-12">
								<div class="heading-block">
									<h4>Diamond Certificate Details</h4>
									<div class="heading-block-action"></div>
								</div>
								
								<div class="row">
									<div class="col-sm-2">
										<label>Company Certificate No</label> <input type="text" disabled
											name="CompCertNoCLS" id="CompCertNoCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<label>FG/Loose Stones</label> <input type="text"
											name="fgLooseStonesCLS" id="fgLooseStonesCLS" disabled
											class="form-control">
									</div>
									<div class="col-sm-2">
										<label>Stock No</label> <input type="text" name="stockNoCLS" disabled
											id="stockNoCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<span class="required">*</span> <label>Lab Code 1</label> <select
											id="labCode1CLS" class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
									<div class="col-sm-2">
										<span class="required">*</span> <label>Lab
											Certificate No</label> <input type="text" name="labCertNoCLS"
											id="labCertNoCLS" class="form-control">
									</div>
									<div class="col-sm-2">
											<span class="required">*</span><label>Upload Certificate 1</label> 
												<div class="btn btn-primary btn-sm col-sm-6" style="padding: 5px 5px 5px 5px">
													<i class="fa fa-plus-circle fa-lg"></i> Browse 
													<input id='uploadImgC1LS'  style="width:100px;" class="fileUpload btn btn-primary input-sm" type="file" name="uploadImgC1LS"/>
												</div>
					                            <input type="hidden" id = "lab1IdLS" name = "lab1IdLS"/>
			                        </div>
								</div>

								<div class="row">
								    <div class="col-sm-2">
								         <label style="display: block;max-width: 100%;margin-bottom: 8px;font-weight: 700;">View Certificate 1</label>
										 <a target="_blank" id="viewHrefId3" type="button" style="margin:0px; padding: 7px 14px;background-color:#149078;color:white;">
										 <i class="fa fa-eye fa-sm"></i> View</a>
									</div>
									<div class="col-sm-2">
										<label>Lab Code 2</label> <select id="labCode2CLS"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
									<div class="col-sm-2">
										<label>Lab Certificate No. </label> <input type="text"
											name="labCertNo2CLS" id="labCertNo2CLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<label>Upload Certificate 2</label> 
											<div class="btn btn-primary btn-sm col-sm-6" style="padding: 5px 5px 5px 5px">
												<i class="fa fa-plus-circle fa-lg"></i> Browse 
												<input id='uploadImgStone2' style="width:100px;"  class="fileUpload btn btn-primary input-sm" type="file" name="uploadImgStone2"/>
											</div>
			                            <input type="hidden" id = "lab2IdLS" name = "lab2IdLS"/>
			                         </div>
			                         <div class="col-sm-2">
								         <label style="display: block;max-width: 100%;margin-bottom: 8px;font-weight: 700;">View Certificate 2</label>
										 <a target="_blank" id="viewHrefId4" type="button" style="margin:0px; padding: 7px 14px;background-color:#149078;color:white;">
										 <i class="fa fa-eye fa-sm"></i> View</a>
									</div>
									<div class="col-sm-2">
										<label>Remarks</label> <input type="text" name="remarksCLS"
											id="remarksCLS" class="form-control">
									</div>
								</div>

								<div class="row">
								    <div class="col-sm-2">
										<span class="required">*</span><label>Shape and	Cutting Style</label> 
										<input type="text" name="shapeCLS" disabled  id="shapeCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<span class="required">*</span><label>Carat Weight</label>
										<input type="text" name="caratWtCLS" disabled id="caratWtCLS" class="form-control" >
									</div>
									<div class="col-sm-2">
										<span class="required">*</span> <label>Color Grade</label>
										<input type="text" name="colorGradCLS" disabled  id="colorGradCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<span class="required">*</span> <label>Clarity	Grade</label>
										<input type="text" name="clarityGradCLS" disabled  id="clarityGradCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<span class="required">*</span> <label>Cut Grade</label>
										<input type="text" name="cutGradCLS" disabled  id="cutGradCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<label>Actual Color </label> <select id="actualColorCLS"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
								</div>

								<div class="row">
								    <div class="col-sm-2">
										<label>Color Origin</label> <input type="text"
											name="colorOriginCLS" id="colorOriginCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<label>Color Distribution</label> <input type="text"
											name="colorDisCLS" id="colorDisCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<label>Grade Intensity</label> <select id="gradIntensCLS"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
									<div class="col-sm-2">
										<span class="required">*</span> <label>Clarity
											Remarks </label> <input type="text" name="clarityRemarksCLS"
											id="clarityRemarksCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										 <label>Inscription(s)</label>
										<input type="text" name="inscriptionCLS" id="inscriptionCLS"
											class="form-control">
									</div>
								</div>

								<div class="heading-block">
									<h4>Color</h4>
									<div class="heading-block-action"></div>
								</div>
								<div class="row">
									<div class="col-sm-2">
										<span class="required">*</span><label> UV Fluorescence</label> <select id="flourCLS"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
								
								</div>	
								<div class="heading-block">
									<h4>Measurement (mm)</h4>
									<div class="heading-block-action"></div>
								</div>
								<div class="row">
									<div class="col-sm-2">
										<span class="required">*</span><label>Measurement
											(mm)</label> <input type="text" name="measurmentCLS"
											id="measurmentCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<span class="required">*</span><label>Diameter Min/Len in mm</label>
										<input type="text" name="diaMinCLS" id="diaMinCLS"
											class="form-control">
									</div>
									<div class="col-sm-2">
										<span class="required">*</span><label>Diameter Max/width in mm</label>
										<input type="text" name="diaMaxCLS" id="diaMaxCLS"
											class="form-control">
									</div>
									<div class="col-sm-2">
										 <label>Diameter Average in mm</label><input type="text" name="diaAvgCLS" id="diaAvgCLS"
											class="form-control">
									</div>
									<div class="col-sm-2">
										<span class="required">*</span><label>Depth in mm</label> <input type="text" name="depthCLS"
											id="depthCLS" class="form-control">
									</div>
								</div>
								<div class="row">
									
								</div>

								<div class="heading-block">
									<h4>Cut</h4>
									<div class="heading-block-action"></div>
								</div>
								<div class="row">
									<div class="col-sm-2">
										<label>Brilliance</label> <select id="brilienceCLS"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
									<div class="col-sm-2">
										<label>Scintilation</label> <select id="scitnCLS"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
									<div class="col-sm-2">
										<label>Fire</label> <select id="fireCLS" class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
								</div>

								<div class="heading-block">
									<h4>Cut Grade (Appearance)</h4>
									<div class="heading-block-action"></div>
								</div>
								<div class="row">
									<div class="col-sm-2">
										<label>Table in mm</label> <input type="text" name="tablemmCLS"
											id="tablemmCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<label>Table in %</label> <input type="text" name="tablePercCLS"
											id="tablePercCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<label>Star Facet in %</label> <input type="text"
											name="starFacetCLS" id="starFacetCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<label>Crown Angle in degree</label> <input type="text"
											name="crownAngelCLS" id="crownAngelCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<label>Crown Height in %</label> <input type="text"
											name="crownHeightCLS" id="crownHeightCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<label>Girdle Thickness</label> <select
											id="gridleThicknessCLS" class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
								</div>

								<div class="row">
									<div class="col-sm-2">
										<label>Pavilion Depth in %</label> <input type="text"
											name="pavilionCLS" id="pavilionCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<label>Pavilion Angle in degree</label> <input type="text"
											name="pavilionAngCLS" id="pavilionAngCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<label>Lower Girdle in %</label> <input type="text"
											name="lowerGridleCLS" id="lowerGridleCLS" class="form-control">
									</div>
									<div class="col-sm-2">
										<label>Culet Size</label> <select id="cultSizeCLS"
											class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
									<div class="col-sm-2">
										<span class="required">*</span><label>Polish</label> <select
											id="polishCLS" class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
									<div class="col-sm-2">
										<span class="required">*</span><label>Symmetry</label> <select
											id="symmetryCLS" class="form-control">
											<option value="" selected label="Select" />
										</select>
									</div>
								</div>
								<div class="row">
											<div class="col-sm-2">
												<label>Status</label> <input type="text" name="statusCLS"
													disabled id="statusCLS" class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Ref Doc Type</label> <input type="text"
													name="refDoctCLS" disabled id="refDoctCLS"
													class="form-control">
											</div>
											<div class="col-sm-2">
												<label>Ref Doc Date</label> <input type="text"
													name="refDateLS" disabled id="refDateLS" class="form-control">
											</div>
										</div>
									</div>
								</form>
						<div class="clearfix">&nbsp;</div>
						<div class="modal-footer  text-center">
							<button type="button" class="btn btn-primary btn-sm"
								id="saveDaimondEntryCreatedLS" name="saveDaimondEntryCreatedLS">
								<i class="fa fa-save"></i>&nbsp;Save
							</button>
							<button id="clearAllLsC" class="btn btn-warning voffset btn-sm" type="button">
								<i class="fa fa-times fa-lg"></i>&nbsp; Clear
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="resource/oe/assets/js/app/diamondCertificateEntry.js"></script>
<script src="resource/oe/assets/js/app/LooseStoneDiamondCertEntry.js"></script>