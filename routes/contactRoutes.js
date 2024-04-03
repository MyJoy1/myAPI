const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {
    getContacts,
    createContact,
    findContactById,
    updateContactById,
    deleteContactById
} = require("../controllers/contactController");

// 使用中间件 校验用户是否登录
router.use(validateToken);
router.route("/:id").get(findContactById).put(updateContactById).delete(deleteContactById);
router.route("/").get(getContacts).post(createContact);

module.exports = router;
