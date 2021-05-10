import path from 'path'

import webpack from 'webpack'
import { ConcatSource } from 'webpack-sources'
import { toDashed } from '../../../taro-shared/index'
import {
  promoteRelativePath,
  META_TYPE,
  taroJsComponents
} from '../../../taro-helper/index'

import { componentConfig } from '../template/component'
import { AddPageChunks, IComponent } from '../utils/types'
import TaroNormalModule from './TaroNormalModule'

const PLUGIN_NAME = 'TaroLoadChunksPlugin'


export default class TaroLoadChunksPlugin {
  commonChunks
  isBuildPlugin
  framework
  addChunkPages
  pages
  isBuildQuickapp

  constructor (options) {
    this.commonChunks = options.commonChunks
    this.isBuildPlugin = options.isBuildPlugin
    this.framework = options.framework
    this.addChunkPages = options.addChunkPages
    this.pages = options.pages
    this.isBuildQuickapp = options.isBuildQuickapp
  }

  apply (compiler) {
    const pagesList = this.pages
    const addChunkPagesList = new Map()
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
      let commonChunks
      const fileChunks = new Map()

      compilation.hooks.afterOptimizeChunks.tap(PLUGIN_NAME, (chunks) => {
        /**
         * 收集 common chunks 中使用到 @tarojs/components 中的组件
         */
        commonChunks = chunks.filter(chunk => this.commonChunks.includes(chunk.name)).reverse()
        for (const chunk of commonChunks) {
          Array.from(chunk.modulesIterable).some(m => {
            if (m.rawRequest === taroJsComponents) {
              const includes = componentConfig.includes
              if (Array.isArray(m.usedExports)) {
                m.usedExports.map(toDashed).map(includes.add.bind(includes))
              } else {
                componentConfig.includeAll = true
              }
              return true
            }
          })
        }

        /**
         * 收集开发者在 addChunkPages 中配置的页面及其需要引用的公共文件
         */
        if (typeof this.addChunkPages === 'function') {
          this.addChunkPages(addChunkPagesList, Array.from(pagesList).map(item => item.name))
          chunks.forEach(chunk => {
            const id = getIdOrName(chunk)
            addChunkPagesList.forEach((deps, pageName) => {
              if (pageName === id) {
                const depChunks = deps.map(dep => ({ name: dep }))
                fileChunks.set(id, depChunks)
              }
            })
          })
        }
      })

      /**
       * 在每个 chunk 文本刚生成后，按判断条件在文本头部插入 require 语句
       */
      compilation.chunkTemplate.hooks.renderWithEntry.tap(PLUGIN_NAME, (modules, chunk) => {
        if (chunk.entryModule) {
          if (this.isBuildPlugin) {
            return addRequireToSource(getIdOrName(chunk), modules, commonChunks)
          }

          const entryModule = chunk.entryModule.rootModule ? chunk.entryModule.rootModule : chunk.entryModule
          const { miniType } = entryModule

          if (miniType === META_TYPE.ENTRY) {
            return addRequireToSource(getIdOrName(chunk), modules, commonChunks)
          }

          if (this.isBuildQuickapp &&
            (miniType === META_TYPE.PAGE || miniType === META_TYPE.COMPONENT)
          ) {
            return addRequireToSource(getIdOrName(chunk), modules, commonChunks)
          }

          // addChunkPages
          if (fileChunks.size &&
            (miniType === META_TYPE.PAGE || miniType === META_TYPE.COMPONENT)
          ) {
            let source
            const id = getIdOrName(chunk)
            fileChunks.forEach((v, k) => {
              if (k === id) {
                source = addRequireToSource(id, modules, v)
              }
            })
            return source
          }
        }
      })
    })
  }
}

/**
 * @returns chunk.id || chunk.name
 */
function getIdOrName (chunk) {
  if (typeof chunk.id === 'string') {
    return chunk.id
  }
  return chunk.name
}

/**
 * 在文本头部加入一些 require 语句
 */
function addRequireToSource (id, modules, commonChunks) {
  const source = new ConcatSource()
  commonChunks.forEach(chunkItem => {
    source.add(`require(${JSON.stringify(promoteRelativePath(path.relative(id, chunkItem.name)))});\n`)
  })
  source.add('\n')
  source.add(modules)
  source.add(';')
  return source
}