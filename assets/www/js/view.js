var viewPos;
var host = "http://103.31.20.58:8888";
var itemId = "konan";
var lastViewDate;
var templastViewDate;
var isViewMore = false;

function setCursor()
{
	document.getElementById("weiboContent").selectionStart = viewPos;
}

function updateItem(img,title,tags,num)
{
	document.getElementById("itemImg").src = img;
	document.getElementById("itemId").innerHTML = title;
	document.getElementById("itemContent").innerHTML = tags;
	document.getElementById("c_count").innerHTML = num;
}

function updateComment(flag,archive)
{
	var obj = document.getElementById("commentContainer");
	if (flag == 0) obj.innerHTML = "";
	$.each(archive,function(index,value){
		value.content = replaceExpression(value.content);
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
		console.log(news);
		$(obj).append(news);
		if (flag == 0) lastViewDate = value.date;
		templastViewDate = value.date;
	});
}

function viewRefresh()
{
	$.ajax({
		url : host + "/requestbarcode",
		data : {id : itemId , userid : user_name},
		type : 'get',
		datatype : 'json',
		success : function(data){
			var json = json_parse(data);
			console.log(json);
			checkViewMore(0,json.more);
			updateItem(json.image, json.name, json.tags, json.number);
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
		data : {id : itemId,date : templastViewDate , userid : user_name},
		type : 'get',
		datatype : 'json',
		success : function(data){
			var json = json_parse(data);
			console.log(json);
			checkViewMore(1,json.more);
			updateComment(1,json.archive);
		},
	});
}

function checkViewMore(flag,more)
{
	isViewMore = more;
	if (flag == 0) localStorage.isViewMore = isViewMore;
	if (isViewMore)
	{
		$("#viewMore").show();
	}
	else
	{
		$("#viewMore").hide();
	}
}
