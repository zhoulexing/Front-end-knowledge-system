import NormalModule from 'webpack/lib/NormalModule'

export default class TaroNormalModule extends NormalModule {
  name
  miniType
  constructor (data) {
    super(data)
    this.name = data.name
    this.miniType = data.miniType
  }
}
