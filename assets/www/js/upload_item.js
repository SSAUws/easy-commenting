function checkContentNotEmpty() {
	return ($("#upload_item_name").val() != "" && 
			$("#upload_item_intro").val() != "" );
}

function uploadBarcodeInfo() {
	if (!checkContentNotEmpty()) {
		$("#popupBecauseEmpty").popup("open");
		return ;
	}
	
	var oOutput = document.getElementById("output"), oData = new FormData(
			document.forms.namedItem("barcodeinfo"));
	oData.append("id", itemId);

	var oReq = new XMLHttpRequest();
	oReq.open("POST", host + '/barcodeupload', true);
	oReq.onload = function(oEvent) {
		if (oReq.status == 200) {
			oOutput.innerHTML = "Uploaded!";
			jumpto("view");
		} else {
			oOutput.innerHTML = "Error " + oReq.status
					+ " occurred uploading your file.<br \/>";
		}
	};

	oReq.send(oData);
}