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
		if( val == "search" || val == "Search"){
			if(permission.canSearch == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}  
		
		if(val=="Create" || val=="create"){
			if(permission.canAdd == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if( val == "export" || val == "Export"){
			if(permission.canExport == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val == "print" || val == "Print"){
			if(permission.canPrint == false){
				$(value).prop('disabled', true);
			}else{
				$(value).prop('disabled', false);
			}
		}
		
		if(val == "delete" || val == "Delete"){
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

$("#panel3").collapse('show');
$("#panel-first").hide();
$("#panel-second").hide();
$("#panel-third").show();

$("#empDetCreate").on("click", function() {
    $("#panel1").collapse('show');
    $("#panel-first").show();
    $("#panel-second").hide();
    $("#panel-third").hide();
});
$("#next-step").on("click", function() {
	 $("#panel2").collapse('show');
    $("#panel1").collapse('hide');
    $("#panel3").collapse('hide');
    $("#panel-first").show();
    $("#panel-second").show();
    $("#panel-third").hide();
});

$("#save-step").on("click", function() {
	 $("#panel3").collapse('show');
   $("#panel1").collapse('hide');
   $("#panel2").collapse('hide');
   $("#panel-first").hide();
   $("#panel-second").hide();
   $("#panel-third").show();
});

$("#employeeDet").on("click", function() {
	 $("#panel-second").hide();
	   $("#panel-third").hide();
});

$("#empDob").datepicker({
	 changeMonth: true,
     changeYear: true,
     dateFormat:"dd/mm/yy",
});

$("#empDoj").datepicker({
	 changeMonth: true,
     changeYear: true,
     dateFormat:"dd/mm/yy",
});

$("#empDol").datepicker({
	 changeMonth: true,
     changeYear: true,
     dateFormat:"dd/mm/yy",
});
/* ensure any open panels are closed before showing selected */
$('#accordion').on('show.bs.collapse', function () {
    $('#accordion .in').collapse('hide');
});