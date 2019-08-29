import CoinCombinationSolver from './coinCombinationSolver';

const solver = new CoinCombinationSolver({ maxValue: 199 });

const testArr = [
    // [targetValue, [set of coins available], [set of coins found]]
    // set of coins: [num of $1, num of $2, num of $5, num of #20, num of $50, num of $100]
    [179, [200, 100, 100, 100, 50, 50], [0, 2, 1, 0, 1, 3]],
    [199, [200, 0, 0, 0, 0, 0], [199, 0, 0, 0, 0, 0]],
    [0, [200, 100, 100, 100, 50, 50], undefined],
    [1, [200, 100, 100, 100, 50, 50], [1, 0, 0, 0, 0, 0]],
    [197, [190, 5, 0, 0, 0, 0], [187, 5, 0, 0, 0, 0]],
    [147, [3, 5, 5, 5, 0, 0], undefined],
    [147, [1, 5, 5, 100, 0, 0], [0, 1, 1, 14, 0, 0]],
    [13, [0, 5, 5, 5, 0, 0], [0, 4, 1, 0, 0, 0]],
    [13, [5, 5, 5, 5, 0, 0], [1, 1, 0, 1, 0, 0]],
    [13, [0, 0, 2, 5, 5, 0], undefined],
];

for (const [targetValue, coins] of testArr) {
    const combination = solver.findCombination(targetValue, coins);
    console.log(`>>> ${targetValue} from [${coins}]: ${JSON.stringify(combination)}`);
}
