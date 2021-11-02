<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!-- <h2> Menu </h2> -->
<div id='menu'>
        <script type="text/javascript">
            function createMenu() {
                var data = [
					{
					    "id": "1",
					    "text": "Home",
					    "parentid": "-1",
					    "subMenuWidth": '100px',
					    "url" : "http://www.google.com"
					},
					{
					    "id": "11",
					    "text": "About us",
					    "parentid": "1",
					    "subMenuWidth": '100px',
					    "url" : "http://www.google.com"
					},
					
					{
					    "id": "2",
					    "text": "Grids",
					    "parentid": "-1",
					    "subMenuWidth": '150px',
					    "url" : "http://www.google.com"
					},
					{
					    "id": "21",
					    "text": "Simple Grid",
					    "parentid": "2",
					    "subMenuWidth": '100px',
					    "url" : "http://www.google.com"
					},
					{
					    "id": "22",
					    "text": "Complex Grid",
					    "parentid": "2",
					    "subMenuWidth": '100px',
					    "url" : "http://www.google.com"
					},
					{
					    "id": "23",
					    "text": "Simple Grid Using Tags",
					    "parentid": "2",
					    "subMenuWidth": '100px',
					    "url" : "http://www.google.com"
					},
					{
					    "id": "3",
					    "text": "Advanced Grids",
					    "parentid": "-1",
					    "subMenuWidth": '150px',
					    "url" : "http://www.google.com"
					},
					{
					    "id": "31",
					    "text": "Nested Grid",
					    "parentid": "3",
					    "subMenuWidth": '100px',
					    "url" : "http://www.google.com"
					},
					{
					    "id": "32",
					    "text": "Remote Paging Grid",
					    "parentid": "3",
					    "subMenuWidth": '100px',
					    "url" : "http://www.google.com"
					},
					{
					    "id": "4",
					    "text": "Custom Widgets",
					    "parentid": "-1",
					    "subMenuWidth": '150px',
					    "url" : "http://www.google.com"
					},
					{
					    "id": "41",
					    "text": "Custom ComboBox",
					    "parentid": "4",
					    "subMenuWidth": '100px',
					    "url" : "http://www.google.com"
					}]

                // prepare the data
                var source =
                {
                    datatype: "json",
                    datafields: [
                        { name: 'id' },
                        { name: 'parentid' },
                        { name: 'text' },
                        { name: 'subMenuWidth' },
                        { name: 'url' }
                    ],
                    id: 'id',
                    localdata: data
                };

                // create data adapter.
                var dataAdapter = new $.jqx.dataAdapter(source);
                // perform Data Binding.
                dataAdapter.dataBind();
                // get the menu items. The first parameter is the item's id. The second parameter is the parent item's id. The 'items' parameter represents 
                // the sub items collection name. Each jqxTree item has a 'label' property, but in the JSON data, we have a 'text' field. The last parameter 
                // specifies the mapping between the 'text' and 'label' fields.  
                var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label'}]);
                $('#jqxmenu').jqxMenu({ source: records, height: 30,  width: '80%' });
                $("#jqxmenu").on('itemclick', function (event) {
//                 	$("#eventLog").text("Id: " + event.args.id + ", Text: " + $(event.args).text());
//                     $("#eventLog").text("Id: " + event.args.id + ", Text: " + $(event.args).text() + ", URL: " + $(event.args).url());
                    //$.ajax.load(event.args.url);
                    
                    if(event.args.id == 11){
                    	loadPage(event,"aboutus");
                    }else if(event.args.id == 21){
                    	loadPage(event,"simpleGrid");
                    }else if(event.args.id == 22){
                    	loadPage(event,"complexGrid");
                    }else if(event.args.id == 23){
                    	loadPage(event,"simpleGridUsingTags");
                    }else if(event.args.id == 31){
                    	loadPage(event,"nestedGrid");
                    }else if(event.args.id == 32){
                    	loadPage(event,"remotePagingGrid");
                    }else if(event.args.id == 41){
                    	loadPage(event,"designGrid");
                    }
                });
            }
            
        </script>
        <div id='jqxmenu'></div>
    </div>
