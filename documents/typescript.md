### 声明空间

在 Typescript 中有两种声明空间：类型声明空间和变量声明空间。
对于类型如果

#### 类型声明空间

类型声明空间用来做类型注解，用 interface 和 type 声明的空间不可以用做变量。

```
class Foo {}
interface Bar {}
type Bas = {}
```

#### 变量声明空间

变量声明空间包含可用做变量的内容，class 声明的变量既可以用做类型注解，也可以当做变量使用。

```
class Foo {}
const someVar = Foo;
const someOtherVar = 123;
```

### 类型概览

Typescript 中类型有原始类型、数组、元祖、对象、特殊类型、类、接口、泛型、内联类型注解、联合类型、交叉类型、
索引类型、条件类型等。

### 类型编程

类似于 js 的方法，利用范型可根据传入的类型生成对应的类型。基于此可很好的利用类型工具库。

### 实用技巧

属性注释，会在应用的时候进行提示；
巧妙利用类型工具库。

### 模块

模块分为全局模块和文件模块

#### 全局模块

模块中未使用 export 等导出关键字，则此模块中声明的变量是全局变量。

```
// foo.ts
const foo = 123;
// bar.tx
const foo = 123; // now allowed
```

#### 文件模块

模块中含有 import 和 export 关键字，则会创建一个本地作用域。

```
export const foo = 123;
import { foo } from './foo';
const bar = foo;
```

### 命名空间

Typescript 中提供了 namespace 关键字来声明命名空间。

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

### 声明文件

```
declare module 'foo' { // 声明一个模块
    export var bar: number;
}
declare var; // 声明全局变量
declare function; // 声明全局方法
declare class; // 声明全局类
declare enum; // 声明全局枚举类型
declare namespace; // 声明（含有子属性的）全局对象
interface 和 type // 声明全局类型
```

### tsconfig.json

```
{
    "compilerOptions": {
        "experimentalDecorators": true,// 装饰器
        "target": "es5", // 编译为es5
        "module": "esnext", // 指定使用模块
        "sourceMap": true, // 把 ts 文件编译成 js 文件的时候，同时生成对应的 map 文件
        "allowJs": true, // 允许编辑js文件
        "allowSyntheticDefaultImports": true, // 允许import React from "react"，而不是import * as React from "React"
        "forceConsistentCasingInFileNames": true,
        "removeComments": true, // 移除注释，注意import()按需加载的注释
        "noImplicitAny"：false, // 为 false 时，如果编译器无法根据变量的使用来判断类型时，将用 any 类型代替。为 true 时，进行强类型检查，会报错
        "outDir": "dist", // 输出目录
        "moduleResolution": "node", // 模块解析策略
        "strict": true, // 严格模式
        "lib": ["esnext", "dom"],
        "strictNullChecks": false, // 为false， null可赋给void，true则不可以
        "declaration": true, // 生成声明文件
        "emitDecoratorMetadata": true, // Reflect Metadata, yarn add reflect-metadata
    },
    "extends": "./config/base", // 复用配置文件
    "files"：[], // 只能指定文件，不能指定目录，且包含依赖；files的优先级最高，files > exclude > include
    "include": ["./src"], // 可指定目录，也可指定文件
    "exclude": [ // 有默认值，为node_modules、bower_components、jspm_packages 和编译选项 outDir 指定的路径。
        "dist",
        "node_modules"
    ]
}
```
