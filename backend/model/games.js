require('./db');
const mongoose = require('mongoose');
require('mongoose-type-url');

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
	type: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		default: "anonymous"
	},
	description: {
		type: String,
		required: true,
		maxLength: 200,
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
			link: {
				type: mongoose.SchemaTypes.Url,
				required: true
			}
		}
	]
});

module.exports = { Trivia: mongoose.model("Trivia", triviaSchema) };