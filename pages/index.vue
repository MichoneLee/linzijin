<template>
  <div class="container">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <!-- <div class="banner-image"
          :style="`
          background: url(${item.url}) center center noRepeat;
          background-size: contain contain
          `">

        </div> -->

        <div class="banner-image" :style=" `background: url(${'http://157.122.54.189:9095'+item.url}) center center no-repeat;
                                            background-size: contain contain;`">
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>

</template>

<script>
export default {
  data(){
    return{
      // 轮播图数据
      banners: [
        // {
        //   url: 'http://157.122.54.189:9095/assets/images/th01.jfif'
        // },
        // {
        //   url: 'http://157.122.54.189:9095/assets/images/th02.jfif'
        // },
        // {
        //   url: 'http://157.122.54.189:9095/assets/images/th03.jfif'
        // },
        // {
        //   url: 'http://157.122.54.189:9095/assets/images/th04.jfif'
        // }
      ]
    }
  },

  mounted() {

    // 生成api文档
    // 请求本地数据
    // 把图片链接替换成本地的

    // Vue.prototype.$axios = axios
    // nuxt或默认把axios绑定到组件的原型，每个组件实例通过this.$axios来调用
    this.$axios({
      url: "http://157.122.54.189:9095/scenics/banners"
    }).then( res => {
      console.log(res.data);
      const {data} = res.data;
      this.banners = data;
    })
  },

}
</script>

<style>
  .container{
    min-width: 1000px;
    margin: 0 auto;
    position: relative;
  }

  .el-carousel__container{
    height: 600px;
  }

  .banner-image{
    width: 100%;
    height: 100%;
  }
</style>
