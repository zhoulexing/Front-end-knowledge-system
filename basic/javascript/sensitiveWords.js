const sensitiveWords = [
    "金额",
    "财产",
    "银行卡",
    "发票",
    "彩票",
    "金币",
    "比特币",
    "贷款",
    "催收",
    "返利",
    "赌博",
    "放款",
    "涨停",
    "股票",
    "账号",
    "账户",
    "汇款",
    "代开",

    "暴力",
    "催收",
    "反动",
    "裸聊",
    "裸贷",
    "毒品",
    "禁品",
    "凶杀",
    "恐怖",
    "骚扰",
    "色情",
    "诈骗",
    "钓鱼",

    "中国银联",
    "中国移动",
    "中国联通",
    "中国电信",
    "跳楼价",
    "清仓",
    "大甩卖",
    "血亏价",
    "中奖",
    "国家级",
    "全球首发",
    "大出血",
    "全民免单",
    "抽奖",
    "欲购从速",
];

const sensitiveMap = new Map();
for(let value of sensitiveWords) {
    if(value && value.trim().length < 2) {
        continue;
    }
    let map = sensitiveMap;
    for(let i = 0, length = value.length; i < length; i++) {
        let char = value.charAt(i);
        if(map.has(char)) {
            map = map.get(char);
        } else {
            const item = new Map();
            map.set(char, item);
            map = item;
        }
        if(i === length - 1) {
            map.set("end", true);
        }
    }
}

function checkSensitiveWords(sensitiveMap, text, startIndex) {
    let currentMap = sensitiveMap;
    let sensitiveWord = "";
    let flag = false;
    let wordNum = 0;
    for(let i = startIndex, length = text.length; i < length; i++) {
        let char = text.charAt(i);
        currentMap = currentMap.get(char);
        if(currentMap) {
            wordNum++;
            sensitiveWord += char;
            if(currentMap.has("end")) {
                flag = true;
                break;
            }
        } else {
            break;
        }
    }
    return { flag, sensitiveWord, wordNum };
}

function getSensitiveWords(text, map) {
    const set = new Set();
    let result = null;
    map = map || sensitiveMap;
    for(let i = 0, length = text.length; i < length; i++) {
        result = checkSensitiveWords(map, text, i);
        if(result.flag) {
            set.add(result.sensitiveWord);
            i = i + result.wordNum - 1;
        }
    }
    return set;
}

function filterSensitiveWords(text, map) {
    const words = getSensitiveWords(text, map);
    let reg = null;
    for(let word of words) {
        reg = new RegExp(word,"gi");
        text = text.replace(reg, `<em>${word}</em>`);
    }
    return text;
}


const words = filterSensitiveWords("你在中国银联大家财产金额金额");
console.log(words);
