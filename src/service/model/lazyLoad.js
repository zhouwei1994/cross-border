//Vue 图片懒加载
export default (Vue, options = {}) => {
  var init = {
    default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAAEcCAIAAACalpy3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUzREUxNTkwOERGMTExRTdCNzlCRTc5RTUxMDVDRUY4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUzREUxNTkxOERGMTExRTdCNzlCRTc5RTUxMDVDRUY4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTNERTE1OEU4REYxMTFFN0I3OUJFNzlFNTEwNUNFRjgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTNERTE1OEY4REYxMTFFN0I3OUJFNzlFNTEwNUNFRjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4ItUZbAAAEfklEQVR42uzd726aUBjA4Yki2vRL7//meg2GiCjI3uFqtrSulYJrPc/zoclqsoXDfh7+M3t+fv4BjCczBCAqEBWIChAViApEBYgKRAWiAkQFogJRgagAUYGoQFSAqEBUICpAVCAqEBUgKhAViApEBYgKRAWiAkQFogJRAaICUYGoAFGBqEBUICpAVCAqEBUgKhAViAoQFYgKRAWICkQFogJRAaICUYGoAFGBqEBUgKhAVCAqEBUgKhAViAoQFYgKRAWICkQFogJEBaICUYGoAFGBqEBUgKhAVCAqQFQgKhAVICoQFYgKRAWICkQFogJEBaICUQGiAlGBqABRgahAVCAqQFQgKhAVICr4LxaGYJiiKJbL5Xw+n81md7mAXde1bbvf7+u6trpFNfHknmWPj4+R030vZnxZLHrx9VGW5fF4tOpt/k0lhaL+FAsbi2y9i2rCrb6kijp3FQtu7YtqErEfZcER1aj7oIuFBUdUICoQFSAqEBWICtLkOOn4DofDbrdr2/ZHf9p0tVrleW5YRMVAVVVFUec/Nk1TlmV0tV6vDY7NPwbOUa9/H7+Mj4yPqLjam0W9+xGi4qLTftS1HyEqQFS38o+7QhK8YURUjGC1Wg34CFFxUZ7nb8bjVFVSnKca2Xq9XiwWTv6KipHnKxXZ/ANEBaICUQGiAlHB/XFI/Z4de13X/f4G7d3rGxVExSSin8Ph0PQuXRcfXZ3ePLBcLgUmKi6Kluq6/sitkDF37Xvb7TbP86IonKoWFX+JPKqqGvaqm0MvZq2HhwfX0YuKX0nEbPP5N0fFtuJms4muvNpDVEkfgYicxn3uRfyFsRsWaRleUaW4vRcBnI/pjSj2yrIsc+uXqBISIUVOEdV0/0Tsnp2ODRrtwZz8/TZOez6TFnXiwU9mqiQmqF3vZvUac1Hds7EO8V3VsGEX1X2a4hAfokp3e6+qqrquDYWoGGF2qnu2wUTFCPtOH7x4D1GlssEWPwdc9N00TYS03+9veSgCUX1150sc5vN5URTv3lLRtm3zQkui4g273e40U0Ut215EFYHFzyzLzvPY8YURExXveH07YFTkFGqyXKYEogJRgagAUYGoQFSAqEBUICpAVCAqEBWIChAVfFnupxrB09OTQcBMxXU83UlUU0n2ft5LLztFVJ91g/cDWHBRpaWu6wS/s2ORPS5XVBMqyzKprmJhY5Gt949z9O9qx+Nxs9kUvSzLBjxA81vouu78DGorXVQ32g70vw2bfyAqEBUgKhAViApEBYgKRAWiAkQFogJRAaICUYGoQFSAqEBUICpAVCAqEBUgKhAViAoQFYgKRAWiAkQFogJRAaICUYGoAFGBqEBUgKhAVCAqEBUgKhAViAoQFYgKRAWICkQFogJEBaICUYGoAFGBqEBUgKhAVCAqQFQgKhAViAoQFYgKRAWICkQFogJEBaICUQGiAlGBqEBUgKhAVCAqQFQgKhAVICoQFYgKEBWICkQFogJEBaICUQGiAlGBqABRgahAVICoQFQgKhAVICr4Qn4KMACVjo2cgBNbKQAAAABJRU5ErkJggg=='
  }
  //检测图片是否可以加载，如果可以则进行加载
  const isCanShow = () => {
    var imgObjList = document.querySelectorAll('img[data-src]');
    //页面可视区域的高度
    var winHeight = window.innerHeight;
    for(var ele of imgObjList){
      //图片距离页面顶部的距离
      var top = ele.getBoundingClientRect().top;
      var src = ele.getAttribute('data-src');
      var olvSrc = ele.getAttribute('src');
      //top + 10 已经进入了可视区域10像素
      if (src != olvSrc && top - winHeight <= 50) {
        img(ele,src);
      }
    }
    function img(ele,src){
      var image = new Image();
      image.src = src;
      image.onload = function () {
        ele.src = src;
      }
    }
  };
  window.addEventListener('scroll', function () {
      isCanShow();
  })
  //Vue 指令最终的方法
  const addListener = (ele, binding) => {
    //绑定的图片地址
    var imageSrc = binding.value;
    ele.setAttribute('data-src',imageSrc);
    //图片显示默认的图片
    ele.src = init.default;
    setTimeout( () => {
      isCanShow();
    },100);
  }
  Vue.directive('lazyload', {
    bind:addListener,
    update: addListener,
  })
}
