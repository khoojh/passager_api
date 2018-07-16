var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/passager');


// exports.connect = () => {
//   return mongoose.connect('mongodb://localhost/passager');
// }




module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/passager', { useNewUrlParser: true });
}
