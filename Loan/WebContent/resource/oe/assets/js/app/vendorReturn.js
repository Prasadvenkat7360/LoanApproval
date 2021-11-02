/*
 *  ##	Author (UI)    :   Dipankar Naha
	##	Author (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Nageswara  Rao 
	##	Date Creation 	: 	12-01-2018
*/

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

//############################ API Integration for Search/Create Page (LOVs) #########################

var lsVendors;
var fgVendors;
var accVendors;
var refTypes;
var stoneSegments;
var metalSegments;
var accSegments;
var fullPartialTypes;
var output;
var printArray = []
var mrvTypeArr = {
		"mrvTypeArray":[{"name":"Sub-Contractor","id":"Sub-Contract"},{"name":"Dealer","id":"Dealer"}],
}

var mrvTypePacketArr = {
		"mrvTypeArray":[{"name":"Sub-Contractor","id":"Sub-Contract"},{"name":"Dealer","id":"Dealer"},{"name":"Consignment","id":"Consignment"}],
}
onLoadFunction = function(){
	$.getJSON("/OrderExecution/api/v1/vendorReturnCreateLOVs",function(data){
		
		$('#materialTypeS').empty().append('<option value="" selected>--Select--</option>');
		$('#matTypeC').empty().append('<option value="" selected>--Select--</option>');
		$("#mrvTypeIdPacket").empty().append('<option value="" selected>--Select--</option>');

		var materialTypes = data.payload.materialTypes;
		
		lsVendors = data.payload.lsVendors;
		fgVendors = data.payload.fgVendors;
		accVendors = data.payload.accVendors;
		refTypes = data.payload.refTypes;
		stoneSegments = data.payload.stoneSegments;
		metalSegments = data.payload.metalSegments;
		accSegments = data.payload.accSegments;
		fullPartialTypes = data.payload.fullPartialTypes;
		
	   $.each(materialTypes,function(val,key){
			$("#matTypeC").append('<option value="'+key.id+'">'+key.name+'</option>');
	   })
	   $.each(data.payload.createdBy,function(val,key){
			$("#createdByS").append('<option value="'+key.hrms_id+'">'+key.name+'</option>');
	   })
	   $.each(materialTypes,function(val,key){
			$("#materialTypeS").append('<option value="'+key.id+'">'+key.name+'</option>');
	   });
	   
   		$.each(mrvTypePacketArr.mrvTypeArray,function(key,val){
   		$("#mrvTypeIdPacket").append('<option value="'+val.id+'">'+val.name+'</option>');
   		});
    })
}
onLoadFunction();

$("#materialTypeS").on("change",function(){
	
	$('#vendorCodeS').empty().append('<option value="" selected>--Select--</option>');
	$('#segmentS').empty().append('<option value="" selected>--Select--</option>');
	$('#refTypeS').empty().append('<option value="" selected>--Select--</option>');
	
	var materialTypeS = $("#materialTypeS").val();
	if(materialTypeS == "F"){
		$("#metalTypeSId").hide();
	}else{
		$("#metalTypeSId").show();
	}
	if(materialTypeS =="F"){
		$.each(fgVendors,function(val,key){
			$("#vendorCodeS").append('<option value="'+key.id+'">'+key.name+'</option>');
	    });
		
		$.each(metalSegments,function(val,key){
			$("#segmentS").append('<option value="'+key.id+'">'+key.description+'</option>');
	   });
		
	}else if(materialTypeS =="S"){
		$.each(lsVendors,function(val,key){
			$("#vendorCodeS").append('<option value="'+key.id+'">'+key.name+'</option>');
	    });
		
		$.each(stoneSegments,function(val,key){
			$("#segmentS").append('<option value="'+key.id+'">'+key.description+'</option>');
	   });
	}else if(materialTypeS =="A"){
		$.each(accVendors,function(val,key){
			$("#vendorCodeS").append('<option value="'+key.id+'">'+key.name+'</option>');
	    });
		 
		$.each(accSegments,function(val,key){
			$("#segmentS").append('<option value="'+key.id+'">'+key.description+'</option>');
	   });
	}
	if(materialTypeS =="F"){
		$.each(refTypes,function(val,key){
			if(key.id != "P"){
			   $("#refTypeS").append('<option value="'+key.id+'">'+key.name+'</option>');
			}
	    });
	}else if(materialTypeS =="S"){
		$.each(refTypes,function(val,key){
			if(key.id != "O"){
			  $("#refTypeS").append('<option value="'+key.id+'">'+key.name+'</option>');
			}
	    });
	}else{
		$.each(refTypes,function(val,key){
			if(key.id != "O" && key.id !="P"){
			  $("#refTypeS").append('<option value="'+key.id+'">'+key.name+'</option>');
			}
	    });
	 }
});

$("#segmentS").on("change",function(){
	$("#metalTypeS").empty().append('<option value="" selected>--Select--</option>');
	var matTypec = $("#materialTypeS").val();
	var segmentC = $("#segmentS option:selected").text();
	var segmentId = $("#segmentS").val();
	
	if(matTypec =="F"){
		if(segmentC == "--Select--"){
		 $("#metalTypeS").val("");
		 
		}else if(segmentC == "Diamond"){
			 $("#metalTypeS").val("Gold");
			 $("#metalTypeId").val(1);
		}else{
			 $("#metalTypeS").val(segmentC);	
			 $("#metalTypeId").val(segmentId);	
		}
	}
});

$("#vendorCodeS").on("change",function(){
	$("#materialTypeS").prop("disabled",true);
	$("#metalTypeS").prop("disabled",true);
	$("#segmentS").prop("disabled",true);
	$("#categoryId").prop("disabled",true);
});

$("#refTypeS").on("change",function(){
	$("#vendorCodeS").prop("disabled",true);
	$("#refNoCrtD").empty().append('<option value="" selected>--Select--</option>');
	$("#refNoC").val("")
	$("#refSrlNoC").empty().append('<option value="" selected>--Select--</option>');
	$("#metalLocC").empty().append('<option value="" selected>--Select--</option>');
	
	var refTypeC = $("#refTypeS").val();
	var materialTypeS = $("#materialTypeS").val();
	if(materialTypeS == "F"){
		if(refTypeC == "GR"){
			$("#refNoSId").show();
			$("#refNoSearchId").hide();
			fieldFilters = {
				"fieldFilters" : {
		           "vendorId":$("#vendorCodeS").val(),
		           "segmentId":$("#segmentS").val()
		        }
		    }
			postJSON("/OrderExecution/api/v1/getGRNosBySegmentAndVendor",JSON.stringify(fieldFilters),function(response){
				var response = response.payload.grNos;
				$.each(response,function(key,val){
					$("#refNoS").append('<option value="'+val+'">'+val+'</option>');
				})
			})
		}else{
			$("#refNoSId").hide();
			$("#refNoSearchId").show();
		}
	}else{
		$("#refNoSearchId").show();
		$("#refNoSId").hide();
	}
	if(refTypeC == "S"){
	    $("#refSlNoSHide").hide();
	}else{
		 $("#refSlNoSHide").show();
	}
});

$("#refSlNoS").empty().append('<option value="" selected>--Select--</option>');
$("#refNoS").on("change",function(){
	
	   $("#refSlNoS").empty().append('<option value="" selected>--Select--</option>');
	   var docNo    = $("#refNoS").val();
	   var docType = $("#refTypeS").val();
	   var matTypec = $("#materialTypeS").val();
	   $.getJSON("/OrderExecution/api/v1/getRefDocSrlNosByDocNoAndDocType?materialType="+matTypec+"&docType="+docType+"&docNo="+docNo,function(response){
			var response = response.payload.docSrlNos;
			$.each(response,function(key,val){
				$("#refSlNoS").append('<option value="'+val.id+'">'+val.id+'</option>');
		  });
	 });
});

$("#refNoSearch").on("change",function(){
	
	   $("#refSlNoS").empty().append('<option value="" selected>--Select--</option>');
	   var docNo    = $("#refNoSearch").val();
	   var docType = $("#refTypeS").val();
	   var matTypec = $("#materialTypeS").val();
	   $.getJSON("/OrderExecution/api/v1/getRefDocSrlNosByDocNoAndDocType?materialType="+matTypec+"&docType="+docType+"&docNo="+docNo,function(response){
			var response = response.payload.docSrlNos;
			$.each(response,function(key,val){
				$("#refSlNoS").append('<option value="'+val.id+'">'+val.id+'</option>');
		 });
	 });
});

$("#segmentC").on("change",function(){
	$('#categoryId').empty().append('<option value="" selected>-- Select--</option>');
	var matTypec = $("#matTypeC").val();
	if(matTypec =="S"){
	var params = {
			"fieldFilters" : {
				"suppliedBy" : 'CO',
				"sSegId" : $('#segmentC').val(),
				"sSeg" : $('#segmentC option:selected').text()
			}
		};
		postJSON('api/v1/getStoneCategories', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$.each (data.payload.mainCatList, function(key, val) {
					$('#categoryId').append('<option value="' + val.id + '">' + val.description + '</option>');
				});
			}
		});
	}
	if(matTypec =="A"){
		var params = {
				"fieldFilters" : {
					"suppliedBy" : 'CO',
				}
			};
			postJSON('api/v1/getAccessoryCategories', JSON.stringify(params), function(data) {
				if(1 == data.resCode){
					$.each (data.payload.accCats, function(key, val) {
						$('#categoryId').append('<option value="' + val.id + '">' + val.description + '</option>');
					});
				}
		  });
	 }
});

$("#matTypeC").on("change",function(){
	
	$('#vendorCodeC').empty().append('<option value="" selected>--Select--</option>');
	$('#segmentC').empty().append('<option value="" selected>--Select--</option>');
	$('#refTypeC').empty().append('<option value="" selected>--Select--</option>');
	
	var matTypec = $("#matTypeC").val();
	if(matTypec =="F"){
		$.each(fgVendors,function(val,key){
			$("#vendorCodeC").append('<option value="'+key.id+'">'+key.name+'</option>');
	    });
		
		$.each(metalSegments,function(val,key){
			$("#segmentC").append('<option code="' + key.name + '" value="'+key.id+'">'+key.description+'</option>');
	   });
		
	}else if(matTypec =="S"){
		$.each(lsVendors,function(val,key){
			$("#vendorCodeC").append('<option value="'+key.id+'">'+key.name+'</option>');
	    });
		
		$.each(stoneSegments,function(val,key){
			$("#segmentC").append('<option value="'+key.id+'" segName="'+key.name+'">'+key.description+'</option>');
	   });
	}else if(matTypec =="A"){
		$.each(accVendors,function(val,key){
			$("#vendorCodeC").append('<option value="'+key.id+'">'+key.name+'</option>');
	    });
		 
		$.each(accSegments,function(val,key){
			$("#segmentC").append('<option value="'+key.id+'">'+key.description+'</option>');
	   });
	}
	if(matTypec =="F"){
		$.each(refTypes,function(val,key){
			if(key.id != "P"){
			$("#refTypeC").append('<option value="'+key.id+'">'+key.name+'</option>');
			}
	    });
	}else if(matTypec =="S"){
		$.each(refTypes,function(val,key){
			if(key.id != "O"){
			$("#refTypeC").append('<option value="'+key.id+'">'+key.name+'</option>');
			}
	    });
	}else{
		$.each(refTypes,function(val,key){
			if(key.id != "O" && key.id != "P"){
			$("#refTypeC").append('<option value="'+key.id+'">'+key.name+'</option>');
			}
	    });
	}
});

$("#metalTypeCHide").hide();
$("#segmentC").on("change",function(){
	$("#metalTypeC").empty().append('<option value="" selected>--Select--</option>');
	var matTypec = $("#matTypeC").val();
	var segmentC = $("#segmentC option:selected").text();
	var segmentId = $("#segmentC").val();
	var seg = $("#segmentC option:selected").attr('code');
	
	if(matTypec =="F"){
		if(seg == "--Select--"){
		 $("#metalTypeC").val("");
		}else if(seg == "D"){
			$.getJSON('/OrderExecution/api/v1/getMetalTypeBySegment?segmentId='+$("#segmentC").val(),function(data) {
				 $("#metalTypeC").val(data.payload.metalType.description);
				 $("#metalTypeId").val(data.payload.metalType.id);
			});
		}else{
			 $("#metalTypeC").val(segmentC);	
			 $("#metalTypeId").val(segmentId);	
		}
	}
});

$("#vendorCodeC").on("change",function(){
	$('#gstinC').empty().append('<option value="" selected>--Select--</option>');
	$("#matTypeC").prop("disabled",true);
	$("#metalTypeC").prop("disabled",true);
	$("#segmentC").prop("disabled",true);
	$("#categoryId").prop("disabled",true);
	$.getJSON('/OrderExecution/api/v1/getGSTINsByVendorId?vendorId='+$("#vendorCodeC").val(),function(data){
		$.each(data.payload.gstin,function(k,v){
			$("#gstinC").append('<option value="'+v.id+'">'+v.name+'</option>');
		})
	});
});



$("#refSrlNoC").on("change",function(){
	if($("#refSrlNoC").val() == ""){
		return false;
	}
	$("#stoneAccSlNo").empty().append('<option value="" selected>--Select--</option>');
	var refTypeC = $("#refTypeC").val();
	var matTypeC = $("#matTypeC").val();
	if(matTypeC =="S" || matTypeC =="A"){
		if(refTypeC == "PB" || refTypeC == "CSR"){
			   var docNo    = $("#refNoC").val();
			   var refSrlNoC = $("#refSrlNoC").val();
			   var matTypec = $("#matTypeC").val();
			   $.getJSON("/OrderExecution/api/v1/getStoneAccSrlNoByDocNoAndDocSlNo?materialType="+matTypec+"&docSrlNo="+refSrlNoC+"&docNo="+docNo+"&docType="+refTypeC,function(response){
			   var response = response.payload.stoneAccSrlNos;
				$.each(response,function(key,val){
					$("#stoneAccSlNo").append('<option value="'+val+'">'+val+'</option>');
				})
			});
		}
	}
	 var Params ="";
	if(matTypeC =="F" && refTypeC == "GR"){
		 Params = {
				"fieldFilters" : {
					"materialType":$("#matTypeC").val(),
			        "referenceType":$("#refTypeC").val(),
			        "docNo": $("#refNoCrtD").val(),
			        "docSrlNo":$("#refSrlNoC").val()
			        }
		        }
	    }else if(matTypeC =="F" && refTypeC == "O"){
		       Params = {
				"fieldFilters" : {
					"materialType":$("#matTypeC").val(),
			        "referenceType":$("#refTypeC").val(),
			        "docNo": $("#refNoC").val(),
			        "docSrlNo":$("#refSrlNoC").val()
		
			        }
	 	        }
	       }else if(matTypeC =="S" && refTypeC == "GR" || refTypeC == "PB" || refTypeC == "CSR"){
		     Params = {
				"fieldFilters" : {
					"materialType":$("#matTypeC").val(),
			        "referenceType":$("#refTypeC").val(),
			        "docNo": $("#refNoC").val(),
			        "docSrlNo":$("#refSrlNoC").val(),
			        "segmentId":$("#segmentC").val()
			        }
		        }
	      }
	if(Params !="" && Params != null){
		postJSON("/OrderExecution/api/v1/getLocationCodesByMaterialAndDocType",JSON.stringify(Params),function(response){
			if(response.resCode == "1"){
				var locations = response.payload.locations;
				$.each(locations,function(key,val){
					$("#metalLocC").append('<option selected value="'+val+'">'+val+'</option>');
				})
				$("#metalLocC").prop("disabled",true);
			}else{
				$.growl.error({
					message : response.mesgStr,
					duration : 10000,
					title : 'Error'
				});
			}
		});
	}
});

$("#refTypeC").on("change",function(){
	$("#stoneAccSlNoHide").hide();
	//$("#mrvTypeIdPacket").empty().append('<option value="" selected>--Select--</option>');
	$("#mrvTypeCHideIdPacket").hide();
	var refTypeC = $("#refTypeC").val();
	var matTypeC = $("#matTypeC").val();
	var vendorCode =  $("#vendorCodeC").val();
	if(vendorCode == ""){
		$.growl.error({
			message : "Select Vendor Code",
			duration : 10000,
			title : 'Error'
		});
		$("#refTypeC").val("");
		return false;
	}
	if(matTypeC =="S" || matTypeC =="A" ){
		if(refTypeC == "PB" || refTypeC == "CSR"){
			 $("#stoneAccSlNoHide").show();
		}else{
			 $("#stoneAccSlNoHide").hide();
		}
	}
	if(matTypeC =="F"){
		 if(refTypeC == "GR"){
			    $("#refTypeNoIDHide").hide();
			    $("#refSrlNoCHide").show();
			    $("#refTypeNoID").show();
		 }else if(refTypeC == "S"){
	       	    $("#refSrlNoCHide").hide();
	       		$("#refTypeNoID").hide();
	       		$("#refTypeNoIDHide").show();
	    }else{
				$("#refTypeNoIDHide").show();
				$("#refSrlNoCHide").show();
				$("#refTypeNoID").hide();
		 }
    }else if(matTypeC =="S"){
    	if(refTypeC == "S"){
	    		 $("#refSrlNoCHide").hide();
	    		 $("#refTypeNoID").hide();
	    		 $("#refTypeNoIDHide").show();
    	}else if(refTypeC == "P"){
			     $("#refTypeNoIDHide").hide();
			     $("#refSrlNoCHide").hide();
	    }else{
			    $("#refTypeNoIDHide").show();
			    $("#refSrlNoCHide").show();
			    $("#refTypeNoID").hide();
	    }
   }else if(matTypeC =="A"){
	    if(refTypeC == "S"){
	       	    $("#refSrlNoCHide").hide();
	       		$("#refTypeNoID").hide();
	       		$("#refTypeNoIDHide").show();
	    }else{
    		   $("#refTypeNoIDHide").show();
    		   $("#refSrlNoCHide").show();
    		   $("#refTypeNoID").hide();
	    }
    }
	
	$("#vendorCodeC").prop("disabled",true);
	$("#refNoCrtD").empty().append('<option value="" selected>--Select--</option>');
	$("#refNoC").val("")
	$("#refSrlNoC").empty().append('<option value="" selected>--Select--</option>');
	$("#metalLocC").empty().append('<option value="">--Select--</option>');

	  if(refTypeC == "GR"){
			fieldFilters = {
				"fieldFilters" : {
		           "vendorId":$("#vendorCodeC").val(),
		           "segmentId":$("#metalTypeId").val()
		        }
		    }
			postJSON("/OrderExecution/api/v1/getGRNosBySegmentAndVendor",JSON.stringify(fieldFilters),function(response){
				var response = response.payload.grNos;
				$.each(response,function(key,val){
					$("#refNoCrtD").append('<option value="'+val+'">'+val+'</option>');
				})
			})
		}
	      var Params = "";
		  var matTypeC = $("#matTypeC").val();
		  if( refTypeC == "S" || refTypeC == "CSR" || refTypeC == "PB" || refTypeC == "P" || (refTypeC == "GR" && matTypeC != "F") ){
			  if(matTypeC =="S"){
				 if(refTypeC == "P" || refTypeC =="S" &&  refTypeC != "CSR" && refTypeC != "PB"){
					  Params = {
						"fieldFilters" : {
							"materialType": $("#matTypeC").val(),
					        "referenceType": $("#refTypeC").val(),
					        "segmentId": $("#segmentC").val(),
					        "categoryId": $("#categoryId").val(),
					        }
				        }
				   }else if(refTypeC != "GR" &&  refTypeC != "CSR" && refTypeC != "PB"){
					   Params = {
						"fieldFilters" : {
							"materialType":$("#matTypeC").val(),
					        "referenceType":$("#refTypeC").val(),
					        "segmentId": $("#segmentC").val(),
					        }
				        }
				   }
			  }else{
					 Params = {
						"fieldFilters" : {
							"materialType":$("#matTypeC").val(),
					        "referenceType":$("#refTypeC").val(),
					        }
				        }
		   	  }
			  if(Params != "" && Params != null){
				  if(Params.fieldFilters.referenceType !="S"){
					  postJSON("/OrderExecution/api/v1/getLocationCodesByMaterialAndDocType",JSON.stringify(Params),function(response){
						  if(response.resCode == "1"){
								var locations = response.payload.locations;
								$.each(locations,function(key,val){
									if(refTypeC == "PB" || refTypeC == "CSR" ){
										$("#metalLocC").append('<option selected value="'+val+'">'+val+'</option>');
									}else{
										$("#metalLocC").append('<option  value="'+val+'">'+val+'</option>');
									}
								})
						  }else{
								$.growl.error({
									message : response.mesgStr,
									duration : 10000,
									title : 'Error'
								});
						  }
					  })
				  }
				 
			  }
		  }
			  
		  if(refTypeC == "GR" && matTypeC != "F"){
			 $("#metalLocC").prop("disabled",false);
		  }
		  if(refTypeC == "S"){
		    $("#refSrlNoCHide").hide();
			$("#metalLocC").prop("disabled",true);
		  }
		  if(refTypeC == "O"){
			$("#metalLocC").prop("disabled",true);
		  }
		  if((matTypeC == "S") &&(refTypeC == "PB" || refTypeC == "GR" ||refTypeC == "S")){
				$("#metalLocC").prop("disabled",true);
			  }
		 /* if(refTypeC == "PB"){
			 $("#metalLocC").prop("disabled",false);
		  }*/
		  if(refTypeC == "CSR"){
			 $("#metalLocC").prop("disabled",false);
		  }
		  
		  if(refTypeC == "P"){
			  $("#metalLocC").prop("disabled",false);
			  $("#mrvTypeCHideIdPacket").show();
			  
		  }
});

$("#refSrlNoC").empty().append('<option value="" selected>--Select--</option>');

$("#refNoCrtD").on("change",function(){
	   $("#refSrlNoC").empty().append('<option value="" selected>--Select--</option>');
	   var docNo    = $("#refNoCrtD").val();
	   var docType = $("#refTypeC").val();
	   var matTypec = $("#matTypeC").val();
	   $.getJSON("/OrderExecution/api/v1/getRefDocSrlNosByDocNoAndDocType?materialType="+matTypec+"&docType="+docType+"&docNo="+docNo,function(response){
			var response = response.payload.docSrlNos;
			$.each(response,function(key,val){
				$("#refSrlNoC").append('<option value="'+val.id+'">'+val.id+'</option>');
			});
	 })
});

$("#refNoC").on("change",function(){
	if (this.value.match(/[^0-9]/g)) {
		  this.value = this.value.replace(/[^0-9]/g, '');
	}else{
		   $("#refSrlNoC").empty().append('<option value="" selected>--Select--</option>');
		   var docNo    = $("#refNoC").val();
		   var docType = $("#refTypeC").val();
		   var matTypec = $("#matTypeC").val();
		   $.getJSON("/OrderExecution/api/v1/getRefDocSrlNosByDocNoAndDocType?materialType="+matTypec+"&docType="+docType+"&docNo="+docNo,function(response){
				var response = response.payload.docSrlNos;				
				if(docType =='S'){
					$.each(response,function(key,val){
						$("#metalLocC").append('<option value="'+val.id+'" selected>'+val.id+'</option>');
					})
				}
				

				// Removing Duplicate From Array
				/*var refSlNoVal = [];
				$.each(response, function(i, el){
				    if($.inArray(el, refSlNoVal) == -1) refSlNoVal.push(el);
				});
				*/
				var refSlNoVal = [];
				$.each(response, function (i, e) {
				    var matchingItems = $.grep(refSlNoVal, function (item) {
				       return item.id === e.id;
				    });
				    if (matchingItems.length === 0){
				    	refSlNoVal.push(e);
				    }
				});
				
				$.each(refSlNoVal,function(key,val){
					$("#refSrlNoC").append('<option value="'+val.id+'">'+val.id+'</option>');
				});
		 });
	}
});
//######################################### Search Is Started ######################################
var vendorDetailsSearchGridFieldFilters = function() {
	
    var fromDateS = $("#fromDateS").val();
    var toDateS = $('#toDateS').val();
	var materialTypeS = $('#materialTypeS').val();
	var segmentS = $('#segmentS').val();
	var vendorCodeS = $('#vendorCodeS ').val();	
	var refTypeS = $('#refTypeS').val();
	var refNoSearch = $('#refNoSearch ').val();	
	var refNoS = $('#refNoS ').val();	
	var refSlNoS = $('#refSlNoS').val();	
	var createdByS = $('#createdByS').val();	
	var vendorRetornId = $('#vendorRetornId').val();	
		
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (fromDateS != "" && fromDateS != null) {
		fieldFilters.fieldFilters["fromDate"] = fromDateS;
	}
	if (toDateS != "" && toDateS != null) {
		fieldFilters.fieldFilters["toDate"] = toDateS;
	}
	if (materialTypeS != "" && materialTypeS != null) {
		fieldFilters.fieldFilters["materialType"] = materialTypeS;
	}
	if (segmentS != "" && segmentS != null) {
		fieldFilters.fieldFilters["segmentId"] = segmentS;
	}
	if (vendorCodeS != "" && vendorCodeS != null) {
		fieldFilters.fieldFilters["vendorId"] = vendorCodeS;
	}
	if (refTypeS != "" && refTypeS != null) {
		fieldFilters.fieldFilters["referenceType"] = refTypeS;
	}
	if (refNoSearch != "" && refNoSearch != null) {
		fieldFilters.fieldFilters["docNo"] = refNoSearch;
	}
	if (refNoS != "" && refNoS != null) {
		fieldFilters.fieldFilters["docNo"] = refNoS;
	}
	if (refSlNoS != "" && refSlNoS != null) {
		fieldFilters.fieldFilters["docSrlNo"] = refSlNoS;
	}
	if (createdByS != "" && createdByS != null) {
		fieldFilters.fieldFilters["createdBy"] = createdByS;
	}
	if (vendorRetornId != "" && vendorRetornId != null) {
		fieldFilters.fieldFilters["vrNo"] = vendorRetornId;
	}
	return fieldFilters;
}
function  vendorDetailsSearchGrid() {
	var updateRows = function(rowid, newdata, commit) {
	}
	var datafields = [
		{'name' : 'stoneId','type' : 'int','map':'id'},
		{'name' : 'jwType','type' : 'long'},
		{'name' : 'serialNo','type' : 'long'},
		{'name' : 'vendorCode','type' : 'string','map':'vendorReturnHeader>vendor>vendorCode'},
		{'name' : 'vrNo','type' : 'long','map':'vendorReturnHeader>id'},
		{'name' : 'refDocType','type' : 'string'},
		{'name' : 'refDocNo','type' : 'string'}, 
		{'name' : 'refDocSrlNo','type' : 'float'},
		{'name' : 'grossWt','type' : 'float'},
		{'name' : 'netWt','type' : 'float'}, 
		{'name' : 'pieces','type' : 'float'},
		{'name' : 'vendorReturnMetalRate','type' : 'float'},
		{'name' : 'vendorReturnMetalCost','type' : 'float'}, 
		{'name' : 'mcFullOrPartial','type' : 'float'},
		{'name' : 'mcPerc','type' : 'float'},
		{'name' : 'mcDebitAmt','type' : 'float'}, 
		{'name' : 'mcOriginalAmt','type' : 'float'},
		{'name' : 'mcDebitAmt','type' : 'float'},
		{'name' : 'wastagePerc','type' : 'float'}, 
		{'name' : 'wastageOriginalAmt','type' : 'float'},
        {'name' : 'skinPurity','type' : 'float'}, 
		{'name' : 'wastageOriginalWt','type' : 'string'},
		{'name' : 'wastageDebitWt','type' : 'long'}, 
		{'name' : 'wastageDebitAmt','type' : 'long'},
		{'name' : 'segment','type' : 'string','map':'segment>description'}, 
		{'name' : 'jewelType','type' : 'string','map':'jewelType>description'},
		{'name' : 'vendorItemCost','type' : 'float'},
		{'name' : 'lineItemCost','type' : 'float'},
		{'name' : 'printFlag','type':'string'}
	];

	var columns = [
		{'text' : '','datafield' : '',cellsalign : 'center',columntype : 'checkbox',align : 'center','width' : '5%',sortable : false,    
			cellvaluechanging : function(row, datafield, columntype,oldvalue, newvalue ){
				if(newvalue == true){
					var value = $('#jqxgrid').jqxGrid('getcellvalue', row, 'vrNo');
					$("#jqxgrid").jqxGrid('setcellvalue',row,'printFlag',true);
					printArray.push(value);				}
				else{
						$("#jqxgrid").jqxGrid('setcellvalue',row,'printFlag',false);
					}
			}
		},		
		{'text' : '','datafield' : 'printFlag','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false,hidden : true},
		{'text' : 'Vendor Return No','datafield' : 'vrNo','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Vendor Code','datafield' : 'vendorCode','width' : '4%',cellsalign : 'center',sortable : false,editable : false},
		{'text' : 'Ref Type','datafield' : 'refDocType','width' : '6%',cellsalign : 'center',sortable : false,editable : false},
		{'text' : 'Ref No','datafield' : 'refDocNo','width' : '6%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'Ref Sl No','datafield' : 'refDocSrlNo','width' : '6%',sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Serial Number','datafield' : 'serialNo','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'GRV Type','datafield' : 'jwType','width' : '10%',sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Segment','datafield' : 'segment','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Jewel Code','datafield' : 'jewelType','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Pcs',	'datafield' : 'pieces','width' : '6%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
		{'text' : 'Gross Wt','datafield' : 'grossWt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Net Wt','datafield' : 'netWt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd3'},
		{'text' : 'Purity',	'datafield' : 'skinPurity','width' : '4%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
		{'text' : 'Metal Rate','datafield' : 'vendorReturnMetalRate',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '4%',cellsformat : 'd2'},
		{'text' : 'Metal Cost','datafield' : 'vendorReturnMetalCost','width' : '6%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		{'text' : 'Line Item Cost','datafield' : 'lineItemCost','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		
		{'text' : 'MC/Total Cost','datafield' : 'mcOriginalAmt','width' : '6%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'Fully/Partially','datafield' : 'mcFullOrPartial','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
		{'text' : 'MC %','datafield' : 'mcPerc','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		{'text' : 'MC Debited Amt','datafield' : 'mcDebitAmt','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd2'},
		
		{'text' : 'Wastage Wt.','datafield' : 'wastageOriginalWt','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd3'},
		{'text' : 'Wastage Amt','datafield' : 'wastageOriginalAmt','width' : '6%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd2'},
		{'text' : 'Wastage %',	'datafield' : 'wastagePerc','width' : '6%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
		{'text' : 'Wastage Amt Debited','datafield' : 'wastageDebitAmt',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '5%',cellsformat : 'd2'},
		
		/*{'text' : 'CGST %','datafield' : 'cgstPrc','width' : '4%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'CGST Amt','datafield' : 'cgstAmt','width' : '4%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'SGST %','datafield' : 'sgstPrc','width' : '4%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'SGST Amt',	'datafield' : 'sgstAmt','width' : '4%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
		{'text' : 'IGST %','datafield' : 'igstPrc',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '4%',cellsformat : 'd2'},
		{'text' : 'IGST Amt','datafield' : 'igstAmt','width' : '4%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
		{'text' : 'CESS %',	'datafield' : 'cessPrc','width' : '4%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
		{'text' : 'CESS Amt','datafield' : 'cessAmt',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '4%',cellsformat : 'd2'},
	*/	{'text' : 'Item Amt','datafield' : 'vendorItemCost',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '4%',cellsformat : 'd2'},
		];
	showMyGrid(datafields,"/OrderExecution/api/v1/searchVendorReturnDetails","list",columns,vendorDetailsSearchGridFieldFilters(), updateRows);
	 var columnCheckBox = null;
		$("#jqxgrid").jqxGrid({	
			width : '100%',
	        sortable: true,            
	     	altrows: true,
	     	theme: 'energyblue',
	    	columnsresize: true, 
			rowsheight : 35,
			rowdetails : true,
			virtualmode : true
		});
		
}
var stoneDetailsSearchSearch = function(data){
	var source = {
        localdata: data,
        datatype: "json",
		datafields : [ 
			{'name' : 'id','type' : 'string'},
			{'name' : 'refDocType','type' : 'string','map':"refDocType"},
			{'name' : 'refDocNo','type' : 'long'}, 
			{'name' : 'slNo','type' : 'long','map':"refDocSrlNo"}, 
			{'name' : 'seg','type' : 'string','map':"segment>description"},
			{'name' : 'segId','type' : 'string','map':"segment>id"},
			{'name' : 'mainCat','type' : 'string','map':"category>description"}, 
			{'name' : 'mainCatId','type' : 'string','map':"category>id"}, 
			{'name' : 'subCatOrShape','type' : 'string','map':"subCategory>description"},
			{'name' : 'subCatOrShapeId','type' : 'string','map':"subCategory>id"},
			{'name' : 'shapeDes','type' : 'string','map':"shape>description"},
			{'name' : 'shapeId','type' : 'string','map':"shape>id"},
			{'name' : 'stCode','type' : 'string','map':"stoneCode"},
			
			{'name' : 'clarity','type' : 'string','map':"clarity"},
			{'name' : 'serialNumber','type' : 'int','map':"serialNumber"},
			//{'name' : 'taxStructure','type' : 'string','map':""}, 
			//{'name' : 'meltingPurity','type' : 'string','map':""}, 
			{'name' : 'actCol','type' : 'string','map':"actualColor"},
			{'name' : 'color','type' : 'string','map':"color"},
			{'name' : 'cutGrade','type' : 'string','map':"cutGrade"}, 
			{'name' : 'wtRange','type' : 'string','map':"wtCostSlab"},
			{'name' : 'pcs','type' : 'long','map':"stonePieces"},
			{'name' : 'stWt','type' : 'float','map':"stoneWt"}, 
			{'name' : 'uqc','type' : 'string','map':"uom"},
			{'name' : 'subCategoryDesc','type' : 'string','map':"subCategoryDesc"},
			
			{'name' : 'stRate','type' : 'float','map':"stoneRate"},
			{'name' : 'vendStCost','type' : 'float','map':"stoneCost"},
			{'name' : 'vendPercDeb','type' : 'float','map':"debitPerc"},
			{'name' : 'vendCostDeb','type' : 'float','map':"debitCost"}, 
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridStone").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 70,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
		pageable:true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Stones Details');
		},
		
		columns : [
			{'text' : 'Ref Type','datafield' : 'refDocType','width' : '8%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Ref No','datafield' : 'refDocNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Ref Sl No','datafield' : 'slNo','width' : '5%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'Serial Number','datafield' : 'serialNumber','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Seg','datafield' : 'seg','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Main Cat',	'datafield' : 'mainCat','width' : '7%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Sub Cat','datafield' : 'subCatOrShape',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '7%'},
			{'text' : 'Sub Cat Desc','datafield' : 'subCategoryDesc',editable : false,cellsalign : 'left',	align : 'center',sortable : false,'width' : '7%'},
			{'text' : 'Shape','datafield' : 'shapeDes',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '7%'},
			
			{'text' : 'Stone Code','datafield' : 'stCode','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Clarity','datafield' : 'clarity','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Actual Color','datafield' : 'actCol','width' : '6%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'Color','datafield' : 'color','width' : '6%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Cut Grade','datafield' : 'cutGrade','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center',cellsformat : 'd3'},
			{'text' : 'Wt/Cost Range',	'datafield' : 'wtRange','width' : '7%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center',cellsformat : 'd3'},
			{'text' : 'Pcs','datafield' : 'pcs',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '5%'},
			
			{'text' : 'Stone Wt.','datafield' : 'stWt','width' : '5%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uqc','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Stone Rate','datafield' : 'stRate','width' : '5%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Stone Cost','datafield' : 'vendStCost','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Stone % Debited','datafield' : 'vendPercDeb','width' : '7%',sortable : true,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Stone Cost Debited','datafield' : 'vendCostDeb','width' : '7%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
		]
	});
}

var accessoryDetailsSearchSearch = function(data){
	var source = {
        localdata: data,
        datatype: "json",
        datafields : [ 
        	{'name' : 'id','type' : 'int'},
			{'name' : 'serialNumber','type' : 'string'},
			{'name' : 'refDocType','type' : 'string'},
			{'name' : 'refDocNo','type' : 'long'}, 
			{'name' : 'accSlNo','type' : 'long','map':"refDocSrlNo"}, 
			{'name' : 'accSeg','type' : 'string','map':"segment>description"},
			{'name' : 'accSegId','type' : 'string','map':"segment>id"},
			{'name' : 'subCategoryDesc','type' : 'string','map':"subCategoryDesc"},
			
			{'name' : 'accMainCat','type' : 'string','map':"category>description"}, 
			{'name' : 'accSubCatOrShapeID','type' : 'string','map':"subCategory>description"},
			{'name' : 'accSubCatOrShape','type' : 'string','map':"subCategory>id"},
			{'name' : 'accCode','type' : 'string','map':"accCode"},
			{'name' : 'shapeDes','type' : 'string','map':""},
			{'name' : 'shapeId','type' : 'string','map':""},
			
			{'name' : 'accPcs','type' : 'long','map':"accPieces"},
			{'name' : 'accWt','type' : 'float','map':"accWt"}, 
			{'name' : 'uom','type' : 'string','map':'uom'},
			
			{'name' : 'accRate','type' : 'float','map':"accRate"},
			{'name' : 'vendAccCost','type' : 'float','map':"accCost"},
			{'name' : 'vendAccPercDeb','type' : 'float','map':"debitPerc"},
			{'name' : 'vendAccCostDeb','type' : 'float','map':"debitCost"}, 
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridAcc").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 70,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
		pageable:true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Accessory Details');
		},
		
		columns : [
			{'text' : 'Ref Type','datafield' : 'refDocType','width' : '8%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Ref No','datafield' : 'refDocNo','width' : '5%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Ref Sl No','datafield' : 'accSlNo','width' : '6%',	sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'Serial Number','datafield' : 'serialNumber','width' : '6%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Seg','datafield' : 'accSeg','width' : '7%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Main Cat',	'datafield' : 'accMainCat','width' : '7%',sortable : false,	editable : false,cellsalign : 'center',	align : 'center'},
			{'text' : 'Sub Cat','datafield' : 'accSubCatOrShapeID',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '10%'},
			//{'text' : 'Shape','datafield' : 'shapeDes',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '7%'},
			{'text' : 'Acc Code','datafield' : 'accCode','width' : '7%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Pcs','datafield' : 'accPcs','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
			{'text' : 'Acc Wt','datafield' : 'accWt','width' : '7%',	sortable : false,editable : false,	cellsalign : 'right',	align : 'center',cellsformat : 'd3'},
			{'text' : 'UQC','datafield' : 'uom','width' : '5%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
			{'text' : 'Rate','datafield' : 'accRate','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc Cost',	'datafield' : 'vendAccCost','width' : '9%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'Acc % Debited','datafield' : 'vendAccPercDeb',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '9%',cellsformat : 'd2'},
			{'text' : 'Acc Cost Debited','datafield' : 'vendAccCostDeb','width' : '10%',cellsalign : 'right',	align : 'center',sortable : false,editable : false,cellsformat : 'd2'},
		]
	});
}

var taxDetailsSearch = function(data){
	var source = {
        localdata: data,
        datatype: "json",
        datafields : [ 
        	{'name' : 'id','type' : 'int'}, 
        	{'name' : 'refDocType','type' : 'string'},
			{'name' : 'refDocNo','type' : 'long'}, 
			{'name' : 'refDocSrlNo','type' : 'long'},
			{'name' : 'stoneSrlNo','type' : 'int'},
			{'name' : 'accSrlNo','type' : 'int'},
			{'name' : 'hsnCode','type' : 'string'}, 
			{'name' : 'cgstPrc','type' : 'float'},
			{'name' : 'cgstAmt','type' : 'float'},
			{'name' : 'sgstPrc','type' : 'float'},
			{'name' : 'sgstAmt','type' : 'float'}, 
			{'name' : 'igstPrc','type' : 'float'},
			{'name' : 'isIgst','type' : 'float'}, 
			{'name' : 'igstAmt','type' : 'float'}, 
			{'name' : 'cessPrc','type' : 'float'},
			{'name' : 'cessAmt','type' : 'float'},
			{'name' : 'isService','type' : 'string'},
			{'name' : 'isIgst','type' : 'string'}, 
		]
	};

	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#jqxgridTaxDetails").jqxGrid({
		source : dataAdapter,
		width : '100%',
		editable : true,
		columnsheight : 70,
		autoheight : true,
		altRows : true,
		theme: 'energyblue',
		columnsresize : true,
		pageable:true,
		showtoolbar : true,
		rendertoolbar : function(toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px; margin-bottom: 15px;'></div>");
			toolbar.append(container);
			container.append('<i class="fa fa-list fa-md"></i>&nbsp; Tax Details');
		},
		
		columns : [
			{'text' : '','datafield' : 'id',hidden:true},
			{'text' : '','datafield' : 'isService',hidden:true},
			{'text' : '','datafield' : 'isIgst',hidden:true},
			{'text' : 'Ref Type','datafield' : 'refDocType','width' : '8%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Ref No','datafield' : 'refDocNo','width' : '7%',cellsalign : 'center',align : 'center',sortable : false,editable : false},
			{'text' : 'Ref Sl No','datafield' : 'refDocSrlNo','width' : '7%', sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
			{'text' : 'Stone Sl No','datafield' : 'stoneSrlNo','width' : '7%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'Acc Sl No','datafield' : 'accSrlNo','width' : '7%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'HSN Code','datafield' : 'hsnCode','width' : '8%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
			{'text' : 'CGST %','datafield' : 'cgstPrc','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'CGST Amt','datafield' : 'cgstAmt','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'SGST %','datafield' : 'sgstPrc','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'SGST Amt',	'datafield' : 'sgstAmt','width' : '7%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'IGST %','datafield' : 'igstPrc',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '7%',cellsformat : 'd2'},
			{'text' : 'IGST Amt','datafield' : 'igstAmt','width' : '7%',sortable : false,editable : false,cellsalign : 'right',align : 'center',cellsformat : 'd2'},
			{'text' : 'CESS %',	'datafield' : 'cessPrc','width' : '7%',sortable : false,	editable : false,cellsalign : 'right',	align : 'center',cellsformat : 'd2'},
			{'text' : 'CESS Amt','datafield' : 'cessAmt',editable : false,cellsalign : 'right',	align : 'center',sortable : false,'width' : '7%',cellsformat : 'd2'},
		]
	});
}
$("#search").on("click",function(){
	   printArray = [];
	   $('#jqxgrid').jqxGrid('clear');
	   var fromDateS = $("#fromDateS").val();
	   var toDateS = $("#toDateS").val();
	   var materialTypeS = $("#materialTypeS").val();
	   if((fromDateS == null || fromDateS == "")||(toDateS == null || toDateS == "")||(materialTypeS == null || materialTypeS == "")){
			$.growl.error({
					message : "Please fill all  mandatory field!!",
					duration : 10000
				});
			return false;
		 }
	   
	$(".tabDisabledS").addClass("tabDisabled");
	$("#gridTabs").tabs({
		disabled:[]
	});
	var materialTypeS = $("#materialTypeS").val();
	if(materialTypeS == "S"){
		$("#accDetails").hide();
		$("#stoneDetails").show();
		$("#home").show();
	}else if(materialTypeS == "A"){
		$("#stoneDetails").hide();
		$("#accDetails").show();
		$("#home").show();
	}else if(materialTypeS == "F"){
		$("#accDetails").show();
		$("#home").show();
		$("#stoneDetails").show();
	}
	    activaTab('tab0default');
		$("#gridTabs").show();
		vendorDetailsSearchGrid();
		$("#jqxgrid").show();
		$("#taxDetails").show();
});

$(".tabDisabledS").addClass("tabDisabled");
$("#gridTabs").tabs({
	disabled:[]
});

var dataArr = [];
$("#jqxgrid").bind('cellendedit', function (event,index) {
	var i =event.args.rowindex;
	
	    if (event.args.value) {
	      $("#jqxgrid").jqxGrid('selectrow', event.args.row);
	        dataArr.push(i);
	       $(".tabDisabledS").removeClass("tabDisabled");
	   	    }
	    else {
	        $("#jqxgrid").jqxGrid('unselectrow', event.args.row);
	        var delArr = dataArr.splice(i,1);
	    }
	    if($("#jqxgrid").jqxGrid("getselectedrowindexes") <= 0)
		{
	    	$(".tabDisabledS").addClass("tabDisabled");
		}
	    $.each(dataArr, function(key, val) {
	    		var data =$("#jqxgrid").jqxGrid('getrowdata',val);
	    });
	});

function selectedCheckBox()
{
	var dataArr1 = [];
	var stoneData =  $("#jqxgrid").jqxGrid("getselectedrowindexes");
	$.each(stoneData, function(key, val) {
		dataArr1.push(val.stoneId);
	});
	return dataArr1;
}

function stoneDetailFieldFilters(stoneId)
{
	fieldFilters = {
	"fieldFilters" : {}
	};
	if(stoneId !="" && stoneId != null)
	{
		fieldFilters.fieldFilters["ids"] =stoneId;
	}
	return fieldFilters;
}

$("#stoneDetails").click(function(){
	var vendorIdArray = [];
	vendorIdArray= selectedCheckBox();
	var stoneId = vendorIdArray.join(",");
    postJSON('/OrderExecution/api/v1/searchVendorReturnStoneDetails',JSON.stringify(stoneDetailFieldFilters(stoneId)),function(response) {
	var data = response.payload.list;
	stoneDetailsSearchSearch(data);
	$('#jqxgridStone').show();
    });
});

$("#accDetails").click(function(){
	var vendorIdArray = [];
	vendorIdArray= selectedCheckBox();
	var stoneId = vendorIdArray.join(",");
    postJSON('/OrderExecution/api/v1/searchVendorReturnAccDetails',JSON.stringify(stoneDetailFieldFilters(stoneId)),function(response) {
	var data = response.payload.list;
    accessoryDetailsSearchSearch(data);
    $("#jqxgridAcc").show();
    });
});

$("#taxDetails").click(function(){
	var vendorIdArray = [];
	vendorIdArray= selectedCheckBox();
	var stoneId = vendorIdArray.join(",");
    postJSON('/OrderExecution/api/v1/searchVendorReturnTaxDetails',JSON.stringify(stoneDetailFieldFilters(stoneId)),function(response) {
	var data = response.payload.list;
	taxDetailsSearch(data);
    $("#jqxgridTaxDetails").show();
    });
})
//############################### (MOdel POp Up) Stone LOV's Started Here ###############################

$("#packetIdHide").hide();
$('.modal').on('hidden.bs.modal', function() {
	$("#addStoneDetailsId").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("#addStoneDetailsId").trigger("reset");
});


$("#stoneSubCatSection").hide();
var onLoadStoneLov = function(){
	$.getJSON('/OrderExecution/api/v1/getWeightRange', function(data) {	
		$('#wtRangeC').empty().append('<option value="" selected>--Select--</option>');
			$.each(data.payload.weightRange, function(key, val) {
			$('#wtRangeC').append('<option value="' + val.id + '">' + val.fromToRange + '</option>');
		});
	});
}

onLoadStoneLov();

$("#segmentC").on('change',function(){
	if($("#segmentC option:selected").text() == "Diamond"){
		$("#stoneShapeSection").show();
		$("#stoneSubCatSection").hide();
		$("#wtRangeSection").show();
		$("#claritySection").show();
		$("#colorSection").show();
		$("#cutGradeSection").show();
		$("#subCatSection").show();
	}else{
		$("#stoneShapeSection").hide();
		$("#stoneSubCatSection").show();
		$("#wtRangeSection").hide();
		$("#claritySection").hide();
		$("#colorSection").hide();
		$("#cutGradeSection").hide();
		$("#actualColorSection").hide();
		$("#subCatSection").hide();
	}
	
});

$("#categoryId").on('change',function(){
    var params = {
		"fieldFilters" : {
			"suppliedBy" : 'CO',
			"sSegId" : $('#segmentC').val(),
			"sSeg" : $('#segmentC option:selected').text(),
			"catId" : $("#categoryId").val(),
			"vId"   : $("#vendorCodeC").val()
		}
    };
    
    if( $('#segmentC option:selected').text() == "Diamond") {
		postJSON('/OrderExecution/api/v1/getShapes', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$('#stoneShapeC').empty().append('<option value="" selected>-- Select--</option>');
				$.each (data.payload.subCatList,  function(key, val) {
					$('#stoneShapeC').append('<option value="' + val.id + '">' + val.description + '</option>');
				});
			}
		});
    }else{
		postJSON('/OrderExecution/api/v1/getStoneSubCategories', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$('#stoneSubCatC').empty().append('<option value="" selected>-- Select--</option>');
				$.each (data.payload.subCatList, function(key, val) {
					$('#stoneSubCatC').append('<option  code="' + val.id + '" value="' + val.name + '">' + val.description + '</option>');
				});
			}
		});
    }
});
$("#stoneShapeC").on("change", function() {
	if($("#segmentC option:selected").text() == "Diamond"){
		if($("#stoneMainCatC").val() == "CD Melees" || $("#stoneMainCatC").val() =="CD Pointers" || $("#stoneMainCatC").val() =="CD Solitaire")
		{
			$("#actualColorSection").show();
		}else{
			$("#actualColorSection").hide();
		}
	}
	var params = {
    		"fieldFilters":{
    			"segId" : $('#segmentC').val(),
    			"catId" : $("#categoryId").val(),
    			"suppliedBy": 'CO',
    			"shapeId": $("#stoneShapeC").val(),
    			"vId"   : $("#vendorCodeC").val()
    		}
    	};
        $('#clarityC').empty().append('<option value="" selected>-- Select--</option>');
        $('#colorC').empty().append('<option value="" selected>-- Select--</option>');
        $('#cutGradeC').empty().append('<option value="" selected>-- Select--</option>');
        $('#actualColorC').empty().append('<option value="" selected>-- Select--</option>');
		
        
		postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$("#stoneArticleCodeC").val(data.payload.stoneDetails.name);
				$.each (data.payload.cutGrade , function(key, val) {					
					$('#cutGradeC').append('<option value="' + val.id + '">' + val.id + '</option>');
				});
				
				$.each (data.payload.color , function(key, val) {
					$('#colorC').append('<option value="' + val.id + '">' + val.id + '</option>');
				});	
				
				$.each (data.payload.clarity, function(key, val) {					
					$('#clarityC').append('<option value="'	+ val.id + '">' + val.id + '</option>');
				});	
				
				$.each (data.payload.actualColor, function(key, val) {
					$('#actualColorC').append('<option value="' + val.id + '">' + val.id + '</option>');
				});		
				
				$("#uomC").val(data.payload.uom);
			}
		});
});

$("#stoneSubCatC").on("change", function() {
        var params = {
    		"fieldFilters": {
    			"segId" : $('#segmentC').val(),
    			"catId" : $("#categoryId").val(),
    			"suppliedBy": 'CO',
    			"subCatCode": $("#stoneSubCatC").val()
    		}
        }; 
        postJSON('/OrderExecution/api/v1/getStoneCodeAndOthers', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$("#stoneArticleCodeC").val(data.payload.stoneDetails.name);
				$("#uomC").val(data.payload.stoneDetails.value);
			}
        });
});

$("#cutGradeC").on('change',function(){
	var subCatDescp = $('#segmentC option:selected').text() + " " +  $('#stoneMainCatC option:selected').text() + " " + $('#stoneShapeC option:selected').text()
	  + " " + $('#clarityC option:selected').text() + " " + $('#cutGradeC option:selected').text() + " " + $('#wtRangeC option:selected').text();
	$("#subCatDescriptionDesc").val(subCatDescp);
	$("#subCatDescription").html(subCatDescp);
	
	 var params = {
	    		"fieldFilters": {
	    			"segmentId" : $('#segmentC').val(),
	    			"categoryId" : $("#categoryId").val(),
	    			"shape": $("#stoneShapeC option:selected").text(),
	    			"wtCostRange": $("#wtRangeC option:selected").text(),
	    			"cut" : $('#cutGradeC').val(),
	    			"color" : $("#colorC option:selected").text(),
	    			"clarity": $("#clarityC").val(),
	    			"grvType" :($("#mrvTypeIdPacket").val() == "Dealer") ? "D" : "C" ,
	    		}
	        }; 
     $('#packetIdC').empty().append('<option value="" selected>-- Select--</option>');
     postJSON('/OrderExecution/api/v1/getPacketDetailsForVR', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$.each (data.payload.packetNos, function(key, val) {
					$('#packetIdC').append('<option value="' + val + '">' + val + '</option>');
				});		
			}
   });
});

$("#segmentC").on('change',function(){
	$("#cutGradeC").val("");
});

$("#stoneMainCatC").on('change',function(){
	$("#cutGradeC").val("");
});

$("#stoneShapeC").on('change',function(){
	$("#cutGradeC").val("");
});

$("#clarityC").on('change',function(){
	$("#cutGradeC").val("");
});

$("#wtRangeC").on('change',function(){
	$("#cutGradeC").val("");
});

$("#stoneSubCatC").on("change",function(){
 var params = {
		"fieldFilters": {
			
			"grvType" :($("#mrvTypeIdPacket").val() == "Dealer") ? "D" : "C" ,
			"segmentId" : $('#segmentC').val(),
			"categoryId" : $("#categoryId").val(),
			"subCategoryId": $("#stoneSubCatC  option:selected").attr('code'),
		}
    }; 
        $('#packetIdC').empty().append('<option value="" selected>-- Select--</option>');
        postJSON('/OrderExecution/api/v1/getPacketDetailsForVR', JSON.stringify(params), function(data) {
			if(1 == data.resCode){
				$.each (data.payload.packetNos, function(key, val) {
					$('#packetIdC').append('<option value="' + val + '">' + val + '</option>');
				});		
		}
    });
});

$("#addStones").on('click',	function() {
	
	var stoneShapeC = $("#stoneShapeC").val();
	var stoneArticleCodeC =$("#stoneArticleCodeC").val();
	var wtRangeC = $("#wtRangeC").val();
	var clarityC = $("#clarityC").val();
	var colorC = $("#colorC").val();
	var cutGradeC = $("#cutGradeC").val();
	var packetIdC = $("#packetIdC").val();
	var stPcsC = $("#stPcsC").val();
	var stWtC = $("#stWtC").val();
	
	if($("#segmentC option:selected").text() == "Diamond"){
		if($("#categoryId option:selected").text()=="CD Melees" || $("#categoryId option:selected").text()=="CD Pointers" || $("#categoryId option:selected").text()=="CD Solitaire")
		{
			if($("#actualColorC").val() == null || $("#actualColorC").val() == ""){
				$.growl.error({
					message : "Please fill all  mandatory field!!",
					duration : 10000
				});
			return false;
			}
		}
		if(stoneShapeC == null || stoneShapeC == "" || stoneArticleCodeC == null || stoneArticleCodeC == "" || wtRangeC == null || wtRangeC == ""
			|| clarityC == null || clarityC == "" || colorC == null || colorC == "" || cutGradeC == null || cutGradeC == ""
			|| packetIdC == null || packetIdC == "" || stPcsC == null || stPcsC == "" || stWtC == null || stWtC == ""){
			$.growl.error({
				message : "Please fill all  mandatory field!!",
				duration : 10000
			});
		return false;
		}
	}else{
		if(stoneSubCatC == null || stoneSubCatC == "" || stoneArticleCodeC == null || stoneArticleCodeC == ""
			|| packetIdC == null || packetIdC == "" || stPcsC == null || stPcsC == "" || stWtC == null || stWtC == ""){
			$.growl.error({
				message : "Please fill all  mandatory field!!",
				duration : 10000
			});
		return false;
		}
	}
	
	var packetIdC = $('#packetIdC').val();
	var stPcsC = $('#stPcsC').val();
	var stWtC = $('#stWtC').val();
	var uomC = $('#uomC').val();
	$("#packetIdHide").show();
	$("#packetId").val(packetIdC);
	$("#stonePcsHidden").val(stPcsC);
	$("#stoneWtCode").val(stWtC);
	$("#stoneUom").val(uomC);
	$('#addStoneDetails').modal('hide');
	$('#addStoneDetailsId').trigger("reset");
	
});

var stoneModelPopUp = function() {
	$("#refTypeC").on("change",function(){
    var refTypeC = $("#refTypeC").val();
    if(refTypeC == "P"){
    	var segmentC = $("#segmentC option:selected").text();
    	var mainCat = $("#categoryId option:selected").text();
    	$('#stoneSegC').val(segmentC);
    	$('#stoneMainCatC').val(mainCat);
    	$('#addStoneDetails').modal('show')
        }
	});
}

$('#print').click(function(){
	var printArray1 = [];
	var fgData =  $("#jqxgrid").jqxGrid("getrows");
	console.log(fgData);
		$.each(fgData, function(key, val) {
			console.log(val);
			if(val.printFlag == true){
				printArray1.push(val.vrNo);
			}
			
		});
	
	console.log(printArray1.toString());
	var ids = printArray1.toString();
	var materialType = $("#materialTypeS").val();
	
	if(materialType=='F'){
	var fieldFilters = {
        "fieldFilters" : {
            "MaterialType" :materialType,
            "PurchaseReturnId" : ids,
            "mode" : "pdf",
            "reportName" : "RPT_Purchase_Return"
        }
    };
	
	jasperReport('RPT_Purchase_Return_FG.pdf', fieldFilters);
	}
	else if(materialType=='S'){
		var fieldFilters = {
	        "fieldFilters" : {
	            "MaterialType" :materialType,
	            "PurchaseReturnId" : ids,
	            "mode" : "pdf",
	            "reportName" : "RPT_Purchase_Return_DSA"
	        }
	    };
		
		jasperReport('RPT_Purchase_Return_DSA.pdf', fieldFilters);
		}
	else if(materialType=='A'){
		var fieldFilters = {
	        "fieldFilters" : {
	            "MaterialType" :materialType,
	            "PurchaseReturnId" : ids,
	            "mode" : "pdf",
	            "reportName" : "RPT_Purchase_Return_DSA"
	        }
	    };
		
		jasperReport('RPT_Purchase_Return_DSA.pdf', fieldFilters);
		}
	
	
})

