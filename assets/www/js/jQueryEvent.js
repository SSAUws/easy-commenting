function jQueryEventInit()
{
	FastClick.attach(document.body);
	
	$.mobile.transitionFallbacks.fade = "none";

	$("#scanButton").on("click",barcodeScan);

	$('#view').on('pageshow',function(){
		$("#itemInfo .content").mCustomScrollbar();
		$('#view').unbind('pageshow');
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

	$(".jumptosendWeibo").on("click",checkLogin);

	$(".jumptohome").on("click",function(){
		jumpto("home");
	});

	$(".jumptoview").on("click",function(){
		jumpto("view");
	});

	$(".jumptohistory").on("click",function(){
		jumpto("history");
	});

	$(".jumptobadNet").on("click",function(){
		jumpto("badNet");
	});

	$("#sendButton").on("click",sendComment);

	$(".gotoLogin").on("click",loginWeibo);

	$("#expressionTrigger").on("click",function(){
		$("#expressionContainer").toggle();
	});

	$(".navPopupTrigger1").on("click",function(){
		$(".navPopup1").popup("open");
	});

	$(".navPopupTrigger2").on("click",function(){
		$(".navPopup2").popup("open");
	});

	$(".navPopupTrigger3").on("click",function(){
		$(".navPopup3").popup("open");
	});

	$(".refresh").on("click",viewRefresh);
}
