var ModuleConnector = require("../libs/workflow-core.js").ModuleConnector;

module.exports = function(text, expression, connector){

	var exp = expression || /([^\r\n]+)/gi
	var list = []; 
	var obj = connector || new ModuleConnector();
	var lastIndex = -1;
 
	while((part = exp.exec(text)) && exp.lastIndex > lastIndex){
		lastIndex = exp.lastIndex;
		list.push(part.pop());
	}

	setTimeout(function(){obj.done(list);}, 1);

	return obj;
} 