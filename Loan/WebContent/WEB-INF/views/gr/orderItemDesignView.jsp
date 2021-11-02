<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<div>
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">&times;</button>
		<br/>
	</div>
	<div class="modal-body" align="center">
		<a href='/uf/${design.approvedDesignVariation.fullFilePath}' target="_blank">
		<img src='/uf/${design.approvedDesignVariation.fullFilePath}' height=60% width =60%/></a>
	</div>
</div>

<script type="text/javascript" src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app/grfgcreate.js'></script>
