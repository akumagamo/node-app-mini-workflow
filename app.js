var httpSource = require("./libs/http-source.js");
var regexTransformation = require("./libs/regex-transformation.js");
var customTransformation = require("./libs/custom-transformation.js");

httpSource("http://localhost:8080/")
.connect(customTransformation, function(value){
	return value.content;
})
.connect(regexTransformation, /[^\s]+/gi)
.execute(console.info);
