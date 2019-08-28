import ICoinStack from './coinStack.interface';

interface ICashDispenseOptimizer {
    calculateCoinsSet(coins: ICoinStack[], change: number, start: number): ICoinStack[];
    calculateMinCoinsSet(coins: ICoinStack[], change: number): ICoinStack[];
}
