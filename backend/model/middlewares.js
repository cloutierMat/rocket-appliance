const games = require('./games');
const admins = require('./admins');
const { Trivia } = require('./games');

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
		req.query = query;
		next();
	} catch (error) {
		console.log("middleware authentication", error);
		res.status(500).send({ message: "There was an issue. Communicate with us, and we will sort everything out. In the meantime, I wish you a great day!" });
		return;
	}
}

function dbChangeVerifier(req, res, next) {
	const clientPointer = req.params.pointer;
	if (games.changePointer === clientPointer) {
		console.log("interrupted fetch request send through the API");
		res.sendStatus(304);
		return;
	}
	req.pointer = games.changePointer;
	next();
}

module.exports = {
	authentication,
	dbChangeVerifier,
};