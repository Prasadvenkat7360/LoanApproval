<%@ tag dynamic-attributes="otherAttribs" language="java" pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<%@ attribute name="text" required="true" description="sets the column text." %>
<%@ attribute name="datafield" required="true" description="sets the column datafield." %>
<%@ attribute name="displayfield" description="sets the column's displayfield. The displayfield specifies the field in the data source from which the column to retrieve strings for display." %>
<%@ attribute name="sortable" description="enables or disables the sorting." %>
<%@ attribute name="filterable" description="enables or disables the filtering." %>
<%@ attribute name="filter" description="sets the column's initialization filter. A $.jqx.filter object is expected." %>
<%@ attribute name="hideable" description="enables or disables whether the column can be hidden." %>
<%@ attribute name="hidden" description="hides or shows the column." %>
<%@ attribute name="groupable" description="sets whether the user can group by this column." %>
<%@ attribute name="menu" description="sets whether the menu button is displayed when the user moves the mouse cursor over the column's header." %>
<%@ attribute name="exportable" description="determines whether the column will be exported when the Grid's export method is called." %>
<%@ attribute name="columngroup" description="determines the name of the column's parent group." %>
<%@ attribute name="enabletooltips" description="determines whether tooltips are enabled." %>
<%@ attribute name="renderer" description="sets a custom column renderer. This can be used for changing the built-in rendering of the column's header." %>
<%@ attribute name="rendered" description="callback function that is called when the column is rendered. You can use it to set additional settings to the column's header element." %>
<%@ attribute name='width' description='sets the column width.' %>

<%-- <%@ attribute name="defaultValue" required="false" description=""%> --%>
{'text' : '${text}' , 'datafield' : '${datafield}' <c:if test='${!empty displayfield}'> 	, 'displayfield' : '${displayfield}' </c:if>  <c:if test='${!empty sortable}'> 	, 'sortable' : '${sortable}' </c:if> <c:if test='${!empty filterable}'> 	, 'filterable' : '${filterable}' </c:if>
<c:if test='${!empty filter}'> 	, 'filter' : '${filter}' </c:if>
<c:if test='${!empty hideable}'> 	, 'hideable' : '${hideable}' </c:if>
<c:if test='${!empty hidden}'> 	, 'hidden' : '${hidden}' </c:if>
<c:if test='${!empty groupable}'> 	, 'groupable' : '${groupable}' </c:if>
<c:if test='${!empty menu}'> 	, 'menu' : '${menu}' </c:if>
<c:if test='${!empty exportable}'> 	, 'exportable' : '${exportable}' </c:if>
<c:if test='${!empty columngroup}'> 	, 'columngroup' : '${columngroup}' </c:if>
<c:if test='${!empty enabletooltips}'> 	, 'enabletooltips' : '${enabletooltips}' </c:if>
<c:if test='${!empty renderer}'> 	, 'renderer' : ${renderer} </c:if> 
<%-- <c:if test='${!empty rendered}'> 	, 'rendered' : '${rendered}' </c:if> --%>
<c:if test='${!empty rendered}'> 	, 'rendered' : 
	<c:choose>
		<c:when test='${fn:startsWith(fn:trim(rendered),"function")}'>  function(value){ ${renderer}(value); } </c:when>
		<c:otherwise> ${rendered} </c:otherwise>
	</c:choose>
</c:if>
<c:if test='${!empty width}'> 	, 'width' : '${width}' </c:if>

					<c:if test="${fn:length(otherAttribs) gt 0 }">
                       <c:forEach var="prop" items="${otherAttribs}">
                       ,${prop.key} : ${prop.value}
                       </c:forEach>
                     </c:if>
}