module.exports = {
    //关闭eslint
    lintOnSave:false,
    // 开启代理服务器
    devServer:{
        proxy:'http://localhost:3000',
    },
    publicPath:'/',
}