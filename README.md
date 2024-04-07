
# MyAPI

## 技术栈

- **Node.js + Express：** 使用 Node.js 和 Express 框架搭建后端服务器，提供 RESTful API 接口。
- **MongoDB：** 使用 MongoDB 作为后端数据库存储数据。

## 目标

通过 RESTful API 实现 `/api/contacts` 相关接口的增删改查功能，并实现 `/api/user` 相关接口的登录和登出功能。

# 测试
使用VSCode的插件: Thunder Client 进行接口测试

## 实现功能

1. **联系人接口 (`/api/contacts`)：**
   - 实现增删改查功能
   - 用户只能在登录状态下对自己账户下的联系人数据进行编辑。

2. **用户接口 (`/api/users`)：**
   - 实现用户的登录和登出功能，使用 JSON Web Token (JWT) 进行身份验证和授权。

## 使用的三方库

1. **jsonwebtoken：**
   - 身份验证机制，用于用户身份验证和授权（相当于登录令牌）。
   - 通过jsonwebtoken可以生成对应的token，客户端发送请求时携带token进行验证，保证请求的安全性和可靠性。

2. **express-async-handler：**
   - 处理异步请求的中间件，简化异步函数的错误处理流程，使代码更简洁和易于理解。
   - 允许在路由处理器中直接使用 async/await，而不用显式处理错误。

3. **bcrypt：**
   - 用于密码加密和哈希处理，将密码哈希存储在数据库中，提高数据的安全性。

4. **dotenv：**
   - 从环境变量文件中加载环境变量，用于配置应用程序所需的环境变量。

## 整体流程
<img width="2055" alt="image" src="https://github.com/MyJoy1/myAPI/assets/91833139/e7b3f968-c0e0-48a1-a94b-ff9e87c30c93">
