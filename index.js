// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Add bodyParser middleware to parse JSON data


const app = express();
var cors = require('cors');
app.use(cors({
    origin: '*'
})); // include before other routes
const port = 3000;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://panza8484:test1234@memorygame.gl4niyh.mongodb.net/?&retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    console.log('in run()');
    // Connect the client to the server	(optional starting in v4.7)

    //Establish Connection
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("MemoryGame").command({ ping: 1 });
    // await client.db("admin").createUser(
    //     {
    //       user: 'admin',
    //       pwd: 'password',
    //       roles: [ { role: 'root', db: 'admin' } ]
    //     }
    // );

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
try{
  run();
} catch(error){
  console.log('something went wrong: ', error);
}
// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// Define the schema for high scores
const highScoreSchema = new mongoose.Schema({
  time: Number, // Field to store the time
  name: String, // Field to store the player's name
  moves: Number, // Field to store the number of moves
});

// Create the HighScore model
const HighScore = mongoose.model('HighScore', highScoreSchema);

// Middleware to parse JSON data
app.use(bodyParser.json());

// Route to get all high scores
app.get('/high-scores', async (req, res) => {
  await client.connect();
  const database = client.db("MemoryGame");
  const highScoresCollection = database.collection("highScores");
  const listOfHighScores = highScoresCollection.find().sort({score:-1});

  let respsonseArray = [];
  for await (const doc of listOfHighScores) {
    respsonseArray.push({
      name: doc.name,
      score: doc.score
    });
  }
  res.send({scores: respsonseArray});
  await client.close();
});

// Route to save a new high score
app.post('/high-scores', async (req, res) => {
  await client.connect();
  const database = client.db("MemoryGame");
  const highScores = database.collection("highScores");
  const result = await highScores.insertOne(req.body);
  console.log(`A document was inserted with the _id: ${result.insertedId}`)
  res.send('success');
  await client.close();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
