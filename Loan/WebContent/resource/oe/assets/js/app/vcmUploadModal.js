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

var vcmUploadForm = new FormData();

var clear = function() {
	$("#fileName").empty();
	$("#fileSize").empty();
}

var disableSave = function(disable) {
	$("#vcmUploadSave").prop("disabled", disable);
}

var showFileName = function() {

	var vcmBrowseFile = $("#vcmBrowseFile");
	var length = vcmBrowseFile[0].files.length;

	var filesList = vcmBrowseFile[0].files;
	var fragment = "";

	var invalidFileUploaded = false;

	if (length > 0) {
		clear();

		var fileName;
		var fileSize;
		var fileType;

		for (var i = 0; i < length; i++) {
			// console.log("---filesList[i]---" + filesList[i]);
			fileName = filesList[i].name;
			fileSize = filesList[i].size;
			fileType = fileName.split(".")[1];

			// console.log("---fileType---" + fileType);

			fragment += "<li>" + fileName + "</li>";

			if (!(fileType == 'xlsx' || fileType == 'xls')) {
				invalidFileUploaded = true;

				disableSave(true);
			}
		}

		if (invalidFileUploaded) {
			$.growl.error({
				message : "Only Xlsx or Xls file's are allowed to upload",
				duration : 10000,
				title : 'Error'
			});
		} else {
			vcmUploadForm.append(fileName, filesList);

			$("#fileName").append(fragment);
			$("#fileSize").append(
					parseFloat(fileSize / 1024).toFixed(2) + " KB");

			disableSave(false);
		}
	}
}

$(document).ready(function() {
	clear();

	$("#vcmUploadSave").click(function() {
		disableSave(true);
		processFileUpload();
	});

	function processFileUpload() {

		$('#loading').show();

		$.ajax({
			url : "/OrderExecution/vcmUploadFile",
			data : new FormData(document.getElementById("vcmUploadForm")),
			type : "post",
			enctype : 'multipart/form-data',
			processData : false,
			contentType : false,
			success : function(data) {
				$('#loading').hide();
				disableSave(false);

				if (data.resCode == 1) {
					$.growl.notice({
						message : "File successfully uploaded",
						duration : 15000,
						title : 'Success'
					});
				} else if (data.resCode == 2) {
					$.growl.error({
						message : data.mesgStr,
						duration : 15000,
						title : 'Error'
					});
				}
			},
			error : function(result) {
				$('#loading').hide();
				disableSave(false);

				var msg = "Failed while uploading the file";

				if (result != null && result != "") {
					msg += " : " + result;
				}

				$.growl.error({
					message : msg,
					duration : 10000,
					title : 'Error'
				});
			}
		});
	}
});