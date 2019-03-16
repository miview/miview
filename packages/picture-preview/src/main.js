// https://github.com/NSFI/ppfish-components/blob/master/source/components/PicturePreview/index.js
import { fullscreen, exitfullscreen, getStyle } from '../../utils/assist'
import KeyCode from '../../utils/key-code'

let conMaxWidth = 1024
let conMaxHeight = 768
const CON_MAX_WIDTH = Math.min(window.innerWidth, conMaxWidth) // 容器最大宽度
const CON_MIN_WIDTH = 360 // 容器最小宽度
const CON_MAX_HEIGHT = Math.min(window.innerHeight, conMaxHeight) // 容器最大高度
const CON_MIN_HEIGHT = 360 // 容器最小高度
const MAX_RATIO = 2 // 最大的图片显示比例
const MIN_RATIO = 0.1 // 最小的图片显示比例
const STEP_RATIO = 0.1 // 图片缩放比例步长
const DEFAULT_RATIO = 0.8 // 默认的图片显示比例

function num2px (num) {
  return parseInt(num, 10) + 'px'
}
function px2num (str) {
  return Number(str.replace('px', '')) || 0
}

/**
 * el1元素的区域是否超过el2元素
 * @param  {[type]}  el1 [description]
 * @param  {[type]}  el2 [description]
 * @return {Boolean}     [description]
 */
function isLargger (el1, el2) {
  return el1.clientHeight > el2.clientHeight || el1.clientWidth > el2.clientWidth
}

const setStyle = (el, css) => {
  for (let key in css) {
    el.style[key] = css[key]
  }
}

/**
 * 获取图片实际大小
 * @param {Element} image
 * @param {Function} callback
 * @scope
 */
export const getImageSize = function (image, callback, scope) {
  let newImage
  if (!image.src) {
    callback.call(scope, 0, 0)
  } else if (image.naturalWidth) {
    // 现代浏览器
    callback.call(scope, image.naturalWidth, image.naturalHeight)
  } else {
    // 低版本浏览器
    newImage = document.createElement('img')
    newImage.onload = function () {
      callback.call(scope, this.width, this.height)
    }
    newImage = image.src
  }
}

export default {
  name: 'MiPicturePreview',
  props: {
    prefixCls: {
      type: String,
      default: 'mi-picturepreview'
    },
    className: String,
    toolbar: {
      type: Boolean,
      default: false
    },
    // [{name: '', src: ''}]
    source: {
      type: Array,
      default: () => []
    },
    draggable: {
      type: Boolean,
      default: false
    },
    esc: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    progress: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    onClose: {
      type: Function,
      default: () => {
        return () => {}
      }
    }
  },
  data () {
    return {
      imgEl: null,
      downloadImgUrl: null,
      moving: '', // 'img'表示正在移动图片 'con'表示正在移动容器 ''表示没有移动
      show: this.visible || false,
      imgs: this.source || [],
      container: {
        style: null,
        isFull: false // 是否全屏
      },
      image: {
        el: null,
        naturalWidth: 0,
        naturalHeight: 0,
        ratio: 0 // 图片的缩放比例
      },
      shown: false, // 标记是否显示过, 第一次显示时居中显示
      current: 0,
      bodyDefaultOverflow: document.body.style.overflow
    }
  },
  watch: {
    visible: {
      handler (visible) {
        if (visible !== this.show) {
          this.show = visible
        }
        if (this.mask) {
          document.body.style.overflow = visible ? 'hidden' : this.bodyDefaultOverflow
        }
        if (!visible) return

        if (this.activeIndex !== this.current) {
          this.current = this.activeIndex
        }

        if (this.source && this.source.length) {
          let sourceStr = JSON.stringify(this.source)

          if (sourceStr !== JSON.stringify(this.imgs)) {
            this.imgs = JSON.parse(sourceStr)
          }
        }
        this.$nextTick(() => {
          this.setContainerStyle()
        })
      }
    }
  },
  mounted () {
    const { draggable, toolbar, mask } = this
    document.body.appendChild(mask ? this.$refs.root : this.$ref.container)
    this.setContainerStyle()

    if (toolbar && this.$refs.container) {
      // 监听全屏事件
      this.$refs.container.addEventListener('fullscreenchange', this.handleFullChange)
      this.$refs.container.addEventListener('mozfullscreenchange', this.handleFullChange)
      this.$refs.container.addEventListener('webkitfullscreenchange', this.handleFullChange)
    }
    if (draggable) {
      // 监听拖动事件
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)
    }
    document.addEventListener('keydown', this.handleKeyDown)
  },
  beforeUpdate () {
    // console.log('beforeUpdate')
  },
  updated () {
    // console.log('updated')
  },
  beforeDestory () {
    const { draggable, mask } = this
    let el = mask ? this.$refs.root : this.$refs.container

    if (el && el.$parent.$el === document.body) {
      document.body.removeChild(el)
    }

    if (draggable) {
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
    }

    document.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    handleZoom (ratio) {
      console.log('handleZoom: ', ratio, this.image)
      let image = {}

      // 已经是1:1的情况下，不处理
      if (ratio === 1 && this.isOne2One()) return

      // 缩放比例限定范围在0.1和5之间
      ratio = Math.min(ratio, MAX_RATIO)
      ratio = Math.max(ratio, MIN_RATIO)

      image.ratio = ratio

      let width = this.image.naturalWidth * ratio

      let height = this.image.naturalHeight * ratio

      image.marginL = (this.$refs.container.clientWidth - width) / 2
      image.marginT = (this.$refs.container.clientHeight - height) / 2

      this.image = {
        ...this.image,
        ...image
      }

      console.log('handleZoom 222', image.marginL, image.marginT, width, height)
      this.$nextTick(() => {
        setStyle(this.$refs.imgEl, {
          'margin-left': num2px(image.marginL),
          'margin-top': num2px(image.marginT),
          width: num2px(width),
          height: num2px(height)
        })
      })
    },
    handleSwitchFull () {
      if (!this.isFullEnabled()) return
      console.log('handleSwitchFull: ', this.container.isFull)
      this.container.isFull ? exitfullscreen() : fullscreen(this.$refs.container)
    },
    handleRotate () {
      console.log('handleRotate...')
      // if (this.$refs.imgEl) return

      let old = this.$refs.imgEl.rotateValue || 0
      let rotate = old + 90
      let transform = `rotate(${rotate}deg)`

      this.$refs.imgEl.rotateValue = rotate
      setStyle(this.$refs.imgEl, {
        '-webkit-ransform': transform,
        '-ms-transform': transform,
        transform: transform
      })
    },
    handleFullChange () {
      const con = this.container

      if (con.isFull) {
        // 从全屏退出到非全屏时，认为是没有显示过，让图片居中显示
        this.shown = false

        this.setContainerStyle()
        this.$nextTick(() => {
          this.shown = true
        })
      } else {
        con.style = {
          left: 0,
          top: 0,
          width: '100%',
          height: '100%'
        }
        // 等视图更新后，再缩放，要用到con的尺寸
        this.container = con

        // this.shown = false
        // this.setContainerStyle()

        this.$nextTick(() => {
          console.log('handleFullChange - img: ', this.image, this.image.ratio)
          this.handleZoom(this.image.ratio)
        })
      }

      this.container = {
        style: con.style,
        isFull: !con.isFull
      }
    },
    handleKeyDown (e) {
      if (!this.show) return
      e.preventDefault()
      const { esc } = this
      if (esc && !this.container.isFull && e.keyCode === KeyCode.ESC) {
        this.handleClose(e)
      }
      // else if (e.keyCode === KeyCode.LEFT) {
      //   this.handlePrev(e)
      // } else if (e.keyCode === KeyCode.RIGHT) {
      //   this.handleNext(e)
      // }
    },
    handleDragStart (e) {
      e.preventDefault()
    },
    handleMouseDown (e) {
      /* eslint-disable */
      return
      console.log('handleMouseDown...')
      if (!this.show) return
      e.preventDefault()

      let con = {}
      let image = {}
      let tar = e.target
      if (tar === this.$refs.imgEl && (this.container.isFull || isLargger(this.$refs.imgEl, this.$refs.container))) {
        // 点击在图片上，并且是全屏模式或者图片比容器大，此时移动图片
        image.startX = e.pageX
        image.startY = e.pageY
        image.marginL = px2num(getStyle(this.$refs.imgEl, 'margin-left'))
        image.marginT = px2num(getStyle(this.$refs.imgEl, 'margin-top'))

        this.moving = 'img'
        this.image = image
      } else if (!this.container.isFull) {
        // 非全屏模式上，移动容器
        let elPos = this.$refs.container.getBoundingClientRect()

        if (this.mask) {
          con.rect = {
            left: elPos.left,
            top: elPos.top
          }
        } else {
          con.rect = {
            left: elPos.left + window.pageXOffset,
            top: elPos.top + window.pageYOffset
          }
        }

        con.startX = e.pageX
        con.startY = e.pageY

        this.moving = 'con'
        this.container = con
      }
      /* eslint-enable */
    },
    handleMouseMove (e) {
      console.log('handleMouseMove...')
      if (!this.moving || !this.show) return
      e.preventDefault()

      let con = this.container
      let image = this.image
      let conStyle = { ...con.style }

      if (this.moving === 'img') {
        setStyle(this.$refs.imgEl, {
          'margin-left': num2px(e.pageX - image.startX + image.marginL),
          'margin-top': num2px(e.pageY - image.startY + image.marginT)
        })
      } else if (this.moving === 'con') {
        conStyle.left = num2px(e.pageX - con.startX + con.rect.left)
        conStyle.top = num2px(e.pageY - con.startY + con.rect.top)

        this.container = { ...this.container, ...{ style: conStyle } }
      }
    },
    handleMouseUp (e) {
      if (!this.show) return
      e.preventDefault()
      this.moving = ''
    },
    isFullEnabled () {
      return (
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled
      )
    },
    isOne2One () {
      return Math.round(this.state.image.ratio * 100) === 100
    },
    handleClose (e) {
      console.log('handleClose...')
      this.container.isFull && exitfullscreen()
      this.show = false
      this.shown = false
      if (this.mask) {
        document.body.style.overflow = this.bodyDefaultOverflow
      }
      if (this.onClose && typeof this.onClose === 'function') {
        this.onClose()
      }
    },
    handlePrev (e) {
      console.log('handlePrev...')
      e.preventDefault()
      this.current = this.current <= 0 ? this.imgs.length - 1 : this.current - 1
      this.shown = true
      // this.$nextTick(() => {
      this.setContainerStyle()
      // })
    },
    handleNext (e) {
      console.log('handleNext...')
      e.preventDefault()
      this.current = this.current >= this.imgs.length - 1 ? 0 : this.current + 1
      this.shown = true
      // this.$nextTick(() => {
      this.setContainerStyle()
      // })
    },
    /**
     * 设置容器的样式，用于切换图片时，根据图片大小，确定容器的尺寸以及位置
     */
    setContainerStyle () {
      console.log('setContainerStyle...')
      getImageSize(this.$refs.imgEl, (naturalWidth, naturalHeight) => {
        console.log('getImageSize: ', naturalWidth, naturalHeight)
        let width, height, imgRatio

        if (naturalWidth === 0 || naturalHeight === 0) {
          width = CON_MIN_WIDTH
          height = CON_MIN_HEIGHT
          imgRatio = 0
        } else {
          // 计算容器的宽度
          width = naturalWidth * DEFAULT_RATIO // 默认0.8倍显示图片
          if (width > CON_MAX_WIDTH) {
            width = CON_MAX_WIDTH
          } else if (width < CON_MIN_WIDTH) {
            width = CON_MIN_WIDTH
          }

          // 计算图片的缩放比例
          imgRatio = (naturalWidth && width / naturalWidth) || 0
          // 计算容器的高度
          height = naturalHeight * imgRatio
          if (height > CON_MAX_HEIGHT) {
            height = CON_MAX_HEIGHT
          } else if (height < CON_MIN_HEIGHT) {
            height = CON_MIN_HEIGHT
          }
        }

        let css = ''
        if (!this.shown) {
          css = {
            width: num2px(width),
            height: num2px(height),
            left: num2px((window.innerWidth - width) / 2),
            top: num2px((window.innerHeight - height) / 2)
          }

          if (!this.mask) {
            css.left = num2px((window.innerWidth - width) / 2 + window.pageXOffset)
            css.top = num2px((window.innerHeight - height) / 2 + window.pageYOffset)
          }

          this.container = { style: css, isFull: this.container.isFull }
        } else if (!this.container.isFull) {
          let oriTop = px2num(getStyle(this.$refs.container, 'top'))
          let oriLeft = px2num(getStyle(this.$refs.container, 'left'))
          let oriWidth = px2num(getStyle(this.$refs.container, 'width'))
          let oriHeight = px2num(getStyle(this.$refs.container, 'height'))

          css = {
            width: num2px(width),
            height: num2px(height),
            left: num2px(oriLeft + (oriWidth - width) / 2),
            top: num2px(oriTop + (oriHeight - height) / 2)
          }

          this.container = { style: css, isFull: this.container.isFull }
        }

        this.image = {
          ...this.image,
          naturalWidth,
          naturalHeight,
          ratio: imgRatio
        }

        console.log('getImageSize img: ', this.image)

        this.$nextTick(() => {
          // 待视图更新后再缩放，需要用到con的尺寸
          this.handleZoom(imgRatio)
        })
      })
    }
  },
  render () {
    const { show, current, imgs, image, container } = this
    const { className, style, prefixCls, source, toolbar, draggable, mask, progress } = this

    let isFullscreen = container.isFull
    let ctnerClass = {
      [prefixCls]: Boolean(prefixCls),
      [className]: Boolean(className),
      draggable: draggable,
      [`${prefixCls}-hide`]: !show
    }

    let closeBtnClass = {
      close: !isFullscreen,
      'el-icon-close': true,
      'close-fullscreen': isFullscreen
    }
    let isHide = !(source.length > 1 || !!this.$slots.default)
    let leftBtnClass = {
      prev: true,
      'el-icon-arrow-left': true,
      [`${prefixCls}-hide`]: isHide
    }
    let rightBtnClass = {
      next: true,
      'el-icon-arrow-right': true,
      [`${prefixCls}-hide`]: isHide
    }
    let toolbarClass = {
      toolbar: true,
      [`${prefixCls}-hide`]: !toolbar
    }
    /* eslint-disable */
    let one2oneClass = {
      icon: true,
      'icon-disabled': image.ratio === 1
    }
    /* eslint-enable */

    let zoomInClass = {
      icon: true,
      'el-icon-zoom-in': true,
      'icon-disabled': image.ratio >= MAX_RATIO
    }
    let zoomOutClass = {
      icon: true,
      'el-icon-zoom-out': true,
      'icon-disabled': image.ratio <= MIN_RATIO
    }
    let screenStatus = isFullscreen ? 'el-icon-remove-outline' : 'el-icon-circle-plus-outline'
    let rootClass = {
      [`${prefixCls}-root`]: mask,
      [`${prefixCls}-hide`]: !show
    }
    let maskClass = {
      [`${prefixCls}-mask`]: true,
      [`${prefixCls}-hide`]: !mask
    }
    let progressClass = {
      toolbarTitle: true,
      [`${prefixCls}-hide`]: !progress
    }

    const renderCtner = (
      <div
        data-show={show}
        class={ctnerClass}
        style={{ ...container.style, ...style }}
        ref="container"
        onDragStart={this.handleDragStart}
        onDragstart={this.handleDragStart}
        onMousedown={draggable ? this.handleMouseDown : null}
      >
        <div class="canvas">
          {imgs.map((item, index) => {
            if (current === index) {
              return (
                <img
                  key={'pic_' + index}
                  class="img"
                  src={item.src || null}
                  alt={item.name || null}
                  active="true"
                  ref="imgEl"
                />
              )
            } else {
              return <img key={'pic_' + index} class="img" src={item.src || null} alt={item.name || null} />
            }
          })}
        </div>
        <i class={closeBtnClass} onMousedown={this.handleClose} />
        <i class={leftBtnClass} onClick={this.handlePrev} />
        <i class={rightBtnClass} onClick={this.handleNext} />

        <div class={toolbarClass} style={isFullscreen ? { bottom: '20px' } : null}>
          <div class={progressClass}>
            {current + 1}/{imgs.length}
          </div>
          <div class="toolbarCon">
            <i class={`icon ${screenStatus}`} onClick={this.handleSwitchFull} />
            <i class={zoomInClass} onClick={() => this.handleZoom(image.ratio + STEP_RATIO)} />
            <i class={zoomOutClass} onClick={() => this.handleZoom(image.ratio - STEP_RATIO)} />
            <i class="icon el-icon-refresh" onClick={this.handleRotate} />
            <i class="icon el-icon-download" />
          </div>
        </div>
      </div>
    )

    const renderMaskCtner = (
      <div key={`${prefixCls}-root`} data-show={show} class={rootClass} ref="root">
        <div class={maskClass} />
        {renderCtner}
      </div>
    )

    return <transition name="zoom">{mask ? renderMaskCtner : renderCtner}</transition>
  }
}
