function exportWord() {
	//目录
	var catalog = $("#exportWord").empty();
	catalog.append($(".menu-container").html());
	
	//删除没有勾选的三级菜单
	catalog.find(".MenuLThree").each(function(){
		if($(this).find("input")){
			if (!$(this).find("input").get(0).checked){
				$(this).remove();
			}
		}
	});
	
	//删除二级菜单
	catalog.find(".MenuLTwo").each(function(){
		if($(this).find(".MenuLThree").length == 0){
			$(this).remove();
		}
	});
	
	
	//删除一级菜单
	catalog.find(".MenuLOne").each(function(){
		if($(this).find(".MenuLTwo").length == 0){
			$(this).remove();
		}
	});
	
	//删除选择框
	catalog.find("input").each(function(){
		$(this).remove();
	});
	
	
	//内容
	catalog.append("<h1>内容</h1>");
	$(".imageContent").each(function(){
		catalog.append($(this).html());
	});
	
	//删除不需要导出的图
	catalog.find(".DiagramTitleThree").each(function(){
		if($(this).attr('aria-expanded') == 'false'){
			$(this).next().remove();
			$(this).remove();
		}
	});
	
	//删除不需要二级标题
	catalog.find(".DiagramTitleTwo").each(function(){
		if($(this).find(".DiagramTitleThree").length == 0){
			$(this).remove();
		}
	});
	
	//删除一级标题
	catalog.find(".DiagramTitleOne").each(function(){
		if($(this).find(".DiagramTitleTwo").length == 0){
			$(this).remove();
		}
	});
	
	//删除图片和点评
	catalog.find(".DiagramBigDiv").each(function(){
		$(this).remove();
	});
	
	//生成图片
	catalog.find(".DiagramTitleThree").each(function(){
		var diagramThreeId = $(this).attr("id");
		if ("diagramThree1" == diagramThreeId) {
			var svg = getSvg(diagramThreeId, '博弈/存量指标', -10, 35);	
			loadImg(svg, 800, 500, diagramThreeId);
		} else if ("diagramThree2" == diagramThreeId) {
			var svg = getSvg(diagramThreeId, '融资买入/可用担保价值', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree3" == diagramThreeId) {
			var svg = getSvg(diagramThreeId, '综合性情绪指标', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree4" == diagramThreeId) {
			var svg = getSvg(diagramThreeId, '指定板块的强势股占比', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree5" == diagramThreeId) {
			var svg = getSvg(diagramThreeId, '分级基金成交显示的风险偏好', -40, 30);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree6" == diagramThreeId) {
			var svg = getSvg(diagramThreeId, '指定板块的历史换手率', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree7" == diagramThreeId) {
			var svg = getSvg(diagramThreeId, '指定板块的个股估值分布', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree8" == diagramThreeId) {
			var svg = getSvg(diagramThreeId, '个股估值分布的重要时点比较', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree9" == diagramThreeId) {
			var svg = getSvg(diagramThreeId, '指定板块相对换手率的历史变化', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree10" == diagramThreeId) { //
			var svg = getSvg(diagramThreeId, '综合性情绪指标', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree11" == diagramThreeId) { //
			var svg = getSvg(diagramThreeId, '综合性情绪指标', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree12" == diagramThreeId) { //
			var svg = getSvg(diagramThreeId, '综合性情绪指标', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree13" == diagramThreeId) {
			var svg = getSvg(diagramThreeId, '指定板块周换手率的历史变化', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree14" == diagramThreeId) { //
			var svg = getSvg(diagramThreeId, '综合性情绪指标', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree15" == diagramThreeId) {
			var svg = getSvg(diagramThreeId, '所有行业“速度/加速度”的最新分布', -60, 0);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree16" == diagramThreeId) {
			var svg = getSvg(diagramThreeId, '指定行业“速度/加速度”的历史变化路径', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		} else if ("diagramThree17" == diagramThreeId) {
			var svg = getSvg(diagramThreeId, '中期_HP滤波后的行业估值', -10, 35);	
			loadImg(svg, 800, 600, diagramThreeId);
		}
	});
	
	// 延迟3秒执行生成word，为了等待图片完全加载
	setTimeout(function(){$("#exportWord").wordExport();}, 3000);
}

function getSvg(diagramThreeId, title, x, y) {
	var showDiagramId = diagramThreeId.replace("diagramThree", "showDiagram");
	var chart = $('#'+showDiagramId).highcharts();
	chart.title.update({ text: title});
	chart.legend.update({
	    enabled: true,
	    align: 'right',
	    verticalAlign: 'top',
	    x: x,
		y: y,
		floating: false,
		itemStyle:{
			"color": "black", 
			"cursor": "pointer", 
			"fontSize": "12px", 
		},
	    margin:0
	});
	
	var svg = chart.getSVG().replace(/</g, '\n<').replace(/>/g, '>');
	return svg;
}

function loadImg(svg,pngWidth,pngHeight,diagramThreeId){
	var img = document.createElement("img"); 
	img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg)));
	$("#exportWord").find("#"+diagramThreeId).after(img);
}