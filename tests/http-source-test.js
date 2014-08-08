var assert = require("assert");
var httpSource = require("../libs/http-source.js");

describe("httpSource function", function(){
	describe("returns", function(){
		it("always an object", function(){
			assert.equal(typeof(httpSource()),typeof({}));
		});
		it("the object has a function called 'connect'", function(){
			var obj = httpSource().connect;
			assert.notEqual(obj, undefined);
			assert.equal(typeof(obj), typeof(function(){}));
		});
		it("the object has a function called 'execute'", function(){
			var obj = httpSource().execute;
			assert.notEqual(obj, undefined);
			assert.equal(typeof(obj), typeof(function(){}));
		});
	});
	describe("when called with a valid url", function(){
		describe("a call to the 'execute'", function(){
			it("calls the callback function with an instance of 'http.ClientRequest'", function(done){
				httpSource("http://localhost:8080").execute(function(res){
					if(!res)
						throw new Error();
					done();
				}); 
			});
		});
	});
});

