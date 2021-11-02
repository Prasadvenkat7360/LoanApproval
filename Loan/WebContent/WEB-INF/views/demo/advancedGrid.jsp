<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    <script type="text/javascript">
        	
    
    var orderStatusTypeSource =
    {
        datatype: "json",
        datafields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string'}
        ],
        url: '/OrderExecution/rest/jqWidgets/getAllOrderStatuses'
    };
    var orderStatusTypeDataAdapter = new $.jqx.dataAdapter(orderStatusTypeSource);
    orderStatusTypeDataAdapter.dataBind();
    
    var orderKindTypeSource =
    {
        datatype: "json",
        datafields: [
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string'}
        ],
        url: '/OrderExecution/rest/jqWidgets/getAllOrderKinds'
    };
    var orderKindTypeDataAdapter = new $.jqx.dataAdapter(orderKindTypeSource);
    orderKindTypeDataAdapter.dataBind();
    
    
    
    
        		var orderSource =
                 {
                     datatype: "json",
                     datafields: [
                         { name: 'orderId', map:'id', type: 'int' },
                         { name: 'customerName', type: 'string'}
                         ,{ name: 'orderDate', type: 'date', format: "yyyy-MM-dd" }
                         ,{name: 'orderItems'}
                     ],
                     url: '/OrderExecution/rest/jqWidgets/queryRecentOrders',
                     type:'POST',
                     contentType:'application/json'
                 };
                 var ordersDataAdapter = new $.jqx.dataAdapter(orderSource,{
                	 formatData: function (data) {
							var obj = new Object(); obj.id = 100;
							return JSON.stringify(obj);
                     }
                 });
                 ordersDataAdapter.dataBind();
                 
                 var orders = ordersDataAdapter.records; //.records
                 var nestedGrids = new Array();
                 
              // create nested grid.
                 var initrowdetails = function (index, parentElement, gridElement, record) {
                	 orders = ordersDataAdapter.cachedrecords;
                     var id = record.orderId;
                     
                     var grid = $($(parentElement).children()[0]);
                     nestedGrids[index] = grid;
                     
                     var filtergroup = new $.jqx.filter();
                     var filter_or_operator = 1;
                     var filtervalue = id;
                     var filtercondition = 'equal';
                     var filter = filtergroup.createfilter('numericfilter', filtervalue, filtercondition);
                     // fill the orders depending on the id.
                     var ordersbyid = [];
                     for (var m = 0; m < orders.length; m++) {
                         if(filter.evaluate(orders[m]["orderId"]))
                        	 ordersbyid.push.apply(ordersbyid, orders[m]["orderItems"]);
                        	 //ordersbyid =  ordersbyid.concat(orders[m]["orderItems"]);
                         
                     }

                     var orderssource = { datafields: [
                         { name: 'id', type: 'int' },
                         { name: 'type', type: 'string' },
                         { name: 'status', type: 'string' },
                         { name: 'dueDate', type: 'date' }
                         //,{ name: 'Status', type:'string' , value: 'status', values: { source: orderStatusTypeDataAdapter.records, value: 'id', name: 'name' } }
                     ],
                         id: 'id',
                         localdata: ordersbyid
                     }
                     var nestedGridAdapter = new $.jqx.dataAdapter(orderssource);

                     if (grid != null) {
                         grid.jqxGrid({
                             source: nestedGridAdapter, width: 780, height: 200,
                             columns: [
                               { text: 'OrderItem No', datafield: 'id', width: 200 },
                               { text: 'Order Kind Type', datafield: 'type', width: 200 },
                               { text: 'Order Status', datafield: 'status', width: 150 },
                               { text: 'Order Due Date', datafield: 'dueDate', width: 150 }
//                               ,{ text: 'Order Status1', datafield: 'status', width: 150, displayfield: 'Status', columntype: 'combobox', 
//                             	  createeditor: function (row, value, editor) {
//                                       editor.jqxComboBox({ source: orderStatusTypeDataAdapter, displayMember: 'name', valueMember: 'id' });
//                                   }
//                                }
                            ]
                         });
                     }
                 }
              
//                  var initrowdetails1 = function (index, parentElement, gridElement, record) {
//                      var id = record.uid.toString();
//                      var grid = $($(parentElement).children()[0]);
//                      nestedGrids[index] = grid;
//                      var filtergroup = new $.jqx.filter();
//                      var filter_or_operator = 1;
//                      var filtervalue = id;
//                      var filtercondition = 'equal';
//                      var filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
//                      // fill the orders depending on the id.
//                      var ordersbyid = [];
//                      for (var m = 0; m < orders.length; m++) {
//                          var result = filter.evaluate(orders[m]["orderId"]);
//                          if (result)
//                              ordersbyid.push(orders[m]);
//                      }

//                      var orderssource = { datafields: [
//                          { name: 'orderId', type: 'int' },
//                          { name: 'type', type: 'string' },
//                          { name: 'status', type: 'string' },
//                          { name: 'dueDate', type: 'date' }
//                      ],
//                          id: 'OrderID',
//                          localdata: ordersbyid
//                      }
//                      var nestedGridAdapter = new $.jqx.dataAdapter(orderssource);

//                      if (grid != null) {
//                          grid.jqxGrid({
//                              source: nestedGridAdapter, width: 780, height: 200,
//                              columns: [
//                                { text: 'Ship Name', datafield: 'ShipName', width: 200 },
//                                { text: 'Ship Address', datafield: 'ShipAddress', width: 200 },
//                                { text: 'Ship City', datafield: 'ShipCity', width: 150 },
//                                { text: 'Ship Country', datafield: 'ShipCountry', width: 150 },
//                                { text: 'Shipped Date', datafield: 'ShippedDate', width: 200 }
//                             ]
//                          });
//                      }
//                  }
                 
                 $("#jqxgrid").jqxGrid(
                 {
                     width: 850,
                     source: ordersDataAdapter,
                     columnsresize: true,
                     editable: true,
                     selectionmode: 'singlerow',
                     
                     rowdetails: true,
                     rowsheight: 35,
                     initrowdetails: initrowdetails,
                     rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 220, rowdetailshidden: true },
                     ready: function () {
                         $("#jqxgrid").jqxGrid('showrowdetails', 1);
                     },
                     columns: [
                         { text: 'Order Id', datafield: 'orderId', width: 250, },
                         { text: 'Customer Name', datafield: 'customerName', width: 150 }
                         ,{ text: 'Order Date', datafield: 'orderDate', width: 180 }
                     ]
                 });
                 
    </script>
    <div id='jqxWidget' style="font-size: 13px; font-family: Verdana; float: left;">
        <div id="jqxgrid"></div>
    </div>
    
