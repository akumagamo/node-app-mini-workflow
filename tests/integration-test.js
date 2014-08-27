var assert = require("assert");
var fs = require("fs");

var httpSource = require("../libs/http-source.js");
var regexTransformation = require("../libs/regex-transformation.js");
var customTransformation = require("../libs/custom-transformation.js");
var fileDestination = require("../libs/file-destination.js");
var fileSource = require("../libs/file-source.js");
var join = require("../libs/join.js");

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
					.connect(customTransformation,function(value){ return value.pop().pop(); })
					.execute(function(value){
						assert.equal(typeof(value), typeof(""));
						done();
					});
			});
		});
			
	});
	
	describe("logging", function(){
		describe("Logs all steps between httpSource, customTransformation and regexTransformation", function(){
			it("fills 'LOGGING' variable with 3 List Entries", function(done){
				var LOGGING = [];
				function log(val){
					LOGGING.push(val);
				}
				
				httpSource("http://localhost:8080/")
					.log(log)
					.connect(customTransformation,function(value){ return value.content; })
					.log(log)
					.connect(regexTransformation, /([^\s]+)/gi)
					.log(log)
					.execute(function(value){
						assert.equal(3, LOGGING.length);
						done();
					});
			});
			it("fills 'LOGGING' variable with 3 passed List Entries", function(done){
				var LOGGING = [];
				function log(val){
					LOGGING.push(val);
				}
				
				httpSource("http://localhost:8080/")
					.log(log, "1")
					.connect(customTransformation,function(value){ return value.content; })
					.log(log, "2")
					.connect(regexTransformation, /([^\s]+)/gi)
					.log(log, "3")
					.execute(function(value){
						assert.equal(3, LOGGING.length);
						assert.equal("1", LOGGING[0]);
						assert.equal("2", LOGGING[1]);
						assert.equal("3", LOGGING[2]);
						done();
					});
			});
		});
	
	});
	
	describe("customTransformation", function(){
		describe("connects to httpSource", function(){
			it("returns an Object", function(done){
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
	
	describe("fileSource", function(){
		describe("connects to regexTransformation and customTransformation", function(){
		
			var filename = "logs/integration-test-file-source.log";
			var testMessage = "test\r\ntest1\r\ntest2";
			beforeEach(function(done){
				fs.writeFile(filename, testMessage, function(){
					done();
				});
			});
		
			it("returns the String Message", function(done){
				fileSource(filename)
					.connect(regexTransformation, null)
					.connect(customTransformation, function(value){
						return value.map(function(v){return v.pop();}).join("\r\n"); })
					.execute(function(value){
						assert.equal(typeof(value), typeof(""));
						assert.equal(value, testMessage);
						done();
					});
			});
		});
	
	});
		
	describe("fileDestination", function(){
		describe("connects to customTransformation and regexTransformation and customTransformation and fileDestination", function(){
		
		var filename = "logs/integration-test-file-destination.log";
			beforeEach(function(done){
				// delete / create new file
				fs.exists(filename, function(exists){
					if(exists)
						fs.unlink(filename,function(){
							done();
						});
					else
						done();
				});
			});
			
			it("returns a String and writes into file", function(done){
				httpSource("http://localhost:8080/")
					.connect(customTransformation,function(value){ return value.content; })
					.connect(regexTransformation, /([^\s]+)/gi).log()
					.connect(customTransformation,function(value){ return value.pop().pop();})
					.connect(fileDestination, filename)
					.execute(function(value){
						assert.equal(typeof(value), typeof(""));
						fs.readFile(filename, function(err, data){
							assert.equal(data, value);
							done();
						});
					});
			});
		});
	
	});
	
	describe("regexTransformation", function(){
		describe("connects to customTransformation and httpSource", function(){
			it("returns a Object", function(done){
				regexTransformation("http://localhost:8080/")
					.connect(customTransformation, function(value){
						return value.pop()[0];
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
			it("returns a List of List of Strings", function(done){
				regexTransformation("http://localhost:8080/orf.html", /http:\/\/([^\/]+)\//gi)
					.connect(customTransformation, function(value){
						return value[0].pop();
					})
					.connect(regexTransformation, /:(\d+)/gi)
					.execute(function(value){
						var val = value.pop()[1];
						assert.equal(typeof(val), typeof(""));
						assert.equal(val, "8080");
						done();
					});
			});
		});

	});
	
	describe("join", function(){
		describe("join two customTransformations", function(){
			it("returns an Object", function(done){
				join(
					customTransformation("flow1", function(val){return val;}),
					customTransformation("flow2", function(val){return val;})
				)
				.log()
				.execute(function(value){
					assert.equal(value["value1"], "flow1");
					assert.equal(value["value2"], "flow2");
					done();
				});
			});
		});
	});
});