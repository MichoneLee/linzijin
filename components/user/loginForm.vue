<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" class="form">
      <!-- 用户名的输入框 -->
      <el-form-item class="form-item" prop="username">
        <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
      </el-form-item>

      <!-- 密码的输入框 -->
      <el-form-item class="form-item" prop="password">
        <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
      </el-form-item>

      <p class="form-text">
        <nuxt-link to="#">忘记密码</nuxt-link>
      </p>

      <el-button class="submit" type="primary" style="width:100%"
        @click="handleLoginSubmit()">
        登录
      </el-button>
    </el-form>

  </div>
</template>

<script>
export default {

  data() {
    return {
      // 表单数据
      form: {
        username:'',
        password:''
      },
      // 表单规则
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"}
        ]
      }
    }
  },

  methods: {
    // 提交登录
    handleLoginSubmit(){

      this.$refs.form.validate(valid=>{
        if(valid){
          // 调用登录接口
          //  this.$axios({
          //    url: "http://157.122.54.189:9095/accounts/login",
          //    method: "POST",
          //    data: this.form
          //  }).then(res=>{
          //   console.log('res:', res)
          //   // 调用store的方法把用户数据传过去
          //   this.$store.commit("user/setUserInfo",res.data);
          // })
          this.$store.dispatch("user/login",this.form).then(res =>{
            this.$message.success("登录成功");
            this.$router.push("/");
          })
        }
      })

    }
  },

}
</script>

<style lang="less" scoped>
  .form{
    padding: 25px;
  }

  .form-item{
    margin-bottom: 20px;
  }

  .form-text{
    font-size: 12px;
    color: #409EFF;
    text-align: right;
    line-height: 1;
  }

  .submit{
    width: 100%;
    margin-top: 10px;
  }
</style>
