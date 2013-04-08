function onLoad()
{
	document.addEventListener("deviceready",onDeviceReady,false);
}

function onDeviceReady()
{
	document.addEventListener("offline",offlineAlert,false);
	document.addEventListener("online",onlineAlert,false);
	var networkState = navigator.connection.type;
	if (networkState == Connetion.NONE) networkNoteShowup();
}

function offlineAlert()
{
	networkNoteShowup();
}

function onlineAlert()
{
	networkNoteHideup();
}

function exitApp()
{
	navigator.app.exitApp();
}

function networkNoteShowup()
{
	document.getElementById("network-note").style.display = "block" ;
}

function networkNoteHideup()
{
	document.getElementById("network-note").style.display = "none" ;
}
