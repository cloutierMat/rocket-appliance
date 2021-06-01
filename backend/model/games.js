require('./db');
const mongoose = require('mongoose');
require('mongoose-type-url');

let changePointer = new Date();

const triviaSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minLength: 3,
		maxLength: 20,
	},
	category: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 20,
	},
	type: {
		type: String,
		required: true,
		minLength: 3,
	},
	author: {
		type: String,
	},
	userId: {
		type: String,
	},
	description: {
		type: String,
		required: true,
		maxLength: 200,
		minLength: 30,
	},
	questions: [
		{
			question: {
				type: String,
				required: true,
				minLength: 3,
			},
			options: {
				type: Array,
				required: true,
				minLength: 1,
			},
			link: {
				type: mongoose.SchemaTypes.Url,
				required: true
			}
		}
	]
});

const Trivia = mongoose.model("Trivia", triviaSchema);

Trivia.watch()
	.on("change", data => {
		changePointer = new Date();
		console.log(changePointer, "Last change is reported");
	});

module.exports = {
	Trivia,
	changePointer,
};