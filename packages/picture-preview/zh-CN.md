## PicturePreview 图片查看器

### 代码示例

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
  <mi-picture-preview :activeIndex="activeIndex" :source="source" :toolbar="true" :visible="visible" :onClose="handleClose" :draggable="true"></mi-picture-preview>
</div>