var assert = require("assert");
var ModuleConnector = require("../libs/workflow-core.js").ModuleConnector;
var join = require("../libs/join.js");

describe("join function", function(){
	describe("no parameters", function(){
		it("throws and error", function(done){
			try{
				join().execute(function(){
					assert.fail();
					done();
				});
			}catch(e){
				done();
			}
		}); 		
	});
	
	describe("one parameter", function(){
		it("throws and error", function(done){
			try{
				var flow1 = new ModuleConnector();
				join(flow1).execute(function(){
					assert.fail();
					done();
				});
			}catch(e){
				done();
			}
		}); 		
	});
	
	describe("two parameter", function(){
		it("returns a object, with two elements", function(done){
			var flow1 = new ModuleConnector();
			var flow2 = new ModuleConnector();
			
			join(flow1, flow2).execute(function(value){
				assert.equal(typeof(value),typeof({}));
				assert.ok(value["value1"]);
				assert.ok(value["value2"]);
				done();
			});
			
			flow1.done("flow1");
			flow2.done("flow2");
		}); 		
	});
	
});