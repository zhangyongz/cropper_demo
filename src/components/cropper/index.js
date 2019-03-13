
import Vue from 'vue'
import CropperComponent from './cropper'
import { mergeOptions, uploadImgAction } from './utils'

let $vm

const Cropper = Vue.extend(CropperComponent)

// 在document中挂载Cropper组件
if (!$vm) {
  $vm = new Cropper({
    el: document.createElement('div'),
    propsData: {
      show: false
    }
  })
  document.body.appendChild($vm.$el)
}

const cropper = {
  // 显示
  show (options) {
    // 合并传入的参数至组件的props
    if (typeof options === 'object') {
      mergeOptions($vm, options)
    }

    // 选择图片
    uploadImgAction().then((bundelImg) => {
      $vm.img = bundelImg // 设置组件img属性为选择的图片
      $vm.show = true // 显示组件

      // 取消上次监听
      $vm.$off('change')
      $vm.$off('backImg')

      // 监听关闭方法
      $vm.$on('change', (value) => {
        if (!value) {
          $vm.show = false
        }
      })
      // 监听完成回调
      $vm.$on('backImg', (img) => {
        if ($vm.backImg) {
          $vm.backImg(img)
        }
      })
    })
  },
  hide () {
    $vm.show = false
  },
  isVisible () {
    return $vm.show
  }
}

export default cropper
