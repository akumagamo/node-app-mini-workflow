var assert = require("assert");
var httpSource = require("../libs/http-source.js");

describe("httpSource function", function(){
	describe("returns", function(){
		it("always an object", function(){
		  assert.equal(typeof(httpSource()),typeof({}));
		});
		it("the object has a function called 'connect'", function(){
			assert.notEqual(httpSource().connect, undefined);
			assert.equal(typeof(httpSource().connect), typeof(function(){}));
		});
		it("the object has a function called 'execute'", function(){
			assert.notEqual(httpSource().execute, undefined);
			assert.equal(typeof(httpSource().execute), typeof(function(){}));
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
		describe("a call to the 'connect'", function(){
			it("with one parameter, calls the first Parameter of 'connect' with an instance of 'http.ClientRequest'", function(done){
				httpSource("http://localhost:8080").connect(function(){
					assert.equal(1, arguments.length);
					done();
				}); 
			});
			it("with two parameters, calls the first Parameter of 'connect' with an instance of 'http.ClientRequest' and the second parameter", function(done){
				httpSource("http://localhost:8080").connect(function(){
					assert.equal(2, arguments.length);
					done();
				},1); 
			});
			it("with multiple parameters calls, the first Parameter of 'connect' with an instance of 'http.ClientRequest' and the other parameters", function(done){
				httpSource("http://localhost:8080").connect(function(){
					assert.equal(5, arguments.length);
					done();
				},1,2,3,4); 
			});
		});
	});
});

