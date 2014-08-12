var ModuleConnector = require("./workflow-core.js").ModuleConnector;

module.exports = function(flow1, flow2, connector){
	var obj = connector || new ModuleConnector();
	var watcher = {
		flow1_ready: false,
		flow2_ready: false,
		setReady: function(idx, value){
			switch(idx){
				case 1:
					this.flow1_ready = true;
					this.flow1_value = value;
					break;
				case 2:
					this.flow2_ready = true;
					this.flow2_value = value;
					break;
				default:
					throw new Error("Errrrorrrr");
			}
			this.executeWhenReady();
		},
		executeWhenReady:function(){
			if(this.flow1_ready && this.flow2_ready)
				this.doneFunction();
		},
		doneFunction: function(){
			obj.done({value1:this.flow1_value, value2: this.flow2_value});
		}
	};
	
	flow1.execute(function(value){
		watcher.setReady(1, value);
	});

	flow2.execute(function(value){
		watcher.setReady(2, value);
	});
	
	return obj;
}