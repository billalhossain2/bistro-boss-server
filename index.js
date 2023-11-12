const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;

//Middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// default route 
app.get("/", (req, res)=>{
    res.send(`Bistro Boss is running on port ${port}`)
})




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0ak1okw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const menuCollection = client.db('bistroDB').collection('menu');

    app.get('/menu', async(req, res)=>{
        const menu = await menuCollection.find().toArray();
        res.send(menu);
    })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.listen(port, ()=>{
    console.log(`Bistro Boss is listening at port ${port}`)
})
