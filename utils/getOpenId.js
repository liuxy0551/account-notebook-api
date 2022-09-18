/**
 * auth.code2Session
 * https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html
 */
const request = require('request')
const { appId, appSecret } = require('../.env.json')

/**
 * 通过 wx.login 拿到的 code 获取 openid、session_key
 * @param {string} code
 */
const getOpenId = async (code) => {
  return new Promise((resolve, reject) => {
    request.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${ appId }&secret=${ appSecret }&js_code=${ code }&grant_type=authorization_code`, (err, res, body) => {
      if (!`${body}`.includes('openid')) {
        reject(JSON.parse(body))
      } else {
        resolve(JSON.parse(body))
      }
    })
  })
}

module.exports = getOpenId
