var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "author"
    }
});

module.exports = mongoose.model('book', bookSchema);
