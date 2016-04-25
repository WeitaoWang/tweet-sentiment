var mongoose = require('mongoose');

var sentimentResultDailySchema = new mongoose.Schema({
	state: String,
	coordinates:[Number],
	candidates: String,
	positiveAvgScore: Number,
	negativeAvgScore: Number,
	amount: Number,
	positivePercent: Number, //percentage of the positive tweet 
	negativePercent: Number, //percentage of the negative tweet
	dayNum: Number,		 	 //4-10-2016 is the first day, whose the day is 1.
	date: String,
	eventInfo: String 
});
module.exports = mongoose.model('sentimentResultDaily', sentimentResultDailySchema);