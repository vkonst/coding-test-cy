import ICoinStack from './coinStack.interface';

export default interface ISortedCoinStacks {
    totalValue: number;
    pushCoinStack(stack: ICoinStack);
    shiftCoinStack(): ICoinStack;
    hasDenomination(denomination: number): boolean;
    getNextStack(): ICoinStack;
}
