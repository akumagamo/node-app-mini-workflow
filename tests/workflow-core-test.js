var assert = require("assert");
var ModuleConnector = require("../libs/workflow-core.js").ModuleConnector;

describe("worklfow-core Object 'ModuleConnector'", function(){
	describe("has public functions", function(){
		it("'connect'", function(){
			var obj = (new ModuleConnector).connect;
			assert.notEqual(undefined, obj);
			assert.equal(typeof(function(){}),typeof(obj));
		});
		it("'execute'", function(){
			var obj = (new ModuleConnector).execute;
			assert.notEqual(undefined, obj);
			assert.equal(typeof(function(){}), typeof(obj));
		});
		it("'log'", function(){
			var obj = (new ModuleConnector).log;
			assert.notEqual(obj, undefined);
			assert.equal(typeof(function(){}), typeof(obj));
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
	describe("a call to the 'log'", function(){
		it("with no parameter, logs to 'console.info'", function(){
			var checker = ""
			console.info = function(message){checker = message;};
			var obj = new ModuleConnector();
			obj.log();
			obj.done("args");
			
			assert.equal(typeof({}),typeof(checker));
			assert.equal("args",checker[0]);
		});
		it("with one parameter, logs to passed function", function(){
			var checker = ""
			var obj = new ModuleConnector();
			obj.log(function(message){checker = message;});
			obj.done("args");
			
			assert.equal(typeof({}),typeof(checker));
			assert.equal("args", checker[0]);
		});
		it("with two parameters, logs to passed function, the second parameter", function(){
			var checker = ""
			var obj = new ModuleConnector();
			obj.log(function(message){checker = message;}, "value1");
			obj.done("args");
			
			assert.equal(typeof(""),typeof(checker));
			assert.equal("value1", checker);
		});
	});
});

