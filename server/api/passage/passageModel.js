var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passageSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "author",
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "book",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('passage', passageSchema);
