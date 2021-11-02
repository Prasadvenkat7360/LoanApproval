$("#search").on('click',function(){
	searchCustomer();
	$("#jqxgridR").hide();
});

var searchCustomer = function(){
	postJSON('/OrderExecution/api/v1/getCustomerComparators',JSON.stringify(searchFieldFilters()),function(data) {
		if(data.resCode == 1){
			leftGrid(data.payload.comparators);
			$("#jqxgrid").show();
		}else{
			$.growl.error({
				message : data.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
}

var searchFieldFilters = function(){
	var alphabeticalOrder = $("#alphabeticalOrder").val();
	var emailId = $("#emailId").val();
	var phoneNumber = $("#phoneNumber").val();
 
	fieldFilters = {
		"fieldFilters" : {}
	};

	if (alphabeticalOrder != "" && alphabeticalOrder != null) {
		fieldFilters.fieldFilters["alphabetGiven"] = alphabeticalOrder;
	}
	if (emailId != "" && emailId != null) {
		fieldFilters.fieldFilters["emailIdGiven"] = emailId;
	}
	if (phoneNumber != "" && phoneNumber != null) {
		fieldFilters.fieldFilters["phoneNumber"] = phoneNumber;
	}
	
	return fieldFilters;
}

//############### Left Side  Search Grid ################## 
var leftGrid = function(response) {
	var source = {
		datafields : [
			{'name' : 'custId','type' : 'long'},
			{'name' : 'firstName','type' : 'string'},
			{'name' : 'middleName','type' : 'string'}, 
			{'name' : 'lastName','type' : 'string'}, 
			{'name' : 'email','type' : 'string',},
			{'name' : 'mobileOne','type' : 'string'}, 
			{'name' : 'mobileTwo','type' : 'string'},
			
			{'name' : 'mobileThree','type' : 'string'}, 
			{'name' : 'homePhone','type' : 'string'},
			{'name' : 'officePhone','type' : 'string'}, 
			
			{'name' : 'address','type' : 'string','map' : 'address>addres'}, 
			{'name' : 'address1','type' : 'string','map' : 'address>address2'}, 
			{'name' : 'address2','type' : 'string','map' : 'address>address3'}, 
			{'name' : 'city','type' : 'string','map' : 'address>city>name'}, 
			{'name' : 'zipCode','type' : 'string','map' : 'address>zipCode'}, 
			{'name' : 'state','type' : 'string','map' : 'address>state>name'},

			{'name': 'actionIdD','type':'long'},
			{'name': 'editFlag','type':'string'}
			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	$("#jqxgrid").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		height : 200,
		theme: 'energyblue',
		columnsheight : 80,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		pageable: true,
		sortable:true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; <b>Original Records</b>');			
		},
		columns : [ 

			{'text' : 'Customer Id','datafield' : 'custId','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,cellsrenderer : editViewLp}, 
			{'text' : 'Name','datafield' : 'firstName','width' : '20%',cellsalign : 'left',align : 'center',sortable : false,editable : false,cellsrenderer : editViewLp,
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
					var middleName =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'middleName');
					var lastName =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'lastName');
					var fullName = "";
					
					if(middleName != null && middleName != undefined){
						 fullName = value + " " + middleName + " " + lastName ; 
					}else{
						 fullName = value + " " + lastName ;
					}
					
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">'+ fullName +'</div>';
	    		 }
			},
			{'text' : 'Email','datafield' : 'email','width' : '25%',cellsalign : 'left',align : 'center',sortable : false,editable : false,cellsrenderer : editViewLp},
			{'text' : 'Phone Number','datafield' : 'mobileOne',editable : false,cellsalign : 'left',align : 'center',sortable : false,'width' : '20%',
				  cellsrenderer: function(row, column, value){
					 var phnNumber = value;
					 var m2 =  $("#jqxgrid").jqxGrid("getcellvalue",row,"mobileTwo");
					 var m3 =  $("#jqxgrid").jqxGrid("getcellvalue",row,"mobileThree");
					 var office =  $("#jqxgrid").jqxGrid("getcellvalue",row,"officePhone");
					 var home =  $("#jqxgrid").jqxGrid("getcellvalue",row,"homePhone");
					 var editFlag =  $("#jqxgrid").jqxGrid("getcellvalue",row,"editFlag");
					 
					 if(m2 != undefined && m2 != null){
						 phnNumber = phnNumber + "," + "\n" + m2 ;
					 }
					 if(m3 != undefined && m3 != null){
						 phnNumber = phnNumber + "," + "\n" + m3 ;
					 }
					 if(office != undefined && office != null){
						 phnNumber = phnNumber + "," + "\n" + office ;
					 }
					 if(home != undefined && home != null){
						 phnNumber = phnNumber + "," + "\n" + home ;
					 }
					 
					 
					 if(editFlag == true){
				      	 return "<div align='center' style='text-align:center; background: #FBB450; color: #FFF;  ;margin: 0;padding-top:10px; height:55px;'>"+phnNumber +"</div>";
					 }else{
				      	 return "<div align='center'style='text-align:center; margin: 0;padding-top:10px; height:55px;'>"+phnNumber +"</div>";
					 }
			      	} 
			},
			{'text' : 'Address','datafield' : 'address','width' : '40%',cellsalign : 'left',align : 'center',sortable : false,editable : false,
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
					var address= value;
					var editFlag =  $("#jqxgrid").jqxGrid("getcellvalue",row,"editFlag");

					/*var address1 = jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'address1');
					var address2 = jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'address2');

					var city =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'city');
					var zCode =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'zipCode');
					var state = jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'state');
					 var editFlag =  $("#jqxgrid").jqxGrid("getcellvalue",row,"editFlag");

					if(address1 != undefined && address1 != null){
						 address = address + "," + address1 ;
					}
					if(address2 != undefined && address2 != null){
						 address = address + "," + address2 ;
					}
					if(city != undefined && city != null){
						 address = address + " " + city ;
					}
					if(zCode != undefined && zCode != null){
						address = address + "-" + zCode + ",";
					}
					if(state != undefined && state != null){
						address = address + " " + state;
					}
					*/
					 if(editFlag == true){
				      	 return "<div align='center' style='text-align:center; background: #FBB450; color: #FFF;  ;margin: 0;padding-top:10px; height:55px;'>"+address +"</div>";
					 }else{
				      	 return "<div align='center'style='text-align:center; margin: 0;padding-top:10px; height:55px;'>"+address +"</div>";
					 }

	    		 }
			},

			{'text' : '','datafield' : 'mobileTwo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'mobileThree','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'homePhone','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'officePhone','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'editFlag','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'middleName','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false,hidden:true},

			]
	});
}


$('#jqxgrid').on('rowclick', function (event) {
	var firstName = jQuery('#jqxgrid').jqxGrid('getCellvalue', event.args.rowindex,'firstName');
	var custId = jQuery('#jqxgrid').jqxGrid('getCellvalue', event.args.rowindex,'custId');

	$('#jqxgrid').jqxGrid ('setcellvalue',  event.args.rowindex, 'editFlag', true);
	
	var fieldFilters = {
            "fieldFilters" : {
                "customerFirstName" : firstName
            }
        };
	postJSON('/OrderExecution/api/v1/getCustomerComparables',JSON.stringify(fieldFilters),function(data) {
		if(data.resCode == 1){
			
		 var duplicateArr = [];
			$.each(data.payload.comparables,function(k,v){
				if( v.custId != custId){
					duplicateArr.push(v);
				}
			});
			
			rightGrid(duplicateArr);
			$("#jqxgridR").show();
		}
	});
});

var editViewLp = function(row, column, value){
	var editFlag = jQuery('#jqxgrid').jqxGrid ('getcellvalue', row, 'editFlag');
	 if(editFlag == true){
		return '<div style="text-align:center; background: #FBB450; color: #FFF;  ;margin: 0;padding-top:10px; height:55px;">'+value+'</div>';
	 }
	else{
		return '<div style="text-align:center; margin-top: -4px; padding-top:10px; height:55px;">'+value+'</div>';
	}
}

//####################################################################################################
var rightGrid = function(response) {
	var source = {
		datafields : [
			{'name' : 'custId','type' : 'long'},
			{'name' : 'firstName','type' : 'string'},
			{'name' : 'middleName','type' : 'string'}, 
			{'name' : 'lastName','type' : 'string'}, 
			{'name' : 'email','type' : 'string',},
			{'name' : 'mobileOne','type' : 'string'}, 
			{'name' : 'mobileTwo','type' : 'string'},
			
			{'name' : 'mobileThree','type' : 'string'}, 
			{'name' : 'homePhone','type' : 'string'},
			{'name' : 'officePhone','type' : 'string'}, 
			
			{'name' : 'address','type' : 'string','map' : 'address>addres'}, 
			{'name' : 'address1','type' : 'string','map' : 'address>address2'}, 
			{'name' : 'address2','type' : 'string','map' : 'address>address3'}, 
			{'name' : 'city','type' : 'string','map' : 'address>city>name'}, 
			{'name' : 'zipCode','type' : 'string','map' : 'address>zipCode'}, 
			{'name' : 'state','type' : 'string','map' : 'address>state>name'},

			{'name': 'actionIdD','type':'long'},
			{'name': 'editFlag','type':'string'}

			],
			localdata : response,
			deleterow : function(rowid, commit) {
				commit(true);
		},
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	
	$("#jqxgridR").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		height : 200,
		theme: 'energyblue',
		columnsheight : 80,
		autorowheight : true,
		autoheight : true,
		altRows : true,
		sortable:true,
		pageable: true,
		columnsresize : true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; <b>Duplicate Records</b>');			
		},
		columns : [ 

			{'text' : 'Customer Id','datafield' : 'custId','width' : '8%',cellsalign : 'center',align : 'center',sortable : true,editable : false}, 
			{'text' : 'Name','datafield' : 'firstName','width' : '20%',cellsalign : 'left',align : 'center',sortable : false,editable : false,
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
					var middleName =  jQuery('#jqxgridR').jqxGrid ('getCellvalue', row, 'middleName');
					var lastName =  jQuery('#jqxgridR').jqxGrid ('getCellvalue', row, 'lastName');
					var fullName = "";
					
					if(middleName != null && middleName != undefined){
						 fullName = value + " " + middleName + " " + lastName ; 
					}else{
						 fullName = value + " " + lastName ;
					}
					
					return '<div style="text-align:center; margin: 0; padding-top:10px; height:40px;">'+ fullName +'</div>';
	    		 }
			},
			{'text' : 'Email','datafield' : 'email','width' : '25%',cellsalign : 'left',align : 'center',sortable : false,editable : false},
			{'text' : 'Phone Number','datafield' : 'mobileOne',editable : false,cellsalign : 'left',align : 'center',sortable : false,'width' : '20%',
				  cellsrenderer: function(row, column, value){
						 var phnNumber = value;
						 var m2 =  $("#jqxgrid").jqxGrid("getcellvalue",row,"mobileTwo");
						 var m3 =  $("#jqxgrid").jqxGrid("getcellvalue",row,"mobileThree");
						 var office =  $("#jqxgrid").jqxGrid("getcellvalue",row,"officePhone");
						 var home =  $("#jqxgrid").jqxGrid("getcellvalue",row,"homePhone");
						 var editFlag =  $("#jqxgrid").jqxGrid("getcellvalue",row,"editFlag");
						 
						 if(m2 != undefined && m2 != null){
							 phnNumber = phnNumber + "," + "\n" + m2 ;
						 }
						 if(m3 != undefined && m3 != null){
							 phnNumber = phnNumber + "," + "\n" + m3 ;
						 }
						 if(office != undefined && office != null){
							 phnNumber = phnNumber + "," + "\n" + office ;
						 }
						 if(home != undefined && home != null){
							 phnNumber = phnNumber + "," + "\n" + home ;
						 }
				      return "<div align='center'style='text-align:center ;margin: 0;padding-top:10px; height:55px;'>"+phnNumber +"</div>";
			      	} 
			},
			{'text' : 'Address','datafield' : 'address','width' : '40%',cellsalign : 'left',align : 'center',sortable : false,editable : false,
				cellsrenderer : function(row, columnfield, value, defaulthtml,columnproperties) {
					var address= value;
					/*var address1 = jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'address1');
					var address2 = jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'address2');

					var city =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'city');
					var zCode =  jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'zipCode');
					var state = jQuery('#jqxgrid').jqxGrid ('getCellvalue', row, 'state');
					
					if(address1 != undefined && address1 != null){
						 address = address + "," + address1 ;
					}
					if(address2 != undefined && address2 != null){
						 address = address + "," + address2 ;
					}
					if(city != undefined && city != null){
						 address = address + " " + city ;
					}
					if(zCode != undefined && zCode != null){
						address = address + "-" + zCode + ",";
					}
					if(state != undefined && state != null){
						address = address + " " + state;
					}
					*/
				   return "<div align='center'style='text-align:center; margin: 0;padding-top:10px; height:55px;'>"+address +"</div>";
	    		 }
			},

			{'text' : '','datafield' : 'mobileTwo','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'mobileThree','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'homePhone','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'officePhone','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},
			{'text' : '','datafield' : 'editFlag','width' : '10%',cellsalign : 'center',align : 'center',sortable : false,editable : false,hidden:true},

			{
				text : 'Action',
				datafield : 'actionIdD',
				columntype : 'dropdownlist',
				displayfield : 'materialTypes',
				editable : true,
				cellsalign : 'center',
				align : 'center',
				filterable: false,
				sortable : false,
				'width' : '15%',
				createeditor : function(row, value, editor) {
					var actionArry = [{"name":"Retain","id":'R'},{"name":"In Active","id":"I"}]
					editor.jqxDropDownList({ source: actionArry , displayMember: 'name', valueMember: 'id',autoDropDownHeight: true,
						renderer: function (index, label, value) {
					        var datarecord = actionArry[index];
					        var table;
					        if(datarecord.name == "Retain"){
						        table = '<button type="button" style="padding: 2px 5px; font-size: 1em ;width: inherit; background-color: green; border: 1px solid #999; color:#FFF;">' + datarecord.name + '</button>';
					        }else{
						        table = '<button type="button" style="padding: 2px 5px; font-size: 1em ;width: inherit;" class="btn-danger">' + datarecord.name + '</button>';
					        }
					        return table;
					    }
					});
				},
				cellbeginedit : function(row){
					var editFlag = jQuery('#jqxgridR').jqxGrid ('getcellvalue', row, 'editFlag');
					console.log(editFlag);
					if(editFlag == undefined || editFlag == false){
						return true;
					}else{
						return false;
					}
				},
				cellvaluechanging: retainOrInActive
			}
			]
	});
}

var retainOrInActive = function(row, datafield, columntype, oldvalue, newvalue, event){
	if(newvalue.value == "I"){
		var custId = $("#jqxgridR").jqxGrid("getcellvalue",row,"custId");
		console.log(custId);
		$.getJSON('/OrderExecution/api/v1/deactivateCustomer?custId='+custId, function(data) {
				if(data.resCode == 1){
					searchCustomer();
					$("#jqxgridR").jqxGrid('setcellvalue', row, "editFlag",true);

					$.growl.notice({
						message : data.mesgStr,
						title : 'Success',
						duration : 1000
					});
					return ;
				}else{
					$("#jqxgridR").jqxGrid('setcellvalue', row, "editFlag",false);
					$.growl.error({
						message : data.mesgStr,
						title : 'Error',
						duration : 10000
					});
					return false;
				}
				
		});
	}else{
		$("#jqxgridR").jqxGrid('setcellvalue', row, "editFlag",false);
	}
}

$("#clear").on('click',function(){
	window.location.href="javascript:showContentPage('duplicateCustRemoval', 'bodySwitcher')"
});

// validations started here
$("#lblAlphaOrder").hide();
$("#lblEmail").hide();
$("#lblPhoneNumber").hide();

$("#alphabeticalOrder").on('blur',function(){
	var alphabeticalOrder = $('#alphabeticalOrder').val();
	var regpan = /^[a-zA-Z ]*$/;

	if(alphabeticalOrder != ""){
		if(regpan.test(alphabeticalOrder)){
			$("#lblAlphaOrder").hide();
			$("#search").prop('disabled',false);
			$("#alphabeticalOrder").removeClass("validateView");
		} else {
		   // invalid pan card number
			$("#lblAlphaOrder").show();
			$("#alphabeticalOrder").addClass("validateView");
			$("#search").prop('disabled',true);
		}
	}
	
});

/*$("#emailId").on('blur',function(){
	var val = $("#emailId").val();
	
	if(val != ""){
		if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val)) {
		    // value is ok, use it
			$("#lblEmail").hide();
			$("#emailId").removeClass("validateView");
			$("#search").prop('disabled',false);
		} else {
			$("#lblEmail").show();
			$("#emailId").addClass("validateView");
			$("#search").prop('disabled',true);
		}
	}
});*/

$("#phoneNumber").on('blur',function(){
	var phoneNumber = $('#phoneNumber').val();
	var regpan = /^[0-9]*$/;

	if(regpan.test(phoneNumber) && phoneNumber.length != 10){
		$("#lblPhoneNumber").hide();
		$("#phoneNumber").removeClass("validateView");
		$("#search").prop('disabled',false);
	} else {
	   // invalid pan card number
		$("#lblPhoneNumber").show();
		$("#phoneNumber").addClass("validateView");
		$("#search").prop('disabled',true);
	}
});