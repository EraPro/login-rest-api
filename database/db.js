const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0.yur1ore.mongodb.net/?retryWrites=true&w=majorityy";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const db = client.db("test");
  console.log("Connected to MongoDB");
});

