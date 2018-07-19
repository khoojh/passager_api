var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    // passages: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "passage"
    // }],
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = this.encryptPassword(this.password);
    next();
});

userSchema.methods = {
    // check password on signin
    authenticate: function(plainTextPassword) {
        console.log("PLAIN TEXT", plainTextPassword);
        console.log("THIS PW", this);
        console.log("SCHEMA", userSchema)
        return bcrypt.compareSync(plainTextPassword, this.password);
    },
    // hash the password
    encryptPassword: function(plainTextPassword) {
        if (!plainTextPassword) {
            return '';
        } else {
            var salt = bcrypt.genSaltSync(10);
            // probably should do this asynchronously
            return bcrypt.hashSync(plainTextPassword, salt);
        }
    }
}

// userSchema.methods.authenticate = function(plainTextPassword) {
//     return bcrypt.compareSync(plainTextPassword, this.password);
// }
//
// userSchema.methods.encryptPassword = function(plainTextPassword) {
//     if (!plainTextPassword) {
//         return '';
//     } else {
//         var salt = bcrypt.genSaltSync(10);
//         // probably should do this asynchronously
//         return bcrypt.hashSync(plainTextPassword, salt);
//     }
// }

module.exports = mongoose.model('user', userSchema);
