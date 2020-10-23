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

// 用户优化
export const actions = {};
