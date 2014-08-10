var http = require("http");
var ModuleConnector = require("../libs/workflow-core.js").ModuleConnector;

module.exports = function(url, connector){
	var obj = connector || new ModuleConnector();
	http.get(url || "", function(res){
		res.setEncoding('utf8');
		res.on("data", function(data){
			obj.done({statusCode:res.statusCode, content:data});
		});
	}).on('error', function(e){
		throw new Error("HTTP Error");
	});
	
	return obj;
}