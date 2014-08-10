# Mini Workflow Engine
## Versionnumber 0.3.7 (2014-08-10) Alpha
Mini Workflow Engine for loading data from Webpages. Where the workflow can be defined modular, in a building-block manner

## Features
i. httpSource Module, wraps 'http.get' into a Workflow Module.
i. custom-transformation Module, transforms an object into an other object. 
i. regex-transforamtion Module, creates a List from a given String, with the passed RegEx-Expression.
i. log values to console or special function.

## Roadmap / Future Features
i. GUI interface
i. "httpFileDownload" Module
i. "IF" Module, directs the Flow based on the outcome of the passed function.
i. "FILTER" Module, filters entries from a List based on the passed function (returns a new list)
i. "FOR" Module, goes through all elements in an List and executes a passed function on each item
i. Custom modules, create interface for custom Modules

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
	.execute();;
	

## Documentation

### File / Folder Structure (TODO: sort alpha)
     +-+- njs_mini_workflow
	   +-+- libs
	   | +- custom-transformation.js
	   | +- http-source.js
	   | +- regex-transformation.js
	   | +- workflow-core.js
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
       | +- ...
	   +- app.js (demo app)
       +- readme.md (this document)
	   +- package.json
	   +- LICENSE
	  
### API / Commands
...

### External Libs
...

