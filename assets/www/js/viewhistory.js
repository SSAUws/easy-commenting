function getUserComment() {
	var cur_date = Date();
	var result = $.ajax({
		url: url + '/requestusercomment',
		type: get,
		data: {userid: uid, date: cur_date},
		dataType: json,
		success: function(data) {
			var request = json.parse(data);
			console.log(request);
			if (request.length == 0) {
				$("#nocomment").show();
				$("#historycomment").hide();
			} else {
				$.each(request, function(index, value) {
					var comment = '<div class="commentPart" id="itemcomment'+index+'">'+
						'<div class="author">'+
							'<a class="jumptoview" id="record'+index+'" href="#"><img src="'+value.url+'" /></a>'+
							'<span id="item'+index +'" class="invisible">'+value.objectid+'</span>'+
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
					$(".commentdiv").append(comment);
				})
			}
		}
	});
	result.done(function() {
		console.log("getComment");
	});
}

function passItemIdInHistory() {
	var aid = this.attr("id");
	aid = aid.replace('record', 'item');
	itemId = $("#"+ aid).text();
	jumpto("view");

}
