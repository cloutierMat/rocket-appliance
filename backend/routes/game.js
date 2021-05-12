const router = require('express').Router();
const games = require('../model/games');

router.get('/play/trivia/:name', async function (req, res) {
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

router.post('/trivia', async function (req, res) {
   const triviaToCreate = req.body
   try {
     const newTrivia = new games.Trivia(triviaToCreate)
     await newTrivia.save()
     console.log("created a trivia", newTrivia);
     res.send(newTrivia)
   } catch (error) {
      console.error("failed to post trivia", error);
      res.sendStatus(500);
   }
})

module.exports = router;
