<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div>
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">&times;</button>
	</div>
	<div class="modal-body" align="center">
		<a href='/uf/${grHeader.rateFilePath}/${grHeader.rateFileName}' target="_blank">
		<img src='/uf/${grHeader.rateFilePath}/${grHeader.rateFileName}' height=50% width =70%/></a>
	</div>
</div>

<script type="text/javascript" src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app/grProcess.js'></script>
