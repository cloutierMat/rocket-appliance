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
		query.select({ _id: 0 });
		const list = await query.exec();
		console.log("Loaded game list. count:", list.length);
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
		// create a new instance of the Trivia schema
		const newTrivia = new games.Trivia(triviaToCreate);
		// save the new object in the database
		await newTrivia.save();
		console.log("Created a trivia", newTrivia);
		// return the newly created game to the client
		res.send(newTrivia);
	} catch (error) {
		if (error.code === 11000) {
			// Catching duplicate error
			console.error("Duplicate name error", error);
			res.status(409).send({ error: error.code, message: `There is a game with the same name already. Try a different one.` });
		}
		else {
			// uncatched error will return 500 "server error"
			console.error("Failed to post trivia", error);
			res.status(500).send({ error: error.code, message: `Something went wrong! Try again.` });
		}
	}
});

// endpoint to edit an existing trivia game
router.put('/trivia', async function (req, res) {
	// data retrieved from the request body
	const triviaToEdit = req.body;
	try {
		const query = games.Trivia.findOneAndUpdate({ name: triviaToEdit.name }, triviaToEdit, { runValidators: true });
		// save the updated object in the database
		const updateResult = await query.update();
		if (!updateResult.n) {
			console.log("Updating a non-exsisting game failed.", updateResult);
			res.status(409).send({ message: "You are trying update a non-existing game. Please verify the name to make sure you are modifying an established game" });
			return;
		}
		console.log("Updated the trivia", triviaToEdit);
		// return the updated game to the client
		res.send(triviaToEdit);
	} catch (error) {
		// uncatched error will return 500 "server error"
		console.error("Failed to update trivia", error);
		res.status(500).send({ error: error.code, message: `Something went wrong! Try again.` });
	}
});

module.exports = router;
