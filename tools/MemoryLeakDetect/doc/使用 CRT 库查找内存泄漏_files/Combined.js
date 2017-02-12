(function(){var utilitiesModule=function($){function htmlEncode(value){return $("<div/>").text(value).html()}function htmlDecode(value){return $("<div/>").html(value).text()}function updateQueryStringParameter(uri,key,value){var hash=uri.split("#"),newParamStr;uri=hash[0];var result,re=new RegExp("([?&])"+key+"=.*?(&|$)","i"),separator=uri.indexOf("?")!==-1?"&":"?",newParamObj={};return newParamObj[key]=value,newParamStr=$.param(newParamObj),result=uri.match(re)?uri.replace(re,"$1"+newParamStr+"$2"):uri+separator+newParamStr,typeof hash[1]!="undefined"&&hash[1]!==null&&(result+="#"+hash[1]),result}function endsWith(string,suffix){return!string||!suffix||string.length<suffix.length?!1:string.toLowerCase().indexOf(suffix.toLowerCase(),string.length-suffix.length)!==-1}function padLeft(integer,width){if(!integer||!width||width<=1)return integer;for(integer=integer+"";integer.length<width;)integer="0"+integer;return integer}function log(message){!message||message.length<1||window.console.log(getDateTime()+" : "+message)}function error(message){!message||message.length<1||window.console.error(getDateTime()+" : "+message)}function getDateTime(date){return date||(date=new Date),padLeft(date.getFullYear(),4)+"-"+padLeft(date.getMonth()+1,2)+"-"+padLeft(date.getDate(),2)+" "+padLeft(date.getHours(),2)+":"+padLeft(date.getMinutes(),2)+":"+padLeft(date.getSeconds(),2)+":"+padLeft(date.getMilliseconds(),3)}function setCookie(name,value,expires,path,domain,secure,noEscape){var today=new Date,expiresDate;today.setTime(today.getTime());expires&&(expires=expires*864e5);expiresDate=new Date(today.getTime()+expires);noEscape||(value=escape(value));document.cookie=name+"="+value+(expires?";expires="+expiresDate.toGMTString():"")+(path?";path="+path:"")+(domain?";domain="+domain:"")+(secure?";secure":"")}function getCookie(sName,defaultValue){for(var aCookie=document.cookie.split("; "),aCrumb,i=0;i<aCookie.length;i++)if(aCrumb=aCookie[i].split("="),sName===aCrumb[0])return unescape(aCrumb[1]);return defaultValue}function getSplicedHostname(index){var domainParts=window.location.hostname.split(".");return domainParts.splice(index).join(".")}function supportsHtml5(){return!(localStorage==null||typeof localStorage=="undefined"||typeof JSON=="undefined")}function innerText(node){var containedText="",textvalue,nodes,i;if(node.nodeType===3)textvalue=node.nodeValue,containedText+=textvalue;else if(node.nodeType===1)for(nodes=node.childNodes,i=nodes.length;i--;)containedText+=this.innerText(nodes[i]);return containedText}function executeWhenContentIsLoaded(func){var $contentDiv=$("#content"),contentDivHasChildren=$contentDiv.length==1&&$contentDiv.children().length>0,$contentLoadedHiddenInput=$("#contentLoaded"),isContentLoaded=$contentLoadedHiddenInput.val()===undefined||$contentLoadedHiddenInput.val().toLowerCase()=="true"&&contentDivHasChildren;isContentLoaded?func():$contentLoadedHiddenInput.change(func)}function displayHiddenElements(){$(".contextAwareHidden").each(function(){$(this).css("display","")})}function dedupe(array){var i,j;if(array&&array.length>1)for(i=0;i<array.length;i++)for(j=i+1;j<array.length;j++)array[i]===array[j]&&array.splice(j,1)}function fixUnevenElementHeights($elements){var maxHeight=0;$elements.each(function(){$(this).height()>maxHeight&&(maxHeight=$(this).height())});$elements.each(function(){$(this).css("height",maxHeight+"px")})}function isdefined(variable){return typeof window[variable]=="undefined"?!1:!0}var timeoutMilliSecond=5e3,noop;return typeof window.console=="undefined"&&(noop=function(){},window.console={debug:noop,log:noop,warn:noop,assert:noop,clear:noop,dir:noop,error:noop,info:noop}),{htmlEncode:htmlEncode,htmlDecode:htmlDecode,updateQueryStringParameter:updateQueryStringParameter,endsWith:endsWith,padLeft:padLeft,log:log,error:error,getDateTime:getDateTime,setCookie:setCookie,getCookie:getCookie,getSplicedHostname:getSplicedHostname,supportsHtml5:supportsHtml5,innerText:innerText,executeWhenContentIsLoaded:executeWhenContentIsLoaded,displayHiddenElements:displayHiddenElements,dedupe:dedupe,fixUnevenElementHeights:fixUnevenElementHeights,timeoutMilliSecond:timeoutMilliSecond,isdefined:isdefined}};typeof define=="function"&&window.mtpsAmd?define("utilities",["jquery"],function($){var utilities=utilitiesModule($);return window.epx=window.epx||{},window.epx.utilities=utilities,utilities}):(window.epx=window.epx||{},window.epx.utilities=utilitiesModule($))})();;
(function(){var layoutModule=function($){function checkIsSingleCol(){var singleColSpan=$("#ux-header span#singleCol");return singleColSpan.length>0?singleColSpan.css("display")!="none":!1}function checkIsSingleColInThreeColLayout(){var singleColSpan=$("#content .threeCol span#singleColInThreeColLayout");return singleColSpan.length>0?singleColSpan.css("display")!="none":!1}function checkIsDoubleCol(){var doubleColSpan=$("#ux-header span#doubleCol");return doubleColSpan.length>0?doubleColSpan.css("display")!="none":!1}return{checkIsSingleCol:checkIsSingleCol,checkIsDoubleCol:checkIsDoubleCol,checkIsSingleColInThreeColLayout:checkIsSingleColInThreeColLayout}};typeof define=="function"&&window.mtpsAmd?define("layout",["jquery"],function($){return layoutModule($)}):(window.epx=window.epx||{},window.epx.layout=layoutModule($))})();;
(function(){var headerModule=function($){function initVars(){isAuxNavMoved=!1;userNameWidth=0;ellipsisEnabled=!1;lastWindowWidth=$(window).width();isRTL=$("#ux-header").hasClass("rtl");minGap=40;$siteLogo=$("#ux-header header div.topRow div.top div.left");$auxNav=$("#ux-header div.auxNav");$signInLinks=$("#ux-header #signIn");$topRight=$("#ux-header header .top .right");$bottomRight=$("#ux-header header .bottom .right");$bottomLeft=$("#ux-header header .bottom .left");$drawer=$("#ux-header #drawer");$searchBox=$("#ux-header #Fragment_SearchBox");$buttomRow=$("#ux-header header .buttomRow");$expandTop=$("#ux-header header .expandTop");$expandTopLeft=$("#ux-header header .expandTop .left");$expandTopRight=$("#ux-header header .expandTop .right");$viewCreateProfileLink=$("#ux-header header .createViewProfileLink");$scarabLink=$("#ux-header header .scarabLink")}function closeSearchBox(){$("#HeaderSearchForm").removeClass("clearable");$("#searchTextContainer").css("display","none");$("#searchTextContainer").animate({width:"0"},200,function(){$("#HeaderSearchForm").removeClass("opened")})}function clearSearchText(){$("#HeaderSearchTextBox").val("");$("#HeaderSearchTextBox").focus();updateCloseIconStyle()}function getSearchText(){return $.trim($("#HeaderSearchTextBox").val())}function updateCloseIconStyle(){getSearchText()?$("#HeaderSearchForm").addClass("clearable"):$("#HeaderSearchForm").removeClass("clearable")}function clearHeight($object){$object.css("height","")}function bindDropdownEventHandlers(){$("#ux-header .navL1 > li.toggle > a").each(function(){$(this).click(function(e){addActiveClassForL1($(this));e.stopPropagation()})});$("#ux-header .navL2 > li.toggle > a").each(function(){$(this).bind("click",function(e){addActiveClassForL2($(this));e.stopPropagation()});$(this).bind("focus mouseover",function(e){isAuxNavMoved||(addActiveClassForL2($(this),!0),e.stopPropagation())})});$("#ux-header .navL2 > li:not(.toggle) > a").each(function(){$(this).bind("focus mouseover",function(e){isAuxNavMoved||(closeAllL3(!0),e.stopPropagation())})});$("html, body").bind("click",function(){isAuxNavMoved||(closeAllL2(),closeAllL3())})}function addActiveClassForL1($this){var selfActive=$this.parent().hasClass("active");closeAllL3();closeAllL2();clearHeight($this.next());selfActive||(isAuxNavMoved?$this.next().animate({height:"toggle"},200,"swing",function(){$(this).parent().removeClass("inactive").addClass("active")}):($this.parent().removeClass("inactive").addClass("active"),$this.next().animate({height:"toggle"},66,"swing")))}function tuneHeight($object1,$object2){clearHeight($object1);clearHeight($object2);var minHeight=Math.max($object1.height(),$object2.height());$object1.css("height",minHeight);$object2.css("height",minHeight)}function addActiveClassForL2($this,isHover){var selfActive=$this.parent().hasClass("active"),visibleL3;if(selfActive){isAuxNavMoved&&(clearHeight($this.next()),closeAllL3());return}visibleL3=closeAllL3(!isHover);isAuxNavMoved?(clearHeight($this.next()),$this.next().animate({height:"toggle"},200,"swing",function(){$(this).parent().removeClass("inactive").addClass("active")})):($this.parent().removeClass("inactive").addClass("active"),visibleL3?$this.next().css("display","block"):$this.next().animate({width:"toggle"},200,"swing"),tuneHeight($this.next(),$this.parent().parent()))}function closeAllL2(){var $l2=$("#ux-header .navL1 > li.active"),subSelector=".navL2";isAuxNavMoved?$l2.find(subSelector).animate({height:"toggle"},200,"swing",function(){$(this).parent().removeClass("active").addClass("inactive")}):($l2.removeClass("active").addClass("inactive"),$("#ux-header "+subSelector).css("display","none"))}function closeAllL3(toggleAnimationEnabled){var $l3=$("#ux-header .navL2 > li.active"),subSelector=".navL3",$l3Menu=$l3.find(subSelector),visibleL3=$l3.length;return isAuxNavMoved?$l3Menu.animate({height:"toggle"},200,"swing",function(){$(this).parent().removeClass("active").addClass("inactive")}):($l3.removeClass("active").addClass("inactive"),toggleAnimationEnabled?$l3Menu.animate({width:"toggle"},200,"swing",function(){clearHeight($l3.parent());clearHeight($l3Menu)}):$("#ux-header "+subSelector).css("display","none")),visibleL3>0}function addLocale(){var $canonical=$('link[rel="canonical"]'),locale="",metaName="WT.seg_1",$localeMeta=$('meta[name="'+metaName+'"]');$localeMeta&&$localeMeta.length!=0||($localeMeta=$("<meta>").attr("name",metaName).attr("content","en-us"));$("head").prepend($localeMeta);$canonical&&$canonical.length>0&&(locale=$canonical.attr("href").split("/"),locale.length>3&&(locale=locale[3],locale!=""&&$localeMeta.attr("content",locale)))}function changeToEllipsis(leftPos,rightPos){rightPos-leftPos<=minGap&&($userName.text($userName.text()[0]+$userName.text()[1]+$userName.text()[2]+"..."),ellipsisEnabled=!0,ellipsisWidth=$userName.width())}function changeBackToUserName(leftPos,rightPos){rightPos-leftPos>userNameWidth-ellipsisWidth+minGap&&($userName.text(userNameText),ellipsisEnabled=!1)}function changeUserName(){var currentWindowWidth=$(window).width();isRTL?!ellipsisEnabled&&lastWindowWidth>=currentWindowWidth?changeToEllipsis($topRight.offset().left+$topRight.width()-Number($signInLinks.css("margin-right").replace(/px/ig,"")),$siteLogo.offset().left):ellipsisEnabled&&changeBackToUserName($topRight.offset().left+$topRight.width()-Number($signInLinks.css("margin-right").replace(/px/ig,"")),$siteLogo.offset().left):!ellipsisEnabled&&lastWindowWidth>=currentWindowWidth?changeToEllipsis($siteLogo.offset().left+$siteLogo.width(),$topRight.offset().left+Number($signInLinks.css("margin-left").replace(/px/ig,""))):ellipsisEnabled&&changeBackToUserName($siteLogo.offset().left+$siteLogo.width(),$topRight.offset().left+Number($signInLinks.css("margin-left").replace(/px/ig,"")));lastWindowWidth=currentWindowWidth}function setUserNameAndWidth(){userNameWidth!=0||ellipsisEnabled||(userNameText=$userName.text(),userNameLength=$userName.text().length,userNameWidth=$userName.width())}function ellipsisFeature(){$userName=$("#ux-header #signIn > span.profileName");$userName.length>0&&($userName.text()==""?setTimeout(ellipsisFeature,500):(setUserNameAndWidth(),userNameLength>3&&changeUserName()))}function userNameTransformation(){isAuxNavMoved?ellipsisFeature():($userName=$("#ux-header #signIn > a.createProfileLink"),$userName.length>0&&(ellipsisEnabled?($userName.text(userNameText),ellipsisEnabled=!1):setUserNameAndWidth()))}function closeExpandTop(){$expandTop.hide()}function resize(){openMenu||showMenu(!1);$("#ux-header #SearchFlyoutContainer").hide();closeSearchBox();isAuxNavMoved!=auxNavShouldMove()&&(isAuxNavMoved?($drawer.css("display","inline-block"),expandTopEnabled=!1,$("header").removeClass("mobile")):(closeAllL3(),closeAllL2(),closeExpandTop(),$drawer.css("display","none"),expandTopEnabled=!0,$("header").addClass("mobile")),moveAuxNav(isAuxNavMoved));$("#msft-logo").removeClass("msft-logo");$("#msft-logo").removeClass("tablet-msft-logo");$("#msft-logo").removeClass("mobile-msft-logo");$("#search-finder").removeClass("search-finder");$("#search-finder").removeClass("mobile-search-finder");$("#searchCloseIcon").removeClass("search-clear-x");$("#searchCloseIcon").removeClass("mobile-search-clear-x");var deviceType;auxNavShouldMove()?($("#msft-logo").addClass("tablet-msft-logo"),$("#search-finder").addClass("search-finder"),$("#searchCloseIcon").addClass("search-clear-x"),$("#grip").removeClass("mobile-menu-icon"),$("#grip").addClass("menu-icon"),deviceType="tablet"):($("#msft-logo").addClass("msft-logo"),$("#search-finder").addClass("search-finder"),$("#searchCloseIcon").addClass("search-clear-x"),deviceType="desktop");$("#ux-header").attr("data-device-type",deviceType);isAuxNavMoved||(closeAllL3(),closeAllL2(),closeExpandTop());userNameTransformation()}function moveAuxNav(restoreOriginalPosition){restoreOriginalPosition?($auxNav.appendTo($topRight),$viewCreateProfileLink.appendTo($signInLinks),$scarabLink.appendTo($signInLinks),$drawer.appendTo($bottomLeft)):($auxNav.appendTo($expandTopLeft),$viewCreateProfileLink.appendTo($expandTopRight),$scarabLink.appendTo($expandTopRight),$drawer.appendTo($buttomRow));isAuxNavMoved=!restoreOriginalPosition}function auxNavShouldMove(){return $("#ux-header #grip:visible").length>0}function isTabletOrMobile(){return $("#ux-header header span#isMobile:visible").length>0}var isAuxNavMoved,userNameText,userNameWidth,userNameLength,ellipsisWidth,ellipsisEnabled,lastWindowWidth,isRTL,minGap,$siteLogo,$userName,$auxNav,$signInLinks,$topRight,$bottomRight,$bottomLeft,$drawer,$searchBox,$buttomRow,$expandTop,$expandTopLeft,$expandTopRight,$viewCreateProfileLink,$scarabLink,$mask,openMenu=!0,showMenu=function(show){$("div#drawer>div.toc").toggleClass("open");show?($mask.show(),$mask.height($(document).height())):$mask.hide();openMenu=!show};$(document).ready(function(){var touchScroll=!1,windowWidth=0,bodyScrollTop=0;initVars();addLocale();bindDropdownEventHandlers();$("#ux-header").append('<div id="overlayMaskHeader"/>');$(document.body.appendChild($('<div id="overlayMask"/>')[0]));$mask=$("#overlayMaskHeader, #overlayMask");$mask.on("touchstart",function(){bodyScrollTop=$("body")[0].srollTop});$mask.on("touchmove",function(){Math.abs(bodyScrollTop-$("body")[0].srollTop)>=10&&(touchScroll=!0)});$mask.click(function(){touchScroll||showMenu(!1);touchScroll=!1});$("#ux-header #grip").click(function(){$drawer.show();showMenu(openMenu)});$("#ux-header .top").click(function(event){(event.target===$("#ux-header .top")[0]||event.target===$("#ux-header .profileName")[0]||event.target===$("#ux-header .profileImage")[0])&&($("#ux-header header .expandTop:visible").length>0?$expandTop.fadeOut(200):$expandTop.fadeIn(200))});$(document).click(function(e){clearSearchText();closeSearchBox()});$("#searchTextContainer").click(function(e){return e.stopPropagation(),!1});$("#FakeHeaderSearchButton").click(function(e){if($("#HeaderSearchForm").hasClass("opened"))$("#HeaderSearchButton").click();else{$("#HeaderSearchForm").addClass("opened");$("#searchTextContainer").stop(!0);var width=0;width=isTabletOrMobile()?Math.min(255,$("#ux-header").width()-90):255;$("#searchTextContainer").css("display","inline-block");$("#searchTextContainer").animate({width:width+"px"},200,function(){var textBox=$("#HeaderSearchTextBox");textBox=textBox.length>0?textBox[0]:null;$("#HeaderSearchTextBox").focus();!textBox||textBox==document.activeElement||textBox.focus()})}return e.stopPropagation(),!1});$("#searchCloseIcon").click(function(e){return clearSearchText(),!1});$("#HeaderSearchTextBox").on("input propertychange keyup",function(){updateCloseIconStyle()});$(window).resize(function(){windowWidth!=$(window).width()&&(resize(),windowWidth=$(window).width())});resize();windowWidth=$(window).width()})};typeof define=="function"&&window.mtpsAmd?define("header",["jquery"],function($){return headerModule($)}):headerModule($)})();;
epx=window.epx||{};epx.library=window.epx.library||{};epx.library.breadcrumbs=function(){function LoadAndShowBreadcrumbDropDown(href,object){var $menu=$("#breadcrumbDropDownMenu"),href;$menu.is(":empty")&&!loading?(loading=!0,href=epx.library.toc.buildTocHref(href),$.ajax({type:"GET",async:!0,url:href,cache:!1,dataType:"json",success:function(r){var currentTitle,html,i;if(!r||r.length<1){window.epx.utilities.log("TOC web service returned 0 nodes.");return}for(window.epx.utilities.log("TOC web service returned "+r.length+" node(s), processing..."),currentTitle=object.attr("title").trim(),html="<ul>",i=0;i<r.length;i++)html+=r[i].Title.trim()==currentTitle?'<li class="current">':"<li>",html+='<a href="'+r[i].Href+'" Title="'+r[i].ToolTip+'">'+window.epx.utilities.htmlEncode(r[i].Title)+"<\/a>",html+="<\/li>";html+="<\/ul>";$menu.append(html);loading=!1;ShowBreadcrumbDropDown(object,"breadcrumbDropDownMenu")},error:function(){window.epx.utilities.log("TOC web service returned error.");loading=!1}})):ShowBreadcrumbDropDown(object,"breadcrumbDropDownMenu")}function ShowBreadcrumbDropDown(object,menuId){var $menu=$("#"+menuId),pos=object.position(),width=object.outerWidth(),height=object.outerHeight(),menuWidth=$menu.outerWidth(),windowWidth=$("div#breadcrumbs").width(),intent=15;$("html").attr("dir")=="rtl"?$menu.css({top:pos.top+height+"px",right:Math.max(windowWidth-pos.left-menuWidth,intent)+"px"}):$menu.css({top:pos.top+height+"px",left:Math.max(pos.left+width-menuWidth,intent)+"px"});$menu.animate({height:"toggle"},66,"swing",function(){$menu.css({display:"block"})})}function HideBreadcrumbDropDown(){$("#breadcrumbDropDownMenu").hide();$("#tocDropDownMenu").hide();$("#tocPopupMenu").hide();$("div#content").css("display","");$("#breadcrumbMobile").css("display","");$("div#rightNavigationMenuThumbnail").css("display","")}function ShowTocPopup(object){$("#tocPopupMenu").show();$("#breadcrumbMobile").hide();$("div#content").hide();$("div#rightNavigationMenuThumbnail").hide()}var loading=!1;return{LoadAndShowBreadcrumbDropDown:LoadAndShowBreadcrumbDropDown,ShowBreadcrumbDropDown:ShowBreadcrumbDropDown,HideBreadcrumbDropDown:HideBreadcrumbDropDown,ShowTocPopup:ShowTocPopup}}();$(document).ready(function(){$("#breadcrumbTablet").append($("#navigationButtons"));$("#breadcrumbDropDownButton").bind("click",function(e){var targetHref=$(this).attr("targetHref");return epx.library.breadcrumbs.LoadAndShowBreadcrumbDropDown(targetHref,$(this)),e.stopPropagation(),!1});$("#tocDropDownButton").bind("click",function(e){return $("#tocnav").removeAttr("style"),epx.library.breadcrumbs.ShowBreadcrumbDropDown($(this),"tocDropDownMenu"),e.stopPropagation(),!1});$("#tocPopupButton").bind("click",function(e){return $("#tocnav").removeAttr("style"),epx.library.breadcrumbs.ShowTocPopup($(this)),e.stopPropagation(),!1});$("#breadcrumbDropDownMenu, #tocDropDownMenu").bind("click",function(e){return e.stopPropagation(),!0});$("#page").bind("click",function(){epx.library.responsive.getCurrentViewType()!=epx.library.responsive.viewTypes.Mobile&&epx.library.breadcrumbs.HideBreadcrumbDropDown()});$("#tocPopMenuClose").bind("click",function(){epx.library.breadcrumbs.HideBreadcrumbDropDown()})});;
(function(){var indocTocFixedModule=function(w,d,$){function highlightActiveSubTopic(){$("#indoc_toc #indoc_toclist>li").removeClass("active");var sections=$("div#content div>h2.LW_CollapsibleArea_TitleDiv"),activeSubTopicIndex=-1,documentScroll=$(document).scrollTop(),windowHeight=$(window).height();sections.each(function(i,elem){var section=$(elem).parent(),sectionHeight=section.height();activeSubTopicIndex===-1&&(section.position().top>documentScroll||section.position().top+sectionHeight>documentScroll+windowHeight)&&(activeSubTopicIndex=i)});activeSubTopicIndex!==-1&&($($("#indoc_toc #indoc_toclist>li")[activeSubTopicIndex]).addClass("active"),$(".LW_CollapsibleArea_Anchor_Div.active").removeClass("active"),$("#Anchor_"+activeSubTopicIndex).addClass("active"))}function showSkinnyRating(){typeof define=="function"&&typeof require=="function"&&window.mtpsAmd?require("skinnyRating").adjustRatingPosition(!0):window.epx.windowsSkinnyRating&&typeof window.epx.windowsSkinnyRating.adjustRatingPosition=="function"&&window.epx.windowsSkinnyRating.adjustRatingPosition(!0)}function init(){var title=encodeURIComponent($("title").text()),canonicalUrl,canonicalMeta=$("link[rel='canonical']"),$rtlDirAttribute;canonicalUrl=canonicalMeta.length>0?encodeURIComponent(canonicalMeta.attr("href")):encodeURIComponent(w.location.href);var facebookShareUrl="https://www.facebook.com/sharer/sharer.php?u="+canonicalUrl,twitterShareUrl="https://twitter.com/intent/tweet?original_referer="+canonicalUrl+"&text="+title+"&tw_p=tweetbutton&url="+canonicalUrl,googlePlusShareUrl="https://plus.google.com/share?url="+canonicalUrl;$("#isdFacebook").attr("href",facebookShareUrl);$("#isdTwitter").attr("href",twitterShareUrl);$("#isdGooglePlus").attr("href",googlePlusShareUrl);$("#isdShare").on("click",function(){return $("#socials").toggle(),!1});$("#page").not("#socials").click(function(){$("#socials").hide()});$("#socials > a").on("click",function(){return w.open(this.href,"","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"),!1});window.epx&&window.epx.topic&&window.epx.topic.isPrintExperience()===!0||($("#skinnyRating div.rating").length==0&&$("#provideFeedback1,#navigationButtons").hide(),$("#provideFeedback1,#provideFeedback2").click(showSkinnyRating),$rtlDirAttribute=$('html[dir="rtl"]'),isRtl=$rtlDirAttribute&&$rtlDirAttribute.length>0,$content=$("#content"),$leftNav=$("#leftNav"),$rightNav=$("#tocnav"),$mainContent=$leftNav.next(),$footer=$("#lib-footer"),$rightNav=$mainContent.next(),w&&d&&$leftNav.length!==0&&$rightNav.length!==0&&$footer.length!==0&&$rightNav.length!==0)&&(setPosition(),$(w).scroll(function(){isItemClicking||(setPosition(),highlightActiveSubTopic())}),$(w).resize(function(){isItemClicking||(setPosition(),highlightActiveSubTopic())}),$("#rightNavigationMenuThumbnail").click(function(){$("body").append($('<div id="tocoverlayMask"><div id="overlay_indoctoc"><\/div><\/div>'));$("#overlay_indoctoc").html($("#indoc_toc").html().replace('id="indoc_toclist"',""));$("body").addClass("stop-scrolling");setTimeout(function(){$("#overlay_indoctoc").addClass("ready")},100);$("#overlay_indoctoc>ul>li").on("click",function(){var sectionIndex=$(this).attr("data-index"),targetSection=$($("div#content div>h2.LW_CollapsibleArea_TitleDiv")[sectionIndex]);$("body, html").animate({scrollTop:targetSection.position().top},500)});$("#tocoverlayMask").on("touchmove",function(e){e.preventDefault()});$("#tocoverlayMask").click(function(){var $mask=$(this);$("body").removeClass("stop-scrolling");$("#overlay_indoctoc").removeClass("ready");setTimeout(function(){$mask.remove()},300)})}),$.fn.draggable=function(){var offset=null,start=function(e){var orig=e.originalEvent,pos=$(this).position();offset={x:orig.changedTouches[0].pageX-pos.left,y:orig.changedTouches[0].pageY-pos.top}},moveMe=function(e){e.preventDefault();var orig=e.originalEvent;$(this).css({top:Math.min(Math.max(0,orig.changedTouches[0].clientY-offset.y),$(window).height()-$("#rightNavigationMenuThumbnail").height())})};this.bind("touchstart",start);this.bind("touchmove",moveMe)},$("#rightNavigationMenuThumbnail").draggable())}function setPosition(){var windowHeight=$(w).height(),documentHeight=$(d).height(),fixedTocTop=60,$fixInDocTocNav=$rightNav,rightNavHeight,mainContentHeight,nonFooterViewable,visibleContentHeight;$(window).width()<961?($fixInDocTocNav=$("#navMain",$rightNav),$rightNav.css("position","")):$("#navMain",$rightNav).css("width","").css("position","").css("top","");rightNavHeight=$fixInDocTocNav.height();mainContentHeight=$mainContent.height();windowHeight>rightNavHeight+fixedTocTop&&mainContentHeight>rightNavHeight+fixedTocTop&&$(w).scrollTop()+fixedTocTop>$content.offset().top?($fixInDocTocNav.css("position","fixed"),nonFooterViewable=documentHeight-$footer.height()-$(w).scrollTop()-60,nonFooterViewable>=rightNavHeight+fixedTocTop?$fixInDocTocNav.css("top",fixedTocTop+"px"):$fixInDocTocNav.css("top",(rightNavHeight-nonFooterViewable)*-1)):windowHeight<rightNavHeight+fixedTocTop&&mainContentHeight>rightNavHeight+fixedTocTop&&$(w).scrollTop()+windowHeight>rightNavHeight+$content.offset().top?($fixInDocTocNav.css("position","fixed"),visibleContentHeight=documentHeight-$footer.height()-$(w).scrollTop()-60,visibleContentHeight>=windowHeight?$fixInDocTocNav.css("top",(rightNavHeight-windowHeight)*-1):$fixInDocTocNav.css("top",(rightNavHeight-visibleContentHeight)*-1),$(w).scrollTop()<60&&$fixInDocTocNav.css("position","")):$fixInDocTocNav.css("width","").css("position","").css("top","")}var $content,$leftNav,$rightNav,$footer,$mainContent,lastScrollLeft=0,isRtl=!1,isItemClicking=!1;return $(document).ready(function(){var sections,validTitle;if(init(),sections=$("div#content div>h2.LW_CollapsibleArea_TitleDiv"),sections.length>0){if($("#indoc_toc").show(),validTitle=!1,sections.each(function(i,elem){var title=$(elem).text().trim(),section;title&&(section=$('<li data-index="'+i+'"/>').text(title),$("#indoc_toc #indoc_toclist").append(section),$(elem).find("div>a")[0].title="",validTitle=!0)}),!validTitle){$("#indoc_toc").hide();return}$("#indoc_toc #indoc_toclist>li").on("click",function(){var sectionIndex,targetSection,targetSectionId;$(".LW_CollapsibleArea_Anchor_Div.active").removeClass("active");isItemClicking=!0;sectionIndex=$(this).attr("data-index");targetSection=$($("div#content div>h2.LW_CollapsibleArea_TitleDiv")[sectionIndex]);$("body, html").animate({scrollTop:targetSection.position().top},500,function(){$("#indoc_toc #indoc_toclist>li").removeClass("active");$($("#indoc_toc #indoc_toclist>li")[sectionIndex]).addClass("active");isItemClicking=!1;setPosition()});targetSectionId=$(this).attr("data-index");$("#Anchor_"+targetSectionId).addClass("active")});highlightActiveSubTopic();$("div#content div>h2.LW_CollapsibleArea_TitleDiv").on("mouseover",function(){$(".LW_CollapsibleArea_Anchor_Div.active").removeClass("active");$(this).find(".LW_CollapsibleArea_Anchor_Div").addClass("active")});$("div#content div>h2.LW_CollapsibleArea_TitleDiv").on("mouseout",function(){$(this).find(".LW_CollapsibleArea_Anchor_Div").removeClass("active")})}else $("#rightNavigationMenuThumbnail").remove()}),{init:init,setPosition:setPosition}};typeof define=="function"&&window.mtpsAmd?define("indocTocFixed",["jquery","utilities"],function($){return tocFixedModule(window,document,$)}):(window.epx=window.epx||{},window.epx.library=window.epx.library||{},window.epx.library.indocTocFixed=indocTocFixedModule(window,document,$))})();;
epx=window.epx||{};epx.printExportButton=function(){function init(){initialized||(initialized=!0,epx.utilities&&epx.utilities.supportsHtml5())&&($pabLink=$("#isd_printABook, #isd_printABook2"),$toolbar=$("#exportToolBar"),$pabLink.click(pabLinkClicked),$toolbar.length>0&&$toolbar.is(":visible")&&($pabLink.addClass("exportToolBarShown"),$pabLink.css("cursor","text")),refreshExportCount(),$pabLink.show(),$("#isd_archiveControl").click(function(){var control=$("#isd_archiveControl");control.text()!=""&&($("#tocnav").hasClass("hide-archive")?control.text(control.attr("data-exclude-archive")):control.text(control.attr("data-include-archive")),$("#tocnav, #content.bumper").toggleClass("hide-archive"))}))}function pabLinkClicked(event){if($toolbar.length>0&&$toolbar.is(":visible")){event.preventDefault();return}getTopicCount()>0&&(window.epx.utilities.setCookie("ShowPrintToolBar","true",365,"/"),location.reload(!0),event.preventDefault())}function getTopicCount(){var topicsCount=0,book,c,t;if(typeof localStorage.book!="undefined"){book=JSON.parse(localStorage.book);for(c in book.Chapters)for(t in book.Chapters[c].Topics)if(topicsCount=topicsCount+book.Chapters[c].Topics[t].Count,book.Chapters[c].Topics[t].Count<=0||book.Chapters[c].Topics[t].Type==="node"&&book.Chapters[c].Topics[t].Count===1||book.Chapters[c].Topics[t].Type==="topic"&&book.Chapters[c].Topics[t].Count!==1||book.Chapters[c].Topics[t].Type!=="topic"&&book.Chapters[c].Topics[t].Type!=="node")return 0}return topicsCount}function refreshExportCount(count){localStorage.book&&(count||(count=getTopicCount()),initialized||init(),$pabLink.find(".count").text(count))}function removeExportBorder(){$pabLink.removeClass("exportToolBarShown");$pabLink.css("cursor","pointer")}var $pabLink,$toolbar,initialized=!1;return{init:init,refreshExportCount:refreshExportCount,removeExportBorder:removeExportBorder}}();$(document).ready(function(){epx.printExportButton.init()});;
(function(){var ratingModule=function($,utilities){function adjustRatingPosition(show){$("#responsiveRating").hasClass("static-position")?$(document).scrollTop()+$(window).height()<=$("#ux-footer").position().top-$("#responsiveRating").height()&&$("#responsiveRating").removeClass("static-position"):$(document).scrollTop()+$(window).height()>$("#ux-footer").position().top&&$("#responsiveRating").addClass("static-position");show&&$("#responsiveRating").addClass("show")}function initWedcs(){$("#s_ratingYes").bind("click",function(){utilities.isdefined("MscomCustomEvent")&&MscomCustomEvent("ms.title=yes","ms.cmpgrp=feedbackform")});$("#s_ratingNo").bind("click",function(){utilities.isdefined("MscomCustomEvent")&&MscomCustomEvent("ms.title=no","ms.cmpgrp=feedbackform")});$("#s_ratingSubmit").bind("click",function(){if(utilities.isdefined("MscomCustomEvent")){var feedbackCharacterCount=Number($("#ratingText").attr("maxLength"))-Number($("#feedbackTextCounter").text());MscomCustomEvent("ms.title=submit","ms.feedbackid="+feedbackCharacterCount,"ms.cmpgrp=feedbackform")}});$("#s_ratingSkipThis").bind("click",function(){utilities.isdefined("MscomCustomEvent")&&MscomCustomEvent("ms.title=skip this","ms.cmpgrp=feedbackform")})}function toggleRatingEnablement(){$("#isTopicRated").val()==="true"&&showSection($thankYouSection)}function setupEventHandlers(){$("#s_ratingYes").click(function(){$("#s_ratingValue").val(yesRating);submitRatingValue()});$("#s_ratingNo").click(function(){$("#s_ratingValue").val(noRating);submitRatingValue()});$submitButton.click(function(){submitAdditionalFeedback($("#skinnyRating div.rating textarea").val())});$skipThisButton.click(function(){showSection($thankYouSection)});var maxChars=$("#feedbackTextCounter").text();maxChars||(maxChars=1500);$("#s_ratingText").on("keyup blur keydown",function(){textBoxCharactersCounter($(this),$("#feedbackTextCounter"),maxChars)})}function showSection($section){$yesNoSection.hide();$submitSection.hide();$thankYouSection.hide();$section.show();$section===$thankYouSection&&($("#s_rateThisTopic").hide(),$("#s_rateThisPrefix").hide())}function submitRatingValue(){$yesButton.attr("disabled","disabled");$noButton.attr("disabled","disabled");var data={__RequestVerificationToken:$("input[name='__RequestVerificationToken']").last().val(),rdIsUseful:$("#skinnyRating #s_ratingValue").val(),returnUrl:window.location.href,isAsync:!0},url=$("#ratingValueSubmitUrl").val();$.ajax({type:"POST",url:url,data:data,dataType:"json",async:!0,success:function(data){epx.utilities.log("Rating value successfully submitted");var ratingIdNode=$("<input id='s_ratingId' type='hidden' value='"+data.RatingId+"'>");$(ratingIdNode).insertAfter("#s_ratingValue")},error:function(response){epx.utilities.log("Rating value submission failed: HTTP "+response.status)}});showSection($submitSection);$("#s_ratingText").focus()}function submitAdditionalFeedback(text){if($submitButton.attr("disabled","disabled"),$skipThisButton.attr("disabled","disabled"),$("#skinnyRating #s_ratingId").length==0){showSection($thankYouSection);return}var data={__RequestVerificationToken:$("input[name='__RequestVerificationToken']").last().val(),ratingId:$("#skinnyRating #s_ratingId").val(),feedbackText:text,returnUrl:window.location.href,isAsync:!0},url=$("#ratingAdditionalSubmitUrl").val();$.ajax({type:"POST",url:url,data:data,async:!0,success:function(){epx.utilities.log("Additonal feedback successfully submitted");showSection($thankYouSection)},error:function(response){epx.utilities.log("Additonal feedback submission failed: HTTP "+response.status);showSection($thankYouSection)}})}function textBoxCharactersCounter(control,counter,max){control.val().length>max?control.val(control.val().substring(0,max)):counter.html((max-control.val().length).toString())}var yesRating=1,noRating=0,$yesNoSection,$submitSection,$thankYouSection,$yesButton,$noButton,$submitButton,$skipThisButton;return $(document).ready(function(){$("#skinnyRating div.rating").length!=0&&($yesNoSection=$("#skinnyRating #s_ratingSection1"),$submitSection=$("#skinnyRating #s_ratingSection2"),$thankYouSection=$("#skinnyRating #s_ratingSection3"),$yesButton=$("#skinnyRating #s_ratingYes"),$noButton=$("#skinnyRating #s_ratingNo"),$submitButton=$("#skinnyRating #s_ratingSubmit"),$skipThisButton=$("#skinnyRating #s_ratingSkipThis"),toggleRatingEnablement(),setupEventHandlers(),initWedcs(),$("#skinnyRating>div.closeSmallWhite").click(function(){utilities.setCookie("msdn.epx.library.suggestion","enabled",365);$("#responsiveRating").removeClass("show")}),$(window).scroll(function(){utilities.getCookie("msdn.epx.library.suggestion","disabled")==="disabled"&&$("#responsiveRating").addClass("show");adjustRatingPosition()}))}),{adjustRatingPosition:adjustRatingPosition}};typeof define=="function"&&window.mtpsAmd?define("skinnyRatingV2",["jquery","utilities"],function($,utilities){return ratingModule($,utilities)}):(window.epx=window.epx||{},window.epx.windowsSkinnyRating=ratingModule($,window.epx.utilities))})();;
(function(){var ratingModule=function($,utilities){function initWedcs(){$("#ratingYes").bind("click",function(){utilities.isdefined("MscomCustomEvent")&&MscomCustomEvent("ms.title=yes","ms.cmpgrp=feedbackform")});$("#ratingNo").bind("click",function(){utilities.isdefined("MscomCustomEvent")&&MscomCustomEvent("ms.title=no","ms.cmpgrp=feedbackform")});$("#ratingSubmit").bind("click",function(){if(utilities.isdefined("MscomCustomEvent")){var feedbackCharacterCount=Number($("#ratingText").attr("maxLength"))-Number($("#feedbackTextCounter").text());MscomCustomEvent("ms.title=submit","ms.feedbackid="+feedbackCharacterCount,"ms.cmpgrp=feedbackform")}});$("#ratingSkipThis").bind("click",function(){utilities.isdefined("MscomCustomEvent")&&MscomCustomEvent("ms.title=skip this","ms.cmpgrp=feedbackform")})}function toggleRatingEnablement(){$("#isTopicRated").val()==="true"&&showSection($thankYouSection)}function setupEventHandlers(){$("#ux-footer #ratingYes").click(function(){$("#ux-footer #ratingValue").val(yesRating);showSection($submitSection);$("#ux-footer #ratingText").focus()});$("#ux-footer #ratingNo").click(function(){$("#ux-footer #ratingValue").val(noRating);showSection($submitSection);$("#ux-footer #ratingText").focus()});$submitButton.click(function(){submitRating($("#ux-footer div.rating textarea").val())});$skipThisButton.click(function(){submitRating(null)});var maxChars=$("#feedbackTextCounter").text();maxChars||(maxChars=1500);$("#ratingText").on("keyup blur keydown",function(){textBoxCharactersCounter($(this),$("#feedbackTextCounter"),maxChars)})}function showSection($section){$yesNoSection.hide();$submitSection.hide();$thankYouSection.hide();$section.show();$section===$thankYouSection&&($("#rateThisTopic").hide(),$("#rateThisPrefix").hide())}function submitRating(text){$submitButton.attr("disabled","disabled");$skipThisButton.attr("disabled","disabled");var data={__RequestVerificationToken:$("input[name='__RequestVerificationToken']").last().val(),rdIsUseful:$("#ux-footer #ratingValue").val(),feedbackText:text,onePubTopicId:$("#onePubTopicId").val(),returnUrl:window.location.href,isAsync:!0},url=$("#ratingSubmitUrl").val();$.ajax({type:"POST",url:url,data:data,async:!0,success:function(){epx.utilities.log("Rating successfully submitted");showSection($thankYouSection)},error:function(response){epx.utilities.log("Rating submission failed: HTTP "+response.status);showSection($thankYouSection)}})}function textBoxCharactersCounter(control,counter,max){control.val().length>max?control.val(control.val().substring(0,max)):counter.html((max-control.val().length).toString())}var yesRating=1,noRating=0,$yesNoSection,$submitSection,$thankYouSection,$submitButton,$skipThisButton;$(document).ready(function(){($("#tocnav>div.current.archive").length==1&&$("#footerSock").hide(),$("#ux-footer #footerSock div.rating:visible").length!=0)&&($yesNoSection=$("#ux-footer #ratingSection1"),$submitSection=$("#ux-footer #ratingSection2"),$thankYouSection=$("#ux-footer #ratingSection3"),$submitButton=$("#ux-footer #ratingSubmit"),$skipThisButton=$("#ux-footer #ratingSkipThis"),toggleRatingEnablement(),setupEventHandlers(),initWedcs())})};typeof define=="function"&&window.mtpsAmd?define("rating",["jquery","utilities"],function($,utilities){return ratingModule($,utilities)}):(window.epx=window.epx||{},window.epx.windowsRating=ratingModule($,window.epx.utilities))})();;
(function(){var footerModule=function($){function fixNthChild(){$("div#ux-footer footer.top div#rightLinks > div:nth-child(4n)").addClass("nth-child-4n")}$(document).ready(function(){fixNthChild()})};typeof define=="function"&&window.mtpsAmd?define("footer",["jquery"],function($){return footerModule($)}):footerModule($)})();;
function WatermarkFocus(control,defaultValue,cssValue){control.value==defaultValue&&(control.value="",control.className=cssValue);document.onkeydown=""}function WatermarkBlur(control,defaultValue,cssValue){control.value==""&&(control.value=defaultValue,control.className=cssValue);typeof Presskey!="undefined"&&Presskey&&(document.onkeydown=Presskey)}function AddWatermark(controlName,defaultValue,cssValue){document.getElementById(controlName).value==""&&(document.getElementById(controlName).value=defaultValue,document.getElementById(controlName).className=cssValue)}function WatermarkOnSubmit(control,defaultValue,cssValue){control.value==defaultValue&&(control.value="",control.className=cssValue)}function TextBoxCharactersCounter(control,counter,max){control.value.length>max?control.value=control.value.substring(0,max):counter.innerHTML=(max-control.value.length).toString()}function SiteFeedbackNewWindow(url){window.open(url,"_blank","width=750,height=836,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no")}function SearchBoxOnSubmit(textValue){return document.getElementById("HeaderSearchTextBox").value!=textValue&&document.getElementById("HeaderSearchTextBox").value!=""?(document.getElementById("HeaderSearchForm").submit(),!0):!1}epx=window.epx||{};epx.topicModule=function(w){function isPrintExperience(){return $("#MtpsDevice").val()=="Printer"}function setPrintableExperience(){var $printCss,isPrint;$("#printForPab").val()!="true"&&($printCss=document.createElement("link"),$printCss.setAttribute("href","/Areas/Epx/Content/Css/PrintView.css"),$printCss.setAttribute("rel","stylesheet"),$printCss.setAttribute("type","text/css"),isPrint=isPrintExperience(),isPrint!==!0&&$printCss.setAttribute("media","print"),$("head")[0].appendChild($printCss),isPrint===!0&&w.print&&($(".TranslationViewSwitcher").remove(),setTimeout(function(){w.print()},500)))}return{isPrintExperience:isPrintExperience,setPrintableExperience:setPrintableExperience}};epx.topic=epx.topicModule(window);$(document).ready(function(){epx.topic.setPrintableExperience()});;
function dcsCookie(){typeof dcsOther=="function"?dcsOther():typeof dcsPlugin=="function"?dcsPlugin():typeof dcsFPC=="function"&&dcsFPC(gTimeZone)}function dcsGetCookie(name){var pos=document.cookie.indexOf(name+"="),start,end;return pos!=-1?(start=pos+name.length+1,end=document.cookie.indexOf(";",start),end==-1&&(end=document.cookie.length),unescape(document.cookie.substring(start,end))):null}function dcsGetCrumb(name,crumb){for(var aCookie=dcsGetCookie(name).split(":"),aCrumb,i=0;i<aCookie.length;i++)if(aCrumb=aCookie[i].split("="),crumb==aCrumb[0])return aCrumb[1];return null}function dcsGetIdCrumb(name,crumb){for(var cookie=dcsGetCookie(name),id=cookie.substring(0,cookie.indexOf(":lv=")),aCrumb=id.split("="),i=0;i<aCrumb.length;i++)if(crumb==aCrumb[0])return aCrumb[1];return null}function dcsFPC(offset){var dExp,dSes,cur,i,dLst,expiry;if(typeof offset!="undefined"&&document.cookie.indexOf("WTLOPTOUT=")==-1){var name=gFpc,dCur=new Date,adj=dCur.getTimezoneOffset()*6e4+offset*36e5;if(dCur.setTime(dCur.getTime()+adj),dExp=new Date(dCur.getTime()+31536e7),dSes=new Date(dCur.getTime()),document.cookie.indexOf(name+"=")==-1){if(typeof gWtId!="undefined"&&gWtId!="")WTBI.co_f=gWtId;else if(typeof gTempWtId!="undefined"&&gTempWtId!="")WTBI.co_f=gTempWtId,WTBI.vt_f="1";else{for(WTBI.co_f="2",cur=dCur.getTime().toString(),i=2;i<=32-cur.length;i++)WTBI.co_f+=Math.floor(Math.random()*16).toString(16);WTBI.co_f+=cur;WTBI.vt_f="1"}typeof gWtAccountRollup=="undefined"&&(WTBI.vt_f_a="1");WTBI.vt_f_s="1";WTBI.vt_f_d="1";WTBI.vt_f_tlh=WTBI.vt_f_tlv="0"}else{var id=dcsGetIdCrumb(name,"id"),lv=parseInt(dcsGetCrumb(name,"lv")),ss=parseInt(dcsGetCrumb(name,"ss"));if(id==null||id=="null"||isNaN(lv)||isNaN(ss))return;WTBI.co_f=id;dLst=new Date(lv);WTBI.vt_f_tlh=Math.floor((dLst.getTime()-adj)/1e3);dSes.setTime(ss);(dCur.getTime()>dLst.getTime()+18e5||dCur.getTime()>dSes.getTime()+288e5)&&(WTBI.vt_f_tlv=Math.floor((dSes.getTime()-adj)/1e3),dSes.setTime(dCur.getTime()),WTBI.vt_f_s="1");(dCur.getDay()!=dLst.getDay()||dCur.getMonth()!=dLst.getMonth()||dCur.getYear()!=dLst.getYear())&&(WTBI.vt_f_d="1")}WTBI.co_f=escape(WTBI.co_f);WTBI.vt_sid=WTBI.co_f+"."+(dSes.getTime()-adj);expiry="; expires="+dExp.toGMTString();document.cookie=name+"=id="+WTBI.co_f+":lv="+dCur.getTime().toString()+":ss="+dSes.getTime().toString()+expiry+"; path=/"+(typeof gFpcDom!="undefined"&&gFpcDom!=""?"; domain="+gFpcDom:"");document.cookie.indexOf(name+"=")==-1&&(WTBI.co_f=WTBI.vt_sid=WTBI.vt_f_s=WTBI.vt_f_d=WTBI.vt_f_tlh=WTBI.vt_f_tlv="",WTBI.vt_f=WTBI.vt_f_a="2")}}function dcsEvt(evt,tag){for(var e=evt.target||evt.srcElement;e.tagName&&e.tagName!=tag;)e=e.parentElement||e.parentNode;return e}function dcsBind(event,func){typeof window[func]=="function"&&document.body&&(document.body.addEventListener?document.body.addEventListener(event,window[func],!0):document.body.attachEvent&&document.body.attachEvent("on"+event,window[func]))}function dcsET(){dcsBind("click","dcsDownload");dcsBind("click","dcsFormButton");dcsBind("keypress","dcsFormButton");dcsBind("click","dcsImageMap")}function dcsMultiTrack(){var i,dCurrent;if(arguments.length%2==0){for(i=0;i<arguments.length;i+=2)arguments[i].indexOf("WT.")==0?WTBI[arguments[i].substring(3)]=arguments[i+1]:arguments[i].indexOf("DCS.")==0?DCS[arguments[i].substring(4)]=arguments[i+1]:arguments[i].indexOf("DCSext.")==0&&(DCSext[arguments[i].substring(7)]=arguments[i+1]);dCurrent=new Date;DCS.dcsdat=dCurrent.getTime();dcsTag()}}function dcsDownload(evt){var e,gPath,gTitle;evt=evt||window.event||"";evt&&(e=dcsEvt(evt,"A"),e&&e.hostname&&e.href&&e.protocol&&e.protocol.indexOf("http")!=-1&&(dcsNavigation(e),gPath=e.pathname?e.pathname.indexOf("/")!=0?"/"+e.pathname:e.pathname:"/",gTitle=document.all?e.innerText||e.innerHTML||"":e.text||e.innerHTML||"",dcsMultiTrack("DCS.dcssip",e.hostname,"DCS.dcsuri",gPath,"DCS.dcsqry",e.search||"","WT.ti","Link:"+gTitle,"WT.dl","1","WT.ad","","WT.mc_id","","WT.sp",""),DCS.dcssip=DCS.dcsuri=DCS.dcsqry=WTBI.ti=WTBI.dl=gTitle=gPath=""))}function dcsNavigation(wtnode){try{for(var wtCount=0;wtCount!=1;)wtnode.parentNode.tagName!="DIV"&&(wtnode=wtnode.parentNode),wtnode.parentNode.tagName=="DIV"&&(wtnode.parentNode.getAttribute("id")||wtnode.parentNode.className?(DCSext.wtNavigation=wtnode.parentNode.getAttribute("id")||wtnode.parentNode.className,wtCount=1):wtnode=wtnode.parentNode)}catch(error){}}function dcsImageMap(evt){var f,path;evt=evt||window.event||"";evt&&(f=dcsEvt(evt,"AREA"),f&&f.hostname&&f.href&&f.protocol&&f.protocol.indexOf("http")!=-1&&(path=f.pathname?f.pathname.indexOf("/")!=0?"/"+f.pathname:f.pathname:"/",dcsMultiTrack("DCS.dcssip",f.hostname,"DCS.dcsuri",path,"DCS.dcsqry",f.search||"","WT.ti","Link:Image Map","WT.dl","1","WT.ad","","WT.mc_id","","WT.sp",""),DCS.dcssip=DCS.dcsuri=DCS.dcsqry=WTBI.ti=WTBI.dl=""))}function dcsFormButton(evt){var e,type,gUri,elems,i,etype;if(evt=evt||window.event||"",evt&&(e=dcsEvt(evt,"INPUT"),type=e.type||"",type&&(type=="submit"||type=="image"||type=="button"||type=="reset")||type=="text"&&(evt.which||evt.keyCode)==13)){if(gUri=gTitle=gMethod=qry="",e.form){for(elems=e.form.elements,i=0;i<elems.length;i++)etype=elems[i].type,etype=="text"&&(qry+=(qry==""?"":"&")+escape(elems[i].name)+"="+escape(elems[i].value));gUri=e.form.action||window.location.pathname;gTitle=e.form.id||e.form.className||e.form.name||"Unknown";gMethod=e.form.method||"Unknown"}else gUri=window.location.pathname,gTitle=e.name||e.id||"Unknown",gMethod="Input";gUri!=""&&gTitle!=""&&gMethod!=""&&evt.keyCode!=9&&dcsMultiTrack("DCS.dcsuri",gUri,"DCS.dcsqry",qry,"WT.ti","FormButton:"+gTitle,"WT.dl","2","WT.fm",gMethod,"WT.ad","","WT.mc_id","","WT.sp","");DCS.dcsuri=DCS.dcsqry=qry=WTBI.ti=WTBI.dl=WTBI.fm=gUri=gTitle=gMethod=""}}function dcsAdSearch(){}function dcsContentRatings(evt){var e,gTitle,f,type,gUri,gComTemp,gCount,gRatTemp;if(evt=evt||window.event||"",evt&&(e=dcsEvt(evt,"A"),e&&e.hostname&&(gTitle=document.all?DCSext.wt_ratd2=e.innerText||e.innerHTML||"":DCSext.wt_ratd2=e.text||e.innerHTML||"",DCSext.wt_ratd1="Upper Ratings Options",dcsMultiTrack("DCS.dcssip",frmRatings.window.location.hostname,"DCS.dcsuri",frmRatings.window.location.pathname,"DCS.dcsqry","","WT.ti","Link:"+gTitle,"WT.dl","9","WT.ad","","WT.mc_id","","WT.sp",""),DCS.dcssip=DCS.dcsuri=DCS.dcsqry=WTBI.ti=WTBI.dl=gTitle=DCSext.wt_ratd1=DCSext.wt_ratd2=""),f=dcsEvt(evt,"INPUT"),f&&(type=f.type||"",type&&(type=="submit"||type=="button"&&(evt.which||evt.keyCode)==13)))){gUri=gTitle="";gUri=f.form.action||frmRatings.window.location.pathname;gTitle="Content Ratings";gComTemp=frmRatings.document.getElementById("txtFeedback");DCSext.wt_ratd2=gComTemp.value!=""?"Comment Submitted":"No Comment Submitted";try{for(gCount=1;frmRatings.document.getElementById("Rate"+gCount)!="undefined";)gRatTemp=frmRatings.document.getElementById("Rate"+gCount),gRatTemp.checked&&(DCSext.wt_ratings=gRatTemp.value.replace(/rate/gi,"")),gCount++}catch(error){}DCSext.wt_ratd1="Comment Fields";gUri!=""&&evt.keyCode!=9&&dcsMultiTrack("DCS.dcsuri",gUri,"DCS.dcsqry","","WT.ti","FormButton:"+gTitle,"WT.dl","cr","WT.ad","","WT.mc_id","","WT.sp","");DCS.dcsuri=DCS.dcsqry=qry=WTBI.ti=WTBI.dl=WTBI.fm=DCSext.wt_ratings=DCSext.wt_ratd1=DCSext.wt_ratd2=gTitle=gUri=""}}function dcsAdv(){if(typeof gTrackEvents!="undefined"&&gTrackEvents&&(WTBI.wtsv=1,typeof WTBI.sp!="undefined"&&(WTBI.sv_sp=WTBI.sp),dcsFunc("dcsET")),dcsFunc("dcsCookie"),dcsFunc("dcsNvrRu"),document.getElementById("frmRatings")){var gTemp=document.getElementById("frmRatings").src;gTemp.indexOf("ratings.aspx")!=-1&&(frmRatings.document.body.addEventListener?(frmRatings.document.body.addEventListener("click",dcsContentRatings,!0),frmRatings.document.body.addEventListener("keypress",dcsContentRatings,!0)):frmRatings.document.body.attachEvent&&(frmRatings.document.body.attachEvent("onclick",dcsContentRatings),frmRatings.document.body.attachEvent("keypress",dcsContentRatings)))}}function dcsVar(){var dCurrent=new Date,flash,currentTime,gDirLevels,gFpath,gSplit,b,i,pos,front,end;if(WTBI.tz=dCurrent.getTimezoneOffset()/-60,WTBI.tz==0&&(WTBI.tz="0"),WTBI.bh=dCurrent.getHours(),WTBI.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage,typeof screen=="object"&&(WTBI.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth,WTBI.sr=screen.width+"x"+screen.height),typeof navigator.javaEnabled()=="boolean"&&(WTBI.jo=navigator.javaEnabled()?"Yes":"No"),document.title&&(WTBI.ti=gI18n?dcsEscape(dcsEncode(document.title),I18NRE):document.title),WTBI.js="Yes",WTBI.jv=dcsJV(),document.body&&document.body.addBehavior&&(document.body.addBehavior("#default#clientCaps"),document.body.connectionType&&(WTBI.ct=document.body.connectionType),document.body.addBehavior("#default#homePage"),WTBI.hp=document.body.isHomePage(location.href)?"1":"0"),parseInt(navigator.appVersion)>3&&(navigator.appName=="Microsoft Internet Explorer"&&document.body?WTBI.bs=document.body.offsetWidth+"x"+document.body.offsetHeight:navigator.appName=="Netscape"&&(WTBI.bs=window.innerWidth+"x"+window.innerHeight)),WTBI.fi="No",window.ActiveXObject)for(i=10;i>0;i--)try{flash=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);WTBI.fi="Yes";WTBI.fv=i+".0";break}catch(e){}else if(navigator.plugins&&navigator.plugins.length)for(i=0;i<navigator.plugins.length;i++)if(navigator.plugins[i].name.indexOf("Shockwave Flash")!=-1){WTBI.fi="Yes";WTBI.fv=navigator.plugins[i].description.split(" ")[2];break}if(gI18n&&(WTBI.em=typeof encodeURIComponent=="function"?"uri":"esc",typeof document.defaultCharset=="string"?WTBI.le=document.defaultCharset:typeof document.characterSet=="string"&&(WTBI.le=document.characterSet)),typeof wtsp!="undefined"&&(WTBI.sp=wtsp),WTBI.dl="0",WTBI.dcsvid=dcsGetCookie("MC1"),DCS.dcsdat=WTBI.dcsdat=dCurrent.getTime(),DCS.dcssip=window.location.hostname,DCS.dcsuri=window.location.pathname,currentTime=new Date,DCSext.wt_date=currentTime.getFullYear()+"/"+(currentTime.getMonth()+1)+"/"+currentTime.getDate(),DCSext.wt_dos=1,gDirLevels=5,gFpath=window.location.pathname.substring(window.location.pathname.indexOf("/")+1,window.location.pathname.lastIndexOf("/")+1).toLowerCase(),gFpath=="")gFpath="/";else for(gSplit=gFpath.split("/"),gFpath="",i=1;i<gSplit.length&&i<=gDirLevels;i++){for(gFpath+="/",b=0;b<i;b++)gFpath+=gSplit[b]+"/";i!=gDirLevels&&i!=gSplit.length-1&&(gFpath+=";")}if(DCSext.wtDrillDir=gFpath,DCSext.wtEvtSrc=window.location.hostname+window.location.pathname,window.location.search&&(DCS.dcsqry=window.location.search,gQP.length>0))for(i=0;i<gQP.length;i++)pos=DCS.dcsqry.indexOf(gQP[i]),pos!=-1&&(front=DCS.dcsqry.substring(0,pos),end=DCS.dcsqry.substring(pos+gQP[i].length,DCS.dcsqry.length),DCS.dcsqry=front+end);window.document.referrer!=""&&window.document.referrer!="-"&&(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4||(DCS.dcsref=gI18n?dcsEscape(window.document.referrer,I18NRE):window.document.referrer))}function dcsA(N,V){return"&"+N+"="+dcsEscape(V,RE)}function dcsEscape(S,REL){if(typeof REL!="undefined"){var retStr=new String(S);for(R in REL)retStr=retStr.replace(REL[R],R);return retStr}else return escape(S)}function dcsEncode(S){return typeof encodeURIComponent=="function"?encodeURIComponent(S):escape(S)}function dcsCreateImage(dcsSrc){document.images?(gImages[gIndex]=new Image,gImages[gIndex].src=dcsSrc,gIndex++):document.write('<IMG ALT="" BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+dcsSrc+'">')}function dcsMeta(){var elems,i,meta;if(document.all?elems=document.all.tags("meta"):document.documentElement&&(elems=document.getElementsByTagName("meta")),typeof elems!="undefined")for(i=1;i<=elems.length;i++)meta=elems.item(i-1),meta.name&&(meta.name.indexOf("WT.")==0?WTBI[meta.name.substring(3)]=gI18n&&meta.name.indexOf("WT.ti")==0?dcsEscape(dcsEncode(meta.content),I18NRE):meta.content:meta.name.indexOf("DCSext.")==0?DCSext[meta.name.substring(7)]=meta.content:meta.name.indexOf("DCS.")==0&&(DCS[meta.name.substring(4)]=gI18n&&meta.name.indexOf("DCS.dcsref")==0?dcsEscape(meta.content,I18NRE):meta.content))}function dcsTag(){if(document.cookie.indexOf("WTLOPTOUT=")==-1){var P="http"+(window.location.protocol.indexOf("https:")==0?"s":"")+"://"+gDomain+(gDcsId==""?"":"/"+gDcsId)+"/dcs.gif?";for(N in DCS)DCS[N]&&(P+=dcsA(N,DCS[N]));for(N in WTBI)WTBI[N]&&(P+=dcsA("WT."+N,WTBI[N]));for(N in DCSext)DCSext[N]&&(P+=dcsA(N,DCSext[N]));P.length>2048&&navigator.userAgent.indexOf("MSIE")>=0&&(P=P.substring(0,2040)+"&WTBI.tu=1");dcsCreateImage(P)}}function dcsJV(){var agt=navigator.userAgent.toLowerCase(),major=parseInt(navigator.appVersion),mac=agt.indexOf("mac")!=-1,nn=agt.indexOf("mozilla")!=-1&&agt.indexOf("compatible")==-1,nn4=nn&&major==4,nn6up=nn&&major>=5,ie=agt.indexOf("msie")!=-1&&agt.indexOf("opera")==-1,ie4=ie&&major==4&&agt.indexOf("msie 4")!=-1,ie5up=ie&&!ie4,op=agt.indexOf("opera")!=-1,op5=agt.indexOf("opera 5")!=-1||agt.indexOf("opera/5")!=-1,op6=agt.indexOf("opera 6")!=-1||agt.indexOf("opera/6")!=-1,op7up=op&&!op5&&!op6,jv="1.1";return nn6up||op7up?jv="1.5":mac&&ie5up||op6?jv="1.4":ie5up||nn4||op5?jv="1.3":ie4&&(jv="1.2"),jv}function dcsFunc(func){typeof window[func]=="function"&&window[func]()}function dcsNvrRu(){if(document.cookie.indexOf("WTLOPTOUT=")==-1){var gc=function(name){var c=document.cookie,pos=c.indexOf(name+"="),start,end;return pos!=-1?(start=pos+name.length+1,end=c.indexOf(";",start),end==-1&&(end=c.length),c.substring(start,end)):null},cur=new Date,exp=new Date(cur.getTime()+31536e7),nvrRu=new DcsNvrRu(gc,exp),nvr=new DcsNvr(gc,exp);nvrRu.run();nvr.run()}}function DcsNvrRu(gc,exp){function read(){for(var num=0,value=gc(cfg.fpcname),levels,level,crumbs,curlevel,leveldata;value;){for(levels=value.split(":"),level=0;level<levels.length;level++)crumbs=levels[level].split("="),curlevel=crumbs[0],leveldata=[],crumbs[1].length>0&&(leveldata=crumbs[1].split("|")),data[curlevel]=typeof data[curlevel]!="object"?leveldata:data[curlevel].concat(leveldata);num++;value=gc(cfg.fpcname+num)}}function process(){var rc=0,rudom=getRuDom(),rupath=getRuPath(),ruparam=getRuParam();return data.length>0?(rudom.length>0&&update(0,rudom)&&(rc|=1),rupath.length>0&&update(1,rupath)&&(rc|=2),ruparam.length>2&&updateParam(2,ruparam)&&(rc|=4)):(rudom.length>0?(data[0]=[rudom],rc|=1):data[0]=[],rupath.length>0?(data[1]=[rupath],rc|=2):data[1]=[],ruparam.length>0?(data[2]=[ruparam],rc|=4):data[2]=[]),rc}function compose(){for(var cookies=[],attr={name:cfg.fpcname,value:"",expiry:"; expires="+exp.toGMTString(),path:"; path=/",domain:"; domain="+cfg.fpcdom},num=0,maxval=4e3,newcrumb,j,i=0;i<data.length;i++){for(newcrumb=i+"=",j=0;j<data[i].length;j++)newcrumb+=(j===0?"":"|")+data[i][j];(attr.name+(num||"")).length+attr.value.length+newcrumb.length+1<=maxval?(attr.value.length>0&&(attr.value+=":"),attr.value+=newcrumb):(cookies[num]=attr.name+(num||"")+"="+attr.value+attr.expiry+attr.path+attr.domain,attr.value=newcrumb,num++)}return cookies[num]=attr.name+(num||"")+"="+attr.value+attr.expiry+attr.path+attr.domain,cookies}function getRuDom(){for(var curdom=getCurDom(),doms=getDoms(),i=0;i<doms.length;i++)if(doms[i]==curdom)return doms[i];return""}function getRuPath(){for(var curpath=getCurPath(),paths=getPaths(),i=0;i<paths.length;i++)if(curpath.indexOf(paths[i])!=-1)return paths[i];return""}function getRuParam(){for(var params=getParams(),value,parts,curparams,pair,j,i=0;i<params.length;i++)if(value=eval(params[i]),value&&value.length>0)return params[i]+"&"+value;for(curparams=getCurParams(),i=0;i<curparams.length;i++)if(pair=curparams[i].split("="),pair.length==2)for(j=0;j<params.length;j++)if(params[j]==pair[0])return pair[0]+"&"+pair[1];return""}function update(level,item){for(var items=data[level],i=0;i<items.length;i++)if(items[i]==item)return!1;return data[level][data[level].length]=item,!0}function updateParam(level,item){for(var pair=item.split("&"),param,j,i=0;i<data[level].length;i++)if(param=data[level][i].split("&"),param[0]==pair[0]){for(j=1;j<param.length;j++)if(param[j]==pair[1])return!1;return data[level][i]+="&"+pair[1],!0}return data[level][data[level].length]=pair[0]+"&"+pair[1],!0}function clipDom(dom,fpcdom){var idx=dom?dom.indexOf(fpcdom):-1;return idx!=-1?dom.substring(0,idx):dom}function getCurDom(){var dom=clipDom(window.location.hostname.toLowerCase(),cfg.fpcdom.toLowerCase());return dom.length===0&&(dom="www"),dom}function getDoms(){for(var doms=cfg.domlist.toLowerCase().split(","),i=0;i<doms.length;i++)doms[i]=clipDom(doms[i],cfg.fpcdom.toLowerCase()),doms[i].length===0&&(doms[i]="www");return doms}function getPaths(){for(var paths=cfg.pathlist.toLowerCase().split(","),p,i=0;i<paths.length;i++)p=paths[i],p.length===0?p="/":p.length>1&&(p.charAt(0)=="/"&&(p=p.substr(1)),p.charAt(p.length-1)=="/"&&(p=p.substr(0,p.length-1))),p.length!=paths[i].length&&(paths[i]=p),cfg.siteid.length>0&&(paths[i]=cfg.siteid+"&"+paths[i]);return paths}function getCurPath(){var p=window.location.pathname,badchars,ch;p=p.substring(p.indexOf("/")+1,p.lastIndexOf("/")).toLowerCase();badchars={"%09":/\t/g,"%20":/ /g,"%2C":/,/g,"%3B":/;/g};for(ch in badchars)p=p.replace(badchars[ch],ch);return cfg.siteid.length>0?cfg.siteid+"&"+p:p}function getCurParams(){return typeof DCS.dcsqry!="undefined"?DCS.dcsqry.substring(1).split("&"):[]}function getParams(){return cfg.paramlist.split(",")}var cfg={fpcname:wt_nvr_ru,fpcdom:wt_fpcdom,domlist:wt_domlist,pathlist:wt_pathlist,paramlist:wt_paramlist,siteid:wt_siteid},data=[];this.run=function(){read();var rc=process(),c,i,val;if(rc){for(c=compose(),i=0;i<c.length;i++)document.cookie=c[i];val=document.cookie.indexOf(cfg.fpcname+"=")!=-1?"1":"2";(rc&1||rc&2)&&(WTBI.vt_nvr0=val);rc&4&&(WTBI.vt_nvr1=val)}}}function DcsNvr(gc,exp){function read(){for(var num=0,re=/,/g,value=gc(cfg.fpcname),levels,i,crumbs,level,paths;value;){for(levels=value.split(":"),i=0;i<levels.length;i++)crumbs=levels[i].split("="),level=parseInt(crumbs[0],10),paths=crumbs[1].replace(re,"|").split("|"),typeof data[level]!="object"?data[level]=[paths,!1]:data[level][0]=data[level][0].concat(paths);num++;value=gc(cfg.fpcname+num)}}function process(){var newv=!1,curlevel=0,splitp=[],p=window.location.pathname,curpath=p.substring(p.indexOf("/")+1,p.lastIndexOf("/")).toLowerCase(),badchars={"%09":/\t/g,"%20":/ /g,"%2C":/,/g,"%3B":/;/g},ch,found,i;for(ch in badchars)curpath=curpath.replace(badchars[ch],ch);if(curpath.length>1&&(splitp=curpath.split("/",cfg.maxlevel),curlevel=splitp.length,curpath=splitp.join("/")),found=!1,data.length>0)if(data.length>curlevel){for(i=0;i<data[curlevel][0].length;i++)if(data[curlevel][0][i]==curpath){found=!0;break}found||(data[curlevel][0][data[curlevel][0].length]=curpath,data[curlevel][1]=!0,newv=!0)}else{for(i=0;i<curlevel+1;i++)typeof data[i]!="object"&&(data[i]=[[i===0?"/":splitp.slice(0,i).join("/")],!0]);newv=!0}else{for(i=0;i<curlevel+1;i++)data[i]=[[i===0?"/":splitp.slice(0,i).join("/")],!0];newv=!0}return newv}function compose(){for(var cookies=[],attr={name:cfg.fpcname,value:"",expiry:"; expires="+exp.toGMTString(),path:"; path=/",domain:"; domain="+cfg.fpcdom},paths=[],num=0,maxnum=10,maxval=4e3,maxed=!1,newpath,j,i=0;i<data.length&&!maxed;i++)for(paths=data[i][0],newpath=i+"=",j=0;j<paths.length&&!maxed;j++)newpath+=(j===0?"":"|")+paths[j],(attr.name+num).length+attr.value.length+newpath.length+1<=maxval?(attr.value.length>0&&j===0&&(attr.value+=":"),attr.value+=newpath):attr.value.length>0&&(cookies[num]=attr.name+(num||"")+"="+attr.value+attr.expiry+attr.path+attr.domain,attr.value=i+"="+paths[j],++num>maxnum-1&&(maxed=!0)),newpath="";return maxed||(cookies[num]=attr.name+(num||"")+"="+attr.value+attr.expiry+attr.path+attr.domain),cookies}var cfg={fpcname:"WT_NVR",fpcdom:window.location.hostname,maxlevel:3},data=[];this.run=function(){read();var c,i,val;if(process()){for(c=compose(),i=0;i<c.length;i++)document.cookie=c[i];for(val=document.cookie.indexOf(cfg.fpcname+"=")!=-1?"1":"2",i=0;i<data.length;i++)data[i][1]&&(WTBI["vt_nvr"+(i+2)]=val)}}}var gTagVer="MSDN 1.6f/2-15-07",gService=!0,gTimeZone=-8,gFpcDom=".microsoft.com",gImages=[],gIndex=0,DCS={},WTBI={},DCSext={},gQP=[],gI18n=!1,RE,I18NRE;window.RegExp&&(RE={"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g},I18NRE={"%25":/\%/g});dcsVar();dcsMeta();dcsFunc("dcsAdv");dcsTag();;
(function(){var appInsightsPerfModule=function($){return window.appInsights={queue:[],start:function(n){function r(n,t){n[t]=function(){var i=arguments;n.queue.push(function(){n[t].apply(n,i)})}}var t,i;this.applicationInsightsId=n;this.accountId=null;this.appUserId=null;r(this,"logEvent");r(this,"logPageView");t=document.createElement("script");t.type="text/javascript";t.src="//az416426.vo.msecnd.net/scripts/a/ai.0.js";t.async=!0;i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(t,i)}},$(document).ready(function(){window.appInsights.start(window.appInsightsId);window.appInsights.logPageView()}),window.appInsights};typeof define=="function"&&window.mtpsAmd?define("appInsightsPerf",["jquery"],function($){return appInsightsPerfModule($)}):(window.epx=window.epx||{},window.epx.appInsights=appInsightsPerfModule($))})();;
epx=window.epx||{};epx.library=window.epx.library||{};epx.library.toc=function(){function init(){initLocalizeString();var $sections=$("div#tocnav > div[class^='toc']"),$childrenSection=$(nodePaddingFormat);$("#tocnav div[data-toclevel]").each(function(){initNode($(this),$sections,$childrenSection)});hideTooManyFirstLevelSiblings($sections[0]);updateIfHighContrastMode();updateAriaLabel();$("#isd_archiveControlResponsive").click(function(){var control=$("#isd_archiveControlResponsive");control.text()!=""&&($("#tocnav").hasClass("hide-archive")?control.html("<ins/>"+control.attr("data-exclude-archive")):control.html("<ins/>"+control.attr("data-include-archive")),$("#tocnav, #content.bumper").toggleClass("hide-archive"),typeof define=="function"&&typeof require=="function"&&window.mtpsAmd?require("tocFixed").setPosition():window.epx.library.tocFixed&&typeof window.epx.library.tocFixed.setPosition=="function"&&window.epx.library.tocFixed.setPosition())});$("#tocExpandButton").click(function(e){return expandTocSiblingsClick(),e.stopPropagation(),!1});$("#tocnav div.archive:first").length>0&&$("#tocnav div.archive.current").length==0&&($("#tocnav").addClass("hide-archive"),$("#tocnav").append($("#isd_archiveControlResponsive").parent()),$("#isd_archiveControlResponsive").show(),$("#isd_archiveControlResponsive").html("<ins/>"+$("#isd_archiveControlResponsive").attr("data-include-archive")));$("#tocnav").on("click","a.toc_collapsed",function(){function addNodesIn($div,$parentDiv,nodes,startIndex,endIndex){for(var parentExpandingLevel=getLevel($div),$node,i=startIndex;i<=endIndex;i++){var nodeHasChildren=!1,childCountId=null,isArchived=!1;nodes[i].Href&&(nodes[i].ExtendedAttributes&&(nodes[i].ExtendedAttributes[hasSubTreeAttr]&&(nodeHasChildren=nodes[i].ExtendedAttributes[hasSubTreeAttr]==="true"),nodes[i].ExtendedAttributes["data-childCountId"]&&(childCountId=nodes[i].ExtendedAttributes["data-childCountId"],window.MTPS&&window.MTPS.TopicNodes&&(window.MTPS.TopicNodes[childCountId]=nodes[i].ExtendedAttributes["data-childCount"])),$.type(nodes[i].ExtendedAttributes["data-isarchived"])=="string"&&(isArchived=nodes[i].ExtendedAttributes["data-isarchived"].toLowerCase()=="true")),$node=$(buildNode(nodes[i].Href,nodes[i].Title,parentExpandingLevel+1,!1,nodeHasChildren,childCountId)),isArchived&&$node.addClass("archive"),nodes[i].Href===currentHref&&$node.addClass("current"),$node.appendTo($parentDiv))}updateIfHighContrastMode();updateAriaLabel($parentDiv);updatePosition()}var $chevron=$(this),$div=$chevron.parent(),level=getLevel($div),$nextTocPaddingDiv,href,toolBarStatus,useCache;return $div.attr(childrenLoadedAttr)==="true"?(window.epx.utilities.log("Child nodes already loaded"),$chevron.attr("class","toc_expanded"),updateAriaLabel($chevron),$nextTocPaddingDiv=$div.next(),!$nextTocPaddingDiv.hasClass("tocPadding"))?!1:($nextTocPaddingDiv.removeClass("hidden"),epx.library.tocFixed!=undefined&&epx.library.tocFixed!=null&&epx.library.tocFixed.setPosition(),!1):(window.epx.utilities.log("Loading TOC nodes"),href=buildTocHref($chevron.siblings().first().attr("href")),href==undefined||href==null)?!1:(toolBarStatus=window.epx.utilities.getCookie("ShowPrintToolBar",""),useCache=!(toolBarStatus==="true"),$.ajax({type:"GET",async:!0,url:href,cache:useCache,dataType:"json",success:function(r){if(!r||r.length<1){window.epx.utilities.log("TOC web service returned 0 nodes.");return}if(window.epx.utilities.log("TOC web service returned "+r.length+" node(s), processing..."),$newPadding=$(nodePaddingFormat),addNodesIn($div,$newPadding,r,0,r.length-1),$div.after($newPadding),window.MTPS&&window.MTPS.Export&&window.MTPS.Export.initViaLink&&window.MTPS.Export.initViaLink($newPadding.find("a")),$("#tocnav>div.current.archive").length!=1){var firstArchiveNode=$("#tocnav>div.archive:first");firstArchiveNode.length>0&&($("#tocnav.hidearchive").length>0?($("#isd_archiveControlResponsive").show(),$("#isd_archiveControlResponsive").text($("#isd_archiveControl").attr("data-exclude-archive"))):($("#isd_archiveControlResponsive").show(),$("#isd_archiveControlResponsive").text($("#isd_archiveControlResponsive").attr("data-include-archive"))));updatePosition()}}}),$div.attr(childrenLoadedAttr,"true"),$chevron.attr("class","toc_expanded"),updateAriaLabel($chevron),appInsightLog("TocExpandCount",{tocHref:href}),!1)});$("#tocnav").on("click","a.toc_expanded",function(){return expandClick($(this))});$("#tocnav").on("click",'a[href^="/"]',subscribeTocLinkClick);$("#exportDisclaimer").length>0&&$("#tocMenuToggler").hide();$("#tocMenuToggler").click(function(e){$("#leftNav").parent().hasClass("bodyTocMenuCollapsed")==!1?hideToc():showToc();e.stopPropagation()})}function updatePosition(){epx.library.tocFixed!=undefined&&epx.library.tocFixed!=null&&epx.library.tocFixed.setPosition()}function initNode($div,$sections,$childrenSection){var $link=$div.children().last(),level=getLevel($div),current=isCurrent($div),children=hasChildren($div),expanded=children&&current,chevron;if(expanded===!0&&$div.attr(childrenLoadedAttr,"true"),current===!0&&(currentHref=$div.children("a").last().attr("href"),insertedIndex++),chevron=buildChevron(expanded,children),$link.before(chevron),current===!0&&children===!1&&updateParentChevronForLeafNode($div,level),insertedIndex==1&&!current&&level<=1&&insertedIndex++,insertedIndex>1)return!1;insertedIndex==1&&!current&&level>1?$div.appendTo($childrenSection):$div.appendTo($sections[insertedIndex]);current===!0&&$childrenSection.appendTo($sections[insertedIndex])}function hideTooManyFirstLevelSiblings(div){if($siblings=$(div).find("div[data-toclevel]"),$siblings.size()>3){$hideArea=$(div).find("div#tocExpand")[0];$expandArea=$(div).find("div#tocExpandArea")[0];for(var i=0;i<$siblings.size()-3;i++)$($siblings[i]).appendTo($hideArea);$($expandArea).show()}}function initLocalizeString(){expandNodeTooltip=$("#ExpandLocalizeString").text().trim();collapseNodeTooltip=$("#CollapseLocalizeString").text().trim()}function updateParentChevronForLeafNode($div,level){var $parent=$div.parent().children("div["+levelAttr+'="'+(level-1)+'"]').last(),parentChevron=buildChevron(!0,!0);$parent.children().length>0&&($parent.children().first().replaceWith(parentChevron),$parent.attr(childrenLoadedAttr,"true"))}function updateIfHighContrastMode(){function updateForHighContrastMode($element,html){$element.html(html).css({width:"auto",height:"auto","margin-top":"0px"})}var $firstChevron=$("a.toc_expanded:first"),$banner;if($firstChevron){switch($firstChevron.css("background-image")){case"":case"none":break;default:return}$("a.toc_expanded").each(function(){updateForHighContrastMode($(this),"-")});$("a.toc_collapsed").each(function(){updateForHighContrastMode($(this),"+")});$("span.toc_empty").each(function(){updateForHighContrastMode($(this),"●")});$banner=$("#tn_header > div.upperBand > a:first");$banner&&$banner.html($banner.attr("title"))}}function expandClick($chevron){var $div=$chevron.parent(),expandingLevel=getLevel($div),$nextTocPaddingDiv;return($chevron.attr("class","toc_collapsed"),updateAriaLabel($chevron),$nextTocPaddingDiv=$div.next(),!$nextTocPaddingDiv.hasClass("tocPadding"))?!1:($nextTocPaddingDiv.addClass("hidden"),appInsightLog("TocCollapseCount",{tocHref:$chevron.siblings().first().attr("href")}),!1)}function expandTocSiblingsClick(){$("div#tocExpandArea").hide();$("div#tocExpand").show()}function buildTocHref(baseHref){return baseHref==undefined||baseHref==null?null:baseHref.indexOf("?")===-1?baseHref+"?toc=1":baseHref+"&toc=1"}function buildChevron(expanded,children){var cssClass="toc_empty";return children===!0?(cssClass=expanded===!0?"toc_expanded":"toc_collapsed",chevronFormat.replace("{class}",cssClass)):emptyFormat.replace("{class}",cssClass)}function buildNode(href,title,level,expanded,children,childCountId){var isHrefEmpty=href==null,chevron=buildChevron(expanded,isHrefEmpty?!1:children),nodeTagString;return isHrefEmpty?nodeTagString=nodeSpanTagFormat:(nodeTagString=nodeATagFormat.replace("{href}",href),nodeTagString=nodeTagString.replace("{childCountIdAttribute}",childCountId!=null?'id="'+childCountId+'" ':"")),nodeFormat.replace("{level}",level).replace("{chevron}",chevron).replace("{nodeTag}",nodeTagString.replace(/{text}/gi,window.epx.utilities.htmlEncode(title)))}function getChevron($div){return $div.children().first()}function getLevel($div){return parseInt($div.attr(levelAttr))}function isCurrent($div){return $div.hasClass("current")}function hasChildren($div){return getChevron($div).attr(hasSubTreeAttr)==="true"}function subscribeTocLinkClick(){var href=$(this).attr("href");return appInsightLog("TocLinkClickCount",{tocHref:href}),setTimeout(function(){location.href=href},300),!1}function updateAriaLabel(object){object==null?($("a.toc_expanded").each(function(){updateAriaLabel($(this))}),$("a.toc_collapsed").each(function(){updateAriaLabel($(this))})):object.is("a")?(object.hasClass("toc_collapsed")&&object.attr("aria-label",expandNodeTooltip),object.hasClass("toc_expanded")&&object.attr("aria-label",collapseNodeTooltip)):(object.find("a.toc_expanded").each(function(){updateAriaLabel($(this))}),object.find("a.toc_collapsed").each(function(){updateAriaLabel($(this))}))}function appInsightLog(eventName,eventValue){window.appInsights&&appInsights.logEvent(eventName,eventValue)}function hideToc(){$("#tocMenuTogglerIcon").attr("class","tocMenuExpanded");$("#tocnav .tocselected, #tocnav .tocunselected").css("min-width",$("#tocnav .tocselected").width());$("#leftNav").parent().addClass("bodyTocMenuCollapsed")}function showToc(){$("#tocMenuTogglerIcon").attr("class","tocMenuCollapse");$("#leftNav").parent().removeClass("bodyTocMenuCollapsed")}var levelAttr="data-toclevel",childrenLoadedAttr="data-childrenloaded",hasSubTreeAttr="data-tochassubtree",chevronFormat='<a class="{class}" href="#" />',emptyFormat='<span class="{class}" />',nodeFormat='<div class="toclevel" '+levelAttr+'="{level}">{chevron}{nodeTag}<\/div>',nodeATagFormat='<a {childCountIdAttribute}href="{href}" title="{text}">{text}<\/a>',nodeSpanTagFormat='<span class="emptyHref">{text}<\/span>',nodePaddingFormat='<div class="tocPadding"><\/div>',insertedIndex=0,currentHref="",expandNodeTooltip="",collapseNodeTooltip="";return{init:init,initNode:initNode,expandClick:expandClick,buildTocHref:buildTocHref,buildChevron:buildChevron,buildNode:buildNode,getChevron:getChevron,getLevel:getLevel,isCurrent:isCurrent,hasChildren:hasChildren}}();$(document).ready(function(){epx.library.toc.init()});;
(function(){var extractMetaFromAmbientContext=function($){var key,content;if(AmbientContext!=null)for(key in AmbientContext)AmbientContext.hasOwnProperty(key)&&(content=AmbientContext[key],AmbientContext[key]&&typeof AmbientContext[key]=="object"&&(content=JSON.stringify(AmbientContext[key])),$("head").append('<meta name="ms.'+key.replace(".","_")+'" content="'+escape(content)+'" />'))};window.hasOwnProperty("AmbientContext")&&(typeof define=="function"&&window.mtpsAmd?define("ABTest",["jquery"],function($){extractMetaFromAmbientContext($)}):extractMetaFromAmbientContext($))})();;
window.pmc = window.pmc || {};
window.pmc.debugConsoleLogEnabled = false;
window.pmc.debugLogMsgs = [];
window.pmc.debugLog = function (inMsg) {
    window.pmc.debugLogMsgs.push(inMsg);
    if (window.pmc.debugConsoleLogEnabled) {
        console.log(inMsg);
    }
};
window.pmc.formatString = function (inValue) {
    var newStr;
    if (typeof inValue == "undefined") {
        return "";
    } else if (typeof inValue == "string") {
        newStr = inValue.toLowerCase().trim();
    } else {
        newStr = inValue.toString().toLowerCase().trim();
    }
    newStr = newStr.replace(/"/g, "'");
    return newStr;
};
window.pmc.passScriptCheck = function (inText) {
    if (typeof inText != "undefined") {
        if (inText.match(/<script/i)) {
            window.pmc.debugLog("passScriptCheck failed");
            return false;
        }
    }
    return true;
};
window.pmc.setAttribute = function (inJQObj, inAttrName, inAttrValue) {
    if (typeof inJQObj == "undefined" || inJQObj.length === 0 || !inAttrName || inAttrValue === "") {
        return;
    }
    inJQObj.attr(inAttrName, inAttrValue);
};
window.pmc.getMetaTagContent = function (inMTName) {
    try {
        var myMTContent = jQuery("meta[name=\'" + inMTName + "\']");
        if (myMTContent.length > 0) {
            myMTContent = myMTContent[myMTContent.length - 1].content;
        } else {
            myMTContent = null;
        }
        return myMTContent;
    } catch (e) {
        return null;
    }
};
window.pmc.setMetaTagContent = function (inMTName, inMTContent) {
    if (!inMTContent) {
        return;
    } else if (window.pmc.getMetaTagContent(inMTName) === null) {
        var myMetaTag = document.createElement("meta");
        myMetaTag.name = inMTName;
        myMetaTag.content = inMTContent;
        if (window.pmc.passScriptCheck(myMetaTag.content)) {

            document.getElementsByTagName("head")[0].appendChild(myMetaTag);
        }
    } else {
        jQuery("meta[name=\'" + inMTName + "\']").attr("content", inMTContent);
    }
};
window.pmc.checkMetaTags = function (name, val) {
    //using javascript due to some sections having old versions of jquery
    var metaTag = document.querySelector('meta[name="' + name + '"]');
    if (!metaTag) {
        window.pmc.setMetaTagContent(name, val);
    }
};
window.pmc.webtrendsCheck = function (name, val, alt) {
    var reg = new RegExp(name, 'i');
    jQuery("meta").each(function () {
        var jqName = jQuery(this).attr("name");
        if (jqName) {
            if (jQuery(this).attr("name").match(reg)) {
                var wtContent = jQuery(this).attr("content");
                wtContent = wtContent.replace(/_/g, "");
                window.pmc.setMetaTagContent(val, wtContent); //assign wt content to wedecs variable
            } else {  //webtrends variable does not exist on the page
                if (alt) {
                    window.pmc.setMetaTagContent(val, alt);
                }
            }
        }
    });
};
window.pmc.webtrendsLangLocCheck = function (msLang, msLoc) {
    var checkText = "DCSext.WClocale";
    var reg = new RegExp(checkText, 'i');
    var allMetas = document.querySelectorAll("meta");
    for (var i = 0; i < allMetas.length; i++) {
        if (allMetas[i].name.search(reg) > -1) {
            //webtrends variable exists
            //this function is specific to windows/ pages pertaining to lang and loc
            var wtContent = allMetas[i].content;
            wtContent = wtContent.replace(/_/g, "");
            wtLang = wtContent.split("-")[0];
            wtLoc = wtContent.split("-")[1];
            window.pmc.setMetaTagContent(msLang, wtLang); //assign wt content to wedecs variable
            window.pmc.setMetaTagContent(msLoc, wtLoc); //assign wt content to wedecs variable
            break;
        }
    }
};
window.pmc.pageLoad = function () {
    window.pmc.libraryTaggingEnabled = false;
    var pageURL = window.location.hostname + window.location.pathname;
    //apply common non-site section specific values to only technet hosted pages
    if (window.location.hostname.match(/technet\.microsoft\.com/i) ||
      window.location.hostname.match(/technet\.com/i) ||
      window.location.hostname.match(/^technetappsmain\./i) || //search and forums pre-prod
      window.location.hostname.match(/^tngmain\./i) || //galleries pre-prod
      window.location.hostname.match(/^techblogsrc\./i)) { //blogs pre-prod
        //Environment
        if (window.location.hostname.match(/^int\./) ||
          window.location.hostname.match(/^technetappsmain\./i) || //search and forums pre-prod
          window.location.hostname.match(/^tngmain\./i) || //galleries pre-prod
          window.location.hostname.match(/^techblogsrc\./i)) { //blogs pre-prod
            window.pmc.checkMetaTags("ms.env", "staging");
        } else {
            window.pmc.checkMetaTags("ms.env", "production");
        }
        //language/location
        var lang, loc;
        var langLoc = window.location.pathname.match(/\/..-..\//);
        if (langLoc) {
            var grabbed_langLoc = langLoc[0];
            var grabbed_lang = grabbed_langLoc.split("-")[0];
            var grabbed_loc = grabbed_langLoc.split("-")[1];
            lang = grabbed_lang.replace("/", "");
            loc = grabbed_loc.replace("/", "");
            window.pmc.checkMetaTags("ms.lang", lang);
            window.pmc.checkMetaTags("ms.loc", loc);
        } else {
            //due to not having a consistent presence of lang/loc in the url, we user navigation.language
            var userLang = navigator.language || navigator.userLanguage;
            lang = userLang.split("-")[0];
            loc = userLang.split("-")[1];
            window.pmc.checkMetaTags("ms.lang", lang);
            window.pmc.checkMetaTags("ms.loc", loc);
        }
        //get html title element to eventually pass into ms.title
        window.pmc.pageTitle = window.pmc.formatString(jQuery(document).find("title").text());
        //truncate substring of the title
        window.pmc.pageTitle = window.pmc.pageTitle.substring(0, 100);
        if (pageURL.match(/technet\.microsoft\.com(\/..-..)?\/library/i)) {  //library (TECHNET LIBRARY ONLY)
            window.pmc.checkMetaTags("ms.sitesec", "library");
            window.pmc.msTitle = "library;" + window.pmc.pageTitle;
            //webtrends mapping to WEDCS; windows specific content in Library
            window.pmc.webtrendsCheck("DCSext.WCarea", "ms.sitesec");
            window.pmc.webtrendsLangLocCheck("ms.lang", "ms.loc");
            window.pmc.webtrendsCheck("DCSext.Wclifecycle", "ms.mktglfcyl");
            window.pmc.webtrendsCheck("DCSext.WCversion", "ms.prod");
            window.pmc.webtrendsCheck("DCSext.WCzone", "ms.pagetype");
            window.pmc.libraryTaggingEnabled = true;
        } else if (pageURL.match(/social\.technet\.microsoft\.com\/wiki/i)) { //wiki
            window.pmc.checkMetaTags("ms.sitesec", "wiki");
            window.pmc.msTitle = "wiki;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com(\/..-..)?\/bb291022/i) || pageURL.match(/technet\.microsoft\.com(\/..-..)?\/dd644554/i) || pageURL.match(/technet\.microsoft\.com(\/..-..)?\/cc138021/i) || pageURL.match(/technet\.microsoft\.com(\/..-..)?\/ff871920/i)) { //Learn has all shortened links
            window.pmc.checkMetaTags("ms.sitesec", "learn");
            window.pmc.msTitle = "learn;" + window.pmc.pageTitle;
        } else if (pageURL.match(/gallery\.technet\.microsoft/i)) { //gallery
            window.pmc.checkMetaTags("ms.sitesec", "gallery");
            window.pmc.msTitle = "gallery;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com(\/..-..)?\/bb403698/i)) {  //downloads
            window.pmc.checkMetaTags("ms.sitesec", "downloads");
            window.pmc.msTitle = "downloads;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com(\/..-..)?\/ms772425/i)) {  //support
            window.pmc.checkMetaTags("ms.sitesec", "support");
            window.pmc.msTitle = "support;" + window.pmc.pageTitle;
        } else if (pageURL.match(/social\.technet\.microsoft.com\/forums/i)) {  //forums
            window.pmc.checkMetaTags("ms.sitesec", "forums");
            window.pmc.msTitle = "forums;" + window.pmc.pageTitle;
        } else if (pageURL.match(/blogs\.technet\.com/i) || window.location.hostname.match(/^techblogsrc\./i)) { //blogs
            window.pmc.checkMetaTags("ms.sitesec", "blogs");
            window.pmc.msTitle = "blogs;" + window.pmc.pageTitle;
        } else if (pageURL.match(/social\.technet\.microsoft\.com\/search\//i)) {  //search
            window.pmc.checkMetaTags("ms.sitesec", "search");
            window.pmc.msTitle = "search;" + window.pmc.pageTitle;
            //apply search query on load using ms.searchquery
            var queryString = window.location.search;
            if (queryString.match(/query=/i)) {
                var titleToSearch = window.pmc.msTitle.split(" - microsoft technet search")[0];
                var removedSec = titleToSearch.split(";")[1];
                window.pmc.checkMetaTags("ms.searchquery", removedSec);
            }
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/windows/i)) {  //windows
            window.pmc.msTitle = "windows;" + window.pmc.pageTitle;
            //webtrends variable mapping process
            window.pmc.webtrendsCheck("DCSext.WCarea", "ms.sitesec", "windows");
            window.pmc.webtrendsLangLocCheck("ms.lang", "ms.loc");
            window.pmc.webtrendsCheck("DCSext.Wclifecycle", "ms.mktglfcyl");
            window.pmc.webtrendsCheck("DCSext.WCversion", "ms.prod");
            window.pmc.webtrendsCheck("DCSext.WCzone", "ms.pagetype");
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/ie/i)) { //internet explorer
            window.pmc.checkMetaTags("ms.sitesec", "internet explorer");
            window.pmc.msTitle = "internet explorer;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/sqlserver/i)) {  //sql server
            window.pmc.checkMetaTags("ms.sitesec", "sql server");
            window.pmc.msTitle = "sql server;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/scriptcenter\//i)) {  //script center
            window.pmc.checkMetaTags("ms.sitesec", "script center");
            window.pmc.msTitle = "script center;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/office/i)) { //office
            window.pmc.checkMetaTags("ms.sitesec", "office");
            window.pmc.msTitle = "office;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/office\/dn788774/i)) { //office 365
            window.pmc.checkMetaTags("ms.sitesec", "office");
            window.pmc.msTitle = "office 365;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/office\/dn788775/i)) { //exchange server
            window.pmc.checkMetaTags("ms.sitesec", "office");
            window.pmc.msTitle = "exchange server;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/office\/dn788776/i)) { //sharepoint products
            window.pmc.checkMetaTags("ms.sitesec", "office");
            window.pmc.msTitle = "sharepoint products;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/office\/dn788773/i)) { //lync
            window.pmc.checkMetaTags("ms.sitesec", "office");
            window.pmc.msTitle = "lync;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/office\/dn788954/i)) { //lync downloads and updates
            window.pmc.checkMetaTags("ms.sitesec", "office");
            window.pmc.msTitle = "lync;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/office\/dn788774/i)) { //office 365 for IT Pros
            window.pmc.checkMetaTags("ms.sitesec", "office");
            window.pmc.msTitle = "office 365 for it pros;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/office\/fp160948/i)) { //office for IT pros
            window.pmc.checkMetaTags("ms.sitesec", "office");
            window.pmc.msTitle = "office for it pros;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/office\/dn788776/i)) { //sharepoint for IT pros
            window.pmc.checkMetaTags("ms.sitesec", "office");
            window.pmc.msTitle = "sharepoint for it pros;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/office\/dn788775/i)) { //exchange for IT pros
            window.pmc.checkMetaTags("ms.sitesec", "office");
            window.pmc.msTitle = "exchange for it pros;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/office\/dn788773/i)) { //Lync server for IT pros
            window.pmc.checkMetaTags("ms.sitesec", "office");
            window.pmc.msTitle = "lync server for it pros;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/office\/dn788778/i)) { //Project server for IT pros
            window.pmc.checkMetaTags("ms.sitesec", "office");
            window.pmc.msTitle = "project server for it pros;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/..-..\/office\/dn770220/i)) { //support for Office products
            window.pmc.checkMetaTags("ms.sitesec", "office");
            window.pmc.msTitle = "support for office products;" + window.pmc.pageTitle;
        } else if (pageURL.match(/technet\.microsoft\.com\/((..-..)?\/?(((default)(\.aspx)?)?|(ms\d+(\.aspx)?)?))$/i) || pageURL.match(/technet\.microsoft\.com\/..-..\/.*$/i)) { //home page
            window.pmc.checkMetaTags("ms.sitesec", "home");
            window.pmc.msTitle = "home;" + window.pmc.pageTitle;
        }
        //universal checkMetaTags for ms.title
        window.pmc.checkMetaTags("ms.title", window.pmc.msTitle);
    }
};
window.pmc.setAttribute = function (inJQObj, inAttrName, inAttrValue) {
    if (typeof inJQObj == "undefined" || inJQObj.length === 0 || !inAttrName || inAttrValue === "") {
        return;
    }
    inJQObj.attr(inAttrName, inAttrValue);
};
window.pmc.wedcsUCTracking = [];
window.pmc.currUC = "";
window.pmc.setWEDCSAttributes = function (inJQObj, inCmpgrp, inCmpnm, inIndex) {
    var newUCTLen = window.pmc.wedcsUCTracking.push(window.pmc.currUC);
    window.pmc.setAttribute(inJQObj, "data-pmcucidx", (newUCTLen - 1));
    window.pmc.setAttribute(inJQObj, "ms.cmpgrp", inCmpgrp);
    window.pmc.setAttribute(inJQObj, "ms.cmpnm", inCmpnm);
    window.pmc.setAttribute(inJQObj, "ms.index", inIndex);

};
window.pmc.processWEDCSCustomEventFromArray = function (inArray) {
    if (typeof window.MscomCustomEvent != "function") {
        return;
    }
    if (typeof inArray == "undefined" || inArray === null || inArray.length === 0) {
        window.MscomCustomEvent();
        return;
    }
    window.MscomCustomEvent.apply(this, inArray);
};
window.pmc.processWEDCSCustomEventFromJQObj = function (inJQObj) {
    if (typeof inJQObj == "undefined" || inJQObj === null || inJQObj.length === 0) {
        window.pmc.processWEDCSCustomEventFromArray();
        return;
    }
    var myWEDCDAttrArray = [];
    jQuery(inJQObj[0].attributes).each(function () {
        if (this.nodeName && this.nodeName.indexOf("ms.") === 0) {
            myWEDCDAttrArray.push(this.nodeName, this.nodeValue);
        }
    });
    window.pmc.processWEDCSCustomEventFromArray(myWEDCDAttrArray);
};
window.pmc.cleanSearchQuery = function (searchVal) {
    var cleanedQuery;
    cleanedQuery = searchVal.replace(/(<([^>]+)>)/ig, "");
    cleanedQuery = searchVal.replace(/"/g, "'");
    cleanedQuery = searchVal.replace(/&/g, "+");
    return cleanedQuery;
};
window.pmc.tagForSearch = function () {
    //apply common non-site section specific search values to only technet hosted pages
    if (window.location.hostname.match(/technet\.microsoft\.com/i) ||
      window.location.hostname.match(/technet\.com/i) ||
      window.location.hostname.match(/^technetappsmain\./i) || //search and forums pre-prod
      window.location.hostname.match(/^tngmain\./i) || //galleries pre-prod
      window.location.hostname.match(/^techblogsrc\./i)) { //blogs pre-prod
        //Tag search boxes across all of technet
        var cleanedQuery;
        //bing search at top of page
        window.pmc.currUC = "Bing Searchbox; top of page";
        jQuery("button#HeaderSearchButton").mousedown(function () {
            try {
                var searchVal = window.pmc.formatString(jQuery("#HeaderSearchTextBox").val());
                cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                window.pmc.setAttribute(jQuery(this), "ms.searchquery", cleanedQuery);
                window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
            } catch (e) { }
        });
        jQuery("input#HeaderSearchButton").mousedown(function () {
            try {
                var searchVal = window.pmc.formatString(jQuery("#HeaderSearchTextBox").val());
                cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                window.pmc.setAttribute(jQuery(this), "ms.searchquery", cleanedQuery);
            } catch (e) { }
        });
        //case for wiki
        window.pmc.currUC = "Bing Searchbox; top of page on wiki sections";
        jQuery("#Header_SearchButton").mousedown(function () {
            try {
                var searchVal = window.pmc.formatString(jQuery("#Header_SearchTextBox").val());
                cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                window.pmc.setAttribute(jQuery(this), "ms.searchquery", cleanedQuery);
            } catch (e) { }
        });
        //case for wiki
        jQuery("input#Header_SearchTextBox").keydown(function (event) {
            if (event.which == 13) {
                try {
                    var searchVal = window.pmc.formatString(jQuery("#Header_SearchTextBox").val());
                    cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                    window.pmc.setAttribute(jQuery(this), "ms.searchquery", cleanedQuery);
                    window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                } catch (e) { }
            }
        });
        window.pmc.currUC = "Bing small Searchbox; top center of page";
        jQuery("#SearchButton").mousedown(function () {
            try {
                var searchVal = window.pmc.formatString(jQuery("#SearchTextBox").val());
                cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                window.pmc.setAttribute(jQuery(this), "ms.searchquery", cleanedQuery);
            } catch (e) { }
        });
        //When user presses the enter key to submit search query
        jQuery("#HeaderSearchTextBox").keydown(function (event) {
            if (event.which == 13) {
                try {
                    var searchVal = window.pmc.formatString(jQuery("#HeaderSearchTextBox").val());
                    cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                    window.pmc.setAttribute(jQuery(this), "ms.searchquery", cleanedQuery);
                    window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                } catch (e) { }
            }
        });
        //case for blogs parent page
        jQuery("#HeaderSearchTextBox").off("mousedown").on("mousedown", function () {
            jQuery("#SuggestionContainer ul").off("mousedown").on("mousedown", function () {
                try {
                    var term = window.pmc.formatString(jQuery("input[title*='Search']").val());
                    cleanedQuery = window.pmc.cleanSearchQuery(term);
                    window.pmc.setAttribute(jQuery(this), "ms.searchquery", cleanedQuery);
                    window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                } catch (e) { }
            });
        });
        //search box in search section & blogs sub pages
        jQuery("#SuggestionContainer ul").off("mousedown").on("mousedown", function () {
            try {
                var term = "";
                if (window.location.hostname.match(/blogs\.technet\.com/i) || window.location.hostname.match(/^techblogsrc\./i)) {
                    term = window.pmc.formatString(jQuery("input[title*='Search']:visible").val());
                } else {
                    term = window.pmc.formatString(jQuery("input[title*='Search']").val());
                }
                cleanedQuery = window.pmc.cleanSearchQuery(term);
                window.pmc.setAttribute(jQuery(this), "ms.searchquery", cleanedQuery);
                if (window.location.pathname.match(/\/search\//i)) {
                    window.pmc.setMetaTagContent("ms.searchquery", cleanedQuery);
                    window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                } else {
                    window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                }
            } catch (e) { }
        });
        //searchbox and button on search page
        jQuery("#SearchTextBox").on("input", function () {
            try {
                var searchText = jQuery(this).val();
                cleanedQuery = window.pmc.cleanSearchQuery(searchText);
                jQuery(this).attr("ms.searchquery", cleanedQuery);
                jQuery("a#SearchSubmitImage").attr("ms.searchquery", cleanedQuery);
            } catch (e) { }
        });
        jQuery("#SearchSubmitImage").on("mousedown", function () {
            try {
                var searchVal = window.pmc.formatString(jQuery("#SearchTextBox").val());
                cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                window.pmc.setAttribute(jQuery(this), "ms.searchquery", cleanedQuery);
                if (window.location.pathname.match(/\/search\//i)) {
                    window.pmc.setMetaTagContent("ms.searchquery", cleanedQuery);
                }
            } catch (e) { }
        });
        //button on blogs
        jQuery("input.search-button[title*='Search TechNet with Bing']").mousedown(function () {
            try {
                var term = "";
                if (window.location.hostname.match(/blogs\.technet\.com/i) || window.location.hostname.match(/^techblogsrc\./i)) {
                    term = window.pmc.formatString(jQuery("input[title*='Search']:visible").val());
                } else {
                    term = window.pmc.formatString(jQuery("input[name*='SearchTextBox']").val());
                }
                cleanedQuery = window.pmc.cleanSearchQuery(term);
                window.pmc.setAttribute(jQuery(this), "ms.searchquery", cleanedQuery);
                if (window.location.pathname.match(/\/search\//i)) {
                    window.pmc.setMetaTagContent("ms.searchquery", cleanedQuery);
                }
            } catch (e) { }
        });
        //on enter in search box
        jQuery("input[name*='SearchTextBox']").on("keydown", function (event) {
            try {
                //13 equals enter key on keyboard
                if (event.which == 13) {
                    var searchVal = window.pmc.formatString(jQuery(this).val());
                    cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                    window.pmc.setAttribute(jQuery(this), "ms.searchquery", cleanedQuery);
                    if (window.location.pathname.match(/\/search\//i)) {
                        window.pmc.setMetaTagContent("ms.searchquery", cleanedQuery);
                        window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                    } else {
                        window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                    }
                }
            } catch (e) { }
        });
    }
};
window.pmc.tagLeftNav = function () {
    //apply library section specific custom values to only technet hosted pages
    if (window.location.hostname.match(/technet\.microsoft\.com/i) || window.location.hostname.match(/technet\.com/i) || window.location.hostname.match(/^technetappsmain\./i) || window.location.hostname.match(/^tngmain\./i)) {
        var tCmpGrp = "";
        var tCmpNm = "";
        //left nav panel
        window.pmc.navIndex = "0";
        var currentLevel, prevLevel, prevCmpNmLevel, splitCmpNmLevel;
        window.pmc.currUC = "Left nav dropdown items";
        jQuery('#leftNav div[data-toclevel] a:not([class*="toc_"]):not([data-pmcucidx])').each(function () {
            var parentDropText = window.pmc.formatString(jQuery(this).closest('div[data-toclevel]').prevAll('.toclevel1:first').find("a:not([href='#'])").text());
            var levelNum = parseInt(jQuery(this).closest('div[data-toclevel]').attr("data-toclevel"), 10);
            //special cases for parent dropdowns
            if (levelNum === 0 || levelNum === 1) {
                parentDropText = window.pmc.formatString(jQuery(this).text());
            } else if (levelNum === -1) {
                levelNum = 0;
                parentDropText = window.pmc.formatString(jQuery(this).text());
            }
            tCmpNm = parentDropText + ';' + levelNum;
            currentLevel = jQuery(this).closest("div").attr("data-toclevel");
            prevLevel = jQuery(this).closest("div").prev().attr("data-toclevel");
            window.pmc.setWEDCSAttributes(jQuery(this), "table of contents", tCmpNm);
            try {
                if (currentLevel !== prevLevel) {
                    //new dropdown list item
                    window.pmc.navIndex = "0";
                    window.pmc.setAttribute(jQuery(this), "ms.index", window.pmc.navIndex);
                } else {
                    window.pmc.navIndex++;
                    window.pmc.setAttribute(jQuery(this), "ms.index", window.pmc.navIndex);
                }
            } catch (e) { }
        });
    }
};
window.pmc.tagElements = function () {
    //Temporary variables
    var tCmpGrp = "";
    var tCmpNm = "";
    var sideNavCounter = 0;
    var cmpnmCheck = "";
    window.pmc.tagLeftNav();
    //In this library; library home page
    window.pmc.currUC = "body directory links";
    jQuery("#content .navpage ul li a").each(function (index) {
        tCmpNm = jQuery(this).closest("ul").prev().text();
        if (tCmpNm === "\xA0") {
            tCmpNm = jQuery(this).closest("ul").prev().parent().prev().children(":header").text();
        }
        tCmpNm = window.pmc.formatString(tCmpNm);
        tCmpGrp = window.pmc.formatString(jQuery(this).closest(".navpage").find(":header:first").text());
        window.pmc.setWEDCSAttributes(jQuery(this), tCmpGrp, tCmpNm, index);
    });
    //See also links
    window.pmc.currUC = "alternative see also directory links";
    jQuery(".navpage div[style*='float'] a:not([data-pmcucidx])").each(function (index) {  //careful! style may change over time
        tCmpNm = window.pmc.formatString(jQuery(this).closest("ul").prev().text());
        if (tCmpNm === "") {
            tCmpNm = window.pmc.formatString(jQuery(this).closest(".navpage").find("div[style*='clear:both']:first").next().text());
            tCmpNm = tCmpNm.replace(":", "");
        }
        tCmpGrp = window.pmc.formatString(jQuery(this).closest(".navpage").find(":header:first").text());
        window.pmc.setWEDCSAttributes(jQuery(this), tCmpGrp, tCmpNm, index);
    });
    window.pmc.verbatim = "";
    //update the verbatim variable to ensure transfer of data when the submit button is clicked
    jQuery(".feedbackContainer textarea").on("input", function () {
        try {
            window.pmc.verbatim = jQuery(this).val().substring(0, 500).replace(/(<([^>]+)>)/ig, "").replace(/"/g, "'").replace(/&/g, "+");
        } catch (e) { }
    });
    //Submit button in feedback section
    jQuery(".feedbackContainer #feedbackSubmit").on("mousedown", function () {
        try {
            var jqFsButton = jQuery(this);
            //survey
            window.pmc.setAttribute(jqFsButton, "ms.srv_id", "was this page helpful?");
            //survey 
            window.pmc.setAttribute(jqFsButton, "ms.scnum", "feedbackform");
            //set cmpgrp, cmpnm, index
            tCmpNm = window.pmc.formatString(jQuery("#feedbackSection1").children(".left:first").text());
            window.pmc.setWEDCSAttributes(jqFsButton, "user feedback", tCmpNm, "0");
            //radio button feedback
            window.pmc.radioChoice = (jQuery(".feedbackContainer input[type=radio]:checked").attr("id") === "feedbackYes" ? "yes" : "no");
            //get checkbox feedback
            window.pmc.checkText = "";
            var tCBid = "";
            jQuery('.feedbackContainer input[name*="chkbxNo"]:checked').each(function () {
                tCBid = jQuery(this).attr("id");
                if (tCBid === "checkboxNo201") {
                    window.pmc.checkText += "not accurate|";
                } else if (tCBid === "checkboxNo202") {
                    window.pmc.checkText += "not enough depth|";
                } else if (tCBid === "checkboxNo203") {
                    window.pmc.checkText += "need more code examples|";
                } else if (tCBid === "checkboxNo204") {
                    window.pmc.checkText += "the translation needs improvement|";
                }
            });
            //Set ms.srv_resp to combination of radio and checkbox user choices
            var srv_resp = window.pmc.radioChoice;
            if (window.pmc.checkText.length > 0 && window.pmc.radioChoice === "no") {
                //checkbox value(s) were chosen
                //take off trailing pipe character from window.pmc.checkText
                srv_resp += ";" + window.pmc.checkText.substring(0, window.pmc.checkText.length - 1);
            }
            window.pmc.setAttribute(jqFsButton, "ms.srv_resp", srv_resp);
            if (window.pmc.verbatim === "") {
                window.pmc.verbatim = "no comment";
            }
            window.pmc.setAttribute(jqFsButton, "ms.srv_v", window.pmc.verbatim);
            window.pmc.processWEDCSCustomEventFromJQObj(jqFsButton);
        } catch (e) { }
    });
};
window.pmc.callMSJS = function () {
    window.pmc.pageLoad();
    //WEDCS base settings
    window.varClickTracking = 1;
    window.varCustomerTracking = 0;
    window.varAutoFirePV = 1;
    window.route = "";
    window.ctrl = "";
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = window.location.protocol + "//c.microsoft.com/ms.js";
    script.onload = function () {
        if (window.location.hostname.match(/msdn\.microsoft\.com/i) || window.location.hostname.match(/msdnapps/i)) {  //msdn search only
            window.pmc.setupScrollTracking();
            window.pmc.readLanguageSwitcher();
            if (window.location.pathname.match(/\/search/i)) {
                window.pmc.runRefinementCode();
            }
        }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
    //tag search textboxes and buttons
    window.pmc.tagForSearch();
    //tag for click events
    if (window.pmc.libraryTaggingEnabled) {
        window.pmc.tagElements();
    }
    //AJAX Listener
    jQuery(document).ajaxComplete(function () {
        if (window.pmc.libraryTaggingEnabled) {
            window.pmc.tagLeftNav();
        }
    });
};
//SCROLL TRACKING
//Scroll Area definition
window.pmc.scrollArea = function (inName) {
    this.name = inName;
    this.scrollNA = false;
    this.scrollQuarter = false;
    this.scrollHalf = false;
    this.scrollThreeQuarter = false;
    this.scrollBot = false;
};
//Track multiple scroll areas per page
window.pmc.currScrollArea = null;
window.pmc.scrollAreaList = [];
window.pmc.setCurrScrollArea = function (inIndex) {
    if (typeof inIndex != "number") {
        return;
    } else if (window.pmc.scrollAreaList.length <= inIndex) {
        return;
    }
    window.pmc.currScrollArea = window.pmc.scrollAreaList[inIndex];
};
//Page dimension variables
window.pmc.scrollBottomElement = null;
window.pmc.scrollPageHeight = -1;
window.pmc.viewportBottom = -1;
window.pmc.refreshScrollPageDimVars = function () {
    var tBottom = 0;
    if (window.pmc.scrollBottomElement) {
        tBottom = window.pmc.scrollBottomElement.getBoundingClientRect().top + window.pageYOffset;
    }
    if (tBottom <= 0) {
        tBottom = document.body.getBoundingClientRect().height;
    }
    window.pmc.scrollPageHeight = tBottom;
    window.pmc.viewportBottom = window.pageYOffset + window.innerHeight;
};
window.pmc.suppressMobileEvents = false;
window.pmc.fireScrollEvent = function (inScrollValue) {
    window.pmc.debugLog("stepped inside fireScrollEvent function");
    var tArray = [];
    tArray.push("ms.pgarea", "body");
    tArray.push("ms.scnum", "scroll-" + inScrollValue);
    tArray.push("ms.interactiontype", "4");
    tArray.push("ms.scn", "scroll");
    window.pmc.processWEDCSCustomEventFromArray(tArray);
};
window.pmc.checkForNAScroll = function () {
    window.pmc.refreshScrollPageDimVars();
    if (window.pmc.scrollPageHeight <= 0) {
        return;
    } else if (window.pmc.suppressMobileEvents && window.innerWidth <= 510) {
        return;
    }
    if (window.innerHeight > window.pmc.scrollPageHeight * 0.90) {
        //Visitor can see the whole page, fire special -na event
        window.pmc.debugLog("calling n/a scroll event");
        window.pmc.currScrollArea.scrollNA = true;
        window.pmc.fireScrollEvent("na");
    } else {
        window.pmc.debugLog("calling 0 percent scroll");
        window.pmc.fireScrollEvent("0%");
    }
};
window.pmc.processScroll = function () {
    window.clearTimeout(window.pmc.scrollResizeTimer);
    if (window.pmc.currScrollArea === null) {
        return;
    }
    window.pmc.refreshScrollPageDimVars();
    if (window.pmc.scrollPageHeight <= 0) {
        return;
    } else if (window.pmc.suppressMobileEvents && window.innerWidth <= 510) {
        return;
    }
    if (window.innerHeight > window.pmc.scrollPageHeight * 0.90) {
        //Visitor can see the whole page, fire special -na event
        if (!window.pmc.currScrollArea.scrollNA) {
            window.pmc.currScrollArea.scrollNA = true;
            window.pmc.fireScrollEvent("na");
        }
        return;
    }
    var tCurrPercent = window.pmc.viewportBottom / window.pmc.scrollPageHeight;
    if (tCurrPercent > 0.25 && !window.pmc.currScrollArea.scrollQuarter) {
        window.pmc.currScrollArea.scrollQuarter = true;
        window.pmc.fireScrollEvent("25%");
    }
    if (tCurrPercent > 0.50 && !window.pmc.currScrollArea.scrollHalf) {
        window.pmc.currScrollArea.scrollHalf = true;
        window.pmc.fireScrollEvent("50%");
    }
    if (tCurrPercent > 0.75 && !window.pmc.currScrollArea.scrollThreeQuarter) {
        window.pmc.currScrollArea.scrollThreeQuarter = true;
        window.pmc.fireScrollEvent("75%");
    }
    if (tCurrPercent > 0.99 && !window.pmc.currScrollArea.scrollBot) {
        window.pmc.currScrollArea.scrollBot = true;
        window.pmc.fireScrollEvent("100%");
    }
};
window.pmc.scrollResizeTimer = 0;
window.pmc.setupScrollTracking = function () {
    window.pmc.scrollBottomElement = jQuery("footer:first")[0];
    window.pmc.scrollAreaList.push(new window.pmc.scrollArea("body"));
    window.pmc.setCurrScrollArea(0);
    window.addEventListener("scroll", function () {
        window.pmc.processScroll();
    });
    //Note: resize also catches zoom in/out
    jQuery(window).resize(function () {
        window.clearTimeout(window.pmc.scrollResizeTimer);
        window.pmc.scrollResizeTimer = window.setTimeout(function () {
            window.pmc.processScroll();
        }, 500);
    });
    //fire 0% scroll or n/a scroll depending on window height
    window.pmc.checkForNAScroll();
};
///////////////////////////
//Search Refinements Code//
///////////////////////////
window.pmc.findRefinements = function () {
    window.pmc.refinementTextArray = [];
    window.pmc.urlHashString = window.location.hash;
    window.pmc.urlQueryString = window.location.search;
    var searchQuery, searchHash, refinements;
    if (window.pmc.urlQueryString) {
        try {
            var rIndex = window.pmc.urlQueryString.indexOf("refinement=");
            if (rIndex > -1) {
                var choppedQueryString = window.pmc.urlQueryString.substr(rIndex, window.pmc.urlQueryString.length);
                refinements = choppedQueryString.substr(0, choppedQueryString.indexOf("&"));
                window.pmc.debugLog("search hash before '=' split " + refinements);
                searchQuery = refinements.split("=")[1];
                window.pmc.debugLog("search hash after '=' split " + searchQuery);
            }
            //search in query string for preexisting refinements. "refinement="
            if (searchQuery && searchQuery.length > 0) {
                if (searchQuery.match(/%2C/i)) {
                    window.pmc.debugLog("multiple refinements in refinement query string");
                    searchQuery = searchQuery.split("%2C");
                    for (i = 0; i < searchQuery.length; i++) {
                        try {
                            if (searchQuery[i].match("-")) {
                                //do nothing;in some cases a negative number indicates a refinement was deselected
                            } else {
                                window.pmc.refinementTextArray.push(searchQuery[i]);
                            }
                        } catch (e) {
                            window.pmc.debugLog("error in refinement= -> multiple refinement logic. Message: " + e);
                        }
                    }
                } else {
                    window.pmc.debugLog("one refinement");
                    //only one refinement
                    if (searchQuery.length > 0) {
                        //There is a refinement active. Reason for this extra check is that a user can deselect a refinement and
                        //the "refinementChanges" hash parameter will still be in the url address
                        try {
                            if (searchQuery.match("-")) {
                                //do nothing;in some cases a negative number indicates a refinement was deselected
                            } else {
                                window.pmc.refinementTextArray.push(searchQuery);
                            }
                        } catch (e) {
                            window.pmc.debugLog("error in refinement= -> one refinement logic. Message: " + e);
                        }
                    }
                }
                window.pmc.setMetaTagContent("ms.search_productfilter", window.pmc.refinementTextArray.toString());
            }
        } catch (e) {
            window.pmc.debugLog("Error in query string parsing logic. Error: " + e);
        }
    }
    if (window.pmc.urlHashString) {
        try {
            var rcIndex = window.pmc.urlHashString.indexOf("refinementChanges=");
            if (rcIndex > -1) {
                var choppedHashString = window.pmc.urlHashString.substr(rcIndex, window.pmc.urlHashString.length);
                refinements = choppedHashString.substr(0, choppedHashString.indexOf("&"));
                window.pmc.debugLog("search hash before '=' split " + refinements);
                searchHash = refinements.split("=")[1];
                window.pmc.debugLog("search hash after '=' split " + searchHash);
            }
            //search in hash string for refinements. "refinementChanges="
            if (searchHash && searchHash.length > 0) {
                //There is a refinement active. Reason for this extra check is that a user can deselect a refinement and
                //the "refinementChanges" hash parameter will still be in the url address
                if (searchHash.match(/,/i)) {
                    window.pmc.debugLog("multiple refinements in refinementChanges= hash string");
                    searchHash = searchHash.split(",");
                    for (i = 0; i < searchHash.length; i++) {
                        try {
                            if (searchHash[i].match("-")) {
                                //check against refinements in query string to see if you need to exclude items in refinement array
                                if (String(searchQuery).match(searchHash[i].split("-")[1])) {
                                    window.pmc.debugLog("refinement change matches item in refinement query string");
                                    //remove refinement id from refinementTextArray
                                    window.pmc.refinementTextArray = window.pmc.refinementTextArray.filter(function (val) {
                                        return val != searchHash[i].split("-")[1];
                                    });
                                }
                            } else {
                                window.pmc.refinementTextArray.push(searchHash[i]);
                            }
                        } catch (e) {
                            window.pmc.debugLog("Error in refinementChanges= -> multiple refinement logic. Message: " + e);
                        }
                    }
                } else {
                    window.pmc.debugLog("one refinement");
                    //only one refinement
                    if (searchHash.length > 0) {
                        //There is a refinement active. Reason for this extra check is that a user can deselect a refinement and
                        //the "refinementChanges" hash parameter will still be in the url address
                        try {
                            if (searchHash.match("-")) {
                                var splitHash = searchHash.split("-")[1];
                                //check against refinements in query string to see if you need to exclude items in refinement array
                                if (String(searchQuery).match(splitHash)) {
                                    window.pmc.debugLog("refinement change matches item in refinement query string");
                                    //remove refinement id from refinementTextArray
                                    window.pmc.refinementTextArray = window.pmc.refinementTextArray.filter(function (val) {
                                        return val != splitHash;
                                    });
                                }
                            } else {
                                window.pmc.refinementTextArray.push(searchHash);
                            }
                        } catch (e) {
                            window.pmc.debugLog("Error in refinementChanges= -> one refinement logic. Message: " + e);
                        }
                    }
                }
                window.pmc.setMetaTagContent("ms.search_productfilter", window.pmc.refinementTextArray.toString());
            }
        } catch (e) {
            window.pmc.debugLog("Error found in hash string parsing logic. Error: " + e);
        }
    }
    if (window.pmc.refinementTextArray.length === 0) {
        window.pmc.setMetaTagContent("ms.search_productfilter", "no refinements");
    }
    window.pmc.debugLog("array of all refinement ids in query params " + searchQuery);
    window.pmc.debugLog("array of all refinement ids in hash params " + searchHash);
    window.pmc.debugLog("array of all refinement id values " + window.pmc.refinementTextArray);
};
window.pmc.applyNodeListener = function () {
    var interaction_type, jqthis, tArray = [], limiter = 0;
    jQuery(".RefinementListContainer").on("click", "li", function () {
        try {
            if (limiter === 0) {
                limiter = 1;
                jqthis = jQuery(this).context;
                window.setTimeout(function () {
                    interaction_type = jQuery(jqthis).find("input:first").attr("checked") ? "16" : "17";
                    //find which refinements are active
                    window.pmc.findRefinements();
                    if (window.pmc.refinementTextArray.length > 0) {
                        tArray.push("ms.cmptyp", "checkbox");
                        tArray.push("ms.interactiontype", interaction_type);
                        tArray.push("ms.title", window.pmc.formatString(jQuery(jqthis).closest("li").text()));
                        window.pmc.setMetaTagContent("ms.search_productfilter", window.pmc.refinementTextArray.toString());
                        window.pmc.processWEDCSCustomEventFromArray(tArray);
                        limiter = 0;
                    } else {
                        window.pmc.debugLog("there are no refinements");
                        tArray.push("ms.cmptyp", "checkbox");
                        tArray.push("ms.interactiontype", interaction_type);
                        tArray.push("ms.title", window.pmc.formatString(jQuery(jqthis).text()));
                        window.pmc.setMetaTagContent("ms.search_productfilter", "no refinements");
                        window.pmc.processWEDCSCustomEventFromArray(tArray);
                        limiter = 0;
                    }
                }, 1000);
            }
        } catch (e) {
            window.pmc.debugLog("error in refinement list custom event building. Message: " + e);
        }
    });
    //results in body
    jQuery("#ContentTableCell").on("mousedown", "a.resultTitleLink", function () {
        jqthis = jQuery(jQuery(this).context);
        try {
            jqthis.attr({
                "ms.cmptyp": "text link",
                "ms.interaction_type": "1",
                "ms.title": window.pmc.formatString(jqthis.text())
            });
        } catch (e) {
            window.pmc.debugLog("error in assigning attributes to body result. Message: " + e);
        }
    });
};
window.pmc.runRefinementCode = function () {
    try {
        window.pmc.urlHashString = window.location.hash;
        window.pmc.urlQueryString = window.location.search;
        window.pmc.refinementText = "";
        //check for pre-existing refinements on the page
        if ((window.pmc.urlHashString && window.pmc.urlHashString.match(/refinementChanges=/i)) || (window.pmc.urlQueryString && window.pmc.urlQueryString.match(/refinement=/i))) {
            window.pmc.findRefinements();
        } else {
            window.pmc.setMetaTagContent("ms.search_productfilter", "no refinements");
        }
        //anytime the refinement list refreshes we want to find the refinements active and add click
        //listeners on the new refinement list
        window.pmc.applyNodeListener();
    } catch (e) {
        window.pmc.debugLog("Error found in runRefinementCode function. Error: " + e);
    }
};
////////////////////////////////////
//End MSDN Search Refinements code//
////////////////////////////////////
//assign url query string "query" parameter -> ms.searchquery metatag
window.pmc.assignSearchQuery = function () {
    var urlQueryString = window.location.search;
    if (urlQueryString && urlQueryString.match(/query=/i)) {
        try {
            var queryIndex = urlQueryString.indexOf("query=");
            //everything after query= in the query string
            var tailQS = urlQueryString.substr(queryIndex, urlQueryString.length);
            //get query name & value
            var searchParam = urlQueryString.substr("query=", tailQS.indexOf("&") + 1);
            searchParam = searchParam.split("=")[1];
            window.pmc.setMetaTagContent("ms.searchquery", searchParam);
        } catch (e) {
            window.pmc.debugLog(e + ": error assigning ms.searchquery");
        }
    }
};
////////////////////////////////
//End MSDN ms.searchquery code//
////////////////////////////////

window.pmc.checkDataDashLoaded = function (numTrys) {
    if (typeof window.epx_loaded != "undefined" && window.epx_loaded) {
        window.setTimeout(function () {  //add buffer
            window.pmc.epxLoaded = true;
            window.pmc.runMSDNCustomSearchTagging();
        }, 500);
    } else {
        if (numTrys <= 10) {
            window.setTimeout(function () {
                numTrys++;
                window.pmc.checkDataDashLoaded(numTrys);
            }, 500);
        } else {
            window.pmc.debugLog("checking for epx_loaded=true timed out inside of checkDataDashLoaded function");
        }
    }
};

window.pmc.runMSDNCustomSearchTagging = function () {
    ////////////////////////
    //Search Buttons/Icons//
    ////////////////////////
    //header search button
    window.pmc.headerSearchButton = jQuery("[data-searchtype='icon'][data-pgarea='header']");
    window.pmc.headerSearchButton.attr({
        "ms.interactiontype": "2",
        "ms.title": "search",
        "ms.pgarea": "header",
        "ms.searchtype": "icon"
    });
    window.pmc.headerSearchButton.on("mousedown", function () {
        try {
            var searchVal = jQuery("[data-searchtype='searchbox'][data-pgarea='header']").val();
            if (searchVal && searchVal.length > 0) {
                var cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                window.pmc.setMetaTagContent("ms.searchquery", window.pmc.formatString(cleanedQuery));
                if (!jQuery(this).is(jQuery("a,img,input,area"))) {
                    window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                }
            }
        } catch (e) {
            window.pmc.debugLog("Error in header search button code. Error: " + e);
        }
    });
    window.pmc.headerSearchButton.prev().attr({
        "ms.interactiontype": "2",
        "ms.title": "search",
        "ms.pgarea": "header",
        "ms.searchtype": "icon"
    });
    window.pmc.headerSearchButton.prev().on("mousedown", function () {
        try {
            var searchVal = jQuery("[data-searchtype='searchbox'][data-pgarea='header']").val();
            if (searchVal && searchVal.length > 0) {
                var cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                window.pmc.setMetaTagContent("ms.searchquery", window.pmc.formatString(cleanedQuery));
                if (!jQuery(this).is(jQuery("a,img,input,area"))) {
                    window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                }
            }
        } catch (e) {
            window.pmc.debugLog("Error in header search button code. Error: " + e);
        }
    });
    //body search button
    window.pmc.bodySearchButton = jQuery("[data-searchtype='icon'][data-pgarea='body']");
    window.pmc.bodySearchButton.attr({
        "ms.interactiontype": "2",
        "ms.title": "search",
        "ms.pgarea": "body",
        "ms.searchtype": "icon"
    });
    window.pmc.bodySearchButton.on("mousedown", function () {
        try {
            var searchVal = jQuery("[data-searchtype='searchbox'][data-pgarea='body']").val();
            if (searchVal && searchVal.length > 0) {
                var cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                window.pmc.setMetaTagContent("ms.searchquery", window.pmc.formatString(cleanedQuery));
                if (!jQuery(this).is(jQuery("a,img,input,area"))) {
                    window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                }
            }
        } catch (e) {
            window.pmc.debugLog("Error in body search button code. Error: " + e);
        }
    });
    ////////////////////////////
    //End Search Buttons/Icons//
    ////////////////////////////
    ///////////////////////////////////////
    //Searchbox Event Tracking with Enter//
    ///////////////////////////////////////
    //header searchbox
    window.pmc.headerSearchbox = jQuery("[data-searchtype='searchbox'][data-pgarea='header']");
    window.pmc.headerSearchbox.attr({
        "ms.interactiontype": "2",
        "ms.title": "search",
        "ms.pgarea": "header",
        "ms.searchtype": "enter-key"
    });
    window.pmc.headerSearchbox.keydown(function (event) {
        if (event.which == 13) {
            try {
                var searchVal = jQuery(this).val();
                if (searchVal && searchVal.length > 0) {
                    var cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                    window.pmc.setMetaTagContent("ms.searchquery", window.pmc.formatString(cleanedQuery));
                    window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                }
            } catch (e) {
                window.pmc.debugLog("Error in header searchbox enter event code. Error: " + e);
            }
        }
    });
    //body searchbox
    window.pmc.bodySearchbox = jQuery("[data-searchtype='searchbox'][data-pgarea='body']");
    window.pmc.bodySearchbox.attr({
        "ms.interactiontype": "2",
        "ms.title": "search",
        "ms.pgarea": "body",
        "ms.searchtype": "enter-key"
    });
    window.pmc.bodySearchbox.keydown(function (event) {
        if (event.which == 13) {
            try {
                var searchVal = jQuery(this).val();
                if (searchVal && searchVal.length > 0) {
                    var cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                    window.pmc.setMetaTagContent("ms.searchquery", window.pmc.formatString(cleanedQuery));
                    window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                }
            } catch (e) {
                window.pmc.debugLog("Error in body searchbox enter event code. Error: " + e);
            }
        }
    });
    ///////////////////////////////////////////
    //End Searchbox Event Tracking with Enter//
    ///////////////////////////////////////////
    ///////////////////
    //Search dropdown//
    ///////////////////
    //header search dropdown
    window.pmc.headerSearchDropdown = jQuery("[data-searchtype='search dropdown'][data-pgarea='header']");
    window.pmc.headerSearchDropdown.attr({
        "ms.interactiontype": "2",
        "ms.title": "search",
        "ms.pgarea": "header",
        "ms.searchtype": "suggested keyword"
    });
    window.pmc.headerSearchDropdown.on("mousedown", function () {
        try {
            var searchVal = window.pmc.headerSearchbox.val();
            if (searchVal && searchVal.length > 0) {
                var cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                window.pmc.setMetaTagContent("ms.searchquery", window.pmc.formatString(cleanedQuery));
                if (!jQuery(this).is(jQuery("a,img,input,area"))) {
                    window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                }
            }
        } catch (e) {
            window.pmc.debugLog("Error in header search dropdown code. Error: " + e);
        }
    });
    //body search dropdown
    window.pmc.bodySearchDropdown = jQuery("[data-searchtype='search dropdown'][data-pgarea='body']");
    window.pmc.bodySearchDropdown.attr({
        "ms.interactiontype": "2",
        "ms.title": "search",
        "ms.pgarea": "body",
        "ms.searchtype": "suggested keyword"
    });
    window.pmc.bodySearchDropdown.on("mousedown", function () {
        try {
            var searchVal = window.pmc.bodySearchbox.val();
            if (searchVal && searchVal.length > 0) {
                var cleanedQuery = window.pmc.cleanSearchQuery(searchVal);
                window.pmc.setMetaTagContent("ms.searchquery", window.pmc.formatString(cleanedQuery));
                if (!jQuery(this).is(jQuery("a,img,input,area"))) {
                    window.pmc.processWEDCSCustomEventFromJQObj(jQuery(this));
                }
            }
        } catch (e) {
            window.pmc.debugLog("Error in header search dropdown code. Error: " + e);
        }
    });
    ///////////////////////
    //End Search dropdown//
    ///////////////////////
};
///////////////////////////////
//End MSDN custom search code//
///////////////////////////////
///////////////////////////////
//MSDN language switcher code//
///////////////////////////////

window.pmc.getCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
};
window.pmc.scrapePageForRadioChecked = function () {
    var radioChecked = jQuery(".TranslationViewSwitcher input:checked").attr("value");
    if (radioChecked === "0" || radioChecked === "1") {
        var langVal = radioChecked === "1" ? "original" : "translated";
        window.MscomCustomEvent("ms.title", langVal, "ms.cmptyp", "language switcher");
    } else {
        window.pmc.debugLog("Language translator switcher value attribute != 0|1");
    }
};
window.pmc.readLanguageSwitcher = function () {
    try {
        var languageSwitcherVal = window.pmc.getCookie("MtpsLibraryTranslator");
        //find initial language option and fire custom event
        if (languageSwitcherVal !== null) {
            if (languageSwitcherVal === "1") {  //original
                window.MscomCustomEvent("ms.title", "original", "ms.cmptyp", "language switcher");
            } else {  //translated content
                window.MscomCustomEvent("ms.title", "translated", "ms.cmptyp", "language switcher");
            }
        } else {  //backup when cookie is not present
            window.pmc.scrapePageForRadioChecked();
        }
    } catch (e) {
        window.pmc.debugLog("error in readLanguageSwitcher function. Native error: " + e);
    }
    jQuery(".TranslationViewSwitcher input").each(function () {
        if (jQuery(this).attr("value")) {
            if (jQuery(this).attr("value") === "0" || jQuery(this).attr("value") === "1") {
                langVal = jQuery(this).attr("value") === "0" ? "translated" : "original";
                jQuery(this).attr("ms.title", langVal);
            } else {
                window.pmc.debugLog("Language translator switcher value attribute != 0|1");
            }
        } else {
            window.pmc.debugLog("Language translator switcher does not have a value attribute");
        }
        jQuery(this).attr({
            "ms.cmptyp": "language selector",
            "ms.interactiontype": "16"
        });
    });
};
///////////////////////////////////
//End MSDN language switcher code//
///////////////////////////////////


jQuery(document).ready(function () {
    if (window.location.hostname.match(/msdn\.microsoft\.com/i) || window.location.hostname.match(/msdnapps/i)) {  //msdn only
        window.pmc.assignSearchQuery();
    }
    window.pmc.callMSJS();  //need for technet and msdn
    if (window.location.hostname.match(/msdn\.microsoft\.com/i) || window.location.hostname.match(/msdnapps/i)) {  //msdn only
        window.pmc.checkDataDashLoaded(1);
    }
});;
window.vscins=window.vscins||{};window.vscins.addtag=function(){$("header").attr("ms.pgarea","header");$(".navL1").attr("ms.cmpgrp","main nav")};$(document).ready(function(){window.vscins.addtag()});;
if(typeof fyre=="undefined"){var fyre={};}fyre.conv=fyre.conv||{};
(function(z){
var na;z.l=function(a){return function(){return z.aa[a].apply(this,arguments)}};z.ba=function(a){return void 0!==a};z.n=function(){};z.da=function(a){a.C=function(){return a.tG?a.tG:a.tG=new a}};
z.ea=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};z.fa=function(a){return"array"==z.ea(a)};z.ga=function(a){var b=z.ea(a);return"array"==b||"object"==b&&"number"==typeof a.length};z.p=function(a){return"string"==typeof a};z.ha=function(a){return"boolean"==typeof a};z.r=function(a){return"function"==z.ea(a)};z.ia=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};z.ja=function(a){return a[z.ma]||(a[z.ma]=++na)};
var oa=function(a,b,c){return a.call.apply(a.bind,arguments)};var pa=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};z.t=function(a,b,c){z.t=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?oa:pa;return z.t.apply(null,arguments)};
z.qa=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}};z.ra=function(){return+new Date};z.sa=function(a,b){var c=a.split("."),d=z.u;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var f;c.length&&(f=c.shift());)!c.length&&z.ba(b)?d[f]=b:d=d[f]?d[f]:d[f]={}};
z.v=function(a,b){function c(){}c.prototype=b.prototype;a.b=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.RC=function(a,c,g){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}};z.ta=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,z.ta);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};z.ua=function(a,b){var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c};
z.wa=function(a,b){for(var c=a.split("%s"),d="",f=Array.prototype.slice.call(arguments,1);f.length&&1<c.length;)d+=c.shift()+f.shift();return d+c.join("%s")};z.xa=function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
z.ya=function(a){if(!za.test(a))return a;-1!=a.indexOf("\x26")&&(a=a.replace(Aa,"\x26amp;"));-1!=a.indexOf("\x3c")&&(a=a.replace(Ba,"\x26lt;"));-1!=a.indexOf("\x3e")&&(a=a.replace(Ca,"\x26gt;"));-1!=a.indexOf('"')&&(a=a.replace(Da,"\x26quot;"));-1!=a.indexOf("'")&&(a=a.replace(Ea,"\x26#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(Fa,"\x26#0;"));return a};z.Ga=function(a,b){return-1!=a.indexOf(b)};
z.Ha=function(a,b){for(var c=0,d=z.xa(String(a)).split("."),f=z.xa(String(b)).split("."),g=Math.max(d.length,f.length),h=0;0==c&&h<g;h++){var k=d[h]||"",m=f[h]||"",q=RegExp("(\\d*)(\\D*)","g"),A=RegExp("(\\d*)(\\D*)","g");do{var s=q.exec(k)||["","",""],I=A.exec(m)||["","",""];if(0==s[0].length&&0==I[0].length)break;c=Ia(0==s[1].length?0:(0,window.parseInt)(s[1],10),0==I[1].length?0:(0,window.parseInt)(I[1],10))||Ia(0==s[2].length,0==I[2].length)||Ia(s[2],I[2])}while(0==c)}return c};
var Ia=function(a,b){return a<b?-1:a>b?1:0};var Ja=function(a,b){a.lq=b;switch(b){case 3:a.K.By=a.oM;break;case 0:a.af=z.Ga(window.location.hostname,"fy.re")?"fy.re":"fyre",La(a,z.w.af);default:a.K.By=""}La(a,a.af)};
var La=function(a,b){var c="%s."+b;a.Yf&&a.hh&&(c=b.indexOf("."),c=b.slice(0,c)+".%s."+b.slice(c+1));a.K.domain=b;a.K.nX=a.protocol+b;Ma(a);a.K.rt=a.protocol+z.wa(c,"www");a.K.Zi=a.protocol+z.wa(c,"admin");var d=a.K.rt.replace("http:","https:");a.K.auth=a.Yf?a.K.Zi:d;0==a.lq&&(a.K.auth=a.K.rt);a.K.Vl=a.protocol+z.wa(c,"quill");a.K.yd=a.protocol+z.wa(c,"bootstrap");a.K.stream=a.protocol+z.wa(c,"stream1");a.K.ig=a.protocol+"lc."+a.af;a.K.wz=a.protocol+"www."+a.af;a.K.XW=a.protocol+"beacon."+a.af};
var Ma=function(a,b){if(b)a.K.nb=b;else{var c;if(a.hh)switch(a.lq){case 2:c="d1u30ju8a112p1.cloudfront.net";break;case 1:c="d3gywr6idt93ut.cloudfront.net";break;case 0:c="widget.fy.re";break;default:c="d3qdfnco3bamip.cloudfront.net"}else switch(a.lq){case 3:c="zor.fyre.co";break;case 0:c="widget.fyre";break;default:c="zor."+a.af}c=a.protocol+c;a.K.nb=c;a.K.nb+="/wjs";a.aj&&(z.ua(a.K.nb,"v3.0")?a.K.nb+="."+a.aj:a.K.nb+="/v3.0."+a.aj)}};
z.Na=function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(z.p(a))return z.p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};z.x=function(a,b,c){for(var d=a.length,f=z.p(a)?a.split(""):a,g=0;g<d;g++)g in f&&b.call(c,f[g],g,a)};z.Oa=function(a,b,c){for(var d=a.length,f=[],g=0,h=z.p(a)?a.split(""):a,k=0;k<d;k++)if(k in h){var m=h[k];b.call(c,m,k,a)&&(f[g++]=m)}return f};
z.Pa=function(a,b,c){for(var d=a.length,f=Array(d),g=z.p(a)?a.split(""):a,h=0;h<d;h++)h in g&&(f[h]=b.call(c,g[h],h,a));return f};z.Qa=function(a,b,c){for(var d=a.length,f=z.p(a)?a.split(""):a,g=0;g<d;g++)if(g in f&&b.call(c,f[g],g,a))return!0;return!1};z.Ra=function(a,b,c){a:{for(var d=z.p(a)?a.split(""):a,f=a.length-1;0<=f;f--)if(f in d&&b.call(c,d[f],f,a)){b=f;break a}b=-1}return 0>b?null:z.p(a)?a.charAt(b):a[b]};z.Ta=function(a,b){return 0<=z.Na(a,b)};z.Ua=function(a){return 0==a.length};
z.Va=function(a,b){var c=z.Na(a,b),d;(d=0<=c)&&z.Wa(a,c);return d};z.Wa=function(a,b){return 1==z.Xa.splice.call(a,b,1).length};z.Ya=function(a){return z.Xa.concat.apply(z.Xa,arguments)};z.Za=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};z.$a=function(a,b,c){return 2>=arguments.length?z.Xa.slice.call(a,b):z.Xa.slice.call(a,b,c)};z.ab=function(a){for(var b=[],c=0,d=0;d<a.length;d++){for(var f=a.charCodeAt(d);255<f;)b[c++]=f&255,f>>=8;b[c++]=f}return b};
var bb=function(a){return z.Pa(a,function(a){a=a.toString(16);return 1<a.length?a:"0"+a}).join("")};z.y=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)};z.cb=function(a){var b=0,c;for(c in a)b++;return b};z.db=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b};z.eb=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b};z.fb=function(a,b){for(var c=z.ga(b),d=c?b:arguments,c=c?0:1;c<d.length&&(a=a[d[c]],z.ba(a));c++);return a};z.gb=function(a){for(var b in a)return!1;return!0};
z.hb=function(a,b){b in a&&delete a[b]};z.ib=function(a){var b={},c;for(c in a)b[c]=a[c];return b};z.jb=function(a,b){for(var c,d,f=1;f<arguments.length;f++){d=arguments[f];for(c in d)a[c]=d[c];for(var g=0;g<kb.length;g++)c=kb[g],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};z.mb=function(a){var b=arguments.length;if(1==b&&z.fa(arguments[0]))return z.mb.apply(null,arguments[0]);if(b%2)throw Error("Uneven number of arguments");for(var c={},d=0;d<b;d+=2)c[arguments[d]]=arguments[d+1];return c};
var nb=function(){return z.u.navigator||null};var ob=function(){var a=z.u.document;return a?a.documentMode:void 0};z.B=function(a){return pb[a]||(pb[a]=0<=z.Ha(z.qb,a))};z.rb=function(a){return z.C&&sb>=a};
var tb=function(a){a=z.ab(a);if(!z.ga(a))throw Error("encodeByteArray takes an array as a parameter");z.ub();for(var b=vb,c=[],d=0;d<a.length;d+=3){var f=a[d],g=d+1<a.length,h=g?a[d+1]:0,k=d+2<a.length,m=k?a[d+2]:0,q=f>>2,f=(f&3)<<4|h>>4,h=(h&15)<<2|m>>6,m=m&63;k||(m=64,g||(h=64));c.push(b[q],b[f],b[h],b[m])}return c.join("")};
z.ub=function(){if(!wb){wb={};z.xb={};vb={};for(var a=0;65>a;a++)wb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(a),z.xb[wb[a]]=a,vb[a]=yb.charAt(a),62<=a&&(z.xb[yb.charAt(a)]=a)}};z.zb=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0};var Ab=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};z.Bb=function(a){return function(){return a}};
z.Cb=function(a){var b=arguments,c=b.length;return function(){for(var a,f=0;f<c;f++)a=b[f].apply(this,arguments);return a}};var Db=function(a){z.u.setTimeout(function(){throw a;},0)};
var Eb=function(){var a=z.u.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&(a=function(){var a=window.document.createElement("iframe");a.style.display="none";a.src="";window.document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,a=(0,z.t)(function(a){if(a.origin==d||a.data==
c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!z.Ga(z.Fb,"Trident")&&!z.Ga(z.Fb,"MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){c=c.next;var a=c.bD;c.bD=null;a()};return function(a){d.next={bD:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof window.document&&"onreadystatechange"in window.document.createElement("script")?function(a){var b=window.document.createElement("script");
b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};window.document.documentElement.appendChild(b)}:function(a){z.u.setTimeout(a,0)}};var Gb=function(a,b){Ib||Jb();Kb||(Ib(),Kb=!0);Lb.push(new Mb(a,b))};
var Jb=function(){if(z.u.Promise&&z.u.Promise.resolve){var a=z.u.Promise.resolve();Ib=function(){a.then(Nb)}}else Ib=function(){var a=Nb;!z.r(z.u.setImmediate)||z.u.Window&&z.u.Window.prototype.setImmediate==z.u.setImmediate?(Ob||(Ob=Eb()),Ob(a)):z.u.setImmediate(a)}};var Nb=function(){for(;Lb.length;){var a=Lb;Lb=[];for(var b=0;b<a.length;b++){var c=a[b];try{c.OP.call(c.scope)}catch(d){Db(d)}}}Kb=!1};var Mb=function(a,b){this.OP=a;this.scope=b};
z.Pb=function(a,b){this.F=Qb;this.gh=void 0;this.Ae=this.Pa=null;this.ir=this.nv=!1;try{var c=this;a.call(b,function(a){Sb(c,Tb,a)},function(a){Sb(c,Ub,a)})}catch(d){Sb(this,Ub,d)}};var Vb=function(a,b){if(a.F==Qb)if(a.Pa){var c=a.Pa;if(c.Ae){for(var d=0,f=-1,g=0,h;h=c.Ae[g];g++)if(h=h.pq)if(d++,h==a&&(f=g),0<=f&&1<d)break;0<=f&&(c.F==Qb&&1==d?Vb(c,b):(d=c.Ae.splice(f,1)[0],Wb(c,d,Ub,b)))}}else Sb(a,Ub,b)};var Xb=function(a,b){a.Ae&&a.Ae.length||a.F!=Tb&&a.F!=Ub||Yb(a);a.Ae||(a.Ae=[]);a.Ae.push(b)};
var Zb=function(a,b,c,d){var f={pq:null,lH:null,oH:null};f.pq=new z.Pb(function(a,h){f.lH=b?function(c){try{var f=b.call(d,c);a(f)}catch(q){h(q)}}:a;f.oH=c?function(b){try{var f=c.call(d,b);!z.ba(f)&&b instanceof $b?h(b):a(f)}catch(q){h(q)}}:h});f.pq.Pa=a;Xb(a,f);return f.pq};
var Sb=function(a,b,c){if(a.F==Qb){if(a==c)b=Ub,c=new TypeError("Promise cannot resolve to itself");else{if(Ab(c)){a.F=1;c.then(a.YI,a.ZI,a);return}if(z.ia(c))try{var d=c.then;if(z.r(d)){ac(a,c,d);return}}catch(f){b=Ub,c=f}}a.gh=c;a.F=b;Yb(a);b!=Ub||c instanceof $b||bc(a,c)}};var ac=function(a,b,c){function d(b){g||(g=!0,a.ZI(b))}function f(b){g||(g=!0,a.YI(b))}a.F=1;var g=!1;try{c.call(b,f,d)}catch(h){d(h)}};var Yb=function(a){a.nv||(a.nv=!0,Gb(a.lP,a))};
var Wb=function(a,b,c,d){if(c==Tb)b.lH(d);else{for(;a&&a.ir;a=a.Pa)a.ir=!1;b.oH(d)}};var bc=function(a,b){a.ir=!0;Gb(function(){a.ir&&cc.call(null,b)})};var $b=function(a){z.ta.call(this,a)};z.dc=function(a,b){this.Jo=[];this.hH=a;this.LD=b||null;this.Gn=this.wE=!1;this.gh=void 0;this.Wy=this.QN=this.zu=!1;this.mt=0;this.Pa=null;this.Ju=0};var ec=function(a,b,c){a.wE=!0;a.gh=c;a.Gn=!b;fc(a)};var gc=function(a){if(a.fg()){if(!a.Wy)throw new hc;a.Wy=!1}};z.ic=function(a,b){gc(a);ec(a,!1,b)};
z.jc=function(a,b,c,d){a.Jo.push([b,c,d]);a.fg()&&fc(a)};var kc=function(a){return z.Qa(a.Jo,function(a){return z.r(a[1])})};
var fc=function(a){if(a.mt&&a.fg()&&kc(a)){var b=a.mt,c=lc[b];c&&(mc.call(z.u,c.fc),delete lc[b]);a.mt=0}a.Pa&&(a.Pa.Ju--,delete a.Pa);for(var b=a.gh,d=c=!1;a.Jo.length&&!a.zu;){var f=a.Jo.shift(),g=f[0],h=f[1],f=f[2];if(g=a.Gn?h:g)try{var k=g.call(f||a.LD,b);z.ba(k)&&(a.Gn=a.Gn&&(k==b||k instanceof Error),a.gh=b=k);Ab(b)&&(d=!0,a.zu=!0)}catch(m){b=m,a.Gn=!0,kc(a)||(c=!0)}}a.gh=b;d&&(k=(0,z.t)(a.vD,a,!0),d=(0,z.t)(a.vD,a,!1),b instanceof z.dc?(z.jc(b,k,d),b.QN=!0):b.then(k,d));c&&(b=new pc(b),lc[b.fc]=
b,a.mt=b.fc)};var hc=function(){z.ta.call(this)};var qc=function(){z.ta.call(this)};var pc=function(a){this.fc=rc.call(z.u,(0,z.t)(this.eX,this),0);this.ag=a};
z.sc=function(a,b){var c=b||window.document,d=c.getElementsByTagName("head")[0],f=c.createElement("link"),g;a:{g=0;for(var h=(c||window.document).getElementsByTagName("link"),k=h.length,m,c=a.toLowerCase();g<k;g++)if(m=h[g],z.p(m.href)&&-1<m.href.toLowerCase().indexOf(c)){g=!0;break a}g=!1}g||(f.rel="stylesheet",f.type="text/css",f.href=a,f.media="all",z.ia(void 0)&&z.jb(f,void 0),d.appendChild(f))};
z.tc=function(a,b,c,d,f){b=b||window.document;d=z.r(d)?d:z.n;f=f?f:b.getElementsByTagName("head")[0];b=b.createElement("script");uc[a]?d():vc[a]?vc[a].push(d):(b.type="text/javascript",b.src=a,b.async=!0,b.defer=!0,z.ia(c)&&z.jb(b,c),wc(b,d),f.appendChild(b))};
var wc=function(a,b){vc[a.src]=[b];a.onload=a.onreadystatechange=function(){if(!a.readyState||/loaded|complete/.test(a.readyState)){var b=a.src,d=vc[b];if(d.length)for(var f=0,g=d.length;f<g;f++)d[f]();delete vc[b];uc[a.src]=!0;a.onload=a.onreadystatechange=null;a=void 0}}};z.xc=function(){};z.yc=function(a,b){var c=(0,z.t)(a,b||window);return z.w.K.By?zc(c):c};
var zc=function(a){return function(){try{a.apply(this,arguments)}catch(b){z.tc(z.w.K.nb+z.w.zf.aP,null,null,function(){z.Ac.pD(z.w.K.By,{Jr:[/https?:\/\/zor.fyre.co/,/https?:\/\/(admin|zor|www).livefyre.com/]});z.Ac.tT();z.Ac.aD(b)});var c=0===(0,window.parseInt)(10*Math.random())%10;if(z.C&&c)throw b;}}};z.D=function(){0!=Bc&&(Cc[z.ja(this)]=this);this.Ja=this.Ja;this.Pj=this.Pj};z.Dc=function(){z.D.call(this);this.se=[];this.Jf={}};var Ec=function(a){delete a.se;delete a.Jf;delete a.qo};
var Fc=function(a){this.name=a;z.Dc.call(this);this.$o={}};z.Gc=function(a,b){if(b in a.$o)throw Error("Cannot create new channel: Channel name already exists");a.$o[b]=new Hc(b,a);return a.$o[b]};var Hc=function(a,b){Fc.call(this,a);this.parent=b};z.Ic=function(a){return a?new z.Jc(z.Kc(a)):Lc||(Lc=new z.Jc)};
z.Mc=function(a,b){z.y(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:d in Nc?a.setAttribute(Nc[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})};
z.Oc=function(a,b){var c=b[0],d=b[1];if(!Pc&&d&&(d.name||d.type)){c=["\x3c",c];d.name&&c.push(' name\x3d"',z.ya(d.name),'"');if(d.type){c.push(' type\x3d"',z.ya(d.type),'"');var f={};z.jb(f,d);delete f.type;d=f}c.push("\x3e");c=c.join("")}c=a.createElement(c);d&&(z.p(d)?c.className=d:z.fa(d)?c.className=d.join(" "):z.Mc(c,d));2<b.length&&Qc(a,c,b,2);return c};
var Qc=function(a,b,c,d){function f(c){c&&b.appendChild(z.p(c)?a.createTextNode(c):c)}for(;d<c.length;d++){var g=c[d];!z.ga(g)||z.ia(g)&&0<g.nodeType?f(g):z.x(z.Rc(g)?z.Za(g):g,f)}};z.Sc=function(a){if(1!=a.nodeType)return!1;switch(a.tagName){case "APPLET":case "AREA":case "BASE":case "BR":case "COL":case "COMMAND":case "EMBED":case "FRAME":case "HR":case "IMG":case "INPUT":case "IFRAME":case "ISINDEX":case "KEYGEN":case "LINK":case "NOFRAMES":case "NOSCRIPT":case "META":case "OBJECT":case "PARAM":case "SCRIPT":case "SOURCE":case "STYLE":case "TRACK":case "WBR":return!1}return!0};
z.Tc=function(a,b){Qc(z.Kc(a),a,arguments,1)};z.Uc=function(a){for(var b;b=a.firstChild;)a.removeChild(b)};z.Vc=function(a){return a&&a.parentNode?a.parentNode.removeChild(a):null};z.Wc=function(a){var b,c=a.parentNode;if(c&&11!=c.nodeType){if(a.removeNode)return a.removeNode(!1);for(;b=a.firstChild;)c.insertBefore(b,a);return z.Vc(a)}};z.Xc=function(a){return Yc&&void 0!=a.children?a.children:z.Oa(a.childNodes,function(a){return 1==a.nodeType})};
z.Zc=function(a){return void 0!=a.firstElementChild?a.firstElementChild:z.$c(a.firstChild,!0)};z.$c=function(a,b){for(;a&&1!=a.nodeType;)a=b?a.nextSibling:a.previousSibling;return a};z.ad=function(a){return z.ia(a)&&1==a.nodeType};z.bd=function(a,b){if(a.contains&&1==b.nodeType)return a==b||a.contains(b);if("undefined"!=typeof a.compareDocumentPosition)return a==b||Boolean(a.compareDocumentPosition(b)&16);for(;b&&a!=b;)b=b.parentNode;return b==a};
z.Kc=function(a){return 9==a.nodeType?a:a.ownerDocument||a.document};z.cd=function(a){if(dd&&"innerText"in a)a=a.innerText.replace(/(\r\n|\r|\n)/g,"\n");else{var b=[];z.ed(a,b,!0);a=b.join("")}a=a.replace(/ \xAD /g," ").replace(/\xAD/g,"");a=a.replace(/\u200B/g,"");dd||(a=a.replace(/ +/g," "));" "!=a&&(a=a.replace(/^\s*/,""));return a};
z.ed=function(a,b,c){if(!(a.nodeName in fd))if(3==a.nodeType)c?b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,"")):b.push(a.nodeValue);else if(a.nodeName in gd)b.push(gd[a.nodeName]);else for(a=a.firstChild;a;)z.ed(a,b,c),a=a.nextSibling};z.Rc=function(a){if(a&&"number"==typeof a.length){if(z.ia(a))return"function"==typeof a.item||"string"==typeof a.item;if(z.r(a))return"function"==typeof a.item}return!1};z.Jc=function(a){this.Ka=a||z.u.document||window.document};
z.hd=function(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);};var jd=function(a){return eval("("+a+")")};z.kd=function(a){var b=[];ld(new md,a,b);return b.join("")};var md=function(){this.Ms=void 0};
var ld=function(a,b,c){switch(typeof b){case "string":nd(b,c);break;case "number":c.push((0,window.isFinite)(b)&&!(0,window.isNaN)(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(z.fa(b)){var d=b.length;c.push("[");for(var f="",g=0;g<d;g++)c.push(f),f=b[g],ld(a,a.Ms?a.Ms.call(b,String(g),f):f,c),f=",";c.push("]");break}c.push("{");d="";for(g in b)Object.prototype.hasOwnProperty.call(b,g)&&(f=b[g],"function"!=
typeof f&&(c.push(d),nd(g,c),c.push(":"),ld(a,a.Ms?a.Ms.call(b,g,f):f,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}};var nd=function(a,b){b.push('"',a.replace(od,function(a){if(a in pd)return pd[a];var b=a.charCodeAt(0),f="\\u";16>b?f+="000":256>b?f+="00":4096>b&&(f+="0");return pd[a]=f+b.toString(16)}),'"')};
z.qd=function(a,b,c){if(a===b)return 0!==a||1/a==1/b;if(null==a||null==b)return a===b;a.pN&&(a=a.vN);b.pN&&(b=b.vN);if(a.isEqual&&z.r(a.isEqual))return a.isEqual(b);if(b.isEqual&&z.r(b.isEqual))return b.isEqual(a);var d=Object.prototype.toString.call(a);if(d!=Object.prototype.toString.call(b))return!1;switch(d){case "[object String]":return a==String(b);case "[object Number]":return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case "[object Date]":case "[object Boolean]":return+a==+b;case "[object RegExp]":return a.source==
b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if("object"!=typeof a||"object"!=typeof b)return!1;for(var f=c.length;f--;)if(c[f]==a)return!0;c.push(a);var f=0,g=!0;if("[object Array]"==d){if(f=a.length,g=f==b.length)for(;f--&&(g=f in a==f in b&&z.qd(a[f],b[f],c)););}else{if("constructor"in a!="constructor"in b||a.constructor!=b.constructor)return!1;for(var h in a)if(h in a&&(f++,!(g=h in b&&z.qd(a[h],b[h],c))))break;if(g){for(h in b)if(h in b&&!f--)break;g=!f}}c.pop();
return g};var rd=function(a,b){z.x(Array.prototype.slice.call(arguments,1),function(b){for(var d in b)a[d]=b[d]});return a};z.sd=function(a,b,c){b.uk=a;b.wp=c};var td=function(a,b){b=b||a.G;z.y(a,function(c){if(z.r(c)&&c.uk)for(var d=0,f=c.uk.length;d<f;++d){var g=c.uk[d];(c.wp?c.wp:b.R&&z.r(b.R.subscribe)?b.R:b).subscribe(g,c,a)}})};
var ud=function(a,b){b=b||a.G;var c;z.y(a,function(d){if(z.r(d)&&d.uk)for(var f=0,g=d.uk.length;f<g;++f){var h=d.uk[f];c=d.wp?d.wp:b.R&&z.r(b.R.subscribe)?b.R:b;c.$c(h,d,a)}})};z.vd=function(a){if("function"==typeof a.nd)return a.nd();if(z.p(a))return a.split("");if(z.ga(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return z.db(a)};
z.wd=function(a){if("function"==typeof a.Qh)return a.Qh();if("function"!=typeof a.nd){if(z.ga(a)||z.p(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return z.eb(a)}};var xd=function(a,b,c){if("function"==typeof a.forEach)a.forEach(b,c);else if(z.ga(a)||z.p(a))z.x(a,b,c);else for(var d=z.wd(a),f=z.vd(a),g=f.length,h=0;h<g;h++)b.call(c,f[h],d&&d[h],a)};z.yd=function(){};
z.zd=function(a){if(a instanceof z.yd)return a;if("function"==typeof a.Ud)return a.Ud(!1);if(z.ga(a)){var b=0,c=new z.yd;c.next=function(){for(;;){if(b>=a.length)throw z.Ad;if(b in a)return a[b++];b++}};return c}throw Error("Not implemented");};z.Bd=function(a,b){if(z.ga(a))try{z.x(a,b,void 0)}catch(c){if(c!==z.Ad)throw c;}else{a=z.zd(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(d){if(d!==z.Ad)throw d;}}};
var Cd=function(a){if(z.ga(a))return z.Za(a);a=z.zd(a);var b=[];z.Bd(a,function(a){b.push(a)});return b};z.Dd=function(a,b){this.Fb={};this.gb=[];this.lp=this.Ua=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.lu(a)};
z.Ed=function(a){if(a.Ua!=a.gb.length){for(var b=0,c=0;b<a.gb.length;){var d=a.gb[b];z.Fd(a.Fb,d)&&(a.gb[c++]=d);b++}a.gb.length=c}if(a.Ua!=a.gb.length){for(var f={},c=b=0;b<a.gb.length;)d=a.gb[b],z.Fd(f,d)||(a.gb[c++]=d,f[d]=1),b++;a.gb.length=c}};z.Gd=function(a){z.Ed(a);for(var b={},c=0;c<a.gb.length;c++){var d=a.gb[c];b[d]=a.Fb[d]}return b};z.Fd=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};z.Hd=function(a){this.Fb=new z.Dd;a&&this.lu(a)};
var Jd=function(a){var b=typeof a;return"object"==b&&a||"function"==b?"o"+z.ja(a):b.substr(0,1)+a};var Kd=function(a){this.DU=a;this.xr=this.ma=this.Pa=null};z.Ld=function(a){Md||(Md=new Kd(""),Nd[""]=Md);var b;if(!(b=Nd[a])){b=new Kd(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=z.Ld(a.substr(0,c));c.ec()[d]=b;b.Pa=c;Nd[a]=b}return b};z.Od=function(){this.xa=Pd;z.Qd.yh.apply(this,arguments)};z.Rd=function(a){return"change:"+a};
z.Sd=function(a){var b=Td;return function(){var c=this||z.u,c=c[Ud]||(c[Ud]={}),d=b(z.ja(a),arguments);return c.hasOwnProperty(d)?c[d]:c[d]=a.apply(this,arguments)}};var Td=function(a,b){for(var c=[a],d=b.length-1;0<=d;--d)c.push(typeof b[d],b[d]);return c.join("\x0B")};z.Vd=function(a){this.k=z.Wd;z.Od.call(this,a)};z.Xd=function(a){z.w.hh&&(z.y(Yd,function(b,c){a=a.replace(c,b)}),a=a.replace(/http:\/\//g,"https://"));return a};z.Zd=function(){z.D.call(this)};
z.$d=function(a){if(ae){ae=!1;var b=z.u.location;if(b){var c=b.href;if(c&&(c=(c=z.$d(c)[3]||null)?(0,window.decodeURI)(c):c)&&c!=b.hostname)throw ae=!0,Error();}}return a.match(be)};
z.ce=function(a,b){var c;if(a instanceof z.ce)this.Ne=z.ba(b)?b:a.Ne,z.de(this,a.ti),c=a.ik,ee(this),this.ik=c,z.fe(this,a.ij),ge(this,a.Sl),z.he(this,a.ni),z.ie(this,a.Id.clone()),je(this,a.wn);else if(a&&(c=z.$d(String(a)))){this.Ne=!!b;z.de(this,c[1]||"",!0);var d=c[2]||"";ee(this);this.ik=ke(d);z.fe(this,c[3]||"",!0);ge(this,c[4]);z.he(this,c[5]||"",!0);z.ie(this,c[6]||"",!0);je(this,c[7]||"",!0)}else this.Ne=!!b,this.Id=new z.le(null,0,this.Ne)};
z.de=function(a,b,c){ee(a);a.ti=c?ke(b,!0):b;a.ti&&(a.ti=a.ti.replace(/:$/,""))};z.fe=function(a,b,c){ee(a);a.ij=c?ke(b,!0):b};var ge=function(a,b){ee(a);if(b){b=Number(b);if((0,window.isNaN)(b)||0>b)throw Error("Bad port number "+b);a.Sl=b}else a.Sl=null};z.he=function(a,b,c){ee(a);a.ni=c?ke(b,!0):b};z.ie=function(a,b,c){ee(a);b instanceof z.le?(a.Id=b,a.Id.Hy(a.Ne)):(c||(b=me(b,ne)),a.Id=new z.le(b,0,a.Ne))};z.oe=function(a,b,c){ee(a);a.Id.set(b,c)};
var pe=function(a,b,c){ee(a);z.fa(c)||(c=[String(c)]);qe(a.Id,b,c)};var je=function(a,b,c){ee(a);a.wn=c?ke(b):b};var ee=function(a){if(a.ET)throw Error("Tried to modify a read-only Uri");};var ke=function(a,b){return a?b?(0,window.decodeURI)(a):(0,window.decodeURIComponent)(a):""};var me=function(a,b,c){return z.p(a)?(a=(0,window.encodeURI)(a).replace(b,re),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null};var re=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)};
z.le=function(a,b,c){this.de=a||null;this.Ne=!!c};z.se=function(a){if(!a.Ob&&(a.Ob=new z.Dd,a.Ua=0,a.de))for(var b=a.de.split("\x26"),c=0;c<b.length;c++){var d=b[c].indexOf("\x3d"),f=null,g=null;0<=d?(f=b[c].substring(0,d),g=b[c].substring(d+1)):f=b[c];f=(0,window.decodeURIComponent)(f.replace(/\+/g," "));f=te(a,f);a.add(f,g?(0,window.decodeURIComponent)(g.replace(/\+/g," ")):"")}};
z.ue=function(a){var b=z.wd(a);if("undefined"==typeof b)throw Error("Keys are undefined");var c=new z.le(null,0,void 0);a=z.vd(a);for(var d=0;d<b.length;d++){var f=b[d],g=a[d];z.fa(g)?qe(c,f,g):c.add(f,g)}return c};var qe=function(a,b,c){a.remove(b);0<c.length&&(a.de=null,a.Ob.set(te(a,b),z.Za(c)),a.Ua+=c.length)};var te=function(a,b){var c=String(b);a.Ne&&(c=c.toLowerCase());return c};
var ve=function(a){var b={url:window.location.href,wa:z.n,sa:z.n,method:we,timeout:30};z.jb(b,a);this.url=new z.ce(b.url);this.dt=b.wa||z.n;this.Qq=b.sa||z.n;this.method=b.method.toUpperCase();this.timeout=b.timeout;this.ca=null};var xe=function(a,b){var c=new z.ce(a.url);b&&a.method===we&&(b=z.ue(b),b.extend(c.Id),z.ie(c,b));return c};var ye=function(a,b){if("POST"===a.method)return z.p(b)?b:z.ia(b)?z.ue(b).toString():z.kd(b)};
var ze=function(a){ve.call(this,a);this.withCredentials="with_credentials"in a?a.with_credentials:!0;this.ca=new window.XMLHttpRequest};var Ae=function(a){ve.call(this,a);this.ca=new window.XDomainRequest};
var Be=function(a,b){var c=b||{},d=c.document||window.document,f=window.document.createElement("SCRIPT"),g={YH:f,Di:void 0},h=new z.dc(Ce,g),k=null,m=null!=c.timeout?c.timeout:5E3;0<m&&(k=window.setTimeout(function(){De(f,!0);z.ic(h,new Ee(Fe,"Timeout reached for loading script "+a))},m),g.Di=k);f.onload=f.onreadystatechange=function(){f.readyState&&"loaded"!=f.readyState&&"complete"!=f.readyState||(De(f,c.hO||!1,k),h.ia(null))};f.onerror=function(){De(f,!0,k);z.ic(h,new Ee(Ge,"Error while loading script "+
a))};z.Mc(f,{type:"text/javascript",charset:"UTF-8",src:a});He(d).appendChild(f);return h};var He=function(a){var b=a.getElementsByTagName("HEAD");return!b||z.Ua(b)?a.documentElement:b[0]};var Ce=function(){if(this&&this.YH){var a=this.YH;a&&"SCRIPT"==a.tagName&&De(a,!0,this.Di)}};var De=function(a,b,c){null!=c&&z.u.clearTimeout(c);a.onload=z.n;a.onerror=z.n;a.onreadystatechange=z.n;b&&window.setTimeout(function(){z.Vc(a)},0)};
var Ee=function(a,b){var c="Jsloader error (code #"+a+")";b&&(c+=": "+b);z.ta.call(this,c);this.code=a};var Ie=function(a,b){this.kJ=new z.ce(a);this.ZN=b?b:"callback";this.Di=5E3};var Je=function(a,b,c){return function(){Ke(a,!1);c&&c(b)}};var Le=function(a,b){return function(c){Ke(a,!0);b.apply(void 0,arguments)}};var Ke=function(a,b){z.u._callbacks_[a]&&(b?delete z.u._callbacks_[a]:z.u._callbacks_[a]=z.n)};
var Me=function(a){ve.call(this,a);this.ca=new Ie(this.url);this.ca.Di=3E4;this.SH={cancel:(0,z.t)(this.ca.cancel,this.ca)}};
var Ne=function(a){ve.call(this,a);if(!window.document.body)throw"Cannot use this method until body exists";if("POST"!==this.method)throw"Only post methods allowed";this.iG=Oe+"/site_media/iframe_receiver.html";this.Ww=!1;z.u.addEventListener("message",(0,z.t)(this.mH,this));(a=window.document.getElementById("fyre-pm-iframe"))?this.Ww=!0:(a=window.document.createElement("IFRAME"),a.id="fyre-pm-iframe",a.src=this.iG,window.document.body.appendChild(a));a=a.contentWindow;this.jT=a;this.Es=null};
z.Pe=function(a){ve.call(this,a);this.ca=Qe(a);this.ca.wa=(0,z.t)(this.wa,this);this.ca.sa=(0,z.t)(this.sa,this)};var Qe=function(a){switch(a.Zc||z.Re){case "postmessage":return"POST"===a.method&&0==a.url.lastIndexOf(Oe,0)?new Ne(a):new Me(a);case "CORS":return new ze(a);case "IECORS":return"POST"===a.method?new Ae(a):new Me(a);case "jsonp":return new Me(a)}};z.Se=function(){z.D.call(this)};z.Te=function(a){z.Od.call(this,a)};z.Ue=function(a){z.Od.call(this,a)};
var Ve=function(a){var b=a.profile,c=a.permissions||{};if(!b)return{};b[z.We.tk]=[];c.moderator_key&&(b[z.We.tk].push(c.moderator_key),b[z.We.Qd]=!0);b[z.We.Td]=a[z.We.Td].value||a[z.We.Td];b[z.We.du]=a[z.We.Td].ttl;z.x(["type","sourceId"],function(a){z.hb(b,a)});return b};z.Xe=function(){this.Wz=this.Wz||this.constructor.Wz;arguments&&arguments[0]||(arguments[0]={});this.od.apply(this,arguments)};z.Ye=function(a,b){z.Xe.call(this,a,b)};var Ze=function(a,b){z.Xe.call(this,a,b)};
z.$e=function(a){this.Ka=a};z.af=function(a){a=(a.Ka.cookie||"").split(z.bf);for(var b=[],c=[],d,f,g=0;f=a[g];g++)d=f.indexOf("\x3d"),-1==d?(b.push(""),c.push(f)):(b.push(f.substring(0,d)),c.push(f.substring(d+1)));return{keys:b,Ez:c}};var cf=function(){};var df=function(){};z.ef=function(){};z.ff=function(a){this.Ec=a};var gf=function(){var a=null;try{a=window.localStorage||null}catch(b){}this.Ec=a};
z.hf=function(a,b){if(z.C&&!z.rb(9)){kf||(kf=new z.Dd);this.sd=kf.get(a);this.sd||(b?this.sd=window.document.getElementById(b):(this.sd=window.document.createElement("userdata"),this.sd.addBehavior("#default#userData"),window.document.body.appendChild(this.sd)),kf.set(a,this.sd));this.kz=a;try{this.sd.load(this.kz)}catch(c){this.sd=null}}};var lf=function(a){return"_"+(0,window.encodeURIComponent)(a).replace(/[.!~*'()%]/g,function(a){return mf[a]})};
var nf=function(a){try{a.sd.save(a.kz)}catch(b){throw"Storage mechanism: Quota exceeded";}};z.of=function(a){return a.sd.XMLDocument.documentElement};z.pf=function(){if(window.localStorage){var a=new gf;a.wG()&&(this.Ec=a)}this.Ec||(this.Ec=z.C?new z.hf("fyre-store"):new df)};var qf=function(a){a=a||{};z.D.call(this);this.rd=a.rd||z.pf.C()};z.rf=function(){return sf||void 0};z.tf=function(a){return a.rd.get(uf)};
z.vf=function(a,b){b||(b={});var c=window,d="undefined"!=typeof a.href?a.href:String(a),f=b.target||a.target,g=[],h;for(h in b)switch(h){case "width":case "height":case "top":case "left":g.push(h+"\x3d"+b[h]);break;case "target":case "noreferrer":break;default:g.push(h+"\x3d"+(b[h]?1:0))}g=g.join(",");if(b.noreferrer){if(c=c.open("",f,g))z.C&&-1!=d.indexOf(";")&&(d="'"+d.replace(/'/g,"%27")+"'"),c.opener=null,d=z.ya(d),c.document.write('\x3cMETA HTTP-EQUIV\x3d"refresh" content\x3d"0; url\x3d'+d+'"\x3e'),
c.document.close()}else c=c.open(d,f,g);return c};z.wf=function(){};
var xf=function(a,b){function c(a){f.isAuthenticated()&&!z.E.id&&(f.removeListener("login",c),yf(a.token.value),f.on("logout",d))}function d(){f.removeListener("logout",d);z.E.id&&b.Re();f.on("login",c)}var f=a.getUser();f.on("login",c);return{login:function(b){function c(a){b.success({data:a});f.removeListener("login",c)}f.on("login",c);a.login()},logout:function(b){function c(){b.success();f.removeListener("logout",c)}f.on("logout",c);a.logout()},viewProfile:function(b){a.viewProfile.apply(a,z.$a(arguments,
1))},editProfile:function(b){a.editProfile.apply(a,z.$a(arguments,1))},loginByCookie:function(b){!f.isAuthenticated()&&a.restoreSession&&a.restoreSession();if(f.isAuthenticated()){var c=z.tf(z.rf());z.E&&z.E.set(z.E.k.Td,f.get("token"));c?b.success(c):b.failure(c)}}}};z.zf=function(){z.D.call(this);this.Ed=z.Ld("fyre.v1.client.AuthClient")};var Af=function(a,b,c,d){(new Me({url:b,wa:c,sa:d})).send({})};z.Bf=function(a){this.oi=null;this.d=a};
var Cf=function(a,b,c){var d;d=a.d.u.v();var f=new z.ce(z.w.K.auth+"/auth/popup/");z.ie(f,z.ue({start:!0,site_id:d.get(d.k.Hc)}));z.Df&&z.oe(f,"url",(0,window.encodeURI)(window.location.href.split("#")[0]));d=f.toString();a.sy=-1;a.wH=z.vf(d,{target:"authWindow",width:530,height:365,location:!0,menubar:!1,b2:!1,scrollbars:!1});(0,window.clearTimeout)(a.U1);b=(0,z.t)(a.CI,a,b,c);a.oi=(0,window.setTimeout)(b,100)};z.Ef=function(){z.D.call(this)};z.Ff=function(a){this.xa=Pd;z.Qd.um.call(this,a)};
z.Gf=function(a,b){this.G=this.d=a;this.ha=b;z.D.call(this)};var Hf=function(a,b){this.base=(0,z.t)(a.base||z.n,b);this.success=(0,z.t)(a.success||z.n,b);this.failure=(0,z.t)(a.failure||z.n,b)};var If=function(a,b){var c=b||{};return function(){var b=new Hf(c,this),f=this.delegate&&this.delegate[a];f?f.apply(this.delegate,z.Ya(b,z.Za(arguments))):b.base.apply(this,arguments)}};z.Jf=function(a,b){z.Gf.call(this,a,b);this.Uo=new z.Ff;this.Uo.Da=z.Te;this.yv=!1;this.eg=new (b.eg||Ze)(b,this)};
z.Kf=function(){return z.Lf||void 0};z.Mf=function(a,b){var c;a.yv&&!b||!z.E.id||z.E.Rb()||(c=c||z.n,z.Ef.C().Uv(z.E,!1,(0,z.t)(a.wS,a,c),c),a.yv=!0)};var Nf=function(a){var b=z.tf(z.rf());a.it&&(0,window.clearTimeout)(a.it);a.it=(0,window.setTimeout)((0,z.t)(function(){b?Nf(this):z.E.set(z.E.k.eC,!0)},a),3E5)};var Of=function(){this.Gg=-1};z.Pf=function(){this.Gg=-1;this.Gg=64;this.Yb=Array(4);this.PN=Array(this.Gg);this.jt=this.Wm=0;this.reset()};
var Qf=function(a,b,c){c||(c=0);var d=Array(16);if(z.p(b))for(var f=0;16>f;++f)d[f]=b.charCodeAt(c++)|b.charCodeAt(c++)<<8|b.charCodeAt(c++)<<16|b.charCodeAt(c++)<<24;else for(f=0;16>f;++f)d[f]=b[c++]|b[c++]<<8|b[c++]<<16|b[c++]<<24;b=a.Yb[0];c=a.Yb[1];var f=a.Yb[2],g=a.Yb[3],h=0,h=b+(g^c&(f^g))+d[0]+3614090360&4294967295;b=c+(h<<7&4294967295|h>>>25);h=g+(f^b&(c^f))+d[1]+3905402710&4294967295;g=b+(h<<12&4294967295|h>>>20);h=f+(c^g&(b^c))+d[2]+606105819&4294967295;f=g+(h<<17&4294967295|h>>>15);h=c+
(b^f&(g^b))+d[3]+3250441966&4294967295;c=f+(h<<22&4294967295|h>>>10);h=b+(g^c&(f^g))+d[4]+4118548399&4294967295;b=c+(h<<7&4294967295|h>>>25);h=g+(f^b&(c^f))+d[5]+1200080426&4294967295;g=b+(h<<12&4294967295|h>>>20);h=f+(c^g&(b^c))+d[6]+2821735955&4294967295;f=g+(h<<17&4294967295|h>>>15);h=c+(b^f&(g^b))+d[7]+4249261313&4294967295;c=f+(h<<22&4294967295|h>>>10);h=b+(g^c&(f^g))+d[8]+1770035416&4294967295;b=c+(h<<7&4294967295|h>>>25);h=g+(f^b&(c^f))+d[9]+2336552879&4294967295;g=b+(h<<12&4294967295|h>>>
20);h=f+(c^g&(b^c))+d[10]+4294925233&4294967295;f=g+(h<<17&4294967295|h>>>15);h=c+(b^f&(g^b))+d[11]+2304563134&4294967295;c=f+(h<<22&4294967295|h>>>10);h=b+(g^c&(f^g))+d[12]+1804603682&4294967295;b=c+(h<<7&4294967295|h>>>25);h=g+(f^b&(c^f))+d[13]+4254626195&4294967295;g=b+(h<<12&4294967295|h>>>20);h=f+(c^g&(b^c))+d[14]+2792965006&4294967295;f=g+(h<<17&4294967295|h>>>15);h=c+(b^f&(g^b))+d[15]+1236535329&4294967295;c=f+(h<<22&4294967295|h>>>10);h=b+(f^g&(c^f))+d[1]+4129170786&4294967295;b=c+(h<<5&4294967295|
h>>>27);h=g+(c^f&(b^c))+d[6]+3225465664&4294967295;g=b+(h<<9&4294967295|h>>>23);h=f+(b^c&(g^b))+d[11]+643717713&4294967295;f=g+(h<<14&4294967295|h>>>18);h=c+(g^b&(f^g))+d[0]+3921069994&4294967295;c=f+(h<<20&4294967295|h>>>12);h=b+(f^g&(c^f))+d[5]+3593408605&4294967295;b=c+(h<<5&4294967295|h>>>27);h=g+(c^f&(b^c))+d[10]+38016083&4294967295;g=b+(h<<9&4294967295|h>>>23);h=f+(b^c&(g^b))+d[15]+3634488961&4294967295;f=g+(h<<14&4294967295|h>>>18);h=c+(g^b&(f^g))+d[4]+3889429448&4294967295;c=f+(h<<20&4294967295|
h>>>12);h=b+(f^g&(c^f))+d[9]+568446438&4294967295;b=c+(h<<5&4294967295|h>>>27);h=g+(c^f&(b^c))+d[14]+3275163606&4294967295;g=b+(h<<9&4294967295|h>>>23);h=f+(b^c&(g^b))+d[3]+4107603335&4294967295;f=g+(h<<14&4294967295|h>>>18);h=c+(g^b&(f^g))+d[8]+1163531501&4294967295;c=f+(h<<20&4294967295|h>>>12);h=b+(f^g&(c^f))+d[13]+2850285829&4294967295;b=c+(h<<5&4294967295|h>>>27);h=g+(c^f&(b^c))+d[2]+4243563512&4294967295;g=b+(h<<9&4294967295|h>>>23);h=f+(b^c&(g^b))+d[7]+1735328473&4294967295;f=g+(h<<14&4294967295|
h>>>18);h=c+(g^b&(f^g))+d[12]+2368359562&4294967295;c=f+(h<<20&4294967295|h>>>12);h=b+(c^f^g)+d[5]+4294588738&4294967295;b=c+(h<<4&4294967295|h>>>28);h=g+(b^c^f)+d[8]+2272392833&4294967295;g=b+(h<<11&4294967295|h>>>21);h=f+(g^b^c)+d[11]+1839030562&4294967295;f=g+(h<<16&4294967295|h>>>16);h=c+(f^g^b)+d[14]+4259657740&4294967295;c=f+(h<<23&4294967295|h>>>9);h=b+(c^f^g)+d[1]+2763975236&4294967295;b=c+(h<<4&4294967295|h>>>28);h=g+(b^c^f)+d[4]+1272893353&4294967295;g=b+(h<<11&4294967295|h>>>21);h=f+(g^
b^c)+d[7]+4139469664&4294967295;f=g+(h<<16&4294967295|h>>>16);h=c+(f^g^b)+d[10]+3200236656&4294967295;c=f+(h<<23&4294967295|h>>>9);h=b+(c^f^g)+d[13]+681279174&4294967295;b=c+(h<<4&4294967295|h>>>28);h=g+(b^c^f)+d[0]+3936430074&4294967295;g=b+(h<<11&4294967295|h>>>21);h=f+(g^b^c)+d[3]+3572445317&4294967295;f=g+(h<<16&4294967295|h>>>16);h=c+(f^g^b)+d[6]+76029189&4294967295;c=f+(h<<23&4294967295|h>>>9);h=b+(c^f^g)+d[9]+3654602809&4294967295;b=c+(h<<4&4294967295|h>>>28);h=g+(b^c^f)+d[12]+3873151461&4294967295;
g=b+(h<<11&4294967295|h>>>21);h=f+(g^b^c)+d[15]+530742520&4294967295;f=g+(h<<16&4294967295|h>>>16);h=c+(f^g^b)+d[2]+3299628645&4294967295;c=f+(h<<23&4294967295|h>>>9);h=b+(f^(c|~g))+d[0]+4096336452&4294967295;b=c+(h<<6&4294967295|h>>>26);h=g+(c^(b|~f))+d[7]+1126891415&4294967295;g=b+(h<<10&4294967295|h>>>22);h=f+(b^(g|~c))+d[14]+2878612391&4294967295;f=g+(h<<15&4294967295|h>>>17);h=c+(g^(f|~b))+d[5]+4237533241&4294967295;c=f+(h<<21&4294967295|h>>>11);h=b+(f^(c|~g))+d[12]+1700485571&4294967295;b=c+
(h<<6&4294967295|h>>>26);h=g+(c^(b|~f))+d[3]+2399980690&4294967295;g=b+(h<<10&4294967295|h>>>22);h=f+(b^(g|~c))+d[10]+4293915773&4294967295;f=g+(h<<15&4294967295|h>>>17);h=c+(g^(f|~b))+d[1]+2240044497&4294967295;c=f+(h<<21&4294967295|h>>>11);h=b+(f^(c|~g))+d[8]+1873313359&4294967295;b=c+(h<<6&4294967295|h>>>26);h=g+(c^(b|~f))+d[15]+4264355552&4294967295;g=b+(h<<10&4294967295|h>>>22);h=f+(b^(g|~c))+d[6]+2734768916&4294967295;f=g+(h<<15&4294967295|h>>>17);h=c+(g^(f|~b))+d[13]+1309151649&4294967295;
c=f+(h<<21&4294967295|h>>>11);h=b+(f^(c|~g))+d[4]+4149444226&4294967295;b=c+(h<<6&4294967295|h>>>26);h=g+(c^(b|~f))+d[11]+3174756917&4294967295;g=b+(h<<10&4294967295|h>>>22);h=f+(b^(g|~c))+d[2]+718787259&4294967295;f=g+(h<<15&4294967295|h>>>17);h=c+(g^(f|~b))+d[9]+3951481745&4294967295;a.Yb[0]=a.Yb[0]+b&4294967295;a.Yb[1]=a.Yb[1]+(f+(h<<21&4294967295|h>>>11))&4294967295;a.Yb[2]=a.Yb[2]+f&4294967295;a.Yb[3]=a.Yb[3]+g&4294967295};
z.Sf=function(a){var b=Array((56>a.Wm?a.Gg:2*a.Gg)-a.Wm);b[0]=128;for(var c=1;c<b.length-8;++c)b[c]=0;for(var d=8*a.jt,c=b.length-8;c<b.length;++c)b[c]=d&255,d/=256;a.update(b);b=Array(16);for(c=d=0;4>c;++c)for(var f=0;32>f;f+=8)b[d++]=a.Yb[c]>>>f&255;return b};var Tf=function(a){var b=new z.Pf;b.update(""+a);return bb(z.Sf(b))};var Uf=function(a){this.Vf=a;var b=!1,c=(0,z.t)(function(){(0,z.Vf)((0,z.t)(this.od,this));this.FD=this.Vf.getChannelID();b=!0},this);this.Vf(function(){b||c()})};
var Wf=function(a){z.E.set(z.mb(z.E.k.ok,a),{Gf:!0})};var Xf=function(a){a.Vf.subscribe((0,z.t)(a.In,a))};var Yf=function(a,b){var c=new z.Hd(z.db(Zf));return z.Ra(b,function(a){return c.contains(this.oE(a))},a)};var $f=function(a){Uf.call(this,a);this.oe=z.Ld("fyre.conv.service.backplane.Backplane12")};var ag=function(a,b){var c=z.E.get(z.E.k.ok);Af(z.zf.C(),c,b,(0,z.t)(function(){},a))};var bg=function(a){Uf.call(this,a);this.oe=z.Ld("fyre.conv.service.backplane.Backplane20")};
var cg=function(a){var b=a.version,c;b.match(dg.hN)?c=$f:b.match(dg.a1)&&(c=bg);this.Vf=new c(a);this.oe=z.Ld("fyre.conv.service.BackplaneAuthDelegate")};var eg=function(a){a=a||{};var b=a.engage||{},c=a.profiles||{};(0,z.Vf)((0,z.t)(function(){this.DG=z.fg;this.jE=new z.u.fyre.sp.app.Engage(b);this.profiles=new z.u.fyre.sp.app.Profile(c);gg(this)},this))};
var gg=function(a){var b=z.Kf();b.delegate=b.delegate||a;z.u.fyre.sp.on(hg.Fp,function(a){(0,z.Vf)(function(){b.yf(a.token)})});z.u.fyre.sp.on(hg.vL,function(){(0,z.Vf)(function(){b.Re()})})};var ig=function(a){a.DG&&z.jg.N("window_nav")};var yf=function(a){z.Kf().yf(a)};var kg=function(a){if(!kg.uG){a.networkId&&"livefyre.com"!==a.networkId&&z.w.eI(a.networkId);kg.uG=!0;sf=new qf(a);a=new z.Jf(z.jg,a);var b=a.ha.authDelegate;(b?b&&z.r(b.loginByCookie):1)||(a.ha.authDelegate=xf(b,a));z.Lf=a}};
var lg=function(a,b,c){return new mg(a,b,c)};
var mg=function(a,b,c){a.network&&"livefyre.com"!==a.network&&z.w.eI(a.network);if(a.env){if(!a.network)throw Error("If using `env` network is required");var d={prod:"",staging:"t402",qa:"qa-ext",dev:""};"livefyre.com"===a.network&&(a.network=d[a.env]+"."+a.network);z.w.set("tldPrefix",d[a.env])}this.ha=a;var f=(new z.ce(window.location.href)).Id.get("livefyrejs");if(f&&!z.u.FYRE_OVERRIDE){var g=d=null,h=z.w.protocol;switch(f){case "dev":g="widget.fyre/wjs";d=h+"widget.fyre/compile?id\x3dlfconv\x26mode\x3dsimple";
break;case "qa":g="zor.qa-ext.livefyre.com/wjs";d=h+g+"/v3.0/"+z.w.zf.PG;break;case "uat":g="zor.t402.livefyre.com/wjs";d=h+g+"/v3.0/"+z.w.zf.PG;break;default:f=null,window.console&&window.console.warn("Unknown server override.")}z.u.FYRE_OVERRIDE=f;f={tldPrefix:z.w.af.replace(/.livefyre.com/,""),buildType:z.w.lq,assetServer:g};z.tc(d,null,null,z.qa(function(a,b){var c=z.u.fyre.conv;z.y(b,function(a,b){c.config.set(b,a)});c.load.apply(z.u,a)},arguments,f))}else z.r(b)&&(c=b,b=z.ng.rk),b||(b=z.ng.rk),
this.Pm={},this.ia=c||z.n,this.bH=[],this.cq=z.Pa(z.p(b)?[b]:b,this.YP,this),z.x(this.cq,function(a,b){var c=(0,z.t)(this.qG,this,b);z.jc(a.zU.Hh,c,null,void 0);c="";z.og?c="_ipad":z.fg&&(c="_mobile");z.sc(z.w.K.nb+"/css/"+("livefyre_"+("reviews"===a.appName?"reviews":"main")+c+".css"))},this),pg(this,this.ha.assetVersion||z.w.aj)};var pg=function(a,b){z.w.aj=b;z.tc(z.w.K.nb+z.w.zf.RC,null,null,(0,z.t)(a.Zr,a));a.Ei=(0,window.setTimeout)((0,z.t)(a.MS,a),3E3)};z.aa=[];z.qg=z.qg||{};z.u=this;
z.ma="closure_uid_"+(1E9*Math.random()>>>0);na=0;z.v(z.ta,Error);z.ta.prototype.name="CustomError";var Lc;var Aa,Ba,Ca,Da,Ea,Fa,za;Aa=/&/g;Ba=/</g;Ca=/>/g;Da=/"/g;Ea=/'/g;Fa=/\x00/g;za=/[\x00&<>"']/;z.rg=2147483648*Math.random()|0;z.Xa=Array.prototype;a:{var tg=z.u.navigator;if(tg){var ug=tg.userAgent;if(ug){z.Fb=ug;break a}}z.Fb=""};var kb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");var yg,zg,Ag,pb,Cg,sb;z.F=z.Ga(z.Fb,"Opera")||z.Ga(z.Fb,"OPR");z.C=z.Ga(z.Fb,"Trident")||z.Ga(z.Fb,"MSIE");z.G=z.Ga(z.Fb,"Gecko")&&!z.Ga(z.Fb.toLowerCase(),"webkit")&&!(z.Ga(z.Fb,"Trident")||z.Ga(z.Fb,"MSIE"));z.H=z.Ga(z.Fb.toLowerCase(),"webkit");yg=z.H&&z.Ga(z.Fb,"Mobile");Ag=nb();zg=Ag&&Ag.platform||"";z.vg=z.Ga(zg,"Mac");z.wg=z.Ga(zg,"Win");z.Ga(zg,"Linux");z.xg=!!nb()&&z.Ga(nb().appVersion||"","X11");var Bg=z.Fb;Bg&&z.Ga(Bg,"Android");Bg&&z.Ga(Bg,"iPhone");Bg&&z.Ga(Bg,"iPad");
z.qb=function(){var a="",b;if(z.F&&z.u.opera)return a=z.u.opera.version,z.r(a)?a():a;z.G?b=/rv\:([^\);]+)(\)|;)/:z.C?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:z.H&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(z.Fb))?a[1]:"");return z.C&&(b=ob(),b>(0,window.parseFloat)(a))?String(b):a}();pb={};Cg=z.u.document;sb=Cg&&z.C?ob()||("CSS1Compat"==Cg.compatMode?(0,window.parseInt)(z.qb,10):5):void 0;var wb,vb,yb;wb=null;z.xb=null;vb=null;yb="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.";z.Dg=z.G||z.H||z.F||"function"==typeof z.u.atob;z.w={};z.sa("fyre.conv.config",z.w);z.w.av=!1;z.w.hh="https:"===window.document.location.protocol;z.w.protocol=z.w.hh?"https://":"http://";z.w.Mz="/api/v1.1/";z.w.bf="/api/v3.0/";z.w.FJ="fyre-auth";z.w.GJ=2592E3;z.w.VA="fyre-livecount";z.w.Zb=(z.w.hh?"https://dpstvy7p9whsy.cloudfront.net":"http://avatars.fyre.co")+"/a/anon/50.jpg";z.w.v1=50;z.w.N1={M1:"WARNING"};z.w.mo="livefyre.com";z.w.network=z.w.mo;z.w.Yf=!1;z.w.Du="";z.w.bootstrapS3Prefix=z.w.Du;z.w.af="livefyre.com";z.w.tld=z.w.af;z.w.WI="https://twitter.com/intent/";
z.w.XI="https://platform.twitter.com/widgets.js";z.w.nM="https://d2kmm3vx031a1h.cloudfront.net";z.w.zf={};z.w.zf.PG="/javascripts/livefyre.js";z.w.zf.RC="/javascripts/livefyre_base.js";z.w.zf.aP="/javascripts/livefyre_mod_error.js";z.w.zf.qP="/javascripts/livefyre_mod_featured.js";z.w.zf.hs="/javascripts/livefyre_mod_notifier.js";z.w.EJ="10067";z.w.aj=z.w.EJ;z.w.Yz={Zi:null,rt:null,yd:null,Vl:null,ig:null,wz:null,auth:null,nb:null,stream:null};z.w.K=z.ib(z.w.Yz);
z.w.eI=function(a){var b=z.w;b.Yf=!0;b.mo=a;La(b,a);b.K.auth=b.K.Zi};z.w.set=function(a,b){var c=z.w;switch(a){case "tldPrefix":var d="livefyre.com";b&&(d=b+"."+d,c.Du="/"+d,c.af=d);La(c,c.Yf?c.mo:d);break;case "buildType":Ja(c,b);break;case "assetVersion":c.aj=b;Ma(c);break;case "assetServer":Ma(c,b)}};z.w.set=z.w.set;z.w.Cu=function(a,b){return[z.w.Du,z.w.mo,a,tb(""+b),""].join("/")};z.w.Y_=!1;z.w.oM="http://803d167b95084bdf833d2f95d66a1b3f@sentry.livefyre.com:9000/2";La(z.w,z.w.af);Ja(z.w,3);
z.w.av&&Ja(z.w,0);z.Eg=z.Bb(!1);z.Fg=z.Bb(!0);var Ob;var Ib,Kb=!1,Lb=[];var Qb=0,Tb=2,Ub=3;z.Pb.prototype.then=function(a,b,c){return Zb(this,z.r(a)?a:null,z.r(b)?b:null,c)};z.zb(z.Pb);z.Pb.prototype.cancel=function(a){this.F==Qb&&Gb(function(){var b=new $b(a);Vb(this,b)},this)};z.Pb.prototype.YI=function(a){this.F=Qb;Sb(this,Tb,a)};z.Pb.prototype.ZI=function(a){this.F=Qb;Sb(this,Ub,a)};z.Pb.prototype.lP=function(){for(;this.Ae&&this.Ae.length;){var a=this.Ae;this.Ae=[];for(var b=0;b<a.length;b++)Wb(this,a[b],this.F,this.gh)}this.nv=!1};var cc=Db;z.v($b,z.ta);
$b.prototype.name="cancel";/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
var rc=z.u.setTimeout,mc=z.u.clearTimeout;z.dc.prototype.cancel=function(a){if(this.fg())this.gh instanceof z.dc&&this.gh.cancel();else{if(this.Pa){var b=this.Pa;delete this.Pa;a?b.cancel(a):(b.Ju--,0>=b.Ju&&b.cancel())}this.hH?this.hH.call(this.LD,this):this.Wy=!0;this.fg()||z.ic(this,new qc)}};z.dc.prototype.vD=function(a,b){this.zu=!1;ec(this,a,b)};z.dc.prototype.ia=function(a){gc(this);ec(this,!0,a)};
z.dc.prototype.then=function(a,b,c){var d,f,g=new z.Pb(function(a,b){d=a;f=b});z.jc(this,d,function(a){a instanceof qc?g.cancel():f(a)});return g.then(a,b,c)};z.zb(z.dc);z.dc.prototype.fg=function(){return this.wE};z.v(hc,z.ta);hc.prototype.message="Deferred has already fired";hc.prototype.name="AlreadyCalledError";z.v(qc,z.ta);qc.prototype.message="Deferred was canceled";qc.prototype.name="CanceledError";pc.prototype.eX=function(){delete lc[this.fc];throw this.ag;};var lc={};z.ng={rk:"main"};z.ng.main={yd:!0,Xg:!0,Hh:new z.dc};z.ng.reviews={yd:!0,Xg:!0,Hh:new z.dc};z.ng.debug={Hh:new z.dc};z.ng.sdk={Hh:new z.dc};var vc={},uc={};z.da(z.xc);var Bc=0,Cc={};z.D.prototype.Ja=!1;z.D.prototype.p=function(){if(!this.Ja&&(this.Ja=!0,this.h(),0!=Bc)){var a=z.ja(this);delete Cc[a]}};z.D.prototype.h=function(){if(this.Pj)for(;this.Pj.length;)this.Pj.shift()()};z.v(z.Dc,z.D);z.e=z.Dc.prototype;z.e.fo=1;z.e.vo=0;z.e.subscribe=function(a,b,c){var d=this.Jf[a];d||(d=this.Jf[a]=[]);var f=this.fo;this.se[f]=a;this.se[f+1]=b;this.se[f+2]=c;this.fo=f+3;d.push(f);return f};z.e.ap=z.l(0);z.e.$c=z.l(1);z.e.jp=function(a){if(0!=this.vo)return this.qo||(this.qo=[]),this.qo.push(a),!1;var b=this.se[a];if(b){var c=this.Jf[b];c&&z.Va(c,a);delete this.se[a];delete this.se[a+1];delete this.se[a+2]}return!!b};
z.e.jb=function(a,b){var c=this.Jf[a];if(c){this.vo++;for(var d=z.$a(arguments,1),f=0,g=c.length;f<g;f++){var h=c[f];this.se[h+1].apply(this.se[h+2],d)}this.vo--;if(this.qo&&0==this.vo){for(;c=this.qo.pop();)this.jp(c);this.Ja&&Ec(this)}return 0!=f}return!1};z.e.clear=function(a){if(a){var b=this.Jf[a];b&&(z.x(b,this.jp,this),delete this.Jf[a])}else this.se.length=0,this.Jf={}};z.e.pb=z.l(9);z.e.h=function(){z.Dc.b.h.call(this);if(0!=this.vo)for(var a=1;a<this.se.length;a+=3)this.jp(a);else Ec(this)};z.Dc.prototype.N=z.Dc.prototype.jb;z.v(Fc,z.Dc);var Gg=new Fc("main");z.v(Hc,Fc);Hc.prototype.N=function(a,b){Hc.b.N.call(this,a,b);this.parent.jb(a,b)};Hc.prototype.h=function(){this.parent.$o[this.name].p();delete this.parent.$o[this.name];this.parent=null;Hc.b.h.call(this)};z.jg=z.Gc(Gg,Gg.name+".fyre.conv");z.xc.C();z.jg.Qx=z.jg.jb;z.jg.jb=z.yc(z.jg.jb,z.jg);var Pc,Yc,dd;Pc=!z.C||z.rb(9);Yc=!z.G&&!z.C||z.C&&z.rb(9)||z.G&&z.B("1.9.1");dd=z.C&&!z.B("9");z.Hg=z.C||z.F||z.H;z.Ig=z.C&&!z.rb(9);var Nc={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"},fd={SCRIPT:1,STYLE:1,HEAD:1,IFRAME:1,OBJECT:1},gd={IMG:" ",BR:"\n"};z.e=z.Jc.prototype;z.e.T=z.Ic;z.e.ka=z.l(15);z.e.f=z.l(16);z.e.dg=z.l(17);z.e.n=z.l(18);z.e.r=function(a,b,c){return z.Oc(this.Ka,arguments)};z.e.createElement=function(a){return this.Ka.createElement(a)};
z.e.createTextNode=function(a){return this.Ka.createTextNode(String(a))};z.e.Tu=z.l(19);z.e.hb=z.l(20);z.e.appendChild=function(a,b){a.appendChild(b)};z.e.append=z.Tc;z.e.canHaveChildren=z.Sc;z.e.Jd=z.Uc;z.e.removeNode=z.Vc;z.e.MP=z.Wc;z.e.ec=z.Xc;z.e.ME=z.Zc;z.e.zT=z.ad;z.e.contains=z.bd;z.e.vf=z.l(21);z.e.iQ=z.cd;var pd={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},od=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;var Jg=function(){var a=0;return function(b){var c=a++;return b?b+c:c}}();z.Qd=function(){function a(a,c,d){var f;f=c&&c.hasOwnProperty("constructor")?c.constructor:function(){a.apply(this,arguments)};rd(f,a);b.prototype=a.prototype;f.prototype=new b;c&&rd(f.prototype,c);d&&rd(f,d);f.prototype.constructor=f;f.k1=a.prototype;return f}function b(){}var c=Array.prototype.slice,d=Array.prototype.splice,f={Ni:{on:function(a,b,c){var d;a=a.split(/\s+/);for(var f=this.Xp||(this.Xp={});d=a.shift();){d=f[d]||(f[d]={});var g=d.Bi||(d.Bi=d.next={});g.ia=b;g.G=c;d.Bi=g.next={}}return this},
off:function(a,b,c){var d,f,g,I,J,L;if(f=this.Xp){if(!(a||b||c))return delete this.Xp,this;for(a=a?a.split(/\s+/):z.eb(f);d=a.shift();)if(g=f[d],delete f[d],g&&(b||c))for(I=g.Bi;(g=g.next)!==I;)if(J=g.ia,L=g.G,b&&J!==b||c&&L!==c)this.on(d,J,L);return this}},N:function(a){var b,d,f,g;if(!(f=this.Xp))return this;g=f.all;for((a=a.split(/\s+/)).push(null);b=a.shift();)g&&a.push({next:g.next,Bi:g.Bi,event:b}),(d=f[b])&&a.push({next:d.next,Bi:d.Bi});for(g=c.call(arguments,1);d=a.pop();)for(b=d.Bi,f=d.event?
[d.event].concat(g):g;(d=d.next)!==b;)d.ia.apply(d.G||this,f);return this}}};f.Ni.bind=f.Ni.on;f.Ni.k2=f.Ni.off;f.yh=function(a,b){var c;a||(a={});if(c=z.r(this.xc)?this.xc():this.xc||{})a=rd({},c,a);b&&b.v&&(this.v=b.v);this.attributes={};this.qN={};this.Ig=Jg("c");if(!this.set(a,{Gf:!0}))throw Error("Can't create an invalid model");delete this.xe;this.Hk=z.ib(this.attributes);this.od.apply(this,arguments)};rd(f.yh.prototype,f.Ni,{Gr:"id",od:function(){},toJSON:function(){return z.ib(this.attributes)},
get:function(a){return this.attributes[a]},has:function(a){return null!=this.attributes[a]},set:function(a,b,c){var d,g;z.ia(a)||null==a?(d=a,c=b):(d={},d[a]=b);c||(c={});if(!d)return this;d instanceof f.yh&&(d=d.attributes);if(c.ph)for(g in d)d[g]=void 0;this.Gr in d&&(this.id=d[this.Gr]);b=this.attributes;var s=this.qN,I=this.Hk||{},J=this.xC;this.xe||(this.xe={});this.xC=!0;for(g in d)if(a=d[g],z.qd(b[g],a,[])||delete s[g],c.ph?delete b[g]:b[g]=a,this.hu&&!z.qd(this.xe[g],a,[])&&(this.N("change:"+
g,this,a,c),this.iu=!0),delete this.xe[g],!z.qd(I[g],a,[])||g in b!=g in I||c.wj)this.xe[g]=a;J||(c.Gf||!this.Tg()&&!c.wj||this.bO(c),this.xC=!1);return this},ph:function(a,b){(b||(b={})).ph=!0;return this.set(a,null,b)},clear:function(a){(a||(a={})).ph=!0;return this.set(z.ib(this.attributes),a)},clone:function(){return new this.constructor(this.attributes)},DT:function(){return null==this.id},Lj:function(a,b){a instanceof this.constructor&&z.y(a.attributes,function(a,c){this.set(c,a,b)},this)},
bO:function(a){if(this.hu||!this.Tg())return this;this.iu=this.hu=!0;for(var b in this.xe)this.N("change:"+b,this,this.xe[b],a);for(;this.iu;)this.iu=!1,this.N("change",this,a);this.Hk=z.ib(this.attributes);delete this.xe;this.hu=!1;return this},Tg:function(a){return arguments.length?this.xe&&a in this.xe:!z.gb(this.xe)},oq:function(a){if(!a)return this.Tg()?z.ib(this.xe):!1;var b,c=!1,d=this.Hk,f;for(f in a){var g=b=a[f];z.qd(d[f],g,[])||((c||(c={}))[f]=b)}return c},FV:function(a){return arguments.length&&
this.Hk?this.Hk[a]:null},W1:function(){return z.ib(this.Hk)}});f.um=function(a,b){b||(b={});this.wC();this.od.apply(this,arguments);a&&this.reset(a,{Gf:!0})};rd(f.um.prototype,f.Ni,{Da:f.yh,od:function(){},toJSON:function(){return this.map(function(a){return a.toJSON()})},add:function(a,b){var c,f,g,s,I,J={},L={};b||(b={});a=z.fa(a)?a.slice():[a];c=0;for(f=a.length;c<f;c++){if(!(g=a[c]=this.tN(a[c],b)))throw Error("Can't add an invalid model to a collection");if(J[s=g.Ig]||this.Wp[s]||null!=(I=g.id)&&
(L[I]||this.Gk[I])){if(b.n1)throw Error("Can't add the same model to a collection twice");return}J[s]=L[I]=g}for(c=0;c<f;c++)(g=a[c]).on("all",this.uC,this),this.Wp[g.Ig]=g,null!=g.id&&(this.Gk[g.id]=g);this.length+=f;d.apply(this.rb,[null!=b.eq?b.eq:this.rb.length,0].concat(a));if(b.Gf)return this;c=0;for(f=this.rb.length;c<f;c++)J[(g=this.rb[c]).Ig]&&(b.index=c,g.N("add",g,this,b));return this},remove:function(a,b){var c,d,f,g;b||(b={});a=z.fa(a)?a.slice():[a];c=0;for(d=a.length;c<d;c++)if(g=this.GE(a[c])||
this.get(a[c]))delete this.Gk[g.id],delete this.Wp[g.Ig],f=this.indexOf(g),this.rb.splice(f,1),this.length--,b.Gf||(b.index=f,g.N("remove",g,this,b)),this.vC(g);return this},get:function(a){return null==a?null:this.Gk[null!=a.id?a.id:a]},GE:function(a){return a&&this.Wp[a.Ig||a]},eq:function(a){return this.rb[a]},reset:function(a,b){a||(a=[]);b||(b={});for(var c=0,d=this.rb.length;c<d;c++)this.vC(this.rb[c]);this.wC();this.add(a,{Gf:!0});b.Gf||this.N("reset",this,b);return this},wC:function(){this.length=
0;this.rb=[];this.Gk={};this.Wp={}},tN:function(a,b){a instanceof f.yh?a.v||(a.v=this):(b.v=this,a=new this.Da(a,b));return a},vC:function(a){this==a.v&&delete a.v;a.off("all",this.uC,this)},uC:function(a,b,c,d){if("add"!=a&&"remove"!=a||c==this)"destroy"==a&&this.remove(b,d),b&&a==="change:"+b.Gr&&(delete this.Gk[b.FV(b.Gr)],this.Gk[b.id]=b),this.N.apply(this,arguments)}});var g={forEach:z.x,map:z.Pa,some:z.Qa,contains:z.Ta,indexOf:z.Na,filter:z.Oa};z.y(g,function(a,b){f.um.prototype[b]=function(){return g[b].apply(a,
[this.rb].concat(z.Za(arguments)))}});f.yh.extend=f.um.extend=function(b,c){var d=a(this,b,c);d.extend=this.extend;return d};return f}();z.Ad="StopIteration"in z.u?z.u.StopIteration:Error("StopIteration");z.yd.prototype.next=function(){throw z.Ad;};z.yd.prototype.Ud=function(){return this};z.e=z.Dd.prototype;z.e.pb=z.l(8);z.e.nd=function(){z.Ed(this);for(var a=[],b=0;b<this.gb.length;b++)a.push(this.Fb[this.gb[b]]);return a};z.e.Qh=function(){z.Ed(this);return this.gb.concat()};z.e.Kg=function(a){return z.Fd(this.Fb,a)};z.e.fj=z.l(24);z.e.cl=z.l(26);z.e.ie=z.l(13);z.e.clear=function(){this.Fb={};this.lp=this.Ua=this.gb.length=0};z.e.remove=function(a){return z.Fd(this.Fb,a)?(delete this.Fb[a],this.Ua--,this.lp++,this.gb.length>2*this.Ua&&z.Ed(this),!0):!1};
z.e.get=function(a,b){return z.Fd(this.Fb,a)?this.Fb[a]:b};z.e.set=function(a,b){z.Fd(this.Fb,a)||(this.Ua++,this.gb.push(a),this.lp++);this.Fb[a]=b};z.e.lu=function(a){var b;a instanceof z.Dd?(b=a.Qh(),a=a.nd()):(b=z.eb(a),a=z.db(a));for(var c=0;c<b.length;c++)this.set(b[c],a[c])};z.e.forEach=function(a,b){for(var c=this.Qh(),d=0;d<c.length;d++){var f=c[d],g=this.get(f);a.call(b,g,f,this)}};z.e.clone=function(){return new z.Dd(this)};
z.e.Ud=function(a){z.Ed(this);var b=0,c=this.gb,d=this.Fb,f=this.lp,g=this,h=new z.yd;h.next=function(){for(;;){if(f!=g.lp)throw Error("The map has changed since the iterator was created");if(b>=c.length)throw z.Ad;var h=c[b++];return a?h:d[h]}};return h};z.e=z.Hd.prototype;z.e.pb=z.l(7);z.e.add=function(a){this.Fb.set(Jd(a),a)};z.e.lu=function(a){a=z.vd(a);for(var b=a.length,c=0;c<b;c++)this.add(a[c])};z.e.We=z.l(27);z.e.remove=function(a){return this.Fb.remove(Jd(a))};z.e.clear=function(){this.Fb.clear()};z.e.ie=z.l(12);z.e.contains=function(a){return this.Fb.Kg(Jd(a))};z.e.ex=z.l(28);z.e.nd=function(){return this.Fb.nd()};z.e.clone=function(){return new z.Hd(this)};z.e.cl=z.l(25);z.e.Ud=function(){return this.Fb.Ud(!1)};z.e=Kd.prototype;z.e.getName=function(){return this.DU};z.e.getParent=function(){return this.Pa};z.e.ec=function(){this.ma||(this.ma={});return this.ma};z.e.log=function(){};z.e.info=function(){};z.e.pD=function(){};var Nd={},Md=null;z.v(z.Od,z.Qd.yh);var Pd={QX:"all",ut:"add",Nf:"change",NY:"destroy",ERROR:"error",Vt:"remove",iM:"reset",E0:"sync",c1:"visible"};z.Od.prototype.jc=z.Rd;z.Od.prototype.set=function(a,b){return z.Qd.yh.prototype.set.apply(this,arguments)};z.Od.prototype.update=function(a,b,c){var d;z.ia(a)||null==a?(d=a,c=b):(d={},d[a]=b);return this.oq(d)?this.set(d,c):this};z.Od.prototype.reset=function(a){var b=this.xc;if(z.fa(a))for(var c=0;c<a.length;c++)delete b[a[c]];this.set(b)};z.Kg={};z.Kg.avatar=z.w.Zb;z.Kg.custom=!1;z.Kg.display_name="";z.Kg.handle="";z.Kg.jid="";z.Kg.name=null;z.Kg.profile_url="";z.Kg.provider="";z.Kg.prefix="@";var Ud="closure_memoize_cache_";z.v(z.Vd,z.Od);z.Lg={rk:1,DK:2,vc:3,tc:4,mN:5,JZ:6,wk:7,Ep:8,$M:9};z.Mg={1:"Livefyre",3:"Twitter",4:"Facebook",8:"Instagram",5:"YouTube",6:"Google+",7:"LinkedIn",9:"Tumblr"};z.Wd={wb:"avatar",tp:"bio",Ag:"connections",Xz:"createdAt",sk:"defaultAvatar",ua:"displayName",iK:"key",uA:"firstName",Ap:"handle",W:"id",PA:"lastName",eL:"likes",Wb:"profileUrl",Cb:"rating",vd:"tags",Oa:"type",URL:"url",Y0:"userId"};
z.Vd.prototype.xc=function(){var a=z.Wd,b={};b[a.wb]=z.w.Zb;b[a.sk]=z.w.Zb;b[a.Cb]=5;b[a.vd]=[];b[a.Oa]=1;return b};z.Vd.prototype.gQ=z.Sd(function(){var a=this.get(this.k.Oa);return a in z.Mg?z.Mg[a]:z.Mg[1]});z.Vd.prototype.mm=z.l(30);z.Vd.prototype.Rb=function(){return/^guest-/.test(this.get(this.k.W))};z.Ng=new RegExp(/(tw\.gw\.livefyre\.com|twitter\.com)$/);z.Vd.prototype.mc=z.l(31);z.Og=new RegExp(/(fb\.gw\.livefyre\.com|facebook\.com)$/);z.Vd.prototype.je=z.l(32);z.Vd.prototype.di=z.l(33);
z.Vd.prototype.Oe=z.l(34);z.Vd.prototype.fx=z.l(35);var Rg;z.Pg={wb:"avatar",Mi:"custom",ua:"display_name",Ap:"handle",W:"id",Jt:"jid",yk:"name",oB:"prefix",Wb:"profile_url",Ak:"provider",Cg:"reply",Oa:"type",jC:"uid"};z.Qg={tc:"facebook",Ot:"livefyre",vc:"twitter",Ep:"instagram"};Rg=z.Pg;z.Sg={};z.Sg[Rg.wb]="";z.Sg[Rg.Mi]=!1;z.Sg[Rg.ua]="";z.Sg[Rg.Ap]="";z.Sg[Rg.Jt]="";z.Sg[Rg.yk]=null;z.Sg[Rg.Wb]="";z.Sg[Rg.Ak]="";z.Sg[Rg.oB]="@";var Yd,Ug;Yd={"avatars-qa.fyre.co":"d25bq1kaa0xeba.cloudfront.net","avatars-staging.fyre.co":"d10g4z0y9q0fip.cloudfront.net","avatars.fyre.co":"dpstvy7p9whsy.cloudfront.net","a0.twimg.com":"si0.twimg.com"};z.Tg={};Ug=z.Qg;z.Tg[Ug.tc]=z.Lg.tc;z.Tg[Ug.Ot]=z.Lg.rk;z.Tg[Ug.vc]=z.Lg.vc;z.v(z.Zd,z.D);var be=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,ae=z.H;z.e=z.ce.prototype;z.e.ti="";z.e.ik="";z.e.ij="";z.e.Sl=null;z.e.ni="";z.e.wn="";z.e.ET=!1;z.e.Ne=!1;
z.e.toString=function(){var a=[],b=this.ti;b&&a.push(me(b,Vg,!0),":");if(b=this.ij){a.push("//");var c=this.ik;c&&a.push(me(c,Vg,!0),"@");a.push((0,window.encodeURIComponent)(String(b)).replace(/%25([0-9a-fA-F]{2})/g,"%$1"));b=this.Sl;null!=b&&a.push(":",String(b))}if(b=this.ni)this.ij&&"/"!=b.charAt(0)&&a.push("/"),a.push(me(b,"/"==b.charAt(0)?Wg:Xg,!0));(b=this.Id.toString())&&a.push("?",b);(b=this.wn)&&a.push("#",me(b,Yg));return a.join("")};
z.e.resolve=function(a){var b=this.clone(),c=!!a.ti;c?z.de(b,a.ti):c=!!a.ik;if(c){var d=a.ik;ee(b);b.ik=d}else c=!!a.ij;c?z.fe(b,a.ij):c=null!=a.Sl;d=a.ni;if(c)ge(b,a.Sl);else if(c=!!a.ni){if("/"!=d.charAt(0))if(this.ij&&!this.ni)d="/"+d;else{var f=b.ni.lastIndexOf("/");-1!=f&&(d=b.ni.substr(0,f+1)+d)}f=d;if(".."==f||"."==f)d="";else if(z.Ga(f,"./")||z.Ga(f,"/.")){for(var d=0==f.lastIndexOf("/",0),f=f.split("/"),g=[],h=0;h<f.length;){var k=f[h++];"."==k?d&&h==f.length&&g.push(""):".."==k?((1<g.length||
1==g.length&&""!=g[0])&&g.pop(),d&&h==f.length&&g.push("")):(g.push(k),d=!0)}d=g.join("/")}else d=f}c?z.he(b,d):c=""!==a.Id.toString();c?z.ie(b,ke(a.Id.toString())):c=!!a.wn;c&&je(b,a.wn);return b};z.e.clone=function(){return new z.ce(this)};z.e.Hy=function(a){this.Ne=a;this.Id&&this.Id.Hy(a);return this};var Vg=/[#\/\?@]/g,Xg=/[\#\?:]/g,Wg=/[\#\?]/g,ne=/[\#\?@]/g,Yg=/#/g;z.e=z.le.prototype;z.e.Ob=null;z.e.Ua=null;z.e.pb=z.l(6);
z.e.add=function(a,b){z.se(this);this.de=null;a=te(this,a);var c=this.Ob.get(a);c||this.Ob.set(a,c=[]);c.push(b);this.Ua++;return this};z.e.remove=function(a){z.se(this);a=te(this,a);return this.Ob.Kg(a)?(this.de=null,this.Ua-=this.Ob.get(a).length,this.Ob.remove(a)):!1};z.e.clear=function(){this.Ob=this.de=null;this.Ua=0};z.e.ie=z.l(11);z.e.Kg=function(a){z.se(this);a=te(this,a);return this.Ob.Kg(a)};z.e.fj=z.l(23);
z.e.Qh=function(){z.se(this);for(var a=this.Ob.nd(),b=this.Ob.Qh(),c=[],d=0;d<b.length;d++)for(var f=a[d],g=0;g<f.length;g++)c.push(b[d]);return c};z.e.nd=function(a){z.se(this);var b=[];if(z.p(a))this.Kg(a)&&(b=z.Ya(b,this.Ob.get(te(this,a))));else{a=this.Ob.nd();for(var c=0;c<a.length;c++)b=z.Ya(b,a[c])}return b};z.e.set=function(a,b){z.se(this);this.de=null;a=te(this,a);this.Kg(a)&&(this.Ua-=this.Ob.get(a).length);this.Ob.set(a,[b]);this.Ua++;return this};
z.e.get=function(a,b){var c=a?this.nd(a):[];return 0<c.length?String(c[0]):b};z.e.toString=function(){if(this.de)return this.de;if(!this.Ob)return"";for(var a=[],b=this.Ob.Qh(),c=0;c<b.length;c++)for(var d=b[c],f=(0,window.encodeURIComponent)(String(d)),d=this.nd(d),g=0;g<d.length;g++){var h=f;""!==d[g]&&(h+="\x3d"+(0,window.encodeURIComponent)(String(d[g])));a.push(h)}return this.de=a.join("\x26")};z.e.clone=function(){var a=new z.le;a.de=this.de;this.Ob&&(a.Ob=this.Ob.clone(),a.Ua=this.Ua);return a};
z.e.Hy=function(a){a&&!this.Ne&&(z.se(this),this.de=null,this.Ob.forEach(function(a,c){var d=c.toLowerCase();c!=d&&(this.remove(c),qe(this,d,a))},this));this.Ne=a};z.e.extend=function(a){for(var b=0;b<arguments.length;b++)xd(arguments[b],function(a,b){this.add(b,a)},this)};var we="GET";ve.prototype.send=z.n;ve.prototype.abort=function(){this.ca&&this.ca.abort()};ve.prototype.wa=function(a){if(a&&z.p(a))try{a=jd(a)}catch(b){}this.dt(a)};ve.prototype.sa=function(a){if(a&&z.p(a))try{a=jd(a)}catch(b){}this.Qq(a)};z.v(ze,ve);ze.prototype.send=function(a,b){this.ca.open(this.method,xe(this,a).toString(),!0);z.ia(b)&&z.y(b,function(a,b){this.ca.setRequestHeader(b,a)},this);this.ca.withCredentials=this.withCredentials;this.ca.onreadystatechange=(0,z.t)(this.ia,this);this.ca.send(ye(this,a))};ze.prototype.ia=function(){4!==this.ca.readyState||200!==this.ca.status&&304!==this.ca.status?4===this.ca.readyState&&this.sa(this.ca.responseText):this.wa(this.ca.responseText)};z.v(Ae,ve);Ae.prototype.send=function(a){this.ca.open(this.method,xe(this,a).toString());this.ca.timeout=1E3*this.timeout;this.ca.onload=(0,z.t)(function(){this.ia("success",this.ca.responseText)},this);this.ca.onerror=this.ca.ontimeout=(0,z.t)(function(){this.ia("failure",this.ca.responseText)},this);this.ca.onprogress=z.n;this.ca.send(ye(this,a))};Ae.prototype.ia=function(a,b){var c={};if("success"===a){try{if(c=jd(b),200!==c.code&&304!==c.code){this.sa(b);return}}catch(d){}this.wa(b)}else this.sa(b)};var Ge=0,Fe=1;z.v(Ee,z.ta);var Zg=0;Ie.prototype.send=function(a,b,c,d){a=a||null;d=d||"_"+(Zg++).toString(36)+z.ra().toString(36);z.u._callbacks_||(z.u._callbacks_={});var f=this.kJ.clone();if(a)for(var g in a)a.hasOwnProperty&&!a.hasOwnProperty(g)||pe(f,g,a[g]);b&&(z.u._callbacks_[d]=Le(d,b),pe(f,this.ZN,"_callbacks_."+d));b=Be(f.toString(),{timeout:this.Di,hO:!0});z.jc(b,null,Je(d,a,c),void 0);return{fc:d,Ih:b}};Ie.prototype.cancel=function(a){a&&(a.Ih&&a.Ih.cancel(),a.fc&&Ke(a.fc,!1))};z.v(Me,ve);Me.prototype.nz=function(a){a&&"error"==a.status?this.sa(a):this.wa(a)};Me.prototype.send=function(a){a=a||{};"POST"==this.method&&(z.p(a)&&(a={_body:a}),a._method="POST");this.ca.kJ=this.url;a instanceof z.Dd&&(a=z.Gd(a));this.SH=this.ca.send(a,(0,z.t)(this.nz,this),(0,z.t)(this.sa,this))};Me.prototype.abort=function(){this.ca.cancel(this.SH);this.sa()};z.v(Ne,ve);var Oe=z.w.K.Vl;Ne.prototype.send=function(a){this.Ww?this.Ay(a):this.Es=a};Ne.prototype.Ay=function(a){z.u.addEventListener("message",(0,z.t)(this.MH,this));a={url:xe(this).toString(),data:ye(this,a)};this.jT.postMessage(JSON.stringify(a),this.iG)};Ne.prototype.mH=function(){this.Ww=!0;this.Es&&(this.send(this.Es),this.Es=null);z.u.removeEventListener("message",(0,z.t)(this.mH,this))};
Ne.prototype.MH=function(a){z.u.removeEventListener("message",(0,z.t)(this.MH,this));a.origin===z.w.K.Vl&&(a=JSON.parse(a.data),/200|304/.test((0,window.parseInt)(a.code,10))?this.wa(a):this.sa(a))};var $g,ah;z.v(z.Pe,ve);z.Pe.prototype.wa=function(a){z.Pe.b.wa.call(this,a)};z.Pe.prototype.sa=function(a){z.Pe.b.sa.call(this,a)};z.Pe.prototype.send=function(a,b){this.ca.url=this.url;this.ca.send(a,b)};$g=window.document.location.protocol;ah=z.r(window.postMessage)&&z.ia(JSON);z.Re="file:"==$g?"jsonp":"https:"==$g&&ah?"postmessage":window.XMLHttpRequest&&"withCredentials"in new window.XMLHttpRequest?"CORS":"jsonp";z.v(z.Se,z.Zd);z.da(z.Se);z.bh="collCreated";z.bh="collection_created";z.v(z.Te,z.Od);var ch;z.Te.prototype.k=ch={W:"id",wb:"avatar",yk:"name",Ak:"provider"};z.Te.prototype.GM={vc:"tw",tc:"fb"};z.Te.prototype.xc=function(){var a={};a[ch.wb]=z.w.Zb;return a};z.Te.prototype.mm=z.l(29);z.v(z.Ue,z.Od);z.Ue.prototype.k=z.We={wb:"avatar",ok:"bp_channel",Ag:"connections",sk:"defaultAvatar",ua:"displayName",tk:"eref_keys",xh:"guest",W:"id",Jt:"jid",Qd:"moderator",Gm:"oauthTokens",Qi:"posted",Wb:"profileUrl",Cb:"rating",pM:"settingsUrl",vd:"tags",Td:"token",eC:"tokeExp",du:"tokenTTL"};
z.Ue.prototype.xc=function(){var a={};a[z.We.wb]=z.w.Zb;a[z.We.sk]=z.w.Zb;a[z.We.ok]=null;a[z.We.Ag]={};a[z.We.ua]="";a[z.We.tk]=[];a[z.We.Gm]={};a[z.We.Qd]=!1;a[z.We.Qi]=!1;a[z.We.Cb]=5;a[z.We.vd]=[];a[z.We.Td]="";return a};z.Ue.prototype.Rb=function(){return/^guest-/.test(this.get(z.We.W))};z.Ue.prototype.eb=z.l(36);z.Xe.prototype.od=function(a){this.ha=a};z.v(z.Ye,z.Xe);z.Ye.prototype.od=function(a,b){this.G=b.G;this.parent=b;td(this,b.G)};z.Ye.prototype.p=function(){this.h();ud(this,this.parent.G);delete this.G;delete this.parent};z.Ye.prototype.h=function(){};z.v(Ze,z.Ye);Ze.prototype.od=function(a,b){this.ha=a;this.sb=b;Ze.b.od.call(this,a,b)};Ze.prototype.$R=function(){this.sb.yf()};z.sd(["render_complete"],Ze.prototype.$R);Ze.prototype.WT=function(){z.Mf(this.sb);Nf(this.sb)};z.sd(["user_logged_in"],Ze.prototype.WT);Ze.prototype.DQ=function(){var a=z.rf();if(!z.E.id&&z.tf(a))this.sb.yf(!0);else{var b=z.Kf(),a=b.delegate.getUserPermissions;z.E.id&&z.r(a)&&a(z.E.get("token"),function(a,d,f){a||b.Hn({data:f})})}};z.sd([z.bh],Ze.prototype.DQ);z.bf=/\s*;\s*/;z.e=z.$e.prototype;z.e.isEnabled=function(){return window.navigator.cookieEnabled};z.e.set=function(a,b,c,d,f,g){if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');z.ba(c)||(c=-1);f=f?";domain\x3d"+f:"";d=d?";path\x3d"+d:"";g=g?";secure":"";c=0>c?"":0==c?";expires\x3d"+(new Date(1970,1,1)).toUTCString():";expires\x3d"+(new Date(z.ra()+1E3*c)).toUTCString();this.Ka.cookie=a+"\x3d"+b+f+d+c+g};
z.e.get=function(a,b){for(var c=a+"\x3d",d=(this.Ka.cookie||"").split(z.bf),f=0,g;g=d[f];f++){if(0==g.lastIndexOf(c,0))return g.substr(c.length);if(g==a)return""}return b};z.e.remove=function(a,b,c){var d=this.Kg(a);this.set(a,"",0,b,c);return d};z.e.Qh=function(){return z.af(this).keys};z.e.nd=function(){return z.af(this).Ez};z.e.ie=z.l(10);z.e.pb=z.l(5);z.e.Kg=function(a){return z.ba(this.get(a))};z.e.fj=z.l(22);z.e.clear=function(){for(var a=z.af(this).keys,b=a.length-1;0<=b;b--)this.remove(a[b])};
z.dh=new z.$e(window.document);z.dh.r_=3950;z.v(df,cf);df.prototype.get=function(a){a=z.dh.get(a);return z.ba(a)?a:null};df.prototype.set=function(a,b){z.dh.set(a,b,604800)};df.prototype.remove=function(a){z.dh.remove(a)};z.v(z.ef,cf);z.ef.prototype.pb=z.l(4);z.ef.prototype.clear=function(){var a=Cd(this.Ud(!0)),b=this;z.x(a,function(a){b.remove(a)})};z.v(z.ff,z.ef);z.e=z.ff.prototype;z.e.wG=function(){if(!this.Ec)return!1;try{return this.Ec.setItem("__sak","1"),this.Ec.removeItem("__sak"),!0}catch(a){return!1}};z.e.set=function(a,b){try{this.Ec.setItem(a,b)}catch(c){if(0==this.Ec.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};z.e.get=function(a){a=this.Ec.getItem(a);if(!z.p(a)&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};z.e.remove=function(a){this.Ec.removeItem(a)};
z.e.pb=z.l(3);z.e.Ud=function(a){var b=0,c=this.Ec,d=new z.yd;d.next=function(){if(b>=c.length)throw z.Ad;var d=c.key(b++);if(a)return d;d=c.getItem(d);if(!z.p(d))throw"Storage mechanism: Invalid value was encountered";return d};return d};z.e.clear=function(){this.Ec.clear()};z.e.key=function(a){return this.Ec.key(a)};z.v(gf,z.ff);z.v(z.hf,z.ef);var mf={".":".2E","!":".21","~":".7E","*":".2A","'":".27","(":".28",")":".29","%":"."},kf=null;z.e=z.hf.prototype;z.e.sd=null;z.e.kz=null;z.e.wG=function(){return!!this.sd};z.e.set=function(a,b){this.sd.setAttribute(lf(a),b);nf(this)};z.e.get=function(a){a=this.sd.getAttribute(lf(a));if(!z.p(a)&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};z.e.remove=function(a){this.sd.removeAttribute(lf(a));nf(this)};z.e.pb=z.l(2);
z.e.Ud=function(a){var b=0,c=z.of(this).attributes,d=new z.yd;d.next=function(){if(b>=c.length)throw z.Ad;var d=c[b++];if(a)return(0,window.decodeURIComponent)(d.nodeName.replace(/\./g,"%")).substr(1);d=d.nodeValue;if(!z.p(d))throw"Storage mechanism: Invalid value was encountered";return d};return d};z.e.clear=function(){for(var a=z.of(this),b=a.attributes.length;0<b;b--)a.removeAttribute(a.attributes[b-1].nodeName);nf(this)};z.da(z.pf);z.pf.prototype.get=function(a){try{var b=z.hd(this.Ec.get(a))}catch(c){return null}if(!b)return null;var d=b.value,f=(new Date).getTime();return(b=b.expiration||b.ttl)&&b<f?(this.remove(a),null):d};z.pf.prototype.set=function(a,b,c){var d=null;c&&(d=(new Date).getTime()+1E3*c);b={value:b,expiration:d};try{this.Ec.set(a,z.kd(b))}catch(f){}};z.pf.prototype.remove=function(a){try{this.Ec.remove(a)}catch(b){}};var sf;z.v(qf,z.D);var uf=z.w.FJ;z.sa("fyre.conv.service.RemoteAuthDelegate",z.wf);z.wf.prototype.yf=function(a,b){if(b){var c=z.E.k,d=z.rf(),f=d.rd.get("fyre-authentication-creds"),g=z.tf(d);z.p(b)&&z.E.set(c.Td,b);g&&f===b?a.success(g):(d.rd.remove(uf),a.failure())}};z.wf.prototype.loginByCookie=z.wf.prototype.yf;z.wf.prototype.login=function(){};z.wf.prototype.login=z.wf.prototype.login;z.wf.prototype.logout=function(a){a.success()};z.wf.prototype.logout=z.wf.prototype.logout;
z.wf.prototype.viewProfile=function(a,b){var c=b.profileUrl;c&&z.vf(c,{target:"_blank"})};z.wf.prototype.viewProfile=z.wf.prototype.viewProfile;z.v(z.zf,z.Zd);z.da(z.zf);z.zf.prototype.logout=function(a,b){this.Ed.info("Requesting logout.");(new z.Pe({url:z.w.K.auth+"/auth/logout/ajax/?nocache\x3d"+(new Date).getTime(),wa:a,sa:b})).send()};z.zf.prototype.nl=z.l(38);z.sa("fyre.conv.service.LivefyreAuthDelegate",z.Bf);z.Bf.prototype.yf=function(a){var b=z.tf(z.rf());b?a.success(b):a.failure(b)};z.Bf.prototype.loginByCookie=z.Bf.prototype.yf;z.Bf.prototype.login=function(a){Cf(this,function(b){"profile"in b.data?a.success.apply(a,arguments):a.failure.apply(a,arguments)},a.failure)};z.Bf.prototype.login=z.Bf.prototype.login;
z.Bf.prototype.CI=function(a,b){var c=this.d.Jc,d=100;if(z.Df){if(z.E.id){a();return}if(25<this.sy){b();return}-1<this.sy&&c.qn(a,b);d=7500;this.sy++}else{var f;if(this.wH)try{f=!1===this.wH.closed}catch(g){if(z.F)f=!0;else throw g;}else f=!1;if(!f){(0,window.clearTimeout)(this.l1);c.qn(a,b);return}}this.oi=(0,window.setTimeout)((0,z.t)(this.CI,this,a,b),d)};z.Bf.prototype.logout=function(a){z.E.Rb()?a.success():z.zf.C().logout((0,z.t)(a.success,a))};z.Bf.prototype.logout=z.Bf.prototype.logout;
z.Bf.prototype.viewProfile=function(a,b){z.vf(b.profileUrl,{target:"_blank"})};z.Bf.prototype.viewProfile=z.Bf.prototype.viewProfile;z.Bf.prototype.editProfile=function(){z.vf(z.w.K.nX+"/profile/edit/info/",{target:"_blank"})};z.Bf.prototype.editProfile=z.Bf.prototype.editProfile;z.v(z.Ef,z.Zd);z.da(z.Ef);z.Ef.prototype.lc=function(a,b,c,d,f){var g=new z.ce(z.w.K.yd+b);b={wa:c,sa:d,method:"GET"};z.oe(g,a.Rb()?"lfgtoken":"lftoken",a.get(a.k.Td));z.y(f||{},function(a,b){z.oe(g,b,a)});b.url=g.toString();return new z.Pe(b)};z.Ef.prototype.Uv=function(a,b,c,d){this.lc(a,z.w.Mz+"public/social/friends/",c,d).send({wj:z.ha(b)?b:!1})};z.Ef.prototype.dr=z.l(39);z.v(z.Ff,z.Qd.um);z.v(z.Gf,z.D);z.Gf.prototype.N=function(a,b){this.G.N(a,b)};z.v(z.Jf,z.Gf);z.e=z.Jf.prototype;z.e.login=function(a,b,c){var d=(0,z.t)(function(a){a&&this.Hn(a);b=b||z.n;if(z.E.id)z.E.off(z.E.jc("id"),d),b();else z.E.on(z.E.jc("id"),d)},this);If("login",{base:function(){throw"Login delegate function must be provided";},success:d,failure:function(){(c||z.n)();z.E.off(z.E.jc("id"),d)}}).call(this)};
z.e.yf=If("loginByCookie",{success:function(a){var b=Ve(a);b&&b.moderator&&a.articleId!=this.ha.articleId||a.siteId!=this.ha.siteId?this.qn():z.gb(b)||(0,z.Vf)((0,z.t)(this.QG,this,b,a))},failure:function(){this.qn()}});
z.e.qn=If("fetchAuthData",{base:function(a,b){z.Se.C();var c=z.ib(this.ha),d=z.E.k,f=z.E.get(d.Td),d=z.E.get(d.ok);f&&z.p(f)&&(c.lftoken=f);d&&(c.bp_channel=d);c.trusted_auth_source=4==this.delegate.type;var f=z.Cb((0,z.t)(this.Hn,this),a||z.n),d=b||z.n,g={},h=z.w.K.auth+z.w.bf+"auth/";c.lftoken&&(g.lftoken=c.lftoken);c.bp_channel&&(g.bp_channel=c.bp_channel);c.collectionId?g.collectionId=c.collectionId:(g.siteId=c.siteId,g.articleId=tb(""+c.articleId));c.trusted_auth_source&&(g.trusted_auth_source=
c.trusted_auth_source);(new z.Pe({url:h,timeout:1E4,wa:f,sa:d})).send(g)}});z.e.viewProfile=If("viewProfile");z.e.editProfile=If("editProfile");z.e.Hn=function(a){a=z.ib(a.data);var b=Ve(a),c=b[z.We.du]||z.w.GJ;if(!z.gb(b)){a.siteId=this.ha.siteId;a.articleId=this.ha.articleId;var d=z.rf();d.rd.set(uf,a,c);(c=a.auth_token)&&d.rd.set("fyre-authentication-creds",c.value,c.ttl);this.QG(b,a)}};
z.e.QG=function(a,b){a.avatar=z.Xd(a.avatar);z.x((b.permissions||{}).authors||[],(0,z.t)(this.PS,this,a));z.E.set(a);this.N("user_logged_in")};z.e.PS=function(a,b){a[z.We.tk].push(b[z.Wd.iK]);this.N("login_author_received",a)};z.e.logout=If("logout",{success:function(){this.Re()}});z.e.Re=function(){var a=z.rf();this.yv=null;this.Uo.reset();z.E.clear({Gf:!0});z.E.set(z.E.xc());a.rd.remove(uf);a.rd.remove("fyre-authentication-creds");this.it&&(0,window.clearTimeout)(this.it);this.N("user_logged_out")};
z.e.nl=z.l(37);z.e.DF=z.l(40);z.e.CF=z.l(41);z.e.wS=function(a,b){a(b);var c=0,d=z.fb(b,"data","friends"),f=d.length;(0,window.setTimeout)((0,z.t)(function(){if(c!==f){var a=d[c];this.Uo.get(a.id)||this.Uo.add(new z.Te(a));c++;(0,window.setTimeout)((0,z.t)(arguments.callee,this),0)}},this),0);z.E.set(z.mb(z.We.Ag,z.fb(b,"data","reconnect")));z.E.N("changed:"+z.We.Ag)};z.e.Uv=function(){return this.Uo};z.v(z.Pf,Of);z.Pf.prototype.reset=function(){this.Yb[0]=1732584193;this.Yb[1]=4023233417;this.Yb[2]=2562383102;this.Yb[3]=271733878;this.jt=this.Wm=0};z.Pf.prototype.update=function(a,b){z.ba(b)||(b=a.length);for(var c=b-this.Gg,d=this.PN,f=this.Wm,g=0;g<b;){if(0==f)for(;g<=c;)Qf(this,a,g),g+=this.Gg;if(z.p(a))for(;g<b;){if(d[f++]=a.charCodeAt(g++),f==this.Gg){Qf(this,d);f=0;break}}else for(;g<b;)if(d[f++]=a[g++],f==this.Gg){Qf(this,d);f=0;break}}this.Wm=f;this.jt+=b};var Zf={l_:"identity/login",o_:"identity/logout"};z.e=Uf.prototype;z.e.In=function(a){var b=z.Kf(),c;c=eh;var d=z.E.k,f=z.rf(),d=a.messageURL||z.E.get(d.ok),g=Tf(z.kd(a));c=(f=f.rd.get("fyre-backplane-cache"))&&d===f[c.Sz]&&g===f[c.th]?!0:!1;f=a.type;b.delegate=b.delegate||this;switch(f){case "identity/login":if(c){b.yf(!0);break}f=eh;d=z.E.k;c=z.rf();d=a.messageURL||z.E.get(d.ok);a=Tf(z.kd(a));a=z.mb(f.Sz,d,f.th,a);c.rd.set("fyre-backplane-cache",a);b.qn();break;case "identity/logout":b.logout()}};
z.e.login=function(){};z.e.logout=function(){this.UC=(0,window.setTimeout)((0,z.t)(this.so,this,0),100)};z.e.so=function(a){var b=this.Vf.getChannelID(),b=b&&this.FD!==b;(0,window.clearTimeout)(this.UC);b||50===a?this.Re():(a=++a,this.UC=(0,window.setTimeout)((0,z.t)(this.so,this,a),100))};z.e.Re=function(){var a=z.Kf(),b=z.rf();a.Re();b.rd.remove("fyre-backplane-cache");this.FD=this.Vf.getChannelID()};z.v($f,Uf);$f.prototype.od=function(){Wf(this.Vf.getChannelID()||null);Xf(this);ag(this,(0,z.t)(this.xQ,this))};$f.prototype.xQ=function(a){z.Ua(a)||(a=Yf(this,a))&&this.In(a.message)};$f.prototype.Re=function(){$f.b.Re.call(this);Wf(this.Vf.getChannelID()||null)};$f.prototype.oE=function(a){return a.message.type};z.v(bg,Uf);bg.prototype.od=function(){Xf(this);var a=this.Vf.getCachedMessages();z.Ua(a)||(a=Yf(this,a))&&this.In(a)};bg.prototype.In=function(a){Wf(a.messageURL);bg.b.In.call(this,a)};bg.prototype.Re=function(){bg.b.Re.call(this);Wf(null);Xf(this)};bg.prototype.oE=function(a){return a.type};z.sa("fyre.conv.service.BackplaneAuthDelegate",cg);var eh={Sz:"channel",th:"checksum"},dg={hN:/1\.2\.[0-9]/,$0:/2\.0\.[0-9]/};cg.prototype.login=function(){};cg.prototype.login=cg.prototype.login;cg.prototype.logout=function(){this.Vf.logout()};cg.prototype.logout=cg.prototype.logout;cg.prototype.yf=function(a,b){if(b){var c=z.tf(z.rf());c&&"profile"in c?a.success(c):a.failure(c)}};cg.prototype.loginByCookie=cg.prototype.yf;var fh,gh,hh,ih,jh,kh,lh;lh=kh=jh=ih=hh=gh=fh=!1;var mh=z.Fb;mh&&(-1!=mh.indexOf("Firefox")?fh=!0:-1!=mh.indexOf("Camino")?gh=!0:-1!=mh.indexOf("iPhone")||-1!=mh.indexOf("iPod")?hh=!0:-1!=mh.indexOf("iPad")?ih=!0:-1!=mh.indexOf("Chrome")?kh=!0:-1!=mh.indexOf("Android")?jh=!0:-1!=mh.indexOf("Safari")&&(lh=!0));z.nh=fh;z.oh=gh;z.ph=hh;z.og=ih;z.qh=jh;z.rh=kh;z.Df=lh;var sh;sh=z.Fb;z.th=(z.fg=yg||z.qh||-1<sh.indexOf("IEMobile"))&&!z.og;z.v(eg,z.wf);z.sa("fyre.conv.service.SPAuthDelegate",eg);var hg={Fp:"auth_login_complete",vL:"auth_logout_complete",Pt:"auth_login_incomplete"};eg.prototype.login=function(a){function b(){a.failure();z.u.fyre.sp.off(hg.Pt,b);z.u.fyre.sp.off(hg.Fp,c)}function c(){a.success();z.u.fyre.sp.off(hg.Fp,c);z.u.fyre.sp.off(hg.Pt,b)}ig(this);this.jE.signIn();z.u.fyre.sp.on(hg.Fp,c);z.u.fyre.sp.on(hg.Pt,b)};eg.prototype.login=eg.prototype.login;eg.prototype.logout=function(){ig(this);this.jE.signOut()};
eg.prototype.logout=eg.prototype.logout;eg.prototype.viewProfile=function(a,b){var c;ig(this);if(b.isCuratedAuthor){if(c=b.profileUrl)this.DG?window.location.href=c:z.vf(b.profileUrl,{target:"_blank"})}else b.id!=z.E.get(z.E.k.W)&&(c=b.id.split("@")[0]),this.profiles.viewProfile(c)};eg.prototype.viewProfile=eg.prototype.viewProfile;eg.prototype.editProfile=function(){ig(this);this.profiles.editProfile()};eg.prototype.editProfile=eg.prototype.editProfile;var uh;z.sa("fyre.conv.LivefyreAuthDelegate",z.Bf);z.Bf.prototype.type=2;z.sa("fyre.conv.SPAuthDelegate",eg);eg.prototype.type=4;z.sa("fyre.conv.BackplaneAuthDelegate",cg);cg.prototype.type=1;z.sa("fyre.conv.RemoteAuthDelegate",z.wf);z.wf.prototype.type=3;z.Vf=function(){function a(a){z.jc(b,a,null,void 0)}var b=new z.dc;a.N=function(){b.ia()};a.fg=function(){return b.fg()};return a}();z.sa("fyre.conv.ready",z.Vf);z.Vf.trigger=z.Vf.N;z.Vf.hasFired=z.Vf.fg;uh=z.fb(z.u,"fyre","conv","user");
z.E=uh&&!z.gb(uh)?uh:new z.Ue;z.sa("fyre.conv.user",z.E);z.E.on=z.E.on;z.E.get=z.E.get;z.E.off=z.E.off;z.sa("fyre.conv.login",yf);z.sa("fyre.conv.logout",function(){z.Kf().Re()});z.sa("fyre.conv.getDelegate",function(){return z.Kf().delegate});kg.uG=!1;z.sa("fyre.conv.initializeGlobalServices",kg);yb="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_\x3d";z.t=pa;z.sa("fyre.conv.load",lg);lg.XT=function(a,b,c){return lg.RG(a,b,c)};z.sa("fyre.conv.load.makeArticleId",lg.XT);lg.RG=function(a,b,c){var d,f=new z.le;a||(a=lg.HE());a||(a=window.location.href);d=new z.ce(a);z.p(b)&&(b=[b]);b&&z.x(b,function(a){f.add(a,d.Id.get(a))});z.ie(d,f);c||je(d,"");return d.toString()};z.sa("fyre.conv.load.makeCollectionUrl",lg.RG);
lg.HE=function(){for(var a=window.document.getElementsByTagName("link"),b=0,c=a.length,d;b<c;b++)if(d=a[b],"canonical"==d.rel)return d.href};z.sa("fyre.conv.load.getCanonicalLinkRel",lg.HE);z.sa("fyre.conv.Loader",mg);z.e=mg.prototype;z.e.YP=function(a){var b;z.p(a)?a={appName:a,ha:{}}:(a={appName:a.app||z.ng.rk,ha:z.ib(a)},delete a.ha.app);b=z.ng[a.appName];if(!b)throw"Invalid app "+a.appName;a.zU=b;this.bH.push(a.appName);return a};
z.e.Zr=function(){(0,window.clearTimeout)(this.Ei);z.x(this.bH,function(a){z.tc(z.w.K.nb+"/javascripts/livefyre_mod_"+a+".js")})};z.e.Nv=function(a){var b=z.ib(this.ha);z.jb(b,a.ha);b.strings=z.ib(this.ha.strings);z.jb(b.strings,a.ha.strings||{});return b};
z.e.qG=function(a,b){var c=this.Nv(this.cq[a]);(z.gb(this.Pm)||0==a)&&kg(c);c=new b(this.ha,c);this.Pm[a]=c;if(!(z.cb(this.Pm)<this.cq.length)){var d=[];z.y(this.Pm,function(a,b){var c=this.Pm[b.toString()].Jv();d.push(c);-1<window.location.hash.indexOf("fyre-debug")&&a.debug()},this);z.u.FyreLoader=this;z.u.FyreLoader.apps=d;this.ia.apply(z.u,d);z.Vf.fg()||z.Vf.N()}};z.e.MS=function(){pg(this,z.w.aj)};z.r(z.u.FYRE_LOADED_CB)&&(0,window.setTimeout)(z.u.FYRE_LOADED_CB,80);})(fyre.conv);fyre.conv.config.set('assetVersion', 1444256127);
;
new function(){var _=this,undefined=function(_){return _}(),root=function(){return this}.call(null);_.GetMetadata=function(){for(var retval={},elements=root.document.getElementsByTagName("meta"),i=0;i<elements.length;i++)elements[i].getAttribute("name")&&(retval[elements[i].getAttribute("name")]=elements[i].getAttribute("content"));return retval};root.addEventListener("load",function(){var commentThreadId,metadata,payload;root.hasOwnProperty("CommentElementId")&&(commentThreadId="",metadata=_.GetMetadata(),metadata.hasOwnProperty("ms.assetid")&&(commentThreadId=metadata["ms.assetid"]),metadata["ms.ContentSource"]==="OP"&&(commentThreadId=(metadata["ms.DHSDepotName"]+"/"+metadata["ms.DHSRelativePath"]).replace(/-/g,"--").replace(/\//g,"-")),commentThreadId&&(payload={el:root.CommentElementId,network:"livefyre-comments",siteId:"379026",articleId:commentThreadId,collectionMeta:{articleId:commentThreadId,url:metadata.NormalizedUrl}},fyre.conv.load({},[payload],function(){})))})};;
(function(){var searchBoxModule=function($){window.Epx=window.Epx||{};window.Epx.Controls=window.Epx.Controls||{};Epx.Controls.SearchBox=function(){function contractSearch(){if(searchInMotion!=!0&&$searchBox.width()!=0){searchInMotion=!0;$searchBox.css("padding","0");var s=setInterval(function(){curWidth-=shrinkWidthByMod;shrinkWidthByMod*=widthAcceleration;curWidth<=0&&(curWidth=0,window.clearInterval(s),searchInMotion=!1,shrinkWidthByMod=widthMod);$searchBox.css("width",curWidth+"px")},10);window.removeEventListener("click",contractSearch,!1);window.removeEventListener("blur",contractSearch,!1);window.removeEventListener("touchend",contractSearch,!1)}}function expandSearch(){if(searchInMotion!=!0){searchInMotion=!0;$searchBox.css("padding","0 0 3px 6px");var s=setInterval(function(){curWidth+=growWidthByMod;growWidthByMod*=widthAcceleration;curWidth>=maxWidthForSearchBox&&(curWidth=maxWidthForSearchBox,window.clearInterval(s),searchInMotion=!1,growWidthByMod=widthMod);$searchBox.css("width",curWidth+"px")},10);window.addEventListener("click",contractSearch,!1);window.addEventListener("blur",contractSearch,!1);window.addEventListener("touchend",contractSearch,!1)}}function watermarkFocus(e,watermark){$searchBox.val()==watermark&&$searchBox.val("");isSearchCollapsedByDefault&&expandSearch();$searchBoxDiv.addClass("SearchBoxOnFocus")}function watermarkBlur(e,watermark){$searchBox.val().trim()==""&&($searchBox.val(watermark),isSearchCollapsedByDefault&&contractSearch(e));$searchBoxDiv.removeClass("SearchBoxOnFocus")}function searchBoxOnSubmit(control){return $searchBox.val()!=watermark&&$searchBox.val()!=""?(control.submit(),!0):!1}var $searchBox,$searchBoxButton,$searchBoxDiv,isSearchCollapsedByDefault,$showHideButton,searchInMotion=!1,curWidth=0,widthMod,widthAcceleration,growWidthByMod,shrinkWidthByMod,maxWidthForSearchBox;return $(document).ready(function(){var parametersForSearchAnimation,params;($searchBox=$("#HeaderSearchTextBox"),$searchBoxDiv=$searchBox.parent().parent(),$showHideButton=$("#ShowSearchBoxButton"),$searchBoxButton=$("#HeaderSearchButton"),isSearchCollapsedByDefault=$showHideButton.length>0,isSearchCollapsedByDefault)&&(maxWidthForSearchBox=220,widthMod=45,widthAcceleration=.8,parametersForSearchAnimation=$("input#parametersForSearchAnimation").val(),parametersForSearchAnimation&&(params=parametersForSearchAnimation.split(","),params.length==3&&(maxWidthForSearchBox=parseInt(params[0],10),widthMod=parseInt(params[1],10),widthAcceleration=parseFloat(params[2],10))),growWidthByMod=widthMod,shrinkWidthByMod=widthMod,$searchBoxButton.hide(),$showHideButton.show(),$showHideButton.click(function(event){$searchBox.width()==0?$searchBox[0].focus():$searchBox.val().trim()!=""?$searchBoxButton.click():contractSearch(event);event.stopPropagation()}),$searchBox.click(function(event){event.stopPropagation()}))}),{watermarkFocus:watermarkFocus,watermarkBlur:watermarkBlur,searchBoxOnSubmit:searchBoxOnSubmit,contractSearch:contractSearch}}()};typeof define=="function"&&window.mtpsAmd?define("searchBox",["jquery"],function($){return searchBoxModule($)}):searchBoxModule($)})();;
