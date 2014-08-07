var assert = require("assert");

function async(callback){
	setTimeout(callback, 1);
}

describe("async function", function(){
	describe("has function as first parameter", function(){
		it("passed functions is called", function(done){
			async(function(){
				done();
			});
		});
		it("sync object changes, affect async call", function(done){
			var obj = {value:1};
			async(function(){
				assert.equal(2, obj.value);
				done();
			});
			obj.value = 2;
		});
		it("async object changes, affect async call", function(done){
			var obj = {value:1};
			async(function(){
				obj.value = 2;
			});
			async(function(){
				assert.equal(2, obj.value);
				done();
			});
			
		});
	});
});