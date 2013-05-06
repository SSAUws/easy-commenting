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

	$(".jumptosendWeibo").on("click",function(){
		if (checkLogin == false) $("#popupBasic-screen").popup("open");
		else
		{
			jumpto("sendWeibo");
		}
	});

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
}
