var access_token;
var uid;
var user_name;
var user_img;
var page_stack;
var last_at;
var now_page = "home"
var inter;

function testMode()
{
	access_token = "2.00bA9bWCI_IoeEa3943643efx8XQ3B" ;
	uid = "2314034221";
	getUserInfo();
}

function checkLocalStorage()
{
//	localStorage.clear();
	if (localStorage.access_token != undefined)
	{
		access_token = localStorage.access_token;
		uid = localStorage.uid;
		getUserInfo();
	}
	if (localStorage.last_at != undefined)
	{
		var s = localStorage.last_at;
		last_at = s.split(",");
	}
	else last_at = new Array;
	if (localStorage.itemInfo != undefined)
	{
		document.getElementById("itemInfo").innerHTML = localStorage.itemInfo;
		document.getElementById("commentContainer").innerHTML = localStorage.commentContainer;
		itemId = localStorage.itemId;
		lastViewDate = localStorage.lastViewDate;
		templastViewDate = lastViewDate;
		isViewMore = localStorage.isViewMore;
	}

	if (localStorage.history != undefined)
	{
		document.getElementById("commentdiv").innerHTML = localStorage.history;
		lastHistoryDate = localStorage.lastHistoryDate;
		templastHistoryDate = lastHistoryDate;
		isHistoryMore = localStorage.isHistoryMore;
	}
}

function onLoad()
{
	viewPos = 0;
	expressionInit();
	jQueryEventInit();
	phonegapInit();
	access_token = null;
	user_name = null;
	var nowDate = new Date();
	lastViewDate = nowDate.toISOString();
	lastViewDate = lastViewDate.replace(/T/,' ').replace(/\..+/,'');
	templastViewDate = lastViewDate;
	lastHistoryDate = lastViewDate;
	templastHistoryDate = lastHistoryDate;
	networkNoteHideup();
	checkLocalStorage();
	checkViewMore(1,isViewMore);
	checkHistoryMore(1,isHistoryMore);
	page_stack = new Array();
	page_stack.push("home");
	host = "http://103.31.20.58:8888";
	//host = "http://www.crazylpy.me:8888";
	itemId = "nemomojie";
//	testMode();//PC used
}

function jumpto(s)
{
	if (s == "home") first = true;
	else first = false;
	$.mobile.changePage("#"+s);
}

var friends;

function addStrToContent(str)
{
	var obj = document.getElementById("weiboContent");
	var i;
	if (str[0] == '@')
	{
		var str2 = str.substr(1,str.length-2);
		for (i = 0 ; i < last_at.length ; i++)
			if (last_at[i] == str2) last_at.splice(i,1);
		last_at.push(str2);
		while (last_at.length > 3)	last_at.shift();
		localStorage.last_at = last_at.toString();
	}
	if (document.selection) 
	{
		var sel = document.selection.createRange();
		sel.text = str;
	} 
	else 
		if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') 
		{
			var startPos = obj.selectionStart,
				endPos = obj.selectionEnd,
				cursorPos = startPos,
				tmpStr = obj.value;
			obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
			cursorPos += str.length;
			viewPos = obj.selectionStart = obj.selectionEnd = cursorPos;
		}
		else 
		{
			obj.value += str;
		}
	jumpto("sendWeibo");
}	

//barcode scan
function barcodeScan() {
	window.plugins.barcodeScanner.scan(function(result) {
		if (result.cancelled)
		return;
	var reg = /[A-Za-z\d]{32}/g;
	itemId = result.text;
	itemId = md5(itemId);
	var url = host + "/requestbarcode?id=" + itemId;
	$.get(url, function(data) { 
		jumpto("view");
	}).error(function(xhr) {
		if(xhr.status == 404) {
			jumpto('home');
			getTheItemUploadInfo();
		}
	});	
	}, function(error) {
	});
}

function toReply(s)
{
	if (checkLogin() == false) $("#popupBasic-screen").popup("open");
	else
	{
		addStrToContent("对@" + s + "的回复: ");
		jumpto("sendWeibo");
	}
}

function getTheItemUploadInfo() {
	$("#item_not_exist").popup("open");
}

/*  view part  */
function replaceExpression(str)
{
	var ret = new String();
	while (true)
	{
		var i = str.indexOf('[');
		if (i == -1) break;
		ret += str.substr(0,i);
		str = str.substr(i,str.length-i);
		var j = str.indexOf(']');
		if (j == -1) break;
		var imgName = str.substr(1,j-1);
		var imgIndex = expression.indexOf(imgName);
		if (imgIndex <= 0)
		{
			ret += str.substr(0,1);
			str = str.substr(1,str.length-1);
			continue;
		}
		ret += '<img src="expression/' + imgIndex + '.gif"' + ' alt="' + expression[imgIndex] + '"/>';
		str = str.substr(j+1,str.length-j);
	}
	ret += str;
	return ret;
}
/*  view part  */
