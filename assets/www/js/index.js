var access_token;
var uid;
var user_name;
var user_img;
var last_page = "atUser";
var last_at;

function changeAfterLogin()
{
	changeLoginState("home-login");
	changeLoginState("view-login");
	changeLoginState("history-login");
	changeLoginWidth();
}

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
(function($){
	$(window).load(function()
		{
			emotionInit();
			access_token = null;
			user_name = null;
			networkNoteHideup();
			checkLocalStorage();
			testMode();
			document.addEventListener("deviceready",onDeviceReady,false);
			$(".sth-content").mCustomScrollbar();
		});
})(jQuery);

function onDeviceReady()
{
	document.addEventListener("offline",networkNoteShowup,false);
	document.addEventListener("online",networkNoteHideup,false);
	var networkState = navigator.connection.type;
	if (networkState == Connetion.NONE) networkNoteShowup();
}

//handle network status change
function networkNoteShowup()
{
	document.getElementById("login-net-note").style.display="block";
	document.getElementById("home-net-note").style.display="block";
	document.getElementById("sendWeibo-net-note").style.display="block";
	document.getElementById("view-net-note").style.display="block";
	document.getElementById("history-net-note").style.display="block";
}

function networkNoteHideup()
{
	document.getElementById("login-net-note").style.display="none";
	document.getElementById("home-net-note").style.display="none";
	document.getElementById("sendWeibo-net-note").style.display="none";
	document.getElementById("view-net-note").style.display="none";
	document.getElementById("history-net-note").style.display="none";
}

function jumpto(s)
{
	$.mobile.changePage("#"+s);
}

function exitApp()
{
	navigator.app.exitApp();
}

//weibo event handle
function weibo()
{
	var redirect_uri = "https://api.weibo.com/oauth2/default.html";
	var encode_redirect_uri = encodeURIComponent(redirect_uri);
	var url = "https://api.weibo.com/oauth2/authorize?display=mobile&client_id=4267533106&response_type=token&redirect_uri=" + encode_redirect_uri;
	plugins.childBrowser.showWebPage(url, {showLocationBar: false});

	plugins.childBrowser.onLocationChange = function(location) {
		console.log("location: " + location);
		if (location.indexOf(redirect_uri) >= 0) {
			var values = location.match("access_token=(.*)&remind_in=(.*)&expires_in=(.*)&uid=(.*)");
			access_token = values[1];
			var remind_in = values[2];
			var expires_in = values[3];
			uid = values[4];
			localStorage.access_token = access_token;
			localStorage.uid = uid;
			plugins.childBrowser.close();
			getUserInfo(); 
			jumpto(last_page);
		} 
	};
}

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

function changeLoginWidth()
{
	$(".my-breakpoint-1.ui-grid-b .ui-block-a").css("width","35%");
	$(".my-breakpoint-1.ui-grid-b .ui-block-a").css("margin","0");
}

function changeLoginState(id)
{
	document.getElementById(id).innerHTML='<p style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">'+user_name+'</p>';
}

function login()
{
	//	if (user_name == null) jumpto("login");
	//	else jumpto("sendWeibo");
	jumpto("sendWeibo");
}

jQuery( window ).on( "hashchange",function()
		{
			var hash = location.hash;
			if (hash != "#login") last_page = hash.substr(1);
		})

function send_weibo()
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
		for (i = 0 ; i < last_at.length ; i++)
			if (last_at[i] == str) last_at.splice(i,1);
		last_at.push(str);
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

function setFocus(s)
{
	document.getElementById(s).focus();
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
