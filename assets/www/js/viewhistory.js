function getUserComment() 
{
	var cur_date = Date();
	var result = $.ajax({
		url: host + '/requestusercomments',
		type: 'get',
		data: {userid: user_name},
		dataType: 'json',
		success: function(data) {
			var request = data;
			console.log(request);
			if (request.length == 0) {
				$("#nocomment").show();
				$("#historycomment").hide();
			} else {
				document.getElementById("commentdiv").innerHTML = "";
				$.each(request.archive, function(index, value) {
					var comment = '<div class="commentPart">'+
						'<div class="author">'+
							'<img src="'+value.image_url+'" onclick="passItemIdInHistory(' + ("'" + value.objectid +"'") +')"/>'+
						'</div>'+
						'<div class="content">'+
							'<div class="contentInfo">'+
								'<span class="time">'+value.date+'</span>'+
							'</div>'+
							'<div class="contentText">'+
								value.content+
							'</div>'+
							'<div class="upgrade"><span class="commentdiff">'+value.count+'</span>条更新</div>'+
						'</div>'+
					'</div>';
					$("#commentdiv").append(comment);
				})
			}
		}
	});
	result.done(function() {
		console.log("getComment");
	});
}

function passItemIdInHistory(newItemID)
{
	itemId = newItemID;
	jumpto("view");
	viewRefresh();
}
