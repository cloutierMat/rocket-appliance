const games = require('./games');
const admins = require('./admins');

async function authentication(req, res, next) {
	const userId = req.params.userId;
	const name = req.body.name || req.params.name;

	const options = {};
	options.name = name;
	if (!admins.isIdAdmin(userId)) {
		options.userId = userId;
	}

	const query = games.Trivia.findOne(options);
	try {
		const result = await query.findOne();
		if (!result) {
			console.log("Wrong user trying to delete a game", name, userId);
			res.status(409).send({ message: "You do not have permission to update this object" });
			return;
		}
		req.userId = result.userId;
		req.query = query;
		next();
	} catch (error) {
		console.log("middleware authentication", error);
		res.status(500).send({ message: "There was an issue. Communicate with us, and we will sort everything out. In the meantime, I wish you a great day!" });
		return;
	}
}

//
// this function compares the db change pointer to the clients change pointer
// if no changes are found, we return a 204 to let the client know that there are no new list for it to fetch
function dbChangeVerifier(req, res, next) {
	const clientPointer = req.params.pointer;
	const dbPointer = games.getChangePointer();
	if (dbPointer === clientPointer) {
		res.sendStatus(204);
		return;
	}
	req.pointer = dbPointer;
	next();
}

module.exports = {
	authentication,
	dbChangeVerifier,
};