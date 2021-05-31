## 如何理解盒模型（box-sizing）？

css 盒子模型又称框模型，由元素内容（content）、内边距（padding）、边框（border）、外边距（margin）组成；

css 盒子又分为块状盒子和内联盒子，内联盒子不会换行，width 和 heigh 不起作用，
垂直方向的内边距、外边距、边框会被应用，但不会把其他处于 inline 状态的盒子推开，
水平方向的内边距、外边距、边框会被应用，会把其他处于 inline 状态的盒子推开；

无论是块状盒子还是内联盒子，其实都可以看成是两个盒子，外层盒子负责元素是可以一行显示，还是只能换行显示，
内在盒子负责元素的宽高、内容呈现什么的。基于此 display: block，可以理解成 display: block-block,
display: inline, 可以理解成 display: inline-inline，类似于 inline-block；

通过 box-sizing 可以设置元素的盒模型，主要有三种，分别是 content-box、border-box、padding-box，padding-box 很少用，
在给定相同宽度的情况下，不同的盒模型会导致最终的盒大小不一样；

盒模型中的 width 默认值是 auto,具有四种不同的表现，分别是充分利用空间（如 div、p 元素的宽度默认是 100%于父级容器的）、
收缩于包裹（浮动、绝对定位、inline-block 元素或 table 元素）、收缩到最小（如 table-layout 为 auto 的表格中，一柱擎天，css3 叫 min-content）、
超出容器限制（如文字超出元素宽度，但还是会无视父级容器的宽度限制，css3 叫 max-content）；

盒模型中的 height 默认值是 auto,也可以设置百分比，但如果父元素为 auto，则百分比值就完全忽略了，另外 height 百分比值要生效，
html 和 body 元素必须设置 100%；

盒模型中的 margin、padding 百分比无论是水平方向还是垂直方向都是相对于父元素的宽度计算的，border 不支持百分比,
margin 值为 auto 的情况下，会在自适应的方向上会根据剩余空间进行自动安排;

垂直方向的外边距合并的 3 种场景分别是：1）相邻兄弟元素合并、2）父级和第一个/最后一个合并、3）空块级元素的 margin 合并，
父子元素合并的解决方案如下：父元素设置为块状格式化上下文元素、父元素设置 border 上下值、父元素设置 padding 值、
父元素和子元素之间添加内联进行分割；

## 如何理解 css 中的内联元素？

内联元素在css中有着举足轻重的地位，理解内联元素，离不开line-height，div高度是由行高决定的，而非文字；

字母 x 的下边缘就是内联元素的基线，ex 的单位就是指 x 的高度；

行距的计算公式:行距 = line-height - font-size，font-size 的大小就是三线格的高度；

vertical-align 百分比是相对于 line-height 值进行计算的，
vertical-align：middle 中的 middle 指的是基线往上 1/2x-height 高度；

## 如何理解 BFC（块级格式化上下文）? 有哪些属性可生产 BFC？

块级格式化上下文是 css 可视化渲染的一部分，在一个区域内，规定了内部元素的渲染方式，以及浮动元素之间的影响关系。

1. BFC 就像是一道屏障，隔离出一道区域，是内部和外部渲染互不影响；
2. BFC 的区域不会和外部的浮动区域发生叠加，也就是说外部任何浮动元素和 BFC 区域是泾渭分明的；
3. BFC 在计算内部高度的时候，浮动元素也会计算在内；
4. BFC 内部的元素会紧靠着浮动元素进行布局。

浮动元素（float 不为 none）、绝对定位元素（position 为 absolute 和 fixed）、行内块元素（display 为 inline-block）、
表格单元格（display 为 table-cell）、overflow 值不为 visible 的块元素、弹性元素（display 为 flex 或 inline-flex）、
网格元素（display 为 grid 或 inline-grid）、多列容器（元素的 column-count 或 column-width 不为 auto）。

## css 选择器的优先级？

!important > inline > id > class > tag > \* > inherit > default。

## 如何移除 inline-block 间隙？

移除空格
使用 margin 负值
使用 font-size：0
letter-spacing
word-spacing

## float 与 absolute 在一起能起作用吗？

不能，float 会失效。另外 absolute 是非常独立的 css 属性值，其样式和行为表现不依赖其他任何 css 属性就可以完成，
没有设置 top/right/bottom/left 则相当于相对定位；

## clear: left | right | both 为何能清楚浮动？

元素设置了 clear，则表明此元素两边不允许有浮动元素，为了满足它，所以不能将流元素和浮动元素放一起。
又因为在计算元素的宽高时是根据元素的实际位置进行计算的，所以清楚浮动后父元素高度能够撑起来。

## 如何实现水平居中和垂直居中？

答：见 basic/html-css/layout.html

## letter-spacing、word-spacing 区别？

letter-spacing 表示单词之间的间隔；word-spacing 表示空格该如何处理，之所以 word-spacing 叫 word-spacing 不叫 blank-spacing
是因为英文中单词是已空格进行分隔的，要想控制单词之间的间距，只能向空格进行开刀。word-spacing 可以作用于&nbsp、space、tab 和换
行敲出来的空格。

## 换行相关的属性以及如何使用？

对于文字的排版主要要考虑以下几个情况：空格的处理（是否合并）,换行的处理（回车换行和自动换行）,断词的处理（英文单词）。

white-space 是用来处理空格和换行的。 有如下几个值：normal、nowrap、pre(preserve)、pre-wrap、pre-line。normal 表示连续的空白符会被合并，
换行符会被当作空白符来处理。nowrap 表示永不换行，pre 表示空格和换行全部保留
下来，但自动换行没了。pre-wrap 表示保留空格和换行符，且可以自动换行。pre-line 空格被合并，换行和自动换行保留。

word-break 是控制单词如何被拆分换行的。它有三个值 normal、break-all、keep-all。keep-all 表示一律不拆分换行、只有空格可以触发自动换行。
break-all 表示所有单词碰到边界一律拆分换行。

word-wrap 是用来控制单词是如何被拆分换行的，有两个值 normal、break-word。break-word 表示只有当一个单词一整行都显示不下时，才会拆分换行该单词。

## 如何理解 css 层叠？

在 css 世界中，z-index 属性只有和定位元素（position 不为 static 的元素）在一起的时候才有作用；
但随着 css3 新世界的到来，z-index 已经并非只对定位元素有效，flex 盒子的子元素也可以设置 z-index 属性。

css2.1 层叠顺序为 background/border、负 z-index、block、float、inline、z-index:auto|0、正 z-index。

## 线性渐变中的按角度渐变，这个角度是怎么计算的？

角度是以盒子的垂直平分线作为轴，然后顺时针旋转角度进行渐变。

## animation的属性？

animation-name: 动画名称；
animation-duration: normal | reverse | alternate | alternate-reverse 指定一个动画需要完成一个周期的时间；
animation-time-function: ease | linera | steps 指定动画计时函数；
animation-delay: 指定动画延迟时间，默认是0；
animation-iteration-count: 指定动画播放次数；
animation-direction: normal | alternate 指定动画播放的方向，normal表示动画每次循环都是向前播放，alternate 表示动画在第偶数次方向向前播放，第奇数次向反方向播放；
animation-play-state: running | paused 表示动画播放状态；
animation-fill-mode: normal | forwards | backwards | both 指定动画结束时的位置；

## transition的属性？

transition-property: 过度属性；
transition-duration: 过度时间；
transition-timing-function: 过度时间函数；
transition-delay: 过度延迟时间；


