function checkContentNotEmpty() 
{
	return ($("#upload_item_name").val() != "" && 
			$("#upload_item_intro").val() != "" );
}

function uploadBarcodeInfo() 
{
	if (!checkContentNotEmpty()) 
	{
		$("#popupBecauseEmpty").popup("open");
		return ;
	}
	$.mobile.loading('show',{text:"上传中",textVisible:true});
	var oOutput = document.getElementById("uploadOutput"), oData = new FormData(document.forms.namedItem("barcodeinfo"));
	oData.append("id", itemId);
	console.log(oData);

	var oReq = new XMLHttpRequest();
	oReq.open("POST", host + '/barcodeupload', true);
	oReq.onload = function(oEvent) {
		if (oReq.status == 200) {
			oOutput.innerHTML = "上传成功，即将跳转";
			$.mobile.loading('hide');
			$("#uploadOutput").popup("open");
			setTimeout('$("#uploadOutput").popup("close");',1000);
			setTimeout('jumpto("view");'+'viewRefresh();',2000);
		} else {
			oOutput.innerHTML = "错误 " + oReq.status
					+ " 上传物品失败<br/>";
			$("#uploadOutput").popup("open");
			setTimeout('$("#uploadOutput").popup("close");',1000);
		}
	};
	oReq.send(oData);
}
