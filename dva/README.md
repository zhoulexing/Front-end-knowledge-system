#### nodejs环境需求
nodejs v6.9.0版本
设置国内镜像
`npm config set registry https://registry.npm.taobao.org `

#### chrome安装如下插件辅助开发:
- React Developer Tools
- Redux DevTools
- livereload

#### 先执行一次包更新
`npm install`

#### 开发执行(常驻后台即可)
`npm start`

- 将需要的state的节点注入到与此视图数据相关的组件上
```
function mapStateToProps(state, ownProps) {
	return {
			loading:state.getIn(['projectPre','projectMgr','loading']),
      ...
	}
}
```

- 将需要绑定的响应事件注入到组件上
```
function mapDispatchToProps(dispatch){
	return {
		...bindActionCreators(action, dispatch)
	}
}
```
React 开发规范
========================
###### React内置类型
```
React.PropTypes类型列表 (任何类型在最后加上isRequired则此在使用此组件时必须赋值)
React.PropTypes.array,//数组类型
React.PropTypes.bool,//布尔值类型
React.PropTypes.func,//函数类型
React.PropTypes.number,//数值类型
React.PropTypes.object,//JS对象类型
React.PropTypes.string, //字符串类型
React.PropTypes.node, // 所有可以被渲染的对象    
React.PropTypes.element,  // React 元素
React.PropTypes.oneOf(['News', 'Photos']), //只接受其中一个值的枚举类型
React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number     ]),
React.PropTypes.arrayOf(React.PropTypes.number), // 指定类型组成的数组
// 指定类型的属性构成的对象
 React.PropTypes.objectOf(React.PropTypes.number),
// 特定形状参数的对象
 React.PropTypes.shape({
  color: React.PropTypes.string,
  fontSize: React.PropTypes.number
}),
```
###### React生命周期
```
  挂载		
		componentWillMount   挂载前		
		componentDidMount	挂载后
	更新		
		componentWillUpdate		更新前		
		componentDidUpdate		更新后
		componentWillReceiveProps	当接收到props时		参数:nextProps
	    shouldComponentUpdate		是否执行更新
	卸载		
		componentWillUnmount
```
