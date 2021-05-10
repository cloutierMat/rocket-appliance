const router = require('express').Router();
const games = require('../model/games');

router.get('/play/:name', async function (req, res) {
   //    try {
   //       const gameToLoad = req.params;
   //       const gameToSend = new games(gameToLoad);
   //       await gameToSend.save();
   //       console.log('loaded game', gameToSend);
   //       res.send(gameToSend);
   //    } catch (error) {
   //       console.log(error);
   //       res.sendStatus(500);
   //    }
});

module.exports = router;
