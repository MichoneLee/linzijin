import {Message} from "element-ui"
// obj是nuxt对象
export default({$axios})=>{
  // 监听axios的错误请求
  $axios.onError(res => {
    const{message, statusCode} = res.response.data;

    if(statusCode === 400){
      Message.warning(message)
    }
  })
}
