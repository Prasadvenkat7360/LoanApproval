<%-- <!-- 
	##	Author UI : Ajay Prasad
	## 	Author JAVA : Ajay Prasad
	## 	Date Creation : 27/05/2016
 -->
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Create FG Article Master Modal Pop-up Started ##########################  -->
<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h3 class="modal-title">
		<i class="fa fa-pencil-square-o"></i> &nbsp; Edit Article
	</h3>
</div>
<!-- Modal Create FG Article Master Body -->
<div class="modal-body">
	<div class="container sentParcel-Edit">
		<form action="#" method="post" name="updateArticle" id="updateArticle">
			<!-- First Row Started -->
			<div class="row">
				<input type="hidden" id="articleId" value="${article.id}">

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Segment</label> <input
						type="text" disabled class="form-control" id="sTypes2"
						name="sTypes2" value="${article.segment}">
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Jewel Type </label> <input
						type="text" disabled class="form-control"
						placeholder="${article.jewelType}" id="jewelType2">
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Main Category</label> <input
						type="text" disabled class="form-control"
						placeholder="${article.mainCategory}" id="mainCatList2">
				</div>

				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span><label>Sub Category</label> <input
						type="text" disabled class="form-control"
						placeholder="${article.subCategory}" id="sCategory2">
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Article Code</label> <input type="text" disabled
						class="form-control" placeholder="${article.articleCode}"
						id="articleCode2">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Article Description</label> <input type="text" disabled
						class="form-control" placeholder="${article.articleDesc}"
						id="articleDesc2">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Article Flag</label> <select
						id="articleFlag2" class="form-control">
						<c:forEach var="articleFlag" items="${articleFlags}">
							<c:if test="${articleFlag.name == article.articleType}">
								<option value="${articleFlag.id}" selected="selected">
									${articleFlag.name}</option>
							</c:if>
							<c:if test="${articleFlag.name != article.articleType}">
								<option value="${articleFlag.id}">${articleFlag.name}</option>
							</c:if>
						</c:forEach>
					</select>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Order Unit</label> <select
						id="orderUnit2" class="form-control">
						<c:forEach var="orderUnit" items="${orderUnits}">
							<c:if test="${orderUnit.name == article.isPair}">
								<option value="${orderUnit.id}" selected="selected">
									${orderUnit.name}</option>
							</c:if>
							<c:if test="${orderUnit.name != article.isPair}">
								<option value="${orderUnit.id}">${orderUnit.name}</option>
							</c:if>
						</c:forEach>
					</select>

				</div>

			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> 						
					<label>MUP Category</label> <select
						id="mupCategory1" class="form-control">
						<c:forEach var="mupType" items="${mupTypes}">
							<c:if test="${mupType.description == article.mupType}">
								<option value="${mupType.id}" selected="selected">
									${mupType.description}</option>
							</c:if>
							<c:if test="${mupType.description != article.mupType}">
								<option value="${mupType.id}">${mupType.description}</option>
							</c:if>
						</c:forEach>
					</select>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Min. Wt.</label> <input type="number" class="form-control"
						placeholder="Min Weight" value="${article.fromWeight}" id="minWt"
						name="minWt1" min="0.001" max="99999999.999" />
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Max. Wt.</label> <input type="number" class="form-control"
						placeholder="Max Weight" value="${article.toWeight}" id="maxWt"
						name="maxWt" min="0.001" max="99999999.999">
				</div>
			</div>

			<div class="row">
			
			<c:if test="${article.isActive == 'No'}">
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span>	<label>Active Y/N</label>
							<input type="text" class="form-control"
								id="activeYN2" name="activeYN2"
								placeholder="${article.isActive}"  disabled="disabled">
							
					</div>
					</c:if>
				<c:if test="${article.isActive == 'Yes'}">
				
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> <label>Active Y/N</label> <select
						id="activeYN2" class="form-control">
						<c:forEach var="activeYN" items="${activeYNs}">
							<c:if test="${activeYN.name == article.isActive}">
								<option value="${activeYN.id}" selected="selected">
									${activeYN.name}</option>
							</c:if>
							<c:if test="${activeYN.name != article.isActive}">
								<option value="${activeYN.id}">${activeYN.name}</option>
							</c:if>
						</c:forEach>
					</select>
				</div>
				</c:if>	
					
			
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Shelf Life</label> <input type="number" class="form-control"
						placeholder="Shelf Life" id="shelfLife1" name="shelfLife" min="0.01" max="99999999.99"
						value="${article.shelfLife}">
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<label>Actual Shelf Life</label> <input type="number"
						class="form-control" placeholder="Actual Shelf Life"
						id="actualShelfLife1" name="actualShelfLife" min="0.01" max="99999999.99"
						value="${article.actualShelfLife}">
				</div>
				
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 form-field">
					<span class="required">*</span> 						
					<label>HSN Code</label> <select
						id="hsnCode1" class="form-control">
						<c:forEach var="hsnCode" items="${hsnCodeList}">
							<c:if test="${hsnCode.description == article.hsnMasterCode}">
								<option value="${hsnCode.id}" selected="selected">
									${hsnCode.code}</option>
							</c:if>
							<c:if test="${hsnCode.description != article.hsnMasterCode}">
								<option value="${hsnCode.id}">${hsnCode.code}</option>
							</c:if>
						</c:forEach>
					</select>
				</div>
			</div>

		</form>
		<!-- Modal Window Edit FG Article Master Form End -->
	</div>

</div>
<!-- Modal Edit FG Article Master Footer -->
<div class="modal-footer  text-center">
	<button class="btn btn-primary voffset" type="button" name="save"
		id="save">
		<i class="fa fa-fa fa-floppy-o"></i> &nbsp;Save
	</button>
	&nbsp;
	<button type="button" class="btn btn-warning" data-dismiss="modal">
		<i class="fa fa-times fa-lg"></i>&nbsp; Cancel
	</button>
</div>

<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>	
<script type="text/javascript">


 $("#minWt").keypress(function(event) {		
		
	  if ( event.which == 45) {			
	      event.preventDefault();
	   }
	});

 $("#maxWt").keypress(function(event) {		
		
	  if ( event.which == 45) {			
	      event.preventDefault();
	   }
	});
 
 $("#shelfLife1").keypress(function(event) {		
		
	  if ( event.which == 45) {			
	      event.preventDefault();
	   }
	});

$("#actualShelfLife1").keypress(function(event) {		
		
	  if ( event.which == 45) {			
	      event.preventDefault();
	   }
	});
	
$("#save").on("click",function() {
	if(parseFloat($("#maxWt").val()) < parseFloat($("#minWt").val())){
		$.growl.error({
			message  : "Max weight Should be greater than or equal to Min weight !!!",
			duration : 1000,
			title : 'Error'
		})
		 return false;	
	}
	if($("#hsnCode1").val() == " " || $("#hsnCode1").val() == null){
		$.growl.error({
			message  : "Please Enter HSN Code !!!",
			duration : 1000,
			title : 'Error'
		})
		 return false;	
	}
	else{
		postJSON('/OrderExecution/api/v1/fgArtiicleMasterLOV/update', JSON.stringify(updateArticleMasterDetails()), function(data) {					
			if(1 == data.resCode){
				$('#fgArticleMasterModal').modal('hide');
				$("#jqxgrid").jqxGrid("updatebounddata");
				$.growl.notice({ message: "Successfully updated Article with code: " + data.payload.code, duration: 10000, title: 'Success' });
			}
			else {
				$.growl.error({ message: data.mesgStr, duration: 10000 });
			}
		});
	}
}); 
</script>

 --%>