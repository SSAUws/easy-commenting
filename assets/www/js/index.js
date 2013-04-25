var access_token;
var uid;
var user_name;
var user_img;
var last_page = "atUser";
var last_at;
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
}

function onLoad()
{
	expressionInit();
	access_token = null;
	user_name = null;
	networkNoteHideup();
	checkLocalStorage();
	//testMode();//PC used
}

function jumpto(s)
{
	$.mobile.changePage("#"+s);
}

//weibo event handle

function getUserInfo()
{
	var url = "https://api.weibo.com/2/users/show.json?uid="+uid+"&access_token=" + access_token;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) 
		{
			var json = json_parse(xmlhttp.responseText);
			user_name = json.screen_name;
			user_img = json.profile_image_url;			
			changeAfterLogin();
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

jQuery( window ).on( "hashchange",function()
		{
			var hash = location.hash;
			if (hash != "#login") last_page = hash.substr(1);
		})

function sendWeibo()
{
	var s = document.getElementById("weibo-content").value;
	var encode_s = encodeURIComponent(s);
	var url = "https://api.weibo.com/2/statuses/update.json?status=" + encode_s + "&access_token=" + access_token;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) 
		{
			alert("Send Successfully!");
			document.getElementById("weibo-content").value = "";
		}
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;"); 
	xmlhttp.send();
}

var friends;

function addStrToContent(str)
{
	var obj = document.getElementById("weibo-content");
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
			obj.selectionStart = obj.selectionEnd = cursorPos;
		}
		else 
		{
			obj.value += str;
		}
	jumpto("sendWeibo");
}	

function updateList(flag)
{
	var ul = document.getElementById("user-list");
	var inner = "";
	var i;
	if (flag)
	{
		inner += "<div>Lastest @</div>";
		for (i = last_at.length - 1; i >= 0 ; i--)
			inner += '<div onclick="addStrToContent('+"'"+"@"+last_at[i]+" "+"'"+')">'+last_at[i]+"</div>";
	}
	inner += "<hr/><div>Your friends</div>"
		for (i = 0 ; i < friends.length ; i++)
			inner += '<div onclick="addStrToContent('+"'"+"@"+friends[i]+" "+"'"+')">'+friends[i]+"</div>";
	ul.innerHTML = inner;
}

function updateFriends1()
{
	var url = "https://api.weibo.com/2/friendships/friends.json?uid="+uid+"&count=10&access_token="+access_token;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200) 
		{
			var json = json_parse(xmlhttp.responseText);
			delete friends;
			friends = new Array(json.users.length);;
			var i;
			for (i = 0 ; i < json.users.length ; i++)
				friends[i] = json.users[i].screen_name;
			updateList(true);
		}
	}
}

function updateFriends2()
{
	var s = document.getElementById("atUser-input").value;
	s = encodeURIComponent(s);
	var url="https://api.weibo.com/2/search/suggestions/at_users.json?type=0&count=10&q="+s+"&access_token="+access_token;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200) 
		{
			var json = json_parse(xmlhttp.responseText);
			delete friends;
			friends = new Array(json.length+1);
			friends[0] = document.getElementById("atUser-input").value
				var i;
			for (i = 0 ; i < json.length ; i++)
				friends[i+1] = json[i].nickname;
			updateList(false);
		}
	}
}

function atUserInit()
{
	document.getElementById("atUser-input").value = "";
	updateFriends1();
}

function atUser()
{
	var s = document.getElementById("atUser-input").value;
	if (s == "") updateFriends1();
	else updateFriends2();
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
