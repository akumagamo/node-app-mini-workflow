var http = require("http");

module.exports = function(url){
	var obj = {
		done:function(res){
			if(this._executeExecute){
				this._executeExecute(res);
			}
			if(this._executeConnect){
				this._executeConnectArguments.unshift(res);
				this._executeConnect.apply(this, this._executeConnectArguments);
			}
		},
		connect: function(module){
			this._executeConnect = module;
			this._executeConnectArguments = [].slice.call(arguments,1);
		},
		execute: function(callback){
			this._executeExecute = callback;
		}};

		http.get(url || "", function(res){
			obj.done(res);
		}).on('error', function(e){
			obj.done(obj);
		});
	
	return obj;
}