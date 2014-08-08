var assert = require("assert");
var httpSource = require("../libs/http-source.js");
var regexTransformation = require("../libs/regex-transformation.js");
var customTransformation = require("../libs/custom-transformation.js");

describe("integration test 1", function(){

	describe("httpSource", function(){
		describe("'execute'", function(){
			it("returns an object", function(done){
				httpSource("http://localhost:8080/")
					.execute(function(value){
						assert.equal(typeof(value), "object");
						done();
					});
			});
		});
		describe("connects to customTransformation", function(){
			it("returns a String", function(done){
				httpSource("http://localhost:8080/")
					.connect(customTransformation, function(o){
						return o.content;
					}).execute(function(value){
						assert.equal(typeof(value), "string");
						done();
					});
			});
		});
	});
});