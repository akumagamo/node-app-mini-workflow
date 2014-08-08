function ModuleConnector(){

	this.done = function(){
		if(this._executeExecute){
			this._executeExecute.apply(this, arguments);
		}
		if(this._executeConnect){
			this._executeConnect.apply(this, [].slice.call(arguments,0).concat(this._executeConnectArguments,[this.child]));
		}
	};
	
	this.connect = function(module){ 
		this.child = new ModuleConnector();
		this._executeConnect = module;
		this._executeConnectArguments = [].slice.call(arguments,1);
		return this.child;
	};
	
	this.execute = function(callback){
		this._executeExecute = callback;
	};
}

module.exports = {
	ModuleConnector:ModuleConnector
};
