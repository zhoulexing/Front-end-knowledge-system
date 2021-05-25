/**
 * 最少硬币找零问题
 */

class MinCoinChange {
    constructor(coins) {
        this.coins = coins;
        this.cache = {};
    }

    makeChange(amount) {
        if (!amount) {
            return [];
        }

        if (this.cache[amount]) {
            return this.cache[amount];
        }

        let min = [], newMin, newAmount;
        for (let i = 0; i < this.coins.length; i++) {
            const coin = this.coins[i];
            newAmount = amount - coin;
            if (newAmount >= 0) {
                newMin = this.makeChange(newAmount);
            }
            if (
                newAmount >= 0 && 
                (newMin.length < min.length - 1 || !min.length) &&
                (newMin.length || !newAmount)
            ) {
                min = [coin].concat(newMin);
                console.log('new Min ' + min + ' for ' + amount);
            }
        }
        return this.cache[amount] = min;
    }
}

const minCoinChange = new MinCoinChange([1, 2, 5, 10]);
minCoinChange.makeChange(20);