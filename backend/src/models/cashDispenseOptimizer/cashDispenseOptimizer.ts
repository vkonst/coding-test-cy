// WIP: THIS CLASS IS NOT YET IMPLEMENTED (and it's not in use)

import CoinStack from './coinStack';
import ICoinStack from './coinStack.interface';

export default class CashDispenseOptimizer {
    public static selectCoinsHeap(sortedCoins: ICoinStack[], change: number, startIndex = 0): ICoinStack[] {
        for (let i = startIndex; i < sortedCoins.length; i++) {
            const coinStack: ICoinStack = sortedCoins[i];
            if (coinStack.count > 0 && coinStack.coin.denomination <= change) {
                const coinsNum: number = Math.min(
                    coinStack.count,
                    Math.floor((change) / coinStack.coin.denomination),
                );
                const matches: ICoinStack[] = [new CoinStack(coinStack.coin.denomination, coinsNum) as ICoinStack];

                const changeLeft = change - coinsNum * coinStack.coin.denomination;
                if (changeLeft <= Number.MIN_VALUE) {
                    return matches;
                }
                const subHeap = this.selectCoinsHeap(sortedCoins, changeLeft, i + 1);
                if (subHeap !== null) {
                    return matches.concat(subHeap);
                }
            }
        }
        return null;
    }

    // TODO: run simplified checks first
    // if (target > 1000) reserve biggest coins for target % 1000 and try to find coins for reminder
    // if (target in the set of values of coins left) give that coin
    // if (target is odd AND no $1 coins left) reject
    // if (target is a multiple of the biggest value left AND there are enough coins of that value) give these coins

    public static selectMinCoinsHeap(sortedCoins: ICoinStack[], change: number): ICoinStack[] {
        let minMatch: ICoinStack[] = null;
        let minCount = 0;
        let smallerCoins = sortedCoins;
        let smallerCoinsValue = sortedCoins.reduce((total, wrapper) => total + wrapper.count * wrapper.value, 0);
        if (smallerCoinsValue === change) {
            return smallerCoins;
        }
        while (smallerCoins.length > 0 && smallerCoinsValue >= change) {
            const matches: ICoinStack[] = this.selectCoinsHeap(smallerCoins, change);
            if (matches !== null) {
                const matchCount = matches.reduce((count, coin) => count + coin.count, 0);
                if (minMatch === null || matchCount < minCount) {
                    minMatch = matches;
                    minCount = matchCount;
                }
            }
            const wrapperToRemove = smallerCoins[0];
            smallerCoinsValue -= wrapperToRemove.count * wrapperToRemove.value;
            smallerCoins = smallerCoins.slice(1);
        }
        return minMatch;
    }
}
