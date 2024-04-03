const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// 查找当前用户创建的信息
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json({
        code: 200,
        data: contacts
    });
});

const createContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("姓名、邮箱、密码均需要填写！请检查");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(200).json({
        code: 200,
        message: "创建成功！",
        data: contact
    });
});

const findContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error(`未找到 id：${req.params.id} 的联系人`);
    }

    if(contact.user_id.toString() != req.user.id) {
        res.status(403);
        throw newError(`用户无权更新其他用户名下的数据！`);
    }

    res.status(200).json({
        code: 200,
        message: "查找到数据！",
        data: contact
    });
});

const updateContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error(`未找到 id：${req.params.id} 的联系人`);
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw newError(`用户无权更新其他用户名下的数据！`);
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json({
        code: 200,
        message: "更新成功！",
        data: updatedContact
    });
});

const deleteContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error(`未找到 id：${req.params.id} 的联系人，该数据已被删除或者不存在！`);
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw newError(`用户无权更新其他用户名下的数据！`);
    }

    const deleteData = await contact.deleteOne({_id: req.params.id});
    if(deleteData.deletedCount >= 1) {
        res.status(200).json({
            code: 200,
            message: "删除成功！",
            data: {
                id: req.params.id
            }
        });
    } else {
        res.status(500);
        throw new Error("系统错误，请稍后再试......")
    }
    
})

module.exports = {
    getContacts,
    createContact,
    findContactById,
    updateContactById,
    deleteContactById
};
