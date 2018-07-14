var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    passages: [{
        type: Schema.Types.ObjectId,
        ref: "passage"
    }]
});

module.exports = mongoose.model('user', userSchema);
