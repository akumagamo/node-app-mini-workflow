var ModuleConnector = require("../libs/workflow-core.js").ModuleConnector;

module.exports = function(text, expression){

	var exp = expression ||/([^\r\n]+)/gi
	var list = text.match(expression ||/([^\r\n]+)/gi);
	var obj = new ModuleConnector();
	
	setTimeout(function(){obj.done(list);}, 1);
	
	return obj;
}