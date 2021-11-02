var onload = function(){
$.getJSON('/OrderExecution/api/v1/ManualBatchOnloadLovs', function(data) {
		var a = '<select id="bpFunctionObjS"  name="bpFunctionObjS" class="form-control" multiple="multiple">';
		$.each(data.payload.list, function(key, val) {
		a += '<option value="' + val.name + '">' + val.name + '</option>'; });
		a += '</select>';
		$("#bpFunctionS").html(a);
		$('#bpFunctionObjS').multiselect({
		includeSelectAllOption : true,
		maxHeight : 250,
		//enableFiltering : true,
		numberDisplayed : 1,
		buttonClass : 'col-md-12 form-control text-left'
		});
	
	});

}

onload();

$("#bpFunctionS").on('change',function(){
	$("#save").prop('disabled',false);
});

$("#save").on('click',function(){
	var bpFunctionObjS = $('#bpFunctionObjS').val();
	if (bpFunctionObjS == null || bpFunctionObjS == "") {
		$.growl.error({
			message : "Please Select Batch Process Function !!",
			duration : 1000,
			title  : 'Error'
		});
		return false;
	}else{
		var bpFunc = bpFunctionObjS.join(',');
		var params = {"name" : bpFunc};
		console.log(params);
		
		postJSON('/OrderExecution/api/v1/runBatchManually',JSON.stringify(params),function(response) {
			if(response.resCode == "1"){
				$("#save").prop('disabled',true);
				$.growl.notice({
					message : response.mesgStr,
					duration : 1000,
					title : 'Success'
				});
			}else{
				$("#save").prop('disabled',false);
				$.growl.error({
					message : response.mesgStr,
					duration : 1000,
					title  : 'Error'
				});
				return false;
			}
		});
	}
});

$("#clearAll").on('click',function(){
	$("#save").prop('disabled',false);
	$("#bpFunctionObjS").multiselect("clearSelection");
});