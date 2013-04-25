function loginWeibo()
{
	var redirect_uri = "https://api.weibo.com/oauth2/default.html";
	var encode_redirect_uri = encodeURIComponent(redirect_uri);
	var url = "https://api.weibo.com/oauth2/authorize?display=mobile&client_id=4267533106&response_type=token&redirect_uri=" + encode_redirect_uri;
	plugins.childBrowser.showWebPage(url, {showLocationBar: false});

	plugins.childBrowser.onLocationChange = function(location) {
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

function changeAfterLogin()
{
	changeLoginState("home-login");
	changeLoginState("view-login");
	changeLoginState("history-login");
	changeLoginWidth();
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

function checkLogin()
{
	if (user_name == null) $("#popupBasic-screen").popup("open");
	else jumpto("sendWeibo");
}
