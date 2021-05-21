const router = require('express').Router();
const games = require('../model/games');

router.get('/play/trivia/:name', async function (req, res) {
	try {
		const triviaToLoad = req.params;
		const triviaToSend = await games.Trivia.findOne(triviaToLoad);
		console.log('loaded trivia', triviaToSend);
		res.send(triviaToSend);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// endpoint to retrieve a list of all playable games
// returns an object containing
// name, category, author, description
router.get('/list', async function (req, res) {
	try {
		const query = games.Trivia.find({});
		query.select({ name: 1, category: 1, type: 1, author: 1, description: 1, _id: 0 });
		const list = await query.exec();
		console.log("loaded game list. count:", list.length);
		res.send(list);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// endpoint to create a new trivia game
router.post('/trivia', async function (req, res) {
	// data retrieved from the request body
	const triviaToCreate = req.body;
	try {
		// first we look in the db to see if there is already a trivia with that name
		const triviaValidator = await games.Trivia.findOne({ name: triviaToCreate.name });
		// if it already exists, return a 405 "method not allowed"
		if (triviaValidator) {
			console.error("attempt to enter duplicate in trivia", triviaToCreate);
			res.sendStatus(409);
			return;
		}
		// create a new instance of the Trivia schema
		const newTrivia = new games.Trivia(triviaToCreate);
		// save the new object in the database
		await newTrivia.save();
		console.log("created a trivia", newTrivia);
		// return the newly created game to the client
		res.send(newTrivia);
	} catch (error) {
		// uncatched error will return 500 "server error"
		console.error("failed to post trivia", error);
		res.sendStatus(500);
	}
});

module.exports = router;
