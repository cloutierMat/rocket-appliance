const mongoose = require('mongoose');
const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;


db.on('error', function (error) {
	console.error('mongoose connection error', error);
});

db.once('open', function () {
	console.log('mongoose connection successful to database');
});