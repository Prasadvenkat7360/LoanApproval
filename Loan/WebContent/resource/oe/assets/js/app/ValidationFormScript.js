$(function() {
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; // January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = dd+'/'+mm+'/'+yyyy;
	/* From Date to datepicker with masking of date */
	$(document).on('click', '#orderFromDate', function () {
        var me = $("#orderFromDate");
        var selectedDate =  $("#orderFromDate").val();
        me.datepicker({
          showOn: 'focus',
          changeMonth: true,
          changeYear: true,
          maxDate : 0,
          dateFormat:"dd/mm/yy",
            onSelect: function( selectedDate ) {
                $( "#orderToDate" ).datepicker( "option", "minDate", selectedDate );
            }
        }).focus();
        me.mask('99/99/9999');

    }).on('select', '#orderFromDate', function () {
        var me = $("#orderFromDate");
    }).on("change", function (e) {

    });
	
    $(document).on('click', '#orderToDate', function () { 
        var me = $("#orderToDate");
        me.datepicker({
          showOn: 'focus',
          changeMonth: true,
	      changeYear: true,
	      dateFormat:"dd/mm/yy",
	      minDate:$("#orderFromDate").val(),
	      maxDate : 0
        }).focus();
        me.mask('99/99/9999');
    }).on('select', '#orderToDate', function () {
        var me = $("#orderToDate");
    });
    
    $("#deliveryDate").datepicker({
    	 changeMonth: true,
	      changeYear: true,
	      dateFormat:"dd/mm/yy",
	      minDate: $("#sentParcelDate").val(),
	      maxDate:0
    });
    /*
	 * On blur check dateFormat Right or Wrong. If Wrong it will take current
	 * date else selected date.
	 */
   /*
	 * $("#orderFromDate").on("blur", function(){ var selectedDate =
	 * $("#orderFromDate").val(); $( "#orderToDate" ).val(); var rxDatePattern =
	 * /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; var dateFinal =
	 * selectedDate.match(rxDatePattern); if(dateFinal != null){ $(
	 * "#orderFromDate" ).val(selectedDate ); }else{ $( "#orderFromDate"
	 * ).val(today ); } });
	 * 
	 * $("#orderToDate").on("blur", function(){ var selectedDate =
	 * $("#orderToDate").val(); $( "#orderToDate" ).val(); var rxDatePattern =
	 * /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; var dateFinal =
	 * selectedDate.match(rxDatePattern); if(dateFinal != null){ $(
	 * "#orderToDate" ).val(selectedDate ); }else{ $( "#orderToDate" ).val(today ); }
	 * });
	 */
    $("#deliveryDateIndent").datepicker({
   	 changeMonth: true,
     changeYear: true,
     dateFormat:"dd/mm/yy",
     minDate: 0
});
    $("#removeMatIssueDet").on('click', function(){
    	$("#vendorCode-value").val(null);
    	$("#jqxgrid").jqxGrid('clear');
    	$("#jqxgrid").hide();
    });
    /* Clear Form Filter and Re-set to default search and clear Grid data */
    $("#removeAll").on('click', function(){
 		$designers.empty().append(
		'<option value="" selected>Select</option>');
 		 $("#jqxgrid").jqxGrid('clear');
 		$("#jqxgrid").hide();
 	});
    
    $("#clearIndent").on('click', function(){
 		$("#jqxgrid").jqxGrid('clear');
 	});
    
    $("#clearTV").on('click', function(){
 		$("#jqxgrid").jqxGrid('clear');
 		$("#jqxgrid").hide();
 	});
    
    $("#clearAll").on('click', function(){
    	$("#jqxgrid").jqxGrid('clear');
    	$("#jqxgrid").hide();
		$('#designRA').trigger("reset");
		$('#designSearch').trigger("reset");
		$('#uploadDesign').trigger("reset");
		
 	});
    
  
    $('.modal').on("hidden.bs.modal", function (e) {
    	$("form").trigger("reset");
    });
    
});
 function enableDesigner(){	
	 var selectVal = $( "#designBy option:selected" ).val().length;
	
	 if(parseInt(selectVal) == 0){
		 $("#designers").attr('disabled', 'disabled');
	 }else{

		 $("#designers").removeAttr("disabled");
	 }
 }	
 $("#vendorStartDate").datepicker({
	 changeMonth: true,
      changeYear: true,
      dateFormat:"dd/mm/yy",
      maxDate: 0
});
 
 $(".alphaChar").keypress(function(event) {
	if((event.charCode < 65 || event.charCode > 90) && (event.charCode < 97 || event.charCode > 122) && event.charCode != 32) 
	{
		return false;
	}
});
 
 $('.alphaNumeric').keypress(function (e) {
	    var regex = new RegExp("^[a-zA-Z0-9]+$");
	    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	    if (regex.test(str)) {
	        return true;
	    }
	    e.preventDefault();
	    return false;
	});
 