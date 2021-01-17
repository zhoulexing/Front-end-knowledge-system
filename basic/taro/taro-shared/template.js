import { isBooleanStringLiteral, isNumber, isFunction } from "./is";
import { toCamelCase, toDashed, hasOwn } from "./utils";
import { Shortcuts } from "./shortcuts";
import {
    internalComponents,
    focusComponents,
    styles,
    events,
    specialEvents,
    singleQuote,
} from "./components";

const voidElements = new Set([
    "progress",
    "icon",
    "rich-text",
    "input",
    "textarea",
    "slider",
    "switch",
    "audio",
    "live-pusher",
    "video",
    "ad",
    "official-account",
    "open-data",
    "navigation-bar",
]);

const nestElements = new Map([
    ["view", -1],
    ["cover-view", -1],
    ["block", -1],
    ["text", -1],
    ["slot", 8],
    ["slot-view", 8],
    ["label", 6],
    ["form", 4],
    ["scroll-view", 4],
]);

const weixinAdapter = {
    if: "wx:if",
    else: "wx:else",
    elseif: "wx:elif",
    for: "wx:for",
    forItem: "wx:for-item",
    forIndex: "wx:for-index",
    key: "wx:key",
    xs: "wxs",
    type: "weapp",
};

export class BaseTemplate {
    exportExpr = 'module.exports ='
    isSupportRecursive
    supportXS = false
    miniComponents
    modifyCompProps
    modifyLoopBody
    modifyLoopContainer
    modifyTemplateResult
  
    Adapter = weixinAdapter
  
    buildAttribute (attrs, nodeName) {
      return Object.keys(attrs)
        .map(k => `${k}="${k.startsWith('bind') || k.startsWith('on') ? attrs[k] : `{${this.getAttrValue(attrs[k], k, nodeName)}}`}" `)
        .join('')
    }
  
    replacePropName (name, value, _componentName) {
      if (value === 'eh') return name.toLowerCase()
      return name
    }
  
    createMiniComponents (components) {
      const result = Object.create(null)
  
      for (const key in components) {
        if (hasOwn(components, key)) {
          let component = components[key]
          const compName = toDashed(key)
          const newComp = Object.create(null)
  
          if (isFunction(this.modifyCompProps)) {
            component = this.modifyCompProps(compName, component)
          }
  
          for (let prop in component) {
            if (hasOwn(component, prop)) {
              let propValue = component[prop]
              if (prop.startsWith('bind') || specialEvents.has(prop)) {
                propValue = 'eh'
              } else if (propValue === '') {
                propValue = `i.${toCamelCase(prop)}`
              } else if (isBooleanStringLiteral(propValue) || isNumber(+propValue)) {
                propValue = this.supportXS
                  ? `xs.b(i.${toCamelCase(prop)},${propValue})`
                  : `i.${toCamelCase(prop)}===undefined?${propValue}:i.${toCamelCase(prop)}`
              } else {
                propValue = `i.${toCamelCase(prop)}||${propValue || singleQuote('')}`
              }
  
              prop = this.replacePropName(prop, propValue, compName)
  
              newComp[prop] = propValue
            }
          }
          if (compName !== 'block') {
            Object.assign(newComp, styles, this.getEvents())
          }
  
          if (compName === 'swiper-item') {
            delete newComp.style
          }
  
          if (compName === 'slot' || compName === 'slot-view') {
            result[compName] = {
              slot: 'i.name'
            }
          } else {
            result[compName] = newComp
          }
        }
      }
  
      return result
    }
  
    buildBaseTemplate () {
      const Adapter = this.Adapter
  
      const data = !this.isSupportRecursive && this.supportXS
        ? `${this.dataKeymap('i:item,l:\'\'')}`
        : this.dataKeymap('i:item')
  
      return `${this.buildXsTemplate()}
  <template name="taro_tmpl">
    <block ${Adapter.for}="{{root.cn}}" ${Adapter.key}="uid">
      <template is="tmpl_0_${Shortcuts.Container}" data="{{${data}}}" />
    </block>
  </template>
  `
    }
  
    buildThirdPartyAttr (attrs) {
      return Array.from(attrs).reduce((str, attr) => {
        if (attr.startsWith('@')) { // vue event
          return str + `bind${attr.slice(1)}="eh" `
        } else if (attr.startsWith('bind')) {
          return str + `${attr}="eh" `
        } else if (attr.startsWith('on')) {
          return str + `bind${attr.slice(2).toLowerCase()}="eh" `
        }
  
        return str + `${attr}="{{i.${toCamelCase(attr)}}}" `
      }, '')
    }
  
    buildComponentTemplate (comp, level) {
      return focusComponents.has(comp.nodeName)
        ? this.buildFocusComponentTemplte(comp, level)
        : this.buildStandardComponentTemplate(comp, level)
    }
  
    buildFocusComponentTemplte (comp, level) {
      const attrs = { ...comp.attributes }
      const templateName = this.supportXS
        ? `xs.c(i, 'tmpl_${level}_')`
        : `i.focus ? 'tmpl_${level}_${comp.nodeName}_focus' : 'tmpl_${level}_${comp.nodeName}_blur'`
      delete attrs.focus
      return `
  <template name="tmpl_${level}_${comp.nodeName}">
    <template is="{{${templateName}}}" data="{{${this.dataKeymap('i:i')}}}" />
  </template>
  
  <template name="tmpl_${level}_${comp.nodeName}_focus">
    <${comp.nodeName} ${this.buildAttribute(comp.attributes, comp.nodeName)} id="{{i.uid}}" />
  </template>
  
  <template name="tmpl_${level}_${comp.nodeName}_blur">
    <${comp.nodeName} ${this.buildAttribute(attrs, comp.nodeName)} id="{{i.uid}}" />
  </template>
  `
    }
  
    buildStandardComponentTemplate (comp, level) {
      const { isSupportRecursive, Adapter } = this
      const nextLevel = isSupportRecursive ? 0 : level + 1
  
      const data = !this.isSupportRecursive
        ? `${this.dataKeymap('i:item,l:l')}`
        : this.dataKeymap('i:item')
  
      let child = this.supportXS
        ? `<template is="{{xs.e(${isSupportRecursive ? 0 : 'cid+1'})}}" data="{{${data}}}" />`
        : `<template is="tmpl_${nextLevel}_${Shortcuts.Container}" data="{{${this.dataKeymap('i:item')}}}" />`
  
      if (isFunction(this.modifyLoopBody)) {
        child = this.modifyLoopBody(child, comp.nodeName)
      }
  
      let children = voidElements.has(comp.nodeName)
        ? ''
        : `
      <block ${Adapter.for}="{{i.${Shortcuts.Childnodes}}}" ${Adapter.key}="uid">
        ${child}
      </block>
    `
  
      if (isFunction(this.modifyLoopContainer)) {
        children = this.modifyLoopContainer(children, comp.nodeName)
      }
  
      const nodeName = comp.nodeName === 'slot' || comp.nodeName === 'slot-view' ? 'view' : comp.nodeName
  
      let res = `
  <template name="tmpl_${level}_${comp.nodeName}">
    <${nodeName} ${this.buildAttribute(comp.attributes, comp.nodeName)} id="{{i.uid}}">${children}</${nodeName}>
  </template>
  `
  
      if (isFunction(this.modifyTemplateResult)) {
        res = this.modifyTemplateResult(res, comp.nodeName, level, children)
      }
  
      return res
    }
  
    buildPlainTextTemplate (level) {
      return `
  <template name="tmpl_${level}_#text" data="{{${this.dataKeymap('i:i')}}}">
    <block>{{i.${Shortcuts.Text}}}</block>
  </template>
  `
    }
  
    buildThirdPartyTemplate (level, componentConfig) {
      const { Adapter, isSupportRecursive } = this
      const nextLevel = isSupportRecursive ? 0 : level + 1
      let template = ''
  
      const data = !this.isSupportRecursive && this.supportXS
        ? `${this.dataKeymap('i:item,l:l')}`
        : this.dataKeymap('i:item')
  
      componentConfig.thirdPartyComponents.forEach((attrs, compName) => {
        template += `
  <template name="tmpl_${level}_${compName}">
    <${compName} ${this.buildThirdPartyAttr(attrs)} id="{{i.uid}}">
      <block ${Adapter.for}="{{i.${Shortcuts.Childnodes}}}" ${Adapter.key}="uid">
        <template is="tmpl_${nextLevel}_${Shortcuts.Container}" data="{{${data}}}" />
      </block>
    </${compName}>
  </template>
    `
      })
  
      return template
    }
  
    buildContainerTemplate (level, restart = false) {
      let tmpl = ''
      if (restart) {
        if (!this.isSupportRecursive && this.supportXS) {
          tmpl = '<comp i="{{i}}" l="{{l}}" />'
        } else {
          tmpl = '<comp i="{{i}}" />'
        }
      } else {
        const xs = !this.isSupportRecursive
          ? `xs.a(${level}, i.${Shortcuts.NodeName}, l)`
          : `xs.a(${level}, i.${Shortcuts.NodeName})`
  
        const data = !this.isSupportRecursive
          ? `${this.dataKeymap(`i:i,cid:${level},l:xs.f(l,i.${Shortcuts.NodeName})`)}`
          : `${this.dataKeymap('i:i')}`
  
        tmpl = this.supportXS
          ? `<template is="{{${xs}}}" data="{{${data}}}" />`
          : `<template is="{{'tmpl_${level}_' + i.${Shortcuts.NodeName}}}" data="{{${this.dataKeymap('i:i')}}}" />`
      }
      return `
  <template name="tmpl_${level}_${Shortcuts.Container}">
    ${tmpl}
  </template>
  `
    }
  
    dataKeymap (keymap) {
      return keymap
    }
  
    getEvents () {
      return events
    }
  
    getAttrValue (value, _key, _nodeName) {
      return `{${value}}`
    }
  
    buildXsTemplate () {
      return ''
    }
  
    buildPageTemplate = (baseTempPath) => {
      const template = `<import src="${baseTempPath}"/>
    <template is="taro_tmpl" data="{{${this.dataKeymap('root:root')}}}" />`
  
      return template
    }
  
    buildBaseComponentTemplate = (ext) => {
      const data = !this.isSupportRecursive && this.supportXS
        ? this.dataKeymap('i:i,l:l')
        : this.dataKeymap('i:i')
  
      return `<import src="./base${ext}" />
    <template is="tmpl_0_${Shortcuts.Container}" data="{{${data}}}" />`
    }
  
    buildXScript = () => {
      return `${this.exportExpr} {
    a: ${this.buildXSTmplName()},
    b: function (a, b) {
      return a === undefined ? b : a
    },
    c: function(i, prefix) {
      var s = i.focus !== undefined ? 'focus' : 'blur'
      return prefix + i.${Shortcuts.NodeName} + '_' + s
    },
    d: function (i, v) {
      return i === undefined ? v : i
    },
    e: function (n) {
      return 'tmpl_' + n + '_${Shortcuts.Container}'
    },
    ${this.buildXSTmpExtra()}
  }`
    }
  
    buildXSTmplName () {
      return `function (l, n) {
      return 'tmpl_' + l + '_' + n
    }`
    }
  
    buildXSTmpExtra () {
      return ''
    }
  }

export class RecursiveTemplate extends BaseTemplate {
    isSupportRecursive = true
  
    buildTemplate = (componentConfig) => {
      let template = this.buildBaseTemplate()
      if (!this.miniComponents) {
        this.miniComponents = this.createMiniComponents(internalComponents)
      }
      const ZERO_FLOOR = 0
      const components = Object.keys(this.miniComponents)
        .filter(c => componentConfig.includes.size && !componentConfig.includeAll ? componentConfig.includes.has(c) : true)
  
      template = components.reduce((current, nodeName) => {
        const attributes = this.miniComponents[nodeName]
        return current + this.buildComponentTemplate({ nodeName, attributes }, ZERO_FLOOR)
      }, template)
  
      template += this.buildPlainTextTemplate(ZERO_FLOOR)
      template += this.buildThirdPartyTemplate(ZERO_FLOOR, componentConfig)
      template += this.buildContainerTemplate(ZERO_FLOOR)
  
      return template
    }
  }

  export class UnRecursiveTemplate extends BaseTemplate {
    isSupportRecursive = false
    _baseLevel = 16
    componentConfig
  
    set baseLevel (lv) {
      this._baseLevel = lv
    }
  
    get baseLevel () {
      return this._baseLevel
    }
  
    buildTemplate = (componentConfig) => {
      this.componentConfig = componentConfig
      if (!this.miniComponents) {
        this.miniComponents = this.createMiniComponents(internalComponents)
      }
      const components = Object.keys(this.miniComponents)
        .filter(c => componentConfig.includes.size && !componentConfig.includeAll ? componentConfig.includes.has(c) : true)
  
      let template = this.buildBaseTemplate()
      for (let i = 0; i < this.baseLevel; i++) {
        template += this.supportXS
          ? this.buildOptimizeFloor(i, components, this.baseLevel === i + 1)
          : this.buildFloor(i, components, this.baseLevel === i + 1)
      }
  
      return template
    }
  
    buildFloor (level, components, restart = false) {
      if (restart) return this.buildContainerTemplate(level, restart)
  
      let template = components.reduce((current, nodeName) => {
        const attributes = this.miniComponents[nodeName]
        return current + this.buildComponentTemplate({ nodeName, attributes }, level)
      }, '')
  
      template += this.buildPlainTextTemplate(level)
      template += this.buildThirdPartyTemplate(level, this.componentConfig)
      template += this.buildContainerTemplate(level, restart)
  
      return template
    }
  
    buildOptimizeFloor (level, components, restart = false) {
      if (restart) return this.buildContainerTemplate(level, restart)
  
      let template = components.reduce((current, nodeName) => {
        if (level !== 0) {
          if (!nestElements.has(nodeName)) {
            // 不可嵌套自身的组件只需输出一层模板
            return current
          } else {
            // 部分可嵌套自身的组件实际上不会嵌套过深，这里按阈值限制层数
            const max = nestElements.get(nodeName)
            if (max > 0 && level >= max) {
              return current
            }
          }
        }
        const attributes = this.miniComponents[nodeName]
        return current + this.buildComponentTemplate({ nodeName, attributes }, level)
      }, '')
  
      if (level === 0) template += this.buildPlainTextTemplate(level)
      template += this.buildThirdPartyTemplate(level, this.componentConfig)
      template += this.buildContainerTemplate(level)
  
      return template
    }
  
    buildXSTmplName () {
      const comps = [
        ...Array.from(nestElements.keys()),
        ...Array.from(this.componentConfig.thirdPartyComponents.keys())
      ]
      const hasMaxComps = []
      nestElements.forEach((max, comp) => {
        if (max > -1) hasMaxComps.push(comp)
      })
      return `function (l, n, s) {
      var a = ${JSON.stringify(comps)}
      var b = ${JSON.stringify(hasMaxComps)}
      if (a.indexOf(n) === -1) {
        l = 0
      }
      if (b.indexOf(n) > -1) {
        var u = s.split(',')
        var depth = 0
        for (var i = 0; i < u.length; i++) {
          if (u[i] === n) depth++
        }
        l = depth
      }
      return 'tmpl_' + l + '_' + n
    }`
    }
  
    buildXSTmpExtra () {
      const hasMaxComps = []
      nestElements.forEach((max, comp) => {
        if (max > -1) hasMaxComps.push(comp)
      })
      return `f: function (l, n) {
      var b = ${JSON.stringify(hasMaxComps)}
      if (b.indexOf(n) > -1) {
        if (l) l += ','
        l += n
      }
      return l
    }`
    }
  }
