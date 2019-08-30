# CY Coding Assignment

## What is this?

A simple web application that simulates withdrawal of cash from an ATM\
that is a solution under the [Coding Assignment](docs/codingAssignment.md) (a part of a recruitment process, futher [analysed here](docs/task-analysis.md)).

_NB.: "MUST" specs of the [Definition of Done](docs/definition-of-done.md) implemented only_

## Stack
[Workflow for "MUST" specs](docs/mvp-must-workflow.md)\
[Workflow for "SHOULD" specs](docs/mvp-should-workflow.md)

### Front-end (ATM simulation)
Built using "pure" JS, HTML, CSS.
- Except for "cash dispense optimizer" module
    - it selects an optimal set of avaliable coins and banknotes for the amount a customer requests
    - it is written in TypeScript
 
### Back-end (Bank server(s) simulation)
RestApi server written in TypeScript on Node.js with express.js.

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
