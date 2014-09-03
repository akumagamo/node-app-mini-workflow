# Mini Workflow Engine
## Versionnumber 0.3.13 (2014-08-11) Alpha
Mini Workflow Engine for loading data from Webpages. Where the workflow can be defined modular, in a building-block manner

## Features
* httpSource Module, wraps 'http.get' into a Workflow Module.
* custom-transformation Module, transforms an object into an other object. 
* regex-transforamtion Module, creates a List of Lists from a given String, with the passed RegEx-Expression.
* log values to console or special function.
* fileDestination Module, writes values into a defined File and passes the value unchanged to next caller.
* fileSource Module, base textfile Reader Module
* join to Flows

## Known Bugs
* since ModuleConnector object is "injected", in nested calls, default values will only work if, the position in the function call is filled with null / undefined / usw. (see by regexTransformation, ...)

## Roadmap / Future Features
* parameters as option-object (fixes)
* httpSource, http... add WebProxy Setting
* httpDestination
* timerStep, wait before call
* autoloading from Modules
* Custom modules, create interface for custom Modules (Factory eq.)
* regexModule upgrade selection function
* "FOR" Module, goes through all elements in an List and executes a passed function on each item
* "IF" Module, directs the Flow based on the outcome of the passed function.
* "FILTER" Module, filters entries from a List based on the passed function (returns a new list)
* extend joinModule to accept multiple flows
* "httpFileDownload" Module
* specific fileSource Module (css, textfile, json, ...)
* customScript Module, to execute scripts in the workflow context
* Naming of Module-Steps
* GUI interface

## System Requirement & Prerequisits
 simply node.js installation

## Usage

### Setup
Download Source from SourceLink and execute "npm install"

### SourceControl Link & Information
git@github.com:akumagamo/njs_mini_workflow.git

### Base Code Example

	var httpSource = require("./libs/http-source.js");
	var regexTransformation = require("./libs/regex-transformation.js");
	var customTransformation = require("./libs/custom-transformation.js");

	httpSource("http://localhost:8080/")
	.connect(customTransformation, function(value){
		return value.content;
	})
	.log(
		function(obj){
			console.info("#### Logging Block Start ####");
			console.info(obj[0]);
			console.info("#### Logging Block End ####");
		}
	)
	.connect(regexTransformation, /[^\s]+/gi)
	.execute();
	
	...

## Documentation

### File / Folder Structure (TODO: sort alphaNum)
     +-+- njs_mini_workflow
	   +-+- libs
	   | +- custom-transformation.js
	   | +- file-destination.js
	   | +- file-source.js
	   | +- http-source.js
	   | +- join.js
	   | +- regex-transformation.js
	   | +- workflow-core.js
	   | +- ...
	   +-+- logs (logfile default folder)
	   | +- ...
       +-+- node_modules (needed libs etc.)
	   | +- mocha
       | +- ...
       +-+- tests
       | +- async-test.js
       | +- custom-transformation-test.js
       | +- http-source-test.js
       | +- integration-test.js
       | +- regex-transformation-test.js
       | +- workflow-core-test.js
	   | +- file-destination-test.js 
       | +- ...
	   +- app.js (demo app)
       +- readme.md (this document)
	   +- package.json
	   +- config.json (not in use at the moment)
	   +- LICENSE 
	  
### API / Commands (WIP)

#### Functions / Modules
* http
* customTransformation
* regexTransformation
* fileDestination

#### Classes
* ModuleConnector

### External Libs

NONE

