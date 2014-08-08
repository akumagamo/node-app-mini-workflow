var assert = require("assert");
var ModuleConnector = require("../libs/workflow-core.js").ModuleConnector;

describe("worklfow-core Object 'ModuleConnector'", function(){
	describe("has public functions", function(){
		it("'connect'", function(){
			var obj = (new ModuleConnector).connect;
			assert.notEqual(obj, undefined);
			assert.equal(typeof(obj), typeof(function(){}));
		});
		it("'execute'", function(){
			var obj = (new ModuleConnector).execute;
			assert.notEqual(obj, undefined);
			assert.equal(typeof(obj), typeof(function(){}));
		});
	});
	describe("a call to the 'connect'", function(){
			it("with one parameter, calls the first Parameter of 'connect' with one arguments", function(done){	
				var obj = new ModuleConnector();
				obj.connect(function(){	
				assert.equal(1, arguments.length);
					done();
				}); 
				obj.done();
			});
			it("with two parameters, calls the first Parameter of 'connect' with two arguments' and the second parameter", function(done){
				var obj = new ModuleConnector();
				obj.connect(function(){		
					assert.equal(2, arguments.length);
					done();
				},1); 
				obj.done();
			});
			it("with multiple parameters calls, the first Parameter of 'connect' with five arguments", function(done){
				var obj = new ModuleConnector();
				obj.connect(function(){
					assert.equal(5, arguments.length);
					done();
				},1,2,3,4); 
				obj.done();
			});
		});
});

