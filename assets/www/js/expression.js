var expression;

function expressionInit()
{
	expression = new Array;
	expression.push("");
	expression.push("蜡烛");
	expression.push("许愿");
	expression.push("泪流满面");
	expression.push("转发");
	expression.push("江南style");
	expression.push("偷乐");
	expression.push("可爱");
	expression.push("gst耐你");
	expression.push("lt切克闹");
	expression.push("moc转发");
	expression.push("草泥马");
	expression.push("神马");
	expression.push("浮云");
	expression.push("给力");
	expression.push("围观");
	expression.push("威武");
	expression.push("熊猫");
	expression.push("兔子");
	expression.push("奥特曼");
	expression.push("囧");
	expression.push("互粉");
	expression.push("礼物");
	expression.push("呵呵");
	expression.push("嘻嘻");
	expression.push("哈哈");
	expression.push("可爱");
	expression.push("可怜");
	expression.push("挖鼻屎");
	expression.push("吃惊");
	expression.push("害羞");
	expression.push("挤眼");
	expression.push("闭嘴");
	expression.push("鄙视");
	expression.push("爱你");
	expression.push("泪");
	expression.push("偷笑");
	expression.push("亲亲");
	expression.push("生病");
	expression.push("太开心");
	expression.push("懒得理你");
	expression.push("右哼哼");
	expression.push("左哼哼");
	expression.push("嘘");
	expression.push("衰");
	expression.push("委屈");
	expression.push("吐");
	expression.push("打哈欠");
	expression.push("抱抱");
	expression.push("怒");
	expression.push("疑问");
	expression.push("馋嘴");
	expression.push("拜拜");
	expression.push("思考");
	expression.push("汗");
	expression.push("困");
	expression.push("睡觉");
	expression.push("钱");
	expression.push("失望");
	expression.push("酷");
	expression.push("花心");
	expression.push("哼");
	expression.push("鼓掌");
	expression.push("晕");
	expression.push("悲伤");
	expression.push("抓狂");
	expression.push("黑线");
	expression.push("阴险");
	expression.push("怒骂");
	expression.push("心");
	expression.push("伤心");
	expression.push("猪头");
	expression.push("ok");
	expression.push("耶");
	expression.push("good");
	expression.push("不要");
	expression.push("赞");
	expression.push("来");
	expression.push("弱");
	expression.push("蛋糕");
	expressionContainerInit();
}

function expressionContainerInit()
{
	var i;
	var obj = document.getElementById("expressionContainer");
	var inner = "";
	for (i = 1 ; i < expression.length ; i++)
	{
		var s = "[" + expression[i] + "]";
		inner += '<img src="expression/' + i + '.gif"' + ' alt="' + expression[i] + '" onclick="addStrToContent(' + "'" + s + "'" + ')" class="expression"/>\n\n';
	}
	obj.innerHTML = inner;
	$("#expressionContainer").hide();
}
