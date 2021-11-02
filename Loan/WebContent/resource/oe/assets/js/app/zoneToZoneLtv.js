var loadPermission  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
	if(typeof permission != "undefined"){
		$(".layout-main button").each(function() {
			var value = '#'+this.id;
			var value2 = '#'+this.id+'C';
			var value3 = '#'+this.id+'S';
			var val = $(value).text();
			val = val.trim();
			if( val.startsWith("search") || val.startsWith("Search")){
				if(permission.canSearch == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}  
			
			if(val.startsWith("Create") || val.startsWith("create")){
				if(permission.canAdd == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}
			
			if( val.startsWith("export") || val.startsWith("Export")){
				if(permission.canExport == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}
			
			if(val.startsWith("print") || val.startsWith("Print")){
				if(permission.canPrint == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}
			
			if(val.startsWith("delete") || val.startsWith("Delete")){
				if(permission.canDelete == false){
					$(value).prop('disabled', true);
				}else{
					$(value).prop('disabled', false);
				}
			}
		});
	}
}

//loadPermission();

 $('#SearchHeader').hide();

$('#clearAll').on("click",function(){
	$('#jqxgrid').jqxGrid('clear');
	$('#jqxgrid').hide();
	$("#addRow").prop("disabled" ,false);
	$("#saveTransit").prop("disabled" ,true);
	$('#SearchHeader').hide();
	 refreshLov();
});

$("#saveTransit").prop("disabled" ,true);

$("#refType").on('click', function(){	
	if($("#refType").val() == "Others")
	{
		$('#materialType').val("OT").attr("selected", "selected");
		$("#materialType").prop("disabled" ,true);
	}
	else
	{
		$('#materialType').val("").attr("selected", "selected");
		$("#materialType").prop("disabled" ,false);
	}		
});

var clear_Data1 = function(row)
{	
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'refType', null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'refSrloNoStAccLov', null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'refSlNo', null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'refSrloNoStAccLov', null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'stoneAccSlNoN', null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'refSlNoN', null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'stoneAccSlNo', null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'location', null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'materialType', null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'matType', null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'fromZone',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'toZone',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentId',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentDesc',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'jewelType',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatDesc',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleCode',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleDesc',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'pcs',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'grossWt',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'netWt',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'purity', null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'remarks',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'uom',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'storeid',  null);
		   $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatDesc',  null);
		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  null);
}

var clear_Data2 = function(row)
{
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'refType', null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'refSrloNoStAccLov', null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'stoneAccSlNo', null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'stoneAccSlNoN', null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'stoneAccSlNo', null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'location', null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'materialType', null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'matType', null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'fromZone',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'toZone',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentId',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentDesc',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'jewelType',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleCode',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleDesc',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'pcs',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'grossWt',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'netWt',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'remarks',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'purity',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'uom',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'storeid',  null);
	   $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatDesc',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  null);
}

var clear_Data3 = function(row)
{
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'refType', null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'location', null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'materialType', null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'matType', null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'fromZone',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'toZone',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentId',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentDesc',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'jewelType',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  null);
	  //$("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleCode',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleDesc',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'pcs',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'grossWt',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'remarks',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'netWt',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'purity',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'uom',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'storeid',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatDesc',  null);
	  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  null);
}


 var transitFromGridZoneToZone = function(){    
    	 var generaterow = function (i) {
    	      var row = {};  
    	      row["refSlNo"] = "";
    	      row["stoneAccSlNo"] = "";
    	      row["matType"] = ($("#refType").val() == "Others") ? "Others" : "";
    	      row["refType"] = ($("#refType").val() == "Others") ? "Others" : "";
    	      row["materialType"] = ($("#refType").val() == "Others") ? "Others" : "";
    	      row["jewelType"] = "";      
    	      row["pcs"] = "";
    	      row["grossWt"] = "";
    	      row["fromZone"] = $("#fzoneS").val();
    	      row["toZone"] = $("#tzoneS").val();
    	      row["storeid"] = storeOrDcId;
    	      row["netWt"] = "";
    	      row["remarks"] = "";
    	      row["uom"] = ""
    	      return row;
    	  }
    	
    	     var segmentArr = [];
    	     var jtypeArr   = [];
    	  
    	  var dropDownListSourceRefSlNo =
    	     {
    	    			datatype : 'json',
    	    			datafields : [ {
    	    				name : 'id',
    	    				type : 'int'
    	    			}, {
    	    				name : 'description',
    	    				type : 'string'
    	    			} ],

    	     };
    	  var storesArr = [{'id': 1, 'name': "mani"},{'id':'2','name': 'prasad'}]
    	  var dropDownListSourceStoneAccSl=
 	     {
 	    			datatype : 'json',
 	    			datafields : [ {
 	    				name : 'id',
 	    				type : 'int'
 	    			}, {
 	    				name : 'name',
 	    				type : 'string'
 	    			} ],
 	    			localdata : storesArr

 	     }
    	  var dropdownListAdapterRefSlNo = new $.jqx.dataAdapter(dropDownListSourceRefSlNo, { autoBind: true, async: false });
    	  var dropdownListAdapterStoneAccSl = new $.jqx.dataAdapter(dropDownListSourceStoneAccSl, { autoBind: true, async: false });
		var source =
	    {
	        datafields:
	        [ 
	            { name: 'refType', type: 'long', },
	            { name: 'refDocNo', type: 'string' },
	            { name: 'refSlNo', type: 'string'},
	            { name: 'stoneAccSlNo', type: 'long' },
	            { name: 'stoneAccSlNoid', type: 'long' },
	            { name: 'materialType', type: 'long' },
	            { name: 'jewelType', type: 'long' },
	            { name: 'matType', type: 'string' },
	            { name: 'segmentId', type: 'string' },
	            { name: 'segmentDesc', type: 'string' },
	            { name: 'pcs', type: 'long' },
	            { name: 'grossWt', type: 'long'},
	            { name: 'netWt', type: 'long' },
	            { name: 'purity', type: 'long' },
	            { name: 'subCatDes', type: 'long' },
	            { name: 'subCatCode', type: 'long' },
	            { name: 'stoneAccPcs', type: 'long' },
	            { name: 'stoneAccWt', type: 'long' }, 	    
	            {name: 'subCat1articleCode' , type: 'string'},
	            {name: 'subCat1articleDesc' , type: 'string'},
	            { name: 'uom', type: 'string' },
	            {name: 'storeid' , type: 'string'},
	            { name: 'location', type: 'string' },
	            { name: 'fromZone', type: 'long' },
	            { name: 'toZone', type: 'string' },
	            { name: 'remarks', type: 'string' },
	            { name: 'action', type: 'float' },
	            { name: 'zonid', type: 'long' },
	            { name: 'refSrloNoLov', type: 'boolean' },
	            {name: 'refSrloNoStAccLov', type: 'array'},
	            {name : 'refSlNoN', value : 'refSlNo', values : {source : dropdownListAdapterStoneAccSl.records, value : 'id', name : 'name'}},
	        ],
	        
	        addrow: function (rowid, rowdata, position, commit) {
	             commit(true);
	         },
	         deleterow: function (rowid, commit) {          
	             commit(true);
	         },
	         updaterow: function (rowid, newdata, commit) {
	             commit(true);
	         }
	    };
		
	    var dataAdapter = new $.jqx.dataAdapter(source);
		$("#jqxgrid").jqxGrid(
	            {
	            	source: dataAdapter,
	            	width: '100%',
	                height : 250, 
	                editable: true ,
	                theme: 'energyblue',
	                autorowheight :true,
	                autoheight :true,
	                columnsheight: 80,
	                columnsresize: true,
					pageable: true,
					showtoolbar: true,
	                rendertoolbar: function (toolbar) {
	                    var me = this;
	                    var container = $("<div style='margin: 5px; margin-bottom:15px;'></div>");
	                    toolbar.append(container);	                   
	                    container.append('<div style="margin-bottom:10px;"  id="addrowbutton" class="btn btn-primary btn-sm"><i class="fa fa-plus fa-md"></i></div>&nbsp;');
	                    container.append('<div style="margin-bottom:10px;"  id="deleterowbutton" class="btn btn-danger btn-sm pull-right"><i class="fa fa-trash fa-md"></i></div>');
	                    $("#addrowbutton").jqxButton();                  
	                    $("#addrowbutton").on('click', function () {
	                   
	                        var rows = $('#jqxgrid').jqxGrid('getrows');
	                        var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
	                        if(rowscount  == '0')
	                        	{
	                        	$("#addRow").prop("disabled" ,true);
	                        	$("#saveTransit").prop("disabled" ,false);
	                        	}
	                        if($("#refType").val() != ""  && $("#materialType").val() != "" )
	                        {
	                        	if(rowscount == 0){ var rowId = 1;}
	                        	else{var rowId = rowscount + 1;}
                       		}
	                       
	                        for( i=0 ; i< rowscount; i++)
                        	{
	                        	if(rows[i].materialType == "Others")
	                        	{
	                        		
	                        		if(rows[i].materialType == "" || rows[i].refType == "")
	                        		{
		                        		$.growl.error({
											message : "Please fill mandatory fields.",
											duration : 10000,
											title : 'Error'
										});
	                        			return false;
	                        		}
	                        	}
	                        	else
                        		{
	                        		if(rows[i].materialType == "" || rows[i].refType == "" || rows[i].segmentId == "")
	                        		{
		                        		$.growl.error({
											message : "Please fill mandatory fields.",
											duration : 10000,
											title : 'Error'
										});
	                        			return false;
	                        		}
                        		}
                        	}
	                        
	                        for(i=0 ; i< rows.length; i++){
	                        	if(rows.length > 1){
	                        	var filterednames = rows.filter(function(obj) {
	                        		if(obj.materialType != "Others"){
	                        	   return (obj.refDocNo === rows[i].refDocNo) && (obj.refSlNo  == rows[i].refSlNo) && (obj.materialType  == rows[i].materialType)  && (obj.stoneAccSlNo  == rows[i].stoneAccSlNo) ;
	                        		}
	                        		});
	                        	if(filterednames.length >  1)
	                        	{
	                        		$.growl.error({
										message : "Duplicate records are Exists",
										duration : 10000,
										title : 'Error'
									});
	                        		return false;
	                        	}	      
	                        }
	                        }                     
	                        var datarow = generaterow(rowId);
	                        var commit = $("#jqxgrid").jqxGrid('addrow', null, datarow);
	                    });	
	                    $("#deleterowbutton").on('click', function () {
	                        var selectedrowindex = $("#jqxgrid").jqxGrid('getselectedrowindex');
	                        var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;
	                      /*  if(rowscount  <= 0)
                        	{
                        	$("#addRow").prop("disabled" ,false);
                        	}*/
	                        if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
	                            var id = $("#jqxgrid").jqxGrid('getrowid', selectedrowindex);
	                            var commit = $("#jqxgrid").jqxGrid('deleterow', id);
	                        }
	                        
	                        console.log(rowscount);
	                    });
	                },
	                columns: [ 
	                	{ text: 'Ref. Doc. No.', datafield: 'refDocNo',width: '10%', cellsalign : 'center', align:'center',
	                		cellvaluechanging:function (row, datafield, columntype,oldvalue, newvalue) {
        		  			var arryData = []
        		  			clear_Data1(row);
        		  			var rows = $("#jqxgrid").jqxGrid('getrows');
        		  			var params = {
        		  				"referenceType": $("#refType").val(),
        		  				"materialType": $("#materialType").val(),
        		  				"id": newvalue,
        		  				"fromZoneId": $("#fzoneS").val(),
        		  				"refDocSrlNo":null,
        		  				"stoneOrAccSrlNo": null,
        		  				"reasonTransit":"false"
        		  				};
        			  postJSON('/OrderExecution/api/v1/getManualLTVDetails', JSON.stringify(params),function(data){
              				if(data.resCode == 1 ){
              					if( data.payload.refDocSrls != null ){
			        				  var refslNoArry = data.payload.refDocSrls;
			              				for(x =0; x < refslNoArry.length; x++)
				                				{
				                				var convert = {'id':refslNoArry[x], 'name':refslNoArry[x]}
				                				arryData.push(convert);
				                				}
			              				var datalist = true;
	              						$("#jqxgrid").jqxGrid("setcellvalue" , row , 'refSrloNoLov', datalist);
              					}
              					else
              						{
              						var datalist = false;
              						$("#jqxgrid").jqxGrid("setcellvalue" , row , 'refSrloNoLov', datalist);
              						var params = {
	                      		  				"referenceType": $("#refType").val(),
	                      		  				"materialType": $("#materialType").val(),
	                      		  				"id":$('#jqxgrid').jqxGrid('getcellvalue',row , "refDocNo"),
	                      		  				"fromZoneId": $("#fzoneS").val(),
	                      		  				"refDocSrlNo":null,
	                      		  				"stoneOrAccSrlNo": null,
	                      		  				"reasonTransit":"true"
	                      		  				}; 
	                						 postJSON('/OrderExecution/api/v1/getManualLTVDetails', JSON.stringify(params),function(data){
	                							 if(data.resCode == 1)
	                							 {
	                							 if(typeof  data.payload.details !=  undefined){
	                								 var recordlist = data.payload.details;
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'refType', $("#refType").val());
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'location', recordlist.location);
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'materialType', $("#materialType").val());
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'fromZone',  $("#fzoneS").val());
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'toZone',  $("#tzoneS").val());
	                		                		// $("#materialType option:selected").attr('ids')
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'matType',  $("#materialType option:selected").attr('ids'));
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentId',  recordlist.segment.segmentId);
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentDesc',  recordlist.segment.description);
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'jewelType',  recordlist.jewelType);
	                		                		  if(recordlist.articleDesOrStoneSubCat != null)
	  	 		    	                			  {
	                		                			$("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatDes',  (recordlist.articleDesOrStoneSubCat.description == null)? "" : recordlist.articleDesOrStoneSubCat.description);
  	                		                			$("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  (recordlist.articleDesOrStoneSubCat.code == null)? "" : recordlist.articleDesOrStoneSubCat.code);
	  	 		    	                			  }
	                		                		  else
	                		                			  {
	                		                	
	                		                			  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatDesc',  null);
	                		                			  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  null)
	                		                			  }
	                		                		  if(recordlist.articleDesOrStoneSubCat1 != null)
	                		                		  {
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleCode',  recordlist.articleDesOrStoneSubCat1.articleCode);
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleDesc',  recordlist.articleDesOrStoneSubCat1.articleDesc);
	                		                		  }
	                		                		  else
	                	                			  {
	                	                			  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleCode',  null);
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleDesc',  null);
	                	                			  }
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'pcs',  recordlist.jewOrStnOrAccPcs);
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'grossWt',  recordlist.grossWtOrStoneWt);
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'netWt',  recordlist.netWt);
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'purity',  recordlist.purity);
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'uom',  recordlist.uom);
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'storeid',  storeOrDcId);
	                		                		
	                		                		  }
	                							 }
	                							 else
	                								 {
	                								 $.growl.error({
	                	              						message : data.mesgStr,
	                	              						duration : 10000,
	                	              						title : 'Notice'
	                	              					});
	                								 }
	                						 });
              						}
              				}
              				else{
              					$.growl.error({
              						message : data.mesgStr,
              						duration : 10000,
              						title : 'Notice'
              					});
              				}
              				
              		});
        		  },cellbeginedit: function(row, datafield, columntype) {
        			  var refType = $('#jqxgrid').jqxGrid('getcellvalue', row, 'matType');
        			  var referenceType = $("#refType").val();
        			  if(referenceType== "Others" && refType == "Others"){
        				  return false;
        			  }else if(refType == "Others"){
        				  return false;
        			  }else{
        				  return true;
        			  }
        		  }
	                	},
	                	{ text: '', datafield: 'refSrloNoLov',width: '10%', cellsalign : 'center', align:'center',editable: true,hidden: true },//dropdown data
	                	{ text: '', datafield: 'refSrloNoStAccLov',width: '10%', cellsalign : 'center', align:'center',editable: true,hidden: true },//dropdown data
	                	{ text: '', datafield: 'fromZone',width: '10%', cellsalign : 'center', align:'center',editable: true,hidden: true },
	                	{ text: '', datafield: 'toZone',width: '10%', cellsalign : 'center', align:'center',editable: true, hidden: true},
	                	{ text: 'Ref. Doc. Sl. No.', datafield: 'refSlNo',width: '10%', cellsalign : 'center', align:'center', displayfield : 'refSlNoN',editable: true, columntype: 'dropdownlist',
	                		cellbeginedit: function(row, datafield, columntype) {
	            		        var rows = $("#jqxgrid").jqxGrid('getrows');
	            		        for(var i=0; i<rows.length; i++){
	            					if(row == rows[i].boundindex){
	            						var value = $('#jqxgrid').jqxGrid('getcellvalue', row, 'refSrloNoLov');
	            					        if (value == true){		        
	            					        	return true;
	            							}else{ 			        		
	            								return false;				        	
	            							}
	            					}}
	            			},
	                		createeditor: function (row, cellvalue, editor) {
                		  			var arryData = []
                		  			var rows = $("#jqxgrid").jqxGrid('getrows'); 
                		  			var rows = $("#jqxgrid").jqxGrid('getrows');
                		  			var params = {
                    		  				"referenceType": $("#refType").val(),
                    		  				"materialType": $("#materialType").val(),
                    		  				"id":$('#jqxgrid').jqxGrid('getcellvalue',row , "refDocNo"),
                    		  				"fromZoneId": $("#fzoneS").val(),
                    		  				"refDocSrlNo":null,
                    		  				"stoneOrAccSrlNo": null,
                    		  				"reasonTransit":"false"
                    		  				};
                			  postJSON('/OrderExecution/api/v1/getManualLTVDetails', JSON.stringify(params),function(data){
  	                				if(data.resCode == 1)
  	                				{
  	                					if(data.payload.refDocSrls == null )
  	                						{
  	                						var params = {
  	                      		  				"referenceType": $("#refType").val(),
  	                      		  				"materialType": $("#materialType").val(),
  	                      		  				"id":$('#jqxgrid').jqxGrid('getcellvalue',row , "refDocNo"),
  	                      		  				"fromZoneId": $("#fzoneS").val(),
  	                      		  				"refDocSrlNo":null,
  	                      		  				"stoneOrAccSrlNo": null,
  	                      		  				"reasonTransit":"true"
  	                      		  				}; 
  	                						
  	                						
  	                						 postJSON('/OrderExecution/api/v1/getManualLTVDetails', JSON.stringify(params),function(data){
  	                							 if(typeof  data.payload.details !=  undefined){
  	                								 console.log(data.payload.details);
  	                								 var recordlist = data.payload.details; 
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'refType', $("#refType").val());
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'location', recordlist.location);
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'materialType', $("#materialType").val());
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'fromZone',  $("#fzoneS").val());
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'toZone',  $("#tzoneS").val());
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentId',  recordlist.segment.segmentId);
	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentDesc',  recordlist.segment.description);
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'jewelType',  recordlist.jewelType);
  	                		                		 $("#jqxgrid").jqxGrid("setcellvalue" , row , 'matType',  $("#materialType option:selected").attr('ids'));
  	                		                		if(recordlist.articleDesOrStoneSubCat != null)
	  	 		    	                			  {
  	                		                			$("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat',  (recordlist.articleDesOrStoneSubCat == "null")? "" : recordlist.articleDesOrStoneSubCat.description);
	  	 		    	                			  
	  	 		    	                			  }
  	                		                		else
  	                		                			{
  	                		                			 $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat',  null)
  	                		                			}
  	                		                		  if(recordlist.articleDesOrStoneSubCat1 != null)
  	                		                		  {
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleCode',  recordlist.articleDesOrStoneSubCat1.articleCode);
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleDesc',  recordlist.articleDesOrStoneSubCat1.articleDesc);
  	                		                		  }
  	                		                		 else
	  	             	                			  {
	  	             	                			  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleCode',  null);
	  	             		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleDesc',  null);
	  	             	                			  }
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'pcs',  recordlist.jewOrStnOrAccPcs);
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'grossWt',  recordlist.grossWtOrStoneWt);
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'netWt',  recordlist.netWt);
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'purity',  recordlist.purity);
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'uom',  recordlist.uom);
  	                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'storeid',  storeOrDcId);
  	                		                		  }
  	                						 });
  	                						}
	  	                					else
	  	                					{
			                				  var refslNoArry = data.payload.refDocSrls;
			  	                				for(x =0; x < refslNoArry.length; x++)
				  	                				{
				  	                				var convert = {'id':refslNoArry[x], 'name':refslNoArry[x]}
				  	                				arryData.push(convert);
				  	                				}
			  	                				editor.jqxDropDownList({ source: arryData, displayMember: 'name', valueMember: 'id'});
			  	                				}
  	                				}
  	                				else{
  	                					$.growl.error({
  	                						message : data.mesgStr,
  	                						duration : 10000,
  	                						title : 'Notice'
  	                					});
  	                				}
  	                		});
                		  },
                		  cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue ) {
                			//  console.log(row);
                			  //clear_Data2(row);
                			  clear_Data3(row)
    	                	  if(newvalue.value != "null" )
    		                	{
    	                			var paramsGetDetails = {
    		                				"referenceType": $("#refType").val(),
                    		  				"materialType":	$("#materialType").val(),
                    		  				"id":$('#jqxgrid').jqxGrid('getcellvalue',row , "refDocNo"),
                    		  				"fromZoneId": $("#fzoneS").val(),
                    		  				"refDocSrlNo":newvalue.value,
                    		  				"stoneOrAccSrlNo": null,
                    		  				"reasonTransit":"false"
    		                		}
    	                			
    	                			postJSON('/OrderExecution/api/v1/getManualLTVDetails', JSON.stringify(paramsGetDetails),function(data){
  	    	                		var listStAccLov = data.payload.sOrASrls; 
  	    	                		  if(data.resCode == 1)
  	    	                		  {
  	    	                			  console.log(listStAccLov);
			  	    	                		  	if(listStAccLov  == null)
			  	    	                		  {
			  	    	                		  	var datalist = false;
			  	              						$("#jqxgrid").jqxGrid("setcellvalue" , row , 'refSrloNoStAccLov', datalist);
			  	    	                		  		  var params = {
			  		                    		  				"referenceType": $("#refType").val(),
			  		                    		  				"materialType": $("#materialType").val(),
			  		                    		  				"id":$('#jqxgrid').jqxGrid('getcellvalue',row , "refDocNo"),
			  		                    		  				"fromZoneId": $("#fzoneS").val(),
			  		                    		  				"refDocSrlNo":$('#jqxgrid').jqxGrid('getcellvalue',row , "refSlNo"),
			  		                    		  				"stoneOrAccSrlNo": null,
			  		                    		  				"reasonTransit":"true"
			  		                    		  				};
			  	    	                		  		
			  	    	                		  	 postJSON('/OrderExecution/api/v1/getManualLTVDetails', JSON.stringify(params),function(data){
			  	 	    	                		  var recordlist = data.payload.details; 
			  	 	    	                		  if(typeof  data.payload.details !=  undefined){
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'refType', $("#refType").val());
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'location', (recordlist.location == null)? "" :recordlist.location );
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'materialType', $("#materialType").val());
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'fromZone',  $("#fzoneS").val());
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'toZone',  $("#tzoneS").val());
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentId',  recordlist.segment.segmentId);
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'matType',  $("#materialType option:selected").attr('ids'));
		                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentDesc',  recordlist.segment.description);
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'jewelType', (recordlist.jewelType == null)? "" :recordlist.jewelType);
			  	 		    	                		  if(recordlist.articleDesOrStoneSubCat1 != null)
				  	 		 	                		  {
				  	 		 	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleCode',  recordlist.articleDesOrStoneSubCat1.articleCode);
				  	 		 	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleDesc',  recordlist.articleDesOrStoneSubCat1.articleDesc);
				  	 		 	                		  }
				  	 		    	                 	else
							                			  {
							                			  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleCode',  null);
								                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleDesc',  null);
							                			  }
			  	 		    	                		  
			  	 		    	                		  if(recordlist.articleDesOrStoneSubCat != null)
			  	 		    	                			  {
			  	 		    	                			$("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatDesc',  recordlist.articleDesOrStoneSubCat.description);
			  	 		    	                			$("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  recordlist.articleDesOrStoneSubCat.code);
			  	 		    	                			  }
		  	 		    	                		  else
		  	 		    	                			  {
		  	 		    	                			 $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatDesc',  null);
		  	 		    	                			 $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  null)
		  	 		    	                			  }
			  	 		    	                		  
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'pcs',  	(recordlist.jewOrStnOrAccPcs == null)? "" : recordlist.jewOrStnOrAccPcs);
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'grossWt',  	(recordlist.grossWtOrStoneWt == "null")? " " : recordlist.grossWtOrStoneWt);
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'netWt',  	(recordlist.netWt == null)? " " : recordlist.netWt);
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'purity',  	(recordlist.purity == null)? " " : recordlist.purity);
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'uom',  (recordlist.uom == null)? " " :recordlist.uom);
			  	 		    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'storeid', storeOrDcId);
			  	 	    	                		  	}
				  	 	    	                		 else
				  	     	                			  {
				  	     	                			  $.growl.error({
				  	 	                						message : data.mesgStr,
				  	 	                						duration : 10000,
				  	 	                						title : 'Notice'
				  	 	                					});
				  	     	                			  }
			  	    	                		  	 });
			  	    	                		  }
		  	    	                		  	else
		  	    	                		  		{
		  	    	                		  	var datalist = true;
		  	              						$("#jqxgrid").jqxGrid("setcellvalue" , row , 'refSrloNoStAccLov', datalist);
		  	    	                		  		}
  	    	                		  }
    	                		  	else
    	                		  		{
    	                		  		 $.growl.error({
	 	                						message : data.mesgStr,
	 	                						duration : 10000,
	 	                						title : 'Notice'
	 	                					});
    	                		  		}
    	                			});
    	                		  }
    	                	  
    	                	  else
    	                		  {
    	                		 
    	                		  }
    	                }
	                  },
	                  
	                  { text: 'Stone/Acc Sl.', datafield: 'stoneAccSlNo',width: '10%',  cellsalign : 'center', align:'center', displayfield : 'stoneAccSlNoN',editable: true, columntype: 'dropdownlist',
	                	  cellbeginedit: function(row, datafield, columntype) {
	                		  clear_Data3(row);
	            		        var rows = $("#jqxgrid").jqxGrid('getrows');
	            		        for(var i=0; i<rows.length; i++){
	            					if(row == rows[i].boundindex){
	            						var value = $('#jqxgrid').jqxGrid('getcellvalue', row, 'refSrloNoStAccLov');
	            					        if (value == true){		        
	            					        	return true;
	            							}else{ 			        		
	            								return false;				        	
	            							}
	            					}}
	            			},
	                	  createeditor: function (row, cellvalue, editor) {
			                		  var arryDatastnAcc = []
			                		  var rows = $("#jqxgrid").jqxGrid('getrows');
			                		  var params = {
	                    		  				"referenceType": $("#refType").val(),
	                    		  				"materialType": $("#materialType").val(),
	                    		  				"id":$('#jqxgrid').jqxGrid('getcellvalue',row , "refDocNo"),
	                    		  				"fromZoneId": $("#fzoneS").val(),
	                    		  				"refDocSrlNo":$('#jqxgrid').jqxGrid('getcellvalue',row , "refSlNo"),
	                    		  				"stoneOrAccSrlNo": null,
	                    		  				"reasonTransit":"false"
	                    		  				};
		                			  postJSON('/OrderExecution/api/v1/getManualLTVDetails', JSON.stringify(params),function(data){
		                				  if(data.payload.sOrASrls == null)
		                					  {
		                					  var params = {
		  	                      		  				"referenceType": $("#refType").val(),
		  	                      		  				"materialType": $("#materialType").val(),
		  	                      		  				"id":$('#jqxgrid').jqxGrid('getcellvalue',row , "refDocNo"),
		  	                      		  				"fromZoneId": $("#fzoneS").val(),
		  	                      		  				"refDocSrlNo": $('#jqxgrid').jqxGrid('getcellvalue',row , "refSlNo"),
		  	                      		  				"stoneOrAccSrlNo": null,
		  	                      		  				"reasonTransit":"true"
		  	                      		  				}; 
		  	                						 postJSON('/OrderExecution/api/v1/getManualLTVDetails', JSON.stringify(params),function(data){
		  	                							 if(typeof  data.payload.details !=  undefined){
		  	                								$("#jqxgrid").jqxGrid("setcellvalue" , row , 'refType', $("#refType").val());
		  	        	    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'location', (recordlist.location == "null")? "" :recordlist.location );
		  	        	    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'materialType', $("#materialType").val());
		  	        	    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'fromZone',  $("#fzoneS").val());
		  	        	    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'toZone',  $("#tzoneS").val());
		  	        	    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentId',  recordlist.segment.segmentId == "");
		  	        	    	                		 $("#jqxgrid").jqxGrid("setcellvalue" , row , 'matType',  $("#materialType option:selected").attr('ids'));
		  	        	    	                		if(recordlist.articleDesOrStoneSubCat != null)
		  	 		    	                			  {
		  	 		    	                			$("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatDesc',  (recordlist.articleDesOrStoneSubCat.description == null)? "" : recordlist.articleDesOrStoneSubCat.description);
		  	 		    	                			$("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  (recordlist.articleDesOrStoneSubCat.code == null)? "" : recordlist.articleDesOrStoneSubCat.description);
		  	 		    	                			  }
		  	        	    	                		else
	  	        	    	                			{
	  	        	    	                			$("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatDesc',  null);
	  	        	    	                			$("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  null);
	  	        	    	                			}
		                		                		  if(recordlist.articleDesOrStoneSubCat1 != null)
		                		                		  {
		                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleCode',  recordlist.articleDesOrStoneSubCat1.articleCode);
		                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleDesc',  recordlist.articleDesOrStoneSubCat1.articleDesc);
		                		                		  }
		                		                		else
		                	                			  {
		                	                			  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleCode',  null);
		                		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleDesc',  null);
		                	                			  }
		  	        	    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'jewelType', (recordlist.jewelType == "null")? "" :recordlist.jewelType);
		  	        	    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat',  (recordlist.articleDesOrStoneSubCat == "null")? "" : recordlist.articleDesOrStoneSubCat.description);
		  	        	    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'pcs',  	(recordlist.jewOrStnOrAccPcs == "null")? "" : recordlist.jewOrStnOrAccPcs);
		  	        	    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'grossWt',  	(recordlist.grossWtOrStoneWt == "null")? " " : recordlist.grossWtOrStoneWt);
		  	        	    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'netWt',  	(recordlist.netWt == "null")? " " : recordlist.netWt);
		  	        	    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'purity',  	(recordlist.purity == "null")? " " : recordlist.purity);
		  	        	    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'uom',  (recordlist.uom == "null")? " " :recordlist.uom);
		  	        	    	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'storeid',  storeOrDcId);
		  	                		                		  }
		  	                							 else
		  	                								 {
		  	                								$.growl.error({
		  	        	                						message : data.mesgStr,
		  	        	                						duration : 10000,
		  	        	                						title : 'Notice'
		  	        	                					});
		  	                								 }
		  	                						 });
		                					  }
		                				  else
		                					  {
		                					  var  arryDataStnSl =  data.payload.sOrASrls;
			  	                				for(z=0; z < arryDataStnSl.length; z++)
				  	                				{
			  	                					var convert = {'id':arryDataStnSl[z], 'name':arryDataStnSl[z]}
			  	                					arryDatastnAcc.push(convert);
				  	                				}
			  	                				editor.jqxDropDownList({ source: arryDatastnAcc, displayMember: 'name', valueMember: 'id'});
		                					  }
				                		/*		 
		                				  if(data.resCode == '3')
		                					  {
		                					  $.growl.error({
		            							   message : data.mesgStr,
		            							   duration : 10000,
		            							}); 	
		                					  }*/
		  	                		});
	                		 
		                		  },
	                  cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue ) {
	                	 // clear_Data3(row);
	                	  if(newvalue.value == "name")
		                		  {
		                	  	var paramsGetDetails = {
		                				"referenceType": $("#refType").val(),
                		  				"materialType":	$("#materialType").val(),
                		  				"id":$('#jqxgrid').jqxGrid('getcellvalue',row , "refDocNo"),
                		  				"fromZoneId": $("#fzoneS").val(),
                		  				"refDocSrlNo":$('#jqxgrid').jqxGrid('getcellvalue',row , "refSlNo"),
                		  				"stoneOrAccSrlNo": null,
                		  				"reasonTransit":"true"
		                		}
	                		  }
	                	  else
	                		  {
	                			var paramsGetDetails = {
		                				"referenceType": $("#refType").val(),
                		  				"materialType":	$("#materialType").val(),
                		  				"id":$('#jqxgrid').jqxGrid('getcellvalue',row , "refDocNo"),
                		  				"fromZoneId": $("#fzoneS").val(),
                		  				"refDocSrlNo":$('#jqxgrid').jqxGrid('getcellvalue',row , "refSlNo"),
                		  				"stoneOrAccSrlNo": newvalue.value,
                		  				"reasonTransit":"true"
		                				
		                		}
	                		  }
	                	  
	                	  
	                	  	postJSON('/OrderExecution/api/v1/getManualLTVDetails', JSON.stringify(paramsGetDetails),function(data){
	                		  var recordlist = data.payload.details; 
	                		  if(typeof  data.payload.details !=  undefined){
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'refType', $("#refType").val());
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'location', recordlist.location);
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'materialType', $("#materialType").val());
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'fromZone',  $("#fzoneS").val());
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'toZone',  $("#tzoneS").val());
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentId',  recordlist.segment.segmentId);
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'segmentDesc',  recordlist.segment.description);
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'matType',  $("#materialType option:selected").attr('ids'));
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'jewelType',  recordlist.jewelType);
	                		  if(recordlist.articleDesOrStoneSubCat != null)
	                			  {
	                			$("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatDesc',  (recordlist.articleDesOrStoneSubCat.description == null)? "" : recordlist.articleDesOrStoneSubCat.description);
	                			$("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  (recordlist.articleDesOrStoneSubCat.code == null)? "" : recordlist.articleDesOrStoneSubCat.code);
	                			  }
	                		  else
	                			  {
	                			  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatDesc',  null);
		                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCatCode',  null);
	                			  }
	                	
	                		  if(recordlist.articleDesOrStoneSubCat1 != null)
	                		  {
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleCode',  recordlist.articleDesOrStoneSubCat1.articleCode);
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleDesc',  recordlist.articleDesOrStoneSubCat1.articleDesc);
	                		  }
	                		  else
                			  {
	                			  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleCode',  null);
	                			  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'subCat1articleDesc',  null);
                			  }
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'pcs',  recordlist.jewOrStnOrAccPcs);
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'grossWt',  recordlist.grossWtOrStoneWt);
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'netWt',  recordlist.netWt);
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'purity',  recordlist.purity);
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'uom',  recordlist.uom);
	                		  $("#jqxgrid").jqxGrid("setcellvalue" , row , 'storeid',  storeOrDcId);
	                		
	                		  }
	                	});
                	     }
	                  },
	                  { text: '', datafield: 'storeid', width: '10%',  cellsalign : 'center', align:'center',editable: false,hidden: true},
	                  { text: '', datafield: 'subCatCode',width: '10%', cellsalign : 'center', align:'center',editable: true,hidden: true },
	                  //{ text: '', datafield: 'subCatDesc',width: '10%', cellsalign : 'center', align:'center',editable: true,hidden: true },//dropdown data
	                  { text: '', datafield: 'subCat1articleCode',width: '10%', cellsalign : 'center', align:'center',editable: true,hidden: true },//dropdown data
	                  { text: '', datafield: 'segmentId',width: '10%', cellsalign : 'center', align:'center',editable: true,hidden: true },//dropdown data
	                  { text: 'Ref Type', datafield: 'refType', width: '10%',  cellsalign : 'center', align:'center',editable: false,},
	                  { text: 'Material Type', datafield: 'matType', width: '10%',  cellsalign : 'center', align:'center',editable: false},
	                  { text: '', datafield: 'materialType', width: '10%',  cellsalign : 'center', align:'center',editable: false, hidden: true},
	                  { text: 'Segment', datafield: 'segmentDesc', width: '10%',  cellsalign : 'center', align:'center',editable: false},
	                  { text: 'Jewel Type', datafield: 'jewelType', width: '10%',  cellsalign : 'center', align:'center',editable: false},
	                  { text: 'Acc/Stone SubCat.', datafield: 'subCatDesc', width: '10%',  cellsalign : 'center', align:'center',editable: false},
	                  { text: 'Article Desc.', datafield: 'subCat1articleDesc', width: '10%',  cellsalign : 'left', align:'center',editable: false},
	                  { text: 'Jewel/Stone/Acc. Pcs', datafield: 'pcs', width: '10%',  cellsalign : 'center', align:'center',editable: false},
	                  { text: 'Gross Wt.', datafield: 'grossWt',width: '10%', cellsalign : 'right', align:'center',editable: false},
	                  { text: 'Net Wt.', datafield: 'netWt', width: '10%', cellsalign : 'right', align:'center',editable: false},
	                  { text: 'Purity', datafield: 'purity',width: '10%', cellsalign : 'right', align:'center',editable: false},
	                  { text: 'Location', datafield: 'location', width: '10%',  cellsalign : 'left', align:'center',editable: false},
	                  { text: 'Remarks', datafield: 'remarks',width: '10%', cellsalign : 'left', align:'center',editable: true},
	                  { text: 'UQC', datafield: 'uom',width: '10%', cellsalign : 'center', align:'center',editable: false}
	                ]
	            }); 
           }
 
	 var refreshLov = function()
	 {
		 $.getJSON('/OrderExecution/api/v1/onloadManualLTVDetails', function(data) {
		 $("#storeOrDc").val(data.payload.storeDCName);
		 var d = new Date();
		 var month = d.getMonth()+1;
		 var day = d.getDate();
		 var output =  +
		     ((''+day).length<2 ? '0' : '') + day + '/' +
		     ((''+month).length<2 ? '0' : '') + month + '/' +
		     d.getFullYear()  ;
			$("#currentDate").val(output);
		 });
		 
		 
	 };
	 refreshLov();
	 $("#saveTransit").on('click',function(){
		 var newData =[];
	    var records = $('#jqxgrid').jqxGrid('getrows');
	   // console.log(records);
	     for(i=0 ; i< records.length; i++){
         	if(records.length > 1){
         		
        		var filterednames = records.filter(function(obj) {
            		if(obj.materialType != "Others"){
            	   return (obj.refDocNo === records[i].refDocNo) && (obj.refSlNo  == records[i].refSlNo) && (obj.materialType  == records[i].materialType)  && (obj.stoneAccSlNo  == records[i].stoneAccSlNo) ;
            		}
            		});
        		console.log(filterednames);
        		if(filterednames.length > 1 )
        			{
        			$.growl.error({
        				message : "Duplicate Records Exists",
        				duration : 10000,
        				title : 'Error'
        			});
        			return false;
        			}
         	}
	     }
	 	//var records =  $('#jqxgrid').jqxGrid('getrows');
		for(i= 0 ; i< records.length; i++)
			{
			console.log(records);
			if(records[i].materialType != "" &&  records[i].refType != ""){
			if(records[i].subCatCode == null  && records[i].subCat1articleCode == null &&  records[i].materialType != "Others"){
				newData.push ({
					"refType":records[i].refType,
					 "materialType": records[i].materialType ,
				    "refDocNo": records[i].refDocNo,
				    "refDocSrlNo":records[i].refSlNo,
				    "stoneOrAccSrlNo": (records[i].materialType == "F" || records[i].materialType ==  "R") ? null : records[i].stoneAccSlNo,
				    "fromZoneId": records[i].fromZone,
				    "toZone": records[i].toZone,
				    "location": records[i].location,
				    "segment":{
				    "segmentId": records[i].segmentId,
				    "description":records[i].segmentDesc,
				    "code": null,
				    },
				    "jewelType": records[i].jewelType,
				    "articleDesOrStoneSubCat":null,
				   "articleDesOrStoneSubCat1":null,
				    "jewOrStnOrAccPcs": records[i].pcs,
				    "grossWtOrStoneWt": records[i].grossWt,
				    "netWt": records[i].grossWt,
				    "purity": records[i].purity,
				    "storeId": records[i].storeid,
				    "reason": records[i].remarks,
				    "sentThrough": $("#sentThrough").val(),
				    "uom":  records[i].uom
				});
				}
			if(records[i].subCatCode == null  && records[i].subCat1articleCode != null &&  records[i].materialType != "Others"){
			newData.push ({
				"refType":records[i].refType,
				 "materialType": records[i].materialType ,
			    "refDocNo": records[i].refDocNo,
			    "refDocSrlNo":records[i].refSlNo,
			    "stoneOrAccSrlNo": (records[i].materialType == "F" || records[i].materialType ==  "R") ? null : records[i].stoneAccSlNo,
			    "fromZoneId": records[i].fromZone,
			    "toZone": records[i].toZone,
			    "location": records[i].location,
			    "segment":{
			    "segmentId": records[i].segmentId,
			    "description":records[i].segmentDesc,
			    "code": null,
			    },
			    "jewelType": records[i].jewelType,
			    
			    "articleDesOrStoneSubCat":null,
			   "articleDesOrStoneSubCat1":{
				   "articleCode":records[i].subCat1articleCode,
				   "articleDesc":records[i].subCat1articleDesc,
			   },
			    "jewOrStnOrAccPcs": records[i].pcs,
			    "grossWtOrStoneWt": records[i].grossWt,
			    "netWt": records[i].grossWt,
			    "purity": records[i].purity,
			    "storeId": records[i].storeid,
			    "reason": records[i].remarks,
			    "sentThrough": $("#sentThrough").val(),
			    "uom":  records[i].uom
			});
			}
			if(records[i].subCat1articleCode == null  &&  records[i].subCatCode != null  &&  records[i].materialType != "Others")
				{
				newData.push ({
					"refType":records[i].refType,
					 "materialType": records[i].materialType ,
				    "refDocNo": records[i].refDocNo,
				    "refDocSrlNo":records[i].refSlNo,
				    "stoneOrAccSrlNo":(records[i].materialType == "F" || records[i].materialType ==  "R") ? null : records[i].stoneAccSlNo,
				    "fromZoneId": records[i].fromZone,
				    "toZone": records[i].toZone,
				    "location": records[i].location,
				    "segment":{
				    "segmentId": records[i].segmentId,
				    "description":records[i].segmentDesc,
				    "code": null,
				    },
				    "jewelType": records[i].jewelType,
				    
				    "articleDesOrStoneSubCat":
				    {	
				    	"id": null,
				    	"description": records[i].subCatDesc,
				        "code":records[i].subCatCode,
				    	
				    },
				   "articleDesOrStoneSubCat1": null,
				    "jewOrStnOrAccPcs": records[i].pcs,
				    "grossWtOrStoneWt": records[i].grossWt,
				    "netWt": records[i].grossWt,
				    "purity": records[i].purity,
				    "storeId": records[i].storeid,
				    "reason": records[i].remarks,
				    "sentThrough": $("#sentThrough").val(),
				    "uom":  records[i].uom
				});
				}
				if(records[i].segmentId == null && records[i].materialType != "Others"){
					newData.push ({
						"refType":records[i].refType,
						 "materialType": records[i].materialType ,
					    "refDocNo": records[i].refDocNo,
					    "refDocSrlNo":records[i].refSlNo,
					    "stoneOrAccSrlNo": (records[i].materialType == "F" || records[i].materialType ==  "R") ? null : records[i].stoneAccSlNo,
					    "fromZoneId": records[i].fromZone,
					    "toZone": records[i].toZone,
					    "location": records[i].location,
					    "segment": null,
					    "jewelType": records[i].jewelType,
					    "articleDesOrStoneSubCat":null,
					   "articleDesOrStoneSubCat1": null,
					    "jewOrStnOrAccPcs": records[i].pcs,
					    "grossWtOrStoneWt": records[i].grossWt,
					    "netWt": records[i].grossWt,
					    "purity": records[i].purity,
					    "storeId":records[i].storeid,
					    "reason": records[i].remarks,
					    "sentThrough":$("#sentThrough").val(),
					    "uom": records[i].uom
					});
				}
				if(records[i].materialType == "Others" &&  records[i].refType == "Others"){
					newData.push ({
						"refType":records[i].refType,
						"materialType": records[i].materialType,
					    "refDocNo": null,
					    "refDocSrlNo":"0",
					    "stoneOrAccSrlNo":"0",
					    "fromZoneId": records[i].fromZone,
					    "toZone": records[i].toZone,
					    "location": null,
					    "segment": null,
					    "jewelType": null,
					    "articleDesOrStoneSubCat":null,
					   "articleDesOrStoneSubCat1": null,
					    "jewOrStnOrAccPcs": null,
					    "grossWtOrStoneWt": null,
					    "netWt": null,
					    "purity": null,
					    "storeId":records[i].storeid,
					    "reason": records[i].remarks ,
					    "sentThrough":$("#sentThrough").val(),
					    "uom": null
					});
				}
			}
			else
				{
				$.growl.error({
						message : "Fill the Mandatory fields",
						duration : 10000,
						title : 'error'
					});
					return false;
				
				}
			}
		console.log(newData);
			postJSON('/OrderExecution/api/v1/createLTVDetailsManual', JSON.stringify(newData),function(data){
			if(data.resCode == 1)
				{
				window.location.href="javascript:showContentPage('ltvManualZoneToZone', 'bodySwitcher')";
				$.growl.notice({
					message : data.mesgStr,
					duration : 10000,
					title : 'success'
				});
			transitFromGridZoneToZone(); 
			$('#jqxgrid').show();
			$('#SearchHeader').show();
				}
			else
				{
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'error'
				});
				}
			});
	 });
	 var storeOrDcId = [];
 var toZoneArry = [];
 $.getJSON('/OrderExecution/api/v1/onloadManualLTVDetails', function(data) {
	 	storeOrDcId	 = data.payload.storeOrDcId;
		 toZoneArry = data.payload.toZones;
		 $('#refType').empty().append('<option value="" selected>--Select--</option>');
		$.each(data.payload.referenceTypes, function(key, val) {
			$('#refType').append('<option value="' + val + '" >' + val	+ '</option>');
		});
		data.payload.materialtypes.push({id:'OT',name:"Other"});
		 $('#materialType').empty().append(
			'<option value="" selected>--Select--</option>');
		$.each(data.payload.materialtypes, function(key, val) {
			$('#materialType').append(
					'<option value="' + val.id + '"  ids="'+ val.name +'">' + val.name
							+ '</option>');
		});
	
		 $('#fzoneS').empty().append(
			'<option value="" selected>--Select--</option>');
		$.each(data.payload.fromZone, function(key, val) {
			$('#fzoneS').append(
					'<option value="' + val.id + '"  ids="'+ val.code +'">' + val.description
							+ '</option>');
		});
		
		 $('#tzoneS').empty().append(
			'<option value="" selected>--Select--</option>');
		$.each(data.payload.toZones, function(key, val) {
			$('#tzoneS').append(
					'<option value="' + val.code + '">' + val.description
							+ '</option>');
		});
 });
 	//from Zone 
	 $('#fzoneS').on('change',function(){
		 var valuFzone = $("#fzoneS").find('option:selected').attr('ids');
		 var dd = toZoneArry.slice(); 
		for(i = 0 ; i<= dd.length; i++ )
		{
			if(  dd[i] == valuFzone)
				{
			var next = dd.splice(i, 1);
				break;
				}
		}
		 $('#tzoneS').empty().append(
			'<option value="" selected>--Select--</option>');
		$.each(dd, function(key, val) {
			$('#tzoneS').append(
					'<option value="' + val.code + '">' + val.description
							+ '</option>');
		});
	 });

 
 $("#zoneToZoneLtv").validate(
		 {
		 	errorElement : 'label',
		 	errorClass : 'help-inline',
		 	focusInvalid : false,
		 	ignore : "",
		 	rules: {
	            "fzoneS": { required: true },
	            "tzoneS": { required: true},
	            "refType": { required: true },
	            "materialType": { required: true }
	        },
		    submitHandler : function(form) {						
		    	transitFromGridZoneToZone(); 
				$('#jqxgrid').show();
				$('#SearchHeader').show();
		   }
		 });
 
 /*$('#addRow').on("click",function(){
		transitFromGridZoneToZone(); 
		$('#jqxgrid').show();
		$('#SearchHeader').show();
	 });
*/