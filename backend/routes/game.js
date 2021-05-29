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
		const query = games.Trivia.find({}, { userId: 0, __v: 0 });
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
router.post('/trivia/:userId', async function (req, res) {
	// data retrieved from the request body
	const triviaToCreate = req.body;
	const userId = req.params.userId;
	try {
		// create a new instance of the Trivia schema
		const newTrivia = new games.Trivia({ ...triviaToCreate, userId });
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
router.put('/trivia/:userId', async function (req, res) {
	// data retrieved from the request body
	const triviaToEdit = req.body;
	const userId = req.params.userId;
	try {
		const findOneResult = await games.Trivia.findOne({ name: triviaToEdit.name }, { name: 1, userId: 1 }).exec();
		console.log("findOneResult", findOneResult);
		if (findOneResult.userId && findOneResult.userId !== userId) {
			console.log("Wrong user trying to delete a game", triviaToEdit, userId);
			res.status(409).send({ message: "You do not have permission to update this object" });
			return;
		}
		const query = games.Trivia.findOneAndUpdate({ name: triviaToEdit.name }, { ...triviaToEdit, userId }, { runValidators: true });
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

router.delete('/trivia/:name/:userId', async (req, res) => {
	const gameToDelete = req.params.name;
	const userId = req.params.userId;
	try {
		// using trivia model to delete a game
		const findOneResult = await games.Trivia.findOne({ name: gameToDelete }, { name: 1, userId: 1 }).exec();
		if (findOneResult.userId && findOneResult.userId !== userId) {
			console.log("Wrong user trying to delete a game", gameToDelete, userId);
			res.status(409).send({ message: "You do not have permission to delete this object" });
			return;
		}
		const deleteResult = await games.Trivia.findOneAndDelete({ name: gameToDelete }).exec();
		console.log("Deleting a game from database", deleteResult);
		res.send({ message: `Succesfullly deleted ${deleteResult.name}` });
	} catch (error) {
		console.log("Failed to delete trivia", gameToDelete);
		res.status(500).send({ error: error.code, message: "Something went wrong, I couldn't delete your game" });
	}
});

module.exports = router;
