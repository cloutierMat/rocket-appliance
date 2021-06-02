require('./db');
const mongoose = require('mongoose');
require('mongoose-type-url');

let changePointer = new Date().toISOString();

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
	isApproved: {
		type: Boolean,
		default: false
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
		changePointer = new Date().toISOString();
		console.log(changePointer, "Last change is reported");
	});

function getChangePointer() {
	return changePointer;
}

module.exports = {
	Trivia,
	getChangePointer,
};