/* 
    标题
        对浏览器多进程，浏览器内核多线程，JS单线程，JS事件循环机制的理解

    浏览器多进程
        进程是cpu资源分配的最小单位（系统会给它分配内存）；线程是cpu调度的最小单位，一个进程中可以有多个线程。
        对于chrome来说，主要有以下几个进程：
            Browser进程：浏览器的主进程（负责协调、主控），只有一个。作用有：
                负责浏览器界面显示，与用户交互。如前进，后退等；
                负责各个页面的管理，创建和销毁其他进程；
                将Renderer进程（渲染进程）得到的内存中的Bitmap，绘制到用户界面上；
                网络资源的管理，下载等。
            第三方插件进程：每种类型的插件对应一个进程，仅当使用该插件时才创建。
            GPU进程：做多一个，用于3D绘制。
            渲染进程（内核、多线程）：默认每个tab页一个进程，互不影响，主要作用：
                页面渲染，脚本执行，事件处理等。

    浏览器内核（渲染进程）
        页面的渲染，JS的执行，事件的循环都在这个进程内进行。浏览器的渲染进程是多线程的，具体有以下几个：
            GUI渲染线程：
                负责渲染浏览器界面，解析HTML、CSS、构建DOM树和RenderObject树，布局绘制等；
                当界面进行重绘或回流时，此线程就会执行；
                GUI渲染线程和JS引擎线程互斥。
            JS引擎线程：
                负责处理JS脚本；
                JS引擎线程和GUI渲染线程互斥。
            事件触发线程：
                归属于浏览器，而不是JS，用来控制事件循环；
                当JS执行代码块（如setTimeout, dom事件，异步请求等），会将对应任务添加到事件线程中；
                当对应的事件符合触发条件时，该线程会把事件添加到待处理队列的末尾。
            定时触发器线程：
                传说中的setInterval与setTimeout所在线程；
                浏览器的定时计数器并不是由js线程去计数的，而是由定时器线程计数并触发定时，计时完毕后添加到事件队列中。
            异步http请求线程：
                在XMLHttpRequest在连接后是通过浏览器新开一个线程请求；
                如果设置有回调函数，异步线程就产生状态变更事件，将这个回调再放入事件队列中。
        浏览器渲染流程：
            解析html建立dom树；
            解析css构建cssom树；
            由dom树和cssom树经过布局计算构建render树，在构建之前所有的资源均已加载完，包括js，除非设置了defer或async；
            绘制render树，绘制页面像素信息。
        
    Browser主进程和渲染进程之间的通信
        Browser进程收到用户请求，首先需要获取页面内容（如通过网络下载资源），随后将该任务通过接口传递给渲染进程；
        渲染进程接口收到消息后，交给GUI渲染线程，开始渲染；
        GUI线程接受请求，加载网页并开始渲染网页，这其中可能需要Browser进程获取资源和GPU进程来帮助渲染；
        当然可能会有js引擎操作dom；
        最后渲染进程将结果传递给Browser主进程，主进程将结果绘制出来。

    JS引擎的Event Loop
        JS为什么是单线程的？
            假设JS是多线程的，现在有两个线程同时操作dom，一个删除dom，一个修改dom，浏览器该如何执行呢？
        JS为什么需要异步？
            如果JS中不存在异步，就会自上而下的按顺序执行，如果上一行时间很长，那么下面的代码就会被组赛，
            对于用户而言，组赛意味着卡死，对用户的体验很差。
        JS单线程是如何实现异步的？
            JS将所有的任务分为同步任务和异步任务，首先判断JS是同步还是异步，同步则进入主线程，异步就进入event table;
            异步任务在event table中注册函数，当满足条件触发条件后，被推入event queue; 同步任务进入主线程后一直执行，
            直到主线程空闲时，才会去event中查看是否有可执行的异步任务，如果有就推入主进程中。  
        JS事件中的宏任务和微任务
            macrotask(宏任务)：每次执行栈执行的代码就是一个宏任务
                每一个task会从头到尾将这个任务执行完毕，不会执行其它；
                浏览器会在一个task执行结束，下一个task执行前，对页面进行重新渲染；
                macrotask中的事件都是放在一个事件队列中的，而这个队列由事件触发线程维护；
                主代码块；
                I/O;
                setTimeout;
                setInterval;
                setImmediate;
                
            microtask(微任务)：当前dask执行结束之后，立即执行的任务
                在当前task任务后，下一个task之前，在渲染之前；
                所以它的响应速度比setTimeout快，因为无需等渲染；
                在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕；
                microtask中的所有微任务都是添加到微任务队列，而这个队列由JS引擎线程维护，因为它是在主线程下无缝执行的；
                process.nextTick;   
                Promise;
                MutationObserver;
                requestIdleCallback；
                requestAnimationFrame;
*/
function sleep(num = 1) {
    var start = new Date().getTime();
    var end;
    while(true) {
        end = new Date().getTime();
        if((end - start) === (num * 1000)) {
            break;
        }
    }
}

function test1() {
    console.log(1);
    setTimeout(function () {
        console.log(2);
    }, 0);
    console.log(3);
}
// test1();

function test2() {
    setTimeout(function () {
        console.log('开始执行定时器了');
    }, 0);
    new Promise(function (resolve) {
        console.log('开始promise了');
        resolve();
    }).then(function () {
        console.log('结束promise了');
    });
    console.log('代码执行结束啦');
}
// test2();


function test3() {
    window.requestIdleCallback(function(deadline) {
        console.log('requestIdleCallback', deadline.timeRemaining());
    });
    setTimeout(function() {
        console.log('定时器开始啦');
    }, 4);
    sleep(5);
}
// test3();

function test4() {
    var i = 0;
    function step() {
        console.log(i);
        i += 1;
        if(i < 5) {
            window.requestAnimationFrame(step);
        }
        sleep(5);
    }
    window.requestAnimationFrame(step);
    console.log('end');
}
test4();
