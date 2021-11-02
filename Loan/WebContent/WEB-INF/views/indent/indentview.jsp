<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<form:form method="POST" action="designSubmit" id="designReview">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal">&times;</button>
		<!--  Title Goes Here -->
		<h4 class="modal-title">Bullion PO View</h4>
	</div>
		<div class="clearfix">&nbsp;</div>
			<div class="mobile-responsive" style="padding:10px;">
						<table class="table table-bordered table-condensed" style="width: 100%;">
							<tr>
								<td width="13%" style ="background-color: #F5F5F5;"><label>PO No</label></td>
								<td width="20%" id="indentNo">&nbsp; ${indentMetal.id}</td>
								
								<td width="13%" style ="background-color: #F5F5F5;"><label>Date & Time</label></td>
								<td width="20%">&nbsp; ${indentMetal.creationDate}</td>
								
								<td width="13%" style ="background-color: #F5F5F5;"><label>Buillion Dealer Code</label></td>
								<td width="20%">&nbsp; ${indentMetal.bullionDealer.vendorCode}</td>
								
							</tr>
							<tr>
								<td style ="background-color: #F5F5F5;"><label>PO Raised by</label></td>
								<td>&nbsp; ${indentMetal.indentCreatedBy}</td>
								
								<td style ="background-color: #F5F5F5;"><label>Delivery Type</label></td>
								<td>&nbsp; ${indentMetal.deliveryType}</td>
								
								<td style ="background-color: #F5F5F5;"><label>Delivery Date</label></td>
								<td>&nbsp; ${indentMetal.iDeliveryDate}</td>
								
							</tr>
							<tr>
								
								<td  style ="background-color: #F5F5F5;"><label>Weight</label></td>
								<td>&nbsp; <fmt:formatNumber type="number" 
           									 minFractionDigits="3" value="${indentMetal.metalWeight}"/></td>
								
								<td  style ="background-color: #F5F5F5;"><label>Metal Rate</label></td>
								<td>&nbsp; <fmt:formatNumber type="number" 
           									 minFractionDigits="2" value="${indentMetal.inputRate}"/></td>
								
								<td  style ="background-color: #F5F5F5;"><label>Value</label></td>
								<td>&nbsp; <fmt:formatNumber type="number" 
           									 minFractionDigits="2" value="${indentMetal.indentAmount}"/></td>
							</tr>
							<tr>
								<td  style ="background-color: #F5F5F5;"><label>Metal Segment</label></td>
								<td>&nbsp; ${indentMetal.metalSegment.description}</td>
								
								<td  style ="background-color: #F5F5F5;"><label>Metal Purity</label></td>
								<td>&nbsp; <fmt:formatNumber type="number" 
           									 minFractionDigits="2" value="${indentMetal.purity}"/></td>
								
								<td  style ="background-color: #F5F5F5;"><label>Rate Confirmation</label></td>
								<td>&nbsp; 
									<c:choose>
										<c:when test="${indentMetal.rateConfirmed eq true}">
											Yes
										</c:when>
										<c:otherwise>
											No
										</c:otherwise>
									</c:choose>
								</td>
							</tr>
							<tr>
								<td  style ="background-color: #F5F5F5;"><label>HSN Code</label></td>
								<td>&nbsp; ${indentMetal.hsn.code}</td></tr>
							
							<tr>
								<td  style ="background-color: #F5F5F5;"><label>Remarks</label></td>
								<td colspan="5">&nbsp; ${indentMetal.remarks}</td>
							</tr>
							
							<c:choose>
							    <c:when test="${indentMetal.status eq 'G'}">
							        <tr>
							        	<td  style ="background-color: #F5F5F5;"><label><span class="required">*</span>Reason for Cancel</label></td>
										<td colspan="5">&nbsp; <textarea rows="2" id="reason"  name="reason" class="form-control" style="resize: none;" maxlength="490" cols="50"></textarea></td>
							        </tr>
							    </c:when>    
							    <c:otherwise>
							    	<tr>
								        <td  style ="background-color: #F5F5F5;"><label>Reason for Cancel</label></td>
										<td colspan="5">&nbsp; ${indentMetal.reasonForCancel}</td>
									</tr>
							    </c:otherwise>
							</c:choose>

						</table>
				
				<c:if test="${indentMetal.indentMetaDistributions.size() > 0}">
				<table class="table-striped table-bordered table-hover table-condensed" style="width: 100%;">
				<thead>
					<tr>
						<th width="10%">Sl No.</th>
						<th width="10%">Metal Purity</th>
						<th width="15%">Weight In Gms</th>
						<th width="10%">JW Code</th>
						<th width="30%">JW Name &Address</th>
						<th width="10%">Status</th>
						<th width="15%">Print Letter</th>
					</tr>
				</thead>
				<tbody id="reviewApproval">
					<c:forEach items="${indentMetal.indentMetaDistributions}" var="details"
						varStatus="loop">
						<tr>
							<td>${details.serialNumber}</td>
							<td><fmt:formatNumber type="number" 
           							minFractionDigits="2" value="${indentMetal.purity}"/></td>
							<td><fmt:formatNumber type="number" 
           							minFractionDigits="3" value="${details.vendorWeight}"/></td>
							<td>${details.vendor.vendorCode}</td>
							<td>${details.vendor.vendorName} ${details.vendor.address.address1}  ${details.vendor.address.address2} ${details.vendor.address.cityName} ${details.vendor.address.sateName} ${details.vendor.address.countryname}</td>
							<td>${indentMetal.status.type}</td>
							<td align="center"><a class="btn btn-primary" style="width: 80px;" type="button"  onclick="PrintLettercall(' ${indentMetal.id}','  ${details.serialNumber}')"><span class="fa fa-envelope"></span> Letter </a></td>
						</tr>
					</c:forEach>
				</tbody>
				</table>		
			</c:if>
						
		<div class="modal-footer  text-center">
			<!-- <button type="button" class="btn btn-primary" id="save" name="save">
				<i class="fa fa-floppy-o"></i> Save
			</button> -->
			<c:if test="${indentMetal.status eq 'G'}">
				<button type="button" class="btn btn-primary" id="bmrv" data-dismiss="modal" aria-hidden="true">
					<i class="fa fa-file-text-o"></i>&nbsp; Raise BGRV
				</button>
				
				<button type="button" class="btn btn-warning" id="cancel">
					<i class="fa fa-times"></i>&nbsp; Cancel PO
				</button>
			</c:if>
			 <c:if test="${indentMetal.status eq 'R'}">
				<button type="button" class="btn btn-primary" id="bmrvRet" data-dismiss="modal" aria-hidden="true">
					<i class="fa fa-plus"></i>&nbsp; BGRV Return
				</button>
			</c:if>
			 

			<button class="btn btn-primary" type="button" id="indentReport"><i class="fa fa-print fa-lg"></i> Print</button>
			
			<button type="submit" class="btn btn-warning" data-dismiss="modal"
				aria-hidden="true">
				<i class="fa fa-times"></i>&nbsp;Close
			</button>

		</div>
	</div>
	<div class="clearfix">&nbsp;</div>
</form:form>



<script src="resource/oe/assets/js/app/ValidationFormScript.js"></script>
<script type="text/javascript">
$("#bmrvRet").on('click',function(){
	$("#btnIndentDA").modal('hide');
	$('.modal-backdrop').hide();
	window.location.href="javascript:showContentPage('bullionMRVReturn', 'bodySwitcher')"	
}); 

	$(document).ready(
		function() {
			
			
		});
	
	$("#cancel").on("click", function() {
		var reason = $('#reason').val();
		var indentDetail = {
				"id" : '${indentMetal.id}',
				"reasonForCancel" : reason
		}
		
		if(reason.length > 0){
			postJSON('/OrderExecution/api/v1/cancelIndent', JSON
					.stringify(indentDetail), function(data) {
				if(1 == data.resCode){
					$("#jqxgrid").jqxGrid("updatebounddata");
					$("#btnIndentDA").modal('hide');
					$.growl.notice({ message: "Purchase Order Number: " + data.payload.id + " is Cancelled.", duration: 10000, title: '' });
					
					return true;
					
				}else{
					$.growl.error({ message: data.mesgStr, duration: 10000, title: 'Error' });
					return false;
				}
				
			});
		}else{
			$.growl.error({ message: "Reason for Cancel is mandatory", duration: 10000, title: 'Error' });
			return false;
		}
		
	});
	
	 $("#bmrv").on("click", function(e) {
		showContentPage('bullionMRV?bIndentId=${indentMetal.id}', 'bodySwitcher');
		$("#btnIndentDA").modal('hide');
		$('.modal-backdrop').hide();
	}); 
	 
	 $("#indentReport").on("click", function() {
		 
	var status  = "${indentMetal.status}";
	
	if(status!="R")
     	{
		 fieldFilters = {
		            "fieldFilters" : {
		                "IndentNo" : "${indentMetal.id}",
		                "mode" : "pdf",
		                "reportName" : "RPT_Purchase_Order_Bullion"
		            }
		        };
		jasperReport('RPT_Purchase_Order_Bullion.pdf', fieldFilters); 
   	 }	
	});
	 

	 function PrintLettercall(indentNo,slNo)
	 {
		 fieldFilters = {
		            "fieldFilters" : {
		                "LetterIndentNo" :indentNo,
		                "SrlNo"    :slNo,
		                "mode" : "pdf",
		                "reportName" : "IndentLetter"
		            }
		        };
			jasperReport('PurchaseOrderLetter.pdf', fieldFilters);
		 
		 
	 }
	 
	 
	 
</script>
