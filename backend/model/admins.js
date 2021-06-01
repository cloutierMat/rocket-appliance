require('./db');
const mongoose = require('mongoose');

let admins = [];

const adminSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	userId: {
		type: String,
		required: true,
		unique: true
	},
});

const Admin = mongoose.model("Admin", adminSchema);

async function init() {
	try {
		const adminList = await Admin.find({}).exec();
		admins = adminList || [];
	} catch (error) {
		console.log("Error in fetching Admin List from", error);
	}
}

function isIdAdmin(userId) {
	const result = admins.findIndex(admin => admin.userId === userId);
	if (result !== -1) console.log("User is Admin");
	return result !== -1;
}

async function addUser(user) {
	try {
		const newAdmin = new Admin({ ...user });
		const result = await newAdmin.save();
		console.log("result", result);
		admins.push(newAdmin);
	} catch (error) {
		if (error.code === 11000) {
			console.error("This user already exists");
		} else {
			console.error("Error in adding an Admin to db", error);
		}
	}
}

module.exports = {
	isIdAdmin,
	init,
	addUser
};