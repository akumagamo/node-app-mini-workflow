
module.exports = function(text, expression){
	var exp = expression ||/([^\r\n]+)/gi
	var list = text.match(expression ||/([^\r\n]+)/gi);
	
	var obj = {
		execute: function(callback){
			callback(list);
		},
		connect:function(module){
			var args = [].slice.call(arguments,1);
			args.unshift(list);			
			console.info(args);
			module.apply(this, args);
		}
	};
	
	return obj;
}