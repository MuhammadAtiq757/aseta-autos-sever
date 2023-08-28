const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

/* --------------------------------------------- MongoDB Code Start ------------------------*/


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b0ddt3v.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();
    const newArrivalCollection = client.db('asetta-db').collection('new-arrivals');
    const OurTeamCollection = client.db('asetta-db').collection('OurTeam');

    /* ------------------------------ Code here --------------------------------------------- */
    // our team get all data
    app.get('/ourteam', async(req, res)=>{
        const result = await OurTeamCollection.find().toArray();
        res.send(result)
    })
    
    app.get('/ourteam/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)}
        const result = await OurTeamCollection.findOne(query);
        res.send(result)
    })

    
    // new arrials get all data
    app.get('/new-arrivals', async(req, res)=>{
        const result = await newArrivalCollection.find().toArray();
        res.send(result)
    })
    // new arrials get single data find
    app.get('/new-arrivals/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)}
        const result = await newArrivalCollection.findOne(query);
        res.send(result)
    })
    /* ------------------------------ Code here --------------------------------------------- */


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
}
}
run().catch(console.dir);


/* --------------------------------------------- MongoDB Code End ------------------------*/


app.get('/', (req, res) => {
    res.send('Asetta autos server is running');
})
app.listen(port, () => {
    console.log(`Asetta autos server is running on port : ${port}`);
})