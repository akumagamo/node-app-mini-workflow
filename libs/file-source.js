var ModuleConnector = require("./workflow-core.js").ModuleConnector;
var config = require("../config.json");

var fs = require("fs");

module.exports = function(filename, connector){

	var obj = connector || new ModuleConnector();
	var encoding = config.modules.fileSource.encoding; 
		
	fs.readFile(filename, encoding, function(err, data){
		if(err){
			console.info(arguments);
			throw err;
		}
		obj.done(data);
	});

	return obj;
} 