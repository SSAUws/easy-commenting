function loginWeibo()
{
	if (user_name != null) return;
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
	Array.prototype.forEach.call(document.getElementsByClassName('userName'), function(testEl)
		   	{
				testEl.innerHTML = user_name;
			}, false);
	$(".gotologin").css("display","none");
}

function checkLogin()
{
	if (user_name == null) return false; 
	else return true;
}

function getUserInfo()
{
	var url = "https://api.weibo.com/2/users/show.json?uid="+uid+"&access_token=" + access_token;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() 
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200) 
		{
			var json = json_parse(xmlhttp.responseText);
			user_name = json.screen_name;
			user_img = json.profile_image_url;			
			changeAfterLogin();
			updateUserInfo();
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function updateUserInfo()
{
	$.ajax({
		url : host + "/userlogin",
		data : {userid : user_name , imageurl : user_img},
		type : 'get',
		success : function(){console.log("Login!");}
	});
}
