var viewPos;
var host = "http://www.crazylpy.me:8888";

function setCursor()
{
	document.getElementById("weiboContent").selectionStart = viewPos;
}

function updateItem(img,id)
{
	document.getElementById("itemImg").src = img;
	document.getElementById("itemId").innerHTML = id;
}

function updateComment(flag,archive)
{
	var obj = document.getElementById("commentContainer");
	if (flag == 0) obj.innerHTML = "";
	$.each(archive,function(index,value){
		var news = '<div class="commentPart">' + 
		'<div class="author">' + 
		'<img src="' + value.imageurl + '" />' + 
		'</div>' +
		'<div class="content">' +
		'<div class="contentInfo">' + 
		'<span class="user_name">' + value.userId + '</span>' +
		'<span class="time">' + value.date + '</span>' +
		'</div>' +
		'<div class="contentText">' +	
		'<div class="answer jumptosendWeibo">' +
		'<img src="img/comment.png" />' +
		'</div>' +
		'<div class="left">' + value.content + '</div>' +
		'</div>						</div>					</div>	<hr/>';
		$(obj).append(news);
	});
	$(".jumptosendWeibo").on("click",checkLogin);
	//setupScroll();
}

function viewRefresh()
{
	var obj = document.getElementById("commentContainer");
	obj.innerHTML = "";
	var id = "barcode1";
	$.ajax({
		url : host + "/requestbarcode",
		data : {id : id},
		type : 'get',
		datatype : 'json',
		success : function(data){
			var json = json_parse(data);
			console.log(json);
			updateItem(json.image,json.id);
			updateComment(0,json.archive);
		}
		});
	console.log($("#itemInfo").height());
	console.log($(window).height());
}

function setupScroll()
{
	myScroll.destroy();
	myScroll = null;
	myScroll = new iScroll('wraper', { checkDOMChanges: true });	
}
