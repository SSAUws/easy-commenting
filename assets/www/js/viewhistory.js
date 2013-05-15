function historyRefresh() 
{
	var result = $.ajax({
		url: host + '/requestusercomments',
		type: 'get',
		data: {userid: user_name},
		dataType: 'json',
		success: function(data) {
			console.log(data);
			updateHistory(0,data);
			localStorage.history = document.getElementById("commentdiv").innerHTML;
		}
	});
}

function updateHistory(flag,request)
{
	var obj = document.getElementById("commentdiv");
	if (flag == 0) obj.innerHTML = "";
	$.each(request.archive, function(index, value) {
		var comment = '<div class="commentPart">'+
		'<div class="author">'+
		'<img src="'+value.barcode_image_url+'" onclick="passItemIdInHistory(' + ("'" + value.objectid +"'") +')"/>'+
		'</div>'+
		'<div class="content">'+
		'<div class="contentInfo">'+
		'<span class="user_name">' + value.objectivalue.objectid+ '</span>' +
		'<span class="time">'+value.date+'</span>'+
		'</div>'+
		'<div class="contentText">'+
		value.content+
		'</div>'+
		'<div class="upgrade"><span class="commentdiff">'+value.count+'</span>条更新</div>'+
		'</div>'+
		'</div>'+"<hr/>";
		$(obj).append(comment);
	})
}

function passItemIdInHistory(newItemID)
{
	itemId = newItemID;
	jumpto("view");
	viewRefresh();
}
