var assert = require("assert");
var regexTransformation = require("../libs/regex-transformation.js");

describe("regexTransformation function", function(){
	describe("returns ", function(){
		it("always an Object", function(){
		  assert.equal(typeof({}), typeof(regexTransformation("blank")));
		}); 
		it("the object has a function called 'connect'", function(){
			var obj = regexTransformation("blank").connect;
			assert.notEqual(undefined, obj);
			assert.equal(typeof(function(){}), typeof(obj));
		});
		it("the object has a function called 'execute'", function(){
			var obj = regexTransformation("blank").execute;
			assert.notEqual(undefined, obj);
			assert.equal(typeof(function(){}),typeof(obj));
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
		it("called with empty String ", function(){
		  try{
				regexTransformation("");
				assert.fail();
			}catch(e){}
		});
		it("splits text with new Line '\\r\\n'", function(done){
		  regexTransformation("test\r\ntest1\r\ntest2\r\n").execute(
		  function(list){
			assert.equal(3, list.length);
			done();
		  });
		});
	});
});