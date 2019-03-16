<script>
import ResizeObserver from 'resize-observer-polyfill'
const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}

const EllipsisText = {
  name: 'EllipsisText',
  props: {
    text: String,
    length: Number,
    tooltip: Boolean,
    fullWidthRecognition: Boolean,
    tooltipProps: Object
  },
  render () {
    if (typeof this.text !== 'string') {
      throw new Error('Ellipsis children must be string.')
    }
    const textLength = this.fullWidthRecognition ? getStrFullLength(this.text) : this.text.length
    if (textLength <= this.length || this.length < 0) {
      return <span>{this.text}</span>
    }
    const tail = '...'
    let displayText
    if (this.length - tail.length <= 0) {
      displayText = ''
    } else {
      displayText = this.fullWidthRecognition ? cutStrByFullLength(this.text, this.length) : this.text.slice(0, this.length)
    }

    if (this.tooltip) {
      return (
        <el-tooltip {...{ props: this.tooltipProps }}>
          <div slot="content">
            {this.text}
          </div>
          <span>
            {displayText}
            {tail}
          </span>
        </el-tooltip>
      )
    }

    return (
      <span {...{ attrs: this.$attrs, listeners: this.$listeners }}>
        {displayText}
        {tail}
      </span>
    )
  }
}

export default {
  name: 'MiEllipsis',
  props: {
    prefix: {
      type: String,
      default: 'mi-ellipsis'
    },
    lines: Number,
    width: [Number, String],
    length: Number,
    tooltip: {
      type: Boolean,
      default: true
    },
    tooltipProps: {
      type: Object,
      default: () => ({})
    },
    fullWidthRecognition: {
      type: Boolean,
      default: false
    },
    className: String,
    content: String
  },
  data () {
    return {
      text: '',
      targetCount: 0,
      isEllipsisActive: false,
      resizeObserver: null
    }
  },
  mounted () {
    if (this.$refs.node) {
      this.computeLine()
    }
    // detect ellipsis active in width/lines mode
    if (this.width || this.lines) {
      let target
      if (this.width) {
        target = this.$refs.widthNode
      } else if (this.lines && isSupportLineClamp) {
        target = this.$refs.lineClampNode
      } else {
        return
      }
      if (!target) return
      // console.log('8888', target)

      this.detectEllipsisActive(target)
      this.resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          if (entry.target === target) {
            this.detectEllipsisActive(target);
          }
        });
      });
      this.resizeObserver.observe(target);
    }
  },
  updated () {
    this.$nextTick(() => {
      this.computeLine()
    })
  },
  beforeDestroy () {
    this.resizeObserver && this.resizeObserver.disconnect();
  },
  methods: {
    detectEllipsisActive (node) {
      // console.log('detectEllipsisActive:', node.offsetHeight < node.scrollHeight || node.offsetWidth < node.scrollWidth, node.offsetHeight, node.scrollHeight, node.offsetWidth, node.scrollWidth)
      this.isEllipsisActive = node.offsetHeight < node.scrollHeight || node.offsetWidth < node.scrollWidth
    },
    computeLine () {
      const { lines } = this
      if (lines && !isSupportLineClamp) {
        const text = this.$refs.shadowChildren.innerText || this.$refs.shadowChildren.textContent
        // console.log('text: ', this.$refs.shadowChildren.innerText)
        const lineHeight = parseInt(getComputedStyle(this.$refs.root).lineHeight, 10)
        const targetHeight = lines * lineHeight
        this.$refs.content.style.height = `${targetHeight}px`
        const totalHeight = this.$refs.shadowChildren.offsetHeight
        const shadowNode = this.$refs.shadow.firstChild

        // console.log('totalHeight: ', totalHeight)
        // console.log('targetHeight: ', targetHeight)
        if (totalHeight <= targetHeight) {
          this.text = text
          this.targetCount = text.length
          return
        }

        // bisection
        const len = text.length
        const mid = Math.ceil(len / 2)

        const count = this.bisection(targetHeight, mid, 0, len, text, shadowNode)
        this.text = text
        this.targetCount = count

        // console.log('count: ', count)
      }
    },
    bisection (th, m, b, e, text, shadowNode) {
      const suffix = '...';
      let mid = m;
      let end = e;
      let begin = b;
      shadowNode.innerHTML = text.substring(0, mid) + suffix;
      let sh = shadowNode.offsetHeight;

      if (sh <= th) {
        shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
        sh = shadowNode.offsetHeight;
        if (sh > th || mid === begin) {
          return mid;
        }
        begin = mid;
        if (end - begin === 1) {
          mid = 1 + begin;
        } else {
          mid = Math.floor((end - begin) / 2) + begin;
        }
        return this.bisection(th, mid, begin, end, text, shadowNode);
      }
      if (mid - 1 < 0) {
        return mid;
      }
      shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
      sh = shadowNode.offsetHeight;
      if (sh <= th) {
        return mid - 1;
      }
      end = mid;
      mid = Math.floor((end - begin) / 2) + begin;
      return this.bisection(th, mid, begin, end, text, shadowNode);
    }
  },
  render () {
    const cls = {
      [`${this.prefix}-ellipsis`]: true,
      [this.className]: Boolean(this.className),
      [`${this.prefix}-width-mode`]: this.width,
      [`${this.prefix}-lines`]: this.lines && !isSupportLineClamp,
      [`${this.prefix}-lineClamp`]: this.lines && isSupportLineClamp
    }

    // 一种限制都没有返回原值
    if (!this.lines && !this.length && !this.width) {
      return <span class={cls} {...{ attrs: this.$attrs }}>{this.content}</span>
    }

    // 宽度限制
    if (this.width) {
      const node = (
        <span ref="widthNode" class={cls} {...{ attrs: this.$attrs }} style={{ maxWidth: this.width }}>
          {this.content}
        </span>
      )

      return this.tooltip ? <el-tooltip disabled={!this.isEllipsisActive} {...{ props: this.tooltipProps }}>
        <div slot="content">{this.content}</div>
        {node}
      </el-tooltip> : node
    }
    // console.log('children: ', this.$children)
    // console.log('slot: ', this.$slot.default)

    // 字数限制
    if (this.length) {
      return <EllipsisText class={cls} tooltipProps={this.tooltipProps} length={this.length} text={this.content || ''} tooltip={this.tooltip} fullWidthRecognition={this.fullWidthRecognition}></EllipsisText>
    }

    // 行数限制
    const id = `${this.prefix}-${new Date().getTime()}-${Math.floor(Math.random() * 100)}`
    // support document.body.style.webkitLineClamp
    if (isSupportLineClamp) {
      const style = `#${id}{-webkit-line-clamp:${this.lines};-webkit-box-orient: vertical;}`;

      const node = (
        <div ref="lineClampNode" id={id} class={cls}>
          <style>{style}</style>
          {this.content}
        </div>
      )
      return this.tooltip ? (
        <el-tooltip {...{ props: this.tooltipProps }} disabled={!this.isEllipsisActive}>
          <div slot="content">{this.content}</div>
          {node}
        </el-tooltip>
      ) : node
    }

    // IE/Firefox，不支持 LineClamp，不进入监听页面变化，不控制tooltip是否生效
    const childNode = (
      <span ref="node">
        {this.targetCount > 0 && this.text.substring(0, this.targetCount)}
        {this.targetCount > 0 && this.targetCount < this.text.length && '...'}
      </span>
    )

    return (
      <div {...{ attrs: this.$attrs }} ref="root" class={cls}>
        <div ref="content">
          {this.tooltip ? <el-tooltip {...{ props: this.tooltipProps }}>
            <div slot="content">{this.text}</div>
            {childNode}
          </el-tooltip> : childNode}

          <div class={`shadow`} ref="shadowChildren">
            {this.content}
          </div>
          <div class={`shadow`} ref="shadow">
            <span>{this.text}</span>
          </div>
        </div>
      </div>
    )
  }
}

</script>
