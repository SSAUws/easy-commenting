var emotion;

function emotionInit()
{
	emotion = new Array;
	emotion.push("");
	emotion.push("蜡烛");
	emotion.push("许愿");
	emotion.push("泪流满面");
	emotion.push("转发");
	emotion.push("江南style");
	emotion.push("偷乐");
	emotion.push("可爱");
	emotion.push("gst耐你");
	emotion.push("lt切克闹");
	emotion.push("moc转发");
	emotion.push("草泥马");
	emotion.push("神马");
	emotion.push("浮云");
	emotion.push("给力");
	emotion.push("围观");
	emotion.push("威武");
	emotion.push("熊猫");
	emotion.push("兔子");
	emotion.push("奥特曼");
	emotion.push("囧");
	emotion.push("互粉");
	emotion.push("礼物");
	emotion.push("呵呵");
	emotion.push("嘻嘻");
	emotion.push("哈哈");
	emotion.push("可爱");
	emotion.push("可怜");
	emotion.push("挖鼻屎");
	emotion.push("吃惊");
	emotion.push("害羞");
	emotion.push("挤眼");
	emotion.push("闭嘴");
	emotion.push("鄙视");
	emotion.push("爱你");
	emotion.push("泪");
	emotion.push("偷笑");
	emotion.push("亲亲");
	emotion.push("生病");
	emotion.push("太开心");
	emotion.push("懒得理你");
	emotion.push("右哼哼");
	emotion.push("左哼哼");
	emotion.push("嘘");
	emotion.push("衰");
	emotion.push("委屈");
	emotion.push("吐");
	emotion.push("打哈欠");
	emotion.push("抱抱");
	emotion.push("怒");
	emotion.push("疑问");
	emotion.push("馋嘴");
	emotion.push("拜拜");
	emotion.push("思考");
	emotion.push("汗");
	emotion.push("困");
	emotion.push("睡觉");
	emotion.push("钱");
	emotion.push("失望");
	emotion.push("酷");
	emotion.push("花心");
	emotion.push("哼");
	emotion.push("鼓掌");
	emotion.push("晕");
	emotion.push("悲伤");
	emotion.push("抓狂");
	emotion.push("黑线");
	emotion.push("阴险");
	emotion.push("怒骂");
	emotion.push("心");
	emotion.push("伤心");
	emotion.push("猪头");
	emotion.push("ok");
	emotion.push("耶");
	emotion.push("good");
	emotion.push("不要");
	emotion.push("赞");
	emotion.push("来");
	emotion.push("弱");
	emotion.push("蛋糕");
	emotionContainerInit();
}

function emotionContainerInit()
{
	var i;
	var obj = document.getElementById("emotion-container");
	var inner = "";
	for (i = 1 ; i < emotion.length ; i++)
	{
		var s = "[" + emotion[i] + "]";
		inner += '<img src="emotion/' + i + '.gif"' + ' alt="' + emotion[i] + '" onclick="addStrToContent(' + "'" + s + "'" + ')" class="emotion"/>\n\n';
	}
	obj.innerHTML = inner;
}
