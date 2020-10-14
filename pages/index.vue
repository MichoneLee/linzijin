<template>
  <div class="container">
    <!-- 轮播图 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div class="banner-image" :style=" `background: url(${'http://157.122.54.189:9095'+item.url}) center center no-repeat;
                                            background-size: contain contain;`">
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">

        <!-- tab栏 -->
        <el-row class="search-tab" type="flex">
          <span v-for="(item, index) in options" :key="index"
                :class="{active: index === currentOption}"
                @click="handleOption(index)">
            <i>{{item.name}}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row class="search-input" type="flex" align="middle">
          <input type="text" :placeholder="options[currentOption].placeholder" v-model="searchValue" @keyup.enter="handleSearch()"/>
          <i class="el-icon-search" @click="handleSearch()"></i>
        </el-row>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      // 轮播图数据
      banners: [],

      // tab栏数据
      options: [
        {
          name: "攻略",
          placeholder: "搜索城市",
          pageUrl: "/post?city="
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店",
          pageUrl: "/hotel?city="
        },
        {
          name: "机票",
          placeholder: "请输入出发地",
          pageUrl: "/air"
        }
      ],

      searchValue: "", // 搜索框的值
      currentOption: 0 // 当前选中的值
    }
  },

  methods: {
    // 点击tab栏事件
    handleOption(index){
      // 跳转到机票页面
      if(index===2){
        // nuxt是支持$router,$route
        this.$router.push("/air");
      }
      // 处理高亮 给当前的按钮添加active class
      this.currentOption = index;
    },

    // 搜索页的跳转
    handleSearch(){
      // 获取输入框的值 this.searchValue

      // 拼接链接 默认 /post?city= + 关键字
      const url = this.options[this.currentOption].pageUrl + this.searchValue;

      this.$router.push(url);
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

  /* 轮播图样式 */
  .el-carousel__container{
    height: 600px;
  }

  .banner-image{
    width: 100%;
    height: 100%;
  }

  /* 搜索框样式 */
  .banner-content{
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;
  }

  .search-bar{
    width: 552px;
    margin: 0 auto;
  }

  .search-tab .active i{
     color: #333;
  }


  .search-tab .active:after{
    background: #eee;
  }

  .search-tab span{
    width: 82px;
    height: 36px;
    display: block;
    position: relative;
    margin-right: 8px;
    cursor: pointer;
  }

  .search-tab span i{
    position: absolute;
    z-index: 2;
    display: block;
    width: 100%;
    height: 100%;
    line-height: 30px;
    text-align: center;
    color: #fff;
  }

  .search-tab span:after{
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    border: 1px rgba(255, 255, 255, .2) solid;
    border-bottom: none;
    transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
    transform-origin: bottom left;
    background: rgba(0, 0, 0, .5);
    border-radius: 1px 2px 0 0;
    box-sizing: border-box;
  }

  .search-input{
    width: 550px;
    height: 46px;
    background: #fff;
    border-radius: 0 4px 4px 4px;
    border: 1px rgba(255, 255, 255, .2) solid;
    border-top: none;
    box-sizing: unset;
  }

  .search-input input{
    flex: 1;
    height: 20px;
    padding: 13px 15px;
    outline: none;
    border: 0;
    font-size: 16px;
  }

  .el-icon-search{
    cursor: pointer;
    font-size: 22px;
    padding: 0 10px;
    font-weight: 700;
  }
</style>
