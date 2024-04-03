const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const BlackListToken = require("../models/blackListTokenModel");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHerader = req.headers.authorization || req.headers.Authorization;
    if(authHerader && authHerader.startsWith("Bearer")) {
        token = authHerader.split(" ")[1];
        req.access_token = token;

        const findToken = await BlackListToken.findOne({token: token})
        if(findToken) {
            res.status(401);
            throw new Error("用户已退出登录，请重新登录！");
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                res.status(401);
                throw new Error("用户登录未授权或已过期！");
            }
            req.user = decoded.user;
            next();
        });
        if(!token) {
            res.status(401);
            throw new Error("用户登录未授权或者已过期！请重新登录！");
        }
    } else {
        res.status(401);
        throw new Error("用户未登录，请重新登录!")
    }
});

module.exports = validateToken;