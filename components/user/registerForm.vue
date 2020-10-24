<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" class="form">
      <!--用户名手机  -->
      <el-form-item class="form-item" prop="username">
        <el-input placeholder="用户名手机" v-model="form.username"></el-input>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="captcha">
        <el-input placeholder="验证码" v-model="form.captcha">
          <template slot="append"><div class="captchaDiv" @click="handleCaptcha">发送验证码</div></template>
        </el-input>
      </el-form-item>

      <!-- 昵称 -->
      <el-form-item class="form-item" prop="nickname">
        <el-input placeholder="昵称" v-model="form.nickname"></el-input>
      </el-form-item>

      <!-- 密码的输入框 -->
      <el-form-item class="form-item" prop="password">
        <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
      </el-form-item>

      <!-- 确认密码 -->
      <el-form-item class="form-item" prop="confirmpassword">
        <el-input placeholder="确认密码" type="password" v-model="form.confirmpassword"></el-input>
      </el-form-item>

      <el-button class="submit" type="primary" style="width:100%"
        @click="submitForm()">
        注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.confirmpassword !== '') {
          this.$refs.form.validateField('confirmpassword');
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    var checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'));
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号码!'));
      } else {
        callback();
      }
    };

    return {
      // 表单数据
      form: {
        username:'',
        nickname:'',
        captcha:'',
        password:''
      },
      // 表单规则
      rules: {
        username: [
          {validator: checkPhone, trigger: 'blur'}
        ],
        captcha: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmpassword: [
          {validator: validatePass2, trigger: 'change'}
        ]
      },

    }
  },

  methods: {
    // 提交登录
    // handleRegisterSubmit(){

    //   console.log('11111111111',this.$refs.form)
    //       this.$store.dispatch("user/register",this.form).then(res =>{
    //         this.$message.success("注册成功");
    //         this.$router.push("/");
    //       })
    // },
    submitForm() {
        this.$refs.form.validate(valid=>{
          console.log('valid:',valid)
          if (valid) {
            console.log('this.form:',this.form)
            let data = {
              username: this.form.username,
              nickname: this.form.nickname,
              password: this.form.password,
              captcha: this.form.captcha
            }
            console.log('data:',data)
            this.$store.dispatch("user/register",data).then(res =>{
            this.$message.success("注册成功");
            this.$router.push("/");
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    // 模拟获取验证码
    handleCaptcha(){
      this.$message.success("模拟手机验证码:000000");
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

  .captchaDiv{
    cursor: pointer;
  }



</style>
