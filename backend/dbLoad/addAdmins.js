require('dotenv').config();
const admins = require('../model/admins');
const mongoose = require('mongoose');

async function init() {
	await admins.init();
}

async function add(user) {
	await admins.addUser(user);
}

async function verifyCreation(userId) {
	const isCreated = await admins.isIdAdmin(userId);
	if (!isCreated) {
		console.log("Couldn't find the user");
	}
}

async function runAll() {
	try {
		let username;
		let userId;
		process.argv.forEach(arg => {
			argument = arg.split("=");
			if (argument[0] === "username") username = argument[1];
			if (argument[0] === "userId") userId = argument[1];
		});
		if (!username || !userId) {
			console.log('invalid command. "node addAdmins username={username} userId={userId}"');
		} else {
			await init();
			await add({ username, userId });
			await verifyCreation(userId);
		}
	} catch (error) {
		console.log(error);
	}
	mongoose.connection.close();
}

runAll();