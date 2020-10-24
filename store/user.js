// store下的每一个文件都是一个实例 不需要手动创建
// 只需要暴露store属性 固定的写法
// 由于nuxt项目会先在后端启动，调用window下api会报错

// 需要使用第三方的插件来把store的数据保存到本地
// 该插件会自动判断当前的环境是服务端还是浏览器
// 用户管理
export const state = () =>({
  baseUrl:"http://157.122.54.189:9095",
  userInfo: {
    token: "",
    user:{},
  }
})

export const mutations = {
  // 设置用户的数据
  setUserInfo(state,data){
    state.userInfo=data;
    console.log('user.data:', data);
  },

  // 清除用户的数据
  clearUserInfo(state){
    // 重置用户信息
    state.userInfo = {
      token: "",
      user:{},
    }
  }
};

// 存放公共的异步方法
export const actions = {
  login({commit},data){
    return  this.$axios({
      url: "http://157.122.54.189:9095/accounts/login",
      method: "POST",
      data
    }).then(res=>{
      console.log('登录res:', res)
      // 调用store的方法把用户数据传过去
      commit("setUserInfo",res.data);

      // 调用外部的成功的回调函数
      // 在promise函数中可以通过Promise.resolve来调用成功的回调函数
      Promise.resolve();
      // Promise.reject();
    })
  },

  register({commit},data){
    return  this.$axios({
      url: "http://157.122.54.189:9095/accounts/register",
      method: "POST",
      data
    }).then(res=>{
      console.log('注册res:', res)
      // 调用store的方法把用户数据传过去
      commit("setUserInfo",res.data);

      // 调用外部的成功的回调函数
      // 在promise函数中可以通过Promise.resolve来调用成功的回调函数
      Promise.resolve();
      // Promise.reject();
    })
  }
};
