var lastHistoryDate;
var templastHistoryDate;
var isHistoryMore = false;

function historyRefresh() 
{
	$.mobile.loading("show",{text:"加载中",textVisible:true});
	var result = $.ajax({
		url: host + '/requestusercomments',
		type: 'get',
		data: {userid: user_name},
		dataType: 'json',
		success: function(data) {
			console.log(data);
			updateHistory(0,data);
			localStorage.history = document.getElementById("commentdiv").innerHTML;
			localStorage.lastHistoryDate = lastHistoryDate;
		},
		error: function(data){
				   $.mobile.loading("hide");
			   }
	});
}

function historyRefreshForMore()
{
	$.mobile.loading("show",{text:"加载中",textVisible:true});
	$.ajax({
		url: host + '/requestusercomments',
		type: 'get',
		data: {userid: user_name,date:templastHistoryDate},
		dataType: 'json',
		success: function(data) {
			console.log(data);
			updateHistory(1,data);
		},
		error: function(data){
				   $.mobile.loading("hide");
			   }
	});
}

function updateHistory(flag,request)
{
	var obj = document.getElementById("commentdiv");
	if (flag == 0) obj.innerHTML = "";
	$.each(request.archive, function(index, value) {
		value.content = replaceExpression(value.content);
		var comment = '<div class="commentPart">'+
		'<div class="author">'+
		'<img src="'+value.barcode_image_url+'" onclick="passItemIdInHistory(' + ("'" + value.objectid +"'") +')"/>'+
		'</div>'+
		'<div class="content">'+
		'<div class="contentInfo">'+
		'<span class="user_name">' + value.objectname+ '</span>' +
		'<span class="time">'+value.date+'</span>'+
		'</div>'+
		'<div class="contentText">'+
		value.content+
		'</div>'+
		'<div class="upgrade"><span class="commentdiff">'+request.number[index]+'</span>条更新</div>'+
		'</div>'+
		'</div>'+"<hr/>";
	$(obj).append(comment);
	if (flag == 0) lastHistoryDate = value.date;
	templastHistoryDate = value.date;
	});
	$.mobile.loading("hide");
}

function passItemIdInHistory(newItemID)
{
	itemId = newItemID;
	jumpto("view");
}

function checkHistoryMore(flag,more)
{
	isHistoryMore = more;
	if (flag == 0) localStorage.isHistoryMore = isHistoryMore;
	if (isHistoryMore)
	{
		$("#historyMore").show();
	}
	else
	{
		$("#historyMore").hide();
	}
}
