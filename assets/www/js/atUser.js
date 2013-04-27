
function updateList(flag)
{
	var ul = document.getElementById("userList");
	var inner = "";
	var i;
	if (flag)
	{
		inner += "<div>Lastest @</div>";
		for (i = last_at.length - 1; i >= 0 ; i--)
			inner += '<div onclick="addStrToContent('+"'"+"@"+last_at[i]+" "+"'"+')" class="atUserItem">'+last_at[i]+"</div>";
	}
	inner += "<hr/><div>Your friends</div>"
		for (i = 0 ; i < friends.length ; i++)
			inner += '<div onclick="addStrToContent('+"'"+"@"+friends[i]+" "+"'"+')" class="atUserItem">'+friends[i]+"</div>";
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

