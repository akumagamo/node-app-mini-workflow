var ModuleConnector = require("./workflow-core.js").ModuleConnector;
var fs = require("fs");

module.exports = function(input, filename, connector){

	var obj = connector || new ModuleConnector();
	
	fs.appendFile(filename, input, function(){
		obj.done(input);
	});

	return obj;
} 