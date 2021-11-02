/*  ##	Author1 (UI)    :   Pooja sangve
	## 	Author2 (Java)	:   Manoranjan Mishra
	##	Date Creation 	: 	26-09-2017
	## 	Description		:	Diamond Certificate Entry and search Functionality For Loose Stones 
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

$("#hideLooseStoneCreateDiamondCert").hide();
$("#hideLooseStoneDaimondSearch").show();
$("#backFromCreate").hide();


//################################## On load API calls ####################################
var onLoadFunctionLS = function(){
	
$("#grNoLoStone").empty().append('<option value="" selected>--Select--</option>');
$("#grSlrNoLs").empty().append('<option value="" selected>--Select--</option>');


$.getJSON("/OrderExecution/api/v1/looseStoneGrLOV",function(data){
	$.each(data.payload.lsdiamondCertificate,function(key,val){
	    $("#grNoLoStone").append('<option value="'+val.name+'" ids="'+val.description+'">'+val.id+'</option>');
	})
  })
}

$("#grNoLoStone").on("change", function() {
	var mrvId = $("#grNoLoStone option:selected").text().split('-');
	mrvNo = mrvId[0];
	mrvSrl =  mrvId[1];
	
	$("#grSlrNoLs").val(mrvSrl);
});
onLoadFunctionLS();

var toZoneArr = [];
var onLoadDropDownForEnteringDiamondCertLS = function(){
	
	$("#shapeCLS").empty().append('<option value="" selected>--Select--</option>');
	 $("#colorGradCLS").empty().append('<option value="" selected>--Select--</option>');
	 $("#clarityGradCLS").empty().append('<option value="" selected>--Select--</option>');
	 $("#cutGradCLS").empty().append('<option value="" selected>--Select--</option>');
	 $("#actualColorCLS").empty().append('<option value="" selected>--Select--</option>');
	 
	 
	 $("#flourCLS").empty().append('<option value="" selected>--Select--</option>');
	 $("#scitnCLS").empty().append('<option value="" selected>--Select--</option>');
	 $("#brilienceCLS").empty().append('<option value="" selected>--Select--</option>');
	 $("#gridleThicknessCLS").empty().append('<option value="" selected>--Select--</option>');
	 $("#symmetryCLS").empty().append('<option value="" selected>--Select--</option>');
	 
	 $("#gradIntensCLS").empty().append('<option value="" selected>--Select--</option>');
	 $("#fireCLS").empty().append('<option value="" selected>--Select--</option>');
	 $("#polishCLS").empty().append('<option value="" selected>--Select--</option>');
	 $("#cultSizeCLS").empty().append('<option value="" selected>--Select--</option>');
	 
	 $("#labCode1CLS").empty().append('<option value="" selected>--Select--</option>');
	 $("#labCode2CLS").empty().append('<option value="" selected>--Select--</option>');
	 
	var rows = $("#jqxgridLSStones").jqxGrid('getrows');
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
	var id = row.code;
	
	if(id != ""){
	 $.getJSON("/OrderExecution/api/v1/getDiCertificateLOV?stonecode="+id,function(data){
		$.each(data.payload.stoneColor,function(key, val){
			$("#colorGradCLS").append('<option  value="'+val.id+'">'+val.name+'</option>');
		    });
		
		$.each(data.payload.shapes,function(key, val){
			$("#shapeCLS").append('<option  value="'+val.id+'">'+val.name+'</option>');
		    });
		
		$.each(data.payload.cutGrade,function(key, val){
			$("#cutGradCLS").append('<option  value="'+val.id+'">'+val.name+'</option>');
		    });
		
		$.each(data.payload.clarities,function(key, val){
			$("#clarityGradCLS").append('<option  value="'+val.id+'">'+val.name+'</option>');
		    });
		
		$.each(data.payload.actualcolor,function(key, val){
			$("#actualColorCLS").append('<option  value="'+val.id+'">'+val.name+'</option>');
		    });
        });
	  }
	
	 $.getJSON("/OrderExecution/api/v1/dcertificatLOV",function(data){
		
		 $.each(data.payload.fluorence,function(key, val){
			$("#flourCLS").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.scintliation,function(key, val){
			$("#scitnCLS").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.briliance,function(key, val){
			$("#brilienceCLS").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.griddle,function(key, val){
			$("#gridleThicknessCLS").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.symentry,function(key, val){
			$("#symmetryCLS").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.intencity,function(key, val){
			$("#gradIntensCLS").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.fire,function(key, val){
			$("#fireCLS").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.polish,function(key, val){
			$("#polishCLS").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
		
		$.each(data.payload.culetSize,function(key, val){
			$("#cultSizeCLS").append('<option  value="'+val.id+'">'+val.description+'</option>');
		 });
	 });
	 
	 $.getJSON("/OrderExecution/api/v1/diamondLOV",function(data){
			 toZoneArr = data.payload.labLov;
		 $.each(toZoneArr,function(key, val){
			$("#labCode1CLS").append('<option  value="'+val.id+'">'+val.id+'</option>');
			//$("#labCode2CLS").append('<option  value="'+val.id+'">'+val.id+'</option>');
		 });
	 });
	 var fieldFilters = {
			 fieldFilters:{
				 "refdocNo":$("#grNoLoStone").val(),
				 "refsrlno":$("#grSlrNoLs").val()
			 }
	 }
	 postJSON('/OrderExecution/api/v1/getLsStone',JSON.stringify(fieldFilters),function(data) {
		  stoneDes = data.payload.stone;
				 $("#colorGradCLS").val(stoneDes.color)
				 $("#shapeCLS").val(stoneDes.shape);
				 $("#cutGradCLS").val(stoneDes.cutGrade);
				 $("#clarityGradCLS").val(stoneDes.clarity);
				 $("#caratWtCLS").val(stoneDes.stoneWt)
	       });
     }
}


$('#labCode1CLS').on('change', function(){

	$('#labCode2CLS').empty().append('<option value="" selected>--Select--</option>');
	
	var value = $('#labCode1CLS').val();
	$.each(toZoneArr, function(key, val) {
		if(value != val.id){
			$("#labCode2CLS").append('<option  value="'+val.id+'">'+val.id+'</option>');
		}
		
	});
});


//###################################### Field Filters ###################################################
 
function diamonfCertFilterLS() {

	var grNoS = $('#grNoLoStone').val();
	var grSlrNo = $('#grSlrNoLs').val();
	
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	if (grNoS != "" && grNoS != null) {
		fieldFilters.fieldFilters["id"] = grNoS;
	}
	if (grSlrNo != "" && grSlrNo != null) {
		fieldFilters.fieldFilters["srlNumber"] = grSlrNo;
	}
	return fieldFilters;
}

var addDaimondLooseStone = function(row, column, value) {

	return '<a class="btn btn-primary voffset" type="button" id=' + row + ' onclick="addDaimondLooseStoneView('+ value + ','+row+')" href="javascript:void(0);"/>Cert Entry </a>'
}

//###################################### Field Filters ###################################################

var  diamonfCertForLooseStonesGrid = function() {
	
	var updateRows = function(rowid, newdata, commit) {
	}

	var datafields = [
		{'name' : 'grNo','type' : 'int'},
		{'name' : 'grSrlNo','type' : 'int'},
		{'name' : 'code','type' : 'string'},
		{'name' : 'subCategoryDesc','type' : 'string'}, 
		{'name' : 'stonepcs','type' : 'string'},
		{'name' : 'stoneWt','type' : 'float'},
		{'name' : 'grStoneId','type' : 'int'}, 
		];

	var columns = [
		{'text' : 'GR No','datafield' : 'grNo','width' : '12%',cellsalign : 'center',align : 'center',sortable : false,	editable : false},
		{'text' : 'GR Srl No','datafield' : 'grSrlNo','width' : '12%',sortable : false,editable : false,	cellsalign : 'center',	align : 'center'},
		{'text' : 'Stone Code','datafield' : 'code','width' : '16%',sortable : false,editable : false,cellsalign : 'center',align : 'center'},
		{'text' : 'Sub Category','datafield' : 'subCategoryDesc','width' : '21%',sortable : false,editable : false,cellsalign : 'left',align : 'center'},
		{'text' : 'Stone Pcs','datafield' : 'stonepcs','width' : '16%',cellsalign : 'center',	align : 'center',sortable : false,editable : false},
		{'text' : 'Stone Wt','datafield' : 'stoneWt','width' : '16%',cellsalign : 'right',align : 'center',sortable : false,	editable : false,cellsformat : 'd3'},
		{'text' : '','datafield' : 'grStoneId',editable : false,cellsalign : 'center',	align : 'center',sortable : false,'width' : '7%',cellsrenderer : addDaimondLooseStone}
		];

	showMyGridCustom(datafields, "/OrderExecution/api/v1/searchLSGR","list",columns,diamonfCertFilterLS(),updateRows, "","#jqxgridLSStones");
	
	$("#jqxgridLSStones").jqxGrid({	
        sortable: false,            
	   	altrows: true,
	  	columnsresize: true, 
		rowsheight : 35,
		theme: 'energyblue',
		rowdetails : true,
		virtualmode : true	
	});
}

var feildFiterObjt={}
$("#searchLS").on("click",function(){
	var grNoS=$('#grNoLoStone option:selected').attr('ids');
	var grSlrNo=$("#grSlrNoLs").val();
	
      feildFiterObjt={
			"srlNo":grSlrNo,
			"grNo":grNoS
	   }
	
	if((grSlrNo == ""  || grSlrNo == null) || (grNoS	== "" || grNoS == null)){
		$.growl.error({
				message : "Please fill all  mandatory field!!",
			duration : 10000
		});
		return false;
	}
	diamonfCertForLooseStonesGrid();
	$("#jqxgridLSStones").show();
})

$("#clearAllLS").on('click', function() {
	var validator = $("form").validate();
	validator.resetForm();
	$("#grSlrNoLs").val('');
	$("#grNoLoStone").val('');
	$("#jqxgridLSStones").jqxGrid('clear');
	$("#jqxgridLSStones").hide();
});

//############### diamond details GRid #####################################

var addDiamondDetailsGridLS = function(data) {

	var updateRows = function(rowid, newdata, commit) {
	}
	datafields = [ 
		{'name' :'id',     'type' :'string'}, 
	   	{'name' :'name',	'type' :'int' },
	   	{'name' :'description',	'type' :'int' }	
	]
	columns = [
	    {'text'  :'LAB Name','datafield': 'id','width' : '35%',cellsalign : 'center',align:'center',editable : false}, 
		{'text'  :'LAB Cert No','datafield': 'name','width' : '35%',cellsalign : 'center',align:'center',editable : false}, 
		{'text'  :'Company Cert No','datafield' : 'description','width'  :'30%',cellsalign : 'center',align:'center',editable:false}
	  ]
	
	var addrow = function(rowIdS, rowdata, position, commit) {
		commit(true);
	}
	addGrid(datafields, columns, updateRows, data, addrow, '#jqxgridDiamomdLS');
		$("#jqxgridDiamomdLS").jqxGrid({
			columnsheight : 35,
			autoheight : true,
			theme: 'energyblue',
			columnsresize : true
		});
  }
//################################## laoding the JqxgridDaimond ##############################

var addDaimondLooseStoneView = function(id) {
	$("#backFromCreate").show();
	$("#hideLooseStoneCreateDiamondCert").show();
	$("#hideLooseStoneDaimondSearch").hide();
	$("#fgLooseStonesCLS").val("Stone Gr");
	onLoadDropDownForEnteringDiamondCertLS();
	$("#statusCLS").val(true);
	$("#refDoctCLS").val("Stone_GR");
	$("#refDateLS").val(dateOutput);
};

 $('#labCertNoCLS').on("change",function() {
         if (this.value.match(/[^0-9]/g)) {
             this.value = this.value.replace(/[^0-9]/g, '');
         }
 });

$('#labCertNo2CLS').on("change",function() {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});

function validateNumber(val) {
	var regex = /^\d{0,9}(\.\d{0,3})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(3);
	}
	return '';
};


 var saveDiamondEntryForLooseStones = function(){
	
	
	var labCode1C =  $("#labCode1CLS").val();
	var labCertNoC =  $("#labCertNoCLS").val();
	//var uploadImgC =  $("#uploadImgC").val();
	var shapeC = $("#shapeCLS").val();
	var caratWtC = $("#caratWtCLS").val();
	var colorGradC = $("#colorGradCLS").val();
	var clarityGradC = $("#clarityGradCLS").val();
	var cutGradC = $("#cutGradCLS").val();
	var clarityRemarksC = $("#clarityRemarksCLS").val();
	var flourCLS = $("#flourCLS").val();
	
	var measurmentC = $("#measurmentCLS").val();
	var diaMinC = $("#diaMinCLS").val();
	var diaMaxC = $("#diaMaxCLS").val();
	var diaAvgC = $("#depthCLS").val();
	var polishC = $("#polishCLS").val();
	var symmetryC = $("#symmetryCLS").val();
	  
	 /*if (caratWtC < 0 || caratWtC > 99) {
		 
		 $.growl.error({
				message :"Carat Wt Entered should be less then or equal to 99 !!" ,
				duration : 10000,
				title : 'Error'
			});
		     return false;
     }*/
	
	if( labCode1C == "" ||  labCertNoC == "" || shapeC == "" ||  caratWtC == "" ||  colorGradC == "" || clarityRemarksC == "" || clarityGradC == "" ||  cutGradC == ""  ||  measurmentC == "" || diaMinC == "" || diaMaxC == ""  || diaAvgC == "" ||  polishC == "" || symmetryC == "" || flourCLS == "" )
	  {
			$.growl.error({	message :"Please fill all mandatory fields !!" ,duration : 10000,title : 'Error'});
		     return false;		     
	} else {
	var rows = $("#jqxgridLSStones").jqxGrid('getrows');
	
	for (var i = 0; i < rows.length; i++) {
	var row = rows[i];
	var stoneCode = row.code;
	var labcode2 = $("#labCode2CLS").val();
	var labCertNo2CLS  =  $("#labCertNo2CLS").val()
	  if((labcode2 == null || labcode2 =="")||(labCertNo2CLS == null || labCertNo2CLS =="")){
		var daimondLabDetFrst = [
			    {
			      "labName":  $("#labCode1CLS").val(),
			      "labCertificateNumber": $("#labCertNoCLS").val(),
			    },
			  ]
	  }else{
		  var daimondLabDetFrst = [
			  {
			      "labName":  $("#labCode1CLS").val(),
			      "labCertificateNumber": $("#labCertNoCLS").val(),
			    },{
			      "labName":  $("#labCode2CLS").val(),
			      "labCertificateNumber": $("#labCertNo2CLS").val(),
			    }]
	  }
	var saveDiamondDet = {
		  "looseStoneStockId": $("#CompCertNoCLS").val(),
		  "diamondShape": $("#shapeCLS").val(),
		  "carratWeight": $("#caratWtCLS").val(),
		  "color": $("#colorGradCLS").val(),
		  "clarity": $("#clarityGradCLS").val(),
		  "cut": $("#cutGradCLS").val(),
		  "intenSityColor": $("#gradIntensCLS").val(),
		  "clarityRemarks":$("#clarityRemarksCLS").val(),
		  "inScription": $("#inscriptionCLS").val(),
		  "remarks": $("#remarksCLS").val(),
		  "mesurments": $("#measurmentCLS").val(),
		  "diameterMin": $("#diaMinCLS").val(),
		  "diameterMax": $("#diaMaxCLS").val(),
		  "diameterAverage": $("#diaAvgCLS").val(),
		  "tableSize": $("#tablemmCLS").val(),
		  "tablePercentage": $("#tablePercCLS").val(),
		  "crownAngle": $("#crownAngelCLS").val(),
		  "crownHeight": $("#crownHeightCLS").val(),
		  "pavlionAngle": $("#pavilionAngCLS").val(),
		  "pavlionDepth": $("#pavilionCLS").val(),
		  "starFacetLength": $("#starFacetCLS").val(),
		  "loweGride": $("#lowerGridleCLS").val(),
		  "gridlethickNess": $("#gridleThicknessCLS").val(),
		  "culetSize": $("#cultSizeCLS").val(),
		  "floresense": $("#flourCLS").val(),
		  "polish": $("#polishCLS").val(),
		  "symmentry": $("#symmetryCLS").val(),
		  "brillance": $("#brilienceCLS").val(),
		  "fire": $("#fireCLS").val(),
		  "refDoctype": $("#refDoctCLS").val(),
		  "refDocDate": $("#refDateLS").val(),
		  "fGLooseStoneGr": $("#fgLooseStonesCLS").val(),
		  "fgStock": $("#stockNoCLS").val(),
		  "actulaColor": $("#actualColorCLS").val(),
		  "clolorDesign": $("#colorOriginCLS").val(),
		  "colorDistribution": $("#colorDisCLS").val(),
		  "status":true, 
		  "stoneCode": stoneCode,
		  "depth": $("#depthCLS").val(),
		  "refdonNo" : $('#grNoLoStone').val(),
		  "refdocsrlNo":$("#grSlrNoLs").val(),
		  "diamondCertificateLabDTOs": daimondLabDetFrst,
		}
	return saveDiamondDet;
   }
 }
}
//------------------------------Image Upload-------------------------------------------------

function prepareLoad(event){
  files=event.target.files;
}
	 
function processFileUploadlooseStone(formId)
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
$("#saveDaimondEntryCreatedLS").on("click",function(){

	var fieldFilters = saveDiamondEntryForLooseStones();
	
	if (fieldFilters) {
		postJSON('/OrderExecution/api/v1/saveCertificate ',JSON.stringify(fieldFilters),function(data) {

			if (data.resCode == "1") {	
				var  lab1 =  $('#lab1IdLS').val(data.payload.labids.id);
			    var  lab2 = $('#lab2IdLS').val(data.payload.labids.name);

				processFileUploadlooseStone("daimondCertCreateLS");
				
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
					"looseStoneId" : feildFiterObjt.grNo,
					"srlNo" : feildFiterObjt.srlNo,	
					}
		       }
		
	if (fieldFiltersComplete) {
		postJSON('/OrderExecution/api/v1/completeLSCertificate',JSON.stringify(fieldFiltersComplete),function(data) {

			if (data.resCode == "1") {										
			$.growl.notice({
				message : data.mesgStr,
				duration : 10000,
				title : 'Success'
			});
			
			$("#hideLooseStoneCreateDiamondCert").hide();
			$("#hideLooseStoneDaimondSearch").show();
			window.location.href="javascript:showContentPage('diamondCertificateEntry', 'bodySwitcher')";
			return window.location.href;
			
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

// ################################### image view #########################
  
$("#uploadImgC1LS").change(function(){
      if (this.files && this.files[0]) {
          $("#viewHrefId3").attr('href',URL.createObjectURL(this.files[0]));
      }
});

$("#viewHrefId3").on("click",function(){
	var uploadImgC1 =  $("#uploadImgC1LS").val();
	if(uploadImgC1 == "" || uploadImgC1 == null){
		$.growl.error({ message:"Please Upload the file to view the Certificate 1!!", duration: 10000 });
	}
});

$("#uploadImgStone2").change(function(){
    if (this.files && this.files[0]) {
        $("#viewHrefId4").attr('href',URL.createObjectURL(this.files[0]));
    }
});

$("#viewHrefId4").on("click",function(){
	var uploadImgC2 =  $("#uploadImgStone2").val();
	if(uploadImgC2 == "" || uploadImgC2 == null){
		$.growl.error({ message:"Please  Upload the file to view the Certificate 2!!", duration: 10000 });
	}
});

// ########### Function for getting the current date ############################
  
var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var dateOutput = ((''+day).length<2 ? '0' : '') + day + '/' +
      ((''+month).length<2 ? '0' : '') + month + '/' +
      d.getFullYear();

$('.modal').on('hidden.bs.modal', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
});

$("#backFromCreate").on("click",function(){
	$("#backFromCreate").hide();
	$("#hideLooseStoneCreateDiamondCert").hide();
	$("#hideLooseStoneDaimondSearch").show();
	 
	$("#jqxgridLSStones").jqxGrid('clear');
	$("#jqxgridLSStones").hide();
});
$("#clearAllLsC").on('click', function() {
	$("form").each(function() {
		$(this).validate();
		$(this).validate().resetForm();
	});
	$("form").trigger("reset");
	$("#statusCLS").val(true);
	$("#refDoctCLS").val("Stone_GR");
	$("#refDateLS").val(dateOutput);
});