var assert = require("assert");
var fs = require("fs");
var fileDestination = require("../libs/file-destination.js");

describe("fileDestination function", function(){
	describe("no filename", function(){
		it("throws and error", function(done){
			try{
				fileDestination("test").execute(function(){
					assert.fail();
					done();
				});
			}catch(e){
				done();
			}
		}); 		
	});
	
	describe("writes to given file", function(){
		var filename = "logs/test-destination.log";
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
		
		it("writes into a the file", function(done){
			fileDestination("test", filename).execute(function(data){
				fs.readFile(filename, function(err, data){
					assert.equal(data, "test");
					done();
				});
			});
		}); 
	});
});