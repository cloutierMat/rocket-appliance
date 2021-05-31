const games = require('./games');

async function authentication(req, res, next) {
	const userId = req.params.userId;
	const name = req.body.name || req.params.name;

	const query = games.Trivia.findOne({ name, userId });

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



module.exports = {
	authentication,
};