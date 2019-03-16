## PicturePreview 图片查看器

> draggable 暂时存在bug,暂不开放该属性

### 代码示例

#### 基本使用

<style>
.demo-picpreview {
    display: flex;
    .tips-display: flex;
    .tips-align-items: center;
    .tips-width: 100px;
    .tips-color: #999;
    .tips-border-right: #ebedf0 1px solid;
}
.demo-picpreview .tips {
    display: flex;
    align-items: center;
    width: 100px;
    color: #999;
    border-right: #ebedf0 1px solid;
}
.demo-picpreview .pics {
    display: flex;
    justify-content: center;
    flex: 1;
    flex-wrap: wrap;
}

.demo-picpreview .item {
    margin-left: 20px;
    cursor: pointer;
}

.demo-picpreview .item:first-child {
    margin-left: 0;
}

.demo-picpreview img {
    max-width: 100%;
    vertical-align: middle;
    border-style: none;
}

.demo-picpreview .name {
    text-align: center;
}
</style>

<script>
export default {
  data () {
    return {
      visible: false,
      visible2: false,
      activeIndex: 0,
      source: [
        {name: 'pic1', src: '//ysf.nosdn.127.net/xcdbmadptmoftklqvwwxzwlvlorxnzin'},
        {name: 'pic2', src: '//ysf.nosdn.127.net/ausunifcvhchdzbexjvxcswemqeojqdf'},
        {name: 'pic3', src: '//ysf.nosdn.127.net/ijonlnhjaleturyoittndfkpuhbchdkd'},
        {name: 'pic4', src: '//ysf.nosdn.127.net/bqwiuevkyaimbmqcjvealfhejvxzbbth'},
        {name: 'pic5', src: '//ysf.nosdn.127.net/rygnbxiwcgoudyqnzzpypmtxlwpixigf'}
      ]
    }
  },
  methods: {
    handleOpen (index) {
      this.visible = true
      this.activeIndex = index
    },

    handleOpen2 (index) {
      this.visible2 = true
      this.activeIndex = index
    },

    handleClose () {
      this.visible = false
      console.log('关闭');
    },

    handleClose2 () {
      this.visible2 = false
    }
  }
}
</script>
<div class="demo-block">
  <div class="demo-picpreview">
    <div class="tips">点击图片预览</div>
    <div class="pics">
      <div v-for="(item, index) in source" :key="'demo_pic' + index" class="item" @click="() => handleOpen(index)">
        <img :src="item.src" :alt="item.name" width="60px" height="60px" />
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </div>
  <mi-picture-preview :activeIndex="activeIndex" :source="source" :visible="visible" :onClose="handleClose"></mi-picture-preview>
</div>

:::demo

```html
<script>
export default {
  data () {
    return {
      visible: false,
      activeIndex: 0,
      source: [
        {name: 'pic1', src: '//ysf.nosdn.127.net/xcdbmadptmoftklqvwwxzwlvlorxnzin'},
        {name: 'pic2', src: '//ysf.nosdn.127.net/ausunifcvhchdzbexjvxcswemqeojqdf'},
        {name: 'pic3', src: '//ysf.nosdn.127.net/ijonlnhjaleturyoittndfkpuhbchdkd'},
        {name: 'pic4', src: '//ysf.nosdn.127.net/bqwiuevkyaimbmqcjvealfhejvxzbbth'},
        {name: 'pic5', src: '//ysf.nosdn.127.net/rygnbxiwcgoudyqnzzpypmtxlwpixigf'}
      ]
    }
  },
  methods: {
    handleOpen (index) {
      this.visible = true
      this.activeIndex = index
    },

    handleClose () {
      this.visible = false
      console.log('关闭');
    }
  }
}
</script>
<div class="demo-block">
  <div class="demo-picpreview">
    <div class="tips">点击图片预览</div>
    <div class="pics">
      <div v-for="(item, index) in source" :key="'demo_pic' + index" class="item" @click="() => handleOpen(index)">
        <img :src="item.src" :alt="item.name" width="60px" height="60px" />
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </div>
  <mi-picture-preview :activeIndex="activeIndex" :source="source" :visible="visible" :onClose="handleClose"></mi-picture-preview>
</div>
```

:::

#### 展示工具栏

<div class="demo-block">
  <div class="demo-picpreview">
    <div class="tips">点击图片预览</div>
    <div class="pics">
      <div v-for="(item, index) in source" :key="'demo_pic' + index" class="item" @click="() => handleOpen2(index)">
        <img :src="item.src" :alt="item.name" width="60px" height="60px" />
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </div>
  <mi-picture-preview :activeIndex="activeIndex" :source="source" :toolbar="true" :visible="visible2" :onClose="handleClose2" :progress="true"></mi-picture-preview>
</div>


:::demo

```html
<script>
export default {
  data () {
    return {
      visible: false,
      visible2: false,
      activeIndex: 0,
      source: [
        {name: 'pic1', src: '//ysf.nosdn.127.net/xcdbmadptmoftklqvwwxzwlvlorxnzin'},
        {name: 'pic2', src: '//ysf.nosdn.127.net/ausunifcvhchdzbexjvxcswemqeojqdf'},
        {name: 'pic3', src: '//ysf.nosdn.127.net/ijonlnhjaleturyoittndfkpuhbchdkd'},
        {name: 'pic4', src: '//ysf.nosdn.127.net/bqwiuevkyaimbmqcjvealfhejvxzbbth'},
        {name: 'pic5', src: '//ysf.nosdn.127.net/rygnbxiwcgoudyqnzzpypmtxlwpixigf'}
      ]
    }
  },
  methods: {
    handleOpen2 (index) {
      this.visible2 = true
      this.activeIndex = index
    },

    handleClose2 () {
      this.visible2 = false
    }
  }
}
</script>
<div class="demo-block">
  <div class="demo-picpreview">
    <div class="tips">点击图片预览</div>
    <div class="pics">
      <div v-for="(item, index) in source" :key="'demo_pic' + index" class="item" @click="() => handleOpen2(index)">
        <img :src="item.src" :alt="item.name" width="60px" height="60px" />
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </div>
  <mi-picture-preview :activeIndex="activeIndex" :source="source" :visible="visible2" :onClose="handleClose2"></mi-picture-preview>
</div>
```
:::

### 参数

### API

参数 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | --- | --- |
activeIndex | 当前展示第几张图片 | Number | - | 0
className | 图片容器类名 | String | - | -
draggable | 是否可拖动(暂不支持) | Boolean | - | false
esc | 是否开启按 ESC 键关闭图片查看器 | Boolean | - | true
mask | 是否展示遮罩层 | Boolean | - | true
onClose | 关闭后的回调函数 | Function | - | () => void
progress | 是否展示图片总数和当前进度 | Boolean | - | false
source | 设置图片的源数据，格式为 [{src: ""[, name: ""]}] | Array | - | []
style | 图片容器样式 | Object | - | false
toolbar | 是否展示工具栏 | Boolean | - | false
visible | 是否展示图片查看器 | Boolean | - | false

