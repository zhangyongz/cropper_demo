<template>
  <div class="cropper" v-show="show">
    <div class="header">
      <div class="back_content" @click="back">
        <img src="./img/back.png" class="header_back" />
      </div>
      <span class="header_btn" @click="sure">使用</span>
    </div>

    <div class="wrapper" style="height: calc(100vh - 45px)">
      <vue-cropper ref="cropper" :img="img" :output-size="option.outputSize" :output-type="option.outputType" :info="false" :full="option.full" :can-move="canMove" :can-move-box="canMoveBox" :fixed-box="fixedBox" :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="autoCropWidth" :auto-crop-height="autoCropHeight" :center-box="option.centerBox" :high="option.high" :fixedNumber="fixedNumber" :fixed="fixed" :enlarge="1"></vue-cropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  name: 'cropper',
  data () {
    return {
      option: {
        outputSize: 1,
        full: false,
        outputType: 'png',
        original: false,
        autoCrop: true,
        centerBox: false,
        high: true
      }
    }
  },
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: { // 是否显示
      type: Boolean,
      default: false
    },
    img: String, // 裁剪图片的地址 url 地址 || base64 || blob
    autoCropWidth: { // 默认生成截图框宽度 0~max
      type: Number,
      default: 200
    },
    autoCropHeight: { // 默认生成截图框高度 0~max
      type: Number,
      default: 100
    },
    fixed: { // 是否开启截图框宽高固定比例 true | false
      type: Boolean,
      default: false
    },
    fixedNumber: Array, // 截图框的宽高比例 [宽度, 高度]
    fixedBox: { // 固定截图框大小 不允许改变 true | false
      type: Boolean,
      default: false
    },
    canMove: { // 上传图片是否可以移动 true | false
      type: Boolean,
      default: true
    },
    canMoveBox: { // 截图框能否拖动 true | false
      type: Boolean,
      default: false
    }
  },
  watch: {
    show () {
      if (this.show) {
        this.$refs.cropper.refresh()
      }
    }
  },
  components: {
    VueCropper
  },
  methods: {
    sure () {
      this.$emit('change', false)
      this.$refs.cropper.getCropData((data) => {
        this.$emit('backImg', data)
      })
    },
    back () {
      this.$emit('change', false)
    }
  }
}
</script>

<style>
.cropper {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

.cropper .header {
  height: 45px;
  padding: 0 10px;
  background-color: #ececec;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cropper .back_content {
  width: 45px;
  height: 100%;
  display: flex;
  align-items: center;
}

.cropper .header_back {
  width: 20px;
}

.cropper .header_btn {
  width: 50px;
  height: 30px;
  font-size: 16px;
  color: #ffffff;
  background-color: #06c05f;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: normal;
  border-radius: 5px;
}

.cropper .wrapper {
  width: 100%;
}
</style>
