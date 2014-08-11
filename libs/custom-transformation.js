var ModuleConnector = require("./workflow-core.js").ModuleConnector;

module.exports = function(input, transformerFunction, connector){
	
	var output = transformerFunction?transformerFunction(input):input;
	var obj = connector || new ModuleConnector();
	
	setTimeout(function (){
		obj.done(output);
	},1);
	
	return obj;
}