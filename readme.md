# Mini Workflow Engine
## Versionnumber 0.3.5 (2014-08-06) Beta
Mini Workflow Engine for loading data from Webpages. Where the workflow can be defined modular, in a plug and play / building-block manner

## Features
i. httpSource Module, wraps 'http.get' into a Workflow Module. (async)
i. custom-transformation Module, transforms an object into an other object. (sync)
i. regex-transforamtion Module, creates a List from a given String, with the passed RegEx-Expression. (sync)

## Roadmap / Future Features
i. GUI interface
i. "httpFileDownload" Module
i. "IF" Module, directs the Flow based on the outcome of the passed function.
i. "FILTER" Module, filters entries from a List based on the passed function (returns a new list)
i. "FOR" Module, goes through all elements in an List and executes a passed function on each item
i. "LOG" Module, writes a given Object to the console.
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
	httpSource("www.google.com").execute(console.info);
	

## Documentation

### File / Folder Structure (TODO: sort alpha)
     +-+- njs_mini_workflow
	   +-+- libs
	   | +- http-source.js
	   | +- ...
       +-+- node_modules (needed libs etc.)
       | +- ...
       +-+- tests
       | +- http-source-test.js
       | +- async-test.js
       | +- ...
       +- readme.md (this document)
	   +- package.json
	   +- LICENSE
	  
### API / Commands
...

### External Libs
...

