var assert = require("assert");
var regexTransformation = require("../libs/regex-transformation.js");

describe("regexTransformation function", function(){
	describe("returns ", function(){
		it("always an Object", function(){
		  assert.equal(typeof(regexTransformation("blank")),typeof({}));
		}); 
		it("the object has a function called 'connect'", function(){
			var obj = regexTransformation("blank").connect;
			assert.notEqual(obj, undefined);
			assert.equal(typeof(obj), typeof(function(){}));
		});
		it("the object has a function called 'execute'", function(){
			var obj = regexTransformation("blank").execute;
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