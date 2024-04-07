const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const BlackListToken = require("../models/blackListTokenModel");

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("用户名、邮箱、密码均需要填写！请检查！");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error("该邮箱已被注册，请更换其他邮箱!");
    }
    
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    const user =  await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`创建的用户信息为：${user}`);

    if(user) {
        res.status(201).json({
            code: 200,
            message: `用户：${username}，恭喜您，成功注册！`,
            data: {
                _id: user.id,
                email: user.email
            }
        });
    } else {
        res.status(400);
        throw new Error("用户信息不可用，请重新注册！");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
           user: {
            username: user.username,
            email: user.email,
            id: user.id
           },
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "5m"});
        res.status(200).json({
            code: 200,
            message: `用户：${user.username}， 登录成功！`,
            data: {
                accessToken
            }
        });
    } else {
        res.status(401)
        throw new Error("用户邮箱或者密码错误！请重新登录！");
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        code: 200,
        message: `用户：${req.user.username} 在登录状态！`,
        user: req.user
    })
});

const logoutUser = asyncHandler(async (req, res) => {
    const addTokenToBlackList = await BlackListToken.create({
        token: req.access_token
    });
   
    if(addTokenToBlackList) {
        res.status(200).json({
            code: 200,
            message: `用户：${req.user.username}，成功退出登录！`
        })
    } else {
        res.status(500);
        throw new Error("系统错误，请重试......");
    }
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    logoutUser
}