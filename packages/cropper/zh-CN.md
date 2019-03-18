## Cropper 图片裁剪器

### 代码示例

#### 基本使用

<script>
export default {
  data () {
    return {
      defaultImgSrc: 'https://fengyuanchen.github.io/cropperjs/images/picture.jpg', // 静态图片
      imgSrc: '', // 上传的图片地址
      cropImg: '', // 裁剪后的图片地址
      imgStyle: { width: '500px', height: '315px'},
      viewMode: 1,
      movable: false,
      rotatable: false,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      autoCropArea: 0.9,
      minCropWidth: 400,
      minCropHeight: 300,
      aspectRatio: (this.minCropWidth || 400) / (this.minCropHeight || 300),
      minDropBoxWidth: this.minCropWidth,
      minDropBoxHeight: this.minCropHeight,
    }
  },
  methods: {
    setImage(e) {
      const file = e.target.files[0]
      if (!file.type.includes('image/')) {
        this.$message.warning('请上传图片')
        return
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.imgSrc = event.target.result

          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result)
          this.initCropImg()
        }
        reader.readAsDataURL(file)
      } else {
        this.$message.error('您的浏览器太旧了，请升级到最新版本的Chrome浏览器再来操作')
      }
    },
    initCropImg () {
      let canvasWidth = this.$refs.cropper.offsetWidth
      this.$refs.cropper.setCanvasData({
        left: 0,
        top: 0,
        width: canvasWidth
      })
      this.$refs.cropper.setCropBoxData({
        left: 0,
        top: 0,
        width: 400,
        height: 300
      })
    },
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    rotate() {
      this.$refs.cropper.rotate(90)
    },
    zoom(ratio) {
      this.$refs.cropper.relativeZoom(ratio)
    },
    enable () {
      this.$refs.cropper.enable()
    },
    disable () {
      this.$refs.cropper.disable()
    },
    reset () {
      this.$refs.cropper.reset()
    },
    destroyCropImg () {
      this.$refs.cropper.destroy()
    }
  }
}
</script>
<div class="demo-block">
  <input type="file" name="image" accept="image/*" style="font-size: 1.2em; padding: 10px 0;"
    @change="setImage" />
  <hr />
  <div class="demo-cropper" style="width: 500px; height:315px; border: 1px solid gray; display: inline-block;">
    <mi-cropper ref="cropper" :src="imgSrc || defaultImgSrc" alt="头像" :guides="true" :view-mode="viewMode" :auto-crop-area="autoCropArea" drag-mode="crop" :min-drop-box-width="minDropBoxWidth" :min-drop-box-height="minDropBoxHeight" :aspectRatio="aspectRatio" :movable="movable" :img-style="imgStyle"></mi-cropper>
  </div>
  <img :src="cropImg" ref="cropImg" id="cropImg" style="width: 200px; height: 150px; border: 1px solid gray;" alt="" />
  <div v-if="imgSrc">
    <el-button @click="cropImage">裁剪图片</el-button>
    <el-button @click="rotate">旋转图片90°</el-button>
    <el-button @click="() => zoom(0.1)">放大0.1</el-button>
    <el-button @click="() => zoom(-0.1)">缩小0.1</el-button>
    <el-button @click="disable">锁定</el-button>
    <el-button @click="enable">解锁</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button @click="destroyCropImg">销毁</el-button>
  </div>

</div>
