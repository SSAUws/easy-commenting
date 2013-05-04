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

	$("#sendButton").on("click",selectSend);

	$(".gotoLogin").on("click",loginWeibo);

	$("#expressionTrigger").on("click",function(){
		$("#expressionContainer").toggle();
	});

	$(".refresh").on("click",viewRefresh);
}
