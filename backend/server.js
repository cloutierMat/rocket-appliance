require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const app = express();
const port = process.env.PORT || 8080;

// express environment setup
app.use(express.json());
app.use(logger('dev'));

// routes
const gameRouter = require('./routes/game');
app.use('/game', gameRouter);

app.listen(port, () => {
   console.log('server listening on port ' + port);
});
