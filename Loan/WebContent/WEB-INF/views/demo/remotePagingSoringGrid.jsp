<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    <script type="text/javascript">
        		var source =
                 {
                     datatype: "json",
                     datafields: [
                         	{name: 'id'  , type: 'int'},
			                {name:'orderDate' , type: 'date'},
			                {name:'orderStatus' , type: 'string'},
			                {name:'orderSubStatus' , type: 'string'},
			                {name:'advance' , type: 'string'},
			               
			                {name:'intimationMode' , type: 'string'},
			                {name:'dueDate' , type: 'date'},
			                //{name:'customer' , type: 'string'},
		                    {name:'customerId' , type: 'int', map:'customer.id'},
		                    {name:'customer.firstName' , type: 'string', map:'customer.firstName'},
		                    {name:'middleName' , type: 'string', map:'customer.middleName'},
		                    {name:'lastName' , type: 'string', map:'customer.lastName'},
		                    {name:'email' , type: 'string', map:'customer.email'},
		                    {name:'loyaltyCard' , type: 'string', map:'customer.loyaltyCard'}
		                    ,{name:'intimationReqd' , type: 'string'}
                         
                         
                     ],
                     url: '/Sales/api/v1/orders',
                     type:'POST',
                     contentType:'application/json',
                     mapchar:'.',
                     //root:'payload.pendingOrderList',
                     filter: function() {
                    // update the grid and send a request to the server.
	                    $("#jqxgrid").jqxGrid('updatebounddata', 'filter');
	                },
	                sort: function() {
	                    // update the grid and send a request to the server.
	                    $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
	                },
                     beforeprocessing: function(data){
                    	 //console.log(data);
                    	 
      					source.totalrecords = data.payload.pendingOrderSize;
      					return data.payload.pendingOrderList;
      				 }
                 };
                 var dataAdapter = new $.jqx.dataAdapter(source, {
                	 
                	 formatData: function (data) {
							var obj = new Object();
							obj.offset = data.pagenum ? data.pagenum : 0 ;
							obj.maxResults = data.pagesize ? data.pagesize : 10;
							if(data.sortdatafield){ 
								obj.sortingFields = new Object(); obj.sortingFields[data.sortdatafield] = data.sortorder == 'asc'; 
							}
							return JSON.stringify(obj);
                     },
                     loadError: function(xhr, status, error) {
                         alert("Error while retreiving the data");
                     }
                 } );
                 $("#jqxgrid").jqxGrid(
                 {
                     width: "1000",
                     scrollmode:'logical',
                     scrollbarsize: 17,
                     source: dataAdapter,
                     columnsresize: true,
                     editable: true,
                     selectionmode: 'singlerow',
                     //filterable: true,
                     sortable: true,
     				pageable: true,
    				virtualmode: true,
    				rendergridrows: function()
    				{
    					  return dataAdapter.records;     
    				},
                     columns: [
                         	{datafield:'id'  , text: 'Order Id',sortable:true},
			                {datafield:'orderDate' , text: 'Order Date', cellsformat: 'yyyy-MM-dd',sortable:false},
			                {datafield:'orderStatus' , text: 'Order Status',sortable:false},
			                {datafield:'orderSubStatus' , text: 'OrderSubStatus',sortable:false},
			                //{datafield:'advance' , text: 'Advance',sortable:false},
// 			                {datafield:'intimationReqd' , text: 'Intimation Reqd',sortable:false},
// 			                {datafield:'intimationMode' , text: 'Intimation Mode',sortable:false},
			                {datafield:'dueDate' , text: 'Due Date', cellsformat: 'yyyy-MM-dd',sortable:false},
		                    {datafield:'customerId' , text: 'Customer ID',sortable:false},
		                    {datafield:'customer.firstName' , text: 'First Name'},
// 		                    {datafield:'middlename' , text: 'Middle Name',sortable:false},
		                    {datafield:'lastName' , text: 'Last Name',sortable:false},
// 		                    {datafield:'email' , text: 'string',sortable:false},
		                    {datafield:'loyaltyCard' , text: 'Loyality Card',sortable:false}
                     ]
                 });
                 
    </script>
    <div id='jqxWidget' style="font-size: 13px; font-family: Verdana; float: left;">
        <div id="jqxgrid"></div>
    </div>
    
