require('dotenv').config();
require('./model/admins').init();
const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const app = express();
const port = process.env.PORT || 8080;

// express environment setup
app.use(express.json());
app.use(logger('dev'));

// routes
const gameRouter = require('./routes/game');
app.use('/game', gameRouter);


app.use(express.static('../frontend/build'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	console.log("SDFSWFSDFSDFSDFSDF");
	next(createError(404));
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.listen(port, () => {
	console.log('server listening on port ' + port);
});
