// 引入模块
const Koa = require('koa')
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const router = require('./router')
const envJson = require('./.env.json')
const { initDB } = require('./utils/mongodb')

// 实例化
const app = new Koa()
app.use(cors())
app.use(logger())

// 支持文件上传
app.use(koaBody({
  multipart: true,
  formidable: {
    // 设置上传文件大小最大限制，默认100M
    maxFileSize: 10 * 1024 * 1024
  }
}))

// 启动路由
router(app)

// app错误监听
app.on('error', (err) => {
  console.error('Server error: \n%s\n%s ', err.stack || '')
})

app.listen(envJson.appPort, async () => {
    console.log(`app runs on port ${ envJson.appPort }.`)
    await initDB()
})
