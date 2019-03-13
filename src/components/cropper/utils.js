import objectAssign from 'object-assign'
import lrz from 'lrz'

/**
 * @description 上传图片点击事件
 * @export
 * @returns
 */
let uploadImgInput
export function uploadImgAction () {
  return new Promise(function (resolve, reject) {
    // 创建input标签
    if (!uploadImgInput) {
      uploadImgInput = document.createElement('input')
      uploadImgInput.type = 'file'
      uploadImgInput.accept = 'image/*'
    }
    // 监听动作
    uploadImgInput.addEventListener('change', _fileChange)
    uploadImgInput.click()
    function _fileChange (e) {
      if (e.target.files.length === 0) {
        return
      }
      // 移除监听
      uploadImgInput.removeEventListener('change', _fileChange)
      const file = e.target.files[0]
      e.target.value = ''
      lrz(file, {
        quality: 0.6
      }).then(
        (rst) => {
          let bundelImg = rst.base64
          resolve(bundelImg)
        }
      ).catch((err) => {
        alert(err)
      })
    }
  })
}

export function mergeOptions ($vm, options) {
  const defaults = {}
  for (let i in $vm.$options.props) {
    if (i !== 'value') {
      defaults[i] = $vm.$options.props[i].default
    }
  }
  const _options = objectAssign({}, defaults, options)
  for (let i in _options) {
    $vm[i] = _options[i]
  }
}
