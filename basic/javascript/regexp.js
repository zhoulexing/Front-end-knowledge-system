/**
 * 建立正则表达式的两种方式
 *      对象字面量: var reg = /abc/g;
 *      构造函数：var reg = new RegExp('anc', 'g');
 *      
 * 正则对象的属性
 *      i: 执行忽略大小写的匹配
 *      g: 执行全局匹配
 *      m: 执行多行匹配
 * 
 * 正则对象的方法
 *      test: 返回布尔值，验证是否匹配模式，如果带有g修饰符，则每次从上一次结束的位置开始匹配
 *      exec: 返回匹配的结果，匹配成功返回装有匹配结果的数组，失败返回null，如果包含圆括号，则数组包括多个元素
 * 
 * 字符串对象的方法
 *      match: 与exec方法方法比较类似，在加g修饰符的时候不一样，match放回所有匹配元素，exec方法返回一个
 *      search: search方法会返回匹配成功后的索引，会自动忽略g修饰符
 *      replace: 替换匹配成功的结果，加g的话，则替换全部匹配的，第二个参数可以使用$符合，也可以是一个函数
 *      split: split('字符串的分割正则','返回数组的最大成员数')
 */

var str = '_x_x_';
var reg = /x/g;
console.log(reg.test(str), reg.lastIndex);

var str1 = '_x_x_a_x_x_b_';
var reg1 = /_(x)_(x)_/;
console.log(reg1.exec(str1));

var str2 = '_x_x_';
var reg2 = /x/g;
console.log(str2.replace(reg2, 'y'));

var str3 = '1233231234234';
var reg3 = /(?=(?!b)(\d{3})+$)/g;
console.log(str3.replace(reg3, ','));


