/**
 * AUTHOR : DIPANKAR NAHA
 * DATE : 10-05-2017
 * DESC : GR TALLY
 */

var loadComputeTally = function(mrvNo, mrvSlNo){
	var fieldFilter = {"pagesize":0,"fieldFilters":{"mrvid":mrvNo,"mrvsrlno":mrvSlNo},"offset":0,"sortingFields":{}} ;
	
	
	postJSON('/OrderExecution/api/v1/grComputeAndTallyList', JSON.stringify(fieldFilter), function(data) {
		var mrvMainList = data.payload.list[0].mrvmain;
		var mivdiffList = data.payload.list[0].mivdiff;
		var mrvdiffList = data.payload.list[0].mrvdiff;
		var adjvoucherDTOList = data.payload.list[0].adjvoucherDTO;
		var grheaderList = data.payload.list[0].grheader;
		var grstoneList = data.payload.list[0].grstone;
		var graccessoryList = data.payload.list[0].graccessory;
		
		mainMRVDetails(mrvMainList);

		if(mivdiffList.length != 0){
			mivDetails(mivdiffList);
			$("#mivDetails").show();
			$("#mivDetSection").removeClass('hide');
		}else{			
			$("#mivDetSection").addClass('hide');
			$("#mivDetails").jqxGrid('clear');
			$("#mivDetails").hide();
		}
		
		if(mrvdiffList.length != 0){
			mrvDetails(mrvdiffList);
			$("#mrvDetails").show();
			$("#mrvDetSection").removeClass('hide');
		}else{			
			$("#mrvDetSection").addClass('hide');
			$("#mrvDetails").jqxGrid('clear');
			$("#mrvDetails").hide();
		}
		
		
		if(adjvoucherDTOList.length != 0){
			adjDetails(adjvoucherDTOList);
			$("#adjDetails").show();
			$("#adjDetSection").removeClass('hide');
		}else{			
			$("#adjDetSection").addClass('hide');
			$("#adjDetails").jqxGrid('clear');
			$("#adjDetails").hide();
		}
		
		
		if(grheaderList.length != 0){
			fgDetails(grheaderList);
			$("#fgDetails").show();
			$("#fgDetSection").removeClass('hide');
		}else{			
			$("#fgDetSection").addClass('hide');
			$("#fgDetails").jqxGrid('clear');
			$("#fgDetails").hide();
		}
		
		if(grstoneList.length != 0){
			stoneDetails(grstoneList);
			$("#stoneDetails").show();
			$("#stoneDetSection").removeClass('hide');
		}else{			
			$("#stoneDetSection").addClass('hide');
			$("#stoneDetails").jqxGrid('clear');
			$("#stoneDetails").hide();
		}
		
		/*if(graccessoryList.length != 0){
			accDetails(graccessoryList);
			$("#accDetailTally").show();
			$("#accDetSection").removeClass('hide');
		}else{			
			$("#accDetSection").addClass('hide');
			$("#accDetailTally").jqxGrid('clear');
			$("#accDetailTally").hide();
		}*/
		
	});
}

//API for gr Tally
$("#compute").on('click', function(){
	var mrvNo = $("#grMrvNo").val();
	var mrvSlNo = $("#grMrvSlNo").val();
	
	loadComputeTally(mrvNo, mrvSlNo);
})           			  
// Main MRV Details Grid No 1 ************##################################****************
var mainMRVDetails = function(data){

	var source =
    {
        localdata: data,
        datatype: "array",
        datafields:
        [
            { name: 'mrvNo', type: 'long', map : 'mainmrvOrmivno' },
            { name: 'mrvSlNo', type: 'int', map : 'mainmrvsrlno' },
            { name: 'segmentId', type: 'string', map : 'segment>id' },
            { name: 'segment', type: 'string', map : 'segment>description' },
            { name: 'metalTypeId', type: 'int', map : 'metalType>id' },
            { name: 'metalType', type: 'string', map : 'metalType>description' },
            { name: 'mrvDate', type: 'date', map : 'createddate' },
            { name: 'mrvType', type: 'string', map: 'jwType' },
            { name: 'pcs', type: 'int', map: 'pieces' },
            { name: 'grWt', type: 'number', map: 'grossWeight' },
            { name: 'netWt', type: 'number', map: 'netWeight' },
            { name: 'pureWt', type: 'number', map: 'pureWeight' },
            { name: 'purity', type: 'number', map: 'skinPurity' },
            { name: 'mrvBy', type: 'string', map: 'createdBy' }
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#mainMrvDetails").jqxGrid(
    {
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 60,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
        source: dataAdapter,
        showstatusbar: true,
	      statusbarheight: 30,
	      showaggregates: true,
        columns: [
          { text: 'GRV No.', datafield: 'mrvNo', width: "8%", cellsalign : 'center',sortable : true, menu:true, align:'center' },
          { text: 'GRV Sl. No.', datafield: 'mrvSlNo', columntype: 'textbox', width: "8%", cellsalign : 'center',sortable : true, menu:true, align:'center' },
          { text: 'Segment', datafield: 'segment', width: "8%",sortable : false, menu:false, cellsalign : 'center', align:'center' },
          { text: 'Metal Type', datafield: 'metalType',  width: "12%",sortable : false, menu:false, cellsalign : 'center', align:'center' },
          { text: 'GRV Date', datafield: 'mrvDate',  width: "8%",sortable : true, menu:true, cellsalign : 'center', align:'center', cellsformat : 'dd/MM/yyyy' },
          { text: 'GRV Type', datafield: 'mrvType',  width: "8%",sortable : false, menu:false, cellsalign : 'center', align:'center'},
          { text: 'Pcs', datafield: 'pcs', width: "8%",sortable : false, menu:false, cellsalign : 'center', align:'center' },
          { text: 'Gr. Wt.', datafield: 'grWt', width: "8%",sortable : false, menu:false, cellsalign : 'center', align:'center', cellsformat: 'd3',
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['grWt'] == null) ? 0 : parseFloat(record['grWt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {        		 
          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
          	  } 
          },
          { text: 'Nt. Wt.', datafield: 'netWt', width: "8%",sortable : false, menu:false, cellsalign : 'center', align:'center', cellsformat: 'd3',  
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['netWt'] == null) ? 0 : parseFloat(record['netWt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {        		 
          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
          	  } 
          },
          { text: 'Pure Wt.', datafield: 'pureWt', width: "8%",sortable : false, menu:false, cellsalign : 'center', align:'center', cellsformat: 'd3', 
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['pureWt'] == null) ? 0 : parseFloat(record['pureWt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {        		 
          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
          	  } 
          },          
          { text: 'Purity', datafield: 'purity', width: "8%", cellsalign : 'center',sortable : false, menu:false, align:'center', cellsformat: 'd2', 
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['purity'] == null) ? 0 : parseFloat(record['purity']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {        		 
          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
          	  } 
          },
          { text: 'GRV By', datafield: 'mrvBy', width: "8%",sortable : false, menu:false, cellsalign : 'center', align:'center'}
        ]
    });
}

//Main MRV Details Grid No 2 ************##################################****************
var mivDetails = function(data){

	var source =
    {
        localdata: data,
        datatype: "array",
        datafields:
        [
            { name: 'mivDate', type: 'date', map:'createddate' },
            { name: 'mivType', type: 'string', map: 'operationType' },
            { name: 'metalTypeId', type: 'string', map: 'metalType>id' },
            { name: 'metalType', type: 'string', map: 'metalType>description' },
            { name: 'mivNo', type: 'number', map:'mainmrvOrmivno' },
            { name: 'pcs', type: 'number', map:'pieces' },
            { name: 'grWt', type: 'number', map:'grossWeight' },
            { name: 'netWt', type: 'number', map:'netWeight' },
            { name: 'pureWt', type: 'number', map:'pureWeight' },
            { name: 'purity', type: 'number', map:'skinPurity' },
            { name: 'mivBy', type: 'string', map:'createdBy' },
            { name: 'refType', type: 'string', map:'referenceType'},
            { name: 'refDocNo', type: 'string', map:'refNo' },
            { name: 'refDocSlNo', type: 'number', map:'refSerialNo' }
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#mivDetails").jqxGrid(
    {
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 60,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
        source: dataAdapter,
        showstatusbar: true,
	      statusbarheight: 30,
	      showaggregates: true,
        columns: [
          { text: 'GIV Date', datafield: 'mivDate', width: '7%',sortable : true, menu : true, cellsalign : 'center', align:'center', cellsformat : 'dd/MM/yyyy' },
          { text: 'GIV Type', datafield: 'mivType', width: '9%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Metal Type', datafield: 'metalType', width: '7%',sortable : false, menu : false, cellsalign : 'center', align:'center' },
          { text: 'MIV No.', datafield: 'mivNo', width: '7%',sortable : true, menu : true, cellsalign : 'center', align:'center' },
          { text: 'Pcs', datafield: 'pcs', width: '7%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Gr. Wt.', datafield: 'grWt', width: '7%',sortable : false, menu : false, cellsalign : 'center', align:'center', cellsformat: 'd3', 
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['grWt'] == null) ? 0 : parseFloat(record['grWt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {        		 
          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
          	  } 
          },
          { text: 'Nt. Wt.', datafield: 'netWt', width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd3', 
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['netWt'] == null) ? 0 : parseFloat(record['netWt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {        		 
          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
          	  } 
          },
          { text: 'Pure Wt.', datafield: 'pureWt', width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd3', 
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['pureWt'] == null) ? 0 : parseFloat(record['pureWt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {        		 
          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
          	  } 
          },
          { text: 'Purity', datafield: 'purity', width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd2', 
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['purity'] == null) ? 0 : parseFloat(record['purity']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {        		 
          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
          	  } 
          },
          { text: 'GIV By', datafield: 'mivBy', width: '8%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Ref Type', datafield: 'refType', width: '9%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Ref Doc No', datafield: 'refDocNo', width: '9%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Ref Doc Sl No', datafield: 'refDocSlNo', width: '9%',sortable : false, menu : false, cellsalign : 'center', align:'center'}
        ]
    });
}

//Main MRV Details Grid No 3 ************##################################****************
var mrvDetails = function(data){
	
	var source =
    {
        localdata: data,
        datatype: "array",
        datafields:
        [
            { name: 'mrvDate', type: 'date', map: 'createddate' },
            { name: 'mrvType', type: 'string', map: 'operationType' },
            { name: 'metalTypeId', type: 'string', map: 'metalType>id' },
            { name: 'metalType', type: 'string', map: 'metalType>description' },
            { name: 'mrvNo', type: 'number', map: 'mainmrvOrmivno' },
            { name: 'pcs', type: 'number', map: 'pieces' },
            { name: 'grWt', type: 'number', map: 'grossWeight' },
            { name: 'netWt', type: 'number', map: 'netWeight' },
            { name: 'pureWt', type: 'number', map: 'pureWeight' },
            { name: 'purity', type: 'number', map: 'skinPurity' },
            { name: 'mivBy', type: 'string', map: 'createdBy' },
            { name: 'refType', type: 'string', map: 'referenceType' },
            { name: 'refDocNo', type: 'string', map: 'refNo' },
            { name: 'refDocSlNo', type: 'number', map: 'refSerialNo' }
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#mrvDetails").jqxGrid(
    {
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 30,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
        source: dataAdapter, 
        showstatusbar: true,
	    statusbarheight: 50,
	    showaggregates: true,
        columns: [
          { text: 'GRV Date', datafield: 'mrvDate', width: '7%', cellsalign : 'center',sortable : true, menu : true, align:'center', cellsformat : 'dd/MM/yyyy' },
          { text: 'GRV Type', datafield: 'mrvType', width: '9%', cellsalign : 'center',sortable : false, menu : false, align:'center'},
          { text: 'Metal Type', datafield: 'metalType', width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center' },
          { text: 'GRV No.', datafield: 'mrvNo', width: '7%', cellsalign : 'center',sortable : true, menu : true, align:'center' },
          { text: 'Pcs', datafield: 'pcs', width: '7%', cellsalign : 'center', align:'center'},
          { text: 'Gr. Wt.', datafield: 'grWt', width: '7%', cellsalign : 'center', align:'center', cellsformat: 'd3', sortable : false, menu : false,
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['grWt'] == null) ? 0 : parseFloat(record['grWt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {        		 
          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
          	  } 
          },
          { text: 'Nt. Wt.', datafield: 'netWt', width: '7%', cellsalign : 'center', align:'center',sortable : false, menu : false, cellsformat: 'd3', 
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['netWt'] == null) ? 0 : parseFloat(record['netWt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {        		 
          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
          	  } 
          },
          { text: 'Pure Wt.', datafield: 'pureWt', width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd3', 
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['pureWt'] == null) ? 0 : parseFloat(record['pureWt']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {        		 
          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
          	  } 
          },
          { text: 'Purity', datafield: 'purity', width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd2', 
        	  aggregates: [{          
          		  'Total': function(aggregatedValue, currentValue, column, record) {
      				  var total = (record['purity'] == null) ? 0 : parseFloat(record['purity']);
          			  return aggregatedValue + total;
          		  }
          	  }],
          	  aggregatesrenderer: function(aggregates) {        		 
          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
          	  } 
          },
          { text: 'GRV By', datafield: 'mivBy', width: '8%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Ref Type', datafield: 'refType', width: '9%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Ref Doc No', datafield: 'refDocNo', width: '9%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Ref Doc Sl No', datafield: 'refDocSlNo', width: '9%',sortable : false, menu : false, cellsalign : 'center', align:'center'}
        ]
    });
}

//Main MRV Details Grid No 4 ************##################################****************
var adjDetails = function(data){
	
	var source =
    {
        localdata: data,
        datatype: "array",
        datafields:
        [
            { name: 'adjNo', type: 'string', map: 'adjId' },
            { name: 'adjDate', type: 'date', map: 'adjustmentDate' },
          //  { name: 'adjMetalTypeId', type: 'string', map: 'adjustmentType>id' },
            { name: 'adjMetalType', type: 'string', map: 'metalSegment>description' },
            { name: 'adjType', type: 'number', map: 'adjustmentType>name' },
            { name: 'adjLocCode', type: 'string', map: 'locCode>name' },
            { name: 'adjDCFlag', type: 'number', map: 'debitOrCreditType>name' },
            { name: 'purity', type: 'number', map: 'voucherPurity' },
            { name: 'grWt', type: 'number', map: 'grossWeight' },
            { name: 'netWt', type: 'number', map: 'netWeight' },
            { name: 'pureWt', type: 'number', map: 'pureWeight' },
            { name: 'refType', type: 'string', map: 'docType' },
            { name: 'refDocNo', type: 'string', map: 'docNo' },
            { name: 'refDocSlNo', type: 'number', map: 'docSrlNo' }
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#adjDetails").jqxGrid(
    {
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 30,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
        source: dataAdapter,
        showstatusbar: true,
	      statusbarheight: 50,
	      showaggregates: true,
        columns: [
          { text: 'Adj. No.', datafield: 'adjNo', width: '7%', cellsalign : 'center',sortable : true, menu : true, align:'center'},
          { text: 'Adj. Date ', datafield: 'adjDate', width: '8%', cellsalign : 'center', align:'center',sortable : true, menu : true, cellsformat : 'dd/MM/yyyy' },
          { text: 'Adj. Metal Type ', datafield: 'adjMetalType', width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center' },
          { text: 'Adj. Type ', datafield: 'adjType', width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center' },
          { text: 'Adj. Loc Code', datafield: 'adjLocCode', width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center'},
          { text: 'Adj. Debit Credit Flag ', datafield: 'adjDCFlag', width: '7%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Purity ', datafield: 'purity', width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd2', 
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['purity'] == null) ? 0 : parseFloat(record['purity']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        	  } 
          },
          { text: 'Gr. Wt.', datafield: 'grWt', width: '7%', cellsalign : 'center', align:'center',sortable : false, menu : false, cellsformat: 'd3', 
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['grWt'] == null) ? 0 : parseFloat(record['grWt']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        	  } 
          },
          { text: 'Nt. Wt.', datafield: 'netWt', width: '7%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd3', 
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['netWt'] == null) ? 0 : parseFloat(record['netWt']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        	  } 
          },
          { text: 'Pure Wt.', datafield: 'pureWt', width: '7%', cellsalign : 'center', align:'center',sortable : false, menu : false, cellsformat: 'd3', 
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['pureWt'] == null) ? 0 : parseFloat(record['pureWt']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        	  } 
          },
          { text: 'Ref Type', datafield: 'refType', width: '9%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Ref Doc No', datafield: 'refDocNo', width: '10%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
          { text: 'Ref Doc Sl No', datafield: 'refDocSlNo', width: '10%',sortable : false, menu : false, cellsalign : 'center', align:'center'}
        ]
    });
}

//Main MRV Details Grid No 5 ************##################################****************
var fgDetails = function(data){

	var source =
    {
        localdata: data,
        datatype: "array",
        datafields:
        [
            { name: 'grNo', type: 'string', map: 'grno' },
            { name: 'mrvNo', type: 'string', map: 'documentNo' },
            { name: 'mrvSlNo', type: 'number', map: 'docSerialNo' },
            { name: 'pcs', type: 'string', map: 'recieptPieces' },
            { name: 'grWt', type: 'number', map: 'grossWeight' },
            { name: 'netWt', type: 'number', map: 'netWeight' },
            { name: 'pureWt', type: 'number', map: 'netPureWeight' },
            { name: 'wast', type: 'number', map: 'costWastageWT' },
            { name: 'mcCharge', type: 'number', map: 'costMCTotalCost' },
            { name: 'gmchrgs', type: 'number', map: 'hallMarkCharges' },
            { name: 'grBy', type: 'string', map: 'createdBy' }
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#fgDetails").jqxGrid(
    {
		width : '100%',
		editable : false,
		height : 200,
		columnsheight : 30,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		columnsresize : true,
		showtoolbar : true,
        source: dataAdapter,
        showaggregates: true,
        showstatusbar: true,
        statusbarheight: 50,
        columns: [
          { text: 'IGR No.', datafield: 'grNo', width: '9%',sortable : true, menu : true, cellsalign : 'center', align:'center' },
          { text: 'GRV No.', datafield: 'mrvNo', width: '9%',sortable : true, menu : true, cellsalign : 'center', align:'center' },
          { text: 'GRV Sl No.', datafield: 'mrvSlNo', width: '9%',sortable : true, menu : true, columntype: 'textbox', cellsalign : 'center', align:'center'},
          { text: 'Pcs.', datafield: 'pcs', width: '9%', columntype: 'textbox',sortable : false, menu : false, cellsalign : 'center', align:'center' , 
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['pcs'] == null) ? 0 : parseFloat(record['pcs']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        	  } 
          },
          { text: 'Gr. Wt.', datafield: 'grWt', width: '9%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd3', 
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['grWt'] == null) ? 0 : parseFloat(record['grWt']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        	  } 
          },
          { text: 'Nt. Wt.', datafield: 'netWt', width: '9%',sortable : false, menu : false, cellsalign : 'center', align:'center', cellsformat: 'd3' , 
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['netWt'] == null) ? 0 : parseFloat(record['netWt']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        	  } 
          },
          { text: 'Pure Wt.', datafield: 'pureWt', width: '9%',sortable : false, menu : false, cellsalign : 'center', align:'center', cellsformat: 'd3' , 
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['pureWt'] == null) ? 0 : parseFloat(record['pureWt']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        	  } 
          },
          { text: 'Wast', datafield: 'wast', width: '9%',sortable : false, menu : false,cellsalign : 'center', align:'center' , 
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['wast'] == null) ? 0 : parseFloat(record['wast']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        	  } 
          },
          { text: 'MC', datafield: 'mcCharge', width: '9%', cellsalign : 'center',sortable : false, menu : false, align:'center' , cellsformat: 'd2', 
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['mcCharge'] == null) ? 0 : parseFloat(record['mcCharge']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        	  } 
          },
          { text: 'HM Chrgs', datafield: 'gmchrgs', width: '9%',sortable : false, menu : false, cellsalign : 'center', align:'center', cellsformat: 'd2' , 
        	  aggregates: [{          
        		  'Total': function(aggregatedValue, currentValue, column, record) {
    				  var total = (record['gmchrgs'] == null) ? 0 : parseFloat(record['gmchrgs']);
        			  return aggregatedValue + total;
        		  }
        	  }],
        	  aggregatesrenderer: function(aggregates) {        		 
        			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
        	  } 
          },
          { text: 'IGR By', datafield: 'grBy', width: '10%',sortable : false, menu : false, cellsalign : 'center', align:'center' }
        ]
    });
}

//Main MRV Details Grid No 6 ************##################################****************
var stoneDetails = function(data){
	 
	  var source = {
	      localdata: data,
	      datatype: "array",
	      datafields:  
    	  [
	            { name: 'grNo', type: 'string', map: 'grid' },
	            { name: 'grSlNo', type: 'number', map: 'grSlNo' },
	            { name: 'stoneSeg', type: 'string', map: 'segment' },
	            { name: 'stoneArticle', type: 'string', map: 'stoneCode' },
	            { name: 'wtRange', type: 'string', map: 'slab' },
	            { name: 'stonePcs', type: 'number', map: 'usedPcs' },
	            { name: 'stoneWt', type: 'number', map: 'usedWt' },
	            { name: 'uom', type: 'number', map: 'uom' },
	            { name: 'stoneRate', type: 'number', map: 'stoneCostRate' },
	            { name: 'stoneValue', type: 'number', map: 'stoneCost' }
          ],
	      updaterow: function (rowid, rowdata) {
	          // synchronize with the server - send update command   
	      }
	  };
	  
	  var toThemeProperty = function (className) {
		    return className;
		};

		function getSubItems(data) {
		    var subItems = [];
		    if (data.subItems.length > 0) {
		        subItems = data.subItems;
		    } else if (data.subGroups.length > 0) {
		        for (var i = 0; i < data.subGroups.length; i++) {
		            if (data.subGroups[i].subItems.length > 0) {
		                subItems = subItems.concat(data.subGroups[i].subItems);
		            } else {
		                subItems = subItems.concat(getSubItems(data.subGroups[i]));
		            }
		        }
		    }
		    return subItems;
		}

		var groupsrenderer = function (text, group, expanded, data) {
		    var number = dataAdapter.formatNumber(group, data.groupcolumn.cellsformat);
		    var text = data.groupcolumn.text + ': ' + number;

		    var aggregate = this.getcolumnaggregateddata('stoneValue', ['sum'], true, getSubItems(data));
		    return '<div class="' + toThemeProperty('jqx-grid-groups-row') + '" style="position: absolute;"><span>' + text + ', </span>' + '<span class="' + toThemeProperty('jqx-grid-groups-row-details') + '">' + "Total" + ' (' + aggregate.sum + ')' + '</span></div>';
		};
		
		
	  var dataAdapter = new $.jqx.dataAdapter(source);
	  // initialize jqxGrid
	  $("#stoneDetails").jqxGrid({
			width : '100%',
			editable : false,
			height : 200,
			columnsheight : 60,
			autorowheight : true,
			autoheight : true,
			altRows : true,
			columnsresize : true,
			showtoolbar : true,
	      source: dataAdapter,
	      showstatusbar: true,
	      statusbarheight: 30,
	      showaggregates: true,
	      groupsrenderer: groupsrenderer,
	      groupable: true,
	      selectionmode: 'singlecell',
	      columns: [
			    	  { text: 'IGR No.',datafield: 'grNo', width: '10%', cellsalign : 'center',sortable : true, menu : true, align:'center', groupsexpandedbydefault : true},
			    	  { text: 'IGR Sl. No.', datafield: 'grSlNo',  width: '10%', cellsalign : 'center',sortable : true, menu : true, align:'center' }, 
			    	  { text: 'Stone Seg', datafield: 'stoneSeg',  width: '10%', cellsalign : 'center',sortable : true, menu : true, align:'center' }, 
			    	  { text: 'Stone Article', datafield: 'stoneArticle',  width: '10%', cellsalign : 'center',sortable : false, menu : false, align:'center' }, 
			    	  { text: 'Weight-Range', datafield: 'wtRange',  width: '10%', cellsalign : 'center',sortable : false, menu : false, align:'center' }, 
			    	  { text: 'Stone Pcs.', datafield: 'stonePcs',  width: '10%', cellsalign : 'center',sortable : false, menu : false, align:'center' }, 
			    	  { text: 'Stone Wt.', datafield: 'stoneWt',  width: '10%', cellsalign : 'center',sortable : false, menu : false, align:'center', aggregates: ['sum'], cellsformat: 'd3' }, 
			    	  { text: 'UQC', datafield: 'uom',  width: '10%', cellsalign : 'center', align:'center',sortable : false, menu : false}, 
			    	  { text: 'Stone Rate', datafield: 'stoneRate',  width: '10%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd2' }, 
			    	  { text: 'Stone Value', datafield: 'stoneValue',  width: '10%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd2'}
		    	  ]
	  });
}

//Main MRV Details Grid No 7 ************##################################****************
var accDetails = function(data){

	var source =
    {
        localdata: data,
        datatype: "array",
        datafields:
        [
            { name: 'grNo', type: 'string', map: 'grno' },
            { name: 'accSeg', type: 'string', map: 'segment' },
            { name: 'subCat', type: 'string', map: '' },
            { name: 'accPcs', type: 'number', map: 'usedPcs' },
            { name: 'accWt', type: 'number', map: 'usedWt' },
            { name: 'uom', type: 'number', map: 'uom' },
            { name: 'accRate', type: 'number', map: 'accRate' },
            { name: 'accVal', type: 'number', map: 'accCost' },
            { name: 'refType', type: 'string', map: '' },
            { name: 'refDocNo', type: 'string', map: '' },
            { name: 'refDocSlNo', type: 'number', map: '' }
            
        ],
        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#accDetailTally").jqxGrid(
    {
    	width: '100%',
    	rowdetails : true,
  		sortable : true,
  		columnsResize : true,
        height: 250,
        source: dataAdapter,
        showstatusbar: true,
        statusbarheight: 30,
        altrows: true,
        showaggregates: true,
        showstatusbar: true,
        columns: [
        	{ text: 'IGR No.', datafield: 'grNo', width: '9%', cellsalign : 'center',sortable : true, menu : true, align:'center' },
        	{ text: 'Acc. Seg.', datafield: 'accSeg', width: '9%', cellsalign : 'center',sortable : true, menu : true, align:'center' },
        	{ text: 'Sub cat ', datafield: 'subCat', width: '9%', cellsalign : 'center',sortable : false, menu : false, align:'center' },
            { text: 'Acc. Pcs.', datafield: 'accPcs', width: '9%', cellsalign : 'center',sortable : false, menu : false, align:'center' , 
        		aggregates: [{          
	          		  'Total': function(aggregatedValue, currentValue, column, record) {
	      				  var total = (record['accPcs'] == null) ? 0 : parseFloat(record['accPcs']);
	          			  return aggregatedValue + total;
	          		  }
	          	  }],
	          	  aggregatesrenderer: function(aggregates) {        		 
	          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	          	  } 
            },
            { text: 'Acc. Wt.', datafield: 'accWt', width: '9%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd3' , 
            	aggregates: [{          
	          		  'Total': function(aggregatedValue, currentValue, column, record) {
	      				  var total = (record['accWt'] == null) ? 0 : parseFloat(record['accWt']);
	          			  return aggregatedValue + total;
	          		  }
	          	  }],
	          	  aggregatesrenderer: function(aggregates) {        		 
	          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	          	  } 
        	},
        	{ text: 'UQC', datafield: 'uom', width: '9%', cellsalign : 'center', align:'center' },
        	{ text: 'Acc. Rate', datafield: 'accRate', width: '11%', cellsalign : 'center',sortable : false, menu : false, align:'center', cellsformat: 'd2' , 
        		aggregates: [{          
	          		  'Total': function(aggregatedValue, currentValue, column, record) {
	      				  var total = (record['accRate'] == null) ? 0 : parseFloat(record['accRate']);
	          			  return aggregatedValue + total;
	          		  }
	          	  }],
	          	  aggregatesrenderer: function(aggregates) {        		 
	          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	          	  } 
        	},
            { text: 'Acc. Value', datafield: 'accVal', width: '9%', cellsalign : 'center', align:'center' ,sortable : false, menu : false, cellsformat: 'd2' , 
        		aggregates: [{          
	          		  'Total': function(aggregatedValue, currentValue, column, record) {
	      				  var total = (record['accVal'] == null) ? 0 : parseFloat(record['accVal']);
	          			  return aggregatedValue + total;
	          		  }
	          	  }],
	          	  aggregatesrenderer: function(aggregates) {        		 
	          			  return '<span style="margin-top: 5px; color: #008800; text-align: center;">' + aggregates["Total"] + '</span>';
	          	  } 
              },
              { text: 'Ref Type', datafield: 'refType', width: '9%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
              { text: 'Ref Doc No', datafield: 'refDocNo', width: '8%',sortable : false, menu : false, cellsalign : 'center', align:'center'},
              { text: 'Ref Doc Sl No', datafield: 'refDocSlNo', width: '9%',sortable : false, menu : false, cellsalign : 'center', align:'center'}
        ]
    });
}


//Print Functionality to be done by Venkat
//#######################################
$("#printGRBT").on('click', function() {
	var mrvNo = $('#grMrvNo').val();
	var mrvSrlNo = $('#grMrvSlNo').val();
	fieldFilters = {
		"fieldFilters" : {}
	};

	fieldFilters = {
		"fieldFilters" : {
			"mrvNumber" : mrvNo,
			"mrvSrlNo" : mrvSrlNo,
			"mode" : "pdf",
			"reportName" : "RPT_GR_Bill_To_Tally"
		}
	}
	$.ajax({
		url : 'jasperReport',
		type : 'post',
		data : fieldFilters,
		contentType : "application/x-www-form-urlencoded",
		xhrFields : {
			responseType : "arraybuffer"
		},
		success : function(data) {
			console.log(data);
			if (navigator.msSaveBlob) {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				navigator.msSaveBlob(file, 'RPT_GR_Bill_To_Tally.pdf');
			} else {
				var file = new Blob([ data ], {
					type : 'application/pdf'
				});
				var fileURL = URL.createObjectURL(file);
				window.open(fileURL);
			}
		}
	});

});