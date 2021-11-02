	$( "input" ).keyup(function() {
		var allowDecimal = $(this).attr('allowDecimal');
		console.log("allowDecimal : " + allowDecimal);
		if(allowDecimal != "undefined"){
			numVal=this.value.replace(/[^\d|\.]/g,'').split('.');
			if(numVal.length>1){
				numVal[1]=numVal[1].substr(0,allowDecimal);
				numVal.length=2;
				this.value=numVal.join('.');
			} else {
				this.value=numVal[0];
			};
		}
	});