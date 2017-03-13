const mongodb = require('../mongodb');
const Schema = mongodb.mongoose.Schema;
const DataSchema = new Schema({
	code: Number,
	msg: String,
	word: String,
	device: String,
	time: Number,
	dataList: [{
		info: String,
		link: String,
		pic: String,
		pid: String
	}]
})
var Data = mongodb.mongoose.model("Data", DataSchema);
var DataDAO = function() {};
DataDAO.prototype.save = function(obj, callback) {
	var instance = new Data(obj);
	instance.save(function(err) {
		callback(err);
	});
};

DataDAO.prototype.findByIdAndUpdate = function(obj, callback) {
	var _id = obj._id;
	delete obj._id;
	Data.findOneAndUpdate(_id, obj, function(err, obj) {
		callback(err, obj);
	});
}


DataDAO.prototype.findByName = function(name, callback) {
	Data.findOne({
		name: name
	}, function(err, obj) {
		callback(err, obj);
	});
};

module.exports = new DataDAO();