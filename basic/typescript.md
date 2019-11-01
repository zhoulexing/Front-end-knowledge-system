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
globals.d.ts文件用来将一些接口或者类型放入全局命名空间里，这些定义的接口和类型能在你的所有 TypeScript 代码里使用。


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


