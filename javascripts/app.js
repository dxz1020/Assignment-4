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
			});
		};

		function showLangs(data, status, repo){
			var dataset = [];
			$("#username").append("<h3>" + searchterm + "</h3>");
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					$("#langDetails").append("<li>" + key + ": " + data[key] + "</li>");
					var item = new Object();
					item.key = key;
					item.value = data[key];
					dataset.push(item);
				};
			};
			console.log(dataset); // for checking
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
		d3.selectAll("svg").remove(); // clear out chart
	};
});