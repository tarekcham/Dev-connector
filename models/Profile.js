const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
	name: {
		type: String,
		requried: true
	},
	email: {
		type: String,
		requried: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
});

module.exports = Profile = mongoose.model('users', ProfileSchema )