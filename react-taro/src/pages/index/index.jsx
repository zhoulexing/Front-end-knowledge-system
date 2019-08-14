import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import ZlxInput from '../../ui/input';
import './index.scss'


@connect(({ counter }) => ({
  counter
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View className='header'>
          <ZlxInput />
        </View>
      </View>
    )
  }
}

export default Index
