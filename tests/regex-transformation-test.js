var assert = require("assert");
var regexTransformation = require("../libs/regex-transformation.js");

describe("regexTransformation function", function(){

	describe("returns", function(){
		it("always an object", function(){
		  assert.equal(typeof(regexTransformation("")),typeof({}));
		});
		it("the object has a function called 'connect'", function(){
			var obj = regexTransformation("").connect;
			assert.notEqual(obj, undefined);
			assert.equal(typeof(obj), typeof(function(){}));
		});
		it("the object has a function called 'execute'", function(){
			var obj = regexTransformation("").execute;
			assert.notEqual(obj, undefined);
			assert.equal(typeof(obj), typeof(function(){}));
		});
	});

	describe("called with no parameter", function(){
		it("throws an error", function(){
			try{
				regexTransformation();
				assert.fail();
			}catch(e){}
		});
	});
	
	describe("called with one parameter", function(){
		it("splits text with new Line '\\r\\n'", function(){
		  regexTransformation("test\r\ntest1\r\ntest2\r\n").execute(
		  function(list){
			assert.equal(3, list.length);
		  });
		});
	});
	
	describe("a call to the 'connect'", function(){
		it("with one parameter, calls the first Parameter of 'connect' with a List", function(done){
			regexTransformation("").connect(function(){
				assert.equal(1, arguments.length);
				done();
			}); 
		});
		it("with two parameters, calls the first Parameter of 'connect' with a List and the second parameter", function(done){
			regexTransformation("").connect(function(){
				assert.equal(2, arguments.length);
				done();
			},1); 
		});
		it("with multiple parameters calls, the first Parameter of 'connect' with a List and the other parameters", function(done){
			regexTransformation("").connect(function(){
				assert.equal(5, arguments.length);
				done();
			},1,2,3,4); 
		});
	});
});