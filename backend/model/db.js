const mongoose = require('mongoose');
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;
const server = process.env.DB_SERVER;
const mongoUrl = `${host}://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`;

mongoose.connect(mongoUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', function (error) {
   console.error('mongoose connection error', error);
});

db.once('open', function () {
   console.log('mongoose connection successful to database', database);
});
