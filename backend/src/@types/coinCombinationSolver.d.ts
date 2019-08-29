declare namespace coinCombinationSolver {
    function findCombination(targetValue: number, coins: CoinCombination): CoinCombination;
    function getConstants(): CoinCombinationSolverConstants;
    function totalCoinsValue(coins: CoinCombination): number;
}

declare interface CoinCombinationSolverConstants {
    coinDenominations: number[];
    biggestCoinIndex: number;
    maxCombinationValue: number;
}

declare type CoinCombination = number[];

declare interface CoinCombinationSolverOptions {
    maxValue: number;
    denominations?: CoinCombination;
}
