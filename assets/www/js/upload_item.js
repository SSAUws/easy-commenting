function upload_item(){
	var item_content = $("#upload_item_intro").val();
	var item_name = $("#upload_item_name").val();
	$.ajax({
			url: host + '/barcodeupload',
			type: 'post',
			data: {id: itemId, tags: item_content, name: item_name, image: "test.png"},
			datatype: 'json',
			crossDomain: true,
			success: function(data) {
				console.log(data);
				jumpto("view");
			},
			error: function(a, b, c) {
				alert("What?")
				console.log(a.statusCode());
			}
	});
}

function checkContentNotEmpty() {
	return ($("#upload_item_name").val() != "" && 
			$("#upload_item_intro").val() != "" );
}