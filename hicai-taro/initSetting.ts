console.log(process.env, 12345)
// 相同配置项
const commmonConfig: any ={
  BASE_URL: ''
}
// 差异化配置
const config: any = {
  12: {
    CHANNEL_ID: 12
  }
}
export default { ...commmonConfig, ...config }