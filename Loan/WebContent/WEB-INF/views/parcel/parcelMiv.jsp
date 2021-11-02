<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<!--  Title Goes Here -->
				<h4 class="modal-title">GIV Details <label>(Parcel ID : ${parcelId} )</label></h4>
			</div>
			<!-- Modal Add Send Parcel Body -->
			<div class="modal-body">
				<div class="container">
					<!-- Modal Window View MIV Details Form End -->
					<table class="table table-hover scroll">
						<thead>										
							<tr>
								<th>GIV No.</th>
								<th>GIV Date</th>
							</tr>
						</thead>
						
						<tbody>
						<c:forEach var="mivObj" items="${mivList}">
							<tr>
								<td>${mivObj.mivSrialNo}</td>
								<td>${mivObj.mivDate}</td>
							</tr>
							</c:forEach>
							
						</tbody>
					</table>
					<!-- Modal Window View MIV Details Form End -->
				</div>
			</div>
			<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>	
</body>
</html>