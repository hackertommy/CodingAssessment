const express = require('express')
const bodyParser= require('body-parser')
const app = express()

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
const {MongoClient} = require('mongodb');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))



async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://admin:admin@cluster0.edohj.mongodb.net/test?retryWrites=true&w=majority'";
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

MongoClient.connect('mongodb+srv://admin:admin@cluster0.edohj.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('test')
    const dataCollection = db.collection('test')
    app.listen(3000, function() {
        console.log('listening on 3000')
    })
    app.get('/', (req, res) => {
        db.collection('test').find().toArray()
          .then(results => {
            res.render('index.ejs', { test: results })
          })
          .catch(error => console.error(error))
    })
    app.put('/data', (req, res) => {
        db.collection('test').findOneAndUpdate(
        { first_name: req.body.first_name },
        {
          $set: {
            first_name: req.body.first_name,
          }
        },
        {
            upsert: true
        })
          .then(result => {
            console.log(result);
           })
          .catch(error => console.error(error))
    })

    app.delete('/data', (req, res) => {
        db.collection('test').findOneAndDelete(
            { first_name: req.body.first_name }
          )
            .then(result => {
              res.json(`Deleted entry`)
            })
            .catch(error => console.error(error))
      })

    app.post('/data', (req, res) => {
        dataCollection.insertOne(req.body)
          .then(result => {
            console.log(result)
          })
          .catch(error => console.error(error))
      })
      
  })
    


