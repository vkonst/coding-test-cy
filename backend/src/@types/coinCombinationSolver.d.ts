declare namespace coinCombinationSolver {
    function findCombination(targetValue: number, coins: Coins): CoinCombination;
    function getConstants(): Constants;
    function totalCoinsValue(coins: Coins): number;
}

declare interface Constants {
    coinDenominations: number[];
    biggestCoinIndex: number;
    maxCombinationValue: number;
}
declare type Coins = number[];
declare type CoinCombination = number[];
