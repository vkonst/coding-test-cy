/* global describe, it, before, beforeEach */
import CoinCombinationSolver from './coinCombinationSolver';

// FIXME: implement assertions

describe('CoinCombinationSolver', () => {
    describe('CoinCombinationSolver class', () => {
        it('must have constructor with optional param "options" ', () => {});
    });

    describe('CoinCombinationSolver instance', () => {
        it('must have findCombination method', () => {});
    });

    describe('findCombination method', () => {
        let solver: CoinCombinationSolver;
        describe('initialized with defaults options', () => {
            // before(() => {
            //     solver = new CoinCombinationSolver({ maxValue: 199 });
            // });

            it('should return undefined if called for target 0', () => {
                const [targetValue, coinsAvailable, expected] = [0, [200, 100, 100, 100, 50, 50], undefined];
                const actual = solver.findCombination(targetValue, coinsAvailable);
                // assert(expected).to.be.equal(actual);
            });
            it('should return a combination with just one $1 coin if called for target 1', () => {
                const [targetValue, coinsAvailable, expected] = [1, [200, 100, 100, 100, 50, 50], [1, 0, 0, 0, 0, 0]];
                const actual = solver.findCombination(targetValue, coinsAvailable);
                // assert(expected).to.be.equal(actual);
            });
            it('should return undefined if called for a target of more then total coins value', () => {
                const [targetValue, coinsAvailable, expected] = [147, [3, 5, 5, 5, 0, 0], undefined];
                const actual = solver.findCombination(targetValue, coinsAvailable);
                // assert(expected).to.be.equal(actual);
            });
            it('should return undefined if called for a target unavaliable for given coins', () => {
                const [targetValue, coinsAvailable, expected] = [13, [0, 0, 2, 5, 5, 0], undefined];
                const actual = solver.findCombination(targetValue, coinsAvailable);
                // assert(expected).to.be.equal(actual);
            });
            it('should return expected combination for given coins and target value', () => {
                const testArr = [
                    // [targetValue, [set of coins available], [set of coins found]]
                    // set of coins: [$1, $2, $5, $20, $50, $100]
                    [179, [200, 100, 100, 100, 50, 50], [0, 2, 1, 0, 1, 3]],
                    [199, [200, 0, 0, 0, 0, 0], [199, 0, 0, 0, 0, 0]],
                    [197, [190, 5, 0, 0, 0, 0], [187, 5, 0, 0, 0, 0]],
                    [147, [1, 5, 5, 100, 0, 0], [0, 1, 1, 14, 0, 0]],
                    [16, [0, 5, 5, 5, 0, 0], [0, 3, 0, 1, 0, 0]],
                    [13, [0, 5, 5, 5, 0, 0], [0, 4, 1, 0, 0, 0]],
                    [13, [5, 5, 5, 5, 0, 0], [1, 1, 0, 1, 0, 0]],
                ];
                for (const [targetValue, coinsAvailable, expected] of testArr) {
                    const actual = solver.findCombination(targetValue, coinsAvailable);
                    it(`should return [${expected}] for ${targetValue} from [${coinsAvailable}]`, () => {
                        // assert(expected).to.be.equal(actual);
                    });
                }
            });
            it('should through an error if called for target 200 and more', () => {});
        });
    });
});
