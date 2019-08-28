/* global describe, it, beforeEach */

describe('CoinCombinationSolver', () => {
    const COINS = [
        10, // x $1
        10, // x $2
        10, // x $5
        5, // x $10
        3, // x $20
        2, // x $50
    ];

    beforeEach(() => {});

    it('must provide findCombination method', () => {});
    it('must provide getConstants method', () => {});

    describe('findCombination method', () => {
        it('shall return a combination of no coins if called for target 0', () => {});
        it('shall return a combination with just one $1 coin if called for target 1', () => {});
        it('shall return undefined if called for a target more then total coins value', () => {});
        it('shall return expect combination if called with certain coins and value', () => {});
        it('shall through an error if called for target 101', () => {});
    });
});
