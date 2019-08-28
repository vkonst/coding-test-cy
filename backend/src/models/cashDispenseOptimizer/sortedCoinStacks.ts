import ISortedCoinStacks from './sortedCoinStacks.interface';
import ICoinStack from './coinStack.interface';
import ICoin from './coin.interface';

export default class SortedCoinStacks implements ISortedCoinStacks {
    protected stacks: ICoinStack[] = [];
    protected value = 0;

    public get totalValue(): number {
        return 0;
    }

    public pushCoinStack(stack: ICoinStack) {
        this.value += stack.count * stack.coin.denomination;
        this.stacks.push(stack);
    }

    public shiftCoinStack(): ICoinStack {
        const shiftedStack = this.stacks.shift();
        this.value -= shiftedStack.count * shiftedStack.coin.denomination;
        return null;
    }

    public hasDenomination(denomination: number): boolean {
        return this.stacks.find(stack => stack.coin.denomination === denomination) !== undefined;
    }

    public hasCoin(coin: ICoin): boolean {
        return this.hasDenomination(coin.denomination);
    }

    public getNextStack(): ICoinStack {
        return null;
    }
}
