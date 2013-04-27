function phonegapInit()
{
	document.addEventListener("deviceready",onDeviceReady,false);
}

function onDeviceReady()
{
	document.addEventListener("offline",networkNoteShowup,false);
	document.addEventListener("online",networkNoteHideup,false);
	document.addEventListener("backbutton",handleBack,false);
	var networkState = navigator.connection.type;
	if (networkState == Connetion.NONE) networkNoteShowup();
}

//handle network status change
function networkNoteShowup()
{
	document.getElementById("home-net-note").style.display="block";
	document.getElementById("view-net-note").style.display="block";
	document.getElementById("history-net-note").style.display="block";
}

function networkNoteHideup()
{
	document.getElementById("home-net-note").style.display="none";
	document.getElementById("view-net-note").style.display="none";
	document.getElementById("history-net-note").style.display="none";
}

//handle backbutton
function handleBack()
{
	navigator.app.exitApp();
}