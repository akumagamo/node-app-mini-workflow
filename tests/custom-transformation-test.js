var assert = require("assert");
var customTransformation = require("../libs/custom-transformation.js");

describe("customTransformation function", function(){

	describe("called with no parameter", function(){
		it("throws an error", function(){
			try{
				customTransformation();
				assert.fail();
			}catch(e){}
		});
	});
	
	describe("called with one parameter", function(){
		it("returns the same object", function(done){
		  customTransformation({value1:1, value2:2}).execute(
		  function(obj){
			assert.equal(obj.value1, 1);
			assert.equal(obj.value2, 2);
			done();
		  });
		});
	});
	
	describe("called with two parameter", function(){
		it("returns the transformed Object", function(done){	
		  customTransformation({value1:1, value2:2}, function(o){
			return [o.value1, o.value2];
		  }).execute(
		  function(obj){
			assert.equal(obj.length, 2);
			assert.equal(1, obj[0]);
			assert.equal(2, obj[1]);
			done();
		  });
		});
	});
	
});