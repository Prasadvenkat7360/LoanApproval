<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- add the jQuery script -->
<script type="text/javascript"
	src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/scripts/jquery-2.2.0.min.js'></script>

<!-- add the jQWidgets framework -->
<script type="text/javascript"
	src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/jqwidgets/jqx-all.js'></script>

<!-- add app specific framework -->
<script type="text/javascript"
	src='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/app.js'></script>

<!-- add the jQWidgets base styles and one of the theme stylesheets -->
<link rel="stylesheet"
	href='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/jqwidgets/styles/jqx.base.css'
	type="text/css" />
<link rel="stylesheet"
	href='<c:out value="${pageContext.servletContext.contextPath}" />/resource/oe/assets/js/jqwidgets/styles/jqx.darkblue.css'
	type="text/css" />

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title><tiles:insertAttribute name="title" ignore="true" /></title>
</head>

<body>
	<table height="625" width="100%" border="1" cellpadding="2"
		cellspacing="2" align="center">
		<tr height="2%">
			<td colspan="2"><tiles:insertAttribute name="header" /></td>
		</tr>
		<tr height="5%">
			<td colspan="2"><tiles:insertAttribute name="menu" /></td>
		</tr>
		<tr height="100%" align="left">

			<td width="80%"><div id="bodySwitcher">
					<tiles:insertAttribute name="body" />
				</div></td>
			<td width="20%"><tiles:insertAttribute name="outline" /></td>

		</tr>
		<tr height="5%">
			<td colspan="2"><tiles:insertAttribute name="footer" /></td>
		</tr>
	</table>
</body>
</html>