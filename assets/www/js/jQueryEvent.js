function jQueryEventInit()
{
	$("#scanButton").on("tap",barcodeScan);

	$('#view').on('pageshow',function(){
		$("#itemInfo .content").mCustomScrollbar();
		$('#view').unbind('pageshow');
	});

	$("#sendWeibo").on("pageshow",function(){
		$("#weibo-content").focus();
	});

	$("#atUser").on("pageshow",function(){
		$("#atUser-input").focus();
	});

	$(".jumptoatUser").on("tap",function(){
		atUserInit();
		jumpto("atUser");
	});

	$(".jumptosendWeibo").on("tap",checkLogin);

	$(".jumptohome").on("tap",function(){
		jumpto("home");
	});

	$(".jumptoview").on("tap",function(){
		jumpto("view");
	});

	$(".jumptohistory").on("tap",function(){
		jumpto("history");
	});

	$(".jumptobadNet").on("tap",function(){
		jumpto("badNet");
	});

	$("#sendWeiboButton").on("tap",sendWeibo);

	$(".gotoLogin").on("tap",loginWeibo);

	$("#expressionTrigger").on("tap",function(){
		$("#expressionContainer").toggle();
	});

	$(".navPopupTrigger1").on("tap",function(){
		$(".navPopup1").popup("open");
	});

	$(".navPopupTrigger2").on("tap",function(){
		$(".navPopup2").popup("open");
	});

	$(".navPopupTrigger3").on("tap",function(){
		$(".navPopup3").popup("open");
	});
}
