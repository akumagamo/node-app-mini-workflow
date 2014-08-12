var ModuleConnector = require("./workflow-core.js").ModuleConnector;

module.exports = function(text, expression, connector){

	var exp = expression || /(?:[^\r\n]+)/gi
	var output = []; 
	var obj = connector || new ModuleConnector();
	var lastIndex = -1;
 
	while((part = exp.exec(text)) && exp.lastIndex > lastIndex){
		lastIndex = exp.lastIndex;
		output.push(part);
	}

	setTimeout(function(){obj.done(output);}, 1);

	return obj;
} 