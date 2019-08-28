/* eslint-disable @typescript-eslint/no-use-before-define */

module.exports = (() => {
    'use strict';

    // Range and number of (integer) values to generate coins combinations for
    const maxCombinationValue = 100;
    const minCombinationValue = 2;
    const numberOfValues = maxCombinationValue - minCombinationValue + 1;

    // Denominations and numbers of coins to generate combinations from
    const coinDenominations = [1, 2, 5, 10, 20, 50];
    const [coinOneVal, coinTwoVal, coinThreeVal, coinFourVal, coinFiveVal, coinSixVal] = coinDenominations;

    // Maximum numbers of coins in a generated combination
    const coinOneMaxNum = Math.floor(maxCombinationValue / coinOneVal);
    const coinTwoMaxNum = Math.floor(maxCombinationValue / coinTwoVal);
    const coinThreeMaxNum = Math.floor(maxCombinationValue / coinThreeVal);
    const coinFourMaxNum = Math.floor(maxCombinationValue / coinFourVal);
    const coinFiveMaxNum = Math.floor(maxCombinationValue / coinFiveVal);
    const coinSixMaxNum = Math.floor(maxCombinationValue / coinSixVal);

    // Index of the biggest coin ("coin six") in array(s) with coins
    const biggestCoinIndex = 5;

    return new CoinCombinationSolver();

    function CoinCombinationSolver() {
        this.findCombination = (targetValue, coins) => {
            throwOnBadCoinsArray(coins);

            // Process trivial cases first
            if (targetValue === 0) return coins.map(_ => 0);
            if (targetValue === 1 && coins[0] > 0) return coins.map((_, i) => (i === 0 ? 1 : 0));
            const totalValue = multiplyVectors(coins, coinDenominations);
            if (totalValue < targetValue) return null;
            if (totalValue === targetValue) return coins;

            const combinations = this.getCombinationsArray(targetValue);
            const comparator = combination => matchCoinCombination(coins, combination);
            return combinationToCoins(combinations.find(comparator));
        };
        this.totalCoinsValue = coins => multiplyVectors(coins, coinDenominations);
        this.getConstants = () => ({
            coinDenominations,
            biggestCoinIndex,
            maxCombinationValue,
        });

        // @private
        this.combinationsList = generateSortedListOfCoinCombinations();
        this.getCombinationsBuffer = targetValue => this.combinationsList[valueToIndex(targetValue)];
        this.getCombinationsArray = targetValue => {
            const buffer = this.getCombinationsBuffer(targetValue);
            const combinations = [];
            for (let i = 0; i < buffer.byteLength; i += 8) {
                const bytes = [...buffer.slice(i, i + 8)];
                bytes[0] = invertNumOfCoins(bytes[0]);
                combinations.push(bytes);
            }
            return combinations;
        };
        // @static
        this.isEnoughCoinsForCombination = (coins, combination) => {
            throwOnBadCoinsArray(coins);
            throwOnBadCoinsArray(combination);
            return matchCoinCombination(coins, combination);
        };
        this.combinationToCoins = combination => {
            return combinationToCoins(combination);
        };
    }

    /*
    This code runs once only. Therefore CPU/memory usage by the run is not optimized.
    But the results, dozens of thousand coin combinations, must be optimized:
    - combinations must be linked to amounts (totalValues), sorted by number of coins, and compact.
    Therefore coin combinations are packed into the array of byte Buffers.
    Each combination represents 8 bytes in a Buffer.
    A Buffer contains all possible combinations for an (integer) amount.
    Combinations in a Buffer are sorted by number of coins (less coins, then more coins).
    The index of a Buffer in the array and the (shifted) amount (total value) are equal.
    */
    function generateSortedListOfCoinCombinations() {
        const combinationsLists = Array(numberOfValues).fill(null);

        for (let n6 = coinSixMaxNum; n6 >= 0; n6--)
            for (let n5 = coinFiveMaxNum; n5 >= 0; n5--)
                for (let n4 = coinFourMaxNum; n4 >= 0; n4--)
                    for (let n3 = coinThreeMaxNum; n3 >= 0; n3--)
                        for (let n2 = coinTwoMaxNum; n2 >= 0; n2--)
                            for (let n1 = coinOneMaxNum; n1 >= 0; n1--) {
                                const numOfCoins = n1 + n2 + n3 + n4 + n5 + n6;
                                const combinationValue =
                                    n1 * coinOneVal +
                                    n2 * coinTwoVal +
                                    n3 * coinThreeVal +
                                    n4 * coinFourVal +
                                    n5 * coinFiveVal +
                                    n6 * coinSixVal;

                                const isIgnoredCombination =
                                    combinationValue < minCombinationValue || combinationValue > maxCombinationValue;
                                if (isIgnoredCombination) continue;

                                const invertedNumOfCoins = invertNumOfCoins(numOfCoins);
                                const combination = new Buffer.from([invertedNumOfCoins, 0, n6, n5, n4, n3, n2, n1]);

                                const valueIndex = valueToIndex(combinationValue);
                                if (combinationsLists[valueIndex] === null) {
                                    combinationsLists[valueIndex] = [combination];
                                } else {
                                    combinationsLists[valueIndex].push(combination);
                                }
                            }

        const [min, max, sum] = combinationsLists.reduce(
            ([min, max, sum], l) => [min < l.length ? min : l.length, max > l.length ? max : l.length, sum + l.length],
            [500, 0, 0],
        );
        console.log(
            `Number of unique values: ${combinationsLists.length} (from ${minCombinationValue} to ${maxCombinationValue})`,
        );
        console.log(`Total number of unique coin combinations: ${sum}`);
        console.log(`Min/Max number of unique coin combinations for a value: ${min}/${max}`);

        const combinationsComparator = (combA, combB) => combA.compare(combB);

        const sortedCombinationsLists = combinationsLists
            .map(array => array.sort(combinationsComparator).reverse())
            .map(buffers => Buffer.concat(buffers));
        return sortedCombinationsLists;
    }

    function multiplyVectors(v1, v2) {
        let s = 0;
        for (let i = 0; i < v1.length; i++) {
            s += v1[i] * v2[i];
        }
        return s;
    }

    function valueToIndex(value) {
        if (value > maxCombinationValue) throw new Error(`value must be less then ${maxCombinationValue}`);
        if (value < minCombinationValue) throw new Error(`value must be less then ${minCombinationValue}`);
        return value - minCombinationValue;
    }

    function invertNumOfCoins(numOfCoins) {
        if (numOfCoins > 256) throw new Error(`numOfCoins must be less then 256}`);
        return 256 - numOfCoins;
    }

    function throwOnBadCoinsArray(coins) {
        if (coins.length < biggestCoinIndex + 1)
            throw new Error(`coins must be an array with at least ${biggestCoinIndex + 1} elements`);
    }
    function matchCoinCombination(coins, combination) {
        for (let i = biggestCoinIndex - 1; i >= 0; i--) {
            if (coins[i] < combination[8 - i - 1]) break;
            if (i === 0) return true;
        }
        return false;
    }

    function combinationToCoins(combination) {
        if (!Array.isArray(combination)) return;
        return combination.reverse().reduce((coins, el, i) => {
            if (i <= biggestCoinIndex) coins.push(el);
            return coins;
        }, []);
    }
})();

// TODO: implement @private and @static decorators
