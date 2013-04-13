var access_token;
var uid;
var user_name;
var user_img;
var last_page = "home";

function testMode()
{
	access_token = "2.00bA9bWCI_IoeEa3943643efx8XQ3B" ;
	uid = "2314034221";
	getUserInfo();
}

function checkLocalStorage()
{
	if (localStorage.length == 2)
	{
		access_token = localStorage.access_token;
		uid = localStorage.uid;
		getUserInfo();
	}
}

function onLoad()
{
	access_token = null;
	user_name = null;
	networkNoteHideup();
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
		} 
		else {
			console.log("other");
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
			changeLoginState("home-login");
			changeLoginState("view-login");
			changeLoginState("history-login");
			changeLoginWidth();
			jumpto(last_page);
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function changeLoginWidth()
{
	$(".my-breakpoint-1.ui-grid-c .ui-block-a").css("width","10%");
	$(".my-breakpoint-1.ui-grid-c .ui-block-a").css("margin","0");
	$(".my-breakpoint-1.ui-grid-c .ui-block-b").css("width","20%");
	$(".my-breakpoint-1.ui-grid-c .ui-block-b").css("margin-left","2.5%");
	$(".my-breakpoint-1.ui-grid-c .ui-block-b").css("margin-right","2.5%");
}

function changeLoginState(id)
{
	document.getElementById(id+"-1").innerHTML='<img src="'+user_img+'" alt="" width="expression(this.width > 50 ? "50px": "100%")"/>';
	document.getElementById(id+"-2").innerHTML='<p style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">'+user_name+'</p>';
}

function login()
{
	if (user_name == null) jumpto("login");
	else jumpto("sendWeibo");
}

jQuery( window ).on( "hashchange",function()
		{
			var hash = location.hash;
			if (hash != "#login")
			{
				last_page = hash;
				last_page = last_page.substr(1);
			}
		})

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
		("We got a barcode<br/>" +
		 "Result: " + result.text + "<br/>" +
		 "Format: " + result.format + "<br/>" +
		 "Cancelled: " + result.cancelled);
	jumpto("view");
	}, function(error) {
		alert("Scanning failed: " + error);
	}
	);
}

//select menu handle
function select(sobj,s)
{
	var goal = sobj.options[sobj.selectedIndex].value;
	document.getElementById(s+'-select').value = s;
	if (goal != s) jumpto(goal);
}
