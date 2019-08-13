import Taro, {  } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtIcon } from 'taro-ui'

import './index.scss'

export function Header() {
    return (
        <View className='header'>
            <AtInput name='' placeholder='搜索' type='text' clear>
                <AtIcon value='search'/>
            </AtInput>
        </View>
    )
}