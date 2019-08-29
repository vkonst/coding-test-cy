/* eslint-disable @typescript-eslint/no-use-before-define */
// TODO: allow variable number of denominations (<=7)

// Default denominations of coins to generate combinations from
export const defaultDenominations = [1, 2, 5, 10, 20, 50] as CoinCombination;
// Default biggest (integer) value to generate coins combinations for
export const defaultMaxCombinationValue = 199;

let instance = null;

export default class CoinCombinationSolver {
    static isEnoughCoinsForCombination = (coins, combination) => {
        throwOnBadCoinsArray(combination);
        throwOnBadCoinsArray(coins, combination.length - 1);
        return matchCoinCombination(coins, combination, combination.length - 1);
    };

    constructor(options: CoinCombinationSolverOptions) {
        if (instance !== null) throw new Error("can't create the second CoinCombinationSolver instance");
        instance = CoinCombinationSolver;

        const { maxValue, denominations } = Object.assign(
            {
                maxValue: defaultMaxCombinationValue,
                denominations: defaultDenominations,
            },
            options,
        );
        this.coinDenominations = (throwOnBadDenominations(denominations), denominations);
        this.smallestCoinValue = denominations[0];
        this.maxCombinationValue = (throwOnBadMaxValue(maxValue, this.smallestCoinValue), maxValue);
        this.biggestCoinIndex = this.coinDenominations.length - 1;
        this.combinationsList = generateSortedListOfCoinCombinations(this.maxCombinationValue, this.coinDenominations);
    }

    findCombination = (targetValue, coins) => {
        throwOnBadCoinsArray(coins, this.biggestCoinIndex);
        throwOnBadTargetValue(targetValue, this.maxCombinationValue);
        const totalValue = multiplyVectors(coins, this.coinDenominations);

        // Process trivial cases first
        const notFound = [];
        if (targetValue === 0 || targetValue < this.smallestCoinValue) return notFound;
        if (targetValue === this.smallestCoinValue && coins[0] > 0) return coins.map((_, i) => (i === 0 ? 1 : 0));
        if (totalValue < targetValue) return notFound;
        if (totalValue === targetValue) return coins;

        const rawCombinations = this.getRawCombinationsArray(targetValue);
        const comparator = combination => matchCoinCombination(coins, combination, this.biggestCoinIndex);
        const targetCombination = rawCombinations.find(comparator);
        return targetCombination ? this.rawCombinationToCombination(targetCombination) : notFound;
    };

    totalCoinsValue(coins): number {
        return multiplyVectors(coins, this.coinDenominations);
    }

    getConstants() {
        return {
            coinDenominations: [].concat(this.coinDenominations),
            biggestCoinIndex: this.biggestCoinIndex,
            maxCombinationValue: this.maxCombinationValue,
        };
    }

    private readonly coinDenominations: CoinCombination;
    private readonly smallestCoinValue: number;
    private readonly maxCombinationValue: number;
    private readonly biggestCoinIndex: number;
    private readonly combinationsList: Buffer[];

    private getCombinationsBuffer(targetValue) {
        const i = valueToIndex(targetValue, this.smallestCoinValue);
        return this.combinationsList[i];
    }

    private getRawCombinationsArray(targetValue) {
        const buffer = this.getCombinationsBuffer(targetValue);
        const combinations = [];
        for (let i = 0; i < buffer.byteLength; i += 8) {
            const bytes = Array.from(buffer.slice(i, i + 8));
            bytes[0] = invertNumOfCoins(bytes[0]);
            combinations.push(bytes);
        }
        return combinations;
    }

    rawCombinationToCombination(rawCombination: number[]): CoinCombination {
        const combination = rawCombination.reverse().reduce((coins, el, i) => {
            if (i <= this.biggestCoinIndex) coins.push(el);
            return coins;
        }, []);
        return combination as CoinCombination;
    }
}

/*
 This code runs once only. Therefore CPU/memory usage by the run is not optimized.
 But the results, thousand coin combinations, must be optimized:
 - combinations must be linked to amounts, sorted by number of coins, and compact.
 Therefore coin combinations are packed into an array of byte Buffers.
 Each combination represents 8 bytes in a Buffer.
 A Buffer contains all possible combinations for an (integer) amount.
 Combinations in a Buffer are sorted by number of coins (less coins, then more coins).
 The index of a Buffer in the array equals to the amount decreased by a constant.
*/
function generateSortedListOfCoinCombinations(maxCombinationValue, denominations): Buffer[] {
    const [coinOneVal, coinTwoVal, coinThreeVal, coinFourVal, coinFiveVal, coinSixVal] = denominations;
    // Maximum numbers of coins in a generated combination
    const coinOneMaxNum = Math.floor(maxCombinationValue / coinOneVal);
    const coinTwoMaxNum = Math.floor(maxCombinationValue / coinTwoVal);
    const coinThreeMaxNum = Math.floor(maxCombinationValue / coinThreeVal);
    const coinFourMaxNum = Math.floor(maxCombinationValue / coinFourVal);
    const coinFiveMaxNum = Math.floor(maxCombinationValue / coinFiveVal);
    const coinSixMaxNum = Math.floor(maxCombinationValue / coinSixVal);
    const smallestCoinValue = denominations[0];
    const numberOfValues = maxCombinationValue - smallestCoinValue + 1;

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
                                combinationValue < smallestCoinValue || combinationValue > maxCombinationValue;
                            if (isIgnoredCombination) continue;

                            const invertedNumOfCoins = invertNumOfCoins(numOfCoins);
                            const combination = Buffer.from([invertedNumOfCoins, 0, n6, n5, n4, n3, n2, n1]);

                            const valueIndex = valueToIndex(combinationValue, smallestCoinValue);
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
        `Number of unique values: ${combinationsLists.length} (from ${smallestCoinValue} to ${maxCombinationValue})`,
    );
    console.log(`Total number of unique coin combinations: ${sum}`);
    console.log(`Min/Max number of unique coin combinations for a value: ${min}/${max}`);

    const combinationsComparator = (combA, combB) => combA.compare(combB);

    const sortedCombinationsLists = combinationsLists
        .map(array => array.sort(combinationsComparator).reverse())
        .map(buffers => Buffer.concat(buffers));
    return sortedCombinationsLists;
}

function multiplyVectors(v1: number[], v2: number[]): number {
    let s = 0;
    for (let i = 0; i < v1.length; i++) {
        s += v1[i] * v2[i];
    }
    return s;
}

function valueToIndex(value, offset) {
    if (value < offset) throw new Error(`value must be less then ${offset}`);
    return value - offset;
}

function invertNumOfCoins(numOfCoins) {
    if (numOfCoins > 256) throw new Error(`numOfCoins must be less then 256}`);
    return 256 - numOfCoins;
}

function matchCoinCombination(coins: CoinCombination, combination: CoinCombination, biggestCoinIndex: number): boolean {
    for (let i = biggestCoinIndex; i >= 0; i--) {
        if (coins[i] < combination[8 - i - 1]) break;
        if (i === 0) return true;
    }
    return false;
}

function throwOnBadMaxValue(maxValue: number, smallestCoinValue: number): void {
    if (typeof maxValue !== 'number' || maxValue > defaultMaxCombinationValue)
        throw new Error(`maxValue must be an integer number of ${smallestCoinValue} .. ${defaultMaxCombinationValue}`);
}

function throwOnBadDenominations(denominations: CoinCombination): void {
    const error = new Error('denominations must be an array of six ascending integer numbers');
    if (!Array.isArray(denominations) || denominations.length !== 6) throw error;
    denominations.forEach(d => {
        if (typeof d !== 'number') throw error;
        if (d < denominations[0]) throw error;
    });
}

function throwOnBadCoinsArray(coins: CoinCombination, biggestCoinIndex = -1): void {
    if (!Array.isArray(coins)) throw new Error('coins (or combination) must be an array');
    if (biggestCoinIndex >= 0 && coins.length < biggestCoinIndex + 1)
        throw new Error(`coins (or combination) must have at least ${biggestCoinIndex + 1} elements`);
}

function throwOnBadTargetValue(targetValue: number, maxCombinationValue: number): void {
    if (typeof targetValue !== 'number' || targetValue > maxCombinationValue)
        throw new Error(`targetValue must be an integer number up to ${maxCombinationValue}`);
}
