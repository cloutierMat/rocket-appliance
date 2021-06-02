const router = require('express').Router();
const games = require('../model/games');
const middleware = require('../model/middlewares');

router.get('/play/trivia/:name', async function (req, res) {
	try {
		const triviaToLoad = req.params;
		const triviaToSend = await games.Trivia.findOne(triviaToLoad);
		console.log('Sending a trivia: ', triviaToSend.name);
		res.send(triviaToSend);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

// endpoint to retrieve a list of all playable games
// returns an object containing
// name, category, author, description
router.get('/list/:pointer',
	middleware.dbChangeVerifier,
	async function (req, res) {
		try {
			const pointer = req.pointer;
			const query = games.Trivia.find({}, { userId: 0, __v: 0 });
			query.select({ _id: 0 });
			const list = await query.exec();
			console.log("Loaded game list. count:", list.length);
			res.send({ pointer, list });
		} catch (error) {
			console.error(error);
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
		console.log("Created a trivia", newTrivia.name);
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
router.put('/trivia/:userId',
	middleware.authentication,
	async function (req, res) {
		const query = req.query;
		const triviaToEdit = req.body;
		const userId = req.userId;
		try {
			query.setUpdate({ ...triviaToEdit, userId }, { runValidators: true });
			const updateResult = await query.updateOne();
			if (!updateResult.n) {
				console.log("Failed to update a game", updateResult);
				res.status(409).send({ message: "Something went wrong. Verify all that the form is properly completed. If it seems like it should have worked, let us know and we will fix it." });
				return;
			}
			console.log("Updated the trivia: ", triviaToEdit.name);
			// return the updated game to the client
			res.send(triviaToEdit);
		} catch (error) {
			// uncatched error will return 500 "server error"
			console.error("Failed to update trivia", error);
			res.status(500).send({ error: error.code, message: `Something went wrong! Try again.` });
		}
	});

router.delete('/trivia/:name/:userId',
	middleware.authentication,
	async (req, res) => {
		const query = req.query;
		try {
			// using trivia model to delete a game
			const deleteResult = await query.findOneAndDelete();
			console.log("Deleting a game from database", deleteResult.name);
			res.send({ message: `Succesfullly deleted ${deleteResult.name}` });
		} catch (error) {
			console.log("Failed to delete trivia", gameToDelete);
			res.status(500).send({ error: error.code, message: "Something went wrong, I couldn't delete your game" });
		}
	});

module.exports = router;
