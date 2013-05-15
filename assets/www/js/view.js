var viewPos;
var host = "http://www.crazylpy.me:8888";
var itemId = "konan";
var lastViewDate;
var templastViewDate;
var isViewMore;

function setCursor()
{
	document.getElementById("weiboContent").selectionStart = viewPos;
}

function updateItem(img,title,tags)
{
	document.getElementById("itemImg").src = img;
	document.getElementById("itemId").innerHTML = title;
	document.getElementById("itemContent").innerHTML = tags;
}

function updateComment(flag,archive)
{
	var obj = document.getElementById("commentContainer");
	if (flag == 0) obj.innerHTML = "";
	$.each(archive,function(index,value){
		var news = '<div class="commentPart">' + 
		'<div class="author">' + 
		'<img src="' + value.user_image_url + '" />' + 
		'</div>' +
		'<div class="content">' +
		'<div class="contentInfo">' + 
		'<span class="user_name">' + value.userid + '</span>' +
		'<span class="time">' + value.date + '</span>' +
		'</div>' +
		'<div class="contentText">' +	
		'<div class="answer" onclick="toReply(' + ("'" + value.userid + "'") + ')">' +
		'<img src="img/comment.png" />' +
		'</div>' +
		'<div class="left">' + value.content + '</div>' +
		'</div>						</div>					</div>	<hr/>';
		$(obj).append(news);
		if (flag == 0) lastViewDate = value.date;
		templastViewDate = value.date;
	});
}

function viewRefresh()
{
	$.ajax({
		url : host + "/requestbarcode",
		data : {id : itemId},
		type : 'get',
		datatype : 'json',
		success : function(data){
			var json = json_parse(data);
			console.log(json);
			updateItem(json.image, json.name, json.tags);
			updateComment(0,json.archive);
			localStorage.itemInfo = document.getElementById("itemInfo").innerHTML;
			localStorage.commentContainer = document.getElementById("commentContainer").innerHTML;
			localStorage.itemId = json.id;
			localStorage.lastViewDate = lastViewDate;
		}
		});
}

function viewRefreshForMore()
{
	$.ajax({
		url : host + "/requestbarcode",
		data : {id : itemId,date : templastViewDate},
		type : 'get',
		datatype : 'json',
		success : function(data){
			var json = json_parse(data);
			console.log(json);
			updateComment(1,json.archive);
		},
	});
}
