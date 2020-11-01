## react初始化渲染流程
react渲染主要是分为两个阶段，分别是调和阶段和commit阶段。在调和阶段，会指定每个fiber的firstEffect、
lastEffect、nextEffect，在commit阶段，就是根据这些Effect进行处理。

- react渲染的核心逻辑在ReactDOM对象上，首先调用ReactDOM的render方法；
- 第一步会根据dom容器即挂载点创建一个root对象，root对象通过_internalroot属性能获取FiberRootNode;
- FiberRootNode通过current属性能获取HostRootFiber,HostRootFiber是顶级的fiber；
- 每个fiber对象上都有三个主要的属性，分别是stateNode、updateQueue、alternate，
    不同的fiber，stateNode指向也会不同，HostRootFiber的stateNode指向FiberRootNode，
    类fiber和函数fiber的stateNode指向render方法返回的element，原声元素的stateNode是原声dom；
    updateQueue是用来处理fiber更新的，alternate属性是fiber和workInProgress相互指向对方的。
- 初始化fiber节点后，会调用scheduleUpdateOnFiber方法，setState和hook里useState的更新装状态方法
    都会调用此方法；
- scheduleUpdateOnFiber方法中首先会回去HostRootFiber,然后调用performSyncWorkOnRoot，
    performSyncWorkOnRoot方法中会调用renderRootSync方法，当然这中间会进行优先级的计算；
- renderRootSync方法会调用workLoopSync方法，workLoopSync方法中，会进入一个大循环，
    从根节点一直遍历调用performUnitOfWork方法；
- performUnitOfWork方法会调用beginWork方法，并获取下一个Fiber，然后判定下个Fiber是否为null，
    如果是null则进入completeUnitOfWork方法，不是null则继续进行调用performUnitOfWork方法。
- beginWork方法会根据workInProgress的tag调用的不同的mount方法，类组件会在此过程中调用render方法，
    以及render方法之前的所有生命周期函数。此外还会获取组件children中的元素，根据每个子元素生成对应的fibre对象，
    并指定fiber之间的关系，最后返回第一个子fiber对象。
- completeUnitOfWork方法只有在子fiber为null的时候执行，而子fiber为null要么就是原声元素、字符串或数字，
    所以这个方法的目的就是生成原声元素、字符串或数字，并将其复制给stateNode。
- 调和过程结束之后，就看是调用commitRoot方法；
- commitRoot或commitRootImpl方法的核心主要是三个方法，分别是commitBeforeMutationLifeCycles、
    commitMutationEffects、recursivelyCommitLayoutEffects;
- commitBeforeMutationLifeCycles方法会执行组件getSnapShotBeforeUpdate，当前前提是组件处在更新阶段
    且是class组件；
- commitMutationEffects方法会将组件的stateNode进行拼接或插入到对应的dom上，编程最终页面上显示的dom；
    而且类组件
- recursivelyCommitLayoutEffects方法会执行组件渲染完之后的生命周期函数，如果是初始化渲染，
    则会执行componentDidMount函数，如果是更新，则会执行componentDidUpdate方法。

## react更新渲染流程
react只有调用setState方法或者调用hook的方法来进行更新，而这最终都会调用scheduleUpdateOnFiber方法，
后续的流程与初始化流程差不多，只不过在过程中会根据不同的条件进行不同的逻辑处理。如果组件是正在更新中，
则会将performSyncWorkOnRoot方法添加到queueCallack数组中，待上一次渲染完，在执行queueCallback数组
中的函数进行更新。