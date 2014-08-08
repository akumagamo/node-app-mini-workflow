var ModuleConnector = require("../libs/workflow-core.js").ModuleConnector;

module.exports = function(input, transformerFunction, mod){
	
	var output = transformerFunction?transformerFunction(input):input;
	var obj = mod || new ModuleConnector();
	
	setTimeout(function (){
		obj.done(output);
	},1);
	
	return obj;
}