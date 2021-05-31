## 什么是 javascript？

javascript 是在 1995 年问世，它当时主要的作用是为了替代服务器端语言处理的输入验证。
当时的服务器性能很低，用户在输入表单信息，提交到服务器后，可能过很长时间才会收到服务
器端返回的错误信息，如某某信息未输入，体验很差，因此网景公司希望通过在其 Navigator
浏览器中加入 javascript 来改变这个局面。

在 web 越来越受欢迎后，微软也决定向 IE 投入更多的资源，为了与 javascript 发生许可纠
纷，所以改名为 JScript，但因此也就出现了两个版本。直到 1997 年，javascript 作为提案
被提交给欧洲计算机制造商协会（Ecma），自此以后，各浏览器上就以 ECMAScript 作为自己浏
览器实现的依据。

javascript 包含三个部分：核心（ECMAScript）、文档对象模型（DOM）、浏览器对象模型（BOM），
因为担心网景和微软各行其是，web 发生分裂，万维网联盟开始制定了 DOM 标准的过程，各大浏
览器每个版本的发布都会改进 DOM 的支持度。BOM 没有相关标准 javascript 的实现，不过由于
HTML5 的出现，之前很多与 BOM 有关的问题都迎刃而解了。

## javascript中的属性有哪些？async和defer的区别？是否能监听到load和DOMContentLoaded事件？

script 标签元素有8个属性：
async：表示立即下载，但不能阻止其他页面动作，只对外部文件有效；
defer：表示脚本可以延迟到文档完全被解析和显示之后再执行，只对外部文件有效；
charset：指定外部文件的字符编辑，大多数浏览器不在乎它的值；
crossorigin：可以通过此属性拿到跨域脚本的错误信息，值为“anonymous”，请求不发送凭证信息，“use-credentials”请求会包含凭据；
integrity：允许比对接收到的资源和指定的加密签名以验证子资源完整性；
language：废弃，表示代码块中的语言；
src：外部文件的地址；
type：表示代码块中脚本语言的内容类型（MIME），代替language，如text/javascript; 

其中最主要的是async和defer属性，defer属性会让脚本延迟到整个页面都解析完毕后再运行，即立即下载，延迟执行，
但都会在DOMContentLoaded事件之前执行；async与defer类似，也是立即下载，不确定什么时候执行，但肯定在load
事件之前执行。

通过document.createElement方法创建的脚本添加到dom中，是异步方式加载的，相当于添加了async属性。

<link rel="preload" href="xxx.js" />可以对资源进行预加载。

## 如何理解作用域、作用域链、上下文、上下文栈、闭包、箭头函数、原型、原型链、构造函数？

作用域就是在代码运行中，某些特定部分中的变量、函数和对象的可访问性。换句话说就是代码中变量和其他资源的可见性。
变量的作用域分为两种：全局变量、局部变量，在 ES6 之前是没有块级作用域概念的，只有函数作用域。

上下文，主要是关键字 this 的值，是由函数运行时决定的，简单来说就是谁调用此函数，this 就指向谁。

作用域链就是由作用域形成的链条，决定了变量值的查找过程，内部环境可以通过作用域链访问所有外部环境。

上下文栈就是存放上下文的一个栈，ji 刚开始执行的时候会压入一个全局的上下文，当执行到函数时，又会压入
函数的上下文，执行完毕就会弹出函数上下文。

闭包就是能够读取其他函数内部变量的函数。闭包会使得函数中的变量都被保存在内存中。

箭头函数默认绑定外层 this，不能用 call 方法修改里面的 this。

原型及原型链的关系见图 images/prototype.jpg。

原型对象的构造函数是对象本身。

## Map 和 Object有什么区别？

在删除的性能上，Map要优于Object，其他的性能都差不多，Map的键值对添加是有顺序的，而Object没有。

## 对迭代器和生成器以及async的理解？

见basic/javascript/iterator、generator、async.js。

## 手写 new、call、apply、bind、promise

见 basic/javascript/call-apply、new、bind、promise.js。

## 获取 js 对象属性的方法有哪些？ 每个方法是否能获取原型上的属性？

有 Object.keys、for in、getOwnPropertyNames；
Object.keys 和 getOwnPropertyNames 只能获取对象上的枚举属性，for in 能获取原型链对象上新加的属性，
对于 for in 可以通过 hasOwnProperty 方法来过滤掉原型链上的属性。

## js 如何获取父节点、子节点和兄弟节点？

API 中 node 是包含空格、换行、文本等，element 才是元素（不包含文本）。获取父节点：dom.parentNode、dom.parentElement、
dom.offsetParent（获取所有的父节点）；获取子节点：dom.childNodes、dom.children、dom.firstChild、dom.firstElementChild、
dom.lastChild、dom.lastElementChild； 获取兄弟节点：dom.previousSibling、dom.previousElementSibling、dom.nextSibling、
dom.nextElementSibling。

## js 中 clientWidth、clientLeft、offsetWidth、offsetLeft、scrollWidth、scrollLeft、

window.innerWidth、window.outerWidth、window.screenLeft、window.screenX 之间的区别？
window.getComputedStyle 方法获取到的宽高是什么宽高？位置是什么位置？dom.getBoundingClientRect 获取到的又是什么？

clientWidth 表示元素的宽度 + 内边距的宽度，clientLeft 表示宽度的起点距离外边框的距离，即边框的宽度；
offsetWidth 表示元素的宽度 + 内边距的宽度 + 边框的宽度，offsetLeft 表示外边框相对于第一个相对定位的父级元素的距离；
scrollWidth 表示元素的宽度 + 内边距的距离 + 滚动区域的宽度, scrollLeft 表示滚动的位置相对于顶点的距离。

window.getComputedStyle 获取到的是整合后的 css 样式属性值对象; dom.getBoundingClientRect 获取到的是一个元素相对根节点
的上下左右坐标以及宽高。

## js 解释执行过程是怎样的？基于执行过程如何理解作用域链？什么是 JIT？内存碎片如何处理？

转换为记号流，然后做语法分析，将记号流存储到数据结构中，形成 AST 即抽象语法树。运行阶段又分为两步，第一步是预解析，将
抽象语法树复制到当前执行上下文中，然后将全局中的 var、function 变量进行属性提升；第二步是进行真实的赋值，并执行代码。

注意：对于已经声明并赋值的变量，如果在下面进行再次声明但不赋值，则不会进行覆盖.

``` 
var a = 1;
var a;
console.log(a); // 1
```

作用域链是处理标识符时进行变量查找的变量对象列表，每个执行上下文都有自己的变量对象，对于全局上下文而言，其变量对象
就是全局对象本身。对于函数而言，其变量对象就是活动对象。
函数的属性[[Scope]]是在预解析的时候就已经存在，它包含了所有的上层变量对象，并一直保存在函数中。就算函数永远没被激活，
[[Scope]]也都还是存在函数对象上。函数的作用域在预解析阶段就已经定义了，而在代码执行阶段则是将函数的作用域添加到作用域
链上。

``` 
Scope = AO + [[Scope]]; // 预解析Scope属性
Scope = [AO].concat([[Scope]]); // 执行阶段，将AO添加到作用域链的前端，[AO]是函数的活动对象
```

JIT 是对 js 执行过程中的优化，对于同样的代码，如果运行次数超过一次，就称为 warm。如果一段代码变得更加 warm，
则 JIT 将把这段代码送到编译器中编译并且保存一个编译后的版本。下一次同样代码执行的时候，引擎会跳过翻译过程，
直接使用编译后的版本。从而优化性能。

对于内存碎片处理方式一种是优化存储方式，还有就是重新整理内存空间。

## 防抖和节流有什么区别？分别如何实现？

防抖是在一段时间内只会执行一次，节流是在一段时间内按照设定的延迟时间间隔执行。
具体实现见 basic/javascript/throttleAndDebounce.js。

## 你知道哪些设计模式？

见 basic/javascript/design-\*.js。

## escape、encodeURI、encodeURIComponent 的区别？

escape：对字符串进行编码；
encodeURI：对 url 进行编码，特殊字符不编码；
encodeURIComponent：对 url 进行编码，编码范围比 encodeURI 要广，即不编码的特殊字符要比 encodeURI 少。

## 字节和字符的区别？

UTF-8 编码，一个英文字符等于一个字节，一个中文（含繁体）等于三个字节；
Unicode 编码，一个英文等于两个字节，一个中文（含繁体）等于两个字节。

## ArrayBuffer、SharedArrayBuffer、Typed Array、DataView、Blob、File、btoa、atob

ArrayBuffer 是通用的、固定长度的，未加工的二进制数据 buffer。ArrayBuffer 的内容无法被直接读写。
SharedArrayBuffer 的 api 和 ArrayBuffer 类似，不同的是 SharedArrayBuffer 可用于不同 web 页面之间的内存共享。
Typed Array 表示的是一簇类，一种 Types Array 就是一种格式，不同的格式去理解一段内存，得到的结果自然就不一样。
DataView 提供了对 ArrayBuffer 内容的底层读写接口。简单来说，DataView 就提供了各种方法来让你操作 ArrayBuffer。
Blob 是前端的一个专门用于支持文件操作的二进制对象。
File 继承 Blob。
btoa 从 String 对象中，创建一个 base64 编码的 ASCII 字符串，其中字符串中的每个字符都被视为一个二进制数据字节；
atob 将 base64 解码为字符串。

## ArrayBuffer 与 String 之间的转化

```
function arrayBufferToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

function stringToArrayBuffer(byteString) {
    var byteArray = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.codePointAt(i);
    }
    return byteArray;
}

function stringToArrayBuffer(str) {
    return (new Uint8Array([].map.call(str,function(x){return x.charCodeAt(0)}))).buffer;
}

function arrayBufferToString(buffer) {
    var byteArray = new Uint8Array(buffer);
    var byteString = '';
    for (var i = 0; i < byteArray.byteLength; i++) {
      byteString += String.fromCodePoint(byteArray[i]);
    }
    return byteString;
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for(let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
```

## 对 CMD、AMD、CommonJS、ES6 模块如何理解？

## PWA 使用过吗？serviceWorker 的使用原理是啥？

## 如何理解BOM？

区分window.outerWidth、window.innerWidth、document.documentElement.clientWidth, 
经过测试这三个值是一样的，都是页面可视区域的大小。

## 如何理解DOM？


