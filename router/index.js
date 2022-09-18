const Router = require('koa-router')
const getOpenId = require('../utils/getOpenId')
const { getUserInfo, updateUserInfo, updateUserAutoSync, getAccountList, getTagList, updateAccountData, updateTagData } = require('../utils/mongodb')

const router = new Router()

module.exports = app => {
    router.post('/v1/getOpenId', async (ctx) => {
        try {
            const { code } = ctx.request.body
            const { openid } = await getOpenId(code)
            ctx.body = { code: 200, data: openid, message: '成功' }
        } catch (error) {
            ctx.body = { code: 1, error }
        }
    })

    router.get('/v1/getUserInfo', async (ctx) => {
        try {
            const { _openid } = ctx.query
            const user = await getUserInfo(_openid)
            ctx.body = { code: 200, data: user, message: '成功' }
        } catch (error) {
            ctx.body = { code: 1, error }
        }
    })

    router.post('/v1/updateUserInfo', async (ctx) => {
        try {
            const data = ctx.request.body
            const { _openid } = data
            await updateUserInfo(_openid, data)
            ctx.body = { code: 200, data: _openid, message: '成功' }
        } catch (error) {
            ctx.body = { code: 1, error }
        }
    })

    router.post('/v1/updateUserAutoSync', async (ctx) => {
        try {
            const { _openid, data: asyncInfo } = ctx.request.body
            const result = await updateUserAutoSync(_openid, asyncInfo)
            ctx.body = { code: 200, data: result, message: '成功' }
        } catch (error) {
            ctx.body = { code: 1, error }
        }
    })

    router.get('/v1/getAccountList', async (ctx) => {
        try {
            const { _openid } = ctx.query
            const data = await getAccountList(_openid)
            ctx.body = { code: 200, data, message: '成功' }
        } catch (error) {
            ctx.body = { code: 1, error }
        }
    })

    router.get('/v1/getTagList', async (ctx) => {
        try {
            const { _openid } = ctx.query
            const data = await getTagList(_openid)
            ctx.body = { code: 200, data, message: '成功' }
        } catch (error) {
            ctx.body = { code: 1, error }
        }
    })

    router.post('/v1/updateAccountData', async (ctx) => {
        try {
            const { _openid, data: accountInfo } = ctx.request.body
            await updateAccountData(_openid, accountInfo)
            ctx.body = { code: 200, data: _openid, message: '成功' }
        } catch (error) {
            ctx.body = { code: 1, error }
        }
    })

    router.post('/v1/updateTagData', async (ctx) => {
        try {
            const { _openid, data: tagInfo } = ctx.request.body
            await updateTagData(_openid, tagInfo)
            ctx.body = { code: 200, data: _openid, message: '成功' }
        } catch (error) {
            ctx.body = { code: 1, error }
        }
    })

    app.use(router.routes(), router.allowedMethods())
}
