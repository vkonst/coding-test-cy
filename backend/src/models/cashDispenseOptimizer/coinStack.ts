import ICoinStack from './coinStack.interface';
import ICoin from './coin.interface'

export default class CoinStack implements ICoinStack {
    public count: number;
    public value: number;

    constructor(public readonly coin: ICoin, count = 0) {
        this.count = count;
        this.value = coin.denomination * count;
    }

    public addCoins(count: number): number {
        this.count += count;
        this.value += count * this.coin.denomination;
        return this.value;
    }

    public removeCoins(count: number): number {
        return this.addCoins(-count);
    }
}
