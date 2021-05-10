const mongoose = require('mongoose');
const mongoUrl = process.env.URL
mongoose.connect(mongoUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", function(error) {
   console.error("mongoose connection error", error)
});

db.once("open", function() {
   console.log("mongoose connection successful", mongoUrl)
});

const url =
   'mongodb+srv://rocketAppliance:helloWill@cluster0.0bulm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
client.connect(err => {
   const collection = client.db('test').collection('devices');
   // perform actions on the collection object
   collection.insertOne({ name: 'Ali' });
   //    client.close();
});
