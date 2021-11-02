<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal">&times;</button>
	<!--  Title Goes Here -->
	<h4 class="modal-title text-center">Upload Design for Design Id: ${desingId}</h4>
</div>
<div class="modal-body">
	<div class="container-fluid saveMessage text-center">
		<c:forEach items="${message}" var="element" varStatus="status">
             ${element}<br>
         </c:forEach>
	</div>

</div>
<div class="modal-footer  text-center">
	<button type="button" class="btn btn-warning btn-sm" data-dismiss="modal"	aria-hidden="true"><i class="fa fa-times"></i>Close</button>
</div>

