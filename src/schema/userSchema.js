const { model, Schema } = require('mongoose')

let user = new Schema({
    Username: {
        type: String,
        required: true
    },
    HashedPassword: {
        type: String,
        required: true
    },
});

module.exports = model("user", user);