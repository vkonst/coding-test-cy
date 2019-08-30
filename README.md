# CY Coding Assignment

## What is this?
It is a solution of the [Coding Assignment](docs/codingAssignment.md):
- a simple __*web application that simulates withdrawal of cash from an ATM*__
- it embeds the algorithmic problem of _finding a minimum number of coins from a finite set that make a given value_ 

_The assignment was a part of a recruitment process with CY._

This repository contains:
- Source sode of the web App
- WIP: Description of the Algorithmic problem solution
- Analysis and Planning docs 
    - [Assignment](docs/codingAssignment.md)
    - [Analysis  of the requirements](docs/task-analysis.md)
    - [Tasks decomposition](docs/tasks-decomposition.md)
    - [Definition of Done](docs/definition-of-done.md)  

## Stack
[Workflow for "MUST have" solution](docs/mvp-must-workflow.md)\
[Workflow for "SHOULD have" solution](docs/mvp-should-workflow.md)\
_NB.: "MUST have" specs of the [Definition of Done](docs/definition-of-done.md) implemented only_

### Front-end (ATM simulation)
- Browser running SPApp
- Built using "pure" JS, HTML, CSS.
- Except for ["cash dispense optimizer" module](backend/src/models/cashDispenseOptimizer/coinCombinationSolver.ts)
    - selects coins for the amount a customer requests
    - written in TypeScript
  
### Back-end (Bank server(s) simulation)
- HTTP(s) server 
- RestApi
- written in TypeScript on Node.js with express.js.

_WIP: shall finally runs as a Docker SWARM stack_

## Usage

To get this working ...

```sh
# Run front-end
npm run start:fe

# Run back-end
npm run start:be
```

## License

[MIT](LICENSE)
