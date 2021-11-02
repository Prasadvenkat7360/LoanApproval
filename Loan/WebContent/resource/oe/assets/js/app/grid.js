var source = {};
function showMyGrid(datafields, url, root, columns, filter, updateRows,
		sortColumn) {
	source = {
		datafields : datafields,
		data : filter,
		url : url,
		datatype : 'json',
		type : 'post',
		root : root,
		contentType : 'application/json',
		beforeprocessing : beforeprocessing,
		pagesize : 20,
		sort : sort,
		theme: 'energyblue',
		sortColumn : sortColumn,
		sortdirection : 'asc',
		updaterow : updateRows
	};

	var dataAdapter1 = new $.jqx.dataAdapter(source, {
		formatData : requestData
	});

	$("#jqxgrid").jqxGrid({
		source : dataAdapter1,
		width : '100%',
		height : '400px',
		editable : true,
		editmode : 'click',
		columnsresize : true,
		selectionmode : 'singlecell',
		columns : columns,
		sortable : 'true',
		pageable : 'true',
		virtualmode : 'true',
		pagermode : 'simple',
		theme: 'energyblue',
		rendergridrows : rendergridrows,
		showsortmenuitems : false,
		enabletooltips : true,
		autoheight : true,
		altrows : true,
		columnsheight : 50,
		showaggregates: false,
		showstatusbar: false
	});

}


function showMyGridCustom(datafields, url, root, columns, filter, updateRows,	sortColumn, gridId) {
	source = {
		datafields : datafields,
		data : filter,
		url : url,
		datatype : 'json',
		type : 'post',
		root : root,
		contentType : 'application/json',
		beforeprocessing : beforeprocessing,
		pagesize : 20,
		theme: 'energyblue',
		sort : sort,
		sortColumn : sortColumn,
		sortdirection : 'asc',
		updaterow : updateRows
	};

	var dataAdapter1 = new $.jqx.dataAdapter(source, {
		formatData : requestData
	});

	$(gridId).jqxGrid({
		source : dataAdapter1,
		width : '100%',
		height : '400px',
		editable : true,
		editmode : 'click',
		columnsresize : true,
		selectionmode : 'singlecell',
		columns : columns,
		sortable : 'true',
		pageable : 'true',
		virtualmode : 'true',
		pagermode : 'simple',
		rendergridrows : rendergridrows,
		showsortmenuitems : false,
		enabletooltips : true,
		autoheight : true,
		altrows : true,
		columnsheight : 50,
		showaggregates: false,
		showstatusbar: false
	});
	
	

}

function beforeprocessing(data) {
	if (undefined == data.payload.list) {
		data.payload.list = [];
	}
	source.totalrecords = data.payload.size ? data.payload.size : 0;
}

function sort() {
	$("#jqxgrid").jqxGrid('updatebounddata', 'sort');
}

function requestData(data) {
	var order = "asc".match(data.sortorder) ? true : false;
	var sort = {
		"sortingFields" : {}
	};
	sort.sortingFields[data.sortdatafield] = order;

	$.extend(data, {
		offset : data.pagenum ? data.pagenum : 0
	}, data.sortdatafield ? sort : {});

	return JSON.stringify(data);

}

function rendergridrows(params) {
	return params.data;
}

function addGrid(datafields, columns, updateRows, data, addrow, gridId) {

	source = {
		localdata : data,
		datatype : "local",
		datafields : datafields,
		updaterow : updateRows,
		addrow : addrow
	};

	var dataAdapter = new $.jqx.dataAdapter(source);

	$(gridId).jqxGrid({
		source : dataAdapter,
		width : '100%',
		height : '400px',
		editable : true,
		editmode : 'click',
		columnsresize : true,
		selectionmode : 'singlecell',
		columns : columns,
		enabletooltips : true,
		theme: 'energyblue',
		autoheight : true,
		altrows : true,
		columnsheight : 50
	});

}

function exportGrid(fileName) {
	var data
	var sysdate = moment().format('DDMMYYYYHHmmSS');
	try {
		data = $("#jqxgrid").jqxGrid('exportdata', 'json');		
		JSONToCSVConvertor(data, fileName + "_" + sysdate, true);
	} catch (e) {
		$.growl.error({
			message : "No data to export"
		});
	}
}

function masterChildGrid(datafields, columns, data, gridId, addrow, updateRow,
		deleteRow, autoheight/*, handlekeyboardnavigation*/) {

	source = {
		localdata : data,
		datatype : "local",
		datafields : datafields,
		updaterow : updateRow,
		addrow : addrow,
		deleterow : deleteRow,
		/*unboundmode: true,*/
		totalrecords: 100
		
	};

	var dataAdapter = new $.jqx.dataAdapter(source);

	$(gridId)
			.jqxGrid(
					{
						source : dataAdapter,
						width : '100%',
						height : '220px',
						editable : true,
						editmode : 'click',
						columnsresize : true,
						selectionmode : 'singlecell',
						enablehover : true,
						columns : columns,
						theme: 'energyblue',
						enabletooltips : true,
						autoheight : autoheight,
						altrows : false,
						columnsheight : 50,
						//keyboardnavigation: false,
						showtoolbar : false,
						rendertoolbar : function(toolbar) {
							var me = this;
							var container = $("<div style='margin: 5px;'></div>");
							// var span = $("<span style='float: left;
							// margin-top: 5px; margin-right: 4px;'>Search City:
							// </span>");
							var input = $("<button  style='height: 23px; float: left; width: 73px;' class='btn btn-warning  voffset' type='button' name='Add Row'>Add Row</button>");
							toolbar.append(container);
							// container.append(span);
							container.append(input);
						},
						//handlekeyboardnavigation : handlekeyboardnavigation,
						

					// showeverpresentrow: true,
					// everpresentrowposition: 'top',
					// everpresentrowactions: 'addBottom update delete reset'
					});

}

var aggregatesrenderer = function (aggregates, column, element, summaryData, theme) {
    var renderstring = "<div >";
    $.each(aggregates, function (key, value) {
    	 if (isNaN(value)) {
    		 value = 0;
    	 }
        renderstring += '<div style="position: relative; margin: 6px; text-align: right; overflow: hidden;">' + value + '</div>';
    });
    renderstring += "</div>";
    return renderstring;
}