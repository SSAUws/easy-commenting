var access_token;
var uid;

function testMode()
{
	access_token = "2.00bA9bWCI_IoeEa3943643efx8XQ3B" ;
	uid = "2314034221";
	jumpto("home");
}

function onLoad()
{
	access_token = null;
	document.addEventListener("deviceready",onDeviceReady,false);
}

function onDeviceReady()
{
	document.addEventListener("offline",offlineAlert,false);
	document.addEventListener("online",onlineAlert,false);
	var networkState = navigator.connection.type;
	if (networkState == Connetion.NONE) networkNoteShowup();
}

function offlineAlert()
{
	networkNoteShowup();
}

function onlineAlert()
{
	networkNoteHideup();
}

function exitApp()
{
	navigator.app.exitApp();
}

function networkNoteShowup()
{
	document.getElementById("network-note").style.display = "block" ;
}

function networkNoteHideup()
{
	document.getElementById("network-note").style.display = "none" ;
}

function jumpto(s)
{
	getUserName();
	$.mobile.changePage("#"+s);
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
			plugins.childBrowser.close();
			jumpto("home");
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
			document.getElementById("user-name").innerHTML = json.screen_name;
		}
		else 
		{
			//error
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
		else 
		{
			//error
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
