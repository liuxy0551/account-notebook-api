const mongoose = require('mongoose')
const { Schema } = mongoose
const envJson = require('../../.env.json')

const env = process.env.NODE_ENV || 'development'
const { host, port, dbName, username, password } = envJson[env]
const url = `mongodb://${username}:${password}@${host}:${port}/${dbName}`

const AccountSchema = new Schema({
    _openid: String,
    nickName: String,
    updateTime: String,
    accountList: [
        {
            id: String,
            name: String,
            encrypted: Boolean,
            note: String,
            password: String,
            time: String,
            username: String,
            tagIdList: [String],
        }
    ],
});
const TagSchema = new Schema({
    _openid: String,
    nickName: String,
    updateTime: String,
    tagList: [
        {
            id: String,
            name: String,
        }
    ],
});
const UserSchema = new Schema({
    _openid: String,
    nickName: String,
    updateTime: String,
    userInfo: Object,
    autoSync: Boolean,
    isPay: Boolean,
});

const Account = mongoose.model('Account', AccountSchema, 'Account')
const Tag = mongoose.model('Tag', TagSchema, 'Tag')
const User = mongoose.model('User', UserSchema, 'User')

// 初始化数据库链接
const initDB = async () => {
    try {
        await mongoose.connect(url)
        console.log(`Connected successfully to mongodb by mongoose! DbName: ${dbName}`)
    } catch (error) {
        console.log('Connect error: ', error)
    }
}

// 获取用户信息
const getUserInfo = async (_openid) => {
    return await User.findOne({ _openid })
}

// 更新用户信息
const updateUserInfo = async (_openid, userInfo) => {
    const user = await User.findOne({ _openid })
    if (user) {
        await User.updateOne({ _openid }, userInfo)
    } else {
        await User.create(userInfo)
    }
}

// 更新用户自动同步的配置项
const updateUserAutoSync = async (_openid, asyncInfo) => {
    return await User.updateOne({ _openid }, asyncInfo)
}

// 获取账号列表
const getAccountList = async (_openid) => {
    return await Account.findOne({ _openid })
}

// 获取标签列表
const getTagList = async (_openid) => {
    return await Tag.findOne({ _openid })
}

// 更新账户数据
const updateAccountData = async (_openid, accountInfo) => {
    const account = await Account.findOne({ _openid })
    if (account) {
        await Account.updateOne({ _openid }, accountInfo)
    } else {
        await Account.create(accountInfo)
    }
}

// 更新标签数据
const updateTagData = async (_openid, tagInfo) => {
    const tag = await Tag.findOne({ _openid })
    if (tag) {
        await Tag.updateOne({ _openid }, tagInfo)
    } else {
        await Tag.create(tagInfo)
    }
}

module.exports = {
    initDB,
    getUserInfo,
    updateUserInfo,
    updateUserAutoSync,
    getAccountList,
    getTagList,
    updateAccountData,
    updateTagData,
}
