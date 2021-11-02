<!-- 
	##	Author UI : Pooja Sangve		
	## 	Author JAVA : Nageshwarao
	## 	Date Creation : 16/09/2016
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Issue For Melting Heading Add Started -->
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i>&nbsp;Print Tag for OP GIV</h1>					
					<label class="radio-inline"><input name="printTag" type="radio" value="1" />&nbsp; Finished Goods</label> 
				  	<label class="radio-inline"><input name="printTag" type="radio" value="2" />&nbsp; Loose Stones and Accessories</label> 
				</div>
				
				<div id="fgDet">
					<div class="heading-block">
						<h4><i class="fa fa-desktop"></i> &nbsp; Finished Goods </h4>		
					</div>						
					
					<form class="form-horizontal" id="fgPrint">
				  <div class="row">
						 <div class="col-sm-2">
						 <label>PSR No</label> 
						 <input type="text" id="psrNo" name="psrNo"  class="form-control" placeholder="PSR No">
						 </div>
						 
						 <div class="col-sm-2">
						 <label>Order No</label> 
						 <input type="text" id="orderNo" name="orderNo"  class="form-control" placeholder="Order No">
						 </div>
						 
						 <div class="col-sm-2">
						 <label>Order SL. No</label>
						 <select  id="orderSlNo" name="orderSlNo" class="form-control" >
						 <option value="">--Select--</option>
						 </select>						 						
						 </div>
						 
						 <div class="col-sm-2">
						 <label>GIV No</label> 
						 <input type="text" id="mivNo" name="mivNo"  class="form-control" placeholder="GIV No">
						 </div>
					
						 <div class="col-sm-2">
						 <label>GIV SL.No</label> 
						 <select  id="mivSlNo" name="mivSlNo"  class="form-control" >
						 <option value="">--Select--</option>
						 </select>						 
						 </div>
				   </div>
				    <div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
						   <button id="clearAll" class="btn btn-warning btn-sm voffset"type="reset">								
							 <i class="fa fa-times fa-lg"></i>&nbsp; Clear
							 </button>
						&nbsp;
							 <button name="opmivfgprint" id="opmivfgprint" type="button"class="btn btn-primary btn-sm voffset">								
							 <i class="fa fa-print fa-lg"></i>&nbsp; Print
							 </button>
						</div>
				</form>
			</div>
				<div id="stoneDet">
					<div class="heading-block">
						<h4><i class="fa fa-desktop"></i> &nbsp; Loose Stones and Accessories</h4>		
					</div>	
					<form class="form-horizontal" id="fgPrint">
				  <div class="row">
						 <div class="col-sm-2">
						 <label>PSR No</label> 
						 <input type="text" id="psrNoS" name="psrNoS"  class="form-control" placeholder="PSR No">
						 </div>
						 
						 <div class="col-sm-2">
						 <label>Order No</label> 
						 <input type="text" id="orderNoS" name="orderNoS"  class="form-control" placeholder="Order No">
						 </div>
						 
						 <div class="col-sm-2">
						 <label>Order SL. No</label>
						 <select  id="orderSlNoS" name="orderSlNoS" class="form-control" >
						 <option value="">--Select--</option>
						 </select>						 						
						 </div>
						 
						 <div class="col-sm-2">
						 <label>GIV No</label> 
						 <input type="text" id="mivNoS" name="mivNoS"  class="form-control" placeholder="GIV No">
						 </div>
					
						 <div class="col-sm-2">
						 <label>GIV SL.No</label> 
						 <select  id="mivSlNoS" name="mivSlNoS"  class="form-control" >
						 <option value="">--Select--</option>
						 </select>						 
						 </div>
				   </div>
				   <div class="clearfix">&nbsp;</div>
						<div class="row voffset2" align="center">
						   <button id="clearAllS" class="btn btn-warning btn-sm voffset"type="reset">								
							 <i class="fa fa-times fa-lg"></i>&nbsp; Clear
							 </button>
						&nbsp;
							 <button name="opmivlsaprint" id=opmivlsaprint type="button"class="btn btn-primary btn-sm voffset">								
							 <i class="fa fa-print fa-lg"></i>&nbsp; Print
							 </button>
						</div>
				</form>
				</div>	
				<div class="clearfix">&nbsp;</div>				
				<div class="clearfix">&nbsp;</div>			
				<div style="position: relative; z-index: 1">
					<div id="jqxgrid" style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>				
				<div class="clearfix">&nbsp;</div>
			 </div>
	     </div>
	  </div>
 </div>
 <script src="resource/oe/assets/js/app/opMiv.js"></script>