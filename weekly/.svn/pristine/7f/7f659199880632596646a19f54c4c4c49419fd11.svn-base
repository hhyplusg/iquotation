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
			
			catalog.append("<h1>内容</h1>");
			//内容
			$(".imageContent").each(function(){
				catalog.append($(this).html());
			});
			
			//删除不需要导出的图
			catalog.find(".DiagramTitleThree").each(function(){
				if($(this).attr('aria-expanded') == 'false'){
					$(this).remove();
					$(this).next().remove();
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
			/*catalog.find(".DiagramTitleThree").each(function(){
				var diagramThreeId = $(this).attr("id");
				var showDiagramId = diagramThreeId.replace("diagramThree", "showDiagram");
				console.log(showDiagramId);*/
				var chart = $('#showDiagram1').highcharts();
				chart.title.update({ text: '博弈/存量指标'});
				chart.legend.update({
				    enabled: true,
				    align: 'right',
				    verticalAlign: 'top',
				    x: -10,
					y: 35,
					floating: false,
					itemStyle:{
						"color": "black", 
						"cursor": "pointer", 
						"fontSize": "12px", 
					},
				    margin:0
				});

				var svg = chart.getSVG().replace('/</g', '\n<').replace('/>/g', '>');				
				
				var image = new Image();
				image.crossOrigin = 'anonymous';
				image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg))); 

				console.log('导出图片的URL---');


				var canvas = document.createElement('canvas');  
				canvas.width = 800;  
			    canvas.height = 500; 
				 
				var context = canvas.getContext('2d');
				image.onload=function(){
					context.drawImage(image, 0, 0);
					var img = document.createElement("img"); 
	//				img.src = "static/lib/strategicobserv/weekly/images/navigation.jpg";
					img.src = canvas.toDataURL('image/png');
					$("#exportWord").find("#diagramThree1").after(img);
					$("#exportWord").wordExport();
				};
//			})
			
			
		}