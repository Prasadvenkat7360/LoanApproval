<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<form:form method="POST" action="designSubmit" id="designReview">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">&times;</button>
		<!--  Title Goes Here -->
		<h4 class="modal-title">Stone PO View</h4>
	</div>
	<div class="clearfix">&nbsp;</div>
	<div class="mobile-responsive" style="padding: 10px;">
		<table class="table table-bordered table-condensed"
			style="width: 100%;">
			<tr>
				<td width="13%" style="background-color: #F5F5F5;"><label>Stone
						Indent No</label></td>
				<td width="20%" id="indentNo">&nbsp; ${indentData.id}</td>

				<td width="13%" style="background-color: #F5F5F5;"><label>Date
						& Time</label></td>
				<td width="20%">&nbsp;
						${indentData.creationDate}</td>

				<td width="13%" style="background-color: #F5F5F5;"><label>Stone
						Dealer Code</label></td>
				<td width="20%">&nbsp; ${indentData.vendor.vendorCode}</td>

			</tr>


			<tr>
				<td width="13%" style="background-color: #F5F5F5;"><label>Stone
						PO Amount</label></td>
				<td width="20%" id="indentNo">&nbsp; ${indentData.indentAmount}</td>

				<td width="13%" style="background-color: #F5F5F5;"><label>Segment</label></td>
				<td width="20%">&nbsp; ${indentData.segment.description}</td>

				<td width="13%" style="background-color: #F5F5F5;"><label>Status</label></td>

				<td width="20%">${indentData.status.type}</td>


			</tr>
			
			<tr>
				
				</tr>


			<c:choose>
				<c:when test="${indentData.status eq 'R'}">
					<tr>
					<td width="13%" style="background-color: #F5F5F5;"><label>PO Raised by</label></td>
				<td width="20%" id="indentNo">&nbsp; ${indentData.createdBy}</td>
						<td width="13%" style="background-color: #F5F5F5;"><label>GRV
								No.</label></td>
						<td width="20%" id="indentNo">&nbsp; ${indentData.mrvNo}</td>

					</tr>
					<tr>
						
							<td style="background-color: #F5F5F5;"><label><span
								class="required">*</span>Reason for Return</label></td>
						<td colspan="5">&nbsp; <textarea rows="2" id="reasonforReturn"
								name="reasonforReturn" class="form-control" style="resize: none;"
								maxlength="490" cols="50"></textarea></td>
							
					</tr>
				</c:when>
				<c:when test="${indentData.status eq 'G'}">
				<tr>
				<td width="13%" style="background-color: #F5F5F5;"><label>PO Raised by</label></td>
				<td width="20%" id="indentNo">&nbsp; ${indentData.createdBy}</td>
				</tr>
					<tr>
						<td style="background-color: #F5F5F5;"><label><span
								class="required">*</span>Reason for Cancel</label></td>
						<td colspan="5">&nbsp; <textarea rows="2" id="reason"
								name="reason" class="form-control" style="resize: none;"
								maxlength="490" cols="50"></textarea></td>
					</tr>
				</c:when>
				<c:otherwise>
				<tr>
				<td width="13%" style="background-color: #F5F5F5;"><label>PO Raised by</label></td>
				<td width="20%" id="indentNo">&nbsp; ${indentData.createdBy}</td>
				</tr>
					<tr>
						<td style="background-color: #F5F5F5;"><label>Reason
								for Cancel</label></td>
						<td colspan="5">&nbsp; ${indentData.reasonForCancel}</td>
					</tr>
				</c:otherwise>
			</c:choose>

		</table>


		<div class="narrow text-center">

			<div class="resposive-table-data narrow text-center">
				<table class="table table-bordered table-hover meting-table"
					id="dynamicTable2">
					<thead>
						<th>Sl.No</th>
						<th>Main Category</th>
						<th>Shape</th>
						<th>Sub Category</br> Concate</th>
						<th>Article Code</th>
						<th>No. Of pcs</th>
						<th>Stone Wt.</th>
						<th>UQC</th>
						<th>Stone Rate</br> INR(per. Ct)</th>
						<th>Rate</br> Confirmation</th>
						
						


						<c:if test="${indentData.segment.description eq 'Diamond'}">

							<th>Clarity</th>
							<th>ActualColor</th>
							<th>Color</th>
							<th>Cut Grade</th>
							<th>WeightRange</th>
							<!-- <th>weight</th> -->
							<th>Rap Price</br> Per carat (in $)</th>
							<th>RAP Discount %</th>
							<th>RAP Premium %</th>
							<th>Net Rate</br> Per.ct. in $
							</th>
							<th>$ Rate</th>
						</c:if>
						<th> Stone Value
						</th>
						<th>Remarks</th>
						<th>Due Date</th>
						<c:if test="${indentData.status eq 'R'}">
							<th>Ref</br> Type</th>
							<th>Vendor</br> Inv No.</th>
							<th>Ref</br> Sl No.</th>
							<th>Vendor</br> Inv Date</th>
							<th>Location</th>
							<th>Inv Amt </br> Before Tax</th>
							<th>IGST</br>%</th>
							<th>IGST</br>  Amt</th>
							<th>SGST</br>%</th>
							<th>SGST</br>  Amt</th>
							<th>CGST</br>%</th>
							<th>CGST</br>  Amt</th>
							<th>Cess</br>%</th>
							<th>Cess</br>  Amt</th>
							<th>Total</th>
							<th></th>
						</c:if>
					</thead>
					<tbody id="itatb">
						<c:set var="count" value="0" scope="page" />
						<c:forEach var="stoneIndent" items="${stoneIndentDetailList}" varStatus="status">
							<tr id="0">
								<td>${stoneIndent.serialNumber}</td>
								<td>${stoneIndent.category.description}</td>
								<td>${stoneIndent.shape}</td>
								<td>${stoneIndent.description}</td>
								<td>${stoneIndent.stoneCode}</td>
								<c:if test="${indentData.status eq 'G'}">
									<td id="pcs_${count}">${stoneIndent.peices}</td>
									<td id="wts_${count}"> <fmt:formatNumber pattern="0.000" type = "number" 
         maxFractionDigits = "3" value = "${stoneIndent.weight}" /></td>
								</c:if>
								<c:if test="${indentData.status eq 'R'}">
									<td id="pcs_${count}">${stoneReceiptDetailList[status.index].stonePeices}</td>
									<td id="wts_${count}"><fmt:formatNumber pattern="0.000" type = "number" 
         maxFractionDigits = "3" value = "${stoneReceiptDetailList[status.index].stoneWeight}" /></td>
								</c:if>
								<td>${stoneIndent.uom.type}<input type="hidden" id="uomId" value="${stoneIndent.uom.type}" /></td>
								<c:if test="${indentData.status eq 'G'}">
									<td><fmt:formatNumber pattern="0.00" type = "number" 
         maxFractionDigits = "3" value = "${stoneIndent.stoneRatePerCaratInINR}" /></td>
								</c:if>
								<c:if test="${indentData.status eq 'R'}">
									<td><fmt:formatNumber pattern="0.00" type = "number" 
         maxFractionDigits = "3" value = "${stoneReceiptDetailList[status.index].stoneRatePerCaratInINR}" /></td>
								</c:if>
								<td>${stoneIndent.rateConfirmed}</td>

								<c:if test="${indentData.segment.description eq 'Diamond'}">
									<td>${stoneIndent.clarity}</td>
									<td>${stoneIndent.actualColor}</td>
									<td>${stoneIndent.color}</td>
									<td>${stoneIndent.cut}</td>
									<td>${stoneIndent.weightRange}</td>
									<%-- <td>${stoneIndent.weight}</td> --%>
									<td><fmt:formatNumber pattern="0.00" type = "number" 
         maxFractionDigits = "3" value = "${stoneIndent.rapRatePerCaratInDollars}" /></td>
									<td>${stoneIndent.discountOrPremiumType}</td>
									<td>${stoneIndent.rapPremium}</td>
								
								
									<td><fmt:formatNumber pattern="0.00" type = "number" 
         maxFractionDigits = "3" value = "${stoneIndent.netRatePerCaratInDollars}" /></td>
									<td>${stoneIndent.dollar}</td>
								</c:if>
								<td><fmt:formatNumber pattern="0.00" type = "number" 
         maxFractionDigits = "3" value = "${stoneIndent.value}" /></td>
								<td>${stoneIndent.remarks}</td>

								<td><fmt:formatDate pattern="dd-MM-yyyy"
										value="${stoneIndent.dueDate}" /></td>
								<c:if test="${indentData.status eq 'R'}">
									<td>GRV</td>
									<td>${stoneReceiptDetailList[status.index].stoneReceipt.billNumber }</td>
									<td>${stoneReceiptDetailList[status.index].serialNumber}</td>
									<td><fmt:formatDate pattern = "dd-MM-yyyy" value = "${stoneReceiptDetailList[status.index].stoneReceipt.billDate}" /></td>
									<td>${stoneReceiptDetailList[status.index].locationCode}</td>
									<td id="invA_${count}">${stoneReceiptDetailList[status.index].stoneValue}</td>
									<td>${stoneReceiptDetailList[status.index].igstPrc}</td>
									<td  id="totalIgst_${count}"><fmt:formatNumber pattern="0.00" type = "number" 
         maxFractionDigits = "3" value = "${stoneReceiptDetailList[status.index].igstAmt}" /></td>
									<td>${stoneReceiptDetailList[status.index].sgstPrc}</td>
									<td  id="totalSgst_${count}"><fmt:formatNumber pattern="0.00" type = "number" 
         maxFractionDigits = "3" value = "${stoneReceiptDetailList[status.index].sgstAmt}" /></td>
									<td>${stoneReceiptDetailList[status.index].cgstPrc}</td>
									<td  id="totalCgst_${count}"><fmt:formatNumber pattern="0.00" type = "number" 
         maxFractionDigits = "3" value = "${stoneReceiptDetailList[status.index].cgstAmt}" /></td>
									<td>${stoneReceiptDetailList[status.index].cessPrc}</td>
									<td  id="totalCess_${count}"><fmt:formatNumber pattern="0.00" type = "number" 
         maxFractionDigits = "3" value = "${stoneReceiptDetailList[status.index].cessAmt}" /></td>
									<td style="display: none;"><input type="text" id="srdId_${count}" value="${stoneReceiptDetailList[status.index].id}" /></td>
									<td style="display: none;"><input type="text" id="mrvsts_${count}" value="${stoneReceiptDetailList[status.index].mrvStatus}" /></td>
									<td id="totalV_${count}"><fmt:formatNumber pattern="0.00" type = "number" 
         maxFractionDigits = "3" value = "${stoneReceiptDetailList[status.index].totalValue}" /></td>
									<td>
										<c:choose>
											<c:when test="${stoneReceiptDetailList[status.index].mrvStatus == 'RET'}">
												<input type="checkbox" id="row_${count}" name="row_${count}" checked="checked" disabled="disabled"/>
											</c:when>
											<c:when test="${stoneReceiptDetailList[status.index].mrvStatus == 'P'}">
												<input type="checkbox" id="row_${count}" name="row_${count}" disabled="disabled"/>
											</c:when>
											<c:when test="${stoneReceiptDetailList[status.index].mrvStatus == 'GR'}">
												<input type="checkbox" id="row_${count}" name="row_${count}" disabled="disabled"/>
											</c:when>
											<c:otherwise>
												<input type="checkbox" id="row_${count}" name="row_${count}"/>
											</c:otherwise>
										</c:choose>
									</td>	
										
									<c:set var="count" value="${count + 1}" scope="page"/>
								</c:if>
							</tr>
						</c:forEach>
							<tr>
								<c:if test="${indentData.status eq 'R'}">
									<th></th>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
									<th id="totalPcs"></th>
									<th id="totalWt"></th>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
									<c:if test="${indentData.segment.description eq 'Diamond'}">
										<th></th>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
									</c:if>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
									<th></th>
									<th id="totalInvAmt"></th>
									<th></th>
									<th id="totalIgstAmt"></th>
									<th></th>
									<th id="totalSgstAmt"></th>
									<th></th>
									<th id="totalCgstAmt"></th>
									<th></th>
									<th id="totalCessAmt"></th>
									<th id="totalAmt"></th>
									<th></th>
								</c:if>
							</tr>
					</tbody>
				</table>
				<input type="hidden" id="countVal" value="${count}" />
			</div>
		</div>
		<div class="modal-footer  text-center">

			<c:if test="${indentData.status eq 'G'}">
				<button type="button" class="btn btn-primary" id="mrv"
					data-dismiss="modal" aria-hidden="true">
					<i class="fa fa-file-text-o"></i>&nbsp; Raise GRV
				</button>

				<button type="button" class="btn btn-warning" id="cancel">
					<i class="fa fa-times"></i>&nbsp; Cancel PO
				</button>
			</c:if>
			<c:if test="${indentData.status eq 'R'}">
				<button type="button" class="btn btn-primary" id="stoneIndentReturn">
					 Raise GIV (Return)
				</button>
			</c:if>
			<c:if test="${indentData.status eq 'RE'}">
			<button class="btn btn-primary" type="button" id="indentReturnReport">
				<i class="fa fa-print fa-lg"></i> GRV Return Print
			</button>
			</c:if>
			<button class="btn btn-primary" type="button" id="indentReport" onclick='generateReportIndent("${indentData.id}","${indentData.segment.description}","${indentData.status}")'>
				<i class="fa fa-print fa-lg"></i> Print
			</button>

			<button type="submit" class="btn btn-warning" data-dismiss="modal"
				aria-hidden="true">
				<i class="fa fa-times"></i>&nbsp;Close
			</button>
		</div>
	</div>
	<div class="clearfix">&nbsp;</div>
</form:form>
<div class="modal fade" id="confirm" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top: 10%;">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
			<div class="modal-body text-center">
		    Are you sure you want return it back.
		  </div>
		  <div class="modal-footer">
		    <button type="button" data-dismiss="modal" class="btn btn-primary" id="okProceed">Ok</button>
		    <button type="button"  class="btn" id="cancelPopup">Cancel</button>
		  </div>
        </div>
    </div>
</div>

<script type="text/javascript">
var NVL = function(source, replaceMentValue){
	if(typeof source != "undefined" && source != null && source != ""){
		return source;
	}
	else return replaceMentValue;
}
/* $("#stoneWeight").text().toFixed(3);
$("#stoneWeight2").text().toFixed(3); */
function sumTotal(){
	var count = $('#countVal').val();
	var totalPcs = 0;
	var totalWt = 0;
	var totalInvAmt = 0;
	var totalIgstAmt = 0;
	var totalAmt = 0;
	var totalSgstAmt = 0;
	var totalCgstAmt = 0;
	var totalCessAmt = 0;
	for(var i=0;i<=count;i++){
		totalPcs = parseInt(totalPcs) + parseInt(NVL($('#pcs_'+i).text(), 0));
		totalWt = parseFloat(totalWt) + parseFloat(NVL($('#wts_'+i).text(), 0)).toFixed(3);
		totalInvAmt = parseFloat(totalInvAmt) + parseFloat(NVL($('#invA_'+i).text(), 0));
		totalAmt = parseFloat(totalAmt) + parseFloat(NVL($('#totalV_'+i).text(), 0));
		
		totalSgstAmt = parseFloat(totalSgstAmt) + parseFloat(NVL($('#totalSgst_'+i).text(), 0));
		totalIgstAmt = parseFloat(totalIgstAmt) + parseFloat(NVL($('#totalIgst_'+i).text(), 0));
		totalCgstAmt = parseFloat(totalCgstAmt) + parseFloat(NVL($('#totalCgst_'+i).text(), 0));
		totalCessAmt = parseFloat(totalCessAmt) + parseFloat(NVL($('#totalCess_'+i).text(), 0));
	}
	
	$('#totalPcs').html('Sum: ' + parseFloat(totalPcs).toFixed(2));
	$('#totalWt').html('Sum: ' + parseFloat(totalWt).toFixed(2));
	$('#totalInvAmt').html('Sum: ' + parseFloat(totalInvAmt).toFixed(2));
	$('#totalAmt').html('Sum: ' + parseFloat(totalAmt).toFixed(2));
	
	$('#totalSgstAmt').html('Sum: ' + parseFloat(totalSgstAmt).toFixed(2));
	$('#totalIgstAmt').html('Sum: ' + parseFloat(totalIgstAmt).toFixed(2));
	$('#totalCgstAmt').html('Sum: ' + parseFloat(totalCgstAmt).toFixed(2));
	$('#totalCessAmt').html('Sum: ' + parseFloat(totalCessAmt).toFixed(2));
	
}

sumTotal();
	
function stoneMRVDetails(){
	var stoneReceiptDetailIDs = "";
	fieldFilters = {
		"fieldFilters" : {}
	};
	
	var stoneReceiptDetailList = '';
	var count = $('#countVal').val();
	for(var i = 0; i<count;i++){
		var selection = $('#row_'+i).is(':checked');
		var data = $('#srdId_'+i).val();
		var status = $('#mrvsts_'+i).val();
		if(selection && status != 'RET'){
			stoneReceiptDetailIDs = stoneReceiptDetailIDs + data + ",";
		}
	}
	
	if(null == stoneReceiptDetailIDs || "" == stoneReceiptDetailIDs){
		return null;
	}
	
	fieldFilters.fieldFilters["mrvId"] =  '${indentData.mrvNo}';
	fieldFilters.fieldFilters["indentId"] = '${indentData.id}';
	fieldFilters.fieldFilters["reason"] = $("#reasonforReturn").val();
	fieldFilters.fieldFilters["uom"] = $("#uomId").val();
	fieldFilters.fieldFilters["stoneReceiptDetailIds"] = stoneReceiptDetailIDs;

	return fieldFilters;
}

$("#mrv").on("click",function(e) {
	showContentPage('stoneIndentMRV?indentId=${indentData.id}','bodySwitcher');
	$("#btnIndentDA").modal('hide');
	$('.modal-backdrop').hide();
});
	
$("#cancel").on("click",function() {
	var reason = $('#reason').val();
	var indentDetail = {
		"stoneIndentId" : '${indentData.id}',
		"reasonForCancel" : reason
	}

	if (reason.length > 0) {
		postJSON('/OrderExecution/api/v1/cancelStoneIndent', JSON
				.stringify(indentDetail), function(data) {
			if (1 == data.resCode) {
				$("#jqxgrid").jqxGrid("updatebounddata");
				$("#stoneIndentData").modal('hide');
				$.growl.notice({
					message : "Stone PO number: "
							+ data.payload.id + " is cancelled.",
					duration : 10000,
					title : ''
				});

				return true;

			} else {
				$.growl.error({
					message : data.mesgStr,
					duration : 10000,
					title : 'Error'
				});
				return false;
			}

		});
	} else {
		$.growl.error({
			message : "Reason for Cancel is mandatory",
			duration : 10000,
			title : 'Error'
		});
		return false;
	}
});
	 
$("#cancelPopup").on("click",function() {				
	$('#confirm').modal('hide');					
});
	 
	 	 
 $( "#indentReturnReport" ).click(function() {
	 var StoneIndentNo="${indentData.id}";
	 fieldFilters = {
	            "fieldFilters" : {
	                "stoneIndentNo" : StoneIndentNo,
	                "mode" : "pdf",
	                "reportName" : "RPT_Stone_Diamond_MIV"
	            }
	        };
		jasperReport('RPT_Stone_Diamond_MIV.pdf', fieldFilters); 
	 
 });
/* $( "#indentReport" ).on('click',function() {
	alert('here');
}); */

var generateReportIndent = function(StoneIndentNo, segment,status){
	//var StoneIndentNo="${indentData.id}";
	//var segment="${indentData.segment.description}";
	//var status="${indentData.status}";
	console.log(StoneIndentNo);
	console.log(segment);
	console.log(status);
	
	if(StoneIndentNo!=null && (segment=="Diamond" || segment=="Other Stones" || segment=="Precious Stones") && status=='R')
  	{
		fieldFilters = {"fieldFilters" : {"stoneIndentNo" : StoneIndentNo,"mode" : "pdf","reportName" : "RPT_Stone_GRV_Indent"}};
		jasperReport('RPT_Stone_GRV_Indent.pdf', fieldFilters); 
	}	
	
	if(StoneIndentNo!=null && segment=="Diamond" && status=='G')
	{
		fieldFilters = {"fieldFilters" : {"stoneIndentNo" : StoneIndentNo,"mode" : "pdf","reportName" : "RPT_Stone_Diamond_Indent"}};
		jasperReport('RPT_Stone_Diamond_Indent.pdf', fieldFilters);		
	
  	}	
	
	if(StoneIndentNo!=null && segment=="Other Stones" && status=='G')
	{
		fieldFilters = {"fieldFilters" : {"stoneIndentNo" : StoneIndentNo,"mode" : "pdf","reportName" : "RPT_Stone_Oth_Pre_Indent"}};
		jasperReport('RPT_Other_Stone_Indent.pdf', fieldFilters); 
	}

	if(StoneIndentNo!=null && segment=="Precious Stones" && status=='G')
 	{
		fieldFilters = {"fieldFilters" : {"stoneIndentNo" : StoneIndentNo,"mode" : "pdf","reportName" : "RPT_Stone_Oth_Pre_Indent"}};
		jasperReport('RPT_Precious_Stone_Indent.pdf', fieldFilters); 
	}	
}

$("#stoneIndentReturn").on(	"click",function(e) {
	var reqData = stoneMRVDetails();
	var reasonforReturn = $("#reasonforReturn").val();
	if(reqData == null || reqData == ""){
		$.growl.error({
			message : "Please Select Stone To Return",
			duration : 8000,
			title : 'Error'
		});
		return false;
	} 
	if (reasonforReturn == null || reasonforReturn == '') {
		$.growl.error({
			message : "Reason for return is mandatory",
			duration : 8000,
			title : 'Error'
		});
		return false;
	} else {
		$('#confirm').modal({
			backdrop : 'static',
			keyboard : false
		})
		$("#okProceed").on('click',	function(e) {
			postJSON('/OrderExecution/api/v1/stoneIndentReturn',JSON.stringify(reqData),function(data) {
				if (1 == data.resCode) {
					$('#stoneIndentData').modal('hide');
					$("#jqxgrid").jqxGrid("updatebounddata");
					$.growl.notice({
						message : "Successfully Created Stone PO GRV Return: " + data.payload.stoneReturn,
						duration : 10000,
						title : 'Success'
					});
	
				}else if(3 == data.resCode){
					$.growl.error({
						message : data.mesgStr,
						durtaion : 1000,
						title : 'Error'
					});
					return false;
				}
			});
		});
	}
});


</script>
<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>
