function sendWeibo()
{
	var s = document.getElementById("weiboContent").value;
	var encode_s = encodeURIComponent(s);
	var url = "https://api.weibo.com/2/statuses/update.json?status=" + encode_s + "&access_token=" + access_token;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) 
		{
			alert("Send Successfully!");
			document.getElementById("weiboContent").value = "";
		}
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;"); 
	xmlhttp.send();
}

function sendComment()
{
	var id = "barcode1";
	var s = document.getElementById("weiboContent").value;
	$.ajax({
		url : host + '/userpostcomment',
		data : {
			userid : user_name,
			objectid : id,
			comment : s
		},
		type : 'post',
		datatype : 'json',
		success : function(){console.log("Send!");}
	});
	//if ()
	sendWeibo();
	jumpto("view");
}

function selectSend()
{
	// TODO(moye): remove the true here.
	if (true) sendWeibo();
	else sendComment();
}
