import PicturePreview from './src/main'

PicturePreview.install = function (Vue) {
  Vue.component(PicturePreview.name, PicturePreview)
}

export default PicturePreview
