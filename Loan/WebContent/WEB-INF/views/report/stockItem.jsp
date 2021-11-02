<!-- 
	##	Author1         : 	 POOJA SANGVE
	## 	Author2 	    :  
	##	Date Creation 	: 	01-06-2017
	## 	Description		:	Creation of Print Tags-Stock Item
 -->
<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-md-12  layout-main">
				<!-- Store Details  Header Started -->
				<div class="heading-block">
					<h1>
						<i class="fa fa-desktop"></i> &nbsp; Print Tag-Stock Item 
					</h1>					
				</div>
				<form class="form-horizontal" id="stockItemSearch" action="javascript: void(0);">					
					<!-- Row 1 Started  -->
					<div class="row">
						<div class="col-sm-2 form-field">
							<label>GR No.</label>
							<input type="text" name="grNumber" id="grNumber" class="form-control"/>									
						</div>
						<div class="col-sm-2 form-field">
					    	<label>GR Sl. No.</label>
							<input type="text" name="grSlNumber" id="grSlNumber" class="form-control"/>
						</div>
						<div class="col-sm-2 form-field" >
					    	<label>Store Code</label>
					   		<select  name="storeCode" id ="storeCode" class="form-control">
                           		<option value="">--Select--</option>
                           	</select>
					    </div>
					    <div class="col-sm-2 form-filed " id="tozoneObj" >
					    <label id ="zoneName">Zone</label>
					    <div  id="zone"></div>
					    </div>	
					    <div class="col-sm-2 form-field">
					    <label>Vendor Code</label>
					    <select name="vendorCode" id="vendorCode" class="form-control" >
					    <option value="">--Select--</option>
					    </select>
					    </div>
					    
					    <div class="col-sm-2 form-field">
					    <label> Article Segment </label>
					    <select name="articleSeg"  id="articleSeg" class="form-control" >
					    <option value="">--Select--</option>
					    </select>					    
					    </div>
					    </div>
					    
					    
					    	
					    <div class="row">
					    <div class="col-sm-2 form-field" id="ToJewelCd" >
					    <label id="jwlCodebj">Jewel Code</label>						    
					    <div id="jewelCode" ></div>						   
					    </div>
					     
					    <div class="col-sm-2 form-field">
						<label>Stock No From</label>
					    <input type="text" class="form-control" value="" onBlur="minMaxValues();"
						id="fromStock" name="fromStock" >
						</div>	
						<div class="col-sm-2 form-field">
						<label>Stock No To</label> 
						<input type="text" class="form-control" value="" onBlur="minMaxValues();"
					    id="toStock" name="toStock" >
						</div>
					    <div class="col-sm-2 form-field">
					    <label>Status</label>
					    <div  id="status" ></div>
					    </div>									
					</div>				
					<div class="clearfix">&nbsp;</div>
					<div class="row voffset2" align="center">
					     <button class="btn btn-sm btn-primary voffset" type="submit"name="search" id="search">								
						 <i class="fa fa-search fa-lg"></i> Search
						 </button>
					&nbsp;
						 <button id="clearAll" class="btn btn-sm btn-warning voffset"type="reset">								
						 <i class="fa fa-times fa-lg"></i>&nbsp; Clear
						 </button>
					&nbsp;
						 <button name="print" id="printsi" type="button"class="btn btn-sm btn-primary voffset">								
						 <i class="fa fa-print fa-lg"></i>&nbsp; Print
						 </button>
					</div>				
				</form>
				<div class="clearfix">&nbsp;</div>
				<div style="position: relative; z-index: 1">
				<div id="jqxgrid"style="font-size: 13px; font-family: Verdana; float: left;"></div>
				</div>
				<div class="clearfix">&nbsp;</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="resource/oe/assets/js/app/stockItem.js"></script>
<style>
#stockItemSearch select {
	height:28px;
}
</style>