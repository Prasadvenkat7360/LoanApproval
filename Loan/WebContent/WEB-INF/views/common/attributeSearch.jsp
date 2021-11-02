<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>


<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
		<i class="fa fa-pencil-square-o"></i> &nbsp; Attributes
	</h3>
</div>

<!-- Modal Body -->
<div class="modal-body" >
	<div class="container">
		<form class="form-horizontal" autocomplete="off" role="form"
			name="manageAttributesForm" id="manageAttributesForm" >
			<div class="modal-body">
				<div class="row">
				<div class="col-md-12">
						<c:if test="${not empty mAttributes['length|Length']}">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
								<label><span class="required">*</span> Length : </label>
							    <select name="length" id="length" alt="Length" class="form-control selecter" required> 
								    <option value="">-- Select Option --</option>   
								    <c:forEach var="length" items="${mAttributes['length|Length']}">
										<option value='${length.name}'>${length.name}</option>
									</c:forEach>     
							    </select>
							</div>
						</c:if>
						<c:if test="${not empty mAttributes['size|Size']}">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
								<label><span class="required">*</span> Size : </label>
							    <select name="size" id="size" alt="Size" class="form-control selecter" required> 
								    <option value="">-- Select Option --</option>   
								    <c:forEach var="size" items="${mAttributes['size|Size']}">
										<option value='${size.name}'>${size.name}</option>
									</c:forEach>     
							    </select>
							</div>
						</c:if>
						<c:if test="${not empty mAttributes['height|Height']}">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
								<label><span class="required">*</span> Height : </label>
							    <select name="height" id="height" alt="Height" class="form-control selecter" required> 
								    <option value="">-- Select Option --</option>   
								    <c:forEach var="height" items="${mAttributes['height|Height']}">
										<option value='${height.name}'>${height.name}</option>
									</c:forEach>     
							    </select>
							</div>	
						</c:if>	
						<c:if test="${not empty mAttributes['diameter|Diameter']}">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
								<label><span class="required">*</span> Diameter : </label>
							    <select name="diameter" id="diameter" alt="Diameter" class="form-control selecter" required> 
								    <option value="">-- Select Option --</option>   
								    <c:forEach var="diameter" items="${mAttributes['diameter|Diameter']}">
										<option value='${diameter.name}'>${diameter.name}</option>
									</c:forEach>     
							    </select>
							</div>
						</c:if>
						<c:if test="${not empty mAttributes['width|Width']}">
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
								<label><span class="required">*</span> Width : </label>
							    <select name="width" id="width" alt="Width" class="form-control selecter" required> 
								    <option value="">-- Select Option --</option>   
								    <c:forEach var="width" items="${mAttributes['width|Width']}">
										<option value='${width.name}'>${width.name}</option>
									</c:forEach>     
							    </select>
							</div>
						</c:if>		
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
							<label> Vendor Article : </label>
							<input type="text" class="form-control" alt="Vendor Article" name="vendorArticle" id="vendorArticle">
						</div>
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
							<label><span class="required"></span>Stone Combination : </label>
						    <select name="combination" id="combination" alt="Stone Combination" class="form-control selecter"> 
							    <option value="">-- Select Option --</option>   
							    <c:forEach var="combination" items="${mAttributes['combination|Combination']}">
									<option value="${combination.id}">${combination.name}</option>
								</c:forEach>     
						    </select>
						</div>	
						<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
							<label><span class="required">*</span> Metal Color : </label>
						    <select name="metalColor" id="metalColor" alt="Metal Color" class="form-control selecter" required> 
							    <option value="">-- Select Option --</option>   
							    <c:forEach var="metalColor" items="${segMetalColors}">
									<option value="${metalColor.name}">${metalColor.name}</option>
								</c:forEach>     
						    </select>
						</div>	
						<c:if test="${not empty mAttributes['hookType|Hook Type']}">	
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
								<label><span class="required">*</span> Hook Type : </label>
							    <select name="hookType" id="hookType" alt="Hook Type" class="form-control selecter" required> 
								    <option value="">-- Select Option --</option>   
								    <c:forEach var="hookType" items="${mAttributes['hookType|Hook Type']}">
										<option value="${hookType.name}">${hookType.name}</option>
									</c:forEach>     
							    </select>
							</div>
						</c:if>	
						<c:if test="${not empty mAttributes['screwType|Screw Type']}">		
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
								<label><span class="required">*</span> Screw Type : </label>
							    <select name="screwType" id="screwType" alt="Screw Type" class="form-control selecter" required> 
								    <option value="">-- Select Option --</option>   
								    <c:forEach var="screwType" items="${mAttributes['screwType|Screw Type']}">
										<option value="${screwType.name}">${screwType.name}</option>
									</c:forEach>     
							    </select>
							</div>	
						</c:if>
						<c:if test="${not empty mAttributes['loopType|Loop Type']}">	
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
								<label><span class="required">*</span> Loop Type : </label>
							    <select name="loopType" id="loopType" alt="Loop Type" class="form-control selecter" required> 
								    <option value="">-- Select Option --</option>   
								    <c:forEach var="loopType" items="${mAttributes['loopType|Loop Type']}">
										<option value="${loopType.name}">${loopType.name}</option>
									</c:forEach>     
							    </select>
							</div>	
						</c:if>	
						<c:if test="${not empty mAttributes['polishType|Polish Type']}">	
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
								<label><span class="required">*</span> Polish Type : </label>
							    <select name="polishType" id="polishType" alt="Polish Type" class="form-control selecter" required> 
							     	<option value="">-- Select Option --</option>   
								    <c:forEach var="polishType" items="${mAttributes['polishType|Polish Type']}">
										<option value="${polishType.name}">${polishType.name}</option>
									</c:forEach>     
							    </select>
							</div>
						</c:if>	
						<c:if test="${not empty mAttributes['settingType|Setting Type']}">	
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
								<label><span class="required">*</span> Setting Type : </label>
							    <select name="settingType" id="settingType" alt="Setting Type" class="form-control selecter" required> 	
							    	 <option value="">-- Select Option --</option>   								   
								    <c:forEach var="settingType" items="${mAttributes['settingType|Setting Type']}">
										<option value="${settingType.name}">${settingType.name}</option>
									</c:forEach>     
							    </select>
							</div>
						</c:if>
						<input type="hidden" name="isDueDtFlag" id="isDueDtFlag"/>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 form-field">
								<label> <span class="required">*</span> Collection Name : </label>
							    <select name="collectionName" id="collectionName" alt="Collection Name" class="form-control selecter" required> 
							    <option value="">-- Select Option --</option>   
							    <c:forEach var="collectionName" items="${collectionName}">
									<option value="${collectionName.name}">${collectionName.name}</option>
								</c:forEach>     
						    </select>
							</div>	
						
						<div id="reasonSection" class="form-field  col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<label> Reason for Delay : </label>
						    <textarea id="reason" cols="40" rows="3" alt="Reason for Delay" class="form-control"></textarea>
						</div>	
						
					</div>
				</div>
				
	</div>
	<div class="modal-footer">
	<button type="button" id="updateAttr" class="btn btn-primary">
		<i class="fa fa-check fa-lg"></i>&nbsp;Update
	</button>
	<button type="button" class="btn btn-warning" data-dismiss="modal">	<i class="fa fa-times fa-lg"></i>&nbsp; Cancel</button>	
	</div> 
</form>
</div>

	<!-- Modal Window Form End -->
</div>

<script type="text/javascript"	src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app/attributeSearch.js'></script>


