function onLoad()
{
	document.addEventListener("deviceready",onDeviceReady,false);
}

function onDeviceReady()
{
	document.addEventListener("offline",offlineAlert,false);
	document.addEventListener("online",onlineAlert,false);
}

function offlineAlert()
{
	alert(0);
}

function onlineAlert()
{
	alert(1);
}

function exitApp()
{
	navigator.app.exitApp();
}


