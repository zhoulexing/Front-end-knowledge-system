### 编译上下文
编译上下文主要是用来告诉编译器那些文件是有效的，哪些是无效的，
Typescript的编译上下文是tsconfig.json文件，具体配置项见官方文档
[Typescript上下文](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#tsconfig-json)。


### 声明空间
在Typescript中有两种声明空间：类型声明空间和变量声明空间。
#### 类型声明空间
类型声明空间用来做类型注解，用interface和type声明的空间不可以用做变量。
```
class Foo {}
interface Bar {}
type Bas = {}
```
#### 变量声明空间
变量声明空间包含可用做变量的内容，class声明的变量既可以用做类型注解，也可以当做变量使用。
```
class Foo {}
const someVar = Foo;
const someOtherVar = 123;
```


### 模块
模块分为全局模块和文件模块
#### 全局模块
模块中未使用export等导出关键字，则此模块中声明的变量是全局变量。
```
// foo.ts
const foo = 123;
// bar.tx
const foo = 123; // now allowed
```
#### 文件模块
模块中含有import和export关键字，则会创建一个本地作用域。
```
export const foo = 123;
import { foo } from './foo';
const bar = foo;
```
#### 文件模块详情
Typescript可以根据module的值commonjs, amd, es modules, others编译成不同的javascript类型。
模块查找与node基本一样，也可以重写类型的动态查找。
```
declare module 'foo' {
    export var bar: number;
}

import * as foo from 'foo';
foo === { bar: number }
```
import/require仅仅是导入类型, 如下只做了两件事，分别是导入foo模块的所有类型信息、确定foo模块运行的依赖关系。
```
import foo = require('foo');
```
#### globals.d.ts
globals.d.ts文件用来将一些接口或者类型放入全局命名空间里，这些定义的接口和类型能在你的所有TypeScript代码里使用。


### 命名空间
Typescript中提供了namespace关键字来声明命名空间。
```
namespace Utility {
    export function log(msg) {
        console.log(msg);
    }
    export function error(msg) {
        console.log(msg);
    }
}

// usage
Utility.log('Call me');
Utility.error('maybe');
```


### 动态导入表达式
需要在tsconfig.json中将module设为esnext。
```
import(/* webpackChunkName: "momentjs" */ 'moment')
    .then(moment => {
        // 懒加载的模块拥有所有的类型，并且能够按期工作
        // 类型检查会工作，代码引用也会工作  :100:
        const time = moment().format();
        console.log('TypeScript >= 2.4.0 Dynamic Import Expression:');
        console.log(time);
    })
    .catch(err => {
        console.log('Failed to load moment', err);
    });
```


### 类型概览
Typescript中类型有原始类型、数组、接口、内联类型注解、特殊类型、泛型、联合类型、交叉类型、
元组类型、类型别名。
```
let num:number;
let str:string;
let bool:boolean;

let boolArray: boolean[];

interface Name = {
    first: string,
    second: string
};
let name: Name = {
    first: 'John',
    second: 'Doe'
};

let name: {
    first: string,
    second: string
};
let name: Name = {
    first: 'John',
    second: 'Doe'
};

let power: any;
let val: null;
let alias: undefined;
function log(message: string):void {
    console.log(message);
}

function reverse<T>(items: T[]):T[] {
    const toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}

function formatCommandLine(command: string | string[]) {
    let line = '';
    if (typeof command === 'string') {
        line = command.trim();
    } else {
        line = command.join(' ').trim();
    }
}

function extend<T, U>(first: T, second: U): T & U {
    const result = <T & U>{};
    result.frist = frist.key;
    result.second = second.key;
    return result;
}

let nameNumber: [string, number];

type StrOrNum = string | number;
let sample: StrOrNum;
```


### 从Javascript迁移
+ 添加一个tsconfig.json文件
+ 把文件扩展名从.js改为.ts，开始使用any来减少错误
+ 开始在typescript中写代码，减少any的使用
+ 为你的第三方代码定义环境声明
```
declare var $:any;

declare type JQuery = any;
declare var $:JQuery;

declare module 'jquery';
declare module '*.css';
declare module '*.html';
```


### 环境声明
可以通过关键字declare来声明变量，将这些变量放到.ts或者.d.ts文件中里，globals.d.ts是全局的声明文件。
变量声明推荐使用接口，便于扩展。
```
interface Process {
    exit(code?:number):void;
}
declare let process:Process;

interface Process {
    exitWithLogging(code?: number): void;
}

process.exitWithLogging = function() {
    console.log('exiting');
    process.exit.apply(process, arguments);
};
```


### lib.d.ts
当安装Typescript时，会顺带安装lib.d.ts等声明文件。此文件包含了Javascript运行时以及
DOM中存在各种常见的环境声明。
