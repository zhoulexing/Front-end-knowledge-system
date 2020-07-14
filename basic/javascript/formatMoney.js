function toThousands(num) {
    let result = [];
    let counter = 0;
    num = (num || 0).toString();
    for(let length = num.length - 1, i = length; i >= 0; i--) {
        counter++;
        result.unshift(num.charAt(i));
        if(counter % 3 === 0 && i !== 0) {
            result.unshift(',');
        }
    }
    return result.join('');
}
console.log(toThousands(123456));


function toThousands2(num) {
    let result = '';
    let counter = 0;
    num = (num || 0).toString();
    for(let length = num.length - 1, i = length; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if(counter % 3 === 0 && i !== 0) {
            result = ',' + result;
        }
    }
    return result;
}
console.log(toThousands2(123456));


function toThousands3(num) {
    let result = '';
    num = (num || 0).toString();
    while(num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if(num) {
        result = num + result;
    }
    return result;
}
console.log(toThousands3(123456));


function toThousands4(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}
console.log(toThousands4(123456));
