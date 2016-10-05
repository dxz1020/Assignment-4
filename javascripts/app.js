$(document).ready(function(){
	$("#search").click(function(){
		clearCanvas();

		var searchterm = $("#term").val() ? $("#term").val() : "tungnk1993/scrapy";

		getRepoLanguages(showLangs);

		function getRepoLanguages(showLangs){
			$.get("https://api.github.com/repos/" + searchterm  + "/languages", 
					function(data, status){
				console.log(status);
				success: showLangs(data,status,searchterm);
			}).fail(function(){ 
				$("#username").append("<tag>repository: "+searchterm+" not found. Please enter a valid repository.</tag>");
			});
		};

		function showLangs(data, status, repo){
			$("#username").append("<h3>Repository: " + searchterm + "</h3>");
			var dataset=[];
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					$("#langDetails").append("<li>" + key + ": " + data[key] + " characters</li>");
					var item = new Object();
					item.key = key;
					item.value = data[key];
					dataset.push(item);
					console.log(key);
					console.log(data[key]);
				};
			};
			var width = 960,
			height = 500,
			radius = Math.min(width, height) / 2;

			var color = d3.scale.ordinal()
			.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

			var arc = d3.svg.arc()
			.outerRadius(radius - 10)
			.innerRadius(0);

			var labelArc = d3.svg.arc()
			.outerRadius(radius - 40)
			.innerRadius(radius - 40);

			var pie = d3.layout.pie()
			.sort(null)
			.value(function(d) { return d.value; });

			var svg = d3.select("div#chart").append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			var g = svg.selectAll(".arc")
			.data(pie(dataset))
			.enter().append("g")
			.attr("class", "arc");

			g.append("path")
			.attr("d", arc)
			.style("fill", function(d) { return color(d.data.key); });

			g.append("text")
			.attr("transform", function(d) { 
				return "translate(" + labelArc.centroid(d) + ")"; })
			.attr("dy", ".35em")
			.text(function(d) { return d.data.key; });
		};
	});

	$("#clear").click(function(){
		$("#term").val('');//clear out input box
		clearCanvas();
	});

	// clear the elements out
	var clearCanvas = function(){
		$("li").remove(); // clear out list items
		$("h3").remove(); // clear out username heading
		$("tag").remove(); //clear out error messages
		d3.selectAll("svg").remove(); // clear out chart
	};
});