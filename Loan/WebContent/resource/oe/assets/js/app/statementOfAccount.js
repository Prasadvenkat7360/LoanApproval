$("#indOrdNumSection").hide();
$("#goBack").hide();

$("#indvOrdNo").on('click',function(){
	$("#loading").show();
	$("#indOrdNumSection").show();
	$("#batchRunSection").hide();
	$("#jqxgrid").hide();
	$("#batchRun").hide();
	$("#goBack").show();
	$("#loading").hide();

});

$("#indvBatch").on('click',function(){
	if($("#orderNumb").val() == ""){
		$.growl.error({
			message : "Please Enter Order Number !!!",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}else{
		$("#loading").show();
		$.getJSON('/OrderExecution/api/v1/createStatementOfAccount?type=INDIVIDUAL&&orderNo='+$("#orderNumb").val(),function(response) {
			if(response.resCode == 1){
				$("#loading").hide();
				$.growl.notice ({
					message : response.mesgStr,
					duration : 10000,
					title : 'Success'
				});
			}else{
				$("#loading").hide();
				$.growl.error({
					message : response.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}
		});
	}
});

$("#batchRun").on('click',function(){
	$("#loading").show();

	$.getJSON('/OrderExecution/api/v1/createStatementOfAccount?type=ALLORDERS',function(response) {
		if(response.resCode == 1){
			$("#loading").hide();

			$.growl.notice ({
				message : response.mesgStr,
				duration : 10000,
				title : 'Success'
			});
		}else{
			$("#loading").hide();

			$.growl.error({
				message : response.mesgStr,
				duration : 10000,
				title : 'Error'
			});
			return false;
		}
	});
});

$("#goBack").on('click',function(){
	$("#indOrdNumSection").hide();
	$("#batchRunSection").show();
	$("#batchRun").show();
	$("#goBack").hide();
});
