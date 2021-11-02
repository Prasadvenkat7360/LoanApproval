<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    <script type="text/javascript">
        	
        		var source =
                 {
                     datatype: "json",
                     datafields: [
                         { name: 'id', type: 'int' },
                         { name: 'customerName', type: 'string'}
                         ,{ name: 'orderDate', type: 'date', format: "dd-MM-yyyy" }
                     ],
                     url: '/OrderExecution/rest/jqWidgets/queryRecentOrders',
                     type:'POST',
                     contentType:'application/json'
                 };
                 var dataAdapter = new $.jqx.dataAdapter(source,{
                	 formatData: function (data) {
							var obj = new Object(); obj.id = 100;
							return JSON.stringify(obj);
                     }
                 });
                 //dataAdapter.dataBind();
                 $("#jqxgrid").jqxGrid(
                 {
                     width: 850,
                     source: dataAdapter,
                     columnsresize: true,
                     editable: true,
                     selectionmode: 'singlerow',
                     columns: [
                         { text: 'Order Id', datafield: 'id', width: 250 },
                         { text: 'Customer Name', datafield: 'customerName', width: 150 }
                         ,{ text: 'Order Date', datafield: 'orderDate', width: 180 }
                     ]
                 });
    </script>
    <div id='jqxWidget' style="font-size: 13px; font-family: Verdana; float: left;">
        <div id="jqxgrid"></div>
    </div>
    
