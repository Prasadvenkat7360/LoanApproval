<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<form:form method="POST" action="designSubmit"
	enctype="multipart/form-data" id="uploadForm">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">&times;</button>
		<!--  Title Goes Here -->
		<h4 class="modal-title">Upload Design for Design Id: ${design.id}</h4>
	</div>
	<div class="clearfix">&nbsp;</div>
	<div class="modal-body">
		<div class="container-fluid"  style="max-height:400px; overflow: auto;">
			<table class="table table-responsive table-bordered table-hover">
				<thead>
					<tr>
						<th>#</th>
						<th>Design</th>
						<th>Status</th>
						<th>Remarks</th>
						<th></th>
					</tr>
				</thead>
				<tbody id="designSubmitForm">
					<c:forEach items="${variations}" var="element" varStatus="status">
						<tr>
							<td>${status.count}</td>
							<td>
								<div id="ulList${status.count}">
									<c:choose>
										<c:when test="${not empty element.fileName}">
											<a  href="/uf/${element.filePath}/${element.fileName}"
												class="thumbnail" target="_blank"> <img style="max-height: 30px;"
												src='/uf/${element.filePath}/${element.fileName}'
												 style="width:140px;height:40px;"/>
											</a>
											
										</c:when>
										<c:otherwise></c:otherwise>
									</c:choose>
								</div>
							</td>
							<td>${element.designVariationStatus.status}</td>
							<td class="text-wrap">${element.remark}</td>
							<td><c:choose>
									<c:when
										test="${(element.designVariationStatus eq 'G') || (element.designVariationStatus eq 'NA') || (empty element.designVariationStatus)}">
										<div align="center" style="position: relative">
											<div class="btn-sm btn-primary" style="max-width: 80px;">
												<i class="fa fa-plus-circle fa-lg"></i> Browse <input
													id='fUpload${status.count}' class="fileUpload" multiple
													type="file" name="file_${status.count}_${element.id}"
													onchange="showImages(${status.count})" />
											</div>
										</div>
									</c:when>
								</c:choose></td>
						</tr>
					</c:forEach>

				</tbody>
			</table>

		</div>
		<div class="modal-footer  text-center">
			<button type="button" class="btn btn-primary btn-sm" id="save" name="save"
				disabled>
				<i class="fa fa-floppy-o"></i>&nbsp;Save
			</button>
			<button type="submit" class="btn btn-warning btn-sm" data-dismiss="modal"
				aria-hidden="true">
				<i class="fa fa-times"></i>&nbsp;Close
			</button>
		</div>
	</div>
	<div class="clearfix">&nbsp;</div>
</form:form>


<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>
<script type="text/javascript" src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app/design.js'></script>

<script type="text/javascript">
var checkValueExists = function(fileName){
	var imgArray = [];
	$('#designSubmitForm tr').each(function(k, v){
		var selectedImg = $("input[name=selectedImg_"+ (k+1) +"]").val()
		imgArray.push(selectedImg);
	});
	
	var flagImg = $.inArray( fileName, imgArray);
	return flagImg;
}

var files;
var oMyForm = new FormData(); 	

	var showImages = function(id) {
	var extAllowed = ["jpeg", "jpg", "gif", "tif", "tiff","png"];
	    $("#ulList"+id).empty();
	    var fp = $("#fUpload"+id);
	    var lg = fp[0].files.length; // get length
	
	    var items = fp[0].files;
	    var fragment = "";
	    if (lg > 0) {
	    	
	    	var fileName;
	    	
	        for (var i = 0; i < lg; i++) {
	            fileName = items[i].name;
	            var fileSize = items[i].size;
	            var fileType = items[i].type;
	            
	            var fileValue = fileName.split('.');
		           if($.inArray( fileValue[1].toLowerCase(), extAllowed) == -1){
		        	   $.growl.error({ message: "Please select correct image format (jpeg, jpg, gif, tiff, tif,png)", duration: 10000, title: 'Error' });
		        		  return false;
		           }
	            var flagImg = checkValueExists(fileName);
	            
	        	if(flagImg == -1){
	        		 fragment += "<li>" + fileName + "<input name='selectedImg_"+id+"' value='"+fileName+"' type='hidden'/></li>";	 	            
	        	}else{
	        		 $.growl.error({ message: fileName + " is already exists.", duration: 10000, title: 'Error' });
	        		  return false;
	        	}
	          
	        }
	        	        
	        oMyForm.append(fileName, items);
	        
	        $("#ulList"+id).append(fragment);
	        $("#save").prop("disabled", false);
	    }
	} 

	$(document).ready(function(){
		  
		
		 
		$("#save").click(function(){
			
			 $('#save').attr('disabled', true);
		     processFileUpload();
		  });
	
		  
		 function prepareLoad(event)
		  {
			 files=event.target.files;
		  }
		 
		  function processFileUpload()
		  {
		     $.ajax({
		            url : "${pageContext.request.contextPath}/designSubmit",
		            data : new FormData(document.getElementById("uploadForm")),
		            type : "post",
		            enctype: 'multipart/form-data',
		            processData: false, 
		            contentType:false,
		            success : function(result) {
		            	$('#loading').hide();
		            	$('.modal-content').html(result); 
		            	$("#jqxgrid").jqxGrid("updatebounddata");
		            },
		            error : function(result){
		            	//console.log(result);
		            	$('#loading').hide();
		                
		            }
		        });
		  }
	});
	
	

</script>
