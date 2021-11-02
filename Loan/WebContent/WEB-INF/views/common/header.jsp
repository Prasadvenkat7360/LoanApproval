<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<nav class="navbar navbar-default navbar-fixed-top first_header">
  <div class="container-fluid ">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
<!--       <img src="resource/oe/assets/css/images/vajralogo.png" width="150" style="color: #fff; border: 1px solid #ccc; margin-top: 3px;" alt="Profile Image">
 -->    
 	      <a class="navbar-brand logo logo-title" href="javascript:void(0)">KARAT & CARAT</a>
 	
 	</div>
    <div id="navbar" class="navbar-collapse collapse">
      
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown navbar-notification"><a href="#" class="dropdown-toggle" data-toggle="dropdown"> <i	class="fa fa-bell-o"></i> <span class="visible-xs-inline">&nbsp;Notifications</span><b class="badge badge-primary" id="alertListLength">0</b></a>
			<div class="dropdown-menu">
				<div class="dropdown-header">&nbsp;<h4>Alerts</h4></div>
				<div class="slimScrollDiv">
					<ul style="margin-top:8px;" id="alertList"></ul>
					<ul>
						<li  class="text-center"><i class="text-center"></i><a href="javascript:showContentPage('alertSearch', 'bodySwitcher')">View All </a></li>
					</ul>
				</div>
			</div>
		</li>

        <li class="dropdown navbar-notification"><a href="#" class="dropdown-toggle" data-toggle="dropdown"> <i	class="fa fa-envelope navbar-notification-icon"></i> <span	class="visible-xs-inline">&nbsp;Notifications</span></a>
			<div class="dropdown-menu ">
				<div class="dropdown-header"><h4>Notifications</h4></div>
				<div class="slimScrollDiv">
					<ul id="notificationList"></ul>
					<ul>
						<li class="text-center"><i class="text-center"></i><a href="javascript:showContentPage('notificationSearch', 'bodySwitcher')">View All </a></li>
					</ul>
				</div>
			</div>
		</li>
        <li class="dropdown"><a class="dropdown-toggle" href="#" data-toggle="dropdown"> <span> <img src="resource/oe/assets/css/images/profile-pic.jpg" width="26"	style="color: #fff; border: 1px solid #ccc" alt="Profile Image"> <span style="color: #fff;"><c:out value="${sessionScope.LoggedInUser.name}" /></span> <i	class="fa fa-angle-down"></i></span></a>
			<ul class="dropdown-menu">
				<li><a href="javascript:void(0);"><i class="fa fa-cogs"></i><strike>Settings </strike></a></li>
				<li><a href="logout"><i class="fa fa-sign-out"></i>Logout</a></li>
			</ul>
		</li>
      </ul>
    </div>   
  </div>
</nav>
<nav class="navbar navbar-default navbar-fixed-top" style="z-index: 1; margin-top:50px;">
  <div class="container-fluid ">
  	<div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar2" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
    <div id="navbar2" class="navbar-collapse collapse">
	<ul class="nav navbar-nav">
        <!-- <li class="active"><a href="javascript:void(0)">Home</a></li> -->
       	<c:forEach items="${menus}" var="menu">
		<li class="dropdown"><a href="#" data-toggle="dropdown"	class="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false"><c:out value="${menu.name}" />
		
		 <b class="caret"></b></a>
			<ul class="dropdown-menu">
				<c:forEach items="${menu.fuList}" var="func">
					<c:if test="${empty func.parentFunction }">
						<li><a id="pagerlink" funcId="<c:out value="${func.id}" />" menuId="<c:out value="${menu.id}" />"  href="javascript:showContentPage('<c:out value="${func.url}" />', 'bodySwitcher')"><c:out value="${ func.description}" /></a></li>
					</c:if>
					<c:if test="${not empty func.parentFunction && not empty func.subfunc }">
						<c:forEach items="${func.subfunc}" var="sub">
							<li class="dropdown dropdown-submenu"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><c:out value="${sub.key.description}" /></a>
								<ul class="dropdown-menu" style="overflow: auto; height: 350px;">
									<c:forEach items="${sub.value}" var="sub1">
										<li><a id="pagerlink" funcId="<c:out value="${sub1.id}" />" menuId="<c:out value="${menu.id}" />" href="javascript:showContentPage('<c:out value="${sub1.url}" />', 'bodySwitcher')"><i class="fa fa-bars"></i>&nbsp;<c:out value="${sub1.description}" />
										</a></li>
									</c:forEach>
								</ul>
							</li>
						</c:forEach>
					</c:if>
				</c:forEach>
			 </ul>
		</li>
		</c:forEach>
      </ul>
      </div>
     </div>
    </nav>