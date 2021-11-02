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

function validateNumber(val) {
	var regex = /^\d{0,9}(\.\d{0,2})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(2);
	}
	return '';
}

function validateNumberForWt(val) {
	var regex = /^\d{0,9}(\.\d{0,3})?$/;
	if (val && !isNaN(val) && regex.test(val)) {
		return parseFloat(val).toFixed(3);
	}
	return '';
}

$(document).ready(function() {
	$('input:text:visible:first').focus()
	var CostMCPercentage = "Cost MC (%)";
	var CostWastagePercentage = "Cost Wastage (%)";

	var tableRefs = {};
	var wastageChargeTypes;
	var vcmMode;
	var requestedUseCase = 0;

	var datafields = null;
	var columns = null;

	$("#save").hide();
	$("#edit").hide();
	$("#applyEdit").attr('disabled', 'disabled');

	disableAddRowDeleteRowButtons();

	var $vendorCode = $('#vendorCode');
	var $mcChargeType = $('#mcChargeType');
	var segmentId1 = -1;

	$.getJSON('/OrderExecution/api/v1/vcmLOV?page=search&criteria=vType&id='+ segmentId1, function(data) {
		vcmMode = data.payload.vcmMode;
		if (vcmMode == "edit") {
			$('#listingSearch').removeAttr("disabled");
		}
	
		if (vcmMode == "edit") {
			$('#loading').hide();
		}

		/*$.each(data.payload.vCodeList, function(key, val) {
			$vendorCode.append('<option value="' + val.id + '">' + val.name + '</option>'); 
		});*/
		
		var v = '<select id="vendorObj" name="vendorObj" class="form-control" multiple="multiple">';
		$.each(data.payload.vCodeList, function(key, val) {
		 v += '<option value="' + val.id + '">' + val.name + '</option>'; });
		 v += '</select>';
		 $("#vendorCode").html(v);
		 $('#vendorObj').multiselect({
		    	includeSelectAllOption : true,
		    	enableCaseInsensitiveFiltering:true,
				enableFiltering : false,
				maxHeight : 250,
				numberDisplayed : 1,
				buttonClass : 'col-md-12 form-control text-left'
		});


		$.each(data.payload.sTypes, function(key, val) {
			$('#segment').append('<option value="' + val.id + '">' + val.description + '</option>');
		});

		if ((vcmMode == null || vcmMode == "") || vcmMode != "edit") {
			$.each(data.payload.mcChargesType, function(key, val) {
				$mcChargeType.append('<option value="' + val.id + '">'+ val.name + '</option>');
			});					
			wastageChargeTypes = data.payload.wastageType;
			tableRefs = data.payload.tableRefList;
		}
	});

	
	$("#segment").on("change", function() {
		var segmentId = $('#segment').val();
		var $jewelType = $('#jewelType');
		var $mainCategory = $('#mainCategory');
		var $subCategory = $('#subCategory');
		var $metalPurity = $('#metalPurity');
		
		if (segmentId != "") {
			$.getJSON('/OrderExecution/api/v1/vcmLOV?page=search&criteria=jewelType&id=' + segmentId, function(data) {
				$jewelType.empty().append('<option value="" selected>Select</option>');
				$("#skinPurity").empty().append('<option value="" selected>Select</option>');
				
				$.each(data.payload.jewelType, function(key, val) {
					$jewelType.append('<option value="'	+ val.id + '">' + val.description + '</option>');
				});
				
				$.each(data.payload.metalSkinPurity, function(key, val) {
					$("#skinPurity").append('<option value="'	+ val.id + '">' + val.name + '</option>');
				});

				$metalPurity.empty().append('<option value="" selected>Select</option>');				
				$.each(data.payload.metalSkinPurity, function(key, val) {
					$metalPurity.append('<option value="' + val.id + '">' + val.name  + '</option>');
				});
		});
	} else {
		$jewelType.empty().append('<option value="" selected>Select</option>');
		$metalPurity.empty().append('<option value="" selected>Select</option>');
	}
		
	$mainCategory.empty().append('<option value="" selected>Select</option>');
	$subCategory.empty().append('<option value="" selected>Select</option>');
	
	});

	$("#jewelType").on("change", function() {
		var segmentId = $('#segment').val();
		var jewelType = $('#jewelType').val();
		var $mainCategory = $('#mainCategory');

		if (segmentId != "" && jewelType != "") {
			$.getJSON('/OrderExecution/api/v1/vcmLOV?page=search&criteria=mCategory&id=' + segmentId + '&jwTypeId='  + jewelType,	function(data) {
				$mainCategory.empty().append('<option value="" selected>Select</option>');
															
				$.each(data.payload.mainCatList, function(key, val) {
					$mainCategory.append('<option value="' + val.id + '">' + val.description + '</option>');
				});
			});
		} else {
			$mainCategory.empty().append('<option value="" selected>Select</option>');
		}

		$('#subCategory').empty().append('<option value="" selected>Select</option>');
	});


	$("#mainCategory").on("change", function() {
		var mainCatVal = $('#mainCategory').val();
		var jewelType = $('#jewelType').val();
		var $subCategory = $('#subCategory');
		if (jewelType != ""	&& mainCategory != "") {
			$.getJSON('/OrderExecution/api/v1/vcmLOV?page=search&criteria=sCategory&id=' + mainCatVal + '&jwTypeId=' + jewelType, function(data) {
				$subCategory.empty().append('<option value="" selected>Select</option>');
																	
				$.each(data.payload.subCatList, function(key, val) {																					
					$subCategory.append('<option value="' + val.id + '">' + val.description + '</option>');
				});
	
			});
		} else {
			$subCategory.empty().append('<option value="" selected>Select</option>');
		}
	});

	$("#mcChargeType").on("change",	function() {
		enableUseCase8and9();
		
		var mcChargeType = $('#mcChargeType').val();
		var $wasteChargeType = $('#wasteChargeType');
		
		var $costMcPer = $('#costMcPer');
		var $costWastagePer = $('#costWastagePer');									
		
		$costMcPer.attr('disabled', 'disabled');
		$costWastagePer.attr('disabled', 'disabled');
		$wasteChargeType.attr('disabled', 'disabled');
		
		$costMcPer.val('');
		$costWastagePer.val('');
		
		disableAddRowDeleteRowButtons();
		
		if (mcChargeType != null || mcChargeType != "") {
			$wasteChargeType.empty();
			if (mcChargeType == "MCPerGmOnPure") {
				$costMcPer.removeAttr("disabled");
				$costMcPer.attr('placeholder', CostMCPercentage);
				$costWastagePer.attr('placeholder',	CostWastagePercentage);
				$.each(wastageChargeTypes, function(key, val) {
					if (val.id == 'None') {
						$wasteChargeType.append('<option value="' + val.id	+ '">'	+ val.name + '</option>');
					}
				});
				
				$wasteChargeType.val("None");
			} 
			else if (mcChargeType == "MCPerGrmOnSkinPurity") {
				$costMcPer.removeAttr("disabled");
				$costWastagePer.removeAttr("disabled");
				$costMcPer.attr('placeholder',	CostMCPercentage);
				$costWastagePer.attr('placeholder',	CostWastagePercentage);
		
				$.each(wastageChargeTypes, function(key, val) {
					if (val.id == 'WastageOnSkinPurity') {
						$wasteChargeType.append('<option value="' + val.id+ '">' + val.name	+ '</option>');
					}
				});
				
				$wasteChargeType.val("WastageOnSkinPurity");
			} 
			else {
				$costMcPer.attr('placeholder', CostMCPercentage);
				$costWastagePer.attr('placeholder', CostWastagePercentage);
		
				if (mcChargeType == "MCPerPc") {
					$wasteChargeType.removeAttr("disabled");
					$.each(wastageChargeTypes, function(key, val) {
						if (val.id == 'None'
								|| val.id == 'WastagePerPcOnSkinPurity') {
							$wasteChargeType.append('<option value="' + val.id	+ '">'	+ val.name + '</option>');
						}
					});
		
					$wasteChargeType.val("None");
				} else if (mcChargeType == "None" || mcChargeType == "NONE") {
					$wasteChargeType.removeAttr("disabled");												
					$.each(wastageChargeTypes, function(key, val) {
						if (val.id == 'WastagePerPcOnSkinPurity' || val.id == 'WastagePerPairOnSkinPurity') {
							$wasteChargeType.append('<option value="' + val.id + '">'+ val.name + '</option>');
						}
					});
		
					$wasteChargeType.val("WastagePerPcOnSkinPurity");
				} else if (mcChargeType == "MCPerPair") {
					$.each(wastageChargeTypes, function(key, val) {
						if (val.id == 'WastagePerPairOnSkinPurity') {
							$wasteChargeType.append('<option value="'+ val.id + '">' + val.name + '</option>');
						}
					});
					
					$wasteChargeType.val("WastagePerPairOnSkinPurity");
				} else if (mcChargeType == "CostRange") {
					$.each(wastageChargeTypes, function(key, val) {
						if (val.id == 'None') {
							$wasteChargeType.append('<option value="'+ val.id+ '">'	+ val.name + '</option>');
						}
					});
					
					$wasteChargeType.val("None");
					
					disableUseCase8and9();
				} else if (mcChargeType == "RepairRework") {
						$.each(wastageChargeTypes, function(key, val) {
						if (val.id == 'None') {
							$wasteChargeType.append('<option value="'+ val.id+ '">'	+ val.name	+ '</option>');
						}
				});
					
					$wasteChargeType.val("None");
			
					disableUseCase8and9();
				}
			}
		} else {
			$wasteChargeType.append('<option value="" selected>Select</option>');
			}
	});

	function disableUseCase8and9() {
		$("#metalBasicPurchaseRate").attr('disabled',
				'disabled');
		$("#costMcPer").attr('disabled', 'disabled');
		$("#costWastagePer").attr('disabled', 'disabled');
		$("#costWastagePGM").attr('disabled', 'disabled');
		$("#costMCIncremental").attr('disabled', 'disabled');
	}

	function enableUseCase8and9() {
		$("#metalBasicPurchaseRate").removeAttr("disabled");
		$("#metalBasicPurchaseRate").attr('placeholder',
				'Metal Basic Purchase Rate');

		$("#costMcPer").removeAttr("disabled");
		$("#costMcPer").attr('placeholder', CostMCPercentage);

		$("#costWastagePer").removeAttr("disabled");
		$("#costWastagePer").attr('placeholder',
				CostWastagePercentage);

		$("#costWastagePGM").removeAttr("disabled");
		$("#costWastagePGM").attr('placeholder',
				'Base Cost MC Wastage PGM');

		$("#costMCIncremental").removeAttr("disabled");
		$("#costMCIncremental").attr('placeholder',
				'Base Cost MC Incremental');
	}

	// metalBasicPurchaseRate
	$("#metalBasicPurchaseRate").on("change", function() {
		computeMetalRateForPurity();
	});

	// metalPurity
	$("#metalPurity").on("change", function() {
		computeMetalRateForPurity();
	});

	function computeMetalRateForPurity() {
		var metalBasicPurchaseRate = $(
				'#metalBasicPurchaseRate').val();
		var metalPurity = $('#metalPurity').val();
		var metalBasicPurity = $('#metalBasicPurity').val();
		var $metalRateForPurity = $('#metalRateForPurity');

		if (metalBasicPurchaseRate != null
				&& metalBasicPurchaseRate != ""
				&& metalPurity != null && metalPurity != ""
				&& metalBasicPurity != null
				&& metalBasicPurity != "") {
			$metalRateForPurity.val(parseFloat(
					(metalBasicPurchaseRate * metalPurity)
							/ metalBasicPurity).toFixed(2))
		}
	}

	function vendorCostMaintainanceGrid() {

		var updateRows = function(rowid, newdata, commit) {
			/*
			 * updates[newdata.id] = { };
			 */
		}

		var mcChargeType = $("#mcChargeType").val();
		var wasteChargeType = $('#wasteChargeType').val();

		// console.log("mcChargeType :" + mcChargeType);
		// console.log("wasteChargeType :" + wasteChargeType);

		disableAddRowDeleteRowButtons();

		if (mcChargeType != null && mcChargeType != ""
				&& wasteChargeType != null
				&& wasteChargeType != "") {

			passRequiredData(tableRefs, vcmMode);

			// Use case 1 - Vendor Cost Example 1. MC per gm.
			if (mcChargeType == "MCPerGmOnPure"
					&& wasteChargeType == "None") {
				datafields = datafieldsForUC1();
				columns = columnsForUC1();
			}
			// Use case 2 - Vendor Cost Example 2. MC per gm &
			// Wastage % on skin purity
			else if (mcChargeType == "MCPerGrmOnSkinPurity"
					&& wasteChargeType == "WastageOnSkinPurity") {
				datafields = datafieldsForUC2();
				columns = columnsForUC2("MCPerGrmOnSkinPurity", "WastageOnSkinPurity");
			}
			// Use case 3 - Vendor Cost Example 3.MC Per Piece
			else if (mcChargeType == "MCPerPc"
					&& wasteChargeType == "None") {
				datafields = datafieldsForUC3();
				columns = columnsForUC3();
				enableAddRowDeleteRowButtons();
			}
			// Use case 4 - Vendor Cost Example 4. Wastage Per
			// Pc on Skin Purity
			else if (mcChargeType == "None"
					&& wasteChargeType == "WastagePerPcOnSkinPurity") {
				datafields = datafieldsForUC4();
				columns = columnsForUC4();
				enableAddRowDeleteRowButtons();
			}
			// Use case 5 - Vendor Cost Example 5. Wastage Per
			// pair
			else if (mcChargeType == "None"
					&& wasteChargeType == "WastagePerPairOnSkinPurity") {
				datafields = datafieldsForUC5();
				columns = columnsForUC5();
				enableAddRowDeleteRowButtons();
			}
			// Use case 6 - Vendor Cost Example 6. MC & Wastage
			// Per Pc on Skin Purity
			else if (mcChargeType == "MCPerPc"
					&& wasteChargeType == "WastagePerPcOnSkinPurity") {
				datafields = datafieldsForUC6();
				columns = columnsForUC6();
				enableAddRowDeleteRowButtons();
			}
			// Use case 7 - Vendor Cost Example 7. MC & Wastage
			// Per Pair on Skin Purity
			else if (mcChargeType == "MCPerPair"
					&& wasteChargeType == "WastagePerPairOnSkinPurity") {
				datafields = datafieldsForUC7();
				columns = columnsForUC7();
				enableAddRowDeleteRowButtons();
			}
			// Use case 8 - Vendor Cost Example 8. Total Cost
			else if (mcChargeType == "CostRange"
					&& wasteChargeType == "None") {
				datafields = datafieldsForUC8();
				columns = columnsForUC8();
				enableAddRowDeleteRowButtons();
			}
			// Use case 9 - Vendor Cost Example 9. Repair &
			// Rework Charges
			else if (mcChargeType == "RepairRework"
					&& wasteChargeType == "None") {
				datafields = datafieldsForUC9();
				columns = columnsForUC9();
				enableAddRowDeleteRowButtons();
			}
			// TODO - Out of 1 to 9 use case request, show use
			// case 1 grid
			else {
				datafields = datafieldsForUC1();
				columns = columnsForUC1();
			}
		}

		showMyGridForVCM(datafields,
				"/OrderExecution/api/v1/vcmSearchList?page=search&vcmMode="
						+ vcmMode, "list", columns,
				filterValues(), updateRows, "articleCode");
		
	}

	function enableAddRowDeleteRowButtons() {
		if (vcmMode == "create") {
			enableAddRowButton();
			enableDeleteRowButton();
		} else if (vcmMode == "edit") {
			enableAddRowButton();
		}
	}

	function enableAddRowButton() {
		$("#addRecord").removeAttr("disabled");
	}

	function enableDeleteRowButton() {
		$("#deleteRecord").removeAttr("disabled");
	}

	function disableAddRowDeleteRowButtons() {
		if (vcmMode == "create") {
			disableAddRowButton();
			disableDeleteRowButton();
		} else if (vcmMode == "edit") {
			disableAddRowButton();
		}
	}

	function disableAddRowButton() {
		$("#addRecord").attr('disabled', 'disabled');
	}

	function disableDeleteRowButton() {
		$("#deleteRecord").attr('disabled', 'disabled');
	}

	function filterValues() {
		fieldFilters = {
			"fieldFilters" : {}
		};
		var vendorCode = $('#vendorCode').val();
		var segment = $('#segment').val();
		var jewelType = $('#jewelType').val();
		var mainCategory = $('#mainCategory').val();
		var subCategory = $('#subCategory').val();
		var mcChargeType = $("#mcChargeType").val();
		var wasteChargeType = $('#wasteChargeType').val();
		var metalBasicPurity = $('#metalBasicPurity').val();
		var metalBasicPurchaseRate = $('#metalBasicPurchaseRate').val();
		var costMcPer = $('#costMcPer').val();
		var costWastagePer = $('#costWastagePer').val();
		var metalPurity = $('#metalPurity').val();
		var metalRateForPurity = $('#metalRateForPurity').val();
		var costWastagePGM = $('#costWastagePGM').val();
		var costMCIncremental = $('#costMCIncremental').val();
		var skinPurity = $('#skinPurity').val();
		
		if (skinPurity != "" && skinPurity != null) {
			fieldFilters.fieldFilters["metalPurity"] = skinPurity;
		}
		
		if (vendorCode != "" && vendorCode != null) {
			fieldFilters.fieldFilters["vendorCode"] = vendorCode;
		}
		if (segment != "" && segment != null) {
			fieldFilters.fieldFilters["segment"] = segment;
		}
		if (jewelType != "" && jewelType != null) {
			fieldFilters.fieldFilters["jewelType"] = jewelType;
		}
		if (mainCategory != "" && mainCategory != null) {
			fieldFilters.fieldFilters["mainCategory"] = mainCategory;
		}
		if (subCategory != "" && subCategory != null) {
			fieldFilters.fieldFilters["subCategory"] = subCategory;
		}
		if (mcChargeType != "" && mcChargeType != null) {
			fieldFilters.fieldFilters["mcChargeType"] = mcChargeType;
		}
		if (wasteChargeType != "" && wasteChargeType != null) {
			fieldFilters.fieldFilters["wasteChargeType"] = wasteChargeType;
		}
		if (metalBasicPurity != "" && metalBasicPurity != null) {
			fieldFilters.fieldFilters["metalBasicPurity"] = metalBasicPurity;
		}
		if (metalBasicPurchaseRate != ""
				&& metalBasicPurchaseRate != null) {
			fieldFilters.fieldFilters["metalBasicPurchaseRate"] = metalBasicPurchaseRate;
		}
		if (costMcPer != "" && costMcPer != null) {
			fieldFilters.fieldFilters["costMcPer"] = costMcPer;
		}
		if (costWastagePer != "" && costWastagePer != null) {
			fieldFilters.fieldFilters["costWastagePer"] = costWastagePer;
		}
		if (metalPurity != "" && metalPurity != null) {
			fieldFilters.fieldFilters["metalPurity"] = metalPurity;
		}
		if (metalRateForPurity != ""
				&& metalRateForPurity != null) {
			fieldFilters.fieldFilters["metalRateForPurity"] = metalRateForPurity;
		}
		if (costWastagePGM != "" && costWastagePGM != null) {
			fieldFilters.fieldFilters["costWastagePGM"] = costWastagePGM;
		}
		if (costMCIncremental != ""
				&& costMCIncremental != null) {
			fieldFilters.fieldFilters["costMCIncremental"] = costMCIncremental;
		}
		return fieldFilters;
	}

	$("#clearAll").on('click', function() {
		clearAll();
	});

	function clearAll() {
		$("#jqxgrid").jqxGrid('clear');
		$("#jqxgrid").hide();

		if (vcmMode == "create") {
			$('#vcmSearch').trigger("reset");

			var $wasteChargeType = $('#wasteChargeType');
			$wasteChargeType.empty();
			$wasteChargeType
					.append('<option value="" selected>Select</option>');
			$wasteChargeType.attr('disabled', 'disabled');

			$("#metalBasicPurchaseRate").removeAttr("disabled");
			$("#costWastagePGM").removeAttr("disabled");
			$("#costMCIncremental").removeAttr("disabled");

			// Show save button
			$("#save").hide();
		} else if (vcmMode == "edit") {
			// Show edit button
			$("#edit").hide();
			$("#applyEdit").attr('disabled', 'disabled');
			disableAddRowButton();

			var $costMcPer = $('#costMcPer');
			$costMcPer.val('');
			$costMcPer.attr('placeholder', CostMCPercentage);

			var $costWastagePer = $('#costWastagePer');
			$costWastagePer.val('');
			$costWastagePer.attr('placeholder',
					CostWastagePercentage);

			var $metalBasicPurchaseRate = $('#metalBasicPurchaseRate');
			$metalBasicPurchaseRate.val('');
			$metalBasicPurchaseRate.attr('placeholder',
					'Metal Basic Purchase Rate');

			var $metalRateForPurity = $('#metalRateForPurity');
			$metalRateForPurity.val('');
			$metalRateForPurity.attr('placeholder',
					'Metal Rate For Purity');

			var $costWastagePGM = $('#costWastagePGM');
			$costWastagePGM.val('');
			$costWastagePGM.attr('placeholder',
					'Base Cost MC Wastage PGM');

			var $costMCIncremental = $('#costMCIncremental');
			$costMCIncremental.val('');
			$costMCIncremental.attr('placeholder',
					'Base Cost MC Incremental');
		}
	}

	$("#Search").on('click', function() {									
		$('#loading').show();
		calcRequestedUseCase();

		if (validateFormfields()) {
			vendorCostMaintainanceGrid();
			$("#jqxgrid").show();

			// Clear existing selection
			$('#jqxgrid').jqxGrid(
					'clearselection');

			if (vcmMode == "create") {
				// Show save button
				$("#save").show();
			} else if (vcmMode == "edit") {
				// Show edit button
				$("#edit").show();
				$("#applyEdit").removeAttr(
						"disabled");

				if (requestedUseCase == 8
						|| requestedUseCase == 9) {
					disableUseCase8and9();
				}
			}
			// $('#loading').hide();
			return false;
		} else {
			$('#loading').hide();
			$.growl
					.error({
						message : "Please provide values to all search fields",
						duration : 10000,
						title : 'Mandatory Error'
					});
		}
	});

					$('#jqxgrid').on('bindingcomplete', function(event) {
						$('#loading').hide();
					});

					function validateFormfields() {
						
						if (vcmMode == "create") {
							return validateFormfieldsForCreate();
						} else if (vcmMode == "edit") {
							return validateFormfieldsForEdit();
						}
					}

					function calcRequestedUseCase() {
						var mcChargeType = $("#mcChargeType").val();
						var wasteChargeType = $('#wasteChargeType').val();

						// console.log("mcChargeType :" + mcChargeType);
						// console.log("wasteChargeType :" + wasteChargeType);
						if (mcChargeType != null && mcChargeType != ""
								&& wasteChargeType != null
								&& wasteChargeType != "") {
							// Use case 1 - Vendor Cost Example 1. MC per gm.
							if (mcChargeType == "MCPerGmOnPure"
									&& wasteChargeType == "None") {
								requestedUseCase = 1;
							}
							// Use case 2 - Vendor Cost Example 2. MC per gm &
							// Wastage % on skin purity
							else if (mcChargeType == "MCPerGrmOnSkinPurity"
									&& wasteChargeType == "WastageOnSkinPurity") {
								requestedUseCase = 2;
							}
							// Use case 3 - Vendor Cost Example 3.MC Per Piece
							else if (mcChargeType == "MCPerPc"
									&& wasteChargeType == "None") {
								requestedUseCase = 3;
							}
							// Use case 4 - Vendor Cost Example 4. Wastage Per
							// Pc on Skin Purity
							else if (mcChargeType == "None"
									&& wasteChargeType == "WastagePerPcOnSkinPurity") {
								requestedUseCase = 4;
							}
							// Use case 5 - Vendor Cost Example 5. Wastage Per
							// pair
							else if (mcChargeType == "None"
									&& wasteChargeType == "WastagePerPairOnSkinPurity") {
								requestedUseCase = 5;
							}
							// Use case 6 - Vendor Cost Example 6. MC & Wastage
							// Per Pc on Skin Purity
							else if (mcChargeType == "MCPerPc"
									&& wasteChargeType == "WastagePerPcOnSkinPurity") {
								requestedUseCase = 6;
							}
							// Use case 7 - Vendor Cost Example 7. MC & Wastage
							// Per Pair on Skin Purity
							else if (mcChargeType == "MCPerPair"
									&& wasteChargeType == "WastagePerPairOnSkinPurity") {
								requestedUseCase = 7;
							}
							// Use case 8 - Vendor Cost Example 8. Total Cost
							else if (mcChargeType == "CostRange"
									&& wasteChargeType == "None") {
								requestedUseCase = 8;
							}
							// Use case 9 - Vendor Cost Example 9. Repair &
							// Rework Charges
							else if (mcChargeType == "RepairRework"
									&& wasteChargeType == "None") {
								requestedUseCase = 9;
							} else {
								requestedUseCase = 0;
							}
						}
					}

					function validateFormfieldsForCreate() {
						var vendorCode = $('#vendorCode').val();
						var segment = $('#segment').val();
						var jewelType = $('#jewelType').val();
						var mainCategory = $('#mainCategory').val();
						var subCategory = $('#subCategory').val();
						var mcChargeType = $("#mcChargeType").val();
						var wasteChargeType = $('#wasteChargeType').val();
						var metalBasicPurity = $('#metalBasicPurity').val();
						var metalBasicPurchaseRate = $(
								'#metalBasicPurchaseRate').val();
						var costMcPer = $('#costMcPer').val();
						var costWastagePer = $('#costWastagePer').val();
						var metalPurity = $('#metalPurity').val();
						var metalRateForPurity = $('#metalRateForPurity').val();
						var costWastagePGM = $('#costWastagePGM').val();
						var costMCIncremental = $('#costMCIncremental').val();

						var validation = true;

						if (mcChargeType == "CostRange"
								|| mcChargeType == "RepairRework") {
							if (vendorCode == null || vendorCode == ""
									|| segment == null || segment == ""
									|| jewelType == null || jewelType == ""
									|| mainCategory == null
									|| mainCategory == "" ||
									// subCategory == null || subCategory == ""
									// ||
									mcChargeType == null || mcChargeType == ""
									|| wasteChargeType == null
									|| wasteChargeType == ""
									|| metalBasicPurity == null
									|| metalBasicPurity == ""
									|| metalPurity == null || metalPurity == "") {

								validation = false;
							}
						} else {
							if (vendorCode == null || vendorCode == ""
									|| segment == null || segment == ""
									|| jewelType == null || jewelType == ""
									|| mainCategory == null
									|| mainCategory == "" ||
									// subCategory == null || subCategory == ""
									// ||
									mcChargeType == null || mcChargeType == ""
									|| wasteChargeType == null
									|| wasteChargeType == ""
									|| metalBasicPurity == null
									|| metalBasicPurity == ""
									|| metalBasicPurchaseRate == null
									|| metalBasicPurchaseRate == ""
									|| metalPurity == null || metalPurity == ""
									|| metalRateForPurity == null
									|| metalRateForPurity == ""
									|| costWastagePGM == null
									|| costWastagePGM == ""
									|| costMCIncremental == null
									|| costMCIncremental == "") {

								validation = false;
							}

							if (requestedUseCase == 1
									&& (costMcPer == null || costMcPer == "")) {
								validation = false;
							}

							if (requestedUseCase == 2
									&& (costMcPer == null || costMcPer == ""
											|| costWastagePer == null || costWastagePer == "")) {
								validation = false;
							}
						}

						return validation;
					}

					function validateFormfieldsForEdit() {
						var vendorCode = $('#vendorCode').val();
						var segment = $('#segment').val();
						var jewelType = $('#jewelType').val();
						var mainCategory = $('#mainCategory').val();
						var subCategory = $('#subCategory').val();
						var mcChargeType = $("#mcChargeType").val();
						var wasteChargeType = $('#wasteChargeType').val();
						var metalPurity = $('#metalPurity').val();

						var validation = true;

						// All fields validation
						if (vendorCode == null || vendorCode == ""
								|| segment == null || segment == ""
								|| jewelType == null || jewelType == ""
								|| mainCategory == null || mainCategory == ""
								|| subCategory == null || subCategory == ""
								|| mcChargeType == null || mcChargeType == ""
								|| wasteChargeType == null
								|| wasteChargeType == "" || metalPurity == null
								|| metalPurity == "") {

							validation = false;
						}

						return validation;
					}

					$("#save")
							.on(
									"click",
									function() {
										trimmer();
										var getdisplayrows = $('#jqxgrid').jqxGrid('getdisplayrows');
										//console.log(getdisplayrows);

										// var selectedrowindexes =
										// $("#jqxgrid").jqxGrid('selectedrowindexes');
										// console.log("selectedrowindexes :" +
										// selectedrowindexes);

										if (typeof getdisplayrows != "undefined") {
											var record;
											var fromWtCost;
											var toWtCost;
											var makingCharge;
											var wastage;
											var useCase;
											var expectedCost;
											var mandatoryValdFailed = false;
											var negValueValdFailed = false;
											var frmLessthanToFailed = false;
											var makingChargeValdFailed = false;
											var wastageValdFailed = false;
											var expectedValdFailed = false;

											var rows = [];

											getdisplayrows.sort();

											for (var i = 0; i < getdisplayrows.length; i++) {
												// record = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindexes[i]);
												
												if(getdisplayrows[i].mupTypeId == "" || getdisplayrows[i].mupTypeId == null){
													$.growl.error({
														message : "Please select MUP Type.",
														duration : 10000,
														title : 'Error'
													});
													return false;
												}
												record = getdisplayrows[i];
												
												expectedCost = record["expectedWt"];
												fromWtCost = record["fromWtCost"];
												toWtCost = record["toWtCost"];
											
												wastage = record["wastage"];
												makingCharge = record["makingCharge"];
												useCase = record["useCase"];

												if (fromWtCost == null || toWtCost == null) {
													var message = "Value for both 'From Wt/cost' and 'To Wt/cost' column fields are mandatory for all selected records in the grid";
													$.growl.error({
														message : message,
														duration : 10000,
														title : 'Mandatory Error'
													});
													return false;
												} 
												
												if (fromWtCost < 0 || toWtCost < 0) {
													var message = "Value for both 'From Wt/cost' and 'To Wt/cost' column fields should not be negative value for all selected records in the grid";
													$.growl.error({
														message : message,
														duration : 10000,
														title : 'Error'
													});
													return false;
												} 
												
												if ((fromWtCost > toWtCost)	|| (fromWtCost == toWtCost)) {
													var message = "'From Wt/cost' value should be less than 'To Wt/cost' value for all selected records in the grid";
													$.growl.error({
														message : message,
														duration : 10000,
														title : 'Error'
													});
													return false;
												} 

												if (makingCharge <= 0	&& !(useCase == 4 || useCase == 5)) {
													var message = "Making Charge value should be greater than zero for all selected records in the grid";
													$.growl.error({
														message : message,
														duration : 10000,
														title : 'Error'
													});
													return false;
												} 
												console.log(parseFloat(expectedCost));
												console.log(parseFloat(fromWtCost));
												console.log(parseFloat(toWtCost));
												if (expectedCost <= fromWtCost	&&  expectedCost >= toWtCost) {
													var message = "expected should be between from and to wts";
													$.growl.error({
														message : message,
														duration : 10000,
														title : 'Error'
													});
													return false;
												} 
												
												if (wastage <= 0 && !(useCase == 1	|| useCase == 3	|| useCase == 8 || useCase == 9)) {
													var message = "Wastage value should be greater than zero for all selected records in the grid";
													$.growl.error({
														message : message,
														duration : 10000,
														title : 'Error'
													});
													return false;
												}

												rows.push(record);
											}
											
											

												 console.log(JSON.stringify(rows));

												postJSON('/OrderExecution/api/v1/createVCM', JSON.stringify(rows), function(data) {

															if (data.resCode == 1) {
																$.growl
																		.notice({
																			message : data.mesgStr,
																			duration : 15000,
																			title : 'Success'
																		});
																$("#jqxgrid")
																		.jqxGrid(
																				"updatebounddata");

																// Clear all
																// search fields
																// and grid
																clearAll();

																// Clear
																// existing
																// selection
																$('#jqxgrid')
																		.jqxGrid(
																				'clearselection');
																window.location.href="javascript:showContentPage('vendorCostMaintenanceListing', 'bodySwitcher')"
															} else if (data.resCode == 2
																	|| data.resCode == 3) {
																$.growl
																		.error({
																			message : data.mesgStr,
																			duration : 15000,
																			title : 'Error'
																		});
															} else if (data.resCode == 4) {
																$.growl
																		.error({
																			message : data.mesgStr,
																			duration : 15000,
																			title : 'Duplicate Error'
																		});
															} else if (data.resCode == "") {
																$.growl
																		.error({
																			message : "Record Already Exists",
																			duration : 1000,
																			title : ' Error'
																		});
															}
														});
										} else {
											$.growl
													.error({
														message : "At least one record should exists to save",
														duration : 10000
													});
										}

										return false;
									})

					$("#addRecord")
							.on(
									"click",
									function() {
										var selectedrowindexes = $("#jqxgrid").jqxGrid('selectedrowindexes');
										// console.log("selectedrowindexes :" +
										// selectedrowindexes);

										var record = {};
										var rowscount = $("#jqxgrid").jqxGrid('getdatainformation').rowscount;

										if (rowscount > 0 && selectedrowindexes != null  && selectedrowindexes.length > 0) {
											var newRowsToAdd = [];
											for (var i = 0; i < selectedrowindexes.length; i++) {
												record = $("#jqxgrid").jqxGrid('getrowdata', selectedrowindexes[i]);

												var newRow = new Object();

												newRow.vendorId = record.vendorId;
												newRow.metalBasicPurity = record.metalBasicPurity;
												newRow.metalBasicPurchaseRate = record.metalBasicPurchaseRate;
												newRow.costMcPer = record.costMcPer;
												newRow.costWastagePer = record.costWastagePer;
												newRow.metalRateForPurity = record.metalRateForPurity;
												newRow.costWastagePGM = record.costWastagePGM;
												newRow.costMCIncremental = record.costMCIncremental;
												// newRow.articleMasterId =
												// record.articleMasterId;
												// newRow.vaId = record.vaId;
												// newRow.vadId = record.vadId;
												newRow.useCase = record.useCase;
												newRow.articleCode = record.articleCode;
												newRow.vendorCode = record.vendorCode;
												newRow.segment = record.segment;
												newRow.jewelType = record.jewelType;
												newRow.category = record.category;
												newRow.subCategory = record.subCategory;
												newRow.skinPurity = record.skinPurity;
												// newRow.fromWtCost =
												// record.fromWtCost;
												// newRow.toWtCost =
												// record.toWtCost;
												newRow.fromWtCost = null;
												newRow.toWtCost = null;
												newRow.expectedWt = record.expectedWt;
												newRow.makingChargeType = record.makingChargeType;
												newRow.makingCharge = record.makingCharge;
												newRow.wastageType = record.wastageType;
												newRow.wastage = record.wastage;
												newRow.mcwPerGm = record.mcwPerGm;
												newRow.incrementalVal = record.incrementalVal;
												newRow.mupType = null;
												newRow.mupTypeId = null;
												// newRow.tableRef =
												// record.tableRef;
												// newRow.tableRefs =
												// record.tableRef;
												newRow.tableRef = null;
												newRow.selectionStatus = false;
												// newRow.selectionStatus =
												// record.selectionStatus;

												if (record.useCase == 1
														|| record.useCase == 2) {
													newRow.makingCharge = null;
												} else if (record.useCase == 3) {
													newRow.expectedWt = null;
													newRow.makingCharge = null;
												} else if (record.useCase == 4
														|| record.useCase == 5) {
													newRow.expectedWt = null;
													newRow.wastage = null;
												} else if (record.useCase == 6
														|| record.useCase == 7) {
													newRow.expectedWt = null;
													newRow.makingCharge = null;
													newRow.wastage = null;
												}
												newRowsToAdd.push(newRow);
											}

											$("#jqxgrid").jqxGrid('beginupdate');
											$("#jqxgrid").jqxGrid('addrow',	null, newRowsToAdd);
											$("#jqxgrid").jqxGrid('endupdate');

										} else {
											$.growl
													.error({
														message : "Please select at least one record to add or copy",
														duration : 10000
													});
										}
										return false;
									})

					$("#deleteRecord")
							.on(
									"click",
									function() {
										var selectedrowindexes = $("#jqxgrid")
												.jqxGrid('selectedrowindexes');
										// console.log("selectedrowindexes.length
										// :" + selectedrowindexes.length);
										// console.log("selectedrowindexes :" +
										// selectedrowindexes);
										var rowscount = $("#jqxgrid").jqxGrid(
												'getdatainformation').rowscount;
										// console.log("-rowscount-" +
										// rowscount);

										if (rowscount > 0
												&& selectedrowindexes != null
												&& selectedrowindexes.length > 0) {

											var selectedRowIds = new Array();
											for (var i = 0; i < selectedrowindexes.length; i++) {
												selectedRowIds.push($(
														"#jqxgrid").jqxGrid(
														'getrowid',
														selectedrowindexes[i]));
											}
											// console.log("-selectedRowIds-" +
											// selectedRowIds);

											$("#jqxgrid")
													.jqxGrid('beginupdate');
											$("#jqxgrid").jqxGrid('deleterow',
													selectedRowIds);
											$("#jqxgrid").jqxGrid('endupdate');

											// Clear selection
											$('#jqxgrid').jqxGrid(
													'clearselection');
										} else {
											$.growl
													.error({
														message : "Please select at least one record to delete",
														duration : 10000
													});
										}
										return false;
									})

					/**
					 * Edit changes
					 */

					function enableWCTForEdit() {
						var mcChargeType = $('#mcChargeType').val();
						var $wasteChargeType = $('#wasteChargeType');
						console.log("-mcChargeType-" + mcChargeType);
						if (mcChargeType == "MCPerPc" || mcChargeType == "None"
								|| mcChargeType == "NONE") {
							$wasteChargeType.removeAttr("disabled");
						}
					}

					$("#applyEdit")
							.on(
									"click",
									function() {
										$('#loading').show();
										if (applyEditRequiredValidationForEdit()) {
											applyEditForEdit();
										} else {
											$.growl
													.error({
														message : "Please provide values to all search fields",
														duration : 10000,
														title : 'Mandatory Error'
													});
										}
										$('#loading').hide();
									})

					function applyEditRequiredValidationForEdit() {
						var mcChargeType = $("#mcChargeType").val();
						var metalBasicPurity = $('#metalBasicPurity').val();
						var costMcPer = $('#costMcPer').val();
						var costWastagePer = $('#costWastagePer').val();
						var metalBasicPurchaseRate = $(
								'#metalBasicPurchaseRate').val();
						var metalRateForPurity = $('#metalRateForPurity').val();
						var costWastagePGM = $('#costWastagePGM').val();
						var costMCIncremental = $('#costMCIncremental').val();

						calcRequestedUseCase();

						var validation = true;

						if (mcChargeType == "CostRange"
								|| mcChargeType == "RepairRework") {
							if (metalBasicPurity == null
									|| metalBasicPurity == "") {
								validation = false;
							}
						} else {
							// All fields validation
							if (metalBasicPurity == null
									|| metalBasicPurity == ""
									|| metalBasicPurchaseRate == null
									|| metalBasicPurchaseRate == ""
									|| metalRateForPurity == null
									|| metalRateForPurity == ""
									|| costWastagePGM == null
									|| costWastagePGM == ""
									|| costMCIncremental == null
									|| costMCIncremental == "") {

								validation = false;
							}
						}

						if (requestedUseCase == 1
								&& (costMcPer == null || costMcPer == "")) {
							validation = false;
						}

						if (requestedUseCase == 2
								&& (costMcPer == null || costMcPer == ""
										|| costWastagePer == null || costWastagePer == "")) {
							validation = false;
						}

						return validation;
					}

					function applyEditForEdit() {

						// var getdisplayrows =
						// $('#jqxgrid').jqxGrid('getdisplayrows');
						// console.log("getdisplayrows :" +
						// getdisplayrows.length);

						var getboundrows = $('#jqxgrid')
								.jqxGrid('getboundrows');
						console.log("getboundrows :" + getboundrows.length);

						// var selectedrowindexes =
						// $("#jqxgrid").jqxGrid('selectedrowindexes');
						// console.log("selectedrowindexes :" +
						// selectedrowindexes);

						if (getboundrows != null && getboundrows.length > 0) {
							var updateIds = [];
							var updateRows = [];

							var mcChargeType = $("#mcChargeType").val();
							var wasteChargeType = $('#wasteChargeType').val();

							// Apply field values
							var metalPurity = $('#metalPurity').val();
							var metalBasicPurity = $('#metalBasicPurity').val();
							var costMcPer = $('#costMcPer').val();
							var costWastagePer = $('#costWastagePer').val();
							var metalBasicPurchaseRate = $(
									'#metalBasicPurchaseRate').val();
							var metalRateForPurity = $('#metalRateForPurity')
									.val();
							var costWastagePGM = $('#costWastagePGM').val();
							var costMCIncremental = $('#costMCIncremental')
									.val();

							var useCase = getboundrows[0]["useCase"];

							if (useCase == null) {
								var msg = "In valid use case for MC Charge Type '"
										+ mcChargeType
										+ "' and Waste Charge Type '"
										+ wasteChargeType + "'";
								$.growl.error({
									message : msg,
									duration : 10000,
									title : 'Error'
								});
							} else {
								var makingCharge = null;
								var wastage = null;
								var mcwPerGm = null;
								var incrementalVal = null;

								var makingCharge_nv = null;
								var expectedWt_nv = null;
								var wastage_nv = null;

								var record = null;

								for (var row = 0; row < getboundrows.length; row++) {

									record = getboundrows[row];

									if (metalBasicPurity != ""
											&& metalBasicPurity != null) {
										record.metalBasicPurity = metalBasicPurity;
									}
									if (metalBasicPurchaseRate != ""
											&& metalBasicPurchaseRate != null) {
										record.metalBasicPurchaseRate = metalBasicPurchaseRate;
									}
									if (costMcPer != "" && costMcPer != null) {
										record.costMcPer = costMcPer;
									}
									if (costWastagePer != ""
											&& costWastagePer != null) {
										record.costWastagePer = costWastagePer;
									}
									if (metalPurity != ""
											&& metalPurity != null) {
										record.skinPurity = metalPurity;
									}
									if (metalRateForPurity != ""
											&& metalRateForPurity != null) {
										record.metalRateForPurity = metalRateForPurity;
									}
									if (costWastagePGM != ""
											&& costWastagePGM != null) {
										record.costWastagePGM = costWastagePGM;
									}
									if (costMCIncremental != ""
											&& costMCIncremental != null) {
										record.costMCIncremental = costMCIncremental;
									}

									if (useCase == 1) {
										makingCharge = uc1_MakingCharge(
												metalBasicPurchaseRate,
												costMcPer);
										wastage = uc1_Wastage(
												metalBasicPurchaseRate,
												costWastagePer);
										mcwPerGm = uc1_MCWPerGm(makingCharge,
												wastage);
										incrementalVal = uc1_IncrementalValue(
												mcwPerGm, costWastagePGM,
												costMCIncremental);
									} else if (useCase == 2) {
										makingCharge = uc2_MakingCharge(
												metalRateForPurity, costMcPer);
										wastage = uc2_Wastage(costWastagePer);
										mcwPerGm = uc2_MCWPerGm(makingCharge,
												metalRateForPurity, wastage);
										incrementalVal = uc2_IncrementalValue(
												mcwPerGm, costWastagePGM,
												costMCIncremental);
									} else if (useCase == 3) {

										makingCharge_nv = $('#jqxgrid')
												.jqxGrid('getcellvalue', row,
														"makingCharge");
										expectedWt_nv = $('#jqxgrid').jqxGrid(
												'getcellvalue', row,
												"expectedWt");

										mcwPerGm = uc3_MCWPerGm(
												makingCharge_nv, expectedWt_nv);
										incrementalVal = uc3_IncrementalVal(
												mcwPerGm, costWastagePGM,
												costMCIncremental);
									} else if (useCase == 4) {

										wastage_nv = $('#jqxgrid').jqxGrid(
												'getcellvalue', row, "wastage");
										expectedWt_nv = $('#jqxgrid').jqxGrid(
												'getcellvalue', row,
												"expectedWt");

										mcwPerGm = uc4_MCWPerGm(wastage_nv,
												metalRateForPurity,
												expectedWt_nv);
										incrementalVal = uc4_IncrementalVal(
												mcwPerGm, costWastagePGM,
												costMCIncremental);
									} else if (useCase == 5) {

										makingCharge_nv = $('#jqxgrid')
												.jqxGrid('getcellvalue', row,
														"makingCharge");
										wastage_nv = $('#jqxgrid').jqxGrid(
												'getcellvalue', row, "wastage");
										expectedWt_nv = $('#jqxgrid').jqxGrid(
												'getcellvalue', row,
												"expectedWt");

										mcwPerGm = uc5_MCWPerGm(
												makingCharge_nv, wastage_nv,
												metalRateForPurity,
												expectedWt_nv);
										incrementalVal = uc5_IncrementalVal(
												mcwPerGm, costWastagePGM,
												costMCIncremental);
									} else if (useCase == 6) {

										makingCharge_nv = $('#jqxgrid')
												.jqxGrid('getcellvalue', row,
														"makingCharge");
										wastage_nv = $('#jqxgrid').jqxGrid(
												'getcellvalue', row, "wastage");
										expectedWt_nv = $('#jqxgrid').jqxGrid(
												'getcellvalue', row,
												"expectedWt");

										mcwPerGm = uc6_MCWPerGm(
												makingCharge_nv, wastage_nv,
												metalRateForPurity,
												expectedWt_nv);
										incrementalVal = uc6_IncrementalVal(
												mcwPerGm, costWastagePGM,
												costMCIncremental);
									} else if (useCase == 7) {

										makingCharge_nv = $('#jqxgrid')
												.jqxGrid('getcellvalue', row,
														"makingCharge");
										wastage_nv = $('#jqxgrid').jqxGrid(
												'getcellvalue', row, "wastage");
										expectedWt_nv = $('#jqxgrid').jqxGrid(
												'getcellvalue', row,
												"expectedWt");

										mcwPerGm = uc7_MCWPerGm(
												makingCharge_nv, wastage_nv,
												metalRateForPurity,
												expectedWt_nv);
										incrementalVal = uc7_IncrementalVal(
												mcwPerGm, costWastagePGM,
												costMCIncremental);
									}

									if (useCase == 1 || useCase == 2) {
										// $("#jqxgrid").jqxGrid('setcellvalue',
										// row, "wastage", wastage);
										// $("#jqxgrid").jqxGrid('setcellvalue',
										// row, "makingCharge", makingCharge);
										record.wastage = wastage;
										record.makingCharge = makingCharge;
									}

									if (useCase == 1 || useCase == 2
											|| useCase == 3 || useCase == 4
											|| useCase == 5 || useCase == 6
											|| useCase == 7) {
										// $("#jqxgrid").jqxGrid('setcellvalue',
										// row, "mcwPerGm", mcwPerGm);
										// $("#jqxgrid").jqxGrid('setcellvalue',
										// row, "incrementalVal",
										// incrementalVal);
										record.mcwPerGm = mcwPerGm;
										record.incrementalVal = incrementalVal;
									}

									// var commit =
									// $("#jqxgrid").jqxGrid('updaterow', row,
									// record);
									// $("#jqxgrid").jqxGrid('ensurerowvisible',
									// row);

									updateIds.push(row);
									updateRows.push(record);
								}

								$("#jqxgrid").jqxGrid('beginupdate');
								$("#jqxgrid").jqxGrid('updaterow', updateIds,
										updateRows);
								$("#jqxgrid").jqxGrid('endupdate');

								$('#jqxgrid').jqxGrid('refreshdata');
							}
						}
					}

					$("#edit")
							.on(
									"click",
									function() {
										trimmer();
										var getdisplayrows = $('#jqxgrid').jqxGrid('getrows');
									
										//console.log("getdisplayrows :"	+ getdisplayrows.length);

										// var selectedrowindexes =
										// $("#jqxgrid").jqxGrid('selectedrowindexes');
										// console.log("selectedrowindexes :" +
										// selectedrowindexes);

										if (getdisplayrows != null
												&& getdisplayrows.length > 0) {
											var record;
											var fromWtCost;
											var toWtCost;
											var makingCharge;
											var wastage;
											var mandatoryValdFailed = false;
											var negValueValdFailed = false;
											var frmLessthanToFailed = false;
											var makingChargeValdFailed = false;
											var wastageValdFailed = false;
											var rows = [];

											getdisplayrows.sort();

											for (var i = 0; i < getdisplayrows.length; i++) {
												// record =
												// $("#jqxgrid").jqxGrid('getrowdata',
												// getdisplayrows[i]);
												record = getdisplayrows[i];

												// console.log("record :" +
												// JSON.stringify(record));

												fromWtCost = record["fromWtCost"];
												toWtCost = record["toWtCost"];
												makingCharge = record["makingCharge"];
												useCase = record["useCase"];
												wastage = record["wastage"];
												if (fromWtCost == null	|| toWtCost == null) {
													mandatoryValdFailed = true;
													return false;
												} 
												
												if (fromWtCost < 0 || toWtCost < 0) {
													negValueValdFailed = true;
													return false;
												} 
												
												if ((fromWtCost > toWtCost)	|| (fromWtCost == toWtCost)) {
													frmLessthanToFailed = true;
													return false;
												} 
												
												if (makingCharge <= 0 && !(useCase == 4 || useCase == 5)) {
													makingChargeValdFailed = true;
													return false;
												} 

												if (wastage <= 0 && !(useCase == 1 || useCase == 3 || useCase == 8 || useCase == 9)) {
													wastageValdFailed = true;
													return false;
												}

												rows.push(record);
											}

											if (mandatoryValdFailed) {
												var message = "Value for both 'From Wt/cost' and 'To Wt/cost' column fields are mandatory for all selected records in the grid";
												$.growl.error({
													message : message,
													duration : 10000,
													title : 'Mandatory Error'
												});
												return false;
											} 
											if (negValueValdFailed) {
												var message = "Value for both 'From Wt/cost' and 'To Wt/cost' column fields should not be negative value for all selected records in the grid";
												$.growl.error({
													message : message,
													duration : 10000,
													title : 'Error'
												});
												return false;
											} 
											
											if (frmLessthanToFailed) {
												var message = "'From Wt/cost' value should be lessthan 'To Wt/cost' value for all selected records in the grid";
												$.growl.error({
													message : message,
													duration : 10000,
													title : 'Error'
												});
												return false;
											} 
											
											if (makingChargeValdFailed) {
												var message = "Making Charge value should be greater than zero for all selected records in the grid";
												$.growl.error({
													message : message,
													duration : 10000,
													title : 'Error'
												});
												return false;
											} 
											
											if (wastageValdFailed) {
												var message = "Wastage value should be greater than zero for all selected records in the grid";
												$.growl.error({
													message : message,
													duration : 10000,
													title : 'Error'
												});
												return false;
											} 
												 console.log(JSON.stringify(rows));

												postJSON('/OrderExecution/api/v1/createVCM',JSON.stringify(rows),function(data) {

															if (data.resCode == 1) {
																$.growl.notice({
																			message : data.mesgStr,
																			duration : 15000,
																			title : 'Success'
																		});
																$("#jqxgrid").jqxGrid("updatebounddata");
																clearAll();
																$('#jqxgrid').jqxGrid('clearselection');
																window.location.href = "javascript:showContentPage('vendorCostMaintenanceListing', 'bodySwitcher')";
															} else if (data.resCode == 2
																	|| data.resCode == 3) {
																$.growl
																		.error({
																			message : data.mesgStr,
																			duration : 15000,
																			title : 'Error'
																		});
															} else if (data.resCode == 4) {
																$.growl
																		.error({
																			message : data.mesgStr,
																			duration : 15000,
																			title : 'Duplicate Error'
																		});
															} else if (data.resCode == "") {
																$.growl
																		.error({
																			message : "Record Already Exists",
																			duration : 1000,
																			title : ' Error'
																		});
															}
														});
										} else {
											$.growl
													.error({
														message : "At least one record exists to save",
														duration : 10000
													});
										}

										return false;
									})

					/**
					 * 
					 * Listing page related
					 * 
					 */

					$("#listingSearch").on('click',	function() {
								
								var vendorCode = $("#vendorObj").val();
								var segment = $("#segment").val();
								var skinPurity = $("#skinPurity").val();
								if(vendorCode == "" || segment == "" || skinPurity == ""){
									$.growl.error({
										message : "Please select mandatory fields.",
										duration : 10000
									});
									return false;
								}
								
								
								var updateRows = function(rowid, newdata, commit) {
								}

								showMyGrid(listingDatafields(), "/OrderExecution/api/v1/vcmSearchList?page=search&vcmMode="	+ vcmMode, "list",	listingColumns(), searchValuesForListingPage(),	updateRows, "");
								$("#jqxgrid").show();
								$("#jqxgrid").jqxGrid({
									width : '100%',
							        sortable: true,            
							     	altrows: true,
							    	columnsresize: true 
								});
								return false;
							});

					function searchValuesForListingPage() {
						fieldFilters = {
							"fieldFilters" : {}
						};
						var vendorObj = $("#vendorObj").val();
						var skinPurity = $('#skinPurity').val();
						var segment = $('#segment').val();
						var jewelType = $('#jewelType').val();
						var mainCategory = $('#mainCategory').val();
						var subCategory = $('#subCategory').val();
						var articleCode = $('#articleCode').val();
						if (vendorObj == null || vendorObj == ""){
							var vendorCode = "";
						}else{
							var vendorCode = vendorObj.join(",");
						}
						
						if (skinPurity != "" && skinPurity != null) {
							fieldFilters.fieldFilters["metalPurity"] = skinPurity;
						}
						
						if (vendorCode != "" && vendorCode != null) {
							fieldFilters.fieldFilters["vendorCode"] = vendorCode;
						}
						if (segment != "" && segment != null) {
							fieldFilters.fieldFilters["segment"] = segment;
						}
						if (jewelType != "" && jewelType != null) {
							fieldFilters.fieldFilters["jewelType"] = jewelType;
						}
						if (mainCategory != "" && mainCategory != null) {
							fieldFilters.fieldFilters["mainCategory"] = mainCategory;
						}
						if (subCategory != "" && subCategory != null) {
							fieldFilters.fieldFilters["subCategory"] = subCategory;
						}
						if (articleCode != "" && articleCode != null) {
							fieldFilters.fieldFilters["articleCode"] = articleCode;
						}
						return fieldFilters;
					}

					$("#listingClearAll").on('click', function() {
						$("#jqxgrid").jqxGrid('clear');
						$("#jqxgrid").hide();
						$('#vcmSearch').trigger("reset");
						$('#vendorObj').multiselect("clearSelection");
					});

				});

$("#export").on(
		"click",
		function() {

			var data;
			var newdata = [];
			var segment = $("#segment").val();
			var jewelType = $("#jewelType").val();
			var vendorObj = $("#vendorObj").val();
			var mainCategory = $("#mainCategory").val();
			var subCategory = $("#subCategory").val();
			var articleCode = $("#articleCode").val();
			var skinPurity = $('#skinPurity').val();
			fieldFilters = {
				"fieldFilters" : {}
			};
			if (vendorObj == null || vendorObj == ""){
				var vendorCode = "";
			}else{
				var vendorCode = vendorObj.join(",");
			}
			if (jewelType != "" && jewelType != null) {
				fieldFilters.fieldFilters["jewelType"] = jewelType;
			}
			if (segment != "" && segment != null) {
				fieldFilters.fieldFilters["segment"] = segment;
			}
			if (mainCategory != "" && mainCategory != null) {
				fieldFilters.fieldFilters["mainCategory"] = mainCategory;
			}
			if (subCategory != "" && subCategory != null) {
				fieldFilters.fieldFilters["subCategory"] = subCategory;
			}
			if (articleCode != "" && articleCode != null) {
				fieldFilters.fieldFilters["articleCode"] = articleCode;
			}
			if (vendorCode != "" && vendorCode != null) {
				fieldFilters.fieldFilters["vendorCode"] = vendorCode;
			}
			if (skinPurity != "" && skinPurity != null) {
				fieldFilters.fieldFilters["metalPurity"] = skinPurity;
			}

			var sysdate = moment().format('DDMMYYYYHHmmSS');
			var rows = $('#jqxgrid').jqxGrid('getrows');
			if (  rows == undefined || rows == 0 ) {
				$.growl
				.error({
					message : "No Data To Export",
					duration : 10000
				});
				return false;
			}
			postJSON('/OrderExecution/api/v1/vcmSearchListExport', JSON
					.stringify(fieldFilters), function(response) {
				if (null != response) {
					data = response.payload.list;
					for (i = 0; i < data.length; i++) {
						newdata.push({
							'Vendor Code' : (data[i].vendorArticle.vendorCode != null) ? data[i].vendorArticle.vendorCode + " - " + data[i].vendorArticle.vendorName : "",
							'Metal Segment name' : (data[i].vendorArticle.segment != null) ? data[i].vendorArticle.segment : "",
							'Jewell Type' : (data[i].vendorArticle.jewelType != null) ? data[i].vendorArticle.jewelType : "",
							'Main Category' : (data[i].vendorArticle.category != null) ? data[i].vendorArticle.category : "",
							'Sub Category' : (data[i].vendorArticle.subCategory != null) ? data[i].vendorArticle.subCategory : "",
							'Pure Metal Rate' : (data[i].vendorArticle.pureMetalRate != null) ? data[i].vendorArticle.pureMetalRate : "",
							'Skin Purity' : (data[i].skinPurity != null) ? data[i].skinPurity : "",
							'Metal Rate for Purity' : (data[i].metalRateForPurity != null) ? data[i].metalRateForPurity : "",														
							'From Weight Cost' : (data[i].fromWeightCost != null) ? data[i].fromWeightCost : "",
							'To Weight Cost' : (data[i].toWeightCost != null) ? data[i].toWeightCost : "",
							'Expected Weight' : (data[i].expectedWeight != null) ? data[i].expectedWeight: "",
							'MC Charge Type' : (data[i].mcChargeType != null) ? data[i].mcChargeType : "",
							'Making Charge' : (data[i].makingCharge != null) ? data[i].makingCharge : "",
							'Base Cost MC Incremental' : (data[i].baseCostMCIncremental != null) ? data[i].baseCostMCIncremental : "",
						    'Cost MC Percentage' : (data[i].costMCPercentage != null) ? data[i].costMCPercentage : "",
							'Wastage Charge Type' : (data[i].wastageChargeType != null) ? data[i].wastageChargeType : "",
							'Wastage Charges' : (data[i].wastageCharge != null) ? data[i].wastageCharge : "",	
							'Cost Wastage Percentage' : (data[i].costWastagePercentage != null) ? data[i].costWastagePercentage : "",
							'MC Wastage Charges' : (data[i].mcWastagePerGrm != null) ? data[i].mcWastagePerGrm : "",
							'Increment Value' : (data[i].incrementalValue != null) ? data[i].incrementalValue : "",												
							'MUP Type' : (data[i].MupType != null) ? data[i].MupType : "",												
							'Table Ref' : (data[i].tableRef != null) ? data[i].tableRef : ""																							
						})
					}
					//JSONToCSVConvertor(newdata, "Vendor_Cost" + "_" + sysdate,true);
					  var opts = [{sheetid:'Vendor_Cost_Maintaninance',header:true}];
                      var res = alasql('SELECT * INTO XLSX("Vendor Cost Maintaninance_'+sysdate+'.xlsx",?) FROM ?',  [opts,[newdata]]);
				}
			});
		});

$("#exportToAudit")
		.on(
				'click',
				function() {
					var data;

					var segment = $("#segment").val();
					var jewelType = $("#jewelType").val();
					var vendorCode = $("#vendorCode").val();
					var mainCategory = $("#mainCategory").val();
					var subCategory = $("#subCategory").val();
					var articleCode = $("#articleCode").val();

					var exportListArr = [];

					fieldFilters = {
						"fieldFilters" : {}
					};
					if (vendorCode != "" && vendorCode != null) {

						fieldFilters.fieldFilters["vendorCode"] = vendorCode;
					}
					if (jewelType != "" && jewelType != null) {
						fieldFilters.fieldFilters["jewelType"] = jewelType;
					}
					if (segment != "" && segment != null) {
						fieldFilters.fieldFilters["segment"] = segment;
					}
					if (mainCategory != "" && mainCategory != null) {
						fieldFilters.fieldFilters["mainCategory"] = mainCategory;
					}
					if (subCategory != "" && subCategory != null) {
						fieldFilters.fieldFilters["subCategory"] = subCategory;
					}
					if (articleCode != "" && articleCode != null) {
						fieldFilters.fieldFilters["articleCode"] = articleCode;
					}

					var sysdate = moment().format('DDMMYYYYHHmmSS');

					postJSON('/OrderExecution/api/v1/vcmExportToAudit',JSON.stringify(fieldFilters),
							function(response) {
								if(null != response){
									data = response.payload.list;
									for (i = 0; i < data.length; i++) {
										exportListArr.push({
											'Vendor Code' : (data[i].vendorArticle.vendorCode != null) ? data[i].vendorArticle.vendorCode + " - " + data[i].vendorArticle.vendorName : "",
											'Metal Segment name' : (data[i].vendorArticle.segment != null) ? data[i].vendorArticle.segment : "",
											'Jewell Type' : (data[i].vendorArticle.jewelType != null) ? data[i].vendorArticle.jewelType : "",
											'Main Category' : (data[i].vendorArticle.category != null) ? data[i].vendorArticle.category : "",
											'Sub Category' : (data[i].vendorArticle.subCategory != null) ? data[i].vendorArticle.subCategory : "",
											'Pure Metal Rate' : (data[i].vendorArticle.pureMetalRate != null) ? data[i].vendorArticle.pureMetalRate : "",
											'Skin Purity' : (data[i].skinPurity != null) ? data[i].skinPurity : "",
											'Metal Rate for Purity' : (data[i].metalRateForPurity != null) ? data[i].metalRateForPurity : "",														
											'From Weight Cost' : (data[i].fromWeightCost != null) ? data[i].fromWeightCost : "",
											'To Weight Cost' : (data[i].toWeightCost != null) ? data[i].toWeightCost : "",
											'Expected Weight' : (data[i].expectedWeight != null) ? data[i].expectedWeight: "",
											'MC Charge Type' : (data[i].mcChargeType != null) ? data[i].mcChargeType : "",
											'Making Charge' : (data[i].makingCharge != null) ? data[i].makingCharge : "",
											'Base Cost MC Incremental' : (data[i].baseCostMCIncremental != null) ? data[i].baseCostMCIncremental : "",
										    'Cost MC Percentage' : (data[i].costMCPercentage != null) ? data[i].costMCPercentage : "",
											'Wastage Charge Type' : (data[i].wastageChargeType != null) ? data[i].wastageChargeType : "",
											'Wastage Charges' : (data[i].wastageCharge != null) ? data[i].wastageCharge : "",	
											'Cost Wastage Percentage' : (data[i].costWastagePercentage != null) ? data[i].costWastagePercentage : "",
											'MC Wastage Charges' : (data[i].mcWastagePerGrm != null) ? data[i].mcWastagePerGrm : "",
											'Increment Value' : (data[i].incrementalValue != null) ? data[i].incrementalValue : "",												
											'MUP Type' : (data[i].MupType != null) ? data[i].MupType : "",												
											'Table Ref' : (data[i].tableRef != null) ? data[i].tableRef : ""																							
										})
									}
									//JSONToCSVConvertor(exportListArr, "Vendor_Cost_Audit" + "_" + sysdate, true);
									var opts = [{sheetid:'Vendor_Cost_Audit',header:true}];
				                    var res = alasql('SELECT * INTO XLSX("Vendor Cost Audit_'+sysdate+'.xlsx",?) FROM ?',  [opts,[exportListArr]]);
								}
							});
					
				});

$("#Search").on('click', function() {
	$("#edit").attr('disabled', 'true');
});
/*
 * $.validate({ showErrorDialogs : false, // only used by toggleDisabled module
 * onError : function() { }, onSuccess: function($form) { if(
 * !$.formUtils.haltValidation ) {
 * 
 * $form.find('input[type="submit"]').unbind('click'); } return false; } });
 * 
 */
$("#costMcPer").on('change', function() {
	$("#edit").prop('disabled', false);
});
$("#costWastagePer").on('change', function() {
	$("#edit").prop('disabled', false);
});
$("#metalBasicPurchaseRate").on('change', function() {
	$("#edit").prop('disabled', false);
});
$("#costWastagePGM").on('change', function() {
	$("#edit").prop('disabled', false);
});
$("#costMCIncremental").on('change', function() {
	$("#edit").prop('disabled', false);
});
$("#wasteChargeType").on('change', function() {
	$("#edit").prop('disabled', false);
});
$("#mcChargeType").on('change', function() {
	$("#edit").prop('disabled', false);
});

////////////////venkat code starts here /////////////////////////////////////////////


//*******************************Vendor FG  Article Master Multilevel  Export/Download and export to audit API's are Same*******************************************

$("#exportAudit").on("click",function(){
	var segment = $("#segment").val();
	var jewelType = $("#jewelType").val();
	var vendorCode = $("#vendorCode").val();
	var mainCategory = $("#mainCategory").val();
	var subCategory = $("#subCategory").val();
	var articleCode = $("#articleCode").val();
	var skinPurity = $("#skinPurity").val();
	var vendorObj = $("#vendorObj").val();
	vendorObj = vendorObj.join(',');
	fieldFilters = {
		"fieldFilters" : {}
	};
	if (vendorObj.length != 0 && typeof vendorObj != "undefined") {

		fieldFilters.fieldFilters["vendorCode"] = vendorObj;
	}
	if (skinPurity != "" && skinPurity != null) {
		fieldFilters.fieldFilters["metalPurity"] = skinPurity;
	}
	if (jewelType != "" && jewelType != null) {
		fieldFilters.fieldFilters["jewelType"] = jewelType;
	}
	if (segment != "" && segment != null) {
		fieldFilters.fieldFilters["segment"] = segment;
	}
	if (mainCategory != "" && mainCategory != null) {
		fieldFilters.fieldFilters["mainCategory"] = mainCategory;
	}
	if (subCategory != "" && subCategory != null) {
		fieldFilters.fieldFilters["subCategory"] = subCategory;
	}
	if (articleCode != "" && articleCode != null) {
		fieldFilters.fieldFilters["articleCode"] = articleCode;
	}
		
	var newData = [];
	var rows = $("#jqxgrid").jqxGrid('getrows');
	if(typeof rows == "undefined"){
		$.growl.error({
			message : "No Data to Export.",
			duration : 10000
		});
		return false;
	 }else{				
		var rows = $("#jqxgrid").jqxGrid('getdatainformation');
		if(rows.rowscount != 0){
			postJSON('/OrderExecution/api/v1/downloadVendorArticle',JSON.stringify(fieldFilters),function(response) {
				if (response != null) {
					data = response.payload.list;
					exportVendorFGMasterSideBySide(data);
				}
			});
		}
		 else{
			$.growl.error({
				message : "No Data to Export.",
				duration : 10000
			});
			return false;	
		}
	 }
});

function exportVendorFGMasterSideBySide(data){

	var sql0 = 'SEARCH / AS @vh \
		RETURN ( \
		   @vh->[vrHeaderId] AS [VHeaderId], \
	       @vh->[vendor]->vendorName AS [vendor] ,\
		   @vh->[articleDesc] AS [ArticleDescription], \
	       @vh->[pureMetalRate]->pureMetalRate AS [pureMetalRate], \
		   @vh->[category]->description AS [MainCategory], \
	       @vh->[jtypeId]->description AS [jewelType], \
	       @vh->[msegDTO]->description AS [segment], \
	       @vh->[subcatDTO]->description AS [subCategoryDescription], \
		   @vh->baseCostMCIncrmental AS [BaseCostMCIncreamental], \
	       @vh->baseCostMCWastagePG AS [BaseCostMCWastagePG], \
	       @vh->costMCPerc AS [CostMCPerc], \
	       @vh->expectedWt AS [ExpectedWt], \
	       @vh->FromWtCost AS [fromWtCost], \
	       @vh->incrementalVal AS [IncreamentalVal], \
	       @vh->isActive AS [IsActive], \
	       @vh->mackingCharges AS [MakingCharges], \
	       @vh->mcChargeType AS [MCChargeType], \
	       @vh->mcWastagePerGm AS [MCWastagePerGM], \
	       @vh->metalRateForPurity AS [MetalRateForPurity], \
	       @vh->sellingPriceColumnRef AS [TabRef], \
	       @vh->skinPurity AS [SkinPurity], \
	       @vh->toWtCost AS [ToWtCost], \
	       @vh->wastageCharge AS [WastageCharges], \
	       @vh->wastageChargeType AS [WastageChargeType], \
	       @vh->[mupTypeId]->description AS [MupType] \
			) \
		FROM $0';
	

	 var sql1 = 'SELECT * FROM ? AS m ';
    
 var res = null;
    
    var mystyle = {
      cellStyles: true,
      headers:true, 
      column: {style:{Font:{Bold:30}}},
      rows: {1:{style:{Font:{Color:"#FF0077"}}}},
      cells: {1:{1:{
        style: {Font:{Color:"#00FFFF"}}
      }}}
    };
    
    try
    {
    	// Following code generates export data as Master-Child side-by-side
    	res0 = alasql(sql0,[data]);
    	//res1 = alasql(sql1,[data]);
    	res = alasql(sql1,[res0, res]);
    	adjustObjectKeys(res); 
    	removeNullData(res);
    	res = alasql("SELECT * INTO XLSX('VendorArticleFGDetails.xlsx',?) FROM ?",[mystyle, res]);
    }
    catch (err)
    {
    	alert(err.message);
    }

	
}


///////************************upload Functionality Implementation Done By Venkat*************/////////////
function isEmpty(obj) {
    for(var key in obj) {
        if(key == undefined)
            return false;
    }
    return true;
} 
function HandleUploadExcelFile()
{
	// Check if file select event is captured
	if (fileEvent == null || (fileEvent != null && $.type(fileEvent) != "object"))
	{
		alert("Please select the data Excel file to load!");
		return;
	}

	var event = fileEvent;
    try {
	    alasql('SELECT * FROM FILE(?,{headers:true})', [event], function(data){
	        // Process data here if any conversion or validation is required!
			if (data != null)
			{
				var cols = getColumnHeaders(data);
				if (cols != null && cols.length > 0) {
				}
				else {
					alert("No data found in the uploaded file...");
				}
				console.log(JSON.stringify(data));
				var dataVendorDetails = [];
				$.each(data,function(key,value){
					var flag = false;
					if(value.vrHeaderId != null && value.vrHeaderId != 'undefined' && value.vrHeaderId != '')
					{
						if(dataVendorDetails.length>0){
							$.each(dataVendorDetails,function(index,dataValue){
								if(value.vrHeaderId == dataValue.vrHeaderId){
									flag = true;
									var row ={	
											"articleDetailId" : value.DetailId,
											"articleHeaderId" : value.vrHeaderId,
											"baseCostMCIncrmental" : value.BaseCostMCIncreamental,
											"baseCostMCWastagePG" : value.BaseCostMCWastagePG,
											"costMCPerc" : value.CostMCPerc,
											"costWastagePerc" : value.costWastagePerc,
											"expectedWt" : value.ExpectedWt,
											"fromWtCost" : value.fromWtCost,
											"incrementalVal" : value.IncreamentalVal,
											"isActive" :  value.IsActive,
											"mackingCharges" : value.MakingCharges,
											"mcChargeType" : value.MCChargeType,
											"mcWastagePerGm" : value.MCWastagePerGM,
											"metalRateForPurity" : value.MetalRateForPurity,
											"sellingPriceColumnRef" : value.TabRef,
											"skinPurity" : value.SkinPurity,
											"toWtCost" : value.ToWtCost,
											"wastageCharge" : value.WastageCharges,
											"wastageChargeType" : value.WastageChargeType,
											"mupTypeId" : {
												"id" : value.MupType								
											}
									}
									dataValue.vendorArtilceDetails.push(row);
									return;
								}
							});
						}
						if(flag == false){
							var rowObj = {
									"vrHeaderId" : value.vrHeaderId,
									"articleDesc" : value.ArticleDescription,
									"vendor" : {
										"id": value.vendor
									},
									"article" : {
										"id" : value.ArticleId
									},
									"pureMetalRate" : value.pureMetalRate,
									"category" : {
										"id" : value.MainCategory,
									},
									"jtypeId" : {
										"id" : value.jewelType,
									},
									"msegDTO" : {
										"id" : value.segment,
									},
									"subcatDTO" : {
										"id" : value.subCategoryId,
									},									
									"vendorArtilceDetails":[{
										"articleDetailId" : value.DetailId,
										"articleHeaderId" : value.vrHeaderId,
										"baseCostMCIncrmental" : value.BaseCostMCIncreamental,
										"baseCostMCWastagePG" : value.BaseCostMCWastagePG,
										"costMCPerc" : value.CostMCPerc,
										"costWastagePerc" : value.costWastagePerc,
										"expectedWt" : value.ExpectedWt,
										"fromWtCost" : value.fromWtCost,
										"incrementalVal" : value.IncreamentalVal,
										"isActive" :  value.IsActive,
										"mackingCharges" : value.MakingCharges,
										"mcChargeType" : value.MCChargeType,
										"mcWastagePerGm" : value.MCWastagePerGM,
										"metalRateForPurity" : value.MetalRateForPurity,
										"sellingPriceColumnRef" : value.TabRef,
										"skinPurity" : value.SkinPurity,
										"toWtCost" : value.ToWtCost,
										"wastageCharge" : value.WastageCharges,
										"wastageChargeType" : value.WastageChargeType,
										"mupTypeId" : {
											"id" : value.MupType
										}
									}]
									
							}
							dataVendorDetails.push(rowObj);
						}
					}else{
						var rowObj = {
								"vrHeaderId" : null,
								"articleDesc" : value.ArticleDescription,
								"vendor" : {
									"id": value.vendor
								},
								"article" : {
									"id" : value.ArticleId
								},
								"pureMetalRate" : value.pureMetalRate,
								"category" : {
									"id" : value.MainCategory,
								},
								"jtypeId" : {
									"id" : value.jewelType,
								},
								"msegDTO" : {
									"id" : value.segment,
								},
								"subcatDTO" : {
									"id" : value.subCategoryId,
								},									
								"vendorArtilceDetails":[{
									"articleDetailId" : value.DetailId,
									"articleHeaderId" : value.vrHeaderId,
									"baseCostMCIncrmental" : value.BaseCostMCIncreamental,
									"baseCostMCWastagePG" : value.BaseCostMCWastagePG,
									"costMCPerc" : value.CostMCPerc,
									"costWastagePerc" : value.costWastagePerc,
									"expectedWt" : value.ExpectedWt,
									"fromWtCost" : value.fromWtCost,
									"incrementalVal" : value.IncreamentalVal,
									"isActive" :  value.IsActive,
									"mackingCharges" : value.MakingCharges,
									"mcChargeType" : value.MCChargeType,
									"mcWastagePerGm" : value.MCWastagePerGM,
									"metalRateForPurity" : value.MetalRateForPurity,
									"sellingPriceColumnRef" : value.TabRef,
									"skinPurity" : value.SkinPurity,
									"toWtCost" : value.ToWtCost,
									"wastageCharge" : value.WastageCharges,
									"wastageChargeType" : value.WastageChargeType,
									"mupTypeId" : {
										"id" : value.MupType
									}
								}]
								
						}
						dataVendorDetails.push(rowObj);
					}
				});
				var arrFg = [];		
				debugger;
				for(var i=0;i<dataVendorDetails.length;i++){
					/*if(dataVendorDetails[i].vrHeaderId == null && isEmpty(dataVendorDetails[i].vendor) && isEmpty(dataVendorDetails[i].category) &&
							isEmpty(dataVendorDetails[i].jtypeId) && isEmpty(dataVendorDetails[i].msegDTO) && isEmpty(dataVendorDetails[i].subcatDTO) &&
							isEmpty(dataVendorDetails[i].vendorArtilceDetails[0].mupTypeId) ) {*/
					if(dataVendorDetails[i].vrHeaderId == null && dataVendorDetails[i].vendor.id == undefined && dataVendorDetails[i].category.id==undefined &&
							dataVendorDetails[i].jtypeId.id == undefined && dataVendorDetails[i].msegDTO.id == undefined && dataVendorDetails[i].subcatDTO.id==undefined &&
							dataVendorDetails[i].vendorArtilceDetails[0].mupTypeId.id == undefined ) {	
						
					} else {
						arrFg.push(dataVendorDetails[i]);
					}
				}
				var sdetails = JSON.stringify(arrFg);
				console.log(sdetails);
				// Calling API to upload Parameter Details.
				postJSON('/OrderExecution/api/v1/UploadVendorArticle', sdetails, function(response) {
					if (response.resCode == 1) {
						$.growl.notice({
							message : response.mesgStr,
							duration : 10000,
							title : 'Success'
						});
						return false;
					}else {
						$.growl.error({
							message : response.mesgStr,
							duration : 10000
						});
						return false;
					}
					
				});
				
			}
			else {
				alert("Invalid data in the uploaded file...");
			}

	    });	    	
    }
	catch(err) {
		alert('Upload Error: ', err);
	};

	//change the 'testUpload' to the input id in your page
	document.getElementById("vendorFGUpload").value = "";
	fileEvent = null;
 }

 function captureFileSelectEvent(event)
 {
 	fileEvent = event;
 }
 
 ///////////Download the VendorFG Article ///////////////////////////
 $("#downloadVfgData").on("click",function(){
		var segment = $("#segment").val();
		var jewelType = $("#jewelType").val();
		var vendorCode = $("#vendorCode").val();
		var mainCategory = $("#mainCategory").val();
		var subCategory = $("#subCategory").val();
		var articleCode = $("#articleCode").val();
		var skinPurity = $("#skinPurity").val();
		var vendorObj = $("#vendorObj").val();
		vendorObj = vendorObj.join(',');
		fieldFilters = {
			"fieldFilters" : {}
		};
		if (vendorObj.length != 0 && typeof vendorObj != "undefined") {

			fieldFilters.fieldFilters["vendorCode"] = vendorObj;
		}
		if (skinPurity != "" && skinPurity != null) {
			fieldFilters.fieldFilters["metalPurity"] = skinPurity;
		}
		if (jewelType != "" && jewelType != null) {
			fieldFilters.fieldFilters["jewelType"] = jewelType;
		}
		if (segment != "" && segment != null) {
			fieldFilters.fieldFilters["segment"] = segment;
		}
		if (mainCategory != "" && mainCategory != null) {
			fieldFilters.fieldFilters["mainCategory"] = mainCategory;
		}
		if (subCategory != "" && subCategory != null) {
			fieldFilters.fieldFilters["subCategory"] = subCategory;
		}
		if (articleCode != "" && articleCode != null) {
			fieldFilters.fieldFilters["articleCode"] = articleCode;
		}
			
		var newData = [];
		var rows = $("#jqxgrid").jqxGrid('getrows');
		if(typeof rows == "undefined"){
			$.growl.error({
				message : "No Data to Export.",
				duration : 10000
			});
			return false;
		 }else{				
			var rows = $("#jqxgrid").jqxGrid('getdatainformation');
			if(rows.rowscount != 0){
				postJSON('/OrderExecution/api/v1/downloadVendorArticle',JSON.stringify(fieldFilters),function(response) {
					if (response != null) {
						data = response.payload.list;
						downloadVendorFGMasterSideBySide(data);
					}
				});
			}
			 else{
				$.growl.error({
					message : "No Data to Export.",
					duration : 10000
				});
				return false;	
			}
		 }
	});
 
 ////////****************download Vendor FG *************//////////////
 function downloadVendorFGMasterSideBySide(data){
		var sql0 = 'SEARCH / AS @vh \
			RETURN ( \
			   @vh->[vrHeaderId] AS [vrHeaderId], \
		       @vh->[vendor]->vendorId AS [vendor] ,\
			   @vh->[vendor]->vendorName AS [vendorName] ,\
			   @vh->[article]->id AS [ArticleId], \
			   @vh->[articleDesc] AS [ArticleDescription], \
		       @vh->[pureMetalRate] AS [pureMetalRate], \
			   @vh->[category]->id AS [MainCategory], \
			   @vh->[category]->description AS [MainCategoryDesc], \
		       @vh->[jtypeId]->id AS [jewelType], \
			   @vh->[jtypeId]->description AS [jewelTypeDesc], \
		       @vh->[msegDTO]->segmentId AS [segment], \
			   @vh->[msegDTO]->description AS [segmentDesc], \
		       @vh->[subcatDTO]->id AS [subCategoryId], \
			   @vh->[subcatDTO]->description AS [subCategoryDescription], \
			   @vh->articleDetailId AS [DetailId], \
			   @vh->baseCostMCIncrmental AS [BaseCostMCIncreamental], \
		       @vh->baseCostMCWastagePG AS [BaseCostMCWastagePG], \
		       @vh->costMCPerc AS [CostMCPerc], \
		       @vh->expectedWt AS [ExpectedWt], \
		       @vh->fromWtCost AS [fromWtCost], \
		       @vh->incrementalVal AS [IncreamentalVal], \
		       @vh->isActive AS [IsActive], \
		       @vh->mackingCharges AS [MakingCharges], \
		       @vh->mcChargeType AS [MCChargeType], \
		       @vh->mcWastagePerGm AS [MCWastagePerGM], \
		       @vh->metalRateForPurity AS [MetalRateForPurity], \
		       @vh->sellingPriceColumnRef AS [TabRef], \
		       @vh->skinPurity AS [SkinPurity], \
		       @vh->toWtCost AS [ToWtCost], \
		       @vh->wastageCharge AS [WastageCharges], \
		       @vh->wastageChargeType AS [WastageChargeType], \
		       @vh->[mupTypeId]->id AS [MupType], \
			   @vh->[mupTypeId]->description AS [MupTypeDesc] \
				) \
			FROM $0';
		

		 var sql1 = 'SELECT * FROM ? AS m ';
	    
	 var res = null;
	    
	    var mystyle = {
	      cellStyles: true,
	      headers:true, 
	      column: {style:{Font:{Bold:30}}},
	      rows: {1:{style:{Font:{Color:"#FF0077"}}}},
	      cells: {1:{1:{
	        style: {Font:{Color:"#00FFFF"}}
	      }}}
	    };
	    
	    try
	    {
	    	// Following code generates export data as Master-Child side-by-side
	    	res0 = alasql(sql0,[data]);
	    	//res1 = alasql(sql1,[data]);
	    	res = alasql(sql1,[res0, res]);
	    	adjustObjectKeys(res); 
	    	removeNullData(res);
	    	res = alasql("SELECT * INTO XLSX('DownloadVendorArticleFGDetails.xlsx',?) FROM ?",[mystyle, res]);
	    }
	    catch (err)
	    {
	    	alert(err.message);
	    }

		

	 
	 
 }