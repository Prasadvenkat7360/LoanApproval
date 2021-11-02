<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    <script type="text/javascript">
        	var allData = {"designers":[{"name":"AAA","type":"Internal"},{"name":"BBB","type":"External"},{"name":"CCC","type":"Internal"},{"name":"DDD","type":"External"},{"name":"EEE","type":"Internal"},{"name":"FFF","type":"External"},{"name":"GGG","type":"Internal"},{"name":"HHH","type":"External"},{"name":"III","type":"Internal"},{"name":"JJJ","type":"External"}],"data":[{"id":101,"orderDate":1456129656875,"customerName":"Srikanth","price":null,"designer":{"name":"AAA","type":"Internal"},"orderItems":[{"id":1,"type":"NO","status":"C","dueDate":1456129656890,"designerType":"I","designerName":"AAA"},{"id":2,"type":"CSP","status":"G","dueDate":1456129656890,"designerType":"I","designerName":"CCC"},{"id":3,"type":"CRP","status":"F","dueDate":1456129656890,"designerType":"T","designerName":"FFF"}]},{"id":102,"orderDate":1456129656885,"customerName":"Raj","price":null,"designer":{"name":"BBB","type":"External"},"orderItems":[{"id":1,"type":"NO","status":"F","dueDate":1456129656890,"designerType":"T","designerName":"DDD"},{"id":2,"type":"CRP","status":"C","dueDate":1456129656890,"designerType":"I","designerName":"GGG"},{"id":3,"type":"CSP","status":"F","dueDate":1456129656890,"designerType":"T","designerName":"JJJ"}]},{"id":103,"orderDate":1456129656885,"customerName":"Satish","price":null,"designer":{"name":"CCC","type":"Internal"},"orderItems":[]},{"id":104,"orderDate":1456129656885,"customerName":"Sudhir","price":null,"designer":{"name":"DDD","type":"External"},"orderItems":[]},{"id":105,"orderDate":1456129656885,"customerName":"Subbu","price":null,"designer":{"name":"EEE","type":"Internal"},"orderItems":[]},{"id":106,"orderDate":1456129656885,"customerName":"Ashwin","price":null,"designer":{"name":"FFF","type":"External"},"orderItems":[]}],"designerTypes":[{ "id":"External", "name":"3rd Party"} ,{"id": "Internal", "name":"In-house"}]};
        	var updates = new Object();
        	var designerTypeSource =
            {
                datatype: "array",
                datafields: [
                    { name: 'id', type: 'string' },
                    { name: 'name', type: 'string'}
                ],
                localdata: allData.designerTypes/* ,
                beforeprocessing: function(data){
    				var array = new Array();
    				for (var key in data) {
    					  if (data.hasOwnProperty(key)) {
    					    array.push({"value" : key, "label" : data[key]});
    					  }
    				}
    				return array;
    			 } */
            };
            var designerTypeDataAdapter = new $.jqx.dataAdapter(designerTypeSource, {
                autoBind: true
            });
//             orderStatusTypeDataAdapter.dataBind();
            
           // var designers = [{"name":"AAA","type":"Internal"},{"name":"BBB","type":"External"},{"name":"CCC","type":"Internal"},{"name":"DDD","type":"External"},{"name":"EEE","type":"Internal"},{"name":"FFF","type":"External"},{"name":"GGG","type":"Internal"},{"name":"HHH","type":"External"},{"name":"III","type":"Internal"},{"name":"JJJ","type":"External"}];
            
            var designersSource =
            {
                datatype: "array",
                datafields: [
                    { name: 'type', type: 'string' },
                    { name: 'name', type: 'string'}
                ],
                localdata: allData.designers/* ,
                url:'/OrderExecution/rest/jqWidgets/queryRecentOrders' */
            };
            var designersDataAdapter = new $.jqx.dataAdapter(designersSource, {
                autoBind: true
            });
        	
            var dataI = [{"name":"AAA","type":"Internal"},{"name":"CCC","type":"Internal"},{"name":"EEE","type":"Internal"},{"name":"GGG","type":"Internal"},{"name":"III","type":"Internal"}];
            var dataE = [{"name":"BBB","type":"External"},{"name":"DDD","type":"External"},{"name":"FFF","type":"External"},{"name":"HHH","type":"External"},{"name":"JJJ","type":"External"}];
            
            var dataI1 = ['AAA','CCC','EEE','GGG'];
            var dataE1 = ['BBB','DDD','FFF','HHH'];
        	var source =
                 {
                     datatype: "array",
                     datafields: [
                         { name: 'id', type: 'int' },
                         { name: 'customerName', type: 'string'}
                         ,{ name: 'orderDate', type: 'date', format: "dd-MM-yyyy" }
                         ,{ name: 'designerType', type: 'String', map: "designer.type" }
                         ,{ name: 'designerName', type: 'String', map: "designer.name" }
                         ,{ name: 'designerTypes', value: 'designerType', values: { source: designerTypeDataAdapter.records, value: 'id', name: 'name' } }
                         ,{ name: 'designerNames', value: 'designerName', values: { source: designersDataAdapter.records, value: 'name', name: 'name' } }
                     ],
                     mapchar:'.',
                     localdata: allData.data,
                     updaterow: function (rowid, newdata, commit) {
                    	    // synchronize with the server - send update command
                    	    // call commit with parameter true if the synchronization with the server is successful 
                    	    // and with parameter false if the synchronization failed.
                    	    updates[newdata.id] = newdata;
                    	    //commit(true);
                    	}
                     /* url: '/OrderExecution/rest/jqWidgets/queryRecentOrders',
                     type:'POST',
                     contentType:'application/json' */
                 };
                 var dataAdapter = new $.jqx.dataAdapter(source/* ,{
                	 formatData: function (data) {
							var obj = new Object(); obj.id = 100;
							return JSON.stringify(obj);
                     }
                 } */);
                 //dataAdapter.dataBind();
                 $("#jqxgrid").jqxGrid(
                 {
                     width: 850,
                     source: dataAdapter,
                     columnsresize: true,
                     editable: true,
                     selectionmode: 'singlerow',
                     columns: [
                         { text: 'Order Id', datafield: 'id', width: 100 },
                         { text: 'Customer Name', datafield: 'customerName', width: 150 }
                         ,{ text: 'Order Date', datafield: 'orderDate', width: 180 }
                         ,{ text: 'Designer Type',  datafield: 'designerType', displayfield: 'designerTypes',  width: 150, columntype: 'combobox', 
                       	  
                        	 cellvaluechanging: function (row, datafield, columntype, oldvalue, newvalue) {
                        		 
                        		 if (newvalue.value != oldvalue) {
                                     $("#jqxgrid").jqxGrid('setcellvalue', row, "designerNames", "Select a Designer...");
                                 };
                             },
                        	 createeditor: function (row, value, editor) {
	                       		  editor.jqxComboBox({ source: designerTypeDataAdapter, displayMember: 'name', valueMember: 'id'});
                             }
                          }
                         ,{ text: 'Designer Name',  datafield: 'designerName', displayfield: 'designerNames',  width: 150, columntype: 'combobox', 
                        	 /* createeditor: function (row, value, editor) {
                        		 //editor.jqxComboBox({ source: designersDataAdapter, displayMember: 'name', valueMember: 'name'});
                        		 
                        		 console.log("Row:" + row);
                        		 var designerType = row.designerType;
                        		 var src = designerType == "Internal" ? dataI1 : dataE1;
                        		 editor.jqxComboBox({ source: src});
                                }, */
                                
                                initeditor: function (row, cellvalue, editor, celltext, cellwidth, cellheight) {
                                	
                                    var type = $('#jqxgrid').jqxGrid('getcellvalue', row, "designerType");
                                    var designerName = editor.val();
                                    var designers = new Array();
                                    switch (type) {
                                        case "Internal":
                                        	designers = dataI1;
                                            break;
                                        case "External":
                                        	designers = dataE1;
                                            break;
                                    };
                                    editor.jqxComboBox({ source: designers });
                                    if (designerName != "Select a Designer...") {
                                        var index = designers.indexOf(designerName);
                                        editor.jqxComboBox('selectIndex', index);
                                    }
                                }
                            }
                     ]
                 });
    </script>
    <div id='jqxWidget' style="font-size: 13px; font-family: Verdana; float: left;">
        <div id="jqxgrid"></div>
    </div>
    

