const mongoose = require("mongoose");

const blackListTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("BlackListToken", blackListTokenSchema);