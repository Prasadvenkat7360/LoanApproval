<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="jqWidgets" prefix="jq"%>



<script type="text/javascript"> 

<jq:source datatype="json" varName="source" url="http://api.geonames.org/searchJSON">
<jsp:attribute name="fields">
	<jq:fields>
		<jsp:body>
			<jq:field name="name" type="string"></jq:field>
			<jq:field name="countryName" type="string"></jq:field>
			<jq:field name="population" type="float"></jq:field>
			<jq:field name="continentCode"></jq:field>
		</jsp:body>
	</jq:fields>
</jsp:attribute>
</jq:source>

<jq:function name="requestData" params="data" action="define">
	<jsp:body>
		$.extend(data, {
	             featureClass: "P",
	             style: "full",
	             maxRows: 50,
	             username: "jqwidgets"
	         });
	
	    return data;
	</jsp:body>
</jq:function>

<jq:dataAdapter source="source" varName="dataAdapter1" formatData="requestData"/>

<jq:grid source="dataAdapter1" selector="#jqxgrid">
<jsp:attribute name="columns">
	<jq:fields>
		<jsp:body>
			<jq:column datafield="countryName" text="Country Name"  width="200"></jq:column>
			<jq:column datafield="name" text="City"></jq:column>
			<jq:column datafield="population" text="Population" cellsformat="'f'" width="170"></jq:column>
			<jq:column datafield="continentCode" text="Continent Code"></jq:column>
		</jsp:body>
	</jq:fields>
</jsp:attribute>
</jq:grid>

</script>
<div id="jqxgrid"></div>

