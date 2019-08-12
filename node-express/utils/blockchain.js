const SHA256 = require("crypto-js/SHA256");

/*
* 定义一个区块
* */
class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp; // 时间戳
        this.transactions = transactions; // 区块存储的数据
        this.previousHash = previousHash; // 前一个hash
        this.hash = this.calculateHash(); // 生成hash
        this.nonce = 0; // 计算次数
    }

    // 计算hash
    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    // 找到hash为我想要的hash为止
    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash);
    }
}

/*
* 创造一个链
* */
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; // 存储区块
        this.difficulty = 3; // 控制计算难度
        this.pendingTransactions = []; // 在区块产生之间存储交易的地方
        this.miningReward = 100; // 挖矿回报
    }

    // 创建一个初始的区块
    createGenesisBlock() {
        return new Block("01/01/2018", ["Genesis block"], "0");
    }

    // 获取最后一个即最新的区块
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /*// 添加一个区块
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }*/

    // 创造交易
    createTransaction(transaction) {
        // 校验
        //todo
        // 推入待处理交易数组
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(miningRewardAddress) {
        // 用所有待交易来创建新的区块并且开挖..
        let block = new Block(Date.now(), this.pendingTransactions);
        block.previousHash = this.getLatestBlock().hash;
        block.mineBlock(this.difficulty);
        // 将新挖的看矿加入到链上
        this.chain.push(block);
        // 重置待处理交易列表并且发送奖励
        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
    }

    // 验证是否存在不属于区块链中的区块， 第一个是特殊的，所以i从1开始
    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for(const block of this.chain) {
            for(const trans of block.transactions) {
                // 如果地址是发起方，减少余额
                if(trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                // 如果地址是接收方，增加余额
                if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
}

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress; // 发起方
        this.toAddress = toAddress; // 接收方
        this.amount = amount; // 数量
    }
}


let savjeeCoin = new Blockchain();
console.log("Mining block 1");

savjeeCoin.createTransaction(new Transaction("address1", "address2", 100));
console.log("Mining block 2");

savjeeCoin.createTransaction(new Transaction("address2", "address1", 50));

console.log("starting the miner...");
savjeeCoin.minePendingTransactions("xaviers-address");
console.log(savjeeCoin.pendingTransactions);

savjeeCoin.minePendingTransactions("xaviers-address");


console.log(savjeeCoin.getBalanceOfAddress("xaviers-address"));



