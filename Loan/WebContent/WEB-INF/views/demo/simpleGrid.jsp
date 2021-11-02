<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript"> 

//function executeBody(){
	var source =
{
 datatype: "jsonp",
 datafields: [
     { name: 'countryName', type: 'string' },
     { name: 'name', type: 'string' },
     { name: 'population', type: 'float' },
     { name: 'continentCode', type: 'string' }
 ],
 url: "http://api.geonames.org/searchJSON"
};

var dataAdapter = new $.jqx.dataAdapter(source, 
 {
     formatData: function (data) {
         $.extend(data, {
             featureClass: "P",
             style: "full",
             maxRows: 50,
             username: "jqwidgets"
         });

         return data;
     }
 }
);

$("#jqxgrid").jqxGrid(
{
 width: 850,
 source: dataAdapter,
 columnsresize: true,
 columns: [
     { text: 'Country Name', datafield: 'countryName', width: 200 },
     { text: 'City', datafield: 'name', width: 170 },
     { text: 'Population', datafield: 'population', cellsformat: 'f', width: 170 },
     { text: 'Continent Code', datafield: 'continentCode', minwidth: 110 }
 ]
});
//}
</script>
<div id="jqxgrid"></div>