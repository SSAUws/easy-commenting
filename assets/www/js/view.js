var viewPos;
var host = "www.crazylpy.me:8888";

function setCursor()
{
	document.getElementById("weiboContent").selectionStart = viewPos;
}

function viewRefresh()
{
	var id = "barcode1";
	var url = "/requestbarcode?id=" + id;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200) 
		{
			var json = json_parse(xmlhttp.responseText);
			console.log(json);
		}
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}
