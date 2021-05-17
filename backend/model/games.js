require('./db');
const mongoose = require('mongoose');

const triviaSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	category: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		default: "anonymous"
	},
	questions: [
		{
			question: {
				type: String,
				required: true,
			},
			options: {
				type: Array,
				required: true,
			},
		}
	]
});

module.exports = { Trivia: mongoose.model("Trivia", triviaSchema) };