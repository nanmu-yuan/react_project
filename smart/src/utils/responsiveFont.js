(function (designWidth, maxWidth) {
	var doc = document,
		win = window;
	var docEl = doc.documentElement;
	var tid;
	var rootItem, rootStyle;

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;//获取当前设备的屏幕分辨率
	
		if (!maxWidth) {//最大宽度不存在的时候
			maxWidth = 540;//最大宽度就等于540px
		};
		if (width > maxWidth) {//当前设备宽度大于最大宽度时
			width = maxWidth;
		}
		//根元素上的字体大小=获取当前设备的屏幕分辨率*100/设计图的最小可视宽度(开始变化的分辨率)
		var rem = width * 100 / designWidth;
		rootStyle = "html{font-size:" + rem + 'px !important}';//根元素字体大小
		//通过id获取或者创建一个标签style
		rootItem = document.getElementById('rootsize') || document.createElement("style");
		if (!document.getElementById('rootsize')) {//如果该（rootsize） id不存在
			document.getElementsByTagName("head")[0].appendChild(rootItem);//在head里面插入style标签
			rootItem.id = 'rootsize';//设置id
		}
		if (rootItem.styleSheet) {
			rootItem.styleSheet.disabled || (rootItem.styleSheet.cssText = rootStyle)
		} else {
			try {
				  /*  在 try 里面的发生错误，不会执行错误后的 try 里面的代码
        ,如果没有错误代码正常执行*/
				rootItem.innerHTML = rootStyle
			} catch (f) {
				 /*如果 try 里面的代码出错，catch 负责补抓到错误信息封装到里面*/
				rootItem.innerText = rootStyle
			}
		}
		
		docEl.style.fontSize = rem + "px";
	};
	refreshRem();

	win.addEventListener("resize", function () {//窗口监听
		clearTimeout(tid); 
		tid = setTimeout(refreshRem, 300);//每300毫秒调用一次
	}, false);

	win.addEventListener("pageshow", function (e) {//pageshow 事件在每次加载页面时触发相当于load
        console.log('pageshow',e.persisted)
		if (e.persisted) { 
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	if (doc.readyState === "complete") {
		doc.body.style.fontSize = "16px";
	} else {
		doc.addEventListener("DOMContentLoaded", function (e) {
			doc.body.style.fontSize = "16px";
		}, false);
	}
})(720, 1800);


