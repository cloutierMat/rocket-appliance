const MongoClient = require('mongodb').MongoClient;
const uri =
   'mongodb+srv://rocketAppliance:helloWill@cluster0.0bulm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
client.connect(err => {
   const collection = client.db('test').collection('devices');
   // perform actions on the collection object
   collection.insertOne({ name: 'Ali' });
   //    client.close();
});
