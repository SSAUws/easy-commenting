function phonegapInit()
{
	document.addEventListener("deviceready",onDeviceReady,false);
}

function onDeviceReady()
{
	document.addEventListener("offline",networkNoteShowup,false);
	document.addEventListener("online",networkNoteHideup,false);
	document.addEventListener("backbutton",handleBack,false);
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	var networkState = navigator.connection.type;
	if (networkState == Connetion.NONE) networkNoteShowup();
}

function gotFS()
{

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
	var flag = true;
	var last;
	while (true)
	{
		var len = page_stack.length;
		if (len <= 0)
		{
			flag = false;
			break;
		}
		last = page_stack.pop();
		if (last != now_page) break;
	}
	if (flag)
	{
		jumpto(last);
	}
	else
	{
		$("#quit_btn").popup("open");
	}
}
