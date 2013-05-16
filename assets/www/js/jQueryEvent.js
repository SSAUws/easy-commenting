var myScroll;

function jQueryEventInit()
{
	FastClick.attach(document.body);

	$.mobile.transitionFallbacks.fade = "none";
	$.mobile.transitionFallbacks.pop= "none";
	$.mobile.transitionFallbacks.flip= "none";
	$.mobile.transitionFallbacks.turn= "none";
	$.mobile.transitionFallbacks.flow= "none";
	$.mobile.transitionFallbacks.slidefade= "none";
	$.mobile.transitionFallbacks.slide= "none";
	$.mobile.transitionFallbacks.slideup= "none";
	$.mobile.transitionFallbacks.slidedown= "none";

	$("#scanButton").on("click",barcodeScan);
	
	$("#home").on("pageshow",function(){
		page_stack.push("home");
	});
	
	$("#view").on("pageshow",function(){
		page_stack.push("view");
	});
	
	$("#history").on("pageshow",function(){
		page_stack.push("history");
	});

	$("#sendWeibo").on("pageshow",function(){
		$("#weiboContent").focus();
		setCursor();
	});

	$("#atUser").on("pageshow",function(){
		$("#atUser-input").focus();
	});

	$(".jumptoatUser").on("click",function(){
		atUserInit();
		jumpto("atUser");
	});

	$(".jumptosendWeibo").on("click",function(){
		if (checkLogin() == false) 
			$("#popupBasic-screen").popup("open");
		else
			jumpto("sendWeibo");
	});

	$(".jumptohome").on("click",function(){
		jumpto("home");
	});
	
	$(".jumptohistory").on("click",function() {
		if (checkLogin())
		{
			jumpto("history");
		}
		else 
			$("#popupBasic-screen_home").popup("open");
	});

	$(".jumptoview").on("click",function(){
		jumpto("view");
	});

	$(".jumptobadNet").on("click",function(){
		jumpto("badNet");
	});

	$("#sendButton").on("click",selectSend);

	$(".gotoLogin").on("click",loginWeibo);

	$("#expressionTrigger").on("click",function(){
		$("#expressionContainer").toggle();
	});

	$(".viewRefresh").on("click", viewRefresh);

	$("#backtoViewTrigger").on("click",function(){
		$("#backtoViewPopup").popup("open");
	});

	$("#closebacktoViewTrigger").on("click",function(){
		$("#backtoViewPopup").popup("close");
	});
	
	$("#backtoView").on("click",function(){
		document.getElementById("weiboContent").value = "";
		jumpto("view");
	});
	
	$(".jumptoaboutus").on("click", function() {
		jumpto("aboutus");
	});

	$(".historyRefresh").on("click",function(){
		historyRefresh();
	});

	$("#viewMore").on("click",viewRefreshForMore);

	$("#historyMore").on("click",historyRefreshForMore);
	
	$("#cancel_upload").on("click",function() {
		jumpto("home");
	});
	
	$("#certify_upload").on("click", function() {
		jumpto("addNewItem");
	});
	
	$("#upload_item_name").blur(function() {
		console.log("upload_item_name");
		if ($(this).val() == "") {
			$("#name_not_fill").fadeIn();
		}
		else $("#name_not_fill").fadeOut();
	});
	
	$("#upload_item_intro").blur(function() {
		if ($(this).val() == "") {
			$("#intro_not_fill").fadeIn();
		} else $("#intro_not_fill").fadeOut();
	});
	
	$("#popupBecauseEmpty").click(function() {
		$(this).popup("close");
	})
	
	$("#home .logout_app").on("click", function() {
		if (checkLogin()) {
			$(".logout_btn").popup("open");
		}
	})
	
	$("#view .logout_app").on("click", function() {
		if (checkLogin()) {
			$(".logout_btn").popup("open");
		}
	})
	
	
	$(".cancel_logout").on("click",function(){
		$(".logout_btn").popup("close");
	});
	
	$(".certify_logout").on("click", function() {
		$(".logout_btn").popup("close");
		logoutWeibo();
	});
	
	$('#uploadBarcodeInfoBtn').on('click', function() {
		uploadBarcodeInfo();
	});
	$(".cancel_quit").on("click", function() {
		$("#quit_btn").popup("close");
	});
	$(".certify_quit").on("click", function() {
		navigator.app.exitApp();
	});
}
