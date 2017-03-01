const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/phantomjs_2');
exports.mongoose = mongoose;