function sendWeibo()
{
	var s = document.getElementById("weiboContent").value;
	var encode_s = encodeURIComponent(s);
	var url = "https://api.weibo.com/2/statuses/update.json?status=" + encode_s + "&access_token=" + access_token;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) 
		{
			console.log("Send(Weibo)!");
			sendComment();
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
		success : function(){
			document.getElementById("weiboContent").value = "";
			console.log("Send(py)!");
		}
	});
	jumpto("view");
	viewRefresh();
}

function selectSend()
{
	if (document.getElementById("weiboContent").value == "") return;
	if ($("#transfer").is(':checked')==true) sendWeibo();
	else sendComment();
}
