var access_token;
var uid;
var user_name;

function testMode()
{
	access_token = "2.00bA9bWCI_IoeEa3943643efx8XQ3B" ;
	uid = "2314034221";
	getUserName();
	jumpto("home");
}

function checkLocalStorage()
{
	alert(localStorage.length);
	if (localStorage.length == 2)
	{
		access_token = localStorage.access_token;
		uid = localStorage.uid;
		getUserName();
	}
}

function onLoad()
{
	access_token = null;
	user_name = null;
	checkLocalStorage();
	document.addEventListener("deviceready",onDeviceReady,false);
}

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
}

function networkNoteHideup()
{
	document.getElementById("login-net-note").style.display="none";
	document.getElementById("home-net-note").style.display="none";
	document.getElementById("sendWeibo-net-note").style.display="none";
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
			getUserName(); 
		} 
		else {
			console.log("other");
		}
	};
}

function getUserName()
{
	var url = "https://api.weibo.com/2/users/show.json?uid="+uid+"&access_token=" + access_token;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) 
		{
			var json = json_parse(xmlhttp.responseText);
			user_name = json.screen_name;
			document.getElementById("home-uid").innerHTML = user_name;
			document.getElementById("sendWeibo-uid").innerHTML = user_name;
			jumpto("home");
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function send_weibo()
{
	var s = document.getElementById("weibo-content").value;
	var encode_s = encodeURIComponent(s);
	var url = "https://api.weibo.com/2/statuses/update.json?status=" + encode_s + "&access_token=" + access_token;
	alert(url);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) 
		{
			alert("Send Successfully!");
		}
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;"); 
	xmlhttp.send();
}

//barcode scan
function barcodeScan()
{
	window.plugins.barcodeScanner.scan( function(result) {
		document.getElementById("barcode-decode").innerHTML =
		("We got a barcode\n" +
		 "Result: " + result.text + "\n" +
		 "Format: " + result.format + "\n" +
		 "Cancelled: " + result.cancelled);
	}, function(error) {
		alert("Scanning failed: " + error);
	}
	);
}
