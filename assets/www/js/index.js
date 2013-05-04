var access_token;
var uid;
var user_name;
var user_img;
var last_page = "home";
var last_at;
var inter;

//index.js
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
}

function onLoad()
{
	viewPos = 0;
	expressionInit();
	jQueryEventInit();
	phonegapInit();
	access_token = null;
	user_name = null;
	networkNoteHideup();
	checkLocalStorage();
	testMode();//PC used
}

function jumpto(s)
{
	$.mobile.changePage("#"+s);
}

jQuery( window ).on( "hashchange",function()
		{
			var hash = location.hash;
			if (hash != "#login") last_page = hash.substr(1);
		})

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
function barcodeScan()
{
	window.plugins.barcodeScanner.scan( function(result) {
		alert("We got a barcode<br/>" +
			"Result: " + result.text + "<br/>" +
			"Format: " + result.format + "<br/>" +
			"Cancelled: " + result.cancelled);
		jumpto("view");
	}, function(error) {
		alert("Scanning failed: " + error);
	}
	);
}
