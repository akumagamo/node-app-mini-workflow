var assert = require("assert");
var fs = require("fs");
var fileSource = require("../libs/file-source.js");

describe("fileSource function", function(){
	describe("no filename", function(){
		it("throws and error", function(done){
			try{
				fileSource().execute(function(){
					assert.fail();
					done();
				});
			}catch(e){
				done();
			}
		}); 		
	});
	describe.skip("file doesn't exists", function(){
		var wrongFilename = "logs/test-source-XXX.log";
		it("throws and error", function(done){
			try{
				fileSource(wrongFilename).execute(function(){
					console.info("WIESSO");
					assert.fail();
					done();
				});
			}catch(e){
				done();
			}
		}); 		
	});
	describe("reads from a given file", function(){
		var filename = "logs/test-source.log";
		var testMessage = "test\r\ntest1\r\n";
		beforeEach(function(done){
			fs.writeFile(filename, testMessage, function(){
				done();
			});
		});
		
		it("gets file content", function(done){
			fileSource(filename)
				.execute(function(data){
					assert.equal(data, testMessage);
					done();
				});
		}); 
	});
});