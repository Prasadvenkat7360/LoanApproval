<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<script type="text/javascript">
		var source = {
			datatype : 'json',
			datafields : [ {
				'name' : 'firstName',
				'type' : 'string'
			}, {
				'name' : 'middleName',
				'type' : 'string'
			}, {
				'name' : 'lastName',
				'type' : 'string'
			}, {
				'name' : 'email'
			}, {
				'name' : 'typeOfDesigners'
			} ], // end of fields
			url : 'api/v1/customers',
			type : 'post',
			root : 'customerList',
			contentType : 'application/json',
			beforeprocessing : beforeprocessing,
			pagesize : 20,
			sort : sort

		};

		function beforeprocessing(data) {
			source.totalrecords = data.payload.customerSize;
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

		var dataAdapter1 = new $.jqx.dataAdapter(source, {
			formatData : requestData
		});

		$("#jqxgrid").jqxGrid({
			source : dataAdapter1,
			columns : [ {
				'text' : 'First Name',
				'datafield' : 'firstName',
				'width' : '100'
			}, {
				'text' : 'Middle Name',
				'datafield' : 'middleName',
				sortable : 'false'

			}, {
				'text' : 'Last Name',
				'datafield' : 'lastName',
				'width' : '100',
				'sortable' : 'false'

			}, {
				'text' : 'Email',
				'datafield' : 'email',
				sortable : 'false'
			}, {
                text: 'Designer Type', datafield: 'typeOfDesigners', displayfield: 'Designer Type', columntype: 'dropdownlist',
                createeditor: function (row, value, editor) {
                      editor.jqxDropDownList({ source: dataAdapter1.records, displayMember: 'name', valueMember: 'id' });
                  }
              } ], // end of fields
			sortable : 'true',
			pageable : 'true',
			filterable : 'true',
			virtualmode : 'true',
			pagermode : 'simple',
			showfilterrow : 'true',
			rendergridrows : rendergridrows,
			showsortmenuitems : false

		});
	</script>
	
	 <div id='jqxgrid' style="font-size: 13px; font-family: Verdana; float: left;"> </div>