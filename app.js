	var httpSource = require("./libs/http-source.js");
	var regexTransformation = require("./libs/regex-transformation.js");
	var customTransformation = require("./libs/custom-transformation.js");

	httpSource("http://localhost:8080/")
	.connect(customTransformation, function(value){
		return value.content;
	})
	.log(
		function(obj){
			console.info("#### Logging Block Start ####");
			console.info(obj[0]);
			console.info("#### Logging Block End ####");
		}
	)
	.connect(regexTransformation, /[^\s]+/gi)
	.execute();;