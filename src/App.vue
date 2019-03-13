<template>
  <div id="app">
    <div class="item">
      <p class="text">商户营业执照</p>
      <div class="upload" @click="switchCropper('license')" v-show="license === ''">
        +
        <div class="process_bar" :style="'width:' + process + '%'" v-show="loadingShow === 'license'"></div>
      </div>
      <div class="img_show" @click="switchCropper('license')" v-show="license !== ''">
        <img :src="license">
      </div>
    </div>
    <div class="item">
      <p class="text">道路运输经营许可证</p>
      <div class="upload" @click="switchCropper('license2')" v-show="license2 === ''">
        +
        <div class="process_bar" :style="'width:' + process + '%'" v-show="loadingShow === 'license2'"></div>
      </div>
      <div class="img_show" @click="switchCropper('license2')" v-show="license2 !== ''">
        <img :src="license2">
      </div>
    </div>
    <!-- <loading v-model="loadingShow" text="上传中"></loading> -->
    <cropper v-model="cropperShow" :img="unloadImg" @backImg="backImg"></cropper>
  </div>
</template>

<script>
// import cropper from '@/components/cropper'
// import Loading from '@/components/loading'
import axios from 'axios'
import Cropper from '@/components/cropper/cropper'
import { uploadImgAction } from '@/components/cropper/utils'
export default {
  name: 'App',
  data () {
    return {
      loadingShow: '',
      license: '',
      license2: '',
      process: 0,
      cropperShow: false,
      unloadImg: '',
      type: ''
    }
  },
  components: {
    // Loading
    Cropper
  },
  methods: {
    switchCropper (type) {
      uploadImgAction().then((img) => {
        this.cropperShow = true
        this.type = type
        this.unloadImg = img
      })
      // let $this = this
      // cropper.show({
      //   backImg (img) {
      //     $this.uploadImg(img, type)
      //   },
      //   autoCropWidth: 300, // 默认生成截图框宽度 0~max
      //   autoCropHeight: 300, // 默认生成截图框高度 0~max
      //   fixed: false, // 是否开启截图框宽高固定比例 true | false
      //   fixedNumber: [1, 2], // 截图框的宽高比例 [宽度, 高度]
      //   fixedBox: true, // 固定截图框大小 不允许改变 true | false
      //   canMove: true, // 上传图片是否可以移动 true | false
      //   canMoveBox: false // 截图框能否拖动 true | false
      // })
    },
    backImg (img) {
      this.uploadImg(img, this.type)
    },
    uploadImg (img, type) {
      axios.post('/apis/tsr_server/asr/apply/html/put/v1/shopImgSubmit', {
        data: {
          img_base64_url: img
        }
      }).then((res) => {
        console.log(res)
        let data = res.data
        console.log(res.data.data.img_url)
        if (data.result.reCode === '0') {
          this[type] = data.data.img_url
        }
      })
      // this[type] = ''
      // this.loadingShow = type
      // this.timmer(img, type)
    },
    timmer (img, type) {
      setTimeout(() => {
        this.process += 10
        if (this.process === 100) {
          this[type] = img
          this.loadingShow = ''
          this.process = 0
        } else {
          this.timmer(img, type)
        }
      }, 100)
    }
  }
}
</script>

<style lang="less">
// @keyframes progressbar {
//   from {
//     width: 0;
//   }
//   to {
//     width: 100%;
//   }
// }
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.item {
  .upload {
    width: 150px;
    height: 150px;
    border: 1px solid #a3a3a3;
    font-size: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .process_bar {
      height: 5px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #75d84e;
      border-radius: 30px;
    }
  }
  .img_show {
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
</style>
