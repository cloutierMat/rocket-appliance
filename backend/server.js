require('dotenv').config();
require('./model/admins').init();
const express = require('express');
const logger = require('morgan');
const app = express();
const port = process.env.PORT || 8080;

// express environment setup
app.use(express.json());
app.use(logger('dev'));

function redirectUnmatched(req, res) {
	res.redirect('/');
}

// routes
const gameRouter = require('./routes/game');
app.use('/game', gameRouter);

app.use(express.static('../frontend/build'));

// catch unmatched urls and redirect to index.html
app.use(redirectUnmatched);

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => {
	console.log('server listening on port ' + port);
});
