const router = require("express").Router;

router.get("/play:name", async function(req, res) {
    try {
        const gameToLoad = ""; //need to put something in here at some point
        res.send (gameToLoad); 
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = router;