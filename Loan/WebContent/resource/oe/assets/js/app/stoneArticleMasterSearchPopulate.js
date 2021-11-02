var loadPermission  = function(){
	var permission = localStorage.getItem("permission");
	permission = $.parseJSON(permission);
	
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

//loadPermission();

var urlPrefix = '/OrderExecution/api/v1/samSearchPopulate?page=search&';

$(document).ready(
		function() {
			$('input:text:visible:first').focus()

			var samMode;

			var $stoneSegment = $('#stoneSegment');
			var segmentId1 = -1;

			$.getJSON(urlPrefix + 'criteria=stoneSeg&id=' + segmentId1,
					function(data) {

						samMode = data.payload.samMode;

						$.each(data.payload.stoneSeg, function(key, val) {
							$stoneSegment.append('<option value="' + val.id
									+ '">' + val.description + '</option>');
						});
					});

			// Category
			$("#stoneSegment").on("change", function() {
				onStoneSegmentChange();
			});

			// Shape/Sub Category
			$("#stoneCategory").on("change", function() {
				onStoneCategoryChange();
			});
		});

onStoneSegmentChange = function() {
	var stoneSegmentId = $('#stoneSegment').val();
	var $stoneCategory = $('#stoneCategory');
	var $subCategory = $('#subCategory');
	var stoneSegmentText = $('#stoneSegment :selected').text();

	if (stoneSegmentId != "") {
		$.getJSON(urlPrefix + 'criteria=stoneCats&id=' + stoneSegmentId
				+ '&stoneSegmentText=' + stoneSegmentText, function(data) {
			$stoneCategory.empty().append(
					'<option value="" selected>Select</option>');
			$.each(data.payload.stoneCats, function(key, val) {
				$stoneCategory.append('<option value="' + val.id + '">'
						+ val.description + '</option>');
			});
		});
	} else {
		$stoneCategory.empty().append(
				'<option value="" selected>Select</option>');
	}

	$subCategory.empty().append('<option value="" selected>Select</option>');
}

onStoneCategoryChange = function() {
	var stoneCategoryId = $('#stoneCategory').val();
	var $subCategory = $('#subCategory');
	var stoneSegmentText = $('#stoneSegment :selected').text();

	if (stoneCategoryId != "") {
		$.getJSON(urlPrefix + 'criteria=stoneSubCategory&id=' + stoneCategoryId
				+ '&stoneSegmentText=' + stoneSegmentText, function(data) {
			$subCategory.empty().append(
					'<option value="" selected>Select</option>');
			$.each(data.payload.stoneSubCategory, function(key, val) {
				$subCategory.append('<option value="' + val.id + '">'
						+ val.description + '</option>');
			});
		});
	} else {
		$subCategory.empty()
				.append('<option value="" selected>Select</option>');
	}
}