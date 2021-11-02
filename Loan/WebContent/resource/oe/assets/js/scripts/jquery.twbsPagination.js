/***************************
File generated by shrinker.ch
DateTime: 2018-06-11, 12:12:10
File list:
* jquery.twbsPagination.js
*****************************/
(function(e,h,l,i){var j=e.fn.twbsPagination,g=function(a,b){this.$element=e(a);this.options=e.extend({},e.fn.twbsPagination.defaults,b);if(this.options.startPage<1||this.options.startPage>this.options.totalPages)throw Error("Start page option is incorrect");this.options.totalPages=parseInt(this.options.totalPages);if(isNaN(this.options.totalPages))throw Error("Total pages option is not correct!");this.options.visiblePages=parseInt(this.options.visiblePages);if(isNaN(this.options.visiblePages))throw Error("Visible pages option is not correct!");
if(this.options.onPageClick instanceof Function)this.$element.first().on("page",this.options.onPageClick);if(this.options.hideOnlyOnePage&&this.options.totalPages==1){this.$element.trigger("page",1);return this}if(this.options.totalPages<this.options.visiblePages)this.options.visiblePages=this.options.totalPages;if(this.options.href){this.options.startPage=this.getPageFromQueryString();if(!this.options.startPage)this.options.startPage=1}var c=typeof this.$element.prop==="function"?this.$element.prop("tagName"):
this.$element.attr("tagName");this.$listContainer=c==="UL"?this.$element:e("<ul></ul>");this.$listContainer.addClass(this.options.paginationClass);c!=="UL"&&this.$element.append(this.$listContainer);if(this.options.initiateStartPageClick)this.show(this.options.startPage);else{this.currentPage=this.options.startPage;this.render(this.getPages(this.options.startPage));this.setupEvents()}return this};g.prototype={constructor:g,destroy:function(){this.$element.empty();this.$element.removeData("twbs-pagination");
this.$element.off("page");return this},show:function(a){if(a<1||a>this.options.totalPages)throw Error("Page is incorrect.");this.currentPage=a;this.render(this.getPages(a));this.setupEvents();this.$element.trigger("page",a);return this},enable:function(){this.show(this.currentPage)},disable:function(){var a=this;this.$listContainer.off("click").on("click","li",function(b){b.preventDefault()});this.$listContainer.children().each(function(){e(this).hasClass(a.options.activeClass)||e(this).addClass(a.options.disabledClass)})},
buildListItems:function(a){var b=[];this.options.first&&b.push(this.buildItem("first",1));if(this.options.prev)b.push(this.buildItem("prev",a.currentPage>1?a.currentPage-1:this.options.loop?this.options.totalPages:1));for(var c=0;c<a.numeric.length;c++)b.push(this.buildItem("page",a.numeric[c]));if(this.options.next)b.push(this.buildItem("next",a.currentPage<this.options.totalPages?a.currentPage+1:this.options.loop?1:this.options.totalPages));this.options.last&&b.push(this.buildItem("last",this.options.totalPages));
return b},buildItem:function(a,b){var c=e("<li></li>"),d=e("<a></a>"),f=this.options[a]?this.makeText(this.options[a],b):b;c.addClass(this.options[a+"Class"]);c.data("page",b);c.data("page-type",a);c.append(d.attr("href",this.makeHref(b)).addClass(this.options.anchorClass).html(f));return c},getPages:function(a){var b=[],c=Math.floor(this.options.visiblePages/2),d=a-c+1-this.options.visiblePages%2;c=a+c;if(d<=0){d=1;c=this.options.visiblePages}if(c>this.options.totalPages){d=this.options.totalPages-
this.options.visiblePages+1;c=this.options.totalPages}for(;d<=c;){b.push(d);d++}return{currentPage:a,numeric:b}},render:function(a){var b=this;this.$listContainer.children().remove();var c=this.buildListItems(a);e.each(c,function(d,f){b.$listContainer.append(f)});this.$listContainer.children().each(function(){var d=e(this);switch(d.data("page-type")){case "page":d.data("page")===a.currentPage&&d.addClass(b.options.activeClass);break;case "first":d.toggleClass(b.options.disabledClass,a.currentPage===
1);break;case "last":d.toggleClass(b.options.disabledClass,a.currentPage===b.options.totalPages);break;case "prev":d.toggleClass(b.options.disabledClass,!b.options.loop&&a.currentPage===1);break;case "next":d.toggleClass(b.options.disabledClass,!b.options.loop&&a.currentPage===b.options.totalPages)}})},setupEvents:function(){var a=this;this.$listContainer.off("click").on("click","li",function(b){var c=e(this);if(c.hasClass(a.options.disabledClass)||c.hasClass(a.options.activeClass))return false;!a.options.href&&
b.preventDefault();a.show(parseInt(c.data("page")))})},makeHref:function(a){return this.options.href?this.generateQueryString(a):"#"},makeText:function(a,b){return a.replace(this.options.pageVariable,b).replace(this.options.totalPagesVariable,this.options.totalPages)},getPageFromQueryString:function(a){a=this.getSearchString(a);a=RegExp(this.options.pageVariable+"(=([^&#]*)|&|#|$)").exec(a);if(!a||!a[2])return null;a=decodeURIComponent(a[2]);a=parseInt(a);if(isNaN(a))return null;return a},generateQueryString:function(a,
b){var c=this.getSearchString(b);if(!c)return"";return"?"+c.replace(RegExp(this.options.pageVariable+"=*[^&#]*"),this.options.pageVariable+"="+a)},getSearchString:function(a){a=a||h.location.search;if(a==="")return null;if(a.indexOf("?")===0)a=a.substr(1);return a},getCurrentPage:function(){return this.currentPage}};e.fn.twbsPagination=function(a){var b=Array.prototype.slice.call(arguments,1),c,d=e(this),f=d.data("twbs-pagination"),k=typeof a==="object"?a:{};f||d.data("twbs-pagination",f=new g(this,
k));if(typeof a==="string")c=f[a].apply(f,b);return c===i?d:c};e.fn.twbsPagination.defaults={totalPages:1,startPage:1,visiblePages:5,initiateStartPageClick:true,hideOnlyOnePage:false,href:false,pageVariable:"{{page}}",totalPagesVariable:"{{total_pages}}",page:null,first:"First",prev:"Previous",next:"Next",last:"Last",loop:false,onPageClick:null,paginationClass:"pagination",nextClass:"page-item next",prevClass:"page-item prev",lastClass:"page-item last",firstClass:"page-item first",pageClass:"page-item",
activeClass:"active",disabledClass:"disabled",anchorClass:"page-link"};e.fn.twbsPagination.Constructor=g;e.fn.twbsPagination.noConflict=function(){e.fn.twbsPagination=j;return this};e.fn.twbsPagination.version="1.4.1"})(window.jQuery,window,document);
