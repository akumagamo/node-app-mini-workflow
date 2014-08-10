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
						assert.equal(typeof(value), typeof({}));
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
						assert.equal(typeof(value), typeof(""));
						done();
					});
			});
		});
		describe("connects to regexTransformation", function(){
			it("returns a List", function(done){
				httpSource("http://localhost:8080/")
					.connect(regexTransformation, /([^\s]+)/gi).execute(function(value){
						assert.ok(Array.isArray(value));
						done();
					});
			});
		});
		describe("connects to customTransformation and regexTransformation", function(){
			it("returns a List", function(done){
				httpSource("http://localhost:8080/")
					.connect(customTransformation,function(value){ return value.content; })
					.connect(regexTransformation, /([^\s]+)/gi).execute(function(value){
						assert.ok(Array.isArray(value));
						done();
					});
			});
		});
		describe("connects to customTransformation and regexTransformation and customTransformation", function(){
			it("returns a String", function(done){
				httpSource("http://localhost:8080/")
					.connect(customTransformation,function(value){ return value.content; })
					.connect(regexTransformation, /([^\s]+)/gi)
					.connect(customTransformation,function(value){ return value.pop(); })
					.execute(function(value){
						assert.equal(typeof(value), typeof(""));
						done();
					});
			});
		});
	});
	
	describe("customTransformation", function(){
		describe("connects to httpSource", function(){
			it("returns a Object", function(done){
				customTransformation("http://localhost:8080/" ,function(value){ return value; })
					.connect(httpSource)
					.execute(function(value){
						assert.equal(typeof(value), typeof({}));
						assert.equal(value.statusCode, 200);
						assert.equal(typeof(value.content), typeof(""));
						done();
					});
			});
		});
	
	});
	
	describe("regexTransformation", function(){
		describe("connects to customTransformation and httpSource", function(){
			it("returns a Object", function(done){
				regexTransformation("http://localhost:8080/")
					.connect(customTransformation, function(value){
						return value[0];
					})
					.connect(httpSource)
					.execute(function(value){
						assert.equal(typeof(value), typeof({}));
						assert.equal(value.statusCode, 200);
						assert.equal(typeof(value.content), typeof(""));
						done();
					});
			});
		});
	
		describe("connects to customTransformation and regexTransformation", function(){
			it("returns a List", function(done){
				regexTransformation("http://localhost:8080/orf.html", /http:\/\/([^\/]+)\//gi)
					.connect(customTransformation, function(value){
						return value[0];
					})
					.connect(regexTransformation, /:(\d+)/gi)
					.execute(function(value){
						assert.equal(typeof(value[0]), typeof(""));
						assert.equal(value[0], "8080");
						done();
					});
			});
		});
		
	});
});