<template>
<div class="header">

  <el-row type="flex"  justify="space-between" class="main">

    <!-- logo -->
    <div class="logo">
      <nuxt-link to="/">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
      </nuxt-link>
    </div>

    <!-- 菜单 -->
    <el-row type="flex" class="navs">
      <nuxt-link to="/">首页</nuxt-link>
      <nuxt-link to="/post">旅游攻略</nuxt-link>
      <nuxt-link to="/hotel">酒店</nuxt-link>
      <nuxt-link to="/air">国内机票</nuxt-link>
    </el-row>

    <!-- 登录 / 注册 -->
    <div class="header-right">

      <div v-if="$store.state.user.userInfo.token">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="$store.state.user.baseUrl+$store.state.user.userInfo.user.defaultAvatar" alt="">
            {{$store.state.user.userInfo.user.nickname}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleClick">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="login-link" v-else>
        <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
      </div>
    </div>

  </el-row>

</div>
</template>

<script>
export default {
  mounted(){
    console.log('store.state:', this.$store.state)
  },
  methods: {
    handleClick(){
      // 清除本地的数据
      this.$store.commit("user/clearUserInfo")
      this.$message.success("退出登录")
    }
  }
}
</script>

<style scoped lang="less">

  .header{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px #ddd solid;
    box-shadow: 0 2px 2px #eee;
  }

  .main{
    width: 1000px;
    margin: 0 auto;
  }

  /* logo */
  .logo{
    margin-top: 9px;
    margin-right: 20px;
  }

  .logo img{
    display: block;
    width: 156px;
    height: 42px;
  }

  /* 菜单样式 */
  .navs{
    flex: 1;

  }

  .navs a{
    display: block;
    padding: 0 20px;
    height: 60px;
    box-sizing: border-box;
  }

  .navs a:hover{
    color: #409eff;
    border-bottom: 5px #409eff solid;
  }

  .navs a:active{
    background-color: #409eff;
    color: #fff;
  }

  /* 菜单高亮的样式 */
  .navs .nuxt-link-exact-active{
    background-color: #409eff;
    color: #fff!important;
  }

  /* 登录 / 注册 */
  .el-dropdown-link img{
    width: 36px;
    height: 36px;
    border-radius: 100px;
    vertical-align: middle;
  }

  .login-link a{
    color: #666;
    font-size: 14px;
  }

  .login-link a:hover{
    color: #409eff;
    text-decoration: underline;
  }

</style>
