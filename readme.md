# Mini Workflow Engine
## Versionnumber 0.3.13 (2014-08-11) Alpha
Mini Workflow Engine for loading data from Webpages. Where the workflow can be defined modular, in a building-block manner

## Features
i. httpSource Module, wraps 'http.get' into a Workflow Module.
i. custom-transformation Module, transforms an object into an other object. 
i. regex-transforamtion Module, creates a List of Lists from a given String, with the passed RegEx-Expression.
i. log values to console or special function.
i. fileDestination Module, writes values into a defined File and passes the value unchanged to next caller.
i. fileSource Module, base textfile Reader Module
i. join to Flows

## Roadmap / Future Features
i. GUI interface
i. Naming of Module-Steps
i. fileSource Module (css, textfile, json, ...)
i. "httpFileDownload" Module
i. "IF" Module, directs the Flow based on the outcome of the passed function.
i. "FILTER" Module, filters entries from a List based on the passed function (returns a new list)
i. "FOR" Module, goes through all elements in an List and executes a passed function on each item
i. Custom modules, create interface for custom Modules (Factory eq.)
i. autoloading from Modules
i. regexModule upgrade selection function
i. customScript Module, to execute scripts in the workflow context
i. extend joinModule to accept multiple flows

## Known Bugs
i. since ModuleConnector object is "injected", in nested calls, default values will only work if, the position in the function call is filled with null / undefined / usw. (see by regexTransformation, ...)

## System Requirement & Prerequisits
 simply node.js installation

## Usage

### Setup
Download Source from SourceLink and execute "npm install"

### SourceControl Link & Information
NONE

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

### File / Folder Structure (TODO: sort alpha)
     +-+- njs_mini_workflow
	   +-+- libs
	   | +- custom-transformation.js
	   | +- http-source.js
	   | +- regex-transformation.js
	   | +- workflow-core.js
	   | +- file-destination.js
	   | +- ...
       +-+- node_modules (needed libs etc.)
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
	  
### API / Commands

#### Functions / Modules
i. http
i. customTransformation
i. regexTransformation
i. fileDestination

#### Classes
i. ModuleConnector

### External Libs

NONE

