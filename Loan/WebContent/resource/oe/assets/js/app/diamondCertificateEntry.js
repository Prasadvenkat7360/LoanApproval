/*  ##	Author1 (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Manoranjan Mishra
	##	Date Creation 	: 	18-09-2017
	## 	Description		:	Diamond Certificate Entry and search Functionality,
	## Modification     :   Integration(05-01-2018)  ### POOJA SANGVE
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

$("#hideCreateDiamondCert").hide();
$("#hideDaimondCertSearch").show();
//$("#backFromCreate").hide();

$("#fgGrSearch").show();
$("#stoneGRSearch").hide();

var daimondArrS = [];
var onLoadDropDownForEnteringDiamondCert = function(){
	 $("#actualColorC").empty().append('<option value="" selected>--Select--</option>');
	 $("#flourC").empty().append('<option value="" selected>--Select--</option>');
	 $("#scitnC").empty().append('<option value="" selected>--Select--</option>');
	 $("#brilienceC").empty().append('<option value="" selected>--Select--</option>');
	 $("#gridleThicknessC").empty().append('<option value="" selected>--Select--</option>');
	 $("#symmetryC").empty().append('<option value="" selected>--Select--</option>');
	 
	 $("#gradIntensC").empty().append('<option value="" selected>--Select--</option>');
	 $("#fireC").empty().append('<option value="" selected>--Select--</option>');
	 $("#polishC").empty().append('<option value="" selected>--Select--</option>');
	 $("#cultSizeC").empty().append('<option value="" selected>--Select--</option>');
	 
	 $("#labCode1C").empty().append('<option value="" selected>--Select--</option>');
	 $("#labCode2C").empty().append('<option value="" selected>--Select--</option>');
	 var id ;
	 var stoneSlNum;
	 var grSlNumb; 
	var rows = $("#jqxgrid").jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		console.log(rows[i]);
		var row = rows[i];
		id = row.code;
		if(rows[i].grNo  == $("#grNoS").val()){
			grSlNumb = rows[i].grSrlNo;
			stoneSlNum = rows[i].stoneSrlNo;
		}
	}
	
	if(id != ""){
	 $.getJSON("/OrderExecution/api/v1/getDiCertificateLOV?stonecode="+id,function(data){
		$.each(data.payload.stoneColor,function(key, val){
			$("#colorGradC").append('<option  value="'+val.id+'">'+val.name+'</option>');
		    });
		$.each(data.payload.actualcolor,function(key, val){
			$("#actualColorC").append('<option  value="'+val.id+'">'+val.name+'</option>');
		    });
         });
	  }
	
	 $.getJSON("/OrderExecution/api/v1/dcertificatLOV",function(data){
		
		 $.each(data.payload.fluorence,function(key, val){
			$("#flourC").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.scintliation,function(key, val){
			$("#scitnC").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.briliance,function(key, val){
			$("#brilienceC").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.griddle,function(key, val){
			$("#gridleThicknessC").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.symentry,function(key, val){
			$("#symmetryC").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.intencity,function(key, val){
			$("#gradIntensC").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.fire,function(key, val){
			$("#fireC").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.polish,function(key, val){
			$("#polishC").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.culetSize,function(key, val){
			$("#cultSizeC").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
	 });
	 
	
	 var fieldFilters = {
			 fieldFilters:{
				 "refdocNo":$("#grNoS").val(),
				 "refsrlno":grSlNumb,
				 "refStoneSrlNo" : stoneSlNum
			 }
	 }
	 
	 postJSON('/OrderExecution/api/v1/getFgGrStone',JSON.stringify(fieldFilters),function(data) {
		  stoneDes = data.payload.stone;
				 $("#colorGradC").val(stoneDes.color)
				 $("#shapeC").val(stoneDes.shape);
				 $("#cutGradC").val(stoneDes.cutGrade);
				 $("#clarityGradC").val(stoneDes.clarity);
				 $("#caratWtC").val(stoneDes.stoneUsedWt)
	       });
      
	 $.getJSON("/OrderExecution/api/v1/diamondLOV",function(data){
		 
		  daimondArrS = data.payload.labLov;
		 $.each(daimondArrS,function(key, val){
			$("#labCode1C").append('<option  value="'+val.id+'">'+val.id+'</option>');
			//$("#labCode2C").append('<option  value="'+val.id+'">'+val.id+'</option>');
		 });
	 });
 }

$('#labCode1C').on('change', function(){
	$('#labCode2C').empty().append('<option value="" selected>--Select--</option>');
	var value = $('#labCode1C').val();
	
	$.each(daimondArrS, function(key, val) {
		if(value != val.id){
			$("#labCode2C").append('<option  value="'+val.id+'">'+val.id+'</option>');
		}
	});
});
var onLoadDropDown = function(fgStoneGR = null){
	var fgGRORStoneGRArray = [{
		"id" : "fgGr",
		"name" : " FG Gr"
	},{
		"id" : "stoneGr",
		"name" : " Stone Gr"
	}];

	$("#fgGRORStoneGR").empty();
	 $("#fgGRORStoneGRStone").empty();
	$.each(fgGRORStoneGRArray,function(key, val){
	  
		if(fgStoneGR == null){
			if(val.id == "fgGr"){
				$("#fgGRORStoneGR").append('<option selected value="'+val.id+'">'+val.name+'</option>');
			}else{
				$("#fgGRORStoneGR").append('<option value="'+val.id+'">'+val.name+'</option>');
			}

	   }else {	
		   
		   if(fgStoneGR == "stoneGr"){
			   if(val.id == fgStoneGR){
				   $("#fgGRORStoneGRStone").append('<option selected value="'+val.id+'">'+val.name+'</option>');
			   }else{
				   $("#fgGRORStoneGRStone").append('<option  value="'+val.id+'">'+val.name+'</option>');
			   }
		   }else if(fgStoneGR == "fgGr"){
			   if(val.id == fgStoneGR){
				   $("#fgGRORStoneGR").append('<option selected value="'+val.id+'">'+val.name+'</option>');
			   }else{
				   $("#fgGRORStoneGR").append('<option  value="'+val.id+'">'+val.name+'</option>');
			   }
		   }
	   }
	})
}

onLoadDropDown();
$("#fgGRORStoneGR").on('change', function(){
	var value = $(this).val();
	onLoadDropDown(value);
	$("#stoneGRSearch").show();
	$("#fgGrSearch").hide();

	$("#jqxgridLSStones").hide();
	$("#jqxgrid").hide();
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgridLSStones").jqxGrid('clear');
	
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

$("#fgGRORStoneGRStone").on('change', function(){
	var value = $(this).val();
	onLoadDropDown(value);
	
	$("#fgGrSearch").show();
	$("#stoneGRSearch").hide();

	$("#jqxgrid").hide();
	$("jqxgridLSStones").hide();
	
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgridLSStones").jqxGrid('clear');
	
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

//################################## On load API calls ####################################
var onLoadFunction = function(){
	
$("#grNoS").empty().append('<option value="" selected>--Select--</option>');
$("#grSlrNo").empty().append('<option value="" selected>--Select--</option>');

$.getJSON("/OrderExecution/api/v1/fgGrLOV",function(data){
	$.each(data.payload.diamondCertificate,function(key,val){
	    $("#grNoS").append('<option value="'+val.name+'">'+val.id+'</option>');
	})
})
}

 onLoadFunction();
 $("#grNoS").on("change", function() {
		var mrvId = $("#grNoS option:selected").text().split('-');
		
		mrvNo = mrvId[0];
		mrvSrl =  mrvId[1];
		
		$("#grSlrNo").val(mrvSrl);
	});
//###################################### Field Filters ###################################################
 
var feildFiterObjt = {}
function diamonfCertFilter() {
	var grNoS = $('#grNoS option:selected').text();
	var res = grNoS.split("-");
	feildFiterObjt={
			"srlNo":res[1],
			"grNo":res[0]
	   }
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (grNoS != "" && grNoS != null) {
		fieldFilters.fieldFilters["grheader"] = res[0];
	}
	if (grSlrNo != "" && grSlrNo != null) {
		fieldFilters.fieldFilters["stonesrl"] = res[1];
	}
	return fieldFilters;
}

var addDaimond = function(row, column, value) {

	return '<a class="btn btn-primary voffset" type="button" id=' + row + ' onclick="addDaimondView('+ value + ','+row+')" href="javascript:void(0);"/>Cert Entry </a>'
}

//###################################### Search Grid  ###################################################

var  diamonfCertGrid = function() {
	
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'grNo','type' : 'int'},
		{'name' : 'grSrlNo','type' : 'int'},
		{'name' : 'stoneSrlNo','type' : 'int'}, 
		{'name' : 'suppliedBy','type' : 'string'},
		{'name' : 'code','type' : 'string'},
		{'name' : 'subCategoryDesc','type' : 'string'}, 
		{'name' : 'stonepcs','type' : 'string'},
		{'name' : 'stoneWt','type' : 'float'},
		{'name' : 'grStoneId','type' : 'int'}, 
		];

	var columns = [
		{'text' : 'GR No','datafield' : 'grNo','width' : '11%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'GR Srl No','datafield' : 'grSrlNo','width' : '13%',sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Stone Srl No','datafield' : 'stoneSrlNo','width' : '12%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Supplied By','datafield' : 'suppliedBy','width' : '12%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Stone Code','datafield' : 'code','width' : '12%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Category','datafield' : 'subCategoryDesc','width' : '12%',sortable : false,editable : false,cellsalign : 'left',align : 'center'},
		{'text' : 'Stone Pcs','datafield' : 'stonepcs','width' : '10%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Stone Wt','datafield' : 'stoneWt','width' : '11%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd3'},
		{'text' : '','datafield' : 'grStoneId',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '7%',cellsrenderer : addDaimond}
		];

	showMyGrid(datafields, "/OrderExecution/api/v1/fgGrStnSearch","list",columns,diamonfCertFilter(),updateRows, "");
	
	$("#jqxgrid").jqxGrid({	
        sortable: false,            
	   	altrows: true,
	  	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		rowdetails : true,
		virtualmode : true	
	});
}


$("#search").on("click",function(){
	var grNoS=$("#grNoS").val();
	var grSlrNo=$("#grSlrNo").val();
	
	if((grSlrNo == ""  || grSlrNo == null) || (grNoS == "" || grNoS == null)){
		$.growl.error({
				message : "Please fill all  mandatory field!!",
			duration : 10000
		});
		return false;
	}
	diamonfCertGrid();
	$("#jqxgrid").show();
})


var addDaimondView = function(id) {
	
	$("#fgLooseStonesC").val("FG Gr");
	onLoadDropDownForEnteringDiamondCert();
	$("#statusC").val(true);
	$("#refDoctC").val("FG_GR");
	$("#refDate").val(dateOutput);
	$("#hideCreateDiamondCert").show();
	$("#hideDaimondCertSearch").hide();
	$("#backFromCreate").show();
};

$('#labCertNo2C').on("change",function() {
	if (this.value.match(/[^0-9]/g)) {
	   this.value = this.value.replace(/[^0-9]/g, '');
	}
});
$('#labCertNoC').on("change",function() {
	if (this.value.match(/[^0-9]/g)) {
	   this.value = this.value.replace(/[^0-9]/g, '');
	}
});
function validateNumber1(val) {
	var regex = /^\d{0,9}(\.\d{0,3})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(3);
	}
	return '';
}; 


 var saveDiamondEntry = function(){

	var labCode1C =  $("#labCode1C").val();
	var labCertNoC =  $("#labCertNoC").val();
	//var uploadImgC =  $("#uploadImgC").val();
	var shapeC = $("#shapeC").val();
	var caratWtC = $("#caratWtC").val();
	var colorGradC = $("#colorGradC").val();
	var clarityGradC = $("#clarityGradC").val();
	var cutGradC = $("#cutGradC").val();
	var clarityRemarksC = $("#clarityRemarksC").val();
	var flourC = $("#flourC").val();
	
	var measurmentC = $("#measurmentC").val();
	var diaMinC = $("#diaMinC").val();
	var diaMaxC = $("#diaMaxC").val();
	var diaAvgC = $("#depthC").val();
	var polishC = $("#polishC").val();
	var symmetryC = $("#symmetryC").val();
	
	/* if(caratWtC < 0 || caratWtC > 99) {
		 $.growl.error({
				message :"Carat Wt Entered should be less then or equal to 99 !!" ,
				duration : 10000,
				title : 'Error'
			});
		     return false;
      }
	*/
	
if((labCode1C == null || labCode1C == "" )|| (labCertNoC == null || labCertNoC == "")
	|| (shapeC == null || shapeC == "" ) || (caratWtC == null || caratWtC == "") 
	|| (colorGradC == null || colorGradC == "" )||( clarityGradC == null || clarityGradC == "") 
	|| (cutGradC == null || cutGradC == "" )|| (clarityRemarksC == null || clarityRemarksC == "")
	|| (flourC == null || flourC == "") ||( measurmentC == null || measurmentC == "") ||( diaMinC == null || diaMinC == "")
    || (diaMaxC == null || diaMaxC == "") ||( diaAvgC == null || diaAvgC == "") 
    ||( polishC == null || polishC == "")|| (symmetryC == null || symmetryC == "" ))
	  {
			$.growl.error({
				message :"Please fill all mandatory fields !!" ,
				duration : 10000,
				title : 'Error'
			});
		     return false;
		     
	} else {
	var rows = $("#jqxgrid").jqxGrid('getrows');
	
	for (var i = 0; i < rows.length; i++) {
	var row = rows[i];
	var stoneCode = row.code;
	var stoneSrlNo = row.stoneSrlNo;
	var grStoneId = row.grStoneId; 
	console.log(row);
	
	var labcode2 = $("#labCode2C").val();
	var labCertNo2CLS  =   $("#labCertNo2C").val()
	 if((labcode2 == null || labcode2 =="")||(labCertNo2CLS == null || labCertNo2CLS =="")){
	   var daimondLabDetFrst = [
		    {
		      "labName":  $("#labCode1C").val(),
		      "labCertificateNumber": $("#labCertNoC").val(),
		    }]
	 }else{
		  var daimondLabDetFrst = [
			    {
			      "labName":  $("#labCode1C").val(),
			      "labCertificateNumber": $("#labCertNoC").val(),
			    },
			    {
			      "labName":  $("#labCode2C").val(),
				  "labCertificateNumber": $("#labCertNo2C").val(),
				}
	     ]
	 }
	var saveDiamondDet = {
		  "looseStoneStockId": $("#CompCertNoC").val(),
		 // "vendorCode": "1",
		  "diamondShape": $("#shapeC").val(),
		  "carratWeight": $("#caratWtC").val(),
		  "color": $("#colorGradC").val(),
		  "clarity": $("#clarityGradC").val(),
		  "cut": $("#cutGradC").val(),
		  "intenSityColor": $("#gradIntensC").val(),
		  "clarityRemarks":$("#clarityRemarksC").val(),
		  "inScription": $("#inscriptionC").val(),
		  "remarks":  $("#remarksC").val(),
		  "mesurments": $("#measurmentC").val(),
		  "diameterMin": $("#diaMinC").val(),
		  "diameterMax": $("#diaMaxC").val(),
		  "diameterAverage": $("#diaAvgC").val(),
		  "tableSize": $("#tablemmC").val(),
		  "tablePercentage": $("#tablePercC").val(),
		  "crownAngle": $("#crownAngelC").val(),
		  "crownHeight": $("#crownHeightC").val(),
		  "pavlionAngle": $("#pavilionAngC").val(),
		  "pavlionDepth": $("#pavilionC").val(),
		  "starFacetLength": $("#starFacetC").val(),
		  "loweGride": $("#lowerGridleC").val(),
		  "gridlethickNess": $("#gridleThicknessC").val(),
		  "culetSize": $("#cultSizeC").val(),
		  "floresense": $("#flourC").val(),
		  "polish": $("#polishC").val(),
		  "symmentry": $("#symmetryC").val(),
		  "brillance": $("#brilienceC").val(),
		  "fire": $("#fireC").val(),
		  //"imagePath": "1",
		  "refDoctype": $("#refDoctC").val(),
		  "refDocDate": $("#refDate").val(),
		  "fGLooseStoneGr": $("#fgLooseStonesC").val(),
		  "fgStock": $("#stockNoC").val(),
		  "actulaColor": $("#actualColorC").val(),
		  "clolorDesign": $("#colorOriginC").val(),
		  "colorDistribution": $("#colorDisC").val(),
		  "status":true, 
		  "stoneCode": stoneCode,
		  "depth": $("#depthC").val(),
		  "refDocStoneSrlNo": stoneSrlNo,
		  "refdocNo" : $("#grNoS").val(),
		  "refdocsrlNo":$("#grSlrNo").val(),
		  "grStoneId":grStoneId,
		  "diamondCertificateLabDTOs": daimondLabDetFrst,
		}
	return saveDiamondDet;
    }
  }
}


$("#saveDaimondEntryCreated").on("click",function(){
	var fieldFilters = saveDiamondEntry();
	if (fieldFilters) {
		postJSON('/OrderExecution/api/v1/saveCertificate ',JSON.stringify(fieldFilters),function(data) {

			if (data.resCode == "1") {	
			var  lab1 =  $('#lab1Id').val(data.payload.labids.id);
		    var  lab2 = $('#lab2Id').val(data.payload.labids.name);
			processFileUpload("diamondCertUpload");
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			window.location.href="javascript:showContentPage('diamondCertificateEntry', 'bodySwitcher')";
			return window.location.href;
			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				});
			 }
	    });
		/*var fieldFiltersComplete ={
				"fieldFilters": {
					"refdocNo" : feildFiterObjt.grNo,
					"refsrlno" : feildFiterObjt.srlNo,
					}
		       }
	if (fieldFiltersComplete){
		postJSON('/OrderExecution/api/v1/ccomplteFGCertificate',JSON.stringify(fieldFiltersComplete),function(data) {
			if (data.resCode == "1") {										
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
		  } else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000
				 });
			  }
	     });
	  }*/
	}
})
// ########### Function for getting the current date ############################

	var d = new Date();
	
	var month = d.getMonth()+1;
	var day = d.getDate();
	
	var dateOutput = ((''+day).length<2 ? '0' : '') + day + '/' +
	      ((''+month).length<2 ? '0' : '') + month + '/' +
	      d.getFullYear();
	


$("#backFromCreate").on("click",function(){
	$("#hideCreateDiamondCert").hide();
	$("#hideDaimondCertSearch").show();
	$("#backFromCreate").hide();
});

//------------------------------Image Upload-------------------------------------------------

	function prepareLoad(event){
	  files=event.target.files;
	}
		 
  function processFileUpload(formId)
  {
	  $.ajax({
            url : "/OrderExecution/diamondCertImageSubmit",
        data : new FormData(document.getElementById(formId)),
        type : "post",
        enctype: 'multipart/form-data',
        processData: false, 
        contentType:false,
        success : function(result) {
			$.growl.notice({ message: "Successfully Uploaded Image For Diamond Certificate", duration: 8000, title: 'Success'});	
        },
        error : function(result){
			$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error in Saving Diamond Certificate Image !' });
        }
      });
  }
// ################################### image view #########################
  
$("#uploadImgC1").change(function(){
      if (this.files && this.files[0]) {
          $("#viewHrefId1").attr('href',URL.createObjectURL(this.files[0]));
      }
});

$("#viewHrefId1").on("click",function(){
	var uploadImgC1 =  $("#uploadImgC1").val();
	if(uploadImgC1 == "" || uploadImgC1 == null){
		$.growl.error({ message:"Please Upload the file to view the Certificate 1!!", duration: 10000 });
	}
});

$("#uploadImgC2").change(function(){
    if (this.files && this.files[0]) {
        $("#viewHrefId2").attr('href',URL.createObjectURL(this.files[0]));
    }
});

$("#viewHrefId2").on("click",function(){
	var uploadImgC2 =  $("#uploadImgC2").val();
	if(uploadImgC2 == "" || uploadImgC2 == null){
		$.growl.error({ message:"Please  Upload the file to view the Certificate 2!!", duration: 10000 });
	}
});

//-------------------------------------------------------------------------------
$("#clearAll").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#grNoS").val('');
	$("#grSlrNo").val('');
	$("#jqxgrid").jqxGrid('clear');
	$("#jqxgrid").hide();
});

$("#clearAllC").on('click', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
	$("#statusC").val(true);
	$("#refDoctC").val("FG_GR");
	$("#refDate").val(dateOutput);
});

//validation of input fields
$('.number_only').bind('keyup', function(){
    this.value = this.value.replace(/[^0-9\.]/g, '');
});