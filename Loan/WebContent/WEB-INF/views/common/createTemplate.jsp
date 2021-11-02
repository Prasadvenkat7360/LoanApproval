<div class="main-container">
	<div class="container-fluid">
		<div class="row">
			<!-- Left Panel Started -->
			<div class="col-sm-12 layout-main">
				<div class="heading-block">
					<h1><i class="fa fa-desktop"></i> Create Template</h1>
				</div>
				<form class="form-horizontal" id="createTemp">
					<div class="col-sm-12">
						<label>Type</label>
						<select id="type" class="form-control"><option value="" selected label="Select" /></select>
					</div>
					
					<div class="col-sm-12">
						<label>Message</label>
						<textarea id="txtEditor"></textarea> 
					</div>
					<div class="clearfix">&nbsp;</div>
					<div class="row voffset2" align="center">							
						<button class="btn btn-primary  btn-sm voffset" type="button" name="create" id="create"><i class="fa fa-file-excel-o fa-lg"></i> Save</button>
						<button class="btn btn-primary  btn-sm voffset" type="button" name="cancel" id="cancel"><i class="fa fa-envelope"></i> Cancel</button>
					</div>
				</form>
				
			</div>
		</div>
	</div>
</div>
<style>
	
	.btn-default {
	    background-color: #fff;
	    color: #000;
	}
	
	.btn-group, .btn-group .multiselect {
	    width: auto;
	}
</style>
<script src="resource/oe/assets/js/app/createTemplate.js"></script>